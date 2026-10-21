#!/usr/bin/env node
// validate-dataset.mjs — the data gate for a player pool.
//
// MiniMax · 20 Oct 2026. Dependency-free plain Node (>= 18). No installs.
//
//   node validate-dataset.mjs <pool.json> [--ref <other-pool.json>] [--min 1000] [--max 1400]
//   node validate-dataset.mjs --make-example <out.json>      (writes a 3-record file to look at)
//
// A pool file is either a JSON array of records or { "meta": {...}, "records": [...] }.
// A record: { name, pos, team, ovr, spd, str, agi, cod, inj, awr, era?, provenance? }
//
// Exit: 0 = every check passed, 1 = findings, 4 = usage/parse error.
// The report IS the receipt: it names the pool, the counts, and every finding.

import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
const LIST_FLAGS = new Set(['make-example']);
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

const FIELDS = ['name', 'pos', 'team', 'ovr', 'spd', 'str', 'agi', 'cod', 'inj', 'awr'];
// Measured on the reference build (31b7d61f…): ovr runs 70-99, the attributes run 28-99 (a kicker's
// strength is legitimately below 40 — the build has str=28 for Blake Grupe, str=34 for Jake Elliott),
// and inj runs 0-100. The attribute bounds are therefore 0-100, and the *observed* range is reported
// below rather than enforced against a guess.
const RANGES = { ovr: [40, 99], spd: [0, 100], str: [0, 100], agi: [0, 100], cod: [0, 100], inj: [0, 100], awr: [0, 100] };
const findings = [];
const notes = [];
const fail = (id, msg) => findings.push({ id, msg });
const note = (msg) => notes.push(msg);

function readPool(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(raw);
  if (Array.isArray(data)) return { records: data, meta: {} };
  if (data && Array.isArray(data.records)) return { records: data.records, meta: data.meta || {} };
  throw new Error('not a pool: expected an array or {records:[...]}');
}

function histogram(recs, key = 'ovr') {
  const h = {};
  for (const r of recs) {
    const b = Math.floor(Number(r[key] || 0) / 5) * 5;
    h[b] = (h[b] || 0) + 1;
  }
  return h;
}

// Normalise a record to the flat working shape, so the validator accepts BOTH the published
// platform schema (positions[]/teams[]/attributes{}) and the older flat tuple
// (pos/team/spd/str/agi/cod/inj/awr). One validator, one schema, no silent divergence.
function norm(r) {
  const a = r.attributes || r;
  return {
    ...r,
    id: r.id || r.playerId || null,
    pos: r.pos || (Array.isArray(r.positions) ? r.positions[0] : r.positions) || null,
    team: r.team || (Array.isArray(r.teams) ? r.teams[0] : r.teams) || null,
    spd: a.spd, str: a.str, agi: a.agi, cod: a.cod, inj: a.inj, awr: a.awr,
    era: r.era ?? null,
    provenance: r.provenance || null
  };
}

