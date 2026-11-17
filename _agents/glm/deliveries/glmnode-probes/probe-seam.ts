// probe: the lambda seam in my own numbers (council GLM, 2026-11-17) — 300 games, lambda 1, gap -1/0/1
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import fs from 'node:fs';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools, CALL } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M0 = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const M = { ...M0, lambda: 1 };
const tot = (gap: number): { c: number; s: number } => {
  let c = 0, s = 0, pa = 0;
  for (let g = 0; g < 300; g++) {
    const out = runGame(P, gameKeyOf('seamglm:' + g), { passClass: M, passGap: gap });
    for (const e of out.events) if (e.kind === 'snap') { const p = e.payload as { call: number; oc: number }; if (p.call === CALL.pass) { pa++; if (p.oc === 0) c++; if (p.oc === 2) s++; } }
  }
  return { c: c / pa, s: s / pa };
};
for (const gap of [-1, 0, 1]) { const r = tot(gap); console.log(`gap ${gap}: comp ${(100 * r.c).toFixed(3)}%  sack ${(100 * r.s).toFixed(3)}%`); }
