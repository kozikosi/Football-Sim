// mathlab/triangulate.mjs — T3 Triangulation generator + raw-curve witness.
//
// Read-only: never touches the product file or any protected constant.
//
// Two modes:
//   A) --fit <fit.json> --design design.json     (uses fitlm.js output; requires Playwright run first)
//   B) --html <product.html> --design design.json (sandbox eval of product inline engine; no Playwright)
//
// Per slot, assembles every available valuation on one row:
//   raw measured span  (slotWins(s,90)-slotWins(s,70), wins, from fit result or sandbox)
//   calibrated 700-scale (modelWeights-style quantisation of the raw curve)
//   design target        (tools/mathlab/design.json, weight x 0.00254)
//   ownerFinal anchor    (Owner's final 11-06 table, REPORTED verbatim)
//   salaryOnly anchor    (salary $M x 25, QB 40M -> 1000, no manual +/-25)
//   derived1000          (span/0.00254 rounded to tens, like VL)
//   expected700          (monotone quantisation of raw span to 700 scale, nearest 5, floor 5)
//   quantError700        (calibrated - expected700; contract |error|<=2.5 per AGENTS §3)
//   rank correlations    (Spearman raw700 vs calibrated)
//   spread (max-min across sources) and bootstrap 95% CI
//   disagreement flag    (spread exceeds pre-stated threshold; rank spread >= 6)
//
// Outputs:
//   --out <out.json>     full per-slot report
//   --csv <out.csv>      raw 50->100 curves per slot (mode B only)
//   --md                 print markdown comparison table to stdout
//
// Evidence label: VERIFIED (computed from the named build by this script).

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const fitPath = get('--fit');
const htmlPath = get('--html');
const designPath = get('--design');
const calPath = get('--calibrated');
const outPath = get('--out');
const csvPath = get('--csv');
const wantMd = args.includes('--md');
const THRESHOLD = Number(get('--threshold') || 0.10); // 10% relative spread = disagreement
const SPREAD1000_THRESHOLD = Number(get('--spread1000') || 150); // >150 on 1000-scale = disagreement

const DESIGN_TO_WINS = 0.00254; // 1 weight = 0.00254 wins (QB 1000 = 2.54 wins)
const WINS_PER_UNIT = 0.00254;
const round5 = (x) => Math.max(5, Math.round(x / 5) * 5);
const round10 = (x) => Math.round(x / 10) * 10;

if (!designPath) {
  console.error('Usage: node triangulate.mjs --design design.json (--fit <fit.json> | --html <product.html>) [--calibrated <cal.json>] [--out <out.json>] [--csv <out.csv>] [--md] [--threshold <frac>] [--spread1000 <pts>]');
  process.exit(2);
}

let design;
try { design = JSON.parse(fs.readFileSync(designPath, 'utf8')); } catch (e) { console.error(`cannot read design ${designPath}: ${e.message}`); process.exit(2); }

// ---------- reference anchors ----------
function loadOwnerFinal() {
  // Source: _agents/owner-notes/2026-11-06-weights-final-verbatim.txt (REPORTED verbatim)
  // salary M | position | weight ; NICKEL -> CB3, DIME -> CB4; TE3/LB4/SS2/FS2 not in list
  return {
    QB: 1000, RB1: 250, RB2: 100, WR1: 650, WR2: 400, WR3: 100, WR4: 50,
    TE1: 250, TE2: 150, OT1: 500, OG1: 400, OG2: 250, C: 150, OT2: 300,
    DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150,
    MIKE: 300, WILL: 150, SAM: 100,
    CB1: 400, CB2: 250, CB3: 100,   // NICKEL -> CB3
    SS: 300, FS: 300,
    K: 50, P: 50, FB: 25,
  };
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

// ---------- mode B: sandbox eval of product inline engine ----------
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
    `\nreturn { slotWins, slotWinsPerOvr, slotWinsTable, modelWeights, ROSTER_SLOTS, DEFAULT_WEIGHTS };\n`;
  return new Function('__scope__', body)(scope);
}

