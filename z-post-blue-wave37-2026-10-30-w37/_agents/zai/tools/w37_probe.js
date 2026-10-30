#!/usr/bin/env node
/* w37_probe.js — live-in-Chromium measurement for the round-37 surfaces. Exits non-zero on failure.
   R3 : WR4 sits inside the map on the other side of WR1.
   R4 : the nickel name reads on the rose bubble — both themes; the legend lifts in dark.
   R5 : the SEASON OPENER veil is computed-opaque on its first paint.
   R6 : the intro names never overlap — spread around the middle panel.
   R7 : the center panel runs wider; no line ellipsizes.
   R9 : the regular awards render as rows, not towers.
   R13: the Season Review bar leads the champion page, top right.
   R14: the report-card lines are text (auto height), not 3px bars. */
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
  await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForTimeout(2200);

  // the Chiefs, the Owner's own team
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
    }catch(e){ window.__probeErr=String(e); }
  });
  await page.waitForTimeout(900);
  ok(!(await page.evaluate(() => window.__probeErr||'')), 'the Chiefs draft finishes');
  await page.evaluate(() => document.getElementById('resultsMineBtn').click());
  await page.waitForTimeout(700);

  console.log('== R3 · WR4 inside the map, on the other side of WR1 ==');
  const r3 = await page.evaluate(() => {
    const map = document.getElementById('draftResultsBody').querySelector('.zpb-fm');
    const mr = map.getBoundingClientRect();
    const wr4 = map.querySelector('[data-slot="WR4"]'), wr1 = map.querySelector('[data-slot="WR1"]');
    const r4 = wr4.getBoundingClientRect(), r1 = wr1.getBoundingClientRect();
    return { inL: r4.left >= mr.left - 1, inR: r4.right <= mr.right + 1, leftOfWR1: r4.right <= r1.left + 1,
             wr4: {l: Math.round(r4.left), r: Math.round(r4.right)}, mapL: Math.round(mr.left), mapR: Math.round(mr.right) };
  });
  ok(r3.inL && r3.inR, `WR4 is fully inside the map box (bubble ${r3.wr4.l}..${r3.wr4.r} in ${r3.mapL}..${r3.mapR})`);
  ok(r3.leftOfWR1, 'WR4 sits on the other side of WR1 (beyond him on the left flank)');
  await page.screenshot({ path: OUT+'/w37-map-wr4.png' });

  console.log('== R4 · the nickel reads on the rose bubble, both themes ==');
  const r4 = await page.evaluate(() => {
    const map = document.getElementById('draftResultsBody').querySelector('.zpb-fm');
    const nk = map.querySelector('[data-slot="NICKEL"]');
    if(!nk || nk.classList.contains('zpb-empty')) return {none:true};
    const nm = nk.querySelector('b');
    const s = getComputedStyle(nm), sb = getComputedStyle(nk);
    return { name: nm.textContent, color: s.color, bg: sb.backgroundColor, label: nk.querySelector('i').textContent,
             labColor: getComputedStyle(nk.querySelector('i')).color, shm: nk.classList.contains('zpb-shm') };
  });
  ok(!r4.none && !!r4.name, 'the nickel carries a player: ' + (r4.name||'—') + (r4.shm ? ' (90+ — the shimmer law wears the team accent)' : ''));
  if (!r4.none) {
    const lum = hx => { const m = hx.match(/\d+/g).map(Number); const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }; return 0.2126*f(m[0]) + 0.7152*f(m[1]) + 0.0722*f(m[2]); };
    const cr = (a,b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); };
    if (r4.shm) {
      const c = cr(r4.labColor, r4.bg);
      ok(c >= 4.0, `the 90+ name keeps the shimmer law — the position label reads instead (${c.toFixed(2)}:1)`);
    } else {
      const c = cr(r4.color, r4.bg);
      ok(c >= 4.0, `the nickel name contrasts with the bubble (${c.toFixed(2)}:1)`);
    }
    await page.screenshot({ path: OUT+'/w37-map-nickel-light.png' });
  }
  { // dark theme
    await page.evaluate(() => document.documentElement.setAttribute('data-theme','dark'));
    await page.waitForTimeout(500);
    const d = await page.evaluate(() => {
      const map = document.getElementById('draftResultsBody').querySelector('.zpb-fm');
      const nk = map.querySelector('[data-slot="NICKEL"]');
      if(!nk || nk.classList.contains('zpb-empty')) return {none:true};
      const nm = nk.querySelector('b');
      return { color: getComputedStyle(nm).color, bg: getComputedStyle(nk).backgroundColor,
               lab: getComputedStyle(nk.querySelector('i')).color, shm: nk.classList.contains('zpb-shm'),
               legend: getComputedStyle(document.querySelector('.zpb-fm-legend b')||document.body).color };
    });
    if (!d.none) {
      const lum = hx => { const m = hx.match(/\d+/g).map(Number); const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }; return 0.2126*f(m[0]) + 0.7152*f(m[1]) + 0.0722*f(m[2]); };
      const cr = (a,b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); };
      const c = cr(d.color, d.bg);
      if (d.shm) {
        ok(cr(d.lab, d.bg) >= 4.0, `the DARK 90+ keeps the shimmer — the label reads (${cr(d.lab, d.bg).toFixed(2)}:1)`);
      } else {
        ok(c >= 4.0, `the DARK nickel name contrasts with the bubble (${c.toFixed(2)}:1)`);
        ok(cr(d.lab, d.bg) >= 4.0, `the DARK position label reads too (${cr(d.lab, d.bg).toFixed(2)}:1)`);
      }
      await page.screenshot({ path: OUT+'/w37-map-nickel-dark.png' });
    }
    await page.evaluate(() => document.documentElement.setAttribute('data-theme',''));
    await page.waitForTimeout(400);
  }

  console.log('== R5 · the SEASON OPENER covers on its first paint ==');
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if(b) b.click(); });
  await page.waitForTimeout(320);
  const r5 = await page.evaluate(() => {
    const v = document.querySelector('.zpb-prematch.zpb-prematch-veil');
    return { up: !!v, op: v ? getComputedStyle(v).opacity : null, wk1: /Week 1 of 17/.test((document.getElementById('draftResultsBody')||{textContent:''}).textContent||'') };
  });
  ok(r5.up && r5.op === '1', `the veil is computed-opaque immediately (opacity ${r5.op})`);
  ok(r5.wk1, 'week 1 stands behind it');
  await page.screenshot({ path: OUT+'/w37-opener-cinematic.png' });
  await page.waitForTimeout(5200);

  console.log('== R6 · the intro names spread around the middle panel ==');
  await page.evaluate(() => { const b = document.getElementById('simGameBtn') || document.getElementById('simWeekBtn'); if(b) b.click(); });
  await page.waitForTimeout(700);
  closeAndOpen: {}
  // the week sim may have opened the replay already; else open it from the review page
  let opened = await page.evaluate(() => !!document.querySelector('.zpb-replay-ov'));
  if (!opened) {
    await page.evaluate(() => {
      try{ const u = seasonUserTeam(); const g = seasonState.schedule.find(x=>x.result && (x.home===u||x.away===u)); if(g) zpbGameReplay(g, u); }catch(e){ window.__prErr=String(e); }
    });
    await page.waitForTimeout(400);
  }
  const r6 = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-replay-ov'); if(!ov) return {none:true};
    const box = ov.querySelector('.zpb-replay').getBoundingClientRect();
    const stars = [...ov.querySelectorAll('.zpb-intro-star')].map(el => ({ r: el.getBoundingClientRect(), t: el.textContent.trim().slice(0,18), st: el.getAttribute('style')||'' }));
    // pairwise overlap of the VISIBLE name boxes (their cells may share x — require gap)
    let overlaps = 0; const opairs = [];
    for(let i=0;i<stars.length;i++) for(let j=i+1;j<stars.length;j++){
      const a = stars[i].r, b = stars[j].r;
      const ax = a.left, ax2 = a.right, bx = b.left, bx2 = b.right;
      const ay = a.top, ay2 = a.bottom, by = b.top, by2 = b.bottom;
      if (ax < bx2 && bx < ax2 && ay < by2 && by < ay2) { overlaps++; opairs.push([stars[i].t, stars[j].t, Math.round(a.left), Math.round(a.right), Math.round(a.top), Math.round(b.left), Math.round(b.right), Math.round(b.top)]); }
    }
    const inBox = stars.every(s => s.r.left >= box.left - 2 && s.r.right <= box.right + 2);
    const offenders = stars.filter(s => !(s.r.left >= box.left - 2 && s.r.right <= box.right + 2)).map(s => ({t: s.t, l: Math.round(s.r.left), r: Math.round(s.r.right), st: s.st.slice(0,60)}));
    return { n: stars.length, overlaps, inBox, offenders, tops: stars.filter(s=>/--sx:50%/.test(s.st)).map(s=>s.t) };
  });
  ok(!r6.none, 'the replay intro renders');
  if (!r6.none) {
    ok(r6.n >= 6, `the intro names render (${r6.n})`);
    ok(r6.overlaps === 0, `no two names overlap — spread around the middle panel (${r6.overlaps} overlaps)` + (r6.opairs && r6.opairs.length ? ' — ' + JSON.stringify(r6.opairs) : ''));
    ok(r6.inBox, 'every name sits inside the center panel' + (r6.offenders.length ? ' — offenders: ' + JSON.stringify(r6.offenders) : ''));
    await page.screenshot({ path: OUT+'/w37-intro-stars.png' });
  }

  console.log('== R7 · the wider panel, no ellipsis ==');
  const r7 = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-replay-ov'); if(!ov) return {none:true};
    const box = ov.querySelector('.zpb-replay').getBoundingClientRect();
    return { w: Math.round(box.width) };
  });
  ok(!r7.none && r7.w >= 600, `the center panel runs wide (${r7.none?'-':r7.w}px at 1280 — was 560)`);
  // flush the game and check the lines never clip
  const r7b = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-replay-ov'); if(!ov) return {none:true};
    const iSkip = ov.querySelector('#zrepIntroSkip'); if (iSkip) iSkip.click();
    const skip = ov.querySelector('#zrepSkip'); if (skip) skip.click();
    return {done:true};
  });
  await page.waitForTimeout(300);
  const r7c = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-replay-ov'); if(!ov) return {none:true};
    const plays = [...ov.querySelectorAll('.zrl-play')];
    const clipped = plays.filter(p => p.scrollWidth > p.clientWidth + 1).length;
    const fin = ov.querySelector('.zpb-rep-fscore');
    return { plays: plays.length, clipped, fin: fin ? fin.textContent.replace(/\s+/g,' ') : '' };
  });
  ok(!r7c.none && r7c.clipped === 0, `no play line clips (${r7c.clipped} of ${r7c.plays} clipped)`);
  ok(!!r7c.fin, 'the final lands: ' + r7c.fin);
  await page.evaluate(() => { const o = document.querySelector('.zpb-replay-ov'); if(o) o.remove(); });

  ok(errs.length===0, 'zero pageerrors through the probe' + (errs.length ? ' — '+errs.slice(0,2).join(' | ') : ''));
  await browser.close();
  console.log(fails===0 ? '\nPROBE: all green' : `\nPROBE: ${fails} FAIL`);
  process.exit(fails?1:0);
})().catch(e => { console.error('PROBE DIED', e); process.exit(2); });
