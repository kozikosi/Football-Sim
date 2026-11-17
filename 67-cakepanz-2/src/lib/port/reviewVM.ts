// port/reviewVM.ts — the review view-models: the w89 review grammar (integer chips; plain informative
// lines; no "expected scoring"; every turnover NAMED; overtime events only in the OT block; "2-Pt
// Conv" except in the Guide). THE RECAP IS THE ENGINE'S buildRecap OUTPUT — the shell only re-shapes
// the engine's own Recap/RecapLine/StarLine into review rows and chips, never re-words them. The 90+
// shimmer rides the star line's own grade (recap.ts: "50 is an ordinary day, 90 a great one").
// No injuries anywhere, ever.
import { buildRecap, showInt } from './seam.ts';
import type { Recap, BoxScore, GameResult, StarLine, TurnoverLine } from './seam.ts';
import { abbrOf } from './abbr.ts';
import { inkOf } from './ink.ts';

export interface ReviewChipVM { label: string; value: string }         // integer chips
export interface ReviewLineVM { period: string; clock: string; text: string; team: string; teamAbbr: string; score: string; tone: 'good' | 'bad' | 'sub'; me: boolean; decisive: boolean }
export interface ReviewVM {
  home: string; away: string; homeAbbr: string; awayAbbr: string;
  homeInk: { ink: string; pale: string }; awayInk: { ink: string; pale: string };
  homeScore: number; awayScore: number;
  overtime: boolean;
  chips: ReviewChipVM[];
  scoring: ReviewLineVM[];      // every score, plain informative, in order
  turnovers: ReviewLineVM[];    // EVERY turnover named (who threw, who took, who forced)
  ot: ReviewLineVM[];           // overtime events ONLY in the OT block (never "sudden death")
  stars: { name: string; team: string; abbr: string; label: string; stat: string; ball: boolean; grade: number; shimmer: boolean }[];
  result: 'home' | 'away' | 'tie';
}

export function reviewVM(res: GameResult, box: BoxScore, opts: { userTeamName?: string; dark?: boolean } = {}): ReviewVM {
  const recap: Recap = buildRecap(res, box);
  const dark = opts.dark ?? true;
  const me = (t: string) => !!opts.userTeamName && t === opts.userTeamName;
  const lineVM = (l: import('./seam.ts').RecapLine): ReviewLineVM => ({
    period: l.period, clock: l.clock,
    text: l.text,                                  // the engine's own plain informative line (verbatim)
    team: l.team, teamAbbr: abbrOf(l.team), score: l.score,
    tone: me(l.team) ? 'good' : 'sub',
    me: me(l.team),
    decisive: l.decisive,
  });
  const chips: ReviewChipVM[] = [
    { label: 'TOTAL POINTS', value: showInt(recap.homeScore + recap.awayScore) },
    { label: 'TURNOVERS', value: showInt(recap.turnovers.home + recap.turnovers.away) },
    { label: 'SCORING PLAYS', value: showInt(recap.scoring.length) },
    { label: 'OT PLAYS', value: showInt(recap.overtime ? recap.scoring.filter((l) => l.period === 'OT').length : 0) },
  ];
  const stars = recap.stars.map((s: StarLine) => ({
    name: s.name, team: s.team, abbr: abbrOf(s.team), label: s.label, stat: s.stat, ball: s.ball,
    grade: s.grade,
    shimmer: s.grade >= 90,                        // the w89 law: 90+ shimmer, one per page max enforced in CSS
  }));
  return {
    home: recap.home, away: recap.away, homeAbbr: abbrOf(recap.home), awayAbbr: abbrOf(recap.away),
    homeInk: inkOf(recap.home, dark), awayInk: inkOf(recap.away, dark),
    homeScore: recap.homeScore, awayScore: recap.awayScore,
    overtime: recap.overtime,
    chips,
    scoring: recap.scoring.map(lineVM),
    turnovers: recap.turnovers.lines.map((t: TurnoverLine) => ({
      period: t.period, clock: t.clock,
      text: t.text,                                // the engine's own turnover sentence — every turnover NAMED
      team: t.team, teamAbbr: abbrOf(t.team), score: '',
      tone: 'bad', me: me(t.team),
      decisive: false,
    })),
    ot: recap.overtime ? recap.scoring.filter((l) => l.period === 'OT').map(lineVM) : [],
    stars,
    result: recap.winner ?? 'tie',
  };
}

/** The season review (the run's conclusion): the run's own numbers + the honest per-stage summary. */
export interface SeasonReviewVM {
  year: number; userTeam: string; userAbbr: string;
  outcome: string;                                // phrased plain from the engine's own outcome
  w: number; l: number; t: number; pf: number; pa: number;
  gamesPlayed: number;
  champion: string; championAbbr: string;
  userMadePlayoffs: boolean;
  highlightLines: string[];                       // plain informative lines (no promises, integers)
}

const OUTCOME_PHRASE: Record<string, string> = {
  'missed-playoffs': 'The season ended in week 18 — the playoffs went on without you.',
  'wild-card': 'Your season ended in the Wild Card round.',
  'divisional': 'Your season ended in the Divisional round.',
  'conference': 'Your season ended in the Conference championship.',
  'super-bowl-loss': 'You reached the Super Bowl and fell one game short.',
  'champion': 'You won the Super Bowl.',
};

export function seasonReviewVM(
  s: { year: number; scores: { home: string; away: string; hs: number; as: number; round?: string }[]; playoffs: { home: string; away: string; hs: number; as: number; round?: string }[]; champion: string | null; table: Record<string, { w: number; l: number; t: number; pf: number; pa: number }> },
  userTeamName: string,
): SeasonReviewVM {
  const mine = [...s.scores, ...s.playoffs].filter((g) => g.home === userTeamName || g.away === userTeamName);
  const row = s.table[userTeamName] ?? { w: 0, l: 0, t: 0, pf: 0, pa: 0 };
  const lastRound = mine.filter((g) => g.round).map((g) => g.round!).pop();
  const outcome = s.champion === userTeamName ? 'champion' : lastRound ?? 'missed-playoffs';
  return {
    year: s.year, userTeam: userTeamName, userAbbr: abbrOf(userTeamName),
    outcome: OUTCOME_PHRASE[outcome] ?? OUTCOME_PHRASE['missed-playoffs'],
    w: row.w, l: row.l, t: row.t, pf: row.pf, pa: row.pa,
    gamesPlayed: mine.length,
    champion: s.champion ?? '', championAbbr: s.champion ? abbrOf(s.champion) : '',
    userMadePlayoffs: !!lastRound,
    highlightLines: [
      `You played ${mine.length} games and went ${row.w}-${row.l}${row.t ? '-' + row.t : ''}.`,
      `Your team scored ${row.pf} points and allowed ${row.pa}.`,
      s.champion ? `The season's champion: ${s.champion}.` : 'The season is not finished yet.',
    ],
  };
}
