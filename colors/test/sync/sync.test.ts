import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSync, decide, DEBOUNCE_MS } from '../../src/sync/sync.ts';
import type { SlotName } from '../../src/core/envelope.ts';
import { recordKey } from '../../src/sync/record.ts';
import { Clock, FakeServer, T0, env, memStorage } from './fake.ts';

const K = (s: SlotName) => 'sim:nfl:slot:' + s;
function rig(local: Record<string, string> = {}) {
  const storage = memStorage(local), server = new FakeServer(), clock = new Clock(); let n = 0; const pulled: SlotName[] = [];
  const sync = createSync({ storage, transport: server, now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer, newId: () => 'dev-' + ++n, onPulled: (s) => { pulled.push(s); } });
  return { storage, server, clock, sync, pulled };
}
const saveIdOf = (t: string | undefined) => JSON.parse(t ?? 'null')?.saveId;
const rec = (r: ReturnType<typeof rig>) => JSON.parse(r.storage.data.get(recordKey('nfl')) ?? 'null');
const archives = (r: ReturnType<typeof rig>, s: SlotName) => [...r.storage.data.keys()].filter((k) => k.startsWith('sim:nfl:sync-archive:' + s + ':'));

test('decide: the contract conflict table', () => {
  const m = (saveId: string, saveRevision: number, ms: number) => ({ saveId, saveRevision, savedAt: new Date(ms).toISOString() });
  assert.equal(decide(m('a', 1, 0), m('a', 2, 0)), 'pull');
  assert.equal(decide(m('a', 3, 0), m('a', 2, 0)), 'push');
  assert.equal(decide(m('a', 2, 0), m('a', 2, 5)), 'pull');
  assert.equal(decide(m('a', 2, 5), m('a', 2, 0)), 'push');
  assert.equal(decide(m('a', 2, 5), m('a', 2, 5)), 'same');
  assert.equal(decide(m('a', 9, 0), m('b', 1, 0)), 'fork');
});

test('first sign-in: local-only pushes with base null; remote-only pulls; nothing local deleted', async () => {
  const r = rig({ [K('A')]: env('A', 'l1', 2) });
  r.server.seed('B', env('B', 'r1', 3));
  assert.deepEqual(await r.sync.signIn('u1'), { kind: 'ok' });
  assert.deepEqual(r.server.puts, [{ slot: 'A', base: null }]);
  assert.equal(saveIdOf(r.storage.data.get(K('B'))), 'r1');
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'l1');
  assert.deepEqual(r.pulled, ['B']);
  assert.equal(rec(r).userId, 'u1'); assert.equal(rec(r).serverRev.A, 1); assert.equal(rec(r).serverRev.B, 1);
  assert.equal(r.sync.status().kind, 'idle');
});

test('same lineage, remote higher: pull it and keep the local copy as a local rung-back', async () => {
  const r = rig({ [K('A')]: env('A', 's', 2) });
  r.server.seed('A', env('A', 's', 5), 4);
  await r.sync.signIn('u1');
  assert.equal(JSON.parse(r.storage.data.get(K('A'))!).saveRevision, 5);
  const a = await r.sync.localArchive('A'); assert.equal(a.length, 1); assert.equal(a[0]!.env.saveRevision, 2);
  assert.equal(rec(r).serverRev.A, 4);
});

test('same lineage, local higher: push with the base we saw', async () => {
  const r = rig({ [K('A')]: env('A', 's', 7) });
  r.server.seed('A', env('A', 's', 3), 2);
  await r.sync.signIn('u1');
  assert.deepEqual(r.server.puts, [{ slot: 'A', base: 2 }]);
  assert.equal(r.server.rows.get('A')!.envelope.saveRevision, 7); assert.equal(r.server.rows.get('A')!.history.length, 0, 'an advancing write of the same lineage is not archived (server rule)');
});

