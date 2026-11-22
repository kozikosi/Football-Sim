// The Worker's request handler (contract section 4). Pure over (Request, Env, auth): no globals, so tests drive it directly.
// `auth` returns the signed-in user id or null. Better Auth is wired to it at the rehearsal; /api/auth/* is not handled here.
import type { D1Like } from './d1.ts';
import { restore } from '../../colors/src/sports/nfl/app/saves.ts';
import type { SeasonEnvelope } from '../../colors/src/sports/nfl/app/saves.ts';
import { SPORT_IDS, SLOT_NAMES } from '../../colors/src/core/envelope.ts';
import { deriveRun } from './derive.ts';
import { MAX_ACTIVE_SHARES, MAX_RUNS, scopedDb, shareByTokenHash } from './store.ts';
import type { Scoped, WriteResult } from './store.ts';

export interface Env { DB: D1Like }
export type Auth = (req: Request) => Promise<string | null>;
export const API_VERSION = '1';
export const MAX_ENVELOPE_BYTES = 256 * 1024;
export const MAX_BODY_BYTES = MAX_ENVELOPE_BYTES + 4096;
export const MAX_RUN_BATCH = 50;
const SHARE_DAYS = 90;

const enc = new TextEncoder();
const reply = (status: number, body: unknown, extra: Record<string, string> = {}): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'x-api-version': API_VERSION, 'cache-control': 'no-store', ...extra } });
const err = (status: number, code: string, message: string, extra: Record<string, unknown> = {}): Response => reply(status, { error: code, message, ...extra });
const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);
const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
async function sha256Hex(s: string): Promise<string> { return hex(new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)))); }

// D1 on the free plan returns these after the daily limit (contract section 7): play continues locally, sync pauses until midnight UTC.
function isFreeLimit(e: unknown): boolean { return e instanceof Error && /exceeded D1's free tier daily row (read|write) limit/i.test(e.message); }

async function readJson(req: Request): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; res: Response }> {
  const len = Number(req.headers.get('content-length') ?? '0');
  if (len > MAX_BODY_BYTES) return { ok: false, res: err(413, 'too-large', 'request body is too large') };
  const text = await req.text();
  if (enc.encode(text).length > MAX_BODY_BYTES) return { ok: false, res: err(413, 'too-large', 'request body is too large') };
  let body: unknown;
  try { body = JSON.parse(text); } catch { return { ok: false, res: err(422, 'invalid', 'body is not JSON') }; }
  if (!isObj(body)) return { ok: false, res: err(422, 'invalid', 'body must be a JSON object') };
  return { ok: true, body };
}
const baseOf = (v: unknown): number | null | undefined => (v === null ? null : typeof v === 'number' && Number.isInteger(v) && v >= 1 ? v : undefined);
const writeReply = (r: WriteResult): Response => (r.ok ? reply(200, { serverRev: r.serverRev, archived: r.archived }) : err(409, 'conflict', 'the server copy changed since you last saw it', { current: r.current }));

export async function handle(req: Request, env: Env, auth: Auth, now: Date = new Date()): Promise<Response> {
  try { return await route(req, env, auth, now); }
  catch (e) {
    if (isFreeLimit(e)) return reply(503, { error: 'sync-paused', message: 'sync is paused until midnight UTC; keep playing, your saves are on this device' }, { 'retry-after': String(secondsToMidnightUtc(now)) });
    return err(500, 'internal', 'unexpected error');
  }
}
const secondsToMidnightUtc = (n: Date): number => Math.max(60, Math.ceil((Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() + 1) - n.getTime()) / 1000));

