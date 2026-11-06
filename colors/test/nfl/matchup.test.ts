import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SLOTS, SLOT_IDS, fieldSlots } from '../../src/sports/nfl/engine/slots.ts';
import type { SlotId } from '../../src/sports/nfl/engine/slots.ts';
import { teamRatings, spotsFromRecord, spotsOf, leagueBaseline } from '../../src/sports/nfl/engine/ratings.ts';
import type { Ratings } from '../../src/sports/nfl/engine/ratings.ts';
import { matchupModel, softCap, normCdf, OFF_OPTS, DEF_OPTS } from '../../src/sports/nfl/engine/matchup.ts';
import { lineupFor } from '../../src/sports/nfl/engine/lineup.ts';
import type { Player, Role } from '../../src/sports/nfl/engine/players.ts';
import { teamIdentity, projectGame } from '../../src/sports/nfl/engine/plans.ts';
import { bestUnitPts, derivedWeights, flat, slotWins } from '../../src/sports/nfl/engine/value.ts';
import { RATING_SPECS, DEF_SPECS, PERS_REC } from '../../src/sports/nfl/engine/specs.ts';
import { HOME_FIELD } from '../../src/sports/nfl/engine/specs.ts';
import { withLegacyCoefficients } from './golden/legacy-coefficients.ts';

const golden = JSON.parse(fs.readFileSync(new URL('./golden/matchup-precolors.json', import.meta.url), 'utf8')) as {
  precolorsSha16: string; names: SlotId[]; teams: number[][]; ratings: Record<string, number>[]; league: Record<string, number>;
  cases: { o: number; d: number; plan: any; expRush: number; expPass: number; lamTO: number; lamSack: number; structPts: number; channels: Record<string, number>; sd: number; vm: number; planCost: number }[];
};
const rec = (o: number[]) => Object.fromEntries(golden.names.map((n, i) => [n, o[i]])) as Record<SlotId, number>;
// The oracle is the original engine, so its team ratings are rebuilt on the coefficients it had (golden/legacy-coefficients.ts): the Owner's
// salary-weight ruling of 6 Nov 2026 moved every spec row on purpose. The ratings are plain numbers, so the tests below that only need a
// plausible league (identity, projection) read them unchanged.
const R: Ratings[] = withLegacyCoefficients(() => golden.teams.map((o) => teamRatings(spotsFromRecord(rec(o)))));
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
  // MUSE audit finding 1 (Owner-approved 2 Nov): the defensive backs' run-support weights were reordered (SS > FS > CB1 > CB2), so the
  // four ratings that read them left the original engine by at most 0.82 points; every other unit rating is still exact.
  // 3 Nov (Owner-approved): the receiving spec was lowered for WR2 (0.91 to 0.70) and WR3 (0.53 to 0.45), so the receiving rating, and the
  // passing and overall ratings that read it, left the original engine (at most 4 points on these teams).
  const REORDERED = new Set(['frontRun', 'frontBase', 'frontNick', 'def']), RECSPEC = new Set(['rec', 'rec11', 'passOff', 'off']);
  const same = (a: number, b: number, k: string, what: string) => (REORDERED.has(k) ? assert.ok(Math.abs(a - b) < 1, `${what} ${k}: ${a} vs ${b}`) : RECSPEC.has(k) ? assert.ok(Math.abs(a - b) < 4, `${what} ${k}: ${a} vs ${b}`) : close(a, b, `${what} ${k}`));
  for (let t = 0; t < R.length; t++) for (const k of keys) { assert.ok(k in golden.ratings[t], 'oracle lacks ' + k); same((R[t] as any)[k], golden.ratings[t][k], k, `team ${t}`); }
  for (const k of keys) same((lg as any)[k], golden.league[k], k, 'league');
});
// The oracle is the ORIGINAL engine. On 2 Nov 2026 the yard model deliberately left it, twice: (audit 2) the offense is capped first and
// the defense subtracted after, so a defender stays worth something against a strong offense, with the outer run cap moved 0.42 to
// 0.33; (audit 1, Owner-approved) the defensive backs' run-support weights were reordered. Both keep every spot of the table within
// 2.5 (tests below). Yards, points and the channels built from them therefore differ from the oracle (bounded here); turnovers,
// sacks, spread and plan cost do not read those terms and stay exact on all cases.
test('golden: matchupModel equals the original engine on turnovers, sacks, spread and plan cost; yards and points stay within the audit bounds', () => {
  golden.cases.forEach((c, i) => {
    const m = withLegacyCoefficients(() => matchupModel(R[c.o], R[c.d], lg, c.plan)), tag = `#${i} ${c.o}v${c.d} ${JSON.stringify(c.plan)}`;
    // 3 Nov (Owner-approved): a leaning defence pays a smaller 'predictability' charge (PLAN_K.defPredict 0.4 to 0.15), so the plan cost
    // is the original's plus 0.25 for a run or pass focus; the guess itself now carries the risk (tests in audit-fixes).
    const dl = 0.25 * Math.abs({ run: 1, neutral: 0, pass: -1 }[c.plan.def.focus as 'run' | 'neutral' | 'pass']);
    for (const k of ['lamTO', 'lamSack', 'sd', 'vm'] as const) close(m[k], c[k], `${tag} ${k}`);
    close(m.planCost, c.planCost + dl, `${tag} planCost`);
    for (const k of ['to', 'sack', 'kick']) close((m.channels as any)[k], c.channels[k], `${tag} channel ${k}`);
    close(m.channels.plan, c.channels.plan - dl, `${tag} channel plan`);
    assert.ok(Math.abs(m.expRush - c.expRush) / c.expRush < 0.65, `${tag} expRush ${m.expRush} vs ${c.expRush}`);
    assert.ok(Math.abs(m.expPass - c.expPass) / c.expPass < 0.3, `${tag} expPass ${m.expPass} vs ${c.expPass}`);
    assert.ok(Math.abs(m.structPts - c.structPts) / c.structPts < 0.3, `${tag} structPts ${m.structPts} vs ${c.structPts}`);
  });
});

