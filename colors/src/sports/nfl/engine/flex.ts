// FLEX table, tiers -2 / -6 / -12, 97 rules (Owner 9 Nov 2026, D picks + 9 Owner corrections): what a player of one role loses (in OVR points) for playing a spot of another.
// Source of truth is tools/mathlab/flex.json: 7 rules removed, 53 Owner overrides, the other 44 priced by D@90 at theta 1.0 (thetaprice, P-309), rounded to the nearest tier of 0 / 2 / 6 / 12; then 9 Owner overrides (EDGE>ILB/OG/OT/RB/NICKEL, DT>C, DT>OG, EDGE>C to 6; OG>C to 2).
// Counts: 19 at 12, 40 at 6, 15 at 2, 23 at 0. The 8 Nov table (104 rules) and REV 4 (29 Oct) live in git history only.
// This file is a typed copy; a test compares it with flex.json rule by rule, so the two cannot drift apart silently.
import type { Role } from './players.ts';
import type { Dest } from './slots.ts';

type Row = Partial<Record<Dest, number>>;
export const FLEX: Readonly<Record<Role, Row>> = {
  QB: { FS: 12 },
  RB: { FB: 0, WR: 12, TE: 6, SS: 12, FS: 12 },
  FB: { RB: 2, TE: 6 },
  WR: { RB: 6, TE: 6, CB: 2, FS: 2, SS: 2, NICKEL: 2, DIME: 2 },
  TE: { FB: 0, WR: 12, RB: 6, C: 6, OG: 6, OT: 12, EDGE: 12, DT: 12, OLB: 6, ILB: 12, SS: 6, FS: 6, NICKEL: 6, DIME: 6 },
  OT: { OG: 0, C: 2, DT: 6, EDGE: 6, FB: 0 },
  OG: { OT: 2, C: 2, DT: 6, EDGE: 6, FB: 0 },
  C: { OG: 6, OT: 12, DT: 12, FB: 0 },
  DT: { EDGE: 6, C: 6, OG: 6, OT: 6, FB: 0 },
  EDGE: { DT: 0, OLB: 0, ILB: 6, C: 6, OG: 6, OT: 6, SS: 12, RB: 6, FB: 0, TE: 6, NICKEL: 6 },
  ILB: { ILB: 0, OLB: 0, EDGE: 12, SS: 2, FB: 0, TE: 6, NICKEL: 6, DIME: 12 },
  OLB: { OLB: 0, ILB: 6, EDGE: 12, SS: 6, FB: 0, TE: 6, NICKEL: 6, DIME: 12 },
  SS: { NICKEL: 0, DIME: 0, FS: 2, CB: 6, WR: 12, ILB: 6, OLB: 2, RB: 12, TE: 6 },
  FS: { NICKEL: 0, DIME: 0, SS: 2, CB: 6, WR: 12, OLB: 6 },
  CB: { FS: 0, NICKEL: 0, DIME: 0, SS: 0, WR: 6 },
  K: { P: 2 },
  P: { K: 2 },
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
