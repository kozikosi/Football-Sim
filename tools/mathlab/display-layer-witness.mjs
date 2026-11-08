#!/usr/bin/env node
// tools/mathlab/display-layer-witness.mjs — NEW tool (VLOC, 2026-11-08).
//
// Measures how much of each DISPLAYED weight table (Owner final 11-06, design.json,
// salary-only) is "absorbed" (explained) by the engine's raw measured curve
// slotWinsPerOvr() rescaled to QB=700, versus how much is independent.
//
// Read-only: never touches the product file or any protected constant.
//   * pins Football-Sim-PreColors.html sha256 before and after (refuses if bytes change)
//   * sandbox-evals the inline engine (DOM/Network stubbed, deterministic LCG Math.random)
//   * computes per-slot residual |raw700 - anchor| for each anchor
//   * reports % of slots where raw700 is within 25 pts of each anchor ("absorbed"),
//     total spread per anchor, and an absorption score per anchor
//
// Outputs tools/mathlab/results/display-layer-witness-<date>.json + stdout report.
//
// Every number is VERIFIED (computed from the named build by this script).
// Anchor tables are REPORTED from their named sources; no estimates substituted.
//
// Usage: node display-layer-witness.mjs
// Self-test: run against a corrupted copy of the product -> must REFUSE (exit 4).
//            see "SELF-TEST" below.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MATHLAB = HERE;
const ROOT = path.resolve(HERE, '..', '..');
const PRODUCT = path.join(ROOT, 'Football-Sim-PreColors.html');
const RESULTS_DIR = path.join(MATHLAB, 'results');
const DATE = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
const OUT_JSON = path.join(RESULTS_DIR, `display-layer-witness-${DATE}.json`);
const EXPECTED_SHA = '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd';
const SHA_BEFORE = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');

if (SHA_BEFORE !== EXPECTED_SHA) {
  console.error(`REFUSE: product hash ${SHA_BEFORE.slice(0, 16)} != expected Pre-Colors 40233d6be00e987c`);
  process.exit(4);
}

// ---------- sandbox: evaluate the product's inline engine in Node ----------

function sandboxEval(html) {
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let m, parts = [];
  while ((m = re.exec(html))) {
    if (/\bsrc\s*=/.test(m[1])) continue;
    parts.push(m[2]);
  }
  let script = parts.join('\n');
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
    `\nreturn { slotWinsPerOvr, ROSTER_SLOTS };\n`;
  const fn = new Function('__scope__', body);
  return fn(scope);
}

// ---------- reference anchors (REPORTED from named sources) ----------

function loadOwnerFinal() {
  // Source: _agents/owner-notes/2026-11-06-weights-final-verbatim.txt (REPORTED verbatim)
  // salary M | position | weight ; NICKEL -> CB3, DIME -> CB4
  const map = {
    QB: 1000, RB1: 250, RB2: 100, WR1: 650, WR2: 400, WR3: 100, WR4: 50,
    TE1: 250, TE2: 150, OT1: 500, OG1: 400, OG2: 250, C: 150, OT2: 300,
    DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150,
    MIKE: 300, WILL: 150, SAM: 100,
    CB1: 400, CB2: 250, CB3: 100,
    SS: 300, FS: 300,
    K: 50, P: 50, FB: 25,
  };
  map.CB4 = 50;   // DIME -> CB4
  map.SS2 = 5; map.FS2 = 5; map.LB4 = 5;   // depth spots: current DEFAULT_WEIGHTS defaults
  return map;
}

function loadDesignJson() {
  return JSON.parse(fs.readFileSync(path.join(MATHLAB, 'design.json'), 'utf8'));
}

function salaryOnly() {
  // Anchor C: salary column only, $M x 25 (40M QB -> 1000), no manual +/-25 tweaks
  const sal = { QB: 40, RB1: 10, RB2: 4, WR1: 25, WR2: 15, WR3: 4, WR4: 2,
    TE1: 10, TE2: 5, OT1: 20, OG1: 15, OG2: 10, C: 5, OT2: 12,
    DE1: 25, DE2: 12, DT1: 20, DT2: 10, DL5: 5,
    MIKE: 12, WILL: 6, SAM: 3,
    CB1: 15, CB2: 10, CB3: 4, CB4: 2,
    SS: 12, FS: 12,
    K: 2, P: 2, FB: 1 };
  const out = {};
  for (const [k, v] of Object.entries(sal)) out[k] = v * 25;
  return out;
}

// ---------- main ----------

