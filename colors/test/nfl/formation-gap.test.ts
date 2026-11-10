import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldSlots } from '../../src/sports/nfl/engine/slots.ts';
import { lineupFor } from '../../src/sports/nfl/engine/lineup.ts';
import type { Player, Role } from '../../src/sports/nfl/engine/players.ts';

// The 3-4 / 4-3 gap, measured with the fifth lineman (DL5) PINNED. DL5 is the lineman who comes on for blitzes and heavy defensive sets (Owner 10 Nov): a starter
// who does not play every snap, natural for DT and for EDGE (flex.ts). The fixture must say which one it is, because the gap depends on it: the earlier
// measurement and lineup.test.ts `natural()` filled DL5 with a DT without saying so. All four cells are pinned, so neither can drift unseen.
// These values follow the flex table (the 99-rule table at a722681). A flex change (Option B, a derived table) moves them on purpose: re-pin them in the same commit.

let uid = 0;
const mk = (role: Role): Player => ({ id: `g${uid++}|${role}|T`, name: `g${uid}`, pos: role, role, team: 'T', ovr: 70, spd: 70, str: 70, freeAgent: false });
const native = (base: '4-3' | '3-4', dl5: 'DT' | 'EDGE'): Player[] =>
  fieldSlots(base).map((x) => mk(x.dest === 'NICKEL' || x.dest === 'DIME' ? 'CB' : x.dest === 'DL5' ? dl5 : (x.dest as Role)));
const loss = (base: '4-3' | '3-4', dl5: 'DT' | 'EDGE'): number => {
  const ps = native(base, dl5), other = base === '4-3' ? '3-4' : '4-3';
  return lineupFor(ps, base).value - lineupFor(ps, other).value;
};

test('formation gap: a roster built for its own base is worth the same in either (600250 at 70 OVR), whichever role plays DL5', () => {
  for (const dl5 of ['DT', 'EDGE'] as const) for (const base of ['4-3', '3-4'] as const) assert.equal(lineupFor(native(base, dl5), base).value, 600250, `${base} ${dl5}`);
});
test('formation gap, DL5 = DT: a 4-3 roster loses 2700 in 3-4, a 3-4 roster loses 1800 in 4-3, a gap of 900', () => {
  assert.equal(loss('4-3', 'DT'), 2700);
  assert.equal(loss('3-4', 'DT'), 1800);
  assert.equal(loss('4-3', 'DT') - loss('3-4', 'DT'), 900);
});
test('formation gap, DL5 = EDGE: both lose 1800, a gap of 0 (the asymmetry is the DT-at-DL5 corner, not a property of the formations)', () => {
  assert.equal(loss('4-3', 'EDGE'), 1800);
  assert.equal(loss('3-4', 'EDGE'), 1800);
  assert.equal(loss('4-3', 'EDGE') - loss('3-4', 'EDGE'), 0);
});
test('formation gap: the 3-4 roster always pays the same single price (an ILB at DL5, 12 x 150); only the 4-3 roster depends on who plays DL5', () => {
  const flexed = (dl5: 'DT' | 'EDGE') => lineupFor(native('3-4', dl5), '4-3').placements.filter((p) => p.penalty > 0).map((p) => `${p.slot.slot}<-${p.player?.role}@${p.penalty}`);
  assert.deepEqual(flexed('DT'), ['DL5<-ILB@12']);
  assert.deepEqual(flexed('EDGE'), ['DL5<-ILB@12']);
});