test('equal revision: the later savedAt wins and the other is archived', async () => {
  const r = rig({ [K('A')]: env('A', 's', 4, T0 + 1000) });
  r.server.seed('A', env('A', 's', 4, T0 + 9000), 3);
  await r.sync.signIn('u1');
  assert.equal(JSON.parse(r.storage.data.get(K('A'))!).savedAt, new Date(T0 + 9000).toISOString());
  assert.equal(archives(r, 'A').length, 1);
  const r2 = rig({ [K('A')]: env('A', 's', 4, T0 + 9000) });
  r2.server.seed('A', env('A', 's', 4, T0 + 1000), 3);
  await r2.sync.signIn('u1');
  assert.equal(r2.server.rows.get('A')!.envelope.savedAt, new Date(T0 + 9000).toISOString()); assert.equal(r2.server.rows.get('A')!.history.length, 1);
});

test('fork (different saveId) with a free slot: keep both, the incoming lineage takes the free slot', async () => {
  const r = rig({ [K('A')]: env('A', 'local', 3) });
  r.server.seed('A', env('A', 'remote', 8), 5);
  await r.sync.signIn('u1');
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'local');
  assert.equal(saveIdOf(r.storage.data.get(K('B'))), 'remote');
  assert.equal(JSON.parse(r.storage.data.get(K('B'))!).slot, 'B');
  assert.equal(r.server.rows.get('A')!.envelope.saveId, 'local'); assert.equal(r.server.rows.get('B')!.envelope.saveId, 'remote');
  assert.equal(r.server.rows.get('B')!.envelope.slot, 'B');
});

test('fork with no free slot: the older lineage becomes a rung-back, the newer keeps the slot', async () => {
  const full = (id: string, ms: number) => ({ [K('A')]: env('A', id, 3, ms), [K('B')]: env('B', 'b', 1), [K('C')]: env('C', 'c', 1) });
  const r = rig(full('local', T0 + 1000));
  r.server.seed('A', env('A', 'remote', 8, T0 + 9000), 5);
  await r.sync.signIn('u1');
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'remote'); assert.equal(archives(r, 'A').length, 1);
  const r2 = rig(full('local', T0 + 9000));
  r2.server.seed('A', env('A', 'remote', 8, T0 + 1000), 5);
  await r2.sync.signIn('u1');
  assert.equal(saveIdOf(r2.storage.data.get(K('A'))), 'local'); assert.equal(r2.server.rows.get('A')!.history[0].saveId, 'remote');
});

test('a 409 on push refetches and applies the table (remote wrote first, higher revision: pull)', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) });
  await r.sync.signIn('u1');
  r.server.rows.get('A')!.envelope = JSON.parse(env('A', 's', 9)); r.server.rows.get('A')!.serverRev = 4;   // another device wrote
  r.storage.data.set(K('A'), env('A', 's', 2));
  r.sync.notifySaved('A', 'week'); await r.sync.idle();
  assert.equal(JSON.parse(r.storage.data.get(K('A'))!).saveRevision, 9); assert.equal(rec(r).serverRev.A, 4);
  assert.equal(archives(r, 'A').length, 1);
});

test('push timing: edits debounce 10 s into one push of the latest bytes; week/draft end/elimination push now', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 1)); r.sync.notifySaved('A', 'edit');
  await r.clock.advance(4000); r.storage.data.set(K('A'), env('A', 's', 2)); r.sync.notifySaved('A', 'edit');
  assert.equal(r.server.puts.length, 0);
  await r.clock.advance(DEBOUNCE_MS - 4000); await r.sync.idle();
  assert.equal(r.server.puts.length, 1); assert.equal(r.server.rows.get('A')!.envelope.saveRevision, 2);
  await r.clock.advance(20_000); await r.sync.idle(); assert.equal(r.server.puts.length, 1, 'no second timer from the second edit');
  r.storage.data.set(K('A'), env('A', 's', 3)); r.sync.notifySaved('A', 'week'); await r.sync.idle();
  assert.equal(r.server.puts.length, 2); assert.equal(r.server.puts[1]!.base, 1);
});

test('several notifies before the queue runs coalesce into one push', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 1));
  r.sync.notifySaved('A', 'week'); r.sync.notifySaved('A', 'week'); r.sync.notifySaved('A', 'draft-end'); await r.sync.idle();
  assert.equal(r.server.puts.length, 1);
});

