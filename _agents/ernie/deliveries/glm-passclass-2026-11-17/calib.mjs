// Is the GLM's sack under-prediction a calibration gap in the class model?
// Compare the model's OWN predicted sack probability against what it realises, and against the pools rate.
import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/colors/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/colors/src/core/keyedrng.ts';
import { loadPools } from '/tmp/glmrec2/colors/src/sports/nfl/sim/pools.ts';
import { loadPassClass, passClassProbs, passFeatures } from '/tmp/glmrec2/colors/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/colors/src/sports/nfl/sim/game.ts';
const load=(n)=>JSON.parse(fs.readFileSync('/tmp/glm/data/packs/'+n+'.json','utf8'));
const P=loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M=loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const N=Number(process.argv[2]||12000);
let predSum=0, glmSacks=0, glmAtt=0, poolSacks=0, poolAtt=0;
let glmWins=0, ties=0, poolWins=0, maxAbs=0;
const diffs=[];
for(let g=0;g<N;g++){
  const k=gameKeyOf('glm-bar:'+g);
  const a=runGame(P,k), b=runGame(P,k,{passClass:M});
  let ps=0,gs=0,pa=0,ga=0;
  for(const e of a.events) if(e.kind==='snap'&&e.payload.call===0){pa++; if(e.payload.sack)ps++;}
  for(const e of b.events) if(e.kind==='snap'&&e.payload.call===0){ga++; if(e.payload.sack)gs++;}
  // the GLM's own predicted sack probability on the plays it actually faced
  for(const e of b.events) if(e.kind==='snap'&&e.payload.call===0){
    const p=e.payload;
    const pr=passClassProbs(M, passFeatures(p.down,p.ytg,p.ydl,0,p.qtr,p.hs));
    predSum+=pr[2];
  }
  poolSacks+=ps; poolAtt+=pa; glmSacks+=gs; glmAtt+=ga;
  if(gs>ps) glmWins++; else if(gs<ps) poolWins++; else ties++;
  const d=(gs/ga-ps/pa); diffs.push(d); if(Math.abs(d)>maxAbs)maxAbs=Math.abs(d);
}
const meanPred=predSum/glmAtt;
console.log('GLM class-model calibration on the sacks class | 65673a00 | '+N+' paired games');
console.log('  GLM predicted sack probability (mean over the pass plays it faced): '+(meanPred*100).toFixed(4)+'%');
console.log('  GLM realised sack rate:                                          '+(glmSacks/glmAtt*100).toFixed(4)+'%');
console.log('  pools realised sack rate:                                        '+(poolSacks/poolAtt*100).toFixed(4)+'%');
console.log('  calibration gap (predicted - realised):                         '+((meanPred-glmSacks/glmAtt)*100).toFixed(4)+' points');
console.log('  model vs pools (predicted - pools):                             '+((meanPred-poolSacks/poolAtt)*100).toFixed(4)+' points  <-- the whole shift');
console.log('\nper-game sign of (glm rate - pools rate):');
console.log('  games where GLM > pools: '+glmWins+'   equal: '+ties+'   GLM < pools: '+poolWins);
console.log('  share of games with the GLM below the pools node: '+(poolWins/N*100).toFixed(1)+'%');
console.log('  mean per-game difference: '+(diffs.reduce((s,x)=>s+x,0)/N*100).toFixed(4)+' points, max |diff| '+(maxAbs*100).toFixed(2));
