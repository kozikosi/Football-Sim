import { lineupFor } from './engineRoot/sports/nfl/engine/lineup.ts';
import { tableValues } from './engineRoot/sports/nfl/engine/valueprovider.ts';
import { WEIGHT } from './engineRoot/sports/nfl/engine/slots.ts';
import { buildPool } from './engineRoot/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const rd = (p) => fs.readFileSync(p, 'utf8');
const base = buildPool(rd('/tmp/p333/colors/src/data/madden27-ratings.csv'), rd('/tmp/p333/colors/src/data/free-agents-old-ratings.csv'), rd('/tmp/p333/colors/src/data/player-ids.csv'));
const V = tableValues(WEIGHT);
const teams = [...new Set(base.filter((p) => !p.freeAgent).map((p) => p.team))].sort();
const avg = (xs) => xs.reduce((t, x) => t + x, 0) / (xs.length || 1);
function run(label, mut) {
  const pool = base.map((p) => (!p.freeAgent && mut(p) ? { ...p, ovr: mut(p) } : p));
  let sum = 0, fav = 0;
  for (const t of teams) {
    const r = pool.filter((p) => p.team === t);
    const d = lineupFor(r, '4-3', V).value - lineupFor(r, '3-4', V).value;
    sum += d; if (d < 0) fav++;
  }
  console.log(`${label.padEnd(46)} mean diff ${(sum / teams.length).toFixed(0).padStart(6)} | teams better in 3-4: ${fav}/32`);
}
run('as-is', () => undefined);
run('DT class capped at 70 (bad DT2 on the board)', (p) => (p.role === 'DT' && p.ovr > 70 ? 70 : undefined));
run('LB class raised to 85 (many good linebackers)', (p) => ((p.role === 'ILB' || p.role === 'OLB') && p.ovr < 85 ? 85 : undefined));
run('BOTH: DT<=70 and LB=85', (p) => {
  if (p.role === 'DT' && p.ovr > 70) return 70;
  if ((p.role === 'ILB' || p.role === 'OLB') && p.ovr < 85) return 85;
  return undefined;
});
