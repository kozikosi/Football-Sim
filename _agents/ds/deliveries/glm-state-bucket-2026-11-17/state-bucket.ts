// 2a state-bucket test (council/DS, 2026-11-17). A REPORT, not a gate.
// Usage: node --experimental-strip-types tools/state-bucket.ts [games=12000]
// Same paired keys as tools/glm-bar.ts. For every pass snap it records the pre-snap
// state (down, yards to go, yards to goal, score difference) and the outcome class
// under each node (comp/inc/sack/int). Then:
//   1) per-bucket class rates, pools vs GLM;
//   2) a Kitagawa decomposition of the overall class-rate shift:
//        within = sum_b w_pool(b) * (p_glm(b) - p_pool(b))   (bias at a fixed state mix)
//        mix    = sum_b (w_glm(b) - w_pool(b)) * p_glm(b)    (the state mix moved)
//      and the same for the score-state bins;
//   3) a model-vs-pool check at the pools node's own states: the GLM's P(class|state)
//      against the pool cell's class mix, which isolates mispricing from path effects;
//   4) the drive/play context that connects the class rates to the drives shift.
// The bootstrap is over games (paired: a game carries both nodes), seeded, so the
// receipt is reproducible. Standard errors are bootstrap SDs; z = estimate / SD.
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools, pick, recKeys, CALL } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass, passClassProbs, passFeatures, classPool, PASS_CLASSES } from '../src/sports/nfl/sim/passclass.ts';
import type { PassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';
import type { GameEv, SnapP } from '../src/sports/nfl/sim/game.ts';

const N = Number(process.argv[2] ?? 12000);
const poolsName = 'nfl-pools-fit2023-2025';
const pcName = 'nfl-passclass-fit2023-2025';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load(poolsName)));
const M: PassClass = loadPassClass(makePack(load(pcName)));

// ---- buckets ----
// 4 downs x 4 yards-to-go bins x 4 field-position bins = 64. The bins are the
// model's own feature cuts (ytg <= 2/6/10; ydl <= 20 red zone, 40, 60, own deep).
const NB = 64;
const DOWN = ['1st', '2nd', '3rd', '4th'];
const YTG = ['1-2', '3-6', '7-10', '11+'];
const YDL = ['1-20 RZ', '21-40', '41-60', '61-100 own'];
const bucketOf = (down: number, ytg: number, ydl: number): number => {
  const d = Math.min(Math.max(down, 1), 4) - 1;
  const t = ytg <= 2 ? 0 : ytg <= 6 ? 1 : ytg <= 10 ? 2 : 3;
  const y = ydl <= 20 ? 0 : ydl <= 40 ? 1 : ydl <= 60 ? 2 : 3;
  return (d * 4 + t) * 4 + y;
};
const bucketLabel = (b: number): string => {
  const d = Math.floor(b / 16), t = Math.floor((b % 16) / 4), y = b % 4;
  return `${DOWN[d]} & ${YTG[t]} @ ${YDL[y]}`;
};
// score state at the snap, from the offense's point of view
const NSD = 5;
const SD = ['trail 8+', 'trail 1-7', 'tied', 'lead 1-7', 'lead 8+'];
const sdBin = (sd: number): number => (sd <= -8 ? 0 : sd <= -1 ? 1 : sd === 0 ? 2 : sd <= 7 ? 3 : 4);
const teamIdx = (team: string): number => (team === 'A' ? 0 : 1);

// ---- per-game record ----
// counts: bucket-major, first 256 = pools, second 256 = GLM, class = oc 0..3
const counts = new Uint32Array(N * 512);
const sdCounts = new Uint32Array(N * NSD * 8);      // [bin*8 + node*4 + class]
const modelSum = new Float64Array(N * 256);         // GLM prob - pool cell mix, pools-node states
const modelN = new Uint32Array(N * NB);
const drivesP = new Uint32Array(N), drivesG = new Uint32Array(N);
const playsP = new Uint32Array(N), playsG = new Uint32Array(N);
const passP = new Uint32Array(N), passG = new Uint32Array(N);
const holes = [0, 0, 0, 0, 0];

