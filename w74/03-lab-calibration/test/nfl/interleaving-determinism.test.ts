// Property-based determinism gate (P-256e, Beam's proposal) — the CI-sized version of
// tools/outcomelab/determinism-1000.ts. Same engine, different interleavings → same digest.
// The 1000+-game cutover-gate run is the script (5+ seasons); this test pins the property
// in CI at ~300 games so a regression cannot merge silently.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { makeRng } from '../../src/core/rng.ts';
import { buildSchedule } from '../../src/sports/nfl/engine/schedule.ts';
import type { Game } from '../../src/sports/nfl/engine/schedule.ts';
import { matchupModel } from '../../src/sports/nfl/engine/matchup.ts';
import { simulateGame } from '../../src/sports/nfl/engine/drives.ts';
import { teamIdentity } from '../../src/sports/nfl/engine/plans.ts';
import { leagueBaseline } from '../../src/sports/nfl/engine/ratings.ts';
import { initialRanks, type LeagueTeam } from '../../src/sports/nfl/engine/season.ts';
import { fixtureLeague } from './fixture.ts';

const teams: LeagueTeam[] = fixtureLeague(777).teams.map((t) => ({ name: t.name, ratings: t.ratings }));
const lg = leagueBaseline(teams.map((t) => t.ratings));
const plan = new Map(teams.map((t) => [t.name, teamIdentity(t.ratings, lg)]));

function playGame(g: Game, seasonSeed: number): string {
  const H = teams.find((t) => t.name === g.home)!.ratings, A = teams.find((t) => t.name === g.away)!.ratings;
  const mh = matchupModel(H, A, lg, { off: plan.get(g.home)!.off, def: plan.get(g.away)!.def });
  const ma = matchupModel(A, H, lg, { off: plan.get(g.away)!.off, def: plan.get(g.home)!.def });
  const r = simulateGame(mh, ma, makeRng(seasonSeed).fork(`w${g.week}:${g.home}`), { playoff: false });
  return `${g.home}|${g.away}|${r.homeScore}|${r.awayScore}`;
}

test('determinism property: 2 seasons x 272 games, forward vs shuffled interleavings give the same per-game results', () => {
  let games = 0;
  for (const seasonSeed of [70001, 70002]) {
    const list: Game[] = buildSchedule(makeRng(seasonSeed).fork('schedule'), 2026, initialRanks(teams));
    const forward = list.map((g) => playGame(g, seasonSeed));
    const shuffled = list
      .map((g, i) => ({ g, k: makeRng(seasonSeed ^ (i * 2654435761)).next() }))
      .sort((a, b) => a.k - b.k)
      .map(({ g }) => playGame(g, seasonSeed));
    games += list.length;
    const h = (xs: string[]) => createHash('sha256').update(xs.slice().sort().join('\n')).digest('hex');
    assert.equal(h(forward), h(shuffled), `interleaving changed results at season seed ${seasonSeed}`);
  }
  assert.ok(games >= 500, 'the CI gate should stay at 500+ games (two seasons); the 1000+ cutover run is the script');
});
