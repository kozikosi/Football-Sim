// mathlab/spread.js — local-slope spread study on the REAL engine (in Chromium, product untouched).
// For each slot: center = position pool average; baseline = every slot at its position average;
// slope(spread) = [slotWins(center+spread) - slotWins(center-spread)] / (2*spread).
// Reports old 70->90 (base=80) beside spreads 3, 5, 7, 10 (+10 as non-linearity check),
// plus modelWeights scaled to 700 per spread.
// The position-average centers come from the supplied pool (default: data/madden27-ratings.csv,
// the Owner-supplied 1,941-player set); the engine math (matchupModel/slotWins) is the real product.
// usage: node spread.js <html> [csvFile] [--json out.json]
// requires: playwright (global). NODE_PATH=$(npm root -g)
const { chromium } = require('playwright');
const fs = require('fs');

const HTML = process.argv[2];
const CSV = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : null;
const jsonOut = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;
if (!HTML) { console.error('usage: node spread.js <html> [csvFile] [--json out.json]'); process.exit(2); }

let csvPlayers = null, csvSource = 'embedded PLAYERS';
if (CSV) {
  csvSource = CSV;
  const rows = fs.readFileSync(CSV, 'utf8').trim().split('\n').slice(1);
  csvPlayers = rows.map(r => { const c = r.split(','); return { name: c[0], pos: c[1], team: c[2], ovr: +c[3] }; });
  console.log('pool:', csvSource, 'n=', csvPlayers.length);
}

async function open(file) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + file);
  await page.waitForFunction(() => typeof slotWinsTable === 'function' && typeof matchupModel === 'function', null, { timeout: 20000 });
  return { browser, page, errs };
}

function inPageSpread(csvPlayers) {
  // slot -> the fine-grained position it primarily represents (position-granularity per MUSE proposal)
  const SLOT_TO_POS = {
    QB: 'QB', RB1: 'HB', RB2: 'HB', WR1: 'WR', WR2: 'WR', WR3: 'WR', TE1: 'TE', TE2: 'TE',
    OT1: 'LT', OT2: 'RT', OG1: 'LG', OG2: 'RG', C: 'C', DE1: 'REDG', DE2: 'LEDG',
    DT1: 'DT', DT2: 'DT', MIKE: 'MIKE', WILL: 'WILL', SAM: 'SAM',
    CB1: 'CB', CB2: 'CB', CB3: 'CB', SS: 'SS', FS: 'FS', K: 'K'
  };
  // position pool averages: from supplied pool if given, else from embedded PLAYERS
  function posAverages(players) {
    const sum = {}, cnt = {};
    players.forEach(p => { sum[p.pos] = (sum[p.pos] || 0) + p.ovr; cnt[p.pos] = (cnt[p.pos] || 0) + 1; });
    const out = {}; Object.keys(sum).forEach(pos => { out[pos] = sum[pos] / cnt[pos]; });
    return { out, n: players.length };
  }
  const embeddedAvg = posAverages(PLAYERS.map(p => ({ pos: p[1], ovr: p[3] })));
  const pool = csvPlayers || PLAYERS.map(p => ({ name: p[0], pos: p[1], team: p[2], ovr: p[3] }));
  const { out: posAvg, n: nPool } = posAverages(pool);
  const sourceLabel = csvPlayers ? 'supplied pool (CSV)' : 'embedded PLAYERS';
  // baseline: every slot at its own position average (MUSE: everything else at position-specific averages)
  const base = {}; ROSTER_SLOTS.forEach(s => { base[s] = { ovr: posAvg[SLOT_TO_POS[s]] || 75 }; });
  const lg = teamRatings(base);
  const k = 17 / POINTS_PER_WIN;
  const b0 = { on: bestUnitPts(lg, lg, true), off: bestUnitPts(lg, lg, false) };
  // wins table on the position-average baseline (integer OVRs 50-100, linearly interpolated like slotWins)
  const T = {};
  ROSTER_SLOTS.forEach(s => {
    const isOff = WV_OFF_SLOTS.has(s), arr = [];
    for (let o = 50; o <= 100; o++) {
      const sm = Object.assign({}, base); sm[s] = { ovr: o };
      arr.push((bestUnitPts(teamRatings(sm), lg, isOff) - (isOff ? b0.on : b0.off)) * k);
    }
    T[s] = arr;
  });
  function w(s, ovr) {
    const t = T[s], x = Math.max(50, Math.min(99.999, ovr)) - 50, i = Math.floor(x), f = x - i;
    return t[i] * (1 - f) + t[i + 1] * f;
  }
  const spreads = [3, 5, 7, 10];
  const out = {};
  ROSTER_SLOTS.forEach(s => {
    const c = posAvg[SLOT_TO_POS[s]] || 75;
    const row = { slot: s, pos: SLOT_TO_POS[s], center: +c.toFixed(3),
      old7090: +((slotWins(s, 90) - slotWins(s, 70)) / 20).toFixed(5) };
    spreads.forEach(sp => {
      const hi = w(s, c + sp), lo = w(s, c - sp);
      row['sp' + sp] = +((hi - lo) / (2 * sp)).toFixed(5);
    });
    out[s] = row;
  });
  // modelWeights scaled to 700 per spread (replica of engine modelWeights logic)
  const scaled = (wv) => { const mx = Math.max(...Object.values(wv)); const s = {}; ROSTER_SLOTS.forEach(s2 => { s[s2] = Math.max(5, Math.round(wv[s2] / mx * 700 / 5) * 5); }); return s; };
  const mw = {};
  spreads.forEach(sp => { const wv = {}; ROSTER_SLOTS.forEach(s => { wv[s] = out[s]['sp' + sp]; }); mw[sp] = scaled(wv); });
  { const wv = {}; ROSTER_SLOTS.forEach(s => { wv[s] = out[s].old7090; }); mw.old = scaled(wv); }
  return { slots: out, weights: mw, nPool, nSlots: ROSTER_SLOTS.length, posAvg, sourceLabel, embeddedAvg };
}

