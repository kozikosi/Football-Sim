import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { draw, gameKeyOf } from '../../src/core/keyedrng.ts';
import { logHash, validateLog } from '../../src/core/events.ts';
import { makePack } from '../../src/core/pack.ts';
import type { PackBody } from '../../src/core/pack.ts';
import { CALL, loadPools, pick, recKeys, k2, k3, k4, sample } from '../../src/sports/nfl/sim/pools.ts';
import type { Pool } from '../../src/sports/nfl/sim/pools.ts';
import { PASS_FEATURES, classPool, loadPassClass, passClassProbs, passFeatures, pickClass, pickClassTuple } from '../../src/sports/nfl/sim/passclass.ts';
import { tilt } from '../../src/sports/nfl/sim/drive.ts';
import { runGame } from '../../src/sports/nfl/sim/game.ts';
import { oldRecKeys, plantedOldLevels } from './oldhier.ts';
import type { GameEv } from '../../src/sports/nfl/sim/game.ts';

// 2a: the pass-class GLM node. Value oracle: scikit-learn's predict_proba on the same coefficients. Bit oracle: the Python lab's pmath evaluator (passclass.py probs_pmath),
// which uses the same + - * / and pmath.plog / pexp. Both are in test/nfl/passclass-vectors.json, written by tools/mathlab/phase1/passclass.py. Held-out evidence for the model
// itself (it beats the pool node by 6.6 SE on 2023-2025) is a REPORT: tools/mathlab/results/glm-pass-class-2026-11-17.md; no football number is pinned here.
const body = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const M = loadPassClass(makePack(body('nfl-passclass-fit2023-2025')));
const P = loadPools(makePack(body('nfl-pools-fit2016-2022')));
const V = JSON.parse(fs.readFileSync(new URL('./passclass-vectors.json', import.meta.url), 'utf8')) as { states: number[][]; features_bits: string[][]; probs_bits: string[][]; sklearn: number[][] };
const buf = new DataView(new ArrayBuffer(8));
const hex = (x: number): string => { buf.setFloat64(0, x); return buf.getBigUint64(0).toString(16).padStart(16, '0'); };

test('pass-class: features and probabilities reproduce the Python lab bit for bit, and agree with scikit-learn to 1e-12', () => {
  let worst = 0;
  V.states.forEach((s, i) => {
    const x = passFeatures(s[0]!, s[1]!, s[2]!, s[3]!, s[4]!, s[5]!), p = passClassProbs(M, x);
    assert.deepEqual(x.map(hex), V.features_bits[i], 'features ' + s);
    assert.deepEqual(p.map(hex), V.probs_bits[i], 'probs ' + s);
    p.forEach((v, k) => { worst = Math.max(worst, Math.abs(v - V.sklearn[i]![k]!)); });
  });
  assert.ok(worst <= 1e-12, 'worst ' + worst);
});

test('pass-class: probabilities are a proper distribution with every class possible', () => {
  for (const s of V.states) {
    const p = passClassProbs(M, passFeatures(s[0]!, s[1]!, s[2]!, s[3]!, s[4]!, s[5]!));
    assert.ok(p.every((v) => v > 0 && v < 1)); assert.ok(Math.abs(p.reduce((a, b) => a + b, 0) - 1) <= 1e-15);
  }
});

test('pass-class: the loader refuses a pack whose features, classes, shapes, numbers or lambda are wrong', () => {
  const bad = (mut: (b: PackBody) => void): void => { const b = body('nfl-passclass-fit2023-2025'); mut(b); assert.throws(() => loadPassClass(makePack(b))); };
  bad((b) => { (b.params['features'] as string[]).reverse(); });
  bad((b) => { (b.params['classes'] as string[]).reverse(); });
  bad((b) => { (b.params['coef'] as number[][]).pop(); });
  bad((b) => { (b.params['coef'] as number[][])[0]!.pop(); });
  bad((b) => { (b.params['intercept'] as (number | null)[])[1] = null; });
  bad((b) => { b.params['lambda'] = -1; });
  bad((b) => { b.rules.values['minClassPool'] = 0; });
});

