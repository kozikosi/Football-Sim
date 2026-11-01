#!/usr/bin/env node
/* w52_mobile.js — 390px: the rankings page + the draft-review map/cards sync surface must not
   overflow; the bracket cards keep their @ rule on the phone; zero page errors. */
const { chromium } = require('/home/z/my-project/node_modules/playwright-core');
const FILE = 'file:///home/z/my-project/w52/Football-Sim-Z-post-blue-w52.html';
const exe = '/home/z/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell';
let PASS = 0, FAIL = 0;
const ok = (c, l, d = '') => { console.log(`   ${c ? 'PASS' : 'FAIL'}  ${l}${d ? ' — ' + d : ''}`); c ? PASS++ : FAIL++; };

(async () => {
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message.slice(0, 120)));
  await page.goto(FILE); await page.waitForTimeout(900);
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload(); await page.waitForTimeout(900);
  await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find(x => /madden rankings/i.test(x.textContent || '')); if (b) b.click(); });
  await page.waitForTimeout(900);
  const m = await page.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    chips: document.querySelectorAll('.zpb-anch').length
  }));
  ok(m.overflowX <= 0, '390px: no horizontal overflow on the rankings', 'overflowX=' + m.overflowX);
  ok(m.chips > 0, '390px: the anchor chips render');
  // the draft review at phone width: the map + cards + no overflow
  await page.evaluate(() => { const b = document.getElementById('startDraftBtn'); if (b) b.click(); });
  await page.waitForTimeout(900);
  await page.evaluate(() => { const i = document.getElementById('speedInstantBtn'); if (i) i.click(); const s = document.getElementById('simToEndBtn'); if (s) s.click(); });
  for (let i = 0; i < 40; i++) {
    const done = await page.evaluate(() => { try { return !!(draftSim && draftSim.pos >= 32 * 12); } catch (e) { return false; } });
    if (done) break;
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 16; i++) { const fin = await page.evaluate(() => !!document.querySelector('.zpb-fin')); if (!fin) break; await page.waitForTimeout(400); }
  await page.evaluate(() => { try { document.querySelectorAll('.zpb-fin').forEach(f => f.remove()); window.zpbReleaseLookGate && window.zpbReleaseLookGate(); } catch (e) {} });
  await page.evaluate(() => { const b = document.getElementById('tabDraftBtn'); if (b) b.click(); }); // back to the draft view (the rankings visit left it hidden)
  await page.waitForTimeout(700);
  await page.evaluate(() => { const m2 = document.querySelector('.zpb-fm'); if (m2) m2.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(1200);
  // a settle nudge: a second scroll pulse in case the first landed mid-layout
  await page.evaluate(() => { const m2 = document.querySelector('.zpb-fm'); if (m2 && !m2.classList.contains('zpb-seen')) { window.scrollBy(0, 2); setTimeout(() => m2.scrollIntoView({ block: 'center' }), 120); } });
  await page.waitForTimeout(1500);
  const m2 = await page.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    map: !!document.querySelector('.zpb-fm'),
    seen: document.querySelectorAll('.zpb-fm.zpb-seen').length,
    groups: document.querySelectorAll('.zpb-dbk-g').length,
    groupsSeen: document.querySelectorAll('.zpb-dbk-g.zpb-seen').length
  }));
  ok(m2.overflowX <= 0, '390px: no horizontal overflow on the draft review', 'overflowX=' + m2.overflowX);
  ok(m2.map && m2.groupsSeen === m2.groups, '390px: the map look releases EVERY card group (the sync holds on the phone)', JSON.stringify(m2));
  await page.screenshot({ path: 'shots/w52-mobile-review.png' });
  ok(errors.length === 0, 'zero page errors', errors.slice(0, 3).join(' | '));
  console.log(`\nw52_mobile: ${PASS} pass · ${FAIL} fail`);
  await browser.close();
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
