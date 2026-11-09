// tools/mathlab/local-slope.mjs — measures local slope at spreads ±3, ±5, ±7, ±10 centered on position averages

// Usage: node local-slope.mjs <html> [--json out.json]
// Extracts in-page measurement of local slopes, writes JSON of per-slot slopes at spreads, side-by-side.

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

// In-page measurement
function localSlopes() {
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
  Object.keys(groups).forEach(g => {
    posAvg[g] = groups[g].n ? groups[g].sum / groups[g].n : 80;
  });
  const slotAvg = {};
  ROSTER_SLOTS.forEach(s => {
    const g = slotG[s];
    slotAvg[s] = posAvg[g] != null ? posAvg[g] : 80;
  });
  const base = {};
  ROSTER_SLOTS.forEach(s => {
    base[s] = { ovr: slotAvg[s] };
  });
  const lg = teamRatings(base);
  const k = 17 / POINTS_PER_WIN;
  const b0 = {
    on: bestUnitPts(lg, lg, true),
    off: bestUnitPts(lg, lg, false)
  };
  const w = (slot, ovr, isOff) => {
    const sm = Object.assign({}, base);
    sm[slot] = { ovr };
    const R = teamRatings(sm);
    const u = bestUnitPts(R, lg, isOff);
    const o = isOff ? b0.on : b0.off;
    return (u - o) * k;
  };
  const out = {};
  ROSTER_SLOTS.forEach(s => {
    const isOff = WV_OFF_SLOTS.has(s);
    const center = slotAvg[s];
    const entry = {
      group: slotG[s],
      center: Number(center.toFixed(3)),
      oldSlope: Number(((slotWins(s, 90) - slotWins(s, 70)) / 20).toFixed(6))
    };
    spreads.forEach(sp => {
      const lo = Math.max(50, center - sp);
      const hi = Math.min(99.999, center + sp);
      const loW = w(s, lo, isOff);
      const hiW = w(s, hi, isOff);
      entry[`spread${sp}`] = {
        loWins: Number(loW.toFixed(3)),
        hiWins: Number(hiW.toFixed(3)),
        slope: Number((hiW - loW) / (2 * sp)).toFixed(6)
      };
    });
    out[s] = entry;
  });
  return { spreads, groupAvg: posAvg, slots: out };
}

(async () => {
  const file = process.argv[2];
  const jsonOut = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;
  const { browser, page, errs } = await open(file);
  const results = await page.evaluate(localSlopes);
  const out = {
    file: file,
    source: 'local-slope.mjs',
    measuredAt: new Date().toISOString() + 'Z',
    note: 'Local slopes at spreads ±3,±5,±7,±10, centered on per-position pool averages. Context: other slots at their position averages (group averages). Old slope: (slotWins(90)-slotWins(70))/20 with all-80 context.',
    groupAvg: Object.fromEntries(Object.entries(results.groupAvg).map(([k,v]) => [k, Number(v.toFixed(3))])),
    slots: results.slots,
    pageErrors: errs.length
  };
  if (jsonOut) {
    fs.writeFileSync(jsonOut, JSON.stringify(out, null, 2));
    console.log(`local-slope.mjs: wrote ${jsonOut}`);
  } else {
    console.log(JSON.stringify(out, null, 2));
  }
  await browser.close();
})().catch(e => { console.error('local-slope.mjs error:', e); process.exit(4); });