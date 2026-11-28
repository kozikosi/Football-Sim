#!/usr/bin/env node
/* gate-battery-syntax.mjs — item 5 (HY4 N5): the batteries are PLAIN .mjs — a TypeScript token
 * (`as const`, an `interface`/`type` alias, a type annotation) is a SyntaxError the battery never
 * survives (the delivered bytes: `as const` at batteries/waveB.node.battery.mjs:57 meant the Wave
 * B battery NEVER RAN while the seal called it a receipt). Two checks, both fail loud:
 *   1. node --check on EVERY batteries/*.mjs — a parse error names the file + line;
 *   2. a grep for TS-isms in .mjs: `as const`, `interface X`, `type X =`, and `: <Type>`
 *      annotations in function/const signatures — the same class caught before it runs.
 * Exit 0 = every battery parses and no TS token survives; exit 1 = the offender is named.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'batteries');
const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.mjs')).sort();
let fail = 0;

for (const f of files) {
  try {
    execFileSync('node', ['--check', path.join(DIR, f)], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
    console.log(`  parse OK  ${f}`);
  } catch (e) {
    const o = String((e.stdout || '') + (e.stderr || '')).split('\n').slice(0, 3).join(' | ');
    console.log(`  PARSE FAIL  ${f} — ${o}`);
    fail = 1;
  }
  const txt = fs.readFileSync(path.join(DIR, f), 'utf8');
  // strip STRING LITERALS before scanning: node.battery.mjs's N-law legitimately pins the shell's
  // own TS string (`export const MEASURED_LABEL = 'Model Value' as const`) — the fixture is a
  // string, not a TypeScript token. Only CODE outside quotes is scanned.
  const stripStrings = (l) => l.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g, "''");
  const hits = [];
  txt.split('\n').forEach((l, i) => {
    const code = stripStrings(l);
    if (/as\s+const\b/.test(code)) hits.push(`${f}:${i + 1}: 'as const' — ${l.trim().slice(0, 90)}`);
    else if (/^\s*interface\s+\w/.test(code)) hits.push(`${f}:${i + 1}: 'interface' declaration — ${l.trim().slice(0, 90)}`);
    else if (/^\s*type\s+\w+\s*=\s*[^=]/.test(code)) hits.push(`${f}:${i + 1}: 'type' alias — ${l.trim().slice(0, 90)}`);
    else if (/\)\s*:\s*(void|boolean|string|number|Promise<|Record<|readonly )/.test(code)) hits.push(`${f}:${i + 1}: type annotation — ${l.trim().slice(0, 90)}`);
    else if (/\bconst\s+\w+\s*:\s*(string|number|boolean|SlotId|Record<|readonly )\b/.test(code)) hits.push(`${f}:${i + 1}: type annotation — ${l.trim().slice(0, 90)}`);
  });
  for (const h of hits) { console.log('  TS-ISM ' + h); fail = 1; }
}
console.log(fail ? 'gate-battery-syntax: FAIL' : `gate-battery-syntax: PASS (${files.length} batteries parse clean, zero TypeScript tokens in .mjs)`);
process.exit(fail);
