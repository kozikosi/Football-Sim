// Optimal lineup: who plays where. Maximises the sum over spots of (spot weight x effective OVR), where effective OVR
// is the player's OVR minus the flex penalty (Pre-Colors maximised summed slot wins, which is the same thing: wins are
// linear in OVR with the spot weight as slope). Solved exactly (Hungarian), so a flexed player appears only when the
// move is worth it.
//
// Priorities, strongest first (each is a constant larger than everything below it):
//  1. a quarterback never plays an unlisted spot (he is benched instead);
//  2. every rostered player who can play plays, before any empty spot is filled with a replacement;
//  3. as few emergency (-8) fills as possible;
//  4. the highest total weight x effective OVR.
import type { Player } from './players.ts';
import { fit } from './flex.ts';
import { hungarian } from './hungarian.ts';
import { fieldSlots } from './slots.ts';
import type { Base, FieldSlot, SlotId } from './slots.ts';

// An empty spot is rated as this (Pre-Colors rated a missing player 70).
export const EMPTY_OVR = 70;

const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;

export interface Placement { slot: FieldSlot; player: Player | null; effOvr: number; penalty: number; emergency: boolean }
export interface Lineup {
  base: Base;
  placements: Placement[];                // one per spot, in spot-table order
  bench: Player[];
  value: number;                          // sum of weight x effective OVR over all spots (empty spots at EMPTY_OVR)
  emergencyFills: number;
}

// 1 weight point = 0.00254 wins over a 70 -> 90 upgrade (spec section 1), so one weight x OVR unit is this many wins.
export const WINS_PER_UNIT = 0.00254 / 20;

// `stay` maps a player id to the spot he holds now; keeping him there is worth `stayBonus` units, so a move happens only
// when it gains more than that (used by adviseLineup; the plain optimum has no stay).
export function optimalLineup(players: readonly Player[], slots: readonly FieldSlot[], stay?: ReadonlyMap<string, SlotId>, stayBonus = 0): Omit<Lineup, 'base'> {
  const n = players.length, s = slots.length, k = n + s;
  // rows: n players, then s empty-spot fillers. columns: s spots, then n bench places.
  const cost: number[][] = [];
  for (let i = 0; i < k; i++) {
    const row = new Array<number>(k).fill(0);
    for (let j = 0; j < s; j++) {
      if (i < n) {
        const f = fit(players[i].role, slots[j].dest);
        row[j] = f.legal ? -(PLAYS + slots[j].weight * (players[i].ovr - f.penalty)) + (f.emergency ? EMERGENCY : 0) - (stay?.get(players[i].id) === slots[j].slot ? stayBonus : 0) : ILLEGAL;
      } else {
        row[j] = -slots[j].weight * EMPTY_OVR;
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
  const value = placements.reduce((t, p) => t + p.slot.weight * p.effOvr, 0);
  return { placements, bench, value, emergencyFills: placements.filter((p) => p.emergency).length };
}

export function lineupFor(players: readonly Player[], base: Base): Lineup {
  return { base, ...optimalLineup(players, fieldSlots(base)) };
}

// NOTE: no "best base" here on purpose. Totals of the two formations are not comparable: a flat roster scores higher in
// 3-4 because SAM (30) is rated as WILL (240) there while DT2 (300) is rated as MIKE (260), exactly as the Owner's
// "OLB are treated as WILLs, ILB as MIKEs" rule says. The base is chosen by team rating (step 5), not by this total.

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

export function valueOf(assign: Assignment, slots: readonly FieldSlot[]): number {
  return slots.reduce((t, sl) => { const p = assign[sl.slot]; return t + sl.weight * (p ? p.ovr - fit(p.role, sl.dest).penalty : EMPTY_OVR); }, 0);
}

export function adviseLineup(current: Assignment, roster: readonly Player[], base: Base, minGainWins = 0.02): Advice {
  const slots = fieldSlots(base);
  const stay = new Map<string, SlotId>();
  for (const sl of slots) { const p = current[sl.slot]; if (p) stay.set(p.id, sl.slot); }
  const lineup: Lineup = { base, ...optimalLineup(roster, slots, stay, minGainWins / WINS_PER_UNIT) };
  const moves: Move[] = [];
  for (const pl of lineup.placements) {
    const was = current[pl.slot.slot] ?? null;
    if ((was?.id ?? null) !== (pl.player?.id ?? null)) moves.push({ slot: pl.slot.slot, from: was, to: pl.player, flexPenalty: pl.penalty });
  }
  const currentValue = valueOf(current, slots);
  return { lineup, moves, currentValue, gainWins: (lineup.value - currentValue) * WINS_PER_UNIT };
}
