// flex-audit.mjs — strict-matching re-run (min-cost bipartite fill) against a build file.
// All inputs derived from <build.html> literals: PLAYERS, ROSTER_SLOTS, NATURAL_SLOT_MAP,
// SLOT_FAMILY, LB_FLEX, FLEX. No DOM, no product edits.
// Usage: node flex-audit.mjs <build.html>
//   --config a|b    a = 26 slots; b = 28 slots (roster + FB1 + P1), HB->FB1 = 0, K->P1 = 0 (one-way)
//   --literals      print sha1-256-style fingerprints of the six literal blocks instead
const fs = require('fs');
const crypto = require('crypto');
const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');

function grabConst(name, open) {
  const body = open === '[' ? '[\\s\\S]*?\\]' : '\\{[\\s\\S]*?\\}';
  const re = new RegExp('const ' + name + ' = (' + body + ');');
  const m = src.match(re);
  if (!m) return null;
  return m[1];
}

const PLAYERS = Function('"use strict"; return (' + grabConst('PLAYERS', '[') + ');')();
const ROSTER_SLOTS = Function('"use strict"; return (' + grabConst('ROSTER_SLOTS', '[') + ');')();
const NATURAL_SLOT_MAP = Function('"use strict"; return (' + grabConst('NATURAL_SLOT_MAP', '{') + ');')();
const SLOT_FAMILY = Function('"use strict"; return (' + grabConst('SLOT_FAMILY', '{') + ');')();
const LB_FLEX = Function('"use strict"; return (' + grabConst('LB_FLEX', '{') + ');')();
const FLEX = Function('"use strict"; var LB_FLEX = ' + grabConst('LB_FLEX', '{') + '; return (' + grabConst('FLEX', '{') + ');')();

function isNaturalSlot(pos, slot) {
  return (NATURAL_SLOT_MAP[pos] || []).includes(slot);
}
function flexRule(pos, slot) {
  if (isNaturalSlot(pos, slot)) return 0;
  const t = FLEX[pos];
  if (!t) return null;
  if (t[slot] != null) return t[slot];
  const fam = SLOT_FAMILY[slot];
  return fam && t[fam] != null ? t[fam] : null;
}

if (process.argv.includes('--literals')) {
  const names = ['PLAYERS', 'ROSTER_SLOTS', 'NATURAL_SLOT_MAP', 'SLOT_FAMILY', 'LB_FLEX', 'FLEX'];
  for (const n of names) {
    const lit = grabConst(n, n === 'PLAYERS' || n === 'ROSTER_SLOTS' ? '[' : '{');
    const h = crypto.createHash('sha256').update(lit).digest('hex').slice(0, 16);
    console.log(n.padEnd(17) + h + (lit ? '' : ' MISSING'));
  }
  process.exit(0);
}

const want = process.argv[process.argv.indexOf('--config') + 1] || 'a';
let slots = ROSTER_SLOTS.slice();
if (want === 'b') { slots = slots.concat(['FB1', 'P1']); }
// Config B variant tables (work-order FB/P rules; NOT present in the build literal):
if (want === 'b') {
  NATURAL_SLOT_MAP.FB = ['FB1']; NATURAL_SLOT_MAP.P = ['P1'];
  FLEX.K = Object.assign({}, FLEX.K, { P: 0 });
  FLEX.HB = Object.assign({}, FLEX.HB, { FB1: 0 });
}
// slot-type nodes, each demanding 32 (one per team), like the receipts
const D = 32;
const pos = [...new Set(PLAYERS.map(r => r[1]))];
const byPos = {}; for (const p of pos) byPos[p] = [];
PLAYERS.forEach((r, i) => byPos[r[1]].push(i));

// min-cost max-flow (SPFA Bellman-Ford augment by 1) over slot-type nodes
const nS = slots.length;
const S = nS, pl0 = nS + 1, T = pl0 + PLAYERS.length, N = T + 1;
const g = Array.from({ length: N }, () => []);
let edgeCount = 0;
function add(u, v, cap, cost) { g[u].push([v, cap, cost, g[v].length]); g[v].push([u, 0, -cost, g[u].length - 1]); }
for (let si = 0; si < nS; si++) add(S, si, D, 0);
const perSlot = {}; for (const s of slots) perSlot[s] = { fills: {}, penalty: 0, flexed: 0 };
for (let pi = 0; pi < PLAYERS.length; pi++) {
  const r = PLAYERS[pi];
  for (let si = 0; si < nS; si++) {
    const pen = flexRule(r[1], slots[si]);
    if (pen === null) continue;
    add(si, pl0 + pi, 1, pen); edgeCount++;
  }
  add(pl0 + pi, T, 1, 0);
}
let flow = 0, cost = 0;
for (;;) {
  const dist = new Array(N).fill(Infinity), inq = new Array(N).fill(false), q = [S];
  dist[S] = 0; inq[S] = true; const pv = new Array(N).fill(-1), pe = new Array(N).fill(-1);
  while (q.length) {
    const v = q.shift(); inq[v] = false;
    for (let i = 0; i < g[v].length; i++) {
      const e = g[v][i]; if (e[1] <= 0) continue;
      const nd = dist[v] + e[2];
      if (nd < dist[e[0]] - 1e-12) {
        dist[e[0]] = nd; pv[e[0]] = v; pe[e[0]] = i;
        if (!inq[e[0]]) { inq[e[0]] = true; q.push(e[0]); }
      }
    }
  }
  if (dist[T] === Infinity) break;
  cost += dist[T]; let v = T;
  while (v !== S) { const e = g[pv[v]][pe[v]]; e[1] -= 1; g[v][e[3]][1] += 1; v = pv[v]; }
  flow += 1;
}
// Attribution: walk final flow per slot node. A used forward arc has cap 0, unused keeps 1.
const hist = { '0': 0, '2': 0, '4': 0, '6': 0, '8': 0 };
for (let si = 0; si < nS; si++) {
  for (const e of g[si]) {
    if (e[0] === S) continue;
    if (e[1] !== 0) continue;
      const pi = e[0] - pl0;
      const posn = PLAYERS[pi][1];
      perSlot[slots[si]].fills[posn] = (perSlot[slots[si]].fills[posn] || 0) + 1;
      const pen = flexRule(posn, slots[si]);
      perSlot[slots[si]].penalty += pen;
      if (pen > 0) perSlot[slots[si]].flexed++;
      hist[String(pen)] = (hist[String(pen)] || 0) + 1;
    }
  }
console.log('build:', file);
console.log('config:', want.toUpperCase(), '| slots:', nS, 'players:', PLAYERS.length, 'demand:', nS * D);
console.log('eligible edges:', edgeCount);
console.log('flow:', flow + '/' + nS * D, '| total penalty:', cost, '| avg/slot:', (cost / (nS * D)).toFixed(4));
console.log('penalty histogram:', JSON.stringify(hist));
console.log('slots with flex:', JSON.stringify(Object.fromEntries(Object.entries(perSlot).filter(([, v]) => v.flexed > 0).map(([k, v]) => [k, { fills: v.fills, flexed: v.flexed, penalty: v.penalty }]))));
