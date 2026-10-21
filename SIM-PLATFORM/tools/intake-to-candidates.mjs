#!/usr/bin/env node
// intake-to-candidates.mjs — turn the Owner's raw notes into a CANDIDATE work queue.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node (>= 18). Read-only on the intake.
//
//   node intake-to-candidates.mjs --raw <dir-or-file>... --out <queue.json> [--md <summary.md>]
//
// What it does, and what it deliberately does NOT do:
//
//   DOES  - read the raw source text (the Owner's own notes and the roster lists the council
//           assembled from them), extract each player mention with its citation (source id, line,
//           kind), normalise the name, merge repeated mentions into one candidate row, and flag
//           the ambiguities a curator must resolve.
//
//   DOES NOT  - assign a rating, a position, a modern franchise, a career status, or a "peak year".
//           Under the Owner's direction (PR #4) the supplied notes are SOURCE MATERIAL: a mention
//           is not a candidate record until it has provenance, and it is not a rating until the
//           Owner approves it. The historical team abbreviation is carried through as written,
//           because the mapping to today's franchise is a judgement the curator and the Owner make.
//
// Every row is a WORK ITEM, not a record: `name`, the mentions with citations, the historical team
// abbreviations seen, the jersey numbers seen, and the open questions the curator must answer.

import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const flags = {}; const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { const k = argv[i].slice(2); const n = argv[i + 1]; flags[k] = (n && !n.startsWith('--')) ? argv[++i] : true; }
  else positional.push(argv[i]);
}
const raws = (flags.raw || []).toString ? (Array.isArray(flags.raw) ? flags.raw : [flags.raw]) : [];
const out = flags.out || 'candidate-work-queue.json';
const sport = flags.sport || 'unknown';
const label = flags.label || path.basename(out).replace(/\.json$/, '');
if (!raws.length) {
  console.error('usage: intake-to-candidates.mjs --raw <file-or-dir>... --out <queue.json> [--md <summary.md>]');
  process.exit(4);
}

// ---- read the inputs -----------------------------------------------------------------------
const files = [];
for (const r of raws) {
  const st = fs.statSync(r);
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(r)) if (f.endsWith('.txt')) files.push(path.join(r, f));
  } else files.push(r);
}

// ---- extract mentions ----------------------------------------------------------------------
// Line shapes seen in the intake:  "1. #58 Derrick Thomas [KC]"  /  "12. 1994 Jerry Rice [SF]"  /
// "Kareem Abdul-Jabbar, Milwaukee Hawks"  /  free prose. We take a conservative shape: an optional
// list marker, an optional jersey number, a name, and an optional [TEAM] tag.
// Line shapes in the intake: "1. #58 Derrick Thomas [KC]" · "12. 1994 Jerry Rice [SF]" ·
// "Kareem Abdul-Jabbar, Milwaukee Hawks" · comma-separated name lists · free prose.
// We take a conservative shape: strip a list marker, an optional 4-digit year (an era HINT, never a
// rating), an optional jersey number, capture a [TEAM] abbreviation, and split comma lists whose
// parts each look like a person. Nothing is invented: a part we cannot read is not a candidate.
const YEAR = /^(19|20)\d{2}$/;
const NAMEISH = /^[A-Z][A-Za-z.'’\-]*(?:\s+[A-Z][A-Za-z.'’\-]*){0,4}$/;
const STOP = /^(and|or|the|a|an|with|from|to|for|in|on|at|by|vs|vs\.|notes?|players?|roster|list|nfl|nba|my|favorites?|all|his|her|their|he|she|they|it|as|after|before|during|who|that|this|these|those|one|two|both|some|many|most|all|also|not|but|so|if|when|while|which|whose|because|however|although|since|until|then|than|there|here|offense|defence|defense|quarterback|receiver|running back|linebacker|cornerback|safety|kicker|punter|team|offensive|defensive|roster|depth chart|all time|all-time|prime|peak|season)\b/i;

