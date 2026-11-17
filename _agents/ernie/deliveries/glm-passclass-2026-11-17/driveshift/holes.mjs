import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/colors/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/colors/src/core/keyedrng.ts';
import { loadPools } from '/tmp/glmrec2/colors/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec2/colors/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/colors/src/sports/nfl/sim/game.ts';
const load=(n)=>JSON.parse(fs.readFileSync('/tmp/glm/data/packs/'+n+'.json','utf8'));
const P=loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M=loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
console.log('pack: trans =', P.trans, '| clock =', P.clock, '| minPool =', P.minPool, '| minClassPool =', M.minClassPool);
const N=12000;
const H={pools:[0,0,0,0,0],glm:[0,0,0,0,0]};
let games4=0, drivesP=0, drivesG=0, downsP=0, downsG=0, games4p=0;
for(let g=0;g<N;g++){
  const k=gameKeyOf('glm-bar:'+g);
  const a=runGame(P,k), b=runGame(P,k,{passClass:M});
  for(let i=0;i<5;i++){H.pools[i]+=a.holes[i];H.glm[i]+=b.holes[i];}
  if(b.holes[4]>0) games4++;
  const da=a.events.filter(e=>e.kind==='drive_end');
  const db=b.events.filter(e=>e.kind==='drive_end');
  const dpa=a.events.filter(e=>e.kind==='drive_start').length;
  const dpb=b.events.filter(e=>e.kind==='drive_start').length;
  drivesP+=dpa; drivesG+=dpb;
  downsP+=da.filter(e=>e.payload.result==='downs').length;
  downsG+=db.filter(e=>e.payload.result==='downs').length;
}
const L=['call','record','clock-late','clock-non','pass-class tuple'];
console.log('\nholes, summed over '+N+' games');
for(let i=0;i<5;i++) console.log('  '+L[i].padEnd(18), String(H.pools[i]).padStart(10), String(H.glm[i]).padStart(10), '   glm/pools', (H.glm[i]/Math.max(1,H.pools[i])).toFixed(2));
console.log('\ngames with >=1 pass-class fallback (hole[4]):', games4, '=', (games4/N*100).toFixed(2)+'%');
console.log('drives  pools',(drivesP/N).toFixed(4),' glm',(drivesG/N).toFixed(4));
console.log('downs   pools',(downsP/N).toFixed(4),' glm',(downsG/N).toFixed(4));
