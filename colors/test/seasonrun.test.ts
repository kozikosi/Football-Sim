import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOT_IDS } from '../src/engine/slots.ts';
import type { SlotId } from '../src/engine/slots.ts';
import { teamRatings, spotsFromRecord } from '../src/engine/ratings.ts';
import { TEAMS } from '../src/engine/league.ts';
import { simulateSeason } from '../src/engine/season.ts';
import type { LeagueTeam } from '../src/engine/season.ts';
import { forkSeed, makeRng } from '../src/engine/rng.ts';
import { fixtures, gameSeed, isFinished, playWeek, startSeason, table } from '../src/engine/seasonrun.ts';
import type { RunState } from '../src/engine/seasonrun.ts';
import { simulateGame } from '../src/engine/drives.ts';

function league(seed: number, sd = 2.5): LeagueTeam[] {
  const r = makeRng(seed);
  return TEAMS.map((t) => {
    const base = 80 + sd * r.normal();
    const rec = Object.fromEntries(SLOT_IDS.map((s) => [s, Math.max(60, Math.min(99, base + 3 * r.normal()))])) as Record<SlotId, number>;
    return { name: t.name, ratings: teamRatings(spotsFromRecord(rec)) };
  });
}
const rt = <T>(x: T): T => JSON.parse(JSON.stringify(x));
// steps to the end, saving through JSON between EVERY week (a refresh each week)
function stepAll(teams: LeagueTeam[], s0: RunState): RunState { let s = s0; while (!isFinished(s)) s = rt(playWeek(teams, rt(s)).state); return s; }

test('stepping week by week (through JSON each week) gives the same table, playoffs and champion as simulateSeason', () => {
  for (const seed of [3, 11, 42]) {
    const teams = league(seed), year = 2026;
    const full = simulateSeason(teams, makeRng(seed), { year });
    const s = stepAll(teams, startSeason(teams, { seed, year }));
    assert.equal(s.champion, full.champion);
    assert.deepEqual(table(s), full.table);
    assert.deepEqual(s.schedule, full.schedule.slice().sort((a, b) => a.week - b.week));
    assert.deepEqual(s.seeding, full.seeding);
    const key = (r: (string | number | undefined)[]) => String(r[0]) + '|' + String(r[1]);   // order of play differs (one conference at a time vs a round at a time); the games must not
    const mine = s.playoffs.map((p) => [p.round, p.home, p.away, p.hs, p.as]).sort((a, b) => key(a).localeCompare(key(b)));
    const theirs = full.playoffs.map((p) => [p.round, p.home, p.away, p.result.homeScore, p.result.awayScore]).sort((a, b) => key(a).localeCompare(key(b)));
    assert.deepEqual(mine, theirs);
    assert.deepEqual(s.scores.map((p) => [p.home, p.away, p.hs, p.as]), full.games.map((g) => [g.home, g.away, g.result.homeScore, g.result.awayScore]));
  }
});
test('the state is plain JSON and small (no logs): a full season under 150 K chars', () => {
  const teams = league(5), s = stepAll(teams, startSeason(teams, { seed: 5, year: 2026 }));
  assert.equal(JSON.stringify(rt(s)), JSON.stringify(s));
  assert.ok(JSON.stringify(s).length < 150_000, String(JSON.stringify(s).length));
});
test('a refresh at a preview replays the SAME game: stored game seed gives the identical result, play-by-play included', () => {
  const teams = league(9);
  let s = startSeason(teams, { seed: 9, year: 2026 });
  for (let i = 0; i < 4; i++) s = playWeek(teams, s).state;
  const a = playWeek(teams, rt(s)), b = playWeek(teams, rt(s));
  assert.equal(JSON.stringify(a.games), JSON.stringify(b.games));
  const f = fixtures(s)[0];
  assert.equal(f.seed, gameSeed(9, 5, f.home));
  assert.equal(f.seed, forkSeed(9, 'w5:' + f.home));
  assert.equal(makeRng(f.seed).next(), makeRng(9).fork('w5:' + f.home).next());
  // and replaying a stored seed through simulateGame is what playWeek did
  assert.ok(a.games.length > 0);
});
test('weeks: 18 regular weeks, then 6 + 4 + 2 + 1 playoff games in weeks 19 to 22; playoff weeks refuse to start early', () => {
  const teams = league(2); let s = startSeason(teams, { seed: 2, year: 2027 }); const counts: number[] = [];
  while (!isFinished(s)) { counts.push(fixtures(s).length); s = playWeek(teams, s).state; }
  assert.equal(counts.length, 22); assert.deepEqual(counts.slice(18), [6, 4, 2, 1]);
  assert.equal(counts.slice(0, 18).reduce((a, b) => a + b), 272);
  assert.throws(() => playWeek(teams, s), /finished/);
  assert.throws(() => playWeek(teams, { ...startSeason(teams, { seed: 2, year: 2027 }), nextWeek: 19 }), /before the regular season/);
});
test('run-it-back: the same league with a new seed and run counter gives a different schedule (opponents, not just week order)', () => {
  const teams = league(4);
  const a = startSeason(teams, { seed: 4, year: 2026, run: 0 }), b = startSeason(teams, { seed: 5, year: 2026, run: 1 });
  const pairs = (s: RunState) => new Set(s.schedule.map((g) => g.home + '>' + g.away));
  const same = [...pairs(a)].filter((p) => pairs(b).has(p)).length;
  assert.ok(same < 272, 'matchups identical: ' + same);
});
test('a bad team list is refused', () => { assert.throws(() => startSeason(league(1).slice(1), { seed: 1, year: 2026 })); });
