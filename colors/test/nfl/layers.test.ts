import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// D13 (assessment 13 Nov): the layering law, as a check. The engine purity test already covers src/sports/nfl/engine/.
// This one covers the rest, so the UI framework cannot leak below src/ui/ when the Svelte shell lands.
//   1. No file outside src/ui/ (and the Vite entry src/main.ts / src/devgame.ts) imports a UI framework or bundler.
//   2. core/, sports/**/{sim,app,view}/ carry no DOM, ambient randomness, clock, or Node globals.
//      platform/ is the adapter layer: it may touch storage and the clock, by design, but still no UI framework.
const SRC = new URL('../../src/', import.meta.url).pathname;
const FRAMEWORKS = /^(svelte|react|react-dom|preact|vue|solid-js|lit|@sveltejs\/|vite|@vitejs\/)/;
const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (/\.(ts|js|svelte)$/.test(e.name)) out.push(p);
  }
  return out;
}
const rel = (p: string) => path.relative(SRC, p).split(path.sep).join('/');
const specsOf = (code: string): string[] =>
  [...code.matchAll(/(?:import|export)[^;'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|import\s*['"]([^'"]+)['"]/g)].map((m) => (m[1] ?? m[2] ?? m[3]) as string);

const all = walk(SRC).filter((f) => !rel(f).startsWith('ui/') && rel(f) !== 'main.ts' && rel(f) !== 'devgame.ts');
const pure = all.filter((f) => /^(core\/|sports\/[^/]+\/(sim|app|view)\/)/.test(rel(f)));
const BAD = [/\bdocument\b/, /\bwindow\b/, /\bnavigator\b/, /\blocalStorage\b/, /\bsessionStorage\b/, /\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\b/, /\bperformance\.now\b/, /\bprocess\./, /\brequire\(/];

test('layers: there are files to check in every governed layer', () => {
  assert.ok(all.length >= 30, `outside-ui files: ${all.length}`);
  assert.ok(pure.length >= 15, `pure-layer files: ${pure.length}`);
  for (const layer of ['core/', 'sports/nfl/app/', 'sports/nfl/view/', 'platform/']) assert.ok(all.some((f) => rel(f).startsWith(layer)), layer);
});

test('layers: no UI framework or bundler import outside src/ui (incl. platform/)', () => {
  for (const f of all) for (const spec of specsOf(strip(fs.readFileSync(f, 'utf8')))) assert.ok(!FRAMEWORKS.test(spec), `${rel(f)} imports ${spec}`);
});

test('layers: core, sim, app and view carry no DOM, Math.random, clock, storage or Node globals', () => {
  for (const f of pure) {
    const src = strip(fs.readFileSync(f, 'utf8'));
    for (const bad of BAD) assert.ok(!bad.test(src), `${rel(f)}: ${bad}`);
  }
});

test('layers: the check itself can fail (planted violations are caught)', () => {
  assert.ok(FRAMEWORKS.test(specsOf("import { onMount } from 'svelte';")[0]));
  assert.ok(FRAMEWORKS.test(specsOf("const m = await import('@sveltejs/kit');")[0]));
  assert.ok(!FRAMEWORKS.test(specsOf("import { x } from './store.ts';")[0]));
  assert.ok(BAD.some((b) => b.test(strip('const t = Date.now();'))));
  assert.ok(!BAD.some((b) => b.test(strip('// Date.now is forbidden\nconst t = 1;'))));
});
