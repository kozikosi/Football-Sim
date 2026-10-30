import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SLOTS, SLOT_IDS, fieldSlots } from '../src/engine/slots.ts';
import type { SlotId } from '../src/engine/slots.ts';
import { teamRatings, spotsFromRecord, spotsOf, leagueBaseline } from '../src/engine/ratings.ts';
import type { Ratings } from '../src/engine/ratings.ts';
import { matchupModel, softCap, normCdf, OFF_OPTS, DEF_OPTS } from '../src/engine/matchup.ts';
import { lineupFor } from '../src/engine/lineup.ts';
import type { Player, Role } from '../src/engine/players.ts';
import { teamIdentity, projectGame } from '../src/engine/plans.ts';
import { bestUnitPts, derivedWeights, flat, slotWins } from '../src/engine/value.ts';
import { RATING_SPECS, DEF_SPECS, PERS_REC } from '../src/engine/specs.ts';
import { HOME_FIELD } from '../src/engine/specs.ts';

const golden = JSON.parse(fs.readFileSync(new URL('./golden/matchup-precolors.json', import.meta.url), 'utf8')) as {
  precolorsSha16: string; names: SlotId[]; teams: number[][]; ratings: Record<string, number>[]; league: Record<string, number>;
  cases: { o: number; d: number; plan: any; expRush: number; expPass: number; lamTO: number; lamSack: number; structPts: number; channels: Record<string, number>; sd: number; vm: number; planCost: number }[];
};
const rec = (o: number[]) => Object.fromEntries(golden.names.map((n, i) => [n, o[i]])) as Record<SlotId, number>;
const R: Ratings[] = golden.teams.map((o) => teamRatings(spotsFromRecord(rec(o))));
const lg = leagueBaseline(R);
const close = (a: number, b: number, what: string) => assert.ok(Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b)), `${what}: ${a} vs ${b}`);

// ---- golden: the original JavaScript (Pre-Colors + the lab's final patch) is the oracle ----
test('golden: oracle was built from Pre-Colors 40233d6be00e987c and covers 32 spots, 8 teams, dozens of plan cases', () => {
  assert.equal(golden.precolorsSha16, '40233d6be00e987c');
  assert.deepEqual([...golden.names].sort(), [...SLOT_IDS].sort());
  assert.equal(golden.teams.length, 8);
  assert.ok(golden.cases.length >= 30);
});
test('golden: every unit rating equals the original engine (all teams, all keys the port has)', () => {
  const keys = Object.keys(R[0]);
  for (let t = 0; t < R.length; t++) for (const k of keys) { assert.ok(k in golden.ratings[t], 'oracle lacks ' + k); close((R[t] as any)[k], golden.ratings[t][k], `team ${t} ${k}`); }
  for (const k of keys) close((lg as any)[k], golden.league[k], 'league ' + k);
});
test('golden: matchupModel equals the original engine on every case (yards, turnovers, sacks, points, channels, spread)', () => {
  for (const c of golden.cases) {
    const m = matchupModel(R[c.o], R[c.d], lg, c.plan), tag = `${c.o}v${c.d} ${JSON.stringify(c.plan)}`;
    for (const k of ['expRush', 'expPass', 'lamTO', 'lamSack', 'structPts', 'sd', 'vm', 'planCost'] as const) close(m[k], c[k], `${tag} ${k}`);
    for (const k of Object.keys(c.channels)) close((m.channels as any)[k], c.channels[k], `${tag} channel ${k}`);
  }
});

// ---- the spot table is what the model implies ----
test('table: all 32 spots measured on the model land within 2.5 of the Owner-approved weight (the modelWeights contract)', () => {
  const d = derivedWeights('4-3');
  for (const s of SLOTS) assert.ok(Math.abs(d[s.id] - s.weight) <= 2.5, `${s.id}: table ${s.weight}, measured ${d[s.id].toFixed(1)}`);
});
test('table: measured order has no inversion against the table (a heavier table spot is never measured lighter)', () => {
  const d = derivedWeights('4-3');
  for (const a of SLOTS) for (const b of SLOTS) if (a.weight > b.weight) assert.ok(d[a.id] > d[b.id], `${a.id} ${a.weight} vs ${b.id} ${b.weight}: ${d[a.id].toFixed(1)} vs ${d[b.id].toFixed(1)}`);
});
test('table: every spot is worth more as its player improves, on its own side of the ball', () => {
  for (const s of SLOTS) { let prev = -Infinity; for (let o = 50; o <= 99; o += 7) { const w = slotWins(s.id, o); assert.ok(w > prev - 1e-12, `${s.id} at ${o}`); prev = w; } }
});

