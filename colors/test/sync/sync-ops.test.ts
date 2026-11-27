// Delete, restore, shares, stats, jitter and the in-flight write race (the gaps listed in claude/client-sync-module-2026-11-23.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSync } from '../../src/sync/sync.ts';
import type { SlotName } from '../../src/core/envelope.ts';
import { recordKey } from '../../src/sync/record.ts';
import { Clock, FakeServer, T0, env, memStorage } from './fake.ts';

const K = (s: SlotName) => 'sim:nfl:slot:' + s;
function rig(local: Record<string, string> = {}, share?: { server: FakeServer; storage?: ReturnType<typeof memStorage> }, random: () => number = () => 1) {
  const storage = share?.storage ?? memStorage(local), server = share?.server ?? new FakeServer(), clock = new Clock(); let n = 0; const pulled: SlotName[] = [], removed: SlotName[] = [];
  const sync = createSync({ storage, transport: server, now: clock.now, setTimer: clock.setTimer, clearTimer: clock.clearTimer, newId: () => 'dev-' + ++n, random, onPulled: (s) => { pulled.push(s); }, onRemoved: (s) => { removed.push(s); } });
  return { storage, server, clock, sync, pulled, removed };
}
type Rig = ReturnType<typeof rig>;
const saveIdOf = (t: string | undefined) => JSON.parse(t ?? 'null')?.saveId ?? null;
const revOf = (t: string | undefined) => JSON.parse(t ?? 'null')?.saveRevision ?? null;
const rec = (r: Rig) => JSON.parse(r.storage.data.get(recordKey('nfl')) ?? 'null');
const save = (r: Rig, s: SlotName, text: string) => { r.storage.data.set(K(s), text); r.sync.notifySaved(s, 'week'); };
const del = async (r: Rig, s: SlotName) => { r.storage.data.delete(K(s)); r.sync.notifyDeleted(s); await r.sync.idle(); };
const focus = async (r: Rig) => { r.sync.onVisible(60_000); await r.sync.idle(); };
/** Two devices of one account on one server, both holding lineage 's' at revision 1 in slot A. */
async function pair() {
  const a = rig({ [K('A')]: env('A', 's', 1) }); await a.sync.signIn('u1');
  const b = rig({}, { server: a.server }); await b.sync.signIn('u1');
  assert.equal(saveIdOf(b.storage.data.get(K('A'))), 's');
  return { a, b };
}

// ---- delete ----
test('delete: the deletion is sent with the base this device last saw, and the slot does not come back', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  await del(r, 'A');
  assert.deepEqual(r.server.deletes, [{ slot: 'A', base: 1 }]);
  assert.equal(r.server.rows.get('A')!.deleted, true);
  await focus(r);
  assert.equal(r.storage.data.has(K('A')), false);
  assert.equal(rec(r).pendingDelete?.A, undefined);
});

test('delete: a slot this device never synced sends nothing', async () => {
  const r = rig(); await r.sync.signIn('u1');
  await del(r, 'B');
  assert.deepEqual(r.server.deletes, []);
});

test('delete while offline is remembered across a reload and sent later', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.offline = true; await del(r, 'A');
  assert.equal(rec(r).pendingDelete.A, 1);
  const again = rig({}, { server: r.server, storage: r.storage }); r.server.offline = false;
  await again.sync.signIn('u1');
  assert.equal(r.server.rows.get('A')!.deleted, true); assert.equal(r.storage.data.has(K('A')), false, 'not pulled back');
});

test('delete: a network failure retries with backoff', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.offline = true; await del(r, 'A');
  r.server.offline = false; await r.clock.advance(1000); await r.sync.idle();
  assert.equal(r.server.rows.get('A')!.deleted, true); assert.equal(r.sync.status().kind, 'idle');
});

