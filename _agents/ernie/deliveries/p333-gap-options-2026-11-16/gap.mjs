// P-333 harness — measure the 4-3 / 3-4 formation gap on an engine tree.
// Usage: node gap.mjs <engineSrcDir>
//   <engineSrcDir> must contain core/ platform/ sports/ (i.e. the extracted colors/src).
import { fieldSlots, SLOTS } from './engineRoot/sports/nfl/engine/slots.ts';
import { lineupFor } from './engineRoot/sports/nfl/engine/lineup.ts';
import { fit } from './engineRoot/sports/nfl/engine/flex.ts';
import { tableValues, DEFAULT_VALUES } from './engineRoot/sports/nfl/engine/valueprovider.ts';
import { WEIGHT } from './engineRoot/sports/nfl/engine/slots.ts';

const ROLE_OF_DEST = { NICKEL: 'CB', DIME: 'CB', DL5: 'DT' };
const mk = (role, ovr, i) => ({ id: 'p' + i, name: 'P' + i, pos: role, role, team: 'T', ovr, spd: 80, str: 80, freeAgent: false });

// A roster of exactly one natural player per spot of a base, all at the same OVR.
function rosterFor(base, ovr) {
  return fieldSlots(base).map((s, i) => mk(ROLE_OF_DEST[s.dest] || s.dest, ovr, i));
}

const OV = 80;
const rosters = {
  '4-3': rosterFor('4-3', OV),
  '3-4': rosterFor('3-4', OV),
};

// value in table units (the SLOTS weights) and in measured wins-per-OVR units
const VALUE = {
  table: tableValues(WEIGHT),
  measured: DEFAULT_VALUES,
};

function valueOfBase(roster, base, values) {
  const l = lineupFor(roster, base, values);
  return { value: l.value, emergency: l.emergencyFills, bench: l.bench.length, l };
}

const out = {};
for (const [vname, values] of Object.entries(VALUE)) {
  const r43 = rosters['4-3'], r34 = rosters['3-4'];
  const a = valueOfBase(r43, '4-3', values);   // 4-3 roster at home
  const b = valueOfBase(r43, '3-4', values);   // 4-3 roster forced into 3-4
  const c = valueOfBase(r34, '3-4', values);   // 3-4 roster at home
  const d = valueOfBase(r34, '4-3', values);   // 3-4 roster forced into 4-3
  const loss43 = a.value - b.value;
  const loss34 = c.value - d.value;
  out[vname] = {
    home43: a.value, forced43: b.value, loss43,
    home34: c.value, forced34: d.value, loss34,
    gap: loss43 - loss34,
    emergency: { forced43: b.emergency, forced34: d.emergency },
    standIns: {
      forced43: b.l.placements.filter((p) => p.player && p.penalty > 0).map((p) => `${p.player.role}>${p.slot.slot}@${p.penalty}`),
      forced34: d.l.placements.filter((p) => p.player && p.penalty > 0).map((p) => `${p.player.role}>${p.slot.slot}@${p.penalty}`),
    },
  };
}
console.log(JSON.stringify(out, null, 1));
// wins conversion: table units -> wins is x WINS_PER_UNIT
const WINS_PER_UNIT = 0.00254 / 20;
console.log('\ngap in wins (table):', (out.table.gap * WINS_PER_UNIT).toFixed(4));
console.log('gap in wins (measured units):', (out.measured.gap * WINS_PER_UNIT).toFixed(4));