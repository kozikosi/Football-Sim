#!/usr/bin/env node
// quarantine-sample-pool.mjs — turn a sample/illustrative pool into a SAFE example, in one command.
//
// MiniMax · 20 Oct 2026. Dependency-free plain Node (>= 18). Never edits the input file.
//
//   node quarantine-sample-pool.mjs <pool.json> [--out <safe.json>] [--fixture-dir <dir>]
//
// Why: two files appeared in the working tree with invented player ratings in canonical-looking
// paths (sports/football/ratings.json, sports/basketball/all_time_draft.json — reported in
// bulletin M-84, confirmed by Beam in M-89). AGENTS.md forbids inventing player ratings. The
// cheapest safe end-state is not "delete the example" but "make the example unmistakably an
// example": names that cannot be mistaken for people, a provenance marker on every record, and a
// path that says what it is.
//
// What it does, and does not do:
//   - writes a NEW file (default: <fixture-dir>/<name>.example.json) and never touches the input;
//   - renames each player to "Example Player <A|B|C…>" and each team to "Example Team <n>";
//   - stamps provenance {source: "example", source_version, source_date, raters: [], batch,
//     review_state: "example — not real ratings"};
//   - prints the exact command that replaces the original in place (one mv), for the owner of the
//     file to run — this tool will not move another seat's file.
//   - verifies the result with the platform validator if a build is supplied.

import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const flags = {}; const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { const k = argv[i].slice(2); const n = argv[i + 1]; flags[k] = (n && !n.startsWith('--')) ? argv[++i] : true; }
  else positional.push(argv[i]);
}
const input = positional[0];
if (!input || !fs.existsSync(input)) {
  console.error('usage: quarantine-sample-pool.mjs <pool.json> [--out <safe.json>] [--fixture-dir <dir>]');
  process.exit(4);
}
const data = JSON.parse(fs.readFileSync(input, 'utf8'));
const records = Array.isArray(data) ? data : (data.records || data.players || []);
if (!records.length) { console.error('no records in ' + input); process.exit(4); }

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letter = i => LETTERS[i % 26] + (i >= 26 ? String(Math.floor(i / 26)) : '');
const teamIds = new Map();
const out = {
  meta: {
    ...(data.meta || {}),
    EXAMPLE: true,
    example_notice: 'EXAMPLE DATA — every name, team and rating in this file is synthetic and must never be used as a rating. It exists to demonstrate the record shape only.',
    quarantined_from: path.basename(input),
    quarantined_on: new Date().toISOString().slice(0, 10)
  },
  records: records.map((r, i) => {
    const name = `Example Player ${letter(i)}`;
    const teamRaw = r.team || (Array.isArray(r.teams) ? r.teams[0] : null) || 'Example Team';
    if (!teamIds.has(teamRaw)) teamIds.set(teamRaw, `Example Team ${teamIds.size + 1}`);
    const team = teamIds.get(teamRaw);
    const rec = { ...r, name, team, teams: [team] };
    if (Array.isArray(r.positions)) rec.positions = r.positions; // position codes stay (they are vocabulary, not ratings)
    rec.provenance = { source: 'example', source_version: 'quarantine-sample-pool v1', source_date: new Date().toISOString().slice(0, 10), raters: [], batch: 'example', review_state: 'example — synthetic, not a rating' };
    return rec;
  })
};
const dir = flags['fixture-dir'] || path.join(path.dirname(input), 'fixtures');
const outFile = flags.out || path.join(dir, path.basename(input).replace(/\.json$/, '') + '.example.json');
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
console.log('safe example written: ' + outFile + ' (' + out.records.length + ' records)');
console.log('  the input file was NOT modified: ' + input);
console.log('  to replace it in place (the owner of the file should run this):');
console.log(`    mv ${JSON.stringify(outFile)} ${JSON.stringify(input)}`);
console.log('  then validate:');
console.log(`    node SIM-PLATFORM/tools/validate-dataset.mjs ${JSON.stringify(input)} --fromBuild "NFL Draft Simulator v20 Claude.html" --teams 32 --slots 26`);
