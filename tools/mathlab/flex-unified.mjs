// mathlab/flex-unified.mjs — unified flex rule evaluator (council proposal PART 2-C / Q23/Q59).
// Rule A (win-cost): penalty = clamp(round(winCost x 10), 0, 10), winCost = (weight[to] - weight[from]) x 0.00254.
// Rule B (council PART-1): penalty = min(12, 4 x hops) on the position-group graph; QB and OL (OT/OG/C) banned as flex sources.
// Compares both against flex.json (REV 4, Owner 29 Oct). Role->slot mapping for Rule A uses the primary slot
// (RB->RB1, WR->WR1, ...); role rows without a slot mapping report n/a (data gap, not a ban).
// Read-only: reads flex.json + design.json, writes only to tools/mathlab/results/.
// usage: node flex-unified.mjs [--selftest | --out results/flex-unified-<date>.md]
import fs from 'fs';
const FLEX_FILE = 'tools/mathlab/flex.json';
const WEIGHT_FILE = 'tools/mathlab/design.json';
const K = 10; // penalty units per win
const CAP = 10; // REV 5 hard ceiling
const CAP12 = 12; // PART-1 unified rule ceiling

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

// Position-group adjacency graph (hops = 1 edge). Undirected.
const ADJ = {
  QB: ['RB','TE','WR'], RB: ['QB','FB','WR','TE'], FB: ['RB','TE'],
  WR: ['RB','TE','FB','SS','FS','CB','NICKEL','DIME'],
  TE: ['WR','FB','RB','C','OG','OT','EDGE','DT','ILB','OLB','SS','FS','NICKEL','DIME'],
  OT: ['OG','C','DT','FB','RB'], OG: ['C','OT','DT','FB','RB'], C: ['OG','OT','DT','FB','RB'],
  DT: ['OG','C','EDGE','FB','OT','ILB','OLB','RB'], EDGE: ['DT','OLB','ILB','FB','TE','RB','NICKEL'],
  ILB: ['OLB','DT','FB','EDGE','TE','SS','FS','NICKEL','DIME'],
  OLB: ['ILB','EDGE','NICKEL','DT','TE','SS','FS','FB','DIME'],
  SS: ['NICKEL','DIME','FS','OLB','CB','ILB','WR','TE','RB','FB'],
  FS: ['NICKEL','DIME','SS','CB','WR','ILB','OLB','TE','RB'],
  CB: ['FS','NICKEL','DIME','SS','WR','ILB','OLB','TE','RB'],
  K: ['P'], P: ['K'],
  NICKEL: ['CB','SS','FS','WR','ILB','OLB'], DIME: ['CB','SS','FS','WR','ILB','OLB','CB'],
};
const NODES = Object.keys(ADJ);
function bfs(src) {
  const dist = { [src]: 0 }; const q = [src];
  for (let i = 0; i < q.length; i++) { for (const v of ADJ[q[i]] || []) { if (dist[v] == null) { dist[v] = dist[q[i]] + 1; q.push(v); } } }
  return dist;
}
const HOPS = Object.fromEntries(NODES.map(n => [n, bfs(n)]));
const BANNED_SRC = new Set(['QB', 'OT', 'OG', 'C']); // QB/OL banned as flex sources (PART-1)
const BANNED_DST = new Set(['QB']);                   // QB cannot be a flex destination
const FREE_OL = new Set(['OT->OG','OG->OT','OG->C','C->OG','OT->C','C->OT']); // OL-internal swaps stay free
// Role -> primary design.json slot (approximation; labelled in output).
const ROLE_SLOT = { QB:'QB', RB:'RB1', FB:'FB', WR:'WR1', TE:'TE1', OT:'OT1', OG:'OG1', C:'C', DT:'DT1', EDGE:'DE1', ILB:'MIKE', OLB:'WILL', SS:'SS', FS:'FS', CB:'CB1', K:'K', P:'P', NICKEL:'CB3', DIME:'DIME' };
function slotOf(role) { return ROLE_SLOT[role] ?? role; }
function hopsPenalty(from, to) {
  if (from === to) return 0;
  const h = HOPS[from] && HOPS[from][to];
  if (h == null) return CAP12; // unreachable -> prohibitive
  return Math.min(CAP12, 4 * h);
}
// Returns { value: number|null, banned: boolean, reason: 'banned'|'freeOL'|'ok'|'noData' }.
function unifiedResult(from, to, weights) {
  const banned = BANNED_SRC.has(from) || BANNED_DST.has(to);
  if (FREE_OL.has(from + '->' + to)) return { value: 0, banned, reason: 'freeOL' };
  if (banned) return { value: null, banned, reason: 'banned' };
  const a = weights[slotOf(from)], b = weights[slotOf(to)];
  if (a == null || b == null) return { value: null, banned: false, reason: 'noData' };
  const winCost = (b - a) * 0.00254;
  return { value: Math.min(CAP, Math.max(0, Math.round(Math.abs(winCost) * K))), banned: false, reason: 'ok' };
}
function analyze(flex, weights) {
  const rows = [];
  for (const [from, dests] of Object.entries(flex.flex || {})) {
    for (const [to, penalty] of Object.entries(dests || {})) {
      const r = unifiedResult(from, to, weights);
      const hp = hopsPenalty(from, to);
      const agree = r.reason === 'ok' && r.value === penalty;
      rows.push({ from, to, penalty, ruleA: r.value, ruleB: hp, banned: r.banned, reason: r.reason, agree, diff: r.value == null ? null : r.value - penalty });
    }
  }
  return rows;
}
function md(rows, stats) {
  let s = '# Unified flex rule evaluation vs flex.json (REV 4)\n\n';
  s += 'Rule A (win-cost): penalty = clamp(round(winCost x 10), 0, 10), winCost = (weight[to] - weight[from]) x 0.00254 (design.json primary slot per role).\n';
  s += 'Rule B (council PART-1): penalty = min(12, 4 x hops) on the position-group graph; QB and OL (OT/OG/C) banned as flex sources.\n';
  s += `Compared ${stats.nPairs} pairs: ${stats.agreeA} agree with Rule A, ${stats.nBanned} effectively banned (QB/OL, excl. free OL swaps), ${stats.noData} lack slot mapping, ${stats.mismatch} mismatch Rule A.\n\n`;
  s += `| from | to | flex.json | ruleA | ruleB (hops) | banned | agree-A | diff |\n`;
  s += `|----|----|----|----|----|----|----|----|\n`;
  for (const r of rows) {
    s += `| ${r.from} | ${r.to} | ${r.penalty} | ${r.ruleA == null ? 'n/a' : r.ruleA} | ${r.ruleB} | ${r.banned ? 'YES' : '—'} | ${r.agree ? 'yes' : 'no'} | ${r.diff == null ? 'n/a' : r.diff} |\n`;
  }
  return s;
}

