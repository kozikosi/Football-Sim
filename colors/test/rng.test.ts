import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRng } from '../src/engine/rng.ts';
test('same seed, same stream', () => {
  const a = makeRng(42), b = makeRng(42);
  for (let i = 0; i < 1000; i++) assert.equal(a.next(), b.next());
});
test('different seeds differ; fork is stable and independent', () => {
  assert.notEqual(makeRng(1).next(), makeRng(2).next());
  assert.equal(makeRng(7).fork('draft').next(), makeRng(7).fork('draft').next());
  assert.notEqual(makeRng(7).fork('draft').next(), makeRng(7).fork('season').next());
});
test('uniform mean and normal moments are sane', () => {
  const r = makeRng(5); let s = 0; const n = 200000;
  for (let i = 0; i < n; i++) s += r.next();
  assert.ok(Math.abs(s / n - 0.5) < 0.005);
  const q = makeRng(9); let m = 0, v = 0;
  for (let i = 0; i < n; i++) { const x = q.normal(); m += x; v += x * x; }
  assert.ok(Math.abs(m / n) < 0.01 && Math.abs(v / n - 1) < 0.02);
});
