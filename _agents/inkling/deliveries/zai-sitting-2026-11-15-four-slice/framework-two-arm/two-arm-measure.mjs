/* two-arm-measure.mjs — §2.5c: ONE protocol, both arms, in one process.
 * For each arm (dist built first): boot from file:// with the network blocked; CPU throttle 6×
 * (CDP Emulation.setCPUThrottlingRate); measure first-contentful-paint and time-to-feed-mounted;
 * 390×844 horizontal-scroll check on the heaviest view (the fixture: MIN @ CHI 21-11, 20 drives,
 * 6 scoring drives, 3 turnovers — the longest names and a three-score game); keyboard reachability
 * (Tab reaches the filter buttons; a feed line is focusable); console/page errors; then a live
 * interaction round (NEWEST FIRST + MY DRIVES) asserting the SAME DOM semantics on both arms.
 * The crossorigin/file:// caveat applies to BOTH arms equally; the boot uses the same flags as the
 * app tree's file:// probe (documented in logs/verification-5).
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const ARMS = [
  { name: 'vue', dist: new URL('./arm-vue/dist/index.html', import.meta.url).pathname, sel: '.cp-feed-line' },
  { name: 'svelte', dist: new URL('./arm-svelte/dist/index.html', import.meta.url).pathname, sel: '.cp-feed-line' },
];
const FLAGS = ['--no-sandbox', '--allow-file-access-from-files'];
const out = {};

for (const arm of ARMS) {
  const URL_ = pathToFileURL(arm.dist).href;
  const browser = await pw.chromium.launch({ args: FLAGS });
  const res = { url: URL_, blocked: 0, errors: [], fcpMs: -1, mountedMs: -1, scroll390: -1, keyboard: {}, live: {} };

  // -- cold load, desktop, 6x throttle --
  {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
    const page = await ctx.newPage();
    await page.route(/^https?:\/\//i, (r) => { res.blocked++; r.abort(); });
    page.on('pageerror', (e) => res.errors.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') res.errors.push('console: ' + m.text()); });
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
    const t0 = Date.now();
    await page.goto(URL_, { waitUntil: 'domcontentloaded' });
    for (let i = 0; i < 1200; i++) {
      if (await page.locator(arm.sel).count() > 0) { res.mountedMs = Date.now() - t0; break; }
      await page.waitForTimeout(25);
    }
    const paints = await page.evaluate(() => performance.getEntriesByType('paint').map((e) => ({ name: e.name, t: Math.round(e.startTime) })));
    res.fcpMs = (paints.find((p) => p.name === 'first-contentful-paint') || {}).t ?? -1;
    res.live.lines = await page.locator(arm.sel).count();
    res.live.me = await page.locator(`${arm.sel}.cp-me`).count();
    res.live.final = (await page.locator('.cp-feed-final b').first().textContent() || '').trim().slice(0, 40);
    res.live.prov = (await page.locator('.cp-feed-prov').textContent() || '').trim();
    await ctx.close();
  }

  // -- 390 px, the heaviest view: no horizontal scroll --
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.route(/^https?:\/\//i, (r) => { r.abort(); });
    page.on('pageerror', (e) => res.errors.push('pageerror(390): ' + e.message));
    await page.goto(URL_, { waitUntil: 'domcontentloaded' });
    for (let i = 0; i < 1200; i++) { if (await page.locator(arm.sel).count() > 0) break; await page.waitForTimeout(25); }
    res.scroll390 = await page.evaluate(() => ({ sw: document.scrollingElement.scrollWidth, iw: window.innerWidth, doc: document.documentElement.scrollWidth }));
    await page.screenshot({ path: new URL(`./shots/twoarm-${arm.name}-390.png`, import.meta.url).pathname, fullPage: false });
    await ctx.close();
  }

  // -- keyboard reachability + live interaction semantics --
  {
    const ctx = await browser.newContext({ viewport: { width: 1180, height: 950 } });
    const page = await ctx.newPage();
    await page.route(/^https?:\/\//i, (r) => { r.abort(); });
    page.on('pageerror', (e) => res.errors.push('pageerror(kb): ' + e.message));
    await page.goto(URL_, { waitUntil: 'domcontentloaded' });
    for (let i = 0; i < 1200; i++) { if (await page.locator(arm.sel).count() > 0) break; await page.waitForTimeout(25); }
    // Tab from the body reaches the first filter button without a mouse
    await page.keyboard.press('Tab');
    const firstFocus = await page.evaluate(() => ({ tag: document.activeElement?.tagName, cls: document.activeElement?.className, text: (document.activeElement?.textContent || '').trim() }));
    // a feed line is focusable
    const lineFocus = await page.evaluate(() => { const l = document.querySelector('.cp-feed-line'); l?.focus(); return document.activeElement === l; });
    // MY DRIVES filters; NEWEST FIRST flips
    const before = await page.locator(arm.sel).count();
    await page.getByText('MY DRIVES').click(); await page.waitForTimeout(150);
    const mine = await page.locator(arm.sel).count();
    await page.getByText('MY DRIVES').click(); await page.waitForTimeout(150);
    await page.getByText('NEWEST FIRST').click(); await page.waitForTimeout(150);
    const firstAfter = (await page.locator(`${arm.sel} .zrl-t`).first().textContent() || '').trim();
    const linesAfter = await page.locator(arm.sel).count();
    res.keyboard = { firstFocus, lineFocusable: lineFocus };
    res.live = { ...res.live, before, mineOnly: mine, mineMatchesMe: mine === res.live.me, firstAfterNewest: firstAfter, linesAfterNewest: linesAfter };
    await ctx.close();
  }

  out[arm.name] = res;
  await browser.close();
}

console.log(JSON.stringify(out, null, 1));
const v = out.vue, s = out.svelte;
console.log('\n== the six criteria, same protocol, same fixture ==');
console.log(`offline file:// : vue blocked=${v.blocked} errors=${v.errors.length} · svelte blocked=${s.blocked} errors=${s.errors.length}`);
console.log(`cold load 6x    : vue fcp=${v.fcpMs}ms mounted=${v.mountedMs}ms · svelte fcp=${s.fcpMs}ms mounted=${s.mountedMs}ms`);
console.log(`390 px scroll   : vue scrollWidth=${v.scroll390?.sw} doc=${v.scroll390?.doc} · svelte scrollWidth=${s.scroll390?.sw} doc=${s.scroll390?.doc} (viewport 390)`);
console.log(`keyboard        : vue firstFocus=${JSON.stringify(v.keyboard.firstFocus)} lineFocusable=${v.keyboard.lineFocusable} · svelte firstFocus=${JSON.stringify(s.keyboard.firstFocus)} lineFocusable=${s.keyboard.lineFocusable}`);
console.log(`live semantics  : vue lines=${v.live.lines} me=${v.live.me} mineFilter=${v.live.mineOnly} flip->${v.live.firstAfterNewest} · svelte lines=${s.live.lines} me=${s.live.me} mineFilter=${s.live.mineOnly} flip->${s.live.firstAfterNewest}`);
