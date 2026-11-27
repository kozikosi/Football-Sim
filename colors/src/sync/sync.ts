// Account sync, client side (contract sections 5 and 9). localStorage stays the source of truth; the server is a replica plus history.
// Whole envelopes only, never a field merge. Every outside thing (storage, transport, clock, timers, ids) is injected.
// No engine import: this file reads an envelope only through core/envelope.ts's outer shape.
import type { Result } from '../core/app.ts';
import { SLOT_NAMES, parseEnvelope } from '../core/envelope.ts';
import type { Envelope, SlotName } from '../core/envelope.ts';
import { sportKey } from '../core/keys.ts';
import { loadRecord, saveRecord } from './record.ts';
import type { SyncRecord } from './record.ts';
import type { AccountChoice, Failure, HistoryEntry, RemoteMeta, SaveReason, ShareLink, SignInResult, Stats, SyncDeps, SyncStatus, TResult } from './types.ts';

export const DEBOUNCE_MS = 10_000;          // contract: >= 10 s per slot for ordinary edits
export const FOCUS_PULL_AFTER_MS = 60_000;  // pull on focus after >= 60 s hidden
export const BACKOFF_BASE_MS = 1_000;
export const BACKOFF_MAX_MS = 60_000;
export const ARCHIVE_KEEP = 3;              // local rung-backs per slot, same as the server's
const SENT_KEEP = 8;                        // unanswered writes remembered per slot

