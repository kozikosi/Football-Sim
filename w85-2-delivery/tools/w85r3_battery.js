// w85 r3 battery — the Owner's five comments + the w85 systems, verified on the w79 base.
const { chromium } = require('playwright');

const FILE = 'file:///home/z/my-project/w85/Football-Sim-Z-post-blue-w85.html';
let pass = 0, fail = 0;
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('PASS ' + name); }
  else { fail++; console.log('FAIL ' + name + (extra ? ' :: ' + extra : '')); }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
const HOST = `document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body`;
const QUIET = `try{
  window.__zpbQuietSim = true;
  document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-fin,.zpb-story-veil,.zpb-welcine,.confirm-ov,.zpb-porun').forEach(o=>o.remove());
  window.__zpbStoryHold = false; window.__zpbSBFinPending = false; window.__zpbPoRunHold = false;
}catch(e){}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.goto(FILE, { waitUntil: 'load' });
  await sleep(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await sleep(900);

  // ---------- the draft: Chiefs board ----------
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) {
      const opt = [...s.options].find(o => /Kansas City/.test(o.textContent));
      if (opt) { s.value = opt.value; s.dispatchEvent(new Event('change', { bubbles: true })); }
    }
  });
  await sleep(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await sleep(1100);
  const board = await page.evaluate(() => ({ rows: document.querySelectorAll('#draftBody2 tr').length, chips: document.querySelectorAll('#draftChips [data-tog]').length }));
  ok('draft board live', board.chips === 14, JSON.stringify(board));

  // ---------- the ALL/CLEAR pill shape (the Owner: w78's shape is the example) ----------
  const pill = await page.evaluate(() => {
    const a = document.querySelector('#draftChips [data-all]');
    if (!a) return null;
    const cs = getComputedStyle(a);
    return { radius: cs.borderRadius, bg: cs.backgroundColor, label: a.textContent.trim() };
  });
  ok('ALL/CLEAR wear the w78 pill shape', pill && parseFloat(pill.radius) >= 12, JSON.stringify(pill));

  // ---------- finish the draft at speed ----------
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 60; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 26); } catch (e) { return false; } });
    if (done) break;
    await sleep(350);
  }
  await sleep(1300);
  for (let i = 0; i < 18; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await sleep(350); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.__zpbDraftDone = true; } catch (e) {} });
  const draftDone = await page.evaluate(() => { try { return draftSim.pos >= 32 * 26; } catch (e) { return false; } });
  ok('draft completes', draftDone);
  await page.evaluate(() => { try { startSeason(); } catch (e) {} });
  await sleep(900);
  await page.evaluate(QUIET);
  // render the preseason page itself (the season's first stage)
  await page.evaluate(`try{ renderPreseasonView(${HOST}); }catch(e){}`);
  await sleep(700);

  // ---------- the preseason page: no cutdown panel, the boxless dropdowns, the lineup editor ----------
  const pre = await page.evaluate(() => {
    const host = document.getElementById('seasonHost') || document.body;
    const t = host.innerText || '';
    const dds = [...host.querySelectorAll('details.zpb-dd')].map(d => (d.querySelector('summary') || {}).textContent || '');
    const luSels = document.querySelectorAll('.zpb-pickbtn .zpb-pickname').length;
    return { cutdown: /CUTDOWN DAY|Cutdown Day/.test(t), dds, luSels, ddStyled: dds.length };
  });
  ok('preseason carries no cutdown panel', !pre.cutdown, JSON.stringify({ cutdown: pre.cutdown }));
  ok('five boxless preseason dropdowns', pre.dds.length >= 5, JSON.stringify(pre.dds));
  ok('lineup editor rendered', pre.luSels > 0, String(pre.luSels));
  const ddStyle = await page.evaluate(() => {
    const d = document.querySelector('details.zpb-dd');
    if (!d) return null;
    const cs = getComputedStyle(d), sum = d.querySelector('summary');
    return { border: cs.borderTopStyle, fs: sum ? getComputedStyle(sum).fontSize : null };
  });
  ok('dropdowns lose the box and shrink', ddStyle && ddStyle.border === 'none' && ddStyle.fs && parseFloat(ddStyle.fs) < 17.5, JSON.stringify(ddStyle));

  // ---------- the lineup changer never shows "…" ----------
  await page.evaluate(() => { try { window.zpbFitLineupVertical(); } catch (e) {} });
  const luWide = await page.evaluate(() => ({ v: document.querySelectorAll('.depth-row.lgrid.zpb-lu-v').length, total: document.querySelectorAll('.depth-row.lgrid select[data-lineup]').length }));
  ok('wide rows stay horizontal', luWide.v === 0, JSON.stringify(luWide));
  await page.setViewportSize({ width: 340, height: 800 });
  await sleep(400);
  await page.evaluate(() => { try { window.zpbFitLineupVertical(); } catch (e) {} });
  await sleep(250);
  const luNarrow = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.depth-row.lgrid')];
    let over = 0, vert = 0, boxes = 0;
    rows.forEach(r => {
      const btn = r.querySelector('.zpb-pickbtn');
      if (!btn) return;
      boxes++;
      const nm = btn.querySelector('.zpb-pickname');
      if (nm && nm.scrollWidth > btn.clientWidth - 4) over++;
      if (r.classList.contains('zpb-lu-v')) vert++;
    });
    return { boxes, over, vert };
  });
  ok('narrow: the full name always fits (vertical law)', luNarrow.boxes > 0 && luNarrow.over === 0, JSON.stringify(luNarrow));
  ok('narrow: rows actually switched to vertical', luNarrow.vert > 0, JSON.stringify(luNarrow));
  await page.setViewportSize({ width: 1440, height: 900 });
  await sleep(400);
  await page.evaluate(() => { try { window.zpbFitLineupVertical(); } catch (e) {} });
  await sleep(250);
  const luBack = await page.evaluate(() => document.querySelectorAll('.depth-row.lgrid.zpb-lu-v').length);
  ok('rows return to horizontal when the name fits again', luBack === 0, String(luBack));

  // ---------- begin the season, sim it out ----------
  await page.evaluate(() => {
    try { seasonState.preseason = false; } catch (e) {}
    const b = document.getElementById('beginSeasonBtn');
    if (b) b.click();
  });
  await sleep(800);
  await page.evaluate(QUIET);
  await page.evaluate(`try{ renderSeasonTab(${HOST}); }catch(e){}`);
  await sleep(600);
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await sleep(1500);
  await page.evaluate(QUIET);
  await page.evaluate(`try{ renderSeasonTab(${HOST}); }catch(e){}`);
  await sleep(600);

  // ---------- the review carries the DRAFT COMMAND CENTER ----------
  const rev = await page.evaluate(() => {
    const t = (document.getElementById('seasonHost') || document.body).textContent || '';
    return { dcc: /DRAFT COMMAND CENTER/.test(t), cd: /Cutdown Day/.test(t), go: /PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO/.test(t) };
  });
  ok('draft command center lives on the review', rev.dcc && rev.cd && rev.go, JSON.stringify(rev));

  // ---------- the banner waits for the page's own button (R2-2) ----------
  await page.evaluate(`try{ renderSeasonTab(${HOST}); }catch(e){}`);
  await sleep(500);
  await page.evaluate(QUIET);
  const phase1 = await page.evaluate(() => {
    try { if (typeof zpbUpdateStageBanner === 'function') zpbUpdateStageBanner(); } catch (e) {}
    const bar = document.getElementById('zpb-stagebar');
    const cta = document.getElementById('beginPlayoffsBtn') || document.getElementById('simPlayoffsBtn') || document.getElementById('simRoundBtn');
    const r = cta ? cta.getBoundingClientRect() : null;
    const vh = window.innerHeight;
    return { phase: seasonState.phase, hidden: bar ? bar.hidden : null, ctaOnScreen: r ? (r.top < vh && r.bottom > 0) : null };
  });
  ok('banner hidden while the page button is on screen', phase1.hidden === true && phase1.ctaOnScreen === true, JSON.stringify(phase1));
  await page.evaluate(() => window.scrollTo(0, 4000));
  await sleep(500);
  const phase2 = await page.evaluate(() => { const bar = document.getElementById('zpb-stagebar'); return { hidden: bar ? bar.hidden : null }; });
  ok('banner visible after the page button scrolls away', phase2.hidden === false, JSON.stringify(phase2));
  await page.evaluate(() => window.scrollTo(0, 0));

  // ---------- the back bars carry the exact stage ----------
  await page.evaluate(() => { try { const tabs = document.querySelector('[data-view="viewGuide"], #tabGuideBtn'); if (tabs) tabs.click(); } catch (e) {} });
  await sleep(700);
  const backLabel = await page.evaluate(() => {
    const b = document.querySelector('.view.active .zpb-backbar .zpb-backbtn');
    return b ? b.textContent.trim() : '';
  });
  ok('back bar label carries the exact stage', /^(BACK TO (DRAFT|PRESEASON|WEEK \d+|REGULAR SEASON REVIEW|WILD CARD ROUND|DIVISIONAL ROUND|CONFERENCE CHAMPIONSHIP|SUPER BOWL|SEASON REVIEW))$/.test(backLabel), JSON.stringify(backLabel));
  // two bars: top and bottom
  const barCount = await page.evaluate(() => document.querySelectorAll('.view.active .zpb-backbar').length);
  ok('back bars sit at the top and the bottom', barCount === 2, String(barCount));

  // ---------- SIM PLAYOFFS — one cinematic page per round, no during-game panel ----------
  await page.evaluate(() => { try { if (typeof setActiveTab === 'function') setActiveTab('viewDraft', 'tabDraftBtn'); } catch (e) {} });
  await sleep(600);
  await page.evaluate(QUIET);
  await page.evaluate(`try{ renderSeasonTab(${HOST}); }catch(e){}`);
  await sleep(600);
  // land on the regular season review if needed
  await page.evaluate(() => {
    try {
      const S = seasonState;
      if (S.phase === 'complete') { const b = document.getElementById('backToSbBtn') || document.getElementById('seasonReviewBtn'); if (b) b.click(); }
    } catch (e) {}
  });
  await sleep(700);
  await page.evaluate(QUIET);
  const poState = await page.evaluate(() => {
    const S = seasonState;
    const conf = conferenceOfTeam(seasonUserTeam());
    const made = !!(S.seeds && S.seeds[conf] && S.seeds[conf].some(x => x.team === seasonUserTeam()));
    return { phase: S.phase, made, btn: !!document.getElementById('simPlayoffsBtn') };
  });
  ok('playoffs door present on the review', poState.phase === 'regularReview' && poState.btn, JSON.stringify(poState));
  // the Chiefs roster may have missed the field — seat them as the #7 seed so the run has games
  await page.evaluate(() => {
    try {
      const conf = conferenceOfTeam(seasonUserTeam());
      if (!seasonState.seeds[conf].some(x => x.team === seasonUserTeam())) {
        const st = computeStandings(seasonState.schedule, teamNames());
        seasonState.seeds[conf][6] = Object.assign({}, st[seasonUserTeam()], { team: seasonUserTeam(), seed: 7 });
      }
    } catch (e) {}
  });
  // the matchup panel at the top of the game preview reads the seed — the Owner's 'AFC #7' law
  const sp = await page.evaluate(() => { try { startPlayoffs(); return { phase: seasonState.phase, rd: seasonState.currentPlayoffRound }; } catch (e) { return { err: e.message }; } });
  console.log('   startPlayoffs ->', JSON.stringify(sp));
  await page.evaluate(`try{ renderSeasonTab(${HOST}); }catch(e){}`);
  await sleep(700);
  const seed = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.zpb-seedlbl')];
    return { n: els.length, sample: els.slice(0, 3).map(e => e.textContent.trim()), phase: seasonState.phase };
  });
  ok('seed label law (AFC/NFC #n)', seed.n > 0 && seed.sample.every(t => /^(AFC|NFC) #\d+$/.test(t)), JSON.stringify(seed));
  // the one-door law from here: the w66 SIM PLAYOFFS door runs the whole rest itself
  await page.evaluate(() => { try { if (window.zpbSimRestOfPlayoffs) window.zpbSimRestOfPlayoffs(); } catch (e) {} });
  await sleep(1200);
  const porun = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-porun');
    return {
      present: !!ov,
      kicker: ov ? ((ov.querySelector('.zpb-porun-kicker') || {}).textContent || '') : '',
      big: ov ? ((ov.querySelector('.zpb-porun-big') || {}).textContent || '') : ''
    };
  });
  ok('sim playoffs opens the first round cinematic', porun.present && /WILD CARD|DIVISIONAL|CONFERENCE/.test(porun.kicker), JSON.stringify(porun));
  const noDuringPanels = await page.evaluate(() => !document.querySelector('.zpb-replay-ov'));
  ok('no during-the-game panel after sim playoffs', noDuringPanels);
  // click through: win → the next round cinematic; loss → straight to the superbowl
  const seen = [];
  for (let i = 0; i < 6; i++) {
    const go = await page.$('.zpb-porun-go');
    if (!go) break;
    seen.push(await page.evaluate(() => ((document.querySelector('.zpb-porun-kicker') || {}).textContent || '')));
    await go.click();
    await sleep(700);
  }
  const endState = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-porun');
    const sb = document.querySelector('.zpb-sbfin');
    const active = (document.querySelector('.view.active') || {}).textContent || '';
    return { cineGone: !ov, sbCine: !!sb, onSb: /SUPER BOWL/i.test(active) };
  });
  ok('the run ends at the superbowl screen', endState.cineGone && (endState.sbCine || endState.onSb), JSON.stringify({ seen, endState }));
  ok('every played round had its own page', seen.length >= 1 && seen.length <= 3, JSON.stringify(seen));

  // ---------- the pick grades carry no null card ----------
  const nullCards = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.zpb-pg-card')];
    return cards.filter(c => (c.querySelector('.zpb-pg-name') || {}).textContent === '·').length;
  });
  ok('no null pick-grade card', nullCards === 0, String(nullCards));

  // ---------- the console stayed clean ----------
  const realErrors = errors.filter(e => !/favicon|Not implemented|localStorage/i.test(e));
  ok('console clean', realErrors.length === 0, realErrors.slice(0, 4).join(' | '));

  console.log('\nRESULT pass=%d fail=%d', pass, fail);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('HARNESS ERROR ' + e.message); process.exit(2); });
