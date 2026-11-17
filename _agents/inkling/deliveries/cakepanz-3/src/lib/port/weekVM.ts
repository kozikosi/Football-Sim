// port/weekVM.ts — the week-stepper's view-models over the ENGINE'S RunState (the stepped path —
// playWeek one week at a time — not simulateSeason's all-at-once log). Framework-free. Every value
// derives from the engine's own Score rows / Seeding / schedule; nothing is invented. The replay key
// of every game is the season seed + the engine's own fork label (`w<week>:<home>`), so any week can
// be re-derived identically; the per-game provenance stamp is the engine's gameSeed.
import { TEAMS, gameSeed } from './seam.ts';
import type { RunState, Score, Round, Game } from './seam.ts';
import { abbrOf } from './abbr.ts';

export interface WeekGameVM {
  home: string; away: string; homeAbbr: string; awayAbbr: string;
  hs: number | null; as: number | null;      // null = not yet played (the preview state)
  kind: string;                              // div / conf4 / inter4 / conf2 / inter1 / playoff
  round: Round | null;                       // playoff rounds only
  replayLabel: string;                       // the engine's own fork label for this game
  gameSeed: number;                          // the provenance stamp (the engine's own derivation)
  me: boolean;                               // the user's team plays here
}
export interface WeekVM {
  week: number;                              // 1..18 regular; 19..22 = the playoff rounds' week slot
  label: string;                             // 'WEEK 7' / 'WILD CARD' / 'SUPER BOWL'
  games: WeekGameVM[];
  done: boolean;                             // every game of the week has a final score
}

export interface StandingsRowVM {
  team: string; abbr: string; conf: string; div: string;
  w: number; l: number; t: number; pf: number; pa: number;
  winPct: string;                            // display law: Wins may print one decimal (x.000 pct form is the engine's own)
  seed: number | null;
}
export interface StandingsVMw {
  throughWeek: number;                       // the week the standings are THROUGH (inclusive)
  league: StandingsRowVM[];                  // sorted w desc, pa asc (the engine's tiebreak)
  divisions: { conf: string; div: string; rows: StandingsRowVM[] }[];
}

const teamOf = (name: string) => TEAMS.find((t) => t.name === name);
const PLAYOFF_ROUNDS: readonly Round[] = ['Wild Card', 'Divisional', 'Conference', 'Super Bowl'];

/** The regular-season week numbers of the RunState (1..nextWeek-1 played). */
export function weekNumbers(s: RunState): number[] {
  const N = LAST_REGULAR_WEEK;
  return Array.from({ length: N }, (_, i) => i + 1);
}
export const LAST_REGULAR_WEEK = 18;

/** The playoff rounds in engine order, as stepper slots after the regular weeks (played ones only). */
export function playoffRounds(s: RunState): { round: Round; games: Score[] }[] {
  return PLAYOFF_ROUNDS
    .map((r) => ({ round: r, games: s.playoffs.filter((g) => g.round === r) }))
    .filter((x) => x.games.length > 0);
}

export function totalWeekSlots(_s: RunState): number {
  return LAST_REGULAR_WEEK + PLAYOFF_ROUNDS.length;   // 22 slots always: the stepper previews unplayed weeks too
}

/** The week's games — played weeks carry scores; the NEXT (unplayed) week carries the engine's preview fixtures. */
export function weekView(s: RunState, weekSlot: number): WeekVM {
  const N = LAST_REGULAR_WEEK;
  if (weekSlot <= N) {
    const round = null;
    const games = s.schedule.filter((g) => g.week === weekSlot).map((g) => toGameVM(s, g, round));
    return { week: weekSlot, label: 'WEEK ' + weekSlot, games, done: games.every((g) => g.hs !== null) };
  }
  const r = PLAYOFF_ROUNDS[weekSlot - N - 1] ?? null;
  if (!r) throw new Error(`weekVM: no week slot ${weekSlot}`);
  const pairs = playoffPairsOf(s, r);
  const games = pairs.map(([home, away]) => toGameVM(s, { week: weekSlot, home, away, kind: 'playoff' } as Game, r));
  return { week: weekSlot, label: r.toUpperCase(), games, done: games.every((g) => g.hs !== null) };
}

