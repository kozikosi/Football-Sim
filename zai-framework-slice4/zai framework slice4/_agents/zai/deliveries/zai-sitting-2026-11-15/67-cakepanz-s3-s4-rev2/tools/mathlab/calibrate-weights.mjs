// Fits the engine's spec coefficients so the MEASURED spot weights (derivedWeights, slotWinsPerOvr) land on the Owner's
// salary-based weights (tools/mathlab/salary-reference.json, Owner ruling 6 Nov 2026).
// Method: one multiplier per spot, applied to every spec entry of that spot (RATING_SPECS, DEF_SPECS, PERS_REC, RB_HEAVY),
// fixed-point iteration m *= (target / measured)^0.8. K and P are not spec rows: K is MC.kick, P is PUNT_PTS (both linear).
// Run: node --experimental-strip-types tools/mathlab/calibrate-weights.mjs [--cap=lo,hi] [--round]
// Prints the multipliers, the rounded coefficient tables (paste into specs.ts) and the measurement after rounding.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const eng = join(here, '../../colors/src/sports/nfl/engine');
const { DEF_SPECS, PERS_REC, RATING_SPECS, RB_HEAVY } = await import(join(eng, 'specs.ts'));
const { derivedWeights } = await import(join(eng, 'value.ts'));
const ref = JSON.parse(readFileSync(join(here, 'salary-reference.json'), 'utf8')).slots;
const T = Object.fromEntries(Object.entries(ref).map(([k, v]) => [k, v.weight]));

const groups = { RATING_SPECS, DEF_SPECS, PERS_REC };
const objs = []; // [name, object]
for (const [gn, g] of Object.entries(groups)) for (const [sn, o] of Object.entries(g)) objs.push([`${gn}.${sn}`, o]);
objs.push(['RB_HEAVY', RB_HEAVY]);
const orig = objs.map(([n, o]) => [n, o, { ...o }]);
const capArg = process.argv.find((a) => a.startsWith('--cap='));
const [LO, HI] = capArg ? capArg.slice(6).split(',').map(Number) : [0.2, 4];
const SKIP = new Set(['QB', 'K', 'P']);
const m = Object.fromEntries(Object.keys(T).map((s) => [s, 1]));
const apply = (round) => { for (const [, o, base] of orig) for (const k of Object.keys(o)) { const v = base[k] * (m[k] ?? 1); o[k] = round ? Math.round(v * 1000) / 1000 : v; } };
const measure = () => derivedWeights('4-3');

for (let it = 0; it < 60; it++) {
  apply(false);
  const d = measure();
  let worst = 0;
  for (const s of Object.keys(T)) {
    if (SKIP.has(s)) continue;
    const r = T[s] / d[s];
    worst = Math.max(worst, Math.abs(r - 1));
    m[s] = Math.min(HI, Math.max(LO, m[s] * Math.pow(r, 0.8)));
  }
  if (worst < 0.003) break;
}
apply(process.argv.includes('--round'));
const d = measure();
console.log('slot   target measured  dev   mult');
let maxDev = 0;
for (const s of Object.keys(T)) {
  const dev = d[s] - T[s]; maxDev = Math.max(maxDev, Math.abs(dev));
  console.log(`${s.padEnd(5)} ${String(T[s]).padStart(6)} ${d[s].toFixed(1).padStart(8)} ${dev.toFixed(1).padStart(6)} ${m[s].toFixed(3).padStart(6)}`);
}
console.log('max |dev| =', maxDev.toFixed(1));
const fmt = (o) => '{ ' + Object.entries(o).map(([k, v]) => `${k}: ${v}`).join(', ') + ' }';
for (const [n, o] of objs) console.log(`${n}: ${fmt(Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Math.round(v * 1000) / 1000])))}`);

if (process.argv.includes('--write')) {
  const f = join(eng, 'specs.ts');
  let src = readFileSync(f, 'utf8');
  const rep = (re, obj) => { if (!re.test(src)) throw new Error('no match ' + re); src = src.replace(re, (_m, a, b) => a + fmt(Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, Math.round(v * 1000) / 1000]))) + b); };
  for (const [n, o] of objs) {
    if (n === 'RB_HEAVY') { rep(/(export const RB_HEAVY: Spec = )\{[^}]*\}(;)/, o); continue; }
    const [g, key] = n.split('.');
    const k = g === 'PERS_REC' ? `'${key}'` : key;
    const start = src.indexOf(`export const ${g} =`);
    const rest = src.slice(start);
    const re = new RegExp(`(\\n  ${k}: )\\{[^}]*\\}(,)`);
    const m = re.exec(rest); if (!m) throw new Error('no row ' + n);
    src = src.slice(0, start) + rest.replace(re, (_m, a, b) => a + fmt(Object.fromEntries(Object.entries(o).map(([kk, v]) => [kk, Math.round(v * 1000) / 1000]))) + b);
  }
  writeFileSync(f, src);
  console.log('wrote', f);
}
