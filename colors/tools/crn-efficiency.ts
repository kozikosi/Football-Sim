// How much does keying draws by event index buy a paired counterfactual? Paired arm: the SAME game key with tilt s and with tilt 0. Unpaired arm: an independent game key for the tilted game.
// Reduction = Var(unpaired difference) / Var(paired difference): 1.0 means pairing buys nothing, 2.0 means half the games give the same precision.
// MEASUREMENT ONLY, report-only, deterministic (game keys 'crn:<g>' and 'crn-indep:<g>'). Like lambda-axis.ts it sets lambda to 1 off-pack and sweeps passGap = s, so s is the TILT STRENGTH, not lambda.
// Usage: node --experimental-strip-types tools/crn-efficiency.ts [games=3000] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025]
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame, TEAMS } from '../src/sports/nfl/sim/game.ts';
import { gameTotals, METRICS } from '../src/sports/nfl/sim/totals.ts';

const S_AXIS = [0.25, 1] as const;
const N = Number(process.argv[2] ?? 3000), poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025', pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load(poolsName))), M = { ...loadPassClass(makePack(load(pcName))), lambda: 1 };

const game = (key: ReturnType<typeof gameKeyOf>, s: number): Record<string, number> => {
  const t = gameTotals(runGame(P, key, { passClass: M, passGap: s })), o: Record<string, number> = {};
  for (const m of METRICS) { let x = 0; for (const tm of TEAMS) x += t[tm]![m]; o[m] = x / 2; }
  return o;
};
const variance = (a: number[]): number => { const m = a.reduce((x, y) => x + y, 0) / a.length; return a.reduce((x, y) => x + (y - m) ** 2, 0) / (a.length - 1); };

const out: Record<string, Record<string, { pairedSD: number; unpairedSD: number; reduction: number }>> = {};
for (const s of S_AXIS) {
  const dp: Record<string, number[]> = {}, du: Record<string, number[]> = {};
  for (const m of METRICS) { dp[m] = []; du[m] = []; }
  for (let g = 0; g < N; g++) {
    const b = game(gameKeyOf('crn:' + g), 0), x = game(gameKeyOf('crn:' + g), s), y = game(gameKeyOf('crn-indep:' + g), s);
    for (const m of METRICS) { dp[m]!.push(x[m]! - b[m]!); du[m]!.push(y[m]! - b[m]!); }
  }
  const row: Record<string, { pairedSD: number; unpairedSD: number; reduction: number }> = {};
  for (const m of METRICS) { const vp = variance(dp[m]!), vu = variance(du[m]!); row[m] = { pairedSD: +Math.sqrt(vp).toFixed(3), unpairedSD: +Math.sqrt(vu).toFixed(3), reduction: +(vu / vp).toFixed(2) }; }
  out['s=' + s] = row;
}
console.log(JSON.stringify({ games: N, pools: poolsName, passclass: pcName, results: out }, null, 1));
