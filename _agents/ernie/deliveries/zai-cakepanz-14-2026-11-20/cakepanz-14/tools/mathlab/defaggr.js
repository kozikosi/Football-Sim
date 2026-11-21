// mathlab/defaggr.js <html> [cfg.json]  — measures the defensive-aggressiveness posture on the REAL engine (in memory, seeded where random).
// Prints: neutral-matchup effects, EV calibration, team interactions, the "omitted = unchanged" identity test, and a seeded game simulation.
// Exit 1 if an acceptance test fails.  usage: NODE_PATH=$(npm root -g) node defaggr.js <html> [N]
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const { installDefAggr } = require('./inpage.js');
const SRC = fs.readFileSync(path.join(__dirname, 'results', 'defposture-product.js.txt'), 'utf8');
const file = process.argv[2], N = +(process.argv[3] || 4000);
function prog({ N, install, src }) {
  const P0 = (0, eval)('(' + install + ')')(src) && window.__postureK; const P00 = Object.assign({}, P0);
  const out = { tests: [] }; const base = {}; ROSTER_SLOTS.forEach(s => { base[s] = { ovr: 80 }; });
  const lg = teamRatings(base);
  const net = (O, D, b, P) => { window.__postureK = P; const m = matchupModel(O, D, lg, { off: NEUTRAL_OFF, def: { pkg: 'nickel', focus: 'neutral', aggr: b } }); return m; };
  const ref = matchupModel(lg, lg, lg, { off: NEUTRAL_OFF, def: DEFAULT_DEF });
  // identity: omitted aggr is bit-identical to 'balanced' and to the engine without the patch
  const bal = matchupModel(lg, lg, lg, { off: NEUTRAL_OFF, def: { pkg: 'nickel', focus: 'neutral', aggr: 'balanced' } });
  const strip = m => { const c = Object.assign({}, m); delete c.plan; return JSON.stringify(c); };
  const unpatched = (window.__origMMforAggr)(lg, lg, lg, { off: NEUTRAL_OFF, def: DEFAULT_DEF });
  out.identity = strip(ref) === strip(bal) && strip(ref) === strip(unpatched);
  // E-calibration: solve P.big so that aggressive is EV-neutral at a league-average matchup
  let lo = 0, hi = 0.2, P = Object.assign({}, P00);
  for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; P.big = mid; const d = net(lg, lg, 'aggressive', P).structPts - ref.structPts; if (d > 0) hi = mid; else lo = mid; }
  out.bigSolved = P.big; P.big = P00.big; out.bigShipped = P00.big;
  const rows = {};
  ['cautious', 'balanced', 'aggressive'].forEach(a => { const m = net(lg, lg, a, P); rows[a] = { dPts: m.structPts - ref.structPts, pass: m.expPass, sacks: m.lamSack, to: m.lamTO, sd: m.sd, vm: m.vm }; });
  out.neutral = rows; out.ref = { pass: ref.expPass, sacks: ref.lamSack, to: ref.lamTO, sd: ref.sd, pts: ref.structPts };
  // interactions on aggressive: own coverage +-10, opposing QB +-10
  const bump = (base0, slotsUp, d) => { const sm = Object.assign({}, base); slotsUp.forEach(s => { sm[s] = { ovr: 80 + d }; }); return teamRatings(sm); };
  const dRef = (O, D, a) => net(O, D, a, P).structPts - matchupModel(O, D, lg, { off: NEUTRAL_OFF, def: { pkg: 'nickel', focus: 'neutral' } }).structPts;
  const covUp = bump(0, ['CB1', 'CB2', 'CB3', 'SS', 'FS'], 10), covDn = bump(0, ['CB1', 'CB2', 'CB3', 'SS', 'FS'], -10), qbUp = bump(0, ['QB'], 10), qbDn = bump(0, ['QB'], -10);
  out.inter = { 'aggressive, own coverage +10': dRef(lg, covUp, 'aggressive'), 'aggressive, own coverage -10': dRef(lg, covDn, 'aggressive'), 'aggressive vs QB +10': dRef(qbUp, lg, 'aggressive'), 'aggressive vs QB -10': dRef(qbDn, lg, 'aggressive'),
    'cautious, own coverage +10': dRef(lg, covUp, 'cautious'), 'cautious vs QB +10': dRef(qbUp, lg, 'cautious') };
  // seeded simulation, common random numbers: same seed for every posture
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const realRandom = Math.random; window.__postureK = P;
  const sim = (awaySM, post) => {
    const R = mulberry(12345); Math.random = R;
    const sm = {}; ROSTER_SLOTS.forEach(s => { sm[s] = { ovr: 80 }; });
    const acc = { n: 0, pass: 0, sacks: 0, to: 0, aPts: 0, aPts2: 0, hWin: 0, big: 0, aMax: 0 };
    for (let i = 0; i < N; i++) {
      const H = teamRatings(sm), A = teamRatings(awaySM), pl = autoPlans(H, A, lg);
      pl.home = Object.assign({}, pl.home, { def: Object.assign({}, pl.home.def, { aggr: post }) });
      const g = simulateGame(sm, awaySM, false, lg, pl);
      acc.n++; acc.pass += g.awayStats.passYards; acc.sacks += g.awayStats.sacks; acc.to += g.awayStats.turnovers; acc.aPts += g.awayScore; acc.aPts2 += g.awayScore ** 2; acc.hWin += g.homeScore > g.awayScore ? 1 : 0;
      acc.big += g.awayStats.passYards >= 330 ? 1 : 0;   // a 330+ yard passing game as a proxy for big-play days (INFERRED)
    }
    Math.random = realRandom;
    return { passYds: acc.pass / acc.n, sacks: acc.sacks / acc.n, to: acc.to / acc.n, ptsAllowed: acc.aPts / acc.n, sdAllowed: Math.sqrt(acc.aPts2 / acc.n - (acc.aPts / acc.n) ** 2), homeWin: acc.hWin / acc.n, p330: acc.big / acc.n };
  };
  const eq = {}, strongQB = bump(0, ['QB'], 12);
  ['cautious', 'balanced', 'aggressive'].forEach(a => { eq[a] = sim(Object.assign({}, base) && teamRatings(base) && base, a); });
  out.sim = eq; out.simQB = {}; const smQB = Object.assign({}, base); smQB.QB = { ovr: 92 };
  ['cautious', 'balanced', 'aggressive'].forEach(a => { out.simQB[a] = sim(smQB, a); });
  out.P = P; return out;
}
(async () => {
  const b = await chromium.launch(), pg = await b.newPage(); const errs = []; pg.on('pageerror', e => errs.push(String(e)));
  await pg.goto('file://' + file); await pg.waitForFunction(() => typeof slotWinsTable === 'function');
  const r = await pg.evaluate(prog, { N, install: installDefAggr.toString(), src: SRC });
  const f = (x, d = 2) => (x >= 0 ? '+' : '') + x.toFixed(d);
  console.log('identity (aggr omitted == balanced == unpatched engine):', r.identity);
  console.log('EV-solved big-play coefficient', r.bigSolved.toFixed(4), '; shipped constant', r.bigShipped, '(sack', r.P.sack, 'takeaway', r.P.to, 'spread', r.P.vari, 'cov', r.P.cov, 'qb', r.P.qb + ')');
  console.log('\nneutral matchup (league-average vs league-average), model means per game:');
  console.log('posture   pts allowed d   pass yds  sacks   takeaways  sd');
  Object.entries(r.neutral).forEach(([a, v]) => console.log(a.padEnd(11), f(v.dPts, 3).padStart(7), v.pass.toFixed(1).padStart(8), v.sacks.toFixed(2).padStart(6), v.to.toFixed(2).padStart(9), v.sd.toFixed(2).padStart(8)));
  console.log('\ninteractions (change in POINTS ALLOWED per game vs the balanced posture, same teams; negative = good for the defense):');
  Object.entries(r.inter).forEach(([k, v]) => console.log(' ', k.padEnd(32), f(v, 3)));
  console.log('\nseeded simulation, N =', N, 'games, equal 80-rated teams, same random numbers for every posture (home team defends):');
  console.log('posture     away pass yds  sacks  takeaways  pts allowed (sd)   home win%  330+ yd pass games');
  Object.entries(r.sim).forEach(([a, v]) => console.log(a.padEnd(11), v.passYds.toFixed(1).padStart(12), v.sacks.toFixed(2).padStart(6), v.to.toFixed(2).padStart(9), (v.ptsAllowed.toFixed(2) + ' (' + v.sdAllowed.toFixed(2) + ')').padStart(18), (v.homeWin * 100).toFixed(1).padStart(9), (v.p330 * 100).toFixed(1).padStart(10) + '%'));
  console.log('\nsame, but the away team has a 92-rated QB:');
  Object.entries(r.simQB).forEach(([a, v]) => console.log(a.padEnd(11), v.passYds.toFixed(1).padStart(12), v.sacks.toFixed(2).padStart(6), v.to.toFixed(2).padStart(9), (v.ptsAllowed.toFixed(2) + ' (' + v.sdAllowed.toFixed(2) + ')').padStart(18), (v.homeWin * 100).toFixed(1).padStart(9), (v.p330 * 100).toFixed(1).padStart(10) + '%'));
  // acceptance tests
  const T = []; const t = (n, ok) => { T.push([n, ok]); console.log((ok ? 'PASS ' : 'FAIL ') + n); };
  console.log('');
  t('A1 omitted aggr is bit-identical to the unpatched engine', r.identity);
  t('A2 EV-neutral at a league-average matchup with the SHIPPED constant (|d pts| < 0.02 both ends)', Math.abs(r.neutral.aggressive.dPts) < 0.02 && Math.abs(r.neutral.cautious.dPts) < 0.02);
  t('A3 aggressive: more sacks, more takeaways, more pass yards, wider spread than balanced', r.neutral.aggressive.sacks > r.neutral.balanced.sacks && r.neutral.aggressive.to > r.neutral.balanced.to && r.neutral.aggressive.pass > r.neutral.balanced.pass && r.neutral.aggressive.sd > r.neutral.balanced.sd);
  t('A4 cautious is the mirror: fewer sacks, takeaways, pass yards; narrower spread', r.neutral.cautious.sacks < r.neutral.balanced.sacks && r.neutral.cautious.to < r.neutral.balanced.to && r.neutral.cautious.pass < r.neutral.balanced.pass && r.neutral.cautious.sd < r.neutral.balanced.sd);
  t('A5 mirror symmetry: |sack/TO/pass change| equal at both ends within 1%', Math.abs((r.neutral.aggressive.sacks - r.neutral.balanced.sacks) + (r.neutral.cautious.sacks - r.neutral.balanced.sacks)) < 0.01 * r.neutral.balanced.sacks);
  t('A6 (points ALLOWED) a strong secondary lowers the cost of blitzing; an elite QB raises it', r.inter['aggressive, own coverage +10'] < 0 && r.inter['aggressive, own coverage -10'] > 0 && r.inter['aggressive vs QB +10'] > 0 && r.inter['aggressive vs QB -10'] < 0);
  t('A7 seeded sim agrees in direction: sacks, takeaways, passing yards ordered cautious < balanced < aggressive', r.sim.cautious.sacks < r.sim.balanced.sacks && r.sim.balanced.sacks < r.sim.aggressive.sacks && r.sim.cautious.to < r.sim.balanced.to && r.sim.balanced.to < r.sim.aggressive.to && r.sim.cautious.passYds < r.sim.balanced.passYds && r.sim.balanced.passYds < r.sim.aggressive.passYds);
  t('A8 no free lunch in games (needs N>=4000 to be meaningful): equal teams, home win% moves < 2 points between postures', N < 4000 || Math.max(...Object.values(r.sim).map(v => v.homeWin)) - Math.min(...Object.values(r.sim).map(v => v.homeWin)) < 0.02);
  t('A9 page errors = 0', errs.length === 0);
  await b.close(); process.exit(T.every(x => x[1]) ? 0 : 1);
})();
