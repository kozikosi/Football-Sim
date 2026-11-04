// w27_season_test.js — season flow: instant draft, review auto-open, season start, week-1 review, text removals
const { chromium } = require('playwright');
const path = require('path');
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('PASS ' + n + (x ? ' — ' + x : '')); } else { fail++; console.log('FAIL ' + n + (x ? ' — ' + x : '')); } };

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e && e.message || e).slice(0, 160)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  await page.goto('file://' + path.resolve(process.argv[2] || '/home/z/my-project/build/Football-Sim-Z-post-blue-w27.html'));
  await page.waitForTimeout(1400);

  // instant draft
  await page.evaluate(() => document.getElementById('startDraftBtn').click());
  await page.waitForTimeout(9800);
  await page.evaluate(() => { const b = document.getElementById('speedInstantBtn'); if (b) b.click(); });
  await page.waitForTimeout(400);
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => {
      const p = document.getElementById('draftFinalResults');
      if (p && p.style.display !== 'none') return true;
      const btn = [...document.querySelectorAll('#draftLive button')].find(b => /^(DRAFT|PICK|SKIP|SIM)/.test((b.textContent || '').trim().toUpperCase()));
      if (btn) btn.click();
      return false;
    });
    if (done) break;
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(1200);
  const review = await page.evaluate(() => {
    const panel = document.getElementById('draftFinalResults');
    const open = [...panel.querySelectorAll('tr.detailrow')].find(tr => tr.style.display !== 'none');
    return {
      open: !!open,
      badges: panel.querySelectorAll('.zpb-dbk').length,
      groupBadges: panel.querySelectorAll('.zpb-dbk-groups .zpb-sbadge').length,
      map: panel.querySelectorAll('.zpb-fm-ini').length,
      noDepth: !panel.textContent.includes('Roster (as drafted)'),
      noFade: !panel.textContent.includes('Missing depth-chart slots') && !panel.textContent.includes('MISSING DEPTH CHART')
    };
  });
  ok('review: breakdown auto-opens', review.open);
  ok('review: player + group badges present', review.badges > 20 && review.groupBadges > 0, review.badges + ' + ' + review.groupBadges);
  ok('review: where-they-belong map present', review.map >= 20, review.map + ' initials');
  ok('review: top roster list removed', review.noDepth);
  ok('review: no MISSING DEPTH CHART text after draft', review.noFade);

  // FB in skill positions inside the breakdown
  const fbOk = await page.evaluate(() => {
    const groups = (typeof GROUPS !== 'undefined') ? GROUPS : [];
    const skill = groups.find(g => /Skill/i.test(g[0]));
    const spec = groups.find(g => /Special/i.test(g[0]));
    return { in: skill && skill[1].includes('FB'), out: spec && !spec[1].includes('FB') };
  });
  ok('review: FB grouped with skill positions', fbOk.in && fbOk.out, JSON.stringify(fbOk));

  // start the season
  const started = await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) { b.click(); return true; } return false; });
  await page.waitForTimeout(1500);
  ok('season: started', started && (await page.evaluate(() => !!seasonState)));

  // sim to week 1 results
  await page.evaluate(() => document.getElementById('tabDraftBtn').click());
  await page.waitForTimeout(600);
  for (let i = 0; i < 12; i++) {
    const ph = await page.evaluate(() => (typeof seasonState !== 'undefined' && seasonState) ? seasonState.phase + ':' + seasonState.currentWeek + ':pre=' + !!seasonState.preseason : 'none');
    if (ph.startsWith('regular:') && ph.includes('pre=false')) break;
    await page.evaluate(() => {
      const b = document.getElementById('beginSeasonBtn') || document.getElementById('beginSeasonBtn2') || document.getElementById('simWeekBtn');
      if (b) b.click();
    });
    await page.waitForTimeout(900);
  }
  const week = await page.evaluate(() => {
    const b = document.getElementById('simWeekBtn');
    if (b) { for (let i = 0; i < 3; i++) b.click(); }
    return (typeof seasonState !== 'undefined' && seasonState) ? seasonState.phase + ':' + seasonState.currentWeek : 'none';
  });
  await page.waitForTimeout(1500);
  ok('season: regular season running', week.startsWith('regular'), week);

  // the season review badges (100 stat badges flow) still exist somewhere reachable
  const badgesGuide = await page.evaluate(() => {
    document.getElementById('tabGuideBtn').click();
    const t = document.getElementById('guideBody').textContent;
    return {
      vals: ['5,000', '50', '15', '158.3', '250', '25', '100', '20'].every(v => t.includes(v)),
      oldGone: !t.includes('4,373') && !t.includes('99.3'),
      bmGrid: !!document.querySelector('.zpb-bmgrid'),
      coachOpen: (() => { const d = [...document.querySelectorAll('#guideBody details.panel')]; const c = d.find(x => x.querySelector('summary').textContent.includes('COACHING')); return c && c.hasAttribute('open') && d.indexOf(c) === 2; })()
    };
  });
  ok('guide: the Owner example values live (5,000/50/15/158.3/250/25/100/20)', badgesGuide.vals);
  ok('guide: old example values gone', badgesGuide.oldGone);
  ok('guide: draft-board panel visualized', badgesGuide.bmGrid);
  ok('guide: coaching sits third and open', badgesGuide.coachOpen);

  ok('season: zero console errors through the flow', errors.length === 0, errors.slice(0, 3).join(' | '));
  console.log(`\n=== w27 season test: ${pass} pass / ${fail} fail ===`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})();