test('delete: if another device wrote a newer copy first, nothing is destroyed and that copy comes back here', async () => {
  const { a, b } = await pair();
  save(b, 'A', env('A', 's', 2, T0 + 5000)); await b.sync.idle();
  await del(a, 'A');
  assert.equal(a.server.rows.get('A')!.deleted, false);
  assert.equal(revOf(a.storage.data.get(K('A'))), 2); assert.equal(rec(a).pendingDelete?.A, undefined);
});

test('delete during a push of the same save: the delete still lands', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.during.set('put A', () => { r.storage.data.delete(K('A')); r.sync.notifyDeleted('A'); });
  save(r, 'A', env('A', 's', 2)); await r.sync.idle();
  assert.equal(r.server.rows.get('A')!.deleted, true); assert.equal(r.storage.data.has(K('A')), false);
});

test('delete then a new save in the same slot while offline: the new save replaces the old one, which stays restorable', async () => {
  const r = rig({ [K('A')]: env('A', 'old', 3) }); await r.sync.signIn('u1');
  r.server.offline = true; await del(r, 'A'); save(r, 'A', env('A', 'new', 1)); await r.sync.idle();
  r.server.offline = false; r.sync.onOnline(); await r.sync.idle(); await focus(r);
  assert.equal(r.server.rows.get('A')!.envelope.saveId, 'new'); assert.deepEqual(r.server.rows.get('A')!.history.map((e: any) => e.saveId), ['old']);
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'new');
  assert.equal(r.storage.data.has(K('B')), false, 'the deleted save is not treated as a fork and brought back into a free slot');
});

test('delete while signed out, or after "keep separate", is never sent', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1'); r.sync.signOut();
  await del(r, 'A'); await r.sync.signIn('u1');
  assert.deepEqual(r.server.deletes, []); assert.equal(saveIdOf(r.storage.data.get(K('A'))), 's', 'the save returns: the safe direction');
  r.sync.signOut(); await r.sync.signIn('u2'); await r.sync.resolveAccountSwitch({ action: 'keep-separate' });
  await del(r, 'A');
  assert.equal(rec(r).userId, 'u1'); assert.equal(rec(r).pendingDelete?.A, undefined);
  await r.sync.signIn('u1'); assert.deepEqual(r.server.deletes, []);
});

test('a delete made on another device removes an unchanged copy here and keeps a rung-back', async () => {
  const { a, b } = await pair();
  await del(a, 'A'); await focus(b);
  assert.equal(b.storage.data.has(K('A')), false);
  assert.deepEqual(b.removed, ['A']); assert.ok(b.pulled.includes('A'));
  const back = await b.sync.localArchive('A'); assert.equal(back[0]!.env.saveId, 's');
  assert.equal(a.server.rows.get('A')!.deleted, true, 'not resurrected');
});

test('the unchanged test survives a reload (it is stored in the sync record)', async () => {
  const { a, b } = await pair();
  await del(a, 'A');
  const b2 = rig({}, { server: a.server, storage: b.storage }); await b2.sync.signIn('u1');
  assert.equal(b.storage.data.has(K('A')), false); assert.equal(a.server.rows.get('A')!.deleted, true);
});

test('a delete made elsewhere never removes progress the server has not seen: it is pushed back', async () => {
  const { a, b } = await pair();
  await del(a, 'A');
  b.storage.data.set(K('A'), env('A', 's', 2, T0 + 5000)); await focus(b);
  assert.equal(revOf(b.storage.data.get(K('A'))), 2);
  assert.equal(a.server.rows.get('A')!.deleted, false); assert.equal(a.server.rows.get('A')!.envelope.saveRevision, 2);
});

test('a device that never synced the slot deletes nothing on sign-in', async () => {
  const server = new FakeServer(); server.seed('A', env('A', 's', 1), 2, true);
  const r = rig({ [K('A')]: env('A', 's', 1) }, { server, storage: memStorage({ [K('A')]: env('A', 's', 1) }) });
  await r.sync.signIn('u1');
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 's'); assert.equal(server.rows.get('A')!.deleted, false);
});

