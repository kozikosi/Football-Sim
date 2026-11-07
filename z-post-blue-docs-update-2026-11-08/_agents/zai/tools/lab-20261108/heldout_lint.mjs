#!/usr/bin/env node
// heldout_lint.mjs — governance lint (Z.ai lab, 2026-11-08)
// LAW (proposed holdout law, VERACITY-SYNTHESIS §7.2a): no fit script may READ 2024–2025
// real data. Fit scripts live in tools/mathlab/ (shared) — this lint reads only, never edits.
// Usage: node heldout_lint.mjs [rootDir]   (default: repo root of this checkout)
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || path.resolve(process.cwd(), '../../..');
const TARGETS = [];
function walk(dir) {
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'lab-results', 'download'].includes(e.name)) continue;
      walk(p);
    } else if (/\.(mjs|js|py|ts)$/.test(e.name)) {
      TARGETS.push(p);
    }
  }
}
walk(path.join(root, 'tools'));
walk(path.join(root, 'colors'));

// A file "reads 2024-2025 real data" if it references real-data file names/seasons that the
// holdout law protects. Engine constants and engine sim years are not real data; the lint
// flags the real-data pattern only (nflverse/PFR file names or '20XX.csv' reads in fit paths).
const PATTERNS = [
  /player_stats.{0,12}202[45]/i, /snap_counts.{0,12}202[45]/i, /depth_charts.{0,12}202[45]/i,
  /pfr_advstats.{0,12}202[45]/i, /nflverse.{0,40}202[45]/i, /real_anchors_202[45]/i,
];
const violations = [];
for (const p of TARGETS) {
  const src = fs.readFileSync(p, 'utf8');
  for (const re of PATTERNS) {
    if (re.test(src)) violations.push({ file: path.relative(root, p), pattern: String(re) });
  }
}
console.log('HELD-OUT LINT · scanned', TARGETS.length, 'script files under tools/ + colors/');
if (violations.length) {
  console.log('VIOLATIONS (fit-side reads of holdout-season real data):');
  violations.forEach(v => console.log('  ', v.file, '·', v.pattern));
  process.exitCode = 1;
} else {
  console.log('CLEAN — no fit script reads 2024–2025 real data.');
}
