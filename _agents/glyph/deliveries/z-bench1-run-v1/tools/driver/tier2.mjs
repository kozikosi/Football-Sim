// BENCH-1 Tier 2 — board interactions through the DOM contract, Chromium headless, arms interleaved.
// Reference: BENCH-1 §5 (double-rAF paint timing, 3 warmups + 20 measured per cell, A-B interleave,
// tie rule applied at analysis time, G5 string identity per interaction). Protocol choices logged in DESIGN-LOG.md:
//  - setup walks use __bench.selectBoard({sims:1}) to choose the greedy-top pick cheaply (walk is not measured);
//  - measured interactions are real DOM events; timing includes Playwright click protocol latency (equal for both arms);
//  - sort samples alternate wins<->ovr per sample to force a real re-render every time; filter alternates WR<->ALL;
//    select alternates rows 0<->5;
//  - the PICK curve walks all 32 user picks of one live draft (one timed real PICK per round) — that is UX-1
//    at every round 1..32 instead of a subset.
// Usage: node tools/driver/tier2.mjs <runLabel> <outDir>
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

const LABEL = process.argv[2] ?? 'run1';
const OUT = process.argv[3] ?? '../../receipts';
const ARMS = [
  { name: 'vue', dir: '../../arms/arm-vue-pub', port: 5199 },
  { name: 'svelte', dir: '../../arms/arm-svelte-pub', port: 5200 },
];
const WARMUP = 3, SAMPLES = 20;
const CELLS = [ { round: 1, team: 0 }, { round: 5, team: 0 }, { round: 16, team: 0 }, { round: 32, team: 0 }, { round: 16, team: 31 } ];
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');

