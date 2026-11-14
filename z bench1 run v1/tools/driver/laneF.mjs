// Lane F — the state-size tax: JS heap and DOM-node cost of a live draft at round 1 vs round 32, per arm.
// Chromium-only (performance.memory), walks via the cheap __bench path (sims:1) so only the walk is measured.
// Usage: node tools/driver/laneF.mjs <outDir>
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const OUT = process.argv[2] ?? '../../receipts';
const ARMS = [
  { name: 'vue', dir: '../../arms/arm-vue-pub', port: 5199 },
  { name: 'svelte', dir: '../../arms/arm-svelte-pub', port: 5200 },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const results = { startedAt: new Date().toISOString(), env: { node: process.version, cpu: os.cpus()[0]?.model } };
  const servers = [];
  for (const arm of ARMS) {
    const child = spawn('npx', ['vite', '--port', String(arm.port), '--strictPort'], { cwd: path.resolve(import.meta.dirname, arm.dir), stdio: 'ignore' });
    servers.push(child);
    const started = Date.now();
    while (Date.now() - started < 60000) { try { const r = await fetch(`http://localhost:${arm.port}/`); if (r.ok) break; } catch {} await new Promise((r) => setTimeout(r, 100)); }
  }
  await new Promise((r) => setTimeout(r, 1000));
  const browser = await chromium.launch();
  for (const arm of ARMS) {
    const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
    await page.goto(`http://localhost:${arm.port}/`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__bench, null, { timeout: 30000 });
    const probe = async (tag) => {
      const mem = await page.evaluate(() => {
        const m = performance.memory ?? {};
        return { heapMB: m.usedJSHeapSize ? +(m.usedJSHeapSize / 1048576).toFixed(1) : null, domNodes: document.getElementsByTagName('*').length, rows: document.querySelectorAll('tr[data-testid="board-row"]').length };
      });
      results[`${arm.name}-${tag}`] = mem;
    };
    await new Promise((r) => setTimeout(r, 3000));
    await probe('r1');
    await page.evaluate(async () => {
      const b = window.__bench;
      let guard = 0;
      while (guard++ < 1100) {
        const st = b.store.getState();
        if (st.status !== 'drafting') break;
        const vm = b.selectBoard(st, { sort: 'wins', limit: 1, sims: 1 });
        if (!vm || !vm.rows.length) break;
        b.store.dispatch({ type: 'PICK', playerId: vm.rows[0].id, slot: vm.rows[0].slotId });
      }
    });
    await new Promise((r) => setTimeout(r, 2000));
    await probe('r32done');
    await page.context().close();
  }
  await browser.close();
  for (const s of servers) s.kill('SIGKILL');
  results.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(OUT, 'laneF.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}
main().catch((e) => { console.error('LANEF FATAL', e); process.exit(1); });
