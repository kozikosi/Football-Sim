// Client side of account sync (contract: claude/account-sync-contract-2026-11-21.md sections 5 and 9).
// This directory imports core/ (envelope shape, keys, StorageModule) and nothing from sports/. It owns no UI and no engine rule.
// Wire names are the server's (server/src/api.ts): serverRev, archivedSeq, deviceId, current.
import type { SlotName, SportId } from '../core/envelope.ts';

export interface RemoteMeta { slot: string; sport: string; saveId: string; saveRevision: number; serverRev: number; kind: string; savedAt: string; deleted: boolean }

// Every way a call can fail, already classified so the sync logic never reads a status code.
export type Failure =
  | { type: 'conflict'; current: RemoteMeta | null }                       // 409: our base was stale
  | { type: 'unauthenticated' }                                            // 401: signed out
  | { type: 'paused'; retryAfterSec: number }                              // 503 sync-paused: daily free limit, play on locally
  | { type: 'transient'; message: string; retryAfterSec?: number }         // network error, 5xx, rate cap: retry with backoff
  | { type: 'rejected'; status: number; code: string; message: string };   // other 4xx (413, 422, 426, 429 cap, 404 route): stop and surface
export type TResult<T> = { ok: true; value: T } | { ok: false; failure: Failure };

export interface PutRequest { envelope: unknown; base: number | null; deviceId: string }
export interface SyncTransport {
  listSaves(): Promise<TResult<RemoteMeta[]>>;
  /** value null = the server has no such save (404). */
  getSave(sport: SportId, slot: SlotName): Promise<TResult<{ serverRev: number; envelope: unknown } | null>>;
  putSave(sport: SportId, slot: SlotName, req: PutRequest, opts?: { keepalive?: boolean }): Promise<TResult<{ serverRev: number; archived: boolean }>>;
  postRuns(envelopes: unknown[]): Promise<TResult<{ inserted: number; ignored: number }>>;
}

// What the chip next to the save status shows. 'failed' mirrors core SaveStatus's failed (retriable says whether we will try again).
export type SyncStatus =
  | { kind: 'off'; reason: 'signed-out' | 'never-signed-in' }
  | { kind: 'idle'; lastSyncedAt: number | null }
  | { kind: 'syncing' }
  | { kind: 'failed'; reason: string; retriable: boolean; slot: SlotName | null }
  | { kind: 'paused'; untilMs: number }                                    // sync-paused: keep playing, we retry after the server's Retry-After
  | { kind: 'needs-account-choice' }                                       // saves on this device belong to another account
  | { kind: 'newer-schema'; slot: SlotName };                              // a copy from a newer build exists; we never overwrite it

export type SaveReason = 'draft-end' | 'week' | 'elimination' | 'edit';
export type SignInResult = { kind: 'ok' } | { kind: 'needs-account-choice'; deviceUserId: string } | { kind: 'failed'; reason: string };
export type AccountChoice = { action: 'keep-separate' } | { action: 'adopt'; slots: SlotName[] };

export interface SyncDeps {
  storage: import('../core/app.ts').StorageModule;
  transport: SyncTransport;
  now(): number;
  setTimer(fn: () => void, ms: number): unknown;
  clearTimer(handle: unknown): void;
  newId(): string;
  sport?: SportId;
  /** Called after a pulled envelope replaced a local slot, so the UI can re-hydrate it. */
  onPulled?(slot: SlotName): void;
}
