/* w55_shots.js — evidence: the fixed surfaces at 390px + the honors-first badges at 1280px. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w55/Football-Sim-Z-post-blue-w55.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  // ---- 390px phone ----
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(1000);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); });
  await page.waitForTimeout(1800);
  await page.evaluate(() => { const el = document.querySelector('#draftTable2 tbody') || document.querySelector('#draftTableWrap'); if (el) el.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/evidence-draft-card.png' });
  await page.evaluate(() => { const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1100);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.evaluate(() => { try { startSeason(); } catch (e) {} try { seasonState.preseason = false; } catch (e) {} });
  await page.waitForTimeout(2400);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-prematch').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/evidence-preview.png' });
  await page.evaluate(() => { try { simulateCurrentWeek(); } catch (e) {} });
  await page.waitForTimeout(2200);
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await page.waitForTimeout(1500);
  await page.evaluate(() => { const g = document.querySelector('#zpbGameReviewNow'); if (g) g.scrollIntoView({ block: 'start' }); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/evidence-boxscore.png' });
  // the SB storm at 390px (the real overlay markup, a synthetic mount — the CSS law is what's under test)
  await page.evaluate(() => {
    const d = document.createElement('div');
    d.className = 'zpb-sbfin zpb-sbfin-in';
    d.innerHTML = '<div class="zpb-sbfin-stage"><div class="zpb-sbfin-kicker">SUPER BOWL · FINAL</div><div class="zpb-sbfin-score"><b>KC 27</b><i>·</i><b>24 SF</b></div><div class="zpb-sbfin-line">THE SUPER BOWL CHAMPIONS</div><div class="zpb-sbfin-champ"><span class="zpb-sbfin-crest">★</span><span class="zpb-sbfin-name">TAMPA BAY BUCCANEERS</span></div><button class="resetbtn zpb-sbfin-go">Continue</button></div>';
    document.body.appendChild(d);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/home/z/my-project/w55/shots/evidence-sb-storm.png' });
  await page.close();
  // ---- 1280px: the season in badges (synthetic honors → the rail leads with HONORS EARNED) ----
  const p2 = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  await p2.goto(FILE); await p2.waitForTimeout(900);
  await p2.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await p2.reload(); await p2.waitForTimeout(900);
  await p2.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await p2.waitForTimeout(900);
  await p2.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 46; i++) { const done = await p2.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await p2.waitForTimeout(400); }
  await p2.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await p2.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await p2.waitForTimeout(400); }
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await p2.evaluate(() => {
    try {
      startSeason(); seasonState.preseason = false;
      const user = seasonUserTeam();
      seasonState.awardsRS = {
        individual: [{ title: 'Most Valuable Player', c: { name: 'Zai Ball', team: user, pos: 'QB' }, why: '' }],
        allPro: { first: { QB: [{ name: 'Zai Ball', team: user }] }, second: {} },
        proBowl: { AFC: { QB: [{ name: 'Zai Ball', team: user }] } }
      };
    } catch (e) {}
  });
  await p2.waitForTimeout(2200);
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov,.zpb-prematch').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} try { renderSeasonTab(document.getElementById('draftResultsBody') || document.body); } catch (e) {} });
  await p2.waitForTimeout(1400);
  await p2.waitForTimeout(6500);
  await p2.evaluate(() => { try { document.querySelectorAll('.zpb-prematch').forEach(o => o.remove()); } catch (e) {} });
  await p2.evaluate(() => { const r = document.querySelector('.zpb-story-rail'); if (r) r.scrollIntoView({ block: 'start' }); });
  await p2.waitForTimeout(900);
  await p2.screenshot({ path: '/home/z/my-project/w55/shots/evidence-badges.png' });
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