// ---- formations: rated by spec row (Owner: ILB like MIKE, OLB1 like WILL, OLB2 like DT2) ----
test('formation: an all-80 team rates exactly 80 in every unit, in either base', () => {
  for (const base of ['4-3', '3-4'] as const) {
    const r = teamRatings(fieldSlots(base).map((f) => ({ row: f.row, ovr: 80 })));
    for (const k of ['olRun', 'olPass', 'rb', 'qb', 'rec', 'passRush', 'frontRun', 'coverage', 'kicker', 'frontBase', 'frontNick', 'covBase', 'covNick', 'covDime']) close((r as any)[k], 80, `${base} ${k}`);
  }
});
test('formation: 3-4 offence and special spots measure the same as in 4-3 (within 1), defence spots keep the table proportions', () => {
  const a = derivedWeights('4-3'), b = derivedWeights('3-4');
  for (const f of fieldSlots('3-4')) {
    const unit = SLOTS.find((s) => s.id === f.slot)!.unit;
    if (unit !== 'defense') assert.ok(Math.abs(b[f.slot] - a[f.slot]) <= 1, `${f.slot} ${a[f.slot]} vs ${b[f.slot]}`);
  }
  // the 3-4 defence reads a uniform few percent below the table; the proportions (measured / table weight) agree within 2%
  const ratios = fieldSlots('3-4').filter((f) => SLOTS.find((s) => s.id === f.slot)!.unit === 'defense').map((f) => b[f.slot] / f.weight);
  assert.ok(Math.max(...ratios) - Math.min(...ratios) < 0.04, ratios.map((r) => r.toFixed(3)).join(' '));
  assert.ok(Math.max(...ratios) < 1.0 && Math.min(...ratios) > 0.9, ratios.map((r) => r.toFixed(3)).join(' '));
});
test('formation: 3-4 ILB1 and ILB2 are worth the same (both MIKE), OLB2 is worth about a 4-3 DT2 and more than OLB1', () => {
  const a = derivedWeights('4-3'), b = derivedWeights('3-4');
  assert.ok(Math.abs(b.DT2 - b.MIKE) < 1, `ILB2 ${b.DT2} vs ILB1 ${b.MIKE}`);
  assert.ok(Math.abs(b.SAM - a.DT2) / a.DT2 < 0.08, `OLB2 ${b.SAM} vs 4-3 DT2 ${a.DT2}`);
  assert.ok(b.SAM > b.WILL, `OLB2 ${b.SAM} vs OLB1 ${b.WILL}`);
});

// ---- matchup properties that can fail ----
test('model: raising any single spot never lowers its own side\'s value (offence and kicker up, defence and punter up)', () => {
  const lgAll = teamRatings(spotsFromRecord(flat(80)));
  for (const s of SLOTS) {
    const lo = flat(80), hi = flat(80); hi[s.id] = 86;
    const isOff = s.id === 'K' || (s.id !== 'P' && s.unit === 'offense');
    const a = bestUnitPts(teamRatings(spotsFromRecord(lo)), lgAll, isOff), b = bestUnitPts(teamRatings(spotsFromRecord(hi)), lgAll, isOff);
    assert.ok(b >= a - 1e-12, `${s.id}: ${a} -> ${b}`);
  }
});
test('model: points scale as the table says (weight x 0.00254 wins per 20 OVR, 32.5 points a win): QB +10 and punter +10', () => {
  const ptsPerOvr = (w: number) => (w * 0.00254) / 20 * (32.5 / 17);   // points per game per OVR point
  const lo = teamRatings(spotsFromRecord(flat(80))), q = flat(80); q.QB = 90;
  const dq = matchupModel(teamRatings(spotsFromRecord(q)), lo, lo).structPts - matchupModel(lo, lo, lo).structPts;
  assert.ok(Math.abs(dq - 10 * ptsPerOvr(1000)) < 0.1 * 10 * ptsPerOvr(1000), `QB ${dq} vs ${10 * ptsPerOvr(1000)}`);
  const p = flat(80); p.P = 90;
  const dp = matchupModel(lo, lo, lo).structPts - matchupModel(lo, teamRatings(spotsFromRecord(p)), lo).structPts;
  assert.ok(Math.abs(dp - 10 * ptsPerOvr(100)) < 0.15 * 10 * ptsPerOvr(100), `P ${dp} vs ${10 * ptsPerOvr(100)}`);
});
test('model: softCap is the identity inside 60% of the cap and never exceeds the cap', () => {
  assert.equal(softCap(0.1, -1, 0.4), 0.1);
  assert.equal(softCap(-0.5, -1, 0.4), -0.5);
  for (const x of [0.3, 1, 50]) assert.ok(softCap(x, -1, 0.4) <= 0.4 && softCap(x, -1, 0.4) >= 0.24);
});
test('model: normCdf is a CDF (0.5 at 0, symmetric, monotone)', () => {
  assert.ok(Math.abs(normCdf(0) - 0.5) < 1e-6);
  assert.ok(Math.abs(normCdf(1.3) + normCdf(-1.3) - 1) < 1e-6);
  assert.ok(normCdf(0.5) < normCdf(0.6));
});
test('plans: 15 offensive and 6 defensive options; identity is deterministic and picks a plan from the lists', () => {
  assert.equal(OFF_OPTS.length, 15); assert.equal(DEF_OPTS.length, 6);
  const a = teamIdentity(R[0], lg), b = teamIdentity(R[0], lg);
  assert.deepEqual(a, b);
  assert.ok(OFF_OPTS.some((o) => o.pers === a.off.pers && o.strat === a.off.strat));
  assert.ok(DEF_OPTS.some((d) => d.pkg === a.def.pkg && d.focus === a.def.focus));
});
test('plans: a team with a great line and backs and a poor QB leans run, the reverse leans pass', () => {
  const run = flat(80), pass = flat(80);
  for (const s of ['OT1', 'OT2', 'OG1', 'OG2', 'C', 'RB1']) { run[s as SlotId] = 95; pass[s as SlotId] = 65; }
  run.QB = 65; pass.QB = 97;
  const base = teamRatings(spotsFromRecord(flat(80)));
  assert.ok(teamIdentity(teamRatings(spotsFromRecord(run)), base).tilt > 0);
  assert.ok(teamIdentity(teamRatings(spotsFromRecord(pass)), base).tilt < 0);
});
test('game: a stronger team is projected to win more often, home field helps, and the two sides\' probabilities mirror', () => {
  const order = R.map((r, i) => ({ i, v: bestUnitPts(r, lg, true) + bestUnitPts(r, lg, false) })).sort((a, b) => b.v - a.v);
  const hi = R[order[0].i], low = R[order[order.length - 1].i];
  const plans = { home: { off: OFF_OPTS[0], def: DEF_OPTS[0] }, away: { off: OFF_OPTS[0], def: DEF_OPTS[0] } };
  const g1 = projectGame(hi, low, lg, plans, HOME_FIELD), g2 = projectGame(low, hi, lg, plans, 0);
  assert.ok(g1.homeWinProb > 0.5 && g2.homeWinProb < 0.5);
  assert.ok(projectGame(low, hi, lg, plans, HOME_FIELD).homeWinProb > g2.homeWinProb);
  assert.ok(g1.homeWinProb > 0 && g1.homeWinProb < 1);
});
test('specs: every spec row names a real spot', () => {
  for (const sp of [...Object.values(RATING_SPECS), ...Object.values(DEF_SPECS), ...Object.values(PERS_REC)]) for (const k of Object.keys(sp)) assert.ok(SLOT_IDS.includes(k as SlotId), k);
});

