// Box score (engine step 9b): who did what, read off the SAME drives the game was built from. Every drive already says how many
// rushing and passing yards it gained, how many sacks the offence took, and how it ended (touchdown, field goal, interception ...);
// here each of those facts is given to a player of the two lineups, so the player stat lines add up to the team totals exactly and
// every scoring play and turnover in a recap has a name.
//
// SPD and STR (Owner 31 Oct, APPROVED, verbatim note in _agents/owner-notes/): they decide WHO gets the credit (carries, big plays,
// sacks, pressures, tackles) and never team strength; the matchup model is untouched.
// The split of a drive into runs, passes, completions, tackles and the like is INFERRED from general NFL knowledge (no council
// data yet): completion rate about 64.5%, a pass-TD share that follows the drive's pass share, FG distance, punt length, return
// yards. Labelled as such in the design doc; none of it feeds back into the score.
// Pure: an Rng comes in, nothing else is read (test/purity.test.ts).
import { allocate } from './drives.ts';
import { at as ix } from '../../../core/at.ts';  // checked index (the local `at` in makeUnit is a different thing)
import type { Conv, Drive, GameResult, Side } from './drives.ts';
import type { Lineup } from './lineup.ts';
import type { Player } from './players.ts';
import { pickReturner } from './returner.ts';
import type { Rng } from '../../../core/rng.ts';
import type { SlotId } from './slots.ts';

export interface GameSide { team: string; lineup: Lineup; returnerId?: string | null }

export const STAT_KEYS = [
  'att', 'cmp', 'pyd', 'ptd', 'ints', 'sacked',                       // passing (ints = thrown)
  'car', 'ryd', 'rtd', 'fumLost',                                      // rushing
  'tgt', 'rec', 'recYd', 'recTd', 'twoPt',                             // receiving, 2-point conversions made
  'tkl', 'tfl', 'sack', 'press', 'pd', 'intDef', 'intDefYd', 'ff', 'fr', 'defTd', 'safeties',   // defence
  'fgm', 'fga', 'xpm', 'xpa', 'punts', 'puntYd',                       // kicking
  'kr', 'krYd', 'pr', 'prYd',                                          // returns
] as const;
export type StatKey = (typeof STAT_KEYS)[number];
export type Stats = Record<StatKey, number>;
export const blankStats = (): Stats => Object.fromEntries(STAT_KEYS.map((k) => [k, 0])) as Stats;

export interface PlayerLine { id: string; name: string; team: string; side: Side; slot: SlotId; label: string; stats: Stats }
export interface PlayerRef { id: string; name: string; team: string; label: string }
export type CreditKind = 'RUSH_TD' | 'PASS_TD' | 'FG' | 'FG_MISS' | 'INT' | 'FUM' | 'SAFETY' | 'PUNT' | 'DOWNS' | 'HALF';
// one entry per drive, same index as GameResult.drives
export interface DriveCredit {
  drive: number; side: Side; period: number; kind: CreditKind;
  scorer?: PlayerRef; passer?: PlayerRef; tdYards?: number;                       // touchdown
  conv?: Conv; convBy?: PlayerRef; convPasser?: PlayerRef; convKicker?: PlayerRef;  // after the touchdown
  kicker?: PlayerRef; kickYards?: number;                                          // field goal, miss, punt
  giver?: PlayerRef; taker?: PlayerRef; forcer?: PlayerRef; retYards?: number; defTD?: boolean;   // turnover and safety (taker)
  defKicker?: PlayerRef;                                                           // the defence's kicker on a defensive touchdown
}
export interface BoxScore { home: string; away: string; lines: PlayerLine[]; credits: DriveCredit[] }

const other = (s: Side): Side => (s === 'home' ? 'away' : 'home');
const clampN = (x: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, x));

interface Starter { line: PlayerLine; p: Player; ovr: number; slot: SlotId; kind: string }
type W = [Starter, number][];
interface Unit {
  side: Side; team: string; qb: Starter; k: Starter; pt: Starter; returner: Starter | null; retValue: number;
  carry: W; carryRz: W; target: W; targetRz: W;
  runTkl: W; passTkl: W; sack: W; press: W; ints: W; pd: W; ff: W; fr: W;
  all: Starter[];
}

const NO_STATS: readonly SlotId[] = ['OT1', 'OT2', 'OG1', 'OG2', 'C'];
const tilt = (s: Starter, a: number, b: number, c: number): number => Math.exp(a * (s.ovr - 80) + b * (s.p.spd - 80) + c * (s.p.str - 80));

