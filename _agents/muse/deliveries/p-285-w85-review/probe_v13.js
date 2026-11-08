const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  await page.goto('file:///tmp/w85review/w85-2-delivery/Football-Sim-Z-post-blue-w85.html');
  await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch(e){} });
  await page.reload(); await page.waitForTimeout(800);
  // boot draft as Steelers, then sim to end + start season (same as battery)
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Pittsburgh Steelers'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); } catch(e){} document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution,.zpb-replay').forEach(f => f.remove()); });
  await page.evaluate(() => { window.__zpbQuietSim = true; });
  await page.evaluate(() => {
    try { if (draftSim && draftSim.pos < 32*26 && typeof simToEnd === 'function') simToEnd(); } catch(e){}
    const b = document.getElementById('startSeasonBtn'); if (b) b.click(); else startSeason();
  });
  await page.waitForTimeout(1000);
  const dds = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('details.zpb-dd')).map(d => {
      const sum = d.querySelector('summary');
      // walk up to find the containing view/section
      let host = d.closest('[id^="view"], [id$="Host"], #draftResultsBody, body');
      return {
        summary: sum ? sum.textContent.trim().slice(0, 80) : '(no summary)',
        inDraftResults: !!d.closest('#draftResultsBody'),
        inView: (d.closest('.view') || {}).id || '(no .view)',
        open: d.open,
        cls: d.className
      };
    });
  });
  console.log('details.zpb-dd count:', dds.length);
  console.log(JSON.stringify(dds, null, 1));
  await browser.close();
})().catch(e => { console.error('PROBE CRASH', e); process.exit(2); });
