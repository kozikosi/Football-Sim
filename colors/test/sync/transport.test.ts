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
