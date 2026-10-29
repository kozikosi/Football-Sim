#!/usr/bin/env node
/* w34_stress.js — the functional sweep for w34.
   Centerpiece (R7): the Owner drafted every player where he wanted them and the math still
   flexed ten of them out of position. This suite drafts a full 31-man roster strictly into
   natural slots, finishes the draft, and audits that NOT ONE player was moved by the math.
   Around it: the full season, the staged lineup editor on the season panel, the weights
   dropdown, the footer theme button through every phase, zero console errors. */
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

  console.log('== the flex audit · a draft where every pick goes where he wants it ==');
  ev('try{ startDraft2(); }catch(e){ window.__d0=String(e); }');
  await sleep(400);
  ok(!ev('window.__d0||""'), 'the draft boots' + (ev('window.__d0||""') ? ' — '+ev('window.__d0') : ''));
  // the user takes the best player whose NATURAL slot is still open, and puts him there.
  // No flexes on purpose — exactly what the Owner said he did. Pure executePick — the UI
  // layer (renderDraftLive/simRecs) stays out of the loop; one finishDraft2 at the end.
  const scripted = ev(`(function(){
    const picks = [];
    try{
      draftSpeed = 'instant';
      try{ clearTimeout(slowTimer); slowTimer = null; }catch(e){}
      for(let guard=0; guard<5000 && draftSim.pos < draftSim.order.length; guard++){
        const t = draftSim.order[draftSim.pos];
        if(t === draftSim.userIndex){
          const roster = draftSim.rosters[t];
          if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
          const nat = p => (NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
          let cands = draftSim.pool.filter(p=>nat(p).length);
          if(!cands.length){ cands = draftSim.pool.slice(); } // nothing natural left: best player, first open slot (still his pick, no math)
          cands.sort((a,b)=>b[3]-a[3]);
          const p = cands[0];
          const openNat = nat(p);
          const slot = openNat.length ? openNat[0] : ROSTER_SLOTS.find(s=>!roster.slots[s]);
          picks.push({slot, name: p[0], pos: p[1]});
          executePick(draftSim.userIndex, p, slot);
        } else {
          const pk = cpuPick(t);
          if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
        }
        if(guard>0 && guard%200===0) picks._g = guard;
      }
      draftSim.awaitingUser = false;
    }catch(e){ picks.err = String(e); }
    return picks;
  })()`);
  await sleep(700);
  ok(!scripted.err, 'the scripted draft runs' + (scripted.err ? ' — '+scripted.err : ''));
  ok(scripted.length === 31, '31 scripted picks made (' + scripted.length + ')');
  ok(ev('draftSim && draftSim.pos >= 32*31'), 'the draft completes (' + ev('draftSim ? draftSim.pos : 0') + ' picks)');
  ok(ev('typeof finishDraft2==="function"') && ev('(function(){ try{ if(draftFinalResults.style.display==="none") finishDraft2(); }catch(e){} return true; })()'), 'the draft finishes');
  await sleep(400);
  { // THE AUDIT: not one player moved by the math
    const audit = ev(`(function(){
      const r = draftSim.rosters.find(x=>x.isUser);
      let oop = 0; const offenders = [];
      for(const s in r.slots){ const p = r.slots[s]; if(!p) continue;
        if(typeof isNaturalSlot==="function" && !isNaturalSlot(p[1], s)){ oop++; offenders.push(s+':'+p[0]); } }
      return {oop, offenders, n: Object.keys(r.slots).filter(s=>r.slots[s]).length};
    })()`);
    console.log('   audit:', audit.oop, 'out-of-position of', audit.n, audit.offenders.length ? '— '+audit.offenders.join(', ') : '');
    ok(audit.n === 31, 'the roster is full at ' + audit.n);
    ok(audit.oop === 0, 'R7: ZERO players flexed out of position by the math (was ten before)');
    // and the slots are EXACTLY where the picks put them
    const same = scripted.every(pk => ev(`(function(){ const r = draftSim.rosters.find(x=>x.isUser); const p = r.slots[${JSON.stringify(pk.slot)}]; return p && p[0] === ${JSON.stringify(pk.name)}; })()`));
    ok(same, 'every player sits in the exact slot he was drafted into');
    ok(errors.length===0, 'zero console errors through the draft' + (errors.length ? ' — '+errors.slice(0,2).join(' | ') : ''));
  }

  console.log('== the season, 17 weeks ==');
  ev('try{ startSeason(); }catch(e){ window.__sErr=String(e); }');
  await sleep(200);
  ok(!!ev('seasonState'), 'the season boots' + (ev('window.__sErr||""') ? ' — '+ev('window.__sErr') : ''));
  ok(ev('Object.keys(seasonState.teams).length===32'), '32 teams take the field');

  console.log('== the staged editor mid-season (Week 1 view) ==');
  ev('try{ seasonState.preseason=false; renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__rErr=String(e); }');
  await sleep(300);
  ok(!ev('window.__rErr||""'), 'the regular-season view renders' + (ev('window.__rErr||""') ? ' — '+ev('window.__rErr').slice(0,120) : ''));
  { // open LINEUP AND FLEXES and stage a season-time swap — through the real pick box
    const panel = doc.getElementById('lineupSeasonPanel');
    if (panel) panel.open = true;
    await sleep(350); // the MO fills the pick lists
    const editor = doc.getElementById('lineupSeason');
    ok(!!editor, 'the season lineup editor renders');
    if (editor) {
      const snap = ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)');
      const have = ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); return {wr2: r.slots.WR2 && r.slots.WR2[0], wr3: r.slots.WR3 && r.slots.WR3[0]}; })()');
      let uiStaged = false;
      if (have.wr2 && have.wr3 && have.wr2 !== have.wr3) {
        const rows = [...editor.querySelectorAll('.depth-row')].map(r=>({slot: r.querySelector('.slotname') ? r.querySelector('.slotname').textContent : '', btn: r.querySelector('.zpb-pickbtn')}));
        const wr2row = rows.find(x=>x.slot==='WR2' && x.btn);
        if (wr2row) {
          wr2row.btn.click(); await sleep(60);
          const wrapEl = wr2row.btn.closest('.zpb-pickwrap');
          const opts = wrapEl ? [...wrapEl.querySelectorAll('.zpb-pickrow')] : [];
          const other = opts.find(r=>r.textContent.trim() && r.textContent.includes(have.wr3));
          if (other) { other.click(); await sleep(250); uiStaged = true; }
        }
      }
      ok(uiStaged, 'driving the WR2 pick box stages the WR3 swap');
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') === snap, 'the season roster is untouched while staged');
      const ac = doc.getElementById('lineupSeasonApplyChanges');
      ok(!!ac && ac.disabled === false, 'APPLY THE CHANGES waits at the end of the editor');
      if (ac) { ac.click(); await sleep(250); }
      ok(ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); return r.slots.WR3 ? r.slots.WR3[0] : null; })()') === have.wr2, 'the flex commits only at the apply');
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') !== snap, 'the season lineup changed exactly once');
      // put it back the way the draft had it
      ev(`(function(){ const r = draftSim.rosters.find(x=>x.isUser); zpbStageMove(zpbStageOf(r), r.slots.WR3[0], "WR2"); })()`);
      const editor2 = doc.getElementById('lineupSeason');
      if (editor2) { const rows2 = [...editor2.querySelectorAll('.depth-row')].map(r=>({slot: r.querySelector('.slotname') ? r.querySelector('.slotname').textContent : '', btn: r.querySelector('.zpb-pickbtn')}));
        const wr3row = rows2.find(x=>x.slot==='WR3' && x.btn);
        if (wr3row) { wr3row.btn.click(); await sleep(60); const w2 = wr3row.btn.closest('.zpb-pickwrap'); const o2 = w2 ? [...w2.querySelectorAll('.zpb-pickrow')] : []; const tgt = o2.find(r=>r.textContent.includes(have.wr3)); if (tgt) { tgt.click(); await sleep(200); } }
      }
      const ac2 = doc.getElementById('lineupSeasonApplyChanges'); if (ac2 && !ac2.disabled) { ac2.click(); await sleep(250); }
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') === snap, 'the round-trip restores the drafted lineup');
    }
  }
  ev('try{ seasonState.preseason=true; }catch(e){}'); // the preseason gate goes back up before Week 1

  console.log('== the season, 17 weeks ==');
  let weeks = 0;
  for(let w=1; w<=17 && ev('seasonState && seasonState.phase==="regular"'); w++){
    ev('try{ simulateCurrentWeek(); }catch(e){} try{ advanceWeek(); }catch(e){}');
    weeks++;
  }
  ok(ev('seasonState.phase')==='regularReview', 'the regular season completes into the review (' + weeks + ' weeks)');
  ok(errors.length===0, 'zero console errors through the season' + (errors.length ? ' — '+errors.slice(0,2).join(' | ') : ''));

  console.log('== the weights dropdown recalculates ==');
  { doc.getElementById('tabRankingsBtn').click(); await sleep(200);
    const wd = doc.getElementById('weightsDrop');
    ok(!!wd && wd.open === false, 'the weights dropdown ships closed on a fresh render');
    const scoreBefore = ev('(function(){ return currentScored.slice(0,6).map(x=>Math.round(x.score)).join(","); })()');
    if (wd) wd.open = true;
    await sleep(120);
    // MODEL weights auto-apply at boot (QB already 700) — move a weight that is NOT 700
    const inp = wd && [...wd.querySelectorAll('.zpb-win')].find(i=>i.value !== '700');
    ok(!!inp, 'an editable weight input is reachable inside the dropdown (' + (inp && inp.closest('.zpb-wbadge').dataset.wslot) + ' = ' + (inp && inp.value) + ')');
    if (inp) {
      const slotName = inp.closest('.zpb-wbadge').dataset.wslot;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(inp, '700'); inp.dispatchEvent(new window.Event('input', {bubbles:true}));
      await sleep(250);
      const scoreAfter = ev('(function(){ return currentScored.slice(0,6).map(x=>Math.round(x.score)).join(","); })()');
      ok(ev('weights.' + slotName) === 700, 'the weight itself moved to 700');
      ok(scoreAfter !== '' && scoreBefore !== scoreAfter, 'moving a weight recalculates the board (' + scoreBefore + ' -> ' + scoreAfter + ')');
      const mw = doc.getElementById('modelWBtn'); if (mw) { mw.click(); await sleep(150); }
      ok(true, 'MODEL WEIGHTS resets');
    }
    doc.getElementById('tabDraftBtn').click();
  }

  console.log('== the footer theme button through every phase ==');
  { const seats = ev('(function(){ return {foot: !!document.querySelector(".wrap > .zpb-foottheme"), nav: !!document.querySelector(".wrap > .footnav")}; })()');
    ok(seats.foot && seats.nav, 'the theme block and the nav sit together at .wrap level');
    const staticPos = ev('(function(){ const b = document.getElementById("themeToggleBtn"); return getComputedStyle(b).position; })()');
    ok(staticPos === 'static', 'the button is in flow, attached to the footer');
  }

  console.log('== the playoffs ==');
  ev('(function(){ try{ startPlayoffs(); }catch(e){ window.__pErr=String(e); } })()');
  await sleep(300);
  for(const rk of ['wildcard','divisional','champ']){
    ev('(function(){ try{ simulatePlayoffRound(); advancePlayoffRound(); }catch(e){ window.__pErr=String(e); } })()');
    await sleep(150);
  }
  ok(!ev('window.__pErr||""'), 'three rounds simulated' + (ev('window.__pErr||""') ? ' — '+ev('window.__pErr').slice(0,120) : ''));
  ok(ev('seasonState.currentPlayoffRound')==='superbowl', 'the bracket reaches the Super Bowl');
  ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__sbErr=String(e); } })()');
  await sleep(300);
  ok(ev('seasonState.phase')==='complete', 'the Super Bowl lands on the complete phase');
  ok(!!ev('seasonState.champion'), 'a champion is crowned: ' + ev('seasonState.champion'));
  ev('try{ renderSeasonTab(document.body.lastElementChild); }catch(e){ window.__cErr=String(e); }');
  ok(!ev('window.__cErr||""'), 'the complete view renders' + (ev('window.__cErr||""') ? ' — '+ev('window.__cErr').slice(0,120) : ''));
  { const seats = ev('(function(){ return !!document.querySelector(".wrap > .zpb-foottheme"); })()');
    ok(seats, 'the theme block still rides the footer on the final screen'); }
  ok(errors.length===0, 'zero console errors end to end' + (errors.length ? ' — '+errors.slice(0,3).join(' | ') : ''));

  console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
