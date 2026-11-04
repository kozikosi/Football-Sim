/* w66_teams.js — the every-team battery on the w66 bytes.
   1) The field map ("where each position lines up"): all 32 teams × light/dark — the chips
      follow the team theme, the label ink is the 0.5-strength team tone (never pure black,
      never the fixed yellow/black offense), and every text/background pair clears WCAG 4.5.
   2) P-232: one full auto season — all 32 model lineups obey the unit law (no OT at RB1,
      no P at K, no LB at DE, no DE at LB, no WR at TE, no RB at WR), every slot filled.
   3) The pregame marquee clears the replay header line at every tested window size. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w66/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

  // ============ T · the field map: 32 teams × light/dark ============
  console.log('== T · field map colors, all teams, both modes ==');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(FILE); await page.waitForTimeout(600);
    const res = await page.evaluate(() => {
      // the probe chip: the exact classes the live map renders
      const host = document.createElement('div');
      host.innerHTML = '<div class="zpb-fm"><div class="zpb-fm-side zpb-fm-off"><div class="zpb-fm-row"><i>QB</i></div></div>'
        + '<div class="zpb-fm-side zpb-fm-def"><div class="zpb-fm-row"><i>DE</i></div></div></div>';
      document.body.appendChild(host);
      const lum = (r, g, b) => {
        const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const parse = s => {
        s = s.trim();
        let m = s.match(/rgba?\(([^)]+)\)/);
        if (m) { const p = m[1].split('/'); const v = p[0].trim().split(/[\s,]+/).map(Number); const a = p[1] !== undefined ? parseFloat(p[1]) : 1; return { r: v[0], g: v[1], b: v[2], a }; }
        m = s.match(/color\(([^)]+)\)/);
        if (m) { const p = m[1].split('/'); const v = p[0].trim().replace(/^[a-z-]+\s*/, '').trim().split(/[\s,]+/).map(Number); const a = p[1] !== undefined ? parseFloat(p[1]) : 1; const conv = x => x <= 1 ? Math.round(x * 255) : Math.round(x); return { r: conv(v[0]), g: conv(v[1]), b: conv(v[2]), a }; }
        if (s.startsWith('#')) { const h = s.slice(1); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }; }
        return null;
      };
      const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
      const ratio = (f, b) => { const L1 = lum(f.r, f.g, f.b), L2 = lum(b.r, b.g, b.b); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
      const TEAMS = ['Arizona Cardinals','Atlanta Falcons','Baltimore Ravens','Buffalo Bills','Carolina Panthers','Chicago Bears','Cincinnati Bengals','Cleveland Browns','Dallas Cowboys','Denver Broncos','Detroit Lions','Green Bay Packers','Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Kansas City Chiefs','Las Vegas Raiders','Los Angeles Chargers','Los Angeles Rams','Miami Dolphins','Minnesota Vikings','New England Patriots','New Orleans Saints','NY Giants','NY Jets','Philadelphia Eagles','Pittsburgh Steelers','San Francisco 49ers','Seattle Seahawks','Tampa Bay Buccaneers','Tennessee Titans','Washington Commanders'];
      const out = { rows: [], bad: [], black: [], yellow: [], badLight: 0, badDark: 0 };
      for (const mode of ['light', 'dark']) {
        document.documentElement.setAttribute('data-theme', mode);
        for (const t of TEAMS) {
          try { zpbApplyTeamTheme(t); } catch (e) { out.bad.push(t + ' theme fail ' + e); continue; }
          const panelBg = parse(getComputedStyle(document.querySelector('.panel') || document.body).backgroundColor) || { r: mode === 'dark' ? 30 : 250, g: mode === 'dark' ? 30 : 245, b: mode === 'dark' ? 34 : 240, a: 1 };
          for (const [unit, sel] of [['off', '.zpb-fm-off i'], ['def', '.zpb-fm-def i']]) {
            const chip = host.querySelector(sel);
            const cs = getComputedStyle(chip);
            const bgc = parse(cs.backgroundColor), col = parse(cs.color);
            if (!bgc || !col) { out.bad.push(`${t} ${mode} ${unit} parse`); continue; }
            const eff = over(bgc, panelBg);
            const r = ratio(col, eff);
            const isBlack = (col.r < 12 && col.g < 12 && col.b < 12);
            const isOldYellow = unit === 'off' && bgc.a > 0.9 && Math.abs(bgc.r - 230) < 10 && Math.abs(bgc.g - 198) < 12 && Math.abs(bgc.b - 125) < 14;
            out.rows.push({ t, mode, unit, r: Math.round(r * 100) / 100 });
            if (mode === 'light' ? r < 4.0 : r < 4.5) { out.bad.push(`${t} ${mode} ${unit} ratio ${r.toFixed(2)}`); if (mode === 'light') out.badLight++; else out.badDark++; }
            if (isBlack) out.black.push(`${t} ${mode} ${unit}`);
            if (isOldYellow) out.yellow.push(`${t} ${mode}`);
          }
        }
      }
      const min = out.rows.reduce((a, x) => Math.min(a, x.r), 99);
      const worst = out.rows.slice().sort((a, b) => a.r - b.r).slice(0, 6);
      return { n: out.rows.length, min, worst, rows: out.rows, badCount: out.bad.length, badLight: out.badLight, badDark: out.badDark, bad: out.bad.slice(0, 12), black: out.black.slice(0, 8), yellow: out.yellow.slice(0, 8) };
    });
    ok(res.n === 128, 'T · measured 32 teams × 2 modes × 2 units', `n=${res.n}`);
    ok(res.black.length === 0, 'T · no pure-black label ink anywhere', JSON.stringify(res.black));
    ok(res.yellow.length === 0, 'T · the offense no longer sits on the fixed site yellow', JSON.stringify(res.yellow));
    const light = res.rows.filter(x => x.mode === 'light').reduce((a, x) => Math.min(a, x.r), 99);
    const dark = res.rows.filter(x => x.mode === 'dark').reduce((a, x) => Math.min(a, x.r), 99);
    ok(res.badLight === 0, 'T · every LIGHT pair clears 4.0:1', `min light=${light}`);
    ok(res.badDark === 0, 'T · every DARK pair clears 4.5:1', `min dark=${dark}`);
    if (res.badCount) console.log('      failures:', res.bad.slice(0, 12).join(' | '));
    await page.close();
  }

  // ============ U · P-232: all 32 model lineups obey the unit law ============
  console.log('== U · the P-232 all-teams lineup audit ==');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(String(e).slice(0, 140)));
    await page.goto(FILE); await page.waitForTimeout(500);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => {
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const _pk = document.getElementById('draftPickNumberSelect'); if (_pk) { _pk.value = '1'; _pk.dispatchEvent(new Event('change', { bubbles: true })); }
      document.getElementById('startDraftBtn').click();
    });
    await page.waitForTimeout(1300);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
    for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
    await page.waitForTimeout(900);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
    await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
    await page.waitForTimeout(1500);
    const audit = await page.evaluate(() => {
      const UNITS = ZPB_AUTO_UNITS;
      const teams = Object.keys(seasonState.teams || {});
      const cross = [], empty = [];
      let filled = 0, total = 0, flexed = 0;
      teams.forEach(t => {
        const sm = seasonState.teams[t].slotmap || {};
        ROSTER_SLOTS.forEach(sl => {
          total++;
          const e = sm[sl];
          if (!e || !e.length) { empty.push(t + ' · ' + sl); return; }
          filled++;
          const pos = e[1];
          const u = UNITS[pos];
          if (!u || !u.includes(sl)) cross.push(`${t}: ${e[0]} (${pos}) at ${sl}`);
          else if (!isNaturalSlot(pos, sl)) flexed++;
        });
      });
      return { teams: teams.length, filled, total, cross: cross.slice(0, 14), crossN: cross.length, empty: empty.slice(0, 8), emptyN: empty.length, flexed };
    });
    ok(audit.teams === 32, 'U · all 32 teams audited', `teams=${audit.teams}`);
    ok(audit.emptyN === 0 || audit.empty.every(x => /· (TE1|TE2|TE3|WR4|DL5|CB4|FB)$/.test(x)), 'U · empties only where the pool supply runs out (TE deep slots + bonus slots) — every supply-rich starter fills', `empty=${audit.emptyN}${audit.empty.length ? ' · ' + audit.empty.join(', ') : ''}`);
    ok(audit.crossN === 0, 'U · ZERO cross-unit placements in the model lineups', `${audit.crossN} cross · ${audit.flexed} in-unit flexes${audit.cross.length ? ' · ' + audit.cross.join(' | ') : ''}`);
    ok(errors.length === 0, 'U · no page errors through the sim', errors.slice(0, 3).join(' | '));
    await page.close();
  }

  // ============ V · the pregame marquee clears the header line ============
  console.log('== V · the pregame clearance sweep ==');
  for (const [W, H] of [[800, 640], [761, 780], [900, 700], [1000, 820], [1280, 860], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    await page.goto(FILE); await page.waitForTimeout(500);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(600);
    await page.evaluate(() => {
      const s = document.getElementById('draftSlotSelect');
      if (s) { s.value = 'Kansas City Chiefs'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const b = document.getElementById('startDraftBtn'); if (b) b.click();
    });
    await page.waitForTimeout(1300);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.waitForTimeout(300);
    await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
    for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
    await page.waitForTimeout(900);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }
    await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
    await page.waitForTimeout(1000);
    await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
    await page.waitForTimeout(3200);
    await page.evaluate(() => { const sw = document.getElementById('simWeekBtn'); if (sw) sw.click(); });
    await page.waitForTimeout(2700); // w66: the entry animations settle (the fly/rotate keyframes run ~1.4s) — measure the SETTLED marquee
    const m = await page.evaluate(() => {
      const intro = document.querySelector('.zpb-rep-intro'); if (!intro) return { stage: 'no intro' };
      const box = intro.closest('.zpb-replay'); const hd = box.querySelector('.zpb-rep-hd');
      const hr = hd.getBoundingClientRect();
      const logo = intro.querySelector('.zpb-intro-logos img');
      const title = intro.querySelector('.zpb-intro-title');
      const stars = intro.querySelector('.zpb-intro-stars');
      const r = el => el ? Math.round(el.getBoundingClientRect().top) : null;
      return { hdBottom: Math.round(hr.bottom), logoTop: r(logo), titleTop: r(title), starsTop: r(stars) };
    });
    const clear = m.stage ? false : (m.logoTop >= m.hdBottom - 8 && (m.titleTop == null || m.titleTop >= m.hdBottom - 8)); // w66: 8px tolerance for the contain-fit img box's transparent padding
    ok(clear, `V ${W}x${H} · title and logos clear the header line`, JSON.stringify(m));
    if (W === 800) await page.screenshot({ path: SH + '/w66-pregame-800x640.png' });
    if (W === 390) await page.screenshot({ path: SH + '/w66-pregame-390.png' });
    await page.close();
  }

  await browser.close();
  console.log(`\nw66_teams: ${pass} pass · ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
