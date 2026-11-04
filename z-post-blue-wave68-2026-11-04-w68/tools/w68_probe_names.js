/* w68_probe_names.js (v2) — boot a season, sim one week, inspect the preview face-off + the pregame cine. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w68/baseline-w67.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

const closeOv = () => page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun').forEach(f => f.remove()); } catch (e) {} });

let page;
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  page.on('pageerror', e => console.log('PAGE-ERROR: ' + e.message));
  await page.goto(FILE); await page.waitForTimeout(400);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); s.value = 'Jacksonville Jaguars'; s.dispatchEvent(new Event('change', { bubbles: true })); document.getElementById('startDraftBtn').click(); });
  await page.waitForTimeout(1400);
  await closeOv();
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(3200);
  await closeOv();
  await page.waitForTimeout(600);

  // sim week 1 → the week-2 page should carry the preview of the next matchup
  const before = await page.evaluate(() => ({ week: seasonState.week, stars: document.querySelectorAll('.zpb-star-cell').length }));
  console.log('before sim: week', before.week, 'star cells:', before.stars);
  await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) b.click(); });
  await page.waitForTimeout(2500);
  await closeOv();
  await page.waitForTimeout(800);
  const res = await page.evaluate(() => {
    const out = { week: seasonState.week, stars: seasonState.week, cells: [], previewPanels: 0, btns: [] };
    document.querySelectorAll('.zpb-star-cell').forEach(c => {
      const sp = c.querySelector('span');
      if (sp) out.cells.push({ txt: sp.textContent, cellW: Math.round(c.clientWidth), fs: getComputedStyle(sp).fontSize, ws: getComputedStyle(sp).whiteSpace, nameH: Math.round(sp.getBoundingClientRect().height) });
    });
    out.previewPanels = document.querySelectorAll('.zpb-stars').length;
    out.btns = Array.from(document.querySelectorAll('button')).filter(b => b.offsetParent !== null).slice(0, 18).map(b => b.id || b.textContent.trim().slice(0, 22));
    return out;
  });
  console.log('after sim: week', res.week, 'star cells:', res.cells.length, 'stars panels:', res.previewPanels);
  res.cells.forEach(c => console.log('  cell w=' + c.cellW + ' fs=' + c.fs + ' ws=' + c.ws + ' h=' + c.nameH + ' "' + c.txt + '"'));
  console.log('buttons:', JSON.stringify(res.btns));
  const el = await page.$('.zpb-stars');
  if (el) await el.screenshot({ path: 'shots/probe-preview-stars-1280.png' });
  await page.screenshot({ path: 'shots/probe-week2-1280.png' });
  await browser.close();
})().catch(e => { console.log('FATAL', e.message); process.exit(1); });
