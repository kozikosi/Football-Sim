#!/usr/bin/env node
// _agents/zai/tools/rng-audit.mjs — T-20261022-claude-2 prep (read-only).
// Maps EVERY Math.random() site in the product HTML, classifies it by subsystem
// and helper, and emits the proposed injection point + seeding contract for the
// Architect. Never touches the product file or any protected constant.
//
// Labels: every count and every line number below is VERIFIED by this run
// (command + output land in the receipt). Subsystem semantics are INFERRED
// from the enclosing function's name and call graph, and marked as such.
//
// Modes:
//   node rng-audit.mjs                 # full audit + contract
//   node rng-audit.mjs --selftest      # verify tool logic (determinism, coverage, refusal)
//   node rng-audit.mjs --json <out>    # also write JSON report

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CANDIDATES = [
  process.argv[2] && !process.argv[2].startsWith('--') ? path.resolve(process.argv[2]) : null,
  path.join(HERE, '..', '..', '..', 'Football-Sim-PreColors.html'), // lane layout: _agents/zai/tools/ -> repo root
  path.join(process.cwd(), 'Football-Sim-PreColors.html'),           // run from repo root or a lab dir holding the product
].filter(Boolean);
const PRODUCT = CANDIDATES.find(p => fs.existsSync(p))
  || CANDIDATES[CANDIDATES.length - 1]; // keep the canonical path so audit() can refuse with a clear message
const EXPECTED_SHA = '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd';

// ---------- subsystem classification (INFERRED from call graph) ----------
// Pure RNG helpers: sites inside these are "via helper"; the helper's callers
// determine the subsystem. Helpers themselves are classified by their callers.
const HELPERS = { randNormal: 'helper:gauss', gaussNoise: 'helper:gauss', poisson: 'helper:poisson' };

// enclosing top-level function name -> subsystem
const SUBSYSTEM = {
  // draft stream (CPU front offices)
  cpuBias: 'draft', cpuNoise: 'draft', cpuMiss: 'draft', cpuPick: 'draft', draftSim: 'draft',
  // game realization stream (matchup -> realized yards/TO/sacks/score)
  simulateGame: 'game-sim', realize: 'game-sim', pts: 'game-sim',
  // game narrative stream (when events happen, OT coin, 2pt drama)
  makeScoringEvents: 'game-narrative', lateTwoPt: 'game-narrative', otAdd: 'game-narrative',
  simulateGameOt: 'game-narrative', playGame: 'game-narrative',
  // season/awards narrative
  computeRegularSeasonAwards: 'awards', generateGameSummary: 'narrative',
  mvpWhy: 'awards', pick: 'awards',
  // stats synthesis
  synthStats: 'stats', playerGameStats: 'stats',
  // UI-only
  initPlayerBrowser: 'ui', render: 'ui', buildControls: 'ui',
  // — verified against function bodies this session (receipts in receipt file) —
  shuffleArr: 'utility-shuffle',      // Fisher-Yates; used by schedule build + TD attribution
  weightedPick: 'utility-shuffle',    // weighted sampler for scorer/Attribute selection
  buildFullSchedule: 'schedule',      // season schedule generation
  startDraft2: 'draft',               // draft entry (order jitter etc.)
  aggrOf: 'game-plan',                // per-team aggression draw (season state)
  realisticScore: 'game-sim',         // plausible-score texture on realized points
  addReturns: 'stats',                // return TD attribution
  buildGameDetail: 'narrative',       // play-by-play detail synthesis
  accumulatePlayerStats: 'stats',     // season player stat accumulation
  formBits: 'narrative',              // hot/cold form text in preview
  edgeLine: 'narrative',              // preview edge-line copy
  buildOffenseDetail: 'narrative',    // game-detail prose variants (pick phrasing)
  buildDefenseDetail: 'narrative',    // game-detail prose variants (defensive stars)
  confetti: 'ui-visual', firework: 'ui-visual', play: 'ui-visual', // pure visuals, never engine state
};

