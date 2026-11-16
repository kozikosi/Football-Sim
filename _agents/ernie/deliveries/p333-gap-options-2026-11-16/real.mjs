import { lineupFor } from './engineRoot/sports/nfl/engine/lineup.ts';
import { tableValues, DEFAULT_VALUES, WINS_PER_UNIT } from './engineRoot/sports/nfl/engine/valueprovider.ts';
import { WEIGHT } from './engineRoot/sports/nfl/engine/slots.ts';
import { buildPool } from './engineRoot/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const rd = (p) => fs.readFileSync(p, 'utf8');
const players = buildPool(rd('/tmp/p333/colors/src/data/madden27-ratings.csv'), rd('/tmp/p333/colors/src/data/free-agents-old-ratings.csv'), rd('/tmp/p333/colors/src/data/player-ids.csv'));
const teams = [...new Set(players.filter((p) => !p.freeAgent).map((p) => p.team))].sort();
const V = tableValues(WEIGHT);
const rows = [];
for (const t of teams) {
  const roster = players.filter((p) => p.team === t);
  const a = lineupFor(roster, '4-3', V).value;   // value in 4-3
  const b = lineupFor(roster, '3-4', V).value;   // value in 3-4
  rows.push({ team: t, v43: a, v34: b, diff: a - b });   // + = better in 4-3
}
const built43 = rows.filter((r) => r.diff > 0);   // "built for 4-3": worth more there
const built34 = rows.filter((r) => r.diff < 0);
const loss = (r) => Math.abs(r.diff);
const avg = (xs) => xs.reduce((t, x) => t + x, 0) / (xs.length || 1);
console.log('teams:', rows.length, '| better in 4-3:', built43.length, '| better in 3-4:', built34.length);
console.log('mean loss when forced, 4-3-built teams:', avg(built43.map(loss)).toFixed(1), 'table units =', (avg(built43.map(loss)) * WINS_PER_UNIT).toFixed(4), 'wins');
console.log('mean loss when forced, 3-4-built teams:', avg(built34.map(loss)).toFixed(1), 'table units =', (avg(built34.map(loss)) * WINS_PER_UNIT).toFixed(4), 'wins');
console.log('GAP (mean4-3 - mean3-4):', (avg(built43.map(loss)) - avg(built34.map(loss))).toFixed(1), 'table units =', ((avg(built43.map(loss)) - avg(built34.map(loss))) * WINS_PER_UNIT).toFixed(4), 'wins');
console.log('worst 5 diffs:', rows.slice().sort((x, y) => x.diff - y.diff).slice(0, 5).map((r) => `${r.team.split(' ').pop()} ${r.diff.toFixed(0)}`).join(', '));
console.log('best 5 diffs:', rows.slice().sort((x, y) => y.diff - x.diff).slice(0, 5).map((r) => `${r.team.split(' ').pop()} +${r.diff.toFixed(0)}`).join(', '));
