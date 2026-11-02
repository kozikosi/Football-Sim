/* w60_shots.js — the eyeball evidence: the unit table panel, the intro star rows landed,
   the review footer pair stacked, the advance rail up. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w60.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave60-2026-11-02-w60/shots';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // 1 · the unit comparison panel at 390 (scrolled to the table)
  await page.evaluate(() => { document.getElementById('tabCompareBtn').click(); });
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    const sels = document.querySelectorAll('#homeCmpResult select, .zpb-selwrap select');
    const sA = document.getElementById('homeCmpA') || sels[0], sB = document.getElementById('homeCmpB') || sels[1];
    if (sA && sA.options.length > 2) { sA.selectedIndex = 1; sA.dispatchEvent(new Event('change', { bubbles: true })); }
    if (sB && sB.options.length > 2) { sB.selectedIndex = 2; sB.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const t = document.querySelector('#homeCmpResult table.zpb-unitcmp'); if (t) t.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(4600); // the scroll-fade settles
  await page.screenshot({ path: SHOTS + '/w60-unitcmp-table-390.png' });

  // 2 · the intro star rows landed (mid-intro)
  await page.evaluate(() => { document.getElementById('tabDraftBtn').click(); });
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.waitForTimeout(300);
  await page.evaluate(() => document.getElementById('startDraftBtn').click());
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(5600);

  // 3 · the advance rail on the hub
  await page.evaluate(() => { window.scrollTo(0, 400); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: SHOTS + '/w60-rail-390.png' });

  // play the week through the rail; catch the intro at the first beat
  await page.evaluate(() => { const c = document.querySelector('#zpbAdvRail button'); if (c) c.click(); });
  await page.waitForTimeout(3600); // the intro's first pair lands at ~2.2s + mount time
  await page.screenshot({ path: SHOTS + '/w60-intro-stars-390.png' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: SHOTS + '/w60-intro-stars-b-390.png' });

  await browser.close();
  console.log('evidence shots done');
})().catch(e => { console.error('HARNESS', e); process.exit(2); });
