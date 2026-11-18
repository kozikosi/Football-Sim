// 2a follow-up: WHY does the pass-class GLM shift sacks and drives on a whole game? A REPORT (nothing here gates a build). Three paired arms on the SAME game keys:
//   A  the pools' own record node                                  (what the product has)
//   C  CONTROL: the class-then-tuple sampler fed the POOL's own class mix   (sampler only; no GLM)
//   G  the GLM class node + the same sampler
// so  C - A = the sampler's effect (rare classes back off to coarser cells),  G - C = the GLM's class probabilities, and G - A is what glm-bar.ts shows.
// Class rates: every pass snap's state is read back from the event log (the score difference is rebuilt from the score events) and BOTH nodes' exact class probabilities are
// evaluated at it, so the decomposition  rate(G sim) - rate(A sim) = RATE effect (the nodes disagree at the SAME states) + MIX effect (the sim visits different states)  is exact.
// REAL states (a CSV from tools/mathlab/phase1/passstates.py) test the state-mix story: a pool-cell reweighting predicts the rate effect from the real disagreement alone.
// Usage: node --experimental-strip-types tools/glm-shift.ts [games=40000] [real.csv] [class=sack|comp|inc|int] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025]
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools, pick, recKeys, CALL } from '../src/sports/nfl/sim/pools.ts';
import type { Pool } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass, passClassProbs, passFeatures, pickClassTuple, classPool, PASS_CLASSES } from '../src/sports/nfl/sim/passclass.ts';
import { runGame, TEAMS } from '../src/sports/nfl/sim/game.ts';
import type { GameOut } from '../src/sports/nfl/sim/game.ts';
import { gameTotals, METRICS } from '../src/sports/nfl/sim/totals.ts';

const N = Number(process.argv[2] ?? 40000), realPath = process.argv[3] ?? '', clsName = process.argv[4] ?? 'sack';
const poolsName = process.argv[5] ?? 'nfl-pools-fit2023-2025', pcName = process.argv[6] ?? 'nfl-passclass-fit2023-2025';
const K = PASS_CLASSES.indexOf(clsName as (typeof PASS_CLASSES)[number]);
if (K < 0) throw new Error('class must be one of ' + PASS_CLASSES.join(', '));
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load(poolsName))), M = loadPassClass(makePack(load(pcName)));
const B = P.bins, T = P.tuples, NB = 20;

// the pools node's class mix at a state: the weighted oc mix of the pool its hierarchy picks
const mixCache = new WeakMap<Pool, number[]>();
const poolMix = (down: number, ytg: number, ydl: number): number[] => {
  const pool = pick(P.rec, recKeys(B, CALL.pass, down, ytg, ydl), P.minPool, [0, 0, 0, 0, 0], 1);
  let m = mixCache.get(pool);
  if (m === undefined) {
    m = [0, 0, 0, 0]; let prev = 0;
    for (let i = 0; i < pool.ids.length; i++) { const w = pool.cum[i]! - prev; prev = pool.cum[i]!; m[T.oc[pool.ids[i]!]!] = m[T.oc[pool.ids[i]!]!]! + w; }
    for (let k = 0; k < 4; k++) m[k] = m[k]! / pool.total;
    mixCache.set(pool, m);
  }
  return m;
};
const glmMix = (down: number, ytg: number, ydl: number, sd: number, qtr: number, hs: number): number[] => passClassProbs(M, passFeatures(down, ytg, ydl, sd, qtr, hs));

