// Optimal lineup: who plays where. Maximises the sum over spots of (spot value x effective OVR), where effective OVR
// is the player's OVR minus the flex penalty (Pre-Colors maximised summed slot wins, which is the same thing: wins are
// linear in OVR with the spot value as slope). The spot value comes from a ValueProvider (valueprovider.ts; P-318), measured on the
// matchup model by default; internally it is expressed in fitted-weight units (wins per OVR point / WINS_PER_UNIT, QB about 1000)
// (QB about 1000). Solved exactly (Hungarian), so a flexed player appears only when the move is worth it.
//
// Priorities, strongest first (each is a constant larger than everything below it, DERIVED from the spot values in `priorities()` below, not typed in):
//  1. a quarterback never plays an unlisted spot (he is benched instead);
//  2. every rostered player who can play plays, before any empty spot is filled with a replacement;
//  3. as few emergency (-8) fills as possible;
//  4. the highest total value x effective OVR.
import type { Player } from './players.ts';
import { fit } from './flex.ts';
import { hungarian } from '../../../core/hungarian.ts';
import { at } from '../../../core/at.ts';
import { fieldSlots } from './slots.ts';
import type { Base, FieldSlot, SlotId } from './slots.ts';
import { DEFAULT_VALUES, WINS_PER_UNIT } from './valueprovider.ts';
import type { ValueProvider } from './valueprovider.ts';

// An empty spot is rated as this (Pre-Colors rated a missing player 70).
export const EMPTY_OVR = 70;

// The three priority weights are derived from the value scale of the call, so the order of priorities holds for ANY values (a re-measured provider, another sport's
// slot table). They were literals (1e12 / 1e7 / 1e5) that silently assumed QB about 1000: 15 Nov 2026, with every spot value scaled 200x the solver took 3 emergency
// fills where 0 were needed (checked against the exact minimum, a bipartite matching, on 2,700 random rosters); at today's scale the literals held on all of them.
// Effective OVR of any placed player lies in [-20, 100] (OVR 0..99, flex price at most 12, emergency 8), so two whole assignments differ in value by less than
// VALUE_SPAN x (sum of spot values); each priority is that bound plus the room for the ones below it.
const VALUE_SPAN = 120;
export function priorities(spotValues: readonly number[], players: number, spots: number): { emergency: number; plays: number; illegal: number } {
  const bound = VALUE_SPAN * spotValues.reduce((t, x) => t + Math.abs(x), 0) + 1;
  const emergency = bound;                                   // one emergency fill outweighs any total value difference
  const plays = (spots + 1) * emergency + bound;             // one more rostered player on the field outweighs every emergency fill and any value difference
  return { emergency, plays, illegal: (players + spots + 1) * plays * 2 };   // an illegal pairing outweighs any whole legal assignment
}

export interface Placement { slot: FieldSlot; player: Player | null; effOvr: number; penalty: number; emergency: boolean }
export interface Lineup {
  base: Base;
  placements: Placement[];                // one per spot, in spot-table order
  bench: Player[];
  value: number;                          // sum of spot value x effective OVR over all spots (empty spots at EMPTY_OVR), in fitted-weight units (x WINS_PER_UNIT = wins)
  emergencyFills: number;
}

// One value x OVR unit is this many wins (1 weight point = 0.00254 wins over a 70 -> 90 upgrade, spec section 1). Defined with the provider; re-exported here.
export { WINS_PER_UNIT };

export interface LineupOpts {
  /** maps a player id to the spot he holds now; keeping him there is worth `stayBonus` units, so a move happens only when it gains more than that (adviseLineup; the plain optimum has no stay) */
  stay?: ReadonlyMap<string, SlotId>;
  stayBonus?: number;
  values?: ValueProvider;     // what a spot is worth; default MEASURED
  base?: Base;                // which formation's values to ask for; default '4-3'
}

// The value of each spot as the solver spends it, in fitted-weight units, keyed by the spot's rating row.
const unitsOf = (slots: readonly FieldSlot[], values: ValueProvider, base: Base): number[] => slots.map((f) => values.winsPerOvr(f.row, base) / WINS_PER_UNIT);

