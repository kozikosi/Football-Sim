/* w67_teams.js — the Owner's "test every team" law: 32 teams × light/dark on the four ink
   surfaces this wave touched — the fills dropdown, the pregame star cards' meta ink, the
   Key Players title, and the matchup-math bar fill. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w67/Football-Sim-Z-post-blue-w67.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };
const lum = (hex) => {
  const m = String(hex).replace('#', '');
  if (!/^[0-9a-fA-F]{3,6}$/.test(m)) return NaN;
  const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
  const [r, g, b] = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(FILE); await page.waitForTimeout(400);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);
  const teams = await page.evaluate(() => Object.keys(TEAM_DATA));
  ok(teams.length === 32, 'the full 32-team league', `${teams.length} teams`);

  const sweep = await page.evaluate((teams) => {
    const lum = (hex) => {
      const m = String(hex).replace('#', '');
      if (!/^[0-9a-fA-F]{3,6}$/.test(m)) return NaN;
      const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
      const [r, g, b] = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    const css = getComputedStyle(document.documentElement);
    const mixHex = (a, b, af) => {
      const p = h => { h = String(h).replace('#', '').trim(); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
      const A = p(a), B = p(b);
      return '#' + A.map((v, k) => Math.round(v * af + B[k] * (1 - af)).toString(16).padStart(2, '0')).join('');
    };
    const out = {};
    for (const mode of ['light', 'dark']) {
      document.documentElement.setAttribute('data-theme', mode);
      const panel = css.getPropertyValue('--panel').trim();
      const text = css.getPropertyValue('--text').trim();
      const panel2 = css.getPropertyValue('--panel2').trim();
      const track = mixHex(text, panel2, 0.13);
      out[mode] = {};
      for (const t of teams) {
        if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme(t);
        const rowV = (typeof zpbRowVars === 'function') ? zpbRowVars(t) : '';
        const neuV = (typeof zpbNeutralRowVars === 'function') ? zpbNeutralRowVars(t) : '';
        const pick = (v, k) => { const m = String(v).match(new RegExp(k + ':([^;]+)')); return m ? m[1].trim() : ''; };
        const d = document.createElement('div');
        // the fills dropdown rides the takeover tokens (the board is always themed)
        d.innerHTML = '<button class="zpb-slotdd">FS (-10 FLEX)</button>';
        const dd = d.firstElementChild;
        document.body.appendChild(dd);
        const ddCol = getComputedStyle(dd).color;
        dd.remove();
        const rgb2hex = (s) => {
          const m = s.match(/rgba?\(([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
          return m ? '#' + m.slice(1).map(v => Math.round(parseFloat(v)).toString(16).padStart(2, '0')).join('') : null;
        };
        const ddHex = rgb2hex(ddCol);
        // the star card's meta ink (the row vars' --tnd) on the always-dark stage
        const tnd = pick(rowV, '--tnd') || '#f2e4c8';
        const zrb = pick(rowV, '--zrb');
        const zrbd = pick(rowV, '--zrbd');
        // the matchup bar (the neutral rows' inks)
        const nzrb = pick(neuV, '--zrb');
        const nzrbd = pick(neuV, '--zrbd');
        out[mode][t] = {
          dd: ddHex, ddC: ddHex ? contrast(ddHex, panel) : 0,
          tndC: contrast(tnd, '#141016'),
          kpTitle: mode === 'dark' ? (zrbd || null) : (zrb || null),
          kpC: mode === 'dark' ? (zrbd ? contrast(zrbd, panel) : 0) : (zrb ? contrast(zrb, panel) : 0),
          barDark: nzrbd || null, barLight: nzrb || null,
          barC: mode === 'dark' ? (nzrbd ? contrast(nzrbd, track) : 0) : (nzrb ? contrast(nzrb, track) : 0)
        };
      }
      if (typeof zpbClearTeamTheme === 'function') zpbClearTeamTheme();
    }
    document.documentElement.setAttribute('data-theme', 'light');
    return out;
  }, teams);

  // ---- the verdicts ----
  console.log('== T · the fills dropdown ink (the Panthers law, every team) ==');
  const badDD = Object.entries(sweep.dark).filter(([t, v]) => !v.dd || v.ddC < 4.5);
  ok(badDD.length === 0, 'DARK · every team\u2019s fills-dd ink clears 4.5:1 on the dark panel', badDD.map(([t, v]) => `${t}:${v.dd}=${v.ddC.toFixed(2)}`).join(' ') || '32/32');
  const badDDL = Object.entries(sweep.light).filter(([t, v]) => !v.dd || v.ddC < 4.0);
  ok(badDDL.length === 0, 'LIGHT · every team\u2019s fills-dd ink clears 4.0:1', badDDL.map(([t, v]) => `${t}:${v.dd}=${v.ddC.toFixed(2)}`).join(' ') || '32/32');
  console.log(`   (Panthers dark: ${sweep.dark['Carolina Panthers'].dd} @ ${sweep.dark['Carolina Panthers'].ddC.toFixed(2)}:1 · light: ${sweep.light['Carolina Panthers'].dd} @ ${sweep.light['Carolina Panthers'].ddC.toFixed(2)}:1)`);

  console.log('== U · the star cards\u2019 meta ink on the always-dark stage ==');
  const badStar = [...Object.entries(sweep.dark), ...Object.entries(sweep.light)].filter(([t, v]) => v.tndC < 4.5);
  ok(badStar.length === 0, 'BOTH MODES · every team\u2019s --tnd meta ink clears 4.5:1 on the dark stage', badStar.map(([t, v]) => `${t}:${v.tndC.toFixed(2)}`).join(' ') || '64/64');

  console.log('== V · the Key Players title ==');
  const badKP = Object.entries(sweep.dark).filter(([t, v]) => !v.kpTitle || v.kpC < 4);
  ok(badKP.length === 0, 'DARK · every kp-title (--zrbd) clears 4:1 on the dark panel', badKP.map(([t, v]) => `${t}:${v.kpC.toFixed(2)}`).join(' ') || '32/32');
  const badKPL = Object.entries(sweep.light).filter(([t, v]) => !v.kpTitle || v.kpC < 4);
  ok(badKPL.length === 0, 'LIGHT · every kp-title (--zrb) clears 4:1', badKPL.map(([t, v]) => `${t}:${v.kpC.toFixed(2)}`).join(' ') || '32/32');

  console.log('== W · the matchup-math bars ==');
  const badBar = Object.entries(sweep.dark).filter(([t, v]) => !v.barDark || v.barC < 1.8);
  ok(badBar.length === 0, 'DARK · every neutral-bar fill (--zrbd) reads against its track ≥1.8:1', badBar.map(([t, v]) => `${t}:${v.barC.toFixed(2)}`).join(' ') || '32/32');
  const badBarL = Object.entries(sweep.light).filter(([t, v]) => !v.barLight || v.barC < 1.0);
  ok(badBarL.length === 0, 'LIGHT · every neutral-bar fill (--zrb) is present against its track (≥1.0:1 sanity — the w19/w52 light law is untouched this wave)', badBarL.map(([t, v]) => `${t}:${v.barC.toFixed(2)}`).join(' ') || '32/32');
  const jag = sweep.dark['Jacksonville Jaguars'];
  console.log(`   (Jaguars dark bar: ${jag.barDark} @ ${jag.barC.toFixed(2)}:1 against the track — the light ink ${jag.barLight} retired from dark)`);

  await browser.close();
  console.log(`\nw67_teams RESULT: pass=${pass} fail=${fail}`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
