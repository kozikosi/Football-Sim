#!/usr/bin/env node
// _agents/zai/tools/heldout-lint.mjs — held-out data lint (read-only, static).
// Answers brainstorm Q20 (stricter held-out lint): verifies that FIT scripts in the
// named paths do NOT read
//   (a) 2024 or 2025 season data (the held-out years), and
//   (b) the salary table (it must stay an independent anchor, never a fit input).
// ANCHOR scripts (validation/holdout consumers — e.g. realcheck.js scoring against
// real wins) are ALLOWED to read held-out years: holding data out only matters if
// something tests on it. Anchors are matched by file name from a manifest; the
// manifest should live at tools/mathlab/heldout-manifest.json (Architect-owned);
// until it exists this lint uses a built-in REPORTED default list.
// A violation is a READ pattern (fs.readFile/readFileSync/read/open/CSV path/
// fetch URL/JSON path string) whose argument or enclosing string mentions the
// held-out year or the salary table — comments alone do not count as reads but
// ARE flagged as `comment-reference` for human review.
//
// Usage:
//   node heldout-lint.mjs [paths...]            # default: tools/mathlab, _agents
//   node heldout-lint.mjs --selftest

import fs from 'node:fs';
import path from 'node:path';

const HELDOUT_YEARS = ['2024', '2025'];
const SALARY_TOKENS = ['salary', 'salaries', 'SALARY', 'Salary'];
const READ_RE = /(readFile(?:Sync)?\s*\(|\.read\s*\(|\bopen\s*\(|createReadStream|fetch\s*\(|['"`][^'"`]*\.(?:csv|json|txt)['"`])/;
const EXTS = new Set(['.mjs', '.js', '.py', '.sh']);
// Anchor allowlist (REPORTED names from the vloc toolchain, 2026-11-08). A manifest
// at tools/mathlab/heldout-manifest.json {"anchors": [..], "fit": [..]} overrides this.
const DEFAULT_ANCHORS = ['realcheck.js', 'cross-validate.mjs', 'uncertainty.mjs', 'uncertainty-v2.mjs', 'weights-measure.mjs', 'metamorphic-battery.mjs', 'heldout-lint.mjs', 'run-all.sh', 'run-all-vloc-tests.mjs', 'run-all-tests.mjs'];
const MANIFEST = 'tools/mathlab/heldout-manifest.json';
function anchorList() {
  try { const m = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); if (Array.isArray(m.anchors)) return { list: m.anchors, source: MANIFEST }; } catch (e) { /* no manifest: use defaults */ }
  return { list: DEFAULT_ANCHORS, source: 'built-in default (REPORTED; no manifest found)' };
}
const isAnchor = (fp, anchors) => anchors.some(a => fp.endsWith(a) || fp.endsWith('/' + a) || path.basename(fp) === a);

function lintFile(fp) {
  const src = fs.readFileSync(fp, 'utf8');
  const lines = src.split('\n');
  const hits = [];
  lines.forEach((line, i) => {
    const isComment = /^\s*(\/\/|#|\*)/.test(line);
    const reads = READ_RE.test(line);
    const yearHit = HELDOUT_YEARS.some(y => line.includes(y));
    const salHit = SALARY_TOKENS.some(t => line.includes(t));
    if (!(yearHit || salHit)) return;
    hits.push({
      line: i + 1,
      kind: reads ? (isComment ? 'comment-reference' : 'READ-ADJACENT') : (isComment ? 'comment-reference' : 'string-reference'),
      heldout: yearHit ? 'year' : null, salary: salHit,
      text: line.trim().slice(0, 140),
    });
  });
  return { file: fp, hits };
}

function collect(paths) {
  const files = [];
  const walk = (p) => {
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      for (const e of fs.readdirSync(p)) {
        if (e === 'node_modules' || e.startsWith('.')) continue;
        walk(path.join(p, e));
      }
    } else if (EXTS.has(path.extname(p))) files.push(p);
  };
  for (const p of paths) if (fs.existsSync(p)) walk(p);
  return files;
}

function run(paths) {
  const anchors = anchorList();
  const files = collect(paths);
  const violations = [], references = [], anchorReads = [];
  for (const f of files) {
    const { hits } = lintFile(f);
    for (const h of hits) {
      if (h.kind === 'READ-ADJACENT') {
        if (isAnchor(f, anchors.list)) anchorReads.push({ ...h, file: f });
        else violations.push({ ...h, file: f });
      } else references.push({ ...h, file: f });
    }
  }
  console.log(`HELD-OUT LINT — scanned ${files.length} script files under: ${paths.join(', ')}`);
  console.log(`  held-out years: ${HELDOUT_YEARS.join(', ')} · salary tokens: ${SALARY_TOKENS.join(', ')}`);
  console.log(`  anchor allowlist source: ${anchors.source} (${anchors.list.length} entries)`);
  console.log(`  READ-ADJACENT violations: ${violations.length} · anchor reads (allowed): ${anchorReads.length} · non-read references: ${references.length}`);
  for (const v of violations) console.log(`  VIOLATION ${v.file}:${v.line} [${v.heldout ? 'year' : ''}${v.salary ? ' salary' : ''}] ${v.text}`);
  for (const a of anchorReads) console.log(`  anchor-read ${a.file}:${a.line} [allowed: validation anchor] ${a.text}`);
  for (const r of references) console.log(`  reference ${r.file}:${r.line} [${r.kind}] ${r.text}`);
  console.log(violations.length
    ? `RESULT: FAIL — ${violations.length} fit-script violation(s). Fit scripts must not read held-out years or the salary table.`
    : 'RESULT: PASS — no fit script reads held-out years or the salary table as data (anchor reads shown above are validation uses).');
  return violations.length === 0;
}

function selftest() {
  const dir = fs.mkdtempSync('/tmp/heldout-lint-test-');
  fs.writeFileSync(path.join(dir, 'clean.mjs'), "// fits on 2020-2023 margins\nconst x = readFileSync('data/nflverse-standings-2020-2023.csv');\n");
  fs.writeFileSync(path.join(dir, 'bad1.mjs'), "const y = readFileSync('data/nflverse-standings-2020-2024.csv');\n");
  fs.writeFileSync(path.join(dir, 'bad2.py'), "sal = pd.read_csv('data/salary_table.csv')\n");
  fs.writeFileSync(path.join(dir, 'realcheck.js'), "const w = readFileSync('wins2025.json'); // anchor: allowed\n");
  fs.writeFileSync(path.join(dir, 'note.mjs'), "// TODO: cross-check vs 2024 later (comment only, no read)\n");
  const ok = [];
  const res = run([dir]);
  ok.push(['clean file passes and violations caught', res === false]);
  // re-run silently per-file to count
  const files = collect([dir]);
  const bad = files.filter(f => lintFile(f).hits.some(h => h.kind === 'READ-ADJACENT') && !isAnchor(f, DEFAULT_ANCHORS));
  ok.push(['exactly 2 violating files (anchor realcheck.js allowed)', bad.length === 2]);
  const noteRefs = lintFile(path.join(dir, 'note.mjs')).hits;
  ok.push(['comment-only reference flagged as reference, not violation', noteRefs.length === 1 && noteRefs[0].kind === 'comment-reference']);
  for (const [name, v] of ok) console.log(`  ${v ? 'PASS' : 'FAIL'}  ${name}`);
  fs.rmSync(dir, { recursive: true, force: true });
  return ok.every(([, v]) => v);
}

const args = process.argv.slice(2);
if (args.includes('--selftest')) process.exit(selftest() ? 0 : 1);
const paths = args.length ? args : ['tools/mathlab', '_agents'];
process.exit(run(paths) ? 0 : 1);
