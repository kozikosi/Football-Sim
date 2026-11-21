// Test database for the Worker logic. Two backends behind one interface, chosen by D1_BACKEND:
//   (default)           a D1-shaped adapter over node:sqlite: fast, but NOT real D1 (no D1 limits, latency or error strings).
//   D1_BACKEND=miniflare Miniflare's D1 (workerd + SQLite as Cloudflare runs it locally): the same suite, a closer stand-in. Still not production D1.
// Tests use only prepare/batch (via the Worker) plus get/all/run for direct inspection, so they run unchanged on both.
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { after } from 'node:test';
import type { D1Like, D1Result, D1Stmt } from '../src/d1.ts';

export interface TestDb extends D1Like {
  backend: 'sqlite' | 'miniflare';
  get<T = Record<string, any>>(sql: string, ...p: unknown[]): Promise<T>;
  all<T = Record<string, any>>(sql: string, ...p: unknown[]): Promise<T[]>;
  run(sql: string, ...p: unknown[]): Promise<void>;
  failWith(msg: string | null): void;
  /** Sum of rows_written reported by the backend (Miniflare only; null on the sqlite adapter). */
  rowsWritten(): number | null;
}
const migrationStatements = (): string[] => readFileSync(new URL('../migrations/0001_init.sql', import.meta.url), 'utf8').split(/;\s*\n/).map((s) => s.replace(/^(\s*--.*\n)+/g, '').trim()).filter(Boolean);

export async function memoryD1(): Promise<TestDb> {
  let fail: string | null = null, written = 0;
  const guard = () => { if (fail) throw new Error(fail); };
  const note = (r: any) => { if (r && r.meta && typeof r.meta.rows_written === 'number') written += r.meta.rows_written; return r; };
  let inner: D1Like;
  let backend: TestDb['backend'] = 'sqlite';
  if (process.env.D1_BACKEND === 'miniflare') {
    const { Miniflare } = await import('miniflare');
    const mf = new Miniflare({ modules: true, script: 'export default { fetch() { return new Response("ok") } }', d1Databases: { DB: 'test-' + Math.random().toString(36).slice(2) } });
    after(async () => { await mf.dispose(); });
    inner = (await mf.getD1Database('DB')) as unknown as D1Like;
    for (const s of migrationStatements()) await inner.prepare(s).run();
    backend = 'miniflare';
    written = 0;
  } else {
    const raw = new DatabaseSync(':memory:');
    raw.exec(readFileSync(new URL('../migrations/0001_init.sql', import.meta.url), 'utf8'));
    const stmt = (sql: string, params: unknown[] = []): D1Stmt => ({
      bind: (...v: unknown[]) => stmt(sql, v),
      first: async <T>() => ((raw.prepare(sql).get(...(params as never[])) as T | undefined) ?? null),
      all: async <T>() => ({ results: raw.prepare(sql).all(...(params as never[])) as T[], meta: { changes: 0 } }) as D1Result<T>,
      run: async () => ({ results: [], meta: { changes: Number(raw.prepare(sql).run(...(params as never[])).changes) } }),
    });
    inner = {
      prepare: (sql) => stmt(sql),
      batch: async (list) => {
        raw.exec('BEGIN');
        try { const out: D1Result[] = []; for (const s of list) out.push(await s.run()); raw.exec('COMMIT'); return out; }
        catch (e) { raw.exec('ROLLBACK'); throw e; }
      },
    };
  }
  // One wrapper for both: failure injection and write accounting. Statement bodies are the backend's own.
  const wrap = (sql: string, params: unknown[]): D1Stmt => {
    const s = () => inner.prepare(sql).bind(...params);
    const o: any = {
      bind: (...v: unknown[]) => wrap(sql, v),
      first: async <T>() => { guard(); return s().first<T>(); },
      all: async <T>() => { guard(); return note(await s().all<T>()); },
      run: async () => { guard(); return note(await s().run()); },
    };
    o.__sql = sql; o.__params = params;
    return o as D1Stmt;
  };
  const db: TestDb = {
    backend,
    prepare: (sql) => wrap(sql, []),
    batch: async (list) => {
      guard();
      // Rebuild each wrapped statement on the backend so batch stays atomic there.
      const real = list.map((st) => { const x = st as any; return inner.prepare(x.__sql).bind(...(x.__params ?? [])); });
      return (await inner.batch(real)).map(note);
    },
    get: async (sql, ...p) => (await inner.prepare(sql).bind(...p).first()) as any,
    all: async (sql, ...p) => (await inner.prepare(sql).bind(...p).all()).results as any,
    run: async (sql, ...p) => { await inner.prepare(sql).bind(...p).run(); },
    failWith: (m) => { fail = m; },
    rowsWritten: () => (backend === 'miniflare' ? written : null),
  };
  return db;
}
