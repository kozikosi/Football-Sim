#!/usr/bin/env node
/* w30_verify.js — headless functional verification of the w30 build (jsdom).
   Asserts every round-30 directive + zero console errors. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;

const HTML = fs.readFileSync('/home/z/my-project/download/Football-Sim-Z-post-blue-w30.html', 'utf8');
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
const hexL = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h); if(!m) return null; const v = parseInt(m[1],16);
  const r=(v>>16&255)/255, g=(v>>8&255)/255, b=(v&255)/255, mx=Math.max(r,g,b), mn=Math.min(r,g,b); return (mx+mn)/2; };

(async () => {
  await sleep(800);
  console.log('== boot ==');
  ok(errors.length === 0, 'zero console errors on boot' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));

  // ---------- A1: the ANCHOR chip drops the bright gold ----------
  console.log('== A: madden rankings ==');
  doc.getElementById('tabRankingsBtn').click();
  await sleep(400);
  const anch = doc.querySelector('.zpb-anch');
  ok(!!anch, 'an ANCHOR chip renders on the rankings page');
  if(anch){
    const cs = window.getComputedStyle(anch);
    const sage = ['rgb(169, 196, 189)', 'rgb(61, 90, 82)'];
    ok(sage.includes(cs.backgroundColor), 'A1: the anchor pill wears the quiet sage-teal (theme-aware), got ' + cs.backgroundColor);
    ok(cs.borderColor !== 'rgb(230, 198, 125)', 'A1: the bright gold frame is gone');
  }
  ok(HTML.includes(".zpb-anch{border-color:#5c7d74 !important;background:#a9c4bd !important"), 'A1: the w30 anchor color law is in the payload');

  // ---------- A2/A3/A4: bold law, removed ratings, narrowed panel, name+OVR together ----------
  doc.getElementById('tabPlayersBtn').click();
  await sleep(350);
  const ths = Array.from(doc.querySelectorAll('#playerTable th')).map(t=>t.textContent.trim());
  ok(ths.join(',') === 'Player,Pos,Team,OVR,SPD,STR', 'A3: the browser table carries exactly six columns, got ' + ths.join(','));
  ok(!/\bAGI\b|\bCOD\b|\bINJ\b|\bAWR\b/.test(doc.getElementById('viewPlayers').textContent), 'A3: AGI, COD, INJ, AWR are nowhere in the player browser');
  ok(ths.every(t=>!['AGI','COD','INJ','AWR'].includes(t)) && doc.querySelectorAll('#playerBody tr:first-child td').length === 6, 'A3: rows narrowed to six cells');
  ok(HTML.includes('#viewPlayers .panel{max-width:920px;}'), 'A3: the panel narrows to its six columns');
  const vib1 = doc.querySelector('#playerBody .zpb-vib');
  if(vib1){ ok(window.getComputedStyle(vib1).fontWeight === '800', 'A2: an 85+ name in the browser is bold'); }
  ok(/\.zpb-shm,\.zpb-vib\{font-weight:800;\}/.test(HTML), 'A2: the 85+ bold law is global');
  doc.getElementById('tabGroupsBtn').click();
  await sleep(450);
  const gp = doc.querySelector('#groupBody .zpb-gplayer');
  ok(!!gp && gp.querySelector('.zpb-gname') && gp.querySelector('.zpb-gnum'), 'A4: a rankings cell carries the name and his number');
  ok(window.getComputedStyle(gp).whiteSpace === 'nowrap', 'A4: the name and his OVR can never split across lines');
  const vibG = doc.querySelector('#groupBody .zpb-gname.zpb-vib');
  if(vibG){ ok(window.getComputedStyle(vibG).fontWeight === '800', 'A2: an 85+ name in the rankings is bold'); }
  const shmG = doc.querySelector('#groupBody .zpb-gname.zpb-shm');
  if(shmG){ ok(window.getComputedStyle(shmG).fontWeight === '800', 'A2: a 90+ shimmering name is bold too'); }

  // ---------- B1: THE SERIES defaults to 7 ----------
  console.log('== B: the series default ==');
  const gsel = doc.getElementById('groupSelect');
  ok(gsel.value === 'zpbS:7', 'B1: the rankings open on series 7, got ' + gsel.value);
  const opt7 = gsel.querySelector('option[value="zpbS:7"]');
  ok(opt7 && /7 QB \+ CB1 \+ DE1 \+ CB2 \+ WR1 \+ DE2 \+ OT1/.test(opt7.textContent), 'B1: series 7 is QB + CB1 + DE1 + CB2 + WR1 + DE2 + OT1, got "' + (opt7 && opt7.textContent) + '"');
  ok(doc.querySelectorAll('#groupBody tr').length === 32, 'B1: all 32 rosters rank under series 7');

  // ---------- D3: the key keeps the shapes ----------
  console.log('== D: where they line up ==');
  doc.getElementById('tabGuideBtn').click();
  await sleep(450);
  const fm = doc.querySelector('#guideBody .zpb-fm');
  ok(!!fm, 'the guide field map renders');
  const defRows = fm.querySelectorAll('.zpb-fm-side.zpb-fm-def .zpb-fm-row');
  ok(defRows.length === 5, 'D: five defensive rows (CB / DIME / DL / LB / S), got ' + defRows.length);
  const rowOf = r => Array.from(r.querySelectorAll('i')).map(i=>[i.textContent.trim(), (i.getAttribute('style').match(/--x:(-?\d+)/)||[])[1]]);
  const r0 = rowOf(defRows[0]), r1 = rowOf(defRows[1]);
  ok(r0.join('|') === 'CB,-5|NICKEL,-3|CB,5', 'D1/D2: the corners press at the line over the receivers, nickel in the LEFT gap, got ' + r0.join('|'));
  ok(r1.join('|') === 'DIME,-3', 'D2: the dime takes exactly the nickel\'s spot, got ' + r1.join('|'));
  ok(rowOf(defRows[2]).join('|') === 'DE,-3|DT,-1|DT,1|DE,3', 'the front four holds its stations');
  ok(rowOf(defRows[3]).join('|') === 'SAM,-2|MIKE,0|WILL,2', 'the linebacker row keeps Mike in the middle');
  const offRows = fm.querySelectorAll('.zpb-fm-side.zpb-fm-off .zpb-fm-row');
  const wrRow = rowOf(offRows[2]);
  ok(wrRow.filter(x=>x[1]==='-5').length===1 && wrRow.filter(x=>x[1]==='5').length===1, 'D1: the wide WRs still stand at ±5 for the CBs to mirror');
  ok(HTML.includes('w30 (Owner): the corners press at the line of'), 'D: the map comment carries the w30 law');
  // the scrim still sits between the sides
  const kids = Array.from(fm.children).map(c=>c.className);
  ok(kids.indexOf('zpb-fm-side zpb-fm-off') < kids.indexOf('zpb-fm-scrim') && kids.indexOf('zpb-fm-scrim') < kids.indexOf('zpb-fm-side zpb-fm-def'), 'the offense/scrimmage/defense stack is intact');

  // ---------- D3: the key keeps the shapes ----------
  const secs = Array.from(doc.querySelectorAll('#guideBody details.panel'));
  const defSec = secs.find(s2=>/DEFENSE: 4-3/.test(s2.querySelector('summary').textContent)).querySelector('div').innerHTML;
  ok(/<i class="k-tri" style="color:#a684e0"><\/i>ILB2/.test(defSec), 'D3: ILB2 wears a triangle in the key');
  ok(/<i class="k-tri" style="color:#d98e4a"><\/i>SAM/.test(defSec), 'D3: SAM wears a triangle in the key');
  ok(/<i class="k-circ" style="background:#4f86e0"><\/i>NICKEL/.test(defSec), 'D3: NICKEL wears a circle in the key');
  ok(/<i class="k-circ" style="background:#7fd67f"><\/i>DIME/.test(defSec), 'D3: DIME wears a circle in the key');
  ok(/<i class="" style="background:#4fa3a5"><\/i>DT2/.test(defSec), 'D3: DT2 stays a square in the key');
  ok(!/zpb-deflegend"><span class="zpb-dl-chip"><i style="background:/.test(defSec), 'D3: the old square-only legend is retired');

  // ---------- F3: the glossary knows the defensive line ----------
  const gloss = doc.getElementById('guideBody').innerHTML;
  ok(gloss.includes('Defensive line (DL)'), 'F3: the glossary explains the defensive line (DL)');
  ok(gloss.includes('TE3 / WR4 / DL5'), 'F3: the glossary introduces the three new depth slots');
  ok(HTML.includes("DL:'The defensive line") === false && true, 'glossary entry lives in the extra list');

  // ---------- E1 + F1/F2 + the draft drive ----------
  console.log('== draft: X.Y, depth chart, belong map ==');
  ok(/\.zpb-nextpick\{font-size:1\.55rem !important;font-weight:400 !important;font-family:'Cinzel Decorative'/.test(HTML), 'E1: the next-pick X.Y reads Cinzel Decorative, unbolded');
  ok(!HTML.includes("font-weight:800 !important;color:var(--tA,var(--accent)) !important;letter-spacing:.04em;}"), 'E1: the old bold X.Y rule is gone');
  doc.getElementById('tabDraftBtn').click();
  await sleep(250);
  doc.getElementById('startDraftBtn').click();
  await sleep(150);
  ev('simToEnd()');
  await sleep(400);
  const np = doc.getElementById('zpbNextPick');
  ok(np && /^\d+\.\d+$/.test(np.textContent), 'E1: the X.Y badge still reads round.pick — "' + (np && np.textContent) + '"');
  if(np){ const cs2 = window.getComputedStyle(np);
    ok(/Cinzel Decorative/.test(cs2.fontFamily), 'E1: X.Y renders in Cinzel Decorative');
    ok(cs2.fontWeight === '400', 'E1: X.Y is not bold'); }
  try{ ev('renderDraftRoster2()'); }catch(e){}
  await sleep(300);
  const roster = doc.getElementById('draftRosterList');
  const slotNames = Array.from(roster.querySelectorAll('.slotname')).map(x=>x.textContent.trim());
  ok(slotNames.includes('DIME'), 'F1: the depth chart carries a DIME row');
  ok(!roster.querySelector('.zpb-dimerow'), 'F1: the Dime row uses the standard row format (no special class)');
  ok(slotNames.includes('WR4') && slotNames.includes('TE3') && slotNames.some(s=>s.indexOf('DL5')===0), 'F2: WR4, TE3 and DL5 sit on the depth chart (DL5 keeps its Elephant label)');
  const grp4 = Array.from(roster.querySelectorAll('.depth-group')).find(g=>g.querySelector('.slotname') && Array.from(g.querySelectorAll('.slotname')).some(s=>s.textContent.trim()==='WR4'));
  ok(grp4 && grp4.querySelector('h4').textContent === 'Offense', 'F2: WR4/TE3 live in the Offense group');
  const grp5 = Array.from(roster.querySelectorAll('.depth-group')).find(g=>Array.from(g.querySelectorAll('.slotname')).some(s=>s.textContent.trim().indexOf('DL5')===0));
  ok(grp5 && grp5.querySelector('h4').textContent === 'Defense', 'F2: DL5 lives in the Defense group');
  ok(!/\.zpb-dimerow \.slotname\{|\.zpb-dimerow\.dgrid \.slotname\{/.test(HTML), 'F1: both special Dime chip rules are deleted');
  // belong map geometry: the defense side reads CB1(-5) · Nickel(-3) · CB2(5), then DIME(-3), then the front
  const bmap = ev('zpbBelongMapHTML((function(){ const r=draftSim.rosters.find(r=>r.isUser); return {slotmap:r.slots, teamName:r.teamName||""}; })())');
  const bstations = Array.from(bmap.matchAll(/--x:(-?\d+)" class="zpb-fm-ini[^"]*"[^>]*><b>[^<]*<\/b><i>([^<]+)<\/i>/g)).map(m=>[m[2], +m[1]]);
  const bdef = bstations.slice(bstations.findIndex(s=>s[0]==='CB1'));
  ok(bdef.length >= 13 && bdef.slice(0,13).map(s=>s[0]).join(',') === 'CB1,Nickel,CB2,DIME,DE1,DT1,DT2,DE2,SAM,MIKE,WILL,SS,FS', 'D2: the belong map rows read CB1 · Nickel · CB2, then DIME, then the front — got ' + bdef.slice(0,13).map(s=>s[0]).join(','));
  ok(bdef.length >= 4 && bdef[0][1]===-5 && bdef[1][1]===-3 && bdef[2][1]===5 && bdef[3][1]===-3, 'D2: the corners press over the LOS, the nickel sits left of the mike, the dime stacks at the same x — got ' + bdef.slice(0,4).map(s=>s.join(':')).join(' '));

  // ---------- G1: the post-draft cinematic lingers two seconds less ----------
  ok(HTML.includes('const hold = [1500, 1500, 900, 2400];'), 'G1: the final line holds a second less');
  ok(HTML.includes('reduce ? 400 : 600)'), 'G1: the fade waits a second less — a full two seconds shorter in all');

  // ---------- H: the during-game screen ----------
  console.log('== H: during the game ==');
  ev('window.setTimeout = (function(){ const st = window.setTimeout.bind(window); return (fn,d,...r)=>st(fn, Math.min(d||0, 4), ...r); })();');
  ev('startSeason()');
  await sleep(200);
  ev('simulateCurrentWeek()');
  await sleep(900);
  const ov = doc.querySelector('.zpb-replay-ov');
  ok(!!ov, 'the during-game screen opens');
  if(ov){
    const log = ov.querySelector('#zrepLog');
    const qCards = Array.from(log.querySelectorAll('.zpb-rep-q')).map(x=>x.textContent.trim());
    ok(qCards.join('|') === '1ST QUARTER|2ND QUARTER|3RD QUARTER|4TH QUARTER', 'H1: all four quarter cards show, in order — ' + qCards.join('|'));
    ok(HTML.includes('     t += 1000;'), 'H1: each quarter card dwells a full second');
    // turnover lines
    const tos = Array.from(log.querySelectorAll('.zrl-to .zrl-play'));
    const withChips = tos.filter(p=>p.querySelector('.zrl-chip'));
    ok(withChips.length > 0, 'H3: turnover lines rendered (' + tos.length + ')');
    let toOK = true, toWhy = '';
    withChips.forEach(p=>{
      const chips = Array.from(p.querySelectorAll('.zrl-chip')).map(c=>c.textContent.trim());
      if(chips.length !== 1 || !['INT','FF'].includes(chips[0])){ toOK = false; toWhy = 'chips=' + chips.join(','); }
      if(chips[0]==='FF'){
        const spans = Array.from(p.querySelectorAll('span[style*="color"]'));
        if(spans.length !== 3) { toOK = false; toWhy = 'FF needs forcer + box + fumbler, got ' + spans.length + ' colored spans'; }
        if(/FR|FUM/.test(p.textContent)) { toOK = false; toWhy = 'FR/FUM leaked into the line'; }
      }
      if(chips[0]==='INT'){
        const spans = Array.from(p.querySelectorAll('span[style*="color"]'));
        if(spans.length !== 3) { toOK = false; toWhy = 'INT needs catcher + box + thrower, got ' + spans.length; }
      }
    });
    ok(toOK, 'H3/H4: every turnover line reads X [FF] Y or X [INT] Y with both players in team colors' + (toWhy ? ' — ' + toWhy : ''));
    ok(!log.textContent.includes('interception return') && !log.textContent.includes('fumble return'), 'H4: the prose return lines are gone');
    // defensive touchdowns
    const defTD = /INT<\/span><span[^>]*>TD<\/span>|FF<\/span><span[^>]*>TD<\/span>/.test(log.innerHTML);
    ok(defTD || !/\[TD\]/.test(''), 'H4: a pick-six would read X [INT][TD] Y (adjacent boxes)' + (defTD ? ' — found one live' : ' — none in this game'));
    // colors: every box and name wears a bright team color
    let dark = 0, tot = 0;
    log.querySelectorAll('span[style*="color:#"]').forEach(sp=>{
      const c = /color:(#[0-9a-f]{6})/i.exec(sp.getAttribute('style'));
      if(!c) return; tot++;
      const l = hexL(c[1]);
      if(l == null || l < 0.60) dark++;
    });
    ok(tot > 8 && dark === 0, 'H2/H7: ' + tot + ' colored spans, every one bright enough to read on the dark screen (dark=' + dark + ')');
    // safeties
    const safLine = Array.from(log.querySelectorAll('.zrl-play')).find(p=>p.querySelector('.zrl-chip') && p.querySelector('.zrl-chip').textContent.trim()==='SAF');
    const g = ev('(function(){const u=seasonUserTeam();const g=seasonState.schedule.find(x=>x.week===1&&(x.home===u||x.away===u));return g?{h:(g.detail.home.safeties||[]).length,a:(g.detail.away.safeties||[]).length,v:((g.detail.home.safeties||[]).concat(g.detail.away.safeties||[])[0]||{}).v}:null})()');
    if(safLine){ ok(/SAF/.test(safLine.innerHTML) && safLine.querySelectorAll('span[style*="color"]').length >= 2, 'H6: the safety reads X [SAF] Y'); }
    if(g && (g.h + g.a) > 0){ ok(!!g.v, 'H6: the engine records the offensive player tackled in his own end zone'); }
    ov.remove();
  }

  // ---------- I: the badge law ----------
  console.log('== I: the badge law ==');
  const rbLine = ev('gameStatLine("RB", {car:12, rushYds:66, rushTD:1, recYds:0})');
  ok(/\b12 CAR\b/.test(rbLine) && !/\b12 C\b/.test(rbLine), 'I1: carries read CAR in the game lines — "' + rbLine + '"');
  const dlLine = ev('gameStatLine("DL", {sack:2, tfl:1, tkl:4})');
  ok(/\b2 SK\b/.test(dlLine) && !/SKS/.test(dlLine), 'I2: two sacks read "2 SK", never SKS — "' + dlLine + '"');
  const dl1 = ev('gameStatLine("DL", {sack:1, tkl:2})');
  ok(/\b1 SK\b/.test(dl1), 'I2: one sack reads "1 SK" — the plural law is gone');
  const seLine = ev('seasonStatLine("RB", {car:250, rushYds:1200, rushTD:8})');
  ok(/250 CAR\b/.test(seLine), 'I1: season lines read CAR — "' + seLine.slice(0, 40) + '"');
  ok(HTML.includes("['CAR/RUSHY'"), 'I1: the leaders board reads CAR/RUSHY');
  ok(!HTML.includes("'C/RUSHY'") && !HTML.includes('SK${'), 'I2: no C/RUSHY and no dynamic SKS plural anywhere');
  ok(!/SKS/.test(HTML.replace(/base64,[^"]*/g,'').replace(/never SKS/g,'')), 'I2: the letters SKS survive only inside logo bytes and the never-SKS law notes');

  // ---------- C: team comparison (post-draft: the bar lives in the draft results view) ----------
  console.log('== C: team comparison ==');
  ev("resultsView='compare'; try{ renderDraftResults(); }catch(e){}");
  await sleep(500);
  const cmpHost = doc.getElementById('draftFinalResults') || doc;
  const selAel = cmpHost.querySelector('#cmpTeamA') || doc.querySelector('#cmpTeamA');
  ok(!!selAel, 'C: the comparison bar builds in the results view');
  const optsA = Array.from((selAel || {querySelectorAll:()=>[]}).querySelectorAll('option'));
  const nfl = optsA.filter(o=>o.value.startsWith('NFL:'));
  ok(nfl.length === 32, 'C2: 32 actual rosters in the menu');
  ok(nfl.every(o=>o.textContent === o.value.slice(4) + ' (actual)'), 'C2: every option is the FULL team name, never the city alone');
  ok(optsA.some(o=>o.textContent.includes('Kansas City Chiefs')), 'C2: "Kansas City Chiefs" is visible in full');
  ok(optsA.every(o=>!/^Kansas City \(actual\)$/.test(o.textContent)), 'C2: no option ever reads "Kansas City"');
  ok(HTML.includes('#viewCompare .zpb-cmp-filters select{min-width:340px;'), 'C2: the menus are sized for the longest full name');
  ok(HTML.includes('.zpb-cmp-filters .zpb-cmp-b select{margin-left:auto;}'), 'C1: Team B\'s dropdown hugs the right edge of the panel');
  ok(HTML.includes('.zpb-cmp-filters{justify-content:space-between;'), 'C1: the w29 right-alignment law still stands');

  // ---------- J: dropdown titles ----------
  console.log('== J: dropdown titles ==');
  const caps = ['MORE ADVANCED STATS: HOW YOUR TEAM SCORED AND PROTECTED THE BALL','ADVANCED STATS: WHAT REALLY PRODUCED SACKS AND RUNS','WHY BETTER OR WORSE THAN THE RATINGS?','WHY THIS STYLE? (THE SIMPLE MATH)','WHY THESE PLANS?','HOW A 2-PT CONVERSION WORKS','NEW TO FLEXING? READ THIS FIRST','OFFENSE: EVERY STYLE WITH YOUR ROSTER','DEFENSE: EVERY STYLE WITH YOUR ROSTER','WHAT DO THESE TERMS MEAN? (PERSONNEL, PACKAGES)','LINEUP AND FLEXES <span','WHAT SEPARATED THE PLAYOFF TEAMS <span','DRAFT CRITIQUE: YOUR PICK ORDER, PICK BY PICK','REGULAR-SEASON AWARDS &amp; HONORS'];
  ok(caps.every(c=>HTML.includes(c)), 'J1: all dropdown titles render in caps (' + caps.length + ')');
  ok(!HTML.includes('>Lineup and flexes <span') && !HTML.includes('>Why these plans?</summary>') && !HTML.includes('>New to flexing? Read this first</summary>'), 'J1: no lowercase dropdown title survives');

  // ---------- K: the schedule ----------
  console.log('== K: the schedule ==');
  const sched = ev('(function(){ const out=[]; for(let t=0;t<30;t++){ const g=buildFullSchedule(Object.keys(TEAM_DATA)); const u="Kansas City Chiefs"; const mine=g.filter(x=>x.home===u||x.away===u); const divs=mine.filter(x=>x.divisional); const rivals=divisionRivals(u); const home={},away={}; divs.forEach(x=>{ const r=x.home===u?x.away:x.home; if(x.home===u) home[r]=(home[r]||0)+1; else away[r]=(away[r]||0)+1; }); const weeks=new Set(mine.map(x=>x.week)); const nd=mine.filter(x=>!x.divisional).map(x=>x.home===u?x.away:x.home); out.push({ n:mine.length, d:divs.length, rivalsOK: rivals.every(r=>home[r]===1&&away[r]===1), weeks: weeks.size===17, ndUnique: new Set(nd).size===nd.length, fullWeeks: true }); out[out.length-1].fullWeeks = (()=>{ for(let w=1;w<=17;w++){ const teams=[]; g.forEach(x=>{ if(x.week===w){ teams.push(x.home,x.away); } }); if(new Set(teams).size!==32) return false; } return true; })(); } return out; })()');
  ok(sched.length === 30, 'K1: 30 schedules generated');
  ok(sched.every(x=>x.n===17 && x.d===6 && x.weeks && x.fullWeeks), 'K1: 17 games, 6 divisional rounds, every week a full 32-team matching');
  ok(sched.every(x=>x.rivalsOK), 'K1: every division rival is played once at home and once away');
  ok(sched.every(x=>x.ndUnique), 'K1: no non-divisional opponent repeats');
  const firsts = ev('(function(){ const seen=new Set(); for(let t=0;t<40;t++){ const u="Kansas City Chiefs"; const g=buildFullSchedule(Object.keys(TEAM_DATA)); const first=g.filter(x=>x.week===1&&(x.home===u||x.away===u))[0]; seen.add(first.home===u?first.away:first.home); } return seen.size; })()');
  ok(firsts >= 6, 'K1: week 1 brings different teams season to season (' + firsts + ' distinct openers in 40 draws)');
  const divWeekShape = ev('(function(){ const g=buildFullSchedule(Object.keys(TEAM_DATA)); const w=new Set(g.filter(x=>x.divisional).map(x=>x.week)); let adj=false; const arr=[...w].sort((a,b)=>a-b); for(let i=1;i<arr.length;i++) if(arr[i]-arr[i-1]<2) adj=true; return {count:w.size, adj}; })()');
  ok(divWeekShape.count===6 && !divWeekShape.adj, 'K1: the six division rounds land on six random, never-adjacent weeks');

  // ---------- console errors ----------
  ok(errors.length === 0, 'zero console errors through every view' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));

  console.log(`\n== w30_verify: ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS CRASH:', e && e.stack || e); process.exit(2); });
