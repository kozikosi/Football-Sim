#!/usr/bin/env node
/* w36_recon3.js — catch the phantom re-renderer: capture page console.log,
   wrap the render functions, print stacks, poll liveness. */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/w36/Football-Sim-Z-post-blue-w36.html', 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if(!/Could not parse CSS|not implemented/i.test(String(e))) errors.push(e.message); });
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
vc.on('log', (...a) => { const s = a.join(' '); if (s.includes('[WRAP]') || s.includes('[ERR]')) console.log('PAGE:', s); });
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

(async () => {
  await sleep(900);
  ev(`(function(){
    const wrap = (name, fn) => function(c){
      const id = c && c.id ? c.id : String(c && c.className).slice(0,28);
      const stack = (new Error().stack || '').split('\\n').slice(2, 6).map(l => l.trim().replace(/^at /, '').replace(/:\\d+:\\d+$/, '')).join(' <- ');
      console.log('[WRAP] ' + name + '(' + id + ') live=' + !!(c && c.isConnected) + ' | ' + stack);
      return fn.apply(this, arguments);
    };
    try{ window.__oRST = renderSeasonTab; renderSeasonTab = wrap('renderSeasonTab', window.__oRST); }catch(e){ console.log('[ERR] rst '+e); }
    try{ window.__oRPV = renderPreseasonView; renderPreseasonView = wrap('renderPreseasonView', window.__oRPV); }catch(e){ console.log('[ERR] rpv '+e); }
    try{ window.__oRRSV = renderRegularSeasonView; renderRegularSeasonView = wrap('renderRegularSeasonView', window.__oRRSV); }catch(e){ console.log('[ERR] rrsv '+e); }
    try{ window.__oRDR = renderDraftResults; renderDraftResults = wrap('renderDraftResults', window.__oRDR); }catch(e){ console.log('[ERR] rdr '+e); }
    try{ window.__oSTI = renderSeasonTabInner; renderSeasonTabInner = wrap('renderSeasonTabInner', window.__oSTI); }catch(e){ console.log('[ERR] sti '+e); }
  })()`);
  ev('try{ startDraft2(); }catch(e){}'); await sleep(400);
  ev(`(function(){ try{ draftSpeed='instant'; try{clearTimeout(slowTimer)}catch(e){}
    for(let g=0; g<6000 && draftSim.pos<draftSim.order.length; g++){
      const t=draftSim.order[draftSim.pos];
      if(t===draftSim.userIndex){ const r=draftSim.rosters[t]; if(firstOpenSlotAny(r)===null){draftSim.pos++;continue;}
        const nat=p=>(NATURAL_SLOT_MAP[p[1]]||[]).filter(s=>!r.slots[s]);
        let c=draftSim.pool.filter(p=>nat(p).length); if(!c.length) c=draftSim.pool.slice(); c.sort((a,b)=>b[3]-a[3]);
        const p=c[0], on=nat(p); const s=on.length?on[0]:ROSTER_SLOTS.find(s=>!r.slots[s]); executePick(draftSim.userIndex,p,s);
      } else { const pk=cpuPick(t); if(pk&&pk.slot) executePick(t,pk.player,pk.slot); else draftSim.pos++; } }
    draftSim.awaitingUser=false; }catch(e){ console.log('[ERR] draft '+e); } })()`);
  await sleep(600);
  ev('try{ finishDraft2(); }catch(e){ console.log("[ERR] fin "+e); }');
  await sleep(400);
  console.log('--- click resultsSeasonBtn');
  const tab = doc.getElementById('resultsSeasonBtn'); if (tab) tab.click();
  await sleep(300);
  console.log('--- click big SEASON');
  const big = doc.getElementById('startSeasonBtn');
  if (big) big.click();
  // poll for the phantom
  for (let i = 0; i < 14; i++) {
    await sleep(400);
    const live = !!(doc.getElementById('beginSeasonBtn') && doc.getElementById('beginSeasonBtn').isConnected);
    if (live) { console.log('--- beginSeasonBtn LIVE at t+' + ((i + 1) * 0.4).toFixed(1) + 's'); break; }
  }
  const beg = doc.getElementById('beginSeasonBtn');
  if (beg && beg.isConnected) {
    console.log('--- click BEGIN');
    beg.click();
    await sleep(400);
    console.log('--- week-1 header live:', /Week 1 of 17/.test((doc.getElementById('draftResultsBody')||{textContent:''}).textContent || ''));
  }
  await sleep(1200);
  console.log('done. errors:', errors.length);
})().catch(e => { console.error('DIED:', e); process.exit(1); });
