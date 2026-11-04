/* w55_d4cmp.js — the desktop linescore width must be IDENTICAL on w54 and w55. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const boot = async (FILE) => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} try { simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(2200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1300);
  const w = await page.evaluate(() => { const ls = document.querySelector('.linescore'); const r = ls.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), rows: ls.querySelectorAll('tbody tr').length }; });
  await browser.close();
  return w;
};
(async () => {
  const a = await boot('file:///home/z/my-project/work_w54.html');
  const b = await boot('file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html');
  console.log('w54:', JSON.stringify(a), ' w55:', JSON.stringify(b), ' identical:', a.w === b.w && a.h === b.h && a.rows === b.rows);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
