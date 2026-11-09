// FLEX table, tiers -2 / -6 / -12 (Owner 8 Nov 2026, P-294): what a player of one role loses (in OVR points) for playing a spot of another.
// Source of truth is tools/mathlab/flex.json: the Owner's 7 Nov working version with his pick of 8 Nov (every penalty of 6+ is -12, then every -4 is -6;
// 0 and 2 untouched; tiers 0 / 2 / 6 / 12; QB->FS 12). The REV 4 guide (29 Oct) is retired (Muse relay 9 Nov: new table only, no fallback); it lives in git history.
// This file is a typed copy; a test compares it with flex.json rule by rule, so the two cannot drift apart silently.
import type { Role } from './players.ts';
import type { Dest } from './slots.ts';

type Row = Partial<Record<Dest, number>>;
export const FLEX: Readonly<Record<Role, Row>> = {
  QB: { FS: 12 },
  RB: { FB: 2, WR: 12, TE: 12, SS: 12, FS: 12 },
  FB: { RB: 2, TE: 6, ILB: 12, OLB: 12, EDGE: 12, DT: 12 },
  WR: { RB: 12, TE: 6, CB: 6, FS: 6, SS: 6, NICKEL: 6, DIME: 6 },
  TE: { FB: 2, WR: 12, RB: 6, C: 12, OG: 12, OT: 12, EDGE: 12, DT: 12, OLB: 12, ILB: 12, SS: 6, FS: 6, NICKEL: 12, DIME: 12 },
  OT: { OG: 0, C: 0, DT: 6, EDGE: 12, FB: 2 },
  OG: { OT: 6, C: 0, DT: 6, EDGE: 12, FB: 2 },
  C: { OG: 6, OT: 12, DT: 6, FB: 2 },
  DT: { EDGE: 12, C: 6, OG: 6, OT: 12, FB: 2, TE: 12 },
  EDGE: { DT: 2, OLB: 2, ILB: 12, C: 12, OG: 12, OT: 12, SS: 12, FS: 12, RB: 12, FB: 2, TE: 12, NICKEL: 12 },
  ILB: { ILB: 0, OLB: 0, EDGE: 12, SS: 12, FB: 2, TE: 12, NICKEL: 12, DIME: 12 },
  OLB: { OLB: 0, ILB: 2, EDGE: 12, SS: 12, FB: 2, TE: 12, NICKEL: 6, DIME: 12 },
  SS: { NICKEL: 0, DIME: 0, FS: 2, CB: 12, WR: 12, ILB: 12, OLB: 12, RB: 12, TE: 12 },
  FS: { NICKEL: 0, DIME: 0, SS: 2, CB: 12, WR: 12, OLB: 12 },
  CB: { FS: 0, NICKEL: 0, DIME: 0, SS: 2, WR: 12, RB: 12 },
  K: { P: 0 },
  P: { K: 12 },
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
