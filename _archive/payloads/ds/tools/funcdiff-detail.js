#!/usr/bin/env node
/* funcdiff-detail.js — per-function diff summary for two single-file builds.
 * Read-only, no deps. Usage: node funcdiff-detail.js <a.html> <b.html> [fn...]
 * With no fn list, prints the differing set from funcdiff-probe's logic.
 * Written by DS for the M-12 Round-2 re-analysis, 20 Oct 2026.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const ignoreWs = args.includes('--w');
const [a, b, ...wanted] = args.filter(x => x !== '--w');
if (!a || !b) { console.error('usage: node funcdiff-detail.js <a.html> <b.html> [--w] [fn...]'); process.exit(4); }

function funcs(file) {
  const t = fs.readFileSync(file, 'utf8');
  const script = [...t.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
  const L = script.split('\n');
  const out = new Map();
  for (let i = 0; i < L.length; i++) {
    const m = L[i].match(/^function\s+([A-Za-z_$][\w$]*)\s*\(/);
    if (!m) continue;
    let end = i;
    const tr = L[i].trim();
    if (!(tr.endsWith('}') && L[i].includes('{'))) {
      for (let j = i + 1; j < L.length; j++) { if (L[j].trim() === '}') { end = j; break; } }
    }
    out.set(m[1], L.slice(i, end + 1).join('\n'));
  }
  return out;
}

const A = funcs(a), B = funcs(b);
const differing = [...A.keys()].filter(k => B.has(k) && A.get(k) !== B.get(k));
const list = wanted.length ? wanted : differing;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fdiff-'));
const pa = path.join(tmp, 'a.txt'), pb = path.join(tmp, 'b.txt');

for (const f of list) {
  if (!A.has(f) || !B.has(f)) { console.log(`### ${f}: not common (A=${A.has(f)} B=${B.has(f)})`); continue; }
  fs.writeFileSync(pa, A.get(f) + '\n');
  fs.writeFileSync(pb, B.get(f) + '\n');
  const r = spawnSync('diff', [ignoreWs ? '-uw' : '-u', pa, pb], { encoding: 'utf8' });
  const lines = (r.stdout || '').split('\n').filter(l => /^[+-][^+-]/.test(l));
  console.log(`### ${f}  ${ignoreWs ? 'changed_lines_ignoring_ws' : 'changed_lines'}=${lines.length}`);
  for (const l of lines.slice(0, 8)) console.log(l.slice(0, 170));
  if (lines.length > 8) console.log(`... (${lines.length - 8} more)`);
}
fs.rmSync(tmp, { recursive: true, force: true });
