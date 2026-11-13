// fixtures.ts — the two demo teams (fixture DATA, single source).
// tools/golden.ts and every prototype consume these identical records, so all
// five arms render and simulate the same matchup.
import type { SlotId } from '../sports/nfl/engine/slots.ts';

export const STRONG_PASS: Readonly<Record<SlotId, number>> = {
  QB: 92, WR1: 91, WR2: 86, WR3: 79, TE1: 84, TE2: 72, TE3: 68, WR4: 70,
  RB1: 78, RB2: 71, FB: 62, OT1: 85, OT2: 82, OG1: 80, OG2: 78, C: 81,
  DE1: 76, DE2: 74, DT1: 74, DT2: 71, DL5: 69, MIKE: 78, WILL: 76, SAM: 74,
  CB1: 80, CB2: 77, CB3: 72, DIME: 68, FS: 79, SS: 76, K: 76, P: 70,
};

export const STRONG_FRONT: Readonly<Record<SlotId, number>> = {
  QB: 80, WR1: 82, WR2: 78, WR3: 70, TE1: 78, TE2: 70, TE3: 65, WR4: 66,
  RB1: 84, RB2: 76, FB: 70, OT1: 78, OT2: 76, OG1: 79, OG2: 77, C: 80,
  DE1: 89, DE2: 85, DT1: 87, DT2: 83, DL5: 78, MIKE: 84, WILL: 82, SAM: 80,
  CB1: 76, CB2: 73, CB3: 68, DIME: 65, FS: 74, SS: 72, K: 72, P: 68,
};