test('class pools: the four class-restricted pools of any pool partition it exactly (same ids, same weights, only that class)', () => {
  const pools = [...P.rec[0]!.values()].slice(0, 40).concat([...P.rec[4]!.values()]);
  for (const pool of pools) {
    let tot = 0, members = 0;
    for (let c = 0; c < 9; c++) {
      const sub = classPool(pool, P.tuples.oc, c); if (!sub) continue;
      tot += sub.total; members += sub.ids.length;
      for (const id of sub.ids) assert.equal(P.tuples.oc[id], c);
    }
    assert.equal(tot, pool.total); assert.equal(members, pool.ids.length);
  }
});

test('class-then-tuple: a rare class in a thin cell reads from a coarser cell (>= minClassPool plays of that class), and the pass pools hold only pass outcomes', () => {
  const B = P.bins;
  // 4th and 40 at the goal line: a nearly empty cell. An interception must still come from a pool with >= 25 interceptions, never from three.
  const stat: number[] = [];
  const keys = recKeys(B, CALL.pass, 4, 40, 99);
  const pool = pickClassTuple(P.rec, keys, P, 3, M.minClassPool, stat, 0);
  assert.ok(pool.total >= M.minClassPool); assert.equal(stat[0] ?? 0, 0);
  for (let i = 0; i < 100; i++) assert.equal(P.tuples.oc[sample(pool, i / 100)], 3);
  for (const c of [0, 1, 2, 3]) for (const id of pickClassTuple(P.rec, keys, P, c, 25, [], 0).ids) assert.equal(P.tuples.oc[id], c);
});

// A tuple's next down is ABSOLUTE, so a tuple read across downs moves the drive to the wrong down: a 3rd-down incompletion (next: 4th) standing in for a failed 4th-down try kept the drive alive,
// and on 4th-and-1 at the 3 (every outcome ends the drive) the first sampler ended it 54% of the time. Since 18 Nov the record node AND the class sampler share one down-preserving hierarchy (pools.ts rec).
test('rec: levels 0-3 hold exactly the real records of their own down (nothing merges downs until the last level)', () => {
  const R = (body('nfl-pools-fit2016-2022').params as { rec: Record<string, number[]> }).rec, n = R['n']!.length;
  const want: Map<number, number>[] = [new Map(), new Map(), new Map(), new Map()], perDown = new Map<number, number>();
  const edgeLo = (db: number): number => (db === 0 ? -1e9 : P.bins.dist[db - 1]!), binOfDist = (db: number): number => P.bins.distC.filter((e) => e <= edgeLo(db)).length;
  const add = (m: Map<number, number>, k: number, w: number): void => { m.set(k, (m.get(k) ?? 0) + w); };
  for (let i = 0; i < n; i++) {
    const c = R['call']![i]!, d = R['down']![i]!, db = R['db']![i]!, yb = R['yb']![i]!, w = R['n']![i]!;
    add(want[0]!, k4(c, d, db, yb), w); add(want[1]!, k4(c, d, binOfDist(db), yb), w); add(want[2]!, k3(c, d, yb), w); add(want[3]!, k2(c, d), w); add(perDown, c * 100 + d, w);
  }
  assert.equal(P.rec.length, 5);
  for (const L of [0, 2, 3]) {
    const got = new Map([...P.rec[L]!].map(([k, pool]: [number, Pool]) => [k, pool.total] as const));
    assert.deepEqual([...got].sort((a, b) => a[0] - b[0]), [...want[L]!].sort((a, b) => a[0] - b[0]), 'level ' + L);
  }
  let t1 = 0; for (const pool of P.rec[1]!.values()) t1 += pool.total;
  let t3 = 0; for (const w of want[3]!.values()) t3 += w;
  assert.equal(t1, t3);                                    // level 1 is a re-partition of the same records
});

