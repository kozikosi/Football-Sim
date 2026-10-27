// w23 regression F: final battery + evidence screenshots
const { chromium } = require('playwright');
const path = '/home/z/my-project/download/Football-Sim-Z-post-blue-w23.html';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 250)));
  await page.goto('file://' + encodeURI(path));
  await page.waitForTimeout(1000);

  // ---- T4: hypothetical state respects round floors ----
  const t4 = await page.evaluate(() => {
    const mk = (pos) => ({ pool: PLAYERS.filter(p => POS_SLOT_MAP[p[1]]).slice().sort((a, b) => b[3] - a[3]), rosters: Array.from({ length: 32 }, () => ({ slots: {} })), repl: null, pos });
    const lowPos = mk(150);  // round 6 — no floor
    const r1Pos = mk(0);     // round 1 — floor 90
    // pick for team 0 in each state, inspect chosen OVR
    const pLow = cpuPick(0, lowPos); const pR1 = cpuPick(0, r1Pos);
    return { round6PickOvr: pLow ? pLow.player[3] : null, round1PickOvr: pR1 ? pR1.player[3] : null };
  });
  console.log('T4 floors     :', JSON.stringify(t4));

  // ---- P14: FB/P have real wins; T7: duplicate names in dataset ----
  const dataChecks = await page.evaluate(() => {
    const names = PLAYERS.map(p => p[0]);
    const dupNames = names.filter((n, i) => names.indexOf(n) !== i);
    const fbs = PLAYERS.filter(p => p[1] === 'FB').slice(0, 3).map(p => [p[0], p[3], playerWar(p).war.toFixed(2)]);
    const ps = PLAYERS.filter(p => p[1] === 'P').slice(0, 3).map(p => [p[0], p[3], playerWar(p).war.toFixed(2)]);
    return { dupNames: [...new Set(dupNames)].slice(0, 5), fbWar: fbs, pWar: ps };
  });
  console.log('P14 FB/P wins :', JSON.stringify(dataChecks));

  // ---- draft: views during draft + season gate after completion ----
  await page.evaluate(() => {
    document.getElementById('speedInstantBtn').click();
    document.getElementById('draftSlotSelect').value = 'Chicago Bears';
    document.getElementById('draftPickNumberSelect').value = '16';
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(2000);
  const duringDraftTabs = await page.evaluate(() => {
    const out = {};
    document.getElementById('tabRankingsBtn').click();
    out.rankings = document.getElementById('viewRankings').innerHTML.length > 5000 && document.getElementById('viewRankings').classList.contains('active');
    document.getElementById('tabGroupsBtn').click();
    out.groups = document.getElementById('groupBody') && document.getElementById('groupBody').childElementCount > 10;
    document.getElementById('tabGuideBtn').click();
    out.guide = document.getElementById('guideBody').innerHTML.length > 10000;
    document.getElementById('tabDraftBtn').click();
    out.backToDraft = document.getElementById('viewDraft').classList.contains('active') && draftSim.awaitingUser;
    return out;
  });
  console.log('T15 during    :', JSON.stringify(duringDraftTabs));

  // user pick, then finish whole draft, check season gate
  const seasonGate = await page.evaluate(() => {
    return new Promise(resolve => {
      const waitUser = then => { if (draftSim.awaitingUser) return then(); setTimeout(() => waitUser(then), 250); };
      waitUser(() => {
        document.querySelector('#draftBody2 button[data-pick]').click();
        setTimeout(() => {
          try { simToEnd(); } catch (e) { resolve('simToEnd threw ' + e.message); return; }
          setTimeout(() => {
            // final results visible?
            const fin = document.getElementById('draftFinalResults').style.display !== 'none';
            // season stage should now offer SEASON (draft complete → gate passes)
            goSeason();
            const hasSeason = !!document.getElementById('startSeasonHeroBtn');
            const hasResume = !!document.getElementById('goDraftResumeBtn');
            resolve(JSON.stringify({ fin, hasSeason, hasResume, pos: draftSim.pos }));
          }, 1000);
        }, 1800);
      });
    });
  });
  console.log('P20 season gate:', seasonGate);

  // ---- evidence screenshots ----
  await page.evaluate(() => { setActiveTab('viewDraft', 'tabDraftBtn'); window.scrollTo(0, 0); });
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/home/z/my-project/scripts/shots/w23_draft_board.png' });

  // fresh page for homepage + guide shots
  const page2 = await ctx.newPage();
  await page2.goto('file://' + encodeURI(path));
  await page2.waitForTimeout(1100);
  await page2.screenshot({ path: '/home/z/my-project/scripts/shots/w23_homepage.png' });
  await page2.evaluate(() => { document.getElementById('tabGuideBtn').click(); });
  await page2.waitForTimeout(900);
  await page2.screenshot({ path: '/home/z/my-project/scripts/shots/w23_guide.png' });
  await page2.evaluate(() => { document.getElementById('tabGroupsBtn').click(); });
  await page2.waitForTimeout(900);
  await page2.screenshot({ path: '/home/z/my-project/scripts/shots/w23_groups.png' });

  // dropdown popup shot
  await page2.evaluate(() => { document.getElementById('tabDraftBtn').click(); document.querySelector('#draftSlotSelect') && document.querySelector('#draftSlotSelect').closest('.zpb-selwrap').querySelector('.zpb-selbtn').click(); });
  await page2.waitForTimeout(500);
  await page2.screenshot({ path: '/home/z/my-project/scripts/shots/w23_dropdown.png' });

  console.log('errors final  :', errors.length ? JSON.stringify(errors.slice(0, 5)) : 'none');
  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