// ---- a server copy that moved while ours did not ----
test('an unchanged device follows a replaced lineage instead of pushing its old copy back', async () => {
  const { a, b } = await pair();
  save(a, 'A', env('A', 'second', 1, T0 + 5000)); await a.sync.idle();
  await focus(b);
  assert.equal(saveIdOf(b.storage.data.get(K('A'))), 'second');
  assert.equal(b.storage.data.has(K('B')), false);
  assert.equal(a.server.rows.get('A')!.envelope.saveId, 'second');
  assert.equal((await b.sync.localArchive('A'))[0]!.env.saveId, 's');
});

test('a changed device still keeps both lineages', async () => {
  const { a, b } = await pair();
  save(a, 'A', env('A', 'second', 1, T0 + 5000)); await a.sync.idle();
  b.storage.data.set(K('A'), env('A', 's', 2, T0 + 6000)); await focus(b);
  assert.equal(saveIdOf(b.storage.data.get(K('A'))), 's'); assert.equal(saveIdOf(b.storage.data.get(K('B'))), 'second');
});

// ---- the app writes while a request is in flight ----
test('a save made while a pull is in flight is never overwritten', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.rows.get('A')!.envelope = JSON.parse(env('A', 's', 3, T0 + 1000)); r.server.rows.get('A')!.serverRev = 2;
  r.server.during.set('get A', () => { r.storage.data.set(K('A'), env('A', 's', 5, T0 + 9000)); });
  await focus(r);
  assert.equal(revOf(r.storage.data.get(K('A'))), 5);
  assert.equal(r.server.rows.get('A')!.envelope.saveRevision, 5);
});

test('a new save made while a remote-only slot is being fetched is kept', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.server.seed('A', env('A', 'remote', 4));
  r.server.during.set('get A', () => { r.storage.data.set(K('A'), env('A', 'fresh', 1, T0 + 9000)); });
  await focus(r);
  const ids = (['A', 'B', 'C'] as const).map((s) => saveIdOf(r.storage.data.get(K(s)))).filter(Boolean).sort();
  assert.deepEqual(ids, ['fresh', 'remote']);
});

// ---- server history and restore ----
test('restore: the chosen rung-back becomes the slot here and on the server, and other unchanged devices follow it', async () => {
  const { a, b } = await pair();
  save(a, 'A', env('A', 's', 2, T0 + 1000)); await a.sync.idle();
  save(a, 'A', env('A', 'second', 1, T0 + 2000)); await a.sync.idle();          // the server archives 's' revision 2
  await focus(b);
  const h = await a.sync.serverHistory('A');
  assert.ok(h.ok); assert.equal(h.value[0]!.saveId, 's');
  assert.deepEqual(await a.sync.restoreFromServer('A', h.value[0]!.archivedSeq), { ok: true, value: undefined });
  assert.equal(saveIdOf(a.storage.data.get(K('A'))), 's'); assert.equal(a.server.rows.get('A')!.envelope.saveId, 's');
  assert.equal((await a.sync.localArchive('A'))[0]!.env.saveId, 'second');
  await focus(b);
  assert.equal(saveIdOf(b.storage.data.get(K('A'))), 's'); assert.equal(a.server.rows.get('A')!.envelope.saveId, 's');
});

test('restore to an older revision of the same lineage is not undone by an unchanged device', async () => {
  const { a, b } = await pair();
  save(a, 'A', env('A', 's', 5, T0 + 1000)); await a.sync.idle(); await focus(b);
  a.server.rows.get('A')!.history.push(JSON.parse(env('A', 's', 2, T0 + 500)));
  assert.ok((await a.sync.restoreFromServer('A', 1)).ok);
  await focus(b);
  assert.equal(revOf(b.storage.data.get(K('A'))), 2); assert.equal(a.server.rows.get('A')!.envelope.saveRevision, 2);
});

