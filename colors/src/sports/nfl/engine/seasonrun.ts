// A season you can step one week at a time and save between weeks. Same games as simulateSeason (same fork labels, same plans),
// so stepping a whole season gives the same table and champion. The state is plain JSON (no logs, no Maps): it is what a "week" save holds.
// Every game is its own fork of the season seed, so a game's seed is a stored integer and replaying it gives the SAME result.
// The user's own per-week plan choices are not ported yet (teams play their coaching identity), so a game depends only on (teams, seed, label).
import { simulateGame } from './drives.ts';
import type { GameResult } from './drives.ts';
import { TEAM_BY_NAME, TEAMS } from './league.ts';
import type { Conf } from './league.ts';
import { matchupModel } from './matchup.ts';
import type { Plan } from './specs.ts';
import { teamIdentity } from './plans.ts';
import { leagueBaseline } from './ratings.ts';
import type { Ratings } from './ratings.ts';
import { at } from '../../../core/at.ts';
import { forkSeed, makeRng } from '../../../core/rng.ts';
import { buildSchedule } from './schedule.ts';
import type { Game } from './schedule.ts';
import { initialRanks, tds } from './season.ts';
import type { LeagueTeam, Round } from './season.ts';
import { seedPlayoffs } from './standings.ts';
import type { Played, Seeding } from './standings.ts';

export const LAST_REGULAR_WEEK = 18;
export const PLAYOFF_ROUNDS: readonly Round[] = ['Wild Card', 'Divisional', 'Conference', 'Super Bowl'];   // weeks 19..22
export interface Score { week: number; home: string; away: string; hs: number; as: number; htd: number; atd: number; round?: Round }
export interface RunState {
  seed: number; year: number; run: number;            // opponents and the Super Bowl host come from year + run: run-it-back changes the schedule
  prevRank: Record<string, number>; homeField?: number | undefined;   // present-with-undefined is the pinned round-trip shape (test/nfl/weekmap.test.ts E3b)
  schedule: Game[];
  nextWeek: number;                                    // 1..22; 23 = finished
  scores: Score[];                                     // regular season, in play order
  playoffs: Score[];
  seeding: Seeding | null;                             // fixed once week 18 is played
  champion: string | null;
}
const effYear = (s: Pick<RunState, 'year' | 'run'>): number => s.year + s.run;
export const isFinished = (s: RunState): boolean => s.nextWeek > 22;
export const roundOfWeek = (week: number): Round | null => (week >= 19 && week <= 22 ? (PLAYOFF_ROUNDS[week - 19] ?? null) : null);

export function startSeason(teams: readonly LeagueTeam[], o: { seed: number; year: number; run?: number; prevRank?: Record<string, number>; homeField?: number }): RunState {
  check(teams);
  const run = o.run ?? 0, prevRank = o.prevRank ?? initialRanks(teams);
  const schedule = buildSchedule(makeRng(o.seed).fork('schedule'), o.year + run, prevRank).sort((a, b) => a.week - b.week);
  return { seed: o.seed, year: o.year, run, prevRank, homeField: o.homeField, schedule, nextWeek: 1, scores: [], playoffs: [], seeding: null, champion: null };
}
// The label a game's stream is forked with, and its seed. A week-preview save stores this seed.
export const gameLabel = (week: number, round: Round | null, home: string): string => (round ? `po:${round}:${home}` : `w${week}:${home}`);
export const gameSeed = (seed: number, week: number, home: string): number => forkSeed(seed, gameLabel(week, roundOfWeek(week), home));

// The games of the next week, before they are played (a preview). Playoff rounds need the earlier rounds already in the state.
export function fixtures(s: RunState): { week: number; round: Round | null; home: string; away: string; seed: number; homeField?: number }[] {
  if (isFinished(s)) return [];
  const w = s.nextWeek, round = roundOfWeek(w);
  const pairs = round ? bracket(s, round) : s.schedule.filter((g) => g.week === w).map((g) => [g.home, g.away] as [string, string]);
  const hf = round === 'Super Bowl' ? 0 : s.homeField;
  return pairs.map(([home, away]) => ({ week: w, round, home, away, seed: gameSeed(s.seed, w, home), ...(hf !== undefined ? { homeField: hf } : {}) }));
}

