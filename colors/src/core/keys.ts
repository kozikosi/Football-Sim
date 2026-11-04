// Browser-storage key names. ONE scheme for the whole product (Owner/KG, 4 Nov 2026):
//   sim:<name>              shared by every sport: theme, settings, profile
//   sim:<sport>:<name>      belongs to one sport: tab, slot:A, slot:A:bak, stats, player-names ...
// Nothing else is written to browser storage. (The shell's older `zpb:*` keys are moved once by sports/nfl/app/legacy.ts.)
// Imports nothing, so the storage module can copy it.
export const KEY_ROOT = 'sim';
const SPORT = /^[a-z][a-z0-9]*$/;
const SEG = /^[a-z0-9][a-z0-9-]*$/i;           // one name segment; slot letters are upper-case (slot:A)
export const GLOBAL_NAMES = ['theme', 'settings', 'profile'] as const;
export type GlobalName = (typeof GLOBAL_NAMES)[number];

export function globalKey(name: GlobalName): string {
  if (!(GLOBAL_NAMES as readonly string[]).includes(name)) throw new Error('keys: unknown shared key ' + name);
  return `${KEY_ROOT}:${name}`;
}
// `name` may have several colon-separated segments ('slot:A:bak').
export function sportKey(sport: string, name: string): string {
  if (!SPORT.test(sport)) throw new Error('keys: bad sport id ' + sport);
  if (name === '' || !name.split(':').every((p) => SEG.test(p))) throw new Error('keys: bad key name ' + name);
  if ((GLOBAL_NAMES as readonly string[]).includes(sport)) throw new Error('keys: a sport cannot be called ' + sport);
  return `${KEY_ROOT}:${sport}:${name}`;
}
// Which sport a key belongs to, or null for a shared key or a key that is not ours.
export function sportOfKey(key: string): string | null {
  const p = key.split(':');
  return p.length >= 3 && p[0] === KEY_ROOT && SPORT.test(p[1]) ? p[1] : null;
}
export const isOurKey = (key: string): boolean => key.startsWith(KEY_ROOT + ':');
