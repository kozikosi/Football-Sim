// P-333 (Inkling): reproduce MUSE's 3-4 / 4-3 cross-formation gap on the pinned engine,
// then test alternative fixes. Run:
//   D=<scratch>; git archive origin/architect/engine-and-seats colors data | tar -x -C "$D"
//   cp formation-balance.mts "$D/" && cd "$D" && node formation-balance.mts
// Engine of record: origin/architect/engine-and-seats @ a7226810 (build 97d7e9d9). All players at 70 OVR.
import { lineupFor } from './colors/src/sports/nfl/engine/lineup.ts';
import { WEIGHT } from './colors/src/sports/nfl/engine/slots.ts';
import { SLOT_IDS } from './colors/src/sports/nfl/engine/slots.ts';
import { FLEX } from './colors/src/sports/nfl/engine/flex.ts';
import type { Role } from './colors/src/sports/nfl/engine/players.ts';

type Base = '4-3' | '3-4';
const mk = (roles: Role[]) => roles.map((role, i) => ({ id: 'p' + i, name: 'P' + i, pos: role, role, team: 'X', ovr: 70, spd: 70, str: 70, freeAgent: false }));
const OFF: Role[] = ['QB', 'RB', 'RB', 'FB', 'WR', 'WR', 'WR', 'WR', 'TE', 'TE', 'TE', 'OT', 'OT', 'OG', 'OG', 'C', 'K', 'P']; // 18
const DB: Role[] = ['CB', 'CB', 'CB', 'CB', 'FS', 'SS']; // 6 (CB1 CB2 CB3 DIME + FS SS)
const N43: Record<string, Role[]> = {
  '4-3 DL5=DT': ['EDGE', 'EDGE', 'DT', 'DT', 'DT', 'ILB', 'OLB', 'OLB'],
  '4-3 DL5=EDGE': ['EDGE', 'EDGE', 'EDGE', 'DT', 'DT', 'ILB', 'OLB', 'OLB'],
};
const N34: Record<string, Role[]> = {
  '3-4 DL5=DT': ['DT', 'DT', 'EDGE', 'EDGE', 'ILB', 'ILB', 'OLB', 'OLB'],
  '3-4 DL5=EDGE': ['DT', 'EDGE', 'EDGE', 'EDGE', 'ILB', 'ILB', 'OLB', 'OLB'],
};

for (const [n, fr] of Object.entries(N43)) {
  const r = mk([...OFF, ...fr, ...DB]);
  const v43 = lineupFor(r, '4-3').value, v34 = lineupFor(r, '3-4').value;
  console.log(n.padEnd(14), 'in 4-3:', v43, ' in 3-4:', v34, ' penalty:', v43 - v34);
}
for (const [n, fr] of Object.entries(N34)) {
  const r = mk([...OFF, ...fr, ...DB]);
  const v34 = lineupFor(r, '3-4').value, v43 = lineupFor(r, '4-3').value;
  console.log(n.padEnd(14), 'in 3-4:', v34, ' in 4-3:', v43, ' penalty:', v34 - v43);
}

// show placements of the cross-formation runs that MUSE reported (DL5=DT natives)
for (const [label, roles, base] of [
  ['4-3 native (DL5=DT) in 3-4', [...OFF, ...N43['4-3 DL5=DT'], ...DB], '3-4'],
  ['3-4 native (DL5=DT) in 4-3', [...OFF, ...N34['3-4 DL5=DT'], ...DB], '4-3'],
] as Array<[string, Role[], Base]>) {
  const l = lineupFor(mk(roles), base);
  console.log('\n=== ' + label + ' — value ' + l.value);
  for (const p of l.placements) {
    if (p.penalty) console.log(' ', p.slot.slot, '(dest ' + p.slot.dest + ', w ' + p.slot.weight + ') <- ' + p.player?.role, 'pen ' + p.penalty, 'cost', p.slot.weight * p.penalty);
  }
}

