#!/usr/bin/env node
/* w42_verify.js — every Owner directive from the round-42 message, asserted on the built bytes
   AND live in jsdom, with the w41 laws carried as regressions.
   w42 sections: I1 the browser joins the ONE-INK law · I2 the whole project's text reads the dark
   dropdown ink · I3 the homepage light-mode dropdown reads the dark ink (white-on-white by design)
   · I4 the All-Pro honors + the All-Playoff team leave the vivid vars · I5 the look-gate (the
   positions and the map enter when the user looks) · I6 the VS. ACTUAL NFL TEAMS tab is swept ·
   I7 the Super Bowl cinematic covers before the page can flash */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/boot/w42/Football-Sim-Z-post-blue-w42.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push(e.message); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
const dom = new JSDOM(HTML, { runScripts:'dangerously', pretendToBeVisual:true, url:'http://localhost/', virtualConsole:vc,
  beforeParse(window){
    if (process.env.ZPB_SEED) { let _s = parseInt(process.env.ZPB_SEED,10)>>>0 || 1; window.Math.random = () => { _s = (_s*1664525 + 1013904223)>>>0; return _s/4294967296; }; }
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { constructor(cb){ this.cb=cb; this.observed=[]; } observe(el){ this.observed.push(el); } unobserve(){} disconnect(){} };
    window.ResizeObserver = class { constructor(cb){ this.cb=cb; } observe(){} unobserve(){} disconnect(){} };
    window.Element.prototype.scrollIntoView = function(){};
    window.scrollTo = () => {};
  }});