function validate(file, opts) {
  const { records: rawRecords, meta } = readPool(file);
  const records = rawRecords.map(norm);
  const name = path.basename(file);
  note(`pool ${name}: ${records.length} records`);

  // 1 · size
  if (records.length < opts.min) fail('size', `${records.length} records — below the target minimum of ${opts.min}`);
  if (opts.max && records.length > opts.max) fail('size', `${records.length} records — above the target maximum of ${opts.max}`);

  // 2 · schema and ranges
  const bad = [];
  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    for (const f of FIELDS) {
      if (r[f] === undefined || r[f] === null || r[f] === '') { bad.push(`#${i} ${r.name || '(unnamed)'}: missing ${f}`); continue; }
      if (f === 'name' || f === 'pos' || f === 'team') {
        if (typeof r[f] !== 'string') bad.push(`#${i} ${r.name}: ${f} is not a string (${JSON.stringify(r[f])})`);
      } else {
        const n = Number(r[f]);
        if (!Number.isFinite(n)) bad.push(`#${i} ${r.name}: ${f} is not a number (${JSON.stringify(r[f])})`);
        else {
          const [lo, hi] = RANGES[f];
          if (n < lo || n > hi) bad.push(`#${i} ${r.name}: ${f}=${n} is outside ${lo}–${hi}`);
        }
      }
    }
  }
  if (bad.length) fail('schema', `${bad.length} field problem(s); first 10: ${bad.slice(0, 10).join(' | ')}`);

  // 3 · duplicates
  const seen = new Map();
  for (const r of records) {
    const key = String(r.name || '').trim().toLowerCase();
    if (!key) continue;
    if (seen.has(key)) fail('duplicates', `"${r.name}" appears more than once (records #${seen.get(key)} and later)`);
    else seen.set(key, seen.size);
  }

  // 4 · position coverage
  const pos = new Map();
  for (const r of records) pos.set(r.pos, (pos.get(r.pos) || 0) + 1);
  const minPerPos = Number(flags.minPerPos || 3);
  for (const [p, n] of pos) if (n < minPerPos) fail('position-coverage', `position ${p} has only ${n} record(s) (minimum ${minPerPos})`);

  // 4b · POSITION TAXONOMY — the check that keeps a legacy-coded pool out of the build.
  //
  // Measured on v20 (31b7d61f…): the draft pool is PLAYERS.filter(p=>POS_SLOT_MAP[p[1]])
  // (v20:1434) and POS_SLOT_MAP's keys are exactly NATURAL_SLOT_MAP's position codes (19 of
  // them). A record with any other code is excluded from the pool, skipped by the CPU's
  // candidate loop (v20:1375), excluded from the replacement-level pool (v20:1334) and has no
  // eligible slots (v20:1171). When the visible pool falls below the 832 required slots, the
  // draft SKIPS the picks it cannot fill (v20:1494-1497: `if(pk && pk.slot) ... else
  // draftSim.pos++`) — the counter still reaches 832/832 and the UI says "Draft Complete" while
  // starter slots sit empty. Measured: 400 legacy-coded records → 748 real picks, 84 empty slots,
  // and no error anywhere.
  if (opts.fromBuild) {
    const build = fs.readFileSync(opts.fromBuild, 'utf8');
    const nat = (build.match(/const NATURAL_SLOT_MAP = \{[\s\S]*?\n\};/) || [''])[0];
    const draftable = [...nat.matchAll(/([A-Z][A-Z0-9_]*)\s*:\s*\[/g)].map(m => m[1]);
    // The build's own vocabulary: codes that appear in its PLAYERS array. A code is LEGAL if it is
    // draftable OR if the build itself ships records with it (P, FB, LS are in the current pool and
    // are never drafted). A code that is neither is a legacy/unknown code — the failure M-81 measured.
    const pm = build.match(/const PLAYERS = \[[\s\S]*?\];/);
    const buildCodes = pm ? [...new Set([...pm[0].matchAll(/\["[^"]*","([A-Z]+)"/g)].map(m => m[1]))] : [];
    const legal = new Set([...draftable, ...buildCodes]);
    const posCount = new Map();
    for (const r of records) posCount.set(r.pos, (posCount.get(r.pos) || 0) + 1);
    const unmapped = [...posCount.entries()].filter(([p]) => !legal.has(p));
    if (unmapped.length) {
      const total = unmapped.reduce((a, [, n]) => a + n, 0);
      fail('position-taxonomy', `${total} record(s) use position codes that are in neither the build's NATURAL_SLOT_MAP nor its own player vocabulary: ${unmapped.map(([p, n]) => `${p} x${n}`).join(', ')} — such records are invisible to the draft pool, the replacement levels and the slot maps`);
    } else {
      note(`position codes: all legal against the build (${draftable.length} draftable + ${buildCodes.length - draftable.length} non-drafted: ${buildCodes.filter(c => !draftable.includes(c)).join(', ') || 'none'})`);
    }
    const byBuild = new Map();
    for (const r of records) byBuild.set(r.pos, (byBuild.get(r.pos) || 0) + 1);
    const nonDraftable = [...byBuild.entries()].filter(([p]) => !draftable.includes(p));
    if (nonDraftable.length) {
      note('not draftable by design (in the build vocabulary, never drafted): ' + nonDraftable.map(([p, n]) => p + ' x' + n).join(', '));
    }
  }

  // 5 · team coverage
  const teams = new Set(records.map(r => r.team));
  note(`positions: ${[...pos.entries()].sort((a, b) => b[1] - a[1]).map(([p, n]) => `${p}:${n}`).join(' ')}`);
  const observed = {};
  for (const f of ['ovr', 'spd', 'str', 'agi', 'cod', 'inj', 'awr']) {
    const vals = records.map(r => Number(r[f])).filter(Number.isFinite);
    if (vals.length) observed[f] = `${Math.min(...vals)}-${Math.max(...vals)}`;
  }
  note(`observed ranges: ${Object.entries(observed).map(([k, v]) => `${k} ${v}`).join(', ')}`);
  note(`teams: ${teams.size} distinct`);

  // 6 · the OVR histogram, and a comparison with a reference pool
  const hist = histogram(records);
  const top = Object.entries(hist).sort((a, b) => b[0] - a[0]);
  note(`ovr histogram (bucket: count): ${top.map(([b, n]) => `${b}:${n}`).join(' ')}`);
  const elite = records.filter(r => Number(r.ovr) >= 90).length;
  const elitePct = (elite / records.length * 100);
  note(`players at 90+: ${elite} (${elitePct.toFixed(1)}%)`);
  if (elitePct > 25) fail('distribution', `${elitePct.toFixed(1)}% of the pool is 90+ — a pool that dense drafts like a carnival (target: under 25%)`);
  if (elitePct < 3) fail('distribution', `only ${elitePct.toFixed(1)}% of the pool is 90+ — the pool has no elite tier`);

  if (opts.ref && fs.existsSync(opts.ref)) {
    const ref = readPool(opts.ref);
    const refHist = histogram(ref.records);
    const refElite = (ref.records.filter(r => Number(r.ovr) >= 90).length / ref.records.length * 100);
    note(`reference ${path.basename(opts.ref)}: ${ref.records.length} records, ${refElite.toFixed(1)}% at 90+`);
    if (Math.abs(elitePct - refElite) > 12) fail('distribution', `90+ share ${elitePct.toFixed(1)}% differs from the reference ${refElite.toFixed(1)}% by more than 12 points`);
  }

  // 7 · the "-5 current player" rule
  if (meta.current_eligible_rule) {
    const delta = Number(meta.current_eligible_rule.delta ?? 5);
    let checked = 0, wrong = 0;
    for (const r of records) {
      if (r.current_base_ovr === undefined) continue;
      checked++;
      if (Number(r.ovr) !== Number(r.current_base_ovr) - delta) wrong++;
    }
    if (checked === 0) fail('minus-5-rule', 'the pool declares a current-eligible rule but no record carries `current_base_ovr`');
    else if (wrong > 0) fail('minus-5-rule', `${wrong} of ${checked} current-eligible records do not obey the −${delta} rule`);
    else note(`minus-5 rule: ${checked} current-eligible records checked, all at −${delta} from their base`);
  }

  // 7b · a CANDIDATE pool must not carry ratings (Owner direction: source material is not a pool)
  if (String(meta.kind || '').toUpperCase().includes('CANDIDATE')) {
    const rated = records.filter(r => r.ovr !== undefined && r.ovr !== null && r.ovr !== '');
    if (rated.length) fail('candidate-ratings', `${rated.length} candidate record(s) carry a rating (${rated.slice(0, 5).map(r => r.name).join(', ')}) — a candidate is source material, not a rating`);
    else note('candidate pool: no ratings present (correct — the Owner approves pools)');
    const noSource = records.filter(r => !r.source_mentions && !r.provenance).length;
    if (noSource) fail('candidate-provenance', `${noSource} candidate record(s) have no source mention`);
    else note('candidate pool: every record carries at least one source mention');
  }

  // 8 · provenance
  const noProv = records.filter(r => !r.provenance || !r.provenance.source).map(r => r.name);
  if (records.length && noProv.length === 0) note(`provenance present on all ${records.length} records`);
  if (noProv.length) fail('provenance', `${noProv.length} record(s) have no provenance.source — first: ${noProv.slice(0, 5).join(', ')}`);

  // 9 · eras
  if (records.some(r => r.era) && !records.every(r => r.era)) fail('era', 'some records carry an `era` label and some do not — either label all or none');
  else if (records.every(r => r.era)) note(`era labels present on all ${records.length} records`);

  // 10 · the draft must be fillable: visible records >= teams x roster slots
  if (opts.slots && opts.teams) {
    const needed = opts.slots * opts.teams;
    let visible = records.length;
    if (opts.fromBuild) {
      const build = fs.readFileSync(opts.fromBuild, 'utf8');
      const nat = (build.match(/const NATURAL_SLOT_MAP = \{[\s\S]*?\n\};/) || [''])[0];
      const draftable = new Set([...nat.matchAll(/([A-Z][A-Z0-9_]*)\s*:\s*\[/g)].map(m => m[1]));
      visible = records.filter(r => draftable.has(r.pos)).length;
    }
    note(`draft capacity: ${visible} visible record(s) for ${opts.teams} teams x ${opts.slots} slots = ${needed} needed${visible < needed ? ' — SHORT' : ''}`);
    if (visible < needed) fail('draft-capacity', `only ${visible} record(s) are visible to the draft, but ${needed} are needed — the draft will silently skip ${needed - visible} pick(s) and leave those slots empty`);
  }

  return { records, meta, name };
}

function cmdMakeExample(out) {
  const example = {
    meta: { pool: 'example', rubric: 'v1', current_eligible_rule: { delta: 5, applies_to: 'records carrying current_base_ovr' } },
    records: [
      { name: 'Example Player', pos: 'QB', team: 'KC', ovr: 94, spd: 88, str: 90, agi: 87, cod: 93, inj: 95, awr: 92, era: '2010s', provenance: { source: 'council', raters: ['a', 'b'], rubric: 'v1', batch: 'ex-01' } },
      { name: 'Example Current', pos: 'WR', team: 'CIN', ovr: 93, spd: 96, str: 73, agi: 92, cod: 96, inj: 92, awr: 99, era: '2020s', current_base_ovr: 98, provenance: { source: 'council', raters: ['a', 'b'], rubric: 'v1', batch: 'ex-01' } },
      { name: 'Example Legend', pos: 'LB', team: 'NYG', ovr: 97, spd: 88, str: 92, agi: 89, cod: 94, inj: 95, awr: 96, era: '1980s', provenance: { source: 'council', raters: ['a', 'b', 'c'], rubric: 'v1', batch: 'ex-01' } },
    ],
  };
  fs.writeFileSync(out, JSON.stringify(example, null, 2) + '\n');
  console.log('example written: ' + out);
}

if (flags['make-example']) {
  const out = (Array.isArray(flags['make-example']) ? flags['make-example'][0] : null) || positional[0] || 'example-pool.json';
  cmdMakeExample(out);
  process.exit(0);
}
if (!positional[0]) {
  console.error('usage: node validate-dataset.mjs <pool.json> [--ref <pool.json>] [--min 1000] [--max 1400] [--minPerPos 3]\n' +
    '       [--fromBuild <build.html> --teams 32 --slots 26]   # position-taxonomy + draft-capacity checks\n' +
    '       node validate-dataset.mjs --make-example <out.json>');
  process.exit(4);
}
const file = positional[0];
if (!fs.existsSync(file)) { console.error('no such file: ' + file); process.exit(4); }
const opts = { min: Number(flags.min || 1000), max: Number(flags.max || 1400), ref: flags.ref,
               fromBuild: typeof flags.fromBuild === 'string' ? flags.fromBuild : null,
               slots: flags.slots ? Number(flags.slots) : null, teams: flags.teams ? Number(flags.teams) : null };
let res;
try { res = validate(file, opts); } catch (e) { console.error('parse error: ' + e.message); process.exit(4); }

console.log('\nDataset validation — ' + res.name);
for (const n of notes) console.log('  · ' + n);
console.log('');
if (!findings.length) {
  console.log('  PASS — every check passed.');
  console.log('\n  exit 0\n');
  process.exit(0);
}
console.log('  FINDINGS:');
for (const f of findings) console.log(`   - [${f.id}] ${f.msg}`);
console.log(`\n  exit 1 — ${findings.length} finding(s)\n`);
process.exit(1);
