// mathlab/after.js — install a fit result (weights + MC + new run/punt terms) in memory, then print table, pass/run split and full-lineup realism.
// usage: node after.js <html> <fit.json> <cfg.json>
const { chromium } = require('playwright'); const fs = require('fs'); const lab = require('./lab.js'); const { installDime, installDL5, installRecv } = require('./inpage.js');
const [file, fitF, cfgF] = process.argv.slice(2);
const fit = JSON.parse(fs.readFileSync(fitF)), cfg = JSON.parse(fs.readFileSync(cfgF));
function install(fit, cfg) {
  const origTR = teamRatings, origMM = matchupModel, P = Object.assign({}, cfg.patch); P.puntPts = fit.puntPts;
  teamRatings = function (sm) { const r = origTR(sm); r.qbRunR = slotOvr(sm, 'QB'); const w = P.wrBlkW; r.wrBlk = (slotOvr(sm, 'WR1') * w[0] + slotOvr(sm, 'WR2') * w[1] + slotOvr(sm, 'WR3') * w[2]) / (w[0] + w[1] + w[2]); return r; };
  matchupModel = function (O0, D0, lg, plan) { const m = origMM(O0, D0, lg, plan), g = (x, d) => (x != null ? x : d);
    const qbRun = P.qbRunC * (g(O0.qbRunR, 80) - g(lg.qbRunR, 80)), wrBlk = P.wrBlkC * (g(O0.wrBlk, 80) - g(lg.wrBlk, 80));
    const pp = c => -c * (Math.exp((g(D0.p, 80) - 80) / 45) - Math.exp((g(lg.p, 80) - 80) / 45));
    m.structPts += qbRun + wrBlk + (pp(P.puntPts) - pp(PUNT_PTS));
    m.channels = Object.assign({}, m.channels, { run: m.channels.run + qbRun + wrBlk }); return m; };
  const SO = { RATING_SPECS, DEF_SPECS, PERS_REC };
  Object.keys(fit.snapped).forEach(n => Object.keys(fit.snapped[n]).forEach(r => Object.assign(SO[n][r], fit.snapped[n][r])));
  Object.keys(fit.mcOut).forEach(k => { MC[k] = fit.mcOut[k]; });
  _wTable = null; _wpoCache = null;
}
(async () => {
  const { browser, page, errs } = await lab.open(file);
  if (cfg.dime) await page.evaluate(`(${installDime.toString()})(${JSON.stringify(cfg.dime)})`);
  if (cfg.dl5) await page.evaluate(`(${installDL5.toString()})(${JSON.stringify(cfg.dl5)})`);
  if (cfg.recv) await page.evaluate(`(${installRecv.toString()})(${JSON.stringify(cfg.recv)})`);
  await page.evaluate(`(${install.toString()})(${JSON.stringify(fit)}, ${JSON.stringify(cfg)})`);
  const out = {
    table: await page.evaluate(lab.inPageTable), split: await page.evaluate(lab.inPageSplit), stack: await page.evaluate(lab.inPageStack)
  };
  console.log('slot  w70-90  wt   run%/pass%');
  Object.entries(out.table).sort((a, b) => b[1].w7090 - a[1].w7090).forEach(([s, v]) => {
    const sp = out.split[s]; console.log(s.padEnd(5), v.w7090.toFixed(3), String(Math.round(v.w7090 / 0.00254 / 10) * 10).padStart(5), (sp.run * 100).toFixed(0).padStart(3) + '/' + (sp.pass * 100).toFixed(0).padStart(3) + (sp.st > 0.5 ? ' (kicking)' : ''));
  });
  console.log('\nfull-lineup realism (linearised points->wins vs a league of 80s):');
  Object.entries(out.stack).forEach(([o, v]) => console.log(' all', o, 'off', v.offPts.toFixed(1), 'def', v.defPts.toFixed(1), 'wins', v.wins.toFixed(1)));
  console.log('page errors:', errs.length);
  if (process.argv[5]) fs.writeFileSync(process.argv[5], JSON.stringify(out, null, 1));
  await browser.close();
})();
