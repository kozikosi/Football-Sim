/* w55_repro6.js — walk the min-content chain: at each level report the widest min-content child. */
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
  const chain = await page.evaluate(() => {
    const minc = el => { const w0 = el.style.width; el.style.width = 'min-content'; const w = el.getBoundingClientRect().width; el.style.width = w0; return w; };
    const lines = [];
    let el = document.querySelector('.wrap');
    for (let d = 0; d < 12 && el; d++) {
      let best = null;
      const kids = [...el.children];
      kids.forEach(k => {
        if (getComputedStyle(k).display === 'none') return;
        const w = minc(k);
        if (!best || w > best.w) best = { w: Math.round(w), tag: k.tagName, cls: String(k.className).slice(0, 60), id: k.id || '' };
      });
      lines.push({ depth: d, self: { tag: el.tagName, cls: String(el.className).slice(0, 50), id: el.id || '' }, minContent: Math.round(minc(el)), widestChild: best });
      el = best ? kids.find(k => (k.className === best.cls || k.id === best.id) && getComputedStyle(k).display !== 'none') : null;
      if (el && best) { // re-locate precisely
        el = kids.filter(k => k.tagName === best.tag && String(k.className) === best.cls && (k.id || '') === best.id)[0] || el;
      }
    }
    return lines;
  });
  console.log(JSON.stringify(chain, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
