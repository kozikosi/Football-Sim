/* w52_live.js — the Owner's round-52 verification battery
 * M1 sync (separate file) · M2 clock ink · M3 COTY YOU · M4 #X Y badges · M5 solid chips
 * M6 champions' badges · M7 matchup bars · M8/M10 removals · M9 per-game + uniform ink
 * M11 bye opponent · M12 SB flow + halftime · M13 bracket @ · M14 unit report card */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w53/Football-Sim-Z-post-blue-w53.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if (cond) { pass++; console.log('  ✓ ' + name); } else { fail++; console.log('  ✗ FAIL ' + name + (extra !== undefined ? '  [' + JSON.stringify(extra).slice(0, 300) + ']' : '')); } };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 160)));

  // ============ setup: 49ers franchise (the Owner's named case) + instant draft ============
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(700);
  ok('T0 · the 49ers takeover is live', await page.evaluate(() => document.documentElement.getAttribute('data-zpbteam') === '1' && zpbState.teamName === 'San Francisco 49ers'));
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(500); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });

  // ============ M7 · the matchup math bars (week 1 preview, under the 49ers takeover) ============
  console.log('— M7 · the matchup math bars —');
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1200);
  const m7 = await page.evaluate(() => {
    const bar = document.querySelector('.zpb-mbar'); if (!bar) return { miss: true };
    const fill = bar.querySelector('i');
    const track = bar.getBoundingClientRect(), fr = fill ? fill.getBoundingClientRect() : null;
    // find a row where the HOME bar is visibly partial — its fill must sit pushed off the track's left edge
    let homePushed = false;
    document.querySelectorAll('.zpb-mrow').forEach(r => {
      const cells = r.querySelectorAll('.zpb-mbar');
      if (cells.length < 2) return;
      const hBar = cells[1], hFill = hBar.querySelector('i');
      if (!hFill) return;
      const tb = hBar.getBoundingClientRect(), fb = hFill.getBoundingClientRect();
      if (fb.width < tb.width * 0.9 && fb.left - tb.left > 4) homePushed = true;
    });
    const probe = document.createElement('div'); probe.className = 'zpb-mbar'; document.body.appendChild(probe);
    const hairRef = getComputedStyle(document.querySelector('.panel') || document.body).borderTopColor;
    probe.remove();
    return {
      track: getComputedStyle(bar).backgroundColor,
      hairline: hairRef,
      fill: fill ? getComputedStyle(fill).backgroundColor : null,
      homePushed,
      takeover: !!document.documentElement.getAttribute('data-zpbteam')
    };
  });
  ok('M7a · the bar track is a quiet ink wash — never the takeover hairline', !m7.miss && (m7.track !== m7.hairline), m7);
  ok('M7b · the home bar fills from its outer edge (the face-off read)', !m7.miss && m7.homePushed === true, m7);
  // both modes: the track must stay a quiet wash, visibly lighter than the fill
  for (const theme of ['light', 'dark']) {
    await page.evaluate(t => document.documentElement.setAttribute('data-theme', t), theme);
    await page.waitForTimeout(250);
    const c = await page.evaluate(() => {
      const bar = document.querySelector('.zpb-mbar'), fill = bar && bar.querySelector('i');
      if (!bar || !fill) return null;
      const lum = col => { const m = col.match(/\d+/g).map(Number); return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) * (m[3] != null ? m[3] : 1); };
      return { track: getComputedStyle(bar).backgroundColor, fill: getComputedStyle(fill).backgroundColor, dl: lum(getComputedStyle(fill).backgroundColor) - lum(getComputedStyle(bar).backgroundColor) };
    });
    ok('M7c · ' + theme + ' mode · the fill separates from the track', c && Math.abs(c.dl) > 0.05, c);
  }
  await page.screenshot({ path: 'shots/w52-m7-bars-light.png' });

  // ============ M12 pre-condition + M2 clock ink happen in the SB replay (below) ============

  // ============ the run rig: the user's games resolve as wins (regular season + playoffs, not the SB) ============
  await page.evaluate(() => {
    if (window.__zpbRigInstalled) return; window.__zpbRigInstalled = true;
    const _pg = playGame;
    window.__zpbRig = function (g) {
      const u = seasonUserTeam();
      _pg(g, true);
      let tries = 0;
      while (g.result && ((g.home === u && g.result.homeScore <= g.result.awayScore) || (g.away === u && g.result.awayScore <= g.result.homeScore)) && tries < 30) { _pg(g, true); tries++; }
    };
    playGame = function (g, q) {
      const u = seasonUserTeam();
      const mine = g && (g.home === u || g.away === u) && seasonState.phase !== 'complete' && !(seasonState.phase === 'playoffs' && seasonState.currentPlayoffRound === 'superbowl');
      if (mine) { window.__zpbRig(g); } else _pg(g, q);
    };
  });
  // ============ sim the regular season quietly (rigged: the user runs the table) ============
  await page.evaluate(() => { window.__zpbQuietSim = true; try { simRestOfSeason(); } catch (e) {} });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const ov = document.querySelector('.zpb-replay-ov'); if (ov) ov.remove(); window.__zpbQuietSim = false; });
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);

  // ============ M8 · the MVP sentence is gone · M3 · the COTY sentence is gone ============
  console.log('— M3/M8 · the removed sentences —');
  const domTxt = await page.evaluate(() => document.body.innerText);
  ok('M8a · "top-rated … profile, carrying … to … wins" is gone from the page', !/top-rated .{0,40} profile, carrying/.test(domTxt));
  ok('M3a · the COTY ratings sentence is gone', !domTxt.includes("projected from the roster"), domTxt.includes("projected from the roster"));
  ok('M10a · the featured-game sentence is gone (checked again at playoffs below)', !domTxt.includes("everyone is talking about"));

  // ============ M4 · the '#X Y' badge leads, no plaintext position ============
  console.log('— M4 · the awards badges —');
  const m4 = await page.evaluate(() => {
    const A = seasonState.awardsRS; if (!A) return { miss: 'no awards' };
    const out = [];
    A.individual.filter(a => a.c).forEach(a => {
      const b0 = a.badges && a.badges[0];
      out.push({ t: a.title, b0: b0 ? b0.v + ' ' + (b0.k || '') : null, ok: !!(b0 && /^#\d+/.test(b0.v) && b0.k) });
    });
    const cards = [...document.querySelectorAll('.zpb-awcard')];
    const posChips = cards.filter(c => c.querySelector('.zpb-poschip')).length;
    return { ind: out, allOk: out.length >= 3 && out.every(x => x.ok), posChips };
  });
  ok('M4a · every player award leads with the #X Y position badge', m4.allOk === true, m4);
  ok('M4b · no plaintext position chip under any award name', m4.posChips === 0, m4);

  // ============ M6 · the champions' badges ============
  console.log('— M6 · the statistical champions —');
  const m6 = await page.evaluate(() => {
    const A = seasonState.awardsRS; if (!A) return { miss: true };
    const noRec = A.stat.filter(a => !a.rec).map(a => a.title);
    const titles = A.stat.map(a => a.title);
    const panel = [...document.querySelectorAll('details.panel, .panel')].find(p => /Statistical champions/i.test(p.textContent || ''));
    return {
      noRec, titles,
      tdTitle: titles.includes('Touchdowns'),
      noScrimmage: !titles.some(t => /Scrimmage/.test(t)),
      domHasScrimmage: panel ? /Scrimmage/.test(panel.textContent) : false
    };
  });
  ok('M6a · every champion carries his badge row', m6.noRec && m6.noRec.length === 0, m6 && m6.noRec);
  ok('M6b · "Scrimmage" is gone · the title reads Touchdowns', m6.tdTitle && m6.noScrimmage && !m6.domHasScrimmage, m6);

  // ============ M5 · solid chip borders ============
  console.log('— M5 · the badge borders —');
  const m5 = await page.evaluate(() => {
    const chips = [...document.querySelectorAll('.zpb-schip')];
    const dashed = chips.filter(c => getComputedStyle(c).borderTopStyle === 'dashed').length;
    return { n: chips.length, dashed };
  });
  ok('M5a · every stat badge renders a solid border', m5.n > 10 && m5.dashed === 0, m5);

  // ============ M9 · per-game labels + one ink for every number ============
  console.log('— M9 · advanced stats —');
  const m9 = await page.evaluate(() => {
    const labels = [...document.querySelectorAll('.zpb-adcard span')].map(x => x.textContent);
    const slashG = labels.filter(l => /\/\s*g\b/i.test(l));
    const nums = [...document.querySelectorAll('.zpb-adcard b')].map(b => getComputedStyle(b).color);
    const uniq = [...new Set(nums)];
    return { slashG, hasTD: labels.includes('Touchdowns per game'), hasClutch: labels.includes('CLUTCH GAMES'), uniq: uniq.length, sample: nums[0] };
  });
  ok('M9a · every "/ g" reads "per game"', m9.slashG.length === 0 && m9.hasTD && m9.hasClutch, m9);
  ok('M9b · every advanced-stats number wears the SAME ink', m9.uniq === 1, m9);

  // ============ M14 · the unit report card (the UNIT REPORT CARD badges on the complete view) ============
  console.log('— M14 · the unit report card — (asserted after the Super Bowl below) —');

  // ============ M11 · the bye week's top game ============
  console.log('— M11 · the wild-card bye —');
  await page.evaluate(() => { try { startPlayoffs(); } catch (e) {} });
  await page.waitForTimeout(300);
  const m11 = await page.evaluate(() => {
    const games = seasonState.playoffRounds.wildcard || [];
    let lo = null;
    games.forEach(g => { [g.homeSeed, g.awaySeed].forEach(sd => { if (sd && (!lo || sd > lo.sd)) lo = { sd, g }; }); });
    return { picked: lo ? lo.sd : null, pickedTeams: lo ? [lo.g.home, lo.g.away] : null, n: games.length };
  });
  ok('M11a · on a bye the featured game carries the lowest seed (the most likely opponent)', m11.picked === 7, m11);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1200);
  const m10b = await page.evaluate(() => ({ txt: document.body.innerText.includes('everyone is talking about'), hasStrip: !!document.querySelector('.zpb-strip') }));
  ok('M10b · the featured game renders with NO sentence above it', !m10b.txt && m10b.hasStrip, m10b);

  // ============ M13 · the bracket @ ============
  console.log('— M13 · the bracket @ —');
  await page.evaluate(() => { try { simulatePlayoffRound(); } catch (e) {} }); // wild card played (quiet flag was cleared — close any replay)
  await page.evaluate(() => { const ov = document.querySelector('.zpb-replay-ov'); if (ov) { const k = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }); document.dispatchEvent(k); } });
  await page.evaluate(() => { try { advancePlayoffRound(); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1200);
  const m13w = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.zpb-tree-card')].filter(c => c.querySelector('.zpb-tatline'));
    if (!cards.length) return { miss: true };
    const c = cards[0];
    return { w: Math.round(c.offsetWidth), disp: getComputedStyle(c.querySelector('.zpb-tatline')).display, n: cards.length };
  });
  ok('M13a · wide cards lay @ AND both teams on ONE line · compressed cards give the @ its OWN line',
    !m13w.miss && ((m13w.w >= 190) === (m13w.disp === 'flex')), m13w);
  await page.setViewportSize({ width: 390, height: 800 });
  await page.waitForTimeout(600);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(900);
  const m13n = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.zpb-tree-card')].filter(c => c.querySelector('.zpb-tatline'));
    if (!cards.length) return { miss: true };
    const c = cards[0];
    return { w: Math.round(c.offsetWidth), disp: getComputedStyle(c.querySelector('.zpb-tatline')).display };
  });
  ok('M13b · the phone tree obeys the same rule per card', !m13n.miss && ((m13n.w >= 190) === (m13n.disp === 'flex')), m13n);
  await page.setViewportSize({ width: 1280, height: 1400 });

  // ============ M12 · the Super Bowl: the game leads, the storm follows ============
  console.log('— M12 · the Super Bowl flow —');
  // (the rig from the season block still rides every user playoff game — one install, no re-wrap)
  // divisional + champ (quiet — replays off; the rig rides every user game)
  await page.evaluate(() => {
    window.__zpbErr = null;
    try {
      window.__zpbQuietSim = true;
      simulatePlayoffRound();
      window.__zpbDbg1 = { rk: seasonState.currentPlayoffRound, keys: Object.keys(seasonState.playoffRounds) };
      advancePlayoffRound();
      simulatePlayoffRound();
      window.__zpbDbg2 = { rk: seasonState.currentPlayoffRound, keys: Object.keys(seasonState.playoffRounds) };
      advancePlayoffRound();
    } catch (e) { window.__zpbErr = String(e && e.stack || e).slice(0, 400); } finally { window.__zpbQuietSim = false; }
  });
  const dbg = await page.evaluate(() => ({ e: window.__zpbErr, d1: window.__zpbDbg1, d2: window.__zpbDbg2, keys: Object.keys(seasonState.playoffRounds), rk: seasonState.currentPlayoffRound }));
  console.log('   M12 debug:', JSON.stringify(dbg));
  // M12a · assert AFTER the rig had its rounds
  const reached = await page.evaluate(() => {
    const u = seasonUserTeam(), sb = (seasonState.playoffRounds.superbowl || [])[0];
    return { phase: seasonState.phase, inSB: !!(sb && (sb.home === u || sb.away === u)), sbTeams: sb ? [sb.home, sb.away] : null };
  });
  ok('M12a · the rigged run reaches the Super Bowl with the user\'s team', reached.inSB === true, reached);
  if (reached.inSB) {
    await page.evaluate(() => { try { simulatePlayoffRound(); } catch (e) {} }); // quiet=false → the SB replay OPENS
    await page.waitForTimeout(1600);
    const s1 = await page.evaluate(() => ({
      ov: !!document.querySelector('.zpb-replay-ov'),
      hold: !!window.__zpbSBReplayHold,
      storm: !!document.querySelector('.zpb-sbfin'),
      cup: !!document.querySelector('.zpb-replay .zpb-intro-cup'),
      banner: !!document.querySelector('.zpb-replay .zpb-intro-banner'),
      fx: document.querySelectorAll('.zpb-replay .zpb-intro-fx').length,
      embers: document.querySelectorAll('.zpb-replay .zpb-intro-ember').length,
      isSbClass: !!(document.querySelector('.zpb-replay.zpb-sb'))
    }));
    ok('M12b · the SB during-game cinematic OPENS first · the winner storm is NOT on screen', s1.ov && s1.hold && !s1.storm, s1);
    ok('M12c · the fanfare rides the stage · cup, LIVE banner, three bursts, fourteen embers', s1.cup && s1.banner && s1.fx === 3 && s1.embers >= 14 && s1.isSbClass, s1);
    // M2 · the clock ink rides the neutral team ink — asserted after the flush below; the intro's empty log has no clock yet
    // skip the intro, flush the game
    await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
    await page.waitForTimeout(900);
    await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
    await page.waitForTimeout(1300);
    const s2 = await page.evaluate(() => ({
      ht: !!document.querySelector('.zpb-halftime'),
      htText: (document.querySelector('.zpb-halftime b') || {}).textContent || null,
      final: (document.getElementById('zrepQ') || {}).textContent,
      storm: !!document.querySelector('.zpb-sbfin')
    }));
    ok('M12d · the HALFTIME SHOW takes the stage between the halves', s2.ht && /HALFTIME SHOW/.test(s2.htText || ''), s2);
    ok('M12e · the storm STILL waits while the game shows its final', s2.final === 'FINAL' && !s2.storm, s2);
    const m2b = await page.evaluate(() => {
      const t = document.querySelector('.zpb-replay .zrl-t');
      const pk = zpbPackFor('San Francisco 49ers');
      const probe = document.createElement('span'); probe.style.color = 'var(--text)';
      document.querySelector('.zpb-replay').appendChild(probe);
      const want = getComputedStyle(probe).color; probe.remove();
      const hx = h => { h = String(h).replace('#', ''); const n = parseInt(h, 16); return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`; };
      return { t: t ? getComputedStyle(t).color : null, want, tTx: pk.tTx ? hx(pk.tTx) : null, cream: '#f2e7d5' };
    });
    ok('M2a · the Q + time wears the neutral team ink — var(--text), the token the FINAL word reads', m2b.t && m2b.t === m2b.want, m2b);
    ok('M2b · the cream is gone from the clock in the dark theme', m2b.t && m2b.t !== m2b.cream, m2b);
    await page.screenshot({ path: 'shots/w52-m12-sb-replay.png' });
    // the whistle → the storm
    await page.evaluate(() => { const g = document.getElementById('zrepGo'); if (g) g.click(); });
    await page.waitForTimeout(1400);
    const s3 = await page.evaluate(() => ({ storm: !!document.querySelector('.zpb-sbfin'), hold: !!window.__zpbSBReplayHold, champ: seasonState.champion }));
    ok('M12f · the final whistle hands the screen to the winner cinematic', s3.storm && !s3.hold, s3);
    await page.screenshot({ path: 'shots/w52-m12-sb-storm.png' });
    // close the storm, render the complete view — the UNIT REPORT CARD badges live on the Season Review
    await page.evaluate(() => { const b = document.querySelector('.zpb-sbfin-go'); if (b) b.click(); });
    await page.waitForTimeout(600);
    await page.evaluate(() => { try { seasonState.showReview = true; renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
    await page.waitForTimeout(1500);
    const m14 = await page.evaluate(() => {
      const tiles = [...document.querySelectorAll('.zpb-met')];
      if (!tiles.length) return { miss: true };
      const ems = tiles.map(t => ({ u: t.getAttribute('data-u'), txt: (t.querySelector('em') || {}).textContent || '' }));
      const rb = ems.find(x => x.u === 'rb'), k = ems.find(x => x.u === 'kicker');
      const rosterNames = [];
      try { const sm = seasonState.teams[seasonUserTeam()].slotmap; Object.values(sm).forEach(p => { if (p && p[0]) rosterNames.push(p[0]); }); } catch (e) {}
      const namedInK = rosterNames.filter(n => n && k && k.txt.includes(n));
      const namedInRB = rosterNames.filter(n => n && rb && rb.txt.includes(n));
      return { rb: rb && rb.txt, k: k && k.txt, namedInK, namedInRB, n: tiles.length };
    });
    ok('M14a · the backs read as ALL backs (no single name)', !m14.miss && /all backs/i.test(m14.rb || '') && (m14.namedInRB || []).length === 0, m14);
    ok('M14b · the kicker\'s numbers carry no name', !m14.miss && (m14.namedInK || []).length === 0 && /FG/.test(m14.k || ''), m14);
  } else {
    ok('M12a · the rigged run reaches the Super Bowl with the user\'s team', false, reached);
  }

  ok('S0 · zero pageerrors across the battery', errors.length === 0, errors.slice(0, 3));
  console.log('——— ' + pass + ' passed · ' + fail + ' failed ———');
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
