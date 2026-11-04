/* w68_shots.js — the wave evidence: the awards glow on a real season, the run-cine card,
   the SB page, the victory page (desktop + phone), the porun at phone width. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w68/shots';

let page;
const closeOv = () => page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution').forEach(f => f.remove()); } catch (e) {} });

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  page.on('pageerror', e => console.log('PAGE-ERROR: ' + e.message));
  await page.goto(FILE); await page.waitForTimeout(500);
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
  await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const y = document.querySelector('[data-ss="yes"]'); if (y) y.click(); });
  await page.waitForTimeout(1800);
  await closeOv();
  await page.waitForTimeout(800);

  // 1 · the awards panel on a real season — the golden celebration where his players earned it
  const opened = await page.evaluate(() => {
    const det = Array.from(document.querySelectorAll('details.panel')).find(d => (d.querySelector('summary') || {}).textContent?.includes('REGULAR-SEASON AWARDS'));
    if (!det) return false;
    det.open = true;
    const gold = det.querySelectorAll('.zpb-mygold').length;
    det.scrollIntoView({ block: 'center' });
    return gold;
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: SH + '/w68-awards-glow.png' });
  console.log('awards gold elements on the real season:', opened);

  // 2 · the review page top (the badges rail reads dashes)
  await page.evaluate(() => { window.scrollTo(0, 0); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: SH + '/w68-review-1280.png' });

  // 3 · force the user into the bracket, run SIM PLAYOFFS, shoot the porun card + the SB page
  await page.evaluate(() => {
    const user = seasonUserTeam();
    if (!seasonState.seeds.AFC.concat(seasonState.seeds.NFC).some(x => x.team === user)) {
      const arr = seasonState.seeds.AFC;
      const weakest = arr.reduce((a, b, i) => (arr[i].seed > arr[a].seed ? i : a), 0);
      arr[weakest] = { ...arr[weakest], team: user };
    }
  });
  await page.evaluate(() => { const b = document.getElementById('simPlayoffsBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: SH + '/w68-porun-card-1280.png' });

  // phone width: the same card
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(700);
  await page.screenshot({ path: SH + '/w68-porun-card-390.png' });
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.waitForTimeout(500);

  // walk to the SB page
  for (let i = 0; i < 6; i++) {
    const hasGo = await page.evaluate(() => !!document.querySelector('.zpb-porun-go'));
    if (!hasGo) break;
    await page.evaluate(() => { document.querySelector('.zpb-porun-go').click(); });
    await page.waitForTimeout(950);
    const sb = await page.evaluate(() => !!document.querySelector('.zpb-sbfin'));
    if (sb) break;
  }
  await page.waitForTimeout(900);
  await page.screenshot({ path: SH + '/w68-sb-page-1280.png' });

  // 4 · the victory page on the forced win
  await page.evaluate(() => { seasonState.champion = seasonUserTeam(); });
  await page.evaluate(() => { const b = document.querySelector('.zpb-sbfin-go'); if (b) b.click(); });
  await page.waitForTimeout(1100);
  await page.screenshot({ path: SH + '/w68-victory-1280.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: SH + '/w68-victory-390.png' });
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.querySelector('.zpb-victory-go'); if (b) b.click(); });
  await page.waitForTimeout(800);
  await closeOv();

  console.log('shots done');
  await browser.close();
})().catch(e => { console.log('FATAL', e.message); process.exit(1); });
