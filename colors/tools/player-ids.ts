// Usage (from colors/): node --experimental-strip-types tools/player-ids.ts sync|check
//   sync  updates ../data/player-ids.csv from the two rating files (new players get new pids; a player who changed team keeps his pid) and prints what changed
//   check exits 1 if the crosswalk does not cover the current data exactly (no missing rows, no duplicates)
import fs from 'node:fs';
import { parseCsv } from '../src/engine/players.ts';
import { formatIds, parseIds, syncIds } from '../src/engine/playerids.ts';
const f = (n: string) => new URL('../../data/' + n, import.meta.url);
const players = [...parseCsv(fs.readFileSync(f('madden27-ratings.csv'), 'utf8'), false), ...parseCsv(fs.readFileSync(f('free-agents-old-ratings.csv'), 'utf8'), true)];
const cur = players.map((p) => ({ name: p.name, pos: p.pos, team: p.team }));
const have = fs.existsSync(f('player-ids.csv'));
const existing = have ? parseIds(fs.readFileSync(f('player-ids.csv'), 'utf8')) : [];
const r = syncIds(existing, cur);
const cmd = process.argv[2];
if (cmd === 'sync') {
  fs.writeFileSync(f('player-ids.csv'), formatIds(r.rows));
  console.log(`player-ids.csv: ${r.rows.length} rows; added ${r.added.length}, moved team ${r.moved.length}, gone ${r.gone.length}`);
  for (const m of r.moved) console.log(`  moved ${m.pid}: ${m.from} -> ${m.to}`);
} else if (cmd === 'check') {
  const bad = !have || r.added.length > 0 || r.moved.length > 0;
  console.log(bad ? `STALE: ${r.added.length} players without a pid, ${r.moved.length} team changes. Run sync.` : `OK: ${cur.length} players covered, ${r.gone.length} retired rows kept`);
  process.exit(bad ? 1 : 0);
} else { console.error('usage: player-ids.ts sync|check'); process.exit(2); }
