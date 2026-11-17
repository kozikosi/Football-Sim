import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const SRC='/tmp/p333/colors/src', ROOT='/tmp/p333';
const H=`
import { fieldSlots, SLOTS, WEIGHT } from 'ENG/sports/nfl/engine/slots.ts';
import { lineupFor } from 'ENG/sports/nfl/engine/lineup.ts';
import { tableValues } from 'ENG/sports/nfl/engine/valueprovider.ts';
import { buildPool } from 'ENG/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const RD={NICKEL:'CB',DIME:'CB',DL5:'DT'};
const mk=(r,o,i)=>({id:'p'+i,name:'P'+i,pos:r,role:r,team:'T',ovr:o,spd:80,str:80,freeAgent:false});
const rosterFor=(b,o)=>fieldSlots(b).map((s,i)=>mk(RD[s.dest]||s.dest,o,i));
const V=tableValues(WEIGHT);
const l43=lineupFor(rosterFor('4-3',80),'4-3',V), l43f=lineupFor(rosterFor('4-3',80),'3-4',V);
const l34=lineupFor(rosterFor('3-4',80),'3-4',V), l34f=lineupFor(rosterFor('3-4',80),'4-3',V);
const base=buildPool(fs.readFileSync('DATA/madden27-ratings.csv','utf8'),fs.readFileSync('DATA/free-agents-old-ratings.csv','utf8'),fs.readFileSync('DATA/player-ids.csv','utf8'));
const teams=[...new Set(base.filter(p=>!p.freeAgent).map(p=>p.team))].sort();
let s=0,f=0,flex=0;
for(const t of teams){const r=base.filter(p=>p.team===t);const a=lineupFor(r,'4-3',V).value,b=lineupFor(r,'3-4',V).value;s+=a-b;if(a<b)f++;
  for(const bb of ['4-3','3-4'])for(const p of lineupFor(r,bb,V).placements)if(p.penalty>0)flex++;}
console.log(JSON.stringify({gap:(l43.value-l43f.value)-(l34.value-l34f.value),bias:Math.round(s/teams.length),fav34:f,flex}));
`;
const COMBOS = {
  'C1 EDGE>DT+ILB>OLB+SS>NICKEL all 2': { free: [['EDGE','DT'],['ILB','OLB'],['SS','NICKEL']] },
  'C2 EDGE>ILB 0 + EDGE>DT 2': { free: [['EDGE','DT']], zero: [['EDGE','ILB',0]] },
  'C3 all six bias-improvers at 2': { free: [['EDGE','DT'],['ILB','OLB'],['SS','NICKEL'],['CB','FS'],['FS','NICKEL'],['RB','FB']] },
  'C4 EDGE>ILB 0 alone (reference)': { zero: [['EDGE','ILB',0]] },
};
for (const [name, c] of Object.entries(COMBOS)) {
  const dir = path.join(ROOT, 'cb');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.cpSync(SRC, dir, { recursive: true });
  const f = path.join(dir, 'sports/nfl/engine/flex.ts');
  let lines = fs.readFileSync(f, 'utf8').split('\n');
  const setRule = (role, dest, val) => {
    const i = lines.findIndex((l) => l.trim().startsWith(role + ':'));
    if (i < 0) return false;
    const re = new RegExp(`(^|[{,\\s])${dest}: \\d+`);
    if (!re.test(lines[i])) return false;
    lines[i] = lines[i].replace(re, `$1${dest}: ${val}`);
    return true;
  };
  const ok = [...(c.free || []).map(([r, d]) => setRule(r, d, 2)), ...(c.zero || []).map(([r, d, v]) => setRule(r, d, v))].every(Boolean);
  if (!ok) { console.log(name, '=> PATCH FAILED'); continue; }
  fs.writeFileSync(f, lines.join('\n'));
  const h = path.join(ROOT, 'cbh.mjs');
  fs.writeFileSync(h, H.replaceAll('ENG', dir).replaceAll('DATA', path.join(SRC, 'data')));
  try { console.log(name.padEnd(36), execFileSync('node', ['--experimental-strip-types', h], { encoding: 'utf8', timeout: 180000 }).trim()); }
  catch (e) { console.log(name, 'ERR', String(e.stderr || '').slice(0, 150)); }
}