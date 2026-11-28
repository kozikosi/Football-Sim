// Processor-time guards. The Workers free plan allows 10 ms per request, so work that grows with save size, or repeats per request, is kept out.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { memoryD1 } from './sqlite-d1.ts';
import { call, draftEnv } from './helpers.ts';
import { authFor } from '../src/auth.ts';
import type { D1Like, D1Stmt } from '../src/d1.ts';

// Records every row the database hands back to the Worker that carries a save's text.
function watched(db: D1Like): { db: D1Like; loaded: string[] } {
  const loaded: string[] = [];
  const raw = new WeakMap<D1Stmt, D1Stmt>();
  const wrap = (s: D1Stmt, sql: string): D1Stmt => {
    const note = (rows: unknown[]) => { for (const r of rows) if (r && typeof r === 'object' && 'envelope' in r) loaded.push(sql); };
    const w: D1Stmt = {
      bind: (...v) => wrap(s.bind(...v), sql),
      first: async <T>() => { const r = await s.first<T>(); note([r]); return r; },
      all: async <T>() => { const r = await s.all<T>(); note(r.results); return r; },
      run: () => s.run(),
    };
    raw.set(w, s);
    return w;
  };
  return { db: { prepare: (sql) => wrap(db.prepare(sql), sql), batch: (stmts) => db.batch(stmts.map((s) => raw.get(s)!)) }, loaded };
}

test('only a download reads the save text back; listing, uploading, refusing and deleting do not', async () => {
  const w = watched(await memoryD1());
  const put = (rev: number, base: number | null, id = 's1') => call(w.db, 'u1', 'PUT', '/api/saves/nfl/A', { envelope: draftEnv('A', id, rev), base });
  assert.equal((await put(1, null)).status, 200);
  assert.equal((await put(2, 1)).status, 200);
  assert.equal((await put(1, 2, 's2')).status, 200);                       // a fork: archives inside the database
  assert.equal((await put(3, 1)).status, 409);                             // stale
  assert.equal((await put(3, null)).status, 409);                          // never seen
  const list = await call(w.db, 'u1', 'GET', '/api/saves');
  assert.deepEqual(list.json.saves.map((s: any) => [s.slot, s.saveId, s.serverRev, s.deleted]), [['A', 's2', 3, false]]);
  assert.equal((await call(w.db, 'u1', 'DELETE', '/api/saves/nfl/A', { base: 2 })).status, 409);
  assert.equal((await call(w.db, 'u1', 'DELETE', '/api/saves/nfl/A', { base: 3 })).status, 200);
  assert.deepEqual(w.loaded, []);
  assert.equal((await put(4, 4, 's2')).status, 200);
  const got = await call(w.db, 'u1', 'GET', '/api/saves/nfl/A');
  assert.equal(got.json.envelope.saveRevision, 4);
  assert.equal(w.loaded.length, 1, 'the download is the one read of the text');
});

test('the sign-in library is built once per environment, not once per request', async () => {
  const stmt = { bind: () => stmt, first: async () => null, all: async () => ({ results: [], meta: {} }), run: async () => ({ results: [], meta: {} }) };
  const env = { DB: { prepare: () => stmt, batch: async () => [], exec: async () => ({}) }, BASE_URL: 'https://play.76pancakes.workers.dev', BETTER_AUTH_SECRET: 'x'.repeat(40), GITHUB_CLIENT_ID: 'g', GITHUB_CLIENT_SECRET: 's' };
  const first = await authFor(env);
  assert.equal(await authFor(env), first);
  assert.notEqual(await authFor({ ...env, BASE_URL: 'https://other.example' }), first, 'a different environment gets its own');
});
