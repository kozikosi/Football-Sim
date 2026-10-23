#!/usr/bin/env node

// board-columns-probe.mjs — what columns does the draft board actually show, and are they populated?
// MiniMax · 21 Oct 2026. Dependency-free plain Node over CDP. Read-only.
//
//   node board-columns-probe.mjs <file.html> [more files...]
//
// It opens the build, starts a draft (the user's pick number is set to the last pick so the board is
// populated with a full pool), and prints the board's header labels, the first row's cell labels and
// their rendered text, and whether the string "Value here" appears anywhere in the board's DOM.

import { pathToFileURL } from "node:url";

const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!files.length) {
  console.error("usage: board-columns-probe.mjs <file.html> [...]");
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
  // start a draft so the board renders
  await ev(
    `(()=>{const s=document.getElementById('draftPickNumberSelect'); if(s){s.value=s.options[s.options.length-1].value;} const b=document.getElementById('startDraftBtn'); if(b) b.click(); return true;})()`,
  );
  await sleep(2500);
  const out = await ev(`JSON.stringify({
    headers: [...document.querySelectorAll('#draftTable2 thead th')].map(th=>th.textContent.trim()),
    rowLabels: [...document.querySelectorAll('#draftBody2 tr:first-child td')].map(td=>td.getAttribute('data-label')||td.className||'td'),
    rowText: [...document.querySelectorAll('#draftBody2 tr:first-child td')].map(td=>(td.innerText||'').replace(/\\s+/g,' ').trim().slice(0,28)),
    valueHereInDom: /Value here/.test(document.getElementById('draftTableWrap')?.innerText||''),
    rows: document.querySelectorAll('#draftBody2 tr').length,
    priorityPopulated: (()=>{const td=[...document.querySelectorAll('#draftBody2 tr:first-child td')].find(t=>(t.getAttribute('data-label')||'')==='Priority'); return td? (td.innerText||'').trim() : null;})(),
    mathIntact: (typeof slotWinsTable==='function' && typeof cpuPick==='function' && typeof modelWeights==='function')
  })`);
  const d = JSON.parse(out || "{}");
  console.log(`\n${file}`);
  console.log("  headers      :", (d.headers || []).join(" | "));
  console.log("  row labels   :", (d.rowLabels || []).join(" | "));
  console.log("  row text     :", (d.rowText || []).join(" | "));
  console.log(
    "  rows rendered:",
    d.rows,
    '| "Value here" visible on the board:',
    d.valueHereInDom,
    "| Priority cell:",
    JSON.stringify(d.priorityPopulated),
    "| maths functions intact:",
    d.mathIntact,
  );
  await send("Target.closeTarget", { targetId }, false);
}
ws.close();
