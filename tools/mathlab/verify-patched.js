// mathlab/verify-patched.js <patched.html> <fit.json> — measures a text-patched file DIRECTLY (no in-memory shim) and compares it with the fit.
// Proves the pasted literals reproduce the fitted engine. Exit 1 if any spot differs by more than 0.002 wins or the page throws.
const path = require('path'); const lab = require(path.join(__dirname, 'lab.js')); const fit = require(path.resolve(process.argv[3]));
(async () => {
  const { browser, page, errs } = await lab.open(path.resolve(process.argv[2]));
  const t = await page.evaluate(lab.inPageTable);
  let mx = 0, w = ''; Object.keys(fit.final).forEach(s => { const d = Math.abs((t[s] || { w7090: NaN }).w7090 - fit.final[s]); if (!(d <= mx)) { mx = d; w = s; } });
  const der = {}; Object.keys(t).forEach(s => { der[s] = Math.round(t[s].w7090 / 0.00254 / 10) * 10; });
  console.log('spots in patched file', Object.keys(t).length, '| max |patched - fit| =', mx.toExponential(2), 'wins at', w, '| page errors', errs.length, errs.slice(0, 2));
  console.log('derived weights: QB', der.QB, 'DE1', der.DE1, 'CB1', der.CB1, 'K', der.K, 'P', der.P, 'DIME', der.DIME, 'DL5', der.DL5, 'FB', der.FB, 'SAM', der.SAM);
  await browser.close(); process.exit(errs.length || !(mx <= 0.002) ? 1 : 0);
})();