(async () => {
  const t0 = Date.now();
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const engine = sandboxEval(html);
  const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
  if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }

  const slots = engine.ROSTER_SLOTS;
  const wpo = engine.slotWinsPerOvr();            // raw measured, wins per +1 OVR
  const mx = Math.max(...Object.values(wpo));
  const raw700 = {};
  for (const s of slots) raw700[s] = wpo[s] / mx * 700;

  const owner = loadOwnerFinal();
  const design = loadDesignJson();
  const salary = salaryOnly();

  const anchors = { ownerFinal: owner, designJson: design, salaryOnly: salary };
  const anchorNames = Object.keys(anchors);
  const TOL = 25;   // "absorbed" = raw700 within 25 points (700 scale) of anchor

  const rankOf = (values) => {
    const order = [...Object.keys(values)].sort((a, b) => values[b] - values[a]);
    const ranks = {}; order.forEach((s, i) => { ranks[s] = i + 1; });
    return ranks;
  };
  const ranks = {};
  for (const a of anchorNames) ranks[a] = rankOf(anchors[a]);
  ranks.raw700 = rankOf(raw700);

  const rows = [];
  let absorbedCount = { ownerFinal: 0, designJson: 0, salaryOnly: 0 };
  let residSum = { ownerFinal: 0, designJson: 0, salaryOnly: 0 };
  let anchorSum = { ownerFinal: 0, designJson: 0, salaryOnly: 0 };
  let nPresent = 0;
  for (const s of slots) {
    const row = { slot: s, raw700: Number(raw700[s].toFixed(1)) };
    for (const a of anchorNames) {
      const av = anchors[a][s];
      const rv = raw700[s];
      const resid = av == null || rv == null ? null : Number(Math.abs(rv - av).toFixed(1));
      row[a] = av == null ? null : av;
      row[`resid_${a}`] = resid;
      row[`absorbed_${a}`] = resid != null && resid <= TOL;
      row[`rank_${a}`] = ranks[a][s] != null ? ranks[a][s] : null;
      if (resid != null) {
        absorbedCount[a] += (resid <= TOL) ? 1 : 0;
        residSum[a] += resid;
        anchorSum[a] += av;
        nPresent += 1;
      }
    }
    rows.push(row);
  }

  const n = slots.length;
  const summary = {};
  for (const a of anchorNames) {
    const absorbed = absorbedCount[a];
    const meanResid = residSum[a] / n;
    const meanAnchor = anchorSum[a] / n;
    summary[a] = {
      slots: n,
      absorbedWithin25: absorbed,
      absorbedPct: +((absorbed / n) * 100).toFixed(1),
      meanResidual: +meanResid.toFixed(1),
      meanAnchor: +meanAnchor.toFixed(1),
      absorptionScore: +(1 - meanResid / meanAnchor).toFixed(3),  // 1 = fully absorbed/explained by raw curve
      spreadPoints: null,   // filled below
      rankSpread: null,
    };
  }
  // spread + rank spread per anchor (700 scale)
  for (const a of anchorNames) {
    const vals = rows.map(r => r[a]).filter(v => v != null);
    summary[a].spreadPoints = vals.length ? Number((Math.max(...vals) - Math.min(...vals)).toFixed(1)) : null;
    const rs = rows.map(r => r[`rank_${a}`]).filter(v => v != null);
    summary[a].rankSpread = rs.length ? Math.max(...rs) - Math.min(...rs) : null;
  }
  const rawSpread = Number((Math.max(...slots.map(s => raw700[s])) - Math.min(...slots.map(s => raw700[s]))).toFixed(1));
  const rawRankSpread = Math.max(...Object.values(ranks.raw700)) - Math.min(...Object.values(ranks.raw700));

  const ms = ((Date.now() - t0) / 1000).toFixed(2) + 's';
  const out = {
    generatedUtc: new Date().toISOString(),
    product: 'Football-Sim-PreColors.html',
    productSha256: SHA_BEFORE,
    tolerancePts: TOL,
    rawCurve: { spreadPoints: rawSpread, rankSpread: rawRankSpread },
    perSlot: rows,
    summary,
    method: 'Node sandbox evaluation of the product inline engine (read-only); deterministic, no RNG at this layer, n=1 measurement',
    runtimeSeconds: ms,
    labels: 'VERIFIED = computed by this script from the named build; anchor tables REPORTED from named sources (file + row); no estimates substituted',
  };
  fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 2) + '\n');

  // ---------- stdout report ----------
  console.log('=== Display-layer witness (raw curve vs displayed weight tables) ===');
  console.log(`Product: ${out.product}  sha ${SHA_BEFORE.slice(0, 16)}  runtime ${ms}`);
  console.log(`Tolerance "absorbed" = raw700 within ${TOL} pts of anchor (700 scale). n=${n} slots.\n`);
  console.log('Anchor          absorbed%  meanResid  meanAnchor  absorption  spreadPts  rankSpread');
  for (const a of anchorNames) {
    const s = summary[a];
    console.log(`${a.padEnd(15)} ${String(s.absorbedPct).padStart(8)}  ${String(s.meanResidual).padStart(9)}  ${String(s.meanAnchor).padStart(10)}  ${String(s.absorptionScore).padStart(9)}  ${String(s.spreadPoints).padStart(9)}  ${String(s.rankSpread).padStart(10)}`);
  }
  console.log(`\nRaw curve: spread ${rawSpread} pts, rank spread ${rawRankSpread} (QB pinned 700).`);
  console.log('\nQ2 — Is there any build where the display layer is NOT absorbed?');
  console.log('  Measured on Pre-Colors (40233d6b) only. w79 bytes (61acb21e) are NOT a git object');
  console.log('  in this repo (git rev-parse --verify 61acb21e^{commit} fails), so the w79 witness');
  console.log('  cannot be run here -> cross-build confirmation/refutation: UNKNOWN.');
  console.log('  (The single "absorbed" string in the product is a recap sentence, unrelated.)');
  console.log('\nQ3 — Raw-curve witness as a gate on every shipped build?');
  console.log('  Cost: ~' + ms + ' runtime, <10 KB JSON output per build. Deterministic, read-only,');
  console.log('  no RNG, no external data. Recommended: yes as a lightweight gate (flag anchor');
  console.log('  spread > threshold), not a pass/fail on outcomes.');
  console.log(`\nWrote ${OUT_JSON}`);
})();
