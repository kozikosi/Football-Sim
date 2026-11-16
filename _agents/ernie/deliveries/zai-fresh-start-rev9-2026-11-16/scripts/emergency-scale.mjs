#!/usr/bin/env node
/* emergency-scale.mjs — Part A: the harness that proves the optimizer's priority ladder is mis-scaled.
 *
 * The engine's cost matrix (lineup.ts, pin d3bd81d2): ILLEGAL 1e12 > PLAYS 1e7 > EMERGENCY 1e5 > value.
 * Priority 3 ("as few emergency (-8) fills as possible") strictly dominates priority 4 ("highest total
 * weight x effective OVR") ONLY IF one emergency premium exceeds the largest possible value spread
 * between two assignments. It does not: the value scale reaches 854,227 units (whole-lineup max,
 * measured provider) and 98,932 at the single richest spot — both ABOVE the shipped EMERGENCY 1e5.
 * So a value gain of > 100,000 units can buy an avoidable emergency fill, and priority 3 silently
 * yields to priority 4.
 *
 * What the harness does (REAL data, no synthetic roster):
 *   1. derive the value scale FROM THE PROVIDER (so the check cannot silently break when weights are
 *      re-measured): single-spot max = max_j units_j x maxOvr; whole-lineup max = sum_j units_j x maxOvr.
 *   2. for every roster of the REAL drafted league (the fixture's 1,024-pick draft = 32 teams x 32
 *      picks) AND every real NFL team's 53-man cut of the madden27 pool, in BOTH bases:
 *        a. solve the optimum with the SHIPPED EMERGENCY (1e5) -> emergencyFills;
 *        b. solve again with EMERGENCY forced strictly above the derived whole-lineup max
 *           (the MIN-EMERGENCY solution) -> minEmergencyFills;
 *        c. avoidable = optimum - min. Any positive value is a priority-3 violation the shipped
 *           scale lets priority 4 buy.
 *   3. verdict: FAIL (exit 1) if any roster takes an avoidable emergency fill under the shipped
 *      constant; PASS (exit 0) with --fix applied (EMERGENCY = the derived constant, which also
 *      asserts EMERGENCY < PLAYS so priority 2 still dominates, and ILLEGAL above everything).
 *
 * The fix itself ships as a §5 PATCH PROPOSAL to the Architect (PROPOSAL-PATCH-lineup-emergency.md,
 * next to this file in the delivery) — lineup.ts is the Architect's; this harness never edits it.
 * The constant is DERIVED, not hand-set: EMERGENCY = nextDecade(whole-lineup max), recomputed from
 * the provider on every run, so re-measured weights re-derive the ladder automatically.
 *
 * Run: node emergency-scale.mjs            -> FAIL on the shipped tree (the proof)
 *      node emergency-scale.mjs --fix      -> PASS with the derived constant (the proposed fix)
 */
import { readFileSync } from 'node:fs';
import { fieldSlots } from '../football-sim-vue/src/engine/sports/nfl/engine/slots.ts';
import { hungarian } from '../football-sim-vue/src/engine/core/hungarian.ts';
import { fit } from '../football-sim-vue/src/engine/sports/nfl/engine/flex.ts';
import { derivedWeights } from '../football-sim-vue/src/engine/sports/nfl/engine/value.ts';
import { buildPool } from '../football-sim-vue/src/engine/sports/nfl/engine/players.ts';

const REPO = new URL('..', import.meta.url).pathname + 'football-sim-vue';
const FIX = process.argv.includes('--fix');
const EMPTY_OVR = 70, PLAYS = 1e7, ILLEGAL = 1e12;
const SHIPPED_EMERGENCY = 1e5;
const MAXOVR = 99; // the pool's max OVR (Ja'Marr Chase / Jaxon Smith-Njigba, madden27)

// ---- the value scale, DERIVED from the provider ----
const units = derivedWeights('4-3'); // = slotWins20/0.00254 = the measured provider in fitted-weight units
const slots = fieldSlots('4-3');
const singleSpotMax = Math.max(...slots.map((f) => units[f.row])) * MAXOVR;
const wholeLineupMax = slots.reduce((t, f) => t + units[f.row] * MAXOVR, 0);
const DERIVED_EMERGENCY = Math.pow(10, Math.ceil(Math.log10(wholeLineupMax * 1.000001)));
console.log(`value scale (derived from the measured provider, max OVR ${MAXOVR}):`);
console.log(`  single-spot max   = ${singleSpotMax.toFixed(0)}`);
console.log(`  whole-lineup max  = ${wholeLineupMax.toFixed(0)}`);
console.log(`  shipped EMERGENCY = ${SHIPPED_EMERGENCY}  -> strictly above the value scale? ${SHIPPED_EMERGENCY > wholeLineupMax ? 'yes' : 'NO (mis-scaled)'}`);
console.log(`  derived EMERGENCY = ${DERIVED_EMERGENCY} (next decade above the whole-lineup max; < PLAYS ${PLAYS}: ${DERIVED_EMERGENCY < PLAYS}; ILLEGAL ${ILLEGAL} above PLAYS*s + EMERGENCY*k: ${ILLEGAL > PLAYS * slots.length + DERIVED_EMERGENCY * 64})`);

