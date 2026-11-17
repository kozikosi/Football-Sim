// glm-bucket.ts — the state-bucket test for the pass-class node (council GLM, 2026-11-17). A REPORT, not a gate; the engine is not modified.
// Usage: node --experimental-strip-types tools/glm-bucket.ts [games=120000] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025]
// Every game runs PAIRED (the same game key under both nodes, as glm-bar.ts does). For every PASS snap in both logs we record:
//   bucket = down(1..4) x the pack's own dist bin x the pack's own ydlC bin   (the same axes the pools hierarchy cuts on)
//   realized class = snap payload oc (0 comp, 1 inc, 2 sack, 3 int)
//   model-implied class probabilities = passClassProbs on features rebuilt from the snap payload (OT snaps use the engine's own overrides: sd 0, qtr 2, hs 600)
// The score difference at each snap is reconstructed by walking the log (score/extra_point events precede the snaps they follow).
// Three mechanisms, measured:
//   (A) per-bucket realized class rates, pool vs GLM, paired per-game diffs (glm-bar's method, per bucket)   -> where the shift lives
//   (B) model-implied vs pool-realized on the SAME (pool-node) states, event-paired                          -> model-vs-pool disagreement, mix-free
//   (C) mean implied sack probability over each node's OWN pass states                                       -> the state-mix shift
// Aggregate identity: realizedPool - realizedGlm = (C: impliedPool - impliedGlm) + (B on pool states) - (B on GLM states), and B on GLM states ~ 0
// (with class-pool holes 0 the GLM's realized class IS its drawn class), so the shift decomposes into C + B_pool.
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools, binOf, CALL } from '../src/sports/nfl/sim/pools.ts';
import type { Pools } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass, passFeatures, passClassProbs } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';
import type { SnapP, GameEv } from '../src/sports/nfl/sim/game.ts';

const N = Number(process.argv[2] ?? 120000), poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025', pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load(poolsName)));
const M = loadPassClass(makePack(load(pcName)));

const NB_D = 4, NB_DIST = P.bins.dist.length + 1, NB_YDL = P.bins.ydlC.length + 1;      // 4 x 7 x 5 = 140
const NBUCK = NB_D * NB_DIST * NB_YDL;
const bucket = (down: number, ytg: number, ydl: number): number => ((down - 1) * NB_DIST + binOf(P.bins.dist, ytg)) * NB_YDL + binOf(P.bins.ydlC, ydl);
const distName = (b: number): string => { const lo = b === 0 ? 1 : P.bins.dist[b - 1] + 1, hi = b === NB_DIST - 1 ? 99 : P.bins.dist[b]; return lo === hi ? String(lo) : `${lo}-${hi}`; };
const ydlName = (b: number): string => { const lo = b === 0 ? 1 : P.bins.ydlC[b - 1] + 1, hi = b === NB_YDL - 1 ? 99 : P.bins.ydlC[b]; return `${lo}-${hi}`; };

// per-node, per-bucket accumulators
interface BAcc { n: number; cls: [number, number, number, number]; imp: [number, number, number, number] }
const acc = (): BAcc => ({ n: 0, cls: [0, 0, 0, 0], imp: [0, 0, 0, 0] });
const node: [BAcc[], BAcc[]] = [Array.from({ length: NBUCK }, acc), Array.from({ length: NBUCK }, acc)];
// (B) per-event diff on each node's own states: d_i = p_model(cls) - 1[realized == cls]; sum, sumsq, n
const bstat = (): number[][] => Array.from({ length: 4 }, () => [0, 0, 0]);
const bdiff: number[][][] = [Array.from({ length: NBUCK }, bstat), Array.from({ length: NBUCK }, bstat)];
// (A) paired per-game diffs per bucket per class: sum, sumsq, games contributing
const astat = (): number[][] => Array.from({ length: 4 }, () => [0, 0, 0]);
const adiff: number[][][] = Array.from({ length: NBUCK }, astat);
let holes = 0;

