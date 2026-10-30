// The numbers behind the matchup model. Source: Pre-Colors RATING_SPECS / DEF_SPECS / PERS_REC / MC / PLAN_K, with the
// lab's final fit (tools/mathlab/results/engine-patch-2026-10-28-recv.js.txt, "snapped") and its additions: DL5, DIME,
// TE3, WR4, FB in run blocking, a punter, QB runs, WR blocking. The spec rows are keyed by SPOT, not by formation: a 3-4
// changes who stands in a spot (lineup.ts), never what the spot is worth here.
import type { SlotId } from './slots.ts';

export type Spec = Partial<Record<SlotId, number>>;

export const RATING_SPECS = {
  olRun: { OT1: 1.09, OT2: 1.02, OG1: 1.08, OG2: 1.08, C: 1.19, TE1: 0.35, FB: 0.36 },
  olPass: { OT1: 1.53, OT2: 1.43, OG1: 0.9, OG2: 0.9, C: 1 },
  rb: { RB1: 1.95, RB2: 0.48 },
  qb: { QB: 1 },
  rec: { WR1: 0.99, WR2: 0.91, WR3: 0.53, TE1: 0.53, RB1: 0.19, TE3: 0.02, WR4: 0.02 },
  passRush: { DE1: 1.9, DE2: 1.4, DT1: 1.05, DT2: 0.79, MIKE: 0.26, WILL: 0.27, DL5: 0.45 },
  frontRun: { DT1: 1.58, DT2: 1.18, DE1: 0.95, DE2: 0.87, MIKE: 1.03, WILL: 0.9, SAM: 0.94, SS: 0.34, CB1: 0.7, CB2: 0.51, CB3: 0.19, FS: 0.48, DL5: 0.39 },
  coverage: { CB1: 1.39, CB2: 1.06, CB3: 0.86, SS: 0.69, FS: 0.77, MIKE: 0.34, WILL: 0.36, SAM: 0.4 },
  kicker: { K: 1 },
} as const satisfies Record<string, Spec>;

export const DEF_SPECS = {
  frontBase: { DT1: 1.58, DT2: 1.18, DE1: 0.95, DE2: 0.87, MIKE: 1.03, WILL: 0.9, SAM: 1.34, SS: 0.34, CB1: 0.7, CB2: 0.51, CB3: 0.1, FS: 0.48, DL5: 0.39 },
  frontNick: { DT1: 1.58, DT2: 1.18, DE1: 0.95, DE2: 0.87, MIKE: 1.03, WILL: 0.9, SAM: 0.13, SS: 0.51, CB1: 0.7, CB2: 0.51, CB3: 0.19, FS: 0.48, DL5: 0.39 },
  covBase: { CB1: 1.39, CB2: 1.06, CB3: 0.24, SS: 0.69, FS: 0.77, MIKE: 0.34, WILL: 0.36, SAM: 0.54 },
  covNick: { CB1: 1.39, CB2: 1.06, CB3: 0.96, SS: 0.69, FS: 0.77, MIKE: 0.34, WILL: 0.36, SAM: 0.07 },
  covDime: { CB1: 1.39, CB2: 1.06, CB3: 0.96, DIME: 1.09, SS: 0.69, FS: 0.77, MIKE: 0.34 },
} as const satisfies Record<string, Spec>;

// Receiving spec when the plan changes the personnel group ('11' uses RATING_SPECS.rec).
export const PERS_REC = {
  '12': { WR1: 0.99, WR2: 0.96, TE1: 0.53, TE2: 0.41, RB1: 0.19 },
  '13': { WR1: 0.99, TE1: 0.53, TE2: 0.41, TE3: 0.24, RB1: 0.19 },
  '21': { WR1: 0.99, WR2: 0.96, TE1: 0.53, RB1: 0.19, RB2: 0.48 },
  '22': { WR1: 0.99, TE1: 0.53, TE2: 0.41, RB1: 0.19, RB2: 0.48 },
} as const satisfies Record<string, Spec>;

