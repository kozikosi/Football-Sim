/* w55_m1.js — why is the phone draft card 86px? measure every cell. */
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
  await page.waitForTimeout(1600);
  const m = await page.evaluate(() => {
    const tr = document.querySelector('#draftTable2 tbody tr');
    const cs = getComputedStyle(tr);
    const cells = [...tr.querySelectorAll('td')].map(td => ({ cls: td.className || td.dataset.label, h: Math.round(td.getBoundingClientRect().height), row: getComputedStyle(td).gridRow, col: getComputedStyle(td).gridColumn }));
    return { trH: Math.round(tr.getBoundingClientRect().height), pad: cs.padding, rowGap: cs.rowGap, cells };
  });
  console.log(JSON.stringify(m, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
