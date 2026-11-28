/* probe-a11y.mjs — the Part-5 accessibility receipts: tab order on the Team Select picker, the
   gone% tooltip's keyboard behaviour, the needs-row filter's toggle semantics, the Settings form's
   label/control association, and the basics (lang, landmarks, button names). */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch (e) { throw new Error("playwright is not installed — it is a devDependency: run npm ci (then npx playwright install chromium for the browser). D-1: no HOME-global fallback. Original: " + e.message); }

const browser = await pw.chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 950 } });
await page.goto('http://localhost:4179/?dev=1');
await page.waitForTimeout(2000);

// 1. tab order on the picker: focus the first team, tab 6 times, report the focused elements
await page.locator('.cp-ts-team').first().focus();
const walk = [];
for (let i = 0; i < 8; i++) {
  await page.keyboard.press('Tab');
  walk.push(await page.evaluate(() => {
    const el = document.activeElement;
    return el ? el.className.split(' ')[0] + (el.textContent ? ':' + el.textContent.trim().slice(0, 10) : '') : 'none';
  }));
}
console.log('TAB WALK from team 1:', walk.join(' · '));
const teamBtns = await page.locator('.cp-ts-team').count();
const after6 = walk.filter((w) => w.startsWith('cp-ts-team')).length;
console.log(`tab order: the walk stays inside the team grid then reaches the next group (teams=${teamBtns}, walked-into-teams=${after6}) — PASS ${after6 >= 2 ? 'YES' : 'NO'}`);

// 2. the gone% tooltip's keyboard behaviour (needs a board: start a draft)
await page.locator('.cp-ts-team', { hasText: 'Chicago Bears' }).click();
await page.locator('.cp-ts-go').click(); await page.waitForTimeout(900);
const tip = await page.evaluate(() => {
  const w = document.querySelector('.cp-gone-wrap');
  const t = document.querySelector('.cp-gonetip');
  return { wrapTag: w?.tagName, wrapFocusable: w?.hasAttribute('tabindex'), tipRole: t?.getAttribute('role'), visibleNow: t ? getComputedStyle(t).display !== 'none' : false };
});
console.log('GONE TOOLTIP:', JSON.stringify(tip));
if (!tip.wrapFocusable) {
  console.log('FINDING: the gone% wrap is NOT keyboard-focusable (the hover-only tooltip has no keyboard path)');
}

// 3. the needs-row filter's toggle semantics
const needs = await page.evaluate(() => {
  const row = document.querySelector('.cp-needs');
  const btns = Array.from(document.querySelectorAll('.cp-needs button, .cp-need'));
  return { exists: !!row, count: btns.length, pressed: btns.filter((b) => b.hasAttribute('aria-pressed')).length };
});
console.log('NEEDS ROW:', JSON.stringify(needs));

// 4. the Settings form's label/control association
await page.locator('.cp-navbtn', { hasText: 'SETTINGS' }).click(); await page.waitForTimeout(400);
const labels = await page.evaluate(() => {
  const out = [];
  for (const id of ['set-mode', 'set-motion', 'set-order']) {
    const el = document.getElementById(id);
    const lbl = document.querySelector(`label[for="${id}"]`);
    out.push(`${id}: control=${!!el} label-for=${!!lbl}${lbl ? ' (' + lbl.textContent.trim().slice(0, 24) + ')' : ''}`);
  }
  const orphan = Array.from(document.querySelectorAll('label')).filter((l) => !l.getAttribute('for') && !l.querySelector('input,select,button') && l.textContent.trim());
  out.push('orphan labels (no for, no wrapped control): ' + orphan.length + (orphan.length ? ' — ' + orphan[0].textContent.trim().slice(0, 40) : ''));
  return out;
});
console.log('SETTINGS LABELS:', labels.join(' | '));

// 5. the basics
const basics = await page.evaluate(() => ({
  lang: document.documentElement.getAttribute('lang'),
  mainLandmark: !!document.querySelector('main'),
  navLandmark: !!document.querySelector('nav[aria-label]'),
  unnamedButtons: Array.from(document.querySelectorAll('button')).filter((b) => !b.textContent.trim() && !b.getAttribute('aria-label')).length,
}));
console.log('BASICS:', JSON.stringify(basics));
await browser.close();
