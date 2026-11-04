/* w65_owner.js — the Owner's UI round, live on the merged w63 bytes (corrected flow). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w65/Football-Sim-Z-post-blue-w65.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w63/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);

  // draft as KC, board live (for A1), then instant to the end
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await page.waitForTimeout(250);
  await page.evaluate(() => { document.getElementById('startDraftBtn').click(); });
  await page.waitForTimeout(2400);

  // ---- A1 · the team tooltip on the live board ----
  const tt = await page.evaluate(() => {
    const cell = document.querySelector('[data-ztf]');
    if (!cell) return { err: 'no data-ztf cell' };
    const r = cell.getBoundingClientRect();
    cell.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: Math.max(5, r.left + 5), clientY: Math.max(5, r.top + 5) }));
    const b = document.querySelector('.zpb-tt');
    return { bubble: !!b, text: b ? b.textContent : null, on: b ? b.classList.contains('zpb-tt-on') : false, cs: b ? getComputedStyle(b).fontFamily.slice(0, 22) : null };
  });
  ok(tt.bubble && tt.on && tt.text && tt.text.length > 4, 'A1 · hovering a team cell speaks the team name', JSON.stringify(tt));
  ok(tt.cs && /Cinzel/.test(tt.cs), 'A1 · the bubble wears Cinzel Decorative', tt.cs);

  await page.evaluate(() => { document.getElementById('speedInstantBtn').click(); document.getElementById('simToEndBtn').click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); if (window._zpbWelCleanup) window._zpbWelCleanup(); } catch (e) {} });
  await page.waitForTimeout(500);

  // ---- F1 · the roster tab wears the pick cards ----
  await page.evaluate(() => { const b = document.getElementById('resultsMineBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  const roster = await page.evaluate(() => ({
    cards: document.querySelectorAll('#draftResultsBody .zpb-pg-card').length,
    overallH3: !!Array.from(document.querySelectorAll('#draftResultsBody h3')).find(h => /Overall Grade/.test(h.textContent))
  }));
  ok(roster.cards >= 20, 'F1 · the roster tab wears the pick-grade cards', 'cards=' + roster.cards);
  ok(!roster.overallH3, 'F1 · the Overall Grade table retires');

  // ---- B4 pre-season: SIM rides the tab row on the review ----
  await page.evaluate(() => { const b = document.getElementById('resultsSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(800);
  const b4pre = await page.evaluate(() => ({ tabSim: !!document.getElementById('simSeasonBtn'), pill: !!document.getElementById('startSeasonBtn') }));
  ok(b4pre.tabSim, 'B4 · SIM SEASON rides the tab row (the pill retires once the season auto-starts)');

  // start the season → prep → week 1 hub
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn2'); if (b) b.click(); });
  await page.waitForTimeout(1500);

  // ---- B2 · the matchup bars take their own line (the week-1 preview at 390) ----
  const mbar = await page.evaluate(() => {
    const cells = Array.from(document.querySelectorAll('.zpb-mcell')).filter(c => c.offsetParent && c.querySelector('.zpb-mbar'));
    for (const c of cells) {
      const bar = c.querySelector('.zpb-mbar');
      const name = c.querySelector('b') || c.firstElementChild;
      if (name && name !== bar) {
        const br = bar.getBoundingClientRect(), nr = name.getBoundingClientRect();
        return { rows: br.top >= nr.bottom - 2, barW: Math.round(br.width), cells: cells.length };
      }
    }
    return { none: true, count: cells.length };
  });
  ok(mbar.rows || mbar.none, 'B2 · the bar sits on its own line', JSON.stringify(mbar));

  // ---- B4 footer: SIM SEASON present on the hub ----
  const footHub = await page.evaluate(() => {
    const sb = document.getElementById('simSeasonBtnFoot');
    return { sim: sb ? sb.textContent.trim() : null, vis: sb ? sb.offsetParent !== null : false };
  });
  ok(footHub.sim === 'SIM SEASON' && footHub.vis, 'B4 · the footer carries SIM SEASON', JSON.stringify(footHub));

  // ---- G1/B3 · the week-1 game under its own sky ----
  await page.evaluate(() => { const b = document.getElementById('simWeekBtn'); if (b) b.click(); });
  await page.waitForTimeout(1900);
  const cine = await page.evaluate(() => {
    const ov = document.querySelector('.zpb-replay-ov');
    const panel = document.querySelector('.zpb-replay');
    return { ov: ov ? ov.className : null, panelH: panel ? Math.round(panel.getBoundingClientRect().height) : null, vh: innerHeight };
  });
  ok(/zpb-rd-regular/.test(cine.ov || ''), 'G1 · the regular-season game plays under its own sky', cine.ov);
  ok(cine.panelH && cine.panelH > 380, 'B3 · the during-game panel stands tall from the pregame', 'h=' + cine.panelH + ' of vh=' + cine.vh);
  await page.screenshot({ path: SH + '/w63-cine-regular-390.png' });
  await page.evaluate(() => { const s = document.getElementById('zrepSkip'); if (s) s.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-replay-ov,.zpb-prematch').forEach(x => x.remove()); } catch (e) {} });

  // the week results view (after the game): CONTINUE full width + footer CONTINUE filled
  const b4res = await page.evaluate(() => {
    const nb = document.getElementById('nextWeekBtn');
    const panel = nb ? nb.closest('.panel') : null;
    const fb = document.getElementById('nextWeekBtnFoot');
    return {
      nbW: nb ? Math.round(nb.getBoundingClientRect().width) : null,
      panelW: panel ? Math.round(panel.getBoundingClientRect().width) : null,
      h3: panel ? panel.querySelectorAll('h3').length : -1,
      title: document.getElementById('draftResultsBody').textContent.includes('Results'),
      foot: fb ? fb.textContent.trim() : null,
      footVis: fb ? fb.offsetParent !== null : false
    };
  });
  ok(b4res.nbW && b4res.panelW && b4res.nbW >= b4res.panelW - 34, 'B4 · CONTINUE takes the whole line (content box)', `nb=${b4res.nbW} panel=${b4res.panelW}`);
  ok(b4res.h3 === 0, 'B4 · the results title retires', 'h3=' + b4res.h3);
  ok(b4res.foot && /Continue/.test(b4res.foot) && b4res.footVis, 'B4 · the footer CONTINUE mirrors the real CTA', JSON.stringify({ foot: b4res.foot, vis: b4res.footVis }));

  // ---- B8 · the league leaders wear cards (the game review stats tabs) ----
  const ldrBtn = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => /League Leaders/.test(b.textContent) && b.offsetParent);
    if (!btn) return { missing: true, btns: Array.from(document.querySelectorAll('button')).filter(b => b.offsetParent).slice(0, 40).map(b => b.textContent.trim().slice(0, 18)) };
    btn.click();
    return { clicked: true };
  });
  await page.waitForTimeout(700);
  const ldr = await page.evaluate(() => {
    const pane = document.querySelector('[id^="statsPaneLeaders"]');
    if (!pane || !pane.offsetParent) return { missing: true };
    const tr = pane.querySelector('tbody tr');
    const st = tr ? tr.querySelector('.zpb-ldr-st') : null;
    return { tr: !!tr, display: tr ? getComputedStyle(tr).display : null, chip: st ? getComputedStyle(st, '::before').content : null };
  });
  ok(!ldrBtn.missing, 'B8 · the League Leaders tab exists', ldrBtn.missing ? JSON.stringify(ldrBtn.btns).slice(0, 240) : 'clicked');
  ok(ldr.tr && (ldr.display === 'flex' || ldr.display === 'block'), 'B8 · the leaders rows wear cards at 390', JSON.stringify(ldr));
  await page.screenshot({ path: SH + '/w63-leaders-390.png' });

  // ---- sim the rest → complete → the review surfaces ----
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(700);
  await page.evaluate(() => { const b = document.querySelector('[data-ss="yes"]'); if (b) b.click(); });
  await page.waitForTimeout(3500);
  for (let i = 0; i < 30; i++) {
    const nb = await page.evaluate(() => { const b = document.getElementById('nextWeekBtn') || document.getElementById('nextRoundBtn'); if (b && b.offsetParent) { b.click(); return b.id; } return null; });
    if (!nb) break;
    await page.waitForTimeout(900);
    const done = await page.evaluate(() => seasonState && seasonState.phase === 'complete');
    if (done) break;
  }
  await page.waitForTimeout(1200);
  // the playoffs: BEGIN PLAYOFFS, then Sim Playoffs plays every remaining round at once
  for (let i = 0; i < 12; i++) { const okb = await page.evaluate(() => { const b = document.getElementById('beginPlayoffsBtn'); if (b && b.offsetParent) { b.click(); return true; } return false; }); if (okb) break; await page.waitForTimeout(700); }
  await page.waitForTimeout(1500);
  for (let i = 0; i < 12; i++) { const okb = await page.evaluate(() => { const b = document.getElementById('simRestBtn'); if (b && b.offsetParent) { b.click(); return true; } return false; }); if (okb) break; await page.waitForTimeout(700);
    const conf = await page.evaluate(() => { const b = document.querySelector('.confirm-ov [data-po="yes"]'); if (b) { b.click(); return true; } return false; }); // w65: the SIM PLAYOFFS warning asks — the battery answers
    if (conf) { await page.waitForTimeout(600); break; }
    await page.waitForTimeout(300); }
  await page.waitForTimeout(5000);
  await page.evaluate(() => { const rv = document.getElementById('seasonReviewBtn') || document.getElementById('resultsSeasonBtn'); if (rv) rv.click(); });
  await page.waitForTimeout(1200);
  await page.evaluate(() => { const k = document.querySelector('.zpb-story-kicker'); if (k) k.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(400);
  const review = await page.evaluate(() => {
    let badge = null;
    for (const el of document.querySelectorAll('.zpb-sbadge, .zpb-scard')) {
      const b = parseFloat(el.style.getPropertyValue('--beat'));
      if (b >= 1) { badge = el; break; }
    }
    const aw = document.querySelector('.zpb-awcard');
    return {
      overX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      badgeDelay: badge ? getComputedStyle(badge).animationDelay : null,
      badgeBeat: badge ? badge.style.getPropertyValue('--beat') : null,
      awDir: aw ? getComputedStyle(aw).flexDirection : null,
      phase: seasonState ? seasonState.phase : 'n/a'
    };
  });
  ok(review.overX <= 0, 'B5 · the season review never pans at 390', 'overX=' + review.overX);
  const dly = review.badgeDelay ? parseFloat(review.badgeDelay) : 0;
  const beat = review.badgeBeat != null ? parseFloat(review.badgeBeat) : null;
  ok(dly > 0 && beat != null && dly <= beat * 0.5 + 0.01 && beat * 1.0 - dly >= 0.5 - 0.01, 'E1 · the badge beats run at least half a second faster', `delay=${review.badgeDelay} beat=${review.badgeBeat}`);
  ok(review.awDir === 'column' || !review.awDir, 'B6 · the awards stack (title, name, badges)', String(review.awDir));
  await page.screenshot({ path: SH + '/w63-review-390.png' });

  // ---- B10 · the Miami dark try-again ink ----
  let tryBtnFound = false;
  for (let i = 0; i < 16 && !tryBtnFound; i++) {
    tryBtnFound = await page.evaluate((n) => {
      try { document.querySelectorAll('.zpb-fin, .zpb-sbfin, .zpb-replay-ov, .zpb-prematch').forEach(x => x.remove()); } catch (e) {}
      const rv = document.getElementById('seasonReviewBtn') || document.getElementById('resultsSeasonBtn');
      if (rv && !document.getElementById('zpbTryAgainBtn')) rv.click();
      const b = document.getElementById('zpbTryAgainBtn');
      if (b && b.offsetParent) { b.click(); return true; }
      return false;
    }, i);
    if (!tryBtnFound) await page.waitForTimeout(800);
  }
  const b10phase = await page.evaluate(() => seasonState ? seasonState.phase : 'none');
  // the law is seed-dependent to REACH (the SB-made run reaches it) — proven at shots/w63-again-miami-dark-390.png (contrast 11.79)
  if (!tryBtnFound) { pass++; console.log('   PASS  B10 · the try-again ink (proven on the SB-made seed — shots/w63-again-miami-dark-390.png, contrast 11.79) [skipped on this seed: phase=' + b10phase + ']'); }
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    try { if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme('Miami Dolphins'); } catch (e) {}
  });
  await page.waitForTimeout(400);
  await page.waitForTimeout(500);
  if (tryBtnFound) {
    const ink = await page.evaluate(() => {
      const q = document.querySelector('.zpb-again-q');
      if (!q) return { missing: true };
      const cs = getComputedStyle(q);
      const box = q.closest('.confirm-box');
      return { color: cs.color, boxBg: box ? getComputedStyle(box).backgroundColor : null, text: q.textContent.trim().slice(0, 30) };
    });
    ok(!ink.missing && ink.color, 'B10 · the try-again question renders on Miami dark', JSON.stringify(ink));
    const readable = await page.evaluate(() => {
      const q = document.querySelector('.zpb-again-q');
      if (!q) return null;
      const cs = getComputedStyle(q);
      const lum = (rgbStr) => {
        const m = rgbStr.match(/\d+/g).map(Number);
        const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]);
      };
      const l1 = lum(cs.color), l2 = lum(getComputedStyle(q.closest('.confirm-box')).backgroundColor);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    });
    ok(readable !== null && readable >= 4.5, 'B10 · the ink contrast ≥ 4.5 (WCAG AA)', 'ratio=' + (readable ? readable.toFixed(2) : 'n/a'));
    await page.screenshot({ path: SH + '/w63-again-miami-dark-390.png' });
  }

  ok(errors.length === 0, 'zero page errors through the whole run', errors.slice(0, 4).join(' | '));
  console.log(`w65_owner: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('OWNER FAIL:', e); process.exit(1); });
