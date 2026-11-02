/* w56_probe.js — live evidence of the Owner's six w56 asks on the PRISTINE w55 bytes
 * P1 DIME pre-selection bracket on the draft page roster depth chart (desktop + phone)
 * P2 phone draft card: unlabeled stats, OVR stacked over Priority
 * P3 draft review: 42vh stageintro pushing "How your draft ranks" down
 * P4 SB panel: away (top) team name centering at 390px with WASHINGTON COMMANDERS
 * P5 playoff bracket on the phone (the ≤560px single-column stack)
 * P6 pick grades: the 6-column table panel */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w56/base/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/w56/shots';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];

  // ---------- P1 · the draft page roster depth chart, BEFORE any pick ----------
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  page.on('pageerror', e => errors.push('1280: ' + String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(800);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(400);
  const p1 = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#draftRosterList .depth-row')];
    const dime = rows.find(r => (r.querySelector('.slotname') || {}).textContent === 'DIME');
    if (!dime) return { norow: true, rows: rows.length };
    const cs = getComputedStyle(dime);
    return {
      cls: dime.className,
      styleAttr: dime.getAttribute('style') || '',
      bg: cs.backgroundImage.slice(0, 60),
      borderLeft: cs.borderLeftWidth + ' ' + cs.borderLeftColor,
      nameText: (dime.querySelector('.playername,.empty') || {}).textContent,
      listHtml: document.getElementById('draftRosterList').innerHTML.length
    };
  });
  console.log('P1 draft-page DIME row (pre-selection):', JSON.stringify(p1, null, 1));
  const rosterPanel = await page.$('#draftRosterList');
  if (rosterPanel) { await rosterPanel.scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await rosterPanel.screenshot({ path: SHOTS + '/p1-dime-draft-desktop.png' }); }

  // phone draft board card probe (P2) — start the draft at 390px
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  m.on('pageerror', e => errors.push('390: ' + String(e).slice(0, 120)));
  await m.goto(FILE); await m.waitForTimeout(800);
  await m.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await m.reload(); await m.waitForTimeout(800);
  await m.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await m.waitForTimeout(400);
  await m.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await m.waitForTimeout(1400);
  await m.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await m.waitForTimeout(400);
  const p2 = await m.evaluate(() => {
    const tr = document.querySelector('#draftTable2 tbody tr');
    if (!tr) return { none: true };
    const tds = [...tr.querySelectorAll('td')].map(td => ({
      label: td.getAttribute('data-label'),
      cls: td.className,
      before: getComputedStyle(td, '::before').display !== 'none' ? getComputedStyle(td, '::before').content : null,
      x: Math.round(td.getBoundingClientRect().x), y: Math.round(td.getBoundingClientRect().y),
      w: Math.round(td.getBoundingClientRect().width)
    }));
    const ovr = tr.querySelector('.dc-ovr'), pri = tr.querySelector('.dc-pri');
    const ob = ovr && ovr.getBoundingClientRect(), pb = pri && pri.getBoundingClientRect();
    return { h: Math.round(tr.getBoundingClientRect().height), tds, stacked: !!(ob && pb && Math.abs(ob.x - pb.x) < 14) };
  });
  console.log('P2 phone draft card:', JSON.stringify(p2, null, 1));
  const board = await m.$('#draftTable2');
  if (board) { await m.evaluate(() => document.getElementById('draftTable2').scrollIntoView()); await m.waitForTimeout(300); await m.screenshot({ path: SHOTS + '/p2-draft-card-390.png' }); }

  // P1b · phone draft page roster depth chart (the same sidebar at 390)
  const p1b = await m.evaluate(() => {
    const rows = [...document.querySelectorAll('#draftRosterList .depth-row')];
    const dime = rows.find(r => (r.querySelector('.slotname') || {}).textContent === 'DIME');
    return dime ? { cls: dime.className, styleAttr: (dime.getAttribute('style') || '').slice(0, 80) } : { norow: true };
  });
  console.log('P1b phone DIME row:', JSON.stringify(p1b));

  // finish the draft (phone) → P3 the draft review stageintro + ranks
  await m.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await m.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await m.waitForTimeout(400); }
  await m.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await m.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await m.waitForTimeout(400); }
  await m.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await m.waitForTimeout(800);
  const p3 = await m.evaluate(() => {
    const si = document.querySelector('#draftResultsBody .zpb-stageintro');
    const ranks = document.querySelector('.zpb-ranks-fade');
    return {
      siH: si ? Math.round(si.getBoundingClientRect().height) : null,
      siMinH: si ? getComputedStyle(si).minHeight : null,
      siTop: si ? Math.round(si.getBoundingClientRect().top) : null,
      ranksTop: ranks ? Math.round(ranks.getBoundingClientRect().top) : null,
      vh: innerHeight
    };
  });
  console.log('P3 stageintro vs ranks @390:', JSON.stringify(p3));
  await m.evaluate(() => { const p = document.getElementById('draftFinalResults'); if (p) p.scrollIntoView(); });
  await m.waitForTimeout(400);
  await m.screenshot({ path: SHOTS + '/p3-review-390.png' });

  // P6 · pick grades panel (on the review's season view? it renders in-season; probe via direct call)
  const p6 = await m.evaluate(() => {
    try {
      const html = pickGradePanelHTML();
      const w = document.createElement('div'); w.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:10px;';
      w.id = 'p6host'; w.innerHTML = html; document.body.appendChild(w);
      const tbl = w.querySelector('table');
      const r = tbl ? tbl.getBoundingClientRect() : null;
      return { hasTable: !!tbl, tableW: r ? Math.round(r.width) : null, docOver: document.getElementById('p6host').scrollWidth - document.getElementById('p6host').clientWidth, rows: w.querySelectorAll('tbody tr').length };
    } catch (e) { return { err: String(e).slice(0, 140) }; }
  });
  console.log('P6 pick grades @390:', JSON.stringify(p6));
  await m.waitForTimeout(400);
  await m.screenshot({ path: SHOTS + '/p6-pickgrades-390.png' });
  await m.evaluate(() => { const h = document.getElementById('p6host'); if (h) h.remove(); });

  // ---------- P4 + P5 · run a full season to the Super Bowl ----------
  await m.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await m.waitForTimeout(2200);
  await m.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} });
  await m.waitForTimeout(600);
  await m.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
  await m.waitForTimeout(1200);
  await m.evaluate(() => { try { document.querySelectorAll('.zpb-restov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} });
  // drive the playoffs: wildcard → divisional → champ → superbowl (quiet sim, no replays)
  await m.evaluate(() => {
    try {
      window.__zpbQuietSim = true;
      const order = ['wildcard', 'divisional', 'champ', 'superbowl'];
      startPlayoffs();
      for (let i = 0; i < 4; i++) {
        const rk = seasonState.currentPlayoffRound;
        if (!seasonState.playoffRoundSimulated) simulatePlayoffRound();
        if (rk !== 'superbowl') advancePlayoffRound(); else break;
      }
    } catch (e) { console.log('PO err', e); }
  });
  await m.waitForTimeout(1500);
  // clear cinematics/overlays
  for (let i = 0; i < 10; i++) {
    const gone = await m.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); return document.querySelectorAll('.zpb-sbfin,.zpb-restov').length; } catch (e) { return 0; } });
    if (!gone) break;
    await m.waitForTimeout(500);
  }
  const ph = await m.evaluate(() => ({ phase: seasonState && seasonState.phase, champ: seasonState && seasonState.champion, user: seasonUserTeam() }));
  console.log('season state:', JSON.stringify(ph));
  const sbAway = await m.evaluate(() => { try { return seasonState.playoffRounds.superbowl[0].away; } catch (e) { return null; } });
  console.log('SB away team (top row):', sbAway);

  // P4 · the SB game panel's top team name centering
  const p4 = await m.evaluate(() => {
    const sb = seasonState.playoffRounds.superbowl[0];
    const host = document.getElementById('draftResultsBody') || document.body;
    const w = document.createElement('div'); w.id = 'p4host'; w.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:10px;';
    w.innerHTML = renderGameResultHTML(sb, null); document.body.appendChild(w);
    const sl = w.querySelector('.score-line .sl-team:first-child');
    const nm = sl ? sl.querySelector('.zpb-sl2name') : null;
    const r1 = sl ? sl.getBoundingClientRect() : null, r2 = nm ? nm.getBoundingClientRect() : null;
    const jc = nm ? getComputedStyle(nm).justifyContent : null;
    const res = { away: sb.away, jc, teamBox: r1 ? { x: Math.round(r1.x), w: Math.round(r1.width) } : null, nameBox: r2 ? { x: Math.round(r2.x), w: Math.round(r2.width) } : null };
    return res;
  });
  console.log('P4 SB top-team name @390:', JSON.stringify(p4));
  const p4host = await m.$('#p4host');
  if (p4host) { await p4host.screenshot({ path: SHOTS + '/p4-sbpanel-390.png' }); }
  await m.evaluate(() => { const h = document.getElementById('p4host'); if (h) h.remove(); });

  // P5 · the playoff bracket on the phone
  const p5 = await m.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.body;
    const w = document.createElement('div'); w.id = 'p5host'; w.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:10px;';
    w.innerHTML = renderBracketHTML(); document.body.appendChild(w);
    const tree = w.querySelector('.zpb-tree');
    const cols = [...w.querySelectorAll('.zpb-tree-col')];
    const r = tree.getBoundingClientRect();
    const colInfo = cols.map(c => ({ label: (c.querySelector('h6') || {}).textContent, x: Math.round(c.getBoundingClientRect().x), w: Math.round(c.getBoundingClientRect().width), cards: c.querySelectorAll('.bracket-game').length }));
    const over = w.scrollWidth - w.clientWidth;
    return { treeW: Math.round(r.width), docOver: over, cols: colInfo };
  });
  console.log('P5 bracket @390:', JSON.stringify(p5, null, 1));
  const p5host = await m.$('#p5host');
  if (p5host) { await p5host.screenshot({ path: SHOTS + '/p5-bracket-390.png' }); }
  await m.evaluate(() => { const h = document.getElementById('p5host'); if (h) h.remove(); });

  // champion banner probe (P4b) — force Washington as champion for the long-name check
  const p4b = await m.evaluate(() => {
    try {
      const w = document.createElement('div'); w.id = 'p4bhost'; w.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:10px;';
      const champ = 'Washington Commanders';
      const pkC = zpbPackFor(champ);
      w.innerHTML = `<div class="champion-banner" style="--zshimL:${pkC ? pkC.accL : '#c9a24b'};--zshimD:${pkC ? pkC.accD : '#8a5f18'};">
        <div class="zpb-champ-kicker zpb-shm">SUPER BOWL CHAMPIONS</div>
        <div class="zpb-champ-team"><span class="zpb-champ-logo">${zpbTeamLogo(champ)}</span><span class="zpb-champ-name zpb-shm">${champ.toUpperCase()}</span></div>
        <p class="zpb-champ-sub">probe</p></div>`;
      document.body.appendChild(w);
      const team = w.querySelector('.zpb-champ-team'), name = w.querySelector('.zpb-champ-name'), banner = w.querySelector('.champion-banner');
      const rb = team.getBoundingClientRect(), nb = name.getBoundingClientRect(), bb = banner.getBoundingClientRect();
      const off = Math.abs((nb.left + nb.width / 2) - (bb.left + bb.width / 2));
      return { teamBox: { x: Math.round(rb.x), w: Math.round(rb.width) }, nameBox: { x: Math.round(nb.x), w: Math.round(nb.width), lines: Math.round(nb.height) }, bannerW: Math.round(bb.width), nameOffCenter: Math.round(off * 10) / 10 };
    } catch (e) { return { err: String(e).slice(0, 140) }; }
  });
  console.log('P4b champion banner (WASHINGTON) @390:', JSON.stringify(p4b));
  const p4bhost = await m.$('#p4bhost');
  if (p4bhost) { await p4bhost.screenshot({ path: SHOTS + '/p4b-champbanner-390.png' }); }
  await m.evaluate(() => { const h = document.getElementById('p4bhost'); if (h) h.remove(); });

  console.log('page errors:', errors.length ? errors.join(' | ') : 'none');
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
