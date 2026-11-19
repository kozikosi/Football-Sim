// Item 6: the tilt axis. It measures TILT STRENGTH s, NOT lambda: lambda is pinned to 1 off-pack and passGap is one scalar for both offenses, so this tool cannot produce or calibrate a lambda value. How far does the pass-class tilt move a whole game as lambda * passGap grows? A REPORT, not a gate. Nothing here changes a pack, a default, or src/.
// The seam (drive.ts tilt): P_k proportional to p_k * exp(s * theta_k) with s = lambda * passGap. Only the PRODUCT s matters, and the shipped pack has lambda 0, so this tool
// overrides lambda to 1 off-pack and sweeps passGap = s. s = 0 is the baseline arm (the GLM with no tilt: tilt() returns the class probabilities untouched).
// Pairing: every arm plays the SAME game key ('lambda-axis:<g>') as the baseline, so each difference of means carries a paired standard error.
// Usage: node --experimental-strip-types tools/lambda-axis.ts [games=20000] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025] [jsonOut]
// Game keys are 'lambda-axis:<g>' for g in 0..N-1 and the axis is fixed below, so a run is fully determined by N and the two packs.
import fs from 'node:fs';
import crypto from 'node:crypto';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass, PASS_CLASSES } from '../src/sports/nfl/sim/passclass.ts';
import { runGame, TEAMS } from '../src/sports/nfl/sim/game.ts';
import { gameTotals, METRICS } from '../src/sports/nfl/sim/totals.ts';

const AXIS = [-1, -0.5, -0.25, 0.25, 0.5, 1] as const;     // s = lambda * passGap; 0 is the baseline
const N = Number(process.argv[2] ?? 20000), poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025', pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
const jsonOut = process.argv[5];
const packUrl = (n: string) => new URL(`../../data/packs/${n}.json`, import.meta.url);
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(packUrl(n), 'utf8')) as PackBody;
const sha = (n: string) => crypto.createHash('sha256').update(fs.readFileSync(packUrl(n))).digest('hex');
const P = loadPools(makePack(load(poolsName))), M0 = loadPassClass(makePack(load(pcName)));
const M = { ...M0, lambda: 1 };                              // off-pack override; the pack itself is untouched

// per-team-game totals for one game: the mean over the two teams of each metric
const game = (key: ReturnType<typeof gameKeyOf>, s: number) => {
  const t = gameTotals(runGame(P, key, { passClass: M, passGap: s })), o: Record<string, number> = {};
  for (const m of METRICS) { let x = 0; for (const tm of TEAMS) x += t[tm]![m]; o[m] = x / 2; }
  return o;
};

const base: Record<string, number> = {}, sum: Record<number, Record<string, number>> = {}, d: Record<number, Record<string, number[]>> = {};
for (const m of METRICS) base[m] = 0;
for (const s of AXIS) { sum[s] = {}; d[s] = {}; for (const m of METRICS) { sum[s]![m] = 0; d[s]![m] = []; } }
for (let g = 0; g < N; g++) {
  const key = gameKeyOf('lambda-axis:' + g), b = game(key, 0);
  for (const m of METRICS) base[m]! += b[m]!;
  for (const s of AXIS) { const x = game(key, s); for (const m of METRICS) { sum[s]![m]! += x[m]!; d[s]![m]!.push(x[m]! - b[m]!); } }
}

console.log(`pools ${poolsName} + passclass ${pcName}: ${N} paired games per arm (per team-game means), s = lambda*passGap, baseline s=0`);
console.log('theta (class order ' + PASS_CLASSES.join(',') + '): ' + M0.theta.map((x) => x.toFixed(3)).join(' '));
const out: Record<string, Record<string, { arm: number; diff: number; diffPct: number; se: number; z: number }>> = {};
for (const s of AXIS) {
  console.log(`\ns = ${s}`);
  console.log('metric        base     arm    diff   diff%   SE(diff)  z');
  const rows: Record<string, { arm: number; diff: number; diffPct: number; se: number; z: number }> = {};
  for (const m of METRICS) {
    const v = d[s]![m]!, mean = v.reduce((a, x) => a + x, 0) / N, sd = Math.sqrt(v.reduce((a, x) => a + (x - mean) ** 2, 0) / (N - 1)), se = sd / Math.sqrt(N), bm = base[m]! / N;
    rows[m] = { arm: sum[s]![m]! / N, diff: mean, diffPct: (mean / bm) * 100, se, z: se > 0 ? mean / se : 0 };
    console.log(`${m.padEnd(12)}${bm.toFixed(3).padStart(8)}${(sum[s]![m]! / N).toFixed(3).padStart(8)}${mean.toFixed(3).padStart(8)}${((mean / bm) * 100).toFixed(2).padStart(8)}${se.toFixed(3).padStart(9)}${(se > 0 ? mean / se : 0).toFixed(1).padStart(6)}`);
  }
  out[String(s)] = rows;
}
if (jsonOut) {
  const baseline: Record<string, number> = {};
  for (const m of METRICS) baseline[m] = base[m]! / N;
  fs.writeFileSync(jsonOut, JSON.stringify({ tool: 'colors/tools/lambda-axis.ts', games: N, keyPrefix: 'lambda-axis:', axis: AXIS, lambdaOverride: 1, theta: M0.theta, classes: PASS_CLASSES, pools: { name: poolsName, sha256: sha(poolsName) }, passclass: { name: pcName, sha256: sha(pcName) }, baselinePerTeamGameMeans: baseline, arms: out }, null, 1) + '\n');
}
