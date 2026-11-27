// The device's sync record (contract section 9): stored OUTSIDE the envelopes under sim:nfl:sync.
// Which account last synced here, a stable id for this browser profile, and the server_rev we last saw per slot.
import type { StorageModule } from '../core/app.ts';
import type { SlotName, SportId } from '../core/envelope.ts';
import { sportKey } from '../core/keys.ts';

export interface SyncRecord {
  version: 1; userId: string; deviceId: string; serverRev: Partial<Record<SlotName, number>>; runsSent: string[];
  /** Fingerprint of the local save as of the last time it matched the server: tells "unchanged here" from "new progress here". */
  synced?: Partial<Record<SlotName, string>>;
  /** A delete not yet accepted by the server: the base it must be sent with. */
  pendingDelete?: Partial<Record<SlotName, number>>;
  /** Slots whose save belongs to an earlier account and was not imported: the saveId that must never be synced into this one. */
  held?: Partial<Record<SlotName, string>>;
}
export const RUNS_SENT_MAX = 400;
export const recordKey = (sport: SportId): string => sportKey(sport, 'sync');

function perSlot<T>(m: any, ok: (v: unknown) => v is T): Partial<Record<SlotName, T>> {
  const out: Partial<Record<SlotName, T>> = {};
  for (const s of ['A', 'B', 'C'] as const) { const v = m?.[s]; if (ok(v)) out[s] = v; }
  return out;
}

export async function loadRecord(storage: StorageModule, sport: SportId): Promise<SyncRecord | null> {
  const r = await storage.read(recordKey(sport));
  if (!r.ok || r.value === null) return null;
  try {
    const j = JSON.parse(r.value);
    if (j?.version !== 1 || typeof j.userId !== 'string' || typeof j.deviceId !== 'string' || typeof j.serverRev !== 'object' || j.serverRev === null) return null;
    const revs = (m: any): Partial<Record<SlotName, number>> => perSlot(m, (v): v is number => Number.isInteger(v) && (v as number) >= 1);
    const texts = (m: any): Partial<Record<SlotName, string>> => perSlot(m, (v): v is string => typeof v === 'string');
    return {
      version: 1, userId: j.userId, deviceId: j.deviceId, serverRev: revs(j.serverRev), runsSent: Array.isArray(j.runsSent) ? j.runsSent.filter((x: unknown) => typeof x === 'string') : [],
      synced: texts(j.synced), pendingDelete: revs(j.pendingDelete), held: texts(j.held),
    };
  } catch { return null; }
}
export async function saveRecord(storage: StorageModule, sport: SportId, rec: SyncRecord): Promise<boolean> {
  const out: SyncRecord = { ...rec, runsSent: rec.runsSent.slice(-RUNS_SENT_MAX) };
  return (await storage.write(recordKey(sport), JSON.stringify(out))).ok;
}
