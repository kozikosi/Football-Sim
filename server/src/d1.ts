// The slice of Cloudflare D1's API this Worker uses. Real D1 satisfies it; tests use test/sqlite-d1.ts.
export interface D1Result<T = unknown> { results: T[]; meta: { changes: number } }
export interface D1Stmt {
  bind(...values: unknown[]): D1Stmt;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}
export interface D1Like { prepare(sql: string): D1Stmt; batch(stmts: D1Stmt[]): Promise<D1Result[]> }
