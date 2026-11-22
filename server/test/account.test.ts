import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memoryD1 } from './sqlite-d1.ts';
import type { TestDb } from './sqlite-d1.ts';
import { call, draftEnv, results, seasonEnv, W17 } from './helpers.ts';

const TABLES = ['saves', 'save_history', 'runs', 'shares', '"session"', '"account"', '"user"'];
const OWNER: Record<string, string> = { saves: 'user_id', save_history: 'user_id', runs: 'user_id', shares: 'user_id', '"session"': '"userId"', '"account"': '"userId"', '"user"': '"id"' };
const count = async (db: TestDb, t: string, u: string) => (await db.get(`SELECT COUNT(*) n FROM ${t} WHERE ${OWNER[t]} = ?`, u)).n as number;
const snapshot = async (db: TestDb, u: string) => Object.fromEntries(await Promise.all(TABLES.map(async (t) => [t, await count(db, t, u)])));

async function seedUser(db: TestDb, u: string) {
  const ts = '2026-11-21T00:00:00.000Z';
  await db.run('INSERT INTO "user" (id, name, email, emailVerified, createdAt, updatedAt) VALUES (?, ?, ?, 1, ?, ?)'.replace('emailVerified', '"emailVerified"').replace('createdAt', '"createdAt"').replace('updatedAt', '"updatedAt"'), u, u, u + '@example.com', ts, ts);
  await db.run('INSERT INTO "session" (id, "expiresAt", token, "createdAt", "updatedAt", "userId") VALUES (?, ?, ?, ?, ?, ?)', 's-' + u, ts, 'tok-' + u, ts, ts, u);
  await db.run('INSERT INTO "account" (id, "accountId", "providerId", "userId", "createdAt", "updatedAt") VALUES (?, ?, ?, ?, ?, ?)', 'a-' + u, 'gh-' + u, 'github', u, ts, ts);
  await call(db, u, 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', u + '-1', 1), base: null });
  await call(db, u, 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', u + '-2', 1), base: 1 });          // a fork: leaves a rung-back
  await call(db, u, 'POST', '/api/runs', { envelopes: [seasonEnv('B', u + '-r', 1, results(W17, [['Divisional', 'L']]))] });
  return (await call(db, u, 'POST', '/api/shares', { sport: 'nfl', kind: 'save', slot: 'A' })).json.token as string;
}

test('deleting an account removes every row the user owns, in all seven tables, and nothing of anyone else\'s', async () => {
  const db = await memoryD1();
  const tokenA = await seedUser(db, 'alice'), tokenB = await seedUser(db, 'bob');
  const before = await snapshot(db, 'alice');
  assert.ok(Object.values(before).every((n) => n >= 1), 'every table has an Alice row to delete: ' + JSON.stringify(before));
  const bobBefore = await snapshot(db, 'bob');

  const r = await call(db, 'alice', 'DELETE', '/api/account', { confirm: true });
  assert.equal(r.status, 200);
  assert.deepEqual(r.json.deleted, { shares: 1, runs: 1, history: 1, saves: 1, sessions: 1, accounts: 1, users: 1 });
  assert.deepEqual(Object.values(await snapshot(db, 'alice')), TABLES.map(() => 0));
  assert.deepEqual(await snapshot(db, 'bob'), bobBefore, "Bob's data is exactly as it was");
  assert.equal((await call(db, null, 'GET', '/api/share/' + tokenA)).status, 404, "Alice's public link died with her account");
  assert.equal((await call(db, null, 'GET', '/api/share/' + tokenB)).status, 200, "Bob's link still works");
  assert.equal((await call(db, 'bob', 'GET', '/api/saves/nfl/A')).status, 200);
});

test('it needs an explicit confirm, deletes nothing without one, and is safe to repeat', async () => {
  const db = await memoryD1();
  await seedUser(db, 'alice');
  const before = await snapshot(db, 'alice');
  for (const body of [{}, { confirm: 'yes' }, { confirm: false }]) assert.equal((await call(db, 'alice', 'DELETE', '/api/account', body)).status, 422);
  assert.deepEqual(await snapshot(db, 'alice'), before);
  assert.equal((await call(db, 'alice', 'DELETE', '/api/account', { confirm: true })).status, 200);
  const again = await call(db, 'alice', 'DELETE', '/api/account', { confirm: true });
  assert.equal(again.status, 200); assert.deepEqual(Object.values(again.json.deleted), [0, 0, 0, 0, 0, 0, 0]);
});

test('a database failure deletes nothing (the batch is all or nothing)', async () => {
  const db = await memoryD1();
  await seedUser(db, 'alice');
  const before = await snapshot(db, 'alice');
  db.failWith('some database failure');
  assert.equal((await call(db, 'alice', 'DELETE', '/api/account', { confirm: true })).status, 500);
  db.failWith(null);
  assert.deepEqual(await snapshot(db, 'alice'), before);
});