// Plays the next week for every game. Pure: returns a new state and the full results (drives, events) of this week only.
// A game's stream is makeRng(its stored seed), so a refresh at a preview replays the same game.
export function playWeek(teams: readonly LeagueTeam[], s: RunState): { state: RunState; games: { home: string; away: string; round: Round | null; result: GameResult }[] } {
  check(teams);
  if (isFinished(s)) throw new Error('season: already finished');
  const by = new Map(teams.map((t) => [t.name, t.ratings] as [string, Ratings])), lg = leagueBaseline(teams.map((t) => t.ratings));
  const plan = new Map<string, Plan>();
  for (const t of teams) { const id = teamIdentity(t.ratings, lg); plan.set(t.name, { off: id.off, def: id.def }); }
  const fx = fixtures(s), round = roundOfWeek(s.nextWeek);
  const games = fx.map((f) => {
    const H = by.get(f.home)!, A = by.get(f.away)!;
    const mh = matchupModel(H, A, lg, { off: plan.get(f.home)!.off, def: plan.get(f.away)!.def }), ma = matchupModel(A, H, lg, { off: plan.get(f.away)!.off, def: plan.get(f.home)!.def });
    return { home: f.home, away: f.away, round, result: simulateGame(mh, ma, makeRng(f.seed), { playoff: round !== null, ...(f.homeField !== undefined ? { homeField: f.homeField } : {}) }) };
  });
  const scored: Score[] = games.map((g) => ({ week: s.nextWeek, home: g.home, away: g.away, hs: g.result.homeScore, as: g.result.awayScore, htd: tds(g.result, 'home'), atd: tds(g.result, 'away'), ...(g.round ? { round: g.round } : {}) }));
  const next: RunState = { ...s, scores: round ? s.scores : [...s.scores, ...scored], playoffs: round ? [...s.playoffs, ...scored] : s.playoffs, nextWeek: s.nextWeek + 1 };
  if (s.nextWeek === LAST_REGULAR_WEEK) next.seeding = seedPlayoffs(next.scores as Played[], makeRng(s.seed).fork('seeding'));
  if (round === 'Super Bowl') next.champion = winner(at(scored, 0));
  return { state: next, games };
}

export function table(s: RunState): Record<string, { w: number; l: number; t: number; pf: number; pa: number }> {
  const t = Object.fromEntries(TEAMS.map((x) => [x.name, { w: 0, l: 0, t: 0, pf: 0, pa: 0 }]));
  const row = (n: string) => { const r = t[n]; if (!r) throw new Error('season: unknown team ' + n); return r; };
  for (const p of s.scores) {
    const h = row(p.home), a = row(p.away);
    h.pf += p.hs; h.pa += p.as; a.pf += p.as; a.pa += p.hs;
    if (p.hs > p.as) { h.w++; a.l++; } else if (p.hs < p.as) { a.w++; h.l++; } else { h.t++; a.t++; }
  }
  return t;
}

const winner = (p: Score): string => (p.hs > p.as ? p.home : p.away);
function bracket(s: RunState, round: Round): [string, string][] {
  const sd = s.seeding;
  if (!sd) throw new Error('season: playoffs before the regular season is done');
  const won = (r: Round, conf: Conf) => s.playoffs.filter((p) => p.round === r && TEAM_BY_NAME[p.home]?.conf === conf).map(winner);
  if (round === 'Super Bowl') {
    const c = (conf: Conf) => at(won('Conference', conf), 0), hostIsAfc = effYear(s) % 2 === 1;
    return [hostIsAfc ? [c('AFC'), c('NFC')] : [c('NFC'), c('AFC')]];
  }
  const out: [string, string][] = [];
  for (const conf of ['AFC', 'NFC'] as const) {
    const seeds = sd.seeds[conf], seedOf = (t: string) => seeds.indexOf(t) + 1;
    if (round === 'Wild Card') for (const [h, l] of [[2, 7], [3, 6], [4, 5]] as [number, number][]) out.push([at(seeds, h - 1), at(seeds, l - 1)]);
    else if (round === 'Divisional') {
      const alive = [at(seeds, 0), ...won('Wild Card', conf)].sort((a, b) => seedOf(a) - seedOf(b));
      out.push([at(alive, 0), at(alive, alive.length - 1)], [at(alive, 1), at(alive, 2)]);
    } else { const dv = won('Divisional', conf).sort((a, b) => seedOf(a) - seedOf(b)); out.push([at(dv, 0), at(dv, 1)]); }
  }
  return out;
}
function check(teams: readonly LeagueTeam[]): void {
  if (teams.length !== 32) throw new Error('season: 32 teams needed');
  const names = new Set(teams.map((t) => t.name));
  for (const t of TEAMS) if (!names.has(t.name)) throw new Error('season: missing team ' + t.name);
}
