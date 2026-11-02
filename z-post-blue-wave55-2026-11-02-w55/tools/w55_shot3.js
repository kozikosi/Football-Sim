/* w55_shot3.js — the HONORS EARNED zone leads the season-in-badges rail (desktop evidence). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1200 }, reducedMotion: 'reduce' });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => {
    try {
      startSeason(); seasonState.preseason = false;
      const user = seasonUserTeam();
      seasonState.awardsRS = {
        individual: [{ title: 'Most Valuable Player', c: { name: 'Zai Ball', team: user, pos: 'QB' }, why: '' }],
        allPro: { first: { QB: [{ name: 'Zai Ball', team: user }] }, second: {} },
        proBowl: { AFC: { QB: [{ name: 'Zai Ball', team: user }] } }
      };
    } catch (e) {}
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-prematch').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-prematch').forEach(o => o.remove()); } catch (e) {} });
  await page.evaluate(() => { const h = document.querySelector('.zpb-story-honors'); if (h) h.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const h = document.querySelector('.zpb-story-honors'); if (h) h.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/evidence-honors-first.png' });
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
