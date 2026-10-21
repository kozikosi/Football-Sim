#!/usr/bin/env node
// rating-worksheet.mjs — the multi-rater pipeline for a council-rated pool.
//
// MiniMax · 20 Oct 2026. Dependency-free plain Node (>= 18). No installs.
//
//   node rating-worksheet.mjs --make <pool.json> --out <worksheet.json> [--limit 60]
//        -> a rating worksheet: the players to rate, the rubric, and the anchors, inlined.
//   node rating-worksheet.mjs --aggregate <rater-dir-or-file>... --out <merged.json>
//        -> reads rater submissions, takes the median per player, flags disagreements > 5,
//           and writes the merged pool + a disagreement report.
//
// A rater submission is a JSON file:
//   { "rater": "your-name", "rubric": "v1",
//     "ratings": [ { "name": "Lawrence Taylor", "ovr": 97, "spd": 88, "str": 92,
//                    "agi": 89, "cod": 94, "inj": 95, "awr": 96, "era": "1980s" } ] }
//
// Exit: 0 = ok, 1 = findings (unrated players, big disagreements), 4 = usage/parse error.

import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
const LIST_FLAGS = new Set(['make-example', 'make', 'aggregate']);
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const k = argv[i].slice(2);
    if (LIST_FLAGS.has(k)) {
      const vals = [];
      while (i + 1 < argv.length && !argv[i + 1].startsWith('--')) vals.push(argv[++i]);
      flags[k] = vals;
    } else {
      const next = argv[i + 1];
      flags[k] = (next && !next.startsWith('--')) ? argv[++i] : true;
    }
  } else positional.push(argv[i]);
}

const ANCHORS = [
  { ovr: 99, meaning: 'the single best at his position, all-time' },
  { ovr: '95-98', meaning: 'perennial, first-team all-pro' },
  { ovr: '90-94', meaning: 'clear multi-year starter' },
  { ovr: '85-89', meaning: 'solid starter' },
  { ovr: '80-84', meaning: 'rotation, occasional starter' },
  { ovr: '75-79', meaning: 'situational / special teams' },
  { ovr: '70-74', meaning: 'fringe roster, developmental' },
  { ovr: '60-69', meaning: 'camp body / long shot' },
];
const ATTRS = ['spd', 'str', 'agi', 'cod', 'inj', 'awr'];
const ATTR_MEANING = {
  spd: 'speed', str: 'strength', agi: 'agility', cod: 'coordination / technique',
  inj: 'durability (100 = never misses a game)', awr: 'awareness / football or basketball IQ',
};

function readPool(file) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (Array.isArray(data)) return { records: data, meta: {} };
  if (data && Array.isArray(data.records)) return { records: data.records, meta: data.meta || {} };
  throw new Error('not a pool');
}

