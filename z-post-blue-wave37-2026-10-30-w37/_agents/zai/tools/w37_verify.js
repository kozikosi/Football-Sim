#!/usr/bin/env node
/* w37_verify.js — every Owner directive from the round-37 message, asserted on the built bytes,
   with the round-34/36 assertions carried as regression guards.
   w37 sections: R1 the Gone% caps at 99 · R2 the review's players wait for the cinematic's fade ·
   R3 WR4 to the other side of WR1 · R4 the map ink reads on the real bubble paint ·
   R5 the cinematic covers instantly · R6 the intro stars spread around the middle panel ·
   R7 the center panel wider, no […] · R8 the YES door leads · R9 the regular awards are rows again ·
   R10 the honors lead the rail and the celebration waits · R11 rewards queue behind cinematics ·
   R12 Skip shows the whole game report with the true final · R13 the Season Review button top right ·
   R14 the report-card lines are text again. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/w37/Football-Sim-Z-post-blue-w37.html', 'utf8');
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

  console.log('== w36 R1 · the footer theme button (regression guard) ==');
  const tb = doc.getElementById('themeToggleBtn');
  ok(!!tb, 'the theme button exists');
  if (tb) {
    const cs = window.getComputedStyle(tb);
    ok(cs.position === 'static', 'the button rides the footer in flow');
    const th = tb.closest('.zpb-foottheme');
    ok(!!th, 'the button lives inside the footer theme block');
  }
  ok(!/#themeToggleBtn\{position:fixed/.test(HTML), 'the fixed-center law is gone from the bytes');

  console.log('== w37 R1 · the Gone% never reads 100 ==');
  ok(/function pctTxt\(x\)\{ return x==null \? '\u2014' : Math\.min\(99, Math\.round\(x\*100\)\)\+'%'; \}/.test(HTML), 'the cap is in the bytes (display-only, one choke point)');
  ok(ev("pctTxt(1)") === '99%', 'pctTxt(1) reads 99% — a computed certainty still lists 99');
  ok(ev("pctTxt(0.999)") === '99%', 'pctTxt(0.999) reads 99%');
  ok(ev("pctTxt(0.5)") === '50%', 'pctTxt(0.5) still reads 50%');
  ok(ev("pctTxt(null)") === '\u2014', 'pctTxt(null) still reads the dash');
  ok((HTML.match(/pctTxt\(/g)||[]).length === 4, 'pctTxt keeps its three gone-only call sites (1 def + 3 uses)');

  console.log('== w36 R2/R3/R4 sections (regression guards, trimmed to the byte laws) ==');
  ok(/schip\('158\.3', 'PRTG'/.test(HTML), 'the Guide PRTG chip still reads 158.3');
  ok(/<details class="zpb-wdrop" id="weightsDrop"><summary>ADJUST THE WEIGHTS<\/summary><div>/.test(HTML), 'the weights dropdown law stands');
  ok(/function zpbNeutralRowVars/.test(HTML), 'the neutral ink builder stands');
  ok(/zpbNeutralUserRowVars\(\)/.test(HTML), 'your-roster depth rows still wear the neutrals');

  console.log('== w37 R2 · the review players wait for the cinematic fade ==');
  ok(/if\(window\._zpbFinDone\) return false;/.test(HTML), 'zpbMaybeFinishCine reports "no fresh cinematic" (bytes)');
  ok(/ return true; \/\/ w37 \(R2, Owner\): a fresh cinematic is running/.test(HTML), 'zpbMaybeFinishCine reports a fresh start (bytes)');
  ok(/--dfc-base', _cine \? '6\.9s' : '0s'/.test(HTML), 'renderDraftResults sets the 6.9s base on a fresh cinematic, 0s after (bytes)');
  ok(/\.zpb-dfc2\{opacity:0;animation:zpbCardIn \.55s ease both;animation-delay:calc\(var\(--dfc-base,0s\) \+ var\(--beat,0\)\*1s\);\}/.test(HTML), 'the cards delay = base + beat (bytes)');
  ok(/\.zpb-fm \.zpb-fm-ini\{opacity:0;animation:zpbCardIn \.55s ease both;animation-delay:calc\(var\(--dfc-base,0s\) \+ var\(--beat,0\)\*1s\);\}/.test(HTML), 'the map bubbles share the base (bytes)');

  console.log('== w37 R5 · the cinematic covers instantly ==');
  ok(/\.zpb-prematch\.zpb-prematch-veil\{background:radial-gradient\(ellipse at 50% 46%,color-mix\(in srgb,var\(--bg\) 88%,transparent\) 0%,color-mix\(in srgb,var\(--bg\) 97%,transparent\) 62%,var\(--bg\) 100%\);backdrop-filter:blur\(5px\);opacity:1;\}/.test(HTML), 'the veil starts opaque — opacity:1 in the veil rule (bytes)');
  ok(/w37 \(R5, Owner\): the cinematic covers the page on its first paint/.test(HTML), 'the law is signed in the bytes');

  console.log('== a real draft, 31 rounds ==');
  ev('try{ startDraft2(); }catch(e){}');
  await sleep(500);
  ev('try{ simToEnd(); }catch(e){ window.__dErr=String(e); }');
  await sleep(600);
  ok(ev('draftSim && draftSim.pos >= 32*31'), 'the draft runs all 31 rounds (' + ev('draftSim ? draftSim.pos : -1') + ' picks)');
  ok(ev('(function(){ const r = draftSim.rosters.find(x=>x.isUser); return Object.keys(r.slots).length; })()') === 31, 'your roster holds 31 players');
  ok(errors.length===0, 'zero console errors after the draft' + (errors.length?' — '+errors.slice(0,2).join(' | '):''));

  console.log('== w37 R1 live · the board never lists 100% ==');
  { // the review landed with the draft: scan every Gone cell the board and the previews render
    ev('try{ renderDraftResults(); }catch(e){ window.__bdErr=String(e); }');
    await sleep(500);
    const gone = [...doc.querySelectorAll('.dc-gone')].map(x=>x.textContent.trim());
    ok(gone.length > 0, 'the GONE column renders (' + gone.length + ' rows)');
    ok(gone.every(g=>!/^100%$/.test(g)), 'no GONE cell reads 100% (found: ' + [...new Set(gone)].slice(0,6).join(', ') + '...)');
    ok(!ev('window.__bdErr||""'), 'the board re-render runs clean' + (ev('window.__bdErr||""') ? ' — '+ev('window.__bdErr') : ''));
  }

  console.log('== w36 R2 + w37 R2 live · the field leads, the cards float under it, on the cinematic clock ==');
  {
    const wrapEl = [...doc.querySelectorAll('[id^="detailwrap-"]')].find(w=>w.innerHTML.length > 0);
    ok(!!wrapEl, 'the user detail is open on the landing');
    const map = wrapEl && wrapEl.querySelector('.zpb-fm');
    ok(!!map && map.classList.contains('zpb-fm-wide'), 'the map wears zpb-fm-wide (w36 R1 guard)');
    ok(!wrapEl || !wrapEl.textContent.includes('IN THE ORDER YOU DRAFTED THEM'), 'the top card set is GONE (w36 R2 guard)');
    const cards = [...(wrapEl||doc).querySelectorAll('.zpb-dbk.zpb-dfc2[data-slot]')];
    ok(cards.length >= 20, 'the cards under the map carry the float-in class (' + cards.length + ' cards)');
    // the fresh-cinematic base: force a fresh one-shot and read the root var
    ev('window._zpbFinDone = false;');
    ev('try{ renderDraftResults(); }catch(e){ window.__r2err=String(e); }');
    ok(!ev('window.__r2err||""'), 'a fresh render runs clean');
    ok(ev('document.documentElement.style.getPropertyValue("--dfc-base")') === '6.9s', 'a fresh cinematic sets --dfc-base: 6.9s — the fade-out moment');
    ev('try{ renderDraftResults(); }catch(e){}');
    ok(ev('document.documentElement.style.getPropertyValue("--dfc-base")') === '0s', 'the next render releases the players at once (the one-shot is spent)');
    ok(errors.length===0, 'zero console errors through the review');
  }

  console.log('== w37 R3+R4 live · WR4 on the other side of WR1; the ink reads on the bubble ==');
  {
    const mine = doc.getElementById('resultsMineBtn');
    ok(!!mine, 'the YOUR ROSTER tab exists');
    if (mine) { mine.click(); await sleep(450); }
    const body = doc.getElementById('draftResultsBody');
    const map = body && body.querySelector('.zpb-fm');
    ok(!!map, 'the map renders');
    const wr4 = map && map.querySelector('.zpb-fm-ini[data-slot="WR4"]');
    const wr1 = map && map.querySelector('.zpb-fm-ini[data-slot="WR1"]');
    ok(!!wr4 && !!wr1, 'the WR4 and WR1 stations render');
    ok(!!wr4 && /--x:-6\.2/.test(wr4.getAttribute('style')||''), 'WR4 sits at --x:-6.2 — the other side of WR1 (the left flank, WR2 mirrored)');
    ok(!!wr1 && /--x:-5/.test(wr1.getAttribute('style')||''), 'WR1 holds his -5 station');
    ok(!!wr4 && !!wr1 && !!(wr4.compareDocumentPosition(wr1) & window.Node.DOCUMENT_POSITION_FOLLOWING), 'WR4 renders BEFORE WR1 — the formation reads WR4, WR1, ... from the left');
    ok(!/WR4',6\.2/.test(HTML), 'the old off-screen 6.2 station is gone from the bytes');
    ok(/left:clamp\(12px, calc\(50% \+ var\(--x,0\)\*7\.7%\), calc\(100% - 12px\)\)/.test(HTML), 'the station rule clamps to the row — the clamp only rescues a catastrophic hang-off (bytes)');
    ok(/@media \(max-width:740px\)\{\n \.zpb-fm-row\{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;height:auto;\}/.test(HTML), 'the phone fallback wraps the named rows (bytes)');
    { // R4: every non-empty bubble carries the pair, and the ink really contrasts with the paint
      const bubbles = [...map.querySelectorAll('.zpb-fm-ini:not(.zpb-empty)')];
      ok(bubbles.length >= 20, 'the named bubbles render (' + bubbles.length + ')');
      const withInk = bubbles.filter(b=>/--fmink:#(3a2a14|fff7ea)/.test(b.getAttribute('style')||'') && /--fmsub:#(3a2a14|fff7ea)/.test(b.getAttribute('style')||''));
      ok(withInk.length === bubbles.length, 'every bubble carries --fmink + --fmsub against the real bubble paint (' + withInk.length + '/' + bubbles.length + ')');
      const nickel = map.querySelector('.zpb-fm-ini[data-slot="NICKEL"]');
      const nickelInk = nickel && (nickel.getAttribute('style').match(/--fmink:(#[0-9a-f]+)/)||[])[1];
      ok(!!nickel && !nickel.classList.contains('zpb-empty'), 'the nickel carries a PLAYER — ' + (nickel ? (nickel.querySelector('b')||{}).textContent : 'none') + ' (the CB3 resolver fills the station)');
      ok(!!nickelInk, 'the nickel carries an ink: ' + nickelInk);
      ok(!!window.zpbNickelOf, 'zpbNickelOf exists — the nickel resolves like the dime (bytes)');
      if (nickelInk) {
        // the ink is the BEST of the three house candidates against the takeover-aware bubble paint —
        // the same pickInk law the builder runs, asserted independently here
        const judge = ev('(function(){ const pk = zpbPackFor(draftSim.rosters.find(x=>x.isUser).teamName); const tk = !!document.documentElement.getAttribute("data-zpbteam") && pk; const bgL = tk ? pk.acc3L : "#c97a8e", bgD = tk ? pk.acc3D : "#dfa6b4"; const best = bg => { const c1 = zpbContrast("#3a2a14",bg); if(c1 >= 4.5) return ["#3a2a14",c1]; const c2 = zpbContrast("#241407",bg); if(c2 >= 4.5) return ["#241407",c2]; const c3 = zpbContrast("#fff7ea",bg); return c1 >= c3 ? ["#3a2a14",c1] : ["#fff7ea",c3]; }; return { bgL, bgD, L: best(bgL), D: best(bgD) }; })()');
        // each ink is judged against ITS OWN theme's paint: --fmink vs the light bubble, --fminkd vs the dark one
        const cLight = ev(`zpbContrast("${nickelInk}", "${judge.bgL}")`);
        ok(nickelInk === judge.L[0] && cLight >= 4.2, `the light ink is the best candidate against the light paint (${nickelInk} on ${judge.bgL} = ${cLight.toFixed(2)}:1) — Gorden reads`);
        const inkD = nickel.getAttribute('style').match(/--fminkd:(#[0-9a-f]+)/);
        ok(!!inkD, 'the bubble carries its dark ink too (--fminkd)');
        if (inkD) {
          const cD = ev(`zpbContrast("${inkD[1]}", "${judge.bgD}")`);
          ok(inkD[1] === judge.D[0] && cD >= 4.2, `the dark ink is the best candidate against the dark paint (${inkD[1]} on ${judge.bgD} = ${cD.toFixed(2)}:1)`);
        }
        doc.documentElement.setAttribute('data-theme','light');
        ev('try{ renderDraftResults(); }catch(e){}');
        await sleep(350);
        const mapL = doc.getElementById('draftResultsBody').querySelector('.zpb-fm');
        const nickelL = mapL && mapL.querySelector('.zpb-fm-ini[data-slot="NICKEL"]');
        const inkL = nickelL && (nickelL.getAttribute('style').match(/--fmink:(#[0-9a-f]+)/)||[])[1];
        ok(!!inkL, 'the light theme rebuilds the ink: ' + inkL);
        if (inkL) {
          const cL2 = ev(`zpbContrast("${inkL}", "${judge.bgL}")`);
          ok(inkL === judge.L[0] && cL2 >= 4.2, `the rebuilt light ink is still the best candidate (${inkL} on ${judge.bgL} = ${cL2.toFixed(2)}:1)`);
        }
        doc.documentElement.setAttribute('data-theme','');
        ev('try{ renderDraftResults(); }catch(e){}');
        await sleep(300);
      }
    }
    ok(/\.zpb-fm-ini b\{font-size:0\.72rem;font-weight:600;color:var\(--fmink,var\(--tn,var\(--text\)\)\);/.test(HTML), 'the name reads the bubble ink first (bytes)');
    ok(/\.zpb-fm-ini i\{font-style:normal;font-size:0\.52rem;letter-spacing:\.06em;color:var\(--fmsub,var\(--sub\)\);\}/.test(HTML), 'the position label reads the bubble ink first (bytes)');
    ok(/:root\[data-theme="dark"\] \.zpb-fm-legend b,:root:not\(\[data-theme="light"\]\) \.zpb-fm-legend b\{color:var\(--tA2,#d9b36a\);\}/.test(HTML), 'the legend positions lift to the bright gold in dark mode (bytes)');
    ok(errors.length===0, 'zero console errors through the map drills');
  }

  console.log('== w36 R3 · the SEASON tab goes to the preseason page (guard) ==');
  {
    const tab = doc.getElementById('resultsSeasonBtn');
    ok(!!tab, 'the SEASON tab exists on the review');
    if (tab) { tab.click(); await sleep(400); }
    ok(!!ev('seasonState'), 'the season is scaffolded by the click');
    const body = doc.getElementById('draftResultsBody');
    ok(!!body && !body.textContent.includes('How your draft ranks'), 'the draft review does NOT repeat');
    ok(!!doc.getElementById('beginSeasonBtn'), 'the preseason page is live');
  }

  console.log('== w36 R5 · BEGIN THE SEASON: the cinematic, then week 1 (guard) ==');
  {
    const beg = doc.getElementById('beginSeasonBtn');
    ok(!!beg, 'Begin the season is on the live page');
    if (beg) { beg.click(); await sleep(300); }
    ok(ev('seasonState && seasonState.preseason === false'), 'the preseason flag falls');
    const body = doc.getElementById('draftResultsBody');
    ok(/Week 1 of 17/.test((body||{}).textContent||''), 'WEEK 1 IS ON THE PAGE');
    // w37 R5 live: the veil is up IMMEDIATELY — and its inline opacity is untouched (it never fades IN)
    const veil = doc.querySelector('.zpb-prematch.zpb-prematch-veil');
    ok(!!veil, 'the SEASON OPENER veil is up');
    ok(!!veil && veil.style.opacity === '', 'the veil carries NO inline fade-in state — it covered on its first paint');
    await sleep(5200);
    ok(doc.querySelectorAll('.zpb-prematch').length === 0, 'the veil clears');
    ok(/Week 1 of 17/.test((doc.getElementById('draftResultsBody')||{textContent:''}).textContent||''), 'week 1 still stands after the veil');
    ok(errors.length===0, 'zero console errors through BEGIN');
  }

  console.log('== w37 R8 · the YES door leads ==');
  {
    ok(/data-ss="yes" style="width:auto;margin:0;padding:8px 18px;order:1;"/.test(HTML), 'the SIM SEASON YES carries order:1 (bytes)');
    ok(/data-ss="no" style="order:2;"/.test(HTML), 'the Cancel carries order:2 (bytes)');
    const ss = doc.getElementById('simSeasonBtn');
    ok(!!ss, 'SIM SEASON is on the week-1 view');
    if (ss) { ss.click(); await sleep(150); }
    const box = doc.querySelector('.confirm-ov .confirm-box');
    ok(!!box, 'the confirm opens');
    const btns = box ? [...box.querySelectorAll('button')] : [];
    ok(btns.length === 2 && /YES/.test(btns[0].textContent) && /^Cancel$/i.test(btns[1].textContent), 'in the DOM the YES button comes FIRST — above Cancel');
    const noBtn = box && [...box.querySelectorAll('button')].find(b=>/Cancel/i.test(b.textContent));
    if (noBtn) { noBtn.click(); await sleep(120); }
    ok(!doc.querySelector('.confirm-ov'), 'Cancel closes without simming');
  }

  console.log('== w37 R6+R7+R12 · the during-game screen: constellation, wider panel, Skip shows it all ==');
  {
    ev('try{ simulateCurrentWeek(); }catch(e){ window.__w1err=String(e); }');
    ok(!ev('window.__w1err||""'), 'week 1 simulates' + (ev('window.__w1err||""') ? ' — '+ev('window.__w1err') : ''));
    const g = ev('(function(){ const u = seasonUserTeam(); return seasonState.schedule.find(x=>x.week===1 && x.result && (x.home===u||x.away===u)); })()');
    ok(!!g, 'the user week-1 game has a result');
    if (g) {
      const finH = ev('(function(){ const u=seasonUserTeam(); const g=seasonState.schedule.find(x=>x.week===1 && x.result && (x.home===u||x.away===u)); return g.result.homeScore + "-" + g.result.awayScore; })()');
      ok(!/^-0$|^0-$/.test(finH) && finH !== '0-0', 'the real final is ' + finH + ' (a 0-0 fixture would prove nothing — the drill still runs)');
      ev('(function(){ const u=seasonUserTeam(); const g=seasonState.schedule.find(x=>x.week===1 && x.result && (x.home===u||x.away===u)); window.__replayGame=g; zpbGameReplay(g, u); })()');
      await sleep(300);
      const ov = doc.querySelector('.zpb-replay-ov');
      ok(!!ov, 'the during-game screen opens');
      ok(!!ov && !!ov.querySelector('.zpb-rep-intro'), 'the pre-game intro plays');
      // R6: the stars own stations around the middle panel
      const stars = [...(ov.querySelectorAll('.zpb-intro-star')||[])];
      ok(stars.length >= 6, 'the intro names render (' + stars.length + ')');
      const tops = stars.filter(s=>/--sx:50%/.test(s.getAttribute('style')||''));
      ok(tops.length === 2 && /--sy:9%/.test(tops[0].getAttribute('style')) && /--sy:91%/.test(tops[1].getAttribute('style')), "the two best players hold the top and the bottom");
      const sides = stars.filter(s=>/--sx:26%/.test(s.getAttribute('style')||'') || /--sx:74%/.test(s.getAttribute('style')||''));
      ok(sides.length >= Math.max(0, stars.length-2), 'the other names sit on opposite sides of the middle panel (' + sides.length + ' of ' + (stars.length-2) + ')');
      const stacked = stars.filter(s=>{ const st = s.getAttribute('style')||''; return /--sx:50%/.test(st) && !/--sy:(9|91)%/.test(st); });
      ok(stacked.length === 0, 'no name shares the old single center spot');
      // R7: the wider panel, no ellipsis law
      ok(/\.zpb-replay\{position:relative;width:min\(640px,96vw\);/.test(HTML), 'the center panel runs 640px by default, and the intro stage anchors to it (bytes)');
      ok(/\.zrl-play\{flex:1;min-width:0;white-space:normal;overflow-wrap:anywhere;\}/.test(HTML), 'the play text wraps — the [xY] badge can never become [\u2026] (bytes)');
      // R12: skip shows the WHOLE report with the TRUE final
      const skip = ov.querySelector('#zrepIntroSkip');
      if (skip) { skip.click(); await sleep(120); } // ends the intro (the w33 law)
      const skip2 = ov.querySelector('#zrepSkip');
      ok(!!skip2, 'the Skip button is live during the game');
      if (skip2) { skip2.click(); await sleep(250); }
      const lines = ov.querySelectorAll('.zpb-rep-line').length;
      const evCount = ev('(function(){ const g=window.__replayGame; return (g.result.homeEvents||[]).length + (g.result.awayEvents||[]).length; })()');
      ok(lines >= evCount, 'the report shows EVERY play (' + lines + ' lines for ' + evCount + ' events — quarter cards included)');
      const fin = ov.querySelector('.zpb-rep-fscore');
      ok(!!fin, 'the final renders');
      { // the final shows the true numbers in DISPLAY order — away first, then home
        const want = finH.split('-').reverse().join('-');
        const got = fin ? (fin.textContent.match(/\d+/g)||[]).join('-') : '';
        ok(!!fin && got === want, 'the final reads the TRUE score (' + finH + ' home-away, shown ' + want + ' away-home) — never a 0-0 partial');
      }
      ok(!!ov.querySelector('.zpb-rep-fres'), 'the YOU WON / YOU LOST verdict lands with it');
      const qcards = ov.querySelectorAll('.zpb-rep-q').length;
      ok(qcards >= 4, 'every quarter card landed too (' + qcards + ')');
      const go = ov.querySelector('#zrepGo');
      if (go) { go.click(); await sleep(150); }
      ok(!doc.querySelector('.zpb-replay-ov'), 'Continue closes the screen');
    }
    ok(errors.length===0, 'zero console errors through the during-game drills');
  }

  console.log('== w37 R11 · a reward queues behind the cinematic, drains after ==');
  {
    ev('(function(){ const u=seasonUserTeam(); const g=window.__replayGame || seasonState.schedule.find(x=>x.result && (x.home===u||x.away===u)); zpbGameReplay(g, u); })()');
    await sleep(250);
    ok(!!doc.querySelector('.zpb-replay-ov'), 'a replay is on screen');
    ev("zpbFxGate('small', 'gate drill')");
    ok(ev('(window.__zpbFxPending||[]).length') === 1, 'the reward QUEUED while the cinematic is up');
    ok(!doc.querySelector('.fxtoast'), 'nothing fired over the game');
    ev('zpbFxDrain()');
    await sleep(1400);
    ok(!!doc.querySelector('.fxtoast'), 'the drain lands the reward after the game leaves');
    const x = doc.querySelector('.fxtoast'); if (x) x.remove();
    ev("(function(){ const o=document.querySelector('.zpb-replay-ov'); if(o) o.remove(); })()");
    ok(errors.length===0, 'zero console errors through the gate drill');
  }

  console.log('== the season, 17 weeks ==');
  for(let w=1; w<=17 && ev('seasonState && seasonState.phase==="regular"'); w++){
    ev('try{ if(!seasonState.weekSimulated) simulateCurrentWeek(); }catch(e){} try{ advanceWeek(); }catch(e){}');
    // the week sim auto-opens the user's replay (the w30 law) — the suite is not watching it;
    // close the orphaned overlay and drop its queued rewards so the review drill starts clean
    ev('try{ const o=document.querySelector(".zpb-replay-ov"); if(o) o.remove(); window.__zpbFxPending = []; }catch(e){}');
  }
  ok(ev('seasonState.phase')==='regularReview', 'the regular season completes into the review');
  ok(errors.length===0, 'zero console errors through the season');

  console.log('== w37 R10 + R9 · the review: the honors lead, the celebration waits; the awards are rows ==');
  {
    ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__rrErr=String(e); }');
    await sleep(500);
    ok(!ev('window.__rrErr||""'), 'the regular season review renders' + (ev('window.__rrErr||""') ? ' — '+ev('window.__rrErr').slice(0,100) : ''));
    const panel = doc.getElementById('zpbStoryPanel');
    ok(!!panel, 'THE SEASON IN BADGES renders');
    const zones = panel ? [...panel.querySelectorAll('.zpb-story-zone')] : [];
    const firstHonor = zones.length && zones[0].classList.contains('zpb-story-honors');
    const hasHonors = panel ? !!panel.querySelector('.zpb-story-honors') : false;
    if (hasHonors) {
      ok(firstHonor, 'the HONORS EARNED zone is the FIRST zone of the rail — the honors appear before anything else');
      ok(!!panel.querySelector('.zpb-story-honors .zpb-shonor'), 'honor cards render inside it');
    } else {
      ok(zones.length >= 3, 'no honors this season — the rail still runs offense, defense, key factors (' + zones.length + ' zones)');
      console.log('   (no user honors on this seeded board — the order assert applies whenever honors exist)');
    }
    ok(/\$\{honorCards\.length\?`<div class="zpb-story-zone zpb-story-honors">\$\{hHTML\}<\/div>`:''\} \/\/ w37 \(R10, Owner\): HONORS EARNED leads the rail/.test(HTML), 'the honors-first law is in the bytes');
    // the celebration waits: no toast in the first beats
    ok(!doc.querySelector('.fxtoast') && !doc.querySelector('.fxbanner'), 'no celebration fires while the honors land');
    const hz = panel ? panel.querySelectorAll('.zpb-story-honors .zpb-shonor').length : 0;
    ev('window.__fxLog=[]; const _op=FX.play.bind(FX); FX.play=(k,m)=>{ try{ window.__fxLog.push(String(k)+"|"+(m||"")); }catch(e){} return _op(k,m); }');
    if (hz) { await sleep(hz*900 + 1900); } else { await sleep(1800); }
    let firedLate = (ev('window.__fxLog.length') > 0) || !!doc.querySelector('.fxtoast') || !!doc.querySelector('.fxbanner');
    for(let i=0;i<10 && !firedLate;i++){ await sleep(300); firedLate = (ev('window.__fxLog.length') > 0) || !!doc.querySelector('.fxtoast') || !!doc.querySelector('.fxbanner'); }
    const rewardDue = ev('(function(){ const u=seasonUserTeam(); const all=seasonState.seeds.AFC.concat(seasonState.seeds.NFC); return !!all.find(x=>x.team===u) || seasonState.rewards && Object.keys(seasonState.rewards).length>0; })()');
    if (rewardDue) {
      if (!firedLate) {
        const diag = ev('(function(){ const els=[...document.querySelectorAll(".zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-restov")].map(x=>x.className); return { ov: els.length, which: els, pend: (window.__zpbFxPending||[]).map(x=>x.kind+"|"+x.msg), log: (window.__fxLog||[]).length }; })()');
        console.log('   DIAG', JSON.stringify(diag), 'fxLog:', ev('JSON.stringify(window.__fxLog||[])'));
      }
      ok(firedLate, 'after the honors finish, the made-the-playoffs word fires (' + hz + ' honors \u00d7 0.9s + 1.5s)');
    }
    else ok(true, 'no playoff reward was due on this board');
    ok(/_wait = _hz \? _hz\*900 \+ 1500 : 0;/.test(HTML), 'the celebration delay is the honors landing time (bytes)');
    // R9: the regular awards render as rows
    ok(/class="zpb-awrows"/.test(HTML) && /<div class="zpb-awrows">\'\+ind+/.test(HTML.replace(/\n/g,'')) || /\.zpb-awrows/.test(HTML), 'the awards row format is in the bytes');
    const det = [...doc.querySelectorAll('details.panel')].find(d=>/REGULAR-SEASON AWARDS/.test(d.textContent));
    ok(!!det, 'the regular-season awards panel renders');
    const rows = det ? det.querySelectorAll('.zpb-awrows') : [];
    ok(rows.length === 2, 'both award groups (individual + statistical champions) render as rows (' + rows.length + ')');
    ok(rows.length === 2 && rows[0].querySelectorAll('.zpb-awcard').length >= 4, 'the individual awards sit in the row list (' + (rows.length ? rows[0].querySelectorAll('.zpb-awcard').length : 0) + ' cards)');
    { // the playoff renderer keeps its own grid: no zpb-awrows inside its function body
      const pi = HTML.indexOf('renderPlayoffAwardsHTML = function');
      const body = pi > -1 ? HTML.slice(pi, HTML.indexOf('// Safety net: no draft slot', pi)) : '';
      ok(!!body && !body.includes('zpb-awrows'), 'the playoff awards keep their own grid — untouched');
    }
    ok(errors.length===0, 'zero console errors through the review drills');
  }

  console.log('== w37 R14 · the report-card lines are text again ==');
  {
    ok(/\.zpb-rc-body i\{display:inline;height:auto;margin:0;background:none;border-radius:0;\}/.test(HTML), 'the reset is in the bytes');
    const metIdx = HTML.indexOf('.zpb-met i{display:block;height:3px;');
    const w37Idx = HTML.indexOf('<style id="zpb-w37-css">');
    ok(metIdx > -1 && w37Idx > metIdx, 'the w37 payload loads AFTER the old bar rule — the reset wins the cascade');
    ok(/zpb-rc-title">UNIT REPORT CARD</.test(HTML), 'the report card builder stands');
  }

  console.log('== the playoffs ==');
  ev('(function(){ try{ startPlayoffs(); }catch(e){ window.__pErr=(e&&e.stack)||String(e); } })()');
  await sleep(300);
  for(const rk of ['wildcard','divisional','champ']){
    if (ev('seasonState.phase') !== 'playoffs' || ev('seasonState.currentPlayoffRound') === 'superbowl') { ok(true, 'the postseason completed early'); break; }
    ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__pErr=((e&&e.stack)||String(e)); } })()');
    ev('(function(){ try{ advancePlayoffRound(); }catch(e){ window.__pErrA=String(e); } })()');
    await sleep(150);
  }
  ok(!ev('window.__pErr||""'), 'the rounds simulate clean' + (ev('window.__pErr||""') ? ' — '+ev('window.__pErr').slice(0,120) : ''));
  ok(ev('seasonState.currentPlayoffRound')==='superbowl', 'the bracket reaches the Super Bowl');
  ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__sbErr=String(e); } })()');
  await sleep(300);
  ok(ev('seasonState.phase')==='complete', 'the Super Bowl lands on the complete phase');
  ok(!!ev('seasonState.champion'), 'a champion is crowned: ' + ev('seasonState.champion'));

  console.log('== w37 R13 · the Season Review button leads from the top right ==');
  {
    ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__cErr=String(e); }');
    await sleep(500);
    ok(!ev('window.__cErr||""'), 'the complete view renders' + (ev('window.__cErr||""') ? ' — '+ev('window.__cErr').slice(0,100) : ''));
    const btn = doc.getElementById('seasonReviewBtn');
    ok(!!btn, 'the Season Review button is on the page');
    const bar = btn && btn.closest('.zpb-sr-topbar');
    ok(!!bar, 'it lives in the top bar');
    ok(!!bar && bar.parentElement && bar.parentElement.firstElementChild === bar, 'the top bar is the FIRST element of the champion page');
    ok(!!bar && window.getComputedStyle(bar).justifyContent === 'flex-end', 'the bar aligns its content right — the button sits in the top right');
    ok(!/text-align:center;"><button class="resetbtn" id="seasonReviewBtn"/.test(HTML), 'the old centered bottom panel is gone from the bytes');
    ok(errors.length===0, 'zero console errors end to end' + (errors.length ? ' — '+errors.slice(0,3).join(' | ') : ''));
  }

  console.log('== the standing laws on the touched surfaces ==');
  ok(/const v = wt \? sum\/wt : 0/.test(HTML) && /Math\.round\(v\)/.test(HTML), 'the lineup scores stay integers');
  ok(errors.length===0, 'zero console errors through the whole run' + (errors.length?' — '+errors.slice(0,3).join(' | '):''));

  console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
