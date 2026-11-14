// Legacy provider (engine design Phase 0): wraps today's drive engine so it emits the NEW event schema (core/events.ts), and gives the
// folds that read a game back off that log. Nothing here simulates anything new: the drive engine and the box-score builder run
// exactly as before (same rng forks, same code) and this file only (1) writes what they produced as events and (2) folds the events
// back into the same GameResult and BoxScore. UI, recap and stats can therefore migrate to log consumers now, while the football
// model is rebuilt behind the same schema.
//   Gate (test/nfl/legacyprovider.test.ts): for seeded games, fold(log) deep-equals the original GameResult and BoxScore.
//   What is a FACT in the log: game_start, each drive, each drive credit, each player line, game_end (the realised aggregates).
//   What is DERIVED by the fold, not stored: scores, regulation scores, score events, team stats, overtime info. They were
//   "read off the drives" in drives.ts already; here that principle is applied to the whole game.
// Pure: an Rng comes in, nothing else is read (test/purity.test.ts).
import { buildBoxScore } from './boxscore.ts';
import { simulateGame } from './drives.ts';
import { makePack } from '../../../core/pack.ts';
import { logBuilder } from '../../../core/events.ts';
import type { BoxScore, DriveCredit, GameSide, PlayerLine } from './boxscore.ts';
import type { Drive, GameOptions, GameResult, ScoreEvent, Side, TeamGameStats } from './drives.ts';
import type { Fold } from '../../../core/fold.ts';
import type { GameEvent } from '../../../core/events.ts';
import type { Matchup } from './matchup.ts';
import type { ModelPack } from '../../../core/pack.ts';
import type { Rng } from '../../../core/rng.ts';
import { BASE_PTS, GAMES, HOME_FIELD, LAM_SACK, LAM_TO, PASS_BASE, PT_PASS, PT_RUSH, PT_SACK, PT_TO, PTS_NOISE, RUSH_BASE } from './specs.ts';

// ---- the event vocabulary of the legacy provider ----
export interface GameStartPayload { home: string; away: string; playoff: boolean; provider: 'legacy-drives'; pack: string }
export interface GameEndPayload { agg: GameResult['agg'] }
export type NflEvent =
  | GameEvent<'game_start', GameStartPayload>
  | GameEvent<'drive', Drive>
  | GameEvent<'drive_credit', DriveCredit>
  | GameEvent<'player_line', PlayerLine>
  | GameEvent<'game_end', GameEndPayload>;

// The legacy engine's own constants as a model pack, so a log can say which numbers it was made with. Provenance is honest:
// these are the Pre-Colors / lab-28-Oct values the Owner is replacing; they are an oracle for plumbing, not an accuracy target.
export function legacyPack(): ModelPack {
  return makePack({
    schema: 1, id: 'nfl-legacy-drives',
    rules: { sport: 'nfl', regime: '2025-ot-both-possessions', values: { penalties: false, otRegularSecs: 600, otPlayoffSecs: 900, otBothPossessions: true, games: GAMES } },
    params: { RUSH_BASE, PASS_BASE, PT_RUSH, PT_PASS, PT_TO, PT_SACK, LAM_TO, LAM_SACK, BASE_PTS, HOME_FIELD, PTS_NOISE },
    provenance: { source: 'legacy drive engine constants (specs.ts): Pre-Colors values, lab fit 28 Oct 2026', fitDate: '2026-11-11', note: 'plumbing oracle only; replaced by a fitted pack in Phase 1' },
  });
}

// ---- writing a game as events ----
// `fork` names match test/nfl/fixture.ts and the season runner ('game', 'box'), so a seeded game gives the same numbers as before.
export function legacyGameLog(mh: Matchup, ma: Matchup, rng: Rng, opts: GameOptions, home: GameSide, away: GameSide): { events: readonly NflEvent[]; res: GameResult; box: BoxScore } {
  const res = simulateGame(mh, ma, rng.fork('game'), opts);
  const box = buildBoxScore(res, home, away, rng.fork('box'));
  return { events: eventsOf(res, box, { home: home.team, away: away.team, playoff: opts.playoff }), res, box };
}

