// The game feed contract (w74 item 4d, Z.ai draft — awaiting Architect ruling on the granularity freeze).
//
// Granularity: DRIVE-LEVEL ONLY in v1. Play-by-play (individual plays inside a drive) is deferred — the union is
// EXTENSIBLE, so adding a `play` member later is additive (new member, new optional field on GameFeed), never a
// rename. The engine already produces everything the drive level needs: GameResult.drives (engine/drives.ts).
//
// Where it lives: app/, not engine/ — the feed is a VIEW over engine results, and storage never sees it (the feed
// is derived from the game the envelope's gameSeed regenerates; storing it would violate the "no game results in
// state" rule in appstate.ts, 1.13 MB/season). A reducer plays the user's game via the engine, maps GameResult
// through gameFeed() below, and the screen renders the view model.
//
// Design rules (from the w72 §5 proposal, unchanged):
//   - One FeedEvent per DRIVE, in game order (drives[] is already ordered).
//   - Clock shown as period + mm:ss of game time (start/secs are engine seconds elapsed).
//   - Everything is plain JSON: no engine types leak to the screen (Side maps to team names at the mapper).
//   - The union is closed in v1 but versioned by `v` on GameFeed; a future play-level member bumps `v` additively.

import type { GameResult, Drive, DriveEnd, Conv, ScoreKind } from '../engine/drives.ts';
import { TEAMS } from '../engine/league.ts';

/** The scoring events inside one drive, collapsed to what a drive-level feed shows. */
export interface FeedScore { team: string; kind: ScoreKind; pts: number; conv: Conv; at: number }   // at = game seconds

/** One drive, as the feed shows it. Drive-level fields only (no plays, no play-by-play). */
export interface DriveEvent {
  kind: 'drive';
  n: number;                    // 1-based drive number in the game
  team: string;                 // team name with the ball
  period: number;               // 1-4 regulation, 5+ overtime
  clock: string;                // "Q2 08:31" — start-of-drive game clock, formatted
  plays: number;
  yards: number | null;         // v1: null — the engine's Drive carries rush/pass attempts but not per-drive yards; do not fake it (flagged guess: field reserved, fed when the engine exposes it)
  end: DriveEnd;                // how it ended: TD, FG, FG_MISS, PUNT, INT, FUM, DOWNS, HALF, SAFETY
  pts: number;                  // points this drive produced for `team` (TD+conv or FG)
  oppPts: number;               // points the OTHER team scored off this drive (defensive TD 7, safety 2)
  defTD: boolean;               // the giveaway was returned all the way
  scores: FeedScore[];          // scoring events inside the drive, in order
  summary: string;              // one plain sentence: "JAG drive ends in a 24-yard field goal. 7 plays, 3:12."
}

/** A whole game's drive-level feed. v extends additively: v1 = drive; v2 may add 'play' events. */
export interface GameFeed {
  v: 1;
  home: string; away: string;
  homeScore: number; awayScore: number;
  regHome: number; regAway: number;       // regulation score (the OT story is told by the drives)
  ot: { first: string; periods: number; tie: boolean } | null;   // overtime summary, team names not Sides
  drives: DriveEvent[];
  mvpLine: string | null;                 // deferred: null in v1 (needs box-score join; play-by-play's grandchild)
}

/**
 * Map an engine GameResult to the drive-level feed. Pure, no randomness, no DOM: the same GameResult always
 * maps to the same feed (the feed is DERIVED data under appstate.ts's classification, never stored).
 * homeTeam/awayTeam are the team NAMES the game was played under (the caller has them from the fixture).
 */
export function gameFeed(r: GameResult, homeTeam: string, awayTeam: string): GameFeed {
  const nameOf = (s: 'home' | 'away'): string => (s === 'home' ? homeTeam : awayTeam);
  const clock = (secs: number): string => {
    const q = Math.min(4, Math.max(1, Math.ceil(secs / 900))), left = 900 * q - secs;
    return `Q${q} ${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
  };
  const drives = r.drives.map((d: Drive, i: number): DriveEvent => ({
    kind: 'drive' as const,
    n: i + 1,
    team: nameOf(d.side),
    period: d.period,
    clock: clock(d.start),
    plays: d.plays,
    yards: null,                            // flagged guess (see field comment): engine Drive has no per-drive yards yet
    end: d.end,
    pts: d.pts,
    oppPts: d.oppPts,
    defTD: d.defTD,
    scores: r.events.filter((e) => e.drive === i + 1).map((e) => ({ team: nameOf(e.side), kind: e.kind, pts: e.pts, conv: e.conv ?? 'none', at: e.at })),
    summary: driveSummary(d, nameOf(d.side)),
  }));
  return {
    v: 1, home: homeTeam, away: awayTeam,
    homeScore: r.homeScore, awayScore: r.awayScore, regHome: r.regHome, regAway: r.regAway,
    ot: r.ot ? { first: nameOf(r.ot.first), periods: r.ot.periods, tie: r.ot.tie } : null,
    drives, mvpLine: null,
  };
}

function driveSummary(d: Drive, team: string): string {
  const ends: Record<DriveEnd, string> = {
    TD: 'ends in a touchdown', FG: 'kicks a field goal', FG_MISS: 'misses a field goal',
    PUNT: 'punts', INT: 'throws an interception', FUM: 'loses a fumble',
    DOWNS: 'turns it over on downs', HALF: 'runs out the half', SAFETY: 'is sacked in the end zone for a safety',
  };
  const mins = Math.max(1, Math.round(d.secs / 60));
  const tail = d.oppPts ? ` ${team} gives up ${d.oppPts} the other way.` : '';
  return `${team} ${ends[d.end]} — ${d.plays} plays, ${mins} min.${tail}`;
}

// Re-export the engine names the mapper's callers need for display; keeps engine import surfaces to this file.
export type { DriveEnd, Conv, ScoreKind };
