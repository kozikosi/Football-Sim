// Shared test fixture (not a test file): a seeded 32-team draft from the real Madden file, lineups, ratings, and a game player.
import fs from 'node:fs';
import { buildPool } from '../src/engine/players.ts';
import type { Player } from '../src/engine/players.ts';
import { makeRng } from '../src/engine/rng.ts';
import type { Rng } from '../src/engine/rng.ts';
import { DEFAULT_CONFIG, newDraft, runDraft } from '../src/engine/draft.ts';
import { lineupFor } from '../src/engine/lineup.ts';
import type { Lineup } from '../src/engine/lineup.ts';
import { leagueBaseline, spotsOf, teamRatings } from '../src/engine/ratings.ts';
import type { Ratings } from '../src/engine/ratings.ts';
import { returnerRating } from '../src/engine/returner.ts';
import { netPts } from '../src/engine/value.ts';
import { TEAMS } from '../src/engine/league.ts';
import { matchupModel } from '../src/engine/matchup.ts';
import { teamIdentity } from '../src/engine/plans.ts';
import { simulateGame } from '../src/engine/drives.ts';
import type { GameResult } from '../src/engine/drives.ts';
import { buildBoxScore } from '../src/engine/boxscore.ts';
import type { BoxScore, GameSide } from '../src/engine/boxscore.ts';

export const pool: Player[] = buildPool(fs.readFileSync(new URL('../../data/madden27-ratings.csv', import.meta.url), 'utf8'), fs.readFileSync(new URL('../../data/free-agents-old-ratings.csv', import.meta.url), 'utf8'), fs.readFileSync(new URL('../../data/player-ids.csv', import.meta.url), 'utf8'));

export interface FTeam { name: string; lineup: Lineup; ratings: Ratings; roster: Player[] }
export function fixtureLeague(seed = 777): { teams: FTeam[]; lg: Ratings } {
  const rng = makeRng(seed), st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG);
  runDraft(st, rng.fork('run'));
  const raw = st.rosters.map((r) => Object.values(r) as Player[]).map((pl) => (['4-3', '3-4'] as const).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
  const lg0 = leagueBaseline(raw.map((b) => b[0].R));
  const teams: FTeam[] = raw.map((b, i) => { const best = netPts(b[0].R, lg0) >= netPts(b[1].R, lg0) ? b[0] : b[1]; return { name: TEAMS[i].name, lineup: best.l, ratings: best.R, roster: Object.values(st.rosters[i]) as Player[] }; });
  return { teams, lg: leagueBaseline(teams.map((t) => t.ratings)) };
}
let cache: ReturnType<typeof fixtureLeague> | null = null;
export const league = () => (cache ??= fixtureLeague());

export function side(t: FTeam): GameSide { return { team: t.name, lineup: t.lineup }; }
export function play(i: number, j: number, seed: number, playoff = false): { res: GameResult; box: BoxScore; H: FTeam; A: FTeam; rng: Rng } {
  const { teams, lg } = league(), H = teams[i], A = teams[j];
  const ih = teamIdentity(H.ratings, lg), ia = teamIdentity(A.ratings, lg);
  const mh = matchupModel(H.ratings, A.ratings, lg, { off: ih.off, def: ia.def }), ma = matchupModel(A.ratings, H.ratings, lg, { off: ia.off, def: ih.def });
  const rng = makeRng(seed);
  const res = simulateGame(mh, ma, rng.fork('game'), { playoff });
  const box = buildBoxScore(res, side(H), side(A), rng.fork('box'));
  return { res, box, H, A, rng };
}
