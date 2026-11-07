#!/usr/bin/env node
// _agents/beam/tools/ratings-validator.mjs
// Validates a Madden-style ratings CSV (name,pos,team,ovr,spd,str) for the Colors dataset.
// Usage: node ratings-validator.mjs <ratings.csv> [player-ids.csv]
// Exits 0 on pass, 1 on any failure. Prints a report. Does not write ratings (Kosi generates them).
import { readFileSync } from 'node:fs';

const ROLE = new Set(['QB','HB','FB','WR','TE','LT','RT','LG','RG','C','DT','LEDG','REDG','MIKE','WILL','SAM','CB','SS','FS','K','P','LS']);

function fail(msg) { console.error('FAIL: ' + msg); process.exitCode = 1; }
function ok(msg) { console.log('OK:   ' + msg); }

const ratingsPath = process.argv[2];
const idsPath = process.argv[3];
if (!ratingsPath) { console.error('usage: node ratings-validator.mjs <ratings.csv> [player-ids.csv]'); process.exit(2); }

const text = readFileSync(ratingsPath, 'utf8');
const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
if (lines[0].trim() !== 'name,pos,team,ovr,spd,str') { fail('unexpected header: ' + JSON.stringify(lines[0])); process.exit(1); }

const rows = [];
const keys = new Set();
const errors = [];
for (let i = 1; i < lines.length; i++) {
  const m = /^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(lines[i]);
  if (!m) { errors.push(`line ${i + 1}: cannot parse: ${lines[i]}`); continue; }
  const [, name, pos, team, ovr, spd, str] = m;
  if (!ROLE.has(pos)) errors.push(`line ${i + 1}: unknown position ${pos}`);
  const o = +ovr, s = +spd, t = +str;
  if (o < 40 || o > 99) errors.push(`line ${i + 1}: ovr out of range (40-99): ${o}`);
  if (s < 0 || s > 99) errors.push(`line ${i + 1}: spd out of range (0-99): ${s}`);
  if (t < 0 || t > 99) errors.push(`line ${i + 1}: str out of range (0-99): ${t}`);
  const key = `${name}|${pos}|${team}`;
  if (keys.has(key)) errors.push(`line ${i + 1}: duplicate player key ${key}`);
  keys.add(key);
  rows.push([key, name, pos, team, o, s, t]);
}

console.log(`rows: ${rows.length}`);
if (errors.length) { for (const e of errors) fail(e); } else { ok('header, ranges, positions, duplicates'); }

// canonical hash (mirrors colors/src/core/hash.ts canonicalRowsText, schema 1)
function canonicalRowsText(rows) {
  const clean = rows.map((r) => r.map((v) => {
    if (typeof v === 'number') { if (!Number.isInteger(v)) throw new Error('non-integer ' + v); return v; }
    return String(v).normalize('NFC').trim();
  }));
  clean.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  for (let i = 1; i < clean.length; i++) if (clean[i][0] === clean[i - 1][0]) throw new Error('duplicate id ' + String(clean[i][0]));
  return JSON.stringify({ schema: 1, rows: clean });
}
// hash the id-keyed rows (id = name|pos|team, matching buildPool's key)
try {
  const ids = rows.map((r) => r[0]);
  const canonical = canonicalRowsText(rows.map((r) => [r[0], r[1], r[2], r[3], r[4], r[5], r[6]]));
  const { createHash } = await import('node:crypto');
  const hash = createHash('sha256').update(canonical).digest('hex');
  ok('canonical hash: sha256:' + hash);
  console.log('canonical bytes: ' + canonical.length);
} catch (e) { fail('canonicalization: ' + e.message); }

// player-ids cross-check
if (idsPath) {
  const idText = readFileSync(idsPath, 'utf8');
  const idLines = idText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (idLines[0].trim() !== 'pid,name,pos,team') { fail('player-ids header unexpected: ' + JSON.stringify(idLines[0])); }
  else {
    const pidByKey = new Map();   // key (name|pos|team) -> pid
    const keyByPid = new Map();
    const pids = new Set();
    let idErrors = 0;
    for (let i = 1; i < idLines.length; i++) {
      // pid may contain commas? no; name may contain commas? In this file names are unquoted single tokens mostly; parse naively by last 3 fields.
      const parts = idLines[i].split(',');
      if (parts.length < 4) { fail(`player-ids line ${i + 1}: bad row`); idErrors++; continue; }
      const pid = parts[0].trim();
      const pos = parts[parts.length - 2].trim();
      const team = parts[parts.length - 1].trim();
      const name = parts.slice(1, parts.length - 2).join(',').trim();
      const key = `${name}|${pos}|${team}`;
      if (pids.has(pid)) { fail(`player-ids line ${i + 1}: duplicate pid ${pid}`); idErrors++; }
      pids.add(pid);
      if (pidByKey.has(key)) { fail(`player-ids line ${i + 1}: duplicate key ${key}`); idErrors++; }
      pidByKey.set(key, pid);
      keyByPid.set(pid, key);
      if (!/^nfl-p\d{5}$/.test(pid) && !/^p\d{5}$/.test(pid)) { fail(`player-ids line ${i + 1}: pid format unexpected: ${pid}`); idErrors++; }
    }
    for (const r of rows) {
      if (!pidByKey.has(r[0])) { fail('no stable id for ' + r[0] + ' (run tools/player-ids.ts sync)'); idErrors++; }
    }
    for (const k of pidByKey.keys()) {
      if (!keys.has(k)) console.warn('WARN: player-ids has key not in ratings (likely a free agent): ' + k);
    }
    if (idErrors === 0) ok(`player-ids cross-check: ${pidByKey.size} pids, all ${rows.length} ratings covered, no duplicates`);
  }
}

if (process.exitCode) { console.error('\nRESULT: FAIL'); } else { console.log('\nRESULT: PASS'); }