test('restore brings a deleted save back', async () => {
  const r = rig({ [K('A')]: env('A', 's', 4) }); await r.sync.signIn('u1');
  await del(r, 'A');
  const h = await r.sync.serverHistory('A'); assert.ok(h.ok);
  assert.ok((await r.sync.restoreFromServer('A', h.value[0]!.archivedSeq)).ok);
  assert.equal(revOf(r.storage.data.get(K('A'))), 4); assert.equal(r.server.rows.get('A')!.deleted, false);
});

test('restore sends unsynced progress first, so it is kept as a rung-back', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.rows.get('A')!.history.push(JSON.parse(env('A', 'older', 7)));
  r.storage.data.set(K('A'), env('A', 's', 3, T0 + 1000));
  assert.ok((await r.sync.restoreFromServer('A', 1)).ok);
  assert.ok(r.server.rows.get('A')!.history.some((e: any) => e.saveId === 's' && e.saveRevision === 3));
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'older');
});

test('restore refuses when this slot cannot be brought up to date, and when signed out', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) });
  assert.deepEqual(await r.sync.restoreFromServer('A', 1), { ok: false, error: 'sign in first' });
  assert.deepEqual(await r.sync.serverHistory('A'), { ok: false, error: 'sign in first' });
  await r.sync.signIn('u1');
  r.server.rows.get('A')!.history.push(JSON.parse(env('A', 'older', 7)));
  r.storage.data.set(K('A'), env('A', 's', 3, T0 + 1000));
  r.server.failures.push({ type: 'transient', message: 'offline' });
  const out = await r.sync.restoreFromServer('A', 1);
  assert.equal(out.ok, false); assert.equal(revOf(r.storage.data.get(K('A'))), 3); assert.equal(r.server.calls.filter((c) => c === 'restore A').length, 0);
  r.server.failures.push({ type: 'transient', message: 'offline' });
  r.storage.data.set(K('A'), env('A', 's', 4, T0 + 2000));
  r.server.failures.length = 0;
  r.server.during.set('restore A', () => { r.server.rows.get('A')!.serverRev++; });
  assert.equal((await r.sync.restoreFromServer('A', 1)).ok, false, 'the server copy moved between the look and the restore');
});

test('a delete made while that slot is being fetched is judged against what the user saw, and nothing is re-sent', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.rows.get('A')!.envelope = JSON.parse(env('A', 's', 3, T0 + 1000)); r.server.rows.get('A')!.serverRev = 2; r.server.puts.length = 0;
  r.server.during.set('get A', () => { r.storage.data.delete(K('A')); r.sync.notifyDeleted('A'); });
  await focus(r);
  assert.deepEqual(r.server.deletes, [{ slot: 'A', base: 1 }]); assert.deepEqual(r.server.puts, []);
  assert.equal(revOf(r.storage.data.get(K('A'))), 3, 'the newer copy the user had not seen comes back');
});

test('delete of a slot the server no longer has: forgotten, and a new save there starts clean', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.rows.delete('A'); await del(r, 'A'); r.server.puts.length = 0;
  save(r, 'A', env('A', 'next', 1)); await r.sync.idle();
  assert.deepEqual(r.server.puts, [{ slot: 'A', base: null }]);
});

// ---- stats and shares ----
test('stats: finished seasons are reported before the summary is read', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 1, T0, 'season'));
  assert.deepEqual(await r.sync.stats(), { ok: true, value: { runs: 1 } });
});

test('share a slot: the newest local progress is pushed before the snapshot is taken; revoke works once', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 6, T0 + 1000));
  const s = await r.sync.shareSave('A'); assert.ok(s.ok);
  assert.equal((r.server.shares[0]!.req as any).snapshot.saveRevision, 6);
  assert.deepEqual(await r.sync.revokeShare(s.value.id), { ok: true, value: undefined });
  assert.deepEqual(await r.sync.revokeShare(s.value.id), { ok: false, error: 'no such share' });
});