type PerGame = Map<number, [number, number, number, number]>;
const fold = (pg: PerGame, nodeIdx: 0 | 1): void => {
  for (const [b, cnt] of pg) {
    const g = node[nodeIdx][b];
    g.n += cnt[0] + cnt[1] + cnt[2] + cnt[3];
    for (let c = 0; c < 4; c++) g.cls[c] += cnt[c];
  }
};
const foldPair = (pgPool: PerGame, pgGlm: PerGame): void => {
  const keys = new Set<number>([...pgPool.keys(), ...pgGlm.keys()]);
  for (const b of keys) {
    const cP = pgPool.get(b) ?? [0, 0, 0, 0], cG = pgGlm.get(b) ?? [0, 0, 0, 0];
    for (let c = 0; c < 4; c++) {
      const d = cG[c] - cP[c], a = adiff[b][c];
      a[0] += d; a[1] += d * d; if (d !== 0 || cP[c] + cG[c] > 0) a[2]++;
    }
  }
};

const walk = (out: ReturnType<typeof runGame>, nodeIdx: 0 | 1): PerGame => {
  const pg: PerGame = new Map();
  let ptsA = 0, ptsB = 0;
  for (const e of out.events as readonly GameEv[]) {
    if (e.kind === 'score') { const p = e.payload; if (p.team === 'A') ptsA += p.points; else ptsB += p.points; }
    else if (e.kind === 'extra_point') { const p = e.payload; if (p.team === 'A') ptsA += p.points; else ptsB += p.points; }
    else if (e.kind === 'snap') {
      const s = e.payload as SnapP;
      if (s.call !== CALL.pass) continue;
      const ot = s.qtr === 5;
      const sd = ot ? 0 : (s.team === 'A' ? ptsA - ptsB : ptsB - ptsA);
      const x = passFeatures(s.down, s.ytg, s.ydl, sd, ot ? 2 : s.qtr, ot ? 600 : s.hs);
      const pr = passClassProbs(M, x);                       // lambda 0: tilt() is an exact identity (drive.ts returns [...p])
      const b = bucket(s.down, s.ytg, s.ydl);
      const g = node[nodeIdx][b]; for (let c = 0; c < 4; c++) g.imp[c] += pr[c];   // counts come from fold(pg) below; imp only here
      const d = bdiff[nodeIdx][b];
      for (let c = 0; c < 4; c++) { const v = pr[c] - (s.oc === c ? 1 : 0); d[c][0] += v; d[c][1] += v * v; d[c][2]++; }
      let c0 = pg.get(b); if (c0 === undefined) { c0 = [0, 0, 0, 0]; pg.set(b, c0); }
      c0[s.oc]++;
    }
  }
  return pg;
};

for (let gme = 0; gme < N; gme++) {
  const key = gameKeyOf('glm-bucket:' + gme);
  const p = runGame(P, key), q = runGame(P, key, { passClass: M });
  holes += q.holes[4] ?? 0;
  const pgP = walk(p, 0), pgG = walk(q, 1);
  fold(pgP, 0); fold(pgG, 1);
  foldPair(pgP, pgG);
}

// ---- report ----
const f3 = (x: number): string => x.toFixed(3), f1 = (x: number): string => x.toFixed(1);
const rate = (g: BAcc, c: number): number => g.cls[c] / g.n;
const mean = (s: number[]): number => (s[2] > 0 ? s[0] / s[2] : NaN);
const se = (s: number[]): number => (s[2] > 1 ? Math.sqrt(Math.max(0, s[1] / s[2] - (s[0] / s[2]) ** 2) / (s[2] - 1)) : NaN);
const z = (s: number[]): number => mean(s) / se(s);

