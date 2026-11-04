/* w55_repro3.js — isolate the wide child on the preview page (excluding the marquee ticker). */
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
  const wide = await page.evaluate(() => {
    const mq = document.getElementById('zpbMqA');
    const out = [];
    document.querySelectorAll('body *').forEach(e => {
      if (mq && (e === mq || mq.contains(e))) return;
      const r = e.getBoundingClientRect();
      if (r.width > 430) out.push({ tag: e.tagName, cls: String(e.className).slice(0, 70), id: e.id || '', w: Math.round(r.width), right: Math.round(r.right), parentCls: String(e.parentElement && e.parentElement.className).slice(0, 40) });
    });
    // also report per-panel outer widths
    const panels = [...document.querySelectorAll('.panel')].map(p => ({ cls: String(p.className).slice(0, 50), w: Math.round(p.getBoundingClientRect().width), sw: p.scrollWidth, cw: p.clientWidth })).filter(x => x.w > 400 || x.sw > x.cw + 2);
    return { wide: out.slice(0, 16), panels: panels.slice(0, 10) };
  });
  console.log(JSON.stringify(wide, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
