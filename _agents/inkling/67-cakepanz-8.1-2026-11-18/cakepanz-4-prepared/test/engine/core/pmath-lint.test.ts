import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// S2 portability lint, as a RATCHET (like tsc-baseline.json): Math.exp/log/tanh/pow/sin/cos/sqrt and `**` may differ in the last bits between JavaScript
// engines, so anything that must replay identically goes through core/pmath.ts. The engine still has such calls today; this pins how many per file and fails
// only when a file gets MORE of them (or a new file has any). Moving a file to pmath lowers its count; then lower the pin:  PMATH_RATCHET=write npm test
// (A migration changes that file's numbers in the last digits, once, on purpose: do it file by file, with the golden files re-recorded in the same commit.)
const root = new URL('../../../src/engine/', import.meta.url).pathname;
const dirs = ['core', 'sports/nfl/engine', 'sports/nfl/sim'];
const BAD = /\bMath\.(exp|expm1|log|log1p|log2|log10|tanh|sinh|cosh|pow|sin|cos|tan|atan|atan2|asin|acos|sqrt|cbrt|hypot)\b|\*\*/g;
const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1').replace(/'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g, '""');
const pinFile = new URL('./pmath-inventory.json', import.meta.url);

const counts: Record<string, number> = {};
for (const d of dirs) for (const f of fs.readdirSync(path.join(root, d)).filter((x) => x.endsWith('.ts')).sort()) {
  if (d === 'core' && f === 'pmath.ts') continue;
  const n = (strip(fs.readFileSync(path.join(root, d, f), 'utf8')).match(BAD) ?? []).length;
  if (n) counts[`${d}/${f}`] = n;
}

test('pmath lint: no file has more non-portable math calls than its pin; a new file has none', (t) => {
  if (process.env.PMATH_RATCHET === 'write') { fs.writeFileSync(pinFile, JSON.stringify(counts, null, 1) + '\n'); t.diagnostic('pin written'); return; }
  const pin = JSON.parse(fs.readFileSync(pinFile, 'utf8')) as Record<string, number>;
  const total = Object.values(counts).reduce((a, b) => a + b, 0), pinned = Object.values(pin).reduce((a, b) => a + b, 0);
  t.diagnostic(`REPORT: ${total} non-portable math calls in ${Object.keys(counts).length} files (pinned ${pinned}): ${Object.entries(counts).map(([k, v]) => `${k.split('/').pop()} ${v}`).join(', ')}`);
  for (const [f, n] of Object.entries(counts)) assert.ok(n <= (pin[f] ?? 0), `${f}: ${n} calls, pinned ${pin[f] ?? 0}. Use core/pmath.ts (pexp, plog, ptanh, psqrt, pnorminv) instead.`);
  for (const [f, n] of Object.entries(pin)) if ((counts[f] ?? 0) < n) t.diagnostic(`${f} improved ${n} -> ${counts[f] ?? 0}: run PMATH_RATCHET=write npm test to lock it in`);
});

test('pmath lint: the check itself can fail (planted violations are counted, comments and strings are not)', () => {
  assert.equal((strip('const a = Math.exp(1) + 2 ** 3;').match(BAD) ?? []).length, 2);
  assert.equal((strip('// Math.exp(1)\n/* Math.log(2) ** 2 */ const s = "Math.sqrt(4)";').match(BAD) ?? []).length, 0);
});