// ---- buckets: three partitions of the pass-state space ----
interface St { down: number; ytg: number; ydl: number; sd: number; qtr: number; hs: number }
const PARTS: { name: string; of: (s: St) => string }[] = [
  { name: 'down & distance', of: (s) => s.down === 1 ? '1st' : s.down >= 4 ? '4th' : `${s.down === 2 ? '2nd' : '3rd'} ${s.ytg <= 3 ? '1-3' : s.ytg <= 7 ? '4-7' : '8+'}` },
  { name: 'field', of: (s) => s.ydl >= 80 ? 'own 20 or less (ydl>=80)' : s.ydl > 40 ? 'between (41-79)' : s.ydl > 20 ? 'plus (21-40)' : 'red zone (<=20)' },
  { name: 'score & clock', of: (s) => s.qtr === 5 ? 'overtime' : `${(s.qtr === 2 || s.qtr === 4) && s.hs <= 300 ? 'late' : 'early'} ${s.sd < -8 ? 'trail>8' : s.sd > 8 ? 'lead>8' : 'within 8'}` },
];
interface Acc { n: number; pool: number[]; glm: number[]; cls: number[] }
const mk = (): Acc => ({ n: 0, pool: [0, 0, 0, 0], glm: [0, 0, 0, 0], cls: [0, 0, 0, 0] });
const add = (a: Acc, pm: readonly number[], gm: readonly number[], oc: number): void => { a.n++; for (let k = 0; k < 4; k++) { a.pool[k] = a.pool[k]! + pm[k]!; a.glm[k] = a.glm[k]! + gm[k]!; } if (oc >= 0) a.cls[oc] = a.cls[oc]! + 1; };
interface Arm { tot: Acc; batch: Acc[]; parts: Map<string, Acc>[]; cell: Map<number, Acc> }
const newArm = (): Arm => ({ tot: mk(), batch: Array.from({ length: NB }, mk), parts: PARTS.map(() => new Map()), cell: new Map() });
const bump = (m: Map<string, Acc>, k: string): Acc => { let a = m.get(k); if (a === undefined) { a = mk(); m.set(k, a); } return a; };
function visit(arm: Arm, s: St, oc: number, b: number): void {
  const pm = poolMix(s.down, s.ytg, s.ydl), gm = glmMix(s.down, s.ytg, s.ydl, s.sd, s.qtr, s.hs);
  add(arm.tot, pm, gm, oc); add(arm.batch[b]!, pm, gm, oc);
  PARTS.forEach((p, i) => add(bump(arm.parts[i]!, p.of(s)), pm, gm, oc));
  const ck = recKeys(B, CALL.pass, s.down, s.ytg, s.ydl)[0]!;
  let c = arm.cell.get(ck); if (c === undefined) { c = mk(); arm.cell.set(ck, c); } add(c, pm, gm, oc);
}
// the pass snaps of a log, with the score difference rebuilt from the score and extra-point events (a snap is emitted BEFORE its own score event)
function passSnaps(g: GameOut, f: (s: St, oc: number, dt: number) => void): void {
  const pts: Record<string, number> = { A: 0, B: 0 };
  for (const e of g.events) {
    if (e.kind === 'score' || e.kind === 'extra_point') pts[e.payload.team] = (pts[e.payload.team] ?? 0) + e.payload.points;
    else if (e.kind === 'snap' && e.payload.call === CALL.pass) {
      const p = e.payload, o = p.team === 'A' ? 'B' : 'A', ot = p.qtr === 5;
      f({ down: p.down, ytg: p.ytg, ydl: p.ydl, sd: ot ? 0 : (pts[p.team] ?? 0) - (pts[o] ?? 0), qtr: ot ? 2 : p.qtr, hs: ot ? 600 : p.hs }, p.oc, p.dt);
    }
  }
}

