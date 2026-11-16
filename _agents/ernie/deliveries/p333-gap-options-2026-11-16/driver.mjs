import { lineupFor } from './engineRoot/sports/nfl/engine/lineup.ts';
import { tableValues } from './engineRoot/sports/nfl/engine/valueprovider.ts';
import { WEIGHT, fieldSlots } from './engineRoot/sports/nfl/engine/slots.ts';
import { buildPool } from './engineRoot/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const rd = (p) => fs.readFileSync(p, 'utf8');
const players = buildPool(rd('/tmp/p333/colors/src/data/madden27-ratings.csv'), rd('/tmp/p333/colors/src/data/free-agents-old-ratings.csv'), rd('/tmp/p333/colors/src/data/player-ids.csv'));
const teams = [...new Set(players.filter((p) => !p.freeAgent).map((p) => p.team))].sort();
const V = tableValues(WEIGHT);
const W = Object.fromEntries(fieldSlots('4-3').map((s) => [s.slot, s.weight]));
const tally = {};
for (const base of ['4-3', '3-4']) {
  const spots = {};
  let standins = 0, spotsTotal = 0, em = 0;
  for (const t of teams) {
    const roster = players.filter((p) => p.team === t);
    const l = lineupFor(roster, base, V);
    em += l.emergencyFills;
    for (const p of l.placements) {
      spotsTotal++;
      if (p.player && p.penalty > 0) {
        standins++;
        const k = `${p.player.role}>${p.slot.slot}(dest ${p.slot.dest},row ${p.slot.row})`;
        spots[k] = (spots[k] || 0) + 1;
      }
    }
  }
  tally[base] = { standins, spotsTotal, em };
  console.log(`\n== ${base}: ${standins} stand-ins / ${spotsTotal} spots, ${em} emergency fills`);
  Object.entries(spots).sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([k, n]) => console.log(`   ${n}x ${k}`));
}
