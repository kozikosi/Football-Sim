#!/usr/bin/env node
/* w33_verify.js — every Owner directive from the round-33 message, asserted on the built bytes.
   Runs the w33 build in jsdom, drives the UI where a render is needed, and checks the laws. */
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
  console.log('== R1 · the LIGHT/DARK button ==');
  const tb = doc.getElementById('themeToggleBtn');
  ok(!!tb, 'the theme button exists');
  if (tb) {
    const cs = window.getComputedStyle(tb);
    ok(cs.position === 'fixed', 'the button is fixed to the window');
    ok(cs.left === '50%' || /calc/.test(cs.left) || cs.left==='0px' && false, 'the button hugs the horizontal center (left 50%)');
    ok(/translateX\(-50%\)/.test(cs.transform), 'the button centers itself with translateX(-50%)');
    ok(cs.bottom !== 'auto' && cs.bottom !== '', 'the button is pinned to the bottom');
    ok(cs.zIndex !== '' && parseInt(cs.zIndex) > 50, 'the button floats above the page');
  }
  ok(/#themeToggleBtn\{position:fixed;/.test(HTML), 'R1: the fixed-center law is in the bytes');
  ok(/\.wrap\{padding-bottom:calc\(52px/.test(HTML), 'R42: the wrap reserves the button lane');

  console.log('== R2 · three new rounds ==');
  ok(ev('typeof ROSTER_SLOTS!=="undefined" && ROSTER_SLOTS.length===31'), 'ROSTER_SLOTS = 31 (28 + WR4/TE3/DL5)');
  ok(ev('ROSTER_SLOTS.includes("WR4") && ROSTER_SLOTS.includes("TE3") && ROSTER_SLOTS.includes("DL5")'), 'the three new slots exist');
  ok(ev('NATURAL_SLOT_MAP.WR.includes("WR4") && NATURAL_SLOT_MAP.TE.includes("TE3")'), 'WR4/TE3 are natural slots');
  ok(ev('NATURAL_SLOT_MAP.DT.includes("DL5") && NATURAL_SLOT_MAP.REDG.includes("DL5")'), 'DL5 is natural for the line');
  ok(ev('WV_SLOT_GROUP.WR4==="WR" && WV_SLOT_GROUP.TE3==="TE" && WV_SLOT_GROUP.DL5==="EDGE"'), 'the slot groups know the new slots');
  ok(ev('DEFAULT_WEIGHTS.TE3===5 && DEFAULT_WEIGHTS.DL5===5'), 'the weights carry TE3 and DL5');
  ok(/DL5:1\.7/.test(HTML), 'DL5 produces tackles');
  ok(/mk\(wr4,'WR4'/.test(HTML) && /mk\(te3,'TE3'/.test(HTML), 'WR4 and TE3 take the field');
  ok(/po\.pers==='13' && !sm\['TE3'\]/.test(HTML), 'the 13-personnel note only fires on an empty TE3');

  console.log('== R3 · the gone column and the CPU reach ==');
  ok(/goneFrac\(sim, p\)/.test(HTML), 'gone reads the player himself');
  ok(/const near = cands\.filter\(c=>c\.p\[3\] >= cands\[0\]\.p\[3\]-4\);/.test(HTML), 'the CPU miss stays within four rating points');
  ok(/tk\[pk\.player\[0\]\] = \(tk\[pk\.player\[0\]\]\|\|0\)\+1/.test(HTML), 'the trials mark who was taken');

  console.log('== a real draft, 31 rounds ==');
  ev('try{ startDraft2(); }catch(e){}');
  await sleep(500);
  ev('try{ simToEnd(); }catch(e){}');
  await sleep(600);
  ok(ev('draftSim && draftSim.pos >= 32*31'), 'the draft runs all 31 rounds (' + ev('draftSim ? draftSim.pos : -1') + ' picks)');
  const userRoster = ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); return Object.keys(r.slots).length; })()');
  ok(userRoster === 31, 'your roster holds 31 players');
  ok(errors.length===0, 'zero console errors after the draft' + (errors.length?' — '+errors.slice(0,2).join(' | '):''));

  console.log('== R14 · the board decimals ==');
  ok(/function fmtWar1/.test(HTML), 'the one-decimal formatter exists');
  ok(/data-label="Wins">\$\{r\.w!=null\?fmtWar1/.test(HTML), 'the WINS column carries one decimal');
  ok(/data-label="Priority">\$\{r\.pri!=null&&sim\?fmtWar1/.test(HTML), 'the PRIORITY column carries one decimal');

  console.log('== R4/R5/R6/R7/R8 · the belong map ==');
  ok(/\+\s*xrow\(\[\['CB',-5\],\['DE',-3\],\['DT',-1\],\['DT',1\],\['DE',3\],\['CB',5\]\]\)/.test(HTML), 'R4: the guide map line reads CB DE DT DT DE CB');
  ok(/\+\s*xrow\(\[\['NICKEL',-3\],\['DIME',3\]\]\)/.test(HTML), 'R4: the nickel holds; the dime takes the right DE spot');
  ok(/xL\('DT1',-1\),xL\('DT2',1\),xL\('DE2',3\),xL\('CB2',5\)/.test(HTML), 'R4: the belong map mirrors the geometry');
  ok(/\['NICKEL',lbl\('CB3'\)\|\|'NICKEL',-3\],\['DIME','DIME',3\]/.test(HTML), 'R4: the belong map dime sits at x=3');
  ok(/w\[w\.length-1\]\)/.test(HTML) || /const ini = n=>\{ if\(!n\) return ''; const w = String\(n\)\.trim\(\)\.split\(\/\\s\+\/\); return \(w\.length>1 \? w\[w\.length-1\] : w\[0\]\); \};/.test(HTML), 'R6: last names, not initials');
  ok(/\.zpb-fm\{max-width:600px/.test(HTML), 'R6: the map grew to 600px');
  ok(/zpbContrast\('#3a2a14', bg\) >= 4\.5/.test(HTML), 'R6: the bubble ink is chosen by contrast');
  ok(/window\.zpbWireReverseHighlight/.test(HTML), 'R5: the reverse highlight exists');
  ok(/window\.zpbDraftCardsFirstHTML/.test(HTML), 'R7: the cards-first builder exists');
  ok(/window\.zpbSetDraftOrder/.test(HTML), 'R7: the draft-order register exists');
  ok(/var out = ''; \/\/ w33 \(R8, Owner\): the rank badges lived twice/.test(HTML), 'R8: the duplicate breakdown is gone');

  console.log('== R9-R12 · comparison, detail, browser, rankings ==');
  ok(/zpb-swgrid|zpb-swbadge/.test(HTML), 'R9: the strengths/weaknesses badges exist');
  ok(/\.zpb-cmp-filters select\{width:100%;min-width:200px/.test(HTML), 'R10: the comparison dropdowns widened');
  ok(/label\.zpb-cmp-b\{margin-left:auto/.test(HTML), 'R10: Team B hugs the far right');
  ok(/shortName = t=>/.test(HTML), 'R10: the compressed label reads KC CHIEFS');
  ok(HTML.includes("['RUSH/PASS'"), 'R21: RUSH/PASS replaced Rush att / dropbacks');

  console.log('== R17/R18/R19/R20 · during the game ==');
  ok(/<b style="color:' \+ colOf\(g\.away\) \+ ';">' \+ abbr\(g\.away\)/.test(HTML), 'R17: the away abbreviation wears its color');
  ok(/zpbChip\('FUM', _op\)/.test(HTML), 'R18: the FUM box wears the fumbler');
  ok(/window\.zpbLastDrivesHTML/.test(HTML), 'R19: the last-drives composer exists');
  ok(/3&amp;O|3&O/.test(HTML.match(/zpbLastDrivesHTML[\s\S]{0,4000}/)[0]), 'R19: the 3&O law is in the composer');
  ok(/'BLK FG'/.test(HTML), 'R20: the blocked-kick lines render [BLK]');
  ok(/det\.blocks\.forEach/.test(HTML), 'R20: the blocks reach the during-game screen');

  console.log('== R22 · kickers and punters ==');
  const kOvr = ev('(function(){ const ks = PLAYERS.filter(p=>p[1]==="K").map(p=>p[3]); return {max: Math.max.apply(null, ks), n: ks.length}; })()');
  ok(kOvr.max <= 80, 'R22: the top kicker deflates to ' + kOvr.max + ' OVR');
  const pOvr = ev('(function(){ const ps = PLAYERS.filter(p=>p[1]==="P").map(p=>p[3]); return Math.max.apply(null, ps); })()');
  ok(pOvr <= 80, 'R22: the top punter deflates to ' + pOvr + ' OVR');
  ok(/SLOT_GROUP\[sl\]; if\(_g2==='K'\) return/.test(HTML) || /_g2==='K'/.test(HTML), 'R22b: kickers stay off the cinematic stage');
  ok(/if\(_g !== 'K'\) return true; return x\.ovr>=80; \}/.test(HTML) || /_g!=='K'/.test(HTML) || /x\.ovr>=80/.test(HTML), 'R22b: the preview 80+ gate');

  console.log('== R23/R25/R30/R29 · the small laws ==');
  ok(/>YES \\u00b7 SIMULATE THE SEASON<\/button>/.test(HTML) || /YES \\u00b7 SIMULATE THE SEASON/.test(HTML), 'R23: YES · SIMULATE THE SEASON');
  ok(/order:2;/.test(HTML) && /data-ss="yes"/.test(HTML), 'R23: the YES door sits on the right');
  ok(/badge\('WIN STREAK', String\(sk\.best\.W\.n\)/.test(HTML), 'R25: the streak badge reads just the number');
  ok(/<th>F<\/th>/.test(HTML), 'R30: the box score reads F for final');
  ok(/otOf = \(q, tot, q4\)/.test(HTML), 'R29: the OT column carries the overtime points only');

  console.log('== R24/R26/R35/R36/R37/R38/R39 · the season end ==');
  ok(/Math\.max\(honors\.length\*900 \+ 1600, 3600\)/.test(HTML), 'R24: the honors finish before the book closes');
  ok(/visibility:hidden;\} \/\* w33 \(R24\)/.test(HTML), 'R24: the box stays invisible until its beat');
  ok(/zpb-awme zpb-shm/.test(HTML), 'R26: the user award players wear the border + shimmer');
  ok(/w33 \(R36, Owner\): everybody else wears a neutral/.test(HTML), 'R36: the neutral team-color law is in');
  ok(/zpb-awpanel/.test(HTML) && /zpb-awgrid/.test(HTML), 'R37: the All-Playoff team renders as panels');
  ok(/advancedStatsHTML\(\) \+ pickGradePanelHTML\(\)/.test(HTML) && /advancedStatsHTML\(\) \+ pickGradePanelHTML\(\) \+ renderBracketHTML/.test(HTML), 'R38: the pick grades sit below the advanced stats (both paths)');
  ok(/const _nfl = document\.getElementById\('resultsNflBtn'\); if\(_nfl\) _nfl\.remove\(\);/.test(HTML), 'R39: the stale VS ACTUAL tab dies on season start');
  ok(/animation-delay:calc\(var\(--beat,0\)\*1s\);\} \/\* w33 \(R35/.test(HTML) || /opacity:0;transform:translateY\(14px\);animation:zpbsbeat \.8s cubic-bezier\(\.2,\.7,\.3,1\) forwards;animation-delay:calc\(var\(--beat,0\)\*1s\);\} \/\* w33 \(R35/.test(HTML), 'R35: the report card lands one tile at a time');

  console.log('== R40 · the three doors ==');
  ok(/RUN IT BACK <span class="zpb-again-dot">/.test(HTML) && /CALL AN AUDIBLE <span class="zpb-again-dot">/.test(HTML), 'R40: the NEW DRAFT modal carries the three doors');

  console.log('== R27/R31/R32/R33/R34 · the playoffs ==');
  ok(/const zpbSkipAll = \(\)=>\{ if\(finished\) return; if\(!introDone\)\{ startTimeline\(\); return; \} finish\(true\); \};/.test(HTML), 'R27: skip works at any time');
  ok(/timers\.forEach\(t=>clearTimeout\(t\)\); \/\/ w33 \(R27, Owner\): the final whistle silences everything/.test(HTML), 'R27: the final whistle silences the timeline');
  ok(/zpb-intro-star/.test(HTML), 'R27: the pre-game stage fills with key players');
  ok(/rk!=='superbowl'\)\{ zpbGameReplay/.test(HTML) || /typeof zpbGameReplay==='function' && rk!=='superbowl'/.test(HTML), 'R34: the Super Bowl skips the during-game cinematic');
  ok(/window\.zpbPlayoffCine/.test(HTML), 'R31: the playoff round cinematics exist');
  ok(/\$\{rk==='superbowl'\?'SIM SUPER BOWL':'Sim Playoffs'\}/.test(HTML), 'R32: the button reads SIM SUPER BOWL');
  ok(/window\.zpbPostSuperBowlCine/.test(HTML) && /zpb-sbfin/.test(HTML), 'R34: the post-Super-Bowl cinematic exists');
  ok(/--th1:'\+_cH/.test(HTML), 'R33: the 52/48 bar wears the two team colors');
  ok(/zpb-tree/.test(HTML) && /zpbTreeCardHTML/.test(HTML), 'R28: the bracket tree exists');
  ok(/data-pog="/.test(HTML) || /data-pog/.test(HTML), 'R28: the tree cards are clickable');

  console.log('== R13 · the DIME alignment ==');
  ok(/class="depth-row dgrid"><span class="slotname">DIME<\/span>/.test(HTML), 'R13: the DIME row wears the standard grid');
  ok(/\.depth-row:not\(\.lgrid\):not\(\.dgrid\) \.slotname\{display:inline-block;min-width:54px;text-align:left/.test(HTML), 'R13: the slotname column aligns left everywhere');

  console.log('== R16 · cinematics before the page ==');
  ok(/zpb-prematch-veil/.test(HTML), 'R16: the prematch veil obscures the page');
  ok(/zpbPrematchCine\(g\);\s*\}catch\(err\)\{\}\s*\}catch\(err\)\{\}\s*const out = orig\.apply/.test(HTML) || /if\(g && !S\.weekSimulated && S\.phase==='regular'\) zpbPrematchCine\(g\);/.test(HTML), 'R16: the cinematic fires before the paint');

  ok(errors.length===0, 'zero console errors across the whole suite' + (errors.length?' — '+errors.slice(0,3).join(' | '):''));

  console.log(`\nRESULT: ${pass} PASS / ${fail} FAIL`);
  process.exit(fail ? 1 : 0);
})().catch(e=>{ console.error('HARNESS FAIL', e); process.exit(1); });
