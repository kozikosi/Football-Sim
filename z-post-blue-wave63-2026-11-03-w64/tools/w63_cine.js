/* w60_cine.js — the REAL cinematic flow on the w60 law (390)
 * C0 the season starts · C1 the game cinematic mounts · C2 the lock · C3 the accident click
 * still does nothing · C4 THE NEW EXIT LAW: a click on the dim does NOTHING, Escape does
 * NOTHING, and the only doors are Skip → Continue · C5 the page is live after ·
 * C6 the dark-theme shimmer · C8 the pregame key players are FACE-OFF ROWS in flow below the
 * static block (never covering it) · C9 THE ADVANCE RAIL mirrors the CTA and its click acts ·
 * C10 the playoffs buttons: BEGIN PLAYOFFS shimmers, SIM PLAYOFFS is a ghost ·
 * C11 the review's footer pair reads RUN IT BACK · SAME ROSTER / NEW DRAFT · zero errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w63/Football-Sim-Z-post-blue-w63.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/work/w63/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 100)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // draft as the 49ers, instant, to the end
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.waitForTimeout(300);
  await page.evaluate(() => document.getElementById('startDraftBtn').click());
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { document.querySelector('.zpb-fin .zpb-fin-go') ? document.querySelector('.zpb-fin .zpb-fin-go').click() : document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(300); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(5500);
  const seasonStarted = await page.evaluate(() => !!document.getElementById('simWeekBtn'));
  ok(seasonStarted, 'C0 the season starts after the draft', '');

  // C9 · THE ADVANCE RAIL mirrors the hub CTA and its click acts
  const rail1 = await page.evaluate(() => {
    const rail = document.getElementById('zpbAdvRail');
    const btn = document.getElementById('simWeekBtn');
    if (!rail || !btn) return { rail: !!rail, btn: !!btn };
    const clone = rail.querySelector('button');
    return { rail: true, shown: getComputedStyle(rail).display !== 'none',
      label: clone ? clone.textContent.replace(/\s+/g, ' ').trim() : null,
      src: btn.textContent.replace(/\s+/g, ' ').trim(),
      onBody: document.body.classList.contains('zpb-advrail'),
      realVisible: btn.getBoundingClientRect().top < innerHeight && btn.getBoundingClientRect().bottom > 0 };
  });
  ok(rail1.rail && rail1.onBody && (!rail1.realVisible || !rail1.shown), 'C9a the rail steps aside while the real CTA is on screen (w63, Muse P1)', JSON.stringify(rail1).slice(0, 140));
  ok(rail1.label === rail1.src, 'C9b the rail mirrors the CTA label', rail1.label + ' / ' + rail1.src);

  // C9c · scrolled past the real CTA the rail is up again (the w63 law, both directions)
  await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); window.scrollTo(0, b ? Math.round(b.getBoundingClientRect().top + scrollY + 160) : 700); }); // scroll PAST the CTA (a fixed 700 leaves it in view on the tall phone hub)
  await page.waitForTimeout(500);
  const railUp = await page.evaluate(() => { const r = document.getElementById('zpbAdvRail'); return !!r && getComputedStyle(r).display !== 'none'; });
  ok(railUp, 'C9c scrolled past the CTA the rail is up (w63)', '');

  // C1 · play the week THROUGH THE RAIL CLONE — the mirror click must act like the original
  const cloneInfo = await page.evaluate(() => {
    const c = document.querySelector('#zpbAdvRail button');
    if (!c) return null;
    c.scrollIntoView({ block: 'center' });
    const r = c.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  });
  ok(!!cloneInfo, 'C1a the rail clone is clickable', '');
  await page.mouse.click(cloneInfo.x, cloneInfo.y);
  await page.waitForTimeout(900);
  const state1 = await page.evaluate(() => ({
    cine: document.body.classList.contains('zpb-cinelock'), inert: document.querySelector('.wrap').inert === true,
    prematch: !!document.querySelector('.zpb-prematch'), replay: !!document.querySelector('.zpb-replay-ov')
  }));
  ok(state1.cine && state1.inert, 'C2 the lock is ON during the game cinematics', JSON.stringify(state1));
  let replayUp = state1.replay;
  for (let i = 0; i < 16 && !replayUp; i++) { replayUp = await page.evaluate(() => !!document.querySelector('.zpb-replay-ov')); if (replayUp) break; await page.waitForTimeout(500); }
  ok(replayUp, 'C2b the game replay cinematic mounts (via the rail click)', '');

  // C8 · the pregame key players are FACE-OFF ROWS in flow, below the static block
  const intro = await page.evaluate(() => {
    const stars = document.querySelectorAll('.zpb-intro-star');
    const brows = document.querySelectorAll('.zpb-intro-brow');
    if (!stars.length) return { stars: 0 };
    const first = stars[0], sub = document.querySelector('.zpb-intro-sub') || document.querySelector('.zpb-intro-logos');
    const fr = first.getBoundingClientRect(), sr = sub ? sub.getBoundingClientRect() : null;
    return { stars: stars.length, brows: brows.length,
      pos: getComputedStyle(first).position,
      below: sr ? (fr.top >= sr.bottom - 2) : null,
      topGap: sr ? Math.round(fr.top - sr.bottom) : null };
  });
  ok(intro.stars >= 2 && intro.brows >= 1, 'C8a the key players render as face-off rows', JSON.stringify(intro));
  ok(intro.pos === 'static', 'C8b the star cards are FLOW, not floating', intro.pos);
  ok(intro.below === true, 'C8c the rows sit BELOW the static pregame screen, never over it', 'gap=' + intro.topGap + 'px');
  await page.screenshot({ path: SHOTS + '/w60-intro-rows-390.png' });

  // C3 · the accident click behind the cinematic still does nothing (the w59 lock holds)
  const season = await page.evaluate(() => {
    const b = document.getElementById('simSeasonBtn') || document.getElementById('simSeasonBtnFoot') || document.getElementById('nextWeekBtn') || document.getElementById('simWeekBtn'); // w63: the CTAs moved — any season button proves the lock
    if (!b) return null;
    b.scrollIntoView({ block: 'center' });
    const r = b.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  });
  const weekRead = () => page.evaluate(() => { const h = document.querySelector('.view.active h3'); return h ? h.textContent.trim().slice(0, 22) : '(none)'; });
  if (season) {
    const before = await weekRead();
    await page.mouse.click(season.x, season.y);
    await page.waitForTimeout(700);
    ok(before === await weekRead() && await page.evaluate(() => !!document.querySelector('.zpb-replay-ov')), 'C3 the accident click did NOTHING to the season', before + ' -> ' + await weekRead());
  } else ok(false, 'C3 no season CTA found', '');

  // C4 · THE NEW EXIT LAW — the dim and Escape are NOT exits; Skip → Continue are the doors
  const dim = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-replay-ov');
    const r = ov.getBoundingClientRect();
    return { x: Math.round(r.left + 18), y: Math.round(r.top + Math.round(r.height * 0.5)) };
  });
  await page.mouse.click(dim.x, dim.y);
  await page.waitForTimeout(600);
  const afterDim = await page.evaluate(() => ({ replay: !!document.querySelector('.zpb-replay-ov'), lock: document.body.classList.contains('zpb-cinelock') }));
  ok(afterDim.replay && afterDim.lock, 'C4a a click on the dim does NOTHING — the cinematic stays up', JSON.stringify(afterDim));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  const afterEsc = await page.evaluate(() => ({ replay: !!document.querySelector('.zpb-replay-ov'), lock: document.body.classList.contains('zpb-cinelock') }));
  ok(afterEsc.replay && afterEsc.lock, 'C4b Escape does NOTHING — the cinematic stays up', JSON.stringify(afterEsc));

  // the doors: Skip (twice if the intro eats the first), then Continue
  await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
  let goUp = false;
  for (let i = 0; i < 14 && !goUp; i++) { goUp = await page.evaluate(() => { const g = document.getElementById('zrepGo'); return !!(g && g.offsetParent !== null); }); if (goUp) break; await page.waitForTimeout(500); }
  ok(goUp, 'C4c Skip flushes the report and CONTINUE appears', '');
  await page.evaluate(() => { const g = document.getElementById('zrepGo'); if (g) g.click(); });
  await page.waitForTimeout(2200);
  const settled = await page.evaluate(() => ({
    anyCine: !!document.querySelector('.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-restov,.zpb-fin'),
    lock: document.body.classList.contains('zpb-cinelock'), shield: !!document.querySelector('.zpb-clickshield')
  }));
  ok(!settled.anyCine && !settled.lock && !settled.shield, 'C5 the page is live again after Skip → Continue', JSON.stringify(settled));

  // C9c · the rail mirrors the RESULTS screen's CTA and its click advances the week
  const rail2 = await page.evaluate(() => {
    const rail = document.getElementById('zpbAdvRail');
    const src = document.getElementById('nextWeekBtn');
    const clone = rail && rail.querySelector('button');
    return { shown: rail && getComputedStyle(rail).display !== 'none',
      label: clone ? clone.textContent.replace(/\s+/g, ' ').trim() : null,
      src: src ? src.textContent.replace(/\s+/g, ' ').trim() : null,
      realVisible: src ? (src.getBoundingClientRect().top < innerHeight && src.getBoundingClientRect().bottom > 0) : false };
  });
  ok(rail2.label === rail2.src && (!rail2.realVisible || !rail2.shown), 'C9c the rail re-mirrors the results CTA and steps aside while it is on screen (w63)', JSON.stringify(rail2));
  const wkBefore = await page.evaluate(() => seasonState.currentWeek + '/' + seasonState.weekSimulated);
  await page.evaluate(() => { const c = document.querySelector('#zpbAdvRail button'); if (c) c.click(); });
  await page.waitForTimeout(1800);
  const wkAfter = await page.evaluate(() => seasonState.currentWeek + '/' + seasonState.weekSimulated);
  ok(wkBefore !== wkAfter, 'C9d the rail clone click ADVANCES the week', wkBefore + ' -> ' + wkAfter);

  // C10 · the playoffs buttons on the review: SIM the rest of the season
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { // a caution may ask first — answer yes
    const ov = document.querySelector('.zpb-caution-ov, .confirm-ov');
    if (ov) { const yes = ov.querySelector('.resetbtn') || ov.querySelector('button'); if (yes) yes.click(); }
  });
  await page.waitForTimeout(3200);
  // the instant draft is unseeded — guarantee the user's team made the playoffs so the
  // review renders both buttons (the battery seeds-doctor, exactly like the w57 rig)
  await page.evaluate(() => {
    const user = seasonUserTeam();
    ['AFC', 'NFC'].forEach(conf => {
      const arr = (seasonState.seeds && seasonState.seeds[conf]) || null;
      if (arr && arr.length && !arr.some(x => x.team === user)) { arr[3] = { team: user, seed: 4 }; }
    });
    const container = document.getElementById('seasonHost') || document.querySelector('.view.active');
    if (container && typeof renderSeasonTab === 'function') renderSeasonTab(container);
  });
  await page.waitForTimeout(1200);
  const po = await page.evaluate(() => {
    const bp = document.getElementById('beginPlayoffsBtn'), sp = document.getElementById('simPlayoffsBtn');
    if (!bp || !sp) return { bp: !!bp, sp: !!sp };
    const bcs = getComputedStyle(bp), scs = getComputedStyle(sp);
    return { bp: true, sp: true,
      anim: bcs.animationName, size: bcs.backgroundSize,
      spBg: scs.backgroundColor, spImg: scs.backgroundImage, spShadow: scs.boxShadow, spAnim: scs.animationName };
  });
  ok(po.bp && po.sp, 'C10a both playoffs buttons render on the review', JSON.stringify(po).slice(0, 80));
  ok(po.anim === 'zpbbtnshine', 'C10b BEGIN PLAYOFFS wears the moving shimmer', po.anim + ' / ' + po.size);
  ok(String(po.size).includes('220%'), 'C10c the sweep has its 220% background', String(po.size));
  ok(po.spImg === 'none' && (po.spBg === 'rgba(0, 0, 0, 0)' || po.spBg === 'transparent'), 'C10d SIM PLAYOFFS is not colored in at all', po.spBg + ' / ' + po.spImg);
  ok(po.spAnim === 'none' && po.spShadow === 'none', 'C10e SIM PLAYOFFS: no animation, no shadow', po.spAnim + ' / ' + po.spShadow);
  await page.screenshot({ path: SHOTS + '/w60-review-390.png' });

  // C11 · the review's footer pair reads the new labels, SAME ROSTER on its own line at 390
  const foot = await page.evaluate(() => {
    const a = document.getElementById('restartSeasonBtn'), b = document.getElementById('newDraftFromSeasonBtn');
    if (!a || !b) return { found: false };
    const line = a.querySelector('.zpb-rosterline');
    const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
    return { found: true, a: a.textContent.replace(/\s+/g, ' ').trim(), b: b.textContent.trim(),
      lineDisp: getComputedStyle(line).display, sameRow: Math.abs(ar.top - br.top) < 4 };
  });
  ok(foot.found && foot.a === 'RUN IT BACK · SAME ROSTER' && foot.b === 'NEW DRAFT', 'C11a the review footer reads the new pair', JSON.stringify(foot).slice(0, 120));
  ok(foot.lineDisp === 'block', 'C11b SAME ROSTER sits on its own line at 390', foot.lineDisp);
  ok(foot.found && !foot.sameRow, 'C11c the pair stacks vertically on the phone', 'sameRow=' + foot.sameRow);

  // C6 · the dark-theme shimmer
  await page.evaluate(() => { document.getElementById('themeToggleBtn').click(); });
  await page.waitForTimeout(800);
  await page.evaluate(() => document.getElementById('tabRankingsBtn').click());
  await page.waitForTimeout(700);
  const dark = await page.evaluate(() => {
    const el = document.querySelector('#resultsBody .zpb-shm');
    if (!el) return { found: false };
    return { found: true, clip: getComputedStyle(el).webkitBackgroundClip || getComputedStyle(el).backgroundClip };
  });
  ok(dark.found && dark.clip === 'text', 'C6 the dark-theme shimmer keeps background-clip:text', JSON.stringify(dark));

  ok(errors.length === 0, 'C7 zero page errors through the whole flow', errors.join(' | ').slice(0, 160));
  await browser.close();
  console.log(`\nw63_cine: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
