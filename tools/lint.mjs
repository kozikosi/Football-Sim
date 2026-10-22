#!/usr/bin/env node
// tools/lint.mjs — the council's one lint entry point. Plain Node (>= 18), no dependencies.
//
//   node tools/lint.mjs product Football-Sim-V21.html          lint the product's inline script
//   node tools/lint.mjs files tools/lint.mjs tests/foo.mjs     lint specific tooling files
//   node tools/lint.mjs extract Football-Sim-V21.html [out.js] only extract (no Biome needed)
//   node tools/lint.mjs selftest                               check this wrapper against the real Biome
//   flags: --baseline <file>  --update-baseline  --strict (new warnings fail too)  --biome <path>
//
// What it guarantees (each is tested by `selftest` or by the stub test in the report):
//  1. The product file is READ ONLY here: it is read once, its sha256 is taken before and after the
//     run, and the run fails (exit 5) if the bytes changed. Biome is only ever pointed at a scratch
//     copy under tools/biome-product/scratch/ (gitignored). The wrapper refuses --write/--fix/--unsafe
//     and never invokes `biome format`.
//  2. Every diagnostic is reported against the ORIGINAL file's line number (the extraction keeps a
//     line map), with the source line quoted.
//  3. Findings are split into NEW (not in the baseline) and KNOWN (in tools/lint-baseline.json). Only
//     NEW errors fail the run (exit 1). The baseline key is rule + trimmed source text, not the line
//     number, so unrelated edits above a known finding do not turn it into a "new" one.
//
// Exit codes: 0 clean (no new errors) · 1 new error(s) · 3 Biome missing or its output unreadable
// (UNVERIFIED — never read as a pass) · 4 usage · 5 the product file changed during the run.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const PRODUCT_CFG_DIR = path.join(here, 'biome-product');
const SCRATCH_DIR = path.join(PRODUCT_CFG_DIR, 'scratch');
const argv = process.argv.slice(2);
const flags = {}; const pos = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { const k = argv[i].slice(2); flags[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; }
  else pos.push(argv[i]);
}
for (const bad of ['write', 'fix', 'unsafe', 'apply', 'apply-unsafe']) {
  if (flags[bad]) { console.error(`refused: --${bad} is not allowed. This tool only reads.`); process.exit(4); }
}
const BASELINE = path.resolve(flags.baseline && flags.baseline !== true ? flags.baseline : path.join(here, 'lint-baseline.json'));
const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

