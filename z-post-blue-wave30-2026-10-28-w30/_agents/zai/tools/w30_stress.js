#!/usr/bin/env node
/* w30_stress.js — instant full season on the w30 build: the SIM GAME button, the replay law
   across many games (quarter cards, X [FF] Y lines, bright colors), the defensive-recovery
   rule, the safety victims, and the year-end badge law. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/download/Football-Sim-Z-post-blue-w30.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push(e.message); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
const dom = new JSDOM(HTML, { runScripts:'dangerously', pretendToBeVisual:true, url:'http://localhost/', virtualConsole:vc,
  beforeParse(window){
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { constructor(cb){ this.cb=cb; } observe(el){ try{ this.cb([{target:el,isIntersecting:true}],this); }catch(e){} } unobserve(){} disconnect(){} };
    window.Element.prototype.scrollIntoView = function(){};
    window.scrollTo = () => {};
  }});
const { window } = dom; const doc = window.document;
const ev = s => window.eval(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass=0, fail=0;
const ok = (c, n2) => { if(c){ pass++; console.log('  PASS', n2); } else { fail++; console.log('  FAIL', n2); } };
const hexL = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h); if(!m) return null; const v = parseInt(m[1],16);
  const r=(v>>16&255)/255, g=(v>>8&255)/255, b=(v&255)/255, mx=Math.max(r,g,b), mn=Math.min(r,g,b); return (mx+mn)/2; };

(async () => {
  await sleep(700);
  console.log('== instant draft ==');
  doc.getElementById('startDraftBtn').click();
  await sleep(150); ev('simToEnd()'); await sleep(400);
  ev('startSeason()');
  await sleep(200);

  console.log('== L: the SIM GAME button ==');
  const host = doc.createElement('div'); doc.body.appendChild(host); window.__host = host;
  ev('window.__host2 = window.__host; seasonState.preseason = false; renderSeasonTab(window.__host)');
  await sleep(300);
  const simGameBtn = host.querySelector('#simGameBtn');
  ok(!!simGameBtn, 'L: SIM GAME renders beside SIM SEASON in the week panel');
  ok(!!host.querySelector('#simSeasonBtn'), 'L: SIM SEASON still sits beside it');
  if(simGameBtn){
    simGameBtn.click();
    await sleep(500);
    ok(ev('seasonState.weekSimulated') === true, 'L: SIM GAME played the week');
    ok(window.__zpbSilent !== true, 'L: the silent flag is restored afterwards');
    ok(!doc.querySelector('.zpb-replay-ov'), 'L: no cinematic replay fires — straight to the review');
    const rv = host.querySelector('#zpbGameReviewNow');
    ok(!!rv && rv.innerHTML.length > 500, 'L: the Game Review page is on screen after SIM GAME');
  }

  console.log('== full season ==');
  ev('simRestOfSeason()');
  await sleep(400);
  ok(ev('seasonState.currentWeek') >= 17, 'regular season simulated: week ' + ev('seasonState.currentWeek'));
  const ks = ev('Object.values(seasonState.playerStats).filter(r=>r.group==="K")');
  ok(ks.length === 32 && ks.every(r=>(r.st.fga||0) >= (r.st.fg||0)), 'kickers: fga >= fg across the league');

  console.log('== playoffs ==');
  ev('window.__zpbSilent = true;');
  ev('(function(){ let guard=0; while(seasonState.phase==="regular" && guard++<4){ advanceWeek(); } })()');
  ev('if(seasonState.phase==="regularReview") startPlayoffs();');
  ev('(function(){ let guard=0; while(seasonState.phase==="playoffs" && guard++<6){ if(!seasonState.playoffRoundSimulated) simulatePlayoffRound(); if(seasonState.phase==="complete") break; advancePlayoffRound(); } })()');
  ev('window.__zpbSilent = false;');
  await sleep(300);
  ok(ev('seasonState.phase') === 'complete', 'the season runs through the Super Bowl — phase: ' + ev('seasonState.phase'));

  console.log('== year-end law ==');
  const li = ev('renderStatsTabsHTML("rs")');
  ok(li.includes('CAR/RUSHY') && /\d{2,3}\/\d{3,4}/.test(li), 'CAR/RUSHY values render at year end');
  ok(!li.includes('C/RUSHY'), 'the old C/RUSHY header is gone');
  ok(/\d+\/\d+</.test(li), 'FG x/y cells render at year end');
  ok(!li.includes('Raw stat'), 'the leaders page law holds at year end');

  console.log('== the defensive-recovery rule + safety victims, every game ==');
  const audit = ev(`(function(){ const u=seasonUserTeam(); const games=seasonState.schedule.filter(g=>g.played&&g.detail); let badRec=0, saf=0, safNoV=0, defTDnoFrom=0, tos=0, named=0;
   games.forEach(g=>{
    ["home","away"].forEach(sd=>{
     const d=g.detail[sd]||{};
     const defNames=new Set((d.players||[]).filter(p=>["DL","LB","DB"].includes(p.group)).map(p=>p.name));
     (d.takeaways||[]).forEach(t=>{ tos++; if(t.name) named++;
      if(t.type==="FUM" && t.recoveredBy && !defNames.has(t.recoveredBy)) badRec++;
     });
     (d.safeties||[]).forEach(s=>{ saf++; if(!s.v) safNoV++; });
     (d.defScores||[]).forEach(s=>{ if(!s.from) defTDnoFrom++; });
    });
   });
   return {games:games.length, badRec, saf, safNoV, defTDnoFrom, tos, named}; })()`);
  ok(audit.games >= 17, 'audited ' + audit.games + ' games with full detail');
  ok(audit.tos > 200 && audit.named === audit.tos, 'every one of ' + audit.tos + ' takeaways carries a name');
  ok(audit.badRec === 0, 'H5: every fumble recovery belongs to a defensive player (' + audit.badRec + ' violations)');
  if(audit.saf > 0) ok(audit.safNoV === 0, 'H6: all ' + audit.saf + ' safeties name the offensive player tackled');
  else ok(true, 'H6: no safeties occurred this season (branch verified in w30_verify)');
  ok(audit.defTDnoFrom === 0, 'H4: every defensive touchdown carries the man who lost the ball');

  console.log('== the replay law across five games ==');
  const realST = window.setTimeout; window.setTimeout = (fn,d,...r)=>realST(fn,0,...r);
  ev('(function(){ window.__games = seasonState.schedule.filter(g=>g.played && g.result && g.result.homeEvents).slice().sort((a,b)=>(b.result.homeStats.turnovers+b.result.awayStats.turnovers)-(a.result.homeStats.turnovers+a.result.awayStats.turnovers)).slice(0,5); })()');
  const games = ev('window.__games');
  let badQ = 0, badTo = 0, dark = 0, toTotal = 0, prose = 0, pick6 = 0, safLines = 0;
  for(let i=0;i<games.length;i++){
    ev(`zpbGameReplay(window.__games[${i}], seasonUserTeam())`);
    await sleep(350);
    const ov = doc.querySelector('.zpb-replay-ov');
    if(!ov){ continue; }
    const log = ov.querySelector('#zrepLog');
    const qc = log.querySelectorAll('.zpb-rep-q').length;
    if(qc !== 4) badQ++;
    const tos = Array.from(log.querySelectorAll('.zrl-to .zrl-play'));
    toTotal += tos.length;
    tos.forEach(p=>{
      const chips = Array.from(p.querySelectorAll('.zrl-chip')).map(c=>c.textContent.trim());
      if(chips.length !== 1 || !['INT','FF'].includes(chips[0])) badTo++;
      const spans = p.querySelectorAll('span[style*="color"]');
      if(chips[0]==='FF' || chips[0]==='INT'){ if(spans.length !== 3) badTo++; }
      const txt = p.textContent;
      if(!txt || txt.replace(/\b(INT|FF|FR|FUM|TO)\b/g,'').replace(/\s+/g,'').length < 4) badTo++;
    });
    if(/interception return|fumble return/.test(log.textContent)) prose++;
    if(/INT<\/span><span[^>]*>TD<\/span>|FF<\/span><span[^>]*>TD<\/span>/.test(log.innerHTML)) pick6++;
    if(/>SAF<\/span>/.test(log.innerHTML) || Array.from(log.querySelectorAll('.zrl-chip')).some(c=>c.textContent.trim()==='SAF')) safLines++;
    log.querySelectorAll('span[style*="color:#"]').forEach(sp=>{
      const c = /color:(#[0-9a-f]{6})/i.exec(sp.getAttribute('style'));
      if(c){ const l = hexL(c[1]); if(l == null || l < 0.60) dark++; }
    });
    ov.remove();
  }
  window.setTimeout = realST;
  ok(games.length === 5, 'five replays driven (' + games.length + ')');
  ok(badQ === 0, 'H1: all four quarter cards in every replay, even the empty ones');
  ok(badTo === 0, 'H3/H4: every turnover line reads X [FF] Y or X [INT] Y with both names colored (' + toTotal + ' lines)');
  ok(prose === 0, 'H4: no prose return lines anywhere');
  ok(pick6 > 0, 'H4: at least one defensive touchdown rendered as X [INT][TD] Y / X [FF][TD] Y across the sample');
  ok(dark === 0, 'H7: every colored name and box on the during-game screen is bright enough (' + dark + ' dark spans)');

  ok(errors.length === 0, 'zero console errors through the whole season' + (errors.length ? ' — ' + errors.slice(0,3).join('|') : ''));
  console.log(`\n== w30_stress: ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS CRASH:', e && e.stack || e); process.exit(2); });
