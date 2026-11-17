import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/colors/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/colors/src/core/keyedrng.ts';
import { loadPools } from '/tmp/glmrec2/colors/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec2/colors/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/colors/src/sports/nfl/sim/game.ts';
const load = (n) => JSON.parse(fs.readFileSync('/tmp/glm/data/packs/' + n + '.json', 'utf8'));
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const N = Number(process.argv[2] || 12000);
function tally(mode){
  let downs=0, lastIs4=0, lastDownHist={}, go4=0, go4downs=0, snapsPerDriveSum=0, drives=0, d4perDrive={};
  for(let g=0;g<N;g++){
    const k=gameKeyOf('glm-bar:'+g);
    const out=mode==='glm'?runGame(P,k,{passClass:M}):runGame(P,k);
    const dr=new Map();
    for(const ev of out.events){
      if(ev.kind==='drive_start') dr.set(ev.payload.drive,{snaps:[],result:null});
      else if(ev.kind==='snap'){const d=dr.get(ev.payload.drive); if(d)d.snaps.push(ev.payload);}
      else if(ev.kind==='drive_end'){const d=dr.get(ev.payload.drive); if(d)d.result=ev.payload.result;}
    }
    for(const [,d] of dr){
      drives++; snapsPerDriveSum+=d.snaps.length;
      let n4=0; for(const s of d.snaps) if(s.down===4) n4++;
      d4perDrive[n4]=(d4perDrive[n4]||0)+1;
      if((d.result||'clock')==='downs'){
        downs++;
        const last=d.snaps[d.snaps.length-1];
        if(last && last.down===4){ lastIs4++; go4++; }
        else { const kk=last?String(last.down):'none'; lastDownHist[kk]=(lastDownHist[kk]||0)+1; }
      }
    }
  }
  return {downs,lastIs4,lastDownHist,drives,snapsPerDriveSum,d4perDrive,go4};
}
const A=tally('pools'),B=tally('glm');
const p=(x,y)=>((x/y)*100).toFixed(2)+'%';
console.log('4th-down reconciliation | 65673a00 | node '+process.version+' | '+N+' games\n');
for(const [nm,X] of [['pools',A],['glm',B]]){
  console.log(nm, 'drives/game', (X.drives/N).toFixed(3), '| snaps/drive', (X.snapsPerDriveSum/X.drives).toFixed(4), '| downs/game', (X.downs/N).toFixed(4), '| last snap down=4', (X.lastIs4/N).toFixed(4), '| last snap other', JSON.stringify(Object.fromEntries(Object.entries(X.lastDownHist).map(([k,v])=>[k,(v/N).toFixed(4)]))));
  console.log('   #4th-downs-per-drive hist', JSON.stringify(Object.fromEntries(Object.entries(X.d4perDrive).map(([k,v])=>[k,(v/N).toFixed(4)]))));
}
console.log('\nP(drive ends on 4th-down go | downs)  pools', p(A.lastIs4,A.downs), ' glm', p(B.lastIs4,B.downs));
console.log('4th-down go attempts / game  pools', (A.go4/N).toFixed(4), ' glm', (B.go4/N).toFixed(4));
