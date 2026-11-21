// 1b vertical slice: one drive as a state machine over the event log. Every random choice is a keyed draw, a pure function of
// (gameKey, index of the event being made, tag): no stream, no hidden state, so one play can be replayed alone and a counterfactual shares
// its randomness with the original wherever (event, tag) match. Only + - * / comparisons and core/pmath.ts are used for numbers that must replay
// bit for bit on every device (the field-goal curve and the lambda tilt); no Math.exp/log/pow here (the portability lint covers this folder).
// Neutral teams: lambda = 0 in the pack, so the matchup gap changes nothing and the drive is the pack's own distribution (Phase 1 baseline).
// The seam for Phase 2 is the one `tilt`: P_k proportional to p_k * exp(lambda * theta_k * gap), the design's softmax with the baseline as a_k = log p_k.
import { draw } from '../../../core/keyedrng.ts';
import type { GameKey } from '../../../core/keyedrng.ts';
import type { GameEvent, LogBuilder } from '../../../core/events.ts';
import { pexp } from '../../../core/pmath.ts';
import { at } from '../../../core/at.ts';
import type { ModelPack } from '../../../core/pack.ts';
import { readParams, readRules } from './toypack.ts';
import type { Pmf, SliceParams, SliceRules } from './toypack.ts';

export type Call = 'pass' | 'run' | 'punt' | 'fg';
export type Outcome = 'complete' | 'incomplete' | 'sack' | 'int' | 'rush' | 'fumble' | 'punt' | 'fg_good' | 'fg_miss';
export type DriveResult = 'td' | 'fg' | 'fgmiss' | 'punt' | 'to' | 'downs' | 'safety' | 'clock';

// ydl = yards to the opponent's goal line (100 = own goal line). All yardage and clock fields are whole numbers of yards and seconds.
export interface DriveStartP { drive: number; team: string; opp: string; ydl: number; clock: number }
export interface PlayP {
  drive: number; down: number; ytg: number; ydl: number; call: Call; outcome: Outcome;
  yards: number;            // offence's net gain on the snap (negative on a sack or a loss); 0 for a kick, an incompletion or an interception
  kickYards: number;        // punt distance or field-goal length, else 0
  dt: number;               // seconds the play took off the clock
  firstDown: boolean; td: boolean; safety: boolean; turnover: boolean;
  ydlAfter: number;         // offence's yards to goal after the snap (before any change of possession)
}
export interface XpP { drive: number; made: boolean; points: number }
export interface DriveEndP { drive: number; team: string; result: DriveResult; plays: number; yards: number; secs: number; next: { team: string; ydl: number } | null }
export type FbEvent =
  | GameEvent<'drive_start', DriveStartP> | GameEvent<'play', PlayP> | GameEvent<'extra_point', XpP> | GameEvent<'drive_end', DriveEndP>;

// Optional duty gaps for the offence against this defence, in league z-score units. Absent or 0 = neutral teams.
export interface Matchup { readonly passGap?: number }
export interface DriveCtx { readonly key: GameKey; readonly pack: ModelPack; readonly matchup?: Matchup }
export interface DriveOut { readonly end: DriveEndP; readonly clockLeft: number; readonly t: number }

// inverse-CDF pick from a pmf with one uniform u in [0,1): the same u gives the same value in a counterfactual that shares the cell.
export function pickPmf(m: Pmf, u: number): number {
  let total = 0;
  for (const w of m.w) total += w;
  let acc = 0;
  const target = u * total;
  for (let i = 0; i < m.v.length; i++) { acc += at(m.w, i); if (target < acc) return at(m.v, i); }
  return at(m.v, m.v.length - 1);
}
// P_k proportional to p_k * exp(lambda * theta_k * gap). With lambda = 0 or gap = 0 returns the baseline untouched (no exp call), so neutral is exact.
export function tilt(p: readonly number[], theta: readonly number[], lambda: number, gap: number): number[] {
  const s = lambda * gap;
  if (s === 0) return [...p];
  const w = p.map((x, k) => x * pexp(s * at(theta, k)));
  let z = 0;
  for (const x of w) z += x;
  return w.map((x) => x / z);
}
function pickIndex(p: readonly number[], u: number): number {
  let acc = 0;
  for (let i = 0; i < p.length; i++) { acc += at(p, i); if (u < acc) return i; }
  return p.length - 1;
}
export const fgMakeProb = (par: SliceParams, ydl: number): number => 1 / (1 + pexp(-(par.fg.a - par.fg.b * (ydl + par.fg.snap))));

function chooseCall(par: SliceParams, rules: SliceRules, down: number, ytg: number, ydl: number, u: number): Call {
  if (down === 4) {
    if (ydl <= rules.fgMaxYdl) return 'fg';
    if (!(ytg <= rules.goMaxYtg && ydl <= rules.goMaxYdl)) return 'punt';
  }
  const base = down === 1 ? par.passRate.d1 : down === 2 ? par.passRate.d2 : down === 3 ? par.passRate.d3 : par.passRate.d4;
  const p = down >= 2 && ytg >= rules.longYtg ? Math.min(0.95, base + par.passRate.longBump) : base;
  return u < p ? 'pass' : 'run';
}