export function eventsOf(res: GameResult, box: BoxScore, meta: { home: string; away: string; playoff: boolean }): readonly NflEvent[] {
  const b = logBuilder<NflEvent>();
  b.emit(0, 'game_start', [], { ...meta, provider: 'legacy-drives', pack: legacyPack().hash });
  res.drives.forEach((d, i) => {
    const t = d.start + d.secs, team = d.side === 'home' ? meta.home : meta.away;
    b.emit(t, 'drive', [team], { ...d });
    const c = box.credits[i];
    if (c === undefined) throw new Error('eventsOf: no box credit for drive ' + i);
    b.emit(t, 'drive_credit', [team], c);
  });
  const end = res.drives.reduce((m, d) => Math.max(m, d.start + d.secs), 0);
  for (const l of box.lines) b.emit(end, 'player_line', [l.id], l);
  b.emit(end, 'game_end', [], { agg: res.agg });
  return b.events;
}

// ---- folds: read a game back off the log ----
const other = (s: Side): Side => (s === 'home' ? 'away' : 'home');
const blankStats = (): TeamGameStats => ({ rush: 0, pass: 0, yards: 0, plays: 0, giveaways: 0, takeaways: 0, sacksTaken: 0, drives: 0, top: 0, fgMade: 0, fgMissed: 0 });
const zeroAgg = (): GameResult['agg'] => ({ home: { rush: 0, pass: 0, to: 0, sacks: 0 }, away: { rush: 0, pass: 0, to: 0, sacks: 0 } });

// Valid after ANY prefix of the log (the game as it stood after play N), complete after game_end.
export const gameResultFold: Fold<GameResult, NflEvent> = {
  name: 'gameResult',
  init: () => ({ homeScore: 0, awayScore: 0, regHome: 0, regAway: 0, drives: [], events: [], stats: { home: blankStats(), away: blankStats() }, agg: zeroAgg(), ot: null, otSecs: 0 }),
  reduce(g, e) {
    if (e.kind === 'drive') {
      const d: Drive = { ...e.payload }, i = g.drives.length, o = other(d.side);
      g.drives.push(d);
      const own = (d.side === 'home' ? 'homeScore' : 'awayScore') as 'homeScore' | 'awayScore', opp = (o === 'home' ? 'homeScore' : 'awayScore') as 'homeScore' | 'awayScore';
      g[own] += d.pts; g[opp] += d.oppPts;
      if (d.period <= 4) {
        const ownR = (d.side === 'home' ? 'regHome' : 'regAway') as 'regHome' | 'regAway', oppR = (o === 'home' ? 'regHome' : 'regAway') as 'regHome' | 'regAway';
        g[ownR] += d.pts; g[oppR] += d.oppPts;
      } else {
        g.otSecs += d.secs;
        g.ot = { first: g.ot?.first ?? d.side, periods: Math.max(g.ot?.periods ?? 0, d.period - 4), tie: false };
      }
      if (d.pts > 0) g.events.push({ side: d.side, kind: d.end === 'TD' ? 'TD' : 'FG', pts: d.pts, ...(d.conv !== undefined ? { conv: d.conv } : {}), drive: i, period: d.period, at: d.start + d.secs } satisfies ScoreEvent);
      if (d.oppPts > 0) g.events.push({ side: o, kind: d.defTD ? 'DEF_TD' : 'SAFETY', pts: d.oppPts, drive: i, period: d.period, at: d.start + d.secs } satisfies ScoreEvent);
      const t = g.stats[d.side];
      t.rush += d.rush; t.pass += d.pass; t.yards += d.rush + d.pass; t.plays += d.plays; t.sacksTaken += d.sacks; t.drives++; t.top += d.secs;
      if (d.end === 'FG') t.fgMade++;
      if (d.end === 'FG_MISS') t.fgMissed++;
      if (d.end === 'INT' || d.end === 'FUM') { t.giveaways++; g.stats[o].takeaways++; }
      if (g.ot) g.ot.tie = g.homeScore === g.awayScore;
    } else if (e.kind === 'game_end') {
      g.agg = { home: { ...e.payload.agg.home }, away: { ...e.payload.agg.away } };
    }
    return g;
  },
};

export const boxScoreFold: Fold<BoxScore, NflEvent> = {
  name: 'boxScore',
  init: () => ({ home: '', away: '', lines: [], credits: [] }),
  reduce(b, e) {
    if (e.kind === 'game_start') { b.home = e.payload.home; b.away = e.payload.away; }
    else if (e.kind === 'drive_credit') b.credits.push({ ...e.payload });
    else if (e.kind === 'player_line') b.lines.push({ ...e.payload, stats: { ...e.payload.stats } });
    return b;
  },
};
