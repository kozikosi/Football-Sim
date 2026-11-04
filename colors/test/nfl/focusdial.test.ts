import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS, SLOTS } from '../../src/sports/nfl/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../../src/sports/nfl/engine/ratings.ts';
import { matchupModel } from '../../src/sports/nfl/engine/matchup.ts';
import type { Focus, Pers, Strat } from '../../src/sports/nfl/engine/specs.ts';
import { RATING_SPECS } from '../../src/sports/nfl/engine/specs.ts';

// Audit item 5 (Owner-approved 3 Nov, PLAN_K.defPredict 0.4 to 0.15): the defensive focus is a guess about how the offence will play.
const flat = (b: number) => teamRatings(spotsFromRecord(Object.fromEntries(SLOT_IDS.map((s) => [s, b])) as never));
const lg = flat(75), O = flat(75), D = flat(75);
const pts = (pers: Pers, strat: Strat, focus: Focus) => matchupModel(O, D, lg, { off: { pers, strat }, def: { pkg: 'nickel', focus } }).structPts;
const gain = (pers: Pers, strat: Strat, focus: Focus) => pts(pers, strat, 'neutral') - pts(pers, strat, focus);   // points the defence saves against neutral focus

test('focus dial: matching the offence pays (at least 0.25 points a game)', () => {
  assert.ok(gain('11', 'pass', 'pass') >= 0.25, String(gain('11', 'pass', 'pass')));
  assert.ok(gain('22', 'run', 'run') >= 0.25, String(gain('22', 'run', 'run')));
  assert.ok(gain('12', 'run', 'run') >= 0.1);
});
test('focus dial: guessing wrong costs (at least 0.3 points a game)', () => {
  assert.ok(gain('11', 'pass', 'run') <= -0.3, String(gain('11', 'pass', 'run')));
  assert.ok(gain('22', 'run', 'pass') <= -0.3, String(gain('22', 'run', 'pass')));
});
test('focus dial: against a balanced offence neutral is the safe choice (neither lean saves more than 0.1)', () => {
  assert.ok(gain('11', 'neutral', 'pass') < 0.1 && gain('11', 'neutral', 'run') < 0.1);
});
test('receiving spec: WR2 is worth about 70% of WR1 and WR3 under half (3 Nov, Owner-approved)', () => {
  const r = RATING_SPECS.rec;
  assert.ok(r.WR2 / r.WR1 > 0.65 && r.WR2 / r.WR1 < 0.75, String(r.WR2 / r.WR1));
  assert.ok(r.WR3 / r.WR1 < 0.5);
  const w = (id: string) => SLOTS.find((s) => s.id === id)!.weight;
  assert.ok(w('WR2') / w('WR1') > 0.5 && w('WR2') / w('WR1') < 0.62, String(w('WR2') / w('WR1')));   // the table keeps the plan-hedged ratio (a team can hide a weak WR2 in 12 personnel)
});
