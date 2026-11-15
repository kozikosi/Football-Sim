import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
const repo = process.argv[2], port = process.argv[3], label = process.argv[4];
const d = spawn('npm', ['run','dev','--','--port',port,'--strictPort','--host','127.0.0.1'], { cwd: repo, stdio:'ignore' });
await new Promise(r => setTimeout(r, 4000));
const b = await chromium.launch();
const p = await b.newPage();
await p.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });
const out = await p.evaluate(() => ({
  vueHook: typeof window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
  vueApp: typeof window.__VUE_APP__,
  pinia: typeof window.__pinia,
  simState: typeof window.__SIM_STATE__,
  svelteHook: typeof window.__SVELTE_DEVTOOLS__,
  customEls: Array.from(document.querySelectorAll('*')).filter(e => e.tagName.includes('-')).map(e => e.tagName).slice(0,5),
}));
console.log(label, JSON.stringify(out));
await b.close(); d.kill('SIGTERM'); process.exit(0);
