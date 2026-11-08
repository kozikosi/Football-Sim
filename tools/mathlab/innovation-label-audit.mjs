import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function audit(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const counts = { VERIFIED: 0, REPORTED: 0, INFERRED: 0, UNKNOWN: 0 };
  const seen = new Set();
  const missing = [];
  for (const line of lines) {
    const m = line.match(/^Q(\d+)\.\s*(VERIFIED|REPORTED|INFERRED|UNKNOWN)\b/);
    if (!m) continue;
    const n = Number(m[1]);
    const label = m[2];
    seen.add(n);
    counts[label]++;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const better = counts.VERIFIED + counts.REPORTED + counts.INFERRED;
  const all = Array.from({ length: 60 }, (_, i) => i + 1);
  for (const n of all) if (!seen.has(n)) missing.push(n);
  return { total, counts, better, missing };
}

function selftest() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'beam-label-'));
  const file = path.join(dir, 'sample.md');
  const lines = [];
  for (let i = 1; i <= 45; i++) lines.push(`Q${i}. INFERRED: x`);
  for (let i = 46; i <= 60; i++) lines.push(`Q${i}. UNKNOWN: x`);
  fs.writeFileSync(file, lines.join('\n'));
  const r = audit(file);
  fs.rmSync(dir, { recursive: true, force: true });
  if (r.total !== 60 || r.better !== 45 || r.missing.length !== 0) throw new Error('selftest failed');
  console.log('selftest: PASS');
}

const args = process.argv.slice(2);
if (args.includes('--selftest')) {
  selftest();
  process.exit(0);
}
const file = args[0];
if (!file) {
  console.error('usage: node tools/mathlab/innovation-label-audit.mjs <file> [--min-better 40]');
  process.exit(2);
}
const r = audit(file);
console.log(JSON.stringify(r, null, 2));
const minBetter = Number((args.find(a => a.startsWith('--min-better=')) || '--min-better=40').split('=')[1]);
if (r.total < 60 || r.better < minBetter || r.missing.length) process.exit(1);
