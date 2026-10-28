// mathlab/realcheck.js — correlate engine team strength (real rosters) with real 2025 wins, before/after a fit result.
const { chromium } = require('playwright'); const fs = require('fs'); const { installDime, installDL5, installRecv } = require('./inpage.js');
const [file, fitFile, winsFile] = process.argv.slice(2, 5);
const fit = JSON.parse(fs.readFileSync(fitFile)), wins = JSON.parse(fs.readFileSync(winsFile));
const cfg = JSON.parse(fs.readFileSync(process.argv[5]));
function prog(fit, cfg, installDimeFn, installDL5Fn, installRecvFn) {
  const strengths = () => {
    const base = {}; ROSTER_SLOTS.forEach(s => { base[s] = { ovr: 80 }; });
    const lg = teamRatings(base), b0 = { on: bestUnitPts(lg, lg, true), off: bestUnitPts(lg, lg, false) };
    const byTeam = {}; PLAYERS.forEach(p => { (byTeam[p[2]] = byTeam[p[2]] || []).push(p); });
    const out = {};
    Object.keys(byTeam).forEach(t => {
      const sm = {}; byTeam[t].sort((a, b) => b[3] - a[3]).forEach(p => { const sl = (NATURAL_SLOT_MAP[p[1]] || []).find(s => !sm[s]); if (sl) sm[s = sl] = p; });
      const R = teamRatings(sm);
      out[t] = (bestUnitPts(R, lg, true) - b0.on) + (bestUnitPts(R, lg, false) - b0.off);
    });
    return out;
  };
  const before = strengths();
  if (cfg.dime) installDimeFn(cfg.dime);
  if (cfg.dl5) installDL5Fn(cfg.dl5);
  if (cfg.recv) installRecvFn(cfg.recv);
  // install patch + fitted weights
  const origTR = teamRatings, origMM = matchupModel, P = Object.assign({}, cfg.patch); P.puntPts = fit.puntPts;
  teamRatings = function (sm) { const r = origTR(sm); r.qbRunR = slotOvr(sm, 'QB'); const w = P.wrBlkW; r.wrBlk = (slotOvr(sm, 'WR1') * w[0] + slotOvr(sm, 'WR2') * w[1] + slotOvr(sm, 'WR3') * w[2]) / (w[0] + w[1] + w[2]); return r; };
  matchupModel = function (O0, D0, lg, plan) { const m = origMM(O0, D0, lg, plan), g = (x, d) => (x != null ? x : d);
    const qbRun = P.qbRunC * (g(O0.qbRunR, 80) - g(lg.qbRunR, 80)), wrBlk = P.wrBlkC * (g(O0.wrBlk, 80) - g(lg.wrBlk, 80));
    const pp = c => -c * (Math.exp((g(D0.p, 80) - 80) / 45) - Math.exp((g(lg.p, 80) - 80) / 45));
    m.structPts += qbRun + wrBlk + (pp(P.puntPts) - pp(PUNT_PTS)); return m; };
  const SO = { RATING_SPECS, DEF_SPECS, PERS_REC };
  Object.keys(fit.snapped).forEach(n => Object.keys(fit.snapped[n]).forEach(r => Object.assign(SO[n][r], fit.snapped[n][r])));
  Object.keys(fit.mcOut).forEach(k => { MC[k] = fit.mcOut[k]; });
  _wTable = null; _wpoCache = null;
  const after = strengths();
  return { before, after, teams: Object.keys(before).length, counts: (() => { const c = {}; PLAYERS.forEach(p => { c[p[2]] = (c[p[2]] || 0) + 1; }); return c; })() };
}
(async () => {
  const b = await chromium.launch(), pg = await b.newPage(); const errs = []; pg.on('pageerror', e => errs.push(String(e)));
  await pg.goto('file://' + file); await pg.waitForFunction(() => typeof slotWinsTable === 'function');
  const r = await pg.evaluate(`(${prog.toString()})(${JSON.stringify(fit)}, ${JSON.stringify(cfg)}, ${installDime.toString()}, ${installDL5.toString()}, ${installRecv.toString()})`);
  const names = Object.keys(wins).filter(t => r.before[t] != null);
  const corr = (xs, ys) => { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxy = 0, sxx = 0, syy = 0; xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; syy += (ys[i] - my) ** 2; }); return sxy / Math.sqrt(sxx * syy); };
  const rank = a => { const idx = a.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]); const rk = new Array(a.length); idx.forEach((p, k) => { rk[p[1]] = k; }); return rk; };
  const y = names.map(t => wins[t]);
  let gate = null;
  for (const k of ['before', 'after']) {
    const x = names.map(t => r[k][t]);
    const slope = (() => { const n = x.length, mx = x.reduce((a, b) => a + b) / n, my = y.reduce((a, b) => a + b) / n; let sxy = 0, sxx = 0; x.forEach((v, i) => { sxy += (v - mx) * (y[i] - my); sxx += (v - mx) ** 2; }); return [sxy / sxx, my - sxy / sxx * mx]; })();
    const rmse = Math.sqrt(x.reduce((a, v, i) => a + (slope[0] * v + slope[1] - y[i]) ** 2, 0) / x.length);
    const sd = Math.sqrt(x.reduce((a, v) => a + v * v, 0) / x.length - (x.reduce((a, v) => a + v, 0) / x.length) ** 2);
    if (k === 'after') gate = { r: corr(x, y), sd };
    console.log(k.padEnd(6), 'teams', names.length, 'pearson r', corr(x, y).toFixed(3), 'spearman', corr(rank(x), rank(y)).toFixed(3), 'rmse(wins)', rmse.toFixed(2), 'sd(pts/g)', sd.toFixed(2), 'slope', slope[0].toFixed(3));
  }
  console.log('players per team min/max', Math.min(...Object.values(r.counts)), Math.max(...Object.values(r.counts)), 'errs', errs.length);
  const ok = gate && gate.r >= 0.60 && gate.sd >= 4.0 && gate.sd <= 5.5 && errs.length === 0 && names.length === 32;
  console.log(ok ? 'E4 PASS (r >= 0.60, spread 4.0-5.5 pts/g, 32 teams, no page errors)' : `E4 FAIL r=${gate && gate.r.toFixed(3)} sd=${gate && gate.sd.toFixed(2)} teams=${names.length} errs=${errs.length}`);
  await b.close(); process.exit(ok ? 0 : 1);
})();
