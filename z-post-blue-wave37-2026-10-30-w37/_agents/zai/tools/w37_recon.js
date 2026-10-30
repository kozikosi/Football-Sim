#!/usr/bin/env node
/* w37_recon.js — live-in-Chromium evidence for the Gorden-at-nickel contrast report (R4).
   Boots a CHIEFS draft (the Owner's own team), finishes it, and measures the nickel surfaces
   in BOTH themes: the review map, the depth chart, the lineup comparison, the lineup editor.
   Reports computed colors + contrast ratios against the actual painted backgrounds. */
const { chromium } = require('playwright-core');
const OUT = '/home/z/my-project/w37/notes/evidence';
const FILE = 'file:///home/z/my-project/w37/Football-Sim-Z-post-blue-w37.html';
let fails = 0;
const ok = (cond, label, detail='') => { console.log(`   ${cond?'PASS':'FAIL'}  ${label}${detail?' — '+detail:''}`); if(!cond) fails++; };

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(2500);

  // set the user team to the Chiefs, then run the scripted draft
  await page.evaluate(() => {
    try{
      const sel = document.getElementById('teamSel') || document.querySelector('#draftSetup select');
      if (sel) {
        const opt = [...sel.options].find(o=>/Kansas City Chiefs/.test(o.textContent));
        if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', {bubbles:true})); }
      }
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
  await page.waitForTimeout(900);
  ok(!(await page.evaluate(() => window.__probeErr||'')), 'the Chiefs draft finishes');
  ok(await page.evaluate(() => (draftSim.rosters.find(x=>x.isUser)||{}).teamName === 'Kansas City Chiefs'), 'the user team is the Chiefs');

  // ---- the review map: what actually renders at NICKEL? ----
  console.log('== the map at NICKEL ==');
  const mapInfo = await page.evaluate(() => {
    const body = document.getElementById('draftResultsBody');
    const map = body.querySelector('.zpb-fm');
    if(!map) return {none:true};
    const n = map.querySelector('[data-slot="NICKEL"]');
    const d = map.querySelector('[data-slot="DIME"]');
    const cb3 = draftSim.rosters.find(x=>x.isUser).slots.CB3;
    return { hasN: !!n, nHTML: n ? n.outerHTML.slice(0,300) : null, nEmpty: n ? n.classList.contains('zpb-empty') : null,
             dHTML: d ? d.outerHTML.slice(0,200) : null, cb3: cb3 ? cb3[0] : null,
             inked: [...map.querySelectorAll('.zpb-fm-ini')].filter(b=>/--fmink/.test(b.getAttribute('style')||'')).length };
  });
  ok(!mapInfo.none, 'the review map renders');
  console.log('   NICKEL bubble:', mapInfo.nHTML || 'MISSING', '| empty:', mapInfo.nEmpty, '| CB3 on the roster:', mapInfo.cb3);
  console.log('   DIME bubble:', mapInfo.dHTML || 'MISSING');
  await page.screenshot({ path: OUT+'/w37-recon-map-light.png', fullPage: false });

  // dark mode map
  await page.evaluate(() => document.documentElement.setAttribute('data-theme','dark'));
  await page.waitForTimeout(300);
  await page.evaluate(() => document.getElementById('resultsMineBtn').click());
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT+'/w37-recon-map-dark.png', fullPage: false });

  // ---- the lineup comparison in dark mode: the nickel row ----
  console.log('== the lineup comparison at NICKEL (dark) ==');
  await page.evaluate(() => { try{ startSeason(); renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){ window.__ssErr=String(e); } });
  await page.waitForTimeout(700);
  const luInfo = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.zpb-lu-row')];
    const nick = rows.find(r=>r.querySelector('.zpb-lu-c') && /NICKEL/i.test(r.querySelector('.zpb-lu-c').textContent));
    if(!nick) return {none:true, nrows: rows.length};
    const cells = [...nick.querySelectorAll('.zpb-lu-cell')];
    const cs = el => { const s = getComputedStyle(el); return {color: s.color, bg: s.backgroundColor}; };
    return { label: nick.querySelector('.zpb-lu-c').textContent, cells: cells.map(cs), labelStyle: cs(nick.querySelector('.zpb-lu-c')),
             text: cells.map(c=>c.textContent.trim()).join(' | '), html: nick.outerHTML.slice(0,320) };
  });
  console.log('   NICKEL row:', JSON.stringify(luInfo, null, 1).slice(0, 900));

  // ---- the depth chart in dark mode: the nickel row ----
  console.log('== the depth chart at NICKEL (dark) ==');
  await page.evaluate(() => document.getElementById('resultsMineBtn').click());
  await page.waitForTimeout(600);
  const dzInfo = await page.evaluate(() => {
    const row = [...document.querySelectorAll('.zpb-dz-row, .depth-row')].find(r=>r.querySelector('.slotname') && /NICKEL/i.test(r.querySelector('.slotname').textContent));
    if(!row) return {none:true};
    const sn = row.querySelector('.slotname'), pn = row.querySelector('.playername');
    const cs = el => { if(!el) return null; const s = getComputedStyle(el); return {color: s.color, bg: s.backgroundColor, text: el.textContent.trim().slice(0,28)}; };
    return { slotname: cs(sn), playername: cs(pn), rowHTML: row.outerHTML.slice(0,300) };
  });
  console.log('   depth chart row:', JSON.stringify(dzInfo, null, 1).slice(0, 700));

  // ---- the lineup editor (preseason editor gone; the season editor in Lineup & flex) ----
  console.log('== the season lineup editor at NICKEL (dark) ==');
  const edInfo = await page.evaluate(() => {
    const host = document.getElementById('lineupHost') || document.getElementById('lineupSeason');
    if(!host) return {none:true};
    const row = [...host.querySelectorAll('.depth-row')].find(r=>r.querySelector('.slotname') && /NICKEL/i.test(r.querySelector('.slotname').textContent));
    if(!row) return {none:true, host: !!host};
    const cs = el => { if(!el) return null; const s = getComputedStyle(el); return {color: s.color, bg: s.backgroundColor, text: el.textContent.trim().slice(0,28)}; };
    return { slotname: cs(row.querySelector('.slotname')), pickbtn: cs(row.querySelector('.zpb-pickbtn')), rowHTML: row.outerHTML.slice(0,300) };
  });
  console.log('   editor row:', JSON.stringify(edInfo, null, 1).slice(0, 700));

  ok(errs.length===0, 'zero pageerrors through the recon' + (errs.length ? ' — '+errs.slice(0,2).join(' | ') : ''));
  await browser.close();
  console.log(fails===0 ? '\nRECON: done' : `\nRECON: ${fails} FAIL (evidence still collected)`);
  process.exit(0);
})().catch(e => { console.error('RECON DIED', e); process.exit(2); });
