/* w67_shots.js — clean evidence shots for the wave package. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w67/Football-Sim-Z-post-blue-w67.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w67/shots';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

  // 1 · the homepage bubbles, a long team name selected (1280 desktop)
  let page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(FILE); await page.waitForTimeout(400);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    s.value = 'Washington Commanders'; s.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: SH + '/w67-bubbles-1280.png', clip: { x: 240, y: 60, width: 800, height: 300 } });
  // dark mode, Panthers selected — the fills dropdown's dark ink lives on the board, but the bubbles shot pairs with it
  await page.close();

  // 2 · the player browser on a small screen — the compact table, no flash
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(FILE); await page.waitForTimeout(400);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const b = document.getElementById('tabPlayersBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: SH + '/w67-browser-390.png' });
  await page.close();

  // 3 · the homepage bubbles at 390
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(FILE); await page.waitForTimeout(400);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    s.value = 'Green Bay Packers'; s.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: SH + '/w67-bubbles-390.png' });
  await page.close();

  await browser.close();
  console.log('shots done');
})().catch(e => { console.error(e); process.exit(1); });
