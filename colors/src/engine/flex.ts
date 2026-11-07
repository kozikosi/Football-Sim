// Flex guide REV 4: what a player of one role loses (in OVR points) for playing a spot of another.
// Source of truth is tools/mathlab/flex.json (Owner's REV 2 guide of 26 Oct, his 28 Oct rulings: edge->OLB 0, TE->RB 4,
// P->K 4, K->P 0, every extra rule of w33 kept; and REV 4 of 29 Oct: a QB may flex ONLY to FS, at -10). This file is
// a typed copy; a test compares it with flex.json rule by rule, so the two cannot drift apart silently.
import type { Role } from './players.ts';
import type { Dest } from './slots.ts';

type Row = Partial<Record<Dest, number>>;
export const FLEX: Readonly<Record<Role, Row>> = {
  QB: { FS: 10 },
  RB: { FB: 2, WR: 4, TE: 10 },
  FB: { RB: 4, TE: 4 },
  WR: { RB: 4, TE: 4, SS: 4, FS: 4, NICKEL: 4, DIME: 4, CB: 10 },
  TE: { WR: 2, FB: 2, RB: 4, C: 10, OG: 10, OT: 10, EDGE: 10, DT: 10, ILB: 10, OLB: 10, SS: 10, FS: 10, NICKEL: 10, DIME: 10 },
  OT: { OG: 0, C: 0, DT: 4, FB: 4, RB: 10 },
  OG: { C: 0, OT: 4, DT: 4, FB: 4, RB: 10 },
  C: { OG: 0, OT: 4, DT: 4, FB: 4, RB: 10 },
  DT: { OG: 4, C: 4, EDGE: 4, FB: 4, OT: 10, ILB: 4, OLB: 4, RB: 10 },
  EDGE: { DT: 2, OLB: 0, ILB: 4, FB: 4, TE: 10, RB: 10, NICKEL: 10 },
  ILB: { ILB: 0, OLB: 0, DT: 4, FB: 4, EDGE: 10, TE: 10, SS: 10, FS: 10, NICKEL: 10, DIME: 10 },
  OLB: { OLB: 0, ILB: 2, EDGE: 4, NICKEL: 4, DT: 10, TE: 10, SS: 10, FS: 10, FB: 10, DIME: 10 },
  SS: { NICKEL: 0, DIME: 0, FS: 2, OLB: 4, CB: 10, ILB: 10, WR: 10, TE: 10, RB: 10, FB: 10 },
  FS: { NICKEL: 0, DIME: 0, SS: 2, CB: 4, WR: 4, ILB: 4, OLB: 4, TE: 10, RB: 10 },
  CB: { FS: 0, NICKEL: 0, DIME: 0, SS: 2, WR: 4, ILB: 10, OLB: 4, TE: 10, RB: 10 },
  K: { P: 0 },
  P: { K: 4 },
  // LS has no spot (12 long snappers in the data). Anyone not in the guide still takes the emergency fallback.
  LS: {},
};

// Owner (21 Oct): "If you reach your last open spot and nobody left can legally play it, you may take any remaining
// player (except a quarterback) there at -8."
export const EMERGENCY_PENALTY = 8;

// How a role fits a destination: 0 at home, the guide's number if listed, otherwise the emergency fallback
// (`emergency: true`); a quarterback has no fallback (`legal: false`).
export interface Fit { penalty: number; emergency: boolean; legal: boolean }

// DL5 is the rotational fifth lineman (Owner 27 Oct): natural for DT and EDGE; everyone else pays the cheaper of the
// guide's role->DT and role->EDGE price (spec 12.2).
function dl5Penalty(role: Role): number | undefined {
  if (role === 'DT' || role === 'EDGE') return 0;
  const a = FLEX[role].DT, b = FLEX[role].EDGE;
  if (a === undefined) return b;
  if (b === undefined) return a;
  return Math.min(a, b);
}

export function fit(role: Role, dest: Dest): Fit {
  if (role === dest) return { penalty: 0, emergency: false, legal: true };
  const listed = dest === 'DL5' ? dl5Penalty(role) : FLEX[role][dest];
  if (listed !== undefined) return { penalty: listed, emergency: false, legal: true };
  // A quarterback never takes the emergency fallback.
  if (role === 'QB') return { penalty: EMERGENCY_PENALTY, emergency: true, legal: false };
  return { penalty: EMERGENCY_PENALTY, emergency: true, legal: true };
}

// The effective rating of a player at a spot.
export function effectiveOvr(ovr: number, role: Role, dest: Dest): number {
  return ovr - fit(role, dest).penalty;
}
