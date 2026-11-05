#!/usr/bin/env node
// contract:check (w74 item 7d, Z.ai draft — GLM's 2c idea). A static cross-check between the VIEW MODELS and
// the SCREENS, in both directions:
//   1. a view-model FIELD THE UI READS but the VM never produces  -> FAIL
//      (reads are every `x.field` on a known VM variable in *.svelte; the field must exist in that VM's interface)
//   2. a state the VM EXPOSES but NO SCREEN EVER RENDERS           -> REPORT (exit 0)
//      (a VM may legitimately expose for a screen that lands next week; silent field drift may not)
//
// Limits (stated, not hidden): this is a grep-grade heuristic, NOT a type-checker — it knows the VM interfaces
// in src/sports/nfl/view/*.ts by their `export interface` blocks and the VM variable names the components use
// (vm, board, roster, feed, season). tsc + svelte-check remain the real type layer; this script catches the
// CROSS-LAYER drift those tools cannot see (a component reading a field nobody produces is still type-sound if
// the component declares the object loosely).
//
// Usage: node tools/contract-check.mjs [srcDir]   (default: src)
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'src');
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else files.push(p); } })(root);
const vmFiles = files.filter((f) => /src\/sports\/nfl\/(view|app)\/[^/]*\.ts$/.test(f) && !/\.test\./.test(f));
const svelteFiles = files.filter((f) => f.endsWith('.svelte'));

// interfaces by file: name -> Set(fields). Brace-counted (interfaces nest object literals), and the scan covers
// view/ AND app/ — VM unions like GameFeed live in app/feed.ts.
const ifaces = new Map();
for (const f of vmFiles) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/export interface (\w+) \{/g)) {
    let depth = 1, i = m.index + m[0].length;
    while (depth > 0 && i < src.length) { if (src[i] === '{') depth++; else if (src[i] === '}') depth--; i++; }
    const body = src.slice(m.index + m[0].length, i - 1).replace(/\{[^{}]*\}/g, '');   // drop nested object literals: their keys are not fields
    const fields = new Set([...body.matchAll(/([A-Za-z_]\w*)\??\s*:/g)].map((x) => x[1]));
    ifaces.set(m[1], { file: f, fields });
  }
}
// variable -> interface name (the wiring each component declares in its import of the VM module)
const VM_VARS = { vm: ['TeamSelectVM', 'SeasonVM'], board: ['BoardVM'], roster: ['RosterVM'], feed: ['GameFeed'] };

const svelteSrc = svelteFiles.map((f) => ({ f, src: fs.readFileSync(f, 'utf8')
  .replace(/<!--[\s\S]*?-->/g, ' ')                       // markup comments (apostrophes there fake string matches)
  .replace(/\/\*[\s\S]*?\*\//g, ' ')                      // block comments
  .replace(/^\s*\/\/.*$/gm, ' ')                          // line comments
  .replace(/^\s*import[^;]*;?/gm, ' ')                    // import lines (paths read as field access otherwise)
  .replace(/(['"])(?:(?!\1)[^\\]|\\.)*\1/g, 'S') }));     // string literals
const read = new Map();   // ifaceName -> Set(fields read anywhere)
const unknown = [];
for (const { f, src } of svelteSrc) {
  for (const [v, names] of Object.entries(VM_VARS)) {
    for (const m of src.matchAll(new RegExp(String.raw`\b${v}\.(\w+)`, 'g'))) {
      const field = m[1];
      const known = names.map((n) => ifaces.get(n)).find((i) => i && i.fields.has(field));
      if (known) { if (!read.has(names[0])) read.set(names[0], new Set()); read.get(names[0]).add(field); }
      else unknown.push([f, `${v}.${field}`]);
    }
  }
}
const unrendered = [];
for (const [name, iface] of ifaces) {
  if (!/\/view\//.test(iface.file) && !/feed\.ts$/.test(iface.file)) continue;   // the unrendered report covers VIEW VMs only; payload contracts are not for screens to render
  const seen = read.get(name);
  for (const field of iface.fields) if (!seen || !seen.has(field)) unrendered.push([name, field, iface.file]);
}

if (unknown.length) {
  console.error(`contract:check FAIL — ${unknown.length} field(s) the UI reads but no VM interface produces:`);
  for (const [f, ref] of unknown) console.error(`  ${path.relative(process.cwd(), f)}: ${ref}`);
  process.exit(1);
}
console.log(`contract:check: PASS — every UI read is produced.`);
if (unrendered.length) {
  console.log(`contract:check REPORT — ${unrendered.length} exposed-but-never-rendered field(s) (exit 0 by design):`);
  for (const [name, field, f] of unrendered) console.log(`  ${name}.${field}  (${path.relative(process.cwd(), f)})`);
}