console.log(`pools ${poolsName} + passclass ${pcName}: ${N} paired games, buckets down(${NB_D}) x dist(${NB_DIST}) x ydlC(${NB_YDL}) = ${NBUCK}, class-pool holes ${holes}`);
const tot = (): BAcc => { const t = acc(); for (const g of node[0]) { t.n += g.n; for (let c = 0; c < 4; c++) { t.cls[c] += g.cls[c]; t.imp[c] += g.imp[c]; } } return t; };
const totG = (): BAcc => { const t = acc(); for (const g of node[1]) { t.n += g.n; for (let c = 0; c < 4; c++) { t.cls[c] += g.cls[c]; t.imp[c] += g.imp[c]; } } return t; };
const TP = tot(), TG = totG();
const pct = (x: number): string => (100 * x).toFixed(2);
console.log(`overall pass snaps: pool ${TP.n}  glm ${TG.n}  (att/game ${f3(TP.n / (2 * N))} vs ${f3(TG.n / (2 * N))})`);
console.log(`overall realized rates  pool c/i/sk/in ${pct(rate(TP, 0))}/${pct(rate(TP, 1))}/${pct(rate(TP, 2))}/${pct(rate(TP, 3))}   glm ${pct(rate(TG, 0))}/${pct(rate(TG, 1))}/${pct(rate(TG, 2))}/${pct(rate(TG, 3))}`);
console.log(`overall implied rates   pool ${pct(TP.imp[0] / TP.n)}/${pct(TP.imp[1] / TP.n)}/${pct(TP.imp[2] / TP.n)}/${pct(TP.imp[3] / TP.n)}   glm ${pct(TG.imp[0] / TG.n)}/${pct(TG.imp[1] / TG.n)}/${pct(TG.imp[2] / TG.n)}/${pct(TG.imp[3] / TG.n)}`);
const bs = (arr: number[][][]): number[] => { const s = [0, 0, 0]; for (const b of arr) { s[0] += b[2][0]; s[1] += b[2][1]; s[2] += b[2][2]; } return s; };
const BP = bs(bdiff[0]), BG = bs(bdiff[1]);
console.log(`(B) model-implied minus realized, all buckets pooled:  pool states sack ${(100 * mean(BP)).toFixed(4)}pp (SE ${(100 * se(BP)).toFixed(4)}, z ${f1(z(BP))})   glm states sack ${(100 * mean(BG)).toFixed(4)}pp (SE ${(100 * se(BG)).toFixed(4)}, z ${f1(z(BG))})`);

const row = (name: string, list: number[]): string => {
  const agg = (): [BAcc, BAcc] => { const a = acc(), b = acc(); for (const i of list) { for (let c = 0; c < 4; c++) { a.cls[c] += node[0][i].cls[c]; a.imp[c] += node[0][i].imp[c]; b.cls[c] += node[1][i].cls[c]; b.imp[c] += node[1][i].imp[c]; } a.n += node[0][i].n; b.n += node[1][i].n; } return [a, b]; };
  const [A, B] = agg();
  const ds = [0, 0, 0]; for (const i of list) { ds[0] += adiff[i][2][0]; ds[1] += adiff[i][2][1]; ds[2] += adiff[i][2][2]; }
  return `${name.padEnd(10)} n ${(A.n / 1000).toFixed(0)}k/${(B.n / 1000).toFixed(0)}k  sack pool ${pct(rate(A, 2))} glm ${pct(rate(B, 2))} diff ${(100 * (rate(B, 2) - rate(A, 2))).toFixed(3)}pp z(A) ${f1(z(ds))}  imp pool ${pct(A.imp[2] / A.n)} glm ${pct(B.imp[2] / B.n)}  (B) ${(100 * mean(blist(list, 2))).toFixed(3)}pp z(B) ${f1(z(blist(list, 2)))}`;
};
const blist = (list: number[], c: number): number[] => { const s = [0, 0, 0]; for (const i of list) { s[0] += bdiff[0][i][c][0]; s[1] += bdiff[0][i][c][1]; s[2] += bdiff[0][i][c][2]; } return s; };

