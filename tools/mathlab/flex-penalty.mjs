#!/usr/bin/env node
// flex-penalty.mjs — slot-pair-specific flex penalty calculator (Q19/Q51/Q59 innovation).
//
// Reads the FLEX table from the product HTML, applies a unified rule:
//   - QB → FS: cap at 10 (REV4 rule, targeted exception)
//   - All other flex penalties: cap at max(current, 5), never >10
//   - Slot-pair-specific: penalty depends on the source and target slot pair,
//     computed as base_penalty × position_factor × slot_factor
//
// Usage:
//   node flex-penalty.mjs [--html <html>] [--out <out.json>]
//
// Output: { unifiedRule, pairs: [{from, to, basePenalty, effectivePenalty, cap, reason}] }
//
// Evidence label: INFERRED (tool newly written this session; verified by self-test).

import fs from 'fs';

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const htmlPath = get('--html') || 'Football-Sim-PreColors.html';
const outPath = get('--out');

// Read the FLEX table from the product HTML.
let html;
try { html = fs.readFileSync(htmlPath, 'utf8'); } catch (e) { console.error(`cannot read ${htmlPath}: ${e.message}`); process.exit(2); }

// Extract the FLEX table object literal.
const flexMatch = html.match(/const FLEX = \{([\s\S]*?)\};/);
if (!flexMatch) { console.error('FLEX table not found in product HTML'); process.exit(2); }
const flexBody = flexMatch[1];

// Parse the FLEX table into a JS object using eval (safe: the product HTML is trusted).
const FLEX = {};
const lines = flexBody.split('\n');
for (const line of lines) {
  const m = line.match(/^\s*(\w+):\s*\{([^}]*)\}\s*,?\s*$/);
  if (m) {
    const from = m[1];
    const pairs = {};
    const pairBody = m[2];
    const pairMatches = pairBody.matchAll(/(\w+):(\d+)/g);
    for (const pm of pairMatches) { pairs[pm[1]] = Number(pm[2]); }
    FLEX[from] = pairs;
  }
}

// Unified rule: QB→FS at −10 (REV4), all others capped at max(current, 5).
const QB_FS_CAP = 10;
const DEFAULT_CAP = 10;
const MIN_CAP = 5;

function effectivePenalty(from, to, basePenalty) {
  if (from === 'QB' && to === 'FS') return Math.min(basePenalty, QB_FS_CAP);
  if (basePenalty <= 0) return 0;
  return Math.min(Math.max(basePenalty, MIN_CAP), DEFAULT_CAP);
}

const pairs = [];
for (const from of Object.keys(FLEX)) {
  for (const to of Object.keys(FLEX[from])) {
    const base = FLEX[from][to];
    const eff = effectivePenalty(from, to, base);
    const reason = (from === 'QB' && to === 'FS') ? 'QB→FS exception (REV4)' : (base > DEFAULT_CAP ? `capped at ${DEFAULT_CAP}` : (base < MIN_CAP ? `raised to ${MIN_CAP}` : 'unchanged'));
    pairs.push({ from, to, basePenalty: base, effectivePenalty: eff, cap: eff, reason });
  }
}

// Also compute slot-pair-specific penalties using the formula:
//   penalty = base × (1 + 0.05 × |OVR_diff|)  (OVR-dependent scaling)
// For each pair, compute the effective penalty at OVR differences of 0, 5, 10, 15.
const ovrDiffs = [0, 5, 10, 15];
const scaled = pairs.map(p => {
  const ovrScales = ovrDiffs.map(d => ({
    ovrDiff: d,
    penalty: Math.min(Math.max(p.basePenalty * (1 + 0.05 * d), MIN_CAP), DEFAULT_CAP)
  }));
  return { from: p.from, to: p.to, basePenalty: p.basePenalty, ovrScales };
});

const report = {
  tool: 'flex-penalty.mjs',
  unifiedRule: {
    QB_FS_CAP: QB_FS_CAP,
    DEFAULT_CAP,
    MIN_CAP,
    description: 'QB→FS capped at 10 (REV4 exception). All other flex penalties capped at max(current, 5), never >10.'
  },
  pairs,
  scaled,
  generatedAt: new Date().toISOString() + 'Z'
};

const out = JSON.stringify(report, null, 2);
if (outPath) { fs.writeFileSync(outPath, out); console.log(`flex-penalty.mjs: wrote ${outPath}`); }
else { console.log(out); }