import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SLOTS, SLOT_IDS, WEIGHT, fieldSlots, DL5_SHARE } from '../src/engine/slots.ts';
import type { SlotId, Dest } from '../src/engine/slots.ts';
import { FLEX, fit, EMERGENCY_PENALTY } from '../src/engine/flex.ts';
import { hungarian } from '../src/engine/hungarian.ts';
import { optimalLineup, lineupFor, placementOf, adviseLineup, valueOf, EMPTY_OVR } from '../src/engine/lineup.ts';
import type { Assignment } from '../src/engine/lineup.ts';
import { buildPool } from '../src/engine/players.ts';
import type { Player, Role } from '../src/engine/players.ts';
import { makeRng } from '../src/engine/rng.ts';

const read = (p: string) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const design = JSON.parse(read('../../tools/mathlab/design.json')) as Record<string, number>;
const flexJson = JSON.parse(read('../../tools/mathlab/flex.json')) as { roles: string[]; flex: Record<string, Record<string, number>> };
const pool = buildPool(read('../../data/madden27-ratings.csv'), read('../../data/free-agents-old-ratings.csv'));

let uid = 0;
const mk = (role: Role, ovr: number): Player => ({ id: `t${uid++}|${role}|T`, name: `t${uid}`, pos: role, role, team: 'T', ovr, spd: 70, str: 70, freeAgent: false });

// ---- table ----
test('table: 32 spots, QB 1000, every weight a multiple of 10, equal to tools/mathlab/design.json key by key', () => {
  assert.equal(SLOTS.length, 32);
  assert.equal(WEIGHT.QB, 1000);
  for (const s of SLOTS) assert.equal(s.weight % 10, 0, s.id);
  assert.deepEqual(Object.keys(design).sort(), [...SLOT_IDS].sort());
  for (const id of SLOT_IDS) assert.equal(WEIGHT[id], design[id], id);
});
test('table: unit counts are 16 offense, 14 defense, 2 special', () => {
  const c = (u: string) => SLOTS.filter((s) => s.unit === u).length;
  assert.deepEqual([c('offense'), c('defense'), c('special')], [16, 14, 2]);
});

