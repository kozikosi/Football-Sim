import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createFetchTransport } from '../../src/sync/transport.ts';

const mk = (status: number, body: unknown, headers: Record<string, string> = {}) => async () => new Response(JSON.stringify(body), { status, headers: { 'x-api-version': '1', ...headers } });
const put = (f: typeof fetch) => createFetchTransport(f).putSave('nfl', 'A', { envelope: {}, base: null, deviceId: 'd' });

test('transport: statuses map to the failure classes the sync logic acts on', async () => {
  assert.deepEqual(await put(mk(200, { serverRev: 3, archived: true })), { ok: true, value: { serverRev: 3, archived: true } });
  const cur = { slot: 'A', saveId: 's', serverRev: 2 };
  assert.deepEqual(await put(mk(409, { error: 'conflict', current: cur })), { ok: false, failure: { type: 'conflict', current: cur } });
  assert.deepEqual(await put(mk(401, { error: 'unauthenticated' })), { ok: false, failure: { type: 'unauthenticated' } });
  assert.deepEqual(await put(mk(503, { error: 'sync-paused' }, { 'retry-after': '120' })), { ok: false, failure: { type: 'paused', retryAfterSec: 120 } });
  assert.deepEqual(await put(mk(500, { error: 'internal', message: 'boom' })), { ok: false, failure: { type: 'transient', message: 'boom' } });
  assert.deepEqual(await put(mk(429, { error: 'rate', message: 'slow' }, { 'retry-after': '30' })), { ok: false, failure: { type: 'transient', message: 'slow', retryAfterSec: 30 } });
  for (const [s, code] of [[413, 'too-large'], [422, 'invalid'], [426, 'newer-schema'], [429, 'cap'], [404, 'not-found']] as const) {
    const r = await put(mk(s, { error: code, message: 'm' }));
    assert.deepEqual(r, { ok: false, failure: { type: 'rejected', status: s, code, message: 'm' } });
  }
});

test('transport: a thrown fetch is transient; a 404 on getSave is null; an api-version mismatch stops', async () => {
  const t = createFetchTransport((async () => { throw new TypeError('Failed to fetch'); }) as typeof fetch);
  assert.deepEqual(await t.listSaves(), { ok: false, failure: { type: 'transient', message: 'Failed to fetch' } });
  assert.deepEqual(await createFetchTransport(mk(404, { error: 'not-found' }) as typeof fetch).getSave('nfl', 'A'), { ok: true, value: null });
  const v = await createFetchTransport(mk(200, { saves: [] }, { 'x-api-version': '2' }) as typeof fetch).listSaves();
  assert.equal(v.ok, false); assert.equal((v as any).failure.code, 'api-version');
  assert.equal((await createFetchTransport(mk(200, { nope: 1 }) as typeof fetch).listSaves()).ok, false, 'a malformed 200 is rejected, not trusted');
});

test('transport: PUT sends {envelope, base, deviceId} as JSON; keepalive only for small bodies', async () => {
  let seen: RequestInit | undefined;
  const f = (async (_u: string, init?: RequestInit) => { seen = init; return new Response(JSON.stringify({ serverRev: 1, archived: false }), { status: 200, headers: { 'x-api-version': '1' } }); }) as unknown as typeof fetch;
  await createFetchTransport(f).putSave('nfl', 'B', { envelope: { a: 1 }, base: 4, deviceId: 'd' }, { keepalive: true });
  assert.deepEqual(JSON.parse(String(seen!.body)), { envelope: { a: 1 }, base: 4, deviceId: 'd' }); assert.equal(seen!.keepalive, true);
  await createFetchTransport(f).putSave('nfl', 'B', { envelope: { a: 'x'.repeat(70000) }, base: null, deviceId: 'd' }, { keepalive: true });
  assert.equal(seen!.keepalive, undefined);
});

test('transport: delete, history, restore, stats and shares use the server routes and wire names', async () => {
  const seen: [string, string, unknown][] = [];
  const answer = (body: unknown, status = 200) => (async (u: string, init?: RequestInit) => { seen.push([String(init?.method), u, init?.body === undefined ? undefined : JSON.parse(String(init.body))]); return new Response(JSON.stringify(body), { status, headers: { 'x-api-version': '1' } }); }) as unknown as typeof fetch;
  assert.deepEqual(await createFetchTransport(answer({ serverRev: 3, archived: false })).deleteSave('nfl', 'A', 2), { ok: true, value: { serverRev: 3 } });
  assert.deepEqual(await createFetchTransport(answer({ history: [{ archived_seq: 2, save_id: 's', save_revision: 4, reason: 'deleted', archived_at: 't' }] })).listHistory('nfl', 'B'),
    { ok: true, value: [{ archivedSeq: 2, saveId: 's', saveRevision: 4, reason: 'deleted', archivedAt: 't' }] });
  assert.deepEqual(await createFetchTransport(answer({ serverRev: 5, archived: true })).restoreSave('nfl', 'B', { archivedSeq: 2, base: 4 }), { ok: true, value: { serverRev: 5 } });
  assert.deepEqual(await createFetchTransport(answer({ runs: 2 })).getStats(), { ok: true, value: { runs: 2 } });
  assert.deepEqual(await createFetchTransport(answer({ id: 'i', token: 't', expiresAt: 'e' }, 201)).createShare({ sport: 'nfl', kind: 'run', saveId: 's', run: 0 }), { ok: true, value: { id: 'i', token: 't', expiresAt: 'e' } });
  assert.deepEqual(await createFetchTransport(answer({ revoked: true })).revokeShare('a/b'), { ok: true, value: { revoked: true } });
  assert.deepEqual(await createFetchTransport(answer({ kind: 'save', sport: 'nfl', createdAt: 'c', snapshot: { x: 1 } })).getShare('tok'), { ok: true, value: { kind: 'save', sport: 'nfl', createdAt: 'c', snapshot: { x: 1 } } });
  assert.deepEqual(seen.map(([m, u]) => m + ' ' + u), ['DELETE /api/saves/nfl/A', 'GET /api/saves/nfl/B/history', 'POST /api/saves/nfl/B/restore', 'GET /api/stats', 'POST /api/shares', 'DELETE /api/shares/a%2Fb', 'GET /api/share/tok']);
  assert.deepEqual(seen[0]![2], { base: 2 }); assert.deepEqual(seen[2]![2], { archivedSeq: 2, base: 4 }); assert.deepEqual(seen[4]![2], { sport: 'nfl', kind: 'run', saveId: 's', run: 0 });
  assert.deepEqual(await createFetchTransport(answer({ error: 'not-found' }, 404)).getShare('gone'), { ok: true, value: null });
  const revoked = await createFetchTransport(answer({ error: 'gone', message: 'revoked' }, 410)).getShare('old');
  assert.deepEqual(revoked, { ok: false, failure: { type: 'rejected', status: 410, code: 'gone', message: 'revoked' } });
});
