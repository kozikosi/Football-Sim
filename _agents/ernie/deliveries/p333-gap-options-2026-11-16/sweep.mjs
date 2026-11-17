import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const SRC = '/tmp/p333/colors/src', ROOT = '/tmp/p333';
const RULES = [['RB','FB'],['TE','FB'],['OT','OG'],['OT','FB'],['OG','FB'],['C','FB'],['DT','FB'],
  ['EDGE','DT'],['EDGE','OLB'],['EDGE','FB'],['ILB','OLB'],['ILB','FB'],['OLB','FB'],
  ['SS','NICKEL'],['SS','DIME'],['FS','NICKEL'],['FS','DIME'],
  ['CB','FS'],['CB','NICKEL'],['CB','DIME'],['CB','SS']];
const H = `
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
let s=0,f=0,flex=0,em=0;
for(const t of teams){const r=base.filter(p=>p.team===t);const a=lineupFor(r,'4-3',V).value,b=lineupFor(r,'3-4',V).value;s+=a-b;if(a<b)f++;
  for(const bb of ['4-3','3-4']){const l=lineupFor(r,bb,V);em+=l.emergencyFills;for(const p of l.placements)if(p.penalty>0)flex++;}}
console.log(JSON.stringify({gap:(l43.value-l43f.value)-(l34.value-l34f.value),bias:s/teams.length,fav34:f,flex,em}));
`;
const out = [];
for (const [role, dest] of RULES) {
  const dir = path.join(ROOT, 'sw');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.cpSync(SRC, dir, { recursive: true });
  const f = path.join(dir, 'sports/nfl/engine/flex.ts');
  let src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  const i = lines.findIndex((l) => l.trim().startsWith(role + ':'));
  if (i < 0) { out.push([`${role}>${dest}`, 'NOROLE']); continue; }
  const before = lines[i];
  lines[i] = before.replace(new RegExp(`\\b${dest}: 0\\b`), `${dest}: 2`);
  if (lines[i] === before) { out.push([`${role}>${dest}`, 'NO0']); continue; }
  fs.writeFileSync(f, lines.join('\n'));
  const h = path.join(ROOT, 'swh.mjs');
  fs.writeFileSync(h, H.replaceAll('ENG', dir).replaceAll('DATA', path.join(SRC, 'data')));
  try {
    const r = JSON.parse(execFileSync('node', ['--experimental-strip-types', h], { encoding: 'utf8', timeout: 120000 }).trim());
    out.push([`${role}>${dest}`, r]);
  } catch (e) { out.push([`${role}>${dest}`, 'ERR']); }
}
console.log('rule'.padEnd(14), 'gap'.padStart(6), 'bias'.padStart(8), 'fav34'.padStart(6), 'flex'.padStart(5));
for (const [k, v] of out) {
  if (typeof v === 'string') console.log(k.padEnd(14), v);
  else console.log(k.padEnd(14), String(v.gap).padStart(6), String(Math.round(v.bias)).padStart(8), String(v.fav34).padStart(6), String(v.flex).padStart(5));
}