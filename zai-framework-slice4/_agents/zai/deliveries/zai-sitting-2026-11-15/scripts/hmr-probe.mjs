// HMR round-trip: boot `vite` dev server per arm, open the page, edit one visible line, time
// until the DOM shows the change. Also record whether the vite error overlay appears on a
// deliberate syntax error. Server is killed and the file reverted (sha-verified) afterwards.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const _req = createRequire(import.meta.url);
let pw; try { pw = _req('playwright'); } catch { pw = _req(process.env.HOME + '/.npm-global/lib/node_modules/playwright'); }

const BASE = '/home/z/my-project/sitting/_agents/glyph/deliveries/zai-sitting-2026-11-15/framework-two-arm';
const ARMS = [
  { name: 'svelte', dir: `${BASE}/arm-svelte`, port: 5199, file: 'src/App.svelte', marker: 'engine-true in both arms' },
  { name: 'vue', dir: `${BASE}/arm-vue`, port: 5189, file: 'src/App.vue', marker: 'engine-true in both arms' },
];
const FLAGS = ['--no-sandbox', '--allow-file-access-from-files'];
const out = {};

for (const arm of ARMS) {
  const path = `${arm.dir}/${arm.file}`;
  const sha0 = (await import('node:crypto')).createHash('sha256').update(readFileSync(path)).digest('hex');
  const server = spawn('npm', ['run', 'dev', '--', '--port', String(arm.port), '--strictPort'], { cwd: arm.dir, stdio: 'pipe' });
  let ready = '';
  server.stdout.on('data', (d) => { ready += d; });
  await new Promise((res) => {
    const t0 = Date.now();
    const iv = setInterval(() => { if (ready.includes('Local:')) { clearInterval(iv); res(); } else if (Date.now() - t0 > 30000) { clearInterval(iv); res(); } }, 100);
  });
  const bootMs = ready.match(/ready in (\d+) ms/)?.[1] ?? null;

  const browser = await pw.chromium.launch({ args: FLAGS });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${arm.port}/`);
  await page.waitForSelector('.cp-teambtn', { timeout: 20000 });
  const original = readFileSync(path, 'utf8');
  const t0 = Date.now();
  writeFileSync(path, original.replace(arm.marker, 'HMR-ROUNDTRIP-MARKER in both arms'));
  await page.waitForFunction(() => document.body.textContent.includes('HMR-ROUNDTRIP-MARKER'), null, { timeout: 20000 });
  const hmrMs = Date.now() - t0;

  // error overlay: introduce a syntax error, look for vite's overlay element
  writeFileSync(path, original.replace(arm.marker, arm.file.endsWith('.svelte') ? '<div>HMR-ROUNDTRIP-MARKER in both arms' : 'HMR-ROUNDTRIP-MARKER <div> in both arms'));
  await page.waitForTimeout(1200);
  const overlay = await page.evaluate(() => !!document.querySelector('vite-error-overlay'));
  writeFileSync(path, original);   // revert
  const sha1 = (await import('node:crypto')).createHash('sha256').update(readFileSync(path)).digest('hex');
  await browser.close();
  server.kill('SIGTERM');
  out[arm.name] = { devServerReadyMs: bootMs, hmrRoundTripMs: hmrMs, errorOverlayShown: overlay, reverted: sha0 === sha1 };
}
console.log(JSON.stringify(out, null, 1));
