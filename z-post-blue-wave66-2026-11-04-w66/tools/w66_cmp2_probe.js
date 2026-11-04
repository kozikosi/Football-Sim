/* w66_cmp2_probe.js — the season tab's Team Comparison: are the selects enhanced? what is the wave? */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const OUT = '/home/z/my-project/work/w66/shots';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(600);
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Detroit Lions'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1300);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(800);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(2500);
  // find the season tab host + comparison tab
  const tabs = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => (b.textContent || '').trim()).filter(t => /COMPARISON|COMPARE/i.test(t)).slice(0, 6));
  console.log('comparison buttons:', tabs);
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button, .zpb-tab, [role=tab]')].find(b => /COMPARISON/i.test(b.textContent || ''));
    if (btn) btn.click();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: OUT + '/cmp2-tab.png' });
  const info = await page.evaluate(() => {
    const a = document.getElementById('cmpTeamA');
    if (!a) return { found: false };
    const w = a.closest('.zpb-selwrap');
    const cs = el => { const c = getComputedStyle(el); return { bgImg: c.backgroundImage.slice(0, 220), anim: c.animationName + ' ' + c.animationDuration + ' ' + c.animationIterationCount, shadow: c.boxShadow.slice(0, 140), op: c.opacity }; };
    return {
      found: true, enhanced: !!w, nativeVisible: cs(a),
      wrapBtn: w ? cs(w.querySelector('.zpb-selbtn')) : null,
      selHost: cs(a.closest('.zpb-cmpside') || a.parentElement)
    };
  });
  console.log(JSON.stringify(info, null, 1));
  // open the dropdown if custom
  await page.evaluate(() => {
    const a = document.getElementById('cmpTeamA');
    const w = a.closest('.zpb-selwrap');
    if (w) { w.classList.add('open'); }
    else { try { a.focus(); if (a.showPicker) a.showPicker(); } catch (e) {} }
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + '/cmp2-open.png' });
  await browser.close();
})().catch(e => { console.error('PROBE FAIL', e.message); process.exit(1); });
