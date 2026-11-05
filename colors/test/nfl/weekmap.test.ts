import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS } from '../../src/sports/nfl/engine/slots.ts';
import type { SlotId } from '../../src/sports/nfl/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../../src/sports/nfl/engine/ratings.ts';
import { TEAMS } from '../../src/sports/nfl/engine/league.ts';
import type { LeagueTeam } from '../../src/sports/nfl/engine/season.ts';
import { makeRng } from '../../src/core/rng.ts';
import { isFinished, playWeek, startSeason } from '../../src/sports/nfl/engine/seasonrun.ts';
import type { RunState } from '../../src/sports/nfl/engine/seasonrun.ts';
import { restore, serialize } from '../../src/sports/nfl/app/saves.ts';
import type { FrozenPlayer, WeekPayload } from '../../src/sports/nfl/app/saves.ts';
import { fromWeekPayload, toWeekPayload, userGameSeed } from '../../src/sports/nfl/app/weekmap.ts';

function league(seed: number): LeagueTeam[] {
  const r = makeRng(seed);
  return TEAMS.map((t) => {
    const base = 80 + 2.5 * r.normal();
    const rec = Object.fromEntries(SLOT_IDS.map((s) => [s, Math.max(60, Math.min(99, Math.round(base + 3 * r.normal())))])) as Record<SlotId, number>;
    return { name: t.name, ratings: teamRatings(spotsFromRecord(rec)) };
  });
}
const USER = TEAMS[0].name;
const roster: FrozenPlayer[] = Array.from({ length: 32 }, (_, i) => ({ id: 'P' + i + '|QB|KC', name: 'P' + i, pos: 'QB', role: 'QB', team: 'KC', ovr: 80, spd: 70, str: 60, freeAgent: false }));
const ctx = { userTeam: USER, roster, plan: null, statsRecorded: false };
const V = { engineVersion: 'e1', dataVersion: 'd1', saveId: 'sv-1', saveRevision: 1, createdAt: '2026-11-03T00:00:00Z' }, T = new Date('2026-11-03T00:00:00Z');
// a save and a load through the real envelope: JSON text in the middle
function viaStorage(s: RunState, teams: LeagueTeam[]) {
  const r = restore(serialize('week', 'A', V, toWeekPayload(s, teams, ctx), T));
  assert.ok(r.ok && r.value.kind === 'week');
  const back = fromWeekPayload((r as any).value.payload as WeekPayload);
  assert.ok(back.ok, back.ok ? '' : back.message);
  return (back as any).value;
}

test('E3b: at every week (incl. playoffs and the finished season) RunState -> envelope text -> RunState is identical, seeding and champion included', () => {
  for (const seed of [4, 17]) {
    const teams = league(seed);
    let s = startSeason(teams, { seed, year: 2026, run: seed === 17 ? 2 : 0, homeField: seed === 17 ? 2.1 : undefined });
    for (;;) {
      const v = viaStorage(s, teams);
      assert.deepEqual(v.state, s, `week ${s.nextWeek}`);
      assert.deepEqual(v.teams, teams);
      assert.deepEqual(v.context, ctx);
      if (isFinished(s)) break;
      s = playWeek(teams, s).state;
    }
  }
});
test('E3b: a refresh at any preview replays the SAME game and continues to the same champion', () => {
  const teams = league(9);
  let s = startSeason(teams, { seed: 9, year: 2026 }), saved = s;
  while (!isFinished(s)) {
    const v = viaStorage(s, teams);
    const a = playWeek(teams, s), b = playWeek(v.teams, v.state);
    assert.equal(JSON.stringify(b.games), JSON.stringify(a.games), `replay week ${s.nextWeek}`);
    s = a.state; saved = v.state;
  }
  assert.equal(viaStorage(s, teams).state.champion, s.champion);
  assert.ok(saved.nextWeek >= 22);
});
test('E3b: the stored gameSeed is the user game of that week, and a tampered one is refused', () => {
  const teams = league(3), s = startSeason(teams, { seed: 3, year: 2026 });
  const p = toWeekPayload(s, teams, ctx);
  assert.equal(p.gameSeed, userGameSeed(s, USER));
  const bad = { ...p, gameSeed: p.gameSeed + 1 };
  const r = fromWeekPayload(bad);
  assert.ok(!r.ok && /gameSeed/.test(r.message));
});
test('E3b: refuses missing team ratings, a non-numeric rating, and a save without prevRank', () => {
  const teams = league(3), s = startSeason(teams, { seed: 3, year: 2026 }), p = toWeekPayload(s, teams, ctx);
  const noTeam = structuredClone(p); delete (noTeam.ratings as any)[TEAMS[5].name];
  assert.ok(!fromWeekPayload(noTeam).ok);
  const nan = structuredClone(p); (nan.ratings as any)[TEAMS[1].name].qb = 'x';
  assert.ok(!fromWeekPayload(nan).ok);
  const noRank = structuredClone(p); delete noRank.prevRank;
  assert.ok(!fromWeekPayload(noRank).ok);
});
test('E3b: run-it-back: the next run built from the saved prevRank has different opponents', () => {
  const teams = league(6);
  let s = startSeason(teams, { seed: 6, year: 2026 });
  while (!isFinished(s)) s = playWeek(teams, s).state;
  const v = viaStorage(s, teams);
  const again = startSeason(v.teams, { seed: 6, year: 2026, run: s.run + 1, prevRank: v.state.prevRank });
  const key = (x: RunState) => x.schedule.map((g) => g.home + g.away).join();
  assert.notEqual(key(again), key(s));
});
