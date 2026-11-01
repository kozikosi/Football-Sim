/* w50_live.js — the Owner's round-50 verification battery (v2) */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w50work/Football-Sim-Z-post-blue-w50.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if (cond) { pass++; console.log('  ✓ ' + name); } else { fail++; console.log('  ✗ FAIL ' + name + (extra ? '  [' + extra + ']' : '')); } };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 200)));

  // ============ SECTION 1: the supp pages ============
  console.log('— SECTION 1: the inks and the anchor panels —');
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(300);
  const ink = await page.evaluate(() => getComputedStyle(document.body).color);
  ok('A4 · light base ink is the halfway rose #8e5566 (not the near-black plum)', ink === 'rgb(142, 85, 102)', ink);
  await page.evaluate(() => { const b = document.getElementById('tabRankingsBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  const r1 = await page.evaluate(() => [...document.querySelectorAll('#resultsBody tr.teamrow')].slice(0, 6).map(tr => ({
    team: tr.dataset.team,
    nameCol: getComputedStyle(tr.querySelector('.team')).color,
    scoreCol: getComputedStyle(tr.querySelector('td.score')).color,
    anch: (() => { const c = tr.querySelector('.zpb-anch'); if (!c) return null; const s = getComputedStyle(c); return { bg: s.backgroundColor, bd: s.borderColor, co: s.color }; })(),
  })));
  ok('A1 · rankings team names ride a team ink (not the plum, not black)', r1.every(x => x.nameCol !== 'rgb(84, 48, 63)' && x.nameCol !== 'rgb(0, 0, 0)'), JSON.stringify(r1.slice(0, 2).map(x => x.nameCol)));
  ok('A1b · rankings scores ride the same row ink', r1.every(x => x.scoreCol === x.nameCol), JSON.stringify(r1.slice(0, 2).map(x => [x.nameCol, x.scoreCol])));
  ok('A1c · different teams carry different inks', new Set(r1.map(x => x.nameCol)).size >= 4, 'distinct=' + new Set(r1.map(x => x.nameCol)).size);
  ok('A2 · the ANCHOR panels differ per team (Chiefs ≠ Rams ≠ Raiders)', new Set(r1.filter(x => x.anch).map(x => x.anch.bg)).size >= 4, JSON.stringify(r1.slice(0, 3).map(x => x.anch && x.anch.bg)));
  const fillLs = r1.filter(x => x.anch).map(x => { const m = x.anch.bg.match(/(\d+), (\d+), (\d+)/); return m ? Math.max(+m[1], +m[2], +m[3]) : 0; });
  ok('A2b · every chip fill is barely not white (max channel ≥ 235)', fillLs.every(v => v >= 235), 'min=' + Math.min(...fillLs));
  const fb = await page.evaluate(() => {
    const s = document.createElement('span'); s.className = 'zpb-anch'; document.body.appendChild(s);
    const cs = getComputedStyle(s); const out = { bg: cs.backgroundColor, bd: cs.borderColor };
    s.remove(); return out;
  });
  ok('A2c · the rose-gold fallback stands where no team feeds the chip', fb.bg === 'rgb(249, 236, 228)' && fb.bd === 'rgb(226, 191, 174)', JSON.stringify(fb));
  await page.evaluate(() => { const b = document.getElementById('tabGroupsBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  const g1 = await page.evaluate(() => [...document.querySelectorAll('#groupBody tr')].slice(0, 5).map(tr => ({
    teamCol: getComputedStyle(tr.querySelector('td.team')).color,
    scoreCol: getComputedStyle(tr.querySelector('td.score')).color,
  })));
  ok('A3 · AVG OVR rides its team\'s ink, never the plum', g1.every(x => x.scoreCol === x.teamCol && x.scoreCol !== 'rgb(84, 48, 63)'), JSON.stringify(g1.slice(0, 2).map(x => x.scoreCol)));
  await page.evaluate(() => { const b = document.getElementById('tabRankingsBtn'); if (b) b.click(); document.documentElement.setAttribute('data-theme', 'dark'); });
  await page.waitForTimeout(500);
  const r1d = await page.evaluate(() => [...document.querySelectorAll('#resultsBody tr.teamrow')].slice(0, 4).map(tr => ({
    nameCol: getComputedStyle(tr.querySelector('.team')).color,
    anchBg: (() => { const c = tr.querySelector('.zpb-anch'); return c ? getComputedStyle(c).backgroundColor : null; })(),
  })));
  ok('A1d · dark: the rankings names read the dark row ink (cream-family, not black)', r1d.every(x => { const m = x.nameCol.match(/(\d+), (\d+), (\d+)/); return m && Math.max(+m[1], +m[2], +m[3]) > 120; }), JSON.stringify(r1d.slice(0, 2).map(x => x.nameCol)));
  ok('A2d · dark: the chips wear the dark team fills', new Set(r1d.map(x => x.anchBg)).size >= 3, JSON.stringify(r1d.map(x => x.anchBg)));

  // ============ SECTION 2: the draft → the results page detail (map + cards) ============
  console.log('— SECTION 2: the names land twice, together —');
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    const i = document.getElementById('speedInstantBtn'); if (i) i.click();
    const s = document.getElementById('simToEndBtn'); if (s) s.click();
  });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(1200);
  await page.evaluate(() => { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); });
  await page.waitForTimeout(600);
  // the user's detail auto-expands on the results table: map + breakdown cards together
  await page.evaluate(() => {
    const open = document.querySelector('.detailrow[style*="table-row"], .detailrow:not([style*="none"])');
    if (!open || !document.querySelector('.zpb-fm')) {
      const tr = [...document.querySelectorAll('.teamrow')].find(x => x.offsetParent && x.getAttribute('style') && x.getAttribute('style').includes('font-weight'));
      if (tr) tr.click();
    }
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const m = document.querySelector('.zpb-fm'); if (m) m.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(1800);
  const sync = await page.evaluate(() => {
    const map = document.querySelector('.zpb-fm');
    if (!map) return { err: 'no map' };
    // keyed by SLOT (the map's DIME/NICKEL resolve to the CB4/CB3 players — alias the pairs)
    const alias = sl => sl === 'DIME' ? 'CB4' : (sl === 'NICKEL' ? 'CB3' : sl);
    const stations = {};
    map.querySelectorAll('.zpb-fm-ini[data-slot]').forEach(st => {
      stations[alias(st.dataset.slot)] = { beat: st.style.getPropertyValue('--beat'), delay: getComputedStyle(st).animationDelay, name: (st.querySelector('b') || {}).textContent };
    });
    const cards = {};
    document.querySelectorAll('.zpb-dbk.zpb-dfc2[data-slot]').forEach(c => {
      cards[c.dataset.slot] = { beat: c.style.getPropertyValue('--beat'), delay: getComputedStyle(c).animationDelay, name: (c.querySelector('b') || {}).textContent };
    });
    let synced = 0, diff = 0, miss = [], diffs = [];
    Object.keys(stations).forEach(sl => {
      const s = stations[sl], c = cards[sl];
      if (!c) { miss.push(sl + ':' + s.beat); return; }
      if (s.delay === c.delay && s.beat === c.beat) synced++; else { diff++; diffs.push(sl + ' st[' + s.beat + ',' + s.delay + '] cd[' + c.beat + ',' + c.delay + ']'); }
    });
    return { stations: Object.keys(stations).length, synced, diff, miss: miss.slice(0, 4), diffs: diffs.slice(0, 4), cards: Object.keys(cards).length };
  });
  ok('D1 · every map name has a card twin (no missing stations)', !sync.err && sync.miss.length === 0, JSON.stringify(sync));
  ok('D2 · all twins land on the same exact delay+beat', !sync.err && sync.diff === 0 && sync.synced >= 20, JSON.stringify(sync));

  // ============ SECTION 3: the season — DIME/toggle, cream, badges ============
  console.log('— SECTION 3: the season surfaces —');
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(2400);
  // C: the editor's DIME row directly below NICKEL
  const ed1 = await page.evaluate(() => {
    const ed = document.getElementById('lineupPre'); if (!ed) return { err: 'no editor' };
    const rows = [...ed.querySelectorAll('.depth-row')];
    const names = rows.map(r => (r.querySelector('.slotname') || {}).textContent);
    const ni = names.indexOf('NICKEL'), di = names.indexOf('DIME');
    const rr = el => { const x = el.getBoundingClientRect(); return { t: Math.round(x.top), l: Math.round(x.left) }; };
    const nEl = rows[ni], dEl = rows[di];
    return { ni, di, adjacent: di === ni + 1, dimeName: dEl ? ((dEl.querySelector('.playername') || {}).textContent || '') : null, aligned: nEl && dEl ? Math.abs(rr(nEl).l - rr(dEl).l) <= 2 : false, dimeTier: dEl ? dEl.querySelector('.playername') !== null : false };
  });
  ok('C1 · the editor carries a DIME row directly below NICKEL', !ed1.err && ed1.adjacent === true, JSON.stringify({ ni: ed1.ni, di: ed1.di }));
  ok('C2 · DIME is left-aligned with the defense list (same column)', !ed1.err && ed1.aligned === true, JSON.stringify([ed1.nick, ed1.dime]));
  ok('C4 · the DIME row shows the resolved player', !ed1.err && !!ed1.dimeName, String(ed1.dimeName));
  // E: the 4-3/3-4 toggle answers
  const lab43 = await page.evaluate(() => [...document.querySelectorAll('#lineupPre .depth-row .slotname')].map(x => x.textContent).filter(t => /DT1|DT2|MIKE|WILL|SAM|NT|OLB|ILB/.test(t)));
  ok('E0 · the 4-3 labels start as DT1/DT2/MIKE/WILL/SAM', lab43.includes('DT1') && lab43.includes('MIKE'), JSON.stringify(lab43));
  await page.evaluate(() => { const b = [...document.querySelectorAll('.zpb-basetoggle button')].find(x => x.dataset.zbase === '34'); if (b) b.click(); });
  await page.waitForTimeout(900);
  const ed34 = await page.evaluate(() => {
    const ed = document.getElementById('lineupPre'); if (!ed) return { err: 'no editor after toggle' };
    const labels = [...ed.querySelectorAll('.depth-row .slotname')].map(x => x.textContent);
    const ac = document.getElementById('lineupPreApplyChanges');
    const names = [...ed.querySelectorAll('.depth-row')].map(r => (r.querySelector('.slotname') || {}).textContent);
    const ni = names.indexOf('NICKEL'), di = names.indexOf('DIME');
    return { labels, applyTxt: ac ? ac.textContent : null, applyDisabled: ac ? ac.disabled : null, diAdj: di === ni + 1, olb1pos: names.indexOf('OLB1'), dl5pos: names.indexOf('DL5'), mikePos: names.indexOf('ILB1') };
  });
  ok('E1 · staging 3-4 repaints the labels to NT/OLB1/ILB1/ILB2/OLB2', ed34.labels && ed34.labels.includes('NT') && ed34.labels.includes('OLB1') && ed34.labels.includes('ILB1'), JSON.stringify(ed34.labels));
  ok('E2 · the defense rows reorder (OLB1 between DL5 and ILB1)', typeof ed34.olb1pos === 'number' && ed34.olb1pos > ed34.dl5pos && ed34.olb1pos < ed34.mikePos, 'olb1=' + ed34.olb1pos + ' dl5=' + ed34.dl5pos + ' ilb1=' + ed34.mikePos);
  ok('E3 · APPLY THE CHANGES lights (1)', ed34.applyTxt === 'APPLY THE CHANGES (1)' && ed34.applyDisabled === false, String(ed34.applyTxt));
  ok('C3 · DIME still sits directly below NICKEL in the 3-4', ed34.diAdj === true);
  await page.evaluate(() => { const b = document.getElementById('lineupPreRevertChanges'); if (b) b.click(); });
  await page.waitForTimeout(700);
  const edRev = await page.evaluate(() => [...document.querySelectorAll('#lineupPre .depth-row .slotname')].map(x => x.textContent));
  ok('E4 · REVERT returns the 4-3 labels', edRev.includes('DT1') && edRev.includes('MIKE') && !edRev.includes('OLB1'), JSON.stringify(edRev.slice(0, 20)));
  await page.evaluate(() => { const b = [...document.querySelectorAll('.zpb-basetoggle button')].find(x => x.dataset.zbase === '34'); if (b) b.click(); });
  await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.getElementById('lineupPreApplyChanges'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  const afterApply = await page.evaluate(() => ({ zpb34: !!window.ZPB34, labels: [...document.querySelectorAll('.depth-row .slotname')].map(x => x.textContent).filter(t => /NT|OLB1|ILB1/.test(t)) }));
  ok('E5 · APPLY THE CHANGES commits the base (ZPB34 true, labels hold)', afterApply.zpb34 === true && afterApply.labels.includes('NT') && afterApply.labels.includes('ILB1'), JSON.stringify(afterApply));
  // F: the during-game cream — force dark, sim week 1, skip the intro, read the log
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) b.click(); });
  await page.waitForTimeout(6000);
  await page.evaluate(() => { document.querySelectorAll('.zpb-rep-intro').forEach(i => i.remove()); });
  await page.waitForTimeout(9000);
  const cream = await page.evaluate(() => {
    document.querySelectorAll('.zpb-replay-ov').forEach(o => { o.style.opacity = '1'; });
    const rep = document.querySelector('.zpb-replay');
    if (!rep) return { skip: 'no replay' };
    const t = rep.querySelector('.zrl-t');
    const to = rep.querySelector('.zrl-to .zrl-chip');
    const q = rep.querySelector('.zpb-rep-q');
    return { timeCol: t ? getComputedStyle(t).color : null, toCol: to ? getComputedStyle(to).color : null, qCol: q ? getComputedStyle(q).color : null, lines: rep.querySelectorAll('.zpb-rep-line').length };
  });
  if (cream.skip) ok('F1 · (no replay — environment)', false, 'replay did not open');
  else {
    ok('F1 · the game time is the neutral cream (never team-tinted)', cream.lines > 0 && cream.timeCol === 'rgb(242, 231, 213)', JSON.stringify(cream));
    ok('F2 · the TO box is the neutral cream', !cream.toCol || cream.toCol === 'rgb(242, 231, 213)', JSON.stringify(cream));
    ok('F3 · the quarter marks are the neutral cream', !cream.qCol || cream.qCol === 'rgb(242, 231, 213)', JSON.stringify(cream));
  }
  // G: the season-review badges — sim the rest, render the review, read the real badges
  await page.evaluate(() => {
    try { document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {}
    try { simRestOfSeason(); } catch (e) {}
    try { seasonState.showReview = true; } catch (e) {}
    try { renderSeasonTab(document.getElementById('draftResultsBody') || document.getElementById('seasonHost')); } catch (e) {}
  });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov,.zpb-sbfin,.zpb-porun').forEach(o => o.remove()); } catch (e) {} });
  const badges = await page.evaluate(() => {
    const vals = [...document.querySelectorAll('.zpb-sbadge b')].map(e => e.textContent.trim());
    return { n: vals.length, dashes: vals.filter(v => /\d\s*-\s*\d/.test(v)).slice(0, 5), dotted: vals.filter(v => /\d·\d/.test(v)).slice(0, 5), kicker: (document.querySelector('.zpb-story-kicker') || {}).textContent || null };
  });
  ok('G1 · the review rendered with its badges', badges.n > 0, JSON.stringify({ n: badges.n, kicker: badges.kicker }));
  ok('G2 · no season-review badge value carries a digit-dash-digit', badges.n > 0 && badges.dashes.length === 0, JSON.stringify(badges.dashes));
  ok('G3 · the dot law is really painting (records read like 10·7)', badges.dotted.length > 0, JSON.stringify(badges.dotted));

  console.log('— SECTION 4: hygiene —');
  ok('H1 · zero page errors across the whole battery', errors.length === 0, errors.slice(0, 3).join(' | '));
  console.log(`\nRESULT: ${pass} passed, ${fail} failed`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
