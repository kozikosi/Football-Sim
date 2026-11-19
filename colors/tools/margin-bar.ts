// The margin + sack bar on the NEUTRAL pooled engine (two identical teams, no rating spread, no home edge). A REPORT, not a gate (Owner, 13 Nov; tolerances declared in claude/NOW.md, 18 Nov).
// Usage: node --experimental-strip-types tools/margin-bar.ts [games=20000] [pack=../data/packs/nfl-pools-fit2023-2025.json]
// Prints the sim's margin shape (A minus B, final score incl. OT) next to the declared real reference (REG 2016-2025, n=2761) and its tolerance band, plus sacks per team-game.
// Read this with ONE caveat: real margins carry team-strength spread and a home edge; a neutral engine has neither, so SD and home win are structurally LOW and 50% here. That is a measurement of the noise floor.
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import { runGame, TEAMS } from '../src/sports/nfl/sim/game.ts';
import { gameTotals } from '../src/sports/nfl/sim/totals.ts';

const N = Number(process.argv[2] ?? 20000);
const here = new URL('.', import.meta.url).pathname;
const packPath = process.argv[3] ?? here + '../../data/packs/nfl-pools-fit2023-2025.json';
const pack = makePack(JSON.parse(fs.readFileSync(packPath, 'utf8')) as PackBody);
const P = loadPools(pack);

const m: number[] = []; let sacks = 0, ot = 0, ties = 0, aWins = 0, decided = 0;
for (let g = 0; g < N; g++) {
  const out = runGame(P, gameKeyOf('margin-bar:' + g));
  const d = (out.points[0] ?? 0) - (out.points[1] ?? 0); m.push(d);
  if (out.ot) ot++; if (d === 0) ties++; else { decided++; if (d > 0) aWins++; }
  const tt = gameTotals(out); for (const t of TEAMS) sacks += tt[t]?.sacks ?? 0;
}
const mean = m.reduce((a, b) => a + b, 0) / N;
const c = (k: number): number => m.reduce((a, b) => a + (b - mean) ** k, 0) / N;
const sd = Math.sqrt(c(2)), skew = c(3) / sd ** 3, kurt = c(4) / sd ** 4 - 3;
const share = (f: (x: number) => boolean): number => 100 * m.filter(f).length / N;
const row = (name: string, sim: number, real: number, tol: string, ok: boolean, unit = ''): void => console.log(`${name.padEnd(24)}${sim.toFixed(2).padStart(8)}${unit}  real ${real.toFixed(2).padStart(7)}${unit}  tol ${tol.padEnd(14)} ${ok ? 'inside' : 'OUTSIDE'}`);
console.log(`pack ${pack.id} ${pack.hash} | ${N} neutral games, seed key 'margin-bar:<g>' | OT ${(100 * ot / N).toFixed(1)}%, ties ${(100 * ties / N).toFixed(2)}%`);
row('margin SD', sd, 14.158, '+-10%', Math.abs(sd / 14.158 - 1) <= 0.10);
row('one-score |m|<=7 %', share((x) => Math.abs(x) <= 7), 48.5, '+-4 pts', Math.abs(share((x) => Math.abs(x) <= 7) - 48.5) <= 4);
row('blowout |m|>=21 %', share((x) => Math.abs(x) >= 21), 16.1, '+-3 pts', Math.abs(share((x) => Math.abs(x) >= 21) - 16.1) <= 3);
row('home win % (A=home)', 100 * aWins / decided, 54.8, '+-4 pts', Math.abs(100 * aWins / decided - 54.8) <= 4);
console.log(`mean margin ${mean.toFixed(3)} (real +1.945, not gated) | skew ${skew.toFixed(3)} (real 0.052) | excess kurtosis ${kurt.toFixed(3)} (real 0.206)`);
console.log(`sacks per team-game ${(sacks / (2 * N)).toFixed(3)} (real 2.33 for 2016-22, 2.44 / 2.35 for 2023-25, tol +-10%)`);
