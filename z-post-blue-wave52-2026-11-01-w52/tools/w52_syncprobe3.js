/* w52_syncprobe3.js — scenario 3: manual row click → does the fresh map ever get observed? */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', e => console.log('PAGEERR', String(e).slice(0, 160)));
  await page.goto(FILE); await page.waitForTimeout(700);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }

  // close the auto-opened user detail, then click ANOTHER team's row (real user behavior)
  await page.evaluate(() => {
    // close any open detail first
    const open = document.querySelector('.detailrow[style*="table"]');
    if (open) { const idx = open.id.replace('detailrow-', ''); const tr = document.querySelector('tr.teamrow[data-idx="' + idx + '"]'); if (tr) tr.click(); }
  });
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const rows = [...document.querySelectorAll('tr.teamrow')];
    rows[rows.length - 1].click(); // a manual open of another team's row
  });
  await page.waitForTimeout(500);
  const s1 = await page.evaluate(() => {
    const m = document.querySelector('.zpb-fm');
    return { maps: document.querySelectorAll('.zpb-fm').length, seen: document.querySelectorAll('.zpb-fm.zpb-seen').length, zseen: m ? m.getAttribute('data-zseen') : null, mapTop: m ? Math.round(m.getBoundingClientRect().top) : null };
  });
  console.log('after manual open, map state:', JSON.stringify(s1));
  // scroll it into view (user motion) — does it cascade?
  await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(900);
  const s2 = await page.evaluate(() => {
    const m = document.querySelector('.zpb-fm');
    const st0 = m && m.querySelector('.zpb-fm-ini[data-beat]');
    const anim = st0 ? getComputedStyle(st0).animationName : null;
    return { seen: m ? m.classList.contains('zpb-seen') : null, anim0: anim, op0: st0 ? getComputedStyle(st0).opacity : null };
  });
  console.log('after scroll to it:', JSON.stringify(s2));
  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
