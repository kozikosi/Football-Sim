// PHASE D — the library test, per Ernie's WR-BENCH2 spec: same feature both sides, four columns
// (integration cost · behavioural correctness · render performance · style fidelity), never summed.
// Usage: node scripts/phase-d.mjs
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { execSync } from 'node:child_process';
import { chromium } from 'playwright';

const ARMS = [
  { label: 'vue', dist: '/home/z/my-project/scratch/arm-vue/dist', lib: '@vueuse/core', src: '/home/z/my-project/scratch/arm-vue/src-bench/library/Board2.vue', pkg: '/home/z/my-project/scratch/arm-vue/package.json' },
  { label: 'svelte', dist: '/home/z/my-project/scratch/arm-svelte/dist', lib: '@tanstack/svelte-virtual', src: '/home/z/my-project/scratch/arm-svelte/src-bench/library/Board2.svelte', pkg: '/home/z/my-project/scratch/arm-svelte/package.json' },
];
const SHOTS = '/home/z/my-project/scratch/wave/shots-d';
fs.mkdirSync(SHOTS, { recursive: true });

function serve(dist) {
  const server = http.createServer((_q, s) => {
    const url = _q.url === '/' ? '/library.html' : _q.url.split('?')[0];
    const f = path.join(dist, url);
    if (fs.existsSync(f)) { s.setHeader('content-type', url.endsWith('.js') ? 'text/javascript' : url.endsWith('.css') ? 'text/css' : url.endsWith('.woff2') ? 'font/woff2' : 'text/html'); s.end(fs.readFileSync(f)); }
    else { s.statusCode = 404; s.end(); }
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const p95 = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.max(0, Math.ceil(s.length * 0.95) - 1)]; };

async function measureArm(arm) {
  const server = await serve(arm.dist);
  const origin = `http://127.0.0.1:${server.address().port}/library.html`;
  const out = { arm: arm.label, library: arm.lib, assertions: {}, perf: {}, errors: [] };

  // --- desktop pass (1280x900): behaviour + perf + shot ---
  await (async () => {
    const profile = path.join(os.tmpdir(), `bench2-d-${arm.label}-d`);
    fs.rmSync(profile, { recursive: true, force: true });
    const ctx = await chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 1280, height: 900 } });
    const page = ctx.pages()[0] ?? (await ctx.newPage());
    page.on('pageerror', (e) => out.errors.push('pageerror ' + String(e).slice(0, 140)));
    await page.goto(origin);
    await page.waitForFunction('document.querySelectorAll(\'[data-testid^="row-"]\').length > 0', null, { timeout: 30000 });
    await page.waitForTimeout(400);   // settle: persisted-state hydration + first virtualizer pass
    const domRows = await page.evaluate(() => document.querySelectorAll('[data-testid^="row-"]').length);
    const totalCount = await page.evaluate(() => Number(document.querySelector('[data-testid="b2-count"]')?.textContent.match(/^([\d,]+)/)?.[1]?.replace(/,/g, '') ?? 0));
    out.assertions.domRowsAtRest = domRows;
    out.assertions.totalPoolRows = totalCount;
    out.assertions.virtualized = domRows < totalCount / 4;

    // scroll reachability: walk the viewport to the bottom collecting row ids
    const seen = await page.evaluate(async () => {
      const vp = document.querySelector('[data-testid="b2-viewport"]');
      const ids = new Set();
      let last = -1;
      for (let guard = 0; guard < 400; guard++) {
        vp.querySelectorAll('[data-testid^="row-"]').forEach((el) => ids.add(el.getAttribute('data-player-id') || el.getAttribute('data-testid')));
        vp.scrollBy(0, vp.clientHeight - 20);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        if (vp.scrollTop === last) break;
        last = vp.scrollTop;
      }
      return ids.size;
    });
    out.assertions.distinctRowsSeenByScrolling = seen;
    out.assertions.allReachable = seen === totalCount;

    // sort correctness: ovr desc on the first visible window (scroll back to top first — the
    // reachability walk left the viewport at the list bottom, which is the descending tail)
    await page.evaluate(() => { const vp = document.querySelector('[data-testid="b2-viewport"]'); if (vp) vp.scrollTop = 0; });
    await page.waitForTimeout(300);
    const firstOvrs = await page.evaluate(() => [...document.querySelectorAll('.b2-ovrcell')].slice(0, 12).map((el) => Number(el.textContent)));
    out.assertions.sortOvrDescFirst12 = firstOvrs;
    out.assertions.sortOvrIsDescending = firstOvrs.every((v, i) => i === 0 || firstOvrs[i - 1] >= v);
    await page.locator('[data-testid="b2-sort-name"]').click();
    await page.waitForTimeout(120);
    const firstNames = await page.evaluate(() => [...document.querySelectorAll('.b2-name')].slice(0, 6).map((el) => el.textContent));
    out.assertions.sortNameFirst6 = firstNames;
    await page.locator('[data-testid="b2-sort-ovr"]').click();

    // filter correctness: pos filter from the engine's own vocabulary + team filter
    const pos0 = await page.evaluate(() => document.querySelector('.b2-bub')?.textContent.replace(/[^A-Z]/g, '') ?? '');
    await page.locator('[data-testid="b2-pos"]').selectOption(pos0);
    await page.waitForTimeout(80);
    const posOk = await page.evaluate((p0) => [...document.querySelectorAll('.b2-bub')].every((el) => el.textContent.replace(/[^A-Z]/g, '') === p0), pos0);
    out.assertions.posFilterValue = pos0;
    out.assertions.posFilterAllRowsMatch = posOk;
    await page.locator('[data-testid="b2-pos"]').selectOption('ALL');
    await page.locator('[data-testid="b2-team"]').selectOption('Denver Broncos');
    await page.waitForTimeout(80);
    const teamOk = await page.evaluate(() => [...document.querySelectorAll('.b2-team')].every((el) => el.textContent === 'Denver Broncos'));
    out.assertions.teamFilterAllRowsMatch = teamOk;
    await page.locator('[data-testid="b2-team"]').selectOption('ALL');

    // debounced search: type, then assert the count does NOT change within 100ms, DOES after 400ms
    const before = await page.evaluate(() => Number(document.querySelector('[data-testid="b2-count"]')?.textContent.match(/^([\d,]+)/)?.[1]?.replace(/,/g, '') ?? 0));
    await page.locator('[data-testid="b2-search"]').fill('son');
    await page.waitForTimeout(100);
    const during = await page.evaluate(() => Number(document.querySelector('[data-testid="b2-count"]')?.textContent.match(/^([\d,]+)/)?.[1]?.replace(/,/g, '') ?? 0));
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => Number(document.querySelector('[data-testid="b2-count"]')?.textContent.match(/^([\d,]+)/)?.[1]?.replace(/,/g, '') ?? 0));
    out.assertions.debouncedSearch = { before, during, after, debounced: during === before && after !== before && after < before };
    await page.locator('[data-testid="b2-search"]').fill('');

    // persistence: sort=spd + scroll deep + reload → restored
    await page.locator('[data-testid="b2-sort-spd"]').click();
    await page.waitForTimeout(100);
    await page.evaluate(() => { const vp = document.querySelector('[data-testid="b2-viewport"]'); vp.scrollTop = vp.scrollHeight * 0.4; });
    await page.waitForTimeout(120);
    const preReload = await page.evaluate(() => ({ sort: document.querySelector('[data-testid="b2-sort-spd"]')?.className.includes('on'), scrollTop: document.querySelector('[data-testid="b2-viewport"]').scrollTop }));
    await page.reload();
    await page.waitForFunction('document.querySelectorAll(\'[data-testid^="row-"]\').length > 0', null, { timeout: 30000 });
    await page.waitForTimeout(400);
    const postReload = await page.evaluate(() => ({ sort: document.querySelector('[data-testid="b2-sort-spd"]')?.className.includes('on'), scrollTop: document.querySelector('[data-testid="b2-viewport"]').scrollTop }));
    out.assertions.persistence = { preReload, postReload, sortRestored: postReload.sort === true, scrollRestored: Math.abs((postReload.scrollTop ?? 0) - (preReload.scrollTop ?? 0)) < 400 };

    // perf: scroll p95 + long tasks + heap
    const longTasks = await page.evaluate(() => { window.__lt = 0; const po = new PerformanceObserver((l) => { window.__lt += l.getEntries().length; }); po.observe({ entryTypes: ['longtask'] }); return true; });
    const scrolls = [];
    for (let i = 0; i < 14; i++) {
      const dir = (i % 2) ? 1 : -1;
      const t0 = await page.evaluate((d) => { const vp = document.querySelector('[data-testid="b2-viewport"]'); const t = performance.now(); vp.scrollBy(0, vp.clientHeight * d); return t; }, dir);
      const t1 = await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(performance.now())))));
      scrolls.push(+(t1 - t0).toFixed(2));
    }
    out.perf.scrollP95ms = +p95(scrolls).toFixed(2);
    out.perf.scrollMedianMs = +med(scrolls).toFixed(2);
    out.perf.longTasksDuringScroll = await page.evaluate(() => window.__lt ?? 0);
    out.perf.heapMB = await page.evaluate(() => performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null);
    out.perf.domNodesAtRest = await page.evaluate(() => document.querySelectorAll('*').length);
    await page.screenshot({ path: path.join(SHOTS, `board2-${arm.label}-1280.png`), fullPage: false });
    await ctx.close();
  })();

  // --- 390 pass: no horizontal scroll + shot ---
  await (async () => {
    const profile = path.join(os.tmpdir(), `bench2-d-${arm.label}-m`);
    fs.rmSync(profile, { recursive: true, force: true });
    const ctx = await chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 390, height: 844 } });
    const page = ctx.pages()[0] ?? (await ctx.newPage());
    await page.goto(origin);
    await page.waitForFunction('document.querySelectorAll(\'[data-testid^="row-"]\').length > 0', null, { timeout: 30000 });
    out.perf.mobile390 = {
      horizontalScrollDelta: await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
      domRows: await page.evaluate(() => document.querySelectorAll('[data-testid^="row-"]').length),
      minTapTargetPx: await page.evaluate(() => Math.min(...[...document.querySelectorAll('.b2-controls button, .b2-controls select, .b2-controls input, .b2-star')].map((el) => Math.min(el.getBoundingClientRect().width, el.getBoundingClientRect().height)).filter((n) => n > 0))),
    };
    await page.screenshot({ path: path.join(SHOTS, `board2-${arm.label}-390.png`), fullPage: false });
    await ctx.close();
  })();

  server.close();

  // integration cost (files/LOC/deps)
  const loc = Number(execSync(`wc -l '${arm.src}' | awk '{print $1}'`).toString().trim());
  const pkg = JSON.parse(fs.readFileSync(arm.pkg, 'utf8'));
  out.integration = { armOwnedFiles: [path.basename(arm.src), 'main2.ts', 'library.html', 'board2.css', 'team-palette.json'], armOwnedLoc: loc, sharedCssLoc: Number(execSync("wc -l '/home/z/my-project/scratch/arm-vue/src-bench/library/board2.css' | awk '{print $1}'").toString().trim()), depsAdded: Object.entries(pkg.dependencies ?? {}).map(([k, v]) => `${k}@${v}`) };
  return out;
}

const results = [];
for (const arm of ARMS) results.push(await measureArm(arm));
fs.writeFileSync('/home/z/my-project/scratch/wave/phaseD.json', JSON.stringify(results, null, 2));
for (const r of results) console.log('===', r.arm, JSON.stringify({ assertions: r.assertions, perf: r.perf, integration: r.integration, errors: r.errors }, null, 1));
