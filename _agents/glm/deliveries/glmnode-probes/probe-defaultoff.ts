// probe: default-off across versions — runGame WITHOUT passClass at the tip (65673a00) must equal the parent (5c808472) bit for bit (council GLM, 2026-11-17)
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
// the parent's game.ts, imported fresh (its own relative imports resolve inside its own tree)
const parent = new URL('../../../glm-glmnode-5c808472/colors/src/sports/nfl/sim/game.ts', import.meta.url);
const oldGame = await import(parent.href) as typeof import('../src/sports/nfl/sim/game.ts');
const { runGame } = await import('../src/sports/nfl/sim/game.ts');
let same = 0, diff = 0;
for (let g = 0; g < 200; g++) {
  const key = gameKeyOf('defaultoff:' + g);
  const a = oldGame.runGame(P, key), b = runGame(P, key);
  const ja = JSON.stringify({ e: a.events, p: a.points, o: a.ot, h: a.holes }), jb = JSON.stringify({ e: b.events, p: b.points, o: b.ot, h: b.holes });
  if (ja === jb) same++; else { diff++; if (diff <= 2) console.log(`game ${g} DIFFERS (old ${ja.length}B, new ${jb.length}B)`); }
}
console.log(`default-off across versions (5c808472 vs 65673a00, no passClass): ${same} games identical, ${diff} differ`);
// and the GLM node really is a different node on the tip
const { loadPassClass } = await import('../src/sports/nfl/sim/passclass.ts');
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const a = runGame(P, gameKeyOf('defaultoff:0'), {}), b = runGame(P, gameKeyOf('defaultoff:0'), { passClass: M });
console.log(`tip: no-option vs GLM-option on key 0: ${JSON.stringify({ e: a.events, p: a.points, o: a.ot, h: a.holes }) === JSON.stringify({ e: b.events, p: b.points, o: b.ot, h: b.holes }) ? 'SAME <-- BAD' : 'DIFFERENT (the node does something)'}`);
