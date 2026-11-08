/* w85_battery.js — the Owner's round-85 live battery (desktop 1280 / 1440 / 1920)
 * W85-1 banner + back-to-x · W85-2 top landings · W85-3 seeds · W85-4 names/badges
 * W85-5 pregame key players · W85-6 null grade card · W85-7 autosave + restore ·
 * W85-8 box score border + cutdown day · zero page errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w85/Football-Sim-Z-post-blue-w85.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const sleep = (ms) => page.waitForTimeout(ms);
let page, errors = [];

const QUIET = `try{
  window.__zpbQuietSim = true;
  document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-fin,.zpb-story-veil,.zpb-welcine,.confirm-ov').forEach(o=>o.remove());
  window.__zpbStoryHold = false; window.__zpbSBFinPending = false; window.__zpbPoRunHold = false;
}catch(e){}`;

async function renderSeason() {
  await page.evaluate(`try{ renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); }catch(e){}` );
  await sleep(700);
  await page.evaluate(QUIET);
}

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));
  await page.goto(FILE); await sleep(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await sleep(900);

  // ---------- boot: homepage hides the banner ----------
  const b0 = await page.evaluate(() => ({ home: document.body.getAttribute('data-home'), barHidden: document.getElementById('zpb-stagebar') ? document.getElementById('zpb-stagebar').hidden : 'none' }));
  ok(b0.home === '1' && (b0.barHidden === true || b0.barHidden === 'none'), 'B0 · homepage: banner off (the draft setup is the door)', JSON.stringify(b0));

  // ---------- draft to the end (49ers for the takeover laws) ----------
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await sleep(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await sleep(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 50; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 26); } catch (e) { return false; } }); if (done) break; await sleep(350); }
  await sleep(1300);
  for (let i = 0; i < 18; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await sleep(350); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.__zpbDraftDone = true; } catch (e) {} });

  // ---------- start the season → preseason + cutdown day ----------
  await page.evaluate(() => { try { startSeason(); } catch (e) {} });
  await renderSeason();
  const b9 = await page.evaluate(() => {
    const cd = document.querySelector('.zpb-cd');
    if (!cd) return { nopanel: true };
    const rows = cd.querySelectorAll('.zpb-cd-row').length;
    const open = cd.querySelectorAll('.zpb-cd-open').length;
    const flex = cd.querySelectorAll('.zpb-cd-flex').length;
    const strip = (cd.querySelector('.narr') || {}).textContent || '';
    return { rows, open, flex, strip: strip.trim().slice(0, 120), hasEdit: !!document.getElementById('cutdownEditBtn') };
  });
  ok(b9.rows === 32 && b9.hasEdit, 'B9 · CUTDOWN DAY panel: 32 audited slots + the editor jump', JSON.stringify(b9));

  // ---------- the banner on the preseason page (R2-2: it WAITS while the page's own button is on screen) ----------
  const b1 = await page.evaluate(() => {
    const bar = document.getElementById('zpb-stagebar');
    const own = document.getElementById('beginSeasonBtn');
    return { hidden: bar.hidden, st: (bar.querySelector('.zpb-sb-st') || {}).textContent, act: (bar.querySelector('[data-zsb]') || {}).getAttribute('data-zsb'), ownTop: own ? Math.round(own.getBoundingClientRect().top) : -1 };
  });
  ok(b1.hidden === true && b1.st === 'Preseason' && b1.act === 'beginseason' && b1.ownTop >= 0, 'W85-1+R2-2 · the banner holds its Preseason CTA but stays hidden while the page\u2019s own Begin button is on screen', JSON.stringify(b1));
  await page.evaluate(() => { try { window.scrollTo(0, 1100); } catch (e) {} });
  await sleep(500);
  const b1b = await page.evaluate(() => ({ hidden: document.getElementById('zpb-stagebar').hidden, y: window.scrollY }));
  ok(b1b.hidden === false, 'R2-2 · past the page\u2019s own button, the banner appears', JSON.stringify(b1b));
  await page.evaluate(() => { try { window.scrollTo(0, 0); } catch (e) {} });
  await sleep(500);

  // ---------- Back to x on the guide + footer tools ----------
  const backs = {};
  for (const [btn, name] of [['tabGuideBtn', 'Guide'], ['tabRankingsBtn', 'Rankings'], ['tabPlayersBtn', 'Players'], ['tabGroupsBtn', 'Groups'], ['tabCompareBtn', 'Compare']]) {
    await page.evaluate((id) => { const b = document.getElementById(id); if (b) b.click(); }, btn);
    await sleep(350);
    backs[name] = await page.evaluate(() => {
      const bar = document.getElementById('zpb-stagebar');
      const t = bar.querySelector('[data-zsb="back"]');
      const top2 = document.querySelector('.view.active .zpb-view-backbar.zpb-top');
      const bot = document.querySelector('.view.active .zpb-view-backbar.zpb-bot');
      return { st: (bar.querySelector('.zpb-sb-st') || {}).textContent, lbl: t ? t.textContent : '', barHiddenAtTop: bar.hidden,
        topBar: top2 ? { vis: !top2.hidden, lbl: (top2.querySelector('[data-zbbgo]') || {}).textContent || '' } : null,
        botBar: bot ? { vis: !bot.hidden, lbl: (bot.querySelector('[data-zbbgo]') || {}).textContent || '' } : null };
    });
  }
  const backOk = Object.entries(backs).every(([k, v]) => v.st === 'Preseason' && v.lbl === 'Back to Preseason' && v.barHiddenAtTop === true && v.topBar && v.topBar.vis && /Back to Preseason/.test(v.topBar.lbl) && v.botBar && v.botBar.vis);
  ok(backOk, 'W85-1+R2-14 · Back to <stage> at the top AND the bottom of every tool page; the banner waits while the top bar is on screen', JSON.stringify(backs));
  // R2-2 on a tool page: scroll past the top bar — the banner appears
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await sleep(400);
  await page.evaluate(() => { try { window.scrollTo(0, 1300); } catch (e) {} });
  await sleep(500);
  const gGate = await page.evaluate(() => ({ hidden: document.getElementById('zpb-stagebar').hidden, y: window.scrollY }));
  ok(gGate.hidden === false, 'R2-2 · past the Guide\u2019s top Back bar, the banner appears', JSON.stringify(gGate));
  await page.evaluate(() => { try { window.scrollTo(0, 0); } catch (e) {} });
  await sleep(400);

  // ---------- begin the season FROM the banner → lands at top, week 1 ----------
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await sleep(400);
  await page.evaluate(() => { try { window.scrollTo(0, 400); } catch (e) {} });
  await page.evaluate(() => { const b = document.querySelector('#zpb-stagebar [data-zsb="beginseason"]'); if (b) b.click(); });
  await sleep(900);
  const b3a = await page.evaluate(() => ({ y: window.scrollY, pre: seasonState.preseason, wk: seasonState.currentWeek }));
  ok(b3a.y === 0 && !b3a.pre && b3a.wk === 1, 'W85-2 · banner Begin the season lands at the top of Week 1', JSON.stringify(b3a));

  // ---------- W85-4 · the preview star cards never clip a name ----------
  await page.evaluate(QUIET);
  await renderSeason();
  const clip = await page.evaluate(() => {
    const out = { cards: 0, clipped: [], badgePx: null, sample: [] };
    document.querySelectorAll('.zpb-pvwrap .zpb-pcard-hd b').forEach(b => {
      out.cards++;
      if (b.scrollWidth > b.clientWidth + 1) out.clipped.push(b.textContent + ' (' + b.scrollWidth + '>' + b.clientWidth + ')');
      const t = b.textContent.trim();
      if (out.sample.length < 3) out.sample.push(t + '/' + b.clientWidth + 'px');
    });
    const bdg = document.querySelector('.zpb-pvwrap .zpb-pstat');
    if (bdg) out.badgePx = getComputedStyle(bdg).fontSize;
    return out;
  });
  ok(clip.cards > 0 && clip.clipped.length === 0, 'W85-4 · 1280px: full names on the preview, zero clipped', JSON.stringify({ cards: clip.cards, clipped: clip.clipped, sample: clip.sample, badgePx: clip.badgePx }));

  // ---------- W85-4 at wider desktops (the preview is still on this page) ----------
  for (const w of [1440, 1920]) {
    await page.setViewportSize({ width: w, height: 1200 });
    await sleep(450);
    const cw = await page.evaluate(() => {
      const bad = [];
      document.querySelectorAll('.zpb-pvwrap .zpb-pcard-hd b').forEach(b => { if (b.scrollWidth > b.clientWidth + 1) bad.push(b.textContent.trim()); });
      return { cards: document.querySelectorAll('.zpb-pvwrap .zpb-pcard-hd b').length, bad };
    });
    ok(cw.cards > 0 && cw.bad.length === 0, `W85-4 · ${w}px: full names, zero clipped`, JSON.stringify(cw));
  }
  await page.setViewportSize({ width: 1280, height: 1200 });
  await sleep(400);

  // ---------- W85-6 · a slot nobody drafted prints no null row (the grades table rides this page) ----------
  const b7 = await page.evaluate(() => {
    try {
      const me = draftSim.rosters[draftSim.userIndex];
      const before = (pickGradePanelHTML() || '').includes('TE1');
      const orig = me.slots['TE1'];
      me.slots['TE1'] = undefined; delete me.pickRounds['TE1'];
      const after = (pickGradePanelHTML() || '');
      const hasNullRow = /<td>TE1<\/td>/.test(after);
      me.slots['TE1'] = orig; // the battery keeps the real roster
      return { before, hasNullRow, rows: (after.match(/zpb-trow/g) || []).length };
    } catch (e) { return { err: String(e).slice(0, 120) }; }
  });
  ok(b7.before !== undefined && b7.hasNullRow === false, 'W85-6 · no TE1 drafted → no TE1 null card in the grades', JSON.stringify(b7));

  // ---------- W85-2 · Play the week from the banner → top, week simulated ----------
  // (advance to week 2 first: week 1 already simulated for the box-score frame above)
  await page.evaluate(() => { try { if (!seasonState.weekSimulated) simulateCurrentWeek(); advanceWeek(); renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await sleep(800);
  await page.evaluate(QUIET);
  await page.evaluate(() => { try { window.scrollTo(0, 600); } catch (e) {} });
  await page.evaluate(() => { const b = document.querySelector('#zpb-stagebar [data-zsb="playweek"]'); if (b) b.click(); });
  await sleep(1300);
  await page.evaluate(QUIET);
  const b3b = await page.evaluate(() => ({ y: window.scrollY, sim: seasonState.weekSimulated, wk: seasonState.currentWeek, btn: (document.querySelector('#zpb-stagebar [data-zsb]') || {}).getAttribute('data-zsb') }));
  ok(b3b.y === 0 && b3b.sim && b3b.wk === 2 && b3b.btn === 'nextweek', 'W85-2 · banner Play the week → result at the top, CTA flips to Continue', JSON.stringify(b3b));

  // ---------- W85-8a · the box score border (the week-2 result is on the page now) ----------
  const b10 = await page.evaluate(() => {
    const ls = document.querySelector('.linescore');
    if (!ls) return { no: true };
    const cs = getComputedStyle(ls);
    return { bw: cs.borderTopWidth, bs: cs.borderTopStyle, sh: cs.boxShadow !== 'none', radius: cs.borderTopLeftRadius };
  });
  ok(!b10.no && b10.bw === '2px' && b10.bs === 'solid' && b10.sh, 'W85-8a · the box score wears its well-defined frame', JSON.stringify(b10));

  // ---------- W85-4 · the badges, with a game played (chips need gp>0) ----------
  const bdg = await page.evaluate(() => {
    const b = document.querySelector('.zpb-pstat');
    return b ? getComputedStyle(b).fontSize : null;
  });
  ok(bdg !== null && parseFloat(bdg) <= 12.7, 'W85-4 · the stat badges are smaller (0.6rem = 12.6px at the site\u2019s 21px root, was 13.86px)', String(bdg));

  // ---------- W85-7 · the autosave saves per week ----------
  const s1 = await page.evaluate(() => { try { const t = localStorage.getItem('zpb:season'); return t ? { sig: JSON.parse(t).sig, stage: JSON.parse(t).stage, len: t.length } : null; } catch (e) { return 'err'; } });
  ok(s1 && typeof s1 === 'object' && /regular\|2\|1/.test(s1.sig) && s1.stage === 'Week 2', 'W85-7 · autosave after week 2 (sig + stage)', JSON.stringify(s1));
  await page.evaluate(() => { const b = document.querySelector('#zpb-stagebar [data-zsb="nextweek"]'); if (b) b.click(); });
  await sleep(900);
  const s2 = await page.evaluate(() => { try { const t = JSON.parse(localStorage.getItem('zpb:season')); return { sig: t.sig, stage: t.stage }; } catch (e) { return 'err'; } });
  ok(s2.sig && /regular\|3\|0/.test(s2.sig) && s2.stage === 'Week 3', 'W85-7 · autosave after Continue to Week 3 (per-week saving)', JSON.stringify(s2));

  // ---------- W85-7 · reload → bubble → restore lands on Week 2, at the top ----------
  await page.reload(); await sleep(900);
  const bud = await page.evaluate(() => {
    const b = document.getElementById('zpb-savebud');
    return { vis: b && !b.hidden, txt: b ? (b.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 110) : '' };
  });
  ok(bud.vis && /saved season is waiting/i.test(bud.txt) && /Week 3/.test(bud.txt), 'W85-7 · the return bubble names the saved stage (Week 3)', bud.txt);
  await page.evaluate(() => { const b = document.querySelector('#zpb-savebud [data-zbud="go"]'); if (b) b.click(); });
  await sleep(1200);
  await page.evaluate(QUIET);
  const rest = await page.evaluate(() => ({ y: window.scrollY, wk: seasonState.currentWeek, phase: seasonState.phase, sim: seasonState.weekSimulated, active: document.getElementById('viewDraft').classList.contains('active') }));
  ok(rest.wk === 3 && rest.phase === 'regular' && rest.y === 0 && rest.active, 'W85-7 · restore lands on Week 3 at the top (never a fixed week 2)', JSON.stringify(rest));
  const bud2 = await page.evaluate(() => { const b = document.getElementById('zpb-savebud'); return b ? !b.hidden : false; });
  ok(!bud2, 'W85-7 · the bubble retires once the season is back');

  // ---------- W85-2 + W85-3 · reach the review, begin playoffs from the banner, seeds read AFC #n ----------
  await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await sleep(1500);
  await page.evaluate(QUIET);
  await renderSeason();
  // (battery-only) the seed test needs the user's team in the bracket — a random auto-drafted
  // roster can miss the field; slot it into the #7 seed of its own conference, exactly like a 7 seed
  await page.evaluate(() => {
    try {
      const conf = conferenceOfTeam(seasonUserTeam());
      const st = computeStandings(seasonState.schedule, teamNames());
      if (!seasonState.seeds[conf].some(x => x.team === seasonUserTeam())) {
        seasonState.seeds[conf][6] = Object.assign({}, st[seasonUserTeam()], { team: seasonUserTeam(), seed: 7 });
      }
    } catch (e) {}
  });
  const rev = await page.evaluate(() => ({ phase: seasonState.phase, rec: (seasonState.seeds.AFC.concat(seasonState.seeds.NFC)).some(x => x.team === seasonUserTeam()) }));
  ok(rev.phase === 'regularReview' && rev.rec, 'the season reaches the Regular Season Review with the team in the field', JSON.stringify(rev));
  await page.evaluate(() => { try { window.scrollTo(0, 700); } catch (e) {} }); // past the page's own Begin Playoffs button — the banner takes over
  await sleep(500);
  await page.evaluate(() => { const b = document.querySelector('#zpb-stagebar [data-zsb="beginpo"]'); if (b) b.click(); });
  await sleep(1200);
  await page.evaluate(QUIET);
  const b3c = await page.evaluate(() => ({ y: window.scrollY, phase: seasonState.phase, rk: seasonState.currentPlayoffRound }));
  ok(b3c.y === 0 && b3c.phase === 'playoffs' && b3c.rk === 'wildcard', 'W85-2 · banner Begin Playoffs → the Wild Card page at the top', JSON.stringify(b3c));
  const b4 = await page.evaluate(() => {
    const seedEls = [...document.querySelectorAll('.zpb-mu-rec .zpb-seedlbl')];
    const txts = seedEls.map(e => e.textContent.trim());
    const fam = seedEls.length ? getComputedStyle(seedEls[0]).fontFamily : '';
    const col = seedEls.length ? getComputedStyle(seedEls[0]).color : '';
    return { n: seedEls.length, txts, fam: fam.slice(0, 40), col };
  });
  ok(b4.n === 2 && b4.txts.every(t => /^(AFC|NFC) #\d+$/.test(t)) && /Cinzel/i.test(b4.fam), 'W85-3 · the matchup seeds read AFC #n / NFC #n in Cinzel Decorative', JSON.stringify(b4));
  ok(b4.col && !/rgba?\(\s*(255,\s*255,\s*255|0,\s*0,\s*0)\s*\)/i.test(b4.col), 'W85-3 · the seed ink is the team ink (no white, no black)', b4.col);

  // ---------- W85-5 · the playoff pregame: every key player inside the panel ----------
  // (the pregame cinematic needs the replay to open — quiet mode suppresses it, so this one plays loud)
  await page.evaluate(() => { try { window.__zpbQuietSim = false; } catch (e) {} });
  await page.evaluate(() => { try { simulatePlayoffRound(); } catch (e) {} });
  await sleep(2800);
  const b6 = await page.evaluate(() => {
    const box = document.querySelector('.zpb-replay');
    const stars = [...document.querySelectorAll('.zpb-replay .zpb-intro-star')];
    if (!box || !stars.length) return { noStage: true, box: !!box, stars: stars.length };
    const rb = box.getBoundingClientRect();
    const bad = stars.filter(s => { const r = s.getBoundingClientRect(); return r.bottom > rb.bottom - 2 || r.top < rb.top + 2 || r.left < rb.left + 2 || r.right > rb.right - 2; }).map(s => s.textContent.trim().slice(0, 30));
    return { w: Math.round(rb.width), stars: stars.length, bad, first: stars.slice(0, 2).map(s => Math.round(s.getBoundingClientRect().bottom - rb.top)), last: stars.slice(-2).map(s => Math.round(rb.bottom - s.getBoundingClientRect().bottom)) };
  });
  ok(!b6.noStage && b6.w >= 900 && b6.stars >= 4 && b6.bad.length === 0, 'W85-5 · the panel grew (≥900px) and every key player fits inside it', JSON.stringify(b6));
  await page.evaluate(QUIET);
  await renderSeason();
  await page.evaluate(QUIET);

  // ---------- W85-7 · play the season out → complete → reload → restore to the season-complete page ----------
  await page.evaluate(() => {
    window.__zpbQuietSim = true; window.__zpbPoRunHold = true;
    try {
      for (const rk of ['wildcard', 'divisional', 'champ', 'superbowl']) {
        if (!seasonState.playoffRoundSimulated) simulatePlayoffRound();
        if (rk !== 'superbowl') advancePlayoffRound();
      }
    } catch (e) {}
    try { renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body); } catch (e) {} // the real flow re-renders — the tick saves
  });
  await sleep(1500);
  await page.evaluate(QUIET);
  const comp = await page.evaluate(() => ({ phase: seasonState.phase, champ: seasonState.champion, saved: (function(){ try { const t = JSON.parse(localStorage.getItem('zpb:season')); return { stage: t.stage, sig: t.sig }; } catch (e) { return null; } })() }));
  ok(comp.phase === 'complete' && comp.champ && comp.saved && comp.saved.stage === 'Champion', 'W85-7 · a completed season autosaves as Champion', JSON.stringify(comp));
  await page.reload(); await sleep(900);
  const bud3 = await page.evaluate(() => { const b = document.getElementById('zpb-savebud'); return { vis: b && !b.hidden, txt: b ? b.textContent.replace(/\s+/g, ' ').trim() : '' }; });
  ok(bud3.vis && /Champion/.test(bud3.txt), 'W85-7 · the bubble offers the champion season, not a dead week', bud3.txt.slice(0, 110));
  await page.evaluate(() => { const b = document.querySelector('#zpb-savebud [data-zbud="go"]'); if (b) b.click(); });
  await sleep(1300);
  await page.evaluate(QUIET);
  const rest2 = await page.evaluate(() => ({ y: window.scrollY, phase: seasonState.phase, champ: !!seasonState.champion, banner: !!document.querySelector('.champion-banner') }));
  ok(rest2.phase === 'complete' && rest2.champ && rest2.banner && rest2.y === 0, 'W85-7 · the Owner\u2019s glitch is dead: restore lands on the champion page at the top, never week 2', JSON.stringify(rest2));

  // ---------- W85-7 · New Draft clears the save; reload shows no bubble ----------
  await page.evaluate(() => { try { startNewDraftFlow(); } catch (e) {} });
  await sleep(600);
  const cleared = await page.evaluate(() => ({ gone: localStorage.getItem('zpb:season') === null, home: document.body.getAttribute('data-home') }));
  ok(cleared.gone, 'W85-7 · New Draft clears the save', JSON.stringify(cleared));
  await page.reload(); await sleep(1100);
  const noBud = await page.evaluate(() => { const b = document.getElementById('zpb-savebud'); return b ? !!b.hidden || !b.textContent : true; });
  ok(noBud, 'W85-7 · no bubble after New Draft — the dead season stays buried');

  // ---------- errors ----------
  ok(errors.length === 0, 'zero page errors across the whole battery', errors.join(' | ').slice(0, 300));

  console.log(`\nw85_battery: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('HARNESS FAIL', String(e).slice(0, 400)); process.exit(1); });
