import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { memoryD1 } from './sqlite-d1.ts';
import type { TestDb } from './sqlite-d1.ts';
import { call, draftEnv, results, seasonEnv, T0, W17 } from './helpers.ts';

test('a share token reads one snapshot, read-only; the token is never stored; no email or user id leaks', async () => {
  const db = await memoryD1();
  await call(db, 'alice@example.com', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 'lineage-1', 1), base: null });
  await call(db, 'alice@example.com', 'PUT', '/api/saves/nfl/B', { envelope: draftEnv('B', 'lineage-2', 1), base: null });
  const mk = await call(db, 'alice@example.com', 'POST', '/api/shares', { sport: 'nfl', kind: 'save', slot: 'A' });
  const { token } = mk.json;
  assert.match(token, /^[0-9a-f]{32}$/);
  const got = await call(db, null, 'GET', '/api/share/' + token);
  assert.equal(got.status, 200); assert.equal(got.json.snapshot.saveId, 'lineage-1');
  assert.ok(!JSON.stringify(got.json).includes('alice'), 'no user id or email in the public response');
  await call(db, 'alice@example.com', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 'lineage-1', 9), base: 1 });
  assert.equal((await call(db, null, 'GET', '/api/share/' + token)).json.snapshot.saveRevision, 1, 'a snapshot does not follow later saves');
  for (const m of ['PUT', 'POST', 'DELETE', 'PATCH']) assert.equal((await call(db, null, m, '/api/share/' + token, {})).status, 403, m);
  const dump = JSON.stringify(await db.all('SELECT * FROM shares'));
  assert.ok(!dump.includes(token), 'only the hash of the token is stored');
  assert.equal((await call(db, null, 'GET', '/api/share/' + 'f'.repeat(32))).status, 404, 'another token reads nothing');
});

test('a revoked or expired link is gone (410)', async () => {
  const db = await memoryD1();
  await call(db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 's', 1), base: null });
  const a = (await call(db, 'u1', 'POST', '/api/shares', { sport: 'nfl', kind: 'save', slot: 'A' })).json;
  const b = (await call(db, 'u1', 'POST', '/api/shares', { sport: 'nfl', kind: 'save', slot: 'A' })).json;
  await call(db, 'u1', 'DELETE', '/api/shares/' + a.id);
  assert.equal((await call(db, null, 'GET', '/api/share/' + a.token)).status, 410);
  const later = new Date(T0.getTime() + 91 * 86400000);
  assert.equal((await call(db, null, 'GET', '/api/share/' + b.token, undefined, later)).status, 410);
});

test('a run share exposes the result line only', async () => {
  const db = await memoryD1();
  await call(db, 'u1', 'POST', '/api/runs', { envelopes: [seasonEnv('A', 'r1', 1, results(W17, [['Divisional', 'W'], ['Conference', 'W'], ['Super Bowl', 'W']]), { run: 4 })] });
  const mk = await call(db, 'u1', 'POST', '/api/shares', { sport: 'nfl', kind: 'run', saveId: 'r1', run: 4 });
  const got = (await call(db, null, 'GET', '/api/share/' + mk.json.token)).json;
  assert.deepEqual(got.snapshot, { franchise: 'Me', year: 2026, outcome: 'champion', w: 17, l: 0, t: 0, pf: 510, pa: 170 + 0, undefeated: true, perfect: true }, 'only the result line');
});

test('caps: 257 KB envelope is 413; the 5,001st run and 21st share are 429', async () => {
  const db = await memoryD1();
  let n = 3000, big = draftEnv('A', 's', 1, n);
  while (JSON.stringify(big).length <= 256 * 1024) big = draftEnv('A', 's', 1, ++n);   // just over the envelope cap, still under the body cap: the envelope check itself is what refuses it
  assert.ok(JSON.stringify(big).length < 260 * 1024);
  assert.equal((await call(db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: big, base: null })).status, 413);
  const ok = draftEnv('A', 's', 1, 1000);
  assert.ok(JSON.stringify(ok).length < 256 * 1024);
  assert.equal((await call(db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: ok, base: null })).status, 200);

  await db.run("WITH RECURSIVE n(i) AS (SELECT 0 UNION ALL SELECT i + 1 FROM n WHERE i < 4999) INSERT INTO runs SELECT 'u1','nfl','bulk' || i,0,'Me',2026,'champion',1,0,0,1,0,0,0,NULL,'e','d','t','{}' FROM n");
  assert.equal((await call(db, 'u1', 'POST', '/api/runs', { envelopes: [seasonEnv('A', 'one-more', 1, results(W17, [['Divisional', 'L']]))] })).status, 429);

  for (let i = 0; i < 20; i++) assert.equal((await call(db, 'u1', 'POST', '/api/shares', { sport: 'nfl', kind: 'save', slot: 'A' })).status, 201);
  assert.equal((await call(db, 'u1', 'POST', '/api/shares', { sport: 'nfl', kind: 'save', slot: 'A' })).status, 429);
});

test('the daily D1 free limit becomes 503 sync-paused with Retry-After, not a 500', async () => {
  const db = await memoryD1();
  db.failWith("Your account has exceeded D1's free tier daily row write limit. Upgrade to a paid plan or wait until tomorrow (midnight UTC) to continue.");
  const r = await call(db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 's', 1), base: null });
  assert.equal(r.status, 503); assert.equal(r.json.error, 'sync-paused');
  assert.equal(r.headers.get('retry-after'), String(12 * 3600));   // T0 is noon UTC
  db.failWith('some other database failure');
  assert.equal((await call(db, 'u1', 'GET', '/api/saves')).status, 500);
});

test('one door: SQL on our four tables and Better Auth\'s four exists only in src/store.ts, and nothing else prepares a statement', () => {
  const dir = new URL('../src/', import.meta.url);
  const sql = /\b(FROM|INTO|UPDATE|JOIN)\s+"?(saves|save_history|runs|shares|user|session|account|verification)"?\b/i;
  const offenders: string[] = [];
  for (const f of readdirSync(dir)) {
    if (f === 'store.ts') continue;
    const text = readFileSync(new URL(f, dir), 'utf8');
    if (sql.test(text) || (/\.prepare\(/.test(text) && f !== 'd1.ts')) offenders.push(f);
  }
  assert.deepEqual(offenders, []);
  assert.ok(sql.test(readFileSync(new URL('store.ts', dir), 'utf8')), 'the checker can see store.ts SQL (it is not vacuous)');
});
