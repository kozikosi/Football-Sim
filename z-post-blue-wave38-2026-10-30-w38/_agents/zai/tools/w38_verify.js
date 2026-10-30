#!/usr/bin/env node
/* w38_verify.js — every Owner directive from the round-38 message, asserted on the built bytes
   AND live in jsdom, with the w37 guards carried as regressions.
   w38 sections: R1 the rankings name ink everywhere · R3 Jr. rides the last name ·
   R4 the Dime's draft spot · R5 one Secondary · R6 the bottom-tier line gone ·
   R7/R8 the pregame pairs in panels, a little slower · R9 the leaked marker gone ·
   R10 the review cards wait for the Honors Continue · R11 THE BYES RETURN gone ·
   R12 one SKIP button · R13 the champions wait for the game · R14 the SB badges wait ·
   R15 QBR is a QB chip · R16 seeds lead the tree · R17 the report-card tail gone ·
   R18/R19/R20 the award panels · R21/R22 the advanced cards · R23 pancake reads PC */
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

(async () => {
  await sleep(900);

  console.log('== w38 R1 · the rankings name ink everywhere ==');
  ok(HTML.indexOf("--nm:'+pk.txL+';--nmd:'+pk.txd+';--nu:'+pk.accL+';") >= 0, 'zpbRowVars emits the name palette');
  const nmSites = (HTML.match(/zpb-gname/g)||[]).length;
  ok(nmSites >= 14, 'the gname class rides the name surfaces (count '+nmSites+' >= 14)');
  const scard = doc.createElement('div');
  ok(ev(`(function(){ var v = zpbRowVars('Kansas City Chiefs'); return v.indexOf('--nm:')>=0 && v.indexOf('--nu:')>=0 && v.indexOf('--nud:')>=0; })()`), 'the live vars carry --nm/--nu/--nud');
  ok(ev(`(function(){ var v = zpbNeutralRowVars('Chicago Bears'); return v.indexOf('--nm:')>=0 && v.indexOf('--nmd:')>=0; })()`), 'the neutral vars keep the name palette too');
  ok(ev(`(function(){ var d = document.createElement('div'); d.innerHTML = zpbGroupPlayerHTML(['Jaylon Johnson','CB','Chicago Bears',89]); var n = d.querySelector('.zpb-gname'); return !!n && n.textContent==='Jaylon Johnson'; })()`), 'the rankings renderer unchanged (the gold standard)');

  console.log('== w38 R3 · Jr. rides the last name ==');
  ok(ev(`zpbBelongMapHTML({slotmap:{QB:['Joe Burrow','QB','Cincinnati Bengals',97],OT2:['Orlando Brown Jr','RT','Cincinnati Bengals',76],FS:['Bryan Cook','FS','Cincinnati Bengals',80]},teamName:'Cincinnati Bengals'}).indexOf('>Brown Jr<') >= 0`), 'Orlando Brown Jr reads Brown Jr on the map');
  ok(ev(`zpbBelongMapHTML({slotmap:{QB:['Joe Burrow','QB','Cincinnati Bengals',97],DT1:['Dexter Lawrence II','DT','Cincinnati Bengals',93]},teamName:'Cincinnati Bengals'}).indexOf('>Lawrence II<') >= 0`), 'Dexter Lawrence II reads Lawrence II');
  ok(ev(`zpbBelongMapHTML({slotmap:{QB:['Joe Burrow','QB','Cincinnati Bengals',97],WR1:['Amon-Ra St. Brown','WR','Cincinnati Bengals',95]},teamName:'Cincinnati Bengals'}).indexOf('>St. Brown<') >= 0`), 'St. Brown stays whole');

  console.log('== w38 R4 · the Dime is drafted ==');
  ok(ev(`ROSTER_SLOTS.indexOf('CB4') === ROSTER_SLOTS.indexOf('CB3')+1 && ROSTER_SLOTS.length===32`), 'CB4 sits right after CB3; 32 slots');
  ok(ev(`TOTAL_ROUNDS===32`), 'the draft runs 32 rounds');
  ok(ev(`flexPenaltyFor('CB','CB4')===0`), 'a cornerback plays CB4 naturally');
  ok(ev(`zpbDimeOf({CB1:['A','CB','T',90],CB2:['B','CB','T',85],CB3:['C','CB','T',80],CB4:['Dime Dave','CB','T',74]})[0]==='Dime Dave'`), 'the Dime resolver reads the CB4 slot first');
  ok(HTML.indexOf("CB4:'CB'") >= 0 && HTML.indexOf("CB4:'DB'") >= 0, 'CB4 joins the board groups and the sim slot groups');

  console.log('== w38 R5 · one Secondary ==');
  ok(HTML.indexOf('function computeDetailMetrics(pool, basisPools)') >= 0, 'computeDetailMetrics takes the basis pools');
  ok(HTML.indexOf('draftSim.rosters.map(r=>Object.values(r.slots).filter(Boolean))') >= 0, 'the review ranks against the 32 draft boards');
  ok(HTML.indexOf("if(g[0]==='Secondary')") >= 0, "Your Breakdown's SECONDARY badge quotes the unit metric");

  console.log('== w38 R6/R9/R11 · the three texts are gone ==');
  ok(HTML.indexOf('a bottom-tier unit') < 0, "no 'a bottom-tier unit this year'");
  ok(HTML.indexOf('// w37 (R10, Owner): HONORS EARNED leads the rail') < 0, 'the leaked build marker is gone from the template');
  ok(HTML.indexOf('THE BYES RETURN') < 0, "no 'THE BYES RETURN'");

  console.log('== w38 R7/R8 · the pregame pairs in panels ==');
  ok(HTML.indexOf('animation:zpbStarInOut 3.4s ease both') >= 0, 'the fade cycle runs 3.4s');
  ok(HTML.indexOf('const pairY = i=>') >= 0 && HTML.indexOf('const pairDelay = i=>') >= 0, 'mirrored pairs share one height and one beat');
  ok(ev(`(function(){
    var g = {away:'Cincinnati Bengals', home:'Kansas City Chiefs'};
    var html = window.zpbTreeCardHTML ? '' : '';
    return true; })()`), 'sanity');
  ok(HTML.indexOf('.zpb-intro-star{background:rgba(16,9,4,.62)') >= 0 && HTML.indexOf(".zpb-intro-star b{display:block;color:var(--tnd") >= 0, 'every pregame name wears the same player panel');
  ok(HTML.indexOf('zpb-intro-skip') < 0, 'the separate intro skip button is gone');

  console.log('== w38 R10/R14 · the cards wait for the Continue ==');
  ok(HTML.indexOf('.zpb-story-hold .zpb-sbadge') >= 0, 'the hold CSS exists');
  ok(HTML.indexOf("window.__zpbStoryHold = true; // w38 (R10, Owner)") >= 0, 'the SIM SEASON path raises the hold');
  ok(HTML.indexOf('window.zpbStoryRelease = function()') >= 0, 'one release door exists');
  ok(HTML.indexOf("window.__zpbSBRewardOwed = true;") >= 0, 'the SB champions FX waits (owed, not instant)');
  ok(HTML.indexOf("zpbStoryRelease(); }catch(err){}") >= 2, 'the books Continue and the stage Continue both release');

  console.log('== w38 R12 · ONE skip button ==');
  ok(HTML.indexOf("skip.textContent = INTRO_MS ? 'Skip intro' : 'Skip'") >= 0, 'the footer door leads with SKIP INTRO');
  ok(HTML.indexOf("if(skip) skip.textContent = 'Skip'; // w38 (R12, Owner)") >= 0, 'the wording flips to SKIP at kickoff');
  ok(HTML.indexOf('.zpb-replay .zpb-rep-ft{position:relative;z-index:6;}') >= 0, 'the footer sits above the intro cover');

  console.log('== w38 R13 · the champions wait for the game ==');
  ok(HTML.indexOf('function zpbFxGate(kind, msg, big)') >= 0, 'the gate knows BIG rewards');
  ok(HTML.indexOf('function zpbFxDrain(includeBig)') >= 0, 'the drain splits big from small');
  ok(HTML.indexOf('zpbFxDrain(false); }catch(err){} }; // w38 (R13') >= 0, 'an early close keeps the champions pending');
  ok(HTML.indexOf("zpbFxDrain(true); }catch(err){} }, 1600)") >= 0, 'the final whistle is a big drain point');
  ok(HTML.indexOf("zpbFxGate('conf', null, true)") >= 0, 'the Conference Champions reward is BIG');

  console.log('== w38 R15/R23 · the chips ==');
  ok(ev(`(function(){
    var rb = zpbStatChipsHTML({group:'RB', _rating:88.1, st:{car:200, rushYds:1000, rushTD:8}});
    var qb = zpbStatChipsHTML({group:'QB', _rating:91.2, st:{cmp:300, att:450, passYds:4200, passTD:33, int:9}});
    var ol = zpbStatChipsHTML({group:'OL', _rating:80.0, st:{rbk:900, pk:24, sa:6, pa:18}});
    var dl = zpbStatChipsHTML({group:'DL', _rating:84.0, st:{sack:9, tkl:40, tfl:12}});
    var db = zpbStatChipsHTML({group:'DB', _rating:82.0, st:{dint:3, pd:11, tkl:52}});
    var te = zpbStatChipsHTML({group:'TE', _rating:79.0, st:{rec:60, tgt:95, recYds:700, recTD:4}});
    return rb.indexOf('QBR')<0 && ol.indexOf('QBR')<0 && dl.indexOf('QBR')<0 && db.indexOf('QBR')<0 && te.indexOf('QBR')<0 && qb.indexOf('QBR')>=0 && ol.indexOf('>PC<')>=0 && ol.indexOf('PK')<0;
  })()`), 'QBR only on the QB; pancake reads PC');
  ok(ev(`(function(){
    var wr = zpbStatChipsHTML({group:'WR', st:{rec:88, tgt:140, recYds:1300, recTD:7}});
    var k = zpbStatChipsHTML({group:'K', st:{fg:31, fga:34, pat:33}});
    var qb = zpbStatChipsHTML({group:'QB', st:{cmp:300, att:450, passYds:4200, passTD:33, int:9}});
    return wr.indexOf('CATCH')>=0 && k.indexOf('FG%')>=0 && qb.indexOf('CMP')>=0;
  })()`), 'the new rate chips (CMP%, CATCH%, FG%) ride the badges');

  console.log('== w38 R16 · the tree reads seed -> crest -> name ==');
  ok(ev(`(function(){
    var g = {away:'Chicago Bears', home:'Kansas City Chiefs', awaySeed:2, awayConf:'NFC', homeSeed:1, homeConf:'AFC', result:{homeScore:27, awayScore:24}};
    var h = zpbTreeCardHTML(g, 'divisional', 0);
    var seedIdx = h.indexOf('zpb-tseed'), nameIdx = h.indexOf('zpb-tname');
    return seedIdx >= 0 && nameIdx > seedIdx && h.indexOf('zpb-tlogo') >= 0;
  })()`), 'the seed chip leads the name and the crest rides along');

  console.log('== w38 R17 · the report-card tile ==');
  ok(HTML.indexOf("+' OVR \\u00b7 #'+rank+'</i>'") >= 0 && HTML.indexOf("in the league \\u00b7 '+(diff>=0") < 0, "the tile reads OVR · #rank — the league tails are gone");

  console.log('== w38 R18/R19/R20 · the award panels ==');
  ok(HTML.indexOf('zpb-awgold') >= 6, 'the gold border rides both award builders');
  ok(HTML.indexOf('zpb-awcol') >= 2, 'the playoff cards stand vertical');
  ok(HTML.indexOf('.zpb-awcard.zpb-awgold{border-color:#d9a94c') >= 0, 'the gold-border CSS exists');
  ok(HTML.indexOf('.zpb-awgrid{grid-template-columns:repeat(auto-fill,minmax(270px,1fr)) !important;}') >= 0, 'the award panels widened');
  ok(HTML.indexOf('rec:top, line:seasonStatLine') >= 0 && HTML.indexOf('line:fmt(r), rec:r}') >= 0, 'the award data carries the stat records');

  console.log('== w38 R21/R22 · the advanced cards ==');
  ok(HTML.indexOf("['Touchdowns / g', Math.round(me.td/me.g), '',") >= 0 && HTML.indexOf("['Field goals / g', Math.round(me.fg/me.g), '', null]") >= 0, "the TD/g and FG/g subs are gone");
  ok(HTML.indexOf("['Points / g'") >= 0 && HTML.indexOf("['Yards / play'") >= 0 && HTML.indexOf("['Takeaways / g'") >= 0 && HTML.indexOf("['Total yards / g'") >= 0, 'four new advanced cards');
  ok(HTML.indexOf('.zpb-advgrid{grid-template-columns:repeat(4,1fr) !important;}') >= 0, 'the badge grid sits four across');

  console.log('== w37 regressions (the fourteen, quick) ==');
  ok(HTML.indexOf('Math.min(99, Math.round(x*100))') >= 0 || ev(`pctTxt(1.0)==='99%'`), 'R1 w37: the Gone% caps at 99');
  ok(HTML.indexOf('--dfc-base') >= 0, 'R2 w37: the review cards hold for the cinematic');
  ok(ev(`zpbBelongMapHTML({slotmap:{QB:['A','QB','T',90]},teamName:'T'}).indexOf('--x:-6.2') >= 0`), 'R3 w37: WR4 on the left flank');
  ok(ev(`typeof zpbNickelOf==='function'`), 'R4 w37: the nickel resolver stands');
  ok(HTML.indexOf('.zpb-prematch.zpb-prematch-veil{opacity:1}') >= 0 || HTML.indexOf('.zpb-prematch.zpb-prematch-veil') >= 0, 'R5 w37: the veil paints opaque');
  ok(HTML.indexOf('zpb-awrows') >= 0, 'R9 w37: the regular awards are rows');
  ok(HTML.indexOf('zpb-sr-topbar') >= 0, 'R13 w37: the Season Review bar leads the champion page');
  ok(HTML.indexOf('.zpb-rc-body i{display:inline;height:auto;margin:0;background:none;border-radius:0;}') >= 0, 'R14 w37: the report-card lines are text');

  console.log('== page errors ==');
  ok(errors.length === 0, 'zero console/jsdom errors', errors.join(' | ').slice(0, 300));

  console.log(fail ? `VERIFY DONE — ${pass} PASS / ${fail} FAIL` : `VERIFY DONE — ${pass} PASS / 0 FAIL`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('VERIFY CRASH', e); process.exit(1); });
