// The device's sync record (contract section 9): stored OUTSIDE the envelopes under sim:nfl:sync.
// Which account last synced here, a stable id for this browser profile, and the server_rev we last saw per slot.
import type { StorageModule } from '../core/app.ts';
import type { SlotName, SportId } from '../core/envelope.ts';
import { sportKey } from '../core/keys.ts';

export interface SyncRecord { version: 1; userId: string; deviceId: string; serverRev: Partial<Record<SlotName, number>>; runsSent: string[] }
export const RUNS_SENT_MAX = 400;
export const recordKey = (sport: SportId): string => sportKey(sport, 'sync');

export async function loadRecord(storage: StorageModule, sport: SportId): Promise<SyncRecord | null> {
  const r = await storage.read(recordKey(sport));
  if (!r.ok || r.value === null) return null;
  try {
    const j = JSON.parse(r.value);
    if (j?.version !== 1 || typeof j.userId !== 'string' || typeof j.deviceId !== 'string' || typeof j.serverRev !== 'object' || j.serverRev === null) return null;
    const serverRev: Partial<Record<SlotName, number>> = {};
    for (const s of ['A', 'B', 'C'] as const) if (Number.isInteger(j.serverRev[s]) && j.serverRev[s] >= 1) serverRev[s] = j.serverRev[s];
    return { version: 1, userId: j.userId, deviceId: j.deviceId, serverRev, runsSent: Array.isArray(j.runsSent) ? j.runsSent.filter((x: unknown) => typeof x === 'string') : [] };
  } catch { return null; }
}
export async function saveRecord(storage: StorageModule, sport: SportId, rec: SyncRecord): Promise<boolean> {
  const out: SyncRecord = { ...rec, runsSent: rec.runsSent.slice(-RUNS_SENT_MAX) };
  return (await storage.write(recordKey(sport), JSON.stringify(out))).ok;
}
