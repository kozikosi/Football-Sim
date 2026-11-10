#!/usr/bin/env node
// tools/mathlab/witness.mjs — raw-curve witness (CICCP-3 Q1; per-build gate, seconds, zero product bytes).
// Question it answers: is the DISPLAYED default weight list a measurement of the engine, or an echo of a table?
//   raw   = slotWinsPerOvr()   (the engine's own wins per rating point, 70 -> 90)
//   disp  = modelWeights()     (what the page shows as the default "measured impact")
//   table = DEFAULT_WEIGHTS    (a target / preset table)
// Verdicts:
//   MEASURED  every measured slot satisfies |disp - c*raw| <= TOL, c = disp[QB]/raw[QB] (one scale for all slots)
//   ECHO      disp equals the table on every slot AND the raw curve does not track it: the "measurement" is the target (absorbed)
//   FITTED    disp equals the table AND the raw curve tracks it: the engine was fitted to the table, so agreement is by construction,
//             not independent evidence (the Colors-track situation); label it as a fit or a preset
//   UNEXPLAINED  neither
// Exit 0 on MEASURED, or on ECHO/FITTED only with --declared-preset (the build labels the list a preset, not a measurement).
// It detects echo, not truth: MEASURED means "the display is not a copy of the table", nothing more.
//   node tools/mathlab/witness.mjs <build.html> [--declared-preset] [--json OUT]
//   node tools/mathlab/witness.mjs --selftest
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';

const TOL = 5; // quantisation step of the shipped display is 5 (nearest 5, floor 5)

function sandboxEval(html) {
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let m; const parts = [];
  while ((m = re.exec(html))) { if (/\bsrc\s*=/.test(m[1])) continue; parts.push(m[2]); }
  let script = parts.join('\n');
  for (const pat of [/initPlayerBrowser\(\);/g, /initGroupRankings\(\);/g, /initDraftSetup\(\);/g,
    /buildControls\(\); render\(\);/g, /setActiveTab\('viewDraft','tabDraftBtn'\);/g]) {
    script = script.replace(pat, 'void 0;');
  }
  const nothing = new Proxy(function () {}, {
    get(_, k) { if (k === Symbol.toStringTag) return 'nothing'; if (k === Symbol.toPrimitive) return () => ''; return nothing; },
    apply() { return nothing; }, construct() { return nothing; },
  });
  const scope = {
    document: nothing, window: nothing, localStorage: nothing, sessionStorage: nothing,
    location: nothing, navigator: nothing, screen: nothing, history: nothing,
    performance: { now: () => 0 }, MutationObserver: nothing,
    setTimeout: () => {}, setInterval: () => {}, clearTimeout: () => {}, clearInterval: () => {},
    requestAnimationFrame: () => 0, fetch: () => Promise.reject(new Error('no network')),
    Event: function () {}, customElements: nothing,
    console: { log() {}, error() {}, warn() {}, info() {}, debug() {} },
  };
  const assigns = Object.keys(scope).map((k) => `const ${k} = __scope__.${k};`).join('\n');
  const seedSrc = `let __seed = 123456;\nMath.random = () => { __seed = (__seed * 16807) % 2147483647; return __seed / 2147483647; };\n`;
  const grab = (n) => `${n}: typeof ${n} === 'undefined' ? undefined : ${n}`;
  const body = `'use strict';\n${assigns}\n${seedSrc}${script}\nreturn { ${['slotWinsPerOvr', 'modelWeights', 'DEFAULT_WEIGHTS', 'ROSTER_SLOTS'].map(grab).join(', ')} };\n`;
  // vm with a hard timeout: a build the sandbox cannot run must report UNREADABLE, never hang the gate
  return vm.runInNewContext(`(function(){ ${body} })()`, { __scope__: scope }, { timeout: 30000 });
}

