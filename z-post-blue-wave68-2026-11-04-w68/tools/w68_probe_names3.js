/* w68_probe_names3.js — the pregame cinematic star cards: names at full size (1280) vs narrow. */
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
  await page.waitForTimeout(800);

  // find the "Play the X" button (the game cine button) — simWeekBtn label read
  const lbl = await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); return b ? b.textContent.trim() : '(none)'; });
  console.log('week button:', lbl);

  for (const W of [1280, 800, 390]) {
    await page.setViewportSize({ width: W, height: 940 });
    await page.waitForTimeout(400);
    // re-render the week view fresh each time
    await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody')); } catch (e) { return String(e); } });
    await page.waitForTimeout(600);
    // click the play button to open the pregame cinematic
    await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) b.click(); });
    await page.waitForTimeout(3600); // let the intro mount (first star at 2.2s)
    const rows = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.zpb-intro-star').forEach(st => {
        const b = st.querySelector('b');
        if (b) out.push({ shown: b.textContent, full: b.getAttribute('data-nmfull') || b.textContent, fs: getComputedStyle(b).fontSize, stW: Math.round(st.clientWidth), bW: Math.round(b.clientWidth) });
      });
      return out;
    });
    console.log('== W=' + W + ' — pregame star cards ==');
    rows.forEach(r => console.log(`   shown="${r.shown}" full="${r.full}" fs=${r.fs} cardW=${r.stW} bW=${r.bW}${r.shown !== r.full ? '   << ABBREVIATED' : ''}`));
    await page.screenshot({ path: 'shots/probe-pregame-' + W + '.png' });
    // close the replay overlay
    await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
    await page.waitForTimeout(1200);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-replay-ov,.zpb-prematch,.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.waitForTimeout(400);
  }
  await browser.close();
})().catch(e => { console.log('FATAL', e.message); process.exit(1); });
