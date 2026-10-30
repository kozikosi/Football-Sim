// The matchup model: every unit feeds yards, sacks or turnovers; those feed points. Port of Pre-Colors matchupModel with
// the lab's additions (QB runs, WR blocking, punter). Pure and deterministic; randomness lives only in the game (step 6).
import type { Ratings } from './ratings.ts';
import {
  BASE_PTS, DEF_FOCUS, DIME_W, LAM_SACK, LAM_TO, MC, PASS_BASE, PERS, PLAN_K, PT_PASS, PT_RUSH, PT_SACK, PT_TO,
  PUNT_PTS, QB_RUN_C, RET_PTS, RUSH_BASE, STRAT, WR_BLK_C,
} from './specs.ts';
import type { DefPlan, OffPlan, Plan } from './specs.ts';

export const NEUTRAL_OFF: OffPlan = { pers: '11', strat: 'neutral' };
export const DEFAULT_DEF: DefPlan = { pkg: 'nickel', focus: 'neutral' };
export const DEFAULT_PLAN: Plan = { off: NEUTRAL_OFF, def: DEFAULT_DEF };

export const OFF_OPTS: readonly OffPlan[] = (['11', '12', '13', '21', '22'] as const).flatMap((pers) => (['run', 'neutral', 'pass'] as const).map((strat) => ({ pers, strat })));
export const DEF_OPTS: readonly DefPlan[] = (['base', 'nickel'] as const).flatMap((pkg) => (['run', 'neutral', 'pass'] as const).map((focus) => ({ pkg, focus })));

export function offShift(po: OffPlan): number { return PERS[po.pers].run + STRAT[po.strat].s; }

// Abramowitz-Stegun approximation, as in Pre-Colors.
export function normCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

export function clamp(x: number, lo: number, hi: number): number { return Math.min(hi, Math.max(lo, x)); }

// Soft guardrail: equal to the input inside 60% of the cap, then flattens smoothly, so a better unit is always worth more.
export function softCap(x: number, lo: number, hi: number): number {
  const cap = x >= 0 ? hi : -lo, k = 0.6 * cap, a = Math.abs(x);
  if (a <= k) return x;
  const v = k + (cap - k) * Math.tanh((a - k) / (cap - k));
  return x >= 0 ? v : -v;
}

export function applyOffPlan(O: Ratings, po: OffPlan): Ratings {
  const p = po.pers, out: Ratings = { ...O };
  if (p !== '11') out.rec = O[('rec' + p) as 'rec12' | 'rec13' | 'rec21' | 'rec22'];
  if (p === '21' || p === '22') out.rb = O.rbHeavy;
  const blk = p === '13' ? (O.te2 + 70) / 2 : p === '12' || p === '22' ? (O.te1 + O.te2) / 2 : O.te1;
  out.olRun = O.olRun + PERS[p].tbw * (blk - 75) * PLAN_K.kBlock;
  return out;
}

export function applyDefPlan(D: Ratings, pd: DefPlan, isLeague: boolean): Ratings {
  const f = DEF_FOCUS[pd.focus].f, nick = pd.pkg === 'nickel', out: Ratings = { ...D };
  out.frontRun = (nick ? D.frontNick : D.frontBase) + (isLeague ? 0 : (nick ? -PLAN_K.pkgFront : PLAN_K.pkgFront) + PLAN_K.defFront * f);
  out.coverage = (nick ? D.covNick : D.covBase) + (isLeague ? 0 : (nick ? PLAN_K.pkgCov : -PLAN_K.pkgCov) - PLAN_K.defCov * f);
  out.passRush = D.passRush - (isLeague ? 0 : PLAN_K.defRush * f);
  // dime: a fixed passing-down share of coverage, not a plan option (league and team alike, so the baseline is consistent)
  out.coverage = (1 - DIME_W) * out.coverage + DIME_W * D.covDime;
  return out;
}

export interface Swing { unit: string; owner: 'off' | 'def'; pts: number; kinds: Record<string, number> }
export interface Channels { run: number; pass: number; to: number; sack: number; kick: number; plan: number }
export interface Matchup {
  expRush: number; expPass: number; lamTO: number; lamSack: number;
  structPts: number; channels: Channels; swings: Swing[];
  sd: number; vm: number; sT: number; planCost: number; plan: Plan;
}

type Part = readonly [unit: string, owner: 'off' | 'def', value: number];

