#!/usr/bin/env node
/* w37_diag.js — raw measurements for the three probe failures. */
const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.goto('file:///home/z/my-project/w37/Football-Sim-Z-post-blue-w37.html', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    try{
      const sel = document.getElementById('teamSel') || document.querySelector('#draftSetup select');
      if (sel) { const opt = [...sel.options].find(o=>/Kansas City Chiefs/.test(o.textContent)); if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', {bubbles:true})); } }
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
    }catch(e){ console.log('ERR', String(e)); }
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => document.getElementById('resultsMineBtn').click());
  await page.waitForTimeout(700);
  const d = await page.evaluate(() => {
    const map = document.getElementById('draftResultsBody').querySelector('.zpb-fm');
    const mr = map.getBoundingClientRect();
    const out = { map: {l: Math.round(mr.left), r: Math.round(mr.right), w: Math.round(mr.width)}, cs: getComputedStyle(map) };
    const row = map.querySelector('.zpb-fm-row');
    const rr = row.getBoundingClientRect();
    out.row = {l: Math.round(rr.left), r: Math.round(rr.right), w: Math.round(rr.width)};
    ['WR4','WR1','WR2'].forEach(sl => {
      const el = map.querySelector('[data-slot="'+sl+'"]');
      if(!el){ out[sl] = null; return; }
      const r = el.getBoundingClientRect();
      out[sl] = { style: (el.getAttribute('style')||'').slice(0,120), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
        csLeft: getComputedStyle(el).left, name: (el.querySelector('b')||{}).textContent };
    });
    const nk = map.querySelector('[data-slot="NICKEL"]');
    if (nk) { const b = nk.querySelector('b');
      out.nickel = { style: (nk.getAttribute('style')||'').slice(0,160), color: getComputedStyle(b).color, bg: getComputedStyle(nk).backgroundColor, name: b.textContent }; }
    return out;
  });
  console.log(JSON.stringify(d, null, 1));
  await browser.close();
})().catch(e => { console.error('DIED', e); process.exit(1); });
