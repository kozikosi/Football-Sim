// The ~10% totals bar, re-run in TypeScript on the baked pools pack (1c). A REPORT, not a gate (Owner, 13 Nov: historical totals are a test to explain, not a gate).
// Usage: node --experimental-strip-types tools/totals-bar.ts [games=12000] [pack=../data/packs/nfl-pools-fit2016-2022.json] [reference=../tools/mathlab/results/phase1-reference-2026-11-15.json] [clock=dt_f|dt_pf] [trans=empirical|computed]
// Prints: sim means next to the REAL held-out seasons (2023-2025 REG) and in-sample 2016-2022, and next to the Python lab on the same pack (the port check), plus throughput.
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import { runGame, TEAMS } from '../src/sports/nfl/sim/game.ts';
import { gameTotals, METRICS } from '../src/sports/nfl/sim/totals.ts';

const N = Number(process.argv[2] ?? 12000);
const here = new URL('.', import.meta.url).pathname;
const packPath = process.argv[3] ?? here + '../../data/packs/nfl-pools-fit2016-2022.json';
const refPath = process.argv[4] ?? here + '../../tools/mathlab/results/phase1-reference-2026-11-15.json';
const clock = process.argv[5] ?? 'dt_f', trans = process.argv[6] ?? 'empirical';
const body = JSON.parse(fs.readFileSync(packPath, 'utf8')) as PackBody;
const withRules: PackBody = { ...body, rules: { ...body.rules, values: { ...body.rules.values, clock, trans } } };
const pack = makePack(withRules);
const P = loadPools(pack);
const ref = JSON.parse(fs.readFileSync(refPath, 'utf8')) as { pySim: Record<string, { mean: number; sd: number }>; real: Record<string, Record<string, { mean: number; sd: number; n: number }>> };

const sum: Record<string, number> = {}, sq: Record<string, number> = {};
for (const m of METRICS) { sum[m] = 0; sq[m] = 0; }
let otGames = 0, rows = 0, events = 0; const holes = [0, 0, 0, 0, 0];
const t0 = process.hrtime.bigint();
for (let g = 0; g < N; g++) {
  const out = runGame(P, gameKeyOf('totals-bar:' + g));
  if (out.ot) otGames++;
  events += out.events.length;
  out.holes.forEach((h, i) => { holes[i] = (holes[i] ?? 0) + h; });
  const tt = gameTotals(out);
  for (const team of TEAMS) {
    const x = tt[team]; if (x === undefined) throw new Error('missing team');
    rows++;
    for (const m of METRICS) { const v = x[m]; sum[m] = (sum[m] ?? 0) + v; sq[m] = (sq[m] ?? 0) + v * v; }
  }
}
const secs = Number(process.hrtime.bigint() - t0) / 1e9;
const f = (x: number, d = 2): string => x.toFixed(d).padStart(8);
const pct = (a: number, b: number): string => ((a / b - 1) * 100).toFixed(1).padStart(6);
console.log(`pack ${pack.id} ${pack.hash} | clock=${clock} trans=${trans} | ${N} games (${rows} team-games), seed key 'totals-bar:<g>'`);
console.log(`throughput: ${secs.toFixed(1)} s, ${(N / secs).toFixed(0)} games/s, ${(events / secs / 1000).toFixed(0)}k events/s, ${(events / N).toFixed(0)} events/game; OT games ${(otGames / N * 100).toFixed(1)}%; table holes (call,rec,clockLate,clockNon): ${holes.slice(0, 4).join(',')}`);
console.log('\nmetric        sim     pySim  vsPy%   real23 v%   real24 v%   real25 v%   in-sample v%   sim_sd  real_sd(23-25 avg)');
for (const m of METRICS) {
  const mean = (sum[m] ?? 0) / rows, sd = Math.sqrt(Math.max(0, (sq[m] ?? 0) / rows - mean * mean));
  const py = ref.pySim[m]?.mean ?? NaN, r = (y: string): number => ref.real[y]?.[m]?.mean ?? NaN;
  const rsd = (['2023', '2024', '2025'].reduce((a, y) => a + (ref.real[y]?.[m]?.sd ?? 0), 0)) / 3;
  console.log(`${m.padEnd(12)}${f(mean)}${f(py)} ${pct(mean, py)}   ${f(r('2023'))}${pct(mean, r('2023'))}  ${f(r('2024'))}${pct(mean, r('2024'))}  ${f(r('2025'))}${pct(mean, r('2025'))}  ${f(r('2016-2022'))}${pct(mean, r('2016-2022'))}  ${f(sd)} ${f(rsd)}`);
}
