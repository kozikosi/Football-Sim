// Returners. Owner formula (30 Oct 2026, verbatim in owner-notes): Returner_Value = SPD x 0.80 + OVR x 0.10 + STR x 0.10, capped at 99.
// One non-lineman starter returns kicks and punts (Pre-Colors' RETURN_SLOTS); by default the best by this value, or the player the user picks.
// The value feeds the matchup model's return term through Ratings.ret. It is NOT shown in the lineup editor (Owner): the Guide and a hover may say it.
import type { Lineup } from './lineup.ts';
import type { Player } from './players.ts';
import type { SlotId } from './slots.ts';
import { RET_NEUTRAL } from './specs.ts';

export const RETURN_SLOTS: readonly SlotId[] = ['RB1', 'RB2', 'WR1', 'WR2', 'WR3', 'TE1', 'TE2', 'MIKE', 'WILL', 'SAM', 'CB1', 'CB2', 'CB3', 'SS', 'FS'];
export const RET_W = { spd: 0.8, ovr: 0.1, str: 0.1 } as const;

export function returnerValue(p: Pick<Player, 'spd' | 'ovr' | 'str'>): number {
  return Math.min(99, p.spd * RET_W.spd + p.ovr * RET_W.ovr + p.str * RET_W.str);
}
export interface ReturnerCandidate { slot: SlotId; player: Player; value: number }
export function returnerCandidates(l: Lineup): ReturnerCandidate[] {
  const out: ReturnerCandidate[] = [];
  for (const pl of l.placements) if (pl.player && RETURN_SLOTS.includes(pl.slot.slot)) out.push({ slot: pl.slot.slot, player: pl.player, value: returnerValue(pl.player) });
  return out.sort((a, b) => b.value - a.value || (a.player.id < b.player.id ? -1 : 1));
}
// chosenId: the player the user picked (name|pos|team); falls back to the best candidate if he is not an eligible starter
export function pickReturner(l: Lineup, chosenId?: string | null): ReturnerCandidate | null {
  const c = returnerCandidates(l);
  return c.find((x) => x.player.id === chosenId) ?? c[0] ?? null;
}
export function returnerRating(l: Lineup, chosenId?: string | null): number {
  return pickReturner(l, chosenId)?.value ?? RET_NEUTRAL;
}
