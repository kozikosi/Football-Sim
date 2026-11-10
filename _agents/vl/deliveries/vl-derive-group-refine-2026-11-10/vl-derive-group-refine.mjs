#!/usr/bin/env node
// _agents/vl/deliveries/vl-derive-group-refine-2026-11-10/vl-derive-group-refine.mjs
// VL's task B: refine the E5 same-group discount to fix FS>SS and reach 99/99.
// Baseline: E5 + EDGE>OLB override = 98/99, only residual FS>SS (owner 2, model 0).
// Read-only; writes nothing.

import { execSync } from 'child_process';

const COMMIT = '678bb06';

function gitShow(path) { return execSync('git show ' + COMMIT + ':' + path, { cwd: process.cwd(), encoding: 'utf8' }); }

const flex = JSON.parse(gitShow('tools/mathlab/flex.json')).flex;
const design = JSON.parse(gitShow('tools/mathlab/skill-profiles-p322.json'));
const prof = design.profile, beta = design.beta, scope = design.scope;
const covDmult = design.covDmult, catcherCut = design.catcherCut, gate = design.gate;
const U = design.U, override = design.override, fbFree = new Set(design.fbFree), dBump = design.dBump;

const OFFENSE = new Set(['QB','RB','FB','WR','TE','OT','OG','C']);
const DEFENSE = new Set(['DT','EDGE','ILB','OLB','SS','FS','CB','NICKEL','DIME']);
const GROUP = { DB: new Set(['CB','FS','SS','NICKEL','DIME']), LB: new Set(['ILB','OLB']), DL: new Set(['DT','EDGE']) };
function groupOf(r) { for (const g of Object.keys(GROUP)) if (GROUP[g].has(r)) return g; return null; }
function sameGroup(a, b) { const g = groupOf(a); return g !== null && g === groupOf(b); }
function sideOf(r) { if (OFFENSE.has(r)) return 'O'; if (DEFENSE.has(r)) return 'D'; return 'S'; }

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

// Build a price function given options.
function makePrice(opts) {
  // opts.excludeSafety: exclude FS<->SS from same-group discount
  // opts.safetyFactor: discount factor for FS<->SS (default 0.5)
  // opts.onlyPairs: array of [src,dst] that get the discount (others same-group don't)
  return function(src, dst) {
    var b = baseInfo(src, dst);
    if (b.p === null || b.how === 'override' || b.how === 'fb-free') return b;
    var k = src + '>' + dst;
    var x = b.raw;
    var how = b.how;
    var isSafety = (src === 'FS' && dst === 'SS') || (src === 'SS' && dst === 'FS');
    var applyDiscount = false;
    if (opts.onlyPairs) {
      applyDiscount = opts.onlyPairs.some(function(p){ return p[0] === src && p[1] === dst; });
    } else if (sameGroup(src, dst)) {
      if (opts.excludeSafety && isSafety) applyDiscount = false;
      else applyDiscount = true;
    }
    if (applyDiscount) {
      var factor = (opts.safetyFactor && isSafety) ? opts.safetyFactor : 0.5;
      x = b.d + b.A * factor + (U[k] || 0);
      how = how + '+sameGroup';
    }
    if (sideOf(src) !== 'S' && sideOf(dst) !== 'S' && sideOf(src) !== sideOf(dst) && dst !== 'FB') {
      if (x < 6) { x = 6; how = how + '+floor'; }
    }
    return { p: tier(x), how: how, raw: x, d: b.d, A: b.A };
  };
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
      rows.push({ k: src + '>' + dst, own: flex[src][dst], model: m.p, how: m.how });
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
  return { exact: exact, off1: off1, hard: hard };
}

// Baseline: E5 + EDGE>OLB override (98/99)
function priceBaseline(src, dst) {
  var k = src + '>' + dst;
  if (k === 'EDGE>OLB') return { p: 0, how: 'override+EDGE>OLB', d: null, A: null };
  return makePrice({})(src, dst);
}
run('baseline: E5 + EDGE>OLB override (expect 98/99, FS>SS residual)', priceBaseline);

// Option 1: exclude FS<->SS from same-group discount (keeps EDGE>OLB residual, no override here)
run('option 1: exclude FS<->SS from discount (no override; EDGE>OLB residual)', makePrice({ excludeSafety: true }));

// Option 1 combined with EDGE>OLB override (expect 99/99)
function priceOption1Combined(src, dst) {
  var k = src + '>' + dst;
  if (k === 'EDGE>OLB') return { p: 0, how: 'override+EDGE>OLB', d: null, A: null };
  return makePrice({ excludeSafety: true })(src, dst);
}
run('option 1 combined + EDGE>OLB override (expect 99/99)', priceOption1Combined);

// Option 2: safety pairs ×0.75 instead of ×0.5
run('option 2: safety pairs factor 0.75', makePrice({ safetyFactor: 0.75 }));

// Option 3: discount only for CB->FS, CB->SS, SS->DIME, SS->NICKEL (Owner prices 0)
run('option 3: discount only CB->FS/SS, SS->DIME/NICKEL', makePrice({
  onlyPairs: [['CB','FS'],['CB','SS'],['SS','DIME'],['SS','NICKEL']]
}));
