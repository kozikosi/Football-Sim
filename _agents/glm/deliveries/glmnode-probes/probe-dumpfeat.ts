// probe: dump the raw feature inputs for pool-node pass snaps in d3/ytg>=17/ydl22-51 (council GLM, 2026-11-17)
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import fs from 'node:fs';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools, CALL, binOf } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass, passFeatures, passClassProbs } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
let shown = 0, sdSum = 0, n = 0, late = 0;
let ptsA = 0, ptsB = 0;
for (let g = 0; g < 3000 && shown < 10; g++) {
  ptsA = 0; ptsB = 0;
  const out = runGame(P, gameKeyOf('dumpfeat:' + g));
  for (const e of out.events) {
    if (e.kind === 'score') { if (e.payload.team === 'A') ptsA += e.payload.points; else ptsB += e.payload.points; }
    else if (e.kind === 'extra_point') { if (e.payload.team === 'A') ptsA += e.payload.points; else ptsB += e.payload.points; }
    else if (e.kind === 'snap') {
      const s = e.payload as { call: number; down: number; ytg: number; ydl: number; qtr: number; hs: number; oc: number; team: string };
      if (s.call !== CALL.pass || s.down !== 3 || s.ytg < 17 || binOf(P.bins.ydlC, s.ydl) !== 2) continue;
      n++;
      const ot = s.qtr === 5;
      const sd = ot ? 0 : (s.team === 'A' ? ptsA - ptsB : ptsB - ptsA);
      sdSum += sd;
      const x = passFeatures(s.down, s.ytg, s.ydl, sd, ot ? 2 : s.qtr, ot ? 600 : s.hs);
      if (x[9] === 1) late++;
      if (shown < 10) { shown++; console.log(`g${g} d${s.down} ytg${s.ytg.toFixed(0)} ydl${s.ydl} sd${sd} q${s.qtr} hs${s.hs.toFixed(0)} -> pr ${passClassProbs(M, x).map((v) => (100 * v).toFixed(1)).join('/')}`);
        console.log('   features', x.map((v) => (Math.abs(v) < 0.001 ? 0 : v.toFixed(3))).join(',')); }
    }
  }
}
console.log(`n ${n}, mean sd ${sdSum / n}, late share ${(100 * late / n).toFixed(1)}%`);
