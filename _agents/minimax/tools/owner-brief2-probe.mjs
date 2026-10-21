#!/usr/bin/env node
// owner-brief2-probe.mjs — verify the Owner's second brief (21 Oct) in a live build.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node over CDP. Read-only.
//
//   node owner-brief2-probe.mjs <file.html> [more files...]
//
// Team Comparison: the subtitle, the effective-ratings note (gone from the Team Comparison page,
// still in the Draft Simulator and the season view), the Unit Comparison order, the group headers
// and the parenthesis-free labels.
// Guide: the box, the "Play the season" line, "advanced stats", the tier list (wins per +1 OVR) and
// the values table (no "Wins, 70→90" column).

import { pathToFileURL } from 'node:url';

const files = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!files.length) { console.error('usage: owner-brief2-probe.mjs <file.html> [...]'); process.exit(4); }
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
    R.subtitle = (typeof SUPP_TITLES!=='undefined' && SUPP_TITLES.tabCompareBtn) ? SUPP_TITLES.tabCompareBtn[1] : null;
    // --- Team Comparison page
    document.getElementById('tabCompareBtn')?.click();
    await new Promise(function(r){setTimeout(r,700);});
    var cmp = document.getElementById('homeCmpResult');
    R.cmpFound = !!cmp;
    if (cmp) {
      var html = cmp.innerHTML;
      R.cmpHasRatingsNote = /Ratings shown are effective ratings/.test(html);
      R.cmpHasVerdict = /On your current weights|grades .* points ahead/.test(html);
      R.defaultPair = [document.getElementById('homeCmpA')?.value, document.getElementById('homeCmpB')?.value];
      var tables = cmp.querySelectorAll('table');
      var unitTable = null;
      for (var t=0;t<tables.length;t++){ if (/Unit/i.test(tables[t].previousElementSibling?.textContent||'')) unitTable = tables[t]; }
      R.unitRows = [];
      if (unitTable) [].slice.call(unitTable.querySelectorAll('tr')).forEach(function(tr){
        var cells=[].slice.call(tr.children).map(function(td){return (td.innerText||'').trim();});
        R.unitRows.push(cells.length===1 ? '## '+cells[0] : cells.join(' | '));
      });
    }
    // --- Guide page
    document.getElementById('tabGuideBtn')?.click();
    await new Promise(function(r){setTimeout(r,700);});
    var g = document.getElementById('guideBody');
    R.guideFound = !!g;
    if (g) {
      var gh = g.innerHTML, gt = g.innerText;
      R.guideHasBox = /Short reference sections/.test(gh);
      R.guideHasBoxHeading = /<h3[^>]*>Guide<\\/h3>/.test(gh);
      R.playTheSeason = (gt.match(/Play the season\\.[^.]*\\.[^.]*\\.[^.]*\\./) || [null])[0];
      R.advancedStatsParenthetical = /advanced stats \\(what caused/.test(gh);
      R.any70to90 = /70→90|70-90 upgrade|wins from a 70/.test(gh);
      R.tierSample = (gt.match(/Franchise-changing[^\\n]*/) || [null])[0];
      R.tierHasPerOvr = /per \\+1 OVR/.test(gt);
      // the values table
      var vt = null;
      [].slice.call(g.querySelectorAll('table')).forEach(function(tb){
        if (/Wins per \\+1 rating/.test(tb.innerText) || /Starting spot/.test(tb.innerHTML)) vt = tb;
      });
      R.valuesHeaders = vt ? [].slice.call(vt.querySelectorAll('thead th')).map(function(th){return th.textContent.trim();}) : null;
      R.valuesFirstRow = vt ? [].slice.call(vt.querySelectorAll('tbody tr:first-child td')).map(function(td){return (td.innerText||'').replace(/\\s+/g,' ').trim().slice(0,26);}) : null;
      R.valuesRowCount = vt ? vt.querySelectorAll('tbody tr').length : null;
    }
    // --- the Draft Simulator keeps the note: does the string still exist in the source?
    R.sourceKeepsNote = (document.documentElement.innerHTML.match(/Ratings shown are effective ratings/g)||[]).length;
    return JSON.stringify(R);
  })()`);
  let d = {};
  try { d = JSON.parse(out || '{}'); } catch (e) { console.log(file, '-> probe parse failed:', String(out).slice(0, 400)); }
  console.log('\n' + file);
  console.log('  Team Comparison subtitle :', JSON.stringify(d.subtitle));
  console.log('  effective-ratings note on the page:', d.cmpHasRatingsNote, '| the string still exists in the page source:', d.sourceKeepsNote);
  console.log('  descriptive verdict shown        :', d.cmpHasVerdict, '| default pair:', JSON.stringify(d.defaultPair));
  console.log('  Unit Comparison rows:');
  for (const r of d.unitRows || []) console.log('     ', r);
  console.log('  Guide box present       :', d.guideHasBox, '| "Guide" h3 present:', d.guideHasBoxHeading);
  console.log('  "Play the season" line  :', JSON.stringify(d.playTheSeason));
  console.log('  advanced stats parenthetical:', d.advancedStatsParenthetical, '| any 70→90 wording left in the guide:', d.any70to90);
  console.log('  tier line sample        :', JSON.stringify(d.tierSample));
  console.log('  tier shows per +1 OVR   :', d.tierHasPerOvr);
  console.log('  values table headers    :', JSON.stringify(d.valuesHeaders));
  console.log('  values table first row  :', JSON.stringify(d.valuesFirstRow), '| rows:', d.valuesRowCount);
  await send('Target.closeTarget', { targetId }, false);
}
ws.close();
