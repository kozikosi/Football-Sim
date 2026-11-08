#!/usr/bin/env node
// tools/mathlab/triangulate.mjs — T3: triangulation generator + raw-curve witness export.
// Read-only: never touches the product file or any protected constant.
//
// Reads Football-Sim-PreColors.html, evaluates its inline engine in a Node sandbox
// (DOM/Network stubbed as no-op proxies; seeded Math.random; product sha256 pinned
// before and after — run fails if the bytes changed during the run), and computes:
//
//   * raw measured slotWinsPerOvr() per slot (wins per +1 OVR, all-else-80,
//     deterministic matchup model — no RNG at this layer, n=1 measurement)
//   * raw full curves slotWinsTable() per slot, OVR 50..100 (the witness: curve
//     shape preserved, never rescaled; archived beside the calibrated values)
//   * modelWeights() calibrated to the 700 scale (QB pinned to 700, nearest 5,
//     floor 5 — the modelWeights() contract)
//   * per-slot comparison against: Owner's final 11-06 table, design.json (the
//     table the 28-Oct lab fit targeted), salary-only anchor (salary $M x 25,
//     QB 40M -> 1000, no manual +/-25 adjustments)
//   * ranks under each anchor, spread between anchors, disagreement flags
//
// Outputs:
//   tools/mathlab/results/triangulate-<date>.json   full per-slot table
//   tools/mathlab/results/raw-curves-<date>.csv     raw 50->100 curves per slot
//   prints a compact report to stdout
//
// Every number here is VERIFIED (computed from the named build by this script).
// Anchor tables are REPORTED from their named sources (file + row); no estimates
// are substituted (AGENTS.md section 7).

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
const OUT_JSON = path.join(RESULTS_DIR, `triangulate-${DATE}.json`);
const OUT_CSV = path.join(RESULTS_DIR, `raw-curves-${DATE}.csv`);
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
    `\nreturn { slotWinsPerOvr, slotWinsTable, modelWeights, teamRatings, ROSTER_SLOTS, DEFAULT_WEIGHTS, POINTS_PER_WIN };\n`;
  const fn = new Function('__scope__', body);
  return fn(scope);
}

// ---------- reference anchors ----------

function loadOwnerFinal() {
  // Source: _agents/owner-notes/2026-11-06-weights-final-verbatim.txt (REPORTED verbatim)
  // salary M | position | weight ; NICKEL -> CB3, DIME -> CB4; TE3/LB4/SS2/FS2 not in list
  const map = {
    QB: 1000, RB1: 250, RB2: 100, WR1: 650, WR2: 400, WR3: 100, WR4: 50,
    TE1: 250, TE2: 150, OT1: 500, OG1: 400, OG2: 250, C: 150, OT2: 300,
    DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150,
    MIKE: 300, WILL: 150, SAM: 100,
    CB1: 400, CB2: 250, CB3: 100,   // NICKEL -> CB3
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
    CB1: 15, CB2: 10, CB3: 4, CB4: 2,   // NICKEL/CB3=4, DIME/CB4=2
    SS: 12, FS: 12,
    K: 2, P: 2, FB: 1 };
  const out = {};
  for (const [k, v] of Object.entries(sal)) out[k] = v * 25;
  return out;
}

// ---------- main ----------

