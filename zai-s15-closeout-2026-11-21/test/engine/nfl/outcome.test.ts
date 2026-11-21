import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS } from '../../../src/engine/sports/nfl/engine/slots.ts';
import type { SlotId } from '../../../src/engine/sports/nfl/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../../../src/engine/sports/nfl/engine/ratings.ts';
import { TEAMS } from '../../../src/engine/sports/nfl/engine/league.ts';
import type { LeagueTeam } from '../../../src/engine/sports/nfl/engine/season.ts';
import { makeRng } from '../../../src/engine/core/rng.ts';
import { isFinished, playWeek, startSeason } from '../../../src/engine/sports/nfl/engine/seasonrun.ts';
import type { RunState } from '../../../src/engine/sports/nfl/engine/seasonrun.ts';
import { statsDue, userOutcome } from '../../../src/engine/sports/nfl/app/outcome.ts';
import type { UserOutcome } from '../../../src/engine/sports/nfl/app/outcome.ts';

function league(seed: number): LeagueTeam[] {
  const r = makeRng(seed);
  return TEAMS.map((t) => {
    const base = 80 + 2.5 * r.normal();
    const rec = Object.fromEntries(SLOT_IDS.map((s) => [s, Math.max(60, Math.min(99, Math.round(base + 3 * r.normal())))])) as Record<SlotId, number>;
    return { name: t.name, ratings: teamRatings(spotsFromRecord(rec)) };
  });
}
// every state of one season, week by week
function states(seed: number): { teams: LeagueTeam[]; all: RunState[] } {
  const teams = league(seed); let s = startSeason(teams, { seed, year: 2026 }); const all = [s];
  while (!isFinished(s)) { s = playWeek(teams, s).state; all.push(s); }
  return { teams, all };
}

test('outcome: treating each of the 32 teams as the user gives exactly 18 missed, 6 wild-card, 4 divisional, 2 conference, 1 super-bowl loss, 1 champion', () => {
  for (const seed of [3, 11, 29]) {
    const { all } = states(seed), end = all[all.length - 1], count: Record<string, number> = {};
    for (const t of TEAMS) { const o = userOutcome(end, t.name); assert.ok(o, t.name); count[o!] = (count[o!] ?? 0) + 1; }
    assert.deepEqual(count, { 'missed-playoffs': 18, 'wild-card': 6, divisional: 4, conference: 2, 'super-bowl-loss': 1, champion: 1 }, 'seed ' + seed);
    assert.equal(userOutcome(end, end.champion!), 'champion');
  }
});
test('outcome: null until the user is out, then fixed forever; a bye week is not an elimination; missed-playoffs appears right after week 18', () => {
  const { all } = states(7), end = all[all.length - 1];
  for (const t of TEAMS) {
    let seen: UserOutcome | null = null;
    for (const s of all) {
      const o = userOutcome(s, t.name);
      if (seen) assert.equal(o, seen, `${t.name} outcome changed after it was set (week ${s.nextWeek})`);
      if (!seen && o === 'missed-playoffs') assert.equal(s.nextWeek, 19, 'missed-playoffs is first known exactly when week 18 is done');
      if (!seen && o) seen = o;
      if (s.nextWeek <= 18) assert.equal(o, null, 'nobody is out during the regular season');
    }
    assert.equal(seen, userOutcome(end, t.name));
  }
  const byes = end.seeding!.seeds.AFC[0];                       // the #1 seed has a bye: alive after the wild-card round was played
  assert.ok(all.some((s) => s.nextWeek === 20 && userOutcome(s, byes) === null));
});
test('statsDue: fires once, in the week the user goes out, and never again once recorded; abandoned (never eliminated) records nothing', () => {
  const { all } = states(5);
  for (const t of [TEAMS[0], TEAMS[9], TEAMS[20], TEAMS[31]]) {
    let recorded = false, fired = 0, week = 0;
    for (const s of all) {
      const due = statsDue(s, t.name, recorded);
      if (due) { fired++; recorded = true; week = s.nextWeek; }
    }
    assert.equal(fired, 1, t.name); assert.ok(week >= 19 && week <= 23);
    assert.equal(statsDue(all[all.length - 1], t.name, true), null);
  }
  assert.equal(statsDue(all[10], TEAMS[0].name, false), null, 'mid-season: nothing to record');
  assert.throws(() => userOutcome(all[0], 'Nobody FC'));
});
