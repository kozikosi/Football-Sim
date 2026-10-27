// mathlab/inpage.js — functions that run INSIDE the page (serialised). Measurement only; never writes a product file.
// installDime(D): adds the 29th slot DIME and its situational coverage term to the live engine, in memory.
//   D = {w, spec}.  w = effective share of the coverage rating that comes from the dime grouping
//   (= snap share x passing-down leverage; Owner: ~10% of snaps, 3rd/4th and long and late in games; leverage is INFERRED).
//   spec = covDime weights (6 DBs: CB1-3, DIME, SS, FS; MIKE the only LB). Applied to coverage only: dime snaps are passing snaps,
//   so the run-defense rating is untouched. NOT a DEF_OPTS package: the plan search would otherwise run dime on every snap.
function installDime(D) {
  // Wave-11 shim: Pre-Colors has no FB/P slots and no punt term; Z-post-blue does. Add them in memory so one lab serves both files.
  if (!ROSTER_SLOTS.includes('FB')) {
    ROSTER_SLOTS.push('FB', 'P'); WV_OFF_SLOTS.add('FB'); RATING_SPECS.olRun.FB = 0.30; window.PUNT_PTS = 1.6;
    NATURAL_SLOT_MAP.FB = NATURAL_SLOT_MAP.FB || ['FB']; NATURAL_SLOT_MAP.P = NATURAL_SLOT_MAP.P || ['P'];
    const tr = teamRatings; teamRatings = function (sm) { const r = tr(sm); r.p = slotOvr(sm, 'P'); return r; };
    const mm = matchupModel; matchupModel = function (O0, D0, lg, plan) { const m = mm(O0, D0, lg, plan), g = (x, d) => (x != null ? x : d);
      m.structPts += -window.PUNT_PTS * (Math.exp((g(D0.p, 80) - 80) / 45) - Math.exp((g(lg.p, 80) - 80) / 45)); return m; };
    window.__shim11 = true;
  }
  if (!ROSTER_SLOTS.includes('DIME')) ROSTER_SLOTS.push('DIME');
  SLOT_FAMILY.DIME = 'DIME';
  if (!NATURAL_SLOT_MAP.CB.includes('DIME')) NATURAL_SLOT_MAP.CB.push('DIME');
  DEF_SPECS.covDime = Object.assign({}, D.spec);
  const orig = window.__origApplyDef || applyDefPlan; window.__origApplyDef = orig;
  window.__dimeW = D.w;
  applyDefPlan = function (Dd, pd, isLeague) {
    const out = orig(Dd, pd, isLeague);
    if (Dd.covDime != null) out.coverage = (1 - window.__dimeW) * out.coverage + window.__dimeW * Dd.covDime;
    return out;
  };
  _wTable = null; _wpoCache = null;
  return ROSTER_SLOTS.length;
}
module.exports = { installDime };

// installDefAggr(src, K): loads the PRODUCT-FORM text results/defposture-product.js.txt (so the lab tests exactly what ships) and wraps matchupModel.
function installDefAggr(src, K) {
  const origMM = window.__origMMforAggr || matchupModel; window.__origMMforAggr = origMM;
  const fn = new Function(src + '\n;return {applyDefPosture, DAGGR_INFO, DEF_POSTURE_K};')();
  window.__posture = fn; window.__postureK = K || fn.DEF_POSTURE_K;
  matchupModel = function (O0, D0, lg, plan) {
    const m = origMM(O0, D0, lg, plan);
    return window.__posture.applyDefPosture(m, O0, D0, lg, plan && plan.def, window.__postureK);
  };
  return Object.keys(fn.DAGGR_INFO);
}
module.exports.installDefAggr = installDefAggr;
