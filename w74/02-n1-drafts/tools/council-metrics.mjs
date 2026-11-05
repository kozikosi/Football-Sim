#!/usr/bin/env node
// council-metrics.mjs — generates docs/council/metrics.md so the numbers cannot rot.
// (The exhibit's versioning law: metrics are generated, never hand-written.)
//
// Usage:
//   node tools/council-metrics.mjs --out docs/council/metrics.md \
//        [--tests <count>]              # CI passes the count from its test step; else `npm test` runs
//        [--repo <path>]                # repo root (default: cwd)
//        [--artifacts name=bytes,md5 …] # explicit artifact rows when BASELINES.md is not present
//        [--findings f.json]            # contract findings summary {open:n, closed:n, refs:[…]}
//        [--curve results.json]         # calibration curve JSON (tools/outcomelab/calibration-curve.ts output)
//        [--telemetry t.json]           # council telemetry JSON (tools/council-telemetry.mjs output)
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 ? process.argv[i + 1] : d; };
const repo = arg('repo', process.cwd());
const out = arg('out', 'docs/council/metrics.md');

// ---- tests ----
let tests = arg('tests', null);
if (!tests) {
  try { const o = execSync('npm test', { cwd: repo, encoding: 'utf8', timeout: 600000 });
    tests = (o.match(/tests (\d+)/) || [])[1]; } catch (e) { tests = (String(e.stdout).match(/tests (\d+)/) || [])[1]; }
}

// ---- artifacts (from BASELINES.md, or explicit rows) ----
let artifacts = [];
const bl = `${repo}/BASELINES.md`;
if (fs.existsSync(bl)) {
  for (const m of fs.readFileSync(bl, 'utf8').matchAll(/\|\s*`?([0-9a-f]{32})`?\s*\|/g)) artifacts.push({ name: 'BASELINES row', md5: m[1].slice(0, 8) });
}
for (const a of (arg('artifacts', '') || '').split(',').filter(Boolean)) {
  const [name, bytes, md5] = a.split('=');
  artifacts.push({ name, bytes, md5 });
}

// ---- debt (grep the frozen shell anchor if present) ----
let debt = null;
const shell = `${repo}/Football-Sim-Z-post-blue-w70.html`;
if (fs.existsSync(shell)) {
  const t = fs.readFileSync(shell, 'utf8');
  debt = { mathRandomLines: (t.match(/Math.random/g) || []).length, windowSites: (t.match(/window\./g) || []).length };
}

const findings = arg('findings', null) && JSON.parse(fs.readFileSync(arg('findings'), 'utf8'));
const curve = arg('curve', null) && JSON.parse(fs.readFileSync(arg('curve'), 'utf8'));
const tele = arg('telemetry', null) && JSON.parse(fs.readFileSync(arg('telemetry'), 'utf8'));

const L = [];
L.push('# Council metrics — generated');
L.push('');
L.push(`Generated ${new Date().toISOString()} by \`tools/council-metrics.mjs\`. Hand-edits to this file are reverted by the next run; change the inputs instead.`);
L.push('');
L.push('## The suite');
L.push('');
L.push(`- Tests passing: **${tests}** (node:test, "node --test --experimental-strip-types")`);
L.push(`- Generated at: ${new Date().toISOString().slice(0, 10)}`);
L.push('');
L.push('## Pinned artifacts');
L.push('');
L.push('| Artifact | Size (B) | md5 (first 8) |');
L.push('|---|---|---|');
for (const a of artifacts) L.push(`| ${a.name} | ${a.bytes ?? '—'} | \`${a.md5}\` |`);
if (debt) {
  L.push('');
  L.push('## Known debt in the frozen shell (report-only)');
  L.push('');
  L.push(`- \`Math.random\` occurrences: **${debt.mathRandomLines}** (43 lines / 62 occurrences at the w70 audit)`);
  L.push(`- \`window.*\` sites: **${debt.windowSites}** (185 at the w68 inventory)`);
  L.push('');
  L.push('Rulings: all die with the shell; the rebuild ports the laws, not the quirks. See the debt inventories (v1, v2a) in the archive trail.');
}
if (findings) {
  L.push('');
  L.push('## Contract findings');
  L.push('');
  L.push(`- Open: **${findings.open}** · closed/ruled: **${findings.closed}**`);
  for (const r of findings.refs) L.push(`- ${r}`);
}
if (curve) {
  L.push('');
  L.push('## Conversion curve — bands vs measured (one chart)');
  L.push('');
  L.push(`Target band (Owner, 5 Nov): top-30 pickers **80 % playoffs / 25 % Super Bowl / 10 % title**. Measured at N=${Object.values(curve.curve)[0].n} per policy, paired seeds:`);
  L.push('');
  L.push('| Policy | Playoffs | Super Bowl | Title | Mean wins |');
  L.push('|---|---|---|---|---|');
  for (const [p, r] of Object.entries(curve.curve)) L.push(`| ${p} | ${(100 * r.pPlayoffs).toFixed(1)}% | ${(100 * r.pSB).toFixed(1)}% | ${(100 * r.pTitle).toFixed(1)}% | ${r.meanWins} |`);
  L.push('');
  L.push('![conversion curve](calibration-curve.svg)');
  L.push('');
  L.push('Method and pre-registration: `tools/outcomelab/CALIBRATION.md` in the repository.');
}
if (tele) {
  L.push('');
  L.push('## Review process telemetry');
  L.push('');
  L.push(`- Reviews filed: **${tele.reviews}** across **${tele.seats}** seats; median unique-catch rate **${tele.medianCatch}%** (details + curves: [telemetry.html](telemetry.html))`);
}
fs.mkdirSync(out.split('/').slice(0, -1).join('/') || '.', { recursive: true });
fs.writeFileSync(out, L.join('\n') + '\n');
console.log('written: ' + out);
