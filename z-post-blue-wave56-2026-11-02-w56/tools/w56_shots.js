/* w56_shots.js — the wave's evidence stills. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w56/builds/Football-Sim-Z-post-blue-w56.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/w56/shots';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

  // ---- phone stills ----
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(FILE); await m.waitForTimeout(800);
  await m.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await m.reload(); await m.waitForTimeout(800);

  // draft card close-up
  await m.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await m.waitForTimeout(400);
  await m.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await m.waitForTimeout(1400);
  await m.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await m.waitForTimeout(1800);
  await m.evaluate(() => { const el = document.getElementById('draftTable2'); if (el) el.scrollIntoView(); });
  await m.waitForTimeout(400);
  await m.screenshot({ path: SHOTS + '/evidence-draft-card-390.png' });

  // dime row clean (draft page roster sidebar)
  await m.evaluate(() => { const el = document.getElementById('draftRosterList'); if (el) el.scrollIntoView({ block: 'center' }); });
  await m.waitForTimeout(400);
  await m.screenshot({ path: SHOTS + '/evidence-dime-clean-390.png' });

  // finish draft → review stage
  await m.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await m.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await m.waitForTimeout(400); }
  await m.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await m.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await m.waitForTimeout(400); }
  await m.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await m.waitForTimeout(800);
  await m.evaluate(() => { const p = document.getElementById('draftFinalResults'); if (p) p.scrollIntoView(); });
  await m.waitForTimeout(500);
  await m.screenshot({ path: SHOTS + '/evidence-review-stage-390.png' });

  // season out + playoffs → SB panel with WASHINGTON on top (the Owner's case) + bracket
  await m.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} try { simRestOfSeason(); } catch (e) {} });
  await m.waitForTimeout(1500);
  await m.evaluate(() => { try { document.querySelectorAll('.zpb-restov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} });
  await m.evaluate(() => {
    try {
      window.__zpbQuietSim = true;
      startPlayoffs();
      for (let i = 0; i < 4; i++) { const rk = seasonState.currentPlayoffRound; if (!seasonState.playoffRoundSimulated) simulatePlayoffRound(); if (rk !== 'superbowl') advancePlayoffRound(); else break; }
    } catch (e) {}
  });
  await m.waitForTimeout(1500);
  for (let i = 0; i < 10; i++) {
    const gone = await m.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); return document.querySelectorAll('.zpb-sbfin,.zpb-restov').length; } catch (e) { return 0; } });
    if (!gone) break;
    await m.waitForTimeout(500);
  }
  // the WASHINGTON synthetic SB panel
  await m.evaluate(() => {
    const sb = seasonState.playoffRounds.superbowl[0];
    const g2 = JSON.parse(JSON.stringify(sb));
    g2.away = 'Washington Commanders';
    const w = document.createElement('div'); w.id = 'washshot';
    w.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:10px;';
    w.innerHTML = '<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">SUPER BOWL</h4>' + renderGameResultHTML(g2, null) + '</div>';
    document.body.appendChild(w);
  });
  await m.waitForTimeout(500);
  await m.screenshot({ path: SHOTS + '/evidence-sb-washington-390.png' });
  await m.evaluate(() => { const h = document.getElementById('washshot'); if (h) h.remove(); });

  // the real bracket funnel
  await m.evaluate(() => { try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await m.waitForTimeout(900);
  await m.evaluate(() => { const t = document.querySelector('.zpb-tree'); if (t) t.scrollIntoView({ block: 'start' }); });
  await m.waitForTimeout(500);
  await m.screenshot({ path: SHOTS + '/evidence-bracket-390.png' });

  await m.close();

  // ---- desktop stills ----
  const d = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
  await d.goto(FILE); await d.waitForTimeout(800);
  await d.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await d.reload(); await d.waitForTimeout(800);
  await d.evaluate(() => { const s = document.getElementById('draftSlotSelect'); if (s) { s.value = 'San Francisco 49ers'; s.dispatchEvent(new Event('change', { bubbles: true })); } });
  await d.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await d.waitForTimeout(1200);
  await d.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await d.waitForTimeout(1500);
  await d.evaluate(() => { const el = document.getElementById('draftRosterList'); if (el) el.scrollIntoView({ block: 'center' }); });
  await d.waitForTimeout(300);
  await d.screenshot({ path: SHOTS + '/evidence-dime-clean-1280.png' });
  await d.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await d.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await d.waitForTimeout(400); }
  await d.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await d.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await d.waitForTimeout(400); }
  await d.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await d.waitForTimeout(600);
  await d.evaluate(() => {
    const host = document.getElementById('draftResultsBody') || document.body;
    const w = document.createElement('div'); w.id = 'pgshot';
    w.style.cssText = 'position:fixed;inset:0;overflow:auto;background:var(--bg);z-index:9999;padding:12px;';
    w.innerHTML = pickGradePanelHTML(); document.body.appendChild(w);
  });
  await d.waitForTimeout(500);
  await d.screenshot({ path: SHOTS + '/evidence-pickgrades-1280.png' });
  await d.evaluate(() => { const h = document.getElementById('pgshot'); if (h) h.remove(); });
  await d.close();

  await browser.close();
  console.log('stills written');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
