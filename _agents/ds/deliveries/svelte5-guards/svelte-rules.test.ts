// svelte-rules.test.ts — the six Svelte 5 failure modes, enforced mechanically.
//
// Place at: colors/test/core/svelte-rules.test.ts   (picked up by `npm test`:
//   node --test --experimental-strip-types "test/**/*.test.ts")
//
// Why a test and not a paragraph: a rule that only lives in a document is a rule nobody
// follows after the second contributor. These are the failure modes that cost the most to
// unwind AFTER the Draft Board slice exists (1,200 rows through a deep proxy; an $effect
// that re-sorts the board in a loop; a 1.8 MB bundle rebuilt by accident).
//
// The test reads source text only. It never imports the UI, so it runs on a clean checkout
// with no build step. Fixture-verified: see _agents/ds/deliveries/svelte5-guards/README.md.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.env.COLORS_ROOT
  ? path.resolve(process.env.COLORS_ROOT)
  : path.resolve(import.meta.dirname, '..', '..');

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Drop // and /* */ comments but keep string contents, so a URL in a string is not read as a comment.
function stripComments(src) {
  let out = '';
  let i = 0;
  let quote = null;
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (quote) {
      out += c;
      if (c === '\\') { out += n ?? ''; i += 2; continue; }
      if (c === quote) quote = null;
      i++;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; out += c; i++; continue; }
    if (c === '/' && n === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '/' && n === '*') { i += 2; while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; continue; }
    out += c; i++;
  }
  return out;
}

const files = walk(path.join(ROOT, 'src'));
const svelte = files.filter((f) => f.endsWith('.svelte'));
const runeModules = files.filter((f) => f.endsWith('.svelte.ts'));
const plain = files.filter((f) => (f.endsWith('.ts') || f.endsWith('.js')) && !f.endsWith('.svelte.ts'));
const read = (f) => stripComments(fs.readFileSync(f, 'utf8'));
const lineOf = (src, index) => src.slice(0, index).split('\n').length;

// ---- rule 1: runes are compile-time and file-scoped -------------------------------------
// $state in a plain .ts file is a syntax error at Svelte compile time. Catch it with a named
// rule instead of a compiler stack trace pointing at a generated file.
test('svelte rules 1: runes only in .svelte / .svelte.ts files', () => {
  const bad = [];
  for (const f of plain) {
    const src = read(f);
    const re = /\$(state|derived|effect|props|bindable|inspect|host)\b/g;
    for (const m of src.matchAll(re)) bad.push(`${rel(f)}:${lineOf(src, m.index)} uses ${m[0]} outside *.svelte.ts`);
  }
  assert.deepEqual(bad, [], `move rune state into a *.svelte.ts module:\n${bad.join('\n')}`);
});

