// port/feedVM.ts — the feed view-model (ported from slice 4, engine imports now through the seam).
// EVERY number comes from the frozen snapshot; nothing is generated here:
//   rosters   — the store's pick log (frozen pool, thawed by the store's own thawPool)
//   lineups   — lineupFor (the engine's), best of 4-3 / 3-4 by netPts (the fixture's own path)
//   ratings   — teamRatings(spotsOf(l), returnerRating(l)) — computed BY the engine from the lineup
//   the game  — gameSeed(seed, week, home) -> simulateGame(matchupModel …) — the SAME derivation the
//               season uses, so the season stepper replays exactly this game from the same save
//   the feed  — gameFeed(result, home, away) — the snapshot's own app/feed.ts mapper (the FeedEvent union)
// The view-model only SHAPES: abbrs, inks, running scores, lead-change marks, the me-flag. Plain JSON out.
// The v1 union's `yards: null` law is honoured downstream by the mapper — no yard figure is rendered.
import {
  thawPool, lineupFor, leagueBaseline, spotsOf, teamRatings, returnerRating, netPts, TEAMS,
  matchupModel, teamIdentity, simulateGame, gameFeed, buildSchedule, initialRanks, gameSeed, makeRng,
} from './seam.ts';
import type { SaveRecord, Player, Lineup, Ratings, GameResult, GameFeed, DriveEvent, Game, LeagueTeam } from './seam.ts';
import { abbrOf } from './abbr.ts';
import { inkOf } from './ink.ts';
import type { TeamInk } from './ink.ts';

export const FEED_YEAR = 2027;   // the label year for the demo week (informational; drives nothing)

export interface FeedDriveVM extends DriveEvent {
  homeAbbr: string; awayAbbr: string;
  teamAbbr: string; teamInk: string; teamPale: string;
  me: boolean;                                   // the user's team has the ball (the zrl-me glow)
  leadChange: boolean;                           // this drive flipped (or first broke) the lead
  scoreAfter: { home: number; away: number };    // the running score after the drive
  badges: { label: string; tone: 'good' | 'bad' | 'gold' | 'sub' }[];   // the w88 zrl-badge chips
  convBadges: { label: string; tone: 'good' | 'sub' }[];
}

export interface FeedVM {
  week: number; year: number;
  home: string; away: string; homeAbbr: string; awayAbbr: string;
  homeInk: TeamInk; awayInk: TeamInk;
  homeScore: number; awayScore: number;
  regHome: number; regAway: number;
  ot: { first: string; periods: number; tie: boolean } | null;
  gameSeedLabel: string;                         // the provenance stamp (the witness-gate spirit)
  drives: FeedDriveVM[];
  meDrives: number;
  leadChanges: number;
  userWon: boolean | null;                       // null: a tie
}

/** The rosters the finished draft produced (team index -> players), thawed from the frozen pool. */
export function rostersOfRecord(record: SaveRecord): Player[][] {
  const pool = thawPool(record.pool);
  const byId = new Map(pool.map((p) => [p.id, p]));
  const rosters: Player[][] = TEAMS.map(() => []);
  for (const k of record.picks) {
    const p = byId.get(k.pid);
    if (p) rosters[k.team]?.push(p);
  }
  return rosters;
}

/** The engine's team ratings from a drafted roster (the fixture's own path; the engine computes, not the UI). */
export function teamRatingsOf(roster: Player[]): { lineup: Lineup; ratings: Ratings } {
  const bases = (['4-3', '3-4'] as const).map((b) => lineupFor(roster, b));
  const rated = bases.map((l) => ({ l, R: teamRatings(spotsOf(l), returnerRating(l)) }));
  const lg0 = leagueBaseline(rated.map((x) => x.R));   // provisional baseline to compare the two fronts
  const best = rated[1] && netPts(rated[1].R, lg0) > netPts(rated[0].R, lg0) ? rated[1] : rated[0];
  return { lineup: best.l, ratings: best.R };
}

