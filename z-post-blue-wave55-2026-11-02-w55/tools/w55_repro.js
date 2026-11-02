/* w55_repro.js — see the Owner's three unclear reports at phone width before patching:
   (1) the box score "two separate panels", (2) side scroll on preview/review,
   (3) key-player ratings bunched on the position badge. Also the draft-board row heights. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // ---- draft: instant, capture the board mid-flight (TOP rows) ----
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); });
  await page.waitForTimeout(1500);
  const board = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#draftCards .prow')].slice(0, 6).map(r => {
      const cs = getComputedStyle(r);
      return { h: Math.round(r.getBoundingClientRect().height), lines: Math.round(r.getBoundingClientRect().height / parseFloat(cs.fontSize || 13)) };
    });
    const trs = [...document.querySelectorAll('#draftTable2 tbody tr')].slice(0, 6).map(r => Math.round(r.getBoundingClientRect().height));
    const cardsView = document.getElementById('draftCards') && document.getElementById('draftCards').style.display !== 'none';
    return { cardsView, rows, trs, overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  console.log('DRAFT BOARD @390:', JSON.stringify(board));
  await page.screenshot({ path: '/home/z/my-project/w55/shots/repro-draft-board.png' });

  // finish the draft
  await page.evaluate(() => { const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });

  // ---- season: week 1 preview ----
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  const prev = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const wide = [];
    document.querySelectorAll('.panel').forEach(p => {
      const w = p.scrollWidth - p.clientWidth;
      if (w > 2) wide.push({ cls: (p.className || '').slice(0, 40), over: w, inner: [...p.querySelectorAll('*')].filter(e => e.scrollWidth - e.clientWidth > 2).slice(0, 4).map(e => (e.className || e.tagName).toString().slice(0, 40) + '+' + (e.scrollWidth - e.clientWidth)) });
    });
    return { docW, wide: wide.slice(0, 8) };
  });
  console.log('PREVIEW @390:', JSON.stringify(prev));
  await page.screenshot({ path: '/home/z/my-project/w55/shots/repro-preview.png', fullPage: false });

  // ---- play the week -> the review page (box score) ----
  await page.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  const rev = await page.evaluate(() => {
    const docW = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const wide = [];
    document.querySelectorAll('.panel').forEach(p => {
      const w = p.scrollWidth - p.clientWidth;
      if (w > 2) wide.push({ cls: (p.className || '').slice(0, 40), over: w, inner: [...p.querySelectorAll('*')].filter(e => e.scrollWidth - e.clientWidth > 2).slice(0, 4).map(e => (e.className || e.tagName).toString().slice(0, 40) + '+' + (e.scrollWidth - e.clientWidth)) });
    });
    // the box score: linescore + team stats geometry
    const ls = document.querySelector('.linescore');
    const lsR = ls ? ls.getBoundingClientRect() : null;
    // key players cards: rating vs poschip overlap
    const kcards = [...document.querySelectorAll('.zpb-pvcard')].slice(0, 6).map(c => {
      const rt = c.querySelector('.zpb-pcard-rt'), chip = c.querySelector('.zpb-poschip'), hd = c.querySelector('.zpb-pcard-hd');
      const rb = rt && rt.getBoundingClientRect(), cb = chip && chip.getBoundingClientRect(), hb = hd && hd.getBoundingClientRect();
      const overlap = rb && cb ? !(rb.left > cb.right || rb.right < cb.left || rb.top > cb.bottom || rb.bottom < cb.top) : null;
      return { w: Math.round(c.getBoundingClientRect().width), hdW: hb ? Math.round(hb.width) : null, rtW: rb ? Math.round(rb.width) : null, overlap, chipRight: cb ? Math.round(cb.right) : null, rtLeft: rb ? Math.round(rb.left) : null };
    });
    return { docW, wide: wide.slice(0, 8), lsW: lsR ? Math.round(lsR.width) : null, lsOver: ls ? ls.scrollWidth - ls.clientWidth : null, kcards };
  });
  console.log('REVIEW @390:', JSON.stringify(rev));
  const box = await page.evaluate(() => { const d = document.querySelector('.zst-detail'); const g = document.querySelector('#zpbGameReviewNow'); const t = g || d; if (t) t.scrollIntoView({ block: 'start' }); return !!t; });
  await page.waitForTimeout(600);
  if (box) await page.screenshot({ path: '/home/z/my-project/w55/shots/repro-boxscore.png' });
  await page.screenshot({ path: '/home/z/my-project/w55/shots/repro-review.png' });

  // ---- a played game's box via the schedule tile (the same renderGameResultHTML) ----
  console.log('pageerrors:', errors.length ? errors : 'none');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