test('class-then-tuple: a failed 4th-down try ends the drive (4th-and-1 on the 3: every outcome ends it; 4th-and-5 at midfield: close to the real cell)', () => {
  const T = P.tuples;
  const ends = (j: number, ydl: number): boolean => { const y = T.yards[j]!; return T.oc[j] === 3 || T.fum[j] === 1 || T.safety[j] === 1 || T.td[j] === 1 || y >= ydl || ydl - y >= 100 || Number.isNaN(T.ndown[j]!) || Number.isNaN(T.delta[j]!); };
  const pEnd = (pool: Pool, ydl: number): number => { let prev = 0, e = 0; for (let i = 0; i < pool.ids.length; i++) { const w = pool.cum[i]! - prev; prev = pool.cum[i]!; if (ends(pool.ids[i]!, ydl)) e += w; } return e / pool.total; };
  const at = (down: number, ytg: number, ydl: number, levels: readonly Map<number, Pool>[], keys: number[]): number => {
    const cell = pick(P.rec, recKeys(P.bins, CALL.pass, down, ytg, ydl), P.minPool, [0, 0, 0, 0, 0], 1);   // the class mix is the pools node's own, so only the tuple source differs
    return [0, 1, 2, 3].reduce((a, k) => a + ((classPool(cell, T.oc, k)?.total ?? 0) / cell.total) * pEnd(pickClassTuple(levels, keys, P, k, M.minClassPool, [], 0), ydl), 0);
  };
  const B = P.bins;
  assert.ok(at(4, 1, 3, P.rec, recKeys(B, CALL.pass, 4, 1, 3)) >= 0.95);
  assert.ok(at(4, 5, 50, P.rec, recKeys(B, CALL.pass, 4, 5, 50)) >= 0.3);
  // the check can fail: the same computation on the old, down-merging hierarchy (planted from the level-0 cells, test/nfl/oldhier.ts) sees the bug
  assert.ok(at(4, 5, 50, plantedOldLevels(P), oldRecKeys(B, CALL.pass, 4, 5, 50)) < 0.2);
});

test('class-then-tuple: whole games with the sampler end 4th-down passes like football (a failed one ends the drive), and never read the hole path', () => {
  let fourth = 0, ended = 0;
  for (let g = 0; g < 400; g++) {
    const o = play('recdown-' + g, { passClass: M });
    assert.equal(o.holes[4] ?? 0, 0);
    const ev = o.events;
    for (let i = 0; i < ev.length; i++) {
      const e = ev[i]!; if (e.kind !== 'snap' || e.payload.call !== CALL.pass || e.payload.down !== 4 || e.payload.oc !== 1) continue;   // an incompletion on 4th down
      fourth++; const nx = ev[i + 1]; if (nx !== undefined && nx.kind !== 'snap') ended++;
    }
  }
  assert.ok(fourth >= 40, 'incompletions on 4th down ' + fourth);
  assert.ok(ended / fourth >= 0.9, `${ended} of ${fourth} failed 4th-down passes were followed by a drive end`);
});

test('class-then-tuple: over keyed draws the sampled class frequencies equal the GLM probabilities (chi-square, 3 df)', () => {
  const s = [3, 7, 62, -4, 4, 200], p = passClassProbs(M, passFeatures(s[0]!, s[1]!, s[2]!, s[3]!, s[4]!, s[5]!)), key = gameKeyOf('passclass-freq'), N = 40000;
  const n = [0, 0, 0, 0]; for (let i = 0; i < N; i++) n[pickClass(p, draw(key, i, 'passClass'))]!++;
  const chi = n.reduce((a, o, k) => a + (o - N * p[k]!) ** 2 / (N * p[k]!), 0);
  assert.ok(chi < 16.27, 'chi-square ' + chi + ' (p = 0.001 cutoff for 3 df)');       // a fixed key, so this is deterministic
});

const play = (key: string, o: Parameters<typeof runGame>[2] = {}) => runGame(P, gameKeyOf(key), o);
const count = (ev: readonly GameEv[], f: (p: Record<string, unknown>) => boolean): number => ev.filter((e) => e.kind === 'snap' && f(e.payload as unknown as Record<string, unknown>)).length;
const withLambda = (lambda: number) => ({ ...M, lambda });

test('game with the GLM node: the log is valid, deterministic, no class-pool holes, and a lambda of 0 or a gap of 0 replays the neutral GLM log bit for bit', () => {
  for (let g = 0; g < 60; g++) {
    const a = play('pc-' + g, { passClass: M }), b = play('pc-' + g, { passClass: M });
    validateLog(a.events); assert.equal(logHash(a.events), logHash(b.events)); assert.equal(a.holes[4], 0);
    assert.equal(logHash(play('pc-' + g, { passClass: withLambda(0), passGap: 1 }).events), logHash(a.events));
    assert.equal(logHash(play('pc-' + g, { passClass: withLambda(2), passGap: 0 }).events), logHash(a.events));
  }
});

