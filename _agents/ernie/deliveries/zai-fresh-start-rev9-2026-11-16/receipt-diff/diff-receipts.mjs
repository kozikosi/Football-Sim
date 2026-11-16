#!/usr/bin/env node
/* diff-receipts.mjs — C5 prototype: diffs two receipts of the same spec (gate pass/fail, metrics,
 * structured deltas). Usage: node diff-receipts.mjs <receiptA.json> <receiptB.json> */
import { readFileSync } from 'node:fs';
const [pa, pb] = process.argv.slice(2);
const A = JSON.parse(readFileSync(pa, 'utf8')), B = JSON.parse(readFileSync(pb, 'utf8'));
const keys = (o, pre = '') => Object.entries(o ?? {}).flatMap(([k, v]) =>
  (v && typeof v === 'object' && !Array.isArray(v)) ? keys(v, pre + k + '.') : [[pre + k, v]]);
const ma = new Map(keys(A)), mb = new Map(keys(B));
const rows = [];
for (const [k, va] of ma) if (mb.has(k)) rows.push([k, va, mb.get(k), JSON.stringify(va) === JSON.stringify(mb.get(k)) ? 'SAME' : 'DIFF']);
for (const [k, va] of ma) if (!mb.has(k)) rows.push([k, va, '—', 'A-ONLY']);
for (const [k, vb] of mb) if (!ma.has(k)) rows.push([k, '—', vb, 'B-ONLY']);
let diff = 0;
for (const [k, a, b, s] of rows) { if (s !== 'SAME') { diff++; console.log(s.padEnd(7), k, '=', JSON.stringify(a), '→', JSON.stringify(b)); } }
console.log(`\n${rows.length} leaf fields · ${diff} differing · ${rows.length - diff} same`);
