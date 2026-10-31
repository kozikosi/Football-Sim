#!/usr/bin/env node
/* w42_stress.js — the functional sweep for w42.
   Drives the 32-pick draft (the VS. ACTUAL NFL TEAMS tab lives pre-season), the season through
   the books leg, the playoffs round-by-round with the real replays, the Super Bowl — and asserts
   the w42 laws live: the one-ink law on the rendered rows (the browser, the review, the awards),
   the look-gate holding the map until it is seen, the sweep retiring the NFL tab the moment a
   season exists, and the Super Bowl cinematic mounting in the SAME paint as the page.
   Zero console errors end to end. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/boot/w43/Football-Sim-Z-post-blue-w43.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push(e.message); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
const dom = new JSDOM(HTML, { runScripts:'dangerously', pretendToBeVisual:true, url:'http://localhost/', virtualConsole:vc,
  beforeParse(window){
    if (process.env.ZPB_SEED) { let _s = parseInt(process.env.ZPB_SEED,10)>>>0 || 1; window.Math.random = () => { _s = (_s*1664525 + 1013904223)>>>0; return _s/4294967296; }; }
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { constructor(cb){ this.cb=cb; this.observed=[]; } observe(el){ this.observed.push(el); } unobserve(){} disconnect(){} };
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
const parseVars = s => { const o={}; String(s||'').split(';').forEach(p=>{ const i=p.indexOf(':'); if(i>0) o[p.slice(0,i).trim()] = p.slice(i+1).trim(); }); return o; };

(async () => {
  await sleep(900);

  console.log('== the 32-pick draft ==');
  ev('try{ startDraft2(); }catch(e){ window.__d0=String(e); }');
  await sleep(400);
  ok(!ev('window.__d0||""'), 'the draft boots');
  const scripted = ev(`(function(){
    const picks = [];
    try{
      draftSpeed = 'instant';
      try{ clearTimeout(slowTimer); slowTimer = null; }catch(e){}
      for(let guard=0; guard<6000 && draftSim.pos < draftSim.order.length; guard++){
        const t = draftSim.order[draftSim.pos];
        if(t === draftSim.userIndex){
          const roster = draftSim.rosters[t];
          if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
          const nat = p => (NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
          let cands = draftSim.pool.filter(p=>nat(p).length);
          if(!cands.length){ cands = draftSim.pool.slice(); }
          cands.sort((a,b)=>b[3]-a[3]);
          const p = cands[0];
          const on = nat(p);
          executePick(draftSim.userIndex, p, on.length?on[0]:ROSTER_SLOTS.find(s=>!roster.slots[s]));
          picks.push(p[0]);
        } else { draftSim.pos++; }
      }
      return { picks, err: window.__dErr||'' };
    }catch(e){ return { picks, err: String(e) }; }
  })()`);
  ok(!scripted.err, 'the scripted draft runs' + (scripted.err ? ' — '+scripted.err : ''));
  ok(scripted.picks.length === 32, '32 scripted picks made (' + scripted.picks.length + ')');
  ev('(function(){ try{ if(draftFinalResults.style.display==="none") finishDraft2(); }catch(e){} })()');
  await sleep(500);
  ok(errors.length===0, 'zero console errors through the draft');

  console.log('== w42 I6 · the NFL tab lives on the draft review, pre-season ==');
  {
    const b = doc.getElementById('resultsNflBtn');
    const host = doc.getElementById('draftFinalResults');
    ok(!!b && !!host && host.contains(b), 'the tab renders inside the draft review');
    ok(ev('!seasonState'), 'no season yet — the tab may live');
  }

  console.log('== w42 I5 · the look-gate on the real map ==');
  {
    const mine = doc.getElementById('resultsMineBtn');
    if (mine) { mine.click(); await sleep(450); }
    const fm = doc.querySelector('.zpb-fm');
    ok(!!fm, 'WHERE YOUR PLAYERS LINE UP? renders on the roster tab');
    if (fm) {
      ok(!fm.classList.contains('zpb-seen'), 'the map holds unseen before the observer fires');
      const io = ev('window.__zpbLookIO');
      ok(!!io && io.observed.indexOf(fm) >= 0, 'the map is under the observer');
      ev('(function(){ window.__zpbLookIO.cb([{ isIntersecting:true, target: document.querySelector(".zpb-fm") }]); })()');
      ok(fm.classList.contains('zpb-seen'), 'the map enters when it is seen');
      ok(ev('(function(){ var v = document.querySelector(".zpb-fm").style.getPropertyValue("--dfc-cine"); return v==="0s" ? true : String(v); })()'), 'with no cinematic up, the gate opens at once');
    }
    const bhost = ev(`(function(){
      try{
        var de = buildResultEntries().draftEntries.find(function(e){ return e.isUser; });
        var div = document.createElement('div'); div.id = 'zpbStressDbk';
        div.innerHTML = zpbDraftBreakdownHTML(de);
        document.body.appendChild(div);
        return div.querySelectorAll('.zpb-dbk-g').length;
      }catch(e){ return -1; }
    })()`);
    ok(bhost > 0, 'the breakdown builds its position groups (' + bhost + ')');
    if (bhost > 0) {
      const g0 = doc.querySelector('#zpbStressDbk .zpb-dbk-g');
      ok(!g0.classList.contains('zpb-seen'), 'a position group holds unseen');
      ev('(function(){ zpbWireLookIn(); window.__zpbLookIO.cb([{ isIntersecting:true, target: document.querySelector("#zpbStressDbk .zpb-dbk-g") }]); })()');
      ok(g0.classList.contains('zpb-seen'), 'a position group enters when it is seen');
    }
  }

  console.log('== w42 I1/I2 · the one-ink law on the live rendered rows ==');
  {
    const pb = doc.getElementById('tabPlayersBtn');
    if (pb) { pb.click(); await sleep(450); }
    const r = ev(`(function(){
      try{
        var txd = zpbPackFor('Chicago Bears').txd;
        var nv = zpbNeutralRowVars('Chicago Bears'), vv = zpbRowVars('Chicago Bears');
        var parse = function(s){ var o={}; s.split(';').forEach(function(p){ var i=p.indexOf(':'); if(i>0) o[p.slice(0,i).trim()]=p.slice(i+1).trim(); }); return o; };
        var n = parse(nv), v = parse(vv);
        var bad = [];
        ['--tn','--tnd','--nm','--nmd','--nmS','--nmSd','--nu','--nud'].forEach(function(k){ if(n[k]!==txd) bad.push('n'+k); if(v[k]!==txd) bad.push('v'+k); });
        var row = document.querySelector('#playerBody tr');
        var st = row ? parse(row.getAttribute('style')) : {};
        var rowOk = row && st['--tn'] && st['--tn']===st['--tnd'] && st['--tn']===st['--nm'] && st['--tn']===st['--nu'];
        return { bad, rowOk: rowOk ? true : (row ? JSON.stringify(st).slice(0,120) : 'no-row') };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the ink audit runs' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.bad.length===0, 'every text ink on both row kinds reads txd' + (r.bad.length ? ' — '+r.bad.join(',') : ''));
      ok(r.rowOk === true, 'the live browser row carries the one ink' + (r.rowOk === true ? '' : ' — '+r.rowOk));
    }
  }

  console.log('== the SEASON tab + BEGIN (the sweep fires) ==');
  {
    const tab = doc.getElementById('resultsSeasonBtn');
    if (tab) { tab.click(); await sleep(400); }
    ok(!!ev('seasonState'), 'the click scaffolds the season');
    ok(!doc.getElementById('resultsNflBtn'), 'the NFL tab is gone the moment the season exists (I6)');
    const beg = doc.getElementById('beginSeasonBtn');
    if (beg) { beg.click(); await sleep(400); }
    ok(ev('seasonState && seasonState.preseason === false'), 'the preseason flag falls');
    await sleep(5200);
    ok(doc.querySelectorAll('.zpb-prematch').length === 0, 'the SEASON OPENER veil clears');
  }

  console.log('== the books leg ==');
  {
    closeReplay();
    const ss = doc.getElementById('simSeasonBtn');
    ok(!!ss, 'SIM SEASON is on the week view');
    if (ss) { ss.click(); await sleep(200); }
    const yes = [...(doc.querySelector('.confirm-ov')||{querySelectorAll:()=>[]}).querySelectorAll('button')].find(b=>/YES/.test(b.textContent));
    ok(!!yes, 'the confirm opens with the YES door first');
    if (yes) { yes.click(); await sleep(500); }
    const ov = doc.querySelector('.zpb-restov');
    ok(!!ov, 'the books overlay opens');
    const honors = ov ? ov.querySelectorAll('.zpb-shonor').length : 0;
    await sleep(Math.max(honors*900 + 2600, 4200));
    const go = doc.getElementById('zpbRestGo');
    ok(!!go, 'Continue closes the books');
    if (go) { go.click(); await sleep(500); }
    ok(!doc.querySelector('.zpb-restov'), 'the books close');
    ok(ev('seasonState.phase')==='regularReview', 'the season lands in the review');
    ok(errors.length===0, 'zero console errors through the books leg');
  }

  console.log('== w42 I2 · the one-ink law on the game surfaces ==');
  {
    const r = ev(`(function(){
      try{
        var user = seasonUserTeam();
        var g = seasonState.schedule.filter(function(x){ return x.result; })[0];
        if(!g) return { err:'no played games' };
        var html = renderGameResultHTML(g, user);
        var txdA = zpbPackFor(g.away).txd, txdB = zpbPackFor(g.home).txd;
        var slNames = (html.match(/zpb-sl2name/g)||[]).length;
        var m = html.match(/<div class="sl-team" style="([^"]*)"/);
        var ink = m ? m[1] : '';
        return { slNames, inkHasNm: ink.indexOf('--nm:')>=0, inkTxd: ink.indexOf(txdA)>=0 || ink.indexOf(txdB)>=0 };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the game result renders' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.slNames === 2, 'both score-line team names render');
      ok(r.inkHasNm && r.inkTxd, 'the score-line names ride the one ink (txd)');
    }
  }

  console.log('== the playoffs ==');
  ev(`(function(){
    try{
      const u = seasonUserTeam();
      const conf = seasonState.seeds.AFC.some(function(s){ return s.team===u; }) ? 'AFC' : 'NFC';
      const arr = seasonState.seeds[conf];
      if(!arr.some(function(s){ return s.team===u; })){ const s6 = arr.find(function(s){ return s.seed===6; }) || arr[arr.length-1]; s6.team = u; }
    }catch(e){ window.__seedErr = String(e); }
  })()`);
  ok(!ev('window.__seedErr||""'), 'the user is seeded into the bracket');
  ev('(function(){ try{ startPlayoffs(); }catch(e){ window.__pErr=(e&&e.stack)||String(e); } })()');
  await sleep(300);
  for(const rk of ['wildcard','divisional','champ']){
    if (ev('seasonState.phase') !== 'playoffs' || ev('seasonState.currentPlayoffRound') === 'superbowl') { ok(true, 'the bracket completed early'); break; }
    ev('(function(){ try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__pErr=String(e); } })()');
    await sleep(250);
    const uPlaying = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]); const ug = g.find&&g.find(function(x){ return x.home===u||x.away===u; }); return !!ug && !ug.result; })()');
    const btn = doc.getElementById('simRoundBtn');
    ok(!!btn, rk + ': the round button is on the page');
    if (btn) { btn.click(); await sleep(350); }
    if (uPlaying) {
      const ov = doc.querySelector('.zpb-replay-ov');
      ok(!!ov, rk + ': the during-game screen opened');
      if (ov) {
        const skip = ov.querySelector('#zrepSkip');
        if (skip) { skip.click(); await sleep(250); }
        if (skip) { skip.click(); await sleep(250); }
        await sleep(2300);
        const go = ov.querySelector('#zrepGo'); if (go) { go.click(); await sleep(150); }
      }
    } else ok(true, rk + ': the user has a bye — no replay to drill');
    closeReplay();
    ev('(function(){ try{ advancePlayoffRound(); }catch(e){ window.__pErrA=String(e); } })()');
    await sleep(250);
  }
  ok(!ev('window.__pErr||""') && !ev('window.__pErrA||""'), 'the rounds simulate clean');
  ok(ev('seasonState.currentPlayoffRound')==='superbowl', 'the bracket reaches the Super Bowl');

  console.log('== the Super Bowl + w42 I7 · the cinematic covers first ==');
  if (ev('seasonState.phase') === 'playoffs') {
    ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__sbErr=String(e); } })()');
  } else ok(true, 'the eliminated path already carried the bracket to the end');
  await sleep(300);
  ok(ev('seasonState.phase')==='complete', 'the Super Bowl lands on the complete phase');
  {
    // the page render and the cinematic mount in ONE call — no sleep between
    ev('(function(){ try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__cErr=String(e); } })()');
    const ov = doc.querySelector('.zpb-sbfin');
    ok(!!ov, 'the golden storm is in the DOM the instant the page renders (I7)');
    ok(ev('window.__zpbSBFinPending') === false || ev('window.__zpbSBFinPending') === null, 'the pending flag is spent');
    const go = ov && ov.querySelector('.zpb-sbfin-go');
    ok(!!go, 'the Continue door is on the stage');
    if (go) { go.click(); await sleep(400); }
    ok(!doc.querySelector('.zpb-sbfin'), 'Continue closes the stage');
  }
  ok(errors.length===0, 'zero console errors through the playoffs and the Super Bowl');

  console.log('== w42 I4 · the awards wear the one ink ==');
  {
    const r = ev(`(function(){
      try{
        var P = seasonState.awardsPO;
        var html = renderPlayoffAwardsHTML(P);
        var m = html.match(/<span class="zpb-apchip" style="([^"]*)"/);
        var names = (html.match(/zpb-gname/g)||[]).length;
        return { chips: !!m, nm: m ? m[1].indexOf('--nm:')>=0 : false, names };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the playoff awards render' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.chips && r.nm, 'the All-Playoff chips ride the neutral one-ink vars');
      ok(r.names > 0, 'the award names render (' + r.names + ' inked names)');
    }
    const rs = ev(`(function(){
      try{
        var A = seasonState.awardsRS; if(!A) return { skip:1 };
        var html = renderRegularAwardsHTML(A, false);
        var m = html.match(/<span class="zpb-apchip" style="([^"]*)"/);
        return { chips: !!m, zn: m ? m[1].indexOf('--zn:1')>=0 : false };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!rs.err && (rs.skip || (rs.chips && rs.zn)), 'the All-Pro chips ride the neutral vars (--zn:1)' + (rs.err ? ' — '+rs.err : ''));
  }

  console.log('== the look-gate never spends itself twice, the review re-renders clean ==');
  {
    ev('(function(){ try{ renderDraftResults(); }catch(e){ window.__rErr=String(e); } })()');
    await sleep(400);
    ok(!ev('window.__rErr||""'), 'the review re-renders clean');
    ok(errors.length===0, 'zero console errors end to end');
  }

  console.log(`\nw42_stress: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
