// Keyed RNG (L0 kernel, Phase 0). A draw is a PURE FUNCTION of (gameKey, eventIndex, tag, n): there is no stream to advance and no
// state to save. Consequences the engine design (tools/mathlab/results/engine-design-2026-11-11.md, section 4) relies on:
//   - one event can be replayed alone, and a game can branch from play N without re-running plays 0..N-1;
//   - a counterfactual shares its randomness with the original wherever (game, event, tag) match, even when it consumes a
//     different NUMBER of draws on the way (the sequential mulberry32 stream in rng.ts cannot do this: one extra draw shifts
//     every later draw);
//   - adding a new tag never changes what any existing tag draws.
// Generator: Philox-2x32-10 (Salmon et al., "Parallel random numbers: as easy as 1, 2, 3", SC11; Random123), counter-based,
// 64 bits out per call. Key derivation: subkey = Philox(counter = gameKey, key = hash32(tag)).word0, a 32-bit stream key.
// Two (game, tag) pairs collide only if their 32-bit stream keys are equal (about 2^-32 per pair, a few dozen tags per game),
// and a collision would only make two tags in the same event draw alike. Documented limit, not a defect.
// Pure: no clock, no ambient randomness (test/core/keyedrng.test.ts checks the generator against the published test vectors).
import { hashString } from './rng.ts';
import { at } from './at.ts';
import type { Rng } from './rng.ts';

const M0 = 0xd256d193, W0 = 0x9e3779b9;

// high 32 bits of the 64-bit product of two uint32 (no BigInt, no float rounding: 16-bit limbs)
function mulhi32(a: number, b: number): number {
  const a0 = a & 0xffff, a1 = a >>> 16, b0 = b & 0xffff, b1 = b >>> 16;
  const t = a0 * b0;
  const mid1 = a1 * b0 + (t >>> 16);
  const mid2 = a0 * b1 + (mid1 & 0xffff);
  return (a1 * b1 + Math.floor(mid1 / 65536) + Math.floor(mid2 / 65536)) >>> 0;
}

// Philox-2x32-10: counter (c0, c1) and key k, all uint32; returns the two output words.
export function philox2x32(c0: number, c1: number, k: number): [number, number] {
  let x0 = c0 >>> 0, x1 = c1 >>> 0, key = k >>> 0;
  for (let r = 0; r < 10; r++) {
    const hi = mulhi32(M0, x0), lo = Math.imul(M0, x0) >>> 0;
    x0 = (hi ^ key ^ x1) >>> 0;
    x1 = lo;
    key = (key + W0) >>> 0;
  }
  return [x0, x1];
}

// A game's 64-bit identity. A number seed (as the legacy engine uses) or any string (a league/season/game id) both work.
export interface GameKey { readonly hi: number; readonly lo: number }
export function gameKeyOf(seed: number | string): GameKey {
  if (typeof seed === 'number') {
    if (!Number.isInteger(seed)) throw new Error('gameKeyOf: a numeric seed must be an integer, got ' + seed);
    const lo = seed >>> 0, hi = Math.floor(seed / 4294967296) >>> 0;
    // mix so that seeds 0,1,2.. are not near-identical keys
    const m = philox2x32(hi ^ 0x5bd1e995, lo, 0x27d4eb2f);
    return { hi: m[0], lo: m[1] };
  }
  return { hi: hashString('keyed-game-a:' + seed), lo: hashString('keyed-game-b:' + seed) };
}

// 53-bit uniform in [0,1) for (key, event index, tag, n). n is the draw number inside that cell (0, 1, 2, ...).
export function draw(key: GameKey, eventIndex: number, tag: string, n = 0): number {
  if (!Number.isInteger(eventIndex) || eventIndex < 0 || eventIndex > 0xffffffff) throw new Error('draw: eventIndex must be a uint32, got ' + eventIndex);
  if (!Number.isInteger(n) || n < 0 || n > 0xffffffff) throw new Error('draw: n must be a uint32, got ' + n);
  const sub = philox2x32(key.hi, key.lo, hashString(tag))[0];
  const [w0, w1] = philox2x32(eventIndex, n, sub);
  return ((w0 >>> 5) * 67108864 + (w1 >>> 6)) / 9007199254740992;
}

// The same cell as an Rng (the interface every engine call site already takes). The stream inside ONE (game, event, tag) cell is
// a counter, so it is still a pure function of the key; fork(label) extends the tag, so it never collides with the parent.
export function keyedRng(key: GameKey, eventIndex: number, tag = ''): Rng {
  let n = 0;
  const next = (): number => draw(key, eventIndex, tag, n++);
  return {
    next,
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    normal: () => {                       // Box-Muller, cosine branch only: no cached spare, so no hidden state
      let u = next();
      while (u === 0) u = next();
      const v = next();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    pick: (xs) => at(xs, Math.floor(next() * xs.length)),
    fork: (label) => keyedRng(key, eventIndex, tag + '/' + label),
  };
}