/** The playoff bracket pairs for a round from the state's own seeding + winners (empty before week 19). */
export function playoffPairsOf(s: RunState, round: Round): [string, string][] {
  const sd = s.seeding;
  if (round === 'Wild Card') {
    if (!sd) return [];
    const out: [string, string][] = [];
    for (const conf of ['AFC', 'NFC'] as const) {
      const seeds = sd.seeds[conf];
      for (const [h, l] of [[2, 7], [3, 6], [4, 5]] as [number, number][]) out.push([seeds[h - 1], seeds[l - 1]]);
    }
    return out;
  }
  const played = s.playoffs.filter((g) => g.round === round);
  return played.map((g) => [g.home, g.away]);
}

function toGameVM(s: RunState, g: Game, round: Round | null): WeekGameVM {
  const played = round
    ? s.playoffs.find((p) => p.round === round && (p.home === g.home || p.away === g.home))
    : s.scores.find((p) => p.week === g.week && p.home === g.home && p.away === g.away);
  const gs = gameSeed(s.seed, g.week, g.home);
  return {
    home: g.home, away: g.away, homeAbbr: abbrOf(g.home), awayAbbr: abbrOf(g.away),
    hs: played ? played.hs : null, as: played ? played.as : null,
    kind: round ? 'playoff' : g.kind, round,
    replayLabel: round ? `po:${round}:${g.home}` : `w${g.week}:${g.home}`,
    gameSeed: gs,
    me: false,   // set by the screen (it knows the user's team)
  };
}

/** Standings THROUGH a week (inclusive), accumulated from the engine's own Score rows. */
export function standingsThrough(s: RunState, weekSlot: number): StandingsVMw {
  const N = LAST_REGULAR_WEEK;
  const through = Math.min(weekSlot, N);
  const acc: Record<string, { w: number; l: number; t: number; pf: number; pa: number }> = {};
  for (const t of TEAMS) acc[t.name] = { w: 0, l: 0, t: 0, pf: 0, pa: 0 };
  for (const g of s.scores) {
    if (g.week > through) continue;
    const h = acc[g.home]!, a = acc[g.away]!;   // every Score team is a TEAMS name (engine-true)
    const hs = g.hs, as = g.as;
    h.pf += hs; h.pa += as; a.pf += as; a.pa += hs;
    if (hs > as) { h.w++; a.l++; } else if (as > hs) { a.w++; h.l++; } else { h.t++; a.t++; }
  }
  const seedOf = (team: string): number | null => {
    if (!s.seeding) return null;
    const a = s.seeding.seeds.AFC.indexOf(team), n = s.seeding.seeds.NFC.indexOf(team);
    return a >= 0 ? a + 1 : n >= 0 ? n + 1 : null;
  };
  const rowOf = (name: string): StandingsRowVM => {
    const t = teamOf(name)!, r = acc[name]!;
    const pct = (r.w + 0.5 * r.t) / Math.max(1, r.w + r.l + r.t);
    return {
      team: name, abbr: abbrOf(name), conf: t.conf, div: t.div,
      w: r.w, l: r.l, t: r.t, pf: r.pf, pa: r.pa,
      winPct: pct === 1 ? '1.000' : pct.toFixed(3),
      seed: seedOf(name),
    };
  };
  const league = TEAMS.map((t) => rowOf(t.name)).sort((a, b) => (b.w - a.w) || (a.pa - b.pa) || a.team.localeCompare(b.team));
  const divisions: StandingsVMw['divisions'] = [];
  for (const c of ['AFC', 'NFC'] as const) for (const d of ['East', 'North', 'South', 'West'] as const) {
    const rows = TEAMS.filter((t) => t.conf === c && t.div === d).map((t) => rowOf(t.name))
      .sort((a, b) => (b.w - a.w) || (a.pa - b.pa) || a.team.localeCompare(b.team));
    divisions.push({ conf: c, div: d, rows });
  }
  return { throughWeek: through, league, divisions };
}

// re-export for sibling modules that need the team list (single source: the seam's TEAMS)
export { TEAMS } from './seam.ts';
export type { RunState, Score, Round, Game };
