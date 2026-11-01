/* w51_colon_live.js — the whole-document dot-law walk at the prose-heaviest states */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w51/Football-Sim-Z-post-blue-w51.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1500 } });
  await page.addInitScript(() => { window.__errs = []; window.addEventListener('error', e => { window.__errs.push(((e.error && e.error.stack) || e.message) + ''); }); });
  const errors = [];
  page.on('pageerror', e => errors.push(((e && e.stack) ? String(e.stack) : String(e)).slice(0, 600)));
  page.on('framenavigated', f => { if (f === page.mainFrame()) console.log('NAVIGATED:', f.url().slice(0, 90)); });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1400);
  const sweep = async tag => {
    for (let t = 0; t < 4; t++) {
      try {
        const bad = await page.evaluate(() => new Promise(res => requestAnimationFrame(() => requestAnimationFrame(() => {
          const bad = [];
          const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let n; while ((n = w.nextNode())) { let p = n.parentNode; let skip = false; while (p) { if (p.nodeType === 1 && /^(SCRIPT|STYLE|TEXTAREA|CODE)$/.test(p.tagName)) { skip = true; break; } p = p.parentNode; }
            if (!skip && /[;:]/.test(n.nodeValue || '')) bad.push((n.nodeValue || '').trim().slice(0, 70)); }
          res(bad.slice(0, 8));
        }))));
        console.log(tag, '· colons:', bad.length, JSON.stringify(bad));
        return bad.length;
      } catch (e) { await page.waitForTimeout(900); }
    }
    console.log(tag, '· sweep skipped (navigation)');
    return -1;
  };
  await sweep('draft results');
  await page.evaluate(() => { try { document.getElementById('resultsSeasonBtn').click(); } catch (e) {} });
  await page.waitForTimeout(900);
  await page.evaluate(() => { try { (document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2')).click(); } catch (e) {} });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { try { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); } catch (e) {} });
  await page.waitForTimeout(600);
  await page.evaluate(() => { try { const y = document.querySelector('.confirm-ov .resetbtn'); if (y) y.click(); } catch (e) {} });
  await page.waitForTimeout(2800);
  await sweep('season review');
  const attrs = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('*').forEach(el => { ['title', 'aria-label', 'placeholder'].forEach(a => { const v = el.getAttribute && el.getAttribute(a); if (v && /[;:]/.test(v)) bad.push(a + '=' + v.slice(0, 50)); }); });
    return bad.slice(0, 8);
  });
  console.log('spoken attrs · colons:', attrs.length, JSON.stringify(attrs));
  console.log('pageerrors:', errors.length);
  try { const ie = await page.evaluate(() => window.__errs ? window.__errs.slice(0, 3) : []); ie.forEach((e, i) => console.log('INITSTACK ' + i + ':\n' + String(e).split('\n').slice(0, 5).join('\n'))); } catch (e) {}
  errors.slice(0, 3).forEach((e, i) => console.log('STACK ' + i + ':\n' + e + '\n---'));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