// ---- the spot table is what the model implies ----
// Owner 6 Nov 2026 (claude/rulings/2026-11-06-owner-salary-weights.md): the table is the Owner's salary-based intent, and the measured
// slotWinsPerOvr may deviate from it by at most 50 per spot (the old contract was 2.5). The calibrator (tools/mathlab/calibrate-weights.mjs)
// lands every spot within 25.
test('table: all 32 spots measured on the model land within 50 of the Owner-approved weight (Owner 6 Nov 2026)', () => {
  const d = derivedWeights('4-3');
  for (const s of SLOTS) assert.ok(Math.abs(d[s.id] - s.weight) <= 50, `${s.id}: table ${s.weight}, measured ${d[s.id].toFixed(1)}`);
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
  // the 3-4 defence now reads the table (within 1%): the same position carries the same weight in both bases (Owner 2 Nov)
  const def34 = fieldSlots('3-4').filter((f) => SLOTS.find((s) => s.id === f.slot)!.unit === 'defense');
  for (const f of def34) assert.ok(Math.abs(b[f.slot] - f.weight) <= 50, `${f.slot}: table ${f.weight}, measured ${b[f.slot].toFixed(1)}`);   // within the Owner's 50 (6 Nov 2026), judged by absolute error
  const ratios = def34.filter((f) => f.weight >= 200).map((f) => b[f.slot] / f.weight);
  assert.ok(Math.max(...ratios) - Math.min(...ratios) < 0.04, ratios.map((r) => r.toFixed(3)).join(' '));
  assert.ok(Math.max(...ratios) < 1.06 && Math.min(...ratios) > 0.97, ratios.map((r) => r.toFixed(3)).join(' '));   // same position, same weight in both bases; since 6 Nov 2026 the defence reads about 4% above the table (each spec's coefficients sum to a fixed total, so the Owner's targets cannot all be met exactly), well inside the 50 room
});
test('formation: in a 3-4 each position measures what it does in a 4-3: ILB1 = MIKE, ILB2 = DT2, OLB1 = WILL, OLB2 = SAM (Owner 2 Nov)', () => {
  const a = derivedWeights('4-3'), b = derivedWeights('3-4');
  assert.ok(Math.abs(b.MIKE - a.MIKE) < 1, `ILB1 ${b.MIKE} vs MIKE ${a.MIKE}`);
  assert.ok(Math.abs(b.DT2 - a.DT2) < 1, `ILB2 ${b.DT2} vs 4-3 DT2 ${a.DT2}`);
  assert.ok(Math.abs(b.WILL - a.WILL) < 1, `OLB1 ${b.WILL} vs WILL ${a.WILL}`);
  assert.ok(Math.abs(b.SAM - a.SAM) < 1, `OLB2 ${b.SAM} vs SAM ${a.SAM}`);
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
test('model: points scale as the table says (weight x 0.00254 wins per 20 OVR, 32.5 points a win): QB +10 and punter +10 (QB 1000, P 50)', () => {
  const ptsPerOvr = (w: number) => (w * 0.00254) / 20 * (32.5 / 17);   // points per game per OVR point
  const lo = teamRatings(spotsFromRecord(flat(80))), q = flat(80); q.QB = 90;
  const dq = matchupModel(teamRatings(spotsFromRecord(q)), lo, lo).structPts - matchupModel(lo, lo, lo).structPts;
  assert.ok(Math.abs(dq - 10 * ptsPerOvr(1000)) < 0.1 * 10 * ptsPerOvr(1000), `QB ${dq} vs ${10 * ptsPerOvr(1000)}`);
  const p = flat(80); p.P = 90;
  const dp = matchupModel(lo, lo, lo).structPts - matchupModel(lo, teamRatings(spotsFromRecord(p)), lo).structPts;
  assert.ok(Math.abs(dp - 10 * ptsPerOvr(50)) < 0.15 * 10 * ptsPerOvr(50), `P ${dp} vs ${10 * ptsPerOvr(50)}`);   // punter weight 50 (Owner 6 Nov 2026; was 100)
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
  assert.equal(rows.get('DT2'), 'DT2'); assert.equal(rows.get('SAM'), 'SAM'); assert.equal(rows.get('WILL'), 'WILL');
  const l4 = lineupFor(roster(80), '4-3');
  assert.ok(spotsOf(l4).every((s, i) => s.row === l4.placements[i].slot.slot));
});
test('formation: a better ILB2 (the DT2 spot) adds to the pass rush in a 3-4 as DT2 does in a 4-3, and OLB2 (SAM) adds none in either base', () => {
  const gain = (base: '4-3' | '3-4', slot: SlotId) => {
    const at = (v: number) => teamRatings(fieldSlots(base).map((f) => ({ row: f.row, ovr: f.slot === slot ? v : 80 }))).passRush;
    return at(95) - at(70);
  };
  assert.ok(gain('3-4', 'DT2') > 0.5, String(gain('3-4', 'DT2')));
  assert.ok(Math.abs(gain('3-4', 'DT2') - gain('4-3', 'DT2')) < 1e-9, 'ILB2 is graded exactly as DT2');
  assert.ok(Math.abs(gain('3-4', 'SAM')) < 0.05 && Math.abs(gain('4-3', 'SAM')) < 0.05, 'SAM carries no pass-rush weight in either base');
});