async function route(req: Request, env: Env, auth: Auth, nowD: Date): Promise<Response> {
  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);       // ['api', ...]
  if (parts[0] !== 'api') return err(404, 'not-found', 'unknown route');
  const now = nowD.toISOString();
  const m = req.method;

  if (parts[1] === 'health' && parts.length === 2 && m === 'GET') return reply(200, { ok: true, apiVersion: API_VERSION });

  // Public, read-only, by token. Any other method on this path is refused outright (contract test 3).
  if (parts[1] === 'share' && parts.length === 3) {
    if (m !== 'GET') return err(403, 'read-only', 'shared links are read-only');
    const row = await shareByTokenHash(env.DB, await sha256Hex(parts[2]));
    if (!row) return err(404, 'not-found', 'no such link');
    if (row.revoked_at !== null || (row.expires_at !== null && row.expires_at <= now)) return err(410, 'gone', 'this link was revoked or has expired');
    return reply(200, { kind: row.kind, sport: row.sport, createdAt: row.created_at, snapshot: JSON.parse(row.snapshot) });
  }
  if (parts[1] === 'auth') return err(501, 'auth-not-wired', 'handle() does not serve /api/auth; src/worker.ts routes it to Better Auth');

  const userId = await auth(req);
  if (userId === null) return err(401, 'unauthenticated', 'sign in to sync');
  const db = scopedDb(env.DB, userId);

  if (parts[1] === 'saves') {
    if (parts.length === 2 && m === 'GET') return reply(200, { saves: await db.listSaves() });
    const sport = parts[2], slot = parts[3];
    if (parts.length >= 4 && (!(SPORT_IDS as readonly string[]).includes(sport) || !(SLOT_NAMES as readonly string[]).includes(slot))) return err(404, 'not-found', 'no such slot');
    if (parts.length === 4) {
      if (m === 'GET') {
        const row = await db.getSave(sport, slot);
        if (!row) return err(404, 'not-found', 'no such save');
        return reply(200, { serverRev: row.server_rev, envelope: JSON.parse(row.envelope) });
      }
      if (m === 'PUT') return putSave(req, db, sport, slot, now);
      if (m === 'DELETE') {
        const b = await readJson(req); if (!b.ok) return b.res;
        const base = baseOf(b.body.base);
        if (typeof base !== 'number') return err(422, 'invalid', 'base (the server_rev you last saw) is required to delete');
        return writeReply(await db.deleteSave(sport, slot, base, now));
      }
    }
    if (parts.length === 5 && parts[4] === 'history' && m === 'GET') return reply(200, { history: await db.listHistory(sport, slot) });
    if (parts.length === 5 && parts[4] === 'restore' && m === 'POST') {
      const b = await readJson(req); if (!b.ok) return b.res;
      const base = baseOf(b.body.base), seq = b.body.archivedSeq;
      if (base === undefined || typeof seq !== 'number' || !Number.isInteger(seq)) return err(422, 'invalid', 'archivedSeq and base are required');
      const h = await db.getHistory(sport, slot, seq);
      if (!h) return err(404, 'not-found', 'no such rung-back');
      const parsed = restore(h.envelope);
      if (!parsed.ok) return err(422, 'invalid', parsed.message);
      const e = parsed.value;
      return writeReply(await db.putSave(sport, slot, base, { saveId: e.saveId, saveRevision: e.saveRevision, kind: e.kind, schemaVersion: e.schemaVersion, engineVersion: e.engineVersion, dataVersion: e.dataVersion, savedAt: e.savedAt }, h.envelope, null, now, true, 'restored-over'));
    }
  }

  if (parts[1] === 'account' && parts.length === 2 && m === 'DELETE') {
    const b = await readJson(req); if (!b.ok) return b.res;
    if (b.body.confirm !== true) return err(422, 'invalid', 'send { "confirm": true } to delete your account and every save, run and share link');
    return reply(200, { deleted: await db.deleteAccount() });
  }
  if (parts[1] === 'runs' && parts.length === 2 && m === 'POST') return postRuns(req, db, now);
  if (parts[1] === 'stats' && parts.length === 2 && m === 'GET') return reply(200, await statsOf(db));

  if (parts[1] === 'shares') {
    if (parts.length === 2 && m === 'POST') return postShare(req, db, now, nowD);
    if (parts.length === 3 && m === 'DELETE') return (await db.revokeShare(parts[2], now)) ? reply(200, { revoked: true }) : err(404, 'not-found', 'no such share');
  }
  return err(404, 'not-found', 'unknown route');
}

async function putSave(req: Request, db: Scoped, sport: string, slot: string, now: string): Promise<Response> {
  const b = await readJson(req); if (!b.ok) return b.res;
  const base = baseOf(b.body.base);
  if (base === undefined) return err(422, 'invalid', 'base must be null (never seen this slot) or the integer server_rev you last saw');
  if (!isObj(b.body.envelope)) return err(422, 'invalid', 'envelope is required');
  const text = JSON.stringify(b.body.envelope);
  if (enc.encode(text).length > MAX_ENVELOPE_BYTES) return err(413, 'too-large', 'envelope is over ' + MAX_ENVELOPE_BYTES + ' bytes');
  const parsed = restore(text);
  if (!parsed.ok) return parsed.reason === 'newer-version' ? err(426, 'newer-schema', parsed.message) : err(422, 'invalid', parsed.message);
  const e = parsed.value;
  if (e.sport !== sport || e.slot !== slot) return err(422, 'invalid', 'envelope sport/slot does not match the URL');
  const deviceId = typeof b.body.deviceId === 'string' && b.body.deviceId.length <= 64 ? b.body.deviceId : null;
  return writeReply(await db.putSave(sport, slot, base, { saveId: e.saveId, saveRevision: e.saveRevision, kind: e.kind, schemaVersion: e.schemaVersion, engineVersion: e.engineVersion, dataVersion: e.dataVersion, savedAt: e.savedAt }, text, deviceId, now, false, 'conflict-lost'));
}

