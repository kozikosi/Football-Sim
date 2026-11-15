// Shared timing harness — byte-identical across both arms.
//   node scripts/timing.mjs <repoDir> <label>
// Measures: dev server start -> first 200, and HMR latency (visible word -> DOM).

import { spawn } from 'node:child_process';
import { writeFileSync, readFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';

const repo = process.argv[2];
const label = process.argv[3];
const port = Number(process.argv[4] || 5199);

const t0 = Date.now();
const dev = spawn('npm', ['run', 'dev', '--', '--port', String(port), '--strictPort', '--host', '127.0.0.1'], {
  cwd: repo,
  stdio: ['ignore', 'pipe', 'pipe'],
});
let first200 = null;
dev.stdout.on('data', async () => {
  if (first200 === null) {
    for (let i = 0; i < 60; i++) {
      try {
        const r = await fetch(`http://127.0.0.1:${port}/`);
        if (r.ok) { first200 = Date.now() - t0; break; }
      } catch {}
      await sleep(250);
    }
  }
});

await sleep(1500);
for (let i = 0; i < 40 && first200 === null; i++) {
  try { const r = await fetch(`http://127.0.0.1:${port}/`); if (r.ok) { first200 = Date.now() - t0; break; } } catch {}
  await sleep(250);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });
const before = await page.locator('[data-testid="score"]').first().textContent();

const target = process.argv[5];
const src = readFileSync(target, 'utf8');
const needle = 'Cardboard Ringers';
const repl = 'Cardboard Ringers' + ' ';
const patched = src.replace(needle, repl + 'X').replace(needle, repl + 'Y');
writeFileSync(target, patched.replace(/Ringers X/g, 'Ringers'));

// HMR: touch the file and poll the DOM for a change to a sentinel we inject
const sentinel = 'HMRMARK' + Date.now();
writeFileSync(target, src.replace('<h2>Cardboard Ringers</h2>', `<h2>${sentinel}</h2>`));
const h0 = Date.now();
let hmrMs = null;
for (let i = 0; i < 400; i++) {
  const txt = await page.locator('h2').first().textContent().catch(() => '');
  if (txt && txt.includes(sentinel)) { hmrMs = Date.now() - h0; break; }
  await sleep(25);
}
writeFileSync(target, src);

console.log(`arm=${label} dev_first_200_ms=${first200} hmr_ms=${hmrMs}`);
await browser.close();
dev.kill('SIGTERM');
process.exit(0);