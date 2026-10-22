#!/usr/bin/env node
// MOC — 22 Oct: prove (a) the per-team CSS rule sets --t1, (b) the custom property
// inherits from the row to the cell, (c) what colour the draft board's row edge
// actually paints today. Read-only: loads a build, injects nothing permanent.
//
//   node _agents/moc/tools/verify-row-edge.mjs "<file.html>" --port 9333
//
// Exit 0 = the cascade works and the fix is CSS-only; 1 = a finding.

import fs from "node:fs";
import { pathToFileURL } from "node:url";

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith("--")) || "NFL Draft Simulator merged.html";
const portIdx = argv.indexOf("--port");
const port = portIdx > -1 ? argv[portIdx + 1] : "9333";

const ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
const ws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) }));
  });

const { result: created } = await send("Target.createTarget", { url: "about:blank" });
const { result: attached } = await send("Target.attachToTarget", { targetId: created.targetId, flatten: true });
const s = attached.sessionId;
await send("Page.enable", {}, s);
await send("Runtime.enable", {}, s);
await send("Page.navigate", { url: pathToFileURL(file).href }, s);
await new Promise((r) => setTimeout(r, 2500));

const expr = `(() => {
  const out = {};
  // (a) does the per-team rule set --t1 on an element with data-team?
  const probe = document.createElement('tr');
  probe.setAttribute('data-team', 'Minnesota Vikings');
  document.body.appendChild(probe);
  const probeCs = getComputedStyle(probe);
  out.ruleSetsT1 = probeCs.getPropertyValue('--t1').trim();
  out.ruleSetsT2 = probeCs.getPropertyValue('--t2').trim();
  // (b) does the property inherit from the row to a cell?
  const cell = document.createElement('td');
  probe.appendChild(cell);
  out.cellSeesT1 = getComputedStyle(cell).getPropertyValue('--t1').trim();
  out.cellResolvesVar = getComputedStyle(cell).getPropertyValue('--t1').trim() || '(empty)';
  probe.remove();
  // (c) what does the board's row edge paint today?
  const rules = [];
  for (const sheet of document.styleSheets) {
    let list; try { list = sheet.cssRules; } catch { continue; }
    for (const r of list) {
      if (r.selectorText && /draftTable2/.test(r.selectorText) && /border|box-shadow/.test(r.cssText)) {
        rules.push(r.selectorText + ' { ' + (r.style.border || '') + (r.style.boxShadow ? ' box-shadow:' + r.style.boxShadow : '') + ' }');
      }
    }
  }
  out.rowEdgeRules = rules;
  out.usesT1 = Array.from(document.styleSheets).some(sheet => {
    let list; try { list = sheet.cssRules; } catch { return false; }
    return Array.from(list).some(r => r.cssText && /var\\(--t1/.test(r.cssText));
  });
  return JSON.stringify(out);
})()`;
const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true }, s);
const raw = res.result?.result?.value ?? res.result?.exceptionDetails?.text ?? "(no value)";
const data = JSON.parse(raw);

console.log("file:", file);
console.log("per-team rule sets --t1 on [data-team]:", JSON.stringify(data.ruleSetsT1), " --t2:", JSON.stringify(data.ruleSetsT2));
console.log("the cell inherits --t1 from the row:", JSON.stringify(data.cellSeesT1));
console.log("any CSS rule in the build consumes var(--t1):", data.usesT1);
console.log("draft-board row edge rules:");
for (const r of data.rowEdgeRules) console.log("   ", r);

const ok = data.ruleSetsT1 && data.ruleSetsT1 !== "" && data.cellSeesT1 && data.cellSeesT1 !== "";
console.log(ok
  ? "VERDICT: the cascade works — the per-team rule sets --t1 and the cell inherits it, so the row edge can be fixed with CSS only, no JS."
  : "VERDICT: the cascade does NOT work as assumed — a JS line would be needed.");
ws.close();
process.exit(ok ? 0 : 1);