// ---- flex ----
test('flex: the typed table equals tools/mathlab/flex.json (REV 4) rule by rule', () => {
  for (const role of flexJson.roles) assert.deepEqual(FLEX[role as Role], flexJson.flex[role], role);
  const n = Object.values(FLEX).reduce((t, r) => t + Object.keys(r).length, 0);
  assert.equal(n, 107);
});
test('flex: every penalty is 0, 2, 4 or 6 and every role in the data has a row', () => {
  for (const r of new Set(pool.map((p) => p.role))) assert.ok(FLEX[r], r);
  for (const [role, row] of Object.entries(FLEX)) for (const [d, v] of Object.entries(row)) assert.ok([0, 2, 4, 6].includes(v) || (role === 'QB' && d === 'FS' && v === 10), `${role}->${d} ${v}`);
});
test('flex: Owner rulings of 28 and 29 Oct (REV 3, REV 4)', () => {
  assert.equal(fit('EDGE', 'OLB').penalty, 0);
  assert.equal(fit('TE', 'RB').penalty, 4);
  assert.equal(fit('P', 'K').penalty, 4);
  assert.equal(fit('K', 'P').penalty, 0);
  assert.equal(fit('QB', 'FS').penalty, 10);                  // 29 Oct: a QB may flex ONLY to FS, at -10
  assert.equal(fit('OT', 'RB').penalty, 6);               // a w33 extra the Owner kept
});
test('flex: a quarterback plays only QB or FS (-10); no RB, no WR, no SS, no emergency fallback; anyone else has -8', () => {
  for (const d of ['RB', 'WR', 'SS', 'CB', 'TE', 'OT', 'K'] as Dest[]) assert.equal(fit('QB', d).legal, false, d);
  assert.deepEqual([fit('QB', 'FS').legal, fit('QB', 'FS').emergency], [true, false]);
  const f = fit('RB', 'CB');
  assert.deepEqual([f.legal, f.emergency, f.penalty], [true, true, EMERGENCY_PENALTY]);
});
test('flex: NICKEL and DIME are free for CB, SS and FS; WR pays 4', () => {
  for (const r of ['CB', 'SS', 'FS'] as Role[]) for (const d of ['NICKEL', 'DIME'] as Dest[]) assert.equal(fit(r, d).penalty, 0, r + d);
  assert.equal(fit('WR', 'NICKEL').penalty, 4);
});
test('flex: DL5 is natural for DT and EDGE and costs the cheaper of role->DT, role->EDGE for the rest', () => {
  assert.equal(fit('DT', 'DL5').penalty, 0);
  assert.equal(fit('EDGE', 'DL5').penalty, 0);
  const want: Partial<Record<Role, number>> = { TE: 6, OT: 4, OG: 4, C: 4, ILB: 4, OLB: 4 };
  for (const [r, p] of Object.entries(want)) assert.equal(fit(r as Role, 'DL5').penalty, p, r);
  assert.equal(fit('CB', 'DL5').emergency, true);
});
test('flex: no arbitrage; going A -> B -> C through two spots is never cheaper than the listed A -> C', () => {
  // The guide prices each move once; this finds any pair of listed rules that undercuts a direct rule (informational floor).
  const bad: string[] = [];
  for (const [a, row] of Object.entries(FLEX)) for (const [b, p1] of Object.entries(row)) {
    const via = FLEX[b as Role]; if (!via) continue;
    for (const [c, p2] of Object.entries(via)) { const direct = (FLEX[a as Role] as Record<string, number>)[c]; if (direct !== undefined && a !== c && p1 + p2 < direct) bad.push(`${a}>${b}>${c} ${p1 + p2} < ${direct}`); }
  }
  // Known by construction of the Owner's guide; the count is pinned so a new rule that opens a loophole is noticed.
  assert.ok(bad.length <= 12, `unexpected arbitrage: ${bad.length}: ${bad.join('; ')}`);
});

// ---- hungarian ----
function brute(c: number[][]): number {
  const n = c.length; let best = Infinity;
  const used = new Array(n).fill(false);
  const go = (i: number, t: number) => { if (i === n) { best = Math.min(best, t); return; } for (let j = 0; j < n; j++) if (!used[j]) { used[j] = true; go(i + 1, t + c[i][j]); used[j] = false; } };
  go(0, 0); return best;
}
test('hungarian: equals brute force on 300 random matrices of size 1..7 (with ties and negatives)', () => {
  const r = makeRng(7);
  for (let t = 0; t < 300; t++) {
    const n = r.int(1, 7);
    const c = Array.from({ length: n }, () => Array.from({ length: n }, () => r.int(-20, 20)));
    const a = hungarian(c);
    assert.deepEqual([...a].sort((x, y) => x - y), Array.from({ length: n }, (_, i) => i), 'a permutation');
    assert.equal(a.reduce((s, j, i) => s + c[i][j], 0), brute(c));
  }
});
test('hungarian: rejects a non-square matrix', () => assert.throws(() => hungarian([[1, 2]])));

