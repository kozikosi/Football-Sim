/* measure-residual-inks.js — the residual-ink measurement, IN THE PACKAGE (P-307 fix 1).
 * Run: node measure-residual-inks.js --file <path-to-w86-html> --out results/residual-inks.json
 *
 * WHY: the w86 README quoted residual numbers (49ers dark footer pill 4.43:1; the three view-toggle
 * golds ~3.9:1) that appeared in no evidence file, and the shipped residual-inks.json carried a
 * uniform 1.35 segDark (a constant, not a measurement). The muse P-307 review (the most significant
 * finding) asked for numbers traceable to a measurement IN the package. This script IS that
 * measurement: every number in results/residual-inks.json is produced by this file, per team,
 * live in the page, with the method recorded in the JSON itself.
 *
 * METHOD (per team, per theme — 32 teams x {light, dark}):
 *   1. Fresh boot: localStorage cleared, page reloaded (the same drive pattern as w86_battery.js).
 *   2. Theme = <html data-theme>; team takeover = window.zpbApplyTeamTheme(team).
 *   3. Quantities (contrast = (Lmax+0.05)/(Lmin+0.05), WCAG relative luminance, sRGB):
 *      - footerActive  : the ACTIVE footer navigation pill (.zpb-footnav .footlink.active — the
 *                        current-tab pill). Its ink is computed color; its fill is the computed
 *                        background (a gradient): every gradient stop AND the stops' average color
 *                        are measured, and the reported number is the WORST (minimum) contrast the
 *                        pill's fill can present against its ink.
 *      - segOn         : the draft view-toggle's active segment (#draftViewSeg button.zpb-seg-on)
 *                        — ink vs its computed background wash.
 *      The old file's three keys are kept: footerDarkActive = footerActive in the DARK theme;
 *      segLight / segDark = segOn in the light / dark theme. footerLightActive is added so the
 *      light footer is on the record too.
 *   4. Zero page errors across the whole sweep is itself checked; the script exits 1 otherwise.
 */
const fs = require('fs');
const path = require('path');
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const FILE = /^https?:\/\//.test(arg('--file', '')) ? arg('--file', '') : 'file://' + path.resolve(arg('--file', ''));
const OUT = arg('--out', 'results/residual-inks.json');
const pw = require('playwright');

const TEAMS = ['Arizona Cardinals','Atlanta Falcons','Baltimore Ravens','Buffalo Bills','Carolina Panthers','Chicago Bears','Cincinnati Bengals','Cleveland Browns','Dallas Cowboys','Denver Broncos','Detroit Lions','Green Bay Packers','Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Kansas City Chiefs','Las Vegas Raiders','Los Angeles Chargers','Los Angeles Rams','Miami Dolphins','Minnesota Vikings','New England Patriots','New Orleans Saints','NY Giants','NY Jets','Philadelphia Eagles','Pittsburgh Steelers','San Francisco 49ers','Seattle Seahawks','Tampa Bay Buccaneers','Tennessee Titans','Washington Commanders'];

const LUM_FN = `
function __zpbLum(c){
  c = String(c);
  if(c.charAt(0) === '#'){ let h = c.slice(1); if(h.length === 3) h = h.split('').map(x => x + x).join(''); const n = parseInt(h, 16); const f2 = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }; return 0.2126*f2((n>>16)&255)+0.7152*f2((n>>8)&255)+0.0722*f2(n&255); }
  const m = c.match(/rgba?\\(([^)]+)\\)/); if(!m) return null;
  const [r,g,b,a] = m[1].split(',').map(parseFloat);
  if(a != null && a < 0.06) return null;
  const f = v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
}
function __zpbInkContrast(el){
  // the worst contrast the element's own background presentation gives its ink:
  // every gradient stop + the stops' average color (what the sweeping eye averages) + the flat bg
  const cs = getComputedStyle(el);
  const ink = __zpbLum(cs.color);
  if(ink == null) return null;
  const stops = (cs.backgroundImage || '').match(/rgba?\\([^)]*\\)|#[0-9a-f]{3,8}/gi) || [];
  const cols = [];
  for(const s of stops){ const l = __zpbLum(s); if(l != null) cols.push(l); }
  const rgbs = stops.map(s => { const m = String(s).match(/rgba?\\(([^)]+)\\)/); return m ? m[1].split(',').slice(0,3).map(parseFloat) : null; }).filter(Boolean);
  if(rgbs.length >= 2){
    const avg = [0,1,2].map(k => rgbs.reduce((a,r) => a + r[k], 0) / rgbs.length);
    cols.push(__zpbLum('#' + avg.map(v => Math.round(v).toString(16).padStart(2,'0')).join('')));
  }
  const flat = __zpbLum(cs.backgroundColor);
  if(flat != null) cols.push(flat);
  if(!cols.length) cols.push(1); // on the page background
  return (Math.max(ink, ...cols) + 0.05) / (Math.min(ink, ...cols) + 0.05);
}`;

