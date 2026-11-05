// Shared app-layer contracts (framework-free, sport-free). Actions are synchronous reducers; I/O lives in services
// (saver, loader) that dispatch synchronous result-actions. Nothing here knows about Svelte, React or the DOM.
export type BootPhase = 'booting' | 'ready' | 'fatal';
export type SaveStatus =
  | { kind: 'idle' }                                   // nothing pending, last write landed
  | { kind: 'saving'; revision: number }               // a write is queued or in flight
  | { kind: 'failed'; revision: number; reason: string; retriable: boolean };   // the screen shows a chip; play continues, memory is the truth
export type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };

// Async-native on purpose: the localStorage implementation completes synchronously inside the call (so a pagehide flush
// is reliable); an IndexedDB implementation can replace it later without touching a caller.
export interface StorageModule {
  read(key: string): Promise<Result<string | null>>;
  write(key: string, text: string): Promise<Result<void>>;
  remove(key: string): Promise<Result<void>>;
}

// Where player rows come from. The default is the bundled fictional seeded league; a user-supplied CSV is validated and
// stored under its own key. A loader never throws: every failure is a Result the boot screen can show.
export type DatasetSource = 'bundled' | 'user';
export interface LoadedDataset { source: DatasetSource; rows: readonly (readonly [string, string, string, string, number, number, number, 0 | 1])[]; hash: string }
export interface DatasetLoader { load(): Promise<Result<LoadedDataset, { code: 'user-invalid' | 'bundled-missing'; message: string }>> }
