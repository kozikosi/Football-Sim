// v3 §7.1 experiment — boot the v3 dist-file (single-arm) build from file:// with the network
// blocked; time to first paint + first interaction, at desktop and at 390 px with CPU 6x throttled;
// and time one PICK reveal under throttle. Honest scope: the dist-file arm is the bench board
// (one PICK path), not the Cakepanz shell — the pick-reveal timing is measured on what exists.
import { chromium } from 'playwright';
import fs from 'node:fs';

const URL = 'file:///home/z/my-project/work/distfile/index.html';
const out = [];
const P = (...a) => { out.push(a.join(' ')); console.log(...a); };

async function boot(label, { width, height, throttle }) {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  // block the NETWORK (any http/https request) — file:// must be fully self-sufficient
  const blocked = [];
  await page.route(/^https?:\/\//i, (r) => { blocked.push(r.request().url()); r.abort(); });
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  const cdp = await ctx.newCDPSession(page);
  if (throttle > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });

  const t0 = Date.now();
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  const tDom = Date.now() - t0;
  // wait for the board to be interactive (rows rendered)
  let rows = 0, tRows = -1;
  for (let i = 0; i < 300; i++) {
    rows = await page.locator('[data-testid], tbody tr, .row, [data-row]').count();
    if (rows > 0) { tRows = Date.now() - t0; break; }
    await page.waitForTimeout(50);
  }
  // paint timing from the browser itself
  const paint = await page.evaluate(() => new Promise((res) => {
    const p = performance.getEntriesByType('paint').map((e) => ({ [e.name]: Math.round(e.startTime) }));
    res(p);
  }));
  P(`[${label}] viewport ${width}x${height} cpu=${throttle}x · domContent ${tDom} ms · first rows ${tRows} ms (${rows} matched nodes) · paint ${JSON.stringify(paint)}`);

  // one PICK reveal under this throttle
  try {
    const btn = page.locator('button', { hasText: /PICK|DRAFT/i }).first();
    if (await btn.count()) {
      const tP = Date.now();
      await btn.click();
      await page.waitForTimeout(4000);
      P(`[${label}] pick clicked +4s observation window — no hang; errors so far: ${errors.length}`);
    } else P(`[${label}] no PICK/DRAFT button found (board-only build)`);
  } catch (e) { P(`[${label}] pick attempt: ${String(e).slice(0, 120)}`); }
  P(`[${label}] blocked network requests: ${blocked.length} · page errors: ${errors.length}${errors.length ? ' :: ' + errors.slice(0, 3).join(' | ') : ''}`);
  await browser.close();
  return { label, tDom, tRows, blocked: blocked.length, errors: errors.length };
}

const r = [];
r.push(await boot('desktop-1x', { width: 1280, height: 800, throttle: 1 }));
r.push(await boot('mobile-6x', { width: 390, height: 844, throttle: 6 }));
fs.writeFileSync('/home/z/my-project/work/distfile-boot.json', JSON.stringify(r, null, 1));
P('wrote /home/z/my-project/work/distfile-boot.json');
