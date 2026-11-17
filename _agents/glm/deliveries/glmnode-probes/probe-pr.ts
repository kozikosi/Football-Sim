// probe: does passClassProbs sum to 1, and does the walk accumulate what it should?
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools, CALL } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass, passFeatures, passClassProbs } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';

const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const x = passFeatures(2, 10, 45, 0, 1, 900);
const pr = passClassProbs(M, x);
console.log('state d2 ytg10 ydl45 sd0 q1: pr', pr.map((v) => v.toFixed(4)).join(','), ' sum', pr.reduce((s, v) => s + v, 0));

const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const out = runGame(P, gameKeyOf('probe:1'));
let n = 0, sumPr = 0, sumSackPr = 0, sacks = 0;
let ptsA = 0, ptsB = 0;
for (const e of out.events) {
  if (e.kind === 'score') { if (e.payload.team === 'A') ptsA += e.payload.points; else ptsB += e.payload.points; }
  else if (e.kind === 'extra_point') { if (e.payload.team === 'A') ptsA += e.payload.points; else ptsB += e.payload.points; }
  else if (e.kind === 'snap') {
    const s = e.payload;
    if (s.call !== CALL.pass) continue;
    n++;
    if (s.oc === 2) sacks++;
    const ot = s.qtr === 5;
    const sd = ot ? 0 : (s.team === 'A' ? ptsA - ptsB : ptsB - ptsA);
    const p2 = passClassProbs(M, passFeatures(s.down, s.ytg, s.ydl, sd, ot ? 2 : s.qtr, ot ? 600 : s.hs));
    sumPr += p2.reduce((a, v) => a + v, 0);
    sumSackPr += p2[2];
  }
}
console.log(`pass snaps ${n}, sacks ${sacks} (${(100 * sacks / n).toFixed(2)}%), mean sum(pr) ${(sumPr / n).toFixed(6)}, mean p_sack ${(100 * sumSackPr / n).toFixed(3)}%`);