export const RB_HEAVY: Spec = { RB1: 2.0, RB2: 1.2 };

export type Pers = '11' | '12' | '13' | '21' | '22';
export type Strat = 'run' | 'neutral' | 'pass';
export type Pkg = 'base' | 'nickel';
export type Focus = 'run' | 'neutral' | 'pass';
export interface OffPlan { pers: Pers; strat: Strat }
export interface DefPlan { pkg: Pkg; focus: Focus }
export interface Plan { off: OffPlan; def: DefPlan }

export const PERS: Record<Pers, { label: string; run: number; runB: number; passB: number; heavy: number; tbw: number; pc: number }> = {
  '11': { label: '11 personnel', run: 0.0, runB: 0.0, passB: 0.0, heavy: 0.0, tbw: 0.0, pc: 0.0 },
  '12': { label: '12 personnel', run: 0.03, runB: 0.03, passB: -0.015, heavy: 0.5, tbw: 0.08, pc: 0.22 },
  '13': { label: '13 personnel', run: 0.06, runB: 0.055, passB: -0.035, heavy: 1.0, tbw: 0.14, pc: 0.42 },
  '21': { label: '21 personnel', run: 0.05, runB: 0.04, passB: -0.03, heavy: 0.6, tbw: 0.03, pc: 0.38 },
  '22': { label: '22 personnel', run: 0.08, runB: 0.07, passB: -0.045, heavy: 1.0, tbw: 0.1, pc: 0.48 },
};
export const STRAT: Record<Strat, { label: string; s: number }> = {
  run: { label: 'run-heavy', s: 0.08 }, neutral: { label: 'balanced', s: 0 }, pass: { label: 'pass-heavy', s: -0.08 },
};
export const DEF_FOCUS: Record<Focus, { label: string; f: number }> = {
  run: { label: 'run-defense', f: 1 }, neutral: { label: 'balanced', f: 0 }, pass: { label: 'pass-defense', f: -1 },
};

export const PLAN_K = {
  kRun: 1.4, kPass: 0.85, kTo: 1.0, kSack: 0.9, rAmp: 3.0, pAmp: 2.5, vm: 1.3, kBlock: 1, predict: 0.38, defPredict: 0.4,
  baseRunPct: 0.39, nickRun: 0.05, baseRunVsHeavy: -0.025, basePass: 0.03, defFront: 2.0, defCov: 1.5, defRush: 0.6, pkgFront: 0.8, pkgCov: 0.8,
};

// Final fitted knobs (lab 28 Oct): changed keys take the fit, the rest are Pre-Colors' values.
export const MC = {
  rb: 0.0208, olRun: 0.0495, front: 0.05577, qb: 0.00655, rec: 0.02045, olPass: 0.01403, rush: 0.01579, cov: 0.0184, lean: 0.013,
  toQb: 0.01471, toCov: 0.0204, toRush: 0.0105, skRush: 0.0268, skOl: 0.0336, skCov: 0.012, kick: 0.04859,
};

export const RUSH_BASE = 105, PASS_BASE = 220;
export const PT_RUSH = 0.04, PT_PASS = 0.07, PT_TO = 3.0, PT_SACK = 0.8, LAM_TO = 1.2, LAM_SACK = 2.2;
export const BASE_PTS = 21.5, HOME_FIELD = 1.7, PTS_NOISE = 6.0;
export const RET_PTS = 2.36;
// Returner rating: the data has only OVR, SPD and STR, so any formula would be invented (AGENTS.md section 7). Every team
// gets the neutral 82 until the Owner defines it; the return term is then exactly 0 for everyone.
export const RET_NEUTRAL = 82;
// Lab additions (28 Oct): QB runs, WR blocking, punter field position, dime share of coverage.
export const QB_RUN_C = 0.0194;
export const WR_BLK_C = 0.01147;
export const WR_BLK_W = [1, 1, 1] as const;
export const PUNT_PTS = 1.084;
export const DIME_W = 0.15;
export const POINTS_PER_WIN = 32.5;
export const GAMES = 17;
