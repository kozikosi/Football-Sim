// mathlab/lab.js — headless measurement of the REAL engine in a product-like HTML file.
// Measures only. It never writes a product file and never produces a build.
// usage: node lab.js <html> table|stack|split [--json out.json]
// requires: playwright (global).  NODE_PATH=$(npm root -g)
const { chromium } = require('playwright');
const fs = require('fs');

async function open(file) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + file);
  await page.waitForFunction(() => typeof slotWinsTable === 'function' && typeof matchupModel === 'function', null, { timeout: 20000 });
  return { browser, page, errs };
}

// ---- in-page measurement functions (serialised into the page) ----
function inPageTable() {
  _wTable = null; _wpoCache = null;               // engine caches: reset so edits to specs are seen
  const T = slotWinsTable(), r = {};
  Object.keys(T).forEach(s => {
    const w = (o) => slotWins(s, o);
    r[s] = { w7090: w(90) - w(70), w8090: w(90) - w(80), w5090: w(90) - w(50), w99: w(99.9) - w(80), w60: w(60) - w(80) };
  });
  return r;
}

function inPageSplit() {
  // pass/run/other share of each slot's 70->90 effect, on the best plan (same plan search as the wins table)
  const base = {}; ROSTER_SLOTS.forEach(s => { base[s] = { ovr: 80 }; });
  const lg = teamRatings(base);
  const chan = (R, isOff) => {
    if (isOff) {
      let best = null, bv = -1e9;
      OFF_OPTS.forEach(o => { const m = matchupModel(R, lg, lg, { off: o, def: DEFAULT_DEF }); if (m.structPts > bv) { bv = m.structPts; best = m; } });
      return best.channels;
    }
    let best = null, bv = 1e9;
    DEF_OPTS.forEach(d => { const m = matchupModel(lg, R, lg, { off: NEUTRAL_OFF, def: d }); if (m.structPts < bv) { bv = m.structPts; best = m; } });
    return best.channels;
  };
  const out = {};
  ROSTER_SLOTS.forEach(s => {
    const isOff = WV_OFF_SLOTS.has(s);
    const lo = Object.assign({}, base), hi = Object.assign({}, base);
    lo[s] = { ovr: 70 }; hi[s] = { ovr: 90 };
    const a = chan(teamRatings(lo), isOff), b = chan(teamRatings(hi), isOff);
    const d = k => Math.abs(b[k] - a[k]);
    const run = d('run'), pass = d('pass') + d('to') + d('sack'), kick = d('kick');
    const tot = run + pass + kick || 1;
    out[s] = { run: run / tot, pass: pass / tot, st: kick / tot };
  });
  return out;
}

function inPageStack() {
  // full-lineup realism: every slot at the same OVR vs a league of 80s; points/game and implied wins/season
  const base = {}; ROSTER_SLOTS.forEach(s => { base[s] = { ovr: 80 }; });
  const lg = teamRatings(base), k = 17 / POINTS_PER_WIN;
  const b0 = { on: bestUnitPts(lg, lg, true), off: bestUnitPts(lg, lg, false) };
  const res = {};
  [50, 60, 70, 75, 85, 90, 95, 99].forEach(o => {
    const sm = {}; ROSTER_SLOTS.forEach(s => { sm[s] = { ovr: o }; });
    const R = teamRatings(sm);
    const on = bestUnitPts(R, lg, true) - b0.on, off = bestUnitPts(R, lg, false) - b0.off;
    res[o] = { offPts: on, defPts: off, wins: 8.5 + k * (on + off) };
  });
  return res;
}

module.exports = { open, inPageTable, inPageSplit, inPageStack };

if (require.main === module) {
  (async () => {
    const [file, cmd] = [process.argv[2], process.argv[3] || 'table'];
    const jsonOut = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;
    const { browser, page, errs } = await open(file);
    let out;
    if (cmd === 'table') {
      out = await page.evaluate(inPageTable);
      Object.entries(out).sort((a, b) => b[1].w7090 - a[1].w7090).forEach(([s, v]) => console.log(s.padEnd(5), v.w7090.toFixed(3).padStart(7), (v.w7090 / 20).toFixed(4)));
    } else if (cmd === 'split') {
      out = await page.evaluate(inPageSplit);
      Object.entries(out).forEach(([s, v]) => console.log(s.padEnd(5), 'run', (v.run * 100).toFixed(0).padStart(3) + '%', 'pass', (v.pass * 100).toFixed(0).padStart(3) + '%', 'st', (v.st * 100).toFixed(0).padStart(3) + '%'));
    } else if (cmd === 'stack') {
      out = await page.evaluate(inPageStack);
      Object.entries(out).forEach(([o, v]) => console.log('all', o, 'off', v.offPts.toFixed(2), 'def', v.defPts.toFixed(2), 'wins', v.wins.toFixed(2)));
    }
    console.log('page errors:', errs.length);
    if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(out, null, 1));
    await browser.close();
  })().catch(e => { console.error(e); process.exit(4); });
}
