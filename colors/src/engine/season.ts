// A season: the schedule, every game through the drive generator, standings, seeding and the playoffs to the Super Bowl.
// Plans: each team plays its coaching identity (teamIdentity: the plan it would pick against an average opponent). Week-by-week mixed plans
// (Pre-Colors choosePlans/samplePlans) and the user's own plan choices are not ported yet.
import { simulateGame } from './drives.ts';
import type { GameResult } from './drives.ts';
import { TEAM_BY_NAME, TEAMS, DIVS, divisionTeams } from './league.ts';
import type { Conf } from './league.ts';
import { matchupModel } from './matchup.ts';
import type { Plan } from './specs.ts';
import { teamIdentity } from './plans.ts';
import { leagueBaseline } from './ratings.ts';
import type { Ratings } from './ratings.ts';
import type { Rng } from './rng.ts';
import { buildSchedule } from './schedule.ts';
import type { Game } from './schedule.ts';
import { seedPlayoffs } from './standings.ts';
import type { Played, Seeding } from './standings.ts';

export interface LeagueTeam { name: string; ratings: Ratings }
export type Round = 'Wild Card' | 'Divisional' | 'Conference' | 'Super Bowl';
export interface GameLog { week: number; round?: Round; kind: Game['kind'] | 'playoff'; home: string; away: string; homeField?: number; result: GameResult }
export interface Record3 { w: number; l: number; t: number; pf: number; pa: number }
export interface SeasonResult {
  year: number; schedule: Game[]; games: GameLog[]; playoffs: GameLog[]; seeding: Seeding;
  table: Record<string, Record3>; champion: string; finalists: [string, string]; nextRank: Record<string, number>;
}

// last season's division finish for a first season: by team strength (offence + defence)
export function initialRanks(teams: readonly LeagueTeam[]): Record<string, number> {
  const by = Object.fromEntries(teams.map((t) => [t.name, t.ratings])) as Record<string, Ratings>, rank: Record<string, number> = {};
  for (const c of ['AFC', 'NFC'] as const) for (const d of DIVS) divisionTeams(c, d).sort((a, b) => by[b].off + by[b].def - by[a].off - by[a].def).forEach((n, i) => (rank[n] = i + 1));
  return rank;
}

export function simulateSeason(teams: readonly LeagueTeam[], rng: Rng, opts: { year: number; prevRank?: Record<string, number>; homeField?: number }): SeasonResult {
  if (teams.length !== 32) throw new Error('season: 32 teams needed');
  const by = new Map(teams.map((t) => [t.name, t.ratings]));
  for (const t of TEAMS) if (!by.has(t.name)) throw new Error('season: missing team ' + t.name);
  const lg = leagueBaseline(teams.map((t) => t.ratings));
  const plan = new Map<string, Plan>();
  for (const t of teams) { const id = teamIdentity(t.ratings, lg); plan.set(t.name, { off: id.off, def: id.def }); }
  const play = (home: string, away: string, playoff: boolean, label: string, hf?: number): GameResult => {
    const H = by.get(home)!, A = by.get(away)!;
    const mh = matchupModel(H, A, lg, { off: plan.get(home)!.off, def: plan.get(away)!.def }), ma = matchupModel(A, H, lg, { off: plan.get(away)!.off, def: plan.get(home)!.def });
    return simulateGame(mh, ma, rng.fork(label), { playoff, homeField: hf ?? opts.homeField });
  };
  const schedule = buildSchedule(rng.fork('schedule'), opts.year, opts.prevRank ?? initialRanks(teams));
  const games: GameLog[] = schedule.slice().sort((a, b) => a.week - b.week).map((g) => ({ week: g.week, kind: g.kind, home: g.home, away: g.away, result: play(g.home, g.away, false, `w${g.week}:${g.home}`) }));
  const played: Played[] = games.map((g) => ({ home: g.home, away: g.away, hs: g.result.homeScore, as: g.result.awayScore, htd: tds(g.result, 'home'), atd: tds(g.result, 'away') }));
  const table: Record<string, Record3> = Object.fromEntries(TEAMS.map((t) => [t.name, { w: 0, l: 0, t: 0, pf: 0, pa: 0 }]));
  for (const p of played) {
    const h = table[p.home], a = table[p.away];
    h.pf += p.hs; h.pa += p.as; a.pf += p.as; a.pa += p.hs;
    if (p.hs > p.as) { h.w++; a.l++; } else if (p.hs < p.as) { a.w++; h.l++; } else { h.t++; a.t++; }
  }
  const seeding = seedPlayoffs(played, rng.fork('seeding'));
  const playoffs: GameLog[] = [];
  const meet = (round: Round, hi: string, lo: string, week: number): string => {
    const hf = round === 'Super Bowl' ? 0 : opts.homeField, r = play(hi, lo, true, `po:${round}:${hi}`, hf);
    playoffs.push({ week, round, kind: 'playoff', home: hi, away: lo, homeField: hf, result: r });
    return r.homeScore > r.awayScore ? hi : lo;
  };
  const champs: Record<Conf, string> = { AFC: '', NFC: '' };
  for (const conf of ['AFC', 'NFC'] as const) {
    const s = seeding.seeds[conf], seedOf = (t: string) => s.indexOf(t) + 1;
    const wc = [[2, 7], [3, 6], [4, 5]].map(([h, l]) => meet('Wild Card', s[h - 1], s[l - 1], 19));
    const alive = [s[0], ...wc].sort((a, b) => seedOf(a) - seedOf(b));      // the #1 seed and the three winners
    const lowest = alive[alive.length - 1];
    const dv = [meet('Divisional', alive[0], lowest, 20), meet('Divisional', alive[1], alive[2], 20)].sort((a, b) => seedOf(a) - seedOf(b));
    champs[conf] = meet('Conference', dv[0], dv[1], 21);
  }
  const hostIsAfc = opts.year % 2 === 1;   // the designated home team of the Super Bowl alternates; there is no home-field edge
  const [sbHome, sbAway] = hostIsAfc ? [champs.AFC, champs.NFC] : [champs.NFC, champs.AFC];
  const champion = meet('Super Bowl', sbHome, sbAway, 22);
  return { year: opts.year, schedule, games, playoffs, seeding, table, champion, finalists: [sbHome, sbAway], nextRank: seeding.divisionRank };
}
function tds(r: GameResult, side: 'home' | 'away'): number { return r.events.filter((e) => e.side === side && (e.kind === 'TD' || e.kind === 'DEF_TD')).length; }
export { TEAM_BY_NAME };
