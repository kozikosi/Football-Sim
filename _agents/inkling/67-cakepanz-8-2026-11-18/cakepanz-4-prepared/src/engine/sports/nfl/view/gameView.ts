// The box score of one game on the real pools pack, as plain data (no DOM, no framework): the dev page and any later UI both render this.
// Everything here is a fold or a read of the event log, so no number on screen can disagree with another (the test sums them against each other).
// Pure: no clock, no randomness.
import { logHash } from '../../../core/events.ts';
import type { GameEv, GameOut } from '../sim/game.ts';
import { TEAMS } from '../sim/game.ts';
import { gameTotals } from '../sim/totals.ts';
import type { Totals } from '../sim/totals.ts';

export interface TeamLine extends Totals { team: string; passYards: number; rushYards: number }
export interface ScoringLine { when: string; team: string; kind: string; points: number; away: number; home: number; tryText: string }
export interface DriveLine { n: number; team: string; start: string; plays: number; yards: number; secs: number; result: string }
export interface GameView { final: Record<string, number>; overtime: boolean; teams: TeamLine[]; scoring: ScoringLine[]; drives: DriveLine[]; logHash: string; events: number }

const mmss = (s: number): string => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
// game seconds -> "Q2 5:31" (time left in the quarter) or "OT 2:10" (time into overtime), 0..3600 regulation. A play that starts at 3600 sharp is overtime when the log says so.
export function clockLabel(t: number, overtime: boolean): string {
  if (overtime && t >= 3600) return `OT ${mmss(t - 3600)}`;
  const q = Math.min(4, Math.max(1, Math.ceil(t / 900)));
  return `Q${q} ${mmss(Math.max(0, q * 900 - t))}`;
}

export function gameView(g: GameOut): GameView {
  const totals = gameTotals(g);
  const teams: TeamLine[] = TEAMS.map((team) => ({ team, ...(totals[team] as Totals), passYards: 0, rushYards: 0 }));
  const by = (team: string): TeamLine => { const x = teams.find((t) => t.team === team); if (x === undefined) throw new Error('gameView: unknown team ' + team); return x; };
  const scoring: ScoringLine[] = [], drives: DriveLine[] = [];
  const run: Record<string, number> = { [TEAMS[0]]: 0, [TEAMS[1]]: 0 };
  type Open = { n: number; team: string; start: string; plays: number; yards: number; secs: number };
  let cur: Open | null = null;
  let ot = false;
  for (let i = 0; i < g.events.length; i++) {
    const e = g.events[i] as GameEv;
    if (e.kind === 'drive_start') {
      if (cur !== null) drives.push({ ...cur, result: 'clock' });          // the half ended mid-drive: the log has no drive_end for it
      ot = e.payload.ot; cur = { n: e.payload.drive, team: e.payload.team, start: clockLabel(e.t, ot), plays: 0, yards: 0, secs: 0 };
    } else if (e.kind === 'snap') {
      const p = e.payload, x = by(p.team);
      if (p.call === 0) x.passYards += p.yards; else if (p.call === 1) x.rushYards += p.yards;
      if (cur !== null) { cur.plays += 1; cur.yards += p.yards; cur.secs += p.dt; }
    } else if (e.kind === 'score' || e.kind === 'extra_point') {
      const pts = e.payload.points;
      if (e.kind === 'score') {
        run[e.payload.team] = (run[e.payload.team] ?? 0) + pts;
        const next = g.events[i + 1];
        const tryText = next !== undefined && next.kind === 'extra_point' ? (next.payload.go2 ? (next.payload.made ? '2-pt good' : '2-pt failed') : (next.payload.made ? 'XP good' : 'XP missed')) : '';
        scoring.push({ when: clockLabel(e.t, ot), team: e.payload.team, kind: e.payload.kind, points: pts, away: run[TEAMS[0]] ?? 0, home: run[TEAMS[1]] ?? 0, tryText });
      } else if (pts > 0) {                                                     // the try belongs to the touchdown just before it
        run[e.payload.team] = (run[e.payload.team] ?? 0) + pts;
        const last = scoring[scoring.length - 1];
        if (last !== undefined) { last.points += pts; last.away = run[TEAMS[0]] ?? 0; last.home = run[TEAMS[1]] ?? 0; }
      }
    } else if (e.kind === 'drive_end') {
      if (cur !== null) { drives.push({ ...cur, result: e.payload.result }); cur = null; }
    }
  }
  if (cur !== null) drives.push({ ...(cur as Open), result: 'clock' });
  return { final: { [TEAMS[0]]: g.points[0], [TEAMS[1]]: g.points[1] }, overtime: g.ot, teams, scoring, drives, logHash: logHash(g.events), events: g.events.length };
}
