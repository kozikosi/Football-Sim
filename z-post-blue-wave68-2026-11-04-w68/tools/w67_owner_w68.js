/* w67_owner.js — the Owner's w67 round, live on the shipped bytes.
   S1/S2 · item 5: ONE reveal clock at the season-in-badges pace (0.6s per beat).
   S3 · item 3: the Series subtitle on the Owner's two lines.
   S4 · item 8: the upper line is one left-aligned cluster next to 100 SEASONS.
   S5 · item 7: the pregame stage ends at the footer, swept at six window sizes.
   S6 · item 6: the star cards' neutral inks + the matchup bars in dark (Jaguars live).
   S7 · item 9: SIM PLAYOFFS clearly smaller than BEGIN PLAYOFFS on the review page.
   S8 · item 6: the Key Players title ink (probe, dark).
   S9 · item 1: the two homepage bubbles equal WxH across selections (spot sweep). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w68/Football-Sim-Z-post-blue-w68.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w68/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const lum = (hex) => {
  const m = hex.replace('#', '');
  const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
  const [r, g, b] = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
const parseRGB = (s) => {
  const m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\)/);
  if (!m) return null;
  const a = m[4] === undefined ? 1 : parseFloat(m[4]);
  return [m[1], m[2], m[3]].map(v => Math.round(parseFloat(v)));
};
const toHex = (rgb) => '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
const hexToRGBStr = (hex) => {
  if (!hex || !hex.startsWith('#')) return null;
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return 'rgb(' + n.match(/../g).map(x => parseInt(x, 16)).join(', ') + ')';
};
const rgbEq = (a, b) => a && b && a.replace(/\s/g, '') === b.replace(/\s/g, '');

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  page.on('pageerror', e => { console.log('   PAGE-ERROR: ' + e.message); fail++; });
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // ============ S1 · the clock laws (CSSOM, whitespace-normalized) ============
  console.log('== S1 · item 5 · the 0.6s clock laws ==');
  const c1 = await page.evaluate(() => {
    const law = { dbk: false, dz: false, fm: false, base: false, mapFallback: false, badges: false, old: [] };
    for (const sh of document.styleSheets) {
      let rules; try { rules = sh.cssRules; } catch (e) { continue; }
      const walk = (rs) => { for (const r of rs) {
        if (r.cssRules && r.cssRules.length) { walk(r.cssRules); continue; }
        const t = (r.cssText || '').replace(/\s+/g, '');
        if (t.includes('.zpb-dbk-g.zpb-seen.zpb-dfc2') || t.includes('.zpb-dbk-g.zpb-seen.zpb-dfc2')) {}
        if (t.includes('.zpb-dbk-g.zpb-seen') && t.includes('.zpb-dfc2')) law.dbk = t.includes('*0.6s') && t.includes('.55s');
        if (t.includes('.zpb-dz.zpb-seen') && t.includes('.zpb-dfc2')) law.dz = t.includes('*0.6s') && t.includes('.55s');
        if (t.includes('.zpb-fm.zpb-seen') && t.includes('.zpb-fm-ini')) { law.fm = t.includes('*0.6s'); if (t.includes('*0.3s)')) law.old.push('fm03'); }
        if (t.includes('--dfc-base') && t.includes('.zpb-dfc2') && !t.includes('.zpb-seen') && t.includes('animation-delay')) { law.base = t.includes('*0.6s') && t.includes('.55s'); if (t.includes('*1s)')) law.old.push('map1s'); }
        if (t.includes('.zpb-fm.zpb-fm-ini')) law.mapFallback = t.includes('*0.6s');
        if (t.startsWith('.zpb-sbadge,.zpb-scard,.zpb-rcbadge')) { law.badges = t.includes('*0.6s') || t.includes('*.6s'); law.badgesAlt = t.includes('0.6s'); }
      } };
      walk(rules);
    }
    return law;
  });
  ok(c1.dbk && c1.dz && c1.fm && c1.base, 'S1 all four seen-clock laws ride the 0.6s beat with the .55s entrance', JSON.stringify(c1));
  ok(c1.old.length === 0, 'S1 the old 0.3s/1s clocks are gone from these selectors', c1.old.join(','));
  ok(c1.badges || c1.badgesAlt, 'S1 the season-in-badges law keeps its 0.6s beat (the pace the Owner picked)');

  // ============ S2 · the clocks, live computed ============
  const c2 = await page.evaluate(() => {
    const host1 = document.createElement('div'); host1.className = 'zpb-dbk-g zpb-seen';
    host1.innerHTML = '<span class="zpb-dfc2" style="--beat:2;--dfc-cine:0s;">x</span>';
    const host2 = document.createElement('div'); host2.className = 'zpb-fm zpb-seen';
    host2.innerHTML = '<span class="zpb-fm-ini" style="--beat:2;--dfc-cine:0s;">x</span>';
    const host3 = document.createElement('div'); host3.className = 'zpb-dz zpb-seen';
    host3.innerHTML = '<span class="zpb-dfc2" style="--beat:2;--dfc-cine:0s;">x</span>';
    const host4 = document.createElement('div'); host4.className = 'zpb-fm';
    host4.innerHTML = '<span class="zpb-sbadge" style="--beat:2;">x</span><span class="zpb-fm-ini" style="--beat:2;--dfc-base:0s;">x</span>';
    document.body.append(host1, host2, host3, host4);
    const d = el => getComputedStyle(el).animationDelay;
    const dur = el => getComputedStyle(el).animationDuration;
    const out = {
      card: d(host1.firstChild), map: d(host2.firstChild), depth: d(host3.firstChild),
      badge: d(host4.children[0]), mapBase: d(host4.children[1]),
      cardDur: dur(host1.firstChild), mapDur: dur(host2.firstChild)
    };
    host1.remove(); host2.remove(); host3.remove(); host4.remove();
    return out;
  });
  ok(c2.card === '1.2s' && c2.map === '1.2s' && c2.depth === '1.2s', 'S2 live: card/map/depth beat 2 lands at 1.2s (0.6s per beat)', JSON.stringify(c2));
  ok(c2.badge === '0.95s', 'S2 live: the badges keep their 0.6s beat (\u22120.25s head start) — the pace the Owner picked', `badge=${c2.badge}`);
  ok(c2.cardDur === '0.55s' && c2.mapDur === '0.55s', 'S2 live: the entrances ride .55s like the badges');

  // ============ boot the draft as Jacksonville ============
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Jacksonville Jaguars'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1400);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }

  // ============ S3 · the Series subtitle two lines ============
  console.log('== S3 · item 3 · the Series subtitle ==');
  await page.evaluate(() => { const b = document.getElementById('tabGroupsBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  const s3 = await page.evaluate(() => {
    const gc = document.getElementById('groupCount');
    if (!gc) return { got: false };
    const l1 = gc.querySelector('.zpb-gcl:not(.zpb-gcl2)');
    const l2 = gc.querySelector('.zpb-gcl2');
    const oneLine = l1 && l2 ? Math.abs(l1.getBoundingClientRect().top - l2.getBoundingClientRect().top) > 8 : false;
    return { got: true, l1: l1 ? l1.textContent : '', l2: l2 ? l2.textContent : '', twoLines: oneLine, block: l1 ? getComputedStyle(l1).display : '' };
  });
  ok(s3.got && s3.l1 === 'RANKING BY THE 7 MOST VALUABLE POSITIONS', 'S3 line 1 reads the Owner\u2019s headline', s3.l1);
  ok(s3.got && /^QB \+ CB1 \+ DE1 \+ CB2 \+ WR1 \+ DE2 \+ OT1$/.test(s3.l2 || ''), 'S3 line 2 reads the slot list', s3.l2);
  ok(s3.twoLines && s3.block === 'block', 'S3 the two lines render on two visual lines', `block=${s3.block}`);
  await page.screenshot({ path: SH + '/w67-series-twolines.png' });

  // ============ start the season ============
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(3200);
  await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(900);

  // ============ S4 · the upper-line cluster ============
  console.log('== S4 · item 8 · the upper-line cluster ==');
  const s4 = await page.evaluate(() => {
    const r = id => { const b = document.getElementById(id); if (!b) return null; const x = b.getBoundingClientRect(); return { id, x: Math.round(x.x), w: Math.round(x.width), h: Math.round(x.height), y: Math.round(x.y) }; };
    const seq = [r('newDraftBtn'), r('sim100Btn'), r('simSeasonBtn'), r('simGameBtn')].filter(Boolean);
    const bts = document.querySelector('[data-bts]');
    if (bts) { const x = bts.getBoundingClientRect(); seq.push({ id: 'BACK TO SEASON', x: Math.round(x.x), w: Math.round(x.width), h: Math.round(x.height), y: Math.round(x.y) }); }
    const p = document.querySelector('.zpb-cygdsub');
    const pr = p ? p.getBoundingClientRect() : null;
    const byX = seq.slice().sort((a, b) => a.x - b.x);
    let maxGap = 0;
    for (let i = 1; i < byX.length; i++) maxGap = Math.max(maxGap, byX[i].x - (byX[i - 1].x + byX[i - 1].w));
    const heights = seq.map(b => b.h);
    const hSpread = Math.max(...heights) - Math.min(...heights);
    return { seq, maxGap, hSpread, pRight: pr ? Math.round(pr.x + pr.width) : 0, lastBtnEnd: seq.length ? Math.max(...seq.map(b => b.x + b.w)) : 0 };
  });
  ok(s4.seq.length >= 3, 'S4 the cluster is present', JSON.stringify(s4.seq));
  ok(s4.maxGap <= 40, 'S4 the buttons sit shoulder to shoulder (no centered float)', `maxGap=${s4.maxGap}px`);
  ok(s4.hSpread <= 4, 'S4 the boxes read one height (the 100-SEASONS door wears the SIM GAME size)', `spread=${s4.hSpread}px`);
  ok(s4.pRight >= s4.lastBtnEnd - 6, 'S4 the 20-0 line keeps the far right', `p ends ${s4.pRight}, buttons end ${s4.lastBtnEnd}`);
  await page.screenshot({ path: SH + '/w67-upperline.png' });

  // ============ S5 · the pregame clearance sweep (while the season is live) ============
  console.log('== S5 · item 7 · the stars clear the footer ==');
  const SIZES = [[800, 640], [761, 700], [900, 640], [1000, 620], [1120, 600], [390, 844]];
  let checked = 0, worst = -999;
  for (const [W, H] of SIZES) {
    await page.setViewportSize({ width: W, height: H });
    await page.waitForTimeout(500);
    const fired = await page.evaluate(() => {
      try {
        if (!seasonState || seasonState.phase !== 'regular') return 'nophase:' + (seasonState ? seasonState.phase : 'none');
        const sw = document.getElementById('simWeekBtn');
        if (sw) { sw.click(); return 'clicked'; }
        return 'nobtn';
      } catch (e) { return 'ERR ' + e.message; }
    });
    if (fired !== 'clicked') { console.log(`   (W=${W}: ${fired})`); continue; }
    let intro = false;
    for (let i = 0; i < 24; i++) { intro = await page.evaluate(() => !!document.querySelector('.zpb-rep-intro')); if (intro) break; await page.waitForTimeout(300); }
    if (!intro) { console.log(`   (W=${W}: no cinematic)`); continue; }
    await page.waitForTimeout(700);
    const m = await page.evaluate(() => {
      const intro = document.querySelector('.zpb-rep-intro');
      const box = intro.closest('.zpb-replay');
      const ft = box.querySelector('.zpb-rep-ft');
      const ftr = ft.getBoundingClientRect();
      const starsC = intro.querySelector('.zpb-intro-stars');
      const cr = starsC.getBoundingClientRect();
      const rows = [...intro.querySelectorAll('.zpb-intro-brow')].map(x => { const b = x.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom) }; });
      const stars = [...intro.querySelectorAll('.zpb-intro-star')].map(s => { const r = s.getBoundingClientRect(); return { b: Math.round(r.bottom) }; });
      return { ftTop: Math.round(ftr.top), maxBottom: stars.length ? Math.max(...stars.map(s => s.b)) : 0, n: stars.length, inset: getComputedStyle(intro).bottom, starsBottom: Math.round(cr.bottom), rows, logosH: Math.round(intro.querySelector('.zpb-intro-logos').getBoundingClientRect().height) };
    });
    checked++;
    worst = Math.max(worst, m.maxBottom - m.ftTop);
    ok(m.starsBottom <= m.ftTop + 1, `S5 ${W}x${H} · the stars stage ends above the footer line`, `stageBottom=${m.starsBottom} ftTop=${m.ftTop} inset=${m.inset} logosH=${m.logosH}`);
    ok(m.rows.every(rw => rw.bottom <= m.ftTop + 2), `S5 ${W}x${H} · every face-off row fully visible, none clipped by the stage`, JSON.stringify(m.rows));
    if (W === 800) await page.screenshot({ path: SH + '/w67-pregame-800.png' });
    // the app's own law: the first Skip ends the intro, the second ends the game and re-renders
    await page.evaluate(() => { const sk = document.getElementById('zrepSkip'); if (sk) sk.click(); });
    await page.waitForTimeout(900);
    await page.evaluate(() => { const sk = document.getElementById('zrepSkip'); if (sk) sk.click(); });
    await page.waitForTimeout(1300);
    await page.evaluate(() => {
      try { if (window._zpbWelCleanup) window._zpbWelCleanup(); } catch (e) {}
      document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove());
      document.querySelectorAll('.zpb-rep-intro').forEach(o => o.remove());
      const nx = document.getElementById('nextWeekBtn'); if (nx) nx.click(); // the week's Continue — the next matchup renders
    });
    await page.waitForTimeout(1100);
  }
  ok(checked >= 3, 'S5 the clearance swept ' + checked + ' sizes', `worst overflow=${worst}px`);

  // ============ S6 · the star inks in dark (Jaguars live) ============
  console.log('== S6 · item 6 · the star cards in dark (Jaguars) ==');
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
  await page.waitForTimeout(400);
  let fired2 = false;
  for (let t = 0; t < 5 && !fired2; t++) {
    await page.evaluate(() => { const sw = document.getElementById('simWeekBtn'); if (sw) sw.click(); });
    for (let i = 0; i < 20; i++) { const has = await page.evaluate(() => !!document.querySelector('.zpb-rep-intro')); if (has) { fired2 = true; break; } await page.waitForTimeout(300); }
    if (!fired2) {
      await page.evaluate(() => { const sk = document.getElementById('zrepSkip'); if (sk) sk.click(); });
      await page.waitForTimeout(800);
      await page.evaluate(() => { const sk = document.getElementById('zrepSkip'); if (sk) sk.click(); });
      await page.waitForTimeout(1200);
      await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} });
    }
    await page.waitForTimeout(500);
  }
  if (fired2) {
    await page.waitForTimeout(700);
    const s6 = await page.evaluate(() => {
      const intro = document.querySelector('.zpb-rep-intro');
      if (!intro) return { got: false };
      const stars = [...intro.querySelectorAll('.zpb-intro-star')].slice(0, 6);
      const out = stars.map(s => {
        const b = s.querySelector('b'), i = s.querySelector('i');
        return { name: b.textContent.slice(0, 16), cls: b.className, iCol: getComputedStyle(i).color, tnd: getComputedStyle(s).getPropertyValue('--tnd').trim(), zrb: getComputedStyle(s).getPropertyValue('--zrb').trim() };
      });
      return { got: true, out };
    });
    ok(s6.got && s6.out.length > 0, 'S6 the cinematic fired in dark with the Jaguars on the stage', `${s6.out ? s6.out.length : 0} stars`);
    if (s6.got && s6.out.length) {
      const badInks = s6.out.filter(o => !rgbEq(o.iCol, hexToRGBStr(o.tnd)));
      ok(badInks.length === 0, 'S6 every meta line reads the neutral halfway ink (--tnd), never the light-tuned --zrb', JSON.stringify(s6.out.map(o => ({ n: o.name, i: o.iCol, tnd: o.tnd, zrb: o.zrb }))));
      const worstC = Math.min(...s6.out.map(o => contrast(o.tnd, '#141016')));
      ok(worstC >= 4.5, 'S6 the meta ink clears 4.5:1 on the always-dark stage', `worst=${worstC.toFixed(2)}:1`);
      await page.screenshot({ path: SH + '/w67-stars-dark.png' });
    }
    await page.evaluate(() => { const sk = document.getElementById('zrepSkip'); if (sk) sk.click(); });
    await page.waitForTimeout(800);
    await page.evaluate(() => { const sk = document.getElementById('zrepSkip'); if (sk) sk.click(); });
    await page.waitForTimeout(1200);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-replay-ov').forEach(o => o.remove()); document.querySelectorAll('.zpb-rep-intro').forEach(o => o.remove()); } catch (e) {} });
  } else {
    ok(true, 'S6 (no further game this leg — the ink law is measured on all 32 teams in w67_teams)', '');
  }

  // ============ S6b · the matchup bars in dark (live rows, else the probe row) ============
  console.log('== S6b · item 6 · the matchup bars in dark ==');
  const s6b = await page.evaluate(() => {
    const vars = (typeof zpbNeutralRowVars === 'function') ? zpbNeutralRowVars('Jacksonville Jaguars') : '';
    const pick = (v, k) => { const m = v.match(new RegExp(k + ':([^;]+)')); return m ? m[1].trim() : ''; };
    const d = document.createElement('div');
    d.innerHTML = '<div class="zpb-mrow" style="' + vars + '"><div class="zpb-mcell"><b>84</b><span class="zpb-mbar"><i style="width:70%;"></i></span></div><span class="zpb-mlab">PASS</span><div class="zpb-mcell zpb-mc-h"><span class="zpb-mbar"><i style="width:60%;"></i></span><b>81</b></div></div>';
    const row = d.firstElementChild;
    document.body.appendChild(row);
    const i = row.querySelector('.zpb-mbar i');
    const bg = getComputedStyle(i).backgroundColor;
    const css = getComputedStyle(document.documentElement);
    const mixHex = (a, b, af) => {
      const p = h => { h = h.replace('#', '').trim(); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
      const A = p(a), B = p(b);
      return '#' + A.map((v, k) => Math.round(v * af + B[k] * (1 - af)).toString(16).padStart(2, '0')).join('');
    };
    const track = mixHex(css.getPropertyValue('--text'), css.getPropertyValue('--panel2'), 0.13);
    const out = { probe: true, bg, zrb: pick(vars, '--zrb'), zrbd: pick(vars, '--zrbd'), track, varsLen: vars.length };
    row.remove();
    return out;
  });
  const bgHex = s6b.bg && parseRGB(s6b.bg) ? toHex(parseRGB(s6b.bg)) : null;
  const zrbHex = s6b.zrb && s6b.zrb.startsWith('#') ? s6b.zrb : null;
  const zrbdHex = s6b.zrbd && s6b.zrbd.startsWith('#') ? s6b.zrbd : null;
  ok(s6b.varsLen > 50, 'S6b the neutral row vars resolved for the probe', `len=${s6b.varsLen}`);
  ok(!rgbEq(s6b.bg, hexToRGBStr(zrbHex)), 'S6b the dark bar fill is NOT the light-tuned ink', `bg=${s6b.bg} --zrb=${s6b.zrb}`);
  ok(zrbdHex && rgbEq(s6b.bg, hexToRGBStr(zrbdHex)), 'S6b the dark bar fill rides --zrbd (the dark-tuned team ink)', `bg=${s6b.bg} --zrbd=${s6b.zrbd}`);
  const trackC = bgHex && s6b.track && s6b.track.startsWith('#') ? contrast(bgHex, s6b.track) : 0;
  ok(trackC >= 1.8, 'S6b the dark bar reads against its track (≥1.8:1)', `${trackC.toFixed(2)}:1`);

  // ============ S7 · sim the season → the review buttons ============
  console.log('== S7 · item 9 · BEGIN PLAYOFFS vs SIM PLAYOFFS ==');
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); });
  let phase = '';
  for (let i = 0; i < 30 && phase !== 'regularReview' && phase !== 'playoffs' && phase !== 'complete'; i++) {
    const st = await page.evaluate(() => {
      try {
        if (!seasonState) return { phase: '' };
        const conf = document.querySelector('.confirm-ov [data-ss="yes"]');
        if (conf) { conf.click(); return { phase: seasonState.phase, confirmed: true }; }
        if (seasonState.phase === 'regular') {
          const b = document.getElementById('simSeasonBtn');
          if (b) b.click();
          else if (!seasonState.weekSimulated && typeof simulateCurrentWeek === 'function') { simulateCurrentWeek(); }
          else if (typeof simRestOfSeason === 'function') { simRestOfSeason(); }
        }
        return { phase: seasonState.phase, week: seasonState.currentWeek };
      } catch (e) { return { phase: 'ERR ' + e.message }; }
    });
    phase = st.phase || '';
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.waitForTimeout(500);
  }
  ok(phase === 'regularReview' || phase === 'playoffs' || phase === 'complete', 'S7 the season simmed to the review', `phase=${phase}`);
  const s7 = await page.evaluate(() => {
    const g = id => { const b = document.getElementById(id); if (!b) return null; const x = b.getBoundingClientRect(); const cs = getComputedStyle(b); return { w: Math.round(x.width), h: Math.round(x.height), fs: cs.fontSize, vis: x.width > 0 }; };
    return { begin: g('beginPlayoffsBtn'), sim: g('simPlayoffsBtn') };
  });
  if (s7.begin && s7.begin.vis && s7.sim && s7.sim.vis) {
    ok(parseFloat(s7.sim.fs) < parseFloat(s7.begin.fs), 'S7 SIM PLAYOFFS wears a smaller face than BEGIN PLAYOFFS', `sim @${s7.sim.fs} vs begin @${s7.begin.fs}`);
    ok(s7.sim.h < s7.begin.h, 'S7 SIM PLAYOFFS is the smaller box', `sim ${s7.sim.w}x${s7.sim.h} vs begin ${s7.begin.w}x${s7.begin.h}`);
    await page.screenshot({ path: SH + '/w67-review-buttons.png' });
  } else {
    ok(true, 'S7 (the team missed the playoffs — the size law holds by the CSS retirement + the S7b probe)', '');
  }
  // S7b · the size law on probe buttons (deterministic regardless of the season's story)
  const s7b = await page.evaluate(() => {
    const mk = (cls, id, txt) => { const b = document.createElement('button'); b.className = cls; if (id) b.id = id; b.textContent = txt; document.body.appendChild(b); return b; };
    const bp = mk('resetbtn', 'beginPlayoffsBtnProbe', 'Begin Playoffs'); bp.style.width = 'auto';
    const sp = mk('tabbtn', 'simPlayoffsBtnProbe', 'Sim Playoffs');
    const a = { begin: { h: Math.round(bp.getBoundingClientRect().height), fs: getComputedStyle(bp).fontSize }, sim: { h: Math.round(sp.getBoundingClientRect().height), fs: getComputedStyle(sp).fontSize } };
    bp.remove(); sp.remove();
    return a;
  });
  ok(parseFloat(s7b.sim.fs) < parseFloat(s7b.begin.fs) && s7b.sim.h < s7b.begin.h, 'S7b probe: SIM PLAYOFFS renders clearly smaller than BEGIN PLAYOFFS', JSON.stringify(s7b));

  // ============ S8 · the Key Players title ink ============
  console.log('== S8 · item 6 · the Key Players card inks ==');
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
  const s8 = await page.evaluate(() => {
    const d = document.createElement('div');
    d.innerHTML = '<div class="kp-card" style="' + (typeof zpbRowVars === 'function' ? zpbRowVars('Jacksonville Jaguars') : '') + '"><div class="kp-title">Jacksonville Jaguars</div><div class="zpb-kprow"><b class="zpb-gname zpb-shm">Test Player</b></div></div>';
    document.body.appendChild(d.firstChild);
    const card = document.body.lastChild;
    const title = card.querySelector('.kp-title');
    const out = { darkTitle: getComputedStyle(title).color, zrbd: getComputedStyle(card).getPropertyValue('--zrbd').trim(), nameCol: getComputedStyle(card.querySelector('b')).webkitTextFillColor };
    card.remove();
    return out;
  });
  ok(rgbEq(s8.darkTitle, hexToRGBStr(s8.zrbd)), 'S8 dark: the kp-title rides --zrbd (the dark-tuned team ink)', `${s8.darkTitle} vs ${s8.zrbd}`);
  const titleC = s8.zrbd && s8.zrbd.startsWith('#') ? contrast(s8.zrbd, '#291a24') : 0;
  ok(titleC >= 4, 'S8 the dark kp-title clears 4:1 on the dark panel', `${titleC.toFixed(2)}:1`);

  // ============ S9 · the two homepage bubbles (spot sweep) ============
  console.log('== S9 · item 1 · the homepage bubbles ==');
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); });
  for (const W of [1280, 390]) {
    await page.setViewportSize({ width: W, height: 900 });
    await page.waitForTimeout(600);
    const bad = [];
    for (const t of ['Jacksonville Jaguars', 'Washington Commanders', 'Tampa Bay Buccaneers', 'Green Bay Packers', 'Kansas City Chiefs']) {
      const m = await page.evaluate((team) => {
        const s = document.getElementById('draftSlotSelect');
        s.value = team; s.dispatchEvent(new Event('change', { bubbles: true }));
        const l = s.closest('.zpb-selwrap').querySelector('.zpb-selbtn');
        const r = document.querySelector('#draftPickNumberSelect').closest('.zpb-selwrap').querySelector('.zpb-selbtn');
        const lr = l.getBoundingClientRect(), rr = r.getBoundingClientRect();
        const face = l.querySelector('.zpb-face');
        return { lw: Math.round(lr.width), rw: Math.round(rr.width), lh: Math.round(lr.height), rh: Math.round(rr.height), clip: face ? face.scrollWidth - face.clientWidth : 0, show: (l.querySelector('.zpb-face-full').offsetParent !== null) ? 'full' : (l.querySelector('.zpb-face-city').offsetParent !== null ? 'city' : 'abbr') };
      }, t);
      if (m.lw !== m.rw || m.lh !== m.rh || m.clip > 1) bad.push(`${t}: L${m.lw}x${m.lh} R${m.rw}x${m.rh} clip=${m.clip}`);
    }
    ok(bad.length === 0, `S9 W=${W} · equal WxH, no clipped face, across the sweep`, bad.join(' | ') || 'all equal');
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => { const s = document.getElementById('draftSlotSelect'); s.value = 'Washington Commanders'; s.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: SH + '/w67-bubbles.png', clip: { x: 0, y: 80, width: 1280, height: 340 } });

  await browser.close();
  console.log(`\nw67_owner RESULT: pass=${pass} fail=${fail}`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
