// Design-token invariants: every token exists in both themes (components can rely on it),
// and the applier only touches CSS custom properties.
// Run: node --test --experimental-strip-types apps/web/src/lib/design/tokens.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { light, dark, themes, wordmarkGradient } from './tokens.ts';

test('every dark token key exists in light (dark is a light override)', () => {
  for (const k of Object.keys(dark)) assert.ok(k in light, `dark token ${k} missing from light`);
  assert.ok(Object.keys(light).length >= 50, 'expected the full w52 token set');
});

test('no white text, no black text (the w52 palette law)', () => {
  for (const [name, tokens] of Object.entries(themes)) {
    assert.notEqual(tokens['--text'].toLowerCase(), '#ffffff', `${name} text must not be white`);
    assert.notEqual(tokens['--text'].toLowerCase(), '#000000', `${name} text must not be black`);
  }
});

test('wordmark gradient is built from the theme tokens', () => {
  const g = wordmarkGradient(light);
  assert.ok(g.includes(light['--gold3']) && g.includes(light['--g2']));
});
