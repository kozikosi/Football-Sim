import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memoryD1 } from './sqlite-d1.ts';
import type { TestDb } from './sqlite-d1.ts';
import { call, draftEnv, results, seasonEnv, W17 } from './helpers.ts';

async function seeded() {
  const db = await memoryD1();
  assert.equal((await call(db, 'alice', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 'alice-secret-lineage', 1), base: null })).status, 200);
  const season = seasonEnv('B', 'alice-season', 1, results(W17, [['Divisional', 'W'], ['Conference', 'W'], ['Super Bowl', 'W']]));
  assert.equal((await call(db, 'alice', 'POST', '/api/runs', { envelopes: [season] })).status, 200);
  const sh = await call(db, 'alice', 'POST', '/api/shares', { sport: 'nfl', kind: 'save', slot: 'A' });
  assert.equal(sh.status, 201);
  return { db, shareId: sh.json.id as string };
}

test('a second user sees an empty account: Alice\'s saves, history, runs and stats are not reachable', async () => {
  const { db } = await seeded();
  assert.deepEqual((await call(db, 'bob', 'GET', '/api/saves')).json.saves, []);
  const get = await call(db, 'bob', 'GET', '/api/saves/nfl/A');
  assert.equal(get.status, 404);
  assert.deepEqual((await call(db, 'bob', 'GET', '/api/saves/nfl/A/history')).json.history, []);
  const stats = (await call(db, 'bob', 'GET', '/api/stats')).json;
  assert.equal(stats.runs, 0); assert.equal(stats.perfectSeasons, 0);
});

test('a second user cannot write, delete or restore over Alice\'s slot, and learns nothing about it', async () => {
  const { db } = await seeded();
  const blob = (r: { json: unknown }) => JSON.stringify(r.json);
  for (const r of [
    await call(db, 'bob', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 'bob-1', 1), base: 1 }),      // guessing Alice's server_rev
    await call(db, 'bob', 'DELETE', '/api/saves/nfl/A', { base: 1 }),
    await call(db, 'bob', 'POST', '/api/saves/nfl/A/restore', { archivedSeq: 1, base: 1 }),
  ]) { assert.ok([404, 409].includes(r.status)); assert.ok(!blob(r).includes('alice')); }
  const still = await call(db, 'alice', 'GET', '/api/saves/nfl/A');
  assert.equal(still.json.envelope.saveId, 'alice-secret-lineage'); assert.equal(still.json.serverRev, 1);
  assert.equal((await db.get('SELECT COUNT(*) n FROM saves')).n, 1, 'Bob\'s attempts created no row');
});

test('Bob cannot revoke Alice\'s share link; Alice can', async () => {
  const { db, shareId } = await seeded();
  assert.equal((await call(db, 'bob', 'DELETE', '/api/shares/' + shareId)).status, 404);
  assert.equal((await call(db, 'alice', 'DELETE', '/api/shares/' + shareId)).status, 200);
});

test('no session gets 401 on every protected route, and the public share route needs none', async () => {
  const db = await memoryD1();
  for (const [m, p] of [['GET', '/api/saves'], ['GET', '/api/saves/nfl/A'], ['PUT', '/api/saves/nfl/A'], ['DELETE', '/api/saves/nfl/A'], ['GET', '/api/saves/nfl/A/history'],
    ['POST', '/api/saves/nfl/A/restore'], ['DELETE', '/api/account'], ['POST', '/api/runs'], ['GET', '/api/stats'], ['POST', '/api/shares'], ['DELETE', '/api/shares/x']] as const)
    assert.equal((await call(db, null, m, p, m === 'GET' ? undefined : {})).status, 401, m + ' ' + p);
  assert.equal((await call(db, null, 'GET', '/api/share/nope')).status, 404, 'unknown token is a 404, not a 401');
  assert.equal((await call(db, null, 'GET', '/api/health')).status, 200);
});

test('unknown routes, sports and slots are 404; /api/auth is explicitly not wired', async () => {
  const db = await memoryD1();
  assert.equal((await call(db, 'u', 'GET', '/api/nope')).status, 404);
  assert.equal((await call(db, 'u', 'GET', '/api/saves/nba/A')).status, 404);
  assert.equal((await call(db, 'u', 'GET', '/api/saves/nfl/Z')).status, 404);
  assert.equal((await call(db, null, 'GET', '/api/auth/sign-in')).status, 501);
});
