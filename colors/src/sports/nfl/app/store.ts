// The app store: framework-free, so Svelte (store contract) and React (useSyncExternalStore) wrap the same object.
// E4: the draft is saved as a LOG over a FROZEN pool (the envelope's DraftPayload), not as a replay of the seed.
// The record holds every pick made so far (CPU and user, in order) and the whole board as it was when the draft began, so resuming
// never reads the live player data and never re-runs a CPU decision: logged picks are applied as they were. Only picks that have
// not happened yet are drawn, from a fork of the seed per pick position, from a state restored out of the log (see `settle`).
// Undo is "cut the log back to just before the user's last pick".
//
// F1 (w74 item 4c): this file's local `AppState`/`Action` pair is RETIRED — renamed `DraftStoreState`/`DraftStoreAction`
// — because appstate.ts is the ONLY AppState in the product (the whole-app contract the screens and reducers share).
// DECISION POINT for the Architect: if he rules the other way (store.ts keeps the AppState name and appstate.ts's
// whole-app state is the rename), the change reverts cleanly: this is a rename of two exported type aliases plus this
// comment — no behaviour, no field, no call site changes. Every internal use was updated; `Store` (the factory return)
// is unchanged.
import { sportKey } from '../../../core/keys.ts';
import { draftPayloadProblem } from './saves.ts';
import type { DraftPayload, FrozenPoolRow } from './saves.ts';
import { applyPick, cpuChoose, newDraft } from '../engine/draft.ts';
import type { DraftState } from '../engine/draft.ts';
import { fit } from '../engine/flex.ts';
import { roleOf } from '../engine/players.ts';
import type { Player } from '../engine/players.ts';
import { makeRng } from '../../../core/rng.ts';
import { SLOTS } from '../engine/slots.ts';
import type { Dest, SlotId } from '../engine/slots.ts';

export type SaveRecord = DraftPayload;
export type Status = 'idle' | 'drafting' | 'done';
export interface DraftStoreState { record: SaveRecord | null; draft: DraftState | null; status: Status; error: string | null }
export type DraftStoreAction =
  | { type: 'START'; seed: number; userTeam: number }
  | { type: 'PICK'; playerId: string; slot: SlotId }
  | { type: 'UNDO' }
  | { type: 'LOAD'; record: unknown };

const DEST = Object.fromEntries(SLOTS.map((s) => [s.id, s.dest])) as Record<string, Dest>;
const SLOT_SET = new Set<string>(SLOTS.map((s) => s.id));

// The pool as the draft sees it (long snappers are never drafted), frozen as compact rows and thawed back to players.
export function freezePool(players: readonly Player[]): FrozenPoolRow[] {
  return players.filter((p) => p.role !== 'LS').map((p) => [p.id, p.name, p.pos, p.team, p.ovr, p.spd, p.str, p.freeAgent ? 1 : 0]);
}
export function thawPool(rows: readonly FrozenPoolRow[]): Player[] {
  return rows.map(([id, name, pos, team, ovr, spd, str, fa]) => {
    const role = roleOf(pos);
    if (!role) throw new Error('save: unknown position ' + pos);
    return { id, name, pos, role, team, ovr, spd, str, freeAgent: fa === 1 };
  });
}

// Validates an untrusted record (from storage or an import); returns it or throws a message.
export function parseRecord(x: unknown): SaveRecord {
  if (!x || typeof x !== 'object' || Array.isArray(x)) throw new Error('save: not an object');
  const why = draftPayloadProblem(x as Record<string, unknown>);
  if (why) throw new Error('save: ' + why);
  const o = x as SaveRecord;
  if (o.picks.length > 32 * 32) throw new Error('save: too many picks');
  if (!o.picks.every((k) => SLOT_SET.has(k.slot))) throw new Error('save: bad pick slot');
  return { seed: o.seed, userTeam: o.userTeam, picks: o.picks.map((k) => ({ overall: k.overall, team: k.team, pid: k.pid, slot: k.slot })), pool: o.pool.map((r) => [...r] as FrozenPoolRow) };
}

const toRecord = (st: DraftState, seed: number, userTeam: number, pool: FrozenPoolRow[]): SaveRecord =>
  ({ seed, userTeam, pool, picks: st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) });