const servers = [];
async function startServer(arm) {
  const t0 = process.hrtime.bigint();
  const child = spawn('npx', ['vite', '--port', String(arm.port), '--strictPort'], { cwd: path.resolve(import.meta.dirname, arm.dir), stdio: ['ignore', 'pipe', 'pipe'] });
  servers.push(child);
  let firstByteMs = null;
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('dev server timeout ' + arm.name)), 60000);
    const poll = async () => {
      try {
        const r = await fetch(`http://localhost:${arm.port}/`);
        if (r.ok) { clearTimeout(timer); firstByteMs = Number(process.hrtime.bigint() - t0) / 1e6; resolve(); return; }
      } catch {}
      setTimeout(poll, 150);
    };
    child.on('exit', (c) => { clearTimeout(timer); reject(new Error('vite exited early ' + arm.name + ' code ' + c)); });
    poll();
  });
  return { firstByteMs };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true });
  const results = { label: LABEL, startedAt: new Date().toISOString(), protocol: { warmup: WARMUP, samples: SAMPLES, cells: CELLS }, arms: {}, pickCurve: {}, g5: { failures: [], crossArmMismatches: 0, samples: 0 }, consoleErrors: [], notes: [] };

  const boots = {};
  for (const arm of ARMS) boots[arm.name] = await startServer(arm);
  results.armsBootMs = Object.fromEntries(ARMS.map((a) => [a.name, +boots[a.name].firstByteMs.toFixed(0)]));

  const browser = await chromium.launch();
  const ctxOpts = { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 };
  const pages = {};
  const consoleBuf = {};
  for (const arm of ARMS) {
    const ctx = await browser.newContext(ctxOpts);
    const page = await ctx.newPage();
    consoleBuf[arm.name] = [];
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') consoleBuf[arm.name].push(`[${new Date().toISOString()}] ${m.type()}: ${m.text()}`); });
    page.on('pageerror', (e) => consoleBuf[arm.name].push(`[${new Date().toISOString()}] pageerror: ${e.message}`));
    await page.goto(`http://localhost:${arm.port}/`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__bench && document.querySelectorAll('tr[data-testid="board-row"]').length > 0, null, { timeout: 30000 });
    pages[arm.name] = page;
    results.notes.push(`${arm.name}: board rendered on boot, rows=${await page.locator('tr[data-testid="board-row"]').count()}`);
  }

  const boardRowsText = (page) => page.evaluate(() => {
    const rows = [...document.querySelectorAll('tr[data-testid="board-row"]')].map((tr) => [...tr.children].map((td) => td.textContent.trim()));
    const footer = document.querySelector('[data-testid="roster-panel"] .bench-footer')?.textContent.trim() ?? '';
    return JSON.stringify([rows, footer]);
  });
  const expectedRowsText = (page, filter) => page.evaluate((filter) => {
    const b = window.__bench;
    const st = b.store.getState();
    const vm = st.status === 'drafting' ? b.selectBoard(st, { sort: window.__benchSort, limit: 60 }) : null;
    const rows = vm ? vm.rows.filter((r) => filter === 'ALL' || r.pos === filter).map((r) => [r.name, r.pos, r.nflTeam, r.ovr, r.slotLabel, r.wins, r.priority, r.gone]) : [];
    const roster = st.status === 'drafting' ? b.selectRoster(st) : null;
    return JSON.stringify([rows, roster ? `${roster.filled} of ${roster.total} starters filled` : '']);
  }, filter);

  // expose the driver's current sort inside the page for expected-text computation
  for (const arm of ARMS) await pages[arm.name].evaluate(() => { window.__benchSort = 'wins'; });

  const walkAndSnapshot = async (page, team, targets) => page.evaluate(async ({ team, targets }) => {
    const b = window.__bench;
    b.store.dispatch({ type: 'START', seed: 1, userTeam: team });
    const snaps = {};
    const reached = new Set();
    let guard = 0;
    while (guard++ < 1200) {
      const st = b.store.getState();
      if (st.status !== 'drafting') break;
      const round = Math.floor(st.draft.pos / 32) + 1;
      if (targets.includes(round) && !reached.has(round)) { snaps[round] = JSON.parse(JSON.stringify(st.record)); reached.add(round); if (reached.size === targets.length) break; }
      const vm = b.selectBoard(st, { sort: 'wins', limit: 1, sims: 1 });
      if (!vm || !vm.rows.length) break;
      b.store.dispatch({ type: 'PICK', playerId: vm.rows[0].id, slot: vm.rows[0].slotId });
    }
    return snaps;
  }, { team, targets });

  const loadSnapshot = async (page, record) => {
    await page.evaluate((rec) => { window.__bench.store.dispatch({ type: 'LOAD', record: rec }); }, record);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  };

  const interact = async (page, kind) => {
    const t0 = process.hrtime.bigint();
    if (kind === 'sort-wins' || kind === 'sort-ovr') await page.click(`[data-testid="${kind}"]`);
    else if (kind === 'filter-WR') await page.selectOption('[data-testid="filter-pos"]', 'WR');
    else if (kind === 'filter-ALL') await page.selectOption('[data-testid="filter-pos"]', 'ALL');
    else if (kind === 'select-0') await page.click('tr[data-testid="board-row"]:nth-of-type(1)');
    else if (kind === 'select-5') await page.click('tr[data-testid="board-row"]:nth-of-type(6)');
    else if (kind === 'pick') { /* pre-selected by caller */ await page.click('[data-testid="pick"]'); }
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const t1 = process.hrtime.bigint();
    return { ms: +(Number(t1 - t0) / 1e6).toFixed(3) };
  };

  // state per arm per cell: filter must end at ALL and sort back at wins after each block
  let snapR1U0 = null;
  for (const cell of CELLS) {
    const cellKey = `r${cell.round}-u${cell.team}`;
    results.arms[cellKey] = {};
    const snaps = {};
    for (const arm of ARMS) {
      snaps[arm.name] = (await walkAndSnapshot(pages[arm.name], cell.team, [cell.round]))[String(cell.round)];
      await loadSnapshot(pages[arm.name], snaps[arm.name]);
    }
  const blocks = [
      { name: 'sort', kinds: ['sort-ovr', 'sort-wins'], endState: { filter: 'ALL', sort: 'wins' } },
      { name: 'filter', kinds: ['filter-WR', 'filter-ALL'], endState: { filter: 'ALL' } },
      { name: 'select', kinds: ['select-0', 'select-5'], endState: null },
    ];
    for (const block of blocks) {
      for (const arm of ARMS) {
        const page = pages[arm.name];
        const samples = [];
        // warmups + samples; alternate kinds per iteration
        for (let i = 0; i < WARMUP + SAMPLES; i++) {
          const kind = block.kinds[i % block.kinds.length];
          if (block.name === 'filter') await page.evaluate((f) => { window.__benchFilter = f; }, kind === 'filter-WR' ? 'WR' : 'ALL');
          const r = await interact(page, kind);
          const filter = block.name === 'filter' ? (kind === 'filter-WR' ? 'WR' : 'ALL') : (await page.evaluate(() => window.__benchFilter ?? 'ALL'));
          if (block.name === 'sort') await page.evaluate((s) => { window.__benchSort = s; }, kind === 'sort-ovr' ? 'ovr' : 'wins');
          if (i >= WARMUP) {
            const domText = await boardRowsText(page);
            const expText = await expectedRowsText(page, filter);
            const ok = domText === expText;
            results.g5.samples++;
            if (!ok) results.g5.failures.push({ cell: cellKey, arm: arm.name, block: block.name, i });
            if (i >= WARMUP) samples.push({ i: i - WARMUP, kind, ms: r.ms, domSha: sha(domText), g5ok: ok });
          }
        }
        // restore default state for the next block
        await page.evaluate(() => { window.__benchSort = 'wins'; window.__benchFilter = 'ALL'; });
        await interact(page, 'sort-wins');
        await interact(page, 'filter-ALL');
        await page.click('tr[data-testid="board-row"]:nth-of-type(1)');
        await page.screenshot({ path: path.join(OUT, 'shots', `${LABEL}-${cellKey}-${arm.name}-${block.name}.png`) });
        if (!results.arms[cellKey][block.name]) results.arms[cellKey][block.name] = {};
        results.arms[cellKey][block.name][arm.name] = samples;
      }
    }
    if (cellKey === 'r1-u0') snapR1U0 = { ...snaps };
    results.notes.push(`cell ${cellKey} done`);
  }

  // ---- PICK curve: one timed real PICK per user pick, rounds 1..32, arms interleaved per round ----
  if (!snapR1U0) throw new Error('no r1-u0 snapshot captured for the pick curve');
  const recAgree = JSON.stringify(snapR1U0.vue) === JSON.stringify(snapR1U0.svelte);
  results.notes.push(`pick-curve snapshots vue==svelte: ${recAgree}`);
  for (const arm of ARMS) await loadSnapshot(pages[arm.name], snapR1U0[arm.name]);
  const pickCurve = { vue: [], svelte: [] };
  for (let round = 1; round <= 32; round++) {
    for (const arm of ARMS) {
      const page = pages[arm.name];
      const state0 = await page.evaluate(() => { const st = window.__bench.store.getState(); return { status: st.status, overall: st.draft ? st.draft.pos + 1 : null }; });
      if (state0.status !== 'drafting') { pickCurve[arm.name].push({ round, skipped: 'draft-done' }); continue; }
      await page.click('tr[data-testid="board-row"]:nth-of-type(1)');            // select top row (untimed)
      const t0 = process.hrtime.bigint();
      await page.click('[data-testid="pick"]');
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const t1 = process.hrtime.bigint();
      const after = await page.evaluate(() => { const st = window.__bench.store.getState(); return { status: st.status, overall: st.draft ? st.draft.pos + 1 : null, err: st.error }; });
      pickCurve[arm.name].push({ round, pickOverall: state0.overall, ms: +(Number(t1 - t0) / 1e6).toFixed(3), statusAfter: after.status, error: after.err });
      if (after.err) results.consoleErrors.push(`pick error at round ${round} ${arm.name}: ${after.err}`);
    }
    if (round % 8 === 0) results.notes.push(`pick curve round ${round}/32`);
  }
  results.pickCurve = pickCurve;

  results.consoleErrorsAll = consoleBuf;
  results.env = { node: process.version, chromium: browser.version(), platform: `${os.platform()} ${os.release()}`, cpuModel: os.cpus()[0]?.model, cores: os.cpus().length, finishedAt: new Date().toISOString() };
  results.ok = results.g5.failures.length === 0 && ARMS.every((a) => consoleBuf[a.name].filter((x) => x.includes('error')).length === 0);

  fs.writeFileSync(path.join(OUT, `tier2-${LABEL}.json`), JSON.stringify(results, null, 2));
  const log = [];
  log.push(`TIER2 ${LABEL} ok=${results.ok} g5samples=${results.g5.samples} g5failures=${results.g5.failures.length}`);
  for (const [cell, blocks] of Object.entries(results.arms)) {
    for (const [block, byArm] of Object.entries(blocks)) {
      for (const [arm, samples] of Object.entries(byArm)) {
        const xs = samples.map((s) => s.ms).sort((a, b) => a - b);
        log.push(`CELL ${cell} ${block} ${arm}: n=${xs.length} p50=${xs[Math.floor(xs.length / 2)]?.toFixed(1)} p95=${xs[Math.max(0, Math.ceil(xs.length * 0.95) - 1)]?.toFixed(1)}`);
      }
    }
  }
  for (const arm of ARMS) {
    const xs = pickCurve[arm.name].filter((s) => s.ms).map((s) => s.ms).sort((a, b) => a - b);
    log.push(`PICKCURVE ${arm}: n=${xs.length} p50=${xs[Math.floor(xs.length / 2)]?.toFixed(1)} p95=${xs[Math.max(0, Math.ceil(xs.length * 0.95) - 1)]?.toFixed(1)} max=${xs[xs.length - 1]?.toFixed(1)}`);
  }
  fs.writeFileSync(path.join(OUT, `tier2-${LABEL}.log`), log.join('\n') + '\n');
  console.log(log.join('\n'));
  await browser.close();
  for (const s of servers) s.kill('SIGTERM');
  process.exit(0);
}

// the round-1 team-0 snapshot for the pick curve (re-walked cheaply)

main().catch(async (e) => {
  console.error('TIER2 FATAL', e);
  for (const s of servers) s.kill('SIGTERM');
  process.exit(1);
});
