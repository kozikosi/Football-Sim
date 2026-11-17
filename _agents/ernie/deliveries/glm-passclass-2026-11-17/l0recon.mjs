// Reconcile two different "L0 share" numbers I have reported: per-play vs per-(play,class).
import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/src/core/keyedrng.ts';
import { loadPools, recKeys } from '/tmp/glmrec2/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec2/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/src/sports/nfl/sim/game.ts';
import { at } from '/tmp/glmrec2/src/core/at.ts';
const load=(n)=>JSON.parse(fs.readFileSync('/tmp/glm/data/packs/'+n+'.json','utf8'));
const P=loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M=loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const N=Number(process.argv[2]||12000);
function subTotal(p,cls){let t=0;for(let k=0;k<p.ids.length;k++) if(at(P.tuples.oc,p.ids[k])===cls) t+=p.cum[k]-(k>0?p.cum[k-1]:0); return t;}
function glmLevel(keys,cls){let last=-1;for(let L=0;L<P.rec.length;L++){const p=P.rec[L].get(keys[L]); if(!p)continue; const t=subTotal(p,cls); if(t<=0)continue; last=L; if(t>=M.minClassPool) return L;} return last;}
let plays4=0, l0real=0, clsPairs=0, l0any=0;
for(let g=0;g<N;g++){
  const k=gameKeyOf('glm-bar:'+g);
  const out=runGame(P,k,{passClass:M});
  for(const e of out.events){
    if(e.kind!=='snap') continue;
    const p=e.payload; if(p.call!==0||p.down!==4) continue;
    const keys=recKeys(P.bins,p.call,p.down,p.ytg,p.ydl);
    plays4++;
    // per play, the class that was actually drawn (the tuple's oc == the drawn class)
    if(glmLevel(keys,p.oc)===0) l0real++;
    // per (play, class) over all four classes
    for(const c of [0,1,2,3]){ clsPairs++; if(glmLevel(keys,c)===0) l0any++; }
  }
}
console.log('4th-down pass plays: '+plays4+'  (N='+N+' paired games)');
console.log('');
console.log('PER PLAY (the realised class — the quantity my headline claim needs):');
console.log('  L0 share = '+(l0real/plays4*100).toFixed(2)+'%   ('+l0real+'/'+plays4+')');
console.log('');
console.log('PER (PLAY x CLASS) over all four classes (what leveluse2.mjs computed):');
console.log('  L0 share = '+(l0any/clsPairs*100).toFixed(2)+'%   ('+l0any+'/'+clsPairs+')');
console.log('');
console.log('My 20261117-2101 filing quoted 8.06% — that is the PER-CLASS number.');
console.log('Beam (N=2000) reported 16.31% — that is the PER-PLAY number, and it is the right one for the claim.');