// defender kinds: what a spot does in the formation on the field
function defKind(base: '4-3' | '3-4', slot: SlotId): string | null {
  switch (slot) {
    case 'DE1': case 'DE2': return 'DE';
    case 'DT1': return 'DT';
    case 'DT2': return base === '3-4' ? 'ILB' : 'DT';
    case 'DL5': return 'DL5';
    case 'MIKE': return 'ILB';
    case 'WILL': case 'SAM': return base === '3-4' ? 'OLB34' : 'LB';
    case 'CB1': case 'CB2': return 'CB';
    case 'CB3': case 'DIME': return 'NB';
    case 'FS': return 'FS';
    case 'SS': return 'SS';
    default: return null;
  }
}
type Kind = 'DE' | 'DT' | 'DL5' | 'ILB' | 'LB' | 'OLB34' | 'CB' | 'NB' | 'FS' | 'SS';
const DEF: Record<'run' | 'pass' | 'sack' | 'press' | 'int' | 'pd', Record<Kind, number>> = {
  run:   { DE: .075, DT: .08, DL5: .03, ILB: .17, LB: .11, OLB34: .09, CB: .035, NB: .02, FS: .06, SS: .11 },
  pass:  { DE: .02, DT: .015, DL5: .005, ILB: .09, LB: .08, OLB34: .07, CB: .12, NB: .09, FS: .13, SS: .12 },
  sack:  { DE: .30, DT: .15, DL5: .05, ILB: .03, LB: .05, OLB34: .30, CB: .01, NB: .015, FS: .005, SS: .01 },
  press: { DE: .26, DT: .18, DL5: .05, ILB: .04, LB: .06, OLB34: .24, CB: .015, NB: .02, FS: .01, SS: .015 },
  int:   { DE: .005, DT: .003, DL5: .001, ILB: .05, LB: .055, OLB34: .045, CB: .17, NB: .12, FS: .2, SS: .13 },
  pd:    { DE: .01, DT: .005, DL5: 0, ILB: .04, LB: .045, OLB34: .035, CB: .26, NB: .14, FS: .12, SS: .1 },
};
const CARRY: Partial<Record<SlotId, number>> = { RB1: .60, RB2: .18, FB: .04, QB: .07, WR1: .01, WR2: .01, WR3: .01 };
const CARRY_RZ: Partial<Record<SlotId, number>> = { RB1: .55, RB2: .15, FB: .08, QB: .12, WR1: .01, WR2: .01 };
const TARGET: Partial<Record<SlotId, number>> = { WR1: .21, WR2: .18, WR3: .12, WR4: .02, TE1: .16, TE2: .05, TE3: .01, RB1: .10, RB2: .04, FB: .01 };
const TARGET_RZ: Partial<Record<SlotId, number>> = { WR1: .22, WR2: .17, WR3: .11, WR4: .01, TE1: .22, TE2: .08, TE3: .01, RB1: .06, RB2: .03, FB: .02 };
const YPR: Partial<Record<SlotId, number>> = { WR1: 1, WR2: 1, WR3: 1, WR4: 1, TE1: .8, TE2: .8, TE3: .8, RB1: .6, RB2: .6, FB: .5 };

function ghost(team: string, side: Side, slot: SlotId, pos: string): Starter {
  const p: Player = { id: `ghost|${pos}|${team}`, name: `Backup ${pos}`, pos, role: pos as Player['role'], team, ovr: 70, spd: 70, str: 70, freeAgent: false };
  return { line: { id: p.id, name: p.name, team, side, slot, label: slot, stats: blankStats() }, p, ovr: 70, slot, kind: '' };
}