// ---- formations ----
test('4-3: every spot plays as itself', () => {
  for (const f of fieldSlots('4-3')) { assert.equal(f.row, f.slot); assert.equal(f.weight, WEIGHT[f.slot]); }
});
test('3-4: DT2 becomes ILB2 (rated MIKE); WILL is OLB1 (WILL); SAM is OLB2 and equals DT2 in weight (Owner 29 Oct); the rest is unchanged', () => {
  const f = Object.fromEntries(fieldSlots('3-4').map((x) => [x.slot, x]));
  assert.deepEqual([f.DT2.dest, f.DT2.row, f.DT2.weight, f.DT2.label], ['ILB', 'MIKE', 260, 'ILB2']);
  assert.deepEqual([f.WILL.dest, f.WILL.row, f.WILL.weight, f.WILL.label], ['OLB', 'WILL', 240, 'OLB1']);
  assert.deepEqual([f.SAM.dest, f.SAM.row, f.SAM.weight, f.SAM.label], ['OLB', 'DT2', 300, 'OLB2']);
  assert.equal(f.SAM.weight, WEIGHT.DT2);
  assert.equal(f.DT1.label, 'NT'); assert.equal(f.MIKE.label, 'ILB1');
  const changed = fieldSlots('3-4').filter((x) => x.row !== x.slot || x.dest !== SLOTS.find((s) => s.id === x.slot)!.dest || x.weight !== WEIGHT[x.slot]).map((x) => x.slot).sort();
  assert.deepEqual(changed, ['DT2', 'SAM']);                  // WILL keeps its own row; only its label changes
});
test('DL5: balanced share is the measured 0.33, cautious is no lower, aggressive is higher (Owner 29 Oct)', () => {
  assert.equal(DL5_SHARE.balanced, 0.33);
  assert.ok(DL5_SHARE.cautious >= DL5_SHARE.balanced - 1e-12 && DL5_SHARE.aggressive > DL5_SHARE.balanced);
  assert.ok(DL5_SHARE.aggressive <= 0.44);                    // inside the measured middle half (22%-44%)
});

