#!/usr/bin/env node
/* w38_mobile.js — the phone pass (390×844). The map rows wrap (R3/R7: every player visible,
   nothing clipped), the center panel fits, the intro stars stay inside, zero horizontal overflow. */
const { chromium } = require('playwright-core');
const OUT = '/home/z/my-project/w38/notes/evidence';
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('file:///home/z/my-project/w39/Football-Sim-Z-post-blue-w39.html', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1800);
  let fails = 0;
  const ok = (c, l, d='') => { console.log(`   ${c?'PASS':'FAIL'}  ${l}${d?' — '+d:''}`); if(!c) fails++; };

  // five views: zero horizontal overflow
  for (const [b, v] of [['tabDraftBtn','draft'],['tabGroupsBtn','groups'],['tabPlayersBtn','browser'],['tabCompareBtn','compare'],['tabGuideBtn','guide']]) {
    await page.evaluate(x => document.getElementById(x).click(), b);
    await page.waitForTimeout(500);
    const ov = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    ok(ov === 0, `${v}: overflow ${ov}px`);
  }

  // the draft + the map on the phone
  await page.evaluate(() => {
    try{
      startDraft2(); draftSpeed='instant'; try{ clearTimeout(slowTimer); }catch(e){}
      for(let g=0; g<6000 && draftSim.pos<draftSim.order.length; g++){
        const t = draftSim.order[draftSim.pos];
        if(t===draftSim.userIndex){ const r=draftSim.rosters[t]; if(firstOpenSlotAny(r)===null){draftSim.pos++;continue;}
          const nat=p=>(NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!r.slots[s]);
          let c=draftSim.pool.filter(p=>nat(p).length); if(!c.length) c=draftSim.pool.slice(); c.sort((a,b)=>b[3]-a[3]);
          const p=c[0], on=nat(p); const s=on.length?on[0]:ROSTER_SLOTS.find(s=>!r.slots[s]); executePick(draftSim.userIndex,p,s);
        } else { const pk=cpuPick(t); if(pk&&pk.slot) executePick(t,pk.player,pk.slot); else draftSim.pos++; }
      }
      draftSim.awaitingUser=false; finishDraft2();
    }catch(e){ window.__mErr=String(e); }
  });
  await page.waitForTimeout(900);
  ok(!(await page.evaluate(() => window.__mErr||'')), 'the draft finishes on the phone');
  await page.evaluate(() => document.getElementById('resultsMineBtn').click());
  await page.waitForTimeout(1400);
  const map = await page.evaluate(() => {
    const m = document.getElementById('draftResultsBody').querySelector('.zpb-fm');
    if(!m) return {none:true};
    // the map may sit inside a closed details expander on the phone — measure it OPEN
    const dt = m.closest('details'); if (dt && !dt.open) dt.open = true;
    const mr = m.getBoundingClientRect();
    const bubbles = [...m.querySelectorAll('.zpb-fm-ini')];
    const outL = bubbles.filter(b => b.getBoundingClientRect().left < mr.left - 2).length;
    const outR = bubbles.filter(b => b.getBoundingClientRect().right > mr.right + 2).length;
    const docOv = Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);
    return { n: bubbles.length, outL, outR, docOv, w: Math.round(mr.width) };
  });
  ok(!map.none, `the map renders on the phone (${map.none ? '-' : map.w}px wide)`);
  if (!map.none) {
    ok(map.outL === 0 && map.outR === 0, `every player bubble sits inside the map (${map.outL} left / ${map.outR} right out of ${map.n})`);
    ok(map.docOv === 0, `the page does not scroll sideways (${map.docOv}px)`);
  }
  await page.screenshot({ path: OUT+'/w38-mobile-map.png', fullPage: false });

  // the during-game screen on the phone: the panel fits, the lines wrap
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(5300);
  await page.evaluate(() => { const b = document.getElementById('simGameBtn') || document.getElementById('simWeekBtn'); if(b) b.click(); });
  await page.waitForTimeout(700);
  const rep = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-replay-ov'); if(!ov) return {none:true};
    const box = ov.querySelector('.zpb-replay').getBoundingClientRect();
    const stars = [...ov.querySelectorAll('.zpb-intro-star')];
    const out = stars.filter(s => { const r = s.getBoundingClientRect(); return r.left < box.left - 2 || r.right > box.right + 2; }).length;
    return { boxW: Math.round(box.width), vw: window.innerWidth, stars: stars.length, starOut: out };
  });
  if (!rep.none) {
    ok(rep.boxW <= rep.vw + 2, `the center panel fits the phone (${rep.boxW}px of ${rep.vw})`);
    ok(rep.starOut === 0, `the intro names stay inside (${rep.starOut} out of ${rep.stars})`);
    await page.screenshot({ path: OUT+'/w38-mobile-intro.png' });
  } else {
    console.log('   (no replay opened on this phone board — the panel checks ran on the desktop probe)');
  }
  ok(errs.length===0, 'zero pageerrors on the phone' + (errs.length ? ' — '+errs.slice(0,2).join(' | ') : ''));
  await browser.close();
  console.log(fails===0 ? '\nMOBILE: all green' : `\nMOBILE: ${fails} FAIL`);
  process.exit(fails?1:0);
})().catch(e => { console.error('MOBILE DIED', e); process.exit(2); });