test('share a finished run: it is reported first; sharing is refused when signed out or the slot is empty', async () => {
  const r = rig();
  assert.deepEqual(await r.sync.shareRun('s', 0), { ok: false, error: 'sign in first' });
  await r.sync.signIn('u1');
  assert.equal((await r.sync.shareSave('C')).ok, false);
  r.storage.data.set(K('A'), env('A', 's', 1, T0, 'season'));
  assert.ok((await r.sync.shareRun('s', 0)).ok);
  assert.ok(r.server.calls.indexOf('runs') < r.server.calls.indexOf('share'));
});

test('an expired session on an on-demand call turns sync off', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.server.failures.push({ type: 'unauthenticated' });
  assert.equal((await r.sync.stats()).ok, false);
  assert.deepEqual(r.sync.status(), { kind: 'off', reason: 'signed-out' });
});

// ---- backoff jitter ----
test('backoff is jittered: the wait lies between half and all of the doubling step', async () => {
  const r = rig({}, undefined, () => 0); await r.sync.signIn('u1');
  r.server.offline = true; save(r, 'A', env('A', 's', 1)); await r.sync.idle(); const c = r.server.calls.length;
  await r.clock.advance(499); assert.equal(r.server.calls.length, c);
  await r.clock.advance(1); await r.sync.idle(); assert.equal(r.server.calls.length, c + 1);
  await r.clock.advance(999); assert.equal(r.server.calls.length, c + 1, 'second wait is at least half of 2 s');
  await r.clock.advance(1); await r.sync.idle(); assert.equal(r.server.calls.length, c + 2);
});

// ---- account switch: only the adopted slots ever reach the new account ----
test('account switch: saves that were not imported never reach the new account, at sign-in or later', async () => {
  const r = rig({ [K('A')]: env('A', 'first-users', 1), [K('C')]: env('C', 'first-users-season', 1, T0, 'season') });
  await r.sync.signIn('u1'); r.sync.signOut();
  r.server.rows.clear(); r.server.runs.clear(); r.server.puts.length = 0; r.server.seed('A', env('A', 'second-users', 4));
  await r.sync.signIn('u2'); await r.sync.resolveAccountSwitch({ action: 'adopt', slots: [] });
  await focus(r); save(r, 'A', env('A', 'first-users', 2)); save(r, 'C', env('C', 'first-users-season', 2, T0 + 1, 'season')); await r.sync.idle(); r.sync.flush(); await r.sync.idle(); await r.sync.stats();
  assert.deepEqual(r.server.puts, []); assert.equal(r.server.runs.size, 0);
  assert.equal(r.server.rows.get('A')!.envelope.saveId, 'second-users'); assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'first-users');
  assert.deepEqual(r.sync.heldSlots(), ['A', 'C']);
  const held = { ok: false, error: 'this save belongs to another account on this device' };
  assert.deepEqual(await r.sync.shareSave('A'), held); assert.deepEqual(await r.sync.restoreFromServer('A', 1), held);
});

test('account switch: the hold survives a reload and ends when a different save takes the slot', async () => {
  const r = rig({ [K('B')]: env('B', 'first-users', 1) });
  await r.sync.signIn('u1'); r.sync.signOut(); r.server.rows.clear(); r.server.puts.length = 0;
  await r.sync.signIn('u2'); await r.sync.resolveAccountSwitch({ action: 'adopt', slots: [] });
  const again = rig({}, { server: r.server, storage: r.storage }); await again.sync.signIn('u2'); await focus(again);
  assert.deepEqual(r.server.puts, []);
  save(again, 'B', env('B', 'second-users', 1, T0 + 5)); await again.sync.idle();
  assert.equal(r.server.rows.get('B')!.envelope.saveId, 'second-users'); assert.deepEqual(again.sync.heldSlots(), []);
});

