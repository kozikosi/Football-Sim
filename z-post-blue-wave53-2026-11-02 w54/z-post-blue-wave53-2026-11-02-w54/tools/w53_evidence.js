/* w52_evidence.js — M7 across EVERY team in BOTH themes (the Owner: "check every team") + shots */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w53/Football-Sim-Z-post-blue-w53.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e).slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(700);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(700);

  // instant draft (no takeover needed for the sweep — we apply each team's theme directly)
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); startSeason(); seasonState.preseason = false; renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1200);

  const teams = await page.evaluate(() => Object.keys(TEAM_DATA).sort());
  const lum = col => { const m = (col.match(/\d+(\.\d+)?/g) || []).map(Number); if (m.length < 3) return null; return 0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]; };
  let badPairs = [];
  for (const theme of ['light', 'dark']) {
    await page.evaluate(t => { document.documentElement.setAttribute('data-theme', t); }, theme);
    await page.waitForTimeout(220);
    for (const tm of teams) {
      const r = await page.evaluate(team => {
        try { zpbApplyTeamTheme(team); } catch (e) { return { err: String(e) }; }
        const panel = [...document.querySelectorAll('.panel')].find(p => p.querySelector('.zpb-mbar'));
        if (!panel) return { miss: true };
        const bar = panel.querySelector('.zpb-mbar'), fill = bar.querySelector('i');
        const tc = getComputedStyle(bar).backgroundColor, fc = getComputedStyle(fill).backgroundColor;
        const hair = getComputedStyle(panel).borderTopColor;
        return { tc, fc, hair, same: tc === fc || tc === hair };
      }, tm);
      if (r.miss || r.err || r.same) badPairs.push({ theme, tm, r });
      // visual evidence for the red teams the Owner called out
      if (['San Francisco 49ers', 'Kansas City Chiefs', 'Tampa Bay Buccaneers'].includes(tm) && theme === 'light') {
        await page.screenshot({ path: `shots/w52-m7-${tm.split(' ')[0].toLowerCase()}-${theme}.png`, clip: (await page.evaluate(() => { const p = [...document.querySelectorAll('.panel')].find(p => p.querySelector('.zpb-mbar')); const b = p.getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: Math.min(b.height, 560) }; })) });
      }
    }
  }
  console.log('M7 sweep · 32 teams × 2 themes = 64 pairs · failures:', badPairs.length);
  if (badPairs.length) console.log(JSON.stringify(badPairs.slice(0, 6), null, 1));
  // restore the 49ers takeover for the record shot
  await page.evaluate(() => { try { zpbApplyTeamTheme('San Francisco 49ers'); document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {} });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'shots/w52-m7-49ers-light-full.png' });
  console.log('pageerrors:', errors.length ? errors : 'none');
  await browser.close();
  process.exit(badPairs.length || errors.length ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL', e); process.exit(1); });
