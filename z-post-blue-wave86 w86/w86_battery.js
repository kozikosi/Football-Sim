/* w86_battery.js — the w86 wave battery: the Owner's six asks + the P-285 items.
 * Run: node w86_battery.js --file <path>
 * Every assertion names its ask. Zero page errors across the whole run is itself an assertion.
 */
const fs = require('fs');
const path = require('path');
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const FILE = /^https?:\/\//.test(arg('--file', '')) ? arg('--file', '') : 'file://' + path.resolve(arg('--file', ''));
const SH = arg('--shots', '/tmp/w86_shots');
fs.mkdirSync(SH, { recursive: true });
const pw = require('playwright');

let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const TEAMS = ['Arizona Cardinals','Atlanta Falcons','Baltimore Ravens','Buffalo Bills','Carolina Panthers','Chicago Bears','Cincinnati Bengals','Cleveland Browns','Dallas Cowboys','Denver Broncos','Detroit Lions','Green Bay Packers','Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Kansas City Chiefs','Las Vegas Raiders','Los Angeles Chargers','Los Angeles Rams','Miami Dolphins','Minnesota Vikings','New England Patriots','New Orleans Saints','NY Giants','NY Jets','Philadelphia Eagles','Pittsburgh Steelers','San Francisco 49ers','Seattle Seahawks','Tampa Bay Buccaneers','Tennessee Titans','Washington Commanders'];

// relative luminance + contrast, page-side
const LUM_FN = `
function __zpbLum(c){
  c = String(c);
  if(c.charAt(0) === '#'){ let h = c.slice(1); if(h.length === 3) h = h.split('').map(x => x + x).join(''); const n = parseInt(h, 16); const f2 = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }; return 0.2126*f2((n>>16)&255)+0.7152*f2((n>>8)&255)+0.0722*f2(n&255); }
  const m = c.match(/rgba?\\(([^)]+)\\)/); if(!m) return null;
  const [r,g,b,a] = m[1].split(',').map(parseFloat);
  if(a != null && a < 0.06) return null;
  const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
}
function __zpbBg(el){
  let e = el;
  while(e && e !== document.documentElement){
    const l = __zpbLum(getComputedStyle(e).backgroundColor);
    if(l != null) return l;
    e = e.parentElement;
  }
  return 1;
}
function __zpbContrast(el){
  const ink = __zpbLum(getComputedStyle(el).color);
  if(ink == null) return null;
  const bg = __zpbBg(el);
  return (Math.max(ink,bg)+0.05)/(Math.min(ink,bg)+0.05);
}`;

