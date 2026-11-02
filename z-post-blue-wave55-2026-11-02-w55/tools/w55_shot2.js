/* w55_shot2.js — retake the draft-card evidence with the welcome cinematic dismissed. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); });
  await page.waitForTimeout(2000);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin,.zpb-welcome,.zpb-fin-welcome,[class*="welcome"]').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(700);
  await page.evaluate(() => { const el = document.querySelector('#draftTable2 tbody'); if (el) el.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/evidence-draft-card.png' });
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
