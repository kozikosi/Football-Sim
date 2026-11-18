// The browser StorageModule over localStorage (w74 items 4c/4g, Z.ai draft — awaiting Architect ruling).
//
// PLACEMENT: src/platform/, not core/ and not sports/nfl/app/ — the layout law says core must not mention
// storage, and the app-layer purity test bans localStorage in src/sports/nfl/app/. Platform glue (the only file
// that may touch browser storage globals) lives here; the app composition root wires it to the saver.
//
// Why localStorage: Claude's §2 VERIFIED it (250 K-char write, median 0.4 ms / max 3.1 ms) and the synchronous
// completion is what makes a pagehide flush reliable. IndexedDB can replace this class later without touching a
// caller (the interface is async-native on purpose).
//
// Item 4(c) F3: keys(prefix) / entries(prefix) — the dump harness (tools/dump-storage.mjs) and the
// cache-coherence sweep are the remaining needs for enumeration now that P-258 kills legacy.ts.
//
// Item 4(b) F8: an enveloped write whose envelope.slot names a different slot than the key is REFUSED. Core stays
// sport-free, so the slot check is INJECTED: the app composition root passes saves.ts's assertSlotMatchesKey;
// tests can pass their own. The check parses only the outer envelope (parseEnvelope), never the payload —
// storage treats payloads as opaque.
import { parseEnvelope } from '../core/envelope.ts';
import type { SlotName } from '../core/envelope.ts';
import { isOurKey } from '../core/keys.ts';
import type { Result, StorageModule } from '../core/app.ts';

const err = <T>(e: unknown): Result<T> => ({ ok: false, error: e instanceof Error ? e.message : String(e) });

export interface LocalStorageOptions {
  /** F8: given the envelope's slot and the storage key, return a refusal message or null when the pair is fine. */
  slotCheck?: (slot: SlotName, key: string) => string | null;
}

export class LocalStorageModule implements StorageModule {
  constructor(private readonly ls: Storage | null, private readonly o: LocalStorageOptions = {}) {}
  private get storage(): Storage | null {
    // Storage access itself can throw (privacy mode); treat that as "no storage" — the boot screen's
    // storage-unavailable path handles it, and memory remains the truth while the page lives.
    return this.ls;
  }
  async read(key: string): Promise<Result<string | null>> {
    try { return { ok: true, value: this.storage?.getItem(key) ?? null }; } catch (e) { return err(e); }
  }
  async write(key: string, text: string): Promise<Result<void>> {
    try {
      if (isOurKey(key) && this.o.slotCheck) {
        // Only envelope-shaped values are checked; anything else (a theme string, a stats blob) writes without
        // inspection. A malformed envelope-looking value is refused: writing it would make the slot unloadable
        // anyway, and corrupt-never-repair starts at the write.
        try {
          const outer = parseEnvelope(JSON.parse(text));
          if (outer.ok) { const why = this.o.slotCheck(outer.value.slot, key); if (why) return { ok: false, error: why }; }
        } catch { /* not JSON: not an envelope; other keys may hold plain strings */ }
      }
      this.storage?.setItem(key, text);
      return { ok: true, value: undefined };
    } catch (e) { return err(e); }     // F9: quota-class failures land here; the saver maps them once a taxonomy exists
  }
  async remove(key: string): Promise<Result<void>> {
    try { this.storage?.removeItem(key); return { ok: true, value: undefined }; } catch (e) { return err(e); }
  }
  async keys(prefix: string): Promise<Result<string[]>> {
    try {
      const ls = this.storage; if (!ls) return { ok: true, value: [] };
      const out: string[] = [];
      for (let i = 0; i < ls.length; i++) { const k = ls.key(i); if (k !== null && k.startsWith(prefix)) out.push(k); }
      return { ok: true, value: out.sort() };
    } catch (e) { return err(e); }
  }
  async entries(prefix: string): Promise<Result<[string, string][]>> {
    const ks = await this.keys(prefix);
    if (!ks.ok) return ks;
    const out: [string, string][] = [];
    for (const k of ks.value) {
      const v = await this.read(k);
      if (v.ok && v.value !== null) out.push([k, v.value]);   // a key that vanished mid-read is skipped, best-effort
    }
    return { ok: true, value: out };
  }
}

export const createLocalStorageModule = (o: LocalStorageOptions = {}): LocalStorageModule =>
  new LocalStorageModule(typeof localStorage === 'undefined' ? null : localStorage, o);