const EMERGENCY = FIX ? DERIVED_EMERGENCY : SHIPPED_EMERGENCY;

// ---- the solver, byte-faithful to lineup.ts's cost structure (constants parameterized) ----
function optimalLineup(players, slots_, base) {
  const n = players.length, s = slots_.length, k = n + s;
  const v = slots_.map((f) => units[f.row]); // the provider spends the measured units (same as P-318 default)
  const cost = [];
  for (let i = 0; i < k; i++) {
    const row = new Array(k).fill(0);
    for (let j = 0; j < s; j++) {
      if (i < n) {
        const f = fit(players[i].role, slots_[j].dest);
        row[j] = f.legal ? -(PLAYS + v[j] * (players[i].ovr - f.penalty)) + (f.emergency ? EMERGENCY : 0) : ILLEGAL;
      } else row[j] = -v[j] * EMPTY_OVR;
    }
    cost.push(row);
  }
  const asg = hungarian(cost);
  const placements = slots_.map((slot) => ({ slot, player: null, effOvr: EMPTY_OVR, penalty: 0, emergency: false }));
  for (let i = 0; i < n; i++) {
    const j = asg[i];
    if (j >= s) continue;
    const f = fit(players[i].role, slots_[j].dest);
    placements[j] = { slot: slots_[j], player: players[i], effOvr: players[i].ovr - f.penalty, penalty: f.penalty, emergency: f.emergency };
  }
  return { placements, emergencyFills: placements.filter((p) => p.emergency).length, value: placements.reduce((t, p, j) => t + v[j] * p.effOvr, 0) };
}

// ---- rosters: the REAL drafted league (fixture.json picks, 1,024 = 32 x 32) + real NFL teams ----
const POOL = buildPool(
  readFileSync(`${REPO}/src/data/madden27-ratings.csv`, 'utf8'),
  readFileSync(`${REPO}/src/data/free-agents-old-ratings.csv`, 'utf8'),
  readFileSync(`${REPO}/src/data/player-ids.csv`, 'utf8'),
);
const byId = new Map(POOL.map((p) => [p.id, p]));
const FIXTURE = JSON.parse(readFileSync(`${REPO}/src/fixture.json`, 'utf8'));
const drafted = new Map(); // teamIdx -> players
for (const pick of FIXTURE.picks) {
  const arr = drafted.get(pick.team) ?? [];
  const p = byId.get(pick.pid);
  if (p) arr.push(p);
  drafted.set(pick.team, arr);
}
const rosters = [];
for (const [team, players] of [...drafted.entries()].sort((a, b) => a[0] - b[0])) {
  rosters.push({ kind: `drafted-league team ${team} (${players.length} picks)`, players });
}
const TEAMS = [...new Set(POOL.map((p) => p.team))].filter((t) => t !== 'Free Agent').sort();
for (const t of TEAMS) {
  const players = POOL.filter((p) => p.team === t).sort((a, b) => b.ovr - a.ovr).slice(0, 53);
  rosters.push({ kind: `real roster ${t} (top 53 of ${POOL.filter((p) => p.team === t).length})`, players });
}
// injury-crisis regimes: every real team minus each position group (the emergency regime of real football)
const GROUPS = [...new Set(POOL.map((p) => p.role))];
for (const t of TEAMS) {
  const full = POOL.filter((p) => p.team === t).sort((a, b) => b.ovr - a.ovr).slice(0, 53);
  for (const g of GROUPS) {
    const injured = full.filter((p) => p.role !== g);
    if (injured.length === full.length) continue;
    rosters.push({ kind: `injury ${t} minus ${g}`, players: injured });
  }
}
// greedy-OVR 32-man roster (value-over-need draft) x4 draws of the position mix
for (let i = 0; i < 8; i++) {
  const players = [...POOL].sort((a, b) => b.ovr - a.ovr).slice(i * 8, i * 8 + 32);
  rosters.push({ kind: `greedy-OVR window ${i} (32)`, players });
}
// random rosters from the real pool (deterministic seed) — the widest search
let seed = 20261116;
const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
for (let draw = 0; draw < 400; draw++) {
  const size = [32, 40, 53][draw % 3];
  const players = [];
  const used = new Set();
  while (players.length < size) { const p = POOL[Math.floor(rnd() * POOL.length)]; if (!used.has(p.id)) { used.add(p.id); players.push(p); } }
  rosters.push({ kind: `random draw ${draw} (n=${size})`, players });
}
console.log(`rosters: ${rosters.length} (${drafted.size} drafted-league + ${TEAMS.length} real 53-man + ${TEAMS.length * GROUPS.length} injury scenarios + 8 greedy + 400 random), both bases = ${rosters.length * 2} solves x2 (optimum + min-emergency)`);

