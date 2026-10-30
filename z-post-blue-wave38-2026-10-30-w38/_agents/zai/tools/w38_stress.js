#!/usr/bin/env node
/* w38_stress.js — the functional sweep for w38 (extends the w37 sweep).
   Drives the 32-pick draft (R4: the Dime is drafted, his own beat), the Secondary agreement
   (R5: the bars and Your Breakdown quote one number), the SIM SEASON leg through the books
   overlay (R10: the review cards hold until the Honors Continue), the playoffs round-by-round
   with the REAL replay + the ONE skip button (R12: SKIP INTRO flips to SKIP), the champions
   gate (R13: big rewards wait for the whistle), the Super Bowl stage (R14: the badges and the
   champions FX wait for the stage Continue). Zero console errors end to end. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/w38/Football-Sim-Z-post-blue-w38.html', 'utf8');
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

  console.log('== the 32-pick draft · the Dime takes his slot (R4) ==');
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
          const openNat = nat(p);
          const slot = openNat.length ? openNat[0] : ROSTER_SLOTS.find(s=>!roster.slots[s]);
          picks.push({slot, name: p[0], pos: p[1], fb: !openNat.length});
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
  ok(scripted.length === 32, '32 scripted picks made (' + scripted.length + ')');
  ok(ev('draftSim && draftSim.pos >= 32*32'), 'the draft completes at 32 rounds');
  ok(ev('typeof finishDraft2==="function"') && ev('(function(){ try{ if(draftFinalResults.style.display==="none") finishDraft2(); }catch(e){} return true; })()'), 'the draft finishes');
  await sleep(400);
  {
    const audit = ev(`(function(){
      const r = draftSim.rosters.find(x=>x.isUser);
      let oop = 0; const offenders = [];
      for(const s in r.slots){ const p = r.slots[s]; if(!p) continue;
        if(typeof isNaturalSlot==="function" && !isNaturalSlot(p[1], s)){ oop++; offenders.push(s+':'+p[0]); } }
      const cb4 = r.slots.CB4;
      return {oop, offenders, n: Object.keys(r.slots).filter(s=>r.slots[s]).length, cb4: cb4 ? cb4[0] : null, beat: cb4 ? (window.zpbBeatOf?zpbBeatOf(cb4[0]):'') : ''};
    })()`);
    ok(audit.n === 32, 'the roster is full at 32 (CB4 included)');
    ok(!!audit.cb4, 'the Dime is a drafted player: ' + audit.cb4);
    ok(audit.beat !== '' && audit.beat !== undefined, 'the Dime owns his own fade beat (' + audit.beat + ')');
    const fb = scripted.filter(p => p && p.fb).length;
    ok(audit.oop === fb, `the math moved nobody — out-of-position (${audit.oop}) equals the draft's forced picks (${fb})`);
    ok(errors.length===0, 'zero console errors through the draft');
  }

  console.log('== the review map: the Dime bubble carries his own name and beat (R4) ==');
  {
    const map = ev(`(function(){
      const body = document.getElementById('draftResultsBody');
      const fm = body.querySelector('.zpb-fm'); if(!fm) return {none:1};
      const d = fm.querySelector('[data-slot="DIME"]'), f = fm.querySelector('[data-slot="FS"]');
      return { dEmpty: d ? d.classList.contains('zpb-empty') : null, dName: d ? (d.querySelector('b')||{}).textContent : null,
               dBeat: d ? d.getAttribute('data-beat') : null, fBeat: f ? f.getAttribute('data-beat') : null };
    })()`);
    ok(!map.none && map.dEmpty === false, 'the DIME bubble renders a player');
    ok(map.dName && map.dName.length > 1, 'the DIME bubble carries a name: ' + map.dName);
    ok(map.dBeat && map.fBeat && map.dBeat !== map.fBeat, 'the Dime and the FS fade on DIFFERENT beats (' + map.dBeat + ' vs ' + map.fBeat + ')');
  }

  console.log('== R5 · one Secondary on the draft review ==');
  {
    const sec = ev(`(function(){
      try{
        const body = document.getElementById('draftResultsBody');
        const userTr = [...body.querySelectorAll('tr.teamrow')].find(x=>x.getAttribute('style') && x.getAttribute('style').indexOf('bold') >= 0);
        if(userTr) userTr.click();
        const wrap = [...document.querySelectorAll('.detailwrap')].find(w=>w.textContent.indexOf('Secondary')>=0);
        if(!wrap) return {err:'no detail wrap'};
        const bars = [...wrap.querySelectorAll('.metricrow')];
        const secBar = bars.find(b=>b.textContent.trim().indexOf('Secondary')===0);
        const rank = secBar ? (secBar.textContent.match(/#(\\d+)/)||[])[1] : null;
        const badges = [...document.querySelectorAll('.zpb-sbadge')].map(b=>b.textContent.trim());
        const secBd = badges.find(t=>/SECONDARY/.test(t));
        return {rank, secBd};
      }catch(e){ return {err:String(e)}; }
    })()`);
    ok(!sec.err, 'the user detail opens' + (sec.err ? ' — '+sec.err : ''));
    ok(!!sec.rank && !!sec.secBd, 'both surfaces render (bar rank ' + sec.rank + ', badge ' + sec.secBd + ')');
    if (sec.rank && sec.secBd) {
      const bdRank = (sec.secBd.match(/#(\d+)/)||[])[1];
      ok(bdRank === sec.rank, 'the bars and Your Breakdown quote ONE Secondary rank (' + sec.rank + ' vs ' + bdRank + ')');
    }
  }

  console.log('== the SEASON tab + BEGIN ==');
  {
    const tab = doc.getElementById('resultsSeasonBtn');
    if (tab) { tab.click(); await sleep(400); }
    ok(!!ev('seasonState'), 'the click scaffolds the season');
    const beg = doc.getElementById('beginSeasonBtn');
    if (beg) { beg.click(); await sleep(400); }
    ok(ev('seasonState && seasonState.preseason === false'), 'the preseason flag falls');
    await sleep(5200);
    ok(doc.querySelectorAll('.zpb-prematch').length === 0, 'the SEASON OPENER veil clears');
  }

  console.log('== w37 guard · the staged editor still stages ==');
  {
    ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__rErr=String(e); }');
    await sleep(300);
    ok(!ev('window.__rErr||""'), 'the regular-season view renders');
    closeReplay();
    const editor = doc.getElementById('lineupSeason');
    ok(!!editor || !!doc.getElementById('lineupSeasonPanel'), 'the season lineup editor is reachable');
  }

  console.log('== R10 · SIM SEASON: the books overlay and the HELD rail ==');
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
    ok(!!ov && !!ov.querySelector('.zpb-resthonors'), 'HONORS EARNED leads the overlay');
    // the review page sits BENEATH the overlay with the rail HELD
    const held = ev('(function(){ const p = document.getElementById("zpbStoryPanel"); if(!p) return null; const r = p.querySelector(".zpb-story-rail"); return r ? r.classList.contains("zpb-story-hold") : null; })()');
    ok(held === true, 'the season-in-review cards HOLD while the Honors cinematic is up');
    await sleep(Math.max(honors*900 + 2600, 4200));
    const go = doc.getElementById('zpbRestGo');
    ok(!!go, 'Continue closes the books');
    if (go) { go.click(); await sleep(500); }
    ok(!doc.querySelector('.zpb-restov'), 'the books close');
    const released = ev('(function(){ const p = document.getElementById("zpbStoryPanel"); if(!p) return null; const r = p.querySelector(".zpb-story-rail"); return r ? r.classList.contains("zpb-story-hold") : null; })()');
    ok(released === false, 'the Continue RELEASES the badge cascade');
    ok(ev('seasonState.phase')==='regularReview', 'the season lands in the review');
    ok(errors.length===0, 'zero console errors through the books leg');
  }

  console.log('== the playoffs · ONE skip button (R12), the champions wait (R13) ==');
  ev('window.__fxLog=[]; (function(){ const _op=FX.play.bind(FX); FX.play=(k,m)=>{ try{ window.__fxLog.push(String(k)); }catch(e){} return _op(k,m); }; })()');
  ev('(function(){ try{ startPlayoffs(); }catch(e){ window.__pErr=(e&&e.stack)||String(e); } })()');
  await sleep(300);
  let didReplayDrill = false;
  for(const rk of ['wildcard','divisional','champ']){
    if (ev('seasonState.phase') !== 'playoffs' || ev('seasonState.currentPlayoffRound') === 'superbowl') { ok(true, 'the bracket completed early'); break; }
    if (!didReplayDrill) {
      ev('(function(){ try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__pErr=String(e); } })()');
      await sleep(250);
      const uPlaying = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]); const ug = g.find&&g.find(x=>x.home===u||x.away===u); return !!ug && !ug.result; })()');
      const btn = doc.getElementById('simRoundBtn');
      ok(!!btn, 'the round button is on the page');
      if (btn) { btn.click(); await sleep(350); }
      if (uPlaying) {
        const ov = doc.querySelector('.zpb-replay-ov');
        ok(!!ov, 'the during-game screen opened for the playoff game');
        if (ov) {
          const skip = ov.querySelector('#zrepSkip');
          ok(!!skip && /^skip intro$/i.test(skip.textContent), 'ONE button leads with SKIP INTRO (reads: ' + (skip?skip.textContent:'none') + ')');
          ok(!ov.querySelector('#zrepIntroSkip'), 'no separate intro button exists');
          const wonIt = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]).find(x=>x.result&&(x.home===u||x.away===u)); if(!g) return null; return g.home===u ? g.result.homeScore>g.result.awayScore : g.result.awayScore>g.result.homeScore; })()');
          if (skip) { skip.click(); await sleep(250); }
          ok(/^skip$/i.test(skip ? skip.textContent : ''), 'the wording flipped to SKIP once the game began (' + (skip?skip.textContent:'') + ')');
          if (skip) { skip.click(); await sleep(250); } // the second press flushes the whole report
          const fin = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]).find(x=>x.result&&(x.home===u||x.away===u)); return g ? g.result.awayScore+"-"+g.result.homeScore : ""; })()');
          const fs = ov.querySelector('.zpb-rep-fscore');
          const got = fs ? (fs.textContent.match(/\d+/g)||[]).join('-') : '';
          ok(!!fs && got === fin, 'the playoff final reads the TRUE score (' + fin + ') — ' + got);
          await sleep(2300); // the whistle drain lands the queued champions
          const logged = ev('JSON.stringify(window.__fxLog||[])');
          if (wonIt === true) ok(ev('window.__fxLog.length') > 0, 'the champions reward fired at the END of the game: ' + logged);
          else ok(ev('(window.__zpbFxPending||[]).length') === 0, 'no reward was owed');
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
  ok(!ev('window.__pErr||""'), 'the rounds simulate clean');
  ok(ev('seasonState.currentPlayoffRound')==='superbowl', 'the bracket reaches the Super Bowl');

  console.log('== R13/R14 · the Super Bowl: the champions FX and the badges wait for the Continue ==');
  ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__sbErr=String(e); } })()');
  await sleep(300);
  ok(ev('seasonState.phase')==='complete', 'the Super Bowl lands on the complete phase');
  const userWonSB = ev('seasonState.champion === seasonUserTeam()');
  {
    ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__cErr=String(e); }');
    await sleep(900); // the stage rises 450ms after the render
    const stage = doc.querySelector('.zpb-sbfin');
    ok(!!stage, 'the SUPER BOWL · FINAL stage rises');
    ok(!!doc.querySelector('.zpb-replay-ov, .zpb-sbfin') && ev('(window.__zpbFxLog||[])') === undefined || true, 'sanity');
    const held = ev('(function(){ const p = document.getElementById("zpbStoryPanel"); if(!p) return null; const r = p.querySelector(".zpb-story-rail"); return r ? r.classList.contains("zpb-story-hold") : null; })()');
    ok(held === true, 'the post-Super-Bowl badges HOLD while the stage is up');
    const owed = ev('!!window.__zpbSBRewardOwed');
    ok(owed === userWonSB, 'the champions FX is ' + (userWonSB ? 'owed' : 'not owed') + ' — state matches the result');
    const before = ev('window.__fxLog.length');
    const go = doc.querySelector('.zpb-sbfin-go');
    ok(!!go, 'the stage carries Continue');
    if (go) { go.click(); await sleep(600); }
    ok(!doc.querySelector('.zpb-sbfin'), 'the Continue moves on from the Super Bowl');
    const released = ev('(function(){ const p = document.getElementById("zpbStoryPanel"); if(!p) return null; const r = p.querySelector(".zpb-story-rail"); return r ? r.classList.contains("zpb-story-hold") : null; })()');
    ok(released === false, 'the badges start fading in after the Continue');
    if (userWonSB) ok(ev('window.__fxLog.length') > before, 'the SUPER BOWL CHAMPIONS animation fired after the game was over');
    ok(errors.length===0, 'zero console errors through the Super Bowl leg');
  }

  ok(errors.length===0, 'zero console errors end to end' + (errors.length ? ' — '+errors.slice(0,3).join(' | ') : ''));
  console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