function cmdMake(poolFile, outFile, limit) {
  const { records } = readPool(poolFile);
  const take = records.slice(0, limit || 60);
  const sheet = {
    meta: {
      generated: new Date().toISOString().slice(0, 10),
      pool: path.basename(poolFile),
      rubric: 'v1 — read the anchors before you start',
      instruction: 'Rate each player INDEPENDENTLY. Do not discuss with other raters before submitting. ' +
        'Write the same name exactly as it appears. Submit as: { "rater": "<your name>", "rubric": "v1", "ratings": [ ... ] }',
      anchors: ANCHORS,
      attributes: ATTRS.map(a => ({ key: a, meaning: ATTR_MEANING[a] })),
    },
    players: take.map(r => ({ name: r.name, pos: r.pos, team: r.team, era: r.era || null, rating: null })),
  };
  fs.writeFileSync(outFile, JSON.stringify(sheet, null, 2) + '\n');
  console.log(`worksheet written: ${outFile} (${take.length} players)`);
  console.log('  fill each `rating` object: { "ovr": n, "spd": n, "str": n, "agi": n, "cod": n, "inj": n, "awr": n }');
}

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function cmdAggregate(inputs, outFile) {
  const files = [];
  for (const inp of inputs) {
    if (!fs.existsSync(inp)) { console.error('no such file: ' + inp); process.exit(4); }
    if (fs.statSync(inp).isDirectory()) {
      for (const f of fs.readdirSync(inp)) if (f.endsWith('.json')) files.push(path.join(inp, f));
    } else files.push(inp);
  }
  if (!files.length) { console.error('no submission files found'); process.exit(4); }

  const byPlayer = new Map();   // name -> [{rater, rating}]
  const raters = new Set();
  const problems = [];
  for (const f of files) {
    let sub;
    try { sub = JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { problems.push(`${path.basename(f)}: not valid JSON`); continue; }
    const rater = sub.rater || path.basename(f, '.json');
    if (!Array.isArray(sub.ratings)) { problems.push(`${path.basename(f)}: no ratings array`); continue; }
    raters.add(rater);
    for (const r of sub.ratings) {
      if (!r || !r.name) { problems.push(`${rater}: a rating has no name`); continue; }
      if (!byPlayer.has(r.name)) byPlayer.set(r.name, []);
      byPlayer.get(r.name).push({ rater, rating: r, rubric: sub.rubric || null });
    }
  }

  const disagreements = [];
  const merged = [];
  for (const [name, list] of byPlayer) {
    const ovrs = list.map(x => Number(x.rating.ovr)).filter(Number.isFinite);
    if (ovrs.length < 2) { problems.push(`${name}: rated by ${ovrs.length} rater(s) — two are needed for a median`); continue; }
    const med = median(ovrs);
    const spread = Math.max(...ovrs) - Math.min(...ovrs);
    if (spread > 5) disagreements.push({ name, spread, ovrs: ovrs.sort((a, b) => a - b), raters: list.map(x => x.rater) });
    const base = list[0].rating;
    const rec = { name, pos: base.pos || null, team: base.team || null, era: base.era || null };
    rec.ovr = Math.round(med);
    for (const a of ATTRS) {
      const vals = list.map(x => Number(x.rating[a])).filter(Number.isFinite);
      rec[a] = vals.length ? Math.round(median(vals)) : (Number(base[a]) || 0);
    }
    rec.provenance = { source: 'council', raters: list.map(x => x.rater), rubric: list[0].rubric || 'v1', median_ovr: med, spread };
    merged.push(rec);
  }

  const pool = {
    meta: { generated: new Date().toISOString().slice(0, 10), raters: [...raters], records_count: merged.length, method: 'median of independent ratings; third rater needed where the spread exceeds 5' },
    records: merged,
  };
  fs.writeFileSync(outFile, JSON.stringify(pool, null, 2) + '\n');

  console.log('\nAggregation');
  console.log(`  submissions: ${files.length} · raters: ${[...raters].join(', ') || '(none)'}`);
  console.log(`  players rated: ${byPlayer.size} · merged records: ${merged.length}`);
  console.log(`  written: ${outFile}`);
  if (disagreements.length) {
    console.log(`\n  ${disagreements.length} player(s) disagree by more than 5 — they need a third rater:`);
    for (const d of disagreements.slice(0, 20)) console.log(`   - ${d.name}: ${d.ovrs.join(' / ')} (spread ${d.spread}) — ${d.raters.join(', ')}`);
  } else {
    console.log('\n  no spread above 5 — the raters agree.');
  }
  if (problems.length) {
    console.log(`\n  ${problems.length} problem(s):`);
    for (const p of problems.slice(0, 15)) console.log(`   - ${p}`);
    if (problems.length > 15) console.log(`   ... and ${problems.length - 15} more`);
  }
  console.log(`\n  exit ${problems.length ? 1 : 0}\n`);
  process.exit(problems.length ? 1 : 0);
}

if (flags.make) cmdMake(String(Array.isArray(flags.make) ? flags.make[0] : flags.make), String(flags.out || 'worksheet.json'), Number(flags.limit || 60));
else if (flags.aggregate) cmdAggregate([...(Array.isArray(flags.aggregate) ? flags.aggregate : [flags.aggregate]), ...positional], String(flags.out || 'merged-pool.json'));
else {
  console.log('usage: node rating-worksheet.mjs --make <pool.json> --out <worksheet.json> [--limit 60]\n       node rating-worksheet.mjs --aggregate <rater-dir-or-file>... --out <merged.json>');
  process.exit(4);
}
