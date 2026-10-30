#!/usr/bin/env node
/* w39_live.js — the live drills for the round-39 directives (real Chromium).
   A: the responsive repairs (B1 Madden wonk · B2 browser scroll · B3 groups scrollbar · A7 no silent clipping)
   B: the Honors earned cinematic scrolls itself (A6)
   C: the compact sort chips sort (A3)
   D: the pregame top-three columns, mirrored, one second slower (A4/A5)
   E: the board ink reads in light mode (A1) */
const { chromium } = require('playwright-core');
const FILE = 'file:///home/z/my-project/w39/Football-Sim-Z-post-blue-w39.html';
const OUT = '/home/z/my-project/w39/notes/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

const shot = async (page, path) => { try { await page.screenshot({ path, timeout: 12000 }); } catch (e) { console.log('   (shot skipped:', path.split('/').pop() + ')'); } };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });

  // ---------- A: responsive ----------
  for (const W of [1280, 900, 500, 390]) {
    const ctx = await browser.newContext({ viewport: { width: W, height: 760 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1500);
    console.log(`\n== live A · width ${W} ==`);
    // the page itself never scrolls sideways
    const docOv = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    ok(docOv === 0, 'the page never scrolls sideways', docOv + 'px');
    // every view: no SILENT CLIPPING — each panel either fits or openly scrolls (auto)
    for (const [b, v] of [['tabRankingsBtn','rankings'],['tabPlayersBtn','browser'],['tabGroupsBtn','groups'],['tabCompareBtn','compare'],['tabGuideBtn','guide']]) {
      await page.evaluate(x => document.getElementById(x).click(), b);
      await page.waitForTimeout(650);
      const m = await page.evaluate(() => {
        const bad = [];
        document.querySelectorAll('.view.active .panel, .view.active > .panel').forEach(p => {
          const sw = p.scrollWidth, cw = p.clientWidth, ov = getComputedStyle(p).overflowX;
          if (sw <= cw + 1) return;                        // fits — done
          if (ov === 'auto' || ov === 'scroll') return;    // openly scrollable — the Owner's scrollbar
          bad.push({ cls: (p.className || '').slice(0, 30), sw, cw, ov });
        });
        return bad;
      });
      ok(m.length === 0, `${v}: no silently clipped panel`, JSON.stringify(m).slice(0, 140));
    }
    if (W <= 760) {
      // the phone law: nothing NEEDS a side scrollbar — every panel fits outright
      const needs = await page.evaluate(() => {
        const bad = [];
        document.querySelectorAll('.view.active .panel').forEach(p => {
          if (p.scrollWidth > p.clientWidth + 1) bad.push({ cls: (p.className || '').slice(0, 30), sw: p.scrollWidth, cw: p.clientWidth });
        });
        return bad;
      });
      ok(needs.length === 0, 'A7: no panel needs a side scrollbar at this width', JSON.stringify(needs).slice(0, 140));
    }
    if (W === 500) {
      // B1: the Madden stacked card — the team name on ONE line (no letter-per-line crush)
      await page.evaluate(() => document.getElementById('tabRankingsBtn').click());
      await page.waitForTimeout(700);
      const r = await page.evaluate(() => {
        const t = document.getElementById('resultsTable');
        const tr = t.querySelector('tbody tr.teamrow');
        const name = tr.querySelector('.team');
        const h = tr.getBoundingClientRect().height;
        return { nameH: Math.round(name.getBoundingClientRect().height), rowH: Math.round(h), stacked: t.classList.contains('mstack') };
      });
      ok(r.stacked && r.nameH <= 30 && r.rowH <= 140, 'B1: the stacked ranking card keeps its name on one line', `name ${r.nameH}px · row ${r.rowH}px`);
      await shot(page, `${OUT}/w39_rank_500.png`);
      // B2: the browser scrolls its stack and the pager is reachable
      await page.evaluate(() => document.getElementById('tabPlayersBtn').click());
      await page.waitForTimeout(800);
      const b2 = await page.evaluate(() => {
        const t = document.getElementById('playerTable');
        const panel = t.closest('.panel');
        const lastRow = t.querySelector('tbody tr:last-child');
        return { scrollable: t.scrollHeight > t.clientHeight, lastReachable: !!lastRow };
      });
      ok(b2.scrollable, 'B2: the stacked browser table scrolls itself');
      ok(b2.lastReachable, 'B2: the far names exist in the scroll (the pager is retired, the scroll is the door)');
      await page.evaluate(() => { document.getElementById('playerTable').scrollTop = 99999; });
      await page.waitForTimeout(250);
      const scrolled = await page.evaluate(() => document.getElementById('playerTable').scrollTop > 100);
      ok(scrolled, 'B2: the stack actually scrolls to the far names');
      await shot(page, `${OUT}/w39_browser_500.png`);
      // B3: the groups cards fit — the wrap equals the window
      await page.evaluate(() => document.getElementById('tabGroupsBtn').click());
      await page.waitForTimeout(700);
      const g = await page.evaluate(() => {
        const t = document.getElementById('groupTable');
        const tr = t.querySelector('tbody tr');
        const narr = tr.querySelector('td.narr');
        return { tW: t.scrollWidth, tC: t.clientWidth, narrW: Math.round(narr.getBoundingClientRect().width), mstack: t.classList.contains('mstack') };
      });
      ok(g.tW <= g.tC + 1, 'B3: the stacked groups table fits its panel', `${g.tW}/${g.tC}`);
      await shot(page, `${OUT}/w39_groups_500.png`);
    }
    if (W === 900) {
      // B3 desktop-narrow: the panel grows a scrollbar instead of clipping
      await page.evaluate(() => document.getElementById('tabGroupsBtn').click());
      await page.waitForTimeout(700);
      const g = await page.evaluate(() => {
        const panel = document.querySelector('#viewGroups .panel');
        return { ov: getComputedStyle(panel).overflowX, sw: panel.scrollWidth, cw: panel.clientWidth };
      });
      ok(g.ov === 'auto' && g.sw <= g.cw + 1, 'B3: at 900px the groups panel fits or openly scrolls', JSON.stringify(g));
      // A3: the compact chips are visible and sort
      await page.evaluate(() => { try { document.getElementById('tabDraftBtn').click(); startDraft2(); draftSpeed = 'instant'; if (window._zpbWelCleanup) window._zpbWelCleanup(); } catch (e) { window.__e = String(e); } });
      await page.waitForTimeout(1600);
      const chips = await page.evaluate(() => {
        const bar = document.getElementById('draftCompactSort');
        if (!bar) return { none: true };
        const vis = getComputedStyle(bar).display !== 'none';
        const on = bar.querySelector('.zpb-cs-on');
        return { vis, count: bar.querySelectorAll('[data-zsort]').length, active: on ? on.dataset.zsort : null, theadHidden: getComputedStyle(document.querySelector('#draftTable2 thead')).display === 'none' };
      });
      ok(chips.vis && chips.count === 7 && chips.theadHidden, 'A3: the chips ride above the thead-less compact board', JSON.stringify(chips));
      // click WINS → the order changes and the chip marks
      const before = await page.evaluate(() => [...document.querySelectorAll('#draftBody2 tr td.dc-wins')].slice(0, 5).map(td => td.textContent).join(','));
      await page.evaluate(() => document.querySelector('#draftCompactSort [data-zsort="wins"]').click());
      await page.waitForTimeout(500);
      const after = await page.evaluate(() => {
        const vals = [...document.querySelectorAll('#draftBody2 tr td.dc-wins')].slice(0, 5).map(td => parseFloat(td.textContent));
        const on = document.querySelector('#draftCompactSort .zpb-cs-on');
        return { vals, on: on ? on.dataset.zsort : null };
      });
      const sorted = after.vals.every((v, i, a) => i === 0 || a[i - 1] >= v);
      ok(sorted && after.on === 'wins', 'A3: the WINS chip sorts the board and takes the accent', `top: ${after.vals.join(',')}`);
      ok(before !== [...after.vals].map(String).join(','), 'A3: the order actually changed');
      await shot(page, `${OUT}/w39_board_900.png`);
    }
    if (errs.length) ok(false, `width ${W}: zero page errors`, errs.slice(0, 2).join('|'));
    else ok(true, `width ${W}: zero page errors`);
    await ctx.close();
  }

  // ---------- B: the Honors overlay at short windows ----------
  for (const [W, H] of [[1280, 500], [900, 380]]) {
    const ctx = await browser.newContext({ viewport: { width: W, height: H } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1300);
    const driven = await page.evaluate(() => {
      try {
        startDraft2(); draftSpeed = 'instant';
        for (let g = 0; g < 6000 && draftSim.pos < draftSim.order.length; g++) {
          const t = draftSim.order[draftSim.pos];
          if (t === draftSim.userIndex) {
            const r = draftSim.rosters[t]; if (firstOpenSlotAny(r) === null) { draftSim.pos++; continue; }
            const nat = p => (NATURAL_SLOT_MAP[p[1]] || []).filter(s => !r.slots[s]);
            let c = draftSim.pool.filter(p => nat(p).length); if (!c.length) c = draftSim.pool.slice(); c.sort((a, b) => b[3] - a[3]);
            const p = c[0], on = nat(p); const s = on.length ? on[0] : ROSTER_SLOTS.find(s => !r.slots[s]); executePick(draftSim.userIndex, p, s);
          } else { const pk = cpuPick(t); if (pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++; }
        }
        draftSim.awaitingUser = false; finishDraft2();
        document.getElementById('resultsSeasonBtn').click();
      } catch (e) { return { err: String(e) }; }
      return { ok: 1 };
    });
    await page.waitForTimeout(700);
    await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
    await page.waitForTimeout(5600);
    await page.evaluate(() => {
      const ss = document.getElementById('simSeasonBtn'); if (ss) ss.click();
    });
    await page.waitForTimeout(400);
    await page.evaluate(() => {
      const ov = document.querySelector('.confirm-ov');
      const yes = ov ? [...ov.querySelectorAll('button')].find(b => /YES/.test(b.textContent)) : null;
      if (yes) yes.click();
    });
    await page.waitForTimeout(5500);
    const ov = await page.evaluate(() => {
      const o = document.querySelector('.zpb-restov');
      if (!o) return { none: true };
      const btn = o.querySelector('#zpbRestGo');
      const br = btn.getBoundingClientRect();
      return { ovH: o.clientHeight, scrollH: o.scrollHeight, ovY: getComputedStyle(o).overflowY, btnBottom: Math.round(br.bottom), vh: window.innerHeight,
        reachable: br.top >= 0 && br.bottom <= window.innerHeight + 40 };
    });
    console.log(`\n== live B · honors ${W}x${H} ==`);
    ok(!ov.none, 'the books overlay opened', JSON.stringify(ov).slice(0, 120));
    if (!ov.none) {
      ok(ov.ovY === 'auto', 'A6: the overlay is its own scroller', 'overflowY ' + ov.ovY);
      // scroll the overlay to the bottom — the Continue must come into view
      const seen = await page.evaluate(() => {
        const o = document.querySelector('.zpb-restov');
        o.scrollTop = o.scrollHeight;
        const br = o.querySelector('#zpbRestGo').getBoundingClientRect();
        return br.top >= 0 && br.bottom <= window.innerHeight + 2;
      });
      ok(seen, `A6: the Continue reaches the viewport at ${H}px tall`, `btnBottom ${ov.btnBottom}/${ov.vh}`);
      await shot(page, `${OUT}/w39_honors_${W}x${H}.png`);
      // the Continue still works from there
      const closed = await page.evaluate(() => { document.getElementById('zpbRestGo').click(); return !document.querySelector('.zpb-restov'); });
      ok(closed, 'A6: the Continue closes the books from the scrolled state');
    }
    await ctx.close();
  }

  // ---------- D+E: the pregame columns + the light ink ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1400);
    await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'light'); document.getElementById('tabDraftBtn').click(); startDraft2(); draftSpeed = 'instant'; if (window._zpbWelCleanup) window._zpbWelCleanup(); } catch (e) { window.__e = String(e); } });
    await page.waitForTimeout(1500);
    // finish the draft (the season needs a completed roster — the B leg's drive)
    await page.evaluate(() => {
      try {
        for (let g = 0; g < 6000 && draftSim.pos < draftSim.order.length; g++) {
          const t = draftSim.order[draftSim.pos];
          if (t === draftSim.userIndex) {
            const r = draftSim.rosters[t]; if (firstOpenSlotAny(r) === null) { draftSim.pos++; continue; }
            const nat = p => (NATURAL_SLOT_MAP[p[1]] || []).filter(s => !r.slots[s]);
            let c = draftSim.pool.filter(p => nat(p).length); if (!c.length) c = draftSim.pool.slice(); c.sort((a, b) => b[3] - a[3]);
            const p = c[0], on = nat(p); const s = on.length ? on[0] : ROSTER_SLOTS.find(s => !r.slots[s]); executePick(draftSim.userIndex, p, s);
          } else { const pk = cpuPick(t); if (pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++; }
        }
        draftSim.awaitingUser = false; finishDraft2();
      } catch (e) { window.__de = String(e); }
    });
    await page.waitForTimeout(1200);
    console.log('\n== live D+E · the board ink (light) ==');
    const ink = await page.evaluate(() => {
      const td = document.querySelector('#draftBody2 tr td.dc-name');
      const pri = document.querySelector('#draftBody2 tr td.dc-pri');
      const row = document.querySelector('#draftBody2 tr');
      return { name: getComputedStyle(td).color, pri: getComputedStyle(pri).color, row: getComputedStyle(row).color };
    });
    console.log('   colors:', JSON.stringify(ink));
    ok(ink.name !== 'rgb(83, 56, 43)' && ink.name !== '', 'A1: the board name wears a team ink (not the plain text token)', ink.name);
    // D: a playoff pregame — the columns (the stress suite's drive)
    await page.evaluate(() => { try { document.getElementById('resultsSeasonBtn').click(); } catch (e) { window.__e = String(e); } });
    await page.waitForTimeout(700);
    await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
    await page.waitForTimeout(5600);
    await page.evaluate(() => { const ss = document.getElementById('simSeasonBtn'); if (ss) ss.click(); });
    await page.waitForTimeout(500);
    await page.evaluate(() => { const ov = document.querySelector('.confirm-ov'); const yes = ov ? [...ov.querySelectorAll('button')].find(b => /YES/.test(b.textContent)) : null; if (yes) yes.click(); });
    await page.waitForTimeout(7000);
    const dbg1 = await page.evaluate(() => ({ phase: (typeof seasonState !== 'undefined' && seasonState) ? seasonState.phase : 'none', ov: !!document.querySelector('.zpb-restov') }));
    console.log('   (drive: after sim leg)', JSON.stringify(dbg1));
    await page.evaluate(() => { try { const g = document.getElementById('zpbRestGo'); if (g) g.click(); } catch (e) {} });
    await page.waitForTimeout(900);
    await page.evaluate(() => { try { startPlayoffs(); } catch (e) { window.__pe = String(e); } });
    await page.waitForTimeout(600);
    const dbg2 = await page.evaluate(() => ({ phase: seasonState.phase, round: seasonState.currentPlayoffRound, err: window.__pe || '' }));
    console.log('   (drive: playoffs)', JSON.stringify(dbg2));
    // open the user's replay — advance past any bye until a replay with an intro is up (max 3 rounds)
    for (let round = 0; round < 3; round++) {
      await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody')); } catch (e) { window.__pe2 = String(e); } });
      await page.waitForTimeout(600);
      await page.evaluate(() => { try { const b = document.getElementById('simRoundBtn'); if (b) b.click(); } catch (e) { window.__pe3 = String(e); } });
      await page.waitForTimeout(4200);
      const up = await page.evaluate(() => !!document.querySelector('.zpb-replay-ov') && document.querySelectorAll('.zpb-intro-star').length > 0);
      if (up) break;
      await page.evaluate(() => { try { const o = document.querySelector('.zpb-replay-ov'); if (o) o.remove(); advancePlayoffRound(); simulatePlayoffRound(); } catch (e) { window.__pe4 = String(e); } });
      await page.waitForTimeout(600);
    }
    const stars = await page.evaluate(() => {
      const st = [...document.querySelectorAll('.zpb-intro-star')];
      return st.map(s => { const r = s.getBoundingClientRect(); return { n: s.querySelector('b').textContent.slice(0, 14), side: s.classList.contains('zpb-st-side') ? 'L' : (s.classList.contains('zpb-st-side-r') ? 'R' : 'C'), sx: s.style.getPropertyValue('--sx'), sy: s.style.getPropertyValue('--sy'), delay: (s.style.animationDelay || '').replace('ms', ''), x: Math.round(r.left), y: Math.round(r.top) }; });
    });
    console.log('\n== live D · the pregame lineup ==', JSON.stringify(stars));
    const L = stars.filter(s => s.side === 'L'), R = stars.filter(s => s.side === 'R');
    ok(stars.length >= 2 && L.length === R.length && L.length <= 3, 'A4: the columns cap at three and face each other', `L${L.length}/R${R.length}`);
    if (L.length === R.length && L.length) {
      const sameH = L.every((s, i) => Math.abs(parseFloat(L[i].sy) - parseFloat(R[i].sy)) < 0.01);
      const sameBeat = L.every((s, i) => L[i].delay === R[i].delay);
      ok(sameH, 'A4: every row stands at the SAME height across the middle', L.map(s => s.sy).join('/'));
      ok(sameBeat, 'A4: every pair shares one beat', L.map(s => s.delay).join('/'));
      const noTopBottom = stars.every(s => parseFloat(s.sy) > 5 && parseFloat(s.sy) < 95);
      ok(noTopBottom, 'A4: nobody stands at the old top/bottom stations');
    }
    const fade = await page.evaluate(() => { const s = document.querySelector('.zpb-intro-star'); return s ? getComputedStyle(s).animationDuration : ''; });
    ok(fade === '4.4s', 'A5: the fade cycle runs 4.4s', fade);
    if (stars.length) await shot(page, `${OUT}/w39_pregame_1280.png`);
    ok(errs.length === 0, 'zero page errors through the season + pregame', errs.slice(0, 2).join('|'));
    await ctx.close();
  }

  await browser.close();
  console.log(`\nLIVE DONE — ${pass} PASS / ${fail} FAIL`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('LIVE CRASH', e); process.exit(1); });
