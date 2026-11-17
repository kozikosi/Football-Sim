// probe: inside the worst bucket (d3, ytg 17-99, ydl 22-51), how does the model's implied sack prob vary with ytg,
// and where do the sim's own states sit? (council GLM, 2026-11-17) — pool-node log only.
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
// per-ytg tally over pool-node pass snaps in the bucket (down 3, ytg>=17, ydl bin 2 = 22-51)
const N = 20000;
const rows = new Map<number, { n: number; sack: number; imp: number }>();
let ptsA = 0, ptsB = 0;
for (let g = 0; g < N; g++) {
  ptsA = 0; ptsB = 0;
  const out = runGame(P, gameKeyOf('ytgwithin:' + g));
  for (const e of out.events) {
    if (e.kind === 'score') { if (e.payload.team === 'A') ptsA += e.payload.points; else ptsB += e.payload.points; }
    else if (e.kind === 'extra_point') { if (e.payload.team === 'A') ptsA += e.payload.points; else ptsB += e.payload.points; }
    else if (e.kind === 'snap') {
      const s = e.payload as { call: number; down: number; ytg: number; ydl: number; qtr: number; hs: number; oc: number; team: string };
      if (s.call !== CALL.pass) continue;
      if (s.down !== 3 || s.ytg < 17 || binOf(P.bins.ydlC, s.ydl) !== 2) continue;
      const ot = s.qtr === 5;
      const sd = ot ? 0 : (s.team === 'A' ? ptsA - ptsB : ptsB - ptsA);
      const pr = passClassProbs(M, passFeatures(s.down, s.ytg, s.ydl, sd, ot ? 2 : s.qtr, ot ? 600 : s.hs));
      const b = Math.min(s.ytg, 60);
      let r = rows.get(b); if (!r) { r = { n: 0, sack: 0, imp: 0 }; rows.set(b, r); }
      r.n++; r.sack += s.oc === 2 ? 1 : 0; r.imp += pr[2];
    }
  }
}
console.log(`pool-node pass snaps in d3/ytg>=17/ydl22-51, ${N} games (ytg capped at 60):`);
console.log('ytg     n     realized%  implied%');
let tot = 0, totSack = 0, totImp = 0, hi = 0;
const ys = [...rows.keys()].sort((a, b) => a - b);
for (const y of ys) {
  const r = rows.get(y)!;
  if (y <= 26 || y === 60) console.log(`${String(y).padStart(3)} ${String(r.n).padStart(6)}  ${(100 * r.sack / r.n).toFixed(2).padStart(7)}  ${(100 * r.imp / r.n).toFixed(2).padStart(7)}`);
  tot += r.n; totSack += r.sack; totImp += r.imp; if (y >= 23) hi += r.n;
}
console.log(`total n ${tot}, realized ${(100 * totSack / tot).toFixed(2)}%, implied ${(100 * totImp / tot).toFixed(2)}%, share of snaps with ytg>=23: ${(100 * hi / tot).toFixed(1)}%`);
