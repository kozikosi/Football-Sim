/* w57_shots.js — the final-bytes evidence stills for the Owner's round-57 asks:
 * the two-line labeled card (light + dark, 390 + 430), the pregame cinematic (390/320),
 * the bracket funnel, the pick grades, the review stage. */
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const FILE = 'file:///home/z/my-project/w57/builds/Football-Sim-Z-post-blue-w57.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
const SHOTS = '/home/z/my-project/w57/shots';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const errors = [];
  const boot = async (page, w) => {
    await page.goto(FILE); await page.waitForTimeout(700);
    await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await page.reload(); await page.waitForTimeout(700);
    await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); });
    await page.waitForTimeout(350);
    await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
    await page.waitForTimeout(1400);
    await page.evaluate(() => { try { if (window._zpbWelCleanup) window._zpbWelCleanup(); document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
    await page.waitForTimeout(300);
  };

  // ---- the draft card, light + dark, 390 + 430 ----
  for (const w of [390, 430]) {
    const page = await browser.newPage({ viewport: { width: w, height: 844 } });
    page.on('pageerror', e => errors.push(w + ': ' + String(e).slice(0, 100)));
    await boot(page);
    await page.evaluate(() => document.getElementById('draftTable2').scrollIntoView());
    await page.waitForTimeout(250);
    await page.screenshot({ path: SHOTS + '/w57-' + w + '-draftcard.png' });
    await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); try { localStorage.setItem('zpb:theme', 'dark'); } catch (e) {} });
    await page.waitForTimeout(350);
    await page.screenshot({ path: SHOTS + '/w57-' + w + '-draftcard-dark.png' });
    await page.close();
  }

  // ---- the bracket funnel, pick grades, review stage at 390 (season completed) ----
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', e => errors.push('390b: ' + String(e).slice(0, 100)));
  await boot(page);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 60; i++) { const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } }); if (done) break; await page.waitForTimeout(400); }
  await page.waitForTimeout(1000);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); } catch (e) {} });
  await page.waitForTimeout(400);
  // review stage
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-restov,.zpb-sbfin,.zpb-replay-ov').forEach(o => o.remove()); window.__zpbStoryHold = false; document.querySelectorAll('.zpb-story-veil').forEach(v => v.remove()); } catch (e) {} });
  await page.waitForTimeout(600);
  const rb = await page.evaluate(() => { const b = document.getElementById('tabReviewBtn') || document.querySelector('[data-tab="review"]'); if (b) { b.click(); return true; } return false; });
  await page.waitForTimeout(900);
  if (rb) await page.screenshot({ path: SHOTS + '/w57-390-review-stage.png' });
  // pick grades (the grades panel on the review page)
  const pg = await page.evaluate(() => { const el = document.querySelector('.zpb-pg-grid'); if (el) el.scrollIntoView({ block: 'start' }); return !!el; });
  await page.waitForTimeout(400);
  if (pg) await page.screenshot({ path: SHOTS + '/w57-390-pickgrades.png' });
  // the bracket
  const br = await page.evaluate(() => { try { const b = document.getElementById('tabPlayoffsBtn') || document.querySelector('[data-tab="playoffs"]'); if (b) { b.click(); return true; } } catch (e) {} try { renderPlayoffsTab && renderPlayoffsTab(); return true; } catch (e) { return false; } });
  await page.waitForTimeout(900);
  if (br) { await page.evaluate(() => { const el = document.querySelector('.zpb-tree'); if (el) el.scrollIntoView(); }); await page.waitForTimeout(300); await page.screenshot({ path: SHOTS + '/w57-390-bracket.png' }); }
  await page.close();

  console.log('shots done · pageerrors: ' + (errors.length ? errors.join(' | ') : 'none'));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
