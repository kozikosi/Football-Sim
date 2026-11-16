// P-333 option tester — builds flex-table variants of the engine in sibling dirs, then measures
// (1) the synthetic ideal-roster gap and (2) the real-roster base bias for each.
// Usage: node options.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SRC = '/tmp/p333/colors/src';
const ROOT = '/tmp/p333';
const WINS_PER_UNIT = 0.00254 / 20;

const VARIANTS = {
  base: { patch: (s) => s },
  A: { // lower the three 4-3 -> 3-4 stand-ins: SS>ILB 6->4, TE>NICKEL 6->4, FB>TE 2->0
    patch: (s) => s
      .replace('SS: { NICKEL: 0, DIME: 0, FS: 2, CB: 6, WR: 12, ILB: 6,', 'SS: { NICKEL: 0, DIME: 0, FS: 2, CB: 6, WR: 12, ILB: 4,')
      .replace('OLB: 6, ILB: 12, SS: 6, FS: 12, NICKEL: 6, DIME: 12 }', 'OLB: 6, ILB: 12, SS: 6, FS: 12, NICKEL: 4, DIME: 12 }')
      .replace('FB: { RB: 2, TE: 2 }', 'FB: { RB: 2, TE: 0 }'),
  },
  A2: { // single rule: SS>ILB 6 -> 4
    patch: (s) => s.replace('WR: 12, ILB: 6,', 'WR: 12, ILB: 4,'),
  },
  A3: { // two rules: SS>ILB 6->4 and TE>NICKEL 6->4 (FB exception untouched)
    patch: (s) => s
      .replace('WR: 12, ILB: 6,', 'WR: 12, ILB: 4,')
      .replace('OLB: 6, ILB: 12, SS: 6, FS: 12, NICKEL: 6, DIME: 12 }', 'OLB: 6, ILB: 12, SS: 6, FS: 12, NICKEL: 4, DIME: 12 }'),
  },
  B: { // raise the DL5 price for ILB/OLB: dl5Penalty uses EDGE x 1.5
    patch: (s) => s.replace(
      '  const a = FLEX[role].DT, b = FLEX[role].EDGE;\n  if (a === undefined) return b;\n  if (b === undefined) return a;\n  return Math.min(a, b);',
      '  const a = FLEX[role].DT, b = FLEX[role].EDGE;\n  const bump = (x) => (x === undefined ? x : Math.round(x * 1.5));\n  if (a === undefined) return bump(b);\n  if (b === undefined) return a;\n  return Math.min(a, bump(b));'),
  },
};

// build a variant engine dir
for (const [name, v] of Object.entries(VARIANTS)) {
  const dir = path.join(ROOT, 'var-' + name);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.cpSync(SRC, dir, { recursive: true });
  if (name !== 'base') {
    const f = path.join(dir, 'sports/nfl/engine/flex.ts');
    const before = fs.readFileSync(f, 'utf8');
    const after = v.patch(before);
    if (before === after) { console.error('PATCH DID NOT APPLY:', name); process.exit(1); }
    fs.writeFileSync(f, after);
  }
}

// the harness, parameterised by engine dir
const harness = `
import { fieldSlots, SLOTS, WEIGHT } from 'ENG/sports/nfl/engine/slots.ts';
import { lineupFor } from 'ENG/sports/nfl/engine/lineup.ts';
import { fit } from 'ENG/sports/nfl/engine/flex.ts';
import { tableValues } from 'ENG/sports/nfl/engine/valueprovider.ts';
import { buildPool } from 'ENG/sports/nfl/engine/players.ts';
import fs from 'node:fs';
const ROLE_OF_DEST = { NICKEL: 'CB', DIME: 'CB', DL5: 'DT' };
const mk = (role, ovr, i) => ({ id: 'p' + i, name: 'P' + i, pos: role, role, team: 'T', ovr, spd: 80, str: 80, freeAgent: false });
const rosterFor = (base, ovr) => fieldSlots(base).map((s, i) => mk(ROLE_OF_DEST[s.dest] || s.dest, ovr, i));
const V = tableValues(WEIGHT);
const l43 = lineupFor(rosterFor('4-3', 80), '4-3', V), l43f = lineupFor(rosterFor('4-3', 80), '3-4', V);
const l34 = lineupFor(rosterFor('3-4', 80), '3-4', V), l34f = lineupFor(rosterFor('3-4', 80), '4-3', V);
const loss43 = l43.value - l43f.value, loss34 = l34.value - l34f.value;
const st = (l) => l.placements.filter((p) => p.player && p.penalty > 0).map((p) => p.player.role + '>' + p.slot.slot + '@' + p.penalty).join(', ') || '-';
const players = buildPool(fs.readFileSync('/tmp/p333/colors/src/data/madden27-ratings.csv','utf8'), fs.readFileSync('/tmp/p333/colors/src/data/free-agents-old-ratings.csv','utf8'), fs.readFileSync('/tmp/p333/colors/src/data/player-ids.csv','utf8'));
const teams = [...new Set(players.filter((p) => !p.freeAgent).map((p) => p.team))].sort();
let s43 = 0, s34 = 0, n43 = 0, n34 = 0, sum = 0, flexed = 0, spots = 0, em = 0;
for (const t of teams) {
  const roster = players.filter((p) => p.team === t);
  const a = lineupFor(roster, '4-3', V).value, b = lineupFor(roster, '3-4', V).value;
  sum += a - b;
  if (a > b) { s43 += a - b; n43++; } else if (b > a) { s34 += b - a; n34++; }
  for (const base of ['4-3','3-4']) { const l = lineupFor(roster, base, V); em += l.emergencyFills; for (const p of l.placements) { spots++; if (p.penalty > 0) flexed++; } }
}
console.log(JSON.stringify({
  loss43, loss34, gap: loss43 - loss34,
  gapWins: (loss43 - loss34) * 0.00254 / 20,
  standIns43: st(l43f), standIns34: st(l34f),
  realMeanSigned: sum / teams.length,
  realMeanSignedWins: (sum / teams.length) * 0.00254 / 20,
  built43: n43, built34: n34,
  meanLoss43: n43 ? s43 / n43 : 0, meanLoss34: n34 ? s34 / n34 : 0,
  flexedSpots: flexed, spots, emergencyFills: em,
}, null, 1));
`;

for (const name of Object.keys(VARIANTS)) {
  const dir = path.join(ROOT, 'var-' + name);
  const h = path.join(ROOT, 'h-' + name + '.mjs');
  fs.writeFileSync(h, harness.replaceAll('ENG', dir).replace('ROLE_OF_DEST', 'ROLE_OF_DEST'));
  console.log('===== variant ' + name + ' =====');
  try {
    console.log(execFileSync('node', ['--experimental-strip-types', h], { encoding: 'utf8', timeout: 300000 }));
  } catch (e) { console.log('ERROR', (e.stdout || '') + (e.stderr || '').toString().slice(0, 600)); }
}