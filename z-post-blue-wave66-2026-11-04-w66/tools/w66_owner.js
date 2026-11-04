/* w66_owner.js — the Owner's UI round, live on the w66 bytes.
   Covers: the mid-window draft board (no clipped Draft buttons, two-line cards), the Draft
   button tiers (all pulse, top-3 filled team-gradient sheen), RETURN TO AUTO LINEUP (hidden
   until touched, renamed), WEAKEST, the shared Season Review page (sr panel on the regular
   review; TRY AGAIN on its own centered filled panel), the infinite-scroll browser (no
   pager), and the OG1 early-render check. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w66/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

  // ============ A · the mid-window draft board ============
  console.log('== A · draft board at the mid widths ==');
  for (const W of [761, 800, 900, 1000, 1080, 1120, 1280]) {
    const page = await browser.newPage({ viewport: { width: W, height: 900 } });
    await page.goto(FILE); await page.waitForTimeout(500);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => {
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const pk = document.getElementById('draftPickNumberSelect'); if (pk) { pk.value = '1'; pk.dispatchEvent(new Event('change', { bubbles: true })); }
      const b = document.getElementById('startDraftBtn'); if (b) b.click();
    });
    await page.waitForTimeout(1400);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    let btns = 0;
    for (let t = 0; t < 30; t++) {
      btns = await page.evaluate(() => { const tb = document.getElementById('draftTable2'); return tb ? tb.querySelectorAll('td.dc-btn button').length : 0; });
      if (btns > 0) break;
      await page.waitForTimeout(500);
    }
    const m = await page.evaluate(() => {
      const out = { btns: 0, clipped: 0, worst: 0, lines: 0, panelW: 0, railW: 0 };
      const table = document.getElementById('draftTable2'); if (!table) return out;
      const panel = table.closest('.panel');
      const pr = panel.getBoundingClientRect();
      out.panelW = Math.round(pr.width);
      const rows = [...table.querySelectorAll('tbody tr')];
      const btnRow = rows.find(tr => tr.querySelector('td.dc-btn button'));
      rows.forEach(tr => { const b = tr.querySelector('td.dc-btn button'); if (b) { out.btns++; const br = b.getBoundingClientRect(); if (br.right > pr.right + 1) { out.clipped++; out.worst = Math.max(out.worst, Math.round(br.right - pr.right)); } } });
      if (btnRow) {
        const tops = [];
        btnRow.querySelectorAll('td').forEach(td => { const r = td.getBoundingClientRect(); if (r.height > 2) tops.push(r.top + r.height / 2); }); // w66: centers — the tall centered cells (team logo, fills dropdown) straddle the two true lines
        tops.sort((a, b) => a - b);
        let c = 0, last = -99; tops.forEach(t => { if (t - last > 9) { c++; last = t; } }); // w66: the fills dropdown's taller box sits baseline-aligned — group by 9px, not 6px
        out.lines = c;
      }
      const wrap = document.querySelector('.draft-columns');
      if (wrap) { const kids = [...wrap.children]; out.railW = kids.length > 1 ? Math.round(kids[1].getBoundingClientRect().width) : 0; }
      return out;
    });
    const twoCol = m.railW > 0 && m.railW < 500; // w66: a stacked rail is full-width — only a narrow rail means two columns
    ok(m.btns > 0 && m.clipped === 0, `A W=${W} · no Draft button clips the panel`, `btns=${m.btns} clipped=${m.clipped} worst=${m.worst}px panel=${m.panelW} rail=${m.railW}`);
    ok(m.btns === 0 || m.lines <= 2, `A W=${W} · the card reads in two lines or fewer`, `lines=${m.lines}`);
    ok(W < 861 ? !twoCol : true, `A W=${W} · the rail stacks below the board at ≤860`, `railW=${m.railW}`);
    if (W === 900) await page.screenshot({ path: SH + '/w66-board-900.png' });
    await page.close();
  }

  // ============ B · the Draft button tiers (live board, table view) ============
  console.log('== B · the Draft button tiers ==');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(FILE); await page.waitForTimeout(500);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => {
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const _pk = document.getElementById('draftPickNumberSelect'); if (_pk) { _pk.value = '1'; _pk.dispatchEvent(new Event('change', { bubbles: true })); }
      document.getElementById('startDraftBtn').click();
    });
    await page.waitForTimeout(1400);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    for (let t = 0; t < 30; t++) {
      const n = await page.evaluate(() => document.querySelectorAll('#draftTable2 td.dc-btn button').length);
      if (n > 0) break;
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(900); // the streaming board settles before the tier measurement
    const m = await page.evaluate(() => {
      const rows = [...document.querySelectorAll('#draftTable2 tbody tr')];
      const btnRows = rows.filter(tr => tr.querySelector('td.dc-btn button'));
      const topRows = rows.filter(tr => tr.classList.contains('zpb-top3') && tr.querySelector('td.dc-btn button'));
      const plain = btnRows.find(tr => !tr.classList.contains('zpb-top3'));
      const cs = el => el ? getComputedStyle(el) : null;
      const hero = topRows[0] ? topRows[0].querySelector('td.dc-btn button') : null;
      const heroAfter = hero ? getComputedStyle(hero, '::after') : null;
      return {
        total: btnRows.length, topN: topRows.length,
        plainAnim: plain ? cs(plain.querySelector('td.dc-btn button')).animationName : null,
        heroCls: hero ? hero.className : null,
        heroAnim: hero ? cs(hero).animationName : null,
        heroBg: hero ? cs(hero).backgroundImage.slice(0, 60) : null,
        heroSheen: heroAfter ? heroAfter.animationName : null,
        heroColor: hero ? cs(hero).color : null
      };
    });
    ok(m.total > 90, 'B · the live board shows Draft buttons', `total=${m.total}`);
    ok(m.plainAnim === 'zpbBtnPulse', 'B · EVERY Draft button pulses (zpbBtnPulse)', m.plainAnim);
    ok(m.topN >= 1 && /zpb-ctabig/.test(m.heroCls || ''), 'B · the top-3 buttons carry the ctabig hero class', `${m.topN} top rows · ${m.heroCls}`);
    ok(m.heroAnim === 'none', 'B · the hero button trades the pulse for the sheen', m.heroAnim);
    ok(/linear-gradient/.test(m.heroBg || ''), 'B · the hero button is FILLED with the team gradient', m.heroBg);
    ok(m.heroSheen === 'zpbsheen', 'B · the hero button shimmers (zpbsheen)', m.heroSheen);
    await page.screenshot({ path: SH + '/w66-board-hero-1280.png' });
    await page.close();
  }

  // ============ C · preseason: RETURN TO AUTO, WEAKEST, field map presence ============
  console.log('== C · the preseason page ==');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });
    await page.goto(FILE); await page.waitForTimeout(500);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => {
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const _pk = document.getElementById('draftPickNumberSelect'); if (_pk) { _pk.value = '1'; _pk.dispatchEvent(new Event('change', { bubbles: true })); }
      document.getElementById('startDraftBtn').click();
    });
    await page.waitForTimeout(1300);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
    for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
    await page.waitForTimeout(900);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
    await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
    await page.waitForTimeout(1500);
    const c1 = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')].filter(b => /RETURN TO AUTO LINEUP/i.test(b.textContent));
      const models = [...document.querySelectorAll('button')].filter(b => /RETURN TO MODEL LINEUP/i.test(b.textContent));
      const hidden = btns.length ? btns.every(b => getComputedStyle(b).display === 'none' || !b.offsetHeight) : null;
      return { n: btns.length, models: models.length, hiddenInitially: hidden };
    });
    ok(c1.models === 0, 'C · the MODEL wording is gone', `${c1.models} leftovers`);
    ok(c1.n >= 1 && c1.hiddenInitially === true, 'C · RETURN TO AUTO LINEUP exists and is HIDDEN on first paint', `n=${c1.n} hidden=${c1.hiddenInitially}`);
    // the user touches the lineup: the w57 pickers replaced the selects — drive one for real
    const touched = await page.evaluate(() => {
      const roster = draftSim.rosters[draftSim.userIndex];
      const btns = [...document.querySelectorAll('.zpb-pickbtn')];
      for (const btn of btns) {
        btn.click();
        const menu = btn.parentElement.querySelector('.zpb-pickmenu');
        if (!menu) continue;
        const rows = [...menu.querySelectorAll('.zpb-pickrow')];
        const curName = (btn.querySelector('.zpb-pickname') || {}).textContent || '';
        const alt = rows.find(r => (r.title || r.textContent.trim()) !== curName);
        if (!alt) { btn.click(); continue; } // close, try the next picker
        alt.click();
        return { touched: roster._zpbTouched === true, picker: btn.parentElement.querySelector('.zpb-pickname') ? true : true };
      }
      return { err: 'no picker with an alternative' };
    });
    await page.waitForTimeout(700);
    const c2 = await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button')].filter(b => /RETURN TO AUTO LINEUP/i.test(b.textContent));
      const vis = btns.length ? btns.some(b => b.offsetHeight > 0) : null;
      return { n: btns.length, visible: vis };
    });
    ok(touched.touched === true, 'C · a real user move marks roster._zpbTouched', JSON.stringify(touched));
    ok(c2.visible === true, 'C · the AUTO door shows after the user moves someone', `visible=${c2.visible}`);
    // WEAKEST
    const c3 = await page.evaluate(() => ({ weakest: document.body.innerHTML.includes('<b>WEAKEST</b>'), shakiest: document.body.innerHTML.includes('Shakiest') }));
    ok(c3.weakest && !c3.shakiest, 'C · WHY THIS STYLE reads WEAKEST', JSON.stringify(c3));
    // field map present with team-colored chips (deep checks live in w66_teams.js) — measured on the guide's map
    await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
    await page.waitForTimeout(1200);
    const c4 = await page.evaluate(() => {
      const off = document.querySelectorAll('.zpb-fm-off i').length;
      const def = document.querySelectorAll('.zpb-fm-def i').length;
      return { off, def };
    });
    ok(c4.off > 0 && c4.def > 0, 'C · the field map renders both units', JSON.stringify(c4));
    await page.screenshot({ path: SH + '/w66-preseason-1280.png' });
    await page.close();
  }

  // ============ D · the Season Review doors + TRY AGAIN ============
  console.log('== D · the review doors ==');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });
    await page.goto(FILE); await page.waitForTimeout(500);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => {
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Carolina Panthers'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const _pk = document.getElementById('draftPickNumberSelect'); if (_pk) { _pk.value = '1'; _pk.dispatchEvent(new Event('change', { bubbles: true })); }
      document.getElementById('startDraftBtn').click();
    });
    await page.waitForTimeout(1300);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
    for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
    await page.waitForTimeout(900);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
    await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
    await page.waitForTimeout(1100);
    await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
    await page.waitForTimeout(3200);
    // force the regular season to end without a user playoff berth (white-box: drop the user from the seeds for this render)
    const d1 = await page.evaluate(() => {
      const user = seasonUserTeam();
      if (seasonState.phase === 'regular') { // sim the remaining weeks quickly (the A9 confirm answers YES)
        const sw = document.getElementById('simSeasonBtn');
        if (sw) sw.click();
        return { clicked: !!sw, user };
      }
      return { phase: seasonState.phase, user };
    });
    await page.waitForTimeout(400);
    await page.evaluate(() => { const y = document.querySelector('.confirm-ov [data-ss="yes"]'); if (y) y.click(); });
    await page.waitForTimeout(2600);
    const forced = await page.evaluate(() => {
      const user = seasonUserTeam();
      const conf = conferenceOfTeam(user);
      const before = seasonState.seeds[conf].some(x => x.team === user);
      seasonState.__zpbSavedSeeds = JSON.parse(JSON.stringify(seasonState.seeds));
      if (before) seasonState.seeds[conf] = seasonState.seeds[conf].filter(x => x.team !== user); // white-box: this render reads a team that missed the playoffs
      seasonState.phase = 'regularReview';
      renderSeasonTab(document.getElementById('draftResultsBody') || document.getElementById('seasonHost'));
      return { before, user, conf };
    });
    await page.waitForTimeout(1400);
    const d2 = await page.evaluate(() => {
      const panel = document.querySelector('.zpb-sr-own');
      const btn = document.getElementById('seasonReviewBtn');
      const cta = btn ? btn.classList.contains('zpb-ctabig') : false;
      const first = panel ? (panel.parentElement.firstElementChild === panel) : false;
      return { panel: !!panel, btn: !!btn, cta, first, phase: seasonState.phase };
    });
    ok(d2.panel && d2.btn && d2.cta, 'D · the regular-season review carries the SEASON REVIEW panel (filled hero)', JSON.stringify(d2));
    ok(d2.first, 'D · the SEASON REVIEW panel leads the page (own panel, first)');
    if (d2.panel) await page.screenshot({ path: SH + '/w66-regular-review-sr.png' });
    // click it → the shared review page
    await page.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if (b) b.click(); });
    await page.waitForTimeout(1400);
    const d3 = await page.evaluate(() => {
      const h2 = [...document.querySelectorAll('h2')].find(x => /Season Review/i.test(x.textContent));
      const back = document.getElementById('backToSbBtn');
      const tryBtn = document.getElementById('zpbTryAgainBtn');
      const own = tryBtn ? tryBtn.closest('.zpb-sr-own') : null;
      const centered = own ? getComputedStyle(own).textAlign === 'center' : false;
      const filled = tryBtn ? /linear-gradient/.test(getComputedStyle(tryBtn).backgroundImage) : false;
      const sheen = tryBtn ? getComputedStyle(tryBtn, '::after').animationName : null;
      const inTopbar = tryBtn ? !!tryBtn.closest('span') : false;
      const lastPanel = own && own.parentElement ? own.parentElement.lastElementChild === own : false;
      return { reviewPage: !!h2, back: back ? back.textContent.trim() : null, tryBtn: !!tryBtn, ownPanel: !!own, centered, filled, sheen, inTopbar, lastPanel, phase: seasonState.phase };
    });
    ok(d3.reviewPage, 'D · SEASON REVIEW opens the shared review page from the regular review', `phase=${d3.phase}`);
    ok(d3.back === '← Back', 'D · the back door reads ← Back off the Super Bowl page', d3.back);
    ok(d3.tryBtn && d3.ownPanel && d3.centered, 'D · TRY AGAIN TO GO 20-0? sits on its own centered panel', JSON.stringify({ ownPanel: d3.ownPanel, centered: d3.centered }));
    ok(d3.filled && d3.sheen === 'zpbsheen', 'D · TRY AGAIN is filled + shimmering (ctabig + sheen)', `${d3.filled} · ${d3.sheen}`);
    ok(!d3.inTopbar, 'D · the TRY AGAIN button left the top bar');
    ok(d3.lastPanel, 'D · the TRY AGAIN panel closes the page');
    await page.screenshot({ path: SH + '/w66-review-tryagain.png' });
    // back door returns to the regular review
    await page.evaluate(() => { const b = document.getElementById('backToSbBtn'); if (b) b.click(); });
    await page.waitForTimeout(900);
    const d4 = await page.evaluate(() => ({ phase: seasonState.phase, backHome: !!document.querySelector('.zpb-sr-own') }));
    ok(d4.phase === 'regularReview' && d4.backHome, 'D · ← Back returns to the regular-season review', JSON.stringify(d4));
    await page.evaluate(() => { try { seasonState.seeds = seasonState.__zpbSavedSeeds || seasonState.seeds; } catch (e) {} });
    await page.close();
  }

  // ============ E · the Player Browser: infinite scroll, no pager ============
  console.log('== E · the player browser ==');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });
    await page.goto(FILE); await page.waitForTimeout(500);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    // open the browser from the footer nav
    const openedLabel = await page.evaluate(() => {
      const b = document.getElementById('tabPlayersBtn');
      if (b) { b.click(); return b.textContent.trim(); }
      return null;
    });
    await page.waitForTimeout(1200);
    const e1 = await page.evaluate(() => {
      const rows = document.querySelectorAll('#playerBody tr');
      const pager = document.getElementById('playerPager');
      const pagbtn = document.querySelectorAll('.pagbtn').length;
      const pageTxt = /PAGE \d+ OF \d+/.test(document.body.textContent);
      const sent = !!document.getElementById('pbSentinel');
      return { opened: true, rows: rows.length, pagerGone: !pager, pagbtn, pageTxt, sent };
    });
    ok(e1.rows >= 60 && e1.rows <= 62, 'E · the browser opens on the first 60 players (± the streaming chunk edge)', `rows=${e1.rows}`);
    ok(e1.pagerGone && e1.pagbtn === 0 && !e1.pageTxt, 'E · no pager, no PREV/NEXT, no PAGE X OF Y', JSON.stringify(e1));
    ok(e1.sent, 'E · the sentinel exists');
    // scroll the sentinel into view (twice) — rows must grow past 120
    for (let k = 0; k < 2; k++) {
      await page.evaluate(() => { const s = document.getElementById('pbSentinel'); if (s) s.scrollIntoView({ block: 'end' }); });
      await page.waitForTimeout(900);
    }
    const e2 = await page.evaluate(() => ({ rows: document.querySelectorAll('#playerBody tr').length, sent: !!document.getElementById('pbSentinel') }));
    ok(e2.rows >= 180, 'E · scrolling appends the next chunks (60 → 180+)', `rows=${e2.rows}`);
    // filter to a rare position and confirm the rebuild resets to 60
    await page.evaluate(() => {
      const sel = document.getElementById('teamFilter');
      if (sel) { sel.value = 'Kansas City Chiefs'; sel.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    await page.waitForTimeout(900);
    const e3 = await page.evaluate(() => ({ rows: document.querySelectorAll('#playerBody tr').length }));
    ok(e3.rows > 0 && e3.rows <= 61, 'E · a new filter rebuilds from the first chunk', `rows=${e3.rows}`);
    if (e2.rows >= 180) await page.screenshot({ path: SH + '/w66-browser-scroll.png' });
    await page.close();
  }

  // ============ F · OG1 early render ============
  console.log('== F · the OG1 depth-list check ==');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(FILE); await page.waitForTimeout(500);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => {
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const _pk = document.getElementById('draftPickNumberSelect'); if (_pk) { _pk.value = '1'; _pk.dispatchEvent(new Event('change', { bubbles: true })); }
      document.getElementById('startDraftBtn').click();
    });
    await page.waitForTimeout(1400);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    let badRender = null, checks = 0;
    for (let t = 0; t < 30; t++) {
      const st = await page.evaluate(() => {
        const list = document.getElementById('draftRosterList');
        if (!list) return { none: true };
        const groups = [...list.querySelectorAll('.depth-group.off')];
        if (!groups.length) return { none: true };
        const h4 = groups.map(g => g.querySelector('h4') ? g.querySelector('h4').textContent : '');
        const slots = groups.map(g => [...g.querySelectorAll('.slotname')].map(x => x.textContent.trim()));
        return { h4, slots };
      });
      if (!st.none) {
        checks++;
        const txt = JSON.stringify(st.slots);
        if (txt.includes('OT1') && !txt.includes('OG1')) { badRender = st; break; }
      }
      await page.evaluate(() => { try { const b = document.getElementById('simNextBtn') || document.getElementById('draftFastBtn'); if (b) b.click(); } catch (e) {} });
      await page.waitForTimeout(400);
    }
    ok(checks > 0 && !badRender, 'F · the depth list never drops OG1 from the O-line', `checks=${checks}${badRender ? ' · BAD=' + JSON.stringify(badRender).slice(0, 160) : ''}`);
    await page.close();
  }

  await browser.close();
  console.log(`\nw66_owner: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
