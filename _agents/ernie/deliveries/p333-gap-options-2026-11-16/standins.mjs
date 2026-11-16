import { fieldSlots, SLOTS, WEIGHT } from './engineRoot/sports/nfl/engine/slots.ts';
import { lineupFor } from './engineRoot/sports/nfl/engine/lineup.ts';
import { tableValues, DEFAULT_VALUES } from './engineRoot/sports/nfl/engine/valueprovider.ts';
const ROLE_OF_DEST = { NICKEL: 'CB', DIME: 'CB', DL5: 'DT' };
const mk = (role, ovr, i) => ({ id: 'p' + i, name: 'P' + i, pos: role, role, team: 'T', ovr, spd: 80, str: 80, freeAgent: false });
const rosterFor = (base, ovr) => fieldSlots(base).map((s, i) => mk(ROLE_OF_DEST[s.dest] || s.dest, ovr, i));
const W = Object.fromEntries(SLOTS.map((s) => [s.id, s.weight]));
const show = (label, roster, base) => {
  const l = lineupFor(roster, base, tableValues(WEIGHT));
  console.log('== ' + label + ' ==');
  for (const p of l.placements) if (p.player && p.penalty > 0)
    console.log(`  ${p.player.role} > ${p.slot.slot} (dest ${p.slot.dest}) penalty ${p.penalty} x weight ${W[p.slot.slot]} = ${p.penalty * W[p.slot.slot]}  | measured per-OVR ${DEFAULT_VALUES.winsPerOvr(p.slot.row, base).toFixed(4)}`);
};
show('4-3 roster forced into 3-4', rosterFor('4-3', 80), '3-4');
show('3-4 roster forced into 4-3', rosterFor('3-4', 80), '4-3');