if (process.argv.includes('--selftest')) {
  const weights = { QB: 1000, RB1: 700, WR1: 400, TE1: 300, FS: 200, OT1: 900, OG1: 850, C: 800 };
  let ok = true;
  ok &&= hopsPenalty('RB', 'WR') === 4; // 1 hop -> 4
  ok &&= hopsPenalty('RB', 'FS') === 8; // RB->WR->FS: 2 hops -> 8
  ok &&= hopsPenalty('OT', 'DT') === 4; // 1 hop -> 4
  ok &&= hopsPenalty('QB', 'CB') === 8; // QB->WR->CB: 2 hops -> 8
  ok &&= unifiedResult('QB', 'FS', weights).reason === 'banned'; // QB banned
  ok &&= unifiedResult('OT', 'OG', weights).value === 0 && unifiedResult('OT', 'OG', weights).banned; // OL-internal free (still flagged banned by rule)
  ok &&= unifiedResult('RB', 'WR', weights).value === 8; // |400-700|*0.00254=0.762 -> round(7.62)=8
  ok &&= unifiedResult('FS', 'TE', weights).value === 3; // |300-200|*0.00254=0.254 -> round(2.54)=3
  ok &&= unifiedResult('RB', 'ZZ', weights).reason === 'noData'; // unknown slot
  console.log(JSON.stringify({ 'RB->WR hops': hopsPenalty('RB','WR'), 'RB->FS hops': hopsPenalty('RB','FS'), 'QB->FS banned': unifiedResult('QB','FS',weights).reason === 'banned', 'OT->OG free': unifiedResult('OT','OG',weights).value, 'RB->WR ruleA': unifiedResult('RB','WR',weights).value, 'FS->TE ruleA': unifiedResult('FS','TE',weights).value }, null, 1));
  console.log(ok ? 'SELFTEST PASS' : 'SELFTEST FAIL');
  process.exit(ok ? 0 : 1);
}