// ---- a real 3-4 lineup is rated through the spec rows ----
const mk = (role: Role, ovr: number, i: number): Player => ({ id: `m${i}|${role}|T`, name: `m${i}`, pos: role, role, team: 'T', ovr, spd: 70, str: 70, freeAgent: false });
function roster(olb2: number): Player[] {
  const want: [Role, number][] = [['QB', 80], ['RB', 80], ['RB', 80], ['FB', 80], ['WR', 80], ['WR', 80], ['WR', 80], ['WR', 80], ['TE', 80], ['TE', 80], ['TE', 80], ['OT', 80], ['OT', 80], ['OG', 80], ['OG', 80], ['C', 80],
    ['EDGE', 80], ['EDGE', 80], ['DT', 80], ['DT', 80], ['DT', 80], ['ILB', 80], ['ILB', 80], ['OLB', 80], ['OLB', olb2], ['CB', 80], ['CB', 80], ['CB', 80], ['CB', 80], ['FS', 80], ['SS', 80], ['K', 80], ['P', 80]];
  return want.map(([r, o], i) => mk(r, o, i));
}
test('formation: a real 3-4 lineup is graded by spec row (spotsOf follows the formation, not the spot names)', () => {
  const l = lineupFor(roster(80), '3-4');
  const rows = new Map(spotsOf(l).map((s, i) => [l.placements[i].slot.slot, s.row]));
  assert.equal(rows.get('DT2'), 'MIKE'); assert.equal(rows.get('SAM'), 'DT2'); assert.equal(rows.get('WILL'), 'WILL');
  const l4 = lineupFor(roster(80), '4-3');
  assert.ok(spotsOf(l4).every((s, i) => s.row === l4.placements[i].slot.slot));
});
test('formation: a better player in the SAM spot adds to the pass rush in a 3-4 (OLB2, graded as DT2) and not in a 4-3 (the SAM row has no pass-rush weight)', () => {
  const gain = (base: '4-3' | '3-4') => {
    const at = (v: number) => teamRatings(fieldSlots(base).map((f) => ({ row: f.row, ovr: f.slot === 'SAM' ? v : 80 }))).passRush;
    return at(95) - at(70);
  };
  assert.ok(gain('3-4') > 0.5, String(gain('3-4')));
  assert.ok(Math.abs(gain('4-3')) < 0.05, String(gain('4-3')));
});