// Runs ONE drive for `team` and appends its events (drive_start, play..., extra_point?, drive_end) to the builder. `t0` is game seconds elapsed at the
// start; `clock` is seconds left in the period. Kickoff time is not modelled in this slice (UNKNOWN until its node is built).
export function runDrive(lb: LogBuilder<FbEvent>, ctx: DriveCtx, start: { drive: number; team: string; opp: string; ydl: number; clock: number; t0: number }): DriveOut {
  const par = readParams(ctx.pack), rules = readRules(ctx.pack), gap = ctx.matchup?.passGap ?? 0;
  const { key } = ctx, team = start.team, opp = start.opp, drive = start.drive;
  let ydl = start.ydl, clock = start.clock, t = start.t0, down = 1, ytg = Math.min(10, ydl), plays = 0, yardsNet = 0, secs = 0;
  lb.emit(t, 'drive_start', [team, opp], { drive, team, opp, ydl, clock });
  let result: DriveResult = 'clock';
  let next: { team: string; ydl: number } | null = null;

  while (clock > 0) {
    const i = lb.events.length;                                     // index of the event this snap will become
    const call = chooseCall(par, rules, down, ytg, ydl, draw(key, i, 'call'));
    let outcome: Outcome, yards = 0, kickYards = 0, dtPmf: Pmf;
    let turnover = false;
    if (call === 'pass') {
      const p = [par.passResult.sack, par.passResult.int, par.passResult.inc, par.passResult.cmp];
      const th = [par.theta.sack, par.theta.int, par.theta.inc, par.theta.cmp];
      const k = pickIndex(tilt(p, th, par.lambda, gap), draw(key, i, 'passResult'));
      if (k === 0) { outcome = 'sack'; yards = -pickPmf(par.yards.sack, draw(key, i, 'yards')); dtPmf = par.dt.sack; }
      else if (k === 1) { outcome = 'int'; turnover = true; dtPmf = par.dt.int; }
      else if (k === 2) { outcome = 'incomplete'; dtPmf = par.dt.incomplete; }
      else { outcome = 'complete'; yards = pickPmf(par.yards.pass, draw(key, i, 'yards')); dtPmf = par.dt.complete; }
    } else if (call === 'run') {
      yards = pickPmf(par.yards.run, draw(key, i, 'yards'));
      if (draw(key, i, 'fumble') < par.fumble) { outcome = 'fumble'; turnover = true; } else outcome = 'rush';
      dtPmf = par.dt.run;
    } else if (call === 'punt') {
      outcome = 'punt'; kickYards = pickPmf(par.yards.punt, draw(key, i, 'yards')); dtPmf = par.dt.kick;
    } else {
      kickYards = ydl + par.fg.snap;
      outcome = draw(key, i, 'fgResult') < fgMakeProb(par, ydl) ? 'fg_good' : 'fg_miss'; dtPmf = par.dt.kick;
    }
    const dt = Math.min(pickPmf(dtPmf, draw(key, i, 'clock')), clock);
    // yardage is capped at the goal line and at our own goal line (a loss there is a safety)
    if (yards > ydl) yards = ydl;
    if (yards < ydl - 100) yards = ydl - 100;
    const ydlAfter = ydl - yards;
    const td = (call === 'pass' || call === 'run') && ydlAfter <= 0 && !turnover;
    const safety = (call === 'pass' || call === 'run') && ydlAfter >= 100 && !turnover;
    const firstDown = (call === 'pass' || call === 'run') && !turnover && (td || yards >= ytg);
    clock -= dt; t += dt; secs += dt; plays += 1;
    yardsNet += call === 'pass' || call === 'run' ? yards : 0;
    lb.emit(t, 'play', [team, opp], { drive, down, ytg, ydl, call, outcome, yards, kickYards, dt, firstDown, td, safety, turnover, ydlAfter });

    if (td) {
      result = 'td';
      const made = draw(key, lb.events.length, 'xp') < par.xp;
      lb.emit(t, 'extra_point', [team], { drive, made, points: made ? 1 : 0 });
      next = { team: opp, ydl: rules.kickoffYdl };
      break;
    }
    if (safety) { result = 'safety'; next = { team: opp, ydl: rules.freeKickYdl }; break; }
    if (outcome === 'fg_good') { result = 'fg'; next = { team: opp, ydl: rules.kickoffYdl }; break; }
    if (outcome === 'fg_miss') { result = 'fgmiss'; next = { team: opp, ydl: Math.min(rules.touchbackYdl, 100 - (ydl + 7)) }; break; }
    if (outcome === 'punt') {
      result = 'punt';
      const landed = ydl - kickYards;                                 // kicker's yards-to-goal at the landing spot; <= 0 is a touchback
      next = { team: opp, ydl: landed <= 0 ? rules.touchbackYdl : 100 - landed };
      break;
    }
    if (turnover) { result = 'to'; next = { team: opp, ydl: Math.min(rules.touchbackYdl, Math.max(1, 100 - ydlAfter)) }; break; }
    // the chain moves
    ydl = ydlAfter;
    if (firstDown) { down = 1; ytg = Math.min(10, ydl); }
    else { down += 1; ytg -= yards; }
    if (down > 4) { result = 'downs'; next = { team: opp, ydl: Math.max(1, 100 - ydl) }; break; }
  }
  if (result === 'clock') next = null;
  const end: DriveEndP = { drive, team, result, plays, yards: yardsNet, secs, next };
  lb.emit(t, 'drive_end', [team, opp], end);
  return { end, clockLeft: clock, t };
}
