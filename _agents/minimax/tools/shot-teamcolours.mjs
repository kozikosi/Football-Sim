#!/usr/bin/env node

// shot-teamcolours.mjs — screenshot the draft board in a team's colours.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node over CDP. Read-only (writes PNGs only).
//
//   node shot-teamcolours.mjs <file.html> <outDir> ["Team A","Team B",...]
//
// For each team: pick it, start the draft, wait for the user's turn, and capture the draft panel
// (the team-coloured header plus the first rows of the board) as a PNG.

import fs from "node:fs";
import { pathToFileURL } from "node:url";

const [file, outDir, ...teams] = process.argv.slice(2);
if (!file || !outDir) {
  console.error("usage: shot-teamcolours.mjs <file.html> <outDir> [teams...]");
  process.exit(4);
}
const roster = teams.length
  ? teams
  : ["Kansas City Chiefs", "Seattle Seahawks", "Green Bay Packers"];
fs.mkdirSync(outDir, { recursive: true });
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

for (const team of roster) {
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
    { width: 1440, height: 1100, deviceScaleFactor: 2, mobile: false },
    sessionId,
  );
  await send("Page.navigate", { url: pathToFileURL(file).href }, sessionId);
  await sleep(2600);
  const ev = async (expr) =>
    (
      await send(
        "Runtime.evaluate",
        { expression: expr, returnByValue: true, awaitPromise: true },
        sessionId,
      )
    ).result?.value;
  await ev(
    `(()=>{ const t=document.getElementById('draftSlotSelect'); if(t){ t.value=${JSON.stringify(team)}; t.dispatchEvent(new Event('change',{bubbles:true})); } const s=document.getElementById('draftPickNumberSelect'); if(s){ s.value='12'; } document.getElementById('startDraftBtn')?.click(); return true; })()`,
  );
  for (let i = 0; i < 40; i++) {
    await sleep(900);
    const st = await ev(
      `(function(){ try{ return (typeof draftSim!=='undefined'&&draftSim)? String(draftSim.awaitingUser):'no'; }catch(e){ return 'err'; } })()`,
    );
    if (st === "true") break;
  }
  await ev(
    `(()=>{ const el=document.getElementById('draftingAsBanner'); if(el) el.scrollIntoView({block:'center'}); window.scrollBy(0,-40); return true; })()`,
  );
  await sleep(600);
  const vars = await ev(
    `(function(){ const s=getComputedStyle(document.documentElement); return JSON.stringify({t1:s.getPropertyValue('--team1').trim(), t2:s.getPropertyValue('--team2').trim(), t3:s.getPropertyValue('--team3').trim(), team:(typeof draftSim!=='undefined'&&draftSim)?null:null}); })()`,
  );
  const shot = await send(
    "Page.captureScreenshot",
    { format: "png", captureBeyondViewport: false },
    sessionId,
  );
  const name = team.toLowerCase().replace(/[^a-z]+/g, "-");
  const path = `${outDir}/draft-${name}.png`;
  fs.writeFileSync(path, Buffer.from(shot.data, "base64"));
  console.log("saved", path, fs.statSync(path).size, "B", vars);
  await send("Target.closeTarget", { targetId }, false);
}
ws.close();
