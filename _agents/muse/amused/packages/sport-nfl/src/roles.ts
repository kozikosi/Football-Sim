// NFL roles. Ported from colors/src/engine/players.ts (Architect's engine, council/base).
// A Role is the flex-guide identity of a player; Dest (in slots.ts) is the identity of a spot.
export type Role =
  | 'QB' | 'RB' | 'FB' | 'WR' | 'TE' | 'OT' | 'OG' | 'C'
  | 'DT' | 'EDGE' | 'ILB' | 'OLB' | 'SS' | 'FS' | 'CB'
  | 'K' | 'P' | 'LS';

// Madden's printed positions -> flex roles (for roster data loading).
export const POS_TO_ROLE: Readonly<Record<string, Role>> = {
  QB: 'QB', HB: 'RB', FB: 'FB', WR: 'WR', TE: 'TE',
  LT: 'OT', RT: 'OT', LG: 'OG', RG: 'OG', C: 'C',
  DT: 'DT', LEDG: 'EDGE', REDG: 'EDGE',
  MIKE: 'ILB', WILL: 'OLB', SAM: 'OLB',
  CB: 'CB', SS: 'SS', FS: 'FS', K: 'K', P: 'P', LS: 'LS',
};
