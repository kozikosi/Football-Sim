// 2a-adjudication: is the sacks/drives shift a per-state RATE effect or a STATE-MIX effect? A REPORT, not a gate.
// Companion to tools/glm-bar.ts: same N keys, same two-pack contract, same "paired so the difference of means has a small SE" idea.
// It answers the question glm-bar cannot: glm-bar gives the size of the shift, this gives its MECHANISM, by decomposing the
// aggregate sack-rate difference into a rate effect (different class rates WITHIN the same state) and a mix effect (different
// state distributions), at four bucketings from coarse to the sampler's own cells. It also reports the score-bucket
// redistribution (snaps moving between game states) and the per-down split, because those are the two patterns that get
// mistaken for the cause.
// Usage: node --experimental-strip-types tools/bucket-bar.ts [games=12000] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025]
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { at } from '../src/core/at.ts';
import { loadPools, recKeys } from '../src/sports/nfl/sim/pools.ts';
import type { Pools } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '../src/sports/nfl/sim/passclass.ts';
import type { PassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';

const N = Number(process.argv[2] ?? 12000), poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025', pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
// A missing pack is a FAIL, not a green: name the anchor (the pack) and exit non-zero, never print a rate.
const load = (n: string): PackBody => {
  const url = new URL(`../../data/packs/${n}.json`, import.meta.url);
  if (!fs.existsSync(url)) { process.stderr.write(`bucket-bar: pack "${n}" not found at ${url.pathname} — anchor missing\n`); process.exit(1); }
  return JSON.parse(fs.readFileSync(url, 'utf8')) as PackBody;
};
const P = loadPools(makePack(load(poolsName))), M = loadPassClass(makePack(load(pcName)));

// ---- the class-restricted sampler's level, recomputed here so the probe can see which cell a play came from ----
// Same rule as passclass.ts pickClassTuple: the first level whose sub-pool for the class holds `minn` plays wins; if none does,
// the last level that holds the class at all. Nothing here draws a number.
const subTotal = (p: { readonly ids: Int32Array; readonly cum: Float64Array }, oc: Int8Array, cls: number): number => {
  let t = 0;
  for (let k = 0; k < p.ids.length; k++) if (at(oc, p.ids[k]) === cls) t += p.cum[k]! - (k > 0 ? p.cum[k - 1]! : 0);
  return t;
};
const classLevel = (levels: readonly Map<number, { readonly ids: Int32Array; readonly cum: Float64Array; readonly total: number }>[], keys: readonly number[], oc: Int8Array, cls: number, minn: number): number => {
  let last = -1;
  for (let L = 0; L < levels.length; L++) {
    const p = at(levels, L).get(at(keys, L));
    if (p === undefined) continue;
    const t = subTotal(p, oc, cls);
    if (t <= 0) continue;
    last = L;
    if (t >= minn) return L;
  }
  return last;
};

// ---- one pass play, as the probe needs it ----
interface Play { down: number; ytg: number; ydl: number; sd: number; sack: number; cell: number; lvl: number }
const ytgBin = (y: number): number => (y <= 3 ? 0 : y <= 6 ? 1 : y <= 10 ? 2 : 3);
const scoreBin = (s: number): number => (s <= -7 ? 0 : s < 0 ? 1 : s === 0 ? 2 : s <= 7 ? 3 : 4);
const SCORE_BINS = ['trail-big', 'trail', 'tied', 'lead', 'lead-big'] as const;

function playsOf(mode: 'pools' | 'glm', key: ReturnType<typeof gameKeyOf>, pc: PassClass | null): Play[] {
  const out = pc === null ? runGame(P, key) : runGame(P, key, { passClass: pc });
  const score = [0, 0];
  const out_: Play[] = [];
  for (const e of out.events) {
    if (e.kind === 'score') { score[e.payload.team === 'A' ? 0 : 1] += e.payload.points; continue; }
    if (e.kind !== 'snap') continue;
    const p = e.payload;
    if (p.call !== 0) continue;                                            // pass plays only: the class node only changes these
    const keys = recKeys(P.bins, p.call, p.down, p.ytg, p.ydl);
    out_.push({
      down: p.down, ytg: p.ytg, ydl: p.ydl, sack: p.sack ? 1 : 0, cell: at(keys, 0),
      sd: score[p.team === 'A' ? 0 : 1] - score[p.team === 'A' ? 1 : 0],
      lvl: mode === 'glm' ? classLevel(P.rec, keys, P.tuples.oc, p.oc, M.minClassPool) : -1,
    });
  }
  return out_;
}

const A: Play[] = [], B: Play[] = [];
for (let g = 0; g < N; g++) {
  const key = gameKeyOf('glm-bar:' + g);
  for (const p of playsOf('pools', key, null)) A.push(p);
  for (const p of playsOf('glm', key, M)) B.push(p);
}

const rate = (xs: readonly Play[]): number => (xs.length ? xs.reduce((s, x) => s + x.sack, 0) / xs.length : 0);
const se = (xs: readonly Play[]): number => { const r = rate(xs); return Math.sqrt((r * (1 - r)) / Math.max(1, xs.length)); };
const pct = (x: number, d = 4): string => (x * 100).toFixed(d) + '%';

// ---- Kitagawa-Oaxaca: difference of weighted means split into rate and mix ----
function decompose(keyof_: (p: Play) => number, label: string): void {
  const cells = new Map<number, { np: number; sp: number; ng: number; sg: number }>();
  for (const p of A) { const k = keyof_(p); const c = cells.get(k) ?? { np: 0, sp: 0, ng: 0, sg: 0 }; c.np++; c.sp += p.sack; cells.set(k, c); }
  for (const p of B) { const k = keyof_(p); const c = cells.get(k) ?? { np: 0, sp: 0, ng: 0, sg: 0 }; c.ng++; c.sg += p.sack; cells.set(k, c); }
  const NP = A.length, NG = B.length;
  let rateEff = 0, mixEff = 0;
  for (const c of cells.values()) {
    const rp = c.np ? c.sp / c.np : 0, rg = c.ng ? c.sg / c.ng : 0;
    rateEff += 0.5 * (c.np / NP + c.ng / NG) * (rg - rp);
    mixEff += 0.5 * (rp + rg) * (c.ng / NG - c.np / NP);
  }
  const total = rate(B) - rate(A);
  console.log(`  ${label.padEnd(46)} cells ${String(cells.size).padStart(5)}   rate ${(rateEff * 100).toFixed(4).padStart(9)} pp (${((rateEff / total) * 100).toFixed(1).padStart(6)}%)   mix ${(mixEff * 100).toFixed(4).padStart(8)} pp (${((mixEff / total) * 100).toFixed(1).padStart(6)}%)`);
}

console.log(`bucket-bar: pools ${poolsName} + passclass ${pcName}, ${N} paired games`);
console.log(`node ${process.version}; every pass play is re-derived from the snap event, so no engine edit is involved`);
console.log('');
console.log('LAYER 1 — aggregate');
console.log(`  pass plays  pools ${A.length}   glm ${B.length}`);
console.log(`  sacks       pools ${A.reduce((s, x) => s + x.sack, 0)}   glm ${B.reduce((s, x) => s + x.sack, 0)}`);
console.log(`  sack rate   pools ${pct(rate(A))}   glm ${pct(rate(B))}   difference ${((rate(B) - rate(A)) * 100).toFixed(4)} points   SE ${(se(A) * 100).toFixed(4)} / ${(se(B) * 100).toFixed(4)}`);
console.log('');
console.log('LAYER 2 — Kitagawa-Oaxaca, coarse to fine (rate = different class rates in the same state; mix = different state distribution)');
console.log(`  total difference ${((rate(B) - rate(A)) * 100).toFixed(4)} points`);
decompose((p) => p.down, 'down only');
decompose((p) => p.down * 10 + scoreBin(p.sd), 'down x score-bin');
decompose((p) => p.down * 1000 + ytgBin(p.ytg) * 100 + (p.ydl > 50 ? 0 : 10) + scoreBin(p.sd), 'down x ytg-bin x side x score-bin');
decompose((p) => p.cell, 'the engine own rec cell (call, down, dist, ydl)');
decompose((p) => p.cell * 10 + ytgBin(p.ytg), 'engine rec cell x ytg-bin');
decompose((p) => p.cell * 10 + scoreBin(p.sd), 'engine rec cell x score-bin  <- the decisive one');
console.log('');
console.log('LAYER 3 — score-bucket redistribution (the pattern that gets mistaken for the cause)');
console.log('  bucket        n_pools   n_glm   share_pools  share_glm   rate_pools  rate_glm   diff(pp)');
for (let b = 0; b < SCORE_BINS.length; b++) {
  const a = A.filter((p) => scoreBin(p.sd) === b), c = B.filter((p) => scoreBin(p.sd) === b);
  console.log(`  ${SCORE_BINS[b]!.padEnd(12)}${String(a.length).padStart(8)}${String(c.length).padStart(9)}${((a.length / A.length) * 100).toFixed(3).padStart(12)}${((c.length / B.length) * 100).toFixed(3).padStart(11)}${pct(rate(a), 3).padStart(12)}${pct(rate(c), 3).padStart(10)}${((rate(c) - rate(a)) * 100).toFixed(3).padStart(10)}`);
}
console.log('');
console.log('LAYER 4 — sack rate per pass attempt by down');
console.log('  down   n_pools  n_glm   rate_pools  rate_glm   diff(pp)      rel%');
for (let d = 1; d <= 4; d++) {
  const a = A.filter((p) => p.down === d), c = B.filter((p) => p.down === d), ra = rate(a), rc = rate(c);
  console.log(`  ${d}     ${String(a.length).padStart(7)}${String(c.length).padStart(8)}${pct(ra, 3).padStart(11)}${pct(rc, 3).padStart(10)}${((rc - ra) * 100).toFixed(3).padStart(10)}${((rc / ra - 1) * 100).toFixed(2).padStart(8)}`);
}
console.log('');
console.log('LAYER 5 — GLM only: sack rate by the level the class sampler landed on');
console.log('  L0 = it stayed in the down-aware cell; L>0 = it fell back to a coarser, down-blind cell');
for (const L of [0, 1, 2, 3]) {
  const c = B.filter((p) => p.lvl === L);
  if (c.length) console.log(`  L${L}     ${String(c.length).padStart(8)}${((c.length / B.length) * 100).toFixed(2).padStart(8)}${pct(rate(c), 3).padStart(11)}`);
}
const l0 = B.filter((p) => p.lvl === 0), lpos = B.filter((p) => p.lvl > 0);
if (l0.length && lpos.length) console.log(`  L0 vs L>0 relative rate ${((rate(lpos) / rate(l0) - 1) * 100).toFixed(2)}%`);
console.log('');
console.log('LAYER 6 — who carries the aggregate rate effect (contribution = share of plays x rate difference)');
for (const d of [1, 2, 3, 4]) {
  const a = A.filter((p) => p.down === d), c = B.filter((p) => p.down === d);
  console.log(`  down ${d}: share of GLM plays ${((c.length / B.length) * 100).toFixed(2).padStart(6)}%   contribution ${(((c.length / B.length) * (rate(c) - rate(a))) * 100).toFixed(4).padStart(9)} pp`);
}
console.log('');
console.log('VERDICT RULE: if the rate column stays near 100% as the bucketing gets finer — especially at the engine cell x score-bin —');
console.log('the shift is a per-state rate effect and the score redistribution in LAYER 3 is its consequence, not its cause.');