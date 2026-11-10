// The NFL block of the profile (profile.sports.nfl) and the one-time move of the shell's flat profile into it.
import { emptyProfile, parseProfile, patchSport, sportBlock } from '../../../core/profile.ts';
import type { Profile } from '../../../core/profile.ts';

export interface Achievement { id: string; label: string; at: string; team: string | null }
export interface NflProfile { lastTeam: string | null; lastPlayedAt: string | null; achievements: Achievement[] }
export const NFL_PROFILE_DEFAULT: NflProfile = { lastTeam: null, lastPlayedAt: null, achievements: [] };

export const nflProfile = (p: Profile): NflProfile => ({ ...NFL_PROFILE_DEFAULT, ...(sportBlock(p, 'nfl') as Partial<NflProfile>) });
export const patchNfl = (p: Profile, patch: Partial<NflProfile>): Profile => patchSport(p, 'nfl', patch as Record<string, unknown>);

// The shell's flat profile `{createdAt, lastTeam, lastPlayedAt, achievements}` (zpb:st:profile, Z.ai w57+) becomes `{v:2, createdAt, sports:{nfl:{lastTeam, lastPlayedAt, achievements}}}`.
// Already-v2 input is returned as is (so running it twice is harmless); junk becomes a fresh profile.
export function migrateFlatProfile(raw: unknown): Profile {
  const v2 = parseProfile(raw);
  if (v2) return v2;
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return emptyProfile();
  const f = raw as Record<string, unknown>;
  const base = emptyProfile();
  base.createdAt = typeof f.createdAt === 'string' ? f.createdAt : null;
  const ach = Array.isArray(f.achievements) ? (f.achievements as unknown[]).filter((a): a is Achievement => typeof a === 'object' && a !== null && typeof (a as Achievement).id === 'string') : [];
  return patchNfl(base, { lastTeam: typeof f.lastTeam === 'string' ? f.lastTeam : null, lastPlayedAt: typeof f.lastPlayedAt === 'string' ? f.lastPlayedAt : null, achievements: ach });
}
