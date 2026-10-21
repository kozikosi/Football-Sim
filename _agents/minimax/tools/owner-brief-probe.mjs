#!/usr/bin/env node
// owner-brief-probe.mjs — verify the Owner's 21 Oct brief items 1-5 in a live build.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node over CDP. Read-only.
//
//   node owner-brief-probe.mjs <file.html> [more files...]
//
// Checks, in the live page:
//   1  the draft board's columns (no "Value here", Priority still there)
//   2  the tab footer (no "More" label, six buttons)
//   3  the weights panel order (the three penalty sections sit BELOW the buttons)
//   4  the two buttons: "Default" and "Save My Weights" (transparent + disabled on load)
//   5  the save button's state machine: edit a weight -> "My Weights" + enabled -> save ->
//      "Default" -> back on the defaults -> "My Weights" still reachable (loads the saved set)
//   6  the sort dropdown label and the guide text (no visible "value here" column name)

import { pathToFileURL } from 'node:url';

const files = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!files.length) { console.error('usage: owner-brief-probe.mjs <file.html> [...]'); process.exit(4); }
const port = 9222;
const version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } });
const send = (method, params = {}, sessionId) => { const i = ++id; ws.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) })); return new Promise((res, rej) => pending.set(i, { res, rej })); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

for (const file of files) {
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' }, false);
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }, false);
  await send('Page.enable', {}, sessionId); await send('Runtime.enable', {}, sessionId);
  await send('Page.navigate', { url: pathToFileURL(file).href }, sessionId);
  await sleep(2800);
  const ev = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }, sessionId)).result?.value;
  const out = await ev(`(async function(){
    function txt(el){ return el ? (el.innerText||el.textContent||'').replace(/\\s+/g,' ').trim() : null; }
    var R = {};
    // --- 1 · the draft board's columns
    R.boardHeaders = [].slice.call(document.querySelectorAll('#draftTable2 thead th')).map(function(t){return t.textContent.trim();});
    R.valueHereCells = document.querySelectorAll('#draftBody2 td[data-label="Value here"]').length;
    R.sortOptions = [].slice.call(document.querySelectorAll('#draftSort2 option')).map(function(o){return o.textContent.trim();});
    // --- 2 · the tab footer
    R.footText = txt(document.querySelector('nav.footnav'));
    R.footButtons = [].slice.call(document.querySelectorAll('nav.footnav button')).map(function(b){return b.textContent.trim();});
    // --- open the rankings view (the weights panel)
    document.getElementById('tabRankingsBtn')?.click();
    await new Promise(function(r){setTimeout(r,600);});
    var c = document.getElementById('controls');
    R.controlsFound = !!c;
    if (c) {
      // --- 3 · panel order: where do the penalty sections sit?
      var kids = [].slice.call(c.children).map(function(k){
        return (k.className||'').indexOf('synergy-box')>=0 ? 'PENALTY-SECTION' : (k.className||'').indexOf('group')>=0 ? 'weight-group' : k.tagName.toLowerCase()+(k.id?'#'+k.id:'');
      });
      R.panelOrder = kids;
      R.penaltyIndex = kids.indexOf('PENALTY-SECTION');
      R.buttonsIndex = kids.findIndex(function(k){return k.indexOf('button')>=0;});
      R.penaltyAfterButtons = R.penaltyIndex>=0 && R.buttonsIndex>=0 ? R.penaltyIndex > R.buttonsIndex : null;
      // --- 4/5 · the two buttons and their state machine
      var m = document.getElementById('modelWBtn'), p = document.getElementById('personalWBtn');
      R.modelBtn = txt(m);
      R.saveBtn = txt(p);
      R.saveDisabled = p ? p.disabled : null;
      R.saveClasses = p ? p.className : null;
      R.saveBg = p ? getComputedStyle(p).backgroundImage + ' / ' + getComputedStyle(p).backgroundColor : null;
      R.saveOpacity = p ? getComputedStyle(p).opacity : null;
      // edit a weight -> the button must become live
      var qb = document.getElementById('w_QB');
      if (qb) { qb.value = String(parseFloat(qb.value) + 7); qb.dispatchEvent(new Event('input', {bubbles:true})); }
      await new Promise(function(r){setTimeout(r,300);});
      R.afterEdit_label = txt(p);
      R.afterEdit_disabled = p.disabled;
      R.afterEdit_classes = p.className;
      R.afterEdit_bg = getComputedStyle(p).backgroundImage;
      R.weightsDiffer = (typeof weights!=='undefined') ? JSON.stringify(weights)!==JSON.stringify(modelWeights()) : null;
      // click it -> it saves
      p.click();
      await new Promise(function(r){setTimeout(r,300);});
      R.afterSave_personalSaved = (typeof personalWeights!=='undefined' && personalWeights) ? Object.keys(personalWeights).length : null;
      R.afterSave_label = txt(p);
      // press Default -> back on the defaults; the saved set must stay reachable
      m.click();
      await new Promise(function(r){setTimeout(r,300);});
      R.afterDefault_label = txt(p);
      R.afterDefault_disabled = p.disabled;
      R.afterDefault_onDefaults = (typeof weights!=='undefined') ? JSON.stringify(weights)===JSON.stringify(modelWeights()) : null;
      p.click();
      await new Promise(function(r){setTimeout(r,300);});
      R.afterLoad_qb = (typeof weights!=='undefined') ? weights.QB : null;
      R.afterLoad_differs = (typeof weights!=='undefined') ? JSON.stringify(weights)!==JSON.stringify(modelWeights()) : null;
    }
    // --- 6 · the guide text
    document.getElementById('tabGuideBtn')?.click();
    await new Promise(function(r){setTimeout(r,500);});
    var guide = document.body.innerText || '';
    R.guideMentionsValueHere = /Value here/.test(guide);
    R.guideBoardTitle = (guide.match(/Reading the draft board \\([^)]*\\)/) || [null])[0];
    R.bodyMentionsValueHere = /Value here/.test(document.body.innerText);
    return JSON.stringify(R);
  })()`);
  let d = {};
  try { d = JSON.parse(out || '{}'); } catch (e) { console.log(file, '-> probe parse failed:', out); }
  console.log('\n' + file);
  console.log('  1 board headers      :', (d.boardHeaders || []).join(' | '));
  console.log('    "Value here" cells :', d.valueHereCells);
  console.log('    sort options      :', (d.sortOptions || []).join(' | '));
  console.log('  2 footer            :', JSON.stringify(d.footText), '| buttons:', (d.footButtons || []).join(', '));
  console.log('  3 panel order       :', (d.panelOrder || []).join(' > '));
  console.log('    penalties below the buttons:', d.penaltyAfterButtons);
  console.log('  4 buttons           : model="' + d.modelBtn + '" save="' + d.saveBtn + '" disabled=' + d.saveDisabled + ' classes=' + JSON.stringify(d.saveClasses));
  console.log('    save button style : bg=' + JSON.stringify(d.saveBg) + ' opacity=' + d.saveOpacity);
  console.log('  5 after edit        : label="' + d.afterEdit_label + '" disabled=' + d.afterEdit_disabled + ' classes=' + JSON.stringify(d.afterEdit_classes));
  console.log('    after save        : personalWeights saved=' + d.afterSave_personalSaved + ' keys label="' + d.afterSave_label + '"');
  console.log('    after Default     : label="' + d.afterDefault_label + '" disabled=' + d.afterDefault_disabled + ' onDefaults=' + d.afterDefault_onDefaults);
  console.log('    after load        : QB=' + d.afterLoad_qb + ' differs=' + d.afterLoad_differs);
  console.log('  6 guide mentions "Value here":', d.guideMentionsValueHere, '| body mentions it:', d.bodyMentionsValueHere, '| title:', d.guideBoardTitle);
  await send('Target.closeTarget', { targetId }, false);
}
ws.close();
