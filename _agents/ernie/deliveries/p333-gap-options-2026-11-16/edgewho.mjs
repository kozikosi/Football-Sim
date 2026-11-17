import { lineupFor } from './ENGINE/sports/nfl/engine/lineup.ts';
import { tableValues } from './ENGINE/sports/nfl/engine/valueprovider.ts';
import { WEIGHT } from './ENGINE/sports/nfl/engine/slots.ts';
import { buildPool } from './ENGINE/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const base = buildPool(fs.readFileSync('DATA/madden27-ratings.csv','utf8'), fs.readFileSync('DATA/free-agents-old-ratings.csv','utf8'), fs.readFileSync('DATA/player-ids.csv','utf8'));
const teams = [...new Set(base.filter(p=>!p.freeAgent).map(p=>p.team))].sort();
const V = tableValues(WEIGHT);
for (const base_ of ['4-3','3-4']) {
  let edgeAtILB = 0, dtAtDE = 0;
  const ex = [];
  for (const t of teams) {
    const l = lineupFor(base.filter(p=>p.team===t), base_, V);
    for (const p of l.placements) {
      if (!p.player) continue;
      const destIsILB = ['MIKE','WILL','DT2'].includes(p.slot.slot) && p.slot.dest === 'ILB';
      if (destIsILB && p.player.role === 'EDGE') { edgeAtILB++; if (ex.length < 3) ex.push(`${t.split(' ').pop()}:${p.player.name}@${p.slot.slot}`); }
      if (p.slot.dest === 'DT' && p.player.role === 'EDGE') dtAtDE++;
    }
  }
  console.log(`${base_}: EDGE playing an ILB spot = ${edgeAtILB} | EDGE playing a DT spot = ${dtAtDE}  ${ex.join(', ')}`);
}
