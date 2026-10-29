#!/usr/bin/env node
/* probe_weights.js — why doesn't the synthetic input event move the board? */
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM, VirtualConsole } = jsdom;
const HTML = fs.readFileSync('/home/z/my-project/w34/Football-Sim-Z-post-blue-w34.html', 'utf8');
const vc = new VirtualConsole();
vc.on('jsdomError', ()=>{});
const dom = new JSDOM(HTML, { runScripts:'dangerously', pretendToBeVisual:true, url:'http://localhost/', virtualConsole:vc,
  beforeParse(window){
    window.matchMedia = q => ({ matches:false, media:q, onchange:null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } });
    window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
    window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
    window.Element.prototype.scrollIntoView = function(){};
    window.scrollTo = () => {};
  }});
const { window } = dom; const doc = window.document;
const ev = s => window.eval(s);
setTimeout(() => {
  doc.getElementById('tabRankingsBtn').click();
  const wd = doc.getElementById('weightsDrop');
  console.log('drop exists:', !!wd, 'open:', wd && wd.open);
  if (wd) wd.open = true;
  const inp = wd && wd.querySelector('.zpb-win');
  console.log('first input slot:', inp && inp.closest('.zpb-wbadge').dataset.wslot, 'value:', inp && inp.value);
  const before = ev('weights.QB');
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(inp, '700');
  inp.dispatchEvent(new window.Event('input', {bubbles:true}));
  const after = ev('weights.QB');
  const score1 = ev('computeScore(Object.keys(TEAM_DATA)[0]).toFixed(2)');
  console.log('weights.QB before/after:', before, after, '| team0 score now:', score1);
  const cell = doc.querySelector('#resultsBody .score');
  console.log('first cell text:', cell && cell.textContent);
  process.exit(0);
}, 1200);
