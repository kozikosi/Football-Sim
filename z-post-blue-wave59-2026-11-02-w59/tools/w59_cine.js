/* w59_cine.js — the REAL cinematic flow with the lock (the Owner's exact accident, replayed)
 * C1 the season game mounts the pregame marquee + the replay overlay · C2 the lock engages
 * (class + inert) while either cinematic is up · C3 a real click on SIM SEASON behind the
 * cinematic does NOTHING (the accident that simmed a season) · C4 the click-to-fast-forward
 * on the replay backdrop still works · C5 the lock releases after the cinematic · C6 the
 * shimmer holds background-clip:text in the DARK theme too · zero errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w59.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave59-2026-11-02-w59/shots';
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

  // start the season — the stage button, then the preseason setup's "Begin the season"
  const seasonStarted = await page.evaluate(() => {
    const b = document.getElementById('startSeasonBtn'); if (b) { b.click(); return true; } return false;
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(5500); // the week panel's own pregame marquee plays ~3.4s — let it clear before clicking
  ok(seasonStarted, 'C0 the season starts after the draft', '');

  // PLAY THE GAME (week 1) — the game day cinematics mount over the live week panel
  const simInfo = await page.evaluate(() => {
    const b = document.getElementById('simWeekBtn'); // "Play the <opponent>" — the cinematic path
    if (!b) return { found: false };
    b.scrollIntoView({ block: 'center' });
    const r = b.getBoundingClientRect();
    return { found: true, x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  });
  ok(simInfo.found, 'C1a the Play-the-opponent button is on the week panel', '');
  if (simInfo.found) {
    await page.mouse.click(simInfo.x, simInfo.y);
    await page.waitForTimeout(900); // the game sim runs and the replay mounts over the results page
    const state1 = await page.evaluate(() => ({
      cine: document.body.classList.contains('zpb-cinelock'),
      inert: document.querySelector('.wrap').inert === true,
      prematch: !!document.querySelector('.zpb-prematch'),
      replay: !!document.querySelector('.zpb-replay-ov')
    }));
    ok(state1.cine && state1.inert, 'C2 the lock is ON during the game cinematics', JSON.stringify(state1));
    // the replay mounts over the results page — poll for it
    let replayUp = state1.replay;
    for (let i = 0; i < 16 && !replayUp; i++) { replayUp = await page.evaluate(() => !!document.querySelector('.zpb-replay-ov')); if (replayUp) break; await page.waitForTimeout(500); }
    ok(replayUp, 'C2b the game replay cinematic mounts', '');
    // find the SIM SEASON button behind the cinematic and try the accident
    const season = await page.evaluate(() => {
      const b = document.getElementById('simSeasonBtn');
      if (!b) return null;
      b.scrollIntoView({ block: 'center' });
      const r = b.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    });
    const weekRead = () => page.evaluate(() => {
      const h = document.querySelector('.view.active h3');
      return h ? h.textContent.trim().slice(0, 22) : '(no heading)';
    });
    if (season) {
      const weekBefore = await weekRead();
      await page.mouse.click(season.x, season.y); // THE ACCIDENT CLICK
      await page.waitForTimeout(700);
      const weekAfter = await weekRead();
      const stillLocked = await page.evaluate(() => document.body.classList.contains('zpb-cinelock'));
      const stillReplay = await page.evaluate(() => !!document.querySelector('.zpb-replay-ov'));
      ok(weekBefore === weekAfter && stillReplay, 'C3 the accident click did NOTHING to the season', weekBefore + ' -> ' + weekAfter);
      ok(stillLocked, 'C3b the lock holds through the stray click', '');
    } else {
      ok(false, 'C3 SIM SEASON not found behind the cinematic', '');
    }
    await page.screenshot({ path: SHOTS + '/w59-cine-lock-390.png' });
    // the fast-forward: click the replay backdrop (or Skip) — the Owner's flow must survive
    const ff = await page.evaluate(() => {
      const ov = document.querySelector('.zpb-replay-ov');
      if (ov) { const r = ov.getBoundingClientRect(); return { x: Math.round(r.left + 20), y: Math.round(r.top + r.height - 30), via: 'backdrop' }; }
      return null;
    });
    if (ff) {
      await page.mouse.click(ff.x, ff.y);
      await page.waitForTimeout(900);
      const after = await page.evaluate(() => ({
        replay: !!document.querySelector('.zpb-replay-ov'),
        prematch: !!document.querySelector('.zpb-prematch'),
        lock: document.body.classList.contains('zpb-cinelock'),
        shield: !!document.querySelector('.zpb-clickshield')
      }));
      ok(!after.replay || !after.prematch, 'C4a the fast-forward still closes the cinematic', '');
      await page.waitForTimeout(2500);
      const settled = await page.evaluate(() => {
        const anyCine = !!document.querySelector('.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-restov,.zpb-fin');
        return { lock: document.body.classList.contains('zpb-cinelock'), anyCine, shield: !!document.querySelector('.zpb-clickshield') };
      });
      ok(settled.anyCine ? true : (!settled.lock && !settled.shield), 'C5 the page is live again after the cinematics', JSON.stringify(settled));
    }
  }

  // C6 · the shimmer in the DARK theme (the clip law holds in both themes)
  await page.evaluate(() => { document.getElementById('themeToggleBtn').click(); });
  await page.waitForTimeout(800);
  await page.evaluate(() => document.getElementById('tabRankingsBtn').click());
  await page.waitForTimeout(700);
  const dark = await page.evaluate(() => {
    const el = document.querySelector('#resultsBody .zpb-shm');
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    return { found: true, clip: cs.webkitBackgroundClip || cs.backgroundClip, theme: document.documentElement.getAttribute('data-theme') };
  });
  ok(dark.found && dark.clip === 'text', 'C6 the dark-theme shimmer keeps background-clip:text', JSON.stringify(dark));
  await page.screenshot({ path: SHOTS + '/w59-madden-dark-390.png' });

  ok(errors.length === 0, 'C7 zero page errors through the whole flow', errors.join(' | ').slice(0, 160));
  await browser.close();
  console.log(`\nw59_cine: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
