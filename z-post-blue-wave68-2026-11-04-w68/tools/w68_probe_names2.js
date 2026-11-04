/* w68_probe_names2.js — measure the preview key-player cards' name ladder at several widths. */
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

  const read = () => page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.zpb-pvwrap .zpb-pcard-hd b, .zpb-pcard-hd b').forEach(b => {
      const card = b.closest('.zpb-pcard');
      out.push({
        shown: b.textContent,
        full: b.getAttribute('data-nmfull') || b.textContent,
        bW: Math.round(b.clientWidth),
        cardW: card ? Math.round(card.clientWidth) : null,
        lines: Math.round(b.getBoundingClientRect().height / parseFloat(getComputedStyle(b).lineHeight || 16)),
      });
    });
    return out;
  });

  for (const W of [1280, 1024, 768, 390]) {
    await page.setViewportSize({ width: W, height: 940 });
    await page.waitForTimeout(500);
    const rows = await read();
    console.log('== W=' + W + ' — preview key-player cards ==');
    rows.forEach(r => console.log(`   shown="${r.shown}" full="${r.full}" bW=${r.bW} cardW=${r.cardW} lines=${r.lines}${r.shown !== r.full ? '   << ABBREVIATED' : ''}`));
    const el = await page.$('.zpb-pvwrap');
    if (el && W === 1280) await el.screenshot({ path: 'shots/probe-preview-cards-1280.png' });
    if (el && W === 768) await el.screenshot({ path: 'shots/probe-preview-cards-768.png' });
  }
  await browser.close();
})().catch(e => { console.log('FATAL', e.message); process.exit(1); });
