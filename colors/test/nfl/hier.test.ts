import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { gameKeyOf } from '../../src/core/keyedrng.ts';
import { makePack } from '../../src/core/pack.ts';
import type { PackBody } from '../../src/core/pack.ts';
import { CALL, loadPools, pick, recKeys } from '../../src/sports/nfl/sim/pools.ts';
import type { Pool, Pools } from '../../src/sports/nfl/sim/pools.ts';
import { runGame } from '../../src/sports/nfl/sim/game.ts';
import { oldRecKeys, plantedOldLevels } from './oldhier.ts';

// The play-record node is tested by what it DOES, not by how it is built (Inkling's pin 1, 18 Nov): after an offensive snap the chain's next down is 1, or this down + 1, or the drive has ended;
// and a 4th-down try that does not end the drive must have given a first down. Real 2023-25 records: a failed 4th-down try goes on 0.2% (pass) / 0.0% (run) of the time. Any hierarchy that
// reads a tuple across downs breaks this, whatever it is called or however many levels it has. No football number is pinned: only the bookkeeping that the pack itself guarantees. The 0.5% bars below are REGRESSION GUARDS, not targets: roughly 5 sigma above what a correct hierarchy shows at these counts (the whole-game arm sees ~4500 tries), so they catch a real regression and not noise, but they would pass a 0.4% rate against the real 0.0% for runs; the exact-mass tests are the tighter instrument (the product pack shows 0.0-0.3%).
const load = (n: string): Pools => loadPools(makePack(JSON.parse(fs.readFileSync(new URL(`../../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody));
const ERAS = ['nfl-pools-fit2016-2022', 'nfl-pools-fit2023-2025'] as const;
const edgeIn = (edges: readonly number[], bin: number): number => (bin === 0 ? edges[0]! - 1 : edges[bin - 1]!);      // a value that falls in bin `bin` (a bin holds x with `bin` edges <= x)

// Exact mass, weighted by the real plays in each level-0 cell, of two outcome-shaped failures at one (call, down).
function bookkeeping(P: Pools, call: number, down: number, pickPool: (call: number, down: number, ytg: number, ydl: number) => Pool): { resume: number; misaligned: number } {
  const T = P.tuples;
  let w = 0, resume = 0, misaligned = 0;
  for (const [key, cell] of P.rec[0]!) {
    const yb = key % 32, db = Math.trunc(key / 32) % 32, d = Math.trunc(key / 1024) % 32, c = Math.trunc(key / 32768);
    if (c !== call || d !== down) continue;
    const pool = pickPool(call, down, edgeIn(P.bins.dist, db), edgeIn(P.bins.ydl, yb));
    let prev = 0, bad = 0, mis = 0;
    for (let i = 0; i < pool.ids.length; i++) {
      const j = pool.ids[i]!, m = pool.cum[i]! - prev; prev = pool.cum[i]!;
      const continues = T.oc[j] !== 3 && T.fum[j] !== 1 && T.safety[j] !== 1 && T.td[j] !== 1 && !Number.isNaN(T.ndown[j]!) && !Number.isNaN(T.delta[j]!);
      if (!continues) continue;
      const nd = T.ndown[j]!;
      if (nd !== 1 && nd !== down + 1) mis += m;
      if (down === 4 && nd !== 1) bad += m;
    }
    w += cell.total; resume += cell.total * bad / pool.total; misaligned += cell.total * mis / pool.total;
  }
  return { resume: resume / w, misaligned: misaligned / w };
}

for (const era of ERAS) {
  const P = load(era);
  const node = (call: number, down: number, ytg: number, ydl: number): Pool => pick(P.rec, recKeys(P.bins, call, down, ytg, ydl), P.minPool, [0, 0, 0, 0, 0], 1);

  test(`record node (${era}): at the real state mix the chain never lands on a wrong down (passes and runs, downs 1-4), and a 4th-down try that goes on has given a first down`, () => {
    for (const call of [CALL.pass, CALL.run]) for (const down of [1, 2, 3, 4]) {
      const r = bookkeeping(P, call, down, node);
      assert.ok(r.misaligned <= 0.005, `call ${call} down ${down}: ${(100 * r.misaligned).toFixed(2)}% of reads put the chain on a wrong down`);
      if (down === 4) assert.ok(r.resume <= 0.005, `call ${call}: ${(100 * r.resume).toFixed(2)}% of 4th-down reads resume without a first down`);
    }
  });

  test(`record node (${era}): the check can fail (the old hierarchy, planted, resumes 4th-down tries without a first down and lands chains on wrong downs)`, () => {
    const old = plantedOldLevels(P);
    const oldNode = (call: number, down: number, ytg: number, ydl: number): Pool => pick(old, oldRecKeys(P.bins, call, down, ytg, ydl), P.minPool, [0, 0, 0, 0, 0], 1);
    for (const call of [CALL.pass, CALL.run]) {
      const r4 = bookkeeping(P, call, 4, oldNode);
      assert.ok(r4.resume > 0.05, `call ${call}: planted old hierarchy resume ${(100 * r4.resume).toFixed(2)}% (the check must see it)`);
    }
  });
}

test('whole games on the product pack: a 4th-down pass or run that does not end the drive is followed by a 1st down (matched keys, 3000 games)', () => {
  const P = load('nfl-pools-fit2023-2025');
  let tries = 0, resumed = 0;
  for (let g = 0; g < 3000; g++) {
    const ev = runGame(P, gameKeyOf('hier-' + g)).events.filter((e) => e.kind === 'snap');
    for (let k = 0; k + 1 < ev.length; k++) {
      const p = ev[k]!.payload as { drive: number; down: number; call: number; give: boolean }, nx = ev[k + 1]!.payload as { drive: number; down: number };
      if (p.down !== 4 || (p.call !== CALL.pass && p.call !== CALL.run)) continue;
      tries++;
      if (!p.give && nx.drive === p.drive && nx.down !== 1) resumed++;
    }
  }
  assert.ok(tries >= 5000, 'tries ' + tries);
  assert.ok(resumed / tries <= 0.005, `${resumed} of ${tries} 4th-down tries resumed without a first down`);
});
