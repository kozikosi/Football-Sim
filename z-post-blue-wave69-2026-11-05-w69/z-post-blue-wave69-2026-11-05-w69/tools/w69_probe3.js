/* w69_probe3.js — Steelers full season → SEASON REVIEW → count name tiers on every card surface, light+dark, + shots. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/work/w69/Football-Sim-Z-post-blue-w68.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SH = '/home/z/my-project/work/w69/shots';
const closeOv = () => page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin,.zpb-restov,.zpb-replay-ov,.zpb-prematch,.zpb-sbfin,.zpb-porun,.zpb-victory,.zpb-ss-ov,.zpb-caution').forEach(f => f.remove()); } catch (e) {} });
let page;

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  page = await browser.newPage({ viewport: { width: 1280, height: 940 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(FILE); await page.waitForTimeout(500);
  await page.evaluate(() => { try { localStorage.clear(); sessionStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(800);
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

  // the draft review page as the Owner first sees it: resultsView='season' + no season yet — the breakdown is open by default
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.screenshot({ path: SH + '/probe-review-season-tab.png' });
  const c1 = await page.evaluate(() => {
    const out = {};
    const count = (sel, label) => { const els = Array.from(document.querySelectorAll(sel)); out[label] = { total: els.length, shm: els.filter(e => /zpb-shm/.test(e.className)).length, vib: els.filter(e => /zpb-vib/.test(e.className)).length }; };
    count('.zpb-fm .zpb-fm-ini', 'fieldMap');
    count('.zpb-dbk b.zpb-gname', 'dbkBadges');
    count('.zpb-dz-name', 'depthZones');
    count('.zpb-pg-name', 'pickGrades');
    count('.zpb-pcard .zpb-pcard-hd b', 'pcards');
    return out;
  });
  console.log('draft-review (season tab, pre-season):', JSON.stringify(c1, null, 1));

  // start the season (preseason page) → then sim the season to the review
  await page.evaluate(() => { const b = document.getElementById('startSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.screenshot({ path: SH + '/probe-preseason-steelers.png', fullPage: false });
  await page.evaluate(() => { const b = document.getElementById('beginSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(3200); await closeOv(); await page.waitForTimeout(600);
  await page.evaluate(() => { const b = document.getElementById('simSeasonBtn'); if (b) b.click(); });
  await page.waitForTimeout(600);
  await page.evaluate(() => { const y = document.querySelector('[data-ss="yes"]'); if (y) y.click(); });
  await page.waitForTimeout(2200); await closeOv(); await page.waitForTimeout(800);
  const state = await page.evaluate(() => ({ phase: seasonState.phase, showReview: !!seasonState.showReview, champ: seasonState.champion }));
  console.log('after sim:', JSON.stringify(state));
  // open the review if it isn't open
  await page.evaluate(() => { const b = document.getElementById('seasonReviewBtn'); if (b) b.click(); });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: SH + '/probe-review-full.png' });
  const c2 = await page.evaluate(() => {
    const out = {};
    const count = (sel, label) => { const els = Array.from(document.querySelectorAll(sel)); out[label] = { total: els.length, shm: els.filter(e => /zpb-shm/.test(e.className)).length, vib: els.filter(e => /zpb-vib/.test(e.className)).length }; };
    count('.zpb-pcard .zpb-pcard-hd b', 'awardPcards');
    count('.zpb-apchip b', 'apChips');
    count('.zpb-pg-name', 'pickGrades');
    count('.zpb-dz-name', 'depthZones');
    // the 20-0 button
    const btn = document.getElementById('zpbTryAgainBtn');
    if (btn) { const s = btn.querySelector('.zpb-shine'); const cs = getComputedStyle(btn), cs2 = s ? getComputedStyle(s) : null;
      out.tryAgain = { btnBg: cs.backgroundImage.slice(0, 80), btnInk: cs.color, shineInk: cs2 ? cs2.color : null, shineClip: cs2 ? (cs2.webkitBackgroundClip || '') : null, shineAnim: cs2 ? cs2.animationName : null }; }
    // award lines that write team names
    const txt = document.body.innerText;
    out.writtenTeamNames = ['Pittsburgh Steelers'].filter(n => txt.includes(n)).length ? 'present' : 'none';
    return out;
  });
  console.log('review page:', JSON.stringify(c2, null, 1));
  // zoom on the TRY AGAIN button
  const btn = await page.$('#zpbTryAgainBtn');
  if (btn) { await btn.scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await btn.screenshot({ path: SH + '/probe-tryagain-steelers-light.png' }); }
  // dark mode version
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
  await page.waitForTimeout(600);
  if (btn) { await btn.screenshot({ path: SH + '/probe-tryagain-steelers-dark.png' }); }
  await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); });

  console.log('page errors:', errs.length, errs.slice(0, 3));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
