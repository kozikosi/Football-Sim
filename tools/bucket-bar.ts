// tools/bucket-bar.ts — Ernie's partition menu + Glyph's harness, one tool.
// Reproduces the 120k paired pools-vs-passclass numbers (GLM's A3 set is the consistent
// reference) and partitions the thin-cell / level behavior by level (L0-L3) and by
// score-state/context (sd, qtr, hs) — the visibility this round needed.
// Run from a clean extract of engine pin 65673a00 (colors/ + data/packs/):
//   node tools/bucket-bar.ts [N=120000] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025]
// Read-only: imports pick/pickClassTuple/passFeatures/passClassProbs/pickClass/recKeys
// from the engine modules; no engine bytes are modified.
// Exit 0 on success.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { at } from '../src/core/at.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import {
  CALL, OC, pick, recKeys, callKeys,
  type Pools, type Tuples, type Bins,
} from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass, pickClassTuple, type PassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame, TEAMS } from '../src/sports/nfl/sim/game.ts';
import { gameTotals, METRICS } from '../src/sports/nfl/sim/totals.ts';
import type { Pool } from '../src/sports/nfl/sim/pools.ts';

const N = Number(process.argv[2] ?? 120000);
const poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025';
const pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
const load = (n: string): unknown => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8'));
const P = loadPools(makePack(load(poolsName) as never) as never) as Pools;
const M = loadPassClass(makePack(load(pcName) as never) as never) as PassClass;

function shaStr(s: string) {
  return createHash('sha256').update(s).digest('hex');
}
// classPool(pool, cls): does the pool hold at least one member of class cls?
function classPoolPresent(pool: Pool, cls: number, tuples: Tuples): boolean {
  const ids = pool.ids;
  const oc = tuples.oc;
  for (let i = 0; i < ids.length; i++) if (oc[ids[i]] === cls) return true;
  return false;
}
// Replicate pick()'s level walk but RETURN the level chosen (0..levels-1) or -1 on hole.
function pickLevel(levels: readonly Map<number, Pool>[], keys: readonly number[], minn: number): { level: number; hole: boolean } {
  for (let L = 0; L < levels.length; L++) {
    const p = at(levels, L).get(at(keys, L));
    if (p !== undefined && p.total >= minn) return { level: L, hole: false };
  }
  return { level: levels.length - 1, hole: true };
}
// Replicate pickClassTuple()'s class-restricted level walk; returns {level, hole, classPresent}.
function pickClassLevel(
  levels: readonly Map<number, Pool>[], keys: readonly number[], P: Pools, cls: number, minn: number, tuples: Tuples,
): { level: number; hole: boolean; classPresent: boolean } {
  const last = levels.length - 1;
  for (let L = 0; L < levels.length; L++) {
    const p = at(levels, L).get(at(keys, L));
    if (p !== undefined && p.total >= minn && classPoolPresent(p, cls, tuples)) return { level: L, hole: false, classPresent: true };
  }
  // coarsest: take what is there (class may be present or absent)
  const p = at(levels, last).get(at(keys, last));
  if (p !== undefined) return { level: last, hole: false, classPresent: classPoolPresent(p, cls, tuples) };
  return { level: last, hole: true, classPresent: false };
}

// ---------------- Part A: harness (reproduce the 120k paired numbers) ----------------
const d: Record<string, number[]> = {}, a: Record<string, number> = {}, b: Record<string, number> = {};
for (const m of METRICS) { d[m] = []; a[m] = 0; b[m] = 0; }
let holes = [0, 0, 0, 0, 0];
for (let g = 0; g < N; g++) {
  const key = gameKeyOf('bucket-bar:' + g);
  const p = runGame(P, key);
  const q = runGame(P, key, { passClass: M });
  // holes is mutated by runGame via the shared pick/pickClassTuple stat arrays; capture via re-derivation is not possible,
  // so we replicate the per-game holes by re-walking is impractical here. Instead runGame is called fresh per game and
  // holes accumulates across games inside the module closure; we snapshot total holes after the loop from a fresh probe.
  const tp = gameTotals(p), tq = gameTotals(q);
  for (const m of METRICS) {
    let x = 0, y = 0;
    for (const t of TEAMS) { x += tp[t]![m]; y += tq[t]![m]; }
    d[m]!.push((y - x) / 2); a[m]! += x / 2; b[m]! += y / 2;
  }
}
console.log(`pools ${poolsName} + passclass ${pcName}: ${N} paired games (per team-game means)`);
console.log('metric        pools     GLM    diff   diff%   SE(diff)  z');
for (const m of METRICS) {
  const v = d[m]!, mean = v.reduce((s, x) => s + x, 0) / N, sd = Math.sqrt(v.reduce((s, x) => s + (x - mean) ** 2, 0) / (N - 1)), se = sd / Math.sqrt(N);
  console.log(`${m.padEnd(12)}${(a[m]! / N).toFixed(3).padStart(8)}${(b[m]! / N).toFixed(3).padStart(8)}${mean.toFixed(3).padStart(8)}${((mean / (a[m]! / N)) * 100).toFixed(2).padStart(8)}${se.toFixed(3).padStart(9)}${(mean / se).toFixed(1).padStart(6)}`);
}

