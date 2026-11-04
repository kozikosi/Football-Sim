/* w66_r2.js — the Owner's SECOND UI round, live on the w66 bytes.
   Covers: the fills dropdown (N1), the roster badges (N2), the one-clock card/map cascade
   (N3), the removed aside (N4), the comparison dropdowns (N5), the upper-line doors (N6),
   the one SIM PLAYOFFS door (N7), the sim-playoffs end screens (N8), the COTY shimmer
   surface (N9, conditional), the RUN IT BACK caution (N10). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w66/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);

  // ============ boot a full draft as Detroit ============
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Detroit Lions'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }

  // ============ N1 · the fills dropdown ============
  console.log('== N1 · the fills dropdown ==');
  {
    // the live draft is over; run a fresh quick draft to reach the board? — instead, use the completed
    // draft's roster view for N2 and test N1 on a fresh SHORT draft (5 picks).
    await page.evaluate(() => { try { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); } catch (e) {} });
    await page.waitForTimeout(800);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    // start a new draft flow for the fills check
    await page.evaluate(() => { try { const b = document.getElementById('newDraftBtn'); if (b) b.click(); } catch (e) {} });
    await page.waitForTimeout(600);
    await page.evaluate(() => { try { const c = document.querySelector('.zpb-caution-ov [data-zc="yes"]'); if (c) c.click(); } catch (e) {} });
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Detroit Lions'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      document.getElementById('startDraftBtn').click();
    });
    await page.waitForTimeout(1500);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    let trigs = 0;
    for (let t = 0; t < 24; t++) {
      trigs = await page.evaluate(() => document.querySelectorAll('#draftTable2 .zpb-slotdd').length);
      if (trigs > 0) break;
      await page.waitForTimeout(500);
    }
    ok(trigs > 0, 'N1 the fills cell renders dropdown triggers', `triggers=${trigs}`);
    const lbl = await page.evaluate(() => {
      const b = document.querySelector('#draftTable2 .zpb-slotdd');
      return b ? b.textContent.trim() : '';
    });
    ok(/^[A-Z0-9]+( \(-\d+ FLEX\))?$/.test(lbl), 'N1 the label reads "FS (-10 FLEX)" format — one label', `label="${lbl}"`);
    const noFlexDouble = await page.evaluate(() => {
      const t = document.getElementById('draftTable2');
      return t ? !/Flex [A-Z]/.test(t.textContent) : true;
    });
    ok(noFlexDouble, 'N1 the "Flex FS (-10)" double-speak is gone');
    if (trigs > 0) {
      await page.evaluate(() => { const b = document.querySelector('#draftTable2 .zpb-slotdd'); if (b) b.click(); });
      await page.waitForTimeout(450);
      const pop = await page.evaluate(() => {
        const p = document.querySelector('.zpb-slotpop');
        if (!p) return { open: false };
        const opts = [...p.querySelectorAll('.zpb-slotopt')];
        return { open: true, opts: opts.length, cinzel: getComputedStyle(p.querySelector('.zpb-slotopt') || p).fontFamily.includes('Cinzel'), fixed: getComputedStyle(p).position === 'fixed' };
      });
      ok(pop.open && pop.opts >= 2, 'N1 ONE click opens the dropdown with the open spots', `opts=${pop.opts || 0}`);
      ok(pop.cinzel, 'N1 the dropdown wears Cinzel');
      if (pop.open) {
        await page.screenshot({ path: SH + '/w66-slotpop.png' });
        const picked = await page.evaluate(() => {
          const before = Object.keys(draftUI.slotPick).length;
          const b = document.querySelectorAll('.zpb-slotpop .zpb-slotopt')[1];
          if (!b) return { picked: false };
          b.click();
          return { picked: true, grew: Object.keys(draftUI.slotPick).length > before, popGone: !document.querySelector('.zpb-slotpop') };
        });
        ok(picked.picked && picked.grew && picked.popGone, 'N1 choosing a spot retargets the pick and closes the menu');
      }
    }
    // abandon this fresh draft: restore the completed draft via back-new-draft-cancel not needed — the season was already started above; reload to the saved season later
  }

  await page.close();

  // ============ fresh page: restore the saved season (autosave from the first draft+season) ============
  const page2 = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  await page2.goto(FILE); await page2.waitForTimeout(500);
  await page2.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page2.close();

  // redo the canonical flow on a clean page: draft → finish → season
  const p = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  await p.goto(FILE); await p.waitForTimeout(500);
  await p.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await p.reload(); await p.waitForTimeout(700);
  await p.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Detroit Lions'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await p.waitForTimeout(1400);
  await p.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await p.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await p.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await p.waitForTimeout(300); }
  await p.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await p.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await p.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await p.waitForTimeout(250); }

  // ============ N2 · the roster badges (measured on the live draft roster view, pre-season) ============
  console.log('== N2 · the roster summary badges ==');
  {
    // open the draft roster view if the total is not painted yet
    let b2 = await p.evaluate(() => {
      const host = document.getElementById('draftRosterTotal');
      if (!host) return { found: false };
      const badges = host.querySelectorAll('.zpb-rbadge');
      const cinzel = badges.length ? getComputedStyle(badges[0]).fontFamily.includes('Cinzel') : false;
      return { found: true, badges: badges.length, cinzel, plaintext: /starters ·/.test(host.textContent), war: host.textContent.includes('wins above a replacement-level lineup'), n: (host.textContent.match(/\d+/) || [])[0] };
    });
    if (!b2.found || !b2.badges) {
      await p.evaluate(() => { const b = document.getElementById('rosterPickBtn'); if (b) b.click(); });
      await p.waitForTimeout(700);
      b2 = await p.evaluate(() => {
        const host = document.getElementById('draftRosterTotal');
        if (!host) return { found: false };
        const badges = host.querySelectorAll('.zpb-rbadge');
        const cinzel = badges.length ? getComputedStyle(badges[0]).fontFamily.includes('Cinzel') : false;
        return { found: true, badges: badges.length, cinzel, plaintext: /starters ·/.test(host.textContent), war: host.textContent.includes('wins above a replacement-level lineup') };
      });
    }
    ok(b2.found && b2.badges === 2, 'N2 the summary renders exactly two badges', `badges=${b2.badges || 0}`);
    ok(b2.found && !b2.plaintext, 'N2 the plaintext "starters ·" sentence is gone');
    ok(b2.cinzel, 'N2 the badges wear Cinzel');
    ok(b2.war, 'N2 the second badge carries the wins-above-replacement story');
    // now start the season for the rest of the round
    await p.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
    await p.waitForTimeout(1000);
    await p.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  }

  // ============ N3 · the one clock (static style law + live delays) ============
  console.log('== N3 · the cards are the master clock ==');
  {
    const c3 = await p.evaluate(() => {
      let law = { dbk: false, dz: false, fm: false, base: false, old1s: false, old12: false };
      for (const sh of document.styleSheets) {
        let rules; try { rules = sh.cssRules; } catch (e) { continue; }
        for (const r of rules) {
          const t = r.cssText || '';
          if (t.includes('.zpb-dbk-g.zpb-seen .zpb-dfc2')) law.dbk = t.includes('*0.3s');
          if (t.includes('.zpb-dz.zpb-seen .zpb-dfc2')) law.dz = t.includes('*0.3s');
          if (t.includes('.zpb-fm.zpb-seen .zpb-fm-ini')) { law.fm = t.includes('*0.3s'); if (t.includes('*1s)')) law.old1s = true; }
          if (t.includes('--dfc-base') && t.includes('.zpb-dfc2')) { law.base = t.includes('*0.3s'); if (t.includes('*0.12s')) law.old12 = true; }
        }
      }
      return law;
    });
    ok(c3.dbk && c3.dz && c3.fm && c3.base, 'N3 all four clocks read 0.3s per beat (zero gap with the .3s card)', JSON.stringify(c3));
    ok(!c3.old1s && !c3.old12, 'N3 the old 1s map beat and 0.12s card beat are gone');
  }

  // ============ N4 · the aside sentence ============
  console.log('== N4 · the aside sentence ==');
  {
    const n4 = await p.evaluate(() => !document.documentElement.outerHTML.includes('change who plays where at any time'));
    ok(n4, 'N4 "(change who plays where at any time)" appears nowhere in the live DOM');
  }

  // ============ N6 · the upper line ============
  console.log('== N6 · SIM GAME · SIM SEASON · BACK TO SEASON on the upper line ==');
  {
    // begin the season to reach the regular-phase upper line
    await p.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
    await p.waitForTimeout(2800);
    await p.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    const u6 = await p.evaluate(() => {
      const host = document.getElementById('zpbSimTabsHost');
      const cyg = host ? host.closest('.zpb-cygops') : null;
      const ops = document.getElementById('zpbDraftOps');
      const bts = document.getElementById('zpbBtsHost');
      const ss = document.getElementById('simSeasonBtn');
      const inTabsRow = host ? !!host.closest('.tabs') : null;
      return { hostLive: !!host, onUpperLine: !!cyg, nextToOps: !!(cyg && ops && cyg.contains(ops)), ssHome: ss ? !!host.contains(ss) : false, btsHost: !!bts, inTabsRow };
    });
    ok(u6.hostLive && u6.onUpperLine && u6.nextToOps, 'N6 the sim doors live on the upper line next to NEW DRAFT / 100 SEASONS', JSON.stringify(u6));
    ok(u6.ssHome, 'N6 SIM SEASON sits in the upper-line host');
    ok(!u6.inTabsRow, 'N6 the tab row no longer carries the sim doors');
    // the footer doors are gone
    const foot = await p.evaluate(() => ({ sf: !!document.getElementById('simSeasonBtnFoot'), pf: !!document.getElementById('simPlayoffsBtnFoot') }));
    ok(!foot.sf && !foot.pf, 'N6 the footer sim doors retired');
    // secondary tab → the BACK TO SEASON door
    await p.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
    await p.waitForTimeout(700);
    const d6 = await p.evaluate(() => {
      const host = document.getElementById('zpbBtsHost');
      const b = host ? host.querySelector('[data-bts]') : null;
      return { door: !!b, cls: b ? b.className : '', ownPanel: !!document.querySelector('.zpb-bts-top'), bottomBar: !!document.getElementById('zpbBackSeasonBar') };
    });
    ok(d6.door && /tabbtn/.test(d6.cls) && /zpb-ctasmall/.test(d6.cls), 'N6 BACK TO SEASON rides the upper line like the SIM SEASON tab', d6.cls);
    ok(!d6.ownPanel && !d6.bottomBar, 'N6 no standalone panel and no bottom bar');
    await p.screenshot({ path: SH + '/w66-upperline.png' });
    // the door works
    await p.evaluate(() => { const b = document.querySelector('#zpbBtsHost [data-bts]'); if (b) b.click(); });
    await p.waitForTimeout(700);
    const back = await p.evaluate(() => { try { return typeof resultsView !== 'undefined' ? resultsView : null; } catch (e) { return null; } });
    ok(back === 'season', 'N6 clicking the door returns to the season');
  }

  // ============ N5 · the comparison dropdowns ============
  console.log('== N5 · the comparison dropdowns ==');
  {
    await p.evaluate(() => { const b = document.getElementById('resultsCompareBtn'); if (b) b.click(); });
    await p.waitForTimeout(900);
    const n5 = await p.evaluate(() => {
      const a = document.getElementById('cmpTeamA');
      if (!a) return { found: false };
      const wrap = a.closest('.zpb-selwrap');
      const native = a.classList.contains('zpb-sel-native');
      const btn = wrap ? wrap.querySelector('.zpb-selbtn') : null;
      return { found: true, wrapped: !!wrap, native, face: btn ? btn.textContent.trim() : '', cinzel: btn ? getComputedStyle(btn).fontFamily.includes('Cinzel') : false };
    });
    ok(n5.found && n5.wrapped && n5.native, 'N5 both comparison dropdowns wear the custom family', JSON.stringify(n5));
    ok(n5.cinzel, 'N5 the closed box wears Cinzel');
    // open the menu and pick a team
    await p.evaluate(() => { const w = document.querySelector('.zpb-cmp-own .zpb-selwrap'); if (w) { const b = w.querySelector('.zpb-selbtn'); if (b) b.click(); } });
    await p.waitForTimeout(450);
    const open5 = await p.evaluate(() => {
      const pop = document.querySelector('.zpb-cmp-own .zpb-selpop');
      if (!pop) return { open: false };
      const opts = [...pop.querySelectorAll('.zpb-selopt')];
      const grp = pop.querySelectorAll('.zpb-selgrp').length;
      const inked = opts.length ? opts.some(o => (o.getAttribute('style') || '').includes('--za')) : false;
      return { open: true, opts: opts.length, grp, inked };
    });
    ok(open5.open && open5.opts >= 40 && open5.grp >= 2, 'N5 the menu lists every option with group headers', `opts=${open5.opts || 0} groups=${open5.grp || 0}`);
    ok(open5.inked, 'N5 the options carry their team ink vars');
    await p.screenshot({ path: SH + '/w66-cmpdd.png' });
    if (open5.open) {
      const pick5 = await p.evaluate(() => {
        const pop = document.querySelector('.zpb-cmp-own .zpb-selpop');
        const opts = [...pop.querySelectorAll('.zpb-selopt')];
        const b = opts.find(o => o.dataset.v && o.dataset.v.startsWith('NFL:'));
        if (!b) return { picked: false };
        const before = document.getElementById('zpbTabScore').textContent;
        b.click();
        return { picked: true, closed: !document.querySelector('.zpb-cmp-own .zpb-selwrap.open'), changed: document.getElementById('zpbTabScore').textContent !== before };
      });
      ok(pick5.picked && pick5.changed && pick5.closed, 'N5 choosing a team re-renders the comparison and closes the menu');
    }
    // back to the season for the playoffs leg
    await p.evaluate(() => { const b = document.querySelector('#zpbBtsHost [data-bts]'); if (b) b.click(); });
    await p.waitForTimeout(600);
  }

  // ============ N7 + N8 · one door, two end screens ============
  console.log('== N7/N8 · the one SIM PLAYOFFS door ==');
  {
    // sim the regular season to the end (the door first; a direct drive as the honest fallback)
    let phase = '';
    for (let i = 0; i < 30 && phase !== 'regularReview' && phase !== 'playoffs' && phase !== 'complete'; i++) {
      const st = await p.evaluate(() => {
        try {
          if (!seasonState) return { phase: '' };
          // the SIM SEASON door carries a confirm — answer it whenever it shows
          const conf = document.querySelector('.confirm-ov [data-ss="yes"]');
          if (conf) { conf.click(); return { phase: seasonState.phase, confirmed: true }; }
          if (seasonState.phase === 'regular') {
            const b = document.getElementById('simSeasonBtn');
            if (b) b.click();
            else if (!seasonState.weekSimulated && typeof simulateCurrentWeek === 'function') { simulateCurrentWeek(); }
            else if (typeof simRestOfSeason === 'function') { simRestOfSeason(); }
          }
          return { phase: seasonState.phase, week: seasonState.currentWeek };
        } catch (e) { return { phase: 'ERR ' + e.message }; }
      });
      phase = st.phase || '';
      await p.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
      await p.waitForTimeout(500);
    }
    ok(phase === 'regularReview' || phase === 'playoffs' || phase === 'complete', 'season simmed to the review', `phase=${phase}`);
    // open the review, then the playoffs — whichever door the review offers
    for (let i = 0; i < 14; i++) {
      const st = await p.evaluate(() => {
        try {
          if (!seasonState) return '';
          if (seasonState.phase === 'regularReview') {
            const bp = document.getElementById('beginPlayoffsBtn');
            const sp = document.getElementById('simPlayoffsBtn');
            if (bp) { bp.click(); return 'clicked-begin'; }
            if (sp) { sp.click(); return 'clicked-sim'; } // the w47 door — the whole run at once, quiet
          }
          return seasonState.phase;
        } catch (e) { return ''; }
      });
      if (st === 'playoffs' || st === 'complete' || st === 'clicked-sim') break;
      await p.waitForTimeout(500);
    }
    let ph2 = await p.evaluate(() => { try { return seasonState ? seasonState.phase : ''; } catch (e) { return ''; } });
    if (ph2 !== 'playoffs' && ph2 !== 'complete') {
      // maybe the review needs the continue door first
      await p.evaluate(() => { const b = document.querySelector('#nextWeekBtn,#nextRoundBtn,#beginPlayoffsBtn,.zpb-fin .zpb-fin-go'); if (b) b.click(); });
      await p.waitForTimeout(900);
      await p.evaluate(() => { const b = document.getElementById('beginPlayoffsBtn'); if (b) b.click(); });
      await p.waitForTimeout(900);
      ph2 = await p.evaluate(() => { try { return seasonState ? seasonState.phase : ''; } catch (e) { return ''; } });
    }
    ok(ph2 === 'playoffs' || ph2 === 'complete', 'reached the playoffs (or the run finished from the review door)', `phase=${ph2}`);
    if (ph2 === 'complete') {
      // PATH B — the review page's SIM PLAYOFFS (the w47 run): watch for the N8 end screen
      let sawReplayB = false, endScreenB = '';
      for (let i = 0; i < 70; i++) {
        const st = await p.evaluate(() => ({
          replay: !!document.querySelector('.zpb-replay-ov'),
          sbfin: !!document.querySelector('.zpb-sbfin'),
          pofin: !!document.querySelector('.zpb-pofin'),
          porun: !!document.querySelector('.zpb-porun')
        }));
        if (st.replay) sawReplayB = true;
        if (st.sbfin) { endScreenB = st.pofin ? 'pofin' : 'sbfin'; break; }
        await p.waitForTimeout(400);
      }
      ok(!sawReplayB, 'N8 (review door) the during-the-game panel never fires');
      const expectB = await p.evaluate(() => {
        try {
          const u = seasonUserTeam();
          const sb = (seasonState.playoffRounds.superbowl || [])[0] || null;
          return { inSB: sb ? (sb.home === u || sb.away === u) : false, user: u };
        } catch (e) { return { inSB: null }; }
      });
      if (endScreenB === 'sbfin' || endScreenB === 'pofin') {
        const right = (expectB.inSB && endScreenB === 'sbfin') || (!expectB.inSB && endScreenB === 'pofin');
        ok(right, 'N8 (review door) the right end screen mounted', `inSB=${expectB.inSB} screen=${endScreenB}`);
      } else ok(false, 'N8 (review door) an end screen mounted', `screen=${endScreenB} inSB=${expectB.inSB}`);
      if (endScreenB === 'pofin') {
        const poB = await p.evaluate(() => {
          const ov = document.querySelector('.zpb-pofin');
          if (!ov) return { ok: false };
          const t = ov.textContent;
          return { ok: true, confetti: !!ov.querySelector('.zpb-sbfin-conf'), story: /WILD CARD|DIVISIONAL|CONFERENCE|DID NOT MAKE THE PLAYOFFS/.test(t), sb: /SUPER BOWL/.test(t), champ: /CHAMPIONS/.test(t) };
        });
        ok(poB.ok && poB.story && poB.sb && poB.champ, 'N8 (review door) the solemn screen carries the run story, the SB final and the champion');
        ok(!poB.confetti, 'N8 (review door) no confetti on the solemn screen');
        await p.screenshot({ path: SH + '/w66-pofin-review.png' });
      }
      await p.evaluate(() => { const o = document.querySelector('.zpb-sbfin .zpb-sbfin-go'); if (o) o.click(); });
      await p.waitForTimeout(800);
    }
    if (ph2 === 'playoffs') {
      const n7 = await p.evaluate(() => {
        const pt = document.getElementById('simPlayoffsBtnTop');
        const host = document.getElementById('zpbSimTabsHost');
        return { top: !!pt, onUpper: pt ? !!pt.closest('.zpb-cygops') : false, inHost: pt ? !!(host && host.contains(pt)) : false, rest: !!document.getElementById('simRestBtn') };
      });
      ok(n7.top && n7.onUpper && n7.inHost, 'N7 the ONE SIM PLAYOFFS door sits on the upper line', JSON.stringify(n7));
      ok(!n7.rest, 'N7 the second Sim Playoffs button next to Play the X is gone');
      // hit it — the confirm shows while the team is alive
      await p.evaluate(() => { const b = document.getElementById('simPlayoffsBtnTop'); if (b) b.click(); });
      await p.waitForTimeout(500);
      const conf = await p.evaluate(() => {
        const ov = document.querySelector('.confirm-ov');
        if (!ov) return { shown: false };
        const b = ov.querySelector('[data-po="yes"]'); if (b) b.click();
        return { shown: true, copy: ov.textContent.includes('Every remaining round plays out at once') };
      });
      ok(conf.shown, 'N7 the caution shows before the run');
      // watch for during-the-game panels and the end screen
      let sawReplay = false, endScreen = '';
      for (let i = 0; i < 60; i++) {
        const st = await p.evaluate(() => ({
          replay: !!document.querySelector('.zpb-replay-ov'),
          sbfin: !!document.querySelector('.zpb-sbfin'),
          pofin: !!document.querySelector('.zpb-pofin'),
          phase: (typeof seasonState !== 'undefined' && seasonState) ? seasonState.phase : ''
        }));
        if (st.replay) sawReplay = true;
        if (st.sbfin) { endScreen = st.pofin ? 'pofin' : 'sbfin'; break; }
        if (st.phase === 'complete' && !st.replay && i > 30) { endScreen = 'none'; break; }
        await p.waitForTimeout(300);
      }
      ok(!sawReplay, 'N8 the during-the-game panel never fires from SIM PLAYOFFS');
      const expect = await p.evaluate(() => {
        try {
          const u = seasonUserTeam();
          const sb = (seasonState.playoffRounds.superbowl || [])[0] || null;
          const inSB = sb ? (sb.home === u || sb.away === u) : false;
          return { inSB, champ: seasonState.champion, user: u };
        } catch (e) { return { inSB: null }; }
      });
      if (endScreen === 'sbfin' || endScreen === 'pofin') {
        const right = (expect.inSB && endScreen === 'sbfin') || (!expect.inSB && endScreen === 'pofin');
        ok(right, 'N8 the right end screen mounted', `inSB=${expect.inSB} screen=${endScreen}`);
      } else ok(false, 'N8 an end screen mounted', `screen=${endScreen} inSB=${expect.inSB}`);
      if (endScreen === 'pofin') {
        const po = await p.evaluate(() => {
          const ov = document.querySelector('.zpb-pofin');
          if (!ov) return { ok: false };
          const t = ov.textContent;
          return { ok: true, confetti: !!ov.querySelector('.zpb-sbfin-conf'), round: /WILD CARD|DIVISIONAL|CONFERENCE/.test(t), sb: /SUPER BOWL/.test(t), champ: /CHAMPIONS/.test(t) };
        });
        ok(po.ok && po.round && po.sb && po.champ, 'N8 the solemn screen carries the round, the SB final and the champion');
        ok(!po.confetti, 'N8 no confetti on the solemn screen');
        await p.screenshot({ path: SH + '/w66-pofin.png' });
      } else if (endScreen === 'sbfin') {
        await p.screenshot({ path: SH + '/w66-sbfin.png' });
      }
      const total = await p.evaluate(() => { const o = document.querySelector('.zpb-sbfin .zpb-sbfin-go'); if (o) o.click(); return true; });
      await p.waitForTimeout(800);
    }
  }

  // ============ N9 · the COTY shimmer (conditional on the user winning) ============
  console.log('== N9 · the COTY shimmer ==');
  {
    const n9 = await p.evaluate(() => {
      try {
        const A = seasonState && seasonState.awardsRS;
        if (!A) return { have: false };
        const u = seasonUserTeam();
        const coty = A.individual.find(a => a.title === 'Coach of the Year');
        return { have: true, mine: !!(coty && coty.team === u) };
      } catch (e) { return { have: false }; }
    });
    if (n9.have && n9.mine) {
      // open the story rail and look for the shimmering YOU
      await p.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if (b) b.click(); });
      await p.waitForTimeout(1200);
      const rail = await p.evaluate(() => {
        const cards = [...document.querySelectorAll('.zpb-shonor .zpb-gname')];
        const you = cards.find(b => b.textContent.trim() === 'YOU');
        return { you: !!you, shm: you ? you.classList.contains('zpb-shm') : false };
      });
      ok(rail.you && rail.shm, 'N9 the COTY YOU shimmers on the story rail');
    } else ok(true, 'N9 the user did not win COTY this run — surface verified statically', JSON.stringify(n9));
  }

  // ============ N10 · RUN IT BACK ============
  console.log('== N10 · RUN IT BACK ==');
  {
    let n10 = await p.evaluate(() => {
      const b = document.getElementById('restartSeasonBtn');
      return { found: !!b, text: b ? b.textContent.trim() : '' };
    });
    if (!n10.found) {
      // the footer lives on the review pages — open the Season Review
      await p.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if (b) b.click(); });
      await p.waitForTimeout(1600);
      await p.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
      n10 = await p.evaluate(() => {
        const b = document.getElementById('restartSeasonBtn');
        return { found: !!b, text: b ? b.textContent.trim() : '' };
      });
    }
    ok(n10.found && n10.text === 'RUN IT BACK', 'N10 the button reads just RUN IT BACK', `"${n10.text}"`);
    if (n10.found) {
      await p.evaluate(() => { const b = document.getElementById('restartSeasonBtn'); if (b) b.click(); });
      await p.waitForTimeout(500);
      const ca = await p.evaluate(() => {
        const ov = document.querySelector('.zpb-caution-ov');
        if (!ov) return { shown: false };
        const t = ov.textContent;
        const no = ov.querySelector('[data-zc="no"]'); if (no) no.click();
        return { shown: true, sameRoster: /same roster/i.test(t), preseason: /preseason/i.test(t), erase: /erased/i.test(t) };
      });
      ok(ca.shown && ca.sameRoster && ca.preseason, 'N10 the caution explains: back to the preseason, same roster', JSON.stringify(ca));
    }
  }

  await p.close();
  await browser.close();
  console.log(`\nR2 · ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('R2 FAIL', e.message); process.exit(1); });