/** The 32 engine-rated teams from a finished draft record (the season constructor's own path). */
export function ratedLeagueOfRecord(record: SaveRecord): LeagueTeam[] {
  return TEAMS.map((t, i) => ({ name: t.name, ratings: teamRatingsOf(rostersOfRecord(record)[i]).ratings }));
}

/** The week-1 game for the user's team, played by the engine. Deterministic: same record+seed -> same game. */
export function playUserWeek(record: SaveRecord, seed: number, userTeam: number): {
  result: GameResult; home: string; away: string; gs: number; userHome: boolean; schedule: Game[];
} {
  const teams = ratedLeagueOfRecord(record);
  const schedule = buildSchedule(makeRng(seed).fork('schedule'), FEED_YEAR, initialRanks(teams)).sort((a, b) => a.week - b.week);
  const userName = TEAMS[userTeam].name;
  const fx = schedule.find((g) => g.week === 1 && (g.home === userName || g.away === userName));
  if (!fx) throw new Error('feed: the user has no week-1 game on the engine schedule');
  const home = fx.home, away = fx.away;
  const H = teams[TEAMS.findIndex((t) => t.name === home)], A = teams[TEAMS.findIndex((t) => t.name === away)];
  const lg = leagueBaseline(teams.map((t) => t.ratings));
  const ih = teamIdentity(H.ratings, lg), ia = teamIdentity(A.ratings, lg);
  const mh = matchupModel(H.ratings, A.ratings, lg, { off: ih.off, def: ia.def });
  const ma = matchupModel(A.ratings, H.ratings, lg, { off: ia.off, def: ih.def });
  const gs = gameSeed(seed, fx.week, home);            // the engine's own derivation (a week-preview save stores this)
  const result = simulateGame(mh, ma, makeRng(gs), { playoff: false });
  return { result, home, away, gs, userHome: home === userName, schedule };
}

const BADGE: Record<string, { label: string; tone: 'good' | 'bad' | 'gold' | 'sub' }> = {
  TD: { label: 'TD', tone: 'good' }, FG: { label: 'FG', tone: 'good' },
  INT: { label: 'INT', tone: 'bad' }, FUM: { label: 'FUM', tone: 'bad' },
  PUNT: { label: 'PUNT', tone: 'sub' }, DOWNS: { label: 'DOWNS', tone: 'sub' },
  FG_MISS: { label: 'MISS', tone: 'bad' }, HALF: { label: 'EOH', tone: 'sub' },
  SAFETY: { label: 'SAFETY', tone: 'bad' },
};
const CONV_BADGE: Record<string, { label: string; tone: 'good' | 'sub' }> = {
  xp: { label: 'XP', tone: 'good' }, two: { label: '2PT', tone: 'good' },
  xp_miss: { label: 'XP MISS', tone: 'sub' }, two_fail: { label: '2PT FAIL', tone: 'sub' }, none: { label: 'NO TRY', tone: 'sub' },
};

