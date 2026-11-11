// mathlab/flexcensus.mjs — READ-ONLY "exploit census": does the lineup optimizer actually cheat with a given flex table?
//   Adversary = the engine's own assignment problem (lineup.ts, Hungarian). Data = the 32 real Madden-27 rosters (data/nfl/madden27-ratings.csv).
//   Price tables are swappable (the engine's fit() reads the live table and cannot be injected without editing it, so this re-implements the SAME cost matrix
//   with a pluggable price; section SELF-CHECK proves it reproduces optimalLineup exactly under the live table before anything else is reported).
//   Scenarios: the real rosters as they are, then "stack" rosters where every team also holds one extra player of a role (the league's best real one, and a
//   hypothetical 95), which is the Owner's feared exploit (a star at a cheap spot moved to an expensive one).
// Nothing here edits the engine, flex.json or flex.ts, and no test suite is run. Run: node tools/mathlab/flexcensus.mjs
import fs from 'fs';
import { parseCsv } from '../../colors/src/sports/nfl/engine/players.ts';
import { fieldSlots } from '../../colors/src/sports/nfl/engine/slots.ts';
import { FLEX } from '../../colors/src/sports/nfl/engine/flex.ts';
import { optimalLineup, EMPTY_OVR, WINS_PER_UNIT } from '../../colors/src/sports/nfl/engine/lineup.ts';
import { hungarian } from '../../colors/src/core/hungarian.ts';

const out = []; const log = (...a) => { const s = a.join(' '); console.log(s); out.push(s); };
const pool = parseCsv(fs.readFileSync(new URL('../../data/nfl/madden27-ratings.csv', import.meta.url), 'utf8'), false);
const teams = [...new Set(pool.map((p) => p.team))].filter((t) => t !== 'Free Agent').sort();
const rosters = Object.fromEntries(teams.map((t) => [t, pool.filter((p) => p.team === t)]));
const slots = fieldSlots('4-3');

// ---- pluggable price (same rules as flex.ts fit(), overrides applied on top of the live table) ----
const mkFit = (ov = {}) => {
  const F = structuredClone(FLEX);
  for (const [k, v] of Object.entries(ov)) { const [s, d] = k.split('>'); F[s] = { ...F[s], [d]: v }; }
  const dl5 = (role) => (role === 'DT' || role === 'EDGE' ? 0 : [F[role].DT, F[role].EDGE].filter((x) => x !== undefined).sort((a, b) => a - b)[0]);
  return (role, dest) => {
    if (role === dest) return { penalty: 0, emergency: false, legal: true };
    const listed = dest === 'DL5' ? dl5(role) : F[role][dest];
    if (listed !== undefined) return { penalty: listed, emergency: false, legal: true };
    return role === 'QB' ? { penalty: 8, emergency: true, legal: false } : { penalty: 8, emergency: true, legal: true };
  };
};
// same constants as lineup.ts
const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;
function solve(players, fitFn) {
  const n = players.length, s = slots.length, k = n + s, cost = [];
  for (let i = 0; i < k; i++) {
    const row = new Array(k).fill(0);
    for (let j = 0; j < s; j++) {
      if (i < n) { const f = fitFn(players[i].role, slots[j].dest); row[j] = f.legal ? -(PLAYS + slots[j].weight * (players[i].ovr - f.penalty)) + (f.emergency ? EMERGENCY : 0) : ILLEGAL; }
      else row[j] = -slots[j].weight * EMPTY_OVR;
    }
    cost.push(row);
  }
  const asg = hungarian(cost), placed = [];
  let value = 0; const placements = slots.map((sl) => ({ slot: sl, player: null, penalty: 0, emergency: false, eff: EMPTY_OVR }));
  for (let i = 0; i < n; i++) { const j = asg[i]; if (j >= s) continue; const f = fitFn(players[i].role, slots[j].dest); placements[j] = { slot: slots[j], player: players[i], penalty: f.penalty, emergency: f.emergency, eff: players[i].ovr - f.penalty }; }
  for (const p of placements) { value += p.slot.weight * p.eff; if (p.player) placed.push(p); }
  return { placements, value };
}

// ---- SELF-CHECK: re-implementation == engine optimalLineup, live table, all 32 real rosters ----
const live = mkFit();
let maxDiff = 0;
for (const t of teams) {
  const a = solve(rosters[t], live).value, b = optimalLineup(rosters[t], slots).value;
  maxDiff = Math.max(maxDiff, Math.abs(a - b));
}
log('# flexcensus: does the lineup optimizer exploit a flex table? (read-only, 10 Nov 2026)');
log('SELF-CHECK: re-implemented solver vs engine optimalLineup, live table, 32 real rosters: max |value diff| =', maxDiff, maxDiff === 0 ? '(identical)' : '(MISMATCH: stop, results below are not trustworthy)');
if (maxDiff !== 0) { fs.writeFileSync(new URL('./results/flexcensus-2026-11-10.md', import.meta.url), out.join('\n') + '\n'); process.exit(1); }

