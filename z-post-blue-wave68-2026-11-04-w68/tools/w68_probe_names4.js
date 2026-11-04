/* w68_probe_names4.js — sweep EVERY name-ladder carrier on the week-1 preview page at full size,
   report any whose rendered text differs from its full name. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w68/baseline-w67.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  page.on('pageerror', e => console.log('PAGE-ERROR: ' + e.message));
  await page.goto(FILE); await page.waitForTimeout(400);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); s.value = 'Jacksonville Jaguars'; s.dispatchEvent(new Event('change', { bubbles: true })); document.getElementById('startDraftBtn').click(); });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
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
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(900);

  const sweep = () => page.evaluate(() => {
    const SEL = '.zpb-lu-cell,.zpb-gname,.zpb-awname,.zpb-awme,.zpb-dz-name,.zpb-whyname,.zpb-tree .bracket-game .zpb-trow2 em,.zpb-fillab,.zpb-pickname,.zpb-pickrow b,.zpb-pcard-hd b,.zpb-pb-name,.zpb-pb-team,.zpb-intro-star b,td.dc-name,.zst-opp';
    const out = [];
    document.querySelectorAll(SEL).forEach(el => {
      const full = el.getAttribute('data-nmfull');
      if (!full) return;
      if (el.textContent !== full) out.push({ cls: el.className, shown: el.textContent, full, w: Math.round(el.clientWidth), inPreview: !!el.closest('.zpb-glowpanel') });
    });
    // also list the ladder carriers that live inside the preview panel with their full names
    const previewNames = [];
    document.querySelectorAll('.zpb-glowpanel ' + '.zpb-lu-cell,.zpb-gname,.zpb-pcard-hd b').forEach(el => {
      previewNames.push({ cls: el.className, shown: el.textContent, full: el.getAttribute('data-nmfull') || el.textContent });
    });
    return { shortened: out, previewNames: previewNames.slice(0, 30) };
  });
  const r1 = await sweep();
  console.log('== shortened carriers at 1280 ==');
  r1.shortened.forEach(x => console.log('  .' + x.cls + ' shown="' + x.shown + '" full="' + x.full + '" w=' + x.w + ' inPreview=' + x.inPreview));
  console.log('== preview panel name carriers ==');
  r1.previewNames.forEach(x => console.log('  .' + x.cls.slice(0, 30) + ' "' + x.shown + '"'));
  await page.screenshot({ path: 'shots/probe-week1-full-1280.png', fullPage: false });

  // now the season review page (100% sim path) — sweep too
  await page.evaluate(() => { try { seasonState.weekSimulated = false; for (let i = 1; i <= 17; i++) { const g = seasonState.schedule.find(x => x.week === i && (x.home === seasonUserTeam() || x.away === seasonUserTeam())); if (g && !g.result) { } } simulateRemainingSeason ? simulateRemainingSeason() : null; } catch (e) {} });
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(4000);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(1500);
  const r2 = await sweep();
  console.log('== after sim season: shortened carriers ==');
  r2.shortened.slice(0, 40).forEach(x => console.log('  .' + x.cls + ' shown="' + x.shown + '" full="' + x.full + '" w=' + x.w));
  await page.screenshot({ path: 'shots/probe-after-season-1280.png' });
  await browser.close();
})().catch(e => { console.log('FATAL', e.message); process.exit(1); });
