// pw4.js — 100-season regression (S-102, Beam draft)
// Usage: node tests/pw4.js [path/to/build.html] [--write-baseline] [--replace-baseline <ruling-ID>]
// Exit codes (per tests/CONTRACT.md C4): 0 pass, 1 finding, 2 baseline absent, 3 extraction, 4 usage.
// Runs 100 seeded seasons, checks win correlation r > 0.6 (target).
// Requires SIM-CORE markers and DOM-free entry points (buildDraftState, simulateDraftHeadless, buildLeagueFromDraft).
// Without those, exits 3 (extraction failure).

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--')) || path.join(__dirname, '..', 'NFL Draft Simulator v20 Claude.html');
const writeBaseline = args.includes('--write-baseline');
const replaceBaseline = args.find(a => a.startsWith('--replace-baseline='))?.split('=')[1];

if (!fs.existsSync(file)) { console.error('FAIL pw4 4: missing input file'); process.exit(4); }

// Check for SIM-CORE markers
const html = fs.readFileSync(file, 'utf8');
if (!html.includes('/*SIM-CORE-START*/') || !html.includes('/*SIM-CORE-END*/')) {
  console.error('FAIL pw4 3: SIM-CORE markers not found (extraction failure)');
  process.exit(3);
}

// Extract core
const start = html.indexOf('/*SIM-CORE-START*/');
const end = html.indexOf('/*SIM-CORE-END*/') + '/*SIM-CORE-END*/'.length;
const core = html.slice(start, end);

// Check markers appear exactly once
if (html.indexOf('/*SIM-CORE-START*/') !== html.lastIndexOf('/*SIM-CORE-START*/')) {
  console.error('FAIL pw4 3: SIM-CORE-START appears more than once');
  process.exit(3);
}
if (html.indexOf('/*SIM-CORE-END*/') !== html.lastIndexOf('/*SIM-CORE-END*/')) {
  console.error('FAIL pw4 3: SIM-CORE-END appears more than once');
  process.exit(3);
}

// vm check
const vm = require('vm');
try { new vm.Script(core); } catch (e) {
  console.error('FAIL pw4 3: core does not parse: ' + e.message);
  process.exit(3);
}

// Check baseline
const baselinePath = path.join(__dirname, 'baseline.json');
if (!writeBaseline && !fs.existsSync(baselinePath)) {
  console.error('FAIL pw4 2: baseline absent (run with --write-baseline first)');
  process.exit(2);
}

// Placeholder: actual 100-season sim requires DOM-free entry points
console.log('INFO: SIM-CORE markers found and core parses');
console.log('INFO: DOM-free entry points (buildDraftState, simulateDraftHeadless, buildLeagueFromDraft) not yet present');
console.log('FAIL pw4 3: entry points missing (extraction failure)');
process.exit(3);
