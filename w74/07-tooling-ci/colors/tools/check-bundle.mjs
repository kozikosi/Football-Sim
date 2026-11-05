#!/usr/bin/env node
// Bundle budget check (w74 item 7a, Z.ai draft). CI gate: the app SHELL (every JS+CSS asset) must stay under
// 150 KB gzipped; the player dataset is loaded separately and lazily and is NEVER part of this budget.
//
// Receipts this check pins (VERIFIED 5 Nov 2026, folders 04+05 applied at 425f72a):
//   full slice build = 61.7 KB raw / 23.9 KB gzip (engine included) — the budget has ~126 KB headroom.
//   Kosi's throwaway Vite component: 25 KB raw / 10.2 KB gzip.
//
// Usage: node tools/check-bundle.mjs [distDir] [--budget 150]   (defaults: dist, 150 KB)
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const dir = path.resolve(process.argv[2] ?? 'dist');
const bi = process.argv.indexOf('--budget');
const budgetKB = Number(bi >= 0 ? process.argv[bi + 1] : 150);
const gzip = (buf) => zlib.gzipSync(buf).length;

if (!fs.existsSync(dir)) { console.error(`check-bundle: ${dir} does not exist (run the build first)`); process.exit(2); }
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else files.push(p); } })(dir);

let total = 0;
const rows = [];
for (const f of files.filter((f) => /\.(js|css)$/.test(f))) {
  const g = gzip(fs.readFileSync(f));
  total += g;
  rows.push([path.relative(dir, f), fs.statSync(f).size, g]);
}
const kb = total / 1024;
for (const [name, raw, g] of rows.sort((a, b) => b[2] - a[2])) console.log(`${String(g).padStart(8)} gzip  ${String(raw).padStart(8)} raw  ${name}`);
console.log(`${String(total).padStart(8)} gzip  TOTAL  budget ${budgetKB} KB`);
if (kb > budgetKB) { console.error(`check-bundle: FAIL — ${kb.toFixed(1)} KB gzip > ${budgetKB} KB budget`); process.exit(1); }
console.log(`check-bundle: PASS (${kb.toFixed(1)} KB gzip <= ${budgetKB} KB)`);