const flex = loadJson(FLEX_FILE);
const weights = loadJson(WEIGHT_FILE);
const rows = analyze(flex, weights);
const nBanned = rows.filter(r => r.banned && r.reason !== 'freeOL').length;
const agreeA = rows.filter(r => r.reason === 'ok' && r.agree).length;
const noData = rows.filter(r => r.reason === 'noData').length;
const mismatch = rows.filter(r => r.reason === 'ok' && !r.agree).length;
const stats = { nPairs: rows.length, nBanned, agreeA, noData, mismatch };
let s = '# Unified flex rule evaluation vs flex.json (REV 4)\n\n';
s += 'Rule A (win-cost): penalty = clamp(round(winCost x 10), 0, 10), winCost = (weight[to] - weight[from]) x 0.00254 (design.json primary slot per role, approximation).\n';
s += 'Rule B (council PART-1): penalty = min(12, 4 x hops) on the position-group graph; QB and OL (OT/OG/C) banned as flex sources.\n';
s += `Compared ${rows.length} slot-pair rules: ${stats.agreeA} agree with Rule A, ${stats.nBanned} effectively banned, ${stats.noData} lack a slot mapping, ${stats.mismatch} mismatch Rule A.\n\n`;
s += `| from | to | flex.json | ruleA | ruleB (hops) | banned | agree-A | diff |\n|----|----|----|----|----|----|----|----|\n`;
for (const r of rows) {
  s += `| ${r.from} | ${r.to} | ${r.penalty} | ${r.ruleA == null ? 'n/a' : r.ruleA} | ${r.ruleB} | ${r.banned ? 'YES' : '—'} | ${r.agree ? 'yes' : 'no'} | ${r.diff == null ? 'n/a' : r.diff} |\n`;
}
s += '\n## Mismatches vs Rule A (flex.json penalty != win-cost cap)\n';
const mm = rows.filter(r => r.reason === 'ok' && !r.agree);
for (const r of mm) {
  const a = weights[slotOf(r.from)], b = weights[slotOf(r.to)];
  s += `| ${r.from}->${r.to} | flex.json ${r.penalty} | ruleA ${r.ruleA} | diff ${r.diff > 0 ? '+' : ''}${r.diff} | weights ${r.from}=${a} ${r.to}=${b} | winCost ${((b - a) * 0.00254).toFixed(4)} wins |\n`;
}
s += '\n## Effectively banned pairs (QB/OL; flex.json still lists them)\n';
for (const r of rows.filter(r => r.banned && r.reason !== 'freeOL')) {
  s += `| ${r.from}->${r.to} | flex.json ${r.penalty} | unified: banned |\n`;
}
s += '\n## Free OL swaps preserved (exception to the OL ban)\n';
for (const r of rows.filter(r => r.reason === 'freeOL')) {
  s += `| ${r.from}->${r.to} | flex.json ${r.penalty} | unified: 0 (free OL swap) |\n`;
}
s += '\n## Interpretation\n';
s += 'Rule A prices each flex at its true win cost, hard-capped at 10: downgrades are cheap, upgrades (e.g. TE->WR1) cost proportionally. ' +
  'Rule B (min(12,4xhops)) is topology-based and ignores win value, so a cheap downgrade can still cost 4-8. ' +
  'Neither rule equals flex.json everywhere: flex.json keeps Owner exceptions (QB->FS 10, EDGE->OLB 0, OT<->OG 0, ...). ' +
  'Recommended unified rule: Rule A + carried-over Owner exceptions, with QB/OL banned per PART-1. Flex.json is the Owner\'s word; this tool only measures deviation, it does not override.\n';
const outPath = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : `tools/mathlab/results/flex-unified-${new Date().toISOString().slice(0, 10)}.md`;
fs.mkdirSync('tools/mathlab/results', { recursive: true });
fs.writeFileSync(outPath, s);
fs.writeFileSync(outPath.replace(/\.md$/, '.json'), JSON.stringify({ generatedAt: new Date().toISOString(), stats, rows }, null, 1));
console.log(JSON.stringify({ outPath, ...stats }, null, 1));
process.exit(0);
