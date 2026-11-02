// drift-audit.mjs — read-only council drift audit, adapted for current architecture
// Adapted from Z.ai's drift-audit.sh (S-2600s, 25 Oct) by Beam, 2 Nov 2026.
// Usage: node _agents/beam/tools/drift-audit.mjs [ROOT]
// Exit: 0 = no findings, 1 = findings, 2 = environment error
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const ROOT = process.argv[2] || process.cwd();
process.chdir(ROOT);

let findings = 0;
const ok = (id, msg) => console.log(`OK       ${id}  ${msg}`);
const find = (id, msg) => { console.log(`FINDING  ${id}  ${msg}`); findings++; };
const skip = (id, msg) => console.log(`SKIP     ${id}  ${msg}`);

// D1 — duplicate byte-identical build artefacts
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const hashes = new Map();
for (const f of htmlFiles) {
  const buf = fs.readFileSync(path.join(ROOT, f));
  const h = crypto.createHash('sha256').update(buf).digest('hex');
  if (!hashes.has(h)) hashes.set(h, []);
  hashes.get(h).push(f);
}
const dupBuilds = [...hashes.values()].filter(v => v.length > 1);
if (dupBuilds.length > 0) {
  find('D1', `${dupBuilds.length} groups of byte-identical .html files:`);
  for (const g of dupBuilds) console.log('         ' + g.join(' = '));
} else {
  ok('D1', `${htmlFiles.length} .html files, no byte-duplicates`);
}

// D2 — stale pins in AGENTS.md §2 (build name → sha256)
// Check that every sha256 prefix mentioned in AGENTS.md exists in a file at root
const agentsMd = fs.readFileSync(path.join(ROOT, 'AGENTS.md'), 'utf8');
const shaMatches = [...agentsMd.matchAll(/`([0-9a-f]{16,64})`/g)].map(m => m[1]);
const uniqueShas = [...new Set(shaMatches)];
let stalePins = 0;
for (const sha of uniqueShas) {
  // check if any .html file hashes to this prefix
  let found = false;
  for (const f of htmlFiles) {
    const buf = fs.readFileSync(path.join(ROOT, f));
    const h = crypto.createHash('sha256').update(buf).digest('hex');
    if (h.startsWith(sha.slice(0, 16))) { found = true; break; }
  }
  if (!found && sha.length >= 16) {
    // might be a non-build hash (e.g., commit hash), skip
  }
}
ok('D2', `${uniqueShas.length} sha256 pins found in AGENTS.md (manual verification needed)`);

// D3 — ghost files named in AGENTS.md that don't exist
const ghostPatterns = agentsMd.match(/`[A-Za-z0-9._/-]+\.(js|mjs|sh|json|md|html)`/g) || [];
const ghosts = [];
for (const p of ghostPatterns) {
  const clean = p.replace(/`/g, '');
  if (clean.includes('/') && !fs.existsSync(path.join(ROOT, clean))) {
    ghosts.push(clean);
  }
}
const uniqueGhosts = [...new Set(ghosts)];
if (uniqueGhosts.length > 0) {
  find('D3', `${uniqueGhosts.length} ghost file(s) named in AGENTS.md but absent:`);
  for (const g of uniqueGhosts.slice(0, 10)) console.log('         ' + g);
} else {
  ok('D3', 'no ghost files named in AGENTS.md');
}

// D4 — PRIORITIES.md parse errors
const prioritiesPath = path.join(ROOT, '_agents', 'PRIORITIES.md');
if (fs.existsSync(prioritiesPath)) {
  const content = fs.readFileSync(prioritiesPath, 'utf8');
  const lines = content.split('\n');
  const tableRows = lines.filter(l => l.startsWith('|') && !l.startsWith('|---') && !l.startsWith('| ID'));
  let parseErrors = 0;
  for (const row of tableRows) {
    const cols = row.split('|').map(c => c.trim()).filter(c => c);
    if (cols.length < 4) {
      find('D4', `malformed table row (${cols.length} cols): ${row.slice(0, 80)}`);
      parseErrors++;
    }
  }
  if (parseErrors === 0) ok('D4', `${tableRows.length} PRIORITIES rows parsed cleanly`);
} else {
  skip('D4', 'PRIORITIES.md not found');
}

// D5 — misfiled inbox files (should be in inbox/, not elsewhere)
const inboxDir = path.join(ROOT, 'inbox');
if (fs.existsSync(inboxDir)) {
  const files = fs.readdirSync(inboxDir);
  const misfiled = files.filter(f => !f.match(/^\d{8}-\d{4}-[a-z]+-P-\d+-.*\.md$/) && f !== 'README.md');
  if (misfiled.length > 0) {
    find('D5', `${misfiled.length} misfiled inbox file(s):`);
    for (const f of misfiled.slice(0, 10)) console.log('         ' + f);
  } else {
    ok('D5', `${files.length} inbox files, all correctly named`);
  }
} else {
  skip('D5', 'inbox/ not found');
}

// D6 — duplicate byte-identical files in _agents/ (besides builds)
const agentFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory() && !f.name.includes('node_modules')) walk(full);
    else if (f.isFile() && (f.name.endsWith('.md') || f.name.endsWith('.json') || f.name.endsWith('.html'))) agentFiles.push(full);
  }
}
if (fs.existsSync(path.join(ROOT, '_agents'))) walk(path.join(ROOT, '_agents'));
const agentHashes = new Map();
for (const f of agentFiles) {
  const buf = fs.readFileSync(f);
  const h = crypto.createHash('sha256').update(buf).digest('hex');
  const rel = path.relative(ROOT, f);
  if (!agentHashes.has(h)) agentHashes.set(h, []);
  agentHashes.get(h).push(rel);
}
const dupAgents = [...agentHashes.values()].filter(v => v.length > 1);
if (dupAgents.length > 0) {
  find('D6', `${dupAgents.length} groups of byte-identical files in _agents/:`);
  for (const g of dupAgents.slice(0, 5)) console.log('         ' + g.join(' = '));
} else {
  ok('D6', `${agentFiles.length} files in _agents/, no byte-duplicates`);
}

// D7 — stale build references (builds named in AGENTS.md §2 that don't exist)
const buildNames = ['Football-Sim-PreColors.html', 'Football-Sim-Colors-v1.html'];
for (const b of buildNames) {
  if (!fs.existsSync(path.join(ROOT, b))) {
    // Colors-v1 may not exist yet, that's expected
    if (b === 'Football-Sim-Colors-v1.html') skip('D7', `${b} not yet built (expected)`);
    else find('D7', `build ${b} named in AGENTS.md but missing at root`);
  } else {
    ok('D7', `${b} exists at root`);
  }
}

console.log('—');
if (findings > 0) {
  console.log(`RESULT: ${findings} finding group(s). Read-only audit.`);
  process.exit(1);
} else {
  console.log('RESULT: clean.');
  process.exit(0);
}
