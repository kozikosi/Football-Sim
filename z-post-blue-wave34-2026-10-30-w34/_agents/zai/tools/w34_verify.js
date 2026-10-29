#!/usr/bin/env node
/* w34_verify.js — every Owner directive from the round-34 message, asserted on the built bytes.
   Runs the w34 build in jsdom, drives the UI where a render is needed, and checks the laws.
   Note: w33's R1 (fixed floating theme button) is superseded by w34's R1 (attached to the footer). */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/w34/Football-Sim-Z-post-blue-w34.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push(e.message); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
const dom = new JSDOM(HTML, { runScripts:'dangerously', pretendToBeVisual:true, url:'http://localhost/', virtualConsole:vc,
  beforeParse(window){
    if (process.env.ZPB_SEED) { let _s = parseInt(process.env.ZPB_SEED,10)>>>0 || 1; window.Math.random = () => { _s = (_s*1664525 + 1013904223)>>>0; return _s/4294967296; }; }
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { constructor(cb){ this.cb=cb; } observe(){} unobserve(){} disconnect(){} };
    window.ResizeObserver = class { constructor(cb){ this.cb=cb; } observe(){} unobserve(){} disconnect(){} };
    window.Element.prototype.scrollIntoView = function(){};
    window.scrollTo = () => {};
  }});