const scan = (out: ReturnType<typeof runGame>, row: number, isGlm: boolean): { drives: number; plays: number; pass: number } => {
  let pts = [0, 0], drives = 0, plays = 0, pass = 0;
  for (const e of out.events as readonly GameEv[]) {
    if (e.kind === 'score' || e.kind === 'extra_point') {
      const p = e.payload as { team: string; points: number };
      pts[teamIdx(p.team)] += p.points;
      continue;
    }
    if (e.kind === 'drive_start') { drives += 1; continue; }
    if (e.kind !== 'snap') continue;
    const s = e.payload as SnapP;
    plays += 1;
    if (s.call !== CALL.pass) continue;
    pass += 1;
    if (s.oc < 0 || s.oc > 3) throw new Error(`state-bucket: pass snap oc=${s.oc} outside comp..int`);
    const sd = pts[teamIdx(s.team)] - pts[1 - teamIdx(s.team)];
    const b = bucketOf(s.down, s.ytg, s.ydl), sb = sdBin(sd);
    const g = row / 512;
    const off = row + (isGlm ? 256 : 0);
    counts[off + b * 4 + s.oc] += 1;
    sdCounts[g * NSD * 8 + sb * 8 + (isGlm ? 4 : 0) + s.oc] += 1;
    if (!isGlm) {
      // model-vs-pool at the pools node's own state (no GLM path effect)
      const ot = s.qtr === 5;
      const probs = passClassProbs(M, passFeatures(s.down, s.ytg, s.ydl, ot ? 0 : sd, ot ? 2 : s.qtr, ot ? 600 : s.hs));
      const pool = pick(P.rec, recKeys(P.bins, CALL.pass, s.down, s.ytg, s.ydl), P.minPool, holes, 1);
      const tot = pool.total;
      const base = row / 512 * 256 + b * 4;
      for (let c = 0; c < 4; c++) {
        const sub = classPool(pool, P.tuples.oc, c);
        const pp = sub === undefined ? 0 : sub.total / tot;
        modelSum[base + c] += probs[c] - pp;
      }
      modelN[row / 512 * NB + b] += 1;
    }
  }
  return { drives, plays, pass };
};

for (let g = 0; g < N; g++) {
  const key = gameKeyOf('glm-bar:' + g);
  const row = g * 512;
  const rp = scan(runGame(P, key), row, false);
  const rg = scan(runGame(P, key, { passClass: M }), row, true);
  drivesP[g] = rp.drives; drivesG[g] = rg.drives;
  playsP[g] = rp.plays; playsG[g] = rg.plays;
  passP[g] = rp.pass; passG[g] = rg.pass;
}

// ---- aggregate + derived statistics ----
interface Agg {
  np: Float64Array; ng: Float64Array; cp: Float64Array; cg: Float64Array;
  snp: Float64Array; sng: Float64Array; scp: Float64Array; scg: Float64Array;
  msum: Float64Array; mn: Float64Array;
}
const blankAgg = (): Agg => ({
  np: new Float64Array(NB), ng: new Float64Array(NB), cp: new Float64Array(NB * 4), cg: new Float64Array(NB * 4),
  snp: new Float64Array(NSD), sng: new Float64Array(NSD), scp: new Float64Array(NSD * 4), scg: new Float64Array(NSD * 4),
  msum: new Float64Array(NB * 4), mn: new Float64Array(NB),
});
const addGame = (a: Agg, g: number): void => {
  const r = g * 512;
  for (let b = 0; b < NB; b++) {
    for (let c = 0; c < 4; c++) {
      a.cp[b * 4 + c] += counts[r + b * 4 + c];
      a.cg[b * 4 + c] += counts[r + 256 + b * 4 + c];
    }
    a.np[b] += counts[r + b * 4] + counts[r + b * 4 + 1] + counts[r + b * 4 + 2] + counts[r + b * 4 + 3];
    a.ng[b] += counts[r + 256 + b * 4] + counts[r + 256 + b * 4 + 1] + counts[r + 256 + b * 4 + 2] + counts[r + 256 + b * 4 + 3];
  }
  const sg = g * NSD * 8;
  for (let s = 0; s < NSD; s++) {
    for (let c = 0; c < 4; c++) {
      a.scp[s * 4 + c] += sdCounts[sg + s * 8 + c];
      a.scg[s * 4 + c] += sdCounts[sg + s * 8 + 4 + c];
    }
    a.snp[s] += sdCounts[sg + s * 8] + sdCounts[sg + s * 8 + 1] + sdCounts[sg + s * 8 + 2] + sdCounts[sg + s * 8 + 3];
    a.sng[s] += sdCounts[sg + s * 8 + 4] + sdCounts[sg + s * 8 + 5] + sdCounts[sg + s * 8 + 6] + sdCounts[sg + s * 8 + 7];
  }
  const mr = g * 256, mnr = g * NB;
  for (let k = 0; k < NB * 4; k++) a.msum[k] += modelSum[mr + k];
  for (let b = 0; b < NB; b++) a.mn[b] += modelN[mnr + b];
};
const all = blankAgg();
for (let g = 0; g < N; g++) addGame(all, g);

