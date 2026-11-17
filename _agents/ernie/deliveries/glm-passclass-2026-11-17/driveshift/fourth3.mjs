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
function tally(mode){
  let att=0, inc=0, comp=0, sack=0, ints=0;
  const endAfter4={};
  const incEnd={}, compEnd={};
  for(let g=0;g<N;g++){
    const k=gameKeyOf('glm-bar:'+g);
    const out=mode==='glm'?runGame(P,k,{passClass:M}):runGame(P,k);
    const last=new Map(); const endAt=new Map();
    let cur=null;
    for(const ev of out.events){
      if(ev.kind==='drive_start'){cur=ev.payload.drive;}
      else if(ev.kind==='snap'){ last.set(ev.payload.drive,{down:ev.payload.down,call:ev.payload.call,oc:ev.payload.oc}); }
      else if(ev.kind==='drive_end'){ endAt.set(ev.payload.drive, ev.payload.result); }
    }
    for(const [dr,s] of last){
      if(s.down===4 && s.call===0){
        att++;
        if(s.oc===1) inc++; else if(s.oc===0) comp++; else if(s.oc===2) sack++; else if(s.oc===3) ints++;
        const r=endAt.get(dr)||'clock';
        if(s.oc===1){ incEnd[r]=(incEnd[r]||0)+1; }
        if(s.oc===0){ compEnd[r]=(compEnd[r]||0)+1; }
      }
    }
  }
  return {att,inc,comp,sack,ints,incEnd,compEnd};
}
const A=tally('pools'),B=tally('glm');
const pc=(x,y)=>((x/y)*100).toFixed(2)+'%';
console.log('4th-down PASS plays and what happened to the drive | 65673a00 | '+N+' games');
console.log('4th-down pass attempts/game  pools',(A.att/N).toFixed(4),' glm',(B.att/N).toFixed(4));
console.log('  comp',(A.comp/N).toFixed(4),'->',(B.comp/N).toFixed(4),'| inc',(A.inc/N).toFixed(4),'->',(B.inc/N).toFixed(4),'| sack',(A.sack/N).toFixed(4),'->',(B.sack/N).toFixed(4),'| int',(A.ints/N).toFixed(4),'->',(B.ints/N).toFixed(4));
console.log('\nafter an INCOMPLETE on 4th, drive result:');
const keys=[...new Set([...Object.keys(A.incEnd),...Object.keys(B.incEnd)])].sort();
for(const kk of keys) console.log('  '+kk.padEnd(8), pc(A.incEnd[kk]||0,A.inc).padStart(8), pc(B.incEnd[kk]||0,B.inc).padStart(9));
console.log('\nafter a COMPLETION on 4th, drive result:');
for(const kk of keys) console.log('  '+kk.padEnd(8), pc(A.compEnd[kk]||0,A.comp).padStart(8), pc(B.compEnd[kk]||0,B.comp).padStart(9));
