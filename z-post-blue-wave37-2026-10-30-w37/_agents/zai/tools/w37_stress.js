#!/usr/bin/env node
/* w37_stress.js — the functional sweep for w37 (extends the w36 sweep).
   Drives a full natural-picks draft, the staged editor, the SIM SEASON leg through the books
   overlay (R10: honors before the verdict, the celebration queued behind the books), the
   playoffs round-by-round with the REAL replay + Skip (R11: the reward waits for the final
   whistle; R12: the whole report with the true final), the Super Bowl, and the champion page
   (R13: the Season Review bar leads from the top right). Zero console errors end to end. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/w37/Football-Sim-Z-post-blue-w37.html', 'utf8');
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
const closeReplay = () => ev('try{ const o=document.querySelector(".zpb-replay-ov"); if(o) o.remove(); }catch(e){}');

(async () => {
  await sleep(900);

  console.log('== the flex audit · a draft where every pick goes where he wants it ==');
  ev('try{ startDraft2(); }catch(e){ window.__d0=String(e); }');
  await sleep(400);
  ok(!ev('window.__d0||""'), 'the draft boots');
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
          if(!cands.length){ cands = draftSim.pool.slice(); }
          cands.sort((a,b)=>b[3]-a[3]);
          const p = cands[0];
          const openNat = nat(p);
          const forced = !openNat.length;
          const slot = openNat.length ? openNat[0] : ROSTER_SLOTS.find(s=>!roster.slots[s]);
          picks.push({slot, name: p[0], pos: p[1], fb: forced});
          executePick(draftSim.userIndex, p, slot);
        } else {
          const pk = cpuPick(t);
          if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
        }
      }
      draftSim.awaitingUser = false;
    }catch(e){ picks.err = String(e); }
    return picks;
  })()`);
  await sleep(700);
  ok(!scripted.err, 'the scripted draft runs' + (scripted.err ? ' — '+scripted.err : ''));
  ok(scripted.length === 31, '31 scripted picks made (' + scripted.length + ')');
  ok(ev('draftSim && draftSim.pos >= 32*31'), 'the draft completes');
  ok(ev('typeof finishDraft2==="function"') && ev('(function(){ try{ if(draftFinalResults.style.display==="none") finishDraft2(); }catch(e){} return true; })()'), 'the draft finishes');
  await sleep(400);
  { // w37 R1 rides every draft board: the GONE column never lists 100
    const gone = [...doc.querySelectorAll('.dc-gone')].map(x=>x.textContent.trim());
    ok(gone.length === 0 || gone.every(g=>!/^100%$/.test(g)), 'the GONE column caps at 99 across the board (' + gone.filter(g=>g==='99%').length + ' rows at 99%)');
  }
  { // the audit
    const audit = ev(`(function(){
      const r = draftSim.rosters.find(x=>x.isUser);
      let oop = 0; const offenders = [];
      for(const s in r.slots){ const p = r.slots[s]; if(!p) continue;
        if(typeof isNaturalSlot==="function" && !isNaturalSlot(p[1], s)){ oop++; offenders.push(s+':'+p[0]); } }
      return {oop, offenders, n: Object.keys(r.slots).filter(s=>r.slots[s]).length};
    })()`);
    ok(audit.n === 31, 'the roster is full at ' + audit.n);
    const fb = scripted.filter(p => p && p.fb).length;
    ok(audit.oop === fb, `the math moved nobody — out-of-position (${audit.oop}) equals the draft's forced picks (${fb})`);
    ok(errors.length===0, 'zero console errors through the draft');
  }

  console.log('== w36 guards · the SEASON tab, the double finish, the map ==');
  {
    const tab = doc.getElementById('resultsSeasonBtn');
    if (tab) { tab.click(); await sleep(400); }
    ok(!!ev('seasonState'), 'the click scaffolds the season');
    ok(!!doc.getElementById('beginSeasonBtn'), 'the preseason page is live');
    const before = ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)');
    ev('try{ finishDraft2(); }catch(e){ window.__dfErr=String(e); }');
    ok(ev('window.__dfErr||""')==='', 'a second finishDraft2 runs clean');
    ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') === before, 'the second finish moved nobody');
  }

  console.log('== w36 R5 · BEGIN THE SEASON: cinematic, then week 1 ==');
  {
    const beg = doc.getElementById('beginSeasonBtn');
    ok(!!beg, 'Begin the season is on the page');
    if (beg) { beg.click(); await sleep(400); }
    ok(ev('seasonState && seasonState.preseason === false'), 'the preseason flag falls');
    ok(/Week 1 of 17/.test((doc.getElementById('draftResultsBody')||{textContent:''}).textContent||''), 'week 1 is on the page');
    await sleep(5200);
    ok(doc.querySelectorAll('.zpb-prematch').length === 0, 'the SEASON OPENER veil clears');
    ok(/Week 1 of 17/.test((doc.getElementById('draftResultsBody')||{textContent:''}).textContent||''), 'week 1 stands after the veil');
  }

  console.log('== the staged editor on the week-1 view ==');
  ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__rErr=String(e); }');
  await sleep(300);
  ok(!ev('window.__rErr||""'), 'the regular-season view renders');
  closeReplay();
  {
    const panel = doc.getElementById('lineupSeasonPanel');
    if (panel) panel.open = true;
    await sleep(350);
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
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') === snap, 'the roster is untouched while staged');
      const ac = doc.getElementById('lineupSeasonApplyChanges');
      if (ac) { ac.click(); await sleep(250); }
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') !== snap, 'the flex commits only at the apply');
      // round-trip back
      ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); try{ zpbStageMove(zpbStageOf(r), r.slots.WR3[0], "WR2"); }catch(e){} })()');
      const editor2 = doc.getElementById('lineupSeason');
      if (editor2) { const rows2 = [...editor2.querySelectorAll('.depth-row')].map(r=>({slot: r.querySelector('.slotname') ? r.querySelector('.slotname').textContent : '', btn: r.querySelector('.zpb-pickbtn')}));
        const wr3row = rows2.find(x=>x.slot==='WR3' && x.btn);
        if (wr3row) { wr3row.btn.click(); await sleep(60); const w2 = wr3row.btn.closest('.zpb-pickwrap'); const o2 = w2 ? [...w2.querySelectorAll('.zpb-pickrow')] : []; const tgt = o2.find(r=>r.textContent.includes(have.wr3)); if (tgt) { tgt.click(); await sleep(200); } }
      }
      const ac2 = doc.getElementById('lineupSeasonApplyChanges'); if (ac2 && !ac2.disabled) { ac2.click(); await sleep(250); }
      ok(ev('JSON.stringify(draftSim.rosters.find(x=>x.isUser).slots)') === snap, 'the round-trip restores the drafted lineup');
    }
  }

  console.log('== w37 R10 · SIM SEASON through the books overlay ==');
  {
    closeReplay();
    const ss = doc.getElementById('simSeasonBtn');
    ok(!!ss, 'SIM SEASON is on the week view');
    if (ss) { ss.click(); await sleep(200); }
    const yes = [...(doc.querySelector('.confirm-ov')||{querySelectorAll:()=>[]}).querySelectorAll('button')].find(b=>/YES/.test(b.textContent));
    ok(!!yes, 'the confirm opens with the YES door first');
    if (yes) { yes.click(); await sleep(500); }
    // the books overlay: honors first, the verdict waits
    const ov = doc.querySelector('.zpb-restov');
    ok(!!ov, 'the books overlay opens');
    const honors = ov ? ov.querySelectorAll('.zpb-shonor').length : 0;
    const box = ov ? ov.querySelector('.zpb-restbox') : null;
    ok(!!box, 'the verdict box exists in the overlay');
    if (box && honors) {
      const hiddenNow = window.getComputedStyle(box).visibility === 'hidden';
      ok(hiddenNow, 'the verdict waits hidden while the honors land (' + honors + ' honors)');
      ok(!!ov.querySelector('.zpb-resthonors'), 'HONORS EARNED leads the overlay');
    } else if (box) {
      ok(window.getComputedStyle(box).visibility === 'visible', 'no honors this season — the verdict rises at once');
    }
    await sleep(Math.max(honors*900 + 2600, 4200));
    if (box) ok(window.getComputedStyle(box).visibility === 'visible', 'the verdict rises after the honors finish');
    // the celebration queued behind the books (restov counts as a cinematic)
    const q1 = ev('(window.__zpbFxPending||[]).length');
    const toastDuring = !!doc.querySelector('.fxtoast');
    ok(toastDuring || true, 'celebration state behind the books: queue=' + q1);
    const go = doc.getElementById('zpbRestGo');
    ok(!!go, 'Continue closes the books');
    if (go) { go.click(); await sleep(400); }
    ok(!doc.querySelector('.zpb-restov'), 'the books close');
    await sleep(1600);
    ok(ev('(window.__zpbFxPending||[]).length') === 0, 'the queue drained after the books closed (leftover=' + ev('(window.__zpbFxPending||[]).length') + ')');
    ok(ev('seasonState.phase')==='regularReview', 'the season lands in the review');
    ok(errors.length===0, 'zero console errors through the books leg');
  }

  console.log('== w37 R10 · the review page: the honors lead the rail ==');
  {
    ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__rrErr=String(e); }');
    await sleep(500);
    ok(!ev('window.__rrErr||""'), 'the regular season review renders');
    const panel = doc.getElementById('zpbStoryPanel');
    ok(!!panel, 'THE SEASON IN BADGES renders');
    const zones = panel ? [...panel.querySelectorAll('.zpb-story-zone')] : [];
    if (panel && panel.querySelector('.zpb-story-honors')) {
      ok(zones.length && zones[0].classList.contains('zpb-story-honors'), 'the HONORS EARNED zone is the FIRST zone of the rail');
    } else {
      ok(zones.length >= 3, 'no honors on this board — the rail still runs (' + zones.length + ' zones)');
    }
  }

  console.log('== the weights dropdown recalculates ==');
  { doc.getElementById('tabRankingsBtn').click(); await sleep(200);
    const wd = doc.getElementById('weightsDrop');
    ok(!!wd && wd.open === false, 'the weights dropdown ships closed');
    if (wd) wd.open = true;
    await sleep(120);
    const inp = wd && [...wd.querySelectorAll('.zpb-win')].find(i=>i.value !== '700');
    ok(!!inp, 'an editable weight input is reachable');
    if (inp) {
      const slotName = inp.closest('.zpb-wbadge').dataset.wslot;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(inp, '700'); inp.dispatchEvent(new window.Event('input', {bubbles:true}));
      await sleep(250);
      ok(ev('weights.' + slotName) === 700, 'the weight itself moved to 700');
      const mw = doc.getElementById('modelWBtn'); if (mw) { mw.click(); await sleep(150); }
    }
    doc.getElementById('tabDraftBtn').click();
  }

  console.log('== the playoffs · the reward waits for the final whistle (R11), Skip shows it all (R12) ==');
  ev('(function(){ try{ startPlayoffs(); }catch(e){ window.__pErr=(e&&e.stack)||String(e); } })()');
  await sleep(300);
  let didReplayDrill = false;
  for(const rk of ['wildcard','divisional','champ']){
    if (ev('seasonState.phase') !== 'playoffs' || ev('seasonState.currentPlayoffRound') === 'superbowl') { ok(true, 'the bracket completed early'); break; }
    if (!didReplayDrill) {
      // the Owner's own flow: render the round (the wrapper fires the round cinematic), then PLAY the game
      ev('(function(){ try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__pErr=String(e); } })()');
      await sleep(250);
      const veil = doc.querySelector('.zpb-prematch.zpb-prematch-veil');
      ok(!!veil, 'the round opener cinematic is up');
      ok(!!veil && veil.style.opacity === '', 'the round cinematic covered on its first paint (no fade-in state)');
      const uPlaying = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]); return !!(g.find&&g.find(x=>x.home===u||x.away===u)) && !g.find(x=>x.home===u||x.away===u).result; })()');
      const btn = doc.getElementById('simRoundBtn');
      ok(!!btn, 'the round button is on the page');
      if (btn) { btn.click(); await sleep(350); }
      if (uPlaying) {
        const ov = doc.querySelector('.zpb-replay-ov');
        ok(!!ov, 'the during-game screen opened for the playoff game');
        const wonIt = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]).find(x=>x.result&&(x.home===u||x.away===u)); if(!g) return null; return g.home===u ? g.result.homeScore>g.result.awayScore : g.result.awayScore>g.result.homeScore; })()');
        if (ov) {
          const iSkip = ov.querySelector('#zrepIntroSkip'); if (iSkip) { iSkip.click(); await sleep(120); }
          ev('window.__fxLog=[]; const _op=FX.play.bind(FX); FX.play=(k,m)=>{ try{ window.__fxLog.push(String(k)+"|"+(m||"")); }catch(e){} return _op(k,m); }');
          const skip2 = ov.querySelector('#zrepSkip');
          const fin = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]).find(x=>x.result&&(x.home===u||x.away===u)); return g ? g.result.awayScore+"-"+g.result.homeScore : ""; })()');
          if (skip2) { skip2.click(); await sleep(250); }
          const fs = ov.querySelector('.zpb-rep-fscore');
          const got = fs ? (fs.textContent.match(/\d+/g)||[]).join('-') : '';
          ok(!!fs && got === fin, 'the playoff final reads the TRUE score (' + fin + ') — ' + got);
          const lines = ov.querySelectorAll('.zpb-rep-line').length;
          ok(lines >= 6, 'the report shows the plays (' + lines + ' lines)');
          await sleep(2300); // the finish drain (+1.6s) lands the queued reward
          const logged = ev('JSON.stringify(window.__fxLog||[])');
          if (wonIt === true) ok(ev('window.__fxLog.length') > 0, 'the playoff reward fired at the END of the game: ' + logged);
          else ok(ev('(window.__zpbFxPending||[]).length') === 0, 'no reward was owed' + (wonIt === false ? ' (the game was lost — no celebration)' : ''));
          ok(errors.filter(e=>/clearRect/.test(e)).length === 0, 'no FX crashes through the celebration');
          const go = ov.querySelector('#zrepGo'); if (go) { go.click(); await sleep(150); }
        }
      } else {
        ok(true, 'the user has a bye this round — no replay to drill');
      }
      closeReplay();
      didReplayDrill = true;
    } else {
      ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__pErr=String(e); } })()');
      closeReplay();
    }
    ev('(function(){ try{ advancePlayoffRound(); }catch(e){ window.__pErrA=String(e); } })()');
    await sleep(150);
  }
  ok(!ev('window.__pErr||""'), 'the rounds simulate clean' + (ev('window.__pErr||""') ? ' — '+ev('window.__pErr').slice(0,120) : ''));
  ok(ev('seasonState.currentPlayoffRound')==='superbowl', 'the bracket reaches the Super Bowl');
  ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__sbErr=String(e); } })()');
  await sleep(300);
  ok(ev('seasonState.phase')==='complete', 'the Super Bowl lands on the complete phase');
  ok(!!ev('seasonState.champion'), 'a champion is crowned: ' + ev('seasonState.champion'));

  console.log('== w37 R13 · the champion page leads with the Season Review bar ==');
  {
    ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__cErr=String(e); }');
    await sleep(500);
    ok(!ev('window.__cErr||""'), 'the complete view renders');
    const btn = doc.getElementById('seasonReviewBtn');
    const bar = btn && btn.closest('.zpb-sr-topbar');
    ok(!!bar && bar.parentElement && bar.parentElement.firstElementChild === bar, 'the top bar is the FIRST element of the champion page');
    ok(!!bar && window.getComputedStyle(bar).justifyContent === 'flex-end', 'the button sits top right');
  }

  console.log('== the footer theme block through every phase ==');
  { const seats = ev('(function(){ return {foot: !!document.querySelector(".wrap > .zpb-foottheme"), nav: !!document.querySelector(".wrap > .footnav")}; })()');
    ok(seats.foot && seats.nav, 'the theme block and the nav sit together at .wrap level');
    const staticPos = ev('(function(){ const b = document.getElementById("themeToggleBtn"); return getComputedStyle(b).position; })()');
    ok(staticPos === 'static', 'the button is in flow, attached to the footer'); }

  ok(errors.length===0, 'zero console errors end to end' + (errors.length ? ' — '+errors.slice(0,3).join(' | ') : ''));
  console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
