/* w69_probe2.js — focused: item 4 (preseason selects geometry) + item 5 (lineup select + compare family). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w69/Football-Sim-Z-post-blue-w68.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // boot the draft as Cleveland Browns (item 2's team) — also gives us the lineup editor
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Cleveland Browns'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }

  // ===== the preseason page =====
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(700);
  const flow = await page.evaluate(() => {
    const s = document.getElementById('startSeasonBtn');
    if (s) { s.click(); return 'clicked startSeasonBtn'; }
    return 'no startSeasonBtn; resultsView=' + (typeof resultsView !== 'undefined' ? resultsView : '?');
  });
  console.log('flow:', flow);
  await page.waitForTimeout(1100);
  const i4 = await page.evaluate(() => {
    const out = {};
    for (const id of ['aggrSel', 'scriptOff', 'scriptDef']) {
      const s = document.getElementById(id);
      if (!s) { out[id] = null; continue; }
      const r = s.getBoundingClientRect();
      const cs = getComputedStyle(s);
      const o = s.options[s.selectedIndex];
      out[id] = {
        selected: o ? o.textContent : null,
        clientW: s.clientWidth, scrollW: s.scrollWidth,
        rectL: Math.round(r.left), rectW: Math.round(r.width),
        padL: cs.paddingLeft, padR: cs.paddingRight, textIndent: cs.textIndent,
        textAlign: cs.textAlign, direction: cs.direction,
        font: cs.fontFamily.slice(0, 38), clipped: s.scrollWidth > s.clientWidth
      };
    }
    return out;
  });
  console.log('ITEM4:', JSON.stringify(i4, null, 1));
  // zoom shot of the two panels
  const agg = await page.$('#aggrSel');
  if (agg) { const pn = await page.evaluateHandle(el => el.closest('.panel'), agg); await pn.asElement().screenshot({ path: '/home/z/my-project/work/w69/shots/probe-preseason-aggr.png' }); }
  const so = await page.$('#scriptOff');
  if (so) { const pn = await page.evaluateHandle(el => el.closest('.panel'), so); await pn.asElement().screenshot({ path: '/home/z/my-project/work/w69/shots/probe-preseason-phil.png' }); }

  // ===== item 5: the lineup editor selects on THIS page =====
  const i5 = await page.evaluate(() => {
    const sels = Array.from(document.querySelectorAll('select[data-lineup], select[data-returner], select[data-returner-pr]')).map(s => {
      const cs = getComputedStyle(s);
      return { key: s.getAttribute('data-lineup') || s.getAttribute('data-returner') || 'PR', opts: s.options.length,
        sample: Array.from(s.options).slice(0, 2).map(o => o.textContent.slice(0, 40)),
        font: cs.fontFamily.slice(0, 34), color: cs.color, w: s.clientWidth, h: s.clientHeight };
    });
    return sels;
  });
  console.log('ITEM5 lineup selects:', JSON.stringify(i5, null, 1));
  const lu = await page.$('select[data-lineup]');
  if (lu) { await lu.scrollIntoViewIfNeeded(); const row = await page.evaluateHandle(el => el.closest('.depth-row') || el, lu); await row.asElement().screenshot({ path: '/home/z/my-project/work/w69/shots/probe-lineup-select.png' }); }

  // open a lineup select natively? can't in headless; but check the compare-tab enhanced family
  await page.evaluate(() => { const b = document.getElementById('resultsCompareBtn'); if (b) b.click(); });
  await page.waitForTimeout(700);
  const cmp = await page.evaluate(() => {
    const w = document.querySelector('.zpb-cmpwrap');
    if (!w) return { enhanced: false };
    const btn = w.querySelector('.zpb-selbtn'), face = w.querySelector('.zpb-face');
    const csB = getComputedStyle(btn), csF = face ? getComputedStyle(face) : null;
    // open it
    btn.click();
    const pop = w.querySelector('.zpb-selpop');
    const opts = pop ? Array.from(pop.querySelectorAll('.zpb-selopt')).slice(0, 3) : [];
    return { enhanced: true, btnFont: csB.fontFamily.slice(0, 40), faceColor: csF ? csF.color : null,
      popOpts: opts.map(o => { const c = getComputedStyle(o); return { text: o.textContent.slice(0, 30), font: c.fontFamily.slice(0, 34), color: c.color }; }) };
  });
  console.log('ITEM5 compare family:', JSON.stringify(cmp, null, 1));

  console.log('page errors:', errs.length, errs.slice(0, 3));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
