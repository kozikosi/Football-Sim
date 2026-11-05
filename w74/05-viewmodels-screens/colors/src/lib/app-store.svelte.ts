// The Svelte 5 adapter over the draft store (w74 item 5b, Z.ai DRAFT — this file is the pattern-freeze
// forcing function; every GUESS below is a decision point for the Architect).
//
// G-VM1 (pattern, established by view/draftBoard.ts, kept): view models are PURE functions state -> plain JSON;
// components hold no logic and receive pre-formatted strings.
//
// G-VM2 (this file): the store snapshot is `$state.raw`, never deep-reactive `$state` — the draft state carries
// the whole frozen pool (thousands of rows) and 7(b)'s lint rule forbids big data in deep reactivity. Consumers
// re-run their `$derived` on the NEW OBJECT IDENTITY the store hands out (the store replaces the state object on
// every dispatch; it never mutates).
//
// G-VM3 (this file): ONE module-level store instance imported by every component; dispatch is called directly by
// components, not threaded through props. Portability to React is untouched — React wraps the SAME store object
// with useSyncExternalStore (store.ts is framework-free by contract).
//
// G-VM4 (this file): the slice wires the DRAFT store (the reducer that exists). The whole-app AppState reducer
// (appstate.ts) is Claude's pending piece; App.svelte's screen switch is written against appstate's Screen union
// so the swap is mechanical.
//
// G-VM5 (this file): the read-only share flag lives here (G-VM3's single import makes it one choke point): when
// a read-only share is loaded, mutating actions are refused BEFORE the store sees them and a banner flag flips.
import { createStore, saveTo, loadFrom } from '../sports/nfl/app/store.ts';
import type { DraftStoreAction, DraftStoreState } from '../sports/nfl/app/store.ts';
import { devPool } from '../platform/devPool.ts';

// G-VM4: the slice boots on the synthetic dev pool; the dataset loader replaces this line (see devPool.ts).
const store = createStore(devPool());

// Slice autosave (the shell battery's "autosave survives reload" criterion, item 7f): the single-draft
// convenience from store.ts (saveTo/loadFrom over the injected KeyValue), wired to localStorage here in the
// PLATFORM layer (never in src/sports/nfl/app — the purity test bans it there). The slotted, enveloped saver
// (core/saver.ts + the pending whole-app reducer) replaces this wiring; the acceptance spec then moves to it.
interface KV { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void }
function sliceKV(): KV | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return { getItem: (k) => localStorage.getItem(k), setItem: (k, v) => localStorage.setItem(k, v), removeItem: (k) => localStorage.removeItem(k) };
  } catch { return null; }                                  // privacy mode / storage refused: memory is the truth
}
const kv = sliceKV();
if (kv) {
  const saved = loadFrom(kv);
  if (saved) store.dispatch({ type: 'LOAD', record: JSON.parse(JSON.stringify(saved)) });   // a reload resumes the same draft
  store.subscribe((s) => saveTo(kv, s.record));             // every committed transition lands in storage
}

// The read-only flag (folder 05 share.ts). Not part of DraftStoreState by design: sharing is a session property,
// not save state (the shared copy never saves, so no envelope carries it).
let readOnly = false;

let snap = $state.raw(store.getState());

const unsubscribe = store.subscribe((s: DraftStoreState) => { snap = s; });

export function appState(): DraftStoreState {
  return snap;
}

/** Dispatch with the read-only guard: a viewer can look, never act (folder 05 item 5g). */
export function dispatch(a: DraftStoreAction): void {
  if (readOnly && (a.type === 'PICK' || a.type === 'UNDO' || a.type === 'START' || a.type === 'LOAD')) {
    console.warn('share: this is a read-only copy; mutating actions are refused');
    return;
  }
  store.dispatch(a);
}

/** Load a read-only shared record (item 5g). Returns false when the record does not parse. */
export function loadReadOnly(record: unknown): boolean {
  store.dispatch({ type: 'LOAD', record });
  if (store.getState().error) return false;
  readOnly = true;
  return true;
}

export function isReadOnly(): boolean {
  return readOnly;
}
