// GLM anchor pack — group volume/EPA shares from nflverse 2024 (REG only).
// Sources (sha256-pinned in raw-hashes.txt):
//   snap_counts_2024.csv.gz  — per-player weekly snap columns
//   player_stats_2024.csv.gz — weekly counting + EPA columns
// Positions are mapped to analysis groups as a REPORTED convention (see README).
// Run: node _agents/glm/anchors/group-shares-2024.mjs
import { createReadStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { createInterface } from 'node:readline';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const rawDir = join(here, 'raw');

const GROUP_OF = (lg) => ([
  ['OL', ['OL', 'OG', 'OT', 'C', 'G', 'T', 'TACKLE', 'GUARD', 'CENTER']],
  ['DL', ['DL', 'DT', 'DE', 'NT', 'DEFENSIVE TACKLE', 'DEFENSIVE END', 'NOSE TACKLE']],
  ['LB', ['LB', 'ILB', 'OLB', 'MLB', 'LINEBACKER']],
  ['DB', ['DB', 'CB', 'S', 'FS', 'SS', 'CORNERBACK', 'SAFETY', 'NCB', 'DBACK']],
  ['WR', ['WR', 'WIDE RECEIVER']],
  ['TE', ['TE', 'TIGHT END']],
  ['RB', ['RB', 'HB', 'FB', 'RUNNING BACK', 'FULLBACK']],
  ['QB', ['QB', 'QUARTERBACK']],
].find(([g, list]) => list.includes(String(lg).toUpperCase()))?.[0] ?? null);

function classify(line) {
  const cols = [];
  let q = false, cur = '';
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) { if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; }
    else if (ch === '"') { q = true; } else if (ch === ',') { cols.push(cur); cur = ''; } else cur += ch;
  }
  cols.push(cur);
  return cols;
}

const snaps = {};
const stat = {};
async function passFILE(file, fn) {
  const rl = createInterface(createReadStream(join(rawDir, file)).pipe(createGunzip()));
  let header = null;
  for await (const line of rl) {
    if (!header) { header = classify(line); continue; }
    const c = classify(line);
    const g = {};
    for (let i = 0; i < header.length; i++) g[header[i]] = c[i] ?? '';
    fn(g);
  }
}

await passFILE('snap_counts_2024.csv.gz', (g) => {
  if (g.game_type !== 'REG') return;
  const grp = GROUP_OF(g.position);
  if (!grp) return;
  const s = (snaps[grp] ??= { offSnaps: 0, defSnaps: 0, stSnaps: 0, playerRows: 0 });
  s.offSnaps += Number(g.offense_snaps) || 0;
  s.defSnaps += Number(g.defense_snaps) || 0;
  s.stSnaps += Number(g.st_snaps) || 0;
  s.playerRows++;
});

await passFILE('player_stats_2024.csv.gz', (g) => {
  if (g.season_type !== 'REG') return;
  const grp = GROUP_OF(g.position_group);
  if (!grp) return;
  const s = (stat[grp] ??= {
    targets: 0, receptions: 0, recYards: 0, recEPA: 0, receivingAirYards: 0,
    carries: 0, rushYards: 0, rushEPA: 0, passAtt: 0, passYards: 0, passEPA: 0,
    passINT: 0, passSacks: 0, players: new Set(),
  });
  s.targets += Number(g.targets) || 0;
  s.receptions += Number(g.receptions) || 0;
  s.recYards += Number(g.receiving_yards) || 0;
  s.recEPA += Number(g.receiving_epa) || 0;
  s.receivingAirYards += Number(g.receiving_air_yards) || 0;
  s.carries += Number(g.carries) || 0;
  s.rushYards += Number(g.rushing_yards) || 0;
  s.rushEPA += Number(g.rushing_epa) || 0;
  s.passAtt += Number(g.attempts) || 0;
  s.passYards += Number(g.passing_yards) || 0;
  s.passEPA += Number(g.passing_epa) || 0;
  s.passINT += Number(g.interceptions) || 0;
  s.passSacks += Number(g.sacks) || 0;
  s.players.add(g.player_id);
});

// --- derive shares ---
const snapTotal = {};
for (const side of ['off', 'def']) {
  snapTotal[side] =
    (side === 'off' ? 'offSnaps' : 'defSnaps') &&
    Object.entries(snaps).reduce((a, [, v]) => a + (side === 'off' ? v.offSnaps : v.defSnaps), 0);
}
const OUT = {
  meta: {
    built: new Date().toISOString(),
    season: 2024,
    filters: { season_type: 'REG' },
    sources: { snap_counts: 'raw/snap_counts_2024.csv.gz', player_stats: 'raw/player_stats_2024.csv.gz' },
    group_mapping_reported: 'positional strings mapped to analysis groups; unmapped -> dropped',
    license: 'nflverse; see DATA-LICENSE.md at repo root',
  },
  snaps: {},
  skill: {},
};
for (const [grp, v] of Object.entries(snaps)) {
  OUT.snaps[grp] = {
    ...v,
    offShare_pct: +(100 * v.offSnaps / snapTotal.off).toFixed(2),
    defShare_pct: +(100 * v.defSnaps / snapTotal.def).toFixed(2),
  };
}
const skillEPA = Object.entries(stat).reduce((a, [, s]) => a + s.recEPA + s.rushEPA + s.passEPA, 0);
const skillTargets = Object.entries(stat).reduce((a, [, s]) => a + s.targets, 0);
for (const [grp, s] of Object.entries(stat)) {
  OUT.skill[grp] = {
    ...s,
    players: s.players.size,
    skillEPAShare_pct: +(100 * (s.recEPA + s.rushEPA + s.passEPA) / skillEPA).toFixed(2),
    targetShare_of_targets_pct: +(100 * s.targets / skillTargets).toFixed(2),
  };
}
writeFileSync(join(here, 'group-shares-2024.json'), JSON.stringify(OUT, null, 2));
console.log('GROUP snap shares (OFF/DEF %):');
for (const [g, v] of Object.entries(OUT.snaps)) console.log(`${g}: off=${v.offShare_pct} def=${v.defShare_pct}`);
console.log('SKILL target% and skill-EPA%:');
for (const [g, v] of Object.entries(OUT.skill)) console.log(`${g}: tgt=${v.targetShare_of_targets_pct} skillEPA=${v.skillEPAShare_pct} players=${v.players}`);
