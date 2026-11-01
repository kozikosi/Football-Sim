#!/usr/bin/env node
// w52_packbg_probe.js — Z.ai lane, 2026-11-01
// Measures what changes in zpbPackFor if the pack's reference backgrounds follow the page.
//
//   node w52_packbg_probe.js <Football-Sim-Z-post-blue-w52.html>
//
// Extracts ZPB_TEAM_COLORS + every zpb* color helper + zpbPackFor BYTE-FOR-BYTE from the
// shipped single file, then runs all 32 teams twice: once with the shipped references
// (bgL='#fcf7f1', bgD='#181114', plus the two inline txM/txMd floors), once with the
// shipped PAGE pair ('#fdf2f6' / '#1e1119') substituted. Prints:
//   1. the per-team field diff,
//   2. the worst-case floor audit of each pack against the SHIPPED page,
//   3. the --tBg/--tBgd takeover-paper examples,
//   4. the halfway-rose sanity anchor (#8e5566 vs both papers).

'use strict';
const fs = require('fs');

const file = process.argv[2];
if (!file || !fs.existsSync(file)) { console.error('usage: node w52_packbg_probe.js <w52.html>'); process.exit(2); }
const src = fs.readFileSync(file, 'utf8');

function grabBalanced(anchor, opener, closer) {
  const i = src.indexOf(anchor);
  if (i < 0) return null;
  const start = src.indexOf(opener, i);
  let depth = 0;
  for (let j = start; j < src.length; j++) {
    if (src[j] === opener) depth++;
    else if (src[j] === closer) { depth--; if (depth === 0) return src.slice(i, j + 1); }
  }
  return null;
}
function grabFn(name) { return grabBalanced('function ' + name, '{', '}'); }

const parts = [grabBalanced('const ZPB_TEAM_COLORS', '{', '}'),
               'var ZPB_BLUE_LIFT = {"Buffalo Bills":1, "Los Angeles Rams":1};'];
const fns = ['zpbRgb','zpbHex','zpbHsl','zpbFromHsl','zpbLum','zpbMix','zpbContrast','zpbReadable','zpbShade','zpbTint','zpbRgba','zpbSoft'];
for (const f of fns) parts.push(grabFn(f));
parts.push(grabFn('zpbPackFor'));
if (parts.some(p => !p)) { console.error('extraction failed'); process.exit(3); }
const core = parts.join('\n').split('window.ZPB_BLUE_LIFT').join('ZPB_BLUE_LIFT'); // new Function scope sees only globals — rename to the local var

const B = new Function(core + '\n return { ZPB_TEAM_COLORS, zpbContrast, zpbHsl, zpbMix, zpbReadable, zpbShade, zpbTint, zpbRgba, zpbSoft, zpbFromHsl };')();
const ZPB_TEAM_COLORS = B.ZPB_TEAM_COLORS, zpbContrast = B.zpbContrast;
const teams = Object.keys(ZPB_TEAM_COLORS);

function packWith(bgL, bgD) {
  let fn = core.slice(core.indexOf('function zpbPackFor'));
  fn = fn.replace("const bgL='#fcf7f1', bgD='#181114';", `const bgL='${bgL}', bgD='${bgD}';`);
  fn = fn.split("zpbContrast(_ink,'#fcf7f1')<5").join(`zpbContrast(_ink,'${bgL}')<5`);
  fn = fn.split("zpbContrast(_ink,'#181114')<4.5").join(`zpbContrast(_ink,'${bgD}')<4.5`);
  const make = new Function('zpbState','ZPB_TEAM_COLORS','ZPB_BLUE_LIFT','zpbHsl','zpbMix','zpbContrast','zpbReadable','zpbShade','zpbTint','zpbRgba','zpbSoft','zpbFromHsl',
    fn + '\n return zpbPackFor;');
  const s = { packs: {} };
  const f = make(s, ZPB_TEAM_COLORS, {"Buffalo Bills":1,"Los Angeles Rams":1},
    B.zpbHsl, B.zpbMix, B.zpbContrast, B.zpbReadable, B.zpbShade, B.zpbTint, B.zpbRgba, B.zpbSoft, B.zpbFromHsl);
  return (n) => f(n);
}

const oldPack = packWith('#fcf7f1', '#181114');   // the shipped function as-is
const newPack = packWith('#fdf2f6', '#1e1119');   // the pack following the page

console.log(`teams: ${teams.length}`);
const fields = ['accL','accD','acc2L','acc2D','acc3L','acc3D','txL','txM','txMd','txd','sud','hairL','hairD','bgL','bgD','on','onD'];
const varFields = ['--tA','--tA2','--tA3','--tTx','--tSu','--tHr','--tTxM','--tTxMd','--tBg','--tBgd'];
let changed = 0;
for (const t of teams) {
  const a = oldPack(t), b = newPack(t);
  const diff = fields.filter(f => a[f] !== b[f]).concat(varFields.filter(f => a.vars[f] !== b.vars[f]));
  if (diff.length) { changed++; console.log(`  ${t} → ${diff.join(',')}`); }
}
console.log(`teams whose pack changes at all: ${changed}/${teams.length}`);

const floors = [['accL','#fdf2f6',4.6],['acc2L','#fdf2f6',4.2],['acc3L','#fdf2f6',4.2],['txL','#fdf2f6',7.0],['txM','#fdf2f6',5.0],
                ['accD','#1e1119',4.6],['acc2D','#1e1119',4.2],['acc3D','#1e1119',4.2],['txMd','#1e1119',4.5]];
console.log('\n=== floor audit vs SHIPPED page (#fdf2f6/#1e1119), packs computed with OLD refs ===');
for (const [f, bg, min] of floors) {
  let worst = null, wt = '';
  for (const t of teams) { const c = zpbContrast(oldPack(t)[f], bg); if (worst === null || c < worst) { worst = c; wt = t; } }
  console.log(`${f} vs ${bg}: worst ${worst.toFixed(2)} (${wt}) ${worst >= min ? 'PASS' : 'FAIL'} (floor ${min})`);
}
console.log('=== floor audit vs SHIPPED page, packs computed with NEW refs ===');
for (const [f, bg, min] of floors) {
  let worst = null, wt = '';
  for (const t of teams) { const c = zpbContrast(newPack(t)[f], bg); if (worst === null || c < worst) { worst = c; wt = t; } }
  console.log(`${f} vs ${bg}: worst ${worst.toFixed(2)} (${wt}) ${worst >= min ? 'PASS' : 'FAIL'} (floor ${min})`);
}
console.log(`\n#8e5566 vs #fcf7f1 = ${zpbContrast('#8e5566','#fcf7f1').toFixed(3)} | vs #fdf2f6 = ${zpbContrast('#8e5566','#fdf2f6').toFixed(3)}`);
console.log('KC --tBg light: old ' + oldPack('Kansas City Chiefs').vars['--tBg'] + ' | new ' + newPack('Kansas City Chiefs').vars['--tBg']);
console.log('KC --tBgd dark: old ' + oldPack('Kansas City Chiefs').vars['--tBgd'] + ' | new ' + newPack('Kansas City Chiefs').vars['--tBgd']);
