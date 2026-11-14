// View-model for the draft board: engine state in, plain JSON out. No DOM, no framework, no colours.
// Every number the user will read is already a string made by display.ts, so React and Svelte only place text.
import { candidates, openSlots, roundOf } from '../engine/draft.ts';
import type { Candidate, DraftState } from '../engine/draft.ts';
import { goneChance } from '../engine/goneodds.ts';
import type { GoneOdds } from '../engine/goneodds.ts';
import { goneDisplay, showDecimal, showInt } from '../engine/display.ts';
import { fit } from '../engine/flex.ts';
import { TEAMS } from '../engine/league.ts';
import { WINS_PER_UNIT } from '../engine/lineup.ts';
import { SLOT_IDS, SLOTS, fieldSlots } from '../engine/slots.ts';
import type { Dest, SlotId } from '../engine/slots.ts';

const DEST = Object.fromEntries(SLOTS.map((s) => [s.id, s.dest])) as Record<SlotId, Dest>;
const LABEL = Object.fromEntries(fieldSlots('4-3').map((f) => [f.slot, f.label])) as Record<string, string>;
export const slotLabel = (s: SlotId): string => LABEL[s] ?? s;

export type BoardSort = 'wins' | 'ovr' | 'priority';
export interface AlsoFitVM { slotId: SlotId; slotLabel: string; flex: string }          // "DT1 also DE1 (-4 flex)"
export interface BoardRowVM {
  id: string; name: string; pos: string; nflTeam: string;
  ovr: string; slotId: SlotId; slotLabel: string; natural: boolean;
  wins: string; priority: string; gone: string; alsoFits: AlsoFitVM[];
  tone: 'good' | 'neutral' | 'bad';                                                      // semantic only; the UI picks the colour
}
export interface BoardHeaderVM { teamName: string; round: number; roundLabel: string; pickInRound: number; overall: number; totalPicks: number; onClock: string }
export interface BoardVM { header: BoardHeaderVM; rows: BoardRowVM[]; footer: { filled: number; total: number; text: string }; sort: BoardSort }

const signed = (n: string): string => (n.startsWith('-') ? n : '+' + n);
// Owner 30 Oct: show a flex option only when it costs 2 or 4; 6 and 8 only after round 20.
const showFlex = (penalty: number, round: number): boolean => penalty === 2 || penalty === 4 || (penalty > 4 && round > 20);

export function boardVM(st: DraftState, userTeam: number, odds: GoneOdds, opts: { sort?: BoardSort; limit?: number } = {}): BoardVM {
  const sort = opts.sort ?? 'wins', limit = opts.limit ?? 60, round = roundOf(st);
  const open = new Set(openSlots(st.rosters[userTeam]));
  const by = new Map<string, Candidate[]>();
  for (const c of candidates(st, userTeam)) (by.get(c.player.id) ?? by.set(c.player.id, []).get(c.player.id)!).push(c);
  const rows: (BoardRowVM & { _w: number; _p: number })[] = [];
  for (const cs of by.values()) {
    // the primary spot is the best NATURAL open spot (a corner is shown as a corner), else the best flex spot
    const nat = cs.filter((c) => fit(c.player.role, DEST[c.slot]).penalty === 0).sort((a, b) => b.wins - a.wins);
    const main = nat[0] ?? cs.slice().sort((a, b) => b.wins - a.wins)[0];
    const p = main.player, w = main.wins * WINS_PER_UNIT, g = goneChance(odds, p.id), pr = w * g;
    const alsoFits = cs.filter((c) => c.slot !== main.slot && open.has(c.slot))
      .map((c) => ({ c, pen: fit(c.player.role, DEST[c.slot]).penalty })).filter((x) => showFlex(x.pen, round))
      .sort((a, b) => b.c.wins - a.c.wins).map((x) => ({ slotId: x.c.slot, slotLabel: slotLabel(x.c.slot), flex: x.pen === 0 ? '' : `-${x.pen} flex` }));
    rows.push({
      id: p.id, name: p.name, pos: p.pos, nflTeam: p.team, ovr: showInt(p.ovr), slotId: main.slot, slotLabel: slotLabel(main.slot),
      natural: fit(p.role, DEST[main.slot]).penalty === 0,
      wins: signed(showDecimal('wins', w)), priority: signed(showDecimal('priority', pr)), gone: goneDisplay(g) + '%', alsoFits,
      tone: w > 0.05 ? 'good' : w < -0.05 ? 'bad' : 'neutral', _w: w, _p: pr,
    });
  }
  const key = (r: { _w: number; _p: number; ovr: string }) => (sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w);
  rows.sort((a, b) => key(b) - key(a) || (a.id < b.id ? -1 : 1));
  const overall = st.pos + 1, filled = SLOT_IDS.length - open.size;
  return {
    header: {
      teamName: TEAMS[userTeam].name, round, roundLabel: `Round ${round}`, pickInRound: (st.pos % 32) + 1, overall, totalPicks: st.order.length,
      onClock: `You're on the clock: Round ${round}, Pick ${(st.pos % 32) + 1} (overall ${overall} of ${st.order.length})`,
    },
    rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r),
    footer: { filled, total: SLOT_IDS.length, text: `${filled} of ${SLOT_IDS.length} starters` },
    sort,
  };
}