export function matchupModel(O0: Ratings, D0: Ratings, lg: Ratings, plan: Plan = DEFAULT_PLAN): Matchup {
  const po = plan.off, pd = plan.def;
  const O = applyOffPlan(O0, po), LO = applyOffPlan(lg, po);
  const D = applyDefPlan(D0, pd, false), LD = applyDefPlan(lg, pd, true);
  const sT = offShift(po), rAmp = 1 + PLAN_K.rAmp * sT, pAmp = 1 - PLAN_K.pAmp * sT;
  const dRB = O.rb - LO.rb, dOLr = O.olRun - LO.olRun, dQB = O.qb - lg.qb, dRec = O.rec - LO.rec, dOLp = O.olPass - lg.olPass, dK = O.kicker - lg.kicker;
  const dFront = D.frontRun - LD.frontRun, dRush = D.passRush - LD.passRush, dCov = D.coverage - LD.coverage;
  // identity: a team strong at line and back leans run; a QB and receivers team leans pass
  const lean = MC.lean * (0.35 * (O0.rb - lg.rb) + 0.65 * (O0.olRun - lg.olRun) - (0.45 * dQB + 0.3 * (O0.rec - lg.rec) + 0.25 * dOLp));
  const heavy = PERS[po.pers].heavy, nick = pd.pkg === 'nickel';
  const schemeRun = PERS[po.pers].runB + PLAN_K.kRun * sT + (nick ? PLAN_K.nickRun * heavy : PLAN_K.baseRunVsHeavy * heavy);
  const schemePass = PERS[po.pers].passB - PLAN_K.kPass * sT + (nick ? 0 : PLAN_K.basePass * (1 - heavy));
  const runParts: Part[] = [['rb', 'off', MC.rb * dRB * rAmp], ['olRun', 'off', MC.olRun * dOLr * rAmp], ['frontRun', 'def', -MC.front * dFront * rAmp], ['lean', 'off', lean], ['scheme', 'off', schemeRun]];
  const passParts: Part[] = [['qb', 'off', MC.qb * dQB * pAmp], ['rec', 'off', MC.rec * dRec * pAmp], ['olPass', 'off', MC.olPass * dOLp * pAmp], ['passRush', 'def', -MC.rush * dRush * pAmp], ['coverage', 'def', -MC.cov * dCov * pAmp], ['lean', 'off', -lean], ['scheme', 'off', schemePass]];
  const toParts: Part[] = [['qb', 'off', -MC.toQb * dQB], ['coverage', 'def', MC.toCov * dCov], ['passRush', 'def', MC.toRush * dRush], ['scheme', 'off', -PLAN_K.kTo * sT]];
  const skParts: Part[] = [['passRush', 'def', MC.skRush * dRush], ['olPass', 'off', -MC.skOl * dOLp], ['coverage', 'def', MC.skCov * dCov], ['scheme', 'off', -PLAN_K.kSack * sT]];
  const sum = (ps: Part[]) => ps.reduce((s, p) => s + p[2], 0);
  // unit strength saturates first, then the game plan amplifies what is left, so leaning on a strength always pays
  const rU = softCap(MC.rb * dRB + MC.olRun * dOLr - MC.front * dFront, -1.1, 0.4);
  const pU = softCap(MC.qb * dQB + MC.rec * dRec + MC.olPass * dOLp - MC.rush * dRush - MC.cov * dCov, -0.8, 0.27);
  const rushLog = softCap(rU * rAmp + lean + schemeRun, -1.3, 0.42), passLog = softCap(pU * pAmp - lean + schemePass, -1.0, 0.29);
  const toLog = softCap(sum(toParts), -0.7, 0.7), skLog = softCap(sum(skParts), -0.8, 0.4);
  const expRush = RUSH_BASE * Math.exp(rushLog), expPass = PASS_BASE * Math.exp(passLog);
  const lamTO = LAM_TO * Math.exp(toLog), lamSack = LAM_SACK * Math.exp(skLog);
  const kickPts = MC.kick * dK;
  const retPts = RET_PTS * (Math.exp((O0.ret - 82) / 45) - Math.exp((lg.ret - 82) / 45));
  const qbRun = QB_RUN_C * (O0.qbRunR - lg.qbRunR), wrBlk = WR_BLK_C * (O0.wrBlk - lg.wrBlk);
  const puntPts = -PUNT_PTS * (Math.exp((D0.p - 80) / 45) - Math.exp((lg.p - 80) / 45));   // the defense's punter flips field position
  const raw: Record<string, Swing> = {};
  const add = (parts: Part[], effOf: (v: number) => number, kind: string) => {
    for (const [unit, owner, lv] of parts) {
      if (unit === 'lean' || unit === 'scheme') continue;
      const eff = effOf(lv), key = unit + '|' + owner;
      const e = (raw[key] ??= { unit, owner, pts: 0, kinds: {} });
      const swing = owner === 'off' ? eff : -eff;
      e.pts += swing; e.kinds[kind] = (e.kinds[kind] ?? 0) + swing;
    }
  };
  add(runParts, (lv) => PT_RUSH * RUSH_BASE * (Math.exp(lv) - 1), 'ground game');
  add(passParts, (lv) => PT_PASS * PASS_BASE * (Math.exp(lv) - 1), 'passing game');
  add(toParts, (lv) => -PT_TO * LAM_TO * (Math.exp(lv) - 1), 'turnovers');
  add(skParts, (lv) => -PT_SACK * LAM_SACK * (Math.exp(lv) - 1), 'sacks');
  if (Math.abs(kickPts) > 0.01) raw['kicker|off'] = { unit: 'kicker', owner: 'off', pts: kickPts, kinds: { 'field goals': kickPts } };
  // leaning hard either way makes a team predictable: a small efficiency cost; a non-11 set takes a receiver off the field
  const planCost = PLAN_K.predict * Math.pow(STRAT[po.strat].s / 0.08, 2) - PLAN_K.defPredict * Math.abs(DEF_FOCUS[pd.focus].f) + PERS[po.pers].pc;
  const structPts = BASE_PTS + PT_RUSH * (expRush - RUSH_BASE) + PT_PASS * (expPass - PASS_BASE) - PT_TO * (lamTO - LAM_TO) - PT_SACK * (lamSack - LAM_SACK) + kickPts + retPts + puntPts + qbRun + wrBlk - planCost;
  const channels: Channels = { run: PT_RUSH * (expRush - RUSH_BASE) + qbRun + wrBlk, pass: PT_PASS * (expPass - PASS_BASE), to: -PT_TO * (lamTO - LAM_TO), sack: -PT_SACK * (lamSack - LAM_SACK), kick: kickPts, plan: -planCost };
  const vm = clamp(1 - PLAN_K.vm * sT, 0.7, 1.2);
  return { expRush, expPass, lamTO, lamSack, structPts, channels, swings: Object.values(raw), sd: 8.0 * vm, vm, sT, planCost, plan: { off: po, def: pd } };
}