interface Stats {
  Pp: Float64Array; Pg: Float64Array; diff: Float64Array;
  within: Float64Array; mix: Float64Array;
  bucketDiff: Float64Array; bucketW: Float64Array;
  modelMean: Float64Array; modelDiff: Float64Array;
  sdp: Float64Array; sdg: Float64Array; sdd: Float64Array;
  npAll: number; ngAll: number; interP: number;
}
const derive = (a: Agg): Stats => {
  const Pp = new Float64Array(4), Pg = new Float64Array(4);
  let npAll = 0, ngAll = 0;
  for (let b = 0; b < NB; b++) { npAll += a.np[b]!; ngAll += a.ng[b]!; }
  for (let c = 0; c < 4; c++) {
    let xp = 0, xg = 0;
    for (let b = 0; b < NB; b++) { xp += a.cp[b * 4 + c]!; xg += a.cg[b * 4 + c]!; }
    Pp[c] = xp / npAll; Pg[c] = xg / ngAll;
  }
  const within = new Float64Array(4), mix = new Float64Array(4);
  const bucketDiff = new Float64Array(NB * 4), bucketW = new Float64Array(NB);
  let interP = 0, interG = 0;
  // renormalise BOTH weights over the buckets present under both nodes, so the two
  // components sum to the difference on the common support.
  for (let b = 0; b < NB; b++) if (a.np[b]! > 0 && a.ng[b]! > 0) { interP += a.np[b]!; interG += a.ng[b]!; }
  for (let b = 0; b < NB; b++) {
    if (a.np[b]! <= 0 || a.ng[b]! <= 0) continue;
    const wp = a.np[b]! / interP, wg = a.ng[b]! / interG;
    bucketW[b] = wp;
    for (let c = 0; c < 4; c++) {
      const pp = a.cp[b * 4 + c]! / a.np[b]!, pg = a.cg[b * 4 + c]! / a.ng[b]!;
      bucketDiff[b * 4 + c] = pg - pp;
      within[c] += wp * (pg - pp);
      mix[c] += (wg - wp) * pg;
    }
  }
  const diff = new Float64Array(4);
  for (let c = 0; c < 4; c++) diff[c] = Pg[c]! - Pp[c]!;
  const modelMean = new Float64Array(NB * 4), modelDiff = new Float64Array(4);
  let mnAll = 0;
  for (let b = 0; b < NB; b++) mnAll += a.mn[b]!;
  for (let b = 0; b < NB; b++) for (let c = 0; c < 4; c++) {
    modelMean[b * 4 + c] = a.mn[b]! > 0 ? a.msum[b * 4 + c]! / a.mn[b]! : 0;
    modelDiff[c] += a.msum[b * 4 + c]! / mnAll;
  }
  const sdp = new Float64Array(NSD * 4), sdg = new Float64Array(NSD * 4), sdd = new Float64Array(NSD * 4);
  for (let s = 0; s < NSD; s++) for (let c = 0; c < 4; c++) {
    sdp[s * 4 + c] = a.snp[s]! > 0 ? a.scp[s * 4 + c]! / a.snp[s]! : 0;
    sdg[s * 4 + c] = a.sng[s]! > 0 ? a.scg[s * 4 + c]! / a.sng[s]! : 0;
    sdd[s * 4 + c] = sdg[s * 4 + c]! - sdp[s * 4 + c]!;
  }
  return { Pp, Pg, diff, within, mix, bucketDiff, bucketW, modelMean, modelDiff, sdp, sdg, sdd, npAll, ngAll, interP };
};
const S = derive(all);

