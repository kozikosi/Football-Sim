#!/usr/bin/env node
// _agents/vl/deliveries/vl-derive-E5-verify-2026-11-10/vl-derive-E5-verify.mjs
// VL's INDEPENDENT verification of the E5 hybrid derivation (task A).
// Read-only analysis: reads inputs via `git show 97d7e96:<path>`; writes nothing.
//
// E5 = Inkling P-322 formula + cross-side floor + same-group discount + re-fit cuts (1.5/4/9).
//   - Base formula (Inkling P-322): tier(max(0, D_bumped) + gate(A) + U)
//     D_bumped: thetaprice D@90, OLB>ILB/OLB>SS bumped to 6.7; D=0 when no D row
//     A = sum w[s]*max(0, prof[dst]-prof[src]) with scope/covDmult/catcherCut/eliteLine
//     gate: A=0 if D>=5, *0.5 if 4<=D<5
//     U: RB>TE=3, SS>ILB=5, TE>ILB=6.4, RB>SS=6.6, EDGE>SS=5.1
//     fiat: override dict (C>OG=6, FB>RB=2, FB>TE=6, EDGE>RB=6, EDGE>ILB=6), fbFree => dst FB price 0
//     SAM alias => OLB; tier cuts 1/4/9 -> 0/2/6/12
//   - Cross-side floor: offense<->defense (K<->P not cross-side) price < 6 raised to 6; dst==FB exempt
//   - Same-group discount: halve A when src,dst both in DB {CB,FS,SS,NICKEL,DIME} / LB {ILB,OLB} / DL {DT,EDGE}
//   - Re-fit cuts: 1.5, 4, 9
//
// Predicted (REPORTED, council prompt E5): exact 97, off-by-one 2, hard 0; residuals EDGE>OLB (0->2), FS>SS (2->0).
//
// Usage: node vl-derive-E5-verify.mjs [--commit <sha>]

import { execSync } from 'child_process';

const COMMIT = (process.argv.findIndex((a) => a === '--commit') > 0
  ? process.argv[process.argv.findIndex((a) => a === '--commit') + 1]
  : '678bb06');  // architect tip; flex.json byte-identical to 97d7e9d (diff-verified); skill-profiles only here

function gitShow(path) {
  return execSync('git show ' + COMMIT + ':' + path, { cwd: process.cwd(), encoding: 'utf8' });
}

const flex = JSON.parse(gitShow('tools/mathlab/flex.json')).flex;
const design = JSON.parse(gitShow('tools/mathlab/skill-profiles-p322.json'));
const prof = design.profile, beta = design.beta, scope = design.scope;
const covDmult = design.covDmult, catcherCut = design.catcherCut, gate = design.gate;
const U = design.U, override = design.override, fbFree = new Set(design.fbFree), dBump = design.dBump;

// Classes defined by the prompt (do not guess).
const OFFENSE = new Set(['QB','RB','FB','WR','TE','OT','OG','C']);
const DEFENSE = new Set(['DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME']);
const GROUP = {
  DB: new Set(['CB','FS','SS','NICKEL','DIME']),
  LB: new Set(['ILB','OLB']),
  DL: new Set(['DT','EDGE'])
};
function groupOf(r) {
  for (const g of Object.keys(GROUP)) if (GROUP[g].has(r)) return g;
  return null;
}
function sameGroup(a, b) { const g = groupOf(a); return g !== null && g === groupOf(b); }
function sideOf(r) {
  if (OFFENSE.has(r)) return 'O';
  if (DEFENSE.has(r)) return 'D';
  return 'S'; // K, P special
}

const tp = gitShow('tools/mathlab/results/thetaprice-2026-11-09.md');
const D = {};
for (const line of tp.split('\n')) {
  const c = line.split('|').map(function(x){ return x.trim(); });
  if (c[1] && /^[A-Z]+>[A-Z0-9]+$/.test(c[1])) D[c[1]] = parseFloat(c[6]);
}
const dOf = function(k) { return k in dBump ? dBump[k] : k in D ? D[k] : 0; };

const cuts = [1.5, 4, 9];
function tier(x) { if (x < cuts[0]) return 0; if (x < cuts[1]) return 2; if (x < cuts[2]) return 6; return 12; }
const TIERS = [0,2,6,12];

function baseInfo(src, dst) {
  var k = src + '>' + dst;
  if (dst === 'SAM') return baseInfo(src, 'OLB');
  if (k in override) return { p: override[k], how: 'override', d: null, A: null };
  if (dst === 'FB' && fbFree.has(src)) return { p: 0, how: 'fb-free', d: null, A: null };
  var d = Math.max(0, dOf(k));
  var ps = prof[src], pd = prof[dst];
  if (!ps || !pd) return { p: null, how: 'no-profile', d, A: null };
  var A = 0;
  var skills = Object.keys(beta);
  for (var i = 0; i < skills.length; i++) {
    var s = skills[i];
    if (scope[s] && !scope[s].includes(dst)) continue;
    var gap = Math.max(0, (pd[s] || 0) - (ps[s] || 0));
    if (!gap) continue;
    var w = beta[s];
    if (s === 'COV' && covDmult[dst]) w *= covDmult[dst];
    if ((ps.CTH || 0) >= catcherCut.ctHmin && catcherCut.skills.includes(s)) w *= catcherCut.factor;
    if (s === 'BLK' && (ps.BLK || 0) >= design.eliteLine.blkMin && (pd.BLK || 0) >= design.eliteLine.blkMin) continue;
    A += w * gap;
  }
  A = d >= gate.hi ? 0 : d >= gate.lo ? A * gate.midFactor : A;
  var x = d + A + (U[k] || 0);
  var how = k in U ? 'formula+U' : 'formula';
  return { p: tier(x), how: how, raw: x, d: d, A: A };
}