/** The whole feed view-model for ANY engine-played game (the season stepper passes its playWeek result). */
export function feedForGame(
  result: GameResult, home: string, away: string, opts: { week: number; year?: number; round?: string | null; gs?: number; userTeamName?: string },
): FeedVM {
  const week = opts.week, year = opts.year ?? FEED_YEAR;
  const gf: GameFeed = gameFeed(result, home, away);
  const inks: Record<string, TeamInk> = { [home]: inkOf(home), [away]: inkOf(away) };
  const userName = opts.userTeamName ?? '';
  let runH = 0, runA = 0, leadChanges = 0, meDrives = 0;
  let leader: 'home' | 'away' | 'tie' = 'tie';
  const drives: FeedDriveVM[] = gf.drives.map((d) => {
    const homeDrive = d.team === home;
    if (homeDrive) { runH += d.pts; runA += d.oppPts; } else { runA += d.pts; runH += d.oppPts; }
    if (d.team === userName) meDrives++;
    const nowLeader: 'home' | 'away' | 'tie' = runH > runA ? 'home' : runA > runH ? 'away' : 'tie';
    const leadChange = nowLeader !== leader && nowLeader !== 'tie';
    if (leadChange) leadChanges++;
    leader = nowLeader;
    const badges: FeedDriveVM['badges'] = [];
    const b = BADGE[d.end] ?? { label: d.end, tone: 'sub' as const };
    badges.push(b);
    if (d.defTD) badges.push({ label: 'DEF TD', tone: 'gold' });
    if (leadChange) badges.push({ label: 'LEAD Δ', tone: 'gold' });
    const tdScore = d.scores.find((s) => s.kind === 'TD' && s.team === d.team);
    const convBadges = tdScore ? [CONV_BADGE[tdScore.conv]].filter((x): x is { label: string; tone: 'good' | 'sub' } => !!x) : [];
    return {
      ...d,
      homeAbbr: abbrOf(home), awayAbbr: abbrOf(away),
      teamAbbr: abbrOf(d.team),
      teamInk: inks[d.team].pale, teamPale: inks[d.team].pale,
      me: d.team === userName,
      leadChange, scoreAfter: { home: runH, away: runA },
      badges, convBadges,
    };
  });
  const roundLabel = opts.round ? ` · ${opts.round}` : '';
  return {
    week, year,
    home, away, homeAbbr: abbrOf(home), awayAbbr: abbrOf(away),
    homeInk: inks[home], awayInk: inks[away],
    homeScore: gf.homeScore, awayScore: gf.awayScore, regHome: gf.regHome, regAway: gf.regAway,
    ot: gf.ot, gameSeedLabel: `gameSeed ${opts.gs ?? '?'} · week ${week}${roundLabel} · ${away} @ ${home} · played by the pinned engine`,
    drives, meDrives, leadChanges,
    userWon: gf.homeScore === gf.awayScore ? null : (gf.homeScore > gf.awayScore ? home === userName : away === userName),
  };
}

/** The slice-4 feed: the finished draft's REAL week-1 game. Kept verbatim as the battery pins it. */
export function feedVM(record: SaveRecord, seed: number, userTeam: number): FeedVM {
  const { result, home, away, gs, userHome } = playUserWeek(record, seed, userTeam);
  const vm = feedForGame(result, home, away, { week: 1, year: FEED_YEAR, gs, userTeamName: TEAMS[userTeam].name });
  // the slice-4 provenance sentence, byte-preserved for the battery
  vm.gameSeedLabel = `gameSeed ${gs} · week 1 · ${away} @ ${home} · played by the pinned engine`;
  void userHome;
  return vm;
}

/** The season stepper's feed: re-derives the user's game for a given week from the STORED state
 *  (engine-true and deterministic — the same gameSeed replays the same game). */
export function feedForRunStateWeek(state: import('./seam.ts').RunState, teams: LeagueTeam[], userTeamName: string, week: number, dark = true): FeedVM | null {
  const played = [...state.scores, ...state.playoffs].find((g) => (g.home === userTeamName || g.away === userTeamName) && g.week === week);
  const round = played?.round ?? null;
  const gs = gameSeed(state.seed, week, played ? played.home : '');
  // re-derive the full game from the two teams' ratings + the state's own plans (the seasonrun path)
  const by = new Map(teams.map((t) => [t.name, t.ratings] as const));
  const lg = leagueBaseline(teams.map((t) => t.ratings));
  const H = by.get(played ? played.home : ''), A = by.get(played ? played.away : '');
  if (!H || !A || !played) return null;
  const ih = teamIdentity(H, lg), ia = teamIdentity(A, lg);
  const mh = matchupModel(H, A, lg, { off: ih.off, def: ia.def });
  const ma = matchupModel(A, H, lg, { off: ia.off, def: ih.def });
  const result = simulateGame(mh, ma, makeRng(gs), { playoff: !!round });
  return feedForGame(result, played.home, played.away, { week, round, gs, userTeamName, year: state.year });
}