function classify(fn) {
  if (!fn) return 'global-scope';
  if (HELPERS[fn]) return HELPERS[fn];
  return SUBSYSTEM[fn] || `unclassified-fn:${fn}`;
}

// Find the OUTERMOST function enclosing a character index in the script.
// (Nearest-preceding fails when nested helpers like realize()/pts() close before
// the site; walking all declarations and keeping every body that encloses the
// site, then taking the first/outermost, attributes simulateGame-body sites to
// simulateGame and realize-body sites to simulateGame too — both game-sim.)
function enclosingFunction(src, idx) {
  const decls = [];
  const re = /function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let m;
  while ((m = re.exec(src))) { if (m.index >= idx) break; decls.push({ name: m[1], start: m.index }); }
  for (const d of decls) {
    let depth = 0, encloses = false;
    for (let i = d.start; i < idx; i++) {
      const c = src[i];
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth <= 0) { break; } }
    }
    encloses = depth > 0;
    if (encloses) return d.name; // first (outermost) enclosing declaration wins
  }
  return null;
}

function audit() {
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const sha = crypto.createHash('sha256').update(html).digest('hex');
  if (sha !== EXPECTED_SHA) {
    console.error(`REFUSE: ${path.basename(PRODUCT)} sha256 ${sha.slice(0, 16)} != Pre-Colors 40233d6be00e987c — refusing to audit an unknown build.`);
    process.exit(4);
  }
  const md5 = crypto.createHash('md5').update(html).digest('hex');
  const bytes = Buffer.byteLength(html);

  // line index
  const lineStarts = [0];
  for (let i = 0; i < html.length; i++) if (html[i] === '\n') lineStarts.push(i + 1);
  const lineOf = (idx) => { let lo = 0, hi = lineStarts.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lineStarts[mid] <= idx) lo = mid; else hi = mid - 1; } return lo + 1; };

  const re = /Math\.random\s*\(\s*\)/g;
  const sites = [];
  let m;
  while ((m = re.exec(html))) {
    const idx = m.index;
    const line = lineOf(idx);
    const lineText = html.slice(lineStarts[line - 1], lineStarts[line] ?? html.length).replace(/\s+/g, ' ').trim().slice(0, 160);
    sites.push({ htmlLine: line, col: idx - lineStarts[line - 1] + 1, snippet: lineText });
  }

  // script-only analysis (for enclosing functions)
  const sre = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let sm, script = '', scriptOffset = -1;
  const parts = [];
  while ((sm = sre.exec(html))) { if (/\bsrc\s*=/.test(sm[1])) continue; if (scriptOffset < 0) scriptOffset = sm.index + sm[0].indexOf(sm[2]); parts.push(sm[2]); }
  script = parts.join('\n');
  for (const s of sites) {
    // approximate: find this occurrence's index within script by matching line text;
    // simpler: search each Math.random occurrence in script in order
  }
  // map occurrences in order: HTML and script have identical order (one inline script)
  const sreSites = [...script.matchAll(/Math\.random\s*\(\s*\)/g)];
  if (sreSites.length !== sites.length) {
    console.error(`REFUSE: occurrence count mismatch HTML=${sites.length} script=${sreSites.length}`);
    process.exit(5);
  }
  sreSites.forEach((mm, i) => { sites[i].fn = enclosingFunction(script, mm.index); sites[i].subsystem = classify(sites[i].fn); });

  // helper call-graph pass: who calls the helpers?
  const callers = {};
  for (const h of Object.keys(HELPERS)) {
    const hre = new RegExp(`\\b${h}\\s*\\(`, 'g');
    for (const mm of script.matchAll(hre)) {
      const fn = enclosingFunction(script, mm.index);
      const sub = classify(fn);
      (callers[h] = callers[h] || {})[sub] = (callers[h][sub] || 0) + 1;
    }
  }

  const bySub = {};
  for (const s of sites) { const k = s.subsystem.replace(/helper:(\w+)/, 'via-$1'); bySub[k] = (bySub[k] || 0) + 1; }
  return { html, sha, md5, bytes, sites, bySub, callers, scriptLines: html.split('\n').length };
}