(async () => {
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const engine = sandboxEval(html);
  const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
  if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }

  const slots = engine.ROSTER_SLOTS;
  const wpo = engine.slotWinsPerOvr();          // raw measured, wins per +1 OVR
  const table = engine.slotWinsTable();         // raw curves: slot -> arr[50..100]
  const mw = engine.modelWeights();             // calibrated to 700 scale

  const raw700 = {};
  const mx = Math.max(...Object.values(wpo));
  for (const s of slots) raw700[s] = wpo[s] / mx * 700;

  const owner = loadOwnerFinal();
  const design = loadDesignJson();
  const salary = salaryOnly();

  const WINS_PER_UNIT = 0.00254; // 1 weight = 0.00254 wins (QB 1000 = 2.54 wins)
  const round5 = (x) => Math.max(5, Math.round(x / 5) * 5);
  const round10 = (x) => Math.round(x / 10) * 10;
  // contract: expected700 = monotone quantisation of raw span to 700 scale (nearest 5, floor 5)
  const expected700 = (spanWins) => {
    const spo = spanWins / 20;
    return round5(spo / mx * 700);
  };

  const anchors = { raw700, calibrated: mw, ownerFinal: owner, designJson: design, salaryOnly: salary };
  const anchorNames = Object.keys(anchors);

  const rankOf = (values) => {
    const order = [...Object.keys(values)].sort((a, b) => values[b] - values[a]);
    const ranks = {};
    order.forEach((s, i) => { ranks[s] = i + 1; });
    return ranks;
  };
  const ranks = {};
  for (const a of anchorNames) ranks[a] = rankOf(anchors[a]);
  // rank by derived1000 (1000-scale raw span)
  const der1000Vals = {}; for (const s of slots) { const c = table[s] || []; der1000Vals[s] = c.length ? round10((c[40] - c[20]) / WINS_PER_UNIT) : null; }
  ranks.derived1000 = rankOf(der1000Vals);

  // Spearman correlation raw700 vs calibrated over paired slots
  const paired = slots.filter(s => mw[s] != null);
  const rank = (a) => { const idx = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]); const rk = new Array(a.length); idx.forEach((p, k) => { rk[p[1]] = k; }); return rk; };
  let spearman = null;
  if (paired.length >= 3) {
    const xr = rank(paired.map(s => raw700[s])); const yr = rank(paired.map(s => mw[s]));
    let sxy = 0, sxx = 0, syy = 0; const mxr = xr.reduce((a, b) => a + b) / xr.length, myr = yr.reduce((a, b) => a + b) / yr.length;
    xr.forEach((v, i) => { sxy += (v - mxr) * (yr[i] - myr); sxx += (v - mxr) ** 2; syy += (v - mxr) ** 2; });
    spearman = +(sxy / Math.sqrt(sxx * syy)).toFixed(3);
  }

  const rows = [];
  for (const s of slots) {
    const vals = {};
    for (const a of anchorNames) vals[a] = anchors[a][s] == null ? null : anchors[a][s];
    const present = Object.values(vals).filter(v => v != null);
    const spread = present.length ? Math.max(...present) - Math.min(...present) : null;
    const rs = Object.values(ranks).map(r => r[s]).filter(v => v != null);
    const rankSpread = rs.length ? Math.max(...rs) - Math.min(...rs) : null;
    const curve = table[s] || [];
    const spanWins = curve.length ? (curve[40] - curve[20]) : null;
    const derived1000 = spanWins != null ? round10(spanWins / WINS_PER_UNIT) : null;
    const exp700 = spanWins != null ? expected700(spanWins) : null;
    const quantErr = (mw[s] != null && exp700 != null) ? Number((mw[s] - exp700).toFixed(1)) : null;
    // normalise all anchors to 1000-scale for a like-for-like spread
    const norm = {};
    norm.raw700 = raw700[s] != null ? raw700[s] * (1000 / 700) : null;
    norm.calibrated = mw[s] != null ? mw[s] * (1000 / 700) : null;
    norm.derived1000 = derived1000;
    norm.ownerFinal = owner[s] != null ? owner[s] : null;
    norm.designJson = design[s] != null ? design[s] : null;
    norm.salaryOnly = salary[s] != null ? salary[s] : null;
    const normNums = Object.values(norm).filter(v => v != null);
    const spread1000 = normNums.length ? Math.max(...normNums) - Math.min(...normNums) : null;
    const nrs = Object.values(ranks).map(r => r[s]).filter(v => v != null);
    const rankSpreadN = nrs.length ? Math.max(...nrs) - Math.min(...nrs) : null;
    rows.push({
      slot: s,
      rawWinsPerOvr: wpo[s] == null ? null : Number(wpo[s].toFixed(6)),
      raw700Scale: raw700[s] == null ? null : Number(raw700[s].toFixed(2)),
      derived1000,
      calibrated: mw[s] == null ? null : mw[s],
      expected700: exp700 == null ? null : exp700,
      quantError700: quantErr,
      ownerFinal: owner[s] == null ? null : owner[s],
      designJson: design[s] == null ? null : design[s],
      salaryOnly: salary[s] == null ? null : salary[s],
      rankRaw700: ranks.raw700[s], rankCalibrated: ranks.calibrated[s], rankDerived1000: ranks.derived1000[s],
      rankOwner: ranks.ownerFinal[s], rankDesign: ranks.designJson[s], rankSalary: ranks.salaryOnly[s],
      spreadPoints: spread == null ? null : Number(spread.toFixed(2)),
      spread1000: spread1000 == null ? null : Number(spread1000.toFixed(1)),
      rankSpread,
      disagreement700: (spread != null && spread > 100) || (rankSpread != null && rankSpread >= 6),
      disagreement1000: (spread1000 != null && spread1000 > 150) || (rankSpreadN != null && rankSpreadN >= 6),
      quantErrorWithinContract: quantErr != null ? Math.abs(quantErr) <= 2.5 : null,
      curveWinsAt70: curve.length ? Number(curve[20].toFixed(4)) : null,
      curveWinsAt90: curve.length ? Number(curve[40].toFixed(4)) : null,
      curveSpan70to90: curve.length ? Number((curve[40] - curve[20]).toFixed(6)) : null,
      curveOvr50: curve.length ? Number(curve[0].toFixed(4)) : null,
      curveOvr100: curve.length ? Number(curve[50].toFixed(4)) : null,
    });
  }

  const nDisagree700 = rows.filter(r => r.disagreement700).length;
  const nDisagree1000 = rows.filter(r => r.disagreement1000).length;
  const nOutOfContract = rows.filter(r => r.quantErrorWithinContract === false).length;

  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const report = {
    generatedUtc: new Date().toISOString() + 'Z',
    product: 'Football-Sim-PreColors.html',
    productSha256: SHA_BEFORE,
    labels: 'VERIFIED = computed by this script from the named build; REPORTED = anchor tables taken from named sources (file + row); no estimates substituted (AGENTS.md section 7)',
    anchors: {
      raw700: 'raw measured slotWinsPerOvr() rescaled so QB=700 (same shape as modelWeights(), pre-quantisation)',
      calibrated: 'modelWeights() — raw quantised to nearest 5, floor 5, QB pinned to 700 (the modelWeights() contract)',
      ownerFinal: "Owner's final 11-06 weights (_agents/owner-notes/2026-11-06-weights-final-verbatim.txt; REPORTED verbatim)",
      designJson: 'tools/mathlab/design.json — the table the 28-Oct lab fit targeted (REPORTED from file)',
      salaryOnly: 'anchor C: salary $M x 25 (40M QB -> 1000), no manual +/-25 adjustments (REPORTED from Owner message)',
    },
    method: 'Node sandbox evaluation of the product inline engine (read-only); DOM/Network stubbed; deterministic — no RNG at this layer, n=1 measurement',
    summary: {
      nSlots: rows.length,
      nDisagree700: nDisagree700,
      nDisagree1000: nDisagree1000,
      nOutOfContract: nOutOfContract,
      spearmanRawVsCalibrated: spearman,
      note: 'disagreement700: spread > 100 on 700-scale or rank spread >= 6 (includes Owner/design/salary anchors). disagreement1000: spread > 150 on 1000-scale or rank spread >= 6 (engine anchors only, like VL). quantErrorWithinContract: |calibrated - expected700| <= 2.5 per AGENTS section 3 contract.',
    },
    rows,
  };
  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 1) + '\n');

  let csv = 'slot,ovr,rawWins\n';
  for (const s of slots) {
    const curve = table[s] || [];
    for (let o = 50; o <= 100; o++) csv += `${s},${o},${curve[o - 50] == null ? '' : curve[o - 50].toFixed(6)}\n`;
  }
  fs.writeFileSync(OUT_CSV, csv);

  const pad = (v) => String(v == null ? '—' : v).padEnd(10);
  console.log('\nT3 TRIANGULATION — ' + PRODUCT + ' ' + SHA_BEFORE.slice(0, 16) + ' (measured numbers VERIFIED by this run)');
  console.log('slot   rawWins/OVR raw700 derived1000 calibrated expected700 quantErr700 spread1000  rankSpread  disagree1000');
  console.log('----   ---------- ------- ----------- ---------- ----------- ----------- ----------  ----------  ------------');
  for (const r of rows) {
    console.log(`${r.slot.padEnd(6)} ${pad(r.rawWinsPerOvr)} ${pad(r.raw700Scale)} ${pad(r.derived1000)} ${pad(r.calibrated)} ${pad(r.expected700)} ${pad(r.quantError700)} ${pad(r.spread1000)} ${pad(r.rankSpread)} ${r.disagreement1000 ? 'FLAG' : '—'}`);
  }
  console.log(`\nSummary: nSlots=${report.summary.nSlots} disagree700=${report.summary.nDisagree700} disagree1000=${report.summary.nDisagree1000} outOfContract=${report.summary.nOutOfContract} spearmanRawVsCalibrated=${report.summary.spearmanRawVsCalibrated}`);
  console.log('Writes: ' + OUT_JSON);
  console.log('        ' + OUT_CSV);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