type Local = { text: string; env: Envelope } | null | 'unreadable';
type Decision = 'same' | 'pull' | 'push' | 'fork';
const at = (iso: string): number => Date.parse(iso);
const fingerprint = (e: { saveId: string; saveRevision: number; savedAt: string }): string => e.saveId + '|' + e.saveRevision + '|' + e.savedAt;

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
  /** The app calls this after the user deleted a slot locally. Sent only while signed in; otherwise the save returns at the next sign-in. */
  notifyDeleted(slot: SlotName): void;
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
  /** Slots holding an earlier account's save that was not imported: shown as "on this device only". */
  heldSlots(): SlotName[];
  /** Server rung-backs for a slot, newest first. */
  serverHistory(slot: SlotName): Promise<Result<HistoryEntry[]>>;
  /** Makes a server rung-back the slot's save, here and on the server. Unsynced progress is sent first, so it is kept as a rung-back too. */
  restoreFromServer(slot: SlotName, archivedSeq: number): Promise<Result<void>>;
  stats(): Promise<Result<Stats>>;
  /** A read-only link to the slot as it is now (progress is sent first). */
  shareSave(slot: SlotName): Promise<Result<ShareLink>>;
  shareRun(saveId: string, run: number): Promise<Result<ShareLink>>;
  revokeShare(id: string): Promise<Result<void>>;
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
  // A sign-in change ends the session: whatever was queued or running for it stops at its next read, write or request.
  let session = 0, running = 0;
  const STALE = Symbol('stale');
  const newSession = (): void => { session++; queued.clear(); deleting.clear(); };
  const current = (): void => { if (running !== session) throw STALE; };
  // The storage and transport as queued work sees them.
  const fenced = <T extends object>(target: T): T => new Proxy(target, {
    get: (t, k) => { const f = Reflect.get(t, k) as unknown; return typeof f !== 'function' ? f : async (...args: unknown[]) => { current(); const v = await f.apply(t, args); current(); return v; }; },
  });
  const io = fenced(deps.storage), net = fenced(deps.transport);
  const enqueue = <T>(f: () => Promise<T>, ifStale: T): Promise<T> => {
    inflight++;
    const mine = session;
    const run = async (): Promise<T> => {
      if (mine !== session) return ifStale;
      running = mine;
      try { return await f(); } catch (e) { if (e === STALE) return ifStale; throw e; }
    };
    const p = chain.then(run, run).finally(() => { inflight--; });
    chain = p.catch(() => undefined);
    return p;
  };
  const queued = new Set<SlotName>();             // pushes already waiting: a second notify coalesces into it
  const dirty = new Set<SlotName>();              // saved locally, not yet acknowledged by the server
  const deleting = new Set<SlotName>();           // deleted by the user, the queued send not yet started: nothing may refill the slot meanwhile
  const debounce = new Map<SlotName, unknown>();
  const retry = new Map<SlotName, { n: number; h: unknown }>();
  const attempts = new Map<SlotName, number>();   // consecutive failures per slot; cleared on success so backoff really doubles
  let pullTimer: unknown = null;
  let pullFails = 0;                              // consecutive failed whole-sync rounds, so those back off too
  let pausedUntil = 0;

  // ---- local reads and writes ----
  async function readLocal(slot: SlotName, from = io): Promise<Local> {
    const r = await from.read(slotKey(slot));
    if (!r.ok) return 'unreadable';
    if (r.value === null) return null;
    try {
      const p = parseEnvelope(JSON.parse(r.value));
      return p.ok && p.value.slot === slot ? { text: r.value, env: p.value } : 'unreadable';   // corrupt or newer-schema: we never touch it
    } catch { return 'unreadable'; }
  }
  async function archiveLocal(slot: SlotName, text: string): Promise<Result<void>> {
    const k = await io.keys(archPrefix(slot));
    const seqs = k.ok ? k.value.map((x) => Number(x.slice(archPrefix(slot).length))).filter((n) => Number.isInteger(n)) : [];
    const next = (seqs.length ? Math.max(...seqs) : 0) + 1;
    const w = await io.write(archPrefix(slot) + next, text);
    if (!w.ok) return w;
    for (const n of seqs.filter((x) => x <= next - ARCHIVE_KEEP)) await io.remove(archPrefix(slot) + n);
    return { ok: true, value: undefined };
  }
  const persist = async (to = io): Promise<void> => { if (rec && !(await saveRecord(to, sport, rec))) setStatus({ kind: 'failed', reason: 'could not write the sync record to this browser', retriable: false, slot: null }); };

  // ---- failure policy: network/5xx retry with backoff, paused waits for Retry-After, other 4xx stop and surface ----
  function onFailure(f: Failure, slot: SlotName | null): 'retry' | 'stop' {
    switch (f.type) {
      case 'unauthenticated': userId = null; setStatus({ kind: 'off', reason: 'signed-out' }); return 'stop';
      case 'paused': pausedUntil = deps.now() + f.retryAfterSec * 1000; setStatus({ kind: 'paused', untilMs: pausedUntil }); schedulePull(f.retryAfterSec * 1000); return 'stop';
      case 'transient': setStatus({ kind: 'failed', reason: f.message, retriable: true, slot }); if (slot) scheduleRetry(slot, f.retryAfterSec === undefined ? undefined : f.retryAfterSec * 1000); else schedulePull(f.retryAfterSec === undefined ? backoff(++pullFails) : f.retryAfterSec * 1000); return 'retry';
      case 'rejected': setStatus(f.code === 'newer-schema' && slot ? { kind: 'newer-schema', slot } : { kind: 'failed', reason: f.message, retriable: false, slot }); return 'stop';
      case 'conflict': return 'retry';   // callers handle conflict themselves; reaching here means they did not
    }
  }
  // Doubling, capped, and spread over the upper half of each step so many devices do not retry in the same instant.
  const random = deps.random ?? Math.random;
  const backoff = (n: number): number => { const step = Math.min(BACKOFF_MAX_MS, BACKOFF_BASE_MS * 2 ** Math.max(0, n - 1)); return Math.round(step / 2 + random() * (step / 2)); };
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
    return enqueue(async () => { queued.delete(slot); await pushSlot(slot, keepalive); }, undefined);
  }
  // ---- what the record remembers per slot ----
  function noteSynced(slot: SlotName, env: { saveId: string; saveRevision: number; savedAt: string }): void {
    if (rec === null) return;
    (rec.synced ??= {})[slot] = fingerprint(env);
    delete rec.pendingDelete?.[slot];
    delete rec.sent?.[slot];
  }
  // Remembered before every write, so a copy whose reply was lost is still recognised as ours.
  async function noteSent(slot: SlotName, env: { saveId: string; saveRevision: number; savedAt: string }): Promise<void> {
    if (rec === null) return;
    const f = fingerprint(env), list = (rec.sent ??= {})[slot] ?? [];
    if (!list.includes(f)) { rec.sent[slot] = [...list, f].slice(-SENT_KEEP); await persist(); }
  }
  // If the server holds something this device sent, the unanswered write did land.
  async function settle(slot: SlotName, row: RemoteMeta | null | undefined): Promise<void> {
    const sent = rec?.sent?.[slot];
    if (rec === null || sent === undefined) return;
    if (row && !row.deleted && sent.includes(fingerprint(row))) {
      rec.serverRev[slot] = row.serverRev; (rec.synced ??= {})[slot] = fingerprint(row);
      if (rec.pendingDelete?.[slot] !== undefined) rec.pendingDelete[slot] = row.serverRev;
    } else if (rec.pendingDelete?.[slot] === 0) delete rec.pendingDelete[slot];
    delete rec.sent![slot]; await persist();
  }
  const unchanged = (slot: SlotName, env: Envelope): boolean => rec?.synced?.[slot] === fingerprint(env);
  const movedOnServer = (slot: SlotName, serverRev: number): boolean => rec?.serverRev[slot] !== undefined && serverRev > rec.serverRev[slot]!;
  // True while the slot still holds an earlier account's un-imported save. Any other content ends the hold.
  async function isHeld(slot: SlotName, local: Local): Promise<boolean> {
    const id = rec?.held?.[slot];
    if (id === undefined || local === 'unreadable') return false;
    if (local !== null && local.env.saveId === id) return true;
    delete rec!.held![slot]; await persist(); return false;
  }
  const stillHolds = async (slot: SlotName, text: string | null): Promise<boolean> => { const r = await io.read(slotKey(slot)); return r.ok && r.value === text; };

  async function pushSlot(slot: SlotName, keepalive = false): Promise<void> {
    if (userId === null || rec === null) return;
    const local = await readLocal(slot);              // the latest bytes at the moment of the push: coalescing
    if (local === 'unreadable' || (await isHeld(slot, local))) { dirty.delete(slot); return; }
    if (local === null) { dirty.delete(slot); await pushDelete(slot); return; }
    if (deps.now() < pausedUntil) { setStatus({ kind: 'paused', untilMs: pausedUntil }); return; }
    setStatus({ kind: 'syncing' });
    await noteSent(slot, local.env);
    const r = await net.putSave(sport, slot, { envelope: JSON.parse(local.text), base: rec.serverRev[slot] ?? null, deviceId: rec.deviceId }, { keepalive });
    if (r.ok) {
      rec.serverRev[slot] = r.value.serverRev; noteSynced(slot, local.env); dirty.delete(slot); retry.delete(slot); attempts.delete(slot); await persist();
      lastSyncedAt = deps.now(); if (st.kind !== 'failed' || st.slot === slot || st.slot === null) idleStatus();
      return;
    }
    if (r.failure.type === 'conflict') { await resolveConflict(slot); return; }
    onFailure(r.failure, slot);
  }
  // Sends a remembered delete. It never destroys a copy this device has not seen: if the server moved on, that copy comes back here.
  async function pushDelete(slot: SlotName): Promise<void> {
    if (userId === null || rec === null || rec.pendingDelete?.[slot] === undefined) return;
    if (deps.now() < pausedUntil) { setStatus({ kind: 'paused', untilMs: pausedUntil }); return; }
    setStatus({ kind: 'syncing' });
    if (rec.sent?.[slot] !== undefined) {                // an unanswered write may be what we are deleting: look first
      const l = await net.listSaves();
      if (!l.ok) { onFailure(l.failure, slot); return; }
      await settle(slot, l.value.find((x) => x.sport === sport && x.slot === slot));
    }
    const base = rec.pendingDelete?.[slot];
    if (base === undefined || base === 0) { markSynced(); return; }
    const r = await net.deleteSave(sport, slot, base);
    if (!r.ok && r.failure.type !== 'conflict') { onFailure(r.failure, slot); return; }
    const theirs = !r.ok && r.failure.type === 'conflict' ? r.failure.current : null;
    delete rec.pendingDelete![slot]; retry.delete(slot); attempts.delete(slot);
    if (theirs && !theirs.deleted) { await persist(); await resolveConflict(slot); return; }
    if (r.ok) rec.serverRev[slot] = r.value.serverRev; else if (theirs) rec.serverRev[slot] = theirs.serverRev; else delete rec.serverRev[slot];
    await persist(); markSynced();
  }
  // 409: someone else wrote since we last looked. Pull the server's metadata and apply the conflict table to this slot.
  async function resolveConflict(slot: SlotName): Promise<void> {
    for (let i = 0; i < 3; i++) {
      const l = await net.listSaves();
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
    if (local === 'unreadable' || (await isHeld(slot, local))) return 'done';           // never overwrite what we cannot read, or sync another account's save
    if (deleting.has(slot)) return 'done';
    await settle(slot, row);
    const pending = rec.pendingDelete?.[slot];
    if (pending !== undefined) {
      if (live && live.serverRev === pending) {
        if (!local) { await pushDelete(slot); return 'done'; }
        return pushWith(slot, local, pending);                                          // a newer save took the slot: it replaces the deleted one, kept as a rung-back
      }
      delete rec.pendingDelete![slot]; await persist();                                 // already gone, or the server copy moved on: the table below decides
    }
    if (!local && !live) {
      if (row && rec.serverRev[slot] !== row.serverRev) { rec.serverRev[slot] = row.serverRev; delete rec.synced?.[slot]; await persist(); }
      return 'done';
    }
    if (!local) return pulled(slot, null);
    if (!live) {
      // Deleted elsewhere since we last matched, with nothing new here: follow the delete. Otherwise push; nothing local is deleted.
      if (row && movedOnServer(slot, row.serverRev) && unchanged(slot, local.env)) return honourDelete(slot, local, row.serverRev);
      return pushWith(slot, local, row ? row.serverRev : null);
    }
    const d = decide(local.env, live);
    if (d === 'same') { rec.serverRev[slot] = live.serverRev; noteSynced(slot, local.env); dirty.delete(slot); await persist(); markSynced(); return 'done'; }
    // The server has not moved since this device last matched it, so there is nothing to resolve: what is here is newer.
    if (rec.serverRev[slot] === live.serverRev) return pushWith(slot, local, live.serverRev);
    // Nothing new here and the server moved (another device wrote, or restored an older copy): follow it, keeping ours as a rung-back.
    if (d === 'pull' || (movedOnServer(slot, live.serverRev) && unchanged(slot, local.env))) return pulled(slot, local);
    if (d === 'push') return pushWith(slot, local, live.serverRev);
    return fork(slot, local, live, remoteAll);
  }
  const pulled = async (slot: SlotName, archive: { text: string } | null): Promise<'done' | 'conflict'> => ((await pull(slot, archive)) === 'changed' ? 'conflict' : 'done');
  async function honourDelete(slot: SlotName, local: { text: string }, serverRev: number): Promise<'done' | 'conflict'> {
    if (rec === null) return 'done';
    const a = await archiveLocal(slot, local.text);
    if (!a.ok) { setStatus({ kind: 'failed', reason: 'could not keep a rung-back before removing: ' + a.error, retriable: true, slot }); return 'done'; }
    if (!(await stillHolds(slot, local.text))) return 'conflict';
    const w = await io.remove(slotKey(slot));
    if (!w.ok) { setStatus({ kind: 'failed', reason: 'could not remove the deleted save: ' + w.error, retriable: true, slot }); return 'done'; }
    rec.serverRev[slot] = serverRev; delete rec.synced?.[slot]; dirty.delete(slot); await persist(); markSynced();
    deps.onPulled?.(slot); deps.onRemoved?.(slot);
    return 'done';
  }
  const markSynced = (): void => { lastSyncedAt = deps.now(); if (st.kind === 'syncing' || st.kind === 'idle') idleStatus(); };
  async function pushWith(slot: SlotName, local: { text: string }, base: number | null, to: SlotName = slot, text = local.text): Promise<'done' | 'conflict'> {
    if (rec === null) return 'done';
    await noteSent(to, JSON.parse(text));
    const r = await net.putSave(sport, to, { envelope: JSON.parse(text), base, deviceId: rec.deviceId });
    if (r.ok) { rec.serverRev[to] = r.value.serverRev; noteSynced(to, JSON.parse(text)); dirty.delete(to); await persist(); markSynced(); return 'done'; }
    if (r.failure.type === 'conflict') return 'conflict';
    onFailure(r.failure, slot); return 'done';
  }
  // Fetch the server's copy of a slot and make it the local one. `archive` is the local save it replaces (a rung-back kept on this device), or
  // null when the target slot is expected to be empty. 'changed' = the app wrote the target while we were fetching: nothing was overwritten.
  async function pull(slot: SlotName, archive: { text: string } | null, into: SlotName = slot): Promise<{ serverRev: number; text: string } | 'changed' | null> {
    if (rec === null) return null;
    const g = await net.getSave(sport, slot);
    if (!g.ok) { onFailure(g.failure, null); return null; }                // a failed download is retried by a whole round
    if (g.value === null) return null;
    const p = parseEnvelope(g.value.envelope);
    if (!p.ok) { setStatus(p.reason === 'newer-version' ? { kind: 'newer-schema', slot } : { kind: 'failed', reason: 'the server copy of slot ' + slot + ' is not a valid save; left it alone', retriable: false, slot }); return null; }
    if (p.value.slot !== slot) { setStatus({ kind: 'failed', reason: 'the server copy of slot ' + slot + ' names another slot; left it alone', retriable: false, slot }); return null; }
    const env: Envelope = into === slot ? p.value : { ...p.value, slot: into };
    const text = into === slot ? JSON.stringify(g.value.envelope) : JSON.stringify(env);
    if (archive) { const a = await archiveLocal(slot, archive.text); if (!a.ok) { setStatus({ kind: 'failed', reason: 'could not keep a rung-back before pulling: ' + a.error, retriable: true, slot }); return null; } }
    if (!(await stillHolds(into, archive?.text ?? null))) return 'changed';
    const w = await io.write(slotKey(into), text);
    if (!w.ok) { setStatus({ kind: 'failed', reason: 'could not write the pulled save: ' + w.error, retriable: true, slot: into }); return null; }
    if (into === slot) { rec.serverRev[slot] = g.value.serverRev; noteSynced(slot, env); await persist(); markSynced(); }
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
      if (moved === 'changed') return 'conflict';
      if (moved === null) return 'done';
      const freeRow = remoteAll.find((r) => r.sport === sport && r.slot === free);
      const a = await pushWith(slot, local, freeRow ? freeRow.serverRev : null, free, moved.text);   // replicate the moved lineage under its new slot
      if (a === 'conflict') return 'conflict';
      if (rec) { rec.serverRev[slot] = live.serverRev; await persist(); }  // the incoming copy is safe here now: an interrupted write below must not copy it again
      return pushWith(slot, local, live.serverRev);                     // local lineage over the old remote one; the server archives it as a rung-back
    }
    if (at(live.savedAt) >= at(local.env.savedAt)) return pulled(slot, local);                    // remote newer: local becomes a local rung-back
    return pushWith(slot, local, live.serverRev);                                                // local newer: the server archives the remote
  }
  async function reconcileAll(): Promise<boolean> {
    for (let i = 0; i < 3; i++) {
      const l = await net.listSaves();
      if (!l.ok) { onFailure(l.failure, null); return false; }
      let again = false;
      for (const s of SLOT_NAMES) if ((await reconcileSlot(s, l.value)) === 'conflict') again = true;
      if (!again) return true;
    }
    setStatus({ kind: 'failed', reason: 'the server copy kept changing while we synced; will retry', retriable: true, slot: null }); schedulePull(backoff(++pullFails));
    return false;
  }
  // The end of a whole round that got through: report it, and start the next failure from the shortest wait.
  function settled(): void { if (st.kind === 'syncing') idleStatus(); if (st.kind === 'idle') pullFails = 0; }
  async function pullAll(): Promise<void> {
    if (userId === null || rec === null || pendingUser !== null) return;
    await enqueue(async () => {
      if (userId === null) return;
      if (deps.now() < pausedUntil) { setStatus({ kind: 'paused', untilMs: pausedUntil }); return; }
      setStatus({ kind: 'syncing' });
      if (await reconcileAll()) { await sendRuns(); settled(); }
    }, undefined);
  }

  // ---- runs: every finished season (statsRecorded) not yet reported; the server ignores a repeat ----
  async function sendRuns(): Promise<void> {
    if (rec === null) return;
    const fresh: { key: string; env: Envelope }[] = [];
    for (const s of SLOT_NAMES) {
      const l = await readLocal(s);
      if (l === null || l === 'unreadable' || l.env.kind !== 'season' || (await isHeld(s, l))) continue;
      const p = l.env.payload as { statsRecorded?: unknown; run?: unknown };
      if (p.statsRecorded !== true) continue;
      const key = l.env.saveId + ':' + (Number.isInteger(p.run) ? String(p.run) : '0');
      if (!rec.runsSent.includes(key)) fresh.push({ key, env: l.env });
    }
    if (!fresh.length) return;
    for (let i = 0; i < fresh.length; i += 50) {
      const batch = fresh.slice(i, i + 50);
      const r = await net.postRuns(batch.map((b) => b.env));
      if (r.ok) { rec.runsSent.push(...batch.map((b) => b.key)); await persist(); continue; }
      if (r.failure.type !== 'rejected' || batch.length === 1) { onFailure(r.failure, null); if (r.failure.type !== 'rejected') return; continue; }
      // One bad season must not block the good ones: retry the batch one by one; the bad one stays unsent and shows a failed chip.
      for (const b of batch) {
        const one = await net.postRuns([b.env]);
        if (one.ok) { rec.runsSent.push(b.key); await persist(); } else { onFailure(one.failure, null); if (one.failure.type !== 'rejected') return; }
      }
    }
  }

  // ---- public surface ----
  async function startSession(uid: string, only: SlotName[] | null): Promise<SignInResult> {
    if (rec === null) rec = { version: 1, userId: uid, deviceId: deps.newId(), serverRev: {}, runsSent: [] };
    else if (rec.userId !== uid) {
      // An explicit adopt. The old account's revs mean nothing to the new one, and every save not listed is held back from it.
      const held: Partial<Record<SlotName, string>> = {};
      for (const s of SLOT_NAMES) { if (only?.includes(s)) continue; const l = await readLocal(s, deps.storage); if (l !== null && l !== 'unreadable') held[s] = l.env.saveId; }
      rec = { version: 1, userId: uid, deviceId: rec.deviceId, serverRev: {}, runsSent: [], held };
    }
    userId = uid; pendingUser = null;
    deps.transport.expectUser?.(uid);
    await persist(deps.storage);
    return enqueue<SignInResult>(async () => {
      setStatus({ kind: 'syncing' });
      const ok = await reconcileAll();
      if (!ok) return { kind: 'failed' as const, reason: st.kind === 'failed' ? st.reason : st.kind === 'paused' ? 'sync is paused' : 'sign-in sync failed' };
      await sendRuns();
      settled();
      return st.kind === 'failed' ? { kind: 'failed' as const, reason: st.reason } : { kind: 'ok' as const };
    }, { kind: 'failed', reason: 'the account changed while signing in' });
  }

  // ---- calls the user asks for (history, restore, stats, shares): they answer with a Result instead of retrying later ----
  const err = (error: string): { ok: false; error: string } => ({ ok: false, error });
  function failed(f: Failure): { ok: false; error: string } {
    if (f.type === 'unauthenticated' || f.type === 'paused') onFailure(f, null);
    switch (f.type) {
      case 'unauthenticated': return err('sign in first');
      case 'paused': return err('sync is paused until the daily limit resets');
      case 'conflict': return err('the server copy changed; look again');
      default: return err(f.message);
    }
  }
  const answer = <T>(r: TResult<T>): Result<T> => (r.ok ? { ok: true, value: r.value } : failed(r.failure));
  function onDemand<T>(f: () => Promise<Result<T>>): Promise<Result<T>> {
    return enqueue<Result<T>>(async () => {
      if (userId === null || rec === null || pendingUser !== null) return err('sign in first');
      if (deps.now() < pausedUntil) return err('sync is paused until the daily limit resets');
      return f();
    }, err('sign in first'));
  }
  const HELD = 'this save belongs to another account on this device';
  // Reconciles one slot and confirms that this device and the server now agree about it.
  async function bringUpToDate(slot: SlotName): Promise<Result<{ row: RemoteMeta | null; local: { text: string; env: Envelope } | null }>> {
    const behind = err('could not bring this slot up to date first; try again');
    const before = await net.listSaves();
    if (!before.ok) return failed(before.failure);
    const held = await readLocal(slot);
    if (await isHeld(slot, held)) return err(HELD);
    await reconcileSlot(slot, before.value);
    if (userId === null || rec === null) return err('sign in first');
    const after = await net.listSaves();
    if (!after.ok) return failed(after.failure);
    const row = after.value.find((r) => r.sport === sport && r.slot === slot) ?? null;
    const local = await readLocal(slot);
    if (local === 'unreadable' || rec.pendingDelete?.[slot] !== undefined) return behind;
    if (row === null) return local === null ? { ok: true, value: { row, local } } : behind;
    if (rec.serverRev[slot] !== row.serverRev || (row.deleted ? local !== null : local === null || !unchanged(slot, local.env))) return behind;
    return { ok: true, value: { row, local } };
  }

  return {
    async signIn(uid) {
      if (uid !== userId) { newSession(); userId = null; }
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
      newSession(); userId = null; pendingUser = null; dirty.clear();
      for (const h of debounce.values()) deps.clearTimer(h); debounce.clear();
      for (const r of retry.values()) deps.clearTimer(r.h); retry.clear(); attempts.clear(); pullFails = 0;
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
      void requestPush(slot).then(() => (reason === 'elimination' && userId !== null ? enqueue(sendRuns, undefined) : undefined));
    },
    notifyDeleted(slot) {
      if (userId === null || rec === null || pendingUser !== null) return;   // never recorded for an account that is not the one signed in
      dirty.delete(slot);
      const h = debounce.get(slot); if (h !== undefined) { deps.clearTimer(h); debounce.delete(slot); }
      const t = retry.get(slot); if (t) { deps.clearTimer(t.h); retry.delete(slot); }
      attempts.delete(slot); deleting.add(slot);
      void enqueue(async () => {                          // after any push already running, so the base is the newest one we wrote
        deleting.delete(slot);
        if (userId === null || rec === null) return;
        delete rec.synced?.[slot];
        const base = rec.serverRev[slot] ?? (rec.sent?.[slot] !== undefined ? 0 : undefined);
        if (base !== undefined) (rec.pendingDelete ??= {})[slot] = base;   // never seen on the server: there is nothing of ours to delete
        await persist();
        await pushSlot(slot);
      }, undefined);
    },
    heldSlots: () => (userId === null ? [] : SLOT_NAMES.filter((s) => rec?.held?.[s] !== undefined)),
    serverHistory: (slot) => onDemand(async () => answer(await net.listHistory(sport, slot))),
    restoreFromServer: (slot, archivedSeq) => onDemand<void>(async () => {
      const now = await bringUpToDate(slot);
      if (!now.ok) return now;
      const r = await net.restoreSave(sport, slot, { archivedSeq, base: now.value.row?.serverRev ?? null });
      if (!r.ok) return failed(r.failure);
      const p = await pull(slot, now.value.local);
      return p === null || p === 'changed' ? err('restored on the server; this device could not take it yet') : { ok: true, value: undefined };
    }),
    stats: () => onDemand(async () => {
      await sendRuns();
      return userId === null ? err('sign in first') : answer(await net.getStats());
    }),
    shareSave: (slot) => onDemand(async () => {
      const now = await bringUpToDate(slot);
      if (!now.ok) return now;
      if (now.value.local === null) return err('there is no save in this slot');
      return answer(await net.createShare({ sport, kind: 'save', slot }));
    }),
    shareRun: (saveId, run) => onDemand(async () => {
      await sendRuns();
      return userId === null ? err('sign in first') : answer(await net.createShare({ sport, kind: 'run', saveId, run }));
    }),
    revokeShare: (id) => onDemand<void>(async () => { const r = await net.revokeShare(id); return r.ok ? { ok: true, value: undefined } : failed(r.failure); }),
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
