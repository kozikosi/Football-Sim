import { buildPool } from './engineRoot/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const rd = (p) => fs.readFileSync(p, 'utf8');
const players = buildPool(rd('/tmp/p333/colors/src/data/madden27-ratings.csv'), rd('/tmp/p333/colors/src/data/free-agents-old-ratings.csv'), rd('/tmp/p333/colors/src/data/player-ids.csv'));
const teams = [...new Set(players.filter((p) => !p.freeAgent).map((p) => p.team))].sort();
const dist = {};
let ge2 = 0;
for (const t of teams) {
  const r = players.filter((p) => p.team === t);
  const ilb = r.filter((p) => p.role === 'ILB');
  const olb = r.filter((p) => p.role === 'OLB');
  const edge = r.filter((p) => p.role === 'EDGE');
  dist[ilb.length] = (dist[ilb.length] || 0) + 1;
  if (ilb.length >= 2) ge2++;
  if (t === 'Kansas City Chiefs' || t === 'Seattle Seahawks')
    console.log(t, '| ILB', ilb.length, ilb.map((p) => p.ovr).join(','), '| OLB', olb.length, olb.map((p) => p.ovr).join(','), '| EDGE', edge.length, edge.map((p) => p.ovr).join(','));
}
console.log('ILB count distribution:', JSON.stringify(dist), '| teams with >=2 ILB:', ge2, '/', teams.length);
// for the worst team (Seattle +3200 in 4-3), who plays ILB2 in 3-4?
