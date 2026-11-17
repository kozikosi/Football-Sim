// Writes colors/test/core/keyedrng-vectors.json: deterministic inputs and the TypeScript outputs for core/keyedrng.ts. READ-ONLY on the product.
// Then run `python3 -I tools/mathlab/keyedrng_check.py` (the Python twin tools/mathlab/keyedrng.py must reproduce every output; draws are exact integers).
import fs from 'node:fs';
import { philox2x32, gameKeyOf, draw, keyedRng } from '../../colors/src/core/keyedrng.ts';
import { hashString } from '../../colors/src/core/rng.ts';
const buf = new DataView(new ArrayBuffer(8));
const hex = (x) => { buf.setFloat64(0, x); return buf.getBigUint64(0).toString(16).padStart(16, '0'); };
let s = 20261116; const rnd = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) >>> 0;
const U = [0, 1, 2, 0x7fffffff, 0x80000000, 0xfffffffe, 0xffffffff];
const out = { philox: [], hash: [], gamekey: [], draw: [], rng: [], throws: [] };

for (const c0 of U) for (const k of [0, 0xffffffff, 0x243f6a88]) { const [a, b] = philox2x32(c0, 0x85a308d3, k); out.philox.push({ c0, c1: 0x85a308d3, k, out: [a, b] }); }
out.philox.push({ c0: 0, c1: 0, k: 0, out: philox2x32(0, 0, 0) }, { c0: 0xffffffff, c1: 0xffffffff, k: 0xffffffff, out: philox2x32(0xffffffff, 0xffffffff, 0xffffffff) });
for (let i = 0; i < 300; i++) { const c0 = rnd(), c1 = rnd(), k = rnd(); out.philox.push({ c0, c1, k, out: philox2x32(c0, c1, k) }); }

const STRS = ['', 'a', 'tag', 'pass/result', 'league-2026/season-3/game-17', 'é', 'Ωmega', '日本語', '\u{1F3C8}', 'x\u{1F3C8}y', '\ud800', 'a\udc00b', 'A'.repeat(300)];
for (const t of STRS) out.hash.push({ s: t, h: hashString(t) });

// seeds: ints as exact decimal STRINGS (a JSON number above 2^53 would lose digits in transit), strings as strings
const INTS = [0, 1, 2, 7, 12345, 4294967295, 4294967296, 4294967297, 2 ** 40 + 12345, 2 ** 52 + 1, Number.MAX_SAFE_INTEGER, -1, -2, -4294967296, -(2 ** 40) - 7, 2 ** 60, -(2 ** 60)];
for (let i = 0; i < 60; i++) INTS.push(rnd() * 2 ** 21 + rnd() * 2 ** 10 * (i % 2 ? -1 : 1));
const SEEDS = [...INTS.map((v) => Math.trunc(v)).map((v) => ({ k: 'int', v: BigInt(v).toString() })), ...STRS.map((t) => ({ k: 'str', v: t }))];
const keyOf = (sd) => gameKeyOf(sd.k === 'int' ? Number(sd.v) : sd.v);
for (const sd of SEEDS) { const g = keyOf(sd); out.gamekey.push({ seed: sd, hi: g.hi, lo: g.lo }); }

const TAGS = ['', 'call', 'pass/result', 'clock', 'é', '\u{1F3C8}', 'Z'.repeat(70)];
const EV = [0, 1, 2, 203, 65535, 65536, 0x7fffffff, 0xfffffffe, 0xffffffff];
const NS = [0, 1, 5, 0x7fffffff, 0xffffffff];
let c = 0;
for (const sd of SEEDS.slice(0, 40)) {
  const g = keyOf(sd);
  for (let i = 0; i < 6; i++) {
    const ev = EV[(c + i) % EV.length], tag = TAGS[(c * 3 + i) % TAGS.length], n = NS[(c + 2 * i) % NS.length]; c++;
    const d = draw(g, ev, tag, n);
    out.draw.push({ seed: sd, event: ev, tag, n, bits: hex(d), numer: BigInt(d * 2 ** 53).toString() });
  }
}
// an Rng script on one cell: next, next, int(1,6), int(0,99), pick, normal, next; two forks (one nested). Checks ordering and counter handling.
const LIST = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
for (const sd of SEEDS.slice(0, 40)) {
  const g = keyOf(sd);
  for (const [ev, tag] of [[0, ''], [17, 'pass/result'], [0xffffffff, 'é']]) {
    const r = keyedRng(g, ev, tag);
    const n1 = r.next(), n2 = r.next(), i1 = r.int(1, 6), i2 = r.int(0, 99), p = r.pick(LIST), nm = r.normal(), n3 = r.next();
    const f1 = keyedRng(g, ev, tag).fork('x'), f2 = keyedRng(g, ev, tag).fork('x').fork('y');
    out.rng.push({ seed: sd, event: ev, tag, next: [hex(n1), hex(n2), hex(n3)], ints: [i1, i2], pick: p, normal: hex(nm),
      fork: [hex(f1.next()), hex(f1.next())], fork2: [hex(f2.next())] });
  }
}
for (const [ev, n] of [[-1, 0], [0, -1], [0x100000000, 0], [0, 0x100000000], [1.5, 0], [0, 2.5]]) {
  let threw = false; try { draw(gameKeyOf(1), ev, 't', n); } catch { threw = true; }
  out.throws.push({ event: ev, n, threw });
}
fs.writeFileSync(new URL('../../colors/test/core/keyedrng-vectors.json', import.meta.url), JSON.stringify(out));
console.log('wrote vectors:', Object.entries(out).map(([k, v]) => `${k} ${v.length}`).join(', '));
