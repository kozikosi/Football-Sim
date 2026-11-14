// "Gone%" for the draft board: how likely each player is to be taken by the computer teams before the user's next turn.
// Method (INFERRED to be a fair estimate, measured by the test): replay the picks in between many times with the real CPU
// logic (`cpuChoose`) on a copy of the draft and count how often each player disappears. Pure: every draw comes from an Rng.
import { applyPick, cpuChoose } from './draft.ts';
import type { DraftState } from './draft.ts';
import type { Rng } from '../../../core/rng.ts';

export interface GoneOdds { picksBetween: number; sims: number; gone: ReadonlyMap<string, number> }   // gone: player id -> probability 0..1

function copyOf(st: DraftState): DraftState {
  return { ...st, pool: st.pool.slice(), rosters: st.rosters.map((r) => ({ ...r })), log: [], repl: { ...st.repl } };
}

// `st.order[st.pos]` must be the user's own pick. Picks by other teams up to the user's next pick are replayed `sims` times.
export function goneOdds(st: DraftState, userTeam: number, rng: Rng, sims = 30): GoneOdds {
  if (st.order[st.pos] !== userTeam) throw new Error('goneOdds: it is not the user\'s pick');
  let next = st.pos + 1;
  while (next < st.order.length && st.order[next] !== userTeam) next++;
  const between = next - (st.pos + 1);
  const counts = new Map<string, number>();
  if (between <= 0 || next >= st.order.length) return { picksBetween: Math.max(0, between), sims, gone: counts };
  for (let s = 0; s < sims; s++) {
    const c = copyOf(st);
    c.pos = st.pos + 1;                       // the user's pick is not replayed; the pool is as it is now
    const r = rng.fork('gone' + s);
    for (let i = c.pos; i < next; i++) {
      const team = c.order[i];
      const ch = cpuChoose(c, team, r);
      applyPick(c, team, ch.player, ch.slot);
    }
    for (const p of c.log) counts.set(p.player.id, (counts.get(p.player.id) ?? 0) + 1);
  }
  for (const [k, v] of counts) counts.set(k, v / sims);
  return { picksBetween: between, sims, gone: counts };
}
export const goneChance = (o: GoneOdds, id: string): number => o.gone.get(id) ?? 0;
