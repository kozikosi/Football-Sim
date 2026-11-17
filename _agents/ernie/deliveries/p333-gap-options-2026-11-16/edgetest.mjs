import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const SRC = '/tmp/p333/colors/src', ROOT = '/tmp/p333';
const VARIANTS = {
  'EDGE->ILB 6 (today)': (s) => s,
  'EDGE->ILB 4': (s) => s.replace('ILB: 6, C: 6, OG: 6, OT: 6, SS: 12, RB: 6,', 'ILB: 4, C: 6, OG: 6, OT: 6, SS: 12, RB: 6,'),
  'EDGE->ILB 2': (s) => s.replace('ILB: 6, C: 6, OG: 6, OT: 6, SS: 12, RB: 6,', 'ILB: 2, C: 6, OG: 6, OT: 6, SS: 12, RB: 6,'),
  'EDGE->ILB 0': (s) => s.replace('ILB: 6, C: 6, OG: 6, OT: 6, SS: 12, RB: 6,', 'ILB: 0, C: 6, OG: 6, OT: 6, SS: 12, RB: 6,'),
};
const H = `
import { fieldSlots, SLOTS, WEIGHT } from 'ENG/sports/nfl/engine/slots.ts';
import { lineupFor } from 'ENG/sports/nfl/engine/lineup.ts';
import { tableValues } from 'ENG/sports/nfl/engine/valueprovider.ts';
import { buildPool } from 'ENG/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const ROLE_OF_DEST = { NICKEL:'CB', DIME:'CB', DL5:'DT' };
const mk=(r,o,i)=>({id:'p'+i,name:'P'+i,pos:r,role:r,team:'T',ovr:o,spd:80,str:80,freeAgent:false});
const rosterFor=(b,o)=>fieldSlots(b).map((s,i)=>mk(ROLE_OF_DEST[s.dest]||s.dest,o,i));
const V=tableValues(WEIGHT);
const l43=lineupFor(rosterFor('4-3',80),'4-3',V), l43f=lineupFor(rosterFor('4-3',80),'3-4',V);
const l34=lineupFor(rosterFor('3-4',80),'3-4',V), l34f=lineupFor(rosterFor('3-4',80),'4-3',V);
const loss43=l43.value-l43f.value, loss34=l34.value-l34f.value;
const base=buildPool(fs.readFileSync('DATA/madden27-ratings.csv','utf8'),fs.readFileSync('DATA/free-agents-old-ratings.csv','utf8'),fs.readFileSync('DATA/player-ids.csv','utf8'));
const teams=[...new Set(base.filter(p=>!p.freeAgent).map(p=>p.team))].sort();
const avg=(xs)=>xs.reduce((t,x)=>t+x,0)/(xs.length||1);
function scen(mut){const pool=base.map(p=>(!p.freeAgent&&mut(p)?{...p,ovr:mut(p)}:p));let s=0,f=0;
  for(const t of teams){const r=pool.filter(p=>p.team===t);const d=lineupFor(r,'4-3',V).value-lineupFor(r,'3-4',V).value;s+=d;if(d<0)f++;}
  return [s/teams.length,f];}
let sum=0,fav=0,flexed=0,spots=0,em=0;
for(const t of teams){const r=base.filter(p=>p.team===t);const a=lineupFor(r,'4-3',V).value,b=lineupFor(r,'3-4',V).value;sum+=a-b;if(a<b)fav++;
  for(const bb of ['4-3','3-4']){const l=lineupFor(r,bb,V);em+=l.emergencyFills;for(const p of l.placements){spots++;if(p.penalty>0)flexed++;}}}
const sc=(m)=>scen(m);
const dtBad=sc(p=>p.role==='DT'&&p.ovr>70?70:undefined);
const lbGood=sc(p=>(p.role==='ILB'||p.role==='OLB')&&p.ovr<85?85:undefined);
const both=sc(p=>{if(p.role==='DT'&&p.ovr>70)return 70;if((p.role==='ILB'||p.role==='OLB')&&p.ovr<85)return 85;});
console.log(JSON.stringify({loss43,loss34,gap:loss43-loss34,standIns43:l43f.placements.filter(p=>p.player&&p.penalty>0).map(p=>p.player.role+'>'+p.slot.slot+'@'+p.penalty).join(', ')||'-',standIns34:l34f.placements.filter(p=>p.player&&p.penalty>0).map(p=>p.player.role+'>'+p.slot.slot+'@'+p.penalty).join(', ')||'-',realMean:sum/teams.length,built34:fav,flexed,spots,em,dtBadMean:dtBad[0],dtBadFav:dtBad[1],lbGoodMean:lbGood[0],lbGoodFav:lbGood[1],bothMean:both[0],bothFav:both[1]}));
`;
for (const [name, patch] of Object.entries(VARIANTS)) {
  const dir = path.join(ROOT, 'ev-' + name.replace(/[^a-z0-9]/gi, '_'));
  fs.rmSync(dir, { recursive: true, force: true });
  fs.cpSync(SRC, dir, { recursive: true });
  const f = path.join(dir, 'sports/nfl/engine/flex.ts');
  const before = fs.readFileSync(f, 'utf8'), after = patch(before);
  if (before === after) { console.log(name, '=> PATCH FAILED'); continue; }
  fs.writeFileSync(f, after);
  const h = path.join(ROOT, 'evh.mjs');
  fs.writeFileSync(h, H.replaceAll('ENG', dir).replaceAll('DATA', path.join(SRC, 'data')));
  console.log(name);
  try { console.log('  ' + execFileSync('node', ['--experimental-strip-types', h], { encoding: 'utf8', timeout: 300000 }).trim()); }
  catch (e) { console.log('  ERROR ' + String(e.stderr || e.message).slice(0, 200)); }
}