function makeUnit(g: GameSide, side: Side): Unit {
  const all: Starter[] = [];
  for (const pl of g.lineup.placements) {
    if (!pl.player || NO_STATS.includes(pl.slot.slot)) continue;
    const kind = defKind(g.lineup.base, pl.slot.slot) ?? '';
    all.push({ line: { id: pl.player.id, name: pl.player.name, team: g.team, side, slot: pl.slot.slot, label: pl.slot.label, stats: blankStats() }, p: pl.player, ovr: pl.effOvr, slot: pl.slot.slot, kind });
  }
  const at = (slot: SlotId, pos: string): Starter => { const s = all.find((x) => x.slot === slot); if (s) return s; const gh = ghost(g.team, side, slot, pos); all.push(gh); return gh; };
  const qb = at('QB', 'QB'), k = at('K', 'K'), pt = at('P', 'P');
  const offList = (table: Partial<Record<SlotId, number>>, a: number): W => all.filter((s) => table[s.slot] !== undefined).map((s) => [s, (table[s.slot] as number) * tilt(s, a, 0, 0)] as [Starter, number]);
  const offense = (table: Partial<Record<SlotId, number>>, a: number): W => { const w = offList(table, a); return w.length ? w : [[qb, 1]]; };
  const defense = (kind: keyof typeof DEF, a: number, b: number, c: number): W => all.filter((s) => s.kind).map((s) => [s, DEF[kind][s.kind as Kind] * tilt(s, a, b, c)] as [Starter, number]).filter((x) => x[1] > 0);
  const runTkl = defense('run', .02, .003, .005), passTkl = defense('pass', .02, .004, .002);
  const merge = (a: W, b: W): W => a.map(([s, w], i) => [s, (w + ix(b, i)[1]) / 2] as [Starter, number]);
  const ret = pickReturner(g.lineup, g.returnerId);
  return {
    side, team: g.team, qb, k, pt, returner: ret ? all.find((s) => s.p.id === ret.player.id) ?? null : null, retValue: ret?.value ?? 82,
    carry: offense(CARRY, .02), carryRz: offense(CARRY_RZ, .02), target: offense(TARGET, .02), targetRz: offense(TARGET_RZ, .02),
    runTkl, passTkl, sack: defense('sack', .035, .010, .006), press: defense('press', .03, .008, .005), ints: defense('int', .03, .008, 0), pd: defense('pd', .03, .008, 0),
    ff: runTkl.map(([s, w]) => [s, w * Math.exp(0.008 * (s.p.str - 80))] as [Starter, number]), fr: merge(runTkl, passTkl), all,
  };
}

function wpick(r: Rng, items: W): Starter {
  let t = 0; for (const x of items) t += x[1];
  let u = r.next() * t;
  for (const [s, w] of items) { u -= w; if (u < 0) return s; }
  return ix(items, items.length - 1)[0];
}
const ref = (s: Starter): PlayerRef => ({ id: s.p.id, name: s.p.name, team: s.line.team, label: s.line.label });
const speedYards = (s: Starter): number => Math.exp(0.012 * (s.p.spd - 80) + 0.004 * (s.p.str - 80));

const P_COMPLETE = 0.645;

