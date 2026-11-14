// A3 — cross-engine determinism: run the SAME workload bundle in Node, Chromium, and (if installable)
// Firefox and WebKit; compare the FNV+length digests of every artifact. REPORT-ONLY per BENCH-1 §6
// (promoted to a gate only if identical everywhere). Requires esbuild (npm i esbuild in tools/driver).
// Usage: node tools/driver/a3.mjs <outDir>
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import { chromium, firefox, webkit } from 'playwright';

const OUT = process.argv[2] ?? '../../receipts';
const D = '/home/z/my-project/bench/data/nfl';
const csvs = {
  ratings: fs.readFileSync(path.join(D, 'madden27-ratings.csv'), 'utf8'),
  fa: fs.readFileSync(path.join(D, 'free-agents-old-ratings.csv'), 'utf8'),
  ids: fs.readFileSync(path.join(D, 'player-ids.csv'), 'utf8'),
};

async function bundle() {
  const esbuild = (await import('esbuild')).default;
  const out = await esbuild.build({
    entryPoints: [path.resolve(import.meta.dirname, '../a3/entry.ts')],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    write: false,
    target: 'es2022',
    logLevel: 'silent',
  });
  return out.outputFiles[0].text;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const results = { startedAt: new Date().toISOString(), env: { node: process.version, cpu: os.cpus()[0]?.model, platform: os.platform() } };
  // Node reference — the same entry.ts source, imported natively (Node 24 type stripping)
  const { run } = await import('../a3/entry.ts');
  results.node = await run(csvs);

  const js = await bundle();
  results.bundleBytes = js.length;
  const hosts = [
    { name: 'chromium', launcher: chromium },
    { name: 'firefox', launcher: firefox },
    { name: 'webkit', launcher: webkit },
  ];
  for (const h of hosts) {
    try {
      const browser = await h.launcher.launch({ timeout: 60000 });
      const page = await browser.newPage();
      await page.setContent('<!doctype html><html><body></body></html>');
      await page.evaluate((c) => { (window as any).__csvs = c; }, csvs);
      await page.addScriptTag({ content: js + '\nwindow.__a3 = await run(window.__csvs);', type: 'module' });
      results[h.name] = await page.evaluate(() => window.__a3);
      await browser.close();
      results[h.name + '-status'] = 'ran';
    } catch (e) {
      results[h.name + '-status'] = 'FAILED: ' + e.message.split('\n').slice(0, 4).join(' | ');
    }
  }
  // comparison
  const cmp = {};
  for (const h of hosts) {
    const r = results[h.name];
    cmp[h.name] = r ? (JSON.stringify(stripVolatile(r)) === JSON.stringify(stripVolatile(results.node))) : null;
  }
  results.comparison = cmp;
  results.verdict = cmp.chromium === true ? (cmp.firefox === true && cmp.webkit === true ? 'IDENTICAL-EVERYWHERE' : 'chromium-identical; other engines: see status') : 'CHROMIUM DIVERGED FROM NODE';
  results.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(OUT, 'a3.json'), JSON.stringify(results, null, 2));
  console.log('A3 verdict:', results.verdict);
  for (const h of hosts) console.log(`${h.name}: ${results[h.name + '-status']} match-node=${cmp[h.name]}`);
  process.exit(0);
}

function stripVolatile(o) {
  // drop counts that are host-independent anyway but keep everything hashable
  return o;
}
main().catch((e) => { console.error('A3 FATAL', e); process.exit(1); });