function priceE5(src, dst) {
  var b = baseInfo(src, dst);
  if (b.p === null || b.how === 'override' || b.how === 'fb-free') return b;
  var k = src + '>' + dst;
  var x = b.raw;
  var how = b.how;
  // same-group discount: halve A when same group
  if (b.A !== null && sameGroup(src, dst)) {
    // recompute x with halved A: x = d + A/2 + U
    x = b.d + b.A * 0.5 + (U[k] || 0);
    how = how + '+sameGroup';
  }
  // cross-side floor
  if (sideOf(src) !== 'S' && sideOf(dst) !== 'S' && sideOf(src) !== sideOf(dst) && dst !== 'FB') {
    if (x < 6) { x = 6; how = how + '+floor'; }
  }
  return { p: tier(x), how: how, raw: x, d: b.d, A: b.A };
}

function run(name, priceFn) {
  var rows = [];
  var srcs = Object.keys(flex).sort();
  for (var a = 0; a < srcs.length; a++) {
    var src = srcs[a];
    var dsts = Object.keys(flex[src]).sort();
    for (var c = 0; c < dsts.length; c++) {
      var dst = dsts[c];
      var m = priceFn(src, dst);
      if (m.p === null) continue;
      rows.push({ k: src + '>' + dst, own: flex[src][dst], model: m.p, how: m.how, raw: m.raw, d: m.d, A: m.A });
    }
  }
  var n = rows.length;
  var exact = rows.filter(function(r){ return r.model === r.own; }).length;
  var off1 = rows.filter(function(r){ return r.model !== r.own && Math.abs(TIERS.indexOf(r.own) - TIERS.indexOf(r.model)) === 1; }).length;
  var hard = rows.filter(function(r){ return r.model !== r.own && Math.abs(TIERS.indexOf(r.own) - TIERS.indexOf(r.model)) > 1; }).length;
  console.log(name + ': exact ' + exact + '/' + n + ' | off1 ' + off1 + ' | hard ' + hard);
  var bad = rows.filter(function(r){ return r.model !== r.own; });
  if (bad.length) {
    var rem = bad.map(function(r){ return r.k + ': ' + r.own + '->' + r.model + ' (' + r.how + ')'; }).join('; ');
    console.log('  residuals: ' + rem);
  }
  return { rows: rows, exact: exact, off1: off1, hard: hard };
}

// E5 full
run('E5: Inkling + sameGroup(halve A) + floor 6 + cuts 1.5/4/9', priceE5);

// E5 + EDGE>OLB as explicit override (price 0) — MUSE predicts 98/99
function priceE5Override(src, dst) {
  var k = src + '>' + dst;
  if (k === 'EDGE>OLB') return { p: 0, how: 'override+EDGE>OLB', d: null, A: null };
  return priceE5(src, dst);
}
run('E5 + EDGE>OLB override -> 0 (predicted 98/99)', priceE5Override);

// Control: Inkling + floor 6 + cuts 1.5/4/9, no same-group term (should be E3, REPORTED 96/99, breaks nothing)
function priceE3(src, dst) {
  var b = baseInfo(src, dst);
  if (b.p === null || b.how === 'override' || b.how === 'fb-free') return b;
  var k = src + '>' + dst;
  var x = b.raw;
  var how = b.how;
  if (sideOf(src) !== 'S' && sideOf(dst) !== 'S' && sideOf(src) !== sideOf(dst) && dst !== 'FB') {
    if (x < 6) { x = 6; how = how + '+floor'; }
  }
  return { p: tier(x), how: how, raw: x, d: b.d, A: b.A };
}
run('E3 control: Inkling + floor 6 + cuts 1.5/4/9, no same-group term', priceE3);

// Control: Inkling + floor 6 + cuts 1/4/9 (REPORTED 93/99)
function priceFloor(src, dst) {
  var b = baseInfo(src, dst);
  if (b.p === null || b.how === 'override' || b.how === 'fb-free') return b;
  var k = src + '>' + dst;
  var x = b.raw;
  var how = b.how;
  if (sideOf(src) !== 'S' && sideOf(dst) !== 'S' && sideOf(src) !== sideOf(dst) && dst !== 'FB') {
    if (x < 6) { x = 6; how = how + '+floor'; }
  }
  return { p: tierCustom(x, [1,4,9]), how: how, raw: x, d: b.d, A: b.A };
}
function tierCustom(x, c) { if (x < c[0]) return 0; if (x < c[1]) return 2; if (x < c[2]) return 6; return 12; }
var rowsFloor = [];
var srcsF = Object.keys(flex).sort();
for (var i = 0; i < srcsF.length; i++) {
  var s = srcsF[i];
  var ds = Object.keys(flex[s]).sort();
  for (var j = 0; j < ds.length; j++) {
    var d = ds[j];
    var m = priceFloor(s, d);
    if (m.p === null) continue;
    rowsFloor.push({ k: s+'>'+d, own: flex[s][d], model: m.p, how: m.how });
  }
}
var exactF = rowsFloor.filter(function(r){ return r.model === r.own; }).length;
var off1F = rowsFloor.filter(function(r){ return r.model !== r.own && Math.abs(TIERS.indexOf(r.own) - TIERS.indexOf(r.model)) === 1; }).length;
var hardF = rowsFloor.filter(function(r){ return r.model !== r.own && Math.abs(TIERS.indexOf(r.own) - TIERS.indexOf(r.model)) > 1; }).length;
console.log('floor-6 control (cuts 1/4/9): exact ' + exactF + '/99 | off1 ' + off1F + ' | hard ' + hardF);
