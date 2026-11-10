const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('file:///home/z/my-project/work/w89.html'); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const c = document.querySelector('.zpb-precine'); if (c) c.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const el = document.getElementById('aggrSel'); if (el) el.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/work/evidence/w89-aggr-nostyle.png' });
  await browser.close();
  console.log('shot done');
})().catch(e => { console.error(e); process.exit(2); });
