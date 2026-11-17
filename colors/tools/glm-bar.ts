// 2a: what the pass-class GLM node does to a whole game, next to the pools' own record node, on the SAME keys (a paired comparison). A REPORT, not a gate.
// Usage: node --experimental-strip-types tools/glm-bar.ts [games=12000] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025]
// Pairing: every game uses the same game key under both nodes, so the difference of means has a standard error far below that of two independent runs.
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame, TEAMS } from '../src/sports/nfl/sim/game.ts';
import { gameTotals, METRICS } from '../src/sports/nfl/sim/totals.ts';

const N = Number(process.argv[2] ?? 12000), poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025', pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load(poolsName))), M = loadPassClass(makePack(load(pcName)));
const d: Record<string, number[]> = {}, a: Record<string, number> = {}, b: Record<string, number> = {};
for (const m of METRICS) { d[m] = []; a[m] = 0; b[m] = 0; }
let holes = 0;
for (let g = 0; g < N; g++) {
  const key = gameKeyOf('glm-bar:' + g), p = runGame(P, key), q = runGame(P, key, { passClass: M });
  holes += q.holes[4] ?? 0;
  const tp = gameTotals(p), tq = gameTotals(q);
  for (const m of METRICS) { let x = 0, y = 0; for (const t of TEAMS) { x += tp[t]![m]; y += tq[t]![m]; } d[m]!.push((y - x) / 2); a[m]! += x / 2; b[m]! += y / 2; }
}
console.log(`pools ${poolsName} + passclass ${pcName}: ${N} paired games (per team-game means), class-pool holes ${holes}`);
console.log('metric        pools     GLM    diff   diff%   SE(diff)  z');
for (const m of METRICS) {
  const v = d[m]!, mean = v.reduce((s, x) => s + x, 0) / N, sd = Math.sqrt(v.reduce((s, x) => s + (x - mean) ** 2, 0) / (N - 1)), se = sd / Math.sqrt(N);
  console.log(`${m.padEnd(12)}${(a[m]! / N).toFixed(3).padStart(8)}${(b[m]! / N).toFixed(3).padStart(8)}${mean.toFixed(3).padStart(8)}${((mean / (a[m]! / N)) * 100).toFixed(2).padStart(8)}${se.toFixed(3).padStart(9)}${(mean / se).toFixed(1).padStart(6)}`);
}
