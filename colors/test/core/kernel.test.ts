import { test } from 'node:test';
import assert from 'node:assert/strict';
import { draw, gameKeyOf, keyedRng, philox2x32 } from '../../src/core/keyedrng.ts';
import { canonicalText, logBuilder, logHash, validateLog } from '../../src/core/events.ts';
import type { GameEvent } from '../../src/core/events.ts';
import { foldAll, foldLog } from '../../src/core/fold.ts';
import type { Fold } from '../../src/core/fold.ts';
import { makePack, packHash, verifyPack } from '../../src/core/pack.ts';

// ---- keyed RNG ----
// Source of the vectors: Random123 tests/kat_vectors (github.com/DEShawResearch/random123), the lines `philox2x32 10 <ctr0> <ctr1> <key>`.
// Source of the constants: Random123 include/Random123/philox.h: PHILOX_M2x32_0 = 0xd256d193 (Philox2x32), PHILOX_W32_0 = 0x9E3779B9.
// 0xD2511F53 is PHILOX_M4x32_0, the multiplier of Philox4x32 (TensorFlow, cuRAND), NOT of Philox2x32. Checked 11 Nov 2026 against the
// published files after MUSE reported M0 as wrong; the reference below uses BigInt and shares no code with keyedrng.ts.
test('philox2x32-10 matches the Random123 known-answer vectors', () => {
  assert.deepEqual(philox2x32(0, 0, 0), [0xff1dae59, 0x6cd10df2]);
  assert.deepEqual(philox2x32(0xffffffff, 0xffffffff, 0xffffffff), [0x2c3f628b, 0xab4fd7ad]);
  assert.deepEqual(philox2x32(0x243f6a88, 0x85a308d3, 0x13198a2e), [0xdd7ce038, 0xf62a4c12]);
});
const MASK32 = 0xffffffffn;
function refPhilox2x32(c0: number, c1: number, k: number, rounds = 10): [number, number] {
  const M = 0xd256d193n, W = 0x9e3779b9n;
  let x0 = BigInt(c0), x1 = BigInt(c1), key = BigInt(k);
  for (let r = 0; r < rounds; r++) {
    const p = M * x0;
    x0 = ((p >> 32n) ^ key ^ x1) & MASK32;
    x1 = p & MASK32;
    key = (key + W) & MASK32;
  }
  return [Number(x0), Number(x1)];
}
function refPhilox4x32(ctr: number[], key: number[], rounds = 10): number[] {
  const MA = 0xd2511f53n, MB = 0xcd9e8d57n, WA = 0x9e3779b9n, WB = 0xbb67ae85n;
  let [x0, x1, x2, x3] = ctr.map(BigInt) as [bigint, bigint, bigint, bigint];
  let [k0, k1] = key.map(BigInt) as [bigint, bigint];
  for (let r = 0; r < rounds; r++) {
    const pa = MA * x0, pb = MB * x2;
    [x0, x1, x2, x3] = [((pb >> 32n) ^ x1 ^ k0) & MASK32, pb & MASK32, ((pa >> 32n) ^ x3 ^ k1) & MASK32, pa & MASK32];
    k0 = (k0 + WA) & MASK32; k1 = (k1 + WB) & MASK32;
  }
  return [x0, x1, x2, x3].map(Number);
}
test('independent BigInt reference reproduces the published Philox2x32 and Philox4x32 vectors (so the reference itself is trusted)', () => {
  assert.deepEqual(refPhilox2x32(0, 0, 0), [0xff1dae59, 0x6cd10df2]);
  assert.deepEqual(refPhilox2x32(0xffffffff, 0xffffffff, 0xffffffff), [0x2c3f628b, 0xab4fd7ad]);
  assert.deepEqual(refPhilox2x32(0, 0, 0, 7), [0x257a3673, 0xcd26be2a]);
  assert.deepEqual(refPhilox4x32([0, 0, 0, 0], [0, 0]), [0x6627e8d5, 0xe169c58d, 0xbc57ac4c, 0x9b00dbd8]);
  assert.deepEqual(refPhilox4x32([0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff], [0xffffffff, 0xffffffff]), [0x408f276d, 0x41c83b0e, 0xa20bc7c6, 0x6d5451fd]);
  assert.deepEqual(refPhilox4x32([0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344], [0xa4093822, 0x299f31d0]), [0xd16cfe09, 0x94fdcceb, 0x5001e420, 0x24126ea1]);
});
test('production philox2x32 (16-bit limb multiply) equals the BigInt reference on 20,000 inputs incl. edge words', () => {
  const edge = [0, 1, 0xffff, 0x10000, 0x7fffffff, 0x80000000, 0xfffffffe, 0xffffffff, 0xd256d193, 0x9e3779b9];
  for (const a of edge) for (const b of edge) for (const k of [0, 0xffffffff, 0x9e3779b9]) assert.deepEqual(philox2x32(a, b, k), refPhilox2x32(a, b, k));
  let s = 0x12345678;
  const nx = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s; };
  for (let i = 0; i < 20000; i++) { const a = nx(), b = nx(), k = nx(); assert.deepEqual(philox2x32(a, b, k), refPhilox2x32(a, b, k)); }
});
test('draw is a pure function of (key, event, tag, n) and lies in [0,1)', () => {
  const k = gameKeyOf(12345);
  for (let i = 0; i < 200; i++) {
    const a = draw(k, i, 'pass', 0), b = draw(k, i, 'pass', 0);
    assert.equal(a, b);
    assert.ok(a >= 0 && a < 1);
  }
});
test('different event, tag, n, game each change the draw', () => {
  const k = gameKeyOf(1), base = draw(k, 5, 'pass', 0);
  assert.notEqual(base, draw(k, 6, 'pass', 0));
  assert.notEqual(base, draw(k, 5, 'run', 0));
  assert.notEqual(base, draw(k, 5, 'pass', 1));
  assert.notEqual(base, draw(gameKeyOf(2), 5, 'pass', 0));
});
test('replay one event alone: the cell gives the same numbers no matter what was drawn before it', () => {
  const k = gameKeyOf('league7/2026/w3/KC-BUF');
  const full = Array.from({ length: 50 }, (_, i) => keyedRng(k, i, 'play').next());
  const alone = keyedRng(k, 37, 'play').next();
  assert.equal(alone, full[37]);
});
test('counterfactual coupling: extra draws in one event never shift the next event (the sequential stream cannot do this)', () => {
  const k = gameKeyOf(99);
  const a = keyedRng(k, 10, 'x'); a.next(); a.next(); a.next();     // original consumed 3 draws at event 10
  const b = keyedRng(k, 10, 'x'); b.next();                         // counterfactual consumed 1
  assert.equal(keyedRng(k, 11, 'x').next(), keyedRng(k, 11, 'x').next());
  assert.equal(draw(k, 11, 'x', 0), keyedRng(k, 11, 'x').next());
});
test('adding a tag never changes what another tag draws; fork extends the tag', () => {
  const k = gameKeyOf(3), before = draw(k, 4, 'pass', 2);
  keyedRng(k, 4, 'newtag').next();
  assert.equal(draw(k, 4, 'pass', 2), before);
  assert.equal(keyedRng(k, 4, 'a').fork('b').next(), draw(k, 4, 'a/b', 0));
  assert.notEqual(keyedRng(k, 4, 'a').fork('b').next(), keyedRng(k, 4, 'a').next());
});
test('uniformity: mean, variance and decile counts are sane over 100k draws', () => {
  const k = gameKeyOf(2026), N = 100000, bins = new Array<number>(10).fill(0);
  let s = 0, s2 = 0;
  for (let i = 0; i < N; i++) { const u = draw(k, i, 'u', 0); s += u; s2 += u * u; bins[Math.floor(u * 10)]++; }
  const mean = s / N, vr = s2 / N - mean * mean;
  assert.ok(Math.abs(mean - 0.5) < 0.005, 'mean ' + mean);
  assert.ok(Math.abs(vr - 1 / 12) < 0.002, 'var ' + vr);
  for (const c of bins) assert.ok(Math.abs(c - N / 10) < 5 * Math.sqrt(N * 0.09), 'decile ' + c);
});
test('serial independence: lag-1 correlation of consecutive events is near zero', () => {
  const k = gameKeyOf(7), N = 50000;
  let sxy = 0, sx = 0, sy = 0, sxx = 0, syy = 0, prev = draw(k, 0, 'c', 0);
  for (let i = 1; i < N; i++) { const u = draw(k, i, 'c', 0); sx += prev; sy += u; sxy += prev * u; sxx += prev * prev; syy += u * u; prev = u; }
  const n = N - 1, r = (sxy / n - (sx / n) * (sy / n)) / Math.sqrt((sxx / n - (sx / n) ** 2) * (syy / n - (sy / n) ** 2));
  assert.ok(Math.abs(r) < 0.02, 'r ' + r);
});
test('normal() has mean 0 and sd 1; int() stays in range and hits both ends', () => {
  const r = keyedRng(gameKeyOf(5), 0, 'n');
  let s = 0, s2 = 0; const N = 50000;
  for (let i = 0; i < N; i++) { const z = r.normal(); s += z; s2 += z * z; }
  assert.ok(Math.abs(s / N) < 0.03 && Math.abs(s2 / N - 1) < 0.04);
  const q = keyedRng(gameKeyOf(5), 1, 'i'); const seen = new Set<number>();
  for (let i = 0; i < 2000; i++) { const v = q.int(3, 6); assert.ok(v >= 3 && v <= 6); seen.add(v); }
  assert.deepEqual([...seen].sort(), [3, 4, 5, 6]);
});
test('bad inputs are rejected', () => {
  const k = gameKeyOf(1);
  assert.throws(() => draw(k, -1, 't'));
  assert.throws(() => draw(k, 1.5, 't'));
  assert.throws(() => gameKeyOf(1.5));
});

