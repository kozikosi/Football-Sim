// The player's profile (sim:profile): who they are across every sport, plus one block per sport.
//   { v: 2, createdAt, sports: { nfl: { ... } } }
// `createdAt` is shared. Everything else a sport remembers (last team, achievements ...) lives under `sports.<id>`, and the SHAPE of that block is
// the sport's own business (sports/nfl/app/profile.ts says the NFL's). This file knows only the container, and it never drops a sport it does not
// know: a profile written by a newer build (with a sport this build lacks) survives an older build's save.
export const PROFILE_VERSION = 2;
export type SportBlock = Record<string, unknown>;
export interface Profile { v: number; createdAt: string | null; sports: Record<string, SportBlock> }
const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);

export const emptyProfile = (): Profile => ({ v: PROFILE_VERSION, createdAt: null, sports: {} });

// Reads a stored v2 profile; anything else (null, junk, a different version) is not guessed at: returns null so the caller can migrate or start fresh.
export function parseProfile(x: unknown): Profile | null {
  if (!isObj(x) || x.v !== PROFILE_VERSION) return null;
  if (x.createdAt !== null && typeof x.createdAt !== 'string') return null;
  if (!isObj(x.sports) || !Object.values(x.sports).every(isObj)) return null;
  return { v: PROFILE_VERSION, createdAt: x.createdAt as string | null, sports: { ...(x.sports as Record<string, SportBlock>) } };
}
export const sportBlock = (p: Profile, sport: string): SportBlock => p.sports[sport] ?? {};
// Returns a new profile with `patch` merged into one sport's block; every other sport's block is carried over untouched.
export function patchSport(p: Profile, sport: string, patch: SportBlock): Profile {
  return { ...p, sports: { ...p.sports, [sport]: { ...sportBlock(p, sport), ...patch } } };
}