function playDrive(d: Drive, i: number, O: Unit, D: Unit, r: Rng): DriveCredit {
  const kickEnd = d.end === 'FG' || d.end === 'FG_MISS' || d.end === 'PUNT';
  let scrim = Math.max(0, d.plays - d.sacks - (kickEnd ? 1 : 0));
  if (scrim === 0 && d.rush + d.pass > 0) scrim = 1;
  let tdPass = false;
  if (d.end === 'TD') {
    tdPass = d.pass > 0 && (d.rush === 0 || r.next() < 0.28 + (0.55 * d.pass) / (d.pass + d.rush));
    if (scrim === 0) scrim = 1;
  }
  const split = scrim ? allocate(scrim, [d.rush / 4.3 + 0.15, d.pass / 6.6 + 0.15]) : [0, 0];
  let runs = ix(split, 0), att = ix(split, 1);
  const intEnd = d.end === 'INT' ? 1 : 0;
  const needCmp = d.pass > 0 || tdPass ? 1 : 0;
  if (d.rush > 0 || (d.end === 'TD' && !tdPass)) runs = Math.max(runs, 1);
  att = Math.max(att, needCmp + intEnd);
  const attEx = att - intEnd;
  const pc = clampN(P_COMPLETE + 0.0035 * (O.qb.ovr - 80), 0.5, 0.78);
  let cmp = 0;
  if (needCmp) { for (let k = 0; k < attEx; k++) if (r.next() < pc) cmp++; cmp = Math.max(cmp, 1); }

  // carries
  const carriers: Starter[] = [];
  for (let k = 0; k < runs; k++) carriers.push(wpick(r, O.carry));
  let tdRunner: Starter | null = null;
  if (d.end === 'TD' && !tdPass) { tdRunner = wpick(r, O.carryRz); carriers[runs - 1] = tdRunner; }
  const ry = runs ? allocate(d.rush, carriers.map((c) => Math.exp(0.6 * r.normal()) * speedYards(c))) : [];
  const lift = (arr: number[], pos: number): void => {   // a touchdown play gains at least a yard when the drive gained any
    if (ix(arr, pos) >= 1) return;
    let j = -1; for (let q = 0; q < arr.length; q++) if (q !== pos && ix(arr, q) > 1 && (j < 0 || ix(arr, q) > ix(arr, j))) j = q;
    if (j >= 0) { arr[j] = ix(arr, j) - 1; arr[pos] = ix(arr, pos) + 1; }
  };
  if (tdRunner) lift(ry, runs - 1);
  carriers.forEach((c, k) => { c.line.stats.car++; c.line.stats.ryd += ix(ry, k); });
  if (tdRunner) tdRunner.line.stats.rtd++;

  // receptions
  const recvs: Starter[] = [];
  for (let k = 0; k < cmp; k++) recvs.push(wpick(r, O.target));
  let tdRecv: Starter | null = null;
  if (tdPass) { tdRecv = wpick(r, O.targetRz); recvs[cmp - 1] = tdRecv; }
  const py = cmp ? allocate(d.pass, recvs.map((x) => Math.exp(0.55 * r.normal()) * (YPR[x.slot] ?? 0.7) * Math.exp(0.012 * (x.p.spd - 80)))) : [];
  if (tdRecv) lift(py, cmp - 1);
  recvs.forEach((x, k) => { x.line.stats.tgt++; x.line.stats.rec++; x.line.stats.recYd += ix(py, k); });
  if (tdRecv) tdRecv.line.stats.recTd++;
  const miss: Starter[] = [];
  for (let k = 0; k < att - cmp; k++) { const t = wpick(r, O.target); t.line.stats.tgt++; miss.push(t); }
  const qs = O.qb.line.stats;
  qs.att += att; qs.cmp += cmp; qs.pyd += d.pass; qs.sacked += d.sacks; if (tdPass) qs.ptd++; qs.ints += intEnd;

  // defence: tackles, tackles for loss, sacks, pressures, passes defensed
  carriers.forEach((c, k) => {
    if (c === tdRunner && k === runs - 1) return;
    const t = wpick(r, D.runTkl); t.line.stats.tkl++;
    if (r.next() < (ix(ry, k) <= 1 ? 0.2 : ix(ry, k) <= 3 ? 0.06 : 0)) t.line.stats.tfl++;
  });
  recvs.forEach((x, k) => { if (x === tdRecv && k === cmp - 1) return; wpick(r, D.passTkl).line.stats.tkl++; });
  for (let k = 0; k < d.sacks; k++) { const s = wpick(r, D.sack).line.stats; s.sack++; s.press++; s.tkl++; s.tfl++; }
  for (let k = 0; k < att; k++) if (r.next() < 0.17) wpick(r, D.press).line.stats.press++;
  for (let k = 0; k < att - cmp - intEnd; k++) if (r.next() < 0.45) wpick(r, D.pd).line.stats.pd++;

  const cr: DriveCredit = { drive: i, side: d.side, period: d.period, kind: d.end === 'TD' ? (tdPass ? 'PASS_TD' : 'RUSH_TD') : d.end === 'FG' ? 'FG' : d.end === 'FG_MISS' ? 'FG_MISS' : d.end === 'INT' ? 'INT' : d.end === 'FUM' ? 'FUM' : d.end === 'SAFETY' ? 'SAFETY' : d.end === 'PUNT' ? 'PUNT' : d.end === 'DOWNS' ? 'DOWNS' : 'HALF' };
  if (d.end === 'TD') {
    const sc = (tdPass ? tdRecv : tdRunner) as Starter;
    cr.scorer = ref(sc); cr.tdYards = tdPass ? ix(py, cmp - 1) : ix(ry, runs - 1); if (tdPass) cr.passer = ref(O.qb);
    const ks = O.k.line.stats; if (d.conv !== undefined) cr.conv = d.conv;
    if (d.conv === 'xp') { ks.xpa++; ks.xpm++; cr.convKicker = ref(O.k); }
    else if (d.conv === 'xp_miss') { ks.xpa++; cr.convKicker = ref(O.k); }
    else if (d.conv === 'two' || d.conv === 'two_fail') {
      const byPass = r.next() < 0.55, who = wpick(r, byPass ? O.targetRz : O.carryRz);
      cr.convBy = ref(who); if (byPass) cr.convPasser = ref(O.qb);
      if (d.conv === 'two') who.line.stats.twoPt++;
    }
  }
  if (d.end === 'FG') { O.k.line.stats.fga++; O.k.line.stats.fgm++; cr.kicker = ref(O.k); cr.kickYards = clampN(Math.round(35 + 8 * r.normal()), 19, 63); }
  if (d.end === 'FG_MISS') { O.k.line.stats.fga++; cr.kicker = ref(O.k); cr.kickYards = clampN(Math.round(46 + 7 * r.normal()), 30, 66); }
  if (d.end === 'PUNT') { O.pt.line.stats.punts++; const y = clampN(Math.round(45 + 5.5 * r.normal()), 28, 66); O.pt.line.stats.puntYd += y; cr.kicker = ref(O.pt); cr.kickYards = y; }
  if (d.end === 'INT') {
    const t = wpick(r, D.ints); t.line.stats.intDef++;
    const y = d.defTD ? r.int(15, 85) : Math.max(0, Math.round(10 + 9 * r.normal()));
    t.line.stats.intDefYd += y; if (d.defTD) t.line.stats.defTd++;
    cr.giver = ref(O.qb); cr.taker = ref(t); cr.retYards = y; cr.defTD = d.defTD;
  }
  if (d.end === 'FUM') {
    const pool = [...carriers, ...recvs]; const g = pool.length ? ix(pool, r.int(0, pool.length - 1)) : O.qb;
    g.line.stats.fumLost++;
    const f = wpick(r, D.ff); f.line.stats.ff++;
    const t = wpick(r, D.fr); t.line.stats.fr++;
    const y = d.defTD ? r.int(5, 70) : r.int(0, 12); if (d.defTD) t.line.stats.defTd++;
    cr.giver = ref(g); cr.forcer = ref(f); cr.taker = ref(t); cr.retYards = y; cr.defTD = d.defTD;
  }
  if ((d.end === 'INT' || d.end === 'FUM') && d.defTD) { D.k.line.stats.xpa++; D.k.line.stats.xpm++; cr.defKicker = ref(D.k); }
  if (d.end === 'SAFETY') { const t = wpick(r, D.sack); t.line.stats.safeties++; cr.taker = ref(t); }
  return cr;
}

