import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// The engine must run anywhere (browser, Web Worker, Node, any UI framework): no DOM, no ambient randomness or clock,
// no imports from outside this sport's engine folder except the sport-neutral core (src/core). Review of the Next.js port, 29 Oct: its engine was one closure tied to the DOM,
// so it could be neither tested, seeded nor moved. This test keeps Colors from drifting the same way.
const dir = new URL('../../src/sports/nfl/engine/', import.meta.url);
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts'));
const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');   // comments may mention the words

test('engine purity: there are engine files to check', () => assert.ok(files.length >= 6, String(files.length)));

for (const f of files) {
  const src = strip(fs.readFileSync(new URL(f, dir), 'utf8'));
  test(`engine purity: ${f} has no DOM, Math.random, Date.now, storage, process or Node imports`, () => {
    for (const bad of [/\bdocument\b/, /\bwindow\b/, /\bnavigator\b/, /\blocalStorage\b/, /\bsessionStorage\b/, /\bMath\.random\b/, /\bDate\.now\b/, /\bnew Date\b/, /\bperformance\.now\b/, /\bprocess\./, /\brequire\(/]) {
      assert.ok(!bad.test(src), `${f}: ${bad}`);
    }
  });
  test(`engine purity: ${f} imports only sibling engine modules or src/core`, () => {
    // three import forms: `from`, dynamic import(), bare side-effect import (the last two were invisible until the 14 Nov canary)
    for (const m of src.matchAll(/(?:import|export)[^;'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|import\s*['"]([^'"]+)['"]/g)) {
      const spec = (m[1] ?? m[2] ?? m[3]) as string;
      assert.match(spec, /^(\.\/|\.\.\/\.\.\/\.\.\/core\/)[\w-]+\.ts$/, `${f} imports ${spec}`);
      assert.ok(fs.existsSync(path.join(path.dirname(new URL(f, dir).pathname), spec)), `${f}: missing ${spec}`);
    }
  });
}

test('engine purity: the check itself can fail (a planted violation is caught)', () => {
  assert.ok(/\bMath\.random\b/.test(strip('const x = Math.random();')));
  assert.ok(!/\bMath\.random\b/.test(strip('// Math.random is forbidden here\nconst y = 1;')));
});