// ---- seeded paired bootstrap over games ----
const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const REPS = Number(process.argv[3] ?? 200);
const rnd = mulberry32(0xc0ffee);
const bootDiff = new Float64Array(REPS * 4), bootWithin = new Float64Array(REPS * 4), bootMix = new Float64Array(REPS * 4);
const bootModel = new Float64Array(REPS * 4);
const bootBucket = new Float64Array(REPS * NB * 4);
const bootModelBucket = new Float64Array(REPS * NB * 4);
const bootSd = new Float64Array(REPS * NSD * 4);
const buf = blankAgg();
const zeroAgg = (a: Agg): void => {
  a.np.fill(0); a.ng.fill(0); a.cp.fill(0); a.cg.fill(0);
  a.snp.fill(0); a.sng.fill(0); a.scp.fill(0); a.scg.fill(0);
  a.msum.fill(0); a.mn.fill(0);
};
for (let r = 0; r < REPS; r++) {
  zeroAgg(buf);
  for (let k = 0; k < N; k++) addGame(buf, Math.floor(rnd() * N));
  const s = derive(buf);
  for (let c = 0; c < 4; c++) {
    bootDiff[r * 4 + c] = s.diff[c]!;
    bootWithin[r * 4 + c] = s.within[c]!;
    bootMix[r * 4 + c] = s.mix[c]!;
    bootModel[r * 4 + c] = s.modelDiff[c]!;
  }
  for (let k = 0; k < NB * 4; k++) {
    bootBucket[r * NB * 4 + k] = s.bucketDiff[k]!;
    bootModelBucket[r * NB * 4 + k] = s.modelMean[k]!;
  }
  for (let k = 0; k < NSD * 4; k++) bootSd[r * NSD * 4 + k] = s.sdd[k]!;
}
const sdOf = (arr: Float64Array, off: number, stride: number): number => {
  let m = 0;
  for (let r = 0; r < REPS; r++) m += arr[r * stride + off]!;
  m /= REPS;
  let v = 0;
  for (let r = 0; r < REPS; r++) v += (arr[r * stride + off]! - m) ** 2;
  return Math.sqrt(v / (REPS - 1));
};
const zOf = (x: number, sd: number): string => (sd > 0 ? (x / sd).toFixed(1) : '--');
const pct = (x: number): string => (x * 100).toFixed(2) + '%';

