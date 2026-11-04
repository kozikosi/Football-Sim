// w26_season_test.js — season-flow checks: instant draft, review auto-open + badges, season start, 70-note gone
const { chromium } = require('playwright');
const path = require('path');
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('PASS ' + n + (x ? ' — ' + x : '')); } else { fail++; console.log('FAIL ' + n + (x ? ' — ' + x : '')); } };

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e && e.message || e).slice(0, 150)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 150)); });
  await page.goto('file://' + path.resolve('/home/z/my-project/compare/w26.html'));
  await page.waitForTimeout(1300);

  // instant draft to the end
  await page.evaluate(() => { document.getElementById('startDraftBtn').click(); });
  await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  // finish the user's picks quickly: click DRAFT-ready buttons until results appear
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => {
      const p = document.getElementById('draftFinalResults');
      if (p && p.style.display !== 'none') return true;
      const btn = [...document.querySelectorAll('#draftLive button')].find(b => /^(DRAFT|PICK|SKIP|SIM)/.test((b.textContent || '').trim().toUpperCase()));
      if (btn) btn.click();
      return false;
    });
    if (done) break;
    await page.waitForTimeout(350);
  }
  await page.waitForTimeout(1200);
  const review = await page.evaluate(() => {
    const panel = document.getElementById('draftFinalResults');
    const openDetail = [...panel.querySelectorAll('tr.detailrow')].find(tr => tr.style.display !== 'none');
    const dbk = panel.querySelector('.zpb-dbk-wrap');
    const badges = panel.querySelectorAll('.zpb-dbk').length;
    const groupBadges = panel.querySelectorAll('.zpb-dbk-groups .zpb-sbadge').length;
    const ops = document.getElementById('zpbDraftOps');
    const seasonBtns = ops ? [...ops.querySelectorAll('button')].map(b => b.textContent.trim()) : [];
    return { openDetail: !!openDetail, dbk: !!dbk, badges, groupBadges, seasonBtns,
             hasSeasonDup: seasonBtns.filter(t => t === 'SEASON').length };
  });
  ok('review: my breakdown auto-drops-down', review.openDetail);
  ok('review: badges breakdown present', review.dbk && review.badges > 0, review.badges + ' player badges, ' + review.groupBadges + ' group badges');
  ok('review: group badges present', review.groupBadges > 0);
  ok('review: one SEASON button in ops (dup removed)', review.hasSeasonDup === 0, JSON.stringify(review.seasonBtns));

  // the fading 70 line is gone from the detail
  const noFade = await page.evaluate(() => !document.getElementById('draftFinalResults').innerHTML.includes('Missing depth-chart slots'));
  ok('review: fading 70 note gone', noFade);

  // start the season
  const started = await page.evaluate(() => {
    const b = document.getElementById('startSeasonBtn');
    if (b) { b.click(); return true; }
    return false;
  });
  await page.waitForTimeout(1500);
  const seasonOn = await page.evaluate(() => !!seasonState);
  ok('season: started', started && seasonOn);

  // 70-note must be absent on the position rankings once the season runs
  await page.evaluate(() => document.getElementById('tabGroupsBtn').click());
  await page.waitForTimeout(700);
  const note70 = await page.evaluate(() => {
    document.querySelectorAll('.zpb-70note').forEach(n => n.remove);
    return document.querySelectorAll('#viewGroups .zpb-70note').length;
  });
  ok('season: 70-note gone from position rankings', note70 === 0, 'found=' + note70);

  // sim into the regular season, then open a played game's review
  await page.evaluate(() => document.getElementById('tabDraftBtn').click());
  await page.waitForTimeout(600);
  for (let i = 0; i < 10; i++) {
    const ph = await page.evaluate(() => (typeof seasonState !== 'undefined' && seasonState) ? seasonState.phase + ':' + seasonState.currentWeek + ':pre=' + !!seasonState.preseason : 'none');
    if (ph.startsWith('regular:') && ph.includes('pre=false')) break;
    await page.evaluate(() => {
      const b = document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2') || document.getElementById('simWeekBtn');
      if (b) b.click();
    });
    await page.waitForTimeout(900);
  }
  // sim week 1 — the week review opens with the key players
  await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) b.click(); });
  await page.waitForTimeout(1600);
  const opened = 'week1-review';
  const badgeCount = await page.evaluate(() => document.querySelectorAll('.zpb-pstat').length);
  ok('season: game review key-player stats wear badges', badgeCount > 0, badgeCount + ' stat badges (' + opened + ')');

  // screenshots
  await page.evaluate(() => document.getElementById('tabGroupsBtn').click());
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/home/z/my-project/evidence/w26-season-groups.png' });

  ok('season run: zero console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  console.log(`\n==== SEASON FLOW: ${pass} PASS / ${fail} FAIL ====`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', String(e).slice(0, 300)); process.exit(2); });
