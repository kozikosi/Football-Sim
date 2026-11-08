#!/usr/bin/env node
// tools/mathlab/metamorphic-battery.mjs — T7 Metamorphic battery (deterministic, read-only).
//
// Read-only: reads the product's inline engine via sandbox eval; never touches the
// product file or any protected constants (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP,
// MC, PLAN_K, RATING_SPECS, modelWeights() contract).
//
// Checks (all deterministic, no RNG needed at this layer):
//   1. Identical-roster symmetry: same inputs => identical teamRatings output
//   2. Monotonicity: raising one slot's OVR never lowers its unit rating
//   3. Uniform +5 OVR: no single slot claims >40% of total upgrade value
//   4. Name-independence: swapping two players' names (same OVR/pos) changes nothing
//   5. Color-independence: swapping team colors changes nothing (engine has no color term)
//   6. matchupModel monotonicity: raising one slot's OVR never lowers structPts
//
// The metamorphic properties are properties of the pure engine math (slotWins /
// teamRatings / matchupModel), which are deterministic. Games themselves need the
// injectable RNG (task T-20261022-claude-2) for seeded repetition, but structPts-based
// checks do not.
//
// Output: stdout report + exit code (0 = all pass, 1 = any fail).
//
// Usage: node metamorphic-battery.mjs

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const PRODUCT = path.join(ROOT, 'Football-Sim-PreColors.html');
const EXPECTED_SHA = '40233d6be00e987c';
const SHA_BEFORE = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
if (!SHA_BEFORE.startsWith(EXPECTED_SHA)) {
  console.error(`REFUSE: product hash ${SHA_BEFORE.slice(0, 16)} != expected Pre-Colors ${EXPECTED_SHA}`);
  process.exit(4);
}

// --- Sandbox eval: extract engine functions ---
function sandboxEval(html) {
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let m, parts = [];
  while ((m = re.exec(html))) {
    if (/\bsrc\s*=/.test(m[1])) continue;
    parts.push(m[2]);
  }
  let script = parts.join('\n');
  // Neutralize DOM- and UI-dependent calls so the engine loads headless.
  for (const pat of [/initPlayerBrowser\(\);/g, /initGroupRankings\(\);/g, /initDraftSetup\(\);/g,
                     /buildControls\(\); render\(\);/g, /setActiveTab\('viewDraft','tabDraftBtn'\);/g]) {
    script = script.replace(pat, '/* sandbox neutralized */;');
  }
  const nothing = new Proxy(function () {}, {
    get(_, k) { if (k === Symbol.toStringTag) return 'nothing'; return nothing; },
    apply() { return nothing; },
    construct() { return nothing; },
  });
  const scope = {
    document: nothing, window: nothing, localStorage: nothing, sessionStorage: nothing,
    location: nothing, navigator: nothing, screen: nothing, history: nothing,
    performance: { now: () => 0 }, MutationObserver: nothing,
    setTimeout: () => {}, setInterval: () => {}, clearTimeout: () => {}, clearInterval: () => {},
    requestAnimationFrame: (f) => { if (typeof f === 'function') f(0); return 0; },
    fetch: () => Promise.reject(new Error('no network')),
    Event: function () {}, customElements: nothing,
    console: { log() {}, error() {}, warn() {}, info() {}, debug() {} },
  };
  let seed = 123456;
  scope.Math = Object.create(globalThis.Math);
  scope.Math.random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const assigns = Object.keys(scope).map(k => `const ${k} = __scope__.${k};`).join('\n');
  const randomSrc = `let __seed = 123456;\nconst random = () => { __seed = (__seed * 16807) % 2147483647; return __seed / 2147483647; };\n`;
  const body = `'use strict';\n` + assigns + `\n` + randomSrc + `Math.random = random;\n` +
    script +
    `\nreturn { teamRatings, matchupModel, ROSTER_SLOTS, DEFAULT_PLAN, NEUTRAL_OFF, DEFAULT_DEF };`;
  return new Function('__scope__', body)(scope);
}

const base = {};
let fails = 0;
function check(name, cond, detail) {
  if (cond) console.log('PASS  ' + name);
  else { fails++; console.log('FAIL  ' + name + (detail ? ' — ' + detail : '')); }
}

