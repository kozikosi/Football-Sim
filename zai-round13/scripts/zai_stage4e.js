// Stage-4e: time the FULL liteSeason (including playoffs + aggregation) x3 in one page.
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/boot/PreColors.html';
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  page.on('pageerror', e => console.error('  PAGEERROR:', String(e.message).slice(0, 250)));
  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  const res = await page.evaluate(() => {
    const out = { times: [], lastAgg: null, err: null };
    try {
      const sel = document.getElementById('draftSlotSelect');
      if (sel && sel.options.length > 1) sel.value = sel.options[1].value;
      startDraft2(); simToEnd();
      const names = draftSim.rosters.map(r => r.teamName);
      const teams = {}; draftSim.rosters.forEach(r => { teams[r.teamName] = { pool: [], slotmap: r.slots, isUser: r.isUser }; });
      const league = leagueBaseline(draftSim.rosters.map(r => r.slots));
      const ur = {}; names.forEach(n => { ur[n] = teamRatings(teams[n].slotmap); });
      const L = { teams, schedule: [], currentWeek: 1, phase: 'regular', playerStats: {}, playerStatsPO: {},
        league, unitRatings: ur, unitRanks: computeUnitRanks(ur), identity: {}, planCache: {},
        userPlan: { mode: 'auto', pers: 'auto', strat: 'auto', pkg: 'auto', focus: 'auto' } };
      names.forEach(n => { L.identity[n] = teamIdentity(ur[n], league); });
      for (let i = 0; i < 3; i++) {
        const agg = newAgg(names, names.find(n => teams[n].isUser));
        const prev = seasonState; seasonState = L;
        const t0 = performance.now();
        try { liteSeason(L, agg); } finally { seasonState = prev; }
        out.times.push(+(performance.now() - t0).toFixed(1));
        out.lastAgg = { seasons: agg.seasons, games: agg.totals.g, avgPts: +(agg.totals.pts / (2 * agg.totals.g)).toFixed(2),
          ties: agg.totals.ties, homeWinPct: +((agg.totals.homeW / (agg.totals.g - agg.totals.ties)) * 100).toFixed(1),
          avgPass: Math.round(agg.totals.passYds / agg.totals.g), avgRush: Math.round(agg.totals.rushYds / agg.totals.g),
          avgTO: +(agg.totals.to / agg.totals.g).toFixed(2), avgSacks: +(agg.totals.sacks / agg.totals.g).toFixed(2) };
      }
    } catch (e) { out.err = String(e && e.message || e); }
    return out;
  });
  console.log(JSON.stringify(res, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e && e.message); process.exit(1); });
