#!/usr/bin/env node
// export-current-pool.mjs — export a build's OWN player pool in the platform record schema.
//
// MiniMax · 20 Oct 2026. Dependency-free plain Node (>= 18). Read-only on the build.
//
//   node export-current-pool.mjs "<build.html>" --out "<pool.json>" [--sport nfl] [--competition nfl]
//
// Why this exists: the platform needs one *validated* pool file that nobody had to invent, so the
// schema, the validator and the all-time workflow can be exercised on real data. Every number in
// the output comes from the build's own PLAYERS array — nothing is authored here.
//
// The export is a conversion, not a rating: ovr and the six attributes are copied verbatim, the
// position code becomes the record's position AND its slot family (via the build's SLOT_FAMILY),
// and provenance records where the numbers came from (source, source version, source date, batch).

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const argv = process.argv.slice(2);
const flags = {}; const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { const k = argv[i].slice(2); const n = argv[i + 1]; flags[k] = (n && !n.startsWith('--')) ? argv[++i] : true; }
  else positional.push(argv[i]);
}
const build = positional[0];
const out = flags.out || 'current-pool.json';
if (!build || !fs.existsSync(build)) { console.error('usage: export-current-pool.mjs <build.html> --out <pool.json>'); process.exit(4); }

const html = fs.readFileSync(build, 'utf8');
const marker = 'const PLAYERS = ';
const s = html.indexOf(marker);
if (s < 0) { console.error('no PLAYERS array in ' + build); process.exit(4); }
const start = s + marker.length;
const end = html.indexOf('];', start) + 1;
const players = JSON.parse(html.slice(start, end));

// SLOT_FAMILY: slot -> family (the build's own map, v20:906)
const famBlock = (html.match(/const SLOT_FAMILY = \{[\s\S]*?\};/) || [''])[0];
const FAMILIES = Object.fromEntries([...famBlock.matchAll(/([A-Z0-9]+):'([A-Z]+)'/g)].map(m => [m[1], m[2]]));
// NATURAL_SLOT_MAP: position -> the slots it may fill (the build's own map, v20:899)
const natBlock = (html.match(/const NATURAL_SLOT_MAP = \{[\s\S]*?\n\};/) || [''])[0];
const NATURAL = Object.fromEntries([...natBlock.matchAll(/([A-Z0-9]+):\[([^\]]*)\]/g)].map(m => [m[1], m[2].split(',').map(x => x.trim().replace(/'/g, ''))]));

const slug = n => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const seen = new Map();
const records = players.map(p => {
  const [name, pos, team, ovr, spd, str, agi, cod, inj, awr] = p;
  let id = slug(name);
  const n = (seen.get(id) || 0); seen.set(id, n + 1);
  if (n) id += '-' + (n + 1);
  return {
    id, name, sport: flags.sport || 'nfl', competition: flags.competition || 'nfl',
    positions: [pos], slot_families: [FAMILIES[pos] || pos], teams: [team],
    era: null,
    ovr, attributes: { spd, str, agi, cod, inj, awr },
    extensions: { xf: p[10] === true },
    provenance: { source: 'madden-nfl-27 (the reference build)', source_version: path.basename(build), source_date: '2026-10-20', raters: [], batch: 'build-export', review_state: 'unreviewed' }
  };
});

const pool = {
  meta: {
    pool: 'nfl-current', sport: flags.sport || 'nfl', competition: flags.competition || 'nfl',
    era_mode: 'current', rubric: 'n/a (exported from the reference build, not rated)',
    source_build: { file: path.basename(build), sha256: crypto.createHash('sha256').update(fs.readFileSync(build)).digest('hex') },
    exported: new Date().toISOString().slice(0, 10),
    exported_by: 'tools/export-current-pool.mjs (MiniMax)',
    note: 'Every number is copied verbatim from the build\'s PLAYERS array. era is null because the build carries no era labels; career years are absent because the build carries none. This file is the VALIDATED REFERENCE POOL for validate-dataset.mjs --ref.',
    position_families: FAMILIES, natural_slots: NATURAL
  },
  records
};
fs.writeFileSync(out, JSON.stringify(pool, null, 2) + '\n');
console.log(`exported ${records.length} records → ${out} (${fs.statSync(out).size} bytes)`);
console.log('  source build sha256:', pool.meta.source_build.sha256);
console.log('  positions:', [...new Set(records.map(r => r.positions[0]))].sort().join(', '));
