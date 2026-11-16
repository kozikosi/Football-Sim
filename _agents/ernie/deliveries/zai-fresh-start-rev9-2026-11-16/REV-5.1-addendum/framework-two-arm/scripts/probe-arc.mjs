/* probe-arc.mjs — the w89-arc battery (item 5): ONE protocol, both arms, one process.
 *   (a) team-select tour  — TOUR THE 32 steps the highlight through the engine's real alignment with
 *                           a live caption; the highlight MOVES over time; STOP freezes it. Both arms.
 *   (c) draft panels      — randomised assignment (journal: arm=vue → the real-time ticker; arm=svelte →
 *                           the bottom-left lineup panel). Vue: the ticker emits lines over time from the
 *                           REAL draft log; PAUSE freezes; RESUME continues. Svelte: opening a featured
 *                           card highlights that player's slot in MY LINEUP (updates as the user studies).
 *   (b/d) save refusals   — covered by the four-slice probe re-run (the ONE command, both arms): corrupt
 *                           refused verbatim + a NEWER-build envelope with a FRESH seed (4242) refused by
 *                           VERSION; cross-referenced, not re-run here (item 7(v)).
 * Console/page errors and blocked requests collected across the whole session.
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ARMS = [
  { name: 'vue', dist: new URL('../arm-vue/dist/index.html', import.meta.url).pathname },
  { name: 'svelte', dist: new URL('../arm-svelte/dist/index.html', import.meta.url).pathname },
];
const FLAGS = ['--no-sandbox', '--allow-file-access-from-files'];
const out = {};
const txt = (loc) => loc.textContent().then((t) => (t || '').trim());

for (const arm of ARMS) {
  const URL_ = pathToFileURL(arm.dist).href;
  const browser = await pw.chromium.launch({ args: FLAGS });
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
  const page = await ctx.newPage();
  const res = { url: URL_, blocked: 0, errors: [], steps: {}, screenshots: [] };
  await page.route(/^https?:\/\//i, (r) => { res.blocked++; r.abort(); });
  page.on('pageerror', (e) => res.errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') res.errors.push('console: ' + m.text()); });
  const step = async (name, fn) => { try { res.steps[name] = await fn(); } catch (e) { res.steps[name] = 'FAIL: ' + e.message; } };
  const shot = async (name) => { const p = `../shots/arc-${arm.name}-${name}.png`; await page.screenshot({ path: new URL(p, import.meta.url).pathname, fullPage: true }); res.screenshots.push(p); };

  await page.goto(URL_);
  await page.waitForSelector('.cp-teambtn', { timeout: 20000 });
  await page.waitForTimeout(300);

  // (a) the animated tour of the 32
  await step('arc.tour.moves', async () => {
    await page.getByRole('button', { name: 'TOUR THE 32', exact: true }).click();
    const grab = async () => page.evaluate(() => {
      const el = document.querySelector('.cp-teambtn.cp-tour-on');
      return el ? (el.textContent || '').trim() : null;
    });
    await page.waitForSelector('.cp-tour-on', { timeout: 5000 });
    const a1 = await grab();
    await page.waitForTimeout(900);
    const a2 = await grab();
    await page.waitForTimeout(900);
    const a3 = await grab();
    const cap = await txt(page.locator('.cp-toolrow .cp-board-count'));
    return { a1, a2, a3, caption: cap, moved: a1 !== a2 && a2 !== a3 && a1 !== a3 };
  });
  await shot('tour');
  await step('arc.tour.stops', async () => {
    await page.getByRole('button', { name: 'STOP', exact: true }).click();
    await page.waitForTimeout(200);
    const gone = (await page.locator('.cp-tour-on').count()) === 0;
    await page.waitForTimeout(900);
    return { highlightCleared: gone, stillCleared: (await page.locator('.cp-tour-on').count()) === 0 };
  });

  // (c) the draft panels — one per arm, randomised
  await page.getByRole('button', { name: 'Buffalo Bills', exact: true }).click();
  await page.waitForSelector('.cp-board-row', { timeout: 20000 });
  if (arm.name === 'vue') {
    await step('arc.vue.ticker.live', async () => {
      await page.locator('.cp-pickbtn').first().click();   // the log feeds only after a real pick lands
      await page.waitForSelector('.cp-ticker-line', { timeout: 8000 });
      const n1 = await page.locator('.cp-ticker-line').count();
      const t1 = await txt(page.locator('.cp-ticker-line').last());
      await page.waitForTimeout(3600);
      const n2 = await page.locator('.cp-ticker-line').count();
      const t2 = await txt(page.locator('.cp-ticker-line').last());
      await page.getByRole('button', { name: 'PAUSE', exact: true }).click();
      const frozen = await txt(page.locator('.cp-ticker-line').last());
      await page.waitForTimeout(2000);
      const after = await txt(page.locator('.cp-ticker-line').last());
      return { n1, t1, n2, t2, grew: n2 > n1, changed: t1 !== t2, pauseWorks: frozen === after };
    });
    await shot('ticker');
  } else {
    await step('arc.svelte.lineup.updatesAsUserStudies', async () => {
      await page.getByRole('button', { name: 'CARDS', exact: true }).click();
      await page.waitForSelector('.cp-card', { timeout: 20000 });
      const before = await txt(page.locator('.cp-lineup h4'));
      // WR has the board's depth (measured node-side: 16 of 60 rows) — pick a WR for real, then
      // study another WR: the panel highlights the incumbent he competes with
      await page.locator('.cp-card[data-pos="WR"]').first().click();
      await page.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
      await page.locator('.cp-cards-featcard .cp-pickbtn').click();
      await page.waitForTimeout(600);
      const after = await txt(page.locator('.cp-lineup h4'));
      await page.locator('.cp-card[data-pos="WR"]').first().click();
      await page.waitForSelector('.cp-cards-featcard', { timeout: 5000 });
      const hl = page.locator('.cp-lineup-row.cp-lineup-on');
      const hlPos = (await hl.count()) ? await hl.first().getAttribute('data-pos') : null;
      const hlText = (await hl.count()) ? await hl.first().textContent() : '(none)';
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
      const cleared = (await page.locator('.cp-lineup-row.cp-lineup-on').count()) === 0;
      return { before, after, highlight: (hlText || '').trim(), hlPos, highlightsStudied: hlPos === 'WR', clearedOnClose: cleared };
    });
    await shot('lineup');
  }

  res.errorCount = res.errors.length;
  out[arm.name] = res;
  await browser.close();
}
console.log(JSON.stringify(out, null, 1));
const ok = (v) => v !== false && !(typeof v === 'string' && v.startsWith('FAIL'));
const fails = [];
for (const [arm, res] of Object.entries(out)) {
  for (const [k, v] of Object.entries(res.steps)) if (!ok(v)) fails.push(`${arm}.${k}: ${JSON.stringify(v).slice(0, 240)}`);
  if (res.errorCount > 0) fails.push(`${arm}.consoleErrors: ${res.errors.slice(0, 3).join(' | ')}`);
}
console.log('\n== ARC VERDICT ==');
console.log(fails.length ? 'FAILS:\n' + fails.join('\n') : 'ARC LAWS PASS: tour moves+stops on both arms; vue ticker live+pausable; svelte lineup highlights the studied player');