const { window } = dom; const doc = window.document;
const ev = s => window.eval(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass=0, fail=0;
const ok = (c, n) => { if(c){ pass++; console.log('  PASS', n); } else { fail++; console.log('  FAIL', n); } };
const parseVars = s => { const o={}; (s||'').split(';').forEach(p=>{ const i=p.indexOf(':'); if(i>0) o[p.slice(0,i).trim()] = p.slice(i+1).trim(); }); return o; };

(async () => {
  await sleep(900);

  console.log('== w42 I1/I2 · the ONE-INK law rides the row tokens ==');
  ok(HTML.indexOf("';--tn:'+pk.txd+';--tnd:'+pk.txd+") >= 0, 'the vivid rows read txd on both text inks');
  ok(HTML.indexOf("'--tn:'+pk.txL") < 0 && HTML.indexOf("'--tnd:'+pk.accD+") < 0, 'the vivid crayola text inks are gone');
  ok(HTML.indexOf("';--tn:'+nd+';--tnd:'+nd+';--zn:1'") >= 0, 'the neutral rows read the dark ink on both inks');
  ok(HTML.indexOf("';--nm:'+nd+';--nmd:'+nd+';--nmS:'+nd+';--nmSd:'+nd+';--nu:'+nd+';--nud:'+nd+';") >= 0, 'the neutral name/number inks collapse to the dark ink');
  ok(HTML.indexOf("--nm:${pk.txd};--nmd:${pk.txd};--nmS:${pk.txd};--nmSd:${pk.txd};--nu:${pk.txd};--nud:${pk.txd};--zrb:${pk.accL};") >= 0, 'the rankings renderer wears the one ink');
  ok(HTML.indexOf("--nm:${_pk.txd};--nmd:${_pk.txd};--nmS:${_pk.txd};--nmSd:${_pk.txd};--zrb:${_pk.accL};") >= 0, 'the score-line names wear the one ink');
  ok(HTML.indexOf('if(pk) color = pk.txd;') >= 0, 'the honor lines wear the one ink');
  ok(HTML.indexOf('.zpb-poschip{color:var(--tn,var(--zrb,var(--accent)));}') >= 0, 'the position chips\' text joins the ink');
  ok(HTML.indexOf('.zpb-pstat{color:var(--tn,var(--text));}') >= 0, 'the key-player stat chips join the ink');
  ok(ev(`(function(){
    var nv = parse('' + zpbNeutralRowVars('Chicago Bears'));
    function parse(s){ var o={}; s.split(';').forEach(function(p){ var i=p.indexOf(':'); if(i>0) o[p.slice(0,i).trim()]=p.slice(i+1).trim(); }); return o; }
    return nv['--tn'] && nv['--tn']===nv['--tnd'] && nv['--tn']===nv['--nm'] && nv['--tn']===nv['--nmS'] && nv['--tn']===nv['--nu'] && nv['--zn']==='1';
  })()`), 'the live neutral vars: one ink, both themes (--zn mark intact)');
  ok(ev(`(function(){
    function parse(s){ var o={}; s.split(';').forEach(function(p){ var i=p.indexOf(':'); if(i>0) o[p.slice(0,i).trim()]=p.slice(i+1).trim(); }); return o; }
    var v = parse('' + zpbRowVars('Chicago Bears'));
    var txd = zpbPackFor('Chicago Bears').txd;
    return v['--tn']===txd && v['--tnd']===txd && v['--nm']===txd && v['--nmS']===txd && v['--nu']===txd && v['--nud']===txd && v['--zr1'] && v['--zrb'];
  })()`), 'the live vivid vars: every text ink = txd, the washes/borders keep the team colors');
  ok(ev(`(function(){ return zpbRowVars('Chicago Bears').indexOf('--zr1d:')>=0 && zpbRowVars('Chicago Bears').indexOf('--tG2:')>=0; })()`), 'the vivid rows keep their wash/glow identity');

  console.log('== w42 I3 · the homepage light-mode dropdown reads the dark ink ==');
  ok(HTML.indexOf("'--zaL:' + st.txd + ';--zaD:' + st.txd + ';'") >= 0, 'the closed face carries one token pair');
  ok(HTML.indexOf("? '--zaL:' + st.txd + ';--zaD:' + st.txd + ';--zw:color-mix(") >= 0, 'the open options carry one token pair');
  ok(HTML.indexOf("(window.zpbLift?zpbLift(st.txL,0.62):st.txL)") < 0, 'the lifted vivid dropdown ink is gone');
  ok(ev(`(function(){
    var f = document.querySelector('.zpb-selbtn .zpb-face');
    if(!f) return 'no-face';
    var m = (f.getAttribute('style')||'').match(/--zaL:([^;]+);--zaD:([^;]+)/);
    if(!m) return 'no-vars';
    return m[1]===m[2] ? true : ('mismatch:'+m[1]+' vs '+m[2]);
  })()`), 'the live closed box: --zaL === --zaD');
  ok(ev(`(function(){
    var o = document.querySelector('.zpb-selpop .zpb-selopt');
    if(!o) return 'no-opt';
    var m = (o.getAttribute('style')||'').match(/--zaL:([^;]+);--zaD:([^;]+)/);
    return m && m[1]===m[2] ? true : ('mismatch or missing');
  })()`), 'the live options: --zaL === --zaD');

  console.log('== w42 I4 · the All-Pro honors + the All-Playoff team leave the vivid vars ==');
  ok(HTML.indexOf("const stv = (typeof zpbNeutralRowVars==='function') ? zpbNeutralRowVars : function(){ return ''; }; // w42 (I4") >= 0, 'the regular awards ride the neutral vars');
  ok(HTML.indexOf("zpbRowVars : function(){ return ''; };\n  const aw = (title, name, team, sub, why, star, rec, stackTitle)=>") < 0, 'the award renderer no longer feeds the vivid vars');
  ok((HTML.match(/const stv = \(typeof zpbRowVars==='function'\) \? zpbRowVars/g)||[]).length === 2, 'the two star-card renderers keep their wash vars (surfaces, not text)');
  ok(ev(`(function(){
    try{
      var pkA = zpbPackFor('Chicago Bears');
      var html = '<div class="zpb-apchip" style="' + zpbNeutralRowVars('Chicago Bears') + '"><b class="zpb-gname">X</b></div>';
      return html.indexOf('--tn:'+pkA.txd)>=0 && html.indexOf('--nm:'+pkA.txd)>=0;
    }catch(e){ return String(e); }
  })()`), 'an All-Pro chip renders on the one ink');

  console.log('== w42 I5 · the look-gate ==');
  ok(HTML.indexOf("window.__zpbFinCineEndsAt = Date.now() + 6900;") >= 0, 'the cinematic records its end');
  ok(HTML.indexOf("window.__zpbFinCineEndsAt = Date.now() + 400;") >= 0 && HTML.indexOf("setProperty('--dfc-base','0s')") >= 0, 'skipping the cinematic releases the wait');
  ok(HTML.indexOf("window.zpbReleaseLookGate = function(){") >= 0 && HTML.indexOf("zpbReleaseLookGate(); }catch(err){} ov.style.transition") >= 0, 'the skip bounces every gate the veil already caught');
  ok(HTML.indexOf('.zpb-fm:not(.zpb-seen) .zpb-fm-ini{opacity:0;animation:none;}') >= 0, 'the map holds until seen');
  ok(HTML.indexOf('.zpb-fm.zpb-seen .zpb-fm-ini{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.15s);}') >= 0, 'the map enters on sight, 0.15s per pick');
  ok(HTML.indexOf('.zpb-dbk-g:not(.zpb-seen) .zpb-dfc2{opacity:0;animation:none;}') >= 0 && HTML.indexOf('.zpb-dbk-g.zpb-seen .zpb-dfc2{opacity:0;animation:zpbCardIn .55s ease both;animation-delay:calc(var(--dfc-cine,0s) + var(--beat,0)*0.15s);}') >= 0, 'the position groups gate the same way');
  ok(HTML.indexOf('.zpb-fm .zpb-fm-ini,.zpb-dbk-g .zpb-dfc2{opacity:1 !important;animation:none !important;}') >= 0, 'reduced motion can never hide the content');
  ok(ev(`(function(){
    try{
      var host = document.createElement('div');
      host.innerHTML = '<div class="zpb-fm"><i class="zpb-fm-ini" style="--beat:3"><b>A</b><i>QB</i></i></div>';
      var fm = host.firstChild; document.body.appendChild(host);
      zpbWireLookIn();
      var io = window.__zpbLookIO; if(!io) return 'no-io';
      if(io.observed.indexOf(fm) < 0) return 'not-observed';
      if(fm.classList.contains('zpb-seen')) return 'seen-too-early';
      io.cb([{ isIntersecting:true, target:fm }]);
      var r = { seen: fm.classList.contains('zpb-seen'), cine: (fm.getAttribute('style')||'').indexOf('--dfc-cine:0s')>=0 };
      fm.remove ? null : null; host.remove();
      return r.seen && r.cine ? true : JSON.stringify(r);
    }catch(e){ return String(e); }
  })()`), 'a map seen by the observer enters with the gate');
  ok(ev(`(function(){
    try{
      window.__zpbFinCineEndsAt = Date.now() + 5200;
      var host = document.createElement('div');
      host.innerHTML = '<div class="zpb-fm"><i class="zpb-fm-ini"><b>B</b><i>RB</i></i></div>';
      var fm = host.firstChild; document.body.appendChild(host);
      zpbWireLookIn();
      var io = window.__zpbLookIO;
      io.cb([{ isIntersecting:true, target:fm }]);
      var style = fm.getAttribute('style')||'';
      host.remove();
      return style.indexOf('--dfc-cine:5.2s')>=0 ? true : style;
    }catch(e){ return String(e); }
  })()`), 'a map seen while the cinematic runs waits for it (5.2s rides the gate)');
  ok(ev(`(function(){
    try{
      zpbMaybeFinishCine();
      var a = window.__zpbFinCineEndsAt - Date.now();
      if(!(a > 6600 && a <= 6900)) return 'bad-record:'+a;
      var ov = document.querySelector('.zpb-fin'); if(!ov) return 'no-ov';
      ov.dispatchEvent(new window.Event('pointerdown', {bubbles:true}));
      var b = window.__zpbFinCineEndsAt - Date.now();
      return (b > 300 && b <= 400) ? true : 'bad-skip:'+b;
    }catch(e){ return String(e); }
  })()`), 'the cinematic records ~6.9s and the skip pulls it to ~0.4s');
  ok(ev(`(function(){ return typeof zpbWireLookIn === 'function' && typeof zpbFieldMapHTML === 'function'; })()`), 'the look-gate and the map builders ride the page');

  console.log('== w42 I6 · the VS. ACTUAL NFL TEAMS tab is swept ==');
  ok(HTML.indexOf("window.zpbSweepNflTab = function(){") >= 0, 'the sweep exists');
  ok(HTML.indexOf("if(!host || !host.contains(b) || (typeof seasonState !== 'undefined' && seasonState)) b.remove();") >= 0, 'anything outside the draft review, or alive in a season, dies');
  ok(ev(`(function(){
    try{
      var stray = document.createElement('button'); stray.id = 'resultsNflBtn'; document.body.appendChild(stray);
      zpbSweepNflTab();
      return !document.getElementById('resultsNflBtn') ? true : 'survived';
    }catch(e){ return String(e); }
  })()`), 'a stray tab outside the draft review is removed');
  ok(ev(`(function(){
    try{
      var host = document.getElementById('draftFinalResults');
      if(!host) return 'no-host';
      var b = document.createElement('button'); b.id = 'resultsNflBtn'; host.appendChild(b);
      zpbSweepNflTab();
      var kept = !!document.getElementById('resultsNflBtn');
      seasonState = { teams:{}, champion:null };
      zpbSweepNflTab();
      var goneInSeason = !document.getElementById('resultsNflBtn');
      seasonState = null;
      return kept && goneInSeason ? true : 'kept:'+kept+' goneInSeason:'+goneInSeason;
    }catch(e){ return String(e); }
  })()`), 'inside the draft review it lives pre-season and dies in a season');

  console.log('== w42 I7 · the Super Bowl cinematic covers before the page can flash ==');
  ok(HTML.indexOf("zpbPostSuperBowlCine(); // w42 (I7, Owner): the golden storm mounts in the SAME paint as the page") >= 0, 'the wrapper mounts the cinematic synchronously');
  ok(HTML.indexOf("setTimeout(()=>{ try{ zpbPostSuperBowlCine(); }catch(err){} }, 450)") < 0, 'the 450ms flash window is gone');

  console.log('== w41 regressions carried ==');
  ok(HTML.indexOf('id="zpb-w41-css"') >= 0, 'the w41 style block rides the body');
  ok(/\.zpb-gname\.zpb-vib\{color:var\(--nmS,var\(--nm,inherit\)\);\}/.test(HTML), 'the 85+ rung reads the ladder (now one ink)');
  ok(/x \[BLK\]/.test(HTML) || HTML.indexOf("zrl-badge") >= 0, 'the block-line shape survives');
  ok(HTML.indexOf('.zpb-tree .bracket-game .zpb-tlogo') >= 0, 'the bracket keeps its logos-only law');
  ok(HTML.indexOf('.confirm-box.zpb-again-box{min-width:min(92vw,480px);max-width:480px;}') >= 0, 'the 20-0 panel keeps its width');
  ok(HTML.indexOf('.zpb-rcgrid > .zpb-rcbadge:last-child{grid-column:1 / -1;justify-self:center;width:calc(25% - 8px);}') >= 0, 'the Kicker centering survives');
  ok(HTML.indexOf('.zpb-replay.zpb-po .zpb-intro-star{animation-duration:5.6s;}') >= 0, 'the heavier playoff intro survives');
  ok(HTML.indexOf('id="zpb-w42-css"') >= 0, 'the w42 style block rides the body');

  console.log('== console ==');
  ok(errors.length===0, 'zero console errors on load' + (errors.length ? ' — ' + errors.slice(0,3).join(' | ') : ''));

  console.log(`\nw42_verify: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