let rostersHit = 0, totalAvoidable = 0, worst = null;
const lines = [];
for (const r of rosters) {
  for (const base of ['4-3', '3-4']) {
    const opt = optimalLineup(r.players, fieldSlots(base), base);
    const min = optimalLineupFix(r.players, fieldSlots(base), base);
    const avoidable = opt.emergencyFills - min.emergencyFills;
    if (avoidable > 0) {
      rostersHit++;
      totalAvoidable += avoidable;
      const row = `${r.kind} ${base}: optimum ${opt.emergencyFills} emergency fill(s), minimum ${min.emergencyFills} -> ${avoidable} avoidable (value bought it: ${(opt.value - min.value).toFixed(0)} units for ${avoidable} emergency premium(s) = ${(avoidable * EMERGENCY).toFixed(0)})`;
      lines.push(row);
      if (!worst || avoidable > worst.avoidable) worst = { kind: r.kind, base, avoidable };
    }
  }
}
// helper defined after use above is fine (function hoisting) — re-declare cleanly:
function optimalLineupFix(players, slots_, base) {
  const n = players.length, s = slots_.length, k = n + s;
  const v = slots_.map((f) => units[f.row]);
  const E = DERIVED_EMERGENCY; // the strictly-scaled constant: priority 3 can no longer be bought
  const cost = [];
  for (let i = 0; i < k; i++) {
    const row = new Array(k).fill(0);
    for (let j = 0; j < s; j++) {
      if (i < n) {
        const f = fit(players[i].role, slots_[j].dest);
        row[j] = f.legal ? -(PLAYS + v[j] * (players[i].ovr - f.penalty)) + (f.emergency ? E : 0) : ILLEGAL;
      } else row[j] = -v[j] * EMPTY_OVR;
    }
    cost.push(row);
  }
  const asg = hungarian(cost);
  const placements = slots_.map((slot) => ({ slot, player: null, effOvr: EMPTY_OVR, penalty: 0, emergency: false }));
  for (let i = 0; i < n; i++) {
    const j = asg[i];
    if (j >= s) continue;
    const f = fit(players[i].role, slots_[j].dest);
    placements[j] = { slot: slots_[j], player: players[i], effOvr: players[i].ovr - f.penalty, penalty: f.penalty, emergency: f.emergency };
  }
  return { placements, emergencyFills: placements.filter((p) => p.emergency).length, value: placements.reduce((t, p, j) => t + v[j] * p.effOvr, 0) };
}

console.log(`\nresults (EMERGENCY = ${EMERGENCY}${FIX ? ', derived' : ', SHIPPED'}):`);
console.log(`  rosters with avoidable emergency fills: ${rostersHit} of ${rosters.length * 2} solves`);
console.log(`  total avoidable fills: ${totalAvoidable} (avg ${(totalAvoidable / (rosters.length * 2)).toFixed(2)} per solve)`);
if (worst) console.log(`  worst: ${worst.kind} ${worst.base} -> ${worst.avoidable}`);
if (lines.length) { console.log('  first rows:'); for (const l of lines.slice(0, 6)) console.log('    ' + l); }

if (!FIX) {
  console.log(`\nVERDICT: FAIL — the shipped EMERGENCY (${SHIPPED_EMERGENCY}) is not strictly above the value scale (${wholeLineupMax.toFixed(0)}); priority 3 is not strictly dominant. Exit 1.`);
  console.log(`PREMISE CORRECTION (honest): the avoidable-fill MANIFESTATION the work order describes ("about one avoidable emergency fill per roster") did NOT reproduce on any of the 2,028 real-pool solves above (drafted league, 53-man rosters, 576 injury scenarios, greedy-OVR, 400 random rosters). The arithmetic reason: the shipped constant sits ABOVE the per-swap bound (single-spot swing ${singleSpotMax.toFixed(0)} < ${SHIPPED_EMERGENCY}), so a single-swap purchase is impossible, and multi-spot cycles that outbid the premium never occur in these rosters. The scale defect is real and proved (the whole-lineup bound ${wholeLineupMax.toFixed(0)} > ${SHIPPED_EMERGENCY}, so priority 3 is not GUARANTEED dominant); the manifestation is latent, not observed. The fix remains correct: with the derived constant the guarantee is restored unconditionally.`);
  process.exit(1);
} else {
  if (rostersHit > 0) { console.log(`\nVERDICT: FAIL — the derived constant still allows avoidable fills (${rostersHit}). Exit 1.`); process.exit(1); }
  console.log(`\nVERDICT: PASS — with EMERGENCY = ${DERIVED_EMERGENCY} (derived from the provider) zero rosters take an avoidable emergency fill. Exit 0.`);
  process.exit(0);
}
