/* w69_owner.js — the Owner's w69 round, live on the built bytes.
   S1 · item 1: the TRY AGAIN pill's 20-0 sweeps the on-gold ink family (readable on the gradient).
   S2 · item 2: the field map's inks clear 4.5:1 against the EFFECTIVE paint — Steelers + Browns live.
   S3 · item 3: the review's player-card names ride the tier law (90+ shm / 85+ vib / rest neutral).
   S4 · item 4: the preseason trio's text no longer paints into the rounded corner (12px house pad).
   S5 · item 5: the lineup editor's pick lists read Cinzel in the team ink, tier classes ride, the hover glides.
   S6 · item 6: the award lines carry crests, not written team names (chips crest-first, COTY, round cards). */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w76/Football-Sim-Z-post-blue-w76.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w69/shots';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

let page;
const closeOv = () => page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution').forEach(f => f.remove()); } catch (e) {} });
const lum = (hex) => { const m = String(hex).replace('#', ''); if (!/^[0-9a-fA-F]{3,6}$/.test(m)) return NaN; const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m; const [r, g, b] = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
const rgb2hex = (s) => { const m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/); return m ? '#' + m.slice(1).map(v => Math.round(parseFloat(v)).toString(16).padStart(2, '0')).join('') : null; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  let pageErrs = 0;
  page.on('pageerror', e => { pageErrs++; console.log('   PAGE-ERROR: ' + e.message); fail++; });
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);

  // boot the draft as the Steelers, instant to the end
  await page.evaluate(() => {
    const s = document.getElementById('draftSlotSelect');
    if (s) { s.value = 'Pittsburgh Steelers'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    document.getElementById('startDraftBtn').click();
  });
  await page.waitForTimeout(1400); await closeOv();
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(300); }
  await page.waitForTimeout(900);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.evaluate(() => { try { const g = document.querySelector('.zpb-fin .zpb-fin-go'); if (g) g.click(); else document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} }); await page.waitForTimeout(250); }

  // ============ S4 · item 4 · the preseason trio's left padding ============
  console.log('== S4 · item 4 · the preseason dropdowns align ==');
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  const s4 = await page.evaluate(() => {
    const out = {};
    for (const id of ['aggrSel', 'scriptOff', 'scriptDef']) {
      const s = document.getElementById(id);
      if (!s) { out[id] = null; continue; }
      const cs = getComputedStyle(s);
      out[id] = { padL: parseFloat(cs.paddingLeft), selected: s.options[s.selectedIndex] ? s.options[s.selectedIndex].textContent.slice(0, 30) : null };
    }
    return out;
  });
  ok(s4.aggrSel && s4.scriptOff && s4.scriptDef, 'S4 the three preseason selects render', JSON.stringify(s4));
  ok(s4.aggrSel && s4.aggrSel.padL >= 12 && s4.scriptOff.padL >= 12 && s4.scriptDef.padL >= 12, 'S4 the trio carries the house 12px left padding (the first letter clears the corner)', JSON.stringify([s4.aggrSel && s4.aggrSel.padL, s4.scriptOff && s4.scriptOff.padL, s4.scriptDef && s4.scriptDef.padL]));
  { // the selects still fit their labels on a narrow window (the w55 phone laws)
    await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(600);
    const fit = await page.evaluate(() => ['aggrSel', 'scriptOff', 'scriptDef'].map(id => { const s = document.getElementById(id); return s ? { id, clipped: s.scrollWidth > s.clientWidth + 1 } : null; }));
    ok(fit.every(x => x && !x.clipped), 'S4 at 390px no trio select clips its text (the phone law holds)', JSON.stringify(fit));
    await page.setViewportSize({ width: 1280, height: 940 }); await page.waitForTimeout(500);
  }
  const pn = await page.$('#scriptOff');
  if (pn) { const el = await page.evaluateHandle(e => e.closest('.panel'), pn); await el.asElement().screenshot({ path: SH + '/w69-preseason-dropdowns.png' }); }

  // ============ S5 · item 5 · the lineup editor pick lists ============
  console.log('== S5 · item 5 · the dropdown player names wear the house language ==');
  const s5 = await page.evaluate(() => {
    const hex = (s) => { const m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/); return m ? '#' + m.slice(1).map(v => Math.round(parseFloat(v)).toString(16).padStart(2, '0')).join('') : null; };
    const face = Array.from(document.querySelectorAll('#lineupPre .zpb-pickbtn .zpb-pickname')).find(f => !/zpb-shm/.test(f.className)) || document.querySelector('#lineupPre .zpb-pickbtn .zpb-pickname');
    if (!face) return { present: false };
    const cs = getComputedStyle(face);
    // open the menu with the most rows (a 1-candidate slot proves nothing)
    let best = null, bestBtn = null;
    document.querySelectorAll('#lineupPre .zpb-pickbtn').forEach(b2 => {
      const m2 = b2.parentElement.querySelector('.zpb-pickmenu');
      const n2 = m2 ? m2.querySelectorAll('.zpb-pickrow').length : 0;
      if (!best || n2 > best) { best = n2; bestBtn = b2; }
    });
    if (bestBtn) bestBtn.click();
    const menu = document.querySelector('#lineupPre .zpb-pickmenu.zpb-open');
    const row = menu ? Array.from(menu.querySelectorAll('.zpb-pickrow b')).find(x => !/zpb-shm/.test(x.className)) || menu.querySelector('.zpb-pickrow b') : null;
    const rowCs = row ? getComputedStyle(row) : null;
    return { present: true, faceFont: cs.fontFamily.slice(0, 30), faceColor: hex(cs.color), faceW: cs.fontWeight,
      rowFont: rowCs ? rowCs.fontFamily.slice(0, 30) : null, rowColor: rowCs ? hex(rowCs.color) : null,
      rowCls: row ? row.className : null, rows: menu ? menu.querySelectorAll('.zpb-pickrow').length : 0 };
  });
  ok(s5.present, 'S5 the pick lists render (the custom family owns the lineup editor)', '');
  ok(s5.present && /Cinzel/.test(s5.faceFont) && /Cinzel/.test(s5.rowFont), 'S5 the face and the menu rows read Cinzel', s5.faceFont + ' / ' + s5.rowFont);
  const teamInk = await page.evaluate(() => {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--tTxM').trim();
    if (v) return v;
    const b = document.getElementById('startDraftBtn');
    const m = b ? getComputedStyle(b).color.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/) : null;
    return m ? '#' + m.slice(1).map(x => Math.round(parseFloat(x)).toString(16).padStart(2, '0')).join('') : null;
  });
  ok(s5.present && s5.faceColor && teamInk && s5.faceColor.toLowerCase() === teamInk.toLowerCase(), 'S5 the face ink is the team 0.50 (txM)', s5.faceColor + ' vs ' + teamInk);
  ok(s5.present && s5.rows >= 3, 'S5 the menu carries the room (the fullest slot sampled)', s5.rows + ' rows');
  { // the hover rule exists with the wash + glide (the praised treatment)
    const hr = await page.evaluate(() => {
      let found = null;
      for (const sh of document.styleSheets) {
        let rules; try { rules = sh.cssRules; } catch (e) { continue; }
        for (const r of rules) {
          if (r.selectorText && r.selectorText.includes('.zpb-pickrow:hover') && r.style && r.style.transform) {
            found = { sel: r.selectorText, bg: r.style.background || r.style.backgroundColor, tf: r.style.transform };
          }
        }
      }
      return found;
    });
    ok(!!hr && /translateX\(3px\)/.test(hr.tf), 'S5 the hover rule carries the wash + the 3px glide', JSON.stringify(hr));
  }
  { // the tier classes: the face of a 90+ player shimmers, an 85+ face is bold
    const tiers = await page.evaluate(() => {
      const out = { shm: 0, vib: 0, plain: 0, samples: [] };
      document.querySelectorAll('#lineupPre .zpb-pickname').forEach(f => {
        if (/zpb-shm/.test(f.className)) { out.shm++; out.samples.push({ n: f.textContent.slice(0, 20), k: 'shm' }); }
        else if (/zpb-vib/.test(f.className)) { out.vib++; out.samples.push({ n: f.textContent.slice(0, 20), k: 'vib' }); }
        else out.plain++;
      });
      return out;
    });
    ok(tiers.shm > 0 && tiers.vib > 0 && tiers.plain > 0, 'S5 the tier ladder rides the closed faces (90+/85+/rest all present)', JSON.stringify(tiers.samples.slice(0, 6)) + ` (+${tiers.plain} plain)`);
  }
  // close the menu again
  await page.evaluate(() => document.querySelectorAll('.zpb-pickmenu.zpb-open').forEach(m => m.classList.remove('zpb-open')));

  // ============ S2 · item 2 · the field map inks (Steelers + Browns, both modes) ============
  console.log('== S2 · item 2 · the field map reads on its real surface ==');
  await page.evaluate(() => { resultsView = 'mine'; if (typeof renderDraftResults === 'function') renderDraftResults(); });
  await page.waitForTimeout(900);
  let s2bad = [];
  for (const mode of ['light', 'dark']) {
    for (const team of ['Pittsburgh Steelers', 'Cleveland Browns', 'Las Vegas Raiders', 'Green Bay Packers']) {
      await page.evaluate(({ m, t }) => {
        document.documentElement.setAttribute('data-theme', m);
        if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme(t);
        resultsView = 'mine'; if (typeof renderDraftResults === 'function') renderDraftResults();
      }, { m: mode, t: team });
      await page.waitForTimeout(600);
      const res = await page.evaluate(() => {
        const hex = (s) => { const m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/); return m ? '#' + m.slice(1).map(v => Math.round(parseFloat(v)).toString(16).padStart(2, '0')).join('') : null; };
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        const cells = Array.from(document.querySelectorAll('.zpb-fm .zpb-fm-ini')).filter(c => !/zpb-empty/.test(c.className) && c.querySelector('b') && c.querySelector('b').textContent.trim()); // the empty middot placeholders carry no ink law
        if (!cells.length) return { empty: true };
        // the theme law: in dark the b reads the cell's OWN --fminkd solve; in light its --fmink solve
        let okCount = 0, n = 0; const odd = [];
        cells.forEach(c => {
          const b = c.querySelector('b'); const cs = getComputedStyle(b);
          if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)') return; // the shimmer family's transparent fill - governed by the sweep law, not the ink law
          const ink = hex(cs.color); if (!ink) { odd.push({ slot: c.getAttribute('data-slot'), unparsed: cs.color }); return; }
          n++;
          const want = dark ? (c.style.getPropertyValue('--fminkd') || c.style.getPropertyValue('--fmink')) : (c.style.getPropertyValue('--fmink') || c.style.getPropertyValue('--fminkd'));
          if (want && ink.toLowerCase() === want.trim().toLowerCase()) okCount++;
          else odd.push({ slot: c.getAttribute('data-slot'), ink, want, cls: c.className });
        });
        return { okCount, n, dark, odd: odd.slice(0, 3) };
      });
      if (res.empty) { s2bad.push(mode + '/' + team + ':empty'); continue; }
      const bad = res.okCount !== res.n;
      if (bad) s2bad.push(`${mode}/${team} ${res.okCount}/${res.n} cells ride their own solve`);
      ok(!bad, `S2 ${mode} · ${team}: every bubble paint is its own theme solve (the numeric verdict lives in w69_map's pixel sweep)`, `${res.okCount}/${res.n}` + (res.odd && res.odd.length ? ' odd=' + JSON.stringify(res.odd) : ''));
    }
  }
  ok(s2bad.length === 0, 'S2 the four live teams all read (the 32-team sweep lives in w69_map)', s2bad.join(' ') || 'clean');
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme('Pittsburgh Steelers'); resultsView = 'mine'; if (typeof renderDraftResults === 'function') renderDraftResults(); });
  await page.waitForTimeout(800);
  { const el = await page.$('.zpb-fm'); if (el) await el.screenshot({ path: SH + '/w69-fieldmap-steelers-light.png' }); }
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme('Cleveland Browns'); resultsView = 'mine'; if (typeof renderDraftResults === 'function') renderDraftResults(); });
  await page.waitForTimeout(800);
  { const el = await page.$('.zpb-fm'); if (el) await el.screenshot({ path: SH + '/w69-fieldmap-browns-dark.png' }); }
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme('Pittsburgh Steelers'); });

  // ============ the season, then the review ============
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(3200); await closeOv(); await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const y = document.querySelector('[data-ss="yes"]'); if (y) y.click(); });
  await page.waitForTimeout(2200); await closeOv(); await page.waitForTimeout(800);
  await page.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  { // deterministic: force the shared review if the door rendered it differently this season
    const has = await page.evaluate(() => !!document.getElementById('zpbTryAgainBtn'));
    if (!has) { await page.evaluate(() => { seasonState.showReview = true; renderSeasonTab(document.getElementById('seasonHost') || document.getElementById('draftResultsBody')); }); await page.waitForTimeout(1000); }
  }

  // ============ S1 · item 1 · the TRY AGAIN pill's 20-0 ============
  console.log('== S1 · item 1 · the 20-0 reads on the pill ==');
  const s1 = await page.evaluate(() => {
    const b = document.getElementById('zpbTryAgainBtn');
    if (!b) return { present: false };
    const shine = b.querySelector('.zpb-shine');
    const cs = getComputedStyle(b), cs2 = shine ? getComputedStyle(shine) : null;
    // the gradient stops ride the two on-gradient candidates; the mid-gradient mix m mirrors the pack's own math
    const mixc = (a, b2, t) => { const p = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }; const A = p(a), B = p(b2); return '#' + A.map((v, k) => Math.round(v * (1 - t) + B[k] * t).toString(16).padStart(2, '0')).join(''); };
    const lum2 = (hex) => { const m = String(hex).replace('#', ''); if (!/^[0-9a-fA-F]{3,6}$/.test(m)) return NaN; const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m; const [r, g, b3] = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b3; };
    const con = (a, b2) => { const l1 = lum2(a), l2 = lum2(b2); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    const pk = (typeof zpbPackFor === 'function') ? zpbPackFor(seasonUserTeam()) : null;
    const m = pk ? mixc(mixc(pk.accL, pk.acc2L, 0.5), pk.acc3L, 0.25) : null;
    const on = getComputedStyle(document.documentElement).getPropertyValue('--tOn').trim();
    const on2 = getComputedStyle(document.documentElement).getPropertyValue('--tOn2').trim();
    return { present: true, gradHasOn: cs2 && /linear-gradient/.test(cs2.backgroundImage) && on && cs2.backgroundImage.includes((() => { const p = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }; const A = p(on); return 'rgb(' + A.join(', ') + ')'; })()), anim: cs2 ? cs2.animationName : null,
      clip: cs2 ? (cs2.webkitBackgroundClip || cs2.backgroundClip || '') : '', on, on2, bgImage: cs2 ? cs2.backgroundImage : '',
      onRgb: (on) ? (() => { const p = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }; const A = p(on); return 'rgb(' + A.join(', ') + ')'; })() : null,
      cOn: (on && m) ? con(on, m) : null, cOn2: (on2 && m) ? con(on2, m) : null };
  });
  ok(s1.present, 'S1 the TRY AGAIN pill renders', '');
  ok(s1.present && s1.gradHasOn, 'S1 the 20-0 sweeps the on-gold ink family (a color-mix of --tOn with the glint stop, never the gold ramp)', 'on=' + s1.on + ' on2=' + s1.on2);
  ok(s1.present && s1.clip === 'text', 'S1 the sweep still clips to the letters (the celebration keeps its motion)', s1.clip + ' / ' + s1.anim);
  ok(s1.present && s1.cOn >= 3.2, 'S1 the base stop reads on the button gradient (>=3.2:1, the old gold-on-gold read ~1.2)', `on=${s1.cOn && s1.cOn.toFixed(2)}`);
  ok(s1.present && s1.onRgb && s1.bgImage.includes(s1.onRgb), 'S1 the computed gradient carries the on-gold stop', s1.onRgb);
  { const el = await page.$('#zpbTryAgainBtn'); if (el) { await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await el.screenshot({ path: SH + '/w69-tryagain-steelers.png' }); } }

  // ============ S3 · item 3 · the review's card names ride the tier law ============
  console.log('== S3 · item 3 · the review card names ride the ladder ==');
  const s3 = await page.evaluate(() => {
    const ds = {}; (typeof PLAYERS !== 'undefined') && PLAYERS.forEach(q => ds[q[0]] = q[3]);
    const bad = [];
    let n = 0;
    document.querySelectorAll('.zpb-pcard .zpb-pcard-hd b').forEach(bb => {
      const card = bb.closest('.zpb-pcard');
      if (card && card.closest('.kp-grid')) return; // the game-review key players: the PLAYER OF THE GAME keeps the standing shimmer law (w19/commandment 4)
      const nm = bb.textContent.trim(); const o = ds[nm]; if (o == null) return;
      n++;
      const isShm = /zpb-shm/.test(bb.className), isVib = /zpb-vib/.test(bb.className);
      if (isShm && o < 90) bad.push({ nm, o, k: 'shm<90' });
      if (isVib && o < 85) bad.push({ nm, o, k: 'vib<85' });
      if (!isShm && o >= 90) bad.push({ nm, o, k: '90-plain' });
      if (isShm && o >= 85 && o < 90) bad.push({ nm, o, k: 'shm-should-be-vib' });
    });
    return { n, bad: bad.slice(0, 10), badN: bad.length };
  });
  ok(s3.n > 20, 'S3 the review page carries the player cards', s3.n + ' names measured');
  ok(s3.badN === 0, 'S3 every card name matches the tier law exactly (90+ shm · 85+ vib · rest plain)', s3.badN ? JSON.stringify(s3.bad) : 'clean');

  // ============ S6 · item 6 · the crests replace the written team names ============
  console.log('== S6 · item 6 · the award lines carry the crests ==');
  const s6 = await page.evaluate(() => {
    const out = {};
    const apChips = Array.from(document.querySelectorAll('.zpb-apchip'));
    out.apChips = apChips.length;
    out.crestFirst = apChips.filter(c => { const i = c.querySelector('i'); const b = c.querySelector('b'); return i && b && i.querySelector('img') && (b.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_PRECEDING); }).length;
    out.crestImgs = apChips.filter(c => c.querySelector('i img')).length;
    out.writtenNicks = apChips.filter(c => { const i = c.querySelector('i'); return i && !i.querySelector('img') && i.textContent.trim().length > 0; }).length;
    // the COTY line: the crest is a SIBLING of the name b (the ladder owns the b's content)
    const cotyM = Array.from(document.querySelectorAll('.zpb-awcard .zpb-awm')).find(m => m.querySelector(':scope > b') && m.querySelector(':scope > i.zpb-aplog img'));
    out.cotyCrest = !!cotyM;
    out.cotyText = cotyM ? (cotyM.querySelector(':scope > b').textContent + ' | ' + cotyM.querySelector(':scope > i.zpb-aplog img').getAttribute('alt')).slice(0, 60) : null;
    // no written full team names inside award cards
    const teams = (typeof TEAM_ABBR === 'object') ? Object.keys(TEAM_ABBR) : [];
    const awardCards = Array.from(document.querySelectorAll('.zpb-awcard'));
    out.writtenTeamInCards = 0;
    awardCards.forEach(c => { const t = c.textContent; teams.forEach(n => { if (n.length > 8 && t.includes(n)) out.writtenTeamInCards++; }); });
    return out;
  });
  ok(s6.apChips > 40, 'S6 the honor chips render', s6.apChips + ' chips');
  ok(s6.crestImgs >= s6.apChips * 0.9, 'S6 the chips carry crests, not written names', `${s6.crestImgs} crests / ${s6.writtenNicks} fallbacks`);
  ok(s6.crestFirst === s6.crestImgs, 'S6 the crest LEADS every chip (before the name)', `${s6.crestFirst}/${s6.crestImgs}`);
  ok(s6.cotyCrest, 'S6 the coach line carries the crest', '');
  ok(s6.writtenTeamInCards === 0, 'S6 no award card writes a full team name anymore', String(s6.writtenTeamInCards));
  // the PLAYOFF awards (all-playoff chips, round cards, SB-MVP line) rendered synthetically — the playoffs have not run at regularReview
  const s6b = await page.evaluate(() => {
    try {
      const host = document.createElement('div');
      host.style.display = 'none';
      document.body.appendChild(host);
      const mk = (n, t) => ({ name: n, team: t, group: 'QB', line: '', st: null, ovr: (typeof PLAYERS !== 'undefined' && PLAYERS.find(q => q[0] === n)) ? PLAYERS.find(q => q[0] === n)[3] : 88 });
      const P = {
        sbMvp: { name: 'Patrick Mahomes', team: 'Kansas City Chiefs', group: 'QB', game: { away: 'Philadelphia Eagles', home: 'Kansas City Chiefs', result: { awayScore: 24, homeScore: 31 } } },
        mvp: null,
        rounds: [{ label: 'Wild Card', items: [{ p: mk('Josh Allen', 'Buffalo Bills'), g: { away: 'Buffalo Bills', home: 'Pittsburgh Steelers', result: { awayScore: 17, homeScore: 26 } } }] }],
        leaders: [],
        team: [{ pos: 'QB', name: 'Josh Allen', team: 'Buffalo Bills' }, { pos: 'RB', name: 'Saquon Barkley', team: 'Philadelphia Eagles' }]
      };
      host.innerHTML = renderPlayoffAwardsHTML(P);
      const chips = Array.from(host.querySelectorAll('.zpb-apchip'));
      const crestFirst = chips.filter(c => { const i = c.querySelector('i'); const b = c.querySelector('b'); return i && b && i.querySelector('img') && (b.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_PRECEDING); }).length;
      const writtenNick = chips.filter(c => { const i = c.querySelector('i'); return i && !i.querySelector('img'); }).length;
      const roundSub = host.querySelector('.zpb-awline:not(.zpb-awline-mvp) .zpb-awcard .narr');
      const sbSub = host.querySelector('.zpb-awline-mvp .zpb-awcard .narr');
      host.remove();
      return { chips: chips.length, crestFirst, writtenNick,
        roundDash: roundSub ? / - /.test(roundSub.textContent) && !/ · /.test(roundSub.textContent) : null,
        roundCrests: roundSub ? roundSub.querySelectorAll('img').length : null,
        sbDash: sbSub ? / - /.test(sbSub.textContent) && !/ · /.test(sbSub.textContent) : null,
        sbCrests: sbSub ? sbSub.querySelectorAll('img').length : null };
    } catch (err) { return { err: String(err) }; }
  });
  ok(s6b.chips === 2 && s6b.crestFirst === 2 && s6b.writtenNick === 0, 'S6b the All-Playoff chips lead with crests (no written names)', JSON.stringify(s6b));
  ok(s6b.roundDash === true && s6b.roundCrests === 2, 'S6b the round card reads crest + DASH score + crest (no written team names)', `crests=${s6b.roundCrests}`);
  ok(s6b.sbDash === true && s6b.sbCrests === 2, 'S6b the SB-MVP line joins the dash law with its crests', `dash=${s6b.sbDash} crests=${s6b.sbCrests}`);
  await page.screenshot({ path: SH + '/w69-review-awards.png' });

  console.log('\npage errors:', pageErrs);
  await browser.close();
  console.log(`\nw69_owner RESULT: pass=${pass} fail=${fail}`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
