// The real client sync module (colors/src/sync) against the real API handler and D1-shaped store: no fake server in between.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memoryD1 } from './sqlite-d1.ts';
import { handle } from '../src/api.ts';
import { draftEnv, seasonEnv, results, W17, T0 } from './helpers.ts';
import { createSync } from '../../colors/src/sync/sync.ts';
import { createFetchTransport } from '../../colors/src/sync/transport.ts';
import type { StorageModule } from '../../colors/src/core/app.ts';

function store(init: Record<string, string> = {}): StorageModule & { data: Map<string, string> } {
  const data = new Map(Object.entries(init));
  return { data, read: async (k) => ({ ok: true, value: data.get(k) ?? null }), write: async (k, t) => { data.set(k, t); return { ok: true, value: undefined }; }, remove: async (k) => { data.delete(k); return { ok: true, value: undefined }; },
    keys: async (p) => ({ ok: true, value: [...data.keys()].filter((k) => k.startsWith(p)).sort() }), entries: async (p) => ({ ok: true, value: [...data.entries()].filter(([k]) => k.startsWith(p)).sort() }) };
}
const device = (db: Awaited<ReturnType<typeof memoryD1>>, user: string, local: Record<string, string>) => {
  const fetchFn = (async (url: string, init?: RequestInit) => handle(new Request('http://x' + url, { ...init, headers: { ...(init?.headers as object), 'x-test-user': user } }), { DB: db }, async (r) => r.headers.get('x-test-user'), T0)) as unknown as typeof fetch;
  const storage = store(local); let n = 0, t = 0;
  const transport = createFetchTransport(fetchFn);
  const sync = createSync({ storage, transport, now: () => T0.getTime(), setTimer: () => ++t, clearTimer: () => {}, newId: () => 'dev-' + ++n });
  return { storage, sync, transport };
};
const J = (e: unknown) => JSON.stringify(e);

test('a browser signed in as someone else cannot receive this account\'s saves', async () => {
  const db = await memoryD1();
  const other = device(db, 'u2', { 'sim:nfl:slot:A': J(draftEnv('A', 'of-u1', 1)) });     // the cookie is u2's, the page still believes u1
  await other.sync.signIn('u1');
  assert.equal(other.sync.status().kind, 'off');
  assert.equal((await db.get('SELECT COUNT(*) n FROM saves')).n, 0);
});

test('two devices through the real server: push from one, pull on the other, fork keeps both, runs land in stats', async () => {
  const db = await memoryD1();
  const a = device(db, 'u1', { 'sim:nfl:slot:A': J(draftEnv('A', 's1', 4)), 'sim:nfl:slot:B': J(seasonEnv('B', 'done1', 6, results(W17, [['Wild Card', 'W'], ['Divisional', 'W'], ['Conference', 'W'], ['Super Bowl', 'W']]), { userOutcome: 'champion' })) });
  assert.deepEqual(await a.sync.signIn('u1'), { kind: 'ok' });
  const b = device(db, 'u1', { 'sim:nfl:slot:A': J(draftEnv('A', 'other-lineage', 2)) });
  assert.deepEqual(await b.sync.signIn('u1'), { kind: 'ok' });
  const ids = (s: ReturnType<typeof store>) => ['A', 'B', 'C'].map((k) => JSON.parse(s.data.get('sim:nfl:slot:' + k) ?? 'null')?.saveId ?? null);
  assert.deepEqual([...ids(b.storage)].sort(), ['done1', 'other-lineage', 's1']);
  a.storage.data.set('sim:nfl:slot:A', J(draftEnv('A', 's1', 5))); a.sync.notifySaved('A', 'week'); await a.sync.idle();
  const stats = await (await handle(new Request('http://x/api/stats', { headers: { 'x-test-user': 'u1' } }), { DB: db }, async (r) => r.headers.get('x-test-user'), T0)).json() as any;
  assert.equal(stats.runs, 1);
});

test('two devices through the real server: delete, honoured elsewhere, restored, stats and share links', async () => {
  const db = await memoryD1(), K = 'sim:nfl:slot:A';
  const a = device(db, 'u1', { [K]: J(seasonEnv('A', 's1', 2, results(W17))) }), b = device(db, 'u1', {});
  assert.deepEqual(await a.sync.signIn('u1'), { kind: 'ok' }); assert.deepEqual(await b.sync.signIn('u1'), { kind: 'ok' });
  assert.ok(b.storage.data.has(K));
  a.storage.data.delete(K); a.sync.notifyDeleted('A'); await a.sync.idle();
  b.sync.onVisible(60_000); await b.sync.idle();
  assert.equal(b.storage.data.has(K), false);
  const h = await b.sync.serverHistory('A'); assert.ok(h.ok); assert.equal(h.value[0]!.reason, 'deleted');
  assert.deepEqual(await b.sync.restoreFromServer('A', h.value[0]!.archivedSeq), { ok: true, value: undefined });
  a.sync.onVisible(60_000); await a.sync.idle();
  assert.equal(JSON.parse(a.storage.data.get(K)!).saveId, 's1');
  const stats = await a.sync.stats(); assert.ok(stats.ok); assert.equal(stats.value.runs, 1);
  const link = await a.sync.shareSave('A'); assert.ok(link.ok);
  const seen = await a.transport.getShare(link.value.token); assert.ok(seen.ok); assert.equal((seen.value!.snapshot as any).saveId, 's1');
  assert.ok((await a.sync.shareRun('s1', 0)).ok);
  assert.deepEqual(await a.sync.revokeShare(link.value.id), { ok: true, value: undefined });
  const gone = await a.transport.getShare(link.value.token); assert.ok(!gone.ok && gone.failure.type === 'rejected' && gone.failure.code === 'gone');
});
