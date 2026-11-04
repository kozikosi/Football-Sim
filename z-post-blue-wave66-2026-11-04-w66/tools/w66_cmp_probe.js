/* w66_cmp_probe.js — see the comparison panel's dropdowns and hunt the purple wave */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const OUT = '/home/z/my-project/work/w66/shots';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);
  // open the team comparison tab
  const tab = await page.evaluate(() => {
    const cands = [...document.querySelectorAll('button, .tab, [role=tab]')].map(b => (b.textContent || '').trim().toUpperCase());
    return cands.filter(t => t.includes('COMPARE'));
  });
  console.log('compare tabs:', tab);
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button, .tab, [role=tab]')].find(b => /COMPARE/i.test(b.textContent || ''));
    if (btn) btn.click();
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/cmp-closed.png' });
  // open dropdown A
  await page.evaluate(() => {
    const w = document.querySelector('#viewCompare .zpb-selwrap') || document.querySelector('.zpb-selwrap');
    if (w) { w.classList.add('open'); const b = w.querySelector('.zpb-selbtn'); if (b) b.click(); }
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + '/cmp-openA.png' });
  // measure the open popup + button backgrounds
  const info = await page.evaluate(() => {
    const w = document.querySelector('#viewCompare .zpb-selwrap');
    const btn = w && w.querySelector('.zpb-selbtn');
    const pop = w && w.querySelector('.zpb-selpop');
    const cs = el => { const c = getComputedStyle(el); return { bg: c.backgroundImage.slice(0, 200), bgc: c.backgroundColor, anim: c.animationName + ' ' + c.animationDuration, shadow: c.boxShadow.slice(0, 120) }; };
    return { btn: btn ? cs(btn) : null, pop: pop ? cs(pop) : null, open: w && w.className };
  });
  console.log(JSON.stringify(info, null, 1));
  await browser.close();
})().catch(e => { console.error('PROBE FAIL', e.message); process.exit(1); });
