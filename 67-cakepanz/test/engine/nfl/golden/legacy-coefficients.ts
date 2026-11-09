// The coefficients the engine had before the Owner's salary-weight ruling of 6 Nov 2026 (REV 5 table: QB 1000, WR1 525, ... K 200), frozen here.
// The golden tests compare the port with the ORIGINAL engine (Pre-Colors + the lab's patch), so they run it on these coefficients: the swap
// is in place only inside `withLegacyCoefficients` and is always undone. Test-only; never imported by src/.
import { DEF_SPECS, MC, PERS_REC, RATING_SPECS, RB_HEAVY } from '../../../../src/engine/sports/nfl/engine/specs.ts';
import type { Spec } from '../../../../src/engine/sports/nfl/engine/specs.ts';

const RATING_SPECS_LEGACY = {
  olRun: { OT1: 1.09, OT2: 1.02, OG1: 1.08, OG2: 1.08, C: 1.19, TE1: 0.35, FB: 0.36 },
  olPass: { OT1: 1.53, OT2: 1.43, OG1: 0.9, OG2: 0.9, C: 1 },
  rb: { RB1: 1.95, RB2: 0.48 },
  qb: { QB: 1 },
  rec: { WR1: 0.99, WR2: 0.70, WR3: 0.45, TE1: 0.53, RB1: 0.19, TE3: 0.02, WR4: 0.02 },
  passRush: { DE1: 1.9, DE2: 1.4, DT1: 1.05, DT2: 0.79, MIKE: 0.26, WILL: 0.27, DL5: 0.45 },
  frontRun: { DT1: 1.58, DT2: 1.18, DE1: 0.95, DE2: 0.87, MIKE: 1.03, WILL: 0.9, SAM: 0.94, SS: 0.7, CB1: 0.48, CB2: 0.34, CB3: 0.19, FS: 0.5, DL5: 0.39 },
  coverage: { CB1: 1.39, CB2: 1.06, CB3: 0.86, SS: 0.69, FS: 0.77, MIKE: 0.34, WILL: 0.36, SAM: 0.4 },
  kicker: { K: 1 },
};

const DEF_SPECS_LEGACY = {
  frontBase: { DT1: 1.58, DT2: 1.18, DE1: 0.95, DE2: 0.87, MIKE: 1.03, WILL: 0.9, SAM: 1.34, SS: 0.7, CB1: 0.48, CB2: 0.34, CB3: 0.1, FS: 0.5, DL5: 0.39 },
  frontNick: { DT1: 1.58, DT2: 1.18, DE1: 0.95, DE2: 0.87, MIKE: 1.03, WILL: 0.9, SAM: 0.13, SS: 0.7, CB1: 0.49, CB2: 0.48, CB3: 0.19, FS: 0.5, DL5: 0.39 },
  covBase: { CB1: 1.39, CB2: 1.06, CB3: 0.24, SS: 0.69, FS: 0.77, MIKE: 0.34, WILL: 0.36, SAM: 0.54 },
  covNick: { CB1: 1.39, CB2: 1.06, CB3: 0.96, SS: 0.69, FS: 0.77, MIKE: 0.34, WILL: 0.36, SAM: 0.07 },
  covDime: { CB1: 1.39, CB2: 1.06, CB3: 0.96, DIME: 1.09, SS: 0.69, FS: 0.77, MIKE: 0.34 },
};

// Receiving spec when the plan changes the personnel group ('11' uses RATING_SPECS.rec).
const PERS_REC_LEGACY = {
  '12': { WR1: 0.99, WR2: 0.96, TE1: 0.53, TE2: 0.41, RB1: 0.19 },
  '13': { WR1: 0.99, TE1: 0.53, TE2: 0.41, TE3: 0.24, RB1: 0.19 },
  '21': { WR1: 0.99, WR2: 0.96, TE1: 0.53, RB1: 0.19, RB2: 0.48 },
  '22': { WR1: 0.99, TE1: 0.53, TE2: 0.41, RB1: 0.19, RB2: 0.48 },
};

const RB_HEAVY_LEGACY: Spec = { RB1: 2.0, RB2: 1.2 };

const LEGACY_KICK = 0.04859;
type Tables = Record<string, Spec>;
const LIVE: [Tables, Tables][] = [[RATING_SPECS as unknown as Tables, RATING_SPECS_LEGACY], [DEF_SPECS as unknown as Tables, DEF_SPECS_LEGACY], [PERS_REC as unknown as Tables, PERS_REC_LEGACY]];

export function withLegacyCoefficients<T>(fn: () => T): T {
  const saved = LIVE.map(([live]) => Object.fromEntries(Object.entries(live).map(([k, v]) => [k, { ...v }])));
  const savedHeavy = { ...RB_HEAVY }, savedKick = MC.kick;
  const put = (live: Tables, from: Tables) => { for (const k of Object.keys(live)) { for (const c of Object.keys(live[k])) delete (live[k] as any)[c]; Object.assign(live[k], from[k]); } };
  try {
    LIVE.forEach(([live, old]) => put(live, old));
    for (const c of Object.keys(RB_HEAVY)) delete (RB_HEAVY as any)[c]; Object.assign(RB_HEAVY, RB_HEAVY_LEGACY);
    (MC as any).kick = LEGACY_KICK;
    return fn();
  } finally {
    LIVE.forEach(([live], i) => put(live, saved[i]));
    for (const c of Object.keys(RB_HEAVY)) delete (RB_HEAVY as any)[c]; Object.assign(RB_HEAVY, savedHeavy);
    (MC as any).kick = savedKick;
  }
}
