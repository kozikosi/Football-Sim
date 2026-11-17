// Writes colors/test/core/pmath-vectors.json: deterministic inputs per function and the TypeScript outputs as 64-bit hex. READ-ONLY on the product.
// Then run `python3 tools/mathlab/pmath_check.py` (checks the Python port reproduces every output bit for bit and fills in high-precision references).
import fs from 'node:fs';
import { pexp, pexpm1, plog, ptanh, psqrt, pnorminv, pcos2pi, psin2pi } from '../../colors/src/core/pmath.ts';
const buf = new DataView(new ArrayBuffer(8));
const hex = (x) => { buf.setFloat64(0, x); return buf.getBigUint64(0).toString(16).padStart(16, '0'); };
let s = 20261114; const rnd = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
const grid = (n, f) => Array.from({ length: n }, () => f(rnd()));
const SETS = {
  pexp: { fn: pexp, xs: [0, 1, -1, 0.5, -0.5, 0.3465, -0.3466, 10, -10, 100, -100, 700, -700, 709, -745, 1e-10, -1e-10, ...grid(400, (u) => (u - 0.5) * 100)] },
  pexpm1: { fn: pexpm1, xs: [0, 1e-300, 1e-10, -1e-10, 0.34, -0.34, 0.35, -0.35, 1, -1, 5, -5, ...grid(400, (u) => (u - 0.5) * 8)] },
  plog: { fn: plog, xs: [1, 2, 0.5, 10, 1e-300, 1e300, 1.4142135623730951, 0.7071067811865476, 1 + 1e-12, 1 - 1e-12, 2 ** 64, 2 ** -64, ...grid(400, (u) => Math.exp((u - 0.5) * 140))] },
  ptanh: { fn: ptanh, xs: [0, 1e-10, -1e-10, 0.1, -0.1, 0.17, 0.175, 1, -1, 5, -5, 21.9, 22, 23, -23, ...grid(400, (u) => (u - 0.5) * 20)] },
  psqrt: { fn: psqrt, xs: [0, 1, 2, 3, 4, 0.25, 1e-300, 1e300, 2 ** 52, ...grid(400, (u) => Math.exp((u - 0.5) * 90))] },
  pcos2pi: { fn: pcos2pi, xs: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, -0.25, -0.5, 1e-20, -1e-20, 1e-300, 0.1, 0.3, 0.7, 1 - 2 ** -53, -(2 ** -53), 5.7, -1234.567, 1e6 + 0.3, 2 ** 40 + 0.375, 2 ** 52 + 1, 2 ** 60, ...grid(400, (u) => (u - 0.5) * 8), ...grid(200, (u) => u)] },
  psin2pi: { fn: psin2pi, xs: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, -0.25, -0.5, 1e-20, -1e-20, 1e-300, 0.1, 0.3, 0.7, 1 - 2 ** -53, -(2 ** -53), 5.7, -1234.567, 1e6 + 0.3, 2 ** 40 + 0.375, 2 ** 52 + 1, 2 ** 60, ...grid(400, (u) => (u - 0.5) * 8), ...grid(200, (u) => u)] },
  pnorminv: { fn: pnorminv, xs: [1e-300, 1e-16, 1e-12, 0.001, 0.01, 0.2, 0.2 + 1e-15, 0.3, 0.5 - 1e-9, 0.5, 0.5 + 1e-9, 0.7, 0.8, 0.8 + 1e-15, 0.975, 0.999, 1 - 1e-9, 1 - 2 ** -53, ...grid(400, (u) => u || 0.5)] },
};
const out = {};
for (const [k, { fn, xs }] of Object.entries(SETS)) out[k] = { x: xs, bits: xs.map((x) => hex(fn(x))) };
fs.writeFileSync(new URL('../../colors/test/core/pmath-vectors.json', import.meta.url), JSON.stringify(out));
console.log('wrote vectors:', Object.entries(out).map(([k, v]) => `${k} ${v.x.length}`).join(', '));
