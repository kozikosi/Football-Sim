import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memoryD1 } from './sqlite-d1.ts';
import { purgeExpired } from '../src/store.ts';
import { call, draftEnv } from './helpers.ts';

const DAY = 86400000;
test('purge removes saves soft-deleted 30+ days ago (and their history), never a recent delete or a live save', async () => {
  const db = await memoryD1();
  // A: old delete (with a rung-back from a fork). B: recent delete. C: live.
  await call(db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 'a1', 1), base: null });
  await call(db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', 'a2', 1), base: 1 });
  await call(db, 'u1', 'PUT', '/api/saves/nfl/B', { envelope: draftEnv('B', 'b1', 1), base: null });
  await call(db, 'u1', 'PUT', '/api/saves/nfl/C', { envelope: draftEnv('C', 'c1', 1), base: null });
  const rev = async (s: string) => (await db.get('SELECT server_rev r FROM saves WHERE slot = ?', s)).r as number;
  await call(db, 'u1', 'DELETE', '/api/saves/nfl/A', { base: await rev('A') });
  await call(db, 'u1', 'DELETE', '/api/saves/nfl/B', { base: await rev('B') });
  const now = new Date('2026-12-31T00:00:00Z');
  await db.run('UPDATE saves SET deleted_at = ? WHERE slot = ?', new Date(now.getTime() - 31 * DAY).toISOString(), 'A');
  await db.run('UPDATE saves SET deleted_at = ? WHERE slot = ?', new Date(now.getTime() - 29 * DAY).toISOString(), 'B');
  assert.equal((await db.get('SELECT COUNT(*) n FROM save_history WHERE slot = ?', 'A')).n, 2, 'the fork rung-back and the deleted save');

  const out = await purgeExpired(db, now);
  assert.deepEqual(out, { saves: 1, history: 2, shares: 0 });
  assert.deepEqual((await db.all('SELECT slot FROM saves ORDER BY slot')).map((r: any) => r.slot), ['B', 'C']);
  assert.deepEqual((await db.all('SELECT slot, reason FROM save_history')).map((r: any) => [r.slot, r.reason]), [['B', 'deleted']], 'a recent delete keeps its copy');
  assert.deepEqual(await purgeExpired(db, now), { saves: 0, history: 0, shares: 0 }, 'idempotent');
});

test('purge removes share links expired or revoked 30+ days ago, and keeps live and recent ones', async () => {
  const db = await memoryD1();
  const ins = (id: string, exp: string | null, rev: string | null) => db.run('INSERT INTO shares (id, user_id, token_hash, sport, kind, created_at, expires_at, revoked_at, snapshot) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', id, 'u1', 'h' + id, 'nfl', 'run', '2026-01-01T00:00:00Z', exp, rev, '{}');
  await ins('old-expired', '2026-10-01T00:00:00Z', null);
  await ins('old-revoked', null, '2026-10-01T00:00:00Z');
  await ins('recent-expired', '2026-12-15T00:00:00Z', null);
  await ins('live', '2027-03-01T00:00:00Z', null);
  assert.equal((await purgeExpired(db, new Date('2026-12-31T00:00:00Z'))).shares, 2);
  assert.deepEqual((await db.all('SELECT id FROM shares ORDER BY id')).map((r: any) => r.id), ['live', 'recent-expired']);
});
