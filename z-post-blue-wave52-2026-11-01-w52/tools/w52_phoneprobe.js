/* w52_phoneprobe.js — why does the map never get seen at 390px? */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  const s0 = await page.evaluate(() => {
    const m = document.querySelector('.zpb-fm');
    if (!m) return { nomap: true };
    const r = m.getBoundingClientRect();
    let p = m, hidden = [];
    while (p && p !== document.body) { const cs = getComputedStyle(p); if (cs.display === 'none' || cs.visibility === 'hidden') hidden.push(p.id || p.className.slice(0, 30)); p = p.parentElement; }
    return { rect: { t: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width) }, vh: innerHeight, hidden, zseen: m.getAttribute('data-zseen'), seen: m.classList.contains('zpb-seen'), io: !!window.__zpbLookIO };
  });
  console.log('pre-scroll:', JSON.stringify(s0));
  await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(1500);
  const s1 = await page.evaluate(() => {
    const m = document.querySelector('.zpb-fm');
    const r = m.getBoundingClientRect();
    return { seen: m.classList.contains('zpb-seen'), top: Math.round(r.top), h: Math.round(r.height), vh: innerHeight, scrollY: Math.round(scrollY), maxScroll: Math.round(document.documentElement.scrollHeight - innerHeight) };
  });
  console.log('post-scroll:', JSON.stringify(s1));
  console.log('pageerrors:', errors.length ? errors : 'none');
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
