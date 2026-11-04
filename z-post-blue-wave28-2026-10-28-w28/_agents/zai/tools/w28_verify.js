#!/usr/bin/env node
/* w28_verify.js — headless functional verification of the w28 build (jsdom). */
const fs = require('fs');
const jsdom = require('/home/z/node_modules/jsdom');
const { JSDOM, VirtualConsole } = jsdom;

const HTML = fs.readFileSync('/home/z/my-project/download/Football-Sim-Z-post-blue-w28.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push('jsdomError: ' + (e.detail && e.detail.message || e.message)); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(HTML, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/', virtualConsole: vc,
  beforeParse(window){
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { constructor(cb){ this.cb = cb; } observe(el){ try{ this.cb([{target:el, isIntersecting:true}], this); }catch(e){} } unobserve(){} disconnect(){} };
    window.Element.prototype.scrollIntoView = function(){};
    window.scrollTo = () => {};
  }
});
const { window } = dom;
const doc = window.document;
const ev = s => window.eval(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const ok = (cond, name) => { if(cond){ pass++; console.log('  PASS', name); } else { fail++; console.log('  FAIL', name); } };

(async () => {
  await sleep(800);
  console.log('== boot ==');
  ok(errors.length === 0, 'zero console errors on boot' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));

  console.log('== draft ==');
  doc.getElementById('startDraftBtn').click();
  await sleep(150);
  ok(ev('!!draftSim'), 'draft live');
  ev('simToEnd()');
  await sleep(400);
  ok(ev('draftSim.pos >= draftSim.order.length'), 'draft ran to the end');
  ok(!!doc.getElementById('draftFinalResults'), 'draft results panel exists');
  ok(!!doc.getElementById('resultsNflBtn'), '1a. VS. ACTUAL NFL TEAMS present on the first draft review');

  console.log('== season gate ==');
  ev('resultsView = "nfl"');                       // stale view state
  ev('startSeason()');
  ev('renderDraftResults()');
  await sleep(150);
  ok(!doc.getElementById('resultsNflBtn'), '1b. NFL tab gone once the season exists');
  ok(ev('resultsView') === 'season', '1c. stale nfl view coerced back to SEASON');

  console.log('== game preview (regular week) ==');
  ev('seasonState.preseason = false');
  const host = doc.createElement('div'); doc.body.appendChild(host);
  window.__host = host;
  ev('renderSeasonTab(window.__host)');
  await sleep(250);
  const hostHTML = host.innerHTML;
  ok(!hostHTML.includes('zpb-pvface'), '2. the lower non-Cinzel team-name copy is gone from the preview');
  ok(hostHTML.includes('zpb-strip-team'), '2b. the strip names beside the model bar remain');
  ok(hostHTML.includes('GAME PLAN') && hostHTML.includes('LINEUPS') && hostHTML.includes('MATCHUP MATH'), '15b. preview panel titles capitalized');

  console.log('== simulate week 1 (replay with zero-delay timers) ==');
  const realST = window.setTimeout;
  window.setTimeout = (fn, d, ...rest) => realST(fn, 0, ...rest);
  const simBtn = doc.getElementById('simWeekBtn');
  ok(!!simBtn, 'sim button present');
  if(simBtn) simBtn.click();
  await sleep(500); await sleep(500); await sleep(500); await sleep(500);
  window.setTimeout = realST;

  const host2 = host.innerHTML;
  console.log('== game review ==');
  ok(/<details[^>]* open[^>]*><summary class="narr"[^>]*>TEAM STATS</.test(host2), '15a. TEAM STATS paints open');
  ok(host2.includes('KEY PLAYERS'), '15c. KEY PLAYERS capitalized');
  ok(host2.includes('AROUND THE LEAGUE'), '15d. AROUND THE LEAGUE capitalized');
  const kpCards = [...host.querySelectorAll('.kp-card')];
  ok(kpCards.length >= 2, 'kp: team cards render (review + schedule details)');
  const byTeam = {};
  kpCards.forEach(c=>{
    const t = (c.querySelector('.kp-title b')||{}).textContent || '?';
    (byTeam[t] = byTeam[t] || []).push(...[...c.querySelectorAll('.zpb-pcard-hd b')].map(b=>b.textContent));
  });
  const seen = {}; let cross = [];
  Object.entries(byTeam).forEach(([t, names]) => names.forEach(n2=>{ if(seen[n2] && seen[n2]!==t) cross.push(n2+' ('+seen[n2]+' vs '+t+')'); seen[n2]=t; }));
  ok(cross.length === 0, '13/14. no player appears under two teams — ' + JSON.stringify(cross.slice(0,3)));
  const chips = [...host.querySelectorAll('.zpb-pstat')].map(e=>e.textContent.trim());
  const bad = chips.filter(c => /[a-z]/.test(c) || /yds/i.test(c) || /pancake/i.test(c) || /pressur/i.test(c) || /fumble recovery/i.test(c) || /sacked/i.test(c));
  ok(chips.length > 0 && bad.length === 0, '6-11. chips law — bad: ' + JSON.stringify(bad.slice(0,6)));
  // deterministic chip-law checks on the functions themselves
  const rbLine = ev('gameStatLine("RB",{car:12,rushYds:95,rushTD:1,recYds:38,recTD:1})');
  ok(rbLine === '12 C, 95 RUSHY, 1 TD, 38 RECY, 1 REC TD', '7/8. RB line: ' + rbLine);
  const qbLine = ev('gameStatLine("QB",{cmp:24,att:38,passYds:320,passTD:3,int:1,sackd:2})');
  ok(qbLine.includes('24/38 CMP') && qbLine.includes('320 PASSY') && qbLine.includes('2 SK'), '9. QB line: ' + qbLine);
  const dlLine = ev('gameStatLine("DL",{sack:2,tfl:1,tkl:5})');
  const dl1 = ev('gameStatLine("DL",{sack:1,tfl:1,tkl:5})');
  ok(dlLine.includes('2 SKS') && dl1.includes('1 SK'), '22. SK/SKS on game lines: ' + dlLine);
  const sslDl = ev('seasonStatLine("DL",{sack:2,tfl:1,hur:4,tkl:5})');
  ok(sslDl.includes('2 SKS') && sslDl.includes('4 PRSS') && sslDl.includes('5 TKL'), '21/22b. season DL line: ' + sslDl);
  const kLine = ev('gameStatLine("K",{fg:3,fga:4})');
  ok(kLine.includes('3/4 FG'), '23b. FG x/y chip: ' + kLine);
  const safChip = ev('extraStats("DB",{saf:1})');
  ok(safChip.join(',').includes('1 SAF'), '10. SAF chip: ' + safChip.join(','));
  const retChip = ev('extraStats("WR",{krN:2,krYds:45,prN:1,prYds:9})');
  ok(retChip.join(',').includes('2/45 KR') && retChip.join(',').includes('1/9 PR'), '24b. KR/PR x/y chips: ' + retChip.join(','));

  console.log('== replay log ==');
  const g = ev('seasonState.schedule.find(g=>g.played && (g.home===seasonUserTeam()||g.away===seasonUserTeam()))');
  ok(!!g, 'week 1 game exists');
  const realST2 = window.setTimeout;
  window.setTimeout = (fn, d, ...rest) => realST(fn, 0, ...rest);
  ev('zpbGameReplay(seasonState.schedule.find(g=>g.played && (g.home===seasonUserTeam()||g.away===seasonUserTeam())), seasonUserTeam())');
  await sleep(500); await sleep(500); await sleep(500); await sleep(500); await sleep(500); await sleep(500);
  window.setTimeout = realST2;
  const ov2 = doc.querySelector('.zpb-replay-ov');
  ok(!!ov2, 'replay overlay built');
  if(ov2){
    const logText = ov2.querySelector('#zrepLog').textContent;
    ok(!logText.includes('gives it up'), '3. "gives it up" never appears');
    const toLines = [...ov2.querySelectorAll('.zrl-to')];
    ok(toLines.length > 0, 'replay has turnover lines: ' + toLines.length);
    const noName = toLines.filter(l => {
      const play = l.querySelector('.zrl-play'); if(!play) return true;
      const txt = play.textContent.replace(/\b(INT|FF|FR|FUM|TO|&)\b/g, ' ').replace(/\s+/g,' ').trim();
      return txt.length < 2;
    });
    ok(noName.length === 0, '3b. every TO line names a player');
    const intLines = toLines.filter(l => l.textContent.includes('INT'));
    const fumLines = toLines.filter(l => l.textContent.includes('FUM'));
    console.log('   TO lines:', toLines.length, 'INT:', intLines.length, 'FUM:', fumLines.length);
    const go2 = ov2.querySelector('#zrepGo'); if(go2) go2.click();
    ov2.remove();
  }

  console.log('== week-2 preview order ==');
  ev('advanceWeek()');
  ev('renderSeasonTab(window.__host)');
  await sleep(200);
  const ratings2 = ev('teamPlayerStats(seasonUserTeam()).filter(r=>r.group!=="OL"&&r.ovr).sort((a,b)=>((b._rating!=null?b._rating:(b.ovr||0))-(a._rating!=null?a._rating:(a.ovr||0)))).slice(0,5).map(r=>r.name)');
  const cards2 = [...host.querySelectorAll('.zpb-pvcard .zpb-pcard-hd b')].map(b=>b.textContent);
  const mine2 = ratings2.filter(n2=>cards2.includes(n2));
  ok(mine2.length > 1 && cards2.indexOf(mine2[0]) <= cards2.indexOf(mine2[mine2.length-1]),
     '12. preview players ordered by season rating (' + mine2.slice(0,2).join(' > ') + ')');

  console.log('== league leaders ==');
  const tmp = doc.createElement('div'); doc.body.appendChild(tmp);
  ev('tmp2 = document.getElementById ? 0 : 0');  // noop keepalive
  tmp.innerHTML = ev('renderStatsTabsHTML("rs")');
  const li = tmp.innerHTML;
  ok(!li.includes('Raw stat'), '25. RAW STAT button gone');
  ok(!li.includes('Each position has its own rating'), '16. rating explainer paragraph gone');
  ok(li.includes('TD/INT'), '18. TD/INT combined header');
  const qbSeg = li.slice(li.indexOf('Quarterbacks'), li.indexOf('Running Backs'));
  ok(!/>TD<|>INT<|>Rate<|>2PT</.test(qbSeg), '17. bare TD/INT/Rate/2PT columns gone from the QB board');
  ok(li.includes('C/RUSHY'), '19. C/RUSHY on the RB board');
  ok(!/>Car<|>Rush<|>Lost</.test(li), '17b. Car/Rush/Lost gone from RB board');
  ok(!/Pancakes</.test(li), '17c. Pancakes gone from OL board');
  ok(!/>Blk<|>Saf</.test(li), '17d. Blk/Saf gone from DL/LB/DB boards');
  ok(/Y behind/.test(li), '20/11. OL header Y behind');
  ok(/PRSS A/.test(li) && /SK A/.test(li), '21/22b. PRSS A + SK A on OL board');
  ok(/>SKS</.test(li) && />PRSS</.test(li), '21b/22. SKS + PRSS on DL board');
  ok(/\d+\/\d+</.test(li), '23/24. made/attempts and returns/yards x/y cells present');
  ok(/Total Y</.test(li), '11b. Total Y on the returners board');
  tmp.remove();

  console.log('== guide ==');
  const guide = ev('guideHTMLCached()');
  ok(guide.includes('The M in Mike is for middle'), '26a. Mike etymology');
  ok(guide.includes('The W in Will is for weak side (away from the tight end)'), '26b. Will etymology');
  ok(guide.includes("The S in Sam is for strong side (on the tight end's side)"), '26c. Sam etymology');
  ok(guide.includes('Carries'), '7. C documented in the Guide badges');
  ok(guide.includes('RUSHY') && guide.includes('PASSY'), '8. RUSHY/PASSY in the Guide badges');

  console.log('== team comparison ==');
  const cmpHost = doc.createElement('div'); cmpHost.id = 'wtest-cmp'; doc.body.appendChild(cmpHost);
  ev('renderComparisonTab(document.getElementById("wtest-cmp"), buildResultEntries().draftEntries, buildResultEntries().realEntries)');
  await sleep(150);
  const selB = cmpHost.querySelector('#cmpTeamB');
  const meTeam = ev('buildResultEntries().draftEntries.find(e=>e.isUser).teamName');
  console.log('   user team:', meTeam, '| Team B default:', selB && selB.value);
  ok(selB && /^SIM:/.test(selB.value), '28. Team B defaults to a SIM team');
  const RIVALS = {'Kansas City Chiefs':'Las Vegas Raiders','Buffalo Bills':'Miami Dolphins','Miami Dolphins':'Buffalo Bills','Dallas Cowboys':'Philadelphia Eagles','Philadelphia Eagles':'Dallas Cowboys','Green Bay Packers':'Chicago Bears','Chicago Bears':'Green Bay Packers','Pittsburgh Steelers':'Baltimore Ravens','Baltimore Ravens':'Pittsburgh Steelers','Las Vegas Raiders':'Kansas City Chiefs','New England Patriots':'New York Jets','New York Jets':'New England Patriots','Seattle Seahawks':'San Francisco 49ers','San Francisco 49ers':'Los Angeles Rams','Denver Broncos':'Las Vegas Raiders','Los Angeles Rams':'San Francisco 49ers','Arizona Cardinals':'Seattle Seahawks','Atlanta Falcons':'New Orleans Saints','Carolina Panthers':'Atlanta Falcons','Cleveland Browns':'Pittsburgh Steelers','Cincinnati Bengals':'Pittsburgh Steelers','Detroit Lions':'Green Bay Packers','Green Bay Packers':'Chicago Bears','Houston Texans':'Tennessee Titans','Indianapolis Colts':'Houston Texans','Jacksonville Jaguars':'Tennessee Titans','Los Angeles Chargers':'Las Vegas Raiders','Minnesota Vikings':'Green Bay Packers','New Orleans Saints':'Atlanta Falcons','New York Giants':'Philadelphia Eagles','Tampa Bay Buccaneers':'New Orleans Saints','Tennessee Titans':'Jacksonville Jaguars','Washington Commanders':'Dallas Cowboys'};
  if(RIVALS[meTeam]) ok(selB.value === 'SIM:'+RIVALS[meTeam], '28b. rival mapping exact for ' + meTeam);
  const cmpHTML = cmpHost.innerHTML;
  ok(!cmpHTML.includes('holds the edge') && !/grades [\d.]+ points higher/.test(cmpHTML), '27. verdict sentence gone');
  ok(cmpHTML.includes('Starter-by-Starter'), '27b. comparison tables intact');
  cmpHost.remove();

  console.log('== season stat lines ==');
  const up = doc.createElement('div'); doc.body.appendChild(up);
  try{ up.innerHTML = ev('userStatsInner()'); }catch(e){ errors.push('userStatsInner: '+e.message); }
  const upHTML = up.innerHTML;
  ok(!/\bcar\b|pancakes|pressures allowed|rush yds/.test(upHTML), '8b. season lines use the new law');
  ok(upHTML.includes('RUSHY') || upHTML.includes('PASSY') || upHTML.includes('TKL'), '8c. new tokens present in season lines');
  up.remove();

  console.log('== final ==');
  const fatal = errors.filter(e => !/Could not parse CSS|not implemented|scrollIntoView/i.test(e));
  ok(fatal.length === 0, 'zero fatal console errors — ' + JSON.stringify(fatal.slice(0,4)));
  console.log(`RESULT: ${pass} pass, ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS CRASH', e); process.exit(2); });
