// P-345 measurement: the two-gap ratio R = Wins20/Wins10 on the REAL engine (Pre-Colors, sha256 40233d6be00e987c...).
// Wins10 = slotWins(slot, 80) - slotWins(slot, 70); Wins20 = slotWins(slot, 90) - slotWins(slot, 70).
// If the slot-wins curve is linear in OVR, R == 2.000 for every slot. R < 2 marks saturation (softmax/softCap-like);
// R > 2 marks convexity. MUSE's P-345 filing (inbox/20261111-1506-muse-P-345-lambda-identification.md) makes R the
// falsifiable test for the functional form; this run measures R on the current engine as a preliminary read.
// Read-only: never writes the product file, same discipline as tools/mathlab/lab.js.
const path = require('node:path');
const lab = require('/Users/kosi/Desktop/wt/inkling/tools/mathlab/lab.js');

(async () => {
  const file = '/Users/kosi/Desktop/wt/inkling/Football-Sim-PreColors.html';
  const { browser, page, errs } = await lab.open(file);
  const out = await page.evaluate(() => {
    _wTable = null; _wpoCache = null;
    const T = slotWinsTable();
    const r = {};
    for (const s of Object.keys(T)) {
      const w = (o) => slotWins(s, o);
      r[s] = [w(70), w(80), w(90)];
    }
    return r;
  });
  await browser.close();
  console.log('slot'.padEnd(6), 'wins10'.padStart(8), 'wins20'.padStart(8), 'R=wins20/wins10'.padStart(16), 'R/2'.padStart(6));
  const ratios = [];
  for (const [s, [a, b, c]] of Object.entries(out)) {
    const w10 = b - a, w20 = c - a;
    const R = w20 / w10;
    ratios.push(R);
    console.log(s.padEnd(6), w10.toFixed(3).padStart(8), w20.toFixed(3).padStart(8), R.toFixed(4).padStart(16), (R / 2).toFixed(4).padStart(6));
  }
  const mean = ratios.reduce((x, y) => x + y, 0) / ratios.length;
  const min = Math.min(...ratios), max = Math.max(...ratios);
  console.log(`\nmean R ${mean.toFixed(4)}   min ${min.toFixed(4)}   max ${max.toFixed(4)}   n=${ratios.length}`);
  console.log('page errors:', errs.length);
})().catch((e) => { console.error(e); process.exit(4); });