test('game with the GLM node: the default (no passClass) is still the pools record node, bit for bit', () => {
  for (let g = 0; g < 20; g++) assert.equal(logHash(play('pc-' + g).events), logHash(play('pc-' + g, {}).events));
  assert.notEqual(logHash(play('pc-0').events), logHash(play('pc-0', { passClass: M }).events));       // and the GLM node is a different node, not a no-op
});

test('lambda seam on the GLM node: completions rise and sacks fall monotonically with the gap (same keys, 300 games)', () => {
  const tot = (gap: number) => { let c = 0, s = 0, pa = 0; for (let g = 0; g < 300; g++) { const ev = play('seam-' + g, { passClass: withLambda(1), passGap: gap }).events; c += count(ev, (p) => p['oc'] === 0); s += count(ev, (p) => p['oc'] === 2); pa += count(ev, (p) => p['call'] === 0); } return { c: c / pa, s: s / pa }; };
  const r = [-1, 0, 1].map(tot);
  assert.ok(r[0]!.c < r[1]!.c && r[1]!.c < r[2]!.c, JSON.stringify(r)); assert.ok(r[0]!.s > r[1]!.s && r[1]!.s > r[2]!.s, JSON.stringify(r));
});

test('keyed coupling: tilting the class probabilities leaves every draw of every OTHER node alone (same key => same call and clock draws)', () => {
  const key = gameKeyOf('couple'); for (let i = 0; i < 50; i++) for (const tag of ['call', 'clock', 'rec', 'passClass']) assert.equal(draw(key, i, tag), draw(key, i, tag));
  const a = play('couple-1', { passClass: withLambda(1), passGap: 0 }).events, b = play('couple-1', { passClass: withLambda(1), passGap: 0.7 }).events;
  let k = 0; while (k < a.length && k < b.length && JSON.stringify(a[k]) === JSON.stringify(b[k])) k++;
  assert.ok(k > 3, 'the logs agree until the first tilted pass: ' + k + ' events');
  assert.ok(tilt([0.5, 0.5], [1, -1], 0, 3)[0] === 0.5);
});

test('the check can fail: wrong feature threshold, swapped classes, or a perturbed coefficient are all caught by the vectors', () => {
  const mis = (m: typeof M, ft: (...a: number[]) => number[] = (...a) => passFeatures(a[0]!, a[1]!, a[2]!, a[3]!, a[4]!, a[5]!)): number => V.states.filter((s, i) => passClassProbs(m, ft(...s)).map(hex).join() !== V.probs_bits[i]!.join()).length;
  assert.equal(mis(M), 0);
  assert.ok(mis({ ...M, coef: M.coef.map((r, k) => (k === 0 ? r.map((v, j) => (j === 3 ? v + 1e-12 : v)) : r)) }) > 100);
  assert.ok(mis({ ...M, intercept: [...M.intercept].reverse() }) > 100);
  assert.ok(mis(M, (...a) => passFeatures(a[0]!, a[1]!, a[2]!, a[3]!, a[4]!, a[5]! + (a[5]! === 300 ? 1 : 0))) > 0);
  assert.equal(PASS_FEATURES.length, 15);
});

test('class-then-tuple keeps the within-class outcome distribution: mean completion yards match the pool node, which they cannot if the class draw and the tuple draw share a uniform', () => {
  const mean = (o: Parameters<typeof runGame>[2]): number => { let y = 0, n = 0; for (let g = 0; g < 400; g++) for (const e of play('wc-' + g, o).events) if (e.kind === 'snap') { const p = e.payload as unknown as { call: number; oc: number; yards: number }; if (p.call === 0 && p.oc === 0) { y += p.yards; n++; } } return y / n; };
  const glm = mean({ passClass: M }), pool = mean({});
  assert.ok(Math.abs(glm - pool) < 0.5, `GLM ${glm.toFixed(2)} vs pool ${pool.toFixed(2)} yards per completion`);   // about 6 SE of this estimate; a shared uniform shifts it by whole yards
});