// ---- extraction -----------------------------------------------------------------------------
// Returns the concatenated inline <script> text and a map from each scratch line to the original line.
export function extractScripts(htmlBuf) {
  const html = htmlBuf.toString('utf8');
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let m; const parts = []; const map = []; // map[i] = original 1-based line of scratch line i+1
  while ((m = re.exec(html))) {
    if (/\bsrc\s*=/.test(m[1])) continue; // external script: not ours
    if (/type\s*=\s*["']?(?!text\/javascript|module)/i.test(m[1]) && /type\s*=/.test(m[1])) continue; // json/templates
    const start = m.index + m[0].indexOf('>') + 1;
    const firstLine = html.slice(0, start).split('\n').length; // 1-based line holding the script's first char
    const lines = m[2].split('\n');
    for (let i = 0; i < lines.length; i++) map.push(firstLine + i);
    parts.push(m[2]);
  }
  return { script: parts.join('\n'), map, blocks: parts.length };
}

// ---- locating Biome -------------------------------------------------------------------------
function findBiome() {
  const cands = [flags.biome, process.env.BIOME_BIN, 'biome'].filter((c) => c && c !== true);
  for (const c of cands) { const r = spawnSync(c, ['--version'], { encoding: 'utf8' }); if (r.status === 0) return { bin: c, version: r.stdout.trim() }; }
  const r = spawnSync('npx', ['--no-install', 'biome', '--version'], { encoding: 'utf8', cwd: root });
  if (r.status === 0) return { bin: 'npx --no-install biome', version: r.stdout.trim(), npx: true };
  return null;
}
function runBiome(biome, args) {
  const full = ['lint', '--reporter=json', '--colors=off', ...args];
  const r = biome.npx ? spawnSync('npx', ['--no-install', 'biome', ...full], { encoding: 'utf8', cwd: root, maxBuffer: 1 << 28 })
    : spawnSync(biome.bin, full, { encoding: 'utf8', cwd: root, maxBuffer: 1 << 28 });
  return r;
}

// ---- parsing Biome's JSON report ------------------------------------------------------------
// Shape relied on (Biome 2.x --reporter=json): { diagnostics: [ { category, severity, description,
// location: { path: { file }, span: [startByte, endByte] } } ] }. If it is not that shape we say so.
export function parseReport(stdout) {
  const i = stdout.indexOf('{'); if (i < 0) return null;
  let j; try { j = JSON.parse(stdout.slice(i)); } catch { return null; }
  if (!Array.isArray(j.diagnostics)) return null;
  return j.diagnostics.map((d) => ({
    rule: String(d.category || '').replace(/^lint\//, ''),
    severity: d.severity || 'error',
    message: d.description || '',
    file: d.location?.path?.file ?? d.location?.path ?? '',
    start: Array.isArray(d.location?.span) ? d.location.span[0] : null,
  })).filter((d) => d.rule.startsWith('lint') || d.rule.includes('/') || d.rule);
}
const lineOfOffset = (buf, off) => { let n = 1; for (let k = 0; k < off && k < buf.length; k++) if (buf[k] === 10) n++; return n; };
const norm = (s) => s.replace(/\s+/g, ' ').trim().slice(0, 200);

// ---- baseline ------------------------------------------------------------------------------
const loadBaseline = () => (fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : { counts: {} });
function classify(found, baseline) {
  const seen = {}; const out = [];
  for (const d of found.sort((a, b) => a.line - b.line)) {
    const key = `${d.target}::${d.rule}::${d.text}`;
    seen[key] = (seen[key] || 0) + 1;
    d.isNew = seen[key] > (baseline.counts[key] || 0);
    out.push(d);
  }
  return out;
}
function report(all, label) {
  const news = all.filter((d) => d.isNew), known = all.length - news.length;
  console.log(`\n${label}: ${all.length} finding(s) — ${news.length} NEW, ${known} known (baseline)`);
  for (const d of news) console.log(`  NEW ${d.severity.padEnd(7)} ${d.target}:${d.line}  ${d.rule}\n      ${d.message}\n      > ${d.text}`);
  return news;
}
function writeBaseline(all) {
  const counts = {}; for (const d of all) { const k = `${d.target}::${d.rule}::${d.text}`; counts[k] = (counts[k] || 0) + 1; }
  fs.writeFileSync(BASELINE, JSON.stringify({ note: 'pre-existing findings; regenerate with --update-baseline only after reviewing them', counts }, null, 1) + '\n');
  console.log(`baseline written: ${BASELINE} (${Object.keys(counts).length} distinct, ${all.length} total)`);
}

// ---- modes ---------------------------------------------------------------------------------
const mode = pos[0];
function needBiome() {
  const b = findBiome();
  if (!b) { console.error('UNVERIFIED: Biome was not found (tried --biome, $BIOME_BIN, `biome`, `npx --no-install biome`). This is not a pass.'); process.exit(3); }
  return b;
}
function lintProduct(file) {
  const before = fs.readFileSync(file); const h0 = sha(before);
  const { script, map, blocks } = extractScripts(before);
  fs.mkdirSync(SCRATCH_DIR, { recursive: true });
  const scratch = path.join(SCRATCH_DIR, 'product-script.js'); fs.writeFileSync(scratch, script);
  const scratchBuf = Buffer.from(script, 'utf8');
  const b = needBiome();
  const r = runBiome(b, [`--config-path=${PRODUCT_CFG_DIR}`, scratch]);
  const after = sha(fs.readFileSync(file));
  if (after !== h0) { console.error(`FAIL: ${file} changed during the lint run (${h0.slice(0, 12)} -> ${after.slice(0, 12)}).`); process.exit(5); }
  const diags = parseReport(r.stdout || '');
  if (!diags) { console.error('UNVERIFIED: could not read Biome\'s JSON report. Raw output follows; this is not a pass.\n' + (r.stdout || '') + (r.stderr || '')); process.exit(3); }
  const lines = scratchBuf.toString('utf8').split('\n');
  const all = diags.map((d) => { const sl = d.start == null ? 1 : lineOfOffset(scratchBuf, d.start); return { ...d, target: path.basename(file), line: map[sl - 1] ?? sl, text: norm(lines[sl - 1] || '') }; });
  console.log(`product ${file}  sha256 ${h0.slice(0, 16)}  ${blocks} inline script block(s)  biome ${b.version}  (file unchanged: verified)`);
  return all;
}
function lintFiles(files) {
  const b = needBiome(); const all = [];
  const hashes = files.map((f) => sha(fs.readFileSync(f)));
  const r = runBiome(b, files);
  files.forEach((f, i) => { if (sha(fs.readFileSync(f)) !== hashes[i]) { console.error(`FAIL: ${f} changed during the lint run.`); process.exit(5); } });
  const diags = parseReport(r.stdout || '');
  if (!diags) { console.error('UNVERIFIED: could not read Biome\'s JSON report.\n' + (r.stdout || '') + (r.stderr || '')); process.exit(3); }
  for (const d of diags) {
    const f = path.resolve(root, d.file); const buf = fs.existsSync(f) ? fs.readFileSync(f) : Buffer.alloc(0);
    const ln = d.start == null ? 1 : lineOfOffset(buf, d.start);
    all.push({ ...d, target: path.relative(root, f), line: ln, text: norm(buf.toString('utf8').split('\n')[ln - 1] || '') });
  }
  return all;
}
function finish(all, label) {
  if (flags['update-baseline']) { writeBaseline(all); process.exit(0); }
  const classified = classify(all, loadBaseline());
  const news = report(classified, label);
  const failing = news.filter((d) => d.severity === 'error' || flags.strict);
  console.log(failing.length ? `\nexit 1 — ${failing.length} new finding(s) introduced` : '\nexit 0 — nothing new introduced');
  process.exit(failing.length ? 1 : 0);
}

if (mode === 'extract') {
  const f = pos[1]; if (!f) { console.error('usage: lint.mjs extract <html> [out.js]'); process.exit(4); }
  const buf = fs.readFileSync(f); const { script, map, blocks } = extractScripts(buf);
  const out = pos[2]; if (out) fs.writeFileSync(out, script);
  console.log(`${f}: sha256 ${sha(buf)} · ${blocks} inline script block(s) · ${map.length} lines · original lines ${map[0]}..${map[map.length - 1]}${out ? ' · wrote ' + out : ''}`);
} else if (mode === 'product') {
  if (!pos[1]) { console.error('usage: lint.mjs product <html>'); process.exit(4); }
  finish(lintProduct(pos[1]), 'product script');
} else if (mode === 'files') {
  if (pos.length < 2) { console.error('usage: lint.mjs files <paths...>'); process.exit(4); }
  finish(lintFiles(pos.slice(1)), 'files');
} else if (mode === 'selftest') {
  // Runs the REAL Biome on a tiny fixture with known defects and checks that this wrapper finds them on
  // the right original lines, reports a clean line as clean, and leaves the fixture untouched.
  const b = needBiome();
  const fixture = ['<!doctype html><html><body>', '<script>', 'let a = 1, b = 2;', 'if (a == b) { console.log(a); }', 'var old = 3;', 'let p = 0, q = {}; if (p = q.x) { console.log(p); }', 'const ok = document.createElement("div"); console.log(ok);', '</script>', '</body></html>', ''].join('\n');
  const tmp = path.join(SCRATCH_DIR, 'selftest.html'); fs.mkdirSync(SCRATCH_DIR, { recursive: true }); fs.writeFileSync(tmp, fixture);
  const all = lintProduct(tmp);
  const has = (rule, line) => all.some((d) => d.rule.endsWith(rule) && d.line === line);
  const checks = [['noVar @5', has('noVar', 5)], ['noAssignInExpressions @6', has('noAssignInExpressions', 6)],
    ['no false alarm for document.* @7 (else add javascript.globals)', !all.some((d) => d.line === 7 && /Undeclared/.test(d.rule))]];
  let bad = 0; for (const [n, ok] of checks) { console.log(`  ${ok ? 'ok ' : 'MISMATCH'} ${n}`); if (!ok) bad++; }
  console.log('diagnostics seen:', all.map((d) => `${d.rule}@${d.line}`).join(', ') || 'none');
  console.log(bad ? `\nSELFTEST FAILED (${bad})` : '\nSELFTEST PASSED — the wrapper reads this Biome correctly');
  process.exit(bad ? 1 : 0);
} else {
  console.error(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 8).join('\n').replace(/^\/\/ ?/gm, ''));
  process.exit(4);
}
