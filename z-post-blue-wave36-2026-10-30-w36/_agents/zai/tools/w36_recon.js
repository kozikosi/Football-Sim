#!/usr/bin/env node
/* w36_recon.js — live ground truth for the five round-36 directives.
   R3: what the review's SEASON tab actually shows (the "repeat").
   R5: BEGIN THE SEASON → cinematic → does week 1 land?
   R4: the lineup dropdown option format at rest.
   R1/R2: the review detail's card sets + the field map. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/w36/Football-Sim-Z-post-blue-w36.html', 'utf8');
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
const say = (...a) => console.log(...a);

(async () => {
  await sleep(900);
  say('== boot ==');
  say('startSeasonBtn present pre-draft:', !!doc.getElementById('startSeasonBtn'));

  // ---- scripted natural draft (the w34 stress pattern) ----
  ev('try{ startDraft2(); }catch(e){ window.__d0=String(e); }');
  await sleep(400);
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
          picks.push({slot, name: p[0], pos: p[1]});
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
  say('scripted picks:', scripted.length, scripted.err ? ('ERR '+scripted.err) : '');
  ev('(function(){ try{ if(document.getElementById("draftFinalResults").style.display==="none") finishDraft2(); }catch(e){ window.__fErr=String(e); } })()');
  await sleep(500);
  say('finishDraft2 err:', ev('window.__fErr||"none"'));

  // ---- R3: the review right after the draft ----
  say('\n== R3: the review, resultsView ==', ev('typeof resultsView!=="undefined" ? resultsView : "?"'));
  const sig = () => {
    const body = doc.getElementById('draftResultsBody');
    if(!body) return '(no body)';
    const intro = !!body.querySelector('.zpb-stageintro');
    const startBtn = !!doc.getElementById('startSeasonBtn');
    const ranks = body.textContent.includes('How your draft ranks');
    const preseason = body.textContent.includes('Set up the') && body.textContent.includes('before Week 1');
    const week1 = body.textContent.includes('Week 1 of 17');
    const detail = !!body.querySelector('.detailwrap .zpb-fm');
    return {intro, startBtn, ranks, preseason, week1, detailOpen: detail};
  };
  say('review body after draft:', JSON.stringify(sig()));
  // click the SEASON tab button (the Owner's "Season button from the draft review page")
  const seasonTab = doc.getElementById('resultsSeasonBtn');
  say('resultsSeasonBtn present:', !!seasonTab);
  if (seasonTab) { seasonTab.click(); await sleep(400); }
  say('review body after clicking SEASON tab:', JSON.stringify(sig()));
  say('  -> does the season tab repeat the review (ranks table)?', sig().ranks);
  say('  -> does it show the preseason page?', sig().preseason);

  // the big SEASON button (stage intro) — the other way a "Season button" shows on this page
  const big = doc.getElementById('startSeasonBtn');
  say('startSeasonBtn (stage intro) present:', !!big);
  if (big) { big.click(); await sleep(500); }
  say('review body after clicking the big SEASON button:', JSON.stringify(sig()));
  say('seasonState now:', !!ev('seasonState'), '· preseason flag:', ev('seasonState ? seasonState.preseason : null'));

  // ---- R5: BEGIN THE SEASON ----
  say('\n== R5: begin the season ==');
  const beg = doc.getElementById('beginSeasonBtn');
  say('beginSeasonBtn present:', !!beg);
  if (beg) { beg.click(); await sleep(300); }
  say('body right after BEGIN (veil should be up):', JSON.stringify(sig()));
  say('  .zpb-prematch veil count:', doc.querySelectorAll('.zpb-prematch').length);
  await sleep(5200); // the veil lives 4.6s
  say('body 5s after BEGIN:', JSON.stringify(sig()));
  say('  .zpb-prematch veil count (should be 0):', doc.querySelectorAll('.zpb-prematch').length);
  say('  preseason flag now:', ev('seasonState ? seasonState.preseason : null'));
  say('  "Play the" button present:', !!doc.getElementById('simWeekBtn'));
  say('  week-1 matchup card present:', !!doc.querySelector('.zpb-pvface, .zpb-fm-scrim'));
  say('console errors so far:', errors.length, errors.slice(0,3));

  // ---- R4: the lineup dropdown format at rest ----
  say('\n== R4: the lineup editor dropdowns ==');
  const sel = doc.querySelector('select[data-lineup]');
  if (sel) {
    const opts = [...sel.options].slice(0, 4).map(o => o.textContent);
    say('closed face (selected option text):', JSON.stringify(sel.selectedOptions[0] && sel.selectedOptions[0].textContent));
    say('first 4 option texts:', JSON.stringify(opts));
    say('any option text with a position word?', opts.some(t => /\b(QB|HB|RB|WR|TE|DT|EDGE|LB|CB|S|K|P|OT|OG|C)\b/.test(t)));
  } else say('no lineup select found');

  // ---- R1/R2: the review detail structure (open a row detail on the ranks table if present) ----
  say('\n== R1/R2: the detail under a review row ==');
  const wrap = doc.querySelector('[id^="detailwrap-"]');
  say('a detailwrap with content exists:', !!(wrap && wrap.innerHTML));
  if (wrap && wrap.innerHTML) {
    say('  top-cards heading present:', wrap.textContent.includes('IN THE ORDER YOU DRAFTED THEM'));
    say('  map present:', !!wrap.querySelector('.zpb-fm'));
    say('  map classes:', JSON.stringify((wrap.querySelector('.zpb-fm')||{}).className));
    const dbkCards = [...wrap.querySelectorAll('.zpb-dbk')];
    const withBeat = dbkCards.filter(c => c.hasAttribute('data-beat')).length;
    const dfc2 = dbkCards.filter(c => c.classList.contains('zpb-dfc2')).length;
    say('  zpb-dbk cards:', dbkCards.length, '· with data-beat:', withBeat, '· with zpb-dfc2 float-in:', dfc2);
    say('  breakdown section present:', wrap.textContent.includes('Your Breakdown'));
  }
  // the YOUR ROSTER tab — does it carry the map?
  const mine = doc.getElementById('resultsMineBtn');
  if (mine) { mine.click(); await sleep(400); }
  const mineBody = doc.getElementById('draftResultsBody');
  say('YOUR ROSTER tab: has field map?', !!(mineBody && mineBody.querySelector('.zpb-fm')));
  say('YOUR ROSTER tab: has WHERE YOUR PLAYERS LINE UP? heading?', !!(mineBody && mineBody.textContent.includes('WHERE YOUR PLAYERS LINE UP?')));
  say('\nfinal console errors:', errors.length, errors.slice(0,4));
})().catch(e => { console.error('RECON DIED:', e); process.exit(1); });
