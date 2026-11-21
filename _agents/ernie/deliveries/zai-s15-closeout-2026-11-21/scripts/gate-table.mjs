// gate-table.mjs — S15 (2026-11-21): ONE script that reads the receipts and emits the gate table,
// so the count-drift class dies (the continuation order §4: "prefer one script that reads the
// receipts and emits the table, so this drift class dies rather than being patched again").
// Source of truth: ACCEPTANCE-RECEIPTS.txt at the final bytes — the per-step verdict lines the
// composite recorded (== NAME · N pass · M fail ==). Never a hand-copied number.
// Run: node scripts/gate-table.mjs   (prints the Gate-B markdown rows + the per-step lines)
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const R = path.join(ROOT, 'ACCEPTANCE-RECEIPTS.txt');
const txt = fs.readFileSync(R, 'utf8');
// the composite's step verdict lines: "== 8b. ..." headers, then the battery's own tail
// "== NAME · N pass · M fail ... ==" — collect the LAST verdict line per step header.
const lines = txt.split('\n');
const steps = [];   // {step, verdict}
let cur = null;
for (const l of lines) {
  const h = l.match(/^== (\d+[a-z]?\.) (.+)$/);
  if (h) { cur = { step: h[1], name: h[2].trim(), verdict: null }; steps.push(cur); continue; }
  const v = l.match(/^== (.+?) · (\d+) pass · (\d+) fail(.*)==$/);
  if (v && cur) cur.verdict = { name: v[1].trim(), pass: Number(v[2]), fail: Number(v[3]), rest: v[4].trim() };
}
const find = (re) => steps.find((s) => re.test(s.name));
const rows = [
  ['engine suite', /^1\. npm run test:engine|^2\. npm run test:engine/, null],
  ['node', /battery:node|the node battery/, null],
  ['contrast', /contrast guardrail/, null],
  ['slice (w77 adapter)', /npm run battery \(the slice battery/, null],
  ['shell', /the shell battery S1a/, null],
  ['board', /the uniform-board battery/, null],
  ['slot', /the P-317 slot battery \(T1/, null],
  ['visual', /the seeded visual battery/, null],
  ['receipt falsifiers F0-F12', /the receipt falsifiers/, null],
  ['shell falsifiers FA/FB/FC', /the shell falsifiers/, null],
  ['board falsifiers 13b', /the uniform-board falsifier/, null],
  ['slot falsifier F-S1', /the P-317 slot falsifier/, null],
  ['gate-manifest', /gate-manifest/, null],
  ['gate-numerals x2', /gate-numerals/, null],
];
console.log('| battery | S15 measured (the final bytes, read from ACCEPTANCE-RECEIPTS.txt) |');
console.log('|---|---|');
for (const [label, re] of rows) {
  const s = find(re);
  if (!s) { console.log(`| ${label} | NOT FOUND — check the step header |`); continue; }
  console.log(`| ${label} | ${s.verdict ? `\`${s.verdict.pass}/${s.verdict.fail}\` (${s.verdict.name})` : 'no verdict line recorded' } |`);
}
console.log('');
console.log('the per-step verdicts, verbatim:');
for (const s of steps) if (s.verdict) console.log(`- ${s.step} ${s.verdict.name}: ${s.verdict.pass} pass · ${s.verdict.fail} fail${s.verdict.rest ? ' ' + s.verdict.rest : ''}`);
