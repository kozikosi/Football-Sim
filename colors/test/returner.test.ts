import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS } from '../src/engine/slots.ts';
import type { SlotId } from '../src/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../src/engine/ratings.ts';
import { matchupModel, DEFAULT_PLAN } from '../src/engine/matchup.ts';
import { lineupFor } from '../src/engine/lineup.ts';
import type { Player, Role } from '../src/engine/players.ts';
import { RETURN_SLOTS, returnerValue, returnerCandidates, pickReturner, returnerRating } from '../src/engine/returner.ts';

const flat = (v: number, ret?: number) => teamRatings(spotsFromRecord(Object.fromEntries(SLOT_IDS.map((s) => [s, v])) as Record<SlotId, number>), ret);
const mk = (name: string, role: Role, ovr: number, spd: number, str: number): Player => ({ id: `${name}|${role}|T`, name, pos: role, role, team: 'T', ovr, spd, str, freeAgent: false });

test('Owner formula: SPD 0.80, OVR 0.10, STR 0.10, capped at 99', () => {
  assert.equal(returnerValue({ spd: 90, ovr: 80, str: 60 }), 90 * 0.8 + 8 + 6);
  assert.equal(returnerValue({ spd: 99, ovr: 99, str: 99 }), 99);
  assert.equal(returnerValue({ spd: 100, ovr: 99, str: 99 }), 99);   // 99.8 before the cap
  assert.ok(returnerValue({ spd: 95, ovr: 70, str: 50 }) > returnerValue({ spd: 80, ovr: 95, str: 90 }), 'speed dominates');
});
test('candidates are non-linemen starters; the fastest wins unless the user picks someone else', () => {
  const roster: Player[] = [mk('Qb', 'QB', 90, 60, 50), mk('Rb', 'RB', 80, 92, 60), mk('Wr1', 'WR', 85, 96, 55), mk('Wr2', 'WR', 80, 90, 50), mk('Cb', 'CB', 80, 94, 55), mk('Ot', 'OT', 85, 99, 99), mk('Ot2', 'OT', 80, 50, 80)];
  const l = lineupFor(roster, '4-3');
  const c = returnerCandidates(l);
  assert.ok(c.length >= 3 && c.every((x) => RETURN_SLOTS.includes(x.slot)));
  assert.ok(!c.some((x) => x.player.role === 'OT' || x.player.role === 'QB'), 'linemen and the quarterback never return');
  assert.equal(pickReturner(l)!.player.name, 'Wr1');
  assert.equal(pickReturner(l, 'Cb|CB|T')!.player.name, 'Cb');
  assert.equal(pickReturner(l, 'Ot|OT|T')!.player.name, 'Wr1', 'an ineligible choice falls back to the best');
  assert.equal(returnerRating(l), returnerValue(roster[2]));
});
test('no eligible returner gives the neutral 82', () => { assert.equal(returnerRating(lineupFor([], '4-3')), 82); });
test('a better returner is worth points, a worse one costs them, and neutral is exactly zero against a neutral league', () => {
  const lg = flat(80), fast = flat(80, 92), slow = flat(80, 72);
  const m = (t: typeof lg) => matchupModel(t, lg, lg, DEFAULT_PLAN).structPts;
  assert.equal(m(flat(80)) - m(lg), 0);
  assert.ok(m(fast) > m(lg) && m(slow) < m(lg));
  assert.ok(m(fast) - m(lg) < 1.5, 'a few tenths of a point, not a game-changer');
});