// ---- run the three arms on the same keys ----
const arms = { A: newArm(), C: newArm(), G: newArm() };
const dMet: Record<'CA' | 'GC' | 'GA', Record<string, number[]>> = { CA: {}, GC: {}, GA: {} };
const sumMet: Record<'A' | 'C' | 'G', Record<string, number>> = { A: {}, C: {}, G: {} };
for (const m of METRICS) { for (const k of ['CA', 'GC', 'GA'] as const) dMet[k][m] = []; for (const k of ['A', 'C', 'G'] as const) sumMet[k][m] = 0; }
let holesC = 0, holesG = 0;
const dtSum = { A: [0, 0, 0, 0], C: [0, 0, 0, 0], G: [0, 0, 0, 0] }, dtN = { A: [0, 0, 0, 0], C: [0, 0, 0, 0], G: [0, 0, 0, 0] };
const dtR = { C: [[0, 0, 0, 0], [0, 0, 0, 0]], G: [[0, 0, 0, 0], [0, 0, 0, 0]] }, dtRN = { C: [[0, 0, 0, 0], [0, 0, 0, 0]], G: [[0, 0, 0, 0], [0, 0, 0, 0]] };   // [late-half clock pools (q2/q4, <=300 s) or not][class]
const dtAdd = (arm: 'A' | 'C' | 'G') => (s: St, oc: number, dt: number): void => {
  dtSum[arm][oc] = dtSum[arm][oc]! + dt; dtN[arm][oc] = dtN[arm][oc]! + 1;
  if (arm !== 'A') { const r = (s.qtr === 2 || s.qtr === 4) && s.hs <= 300 ? 1 : 0; dtR[arm][r]![oc] = dtR[arm][r]![oc]! + dt; dtRN[arm][r]![oc] = dtRN[arm][r]![oc]! + 1; }
};
for (let g = 0; g < N; g++) {
  const key = gameKeyOf('glm-shift:' + g), b = g % NB;
  const ga = runGame(P, key), gc = runGame(P, key, { passClass: M, classMix: poolMix }), gg = runGame(P, key, { passClass: M });
  holesC += gc.holes[4] ?? 0; holesG += gg.holes[4] ?? 0;
  passSnaps(ga, (s, oc, dt) => { visit(arms.A, s, oc, b); dtAdd('A')(s, oc, dt); }); passSnaps(gc, (s, oc, dt) => { visit(arms.C, s, oc, b); dtAdd('C')(s, oc, dt); }); passSnaps(gg, (s, oc, dt) => { visit(arms.G, s, oc, b); dtAdd('G')(s, oc, dt); });
  const ta = gameTotals(ga), tc = gameTotals(gc), tg = gameTotals(gg);
  for (const m of METRICS) {
    let x = 0, y = 0, z = 0; for (const t of TEAMS) { x += ta[t]![m]; y += tc[t]![m]; z += tg[t]![m]; }
    dMet.CA[m]!.push((y - x) / 2); dMet.GC[m]!.push((z - y) / 2); dMet.GA[m]!.push((z - x) / 2);
    sumMet.A[m] = sumMet.A[m]! + x / 2; sumMet.C[m] = sumMet.C[m]! + y / 2; sumMet.G[m] = sumMet.G[m]! + z / 2;
  }
}
const f3 = (x: number): string => x.toFixed(3), pc = (x: number): string => (100 * x).toFixed(3) + '%', pad = (s: string, n: number): string => s.padStart(n);
const meanSe = (v: readonly number[]): [number, number] => { const n = v.length, m = v.reduce((s, x) => s + x, 0) / n, sd = Math.sqrt(v.reduce((s, x) => s + (x - m) ** 2, 0) / (n - 1)); return [m, sd / Math.sqrt(n)]; };

console.log(`glm-shift: ${N} games x 3 paired arms; pools ${poolsName}; passclass ${pcName}; class under study: ${clsName}; class-pool holes C ${holesC} G ${holesG}`);
console.log('\n## 1. Whole game, paired on the same keys (per team-game means).  C-A = the SAMPLER alone, G-C = the GLM probabilities alone, G-A = both (glm-bar.ts)');
console.log('metric        A mean   |  C-A %    z   |  G-C %    z   |  G-A %    z');
for (const m of METRICS) {
  const a = sumMet.A[m]! / N, row = [pad(a.toFixed(3), 9)];
  for (const k of ['CA', 'GC', 'GA'] as const) { const [mu, se] = meanSe(dMet[k][m]!); row.push(`${pad(((100 * mu) / a).toFixed(2), 7)} ${pad((mu / se).toFixed(1), 6)}`); }
  console.log(m.padEnd(12) + row.join('  |'));
}