test('account switch: an imported slot syncs, the others stay on the device', async () => {
  const r = rig({ [K('A')]: env('A', 'keep-here', 1), [K('B')]: env('B', 'bring', 1) });
  await r.sync.signIn('u1'); r.sync.signOut(); r.server.rows.clear(); r.server.puts.length = 0;
  await r.sync.signIn('u2'); await r.sync.resolveAccountSwitch({ action: 'adopt', slots: ['B'] }); await focus(r);
  assert.deepEqual(r.server.puts.map((p) => p.slot), ['B']); assert.deepEqual(r.sync.heldSlots(), ['A']);
});

// ---- two devices after a fork settle instead of copying the same two saves back and forth ----
test('after "keep both", the other device follows and nothing is duplicated', async () => {
  const { a, b } = await pair();
  save(a, 'A', env('A', 'second', 1, T0 + 5000)); await a.sync.idle();
  b.storage.data.set(K('A'), env('A', 's', 2, T0 + 6000)); await focus(b);
  await focus(a); await focus(b); await focus(a);
  for (const r of [a, b]) assert.deepEqual((['A', 'B', 'C'] as const).map((s) => saveIdOf(r.storage.data.get(K(s)))), ['s', 'second', null]);
  assert.equal(a.server.rows.has('C'), false);
});

// ---- guards that only matter when something fails or races ----
test('a save written while a delete from elsewhere is being applied is kept, and pushed back', async () => {
  const { a, b } = await pair();
  await del(a, 'A');
  const write = b.storage.write;
  b.storage.write = async (k, t) => { const out = await write(k, t); if (k.startsWith('sim:nfl:sync-archive:A:')) { b.storage.write = write; b.storage.data.set(K('A'), env('A', 's', 2, T0 + 9000)); } return out; };
  await focus(b);
  assert.equal(revOf(b.storage.data.get(K('A'))), 2); assert.deepEqual(b.removed, []);
  assert.equal(a.server.rows.get('A')!.deleted, false); assert.equal(a.server.rows.get('A')!.envelope.saveRevision, 2);
});

test('a copy that already matched the server at first sign-in still follows a later delete', async () => {
  const a = rig({ [K('A')]: env('A', 's', 1) }); await a.sync.signIn('u1');
  const b = rig({ [K('A')]: env('A', 's', 1) }, { server: a.server, storage: memStorage({ [K('A')]: env('A', 's', 1) }) }); await b.sync.signIn('u1');
  await del(a, 'A'); await focus(b);
  assert.equal(b.storage.data.has(K('A')), false); assert.equal(a.server.rows.get('A')!.deleted, true);
});

test('a slot that is empty here and deleted on the server forgets what was synced there', async () => {
  const { a, b } = await pair();
  b.sync.signOut(); b.storage.data.delete(K('A')); await del(a, 'A');
  await b.sync.signIn('u1');
  assert.equal(rec(b).synced?.A, undefined); assert.equal(rec(b).serverRev.A, 2);
});

test('share is refused when the newest progress could not be sent: no stale snapshot', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 6, T0 + 1000));
  r.server.during.set('put A', () => { r.server.failures.push({ type: 'transient', message: 'offline' }); });
  assert.deepEqual(await r.sync.shareSave('A'), { ok: false, error: 'could not bring this slot up to date first; try again' });
  assert.equal(r.server.shares.length, 0);
});

// ---- a sign-in change stops everything started for the account before it ----
test('work still running when the account changes sends nothing more and leaves the sync record alone', async () => {
  for (const signOutFirst of [true, false]) {
    const r = rig(); await r.sync.signIn('u1');
    r.storage.data.set(K('A'), env('A', 'a1', 1)); r.storage.data.set(K('B'), env('B', 'b1', 1)); r.server.puts.length = 0;
    let next: Promise<unknown> | null = null;
    r.server.during.set('put A', () => { if (signOutFirst) r.sync.signOut(); next = r.sync.signIn('u2'); });
    await focus(r); await next; await r.sync.idle();
    assert.deepEqual(r.server.puts.map((p) => p.slot), ['A'], 'only the request that had already left; signOutFirst=' + signOutFirst);
    assert.equal(rec(r).userId, 'u1'); assert.equal(rec(r).serverRev.A, undefined);
    assert.deepEqual(r.sync.status(), { kind: 'needs-account-choice' });
  }
});

