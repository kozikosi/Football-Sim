const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w85/Football-Sim-Z-post-blue-w85.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e).slice(0, 300)));
  page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 200)); });
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  // draft
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 50; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 26); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.__zpbDraftDone = true; } catch (e) {} });
  await page.evaluate(() => { try { startSeason(); renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(800);
  // week 1
  await page.evaluate(() => { try { seasonState.preseason = false; simulateCurrentWeek(); renderSeasonTab(document.getElementById('seasonHost') || document.body); } catch (e) {} });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { try { window.__zpbQuietSim = true; document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-fin,.zpb-story-veil,.zpb-welcine,.confirm-ov').forEach(o=>o.remove()); window.__zpbStoryHold=false; window.__zpbSBFinPending=false; window.__zpbPoRunHold=false; } catch(e){} });
  const probe1 = await page.evaluate(() => {
    const ls = document.querySelector('.linescore');
    if (!ls) return { no: true };
    const cs = getComputedStyle(ls);
    const sc = document.querySelector('.score-line');
    // which rule wins?
    const acc = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    const probe = document.createElement('table'); probe.className = 'linescore'; document.body.appendChild(probe);
    const p2 = getComputedStyle(probe).borderTopColor; probe.remove();
    return { ls: cs.borderTopColor, sc: sc ? getComputedStyle(sc).borderTopColor : null, rootAccent: acc, freshTable: p2, bg: cs.backgroundColor };
  });
  console.log('LINESCORE PROBE', JSON.stringify(probe1));
  // guide render
  const guide = await page.evaluate(() => {
    try {
      const b = document.getElementById('tabGuideBtn'); if (b) b.click();
      return { clicked: true };
    } catch (e) { return { err: String(e) }; }
  });
  await page.waitForTimeout(800);
  const probe2 = await page.evaluate(() => {
    let threw = null, rows = 0, guideBody = !!document.getElementById('guideBody');
    try { const g = guideHTMLCached(); rows = (g.match(/zpb-prrow/g) || []).length; } catch (e) { threw = String(e).slice(0, 200); }
    const rows2 = document.querySelectorAll('.zpb-posrank .zpb-prrow').length;
    return { threw, rows, rows2, guideBody, active: document.getElementById('viewGuide') ? document.getElementById('viewGuide').className : null };
  });
  console.log('GUIDE PROBE', JSON.stringify(probe2));
  // awards cards
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { try { window.__zpbQuietSim = true; document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-fin,.zpb-story-veil,.zpb-welcine,.confirm-ov').forEach(o=>o.remove()); window.__zpbStoryHold=false; window.__zpbSBFinPending=false; window.__zpbPoRunHold=false; } catch(e){} });
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(800);
  const probe3 = await page.evaluate(() => {
    const aw = document.querySelectorAll('.zpb-awcard').length;
    const details = [...document.querySelectorAll('details.panel')].map(d => (d.querySelector('summary') || {}).textContent || '').slice(0, 12);
    const phase = seasonState.phase;
    const host = document.getElementById('seasonHost') || document.getElementById('draftResultsBody');
    return { aw, details, phase, hostId: host ? host.id : null };
  });
  console.log('AWARDS PROBE', JSON.stringify(probe3));
  console.log('PAGE ERRORS', JSON.stringify(errs.slice(0, 8)));
  await browser.close();
})().catch(e => { console.log('HARNESS FAIL', String(e).slice(0, 500)); process.exit(1); });
