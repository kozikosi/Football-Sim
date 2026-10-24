#!/usr/bin/env node
// tools/council-sync.mjs — the council's "tail": new bulletin entries from EVERY seat branch, without a shared tree.
//   node tools/council-sync.mjs [--days 3] [--full]
// Entries are files bulletin/<UTC yyyymmdd-hhmm>-<seat>.md (one per session, written on the seat's own branch).
// Reads origin/council/base and every origin/council/* branch; prints entries not older than N days, newest last.
// Read-only (fetch only). Also lists each seat branch's tip so you can see who has pushed and when.
import { execFileSync } from 'node:child_process';
const args = process.argv.slice(2);
const days = Number(args[args.indexOf('--days') + 1]) || 3;
const full = args.includes('--full');
const g = (...a) => { try { return execFileSync('git', a, { encoding: 'utf8', maxBuffer: 1 << 26, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
g('fetch', '-q', 'origin', '+refs/heads/council/*:refs/remotes/origin/council/*');
const refs = g('for-each-ref', '--format=%(refname:short)', 'refs/remotes/origin/council').split('\n').filter(Boolean);
const cutoff = Date.now() - days * 864e5;
const seen = new Map();
for (const ref of refs) {
  for (const f of g('ls-tree', '-r', '--name-only', ref, '--', 'bulletin/').split('\n').filter(Boolean)) {
    const m = f.match(/bulletin\/(\d{8})-(\d{4})-([a-z0-9-]+)\.md$/);
    if (!m) continue;
    const t = Date.UTC(+m[1].slice(0, 4), +m[1].slice(4, 6) - 1, +m[1].slice(6, 8), +m[2].slice(0, 2), +m[2].slice(2, 4));
    if (t >= cutoff && !seen.has(f)) seen.set(f, { t, ref, seat: m[3] });
  }
}
console.log(`seat branches (${refs.length}):`);
for (const r of refs) console.log(`  ${r.padEnd(34)} ${g('log', '-1', '--format=%cr  %h %s', r).slice(0, 90)}`);
console.log(`\nentries from the last ${days} day(s): ${seen.size}\n`);
for (const [f, v] of [...seen].sort((a, b) => a[1].t - b[1].t)) {
  const body = g('show', `${v.ref}:${f}`).split('\n');
  console.log(`--- ${f}  [${v.ref}]`);
  console.log((full ? body : body.slice(0, 12)).join('\n') + (!full && body.length > 12 ? `\n... (${body.length - 12} more lines; --full)` : '') + '\n');
}
