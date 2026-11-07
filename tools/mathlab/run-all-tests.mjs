// mathlab/run-all-tests.mjs — Combined test runner for all mathlab tools (Super + Beam).
//
// Runs every available tool and reports PASS/FAIL for each:
//   T1  mechanics-harness.mjs     (deterministic L1 mechanics)
//   T3  triangulate.mjs           (triangulation + raw-curve witness)
//   T3b cross-validate.mjs        (Super vs Beam cross-toolchain validation)
//   T4  replacement-audit.mjs     (replacement-level auditor)
//   T12 uncertainty.mjs           (reporting law wrapper)
//   Beam raw-curve-witness.mjs    (Colors engine raw-curve export)
//   Beam triangulation.mjs        (Colors engine triangulation table)
//   Beam metamorphic-battery.mjs  (Colors engine metamorphic checks)
//   Beam replacement-level-audit.mjs (Colors engine replacement scaffold)
//
// Prerequisites: Beam tools must be extracted to /tmp first (see BEAM_TOOLS below).
// fitlm.js must be run once to produce a fit JSON (prerequisite for T1/T3/T12).
//
// Usage: node run-all-tests.mjs [--html <path>]
//
// Plain Node + playwright (for fitlm.js). No product file touched.
//
// Evidence label: VERIFIED (each tool's command + output recorded).

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();                 // tools/mathlab/ when run from there
const REPO_ROOT = path.resolve(ROOT, '..', '..'); // repo root (has colors/)
const HTML = process.argv.includes('--html')
  ? process.argv[process.argv.indexOf('--html') + 1]
  : '/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super/Football-Sim-PreColors.html';

// Beam tool files already extracted to /tmp in this session (or extract here).
const BEAM_TOOLS = {
  'raw-curve-witness.mjs': 'beam-raw-curve-witness.mjs',
  'triangulation.mjs': 'beam-triangulation.mjs',
  'metamorphic-battery.mjs': 'beam-metamorphic.mjs',
  'replacement-level-audit.mjs': 'beam-replacement.mjs',
};
const BEAM_SRC_DIR = 'tools/mathlab';

// Ensure Beam tools are extracted to /tmp from origin/council/beam.
for (const [srcName, tmpName] of Object.entries(BEAM_TOOLS)) {
  const tmpPath = '/tmp/' + tmpName;
  if (!fs.existsSync(tmpPath)) {
    try {
      const content = execSync(`git show origin/council/beam:tools/mathlab/${srcName}`, { cwd: ROOT, encoding: 'utf8' });
      fs.writeFileSync(tmpPath, content);
    } catch (e) {
      console.warn('WARNING: could not extract Beam tool', srcName, '->', tmpPath, e.message.slice(0, 100));
    }
  }
}

const results = [];
function run(name, cmd, opts = {}) {
  const t0 = Date.now();
  let output = '', ok = false, error = '';
  try {
    output = execSync(cmd, { ...opts, encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    ok = true;
  } catch (e) {
    ok = false;
    error = e.message;
    output = e.stdout ? e.stdout.toString() : '';
    if (e.stderr) output += '\nSTDERR:\n' + e.stderr.toString();
  }
  const dt = ((Date.now() - t0) / 1000).toFixed(2) + 's';
  results.push({ name, ok, dt, error });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  (${dt})`);
  if (!ok && error) console.log(`    ERROR: ${error.slice(0, 200)}`);
}

console.log('=== Mathlab combined test runner ===\n');
console.log('HTML:', HTML, '\n');

// --- Fit (prerequisite for T1/T3/T12) ---
const fitStamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const fitPath = `results/fit-runall-${fitStamp}.json`;
run('fitlm.js (prerequisite)', `node fitlm.js "${HTML}" cfg.json --out ${fitPath}`, { cwd: ROOT });

// --- Beam raw-curve-witness.mjs (generates witness for cross-validate) ---
const beamCmd = (f) => `node --experimental-strip-types /tmp/${f}`;
const beamWitness = '/tmp/beam-witness-runall.json';
run('Beam raw-curve-witness.mjs', beamCmd('beam-raw-curve-witness.mjs') + ` --out=${beamWitness}`, { cwd: REPO_ROOT });

// --- T1 mechanics harness ---
run('T1 mechanics-harness.mjs', `node mechanics-harness.mjs --fit ${fitPath} --out results/mechanics-runall.json`, { cwd: ROOT });

// --- T3 triangulation ---
run('T3 triangulate.mjs', `node triangulate.mjs --fit ${fitPath} --design design.json --threshold 0.10 --out results/triangulate-runall.json`, { cwd: ROOT });

// --- T3b cross-validate (needs Beam witness, now available) ---
run('T3b cross-validate.mjs', `node cross-validate.mjs --super ${fitPath} --beam ${beamWitness} --threshold 1.0 --out results/cross-validate-runall.json`, { cwd: ROOT });

// --- Beam triangulation.mjs ---
run('Beam triangulation.mjs', `node /tmp/beam-triangulation.mjs --in=${beamWitness}`, { cwd: REPO_ROOT });

// --- T4 replacement audit ---
run('T4 replacement-audit.mjs', `node replacement-audit.mjs --out results/replacement-runall.json`, { cwd: ROOT });

// --- Beam metamorphic-battery.mjs ---
run('Beam metamorphic-battery.mjs', beamCmd('beam-metamorphic.mjs'), { cwd: REPO_ROOT });

// --- Beam replacement-level-audit.mjs ---
run('Beam replacement-level-audit.mjs', `node /tmp/beam-replacement.mjs`, { cwd: REPO_ROOT });

// --- T12 uncertainty wrapper ---
run('T12 uncertainty.mjs', `node uncertainty.mjs ${fitPath} --threshold 0.05 --out results/uncertainty-runall.json`, { cwd: ROOT });

// --- Summary ---
console.log('\n=== SUMMARY ===');
const nPass = results.filter(r => r.ok).length;
const nFail = results.filter(r => !r.ok).length;
console.log(`Total: ${results.length}  PASS: ${nPass}  FAIL: ${nFail}`);
for (const r of results) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}  ${r.dt}`);
}
process.exit(nFail > 0 ? 1 : 0);