test('signing out while a pull is in flight leaves the slot alone', async () => {
  const r = rig(); await r.sync.signIn('u1'); r.server.seed('A', env('A', 'remote', 4));
  r.server.during.set('get A', () => { r.sync.signOut(); });
  await focus(r);
  assert.equal(r.storage.data.has(K('A')), false); assert.equal(r.sync.status().kind, 'off');
  await r.sync.signIn('u1'); assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'remote');
});

test('the transport is told which account every request is for', async () => {
  const r = rig(); await r.sync.signIn('u1'); r.sync.signOut();
  await r.sync.signIn('u2'); await r.sync.resolveAccountSwitch({ action: 'keep-separate' }); assert.deepEqual(r.server.expected, ['u1']);
  await r.sync.signIn('u2'); await r.sync.resolveAccountSwitch({ action: 'adopt', slots: [] }); assert.deepEqual(r.server.expected, ['u1', 'u2']);
});

// ---- nothing moved on the server: there is nothing to resolve ----
test('a new game over a synced one replaces it on the server instead of being treated as a fork', async () => {
  const r = rig({ [K('A')]: env('A', 'first', 3) }); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 'second', 1, T0 + 5000)); await focus(r);
  assert.equal(r.server.rows.get('A')!.envelope.saveId, 'second'); assert.deepEqual(r.server.rows.get('A')!.history.map((e: any) => e.saveId), ['first']);
  assert.equal(r.storage.data.has(K('B')), false);
});

test('an older copy put back by hand is not overwritten while the server has not moved', async () => {
  const r = rig({ [K('A')]: env('A', 's', 5, T0 + 5000) }); await r.sync.signIn('u1');
  r.storage.data.set(K('A'), env('A', 's', 2)); await focus(r);
  assert.equal(revOf(r.storage.data.get(K('A'))), 2); assert.equal(r.server.rows.get('A')!.envelope.saveRevision, 2);
  assert.equal(r.server.rows.get('A')!.history[0].saveRevision, 5);
});

// ---- the server took a write and the reply was lost ----
test('lost reply, then delete: the slot stays deleted', async () => {
  for (const before of [true, false]) {
    const r = rig(before ? { [K('A')]: env('A', 's', 1) } : {}); await r.sync.signIn('u1');
    r.server.lose.add('put A'); save(r, 'A', env('A', 's', 2, T0 + 1000)); await r.sync.idle();
    await del(r, 'A'); await focus(r);
    assert.equal(r.server.rows.get('A')!.deleted, true, String(before)); assert.equal(r.storage.data.has(K('A')), false, String(before));
  }
});

test('lost reply, then a new game and a delete while offline: the replaced game does not come back', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.server.lose.add('put A'); save(r, 'A', env('A', 'old', 1)); await r.sync.idle();
  r.server.offline = true; save(r, 'A', env('A', 'new', 1, T0 + 1000)); await r.sync.idle(); await del(r, 'A');
  const again = rig({}, { server: r.server, storage: r.storage }); r.server.offline = false; await again.sync.signIn('u1'); await focus(again);
  assert.equal(r.server.rows.get('A')!.deleted, true); assert.deepEqual([...r.storage.data.keys()].filter((k) => k.includes(':slot:')), []);
});

test('lost reply, then a new game in the slot: it replaces ours and nothing is copied into another slot', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.lose.add('put A'); save(r, 'A', env('A', 's', 2, T0 + 1000)); await r.sync.idle();
  r.storage.data.set(K('A'), env('A', 'next', 1, T0 + 2000)); await focus(r);
  assert.equal(r.server.rows.get('A')!.envelope.saveId, 'next'); assert.equal(r.storage.data.has(K('B')), false);
});

