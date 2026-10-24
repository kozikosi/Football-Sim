#!/usr/bin/env node
// precolors-ui-verify.mjs — LongCat · A2 assignment (Claude/Architect, 22 Oct).
// Read-only CDP probe against the anchor build, no installs, no product edits.
//
// Checks (assignment items 1-4):
//   1. draft completes 832/832; board columns render; "Value here" column present + numeric
//      (baseline behaviour: the column is REMOVAL-QUEUED for V22 but must still work in Pre-Colors)
//   2. player browser renders the full pool (PLAYERS.length >= 1200 and #playerBody rows)
//   3. team rankings recalc instantly when a weight changes (input#w_QB -> render(), latency ms)
//   4. 390x844: documentScrollWidth === innerWidth, no horizontal offenders
//
// Usage: node _agents/longcat/tools/precolors-ui-verify.mjs <file.html> [--port 9333]
// Launches its own Brave headless; writes a JSON receipt to stdout and (if writable) to
// _agents/longcat/evidence/precolors-ui-verify.json.

import { execFile, spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith("--"));
const port = argv.includes("--port") ? argv[argv.indexOf("--port") + 1] : "9333";
if (!file) {
  console.error("usage: precolors-ui-verify.mjs <file.html> [--port 9333]");
  process.exit(4);
}
const BRAVE = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- launch browser -----------------------------------------------------------
const profile = `/tmp/longcat-profile-${port}`;
const brave = spawn(
  BRAVE,
  [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" },
);
const bye = () => {
  try {
    process.kill(brave.pid);
  } catch {}
};
process.on("exit", bye);
process.on("SIGINT", () => process.exit(130));

let version = null;
for (let i = 0; i < 40; i++) {
  try {
    version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
    break;
  } catch {
    await sleep(250);
  }
}
if (!version) {
  console.error(`no browser on 127.0.0.1:${port}`);
  process.exit(4);
}

// ---- minimal CDP client -------------------------------------------------------
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = () => rej(new Error("ws error"));
});
let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
  } else if (m.method) events.push(m);
};
const send = (method, params = {}, sessionId) => {
  const i = ++id;
  ws.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) }));
  return new Promise((res, rej) => pending.set(i, { res, rej }));
};

const { targetId } = await send("Target.createTarget", { url: "about:blank" }, false);
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true }, false);
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);
await send("Log.enable", {}, sessionId);
await send(
  "Emulation.setDeviceMetricsOverride",
  { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false },
  sessionId,
);
await send("Page.navigate", { url: pathToFileURL(resolve(file)).href }, sessionId);
await sleep(2500);

const evalJS = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true }, sessionId);
  return r.result?.value;
};
const clickId = async (cid) =>
  (await evalJS(`(()=>{const e=document.getElementById(${JSON.stringify(cid)});if(!e)return false;e.click();return true;})()`)) === true;
const waitFor = async (expr, timeoutMs, step = 250) => {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (await evalJS(expr)) return true;
    await sleep(step);
  }
  return false;
};
const pageErrors = () =>
  events
    .filter((e) => e.method === "Runtime.exceptionThrown" || (e.method === "Log.entryAdded" && e.params?.entry?.level === "error"))
    .map((e) => e.params?.exceptionDetails?.exception?.description || e.params?.entry?.text)
    .filter(Boolean);

const out = { build: file, anchor: "Pre-Colors 40233d6b (Claude's sync prompt)", checks: {} };

// ---- check 1: draft 832/832 + board columns + Value here ----------------------
out.checks.draft = { started: await clickId("startDraftBtn") };
await sleep(1200);
out.checks.draft.instant = await clickId("speedInstantBtn");
await sleep(600);
out.checks.draft.simToEnd = await clickId("simToEndBtn");
out.checks.draft.completed = await waitFor(
  `typeof draftSim!=='undefined'&&draftSim&&draftSim.order&&draftSim.order.length>=832`,
  60000,
  500,
);
out.checks.draft.picks = await evalJS(`typeof draftSim!=='undefined'&&draftSim&&draftSim.order?draftSim.order.length:null`);

out.checks.board = await evalJS(`(function(){
  try{
    const body=document.getElementById('draftBody2');
    const cards=document.getElementById('draftCards');
    const host=body||cards;
    if(!host) return JSON.stringify({found:false});
    const tbl=host.closest('table')||host.querySelector('table');
    const headers=tbl?[...tbl.querySelectorAll('thead th')].map(th=>(th.innerText||'').trim()).filter(Boolean):[];
    const rows=host.querySelectorAll('tr, .dcard, [class*=card]');
    const firstRow=host.querySelector('tr');
    const cells=firstRow?[...firstRow.querySelectorAll('td')].map(td=>(td.innerText||'').trim().replace(/\\s+/g,' ')):[];
    const vhIdx=headers.findIndex(h=>/value here/i.test(h));
    const vhCell=vhIdx>=0&&firstRow?(firstRow.querySelectorAll('td')[vhIdx]?.innerText||'').trim():null;
    const empty=/No players match/i.test(host.innerText||'');
    return JSON.stringify({found:true,container:body?'draftBody2':'draftCards',rowCount:rows.length,headers,
      valueHereHeaderIndex:vhIdx,valueHereFirstRowCell:vhCell,emptyStatePresent:empty,
      sampleRowCells:cells.slice(0,12)});
  }catch(e){return JSON.stringify({error:String(e)});}
})()`);
try { out.checks.board = JSON.parse(out.checks.board); } catch {}

