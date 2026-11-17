// probe: class-restricted pools partition their parent exactly, on pools of my choosing (council GLM, 2026-11-17)
// and the 4th-and-40-at-the-goal-line case: an interception must still come from >= minClassPool interceptions.
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import fs from 'node:fs';
import { loadPools, sample } from '../src/sports/nfl/sim/pools.ts';
import { classPool, pickClassTuple } from '../src/sports/nfl/sim/passclass.ts';
import { recKeys, CALL } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '../src/sports/nfl/sim/passclass.ts';

const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));

// every pool at every level of P.rec (all four levels), not just the suite's sample
let checked = 0, failed = 0;
for (let L = 0; L < P.rec.length; L++) for (const [key, pool] of P.rec[L]) {
  checked++;
  let tot = 0, members = 0;
  for (let c = 0; c < 9; c++) {
    const sub = classPool(pool, P.tuples.oc, c); if (!sub) continue;
    tot += sub.total; members += sub.ids.length;
    for (const id of sub.ids) if (P.tuples.oc[id] !== c) { failed++; break; }
  }
  if (Math.abs(tot - pool.total) > 1e-9 || members !== pool.ids.length) failed++;
}
console.log(`partition check: ${checked} pools across levels 0..3, failures ${failed}`);

// weights preserved exactly: the parent's cumulative weight for a class's members equals the sub-pool's total
const pool = [...P.rec[0]!.values()][10]!;
let wParent = 0, wSub = 0;
for (let k = 0; k < pool.ids.length; k++) {
  const w = (pool.cum[k] - (k === 0 ? 0 : pool.cum[k - 1]));
  if (P.tuples.oc[pool.ids[k]] === 0) wSub += w;
  wParent += w;
}
const sub0 = classPool(pool, P.tuples.oc, 0)!;
console.log(`weight fidelity on one L0 pool: parent total ${wParent.toFixed(6)}, comp sub total ${wSub.toFixed(6)}, classPool total ${sub0.total.toFixed(6)}, equal ${Math.abs(wSub - sub0.total) < 1e-9}`);

// 4th and 40 at the goal line (and four more nasty states)
for (const [down, ytg, ydl] of [[4, 40, 99], [4, 25, 98], [3, 30, 5], [4, 15, 2], [3, 22, 60]] as const) {
  const stat: number[] = [];
  const keys = recKeys(P.bins, CALL.pass, down, ytg, ydl);
  const sub = pickClassTuple(P.rec, keys, P, 3, M.minClassPool, stat, 0);
  const ocOk = [...sub.ids].every((id) => P.tuples.oc[id] === 3);
  console.log(`d${down} ytg ${ytg} ydl ${ydl}: int pool total ${sub.total.toFixed(0)} (>= ${M.minClassPool}: ${sub.total >= M.minClassPool}), all int ${ocOk}, holes-fallback used ${stat[0] ?? 0}`);
}