// kickoffs and punts the other side returned (returner stats only; no effect on anything else)
function returns(res: GameResult, units: Record<Side, Unit>, r: Rng): void {
  const ds = res.drives;
  for (let i = 0; i < ds.length; i++) {
    const di = ix(ds, i), side = di.side, U = units[side];
    if (!U.returner) continue;
    const prev = i > 0 ? ix(ds, i - 1) : null;
    const kickoff = !prev || (di.start >= 1800 && prev.start < 1800) || (di.period >= 5 && prev.period < 5) || prev.pts > 0 || prev.oppPts > 0;
    const afterOpp = prev && prev.side !== side;
    const s = U.returner.line.stats;
    if (kickoff && r.next() < 0.45) { s.kr++; s.krYd += clampN(Math.round(24 + 0.13 * (U.retValue - 82) + 5 * r.normal()), 10, 55); }
    else if (!kickoff && afterOpp && prev && prev.end === 'PUNT' && r.next() < 0.36) { s.pr++; s.prYd += clampN(Math.round(8.5 + 0.12 * (U.retValue - 82) + 5 * r.normal()), 0, 40); }
  }
}

export function buildBoxScore(res: GameResult, home: GameSide, away: GameSide, rng: Rng): BoxScore {
  const units = { home: makeUnit(home, 'home'), away: makeUnit(away, 'away') };
  const r = rng.fork('box');
  const credits = res.drives.map((d, i) => playDrive(d, i, units[d.side], units[other(d.side)], r));
  returns(res, units, r.fork('returns'));
  return { home: home.team, away: away.team, lines: [...units.home.all, ...units.away.all].map((s) => s.line), credits };
}

// ---- helpers used by tests, recaps and awards ----
export const lineOf = (box: BoxScore, id: string): PlayerLine | undefined => box.lines.find((l) => l.id === id);
export function pointsOf(l: PlayerLine): number {
  const s = l.stats; return 6 * (s.rtd + s.recTd + s.defTd) + 2 * s.twoPt + 3 * s.fgm + s.xpm + 2 * s.safeties;
}