test('a write that never arrived gives no claim on a save another device put there', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.server.offline = true; save(r, 'A', env('A', 'mine', 1)); await r.sync.idle();
  r.server.seed('A', env('A', 'theirs', 1, T0 + 1000)); r.server.offline = false;
  await del(r, 'A'); await focus(r);
  assert.deepEqual(r.server.deletes, []); assert.equal(r.server.rows.get('A')!.deleted, false);
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'theirs');
});

test('lost reply on a delete, then a new save: it goes up cleanly', async () => {
  const r = rig({ [K('A')]: env('A', 's', 1) }); await r.sync.signIn('u1');
  r.server.lose.add('delete A'); await del(r, 'A');
  save(r, 'A', env('A', 'next', 1, T0 + 1000)); await r.sync.idle(); await focus(r);
  assert.equal(r.server.rows.get('A')!.envelope.saveId, 'next'); assert.equal(r.server.rows.get('A')!.deleted, false); assert.equal(r.storage.data.has(K('B')), false);
});

test('"keep both" interrupted before its last write finishes later without making a third copy', async () => {
  const { a, b } = await pair();
  save(a, 'A', env('A', 'second', 1, T0 + 5000)); await a.sync.idle();
  b.storage.data.set(K('A'), env('A', 's', 2, T0 + 6000));
  b.server.during.set('put A', () => { b.server.failures.push({ type: 'transient', message: 'offline' }); });
  await focus(b); await focus(b);
  assert.deepEqual((['A', 'B', 'C'] as const).map((s) => saveIdOf(b.storage.data.get(K(s)))), ['s', 'second', null]);
  assert.equal(b.server.rows.get('A')!.envelope.saveId, 's'); assert.equal(b.server.rows.get('B')!.envelope.saveId, 'second');
});

// ---- a failed look at the server backs off like a failed push ----
test('while the server is unreachable, whole-sync retries slow down instead of repeating every second', async () => {
  const r = rig(); await r.sync.signIn('u1');
  r.server.offline = true; r.server.calls.length = 0; await focus(r);
  await r.clock.advance(600_000); await r.sync.idle();
  assert.ok(r.server.calls.length <= 20, 'calls in ten minutes: ' + r.server.calls.length);
  assert.ok(r.server.calls.length >= 10, 'it keeps trying: ' + r.server.calls.length);
  r.server.offline = false; await r.clock.advance(60_000); await r.sync.idle();
  assert.equal(r.sync.status().kind, 'idle');
  r.server.offline = true; r.server.calls.length = 0; await focus(r); await r.clock.advance(1000); await r.sync.idle();
  assert.equal(r.server.calls.length, 2, 'after a success the waits start small again');
});

test('a server that says when to come back is obeyed for whole-sync retries', async () => {
  const r = rig(); await r.sync.signIn('u1'); r.server.calls.length = 0;
  r.server.failures.push({ type: 'transient', message: 'slow down', retryAfterSec: 60 }); await focus(r);
  await r.clock.advance(59_000); await r.sync.idle(); assert.equal(r.server.calls.length, 1);
  await r.clock.advance(1_000); await r.sync.idle(); assert.equal(r.server.calls.length, 2);
});

test('a download that fails is tried again without waiting for the user', async () => {
  const r = rig(); await r.sync.signIn('u1'); r.server.seed('A', env('A', 'remote', 4));
  r.server.during.set('get A', () => { r.server.failures.push({ type: 'transient', message: 'offline' }); });
  await focus(r); assert.equal(r.storage.data.has(K('A')), false);
  await r.clock.advance(2_000); await r.sync.idle();
  assert.equal(saveIdOf(r.storage.data.get(K('A'))), 'remote'); assert.equal(r.sync.status().kind, 'idle');
});