// ---- 2. class rates and the exact decomposition ----
const A = arms.A, C = arms.C, G = arms.G;
console.log('\n## 2. Pass-class rates per attempt: realized, and the nodes\' exact probabilities at the visited states');
console.log('arm  attempts/game   ' + PASS_CLASSES.map((c) => c.padStart(8)).join(' ') + '    (realized)   |  E[pool node]  E[GLM] at those states for ' + clsName);
for (const [nm, a] of [['A', A], ['C', C], ['G', G]] as const) console.log(`${nm}    ${pad((a.tot.n / (2 * N)).toFixed(3), 12)}   ${a.tot.cls.map((x) => pad(pc(x / a.tot.n), 8)).join(' ')}      |  ${pad(pc(a.tot.pool[K]! / a.tot.n), 10)}  ${pad(pc(a.tot.glm[K]! / a.tot.n), 8)}`);
console.log('(a realized rate that differs from its own node\'s E[.] would mean the harness misreads the log: A and C should match E[pool node], G E[GLM])');
const dec = (x: Acc, y: Acc): { tot: number; rate: number; mix: number } => ({ tot: y.glm[K]! / y.n - x.pool[K]! / x.n, rate: (x.glm[K]! - x.pool[K]!) / x.n, mix: y.glm[K]! / y.n - x.glm[K]! / x.n });
const decB = (b: number): ReturnType<typeof dec> => dec(A.batch[b]!, G.batch[b]!);
const se = (f: (d: ReturnType<typeof dec>) => number): number => meanSe(Array.from({ length: NB }, (_, b) => f(decB(b))))[1];
const d = dec(A.tot, G.tot);
console.log(`\n${clsName} rate, GLM sim minus pools sim = ${pc(d.tot)} (+-${pc(se((x) => x.tot))}) =`);
console.log(`   RATE effect (the nodes disagree at the SAME states, taken on the pools-sim states):  ${pc(d.rate)} (+-${pc(se((x) => x.rate))})`);
console.log(`   MIX  effect (the GLM sim visits different states, GLM probabilities):               ${pc(d.mix)} (+-${pc(se((x) => x.mix))})`);
const dC = dec(A.tot, C.tot);
console.log(`control C (pool mix + class-then-tuple sampler): ${clsName} rate minus A = ${pc(C.tot.pool[K]! / C.tot.n - A.tot.pool[K]! / A.tot.n)} (state mix under the sampler alone; rate effect there is 0 by construction: ${pc(dC.rate)})`);

// ---- 3. buckets ----
console.log(`\n## 3. By state bucket, ${clsName} (on the pools-sim states A, and the GLM-sim states G). contributions sum to the totals above`);
for (let i = 0; i < PARTS.length; i++) {
  console.log(`\n${PARTS[i]!.name}:  bucket                      share A  share G | pool node  GLM (on A) | rate contrib  mix contrib | actual(A) `);
  let sr = 0, sm = 0;
  for (const lab of [...new Set([...A.parts[i]!.keys(), ...G.parts[i]!.keys()])].sort()) {
    const a = A.parts[i]!.get(lab) ?? mk(), g = G.parts[i]!.get(lab) ?? mk(), wA = a.n / A.tot.n, wG = g.n / G.tot.n;
    const pa = a.n ? a.pool[K]! / a.n : 0, ga = a.n ? a.glm[K]! / a.n : 0, gg = g.n ? g.glm[K]! / g.n : 0;
    const rc = wA * (ga - pa), mc = wG * gg - wA * ga; sr += rc; sm += mc;
    console.log(`  ${lab.padEnd(28)} ${pad(pc(wA), 8)} ${pad(pc(wG), 8)} | ${pad(pc(pa), 8)} ${pad(pc(ga), 8)}   | ${pad(pc(rc), 10)} ${pad(pc(mc), 10)}   | ${pad(a.n ? pc(a.cls[K]! / a.n) : '-', 7)}`);
  }
  console.log(`  ${'sum'.padEnd(28)} ${' '.repeat(18)}   ${' '.repeat(22)} | ${pad(pc(sr), 10)} ${pad(pc(sm), 10)}`);
}

