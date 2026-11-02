/* w57_d4cmp.js — the desktop linescore CSS must be PIXEL-IDENTICAL on w56 and w57.
 * The week-1 score digits are random (Math.random), so the real table's width breathes by a
 * digit — the honest pixel law compares the SAME fixed markup rendered by BOTH files' CSS. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const boot = async (FILE) => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  // the SAME fixed linescore markup rendered by each file's CSS — measured pixel for pixel
  const m = await page.evaluate(() => {
    const host = document.createElement('div'); host.id = 'd4probe';
    host.style.cssText = 'position:fixed;left:0;top:0;width:900px;padding:0;margin:0;';
    host.innerHTML = '<div class="panel" style="margin:0;"><table class="linescore" data-nostack="1"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>F</th></tr></thead><tbody><tr class="zpb-trow"><td class="zpb-ls-team">Dallas Cowboys</td><td class="score">3</td><td class="score">14</td><td class="score">0</td><td class="score">0</td><td class="score" style="font-weight:800;">17</td></tr><tr class="zpb-trow"><td class="zpb-ls-team">Kansas City Chiefs</td><td class="score">23</td><td class="score">0</td><td class="score">0</td><td class="score">0</td><td class="score" style="font-weight:800;">23</td></tr></tbody></table></div>';
    document.body.appendChild(host);
    const ls = host.querySelector('.linescore');
    const r = ls.getBoundingClientRect();
    const cell = ls.querySelector('td.score').getBoundingClientRect();
    const res = { w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10, cellW: Math.round(cell.width * 10) / 10, cellH: Math.round(cell.height * 10) / 10, font: getComputedStyle(ls).fontSize, pad: getComputedStyle(ls.querySelector('td')).padding };
    host.remove();
    return res;
  });
  await browser.close();
  return m;
};
(async () => {
  const a = await boot('file:///home/z/my-project/w57/base/Football-Sim-Z-post-blue-w56.html');
  const b = await boot('file:///home/z/my-project/w57/builds/Football-Sim-Z-post-blue-w57.html');
  const identical = a.w === b.w && a.h === b.h && a.cellW === b.cellW && a.cellH === b.cellH && a.font === b.font && a.pad === b.pad;
  console.log('w55:', JSON.stringify(a));
  console.log('w57:', JSON.stringify(b));
  console.log('identical:', identical);
  process.exit(identical ? 0 : 1);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
