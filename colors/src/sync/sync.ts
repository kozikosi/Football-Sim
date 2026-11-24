// Account sync, client side (contract sections 5 and 9). localStorage stays the source of truth; the server is a replica plus history.
// Whole envelopes only, never a field merge. Every outside thing (storage, transport, clock, timers, ids) is injected.
// No engine import: this file reads an envelope only through core/envelope.ts's outer shape.
import type { Result } from '../core/app.ts';
import { SLOT_NAMES, parseEnvelope } from '../core/envelope.ts';
import type { Envelope, SlotName } from '../core/envelope.ts';
import { sportKey } from '../core/keys.ts';
import { loadRecord, saveRecord } from './record.ts';
import type { SyncRecord } from './record.ts';
import type { AccountChoice, Failure, RemoteMeta, SaveReason, SignInResult, SyncDeps, SyncStatus } from './types.ts';

export const DEBOUNCE_MS = 10_000;          // contract: >= 10 s per slot for ordinary edits
export const FOCUS_PULL_AFTER_MS = 60_000;  // pull on focus after >= 60 s hidden
export const BACKOFF_BASE_MS = 1_000;
export const BACKOFF_MAX_MS = 60_000;
export const ARCHIVE_KEEP = 3;              // local rung-backs per slot, same as the server's

type Local = { text: string; env: Envelope } | null | 'unreadable';
type Decision = 'same' | 'pull' | 'push' | 'fork';
const at = (iso: string): number => Date.parse(iso);

// The contract's conflict table, as a pure function.
export function decide(local: { saveId: string; saveRevision: number; savedAt: string }, remote: { saveId: string; saveRevision: number; savedAt: string }): Decision {
  if (local.saveId !== remote.saveId) return 'fork';
  if (remote.saveRevision > local.saveRevision) return 'pull';
  if (remote.saveRevision < local.saveRevision) return 'push';
  const a = at(local.savedAt), b = at(remote.savedAt);
  return b > a ? 'pull' : b < a ? 'push' : 'same';
}

export interface SyncApi {
  signIn(userId: string): Promise<SignInResult>;
  signOut(): void;
  /** The app calls this after a save landed locally. Ordinary edits debounce; the other reasons push now. */
  notifySaved(slot: SlotName, reason: SaveReason): void;
  /** pagehide: start pushing every dirty slot now (keepalive). Does not wait. */
  flush(): void;
  /** window focus: pulls when the page was hidden for at least 60 s. */
  onVisible(hiddenForMs: number): void;
  onOnline(): void;
  resolveAccountSwitch(choice: AccountChoice): Promise<SignInResult>;
  status(): SyncStatus;
  subscribe(fn: (s: SyncStatus) => void): () => void;
  /** Local rung-backs for a slot, newest first. */
  localArchive(slot: SlotName): Promise<{ key: string; env: Envelope }[]>;
  /** Resolves when no queued work remains (tests, and sign-out confirmations). */
  idle(): Promise<void>;
}

