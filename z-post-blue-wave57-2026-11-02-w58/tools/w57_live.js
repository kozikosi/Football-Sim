/* w57_live.js — the Owner's round-57 desktop battery (1280px)
 * D1 BEGIN PLAYOFFS wears the SIM PLAYOFFS pill on the real review · D2 the sim-playoffs run
 * cine flows INTO the champion storm (the storm mounts under the run overlay, no dead air,
 * the page underneath never shows) · D3 the desktop linescore markup is byte-identical to w56
 * for a regulation game · D4 the preview pairs two-across on desktop (untouched) · D5 zero page errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w57.html';
const FILE56 = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w56.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave57-2026-11-02-w57/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

async function driveToReview(page) {
  // draft → season → sim season (A9 caution confirmed) → the regular review; returns made-playoffs
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  const TEAM = driveToReview._team || 'San Francisco 49ers';
  await page.evaluate(t => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = t; s.dispatchEvent(new Event('change', { bubbles: true })); } }, TEAM);
  await page.waitForTimeout(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(350); }
  await page.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(350); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(450);
  await page.evaluate(() => { const y = document.querySelector('[data-ss="yes"]'); if (y) y.click(); }); // the A9 caution asks first
  await page.waitForTimeout(2400);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(900);
  return page.evaluate(() => ({ made: !!document.getElementById('beginPlayoffsBtn'), review: !!document.getElementById('simPlayoffsBtn') }));
}

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];

  // ---------- D3 (no season needed): the linescore markup vs w56 ----------
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', e => errors.push('cmp: ' + String(e).slice(0, 120)));
    const grab = async (file) => {
      await page.goto(file); await page.waitForTimeout(700);
      return page.evaluate(() => {
        const g = { away: 'Carolina Panthers', home: 'Seattle Seahawks', result: { ot: false, awayQ: [0, 7, 0, 3], homeQ: [3, 0, 7, 3], awayScore: 10, homeScore: 13 } };
        const host = document.createElement('div'); host.style.cssText = 'position:fixed;left:-9999px;width:600px;';
        host.innerHTML = renderLineScoreHTML(g); document.body.appendChild(host);
        const h = host.innerHTML; host.remove(); return h;
      });
    };
    const a = await grab(FILE56), b = await grab(FILE);
    ok(a === b, 'D3 · the regulation linescore markup is byte-identical to w56', a === b ? '' : 'MARKUP DIFFERS');
    await page.close();
  }

  // ---------- the season drive (up to three drafts — a team can miss the field) ----------
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  page.on('pageerror', e => errors.push('live: ' + String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  let made = false, review = false;
  const TEAMS = ['Kansas City Chiefs', 'Detroit Lions', 'Buffalo Bills', 'Baltimore Ravens', 'Philadelphia Eagles', 'San Francisco 49ers'];
  for (let attempt = 0; attempt < TEAMS.length && !made; attempt++) {
    driveToReview._team = TEAMS[attempt];
    const r = await driveToReview(page);
    made = r.made; review = r.review || review;
    console.log(`   [drive ${attempt + 1} · ${TEAMS[attempt]}] made=${made} review=${r.review}`);
  }
  ok(review, 'D1 · the regular review reached (SIM SEASON → review)');

  if (!made) {
    // the instant CPU draft left every user roster mediocre — the battery doctored the seed
    // (test-only): the user's team takes the top seed so the REAL begin-playoffs path runs.
    await page.evaluate(() => {
      const user = seasonUserTeam(), conf = conferenceOfTeam(user);
      seasonState.seeds[conf][0] = { seed: 1, team: user, wins: 13, losses: 4, ties: 0 };
      const host = document.getElementById('seasonHost') || document.getElementById('draftResultsBody');
      if (typeof renderSeasonTab === 'function' && host) renderSeasonTab(host);
    });
    await page.waitForTimeout(900);
    made = await page.evaluate(() => !!document.getElementById('beginPlayoffsBtn'));
    console.log('   [seeded] made=' + made);
  }

  if (made) {
    // D1 · BEGIN PLAYOFFS wears the SIM PLAYOFFS pill on the real review
    const d1 = await page.evaluate(() => {
      const bp = document.getElementById('beginPlayoffsBtn'), sp = document.getElementById('simPlayoffsBtn');
      const a = getComputedStyle(bp), b = getComputedStyle(sp);
      return { fs: [a.fontSize, b.fontSize], pad: [a.padding, b.padding], bg: [a.backgroundImage.slice(0, 34), b.backgroundImage.slice(0, 34)], color: [a.color, b.color] };
    });
    ok(d1.fs[0] === d1.fs[1] && d1.pad[0] === d1.pad[1], 'D1 · BEGIN PLAYOFFS matches SIM PLAYOFFS size on the real review', JSON.stringify(d1.fs) + ' ' + JSON.stringify(d1.pad));
    ok(d1.bg[0] === d1.bg[1] && d1.bg[0].includes('linear-gradient'), 'D1 · and wears the same gold pill', JSON.stringify(d1.bg));
    await page.screenshot({ path: SHOTS + '/w57-1280-review-buttons.png' });

    // D2 · the sim-playoffs run cine flows INTO the champion storm
    await page.evaluate(() => { const b = document.getElementById('simPlayoffsBtn'); if (b) b.click(); });
    let porunSeen = false, overlap = false, porunGoneAfterStorm = false;
    for (let i = 0; i < 90; i++) {
      const st = await page.evaluate(() => ({ porun: !!document.querySelector('.zpb-porun'), sbfin: !!document.querySelector('.zpb-sbfin') }));
      if (st.porun) porunSeen = true;
      if (st.porun && st.sbfin) overlap = true;
      if (st.sbfin && !st.porun && porunSeen) { porunGoneAfterStorm = true; break; }
      await page.waitForTimeout(300);
    }
    ok(porunSeen, 'D2 · the playoff-run cine mounts (your results first — the w47 law)');
    ok(overlap, 'D2 · the champion storm mounts UNDER the run cine — the two overlap, no dead air');
    ok(porunGoneAfterStorm, 'D2 · the run overlay fades into the storm; the storm stays');
    await page.waitForTimeout(900);
    await page.screenshot({ path: SHOTS + '/w57-1280-sb-storm.png' });
    const d2z = await page.evaluate(() => {
      const sb = document.querySelector('.zpb-sbfin');
      return sb ? { opaque: getComputedStyle(sb).opacity === '1', bg: getComputedStyle(sb).backgroundImage.includes('radial-gradient') } : null;
    });
    ok(d2z && d2z.opaque && d2z.bg, 'D2 · the storm is opaque from its first frame (the page underneath never shows)');
    await page.evaluate(() => { const b = document.querySelector('.zpb-sbfin-go'); if (b) b.click(); });
    await page.waitForTimeout(900);
  } else {
    // the no-story path still owes the storm — verify it directly
    await page.evaluate(() => { const b = document.getElementById('simPlayoffsBtn'); if (b) b.click(); });
    let storm = false;
    for (let i = 0; i < 40; i++) { storm = await page.evaluate(() => !!document.querySelector('.zpb-sbfin')); if (storm) break; await page.waitForTimeout(300); }
    ok(storm, 'D2 · (missed field) the storm still mounts on the sim-playoffs path');
    await page.evaluate(() => { const b = document.querySelector('.zpb-sbfin-go'); if (b) b.click(); });
  }

  ok(errors.length === 0, 'D5 · zero page errors across the battery', errors.join(' | ').slice(0, 220));
  await browser.close();
  console.log(`w57_live: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('RIG ERROR', e); process.exit(1); });
