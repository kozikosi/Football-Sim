// Extra hardening: team-filter lifecycle + full 26-round instant draft + stuck-overlay watchdog
const { chromium } = require('playwright');
const FILE = 'file:///home/z/my-project/build_w18.html';
const fails = [];
const ok = (n, c, e = '') => { console.log(`[${c ? 'ok' : 'FAIL'}] ${n}${e ? ' — ' + e : ''}`); if (!c) fails.push(n); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 150)); });
  page.on('pageerror', e => errors.push(String(e).slice(0, 150)));
  page.on('dialog', d => d.accept());
  await page.goto(FILE); await sleep(1400);
  await page.evaluate(() => { try { setActiveTab('viewDraft', 'tabDraftBtn'); } catch (e) {} });
  await page.evaluate(() => { document.getElementById('draftPickNumberSelect').value = '32'; });
  await page.evaluate(() => { try { startDraft2(); } catch (e) {} });
  await sleep(900);

  // ---- team filter: click a team cell, filter applies, pill shows; click again clears ----
  const filt = await page.evaluate(() => {
    const cell = document.querySelector('#draftBody2 .zpb-tfilter');
    if (!cell) return { has: false };
    cell.click();
    return { has: true, team: cell.getAttribute('data-ztf'), set: draftUI.teamFilter };
  });
  ok('A1. clicking a team cell filters the board', filt.has && !!filt.set, filt.team || '');
  const pill = await page.evaluate(() => {
    const p = document.querySelector('#draftFitSummary .zpb-tfpill');
    const rows = document.querySelectorAll('#draftBody2 tr').length;
    const wrong = [...document.querySelectorAll('#draftBody2 td[data-label="Team"]')].filter(td => (td.querySelector('.zpb-tfilter') || {}).getAttribute?.('data-ztf') !== draftUI.teamFilter).length;
    return { pill: !!p, rows, wrong };
  });
  ok('A2. filter pill shows and every row matches the team', pill.pill && pill.wrong === 0 && pill.rows > 0, `rows=${pill.rows} wrong=${pill.wrong}`);
  await page.evaluate(() => { document.querySelector('#draftFitSummary .zpb-tfpill').click(); });
  const cleared = await page.evaluate(() => ({ f: draftUI.teamFilter, rows: document.querySelectorAll('#draftBody2 tr').length }));
  ok('A3. clicking the pill clears the filter', cleared.f === null && cleared.rows > 100, JSON.stringify(cleared));

  // ---- A4. auto-clear: set a filter, drain that team's pool via CPU picks to the end, board must never dead-end ----
  await page.evaluate(() => {
    draftSpeed = 'instant';
    draftUI.teamFilter = draftSim.teamNames.find(t => t !== draftSim.teamNames[draftSim.userIndex]);
    renderDraftBoard2();
  });
  await sleep(300);
  const endState = await page.evaluate(() => { try { simToEnd(); } catch (e) { return { threw: String(e).slice(0, 80) }; } return { threw: null, done: draftSim.pos >= draftSim.order.length, results: document.getElementById('draftFinalResults').style.display }; });
  ok('A4. instant full draft to the end never dead-ends', !endState.threw && endState.done, JSON.stringify(endState));

  // ---- A5. watchdog: start a draft, kill the cine overlay + kickoff timers manually, watchdog must fire ----
  await page.evaluate(() => { try { document.getElementById('draftSetup').style.display = 'block'; startDraft2(); } catch (e) {} });
  await sleep(600);
  await page.evaluate(() => {
    const cine = document.querySelector('.zpb-fin-welcome'); if (cine) cine.remove(); // simulate a frozen/removed cinematic
    const kick = window._zpbWelFade; window._zpbWelFade = () => {};                  // neuter the fade kick
    window._zpbKickStarted = false;
  });
  await sleep(5500);
  const wd = await page.evaluate(() => ({ kicked: !!window._zpbKickStarted, log: draftSim ? draftSim.log.length : -1 }));
  ok('A5. watchdog kicks the draft when the cinematic path dies', wd.kicked && wd.log >= 0, JSON.stringify(wd));

  // ---- A6. pick 1 overall end-to-end through the season start (slow default untouched) ----
  await page.evaluate(() => { try { startNewDraftFlow ? startNewDraftFlow() : null; } catch (e) {} });
  await sleep(300);
  await page.evaluate(() => { document.getElementById('draftPickNumberSelect').value = '1'; try { startDraft2(); } catch (e) {} });
  await sleep(9500); // the cinematic owns the first ~7.4 s by law; the user goes on the clock at the DRAFT fade
  const first = await page.evaluate(() => ({ awaiting: draftSim && draftSim.awaitingUser, rows: document.querySelectorAll('#draftBody2 tr').length }));
  ok('A6. pick-1 overall: user is immediately on the clock with a full board', first.awaiting === true && first.rows > 100, JSON.stringify(first));

  ok('Z. zero console/page errors in hardening run', errors.length === 0, errors.slice(0, 2).join(' | '));
  await browser.close();
  console.log(fails.length ? `HARDENING FAILED: ${fails.join(' · ')}` : 'HARDENING PASSED');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('CRASH:', e); process.exit(2); });
