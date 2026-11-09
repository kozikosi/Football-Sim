// tools/mathlab/local-weights.mjs — computes modelWeights (700-scale) from local slopes at spreads ±3,±5,±7,±10, plus old weights.

import { chromium } from 'playwright';
import fs from 'fs';

async function open(file) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + file);
  await page.waitForFunction(() => typeof slotWinsTable === 'function' && typeof matchupModel === 'function' && Array.isArray(PLAYERS) && PLAYERS.length > 0, null, { timeout: 20000 });
  return { browser, page, errs };
}

function localWeights() {
  const spreads = [3, 5, 7, 10];
  const slotG = {
    QB: 'QB', RB1: 'HB', RB2: 'HB', WR1: 'WR', WR2: 'WR', WR3: 'WR', TE1: 'TE', TE2: 'TE',
    OT1: 'LT', OT2: 'RT', OG1: 'LG', OG2: 'RG', C: 'C', DE1: 'REDG', DE2: 'LEDG', DT1: 'DT', DT2: 'DT',
    MIKE: 'MIKE', WILL: 'WILL', SAM: 'SAM', CB1: 'CB', CB2: 'CB', CB3: 'CB', SS: 'SS', FS: 'FS', K: 'K'
  };
  const groups = {};
  PLAYERS.forEach(p => {
    const g = p[1];
    if (!groups[g]) groups[g] = { sum: 0, n: 0 };
    groups[g].sum += p[3];
    groups[g].n++;
  });
  const posAvg = {};
  Object.keys(groups).forEach(g => { posAvg[g] = groups[g].n ? groups[g].sum / groups[g].n : 80; });
  const slotAvg = {};
  ROSTER_SLOTS.forEach(s => { const g = slotG[s]; slotAvg[s] = posAvg[g] != null ? posAvg[g] : 80; });
  const base = {};
  ROSTER_SLOTS.forEach(s => { base[s] = { ovr: slotAvg[s] }; });
  const lg = teamRatings(base);
  const k = 17 / POINTS_PER_WIN;
  const b0 = { on: bestUnitPts(lg, lg, true), off: bestUnitPts(lg, lg, false) };
  const w = (slot, ovr, isOff) => {
    const sm = Object.assign({}, base);
    sm[slot] = { ovr };
    const R = teamRatings(sm);
    const u = bestUnitPts(R, lg, isOff);
    const o = isOff ? b0.on : b0.off;
    return (u - o) * k;
  };
  const weightsFromSlopes = (sl) => {
    const mx = Math.max(...Object.values(sl));
    const out = {};
    Object.keys(DEFAULT_WEIGHTS).forEach(kk => {
      const s = sl[kk];
      out[kk] = s != null ? Math.max(5, Math.round(s / mx * 700 / 5) * 5) : Math.min(out[kk] || 5, 5);
    });
    return out;
  };
  const oldSlope = {};
  ROSTER_SLOTS.forEach(s => { oldSlope[s] = (slotWins(s, 90) - slotWins(s, 70)) / 20; });
  const oldW = weightsFromSlopes(oldSlope);
  const perSpread = {};
  spreads.forEach(sp => {
    const sl = {};
    ROSTER_SLOTS.forEach(s => {
      const isOff = WV_OFF_SLOTS.has(s);
      const lo = Math.max(50, slotAvg[s] - sp);
      const hi = Math.min(99.999, slotAvg[s] + sp);
      const loW = w(s, lo, isOff);
      const hiW = w(s, hi, isOff);
      sl[s] = (hiW - loW) / (2 * sp);
    });
    perSpread[sp] = { slope: sl, weights: weightsFromSlopes(sl) };
  });
  return { oldSlope, oldWeights: oldW, perSpread, groupAvg: posAvg, slotAvg };
}

(async () => {
  const file = process.argv[2];
  const jsonOut = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;
  const { browser, page, errs } = await open(file);
  const r = await page.evaluate(localWeights);
  const out = { file, source: 'local-weights.mjs', measuredAt: new Date().toISOString() + 'Z', oldSlope: r.oldSlope, oldWeights: r.oldWeights, perSpread: {}, pageErrors: errs.length };
  Object.keys(r.perSpread).forEach(sp => {
    out.perSpread[sp] = { slope: r.perSpread[sp].slope, weights: r.perSpread[sp].weights };
  });
  if (jsonOut) { fs.writeFileSync(jsonOut, JSON.stringify(out, null, 2)); console.log('local-weights.mjs: wrote ' + jsonOut); }
  else { console.log(JSON.stringify(out, null, 2)); }
  await browser.close();
})().catch(e => { console.error('local-weights.mjs error:', e); process.exit(4); });