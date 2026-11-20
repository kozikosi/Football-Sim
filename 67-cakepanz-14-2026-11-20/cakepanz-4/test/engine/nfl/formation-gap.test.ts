import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldSlots } from '../../../src/engine/sports/nfl/engine/slots.ts';
import { lineupFor } from '../../../src/engine/sports/nfl/engine/lineup.ts';
import { DEFAULT_VALUES, tableValues } from '../../../src/engine/sports/nfl/engine/valueprovider.ts';
import type { ValueProvider } from '../../../src/engine/sports/nfl/engine/valueprovider.ts';
import type { Player, Role } from '../../../src/engine/sports/nfl/engine/players.ts';

// The 3-4 / 4-3 gap, measured with the fifth lineman (DL5) PINNED. DL5 is the lineman who comes on for blitzes and heavy defensive sets (Owner 10 Nov): a starter
// who does not play every snap, natural for DT and for EDGE (flex.ts). The fixture must say which one it is, because the gap depends on it: the earlier
// measurement and lineup.test.ts `natural()` filled DL5 with a DT without saying so. All four cells are pinned, so neither can drift unseen.
// These values follow the flex table (the 99-rule table at a722681). A flex change (Option B, a derived table) moves them on purpose: re-pin them in the same commit. 15 Nov 2026: FB>TE 6 to 2 moved 2700 to 2500 (TE3 weight 50 x 4). 16 Nov 2026: EDGE>DT 0 to 2 (Owner) moved the 3-4 roster with EDGE at DL5 from 1800 to 2400, so that gap went from 0 to -600; the 4-3 EDGE and both DT cells are unchanged.
//
// P-318 (14 Nov 2026): the solver now spends a ValueProvider, MEASURED by default. The exact numbers below (600250, 2500, 1800) are arithmetic on the
// RETIRED fitted table, so those tests run under tableValues(): they prove the solver logic is untouched by the seam. The MEASURED provider gets its own test
// that asserts structure and REPORTS the numbers (Owner: no weight is pinned).

let uid = 0;
const mk = (role: Role): Player => ({ id: `g${uid++}|${role}|T`, name: `g${uid}`, pos: role, role, team: 'T', ovr: 70, spd: 70, str: 70, freeAgent: false });
const native = (base: '4-3' | '3-4', dl5: 'DT' | 'EDGE'): Player[] =>
  fieldSlots(base).map((x) => mk(x.dest === 'NICKEL' || x.dest === 'DIME' ? 'CB' : x.dest === 'DL5' ? dl5 : (x.dest as Role)));
const loss = (base: '4-3' | '3-4', dl5: 'DT' | 'EDGE', v: ValueProvider = tableValues()): number => {
  const ps = native(base, dl5), other = base === '4-3' ? '3-4' : '4-3';
  return lineupFor(ps, base, v).value - lineupFor(ps, other, v).value;
};

test('formation gap (reference table): a roster built for its own base is worth the same in either (600250 at 70 OVR), whichever role plays DL5', () => {
  for (const dl5 of ['DT', 'EDGE'] as const) for (const base of ['4-3', '3-4'] as const) assert.equal(lineupFor(native(base, dl5), base, tableValues()).value, 600250, `${base} ${dl5}`);
});
test('formation gap (reference table), DL5 = DT: a 4-3 roster loses 2500 in 3-4, a 3-4 roster loses 1800 in 4-3, a gap of 700', () => {
  assert.equal(loss('4-3', 'DT'), 2500);
  assert.equal(loss('3-4', 'DT'), 1800);
  assert.equal(loss('4-3', 'DT') - loss('3-4', 'DT'), 700);
});
test('formation gap (reference table), DL5 = EDGE: a 4-3 roster loses 1800, a 3-4 roster loses 2400 (EDGE to DT is 2 since 16 Nov), a gap of -600', () => {
  assert.equal(loss('4-3', 'EDGE'), 1800);
  assert.equal(loss('3-4', 'EDGE'), 2400);
  assert.equal(loss('4-3', 'EDGE') - loss('3-4', 'EDGE'), -600);
});
test('formation gap: the 3-4 roster always pays the ILB at DL5 (12 x 150); with an EDGE at DL5 it also pays EDGE at DT2 (2, since 16 Nov)', () => {
  const flexed = (dl5: 'DT' | 'EDGE') => lineupFor(native('3-4', dl5), '4-3', DEFAULT_VALUES).placements.filter((p) => p.penalty > 0).map((p) => `${p.slot.slot}<-${p.player?.role}@${p.penalty}`);
  assert.deepEqual(flexed('DT'), ['DL5<-ILB@12']);
  assert.deepEqual(flexed('EDGE'), ['DT2<-EDGE@2', 'DL5<-ILB@12']);
});

// MEASURED (the default provider): structure gates, numbers are REPORTED. The same position carries the same value in both bases (Owner 2 Nov), so a roster built
// for its own base is worth the same in either, to within the measurement's own base-to-base noise (matchup.test.ts allows 1 unit per spot); a roster built for the
// other base loses value, and the 3-4-roster-in-4-3 loss is the single DL5<-ILB stand-in already asserted above.
test('formation gap (MEASURED values): own-base rosters agree across bases, a mismatched roster loses value; the numbers are REPORTED, not pinned', (t) => {
  const own = (['DT', 'EDGE'] as const).flatMap((dl5) => (['4-3', '3-4'] as const).map((base) => lineupFor(native(base, dl5), base, DEFAULT_VALUES).value));
  t.diagnostic(`REPORT (not a gate): own-base value at 70 OVR = ${own.map((x) => x.toFixed(1)).join(' / ')} (reference table: 600250)`);
  assert.ok(Math.max(...own) - Math.min(...own) < 32, 'own-base rosters differ by less than one unit per spot on average');
  for (const dl5 of ['DT', 'EDGE'] as const) {
    const a = loss('4-3', dl5, DEFAULT_VALUES), b = loss('3-4', dl5, DEFAULT_VALUES);
    t.diagnostic(`REPORT (not a gate): DL5=${dl5}: 4-3 roster loses ${a.toFixed(1)} in 3-4, 3-4 roster loses ${b.toFixed(1)} in 4-3, gap ${(a - b).toFixed(1)} (reference table: ${dl5 === 'DT' ? '2500 / 1800 / 700' : '1800 / 1800 / 0'})`);
    assert.ok(a > 0 && b > 0, `${dl5}: a roster built for the other base is worth less`);
  }
});