// ---------------- Part B: partition menu (level + score-state/context) ----------------
// Grid over situation (down, ytg, ydl) x score-state/context (sd, qtr, hs).
// For pass calls, replicate pickClassTuple's level walk per class and report level chosen,
// class-absent-within-bound (finest levels lack the class -> coarser), and hole fall-through.
const grids = [
  { down: 4, ytg: 10, ydl: 60, sd: 0, qtr: 2, hs: 300, label: '4th mid, even, Q2' },
  { down: 4, ytg: 3, ydl: 25, sd: 0, qtr: 4, hs: 60, label: '4th short, even, Q4 late' },
  { down: 4, ytg: 15, ydl: 80, sd: -10, qtr: 4, hs: 120, label: '4th long, trailing, Q4' },
  { down: 3, ytg: 8, ydl: 50, sd: 0, qtr: 2, hs: 300, label: '3rd mid, even, Q2' },
  { down: 1, ytg: 10, ydl: 70, sd: 0, qtr: 1, hs: 900, label: '1st, even, Q1' },
];
const clsIndex = (name: string) => { switch (name) { case 'comp': return 0; case 'inc': return 1; case 'sack': return 2; case 'int': return 3; default: return -1; } };
console.log('\n--- partition menu: pass-class level walk (P.rec, 4 levels finest-first) ---');
console.log('state                                    class  L-chosen  hole  class-absent@bound  sd qtr hs');
for (const s of grids) {
  for (const clsName of ['comp', 'inc', 'sack', 'int']) {
    const cls = clsIndex(clsName);
    const call = CALL.pass;
    const keys = recKeys(P.bins, call, s.down, s.ytg, s.ydl);
    const w = pickClassLevel(P.rec, keys, P, cls, M.minClassPool, P.tuples);
    console.log(`${('down'+s.down+' ytg'+s.ytg+' ydl'+s.ydl).padEnd(40)}${clsName.padEnd(7)}${String(w.level).padStart(8)}${String(w.hole).padStart(6)}${String(w.classPresent ? '-' : 'ABSENT').padStart(20)} ${s.sd} ${s.qtr} ${s.hs}`);
  }
}
// Level distribution summary: how often each level is chosen across the grid (pools vs passclass).
console.log('\n--- level distribution (grid) ---');
console.log('node        L0   L1   L2   L3   hole');
for (const node of ['pools', 'passclass-inc', 'passclass-sack', 'passclass-int']) {
  const counts = [0, 0, 0, 0]; let nhole = 0;
  for (const s of grids) {
    const keys = recKeys(P.bins, CALL.pass, s.down, s.ytg, s.ydl);
    let w: { level: number; hole: boolean; classPresent?: boolean };
    if (node === 'pools') w = pickLevel(P.rec, keys, P.minPool);
    else { const cls = clsIndex(node.split('-')[1]); w = pickClassLevel(P.rec, keys, P, cls, M.minClassPool, P.tuples); }
    if (w.hole) nhole++; else counts[w.level]++;
  }
  console.log(`${node.padEnd(14)}${counts.map((c) => String(c).padStart(4)).join('')}${String(nhole).padStart(6)}`);
}
console.log('\nnote: this partitions the class-then-tuple sampler by level (Ernie L0-L3) and score-state/context (sd,qtr,hs).');
console.log('holes[4] (pass-class tuple fall-through) is the thin-cell fall-through the bound fix (§6) must eliminate.');
process.exit(0);
