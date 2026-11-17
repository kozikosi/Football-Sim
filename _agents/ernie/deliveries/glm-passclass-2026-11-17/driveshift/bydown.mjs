import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/colors/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/colors/src/core/keyedrng.ts';
import { loadPools } from '/tmp/glmrec2/colors/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec2/colors/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/colors/src/sports/nfl/sim/game.ts';
const load=(n)=>JSON.parse(fs.readFileSync('/tmp/glm/data/packs/'+n+'.json','utf8'));
const P=loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M=loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const N=12000;
// per down: pass plays, class mix, and 4th-down pass outcome
const res={};
function tally(mode){
  const D={}; // down -> {n, comp, inc, sack, int}
  for(let g=0;g<N;g++){
    const k=gameKeyOf('glm-bar:'+g);
    const out=mode==='glm'?runGame(P,k,{passClass:M}):runGame(P,k);
    for(const ev of out.events){
      if(ev.kind!=='snap') continue;
      const s=ev.payload; if(s.call!==0) continue;
      const d=D[s.down]||(D[s.down]={n:0,comp:0,inc:0,sack:0,int:0});
      d.n++;
      if(s.oc===0)d.comp++; else if(s.oc===1)d.inc++; else if(s.oc===2)d.sack++; else if(s.oc===3)d.int++;
    }
  }
  return D;
}
const A=tally('pools'),B=tally('glm');
console.log('pass-play class mix by pre-snap down | 65673a00 | '+N+' games');
console.log('down   n(pools)  n(glm)   comp%           inc%            sack%           int%');
for(const d of Object.keys(A).sort((a,b)=>a-b)){
  const a=A[d],b=B[d]; if(!b) continue;
  const f=(x,n)=>(x/n*100).toFixed(3);
  console.log(('down '+d).padEnd(7), String(a.n).padStart(8), String(b.n).padStart(8),
    (f(a.comp,a.n)+' -> '+f(b.comp,b.n)).padEnd(16),
    (f(a.inc,a.n)+' -> '+f(b.inc,b.n)).padEnd(16),
    (f(a.sack,a.n)+' -> '+f(b.sack,b.n)).padEnd(16),
    (f(a.int,a.n)+' -> '+f(b.int,b.n)));
}
