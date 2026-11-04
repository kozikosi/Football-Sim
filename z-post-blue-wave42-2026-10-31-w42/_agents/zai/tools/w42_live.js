#!/usr/bin/env node
/* w42_live.js — the live drills for the round-42 directives (real Chromium).
   A: no sideways scroll at 1280/900/500/390, both themes (carried)
   B: the ONE-INK law in the real browser — the player browser's names/numbers and the draft
      board's names read the SAME computed ink in light and dark (the dark dropdown ink)
   C: the homepage dropdown — light reads the dark ink (white-on-white by design), screenshots
   D: the look-gate — the real IntersectionObserver opens the gate on sight; the cinematic skip
      releases the wait; the held state paints nothing until seen
   E: evidence screenshots for the Owner */
const { chromium } = require('playwright-core');
const FILE = 'file:///home/z/my-project/boot/w42/Football-Sim-Z-post-blue-w42.html';
const OUT = '/home/z/my-project/boot/w42/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const shot = async (page, path) => { try { await page.screenshot({ path, timeout: 12000 }); } catch (e) { console.log('   (shot skipped:', path.split('/').pop() + ')'); } };

const runInstantDraft = async (page) => {
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
  await page.waitForTimeout(700);
};

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell' });

  // ---------- A: responsive, both themes (carried) ----------
  for (const theme of ['light','dark']) {
    for (const W of [1280, 900, 500, 390]) {
      const ctx = await browser.newContext({ viewport: { width: W, height: 760 } });
      const page = await ctx.newPage();
      const errs = []; page.on('pageerror', e => errs.push(e.message));
      await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
      await page.waitForTimeout(1200);
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      await page.evaluate(() => { try{ document.getElementById('tabPlayersBtn').click(); }catch(e){} });
      await page.waitForTimeout(400);
      const docOv = await page.evaluate(() => Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
      ok(docOv === 0 && errs.length === 0, `A ${theme} ${W}: no sideways scroll, no page errors`, docOv + 'px' + (errs.length ? ' errs:' + errs[0].slice(0,60) : ''));
      await ctx.close();
    }
  }

  // ---------- B: the ONE-INK law, computed, both themes ----------
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1200);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    const ink = await page.evaluate(() => {
      try{
        document.getElementById('tabPlayersBtn').click();
        const rows = [...document.querySelectorAll('#playerBody tr[style*="--tn"]')];
        const row = rows.find(r => !r.querySelector('.zpb-shm')) || rows[0];
        if(!row) return {err:'no row'};
        const cs = getComputedStyle(row);
        const name = row.querySelector('.zpb-pb-name'), num = row.querySelector('td.score'), team = row.querySelector('.zpb-pb-team');
        return { nameC: getComputedStyle(name).color, numC: getComputedStyle(num).color, teamC: getComputedStyle(team).color,
                 tn: cs.getPropertyValue('--tn').trim(), tnd: cs.getPropertyValue('--tnd').trim() };
      }catch(e){ return {err:String(e)}; }
    });
    ok(!ink.err, `B ${theme}: the browser renders`, ink.err||'');
    if (!ink.err) {
      const toRGB3 = h => { const m = /^#([0-9a-f]{6})$/i.exec((h||'').trim()); return m ? 'rgb(' + [0,2,4].map(i=>parseInt(m[1].slice(i,i+2),16)).join(', ') + ')' : (h||'').trim(); };
      const want = toRGB3(ink.tnd);
      ok(ink.nameC === want && ink.numC === want && ink.teamC === want, `B ${theme}: name, number and team cell read ONE ink`, `${ink.nameC} / ${ink.numC} vs ${want}`);
      ok(ink.tn === ink.tnd, `B ${theme}: --tn === --tnd (the light theme reads the dark ink)`);
    }
    await shot(page, `${OUT}/browser-${theme}.png`);
    await ctx.close();
  }
  {
    // the two themes must agree EXACTLY on the browser ink
    const readInk = async (theme) => {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
      await page.waitForTimeout(1100);
      await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
      const c = await page.evaluate(() => {
        document.getElementById('tabPlayersBtn').click();
        const row = document.querySelector('#playerBody tr[style*="--tn"]');
        return row ? getComputedStyle(row.querySelector('.zpb-pb-name')).color : '';
      });
      await page.waitForTimeout(300).then(() => {});
      const c2 = await page.evaluate(() => {
        const row = document.querySelector('#playerBody tr[style*="--tn"]');
        return row ? getComputedStyle(row.querySelector('.zpb-pb-name')).color : '';
      });
      await ctx.close(); return c2;
    };
    const l = await readInk('light'), d = await readInk('dark');
    ok(l && l === d, 'B: light and dark computed name inks are IDENTICAL', l + ' vs ' + d);
  }

  // ---------- C: the homepage dropdown — light reads the dark ink ----------
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1200);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    const dd = await page.evaluate(() => {
      try{
        const btn = document.querySelector('.zpb-teamwrap .zpb-selbtn, .zpb-selbtn');
        if(!btn) return {err:'no dropdown'};
        btn.click();
        const opt = document.querySelector('.zpb-selpop .zpb-selopt');
        const face = btn.querySelector('.zpb-face');
        return { optC: opt ? getComputedStyle(opt).color : '', faceC: face ? getComputedStyle(face).color : '' };
      }catch(e){ return {err:String(e)}; }
    });
    ok(!dd.err && dd.optC, `C ${theme}: the dropdown opens`, dd.err || (dd.optC || 'no opt'));
    globalThis[`dd_${theme}`] = dd;
    await page.evaluate(() => { try{ document.querySelectorAll('.zpb-selwrap.open').forEach(w => w.classList.add('open')); const pop = document.querySelector('.zpb-selpop'); if(pop){ const b = pop.closest('.zpb-selwrap').querySelector('.zpb-selbtn'); b.scrollIntoView({block:'center'}); } }catch(e){} });
    await page.waitForTimeout(250);
    await page.evaluate(() => { try{ const b = document.querySelector('.zpb-selwrap:not(.zpb-teamwrap) .zpb-selbtn'); if(b){ b.click(); } }catch(e){} });
    await page.waitForTimeout(350);
    await shot(page, `${OUT}/dropdown-${theme}.png`);
    await ctx.close();
  }
  ok(globalThis.dd_light && globalThis.dd_dark && globalThis.dd_light.optC === globalThis.dd_dark.optC,
     'C: the light dropdown\'s computed ink equals the dark one (white-on-white by design)', globalThis.dd_light?.optC + ' vs ' + globalThis.dd_dark?.optC);

  // ---------- D: the look-gate in the real browser ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1200);
    // the real draft re-runs the opening cinematic — while it runs, the gate waits (the w37 union)
    await runInstantDraft(page);
    await page.evaluate(() => { try{ document.getElementById('resultsMineBtn').click(); }catch(e){} });
    await page.waitForTimeout(600);
    const held = await page.evaluate(() => {
      const fm = document.querySelector('.zpb-fm');
      const ini = fm ? fm.querySelector('.zpb-fm-ini') : null;
      return fm ? { seen: fm.classList.contains('zpb-seen'), cine: parseFloat(fm.style.getPropertyValue('--dfc-cine'))||0,
                    op: ini ? getComputedStyle(ini).opacity : '', anim: ini ? getComputedStyle(ini).animationName : '' } : {none:1};
    });
    ok(!held.none && held.seen, 'D: the map renders and the real IntersectionObserver gates it', JSON.stringify(held));
    ok(held.cine > 0 && held.cine <= 6.9, 'D: with the opening cinematic up, the gate waits for it (the w37 union)', held.cine + 's');
    ok(parseFloat(held.op) < 0.05, 'D: the held map paints nothing while the cinematic runs', held.op);
    // skipping the cinematic releases the wait — every overlay stacked (the w37 era may stack them) is skipped
    await page.evaluate(() => { try{ document.querySelectorAll('.zpb-fin').forEach(ov => ov.dispatchEvent(new Event('pointerdown', {bubbles:true}))); }catch(e){} });
    await page.waitForTimeout(700);
    const released = await page.evaluate(() => {
      const fm = document.querySelector('.zpb-fm');
      const ini = fm ? fm.querySelector('.zpb-fm-ini') : null;
      return { ends: window.__zpbFinCineEndsAt ? window.__zpbFinCineEndsAt - Date.now() : -1,
               op: ini ? getComputedStyle(ini).opacity : '', anim: ini ? getComputedStyle(ini).animationName : '' };
    });
    ok(released.ends <= 400, 'D: the skip pulls the gate down (~0.4s)', String(released.ends));
    await page.waitForTimeout(1200);
    const painted = await page.evaluate(() => {
      const ini = document.querySelector('.zpb-fm .zpb-fm-ini');
      return ini ? getComputedStyle(ini).opacity : '';
    });
    ok(parseFloat(painted) > 0.05, 'D: after the skip the bubbles actually paint', painted);
    ok(released.anim === 'zpbCardIn', 'D: the entrance is the card-in animation', released.anim);
    // a map below the fold holds until it is scrolled to (the real IO)
    const fold = await page.evaluate(() => {
      try{
        const host = document.createElement('div');
        host.innerHTML = '<div class="zpb-fm" id="zpbFoldMap" style="margin-top:250vh;"><i class="zpb-fm-ini"><b>F</b><i>QB</i></i></div>';
        document.body.appendChild(host.firstElementChild);
        window.zpbWireLookIn(); // the product wires renders; a synthetic map arms itself the same way
        const fm = document.getElementById('zpbFoldMap');
        return getComputedStyle(fm.querySelector('.zpb-fm-ini')).opacity;
      }catch(e){ return 'err:'+e; }
    });
    await page.waitForTimeout(500);
    const heldOp = await page.evaluate(() => getComputedStyle(document.querySelector('#zpbFoldMap .zpb-fm-ini')).opacity);
    ok(parseFloat(fold) < 0.05 && parseFloat(heldOp) < 0.05, 'D: a map below the fold paints nothing until looked at', fold + ' / ' + heldOp);
    await page.evaluate(() => { try{ document.getElementById('zpbFoldMap').scrollIntoView({block:'center'}); }catch(e){} });
    await page.waitForTimeout(700);
    const seenOp = await page.evaluate(() => {
      const fm = document.getElementById('zpbFoldMap');
      return { seen: fm.classList.contains('zpb-seen'), op: getComputedStyle(fm.querySelector('.zpb-fm-ini')).opacity };
    });
    ok(seenOp.seen && parseFloat(seenOp.op) > 0.05, 'D: scrolled into view, the map enters', JSON.stringify(seenOp));
    await shot(page, `${OUT}/map-seen.png`);
    ok(errs.length === 0, 'D: zero page errors through the draft and the gate', errs[0]||'');
    await ctx.close();
  }

  // ---------- E: the rankings evidence, both themes ----------
  for (const theme of ['light','dark']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(1200);
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.evaluate(() => { try{ document.getElementById('tabGroupsBtn').click(); }catch(e){} });
    await page.waitForTimeout(600);
    await shot(page, `${OUT}/rankings-${theme}.png`);
    await ctx.close();
  }

  await browser.close();
  console.log(`\nw42_live: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
