// Deliberate breakages: each edits one source file, runs the suite, and must make it FAIL. A surviving mutant means a missing test.
// Run: node --experimental-strip-types scripts/mutation-check.ts   (add D1_BACKEND=miniflare to include the workerd tests)
// Files are restored from memory afterwards, even on a crash. Add a mutant by appending to MUTANTS (the `from` text must occur exactly once).
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

type M = { name: string; file: string; from: string; to: string };
const MUTANTS: M[] = [
  { name: 'legend weights swapped', file: 'src/api.ts', from: 'x.titles * 100 + x.playoffs * 10', to: 'x.titles * 10 + x.playoffs * 100' },
  { name: 'account delete skips shares', file: 'src/store.ts', from: "db.prepare('DELETE FROM shares WHERE user_id = ?').bind(userId),", to: '' },
  { name: 'account delete skips sessions', file: 'src/store.ts', from: "db.prepare('DELETE FROM \"session\" WHERE \"userId\" = ?').bind(userId),", to: '' },
  { name: 'account delete hits every other user', file: 'src/store.ts', from: 'DELETE FROM "user" WHERE "id" = ?', to: 'DELETE FROM "user" WHERE "id" <> ?' },
  { name: 'account delete needs no confirm', file: 'src/api.ts', from: 'if (b.body.confirm !== true) return', to: 'if (false) return' },
  { name: 'purge ignores the 30-day cutoff on saves', file: 'src/store.ts', from: 'DELETE FROM saves WHERE deleted_at IS NOT NULL AND deleted_at < ?', to: 'DELETE FROM saves WHERE deleted_at IS NOT NULL AND deleted_at < ? OR 1' },
  { name: 'purge leaves history behind', file: 'src/store.ts', from: "db.prepare('DELETE FROM save_history WHERE EXISTS", to: "db.prepare('DELETE FROM save_history WHERE 0 AND EXISTS" },
  { name: 'another account\'s cookie accepted', file: 'src/api.ts', from: 'if (expected !== null && expected !== userId)', to: 'if (false)' },
  { name: 'delete keeps no rung-back', file: 'src/store.ts', from: "...keepRungBack(sport, slot, cur.server_rev, 'deleted', now),", to: '' },
  { name: 'purge deletes unexpired shares', file: 'src/store.ts', from: '(expires_at IS NOT NULL AND expires_at < ?)', to: '(expires_at IS NOT NULL)' },
];

const orig = new Map<string, string>();
const restore = () => { for (const [f, s] of orig) writeFileSync(f, s); };
process.on('exit', restore);
let survived = 0;
for (const m of MUTANTS) {
  const src = orig.get(m.file) ?? readFileSync(m.file, 'utf8'); orig.set(m.file, src);
  const n = src.split(m.from).length - 1;
  if (n !== 1) { console.log(`SKIP  ${m.name}: pattern occurs ${n} times (source changed?)`); survived++; continue; }
  writeFileSync(m.file, src.replace(m.from, () => m.to));
  const r = spawnSync('npm', ['test', '--silent'], { encoding: 'utf8' });
  writeFileSync(m.file, src);
  const killed = r.status !== 0;
  console.log(`${killed ? 'killed  ' : 'SURVIVED'} ${m.name}`);
  if (!killed) survived++;
}
console.log(survived ? `${survived} mutant(s) survived or were skipped` : `all ${MUTANTS.length} mutants killed`);
process.exit(survived ? 1 : 0);
