// 1b vertical slice: the box score as a FOLD over the event log, and the view model built from it. Nothing here is simulated and nothing is
// stored beside the log: every number is a count of events, so the team line, the drive table and the scoring summary cannot disagree
// (the tests add them up against each other). Neutral teams have no players yet, so lines are per TEAM; player attribution is a later node
// (target selection, carry shares) and will be another fold over the same log, not a change to this one.
// Pure: no clock, no randomness. Scoring values come from the pack's rules (data), never from a constant in this file.
import type { Fold } from '../../../core/fold.ts';
import { foldLog } from '../../../core/fold.ts';
import type { SliceRules } from './toypack.ts';
import type { DriveResult, FbEvent } from './drive.ts';

export interface TeamLine {
  team: string; points: number; drives: number; plays: number; netYards: number; passYards: number; rushYards: number; sackYards: number;
  passAtt: number; completions: number; rushAtt: number; sacksTaken: number; interceptions: number; fumblesLost: number; giveaways: number;
  firstDowns: number; touchdowns: number; fgMade: number; fgAtt: number; xpMade: number; xpAtt: number; punts: number; puntYards: number;
  safetiesScored: number; secs: number;
}
export interface DriveRow { drive: number; team: string; startYdl: number; plays: number; yards: number; secs: number; result: DriveResult }
export interface ScoreRow { t: number; team: string; kind: 'TD' | 'FG' | 'XP' | 'SAFETY'; points: number; home: number; away: number }
export interface BoxState { teams: Record<string, TeamLine>; order: string[]; drives: DriveRow[]; scoring: ScoreRow[] }

const blank = (team: string): TeamLine => ({
  team, points: 0, drives: 0, plays: 0, netYards: 0, passYards: 0, rushYards: 0, sackYards: 0, passAtt: 0, completions: 0, rushAtt: 0, sacksTaken: 0,
  interceptions: 0, fumblesLost: 0, giveaways: 0, firstDowns: 0, touchdowns: 0, fgMade: 0, fgAtt: 0, xpMade: 0, xpAtt: 0, punts: 0, puntYards: 0, safetiesScored: 0, secs: 0,
});

export function makeBoxFold(rules: SliceRules): Fold<BoxState, FbEvent> {
  const line = (s: BoxState, team: string): TeamLine => {
    let l = s.teams[team];
    if (l === undefined) { l = blank(team); s.teams[team] = l; s.order.push(team); }
    return l;
  };
  const score = (s: BoxState, t: number, team: string, kind: ScoreRow['kind'], points: number): void => {
    line(s, team).points += points;
    const [a, b] = s.order;
    s.scoring.push({ t, team, kind, points, home: a === undefined ? 0 : line(s, a).points, away: b === undefined ? 0 : line(s, b).points });
  };
  return {
    name: 'nfl-box-slice',
    init: () => ({ teams: {}, order: [], drives: [], scoring: [] }),
    reduce(s, e) {
      switch (e.kind) {
        case 'drive_start': {
          const p = e.payload;
          line(s, p.team).drives += 1; line(s, p.opp);
          s.drives.push({ drive: p.drive, team: p.team, startYdl: p.ydl, plays: 0, yards: 0, secs: 0, result: 'clock' });
          return s;
        }
        case 'play': {
          const p = e.payload, off = line(s, e.actors[0] ?? ''), def = e.actors[1] ?? '';
          off.secs += p.dt;
          if (p.call === 'pass' || p.call === 'run') {
            off.plays += 1; off.netYards += p.yards;
            if (p.firstDown) off.firstDowns += 1;
          }
          if (p.call === 'pass') {
            if (p.outcome === 'sack') { off.sacksTaken += 1; off.sackYards += -p.yards; }
            else { off.passAtt += 1; if (p.outcome === 'complete') { off.completions += 1; off.passYards += p.yards; } if (p.outcome === 'int') { off.interceptions += 1; off.giveaways += 1; } }
          } else if (p.call === 'run') {
            off.rushAtt += 1; off.rushYards += p.yards;
            if (p.outcome === 'fumble') { off.fumblesLost += 1; off.giveaways += 1; }
          } else if (p.call === 'punt') { off.punts += 1; off.puntYards += p.kickYards; }
          else { off.fgAtt += 1; if (p.outcome === 'fg_good') { off.fgMade += 1; score(s, e.t, off.team, 'FG', rules.pointsFg); } }
          if (p.td) { off.touchdowns += 1; score(s, e.t, off.team, 'TD', rules.pointsTd); }
          if (p.safety) { line(s, def).safetiesScored += 1; score(s, e.t, def, 'SAFETY', rules.pointsSafety); }
          const row = s.drives[s.drives.length - 1];
          if (row !== undefined) { row.plays += 1; row.secs += p.dt; if (p.call === 'pass' || p.call === 'run') row.yards += p.yards; }
          return s;
        }
        case 'extra_point': {
          const p = e.payload, off = line(s, e.actors[0] ?? '');
          off.xpAtt += 1;
          if (p.made) { off.xpMade += 1; score(s, e.t, off.team, 'XP', p.points); }
          return s;
        }
        case 'drive_end': {
          const row = s.drives[s.drives.length - 1];
          if (row !== undefined) row.result = e.payload.result;
          return s;
        }
      }
    },
  };
}

// The view model a screen binds to: plain data, display strings kept out (formatting belongs to the view layer).
export interface BoxScoreView { teams: TeamLine[]; drives: DriveRow[]; scoring: ScoreRow[]; final: { team: string; points: number }[] }
export function boxScoreView(events: readonly FbEvent[], rules: SliceRules): BoxScoreView {
  const s = foldLog(makeBoxFold(rules), events);
  const teams = s.order.map((t) => ({ ...(s.teams[t] as TeamLine) }));
  return { teams, drives: s.drives.map((d) => ({ ...d })), scoring: s.scoring.map((r) => ({ ...r })), final: teams.map((t) => ({ team: t.team, points: t.points })) };
}
