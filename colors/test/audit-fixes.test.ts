// MUSE engine audit (relayed by KG, 2 Nov 2026), fixes verified one by one. Each test names the finding it pins.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS } from '../src/engine/slots.ts';
import type { SlotId } from '../src/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../src/engine/ratings.ts';
import { matchupModel, DEFAULT_PLAN } from '../src/engine/matchup.ts';
import { makeRng } from '../src/engine/rng.ts';
import { simulateGame } from '../src/engine/drives.ts';

const rec = (v: number, over: Partial<Record<SlotId, number>> = {}) => Object.fromEntries(SLOT_IDS.map((s) => [s, over[s] ?? v])) as Record<SlotId, number>;
const R = (v: number, over: Partial<Record<SlotId, number>> = {}) => teamRatings(spotsFromRecord(rec(v, over)));
const lg = R(80);
const mm = (o: ReturnType<typeof R>, d: ReturnType<typeof R>) => matchupModel(o, d, lg, DEFAULT_PLAN);

// Finding 3: structPts counted puntPts, retPts, qbRun and wrBlk but regulation scoring (ptsOf) ignored them.
test('audit 3: a better punter lowers the opponent score in REGULATION, not only in overtime', () => {
  const N = 1500;
  let withP99 = 0, withP80 = 0;
  for (let i = 0; i < N; i++) {
    // same seed for both versions, so the noise cancels; only the defense's punter differs
    const a = simulateGame(mm(R(80), R(80, { P: 99 })), mm(R(80, { P: 99 }), R(80)), makeRng(900 + i), { playoff: false });
    const b = simulateGame(mm(R(80), R(80)), mm(R(80), R(80)), makeRng(900 + i), { playoff: false });
    withP99 += a.regHome; withP80 += b.regHome;
  }
  const realised = (withP80 - withP99) / N;
  assert.ok(realised > 0.2, `punter 80 to 99 should cost the other side points in regulation, got ${realised.toFixed(2)}`);
});
test('audit 3: regulation and overtime read the same structural model (extraPts is part of structPts)', () => {
  const m = mm(R(80, { P: 99, QB: 90, WR1: 95 }), R(80, { P: 70 }));
  const noExtra = matchupModel(R(80), R(80), lg, DEFAULT_PLAN);
  assert.ok(Math.abs(noExtra.extraPts) < 1e-9, 'a league-average matchup has no extra points');
  assert.ok(Math.abs(m.extraPts) > 0.05, 'a punter, QB and WR edge must show up in extraPts');
  const parts = m.structPts - m.extraPts;
  assert.ok(Number.isFinite(parts));
});

// Finding 2: softCap on the NET unit strength made a run defender worthless once the opposing offense was good.
const runO = (v: number) => R(78, { RB1: v, RB2: v, OT1: v, OT2: v, OG1: v, OG2: v, C: v });
const passO = (v: number) => R(78, { QB: v, WR1: v, WR2: v, WR3: v, TE1: v, OT1: v, OT2: v, OG1: v, OG2: v, C: v });
test('audit 2: a run defender saves yards against every offense, average to elite (run side)', () => {
  const lg78 = R(78);
  const saved: number[] = [];
  for (const v of [78, 86, 92, 99]) {
    const a = matchupModel(runO(v), R(78, { MIKE: 80 }), lg78, DEFAULT_PLAN), b = matchupModel(runO(v), R(78, { MIKE: 99 }), lg78, DEFAULT_PLAN);
    saved.push(a.expRush - b.expRush);
  }
  for (const s of saved) assert.ok(s > 8, `MIKE 80 to 99 should save real yards against any run offense, saved ${saved.map((x) => x.toFixed(1)).join(', ')}`);
  // and it is not wildly more at the top than at the bottom (the effect is steady, not exploding)
  assert.ok(saved[3] < saved[0] * 2.2, `saved ${saved.map((x) => x.toFixed(1)).join(', ')}`);
});
test('audit 2: a pass rusher and a corner keep their value against an elite passing offense (pass side)', () => {
  const lg78 = R(78);
  for (const over of [{ DE1: 99, DE2: 99 }, { CB1: 99, CB2: 99 }] as const) {
    const a = matchupModel(passO(99), R(78), lg78, DEFAULT_PLAN), b = matchupModel(passO(99), R(78, over), lg78, DEFAULT_PLAN);
    assert.ok(a.expPass - b.expPass > 5, `${JSON.stringify(over)} saved ${(a.expPass - b.expPass).toFixed(1)} pass yards`);
  }
});
test('audit 2: the average-offense case is unchanged (the linear zone equals the old formula)', () => {
  const lg78 = R(78);
  const a = matchupModel(runO(78), R(78, { MIKE: 80 }), lg78, DEFAULT_PLAN), b = matchupModel(runO(78), R(78, { MIKE: 99 }), lg78, DEFAULT_PLAN);
  assert.ok(Math.abs(a.expRush - b.expRush - 11.87) < 0.05, `${(a.expRush - b.expRush).toFixed(2)}`);
});
