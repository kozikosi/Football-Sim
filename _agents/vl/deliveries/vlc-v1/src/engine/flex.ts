// VLC V1 — Engine: FLEX, NATURAL_SLOT_MAP (+ CB4 per w38 R4), adviseLineup
// Extracted from Claude's engine. Logic untouched.
// NATURAL_SLOT_MAP is a protected constant (AGENTS.md §3). CB4 addition re-pins hash in MERGE-MANIFEST.md.

import type { SlotKey, Player, LineupAdvice } from '../types/engine';

// --- Protected constants ---
export const NATURAL_SLOT_MAP: Record<SlotKey, SlotKey[]> = {
  QB: ['QB'],
  RB1: ['HB'],
  RB2: ['HB'],
  WR1: ['WR'],
  WR2: ['WR'],
  WR3: ['WR'],
  WR4: ['WR'],
  TE1: ['TE'],
  TE2: ['TE'],
  OT1: ['LT', 'RT'],
  OT2: ['LT', 'RT'],
  OG1: ['LG', 'RG'],
  OG2: ['LG', 'RG'],
  C: ['C'],
  DE1: ['REDG', 'LEDG'],
  DE2: ['REDG', 'LEDG'],
  DT1: ['DT'],
  DT2: ['DT'],
  DL5: ['DT', 'REDG', 'LEDG'],
  MIKE: ['MIKE'],
  WILL: ['WILL'],
  SAM: ['SAM'],
  LB4: ['MIKE', 'WILL', 'SAM'],
  CB1: ['CB'],
  CB2: ['CB'],
  CB3: ['CB'],
  CB4: ['CB'], // w38 R4 — CB4 / Dime added
  SS: ['SS'],
  SS2: ['SS'],
  FS: ['FS'],
  FS2: ['FS'],
  K: ['K'],
  P: ['P'],
  FB: ['FB'],
};

export const LB_FLEX = { DE: 6, DT: 4, CB3: 4, SS: 4, FS: 4, TE: 6, RB: 6 };

export const FLEX: Record<string, Record<string, number>> = {
  QB: { FS: 4 },
  RB1: LB_FLEX,
  RB2: LB_FLEX,
  WR1: LB_FLEX,
  WR2: LB_FLEX,
  WR3: LB_FLEX,
  WR4: LB_FLEX,
  TE1: LB_FLEX,
  TE2: LB_FLEX,
  OT1: LB_FLEX,
  OT2: LB_FLEX,
  OG1: LB_FLEX,
  OG2: LB_FLEX,
  C: LB_FLEX,
  DE1: LB_FLEX,
  DE2: LB_FLEX,
  DT1: LB_FLEX,
  DT2: LB_FLEX,
  MIKE: LB_FLEX,
  WILL: LB_FLEX,
  SAM: LB_FLEX,
};

export function isNaturalSlot(pos: SlotKey, slot: SlotKey): boolean {
  const nat = NATURAL_SLOT_MAP[pos];
  return !!nat && nat.includes(slot);
}

export function flexPenaltyFor(pos: string, slot: SlotKey): number | null {
  const t = FLEX[pos];
  if (!t) return null;
  return t[slot] ?? null;
}

// --- Advice engine (simplified from Claude's adviseLineup) ---
export function adviseLineup(
  roster: Player[],
  current: Record<SlotKey, Player | null>,
): LineupAdvice[] {
  const advice: LineupAdvice[] = [];
  const slots: SlotKey[] = Object.keys(NATURAL_SLOT_MAP) as SlotKey[];

  for (const slot of slots) {
    const cur = current[slot];
    const natSlots = NATURAL_SLOT_MAP[slot];
    // Best natural player for this slot
    let best: Player | null = null;
    let bestOvr = -1;
    for (const p of roster) {
      if (natSlots.includes(p.pos as SlotKey) && p.ovr > bestOvr) {
        bestOvr = p.ovr;
        best = p;
      }
    }

    if (!cur && best) {
      advice.push({
        slot,
        current: null,
        suggested: best,
        reason: 'Empty slot — best available natural fit',
        delta: best.ovr - 70,
      });
    } else if (cur && best && best.ovr > cur.ovr + 2) {
      advice.push({
        slot,
        current: cur,
        suggested: best,
        reason: 'Upgrade available',
        delta: best.ovr - cur.ovr,
      });
    } else if (cur) {
      advice.push({
        slot,
        current: cur,
        suggested: cur,
        reason: 'Set — natural fit',
        delta: 0,
      });
    }
  }

  return advice.sort((a, b) => b.delta - a.delta);
}
