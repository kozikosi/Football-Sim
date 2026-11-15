// SAVE-1 write median — the one held row Z.ai owns (ernie v2 §5).
// Measures the draft save-record serialize + a Map-backed storage write, node-side, on the pin.
// Run: node --experimental-strip-types scripts/save1-write-median.mjs
import { createStore } from '/home/z/my-project/work/s4/src/engine/sports/nfl/app/store.ts';
import { serialize } from '/home/z/my-project/work/s4/src/engine/sports/nfl/app/saves.ts';
import { buildPool } from '/home/z/my-project/work/s4/src/engine/sports/nfl/engine/players.ts';
import { readFileSync } from 'node:fs';

const D = '/home/z/my-project/work/s4/src/data/';
const players = buildPool(
  readFileSync(D + 'madden27-ratings.csv', 'utf8'),
  readFileSync(D + 'free-agents-old-ratings.csv', 'utf8'),
  readFileSync(D + 'player-ids.csv', 'utf8'));

const SEED = 424242, TEAM = 6;
const store = createStore(players);
store.dispatch({ type: 'START', seed: SEED, userTeam: TEAM });
const st = store.getState();
if (!st.record) throw new Error('no record after START: ' + st.error);
const rec = st.record;

const meta = {
  engineVersion: 'cakepanz-pin-4ca9a071-bench',
  dataVersion: 'sha256:bench-no-dataset-hash',
  saveId: 'bench-save-1-write-median',
  saveRevision: 1 + rec.picks.length,      // the envelope's own law: rev = 1 + league log
  createdAt: new Date().toISOString(),
};

// the exact UI write path (savesApp.saveDraftSlot): serialize -> storage.write
const map = new Map();
const storage = { async write(k, v) { map.set(k, v); return { ok: true }; } };

const N = 201;
// warmup
for (let i = 0; i < 10; i++) serialize('draft', 'A', meta, rec, new Date());
const tSer = [], tFull = [];
for (let i = 0; i < N; i++) {
  let t0 = performance.now();
  const text = serialize('draft', 'A', meta, rec, new Date());
  let t1 = performance.now();
  await storage.write('sim:nfl:slot:A', text);
  let t2 = performance.now();
  tSer.push(t1 - t0); tFull.push(t2 - t0);
  if (i === 0) var text0 = text;
}
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[(s.length - 1) >> 1]; };
const p95 = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor((s.length - 1) * 0.95)]; };
const avg = (a) => a.reduce((x, y) => x + y, 0) / a.length;

console.log('== SAVE-1 write median (the held row) ==');
console.log('env: node', process.version, '· engine pin 4ca9a071 · save path savesApp.saveDraftSlot composition');
console.log('record: seed', SEED, '· userTeam', TEAM, '· picks in log', rec.picks.length, '(CPU advanced to the user\'s first turn by START)');
console.log(`serialize median ${med(tSer).toFixed(3)} ms · p95 ${p95(tSer).toFixed(3)} ms · mean ${avg(tSer).toFixed(3)} ms · n=${N}`);
console.log(`serialize+write(Map) median ${med(tFull).toFixed(3)} ms · p95 ${p95(tFull).toFixed(3)} ms · mean ${avg(tFull).toFixed(3)} ms · n=${N}`);
console.log('envelope size:', text0.length, 'chars (', Buffer.byteLength(text0, 'utf8'), 'bytes UTF-8 )');
console.log('label: node-side Map storage — no browser localStorage/DOM in the loop (stated, not hidden)');
