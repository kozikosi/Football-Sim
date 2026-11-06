// _agents/vloc/deliveries/weights-measure.mjs
// Read-only engine measurement vs the Owner's final weights (2026-11-06 directive).
// Loads Football-Sim-PreColors.html in headless Chromium, measures the REAL engine
// (slotWinsPerOvr revealed impact, modelWeights() quantisation to the 700 scale),
// compares every slot against the Owner's weight table with the +/-50 tolerance,
// and reports sums, the salary/weight arithmetic check, monotonicity, and the
// Guide-relevant wins-based player ranking. Never writes or modifies a product file.
//
// usage: NODE_PATH=/Users/kosi/node_modules node _agents/vloc/deliveries/weights-measure.mjs [html]
// evidence JSON: _agents/vloc/deliveries/weights-measure-2026-11-06.json

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const HTML = path.resolve(process.argv[2] || 'Football-Sim-PreColors.html');
const OUT = path.resolve(new URL('.', import.meta.url).pathname, 'weights-measure-2026-11-06.json');

// Owner's final weights, verbatim from the 2026-11-06 directive (salary M | position | weight),
// mapped to product slot keys. NICKEL->CB3 ("CB3 / Nickel"), DIME->CB4 ("CB4 / Dime").
// TE3 has no product slot ("TE3 is not drafted: always a generic 70", line ~2040).
const OWNER = {
  QB: {salary: 40, w: 1000}, RB1: {salary: 10, w: 250}, RB2: {salary: 4, w: 100}, FB: {salary: 1, w: 25},
  WR1: {salary: 25, w: 650}, WR2: {salary: 15, w: 400}, WR3: {salary: 4, w: 100}, WR4: {salary: 2, w: 50},
  TE1: {salary: 10, w: 250}, TE2: {salary: 5, w: 150},
  OT1: {salary: 20, w: 500}, OG1: {salary: 15, w: 400}, C: {salary: 5, w: 150}, OG2: {salary: 10, w: 250}, OT2: {salary: 12, w: 300},
  DE1: {salary: 25, w: 650}, DE2: {salary: 12, w: 300}, DT1: {salary: 20, w: 500}, DT2: {salary: 10, w: 300}, DL5: {salary: 5, w: 150},
  MIKE: {salary: 12, w: 300}, WILL: {salary: 6, w: 150}, SAM: {salary: 3, w: 100},
  CB1: {salary: 15, w: 400}, SS: {salary: 12, w: 300}, FS: {salary: 12, w: 300}, CB2: {salary: 10, w: 250},
  CB3: {salary: 4, w: 100},   // NICKEL
  CB4: {salary: 2, w: 50},    // DIME
  K: {salary: 2, w: 50}, P: {salary: 2, w: 50}
};
const OWNER_KEYS = Object.keys(OWNER); // product keys, TE3 excluded (no slot)
const ownerTable = {};
OWNER_KEYS.forEach(k => { ownerTable[k] = OWNER[k].w; });

