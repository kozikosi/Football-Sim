/* w85_shots.js — the evidence pass: every touched screen, desktop 1280 + one light-theme check */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w85/Football-Sim-Z-post-blue-w85.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const OUT = '/home/z/my-project/w85/shots/';
const fs = require('fs');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(700);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  const shot = async (name, opts = {}) => {
    await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-fin,.zpb-story-veil,.confirm-ov,.zpb-replay-ov,.zpb-prematch').forEach(o => o.remove()); window.__zpbQuietSim = true; } catch (e) {} });
    await page.waitForTimeout(600);
    if (opts.scroll) await page.evaluate((y) => window.scrollTo(0, y), opts.scroll || 0);
    await page.waitForTimeout(250);
    await page.screenshot({ path: OUT + name, fullPage: !!opts.full });
    console.log('shot', name);
  };

  // draft to the end
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 50; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 32); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(1000);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.__zpbDraftDone = true; startSeason(); renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1800);

  // 1 · preseason: cutdown day + banner
  await shot('e1-preseason-cutdown.png', { scroll: 0 });

  // 2 · preseason scrolled deep — banner still hovering
  await page.evaluate(() => { const b = document.querySelector('#zpb-stagebar [data-zsb="beginseason"]'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await shot('e2-week1-top.png', { scroll: 0 });
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(300);
  await page.screenshot({ path: OUT + 'e3-week1-deep-banner.png' });
  console.log('shot e3-week1-deep-banner.png');

  // 3 · guide page — Back to Week 1
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await shot('e4-guide-backto.png', { scroll: 0 });

  // 4 · play week 1 → results: box score border + key players + badges
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(500);
  await page.evaluate(() => { try { window.__zpbQuietSim = true; } catch (e) {} });
  await page.evaluate(() => { try { simulateCurrentWeek(); renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1400);
  await shot('e5-week1-result-top.png', { scroll: 0 });

  // 5 · advance to week 2 → preview page: matchup card, star cards, badges
  await page.evaluate(() => { try { advanceWeek(); renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1200);
  await shot('e6-week2-preview.png', { scroll: 0 });

  // 6 · the autosave bubble on a fresh boot (recreate: save + reload)
  await page.evaluate(() => { try { window.zpbAutosaveTick(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(1400);
  await shot('e7-restore-bubble.png', { scroll: 0 });

  // restore → playoffs: seeds + banner; then the pregame cinematic
  await page.evaluate(() => { const b = document.querySelector('#zpb-savebud [data-zbud="go"]'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { window.__zpbQuietSim = true; simRestOfSeason(); } catch (e) {} });
  await page.waitForTimeout(1800);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-story-veil').forEach(o => o.remove()); renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    try {
      const conf = conferenceOfTeam(seasonUserTeam());
      const st = computeStandings(seasonState.schedule, teamNames());
      if (!seasonState.seeds[conf].some(x => x.team === seasonUserTeam())) seasonState.seeds[conf][6] = Object.assign({}, st[seasonUserTeam()], { team: seasonUserTeam(), seed: 7 });
      startPlayoffs();
      renderSeasonTab(document.getElementById('draftResultsBody') || document.body);
    } catch (e) {}
  });
  await page.waitForTimeout(1200);
  await shot('e8-wildcard-seeds.png', { scroll: 0 });

  // 7 · the playoff pregame cinematic — key players inside the panel
  await page.evaluate(() => { try { window.__zpbQuietSim = false; } catch (e) {} });
  await page.evaluate(() => { try { simulatePlayoffRound(); } catch (e) {} });
  await page.waitForTimeout(6500);
  await page.evaluate(() => { try { const ov = document.querySelector('.zpb-replay-ov'); if (ov) ov.style.paddingTop = '0px'; } catch (e) {} });
  await page.screenshot({ path: OUT + 'e9-pregame-cine.png' });
  console.log('shot e9-pregame-cine.png');

  // 8 · light theme: the banner and the box score read on the light surface too
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + 'e10-light-theme.png' });
  console.log('shot e10-light-theme.png');
  console.log('page errors:', errors.length ? errors.join(' | ') : 'none');
  await browser.close();
})().catch(e => { console.log('HARNESS FAIL', String(e).slice(0, 400)); process.exit(1); });
