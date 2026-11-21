import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memoryD1 } from './sqlite-d1.ts';
import { call, draftEnv } from './helpers.ts';

const put = (db: ReturnType<typeof memoryD1>, user: string, slot: 'A' | 'B' | 'C', env: unknown, base: number | null) => call(db, user, 'PUT', '/api/saves/nfl/' + slot, { envelope: env, base, deviceId: 'dev-1' });

test('first write needs base null; a later write needs the base it last saw', async () => {
  const db = memoryD1();
  assert.deepEqual((await put(db, 'u1', 'A', draftEnv('A', 's1', 1), null)).json, { serverRev: 1, archived: false });
  assert.deepEqual((await put(db, 'u1', 'A', draftEnv('A', 's1', 2), 1)).json, { serverRev: 2, archived: false });
  const stale = await put(db, 'u1', 'A', draftEnv('A', 's1', 3), 1);
  assert.equal(stale.status, 409); assert.equal(stale.json.current.serverRev, 2); assert.equal(stale.json.current.saveRevision, 2);
  const never = await put(db, 'u1', 'A', draftEnv('A', 's1', 3), null);
  assert.equal(never.status, 409, 'a device that has never seen the slot cannot overwrite it');
  assert.equal((await call(db, 'u1', 'GET', '/api/saves/nfl/A')).json.envelope.saveRevision, 2, 'the losing write changed nothing');
});

test('a fork (different saveId) or a non-advancing write keeps the overwritten save as a rung-back', async () => {
  const db = memoryD1();
  await put(db, 'u1', 'A', draftEnv('A', 's1', 5), null);
  const fork = await put(db, 'u1', 'A', draftEnv('A', 's2', 1), 1);
  assert.deepEqual(fork.json, { serverRev: 2, archived: true });
  const back = await put(db, 'u1', 'A', draftEnv('A', 's2', 1), 2);   // same lineage, same revision: does not advance
  assert.equal(back.json.archived, true);
  const h = (await call(db, 'u1', 'GET', '/api/saves/nfl/A/history')).json.history;
  assert.equal(h.length, 2); assert.equal(h[1].save_id, 's1'); assert.equal(h[1].reason, 'conflict-lost');
});

test('rung-back keeps exactly three', async () => {
  const db = memoryD1();
  await put(db, 'u1', 'A', draftEnv('A', 'l0', 1), null);
  for (let i = 1; i <= 5; i++) assert.equal((await put(db, 'u1', 'A', draftEnv('A', 'l' + i, 1), i)).json.archived, true);
  const h = (await call(db, 'u1', 'GET', '/api/saves/nfl/A/history')).json.history;
  assert.deepEqual(h.map((x: any) => x.archived_seq), [5, 4, 3]);
  assert.deepEqual(h.map((x: any) => x.save_id), ['l4', 'l3', 'l2']);
});

test('a stale delete cannot erase a newer save; a good delete hides it, and the slot can be reused', async () => {
  const db = memoryD1();
  await put(db, 'u1', 'B', draftEnv('B', 's1', 1), null);
  await put(db, 'u1', 'B', draftEnv('B', 's1', 2), 1);
  assert.equal((await call(db, 'u1', 'DELETE', '/api/saves/nfl/B', { base: 1 })).status, 409);
  assert.equal((await call(db, 'u1', 'GET', '/api/saves/nfl/B')).status, 200);
  assert.equal((await call(db, 'u1', 'DELETE', '/api/saves/nfl/B', { base: 2 })).status, 200);
  assert.equal((await call(db, 'u1', 'GET', '/api/saves/nfl/B')).status, 404);
  assert.equal((await call(db, 'u1', 'GET', '/api/saves')).json.saves[0].deleted, true);
  const reuse = await put(db, 'u1', 'B', draftEnv('B', 's9', 1), 3);
  assert.deepEqual(reuse.json, { serverRev: 4, archived: false });
});

test('a save from a newer schema is refused (426), and a mismatched slot is invalid (422)', async () => {
  const db = memoryD1();
  const newer = { ...draftEnv('A', 's1', 1), schemaVersion: 99 };
  assert.equal((await put(db, 'u1', 'A', newer, null)).status, 426);
  assert.equal((await put(db, 'u1', 'B', draftEnv('A', 's1', 1), null)).status, 422);
  assert.equal((await call(db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 's1', 1), base: 0 })).status, 422, 'base must be null or an integer >= 1');
  assert.equal((await call(db, 'u1', 'GET', '/api/saves')).json.saves.length, 0, 'nothing was stored');
});

test('restore puts a rung-back into the slot and archives what it replaced', async () => {
  const db = memoryD1();
  await put(db, 'u1', 'A', draftEnv('A', 's1', 4), null);
  await put(db, 'u1', 'A', draftEnv('A', 's2', 1), 1);                    // s1 archived at seq 1
  const r = await call(db, 'u1', 'POST', '/api/saves/nfl/A/restore', { archivedSeq: 1, base: 2 });
  assert.deepEqual(r.json, { serverRev: 3, archived: true });
  assert.equal((await call(db, 'u1', 'GET', '/api/saves/nfl/A')).json.envelope.saveId, 's1');
  const h = (await call(db, 'u1', 'GET', '/api/saves/nfl/A/history')).json.history;
  assert.equal(h[0].save_id, 's2'); assert.equal(h[0].reason, 'restored-over');
  assert.equal((await call(db, 'u1', 'POST', '/api/saves/nfl/A/restore', { archivedSeq: 99, base: 3 })).status, 404);
});
