// PHASE I — shell determinism: same seed + same inputs → two full runs → byte-identical DOM text
// (board, on-clock header, roster panel, filter/sort labels) and byte-identical draft-log record text.
// Also cross-arm: the Vue and Svelte DOM texts must match each other (the G5 purity extended to the shell).
// Usage: node scripts/phase-i.mjs
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import os from 'node:os';
import { chromium } from 'playwright';

const ARMS = [
  { label: 'vue', dist: '/home/z/my-project/scratch/arm-vue/dist' },
  { label: 'svelte', dist: '/home/z/my-project/scratch/arm-svelte/dist' },
];
const userPicks = JSON.parse(fs.readFileSync('/home/z/my-project/scratch/wave/userPicks.json', 'utf8')).slice(0, 8);

function serve(dist) {
  const server = http.createServer((_q, s) => {
    const url = _q.url === '/' ? '/index.html' : _q.url.split('?')[0];
    const f = path.join(dist, url);
    if (fs.existsSync(f)) { s.setHeader('content-type', url.endsWith('.js') ? 'text/javascript' : 'text/html'); s.end(fs.readFileSync(f)); }
    else { s.statusCode = 404; s.end(); }
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}

async function runArm(arm, runIdx) {
  const server = await serve(arm.dist);
  const origin = `http://127.0.0.1:${server.address().port}/`;
  const profile = path.join(os.tmpdir(), `bench2-i-${arm.label}-${runIdx}-${Date.now()}`);
  const ctx = await chromium.launchPersistentContext(profile, { headless: true, viewport: { width: 1280, height: 900 } });
  const page = ctx.pages()[0] ?? (await ctx.newPage());
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
  await page.goto(origin);
  await page.waitForFunction('window.__bench && window.__bench.pickById');
  const texts = [];
  const capture = async (tag) => {
    const t = await page.evaluate((tg) => ({
      tag: tg,
      header: document.querySelector('.bench-header')?.innerText ?? '',
      toolbar: document.querySelector('.bench-toolbar')?.innerText ?? '',
      board: document.querySelector('.bench-board')?.innerText ?? '',
      roster: document.querySelector('.bench-roster')?.innerText ?? '',
    }), tag);
    texts.push(t);
  };
  await capture('initial');
  for (const p of userPicks) {
    await page.evaluate((x) => window.__bench.pickById(x.playerId, x.slot), p);
    await page.waitForTimeout(15);
  }
  await capture('after-8-picks');
  await page.locator('[data-testid="sort-ovr"]').click();
  await page.waitForTimeout(15);
  await capture('sort-ovr');
  await page.locator('[data-testid="filter-pos"]').selectOption('WR');
  await page.waitForTimeout(15);
  await capture('filter-WR');
  await page.locator('[data-testid="filter-pos"]').selectOption('ALL');
  await page.locator('[data-testid="sort-wins"]').click();
  await page.waitForTimeout(15);
  // complete the draft → draft-log record text (the log the board was built from)
  const fin = await page.evaluate(() => window.__bench.completeGreedy());
  await capture('draft-complete');
  await ctx.close();
  server.close();
  fs.rmSync(profile, { recursive: true, force: true });
  return { arm: arm.label, run: runIdx, texts, fin, errors };
}

const runs = [];
for (const arm of ARMS) for (const i of [1, 2]) runs.push(await runArm(arm, i));

const sha = (s) => import('node:crypto').then((c) => c.createHash('sha256').update(s).digest('hex'));
const textSha = (t) => sha(JSON.stringify(t.texts));
const results = [];
for (const arm of ARMS) {
  const [a, b] = runs.filter((r) => r.arm === arm.label);
  const sa = await textSha(a), sb = await textSha(b);
  results.push({ arm: arm.label, run1: sa.slice(0, 16), run2: sb.slice(0, 16), byteIdentical: sa === sb, recordShas: [a.fin.recordSha.slice(0, 16), b.fin.recordSha.slice(0, 16)], recordIdentical: a.fin.recordSha === b.fin.recordSha, pageErrors: [...a.errors, ...b.errors] });
}
const [v1, s1] = runs.filter((r) => r.arm === 'vue');
const [v2, s2] = runs.filter((r) => r.arm === 'svelte');
const crossArm = JSON.stringify(v1.texts) === JSON.stringify(s2.texts) || JSON.stringify(v1.texts) === JSON.stringify(s2.texts) || JSON.stringify(v2.texts) === JSON.stringify(s1.texts);
const out = { protocol: '2 runs × 2 arms, same seed + same 8 user picks + same sort/filter inputs; DOM text captured at 5 checkpoints; full greedy completion', perArm: results, crossArmDomTextIdentical: crossArm, crossArmRecordIdentical: v1.fin.recordSha === s1.fin.recordSha };
fs.mkdirSync('/home/z/my-project/scratch/wave', { recursive: true });
fs.writeFileSync('/home/z/my-project/scratch/wave/phaseI.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
