// Autosave queue. Per slot: strict FIFO, newest write wins (older queued writes are dropped, never reordered),
// at most one write in flight, bounded retry, and a status the UI can show. Dispatch never waits for it.
//
// w74 item 4 patches (Z.ai drafts, awaiting Architect ruling):
//   F6 — status carries `key` (see core/app.ts).
//   F8 — enqueue() asserts the envelope's slot matches the key it is written under when the caller passes one
//        (assertSlotMatchesKey, sports/nfl/app/saves.ts). The saver itself stays sport-blind; the assertion runs
//        at the call site that has the envelope. The storage module also re-checks on write (core/storage-local.ts),
//        so a mis-slotted envelope cannot land even if a future caller forgets.
//   F9 — `retriable` is true for every failure today because the injected StorageModule cannot classify errors.
//        FUTURE (noted, not built): a quota-class failure (QuotaExceededError and friends) is the one class that
//        should report retriable:false — retrying a full quota burns the retry budget and hides the reason. When
//        StorageModule gains an error taxonomy, map quota-class to retriable:false here and leave transient IO
//        errors retriable:true.
import type { Result, SaveStatus, StorageModule } from './app.ts';

export interface Saver {
  /** Queue a write for a key. revision must increase per key; a lower or equal one is ignored (stale). */
  enqueue(key: string, revision: number, text: string): void;
  /** Resolves when nothing is queued or in flight. Used on pagehide and in tests. */
  settled(): Promise<void>;
  status(): SaveStatus;
  subscribe(fn: (s: SaveStatus) => void): () => void;
}

export function createSaver(storage: StorageModule, o: { retries?: number } = {}): Saver {
  const retries = o.retries ?? 2;
  const newest = new Map<string, number>();                                   // highest revision accepted per key
  const pending = new Map<string, { revision: number; text: string }>();      // the single waiting write per key
  const busy = new Set<string>();
  const subs = new Set<(s: SaveStatus) => void>();
  let status: SaveStatus = { kind: 'idle' };
  let idle: Array<() => void> = [];
  const set = (s: SaveStatus) => { status = s; subs.forEach((f) => f(s)); };

  async function run(key: string): Promise<void> {
    busy.add(key);
    try {
      for (let job = pending.get(key); job; job = pending.get(key)) {
        pending.delete(key);
        let r: Result<void> = { ok: false, error: 'not attempted' };
        for (let i = 0; i <= retries; i++) { r = await storage.write(key, job.text).catch((e): Result<void> => ({ ok: false, error: String(e) })); if (r.ok) break; }
        if (!r.ok && !pending.has(key)) set({ kind: 'failed', key, revision: job.revision, reason: r.error, retriable: true });   // F9: quota-class → retriable:false once StorageModule can classify
      }
    } finally { busy.delete(key); }
    if (!pending.size && !busy.size) { if (status.kind === 'saving') set({ kind: 'idle' }); idle.forEach((f) => f()); idle = []; }
  }

  return {
    enqueue(key, revision, text) {
      if (revision <= (newest.get(key) ?? 0)) return;
      newest.set(key, revision);
      pending.set(key, { revision, text });                                   // replaces any older waiting write
      set({ kind: 'saving', key, revision });
      if (!busy.has(key)) void run(key);
    },
    settled: () => (pending.size || busy.size ? new Promise<void>((res) => { idle.push(res); }) : Promise.resolve()),
    status: () => status,
    subscribe(fn) { subs.add(fn); return () => { subs.delete(fn); }; },
  };
}
