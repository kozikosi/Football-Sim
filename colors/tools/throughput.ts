// Throughput of the play-level engine on the neutral pooled node (no ratings, no roster work): games/s, snaps/s, events/s, and the seconds one 272-game season costs.
// MEASUREMENT ONLY. The numbers depend on the machine and Node version, so the tool prints them with the Node version and never gates anything (a report, not a pin).
// Usage: node --experimental-strip-types tools/throughput.ts [games=6000] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025]
// Game keys are 'thru:<g>' (the 300 warm-up games use 'warm:<g>'), so the simulated games are fixed by N and the packs; only the wall clock varies between runs.
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';

const N = Number(process.argv[2] ?? 6000), poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025', pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load(poolsName))), M = loadPassClass(makePack(load(pcName)));

for (let g = 0; g < 300; g++) runGame(P, gameKeyOf('warm:' + g), { passClass: M });
let snaps = 0, events = 0;
const t0 = process.hrtime.bigint();
for (let g = 0; g < N; g++) {
  const o = runGame(P, gameKeyOf('thru:' + g), { passClass: M });
  events += o.events.length;
  for (const e of o.events) if (e.kind === 'snap') snaps++;
}
const s = Number(process.hrtime.bigint() - t0) / 1e9;
console.log(JSON.stringify({
  node: process.version, games: N, seconds: +s.toFixed(2), gamesPerSec: Math.round(N / s), snapsPerGame: +(snaps / N).toFixed(1),
  snapsPerSec: Math.round(snaps / s), eventsPerSec: Math.round(events / s), secondsPer272GameSeason: +(272 / (N / s)).toFixed(3),
}));
