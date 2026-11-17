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
const CN=['comp','inc','sack','int','run','punt','fg','kneel','spike'];
function tally(mode){
  const tab={}; // "oc:end" -> n
  let att4=0, att4ended=0;
  for(let g=0;g<N;g++){
    const k=gameKeyOf('glm-bar:'+g);
    const out=mode==='glm'?runGame(P,k,{passClass:M}):runGame(P,k);
    const ev=out.events;
    for(let i=0;i<ev.length;i++){
      const e=ev[i];
      if(e.kind!=='snap') continue;
      const s=e.payload;
      if(s.down!==4||s.call!==0) continue;
      att4++;
      const nx=ev[i+1];
      const ended = nx && nx.kind==='drive_end' && nx.payload.drive===s.drive;
      const r = ended ? nx.payload.result : 'continue';
      if(ended) att4ended++;
      const kk=CN[s.oc]+':'+r;
      tab[kk]=(tab[kk]||0)+1;
    }
  }
  return {tab,att4,att4ended};
}
const A=tally('pools'),B=tally('glm');
const pc=(x,y)=>((x/y)*100).toFixed(2)+'%';
console.log('every 4th-down pass play, and whether the drive ended on it | 65673a00 | '+N+' games');
console.log('4th-down pass plays/game   pools',(A.att4/N).toFixed(4),' glm',(B.att4/N).toFixed(4));
console.log('...that ended the drive    pools',(A.att4ended/N).toFixed(4),' glm',(B.att4ended/N).toFixed(4));
console.log('\noclass : drive-result          pools%    glm%     n_pools  n_glm');
const keys=[...new Set([...Object.keys(A.tab),...Object.keys(B.tab)])].sort();
for(const kk of keys){
  const a=A.tab[kk]||0,b=B.tab[kk]||0;
  if(a+b<200) continue;
  console.log('  '+kk.padEnd(16), pc(a,A.att4).padStart(8), pc(b,B.att4).padStart(9), String(a).padStart(8), String(b).padStart(8));
}
