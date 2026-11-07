#!/usr/bin/env node
// _agents/beam/tools/council-telemetry.mjs
// Council telemetry: per-seat review catch rates from inbox review files.
// Reads all council/* and architect/* branches' inbox/*.md, extracts REVIEW-OF + VERDICT + FOUND/NEW.
// Usage: node council-telemetry.mjs [--days 7]  (default all)
import { execFileSync } from 'node:child_process';

function g(...a) { try { return execFileSync('git', a, { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore','pipe','ignore'] }).trim(); } catch { return ''; } }

const refs = g('for-each-ref', '--format=%(refname:short)', 'refs/remotes/origin/council', 'refs/remotes/origin/architect').split('\n').filter(Boolean);
const hdr = (txt, k) => ((txt.match(new RegExp('^' + k + ':\\s*(.+)$', 'im')) || [])[1] || '').trim();
const stamp = (name) => { const m = name.match(/(\d{8})-(\d{4})-/); return m ? Date.UTC(+m[1].slice(0,4), +m[1].slice(4,6)-1, +m[1].slice(6,8), +m[2].slice(0,2), +m[2].slice(2,4)) : 0; };

const rows = [];
const seen = new Set();
for (const ref of refs) {
  const seatOf = (n) => (/^origin\/architect\//.test(ref) ? 'architect' : ref.replace('origin/council/', ''));
  for (const f of g('ls-tree', '-r', '--name-only', ref, '--', 'inbox/').split('\n').filter((x) => /^inbox\/\d{8}-\d{4}-.+\.md$/.test(x))) {
    if (seen.has(f)) continue; seen.add(f);
    const head = g('show', `${ref}:${f}`).split('\n').slice(0, 16).join('\n');
    if (!/^REVIEW-OF:/im.test(head)) continue;
    const reviewOf = hdr(head, 'REVIEW-OF');
    const verdict = (hdr(head, 'VERDICT').match(/ok|improved|rejected/i) || [''])[0].toLowerCase();
    const foundM = hdr(head, 'FOUND').match(/^\d+/);
    const newM = hdr(head, 'NEW').match(/^\d+/);
    let found = foundM ? +foundM[0] : null;
    let neu = newM ? +newM[0] : null;
    if (found === null && neu === null) { found = verdict === 'ok' || !verdict ? 0 : 1; neu = found; }
    else if (neu === null) neu = found; else if (found === null) found = neu;
    if (found > 0) neu = Math.min(neu, found);
    const m = f.match(/^inbox\/\d{8}-\d{4}-([a-z0-9]+)-/);
    const seat = (m && m[1] !== 'architect' ? m[1] : null) || seatOf();
    rows.push({ seat, reviewOf, verdict, found, neu, catchRate: found ? neu / found : 0, t: stamp(f.split('/').pop()) });
  }
}

// group by seat
const bySeat = new Map();
for (const r of rows) {
  const a = bySeat.get(r.seat) || { seat: r.seat, n: 0, found: 0, neu: 0, ok: 0, improved: 0, rejected: 0 };
  a.n++; a.found += r.found; a.neu += r.neu;
  if (r.verdict === 'ok') a.ok++; else if (r.verdict === 'improved') a.improved++; else if (r.verdict === 'rejected') a.rejected++;
  bySeat.set(r.seat, a);
}

const list = [...bySeat.values()].sort((a, b) => (b.found ? b.neu / b.found : 0) - (a.found ? a.neu / a.found : 0));
console.log('COUNCIL TELEMETRY — per-seat review catch rates');
console.log('seat        reviews  FOUND  NEW   catch%  ok  improved  rejected');
for (const a of list) {
  const cr = a.found ? Math.round((a.neu / a.found) * 100) : 0;
  console.log(`${a.seat.padEnd(11)} ${String(a.n).padStart(7)} ${String(a.found).padStart(6)} ${String(a.neu).padStart(5)} ${String(cr).padStart(6)}%  ${String(a.ok).padStart(2)}  ${String(a.improved).padStart(8)}  ${String(a.rejected).padStart(8)}`);
}
console.log('\ntotal reviews:', rows.length, '| seats:', bySeat.size);
// top items by review count
const byItem = new Map();
for (const r of rows) { const a = byItem.get(r.reviewOf) || { id: r.reviewOf, n: 0 }; a.n++; byItem.set(r.reviewOf, a); }
const topItems = [...byItem.values()].sort((a, b) => b.n - a.n).slice(0, 10);
console.log('\nmost-reviewed items:'); for (const t of topItems) console.log(`  ${t.id}: ${t.n} reviews`);
