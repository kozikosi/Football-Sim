// A fake server that follows the contract's compare-and-swap rules (server_rev + base), and a manual clock. No network.
import type { StorageModule } from '../../src/core/app.ts';
import { serialize } from '../../src/core/envelope.ts';
import type { SlotName } from '../../src/core/envelope.ts';
import type { Failure, HistoryEntry, RemoteMeta, ShareLink, ShareRequest, SharedSnapshot, SyncTransport, TResult } from '../../src/sync/types.ts';

export const T0 = Date.parse('2026-11-23T12:00:00.000Z');
export function env(slot: SlotName, saveId: string, rev: number, savedAtMs = T0, kind: 'draft' | 'season' = 'draft', extra: Record<string, unknown> = {}): string {
  const meta = { engineVersion: 'e1', dataVersion: 'sha256:' + 'a'.repeat(64), saveId, saveRevision: rev, createdAt: new Date(T0).toISOString() };
  return serialize('nfl', kind, slot, meta, kind === 'season' ? { statsRecorded: true, run: 0, ...extra } : { ...extra }, new Date(savedAtMs));
}
export function memStorage(init: Record<string, string> = {}): StorageModule & { data: Map<string, string> } {
  const data = new Map(Object.entries(init));
  return {
    data,
    read: async (k) => ({ ok: true, value: data.get(k) ?? null }),
    write: async (k, t) => { data.set(k, t); return { ok: true, value: undefined }; },
    remove: async (k) => { data.delete(k); return { ok: true, value: undefined }; },
    keys: async (p) => ({ ok: true, value: [...data.keys()].filter((k) => k.startsWith(p)).sort() }),
    entries: async (p) => ({ ok: true, value: [...data.entries()].filter(([k]) => k.startsWith(p)).sort() }),
  };
}
export class Clock {
  t = T0; private id = 0; timers = new Map<number, { at: number; fn: () => void }>();
  now = (): number => this.t;
  setTimer = (fn: () => void, ms: number): unknown => { const id = ++this.id; this.timers.set(id, { at: this.t + ms, fn }); return id; };
  clearTimer = (h: unknown): void => { this.timers.delete(h as number); };
  async advance(ms: number): Promise<void> {
    const end = this.t + ms;
    for (;;) {
      const due = [...this.timers.entries()].filter(([, v]) => v.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!due) break;
      this.timers.delete(due[0]); this.t = Math.max(this.t, due[1].at); due[1].fn();
      for (let i = 0; i < 20; i++) await Promise.resolve();
    }
    this.t = end;
  }
}
interface Row { serverRev: number; envelope: any; deleted: boolean; history: any[] }
const copy = <T>(x: T): T => JSON.parse(JSON.stringify(x));
export class FakeServer implements SyncTransport {
  rows = new Map<string, Row>(); runs = new Map<string, unknown>(); calls: string[] = []; failures: Failure[] = [];
  offline = false; puts: { slot: string; base: number | null }[] = []; deletes: { slot: string; base: number }[] = [];
  /** Runs inside the next call of that name, before it answers: stands for the app writing while a request is in flight. */
  during = new Map<string, () => void>();
  shares: { id: string; req: unknown; revoked: boolean }[] = [];
  seed(slot: SlotName, text: string, serverRev = 1, deleted = false): void { this.rows.set(slot, { serverRev, envelope: JSON.parse(text), deleted, history: [] }); }
  private gate<T>(name: string): TResult<T> | null {
    this.calls.push(name);
    const hook = this.during.get(name); if (hook) { this.during.delete(name); hook(); }
    if (this.offline) return { ok: false, failure: { type: 'transient', message: 'offline' } };
    const f = this.failures.shift(); return f ? { ok: false, failure: f } : null;
  }
  private meta(slot: string, r: Row): RemoteMeta { return { slot, sport: 'nfl', saveId: r.envelope.saveId, saveRevision: r.envelope.saveRevision, serverRev: r.serverRev, kind: r.envelope.kind, savedAt: r.envelope.savedAt, deleted: r.deleted }; }
  async listSaves(): Promise<TResult<RemoteMeta[]>> { const g = this.gate<RemoteMeta[]>('list'); if (g) return g; return { ok: true, value: [...this.rows].map(([s, r]) => this.meta(s, r)) }; }
  async getSave(_sp: 'nfl', slot: SlotName): Promise<TResult<{ serverRev: number; envelope: unknown } | null>> {
    const g = this.gate<{ serverRev: number; envelope: unknown } | null>('get ' + slot); if (g) return g;
    const r = this.rows.get(slot); return { ok: true, value: !r || r.deleted ? null : { serverRev: r.serverRev, envelope: JSON.parse(JSON.stringify(r.envelope)) } };
  }
  async putSave(_sp: 'nfl', slot: SlotName, req: { envelope: unknown; base: number | null; deviceId: string }): Promise<TResult<{ serverRev: number; archived: boolean }>> {
    const g = this.gate<{ serverRev: number; archived: boolean }>('put ' + slot); if (g) return g;
    this.puts.push({ slot, base: req.base });
    const cur = this.rows.get(slot), e = req.envelope as any;
    if (!cur) { if (req.base !== null) return { ok: false, failure: { type: 'conflict', current: null } }; this.rows.set(slot, { serverRev: 1, envelope: e, deleted: false, history: [] }); return { ok: true, value: { serverRev: 1, archived: false } }; }
    if (req.base !== cur.serverRev) return { ok: false, failure: { type: 'conflict', current: this.meta(slot, cur) } };
    const archive = !cur.deleted && (cur.envelope.saveId !== e.saveId || e.saveRevision <= cur.envelope.saveRevision);
    if (archive) cur.history.push(cur.envelope);
    cur.envelope = e; cur.serverRev++; cur.deleted = false;
    return { ok: true, value: { serverRev: cur.serverRev, archived: archive } };
  }
  async deleteSave(_sp: 'nfl', slot: SlotName, base: number): Promise<TResult<{ serverRev: number }>> {
    const g = this.gate<{ serverRev: number }>('delete ' + slot); if (g) return g;
    this.deletes.push({ slot, base });
    const cur = this.rows.get(slot);
    if (!cur || cur.serverRev !== base) return { ok: false, failure: { type: 'conflict', current: cur ? this.meta(slot, cur) : null } };
    if (!cur.deleted) { cur.history.push(copy(cur.envelope)); cur.deleted = true; cur.serverRev++; }
    return { ok: true, value: { serverRev: cur.serverRev } };
  }
  async listHistory(_sp: 'nfl', slot: SlotName): Promise<TResult<HistoryEntry[]>> {
    const g = this.gate<HistoryEntry[]>('history ' + slot); if (g) return g;
    const h = this.rows.get(slot)?.history ?? [];
    return { ok: true, value: h.map((e: any, i: number) => ({ archivedSeq: i + 1, saveId: e.saveId, saveRevision: e.saveRevision, reason: 'conflict-lost', archivedAt: new Date(T0).toISOString() })).reverse() };
  }
  async restoreSave(_sp: 'nfl', slot: SlotName, req: { archivedSeq: number; base: number | null }): Promise<TResult<{ serverRev: number }>> {
    const g = this.gate<{ serverRev: number }>('restore ' + slot); if (g) return g;
    const cur = this.rows.get(slot), e = cur?.history[req.archivedSeq - 1];
    if (!cur || !e) return { ok: false, failure: { type: 'rejected', status: 404, code: 'not-found', message: 'no such rung-back' } };
    if (req.base !== cur.serverRev) return { ok: false, failure: { type: 'conflict', current: this.meta(slot, cur) } };
    if (!cur.deleted) cur.history.push(copy(cur.envelope));
    cur.envelope = copy(e); cur.serverRev++; cur.deleted = false;
    return { ok: true, value: { serverRev: cur.serverRev } };
  }
  async getStats(): Promise<TResult<Record<string, unknown>>> {
    const g = this.gate<Record<string, unknown>>('stats'); if (g) return g;
    return { ok: true, value: { runs: this.runs.size } };
  }
  async createShare(req: ShareRequest): Promise<TResult<ShareLink>> {
    const g = this.gate<ShareLink>('share'); if (g) return g;
    const id = 'share-' + (this.shares.length + 1);
    const snapshot = req.kind === 'save' ? copy(this.rows.get(req.slot)?.envelope ?? null) : null;
    this.shares.push({ id, req: { ...req, snapshot }, revoked: false });
    return { ok: true, value: { id, token: 'tok-' + id, expiresAt: new Date(T0 + 90 * 86400000).toISOString() } };
  }
  async revokeShare(id: string): Promise<TResult<{ revoked: true }>> {
    const g = this.gate<{ revoked: true }>('unshare ' + id); if (g) return g;
    const s = this.shares.find((x) => x.id === id && !x.revoked);
    if (!s) return { ok: false, failure: { type: 'rejected', status: 404, code: 'not-found', message: 'no such share' } };
    s.revoked = true; return { ok: true, value: { revoked: true } };
  }
  async getShare(token: string): Promise<TResult<SharedSnapshot | null>> {
    const g = this.gate<SharedSnapshot | null>('shared'); if (g) return g;
    const s = this.shares.find((x) => 'tok-' + x.id === token);
    return { ok: true, value: s ? { kind: 'save', sport: 'nfl', createdAt: new Date(T0).toISOString(), snapshot: (s.req as any).snapshot } : null };
  }
  async postRuns(envelopes: unknown[]): Promise<TResult<{ inserted: number; ignored: number }>> {
    const g = this.gate<{ inserted: number; ignored: number }>('runs'); if (g) return g;
    let inserted = 0; for (const x of envelopes as any[]) { const k = x.saveId + ':' + x.payload.run; if (!this.runs.has(k)) { this.runs.set(k, x); inserted++; } }
    return { ok: true, value: { inserted, ignored: envelopes.length - inserted } };
  }
}