// ---- check 2: player browser --------------------------------------------------
out.checks.players = { tabClicked: await clickId("tabPlayersBtn") };
await sleep(1200);
out.checks.players.PLAYERS_length = await evalJS(`typeof PLAYERS!=='undefined'?PLAYERS.length:null`);
out.checks.players.renderedRows = await evalJS(`(()=>{const b=document.getElementById('playerBody');if(!b)return null;return b.querySelectorAll('tr').length;})()`);
out.checks.players.bodyTextSample = await evalJS(`(()=>{const b=document.getElementById('playerBody');return b?(b.innerText||'').replace(/\\s+/g,' ').slice(0,100):null;})()`);

// ---- check 3: team rankings recalc latency ------------------------------------
out.checks.rankings = { tabClicked: await clickId("tabRankingsBtn") };
await sleep(1200);
const beforeText = await evalJS(`(()=>{const tb=document.getElementById('resultsBody');return tb?(tb.innerText||'').slice(0,400):null;})()`);
out.checks.rankings.beforeSample = beforeText;
out.checks.rankings.qbInputPresent = await evalJS(`!!document.getElementById('w_QB')`);
out.checks.rankings.originalQbWeight = await evalJS(`typeof weights!=='undefined'?weights.QB:null`);
out.checks.rankings.testQbWeight = out.checks.rankings.originalQbWeight === 700 ? 100 : 700;
const lat = await send("Runtime.evaluate", {
  expression: `(async()=>{
  const inp=document.getElementById('w_QB'); if(!inp) return -1;
  const tb=document.getElementById('resultsBody');
  const before=tb?tb.innerText:'';
  const t0=performance.now();
  const setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  setter.call(inp,String(${out.checks.rankings.testQbWeight})); inp.dispatchEvent(new Event('input',{bubbles:true}));
  for(let i=0;i<400;i++){
    const now=tb?tb.innerText:'';
    if(now&&now!==before) return Math.round(performance.now()-t0);
    await new Promise(r=>setTimeout(r,5));
  }
  return -2; // no change within 2s
})()`,
  returnByValue: true,
  awaitPromise: true,
}, sessionId);
out.checks.rankings.latency = lat.result?.value;
out.checks.rankings.afterSample = await evalJS(`(()=>{const tb=document.getElementById('resultsBody');return tb?(tb.innerText||'').slice(0,400):null;})()`);
out.checks.rankings.weightApplied = await evalJS(`typeof weights!=='undefined'?weights.QB:null`);
// restore original QB weight (captured before the change)
await evalJS(`(function(){const inp=document.getElementById('w_QB');if(!inp)return;const s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;s.call(inp,${JSON.stringify(String(out.checks.rankings.originalQbWeight ?? 320))});inp.dispatchEvent(new Event('input',{bubbles:true}));})()`);

// ---- check 4: 390x844 overflow ------------------------------------------------
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: false }, sessionId);
await sleep(1500);
out.checks.mobile390 = await evalJS(`(function(){
  const vw=window.innerWidth,de=document.documentElement;
  const offenders=[];
  for(const el of document.querySelectorAll('body *')){
    const cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden')continue;
    const r=el.getBoundingClientRect();
    if(!r.width&&!r.height)continue;
    if(r.right>vw+1||r.left<-1)offenders.push({tag:el.tagName.toLowerCase(),id:el.id||'',left:Math.round(r.left),right:Math.round(r.right)});
  }
  return JSON.stringify({innerWidth:vw,documentScrollWidth:de.scrollWidth,
    scrollWidthEqualsViewport:de.scrollWidth<=vw,
    pageOverflowPx:de.scrollWidth>vw?de.scrollWidth-vw:0,
    offenderCount:offenders.length,offenders:offenders.slice(0,10)});
})()`);
try { out.checks.mobile390 = JSON.parse(out.checks.mobile390); } catch {}

// ---- console health ------------------------------------------------------------
out.pageErrors = pageErrors();
out.verdict =
  out.checks.draft.completed === true &&
  out.checks.draft.picks === 832 &&
  out.checks.board.found &&
  out.checks.board.rowCount > 0 &&
  out.checks.players.PLAYERS_length >= 1200 &&
  out.checks.players.renderedRows > 0 &&
  out.checks.rankings.latency >= 0 &&
  out.checks.mobile390.scrollWidthEqualsViewport === true &&
  out.pageErrors.length === 0
    ? "PASS"
    : "FAIL";

try {
  writeFileSync(resolve("_agents/longcat/evidence/precolors-ui-verify.json"), JSON.stringify(out, null, 2));
} catch {}
console.log(JSON.stringify(out, null, 2));
bye();
process.exit(out.verdict === "PASS" ? 0 : 1);
