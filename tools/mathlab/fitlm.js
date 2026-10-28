// mathlab/fitlm.js — Levenberg-Marquardt fit of the REAL engine's composition weights to a target wins table.
// In-memory patch of a product-like HTML inside headless Chromium. Measurement/fit only; never writes a product file.
// usage: NODE_PATH=$(npm root -g) node fitlm.js <html> <cfg.json> [--out result.json]
// cfg: {targets:{slot:wins7090}, patch:{qbRunC,wrBlkC,wrBlkW,puntPts}, grid, iters, ridge, mcKnobs:[..]}
const { chromium } = require('playwright');
const fs = require('fs');
const { installDime, installDL5 } = require('./inpage.js');
const file = process.argv[2];
const cfg = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
const outPath = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null;

function pageProgram(cfg) {
  const origTR = teamRatings, origMM = matchupModel;
  const P = Object.assign({}, cfg.patch);
  teamRatings = function (sm) {
    const r = origTR(sm);
    r.qbRunR = slotOvr(sm, 'QB');
    const w = P.wrBlkW;
    r.wrBlk = (slotOvr(sm, 'WR1') * w[0] + slotOvr(sm, 'WR2') * w[1] + slotOvr(sm, 'WR3') * w[2]) / (w[0] + w[1] + w[2]);
    return r;
  };
  matchupModel = function (O0, D0, lg, plan) {
    const m = origMM(O0, D0, lg, plan);
    const g = (x, d) => (x != null ? x : d);
    const qbRun = P.qbRunC * (g(O0.qbRunR, 80) - g(lg.qbRunR, 80));
    const wrBlk = P.wrBlkC * (g(O0.wrBlk, 80) - g(lg.wrBlk, 80));
    const pp = c => -c * (Math.exp((g(D0.p, 80) - 80) / 45) - Math.exp((g(lg.p, 80) - 80) / 45));
    m.structPts += qbRun + wrBlk + (pp(P.puntPts) - pp(PUNT_PTS));
    m.channels = Object.assign({}, m.channels, { run: m.channels.run + qbRun + wrBlk });
    return m;
  };
  const SPEC_OBJS = { RATING_SPECS, DEF_SPECS, PERS_REC };
  const orig = {}; Object.keys(SPEC_OBJS).forEach(n => { orig[n] = JSON.parse(JSON.stringify(SPEC_OBJS[n])); });
  const origMC = JSON.parse(JSON.stringify(MC));
  const origP = P.puntPts;
  const SPECIAL = ['QB', 'K', 'P'];
  const slotVars = ROSTER_SLOTS.filter(s => SPECIAL.indexOf(s) < 0);
  const mcKnobs = cfg.mcKnobs;           // e.g. ['rb','olRun','front','rec','olPass','rush','cov']
  const names = slotVars.concat(['__qb', '__K', '__P']).concat(mcKnobs.map(k => '__mc_' + k));
  const apply = x => {
    const f = {}; names.forEach((n, i) => { f[n] = Math.exp(x[i]); });
    Object.keys(SPEC_OBJS).forEach(n => Object.keys(orig[n]).forEach(row => Object.keys(orig[n][row]).forEach(s => {
      SPEC_OBJS[n][row][s] = orig[n][row][s] * (f[s] != null ? f[s] : 1);
    })));
    Object.keys(origMC).forEach(k => { MC[k] = origMC[k]; });
    MC.qb = origMC.qb * f.__qb; MC.toQb = origMC.toQb * f.__qb; MC.kick = origMC.kick * f.__K; P.puntPts = origP * f.__P;
    mcKnobs.forEach(k => { MC[k] = origMC[k] * f['__mc_' + k]; });
    return f;
  };
  const measure = () => { _wTable = null; _wpoCache = null; const o = {}; ROSTER_SLOTS.forEach(s => { o[s] = slotWins(s, 90) - slotWins(s, 70); }); return o; };
  const T = cfg.targets, tk = Object.keys(T);
  const resid = x => { apply(x); const w = measure(); return tk.map(s => Math.log(Math.max(1e-4, w[s])) - Math.log(T[s])); };
  const n = names.length, m = tk.length;
  // ridge pulls every variable toward "unchanged" (log 0): the smallest edit that hits the table
  const ridge = cfg.ridge;
  let x = new Array(n).fill(0), lam = 0.05, r = resid(x);
  const cost = (rr, xx) => rr.reduce((a, v) => a + v * v, 0) + ridge * xx.reduce((a, v) => a + v * v, 0);
  let c = cost(r, x); const hist = [Math.sqrt(r.reduce((a, v) => a + v * v, 0) / m)];
  const solve = (A, b) => {   // Gaussian elimination with partial pivoting
    const N = b.length, M = A.map((row, i) => row.concat([b[i]]));
    for (let i = 0; i < N; i++) {
      let p = i; for (let k = i + 1; k < N; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
      [M[i], M[p]] = [M[p], M[i]];
      for (let k = i + 1; k < N; k++) { const q = M[k][i] / M[i][i]; for (let j = i; j <= N; j++) M[k][j] -= q * M[i][j]; }
    }
    const s = new Array(N).fill(0);
    for (let i = N - 1; i >= 0; i--) { let v = M[i][N]; for (let j = i + 1; j < N; j++) v -= M[i][j] * s[j]; s[i] = v / M[i][i]; }
    return s;
  };
  for (let it = 0; it < cfg.iters; it++) {
    const J = []; const h = 0.01;
    for (let j = 0; j < n; j++) { const xp = x.slice(); xp[j] += h; const rp = resid(xp); J.push(rp.map((v, i) => (v - r[i]) / h)); }  // J[j][i]
    const A = [], b = [];
    for (let a = 0; a < n; a++) {
      const row = [];
      for (let bb = 0; bb < n; bb++) { let s = 0; for (let i = 0; i < m; i++) s += J[a][i] * J[bb][i]; row.push(s + (a === bb ? ridge + lam * (1 + 0) : 0)); }
      A.push(row); let g = 0; for (let i = 0; i < m; i++) g += J[a][i] * r[i]; b.push(-(g + ridge * x[a]));
    }
    const step = solve(A, b);
    const xn = x.map((v, i) => v + Math.max(-0.5, Math.min(0.5, step[i])));
    const rn = resid(xn), cn = cost(rn, xn);
    if (cn < c) { x = xn; r = rn; c = cn; lam = Math.max(1e-4, lam * 0.5); } else { lam *= 4; }
    hist.push(Math.sqrt(r.reduce((a, v) => a + v * v, 0) / m));
    if (hist[hist.length - 1] < 0.004) break;
  }
  const f = apply(x); const fitted = measure();
  // snap composition weights to the grid and re-measure
  const g = cfg.grid, snapped = {};
  Object.keys(SPEC_OBJS).forEach(nm => { snapped[nm] = {}; Object.keys(orig[nm]).forEach(row => { snapped[nm][row] = {}; Object.keys(orig[nm][row]).forEach(s => {
    const v = Math.max(g, Math.round(orig[nm][row][s] * (f[s] != null ? f[s] : 1) / g) * g); snapped[nm][row][s] = +v.toFixed(3); SPEC_OBJS[nm][row][s] = +v.toFixed(3); }); }); });
  const mcOut = {}; ['qb', 'toQb', 'kick'].concat(mcKnobs).forEach(k => { mcOut[k] = +MC[k].toFixed(5); MC[k] = mcOut[k]; });
  P.puntPts = +P.puntPts.toFixed(3);
  const final = measure();
  return { hist, fitted, final, snapped, orig, mcOut, origMC, puntPts: P.puntPts, factors: f, names };
}

(async () => {
  const browser = await chromium.launch(); const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + file);
  await page.waitForFunction(() => typeof slotWinsTable === 'function', null, { timeout: 20000 });
  if (cfg.dime) console.log('slots after installDime:', await page.evaluate(`(${installDime.toString()})(${JSON.stringify(cfg.dime)})`));
  if (cfg.dl5) console.log('slots after installDL5:', await page.evaluate(`(${installDL5.toString()})(${JSON.stringify(cfg.dl5)})`));
  const res = await page.evaluate(`(${pageProgram.toString()})(${JSON.stringify(cfg)})`);
  const T = cfg.targets;
  console.log('rms log-error by iteration:', res.hist.map(v => (v * 100).toFixed(1) + '%').join(' '));
  console.log('slot   target  fitted  snapped  err%');
  Object.keys(T).forEach(s => { const e = (res.final[s] / T[s] - 1) * 100; console.log(s.padEnd(5), T[s].toFixed(3).padStart(7), res.fitted[s].toFixed(3).padStart(7), res.final[s].toFixed(3).padStart(8), (e >= 0 ? '+' : '') + e.toFixed(1).padStart(5)); });
  console.log('MC:', JSON.stringify(res.mcOut), 'puntPts', res.puntPts);
  console.log('knob factors:', Object.entries(res.factors).filter(([k]) => k.startsWith('__')).map(([k, v]) => k + '=' + v.toFixed(2)).join(' '));
  console.log('page errors:', errs.length);
  if (outPath) fs.writeFileSync(outPath, JSON.stringify(res, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(4); });
