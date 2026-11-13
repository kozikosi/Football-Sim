// Shared app-layer contracts (framework-free, sport-free). Actions are synchronous reducers; I/O lives in services
// (saver, loader) that dispatch synchronous result-actions. Nothing here knows about Svelte, React or the DOM.
//
// w74 item 4 patches (Z.ai drafts, awaiting Architect ruling):
//   F6 — SaveStatus 'saving' | 'failed' now carry `key` (the storage key the status is about). CHOSEN OVER a
//        global-on-purpose note: the saver queues per key (slots, backups, the user dataset), and a quota failure
//        on `sim:nfl:slot:A:bak` is indistinguishable from one on the active save unless the status names the key.
//        Additive only — no existing constructor site renames a field. The UI derives the slot label from the key
//        when it is a slot key (core/keys.ts slotOfKey); other keys show their tail segment.
//   F3 — StorageModule gains keys(prefix) / entries(prefix). The migration use died with P-258 (legacy.ts is
//        deleted, not wrapped); the remaining need is the storage dump harness (tools/dump-storage.mjs) and the
//        cache-coherence sweep. Enumeration is best-effort and sorted; a backend that cannot list keys returns a
//        Result error, never throws.
export type BootPhase = 'booting' | 'ready' | 'fatal';
export type SaveStatus =
  | { kind: 'idle' }                                   // nothing pending, last write landed
  | { kind: 'saving'; key: string; revision: number }  // a write is queued or in flight, for this storage key
  | { kind: 'failed'; key: string; revision: number; reason: string; retriable: boolean };   // the screen shows a chip naming the key; play continues, memory is the truth
export type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

// Async-native on purpose: the localStorage implementation completes synchronously inside the call (so a pagehide flush
// is reliable); an IndexedDB implementation can replace it later without touching a caller.
export interface StorageModule {
  read(key: string): Promise<Result<string | null>>;
  write(key: string, text: string): Promise<Result<void>>;
  remove(key: string): Promise<Result<void>>;
  /** Every key with the given prefix ('' = all our keys), sorted. Best-effort; never throws. (F3) */
  keys(prefix: string): Promise<Result<string[]>>;
  /** key/value pairs for every key with the given prefix; values are the stored strings, unparsed. (F3) */
  entries(prefix: string): Promise<Result<[string, string][]>>;
}

// Where player rows come from. NO silent fallback to a bundled fictional league (Kosi's real-names ruling, F11):
// with no dataset the boot state is EMPTY with a plain-language message and an import path (core/dataset.ts);
// a user-supplied CSV is validated and stored under sim:nfl:dataset:user. 'bundled' stays a build-time source tag
// only: a dev/private build may ship real-names rows as a local build input, and the public build must not ship a
// fictional league pretending to be real. A loader never throws: every failure is a Result the boot screen can show.
export type DatasetSource = 'bundled' | 'user';
// Sport-free: the row shape belongs to the sport (NFL's is sports/nfl/app/dataset.ts DatasetRow). `Row` defaults to
// `unknown` so shared code can carry a dataset and its hash without knowing a sport's columns.
export interface LoadedDataset<Row = unknown> { source: DatasetSource; rows: readonly Row[]; hash: string }
export interface DatasetLoader<Row = unknown> { load(): Promise<Result<LoadedDataset<Row>, { code: 'no-dataset' | 'user-invalid' | 'bundled-missing'; message: string }>> }
