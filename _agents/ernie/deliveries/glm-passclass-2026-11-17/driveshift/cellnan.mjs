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
const T=P.tuples;
const N=6000;
// For 4th-down pass plays: at each level, among the class-1 (inc) sub-pool, share with NaN nd.
const acc={}; // level -> {nan, tot, cells}
const cache=new Map();
function subStats(L, keys, cls){
  const ck=L+':'+keys.join(',')+':'+cls;
  if(cache.has(ck)) return cache.get(ck);
  const p=P.rec[L].get(keys[L]); let r={nan:0,tot:0};
  if(p){ for(let k=0;k<p.ids.length;k++){ const id=p.ids[k]; if(at(T.oc,id)!==cls) continue;
    r.tot++; if(Number.isNaN(at(T.ndown,id))||Number.isNaN(at(T.delta,id))) r.nan++; } }
  cache.set(ck,r); return r;
}
let seen=0;
for(let g=0;g<N;g++){
  const k=gameKeyOf('glm-bar:'+g);
  const out=runGame(P,k,{passClass:M});
  for(const ev of out.events){
    if(ev.kind!=='snap') continue;
    const s=ev.payload; if(s.call!==0||s.down!==4) continue;
    const keys=recKeys(P.bins,s.call,s.down,s.ytg,s.ydl);
    seen++;
    for(let L=0;L<P.rec.length;L++){
      const r=subStats(L,keys,1);
      const a=acc[L]||(acc[L]={nan:0,tot:0});
      a.nan+=r.nan; a.tot+=r.tot;
    }
  }
}
console.log('4th-down pass plays ('+seen+' sampled, '+N+' games): among the INCOMPLETE sub-pool at each level, share whose (ndown,delta) is NaN (=> drive ENDS)');
console.log('level  share-NaN      (a defined ndown here means the drive CONTINUES on a 4th-down incompletion)');
for(let L=0;L<P.rec.length;L++) if(acc[L]&&acc[L].tot) console.log('  L'+L+'   ', (acc[L].nan/acc[L].tot*100).toFixed(2)+'%', '('+acc[L].nan+'/'+acc[L].tot+')');
