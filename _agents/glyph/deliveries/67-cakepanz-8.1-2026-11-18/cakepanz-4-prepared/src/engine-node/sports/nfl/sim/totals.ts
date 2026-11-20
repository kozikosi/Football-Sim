// 1c: team-game totals as a FOLD over the game's event log (the same eleven numbers the lab reports, so the TypeScript run can be put next to the real
// data and next to the Python sim). Nothing is stored beside the log: points, drives, plays and the rest are counts of events, so they cannot disagree
// with the story. Counting rules follow nflverse, as the lab does: a kickoff is a play of the RECEIVING team, an extra point or two-point try is a play
// of the scoring team, a two-point try is an offensive play; time of possession is the seconds of the team's own scrimmage snaps.
// Pure: no clock, no randomness.
import type { Fold } from '../../../core/fold.ts';
import { foldLog } from '../../../core/fold.ts';
import { CALL } from './pools.ts';
import type { GameEv, GameOut } from './game.ts';
import { TEAMS } from './game.ts';

export const METRICS = ['points', 'drives', 'plays', 'off_plays', 'pass_att', 'rush_att', 'completions', 'yards', 'sacks', 'giveaways', 'top_dt'] as const;
export type Metric = typeof METRICS[number];
export type Totals = Record<Metric, number>;
export type GameTotals = Record<string, Totals>;
const blank = (): Totals => ({ points: 0, drives: 0, plays: 0, off_plays: 0, pass_att: 0, rush_att: 0, completions: 0, yards: 0, sacks: 0, giveaways: 0, top_dt: 0 });

export const totalsFold: Fold<GameTotals, GameEv> = {
  name: 'nfl-team-totals',
  init: () => ({ [TEAMS[0]]: blank(), [TEAMS[1]]: blank() }),
  reduce(s, e) {
    const of = (team: string): Totals => { const x = s[team]; if (x === undefined) throw new Error('totalsFold: unknown team ' + team); return x; };
    switch (e.kind) {
      case 'kickoff': of(e.payload.receiver).plays += 1; return s;
      case 'drive_start': of(e.payload.team).drives += 1; return s;
      case 'snap': {
        const p = e.payload, x = of(p.team);
        x.plays += 1; x.top_dt += p.dt;
        if (p.call === CALL.pass || p.call === CALL.run) {
          x.off_plays += 1; x.yards += p.yards; x.pass_att += p.pa; x.rush_att += p.ra; x.completions += p.comp; x.sacks += p.sack;
          if (p.give) x.giveaways += 1;
        }
        return s;
      }
      case 'score': of(e.payload.team).points += e.payload.points; return s;
      case 'extra_point': { const x = of(e.payload.team); x.plays += 1; if (e.payload.go2) x.off_plays += 1; x.points += e.payload.points; return s; }
      default: return s;
    }
  },
};
export const gameTotals = (g: GameOut): GameTotals => foldLog(totalsFold, g.events);
