import fs from 'node:fs';
import { makePack } from '/tmp/glmrec/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec/src/core/keyedrng.ts';
import { loadPools } from '/tmp/glmrec/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec/src/sports/nfl/sim/passclass.ts';
import { runGame, PASSLOG } from '/tmp/glmrec/src/sports/nfl/sim/game.ts';
const load = (n) => JSON.parse(fs.readFileSync('/tmp/glm/data/packs/'+n+'.json','utf8'));
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const mode = process.argv[2], N = Number(process.argv[3]||12000);
for (let g=0; g<N; g++) {
  const k = gameKeyOf('glm-bar:'+g);
  if (mode === 'glm') runGame(P, k, { passClass: M }); else runGame(P, k);
}
fs.writeFileSync('/tmp/log-'+mode+'.json', JSON.stringify(PASSLOG));
console.log(mode, 'plays', PASSLOG.length);