async function postRuns(req: Request, db: Scoped, _now: string): Promise<Response> {
  const b = await readJson(req); if (!b.ok) return b.res;
  const list = b.body.envelopes;
  if (!Array.isArray(list) || list.length < 1 || list.length > MAX_RUN_BATCH) return err(422, 'invalid', 'envelopes must be a list of 1 to ' + MAX_RUN_BATCH + ' season saves');
  const rows = [];
  for (const raw of list) {
    const text = JSON.stringify(raw);
    if (enc.encode(text).length > MAX_ENVELOPE_BYTES) return err(413, 'too-large', 'a season envelope is too large');
    const parsed = restore(text);
    if (!parsed.ok) return err(422, 'invalid', parsed.message);
    if (parsed.value.kind !== 'season') return err(422, 'invalid', 'only a finished season is a run');
    const d = deriveRun(parsed.value as SeasonEnvelope);
    if (!d.ok) return err(422, 'invalid', d.message);
    if (enc.encode(d.row.detail).length > 16 * 1024) return err(413, 'too-large', 'run detail is over 16 KB');
    rows.push(d.row);
  }
  if ((await db.countRuns()) + rows.length > MAX_RUNS) return err(429, 'cap', 'run ledger is full (' + MAX_RUNS + ')');
  let inserted = 0;
  for (const r of rows) if (await db.insertRun(r)) inserted++;
  return reply(200, { inserted, ignored: rows.length - inserted });
}

// Folds over the ledger; nothing here is a stored counter. The legend-points fold waits for its weights to be written down (not guessed here).
async function statsOf(db: Scoped): Promise<Record<string, unknown>> {
  const runs = await db.listRuns('nfl');
  const byFranchise: Record<string, { runs: number; titles: number; bestWins: number }> = {};
  let titles = 0, superBowls = 0, playoffs = 0, undefeated = 0, perfect = 0;
  for (const r of runs) {
    const o = r.outcome as string, f = r.franchise as string;
    const x = (byFranchise[f] ??= { runs: 0, titles: 0, bestWins: 0 });
    x.runs++; x.bestWins = Math.max(x.bestWins, r.w as number);
    if (o === 'champion') { titles++; x.titles++; }
    if (o === 'champion' || o === 'super-bowl-loss') superBowls++;
    if (o !== 'missed-playoffs') playoffs++;
    if (r.undefeated === 1) undefeated++;
    if (r.perfect === 1) perfect++;
  }
  return { runs: runs.length, titles, superBowls, playoffs, undefeatedSeasons: undefeated, perfectSeasons: perfect, byFranchise };
}

async function postShare(req: Request, db: Scoped, now: string, nowD: Date): Promise<Response> {
  const b = await readJson(req); if (!b.ok) return b.res;
  const sport = b.body.sport;
  if (typeof sport !== 'string' || !(SPORT_IDS as readonly string[]).includes(sport)) return err(422, 'invalid', 'unknown sport');
  if ((await db.countActiveShares(now)) >= MAX_ACTIVE_SHARES) return err(429, 'cap', 'too many active share links (' + MAX_ACTIVE_SHARES + ')');
  let snapshot: string, kind: string;
  if (b.body.kind === 'save') {
    const slot = b.body.slot;
    if (typeof slot !== 'string' || !(SLOT_NAMES as readonly string[]).includes(slot)) return err(422, 'invalid', 'slot is required');
    const row = await db.getSave(sport, slot);
    if (!row) return err(404, 'not-found', 'no such save');
    snapshot = row.envelope; kind = 'save';
  } else if (b.body.kind === 'run') {
    const saveId = b.body.saveId, run = b.body.run;
    if (typeof saveId !== 'string' || typeof run !== 'number' || !Number.isInteger(run)) return err(422, 'invalid', 'saveId and run are required');
    const r = await db.getRun(sport, saveId, run);
    if (!r) return err(404, 'not-found', 'no such run');
    snapshot = JSON.stringify({ franchise: r.franchise, year: r.year, outcome: r.outcome, w: r.w, l: r.l, t: r.t, pf: r.pf, pa: r.pa, undefeated: r.undefeated === 1, perfect: r.perfect === 1 }); kind = 'run';
  } else return err(422, 'invalid', "kind must be 'save' or 'run'");
  const tokenBytes = crypto.getRandomValues(new Uint8Array(16));
  const token = hex(tokenBytes), id = crypto.randomUUID();
  const expires = new Date(nowD.getTime() + SHARE_DAYS * 86400000).toISOString();
  await db.createShare(id, await sha256Hex(token), sport, kind, now, expires, snapshot);
  return reply(201, { id, token, expiresAt: expires });
}