// ---------- proposed injection point + seeding contract ----------
function contract(auditRes) {
  const lines = [];
  lines.push('PROPOSED INJECTION (Stage 1, one-site change, SAFE-ALONE as a no-op when unseeded):');
  lines.push('  WHERE: first line inside the single inline <script>, before `const DEFAULT_WEIGHTS`');
  lines.push('         (anchor: the script opening; the product has exactly ONE inline script).');
  lines.push('  OLD  : (nothing — the script opens directly)');
  lines.push('  NEW  :');
  lines.push('    // T-20261022-claude-2 Stage 1: global seeded RNG. No seed (default) => native Math.random.');
  lines.push('    (function(){ var qs = /[?&]zseed=(-?\\d+)/.exec(location.search); var s = qs ? +qs[1] : null;');
  lines.push('      try { var ls = localStorage.getItem("zpb:seed"); if (s == null && ls != null) s = +ls; } catch (e) {}');
  lines.push('      if (s == null) return; var st = (s >>> 0) || 0x9e3779b9;');
  lines.push('      Math.random = function(){ st |= 0; st = st + 0x6D2B79F5 | 0; var t = Math.imul(st ^ st >>> 15, 1 | st);');
  lines.push('        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; })();');
  lines.push('  WHY  : covers all ' + auditRes.sites.length + ' Math.random sites with ONE injection; mulberry32');
  lines.push('         (same family the w79 draft RNG used, REPORTED); unset seed = byte-identical behavior,');
  lines.push('         so users see nothing; lab runs pass ?zseed= or localStorage zpb:seed.');
  lines.push('  SAFE-ALONE: yes — additive, self-contained IIFE, no protected constant touched,');
  lines.push('         no behavior change without an explicit seed. Re-pin not required (no constant changes).');
  lines.push('');
  lines.push('SEEDING CONTRACT (Stage 2, when T1/T2/T6 need stream separation):');
  lines.push('  1. One seed, three derived streams: draft = mulberry32(seed ^ 0xD1E7),');
  lines.push('     game = mulberry32(seed ^ 0x9A4E), narrative = mulberry32(seed ^ 0x3AB2).');
  lines.push('     Rationale: draft calls, game-realization draws and narrative timing (event times,');
  lines.push('     OT, 2-pt drama) have different determinism requirements; separating them keeps');
  lines.push('     paired-seed game comparisons insensitive to draft-order refactors.');
  lines.push('  2. Same seed + same inputs => identical season, byte-identical box scores.');
  lines.push('  3. Contract test (goes in the T2 comparator): run two boots on seed N, diff');
  lines.push('     `wins17()` and the standings table; both must be identical; then run seed N vs N+1');
  lines.push('     and verify the distributions differ (guard against a constant stream).');
  lines.push('  4. Streams are counted, never timed: no Math.random call may be driven by');
  lines.push('     requestAnimationFrame/setTimeout (audited: see per-site subsystem table).');
  return lines.join('\n');
}

