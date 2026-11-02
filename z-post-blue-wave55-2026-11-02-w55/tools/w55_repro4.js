/* w55_repro4.js — min-content measurement of the preview page's wide suspects. */
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
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1800);
  const mins = await page.evaluate(() => {
    const sels = ['.zpb-mu', '.zpb-strip', '.mtag', '.zpb-lu', '.zpb-lu-row', '.zpb-whygrid', '.zpb-planpanel', '.zpb-mbar-row', '.zpb-mrow', '.zpb-stars', '.zpb-pvwrap', '.zpb-pvfrow', '.tabs', '.draft-columns', '.zpb-luscores', '.zpb-rcgrid', '.zpb-metgrid'];
    const out = [];
    sels.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      const w0 = el.style.width;
      el.style.width = 'min-content';
      const mc = el.getBoundingClientRect().width;
      el.style.width = w0;
      // the widest descendant at min-content: find children that keep themselves wide
      let widest = null;
      el.querySelectorAll('*').forEach(c => { const r = c.getBoundingClientRect(); if (!widest || r.width > widest.w) widest = { cls: String(c.className).slice(0, 50), w: Math.round(r.width) }; });
      out.push({ sel, minContent: Math.round(mc), widestChild: widest });
    });
    return out;
  });
  console.log(JSON.stringify(mins, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