(async () => {
  const { browser, page, errs } = await open(HTML);
  let res;
  try {
    res = await page.evaluate(inPageSpread, csvPlayers);
  } finally {
    await browser.close();
  }
  console.log('page errors:', errs.length);
  console.log('pool source:', res.sourceLabel, 'nPool:', res.nPool, 'nSlots:', res.nSlots);
  console.log('\nPosition pool averages (' + res.sourceLabel + '):');
  console.log(JSON.stringify(res.posAvg));
  console.log('\nSlope (wins per +1 OVR) by slot — old 70->90 vs local spreads:');
  const hdr = 'slot  pos   center  old7090   sp3     sp5     sp7     sp10    maxMove';
  console.log(hdr);
  console.log('-'.repeat(hdr.length));
  const order = Object.keys(res.slots).sort((a, b) => res.slots[b].sp5 - res.slots[a].sp5);
  let totalMove = 0;
  for (const s of order) {
    const r = res.slots[s];
    const vals = [r.sp3, r.sp5, r.sp7, r.sp10];
    const maxMove = +(Math.max(...vals) - Math.min(...vals)).toFixed(5);
    totalMove += maxMove;
    console.log(s.padEnd(5), r.pos.padEnd(4), String(r.center).padEnd(7),
      r.old7090.toFixed(5).padStart(8),
      r.sp3.toFixed(5).padStart(7), r.sp5.toFixed(5).padStart(7),
      r.sp7.toFixed(5).padStart(7), r.sp10.toFixed(5).padStart(8),
      maxMove.toFixed(5).padStart(8));
  }
  console.log('-'.repeat(hdr.length));
  console.log('mean maxMove across slots:', +(totalMove / order.length).toFixed(5));
  console.log('\nmodelWeights (scaled, max=700) by spread — QB row anchors at 700:');
  console.log(JSON.stringify(res.weights, null, 1));
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(res, null, 1));
})().catch(e => { console.error(e); process.exit(4); });
