// T3 — raw-curve witness export (colors engine, read-only).
// Exports, per slot, the raw (uncalibrated) 50->100 curve beside the calibrated weight, per build.
// Run: node --experimental-strip-types tools/mathlab/raw-curve-witness.mjs [--base=4-3] [--out=path]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const base = arg('base', '4-3');
const out = arg('out', '');
const root = path.resolve(process.cwd(), 'colors');
const src = (p) => import(pathToFileURL(path.join(root, 'src', p)).href);
const { slotWins, derivedWeights, WEIGHT_UNIT_WINS } = await src('engine/value.ts');
const { SLOT_IDS } = await src('engine/slots.ts');
const { WEIGHT } = await src('engine/slots.ts');

const witness = {};
for (const s of SLOT_IDS) {
  const curve = [];
  for (let o = 50; o <= 100; o++) curve.push({ ovr: o, rawWins: slotWins(s, o, base) });
  const span = curve[40].rawWins - curve[20].rawWins; // 90-70
  witness[s] = {
    slot: s,
    calibratedWeight: WEIGHT[s],
    derivedWeight: derivedWeights(base)[s],
    rawSpan70_90: span,
    rawPerOvr: span / 20,
    curve,
  };
}
const json = JSON.stringify({ base, generatedAt: new Date().toISOString(), witness }, null, 2);
if (out) { fs.writeFileSync(out, json); console.log('wrote', out); }
else console.log(json);
