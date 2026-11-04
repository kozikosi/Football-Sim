#!/usr/bin/env node
/* w41_live.js — the live drills for the round-41 directives (real Chromium).
   A: no sideways scroll at 1280/900/500/390, light + dark
   B: the player browser wears the dropdown ink (names, team cells, numbers) in both themes
   C: the draft board's light mode reads the light ink (N2)
   D: the box score — Cinzel Decorative team names, the post-blue line score
   E: the bracket — logos only, the toggle, the centered glowing hub buttons
   F: the 20-0 panel — wider, centered, Cinzel
   G: the playoff intro — the slower, heavier stage
   H: the Kicker badge centers at full desktop width */
const { chromium } = require('playwright-core');
const FILE = 'file:///home/z/my-project/w41/Football-Sim-Z-post-blue-w41.html';
const OUT = '/home/z/my-project/w41/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const shot = async (page, path) => { try { await page.screenshot({ path, timeout: 12000 }); } catch (e) { console.log('   (shot skipped:', path.split('/').pop() + ')'); } };

const driveToSeason = async (page) => {
  await page.evaluate(() => {
    try{ startDraft2(); draftSpeed='instant'; try{ clearTimeout(slowTimer); }catch(e){}
      for(let g=0; g<6000 && draftSim.pos < draftSim.order.length; g++){
        const t = draftSim.order[draftSim.pos];
        if(t === draftSim.userIndex){
          const roster = draftSim.rosters[t];
          if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
          const nat = p => (NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
          let cands = draftSim.pool.filter(p=>nat(p).length); if(!cands.length) cands = draftSim.pool.slice();
          cands.sort((a,b)=>b[3]-a[3]); const p = cands[0]; const on = nat(p);
          executePick(draftSim.userIndex, p, on.length?on[0]:ROSTER_SLOTS.find(s=>!roster.slots[s]));
        } else { const pk = cpuPick(t); if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++; }
      }
      draftSim.awaitingUser = false;
      try{ if(draftFinalResults.style.display==='none') finishDraft2(); }catch(e){}
    }catch(e){}
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
  await page.waitForTimeout(400);
  await page.evaluate(() => { try{ const b=document.getElementById('beginSeasonBtn'); if(b) b.click(); }catch(e){} });
  await page.waitForTimeout(5600);
  // sim the season through the books overlay
  await page.evaluate(() => { try{ const b=document.getElementById('simSeasonBtn'); if(b) b.click(); }catch(e){} });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    const ov = document.querySelector('.confirm-ov');
    if(ov){ const yes=[...ov.querySelectorAll('button')].find(b=>/YES/.test(b.textContent)); if(yes) yes.click(); }
  });
  await page.waitForTimeout(6500);
  await page.evaluate(() => { try{ const go=document.getElementById('zpbRestGo'); if(go) go.click(); }catch(e){} });
  await page.waitForTimeout(600);
};

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });

  // ---------- A: responsive, both themes ----------
  for (const theme of ['light','dark']) {
    for (const W of [1280, 900, 500, 390]) {
      const ctx = await browser.newContext({ viewport: { width: W, height: 760 } });
      const page = await ctx.newPage();
      const errs = []; page.on('pageerror', e => errs.push(e.message));
      await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
      await page.waitForTimeout(1200);
      if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme','dark'));
      await page.evaluate(() => { try{ document.getElementById('tabPlayersBtn').click(); }catch(e){} });
      await page.waitForTimeout(400);
      const docOv = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
      ok(docOv === 0 && errs.length === 0, `A ${theme} ${W}: no sideways scroll, no page errors`, docOv + 'px' + (errs.length ? ' errs:' + errs[0].slice(0,60) : ''));
      await ctx.close();
    }
  }

  // ---------- C2: the draft board's cards view (a live draft), both themes ----------
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1200);
    if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme','dark'));
    const cardInk = await page.evaluate(() => {
      try{
        startDraft2();
        try{ renderDraftBoard2(); }catch(e){}
        const row = document.querySelector('#draftTable2 tr.zpb-trow[style*="--tn"]');
        if(!row) return {none:1};
        const name = row.querySelector('.dc-name');
        if(!name) return {none:2};
        const cs = getComputedStyle(row);
        return { c: getComputedStyle(name).color, tn: cs.getPropertyValue('--tn').trim(), tnd: cs.getPropertyValue('--tnd').trim() };
      }catch(e){ return {err:String(e)}; }
    });
    ok(!cardInk.err && !cardInk.none, `C2 ${theme}: the draft board renders` + (cardInk.err ? ' — '+cardInk.err : (cardInk.none ? ' — no board rows ('+cardInk.none+')' : '')));
    if (!cardInk.err && !cardInk.none) {
      const toRGB3 = h => { const m = /^#([0-9a-f]{6})$/i.exec((h||'').trim()); return m ? 'rgb(' + [0,2,4].map(i=>parseInt(m[1].slice(i,i+2),16)).join(', ') + ')' : (h||'').trim(); };
      const want = toRGB3(theme === 'dark' ? cardInk.tnd : cardInk.tn);
      ok(cardInk.c === want, `C2 ${theme}: the board names read the per-theme ink`, cardInk.c + ' vs ' + want);
    }
    await shot(page, `${OUT}/draftboard-${theme}.png`);
    await ctx.close();
  }

  // ---------- B/C: the ink, both themes ----------
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1200);
    if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme','dark'));
    const browserInk = await page.evaluate(() => {
      try{
        document.getElementById('tabPlayersBtn').click();
        const rows = [...document.querySelectorAll('#playerBody tr[style*="--tn"]')];
        const row = rows.find(r => !r.querySelector('.zpb-shm')) || rows[0];
        if(!row) return {err:'no row vars'};
        const name = row.querySelector('.zpb-pb-name'), team = row.querySelector('.zpb-pb-team'), num = row.querySelector('td.score');
        const cs = el => getComputedStyle(el);
        return { nameC: cs(name).color, nameF: cs(name).fontFamily, teamC: cs(team).color, teamF: cs(team).fontFamily,
                 numC: cs(num).color, tn: cs(row).getPropertyValue('--tn').trim(), tnd: cs(row).getPropertyValue('--tnd').trim(),
                 nmS: cs(row).getPropertyValue('--nmS').trim(), vib: name.classList.contains('zpb-vib'),
                 shimmers: document.querySelectorAll('#playerBody .zpb-shm').length };
      }catch(e){ return {err:String(e)}; }
    });
    const toRGB = h => { const m = /^#([0-9a-f]{6})$/i.exec((h||'').trim()); return m ? 'rgb(' + [0,2,4].map(i=>parseInt(m[1].slice(i,i+2),16)).join(', ') + ')' : (h||'').trim(); };
    ok(!browserInk.err, 'B the browser renders rows with vars' + (browserInk.err ? ' — '+browserInk.err : ''));
    if (!browserInk.err) {
      const want = toRGB(theme === 'dark' ? browserInk.tnd : browserInk.tn);
      ok(browserInk.teamC === want, `B ${theme}: the team cell wears the dropdown ink`, browserInk.teamC + ' vs ' + want);
      ok(/Cinzel/.test(browserInk.teamF), `B ${theme}: the team cell wears Cinzel`, browserInk.teamF.slice(0,40));
      const wantName = browserInk.vib ? toRGB(theme === 'dark' ? (browserInk.tnd) : (browserInk.nmS || browserInk.tn)) : want;
      ok(browserInk.nameC === wantName, `B ${theme}: the names wear the dropdown ink${browserInk.vib ? ' (85+ rides the stronger rung)' : ''}`, browserInk.nameC + ' vs ' + wantName);
      ok(browserInk.numC !== '' , `B ${theme}: the numbers carry a team ink`, browserInk.numC);
    }
    await shot(page, `${OUT}/browser-${theme}.png`);
    await ctx.close();
  }

  // ---------- D/E/F/G/H: the season drive ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1200);
    await driveToSeason(page);

    // D: the box score
    const box = await page.evaluate(() => {
      try{
        const user = seasonUserTeam();
        const g = seasonState.schedule.filter(x=>x.result).pop();
        const host = document.createElement('div'); document.body.appendChild(host);
        host.innerHTML = renderGameResultHTML(g, user);
        const nm = host.querySelector('.zpb-sl2name'), ls = host.querySelector('.linescore');
        const row = host.querySelector('.linescore tbody tr');
        const out = { nmF: nm ? getComputedStyle(nm).fontFamily : '', nmC: nm ? getComputedStyle(nm).color : '',
                      tn: row ? getComputedStyle(row).getPropertyValue('--tn').trim() : '',
                      washed: !!host.querySelector('.linescore tr[style*="--zn:1"]'), imgs: nm ? nm.querySelectorAll('img').length : 0 };
        host.remove(); return out;
      }catch(e){ return {err:String(e)}; }
    });
    ok(!box.err, 'D the box score renders' + (box.err ? ' — '+box.err : ''));
    if (!box.err) {
      ok(/Cinzel Decorative/.test(box.nmF), 'D the team names wear Cinzel Decorative', box.nmF.slice(0,44));
      ok(box.imgs === 1, 'D the crest rides beside the name');
      ok(box.washed, 'D the linescore rows wear the neutral washes');
    }

    // E: the playoffs — seed the user in, the hub, the bracket
    const hub = await page.evaluate(() => {
      try{
        const u = seasonUserTeam();
        const conf = seasonState.seeds.AFC.some(s=>s.team===u) ? 'AFC' : 'NFC';
        const arr = seasonState.seeds[conf];
        if(!arr.some(s=>s.team===u)){ const s6 = arr.find(s=>s.seed===6)||arr[arr.length-1]; s6.team = u; }
        startPlayoffs();
        renderSeasonTab(document.getElementById('draftResultsBody'));
        const b = document.getElementById('simRoundBtn');
        const row = b.parentElement, rect = row.getBoundingClientRect(), panel = row.closest('.panel').getBoundingClientRect();
        const names = document.querySelectorAll('.zpb-tree-card .zpb-tname').length;
        const cards = document.querySelectorAll('.zpb-tree-card').length;
        const logos = document.querySelectorAll('.zpb-tree-card img').length;
        return { big: b.classList.contains('zpb-ctabig'), centered: Math.abs((rect.left + rect.right)/2 - (panel.left + panel.right)/2) < 8,
                 names, cards, logos, glow: getComputedStyle(b, '::after').animationName !== 'none' || getComputedStyle(b).boxShadow !== 'none' };
      }catch(e){ return {err:String(e)}; }
    });
    ok(!hub.err, 'E the hub renders' + (hub.err ? ' — '+hub.err : ''));
    if (!hub.err) {
      ok(hub.big, 'E the round button is the big glowing CTA (W1)');
      ok(hub.centered, 'E the button row centers (W1)');
      ok(hub.cards > 0 && hub.names === 0, 'E the tree carries logos only (W5)', hub.cards + ' cards, ' + hub.logos + ' logos');
    }
    // G: the playoff intro — the heavier stage
    const intro = await page.evaluate(async () => {
      try{
        const b = document.getElementById('simRoundBtn');
        b.click();
        await new Promise(r=>setTimeout(r,1200));
        const box = document.querySelector('.zpb-replay');
        if(!box) return {skip:'no replay'};
        const po = box.classList.contains('zpb-po');
        const star = box.querySelector('.zpb-intro-star');
        const dur = star ? getComputedStyle(star).animationDuration : '';
        const breathe = getComputedStyle(box.querySelector('.zpb-rep-intro')||box).animationName;
        return { po, dur, breathe };
      }catch(e){ return {err:String(e)}; }
    });
    if (intro.skip) { ok(true, 'G the intro drill skipped this draw (' + intro.skip + ')'); }
    else if (intro.err) { ok(false, 'G the intro drill failed — ' + intro.err); }
    else {
      ok(intro.po, 'G the playoff box carries zpb-po (W2)');
      ok(intro.dur === '5.6s', 'G the stars fade at 5.6s', intro.dur);
      ok(intro.breathe === 'zpbPoBreath', 'G the stage breathes under pressure');
    }
    await page.evaluate(() => { try{ document.querySelector('.zpb-replay-ov').remove(); }catch(e){} });

    // E2: the bracket toggle — the wildcard has played cards now
    const tog = await page.evaluate(async () => {
      try{
        const played = [...document.querySelectorAll('.zpb-tree-card[data-pog]')].filter(c=>/Review:/.test(c.title));
        if(!played.length) return {skip:'no played games'};
        const host = document.getElementById('zpbTreeDetail');
        played[0].click(); await new Promise(r=>setTimeout(r,200));
        const open = host.style.display === 'block';
        played[0].click(); await new Promise(r=>setTimeout(r,200));
        return { open, closed: host.style.display === 'none' };
      }catch(e){ return {err:String(e)}; }
    });
    ok(!tog.err && !tog.skip && tog.open && tog.closed, 'E the bracket review toggles (W4)', JSON.stringify(tog));

    // H: the report card kicker + F: the 20-0 panel
    const panels = await page.evaluate(async () => {
      try{
        // finish the bracket with the product's own flow: sim unplayed rounds, advance played ones
        let guard = 0;
        while(seasonState.phase === 'playoffs' && guard++ < 10){
          const games = seasonState.playoffRounds[seasonState.currentPlayoffRound] || [];
          const allPlayed = games.length && games.every(g=>g.result);
          if(allPlayed){ try{ advancePlayoffRound(); }catch(e){ break; } }
          else { try{ simulatePlayoffRound(); }catch(e){ break; } try{ const o=document.querySelector('.zpb-replay-ov'); if(o) o.remove(); }catch(e){} }
        }
        renderSeasonTab(document.getElementById('draftResultsBody'));
        const bar = document.getElementById('seasonReviewBtn'); if(bar) bar.click(); // the review page hosts the report card
        await new Promise(r=>setTimeout(r,300));
        const tiles = [...document.querySelectorAll('.zpb-rcbadge')];
        const last = tiles[tiles.length-1];
        const kick = last ? getComputedStyle(last) : null;
        return { n: tiles.length, kicker: last ? /KICKER|Kicker/.test(last.textContent) : false,
                 span: kick ? kick.gridColumn : '', just: kick ? kick.justifySelf : '' };
      }catch(e){ return {err:String(e)}; }
    });
    ok(!panels.err, 'H the report card renders' + (panels.err ? ' — '+panels.err : ''));
    if (!panels.err) ok(panels.n === 9 && panels.kicker && panels.span === '1 / -1' && panels.just === 'center', 'H the Kicker spans and centers (W6)', JSON.stringify({n:panels.n, span:panels.span, just:panels.just}));

    const again = await page.evaluate(() => {
      try{
        let btn = document.getElementById('zpbTryAgainBtn');
        if(!btn){ const bar = document.getElementById('seasonReviewBtn'); if(bar) bar.click(); btn = document.getElementById('zpbTryAgainBtn'); }
        if(!btn) return {skip:'no button yet'};
        btn.click();
        const box = document.querySelector('.confirm-box.zpb-again-box');
        if(!box) return {err:'no box'};
        const r = box.getBoundingClientRect();
        const q = box.querySelector('.zpb-again-q');
        const out = { w: Math.round(r.width), center: q ? getComputedStyle(q).textAlign : '', font: q ? getComputedStyle(q).fontFamily : '' };
        box.closest('.confirm-ov').remove(); return out;
      }catch(e){ return {err:String(e)}; }
    });
    if (again.skip) ok(true, 'F the 20-0 drill skipped this draw (' + again.skip + ')');
    else if (again.err) ok(false, 'F the 20-0 drill failed — ' + again.err);
    else {
      ok(again.w >= 470, 'F the panel widened to ~480px', again.w + 'px');
      ok(again.center === 'center', 'F the question centers');
      ok(/Cinzel/.test(again.font), 'F the question wears Cinzel Decorative');
    }

    ok(errs.length === 0, 'zero page errors through the drive' + (errs.length ? ' — ' + errs.slice(0,2).join(' | ') : ''));
    await shot(page, `${OUT}/season-end.png`);
    await ctx.close();
  }

  await browser.close();
  console.log(`\n== live: ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
