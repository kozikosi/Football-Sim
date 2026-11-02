/* w57_mobile.js — the Owner's round-57 phone battery (430 + 390 + 320 + 280 super-compressed)
 * M1 the player cards lose the vertical line (board + cards view) · M2 the preview key players
 * face off two-across at every width, cards smaller, names never broken · M3 the plan cards
 * carry no "pts vs. auto" line · M4 the linescore OT cell once, final under F · M5 BEGIN
 * PLAYOFFS wears the SIM PLAYOFFS pill · M6 the review badges pace at 0.6s/beat · M7 the
 * during-game cinematics fit 320/280/500×420 · M8 the name-break laws hold · M9 the storage
 * showcase fits a phone · M10 zero page errors */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/football-sim/worktrees/zai/Football-Sim-Z-post-blue-w57.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/football-sim/worktrees/zai/z-post-blue-wave57-2026-11-02-w57/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push('390: ' + String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // draft (49ers), instant to the end — the season begins
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(400);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1300);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(700);

  // M1 · the draft card reads clean to its left edge (no vertical line, wash kept)
  const m1 = await page.evaluate(() => {
    const tr = document.querySelector('#draftTable2 tbody tr');
    const td = tr && tr.querySelector('td');
    const prow = document.querySelector('#draftCards .prow') || (() => { const h = document.createElement('div'); h.innerHTML = '<div class="prow zpb-trow" style="--zr1:rgba(1,2,3,.1);--zr2:rgba(1,2,3,.1);--zr3:rgba(1,2,3,.1);--zrb:rgb(1,2,3);"><div><b class="zpb-gname">Test Name</b></div></div>'; document.body.appendChild(h); const el = h.firstElementChild; const cs = getComputedStyle(el); const r = { blw: cs.borderLeftWidth, bls: cs.borderLeftStyle }; h.remove(); return r; })();
    const csT = tr ? getComputedStyle(tr) : null;
    const csD = td ? getComputedStyle(td) : null;
    return {
      trBorder: csT ? csT.borderLeftWidth + '/' + csT.borderLeftStyle : null,
      tdShadow: csD ? csD.boxShadow : null,
      prow: prow,
      bg: csT ? csT.backgroundImage.slice(0, 24) : null,
      over: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });
  ok(m1.trBorder && !m1.trBorder.startsWith('4px'), 'M1 · 390: the phone card carries NO 4px accent bar (the 1px frame stays)', JSON.stringify(m1.trBorder));
  ok(m1.tdShadow === 'none', 'M1 · 390: the name cell carries NO inset bar', JSON.stringify(m1.tdShadow));
  ok(m1.prow && (m1.prow.blw === '0px' || m1.prow.bls === 'none'), 'M1 · the cards-view row carries NO left bar', JSON.stringify(m1.prow));
  ok(m1.bg && m1.bg.includes('linear-gradient'), 'M1 · the team wash STAYS (only the line goes)', JSON.stringify(m1.bg));
  ok(m1.over <= 0, 'M1 · 390: the draft board never pans', 'docOver=' + m1.over);
  await page.evaluate(() => document.getElementById('draftTable2') && document.getElementById('draftTable2').scrollIntoView());
  await page.waitForTimeout(250);
  await page.screenshot({ path: SHOTS + '/w57-390-draftcard.png' });

  // M6 · the review badges pace at 0.6s/beat (unit report tile + the season badge)
  const m6 = await page.evaluate(() => {
    const probe = (sel, beat) => { const h = document.createElement('div'); h.innerHTML = `<div class="${sel}" style="--beat:${beat};"></div>`; document.body.appendChild(h); const cs = getComputedStyle(h.firstElementChild); const d = cs.animationDelay; h.remove(); return d; };
    return { rc: probe('zpb-rcbadge', 1), sb: probe('zpb-sbadge', 2), map: probe('zpb-dfc2', 1) };
  });
  ok(m6.rc === '0.6s', 'M6 · the unit-report tile waits 0.6s per beat', JSON.stringify(m6.rc));
  ok(m6.sb === '1.2s', 'M6 · the season badge at beat 2 waits 1.2s (0.6 × 2)', JSON.stringify(m6.sb));
  const m6b = await page.evaluate(() => { const b = document.getElementById('zpb-w57-css'); return b ? !b.textContent.includes('.zpb-dfc2') : null; });
  ok(m6b === true, 'M6 · the w57 block never touches the field-map beats (the w44 law stands untouched)');

  // M5 · BEGIN PLAYOFFS wears the SIM PLAYOFFS pill (size + gold)
  const m5 = await page.evaluate(() => {
    const h = document.createElement('div');
    h.innerHTML = '<button class="resetbtn" id="beginPlayoffsBtn">Begin Playoffs</button><button class="tabbtn" id="simPlayoffsBtn">Sim Playoffs</button>';
    h.style.cssText = 'position:fixed;left:0;top:0;'; document.body.appendChild(h);
    const a = getComputedStyle(h.querySelector('#beginPlayoffsBtn')), b = getComputedStyle(h.querySelector('#simPlayoffsBtn'));
    const r = { fsA: a.fontSize, padA: a.padding, bgA: a.backgroundImage.slice(0, 30), fsB: b.fontSize, padB: b.padding, bgB: b.backgroundImage.slice(0, 30) };
    h.remove(); return r;
  });
  ok(m5.fsA === m5.fsB && m5.padA === m5.padB, 'M5 · BEGIN PLAYOFFS matches SIM PLAYOFFS size', JSON.stringify({ fsA: m5.fsA, fsB: m5.fsB, padA: m5.padA, padB: m5.padB }));
  ok(m5.bgA.includes('linear-gradient') && m5.bgA === m5.bgB, 'M5 · BEGIN PLAYOFFS wears the same gold pill', JSON.stringify({ bgA: m5.bgA, bgB: m5.bgB }));

  // M4 · the linescore: OT once, the final under F (synthetic OT + 2OT)
  const m4 = await page.evaluate(() => {
    const mk = (q, tot, other, ot) => ({ away: 'Carolina Panthers', home: 'Seattle Seahawks', result: { ot, awayQ: q, homeQ: other, awayScore: tot, homeScore: 19 } });
    const host = document.createElement('div'); host.style.cssText = 'position:fixed;left:-9999px;top:0;width:600px;'; document.body.appendChild(host);
    const read = g => { host.innerHTML = renderLineScoreHTML(g); const rows = [...host.querySelectorAll('tbody tr')]; const head = host.querySelectorAll('thead th').length; const r = rows[0].querySelectorAll('td').length; const otCells = rows[0] ? [...rows[0].querySelectorAll('td')].filter(td => td.textContent === '6').length : 0; const last = rows[0] ? rows[0].querySelectorAll('td')[host.querySelectorAll('thead th').length - 1].textContent : null; return { head, r, otCells, last }; };
    const ot1 = read(mk([0, 7, 0, 3, 6], 16, [3, 0, 7, 3, 6], true));
    const ot2 = read(mk([0, 7, 0, 3, 6], 16, [3, 0, 7, 3, 0], true));
    const reg = read(mk([0, 7, 0, 3], 10, [3, 0, 7, 3], false));
    host.remove();
    return { ot1, ot2, reg };
  });
  ok(m4.ot1.head === 7 && m4.ot1.r === 7, 'M4 · OT: the row carries exactly one cell per header column (7/7)', JSON.stringify(m4.ot1));
  ok(m4.ot1.otCells === 1, 'M4 · the OT score appears ONCE (was twice)', 'otCells=' + m4.ot1.otCells);
  ok(m4.ot1.last === '16' && m4.ot2.last === '16', 'M4 · the final sits under F, on the table', JSON.stringify({ ot1: m4.ot1.last, ot2: m4.ot2.last }));
  ok(m4.reg.head === 6 && m4.reg.r === 6 && m4.reg.last === '10', 'M4 · regulation games unchanged (6 columns, final under F)', JSON.stringify(m4.reg));

  // into the season — the week view with the plan cards and the preview key players
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1400);

  // M3 · the plan cards carry no "+X.X pts vs. auto" line
  const m3 = await page.evaluate(() => ({ plans: document.querySelectorAll('.zpb-plan').length, fx: document.querySelectorAll('.zpb-plan-fx').length, planText: document.querySelector('.zpb-planpanel') ? document.querySelector('.zpb-planpanel').textContent.includes('vs. auto') : null }));
  ok(m3.plans >= 1 && m3.fx === 0, 'M3 · the plan cards render with NO fx line', JSON.stringify(m3));
  ok(m3.planText === false, 'M3 · the panel never reads "vs. auto"', JSON.stringify(m3.planText));

  // M2 · the preview key players face off TWO ACROSS at 390
  const m2 = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('.zpb-pvfrow')].filter(r => r.querySelectorAll('.zpb-pvcard').length === 2);
    const pair = rows[0];
    if (!pair) return { norow: true };
    const [a, b] = [...pair.querySelectorAll('.zpb-pvcard')];
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    const name = a.querySelector('.zpb-pcard-hd b');
    const ns = name ? getComputedStyle(name) : null;
    return { rows: rows.length, sideBySide: Math.abs(ra.top - rb.top) < 3, gap: Math.round(rb.left - ra.right), pairW: Math.round(pair.getBoundingClientRect().width), nameWrap: ns ? ns.whiteSpace : null, nameEll: ns ? ns.textOverflow : null, over: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  });
  ok(!m2.norow && m2.sideBySide, 'M2 · 390: the key players stay on their team sides, two across', JSON.stringify(m2));
  ok(!m2.norow && m2.nameWrap === 'nowrap' && m2.nameEll === 'ellipsis', 'M2 · the compressed name ellipses — never a mid-word break', JSON.stringify({ nameWrap: m2.nameWrap, nameEll: m2.nameEll }));
  ok(!m2.norow && m2.over <= 0, 'M2 · 390: the preview never pans', 'docOver=' + m2.over);
  await page.evaluate(() => { const el = document.querySelector('.zpb-pvwrap'); if (el) el.scrollIntoView(); });
  await page.waitForTimeout(250);
  await page.screenshot({ path: SHOTS + '/w57-390-preview-pairs.png' });

  // M2b · the same at 320 and 280 — super compressed
  for (const w of [320, 280]) {
    await page.setViewportSize({ width: w, height: 700 }); await page.waitForTimeout(450);
    const m2b = await page.evaluate(() => {
      const rows = [...document.querySelectorAll('.zpb-pvfrow')].filter(r => r.querySelectorAll('.zpb-pvcard').length === 2);
      const pair = rows[0]; if (!pair) return { norow: true };
      const [a, b] = [...pair.querySelectorAll('.zpb-pvcard')];
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      const stats = pair.querySelector('.zpb-pcard-stats');
      return { sideBySide: Math.abs(ra.top - rb.top) < 3, bothVisible: ra.left >= 0 && rb.right <= document.documentElement.clientWidth + 1, cardW: Math.round(ra.width), statsHidden: stats ? getComputedStyle(stats).display === 'none' : null, over: document.documentElement.scrollWidth - document.documentElement.clientWidth };
    });
    ok(!m2b.norow && m2b.sideBySide && m2b.bothVisible, `M2 · ${w}: the pairs hold, both cards fully visible`, JSON.stringify(m2b));
    ok(m2b.over <= 0, `M2 · ${w}: zero pan`, 'docOver=' + m2b.over);
    await page.screenshot({ path: SHOTS + `/w57-${w}-preview-pairs.png` });
  }

  // M7 + M8 · the during-game cinematic at 320 / 280 / 500×420 — the replay fits, the names hold
  await page.setViewportSize({ width: 320, height: 640 }); await page.waitForTimeout(400);
  const play = async () => {
    await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) b.click(); });
    for (let i = 0; i < 40; i++) { const ov = await page.evaluate(() => !!document.querySelector('.zpb-replay-ov')); if (ov) break; await page.waitForTimeout(300); }
    await page.waitForTimeout(600);
    await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); }); // end the intro, start the timeline
    for (let i = 0; i < 20; i++) { const has = await page.evaluate(() => !!document.querySelector('.zpb-replay .zrl-play')); if (has) break; await page.waitForTimeout(300); } // the first play line carries a real name
    await page.waitForTimeout(300);
  };
  const closeReplay = async () => {
    await page.evaluate(() => { const g = document.getElementById('zrepGo'); if (g && g.style.display !== 'none') g.click(); else { const s = document.getElementById('zrepSkip'); if (s) s.click(); } });
    await page.waitForTimeout(400);
    await page.evaluate(() => { const ov = document.querySelector('.zpb-replay-ov'); if (ov) ov.remove(); });
    await page.waitForTimeout(400);
  };
  for (const [w, h] of [[320, 640], [280, 560], [500, 420]]) {
    await page.setViewportSize({ width: w, height: h }); await page.waitForTimeout(420);
    await play();
    const m7 = await page.evaluate(() => {
      const panel = document.querySelector('.zpb-replay');
      if (!panel) return { noreplay: true };
      const r = panel.getBoundingClientRect();
      const hd = panel.querySelector('.zpb-rep-hd').getBoundingClientRect();
      const teams = [...panel.querySelectorAll('.zpb-rep-team')].map(x => x.getBoundingClientRect());
      const lines = [...panel.querySelectorAll('.zpb-rep-line')].slice(0, 6);
      const log = panel.querySelector('.zpb-rep-log').getBoundingClientRect();
      const gname = panel.querySelector('.zpb-gname, .zrl-play');
      return {
        panelW: Math.round(r.width), fits: r.right <= document.documentElement.clientWidth + 1 && r.left >= -1,
        vh: Math.round(r.height), inVh: r.height <= window.innerHeight + 2,
        teamOverlap: teams.length === 2 ? !(teams[0].right > teams[1].left + 1) : null,
        lineOk: lines.every(l => l.getBoundingClientRect().right <= r.right + 1),
        playW: (() => { const pl = panel.querySelector('.zrl-play'); return pl ? Math.round(pl.getBoundingClientRect().width) : null; })(),
        logH: Math.round(log.height), gnameWrap: gname ? getComputedStyle(gname).overflowWrap : null,
        over: document.documentElement.scrollWidth - document.documentElement.clientWidth
      };
    });
    ok(!m7.noreplay, `M7 · ${w}×${h}: the replay opened`, '');
    ok(m7.fits && m7.inVh, `M7 · ${w}×${h}: the panel fits the window (w=${m7.panelW}, h=${m7.vh})`, JSON.stringify(m7));
    ok(m7.teamOverlap === true, `M7 · ${w}×${h}: the header teams never overlap`, JSON.stringify(m7.teamOverlap));
    ok(m7.lineOk, `M7 · ${w}×${h}: every log line stays inside the panel`, '');
    ok(m7.playW == null || m7.playW >= 150, `M7 · ${w}×${h}: the play text's column holds a full name (≥150px, was ~60px)`, 'playW=' + m7.playW);
    ok(m7.gnameWrap === 'break-word', `M8 · ${w}×${h}: the names wrap at words (break-word, never one letter)`, JSON.stringify(m7.gnameWrap));
    ok(m7.over <= 0, `M7 · ${w}×${h}: zero page pan`, 'docOver=' + m7.over);
    await page.screenshot({ path: SHOTS + `/w57-${w}x${h}-replay.png` });
    await closeReplay();
    // advance the week for the next leg (the played game needs its continue)
    await page.evaluate(() => { const b = document.getElementById('nextWeekBtn'); if (b) b.click(); });
    await page.waitForTimeout(700);
  }

  // M9 · the storage showcase fits a phone
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(300);
  await page.goto(FILE + '?storage=1'); await page.waitForTimeout(1000);
  const m9 = await page.evaluate(() => ({ over: document.documentElement.scrollWidth - document.documentElement.clientWidth, tabs: document.querySelectorAll('.zpb-st-tabs button').length }));
  ok(m9.over <= 0 && m9.tabs === 7, 'M9 · 390: the showcase fits, seven tabs, zero pan', JSON.stringify(m9));
  await page.screenshot({ path: SHOTS + '/w57-390-storage.png' });

  ok(errors.length === 0, 'M10 · zero page errors across the battery', errors.join(' | ').slice(0, 220));
  await browser.close();
  console.log(`w57_mobile: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('RIG ERROR', e); process.exit(1); });