// ---- rule 2: $state deep-proxies everything it is given --------------------------------
// Domain data (player lists, league tables, box scores) must be $state.raw or $derived.
// Allowed after $state(: number/string/boolean/null/undefined literals and no argument.
// Anything else — object literal, array literal, identifier, call — must be $state.raw.
test('svelte rules 2: $state only holds primitives; collections use $state.raw', () => {
  const bad = [];
  for (const f of [...svelte, ...runeModules]) {
    const src = read(f);
    const re = /\$state(?!\.raw)\s*\(/g;
    for (const m of src.matchAll(re)) {
      const rest = src.slice(m.index + m[0].length).trimStart();
      const primitive = rest === '' || rest.startsWith(')') || /^[-+]?\d/.test(rest) || /^['"`]/.test(rest) || /^(true|false|null|undefined|NaN)\b/.test(rest);
      if (!primitive) bad.push(`${rel(f)}:${lineOf(src, m.index)} $state(${rest.slice(0, 40)}…`);
    }
  }
  assert.deepEqual(bad, [], `use $state.raw for objects/arrays (a deep proxy on 1,200 draft rows is the bug):\n${bad.join('\n')}`);
});

// ---- rule 3: never derive with $effect -------------------------------------------------
// $effect is for side effects. An effect that assigns to a $state declaration is derivation
// written backwards: two effects can chase each other into an infinite loop or a stale view.
test('svelte rules 3: no $effect writes a $state variable', () => {
  const bad = [];
  for (const f of [...svelte, ...runeModules]) {
    const src = read(f);
    const names = new Set();
    for (const m of src.matchAll(/^\s*(?:let|var)\s+(\w+)\s*(?::[^=]+)?=\s*\$state(?:\.raw)?\s*\(/gm)) names.add(m[1]);
    if (!names.size) continue;
    for (const m of src.matchAll(/\$effect\s*\(/g)) {
      // take the balanced (...) body of the effect call
      let i = m.index + m[0].length;
      let depth = 1;
      const start = i;
      while (i < src.length && depth > 0) {
        if (src[i] === '(') depth++;
        else if (src[i] === ')') depth--;
        i++;
      }
      const body = src.slice(start, i);
      for (const name of names) {
        const assign = new RegExp(`\\b${name}\\s*=(?!=)`);
        if (assign.test(body)) bad.push(`${rel(f)}:${lineOf(src, m.index)} $effect assigns ${name} — use $derived`);
      }
    }
  }
  assert.deepEqual(bad, [], `derivation belongs in $derived / $derived.by:\n${bad.join('\n')}`);
});

// ---- rule 4: no legacy syntax in runes mode -------------------------------------------
// `export let` and `$:` are not allowed in runes mode; createEventDispatcher and <slot> are
// the legacy component API. Banning them now is cheap; migrating 40 components later is not.
test('svelte rules 4: no export let / $: / createEventDispatcher / <slot>', () => {
  const bad = [];
  const rules = [
    [/^\s*export\s+let\s/m, 'export let — use $props()'],
    [/^\s*\$:/m, '$: reactive statement — use $derived'],
    [/\bcreateEventDispatcher\b/g, 'createEventDispatcher — use callback props'],
    [/<slot[\s>]/g, '<slot> — use {@render children?.()}'],
  ];
  for (const f of [...svelte, ...runeModules]) {
    const src = read(f);
    for (const [re, message] of rules) for (const m of src.matchAll(re)) bad.push(`${rel(f)}:${lineOf(src, m.index)} ${message}`);
  }
  assert.deepEqual(bad, [], `legacy Svelte syntax found:\n${bad.join('\n')}`);
});

// ---- rule 5: SPA, no SSR --------------------------------------------------------------
// localStorage, the service worker and offline boot all require a client; SSR buys nothing
// here and costs a class of hydration bugs. Keep Kit out and the Vite config client-only.
test('svelte rules 5: client-only Vite app (no Kit, no ssr/prerender/generate:server)', () => {
  const pkgPath = path.join(ROOT, 'package.json');
  assert.ok(fs.existsSync(pkgPath), 'colors/package.json missing');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  assert.ok(!('@sveltejs/kit' in deps), 'SvelteKit is not wanted: storage and offline boot are client-only');
  assert.ok(!fs.existsSync(path.join(ROOT, 'src', 'routes')), 'src/routes means Kit-style SSR routing; this app is one SPA');
  const configs = files.filter((f) => /vite\.config\.(js|ts|mjs)$/.test(f));
  assert.ok(configs.length === 1, `expected one vite config, found ${configs.length}`);
  const cfg = fs.readFileSync(configs[0], 'utf8');
  for (const bad of [/\bssr\s*:/, /\bprerender\s*:/, /generate\s*:\s*['"]server['"]/]) {
    assert.ok(!bad.test(cfg), `${rel(configs[0])} contains SSR configuration (${bad}) — Colors v1 is client-only`);
  }
  const index = path.join(ROOT, 'index.html');
  assert.ok(fs.existsSync(index), 'colors/index.html missing');
  assert.match(fs.readFileSync(index, 'utf8'), /<div\s+id=["']app["']/, 'index.html must mount the SPA into #app');
});

// ---- rule 6: engine imports stay behind the UI data boundary ---------------------------
// A component that imports the engine directly will eventually put engine objects into
// $state and freeze/refresh them. One boundary module keeps the proxy decision in one file.
test('svelte rules 6: .svelte components do not import engine/core modules directly', () => {
  const bad = [];
  for (const f of svelte) {
    const src = read(f);
    for (const m of src.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      const spec = m[1];
      if (spec.includes('/engine/') || spec.startsWith('../core/') || spec.includes('/core/')) {
        bad.push(`${rel(f)}:${lineOf(src, m.index)} imports ${spec} — go through src/ui/data.ts`);
      }
    }
  }
  assert.deepEqual(bad, [], `UI data boundary broken:\n${bad.join('\n')}`);
});
