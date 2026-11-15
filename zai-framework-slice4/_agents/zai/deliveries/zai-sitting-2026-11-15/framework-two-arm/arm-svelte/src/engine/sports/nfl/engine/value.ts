// What a spot is worth, measured on the matchup model itself (the lab's method, ported). Used by the test that proves the
// 32-spot table (slots.ts) is what the model implies, and by the Owner's re-weighting workflow: change a spec or a knob,
// re-measure, compare. Everything else at 80, one spot varied, the best plan chosen for each lineup.
import { DEF_OPTS, DEFAULT_DEF, matchupModel, NEUTRAL_OFF, OFF_OPTS } from './matchup.ts';
import { teamRatings } from './ratings.ts';
import type { Ratings } from './ratings.ts';
import { GAMES, POINTS_PER_WIN } from './specs.ts';
import type { Base, SlotId } from './slots.ts';
import { SLOT_IDS, SLOTS, fieldSlots } from './slots.ts';

// Points per game the best plan earns for an offence, or holds an average offence to for a defence (negated, so up is good).
export function bestUnitPts(R: Ratings, lg: Ratings, isOff: boolean): number {
  if (isOff) return Math.max(...OFF_OPTS.map((o) => matchupModel(R, lg, lg, { off: o, def: DEFAULT_DEF }).structPts));
  return -Math.min(...DEF_OPTS.map((d) => matchupModel(lg, R, lg, { off: NEUTRAL_OFF, def: d }).structPts));
}

// Net points per game against the league for a whole team (offence plus defence, each with its best plan).
export function netPts(R: Ratings, lg: Ratings): number { return bestUnitPts(R, lg, true) + bestUnitPts(R, lg, false); }

export const flat = (ovr: number): Record<SlotId, number> => Object.fromEntries(SLOT_IDS.map((s) => [s, ovr])) as Record<SlotId, number>;
// The kicker belongs to the offence's side of the model; the punter to the defence's (the opposing punter flips field position).
const isOffSide = (slot: SlotId): boolean => slot === 'K' || SLOTS.find((s) => s.id === slot)?.unit === 'offense';

// Wins per season gained by a spot at `ovr` instead of 80, everything else at 80, in the given formation.
export function slotWins(slot: SlotId, ovr: number, base: Base = '4-3'): number {
  const spots = (v: number) => fieldSlots(base).map((f) => ({ row: f.row, ovr: f.slot === slot ? v : 80 }));
  const lg = teamRatings(spots(80)), k = GAMES / POINTS_PER_WIN, isOff = isOffSide(slot);
  return (bestUnitPts(teamRatings(spots(ovr)), lg, isOff) - bestUnitPts(lg, lg, isOff)) * k;
}

// Wins per +20 OVR (70 -> 90). One weight point is 0.00254 of this (spec section 1), so weight = wins20 / 0.00254.
export const WEIGHT_UNIT_WINS = 0.00254;
export function slotWins20(slot: SlotId, base: Base = '4-3'): number { return slotWins(slot, 90, base) - slotWins(slot, 70, base); }
export function derivedWeights(base: Base = '4-3'): Record<SlotId, number> {
  return Object.fromEntries(SLOT_IDS.map((s) => [s, slotWins20(s, base) / WEIGHT_UNIT_WINS])) as Record<SlotId, number>;
}
