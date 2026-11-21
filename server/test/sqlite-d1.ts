// A D1-shaped adapter over node:sqlite so the Worker logic runs in node:test. It is NOT real D1: D1's limits, latency and error strings
// are not reproduced, and batch() is emulated with BEGIN/COMMIT. The real-D1 (Miniflare) run is a rehearsal gate.
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import type { D1Like, D1Result, D1Stmt } from '../src/d1.ts';

export function memoryD1(): D1Like & { raw: DatabaseSync; failWith: (msg: string | null) => void } {
  const raw = new DatabaseSync(':memory:');
  raw.exec(readFileSync(new URL('../migrations/0001_init.sql', import.meta.url), 'utf8'));
  let fail: string | null = null;
  const stmt = (sql: string, params: unknown[] = []): D1Stmt => ({
    bind: (...v: unknown[]) => stmt(sql, v),
    first: async <T>() => { if (fail) throw new Error(fail); return (raw.prepare(sql).get(...(params as never[])) as T | undefined) ?? null; },
    all: async <T>() => { if (fail) throw new Error(fail); return { results: raw.prepare(sql).all(...(params as never[])) as T[], meta: { changes: 0 } } as D1Result<T>; },
    run: async () => { if (fail) throw new Error(fail); const r = raw.prepare(sql).run(...(params as never[])); return { results: [], meta: { changes: Number(r.changes) } }; },
  });
  return {
    raw,
    failWith: (m) => { fail = m; },
    prepare: (sql) => stmt(sql),
    batch: async (list) => {
      if (fail) throw new Error(fail);
      raw.exec('BEGIN');
      try { const out: D1Result[] = []; for (const s of list) out.push(await s.run()); raw.exec('COMMIT'); return out; }
      catch (e) { raw.exec('ROLLBACK'); throw e; }
    },
  };
}
