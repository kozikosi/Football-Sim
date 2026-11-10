#!/usr/bin/env node
// _agents/vl/deliveries/vl-derive-99-2026-11-10/vl-derive-99.mjs
// Experiment: close the 6 same-side zero-D residuals to reach 99/99.
// Base = Inkling P-322 + cross-side floor 6 (verified 93/6/0).
// Read-only; writes nothing.

import { execSync } from 'child_process';

const COMMIT = '678bb06';
const FLOOR = 6;

function gitShow(path) { return execSync('git show ' + COMMIT + ':' + path, { cwd: process.cwd(), encoding: 'utf8' }); }

const flex = JSON.parse(gitShow('tools/mathlab/flex.json')).flex;
const design = JSON.parse(gitShow('tools/mathlab/skill-profiles-p322.json'));
const prof = design.profile, beta = design.beta, scope = design.scope;
const covDmult = design.covDmult, catcherCut = design.catcherCut, gate = design.gate;
const U = design.U, override = design.override, fbFree = new Set(design.fbFree), dBump = design.dBump;
const side = design.side;
const cuts = design.cuts;
const sideOf = function(r) { return side.offense.includes(r) ? 'O' : side.defense.includes(r) ? 'D' : 'S'; };

const tp = gitShow('tools/mathlab/results/thetaprice-2026-11-09.md');
const D = {};
for (const line of tp.split('\n')) {
  const c = line.split('|').map(function(x){ return x.trim(); });
  if (c[1] && /^[A-Z]+>[A-Z0-9]+$/.test(c[1])) D[c[1]] = parseFloat(c[6]);
}
const dOf = function(k) { return k in dBump ? dBump[k] : k in D ? D[k] : 0; };

function tier(x) { if (x < cuts[0]) return 0; if (x < cuts[1]) return 2; if (x < cuts[2]) return 6; return 12; }
const TIERS = [0,2,6,12];

function baseInfo(src, dst) {
  var k = src + '>' + dst;
  if (dst === 'SAM') return baseInfo(src, 'OLB');
  if (k in override) return { p: override[k], how: 'override', d: null, gap: null, sideSrc: null, sideDst: null };
  if (dst === 'FB' && fbFree.has(src)) return { p: 0, how: 'fb-free', d: null, gap: null, sideSrc: null, sideDst: null };
  var d = Math.max(0, dOf(k));
  var ps = prof[src], pd = prof[dst];
  if (!ps || !pd) return { p: null, how: 'no-profile', d, gap: null, sideSrc: sideOf(src), sideDst: sideOf(dst) };
  var A = 0, totalGap = 0;
  var skills = Object.keys(beta);
  for (var i = 0; i < skills.length; i++) {
    var s = skills[i];
    if (scope[s] && !scope[s].includes(dst)) continue;
    var gap = Math.max(0, (pd[s] || 0) - (ps[s] || 0));
    totalGap += gap;
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
  if (FLOOR != null && sideOf(src) !== 'S' && sideOf(dst) !== 'S' && sideOf(src) !== sideOf(dst) && dst !== 'FB') {
    if (x < FLOOR) { x = FLOOR; how = 'formula+floor'; }
  }
  return { p: tier(x), how: how, raw: x, d: d, gap: totalGap, sideSrc: sideOf(src), sideDst: sideOf(dst) };
}

function run(name, adj) {
  var rows = [];
  var srcs = Object.keys(flex).sort();
  for (var a = 0; a < srcs.length; a++) {
    var src = srcs[a];
    var dsts = Object.keys(flex[src]).sort();
    for (var b = 0; b < dsts.length; b++) {
      var dst = dsts[b];
      var info = baseInfo(src, dst);
      if (info.p === null) continue;
      var m = adj(info, src, dst);
      rows.push({ k: src + '>' + dst, own: flex[src][dst], model: m.p, how: m.how, raw: m.raw, d: info.d, gap: info.gap });
    }
  }
  var n = rows.length;
  var exact = rows.filter(function(r){ return r.model === r.own; }).length;
  var off1 = rows.filter(function(r){ return r.model !== r.own && Math.abs(TIERS.indexOf(r.own) - TIERS.indexOf(r.model)) === 1; }).length;
  var hard = rows.filter(function(r){ return r.model !== r.own && Math.abs(TIERS.indexOf(r.own) - TIERS.indexOf(r.model)) > 1; }).length;
  console.log(name + ': exact ' + exact + '/' + n + ' | off1 ' + off1 + ' | hard ' + hard);
  var bad = rows.filter(function(r){ return r.model !== r.own; });
  if (bad.length) {
    var rem = bad.map(function(r){ return r.k + ': ' + r.own + '->' + r.model; }).join('; ');
    console.log('  remaining: ' + rem);
  }
  return { rows: rows, exact: exact, off1: off1, hard: hard };
}

run('Inkling + floor 6 (baseline)', function(b){ return b; });

for (var ti = 0; ti < [1.5, 2.0, 2.4, 2.5, 3.0, 4.0].length; ti++) {
  var T = [1.5, 2.0, 2.4, 2.5, 3.0, 4.0][ti];
  (function(T){
    run('same-side D=0 gap<=' + T + ' -> 0', function(b, src, dst){
      if (b.d === 0 && b.sideSrc && b.sideDst && b.sideSrc === b.sideDst && b.sideSrc !== 'S' && b.gap <= T)
        return { p: 0, how: 'lateral', raw: b.raw, d: b.d, gap: b.gap };
      return b;
    });
  })(T);
}

run('6 residuals as fiat -> 0', function(b, src, dst){
  var k = src + '>' + dst;
  var fiat = { 'CB>FS':0,'CB>SS':0,'EDGE>OLB':0,'ILB>OLB':0,'SS>DIME':0,'SS>NICKEL':0 };
  if (k in fiat) return { p: 0, how: 'fiat', raw: b.raw, d: b.d, gap: b.gap };
  return b;
});
