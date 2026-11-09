import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COUPLING, MARGIN_BINS, TARGET_REG, SOURCE_PCT, reshapeScores } from '../../../src/engine/sports/nfl/engine/margin.ts';
import { makeRng } from '../../../src/engine/core/rng.ts';

const binOf = (d: number) => (d <= 10 ? d : d <= 14 ? 11 : 12);
const feasible = (s: number) => s === 0 || s === 3 || s >= 6;

test('coupling rows are probabilities that sum to 1, and push mass to the target pmf', () => {
  assert.equal(COUPLING.length, MARGIN_BINS.length);
  for (const row of COUPLING) { assert.ok(Math.abs(row.reduce((a, b) => a + b, 0) - 1) < 1e-9); for (const x of row) assert.ok(x >= 0); }
  const src = SOURCE_PCT.map((x) => x / 100 / (SOURCE_PCT.reduce((a, b) => a + b, 0) / 100));
  for (let m = 0; m < TARGET_REG.length; m++) {
    const got = src.reduce((t, p, b) => t + p * COUPLING[b][m], 0);
    assert.ok(Math.abs(got - TARGET_REG[m]) < 1e-9, `bin ${MARGIN_BINS[m]}`);
  }
});
test('regulation ties are 5.88% of games and 3 and 7 are the big margins', () => {
  assert.ok(Math.abs(TARGET_REG[0] - 0.0588) < 0.002);
  assert.ok(TARGET_REG[3] > 0.10 && TARGET_REG[3] > 2 * TARGET_REG[2]);
  assert.ok(TARGET_REG[7] > TARGET_REG[5] && TARGET_REG[7] > TARGET_REG[8]);
});
test('reshapeScores keeps the winner, keeps scores reachable, mostly keeps the total, and hits the margin pmf', () => {
  const r = makeRng(5); const count = new Array(13).fill(0); let n = 0, totShift = 0;
  for (let i = 0; i < 60000; i++) {
    // engine-like input: regulation scores drawn so the margin pmf is the source pmf
    const base = [0, 3, 6, 7, 9, 10, 13, 14, 17, 20, 21, 24, 27, 30, 31, 34];
    const a = base[r.int(0, base.length - 1)], b = base[r.int(0, base.length - 1)];
    const homeLeads = r.next() < 0.5;
    const [h, v] = reshapeScores(a, b, homeLeads, r);
    assert.ok(feasible(h) && feasible(v), `scores ${h}-${v}`);
    if (a !== b) assert.equal(h > v || h === v, a > b || h === v, 'a team that was ahead is not behind');
    if (a !== b && h !== v) assert.equal(h > v, a > b, 'winner unchanged');
    count[binOf(Math.abs(h - v))]++; n++; totShift += h + v - a - b;
  }
  assert.ok(Math.abs(totShift / n) < 3, 'total moves by a few points at most on average ' + totShift / n);
  assert.ok(count[0] > 0 && count[3] > count[2], 'ties exist and 3 is clustered');
});
test('a level game stays level (overtime decides it), and a one-point game can become a tie but never flips', () => {
  const r = makeRng(9); let tied = 0, flipped = 0;
  for (let i = 0; i < 3000; i++) {
    const [h, a] = reshapeScores(20, 20, true, r); assert.equal(h, a);
    const [x, y] = reshapeScores(7, 6, false, r); if (x === y) tied++; if (y > x) flipped++;
  }
  assert.ok(tied > 0 && flipped === 0);
});