(async () => {
  const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(600);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // ============ T1 · light mode: no dark ink on any colored draft bubble, every team ============
  console.log('== T1 · the light-mode ink law (every team, every colored draft button) ==');
  const sweep = await page.evaluate(({ TEAMS, LUM_FN }) => {
    (0, eval)(LUM_FN);
    const root = document.documentElement;
    const out = { light: {}, dark: {}, wave: window.ZPB_WAVE };
    for (const theme of ['light', 'dark']) {
      root.setAttribute('data-theme', theme);
      for (const t of TEAMS) {
        if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme(t);
        const worst = [];
        // 1) the homepage DRAFT button (liquid metal) — the ink vs the ramp's luminance-mean midpoint
        const sd = document.getElementById('startDraftBtn');
        if (sd) {
          const cs = getComputedStyle(sd);
          const bgImg = cs.backgroundImage || '';
          const stops = (bgImg.match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}/gi) || []);
          const rgbs = stops.map(s2 => { const m = String(s2).match(/rgba?\(([^)]+)\)/); return m ? m[1].split(',').slice(0, 3).map(parseFloat) : null; }).filter(Boolean);
          const inkRGB = (() => { const m = cs.color.match(/rgba?\(([^)]+)\)/); return m ? m[1].split(',').slice(0, 3).map(parseFloat) : null; })();
          const inkL = __zpbLum(cs.color);
          if (inkRGB && rgbs.length && inkL != null) {
            // the ramp's average COLOR (what the sweeping eye averages), then its luminance
            const avg = [0, 1, 2].map(k => rgbs.reduce((a, r) => a + r[k], 0) / rgbs.length);
            const avgHex = '#' + avg.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
            const midL = __zpbLum(avgHex);
            const lums = stops.map(s2 => __zpbLum(s2)).filter(x => x != null);
            const bestMid = Math.max(...[avgHex].map(avg2 => { const a2 = __zpbLum(avg2); return (Math.max(inkL, a2) + 0.05) / (Math.min(inkL, a2) + 0.05); }));
            worst.push(['startDraftBtn.mid', bestMid]);
            worst.push(['startDraftBtn.darkStop', (Math.max(inkL, Math.min(...lums)) + 0.05) / (Math.min(inkL, Math.min(...lums)) + 0.05)]);
            // the family-opposition law (the Owner's ask): the ink opposes the metal the eye sees
            worst.push(['startDraftBtn.family', (inkL < 0.2 && midL < 0.45) || (inkL > 0.55 && midL > 0.55) ? 0 : 9]);
            worst.push(['__midL', midL]);
          }
        }
        // 2) the confirm dialog's YES button (team bubble: --bad)
        const ov = document.createElement('div'); ov.className = 'confirm-ov';
        ov.innerHTML = '<div class="confirm-box"><p><b>Are you sure?</b></p><div><button class="tabbtn" data-cf="no">Cancel</button><button class="resetbtn" data-cf="yes" style="width:auto;margin:0;padding:8px 16px;background:var(--bad);">Yes, start a new draft</button></div></div>';
        document.body.appendChild(ov);
        const yes = ov.querySelector('[data-cf="yes"]');
        const c2 = __zpbContrast(yes);
        if (c2 != null) worst.push(['confirmYes', c2]);
        ov.remove();
        out[theme][t] = worst;
      }
    }
    if (typeof zpbClearTeamTheme === 'function') zpbClearTeamTheme();
    root.setAttribute('data-theme', 'dark');
    root.removeAttribute('data-zpbteam');
    return out;
  }, { TEAMS, LUM_FN });
  ok(sweep.wave === 'w86', 'T1 the w86 payload is live (ZPB_WAVE)', String(sweep.wave));
  const perTeam = d => Object.entries(d).map(([t, ws]) => {
    const get = n => { const e = ws.find(x => x[0] === n); return e ? e[1] : null; };
    return { team: t, family: get('startDraftBtn.family'), dark: get('startDraftBtn.darkStop'), mid: get('startDraftBtn.mid'), yes: get('confirmYes') };
  });
  const ptL = perTeam(sweep.light);
  const badLight = ptL.filter(x => x.family !== 9 || (x.yes != null && x.yes < 3) || (x.dark != null && x.dark < 2));
  const worstYesL = ptL.slice().sort((a, b) => (a.yes || 9) - (b.yes || 9))[0];
  ok(badLight.length === 0, 'T1 light mode: the ink family opposes the metal (the Jets law), the confirm-yes clears 3:1 and the dark stop reads — every team', badLight.length ? badLight.map(x => x.team + '[fam=' + x.family + ',yes=' + (x.yes == null ? 'null' : x.yes.toFixed(2)) + ',dark=' + (x.dark == null ? 'null' : x.dark.toFixed(2)) + ']').join(' · ') : 'worst confirm-yes ' + worstYesL.yes.toFixed(2) + ':1 (' + worstYesL.team + ') · the mid contrast is informational (the sheen + the halo carry it)');
  const jetsLight = (sweep.light['NY Jets'] || []).filter(x => x[0] !== '__midL');
  const jetsFam = (jetsLight.find(x => x[0] === 'startDraftBtn.family') || [])[1];
  const jetsDark = (jetsLight.find(x => x[0] === 'startDraftBtn.darkStop') || [])[1];
  const jetsYes = (jetsLight.find(x => x[0] === 'confirmYes') || [])[1];
  ok(jetsFam === 9 && jetsDark >= 2 && jetsYes >= 3, 'T1 the Jets\' colored draft buttons read in light mode (the Owner\'s own example)', JSON.stringify(jetsLight));
  const ptD = perTeam(sweep.dark);
  const badDark = ptD.filter(x => (x.yes != null && x.yes < 3)); // the dark look is the Owner's approved w51 halfway-on-metal design — w86 asserts the bubble case (the confirm-yes) and leaves the approved metal law alone
  const worstYesD = ptD.slice().sort((a, b) => (a.yes || 9) - (b.yes || 9))[0];
  ok(badDark.length === 0, 'T1 dark mode: the confirm-yes clears 3:1, every team (the metal keeps the approved w51 halfway look)', badDark.length ? badDark.map(x => x.team + '[yes=' + (x.yes == null ? 'null' : x.yes.toFixed(2)) + ']').join(' · ') : 'worst confirm-yes ' + worstYesD.yes.toFixed(2) + ':1 (' + worstYesD.team + ')');

  // ============ T2 · the census law: no empty slots after any draft ============
  console.log('== T2 · the census law (sim draft, every team) ==');
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  let census = { teams: 0, userGaps: {}, cpuGaps: 0, sample: [] };
  for (const team of TEAMS) {
    const r = await page.evaluate(t => {
      try {
        localStorage.clear();
        if (typeof newDraft === 'function') newDraft();
        const sel = document.getElementById('draftSlotSelect');
        sel.value = t; sel.dispatchEvent(new Event('change', { bubbles: true }));
        document.getElementById('startDraftBtn').click();
        return true;
      } catch (e) { return { err: String(e) }; }
    }, team);
    if (r !== true) { census.sample.push({ team, err: JSON.stringify(r && r.err) }); continue; }
    await page.waitForTimeout(200);
    const gaps = await page.evaluate(() => {
      try {
        simToEnd();
        const me = draftSim.rosters[draftSim.userIndex];
        const ug = ROSTER_SLOTS.filter(s => !me.slots[s]);
        let cg = 0;
        for (const r of draftSim.rosters) { if (!r.isUser && ROSTER_SLOTS.filter(s => !r.slots[s]).length) cg++; }
        return { ug, cg };
      } catch (e) { return { err: String(e) }; }
    });
    if (gaps.err) { census.sample.push({ team, err: gaps.err }); continue; }
    if (gaps.cg) census.cgDetail = census.cgDetail || [];
    census.teams++;
    if (gaps.ug.length) census.userGaps[team] = gaps.ug;
    if (gaps.cg) census.cpuGaps++;
  }
  ok(census.teams === 32, 'T2 all 32 teams sim a full draft', census.teams + ' teams');
  ok(Object.keys(census.userGaps).length === 0, 'T2 the USER\'s lineup has zero empty slots for every team (the preseason menu can show no gap)', Object.keys(census.userGaps).length ? JSON.stringify(census.userGaps).slice(0, 200) : '0 empty slots');
  ok(census.cpuGaps === 0, 'T2 the CPU\'s lineups have zero empty slots for every team', census.cpuGaps + ' teams with gaps');

  // the manual user draft path: user picks 5 players then sims the rest — no gap may survive
  const manual = await page.evaluate(async () => {
    try {
      localStorage.clear();
      if (typeof newDraft === 'function') newDraft();
      document.getElementById('startDraftBtn').click();
      return true;
    } catch (e) { return { err: String(e) }; }
  });
  await page.waitForTimeout(900);
  const manualRes = await page.evaluate(async () => {
    try {
      // the user takes 5 picks, then the CPU finishes
      for (let i = 0; i < 5; i++) {
        if (!draftSim.awaitingUser) break;
        const board = boardEntries ? boardEntries() : null;
        const rows = document.querySelectorAll('#draftBody2 tr [data-pick], #draftCards [data-pick]');
        const btn = document.querySelector('#draftBody2 [data-pick], #draftCards [data-pick]');
        if (btn) btn.click();
        await new Promise(r2 => setTimeout(r2, 260));
      }
      simToEnd();
      const me = draftSim.rosters[draftSim.userIndex];
      return { userPicks: (draftSim.log || []).filter(l => l.isUser).length, gaps: ROSTER_SLOTS.filter(s => !me.slots[s]) };
    } catch (e) { return { err: String(e) }; }
  });
  ok(manualRes && !manualRes.err && manualRes.gaps && manualRes.gaps.length === 0, 'T2 the mixed draft (5 user picks + sim) ends with zero empty slots', JSON.stringify(manualRes).slice(0, 160));

  // ============ T3 · the Draft Command Center panel never retires ============
  console.log('== T3 · the Draft Command Center panel ==');
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);
  const dcc = await page.evaluate(async () => {
    const out = {};
    try {
      if (typeof newDraft === 'function') newDraft();
      document.getElementById('startDraftBtn').click();
      await new Promise(r2 => setTimeout(r2, 900));
      simToEnd();
      document.getElementById('startSeasonBtn').click();
      await new Promise(r2 => setTimeout(r2, 500));
      simRestOfSeason();
      await new Promise(r2 => setTimeout(r2, 900));
      // the Season Review at the regularReview phase
      seasonState.showReview = true;
      renderSeasonTab(document.getElementById('draftResultsBody'));
      const fx1 = document.querySelector('.zpb-fx-board');
      out.regular = { present: !!fx1, panelClass: fx1 ? fx1.className : null, titled: fx1 ? /DRAFT COMMAND CENTER/.test(fx1.textContent) : false };
      // the self-heal: strip the ratings and re-render
      delete seasonState.unitRanks; delete seasonState.unitRatings;
      renderSeasonTab(document.getElementById('draftResultsBody'));
      const fx2 = document.querySelector('.zpb-fx-board');
      out.healed = { present: !!fx2, titled: fx2 ? /DRAFT COMMAND CENTER/.test(fx2.textContent) : false, ratingsBack: !!(seasonState.unitRanks && seasonState.unitRatings) };
      return out;
    } catch (e) { return { err: String(e) }; }
  });
  ok(dcc.regular && dcc.regular.present && dcc.regular.titled, 'T3 the DCC renders as a PANEL on the Season Review (regular phase)', JSON.stringify(dcc.regular || dcc));
  ok(dcc.healed && dcc.healed.present && dcc.healed.titled && dcc.healed.ratingsBack, 'T3 a save that lost its ratings self-heals — the panel comes back (never plain text)', JSON.stringify(dcc.healed || {}));

  // ============ T4 · Season Review is the last page; the banner offers the try-again ============
  console.log('== T4 · the last-page law + the try-again banner ==');
  const t4 = await page.evaluate(async () => {
    const out = {};
    try {
      // run to complete — the deterministic inline route (the same calls the SIM PLAYOFFS door makes)
      seasonState.showReview = false;
      renderSeasonTab(document.getElementById('draftResultsBody'));
      out.prePo = seasonState.phase;
      startPlayoffs();
      out.postPo = seasonState.phase;
      window.__zpbQuietSim = true; window.__zpbSimRestRun = true; window.__zpbPoRunHold = true;
      const order = ['wildcard','divisional','champ','superbowl'];
      try {
        for (let i = order.indexOf(seasonState.currentPlayoffRound); i < 4; i++) {
          if (!seasonState.playoffRoundSimulated) simulatePlayoffRound();
          if (order[i] !== 'superbowl') advancePlayoffRound();
        }
      } catch (eInner) { out.innerErr = String(eInner); }
      window.__zpbQuietSim = false; window.__zpbSimRestRun = false; window.__zpbPoRunHold = false;
      renderSeasonTab(document.getElementById('draftResultsBody'));
      document.querySelectorAll('.confirm-ov, .zpb-replay-wrap').forEach(e => e.remove());
      out.phase = seasonState.phase;
      out.hasSb = !!(seasonState.playoffRounds && seasonState.playoffRounds.superbowl && seasonState.playoffRounds.superbowl[0]);
      out.champion = seasonState.champion || null;
      // the champion page top panel
      const btns = Array.from(document.querySelectorAll('#draftResultsBody button, #draftResultsBody ~ * button')).map(b => (b.id || b.textContent.trim().slice(0, 22)));
      out.champButtons = btns.filter(x => /TryAgain|RunItBack|seasonReview/i.test(String(x))).slice(0, 6);
      const top = document.querySelector('.zpb-sr-own');
      out.champTopOrder = top ? Array.from(top.querySelectorAll('button')).map(b => b.id || b.textContent.trim().slice(0, 12)) : [];
      // the stage door: no The Champion next door
      const S = seasonState; S.showReview = false;
      out.ctaAtCompleteChamp = (typeof stageCTA === 'function') ? (function(){ try { return stageCTA({}); } catch(e){ return 'ERR'; } })() : null;
      // the banner at complete: open the season view and read the stagebar
      setActiveTab('viewDraft', 'tabDraftBtn');
      await new Promise(r2 => setTimeout(r2, 400));
      if (typeof zpbUpdateStageBanner === 'function') zpbUpdateStageBanner();
      const bar = document.getElementById('zpb-stagebar');
      out.bannerText = bar && !bar.hidden ? bar.textContent.trim().slice(0, 60) : (bar ? '(hidden)' : '(none)');
      out.bannerTry = !!(bar && bar.querySelector('[data-zsb="tryagain"]'));
      return out;
    } catch (e) { return { err: String(e) }; }
  });
  ok(t4.phase === 'complete' && !t4.err, 'T4 the season runs to complete', JSON.stringify({ phase: t4.phase, err: t4.err }));
  ok(Array.isArray(t4.champTopOrder) && t4.champTopOrder.includes('zpbTryAgainBtn') && t4.champTopOrder.includes('zpbRunItBackTop') && t4.champTopOrder.includes('seasonReviewBtn'), 'T4 the champion page top panel = TRY AGAIN 20-0? · RUN IT BACK · SEASON REVIEW', JSON.stringify(t4.champTopOrder));
  ok(t4.bannerTry === true || /TRY AGAIN TO GO/.test(t4.bannerText || ''), 'T4 the banner at complete offers the try-again (the 20-0 keeps its shimmer)', t4.bannerText);

  // the try-again button opens the three doors
  const doors = await page.evaluate(() => {
    try {
      const b = document.getElementById('zpbTryAgainBtn');
      if (!b) return { err: 'no button' };
      b.click();
      const box = document.querySelector('.zpb-again-box');
      const q = box ? box.textContent : '';
      const n = document.querySelectorAll('[data-again]').length;
      document.querySelectorAll('.confirm-ov').forEach(e => e.remove());
      return { doors: n, asks20: /20-0/.test(q) };
    } catch (e) { return { err: String(e) }; }
  });
  ok(doors.doors === 3 && doors.asks20, 'T4 the try-again opens the three doors and keeps the 20-0 question', JSON.stringify(doors));

  // ============ T5 · RUN IT BACK leads the three review pages ============
  console.log('== T5 · RUN IT BACK at the tops ==');
  const t5 = await page.evaluate(async () => {
    const out = {};
    try {
      // champion page (showReview false)
      document.querySelectorAll('.confirm-ov').forEach(e => e.remove());
      seasonState.showReview = false;
      renderSeasonTab(document.getElementById('draftResultsBody'));
      out.champ = !!document.getElementById('zpbRunItBackTop');
      // season review page
      const sr = document.getElementById('seasonReviewBtn'); if (sr) sr.click();
      await new Promise(r2 => setTimeout(r2, 400));
      out.review = !!document.getElementById('zpbRunItBackTop');
      out.reviewTry = !!document.getElementById('zpbTryAgainBtn');
      // regular review page
      const back = document.getElementById('backToSbBtn'); if (back) back.click();
      await new Promise(r2 => setTimeout(r2, 400));
      // walk back: at complete the back button shows the champion page; open the regular review via a fresh route
      seasonState.phase = 'regularReview'; seasonState.showReview = false;
      renderSeasonTab(document.getElementById('draftResultsBody'));
      out.regular = !!document.getElementById('zpbRunItBackTop');
      return out;
    } catch (e) { return { err: String(e) }; }
  });
  ok(t5.champ === true, 'T5 RUN IT BACK leads the Super Bowl Champions page', JSON.stringify(t5));
  ok(t5.review === true && t5.reviewTry === true, 'T5 RUN IT BACK + the try-again lead the Season Review page (the postseason review)', JSON.stringify({ review: t5.review, tryAgain: t5.reviewTry }));
  ok(t5.regular === true, 'T5 RUN IT BACK leads the Regular Season Review page', JSON.stringify({ regular: t5.regular }));

  // ============ T6 · away six hours — the site opens at home ============
  console.log('== T6 · the six-hour law ==');
  const t6 = await page.evaluate(() => {
    try { localStorage.setItem('zpb:tab', 'viewRankings|tabRankingsBtn'); localStorage.setItem('zpb:tabAt', String(Date.now() - 7 * 60 * 60 * 1000)); } catch (e) {}
  });
  await page.reload(); await page.waitForTimeout(900);
  const landed = await page.evaluate(() => {
    const active = document.querySelector('.view.active');
    return { active: active ? active.id : null, stamp: localStorage.getItem('zpb:tabAt') };
  });
  ok(landed.active === 'viewDraft', 'T6 back after seven hours: the site opens at HOME, not Madden Rankings', 'active=' + landed.active);
  // fresh visit still restores the tab
  await page.evaluate(() => { try { localStorage.setItem('zpb:tab', 'viewRankings|tabRankingsBtn'); localStorage.setItem('zpb:tabAt', String(Date.now() - 5 * 60 * 1000)); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  const landed2 = await page.evaluate(() => { const a = document.querySelector('.view.active'); return a ? a.id : null; });
  ok(landed2 === 'viewRankings', 'T6 a five-minute-old tab still restores (the w55 law keeps working)', 'active=' + landed2);

  // ============ T7 · the Series reads the live engine ============
  console.log('== T7 · the Series order ==');
  await page.evaluate(() => { document.getElementById('tabGroupsBtn').click(); });
  await page.waitForTimeout(600);
  const t7 = await page.evaluate(() => {
    try {
      const live = zpbSeriesData();
      const opts = Array.from(document.querySelectorAll('#groupSelect option[value^="zpbS:"]')).map(o => o.textContent);
      return { live: live.slice(0, 7), opt7: opts[6], match: opts[6] && opts[6].replace(/^7 /, '') === live.slice(0, 7).join(' + ') };
    } catch (e) { return { err: String(e) }; }
  });
  ok(t7.match === true, 'T7 the Series dropdown reads the live engine order (series 7 = the top-7 cumulative)', JSON.stringify(t7.live) + ' vs ' + t7.opt7);

  // ============ P-299/300/301/302 · the P-285 items ============
  console.log('== P-299..302 · the P-285 items ==');
  const pitems = await page.evaluate(() => {
    const out = {};
    out.ratingNamed = typeof window.zpbSeasonRating === 'function' && typeof window.ZPB_MEDIAN_OVR === 'number';
    out.median = window.ZPB_MEDIAN_OVR;
    const lsHost = document.createElement('div'); lsHost.innerHTML = '<table class="linescore"><tbody><tr><td>x</td></tr></tbody></table>'; document.body.appendChild(lsHost); const ls = lsHost.querySelector('.linescore');
    const cs = getComputedStyle(ls);
    out.linescore = { border: cs.borderTopWidth, radius: cs.borderRadius, shadow: cs.boxShadow !== 'none' };
    lsHost.remove();
    out.pstatRule = Array.from(document.styleSheets).some(ss => { try { return Array.from(ss.cssRules).some(r => r.cssText && r.cssText.includes('.zpb-pcard-stats .zpb-pstat')); } catch (e) { return false; } });
    return out;
  });
  ok(pitems.ratingNamed && pitems.median > 0, 'P-299 the rating scale is named and re-anchored (zpbSeasonRating + ZPB_MEDIAN_OVR = the drafted-pool median)', JSON.stringify({ named: pitems.ratingNamed, median: pitems.median }));
  ok(pitems.linescore.border === '2px' && pitems.linescore.radius === '14px' && pitems.linescore.shadow, 'P-300 the linescore frame: 2px + inset ring + drop shadow, 14px radius', JSON.stringify(pitems.linescore));
  ok(pitems.pstatRule === true, 'P-301 the badge rule now out-specifies the .68rem override', 'present=' + pitems.pstatRule);
  // P-302: the dropdown casing (on the draft page after boot)
  await page.evaluate(() => { document.getElementById('tabDraftBtn').click(); });
  await page.waitForTimeout(300);
  const ogText = await page.evaluate(() => { const o = Array.from(document.querySelectorAll('#draftPosFilter2 option')).find(x => x.value === 'OG'); return o ? o.textContent : null; });
  ok(ogText === 'Offensive guard', 'P-302 the draft dropdown reads Offensive guard (lowercase g)', String(ogText));

  // ============ zero page errors ============
  ok(errs.length === 0, 'zero page errors across the whole battery', errs.slice(0, 3).join(' | '));

  console.log(`\n== W86 BATTERY · ${pass} pass · ${fail} fail ==`);
  await page.screenshot({ path: path.join(SH, 'w86-final.png') });
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('BATTERY CRASH', e); process.exit(2); });
