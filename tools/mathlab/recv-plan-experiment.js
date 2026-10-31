const { chromium } = require('playwright'); const fs = require('fs');
const { installDime, installDL5, installRecv } = require('/home/claude/kozikosi/football-sim/tools/mathlab/inpage.js');
const fit = JSON.parse(fs.readFileSync('/home/claude/kozikosi/football-sim/tools/mathlab/results/fit-precolors-2026-10-27-dl5.json'));
const cfg = JSON.parse(fs.readFileSync('/home/claude/kozikosi/football-sim/tools/mathlab/cfg.json'));
const variants = JSON.parse(process.argv[3]);
function prog(fit, cfg, variants, a, b, c) {
  a(cfg.dime); b(cfg.dl5);
  const SO = { RATING_SPECS, DEF_SPECS, PERS_REC };
  Object.keys(fit.snapped).forEach(n => Object.keys(fit.snapped[n]).forEach(r => Object.assign(SO[n][r], fit.snapped[n][r])));
  Object.keys(fit.mcOut).forEach(k => { MC[k] = fit.mcOut[k]; });
  const out = [];
  variants.forEach(V => {
    window.__pc = V.pc;
    if (!PERS['10']) c(V); else { Object.assign(PERS['10'], V.pers10); }
    PERS['10'] = Object.assign(PERS['10'], V.pers10); PERS_REC['10'] = Object.assign({}, V.rec10);
    _wTable = null; _wpoCache = null;
    const t = {}; ['TE3','WR4','TE2','WR3','TE1'].forEach(s => { t[s] = slotWins(s, 90) - slotWins(s, 70); });
    // plan choice over all real-roster pairs, offence vs league-default defence
    const byTeam = {}; PLAYERS.forEach(p => { (byTeam[p[2]] = byTeam[p[2]] || []).push(p); });
    const lgsm = {}; ROSTER_SLOTS.forEach(s => { lgsm[s] = { ovr: 80 }; }); const lg = teamRatings(lgsm);
    const cnt = {}; let n = 0;
    Object.keys(byTeam).forEach(t1 => { const sm = {}; byTeam[t1].sort((x, y) => y[3] - x[3]).forEach(p => { const sl = (NATURAL_SLOT_MAP[p[1]] || []).find(s => !sm[s]); if (sl) sm[sl] = p; });
      const R = teamRatings(sm); let best = null, bv = -1e9;
      OFF_OPTS.forEach(o => { const v = matchupModel(R, lg, lg, { off: o, def: DEFAULT_DEF }).structPts; if (v > bv) { bv = v; best = o.pers; } });
      cnt[best] = (cnt[best] || 0) + 1; n++; });
    out.push({ V: V.name, t, cnt, n });
  });
  return out;
}
(async () => { const b = await chromium.launch(), pg = await b.newPage(); await pg.goto('file://' + process.argv[2]); await pg.waitForFunction(() => typeof slotWinsTable === 'function');
  const r = await pg.evaluate(`(${prog.toString()})(${JSON.stringify(fit)}, ${JSON.stringify(cfg)}, ${process.argv[3]}, ${installDime.toString()}, ${installDL5.toString()}, ${installRecv.toString()})`);
  r.forEach(x => console.log(x.V, JSON.stringify(Object.fromEntries(Object.entries(x.t).map(([k, v]) => [k, +v.toFixed(3)]))), JSON.stringify(x.cnt))); await b.close(); })();
