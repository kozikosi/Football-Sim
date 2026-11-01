/* w51_shots.js — the round-51 pixel evidence */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w51/Football-Sim-Z-post-blue-w51.html';
const OUT = '/home/z/my-project/w51/shots';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // 1 · the homepage DRAFT button — light, no team (the halfway rose)
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + '/w51-draftbtn-light-default.png' });

  // 2 · the homepage DRAFT button — light, Chiefs takeover (the team halfway ink)
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + '/w51-draftbtn-light-team.png' });

  // 3 · draft to results (Falcons), map region
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {} });
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    const i = document.getElementById('speedInstantBtn'); if (i) i.click();
    const s = document.getElementById('simToEndBtn'); if (s) s.click();
  });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(1000);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.zpbReleaseLookGate && window.zpbReleaseLookGate(); document.documentElement.style.setProperty('--dfc-base', '0s'); } catch (e) {} });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try { document.getElementById('resultsMineBtn').click(); } catch (e) {} });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const m = document.querySelector('#draftResultsBody .zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try { document.querySelectorAll('#draftResultsBody .zpb-fm, #draftResultsBody .zpb-dbk-g, #draftResultsBody .zpb-dz').forEach(el => el.style.setProperty('--dfc-cine', '-99s')); } catch (e) {} });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: OUT + '/w51-map-nickel-dime.png' });

  // 4 · the week hub: SIM SEASON quiet + the gold CONTINUE
  await page.evaluate(() => { try { document.getElementById('resultsSeasonBtn').click(); } catch (e) {} });
  await page.waitForTimeout(800);
  await page.evaluate(() => { try { (document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2')).click(); } catch (e) {} });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { const b = document.getElementById('simWeekBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(3000);
  await page.evaluate(() => { try { const s = document.getElementById('zrepSkip'); if (s) s.click(); } catch (e) {} });
  await page.waitForTimeout(800);
  await page.evaluate(() => { try { const s = document.getElementById('zrepSkip'); if (s) s.click(); } catch (e) {} });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} });
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + '/w51-hub-continue-gold.png' });

  // 5 · the during-game replay: chips + dotted clock
  await page.evaluate(() => {
    try {
      const user = seasonUserTeam();
      const played = seasonState.schedule.filter(x => x.played && (x.home === user || x.away === user));
      const g = played[played.length - 1];
      if (g && g.result) zpbGameReplay(g, user);
    } catch (e) {}
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => { try { const s = document.getElementById('zrepSkip'); if (s) s.click(); } catch (e) {} });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { const s = document.getElementById('zrepSkip'); if (s) s.click(); } catch (e) {} });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: OUT + '/w51-replay-chips.png' });
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} });

  // 6 · the playoff cinematic — dark (decoration) at the second pair's beat
  await page.evaluate(() => {
    try {
      const user = seasonUserTeam();
      const other = Object.keys(seasonState.teams).find(t => t !== user);
      const g = { home: user, away: other, roundLabel: 'Conference Championship',
        result: { homeScore: 27, awayScore: 24,
          homeEvents: [{ type: 'FG', q: 1, t: 0.9, pts: 3 }, { type: 'TD', q: 2, t: 0.72, pts: 7 }, { type: 'TD', q: 4, t: 0.2, pts: 7 }],
          awayEvents: [{ type: 'TD', q: 1, t: 0.5, pts: 7 }, { type: 'FG', q: 3, t: 0.4, pts: 3 }] },
        detail: { home: { players: [] }, away: { players: [] } } };
      zpbGameReplay(g, user);
    } catch (e) {}
  });
  await page.waitForTimeout(9200);
  await page.screenshot({ path: OUT + '/w51-po-dark-beam.png' });
  // light mode: the velvet + the brightened gold
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  await page.waitForTimeout(4200);
  await page.screenshot({ path: OUT + '/w51-po-light-velvet.png' });

  console.log('pageerrors:', errors.length, errors.slice(0, 3));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
