import { lineupFor } from '/tmp/tip/colors/src/sports/nfl/engine/lineup.ts';
import { tableValues } from '/tmp/tip/colors/src/sports/nfl/engine/valueprovider.ts';
import { WEIGHT } from '/tmp/tip/colors/src/sports/nfl/engine/slots.ts';
import { buildPool } from '/tmp/tip/colors/src/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const D='/tmp/tip/data/nfl/';
const pool = buildPool(fs.readFileSync(D+'madden27-ratings.csv','utf8'), fs.readFileSync(D+'free-agents-old-ratings.csv','utf8'), fs.readFileSync(D+'player-ids.csv','utf8'));
const teams = [...new Set(pool.filter(p=>!p.freeAgent).map(p=>p.team))].sort();
const V = tableValues(WEIGHT);
const rows = [];
for (const t of teams) {
  const r = pool.filter(p=>p.team===t);
  // DT2 OVR: the second-highest OVR among the team's DTs (role DT). Fewer than two DTs -> the best one.
  const dt = r.filter(p=>p.role==='DT').map(p=>p.ovr).sort((a,b)=>b-a);
  const dt2 = dt.length >= 2 ? dt[1] : (dt[0] ?? 0);
  // LB quality: mean of the top two OVRs among ILB and OLB roles.
  const lb = r.filter(p=>p.role==='ILB'||p.role==='OLB').map(p=>p.ovr).sort((a,b)=>b-a);
  const lbq = lb.length ? (lb[0] + (lb[1] ?? lb[0])) / 2 : 0;
  const v43 = lineupFor(r,'4-3',V).value, v34 = lineupFor(r,'3-4',V).value;
  rows.push({team:t, dt2, lbq, adv:v34-v43, nDT:dt.length, nLB:lb.length});
}
rows.sort((a,b)=>a.dt2-b.dt2);
console.log('team'.padEnd(24),'DT2','  LBq','   adv(3-4 minus 4-3)',' nDT','nLB');
for (const r of rows) console.log(r.team.padEnd(24), String(r.dt2).padStart(3), String(r.lbq).padStart(5), String(Math.round(r.adv)).padStart(10), String(r.nDT).padStart(4), String(r.nLB).padStart(4));
const avg=(xs)=>xs.reduce((t,x)=>t+x,0)/xs.length;
const fav34 = rows.filter(r=>r.adv<0).length, tie = rows.filter(r=>r.adv===0).length;
console.log('\nmean 3-4 minus 4-3:', avg(rows.map(r=>r.adv)).toFixed(2), '| fav 3-4:', fav34, '| fav 4-3:', rows.length-fav34-tie, '| tie:', tie);
// correlation
const corr=(a,b)=>{const ma=avg(a),mb=avg(b);let n=0,da=0,db=0;for(let i=0;i<a.length;i++){n+=(a[i]-ma)*(b[i]-mb);da+=(a[i]-ma)**2;db+=(b[i]-mb)**2;}return n/Math.sqrt(da*db);};
console.log('corr(DT2 OVR, advantage) =', corr(rows.map(r=>r.dt2), rows.map(r=>r.adv)).toFixed(3));
console.log('corr(LB quality, advantage) =', corr(rows.map(r=>r.lbq), rows.map(r=>r.adv)).toFixed(3));
// threshold scan: best DT2 split
let best=null;
for (let t=40;t<=99;t++){const lo=rows.filter(r=>r.dt2<=t), hi=rows.filter(r=>r.dt2>t);if(lo.length<4||hi.length<4)continue;const ml=avg(lo.map(r=>r.adv)), mh=avg(hi.map(r=>r.adv));const score=ml-mh;if(!best||score<best.score)best={t,ml,mh,score,nlo:lo.length,nhi:hi.length};}
console.log('best DT2 split (max separation):', JSON.stringify(best));
const known = rows.filter(r=>/Washington|Kansas City|Carolina/.test(r.team));
console.log('\nknown check:', known.map(r=>`${r.team} DT2 ${r.dt2} LBq ${r.lbq} adv ${Math.round(r.adv)}`).join(' | '));
