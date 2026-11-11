// P-345 prototype (dual positions / Q5): what a two-position player changes, measured on the real Madden 27 data.
// Self-contained: reads the live 99-rule flex oracle (deliveries/p345-flex99-oracle.json, copied verbatim from
// origin/council/muse:tools/mathlab/flex.json @ a32f28f1, merged into council/muse @ 4c235316) and data/madden27-ratings.csv.
// 4-3 base only. Hungarian is ported verbatim (same algorithm, O(n^3), deterministic tie-break by index).
// The point: a dual player needs NO new math — one number in fit() changes (penalty = 0 at either home position).
// Everything else (Hungarian, value, WINS_PER_UNIT) consumes fit() unchanged. This script measures what that yields.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

// ---------- oracle ----------
const ORACLE = JSON.parse(readFileSync(join(here, 'p345-flex99-oracle.json'), 'utf8'));
const FLEX = ORACLE.flex;
const ORACLE_RULES = Object.values(FLEX).reduce((n, row) => n + Object.keys(row).length, 0);
const EMERGENCY_PENALTY = 8;

// SLOTS: 32-spot table, ENGINE-MATH-SPEC REV 5 values, copied from colors/src/engine/slots.ts (this worktree).
// Weights are QB 1000 ... multiples of 10; provenance named in the inbox filing.
const SLOTS = [
  ['QB', 1000, 'QB'], ['WR1', 470, 'WR'], ['OT1', 430, 'OT'], ['OT2', 400, 'OT'], ['WR2', 330, 'WR'],
  ['C', 320, 'C'], ['OG1', 290, 'OG'], ['OG2', 290, 'OG'], ['TE1', 270, 'TE'], ['RB1', 230, 'RB'],
  ['WR3', 190, 'WR'], ['RB2', 80, 'RB'], ['TE2', 60, 'TE'], ['FB', 30, 'FB'], ['TE3', 10, 'TE'], ['WR4', 10, 'WR'],
  ['DE1', 520, 'EDGE'], ['DT1', 400, 'DT'], ['DE2', 400, 'EDGE'], ['DT2', 300, 'DT'], ['DL5', 140, 'DL5'],
  ['MIKE', 260, 'ILB'], ['WILL', 240, 'OLB'], ['SAM', 30, 'OLB'],
  ['CB1', 450, 'CB'], ['CB2', 340, 'CB'], ['CB3', 280, 'NICKEL'], ['DIME', 40, 'DIME'], ['SS', 240, 'SS'], ['FS', 260, 'FS'],
  ['K', 200, 'K'], ['P', 100, 'P'],
].map(([id, weight, dest]) => ({ id, weight, dest }));

const WINS_PER_UNIT = 0.00254 / 20;
const EMPTY_OVR = 70;
const PLAYS = 1e7, ILLEGAL = 1e12;

// ---------- fit(): the one function a dual player changes ----------
function dl5Penalty(table, role) {
  if (role === 'DT' || role === 'EDGE') return 0;
  const a = table[role]?.DT, b = table[role]?.EDGE;
  if (a === undefined) return b;
  if (b === undefined) return a;
  return Math.min(a, b);
}
// Single role (today's semantics), reading the live 99-rule table.
function fit(role, dest) {
  if (role === dest) return { penalty: 0, legal: true };
  const listed = dest === 'DL5' ? dl5Penalty(FLEX, role) : FLEX[role]?.[dest];
  if (listed !== undefined) return { penalty: listed, legal: true };
  if (role === 'QB') return { penalty: EMERGENCY_PENALTY, legal: false };   // QB never takes the fallback
  return { penalty: EMERGENCY_PENALTY, legal: true };
}
// Dual roles: 0 at either home position (Owner: "free between your own two positions"); otherwise the CHEAPEST
// of the two roles' listed prices (min, so a dual is never worse than either parent at a third destination).
function fitDual(roles, dest) {
  if (roles.includes(dest)) return { penalty: 0, legal: true };
  const parts = roles.map((r) => fit(r, dest));
  // QB rule propagates: a dual containing QB may never take the emergency fallback.
  if (parts.some((p) => !p.legal)) {
    const legalOnes = parts.filter((p) => p.legal);
    if (legalOnes.length === 0) return { penalty: EMERGENCY_PENALTY, legal: false };
    return { penalty: Math.min(...legalOnes.map((p) => p.penalty)), legal: true };
  }
  return { penalty: Math.min(...parts.map((p) => p.penalty)), legal: true };
}

// ---------- Hungarian (ported verbatim in structure from colors/src/engine/hungarian.ts) ----------
function hungarian(cost) {
  const n = cost.length;
  for (const row of cost) if (row.length !== n) throw new Error('hungarian: matrix must be square');
  const INF = Number.POSITIVE_INFINITY;
  const u = new Array(n + 1).fill(0), v = new Array(n + 1).fill(0), p = new Array(n + 1).fill(0), way = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Array(n + 1).fill(INF), used = new Array(n + 1).fill(false);
    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = INF, j1 = 0;
      for (let j = 1; j <= n; j++) {
        if (used[j]) continue;
        const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
        if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
        if (minv[j] < delta) { delta = minv[j]; j1 = j; }
      }
      for (let j = 0; j <= n; j++) {
        if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta;
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0 !== 0);
  }
  const col = new Array(n).fill(-1);
  for (let j = 1; j <= n; j++) if (p[j] > 0) col[p[j] - 1] = j - 1;
  return col;
}