// --- placements for the other three combos
for (const [label, roles, base] of [
  ['4-3 native (DL5=EDGE) in 3-4', [...OFF, ...N43['4-3 DL5=EDGE'], ...DB], '3-4'],
  ['3-4 native (DL5=EDGE) in 4-3', [...OFF, ...N34['3-4 DL5=EDGE'], ...DB], '4-3'],
  ['3-4 native (DL5=DT) in 4-3', [...OFF, ...N34['3-4 DL5=DT'], ...DB], '4-3'],
] as Array<[string, Role[], Base]>) {
  const l = lineupFor(mk(roles), base);
  console.log('\n=== ' + label + ' — value ' + l.value);
  for (const p of l.placements) if (p.penalty) console.log(' ', p.slot.slot, '(dest ' + p.slot.dest + ', w ' + p.slot.weight + ') <- ' + p.player?.role, 'pen ' + p.penalty, 'cost', p.slot.weight * p.penalty);
}

// --- option matrix: mutate FLEX in memory and re-measure
const withFlex = (mut: (f: any) => void, run: () => void) => { const saved = JSON.parse(JSON.stringify(FLEX)); mut(FLEX); run(); for (const k of Object.keys(FLEX)) delete (FLEX as any)[k]; Object.assign(FLEX, saved); };
const measure = (label: string) => {
  const r43 = mk([...OFF, ...N43['4-3 DL5=DT'], ...DB]);
  const r34 = mk([...OFF, ...N34['3-4 DL5=DT'], ...DB]);
  const a = lineupFor(r43, '4-3').value - lineupFor(r43, '3-4').value;
  const b = lineupFor(r34, '3-4').value - lineupFor(r34, '4-3').value;
  console.log(label.padEnd(64), '4-3→3-4', a, ' 3-4→4-3', b, ' gap', a - b);
};
console.log('\n=== option matrix (DL5=DT natives, matching MUSE)');
measure('current (99 rules)');
withFlex(f => { f.TE.DIME = 6; }, () => measure('A: TE>DIME 12→6'));
withFlex(f => { f.TE.DIME = 6; f.ILB.DIME = 6; f.OLB.DIME = 6; f.FB.TE = 2; }, () => measure('B (Owner): TE>DIME 6, ILB>DIME 6, OLB>DIME 6, FB>TE 2'));
withFlex(f => { f.TE.DIME = 2; f.ILB.DIME = 2; f.OLB.DIME = 2; f.FB.TE = 2; }, () => measure('C: all DIME 12→2, FB>TE 2'));
withFlex(f => { f.TE.DIME = 0; f.ILB.DIME = 0; f.OLB.DIME = 0; f.FB.TE = 0; }, () => measure('D: DIME rules 0, FB>TE 0'));
withFlex(f => { f.FB.TE = 2; }, () => measure('FB>TE 6→2 only'));
withFlex(f => { f.TE.DIME = 6; f.FB.TE = 2; }, () => measure('A+FB: TE>DIME 6, FB>TE 2'));
withFlex(f => { f.TE.DIME = 6; f.TE.FS = 6; }, () => measure('TE>DIME 6, TE>FS 12→6'));
withFlex(f => { f.TE.DIME = 6; f.ILB.DIME = 6; f.OLB.DIME = 6; }, () => measure('DIME-only consistency (no FB move)'));
withFlex(f => { f.FB.TE = 2; f.FB.RB = 0; }, () => measure('FB>TE 2 + FB>RB 2→0'));

// --- full 2x2 under Option B (DL5 role in the native)
const measure2 = (label: string) => {
  for (const [n43, n34] of [['4-3 DL5=DT', '3-4 DL5=DT'], ['4-3 DL5=EDGE', '3-4 DL5=EDGE'], ['4-3 DL5=DT', '3-4 DL5=EDGE'], ['4-3 DL5=EDGE', '3-4 DL5=DT']] as const) {
    const r43 = mk([...OFF, ...N43[n43], ...DB]);
    const r34 = mk([...OFF, ...N34[n34], ...DB]);
    const a = lineupFor(r43, '4-3').value - lineupFor(r43, '3-4').value;
    const b = lineupFor(r34, '3-4').value - lineupFor(r34, '4-3').value;
    console.log(label.padEnd(10), n43, 'vs', n34, '→ 4-3→3-4', a, ' 3-4→4-3', b, ' gap', a - b);
  }
};
console.log('\n=== full matrix, current'); measure2('current');
withFlex(f => { f.TE.DIME = 6; f.ILB.DIME = 6; f.OLB.DIME = 6; f.FB.TE = 2; }, () => { console.log('\n=== full matrix, Option B'); measure2('Option B'); });
