#!/usr/bin/env node
/* make-build-receipts.mjs — Rev 10 A1/B: a receipt for EVERY VERIFY §2 command line, with the
 * node version in the header and stdout+exit code verbatim. A VERIFY line with no receipt is the
 * defect (Ernie A1); this ships the receipts. Run from the delivery root: node scripts/make-build-receipts.mjs
 * Writes receipts/build-*.txt. Slow (~2–6 min per arm; npm install must already be done). */
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const nodeV = process.version;
const header = (cmd, cwd) => `# receipt — Rev 10 (A1/B): every §2 line carries a receipt\n# command: ${cmd}\n# cwd (in-tree, relative): ${cwd}\n# node = ${nodeV}\n# captured by scripts/make-build-receipts.mjs\n\n`;

const JOBS = [
  { arm: 'vue', dir: 'football-sim-vue', cmd: 'npm run type-check', out: 'build-vue-typecheck-build.txt' },
  { arm: 'vue', dir: 'football-sim-vue', cmd: 'npm run build', out: 'build-vue-npm-run-build.txt' },
  { arm: 'svelte', dir: 'football-sim-svelte', cmd: 'npm run check', out: 'build-svelte-check.txt' },
  { arm: 'svelte', dir: 'football-sim-svelte', cmd: 'npm run build', out: 'build-svelte-npm-run-build.txt' },
  { arm: 'arm-vue', dir: 'REV-5.1-addendum/framework-two-arm/arm-vue', cmd: 'npx vue-tsc --build', out: 'build-armvue-vue-tsc-build.txt' },
  { arm: 'arm-svelte', dir: 'REV-5.1-addendum/framework-two-arm/arm-svelte', cmd: 'npx svelte-check --tsconfig ./tsconfig.json', out: 'build-armsvelte-svelte-check.txt' },
];

for (const j of JOBS) {
  const t0 = Date.now();
  const r = spawnSync(j.cmd, { shell: true, cwd: j.dir, encoding: 'utf8', timeout: 300000, maxBuffer: 64 * 1024 * 1024 });
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  const body = (r.stdout ?? '') + (r.stderr ?? '');
  const text = `${header(j.cmd, j.dir)}--- output (stdout + stderr, verbatim) ---\n${body}\n--- exit code: ${r.status === null ? 'SIGNAL ' + r.signal : r.status} (wall ${dt}s) ---\n`;
  writeFileSync(join('receipts', j.out), text);
  console.log(`${j.out}: exit ${r.status ?? 'signal ' + r.signal} (${dt}s, ${body.length}B of output)`);
}
console.log('done — receipts/build-*.txt written');
