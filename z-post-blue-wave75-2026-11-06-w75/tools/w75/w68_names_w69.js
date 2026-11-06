/* w68_names.js — the name-ladder battery: full names at every full-size width, the floor API,
   the narrow rungs legal (never an ellipsis), and the intro star cards read full names. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/z-post-blue-wave75-2026-11-06-w75/Football-Sim-Z-post-blue-w75.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  let pageErrs = 0;
  page.on('pageerror', e => { pageErrs++; console.log('   PAGE-ERROR: ' + e.message); });
  await page.goto(FILE); await page.waitForTimeout(500);
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

  // A · the ladder API: the floor arg forbids the last-name/initials rungs
  const api = await page.evaluate(() => {
    const fits = () => false; // nothing fits one line — force the deep rungs
    const noFloor = window.zpbNameFit.ladder('Chris Lindstrom', fits, null);
    const floored = window.zpbNameFit.ladder('Chris Lindstrom', fits, 'wrap');
    return { noFloor: noFloor.text, floored: floored.text, flooredMode: floored.mode };
  });
  ok(api.noFloor !== 'Chris Lindstrom' && api.noFloor !== 'Chris', 'A the deep rungs still exist without the floor', api.noFloor);
  ok(api.floored === 'Chris Lindstrom' && api.flooredMode === 'wrap', 'A the floor returns the FULL name (vertical allowed) even when nothing fits one line', JSON.stringify(api));

  // B · the preview cards read full names at every full-size width
  const readNames = () => page.evaluate(() => Array.from(document.querySelectorAll('.zpb-pvwrap .zpb-pcard-hd b')).map(b => ({ shown: b.textContent, full: b.getAttribute('data-nmfull') || b.textContent })));
  for (const W of [1025, 1180, 1280, 1440, 1920]) {
    await page.setViewportSize({ width: W, height: 940 });
    await page.waitForTimeout(550);
    const rows = await readNames();
    const short = rows.filter(r => r.shown !== r.full);
    ok(rows.length >= 4 && short.length === 0, `B W=${W}: all key-player cards read full names`, short.length ? JSON.stringify(short.slice(0, 2)) : rows.length + ' full');
  }

  // C · the narrow rungs stay legal and never paint an ellipsis (swept)
  for (const W of [761, 700, 640, 480, 390]) {
    await page.setViewportSize({ width: W, height: 940 });
    await page.waitForTimeout(550);
    const rows = await readNames();
    const badEll = rows.filter(r => r.shown.includes('…'));
    ok(rows.length >= 4 && badEll.length === 0, `C W=${W}: no ellipsis ever paints`, badEll.length ? JSON.stringify(badEll.slice(0, 2)) : rows.length + ' legal');
  }

  // D · the intro star cards read full names (the same ladder, the pregame stage)
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.waitForTimeout(500);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody')); } catch (e) {} });
  await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) b.click(); });
  await page.waitForTimeout(3600);
  const stars = await page.evaluate(() => Array.from(document.querySelectorAll('.zpb-intro-star b')).map(b => ({ shown: b.textContent, full: b.getAttribute('data-nmfull') || b.textContent })));
  ok(stars.length >= 2 && stars.every(r => r.shown === r.full), 'D the pregame star cards read FULL names at 1280', stars.length + ' stars, ' + (stars.filter(r => r.shown !== r.full).length) + ' shortened');
  await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-replay-ov,.zpb-prematch,.zpb-fin').forEach(f => f.remove()); } catch (e) {} });

  ok(pageErrs === 0, 'zero page errors', pageErrs + ' errors');
  console.log(`\nRESULT: ${pass} pass / ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FATAL', e.message); process.exit(1); });
