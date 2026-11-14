import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Framework neutrality (Owner, 13 Nov 2026: "everything is built to be as framework neutral as possible. everything is in plain
// typescript"). Nothing under src/ may import a UI framework, a meta-framework or a bundler: every import is a relative path to another
// src file. The framework verdict belongs to the council test; until it is in, this keeps the engine, app, view and platform layers
// from quietly choosing one. A UI layer, when it exists, lives in its own folder and is excluded here by name (`ui`), never by a
// pattern that could also swallow engine code.
const SRC = new URL('../../src/', import.meta.url).pathname;
const tsFiles = (d: string): string[] => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? tsFiles(path.join(d, e.name)) : e.name.endsWith('.ts') ? [path.join(d, e.name)] : []));
const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
const specifiersOf = (src: string): string[] => [...strip(src).matchAll(/(?:import|export)[^;'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|import\s*['"]([^'"]+)['"]/g)].map((m) => (m[1] ?? m[2] ?? m[3]) as string);
const FRAMEWORK = /^(react|react-dom|preact|svelte|@sveltejs\/|vue|@vue\/|nuxt|solid-js|@solidjs\/|lit|lit-html|next|vite|esbuild|rollup|webpack)(\/|$)/;
const files = tsFiles(SRC).filter((f) => !path.relative(SRC, f).split(path.sep).includes('ui'));

test('neutrality: there are source files to check', () => assert.ok(files.length >= 40, String(files.length)));
test('neutrality: no file under src/ (outside a ui/ folder) imports a framework or bundler; every import is relative', () => {
  for (const f of files) for (const s of specifiersOf(fs.readFileSync(f, 'utf8'))) {
    assert.ok(!FRAMEWORK.test(s), `${path.relative(SRC, f)} imports ${s}`);
    assert.match(s, /^\.{1,2}\//, `${path.relative(SRC, f)} imports a non-relative specifier: ${s}`);
  }
});
test('neutrality: the check itself can fail (planted framework imports are caught)', () => {
  for (const planted of ["import { h } from 'react';", "import App from 'svelte';", "const m = await import('vue');", "export * from 'solid-js/web';", "import 'lit';"])
    assert.ok(specifiersOf(planted).some((s) => FRAMEWORK.test(s)), planted);
  assert.deepEqual(specifiersOf("import { a } from './a.ts'; // import x from 'react'"), ['./a.ts']);
});