test('network failure: failed chip, retry with doubling backoff, success clears it', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 1)); r.server.offline = true;
  r.sync.notifySaved('A', 'week'); await r.sync.idle();
  assert.deepEqual(r.sync.status(), { kind: 'failed', reason: 'offline', retriable: true, slot: 'A' });
  await r.clock.advance(1000); await r.sync.idle(); const c1 = r.server.calls.length;
  await r.clock.advance(1500); assert.equal(r.server.calls.length, c1, 'second wait is 2 s, not 1.5');
  await r.clock.advance(500); await r.sync.idle(); assert.ok(r.server.calls.length > c1);
  r.server.offline = false; await r.clock.advance(4000); await r.sync.idle();
  assert.equal(r.sync.status().kind, 'idle'); assert.equal(r.server.rows.get('A')!.serverRev, 1);
});

test('onOnline retries immediately', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 1)); r.server.offline = true; r.sync.notifySaved('A', 'week'); await r.sync.idle();
  r.server.offline = false; r.sync.onOnline(); await r.sync.idle();
  assert.equal(r.server.rows.get('A')!.serverRev, 1);
});

test('a 4xx stops: no retry, surfaced; a 426 shows newer-schema', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 1));
  r.server.failures.push({ type: 'rejected', status: 422, code: 'invalid', message: 'bad envelope' });
  r.sync.notifySaved('A', 'week'); await r.sync.idle();
  assert.deepEqual(r.sync.status(), { kind: 'failed', reason: 'bad envelope', retriable: false, slot: 'A' });
  const n = r.server.calls.length; await r.clock.advance(120000); assert.equal(r.server.calls.length, n);
  r.server.failures.push({ type: 'rejected', status: 426, code: 'newer-schema', message: 'newer' });
  r.sync.notifySaved('A', 'week'); await r.sync.idle();
  assert.deepEqual(r.sync.status(), { kind: 'newer-schema', slot: 'A' });
});

test('sync-paused: chip says paused, no calls until Retry-After, then it pulls again', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 1));
  r.server.failures.push({ type: 'paused', retryAfterSec: 600 });
  r.sync.notifySaved('A', 'week'); await r.sync.idle();
  assert.equal(r.sync.status().kind, 'paused');
  r.sync.notifySaved('A', 'week'); await r.sync.idle();
  assert.equal(r.server.puts.length, 0);
  await r.clock.advance(600_000); await r.sync.idle();
  assert.equal(r.server.rows.get('A')!.serverRev, 1);
});

test('focus after >= 60 s hidden pulls; shorter does not', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.server.seed('C', env('C', 'x', 1));
  const n = r.server.calls.length; r.sync.onVisible(30_000); await r.sync.idle(); assert.equal(r.server.calls.length, n);
  r.sync.onVisible(60_000); await r.sync.idle(); assert.equal(saveIdOf(r.storage.data.get(K('C'))), 'x');
});

test('account switch: another user on this device never merges silently', async () => {
  const r = rig({ [K('A')]: env('A', 'mine', 1) });
  await r.sync.signIn('u1'); r.sync.signOut();
  r.server.rows.clear(); r.server.seed('A', env('A', 'theirs', 4)); r.server.seed('B', env('B', 'theirs-b', 1)); r.server.calls.length = 0;
  const res = await r.sync.signIn('u2');
  assert.deepEqual(res, { kind: 'needs-account-choice', deviceUserId: 'u1' });
  assert.equal(r.sync.status().kind, 'needs-account-choice'); assert.equal(r.server.calls.length, 0);
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'mine'); assert.equal(rec(r).userId, 'u1');
  r.sync.notifySaved('A', 'week'); await r.sync.idle(); assert.equal(r.server.calls.length, 0);
  assert.deepEqual(await r.sync.resolveAccountSwitch({ action: 'adopt', slots: ['B'] }), { kind: 'ok' });
  assert.equal(saveIdOf(r.storage.data.get(K('B'))), 'theirs-b'); assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'mine');
  assert.equal(rec(r).userId, 'u2');
});

