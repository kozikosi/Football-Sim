/* w50_shots.js — the w50 evidence set */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
const OUT = '/home/z/my-project/w50work/evidence';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1300 } });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  // 1) Madden rankings light: team inks + themed anchor panels
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); const b = document.getElementById('tabRankingsBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/w50-rankings-light.png' });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + '/w50-rankings-dark.png' });
  // 2) Position rankings light: the AVG OVR column
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); const b = document.getElementById('tabGroupsBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/w50-groups-light.png' });
  await browser.close();
  console.log('shots 1-3 done');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