// Static leg (no execution): a modelWeights() that never references the raw curve cannot be a measurement.
export function staticEcho(html) {
  const i = html.search(/function\s+modelWeights\s*\(\s*\)\s*\{/);
  if (i < 0) return { found: false };
  let j = html.indexOf('{', i), depth = 0, k = j;
  for (; k < html.length; k++) { if (html[k] === '{') depth++; else if (html[k] === '}' && --depth === 0) break; }
  const body = html.slice(j, k + 1);
  return { found: true, body, usesRaw: /slotWinsPerOvr|slotWins\s*\(|slotWinsTable/.test(body) };
}

export function judge(raw, disp, table, slots) {
  const ks = slots.filter((k) => raw[k] != null && disp[k] != null);
  const c = disp.QB / raw.QB;
  let maxDev = 0, worst = '';
  for (const k of ks) { const d = Math.abs(disp[k] - c * raw[k]); if (d > maxDev) { maxDev = d; worst = k; } }
  const echo = ks.every((k) => disp[k] === table[k]);
  const verdict = echo ? (maxDev <= TOL ? 'FITTED' : 'ECHO') : (maxDev <= TOL ? 'MEASURED' : 'UNEXPLAINED');
  return { verdict, scale: c, maxDev, worst, slots: ks.length, echo };
}

function run(file, declaredPreset, jsonOut) {
  const buf = fs.readFileSync(file);
  const sha = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 16);
  const st = staticEcho(buf.toString('utf8'));
  if (st.found && !st.usesRaw) {
    console.log(`WITNESS ${file}\n  sha256 ${sha} · ${buf.length} B\n  static leg: modelWeights() never references the raw curve (slotWinsPerOvr/slotWins/slotWinsTable); body: ${st.body.replace(/\s+/g, ' ').slice(0, 140)}\n  VERDICT: ECHO (static)${declaredPreset ? ' (declared preset)' : ''}`);
    return declaredPreset ? 0 : 1;
  }
  let E;
  try { E = sandboxEval(buf.toString('utf8')); }
  catch (e) { console.log(`WITNESS ${file} sha256 ${sha}: UNREADABLE (sandbox could not run the inline script: ${e.message})`); return 2; }
  if (typeof E.slotWinsPerOvr !== 'function' || typeof E.modelWeights !== 'function' || !E.DEFAULT_WEIGHTS || !E.ROSTER_SLOTS) {
    console.log(`WITNESS ${file} sha256 ${sha}: UNREADABLE (needs slotWinsPerOvr, modelWeights, DEFAULT_WEIGHTS, ROSTER_SLOTS)`);
    return 2;
  }
  const raw = E.slotWinsPerOvr(), disp = E.modelWeights(), table = E.DEFAULT_WEIGHTS;
  const r = judge(raw, disp, table, E.ROSTER_SLOTS);
  const dispHash = crypto.createHash('sha256').update(JSON.stringify(Object.keys(disp).sort().map((k) => [k, disp[k]]))).digest('hex').slice(0, 12);
  const tableHash = crypto.createHash('sha256').update(JSON.stringify(Object.keys(table).sort().map((k) => [k, table[k]]))).digest('hex').slice(0, 12);
  const label = (r.verdict === 'ECHO' || r.verdict === 'FITTED') && declaredPreset ? `${r.verdict} (declared preset/fit)` : r.verdict;
  console.log(`WITNESS ${file}\n  sha256 ${sha} · ${buf.length} B · slots compared ${r.slots}\n  display-vector ${dispHash} · table-vector ${tableHash}\n  fitted scale c=${r.scale.toFixed(4)} · max |disp - c*raw| = ${r.maxDev.toFixed(2)} (${r.worst}), tolerance ${TOL}\n  display equals table on every slot: ${r.echo}\n  VERDICT: ${label}`);
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ file, sha256_16: sha, bytes: buf.length, ...r, verdict: label, dispHash, tableHash }, null, 1));
  return (r.verdict === 'MEASURED' || ((r.verdict === 'ECHO' || r.verdict === 'FITTED') && declaredPreset)) ? 0 : 1;
}

function selftest() {
  let ok = true; const t = (n, c) => { console.log(`  ${c ? 'PASS' : 'FAIL'}  ${n}`); if (!c) ok = false; };
  const slots = ['QB', 'WR1', 'K'];
  const raw = { QB: 2.54, WR1: 1.19, K: 0.51 };
  const q = (k) => Math.max(5, Math.round(raw[k] / 2.54 * 700 / 5) * 5);
  const measured = { QB: q('QB'), WR1: q('WR1'), K: q('K') };
  const table = { QB: 1000, WR1: 650, K: 50 };
  t('measured display -> MEASURED', judge(raw, measured, table, slots).verdict === 'MEASURED');
  t('display == table, raw does not track -> ECHO', judge(raw, { ...table }, table, slots).verdict === 'ECHO');
  t('display neither -> UNEXPLAINED', judge(raw, { QB: 700, WR1: 600, K: 400 }, table, slots).verdict === 'UNEXPLAINED');
  t('display == table and raw tracks it -> FITTED (not independent)', judge({ QB: 1, WR1: 0.65, K: 0.05 }, { ...table }, table, slots).verdict === 'FITTED');
  t('static: verbatim-table modelWeights -> echo', staticEcho('function modelWeights(){\n return {...DEFAULT_WEIGHTS};\n}').usesRaw === false);
  t('static: measuring modelWeights -> uses raw', staticEcho('function modelWeights(){ const w = slotWinsPerOvr(); return w; }').usesRaw === true);
  t('static: nested braces handled', staticEcho('function modelWeights(){ const o={a:{b:1}}; if(1){ return slotWinsPerOvr(); } } function other(){ slotWinsPerOvr(); }').usesRaw === true);
  console.log(ok ? 'WITNESS SELFTEST PASS' : 'WITNESS SELFTEST FAIL');
  return ok ? 0 : 1;
}

const a = process.argv.slice(2);
if (a.includes('--selftest')) process.exit(selftest());
const ji = a.indexOf('--json');
const file = a.find((x, i) => !x.startsWith('--') && !(ji >= 0 && i === ji + 1));
if (!file) { console.error('usage: witness.mjs <build.html> [--declared-preset] [--json OUT] | --selftest'); process.exit(2); }
process.exit(run(file, a.includes('--declared-preset'), ji >= 0 ? a[ji + 1] : null));
