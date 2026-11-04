// Stage-4d: diagnostic — runLeague100(N=10) with page console capture + hard timeout.
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/boot/PreColors.html';
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  page.on('console', m => { const t = m.text(); if (t.includes('Season') || m.type() === 'error') console.log('  [page]', m.type(), t.slice(0, 160)); });
  page.on('pageerror', e => console.error('  PAGEERROR:', String(e.message).slice(0, 300)));
  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  const res = await Promise.race([
    page.evaluate(async () => {
      const sel = document.getElementById('draftSlotSelect');
      if (sel && sel.options.length > 1) sel.value = sel.options[1].value;
      startDraft2(); simToEnd();
      const host = document.createElement('div'); document.body.appendChild(host);
      const t0 = performance.now();
      try { runLeague100(10, host); } catch (e) { return { syncThrow: String(e && e.message) }; }
      const poll = await new Promise(resolve => {
        let n = 0;
        const iv = setInterval(() => {
          n++;
          if (window.league100 && league100.agg && league100.agg.seasons >= 10) { clearInterval(iv); resolve('done'); }
          else if (n > 300) { clearInterval(iv); resolve('timeout: seasons=' + (window.league100 ? league100.agg.seasons : 'none') + ' bar=' + (document.getElementById('sim100Txt')||{}).textContent); }
        }, 100);
      });
      return { poll, ms: Math.round(performance.now() - t0), seasons: league100.agg.seasons,
        totals: (() => { const T = league100.agg.totals; return { games: T.g, avgPts: +(T.pts/(2*T.g)).toFixed(2), ties: T.ties, homeWinPct: +((T.homeW/(T.g-T.ties))*100).toFixed(1), closePct: +(T.close/T.g*100).toFixed(1), blowPct: +(T.blow/T.g*100).toFixed(1), avgPass: Math.round(T.passYds/T.g), avgRush: Math.round(T.rushYds/T.g), avgTO: +(T.to/T.g).toFixed(2), avgSacks: +(T.sacks/T.g).toFixed(2) }; })() };
    }, { timeout: 70000 }),
    new Promise(resolve => setTimeout(() => resolve({ poll: 'NODE-TIMEOUT' }), 75000))
  ]);
  console.log(JSON.stringify(res, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e && e.message); process.exit(1); });
