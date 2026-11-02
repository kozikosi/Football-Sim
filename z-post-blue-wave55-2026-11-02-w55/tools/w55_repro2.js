/* w55_repro2.js — find the exact overflowing elements on preview + review, and see the box score. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });

  // season, cinematic dismissed (reduced-motion path keeps the page calm)
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1800);
  const trace = () => page.evaluate(() => {
    const cw = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('body *').forEach(e => {
      const r = e.getBoundingClientRect();
      if (r.width > 0 && (r.right > cw + 1 || r.left < -1)) {
        const inScroller = e.closest && [...(e.parents ? [] : [])];
        let p = e.parentElement, scrollHost = false;
        while (p && p !== document.body) { const cs = getComputedStyle(p); if (/(auto|scroll)/.test(cs.overflowX + cs.overflow)) { scrollHost = true; break; } p = p.parentElement; }
        if (!scrollHost) bad.push({ tag: e.tagName, cls: String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).slice(0, 60), id: e.id || '', left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) });
      }
    });
    // dedupe: keep the outermost 12
    return { cw, docOver: document.documentElement.scrollWidth - cw, bad: bad.slice(0, 14), total: bad.length };
  });
  console.log('PREVIEW OVERFLOW:', JSON.stringify(await trace()));
  await page.evaluate(() => { const el = document.querySelector('.zpb-strip') || document.querySelector('.zpb-mu'); if (el) el.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/repro2-preview.png' });

  // play the week -> review
  await page.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(2200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  console.log('REVIEW OVERFLOW:', JSON.stringify(await trace()));
  await page.evaluate(() => { const g = document.querySelector('#zpbGameReviewNow'); if (g) g.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/repro2-boxscore.png' });
  // the schedule-tile box (same renderer, tapped from SCHEDULE)
  await page.evaluate(() => { const t = document.querySelector('.zst-played'); if (t) t.click(); });
  await page.waitForTimeout(700);
  await page.evaluate(() => { const d = document.querySelector('.zst-detail[style*="block"]'); if (d) d.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/repro2-schedulebox.png' });
  console.log('pageerrors:', errors.length ? errors : 'none');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
