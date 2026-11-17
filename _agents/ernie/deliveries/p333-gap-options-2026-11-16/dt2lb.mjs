import { lineupFor } from './engineRoot/sports/nfl/engine/lineup.ts';
import { tableValues } from './engineRoot/sports/nfl/engine/valueprovider.ts';
import { WEIGHT } from './engineRoot/sports/nfl/engine/slots.ts';
import { buildPool } from './engineRoot/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const rd = (p) => fs.readFileSync(p, 'utf8');
const players = buildPool(rd('/tmp/p333/colors/src/data/madden27-ratings.csv'), rd('/tmp/p333/colors/src/data/free-agents-old-ratings.csv'), rd('/tmp/p333/colors/src/data/player-ids.csv'));
const teams = [...new Set(players.filter((p) => !p.freeAgent).map((p) => p.team))].sort();
const V = tableValues(WEIGHT);
const rows = [];
for (const t of teams) {
  const r = players.filter((p) => p.team === t);
  const dt = r.filter((p) => p.role === 'DT').map((p) => p.ovr).sort((a, b) => b - a);
  const ilb = r.filter((p) => p.role === 'ILB').map((p) => p.ovr).sort((a, b) => b - a);
  const olb = r.filter((p) => p.role === 'OLB').map((p) => p.ovr).sort((a, b) => b - a);
  const a = lineupFor(r, '4-3', V).value, b = lineupFor(r, '3-4', V).value;
  rows.push({
    team: t.replace(/^[A-Za-z ]*?(?=[A-Z][a-z]+(?: [A-Z][a-z]+)*$)/, ''),
    diff: a - b,
    dt2: dt[1] ?? dt[0] ?? 0,           // the second-best DT = the DT2 body
    dtBest: dt[0] ?? 0,
    lbTop: [...ilb.slice(0, 2), ...olb.slice(0, 2)].sort((x, y) => y - x),
    nILB: ilb.length, nOLB: olb.length, nDT: dt.length,
  });
}
const fav34 = rows.filter((r) => r.diff < 0).sort((x, y) => x.diff - y.diff);
console.log('=== teams better in 3-4 (diff < 0) ===');
for (const r of fav34) console.log(`  ${r.team.padEnd(14)} diff ${r.diff.toFixed(0).padStart(6)} | DT2 ${r.dt2} (best ${r.dtBest}, n=${r.nDT}) | LB top ${r.lbTop.slice(0,3).join(',')} (ILB ${r.nILB}, OLB ${r.nOLB})`);
const med = (xs) => xs.slice().sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const medDT = med(rows.map((r) => r.dt2)), medLB = med(rows.map((r) => (r.lbTop[0] + r.lbTop[1]) / 2));
console.log(`\nmedian DT2 ${medDT} | median top-2 LB ${medLB}`);
const weakDT = rows.filter((r) => r.dt2 <= medDT), strongLB = rows.filter((r) => (r.lbTop[0] + r.lbTop[1]) / 2 >= medLB);
const both = rows.filter((r) => r.dt2 <= medDT && (r.lbTop[0] + r.lbTop[1]) / 2 >= medLB);
const avg = (xs) => (xs.reduce((t, x) => t + x, 0) / (xs.length || 1));
console.log(`weak DT2 (n=${weakDT.length}): mean diff ${avg(weakDT.map((r) => r.diff)).toFixed(0)} | 3-4-favouring ${weakDT.filter((r) => r.diff < 0).length}`);
console.log(`strong LB (n=${strongLB.length}): mean diff ${avg(strongLB.map((r) => r.diff)).toFixed(0)} | 3-4-favouring ${strongLB.filter((r) => r.diff < 0).length}`);
console.log(`BOTH weak DT2 + strong LB (n=${both.length}): mean diff ${avg(both.map((r) => r.diff)).toFixed(0)} | 3-4-favouring ${both.filter((r) => r.diff < 0).length}`);
for (const r of both.sort((x, y) => x.diff - y.diff)) console.log(`   ${r.team.padEnd(14)} diff ${r.diff.toFixed(0).padStart(6)} | DT2 ${r.dt2} | LB ${r.lbTop.slice(0,2).join(',')}`);
