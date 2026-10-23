#!/usr/bin/env node
// board-mobile-probe.mjs — 390px layout of the draft board rows: overlap, clipping, horizontal scroll.
// MiniMax · 21 Oct 2026. Dependency-free plain Node over CDP. Read-only.
//
//   node board-mobile-probe.mjs <file.html> [more files...]
//
// It renders the draft board at 390x844, then for the first 25 rows checks that the cells laid out in
// the same visual row do not overlap, that no cell is clipped away, and that the page has no
// horizontal scroll. It also reports the Priority cell's rendered text (the number that must survive).

import { pathToFileURL } from "node:url";

const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!files.length) {
  console.error("usage: board-mobile-probe.mjs <file.html> [...]");
  process.exit(4);
}
const port = 9222;
const version = await (
  await fetch(`http://127.0.0.1:${port}/json/version`)
).json();
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
  }
});
const send = (method, params = {}, sessionId) => {
  const i = ++id;
  ws.send(
    JSON.stringify({
      id: i,
      method,
      params,
      ...(sessionId ? { sessionId } : {}),
    }),
  );
  return new Promise((res, rej) => pending.set(i, { res, rej }));
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const file of files) {
  const { targetId } = await send(
    "Target.createTarget",
    { url: "about:blank" },
    false,
  );
  const { sessionId } = await send(
    "Target.attachToTarget",
    { targetId, flatten: true },
    false,
  );
  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);
  await send(
    "Emulation.setDeviceMetricsOverride",
    { width: 390, height: 844, deviceScaleFactor: 3, mobile: true },
    sessionId,
  );
  await send("Page.navigate", { url: pathToFileURL(file).href }, sessionId);
  await sleep(2500);
  const ev = async (expr) =>
    (
      await send(
        "Runtime.evaluate",
        { expression: expr, returnByValue: true },
        sessionId,
      )
    ).result?.value;
  await ev(
    `(()=>{const s=document.getElementById('draftPickNumberSelect'); if(s){s.value=s.options[s.options.length-1].value;} const b=document.getElementById('startDraftBtn'); if(b) b.click(); return true;})()`,
  );
  await sleep(2500);
  await ev(`document.getElementById('draftTableWrap')?.scrollIntoView(); true`);
  await sleep(400);
  const out = await ev(`JSON.stringify((function(){
    var rows=[].slice.call(document.querySelectorAll('#draftBody2 tr')).slice(0,25);
    var overlaps=0, clipped=0, samples=[];
    rows.forEach(function(tr){
      var cells=[].slice.call(tr.children).map(function(td){var r=td.getBoundingClientRect(); return {t:td, x:r.x, y:r.y, w:r.width, h:r.height, txt:(td.innerText||'').replace(/\\s+/g,' ').trim().slice(0,20), lab:td.getAttribute('data-label')||td.className};});
      for (var i=0;i<cells.length;i++) for (var j=i+1;j<cells.length;j++){
        var a=cells[i], b=cells[j];
        var sameRow = Math.abs(a.y-b.y) < 4;
        if (sameRow && a.w>0 && b.w>0 && a.x < b.x+b.w-0.5 && b.x < a.x+a.w-0.5) overlaps++;
      }
      cells.forEach(function(c){ if(c.w>0 && c.h>0 && c.txt && c.x+c.w > 391) clipped++; });
      if (samples.length<2) samples.push(cells.map(function(c){return (c.lab||'?')+'['+c.txt+']@'+Math.round(c.x)+'/'+Math.round(c.y);}).join('  '));
    });
    var de=document.documentElement;
    return { rowsChecked: rows.length, overlaps: overlaps, clipped: clipped,
      horizontalScroll: de.scrollWidth - window.innerWidth,
      pageScrollW: de.scrollWidth, innerW: window.innerWidth,
      boardW: Math.round((document.getElementById('draftTableWrap')||{getBoundingClientRect:()=>({width:0})}).getBoundingClientRect().width),
      priority: (function(){var t=document.querySelector('#draftBody2 tr:first-child td[data-label="Priority"]'); return t?(t.innerText||'').trim():null;})(),
      headers: [].slice.call(document.querySelectorAll('#draftTable2 thead th')).map(function(th){return th.textContent.trim();}).join('|'),
      samples: samples };
  })())`);
  const d = JSON.parse(out || "{}");
  console.log(`\n${file}`);
  console.log(
    "  viewport 390px | rows checked:",
    d.rowsChecked,
    "| overlapping cells:",
    d.overlaps,
    "| clipped cells:",
    d.clipped,
  );
  console.log(
    "  horizontal overflow:",
    d.horizontalScroll,
    "px (scrollWidth",
    d.pageScrollW,
    "vs innerWidth",
    `${d.innerW})`,
    "| board width:",
    d.boardW,
  );
  console.log("  headers:", d.headers);
  console.log("  Priority cell (row 1):", JSON.stringify(d.priority));
  for (const s of d.samples || []) console.log("  row layout:", s);
  await send("Target.closeTarget", { targetId }, false);
}
ws.close();
