#!/usr/bin/env node
/* w41_verify.js — every Owner directive from the round-41 message, asserted on the built bytes
   AND live in jsdom, with the w39 guards carried as regressions.
   w41 sections: N1 the dropdown ink sweeps · N2 the draft board's light mode · N3 the browser,
   every 90+ shimmers · P1/P2 the name law + the rankings' light mode · P3 the review team names
   in Cinzel Decorative · P4 the box score wears post-blue · P5 the award winners' ink ·
   G1 x[BLK][PUNT]y · G2 the top pair steps down · W1 the playoff buttons · W2 the slower,
   heavier playoff intro · W3 no duplicate Sim Playoffs · W4 the bracket toggles · W5 logos-only
   tree · W6 the Kicker centers · W7 one line per round · W8 the tackle-only rule ·
   W9 three more leaders · W10 the 20-0 panel · E1 the P1 wait (documented) */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/w41/Football-Sim-Z-post-blue-w41.html', 'utf8');
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

  console.log('== w41 N1 · the dropdown ink sweeps ==');
  ok(HTML.indexOf('id="zpb-w41-css"') >= 0, 'the w41 style block rides the body');
  ok(HTML.indexOf('--nmS:\'+(window.zpbLift?zpbLift(pk.txL,0.42):pk.txL)+\'') >= 0, 'the strength ladder rides the vivid rows');
  ok(ev(`(function(){ var v = zpbRowVars('Chicago Bears'); return v.indexOf('--nmS:')>=0 && v.indexOf('--nmSd:')>=0; })()`), 'the live vars carry the ladder');
  ok(HTML.indexOf(':root:not([data-theme="dark"]) .zpb-scard .zpb-scard-hd b, :root[data-theme="light"] .zpb-scard .zpb-scard-hd b{color:var(--tn,var(--text));}') >= 0, 'the scard light ink reads --tn (N2)');
  ok(HTML.indexOf(':root:not([data-theme="dark"]) .zpb-dbk b, :root[data-theme="light"] .zpb-dbk b{color:var(--tn,var(--text));}') >= 0, 'the dbk light ink reads --tn (N2)');
  ok(HTML.indexOf(':root:not([data-theme="dark"]) .zpb-lu-cell, :root[data-theme="light"] .zpb-lu-cell{color:var(--tn,var(--text));}') >= 0, 'the lu-cell light ink reads --tn (N2)');
  ok(/\.zpb-pb-team\{font-family:'Cinzel'/.test(HTML), 'the browser team cell wears Cinzel (N1)');
  ok(ev(`(function(){ var v = zpbNeutralRowVars('Chicago Bears'); return v.indexOf('--nmS:')>=0 && v.indexOf('--zn:1')>=0; })()`), 'the neutral vars carry the ladder + the zn mark');
  ok(HTML.indexOf("style=\"${(typeof zpbNeutralRowVars==='function')?zpbNeutralRowVars(opp):''}\"") >= 0, 'the schedule tiles carry the neutral vars');
  ok(/\.zst-opp\{color:var\(--tn,var\(--text\)\);/.test(HTML), 'the schedule opponent ink law');
  ok(HTML.indexOf('#groupTable tr.zpb-grow td.team{font-family:\'Cinzel\'') >= 0, 'the rankings team cells wear Cinzel');
  ok(HTML.indexOf("zpbNeutralRowVars(r.team)") >= 0, 'the rankings rows carry the neutral vars');

  console.log('== w41 N3 · the browser — the cap lifts, the ink lands ==');
  ok(HTML.indexOf("if(ovr>=90){ cls = 'zpb-shm'; }") >= 0 && HTML.indexOf('ovr>=90 && ovr===topOfTeam[team]') < 0, 'every 90+ shimmers (the w26 cap retires)');
  ok(HTML.indexOf('#playerTable td.score,#playerTable td.num{color:var(--nu,var(--tA2,var(--accent)));}') >= 0, 'the browser numbers wear the team ink');

  console.log('== w41 P1/P2 · the name law + the rankings ==');
  ok(HTML.indexOf('--nm:${(window.zpbLift?zpbLift(pk.txL,0.62):pk.txL)};--nmd:${pk.txd};--nmS:') >= 0, 'the rankings renderer wears the dropdown ink per theme');
  ok(ev(`(function(){ var h = zpbGroupPlayerHTML(['Jaylon Johnson','CB','Chicago Bears',89]); return h.indexOf('zpb-vib')>=0 && h.indexOf('--nmS:')>=0; })()`), 'an 85+ name rides zpb-vib + the stronger rung');
  ok(ev(`(function(){ var h = zpbGroupPlayerHTML(['Test Player','CB','Chicago Bears',92]); return h.indexOf('zpb-shm')>=0; })()`), 'a 90+ name shimmers');
  ok(ev(`(function(){ var h = zpbGroupPlayerHTML(['Test Player','CB','Chicago Bears',78]); return h.indexOf('zpb-shm')<0 && h.indexOf('zpb-vib')<0 && h.indexOf('--nm:')>=0; })()`), 'a 78 name stays neutral but in his team\'s colors');
  ok(/\.zpb-gname\.zpb-vib\{color:var\(--nmS,var\(--nm,inherit\)\);\}/.test(HTML), 'the 85+ ink rides the stronger rung');
  ok(HTML.indexOf('.zpb-replay.zpb-po .zpb-intro-star{animation-duration:5.6s;}') >= 0, 'the playoff stars fade slower (W2)');

  console.log('== w41 P3/P4 · the box score ==');
  ok(HTML.indexOf('zpb-sl2name${game.away===focusTeam?') >= 0, 'the review team names ride zpb-sl2name');
  ok(HTML.indexOf("zpbNeutralRowVars(game.away)") >= 0, 'the review names wear the dropdown tint');
  ok(HTML.indexOf('zpb-ls-team">${name}</td>') >= 0, 'the linescore labels carry the class');
  ok(HTML.indexOf('zpbNeutralRowVars(name)') >= 0, 'the linescore rows carry the neutral vars');
  ok(/\.linescore th\{font-family:'Cinzel'/.test(HTML), 'the linescore headers wear Cinzel');
  ok(HTML.indexOf("table.linescore{border:1px solid var(--rosehair,var(--border));") >= 0, 'the linescore wears the post-blue frame');

  console.log('== w41 P5 · the award winners ==');
  ok(HTML.indexOf('if(pk) color = dark ? pk.txd : (window.zpbLift?zpbLift(pk.txL,0.62):pk.txL);') >= 0, 'honorLineHTML wears the dropdown pair');
  ok(HTML.indexOf("const stv = (typeof zpbNeutralRowVars==='function') ? zpbNeutralRowVars : function(){ return ''; };") >= 0, 'the award cards wear the neutral vars');
  ok(HTML.indexOf("(star?';--zrb:var(--accent)':'')") >= 0, 'the user\'s shimmer keeps the accent law');
  ok(HTML.indexOf('.zpb-awcard .zpb-awname{color:var(--nm,var(--text));}') >= 0, 'the award name ink law');
  ok(ev(`(function(){ var pk = zpbPackFor('Chicago Bears'); var c = {name:'X', team:'Chicago Bears'}; var h = honorLineHTML(c, 'Green Bay Packers'); return h.indexOf('#')>=0 || h.indexOf('style=')>=0; })()`), 'honorLineHTML renders');

  console.log('== w41 G1 · x[BLK][PUNT]y ==');
  ok(HTML.indexOf("window.zpbLawNameHTML = function(name, team, ovr, det)") >= 0, 'the law-name helper exists');
  ok((HTML.match(/chip2\('BLK'\) \+ chip2\(lab2\)/g)||[]).length === 2, 'both block sites read x [BLK] [KIND] y');
  ok(HTML.indexOf('const wantSlot = b.kind===\'punt\' ? \'P\' : \'K\';') >= 0, 'the punter/kicker comes from the detail');
  ok(HTML.indexOf("'<span class=\"zrl-t\">BLK</span>'") < 0, 'the doubled BLK chip is gone');
  ok(ev(`(function(){ var h = zpbLawNameHTML('Test Guy','Chicago Bears',92,[]); return h.indexOf('zpb-shm')>=0 && h.indexOf('--zrb:')>=0; })()`), 'a 90+ blocker shimmers in his color');
  ok(ev(`(function(){ var h = zpbLawNameHTML('Test Guy','Chicago Bears',null,[{name:'Test Guy',ovr:86}]); return h.indexOf('zpb-vib')>=0; })()`), 'an 85+ punter reads bold via the detail lookup');

  console.log('== w41 G2/W2 · the intro ==');
  ok(HTML.indexOf('[[0,50],[1,27],[2,78]]') >= 0, 'the top pair stands at 27%');
  ok(HTML.indexOf('roundLabel ? 36000 : 5000') >= 0, 'the playoff envelope runs 36s');
  ok(HTML.indexOf('roundLabel ? 5600 : 4400') >= 0, 'the playoff flash lands later');
  ok(HTML.indexOf("const _dec = roundLabel ? 1500 : 700;") >= 0, 'the playoff flash decays slower');
  ok(HTML.indexOf('@keyframes zpbPoBreath') >= 0, 'the stage breathes under pressure');

  console.log('== w41 W1/W3 · the playoff buttons ==');
  ok(HTML.indexOf('justify-content:center;"><button class="resetbtn zpb-ctabig" id="simRoundBtn"') >= 0, 'the hub buttons center, the primary glows');
  ok(HTML.indexOf("rk!=='superbowl' && !myLost?'<button class=\"tabbtn\" id=\"simRestBtn\">Sim Playoffs</button>':''") >= 0, 'on a loss the secondary retires');

  console.log('== w41 W4/W5 · the bracket ==');
  ok(HTML.indexOf("if(host.dataset.pogOpen === key)") >= 0, 'the bracket review toggles');
  ok(HTML.indexOf("tag(t,k) + lg2(t); // w41 (W5") >= 0, 'the tree cards carry logos only');
  ok(HTML.indexOf('.zpb-tree .bracket-game{padding:12px 14px;gap:6px;min-height:74px;') >= 0, 'the tree panels breathe');

  console.log('== w41 W6/W7/W9/W10 · the panels ==');
  ok(HTML.indexOf('@media (min-width:1060px){\n  .zpb-rcgrid > .zpb-rcbadge:last-child{grid-column:1 / -1;justify-self:center;width:calc(25% - 8px);}\n}') >= 0, 'the Kicker centers when alone');
  ok(HTML.indexOf("const rl = t=> /Conference/.test(t)") >= 0, 'the round lines carry his words as labels');
  ok(HTML.indexOf("'<div class=\"zpb-awline zpb-awline-mvp\">'+aw('Super Bowl MVP'") >= 0, 'the Super Bowl MVP sits on his own centered line');
  ok(HTML.indexOf("lines.join('')") >= 0, 'the awards render as lines');
  ok(HTML.indexOf("'Postseason Forced Fumbles'") >= 0 && HTML.indexOf("'Postseason Tackles For Loss'") >= 0 && HTML.indexOf("'Postseason TDs · non-QB'") >= 0, 'three more postseason leaders');
  ok(HTML.indexOf('p class="zpb-again-q"') >= 0, 'the 20-0 question centers');
  ok(HTML.indexOf('.confirm-box.zpb-again-box{min-width:min(92vw,480px);max-width:480px;}') >= 0, 'the 20-0 panel widens');

  console.log('== w41 W8 · the tackle-only rule ==');
  ok(HTML.indexOf('const zpbDefOnly = p =>') >= 0, 'the rule rides the game-ball pick');
  ok(HTML.indexOf("(p.st.tkl||0) >= 15 && (p.st.tfl||0) >= 2") >= 0, '15+ tackles AND a couple of TFLs');

  console.log('== standing regressions (w38/w39) ==');
  ok(HTML.indexOf("';--nm:'+pk.txL+';--nmd:'+pk.txd+';--nmS:'") >= 0, 'the vivid rows keep the rankings name ink (w38 R1)');
  ok(HTML.indexOf('Should I take this player now?') >= 0 && HTML.indexOf('Will this player be available next round?') >= 0, 'the Guide\'s w39 B6/B7 wording');
  ok(HTML.indexOf("'PC'") >= 0 || HTML.indexOf(':\'PC\'') >= 0, 'pancake reads PC (w38 R23)');
  ok(ev(`(function(){ var v = zpbRowVars('Chicago Bears'); return v.indexOf('--tn:')>=0 && v.indexOf('--tnd:')>=0; })()`), 'the per-theme ink pair rides every row');
  ok(HTML.indexOf("INTRO_MS = isSB ? 60000") >= 0, 'the Super Bowl keeps its 60s standing law');

  console.log('== console ==');
  ok(errors.length === 0, 'zero console errors' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));

  console.log(`\nRESULT: ${pass} pass, ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('FATAL', e); process.exit(1); });
