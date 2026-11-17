import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pexp, pexpm1, plog, ptanh, psqrt, pnorminv, pcos2pi, psin2pi } from '../../src/core/pmath.ts';

// S2. pmath uses only + - * / comparisons and floor, so JavaScript and Python give the same bits. Vectors: test/core/pmath-vectors.json (written by
// tools/mathlab/pmath-vectors.mjs, checked bit for bit against the Python port and filled with libm / statistics.NormalDist references by tools/mathlab/pmath_check.py).
type Set = { x: number[]; bits: string[]; ref?: number[] };
const V = JSON.parse(fs.readFileSync(new URL('./pmath-vectors.json', import.meta.url), 'utf8')) as Record<string, Set>;
const FNS: Record<string, (x: number) => number> = { pexp, pexpm1, plog, ptanh, psqrt, pnorminv, pcos2pi, psin2pi };
const ABS = new Set(['pcos2pi', 'psin2pi']);   // judged on absolute error: relative error is meaningless at a zero of the function
const buf = new DataView(new ArrayBuffer(8));
const hex = (x: number): string => { buf.setFloat64(0, x); return buf.getBigUint64(0).toString(16).padStart(16, '0'); };

for (const [name, fn] of Object.entries(FNS)) {
  test(`pmath ${name}: reproduces its ${V[name]!.x.length} stored vectors bit for bit (these bits are what the Python port also produces)`, () => {
    const d = V[name]!;
    for (let i = 0; i < d.x.length; i++) assert.equal(hex(fn(d.x[i]!)), d.bits[i], `${name}(${d.x[i]})`);
  });
  test(`pmath ${name}: within ${ABS.has(name) ? '1e-15 absolute' : '1e-12 relative'} of the reference (REPORT of the worst case in the diagnostics)`, (t) => {
    const d = V[name]!; assert.ok(d.ref && d.ref.length === d.x.length, 'run tools/mathlab/pmath_check.py to fill the references');
    let worst = 0;
    for (let i = 0; i < d.x.length; i++) { const r = d.ref![i]!, y = fn(d.x[i]!); if (ABS.has(name)) worst = Math.max(worst, Math.abs(y - r)); else if (r !== 0) worst = Math.max(worst, Math.abs(y - r) / Math.abs(r)); else assert.equal(y, 0); }
    t.diagnostic(`worst ${ABS.has(name) ? 'absolute' : 'relative'} error ${worst.toExponential(2)} over ${d.x.length} vectors`);
    assert.ok(worst <= (ABS.has(name) ? 1e-15 : 1e-12), `${name} worst ${worst}`);
  });
}

test('pmath: special values (NaN, infinities, zero, the clamps)', () => {
  assert.ok(Number.isNaN(pexp(NaN))); assert.equal(pexp(Infinity), Infinity); assert.equal(pexp(-Infinity), 0); assert.equal(pexp(0), 1); assert.equal(pexp(710), Infinity); assert.equal(pexp(-746), 0);
  assert.equal(plog(1), 0); assert.equal(plog(0), -Infinity); assert.equal(plog(Infinity), Infinity); assert.ok(Number.isNaN(plog(-1)));
  assert.equal(ptanh(0), 0); assert.equal(ptanh(30), 1); assert.equal(ptanh(-30), -1);
  assert.equal(psqrt(0), 0); assert.equal(psqrt(4), 2); assert.ok(Number.isNaN(psqrt(-1)));
  assert.equal(pnorminv(0), -Infinity); assert.equal(pnorminv(1), Infinity); assert.equal(pnorminv(0.5), 0); assert.ok(Number.isNaN(pnorminv(1.5)));
  assert.equal(pexpm1(0), 0);
});

test('pmath: pcos2pi / psin2pi are exact at the quadrant boundaries, even, periodic and satisfy cos^2 + sin^2 = 1 (identities, no reference)', () => {
  assert.deepEqual([0, 0.25, 0.5, 0.75, 1, -0.25].map(pcos2pi), [1, 0, -1, 0, 1, 0]);
  assert.deepEqual([0, 0.25, 0.5, 0.75, 1, -0.25].map(psin2pi), [0, 1, 0, -1, 0, -1]);
  for (const v of [0, 0.25, 0.5, 0.75, 1, -0.25]) { assert.ok(!Object.is(pcos2pi(v), -0)); assert.ok(!Object.is(psin2pi(v), -0)); }
  assert.ok(Number.isNaN(pcos2pi(NaN)) && Number.isNaN(psin2pi(Infinity)));
  for (let i = 0; i < 2000; i++) {
    const t = (i - 1000) / 1024;       // dyadic: t + 3 is exact, so the period check tests the function, not the rounding of the input
    assert.ok(Math.abs(pcos2pi(t) - pcos2pi(-t)) <= 2.3e-16, "even " + t);   /* 1 ulp: the two sides take the sin and the cos branch, so bit symmetry is not promised */ assert.ok(Math.abs(pcos2pi(t) ** 2 + psin2pi(t) ** 2 - 1) <= 4e-16, String(t));
    assert.equal(pcos2pi(t), pcos2pi(t + 3), 'period ' + t); assert.equal(psin2pi(t), psin2pi(t - 7), 'period ' + t);
  }
});

test('pmath: pnorminv is odd and monotone, and exp/log invert each other (identities that do not use any reference)', () => {
  let prev = -Infinity;
  for (let i = 1; i < 1000; i++) { const p = i / 1000, x = pnorminv(p); assert.ok(x > prev, `monotone at ${p}`); prev = x; assert.ok(Math.abs(x + pnorminv(1 - p)) <= 1e-13 * Math.max(1, Math.abs(x)), `odd at ${p}`); }
  for (const x of [0.001, 0.7, 3, 123.456, 1e-9, 1e9]) assert.ok(Math.abs(pexp(plog(x)) / x - 1) <= 4e-16 * 4, String(x));
});

test('pmath: the check can fail (a one-bit change to an output is caught by the bit comparison)', () => {
  const d = V.pexp!, y = pexp(d.x[5]!);
  buf.setFloat64(0, y); buf.setBigUint64(0, buf.getBigUint64(0) ^ 1n);
  assert.notEqual(hex(buf.getFloat64(0)), d.bits[5]);
});
