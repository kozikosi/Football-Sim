#!/usr/bin/env node
// tools/check-tasks.mjs — minimal reference implementation of the task-registry contract.
// Contract checked:
//   1. every entry has an id;
//   2. ids are unique;
//   3. house form complete (WHERE · WHAT · WHY · SAFE ALONE? · HOW TO CHECK);
//   4. protected-constant entries flagged;
//   5. body-only ids (present in prose, not as headings) flagged.
// Usage: node tools/check-tasks.mjs <file> [<file> ...]

import fs from 'node:fs';

const HOUSE_FIELDS = ['WHERE', 'WHAT', 'WHY', 'SAFE ALONE', 'HOW TO CHECK'];
const PROTECTED = /DEFAULT_WEIGHTS|FLEX|NATURAL_SLOT_MAP|PLAN_K|RATING_SPECS|MC/i;
const ID_RE = /^P\d+-[A-Za-z0-9]+$/i;

function headingId(line) {
  const m = line.match(/^(#{1,6})\s+(.+?)\s*$/);
  if (!m) return null;
  const tok = m[2].trim().split(/\s+/)[0] || '';
  return ID_RE.test(tok) ? tok : null;
}

function parse(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const entries = [];
  let cur = null;
  for (const l of lines) {
    const h = l.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (h) { if (cur) entries.push(cur); cur = { heading: l, id: headingId(l), body: [] }; continue; }
    if (cur) cur.body.push(l);
  }
  if (cur) entries.push(cur);
  return entries;
}

function checkFile(file) {
  const problems = [];
  const entries = parse(file);
  const headingIds = new Set();
  for (const e of entries) if (e.id) headingIds.add(e.id);
  const seen = new Map();
  for (const e of entries) {
    if (!e.id) { problems.push(`${file}: heading without id: ${e.heading.trim()}`); continue; }
    if (seen.has(e.id)) problems.push(`${file}: duplicate id ${e.id} (also in ${seen.get(e.id)})`);
    else seen.set(e.id, file);
    const body = e.body.join('\n');
    const low = body.toLowerCase();
    const missing = HOUSE_FIELDS.filter((f) => !low.includes(f.toLowerCase()));
    if (missing.length) problems.push(`${file}: entry ${e.id} house form incomplete (missing: ${missing.join(', ')})`);
    const protHit = PROTECTED.test(e.id + ' ' + body);
    const flagged = /protected|flag/i.test(e.heading + ' ' + body);
    if (protHit && !flagged) problems.push(`${file}: entry ${e.id} touches protected constant without flag`);
    const re = /P\d+-[A-Za-z0-9]+/g;
    let mm;
    const b = body;
    while ((mm = re.exec(b)) !== null) { const bid = mm[0]; if (!headingIds.has(bid)) problems.push(`${file}: entry ${e.id}: id ${bid} present only in body text, not heading`); }
  }
  const ids = [...seen.keys()];
  for (const a of ids) { for (const b of ids) {
    if (a !== b && a.startsWith(b) && a.length > b.length && /^[a-z]/i.test(a.charAt(b.length))) problems.push(`${file}: prefix collision between ids ${b} and ${a}`);
  } }
  return { file, entries, problems };
}

const files = process.argv.slice(2);
const rows = [];
const problems = [];
for (const f of files) { const r = checkFile(f); for (const p of r.problems) problems.push(`${r.file}: ${p}`); rows.push(r); }
for (const r of rows) console.log(`${r.file} :: entries=${r.entries.length} :: problems=${r.problems.length}`);
for (const p of problems) console.error('  x ' + p);
process.exit(problems.length ? 1 : 0);
