// VLC V1 — Engine: RATING_SPECS, teamRatings
// Extracted from Claude's engine. Logic untouched.
// Protected constants per AGENTS.md §3.

import type { SlotKey, TeamRatings } from '../types/engine';

// --- Protected constants ---
export const RATING_SPECS: Record<string, Record<SlotKey, number>> = {
  offense: {
    QB: 1, RB1: 1, RB2: 1, WR1: 1, WR2: 1, WR3: 1, WR4: 1,
    TE1: 1, TE2: 1, OT1: 1, OT2: 1, OG1: 1, OG2: 1, C: 1,
  },
  defense: {
    DE1: 1, DE2: 1, DT1: 1, DT2: 1, DL5: 1,
    MIKE: 1, WILL: 1, SAM: 1, LB4: 1,
    CB1: 1, CB2: 1, CB3: 1, CB4: 1,
    SS: 1, SS2: 1, FS: 1, FS2: 1,
  },
  olRun: { OT1: 1, OT2: 1, OG1: 1, OG2: 1, C: 1, RB1: 1, RB2: 1 },
  olPass: { OT1: 1, OT2: 1, OG1: 1, OG2: 1, C: 1, QB: 1 },
  passRush: { DE1: 1, DE2: 1, DT1: 1, DT2: 1 },
  coverage: { CB1: 1, CB2: 1, CB3: 1, CB4: 1, SS: 1, FS: 1 },
  frontRun: { DE1: 1, DE2: 1, DT1: 1, DT2: 1, MIKE: 1, WILL: 1, SAM: 1 },
  qb: { QB: 1 },
  rb: { RB1: 1, RB2: 1 },
  rec: { WR1: 1, WR2: 1, WR3: 1, WR4: 1, TE1: 1, TE2: 1 },
};

function wavgSlots(slotmap: Record<SlotKey, { ovr: number } | null>, spec: Record<SlotKey, number>): number {
  let total = 0;
  let weight = 0;
  for (const [slot, w] of Object.entries(spec) as [SlotKey, number][]) {
    const p = slotmap[slot];
    if (p) {
      total += p.ovr * w;
      weight += w;
    }
  }
  return weight ? total / weight : 70;
}

export function teamRatings(slotmap: Record<SlotKey, { ovr: number } | null>): TeamRatings {
  const r: TeamRatings = {
    offense: 0, defense: 0, olRun: 0, olPass: 0,
    passRush: 0, coverage: 0, frontRun: 0, qb: 0, rb: 0, rec: 0,
  };
  for (const k of Object.keys(RATING_SPECS) as (keyof TeamRatings)[]) {
    const spec = RATING_SPECS[k];
    r[k] = wavgSlots(slotmap, spec);
  }
  return r;
}
