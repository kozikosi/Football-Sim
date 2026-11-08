// w85 r3 shots — evidence for the Owner's laws, light and dark, desktop and phone.
const { chromium } = require('playwright');
const fs = require('fs');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = '/home/z/my-project/w85/shots';
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR ' + e.message));

  await page.goto('file:///home/z/my-project/w85/Football-Sim-Z-post-blue-w85.html', { waitUntil: 'load' });
  await sleep(700);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await sleep(900);
  await page.evaluate(() => {
    window.__writes = [];
    const desc = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    Object.defineProperty(HTMLBodyElement.prototype, 'innerHTML', {
      set(v) { window.__writes.push({ len: String(v).length, stack: (new Error().stack || '').split('\n').slice(2, 16).join(' || ').slice(0, 1600) }); desc.set.call(this, v); },
      get() { return desc.get.call(this); }, configurable: true
    });
  });

  // draft: Chiefs
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { const o = [...s.options].find(o => /Kansas City/.test(o.textContent)); if (o) { s.value = o.value; s.dispatchEvent(new Event('change', { bubbles: true })); } }
  });
  await sleep(300);
  await page.evaluate(() => { document.getElementById('startDraftBtn').click(); });
  await sleep(1100);
  await page.screenshot({ path: OUT + '/s01-draft-board.png' }); // ALL/CLEAR pills + chips + fills
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 60; i++) { const d = await page.evaluate(() => { try { return draftSim.pos >= 32 * 26; } catch (e) { return false; } }); if (d) break; await sleep(350); }
  await sleep(1200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.__zpbDraftDone = true; } catch (e) {} });
  await page.evaluate(() => { try { startSeason(); } catch (e) {} });
  await sleep(900);
  const QUIET = `try{ window.__zpbQuietSim = true; document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-fin,.zpb-story-veil,.zpb-welcine,.confirm-ov,.zpb-porun').forEach(o=>o.remove()); window.__zpbStoryHold=false; window.__zpbSBFinPending=false; window.__zpbPoRunHold=false; }catch(e){}`;
  console.log('STYLES a:', await page.evaluate(() => document.querySelectorAll('style').length));
  await page.evaluate(QUIET);
  await page.evaluate(`try{ renderPreseasonView(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); }catch(e){}`);
  await sleep(800);
  await page.screenshot({ path: OUT + '/s02-preseason-top.png' }); // boxless dropdowns + lineup changer
  await page.evaluate(() => { const d = [...document.querySelectorAll('details.zpb-dd')].find(x => /WHAT DO THESE TERMS/.test(x.textContent || '')); if (d) { d.open = true; d.scrollIntoView({ block: 'center' }); } });
  await sleep(500);
  await page.screenshot({ path: OUT + '/s03-preseason-terms.png' });

  console.log('STYLES b:', await page.evaluate(() => document.querySelectorAll('style').length));
  const where = await page.evaluate(() => {
    const lu = document.getElementById('lineupPre');
    const chain = [];
    let n = lu;
    while (n && n !== document.body) { chain.push((n.tagName || '') + (n.id ? '#' + n.id : '')); n = n.parentNode; }
    return { luExists: !!lu, chain: chain.join(' < '), rb: !!document.getElementById('draftResultsBody'), seasonHost: !!document.getElementById('seasonHost') };
  });
  console.log('PRESEASON HOME:', JSON.stringify(where));
  // week 1 preview (stat badges + team sides)
  await page.evaluate(() => { try { seasonState.preseason = false; } catch (e) {} });
  await page.evaluate(`(function(){
   try{
    var panel = document.getElementById('draftFinalResults');
    if(panel && !document.getElementById('draftResultsBody')){ panel.style.display='block'; panel.innerHTML='<div id="draftResultsBody"></div>'; }
    else if(panel) panel.style.display='block';
    if(typeof resultsView !== 'undefined') resultsView = 'season';
    renderDraftResults();
   }catch(e){}
  })()`);
  await sleep(900);
  await page.evaluate(QUIET);
  await page.screenshot({ path: OUT + '/s04-week1-preview.png' });
  const previewEl = await page.$('.zpb-pvwrap');
  if (previewEl) { await previewEl.scrollIntoViewIfNeeded(); await sleep(300); await page.screenshot({ path: OUT + '/s05-preview-stars.png' }); }

  console.log('STYLES c:', await page.evaluate(() => document.querySelectorAll('style').length));
  { const wr = await page.evaluate(() => (window.__writes || []).slice(-4)); wr.forEach((w, i) => console.log('write#' + i + ' len=' + w.len + ' :: ' + w.stack.slice(0, 1400))); }
  // sim the season out → review → the Draft Command Center
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await sleep(1500);
  await page.evaluate(QUIET);
  await page.evaluate(`(function(){
   try{
    var panel = document.getElementById('draftFinalResults');
    if(panel && !document.getElementById('draftResultsBody')){ panel.style.display='block'; panel.innerHTML='<div id="draftResultsBody"></div>'; }
    else if(panel) panel.style.display='block';
    if(typeof resultsView !== 'undefined') resultsView = 'season';
    renderDraftResults();
   }catch(e){}
  })()`);
  await sleep(900);
  await page.evaluate(`(function(){
   try { seasonState.showReview = true; } catch (e) {}
   try { renderSeasonReviewView(document.getElementById('draftResultsBody')); } catch (e) {}
  })()`);
  await sleep(800);
  const dccEl = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.zpb-rc-title')];
    const dcc = els.find(e => /DRAFT COMMAND CENTER/.test(e.textContent || ''));
    if (dcc) { dcc.scrollIntoView({ block: 'start' }); return true; }
    return false;
  });
  await sleep(400);
  const boardState = await page.evaluate(() => {
    const el = document.querySelector('.zpb-fx-mini');
    const board = document.querySelector('.zpb-fx-board');
    return {
      styles: document.querySelectorAll('style').length,
      hasW75: !!document.getElementById('zpb-w75-css'),
      fxStyled: el ? getComputedStyle(el).display : null,
      boardDisplay: board ? getComputedStyle(board).display : null,
      boardClasses: board ? board.className : null,
      boardHTMLHead: board ? board.outerHTML.slice(0, 140) : null
    };
  });
  console.log('board state:', JSON.stringify(boardState));
  await page.screenshot({ path: OUT + '/s07-command-center.png' });
  console.log('dcc shown:', dccEl);

  // ---------- the pregame cinematic: seat the team, open the wildcard round, play it ----------
  await page.evaluate(() => {
    try {
      const conf = conferenceOfTeam(seasonUserTeam());
      if (!seasonState.seeds[conf].some(x => x.team === seasonUserTeam())) {
        const st = computeStandings(seasonState.schedule, teamNames());
        seasonState.seeds[conf][6] = Object.assign({}, st[seasonUserTeam()], { team: seasonUserTeam(), seed: 7 });
      }
      startPlayoffs();
    } catch (e) {}
  });
  await page.evaluate(`(function(){
   try{
    var panel = document.getElementById('draftFinalResults');
    if(panel && !document.getElementById('draftResultsBody')){ panel.style.display='block'; panel.innerHTML='<div id="draftResultsBody"></div>'; }
    else if(panel) panel.style.display='block';
    if(typeof resultsView !== 'undefined') resultsView = 'season';
    renderDraftResults();
   }catch(e){}
  })()`);
  await sleep(700);
  const probe1 = await page.evaluate(() => ({ btn: !!document.getElementById('simRoundBtn'), phase: seasonState.phase, rd: seasonState.currentPlayoffRound, simmed: seasonState.playoffRoundSimulated, quiet: window.__zpbQuietSim === true }));
  console.log('pregame probe:', JSON.stringify(probe1));
  await page.evaluate(() => {
    try {
      window.__zpbQuietSim = false; window.__zpbSilent = false;
      window.__zpbReplayCalls = 0;
      const _o = zpbGameReplay;
      window.zpbGameReplay = function(){
        window.__zpbReplayCalls++;
        const pre = { ov: !!document.querySelector('.zpb-replay-ov'), silent: window.__zpbSilent === true, quiet: window.__zpbQuietSim === true, evs: (arguments[0] && arguments[0].result && (arguments[0].result.homeEvents||[]).length) || 0 };
        const r = _o.apply(this, arguments);
        window.__zpbReplayMounted = !!document.querySelector('.zpb-replay-ov');
        window.__zpbReplayPre = pre;
        return r;
      };
    } catch (e) { console.log('wrap err ' + e.message); }
  });
  await page.evaluate(() => { try { const b = document.getElementById('simRoundBtn'); if (b) b.click(); else if (typeof simulatePlayoffRound === 'function') simulatePlayoffRound(); } catch (e) { console.log('roundplay err ' + e.message); } });
  await sleep(1500);
  console.log('replay calls:', await page.evaluate(() => ({ n: window.__zpbReplayCalls, pre: window.__zpbReplayPre, mounted: window.__zpbReplayMounted })));
  let hasIntro = await page.evaluate(() => !!document.querySelector('.zpb-replay-ov'));
  if (!hasIntro) {
    const probe2 = await page.evaluate(() => {
      try {
        const u = seasonUserTeam();
        const g = (seasonState.playoffRounds[seasonState.currentPlayoffRound]||[]).find(x=>x.home===u||x.away===u);
        window.__zpbQuietSim = false; window.__zpbSilent = false;
        zpbGameReplay(g, u);
        return { mounted: !!document.querySelector('.zpb-replay-ov'), evs: (g.result.homeEvents||[]).length, silent: window.__zpbSilent === true };
      } catch (e) { return { err: e.message }; }
    });
    console.log('pregame probe2:', JSON.stringify(probe2));
    hasIntro = probe2.mounted === true;
  }
  console.log('pregame overlay:', hasIntro);
  await page.screenshot({ path: OUT + '/s06-pregame-cine.png' });
  await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
  await sleep(900);
  await page.evaluate(QUIET);

  // seeds + banner on the playoff matchup
  await page.evaluate(() => {
    try {
      const conf = conferenceOfTeam(seasonUserTeam());
      if (!seasonState.seeds[conf].some(x => x.team === seasonUserTeam())) {
        const st = computeStandings(seasonState.schedule, teamNames());
        seasonState.seeds[conf][6] = Object.assign({}, st[seasonUserTeam()], { team: seasonUserTeam(), seed: 7 });
      }
      startPlayoffs();
    } catch (e) {}
  });
  await page.evaluate(`(function(){
   try{
    var panel = document.getElementById('draftFinalResults');
    if(panel && !document.getElementById('draftResultsBody')){ panel.style.display='block'; panel.innerHTML='<div id="draftResultsBody"></div>'; }
    else if(panel) panel.style.display='block';
    if(typeof resultsView !== 'undefined') resultsView = 'season';
    renderDraftResults();
   }catch(e){}
  })()`);
  await sleep(800);
  await page.screenshot({ path: OUT + '/s08-playoff-matchup.png' }); // AFC #7 seed + the banner

  // the sim-playoffs run cine
  await page.evaluate(() => { try { if (window.zpbSimRestOfPlayoffs) window.zpbSimRestOfPlayoffs(); } catch (e) {} });
  await sleep(1300);
  await page.screenshot({ path: OUT + '/s09-run-cine.png' });
  await page.evaluate(QUIET);

  // the guide with the back bar
  await page.evaluate(() => { try { if (typeof setActiveTab === 'function') setActiveTab('viewGuide', 'tabGuideBtn'); } catch (e) {} });
  await sleep(900);
  await page.screenshot({ path: OUT + '/s10-guide-backto.png' });

  // light mode
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  await sleep(500);
  await page.screenshot({ path: OUT + '/s11-guide-light.png' });

  // ---------- phone ----------
  const mob = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await mob.newPage();
  mp.on('pageerror', e => console.log('MOB PAGEERROR ' + e.message));
  await mp.goto('file:///home/z/my-project/w85/Football-Sim-Z-post-blue-w85.html', { waitUntil: 'load' });
  await sleep(700);
  await mp.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await mp.reload(); await sleep(900);
  await mp.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { const o = [...s.options].find(o => /Kansas City/.test(o.textContent)); if (o) { s.value = o.value; s.dispatchEvent(new Event('change', { bubbles: true })); } }
  });
  await sleep(300);
  await mp.evaluate(() => { document.getElementById('startDraftBtn').click(); });
  await sleep(1100);
  await mp.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 60; i++) { const d = await mp.evaluate(() => { try { return draftSim.pos >= 32 * 26; } catch (e) { return false; } }); if (d) break; await sleep(350); }
  await sleep(1200);
  await mp.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.__zpbDraftDone = true; } catch (e) {} });
  await mp.evaluate(() => { try { startSeason(); } catch (e) {} });
  await sleep(900);
  await mp.evaluate(QUIET);
  // land on the preseason page itself — the lineup changer's vertical law lives there
  await mp.evaluate(`try{ renderPreseasonView(document.getElementById('draftResultsBody') || document.body); }catch(e){}`);
  await sleep(900);
  const mvert = await mp.evaluate(() => ({ v: document.querySelectorAll('.depth-row.lgrid.zpb-lu-v').length, rows: document.querySelectorAll('.depth-row.lgrid').length }));
  console.log('phone vertical:', JSON.stringify(mvert));
  await mp.screenshot({ path: OUT + '/s12-phone-preseason.png' }); // the vertical lineup law
  // the preview's team sides on the phone
  await mp.evaluate(() => { try { seasonState.preseason = false; } catch (e) {} });
  await mp.evaluate(`try{ renderSeasonTab(document.getElementById('seasonHost') || document.body); }catch(e){}`);
  await sleep(900);
  await mp.evaluate(QUIET);
  const pv = await mp.$('.zpb-pvwrap');
  if (pv) { await pv.scrollIntoViewIfNeeded(); await sleep(300); await mp.screenshot({ path: OUT + '/s13-phone-preview-stars.png' }); }
  // horizontal scroll guard: the page never pans
  const pan = await mp.evaluate(() => ({ x: document.documentElement.scrollWidth, y: window.innerWidth }));
  console.log('phone pan check (scrollWidth vs innerWidth):', JSON.stringify(pan));

  await browser.close();
  console.log('shots done');
})().catch(e => { console.log('ERR ' + e.message); process.exit(2); });
