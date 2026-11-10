/* probe the dock DOM at the L2a / L2b moments of the live run */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w89.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  page.on('pageerror', e => console.log('PAGEERROR', String(e).slice(0, 200)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  // draft
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(300); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(700);
  console.log('=== L2a dock outerHTML (post-draft) ===');
  console.log(await page.evaluate(() => { const d = document.getElementById('zpbSeasonDock'); return d ? d.outerHTML.slice(0, 1400) : 'NO DOCK'; }));
  console.log('=== dock vs body order ===', await page.evaluate(() => {
    const d = document.getElementById('zpbSeasonDock'), p = document.getElementById('draftFinalResults'), b = document.getElementById('draftResultsBody');
    return JSON.stringify({ dockIsPanelNextSibling: !!(p && p.nextElementSibling === d), bodyInsidePanel: !!(p && b && p.contains(b)), bodyBeforeDock: !!(b && d && !!(b.compareDocumentPosition(d) & 2)) });
  }));
  console.log('=== zpbDraftOps children ids (post-draft) ===', await page.evaluate(() => { const o = document.getElementById('zpbDraftOps'); return o ? JSON.stringify([...o.children].map(x => x.id || x.tagName)) : 'NO OPS'; }));
  // to season
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  console.log('=== L2b dock outerHTML (season started) ===');
  console.log(await page.evaluate(() => { const d = document.getElementById('zpbSeasonDock'); return d ? d.outerHTML.slice(0, 1400) : 'NO DOCK'; }));
  console.log('=== zpbDraftOps children ids (season) ===', await page.evaluate(() => { const o = document.getElementById('zpbDraftOps'); return o ? JSON.stringify([...o.children].map(x => x.id || x.tagName)) : 'NO OPS'; }));
  console.log('=== dock kids (season) ===', await page.evaluate(() => { const d = document.getElementById('zpbSeasonDock'); return d ? JSON.stringify([...d.children].map(x => x.id || x.className || x.tagName)) : 'NO DOCK'; }));
  await browser.close();
})().catch(e => { console.error('PROBE FAIL', e.message); process.exit(1); });
