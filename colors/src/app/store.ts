// The app store: framework-free, so Svelte (store contract) and React (useSyncExternalStore) wrap the same object.
// The whole draft is a function of a small save record {seed, userTeam, picks}: the CPU's draws come from a fork of the
// seed per pick position, so replaying the record rebuilds exactly the same draft, and Undo is "drop the last pick, replay".
import { applyPick, cpuChoose, newDraft } from '../engine/draft.ts';
import type { DraftState } from '../engine/draft.ts';
import { fit } from '../engine/flex.ts';
import type { Player } from '../engine/players.ts';
import { makeRng } from '../engine/rng.ts';
import { SLOTS } from '../engine/slots.ts';
import type { SlotId } from '../engine/slots.ts';

export const SAVE_VERSION = 1;
export interface UserPick { playerId: string; slot: SlotId }
export interface SaveRecord { version: number; seed: number; userTeam: number; picks: UserPick[] }
export type Status = 'idle' | 'drafting' | 'done';
export interface AppState { record: SaveRecord | null; draft: DraftState | null; status: Status; error: string | null }
export type Action =
  | { type: 'START'; seed: number; userTeam: number }
  | { type: 'PICK'; playerId: string; slot: SlotId }
  | { type: 'UNDO' }
  | { type: 'LOAD'; record: unknown };

const DEST = Object.fromEntries(SLOTS.map((s) => [s.id, s.dest]));
const SLOT_SET = new Set<string>(SLOTS.map((s) => s.id));

// Validates an untrusted record (from storage or an import); returns the record or throws a message.
export function parseRecord(x: unknown): SaveRecord {
  const o = x as Partial<SaveRecord> | null;
  if (!o || typeof o !== 'object') throw new Error('save: not an object');
  if (o.version !== SAVE_VERSION) throw new Error('save: unknown version ' + String(o.version));
  if (!Number.isInteger(o.seed)) throw new Error('save: bad seed');
  if (!Number.isInteger(o.userTeam) || o.userTeam! < 0 || o.userTeam! > 31) throw new Error('save: bad team');
  if (!Array.isArray(o.picks) || o.picks.length > 32) throw new Error('save: bad picks');
  for (const p of o.picks) if (!p || typeof p.playerId !== 'string' || !SLOT_SET.has(p.slot)) throw new Error('save: bad pick');
  return { version: SAVE_VERSION, seed: o.seed!, userTeam: o.userTeam!, picks: o.picks.map((p) => ({ playerId: p.playerId, slot: p.slot })) };
}

// Rebuilds the draft from the record. Stops where the user is on the clock (or the draft ends).
export function replay(players: readonly Player[], rec: SaveRecord): DraftState {
  const st = newDraft(players, makeRng(rec.seed).fork('draft'));
  const cpu = makeRng(rec.seed).fork('cpu');
  let used = 0;
  for (;;) {
    if (st.pos >= st.order.length) return st;
    const team = st.order[st.pos];
    if (team === rec.userTeam) {
      if (used >= rec.picks.length) return st;
      const u = rec.picks[used++], player = st.pool.find((p) => p.id === u.playerId);
      if (!player) throw new Error('replay: player not available: ' + u.playerId);
      if (!fit(player.role, DEST[u.slot]).legal) throw new Error('replay: illegal fit');
      applyPick(st, team, player, u.slot);
    } else {
      const c = cpuChoose(st, team, cpu.fork('p' + st.pos));
      applyPick(st, team, c.player, c.slot);
    }
  }
}

export function createStore(players: readonly Player[]) {
  let state: AppState = { record: null, draft: null, status: 'idle', error: null };
  const subs = new Set<(s: AppState) => void>();
  const set = (s: AppState) => { state = s; subs.forEach((f) => f(state)); };
  const build = (record: SaveRecord): AppState => {
    const draft = replay(players, record);
    return { record, draft, status: draft.pos >= draft.order.length ? 'done' : 'drafting', error: null };
  };
  const dispatch = (a: Action): void => {
    try {
      if (a.type === 'START') set(build({ version: SAVE_VERSION, seed: a.seed, userTeam: a.userTeam, picks: [] }));
      else if (a.type === 'LOAD') set(build(parseRecord(a.record)));
      else if (!state.record) throw new Error('no draft in progress');
      else if (a.type === 'PICK') {
        const next = { ...state.record, picks: [...state.record.picks, { playerId: a.playerId, slot: a.slot }] };
        set(build(next));
      } else if (a.type === 'UNDO') {
        if (!state.record.picks.length) throw new Error('nothing to undo');
        set(build({ ...state.record, picks: state.record.picks.slice(0, -1) }));
      }
    } catch (e) {
      console.warn('store: action rejected:', a.type, (e as Error).message);
      set({ ...state, error: (e as Error).message });
    }
  };
  return { getState: () => state, dispatch, subscribe: (f: (s: AppState) => void) => { subs.add(f); return () => subs.delete(f); } };
}
export type Store = ReturnType<typeof createStore>;

// Storage is injected (localStorage in the browser, a Map in tests); every call is guarded because storage can throw or be empty.
export interface KeyValue { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void }
export const SAVE_KEY = '20-0:draft';
export function saveTo(kv: KeyValue, rec: SaveRecord | null): void {
  try { if (rec) kv.setItem(SAVE_KEY, JSON.stringify(rec)); else kv.removeItem(SAVE_KEY); } catch (e) { console.warn('save failed:', (e as Error).message); }
}
export function loadFrom(kv: KeyValue): SaveRecord | null {
  try { const raw = kv.getItem(SAVE_KEY); return raw ? parseRecord(JSON.parse(raw)) : null; } catch (e) { console.warn('load failed:', (e as Error).message); return null; }
}
