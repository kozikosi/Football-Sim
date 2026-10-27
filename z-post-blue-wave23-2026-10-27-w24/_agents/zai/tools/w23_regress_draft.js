// w23 regression A: syntax check of all script blocks + core draft integrity across teams
const { chromium } = require('playwright');
const fs = require('fs');
const path = '/home/z/my-project/download/Football-Sim-Z-post-blue-w23.html';

(async () => {
  // ---- 1. node --check every script block ----
  const html = fs.readFileSync(path, 'utf-8');
  const blocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  console.log('script blocks:', blocks.length);
  const { execSync } = require('child_process');
  blocks.forEach((b, i) => {
    fs.writeFileSync(`/home/z/my-project/scripts/_w23_block${i}.js`, b);
    try { execSync(`node --check /home/z/my-project/scripts/_w23_block${i}.js`); console.log(`block ${i}: syntax OK (${(b.length / 1024).toFixed(0)} KB)`); }
    catch (e) { console.log(`block ${i}: SYNTAX FAIL\n` + e.stderr.toString().slice(0, 600)); process.exitCode = 1; }
  });

  // ---- 2. draft integrity across 6 teams/picks ----
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const combos = [
    ['Seattle Seahawks', '32'], ['Arizona Cardinals', '1'], ['Chicago Bears', '16'],
    ['Las Vegas Raiders', '21'], ['Kansas City Chiefs', '5'], ['Tampa Bay Buccaneers', '11'],
  ];
  for (const [team, pick] of combos) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 300)));
    await page.goto('file://' + encodeURI(path));
    await page.waitForTimeout(900);
    await page.evaluate(([t, p]) => {
      document.getElementById('speedInstantBtn').click();
      const sel = document.getElementById('draftSlotSelect');
      if ([...sel.options].some(o => o.value === t)) sel.value = t;
      document.getElementById('draftPickNumberSelect').value = p;
      document.getElementById('startDraftBtn').click();
    }, [team, pick]);
    await page.waitForTimeout(2500); // engine kick at 350ms; no manual cine skip needed now

    const res = await page.evaluate(() => {
      const S = draftSim;
      if (!S) return { err: 'no draftSim' };
      const issues = [];
      let prev = 0;
      for (const l of S.log) {
        if (l.overall !== prev + 1) issues.push('overall gap ' + prev + '->' + l.overall);
        prev = l.overall;
        if (S.order[l.overall - 1] !== l.teamIndex) issues.push('team mismatch @' + l.overall);
      }
      const board = document.querySelector('#draftBody2 tr');
      const tds = board ? board.querySelectorAll('td') : [];
      return {
        pos: S.pos, log: S.log.length, awaitingUser: S.awaitingUser,
        kicked: !!window._zpbKickStarted,
        issues: issues.slice(0, 4),
        cols: tds.length, wins: (tds[4] || {}).textContent, pri: (tds[5] || {}).textContent,
        gone: (tds[6] || {}).textContent,
        fallbackUsed: (document.getElementById('draftBody2').textContent || '').includes('Fills') && tds.length === 7,
        ticker: document.getElementById('draftRecentPicks').childElementCount,
        faultNote: (document.getElementById('draftRecentPicks').textContent || '').includes('paused'),
      };
    });
    // user pick flow
    const up = await page.evaluate(() => {
      if (!draftSim.awaitingUser) return 'not-awaiting';
      const btn = document.querySelector('#draftBody2 button[data-pick]');
      if (!btn) return 'no-btn';
      btn.click();
      return new Promise(r => setTimeout(() => {
        const S = draftSim;
        const mine = S.log.filter(l => l.isUser).length;
        const depthFilled = document.querySelectorAll('#draftRosterList .depth-row .playername:not(.empty)').length;
        const board2 = document.querySelector('#draftBody2 tr td:nth-child(6)');
        r(JSON.stringify({ mine, depthFilled, pos: S.pos, awaiting: S.awaitingUser, pri: (board2 || {}).textContent }));
      }, 2500));
    });
    console.log(`${team} @1.${pick}:`, JSON.stringify(res), '| userPick:', up, '| errors:', errors.length ? JSON.stringify(errors.slice(0, 3)) : 'none');
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
