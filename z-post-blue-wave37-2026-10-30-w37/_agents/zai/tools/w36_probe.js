#!/usr/bin/env node
/* w36_probe.js — live-in-Chromium measurement for the round-36 surfaces. Exits non-zero on failure.
   R1 : WHERE YOUR PLAYERS LINE UP? — the map box touches the greater panel's inner content edges,
        on the draft review AND the YOUR ROSTER tab (both states).
   R2 : the top card set is gone; the cards under the map float in pick order (zpbCardIn, --beat).
   R3 : the review's SEASON tab lands the preseason page.
   R4 : a pick menu, opened for real, carries POS · OVR rows; the closed face stays name-only.
   R5 : BEGIN THE SEASON → the SEASON OPENER cinematic → week 1 stands after the veil. */
const { chromium } = require('playwright-core');
const OUT = '/home/z/my-project/w36/evidence';
const FILE = 'file:///home/z/my-project/w36/Football-Sim-Z-post-blue-w36.html';
let fails = 0;
const ok = (cond, label, detail='') => { console.log(`   ${cond?'PASS':'FAIL'}  ${label}${detail?' — '+detail:''}`); if(!cond) fails++; };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(2500);

  // drive the draft to the review with the scripted natural-pick loop (the stress driver)
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
    }catch(e){ window.__probeErr=String(e); }
  });
  await page.waitForTimeout(800);
  ok(!(await page.evaluate(() => window.__probeErr||'')), 'the scripted draft finishes');

  // ---- R2 + R1 · the review detail ----
  console.log('== R1/R2 · the review detail: the field at the edges, the cards floating under it ==');
  const d = await page.evaluate(() => {
    const wrap = [...document.querySelectorAll('[id^="detailwrap-"]')].find(w=>w.innerHTML.length>0);
    if(!wrap) return {none:true};
    const map = wrap.querySelector('.zpb-fm');
    // the map's own container is the detail cell (padding 14px 16px, shared by every sibling);
    // "the greater panel's horizontal edges" = the full content width of that cell
    const wr = wrap.getBoundingClientRect(), mr = map.getBoundingClientRect();
    const wcs = getComputedStyle(wrap);
    const sib = [...wrap.querySelectorAll('table')][0];
    const sibW = sib ? Math.round(sib.getBoundingClientRect().width) : null;
    const cards = [...wrap.querySelectorAll('.zpb-dbk.zpb-dfc2[data-slot]')];
    const firstCards = cards.slice(0,3).map(c=>{ const cs=getComputedStyle(c); return {delay:cs.animationDelay, name:cs.animationName, beat:c.getAttribute('data-beat')}; });
    const beats = cards.map(c=>parseInt(c.getAttribute('data-beat')||'0',10));
    const mapTop = map.getBoundingClientRect().top;
    const h4 = wrap.querySelector('h4');
    const firstContentIsMapHeading = h4 && /WHERE YOUR PLAYERS LINE UP\?/.test(h4.textContent) && (h4.getBoundingClientRect().top <= mapTop);
    return {
      gapL: Math.round(mr.left - (wr.left + parseFloat(wcs.paddingLeft))),
      gapR: Math.round((wr.right - parseFloat(wcs.paddingRight)) - mr.right),
      wide: map.classList.contains('zpb-fm-wide'),
      n: cards.length, uniq: new Set(beats).size===beats.length, firstCards,
      noTopSet: !wrap.textContent.includes('IN THE ORDER YOU DRAFTED THEM'),
      firstContentIsMapHeading,
      mapWidth: Math.round(mr.width), sibW
    };
  });
  ok(!d.none, 'the user detail is open');
  if(!d.none){
    ok(d.wide, 'the map wears zpb-fm-wide');
    ok(Math.abs(d.gapL)<=2 && Math.abs(d.gapR)<=2, `the map touches its container's inner content edges (gapL ${d.gapL}px, gapR ${d.gapR}px)`);
    ok(d.mapWidth >= 900, `the map spans the detail's full content width (${d.mapWidth}px at the 1280 viewport — the old cap was 560)`);
    ok(d.firstContentIsMapHeading, 'the detail LEADS with WHERE YOUR PLAYERS LINE UP?');
    ok(d.noTopSet, 'the top card set is gone');
    ok(d.n>=20, `the cards under the map carry the float-in class (${d.n})`);
    ok(d.uniq, 'the beats are unique — one by one in pick order');
    ok(d.firstCards.length===3 && d.firstCards.every(c=>c.name==='zpbCardIn' && parseFloat(c.delay)>0 && Math.abs(parseFloat(c.delay)-c.beat)<0.01),
       `the float-in instructions match the top cards' law (delay = beat × 1s) — ${d.firstCards.map(c=>c.beat+'→'+c.delay+'s').join(', ')}`);
    await page.screenshot({ path: OUT+'/w36-review-map-wide.png', fullPage: false });
  }

  // ---- R3 · the SEASON tab ----
  console.log('== R3 · the SEASON tab lands the preseason page ==');
  await page.evaluate(() => document.getElementById('resultsSeasonBtn').click());
  await page.waitForTimeout(600);
  const r3 = await page.evaluate(() => {
    const body = document.getElementById('draftResultsBody');
    return { hasSeason: !!seasonState, noRepeat: !body.textContent.includes('How your draft ranks'),
             beginLive: !!document.getElementById('beginSeasonBtn'), setup: /Set up the /.test(body.textContent) };
  });
  ok(r3.hasSeason, 'the season is scaffolded by the click');
  ok(r3.noRepeat, 'the draft review does NOT repeat');
  ok(r3.beginLive && r3.setup, 'the preseason page stands (Begin the season on the page)');
  await page.screenshot({ path: OUT+'/w36-season-tab-preseason.png' });

  // ---- R4 · the pick menu, opened for real ----
  console.log('== R4 · the open menu carries the preferred position; the closed face stays name-only ==');
  const r4 = await page.evaluate(() => {
    const btn = [...document.querySelectorAll('#lineupPre .zpb-pickbtn')].find(b=>b.closest('.depth-row') && !b.closest('[data-zpbret="1"]'));
    if(!btn) return {none:true};
    const face = btn.querySelector('.zpb-pickname').textContent.trim();
    btn.click();
    const menu = btn.closest('.zpb-pickwrap').querySelector('.zpb-pickmenu');
    const open = menu.classList.contains('zpb-open');
    const rows = [...menu.querySelectorAll('.zpb-pickrow')].slice(0,8).map(r=>({
      num: r.querySelector('.zpb-picknum').textContent.trim(),
      name: r.querySelector('b').textContent.trim() }));
    return {face, open, rows};
  });
  ok(!r4.none, 'a slot pick box renders');
  if(!r4.none){
    const POSRE = /^(QB|HB|FB|WR|TE|LT|RT|LG|RG|C|DT|LEDG|REDG|MIKE|WILL|SAM|CB|SS|FS|K|P|LS)$/;
    ok(r4.open, 'the menu opens on click');
    ok(!POSRE.test(r4.face), `the closed face is name-only ("${r4.face}")`);
    ok(r4.rows.length>=1 && r4.rows.every(x=>POSRE.test(x.num.split('·')[0].trim()) && /·\s*\d+/.test(x.num)),
       `the open rows read POS · OVR — sample: ${r4.rows.slice(0,3).map(x=>x.name+' → '+x.num).join(' | ')}`);
    await page.screenshot({ path: OUT+'/w36-pickmenu-open.png' });
    await page.evaluate(() => document.body.click());
  }

  // ---- R5 · BEGIN THE SEASON ----
  console.log('== R5 · BEGIN THE SEASON: the cinematic, then week 1 ==');
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(500);
  const veilUp = await page.evaluate(() => document.querySelectorAll('.zpb-prematch').length);
  const wk1Now = await page.evaluate(() => /Week 1 of 17/.test((document.getElementById('draftResultsBody')||{textContent:''}).textContent||''));
  ok(veilUp>=1, `the SEASON OPENER cinematic plays (veil ${veilUp})`);
  ok(wk1Now, 'week 1 renders behind the veil');
  await page.screenshot({ path: OUT+'/w36-opener-cinematic.png' });
  await page.waitForTimeout(5200);
  const r5 = await page.evaluate(() => ({ veil: document.querySelectorAll('.zpb-prematch').length,
    wk1: /Week 1 of 17/.test((document.getElementById('draftResultsBody')||{textContent:''}).textContent||''),
    sim: !!document.getElementById('simWeekBtn'), pre: seasonState.preseason }));
  ok(r5.veil===0, 'the veil clears');
  ok(r5.wk1 && r5.sim && !r5.pre, 'week 1 stands after the cinematic — the page advanced');
  await page.screenshot({ path: OUT+'/w36-week1-after-begin.png' });

  // ---- R1 · the YOUR ROSTER tab (in-season state) ----
  console.log('== R1 · the YOUR ROSTER tab carries the field ==');
  await page.evaluate(() => document.getElementById('resultsMineBtn').click());
  await page.waitForTimeout(600);
  const r1t = await page.evaluate(() => {
    const body = document.getElementById('draftResultsBody');
    const map = body.querySelector('.zpb-fm');
    const panel = map.closest('.panel');
    const pr = panel.getBoundingClientRect(), mr = map.getBoundingClientRect();
    const pcs = getComputedStyle(panel);
    const h4 = [...body.querySelectorAll('h4')].find(x=>/WHERE YOUR PLAYERS LINE UP\?/.test(x.textContent));
    const beats = map.querySelectorAll('.zpb-fm-ini[data-beat]').length;
    return { has: !!map, wide: map.classList.contains('zpb-fm-wide'),
      gapL: Math.round(mr.left - (pr.left + parseFloat(pcs.paddingLeft))),
      gapR: Math.round((pr.right - parseFloat(pcs.paddingRight)) - mr.right),
      heading: !!h4 && h4.getBoundingClientRect().top <= mr.top, beats };
  });
  ok(r1t.has && r1t.wide, 'the roster tab map wears zpb-fm-wide');
  ok(Math.abs(r1t.gapL)<=2 && Math.abs(r1t.gapR)<=2, `edge to edge on the roster tab (gapL ${r1t.gapL}px, gapR ${r1t.gapR}px)`);
  ok(r1t.heading, 'the heading rides above the map');
  ok(r1t.beats>=15, `the stations float in pick order (${r1t.beats} beats)`);
  await page.screenshot({ path: OUT+'/w36-roster-tab-map.png' });

  ok(errs.length===0, 'zero pageerrors through the probe' + (errs.length ? ' — '+errs.slice(0,2).join(' | ') : ''));
  await browser.close();
  console.log(fails===0 ? '\nPROBE: all green' : `\nPROBE: ${fails} FAIL`);
  process.exit(fails?1:0);
})().catch(e => { console.error('PROBE DIED', e); process.exit(2); });
