#!/usr/bin/env node
// build-pool-variant.mjs — put a PLAYER POOL into a build, without touching the engine.
//
// MiniMax · 20 Oct 2026. Dependency-free plain Node (>= 18). Read-only on the build and the pool;
// it writes a NEW build file.
//
//   node build-pool-variant.mjs "<build.html>" --pool "<pool.json>" --out "<variant.html>" [--no-taxonomy]
//
// What it does, and why it matters:
//   The pool is a BUILD-TIME input. The builder replaces the build's `const PLAYERS = [...]` literal
//   with the pool's records, re-serialised into the build's own tuple format
//   [name, pos, team, ovr, spd, str, agi, cod, inj, awr]. Nothing else in the file is touched — the
//   engine, the weights, the flex table, the season loop and the UI are byte-identical to the input
//   build. That is the whole stage-1 seam of the expansion, demonstrated rather than described.
//
//   The TAXONOMY step is the second half: a pool may be written in the sport's own historical
//   vocabulary (FL, LB, E, T, G, DB). Those codes are translated to the build's slot codes through
//   the mapping in `nfl-position-taxonomy.md` (the machine-readable twin is below). Without the
//   translation the records are invisible to the draft (M-81) — `--no-taxonomy` exists to
//   demonstrate exactly that, and the report says how many records were affected.
//
//   The builder NEVER invents a rating: every number comes from the pool file, and a record whose
//   position cannot be translated is reported and dropped, not guessed.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// legacy code -> the build's slot code, in the order of preference (the first is used;
// the others are listed in the report so a human can review the choice).
const TAXONOMY = {
  QB: ['QB'], K: ['K'], C: ['C'], T: ['LT', 'RT'], G: ['LG', 'RG'], OL: ['OT1', 'OT2', 'OG1', 'OG2', 'C'],
  HB: ['HB'], FL: ['WR', 'CB'], REC: ['WR'], TE: ['TE'], E: ['REDG', 'LEDG'], DE: ['REDG', 'LEDG'],
  EDGE: ['REDG', 'LEDG'], DT: ['DT', 'REDG'], NG: ['DT'], LB: ['MIKE', 'WILL', 'SAM'], S: ['SS', 'FS'],
  DB: ['CB', 'SS', 'FS'], CB: ['CB'], SS: ['SS'], FS: ['FS']
};

const argv = process.argv.slice(2);
const flags = {}; const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { const k = argv[i].slice(2); const n = argv[i + 1]; flags[k] = (n && !n.startsWith('--')) ? argv[++i] : true; }
  else positional.push(argv[i]);
}
const build = positional[0], poolFile = flags.pool;
const out = flags.out || 'variant.html';
if (!build || !poolFile || !fs.existsSync(build) || !fs.existsSync(poolFile)) {
  console.error('usage: build-pool-variant.mjs <build.html> --pool <pool.json> --out <variant.html> [--no-taxonomy]');
  process.exit(4);
}
const buildText = fs.readFileSync(build, 'utf8');
const marker = 'const PLAYERS = ';
const s = buildText.indexOf(marker);
if (s < 0) { console.error('no PLAYERS literal in ' + build); process.exit(4); }
const arrStart = s + marker.length;
const arrEnd = buildText.indexOf('];', arrStart) + 1;
const buildPositions = new Set([...buildText.matchAll(/\nconst NATURAL_SLOT_MAP = \{[\s\S]*?\n\};/g)].map(() => 0)); // placeholder

// the build's legal position codes, read from its own NATURAL_SLOT_MAP
const natBlock = (buildText.match(/const NATURAL_SLOT_MAP = \{[\s\S]*?\n\};/) || [''])[0];
const legalCodes = new Set([...natBlock.matchAll(/([A-Z][A-Z0-9_]*)\s*:\s*\[/g)].map(m => m[1]));

const poolData = JSON.parse(fs.readFileSync(poolFile, 'utf8'));
const records = Array.isArray(poolData) ? poolData : (poolData.records || poolData.players || []);
if (!records.length) { console.error('no records in ' + poolFile); process.exit(4); }

const translated = [], dropped = [], kept = [];
const tuples = [];
for (const r of records) {
  const name = r.name || r.playerId;
  const posRaw = r.pos || (Array.isArray(r.positions) ? r.positions[0] : null);
  const team = r.team || (Array.isArray(r.teams) ? r.teams[0] : null);
  const a = r.attributes || r;
  let pos = posRaw;
  if (!legalCodes.has(pos)) {
    const cands = TAXONOMY[pos] || [];
    // MOC's guard (M-304): a taxonomy target must itself be a legal code in THIS build. Without it a
    // mapping like LS:['LS'] writes pool-invisible records and reports success - the M-81 failure
    // mode in a different costume. The assignability count below is the second half of the same check.
    const legalTarget = cands.length && legalCodes.has(cands[0]);
    if (!flags['no-taxonomy'] && legalTarget) {
      pos = cands[0];
      translated.push({ name, from: posRaw, to: pos, alternatives: cands });
    } else {
      dropped.push({ name, pos: posRaw, reason: flags['no-taxonomy'] ? 'translation disabled'
        : (cands.length ? 'mapping target "' + cands[0] + '" is not a legal slot code in this build' : 'no mapping in the taxonomy') });
      continue;
    }
  }
  if (!Number.isFinite(Number(r.ovr))) { dropped.push({ name, pos: posRaw, reason: 'no numeric ovr — the builder never invents a rating' }); continue; }
  tuples.push([name, pos, team, Number(r.ovr), Number(a.spd), Number(a.str), Number(a.agi), Number(a.cod), Number(a.inj), Number(a.awr)]);
  kept.push(name);
}

const literal = JSON.stringify(tuples) + ';';
const outText = buildText.slice(0, arrStart) + literal + buildText.slice(arrEnd);
fs.writeFileSync(out, outText);
const sha = crypto.createHash('sha256').update(outText).digest('hex');
console.log(`variant written: ${out} (${fs.statSync(out).size} bytes)`);
console.log(`  sha256 ${sha}`);
console.log(`  records in pool: ${records.length} · written: ${tuples.length} · translated: ${translated.length} · dropped: ${dropped.length}`);
  const assignable = tuples.filter(t => legalCodes.has(t[1])).length;
  console.log(`  pool-visible: ${tuples.length} · ASSIGNABLE (position is a legal slot code in THIS build): ${assignable}` + (assignable < tuples.length ? `  <-- ${tuples.length - assignable} record(s) are pool-visible but can never be slotted` : ''));
if (translated.length) {
  console.log('  translation report (name: from -> to [alternatives]):');
  for (const t of translated.slice(0, 30)) console.log(`    ${t.name}: ${t.from} -> ${t.to} [${t.alternatives.join(', ')}]`);
  if (translated.length > 30) console.log(`    ... and ${translated.length - 30} more`);
}
if (dropped.length) {
  console.log('  DROPPED (not guessed, not rated):');
  for (const d of dropped.slice(0, 20)) console.log(`    ${d.name} (${d.pos}): ${d.reason}`);
  if (dropped.length > 20) console.log(`    ... and ${dropped.length - 20} more`);
}
console.log('  note: TEAM_DATA (the 32 depth charts) is NOT substituted by this tool — the depth-chart');
console.log('        names must exist in the pool, which the validator checks (position-taxonomy + coverage).');