// ---- in-page code: runs inside the product page, against the REAL engine ----
// (Owner table inlined: page.evaluate args serialize plain objects fine, but inline
//  keeps the measured page fully self-contained and avoids any serialization edge case.)
function measurePage() {
  const ownerTable = {QB:1000,RB1:250,RB2:100,WR1:650,WR2:400,WR3:100,WR4:50,TE1:250,TE2:150,
    OT1:500,OT2:300,OG1:400,OG2:250,C:150,DE1:650,DE2:300,DT1:500,DT2:300,DL5:150,
    MIKE:300,WILL:150,SAM:100,LB4:5,CB1:400,CB2:250,CB3:100,CB4:50,SS:300,SS2:5,FS:300,FS2:5,K:50,P:50,FB:25};
  const ownerKeys = Object.keys(ownerTable);
  _wTable = null; _wpoCache = null; // reset engine caches so the live math is measured
  const wpo = slotWinsPerOvr();     // revealed impact: wins per +1 OVR near a starter (slotWins(s,90)-slotWins(s,70))/20
  const mx = Math.max(...Object.values(wpo)); // QB anchors the scale
  const quant700 = {};              // modelWeights() contract: 700 scale, nearest 5, floor 5
  const quant1000 = {};
  Object.keys(wpo).forEach(s => {
    quant700[s] = Math.max(5, Math.round(wpo[s] / mx * 700 / 5) * 5);
    quant1000[s] = Math.max(5, Math.round(wpo[s] / mx * 1000 / 5) * 5);
  });
  const mwCurrent = modelWeights(); // what the draft board actually uses, with current DEFAULT_WEIGHTS

  // monotonicity: every measured slot must gain wins from OVR 70 -> 90
  let monotonicOk = true; let minSlope = Infinity;
  ROSTER_SLOTS.forEach(s => { const d = slotWins(s, 90) - slotWins(s, 70); if (d <= 0) monotonicOk = false; if (d < minSlope) minSlope = d; });

  // modelWeights() if DEFAULT_WEIGHTS were replaced by the Owner's table (mutable object; restored below)
  const savedDefaults = {...DEFAULT_WEIGHTS};
  ownerKeys.forEach(k => { if (k in DEFAULT_WEIGHTS) DEFAULT_WEIGHTS[k] = ownerTable[k]; });
  const mwWithOwnerDefaults = modelWeights();
  Object.keys(savedDefaults).forEach(k => { DEFAULT_WEIGHTS[k] = savedDefaults[k]; });

  // raw current DEFAULT_WEIGHTS literal (for the patch audit)
  const defaults = {...DEFAULT_WEIGHTS};

  // Guide-relevant: players ranked by WINS (WAR), weight-independent
  const war = PLAYERS.map(p => {
    const v = playerWar(p);
    return {name: p[0], pos: p[1], team: p[2], ovr: p[3], war: v.war, slot: v.slot};
  }).sort((a, b) => b.war - a.war);

  return {wpo, quant700, quant1000, mwCurrent, mwWithOwnerDefaults, defaults, mx, monotonicOk, minSlope, war: war.slice(0, 15)};
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + HTML);
  await page.waitForFunction(() => typeof slotWinsTable === 'function' && typeof matchupModel === 'function', null, {timeout: 60000});
  const m = await page.evaluate(measurePage);
  await browser.close();

  // ---- Node-side comparison vs the Owner's table ----
  const rows = [];
  let within50 = 0, outside50 = 0, nMeasured = 0;
  OWNER_KEYS.forEach(s => {
    const o = OWNER[s];
    const impact = m.wpo[s]; // undefined for slots not in ROSTER_SLOTS
    const row = {slot: s, salary: o.salary, ownerW: o.w, impact: impact ? +impact.toFixed(4) : null,
                 quant1000: m.quant1000[s], gap: impact ? +(o.w - m.quant1000[s]).toFixed(1) : null,
                 within50: impact ? Math.abs(o.w - m.quant1000[s]) <= 50 : null,
                 currentDefault: m.defaults[s], mwCurrent: m.mwCurrent[s]};
    rows.push(row);
    if (impact != null) { nMeasured++; if (row.within50) within50++; else outside50++; }
  });
  // sums
  const sumOwner = +OWNER_KEYS.reduce((a, s) => a + OWNER[s].w, 0).toFixed(0);
  const sumQuant700 = Object.values(m.quant700).reduce((a, b) => a + b, 0);
  const sumMwCurrent = Object.values(m.mwCurrent).reduce((a, b) => a + b, 0);

  // salary/weight arithmetic: base rule salary_M = weight / 25; Owner tolerance +/-25 weight = +/-1 M
  const arith = [];
  OWNER_KEYS.forEach(s => {
    const o = OWNER[s];
    const impliedM = o.w / 25;
    arith.push({
      slot: s, salary: o.salary, weight: o.w, impliedSalaryM: impliedM,
      deviationM: +(impliedM - o.salary).toFixed(2),
      exact: Math.abs(impliedM - o.salary) < 0.001,
      withinTol: Math.abs(impliedM - o.salary) <= 1.0001
    });
  });

  // unmeasured slots (not in ROSTER_SLOTS): modelWeights clamps them to <= 5
  const unmeasured = OWNER_KEYS.filter(s => m.wpo[s] == null);

  const result = {
    when: new Date().toISOString(),
    build: HTML,
    currentDefaults: m.defaults,
    ownerTable, quantisation: "700 scale, nearest 5, floor 5, QB anchor = mx (modelWeights contract)",
    nMeasured, within50, outside50,
    sumOwner, sumQuant700: +sumQuant700.toFixed(0), sumMwCurrent: +sumMwCurrent.toFixed(0),
    monotonicOk: m.monotonicOk, minSlope: +m.minSlope.toFixed(4),
    rows,
    unmeasured,
    mwWithOwnerDefaults: m.mwWithOwnerDefaults,
    arith,
    topWinsRanking: m.war,
    pageErrors: errs.length
  };
  fs.writeFileSync(OUT, JSON.stringify(result, null, 1) + '\n');

  // ---- console report (markdown tables) ----
  const pad = (s, n) => String(s).padEnd(n);
  console.log('== OWNER WEIGHTS vs ENGINE REVEALED IMPACT (Football-Sim-PreColors.html) ==');
  console.log(`slots measured: ${nMeasured} | within +/-50 of Owner target: ${within50} | outside: ${outside50}`);
  console.log(`sum Owner weights: ${sumOwner} | sum quant700 (current engine): ${sumQuant700} | sum modelWeights() current: ${sumMwCurrent}`);
  console.log(`monotonic (slotWins 90 > 70 all measured slots): ${m.monotonicOk} | min slope: ${m.minSlope.toFixed(4)}`);
  console.log(`page errors: ${errs.length}`);
  console.log('\n| slot | salary M | Owner w | impact w/OVR | quantised x1000 | gap (Owner - quant) | within +/-50 | current DEFAULT | modelWeights() now |');
  console.log('|------|----------|---------|--------------|-----------------|---------------------|--------------|-----------------|--------------------|');
  rows.forEach(r => {
    console.log(`| ${pad(r.slot, 4)} | ${pad(r.salary, 8)} | ${pad(r.ownerW, 7)} | ${pad(r.impact == null ? 'n/a' : r.impact, 12)} | ${pad(r.quant1000 == null ? 'n/a' : r.quant1000, 15)} | ${pad(r.gap == null ? 'n/a' : r.gap, 19)} | ${pad(r.within50 == null ? 'n/a' : r.within50, 12)} | ${pad(r.currentDefault, 15)} | ${r.mwCurrent} |`);
  });
  console.log('\n-- unmeasured slots (no slotWinsPerOvr impact; modelWeights clamps DEFAULT_WEIGHTS to <= 5 for them) --');
  console.log(unmeasured.map(s => `${s}: Owner ${OWNER[s].w}, current DEFAULT ${m.defaults[s]}, modelWeights() ${m.mwCurrent[s]}`).join('\n'));
  console.log('\n-- salary/weight arithmetic: base rule salary_M = weight / 25 (QB 1000 <-> 40M); tolerance +/-1 M (= +/-25 weight) --');
  console.log('| slot | salary M | weight | weight/25 implied salary | deviation M | exact | within tol |');
  console.log('|------|----------|--------|--------------------------|-------------|-------|------------|');
  arith.forEach(a => console.log(`| ${pad(a.slot, 4)} | ${pad(a.salary, 8)} | ${pad(a.weight, 6)} | ${pad(a.impliedSalaryM, 24)} | ${pad(a.deviationM, 11)} | ${pad(a.exact, 5)} | ${a.withinTol} |`));
  const badArith = arith.filter(a => !a.withinTol);
  console.log(`\narithmetic violations outside +/-1 M: ${badArith.length} (${badArith.map(a => `${a.slot}(${a.deviation}M)`).join(', ') || 'none'})`);
  console.log('\n-- top 15 players by WINS (playerWar, Guide "rerank by importance by WINS", weight-independent) --');
  console.log('| rank | name | pos | OVR | WAR | slot |');
  console.log('|------|------|-----|-----|-----|------|');
  m.war.forEach((p, i) => console.log(`| ${i+1} | ${p.name} | ${p.pos} | ${p.ovr} | ${p.war.toFixed(2)} | ${p.slot} |`));
  console.log(`\nEvidence JSON written to ${OUT}`);
  process.exit(outside50 > 0 || badArith.length > 0 || !m.monotonicOk || errs.length > 0 ? 2 : 0);
})().catch(e => { console.error(e); process.exit(3); });