(async () => {
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const engine = sandboxEval(html);
  const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
  if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }

  const { teamRatings, matchupModel, ROSTER_SLOTS, DEFAULT_PLAN, NEUTRAL_OFF, DEFAULT_DEF } = engine;

  // Build league baseline from all-80 rosters.
  const all80 = {}; ROSTER_SLOTS.forEach(s => { all80[s] = { ovr: 80 }; });
  const lg = teamRatings(all80);
  const opp = teamRatings(all80);

  // Proper plan objects from the product.
  const plan = DEFAULT_PLAN || { off: NEUTRAL_OFF || { pers: '11', strat: 'neutral' }, def: DEFAULT_DEF || { pkg: 'base', focus: 'neutral' } };

  console.log('\nT7 METAMORPHIC BATTERY — ' + SHA_BEFORE.slice(0, 16));
  console.log('=' .repeat(60));

  // 1. Identical-roster symmetry: same ratings => identical teamRatings output
  {
    const r1 = teamRatings(all80);
    const r2 = teamRatings(all80);
    const keys = Object.keys(r1);
    const identical = keys.every(k => r1[k] === r2[k]);
    check('identical-roster symmetry: teamRatings(all80) == teamRatings(all80)', identical);
  }

  // 2. Monotonicity: raising one slot's OVR never lowers its unit rating
  {
    let ok = true, prevCB = null;
    for (let o = 70; o <= 90; o += 5) {
      const mod = { ...all80, CB1: { ovr: o } };
      const r = teamRatings(mod);
      const cb = r.coverage; // coverage includes CB1 weight
      if (prevCB !== null && cb < prevCB - 1e-9) ok = false;
      prevCB = cb;
    }
    check('monotonicity: CB1 OVR 70->90 never lowers coverage rating', ok);
  }

  // 3. Uniform +5 OVR: no single slot claims >40% of total upgrade value
  {
    const deltas = ROSTER_SLOTS.map(s => {
      const mod = { ...all80, [s]: { ovr: 85 } };
      const r = teamRatings(mod);
      const baseKeys = Object.keys(r);
      let deltaSum = 0;
      baseKeys.forEach(k => { deltaSum += Math.max(0, r[k] - lg[k]); });
      return { slot: s, delta: deltaSum };
    });
    const total = deltas.reduce((a, b) => a + b.delta, 0);
    const maxShare = total > 0 ? Math.max(...deltas.map(d => d.delta / total)) : 0;
    const maxSlot = deltas.reduce((a, b) => (b.delta > a.delta ? b : a));
    check(`no single slot >40% of +5 uniform upgrade (max ${maxSlot.slot} ${(maxShare*100).toFixed(1)}%)`, maxShare < 0.4, `maxShare=${maxShare.toFixed(3)}`);
  }

  // 4. Name-independence: same OVR/pos, different names -> identical teamRatings
  {
    const a = { ...all80, QB: { ovr: 88, name: 'Aaron Rodgers' } };
    const b = { ...all80, QB: { ovr: 88, name: 'Brock Purdy' } };
    const ra = teamRatings(a);
    const rb = teamRatings(b);
    const keys = Object.keys(ra);
    const identical = keys.every(k => ra[k] === rb[k]);
    check('name-independence: same OVR/pos => identical teamRatings', identical);
  }

  // 5. Color-independence: engine has no color term -> identical ratings
  {
    const a = { ...all80, QB: { ovr: 88, color: '#0000FF' } };
    const b = { ...all80, QB: { ovr: 88, color: '#FF0000' } };
    const ra = teamRatings(a);
    const rb = teamRatings(b);
    const keys = Object.keys(ra);
    const identical = keys.every(k => ra[k] === rb[k]);
    check('color-independence: team color => identical teamRatings', identical);
  }

  // 6. matchupModel monotonicity: raising one slot's OVR never lowers structPts
  {
    let ok = true, prev = null;
    for (let o = 70; o <= 90; o += 5) {
      const mod = { ...all80, CB1: { ovr: o } };
      const m = matchupModel(teamRatings(mod), opp, lg, plan);
      if (prev !== null && m.structPts < prev - 1e-9) ok = false;
      prev = m.structPts;
    }
    check('monotonicity: CB1 OVR 70->90 never lowers matchupModel structPts', ok);
  }

  console.log(fails === 0 ? '\nALL METAMORPHIC CHECKS PASS' : `\n${fails} FAILURES`);
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
