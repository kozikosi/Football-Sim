// The NFL 32-spot table. Ported from colors/src/engine/slots.ts (Architect's engine,
// council/base) — ENGINE-MATH-SPEC REV 5, Owner-approved values; QB = 1000, every weight
// a multiple of 10. Verified against tools/mathlab/design.json by the port test.
//
// A SLOT is a roster spot. A SLOT's `dest` is the name the flex guide uses for it
// (a role, or NICKEL = the CB3 spot, DIME = the sixth defensive back, DL5 = the
// rotational fifth lineman).
import type { SlotDef } from '../../engine-core/src/sport-spec.ts';
import type { Role } from './roles.ts';

export type Dest = Role | 'NICKEL' | 'DIME' | 'DL5';
export type SlotId =
  | 'QB' | 'RB1' | 'RB2' | 'FB' | 'WR1' | 'WR2' | 'WR3' | 'WR4' | 'TE1' | 'TE2' | 'TE3'
  | 'OT1' | 'OT2' | 'OG1' | 'OG2' | 'C'
  | 'DE1' | 'DE2' | 'DT1' | 'DT2' | 'DL5' | 'MIKE' | 'WILL' | 'SAM'
  | 'CB1' | 'CB2' | 'CB3' | 'DIME' | 'SS' | 'FS' | 'K' | 'P';
export type Unit = 'offense' | 'defense' | 'special';

export interface NflSlotDef extends SlotDef { id: SlotId; dest: Dest; unit: Unit }

// Weights are wins-value per OVR point in one fixed unit (1 point = 0.00254 wins over a 70 -> 90 upgrade).
export const SLOTS: readonly NflSlotDef[] = [
  { id: 'QB', weight: 1000, dest: 'QB', unit: 'offense' },
  { id: 'WR1', weight: 470, dest: 'WR', unit: 'offense' },
  { id: 'OT1', weight: 430, dest: 'OT', unit: 'offense' },
  { id: 'OT2', weight: 400, dest: 'OT', unit: 'offense' },
  { id: 'WR2', weight: 330, dest: 'WR', unit: 'offense' },
  { id: 'C', weight: 320, dest: 'C', unit: 'offense' },
  { id: 'OG1', weight: 290, dest: 'OG', unit: 'offense' },
  { id: 'OG2', weight: 290, dest: 'OG', unit: 'offense' },
  { id: 'TE1', weight: 270, dest: 'TE', unit: 'offense' },
  { id: 'RB1', weight: 230, dest: 'RB', unit: 'offense' },
  { id: 'WR3', weight: 190, dest: 'WR', unit: 'offense' },
  { id: 'RB2', weight: 80, dest: 'RB', unit: 'offense' },
  { id: 'TE2', weight: 60, dest: 'TE', unit: 'offense' },
  { id: 'FB', weight: 30, dest: 'FB', unit: 'offense' },
  { id: 'TE3', weight: 10, dest: 'TE', unit: 'offense' },
  { id: 'WR4', weight: 10, dest: 'WR', unit: 'offense' },
  { id: 'DE1', weight: 520, dest: 'EDGE', unit: 'defense' },
  { id: 'DT1', weight: 400, dest: 'DT', unit: 'defense' },
  { id: 'DE2', weight: 400, dest: 'EDGE', unit: 'defense' },
  { id: 'DT2', weight: 300, dest: 'DT', unit: 'defense' },
  { id: 'DL5', weight: 140, dest: 'DL5', unit: 'defense' },
  { id: 'MIKE', weight: 260, dest: 'ILB', unit: 'defense' },
  { id: 'WILL', weight: 240, dest: 'OLB', unit: 'defense' },
  { id: 'SAM', weight: 30, dest: 'OLB', unit: 'defense' },
  { id: 'CB1', weight: 450, dest: 'CB', unit: 'defense' },
  { id: 'CB2', weight: 340, dest: 'CB', unit: 'defense' },
  { id: 'CB3', weight: 280, dest: 'NICKEL', unit: 'defense' },
  { id: 'DIME', weight: 40, dest: 'DIME', unit: 'defense' },
  { id: 'FS', weight: 260, dest: 'FS', unit: 'defense' },
  { id: 'SS', weight: 240, dest: 'SS', unit: 'defense' },
  { id: 'K', weight: 200, dest: 'K', unit: 'special' },
  { id: 'P', weight: 100, dest: 'P', unit: 'special' },
];

export const WEIGHT: Readonly<Record<SlotId, number>> =
  Object.fromEntries(SLOTS.map((s) => [s.id, s.weight])) as Record<SlotId, number>;

export type Base = '4-3' | '3-4';

// One spot as it plays under a formation. `row` is the spot whose weights the math uses
// (Owner 25 Oct: OLB = WILL, ILB = MIKE), `label` is the name the user sees.
export interface FieldSlot { slot: SlotId; dest: Dest; row: SlotId; weight: number; label: string }

const LABEL: Partial<Record<SlotId, string>> = {
  MIKE: 'MIKE', WILL: 'WILL', SAM: 'SAM', CB3: 'Nickel', DE1: 'DE1', DE2: 'DE2',
};

// 3-4 (Owner 25/29 Oct): DT2 -> ILB2 (rated as MIKE); WILL -> OLB1; SAM -> OLB2 rated as
// DT2 (weight 300); DT1 is the nose tackle; MIKE is ILB1. DL5 and DB spots unchanged.
export function fieldSlots(base: Base): FieldSlot[] {
  return SLOTS.map((s): FieldSlot => {
    const plain: FieldSlot = { slot: s.id, dest: s.dest, row: s.id, weight: s.weight, label: LABEL[s.id] ?? s.id };
    if (base === '4-3') return plain;
    switch (s.id) {
      case 'DT1': return { ...plain, label: 'NT' };
      case 'MIKE': return { ...plain, label: 'ILB1' };
      case 'DT2': return { slot: 'DT2', dest: 'ILB', row: 'MIKE', weight: WEIGHT.MIKE, label: 'ILB2' };
      case 'WILL': return { slot: 'WILL', dest: 'OLB', row: 'WILL', weight: WEIGHT.WILL, label: 'OLB1' };
      case 'SAM': return { slot: 'SAM', dest: 'OLB', row: 'DT2', weight: WEIGHT.DT2, label: 'OLB2' };
      default: return plain;
    }
  });
}

// DL5's share of defensive snaps by posture (balanced 0.33 MEASURED; aggressive 0.40 INFERRED).
export type Posture = 'cautious' | 'balanced' | 'aggressive';
export const DL5_SHARE: Readonly<Record<Posture, number>> = { cautious: 0.33, balanced: 0.33, aggressive: 0.40 };

// Empty (unfilled) roster spot rating.
export const EMPTY_OVR = 70;