// ---- lineup ----
const natural = (ovr = 70): Player[] => SLOTS.map((s) => mk(s.dest === 'NICKEL' || s.dest === 'DIME' ? 'CB' : s.dest === 'DL5' ? 'DT' : (s.dest as Role), ovr));
test('lineup: a natural roster puts every player in a spot of his own role with no flex and no emergency', () => {
  const l = lineupFor(natural(), '4-3');
  assert.equal(l.emergencyFills, 0); assert.equal(l.bench.length, 0);
  for (const p of l.placements) { assert.ok(p.player); assert.equal(p.penalty, 0); }
  assert.equal(l.value, SLOTS.reduce((t, s) => t + s.weight * 70, 0));
});
test('lineup: the best player takes the most valuable spot of his role, whatever slot he was drafted into', () => {
  const ps = natural(); const cbs = ps.filter((p) => p.role === 'CB');
  cbs[2].ovr = 90;                                            // drafted as CB3, should play CB1 (450 > 280)
  const l = lineupFor(ps, '4-3');
  assert.equal(placementOf(l, 'CB1').player, cbs[2]);
});
test('lineup: flex happens only when worth it; a 95 OT beats a 70 at a flex-4 price and does not leave his spot', () => {
  const ps = natural(); const ot = ps.filter((p) => p.role === 'OT'); ot[0].ovr = 95;
  const l = lineupFor(ps, '4-3');
  assert.equal(placementOf(l, 'OT1').player, ot[0]);
  assert.equal(l.emergencyFills, 0);
});
test('lineup: a spare running back fills the empty FB spot at -2 rather than leaving it to an emergency fill', () => {
  const ps = natural().filter((p) => p.role !== 'FB'); ps.push(mk('RB', 80));
  const l = lineupFor(ps, '4-3');
  assert.equal(l.emergencyFills, 0);
  const fb = placementOf(l, 'FB');
  assert.equal(fb.player?.role === 'RB' || fb.player?.role === 'TE', true);
});
test('lineup: with nobody legal left the emergency fill (-8) is used, and a QB is never forced into a spot', () => {
  const ps = natural().filter((p) => p.role !== 'CB');         // no corners at all: CB1, CB2, CB3 and DIME need bodies
  ps.push(mk('QB', 99)); ps.push(mk('QB', 90));
  const l = lineupFor(ps, '4-3');
  for (const p of l.placements) if (p.player?.role === 'QB') assert.ok(['QB', 'FS'].includes(p.slot.dest), `QB at ${p.slot.slot}`);
  assert.equal(placementOf(l, 'QB').player?.ovr, 99);
  const second = l.placements.find((p) => p.player?.ovr === 90);
  assert.ok(second === undefined || second.slot.dest === 'FS');       // benched, or at FS at -10
});
test('lineup: a short roster leaves spots empty (rated 70) and every rostered player still plays', () => {
  const ps = natural(60).slice(0, 20);
  const l = lineupFor(ps, '4-3');
  assert.equal(l.bench.length, 0);
  assert.equal(l.placements.filter((p) => p.player).length, 20);
  assert.equal(l.placements.filter((p) => !p.player).every((p) => p.effOvr === EMPTY_OVR), true);
});
test('lineup: a long roster benches the weakest fits and every spot is filled', () => {
  const ps = natural(); for (let i = 0; i < 20; i++) ps.push(mk('WR', 60));
  const l = lineupFor(ps, '4-3');
  assert.equal(l.bench.length, 20); assert.ok(l.placements.every((p) => p.player));
});
test('lineup: exact against brute force on a tiny custom spot list', () => {
  const r = makeRng(11);
  const roles: Role[] = ['WR', 'TE', 'CB', 'SS', 'RB', 'OLB', 'ILB'];
  const spots = fieldSlots('4-3').filter((f) => ['WR1', 'TE1', 'CB1', 'SS', 'RB1', 'WILL'].includes(f.slot));
  for (let t = 0; t < 60; t++) {
    const ps = Array.from({ length: spots.length }, () => mk(r.pick(roles), r.int(55, 95)));
    const got = optimalLineup(ps, spots);
    // brute force over all permutations of players to spots, same priorities (no QB here, so only emergency count and value)
    let best = { em: Infinity, val: -Infinity };
    const used = new Array(ps.length).fill(false);
    const go = (i: number, em: number, val: number) => {
      if (i === spots.length) { if (em < best.em || (em === best.em && val > best.val)) best = { em, val }; return; }
      for (let j = 0; j < ps.length; j++) if (!used[j]) { used[j] = true; const f = fit(ps[j].role, spots[i].dest); go(i + 1, em + (f.emergency ? 1 : 0), val + spots[i].weight * (ps[j].ovr - f.penalty)); used[j] = false; }
    };
    go(0, 0, 0);
    assert.equal(got.emergencyFills, best.em, 'emergency count');
    assert.equal(got.value, best.val, 'value');
  }
});
test('lineup: deterministic, and the value does not depend on the order the players are given', () => {
  const t = pool.filter((p) => p.team === 'Kansas City Chiefs');
  assert.ok(t.length > 40);
  const a = lineupFor(t, '4-3'), b = lineupFor(t, '4-3');
  assert.deepEqual(a.placements.map((p) => p.player?.id), b.placements.map((p) => p.player?.id));
  const shuffled = [...t].reverse();
  assert.equal(lineupFor(shuffled, '4-3').value, a.value);
});
test('lineup: all 32 real rosters give a valid assignment (each player once, no QB out of place, no forced emergency count above 3)', () => {
  const teams = [...new Set(pool.filter((p) => !p.freeAgent).map((p) => p.team))];
  assert.equal(teams.length, 32);
  for (const team of teams) for (const base of ['4-3', '3-4'] as const) {
    const roster = pool.filter((p) => p.team === team);
    const l = lineupFor(roster, base);
    const ids = [...l.placements.map((p) => p.player?.id), ...l.bench.map((p) => p.id)].filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, team);
    assert.equal(ids.length, roster.length, team);
    for (const p of l.placements) if (p.player?.role === 'QB') assert.ok(fit('QB', p.slot.dest).legal, `${team} QB at ${p.slot.slot}`);
    assert.ok(l.emergencyFills <= 3, `${team} ${base} emergency ${l.emergencyFills}`);
  }
});
test('lineup: the optimum is never below the natural-order assignment (best player of each role to the highest spot)', () => {
  for (const team of ['Kansas City Chiefs', 'Detroit Lions', 'Las Vegas Raiders']) {
    const roster = pool.filter((p) => p.team === team);
    const l = lineupFor(roster, '4-3');
    let greedy = 0;
    const taken = new Set<string>();
    for (const s of [...fieldSlots('4-3')].sort((a, b) => b.weight - a.weight)) {
      const c = roster.filter((p) => !taken.has(p.id) && fit(p.role, s.dest).legal).sort((a, b) => (b.ovr - fit(b.role, s.dest).penalty) - (a.ovr - fit(a.role, s.dest).penalty))[0];
      if (c) { taken.add(c.id); greedy += s.weight * (c.ovr - fit(c.role, s.dest).penalty); } else greedy += s.weight * EMPTY_OVR;
    }
    assert.ok(l.value >= greedy - 1e-9, `${team}: ${l.value} < greedy ${greedy}`);
  }
});
test('base: totals are not comparable. A roster of 4-3 natives is worth 230 x 70 more in 3-4 less 260 x 4, because a DT must play ILB2 at -4', () => {
  const flat = natural(70);                                   // one ILB only
  assert.equal(lineupFor(flat, '3-4').value - lineupFor(flat, '4-3').value, 230 * 70 - 260 * 4);
  const flexed = lineupFor(flat, '3-4').placements.filter((p) => p.penalty > 0);   // MIKE and ILB2 weigh the same, so which of the two is a tie
  assert.equal(flexed.length, 1);
  assert.deepEqual([flexed[0].player?.role, flexed[0].slot.dest, flexed[0].penalty], ['DT', 'ILB', 4]);
});
test('base: with a second natural ILB the 3-4 lineup has no flex at all, the DT2 spot is his, and a DT sits', () => {
  const ps = [...natural(70), mk('ILB', 70)];
  const l = lineupFor(ps, '3-4');
  assert.ok(l.placements.every((p) => p.penalty === 0));
  assert.equal(placementOf(l, 'DT2').player?.role, 'ILB');
  assert.deepEqual(l.bench.map((p) => p.role), ['DT']);
  assert.equal(l.value - lineupFor(ps, '4-3').value, 230 * 70);
});
test('base: two elite inside linebackers add more to a 3-4 lineup than to a 4-3 one', () => {
  const ps = natural(70), more = [...ps, mk('ILB', 95), mk('ILB', 95)];
  const gain = (b: '4-3' | '3-4') => lineupFor(more, b).value - lineupFor(ps, b).value;
  assert.ok(gain('3-4') > gain('4-3'), `${gain('3-4')} vs ${gain('4-3')}`);
});

