// One-time move of the shell's old storage keys (`zpb:*`, written by Z.ai's w34-w66 shell) into the `sim:` scheme (core/keys.ts).
// Safe by construction: a value is COPIED, read back and compared, and only then is the old key removed; an existing new key is never overwritten;
// anything that cannot be moved cleanly stays where it was and is reported. Running it twice does nothing the second time.
// Storage is injected (`keys()` lists what is there), so this is testable without a browser.
import { globalKey, sportKey } from '../../../core/keys.ts';
import { migrateFlatProfile } from './profile.ts';

export interface MigratableKv { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void; keys(): string[] }
export interface MigrationReport {
  moved: [from: string, to: string][];
  kept: [key: string, why: string][];     // left in place: the new key already holds something different, or the value could not be read or written
  dropped: string[];                      // half-written temp slots and keys with nothing worth keeping
  names: { moved: number; ambiguous: string[]; unknown: string[] };   // player-profile names: moved to a player id / names shared by several players / names matching nobody
}
const SLOT_PREFIX = 'zpb:st:slot:';
const SIMPLE: Readonly<Record<string, string>> = {
  'zpb:theme': globalKey('theme'), 'zpb:st:settings': globalKey('settings'),
  'zpb:tab': sportKey('nfl', 'tab'), 'zpb:base34': sportKey('nfl', 'base34'),
  'zpb:st:stats': sportKey('nfl', 'stats'), 'zpb:st:stats:applied': sportKey('nfl', 'stats:applied'),
};
export const PLAYER_NAMES_KEY = sportKey('nfl', 'player-names');

export function migrateLegacy(kv: MigratableKv, nameToPids: (name: string) => readonly string[]): MigrationReport {
  const rep: MigrationReport = { moved: [], kept: [], dropped: [], names: { moved: 0, ambiguous: [], unknown: [] } };
  // copy `value` to `to`, verify, then remove `from` (unless `keepFrom`)
  const put = (from: string, to: string, value: string, keepFrom = false): boolean => {
    try {
      const have = kv.getItem(to);
      if (have !== null && have !== value) { rep.kept.push([from, 'new key already holds a different value']); return false; }
      if (have === null) { kv.setItem(to, value); if (kv.getItem(to) !== value) { rep.kept.push([from, 'write did not read back']); return false; } }
      if (!keepFrom) kv.removeItem(from);
      rep.moved.push([from, to]); return true;
    } catch (e) { rep.kept.push([from, 'storage refused: ' + (e as Error).message]); return false; }
  };
  for (const from of kv.keys().slice().sort()) {
    const v = kv.getItem(from);
    if (v === null) continue;
    if (from in SIMPLE) put(from, SIMPLE[from], v);
    else if (from === 'zpb:st:profile') {
      let parsed: unknown;
      try { parsed = JSON.parse(v); } catch { rep.kept.push([from, 'not JSON']); continue; }
      put(from, globalKey('profile'), JSON.stringify(migrateFlatProfile(parsed)));
    } else if (from.startsWith(SLOT_PREFIX)) {
      const rest = from.slice(SLOT_PREFIX.length);
      if (rest.endsWith(':tmp')) { try { kv.removeItem(from); rep.dropped.push(from); } catch { rep.kept.push([from, 'storage refused']); } }
      else put(from, sportKey('nfl', 'slot:' + rest), v);
    } else if (from === 'zpbPlayerProfiles') {
      let m: unknown;
      try { m = JSON.parse(v); } catch { rep.kept.push([from, 'not JSON']); continue; }
      if (typeof m !== 'object' || m === null || Array.isArray(m)) { rep.kept.push([from, 'not an object']); continue; }
      const out: Record<string, string> = {}, left: Record<string, string> = {};
      for (const [name, label] of Object.entries(m as Record<string, unknown>)) {
        if (typeof label !== 'string' || !label) continue;
        const pids = nameToPids(name);
        if (pids.length === 1) { out[pids[0]] = label; rep.names.moved++; }
        else if (pids.length === 0) { rep.names.unknown.push(name); left[name] = label; }
        else { rep.names.ambiguous.push(name); left[name] = label; }   // two players share the name: which one was named cannot be known, so nothing is guessed
      }
      try {
        const cur = kv.getItem(PLAYER_NAMES_KEY), merged = { ...(cur ? JSON.parse(cur) : {}), ...out };
        if (Object.keys(out).length) { kv.setItem(PLAYER_NAMES_KEY, JSON.stringify(merged)); rep.moved.push([from, PLAYER_NAMES_KEY]); }
        if (Object.keys(left).length) { kv.setItem(from, JSON.stringify(left)); rep.kept.push([from, 'names that match no single player were left here']); }
        else kv.removeItem(from);
      } catch (e) { rep.kept.push([from, 'storage refused: ' + (e as Error).message]); }
    } else if (from.startsWith('zpb:st:')) rep.kept.push([from, 'unrecognised old key']);
  }
  return rep;
}
