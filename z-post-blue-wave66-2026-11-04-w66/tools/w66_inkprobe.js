/* w66_inkprobe.js — measure chip ink recipes for the worst teams, light + dark. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(FILE); await page.waitForTimeout(600);
  const res = await page.evaluate(() => {
    const TEAMS = ['Dallas Cowboys','Detroit Lions','Jacksonville Jaguars','Kansas City Chiefs','Los Angeles Chargers','Miami Dolphins','New Orleans Saints','Las Vegas Raiders','Pittsburgh Steelers','Green Bay Packers','NY Jets','Washington Commanders','Tampa Bay Buccaneers','Tennessee Titans','New England Patriots','Los Angeles Rams','Cleveland Browns','Buffalo Bills','Seattle Seahawks','Denver Broncos'];
    const lum = (r, g, b) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const parse = s => {
      s = (s || '').trim(); let m = s.match(/rgba?\(([^)]+)\)/);
      if (m) { const p = m[1].split('/'); const v = p[0].trim().split(/[\s,]+/).map(Number); const a = p[1] !== undefined ? parseFloat(p[1]) : 1; return { r: v[0], g: v[1], b: v[2], a }; }
      m = s.match(/color\(([^)]+)\)/);
      if (m) { const p = m[1].split('/'); const v = p[0].trim().replace(/^[a-z-]+\s*/, '').trim().split(/[\s,]+/).map(Number); const a = p[1] !== undefined ? parseFloat(p[1]) : 1; const c = x => x <= 1 ? Math.round(x * 255) : Math.round(x); return { r: c(v[0]), g: c(v[1]), b: c(v[2]), a }; }
      if (s.startsWith('#')) { const h = s.slice(1); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }; }
      return null;
    };
    const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
    const ratio = (f, b) => { const L1 = lum(f.r, f.g, f.b), L2 = lum(b.r, b.g, b.b); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
    const host = document.createElement('div');
    host.innerHTML = '<div class="zpb-fm"><div class="zpb-fm-side zpb-fm-off"><div class="zpb-fm-row"><i>QB</i></div></div><div class="zpb-fm-side zpb-fm-def"><div class="zpb-fm-row"><i>DE</i></div></div></div>';
    document.body.appendChild(host);
    const chip = host.querySelector('.zpb-fm-off i');
    const out = [];
    for (const mode of ['light', 'dark']) {
      document.documentElement.setAttribute('data-theme', mode);
      for (const t of TEAMS) {
        zpbApplyTeamTheme(t);
        const panelBg = parse(getComputedStyle(document.querySelector('.panel') || document.body).backgroundColor) || { r: 250, g: 245, b: 240, a: 1 };
        const bgc = parse(getComputedStyle(chip).backgroundColor);
        const eff = over(bgc, panelBg);
        const cs = getComputedStyle(chip);
        const tA2 = cs.getPropertyValue('--tA2').trim() || null;
        const tAd = cs.getPropertyValue('--tAd').trim() || null;
        const text = parse(getComputedStyle(document.body).color);
        // recipes
        const rText = ratio(text, eff);
        // anchored halfway: mix tA2 50% + tAd 50% (computed in RGB)
        let rAnchor = null, rA2 = null;
        const a2 = parse(tA2), ad = parse(tAd);
        if (a2 && ad) { const mix = { r: a2.r * 0.5 + ad.r * 0.5, g: a2.g * 0.5 + ad.g * 0.5, b: a2.b * 0.5 + ad.b * 0.5, a: 1 }; rAnchor = ratio(mix, eff); rA2 = ratio(a2, eff); }
        out.push({ t, mode, rText: Math.round(rText * 100) / 100, rAnchor: rAnchor && Math.round(rAnchor * 100) / 100, rA2: rA2 && Math.round(rA2 * 100) / 100 });
      }
    }
    return out;
  });
  for (const mode of ['light', 'dark']) {
    const rows = res.filter(r => r.mode === mode);
    const minT = Math.min(...rows.map(r => r.rText)), minA = Math.min(...rows.map(r => r.rAnchor || 99)), min2 = Math.min(...rows.map(r => r.rA2 || 99));
    console.log(`${mode}: min --text=${minT}  min anchored50=${minA}  min tA2=${min2}`);
    rows.filter(r => (mode === 'dark' ? r.rText : r.rAnchor) < 4.5).forEach(r => console.log('  under:', JSON.stringify(r)));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
