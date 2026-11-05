#!/usr/bin/env node
// Runes enforcement (w74 item 7b, Z.ai draft). CI gate over the Svelte 5 migration laws:
//   1. NO legacy idioms in src/**/*.svelte:   export let, $:, on:*,  writable(/readable( stores
//   2. NO $state/$derived/$effect OUTSIDE *.svelte / *.svelte.ts files (runes live in rune-compiled files only)
//   3. The player dataset must never sit in DEEP reactive $state — only $state.raw or outside reactivity
//      (the frozen pool is thousands of rows; deep proxying it is the bug 7b exists to prevent)
//
// Usage: node tools/check-runes.mjs [srcDir]     (default: src)  — exit 1 lists every offender.
// eslint-plugin-svelte additionally enforces the same idioms at editor time (eslint.config.js ships with the
// svelte plugin's flat config; svelte-check runs in CI when it installs cleanly — reported separately).
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'src');
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory() && f.name !== 'node_modules') walk(p); else files.push(p); } })(root);

const svelteFiles = files.filter((f) => f.endsWith('.svelte') || f.endsWith('.svelte.ts'));
const otherFiles = files.filter((f) => /\.(ts|js)$/.test(f) && !f.endsWith('.svelte.ts'));

const bad = [];
const lineOf = (src, i) => src.slice(0, i).split('\n').length;

const LEGACY = [
  [/^\s*export\s+let\s/m, 'export let (Svelte 4 prop) -> use $props()'],
  [/\$\:/, 'legacy reactive statement $: -> use $derived / $effect'],
  [/on:(click|change|input|keydown|submit|pointerdown|pointerup|focus|blur)\b/, 'legacy on:<event> -> use the event attribute (onclick)'],
  [/\bwritable\s*\(|\breadable\s*\(/, 'svelte/store writable/readable -> use runes or the app store adapter'],
];
for (const f of svelteFiles) {
  const src = fs.readFileSync(f, 'utf8');
  for (const [re, why] of LEGACY) {
    for (const m of src.matchAll(new RegExp(re.source, 'gm' + (re.flags.includes('m') ? '' : '')))) bad.push([f, lineOf(src, m.index), why]);
  }
}
for (const f of otherFiles) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\$(state|derived|effect|props|bindable)\b/g)) {
    if (!/\.svelte\./.test(f)) bad.push([f, lineOf(src, m.index), `rune $${m[1]} outside a rune-compiled file (*.svelte / *.svelte.ts)`]);
  }
  // Rule 3: deep $state over the dataset/pool. Catch the dangerous constructors even in rune files:
  // `$state(` with a pool/dataset identifier inside.
  for (const m of src.matchAll(/\$state\s*\(\s*[^)]*(pool|dataset|rows)\b/gi)) {
    bad.push([f, lineOf(src, m.index), 'deep $state over dataset/pool-shaped data -> use $state.raw or keep it outside reactivity']);
  }
}
for (const f of svelteFiles) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\$state\s*\(\s*[^)]*(pool|dataset|rows)\b/gi)) {
    bad.push([f, lineOf(src, m.index), 'deep $state over dataset/pool-shaped data -> use $state.raw (rule 3)']);
  }
}

if (bad.length) {
  console.error(`check-runes: FAIL — ${bad.length} violation(s)`);
  for (const [f, line, why] of bad) console.error(`  ${path.relative(process.cwd(), f)}:${line}  ${why}`);
  process.exit(1);
}
console.log(`check-runes: PASS (${svelteFiles.length} rune files, ${otherFiles.length} other ts/js)`);
