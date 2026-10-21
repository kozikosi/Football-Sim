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

import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, basename } from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

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

// ---- run identity helpers (GPT's OPENCHAMBER-E2E evidence schema asks for these) ----------------
function gitOut(args) {
  try { return execFileSync('git', args, { cwd: resolve(process.cwd()), encoding: 'utf8', stdio: ['ignore','pipe','ignore'] }).trim(); }
  catch { return 'unavailable'; }
}
function gitRef() {
  const d = gitOut(['rev-parse', '--abbrev-ref', 'HEAD']);
  const h = gitOut(['rev-parse', 'HEAD']);
  if (d === 'unavailable' || h === 'unavailable') return 'unavailable';
  return d + ' @ ' + h.slice(0, 12);
}
function gitCommit() { const h = gitOut(['rev-parse', 'HEAD']); return h === 'unavailable' ? 'unavailable' : h; }

const PROBE = `(() => {
  const vw = window.innerWidth, de = document.documentElement, offenders = [];
  const clipped = [], covered = [], scrollers = [];
  const vis = el => { const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && el.getBoundingClientRect().width > 0; };
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
    // 390.7 — shifted/clipped by a clipping ancestor (overflow hidden|clip|auto|scroll)
    let a = el.parentElement, depth = 0;
    while (a && depth++ < 4) {
      const acs = getComputedStyle(a);
      if (acs.overflowX !== 'visible') {
        const ar = a.getBoundingClientRect();
        if (r.right > ar.right + 1 || r.left < ar.left - 1) {
          clipped.push({ tag: el.tagName.toLowerCase(), id: el.id || '',
            ancestor: a.id || a.tagName.toLowerCase(), ancestorOverflowX: acs.overflowX,
            elLeft: Math.round(r.left), elRight: Math.round(r.right),
            ancLeft: Math.round(ar.left), ancRight: Math.round(ar.right) });
        }
        break;
      }
      a = a.parentElement;
    }
  }
  // 390.4 — key controls not COVERED by an overlay (elementFromPoint at the control centre)
  const controls = [...document.querySelectorAll('button, input, select, a.btn, .resetbtn, .tabbtn')].filter(vis);
  for (const el of controls.slice(0, 120)) {
    const r = el.getBoundingClientRect();
    const cx = Math.round(r.left + r.width / 2), cy = Math.round(r.top + r.height / 2);
    if (cx < 0 || cy < 0 || cx > vw || cy > window.innerHeight) continue;   // off-screen is not "covered"
    const top = document.elementFromPoint(cx, cy);
    if (top && top !== el && !el.contains(top) && !top.contains(el)) {
      covered.push({ id: el.id || '', tag: el.tagName.toLowerCase(), text: (el.innerText || '').replace(/\\s+/g, ' ').slice(0, 40),
        coveredBy: top.id || top.tagName.toLowerCase() });
    }
  }
  // 390.6 — INTENTIONAL scrollers (overflow-x: auto|scroll) can actually scroll horizontally.
  // An element with overflow-x:hidden and wider content is NOT a scroller - it is clipped content
  // (reported separately, as information) - so it must not be counted as an unscrollable scroller.
  const hiddenClipped = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el)) continue;
    if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
      const cs = getComputedStyle(el);
      const ox = cs.overflowX;
      if (ox === 'auto' || ox === 'scroll') {
        const before = el.scrollLeft; el.scrollLeft = 40;
        const moved = el.scrollLeft > before; el.scrollLeft = before;
        scrollers.push({ tag: el.tagName.toLowerCase(), id: el.id || '', overflowX: ox, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, scrollable: moved });
      } else if (ox === 'hidden' || ox === 'clip') {
        hiddenClipped.push({ tag: el.tagName.toLowerCase(), id: el.id || '', overflowX: ox, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth });
      }
    }
  }
  // 390.3 — heading / phase indicator / primary action visible and within the viewport
  const heading = document.querySelector('h1, h2, h3, .panel h2, .panel h3, #draftStatusText, #seasonStatus');
  const primary = [...document.querySelectorAll('.panel button, .resetbtn, #startSeasonBtn, #beginSeasonBtn, #simSeasonBtn, #startDraftBtn')].find(vis) || null;
  const inVp = r => r ? (r.left >= -1 && r.right <= vw + 1 && r.width > 0) : false;
  return JSON.stringify({ innerWidth: vw, documentScrollWidth: de.scrollWidth,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
    pageOverflowPx: de.scrollWidth > vw ? de.scrollWidth - vw : 0,
    offenderCount: offenders.length, offenders: offenders.slice(0, 15),
    clippedCount: clipped.length, clipped: clipped.slice(0, 10),
    coveredCount: covered.length, covered: covered.slice(0, 10),
    scrollerCount: scrollers.length, unscrollable: scrollers.filter(s => !s.scrollable).slice(0, 10),
    scrollers: scrollers.slice(0, 10),
    hiddenClippedCount: hiddenClipped.length, hiddenClipped: hiddenClipped.slice(0, 10),
    headingVisible: heading ? { text: (heading.innerText || '').replace(/\\s+/g, ' ').slice(0, 60), inViewport: inVp(heading.getBoundingClientRect()) } : null,
    primaryAction: primary ? { id: primary.id || '', text: (primary.innerText || '').replace(/\\s+/g, ' ').slice(0, 40), inViewport: inVp(primary.getBoundingClientRect()) } : null
  });
})()`;


