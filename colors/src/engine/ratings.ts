// Team ratings: the unit grades the matchup model reads, built from what each SPOT holds (effective OVR after any flex
// penalty; an empty spot is EMPTY_OVR). Pure: lineup in, numbers out.
import type { Lineup } from './lineup.ts';
import { EMPTY_OVR } from './lineup.ts';
import type { SlotId } from './slots.ts';
import { SLOT_IDS } from './slots.ts';
import { DEF_SPECS, PERS_REC, RATING_SPECS, RB_HEAVY, RET_NEUTRAL, WR_BLK_W } from './specs.ts';
import type { Spec } from './specs.ts';

// One spot as the math sees it: `row` names the spec row it is graded as (slots.ts: in a 3-4 ILB2 is graded as MIKE and
// OLB2 as DT2, Owner 25 and 29 Oct), `ovr` is the effective rating of whoever stands there.
export interface Spot { row: SlotId; ovr: number }

export interface Ratings {
  olRun: number; olPass: number; rb: number; qb: number; rec: number; passRush: number; frontRun: number; coverage: number; kicker: number;
  rec12: number; rec13: number; rec21: number; rec22: number; rec11: number;
  frontBase: number; frontNick: number; covBase: number; covNick: number; covDime: number;
  te1: number; te2: number; rbHeavy: number;
  ret: number; p: number; qbRunR: number; wrBlk: number;
  passOff: number; runOff: number; off: number; def: number;
}
export type RatingKey = keyof Ratings;

export function spotsOf(l: Lineup): Spot[] { return l.placements.map((p) => ({ row: p.slot.row, ovr: p.effOvr })); }
export function spotsFromRecord(o: Readonly<Record<SlotId, number>>): Spot[] { return SLOT_IDS.map((row) => ({ row, ovr: o[row] })); }

// Weighted mean over the spots a spec names. The divisor is the weight actually applied, so a team whose every spot is 80
// rates 80 in any formation (a spec row that no spot is graded as, or one two spots share, changes the mix, not the scale).
function wavg(spots: readonly Spot[], spec: Spec): number {
  let sum = 0, w = 0;
  for (const sp of spots) { const wt = spec[sp.row]; if (wt !== undefined) { sum += sp.ovr * wt; w += wt; } }
  if (w === 0) throw new Error('wavg: no spot matches the spec');
  return sum / w;
}
function rowOvr(spots: readonly Spot[], row: SlotId): number {
  const sp = spots.find((x) => x.row === row);
  return sp ? sp.ovr : EMPTY_OVR;
}

export function teamRatings(spots: readonly Spot[]): Ratings {
  const g = (spec: Spec) => wavg(spots, spec);
  const o = { TE1: rowOvr(spots, 'TE1'), TE2: rowOvr(spots, 'TE2'), P: rowOvr(spots, 'P'), QB: rowOvr(spots, 'QB'), WR1: rowOvr(spots, 'WR1'), WR2: rowOvr(spots, 'WR2'), WR3: rowOvr(spots, 'WR3') };
  const rec = g(RATING_SPECS.rec);
  const r = {
    olRun: g(RATING_SPECS.olRun), olPass: g(RATING_SPECS.olPass), rb: g(RATING_SPECS.rb), qb: g(RATING_SPECS.qb), rec,
    passRush: g(RATING_SPECS.passRush), frontRun: g(RATING_SPECS.frontRun), coverage: g(RATING_SPECS.coverage), kicker: g(RATING_SPECS.kicker),
    rec12: g(PERS_REC['12']), rec13: g(PERS_REC['13']), rec21: g(PERS_REC['21']), rec22: g(PERS_REC['22']), rec11: rec,
    frontBase: g(DEF_SPECS.frontBase), frontNick: g(DEF_SPECS.frontNick), covBase: g(DEF_SPECS.covBase), covNick: g(DEF_SPECS.covNick), covDime: g(DEF_SPECS.covDime),
    te1: o.TE1, te2: o.TE2, rbHeavy: g(RB_HEAVY),
    ret: RET_NEUTRAL, p: o.P, qbRunR: o.QB,
    wrBlk: (o.WR1 * WR_BLK_W[0] + o.WR2 * WR_BLK_W[1] + o.WR3 * WR_BLK_W[2]) / (WR_BLK_W[0] + WR_BLK_W[1] + WR_BLK_W[2]),
    passOff: 0, runOff: 0, off: 0, def: 0,
  } satisfies Ratings;
  r.passOff = 0.45 * r.qb + 0.3 * r.rec + 0.25 * r.olPass;
  r.runOff = 0.35 * r.rb + 0.65 * r.olRun;
  r.off = 0.6 * r.passOff + 0.4 * r.runOff;
  r.def = 0.55 * (0.5 * r.passRush + 0.5 * r.coverage) + 0.45 * r.frontRun;
  return r;
}

export function leagueBaseline(list: readonly Ratings[]): Ratings {
  if (!list.length) throw new Error('leagueBaseline: no teams');
  const keys = Object.keys(list[0]) as RatingKey[];
  const lg = {} as Record<RatingKey, number>;
  for (const k of keys) lg[k] = list.reduce((t, r) => t + r[k], 0) / list.length;
  return lg;
}
