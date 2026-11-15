// weekVM.ts — the week-stepper's view-models, framework-free, IDENTICAL BYTES in both fresh-start
// repos (the store-heavy tie-breaker's shared layer). EVERY value derives from the engine's own
// SeasonResult (simulateSeason): the per-week game list, the running standings THROUGH any week,
// and the playoff rounds. Nothing is invented here: standings-after-week accumulate the engine's
// own GameLog results (week <= N), sorted with the engine's own tiebreak (wins desc, then pa asc —
// the same order toStandings uses inside divisions). The replay key of every game is the season
// seed + the engine's own fork label (`w<week>:<home>`), so any week can be re-derived identically.
import type { SeasonResult, GameLog, Round } from '../engine/sports/nfl/engine/season.ts';
import { TEAMS } from '../engine/sports/nfl/engine/league.ts';
import { abbrOf } from './abbr.ts';

export interface WeekGameVM {
  home: string; away: string; homeAbbr: string; awayAbbr: string;
  hs: number; as: number;                    // final score of the game (engine GameResult)
  kind: string;                              // div / conf4 / inter4 / conf2 / inter1 / playoff
  round: Round | null;                       // playoff rounds only
  replayLabel: string;                       // the engine's own fork label for this game
}
export interface WeekVM {
  week: number;                              // 1..18 regular; 19..22 = the playoff rounds' week slot
  label: string;                             // 'WEEK 7' / 'WILD CARD' / 'SUPER BOWL'
  games: WeekGameVM[];
  done: boolean;                             // every game of the week has a final score (always true post-sim)
}

export interface StandingsRowVM {
  team: string; abbr: string; conf: string; div: string;
  w: number; l: number; t: number; pf: number; pa: number;
  winPct: string;                            // display integer/decimal law: one decimal
}
export interface StandingsVMw {
  throughWeek: number;                       // the week the standings are THROUGH (inclusive)
  league: StandingsRowVM[];                  // sorted w desc, pa asc (the engine's tiebreak)
  divisions: { conf: string; div: string; rows: StandingsRowVM[] }[];
  clinched: string[];                        // teams already eliminated-from-nothing: division leaders (w-based)
}

const teamOf = (name: string) => TEAMS.find((t) => t.name === name)!;
const totalWeeks = (s: SeasonResult): number => s.games.reduce((m, g) => Math.max(m, g.week), 0);

/** The regular-season week numbers of the season (1..N from the engine's own GameLog weeks). */
export function weekNumbers(s: SeasonResult): number[] {
  return Array.from({ length: totalWeeks(s) }, (_, i) => i + 1);
}

/** The playoff rounds in engine order (Wild Card -> Super Bowl), as stepper slots after the regular weeks. */
export function playoffRounds(s: SeasonResult): { round: Round; games: GameLog[] }[] {
  const rounds: Round[] = ['Wild Card', 'Divisional', 'Conference', 'Super Bowl'];
  return rounds
    .map((r) => ({ round: r, games: s.playoffs.filter((g) => g.round === r) }))
    .filter((x) => x.games.length > 0);
}

/** The week's games (regular or playoff slot). weekSlot 1..N = regular weeks; N+1.. = playoff rounds in order. */
export function weekView(s: SeasonResult, weekSlot: number): WeekVM {
  const N = totalWeeks(s);
  const rounds = playoffRounds(s);
  if (weekSlot <= N) {
    const games = s.games.filter((g) => g.week === weekSlot);
    return {
      week: weekSlot, label: 'WEEK ' + weekSlot,
      games: games.map((g) => toGameVM(g, `w${g.week}:${g.home}`)),
      done: true,
    };
  }
  const r = rounds[weekSlot - N - 1];
  if (!r) throw new Error(`weekVM: no week slot ${weekSlot} (season has ${N} weeks + ${rounds.length} rounds)`);
  return {
    week: weekSlot, label: r.round.toUpperCase(),
    games: r.games.map((g) => toGameVM(g, g.round !== undefined ? `${g.round}:${g.home}` : `w${g.week}:${g.home}`)),
    done: true,
  };
}

export function totalWeekSlots(s: SeasonResult): number {
  return totalWeeks(s) + playoffRounds(s).length;
}

function toGameVM(g: GameLog, replayLabel: string): WeekGameVM {
  return {
    home: g.home, away: g.away, homeAbbr: abbrOf(g.home), awayAbbr: abbrOf(g.away),
    hs: g.result.homeScore, as: g.result.awayScore, kind: g.kind, round: g.round ?? null, replayLabel,
  };
}

/** Standings THROUGH a week slot (inclusive), accumulated from the engine's own GameLog rows. */
export function standingsThrough(s: SeasonResult, weekSlot: number): StandingsVMw {
  const N = totalWeeks(s);
  const through = Math.min(weekSlot, N);
  const acc: Record<string, { w: number; l: number; t: number; pf: number; pa: number }> = {};
  for (const t of TEAMS) acc[t.name] = { w: 0, l: 0, t: 0, pf: 0, pa: 0 };
  for (const g of s.games) {
    if (g.week > through) continue;
    const h = acc[g.home]!, a = acc[g.away]!;   // every GameLog team is a TEAMS name (engine-true)
    const hs = g.result.homeScore, as = g.result.awayScore;
    h.pf += hs; h.pa += as; a.pf += as; a.pa += hs;
    if (hs > as) { h.w++; a.l++; } else if (as > hs) { a.w++; h.l++; } else { h.t++; a.t++; }
  }
  const rowOf = (name: string): StandingsRowVM => {
    const t = teamOf(name), r = acc[name]!;
    return {
      team: name, abbr: abbrOf(name), conf: t.conf, div: t.div,
      w: r.w, l: r.l, t: r.t, pf: r.pf, pa: r.pa,
      winPct: (r.w + 0.5 * r.t) / Math.max(1, r.w + r.l + r.t) === 1 ? '1.000' : ((r.w + 0.5 * r.t) / Math.max(1, r.w + r.l + r.t)).toFixed(3),
    };
  };
  const league = TEAMS.map((t) => rowOf(t.name)).sort((a, b) => (b.w - a.w) || (a.pa - b.pa) || a.team.localeCompare(b.team));
  const divisions: StandingsVMw['divisions'] = [];
  for (const c of ['AFC', 'NFC'] as const) for (const d of ['East', 'North', 'South', 'West'] as const) {
    const rows = TEAMS.filter((t) => t.conf === c && t.div === d).map((t) => rowOf(t.name))
      .sort((a, b) => (b.w - a.w) || (a.pa - b.pa) || a.team.localeCompare(b.team));
    divisions.push({ conf: c, div: d, rows });
  }
  const clinched = divisions.map((d) => d.rows[0]!.team);
  return { throughWeek: through, league, divisions, clinched };
}
