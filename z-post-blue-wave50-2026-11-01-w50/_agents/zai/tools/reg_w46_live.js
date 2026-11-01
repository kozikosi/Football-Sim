// w46_live.js — the wave-46 verification suite (both themes)
// Run: node w46_live.js <path-to-html>
const { chromium } = require('playwright');
const path = require('path');

const FILE = process.argv[2] || '/home/z/my-project/download/Football-Sim-Z-post-blue-w50.html';
let PASS = 0, FAIL = 0;
const ok = (name, cond, extra) => { if (cond) { PASS++; console.log('  ok  ' + name); } else { FAIL++; console.log('  FAIL ' + name + (extra ? ' · ' + extra : '')); } };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push('PE: ' + e.message.slice(0, 140)));
  page.on('console', m => { if (m.type() === 'error') errors.push('CE: ' + m.text().slice(0, 140)); });
  await page.goto('file://' + FILE, { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  // the Owner's session runs with an explicit theme (the toggle persists it) — pin light first
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(400);

  const setTheme = t => page.evaluate(t => document.documentElement.setAttribute('data-theme', t), t);

  // ---------- O1 · the ANCHOR pink ----------
  console.log('O1 · the Madden rankings pink');
  await page.click('#tabRankingsBtn'); await page.waitForTimeout(600);
  let anch = await page.evaluate(() => {
    const el = document.querySelector('.zpb-anch'); if (!el) return null;
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, border: cs.borderColor };
  });
  ok('light anchor fill softens to the rose wash', anch && anch.bg === 'rgb(242, 222, 230)', JSON.stringify(anch));
  ok('light anchor border softens', anch && anch.border === 'rgb(207, 163, 181)', JSON.stringify(anch));
  await setTheme('dark'); await page.waitForTimeout(300);
  anch = await page.evaluate(() => { const el = document.querySelector('.zpb-anch'); if (!el) return null; const cs = getComputedStyle(el); return { bg: cs.backgroundColor, border: cs.borderColor }; });
  ok('dark anchor untouched', anch && anch.bg === 'rgb(77, 47, 63)', JSON.stringify(anch));
  await setTheme('light'); await page.waitForTimeout(300);

  // ---------- O2 · the glossary condenses ----------
  console.log('O2 · the glossary condenses');
  await page.click('#tabGuideBtn'); await page.waitForTimeout(700);
  const gl = await page.evaluate(() => {
    const ul = document.querySelector('ul.gl.zpb-gloss');
    if (!ul) return null;
    const lis = [...ul.querySelectorAll('li')].map(li => li.textContent.trim());
    return lis;
  });
  ok('glossary renders', !!gl && gl.length > 10, gl && gl.length);
  if (gl) {
    const rb = gl.find(t => t.indexOf('Running Back') >= 0);
    ok('RB line condensed (RB1 · RB2 · Running Back · …)', rb && rb.startsWith('RB1 · RB2 · Running Back · Carries the ball'), rb && rb.slice(0, 80));
    const wr = gl.find(t => t.indexOf('Wide Receiver') >= 0);
    ok('WR line condensed (WR1 · WR2 · WR3 · WR4)', wr && wr.startsWith('WR1 · WR2 · WR3 · WR4 · Wide Receiver'), wr && wr.slice(0, 80));
    const lb = gl.find(t => t.indexOf('Outside Linebacker') >= 0);
    ok('WILL · SAM condensed', lb && lb.startsWith('WILL · SAM · Outside Linebacker'), lb && lb.slice(0, 80));
    const single = gl.find(t => t.indexOf('Quarterback') >= 0);
    ok('QB stays its own line', single && single.startsWith('QB · Quarterback'), single && single.slice(0, 70));
    ok('no doubled Running Back line', gl.filter(t => t.indexOf('Running Back') >= 0).length === 1);
  }

  // ---------- O3 · no dashes in visible text ----------
  console.log('O3 · the dash-free site');
  const dashProbe = async (label) => {
    const r = await page.evaluate(() => {
      const bad = [];
      const views = [document.body];
      views.forEach(rootV => {
        const t = rootV.innerText || '';
        const lines = t.split('\n');
        lines.forEach(ln => {
          if (/[\u2014\u2013]/.test(ln)) bad.push('dash: ' + ln.trim().slice(0, 60));
          const mm = /(^|\s)-($|\s)/.exec(ln);
          if (mm && !/^20-0$/.test(ln.trim())) bad.push('hyph: ' + ln.trim().slice(0, 60));
        });
      });
      return [...new Set(bad)].slice(0, 6);
    });
    ok(label + ': no em/en/standalone hyphen dashes in rendered text', r.length === 0, JSON.stringify(r));
  };
  await dashProbe('guide');
  await page.click('#tabRankingsBtn'); await page.waitForTimeout(500); await dashProbe('madden rankings');
  await page.click('#tabPlayersBtn'); await page.waitForTimeout(500); await dashProbe('player browser');
  await page.click('#tabGroupsBtn'); await page.waitForTimeout(500); await dashProbe('position rankings');
  await page.click('#tabCompareBtn'); await page.waitForTimeout(700); await dashProbe('team comparison');
  await page.click('#tabDraftBtn'); await page.waitForTimeout(500); await dashProbe('simulator');

  // ---------- O4 · the gold law on the comparison ----------
  console.log('O4 · the 90+ gold on the comparison');
  const gold = await page.evaluate(() => {
    const out = { all: 0, shm: 0, cream: 0 };
    document.querySelectorAll('#homeCmpResult .zpb-lu-cell').forEach(c => {
      const m = /(\d{2})$/.exec((c.textContent || '').trim());
      if (m && parseInt(m[1], 10) >= 90) { out.all++; if (c.classList.contains('zpb-shm')) out.shm++; }
    });
    // any cream band left in the cell gradient?
    document.querySelectorAll('#homeCmpResult .zpb-lu-cell.zpb-shm').forEach(c => {
      const bi = getComputedStyle(c).backgroundImage || '';
      if (/255, 233, 198|255, 246, 227/.test(bi)) out.cream++;
    });
    return out;
  });
  ok('every 90+ cell shimmers (light)', gold.all >= 9 && gold.all === gold.shm, JSON.stringify(gold));
  ok('no cream bands in the cell gradient', gold.cream === 0);
  const crosby = await page.evaluate(() => {
    const cells = [...document.querySelectorAll('#homeCmpResult .zpb-lu-cell')];
    const c = cells.find(x => /Maxx Crosby/.test(x.textContent));
    return c ? c.className : null;
  });
  ok('Maxx Crosby wears the shimmer', !!crosby && crosby.includes('zpb-shm'), crosby);

  // ---------- O5/O7 · the front pick + the retired recommendation ----------
  console.log('O7 · the front speaks visually');
  const fp = await page.evaluate(() => {
    const roster = { slots: { DT2: ['Bigger Tackle', 'DT', 'LV', 88], WILL: ['Will Backer', 'WILL', 'LV', 84], MIKE: ['Mike Backer', 'MIKE', 'LV', 85], SAM: ['Sam Backer', 'SAM', 'LV', 82], QB: ['Q', 'QB', 'LV', 90] } };
    const html = window.zpbFrontPickHTML ? window.zpbFrontPickHTML(roster) : '';
    const pick = h => {
      const a = h.indexOf('title="4-3"'), b = h.indexOf('title="3-4"');
      const spanAt = (idx) => { const seg = h.slice(Math.max(0, idx - 90), idx); return seg.indexOf('zpb-fp-on') >= 0; };
      return { four3: spanAt(a), three4: spanAt(b) };
    };
    const p1 = pick(html);
    const roster2 = { slots: Object.assign({}, roster.slots, { WILL: ['Will Backer', 'WILL', 'LV', 92] }) };
    const p2 = pick(window.zpbFrontPickHTML(roster2));
    return { has: !!html, on43: p1.four3 && !p1.three4, on34: p2.three4 && !p2.four3 };
  });
  ok('front pick renders', fp.has);
  ok('DT2 better lights the 4-3', fp.on43 === true, JSON.stringify(fp));
  ok('ILB2 better lights the 3-4', fp.on34 === true, JSON.stringify(fp));
  const adviceGone = await page.evaluate(() => typeof lineupAdviceHTML !== 'function' && !/The math recommends a different lineup/.test(document.body.innerHTML));
  ok('the ten-move recommendation is gone (code and text)', adviceGone);

  // ---------- O6 · the position-rank note ----------
  const noteGone = await page.evaluate(() => !/Position rank counts your player/.test(document.body.textContent));
  ok('the position-rank note is gone', noteGone);

  // ---------- O8 · the during-game screen one voice ----------
  console.log('O8 · the during-game screen');
  const dg = await page.evaluate(() => {
    try {
      const mk = team => {
        const pk = zpbPackFor(team);
        return { home: 'Kansas City Chiefs', away: 'Las Vegas Raiders',
          result: { homeScore: 30, awayScore: 21, ot: false,
            homeEvents: [{ q: 2, t: 0.5, pts: 7, type: 'TD', side: 'home' }, { q: 4, t: 0.2, pts: 3, type: 'FG', side: 'home' }],
            awayEvents: [{ q: 1, t: 0.7, pts: 7, type: 'TD', side: 'away' }],
            homeStats: { turnovers: 1 }, awayStats: { turnovers: 1 } },
          detail: {
            home: { players: [{ name: 'Patrick Mahomes', slot: 'QB', group: 'QB', ovr: 93, st: {}, impact: 1 }, { name: 'Isiah Pacheco', slot: 'RB1', group: 'RB', ovr: 84, st: {}, impact: 0.5 }, { name: 'Rashee Rice', slot: 'WR1', group: 'WR', ovr: 89, st: {}, impact: 0.5 }], takeaways: [], blocks: [] },
            away: { players: [{ name: 'Gardner Minshew', slot: 'QB', group: 'QB', ovr: 75, st: {}, impact: 1 }, { name: 'Alexander Mattison', slot: 'RB1', group: 'RB', ovr: 74, st: {}, impact: 0.5 }, { name: 'Jakobi Meyers', slot: 'WR1', group: 'WR', ovr: 80, st: {}, impact: 0.5 }], takeaways: [], blocks: [] }
          },
          roundLabel: '', divisional: false };
      };
      const g = mk();
      zpbGameReplay(g, 'Kansas City Chiefs');
      return { started: !!document.querySelector('.zpb-replay-ov') };
    } catch (e) { return { err: String(e).slice(0, 120) }; }
  });
  ok('the during-game replay opens', dg.started && !dg.err, JSON.stringify(dg));
  await page.waitForTimeout(400);
  // first Skip ends the intro; the second flushes the whole report instantly
  await page.evaluate(() => { const b = document.getElementById('zrepSkip'); if (b) b.click(); });
  await page.waitForTimeout(2200);
  await page.evaluate(() => { const b = document.getElementById('zrepSkip'); if (b) b.click(); });
  await page.waitForTimeout(1400);
  const dgColors = await page.evaluate(() => {
    const out = { abbrs: [], scores: [], headerScore: null, lines: 0 };
    document.querySelectorAll('.zpb-replay .zrl-team').forEach(el => { out.abbrs.push(getComputedStyle(el).color); });
    document.querySelectorAll('.zpb-replay .zrl-sc b').forEach(el => { out.scores.push(getComputedStyle(el).color); });
    out.lines = document.querySelectorAll('.zpb-replay .zpb-rep-line').length;
    const sa = document.getElementById('zrepSa');
    if (sa) out.headerScore = getComputedStyle(sa).color;
    return out;
  });
  const kctx = await page.evaluate(() => { const pk = zpbPackFor('Kansas City Chiefs'); return { txM: pk.txM, txd: pk.txd }; });
  const lvtx = await page.evaluate(() => { const pk = zpbPackFor('Las Vegas Raiders'); return { txM: pk.txM, txd: pk.txd }; });
  const hex2rgb = h => { const m = /^#([0-9a-f]{6})$/i.exec(h); return m ? [parseInt(m[1].slice(0,2),16), parseInt(m[1].slice(2,4),16), parseInt(m[1].slice(4,6),16)] : null; };
  const near = (rgb, h) => { const a = hex2rgb(h); return a && rgb && a.every((v, i) => Math.abs(v - rgb[i]) <= 1); };
  const parseRGB = s => { const m = /rgba?\(([^)]+)\)/.exec(s || ''); return m ? m[1].split(',').slice(0, 3).map(x => parseInt(x, 10)) : null; };
  const bothInks = [kctx.txM, kctx.txd, lvtx.txM, lvtx.txd];
  ok('report abbreviations ride the halfway inks', dgColors.abbrs.length >= 2 && dgColors.abbrs.every(c => bothInks.some(h => near(parseRGB(c), h))), JSON.stringify(dgColors.abbrs.slice(0, 3)) + ' vs ' + bothInks.join('/'));
  ok('running-score numbers ride the halfway inks', dgColors.scores.length >= 2 && dgColors.scores.every(c => bothInks.some(h => near(parseRGB(c), h))), JSON.stringify(dgColors.scores.slice(0, 2)));
  ok('header score chip rides the halfway ink (either side)', dgColors.headerScore && bothInks.some(h => near(parseRGB(dgColors.headerScore), h))), dgColors.headerScore + ' vs ' + bothInks.join('/');
  // close the overlay
  await page.evaluate(() => { const x = document.querySelector('.zpb-replay-ov'); if (x) x.remove(); });

  // ---------- O8 · the unit comparison wears the dropdown ink ----------
  const unitInk = await page.evaluate(() => {
    const tds = [...document.querySelectorAll('#homeCmpResult table td')];
    const win = tds.find(td => (td.getAttribute('style') || '').indexOf('font-weight:700') >= 0);
    return win ? { style: win.getAttribute('style'), color: getComputedStyle(win).color } : null;
  });
  ok('unit comparison winner rides the halfway ink', unitInk && unitInk.style.indexOf('--zr1') >= 0, JSON.stringify(unitInk));

  // ---------- errors ----------
  const realErrors = errors.filter(e => !/ResizeObserver/.test(e));
  ok('zero console errors', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));

  console.log('');
  console.log('w46_live: ' + PASS + ' pass · ' + FAIL + ' fail');
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})();
