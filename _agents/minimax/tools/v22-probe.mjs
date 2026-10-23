#!/usr/bin/env node
// v22-probe.mjs — one pass over everything the Owner's three briefs changed.
//
// MiniMax · 21 Oct 2026. Dependency-free plain Node over CDP. Read-only.
//
//   node v22-probe.mjs <file.html> [more files...]
//
// Checks: the draft board's columns; the footer label; the weights panel's two buttons and their
// state machine; the Team Comparison subtitle, note, verdict, default pair and Unit Comparison
// order; the guide's box, section list, flex table order, "offensive tackle" wording, the
// computer-picks sentence, the tier list, the values table and the glossary; and the count of
// surviving "value here" and bare "tackle" mentions.

import { pathToFileURL } from "node:url";

const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!files.length) {
  console.error("usage: v22-probe.mjs <file.html> [...]");
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
  await sleep(2800);
  const ev = async (expr) =>
    (
      await send(
        "Runtime.evaluate",
        { expression: expr, returnByValue: true, awaitPromise: true },
        sessionId,
      )
    ).result?.value;
  const out = await ev(`(async function(){
    function txt(el){ return el ? (el.innerText||el.textContent||'').replace(/\\s+/g,' ').trim() : null; }
    var R = {};
    R.valueHereInSource = (document.documentElement.innerHTML.match(/value here/gi)||[]).length;
    R.bareTackle = (document.documentElement.innerHTML.match(/(?<!offensive )(?<!defensive )(?<!interior )\btackle\b/gi)||[]).length;
    R.bareTackleSamples = (document.documentElement.innerHTML.match(/.{0,60}(?<!offensive )(?<!defensive )(?<!interior )\btackle\b.{0,40}/gi)||[]).slice(0,6);
    R.footText = txt(document.querySelector('nav.footnav'));
    R.compareSubtitle = (typeof SUPP_TITLES!=='undefined') ? SUPP_TITLES.tabCompareBtn[1] : null;
    // Team Comparison
    document.getElementById('tabCompareBtn')?.click();
    await new Promise(function(r){setTimeout(r,600);});
    var cmp=document.getElementById('homeCmpResult');
    R.cmpNote = cmp ? /Ratings shown are effective ratings/.test(cmp.innerHTML) : null;
    R.cmpVerdict = cmp ? /On your current weights/.test(cmp.innerHTML) : null;
    R.cmpPair = [document.getElementById('homeCmpA')?.value, document.getElementById('homeCmpB')?.value];
    R.unitRows = cmp ? [].slice.call(cmp.querySelectorAll('table tr')).map(function(tr){ var c=[].slice.call(tr.children).map(function(td){return (td.innerText||'').trim();}); return c.length===1? '## '+c[0] : c[1]; }) : [];
    // Weights panel
    document.getElementById('tabRankingsBtn')?.click();
    await new Promise(function(r){setTimeout(r,600);});
    var m=document.getElementById('modelWBtn'), p=document.getElementById('personalWBtn');
    R.modelBtn = txt(m); R.saveBtn = txt(p); R.saveDisabled = p?p.disabled:null;
    R.panelLast = (function(){ var c=document.getElementById('controls'); if(!c) return null; var k=c.children[c.children.length-1]; return k?k.className:null; })();
    // Guide
    document.getElementById('tabGuideBtn')?.click();
    await new Promise(function(r){setTimeout(r,700);});
    var g=document.getElementById('guideBody');
    R.guideFound=!!g;
    if(g){
      var gh=g.innerHTML, gt=g.textContent;
      R.guideBox = /Short reference sections/.test(gh);
      R.sections = [].slice.call(g.querySelectorAll('details > summary')).map(function(s){return s.textContent.trim();});
      R.flexOrder = (function(){
        var t=[].slice.call(g.querySelectorAll('table')).filter(function(tb){var h=tb.querySelector('thead'); return h && /Free/.test(h.textContent) && /−6|-6/.test(h.textContent);})[0];
        if(!t) return null;
        return [].slice.call(t.querySelectorAll('tbody tr')).map(function(tr){return (tr.children[0].textContent||'').trim();});
      })();
      R.picksHas76 = /never below a 76 rating/.test(gt);
      R.picksSentence = (gt.match(/How the computer teams pick[\\s\\S]{0,260}/)||[null])[0];
      R.tier = (gt.match(/Franchise-changing[^\\n]*/)||[null])[0];
      R.valuesHeaders = (function(){
        var t=[].slice.call(g.querySelectorAll('table')).filter(function(tb){return /Starting spot/.test(tb.textContent);})[0];
        return t? [].slice.call(t.querySelectorAll('thead th')).map(function(th){return th.textContent.trim();}) : null;
      })();
      R.glossaryTerms = [].slice.call(g.querySelectorAll('ul.gl li b')).map(function(b){return b.textContent.trim();});
      R.seventyToNinety = /70→90|70-90 upgrade/.test(gh);
      R.tackleRows = (gh.match(/offensive tackle/gi)||[]).length;
    }
    return JSON.stringify(R);
  })()`);
  let d = {};
  try {
    d = JSON.parse(out || "{}");
  } catch (_e) {
    console.log(file, "-> probe parse failed:", String(out).slice(0, 300));
  }
  console.log(`\n${file}`);
  console.log(
    '  "value here" left in the page :',
    d.valueHereInSource,
    '| bare "tackle" left:',
    d.bareTackle,
    JSON.stringify(d.bareTackleSamples || []).slice(0, 300),
  );
  console.log("  footer                        :", JSON.stringify(d.footText));
  console.log(
    "  compare subtitle / note / verdict:",
    JSON.stringify(d.compareSubtitle),
    "/",
    d.cmpNote,
    "/",
    d.cmpVerdict,
    "| pair:",
    JSON.stringify(d.cmpPair),
  );
  console.log(
    "  unit rows                     :",
    (d.unitRows || []).join(" · "),
  );
  console.log(
    "  weights buttons               :",
    JSON.stringify(d.modelBtn),
    JSON.stringify(d.saveBtn),
    "| save disabled:",
    d.saveDisabled,
    "| panel ends with:",
    d.panelLast,
  );
  console.log("  guide box present             :", d.guideBox);
  console.log(
    "  guide sections                :",
    (d.sections || []).join(" | "),
  );
  console.log(
    "  flex table order              :",
    (d.flexOrder || []).join(" · "),
  );
  console.log(
    "  picks sentence                :",
    JSON.stringify(d.picksSentence),
    '| still says "never below a 76":',
    d.picksHas76,
  );
  console.log("  tier line                     :", JSON.stringify(d.tier));
  console.log(
    "  values table headers          :",
    JSON.stringify(d.valuesHeaders),
    "| 70→90 left:",
    d.seventyToNinety,
  );
  console.log(
    "  glossary terms                :",
    (d.glossaryTerms || []).join(" · "),
  );
  await send("Target.closeTarget", { targetId }, false);
}
ws.close();
