#!/usr/bin/env node
/* w41_stress.js — the functional sweep for w41 (extends the w38/w39 sweeps).
   Drives the 32-pick draft, the SIM SEASON leg through the books overlay, the playoffs
   round-by-round with the real replay + the ONE skip button, the champions gate, the Super
   Bowl stage — and asserts the w41 laws live: the box score wears the dropdown ink (P3/P4),
   the game balls obey the tackle-only rule (W8), the three new leaders exist (W9), the awards
   render one line per round (W7), the hub buttons center and glow (W1), the loss retires the
   duplicate (W3), the bracket toggles and carries logos only (W4/W5), the Kicker badge is the
   ninth tile (W6), the 20-0 panel opens centered (W10). Zero console errors end to end. */
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
const closeReplay = () => ev('try{ const o=document.querySelector(".zpb-replay-ov"); if(o) o.remove(); }catch(e){}');

(async () => {
  await sleep(900);

  console.log('== the 32-pick draft (carried) ==');
  ev('try{ startDraft2(); }catch(e){ window.__d0=String(e); }');
  await sleep(400);
  ok(!ev('window.__d0||""'), 'the draft boots');
  const scripted = ev(`(function(){
    const picks = [];
    try{
      draftSpeed = 'instant';
      try{ clearTimeout(slowTimer); slowTimer = null; }catch(e){}
      for(let guard=0; guard<6000 && draftSim.pos < draftSim.order.length; guard++){
        const t = draftSim.order[draftSim.pos];
        if(t === draftSim.userIndex){
          const roster = draftSim.rosters[t];
          if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
          const nat = p => (NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
          let cands = draftSim.pool.filter(p=>nat(p).length);
          if(!cands.length){ cands = draftSim.pool.slice(); }
          cands.sort((a,b)=>b[3]-a[3]);
          const p = cands[0];
          const openNat = nat(p);
          const slot = openNat.length ? openNat[0] : ROSTER_SLOTS.find(s=>!roster.slots[s]);
          picks.push({slot, name: p[0], pos: p[1], fb: !openNat.length});
          executePick(draftSim.userIndex, p, slot);
        } else {
          const pk = cpuPick(t);
          if(pk && pk.slot) executePick(t, pk.player, pk.slot); else draftSim.pos++;
        }
      }
      draftSim.awaitingUser = false;
    }catch(e){ picks.err = String(e); }
    return picks;
  })()`);
  await sleep(700);
  ok(!scripted.err, 'the scripted draft runs' + (scripted.err ? ' — '+scripted.err : ''));
  ok(scripted.length === 32, '32 scripted picks made (' + scripted.length + ')');
  ok(ev('draftSim && draftSim.pos >= 32*32'), 'the draft completes at 32 rounds');
  ok(ev('typeof finishDraft2==="function"') && ev('(function(){ try{ if(draftFinalResults.style.display==="none") finishDraft2(); }catch(e){} return true; })()'), 'the draft finishes');
  await sleep(400);
  ok(errors.length===0, 'zero console errors through the draft');

  console.log('== the SEASON tab + BEGIN ==');
  {
    const tab = doc.getElementById('resultsSeasonBtn');
    if (tab) { tab.click(); await sleep(400); }
    ok(!!ev('seasonState'), 'the click scaffolds the season');
    const beg = doc.getElementById('beginSeasonBtn');
    if (beg) { beg.click(); await sleep(400); }
    ok(ev('seasonState && seasonState.preseason === false'), 'the preseason flag falls');
    await sleep(5200);
    ok(doc.querySelectorAll('.zpb-prematch').length === 0, 'the SEASON OPENER veil clears');
  }

  console.log('== the books leg (carried) ==');
  {
    closeReplay();
    const ss = doc.getElementById('simSeasonBtn');
    ok(!!ss, 'SIM SEASON is on the week view');
    if (ss) { ss.click(); await sleep(200); }
    const yes = [...(doc.querySelector('.confirm-ov')||{querySelectorAll:()=>[]}).querySelectorAll('button')].find(b=>/YES/.test(b.textContent));
    ok(!!yes, 'the confirm opens with the YES door first');
    if (yes) { yes.click(); await sleep(500); }
    const ov = doc.querySelector('.zpb-restov');
    ok(!!ov, 'the books overlay opens');
    const honors = ov ? ov.querySelectorAll('.zpb-shonor').length : 0;
    await sleep(Math.max(honors*900 + 2600, 4200));
    const go = doc.getElementById('zpbRestGo');
    ok(!!go, 'Continue closes the books');
    if (go) { go.click(); await sleep(500); }
    ok(!doc.querySelector('.zpb-restov'), 'the books close');
    ok(ev('seasonState.phase')==='regularReview', 'the season lands in the review');
    ok(errors.length===0, 'zero console errors through the books leg');
  }

  console.log('== w41 P3/P4 · the box score wears the dropdown ink ==');
  {
    const r = ev(`(function(){
      try{
        const user = seasonUserTeam();
        const g = seasonState.schedule.filter(x=>x.result);
        if(!g.length) return {err:'no played games yet'};
        const html = renderGameResultHTML(g[0], user);
        return { sl: /class="zpb-sl2name[^"]*"/.test(html), slCount: (html.match(/zpb-sl2name/g)||[]).length,
                 ls: /<tr class="zpb-trow" style="[^"]*--zn:1/.test(html), lsTeam: (html.match(/zpb-ls-team/g)||[]).length };
      }catch(e){ return {err:String(e)}; }
    })()`);
    ok(!r.err, 'renderGameResultHTML renders' + (r.err ? ' — '+r.err : ''));
    if (!r.err) {
      ok(r.sl && r.slCount === 2, 'both team names ride zpb-sl2name');
      ok(r.ls, 'the linescore rows carry the neutral vars (--zn:1)');
      ok(r.lsTeam >= 2, 'the linescore labels carry their class (' + r.lsTeam + ')');
    }
  }


  console.log('== w41 W8 · the game balls obey the tackle-only rule ==');
  {
    const audit = ev(`(function(){
      let checked = 0, bad = [];
      seasonState.schedule.forEach(g=>{
        if(!g.detail || !g.detail.mvp) return;
        const m = g.detail.mvp;
        const isDef = m.group==='DL' || m.group==='LB' || m.group==='DB';
        if(!isDef) return;
        checked++;
        const st = m.st || {};
        const other = (st.sack||0)+(st.int||0)+(st.ff||0)+(st.fr||0)+(st.dtd||0);
        if(other === 0 && !((st.tkl||0) >= 15 && (st.tfl||0) >= 2)) bad.push(m.name+' '+m.team+' tkl:'+(st.tkl||0)+' tfl:'+(st.tfl||0));
      });
      return {checked, bad};
    })()`);
    ok(audit.checked > 0, 'defensive game balls audited (' + audit.checked + ' defensive winners)');
    ok(audit.bad.length === 0, 'every defensive winner passes the rule' + (audit.bad.length ? ' — offenders: ' + audit.bad.slice(0,3).join(' | ') : ''));
  }

  console.log('== the playoffs · W1 the hub buttons, W4/W5 the bracket ==');
  // the harness law: the w41 drills need the user IN the bracket — if the season left him out,
  // he takes seed 6 of his conference (the product is untouched; the harness re-seeds).
  ev(`(function(){
    try{
      const u = seasonUserTeam();
      const conf = seasonState.seeds.AFC.some(s=>s.team===u) ? 'AFC' : 'NFC';
      const arr = seasonState.seeds[conf];
      if(!arr.some(s=>s.team===u)){ const s6 = arr.find(s=>s.seed===6) || arr[arr.length-1]; s6.team = u; }
    }catch(e){ window.__seedErr = String(e); }
  })()`);
  ok(!ev('window.__seedErr||""'), 'the user is seeded into the bracket');
  ev('window.__fxLog=[]; (function(){ const _op=FX.play.bind(FX); FX.play=(k,m)=>{ try{ window.__fxLog.push(String(k)); }catch(e){} return _op(k,m); }; })()');
  ev('(function(){ try{ startPlayoffs(); }catch(e){ window.__pErr=(e&&e.stack)||String(e); } })()');
  await sleep(300);
  let didReplayDrill = false;
  let lossChecked = false;
  for(const rk of ['wildcard','divisional','champ']){
    if (ev('seasonState.phase') !== 'playoffs' || ev('seasonState.currentPlayoffRound') === 'superbowl') { ok(true, 'the bracket completed early'); break; }
    ev('(function(){ try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__pErr=String(e); } })()');
    await sleep(250);
    if (!didReplayDrill) {
      const hub = ev(`(function(){
        const b = document.getElementById('simRoundBtn');
        if(!b) return {none:1};
        const row = b.parentElement;
        return { ctabig: b.classList.contains('zpb-ctabig'), center: (row.getAttribute('style')||'').indexOf('justify-content:center') >= 0 };
      })()`);
      ok(!hub.none && hub.ctabig, 'the round button wears zpb-ctabig (W1)');
      ok(!hub.none && hub.center, 'the hub row centers (W1)');
    }
    const uPlaying = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]); const ug = g.find&&g.find(x=>x.home===u||x.away===u); return !!ug && !ug.result; })()');
    const btn = doc.getElementById('simRoundBtn');
    ok(!!btn, 'the round button is on the page');
    if (btn) { btn.click(); await sleep(350); }
    if (uPlaying) {
      const ov = doc.querySelector('.zpb-replay-ov');
      ok(!!ov, 'the during-game screen opened for the playoff game');
      if (ov) {
        const skip = ov.querySelector('#zrepSkip');
        if (skip) { skip.click(); await sleep(250); }
        if (skip) { skip.click(); await sleep(250); }
        const fin = ev('(function(){ const u=seasonUserTeam(); const rk=seasonState.currentPlayoffRound; const g=(seasonState.playoffRounds[rk]||[]).find(x=>x.result&&(x.home===u||x.away===u)); return g ? g.result.awayScore+"-"+g.result.homeScore : ""; })()');
        const fs = ov.querySelector('.zpb-rep-fscore');
        const got = fs ? (fs.textContent.match(/\d+/g)||[]).join('-') : '';
        ok(!!fs && got === fin, 'the playoff final reads the TRUE score (' + fin + ') — ' + got);
        await sleep(2300);
        const go = ov.querySelector('#zrepGo'); if (go) { go.click(); await sleep(150); }
      }
    } else {
      ok(true, 'the user has a bye this round — no replay to drill');
    }
    closeReplay();
    didReplayDrill = true;
    // W3 · the deterministic probe runs BEFORE the advance: the product's own law (the w34 era)
    // sims the rest of the bracket the moment an eliminated team advances, so the probe renders
    // the round-results header while the pointer still sits on this round.
    if (!lossChecked) {
      const t = ev(`(function(){
        try{
          const u=seasonUserTeam();
          const mine = (seasonState.playoffRounds[seasonState.currentPlayoffRound]||[]).find(x=>x.result&&(x.home===u||x.away===u));
          if(!mine) return {skip:'no user game yet'};
          const realLost = mine.home===u ? mine.result.awayScore>mine.result.homeScore : mine.result.homeScore>mine.result.awayScore;
          const probe = (lost)=>{
            const keep = [mine.result.homeScore, mine.result.awayScore];
            if(lost !== realLost){ if(mine.home===u){ mine.result.homeScore = 0; mine.result.awayScore = 1; } else { mine.result.awayScore = 0; mine.result.homeScore = 1; } }
            try{ renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){}
            const nxt = document.getElementById('nextRoundBtn');
            const rest = document.getElementById('simRestBtn');
            const out = { nxt: !!nxt, rest: !!rest, nxtTxt: nxt ? nxt.textContent.trim() : '' };
            if(lost !== realLost){ mine.result.homeScore = keep[0]; mine.result.awayScore = keep[1]; try{ renderSeasonTab(document.getElementById('draftResultsBody')); }catch(e){} }
            return out;
          };
          const onLoss = probe(true);
          const real = probe(realLost);
          return { onLoss, real, realLost };
        }catch(e){ return {err:String(e)}; }
      })()`);
      ok(!t.err && !t.skip, 'the W3 probe runs' + (t.err ? ' — '+t.err : (t.skip ? ' — '+t.skip : '')));
      if (t && t.onLoss) {
        ok(t.onLoss.nxt && !t.onLoss.rest, 'on a loss there is NO second Sim Playoffs button (W3)');
        ok(t.real.nxt && (t.realLost ? !t.real.rest : t.real.rest), 'the real result renders its own branch (' + (t.realLost ? 'loss' : 'win') + ')');
        lossChecked = true;
      }
    }
    ev('(function(){ try{ advancePlayoffRound(); }catch(e){ window.__pErrA=String(e); } })()');
    await sleep(250);
  }
  ok(!ev('window.__pErr||""'), 'the rounds simulate clean');
  ok(ev('seasonState.currentPlayoffRound')==='superbowl', 'the bracket reaches the Super Bowl');

  console.log('== w41 W4/W5 · the bracket toggles, logos only ==');
  {
    const t = ev(`(function(){
      try{
        renderSeasonTab(document.getElementById("draftResultsBody"));
        const host = document.getElementById('zpbTreeDetail');
        if(!host) return {err:'no host'};
        const cards = [...document.querySelectorAll('.zpb-tree-card[data-pog]')].filter(c=>c.title && /Review:/.test(c.title));
        if(!cards.length) return {err:'no played cards'};
        const names = document.querySelectorAll('.zpb-tree-card .zpb-tname').length;
        cards[0].click();
        const open = host.style.display === 'block' && !!host.innerHTML;
        const key1 = host.dataset.pogOpen;
        cards[0].click();
        const closed = host.style.display === 'none';
        return { open, key1: !!key1, closed, names };
      }catch(e){ return {err:String(e)}; }
    })()`);
    ok(!t.err, 'the bracket drill runs' + (t.err ? ' — '+t.err : ''));
    if (!t.err) {
      ok(t.open, 'the first click opens the review');
      ok(t.closed, 'the second click on the same panel closes it (W4)');
      ok(t.names === 0, 'the tree cards carry no team names (W5)');
    }
  }

  console.log('== the Super Bowl + the awards ==');
  if (ev('seasonState.phase') === 'playoffs') {
    ev('(function(){ try{ simulatePlayoffRound(); }catch(e){ window.__sbErr=String(e); } })()'); // the pointer sits on the Super Bowl
  } else ok(true, 'the eliminated path already carried the bracket to the end');
  await sleep(300);
  ok(ev('seasonState.phase')==='complete', 'the Super Bowl lands on the complete phase');
  {
    const aw = ev(`(function(){
      try{
        const P = seasonState.awardsPO;
        const titles = (P.leaders||[]).map(l=>l.title);
        const html = renderPlayoffAwardsHTML(P);
        const mvpLines = (html.match(/zpb-awline zpb-awline-mvp/g)||[]).length;
        const roundLines = (html.match(/class="zpb-awline"(?![^>]*mvp)/g)||[]).length;
        const rounds = (P.rounds||[]).length;
        const gridOnMvps = /zpb-awgrid[^>]*>[\\s]*<div class="zpb-pcard zpb-awcard[^>]*>[\\s]*<span class="zpb-awt">Super Bowl MVP/.test(html);
        const oldGridCards = (html.match(/zpb-awgrid">\s*<div class="zpb-pcard[^>]*>\s*<span class="zpb-awt">Super Bowl MVP/g)||[]).length;
        return { titles, mvpLines, roundLines, rounds, oldGridCards, sb: !!P.sbMvp, mvp: !!P.mvp };
      }catch(e){ return {err:String(e)}; }
    })()`);
    ok(!aw.err, 'the awards render' + (aw.err ? ' — '+aw.err : ''));
    if (!aw.err) {
      ok(aw.titles.indexOf('Postseason Forced Fumbles') >= 0, 'the Forced Fumbles leader exists (W9)');
      ok(aw.titles.indexOf('Postseason Tackles For Loss') >= 0, 'the TFL leader exists (W9)');
      ok(aw.titles.indexOf('Postseason TDs · non-QB') >= 0, 'the non-QB TD leader exists (W9)');
      ok(aw.mvpLines === (aw.sb?1:0) + (aw.mvp?1:0), 'each MVP sits on his own centered line (W7)');
      ok(aw.roundLines === aw.rounds, 'one line per round (' + aw.roundLines + '/' + aw.rounds + ')');
      ok(aw.oldGridCards === 0, 'the MVPs are out of the old grid');
    }
  }
  {
    // the Super Bowl stage + Continue (carried R13/R14)
    ev('try{ renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__cErr=String(e); }');
    await sleep(900);
    const stage = doc.querySelector('.zpb-sbfin');
    ok(!!stage, 'the SUPER BOWL · FINAL stage rises');
    const go = doc.querySelector('.zpb-sbfin-go');
    if (go) { go.click(); await sleep(600); }
    ok(!doc.querySelector('.zpb-sbfin'), 'the Continue moves on from the Super Bowl');
  }
  console.log('== w41 W10 · the 20-0 panel ==');
  {
    const t = ev(`(function(){
      try{
        let btn = document.getElementById('zpbTryAgainBtn');
        if(!btn){ // the review page hides behind the bar until the Owner opens it
          const bar = document.getElementById('seasonReviewBtn');
          if(bar) bar.click();
          btn = document.getElementById('zpbTryAgainBtn');
        }
        if(!btn) return {err:'no button'};
        btn.click();
        const box = document.querySelector('.confirm-box.zpb-again-box');
        if(!box) return {err:'no box'};
        const q = box.querySelector('.zpb-again-q');
        const shine = q ? !!q.querySelector('.zpb-shine') : false;
        const btns = box.querySelectorAll('.zpb-again-btn').length;
        box.closest('.confirm-ov').remove();
        return { q: !!q, shine, btns };
      }catch(e){ return {err:String(e)}; }
    })()`);
    ok(!t.err, 'the 20-0 panel opens' + (t.err ? ' — '+t.err : ''));
    if (!t.err) {
      ok(t.q, 'the question carries the centered Cinzel class (W10)');
      ok(t.shine, 'the 20-0 keeps its shimmer');
      ok(t.btns === 3, 'the three doors remain (' + t.btns + ')');
    }
  }
  console.log('== w41 W6 · the unit report card ==');
  {
    const t = ev(`(function(){
      try{
        const html = zpbMetricsHTML();
        const tiles = (html.match(/zpb-rcbadge/g)||[]).length;
        const last = html.slice(html.lastIndexOf('zpb-rcbadge'));
        return { tiles, kickerLast: last.indexOf('KICKER') >= 0 || last.indexOf('Kicker') >= 0 };
      }catch(e){ return {err:String(e)}; }
    })()`);
    ok(!t.err, 'the report card renders' + (t.err ? ' — '+t.err : ''));
    if (!t.err) ok(t.tiles === 9 && t.kickerLast, 'nine tiles, the Kicker last (the W6 centering target)');
  }

  ok(errors.length===0, 'zero console errors end to end' + (errors.length ? ' — '+errors.slice(0,3).join(' | ') : ''));
  console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
