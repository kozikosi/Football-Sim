#!/usr/bin/env node
/* w36_recon2.js — who renders what, where: instrument the render functions
   and replay the Owner's clicks (big SEASON → SEASON tab → BEGIN). */
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
const live = id => { const el = doc.getElementById(id); return !!el && el.isConnected; };

(async () => {
  await sleep(900);
  ev(`(function(){
    const tag = fn => function(c){
      const id = c && c.id ? c.id : (c && c.className ? String(c.className).slice(0,30) : String(c));
      const liveC = !!(c && c.isConnected);
      console.log('[RENDER] ' + fn + ' container=' + id + ' live=' + liveC);
      return fn === 'renderSeasonTab' ? window.__origRST(c)
           : fn === 'renderPreseasonView' ? window.__origRPV(c)
           : fn === 'renderRegularSeasonView' ? window.__origRRSV(c)
           : window.__origRDR();
    };
    window.__origRST = renderSeasonTab; renderSeasonTab = tag('renderSeasonTab');
    window.__origRPV = renderPreseasonView; renderPreseasonView = tag('renderPreseasonView');
    window.__origRRSV = renderRegularSeasonView; renderRegularSeasonView = tag('renderRegularSeasonView');
    window.__origRDR = renderDraftResults; renderDraftResults = tag('renderDraftResults');
  })()`);
  // scripted draft
  ev('try{ startDraft2(); }catch(e){}'); await sleep(400);
  ev(`(function(){ try{ draftSpeed='instant'; try{clearTimeout(slowTimer)}catch(e){}
    for(let g=0; g<6000 && draftSim.pos<draftSim.order.length; g++){
      const t=draftSim.order[draftSim.pos];
      if(t===draftSim.userIndex){ const r=draftSim.rosters[t]; if(firstOpenSlotAny(r)===null){draftSim.pos++;continue;}
        const nat=p=>(NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!r.slots[s]);
        let c=draftSim.pool.filter(p=>nat(p).length); if(!c.length) c=draftSim.pool.slice(); c.sort((a,b)=>b[3]-a[3]);
        const p=c[0], on=nat(p); const s=on.length?on[0]:ROSTER_SLOTS.find(s=>!r.slots[s]); executePick(draftSim.userIndex,p,s);
      } else { const pk=cpuPick(t); if(pk&&pk.slot) executePick(t,pk.player,pk.slot); else draftSim.pos++; } }
    draftSim.awaitingUser=false; }catch(e){ console.log('[DRAFT ERR] '+e); } })()`);
  await sleep(600);
  ev('try{ finishDraft2(); }catch(e){ console.log("[FIN ERR] "+e); }');
  await sleep(500);
  say('-- after draft, resultsView =', ev('resultsView'));
  // Owner path: click the SEASON tab button, then the big SEASON button
  const tab = doc.getElementById('resultsSeasonBtn'); if (tab) { say('-- click resultsSeasonBtn'); tab.click(); await sleep(300); }
  const big = doc.getElementById('startSeasonBtn');
  say('-- big SEASON button present:', !!big);
  if (big) { big.click(); await sleep(400); }
  say('seasonState:', !!ev('seasonState'), '· preseason flag:', ev('seasonState && seasonState.preseason'));
  say('beginSeasonBtn live:', live('beginSeasonBtn'), '· beginSeasonBtn2 live:', live('beginSeasonBtn2'));
  // if the preseason page is live now, click BEGIN
  const beg = doc.getElementById('beginSeasonBtn');
  if (beg && beg.isConnected) {
    say('-- click beginSeasonBtn');
    beg.click(); await sleep(300);
    say('   preseason flag:', ev('seasonState && seasonState.preseason'));
    say('   week-1 header live:', /Week 1 of 17/.test((doc.getElementById('draftResultsBody')||{}).textContent||''));
    say('   veil count:', doc.querySelectorAll('.zpb-prematch').length);
    await sleep(5200);
    say('   after 5s — week-1 header live:', /Week 1 of 17/.test((doc.getElementById('draftResultsBody')||{}).textContent||''));
    say('   veil count after 5s:', doc.querySelectorAll('.zpb-prematch').length);
    say('   simWeekBtn live:', live('simWeekBtn'));
  } else {
    say('-- beginSeasonBtn NOT live; wait 5s to watch for the auto-rescue');
    await sleep(5000);
    say('   beginSeasonBtn live now:', live('beginSeasonBtn'));
    const beg2 = doc.getElementById('beginSeasonBtn');
    if (beg2 && beg2.isConnected) {
      say('-- click beginSeasonBtn (late)');
      beg2.click(); await sleep(300);
      say('   preseason flag:', ev('seasonState && seasonState.preseason'));
      say('   week-1 header live:', /Week 1 of 17/.test((doc.getElementById('draftResultsBody')||{}).textContent||''));
      await sleep(5200);
      say('   after 5s — week-1 header live:', /Week 1 of 17/.test((doc.getElementById('draftResultsBody')||{}).textContent||''));
      say('   simWeekBtn live:', live('simWeekBtn'));
    }
  }
  say('console errors:', errors.length, errors.slice(0,3));
})().catch(e => { console.error('RECON2 DIED:', e); process.exit(1); });