// ---- print ----
console.log(`# state-bucket test — ${N} paired games, keys glm-bar:0..${N - 1}`);
console.log(`# packs: ${P.id} + ${M.id}; pass snaps: pools ${S.npAll}, GLM ${S.ngAll}`);
console.log(`# GLM: theta [${M.theta.join(', ')}], lambda ${M.lambda}, minClassPool ${M.minClassPool}; bootstrap ${REPS} (seeded)`);
console.log('');
console.log('## 1. overall pass-class rates (per pass snap)');
console.log('class      pools      GLM     diff    diff%       z    within      z    mix        z');
for (let c = 0; c < 4; c++) {
  const z = zOf(S.diff[c]!, sdOf(bootDiff, c, 4));
  const zw = zOf(S.within[c]!, sdOf(bootWithin, c, 4));
  const zm = zOf(S.mix[c]!, sdOf(bootMix, c, 4));
  console.log(`${PASS_CLASSES[c]!.padEnd(8)}${pct(S.Pp[c]!).padStart(8)}${pct(S.Pg[c]!).padStart(9)}${pct(S.diff[c]!).padStart(9)}${((S.diff[c]! / S.Pp[c]!) * 100).toFixed(2).padStart(8)}${z.padStart(8)}${pct(S.within[c]!).padStart(10)}${zw.padStart(7)}${pct(S.mix[c]!).padStart(9)}${zm.padStart(7)}`);
}
console.log('');
console.log('## 2. within-bucket sack split — top 10 by contribution (w_pool * rate diff)');
const sackContrib = (b: number): number => S.bucketW[b]! * S.bucketDiff[b * 4 + 2]!;
const order = Array.from({ length: NB }, (_, b) => b).filter((b) => all.np[b]! >= 30 && all.ng[b]! >= 30).sort((a, b) => Math.abs(sackContrib(b)) - Math.abs(sackContrib(a)));
const totalWithinSack = S.within[2]!;
let top5 = 0;
for (let k = 0; k < Math.min(5, order.length); k++) top5 += sackContrib(order[k]!);
for (let k = 0; k < Math.min(10, order.length); k++) {
  const b = order[k]!;
  const zp = all.cp[b * 4 + 2]! / all.np[b]!, zg = all.cg[b * 4 + 2]! / all.ng[b]!;
  const z = zOf(S.bucketDiff[b * 4 + 2]!, sdOf(bootBucket, b * 4 + 2, NB * 4));
  console.log(`${bucketLabel(b).padEnd(28)} n ${String(all.np[b]).padStart(6)}/${String(all.ng[b]).padStart(6)}  sack ${pct(zp).padStart(7)}/${pct(zg).padStart(7)}  diff ${pct(zg - zp).padStart(8)}  z ${z.padStart(5)}  contrib ${pct(sackContrib(b)).padStart(8)}`);
}
console.log(`# within-sack total ${pct(totalWithinSack)}; top-5 buckets carry ${(totalWithinSack === 0 ? 0 : (top5 / totalWithinSack) * 100).toFixed(0)}%; buckets with both n>=30: ${order.length}`);
console.log('');
console.log('## 3. model vs pool at the pools node\'s own states (P_GLM(class|state) - pool cell mix)');
console.log('class      mean diff      z');
for (let c = 0; c < 4; c++) console.log(`${PASS_CLASSES[c]!.padEnd(8)}${pct(S.modelDiff[c]!).padStart(9)}${zOf(S.modelDiff[c]!, sdOf(bootModel, c, 4)).padStart(8)}`);
console.log('');
console.log('## 4. model sack difference by bucket — top 10 by |mean diff|');
const mOrder = Array.from({ length: NB }, (_, b) => b).filter((b) => all.mn[b]! >= 30).sort((a, b) => Math.abs(S.modelMean[b * 4 + 2]!) - Math.abs(S.modelMean[a * 4 + 2]!));
for (let k = 0; k < Math.min(10, mOrder.length); k++) {
  const b = mOrder[k]!;
  console.log(`${bucketLabel(b).padEnd(28)} n ${String(all.mn[b]).padStart(6)}  model sack diff ${pct(S.modelMean[b * 4 + 2]!).padStart(9)}  z ${zOf(S.modelMean[b * 4 + 2]!, sdOf(bootModelBucket, b * 4 + 2, NB * 4)).padStart(5)}`);
}
console.log('');
console.log('## 5. score state at the snap (offense view)');
console.log('score       n(pool/GLM)   comp p/G        sack p/G        sack diff    z');
for (let s = 0; s < NSD; s++) {
  const z = zOf(S.sdd[s * 4 + 2]!, sdOf(bootSd, s * 4 + 2, NSD * 4));
  console.log(`${SD[s]!.padEnd(10)}${String(all.snp[s]).padStart(6)}/${String(all.sng[s]).padStart(6)}  ${pct(S.sdp[s * 4]!).padStart(7)}/${pct(S.sdg[s * 4]!).padStart(7)}  ${pct(S.sdp[s * 4 + 2]!).padStart(7)}/${pct(S.sdg[s * 4 + 2]!).padStart(7)}  ${pct(S.sdd[s * 4 + 2]!).padStart(9)}${z.padStart(6)}`);
}
console.log('');
console.log('## 6. drive / play context (per team-game; paired differences)');
const paired = (a: Uint32Array, b: Uint32Array): { mean: number; se: number; z: string } => {
  const d = new Float64Array(N);
  let m = 0;
  for (let g = 0; g < N; g++) { d[g] = b[g]! - a[g]!; m += d[g]!; }
  m /= N;
  let v = 0;
  for (let g = 0; g < N; g++) v += (d[g]! - m) ** 2;
  const se = Math.sqrt(v / (N - 1)) / Math.sqrt(N);
  return { mean: m, se, z: zOf(m, se) };
};
const showPair = (label: string, a: Uint32Array, b: Uint32Array, scale = 1): void => {
  let ma = 0, mb = 0;
  for (let g = 0; g < N; g++) { ma += a[g]!; mb += b[g]!; }
  const p = paired(a, b);
  console.log(`${label.padEnd(18)} pools ${((ma / N) * scale).toFixed(3).padStart(8)}  GLM ${((mb / N) * scale).toFixed(3).padStart(8)}  diff ${(p.mean * scale).toFixed(3).padStart(7)}  z ${p.z.padStart(5)}`);
};
// one game has two team-games; glm-bar reports per team-game, so scale the counts by 1/2
showPair('drives', drivesP, drivesG, 0.5);
showPair('scrimmage snaps', playsP, playsG, 0.5);
showPair('pass snaps', passP, passG, 0.5);
const pdP = new Float64Array(N), pdG = new Float64Array(N);
for (let g = 0; g < N; g++) { pdP[g] = playsP[g]! / Math.max(1, drivesP[g]!); pdG[g] = playsG[g]! / Math.max(1, drivesG[g]!); }
{
  let m = 0;
  for (let g = 0; g < N; g++) m += pdG[g]! - pdP[g]!;
  m /= N;
  let v = 0;
  for (let g = 0; g < N; g++) v += (pdG[g]! - pdP[g]! - m) ** 2;
  const se = Math.sqrt(v / (N - 1)) / Math.sqrt(N);
  console.log(`${'scrimmage snaps/drive'.padEnd(22)} pools ${(Array.from(pdP).reduce((s, x) => s + x, 0) / N).toFixed(3).padStart(7)}  GLM ${(Array.from(pdG).reduce((s, x) => s + x, 0) / N).toFixed(3).padStart(7)}  diff ${m.toFixed(3).padStart(7)}  z ${zOf(m, se).padStart(5)}`);
}
console.log('');
console.log('## 7. mechanism read (numbers above, not a vote)');
const zSackWithin = S.within[2]! / sdOf(bootWithin, 2, 4), zSackMix = S.mix[2]! / sdOf(bootMix, 2, 4);
const zSackDiff = S.diff[2]! / sdOf(bootDiff, 2, 4);
const conc = totalWithinSack === 0 ? 0 : top5 / totalWithinSack;
const sigBuckets = order.filter((b) => Math.abs(S.bucketDiff[b * 4 + 2]! / sdOf(bootBucket, b * 4 + 2, NB * 4)) >= 3).length;
console.log(`- sack rate: pools ${pct(S.Pp[2]!)} -> GLM ${pct(S.Pg[2]!)}, diff ${pct(S.diff[2]!)} (z ${zSackDiff.toFixed(1)})`);
console.log(`- within-bucket ${pct(S.within[2]!)} (z ${zSackWithin.toFixed(1)}) vs state-mix ${pct(S.mix[2]!)} (z ${zSackMix.toFixed(1)})`);
console.log(`- ${sigBuckets} bucket(s) with |z|>=3 at n>=30; top-5 share of the within term ${(conc * 100).toFixed(0)}%`);
console.log(`- model-at-pool-states sack mean ${pct(S.modelDiff[2]!)} (z ${(S.modelDiff[2]! / sdOf(bootModel, 2, 4)).toFixed(1)})`);
const verdict = Math.abs(zSackWithin) >= 2 && Math.abs(zSackWithin) > Math.abs(zSackMix)
  ? (sigBuckets > 0 && conc >= 0.5 ? 'within-bucket bias, concentrated' : 'within-bucket bias, spread')
  : Math.abs(zSackMix) >= 2 && Math.abs(zSackMix) > Math.abs(zSackWithin)
    ? 'state-mix artifact'
    : 'undecided (neither component is 2 SE clear)';
console.log(`- verdict: ${verdict}`);
console.log(`- drift note: a uniform level shift across all high-count buckets is consistent with a data-side drift; this test cannot attribute drift without the raw nflverse data. It can separate within-bucket bias from state mix, which is what the default decision needs.`);