// ---- tables ----
const TABLES = {
  'T0 live (C>OT 12, C>DT 12, C>OG 6, FB>RB 2)': {},
  'T1 centre ability-only (C>OT 6, C>DT 9, C>OG 5)': { 'C>OT': 6, 'C>DT': 9, 'C>OG': 5 },
  'T2 centre cheap (C>OT 2, C>DT 2, C>OG 2)': { 'C>OT': 2, 'C>DT': 2, 'C>OG': 2 },
  'T3 FB at the guard (FB>RB 18, FB>TE 18)': { 'FB>RB': 18, 'FB>TE': 18 },
  'T4 centre at the guard (C>OT 12, C>DT 12, C>OG 10)': { 'C>OG': 10 },
};
const best = (role) => pool.filter((p) => p.role === role).sort((a, b) => b.ovr - a.ovr)[0];
const clone = (p, ovr, tag) => ({ ...p, id: 'ADV|' + tag, name: 'ADV ' + tag, team: 'ADV', ovr });
const SCEN = [
  { name: 'real rosters', add: null },
  { name: '+ league-best real C on every team', add: (r) => clone(best(r), best('C').ovr, 'C'), role: 'C' },
  { name: '+ hypothetical 95 C on every team', add: () => clone(best('C'), 95, 'C95'), role: 'C' },
  { name: '+ league-best real FB on every team', add: () => clone(best('FB'), best('FB').ovr, 'FB'), role: 'FB' },
  { name: '+ hypothetical 95 FB on every team', add: () => clone(best('FB'), 95, 'FB95'), role: 'FB' },
];
log('\nBest real players used as the stack: C', best('C').name, best('C').ovr, '| FB', best('FB').name, best('FB').ovr, '| 32 teams, slots = 4-3 (32 spots), roster sizes', Math.min(...teams.map((t) => rosters[t].length)) + '-' + Math.max(...teams.map((t) => rosters[t].length)));
log('\nCounts are over 32 teams. "flexed" = a placed player with penalty > 0 and NOT an emergency fill; "emerg" = emergency fills (a roster hole, not a choice).');
const base0 = {};
for (const sc of SCEN) {
  log('\n## Scenario:', sc.name);
  for (const [tn, ov] of Object.entries(TABLES)) {
    const f = mkFit(ov); let flexedTeams = 0, emerg = 0, advOut = 0, advPlaced = 0, valSum = 0; const groups = {}; const advWhere = {};
    for (const t of teams) {
      const roster = sc.add ? [...rosters[t], sc.add(sc.role)] : rosters[t];
      const r = solve(roster, f); valSum += r.value;
      let any = false;
      for (const p of r.placements) {
        if (!p.player) continue;
        if (p.emergency) { emerg++; continue; }
        if (p.penalty > 0) { any = true; const g = p.player.role + '>' + p.slot.dest; groups[g] = (groups[g] || 0) + 1; }
        if (p.player.id.startsWith('ADV|')) { advPlaced++; if (p.slot.dest !== p.player.role) { advOut++; advWhere[p.slot.dest] = (advWhere[p.slot.dest] || 0) + 1; } }
      }
      if (any) flexedTeams++;
    }
    if (!(sc.name in base0)) base0[sc.name] = {};
    base0[sc.name][tn] = valSum;
    const top = Object.entries(groups).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([g, c]) => g + ' ' + c).join(', ');
    const d = tn.startsWith('T0') ? '' : ' | wins/team/season vs T0: ' + (((valSum - base0[sc.name][Object.keys(TABLES)[0]]) / teams.length) * WINS_PER_UNIT).toFixed(3);
    log(`- ${tn}: teams with a flex ${flexedTeams}/32, emerg ${emerg}${sc.add ? ', stacked player out of position on ' + advOut + '/' + advPlaced + ' teams' + (advOut ? ' (to ' + Object.entries(advWhere).map(([d2, c]) => d2 + ' ' + c).join(', ') + ')' : '') : ''}${d}`);
    if (top) log('    top flexes:', top);
  }
}
// ---- break-even surplus (analytic, same objective): a star src with surplus s over his replacement flexes to dst iff s > p * w_dst / (w_dst - w_src) ----
log('\n## Break-even surplus s* = p * w_dst / (w_dst - w_src)  (OVR a star must beat his own in-position replacement by before the optimizer flexes him; lower = easier to exploit)');
const W = Object.fromEntries(slots.map((s) => [s.slot, s.weight]));
for (const [src, dst, p, ws, wd] of [['C', 'OT', 6, W.C, W.OT2], ['C', 'OT', 12, W.C, W.OT2], ['C', 'OT', 12, W.C, W.OT1], ['C', 'OG', 6, W.C, W.OG1], ['FB', 'RB', 2, W.FB, W.RB1], ['FB', 'RB', 18, W.FB, W.RB1], ['FB', 'TE', 6, W.FB, W.TE1]]) {
  log(`- ${src}>${dst} at ${p}: w_src ${ws}, w_dst ${wd}: s* = ${(p * wd / (wd - ws)).toFixed(1)} OVR`);
}
fs.writeFileSync(new URL('./results/flexcensus-2026-11-10.md', import.meta.url), out.join('\n') + '\n');
