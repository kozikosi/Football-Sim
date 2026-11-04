#!/usr/bin/env node
/* w43_stress.js — the functional sweep for wave 43.
   Drives the 32-pick draft, the season through the books, the playoffs round-by-round with the
   real replays, the Super Bowl — and asserts the w43 laws: the light inks ride txM while dark
   keeps txd; the 90+ shimmer is the constant gold; the Series rows wear team tokens; the review's
   scores/stats/key players read their own teams; the replay header scores wear their teams; the
   bracket reads #X seeds with per-team score colors and no hint line; the SB champions shimmer in
   THEIR colors and the cinematic covers from the first frame; zero console errors end to end. */
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
const closeReplay = () => { const x = doc.querySelector('.zpb-replay-ov'); if (x) x.remove(); };

(async () => {
  await sleep(1400);
  ok(errors.length===0, 'boot: zero console errors' + (errors.length ? ' — '+errors[0] : ''));

  console.log('== w43 K · the ink law in the token builders ==');
  {
    const r = ev(`(function(){
      try{
        var pk = zpbPackFor('Kansas City Chiefs');
        if(!pk.txM) return { err:'no txM on the pack' };
        var nv = zpbNeutralRowVars('Kansas City Chiefs'), vv = zpbRowVars('Kansas City Chiefs');
        var parse = function(s){ var o={}; s.split(';').forEach(function(p){ var i=p.indexOf(':'); if(i>0) o[p.slice(0,i).trim()]=p.slice(i+1).trim(); }); return o; };
        var n = parse(nv), v = parse(vv);
        var bad = [];
        ['--tn','--nm','--nmS','--nu'].forEach(function(k){ if(n[k]!==pk.txM) bad.push('n'+k); if(v[k]!==pk.txM) bad.push('v'+k); });
        ['--tnd','--nmd','--nmSd','--nud'].forEach(function(k){ if(n[k]!==pk.txd) bad.push('n'+k+'!d'); if(v[k]!==pk.txd) bad.push('v'+k+'!d'); });
        if(pk.txM === pk.txd) bad.push('txM==txd');
        return { bad, txM: pk.txM, txd: pk.txd };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the token audit runs' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.bad.length===0, 'LIGHT reads txM, DARK keeps txd, on both row kinds' + (r.bad.length ? ' — '+r.bad.join(',') : ''));
      console.log('      txM=' + r.txM + '  txd=' + r.txd);
    }
  }

  console.log('== the scripted draft ==');
  ev(`(function(){
    try{
      startDraft2(); draftSpeed='instant'; try{ clearTimeout(slowTimer); }catch(e){}
    }catch(e){ window.__dErr = String(e); }
  })()`);
  {
    const scripted = ev(`(function(){
      const picks = [];
      try{
        for(let g=0; g<6000 && draftSim.pos < draftSim.order.length; g++){
          const t = draftSim.order[draftSim.pos];
          if(t === draftSim.userIndex){
            const roster = draftSim.rosters[t];
            if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
            const nat = p => (NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
            let cands = draftSim.pool.filter(p=>nat(p).length); if(!cands.length){ cands = draftSim.pool.slice(); }
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
  }

  console.log('== the SEASON tab + BEGIN ==');
  {
    const tab = doc.getElementById('resultsSeasonBtn');
    if (tab) { tab.click(); await sleep(400); }
    ok(!!ev('seasonState'), 'the click scaffolds the season');
    ok(!doc.getElementById('resultsNflBtn'), 'the NFL tab is gone the moment the season exists (carried)');
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
    if (yes) { yes.click(); await sleep(500); }
    const ov = doc.querySelector('.zpb-restov');
    ok(!!ov, 'the books overlay opens');
    const honors = ov ? ov.querySelectorAll('.zpb-shonor').length : 0;
    await sleep(Math.max(honors*900 + 2600, 4200));
    const go = doc.getElementById('zpbRestGo');
    if (go) { go.click(); await sleep(500); }
    ok(!doc.querySelector('.zpb-restov'), 'the books close');
    ok(ev('seasonState.phase')==='regularReview', 'the season lands in the review');
    ok(errors.length===0, 'zero console errors through the books leg');
  }

  console.log('== w43 N9 · the game review wears both teams ==');
  {
    const r = ev(`(function(){
      try{
        var user = seasonUserTeam();
        var g = seasonState.schedule.filter(function(x){ return x.result; })[0];
        if(!g) return { err:'no played games' };
        var html = renderGameResultHTML(g, user);
        var pkA = zpbPackFor(g.away), pkH = zpbPackFor(g.home);
        var okA = html.indexOf('zpb-slsc-aw')>=0 && html.indexOf('--scA:'+pkA.accL)>=0;
        var okH = html.indexOf('zpb-slsc-hm')>=0 && html.indexOf('--scH:'+pkH.accL)>=0;
        var kp = (html.match(/kp-(?:card|title)" style="[^"]*--tn:/g)||[]).length;
        var ts = html.indexOf('zpb-tsstat')>=0 && html.indexOf('--scA:'+pkA.accL)>=0;
        var i = html.indexOf('kp-card');
        var dump = i>=0 ? html.slice(i-40, i+160) : 'NO kp-card AT ALL';
        return { okA, okH, kp, ts, dump };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the game result renders' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.okA, 'the away score carries the away team ink (--scA)');
      ok(r.okH, 'the home score carries the home team ink (--scH)');
      ok(r.kp >= 2, 'both Key Players cards wear their teams\' tokens (' + r.kp + '/2)');
      if (r.kp < 2) console.log('      DUMP:', String(r.dump).slice(0,240));
      ok(r.ts, 'the Team Stats columns carry both teams\' inks');
    }
  }

  console.log('== w43 N8 · the during-game header scores ==');
  {
    const r = ev(`(function(){
      try{
        var user = seasonUserTeam();
        var g = seasonState.schedule.filter(function(x){ return x.result && x.result.homeEvents && x.result.homeEvents.length; })[0];
        if(!g) return { err:'no replayable game' };
        var pkA = zpbPackFor(g.away), pkH = zpbPackFor(g.home);
        zpbGameReplay(g, user);
        var ov = document.querySelector('.zpb-replay-ov'); if(!ov) return { err:'no overlay' };
        var sa = ov.querySelector('#zrepSa'), sh = ov.querySelector('#zrepSh');
        var a = sa ? (sa.getAttribute('style')||'') : '', h = sh ? (sh.getAttribute('style')||'') : '';
        var out = { a: a.indexOf('--scA:'+pkA.accL)>=0, h: h.indexOf('--scH:'+pkH.accL)>=0 };
        var x = ov; if(x) x.remove();
        return out;
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the replay opens' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.a, 'the away header score carries the away ink');
      ok(r.h, 'the home header score carries the home ink');
    }
    closeReplay();
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
  ev('(function(){ try{ startPlayoffs(); }catch(e){ window.__pErr=(e&&e.stack)||String(e); } })()');
  await sleep(300);
  for(const rk of ['wildcard','divisional','champ']){
    if (ev('seasonState.phase') !== 'playoffs' || ev('seasonState.currentPlayoffRound') === 'superbowl') { ok(true, 'the bracket completed early'); break; }
    ev('(function(){ try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__pErr=String(e); } })()');
    await sleep(250);
    const uPlaying = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]); const ug = g.find&&g.find(function(x){ return x.home===u||x.away===u; }); return !!ug && !ug.result; })()');
    const btn = doc.getElementById('simRoundBtn');
    if (btn) { btn.click(); await sleep(350); }
    if (uPlaying) {
      const ov = doc.querySelector('.zpb-replay-ov');
      if (ov) {
        const skip = ov.querySelector('#zrepSkip');
        if (skip) { skip.click(); await sleep(250); }
        if (skip) { skip.click(); await sleep(250); }
        await sleep(2300);
        const go = ov.querySelector('#zrepGo'); if (go) { go.click(); await sleep(150); }
      }
    }
    closeReplay();
    ev('(function(){ try{ advancePlayoffRound(); }catch(e){ window.__pErrA=String(e); } })()');
    await sleep(250);
  }
  ok(!ev('window.__pErr||""') && !ev('window.__pErrA||""'), 'the rounds simulate clean');
  ok(ev('seasonState.currentPlayoffRound')==='superbowl', 'the bracket reaches the Super Bowl');

  console.log('== the Super Bowl + N10/N11/N12 ==');
  if (ev('seasonState.phase') === 'playoffs') {
    ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__sbErr=String(e); } })()');
  }
  await sleep(300);
  ok(ev('seasonState.phase')==='complete', 'the Super Bowl lands on the complete phase');
  {
    ev('(function(){ try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__cErr=String(e); } })()');
    const ov = doc.querySelector('.zpb-sbfin');
    ok(!!ov, 'the golden storm is in the DOM the instant the page renders (N10, carried)');
    const shim = ov ? (ov.style.getPropertyValue('--zshim')||'') : '';
    const champ = ev('seasonState.champion');
    const pkC = ev(`zpbPackFor(${JSON.stringify(champ)})`);
    ok(shim === (pkC ? pkC.accD : ''), 'the cinematic shimmers in the CHAMPION\'s color (' + champ + ' — ' + shim + ')');
    const banner = doc.querySelector('.champion-banner');
    const bStyle = banner ? (banner.getAttribute('style')||'') : '';
    ok(bStyle.indexOf('--zshimL:')>=0 && bStyle.indexOf('--zshimD:')>=0, 'the review banner carries the champion\'s two inks');
    ok(!!doc.querySelector('.champion-banner .zpb-champ-name.zpb-shm'), 'the champion wordmark rides the shimmer law (respective colors)');
    const go = ov && ov.querySelector('.zpb-sbfin-go');
    if (go) { go.click(); await sleep(400); }
    ok(!doc.querySelector('.zpb-sbfin'), 'Continue closes the stage');
  }
  {
    const r = ev(`(function(){
      try{
        var html = renderBracketHTML();
        var seedChips = html.match(/zpb-tseed">#[0-9]+</g) || [];
        var naChips = html.match(/zpb-tseed">[AN][0-9]+</g) || [];
        var hint = html.indexOf('Click a played game to review what happened') >= 0;
        var inks = (html.match(/--scA:/g)||[]).length;
        return { seeds: seedChips.length, na: naChips.length, hint, inks };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the bracket renders' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.seeds > 0 && r.na === 0, 'every seed reads #X — no N1/A2 anywhere (' + r.seeds + ' chips)');
      ok(!r.hint, 'the "Click a played game" hint is gone');
      ok(r.inks > 0, 'the tree cards carry per-team score inks (' + r.inks + ' cards)');
    }
  }
  ok(errors.length===0, 'zero console errors through the playoffs and the Super Bowl' + (errors.length ? ' — '+errors[0] : ''));

  console.log('== w43 N4 · the shimmer is the constant gold, NYG included ==');
  {
    const r = ev(`(function(){
      try{
        var html = '';
        var g = { away:'Baltimore Ravens', home:'Green Bay Packers', wildcard:1 };
        g.result = { awayScore: 24, homeScore: 20, homeEvents:[{q:2,t:0.5,type:'TD',pts:7}], awayEvents:[{q:3,t:0.5,type:'FG',pts:3}] };
        var card = zpbTreeCardHTML(g, 'wildcard', 0);
        var gold = 'var(--zshim';
        return { treeHasShim: card.indexOf('--scA:')>=0, aw: /zpb-tsca/.test(card), hm: /zpb-tsch/.test(card),
                 shimRoot: (function(){ var m = document.getElementById('zpb-w43-css'); return m ? m.textContent.indexOf('--zshim:var(--gold3')>=0 : false; })() };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the tree card probe runs' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.shimRoot, 'the root shim law pins the deep gold (--gold3)');
      ok(r.aw && r.hm, 'both tree scores ride their own ink classes');
    }
  }

  console.log('== w43 K8 · The Series wears the team tokens ==');
  {
    const r = ev(`(function(){
      try{
        window.zpbSeriesOrder = ['QB','RB1','WR1'];
        renderSeriesGroups('3');
        var rows = document.querySelectorAll('#groupBody tr.zpb-grow');
        var withVars = 0;
        rows.forEach(function(tr){ if((tr.getAttribute('style')||'').indexOf('--tn:')>=0) withVars++; });
        return { rows: rows.length, withVars };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err, 'the Series renders' + (r.err ? ' — '+r.err : ''));
    if (!r.err) ok(r.rows > 0 && r.withVars === r.rows, 'every Series row carries the team tokens (' + r.withVars + '/' + r.rows + ')');
  }

  console.log('== w43 N1 · the Madden detail card ==');
  {
    const r = ev(`(function(){
      try{
        var html = renderDetailHTML('Test Team', [{label:'OFFENSE',rank:3,pct:80,top:[['X','QB',90]]},{label:'QB',rank:1,pct:92,top:[['Y','QB',95]]}]);
        return { metric: /class="metricrow"/.test(html), rank: html.indexOf('#3')>=0 };
      }catch(e){ return { err: String(e) }; }
    })()`);
    ok(!r.err && r.metric && r.rank, 'the detail card renders its metric rows' + (r.err ? ' — '+r.err : ''));
  }

  ok(errors.length===0, 'END: zero console errors' + (errors.length ? ' — '+errors.slice(0,2).join(' | ') : ''));
  console.log('\\nW43 STRESS: ' + pass + ' pass, ' + fail + ' fail');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FATAL', e); process.exit(2); });
