import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/colors/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/colors/src/core/keyedrng.ts';
import { loadPools, recKeys } from '/tmp/glmrec2/colors/src/sports/nfl/sim/pools.ts';
import { loadPassClass, passClassProbs, passFeatures, pickClass } from '/tmp/glmrec2/colors/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/colors/src/sports/nfl/sim/game.ts';
import { at } from '/tmp/glmrec2/colors/src/core/at.ts';
const load=(n)=>JSON.parse(fs.readFileSync('/tmp/glm/data/packs/'+n+'.json','utf8'));
const P=loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M=loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const N=12000;
function classPool(p, oc, cls){ // same as passclass.ts
  const ids=[], cum=[]; let tot=0;
  for(let k=0;k<p.ids.length;k++){ const id=p.ids[k]; if(at(oc,id)===cls){ tot+=p.cum[k]-(k>0?p.cum[k-1]:0); ids.push(id); cum.push(tot);} }
  if(!ids.length) return undefined; return {ids:Int32Array.from(ids), cum:Float64Array.from(cum), total:tot};
}
function levelFor(keys, cls){
  let lastLevel=-1;
  for(let L=0;L<P.rec.length;L++){
    const p=P.rec[L].get(keys[L]);
    if(p===undefined) continue;
    const sub=classPool(p,P.tuples.oc,cls);
    if(sub!==undefined){ lastLevel=L; if(sub.total>=M.minClassPool) return L; }
  }
  return lastLevel;
}
const hist={}; let pass=0, thin=0;
for(let g=0;g<N;g++){
  const k=gameKeyOf('glm-bar:'+g);
  const out=runGame(P,k,{passClass:M});
  for(const ev of out.events){
    if(ev.kind!=='snap') continue;
    const s=ev.payload; if(s.call!==0) continue;
    pass++;
    const keys=recKeys(P.bins, s.call, s.down, s.ytg, s.ydl);
    // what class did it draw?
    const p=passClassProbs(M, passFeatures(s.down,s.ytg,s.ydl,0,s.qtr,600));
    const cls=pickClass(p, 0.5); // dummy; we only need the level distribution, so use every class
    void cls;
    for(const c of [0,1,2,3]){
      const L=levelFor(keys,c);
      const kk='down'+s.down+':class'+c+':L'+L;
      hist[kk]=(hist[kk]||0)+1;
      if(L>0) thin++;
    }
  }
}
console.log('class-restricted sampler: which pool level is used, by down x class | 65673a00 | '+N+' games');
console.log('(L0 = the finest cell; L>0 means the class had <'+M.minClassPool+' plays there and it fell back to a coarser cell)\n');
const downs=[...new Set(Object.keys(hist).map(k=>k.split(':')[0]))].sort();
for(const d of downs){
  const row=[0,1,2,3].map(c=>{ const a=hist[d+':class'+c+':L0']||0; let t=0; for(let L=0;L<5;L++) t+=hist[d+':class'+c+':L'+L]||0; return 'cls'+c+' '+(t?((a/t)*100).toFixed(1)+'%':'n/a'); });
  console.log('  '+d.padEnd(7), row.join('  '));
}
console.log('\ncoarse-cell (L>0) share of all class draws:', (thin/(pass*4)*100).toFixed(2)+'%');