console.log('\n== by down ==');
for (let d = 1; d <= 4; d++) console.log(row(`down ${d}`, Array.from({ length: NB_DIST * NB_YDL }, (_, k) => (d - 1) * NB_DIST * NB_YDL + k)));
console.log('\n== by dist bin (yards to go) ==');
for (let db = 0; db < NB_DIST; db++) console.log(row(`ytg ${distName(db)}`, Array.from({ length: NB_D * NB_YDL }, (_, k) => { const d = Math.floor(k / NB_YDL); return d * NB_DIST * NB_YDL + db * NB_YDL + (k % NB_YDL); })));
console.log('\n== by ydlC bin (field position, yards to goal) ==');
for (let yb = 0; yb < NB_YDL; yb++) console.log(row(`ydl ${ydlName(yb)}`, Array.from({ length: NB_D * NB_DIST }, (_, k) => { const d = Math.floor(k / NB_DIST), db = k % NB_DIST; return d * NB_DIST * NB_YDL + db * NB_YDL + yb; })));
console.log('\n== (A) paired per-bucket sack diffs with |z| >= 2 (n >= 3000) ==');
let shown = 0;
for (let b = 0; b < NBUCK; b++) {
  const a = adiff[b][2]; if (a[2] < 3000) continue;
  const zz = z(a); if (Math.abs(zz) < 2) continue;
  shown++;
  const d = Math.floor(b / (NB_DIST * NB_YDL)), r = b % (NB_DIST * NB_YDL), db = Math.floor(r / NB_YDL), yb = r % NB_YDL;
  console.log(`d${d + 1} ytg ${distName(db).padEnd(5)} ydl ${ydlName(yb).padEnd(6)} n ${(node[0][b].n / 1000).toFixed(1)}k  pool ${pct(rate(node[0][b], 2))} glm ${pct(rate(node[1][b], 2))}  diff ${(100 * (rate(node[1][b], 2) - rate(node[0][b], 2))).toFixed(3)}pp  z ${f1(zz)}  (B) ${(100 * mean(bdiff[0][b][2])).toFixed(3)}pp z(B) ${f1(z(bdiff[0][b][2]))}`);
}
if (shown === 0) console.log('(none: no bucket with n>=3000 has |z| >= 2 on the paired sack diff)');
console.log('\n== top 8 buckets by |z(B)| on pool states (sack; n >= 3000) ==');
const ranked = Array.from({ length: NBUCK }, (_, b) => b).filter((b) => node[0][b].n >= 3000).sort((a, b) => Math.abs(z(bdiff[0][b][2])) - Math.abs(z(bdiff[0][a][2]))).slice(0, 8);
for (const b of ranked) {
  const d = Math.floor(b / (NB_DIST * NB_YDL)), r = b % (NB_DIST * NB_YDL), db = Math.floor(r / NB_YDL), yb = r % NB_YDL;
  console.log(`d${d + 1} ytg ${distName(db).padEnd(5)} ydl ${ydlName(yb).padEnd(6)} n ${(node[0][b].n / 1000).toFixed(1)}k  pool ${pct(rate(node[0][b], 2))} glm ${pct(rate(node[1][b], 2))}  (B) sack ${(100 * mean(bdiff[0][b][2])).toFixed(3)}pp z ${f1(z(bdiff[0][b][2]))}  comp ${(100 * mean(bdiff[0][b][0])).toFixed(3)}pp z ${f1(z(bdiff[0][b][0]))}`);
}
console.log('\n== sampler check: GLM realized vs model-implied on GLM states (should be ~0; realized class IS the drawn class when holes 0) ==');
console.log(`sack ${(100 * mean(BG)).toFixed(4)}pp (SE ${(100 * se(BG)).toFixed(4)}, z ${f1(z(BG))})   comp ${(100 * mean(bs2(0))).toFixed(4)}pp (SE ${(100 * se(bs2(0))).toFixed(4)}, z ${f1(z(bs2(0)))})`);
function bs2(c: number): number[] { const s = [0, 0, 0]; for (const b of bdiff[1]) { s[0] += b[c][0]; s[1] += b[c][1]; s[2] += b[c][2]; } return s; }
