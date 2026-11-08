/* w85r2_shots.js — the round-2 evidence pass: every touched screen, light + dark */
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
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  const QUIET = `try{ window.__zpbQuietSim = true; document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-fin,.zpb-story-veil,.confirm-ov,.zpb-replay-ov,.zpb-prematch').forEach(o=>o.remove()); window.__zpbStoryHold=false; window.__zpbSBFinPending=false; window.__zpbPoRunHold=false; }catch(e){}`;
  const host = `document.getElementById('seasonHost') || document.getElementById('draftResultsBody') || document.body`;
  const shot = async (name, opts = {}) => {
    await page.evaluate(QUIET);
    await page.waitForTimeout(500);
    if (opts.scroll) await page.evaluate((y) => window.scrollTo(0, y), opts.scroll || 0);
    await page.waitForTimeout(300);
    await page.screenshot({ path: OUT + name, fullPage: !!opts.full });
    console.log('shot', name);
  };

  // ---------- draft: the chips law + the filled selection ----------
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await shot('r2-01-board-chips-off.png', { scroll: 0 });
  await page.evaluate(() => { const c = document.querySelector('#draftChips [data-tog="WR"]'); if (c) c.click(); });
  await page.waitForTimeout(500);
  await shot('r2-02-board-chip-wr-on.png', { scroll: 0 });
  await page.evaluate(() => { const c = document.querySelector('#draftChips [data-tog="QB"]'); if (c) c.click(); });
  await page.waitForTimeout(500);
  await shot('r2-03-board-qb-and-wr.png', { scroll: 0 });
  // a flexed fills row (the (-6) format) — retarget a QB onto an open skill spot if one exists
  await page.evaluate(() => { try { const c = document.querySelector('#draftChips [data-none]'); if (c) c.click(); } catch (e) {} });
  await page.waitForTimeout(400);

  // ---------- finish the draft → preseason (dropdowns + cutdown day, light) ----------
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 50; i++) { const d = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 26); } catch (e) { return false; } }); if (d) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(1100);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.__zpbDraftDone = true; startSeason(); renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1600);
  await shot('r2-04-preseason-top.png', { scroll: 0 });
  await page.evaluate(() => { const d = [...document.querySelectorAll('details.zpb-dd')].find(x => /OFFENSE/.test((x.querySelector('summary') || {}).textContent || '')); if (d) d.open = true; });
  await page.evaluate(() => { const d = [...document.querySelectorAll('details')].find(x => /WHAT DO THESE TERMS MEAN/.test((x.querySelector('summary') || {}).textContent || '')); if (d) d.open = true; });
  await page.waitForTimeout(400);
  await shot('r2-05-preseason-dropdowns.png', { full: false });

  // ---------- the gated banner: hidden at top, shown past the button ----------
  const gateTop = await page.evaluate(() => document.getElementById('zpb-stagebar').hidden);
  console.log('banner at preseason top hidden =', gateTop);
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + 'r2-06-banner-after-scroll.png' });
  console.log('shot r2-06-banner-after-scroll.png (banner hovering, page\u2019s own button long gone)');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // ---------- week 2: box score frame + the light pregame cards ----------
  await page.evaluate(() => { try { seasonState.preseason = false; simulateCurrentWeek(); renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1000);
  await page.evaluate(QUIET);
  await shot('r2-07-week1-score-and-boxscore.png', { scroll: 0 });
  // the pregame cinematic in light mode (a real week-2 preview game, played loud)
  await page.evaluate(() => { try { window.__zpbQuietSim = false; advanceWeek(); const S = seasonState, u = seasonUserTeam(); const wk = S.currentWeek; const g = S.schedule.find(x => x.week === wk && (x.home === u || x.away === u)); if (g) { playGame(g, false); g.detail = buildGameDetail(g, S.teams[g.home].slotmap, S.teams[g.away].slotmap); zpbGameReplay(g, u); } } catch (e) {} });
  await page.waitForTimeout(2200);
  await page.screenshot({ path: OUT + 'r2-08-pregame-light-cards.png' });
  console.log('shot r2-08-pregame-light-cards.png');
  await page.evaluate(QUIET);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} });

  // ---------- the guide: 32-spot position viz + back bars top and bottom ----------
  await page.evaluate(() => { const b = document.getElementById('tabGuideBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  await shot('r2-09-guide-top-backbar.png', { scroll: 0 });
  await page.evaluate(() => { const d = [...document.querySelectorAll('#guideBody details.panel')].find(x => /WHICH POSITIONS MATTER/.test((x.querySelector('summary') || {}).textContent || '')); if (d) { d.open = true; d.scrollIntoView(); } });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + 'r2-10-guide-positions-32.png' });
  console.log('shot r2-10-guide-positions-32.png');
  const bot = await page.evaluate(() => { const b = document.querySelector('#viewGuide .zpb-view-backbar.zpb-bot'); if (b) b.scrollIntoView({ block: 'center' }); return !!b; });
  console.log('bottom back bar present =', bot);
  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT + 'r2-11-guide-bottom-backbar.png' });
  console.log('shot r2-11-guide-bottom-backbar.png');

  // ---------- run the season out; the awards with the 0.60 ink ----------
  await page.evaluate(() => { try { window.__zpbQuietSim = true; simRestOfSeason(); } catch (e) {} });
  await page.waitForTimeout(1500);
  await page.evaluate(QUIET);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(900);
  await page.evaluate(() => { try { const d = [...document.querySelectorAll('details.panel')].find(x => /REGULAR-SEASON AWARDS/.test((x.querySelector('summary') || {}).textContent || '')); if (d) d.open = true; } catch (e) {} });
  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT + 'r2-12-awards-060-ink.png' });
  console.log('shot r2-12-awards-060-ink.png');

  // ---------- playoffs through the champion page: the chain + the command center ----------
  await page.evaluate(() => {
    try {
      const conf = conferenceOfTeam(seasonUserTeam());
      const st = computeStandings(seasonState.schedule, teamNames());
      if (!seasonState.seeds[conf].some(x => x.team === seasonUserTeam())) {
        seasonState.seeds[conf][6] = Object.assign({}, st[seasonUserTeam()], { team: seasonUserTeam(), seed: 7 });
      }
    } catch (e) {}
  });
  await page.evaluate(QUIET);
  await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(700);
  // the chained run cinematics — capture the wildcard stage, then skip through
  await page.evaluate(() => { const b = document.getElementById('simPlayoffsBtn'); if (b) b.click(); });
  await page.waitForTimeout(2400);
  await page.evaluate(() => { try { window.__zpbQuietSim = false; } catch (e) {} });
  await page.screenshot({ path: OUT + 'r2-13-wildcard-round-cine.png' });
  console.log('shot r2-13-wildcard-round-cine.png');
  for (let i = 0; i < 8; i++) {
    const st = await page.evaluate(() => ({ ov: !!document.querySelector('.zpb-replay-ov'), storm: !!document.querySelector('.zpb-sbfin') }));
    if (st.storm) break;
    if (!st.ov) break;
    await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
    await page.waitForTimeout(800);
    await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
    await page.waitForTimeout(1100);
    const fin = await page.evaluate(() => ({ go: document.getElementById('zrepGo') ? document.getElementById('zrepGo').style.display !== 'none' : false }));
    if (fin.go) { await page.evaluate(() => { const g = document.getElementById('zrepGo'); if (g) g.click(); }); await page.waitForTimeout(1200); }
  }
  await page.evaluate(QUIET);
  // the Season Review — the DRAFT COMMAND CENTER
  await page.evaluate(() => { try { seasonState.showReview = true; renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { try { const p = document.querySelector('.zpb-dcc'); if (p) p.scrollIntoView({ block: 'start' }); } catch (e) {} });
  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT + 'r2-14-draft-command-center.png' });
  console.log('shot r2-14-draft-command-center.png');
  await page.evaluate(() => { try { const t = document.querySelector('.zpb-dcc-cdtitle'); if (t) t.scrollIntoView({ block: 'start' }); } catch (e) {} });
  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT + 'r2-15-cutdown-day-cards.png' });
  console.log('shot r2-15-cutdown-day-cards.png');

  // ---------- dark mode spot-checks: the pregame cards + the board chip ----------
  await page.evaluate(() => { try { document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {} });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + 'r2-16-dcc-dark.png' });
  console.log('shot r2-16-dcc-dark.png');

  console.log('page errors:', errors.length ? errors.join(' | ').slice(0, 300) : 'zero');
  await browser.close();
})().catch(e => { console.log('HARNESS FAIL', String(e).slice(0, 400)); process.exit(1); });
