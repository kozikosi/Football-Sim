#!/usr/bin/env node
/* w36_recon4.js — why did the verify's detail drill and dropdown drill see nothing? */
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
  ev('try{ startDraft2(); }catch(e){ window.__e1=String(e); }');
  await sleep(500);
  say('after startDraft2: welcome cine up?', !!doc.querySelector('.zpb-fin-welcome'), '· __zpbWelDone:', ev('window._zpbWelDone'));
  ev('try{ simToEnd(); }catch(e){ window.__e2=String(e); }');
  await sleep(700);
  say('after simToEnd: err?', ev('window.__e1||window.__e2||"none"'));
  say('  resultsView:', ev('resultsView'), '· seasonState:', !!ev('seasonState'));
  say('  draftFinalResults display:', ev('document.getElementById("draftFinalResults").style.display'));
  const body = doc.getElementById('draftResultsBody');
  say('  body has ranks table?', !!body && body.textContent.includes('How your draft ranks'));
  say('  detailwrap count:', doc.querySelectorAll('[id^="detailwrap-"]').length);
  const w0 = doc.querySelector('[id^="detailwrap-"]');
  say('  first detailwrap innerHTML length:', w0 ? w0.innerHTML.length : -1);
  say('  welcome cine still up?', !!doc.querySelector('.zpb-fin-welcome'));

  // the dropdown drill repro
  ev('try{ startSeason(); renderSeasonTab(document.getElementById("draftResultsBody")); }catch(e){ window.__e3=String(e); }');
  await sleep(800);
  say('\nafter startSeason + renderSeasonTab: err?', ev('window.__e3||"none"'));
  say('  preseason flag:', ev('seasonState && seasonState.preseason'), '· phase:', ev('seasonState && seasonState.phase'));
  const ed = doc.getElementById('lineupPre');
  say('  #lineupPre present?', !!ed, '· innerHTML length:', ed ? ed.innerHTML.length : -1);
  say('  select[data-lineup] count in #lineupPre:', ed ? ed.querySelectorAll('select[data-lineup]').length : -1);
  say('  select[data-lineup] count in document:', doc.querySelectorAll('select[data-lineup]').length);
  say('  .depth-row count in document:', doc.querySelectorAll('.depth-row').length);
  say('  console errors:', errors.length, errors.slice(0,3));
})().catch(e => { console.error('DIED:', e); process.exit(1); });
