/* w66_geom.js — why does the title sit above the container top at 800x640? */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 800, height: 640 } });
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(600);
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1300);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(3200);
  await page.evaluate(() => { const sw = document.getElementById('simWeekBtn'); if (sw) sw.click(); });
  await page.waitForTimeout(2700);
  const m = await page.evaluate(() => {
    const intro = document.querySelector('.zpb-rep-intro');
    if (!intro) return { stage: 'no intro' };
    const cs = getComputedStyle(intro);
    const box = intro.closest('.zpb-replay');
    const hd = box.querySelector('.zpb-rep-hd');
    const title = intro.querySelector('.zpb-intro-title');
    const logos = intro.querySelector('.zpb-intro-logos');
    const r = el => { const b = el.getBoundingClientRect(); return { top: Math.round(b.top), h: Math.round(b.height) }; };
    // walk up to the containing block: the nearest ancestor with non-static position
    let anc = intro.parentElement, chain = [];
    while (anc && anc !== document.documentElement) {
      const p = getComputedStyle(anc).position;
      chain.push(anc.className.toString().slice(0, 30) + ':' + p);
      if (p !== 'static') break;
      anc = anc.parentElement;
    }
    return {
      intro: r(intro), introTop: cs.top, inset: cs.inset, justify: cs.justifyContent, padTop: cs.paddingTop,
      box: r(box), hd: r(hd), title: r(title), logos: r(logos),
      chain: chain.slice(-4),
      titleAnim: getComputedStyle(title).animationName + ' ' + getComputedStyle(title).animationDuration,
      mqMatch: matchMedia('(max-height:719px)').matches
    };
  });
  console.log(JSON.stringify(m, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