function optimalLineup(players, fitOf) {
  const n = players.length, s = SLOTS.length, k = n + s;
  const cost = [];
  for (let i = 0; i < k; i++) {
    const row = new Array(k).fill(0);
    for (let j = 0; j < s; j++) {
      if (i < n) {
        const f = fitOf(players[i], SLOTS[j].dest);
        row[j] = f.legal ? -(PLAYS + SLOTS[j].weight * (players[i].ovr - f.penalty)) : ILLEGAL;
      } else {
        row[j] = -SLOTS[j].weight * EMPTY_OVR;
      }
    }
    cost.push(row);
  }
  const asg = hungarian(cost);
  const placements = SLOTS.map((sl) => ({ slot: sl.id, player: null, effOvr: EMPTY_OVR, penalty: 0, roles: null }));
  for (let i = 0; i < n; i++) {
    const j = asg[i];
    if (j >= s) continue;
    const f = fitOf(players[i], SLOTS[j].dest);
    placements[j] = { slot: SLOTS[j].id, player: players[i], effOvr: players[i].ovr - f.penalty, penalty: f.penalty, roles: players[i].roles };
  }
  const value = placements.reduce((t, p) => t + SLOTS.find((sl) => sl.id === p.slot).weight * p.effOvr, 0);
  return { placements, value };
}

// ---------- data ----------
const ROLE = { QB: 'QB', HB: 'RB', FB: 'FB', WR: 'WR', TE: 'TE', LT: 'OT', RT: 'OT', LG: 'OG', RG: 'OG', C: 'C', DT: 'DT', LEDG: 'EDGE', REDG: 'EDGE', MIKE: 'ILB', WILL: 'OLB', SAM: 'OLB', CB: 'CB', SS: 'SS', FS: 'FS', K: 'K', P: 'P', LS: 'LS' };
function loadCsv(path, freeAgent) {
  const lines = readFileSync(path, 'utf8').split(/\r?\n/).filter((l) => l.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const m = /^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(lines[i]);
    if (!m) throw new Error(`cannot parse line ${i + 1}: ${lines[i]}`);
    const [, name, pos, team, ovr] = m;
    rows.push({ id: `${name}|${pos}|${team}`, name, pos, team, ovr: +ovr, role: ROLE[pos], roles: [ROLE[pos]], freeAgent });
  }
  return rows;
}
const pool = loadCsv(join(root, 'data', 'madden27-ratings.csv'), false);
const teams = [...new Set(pool.map((p) => p.team))].sort();
console.log(`players: ${pool.length}  teams: ${teams.length}  oracle flex rules: ${ORACLE_RULES} (expect 99)`);
if (ORACLE_RULES !== 99) throw new Error('oracle is not the live 99-rule table');

// ---------- experiment: league-wide dual sweeps ----------
// Each sweep takes one position pair, picks each team's highest-OVR player at the FIRST role, and makes him dual.
const SWEEPS = [
  { label: 'best CB -> CB+WR (Hunter)', first: 'CB', second: 'WR' },
  { label: 'best OG -> OG+OT', first: 'OG', second: 'OT' },
  { label: 'best TE -> TE+WR', first: 'TE', second: 'WR' },
];

for (const sweep of SWEEPS) {
  let changed = 0, totalGain = 0, maxGain = 0, secondPosStarts = 0, mono = 0, teamsWithChange = 0;
  const examples = [];
  for (const team of teams) {
    const roster = pool.filter((p) => p.team === team);
    const candidates = roster.filter((p) => p.role === sweep.first);
    if (candidates.length === 0) { console.log(`${team}: no ${sweep.first} — skipped`); continue; }
    const star = candidates.reduce((a, b) => (b.ovr > a.ovr ? b : a));
    const dualRoster = roster.map((p) => (p.id === star.id ? { ...p, roles: [sweep.first, sweep.second] } : p));
    const base = optimalLineup(roster, (p, d) => fit(p.role, d));
    const dual = optimalLineup(dualRoster, (p, d) => fitDual(p.roles, d));
    const gain = (dual.value - base.value) * WINS_PER_UNIT;
    if (gain + 1e-12 < 0) mono++;                       // monotonicity violation (must be 0)
    totalGain += gain; maxGain = Math.max(maxGain, gain);
    const baseIds = base.placements.map((pl) => pl.player?.id ?? null);
    const dualIds = dual.placements.map((pl) => pl.player?.id ?? null);
    const diffs = dual.placements.filter((pl, i) => (pl.player?.id ?? null) !== baseIds[i] || pl.penalty !== base.placements[i].penalty);
    if (diffs.length) {
      teamsWithChange++;
      changed += diffs.length;
      const starAt = dual.placements.find((pl) => pl.player?.id === star.id);
      if (starAt && starAt.slot) {
        const slotDest = SLOTS.find((s) => s.id === starAt.slot).dest;
        if (slotDest === sweep.second) secondPosStarts++;
      }
      if (examples.length < 2) examples.push({ team, star: `${star.name} (${star.ovr} OVR)`, diffs: diffs.map((pl) => `${pl.slot}: ${base.placements.find((x) => x.slot === pl.slot).player?.name ?? 'empty'} -> ${pl.player?.name ?? 'empty'} (pen ${pl.penalty})`), gain });
    }
  }
  console.log(`\n== ${sweep.label} ==`);
  console.log(`teams changed >=1 placement: ${teamsWithChange}/32   total placements changed: ${changed}`);
  console.log(`mean value gain per team: ${(totalGain / 32).toFixed(4)} wins   max: ${maxGain.toFixed(4)} wins   monotonicity violations: ${mono}`);
  console.log(`dual player started AT THE SECOND POSITION (${sweep.second}) in ${secondPosStarts} of the changed teams`);
  for (const ex of examples) {
    console.log(`example ${ex.team}: ${ex.star}; gain ${ex.gain.toFixed(4)} wins`);
    for (const d of ex.diffs) console.log(`   ${d}`);
  }
}