// ---- 4. real states ----
if (realPath !== '') {
  const rows = fs.readFileSync(realPath, 'utf8').trim().split('\n').slice(1).map((l) => l.split(',').map(Number));
  const R = newArm();
  for (const r of rows) visit(R, { down: r[0]!, ytg: r[1]!, ydl: r[2]!, sd: r[3]!, qtr: r[4]!, hs: r[5]! }, r[6]!, 0);
  console.log(`\n## 4. REAL 2023-2025 pass states (${rows.length} plays) with the same two nodes. Both packs were fit on exactly these plays, so on THIS state mix they agree by construction`);
  console.log(`${PASS_CLASSES.map((c, k) => `${c}: actual ${pc(R.tot.cls[k]! / R.tot.n)} pool ${pc(R.tot.pool[k]! / R.tot.n)} GLM ${pc(R.tot.glm[k]! / R.tot.n)}`).join('\n')}`);
  console.log(`\nreal vs sim state mix and disagreement (${clsName}), by bucket:  bucket                     share real  share A | real: actual  pool  GLM | GLM-pool real  GLM-pool on A`);
  for (let i = 0; i < PARTS.length; i++) {
    console.log(PARTS[i]!.name + ':');
    for (const lab of [...new Set([...R.parts[i]!.keys(), ...A.parts[i]!.keys()])].sort()) {
      const r = R.parts[i]!.get(lab) ?? mk(), a = A.parts[i]!.get(lab) ?? mk();
      const dr = r.n ? (r.glm[K]! - r.pool[K]!) / r.n : 0, da = a.n ? (a.glm[K]! - a.pool[K]!) / a.n : 0;
      console.log(`  ${lab.padEnd(28)} ${pad(pc(r.n / R.tot.n), 9)} ${pad(pc(a.n / A.tot.n), 8)} | ${pad(r.n ? pc(r.cls[K]! / r.n) : '-', 8)} ${pad(r.n ? pc(r.pool[K]! / r.n) : '-', 7)} ${pad(r.n ? pc(r.glm[K]! / r.n) : '-', 7)} | ${pad(pc(dr), 9)} ${pad(pc(da), 12)}`);
    }
  }
  // cell-level reweighting: the real disagreement per pool cell (the pool node's finest key), applied to the pools-sim's cell visits.
  let predicted = 0, covered = 0;
  for (const [ck, a] of A.cell) { const r = R.cell.get(ck); if (r === undefined || r.n === 0) continue; covered += a.n; predicted += a.n * ((r.glm[K]! - r.pool[K]!) / r.n); }
  const rateOnA = (A.tot.glm[K]! - A.tot.pool[K]!) / A.tot.n;
  console.log(`\nREWEIGHTING TESTS. The nodes' disagreement measured on REAL states, bucket by bucket, applied to the pools sim's own bucket visits. If a partition explains the shift, its prediction matches the measured rate effect.`);
  const realVal = (R.tot.glm[K]! - R.tot.pool[K]!) / R.tot.n;
  console.log(`   the disagreement on the real mix itself (GLM - pool on real states): ${pc(realVal)};  measured rate effect on the pools sim's states: ${pc(rateOnA)}`);
  for (let i = 0; i < PARTS.length; i++) {
    let pr = 0, cv = 0;
    for (const [lab, a] of A.parts[i]!) { const r = R.parts[i]!.get(lab); if (r === undefined || r.n === 0) continue; cv += a.n; pr += a.n * ((r.glm[K]! - r.pool[K]!) / r.n); }
    console.log(`   by ${PARTS[i]!.name.padEnd(16)} predicted ${pad(pc(pr / cv), 9)}  (support ${pc(cv / A.tot.n)})   unexplained ${pad(pc(rateOnA - pr / cv), 9)}`);
  }
  console.log(`   by ${'pool cell'.padEnd(16)} predicted ${pad(pc(predicted / covered), 9)}  (support ${pc(covered / A.tot.n)})   unexplained ${pad(pc(rateOnA - predicted / covered), 9)}   (the pool's finest cell: down x distance bin x field bin)`);
  // joint: pool cell x score&clock bucket (the pool's own cell, then the GLM's extra inputs). Real support is thinner, so the covered share is printed.
  const jk = (s: St): string => PARTS[0]!.of(s) + '|' + PARTS[1]!.of(s) + '|' + PARTS[2]!.of(s);
  const RJ = new Map<string, Acc>(), AJ = new Map<string, Acc>();
  for (const r of rows) { const s = { down: r[0]!, ytg: r[1]!, ydl: r[2]!, sd: r[3]!, qtr: r[4]!, hs: r[5]! }; add(bump(RJ, jk(s)), poolMix(s.down, s.ytg, s.ydl), glmMix(s.down, s.ytg, s.ydl, s.sd, s.qtr, s.hs), -1); }
  // the sim's joint visits again, from a fresh paired run of a few thousand games (A arm only)
  for (let g = 0; g < Math.min(N, 4000); g++) passSnaps(runGame(P, gameKeyOf('glm-shift:' + g)), (s) => add(bump(AJ, jk(s)), poolMix(s.down, s.ytg, s.ydl), glmMix(s.down, s.ytg, s.ydl, s.sd, s.qtr, s.hs), -1));
  let nj = 0, pj = 0, cj = 0, mj = 0;
  for (const [lab, a] of AJ) { nj += a.n; mj += a.glm[K]! - a.pool[K]!; const r = RJ.get(lab); if (r === undefined || r.n === 0) continue; cj += a.n; pj += a.n * ((r.glm[K]! - r.pool[K]!) / r.n); }
  console.log(`   by ${'all three'.padEnd(16)} predicted ${pad(pc(pj / cj), 9)}  (support ${pc(cj / nj)})   unexplained ${pad(pc(mj / nj - pj / cj), 9)}   (down&distance x field x score&clock jointly, on a ${Math.min(N, 4000)}-game subsample)`);
}

