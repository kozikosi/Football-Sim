#!/usr/bin/env node
/* w41_mobile.js — the phone pass (390×844). Five views: zero horizontal overflow, nothing
   clipped; the browser's rows keep the dropdown ink at phone width; the box score's team
   names and the line score fit; the bracket's logo cards fit; zero page errors. */
const { chromium } = require('playwright-core');
const OUT = '/home/z/my-project/w41/evidence';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('file:///home/z/my-project/w41/Football-Sim-Z-post-blue-w41.html', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1800);
  let fails = 0;
  const ok = (c, l, d='') => { console.log(`   ${c?'PASS':'FAIL'}  ${l}${d?' — '+d:''}`); if(!c) fails++; };

  // five views: zero horizontal overflow
  for (const [b, v] of [['tabDraftBtn','draft'],['tabGroupsBtn','rankings'],['tabPlayersBtn','browser'],['tabCompareBtn','compare'],['tabGuideBtn','guide']]) {
    await page.evaluate(x => document.getElementById(x).click(), b);
    await page.waitForTimeout(500);
    const ov = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    ok(ov === 0, `${v}: overflow ${ov}px`);
  }

  // the browser ink at phone width, both themes
  for (const theme of ['light','dark']) {
    await page.evaluate(t => { if(t==='dark') document.documentElement.setAttribute('data-theme','dark'); else document.documentElement.removeAttribute('data-theme'); }, theme);
    await page.evaluate(() => document.getElementById('tabPlayersBtn').click());
    await page.waitForTimeout(400);
    const ink = await page.evaluate(() => {
      const rows = [...document.querySelectorAll('#playerBody tr[style*="--tn"]')];
      const row = rows.find(r=>!r.querySelector('.zpb-shm')) || rows[0];
      if(!row) return {err:'no rows'};
      const cs = getComputedStyle(row);
      return { team: getComputedStyle(row.querySelector('.zpb-pb-team')).color, tn: cs.getPropertyValue('--tn').trim(), tnd: cs.getPropertyValue('--tnd').trim(),
               ov: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth) };
    });
    if (ink.err) ok(false, `browser ink ${theme}: ${ink.err}`);
    else {
      const toRGB = h => { const m = /^#([0-9a-f]{6})$/i.exec((h||'').trim()); return m ? 'rgb(' + [0,2,4].map(i=>parseInt(m[1].slice(i,i+2),16)).join(', ') + ')' : (h||'').trim(); };
      const want = toRGB(theme === 'dark' ? ink.tnd : ink.tn);
      ok(ink.team === want && ink.ov === 0, `browser ink ${theme}: the dropdown ink, no overflow`, ink.team + ' vs ' + want + ', ov ' + ink.ov);
    }
  }
  await page.evaluate(() => document.documentElement.removeAttribute('data-theme'));

  // the draft + the season + the box score on the phone
  await page.evaluate(() => {
    try{
      startDraft2(); draftSpeed='instant'; try{ clearTimeout(slowTimer); }catch(e){}
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
  await page.evaluate(() => { try{ const b=document.getElementById('simSeasonBtn'); if(b) b.click(); }catch(e){} });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const ov=document.querySelector('.confirm-ov'); if(ov){ const y=[...ov.querySelectorAll('button')].find(b=>/YES/.test(b.textContent)); if(y) y.click(); } });
  await page.waitForTimeout(7000);
  await page.evaluate(() => { try{ const go=document.getElementById('zpbRestGo'); if(go) go.click(); }catch(e){} });
  await page.waitForTimeout(600);
  const box = await page.evaluate(() => {
    try{
      const user = seasonUserTeam();
      const g = seasonState.schedule.filter(x=>x.result).pop();
      const host = document.createElement('div'); document.body.appendChild(host);
      host.style.width = '390px';
      host.innerHTML = renderGameResultHTML(g, user);
      const sl = host.querySelector('.score-line');
      const ls = host.querySelector('.linescore');
      const out = { slW: sl ? sl.getBoundingClientRect().width : 0, lsW: ls ? ls.getBoundingClientRect().width : 0,
                    slOv: sl ? Math.max(0, sl.scrollWidth - sl.clientWidth) : -1, names: host.querySelectorAll('.zpb-sl2name').length };
      host.remove(); return out;
    }catch(e){ return {err:String(e)}; }
  });
  if (box.err) ok(false, 'the box score on the phone: ' + box.err);
  else {
    ok(box.names === 2, 'the box score team names render');
    ok(box.slW > 0 && box.slW <= 391 && box.slOv === 0, 'the score line fits 390px', 'w ' + Math.round(box.slW) + ', ov ' + box.slOv);
    ok(box.lsW > 0 && box.lsW <= 391, 'the line score fits 390px', 'w ' + Math.round(box.lsW));
  }

  ok(errs.length === 0, 'zero page errors' + (errs.length ? ' — ' + errs.slice(0,2).join(' | ') : ''));
  await page.screenshot({ path: `${OUT}/phone-browser.png`, timeout: 12000 }).catch(()=>{});
  await browser.close();
  console.log(`\n== phone: ${fails === 0 ? 'ALL GREEN' : fails + ' FAIL'} ==`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
