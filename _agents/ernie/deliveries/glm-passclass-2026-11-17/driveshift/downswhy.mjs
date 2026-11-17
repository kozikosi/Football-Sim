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
const CALL=['pass','run','punt','fg','kneel','spike'];
const OC=['comp','inc','sack','int','run','punt','fg','kneel','spike'];
function tally(mode){
  const byCall={}, byOc={}, byDown={}; let snaps=0, downsEnds=0;
  const inc=(o,k)=>{o[k]=(o[k]||0)+1;};
  for(let g=0;g<N;g++){
    const k=gameKeyOf('glm-bar:'+g);
    const out=mode==='glm'?runGame(P,k,{passClass:M}):runGame(P,k);
    const last=new Map(); let cur=null;
    for(const ev of out.events){
      if(ev.kind==='drive_start'){cur=ev.payload.drive;}
      else if(ev.kind==='snap'){ const s=ev.payload; last.set(s.drive,{call:s.call,oc:s.oc,down:s.down,ytg:s.ytg,ydl:s.ydl}); snaps++; }
      else if(ev.kind==='drive_end'){
        const s=last.get(ev.payload.drive);
        if(ev.payload.result==='downs'){ downsEnds++;
          inc(byCall,CALL[s.call]); inc(byOc,OC[s.oc]); inc(byDown,String(s.down));
        }
      }
    }
  }
  return {byCall,byOc,byDown,snaps,downsEnds};
}
const A=tally('pools'),B=tally('glm');
const pc=(x,y)=>((x/y)*100).toFixed(3)+'%';
console.log('downs-ending snaps by type | 65673a00 | '+N+' games');
console.log('snaps total: pools',A.snaps,' glm',B.snaps);
console.log('downs-ending snaps: pools',A.downsEnds,' glm',B.downsEnds);
console.log('\nby call          pools        glm      diff');
for(const c of CALL){const a=A.byCall[c]||0,b=B.byCall[c]||0;if(!a&&!b)continue;
  console.log('  '+c.padEnd(8), pc(a,A.downsEnds).padStart(8), pc(b,B.downsEnds).padStart(9), String(b-a).padStart(7));}
console.log('\nby outcome class  pools        glm      diff');
for(const c of OC){const a=A.byOc[c]||0,b=B.byOc[c]||0;if(!a&&!b)continue;
  console.log('  '+c.padEnd(8), pc(a,A.downsEnds).padStart(8), pc(b,B.downsEnds).padStart(9), String(b-a).padStart(7));}
console.log('\nby pre-snap down  pools        glm      diff');
for(const d of Object.keys(A.byDown).concat(Object.keys(B.byDown)).filter((v,i,s)=>s.indexOf(v)===i).sort()){
  const a=A.byDown[d]||0,b=B.byDown[d]||0;
  console.log('  down '+d.padEnd(3), pc(a,A.downsEnds).padStart(8), pc(b,B.downsEnds).padStart(9), String(b-a).padStart(7));}
