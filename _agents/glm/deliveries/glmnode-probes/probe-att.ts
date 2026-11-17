// probe: reconcile pass_att (the totals metric) with count(call==pass) on the same games (council GLM, 2026-11-17)
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import fs from 'node:fs';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools, CALL } from '../src/sports/nfl/sim/pools.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
let callPass = 0, paPassRun = 0, paOnCallPass = 0, otPass = 0, regPass = 0, kneel = 0, spike = 0, odd: string[] = [];
for (let g = 0; g < 4000; g++) {
  const out = runGame(P, gameKeyOf('reconcile:' + g));
  for (const e of out.events) {
    if (e.kind !== 'snap') continue;
    const p = e.payload as { call: number; pa: number; oc: number; qtr: number };
    if (p.call === CALL.pass) { callPass++; if (p.qtr === 5) otPass++; else regPass++; paOnCallPass += p.pa; if (odd.length < 5 && p.pa !== 1) odd.push(`call0 pa${p.pa} oc${p.oc} q${p.qtr}`); }
    if (p.call === CALL.pass || p.call === CALL.run) paPassRun += p.pa;
    if (p.call === CALL.kneel) kneel++;
    if (p.call === CALL.spike) spike++;
  }
}
console.log(`4000 games: count(call==pass) ${(callPass / 8000).toFixed(3)}/team-game  (OT ${otPass}, reg ${regPass})`);
console.log(`metric pass_att (sum pa over call pass|run) ${(paPassRun / 8000).toFixed(3)}/team-game`);
console.log(`sum pa over call==pass only ${(paOnCallPass / 8000).toFixed(3)}/team-game`);
console.log(`kneel snaps ${kneel}, spike snaps ${spike}`);
console.log('odd pass snaps with pa != 1:', odd.length ? odd.join('; ') : 'none');
