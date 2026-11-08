// GLM anchor pack — play-level outcome distributions (T1 ladder level 3)
// Source: nflverse nflverse-data release `pbp` / play_by_play_2024.csv.gz
// (VERIFIED download 2026-11-08; sha256 in raw-hashes.txt). REG only.
// Every emitted number is a count or ratio of counts from the source file (no invented data).
// Run: node _agents/glm/anchors/pbp-level3.mjs
import { createReadStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { createInterface } from 'node:readline';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const rawDir = join(here, 'raw');
const outPath = join(here, 'pbp-level3-2024.json');

// --- 2. pbp streaming pass ---
const BUCKETS = [
  { id: 'behind', lo: -Infinity, hi: 0 },
  { id: '0-5', lo: 0, hi: 5.5 },
  { id: '6-10', lo: 5.5, hi: 10.5 },
  { id: '11-20', lo: 10.5, hi: 20.5 },
  { id: '21+', lo: 20.5, hi: Infinity },
];
const bkt = (n) => BUCKETS.find((b) => n >= b.lo && n < b.hi)?.id;

const agg = {};
function key(...parts) { return parts.join('|'); }
function bucket() {
  return { att: 0, comp: 0, int: 0, air: 0, yac: 0, yacN: 0 };
}
function rowFor(k) {
  return (agg[k] ??= bucket());
}
const totals = { plays: 0, games: new Set(), regGames: new Set() };
let header = null;
{
  const rl = createInterface(
    createReadStream(join(rawDir, 'play_by_play_2024.csv.gz')).pipe(createGunzip()),
  );
  for await (const line of rl) {
    const c = [];
    if (!header) { header = line.split(','); continue; }
    csvSplit(line, c);
    const g = {};
    for (let i = 0; i < header.length; i++) g[header[i]] = c[i] ?? '';
    totals.plays++;
    totals.games.add(g.game_id);
    if (g.season_type !== 'REG') continue;
    totals.regGames.add(g.game_id);
    const NUM = (x) => Number(x) || 0;
    // --- outcome distributions on pass plays ---
    if (g.pass_attempt === '1' && g.air_yards !== '') {
      const air = NUM(g.air_yards);
      const b = bkt(air);
      if (b) {
        const r = rowFor(key('pass|airyards', b));
        r.att++; r.air += air;
        if (g.complete_pass === '1') { r.comp++; r.yac += NUM(g.yards_after_catch); r.yacN++; }
        if (g.interception === '1') r.int++;
      }
    }
    // pressure -> sack: pressure proxy qb_hit (hit or sack); "unhit" sacks exist, noted in README
    if (g.qb_hit === '1' || g.sack === '1') {
      const r = rowFor('pressure|all');
      r.att++;
      if (g.sack === '1') r.comp++; // comp slot reused as sack count
    }
  }
}
function csvSplit(line, out) {
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
}

// --- 3. derive ratios ---
const derived = {};
for (const [k, v] of Object.entries(agg)) {
  const [kind] = k.split('|');
  if (kind === 'pass') {
    derived[k] = {
      attempts: v.att,
      completions: v.comp,
      interceptions: v.int,
      completion_pct: +(100 * v.comp / v.att).toFixed(2),
      int_rate_pct: +(100 * v.int / v.att).toFixed(2),
      avg_air_yards: +(v.air / v.att).toFixed(2),
      avg_yac_per_completion: v.yacN ? +(v.yac / v.yacN).toFixed(2) : null,
    };
  } else if (kind === 'pressure') {
    derived[k] = {
      pressurized_plays: v.att, // qb_hit==1 OR sack==1 (hit-or-sack proxy)
      sacks: v.comp,
      sack_rate_among_pressure_pct: +(100 * v.comp / v.att).toFixed(2),
    };
  }
}
const out = {
  meta: {
    built: new Date().toISOString(),
    season: 2024,
    filters: { season_type: 'REG' },
    sources: {
      pbp: 'raw/play_by_play_2024.csv.gz',
      hashes: 'see raw-hashes.txt',
    },
    notes: {
      pressure_proxy: 'qb_hit==1 OR sack==1 (hit-or-sack; NFL "pressure" is NGS-only at feed level; unhit sacks counted as pressure via sack==1)',
      yac: 'mean yards_after_catch over completed passes in the air-yard bucket',
      attempts_include_INTs: 'true (completion% denominator = pass attempts incl INTs)',
      open: ['INT-by-coverage-role (needs defensive depth-of-dataset join)', 'YAC by receiver slot group (needs receiver position join)', 'defense EPA per player'],
    },
  },
  totals: { pbp_rows: totals.plays, games_all: totals.games.size, reg_games: totals.regGames.size },
  derived,
};
writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`pbp rows=${out.totals.pbp_rows} reg_games=${out.totals.reg_games}`);
for (const id of BUCKETS.map((b) => b.id)) {
  const d = derived[`pass|airyards|${id}`];
  if (d) console.log(`${id}: att=${d.attempts} comp%=${d.completion_pct} int%=${d.int_rate_pct} yac/comp=${d.avg_yac_per_completion}`);
}
console.log(`pressure: plays=${derived['pressure|all']?.pressurized_plays} sacks=${derived['pressure|all']?.sacks} sack%=${derived['pressure|all']?.sack_rate_among_pressure_pct}`);
