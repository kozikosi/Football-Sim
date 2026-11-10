// mathlab/postures.js <html> — how would a CPU choose its defensive posture? Each real roster (home) vs each of the 31 others, best posture by win probability.
// Also prints the size of the choice (win-probability points) so we know whether it matters. In-memory; read-only on the product.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { installDefAggr } = require('./inpage.js');
const SRC = fs.readFileSync(path.join(__dirname, 'results', 'defposture-product.js.txt'), 'utf8');
(async () => { const b = await chromium.launch(), pg = await b.newPage(); await pg.goto('file://' + process.argv[2]); await pg.waitForFunction(() => typeof slotWinsTable === 'function');
 const r = await pg.evaluate(({ install, src }) => { (0, eval)('(' + install + ')')(src);
  const base = {}; ROSTER_SLOTS.forEach(s => { base[s] = { ovr: 80 }; }); const lg = teamRatings(base);
  const byTeam = {}; PLAYERS.forEach(p => { (byTeam[p[2]] = byTeam[p[2]] || []).push(p); });
  const R = {}; Object.keys(byTeam).forEach(t => { const sm = {}; byTeam[t].sort((a, b) => b[3] - a[3]).forEach(p => { const sl = (NATURAL_SLOT_MAP[p[1]] || []).find(s => !sm[s]); if (sl) sm[sl] = p; }); R[t] = teamRatings(sm); });
  const names = Object.keys(R), P = ['cautious', 'balanced', 'aggressive'], cnt = { cautious: 0, balanced: 0, aggressive: 0 }; let n = 0, gain = 0, maxGain = 0; const thr = { 0.005: { cautious: 0, balanced: 0, aggressive: 0 }, 0.01: { cautious: 0, balanced: 0, aggressive: 0 } }; const byTeamPick = {}, gains = [];
  names.forEach(h => { byTeamPick[h] = { cautious: 0, balanced: 0, aggressive: 0 }; names.forEach(a => { if (a === h) return; const pl = autoPlans(R[h], R[a], lg); const wp = {};
   P.forEach(hp => { const ph = Object.assign({}, pl.home.def, { aggr: hp }); const mh = matchupModel(R[h], R[a], lg, { off: pl.home.off, def: pl.away.def }), ma = matchupModel(R[a], R[h], lg, { off: pl.away.off, def: ph }); wp[hp] = wpFrom(mh, ma, HOME_FIELD); });
   const best = P.reduce((x, y) => (wp[y] > wp[x] ? y : x), 'balanced'); cnt[best]++; byTeamPick[h][best]++; Object.keys(thr).forEach(T => { thr[T][(wp[best] - wp.balanced) >= +T ? best : 'balanced']++; }); n++; const g = wp[best] - wp.balanced; gain += g; gains.push(g); maxGain = Math.max(maxGain, g); }); });
  gains.sort((a, b) => a - b);
  return { thr, cnt, n, meanGain: gain / n, maxGain, p90: gains[Math.floor(gains.length * 0.9)], byTeamPick, teams: names.length }; }, { install: installDefAggr.toString(), src: SRC });
 console.log('real rosters:', r.teams, ' matchups:', r.n);
 console.log('best posture share: cautious', (100 * r.cnt.cautious / r.n).toFixed(1) + '%', ' balanced', (100 * r.cnt.balanced / r.n).toFixed(1) + '%', ' aggressive', (100 * r.cnt.aggressive / r.n).toFixed(1) + '%');
 console.log('win-probability gained over balanced by choosing the best posture: mean', (100 * r.meanGain).toFixed(2), 'pts, 90th pct', (100 * r.p90).toFixed(2), 'pts, max', (100 * r.maxGain).toFixed(2), 'pts');

 [0.005, 0.01].forEach(T => console.log('rule: pick the best posture only if it gains >=', (T * 100) + ' win-prob pts, else balanced -> cautious', (100 * r.thr[T].cautious / r.n).toFixed(1) + '%  balanced', (100 * r.thr[T].balanced / r.n).toFixed(1) + '%  aggressive', (100 * r.thr[T].aggressive / r.n).toFixed(1) + '%'));
 const mixed = Object.values(r.byTeamPick).filter(o => Object.values(o).filter(v => v > 0).length >= 2).length; console.log('teams whose best posture depends on the opponent:', mixed, 'of', r.teams);
 await b.close(); })();
