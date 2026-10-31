// Seeded random numbers (mulberry32). Every random draw in the engine goes through an Rng passed in,
// never Math.random, so a (rosters, plans, seed) triple always gives the same season.
export interface Rng {
  next(): number;                       // [0,1)
  int(lo: number, hi: number): number;  // inclusive both ends
  normal(): number;                     // standard normal (Box-Muller, caches the spare)
  pick<T>(xs: readonly T[]): T;
  fork(label: string): Rng;             // independent stream; same seed+label => same stream
}
function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}
export function makeRng(seed: number): Rng {
  let a = seed >>> 0;
  let spare: number | null = null;
  const next = (): number => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
    normal: () => {
      if (spare !== null) { const s = spare; spare = null; return s; }
      let u = 0, v = 0;
      while (u === 0) u = next();
      v = next();
      const m = Math.sqrt(-2 * Math.log(u));
      spare = m * Math.sin(2 * Math.PI * v);
      return m * Math.cos(2 * Math.PI * v);
    },
    pick: (xs) => xs[Math.floor(next() * xs.length)],
    fork: (label) => makeRng((seed ^ hashString(label)) >>> 0),
  };
}