// ---------- run ----------
(async () => {
  let rawSpanMap = {}, wpoMap = {}, mwMap = {}, rosterSlots = [], curves = {};

  if (htmlPath) {
    // Mode B: sandbox eval of product
    const EXPECTED_SHA = '40233d6be00e987c';
    const SHA_BEFORE = crypto.createHash('sha256').update(fs.readFileSync(htmlPath)).digest('hex');
    if (!SHA_BEFORE.startsWith(EXPECTED_SHA)) {
      console.error(`REFUSE: product hash ${SHA_BEFORE.slice(0, 16)} != expected Pre-Colors ${EXPECTED_SHA}`);
      process.exit(4);
    }
    const html = fs.readFileSync(htmlPath, 'utf8');
    const engine = sandboxEval(html);
    const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(htmlPath)).digest('hex');
    if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }
    rosterSlots = engine.ROSTER_SLOTS;
    wpoMap = engine.slotWinsPerOvr();
    mwMap = engine.modelWeights();
    const table = engine.slotWinsTable();
    for (const s of rosterSlots) {
      const curve = table[s] || [];
      curves[s] = curve;
      rawSpanMap[s] = curve.length ? (curve[40] - curve[20]) : null; // 90 - 70
    }
  } else if (fitPath) {
    // Mode A: read from fitlm.js output
    let fit;
    try { fit = JSON.parse(fs.readFileSync(fitPath, 'utf8')); } catch (e) { console.error(`cannot read fit ${fitPath}: ${e.message}`); process.exit(2); }
    const finalMap = fit.final || fit.fitted || {};
    rosterSlots = Object.keys(finalMap);
    // Copy (don't reference) so mutating wpoMap doesn't corrupt rawSpanMap
    rawSpanMap = { ...finalMap };
    // wpoMap = wins per +1 OVR = span/20
    wpoMap = {};
    for (const s of rosterSlots) wpoMap[s] = (rawSpanMap[s] || 0) / 20;
    if (calPath) {
      let calibrated;
      try { calibrated = JSON.parse(fs.readFileSync(calPath, 'utf8')); } catch (e) { console.error(`cannot read calibrated ${calPath}: ${e.message}`); process.exit(2); }
      mwMap = calibrated;
    } else {
      // modelWeights-style quantisation: QB pinned to 700, nearest 5, floor 5
      const mx = Math.max(...Object.values(rawSpanMap));
      mwMap = {};
      for (const s of rosterSlots) mwMap[s] = Math.max(5, Math.round(rawSpanMap[s] / mx * 700 / 5) * 5);
    }
  } else {
    console.error('Either --fit or --html is required.');
    process.exit(2);
  }

  const owner = loadOwnerFinal();
  const salary = salaryOnly();

  // expected700 = monotone quantisation of raw span to 700 scale (nearest 5, floor 5)
  const expected700 = (spanWins) => {
    if (spanWins == null) return null;
    const spo = spanWins / 20;
    const mx = Math.max(...Object.values(wpoMap).filter(v => v != null));
    return round5(spo / mx * 700);
  };

  // Build raw700 scale (rescale raw so QB=700)
  const raw700 = {};
  const mxWpo = Math.max(...Object.values(wpoMap).filter(v => v != null));
  for (const s of rosterSlots) raw700[s] = wpoMap[s] != null ? wpoMap[s] / mxWpo * 700 : null;

  // Anchor values
  const anchors = { raw700, calibrated: mwMap, ownerFinal: owner, designJson: design, salaryOnly: salary };
  const anchorNames = Object.keys(anchors);

  // Ranks under each anchor
  const rankOf = (values) => {
    const order = [...Object.keys(values)].sort((a, b) => values[b] - values[a]);
    const ranks = {};
    order.forEach((s, i) => { ranks[s] = i + 1; });
    return ranks;
  };
  const ranks = {};
  for (const a of anchorNames) ranks[a] = rankOf(anchors[a]);

  // derived1000 = span/0.00254 rounded to tens
  const der1000Vals = {};
  for (const s of rosterSlots) {
    const span = rawSpanMap[s];
    der1000Vals[s] = span != null ? round10(span / WINS_PER_UNIT) : null;
  }
  ranks.derived1000 = rankOf(der1000Vals);

  // Spearman correlation raw700 vs calibrated
  const paired = rosterSlots.filter(s => mwMap[s] != null && raw700[s] != null);
  const rankFn = (a) => { const idx = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]); const rk = new Array(a.length); idx.forEach((p, k) => { rk[p[1]] = k; }); return rk; };
  let spearman = null;
  if (paired.length >= 3) {
    const xr = rankFn(paired.map(s => raw700[s])); const yr = rankFn(paired.map(s => mwMap[s]));
    let sxy = 0, sxx = 0, syy = 0; const mxr = xr.reduce((a, b) => a + b) / xr.length, myr = yr.reduce((a, b) => a + b) / yr.length;
    xr.forEach((v, i) => { sxy += (v - mxr) * (yr[i] - myr); sxx += (v - mxr) ** 2; syy += (v - mxr) ** 2; });
    spearman = +(sxy / Math.sqrt(sxx * syy)).toFixed(3);
  }

  // Bootstrap CI for mean across sources
  function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
  function bootstrapCI(values, nBoot = 3000) {
    if (!values.length) return { lo: null, hi: null, n: 0 };
    const n = values.length;
    const boots = new Array(nBoot);
    for (let b = 0; b < nBoot; b++) {
      let sum = 0; for (let i = 0; i < n; i++) sum += values[Math.floor(Math.random() * n)];
      boots[b] = sum / n;
    }
    boots.sort((a, b) => a - b);
    return { lo: boots[Math.floor(0.025 * nBoot)], hi: boots[Math.floor(0.975 * nBoot)], n };
  }

  const rows = [];
  const allSpreads = [];

  for (const s of rosterSlots) {
    const raw = rawSpanMap[s] != null ? Number(rawSpanMap[s]) : null;
    const fitted = mwMap[s] != null ? Number(mwMap[s]) / 700 * 2.54 : null; // back-convert 700-scale to wins
    const designWins = design[s] != null ? Number(design[s]) * DESIGN_TO_WINS : null;
    const calWins = mwMap[s] != null ? Number(mwMap[s]) / 700 * 2.54 : null;

    const vals = {};
    for (const a of anchorNames) vals[a] = anchors[a][s] == null ? null : anchors[a][s];
    const present = Object.values(vals).filter(v => v != null && Number.isFinite(v));
    const spread = present.length >= 2 ? (Math.max(...present) - Math.min(...present)) : null;
    const spreadRel = spread != null && mean(present) != 0 ? spread / Math.abs(mean(present)) : null;
    const ci = bootstrapCI(present);

    const span = rawSpanMap[s];
    const derived1000 = span != null ? round10(span / WINS_PER_UNIT) : null;
    const exp700 = expected700(span);
    const quantErr = (mwMap[s] != null && exp700 != null) ? Number((mwMap[s] - exp700).toFixed(1)) : null;

    // Normalize all anchors to 1000-scale for like-for-like spread
    const norm = {};
    norm.raw700 = raw700[s] != null ? raw700[s] * (1000 / 700) : null;
    norm.calibrated = mwMap[s] != null ? mwMap[s] : null;
    norm.derived1000 = derived1000;
    norm.ownerFinal = owner[s] != null ? owner[s] : null;
    norm.designJson = design[s] != null ? design[s] : null;
    norm.salaryOnly = salary[s] != null ? salary[s] : null;
    const normNums = Object.values(norm).filter(v => v != null);
    const spread1000 = normNums.length ? Math.max(...normNums) - Math.min(...normNums) : null;

    const rs = Object.values(ranks).map(r => r[s]).filter(v => v != null);
    const rankSpread = rs.length ? Math.max(...rs) - Math.min(...rs) : null;

    const disagreement = spreadRel != null && spreadRel > THRESHOLD;
    const disagreement1000 = (spread1000 != null && spread1000 > SPREAD1000_THRESHOLD) || (rankSpread != null && rankSpread >= 6);
    const quantErrorWithinContract = quantErr != null ? Math.abs(quantErr) <= 2.5 : null;

    rows.push({
      slot: s,
      rawWins: raw,
      raw700Scale: raw700[s] == null ? null : Number(raw700[s].toFixed(2)),
      fittedWins: fitted,
      designWins,
      calibratedWins700: mwMap[s] == null ? null : Number(mwMap[s]),
      derived1000,
      expected700: exp700,
      quantError700: quantErr,
      ownerFinal: owner[s] == null ? null : owner[s],
      designJson: design[s] == null ? null : design[s],
      salaryOnly: salary[s] == null ? null : salary[s],
      nSources: present.length,
      spreadWins: spread,
      spreadRelative: spreadRel != null ? +spreadRel.toFixed(4) : null,
      spread1000: spread1000 == null ? null : +spread1000.toFixed(1),
      ci95MeanWins: ci,
      rankSpread,
      disagreement,
      disagreement1000,
      quantErrorWithinContract,
      label: disagreement ? 'DISAGREES' : (present.length >= 3 ? 'AGREES' : 'FEW-SOURCES'),
      label1000: disagreement1000 ? 'DISAGREES-1000' : (present.length >= 3 ? 'AGREES' : 'FEW-SOURCES'),
    });
    if (spread != null) allSpreads.push(spread);
  }

  const nDisagree = rows.filter(r => r.disagreement).length;
  const nDisagree1000 = rows.filter(r => r.disagreement1000).length;
  const nOutOfContract = rows.filter(r => r.quantErrorWithinContract === false).length;

  const report = {
    generatedAt: new Date().toISOString() + 'Z',
    mode: htmlPath ? 'sandbox-eval' : 'fitlm-read',
    source: htmlPath || fitPath,
    productSha256: htmlPath ? crypto.createHash('sha256').update(fs.readFileSync(htmlPath)).digest('hex') : null,
    nSlots: rows.length,
    nDisagree: nDisagree,
    nDisagree1000: nDisagree1000,
    nOutOfContract: nOutOfContract,
    meanSpreadWins: allSpreads.length ? +mean(allSpreads).toFixed(6) : null,
    ci95Spread: bootstrapCI(allSpreads),
    spearmanRawVsCalibrated: spearman,
    threshold: THRESHOLD,
    spread1000Threshold: SPREAD1000_THRESHOLD,
    reportingLaw: 'T12',
    anchors: {
      raw700: 'raw measured slotWinsPerOvr() rescaled so QB=700 (same shape as modelWeights(), pre-quantisation)',
      calibrated: 'modelWeights() — raw quantised to nearest 5, floor 5, QB pinned to 700 (the modelWeights() contract)',
      ownerFinal: "Owner's final 11-06 weights (_agents/owner-notes/2026-11-06-weights-final-verbatim.txt; REPORTED verbatim)",
      designJson: 'tools/mathlab/design.json — the table the 28-Oct lab fit targeted (REPORTED from file)',
      salaryOnly: 'anchor C: salary $M x 25 (40M QB -> 1000), no manual +/-25 adjustments (REPORTED from Owner message)',
    },
    note: 'disagreement: relative spread > threshold across sources. disagreement1000: spread > 150 on 1000-scale or rank spread >= 6 (engine anchors only). quantErrorWithinContract: |calibrated - expected700| <= 2.5 per AGENTS section 3 contract.',
    slots: rows,
  };

  const out = JSON.stringify(report, null, 2);
  if (outPath) { fs.writeFileSync(outPath, out); console.log(`triangulate.mjs: wrote ${outPath}`); }
  else { console.log(out); }

  // Optional CSV of raw curves (mode B only)
  if (csvPath && curves && Object.keys(curves).length) {
    let csv = 'slot,ovr,rawWins\n';
    for (const s of Object.keys(curves).sort()) {
      const curve = curves[s];
      for (let o = 50; o <= 100; o++) csv += `${s},${o},${curve[o - 50] == null ? '' : curve[o - 50].toFixed(6)}\n`;
    }
    fs.writeFileSync(csvPath, csv);
    console.log(`triangulate.mjs: wrote raw curves to ${csvPath}`);
  }

  // Optional markdown table
  if (wantMd) {
    const ordered = [...rows].sort((a, b) => (b.rawWins || 0) - (a.rawWins || 0));
    const pad = (s, w) => String(s != null ? s : '—').padEnd(w);
    console.log('\n## T3 Triangulation (per slot)');
    console.log('| slot | rawWins | raw700 | fittedWins | designWins | calW700 | derived1000 | expected700 | quantErr700 | spread1000 | rankSpread | label | label1000 |');
    console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
    for (const r of ordered) {
      console.log(`| ${pad(r.slot,4)} | ${pad(r.rawWins != null ? r.rawWins.toFixed(4) : '—',7)} | ${pad(r.raw700Scale,7)} | ${pad(r.fittedWins != null ? r.fittedWins.toFixed(4) : '—',10)} | ${pad(r.designWins != null ? r.designWins.toFixed(4) : '—',10)} | ${pad(r.calibratedWins700,6)} | ${pad(r.derived1000,11)} | ${pad(r.expected700,11)} | ${pad(r.quantError700 != null ? r.quantError700.toFixed(1) : '—',9)} | ${pad(r.spread1000,10)} | ${pad(r.rankSpread,10)} | ${r.label} | ${r.label1000} |`);
    }
    console.log(`\n**Summary:** ${report.nSlots} slots, ${report.nDisagree} disagree (>${(THRESHOLD*100).toFixed(0)}% rel spread), ${report.nDisagree1000} disagree1000 (>${SPREAD1000_THRESHOLD} pts on 1000-scale or rank spread >=6), ${report.nOutOfContract} out of contract (|quantErr|>2.5), mean spread ${report.meanSpreadWins} wins, spearman raw↔calibrated ${report.spearmanRawVsCalibrated}.`);
  }
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