// ---- 5. why drives: the exact probability that a pass snap ENDS the drive, under each node, at the pools-sim's own states ----
// A pass ends the drive when the tuple is an interception or fumble, a safety, a touchdown, or an unknown next down (the real drive ended there), as game.ts decides. For each state the three
// nodes' end probabilities are exact sums over their pools: A = the picked pool; C and G = sum_k p_k x (the class-k pool the sampler reads), p from the pool mix (C) or the GLM (G).
{
  if (P.trans !== 'empirical') throw new Error('section 5 assumes the empirical transition rule');
  const endsOf = (j: number, ydl: number): boolean => {
    const y = T.yards[j]!, nd = T.ndown[j]!, dl = T.delta[j]!;
    if (T.oc[j] === 3 || T.fum[j] === 1) return true;
    if (T.safety[j] === 1 || ydl - y >= 100) return true;
    if (T.td[j] === 1 || y >= ydl) return true;
    if (Number.isNaN(nd) || Number.isNaN(dl)) return true;
    return ydl - dl <= 0;
  };
  const endCache = new Map<Pool, Map<number, number>>();
  const endProb = (pool: Pool, ydl: number): number => {
    let m = endCache.get(pool); if (m === undefined) { m = new Map(); endCache.set(pool, m); }
    const c = m.get(ydl); if (c !== undefined) return c;
    let prev = 0, e = 0;
    for (let i = 0; i < pool.ids.length; i++) { const w = pool.cum[i]! - prev; prev = pool.cum[i]!; if (endsOf(pool.ids[i]!, ydl)) e += w; }
    const r = e / pool.total; m.set(ydl, r); return r;
  };
  const ng = Math.min(N, 4000), sink = [0, 0, 0, 0, 0];
  const byDown = [0, 1, 2, 3, 4].map(() => ({ n: 0, eA: 0, eC: 0, eG: 0 }));
  const perClass = [0, 1, 2, 3].map(() => ({ n: 0, p: 0, moved: 0, dEnd: 0, dEndNoBack: 0 }));
  for (let g = 0; g < ng; g++) passSnaps(runGame(P, gameKeyOf('glm-shift:' + g)), (s) => {
    const keys = recKeys(B, CALL.pass, s.down, s.ytg, s.ydl), dkeys = keys, pa = pick(P.rec, keys, P.minPool, sink, 1), pm = poolMix(s.down, s.ytg, s.ydl), gm = glmMix(s.down, s.ytg, s.ydl, s.sd, s.qtr, s.hs);
    let eC = 0, eG = 0;
    for (let k = 0; k < 4; k++) {
      const ck = pickClassTuple(P.rec, dkeys, P, k, M.minClassPool, sink, 4), own = classPool(pa, T.oc, k), eK = endProb(ck, s.ydl);
      eC += pm[k]! * eK; eG += gm[k]! * eK;
      const pcx = perClass[k]!; pcx.n++; pcx.p += pm[k]!;
      if (own === undefined || own.total === 0) continue;
      if (own !== ck) { pcx.moved += pm[k]!; pcx.dEnd += pm[k]! * (eK - endProb(own, s.ydl)); }
    }
    const d = byDown[Math.min(s.down, 4)]!, eA = endProb(pa, s.ydl);
    d.n++; d.eA += eA; d.eC += eC; d.eG += eG;
  });
  const tn = byDown.reduce((s, d) => s + d.n, 0), tA = byDown.reduce((s, d) => s + d.eA, 0) / tn, tC = byDown.reduce((s, d) => s + d.eC, 0) / tn, tG = byDown.reduce((s, d) => s + d.eG, 0) / tn;
  const perGame = tn / (2 * ng);
  // the same exact P(end) on the REAL 2023-2025 pass states, next to the empirical rate in the pack's own records (every real pass of that down, weighted)
  if (realPath !== '') {
    const rr = fs.readFileSync(realPath, 'utf8').trim().split('\n').slice(1).map((l) => l.split(',').map(Number)), acc = [0, 1, 2, 3, 4].map(() => ({ n: 0, a: 0, c: 0 }));
    for (const r of rr) {
      const st = { down: r[0]!, ytg: r[1]!, ydl: r[2]! }, ks = recKeys(B, CALL.pass, st.down, st.ytg, st.ydl), dk = ks, pa = pick(P.rec, ks, P.minPool, sink, 1), pm = poolMix(st.down, st.ytg, st.ydl);
      let eC = 0; for (let k = 0; k < 4; k++) eC += pm[k]! * endProb(pickClassTuple(P.rec, dk, P, k, M.minClassPool, sink, 4), st.ydl);
      const d = acc[Math.min(st.down, 4)]!; d.n++; d.a += endProb(pa, st.ydl); d.c += eC;
    }
    console.log(`\n## 5a. REAL pass states, P(drive ends on the snap): pools node vs the down-preserving sampler (the pack's own records give the empirical rate: python3 snippet in the write-up)`);
    for (let dn = 1; dn <= 4; dn++) { const d = acc[dn]!; console.log(`   down ${dn}: ${d.n} real attempts  pools node ${pc(d.a / d.n)}  sampler (pool class mix) ${pc(d.c / d.n)}`); }
  }
  console.log(`\n## 5. Drive-ending probability of a pass snap, exact, at the pools-sim's states (${ng} games, ${perGame.toFixed(2)} attempts per team-game)`);
  console.log('down      attempts   P(end) A     C (sampler only)   G (GLM + sampler)   C-A       G-C');
  for (let dn = 1; dn <= 4; dn++) { const d = byDown[dn]!; if (d.n) console.log(`${String(dn).padEnd(8)} ${pad(pc(d.n / tn), 9)} ${pad(pc(d.eA / d.n), 10)} ${pad(pc(d.eC / d.n), 14)} ${pad(pc(d.eG / d.n), 18)} ${pad(pc(d.eC / d.n - d.eA / d.n), 9)} ${pad(pc(d.eG / d.n - d.eC / d.n), 9)}`); }
  console.log(`all      ${pad('100%', 9)} ${pad(pc(tA), 10)} ${pad(pc(tC), 14)} ${pad(pc(tG), 18)} ${pad(pc(tC - tA), 9)} ${pad(pc(tG - tC), 9)}`);
  console.log(`implied change in drive-ending pass snaps per team-game (x ${perGame.toFixed(2)} attempts):  sampler C-A ${f3((tC - tA) * perGame)}   GLM G-C ${f3((tG - tC) * perGame)}   (measured drives per team-game: see table 1)`);
  console.log('where the sampler moves a draw to a different pool than the pools node uses (the class pool is read from a coarser cell, or the class is absent from the node\'s own cell):');
  PASS_CLASSES.forEach((c, k) => { const x = perClass[k]!; console.log(`   ${c.padEnd(5)} share of attempts whose ${c} tuple comes from a different pool ${pad(pc(x.moved / x.n), 9)}   effect on P(end) from that move ${pad(pc(x.dEnd / x.n), 9)} per attempt`); });
}