function parseLine(text) {
  let t = text.replace(/\u00a0/g, ' ').trim();
  t = t.replace(/^\d+[.)]\s*/, '');                    // list marker
  if (!t) return [];
  const out = [];
  // a comma list of names, or "Name, Team"
  const parts = t.split(',').map(p => p.trim()).filter(Boolean);
  if (parts.length > 1) {
    const nameish = parts.filter(p => NAMEISH.test(p) && !STOP.test(p) && !YEAR.test(p));
    if (nameish.length >= 1) {
      const first = parts[0];
      let rest = first, jersey = null, abbr = null;
      const mJ = first.match(/^[#\u0027\u2018\u2019](\d{1,2})\s+(.*)$/); if (mJ) { jersey = Number(mJ[1]); rest = mJ[2]; }
      const mA = rest.match(/^(.*?)\s*\[([A-Z]{2,4})\]$/); if (mA) { rest = mA[1]; abbr = mA[2]; }
      const mY = rest.match(/^(19|20)\d{2}\s+(.*)$/); const year = mY ? Number(mY[1]) : null; if (mY) rest = mY[2];
      if (NAMEISH.test(rest) && !STOP.test(rest) && rest.length >= 3) {
        out.push({ name: rest.trim(), jersey, abbr, year, teamText: parts.slice(1).filter(p => !NAMEISH.test(p) || STOP.test(p)).join(', ') || null });
      }
      return out;
    }
    return out;
  }
  let rest = t, jersey = null, abbr = null, year = null;
  const mJ = rest.match(/^[#\u0027\u2018\u2019](\d{1,2})\s+(.*)$/); if (mJ) { jersey = Number(mJ[1]); rest = mJ[2]; }
  const mA = rest.match(/^(.*?)\s*\[([A-Z]{2,4})\]$/); if (mA) { rest = mA[1]; abbr = mA[2]; }
  const mY = rest.match(/^(19|20)\d{2}\s+(.*)$/); if (mY) { year = Number(mY[1]); rest = mY[2]; }
  rest = rest.replace(/\s*\(.*\)\s*$/, '').trim();
  if (rest.length < 3 || rest.length > 60) return out;
  if (STOP.test(rest) || YEAR.test(rest) || !NAMEISH.test(rest)) return out;
  if (/team|roster|offense|defense|special teams/i.test(rest)) return out;   // group labels, not people
  if (!/\s/.test(rest) && rest.length < 5) return out;      // a single short token is usually an abbreviation
  out.push({ name: rest, jersey, abbr, year, teamText: null });
  return out;
}

const list = [];   // {file, line, text}
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((text, i) => {
    const t = text.replace(/\u00a0/g, ' ').trim();
    if (!t || t.length > 120) return;
    if (/^(my |the |and |but |all |note|source|http|see |for |from |with |list|nfl|notes?$|players?$|roster$)/i.test(t)) return;
    list.push({ file: path.basename(f), line: i + 1, text: t });
  });
}

const candidates = new Map();   // normalised name -> row
const norm = s => s.toLowerCase().replace(/[.'’]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

for (const l of list) {
  for (const hit of parseLine(l.text)) {
    const name = hit.name.trim();
    const key = norm(name);
    if (!key) continue;
    if (!candidates.has(key)) {
      candidates.set(key, { name, key, mentions: [], jerseys: [], historical_team_abbrs: [], team_texts: [], years: [], conflicts: [] });
    }
    const row = candidates.get(key);
    row.mentions.push({ file: l.file, line: l.line, text: l.text });
    if (hit.jersey !== null && !row.jerseys.includes(hit.jersey)) row.jerseys.push(hit.jersey);
    if (hit.abbr && !row.historical_team_abbrs.includes(hit.abbr)) row.historical_team_abbrs.push(hit.abbr);
    if (hit.teamText && !row.team_texts.includes(hit.teamText)) row.team_texts.push(hit.teamText);
    if (hit.year && !row.years.includes(hit.year)) row.years.push(hit.year);
    if (row.jerseys.length > 1) row.conflicts.push(`jersey numbers seen: ${row.jerseys.join(', ')}`);
    if (row.historical_team_abbrs.length > 1) row.conflicts.push(`historical team abbreviations seen: ${row.historical_team_abbrs.join(', ')}`);
    if (row.years.length > 1) row.conflicts.push(`years seen: ${row.years.join(', ')}`);
  }
}

// ---- the same name, different person -----------------------------------------------------------
// The intake contains 3 same-name/different-person collisions (Larry Johnson, Steve Smith,
// Joe Johnson) and 69 shared surnames. A candidate whose surname matches another candidate's surname
// is flagged for the curator, never merged.
const bySurname = new Map();
for (const row of candidates.values()) {
  const parts = row.name.split(/\s+/);
  const surname = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : null;
  if (!surname) continue;
  if (!bySurname.has(surname)) bySurname.set(surname, []);
  bySurname.get(surname).push(row.key);
}
let shared = 0;
for (const [surname, keys] of bySurname) {
  if (keys.length < 2) continue;
  shared++;
  for (const k of keys) candidates.get(k).conflicts.push(`shares the surname "${surname}" with ${keys.length - 1} other candidate(s) — confirm these are different people`);
}

// ---- surname-only mentions: a POSSIBLE duplicate, never a merge --------------------------------
// Some source lists carry surname only ("Embiid"). We do not merge them: the intake contains
// same-name different-person collisions, so merging is a curator's judgement, not a script's.
// We link the possibility and let the curator confirm.
const fullNames = [...candidates.values()].filter(r => r.name.includes(' '));
const surnameIndex = new Map();
for (const r of fullNames) {
  const surname = r.name.split(/\s+/).pop().toLowerCase();
  if (!surname) continue;
  if (!surnameIndex.has(surname)) surnameIndex.set(surname, []);
  surnameIndex.get(surname).push(r);
}
let singleTokenRows = 0, linkedRows = 0;
for (const row of candidates.values()) {
  if (row.name.includes(' ')) continue;
  singleTokenRows++;
  const key0 = row.key;
  const hits = surnameIndex.get(key0) || [];
  if (hits.length) {
    linkedRows++;
    row.possible_duplicates_of = hits.map(h => ({ id: 'cand-' + h.key.replace(/ /g, '-'), name: h.name, note: 'surname-only mention — confirm with the curator, do not merge automatically' }));
  }
}

// ---- single-token identities need context, and the source itself can collide -------------------
// The NBA source is a FIRST-NAME list ("'77 Kareem", "'91 MJ"). A single token plus a jersey year is
// often enough ("'91 -> Jordan") but sometimes not: in the intake, '03 names two different people
// (Duncan and KG). Those rows are flagged, never resolved here.
const singleToken = [...candidates.values()].filter(r => !r.name.includes(' '));
const yearToNames = new Map();
for (const r of singleToken) for (const y of [...r.years, ...r.jerseys.map(String)]) {
  if (!yearToNames.has(y)) yearToNames.set(y, new Set());
  yearToNames.get(y).add(r.name);
}
let contextRequired = 0, sourceCollisions = 0;
for (const r of singleToken) {
  contextRequired++;
  const years = r.years;
  const keys = [...years, ...r.jerseys.map(String)];
  const ambiguousYears = keys.filter(y => (yearToNames.get(y) || new Set()).size > 1);
  if (ambiguousYears.length) {
    sourceCollisions++;
    r.conflicts.push(`the source's numeric prefix (${ambiguousYears.join(', ')}) also names other people — the prefix alone does not identify this person`);
  }
  r.identity_context_required = true;
  r.identity_note = 'single-token name in the source (first name or surname only): resolve with the jersey/year and the source context before this can become a person';
}

// ---- the queue ------------------------------------------------------------------------------
const rows = [...candidates.values()].map(r => ({
  id: 'cand-' + r.key.replace(/ /g, '-'),
  name: r.name,
  normalized_name: r.key,
  status: 'candidate — not a record, not a rating',
  open_questions: [
    'modern franchise (today\'s team) — the historical abbreviation(s) below are context only',
    'position candidate(s) — from the source, or from the curator\'s knowledge, flagged where sources conflict',
    'career status (active / retired / unknown) and its source',
    'is this one person or a same-name collision?',
    'peak season and the rating, once the Owner has approved the pool'
  ],
  source_mentions: r.mentions,
  numeric_prefixes_seen: r.jerseys,
  numeric_prefix_meaning: "jersey number in the football sources; peak-season year in the NBA peak list — confirm per source before use",
  years_seen: r.years,
  historical_team_abbrs: r.historical_team_abbrs,
  historical_team_texts: r.team_texts,
  conflicts: [...new Set(r.conflicts)],
  ...(r.possible_duplicates_of ? { possible_duplicates_of: r.possible_duplicates_of } : {}),
  ...(r.identity_context_required ? { identity_context_required: true, identity_note: r.identity_note } : {}),
  provenance: { kind: 'owner-supplied notes + council source list', mentions: r.mentions.length, ratings_in_source: false }
})).sort((a, b) => b.source_mentions.length - a.source_mentions.length || a.name.localeCompare(b.name));

const queue = {
  meta: {
    generated: new Date().toISOString().slice(0, 10),
    generated_by: 'tools/intake-to-candidates.mjs (MiniMax)',
    kind: 'CANDIDATE WORK QUEUE — no ratings, no positions, no franchises assigned',
    sport, label,
    note: 'Under the Owner direction (PR #4) the supplied notes are source material. A mention becomes a candidate with provenance; it becomes a rating only with the Owner\'s approval. Every row below needs a curator to answer its open_questions. The historical team abbreviation is carried through as written, because mapping it to today\'s franchise is a judgement.',
    inputs: files.map(f => path.basename(f)),
    counts: { rows: rows.length, mentions: rows.reduce((a, r) => a + r.source_mentions.length, 0), with_conflicts: rows.filter(r => r.conflicts.length).length, shared_surnames: shared,
      surname_only_rows: singleTokenRows, surname_only_linked_to_a_full_name: linkedRows,
      single_token_rows_requiring_identity_context: contextRequired, source_internal_year_collisions: sourceCollisions }
  },
  candidates: rows
};
fs.writeFileSync(out, JSON.stringify(queue, null, 2) + '\n');
console.log(`candidate work queue [${sport}]: ${rows.length} candidates, ${queue.meta.counts.mentions} mentions, ${queue.meta.counts.with_conflicts} with conflicts, ${shared} shared surnames`);
console.log('  written: ' + out + ' (' + fs.statSync(out).size + ' bytes)');
if (flags.md) {
  const md = [`# All-time NFL — candidate work queue (no ratings)`, '',
    `Generated ${queue.meta.generated} by \`tools/intake-to-candidates.mjs\` from ${queue.meta.inputs.length} source file(s).`,
    `**${rows.length} candidate identities · ${queue.meta.counts.mentions} source mentions · ${queue.meta.counts.with_conflicts} with open conflicts · ${shared} shared surnames.**`,
    '', 'Every row is a work item, not a record: no rating, no position, no franchise, no career status has been assigned.', '',
    '| name | mentions | historical abbr | jersey(s) | conflicts |', '|---|---:|---|---|---|'];
  for (const r of rows.slice(0, 60)) {
    md.push(`| ${r.name} | ${r.source_mentions.length} | ${r.historical_team_abbrs.join(' ') || '—'} | ${(r.numeric_prefixes_seen||[]).join(' ') || '—'} | ${r.conflicts.length ? r.conflicts.join('; ').slice(0, 90) : '—'} |`);
  }
  md.push('', `_(showing 60 of ${rows.length}; the JSON is the full queue)_`, '');
  fs.writeFileSync(flags.md, md.join('\n'));
  console.log('  summary: ' + flags.md);
}
