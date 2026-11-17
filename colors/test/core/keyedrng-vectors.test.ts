import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { philox2x32, gameKeyOf, draw, keyedRng } from '../../src/core/keyedrng.ts';
import { hashString } from '../../src/core/rng.ts';

// colors/test/core/keyedrng-vectors.json is written by tools/mathlab/keyedrng-vectors.mjs from THIS code, and tools/mathlab/keyedrng_check.py checks that the
// Python twin reproduces it exactly. This test keeps the file honest: if keyedrng.ts changes, the vectors must be regenerated, and the twin re-checked, on purpose.
// (The Random123 known-answer vectors, which do not come from our code, are in kernel.test.ts and are re-checked by the Python checker too.)
const V = JSON.parse(readFileSync(new URL('./keyedrng-vectors.json', import.meta.url), 'utf8'));
const buf = new DataView(new ArrayBuffer(8));
const hex = (x: number): string => { buf.setFloat64(0, x); return buf.getBigUint64(0).toString(16).padStart(16, '0'); };
const keyOf = (s: { k: string; v: string }) => gameKeyOf(s.k === 'int' ? Number(s.v) : s.v);

test('keyedrng conformance vectors: the committed file still equals what keyedrng.ts produces', () => {
  for (const v of V.philox) assert.deepEqual(philox2x32(v.c0, v.c1, v.k), v.out);
  for (const v of V.hash) assert.equal(hashString(v.s), v.h);
  for (const v of V.gamekey) { const g = keyOf(v.seed); assert.deepEqual([g.hi, g.lo], [v.hi, v.lo]); }
  for (const v of V.draw) { const d = draw(keyOf(v.seed), v.event, v.tag, v.n); assert.equal(hex(d), v.bits); assert.equal(BigInt(d * 2 ** 53).toString(), v.numer); }
  for (const v of V.rng) {
    const g = keyOf(v.seed), r = keyedRng(g, v.event, v.tag);
    const n1 = r.next(), n2 = r.next(), i1 = r.int(1, 6), i2 = r.int(0, 99), p = r.pick(['a', 'b', 'c', 'd', 'e', 'f', 'g']), nm = r.normal(), n3 = r.next();
    assert.deepEqual([hex(n1), hex(n2), hex(n3)], v.next); assert.deepEqual([i1, i2], v.ints); assert.equal(p, v.pick); assert.equal(hex(nm), v.normal);
    const f1 = keyedRng(g, v.event, v.tag).fork('x'), f2 = keyedRng(g, v.event, v.tag).fork('x').fork('y');
    assert.deepEqual([hex(f1.next()), hex(f1.next())], v.fork); assert.deepEqual([hex(f2.next())], v.fork2);
  }
  for (const v of V.throws) assert.equal((() => { try { draw(gameKeyOf(1), v.event, 't', v.n); return false; } catch { return true; } })(), v.threw);
});
