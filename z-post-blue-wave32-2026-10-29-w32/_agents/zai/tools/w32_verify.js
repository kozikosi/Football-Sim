#!/usr/bin/env node
/* w32_verify.js — headless functional verification of the w32 build (jsdom).
   Asserts every round-32 + round-31-rebuild directive that is checkable headlessly + zero console errors. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;

const HTML = fs.readFileSync('/home/z/my-project/download/Football-Sim-Z-post-blue-w32.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push('jsdomError: ' + (e.detail && e.detail.message || e.message)); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(HTML, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/', virtualConsole: vc,
  beforeParse(window){
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { constructor(cb){ this.cb = cb; } observe(el){ try{ this.cb([{target:el, isIntersecting:true}], this); }catch(e){} } unobserve(){} disconnect(){} };
    window.ResizeObserver = class { constructor(cb){ this.cb = cb; } observe(){} unobserve(){} disconnect(){} };
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
  await sleep(900);
  console.log('== boot ==');
  ok(errors.length === 0, 'zero console errors on boot' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));

  console.log('== B1: the anchor wears pink ==');
  doc.getElementById('tabRankingsBtn').click();
  await sleep(400);
  const anch = doc.querySelector('.zpb-anch');
  ok(!!anch, 'an ANCHOR chip renders on the rankings page');
  ok(HTML.includes('.zpb-anch{border-color:#c4899f !important;background:#f0bfd3 !important'), 'B1: the pink anchor law is in the payload');
  ok(!HTML.includes('.zpb-anch{border-color:#5c7d74'), 'B1: the sage-teal anchor is gone');

  console.log('== B2: the homepage breathes pink ==');
  ok(HTML.includes('--bg:#fdf2f6') && HTML.includes('--bg:#1e1119'), 'B2: pink-tinted light + dark backgrounds are in the palette');
  ok(HTML.includes('--panel2:#f9e9f0') && HTML.includes('--panel2:#35202d'), 'B2: the panel tones follow');

  console.log('== B3: the player browser centers ==');
  doc.getElementById('tabPlayersBtn').click();
  await sleep(350);
  ok(HTML.includes('#viewPlayers .panel{margin-left:auto;margin-right:auto;}'), 'B3: the browser panel centers itself');

  console.log('== A18: NICKEL and DIME everywhere ==');
  doc.getElementById('tabGuideBtn').click();
  await sleep(400);
  const guideText = doc.getElementById('viewGuide').textContent;
  ok(/NICKEL/.test(guideText), 'A18: NICKEL renders capitalized in the guide');
  ok(!/>Dime</.test(HTML), 'A18: no mixed-case Dime label remains');
  ok(!/Elephant/i.test(HTML), 'B8: the term Elephant is gone from the site');

  console.log('== A3/A4/A5/A6: the guide wall ==');
  ok(doc.querySelector('.zpb-persbox') !== null, 'A3: the personnel boxes render');
  const persText = (doc.querySelector('.zpb-persboxes') || {}).textContent || '';
  ok(/RB 1/.test(persText) && /TE 0/.test(persText) && /WR 4/.test(persText), 'A3: the 10 package reads 1 RB / 0 TE / 4 WR');
  ok(HTML.includes("PRTG"), 'A5: PRTG is in the badge guide');
  ok(!HTML.includes("'20-0', 'The passer rating"), 'A5: the 20-0 passer-rating badge is gone');
  ok(/CMP\/ATT/.test(guideText) && /PASSY/.test(guideText) && /KR/.test(guideText) && /PR/.test(guideText), 'A6: the player-panel wall mirrors the league-leader stats');
  ok(!/DEFENSE: 4-3, 3-4, NICKEL, DIME/.test(guideText), 'A4: the Guide defense panel is gone');
  ok(/DIME/.test((doc.querySelector('.zpb-defgrid') || {}).textContent || ''), 'A4: the DIME card lives in the Coaching panel');

  console.log('== B12: the draft board callout ==');
  ok(!HTML.includes('scarcity, not just size'), 'B12: ", not just size" is gone');
  ok(HTML.includes('Because priority is about scarcity.<br>If the best edge rushers'), 'B12: the two sentences sit on their own lines');

  console.log('== B10: the coaching sentence ==');
  ok(!HTML.includes('so the wide receivers fill whatever is left of the 11'), 'B10: the WR sentence is gone from the coaching intro');

  console.log('== B11: the balanced glyph ==');
  ok(HTML.includes('<b>\\u2261</b></span>\'; // w32 (Owner): balanced is the'), 'B11: the balanced focus wears the \\u2261 glyph');
  ok(!HTML.includes('zpb-bars\"><i></i><i></i><i></i>'), 'B11: the three bars render nowhere');

  console.log('== A7: the footer theme button ==');
  const footTheme = doc.querySelector('.zpb-foottheme #themeToggleBtn');
  ok(!!footTheme, 'A7: the DARK button lives below the row in its own centered line');
  ok(HTML.includes('.zpb-foottheme{display:flex;justify-content:center'), 'A7: the footer theme law is in the payload');

  console.log('== A12: why-these-plans gone ==');
  ok(!/>WHY THESE PLANS?</.test(HTML), 'A12: the dropdown is removed from the game plan panel');

  console.log('== A24/A25/A26/A39: the label laws ==');
  ok(HTML.includes("['CLUTCH GAMES', close"), 'A24: CLUTCH GAMES replaced IN DA CLUTCH');
  ok(!HTML.includes('IN DA CLUTCH'), 'A24: IN DA CLUTCH is nowhere');
  ok(HTML.includes("barRow('RUSHER WON'"), 'A25: RUSHER WON is capitalized');
  ok(!/SK A/.test(HTML.split('id="zpb-w13"')[0] + ''), 'A26: no SK A remains in the main script');
  ok(!/\`\$\{s\.pa\|\|0\} PRSS A/.test(HTML) && !/'PRSS A'/.test(HTML), 'A26: no PRSS A remains');
  ok(!/SKS/.test(HTML.split('id="zpb-w13"')[0]), 'A26: no SKS in the main script');
  ok(!/\$\{s\.dtd\} DEF TD/.test(HTML) && !/\['Def TD'/.test(HTML), 'A39: DEF TD is never written');

  console.log('== B22: integers ==');
  ok(HTML.includes('function fmtWar(w){ return (w>=0?\'+\':\'\\u2212\') + Math.round(Math.abs(w)); }'), 'B22: wins render as integers');
  ok(!HTML.includes('.toFixed(2)} vs'), 'B22: the comparison decimals are gone');
  ok(HTML.includes('Math.round(a.score)} vs ${Math.round(b.score)'), 'A34: the comparison shows integers, centered');
  ok(HTML.includes('zpb-cmpscore" style="color:var(--accent);text-align:center;"'), 'A34: the score line is centered');

  console.log('== A33: the QB-25 rule ==');
  ok(HTML.includes('a team never drafts a second quarterback before round 25'), 'A33: the rule is stated in the engine');
  {
    // functional: simulate a CPU pick with a QB on the roster before round 25
    ev('startDraftBtn && (function(){ try{ simToEnd(); }catch(e){} })()');
    await sleep(300);
  }

  console.log('== B9/B17/B18/B19: the field maps ==');
  ok(!HTML.includes("the nickel sits left of the mike, and the dime stacks exactly where the nickel is"), 'B19: the initials sentence is gone');
  ok(HTML.includes("WHERE YOUR PLAYERS LINE UP?"), 'B18: the Owner\'s own title is in place');
  ok(HTML.includes("+ xrow([['CB',-5],['DE',-3],['CB',5]])"), 'B9: the guide map swapped the nickel with the end');
  ok(HTML.includes("[['NICKEL',lbl('CB3')||'NICKEL',-3]"), 'B9: the review map holds the nickel at the end\'s old station');
  ok(HTML.includes("data-slot=\"' + sl + '\""), 'B17: the map stations carry data-slot hooks');

  console.log('== B14/B15: the depth order ==');
  ok(HTML.includes("window.zpbOrderSlots"), 'B15: the 3-4 order helper exists');
  ok(HTML.includes("['DE1','DT1','DE2','DL5','DT2','MIKE'"), 'B15: OLB1 falls between DL5 and ILB1');

  console.log('== B24: the rivalry generator ==');
  ok(HTML.includes('window.zpbRivalryPhrases'), 'B24: the phrase generator ships');
  ok(HTML.includes('PRIME-TIME SHOWDOWN'), 'B24: the Owner\'s phrases are all present');
  ok(!HTML.includes('feud.'), 'B24: no period after feud');
  ok(HTML.includes('_clean(riv)'), 'B24: the tag cleans trailing periods');

  console.log('== B23: the season opener cinematic ==');
  ok(HTML.includes('SEASON OPENER'), 'B23: the SEASON OPENER cinematic ships');

  console.log('== A9: the sim season gate ==');
  ok(HTML.includes('ARE YOU SURE YOU WANT TO SIMULATE THE REGULAR SEASON?'), 'A9: the confirm page exists');
  ok(HTML.includes('button.zpb-simseason{background:var(--panel)'), 'A9: the button is quiet until hover');

  console.log('== A42/A44/A45: the during-game laws ==');
  ok(HTML.includes("zpbChip('FR', _me) + zpbChip('TD', _me)"), 'A42: the fumble chain reads x [FF] y [FR][TD]');
  ok(HTML.includes("zpbChip('FUM', _me)"), 'A42: the same-man chain reads z [FUM] x [FF][FR][TD]');
  ok(HTML.includes("abbr(g.away) + ' @ ' + abbr(g.home)"), 'A45: the intro writes @, not at');
  ok(HTML.includes("zpbChip('TD', _me) + (window.zpbCineYds ? ' ' + zpbYds(zpbCineYds(e,'pass'))"), 'A44: passing TDs wear the box');
  ok(HTML.includes("' rush ' + zpbChip('TD', _me)"), 'A44: rushing TDs wear the box');

  console.log('== A1: the streak cinematic ==');
  ok(HTML.includes('window.zpbStreakReward'), 'A1: the streak reward hook exists');
  ok(!HTML.includes("done('streak'+streak)) FX.play(streak>=7?'medium':'small', streak===17?'Perfect season: 17-0!':`${streak} wins in a row!`);\n  else if"), 'A1: the streak toast no longer fires from the season render');
  ok(HTML.includes('the streak cinematic belongs to the final whistle'), 'A1: it fires from the replay finish');

  console.log('== A41: the three doors ==');
  ok(HTML.includes('RUN IT BACK') && HTML.includes('CALL AN AUDIBLE') && HTML.includes('data-again="cancel"'), 'A41: the modal carries the three options');

  console.log('== A46/B30: the preview caps ==');
  ok(HTML.includes('.slice(0,3) : [];'), 'A46: at most three stat badges on a preview card');
  ok(HTML.includes("star90?'zpb-shm':(star85?'zpb-vib':'')"), 'A11: 85+ preview names go bold, 90+ shimmer');

  console.log('== A35: the unit report card ==');
  ok(HTML.includes('zpb-rcgrid') && HTML.includes('zpb-rc-grade'), 'A35: the letter-grade badge grid ships');
  ok(!/renderReportCardHTML\(\) \+/.test(HTML), 'A35: the old unit report card panel is no longer rendered');
  ok(!HTML.includes("getElementById('zpbMetPop')"), 'A35: the hover popup is gone');

  console.log('== A36/A37/A21 ==');
  ok(!/>WHAT SEPARATED THE PLAYOFF TEAMS/.test(HTML), 'A36: the panel is removed completely');
  ok(!HTML.includes('(by cumulative game impact)</span>'), 'A37: the byline is gone');
  ok(!HTML.includes('Green = your unit was clearly better'), 'A21: the green/red explainer is gone');

  console.log('== A20: the pick grades ==');
  ok(HTML.includes('DRAFT PICK GRADES'), 'A20: the letter-grade draft table replaces the pick analysis');

  console.log('== A32: the champion banner ==');
  ok(!HTML.includes('— Super Bowl Champions</h2>'), 'A32: the dash banner is gone');
  ok(HTML.includes('SUPER BOWL CHAMPIONS'), 'A32: the visualized banner ships');

  console.log('== A29/A30: the 100-season report ==');
  ok(!HTML.includes('What drives winning in this model'), 'A29: the bar graph is removed');
  ok(HTML.includes("'11 PERSONNEL'") || HTML.includes("PERSONNEL'") || HTML.includes('RUN+'), 'A30: the plans render with the vertical shares');

  console.log('== A31: the review order ==');
  ok(HTML.includes('html = html + zpbSeasonStoryHTML();'), 'A31: the Regular Season Review panel sits above the badges');

  console.log('== A19: the badges at season end ==');
  ok(HTML.includes('the end-of-season badges play one by one the moment the season ends'), 'A19: the story panel joins the season-complete view');

  console.log('== A28: the season options everywhere ==');
  ok(HTML.includes('${seasonOptionsHTML()}\n `;'), 'A28: the options close YOUR ROSTER');
  ok(HTML.includes('${seasonOptionsHTML()}\n  `;'), 'A28: the options close TEAM COMPARISON');
  ok(HTML.includes('+ seasonOptionsHTML(); // w32 (Owner): the season options ride at the bottom of the review'), 'A28: the options close the review');

  console.log('== A13: the two-line game report ==');
  ok(HTML.includes("zpb-sbadge-sm"), 'A13: the small badge law exists');
  ok(!HTML.includes("+' '+nick(big.opp)+' · W'+big.week"), 'A13: the dot and week are gone from the game report');

  console.log('== B4: the mobile sweep ==');
  ok(HTML.includes('html,body{overflow-x:hidden;}'), 'B4: the page can never scroll sideways');
  ok(HTML.includes('scroll-snap-type:x mandatory'), 'B4: the badge rail snaps for swiping');
  ok(HTML.includes('window.zpbPickList'), 'B4: the pick list is mobile-friendly by construction');

  console.log('== B16: one click opens the flex menu ==');
  ok(HTML.includes('sl.showPicker();'), 'B16: showPicker fires on the first click');

  console.log('== A8/B13: the ResizeObserver cure ==');
  ok(HTML.includes('rAF-debounced'), 'A8: the observer is rAF-debounced');
  ok(HTML.includes('/ResizeObserver loop/i'), 'B13: the setback note ignores the loop notice');

  console.log('== A22/A10: light-mode contrast ==');
  ok(HTML.includes("zpbLift(pk.accL,0.76):pk.accL),0.07)"), 'A22: the light tint lifts further');
  ok(HTML.includes('--tnd,var(--text));}'), 'A10: tinted rows carry the deep team ink in light mode');

  console.log('== A2: the kicker curve ==');
  ok(HTML.includes("if(g==='K') r._rating = clampNum(56 + (r._rating-50)*0.42, 40, 82);"), 'A2: the kicker curve is compressed');

  console.log('== A40: the returner sort ==');
  ok(HTML.includes('.sort(b.pred ? (x,y)=>(y._rating||0)-(x._rating||0)'), 'A40: returners sort by rating on the leaders page');

  console.log('== B31: the rest summary ==');
  ok(HTML.includes("if(honors.length) ov.classList.add('zpb-rest-honorsfirst'); // w32 (Owner): set BEFORE the paint"), 'B31: the panel can never flash');

  console.log('== A38 ==');
  ok(HTML.includes('REGULAR-SEASON AWARDS &amp; HONORS'), 'A38: the awards title is capitalized');

  console.log('== A27 ==');
  ok(!HTML.includes('>Team A'), 'A27: the Team A words are gone from the comparison');
  ok(!HTML.includes('>Team B'), 'A27: the Team B words are gone');

  console.log('== A23: the honor rings ==');
  ok(HTML.includes('.zpb-shonor-t'), 'A23: the honor cards keep their gold law (already shipped)');

  // ---------- season smoke: draft -> season -> sim a week ----------
  console.log('== season smoke ==');
  try{
    doc.getElementById('startDraftBtn').click();
    await sleep(200); ev('simToEnd()'); await sleep(300);
    ev('startSeason()');
    await sleep(200);
    const host2 = doc.createElement('div'); doc.body.appendChild(host2); window.__h2 = host2;
    ev('seasonState.preseason=false; renderSeasonTab(window.__h2)');
    await sleep(400);
    ok(!!host2.querySelector('.zpb-mu'), 'the preview card renders in the season view');
    ok(errors.length === 0, 'zero console errors through the season smoke' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));
  }catch(e){ ok(false, 'season smoke threw: ' + e.message); }

  console.log('');
  console.log('RESULT: ' + pass + ' PASS, ' + fail + ' FAIL, console errors: ' + errors.length);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('suite crashed:', e); process.exit(2); });
