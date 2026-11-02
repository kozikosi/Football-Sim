/* w56_sweep.js — the extra mobile pass: walk every tab/page at 390px and 320px and hunt
 * remaining horizontal pan + wide children. Zero-error gate. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w56/builds/Football-Sim-Z-post-blue-w56.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let pass = 0, fail = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? pass++ : fail++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];

  const sweep = async (width, tag) => {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    page.on('pageerror', e => errors.push(tag + ': ' + String(e).slice(0, 120)));
    await page.goto(FILE); await page.waitForTimeout(800);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(800);

    // finish a draft so every season surface exists
    await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
    await page.waitForTimeout(1000);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
    for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
    await page.waitForTimeout(1000);
    for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
    await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} try { simulateCurrentWeek(); } catch (e) {} });
    await page.evaluate(() => { try { simRestOfSeason(); } catch (e) {} });
    await page.waitForTimeout(1500);
    await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} });
    await page.evaluate(() => {
      try {
        window.__zpbQuietSim = true;
        startPlayoffs();
        for (let i = 0; i < 4; i++) { const rk = seasonState.currentPlayoffRound; if (!seasonState.playoffRoundSimulated) simulatePlayoffRound(); if (rk !== 'superbowl') advancePlayoffRound(); else break; }
      } catch (e) {}
    });
    await page.waitForTimeout(1200);
    await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; } catch (e) {} });

    const check = async (label, fn) => {
      const r = await page.evaluate(fn);
      const over = r.over != null ? r.over : (document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const wide = (r.wide || []).slice(0, 3);
      ok(over <= 0 && wide.length === 0, `${tag} · ${label}`, `over=${over}${wide.length ? ' wide=' + JSON.stringify(wide) : ''}`);
    };
    const probe = () => {
      const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const wide = [];
      if (over > 0) {
        document.querySelectorAll('.wrap *, .panel, .view').forEach(el => {
          const b = el.getBoundingClientRect();
          if (b.width > document.documentElement.clientWidth + 1 && wide.length < 4) wide.push((el.className || el.tagName).toString().slice(0, 40));
        });
      }
      return { over, wide };
    };

    // every support tab
    const tabs = [['tabHomeBtn', 'HOME'], ['tabRankingsBtn', 'RANKINGS'], ['tabCompareBtn', 'COMPARE'], ['tabGuideBtn', 'GUIDE'], ['tabDraftBtn', 'DRAFT']];
    for (const [btn, label] of tabs) {
      await page.evaluate(b => { const el = document.getElementById(b); if (el) el.click(); }, btn);
      await page.waitForTimeout(700);
      await check(label + ' page', probe);
    }
    // season surfaces
    await page.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
    await page.waitForTimeout(900);
    await check('REVIEW (season complete)', probe);
    await page.evaluate(() => { try { if (seasonState.showReview !== undefined) { seasonState.showReview = false; renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } } catch (e) {} });
    await page.waitForTimeout(900);
    await check('SUPER BOWL page', probe);
    await page.close();
  };

  await sweep(390, 'S390');
  await sweep(320, 'S320');

  ok(errors.length === 0, 'SWEEP · zero page errors', errors.slice(0, 3).join(' | '));
  console.log(`\nw56_sweep: ${pass} pass · ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
