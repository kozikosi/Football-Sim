// fetch-based SyncTransport. Every status is classified here (contract section 4 status table) so sync.ts never sees a status code.
import type { SlotName, SportId } from '../core/envelope.ts';
import type { HistoryEntry, PutRequest, RemoteMeta, SharedSnapshot, ShareLink, ShareRequest, Stats, SyncTransport, TResult } from './types.ts';

export const API_VERSION = '1';
const KEEPALIVE_MAX = 60_000;   // browsers cap keepalive bodies at 64 KB

interface CallOpts<T> { body?: unknown; keepalive?: boolean; on404?: T; parse(json: any): T | undefined }

export function createFetchTransport(fetchFn: typeof fetch, baseUrl = ''): SyncTransport {
  async function call<T>(method: string, path: string, o: CallOpts<T>): Promise<TResult<T>> {
    const text = o.body === undefined ? undefined : JSON.stringify(o.body);
    let res: Response;
    try {
      const init: RequestInit = { method, credentials: 'same-origin' };
      if (text !== undefined) { init.body = text; init.headers = { 'content-type': 'application/json' }; if (o.keepalive === true && text.length < KEEPALIVE_MAX) init.keepalive = true; }
      res = await fetchFn(baseUrl + path, init);
    } catch (e) { return { ok: false, failure: { type: 'transient', message: e instanceof Error ? e.message : 'network error' } }; }
    let json: any = null;
    try { json = await res.json(); } catch { /* an HTML error page or an empty body */ }
    const s = res.status;
    const v = res.headers.get('x-api-version');
    if (v !== null && v !== API_VERSION) return { ok: false, failure: { type: 'rejected', status: s, code: 'api-version', message: 'the server speaks api ' + v + ' and this page speaks ' + API_VERSION + '; reload the page' } };
    const ra = Number(res.headers.get('retry-after') ?? '');
    const retryAfterSec = Number.isFinite(ra) && ra > 0 ? ra : undefined;
    const code = typeof json?.error === 'string' ? json.error : 'http-' + s;
    const message = typeof json?.message === 'string' ? json.message : 'http ' + s;
    if (s >= 200 && s < 300) {
      const value = o.parse(json);
      return value === undefined ? { ok: false, failure: { type: 'rejected', status: s, code: 'bad-body', message: 'the server reply was malformed' } } : { ok: true, value };
    }
    if (s === 404 && o.on404 !== undefined) return { ok: true, value: o.on404 };
    if (s === 409) return { ok: false, failure: { type: 'conflict', current: (json?.current ?? null) as RemoteMeta | null } };
    if (s === 401) return { ok: false, failure: { type: 'unauthenticated' } };
    if (s === 503 && code === 'sync-paused') return { ok: false, failure: { type: 'paused', retryAfterSec: retryAfterSec ?? 3600 } };
    if (s >= 500 || (s === 429 && code !== 'cap')) return { ok: false, failure: retryAfterSec === undefined ? { type: 'transient', message } : { type: 'transient', message, retryAfterSec } };
    return { ok: false, failure: { type: 'rejected', status: s, code, message } };   // 413, 422, 426, 429 cap, other 4xx: stop and surface
  }
  const rev = (j: any): { serverRev: number } | undefined => (typeof j?.serverRev === 'number' ? { serverRev: j.serverRev as number } : undefined);
  // The history route answers with the table's column names.
  const history = (j: any): HistoryEntry[] | undefined => (Array.isArray(j?.history)
    ? j.history.map((h: any) => ({ archivedSeq: Number(h.archived_seq), saveId: String(h.save_id), saveRevision: Number(h.save_revision), reason: String(h.reason), archivedAt: String(h.archived_at) }))
    : undefined);
  return {
    deleteSave: (sport: SportId, slot: SlotName, base: number) => call<{ serverRev: number }>('DELETE', `/api/saves/${sport}/${slot}`, { body: { base }, parse: rev }),
    listHistory: (sport: SportId, slot: SlotName) => call<HistoryEntry[]>('GET', `/api/saves/${sport}/${slot}/history`, { parse: history }),
    restoreSave: (sport: SportId, slot: SlotName, req) => call<{ serverRev: number }>('POST', `/api/saves/${sport}/${slot}/restore`, { body: req, parse: rev }),
    getStats: () => call<Stats>('GET', '/api/stats', { parse: (j) => (typeof j?.runs === 'number' ? (j as Stats) : undefined) }),
    createShare: (req: ShareRequest) => call<ShareLink>('POST', '/api/shares', {
      body: req, parse: (j) => (typeof j?.id === 'string' && typeof j.token === 'string' ? { id: j.id as string, token: j.token as string, expiresAt: String(j.expiresAt) } : undefined),
    }),
    revokeShare: (id: string) => call<{ revoked: true }>('DELETE', '/api/shares/' + encodeURIComponent(id), { parse: (j) => (j?.revoked === true ? { revoked: true as const } : undefined) }),
    getShare: (token: string) => call<SharedSnapshot | null>('GET', '/api/share/' + encodeURIComponent(token), {
      on404: null, parse: (j) => (typeof j?.kind === 'string' && j.snapshot !== undefined ? (j as SharedSnapshot) : undefined),
    }),
    listSaves: () => call<RemoteMeta[]>('GET', '/api/saves', { parse: (j) => (Array.isArray(j?.saves) ? (j.saves as RemoteMeta[]) : undefined) }),
    getSave: (sport: SportId, slot: SlotName) => call<{ serverRev: number; envelope: unknown } | null>('GET', `/api/saves/${sport}/${slot}`, {
      on404: null, parse: (j) => (typeof j?.serverRev === 'number' && j.envelope !== undefined ? { serverRev: j.serverRev as number, envelope: j.envelope as unknown } : undefined),
    }),
    putSave: (sport: SportId, slot: SlotName, req: PutRequest, opts) => call<{ serverRev: number; archived: boolean }>('PUT', `/api/saves/${sport}/${slot}`, {
      body: req, keepalive: opts?.keepalive === true, parse: (j) => (typeof j?.serverRev === 'number' ? { serverRev: j.serverRev as number, archived: j.archived === true } : undefined),
    }),
    postRuns: (envelopes: unknown[]) => call<{ inserted: number; ignored: number }>('POST', '/api/runs', {
      body: { envelopes }, parse: (j) => (typeof j?.inserted === 'number' ? { inserted: j.inserted as number, ignored: Number(j.ignored ?? 0) } : undefined),
    }),
  };
}
