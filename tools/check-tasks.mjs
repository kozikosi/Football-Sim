#!/usr/bin/env node
// tools/check-tasks.mjs — validates the task registry: one JSON file per item in tasks/.
//   node tools/check-tasks.mjs            validate everything, print a table, exit 1 on any problem
//   node tools/check-tasks.mjs --dir X    validate another directory (used by the self-test)
// Why one file per item: seats write different paths, so two seats can never overwrite each other's entry
// (the bulletin lost writes and reused ids because everyone rewrote one big file).
// Plain Node >= 18, no dependencies.
import fs from 'node:fs';
import path from 'node:path';
const dirArg = process.argv.indexOf('--dir');
const dir = dirArg > 0 ? process.argv[dirArg + 1] : 'tasks';
const STATES = ['proposed', 'accepted', 'implemented', 'verified', 'owner-accepted'];
const FAILURE_CLASSES = ['data-gap', 'signal-corruption', 'referential-drift', 'capability-gap'];
const rank = (s) => STATES.indexOf(s);
const problems = []; const seen = new Map(); const rows = [];
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort() : [];
for (const f of files) {
  const bad = (m) => problems.push(`${f}: ${m}`);
  let t; try { t = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { bad(`not valid JSON (${e.message})`); continue; }
  const id = t.id;
  if (!/^T-\d{8}-[a-z0-9]+-\d+$/.test(id || '')) bad(`id must look like T-YYYYMMDD-<seat>-<n> (got ${JSON.stringify(id)})`);
  if (id && `${id}.json` !== f) bad(`file name must be ${id}.json`);
  if (seen.has(id)) bad(`duplicate id (also ${seen.get(id)})`); else seen.set(id, f);
  if (!t.title || typeof t.title !== 'string') bad('title is required');
  if (!STATES.includes(t.state)) { bad(`state must be one of ${STATES.join(' | ')}`); continue; }
  const r = rank(t.state);
  if (!/^[0-9a-f]{8,64}$/.test(t.base_build_sha || '')) bad('base_build_sha must be 8-64 lowercase hex characters (the build this item was measured against)');
  if (r >= 1 && !t.seat) bad('accepted and later items need "seat" (who holds or held the claim)');
  if (t.seat && !t.claimed_at) bad('"claimed_at" (ISO date) is required when "seat" is set');
  if (r >= 2) {
    if (!Array.isArray(t.evidence) || !t.evidence.length) bad('implemented needs evidence[] (command + result)');
    else for (const e of t.evidence) if (!e || !e.command || !e.result) bad('every evidence entry needs command and result');
  }
  if (r >= 3) {
    const v = t.verification;
    if (!v || !v.seat || !v.command || !v.result) bad('verified needs verification {seat, command, result}');
    else if (v.seat === t.seat) bad('verification.seat must differ from seat (the implementer does not verify their own work)');
  }
  if (r >= 4 && !t.owner_decision) bad('owner-accepted needs owner_decision (quote or reference)');
  // CICCP-3 optional fields: absent is fine (nothing old breaks); present must be well-formed
  if ('goal_invariant' in t && (typeof t.goal_invariant !== 'string' || !t.goal_invariant.trim())) bad('goal_invariant must be a non-empty string (the Owner\'s verbatim line)');
  if ('depends_on' in t && (!Array.isArray(t.depends_on) || t.depends_on.some((d) => typeof d !== 'string' || !d.trim()))) bad('depends_on must be an array of non-empty strings (ids, file#anchor or decisions)');
  if ('failure_class' in t && !FAILURE_CLASSES.includes(t.failure_class)) bad(`failure_class must be one of ${FAILURE_CLASSES.join(' | ')}`);
  if ('caught_at_hop' in t && ![1, 2, 3].includes(t.caught_at_hop)) bad('caught_at_hop must be 1 (review), 2 (test order) or 3 (Owner or production)');
  rows.push([id, t.state, t.seat || '-', (t.base_build_sha || '').slice(0, 8), t.title]);
}
for (const x of rows) console.log(x.join('  |  '));
console.log(`\n${files.length} item(s), ${problems.length} problem(s)`);
for (const p of problems) console.error('  ✗ ' + p);
process.exit(problems.length ? 1 : 0);
