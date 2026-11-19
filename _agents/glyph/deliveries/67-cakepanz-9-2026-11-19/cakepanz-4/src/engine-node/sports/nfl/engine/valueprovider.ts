// What a spot is worth, behind one seam (P-318). Draft, lineup and the board ask a ValueProvider; none of them reads SLOTS[].weight.
//
// The unit is wins per season per OVR point at a spot (the slope of the matchup model around the neutral roster). The default provider is
// MEASURED: slotWins20 / 20, the same number the display shows, so what the engine spends is what the user is shown. The fitted table
// (SLOTS[].weight, QB = 1000) is the retired reference; `tableValues()` keeps it callable for tests and lab tools that compare against it.
//
// Why a provider and not a constant table: the later solver view (plan v3, section 3.3) replaces the measured slope with the derivative of
// the play-level model, context-aware, behind this same interface. That swap is one implementation, not a rewrite of draft and lineup.
//
// DETERMINISM NOTE. The measured slope runs through matchup.ts, which uses Math.exp / tanh / pow; ECMAScript lets those differ in the last
// bits between engines. Values are rounded to 1e-9 wins per OVR point so a last-bit difference cannot move a value unless the true value
// sits within about 1e-17 of a rounding boundary (INFERRED probability, roughly 1e-8 per value, not measured). core/pmath.ts (S2) and the
// pack bake are the real fix; this is the stopgap until they land.
import { WEIGHT, SLOT_IDS } from './slots.ts';
import type { Base, SlotId } from './slots.ts';
import { slotWins20 } from './value.ts';

export interface ValueProvider {
  readonly name: string;
  /** Wins per season gained per OVR point at the spot `row` (the spot whose rating row the formation uses), under `base`. */
  winsPerOvr(row: SlotId, base: Base): number;
}

/** One fitted-weight unit x one OVR point, in wins (1 weight point = 0.00254 wins over a 70 -> 90 upgrade, spec section 1).
 *  A literal on purpose: value.ts -> ratings.ts -> lineup.ts -> this file is an import cycle, so nothing here may read value.ts at module load
 *  (slotWins20 is only called later, from inside functions). test/nfl/valueprovider.test.ts checks this equals value.ts's WEIGHT_UNIT_WINS / 20. */
export const WINS_PER_UNIT = 0.00254 / 20;

const quantize = (x: number): number => Math.round(x * 1e9) / 1e9;

/** A fresh MEASURED provider with its own cache (one measurement per base, about 10-20 ms). Make a new one after a spec or coefficient is mutated in the same process. */
export function measuredValues(): ValueProvider {
  const memo = new Map<Base, Record<SlotId, number>>();
  const of = (base: Base): Record<SlotId, number> => {
    let t = memo.get(base);
    if (!t) { t = Object.fromEntries(SLOT_IDS.map((s) => [s, quantize(slotWins20(s, base) / 20)])) as Record<SlotId, number>; memo.set(base, t); }
    return t;
  };
  return { name: 'measured', winsPerOvr: (row, base) => of(base)[row] };
}

/** The retired fitted table as a provider: weight x WINS_PER_UNIT. Reference and tests only; nothing in draft or lineup defaults to it. */
export function tableValues(weights: Readonly<Record<SlotId, number>> = WEIGHT): ValueProvider {
  return { name: 'table', winsPerOvr: (row) => weights[row] * WINS_PER_UNIT };
}

/** The provider draft, lineup and the board use unless a caller passes another. */
export const DEFAULT_VALUES: ValueProvider = measuredValues();