// ---- event log ----
type Ev = GameEvent<'pts' | 'start', { n: number }>;
function sampleLog(): readonly Ev[] {
  const b = logBuilder<Ev>();
  b.emit(0, 'start', [], { n: 0 }); b.emit(10, 'pts', ['a'], { n: 3 }); b.emit(10, 'pts', ['b'], { n: 7 }); b.emit(99, 'pts', ['a'], { n: 3 });
  return b.events;
}
test('logBuilder numbers events 0..n-1 and the log validates', () => {
  const log = sampleLog(); validateLog(log);
  assert.deepEqual(log.map((e) => e.i), [0, 1, 2, 3]);
});
test('validateLog rejects a gap, time going backwards and an empty kind (the check can fail)', () => {
  const log = sampleLog();
  assert.throws(() => validateLog([log[0] as Ev, log[2] as Ev]), /event 1 has i=2/);
  assert.throws(() => validateLog([{ ...(log[0] as Ev), t: 5 }, { ...(log[1] as Ev), t: 4 }]), /back in time/);
  assert.throws(() => validateLog([{ ...(log[0] as Ev), kind: '' as 'start' }]), /no kind/);
});
test('canonical text ignores key order and undefined, rejects NaN; logHash changes with any change', () => {
  assert.equal(canonicalText({ b: 1, a: [1, { d: 2, c: undefined }] }), canonicalText({ a: [1, { c: undefined, d: 2 }], b: 1 }));
  assert.equal(canonicalText({ a: 1 }), '{"a":1}');
  assert.throws(() => canonicalText({ a: NaN }));
  const log = sampleLog(), h = logHash(log);
  assert.equal(h, logHash(sampleLog()));
  const b = logBuilder<Ev>(); for (const e of log) b.emit(e.t, e.kind, e.actors, e.kind === 'pts' && e.i === 2 ? { n: 6 } : e.payload);
  assert.notEqual(h, logHash(b.events));
});

