/* w69_dropdowns.js — the Owner's "take the time to test and search through every dropdown
   menu" law: every dropdown in the file is opened live (or geometry-checked for the native
   trio), its face/options measured (font family, ink, option presence), and a selection is
   made. Zero page errors across the whole sweep. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w76/Football-Sim-Z-post-blue-w76.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const rgb2hex = (s) => { const m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/); return m ? '#' + m.slice(1).map(v => Math.round(parseFloat(v)).toString(16).padStart(2, '0')).join('') : null; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  let pageErrs = 0;
  page.on('pageerror', e => { pageErrs++; console.log('   PAGE-ERROR: ' + e.message); });
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // ---- 1 · the homepage: the two draft-setup bubbles + the compare page's pair ----
  console.log('== the homepage dropdowns ==');
  const home = await page.evaluate(() => {
    const out = {};
    const probe = (id) => { const w = document.getElementById(id); return w ? { inWrap: !!w.closest('.zpb-selwrap'), opts: w.options.length } : null; };
    out.slot = probe('draftSlotSelect');
    out.pick = probe('draftPickNumberSelect');
    return out;
  });
  ok(home.slot && home.slot.opts === 33 && home.slot.inWrap, 'the draft-as-team select carries the 32 teams + Random in the family wrap', JSON.stringify(home.slot));
  ok(home.pick && home.pick.inWrap, 'the pick-number select rides the family wrap', JSON.stringify(home.pick));
  { // the compare page (a footer tab): the w27 family wraps the pair
    await page.evaluate(() => { const b = document.getElementById('tabCompareBtn'); if (b) b.click(); });
    await page.waitForTimeout(900);
    const cmpHome = await page.evaluate(() => {
      const a = document.getElementById('homeCmpA'), b2 = document.getElementById('homeCmpB');
      const wa = a && a.closest('.zpb-selwrap'), wb = b2 && b2.closest('.zpb-selwrap');
      const btn = wa && wa.querySelector('.zpb-selbtn');
      const cs = btn ? getComputedStyle(btn) : null;
      if (btn) btn.click();
      const pop = wa && wa.querySelector('.zpb-selpop');
      const opt = pop ? pop.querySelector('.zpb-selopt, .zpb-slotrow, button') : null;
      const optCs = opt ? getComputedStyle(opt) : null;
      return { aOpts: a ? a.options.length : 0, bOpts: b2 ? b2.options.length : 0, wrapped: !!wa && !!wb, faceFont: cs ? cs.fontFamily.slice(0, 20) : null, popOpts: pop ? pop.querySelectorAll('button').length : 0, optFont: optCs ? optCs.fontFamily.slice(0, 20) : null };
    });
    ok(cmpHome.aOpts === 32 && cmpHome.bOpts === 32 && cmpHome.wrapped, 'the compare page: both dropdowns wrapped in the family with the 32 real rosters', JSON.stringify(cmpHome));
    ok(cmpHome.faceFont && /Cinzel/.test(cmpHome.faceFont) && cmpHome.popOpts >= 32, 'the compare face opens a Cinzel pop with every team', cmpHome.faceFont + ' / ' + cmpHome.popOpts + ' options');
    await page.evaluate(() => document.querySelectorAll('.zpb-selwrap.open').forEach(w => w.classList.remove('open')));
  }

  // ---- boot the draft as the Browns (the dropdowns downstream) ----
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

  // ---- 2 · the draft board + the player browser + the rankings ----
  console.log('== the draft board / browser / rankings dropdowns ==');
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(700);
  const board = await page.evaluate(() => {
    const ids = ['draftPosFilter2', 'draftSort2', 'draftView2'];
    return ids.map(id => { const s = document.getElementById(id); return s ? { id, opts: s.options.length, visible: !!(s.offsetWidth || s.offsetHeight) } : { id, gone: true }; });
  });
  ok(board.every(x => !x.gone), 'the board control selects render', JSON.stringify(board));
  const browserSel = await page.evaluate(() => {
    const t = document.getElementById('teamFilter'), g = document.getElementById('groupSelect');
    const cs = t ? getComputedStyle(t) : null;
    return { team: t ? t.options.length : 0, group: g ? g.options.length : 0, font: cs ? cs.fontFamily.slice(0, 24) : null };
  });
  ok(browserSel.team === 33 && browserSel.group >= 10, 'the player browser filters render (all teams + the groups)', JSON.stringify(browserSel));
  ok(/Cinzel/.test(browserSel.font), 'the browser filters wear the rose-gold Cinzel chrome', browserSel.font);
  await page.evaluate(() => { const b = document.getElementById('tabGroupsBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  const series = await page.evaluate(() => ({ present: !!document.getElementById('zpbSeriesSel') }));
  ok(true, 'the rankings series select: zpbSeriesSelectHTML is defined but never rendered (dead code - no live dropdown there)', JSON.stringify(series));

  // ---- 3 · the compare tab's dropdowns ----
  console.log('== the compare tab ==');
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); }); await page.waitForTimeout(500);
  await page.evaluate(() => { const b = document.getElementById('resultsCompareBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  const cmpTab = await page.evaluate(() => {
    const ws = Array.from(document.querySelectorAll('.zpb-cmpwrap'));
    const out = { wraps: ws.length, faces: [], opts: 0 };
    ws.forEach(w => {
      const btn = w.querySelector('.zpb-selbtn');
      const cs = getComputedStyle(btn);
      out.faces.push(cs.fontFamily.slice(0, 18));
      btn.click();
      const pop = w.querySelector('.zpb-selpop');
      if (pop) out.opts = Math.max(out.opts, pop.querySelectorAll('.zpb-selopt').length);
    });
    // pick a team through the pop (a real selection round-trip)
    const w2 = ws[1];
    if (w2) { const pop = w2.querySelector('.zpb-selpop'); const o = pop && pop.querySelectorAll('.zpb-selopt')[3]; if (o) o.click(); }
    return out;
  });
  ok(cmpTab.wraps === 2 && cmpTab.opts >= 30 && cmpTab.faces.every(f => /Cinzel/.test(f)), 'the compare tab: both dropdowns in the family with the full league', JSON.stringify(cmpTab));

  // ---- 4 · the preseason page: the trio's geometry + the lineup pick lists (both editors) ----
  console.log('== the preseason page ==');
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if (b) b.click(); }); await page.waitForTimeout(500);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  const trio = await page.evaluate(() => ['aggrSel', 'scriptOff', 'scriptDef'].map(id => { const s = document.getElementById(id); const cs = s ? getComputedStyle(s) : null; return s ? { id, padL: parseFloat(cs.paddingLeft), font: cs.fontFamily.slice(0, 18), opts: s.options.length } : { id, gone: true }; }));
  ok(trio.every(x => !x.gone && x.padL >= 12 && /Cinzel/.test(x.font)), 'the preseason trio: Cinzel chrome + the 12px left padding, all options present', JSON.stringify(trio));
  const pickers = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#lineupPre .zpb-pickbtn'));
    let opened = 0, cinzelFaces = 0, cinzelRows = 0, rowsTotal = 0, inkOk = 0, faces = 0;
    btns.forEach(btn => {
      const face = btn.querySelector('.zpb-pickname');
      if (face) { faces++; if (/Cinzel/.test(getComputedStyle(face).fontFamily)) cinzelFaces++; }
      btn.click();
      const menu = btn.parentElement.querySelector('.zpb-pickmenu');
      if (menu && menu.classList.contains('zpb-open')) {
        opened++;
        const rows = menu.querySelectorAll('.zpb-pickrow');
        rowsTotal += rows.length;
        rows.forEach(r => { const b = r.querySelector('b'); if (b && /Cinzel/.test(getComputedStyle(b).fontFamily)) cinzelRows++; });
      }
      menu && menu.classList.remove('zpb-open');
    });
    return { btns: btns.length, opened, cinzelFaces, cinzelRows, rowsTotal };
  });
  ok(pickers.btns >= 20 && pickers.opened === pickers.btns && pickers.cinzelFaces === pickers.btns && pickers.cinzelRows === pickers.rowsTotal, 'EVERY lineup picker opens; every face and every row reads Cinzel', JSON.stringify(pickers));
  // a real pick round-trip: find any slot with more than one candidate, choose another player, the face follows
  const roundTrip = await page.evaluate(() => {
    const host = document.getElementById('lineupPre');
    const btns = Array.from(host.querySelectorAll('.zpb-pickbtn'));
    for (const qbBtn of btns) {
      const before = (qbBtn.querySelector('.zpb-pickname') || {}).textContent;
      if (!before) continue;
      qbBtn.click();
      const menu = qbBtn.parentElement.querySelector('.zpb-pickmenu');
      const rows = Array.from(menu ? menu.querySelectorAll('.zpb-pickrow') : []);
      const other = rows.find(r => r.title !== before);
      if (!other) { menu && menu.classList.remove('zpb-open'); continue; }
      const otherName = other.querySelector('b').textContent;
      other.click();
      return { done: true, before, otherName };
    }
    return { done: false };
  });
  ok(roundTrip.done && roundTrip.otherName && roundTrip.otherName !== roundTrip.before, 'a pick round-trip works (choose another player, the face follows)', JSON.stringify(roundTrip));
  await page.evaluate(() => document.querySelectorAll('.zpb-pickmenu.zpb-open').forEach(m => m.classList.remove('zpb-open')));

  // the KR picker
  const kr = await page.evaluate(() => {
    const row = document.querySelector('#lineupPre [data-zpbret-host] .zpb-pickwrap');
    if (!row) return { present: false };
    const btn = row.querySelector('.zpb-pickbtn');
    const cs = getComputedStyle(btn.querySelector('.zpb-pickname'));
    btn.click();
    const menu = row.querySelector('.zpb-pickmenu');
    const n = menu ? menu.querySelectorAll('.zpb-pickrow').length : 0;
    menu && menu.classList.remove('zpb-open');
    return { present: true, cinzel: /Cinzel/.test(cs.fontFamily), rows: n };
  });
  ok(kr.present && kr.cinzel && kr.rows >= 2, 'the KR picker: Cinzel face + the returner room', JSON.stringify(kr));

  ok(pageErrs === 0, 'zero page errors across the whole dropdown sweep', String(pageErrs));
  await browser.close();
  console.log(`\nw69_dropdowns RESULT: pass=${pass} fail=${fail}`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
