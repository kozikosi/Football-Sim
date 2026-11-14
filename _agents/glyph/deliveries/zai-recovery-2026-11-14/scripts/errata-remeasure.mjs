// ERRATA re-measure — mode: cold | gc | warm | receipts
//  - receipts: recompute the reissued budget-table data from the four tier1 receipt JSONs (no re-run of gates).
//  - cold: fresh process, 10 measured D-32R drafts, no warm-up (replicates run1 protocol).
//  - gc:   fresh process, global.gc() before EVERY draft, no warm-up (isolates GC as tail cause).
//  - warm: fresh process, 3 warm-up drafts, then 20 measured.
// Engine: arms' vendored engine (57 files, digest 4c3c8f17…, byte-identical to colors/src @ d3bd81d2 — proven by diff -rq).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const BENCH = '/home/z/my-project/scratch/bench1';
const ENGINE_ROOT = `${BENCH}/arms/arm-vue-pub/src-bench/engine`;
const DATA_DIR = '/home/z/my-project/scratch/errata/data';
const OUT_DIR = '/home/z/my-project/scratch/errata';

const mode = process.argv[2] ?? 'cold';
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const hr = () => process.hrtime.bigint();
const ms = (t0) => Number(hr() - t0) / 1e6;
const now = () => new Date().toISOString();

// ---------- receipts mode: recompute table from existing receipts ----------
if (mode === 'receipts') {
  const files = ['tier1-run1.json', 'tier1-run2.json', 'tier1-run3.json', 'tier1-smoke.json'];
  const out = { generatedAt: now(), engineVendorShaReceipt: null, rows: {}, recordBytesHistogram: {} };
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(`${BENCH}/receipts/${f}`, 'utf8'));
    out.engineVendorShaReceipt = j.engineVendorSha;
    const W1 = j.timings.W1;
    const d32 = Object.entries(j.timings).filter(([k]) => k.startsWith('D32R')).map(([k, v]) => v.fullDraftMs);
    const sorted = [...d32].sort((a, b) => a - b);
    const med = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
    const outliers = d32.filter((x) => x > 1000).sort((a, b) => b - a);
    for (const [k, v] of Object.entries(j.timings)) {
      if (k.startsWith('D32R') || k.startsWith('D5R')) out.recordBytesHistogram[v.recordBytes] = (out.recordBytesHistogram[v.recordBytes] ?? 0) + 1;
    }
    out.rows[f] = {
      W1_sumMs: +(W1.parseMs + W1.freezeMs).toFixed(2),
      W1_parseMs: +W1.parseMs.toFixed(2), W1_freezeMs: +W1.freezeMs.toFixed(2),
      D32R_n: d32.length, D32R_min: Math.min(...d32), D32R_median: +med.toFixed(2), D32R_max: Math.max(...d32),
      D32R_outliersOver1s: outliers,
      W4_seasonMs: j.timings.W4.seasonMs, W4_p95GameMs: j.timings.W4.p95GameMs,
      recordBytes: j.timings['D32R-s1-u0'].recordBytes,
      u31_recordBytes: j.timings['D32R-s1-u31']?.recordBytes ?? null,
    };
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(`${OUT_DIR}/errata-reissued-table.json`, JSON.stringify(out, null, 2));
  for (const [f, r] of Object.entries(out.rows)) console.log(f, JSON.stringify(r));
  console.log('recordBytes histogram:', JSON.stringify(out.recordBytesHistogram));
  process.exit(0);
}

// ---------- measurement modes ----------
const E = (p) => path.join(ENGINE_ROOT, 'sports/nfl', p);
const C = (p) => path.join(ENGINE_ROOT, 'core', p);
const { buildPool } = await import(path.join(ENGINE_ROOT, 'sports/nfl/engine/players.ts'));
const { makeRng } = await import(C('rng.ts'));
const { at } = await import(C('at.ts'));
const { DEFAULT_CONFIG, newDraft, runDraft, snakeOrder, cpuChoose, userChoose, applyPick } = await import(E('engine/draft.ts'));
const { freezePool } = await import(E('app/store.ts'));

const ratingsCsv = fs.readFileSync(path.join(DATA_DIR, 'nfl/madden27-ratings.csv'), 'utf8');
const faCsv = fs.readFileSync(path.join(DATA_DIR, 'nfl/free-agents-old-ratings.csv'), 'utf8');
const idsCsv = fs.readFileSync(path.join(DATA_DIR, 'nfl/player-ids.csv'), 'utf8');
const pool = buildPool(ratingsCsv, faCsv, idsCsv);
const poolRows = freezePool(pool);

const N = mode === 'warm' ? 20 : 10;
const WARM = mode === 'warm' ? 3 : 0;
const hasGC = typeof global.gc === 'function';

function draftOnce(seed, userTeam) {
  if (hasGC && mode === 'gc') global.gc();
  const order = snakeOrder(32, 32);
  const rng = makeRng(seed);
  const st = newDraft(pool, rng.fork('draft'), DEFAULT_CONFIG, order);
  const t0 = hr();
  runDraft(st, rng.fork('run'), { team: userTeam, policy: 'greedy' });
  const fullMs = ms(t0);
  const rec = { seed, userTeam, pool: poolRows, picks: st.log.map((k) => ({ overall: k.overall, team: k.team, pid: k.player.id, slot: k.slot })) };
  const recText = JSON.stringify(rec);
  return { fullMs, recSha: sha(recText), recBytes: recText.length, picks: st.log.length };
}

const t0 = now();
for (let i = 0; i < WARM; i++) draftOnce(1, 0);
const samples = [];
for (let i = 0; i < N; i++) samples.push(draftOnce(1, 0));
const sorted = samples.map((s) => s.fullMs).sort((a, b) => a - b);
const med = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
const out = {
  mode, startedAt: t0, finishedAt: now(), node: process.version, warmups: WARM, n: N,
  forcedGcBeforeEach: mode === 'gc' && hasGC,
  ms: samples.map((s) => +s.fullMs.toFixed(2)),
  min: +Math.min(...sorted).toFixed(2), median: +med.toFixed(2), max: +Math.max(...sorted).toFixed(2),
  tailsOver1s: samples.filter((s) => s.fullMs > 1000).map((s) => +s.fullMs.toFixed(2)).sort((a, b) => b - a),
  recBytes: samples[0].recBytes, recSha: samples[0].recSha, picks: samples[0].picks,
  heapMB: +((process.memoryUsage().heapUsed) / 1048576).toFixed(1),
};
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(`${OUT_DIR}/d32r-${mode}-${Date.now()}.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
