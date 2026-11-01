/* w50_shots2.js — editor DIME row + 3-4 staged preview + season badges */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
const OUT = '/home/z/my-project/w50work/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1500 } });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1500);
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
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(2400);
  await page.evaluate(() => { document.querySelectorAll('.zpb-fin,.zpb-replay-ov,.zpb-sbfin,.zpb-porun').forEach(o => o.remove()); });
  await page.waitForTimeout(400);
  const el = await page.$('#lineupPre');
  if (el) { await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); const bb = await el.boundingBox(); if (bb && bb.height > 100) await page.screenshot({ path: OUT + '/w50-editor-43.png', clip: { x: Math.max(0, bb.x - 10), y: Math.max(0, bb.y - 10), width: Math.min(1280, bb.width + 20), height: Math.min(1500, bb.height + 20) } }); }
  await page.evaluate(() => { const b = [...document.querySelectorAll('.zpb-basetoggle button')].find(x => x.dataset.zbase === '34'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { document.querySelectorAll('.zpb-fin,.zpb-replay-ov').forEach(o => o.remove()); });
  const el2 = await page.$('#lineupPre');
  if (el2) { const bb = await el2.boundingBox(); if (bb && bb.height > 100) await page.screenshot({ path: OUT + '/w50-editor-34.png', clip: { x: Math.max(0, bb.x - 10), y: Math.max(0, bb.y - 10), width: Math.min(1280, bb.width + 20), height: Math.min(1500, bb.height + 20) } }); }
  // badges
  await page.evaluate(() => { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); try { simRestOfSeason(); } catch (e) {} try { seasonState.showReview = true; } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody')); } catch (e) {} });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { document.querySelectorAll('.zpb-replay-ov,.zpb-sbfin,.zpb-porun').forEach(o => o.remove()); const k = document.querySelector('.zpb-story-kicker'); if (k) k.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/w50-badges.png' });
  console.log('shots 4-6 done');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