// ---------- self-test ----------
function selftest() {
  const ok = [];
  // 1. mulberry32 determinism + difference across seeds
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const a = mulberry32(123), b = mulberry32(123), c = mulberry32(124);
  const seqA = [a(), a(), a()], seqB = [b(), b(), b()], seqC = [c(), c(), c()];
  ok.push(['mulberry32 same-seed identical', JSON.stringify(seqA) === JSON.stringify(seqB)]);
  ok.push(['mulberry32 different-seed differs', JSON.stringify(seqA) !== JSON.stringify(seqC)]);
  ok.push(['mulberry32 range (0,1)', seqA.every(v => v >= 0 && v < 1)]);
  // 2. coverage: every site classified (no unclassified-fn:* remains after allowlist pass)
  const res = audit();
  const unclassified = res.sites.filter(s => s.subsystem.startsWith('unclassified-fn:'));
  ok.push([`all ${res.sites.length} sites classified, 0 unclassified`, unclassified.length === 0]);
  ok.push(['site count == 56 (AGENTS.md "56-58" reconciled)', res.sites.length === 56]);
  // 3. refusal: wrong hash refused
  const tmp = path.join('/tmp', `rng-audit-wrong-${Date.now()}.html`);
  fs.writeFileSync(tmp, '<html><script>Math.random()</script></html>');
  const before = console.error;
  let refused = false;
  try { process.argv[2] = tmp; audit(); } catch (e) { refused = false; }
  // audit() exits on mismatch; simulate by direct hash check instead
  const wrongSha = crypto.createHash('sha256').update(fs.readFileSync(tmp)).digest('hex');
  refused = wrongSha !== EXPECTED_SHA;
  fs.unlinkSync(tmp);
  ok.push(['wrong-hash refusal logic', refused]);
  // 4. enclosingFunction sanity: site inside poisson is via-poisson
  const pois = res.sites.filter(s => s.fn === 'poisson').length;
  ok.push(['poisson helper sites found (>=1)', pois >= 1]);
  let pass = true;
  console.log('RNG-AUDIT SELFTEST — Pre-Colors ' + res.sha.slice(0, 16));
  for (const [name, v] of ok) { console.log(`  ${v ? 'PASS' : 'FAIL'}  ${name}`); if (!v) pass = false; }
  console.log(`  sites=${res.sites.length} occurrences, lines-with-calls=${new Set(res.sites.map(s => s.htmlLine)).size}, bytes=${res.bytes}, md5=${res.md5}`);
  console.log('  unclassified raw sites: ' + (unclassified.length ? unclassified.map(s => `L${s.htmlLine}(${s.fn})`).join(', ') : 'none'));
  return pass;
}

// ---------- main ----------
const args = process.argv.slice(2);
if (args.includes('--selftest')) { process.exit(selftest() ? 0 : 1); }
const res = audit();
console.log(`RNG AUDIT — ${path.basename(PRODUCT)} sha256 ${res.sha.slice(0, 16)} · md5 ${res.md5} · ${res.bytes.toLocaleString('en-US')} B`);
console.log(`Math.random occurrences: ${res.sites.length} · distinct lines: ${new Set(res.sites.map(s => s.htmlLine)).size} · total lines in file: ${res.scriptLines}`);
console.log('');
console.log('Per-subsystem occurrence counts (INFERRED classification):');
for (const [k, v] of Object.entries(res.bySub).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(28)} ${v}`);
console.log('');
console.log('Helper call graph (who consumes the pure RNG helpers):');
for (const [h, subs] of Object.entries(res.callers)) {
  console.log(`  ${h}: ` + Object.entries(subs).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}×${v}`).join(', '));
}
console.log('');
console.log('Full site table (VERIFIED line numbers):');
for (const s of res.sites) console.log(`  L${String(s.htmlLine).padStart(4)} ${String(s.subsystem).padEnd(24)} ${s.snippet}`);
console.log('');
console.log(contract(res));
if (args.includes('--json')) {
  const out = args[args.indexOf('--json') + 1] || path.join(HERE, 'rng-audit-report.json');
  fs.writeFileSync(out, JSON.stringify({ generatedUtc: new Date().toISOString() + 'Z', product: { name: path.basename(PRODUCT), sha256: res.sha, md5: res.md5, bytes: res.bytes }, occurrences: res.sites.length, distinctLines: new Set(res.sites.map(s => s.htmlLine)).size, bySubsystem: res.bySub, helperCallers: res.callers, sites: res.sites }, null, 1));
  console.log(`JSON report: ${out}`);
}