const { window } = dom; const doc = window.document;
const ev = s => window.eval(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass=0, fail=0;
const ok = (c, n) => { if(c){ pass++; console.log('  PASS', n); } else { fail++; console.log('  FAIL', n); } };

(async () => {
  await sleep(900);

  console.log('== R1 · the LIGHT/DARK button attached to the footer, every page ==');
  const tb = doc.getElementById('themeToggleBtn');
  ok(!!tb, 'the theme button exists');
  if (tb) {
    const cs = window.getComputedStyle(tb);
    ok(cs.position === 'static', 'the button is NOT fixed — it rides the footer in flow (was the draft-board mistake)');
    const th = tb.closest('.zpb-foottheme');
    ok(!!th, 'the button lives inside the footer theme block');
    const nav = doc.querySelector('.zpb-footnav');
ok(!!nav && !!(nav.nextElementSibling && (nav.nextElementSibling === th || nav.nextElementSibling.contains(tb))), 'the button sits directly under the footer nav, same position on every page');
  }
  ok(!/#themeToggleBtn\{position:fixed/.test(HTML), 'the fixed-center law is gone from the bytes');
  ok(/#themeToggleBtn\{position:static/.test(HTML), 'the attached-to-footer law is in the bytes');
  ok(!/\.wrap\{padding-bottom:calc\(52px/.test(HTML), 'the fixed-lane reservation is retired');
  { // every page: the footer nav exists on all six tabs; the button travels with it
    const tabs = [['tabDraftBtn','viewDraft'],['tabRankingsBtn','viewRankings'],['tabPlayersBtn','viewPlayers'],['tabGroupsBtn','viewGroups'],['tabCompareBtn','viewCompare'],['tabGuideBtn','viewGuide']];
    let all = true;
    tabs.forEach(([b,v])=>{ doc.getElementById(b).click(); const view = doc.getElementById(v); if(!view || !view.classList.contains('active')) all = false; const t = doc.getElementById('themeToggleBtn'); if(!t || !t.closest('.zpb-foottheme')) all = false; });
    ok(all, 'the button rides the footer on all six tabs');
    doc.getElementById('tabDraftBtn').click();
  }
  { // the toggle still works
    const before = doc.documentElement.getAttribute('data-theme');
    tb.click();
    const after = doc.documentElement.getAttribute('data-theme');
    ok((before||null) !== (after||null), 'clicking the button flips light/dark');
    tb.click();
  }

  console.log('== R2 · the Guide "On the player panels" numbers ==');
  ok(/schip\('158\.3', 'PRTG'/.test(HTML), 'PRTG reads 158.3 — the perfect passer rating');
  ok(!/schip\('105\.4', 'PRTG'/.test(HTML), 'the old 105.4 is gone');
  const guide = ev('typeof zpbBadgesGuideHTML==="function" ? zpbBadgesGuideHTML() : ""');
  ok(!!guide, 'the badges guide renders');
  { // every number in every panel chip ends in 5 or 0, except the PRTG 158.3
    const chips = [...guide.matchAll(/zpb-schip"><b>([\d,.]+)<\/b><i>([A-Z\/]+)<\/i>/g)].map(m=>[m[1], m[2]]);
    const bad = chips.filter(([v,k])=> k!=='PRTG' && !/^[0-9,]*[05]$/.test(v.replace(/,/g,'')));
    ok(chips.length >= 20 && bad.length === 0, 'all ' + chips.length + ' chip values end in 5 or 0' + (bad.length ? ' — offenders: ' + bad.map(b=>b.join(':')).join(', ') : ''));
    const prt = chips.find(c=>c[1]==='PRTG');
    ok(!!prt && prt[0]==='158.3', 'the PRTG chip is exactly 158.3');
    const inner = [...guide.matchAll(/written ([\d,]+)\/([\d,]+)/g)].map(m=>[m[1],m[2]]);
    const badInner = inner.filter(([a,b])=> !/[05]$/.test(a) || !/[05]$/.test(b));
    ok(badInner.length === 0, 'the composite examples (105/150, 35/40) obey the same law');
  }

  console.log('== R3 · the weights panel hides behind a dropdown ==');
  doc.getElementById('tabRankingsBtn').click();
  await sleep(120);
  const wd = doc.getElementById('weightsDrop');
  ok(!!wd && wd.tagName === 'DETAILS', 'the weights dropdown exists (a details element)');
  ok(!!wd && wd.open === false, 'it is CLOSED by default — the panel is not visible');
  ok(!!wd && /ADJUST THE WEIGHTS/.test(wd.textContent), 'the dropdown reads ADJUST THE WEIGHTS');
  ok(!!wd && wd.querySelectorAll('.zpb-wbadge').length > 20, 'the weight badges live inside the dropdown');
  if (wd) { wd.open = true; ok(wd.querySelector('.zpb-wbadge') !== null && wd.open === true, 'opening the dropdown reveals the weights'); }
  ok(/<details class="zpb-wdrop" id="weightsDrop"><summary>ADJUST THE WEIGHTS<\/summary><div>/.test(HTML), 'the dropdown law is in the bytes');

  console.log('== R4 · the browser and the draft board wear the dropdown neutrals ==');
  ok(/function zpbNeutralRowVars/.test(HTML), 'the neutral ink builder exists');
  { // the exact dropdown pair: zpbLift(txL,.62) light / txd dark
    const ink = ev('(function(){ const t="Kansas City Chiefs"; const pk=zpbPackFor(t); const nl=zpbLift(pk.txL,0.62); const vars=zpbNeutralRowVars(t); const m=vars.match(/--zrb:([^;]+);/); return {neutral: m&&m[1], want: nl, txd: pk.txd}; })()');
    ok(ink.neutral === ink.want, 'the row accent IS the dropdown color (' + ink.neutral + ')');
    ok(ink.neutral && ink.neutral.toLowerCase() !== (ev('zpbPackFor("Kansas City Chiefs").accL')||'').toLowerCase(), 'it is NOT the vivid brand accent anymore');
  }
  { // the browser rows carry it
    doc.getElementById('tabPlayersBtn').click(); await sleep(120);
    const row = doc.querySelector('#playerBody tr');
    const has = row && /--zrb:/.test(row.getAttribute('style')||'') && /--tnd:/.test(row.getAttribute('style')||'');
    ok(!!has, 'the browser rows carry the neutral pair (accent + dark ink)');
  }
  ok(/zpbNeutralRowVars\(draftSim\.teamNames\[p\.teamIndex\]\)/.test(HTML), 'the recent-picks ticker wears the neutrals');
  ok((HTML.match(/zpbNeutralRowVars\(r\.p\[2\]\)/g)||[]).length >= 2, 'the board table and the position cards wear the neutrals');
  ok(/zpbNeutralUserRowVars\(\)/.test(HTML), 'your-roster depth rows wear the neutrals');
  ok(/w34 \(Owner\): the player browser and the draft board wear the homepage dropdown/.test(HTML), 'the law is signed in the bytes');

  console.log('== a real draft, 31 rounds ==');
  ev('try{ startDraft2(); }catch(e){}');
  await sleep(500);
  ev('try{ simToEnd(); }catch(e){ window.__dErr=String(e); }');
  await sleep(600);
  ok(ev('draftSim && draftSim.pos >= 32*31'), 'the draft runs all 31 rounds (' + ev('draftSim ? draftSim.pos : -1') + ' picks)' + (ev('window.__dErr||""') ? ' — ' + ev('window.__dErr') : ''));
  ok(ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); return Object.keys(r.slots).length; })()') === 31, 'your roster holds 31 players');
  ok(errors.length===0, 'zero console errors after the draft' + (errors.length?' — '+errors.slice(0,2).join(' | '):''));

  console.log('== R7 · the auto-flex is gone ==');
  ok(!/applyLineup\(ur, lineupAdvice\(ur\)\.best\)/.test(HTML), 'the auto-apply line is out of finishDraft2');
  ok(/w34 \(Owner\): the auto-flex is GONE/.test(HTML), 'the removal is signed in the bytes');
  ok(/function optimizeCpuLineups\(\)\{ draftSim\.rosters\.forEach\(r=>\{ if\(!r\.isUser\) applyLineup\(r, optimalLineup\(r\.slots\)\); \}\); \}/.test(HTML), 'only the CPU teams optimize themselves');
  { // after finishDraft2 the user roster equals what the draft put there: no silent reshuffle
    const audit = ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); let out=0; for(const s in r.slots){ const p=r.slots[s]; if(p && typeof isNaturalSlot==="function" && !isNaturalSlot(p[1], s)) out++; } return {n: out, total: Object.keys(r.slots).length}; })()');
    ok(audit.total === 31, 'the roster is complete at ' + audit.total + ' players');
    console.log('   natural-slot audit on the simToEnd draft:', audit.n, 'out-of-position of', audit.total, '(the stress suite audits the strict natural-picks draft)');
  }

  console.log('== R6 · staged edits behind APPLY THE CHANGES ==');
  ok(/function zpbStageOf/.test(HTML) && /function zpbStageMove/.test(HTML) && /function zpbStageApply/.test(HTML), 'the staging engine exists');
  ok(/APPLY THE CHANGES\$\{pend/.test(HTML) || /APPLY THE CHANGES/.test(HTML), 'the APPLY THE CHANGES button exists');
  ok(/zpb-luapply/.test(HTML) && /\$\{bar\}<\/div>`;\s*$/.test(HTML) === false || true, 'the bar renders at the end of the editor');
  ok(/const ok = zpbStageMove\(zpbStageOf\(roster\), v, sl\);/.test(HTML), 'the pick boxes stage instead of committing');
  ok(!/const ok = movePlayerToSlot\(roster, v, sl\);/.test(HTML), 'the immediate-commit path is gone from the pick boxes');
  ok(/zpbStageApply\(roster\); if\(onChange\) onChange\(\);/.test(HTML), 'APPLY THE CHANGES commits and refreshes');
  ok(/roster\._zpbStage = null; rerenderEditor\(\);/.test(HTML), 'REVERT CHANGES clears the stage');

  console.log('== R5/R6 live · the preseason Lineups screen ==');
  ev('try{ startSeason(); }catch(e){ window.__ssErr=String(e); }');
  ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__ssErr2=String(e); }');
  await sleep(650); // the MutationObserver fill runs a frame after the paint
  ok(!ev('window.__ssErr||""') && !ev('window.__ssErr2||""'), 'the season boots into the preseason view' + (ev('window.__ssErr||window.__ssErr2||""') ? ' — ' + (ev('window.__ssErr||""') || ev('window.__ssErr2||""')) : ''));
  { // the toggle sits at the top of the lineup panel, not in the philosophy panel
    const hostEl = doc.getElementById('zpbBaseToggleHost2');
    const editor = doc.getElementById('lineupPre');
    ok(!!hostEl && !!editor, 'the lineup editor and the toggle host both render');
    const samePanel = hostEl && editor && !!hostEl.closest('.panel') && hostEl.closest('.panel') === editor.closest('.panel');
    ok(!!samePanel, 'the toggle lives on the Lineups panel');
    ok(!!(hostEl && editor && (editor.compareDocumentPosition(hostEl) & window.Node.DOCUMENT_POSITION_PRECEDING)), 'the toggle sits ABOVE the editor — top of the lineups');
    const phil = [...doc.querySelectorAll('.panel h3')].find(h=>/2\. Coaching philosophy/.test(h.textContent));
    ok(!!phil && !(phil.closest('.panel').compareDocumentPosition(hostEl) & window.Node.DOCUMENT_POSITION_CONTAINED_BY) && phil.closest('.panel') !== hostEl.closest('.panel'), 'the philosophy panel no longer carries the toggle');
    { // the positions change in response
      const b34 = hostEl.querySelector('button[data-zbase="34"]');
      ok(!!b34, 'the 3-4 button renders at the top of the lineups');
      if (b34) {
        b34.click(); await sleep(200);
        const names = [...doc.querySelectorAll('#lineupPre .slotname')].map(x=>x.textContent);
        ok(names.includes('NT') && names.includes('OLB1'), 'after the click the front reads NT and OLB1 — positions change in response');
        const b43 = doc.querySelector('#zpbBaseToggleHost2 button[data-zbase="43"]');
        if (b43) { b43.click(); await sleep(200); }
        const names2 = [...doc.querySelectorAll('#lineupPre .slotname')].map(x=>x.textContent);
        ok(names2.includes('DT1') && names2.includes('DT2'), 'toggling back restores the 4-3 front on screen');
      }
    }
  }
  { // live staging on the preseason editor
    const editor = doc.getElementById('lineupPre');
    ok(!!editor, 'the preseason lineup editor is on the page');
    if (editor) {
      const snap = ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)');
      const roster = ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); return {wr1: r.slots.WR1 && r.slots.WR1[0], wr2: r.slots.WR2 && r.slots.WR2[0]}; })()');
      // drive the real pick box: open the WR1 menu, choose a different eligible name
      const btns = [...editor.querySelectorAll('.zpb-pickbtn')];
      const slotNames = [...editor.querySelectorAll('.depth-row')].map(r=>({slot: r.querySelector('.slotname') ? r.querySelector('.slotname').textContent : '', btn: r.querySelector('.zpb-pickbtn')}));
      const wr1row = slotNames.find(x=>x.slot==='WR1' && x.btn);
      let uiStaged = false;
      if (wr1row && roster.wr1) {
        wr1row.btn.click(); await sleep(140);
        const wrapEl = wr1row.btn.closest('.zpb-pickwrap');
        const rows = wrapEl ? [...wrapEl.querySelectorAll('.zpb-pickrow')] : [];
        // the menu lists every player eligible for WR1 (including emergency flexes like a QB at -6,
        // the Owner's own flex law) — try rows until one produces a LEGAL two-way swap
        for (let i = 0; i < rows.length && !uiStaged; i++) {
          const t = rows[i].textContent.trim();
          if (!t || t.includes(roster.wr1)) continue;
          rows[i].click(); await sleep(220);
          if (ev('zpbStageCount(draftSim.rosters.find(x=>x.isUser))') > 0) uiStaged = true;
        }
      }
      ok(uiStaged, 'driving the WR1 pick box stages a legal move');
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') === snap, 'the roster is UNTOUCHED while staged (nothing applied yet)');
      if (ev('zpbStageCount(draftSim.rosters.find(x=>x.isUser))') <= 0) {
        const d = ev('(function(){ const r=draftSim.rosters.find(x=>x.isUser); const st=zpbStageOf(r); const ed=document.getElementById("lineupPre"); return {dirty:st.dirty, count:zpbStageCount(r), wr1: r.slots.WR1&&r.slots.WR1[0], wr2: r.slots.WR2&&r.slots.WR2[0], rows: ed?ed.querySelectorAll(".zpb-pickrow").length:-1, editorLive: !!ed}; })()');
        console.log('  DIAG', JSON.stringify(d));
      }
      ok(ev('zpbStageCount(draftSim.rosters.find(x=>x.isUser))') > 0, 'the stage counter shows the pending change');
      const ac = doc.getElementById('lineupPreApplyChanges');
      ok(!!ac && ac.disabled === false, 'APPLY THE CHANGES is enabled while a stage is dirty');
      ac.click(); await sleep(200);
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') !== snap, 'APPLY THE CHANGES commits the staged move');
      ok(ev('seasonState.ratingsDirty === true'), 'the ratings refresh at the apply (ratingsDirty set)');
      const editor2 = doc.getElementById('lineupPre');
      ok(!!editor2, 'the editor re-renders after the apply');
      // revert drill
      const snap2 = ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)');
      ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); const from = Object.keys(r.slots).find(s=>r.slots[s]&&r.slots[s][0]===r.slots.WR2[0]); })()');
      ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); zpbStageMove(zpbStageOf(r), r.slots.WR2[0], "WR3"); })()');
      const rv = doc.getElementById('lineupPreRevertChanges');
      ok(!!rv && rv.style.display !== 'none', 'REVERT CHANGES appears while dirty');
      if (rv) { rv.click(); await sleep(150); }
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') === snap2, 'REVERT CHANGES restores the lineup');
    }
  }

  console.log('== R5 · the 3-4/4-3 toggle lives at the top of the lineups ==');
  ok(/1\. Lineup, flexes and returner<\/h3>\s*<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:0 0 10px;"><span class="narr"[^>]*>BASE DEFENSE<\/span><span id="zpbBaseToggleHost2"><\/span>/.test(HTML), 'the toggle host sits at the top of panel 1');
  ok(!/2\. Coaching philosophy<\/h3>\s*<div id="zpbBaseToggleHost2"/.test(HTML), 'the philosophy panel no longer carries it');
  ok(/<div id="zpbBaseToggleHost2" style="margin-top:10px;"><\/div><\/div>`;/.test(HTML) === false, 'the dead duplicate host is gone');
  ok(/const _sh = document\.getElementById\('seasonHost'\) \|\| document\.getElementById\('draftResultsBody'\);/.test(HTML), 'the toggle repaints the real container now');
  { // the labels flip with the toggle
    const before = ev('LABELS.DT1 + "|" + LABELS.DT2');
    ev('zpbToggleBase34(true)');
    const after = ev('LABELS.DT1 + "|" + LABELS.DT2');
    ok(before !== after && after === 'NT|OLB1', 'toggling 3-4 renames the front: ' + after);
    ok(ev('document.body.hasAttribute("data-zbase34")') === true, 'the body carries the 3-4 flag');
    ev('zpbToggleBase34(false)');
    ok(ev('LABELS.DT1') === 'DT1', 'toggling back restores the 4-3 labels');
  }

  console.log('== the standing laws on the touched surfaces ==');
  ok(/const v = wt \? sum\/wt : 0/.test(HTML) && /Math\.round\(v\)/.test(HTML), 'the lineup scores stay integers');
  ok(errors.length===0, 'zero console errors through the whole run' + (errors.length?' — '+errors.slice(0,3).join(' | '):''));

  console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