export function createSync(deps: SyncDeps): SyncApi {
  const sport = deps.sport ?? 'nfl';
  const slotKey = (s: SlotName): string => sportKey(sport, 'slot:' + s);
  const archPrefix = (s: SlotName): string => sportKey(sport, 'sync-archive:' + s) + ':';
  let rec: SyncRecord | null = null;
  let userId: string | null = null;
  let pendingUser: string | null = null;          // an account that signed in over another account's saves
  let st: SyncStatus = { kind: 'off', reason: 'never-signed-in' };
  let lastSyncedAt: number | null = null;
  const listeners = new Set<(s: SyncStatus) => void>();
  const setStatus = (s: SyncStatus): void => { st = s; for (const l of [...listeners]) l(s); };
  const idleStatus = (): void => setStatus({ kind: 'idle', lastSyncedAt });

  // ---- one serial queue: no two network operations interleave ----
  let chain: Promise<unknown> = Promise.resolve();
  let inflight = 0;
  const enqueue = <T>(f: () => Promise<T>): Promise<T> => {
    inflight++;
    const p = chain.then(f, f).finally(() => { inflight--; });
    chain = p.catch(() => undefined);
    return p;
  };
  const queued = new Set<SlotName>();             // pushes already waiting: a second notify coalesces into it
  const dirty = new Set<SlotName>();              // saved locally, not yet acknowledged by the server
  const debounce = new Map<SlotName, unknown>();
  const retry = new Map<SlotName, { n: number; h: unknown }>();
  const attempts = new Map<SlotName, number>();   // consecutive failures per slot; cleared on success so backoff really doubles
  let pullTimer: unknown = null;
  let pausedUntil = 0;

  // ---- local reads and writes ----
  async function readLocal(slot: SlotName): Promise<Local> {
    const r = await deps.storage.read(slotKey(slot));
    if (!r.ok) return 'unreadable';
    if (r.value === null) return null;
    try {
      const p = parseEnvelope(JSON.parse(r.value));
      return p.ok && p.value.slot === slot ? { text: r.value, env: p.value } : 'unreadable';   // corrupt or newer-schema: we never touch it
    } catch { return 'unreadable'; }
  }
  async function archiveLocal(slot: SlotName, text: string): Promise<Result<void>> {
    const k = await deps.storage.keys(archPrefix(slot));
    const seqs = k.ok ? k.value.map((x) => Number(x.slice(archPrefix(slot).length))).filter((n) => Number.isInteger(n)) : [];
    const next = (seqs.length ? Math.max(...seqs) : 0) + 1;
    const w = await deps.storage.write(archPrefix(slot) + next, text);
    if (!w.ok) return w;
    for (const n of seqs.filter((x) => x <= next - ARCHIVE_KEEP)) await deps.storage.remove(archPrefix(slot) + n);
    return { ok: true, value: undefined };
  }
  const persist = async (): Promise<void> => { if (rec && !(await saveRecord(deps.storage, sport, rec))) setStatus({ kind: 'failed', reason: 'could not write the sync record to this browser', retriable: false, slot: null }); };

  // ---- failure policy: network/5xx retry with backoff, paused waits for Retry-After, other 4xx stop and surface ----
  function onFailure(f: Failure, slot: SlotName | null): 'retry' | 'stop' {
    switch (f.type) {
      case 'unauthenticated': userId = null; setStatus({ kind: 'off', reason: 'signed-out' }); return 'stop';
      case 'paused': pausedUntil = deps.now() + f.retryAfterSec * 1000; setStatus({ kind: 'paused', untilMs: pausedUntil }); schedulePull(f.retryAfterSec * 1000); return 'stop';
      case 'transient': setStatus({ kind: 'failed', reason: f.message, retriable: true, slot }); if (slot) scheduleRetry(slot, f.retryAfterSec === undefined ? undefined : f.retryAfterSec * 1000); else schedulePull(backoff(1)); return 'retry';
      case 'rejected': setStatus(f.code === 'newer-schema' && slot ? { kind: 'newer-schema', slot } : { kind: 'failed', reason: f.message, retriable: false, slot }); return 'stop';
      case 'conflict': return 'retry';   // callers handle conflict themselves; reaching here means they did not
    }
  }
  const backoff = (n: number): number => Math.min(BACKOFF_MAX_MS, BACKOFF_BASE_MS * 2 ** Math.max(0, n - 1));
  function scheduleRetry(slot: SlotName, forcedMs?: number): void {
    const cur = retry.get(slot);
    if (cur) deps.clearTimer(cur.h);
    const n = (attempts.get(slot) ?? 0) + 1;
    attempts.set(slot, n);
    const h = deps.setTimer(() => { retry.delete(slot); void requestPush(slot); }, forcedMs ?? backoff(n));
    retry.set(slot, { n, h });
  }
  function schedulePull(ms: number): void {
    if (pullTimer !== null) deps.clearTimer(pullTimer);
    pullTimer = deps.setTimer(() => { pullTimer = null; void pullAll(); }, ms);
  }

  // ---- push ----
  function requestPush(slot: SlotName, keepalive = false): Promise<void> {
    if (userId === null || rec === null || pendingUser !== null) return Promise.resolve();
    if (queued.has(slot)) return Promise.resolve();
    queued.add(slot);
    return enqueue(async () => { queued.delete(slot); await pushSlot(slot, keepalive); });
  }
  async function pushSlot(slot: SlotName, keepalive = false): Promise<void> {
    if (userId === null || rec === null) return;
    const local = await readLocal(slot);              // the latest bytes at the moment of the push: coalescing
    if (local === null || local === 'unreadable') { dirty.delete(slot); return; }
    if (deps.now() < pausedUntil) { setStatus({ kind: 'paused', untilMs: pausedUntil }); return; }
    setStatus({ kind: 'syncing' });
    const r = await deps.transport.putSave(sport, slot, { envelope: JSON.parse(local.text), base: rec.serverRev[slot] ?? null, deviceId: rec.deviceId }, { keepalive });
    if (r.ok) {
      rec.serverRev[slot] = r.value.serverRev; dirty.delete(slot); retry.delete(slot); attempts.delete(slot); await persist();
      lastSyncedAt = deps.now(); if (st.kind !== 'failed' || st.slot === slot || st.slot === null) idleStatus();
      return;
    }
    if (r.failure.type === 'conflict') { await resolveConflict(slot); return; }
    onFailure(r.failure, slot);
  }
  // 409: someone else wrote since we last looked. Pull the server's metadata and apply the conflict table to this slot.
  async function resolveConflict(slot: SlotName): Promise<void> {
    for (let i = 0; i < 3; i++) {
      const l = await deps.transport.listSaves();
      if (!l.ok) { onFailure(l.failure, slot); return; }
      const out = await reconcileSlot(slot, l.value);
      if (out !== 'conflict') return;
    }
    setStatus({ kind: 'failed', reason: 'the server copy kept changing while we synced; will retry', retriable: true, slot }); scheduleRetry(slot);
  }

  // ---- pull / reconcile ----
  // Returns 'conflict' when a push inside lost a race and the caller should look again.
  async function reconcileSlot(slot: SlotName, remoteAll: RemoteMeta[]): Promise<'done' | 'conflict'> {
    if (rec === null) return 'done';
    const row = remoteAll.find((r) => r.sport === sport && r.slot === slot);
    const live = row && !row.deleted ? row : null;
    const local = await readLocal(slot);
    if (local === 'unreadable') return 'done';                                          // never overwrite what we cannot read
    if (!local && !live) { if (row) rec.serverRev[slot] = row.serverRev; return 'done'; }
    if (!local && live) { await pull(slot, null); return 'done'; }
    if (local && !live) return pushWith(slot, local, row ? row.serverRev : null);       // local-only (or deleted elsewhere): push, nothing local is deleted
    if (!local || !live) return 'done';
    const d = decide(local.env, live);
    if (d === 'same') { rec.serverRev[slot] = live.serverRev; dirty.delete(slot); await persist(); markSynced(); return 'done'; }
    if (d === 'pull') { await pull(slot, local); return 'done'; }
    if (d === 'push') return pushWith(slot, local, live.serverRev);
    return fork(slot, local, live, remoteAll);
  }
  const markSynced = (): void => { lastSyncedAt = deps.now(); if (st.kind === 'syncing' || st.kind === 'idle') idleStatus(); };
  async function pushWith(slot: SlotName, local: { text: string }, base: number | null, to: SlotName = slot, text = local.text): Promise<'done' | 'conflict'> {
    if (rec === null) return 'done';
    const r = await deps.transport.putSave(sport, to, { envelope: JSON.parse(text), base, deviceId: rec.deviceId });
    if (r.ok) { rec.serverRev[to] = r.value.serverRev; dirty.delete(to); await persist(); markSynced(); return 'done'; }
    if (r.failure.type === 'conflict') return 'conflict';
    onFailure(r.failure, slot); return 'done';
  }
  // Fetch the server's copy of a slot and make it the local one. `archive` is the local save it replaces (a rung-back kept on this device).
  async function pull(slot: SlotName, archive: { text: string } | null, into: SlotName = slot): Promise<{ serverRev: number; text: string } | null> {
    if (rec === null) return null;
    const g = await deps.transport.getSave(sport, slot);
    if (!g.ok) { onFailure(g.failure, slot); return null; }
    if (g.value === null) return null;
    const p = parseEnvelope(g.value.envelope);
    if (!p.ok) { setStatus(p.reason === 'newer-version' ? { kind: 'newer-schema', slot } : { kind: 'failed', reason: 'the server copy of slot ' + slot + ' is not a valid save; left it alone', retriable: false, slot }); return null; }
    if (p.value.slot !== slot) { setStatus({ kind: 'failed', reason: 'the server copy of slot ' + slot + ' names another slot; left it alone', retriable: false, slot }); return null; }
    const env: Envelope = into === slot ? p.value : { ...p.value, slot: into };
    const text = into === slot ? JSON.stringify(g.value.envelope) : JSON.stringify(env);
    if (archive) { const a = await archiveLocal(slot, archive.text); if (!a.ok) { setStatus({ kind: 'failed', reason: 'could not keep a rung-back before pulling: ' + a.error, retriable: true, slot }); return null; } }
    const w = await deps.storage.write(slotKey(into), text);
    if (!w.ok) { setStatus({ kind: 'failed', reason: 'could not write the pulled save: ' + w.error, retriable: true, slot: into }); return null; }
    if (into === slot) { rec.serverRev[slot] = g.value.serverRev; await persist(); markSynced(); }
    deps.onPulled?.(into);
    return { serverRev: g.value.serverRev, text };
  }
  // Different saveId in the same slot: keep both when a slot is free, else the older lineage becomes a rung-back.
  async function fork(slot: SlotName, local: { text: string; env: Envelope }, live: RemoteMeta, remoteAll: RemoteMeta[]): Promise<'done' | 'conflict'> {
    let free: SlotName | null = null;
    for (const s of SLOT_NAMES) {
      if (s === slot) continue;
      const rr = remoteAll.find((r) => r.sport === sport && r.slot === s);
      if ((await readLocal(s)) === null && (!rr || rr.deleted)) { free = s; break; }
    }
    if (free !== null) {
      const moved = await pull(slot, null, free);                       // the incoming lineage lands in the free slot, local slot keeps the local lineage
      if (moved === null) return 'done';
      const freeRow = remoteAll.find((r) => r.sport === sport && r.slot === free);
      const a = await pushWith(slot, local, freeRow ? freeRow.serverRev : null, free, moved.text);   // replicate the moved lineage under its new slot
      if (a === 'conflict') return 'conflict';
      return pushWith(slot, local, live.serverRev);                     // local lineage over the old remote one; the server archives it as a rung-back
    }
    if (at(live.savedAt) >= at(local.env.savedAt)) { await pull(slot, local); return 'done'; }   // remote newer: local becomes a local rung-back
    return pushWith(slot, local, live.serverRev);                                                // local newer: the server archives the remote
  }
  async function reconcileAll(): Promise<boolean> {
    for (let i = 0; i < 3; i++) {
      const l = await deps.transport.listSaves();
      if (!l.ok) { onFailure(l.failure, null); return false; }
      let again = false;
      for (const s of SLOT_NAMES) if ((await reconcileSlot(s, l.value)) === 'conflict') again = true;
      if (!again) return true;
    }
    setStatus({ kind: 'failed', reason: 'the server copy kept changing while we synced; will retry', retriable: true, slot: null }); schedulePull(backoff(1));
    return false;
  }
  async function pullAll(): Promise<void> {
    if (userId === null || rec === null || pendingUser !== null) return;
    await enqueue(async () => {
      if (userId === null) return;
      if (deps.now() < pausedUntil) { setStatus({ kind: 'paused', untilMs: pausedUntil }); return; }
      setStatus({ kind: 'syncing' });
      if (await reconcileAll()) { await sendRuns(); if (st.kind === 'syncing') idleStatus(); }
    });
  }

  // ---- runs: every finished season (statsRecorded) not yet reported; the server ignores a repeat ----
  async function sendRuns(): Promise<void> {
    if (rec === null) return;
    const fresh: { key: string; env: Envelope }[] = [];
    for (const s of SLOT_NAMES) {
      const l = await readLocal(s);
      if (l === null || l === 'unreadable' || l.env.kind !== 'season') continue;
      const p = l.env.payload as { statsRecorded?: unknown; run?: unknown };
      if (p.statsRecorded !== true) continue;
      const key = l.env.saveId + ':' + (Number.isInteger(p.run) ? String(p.run) : '0');
      if (!rec.runsSent.includes(key)) fresh.push({ key, env: l.env });
    }
    if (!fresh.length) return;
    for (let i = 0; i < fresh.length; i += 50) {
      const batch = fresh.slice(i, i + 50);
      const r = await deps.transport.postRuns(batch.map((b) => b.env));
      if (r.ok) { rec.runsSent.push(...batch.map((b) => b.key)); await persist(); continue; }
      if (r.failure.type !== 'rejected' || batch.length === 1) { onFailure(r.failure, null); if (r.failure.type !== 'rejected') return; continue; }
      // One bad season must not block the good ones: retry the batch one by one; the bad one stays unsent and shows a failed chip.
      for (const b of batch) {
        const one = await deps.transport.postRuns([b.env]);
        if (one.ok) { rec.runsSent.push(b.key); await persist(); } else { onFailure(one.failure, null); if (one.failure.type !== 'rejected') return; }
      }
    }
  }

  // ---- public surface ----
  async function startSession(uid: string, only: SlotName[] | null): Promise<SignInResult> {
    userId = uid; pendingUser = null;
    if (rec === null) rec = { version: 1, userId: uid, deviceId: deps.newId(), serverRev: {}, runsSent: [] };
    else if (rec.userId !== uid) rec = { version: 1, userId: uid, deviceId: rec.deviceId, serverRev: {}, runsSent: [] };   // an explicit adopt: the old account's revs are meaningless to the new one
    await persist();
    return enqueue(async () => {
      setStatus({ kind: 'syncing' });
      const ok = only === null ? await reconcileAll() : await reconcileOnly(only);
      if (!ok) return { kind: 'failed' as const, reason: st.kind === 'failed' ? st.reason : st.kind === 'paused' ? 'sync is paused' : 'sign-in sync failed' };
      await sendRuns();
      if (st.kind === 'syncing') idleStatus();
      return st.kind === 'failed' ? { kind: 'failed' as const, reason: st.reason } : { kind: 'ok' as const };
    });
  }
  async function reconcileOnly(slots: SlotName[]): Promise<boolean> {
    const l = await deps.transport.listSaves();
    if (!l.ok) { onFailure(l.failure, null); return false; }
    for (const s of slots) if ((await reconcileSlot(s, l.value)) === 'conflict') { setStatus({ kind: 'failed', reason: 'the server copy changed while we synced; try again', retriable: true, slot: s }); return false; }
    return true;
  }

  return {
    async signIn(uid) {
      rec = await loadRecord(deps.storage, sport);
      if (rec !== null && rec.userId !== uid) {
        pendingUser = uid; userId = null;
        setStatus({ kind: 'needs-account-choice' });
        return { kind: 'needs-account-choice', deviceUserId: rec.userId };   // never merge silently: "These saves belong to another account on this device."
      }
      return startSession(uid, null);
    },
    async resolveAccountSwitch(choice) {
      const uid = pendingUser;
      if (uid === null) return { kind: 'failed', reason: 'no account choice is pending' };
      if (choice.action === 'keep-separate') { pendingUser = null; userId = null; setStatus({ kind: 'off', reason: 'signed-out' }); return { kind: 'ok' }; }   // local untouched; this account does not sync on this device
      return startSession(uid, choice.slots);
    },
    signOut() {   // local saves and the sync record stay (contract section 9)
      userId = null; pendingUser = null; dirty.clear(); queued.clear();
      for (const h of debounce.values()) deps.clearTimer(h); debounce.clear();
      for (const r of retry.values()) deps.clearTimer(r.h); retry.clear(); attempts.clear();
      if (pullTimer !== null) { deps.clearTimer(pullTimer); pullTimer = null; }
      setStatus({ kind: 'off', reason: 'signed-out' });
    },
    notifySaved(slot, reason) {
      if (userId === null) return;
      dirty.add(slot);
      if (reason === 'edit') {
        if (debounce.has(slot)) return;                                     // at most one push per 10 s per slot, always the latest bytes
        debounce.set(slot, deps.setTimer(() => { debounce.delete(slot); void requestPush(slot); }, DEBOUNCE_MS));
        return;
      }
      const h = debounce.get(slot); if (h !== undefined) { deps.clearTimer(h); debounce.delete(slot); }
      void requestPush(slot).then(() => (reason === 'elimination' ? enqueue(sendRuns) : undefined));
    },
    flush() {
      if (userId === null) return;
      for (const h of debounce.values()) deps.clearTimer(h);
      debounce.clear();
      for (const s of [...dirty]) void requestPush(s, true);
    },
    onVisible(hiddenForMs) { if (userId !== null && hiddenForMs >= FOCUS_PULL_AFTER_MS) void pullAll(); },
    onOnline() {
      if (userId === null) return;
      for (const r of retry.values()) deps.clearTimer(r.h);
      const slots = [...retry.keys()]; retry.clear();
      for (const s of slots) void requestPush(s);
      if (st.kind === 'failed' && st.retriable && st.slot === null) void pullAll();
    },
    status: () => st,
    subscribe(fn) { listeners.add(fn); return () => { listeners.delete(fn); }; },
    async localArchive(slot) {
      const e = await deps.storage.entries(archPrefix(slot));
      if (!e.ok) return [];
      const out: { key: string; env: Envelope; n: number }[] = [];
      for (const [key, text] of e.value) { try { const p = parseEnvelope(JSON.parse(text)); if (p.ok) out.push({ key, env: p.value, n: Number(key.slice(archPrefix(slot).length)) }); } catch { /* skip */ } }
      return out.sort((a, b) => b.n - a.n).map(({ key, env }) => ({ key, env }));
    },
    async idle() { for (let i = 0; i < 5; i++) await Promise.resolve(); while (inflight > 0) { await chain; await Promise.resolve(); } },
  };
}
