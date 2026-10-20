#!/usr/bin/env node
// MiniMax — post-merge smoke test for the NFL Draft Simulator builds (Round 4).
//
// One command, no installs, no dependencies: drives an already-running Chromium-family
// browser over the DevTools Protocol using Node's built-in WebSocket (Node >= 22).
// It checks the two defects MiniMax found on v20 (reference 31b7d61f…) plus console health:
//
//   A. the 100-season report must RENDER (v20 crashes: ReferenceError: rWeights is not defined,
//      v20:6018 — the donor's render100 is the fix candidate)  → reportRendered === true
//   B. no element may overflow the 390px viewport after a mobile→desktop→mobile sequence
//      (v20's phone pass keeps a stale dataset.msChecked memo, so the stacked layout is lost:
//       7,208 overflowing elements on v20, 0 on the donor)      → offenderCount === 0
//   C. zero uncaught page errors for the whole run              → pageErrors.length === 0
//
// Usage:
//   node _agents/minimax/tools/post-merge-smoke.mjs "NFL Draft Simulator v20 Claude.html" [--port 9222]
//   node _agents/minimax/tools/post-merge-smoke.mjs "<merged file>" --port 9222
//
// Start a browser first, e.g. (macOS Brave):
//   "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" --headless=new \
//     --remote-debugging-port=9222 --user-data-dir=/tmp/minimax-profile about:blank
//
// Exit codes (tests/CONTRACT.md v2 league): 0 = all checks pass, 1 = findings, 4 = usage/parse error.

import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) flags[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  else positional.push(argv[i]);
}
const target = positional[0];
const port = String(flags.port || 9222);
const W = 390, H = 844;
if (!target) {
  console.error('usage: post-merge-smoke.mjs <file-or-url> [--port 9222]');
  process.exit(4);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const PROBE = `(() => {
  const vw = window.innerWidth, de = document.documentElement, offenders = [];
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) continue;
    if (r.right > vw + 1 || r.left < -1) {
      const p = el.parentElement;
      offenders.push({ tag: el.tagName.toLowerCase(), id: el.id || '', left: Math.round(r.left),
        right: Math.round(r.right), width: Math.round(r.width),
        parentOverflowX: p ? getComputedStyle(p).overflowX : '', parentClientWidth: p ? p.clientWidth : 0,
        text: (el.innerText || '').replace(/\\s+/g, ' ').slice(0, 50) });
    }
  }
  return JSON.stringify({ innerWidth: vw, documentScrollWidth: de.scrollWidth,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
    pageOverflowPx: de.scrollWidth > vw ? de.scrollWidth - vw : 0,
    offenderCount: offenders.length, offenders: offenders.slice(0, 15) });
})()`;

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.sessionId = null; this.events = []; }
  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('ws error')); });
    const c = new CDP(ws);
    ws.onmessage = ev => {
      const m = JSON.parse(ev.data);
      if (m.id && c.pending.has(m.id)) {
        const { res, rej } = c.pending.get(m.id); c.pending.delete(m.id);
        m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
      } else if (m.method) c.events.push(m);
    };
    return c;
  }
  send(method, params = {}, useSession = true) {
    const id = ++this.id, payload = { id, method, params };
    if (useSession && this.sessionId) payload.sessionId = this.sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((res, rej) => this.pending.set(id, { res, rej }));
  }
}