test('account switch, keep separate: nothing synced, nothing changed', async () => {
  const r = rig({ [K('A')]: env('A', 'mine', 1) });
  await r.sync.signIn('u1'); r.sync.signOut(); r.server.calls.length = 0;
  await r.sync.signIn('u2'); await r.sync.resolveAccountSwitch({ action: 'keep-separate' });
  assert.equal(r.server.calls.length, 0); assert.equal(rec(r).userId, 'u1'); assert.deepEqual(r.sync.status(), { kind: 'off', reason: 'signed-out' });
});

test('sign-out keeps local saves and the sync record; same user signing back in needs no choice', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) });
  await r.sync.signIn('u1'); r.sync.signOut();
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 's'); assert.equal(rec(r).deviceId, 'dev-1');
  r.sync.notifySaved('A', 'week'); await r.sync.idle(); const puts = r.server.puts.length;
  assert.deepEqual(await r.sync.signIn('u1'), { kind: 'ok' }); assert.equal(rec(r).deviceId, 'dev-1');
  assert.equal(r.server.puts.length, puts, 'unchanged slot: no new write');
});

test('runs: every finished season is sent once; elimination sends it; repeats are not resent', async () => {
  const r = rig({ [K('A')]: env('A', 'run1', 5, T0, 'season') });
  await r.sync.signIn('u1');
  assert.equal(r.server.runs.size, 1);
  const before = r.server.calls.filter((c) => c === 'runs').length;
  await r.sync.signIn('u1'); r.sync.onVisible(61_000); await r.sync.idle();
  assert.equal(r.server.calls.filter((c) => c === 'runs').length, before);
  r.storage.data.set(K('B'), env('B', 'run2', 3, T0, 'season', { run: 1 }));
  r.sync.notifySaved('B', 'elimination'); await r.sync.idle(); await r.sync.idle();
  assert.equal(r.server.runs.size, 2);
  assert.deepEqual(rec(r).runsSent.sort(), ['run1:0', 'run2:1']);
});

test('an unreadable or newer-schema local slot is never overwritten or pushed', async () => {
  const newer = JSON.stringify({ ...JSON.parse(env('A', 's', 1)), schemaVersion: 99 });
  const r = rig({ [K('A')]: newer, [K('B')]: '{not json' });
  r.server.seed('A', env('A', 'remote', 9)); r.server.seed('B', env('B', 'remote-b', 9));
  await r.sync.signIn('u1');
  assert.equal(r.storage.data.get(K('A')), newer); assert.equal(r.storage.data.get(K('B')), '{not json');
  assert.equal(r.server.puts.length, 0);
});

test('a server copy from a newer build is not written locally', async () => {
  const r = rig(); r.server.seed('A', JSON.stringify({ ...JSON.parse(env('A', 's', 1)), schemaVersion: 99 }));
  await r.sync.signIn('u1');
  assert.equal(r.storage.data.get(K('A')), undefined); assert.deepEqual(r.sync.status(), { kind: 'newer-schema', slot: 'A' });
});

test('local rung-backs keep exactly three per slot', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) });
  await r.sync.signIn('u1');
  for (let i = 2; i <= 6; i++) {
    r.server.rows.get('A')!.envelope = JSON.parse(env('A', 's', 100 + i)); r.server.rows.get('A')!.serverRev += 1;
    r.storage.data.set(K('A'), env('A', 's', i)); r.sync.onVisible(61_000); await r.sync.idle();
  }
  assert.equal(archives(r, 'A').length, 3);
});

test('one rejected season does not block the others; it stays unsent and the chip says failed', async () => {
  const r = rig({ [K('A')]: env('A', 'good', 5, T0, 'season'), [K('B')]: env('B', 'bad', 5, T0, 'season') });
  const orig = r.server.postRuns.bind(r.server);
  r.server.postRuns = async (es: unknown[]) => (es as any[]).some((e) => e.saveId === 'bad') ? { ok: false, failure: { type: 'rejected', status: 422, code: 'invalid', message: 'bad run' } } : orig(es);
  const res = await r.sync.signIn('u1');
  assert.equal(r.server.runs.size, 1); assert.deepEqual(rec(r).runsSent, ['good:0']);
  assert.equal(res.kind, 'failed'); assert.equal(r.sync.status().kind, 'failed');
});
