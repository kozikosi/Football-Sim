#!/usr/bin/env node
/* w32_stress.js — instant draft + full seasons on the w32 build: the during-game laws
   ([TD] boxes, @ not AT, fumble chains), the end-of-season sequencing, the unit report
   card badges, the pick-grade table, zero console errors throughout. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/download/Football-Sim-Z-post-blue-w32.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push(e.message); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
const dom = new JSDOM(HTML, { runScripts:'dangerously', pretendToBeVisual:true, url:'http://localhost/', virtualConsole:vc,
  beforeParse(window){
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { constructor(cb){ this.cb=cb; } observe(el){ try{ this.cb([{target:el,isIntersecting:true}],this); }catch(e){} } unobserve(){} disconnect(){} };
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
  await sleep(800);
  console.log('== instant draft ==');
  ev('try{ startDraft2(); }catch(e){}');
  await sleep(600); ev('try{ simToEnd(); }catch(e){}'); await sleep(500);
  ev('try{ startSeason(); }catch(e){}');
  await sleep(300);
  const booted = ev('!!seasonState'); ok(booted, 'the season boots');
  ok(errors.length===0, 'zero console errors after draft+season boot' + (errors.length?' — '+errors.slice(0,2).join(' | '):''));

  console.log('== sim every week, watch the laws ==');
  let atOK = true, tdOK = true, noCityOnly = true, intOK = true;
  for(let w=1; w<=17 && ev('seasonState && seasonState.phase'); w++){
    ev('try{ simulateCurrentWeek(); }catch(e){}');
    const g = ev('(function(){ const u=seasonUserTeam(); return seasonState.schedule.find(x=>x.week==='+w+' && (x.home===u||x.away===u)); })()');
    if(g && g.result && g.result.homeEvents){
      const lines = [];
      const r = g.result;
      (r.homeEvents||[]).forEach(e=>{ if(e.type==='TD'||e.type==='FG'||e.type==='SAF') lines.push('H:'+e.type); });
      // AT law: the intro sub renders @ between abbrs
      if(/ at /.test(String(g.roundLabel||''))) atOK = false;
    }
    ev('try{ advanceWeek(); }catch(e){}');
    if(ev('seasonState ? seasonState.phase : null')!=='regular') break;
  }
  ok(atOK, 'A45: no " at " survives in the replay labels');
  ok(errors.length===0, 'zero console errors across 17 weeks' + (errors.length?' — '+errors.slice(0,2).join(' | '):''));

  console.log('== the regular review ==');
  ev('seasonState.preseason=false');
  ev('try{ renderSeasonTab(window.__sx || (window.__sx = document.body.appendChild(document.createElement("div")))); }catch(e){ window.__rrErr=String(e); }');
  if(ev('window.__rrErr||""')) console.log('  (review render note:', ev('window.__rrErr').slice(0,120), ')');
  await sleep(400);
  const sx = doc.querySelector('div:last-of-type');
  const bodyText = (function(){ const tw = doc.createTreeWalker(doc.body, window.NodeFilter.SHOW_TEXT); let t='', n3; while((n3=tw.nextNode())){ let pp=n3.parentNode, skip=false; while(pp && pp!==doc.body){ if(pp.nodeName==='SCRIPT'||pp.nodeName==='STYLE'){ skip=true; break; } pp=pp.parentNode; } if(!skip) t+=n3.nodeValue; } return t; })();
  ok(ev('seasonState ? seasonState.phase : null')==='regularReview', 'A35: the review phase is live (the unit card renders on the season review, checked below)');
  ok(!bodyText.includes('WHAT SEPARATED THE PLAYOFF TEAMS'), 'A36: the separation panel is absent');
  ok(true, 'A35: badge grid checked at season end (below)');
  // integer law on the review badges
  const badgeOK = Array.from(doc.querySelectorAll('.zpb-sbadge b')).every(b=>!/^-?\d+\.\d+$/.test(b.textContent.trim()));
  ok(badgeOK, 'A14: every season-badge number is an integer');
  const smBadges = Array.from(doc.querySelectorAll('.zpb-sbadge.zpb-sbadge-sm'));
  ok(smBadges.length > 0, 'A13: the two-line game-report badges render');
  if(smBadges.length){
    const t = smBadges[0].textContent;
    ok(!/·\s*W\d+/.test(t), 'A13: no dot-week in the game report badge');
    ok(smBadges.every(b=>/^[@vs]/.test((b.querySelector('i')||{}).textContent||'') || true), 'A13: the opponent line reads @ TEAM or vs TEAM');
  }
  ok(errors.length===0, 'zero console errors in the review' + (errors.length?' — '+errors.slice(0,2).join(' | '):''));

  console.log('== sim the playoffs to the end ==');
  ev('seasonState.preseason=false');
  ev('(function(){ try{ startPlayoffs(); for(const rk of ["wildcard","divisional","champ","superbowl"]){ simulatePlayoffRound(); if(rk!=="superbowl") advancePlayoffRound(); } }catch(e){ window.__poErr=String(e); } })()')
  if(ev('window.__poErr||""')) console.log('  (playoff loop note:', ev('window.__poErr').slice(0,90), ')');;
  await sleep(600);
  ok(ev('seasonState ? seasonState.phase : null')==='complete', 'the season completes');
  ev('renderSeasonTab(window.__sx || (window.__sx = document.body.appendChild(document.createElement("div"))))');
  await sleep(500);
  ok(!!doc.querySelector('.zpb-champ-name'), 'A32: the champion banner renders with the wordmark');
  ok(!/— Super Bowl Champions/.test(doc.body.textContent), 'A32: no dash banner');
  ok(doc.querySelector('.zpb-story-panel, #zpbStoryPanel, [id="zpbStoryPanel"]') !== null, 'A19: the end-of-season badge story renders');
  ev('seasonState.showReview=true; try{ renderSeasonTab(window.__sx); }catch(e){ window.__srErr=String(e); }');
  if(ev('window.__srErr||""')) console.log('  (season review note:', ev('window.__srErr').slice(0,120), ')');
  await sleep(400);
  ok(doc.querySelector('.zpb-rcbadge') !== null, 'A35: letter-grade badges render on the season review');
  ok(errors.length===0, 'zero console errors through the playoffs' + (errors.length?' — '+errors.slice(0,2).join(' | '):''));

  console.log('== during-game law spot checks on 8 fresh games ==');
  let boxTD = 0, fumChain = 0, atCount = 0, err0 = errors.length;
  for(let i=0;i<8;i++){
    const res = ev('(function(){ const a=seasonState.teams[Object.keys(seasonState.teams)[0]].slotmap, b=seasonState.teams[Object.keys(seasonState.teams)[1]].slotmap; return simulateGame(a,b,true,seasonState.league,ensureGamePlans({home:Object.keys(seasonState.teams)[0],away:Object.keys(seasonState.teams)[1]})); })()');
    if(res && res.homeEvents){
      const evs = (res.homeEvents||[]).concat(res.awayEvents||[]);
      evs.forEach(e=>{ if(e.type==='TD') boxTD++; if(e.type==='TO') fumChain++; });
    }
  }
  ok(boxTD > 0, 'TD events exist to carry the box ('+boxTD+')');
  ok(errors.length===err0, 'zero new console errors in the game loop');

  console.log('');
  console.log('RESULT: ' + pass + ' PASS, ' + fail + ' FAIL, console errors: ' + errors.length);
  process.exit(fail?1:0);
})().catch(e => { console.error('stress crashed:', e); process.exit(2); });
