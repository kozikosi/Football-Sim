// E3b: the fixed seam between the engine's RunState (engine/seasonrun.ts) and the storage envelope's WeekPayload (app/envelope.ts).
// Mapping (RunState field -> WeekPayload field):
//   seed, year, run, nextWeek, schedule  -> same names (schedule rows keep week/home/away/kind)
//   scores + playoffs                    -> scores: regular season in play order, then playoff games (they carry `round`); split back on `round`
//   prevRank, homeField                  -> prevRank, homeField (kept so a run-it-back and the Super Bowl host stay reproducible)
//   TEAM RATINGS (the `teams` argument)  -> ratings: team name -> frozen Ratings (a resume never rebuilds them from the live database)
//   gameSeed                             -> DERIVED: the seed of the user's game this week (gameSeed(seed, week, home)); checked on load
//   seeding, champion                    -> NOT STORED: recomputed from scores (seedPlayoffs on makeRng(seed).fork('seeding'); the Super Bowl winner)
//   userTeam, roster, plan, statsRecorded -> owned by the app: passed in, passed back out untouched
import { fixtures, gameSeed, LAST_REGULAR_WEEK } from '../engine/seasonrun.ts';
import type { RunState, Score } from '../engine/seasonrun.ts';
import { TEAMS } from '../engine/league.ts';
import { makeRng } from '../../../core/rng.ts';
import { seedPlayoffs } from '../engine/standings.ts';
import type { Played } from '../engine/standings.ts';
import type { LeagueTeam, Round } from '../engine/season.ts';
import type { Ratings } from '../engine/ratings.ts';
import type { FrozenPlayer, GameScore, WeekPayload } from './saves.ts';

export interface WeekContext { userTeam: string; roster: FrozenPlayer[]; plan: Record<string, unknown> | null; statsRecorded: boolean }
export interface LoadedWeek { state: RunState; teams: LeagueTeam[]; context: WeekContext }
export type MapResult<T> = { ok: true; value: T } | { ok: false; message: string };

const RATING_KEYS: readonly (keyof Ratings)[] = ['olRun', 'olPass', 'rb', 'qb', 'rec', 'passRush', 'frontRun', 'coverage', 'kicker', 'rec12', 'rec13', 'rec21', 'rec22', 'rec11',
  'frontBase', 'frontNick', 'covBase', 'covNick', 'covDime', 'te1', 'te2', 'rbHeavy', 'ret', 'p', 'qbRunR', 'wrBlk', 'passOff', 'runOff', 'off', 'def'];

// The seed of the user's game this week; a week the user has no game in (a bye, or an eliminated user) stores the season seed.
export function userGameSeed(s: RunState, userTeam: string): number {
  const f = fixtures(s).find((g) => g.home === userTeam || g.away === userTeam);
  return f ? f.seed : s.seed;
}

export function toWeekPayload(s: RunState, teams: readonly LeagueTeam[], ctx: WeekContext): WeekPayload {
  const ratings: Record<string, unknown> = {};
  for (const t of teams) ratings[t.name] = { ...t.ratings };
  const score = (p: Score): GameScore => ({ week: p.week, home: p.home, away: p.away, hs: p.hs, as: p.as, htd: p.htd, atd: p.atd, ...(p.round ? { round: p.round } : {}) });
  const out: WeekPayload = {
    seed: s.seed, year: s.year, run: s.run, gameSeed: userGameSeed(s, ctx.userTeam), nextWeek: s.nextWeek, userTeam: ctx.userTeam, roster: ctx.roster, ratings,
    schedule: s.schedule.map((g) => ({ week: g.week, home: g.home, away: g.away, kind: g.kind })),
    scores: [...s.scores.map(score), ...s.playoffs.map(score)], plan: ctx.plan, statsRecorded: ctx.statsRecorded, prevRank: { ...s.prevRank },
  };
  if (s.homeField !== undefined) out.homeField = s.homeField;
  return out;
}

export function fromWeekPayload(p: WeekPayload): MapResult<LoadedWeek> {
  const teams: LeagueTeam[] = [];
  for (const t of TEAMS) {
    const r = p.ratings[t.name] as Record<string, unknown> | undefined;
    if (!r || typeof r !== 'object') return { ok: false, message: 'week: no ratings for ' + t.name };
    for (const k of RATING_KEYS) if (typeof r[k] !== 'number' || !Number.isFinite(r[k] as number)) return { ok: false, message: 'week: bad rating ' + k + ' for ' + t.name };
    teams.push({ name: t.name, ratings: { ...(r as unknown as Ratings) } });
  }
  const scores: Score[] = [], playoffs: Score[] = [];
  for (const g of p.scores) {
    const sc: Score = { week: g.week, home: g.home, away: g.away, hs: g.hs, as: g.as, htd: g.htd ?? 0, atd: g.atd ?? 0, ...(g.round ? { round: g.round as Round } : {}) };
    (g.round ? playoffs : scores).push(sc);
  }
  const state: RunState = {
    seed: p.seed, year: p.year, run: p.run, prevRank: p.prevRank ? { ...p.prevRank } : {}, homeField: p.homeField,
    schedule: p.schedule.map((g) => ({ week: g.week, home: g.home, away: g.away, kind: g.kind as RunState['schedule'][number]['kind'] })).sort((a, b) => a.week - b.week),
    nextWeek: p.nextWeek, scores, playoffs, seeding: null, champion: null,
  };
  if (state.nextWeek > LAST_REGULAR_WEEK) state.seeding = seedPlayoffs(scores as Played[], makeRng(p.seed).fork('seeding'));
  const sb = playoffs.find((g) => g.round === 'Super Bowl');
  if (sb) state.champion = sb.hs > sb.as ? sb.home : sb.away;
  if (!p.prevRank) return { ok: false, message: 'week: saved without prevRank (cannot rebuild a run-it-back)' };
  if (state.nextWeek <= 22 && userGameSeed(state, p.userTeam) !== p.gameSeed) return { ok: false, message: 'week: stored gameSeed does not match the state (changed save?)' };
  return { ok: true, value: { state, teams, context: { userTeam: p.userTeam, roster: p.roster, plan: p.plan, statsRecorded: p.statsRecorded } } };
}