// ---- 6. seconds per pass snap: is the plays/drives shift the class mix's clock, or something else? ----
{
  const mean = (arm: 'A' | 'C' | 'G', k: number): number => dtSum[arm][k]! / dtN[arm][k]!;
  const tot = (arm: 'A' | 'C' | 'G'): number => dtSum[arm].reduce((a, b) => a + b, 0) / dtN[arm].reduce((a, b) => a + b, 0);
  console.log('\n## 6. Seconds per pass snap, by class (all pass snaps, from the logs)');
  console.log('arm   ' + PASS_CLASSES.map((c) => c.padStart(8)).join(' ') + '      all');
  for (const arm of ['A', 'C', 'G'] as const) console.log(`${arm}     ${[0, 1, 2, 3].map((k) => pad(f3(mean(arm, k)), 8)).join(' ')}   ${pad(f3(tot(arm)), 8)}`);
  const share = (arm: 'A' | 'C' | 'G', k: number): number => dtN[arm][k]! / dtN[arm].reduce((a, b) => a + b, 0);
  let implied = 0; for (let k = 0; k < 4; k++) implied += (share('G', k) - share('C', k)) * mean('C', k);
  console.log(`G - C mean seconds per pass snap: ${f3(tot('G') - tot('C'))};  of which the class mix alone (shift in class shares x C's seconds per class): ${f3(implied)};  the rest (clock by situation, yards): ${f3(tot('G') - tot('C') - implied)}`);
}
{
  // the same difference, split by the clock regime the pools use: late half (q2/q4, 300 s or less: clock pools keyed by score margin) vs the rest (keyed by class and yards only)
  const nAll = (arm: 'C' | 'G'): number => dtRN[arm].reduce((a, r) => a + r.reduce((x, y) => x + y, 0), 0);
  for (const r of [0, 1]) {
    const n = (arm: 'C' | 'G'): number => dtRN[arm][r]!.reduce((x, y) => x + y, 0), sm = (arm: 'C' | 'G'): number => dtR[arm][r]!.reduce((x, y) => x + y, 0);
    const line = [0, 1, 2, 3].map((k) => `${PASS_CLASSES[k]} ${f3(dtR.G[r]![k]! / dtRN.G[r]![k]! - dtR.C[r]![k]! / dtRN.C[r]![k]!)}`).join('  ');
    console.log(`   ${r === 1 ? 'late-half pools' : 'other pools    '}: share of pass snaps C ${pc(n('C') / nAll('C'))} G ${pc(n('G') / nAll('G'))};  mean seconds C ${f3(sm('C') / n('C'))} G ${f3(sm('G') / n('G'))};  G - C by class: ${line}`);
  }
}
