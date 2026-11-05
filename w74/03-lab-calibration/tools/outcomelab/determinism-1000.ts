// Property-based determinism at CI scale (P-256 / Beam's proposal) — Z.ai executor seat, w74.
//
// The claim: same engine + same seed, DIFFERENT action interleavings → identical results.
// The w72 §9 proof ran 5 games in 3 orders. This is the 1,000+-game version: it takes
// several full seasons (272 games each), then re-simulates every game from its OWN seed
// fork (gameSeed = seed ^ hash(label)) in FORWARD, REVERSE and SHUFFLED orders, and
// digests the per-game results. If any game's digest depends on order, the property is dead.
//
// Why this works on this engine: every game is a pure call over its own fork
// (seasonrun.gameSeed / season.ts `play()`), so interleaving is safe by construction —
// which is exactly what this script verifies rather than assumes.
//
// Run:   node --experimental-strip-types tools/outcomelab/determinism-1000.ts [seasons=4]
// Out:   per-order digest + VERDICT line; --json writes the receipt.
import { createHash } from 'node:crypto';
import { makeRng } from '../../src/core/rng.ts';
import { buildSchedule } from '../../src/sports/nfl/engine/schedule.ts';
import type { Game } from '../../src/sports/nfl/engine/schedule.ts';
import { matchupModel } from '../../src/sports/nfl/engine/matchup.ts';
import { simulateGame } from '../../src/sports/nfl/engine/drives.ts';
import { teamIdentity } from '../../src/sports/nfl/engine/plans.ts';
import { leagueBaseline } from '../../src/sports/nfl/engine/ratings.ts';
import { TEAMS } from '../../src/sports/nfl/engine/league.ts';
import { initialRanks, type LeagueTeam } from '../../src/sports/nfl/engine/season.ts';
import { fixtureLeague } from '../../test/nfl/fixture.ts';

const seasonsN = Number(process.argv[2] ?? 4);
const teams: LeagueTeam[] = fixtureLeague(777).teams.map((t) => ({ name: t.name, ratings: t.ratings }));
const lg = leagueBaseline(teams.map((t) => t.ratings));
const plan = new Map(teams.map((t) => [t.name, teamIdentity(t.ratings, lg)]));

function gameList(seasonSeed: number): Game[] {
  return buildSchedule(makeRng(seasonSeed).fork('schedule'), 2026, initialRanks(teams));
}
function playGame(g: Game, seasonSeed: number): string {
  const H = teams.find((t) => t.name === g.home)!.ratings, A = teams.find((t) => t.name === g.away)!.ratings;   // Ratings, not the LeagueTeam wrapper
  const label = `w${g.week}:${g.home}`;
  const mh = matchupModel(H, A, lg, { off: plan.get(g.home)!.off, def: plan.get(g.away)!.def });
  const ma = matchupModel(A, H, lg, { off: plan.get(g.away)!.off, def: plan.get(g.home)!.def });
  const r = simulateGame(mh, ma, makeRng(seasonSeed).fork(label), { playoff: false });
  return `${g.home}|${g.away}|${r.homeScore}|${r.awayScore}|${r.events.filter((e) => e.side === 'home' && (e.kind === 'TD' || e.kind === 'DEF_TD')).length}|${r.events.filter((e) => e.side === 'away' && (e.kind === 'TD' || e.kind === 'DEF_TD')).length}`;
}
const digest = (xs: string[]) => createHash('sha256').update(xs.join('\n')).digest('hex');

let games = 0;
const verdicts: string[] = [];
for (let s = 0; s < seasonsN; s++) {
  const seasonSeed = 50000 + s * 101;
  const list = gameList(seasonSeed);
  const forward = list.map((g) => playGame(g, seasonSeed));
  const reverse = list.slice().reverse().map((g) => playGame(g, seasonSeed));
  const shuffled = list
    .map((g, i) => ({ g, k: makeRng(seasonSeed ^ (i * 2654435761)).next() }))
    .sort((a, b) => a.k - b.k)
    .map(({ g }) => playGame(g, seasonSeed));
  const dF = digest([...forward].sort()), dR = digest([...reverse].sort()), dS = digest([...shuffled].sort());   // canonical order: the INTERLEAVING must not change the digest input
  games += list.length;
  const ok = dF === dR && dF === dS;
  verdicts.push(`season seed ${seasonSeed}: ${list.length} games × 3 interleavings → ${ok ? 'IDENTICAL' : 'DIVERGED'} (${dF.slice(0, 12)}…)`);
  if (!ok) { console.log(verdicts.join('\n')); console.log('VERDICT: FAIL'); process.exit(1); }
}
console.log(verdicts.join('\n'));
console.log(`total games per interleaving: ${games}`);
console.log(games >= 1000 ? 'VERDICT: PASS (1000+ games, property holds)' : 'VERDICT: PASS (below 1000 — raise seasons for the cutover gate)');
