import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { makePack } from '../../src/core/pack.ts';
import type { PackBody } from '../../src/core/pack.ts';
import { CALL, loadPools, recKeys } from '../../src/sports/nfl/sim/pools.ts';
import type { Pool, Pools } from '../../src/sports/nfl/sim/pools.ts';
import { PASS_CLASSES, classPool, loadPassClass, pickClassTuple } from '../../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../../src/sports/nfl/sim/game.ts';
import { gameKeyOf } from '../../src/core/keyedrng.ts';
import { oldRecKeys, plantedOldLevels } from './oldhier.ts';

// The CLASS path (pickClassTuple, used by the GLM node and the lambda-axis Lab; passes only: runs never take it) tested by OUTCOME, like hier.test.ts tests the plain node: after a pass whose class
// is drawn, the chain's next down is 1, or this down + 1, or the drive has ended; and a 4th-down pass that goes on has given a first down (real 2023-25: 0.2%). The class mix is the REAL one:
// each level-0 pass cell is weighted by the plays of that class it holds. An exact mass, no sampling. The bar is RELATIVE: the path may not do worse than the real (call, down) cell of that class
// (the data itself holds a few odd chains, e.g. 3 of 198 4th-down sacks in 2016-22 = 1.5%) plus 0.5 points; that 0.5 is a REGRESSION GUARD, not a football target. TRIPWIRE: the coarsest level
// (call) merges downs, and pickClassTuple reaches it only when the (call, down) class pool holds fewer than minClassPool plays. On both shipped packs it never does (0% at every down); this test
// fails if a pack ever makes it fire. The check can fail: the same computation on the old, down-merging hierarchy (planted, test/nfl/oldhier.ts) must be caught.
const load = (n: string): Pools => loadPools(makePack(JSON.parse(fs.readFileSync(new URL(`../../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody));
const ERAS = ['nfl-pools-fit2016-2022', 'nfl-pools-fit2023-2025'] as const;
const MINC = 25;                                                                                   // rules.minClassPool in the product packs
const edgeIn = (edges: readonly number[], bin: number): number => (bin === 0 ? edges[0]! - 1 : edges[bin - 1]!);

// The real (call, down) class cell's own wrong-down and 4th-down-resume mass: the reference the path is held to.
function reference(P: Pools, down: number, cls: number): { misaligned: number; resume: number } {
  const T = P.tuples, cell = P.rec[3]!.get(CALL.pass * 32 + down);
  const pool = cell === undefined ? undefined : classPool(cell, T.oc, cls);
  if (pool === undefined) return { misaligned: 0, resume: 0 };
  let prev = 0, bad = 0, bad4 = 0;
  for (let i = 0; i < pool.ids.length; i++) {
    const j = pool.ids[i]!, m = pool.cum[i]! - prev; prev = pool.cum[i]!;
    if (T.oc[j] === 3 || T.fum[j] === 1 || T.safety[j] === 1 || T.td[j] === 1 || Number.isNaN(T.ndown[j]!) || Number.isNaN(T.delta[j]!)) continue;
    const nd = T.ndown[j]!;
    if (nd !== 1 && nd !== down + 1) bad += m;
    if (down === 4 && nd !== 1) bad4 += m;
  }
  return { misaligned: bad / pool.total, resume: bad4 / pool.total };
}

type Pick = (call: number, down: number, ytg: number, ydl: number, cls: number, used: number[]) => Pool;
function measure(P: Pools, down: number, cls: number, pick: Pick): { w: number; misaligned: number; resume: number; level: number[] } {
  const T = P.tuples;
  let w = 0, mis = 0, res = 0; const level = [0, 0, 0, 0, 0, 0];
  for (const [key, cell] of P.rec[0]!) {
    const yb = key % 32, db = Math.trunc(key / 32) % 32, d = Math.trunc(key / 1024) % 32, c = Math.trunc(key / 32768);
    if (c !== CALL.pass || d !== down) continue;
    const mass = classPool(cell, T.oc, cls)?.total ?? 0;
    if (mass === 0) continue;
    const used = [0, 0, 0, 0, 0, 0];
    const pool = pick(c, down, edgeIn(P.bins.dist, db), edgeIn(P.bins.ydl, yb), cls, used);
    used.forEach((u, L) => { level[L]! += u * mass; });
    let prev = 0, bad = 0, bad4 = 0;
    for (let i = 0; i < pool.ids.length; i++) {
      const j = pool.ids[i]!, m = pool.cum[i]! - prev; prev = pool.cum[i]!;
      const continues = T.oc[j] !== 3 && T.fum[j] !== 1 && T.safety[j] !== 1 && T.td[j] !== 1 && !Number.isNaN(T.ndown[j]!) && !Number.isNaN(T.delta[j]!);
      if (!continues) continue;
      const nd = T.ndown[j]!;
      if (nd !== 1 && nd !== down + 1) bad += m;
      if (down === 4 && nd !== 1) bad4 += m;
    }
    w += mass; mis += mass * bad / pool.total; res += mass * bad4 / pool.total;
  }
  return { w, misaligned: w > 0 ? mis / w : 0, resume: w > 0 ? res / w : 0, level: level.map((x) => (w > 0 ? x / w : 0)) };
}

for (const era of ERAS) {
  const P = load(era);
  const cur: Pick = (call, down, ytg, ydl, cls, used) => {
    // pickClassTuple does not say which level it used; replay its rule to count (same loop, same condition)
    const keys = recKeys(P.bins, call, down, ytg, ydl);
    for (let L = 0; L < P.rec.length; L++) { const p = P.rec[L]!.get(keys[L]!); const sub = p === undefined ? undefined : classPool(p, P.tuples.oc, cls); if (sub !== undefined && sub.total >= MINC) { used[L] = 1; break; } if (L === P.rec.length - 1) used[L] = 1; }
    return pickClassTuple(P.rec, keys, P, cls, MINC, [0, 0, 0, 0, 0], 0);
  };

  test(`class path (${era}): at the real class mix a drawn class never puts the chain on a wrong down (passes, downs 1-4), and a 4th-down pass that goes on has given a first down`, () => {
    const lines: string[] = [], fails: string[] = [];
    for (const down of [1, 2, 3, 4]) for (let cls = 0; cls < PASS_CLASSES.length; cls++) {
      const r = measure(P, down, cls, cur);
      lines.push(`down ${down} ${PASS_CLASSES[cls]!.padEnd(4)} w=${r.w.toFixed(0).padStart(6)} wrong-down ${(100 * r.misaligned).toFixed(2).padStart(6)}% (real cell ${(100 * reference(P, down, cls).misaligned).toFixed(2)}%)  4th-resume ${(100 * r.resume).toFixed(2).padStart(6)}%  level use % ${r.level.map((x) => (100 * x).toFixed(0)).join('/')}`);
      const ref = reference(P, down, cls);
      if (r.misaligned > ref.misaligned + 0.005) fails.push(`down ${down} ${PASS_CLASSES[cls]}: ${(100 * r.misaligned).toFixed(2)}% of reads put the chain on a wrong down (the real cell: ${(100 * ref.misaligned).toFixed(2)}%)`);
      if (down === 4 && r.resume > ref.resume + 0.005) fails.push(`${PASS_CLASSES[cls]}: ${(100 * r.resume).toFixed(2)}% of 4th-down reads resume without a first down (the real cell: ${(100 * ref.resume).toFixed(2)}%)`);
      if (r.level[4]! > 0.001) fails.push(`down ${down} ${PASS_CLASSES[cls]}: ${(100 * r.level[4]!).toFixed(2)}% of reads fell through to the (call) level, which merges downs`);
    }
    console.log('# class path ' + era + '\n# ' + lines.join('\n# '));
    assert.deepEqual(fails, []);
  });

  test(`class path (${era}): the check can fail (the old hierarchy, planted, is caught at 4th down)`, () => {
    const old = plantedOldLevels(P);
    const oldPick: Pick = (call, down, ytg, ydl, cls) => pickClassTuple(old, oldRecKeys(P.bins, call, down, ytg, ydl), P, cls, MINC, [0, 0, 0, 0, 0], 0);
    let worst = 0;
    for (let cls = 0; cls < PASS_CLASSES.length; cls++) worst = Math.max(worst, measure(P, 4, cls, oldPick).resume);
    assert.ok(worst > 0.05, `planted old hierarchy worst 4th-down resume ${(100 * worst).toFixed(2)}% (the check must see it)`);
  });
}

// Whole games through the class path (the GLM node's sampler, lambda 0), the same outcome as hier.test.ts: a 4th-down pass or run that does not end the drive is followed by a 1st down.
// Passes take pickClassTuple, runs take the plain node, so this is the end-to-end view of both. 3000 matched-key games; the 0.5% is a regression guard (the real rate is 0.2% / 0.0%).
test('whole games on the class path (GLM node, product pack): a 4th-down pass or run that does not end the drive is followed by a 1st down', () => {
  const P = load('nfl-pools-fit2023-2025');
  const M = loadPassClass(makePack(JSON.parse(fs.readFileSync(new URL('../../../data/packs/nfl-passclass-fit2023-2025.json', import.meta.url), 'utf8')) as PackBody));
  const c = { tp: 0, rp: 0, tr: 0, rr: 0 };
  for (let g = 0; g < 3000; g++) {
    const ev = runGame(P, gameKeyOf('hier-' + g), { passClass: M }).events.filter((e) => e.kind === 'snap');
    for (let k = 0; k + 1 < ev.length; k++) {
      const p = ev[k]!.payload as { drive: number; down: number; call: number; give: boolean }, nx = ev[k + 1]!.payload as { drive: number; down: number };
      if (p.down !== 4 || (p.call !== CALL.pass && p.call !== CALL.run)) continue;
      const pass = p.call === CALL.pass, resumed = !p.give && nx.drive === p.drive && nx.down !== 1;
      if (pass) { c.tp++; if (resumed) c.rp++; } else { c.tr++; if (resumed) c.rr++; }
    }
  }
  console.log(`# class-path games: 4th-down passes ${c.tp}, resumed without a first down ${(100 * c.rp / c.tp).toFixed(2)}%; runs ${c.tr}, ${(100 * c.rr / c.tr).toFixed(2)}%`);
  assert.ok(c.tp >= 3000 && c.tr >= 2000, `tries ${c.tp}/${c.tr}`);
  assert.ok(c.rp / c.tp <= 0.005, `${c.rp} of ${c.tp} 4th-down passes resumed without a first down`);
  assert.ok(c.rr / c.tr <= 0.005, `${c.rr} of ${c.tr} 4th-down runs resumed without a first down`);
});
