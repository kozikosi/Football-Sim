// Browser-storage key names. ONE scheme for the whole product (Owner/KG, 4 Nov 2026):
//   sim:<name>              shared by every sport: theme, settings, profile
//   sim:<sport>:<name>      belongs to one sport: tab, slot:A, slot:A:bak, stats, player-names ...
// Nothing else is written to browser storage. (The shell's older `zpb:*` keys are moved once by sports/nfl/app/legacy.ts.)
// Imports nothing, so the storage module can copy it.
//
// w74 item 4 (F8 support): slotOfKey parses the slot segment out of a slot key, so a write path can assert
// envelope.slot === slotOfKey(key) before an envelope lands under a key naming a different slot. Non-slot keys
// (sim:nfl:dataset:user, sim:theme) return null — the assertion is only defined where a slot is named.
export const KEY_ROOT = 'sim';
const SPORT = /^[a-z][a-z0-9]*$/;
const SEG = /^[a-z0-9][a-z0-9-]*$/i;           // one name segment; slot letters are upper-case (slot:A)
export const GLOBAL_NAMES = ['theme', 'settings', 'profile'] as const;
export type GlobalName = (typeof GLOBAL_NAMES)[number];
// The slot letters a key can name. Structurally identical to core/envelope.ts's SlotName (the layout law keeps
// this file import-free, so the union is restated here and envelope.ts remains the contract owner).
export type KeySlot = 'A' | 'B' | 'C';

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
  return p.length >= 3 && p[0] === KEY_ROOT && p[1] !== undefined && SPORT.test(p[1]) ? p[1] : null;
}
export const isOurKey = (key: string): boolean => key.startsWith(KEY_ROOT + ':');

// F8: the slot a key names ('sim:nfl:slot:A' → 'A', 'sim:nfl:slot:A:bak' → 'A'), or null when the key's first
// name segment is not 'slot:<SLOT>'. Import-only-of-types, so storage can copy this file.
const SLOTS = ['A', 'B', 'C'];
export function slotOfKey(key: string): KeySlot | null {
  const p = key.split(':');
  const s = p[3];
  if (p.length < 4 || p[2] !== 'slot' || s === undefined) return null;
  return (SLOTS as string[]).includes(s) ? (s as KeySlot) : null;
}
