#!/usr/bin/env node
/* w47_live.js — the wave-47 verification suite (real Chromium, both themes).
   P (T4): the theme follows the computer; no signal → dark.
   A (T7): Slow sits before Instant.
   C (T2): the ANCHOR chip golden in light, untouched in dark.
   G (T3): one constant gold everywhere — Chiefs and Raiders identical, glow, no sweep.
   D (T5): the DIME stacks under the NICKEL.
   I (T9): the Full Depth Chart rows ride the map's beats.
   F (T1): the lineup dropdown menu speaks last names once opened.
   J (T10): the squares/triangles front is gone from the lineup board.
   K (T11): the formation is staged; Apply saves it.
   L (T12): UNDO reverts one move; RETURN TO MODEL LINEUP restores the model.
   H (T14): the during-game ink is the team's dark halfway.
   M (T22/T23): SIM PLAYOFFS quiet + the round cinematics + the Super Bowl stage.
   N (T16-T21): the review page — indented lines, badges, chips, crests.
   O (T25): the box score final column wears the faded tone.
   B (T24): the topbar sentence is gone.
   Q: zero page errors across the whole drive. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
const OUT = '/home/z/my-project/w49work/evidence';
const fs = require('fs'); fs.mkdirSync(OUT, { recursive: true });
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };
const shot = async (page, p) => { try { await page.screenshot({ path: OUT + '/' + p, timeout: 12000 }); } catch (e) {} };
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

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
    }catch(e){ window.__drvErr = String(e); }
  });
  await page.waitForTimeout(700);
};

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const errors = [];
  page.on('pageerror', e => errors.push('PE: ' + e.message.slice(0, 160)));
  page.on('console', m => { if (m.type() === 'error') errors.push('CE: ' + m.text().slice(0, 160)); });
  await page.goto(FILE); await page.waitForTimeout(1100);
  const setTheme = t => page.evaluate(th => document.documentElement.setAttribute('data-theme', th), t);

  // ---------- P · the theme default ----------
  console.log('P · the theme default');
  // (a) no signal at all (a device without prefers-color-scheme) → the boot script pins dark
  const noSignalPage = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await noSignalPage.addInitScript(() => { try { Object.defineProperty(window, 'matchMedia', { value: undefined, configurable: true }); } catch (e) {} });
  await noSignalPage.goto(FILE); await noSignalPage.waitForTimeout(900);
  const nsAttr = await noSignalPage.evaluate(() => document.documentElement.getAttribute('data-theme'));
  ok(nsAttr === 'dark', 'a device with no theme signal boots dark (the boot pins it)', String(nsAttr));
  await noSignalPage.close();
  // (b) the system decides
  await page.emulateMedia({ colorScheme: 'light' });
  await page.reload(); await page.waitForTimeout(1000);
  const lightBg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
  ok(lightBg === '#fdf2f6', 'system prefers light → the site follows the computer setting', lightBg);
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.reload(); await page.waitForTimeout(1000);
  const darkBg2 = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
  ok(darkBg2 === '#1e1119', 'system prefers dark → dark', darkBg2);
  await page.emulateMedia({ colorScheme: null });

  // ---------- A · Slow before Instant ----------
  console.log('A · the draft speed buttons');
  const order = await page.evaluate(() => [...document.querySelectorAll('#speedSlowBtn,#speedInstantBtn')].map(b => b.id));
  ok(order[0] === 'speedSlowBtn' && order[1] === 'speedInstantBtn', 'Slow now sits before Instant (positions swapped)', order.join(','));

  // ---------- C · the ANCHOR chip ----------
  console.log('C · the ANCHOR chip');
  await setTheme('light'); await page.waitForTimeout(400);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  const anch = await page.evaluate(() => {
    const el = document.querySelector('.zpb-anch'); if (!el) return null;
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, border: cs.borderColor };
  });
  ok(!!anch && anch.bg === 'rgb(244, 230, 195)' && anch.border === 'rgb(207, 169, 107)', 'light: the chip wears the gold family', JSON.stringify(anch));
  await setTheme('dark'); await page.waitForTimeout(400);
  const anchD = await page.evaluate(() => { const el = document.querySelector('.zpb-anch'); if (!el) return null; const cs = getComputedStyle(el); return { bg: cs.backgroundColor, border: cs.borderColor }; });
  ok(!!anchD && anchD.bg === 'rgb(77, 47, 63)' && anchD.border === 'rgb(138, 95, 120)', 'dark: the chip untouched', JSON.stringify(anchD));
  await shot(page, 'w47-anchor-dark.png');

  // ---------- G · the constant gold ----------
  console.log('G · one constant gold on every team');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /team comparison/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(800);
  const gold = () => page.evaluate(() => {
    const cells = [...document.querySelectorAll('.zpb-lu-cell.zpb-shm')];
    const left = cells.find(c => c.classList.contains('zpb-lu-l'));
    const right = cells.find(c => c.classList.contains('zpb-lu-r'));
    const csL = left ? getComputedStyle(left) : null, csR = right ? getComputedStyle(right) : null;
    return {
      lTxt: left ? left.textContent.trim().slice(0, 18) : null, rTxt: right ? right.textContent.trim().slice(0, 18) : null,
      lFill: csL ? csL.webkitTextFillColor : null, rFill: csR ? csR.webkitTextFillColor : null,
      lBg: csL ? (csL.backgroundImage || 'none') : 'none', rBg: csR ? (csR.backgroundImage || 'none') : 'none',
      lAnim: left ? getComputedStyle(left).animationName : null, rAnim: right ? getComputedStyle(right).animationName : null,
      n: cells.length
    };
  });
  await setTheme('dark'); await page.waitForTimeout(500);
  const gd = await gold();
  ok(gd.n > 4, '90+ cells present on both sides', 'n=' + gd.n);
  ok(gd.lFill === gd.rFill, 'Chiefs and Raiders 90+ names wear the SAME gold paint', JSON.stringify({ l: gd.lFill, r: gd.rFill, lTxt: gd.lTxt, rTxt: gd.rTxt }));
  ok(gd.lBg === 'none' && gd.rBg === 'none', 'no gradient sweep behind the names anymore', String(gd.lBg).slice(0, 60));
  ok(gd.lAnim === 'zpbshimglow' && gd.rAnim === 'zpbshimglow', 'the shimmer is the synchronized glow', gd.lAnim + '/' + gd.rAnim);
  await setTheme('light'); await page.waitForTimeout(400);
  const gl = await gold();
  ok(gl.lFill === gl.rFill && gl.lAnim === 'zpbshimglow', 'light: same law', gl.lFill);
  await setTheme('dark'); await page.waitForTimeout(300);
  const zshimMatch = await page.evaluate(() => {
    const cell = document.querySelector('.zpb-lu-cell.zpb-shm');
    const cs = getComputedStyle(document.documentElement).getPropertyValue('--zshim').trim();
    const toRgb = h => { h = h.replace('#',''); if (h.length===3) h = h.split('').map(c=>c+c).join(''); const n = parseInt(h,16); return `rgb(${(n>>16)&255}, ${(n>>8)&255}, ${n&255})`; };
    return { fill: getComputedStyle(cell).webkitTextFillColor, want: toRgb(cs) };
  });
  ok(zshimMatch.fill === zshimMatch.want, 'the fill IS the constant --zshim', JSON.stringify(zshimMatch));
  await shot(page, 'w47-cmp-dark.png');

  // ---------- draft → review ----------
  console.log('D/I · draft review surfaces');
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /start a new draft/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const y = document.querySelector('.confirm-ov .resetbtn'); if (y) y.click(); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(300);
  await runInstantDraft(page);
  ok(!(await page.evaluate(() => window.__drvErr)), 'the instant draft drives clean', await page.evaluate(() => window.__drvErr || ''));
  // release the draft-finish cinematic so the review's cascade starts now
  await page.evaluate(() => { const f = document.querySelector('.zpb-fin'); if (f) f.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); try{ window.zpbReleaseLookGate(); }catch(e){} try{ document.documentElement.style.setProperty('--dfc-base','0s'); }catch(e){} });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m && m.offsetParent) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(600);
  let stack = null;
  for (let t = 0; t < 14 && !stack; t++) {
    if (t === 6) await page.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
    stack = await page.evaluate(() => {
      const findStation = slot => {
        const scope = document.querySelectorAll('#draftResultsBody .zpb-fm .zpb-fm-ini');
        let el = [...scope].find(e => e.getAttribute('data-slot') === slot);
        if (!el) el = [...scope].find(e => e.querySelector('i') && e.querySelector('i').textContent.trim() === slot);
        return el || null;
      };
      const nk = findStation('NICKEL'), dm = findStation('DIME');
      if (!nk || !dm) return { diag: { fms: document.querySelectorAll('.zpb-fm').length, view: (typeof resultsView !== 'undefined') ? resultsView : '?', bodyLen: (document.getElementById('draftResultsBody') || { innerHTML: '' }).innerHTML.length, fin: !!document.querySelector('.zpb-fin'), anyIni: document.querySelectorAll('.zpb-fm-ini').length } };
      const a = nk.getBoundingClientRect(), b = dm.getBoundingClientRect();
      return { nx: Math.round(a.x), dx: Math.round(b.x), ny: Math.round(a.y), dy: Math.round(b.y) };
    });
    if (!stack) await page.waitForTimeout(400);
  }
  ok(!!stack && !stack.miss && Math.abs(stack.nx - stack.dx) <= 14 && stack.dy > stack.ny, 'the DIME stacks right under the NICKEL (the N right above the D)', JSON.stringify(stack));
  await shot(page, 'w47-map-dime.png');
  const dz = await page.evaluate(() => {
    const dzEl = document.querySelector('.zpb-dz');
    if (!dzEl) return null;
    const rows = [...dzEl.querySelectorAll('.zpb-dz-row.zpb-dfc2')];
    return { seen: dzEl.classList.contains('zpb-seen'), beats: rows.slice(0, 5).map(r => r.style.getPropertyValue('--beat')), n: rows.length };
  });
  ok(!!dz && dz.n >= 20, 'the depth-chart rows carry the map beats', JSON.stringify(dz && dz.beats));
  if (dz && dz.beats.length) ok(dz.beats[0] !== '' && dz.beats[1] !== dz.beats[0], 'the beats step in pick order', dz.beats.join(','));
  const noAdvice = await page.evaluate(() => !document.querySelector('[id$="Advice"]'));
  ok(noAdvice, 'the squares/triangles front is not mounted on the review page');

  // ---------- season begins → the PRESEASON page carries the editor ----------
  console.log('F/J/K/L · the lineup editor (preseason page)');
  await page.evaluate(() => { try{ document.getElementById('resultsSeasonBtn').click(); }catch(e){} });
  await page.waitForTimeout(900);
  await page.evaluate(() => { try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} try{ document.querySelector('.zpb-prematch')?.remove(); }catch(e){} });
  await page.waitForTimeout(400);
  const preseasonReady = await page.evaluate(() => ({ pre: !!document.getElementById('lineupPre'), phase: seasonState && seasonState.phase }));
  ok(preseasonReady.pre, 'the preseason page renders with the lineup editor', JSON.stringify(preseasonReady));
  // F · the dropdown speaks last names
  await page.evaluate(() => { window.__expLast = n => window.zpbLastName(n); });
  const dd = await page.evaluate(() => {
    const host = document.getElementById('lineupPre');
    if (!host) return null;
    let btn = null;
    [...host.querySelectorAll('.zpb-pickbtn')].forEach(b => { const row = b.closest('.depth-row'); if (row && row.querySelector('.slotname') && row.querySelector('.slotname').textContent.trim() === 'WR1') btn = b; });
    if (!btn) btn = host.querySelector('.zpb-pickbtn');
    if (!btn) return { noPick: true };
    const closed = btn.textContent.trim();
    btn.click();
    const rows = [...document.querySelectorAll('.zpb-pickmenu.zpb-open .zpb-pickrow')].map(r => r.querySelector('b').textContent.trim());
    const rowsAll = [...document.querySelectorAll('.zpb-pickmenu.zpb-open .zpb-pickrow')].map(r => ({ last: r.querySelector('b').textContent.trim(), exp: window.zpbLastName(r.title), title: r.title }));
    return { closed, rows: rowsAll.slice(0, 8).map(r => r.last), rowsAll };
  });
  ok(!!dd && !dd.noPick, 'the lineup dropdown exists on the editor', JSON.stringify(dd ? dd.closed : null).slice(0, 60));
  if (dd && !dd.noPick) {
    ok(dd.rowsAll.length > 2 && dd.rowsAll.every(r => r.last === r.exp), 'the open menu reads LAST NAMES only', dd.rowsAll.map(r => r.last + '~' + r.exp).join(', '));
    ok(/\s/.test(dd.closed), 'the closed box keeps the full name', dd.closed);
    await page.keyboard.press('Escape');
    await page.evaluate(() => document.querySelectorAll('.zpb-pickmenu.zpb-open').forEach(m => m.classList.remove('zpb-open')));
  }
  // J · the front is gone from the editor
  const noFront = await page.evaluate(() => {
    const ed = document.getElementById('lineupPre');
    return { frontpick: ed ? ed.querySelectorAll('.zpb-frontpick').length : -1, advice: !!document.querySelector('[id$="Advice"]') };
  });
  ok(noFront.frontpick === 0 && !noFront.advice, 'the squares/triangles front is gone from the lineup board', JSON.stringify(noFront));
  // L · stage an RB1/RB2 swap via the dropdowns' own surgery
  const stage1 = await page.evaluate(() => {
    const roster = draftSim.rosters.find(r => r.isUser);
    window.__rb1Before = roster.slots['RB1'] ? roster.slots['RB1'][0] : null;
    window.__rb2Name = roster.slots['RB2'] ? roster.slots['RB2'][0] : null;
    return { rb1: window.__rb1Before, rb2: window.__rb2Name };
  });
  // open the RB1 dropdown and pick the RB2 occupant — the real UI path
  const swapped = await page.evaluate(() => {
    const host = document.getElementById('lineupPre');
    const wrap = host.querySelector('.zpb-pickwrap'); // the first pick list rides the KR row... find the RB1 one instead
    const btns = [...host.querySelectorAll('.zpb-pickbtn')];
    let target = null;
    btns.forEach(b => { const sel = b.closest('.depth-row'); if (sel && sel.querySelector('.slotname') && sel.querySelector('.slotname').textContent.trim() === 'RB1') target = b; });
    if (!target) return { hit: false };
    target.click();
    const row = [...document.querySelectorAll('.zpb-pickmenu.zpb-open .zpb-pickrow')].find(r => r.title === window.__rb2Name);
    if (!row) { document.querySelectorAll('.zpb-pickmenu.zpb-open').forEach(m => m.classList.remove('zpb-open')); return { hit: false, open: [...document.querySelectorAll('.zpb-pickmenu.zpb-open .zpb-pickrow')].map(r => r.title).slice(0, 5) }; }
    row.click();
    return { hit: true };
  });
  ok(swapped.hit, 'an RB1/RB2 swap stages through the dropdown', JSON.stringify(swapped));
  const btns = await page.evaluate(() => {
    const ac = document.getElementById('lineupPreApplyChanges');
    return { label: ac ? ac.textContent.trim() : null, model: !!document.getElementById('lineupPreModel'), undoHidden: document.getElementById('lineupPreUndo') ? document.getElementById('lineupPreUndo').style.display === 'none' : null };
  });
  ok(btns.label === 'APPLY THE CHANGES (2)', 'the pending count shows on APPLY THE CHANGES', btns.label);
  ok(btns.model, 'RETURN TO MODEL LINEUP sits beside APPLY THE CHANGES');
  ok(btns.undoHidden === true, 'UNDO waits hidden until a move is applied');
  await page.evaluate(() => { document.getElementById('lineupPreApplyChanges').click(); });
  await page.waitForTimeout(800);
  const afterApply = await page.evaluate(() => ({
    undoShown: document.getElementById('lineupPreUndo') ? document.getElementById('lineupPreUndo').style.display !== 'none' : false,
    modelShown: document.getElementById('lineupPreModel') ? document.getElementById('lineupPreModel').style.display !== 'none' : false
  }));
  ok(afterApply.undoShown, 'UNDO appears after an applied move');
  ok(afterApply.modelShown, 'RETURN TO MODEL LINEUP appears once the lineup leaves the model');
  await page.evaluate(() => { document.getElementById('lineupPreUndo').click(); });
  await page.waitForTimeout(700);
  const afterUndo = await page.evaluate(() => {
    const roster = draftSim.rosters.find(r => r.isUser);
    return { rb1: roster.slots['RB1'] ? roster.slots['RB1'][0] : null, undos: (roster._zpbUndo || []).length };
  });
  ok(afterUndo.rb1 === stage1.rb1, 'UNDO restored the most recent applied move (RB1 back)', afterUndo.rb1 + ' vs ' + stage1.rb1);
  // K · the staged formation
  const formBefore = await page.evaluate(() => ({ z34: !!window.ZPB34, saved: localStorage.getItem('zpb:base34') }));
  await page.evaluate(fb => {
    const want = fb.z34 ? '43' : '34';
    const b = [...document.querySelectorAll('.zpb-basetoggle button')].find(x => x.dataset.zbase === want);
    if (b) b.click();
  }, formBefore);
  await page.waitForTimeout(400);
  const formStaged = await page.evaluate(() => ({ staged: window.zpbStagedForm, z34: !!window.ZPB34, label: (document.getElementById('lineupPreApplyChanges') || {}).textContent }));
  ok(formStaged.staged !== null && formStaged.staged !== formStaged.z34, 'the formation click STAGES (nothing commits yet)', JSON.stringify(formStaged));
  ok((await page.evaluate(() => localStorage.getItem('zpb:base34'))) === formBefore.saved, 'localStorage does not move before APPLY THE CHANGES');
  await page.evaluate(() => { const ac = document.getElementById('lineupPreApplyChanges'); if (ac) ac.click(); });
  await page.waitForTimeout(800);
  const formAfter = await page.evaluate(() => ({ z34: !!window.ZPB34, saved: localStorage.getItem('zpb:base34'), dt2: LABELS.DT2 }));
  ok(formAfter.z34 !== formBefore.z34 || formAfter.saved !== formBefore.saved, 'APPLY THE CHANGES saved the formation preference', JSON.stringify(formAfter));
  ok((formAfter.dt2 === 'OLB1') === formAfter.z34, 'the depth-chart labels follow the saved formation', formAfter.dt2);
  // RETURN TO MODEL LINEUP after a real applied diff
  await page.evaluate(() => {
    const roster = draftSim.rosters.find(r => r.isUser);
    const st = zpbStageOf(roster);
    const a = st.map['RB1'];
    if (a) zpbStageMove(st, a[0], 'RB2');
  });
  await page.evaluate(() => { document.getElementById('lineupPreApplyChanges').click(); });
  await page.waitForTimeout(700);
  const modelBtn = await page.evaluate(() => { const m = document.getElementById('lineupPreModel'); if (m && m.style.display !== 'none') { m.click(); return true; } return false; });
  await page.waitForTimeout(700);
  const modelState = await page.evaluate(() => {
    const roster = draftSim.rosters.find(r => r.isUser);
    const best = lineupAdvice(roster).best;
    let same = true;
    ROSTER_SLOTS.forEach(sl => { if ((roster.slots[sl] && roster.slots[sl][0]) !== (best[sl] && best[sl][0])) same = false; });
    return { same };
  });
  ok(modelBtn, 'RETURN TO MODEL LINEUP was clickable');
  ok(modelState.same, 'RETURN TO MODEL LINEUP restored the math\'s lineup');
  await page.evaluate(() => { if (window.ZPB34) zpbToggleBase34(false); window.zpbStagedForm = null; try{ localStorage.setItem('zpb:base34',''); }catch(e){} });
  // leave the preseason page for the week-1 plan
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2'); if (b) b.click(); });
  await page.waitForTimeout(800);

  // ---------- H · the during-game dark ink ----------
  console.log('H · the during-game dark ink');
  await setTheme('dark'); await page.waitForTimeout(300);
  await page.evaluate(() => { window.__zpbSilent = false; try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} });
  await page.evaluate(() => { try{ if(!seasonState.weekSimulated) simulateCurrentWeek(); }catch(e){ window.__simW = String(e); } });
  await page.waitForTimeout(700);
  await page.evaluate(() => { try{
    document.querySelector('.zpb-replay-ov')?.remove();
    const user = seasonUserTeam();
    const g = seasonState.schedule.filter(x => x.played && (x.home === user || x.away === user)).pop();
    if (g && g.result && g.result.homeEvents && g.result.homeEvents.length) zpbGameReplay(g, user);
  }catch(e){ window.__rep = String(e); } });
  let during = null;
  for (let t = 0; t < 12 && !(during && during.abbrs.length); t++) {
    await page.waitForTimeout(800);
    during = await page.evaluate(() => {
      const user = seasonUserTeam();
      const pk = zpbPackFor(user);
      const abbrs = [...document.querySelectorAll('.zrl-team')].map(el => ({ t: el.textContent.trim(), c: getComputedStyle(el).color }));
      return { user, txMd: pk.txMd, txd: pk.txd, abbrs: abbrs.slice(0, 5), ov: !!document.querySelector('.zpb-replay-ov'), repErr: window.__rep || null };
    });
  }
  ok(during.txMd && during.txMd !== during.txd, 'the dark halfway ink exists and differs from the old cream', during.txMd + ' vs ' + during.txd);
  const teamAbbrs = during.abbrs.filter(a => a.c === during.txMd);
  ok(during.abbrs.length > 0 && teamAbbrs.length > 0, 'the during-game abbreviations wear their own halfway ink', JSON.stringify({ n: during.abbrs.length, ov: during.ov, repErr: during.repErr, abbrs: during.abbrs.slice(0, 3) }));
  await shot(page, 'w47-during-dark.png');
  await page.evaluate(() => { try{ document.querySelector('.zpb-replay-ov')?.remove(); }catch(e){} try{ document.querySelector('.zpb-prematch')?.remove(); }catch(e){} });

  // ---------- M · SIM PLAYOFFS ----------
  console.log('M · SIM PLAYOFFS');
  await page.evaluate(() => { try{ simRestOfSeason(); }catch(e){ window.__se2 = String(e); } try{ renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody')); }catch(e){ window.__se3 = String(e); } });
  await page.waitForTimeout(1200);
  const phase = await page.evaluate(() => seasonState && seasonState.phase);
  ok(phase === 'regularReview', 'the season reaches the review', String(phase));
  const made = await page.evaluate(() => { const u = seasonUserTeam(); const all = seasonState.seeds.AFC.concat(seasonState.seeds.NFC); return all.some(s => s.team === u); });
  await page.evaluate(() => { const b = document.getElementById('simPlayoffsBtn'); if (b) b.click(); });
  await page.waitForTimeout(1300);
  const mid = await page.evaluate(() => ({ replay: !!document.querySelector('.zpb-replay-ov'), porun: !!document.querySelector('.zpb-porun'), card: (document.querySelector('.zpb-porun-big') || {}).textContent || null }));
  ok(!mid.replay, 'no during-game interrupt while the playoffs sim', JSON.stringify(mid));
  if (made) ok(mid.porun && !!mid.card, 'the round cinematics play for the user\'s run', JSON.stringify(mid));
  await shot(page, 'w47-porun.png');
  await page.waitForTimeout(13000);
  const end = await page.evaluate(() => ({ porun: !!document.querySelector('.zpb-porun'), sbfin: !!document.querySelector('.zpb-sbfin'), champ: seasonState.champion, hold: window.__zpbPoRunHold }));
  ok(!end.porun, 'the run cinematics fade out');
  ok(made ? end.sbfin : true, 'the Super Bowl stage follows the run', JSON.stringify(end));
  ok(!!end.champ, 'the champion is decided', String(end.champ));
  await shot(page, 'w47-sbfin.png');

  // ---------- N/O/B · the review page ----------
  console.log('N/O/B · the season review page');
  await page.evaluate(() => { try{ document.querySelector('.zpb-sbfin .zpb-sbfin-go')?.click(); }catch(e){} });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  const noSentence = await page.evaluate(() => !document.body.textContent.includes('Awards, stats, your report card'));
  ok(noSentence, 'B · the topbar sentence is gone');
  const awards = await page.evaluate(() => ({
    uslines: [...document.querySelectorAll('.zpb-usline')].slice(0, 4).map(e => e.textContent.trim()),
    bdg: [...document.querySelectorAll('.zpb-awcard .zpb-bdgrow')].slice(0, 6).map(e => e.textContent.trim()),
    statChips: [...document.querySelectorAll('.zpb-awcard')].filter(c => /Yards|Touchdowns/i.test(c.textContent)).slice(0, 3).map(c => ({ hasChips: !!c.querySelector('.zpb-schip'), plain: /yds,/.test(c.textContent) })),
    aplog: document.querySelectorAll('.zpb-aplog img').length
  }));
  const noHonors = await page.evaluate(() => /No .* players earned league-wide honors/.test(document.body.textContent));
  ok(awards.uslines.length > 0 || noHonors, 'the honor lines sit indented on their own lines (or the roster earned none)', awards.uslines.join(' | ').slice(0, 90) || 'no honors this year');
  ok(awards.bdg.length >= 3, 'the award reasons wear badges', awards.bdg.join(' | ').slice(0, 130));
  const opoyB = awards.bdg.find(b => /RTG/.test(b) && /#/.test(b));
  ok(!!opoyB, 'the OPOY badges read [#1 …] and [RTG …]', opoyB || '');
  const coyB = awards.bdg.find(b => /PROJ W/.test(b));
  ok(!!coyB, 'the COY badges read [PROJ W …] and [W …]', coyB || '');
  const dpoyB = awards.bdg.find(b => /RTG/.test(b) && !/#/.test(b) && !/PROJ/.test(b));
  ok(!!dpoyB && !/EDGE/.test(dpoyB), 'the DPOY badges carry the depth-chart spot (no EDGE)', dpoyB || '');
  ok(awards.statChips.length > 0 && awards.statChips.every(c => c.hasChips && !c.plain), 'the statistical champions wear badges, not plaintext', JSON.stringify(awards.statChips));
  ok(awards.aplog > 6, 'the honor chips lead with crests, not team names', 'imgs=' + awards.aplog);
  await shot(page, 'w47-awards-dark.png');
  // O · the box score final column — the SB recap panel (renderGameResultHTML) on the complete view
  await page.evaluate(() => { const b = document.getElementById('backToSbBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  const ls = await page.evaluate(() => {
    const t = document.querySelector('table.linescore');
    if (!t) return null;
    const last = t.querySelector('tbody tr td:last-child');
    const other = t.querySelector('tbody tr td:nth-child(2)');
    return { last: getComputedStyle(last).color, other: getComputedStyle(other).color };
  });
  ok(!!ls && ls.last === ls.other, 'the final column reads the same faded tone as the rest of the box score', JSON.stringify(ls));
  await shot(page, 'w47-recap-dark.png');

  console.log('Q · page errors');
  ok(errors.length === 0, 'zero page/console errors across the whole drive', errors.slice(0, 4).join(' || '));
  console.log(`\nw47_live: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