// ---- folds ----
const total: Fold<{ n: number }, Ev> = { name: 'total', init: () => ({ n: 0 }), reduce: (s, e) => { if (e.kind === 'pts') s.n += e.payload.n; return s; } };
const count: Fold<{ k: number }, Ev> = { name: 'count', init: () => ({ k: 0 }), reduce: (s) => { s.k++; return s; } };
test('foldLog: replay determinism (same log, same state, fresh state each time) and upTo gives the game after play N', () => {
  const log = sampleLog();
  assert.deepEqual(foldLog(total, log), { n: 13 });
  assert.deepEqual(foldLog(total, log), { n: 13 });
  assert.deepEqual(foldLog(total, log, 2), { n: 3 });
  assert.deepEqual(foldLog(total, log, 0), { n: 0 });
  assert.throws(() => foldLog(total, log, 5));
});
test('foldAll equals running each fold alone', () => {
  const log = sampleLog(), all = foldAll({ total, count }, log);
  assert.deepEqual(all.total, foldLog(total, log));
  assert.deepEqual(all.count, foldLog(count, log));
});

// ---- model pack ----
const body = { schema: 1 as const, id: 't', rules: { sport: 'nfl', regime: '2025', values: { otBoth: true, penalties: false } }, params: { a: 1, b: [1, 2], c: { x: 'y' } }, provenance: { source: 'test', fitDate: '2026-11-11' } };
test('pack hash is stable, key-order independent, and changes when any parameter or rule changes', () => {
  const p = makePack(body);
  assert.ok(verifyPack(p));
  assert.equal(p.hash, makePack({ ...body, params: { c: { x: 'y' }, b: [1, 2], a: 1 } }).hash);
  assert.notEqual(p.hash, packHash({ ...body, params: { ...body.params, a: 2 } }));
  assert.notEqual(p.hash, packHash({ ...body, rules: { ...body.rules, regime: '2024' } }));
});
test('a hand-edited pack fails verification; a pack with no origin cannot be made', () => {
  const p = makePack(body);
  assert.ok(!verifyPack({ ...p, params: { ...p.params, a: 99 } }));
  assert.throws(() => makePack({ ...body, provenance: { source: '', fitDate: '2026-11-11' } }));
});
