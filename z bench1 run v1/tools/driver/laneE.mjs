// Lane E — benchmarks of the benchmark: instrument parity across the hosts this project runs on.
// Probes: performance.now resolution, setTimeout(0) drift, setInterval drift, and (Chromium only)
// rAF pacing + the double-rAF wait the Tier-2 timing protocol depends on. jsdom: DOM rebuild cost
// vs Chromium for the 60-row board table (what a vitest-jsdom Tier-2 would pay per assertion).
// Usage: node tools/driver/laneE.mjs <outDir>   (needs: npm i jsdom in tools/driver — done by make-deps.sh)
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const OUT = process.argv[2] ?? '../../receipts';

function nodeProbes() {
  const res = {};
  // performance.now resolution: smallest nonzero delta over 200k pairs
  let minDelta = Infinity, zeros = 0;
  let t = performance.now();
  for (let i = 0; i < 200000; i++) { const t2 = performance.now(); const d = t2 - t; if (d === 0) zeros++; else if (d < minDelta) minDelta = d; t = t2; }
  res.perfNowMinDeltaMs = minDelta === Infinity ? 0 : +minDelta.toFixed(6);
  res.perfNowZeroRatio = +(zeros / 200000).toFixed(4);
  // setTimeout(0) drift: 1000 runs, median of (actual - expected)
  const drift = [];
  for (let i = 0; i < 1000; i++) {
    const a = performance.now();
    await new Promise((r) => setTimeout(r, 0));
    drift.push(performance.now() - a);
  }
  drift.sort((a, b) => a - b);
  res.setTimeout0medianMs = +drift[Math.floor(drift.length / 2)].toFixed(4);
  res.setTimeout0p95Ms = +drift[Math.floor(drift.length * 0.95)].toFixed(4);
  // setInterval(1) drift over 200 ticks
  const ticks = [];
  await new Promise((done) => { let n = 0, last = performance.now(); const id = setInterval(() => { const now = performance.now(); ticks.push(now - last); last = now; if (++n >= 200) { clearInterval(id); done(); } }, 1); });
  ticks.sort((a, b) => a - b);
  res.setInterval1medianMs = +ticks[Math.floor(ticks.length / 2)].toFixed(4);
  res.setInterval1p95Ms = +ticks[Math.floor(ticks.length * 0.95)].toFixed(4);
  return res;
}

async function chromiumProbes(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__bench && document.querySelectorAll('tr[data-testid="board-row"]').length > 0, null, { timeout: 30000 });
  const res = await page.evaluate(async () => {
    const out = {};
    let minDelta = Infinity, zeros = 0, t = performance.now();
    for (let i = 0; i < 200000; i++) { const t2 = performance.now(); const d = t2 - t; if (d === 0) zeros++; else if (d < minDelta) minDelta = d; t = t2; }
    out.perfNowMinDeltaMs = minDelta === Infinity ? 0 : +minDelta.toFixed(6);
    out.perfNowZeroRatio = +(zeros / 200000).toFixed(4);
    const drift = [];
    for (let i = 0; i < 1000; i++) { const a = performance.now(); await new Promise((r) => setTimeout(r, 0)); drift.push(performance.now() - a); }
    drift.sort((a, b) => a - b);
    out.setTimeout0medianMs = +drift[Math.floor(drift.length / 2)].toFixed(4);
    out.setTimeout0p95Ms = +drift[Math.floor(drift.length * 0.95)].toFixed(4);
    // rAF pacing: 300 consecutive frames
    const frames = [];
    await new Promise((done) => {
      let last = performance.now(), n = 0;
      const loop = (now) => { frames.push(now - last); last = now; if (++n >= 300) done(); else requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    });
    frames.sort((a, b) => a - b);
    out.rafMedianMs = +frames[Math.floor(frames.length / 2)].toFixed(3);
    out.rafP95Ms = +frames[Math.floor(frames.length * 0.95)].toFixed(3);
    out.rafMinMs = +frames[0].toFixed(3);
    // double-rAF wait cost (the Tier-2 protocol's paint wait)
    const dr = [];
    for (let i = 0; i < 200; i++) { const a = performance.now(); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); dr.push(performance.now() - a); }
    dr.sort((a, b) => a - b);
    out.doubleRafMedianMs = +dr[Math.floor(dr.length / 2)].toFixed(3);
    out.doubleRafP95Ms = +dr[Math.floor(dr.length * 0.95)].toFixed(3);
    // DOM rebuild cost: 60-row x 8-col table, 100 rebuilds (fresh table each time)
    const t0 = performance.now();
    for (let i = 0; i < 100; i++) {
      const tbl = document.createElement('table'), tb = document.createElement('tbody');
      for (let r2 = 0; r2 < 60; r2++) { const tr = document.createElement('tr'); for (let c = 0; c < 8; c++) { const td = document.createElement('td'); td.textContent = `cell ${r2}-${c}`; tr.appendChild(td); } tb.appendChild(tr); }
      tbl.appendChild(tb); tbl.remove();
    }
    out.domRebuild60x8x100Ms = +(performance.now() - t0).toFixed(2);
    return out;
  });
  await browser.close();
  return res;
}

async function jsdomProbes() {
  const { JSDOM } = await import('jsdom');
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  const res = {};
  const t0 = performance.now();
  const window = dom.window;
  for (let i = 0; i < 100; i++) {
    const tbl = window.document.createElement('table'), tb = window.document.createElement('tbody');
    for (let r2 = 0; r2 < 60; r2++) { const tr = window.document.createElement('tr'); for (let c = 0; c < 8; c++) { const td = window.document.createElement('td'); td.textContent = `cell ${r2}-${c}`; tr.appendChild(td); } tb.appendChild(tr); }
    tbl.appendChild(tb); window.document.body.appendChild(tbl); window.document.body.removeChild(tbl);
  }
  res.domRebuild60x8x100Ms = +(performance.now() - t0).toFixed(2);
  res.hasRaf = typeof window.requestAnimationFrame === 'function';
  return res;
}

const main = async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const results = { startedAt: new Date().toISOString(), env: { node: process.version, platform: os.platform(), cpu: os.cpus()[0]?.model, cores: os.cpus().length } };
  results.node = await nodeProbes();
  results.chromium = await chromiumProbes('http://localhost:5199/');
  try { results.jsdom = await jsdomProbes(); } catch (e) { results.jsdom = { error: e.message }; }
  results.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(OUT, 'laneE.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
};
main().catch((e) => { console.error('LANEE FATAL', e); process.exit(1); });