(async () => {
  let version;
  try { version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); }
  catch { console.error(`no browser on 127.0.0.1:${port} — start one with --remote-debugging-port=${port}`); process.exit(4); }

  const cdp = await CDP.connect(version.webSocketDebuggerUrl);
  const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(resolve(target)).href;
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' }, false);
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true }, false);
  cdp.sessionId = sessionId;
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Log.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: H, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url });
  await sleep(2500);

  const evalJS = async (expr) => {
    const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true });
    return r.result?.value;
  };
  const clickId = async (id) => {
    const ok = await evalJS(`(()=>{const e=document.getElementById(${JSON.stringify(id)}); if(!e) return false; e.click(); return true;})()`);
    return ok === true;
  };
  const waitFor = async (expr, timeoutMs, step = 250) => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
      if (await evalJS(expr)) return true;
      await sleep(step);
    }
    return false;
  };
  const errors = () => cdp.events
    .filter(e => e.method === 'Runtime.exceptionThrown' || e.method === 'Log.entryAdded')
    .map(e => e.params.exceptionDetails?.exception?.description || e.params.entry?.text)
    .filter(Boolean);

  const steps = { startDraft: null, instant: null, simToEnd: null, reportPath: null, reportRendered: null, reportStalled: null, season: null, playoffs: null };

  const clickFirst = async (ids) => {
    for (const id of ids) if (await clickId(id)) { await sleep(700); return id; }
    return null;
  };

  // --- A: drive a draft to completion, then run the 100-season report ---
  steps.startDraft = await clickId('startDraftBtn');
  await sleep(1200);
  steps.instant = await clickId('speedInstantBtn');
  await sleep(600);
  steps.simToEnd = await clickId('simToEndBtn');
  await sleep(2500);
  const draftPicks = await evalJS(`(typeof draftSim!=='undefined'&&draftSim)?draftSim.pos+'/'+draftSim.order.length:null`);

  // --- D: drive a full season (regular season + playoffs) to completion ---
  // build-agnostic: state assertions decide success, ids are only the handle to click.
  // This runs BEFORE the 100-season report on purpose: render100 replaces its container's
  // innerHTML, which destroys the draft-results buttons (observed on v20: startHandle null).
  const startSeasonBtn = await clickFirst(['ctaPlaySeasonBtn', 'startSeasonBtn']);
  steps.season = { startHandle: startSeasonBtn };
  await sleep(1500);
  // the donor's season stage shows a hero panel first (startSeasonHeroBtn) before the preseason view
  steps.season.heroHandle = await clickFirst(['startSeasonHeroBtn']);
  await sleep(1500);
  steps.season.beginHandle = await clickFirst(['beginSeasonBtn', 'beginSeasonBtn2']);
  await sleep(1500);
  steps.season.simHandle = await clickFirst(['simSeasonBtn']);
  steps.season.regularDone = await waitFor(
    `(typeof seasonState!=='undefined'&&seasonState) ? (seasonState.phase==='regularReview'||seasonState.phase==='playoffs'||seasonState.phase==='complete'||(seasonState.currentWeek||0)>=17) : false`,
    60000, 500);
  steps.season.gamesPlayed = await evalJS(`(typeof seasonState!=='undefined'&&seasonState&&seasonState.schedule)?seasonState.schedule.filter(g=>g.played).length:null`);
  if (await waitFor(`(typeof seasonState!=='undefined'&&seasonState)?(seasonState.phase==='regularReview'||seasonState.phase==='playoffs'||seasonState.phase==='complete'):false`, 10000, 400)) {
    steps.playoffs = { beginHandle: await clickFirst(['beginPlayoffsBtn']) };
    await sleep(1200);
    steps.playoffs.simHandle = await clickFirst(['simRestBtn', 'simPlayoffsBtn', 'simRoundBtn']);
  }
  steps.playoffs = steps.playoffs || {};
  steps.playoffs.complete = await waitFor(
    `(typeof seasonState!=='undefined'&&seasonState)?(seasonState.phase==='complete'||!!seasonState.champion):false`, 90000, 500);
  steps.playoffs.champion = await evalJS(`(typeof seasonState!=='undefined'&&seasonState)?(seasonState.champion||null):null`);

  // --- A: the 100-season report ---
  // Preferred path: the UI button (both parents expose id sim100Btn once their results/season
  // surface is rendered). Fallback: call the same global the button calls — build-independent.
  if (!await waitFor(`!!document.getElementById('sim100Btn')`, 4000)) {
    await clickId('tabSeasonBtn'); await sleep(800);
    if (!await waitFor(`!!document.getElementById('sim100Btn')`, 3000)) {
      await clickId('tabDraftBtn'); await sleep(800);
    }
  }
  if (await waitFor(`!!document.getElementById('sim100Btn')`, 2000)) {
    steps.reportPath = 'ui-button';
    await clickId('sim100Btn');
  } else {
    const started = await evalJS(`(()=>{
      if(typeof runLeague100!=='function') return 'missing';
      const c=document.getElementById('draftFinalResults')||document.getElementById('seasonHost')||document.body;
      try{ runLeague100(100,c); return 'called'; }catch(e){ return 'threw:'+e.message; }
    })()`);
    if (started === 'missing') { steps.reportPath = 'unavailable'; }
    else { steps.reportPath = 'direct-call:' + started; }
  }
  if (steps.reportPath && steps.reportPath !== 'unavailable') {
    steps.reportRendered = await waitFor(`/100-Season Report/.test(document.body.innerText)`, 120000, 500);
    // "Season N of N…" with no report after the wait means the render threw (the v20 failure mode)
    steps.reportStalled = !steps.reportRendered && await waitFor(`/Simulating 100 seasons/.test(document.body.innerText)`, 2000, 250);
  }

  // --- B: mobile layout, including the resize path that v20 fails ---
  for (const w of [390, 1280, 390]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: H, deviceScaleFactor: 1, mobile: false });
    await sleep(900);
  }
  await clickId('tabPlayersBtn');
  await sleep(1200);
  const probe = JSON.parse((await evalJS(PROBE)) || '{}');

  const report = {
    build: url.split('/').pop(),
    checks: {
      A_reportRendered: steps.reportRendered === true,
      D_seasonAndPlayoffsComplete: steps.playoffs.complete === true && !!steps.playoffs.champion,
      B_noViewportOverflow: probe.offenderCount === 0,
      C_noPageErrors: errors().length === 0
    },
    detail: { steps, draftPicks, reportPath: steps.reportPath, reportRendered: steps.reportRendered, reportStalled: steps.reportStalled,
      pageErrors: errors(), offenderCount: probe.offenderCount, offenders: probe.offenders,
      pageOverflowPx: probe.pageOverflowPx, documentScrollWidth: probe.documentScrollWidth, bodyOverflowX: probe.bodyOverflowX }
  };
  console.log(JSON.stringify(report, null, 2));
  await cdp.send('Target.closeTarget', { targetId }, false);
  cdp.ws.close();
  const failed = Object.values(report.checks).some(v => v !== true);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(String(e)); process.exit(4); });
