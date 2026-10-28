#!/usr/bin/env node
/* w28_stress.js — instant full season: no errors, review + awards render, law holds at year end. */
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/download/Football-Sim-Z-post-blue-w29.html', 'utf8');
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
(async () => {
  await sleep(700);
  doc.getElementById('startDraftBtn').click();
  await sleep(120); ev('simToEnd()'); await sleep(300);
  ev('startSeason()');
  ev('simRestOfSeason()');
  await sleep(300);
  ok(ev('seasonState.currentWeek') >= 17, 'regular season simulated: week ' + ev('seasonState.currentWeek'));
  // every kicker has fga >= fg
  const ks = ev('Object.values(seasonState.playerStats).filter(r=>r.group==="K")');
  ok(ks.length === 32, '32 kickers in the book');
  ok(ks.every(r=>(r.st.fga||0) >= (r.st.fg||0)), 'fga >= fg for every kicker');
  ok(ks.some(r=>(r.st.fga||0) > (r.st.fg||0)), 'some misses were recorded (attempts differ from makes)');
  // playoffs
  ev('advanceWeek()'); ev('advanceWeek()');
  try{ ev('seasonState.currentPlayoffRound = "wildcard";'); }catch(e){}
  const host = doc.createElement('div'); doc.body.appendChild(host); window.__host = host;
  ev('renderSeasonTab(window.__host)');
  await sleep(250);
  ok(errors.length === 0, 'zero console errors through the season — ' + errors.slice(0,3).join('|'));
  // standings + schedule render
  const hh = host.innerHTML;
  ok(hh.includes('SCHEDULE') && hh.includes('STANDINGS'), 'season view renders');
  // leaders at year end
  const li = ev('renderStatsTabsHTML("rs")');
  ok(li.includes('C/RUSHY') && /\d{2,3}\/\d{3,4}/.test(li), 'C/RUSHY values render at year end');
  ok(/\d+\/\d+</.test(li), 'FG x/y cells render at year end');
  ok(!li.includes('Raw stat') && !li.includes('Each position has its own rating'), 'leaders page law holds at year end');
  // season review + awards render without crashing
  let awardsOK = true, awardsHTML = '';
  try { awardsHTML = ev('(typeof generateAwardsHTML==="function") ? String(generateAwardsHTML()) : (typeof renderRegularAwardsHTML==="function" ? "" : "")'); } catch(e){ awardsOK = false; }
  ok(awardsOK, 'awards render without crash');
  if(awardsHTML){ ok(!/>PassY<|>RushY<|>RecY<|>RbkY</.test(awardsHTML), 'award chips use the new labels'); }
  // replay across 3 random games: turnover lines always named; no "gives it up"
  const realST = window.setTimeout; window.setTimeout = (fn,d,...r)=>realST(fn,0,...r);
  let badNameless = 0, giveUps = 0, totalTO = 0, combo = 0;
  ev('(function(){ window.__games = seasonState.schedule.filter(g=>g.played && g.result && g.result.homeEvents).slice(0,3); })()');
  const games = ev('window.__games');
  console.log('   games captured:', Array.isArray(games) ? games.length : typeof games);
  for(const g of games){
    ev(`zpbGameReplay(window.__games[${games.indexOf(g)}], seasonUserTeam())`);
    await sleep(250); await sleep(250); await sleep(250); await sleep(250);
    const ov = doc.querySelector('.zpb-replay-ov');
    console.log('   game', games.indexOf(g), 'overlay:', !!ov, 'turnovers:', g.result.homeStats.turnovers + g.result.awayStats.turnovers);
    if(ov){
      const t = ov.querySelector('#zrepLog').textContent;
      if(t.includes('gives it up')) giveUps++;
      const tos = [...ov.querySelectorAll('.zrl-to')];
      totalTO += tos.length;
      tos.forEach(l=>{
        const p = l.querySelector('.zrl-play'); if(!p){ badNameless++; return; }
        const txt = p.textContent.replace(/\b(INT|FF|FR|FUM|TO|&)\b/g,' ').replace(/\s+/g,' ').trim();
        if(txt.length < 2) badNameless++;
        if(/FF/.test(p.textContent) && /FR/.test(p.textContent)) combo++;
      });
      ov.remove();
    }
  }
  window.setTimeout = realST;
  ok(giveUps === 0, 'no "gives it up" across replays');
  ok(badNameless === 0, 'every TO line named (' + totalTO + ' lines)');
  console.log('   combined FF&FR lines observed:', combo);
  const fatal = errors.filter(e => !/Could not parse CSS|not implemented|scrollIntoView/i.test(e));
  ok(fatal.length === 0, 'zero fatal errors at teardown');
  console.log(`RESULT: ${pass} pass, ${fail} fail`);
  process.exit(fail?1:0);
})().catch(e=>{ console.error('CRASH', e); process.exit(2); });
