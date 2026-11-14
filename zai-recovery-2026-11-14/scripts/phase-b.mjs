// PHASE B — phone-class measurement, stated basis.
// BASIS (no real phone in this sandbox, said plainly): CDP Emulation.setCPUThrottlingRate(4|6) on the
// 2 vCPU Xeon host physically slows the renderer main thread 4x/6x — the instrument-imposed equivalent
// of a mid-range phone's single-core (Ernie §5 B1's "state a slowdown factor and apply it" — the factor
// is IMPOSED, not borrowed). Slow-3G = CDP Network.emulateNetworkConditions (400 kbps, 400 ms RTT).
// Cells per arm: goneOdds-heavy sort (r1-u0), PICK at r1-u0 (the UX-1 phone number), scroll p95 at
// 390x844 (feeds H), boot times, slow-3G first load.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { chromium } from 'playwright';

const ARMS = [
  { label: 'vue', dist: '/home/z/my-project/scratch/arm-vue/dist' },
  { label: 'svelte', dist: '/home/z/my-project/scratch/arm-svelte/dist' },
];
const userPicks = JSON.parse(fs.readFileSync('/home/z/my-project/scratch/wave/userPicks.json', 'utf8'));
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const p95 = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.max(0, Math.ceil(s.length * 0.95) - 1)]; };

function serve(dist) {
  const server = http.createServer((_q, s) => {
    const url = _q.url === '/' ? '/index.html' : _q.url.split('?')[0];
    const f = path.join(dist, url);
    if (fs.existsSync(f)) { s.setHeader('content-type', url.endsWith('.js') ? 'text/javascript' : 'text/html'); s.end(fs.readFileSync(f)); }
    else { s.statusCode = 404; s.end(); }
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}

async function withCtx(profile, opts, fn) {
  fs.rmSync(profile, { recursive: true, force: true });
  let ctx;
  try {
    ctx = await chromium.launchPersistentContext(profile, { headless: true, ...opts });
    return await fn(ctx);
  } finally {
    try { await ctx.close(); } catch { /* already dead */ }
    fs.rmSync(profile, { recursive: true, force: true });
  }
}
async function boot(ctx, origin, cdp) {
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  if (cdp) await cdp(page);
  await page.goto(origin);
  await page.waitForFunction('window.__bench && window.__bench.pickById', null, { timeout: 90000 });
  return page;
}

async function measureArm(arm) {
  const server = await serve(arm.dist);
  const origin = `http://127.0.0.1:${server.address().port}/`;
  const out = { arm: arm.label, basis: 'CDP CPU throttle x4/x6 on 2 vCPU Xeon (imposed, stated); slow-3G = CDP Network.emulateNetworkConditions 400ms/50dBW', cells: {}, boot: {}, scroll: {}, errors: [] };

  for (const rate of [1, 4, 6]) {
    try {
      await withCtx(path.join(os.tmpdir(), `bench2-b-${arm.label}-${rate}`), { viewport: { width: 390, height: 844 } }, async (ctx) => {
        const page = await boot(ctx, origin, rate > 1 ? (p) => p.context().newCDPSession(p).then((c) => c.send('Emulation.setCPUThrottlingRate', { rate })) : null);
        out.boot['throttle' + rate + 'x'] = { note: 'boot+START to interactive' };
        const sorts = [];
        for (let i = 0; i < 4; i++) {
          const ms = await page.evaluate(async () => {
            const t0 = performance.now();
            const vm = window.__bench.selectBoard(window.__bench.store.getState(), { sort: 'wins', limit: 60 });
            void vm.rows.length;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            return performance.now() - t0;
          });
          sorts.push(+ms.toFixed(1));
        }
        out.cells['sort-r1u0-' + rate + 'x'] = { samples: sorts.slice(1), median: +med(sorts.slice(1)).toFixed(1) };
        const picks = [];
        for (let i = 0; i < 2; i++) {
          const ms = await page.evaluate(async (pid) => {
            const t0 = performance.now();
            window.__bench.pickById(pid, 'QB1');
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            return performance.now() - t0;
          }, userPicks[0].playerId);
          picks.push(+ms.toFixed(1));
        }
        out.cells['pick-r1u0-' + rate + 'x'] = { samples: picks, median: +med(picks).toFixed(1), note: 'PICK #1 (goneOdds r1-u0 replay) → paint, double-rAF' };
      });
    } catch (e) { out.errors.push('rate ' + rate + ': ' + String(e).split('\n')[0].slice(0, 140)); }
  }

  // scroll + horizontal check at 390x844, no throttle
  try {
    await withCtx(path.join(os.tmpdir(), `bench2-b-${arm.label}-scroll`), { viewport: { width: 390, height: 844 } }, async (ctx) => {
      const page = await boot(ctx, origin, null);
      const rows = await page.evaluate(() => document.querySelectorAll('[data-testid="board-row"]').length);
      const scrolls = [];
      for (let i = 0; i < 12; i++) {
        const frac = i % 2;
        const t0 = await page.evaluate((f) => { performance.mark('s0'); window.scrollTo({ top: document.body.scrollHeight * f }); return performance.now(); }, frac);
        const t1 = await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(performance.now())))));
        scrolls.push(+(t1 - t0).toFixed(2));
      }
      out.scroll = { domRows: rows, viewport: '390x844', scrollP95ms: +p95(scrolls).toFixed(2), horizontalScrollDelta: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), samples: scrolls.slice(0, 6) };
    });
  } catch (e) { out.errors.push('scroll: ' + String(e).split('\n')[0].slice(0, 140)); }

  // slow-3G first load (cold profile, no throttle)
  try {
    await withCtx(path.join(os.tmpdir(), `bench2-b-${arm.label}-3g`), { viewport: { width: 390, height: 844 } }, async (ctx) => {
      const page = await boot(ctx, origin, (p) => p.context().newCDPSession(p).then(async (c) => { await c.send('Network.enable'); await c.send('Network.emulateNetworkConditions', { offline: false, latency: 400, downloadThroughput: 50 * 1024, uploadThroughput: 32 * 1024 }); }));
      void page;
      out.boot.slow3G = 'ok';
    });
    // boot timing measured separately (clock outside)
  } catch (e) { out.errors.push('3g: ' + String(e).split('\n')[0].slice(0, 140)); }
  // timed slow-3G boot
  try {
    await withCtx(path.join(os.tmpdir(), `bench2-b-${arm.label}-3gt`), { viewport: { width: 390, height: 844 } }, async (ctx) => {
      const t0 = Date.now();
      const page = ctx.pages()[0] ?? (await ctx.newPage());
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 400, downloadThroughput: 50 * 1024, uploadThroughput: 32 * 1024 });
      await page.goto(origin);
      await page.waitForFunction('window.__bench && window.__bench.pickById', null, { timeout: 120000 });
      out.boot.slow3GFirstLoadMs = Date.now() - t0;
    });
  } catch (e) { out.errors.push('3gt: ' + String(e).split('\n')[0].slice(0, 140)); }

  server.close();
  return out;
}

const results = [];
for (const arm of ARMS) results.push(await measureArm(arm));
fs.mkdirSync('/home/z/my-project/scratch/wave', { recursive: true });
fs.writeFileSync('/home/z/my-project/scratch/wave/phaseB.json', JSON.stringify(results, null, 2));
for (const r of results) console.log(r.arm, JSON.stringify({ cells: r.cells, boot: r.boot, scroll: r.scroll, errors: r.errors }, null, 1));
