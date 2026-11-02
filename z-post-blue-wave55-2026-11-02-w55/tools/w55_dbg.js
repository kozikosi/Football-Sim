/* w55_dbg.js — debug the two failing battery legs: M2 restore + M7 dime picker. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', e => console.log('PAGEERROR:', String(e).slice(0, 200)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await page.waitForTimeout(500);
  await page.reload(); await page.waitForTimeout(1400);
  const d2 = await page.evaluate(() => {
    const script = document.getElementById('zpb-w55-restore');
    let err = null, res = null;
    try {
      const t = localStorage.getItem('zpb:tab');
      const i = t ? t.indexOf('|') : -1;
      const v = i > 0 ? t.slice(0, i) : '', b = i > 0 ? t.slice(i + 1) : '';
      const els = { v: !!document.getElementById(v), b: !!document.getElementById(b) };
      if (v && b && els.v && els.b) { setActiveTab(v, b); }
      res = { t, v, b, els, guideActive: document.getElementById('viewGuide').classList.contains('active') };
    } catch (e) { err = String(e).slice(0, 200); }
    return { scriptPresent: !!script, err, res, active: [...document.querySelectorAll('.view.active')].map(x => x.id) };
  });
  console.log('M2 debug:', JSON.stringify(d2));

  // draft to the end, start the season, then inspect the lineup panel + roster
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1100);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { try { startSeason(); } catch (e) { console.log('startSeason err', String(e).slice(0, 120)); } try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2400);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  const d7 = await page.evaluate(() => {
    const out = { hasSeason: !!seasonState, host: !!document.getElementById('lineupSeason') };
    try {
      const user = seasonUserTeam();
      out.user = user;
      out.teamsShape = seasonState.teams ? Object.keys(seasonState.teams).slice(0, 2) : null;
      out.rosterOk = user && seasonState.teams[user] && !!seasonState.teams[user].slots;
      const host = document.getElementById('lineupSeason');
      if (host) {
        const rows = [...host.querySelectorAll('.depth-row')];
        out.rowNames = rows.map(r => (r.querySelector('.slotname') || {}).textContent).slice(0, 20);
        const dime = rows.find(r => (r.querySelector('.slotname') || {}).textContent === 'DIME');
        out.dimeHTML = dime ? dime.innerHTML.slice(0, 240) : null;
        out.dimePickwrap = !!(dime && dime.querySelector('.zpb-pickwrap'));
      }
      const roster = seasonState.teams[user];
      out.stageCount = typeof zpbStageCount === 'function' ? zpbStageCount(roster) : 'nofn';
      out.stageMapHasCB4 = !!zpbStageOf(roster).map['CB4'];
    } catch (e) { out.err = String(e).slice(0, 200); }
    return out;
  });
  console.log('M7 debug:', JSON.stringify(d7, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
