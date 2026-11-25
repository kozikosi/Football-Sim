// THROWAWAY SPIKE, not product code: a copy of colors/src/sports/nfl/sim/game.ts (as of 8ae4bc30) with one hook, opts.sampler.
// 1c: one whole game on the real pools pack, as an event log. Neutral teams (lambda = 0): every node is the pack's own distribution.
// This is the Python lab's simulator (tools/mathlab/phase1/sim.py) ported node for node, with one change in the plumbing: every random choice is a
// KEYED draw, a pure function of (game key, index of the event being made, tag). No stream, no hidden state: one play replays alone, and a
// counterfactual shares its randomness with the original wherever (event, tag) match. Tags: toss, kick, call, passClass (GLM pass node only), rec, clock, go2, make, ottoss.
// The lab's own quirks are kept on purpose so the port is checkable against it (kneel and spike are crude, overtime is crude, a hole in a table falls to the
// largest pool and is COUNTED, not hidden). The product-world switches (computed transitions, penalty-removed clock) are pack rules, not code.
// Pure: no clock, no ambient randomness, no Math.exp/log/pow.
import { draw } from '../../../../colors/src/core/keyedrng.ts';
import type { GameKey } from '../../../../colors/src/core/keyedrng.ts';
import { logBuilder } from '../../../../colors/src/core/events.ts';
import type { GameEvent } from '../../../../colors/src/core/events.ts';
import { at } from '../../../../colors/src/core/at.ts';
import { CALL, OC, callKeys, recKeys, clockLateKeys, clockNonKeys, pick, sample, tmb } from '../../../../colors/src/sports/nfl/sim/pools.ts';
import type { Pools } from '../../../../colors/src/sports/nfl/sim/pools.ts';
import { passClassProbs, passFeatures, pickClass, pickClassTuple } from '../../../../colors/src/sports/nfl/sim/passclass.ts';
import type { PassClass } from '../../../../colors/src/sports/nfl/sim/passclass.ts';
import { tilt } from '../../../../colors/src/sports/nfl/sim/drive.ts';

export type DriveResult = 'td' | 'fg' | 'fgmiss' | 'punt' | 'to' | 'downs' | 'safety' | 'deftd' | 'clock';
export interface KickoffP { kicker: string; receiver: string; poss: string; ydl: number; dt: number }
export interface DriveStartP { drive: number; team: string; ydl: number; ot: boolean }
export interface SnapP {
  drive: number; team: string; down: number; ytg: number; ydl: number; qtr: number; hs: number; call: number; oc: number;
  yards: number; dt: number; pa: number; ra: number; comp: number; sack: number; give: boolean;
}
export interface ScoreP { team: string; kind: 'TD' | 'FG' | 'SAFETY'; points: number }
export interface XpP { team: string; go2: boolean; made: boolean; points: number }
export interface DriveEndP { drive: number; team: string; result: DriveResult }
export type GameEv =
  | GameEvent<'kickoff', KickoffP> | GameEvent<'drive_start', DriveStartP> | GameEvent<'snap', SnapP>
  | GameEvent<'score', ScoreP> | GameEvent<'extra_point', XpP> | GameEvent<'drive_end', DriveEndP>;
export interface GameOut { readonly events: readonly GameEv[]; readonly points: readonly [number, number]; readonly ot: boolean; readonly holes: readonly number[] }
export const TEAMS = ['A', 'B'] as const;
const nm = (k: number): string => at(TEAMS, k);
type Ended = Exclude<DriveResult, 'clock'>;
interface Step { ended: Ended | null; ndy: number; nds: boolean }

