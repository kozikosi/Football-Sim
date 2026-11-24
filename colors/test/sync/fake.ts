// A fake server that follows the contract's compare-and-swap rules (server_rev + base), and a manual clock. No network.
import type { StorageModule } from '../../src/core/app.ts';
import { serialize } from '../../src/core/envelope.ts';
import type { SlotName } from '../../src/core/envelope.ts';
import type { Failure, RemoteMeta, SyncTransport, TResult } from '../../src/sync/types.ts';

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
export class FakeServer implements SyncTransport {
  rows = new Map<string, Row>(); runs = new Map<string, unknown>(); calls: string[] = []; failures: Failure[] = [];
  offline = false; puts: { slot: string; base: number | null }[] = [];
  seed(slot: SlotName, text: string, serverRev = 1, deleted = false): void { this.rows.set(slot, { serverRev, envelope: JSON.parse(text), deleted, history: [] }); }
  private gate<T>(name: string): TResult<T> | null {
    this.calls.push(name);
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
  async postRuns(envelopes: unknown[]): Promise<TResult<{ inserted: number; ignored: number }>> {
    const g = this.gate<{ inserted: number; ignored: number }>('runs'); if (g) return g;
    let inserted = 0; for (const x of envelopes as any[]) { const k = x.saveId + ':' + x.payload.run; if (!this.runs.has(k)) { this.runs.set(k, x); inserted++; } }
    return { ok: true, value: { inserted, ignored: envelopes.length - inserted } };
  }
}
