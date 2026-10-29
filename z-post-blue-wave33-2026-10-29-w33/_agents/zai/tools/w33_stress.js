#!/usr/bin/env node
/* w33_stress.js — draft (31 rounds) -> 17 weeks -> review -> playoffs -> Super Bowl -> complete,
   with during-game law spot checks, the gone-monotonicity probe, the replay skip drill,
   the post-Super-Bowl path, and a mobile-width overflow sweep. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/download/Football-Sim-Z-post-blue-w33.html', 'utf8');
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
  console.log('== gone monotonicity probe (R3) ==');
  const probe = ev(`(function(){
    const out = {viol:0, vex:[], sampled:0};
    try{ startDraft2(); }catch(e){ return {err:String(e)}; }
    const S = draftSim;
    let guard = 4000;
    while(S.pos < 20*32 && guard--){
      const ti = S.order[S.pos];
      const pk = cpuPick(ti, S);
      if(!pk || !pk.slot) break;
      executePick(ti, pk.player, pk.slot);
    }
    const {entries} = boardEntries();
    const wrs = entries.filter(r=>r.p[1]==='WR' && r.gone!=null).sort((a,b)=>b.p[3]-a.p[3]);
    out.sampled = wrs.length;
    out.rows = wrs.slice(0,10).map(r=>r.p[0]+' '+r.p[3]+' gone '+(r.gone*100).toFixed(0)+'%');
    for(let i=0;i<wrs.length;i++) for(let j=0;j<i;j++){
      if(wrs[j].p[3] > wrs[i].p[3] && wrs[i].gone > wrs[j].gone + 0.20){ out.viol++; if(out.vex.length<4) out.vex.push(wrs[j].p[0]+' '+wrs[j].p[3]+' vs '+wrs[i].p[0]+' '+wrs[i].p[3]); }
    }
    return out;
  })()`);
  ok(!probe.err, 'the probe ran' + (probe.err ? ' — ' + probe.err : ''));
  console.log('   sampled WR entries:', probe.sampled, '| big inversions:', probe.viol);
  (probe.rows||[]).forEach(r=>console.log('   ', r));
  ok(probe.viol <= 2, 'R3: gone reads per-player (at most trivial inversions, was 2816)');
  ok(errors.length===0, 'zero console errors in the probe' + (errors.length?' — '+errors.slice(0,2).join(' | '):''));

  console.log('== full draft to 31 rounds ==');
  ev('try{ simToEnd(); }catch(e){ window.__dErr=String(e); }');
  await sleep(700);
  ok(ev('draftSim && draftSim.pos >= 32*31'), 'all 992 picks made');
  ok(ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); return Object.keys(r.slots).length; })()') === 31, 'your roster is full at 31');
  const flexed = ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); let n=0; for(const s in r.slots){ const p=r.slots[s]; if(Array.isArray(p) && typeof isOutOfPosition==="function" && isOutOfPosition(p[1],s)) n++; } return n; })()');
  console.log('   flexed slots on your roster:', flexed);
  ok(errors.length===0, 'zero console errors after the draft');

  console.log('== the season: 17 weeks ==');
  ev('try{ startSeason(); }catch(e){ window.__sErr=String(e); }');
  await sleep(300);
  ok(!!ev('seasonState'), 'the season boots' + (ev('window.__sErr||""') ? ' — '+ev('window.__sErr') : ''));
  ok(ev('ROSTER_SLOTS.length===31 && seasonState.teams && Object.keys(seasonState.teams).length===32'), '32 teams carry 31-slot rosters');
  const wkWR4 = ev('(function(){ const u = seasonUserTeam(); const sm = seasonState.teams[u].slotmap; return {wr4: !!sm.WR4, te3: !!sm.TE3, dl5: !!sm.DL5}; })()');
  ok(wkWR4.wr4 && wkWR4.te3 && wkWR4.dl5, 'the WR4 / TE3 / DL5 slots hold drafted players');
  let weeks = 0;
  for(let w=1; w<=17 && ev('seasonState && seasonState.phase==="regular"'); w++){
    ev('try{ simulateCurrentWeek(); }catch(e){} try{ advanceWeek(); }catch(e){}');
    weeks++;
  }
  console.log('   weeks played:', weeks, '| phase:', ev('seasonState.phase'));
  ok(ev('seasonState.phase')==='regularReview', 'the regular season completes into the review');
  ok(errors.length===0, 'zero console errors across 17 weeks');

  console.log('== the review page ==');
  ev('seasonState.preseason=false;');
  ev('try{ renderSeasonTab(document.getElementById("seasonHost") || document.body.appendChild(document.createElement("div"))); }catch(e){ window.__rErr=String(e); }');
  await sleep(500);
  ok(!ev('window.__rErr||""'), 'the review renders' + (ev('window.__rErr||""') ? ' — '+ev('window.__rErr').slice(0,120) : ''));
  ok(!doc.body.textContent.includes('What drives winning in this model'), 'the retired 100-seasons bar stays retired');
  ok(errors.length===0, 'zero console errors in the review');

  console.log('== the playoffs to the Super Bowl ==');
  ev('(function(){ try{ startPlayoffs(); }catch(e){ window.__pErr=String(e); } })()');
  await sleep(200);
  for(const rk of ['wildcard','divisional','champ']){
    ev(`(function(){ try{ simulatePlayoffRound(); advancePlayoffRound(); }catch(e){ window.__pErr=String(e); } })()`);
    await sleep(150);
  }
  ok(!ev('window.__pErr||""'), 'three rounds simulated' + (ev('window.__pErr||""') ? ' — '+ev('window.__pErr').slice(0,120) : ''));
  ok(ev('seasonState.currentPlayoffRound')==='superbowl', 'the bracket reaches the Super Bowl');
  const btnLabel = ev('(function(){ const b = document.getElementById("simRestBtn"); return b ? b.textContent : "(no button on this render)"; })()');
  console.log('   sim button label at the Super Bowl:', btnLabel);
  // re-render the playoff view to read its button
  ev('try{ renderSeasonTab(document.querySelector("#seasonHost") || document.body.lastElementChild); }catch(e){}');
  const btnLabel2 = ev('(function(){ const b = document.getElementById("simRestBtn"); return b ? b.textContent : ""; })()');
  ok(btnLabel2 === 'SIM SUPER BOWL', 'R32: the button reads SIM SUPER BOWL (' + btnLabel2 + ')');
  ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__sbErr=String(e); } })()');
  await sleep(200);
  ok(ev('seasonState.phase')==='complete', 'the Super Bowl lands on the complete phase' + (ev('window.__sbErr||""')?' — '+ev('window.__sbErr'):''));
  ok(!!ev('seasonState.champion'), 'a champion is crowned: ' + ev('seasonState.champion'));
  ok(!!ev('seasonState.sbFinal'), 'R34: the SB final is staged for the post-Super-Bowl page');
  ok(ev('window.__zpbSBFinPending===true'), 'R34: the post-Super-Bowl cinematic is owed');
  ok(errors.length===0, 'zero console errors through the playoffs');

  console.log('== the post-Super-Bowl page ==');
  ev('try{ renderSeasonTab(document.body.lastElementChild); }catch(e){ window.__cErr=String(e); }');
  await sleep(900);
  ok(!ev('window.__cErr||""'), 'the complete view renders' + (ev('window.__cErr||""') ? ' — '+ev('window.__cErr').slice(0,120) : ''));
  ok(ev('window.__zpbSBFinPending===false'), 'R34: the cinematic fired on the paint');
  ok(!!doc.querySelector('.zpb-sbfin'), 'R34: the dramatic post-Super-Bowl stage is up');
  if(doc.querySelector('.zpb-sbfin')) doc.querySelector('.zpb-sbfin-go').click();
  ok(errors.length===0, 'zero console errors at the end of it all');

  console.log('== the during-game cinematic drill (R27) ==');
  const replayDrill = ev(`(function(){
    try{
      const S = seasonState; if(!S) return 'no season';
      // any played playoff game works for the drill — the cinematic is game-shaped, not user-shaped
      const g = (S.playoffRounds && S.playoffRounds.wildcard || []).find(x=>x.result && x.result.homeEvents && x.result.homeEvents.length) || null;
      if(!g || !g.result) return 'no playoff game';
      const u = seasonUserTeam();
      window.__zpbSilent = false;
      // close the old overlay if any
      const old = document.querySelector('.zpb-replay-ov'); if(old) old.remove();
      zpbGameReplay(g, u);
      const ov = document.querySelector('.zpb-replay-ov');
      if(!ov) return 'no overlay opened';
      const skip = ov.querySelector('#zrepSkip');
      const hasStars = ov.querySelectorAll('.zpb-intro-star').length;
      skip.click(); // during the intro — must end the intro, not declare a winner
      const finalShown = !!ov.querySelector('.zpb-rep-final');
      if(finalShown) return 'SKIP DURING INTRO DECLARED THE RESULT';
      const introGone = !ov.querySelector('.zpb-rep-intro');
      skip.click(); // now during the timeline — must finish
      const final2 = !!ov.querySelector('.zpb-rep-final');
      ov.remove();
      return JSON.stringify({introStars:hasStars, introSkipped:introGone, finishedOnSecondSkip:final2});
    }catch(err){ return 'err ' + err.message; }
  })()`);
  console.log('   drill:', replayDrill);
  try{
    const d = JSON.parse(replayDrill);
    ok(d.finishedOnSecondSkip === true, 'R27: the second skip lands the final whistle');
    ok(d.introSkipped === true, 'R27: the first skip ends the intro without a result');
    ok(d.introStars >= 3, 'R27: the pre-game stage fills with key players (' + d.introStars + ' stars)');
  }catch(e){ ok(false, 'R27: the drill returned ' + replayDrill); }

  console.log('== the season options ==');
  ev('(function(){ try{ seasonState.showReview = true; renderSeasonTab(document.body.lastElementChild); }catch(e){} })()');
  await sleep(300);
  const doors = ev('(function(){ const b = document.getElementById("newDraftFromSeasonBtn"); if(!b) return "no button"; b.click(); const box = document.querySelector(".zpb-again-box"); if(!box) return "no modal"; const t = box.textContent; const open = document.querySelectorAll(".zpb-again-box").length; document.querySelectorAll(".confirm-ov").forEach(x=>x.remove()); return JSON.stringify({modal:open, run:/RUN IT BACK/.test(t), audible:/CALL AN AUDIBLE/.test(t), cancel:/Cancel/.test(t)}); })()');
  try{ const d2 = JSON.parse(doors); ok(d2.run && d2.audible && d2.cancel, 'R40: the three doors open'); }
  catch(e){ ok(false, 'R40: ' + doors); }

  console.log(`\nRESULT: ${pass} PASS / ${fail} FAIL`);
  process.exit(fail ? 1 : 0);
})().catch(e=>{ console.error('HARNESS FAIL', e); process.exit(1); });