(async () => {
  const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(600);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
  const sweep = await page.evaluate(({ TEAMS, LUM_FN }) => {
    (0, eval)(LUM_FN);
    const root = document.documentElement;
    const out = { footerLightActive: {}, footerDarkActive: {}, segLight: {}, segDark: {} };
    for (const theme of ['light', 'dark']) {
      root.setAttribute('data-theme', theme);
      for (const t of TEAMS) {
        if (typeof zpbApplyTeamTheme === 'function') zpbApplyTeamTheme(t);
        const fl = document.querySelector('.zpb-footnav .footlink.active');
        const sg = document.querySelector('#draftViewSeg button.zpb-seg-on');
        out['footer' + (theme === 'light' ? 'Light' : 'Dark') + 'Active'][t] =
          fl ? __zpbInkContrast(fl) : null;
        out['seg' + (theme === 'light' ? 'Light' : 'Dark')][t] =
          sg ? __zpbInkContrast(sg) : null;
      }
    }
    if (typeof zpbClearTeamTheme === 'function') zpbClearTeamTheme();
    root.removeAttribute('data-theme');
    return out;
  }, { TEAMS, LUM_FN });
  const bad = Object.entries(sweep).flatMap(([k, m]) => Object.entries(m)).filter(([, v]) => v == null || !isFinite(v));
  const okRun = errs.length === 0 && bad.length === 0;
  const worst = m => Object.entries(m).sort((a, b) => a[1] - b[1]).slice(0, 3).map(([t, v]) => `${t} ${v.toFixed(2)}`).join(' · ');
  const result = {
    generated: new Date().toISOString(),
    product: 'Football-Sim-Z-post-blue-w86.html (w86.1, generator zpb_w86.py REV 2)',
    measuredBy: 'measure-residual-inks.js (this package) — Node + Playwright/Chromium, file:// load, localStorage cleared',
    method: {
      contrast: '(Lmax+0.05)/(Lmin+0.05), WCAG relative luminance, sRGB',
      teamTakeover: 'window.zpbApplyTeamTheme(team), all 32 teams, both themes',
      footerActive: '.zpb-footnav .footlink.active — the active footer nav pill; ink vs every gradient stop + the stops average + the flat fill; the reported number is the WORST',
      segOn: '#draftViewSeg button.zpb-seg-on — the draft Table/Cards view toggle; ink vs its computed wash',
      keys: 'footerDarkActive/segLight/segDark keep the names the w86 README already referenced; footerLightActive added for completeness'
    },
    results: sweep,
    worst: {
      footerDarkActive: worst(sweep.footerDarkActive),
      footerLightActive: worst(sweep.footerLightActive),
      segLight: worst(sweep.segLight),
      segDark: worst(sweep.segDark)
    },
    pageErrors: errs,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(result, null, 1));
  console.log('WORST — dark footer pill :', result.worst.footerDarkActive);
  console.log('WORST — light footer pill:', result.worst.footerLightActive);
  console.log('WORST — light view toggle:', result.worst.segLight);
  console.log('WORST — dark view toggle :', result.worst.segDark);
  console.log(okRun ? 'SWEEP CLEAN — 32 teams x both themes, zero page errors' : 'SWEEP INCOMPLETE: ' + JSON.stringify(bad.slice(0, 4)) + ' errs=' + errs.length);
  await browser.close();
  process.exit(okRun ? 0 : 1);
})().catch(e => { console.error('MEASURE CRASH', e); process.exit(2); });