const PRIMARY_PROBE = `(() => {
  // The primary action of the CURRENT view: an explicit id if one is given, else the first
  // prominent control in the main panel. We record where it is and whether a user could see
  // it WITHOUT scrolling the view they just landed on (scroll position untouched).
  const ids = ['beginSeasonBtn','startSeasonBtn','ctaPlaySeasonBtn','simSeasonBtn','simToEndBtn','startDraftBtn','simPlayoffsBtn','beginPlayoffsBtn'];
  const rendered = e => { if (!e) return false; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden'; };
  let el = null, how = '', presentButUnrendered = null;
  for (const id of ids) {
    const e = document.getElementById(id);
    if (!e) continue;
    if (rendered(e)) { el = e; how = id; break; }
    if (!presentButUnrendered) presentButUnrendered = id;      // exists in the DOM but has no box
  }
  if (!el) {
    const cands = [...document.querySelectorAll('.panel .resetbtn, .panel button, .resetbtn')].filter(rendered);
    el = cands[0] || null; how = el ? (el.id || el.className || 'first .resetbtn') : '';
  }
  if (!el) {
    // A control that exists in the DOM but renders with no box is NOT a usable primary action.
    return JSON.stringify({ found: false, unrenderedCandidate: presentButUnrendered,
      note: presentButUnrendered ? 'the primary action exists in the DOM but is not rendered (zero box) at this moment' : 'no primary action found in this view' });
  }
  const r = el.getBoundingClientRect();
  const absTop = r.top + window.scrollY;
  const vh = window.innerHeight;
  return JSON.stringify({
    found: true, id: how, text: (el.innerText || '').replace(/\\s+/g, ' ').slice(0, 60),
    rectTop: Math.round(r.top), rectBottom: Math.round(r.bottom), absTop: Math.round(absTop),
    docHeight: document.documentElement.scrollHeight, viewportHeight: vh,
    visibleWithoutScrolling: absTop >= 0 && absTop < vh && r.bottom > 0,
    pageScrollY: window.scrollY
  });
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

  const browserVersion = version.Browser || version['User-Agent'] || 'unavailable';
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
  // Click the first id in the list that exists in the page; return the id clicked, or null.
  const clickFirst = async (ids) => {
    for (const id of ids) { if (await clickId(id)) return id; }
    return null;
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

  const steps = { startDraft: null, instant: null, simToEnd: null, reportPath: null, reportRendered: null, reportStalled: null, season: null, playoffs: null, primaryAction: {} };

  // --- A: drive a draft to completion, then run the 100-season report ---
  steps.startDraft = await clickId('startDraftBtn');
  await sleep(1200);
  steps.instant = await clickId('speedInstantBtn');
  await sleep(600);
  steps.simToEnd = await clickId('simToEndBtn');
  await sleep(2500);
  const draftPicks = await evalJS(`(typeof draftSim!=='undefined'&&draftSim)?draftSim.pos+'/'+draftSim.order.length:null`);
  // H: the draft board must actually RENDER its players. The pick count was recorded but never
  // checked, so a build whose board always says "No players match." passed every gate
  // (adversarial finding F-3). We assert rows exist and the empty-state text is absent.
  const draftBoard = await evalJS(`(function(){
    try{
      // Scope to the draft board itself: #draftBody2 is the table body the board renders into
      // (v20/candidate line 1768) and #draftCards is its card layout. A generic 'table tbody tr'
      // would match the standings and defeat the assertion.
      const body = document.getElementById('draftBody2');
      const cards = document.getElementById('draftCards');
      const host = body || cards;
      if (!host) return JSON.stringify({ rowCount: 0, emptyStatePresent: true, note: 'no draft board container found' });
      const rows = host.querySelectorAll('tr, .dcard, .draftcard, [class*=card]');
      const text = (host.innerText||'');
      const empty = /No players match/i.test(text);
      return JSON.stringify({ rowCount: rows.length, emptyStatePresent: empty, container: body ? 'draftBody2' : 'draftCards', sample: text.replace(/\\s+/g,' ').slice(0,80) });
    }catch(e){ return JSON.stringify({ error: String(e) }); }
  })()`);
  let draftBoardInfo; try { draftBoardInfo = JSON.parse(draftBoard); } catch(e) { draftBoardInfo = null; }
  steps.draftBoard = draftBoardInfo;
  steps.draftBoardRenders = !!(draftBoardInfo && draftBoardInfo.rowCount > 0 && draftBoardInfo.emptyStatePresent === false);

  // --- D: drive a full season (regular season + playoffs) to completion ---
  // build-agnostic: state assertions decide success, ids are only the handle to click.
  // This runs BEFORE the 100-season report on purpose: render100 replaces its container's
  // innerHTML, destroying the draft-results buttons (observed on v20: startHandle null).
  //
  // Season entry is ENUMERATED, not assumed. Known entry paths (measured 20 Oct):
  //   donor-cta          ctaPlaySeasonBtn  -> the donor's Season tab (#seasonHost) -> hero
  //   results-season-tab resultsSeasonBtn  -> v20's inline season panel inside the results
  //   donor-season-tab   tabSeasonBtn       -> the donor's Season tab directly
  //   v20-inline         (none)             -> the results panel already shows the season
  // The "start" step differs too: the donor shows a hero (startSeasonHeroBtn), v20 renders
  // startSeasonBtn inline; both then reach beginSeasonBtn / simSeasonBtn.
  steps.season = { entryPath: null, startHandle: null, heroHandle: null, beginHandle: null, simHandle: null };
  // The Owner's #7 class: is the view's primary action reachable without scrolling?
  steps.primaryAction.resultsView = JSON.parse((await evalJS(PRIMARY_PROBE)) || '{}');
  const ENTRY_PATHS = [
    { id: 'donor-cta', steps: ['ctaPlaySeasonBtn'] },
    { id: 'results-season-tab', steps: ['resultsSeasonBtn'] },
    { id: 'donor-season-tab', steps: ['tabSeasonBtn'] },
    { id: 'v20-inline', steps: [] },
  ];
  for (const pth of ENTRY_PATHS) {
    let clicked = null;
    for (const sid of pth.steps) { if (await clickId(sid)) { clicked = sid; steps.season.entryHandle = sid; await sleep(800); } }
    if (await waitFor(`!!document.getElementById('startSeasonBtn')||!!document.getElementById('startSeasonHeroBtn')`, 2500, 250)) {
      steps.season.entryPath = clicked ? pth.id : 'already-rendered';
      break;
    }
  }
  steps.season.startHandle = await clickFirst(['startSeasonHeroBtn', 'startSeasonBtn']);
  await sleep(1500);
  steps.season.heroHandle = await clickFirst(['startSeasonHeroBtn']);
  await sleep(1200);
  // Probe the PRESEASON view BEFORE clicking "Begin Season": that is the view DS measured
  // (the Begin Season button at the foot of a 7,483px page). Probing after the click would
  // sample a different surface and could never fail - the class of check that looks green
  // because it never looks.
  steps.primaryAction.preseasonView = JSON.parse((await evalJS(PRIMARY_PROBE)) || '{}');
  steps.season.beginHandle = await clickFirst(['beginSeasonBtn', 'beginSeason2Btn']);
  await sleep(1500);
  steps.primaryAction.seasonView = JSON.parse((await evalJS(PRIMARY_PROBE)) || '{}');
  // 3.4 - the "Week 1 of 17" state, observed VISIBLY, before the week is simulated.
  // The build renders it as <h3>Week ${week} of 17</h3> while !seasonState.weekSimulated
  // (merged candidate line 3891). The E2E record's week-1-display step is SKIPped with the reason
  // "the build lacks a persistent week indicator"; the run trace's frame snapshot at 18768 ms shows
  // <h3>Week 1 of 17</h3> and BUTTON#simWeekBtn, so the heading IS there to observe.
  steps.season.week1 = await evalJS(`(function(){
    try{
      const out = { heading: null, week: null, of: null, visible: false, simWeekBtnVisible: false, innerTextMatch: null };
      const h3s = [...document.querySelectorAll('h1,h2,h3,h4,h5')];
      for (const h of h3s) {
        const t = (h.innerText||'').trim();
        const m = t.match(/^Week\\s+(\\d+)\\s+of\\s+(\\d+)$/);
        if (!m) continue;
        const r = h.getBoundingClientRect();
        out.heading = t; out.week = +m[1]; out.of = +m[2];
        out.visible = r.width > 0 && r.height > 0 && getComputedStyle(h).visibility !== 'hidden';
        break;
      }
      const b = document.getElementById('simWeekBtn');
      if (b) { const r = b.getBoundingClientRect(); out.simWeekBtnVisible = r.width > 0 && r.height > 0; }
      const im = (document.body.innerText||'').match(/Week\\s+(\\d+)\\s+of\\s+(\\d+)/);
      out.innerTextMatch = im ? im[0] : null;
      return JSON.stringify(out);
    }catch(e){ return JSON.stringify({ error: String(e) }); }
  })()`);
  try { steps.season.week1 = JSON.parse(steps.season.week1); } catch(e) { steps.season.week1 = null; }
  steps.season.week1Of17Seen = !!(steps.season.week1 && steps.season.week1.visible && steps.season.week1.week === 1 && steps.season.week1.of === 17);
  steps.season.simHandle = await clickFirst(['simSeasonBtn']);
  await sleep(2500);
  steps.season.regularDone = await waitFor(`!!document.getElementById('beginPlayoffsBtn')||!!document.getElementById('simPlayoffsBtn')||!!document.getElementById('simRestBtn')`, 120000, 500);
  steps.season.gamesPlayed = await evalJS(`(function(){ try{ return (typeof seasonState!=='undefined'&&seasonState&&seasonState.schedule)?seasonState.schedule.length:null; }catch(e){ return null; } })()`);
  // The VISIBLE game count, read from the rendered standings (what a user can see), so that a
  // "272 games" claim has a source a reviewer can check - the record's own metric may be null.
  steps.season.gamesPlayedVisible = await evalJS(`(function(){
    try{
      const rows=[...document.querySelectorAll('.divtable tbody tr')];
      let sum=0, parsed=0;
      for(const tr of rows){
        const cells=tr.querySelectorAll('td'); if(cells.length<2) continue;
        const m=(cells[1].innerText||'').trim().match(/^(\\d+)-(\\d+)(?:-(\\d+))?$/);
        if(!m) continue; parsed++; sum += (+m[1])+(+m[2])+(m[3]?+m[3]:0);
      }
      const teamRows=rows.length;
      const leagueGames = parsed ? sum/2 : null;
      return JSON.stringify({ standingsTeamRows: teamRows, parsedRows: parsed, gamesPerTeamSum: sum, leagueGamesVisible: leagueGames });
    }catch(e){ return JSON.stringify({ error: String(e) }); }
  })()`);
  try { steps.season.gamesVisible = JSON.parse(steps.season.gamesPlayedVisible); }
  catch(e) { steps.season.gamesVisible = null; }
  steps.season.gamesPlayedVisible = steps.season.gamesVisible ? steps.season.gamesVisible.leagueGamesVisible : null;
  // 3.4 / 3.6 — record what the USER SEES, not only the internal state
  steps.season.weekText = await evalJS(`(function(){ try{ const t=document.body.innerText||''; const m=t.match(/Week\\s+\\d+\\s+of\\s+\\d+/); return m?m[0]:null; }catch(e){ return null; } })()`);
  steps.season.weekTextShown = !!steps.season.weekText;
  steps.playoffs = { beginHandle: null, simHandle: null, complete: false, champion: null };
  steps.playoffs.beginHandle = await clickId('beginPlayoffsBtn');
  await sleep(1200);
  steps.playoffs.simHandle = await clickFirst(['simPlayoffsBtn', 'simRestBtn']);
  await sleep(2500);
  steps.playoffs.complete = await waitFor(`(typeof seasonState!=='undefined'&&seasonState&&seasonState.champion)?true:false`, 60000, 500);
  steps.playoffs.champion = await evalJS(`(function(){ try{ return (typeof seasonState!=='undefined'&&seasonState&&seasonState.champion)?seasonState.champion:null; }catch(e){ return null; } })()`);

  // Preferred path: the UI button (both parents expose id sim100Btn once their results/season
  // surface is rendered). Fallback: call the same global the button calls — build-independent.
  if (!await waitFor(`!!document.getElementById('sim100Btn')`, 6000)) {
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

  // 5.4 — the report can return to the season view via its back control
  steps.reportBack = await (async () => {
    const before = await evalJS(`(typeof seasonState!=='undefined'&&seasonState)?String(seasonState.phase):'unknown'`);
    const clicked = await clickId('back100Btn');
    if (!clicked) return { clicked: false, phaseBefore: before, phaseAfter: null };
    await sleep(1200);
    const after = await evalJS(`(typeof seasonState!=='undefined'&&seasonState)?String(seasonState.phase):'unknown'`);
    return { clicked: true, phaseBefore: before, phaseAfter: after };
  })();

  // --- B: mobile layout, including the resize path that v20 fails ---
  for (const w of [390, 1280, 390]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: H, deviceScaleFactor: 1, mobile: false });
    await sleep(900);
  }
  // Scan EVERY tab at 390 px. An earlier version probed only the Players tab, which let a
  // CSS-only mobile regression on another view (Team Rankings) pass both gates — demonstrated
  // adversarially (see _agents/minimax/recon/adversarial-check.md, F-1).
  const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];
  const perTab = [];
  let probe = {};
  for (const tab of TABS) {
    const clicked = await clickId(tab);
    await sleep(900);
    const p = JSON.parse((await evalJS(PROBE)) || '{}');
    perTab.push({ tab, clicked, offenderCount: p.offenderCount || 0, clippedCount: p.clippedCount || 0,
                   coveredCount: p.coveredCount || 0, unscrollable: (p.unscrollable || []).length,
                   hiddenClipped: p.hiddenClippedCount || 0,
                   pageOverflowPx: p.pageOverflowPx || 0, offenders: (p.offenders || []).slice(0, 3) });
    if (!probe.offenderCount && p.offenderCount) probe = p;   // keep the worst offender sample
  }
  const totalOffenders = perTab.reduce((a, t) => a + t.offenderCount, 0);
  const totalClipped = perTab.reduce((a, t) => a + t.clippedCount, 0);
  const totalCovered = perTab.reduce((a, t) => a + t.coveredCount, 0);
  const totalUnscrollable = perTab.reduce((a, t) => a + t.unscrollable, 0);
  const totalHiddenClipped = perTab.reduce((a, t) => a + (t.hiddenClipped || 0), 0);
  const worstTab = perTab.slice().sort((a, b) => b.offenderCount - a.offenderCount)[0];
  probe = Object.assign({}, probe, {
    offenderCount: totalOffenders, clippedCount: totalClipped, coveredCount: totalCovered,
    unscrollable: [], tabsScanned: perTab.length, perTab,
    hiddenClippedCount: totalHiddenClipped,
    worstTab: worstTab ? worstTab.tab : null,
    offenders: (worstTab && worstTab.offenders) || probe.offenders || []
  });
  if (totalUnscrollable) probe.unscrollable = [{ note: 'unscrollable elements detected on one or more tabs' }];

  const uxFindings = [];
  for (const [view, pa] of Object.entries(steps.primaryAction || {})) {
    if (!pa) continue;
    if (pa.found && pa.visibleWithoutScrolling === false) {
      uxFindings.push(`${view}: the primary action "${pa.text || pa.id}" sits at ${pa.absTop}px in a ${pa.viewportHeight}px viewport (document ${pa.docHeight}px) - a user must scroll to reach it (Owner's #7)`);
    } else if (!pa.found) {
      uxFindings.push(`${view}: no rendered primary action${pa.unrenderedCandidate ? ' - "' + pa.unrenderedCandidate + '" exists in the DOM but renders with no box' : ''} - the view's main action is not reachable (Owner's #7)`);
    }
  }
  const uxFailed = uxFindings.length > 0;
  const reportChecks = {
    A_reportRendered: steps.reportRendered === true,
    D_seasonAndPlayoffsComplete: steps.playoffs.complete === true && !!steps.playoffs.champion,
    B_noViewportOverflow: probe.offenderCount === 0,
    C_noPageErrors: errors().length === 0,
    E_viewportUsable: probe.clippedCount === 0 && probe.coveredCount === 0 && (probe.unscrollable || []).length === 0,
    F_visibleGameCount: steps.season.gamesPlayedVisible != null && steps.season.gamesPlayedVisible === steps.season.gamesPlayed,
    G_week1Visible: steps.season.week1Of17Seen === true,
    H_draftBoardRenders: steps.draftBoardRenders === true,
    I_primaryActionVisible: uxFindings.length === 0
  };
  let sha256 = 'unavailable', bytes = 0;
  try { sha256 = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex'); bytes = fs.statSync(target).size; }
  catch { /* target may be a URL */ }
  const all = Object.values(reportChecks).every(v => v === true);
  const anyFalse = Object.values(reportChecks).some(v => v !== true);
  const report = {
    // --- run identity (GPT's OPENCHAMBER-E2E evidence schema, fields the protocol asks for) ---
    run: {
      utc: new Date().toISOString(),
      tool: 'post-merge-smoke.mjs',
      tool_version: '5 (2026-10-21) — multi-tab 390px scan, draft-board assertion, week-1 + visible-game-count observations, receipt_id, tool_sha256',
      tool_sha256: crypto.createHash('sha256').update(fs.readFileSync(fileURLToPath(import.meta.url))).digest('hex'),
      artifact_path: target,
      artifact_sha256: sha256,
      artifact_bytes: bytes,
      artifact_basename: basename(target),
      git_ref: gitRef(),
      git_commit: gitCommit(),
      browser: 'Chromium-family over CDP (--remote-debugging-port=' + port + ')',
      browser_version: browserVersion,
      viewport: { desktop: '1280x900', mobile: '390x844' },
      seed: 'none — the build has no seeded RNG (58 Math.random sites), so this run is not reproducible by seed',
      evidence_name: 'e2e-' + sha256.slice(0, 12) + '-' + new Date().toISOString().slice(0, 10) + '.json'
    },
    verdict: all ? 'PASS' : (anyFalse ? 'FAIL' : 'PARTIAL'),
    ux_verdict: uxFailed ? 'FINDINGS' : 'CLEAN',
    ux_findings: uxFindings,
    ux_note: 'the I_primaryActionVisible check is reported separately from the safety verdict: a usability finding must not block a merge the way a crash does, and a PASS is not product acceptance.',
    skipped_checks: Object.entries(steps).filter(([k, v]) => v === 'unavailable' || v === 'skipped').map(([k]) => k),
    build: url.split('/').pop(),
    checks: reportChecks,
    detail: { steps, draftPicks, reportPath: steps.reportPath, reportRendered: steps.reportRendered, reportStalled: steps.reportStalled,
      pageErrors: errors(), offenderCount: probe.offenderCount, offenders: probe.offenders,
      pageOverflowPx: probe.pageOverflowPx, documentScrollWidth: probe.documentScrollWidth, bodyOverflowX: probe.bodyOverflowX,
      clippedCount: probe.clippedCount, clipped: probe.clipped, coveredCount: probe.coveredCount, covered: probe.covered,
      scrollerCount: probe.scrollerCount, unscrollable: probe.unscrollable,
      headingVisible: probe.headingVisible, primaryAction: probe.primaryAction,
      gamesPlayedInternal: steps.season.gamesPlayed, gamesPlayedVisible: steps.season.gamesPlayedVisible,
      standingsTeamRows: steps.season.gamesVisible ? steps.season.gamesVisible.standingsTeamRows : null,
      week1: steps.season.week1, week1Of17Seen: steps.season.week1Of17Seen,
      primaryAction: steps.primaryAction,
      draftBoard: steps.draftBoard, tabsScanned: probe.tabsScanned, perTab: probe.perTab, worstTab: probe.worstTab,
      hiddenClippedCount: probe.hiddenClippedCount }
  };
  // A receipt id over the receipt itself: if anyone hand-edits the evidence afterwards, the id
  // stops matching (MOC's W2 finding — a stored result.json that was not the runner's output).
  const failed = !all;      // safety verdict: A/B/C/D (+F/G/H) only
  const receiptId = crypto.createHash('sha256').update(JSON.stringify(report)).digest('hex').slice(0, 12);
  report.run.receipt_id = receiptId;
  report.run.receipt_id_note = 'sha256 of this receipt (without the two id fields), first 12 hex — recompute to prove the file was not edited after the run';
  console.log(JSON.stringify(report, null, 2));
  // The last line is the authoritative, pipeline-safe signal: the exit code alone can be masked by
  // a pipe (`| tail`), and an aborted run writes NO receipt at all — a missing receipt is a failure.
  console.log(`VERDICT: ${report.verdict} exit=${failed ? 1 : 0} ux=${report.ux_verdict} receipt=${report.run.receipt_id} artifact=${sha256.slice(0, 12)}`);
  for (const f of uxFindings) console.log('  UX: ' + f);
  await cdp.send('Target.closeTarget', { targetId }, false);
  cdp.ws.close();
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(String(e)); process.exit(4); });
