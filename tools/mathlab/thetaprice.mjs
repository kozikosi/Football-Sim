// mathlab/thetaprice.mjs — P-309 theta pricing on the Colors engine. READ-ONLY.  R-005 part 3 (Z.ai): P(a>b, ovr) = clamp(round2(theta * ovrEq(a>b, ovr)), 0, 30).
// Two definitions of ovrEq side by side, for every rule in flex.json:
//  W  "wins lost" (the council's working definition): ovrEq = winsLost / slope[dest], winsLost = max(0, slotWins(natural,ovr) - slotWins(dest,ovr)), slope = slotWins20/20.
//  D  "displacement" (Architect's candidate): a star of rating X moves a->b, displacing the incumbent at b (rating Y) and leaving a replacement at home (rating Y).
//     He flexes iff slope_b*(X-P-Y) > slope_a*(X-Y). Smallest penalty that keeps him natural: ovrEq = max(0, (X-Y) - (slope_a/slope_b)*(X-Y)) = (X-Y)*(1 - slope_a/slope_b).
//     This is the deterrent the Owner's table is for; W cannot be (it is 0 whenever the destination is the heavier spot).
// Run from colors/:  node --experimental-strip-types ../tools/mathlab/thetaprice.mjs [--y=70] [--out=../tools/mathlab/results/thetaprice-2026-11-09.md]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const root = path.resolve(process.cwd());
const src = (p) => import(pathToFileURL(path.join(root, 'src', p)).href);
const { slotWins, slotWins20 } = await src('sports/nfl/engine/value.ts');
const { SLOTS } = await src('sports/nfl/engine/slots.ts');
const flex = JSON.parse(fs.readFileSync(path.join(root, '..', 'tools', 'mathlab', 'flex.json'), 'utf8')).flex;
const Y = +arg('y', '70'), OVRS = [85, 90], THETAS = [0.5, 0.75, 1.0];
const r2 = (x) => Math.round(x * 100) / 100, clamp = (x) => Math.min(30, Math.max(0, x));
const slope = (id) => slotWins20(id) / 20;
const bestSlot = (dest) => { const s = SLOTS.filter((x) => x.dest === dest); return s.length ? s.reduce((b, x) => (slope(x.id) > slope(b.id) ? x : b)) : null; };
const rows = [];
for (const [a, row] of Object.entries(flex)) for (const [b, cur] of Object.entries(row)) {
  const na = bestSlot(a), nb = bestSlot(b); if (!na || !nb) continue;
  const o = { rule: `${a}>${b}`, cur, natural: na.id, dest: nb.id, slopeA: slope(na.id), slopeB: slope(nb.id) };
  for (const X of OVRS) {
    const lost = Math.max(0, slotWins(na.id, X) - slotWins(nb.id, X));
    o[`W${X}`] = lost / o.slopeB;
    o[`D${X}`] = Math.max(0, (X - Y) * (1 - o.slopeA / o.slopeB));
  }
  rows.push(o);
}
const f = (x) => String(r2(x));
const lines = [`# thetaprice (P-309) on the Colors engine, Y = ${Y}; ovrEq W = wins lost / slope[dest]; ovrEq D = (X-Y)(1 - slopeA/slopeB). P = clamp(round2(theta*ovrEq),0,30)`,
  `| rule | now | W@85 | W@90 | D@85 | D@90 | P(D,@90,theta .75) | now vs D@90 theta 1 |`, '|---|---|---|---|---|---|---|---|'];
let under = 0, over = 0, wZero = 0;
for (const o of rows.sort((x, y) => y.D90 - x.D90)) {
  const d1 = clamp(r2(1 * o.D90)); const status = o.cur < d1 - 0.5 ? 'UNDER' : o.cur > d1 + 6 && d1 > 0 ? 'over' : 'ok';
  if (status === 'UNDER') under++; if (o.W90 === 0) wZero++;
  lines.push(`| ${o.rule} | ${o.cur} | ${f(o.W85)} | ${f(o.W90)} | ${f(o.D85)} | ${f(o.D90)} | ${f(clamp(r2(0.75 * o.D90)))} | ${status} (${d1}) |`);
}
lines.push('', `rules ${rows.length}; W prices 0 for ${wZero}; D@90 theta 1 says the table UNDER-prices ${under}.`);
const four = ['RB>WR', 'TE>EDGE', 'TE>OT', 'DT>EDGE'];
lines.push('', 'The four proposed rules (now 12): ' + rows.filter((o) => four.includes(o.rule)).map((o) => `${o.rule} W@90 ${f(o.W90)} D@90 ${f(o.D90)}`).join(' | '));
console.log(lines.join('\n'));
const out = arg('out', ''); if (out) fs.writeFileSync(out, lines.join('\n') + '\n');
