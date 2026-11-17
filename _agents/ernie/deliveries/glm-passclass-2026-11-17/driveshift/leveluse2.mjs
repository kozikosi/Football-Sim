import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/colors/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/colors/src/core/keyedrng.ts';
import { loadPools, recKeys } from '/tmp/glmrec2/colors/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec2/colors/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/colors/src/sports/nfl/sim/game.ts';
import { at } from '/tmp/glmrec2/colors/src/core/at.ts';
const load=(n)=>JSON.parse(fs.readFileSync('/tmp/glm/data/packs/'+n+'.json','utf8'));
const P=loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M=loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const N=12000;
function classPool(p, oc, cls){ const ids=[],cum=[]; let tot=0;
  for(let k=0;k<p.ids.length;k++){ const id=p.ids[k]; if(at(oc,id)===cls){ tot+=p.cum[k]-(k>0?p.cum[k-1]:0); ids.push(id); cum.push(tot);} }
  if(!ids.length) return undefined; return {total:tot}; }
const histPool={}, histCls={};
let poolL0=0,poolN=0,clsL0=0,clsN=0;
for(let g=0;g<N;g++){
  const k=gameKeyOf('glm-bar:'+g);
  const out=runGame(P,k,{passClass:M});
  for(const ev of out.events){
    if(ev.kind!=='snap') continue;
    const s=ev.payload; if(s.call!==0||s.down!==4) continue;
    const keys=recKeys(P.bins,s.call,s.down,s.ytg,s.ydl);
    // pool node: finest level with total >= minPool
    let lp=-1;
    for(let L=0;L<P.rec.length;L++){ const p=P.rec[L].get(keys[L]); if(p&&p.total>=P.minPool){ lp=L; break; } }
    if(lp<0) for(let L=P.rec.length-1;L>=0;L--){ if(P.rec[L].get(keys[L])){ lp=L; break; } }
    histPool[lp]=(histPool[lp]||0)+1; poolN++; if(lp===0)poolL0++;
    // glm node: finest level whose class sub-pool >= minClassPool
    for(const c of [0,1,2,3]){
      let lc=-1;
      for(let L=0;L<P.rec.length;L++){ const p=P.rec[L].get(keys[L]); if(!p)continue; const sub=classPool(p,P.tuples.oc,c); if(sub){ lc=L; if(sub.total>=M.minClassPool) break; } }
      histCls[lc]=(histCls[lc]||0)+1; clsN++; if(lc===0)clsL0++;
    }
  }
}
console.log('4th-down pass plays, which pool level each node uses | 65673a00 | '+N+' games');
console.log('pools node (minPool '+P.minPool+' any class)  L0 share', (poolL0/poolN*100).toFixed(2)+'%', ' levels', JSON.stringify(histPool));
console.log('GLM   node (minClassPool '+M.minClassPool+' per class) L0 share', (clsL0/clsN*100).toFixed(2)+'%', ' levels', JSON.stringify(histCls));
console.log('\nthis is the asymmetry: on 4th down a cell clears minPool on total plays but not minClassPool on a single class.');