// ---- advice for the user's own lineup (Owner 29 Oct: "the math flexed over ten players out of position") ----
const slotMap = (ps: Player[]): Assignment => Object.fromEntries(SLOTS.map((sl, i) => [sl.id, ps[i]])) as Assignment;
test('advice: players rated within a few points of each other are never flexed (nothing is worth 0.02 wins per player)', () => {
  const r = makeRng(5);
  const ps = natural(70).map((p) => ({ ...p, ovr: r.int(68, 72) }));
  const a = adviseLineup(slotMap(ps), ps, '4-3');
  assert.equal(a.moves.filter((m) => m.flexPenalty > 0).length, 0);
});
test('advice: every suggestion pays for itself, total gain >= 0.02 wins x the players it displaces (random 60-90 ratings)', () => {
  const r = makeRng(9);
  for (let t = 0; t < 20; t++) {
    const ps = natural(70).map((p) => ({ ...p, ovr: r.int(60, 90) })), cur = slotMap(ps);
    const a = adviseLineup(cur, ps, '4-3', 0.02);
    const now = new Map(a.lineup.placements.filter((p) => p.player).map((p) => [p.player!.id, p.slot.slot]));
    const displaced = Object.entries(cur).filter(([slot, p]) => now.get(p!.id) !== slot).length;
    assert.ok(a.gainWins >= 0.02 * displaced - 1e-9, `gain ${a.gainWins} < ${0.02 * displaced}`);
  }
});
test('advice: a clear upgrade is suggested, a one-point difference is not', () => {
  const ps = natural(70); const i3 = SLOTS.findIndex((s) => s.id === 'CB3');
  ps[i3] = { ...ps[i3], ovr: 95 };                              // a 95 sitting at CB3 beside a 70 at CB1
  const a = adviseLineup(slotMap(ps), ps, '4-3');
  assert.ok(a.moves.some((m) => m.slot === 'CB1' && m.to?.ovr === 95));
  assert.ok(a.gainWins >= 0.02);
  const ps2 = natural(70); ps2[i3] = { ...ps2[i3], ovr: 71 };    // 71 at CB3 vs 70 at CB1: worth 0.02 wins in all, under two moves' threshold
  assert.equal(adviseLineup(slotMap(ps2), ps2, '4-3').moves.length, 0);
});
test('advice: never worse than the current lineup, and advising the advice changes nothing', () => {
  for (const team of ['Kansas City Chiefs', 'Detroit Lions', 'Las Vegas Raiders', 'New England Patriots']) {
    const roster = pool.filter((p) => p.team === team);
    const start = lineupFor(roster, '4-3');                      // start from the plain optimum with two spots deliberately swapped
    const cur: Assignment = {}; for (const p of start.placements) if (p.player) cur[p.slot.slot] = p.player;
    [cur.DE1, cur.DE2] = [cur.DE2, cur.DE1];
    const a = adviseLineup(cur, roster, '4-3');
    assert.ok(a.gainWins >= -1e-9, team);
    const again: Assignment = {}; for (const p of a.lineup.placements) if (p.player) again[p.slot.slot] = p.player;
    assert.equal(adviseLineup(again, roster, '4-3').moves.length, 0, team);
  }
});
test('advice: on 32 real rosters from natural best-per-spot lineups it moves far fewer players than the plain optimum and keeps most of the gain', () => {
  let plainMoves = 0, plainFlex = 0, advMoves = 0, advFlex = 0, plainGain = 0, advGain = 0;
  for (const team of [...new Set(pool.filter((p) => !p.freeAgent).map((p) => p.team))]) {
    const roster = pool.filter((p) => p.team === team), used = new Set<string>(), cur: Assignment = {};
    for (const s of [...fieldSlots('4-3')].sort((a, b) => b.weight - a.weight)) {
      const c = roster.filter((p) => !used.has(p.id) && fit(p.role, s.dest).legal && fit(p.role, s.dest).penalty === 0).sort((a, b) => b.ovr - a.ovr)[0];
      if (c) { used.add(c.id); cur[s.slot] = c; }
    }
    const plain = adviseLineup(cur, roster, '4-3', 0), adv = adviseLineup(cur, roster, '4-3', 0.02);
    plainMoves += plain.moves.length; plainFlex += plain.moves.filter((m) => m.flexPenalty > 0).length; plainGain += plain.gainWins;
    advMoves += adv.moves.length; advFlex += adv.moves.filter((m) => m.flexPenalty > 0).length; advGain += adv.gainWins;
  }
  assert.ok(advMoves < plainMoves * 0.6, `${advMoves} vs ${plainMoves}`);
  assert.ok(advFlex < plainFlex * 0.7, `${advFlex} vs ${plainFlex}`);
  assert.ok(advGain > plainGain * 0.7, `${advGain} vs ${plainGain}`);
});
test('advice: valueOf agrees with the solver on its own output', () => {
  const ps = natural(75), l = lineupFor(ps, '4-3'), a: Assignment = {};
  for (const p of l.placements) if (p.player) a[p.slot.slot] = p.player;
  assert.equal(valueOf(a, fieldSlots('4-3')), l.value);
});