// Applies the logged picks to a fresh draft over the frozen pool. Nothing is drawn: a log that does not fit throws.
export function restoreDraft(rec: SaveRecord): DraftState {
  const st = newDraft(thawPool(rec.pool), makeRng(rec.seed).fork('draft'));
  for (const k of rec.picks) {
    if (st.pos >= st.order.length) throw new Error('save: more picks than the draft has');
    if (k.overall !== st.pos + 1 || k.team !== st.order[st.pos]) throw new Error('save: pick ' + k.overall + ' is out of order');
    const player = st.pool.find((p) => p.id === k.pid);
    if (!player) throw new Error('restore: player not available: ' + k.pid);
    const dest = SLOT_SET.has(k.slot) ? DEST[k.slot] : undefined;
    if (!dest || !fit(player.role, dest).legal) throw new Error('restore: illegal fit');
    applyPick(st, k.team, player, k.slot as SlotId);
  }
  return st;
}
// The CPU teams pick, in order, until the user is on the clock or the draft is over.
function advance(st: DraftState, seed: number, userTeam: number): void {
  const cpu = makeRng(seed).fork('cpu');
  while (st.pos < st.order.length) {
    const team = st.order[st.pos];
    if (team === undefined || team === userTeam) break;
    const c = cpuChoose(st, team, cpu.fork('p' + st.pos));
    applyPick(st, team, c.player, c.slot);
  }
}

export function createStore(players: readonly Player[]) {
  let state: DraftStoreState = { record: null, draft: null, status: 'idle', error: null };
  const subs = new Set<(s: DraftStoreState) => void>();
  const set = (s: DraftStoreState) => { state = s; subs.forEach((f) => f(state)); };
  // What the user sees is always the draft as RESTORED from the log, never the live object the CPU just advanced: the engine caches a
  // replacement level that is only refreshed every few picks, so the two differ slightly. Settling on the restored form makes the screen
  // before and after a refresh identical, and every later CPU draw start from the same state however the draft was reached.
  const settle = (st: DraftState, rec: SaveRecord): DraftStoreState => { const d = restoreDraft(rec); return { record: rec, draft: d, status: d.pos >= d.order.length ? 'done' : 'drafting', error: null }; };
  const dispatch = (a: DraftStoreAction): void => {
    try {
      if (a.type === 'START') {
        if (!Number.isInteger(a.seed) || !Number.isInteger(a.userTeam) || a.userTeam < 0 || a.userTeam > 31) throw new Error('start: bad seed or team');
        const pool = freezePool(players), st = restoreDraft({ seed: a.seed, userTeam: a.userTeam, picks: [], pool });
        advance(st, a.seed, a.userTeam);
        set(settle(st, toRecord(st, a.seed, a.userTeam, pool)));
      } else if (a.type === 'LOAD') {
        const rec = parseRecord(a.record), st = restoreDraft(rec);
        advance(st, rec.seed, rec.userTeam);   // a log saved while the user was on the clock needs nothing; one cut short by a crash is finished here
        set(settle(st, toRecord(st, rec.seed, rec.userTeam, rec.pool)));
      } else if (!state.record || !state.draft) throw new Error('no draft in progress');
      else if (a.type === 'PICK') {
        const { record: rec, draft: st0 } = state;
        if (st0.pos >= st0.order.length || st0.order[st0.pos] !== rec.userTeam) throw new Error('it is not your pick');
        if (!SLOT_SET.has(a.slot)) throw new Error('bad slot');
        const st = restoreDraft(rec), player = st.pool.find((p) => p.id === a.playerId);
        if (!player) throw new Error('player not available: ' + a.playerId);
        const dest = DEST[a.slot];
        if (!dest || !fit(player.role, dest).legal) throw new Error('illegal fit');
        applyPick(st, rec.userTeam, player, a.slot);
        advance(st, rec.seed, rec.userTeam);
        set(settle(st, toRecord(st, rec.seed, rec.userTeam, rec.pool)));
      } else if (a.type === 'UNDO') {
        const rec = state.record, i = rec.picks.map((k) => k.team).lastIndexOf(rec.userTeam);
        if (i < 0) throw new Error('nothing to undo');
        const cut = { ...rec, picks: rec.picks.slice(0, i) }, st = restoreDraft(cut);
        set(settle(st, toRecord(st, rec.seed, rec.userTeam, rec.pool)));
      }
    } catch (e) {
      console.warn('store: action rejected:', a.type, (e as Error).message);
      set({ ...state, error: (e as Error).message });
    }
  };
  return { getState: () => state, dispatch, subscribe: (f: (s: DraftStoreState) => void) => { subs.add(f); return () => subs.delete(f); } };
}
export type Store = ReturnType<typeof createStore>;

// Storage is injected (localStorage in the browser, a Map in tests); every call is guarded because storage can throw or be empty.
// This is the single-draft convenience; the slotted, enveloped storage module wraps the same record as a DraftPayload.
export interface KeyValue { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void }
export const SAVE_KEY = sportKey('nfl', 'draft');   // sim:nfl:draft
export function saveTo(kv: KeyValue, rec: SaveRecord | null): void {
  try { if (rec) kv.setItem(SAVE_KEY, JSON.stringify(rec)); else kv.removeItem(SAVE_KEY); } catch (e) { console.warn('save failed:', (e as Error).message); }
}
export function loadFrom(kv: KeyValue): SaveRecord | null {
  try { const raw = kv.getItem(SAVE_KEY); return raw ? parseRecord(JSON.parse(raw)) : null; } catch (e) { console.warn('load failed:', (e as Error).message); return null; }
}
