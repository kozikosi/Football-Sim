// Slice 4 — the feed view-model: the draft's finished rosters -> the user's REAL week-1 game -> plain JSON.
// EVERY number comes from the engine snapshot (pinned 4ca9a071); nothing is generated here:
//   rosters   — the store's pick log (frozen pool, thawed by the store's own thawPool)
//   lineups   — lineupFor (the engine's), best of 4-3 / 3-4 by netPts (the fixture's own path)
//   ratings   — teamRatings(spotsOf(l), returnerRating(l)) — computed BY the engine from the lineup
//   fixture   — buildSchedule(makeRng(seed).fork('schedule'), …) — the engine's real week-1 schedule
//   the game  — gameSeed(seed, week, home) -> simulateGame(matchupModel …) — the SAME derivation the
//               season uses, so a later season slice replays exactly this game from the same save
//   the feed  — gameFeed(result, home, away) — the snapshot's own app/feed.ts mapper (the FeedEvent union)
// The view-model only SHAPES: abbrs, inks, running scores, lead-change marks, the me-flag. Plain JSON out.
import { thawPool } from '../engine/sports/nfl/app/store.ts';
import type { SaveRecord } from '../engine/sports/nfl/app/store.ts';
import type { Player } from '../engine/sports/nfl/engine/players.ts';
import { lineupFor } from '../engine/sports/nfl/engine/lineup.ts';
import type { Lineup } from '../engine/sports/nfl/engine/lineup.ts';
import { leagueBaseline, spotsOf, teamRatings } from '../engine/sports/nfl/engine/ratings.ts';
import type { Ratings } from '../engine/sports/nfl/engine/ratings.ts';
import { returnerRating } from '../engine/sports/nfl/engine/returner.ts';
import { netPts } from '../engine/sports/nfl/engine/value.ts';
import { TEAMS } from '../engine/sports/nfl/engine/league.ts';
import { matchupModel } from '../engine/sports/nfl/engine/matchup.ts';
import { teamIdentity } from '../engine/sports/nfl/engine/plans.ts';
import { simulateGame } from '../engine/sports/nfl/engine/drives.ts';
import type { GameResult } from '../engine/sports/nfl/engine/drives.ts';
import { gameFeed } from '../engine/sports/nfl/app/feed.ts';
import type { GameFeed, DriveEvent } from '../engine/sports/nfl/app/feed.ts';
import { buildSchedule } from '../engine/sports/nfl/engine/schedule.ts';
import type { Game } from '../engine/sports/nfl/engine/schedule.ts';
import { initialRanks } from '../engine/sports/nfl/engine/season.ts';
import type { LeagueTeam } from '../engine/sports/nfl/engine/season.ts';
import { gameSeed } from '../engine/sports/nfl/engine/seasonrun.ts';
import { makeRng } from '../engine/core/rng.ts';
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

/** The week-1 game for the user's team, played by the engine. Deterministic: same record+seed -> same game. */
export function playUserWeek(record: SaveRecord, seed: number, userTeam: number): {
  result: GameResult; home: string; away: string; gs: number; userHome: boolean; schedule: Game[];
} {
  const rosters = rostersOfRecord(record);
  const rated = rosters.map((r) => teamRatingsOf(r));
  const teams: LeagueTeam[] = TEAMS.map((t, i) => ({ name: t.name, ratings: rated[i].ratings }));
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

/** The whole feed view-model: engine result + the snapshot's mapper -> plain JSON for the screen. */
export function feedVM(record: SaveRecord, seed: number, userTeam: number): FeedVM {
  const { result, home, away, gs, userHome } = playUserWeek(record, seed, userTeam);
  const gf: GameFeed = gameFeed(result, home, away);          // the snapshot's own mapper (the FeedEvent union)
  const inks: Record<string, TeamInk> = { [home]: inkOf(home), [away]: inkOf(away) };
  const userName = TEAMS[userTeam].name;
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
  return {
    week: 1, year: FEED_YEAR,
    home, away, homeAbbr: abbrOf(home), awayAbbr: abbrOf(away),
    homeInk: inks[home], awayInk: inks[away],
    homeScore: gf.homeScore, awayScore: gf.awayScore, regHome: gf.regHome, regAway: gf.regAway,
    ot: gf.ot, gameSeedLabel: `gameSeed ${gs} · week 1 · ${away} @ ${home} · played by the pinned engine`,
    drives, meDrives, leadChanges,
    userWon: gf.homeScore === gf.awayScore ? null : (gf.homeScore > gf.awayScore ? userHome : !userHome),
  };
}