export function optimalLineup(players: readonly Player[], slots: readonly FieldSlot[], opts: LineupOpts = {}): Omit<Lineup, 'base'> {
  const { stay, stayBonus = 0, values = DEFAULT_VALUES, base = '4-3' } = opts, v = unitsOf(slots, values, base);
  const n = players.length, s = slots.length, k = n + s;
  const { emergency: EMERGENCY, plays: PLAYS, illegal: ILLEGAL } = priorities(v, n, s);
  // rows: n players, then s empty-spot fillers. columns: s spots, then n bench places.
  const cost: number[][] = [];
  for (let i = 0; i < k; i++) {
    const row = new Array<number>(k).fill(0);
    for (let j = 0; j < s; j++) {
      if (i < n) {
        const f = fit(players[i].role, slots[j].dest);
        row[j] = f.legal ? -(PLAYS + at(v, j) * (players[i].ovr - f.penalty)) + (f.emergency ? EMERGENCY : 0) - (stay?.get(players[i].id) === slots[j].slot ? stayBonus : 0) : ILLEGAL;
      } else {
        row[j] = -at(v, j) * EMPTY_OVR;
      }
    }
    // bench columns: a player may sit (cost 0), a filler may be unused (cost 0)
    cost.push(row);
  }
  const asg = hungarian(cost);
  const placements: Placement[] = slots.map((slot) => ({ slot, player: null, effOvr: EMPTY_OVR, penalty: 0, emergency: false }));
  const bench: Player[] = [];
  for (let i = 0; i < n; i++) {
    const j = asg[i];
    if (j >= s) { bench.push(players[i]); continue; }
    const f = fit(players[i].role, slots[j].dest);
    placements[j] = { slot: slots[j], player: players[i], effOvr: players[i].ovr - f.penalty, penalty: f.penalty, emergency: f.emergency };
  }
  const value = placements.reduce((t, p, j) => t + at(v, j) * p.effOvr, 0);
  return { placements, bench, value, emergencyFills: placements.filter((p) => p.emergency).length };
}

export function lineupFor(players: readonly Player[], base: Base, values: ValueProvider = DEFAULT_VALUES): Lineup {
  return { base, ...optimalLineup(players, fieldSlots(base), { base, values }) };
}

// NOTE: no "best base" here on purpose. A formation changes who stands in a spot, never what the spot is worth: since the Owner's
// 2 Nov ruling the same position has the same weight in both bases (ILB2 is rated as DT2 = 300, OLB2 as SAM = 30), so 4-3 or
// 3-4 is a pure personnel decision, and the base is chosen by team rating (step 5), not by comparing totals here.

export function placementOf(l: Lineup, slot: SlotId): Placement {
  const p = l.placements.find((x) => x.slot.slot === slot);
  if (!p) throw new Error('no such spot ' + slot);
  return p;
}

// ---- advice for the user's own lineup ----
// Owner 29 Oct: "I drafted all my players into the positions I wanted, and then the math flexed over ten players out of
// position." The user's lineup is never changed by the engine; this only SUGGESTS. A player is moved only if the move is
// worth at least `minGainWins` per player moved (default 0.02 wins, the threshold Pre-Colors used to say "no better
// arrangement"), so ten tiny reshuffles are not suggested.
export type Assignment = Partial<Record<SlotId, Player>>;
export interface Move { slot: SlotId; from: Player | null; to: Player | null; flexPenalty: number }
export interface Advice { lineup: Lineup; moves: Move[]; currentValue: number; gainWins: number }

export function valueOf(assign: Assignment, slots: readonly FieldSlot[], values: ValueProvider = DEFAULT_VALUES, base: Base = '4-3'): number {
  const v = unitsOf(slots, values, base);
  return slots.reduce((t, sl, j) => { const p = assign[sl.slot]; return t + at(v, j) * (p ? p.ovr - fit(p.role, sl.dest).penalty : EMPTY_OVR); }, 0);
}

export function adviseLineup(current: Assignment, roster: readonly Player[], base: Base, minGainWins = 0.02, values: ValueProvider = DEFAULT_VALUES): Advice {
  const slots = fieldSlots(base);
  const stay = new Map<string, SlotId>();
  for (const sl of slots) { const p = current[sl.slot]; if (p) stay.set(p.id, sl.slot); }
  const lineup: Lineup = { base, ...optimalLineup(roster, slots, { stay, stayBonus: minGainWins / WINS_PER_UNIT, base, values }) };
  const moves: Move[] = [];
  for (const pl of lineup.placements) {
    const was = current[pl.slot.slot] ?? null;
    if ((was?.id ?? null) !== (pl.player?.id ?? null)) moves.push({ slot: pl.slot.slot, from: was, to: pl.player, flexPenalty: pl.penalty });
  }
  const currentValue = valueOf(current, slots, values, base);
  return { lineup, moves, currentValue, gainWins: (lineup.value - currentValue) * WINS_PER_UNIT };
}