// opts.passClass: the pass-class GLM node (2a). Absent = the pools' own record node, bit for bit as before. With it, a pass play draws its CLASS from the GLM (tag 'passClass', after the
// optional tilt by lambda * theta * opts.passGap) and then its outcome tuple from the pool restricted to that class (tag 'rec', the same tag as before).
// opts.classMix: a LAB hook (tools/glm-shift.ts). It replaces the GLM's class probabilities with the caller's, so the class-then-tuple SAMPLER can be run with the pool's own class mix
// as a control (sampler effect = control - pools node; GLM effect = GLM - control). Absent = the GLM's softmax. Needs opts.passClass for minClassPool, theta and lambda.
export type ClassMix = (down: number, ytg: number, ydl: number, sd: number, qtr: number, hs: number) => readonly number[];
export function runGame(P: Pools, key: GameKey, opts: { readonly ot?: boolean; readonly passClass?: PassClass; readonly passGap?: number; readonly classMix?: ClassMix; readonly sampler?: (pl: any, team: number, call: number, u: number) => number } = {}): GameOut {
  const lb = logBuilder<GameEv>();
  const holes = [0, 0, 0, 0, 0];                       // lookups that fell to the largest pool: call, record, clock-late, clock-non, pass-class tuple
  const B = P.bins, T = P.tuples;
  const pts = [0, 0];
  let t = 0, drive = 0;                                // t = game seconds elapsed
  let poss = 0, ydl = 75, down = 1, ytg = 10, hs = 0;  // hs = seconds left in the current period (half, or the OT period)
  let kickDt = 0;
  const idx = (): number => lb.events.length;
  const score = (team: number, kind: ScoreP['kind'], points: number): void => {
    pts[team] = (pts[team] ?? 0) + points;
    lb.emit(t, 'score', [nm(team)], { team: nm(team), kind, points });
  };
  // kickoff: sets poss, ydl and kickDt (the caller spends the clock). nflverse: a kickoff row's posteam is the RECEIVING team.
  const kick = (kicker: number): void => {
    const j = sample(P.kick.pool, draw(key, idx(), 'kick'));
    let y = at(P.kick.nd, j);
    if (Number.isNaN(y)) y = 75;
    const recv = 1 - kicker, nextPoss = at(P.kick.same, j) === 1 ? recv : kicker;
    kickDt = at(P.kick.dt, j);
    lb.emit(t, 'kickoff', [nm(kicker), nm(recv)], { kicker: nm(kicker), receiver: nm(recv), poss: nm(nextPoss), ydl: y, dt: kickDt });
    poss = nextPoss; ydl = y;
  };
  const spendKick = (): void => { const s = Math.min(kickDt, hs); hs -= s; t += s; };      // the lab: hs = max(0, hs - kickoff seconds)
  const afterTd = (team: number): void => {
    const i = idx();
    const go2 = draw(key, i, 'go2') < P.xp.pGo2;
    const made = draw(key, i, 'make') < (go2 ? P.xp.pMake2 : P.xp.pMake1);
    const points = made ? (go2 ? 2 : 1) : 0;
    pts[team] = (pts[team] ?? 0) + points;
    lb.emit(t, 'extra_point', [nm(team)], { team: nm(team), go2, made, points });
  };

  // One snap: draws, applies the pack's record to the state, emits the snap event, THEN any scoring event it caused. `ot` selects the lab's overtime variants.
  const snap = (ot: boolean, qtr: number, sd: number): Step => {
    const i = idx();
    const cpool = pick(P.call, callKeys(B, down, ytg, ydl, ot ? 0 : sd, ot ? 2 : qtr, ot ? 600 : hs), P.minPool, holes, 0);
    let call = sample(cpool, draw(key, i, 'call'));
    if (ot && (call === CALL.kneel || call === CALL.spike)) call = CALL.pass;
    let j: number;
    if (call === CALL.pass && opts.passClass !== undefined) {
      const pc = opts.passClass;
      const sdN = ot ? 0 : sd, qN = ot ? 2 : qtr, hN = ot ? 600 : hs;
      const base = opts.classMix !== undefined ? opts.classMix(down, ytg, ydl, sdN, qN, hN) : passClassProbs(pc, passFeatures(down, ytg, ydl, sdN, qN, hN));
      const p = tilt(base, pc.theta, pc.lambda, opts.passGap ?? 0);
      const cls = pickClass(p, draw(key, i, 'passClass'));
      j = sample(pickClassTuple(P.rec, recKeys(B, call, down, ytg, ydl), P, cls, pc.minClassPool, holes, 4), draw(key, i, 'rec'));   // the same down-preserving hierarchy as the record node (see pools.ts)
    } else { const pl = pick(P.rec, recKeys(B, call, down, ytg, ydl), P.minPool, holes, 1); const u = draw(key, i, 'rec'); j = opts.sampler ? opts.sampler(pl, poss, call, u) : sample(pl, u); }
    const oc = at(T.oc, j);
    let y = at(T.yards, j);
    const cu = draw(key, i, 'clock');
    let dt = !ot && tmb(qtr, hs) <= 2
      ? sample(pick(P.clockLate, clockLateKeys(B, oc, qtr, hs, sd), P.minClock, holes, 2), cu)
      : sample(pick(P.clockNon, clockNonKeys(B, oc, y), P.minClock, holes, 3), cu);
    dt = Math.min(dt, hs);
    const before = { down, ytg, ydl, hs };
    hs -= dt;
    const offense = call === CALL.pass || call === CALL.run;
    let ended: Ended | null = null, ndy = NaN, nds = false, give = false;
    let scoreKind: ScoreP['kind'] | null = null;
    if (call === CALL.punt) {
      ended = 'punt'; ndy = at(T.nd, j); nds = at(T.ndsame, j) === 1;
      if (!ot && at(T.deftd, j) === 1) ended = 'deftd';
    } else if (call === CALL.fg) {
      if (at(T.fg, j) === 1) { scoreKind = 'FG'; ended = 'fg'; }
      else { ended = 'fgmiss'; ndy = at(T.nd, j); nds = at(T.ndsame, j) === 1; }
    } else if (call === CALL.kneel || call === CALL.spike) {      // crude, as in the lab: a kneel loses a yard of field, a spike only spends the down
      y = call === CALL.kneel ? -1 : 0;
      if (call === CALL.kneel) ydl = Math.min(ydl + 1, 99);
      down += 1;
      if (down > 4) { ended = 'downs'; ndy = 100 - ydl; }
    } else if (oc === OC.int || at(T.fum, j) === 1) {
      give = true; ended = 'to'; ndy = at(T.nd, j); nds = at(T.ndsame, j) === 1;
      if (!ot && at(T.deftd, j) === 1) ended = 'deftd';
    } else if (at(T.safety, j) === 1 || ydl - y >= 100) {
      ended = 'safety';
    } else if (at(T.td, j) === 1 || y >= ydl) {
      scoreKind = 'TD'; ended = 'td';
    } else if (P.trans === 'empirical' && !ot) {
      const nd = at(T.ndown, j), dl = at(T.delta, j);
      if (Number.isNaN(nd) || Number.isNaN(dl)) { ydl -= y; ended = 'downs'; ndy = 100 - ydl; }   // the real drive ended here with no scoring or turnover flag
      else {
        ydl -= dl;
        if (ydl <= 0) { scoreKind = 'TD'; ended = 'td'; }
        else if (nd === 1) { down = 1; ytg = Math.min(10, ydl); }
        else { down = Math.trunc(nd); ytg = Math.max(1, ytg - dl); }
      }
    } else {
      ydl -= y;
      if (y >= ytg) { down = 1; ytg = Math.min(10, ydl); } else { down += 1; ytg -= y; }
      if (down > 4) { ended = 'downs'; ndy = 100 - ydl; }
    }
    lb.emit(t, 'snap', [nm(poss), nm(1 - poss)], {
      drive, team: nm(poss), down: before.down, ytg: before.ytg, ydl: before.ydl, qtr: ot ? 5 : qtr, hs: before.hs, call, oc,
      yards: offense ? y : 0, dt, pa: offense ? at(T.pa, j) : 0, ra: offense ? at(T.ra, j) : 0, comp: offense ? at(T.comp, j) : 0, sack: offense ? at(T.sack, j) : 0, give: offense && give,
    });
    t += dt;
    if (scoreKind === 'FG') score(poss, 'FG', P.points.fg); else if (scoreKind === 'TD') score(poss, 'TD', P.points.td);
    return { ended, ndy, nds };
  };

  const startDrive = (ot: boolean): void => {
    drive += 1; down = 1; ytg = Math.min(10, ydl);
    lb.emit(t, 'drive_start', [nm(poss)], { drive, team: nm(poss), ydl, ot });
  };
  const endDrive = (team: number, result: DriveResult): void => { lb.emit(t, 'drive_end', [nm(team)], { drive, team: nm(team), result }); };

  // what happens after a drive ends in regulation; returns true when the next drive starts (always, the half clock decides the rest)
  const afterDrive = (s: Step, driveTeam: number): void => {
    const ended = s.ended as Ended;
    if (ended === 'punt' || ended === 'fgmiss' || ended === 'to' || ended === 'downs') {
      let ny = s.ndy;
      if (Number.isNaN(ny)) ny = ended === 'downs' ? 100 - ydl : 70;
      endDrive(driveTeam, ended);
      if (!s.nds) poss = 1 - poss;
      ydl = ny;
    } else if (ended === 'td') {
      afterTd(poss); endDrive(driveTeam, ended); kick(poss); spendKick();
    } else if (ended === 'fg') {
      endDrive(driveTeam, ended); kick(poss); spendKick();
    } else if (ended === 'deftd') {
      const o = 1 - poss; score(o, 'TD', P.points.td); afterTd(o); endDrive(driveTeam, ended); kick(o); spendKick();
    } else {                                                        // safety: the team that gave it up kicks
      score(1 - poss, 'SAFETY', P.points.safety); endDrive(driveTeam, ended); kick(poss); spendKick();
    }
  };

  // ---- two halves ----
  let kicker = draw(key, 0, 'toss') < 0.5 ? 0 : 1;
  for (let half = 1; half <= 2; half++) {
    hs = P.halfSecs;
    t = (half - 1) * P.halfSecs;
    kick(kicker); spendKick();
    kicker = poss;                                                  // the receiving team of the first kickoff kicks off the second half
    down = 1; ytg = 10;
    let fresh = true;
    while (hs > 0) {
      const qtr = half === 1 ? (hs > 900 ? 1 : 2) : (hs > 900 ? 3 : 4);
      if (fresh) { startDrive(false); fresh = false; }
      const driveTeam = poss;
      const s = snap(false, qtr, (pts[poss] ?? 0) - (pts[1 - poss] ?? 0));
      if (s.ended === null) continue;
      afterDrive(s, driveTeam);
      fresh = true;
    }
  }
  // ---- overtime (the lab's crude version, kept so the port is comparable) ----
  let ot = false;
  if ((opts.ot ?? true) && pts[0] === pts[1]) {
    ot = true;
    hs = P.otSecs; t = 2 * P.halfSecs;
    const first = draw(key, idx(), 'ottoss') < 0.5 ? 0 : 1;
    kick(1 - first); spendKick();
    const drv = [0, 0];
    let fresh = true;
    while (hs > 0) {
      if (fresh) { startDrive(true); drv[poss] = (drv[poss] ?? 0) + 1; fresh = false; }
      const driveTeam = poss;
      const s = snap(true, 2, 0);
      if (s.ended === null) continue;
      const ended = s.ended;
      if (ended === 'td') afterTd(poss);
      if (ended === 'safety') score(1 - poss, 'SAFETY', P.points.safety);
      endDrive(driveTeam, ended);
      ydl = Number.isNaN(s.ndy) ? 75 : s.ndy;
      if ((ended === 'punt' || ended === 'fgmiss' || ended === 'to' || ended === 'downs') && !s.nds) poss = 1 - poss;
      else if (ended === 'td' || ended === 'fg' || ended === 'safety') { kick(poss); spendKick(); }
      fresh = true;
      if ((drv[0] ?? 0) >= 1 && (drv[1] ?? 0) >= 1 && pts[0] !== pts[1]) break;
    }
  }
  return { events: lb.events, points: [pts[0] ?? 0, pts[1] ?? 0], ot, holes };
}
