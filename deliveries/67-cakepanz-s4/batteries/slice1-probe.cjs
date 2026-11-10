/* slice1-probe.js — run the built 67 Cakepanz slice in a browser and exercise the Draft Board */
const pw = require('playwright');
const path = require('path');
const FILE = 'http://localhost:4179/?dev=1';
(async () => {
  const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1180, height: 900 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(FILE); await page.waitForTimeout(1500);
  const boot = await page.evaluate(() => ({
    brand: document.querySelector('.cp-brand')?.textContent || null,
    prov: document.querySelector('.cp-prov')?.textContent || null,
    onClock: document.querySelector('.cp-onclock')?.textContent || null,
    rowCount: document.querySelectorAll('.cp-row').length,
    firstRow: document.querySelector('.cp-row .cp-main')?.textContent?.trim().slice(0, 80) || null,
    sortOn: document.querySelector('.cp-sort.cp-on')?.textContent || null,
    modeLocked: !!document.querySelector('.cp-modes.cp-locked'),
    modes: Array.from(document.querySelectorAll('.cp-mode')).map((b) => ({ lbl: b.textContent, on: b.classList.contains('cp-on'), disabled: b.disabled })),
    chips: Array.from(document.querySelectorAll('.cp-chip')).length,
  }));
  // pick the first player at his primary slot
  await page.evaluate(() => { const b = document.querySelector('.cp-row .cp-main'); if (b) b.click(); });
  await page.waitForTimeout(200);
  const confirmVisible = await page.evaluate(() => !!document.querySelector('.cp-confirm'));
  await page.evaluate(() => { const c = document.querySelector('.cp-go'); if (c) c.click(); });
  await page.waitForTimeout(700);
  const afterPick = await page.evaluate(() => ({
    onClock: document.querySelector('.cp-onclock')?.textContent || null,
    count: document.querySelector('.cp-count')?.textContent || null,
    confirmGone: !document.querySelector('.cp-confirm'),
  }));
  // undo
  await page.evaluate(() => { const u = document.querySelector('.cp-undo'); if (u && !u.disabled) u.click(); });
  await page.waitForTimeout(700);
  const afterUndo = await page.evaluate(() => ({ count: document.querySelector('.cp-count')?.textContent || null }));
  // sort by ovr
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.cp-sort')).find((x) => x.textContent === 'OVR'); if (b) b.click(); });
  await page.waitForTimeout(400);
  const afterSort = await page.evaluate(() => ({
    sortOn: document.querySelector('.cp-sort.cp-on')?.textContent || null,
    firstOvr: document.querySelector('.cp-row .cp-ovr')?.textContent || null,
  }));
  // flex chip from an open row
  await page.evaluate(() => { const b = document.querySelector('.cp-row .cp-main'); if (b) b.click(); });
  await page.waitForTimeout(200);
  const flexInfo = await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('.cp-chip i')).map((i) => i.textContent);
    return { chips: chips.slice(0, 6), chipCount: chips.length };
  });
  // the mode switch is disabled mid-draft
  await page.screenshot({ path: '/home/z/my-project/build/cakepanz/67-cakepanz/shots/slice1-board.png' });
  console.log(JSON.stringify({ boot, confirmVisible, afterPick, afterUndo, afterSort, flexInfo, errs: errs.slice(0, 4) }, null, 1));
  await browser.close();
})().catch((e) => { console.error('CRASH', e); process.exit(1); });
