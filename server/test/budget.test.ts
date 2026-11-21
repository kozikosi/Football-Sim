// Measures rows_written per operation as Miniflare's D1 reports it (the unit D1 bills and limits on the free plan: 100,000/day).
// Runs only with D1_BACKEND=miniflare; on the sqlite adapter there is nothing real to measure, so it is skipped, not faked.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memoryD1 } from './sqlite-d1.ts';
import { call, draftEnv, results, seasonEnv, W17 } from './helpers.ts';

const live = process.env.D1_BACKEND === 'miniflare';
async function cost(db: Awaited<ReturnType<typeof memoryD1>>, f: () => Promise<unknown>): Promise<number> {
  const before = db.rowsWritten()!; await f(); return db.rowsWritten()! - before;
}

test('rows written per operation stay within the contract budget', { skip: !live && 'needs D1_BACKEND=miniflare' }, async () => {
  const db = await memoryD1();
  const put = (e: unknown, base: number | null) => call(db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: e, base });
  const m: Record<string, number> = {};
  m.firstSave = await cost(db, () => put(draftEnv('A', 's1', 1), null));
  m.ordinarySave = await cost(db, () => put(draftEnv('A', 's1', 2), 1));
  m.forkWithArchive = await cost(db, () => put(draftEnv('A', 's2', 1), 2));
  m.staleConflict = await cost(db, () => put(draftEnv('A', 's2', 2), 1));
  m.run = await cost(db, () => call(db, 'u1', 'POST', '/api/runs', { envelopes: [seasonEnv('B', 'r1', 1, results(W17, [['Divisional', 'L']]))] }));
  m.runReplay = await cost(db, () => call(db, 'u1', 'POST', '/api/runs', { envelopes: [seasonEnv('B', 'r1', 1, results(W17, [['Divisional', 'L']]))] }));
  m.share = await cost(db, () => call(db, 'u1', 'POST', '/api/shares', { sport: 'nfl', kind: 'save', slot: 'A' }));
  console.log('rows_written per operation (Miniflare D1):', JSON.stringify(m));
  assert.ok(m.ordinarySave <= 2, 'an ordinary save is one row, plus at most one for the row itself');
  assert.equal(m.staleConflict, 0, 'a refused write writes nothing');
  assert.ok(m.forkWithArchive <= 6);
  assert.ok(m.run <= 3);
  assert.equal(m.runReplay, 0, 'a replayed run writes nothing');
});
