// 67 Cakepanz — the Draft Board view adapter (MY tree's copy of the board view model).
// WHY A COPY: the frozen snapshot's view/draftBoard.ts at the pinned commit 4ca9a071 has a
// corrupted line (`fit(p.role, DESTain.slot]).penalty` — a mangled `DEST[c.slot]`), which no
// build can compile. The snapshot is FROZEN — we do not edit it (the engine rule); the bug is
// REPORTED to the Architect (filed in the delivery README) and this file stands in until a
// re-pin. The logic is line-for-line the snapshot's view model: engine state in, plain JSON out,
// no DOM, no framework, no colours; every number is already a string made by display.ts.
import { candidates, openSlots, roundOf } from '../../engine/sports/nfl/engine/draft.ts';
import type { Candidate, DraftState } from '../../engine/sports/nfl/engine/draft.ts';
import { goneChance } from '../../engine/sports/nfl/engine/goneodds.ts';
import type { GoneOdds } from '../../engine/sports/nfl/engine/goneodds.ts';
import { goneDisplay, showDecimal, showInt } from '../../engine/sports/nfl/engine/display.ts';
import { fit } from '../../engine/sports/nfl/engine/flex.ts';
import { TEAMS } from '../../engine/sports/nfl/engine/league.ts';
import { WINS_PER_UNIT } from '../../engine/sports/nfl/engine/lineup.ts';
import { SLOT_IDS, SLOTS, fieldSlots } from '../../engine/sports/nfl/engine/slots.ts';
import type { Dest, SlotId } from '../../engine/sports/nfl/engine/slots.ts';
import type { BoardSort } from '../../engine/sports/nfl/app/appstate.ts';

const DEST = Object.fromEntries(SLOTS.map((s) => [s.id, s.dest])) as Record<SlotId, Dest>;
const LABEL = Object.fromEntries(fieldSlots('4-3').map((f) => [f.slot, f.label])) as Record<string, string>;
export const slotLabel = (s: SlotId): string => LABEL[s] ?? s;

export type { BoardSort };
export interface AlsoFitVM { slotId: SlotId; slotLabel: string; flex: string }
export interface BoardRowVM {
  id: string; name: string; pos: string; nflTeam: string;
  ovr: string; slotId: SlotId; slotLabel: string; natural: boolean;
  wins: string; priority: string; gone: string; alsoFits: AlsoFitVM[];
  tone: 'good' | 'neutral' | 'bad';
}
export interface BoardHeaderVM { teamName: string; round: number; roundLabel: string; pickInRound: number; overall: number; totalPicks: number; onClock: string }
export interface BoardVM { header: BoardHeaderVM; rows: BoardRowVM[]; footer: { filled: number; total: number; text: string }; sort: BoardSort }

const signed = (n: string): string => (n.startsWith('-') ? n : '+' + n);
const showFlex = (penalty: number, round: number): boolean => penalty === 2 || penalty === 4 || (penalty > 4 && round > 20);

export function boardVMFallback(st: DraftState, userTeam: number, odds: GoneOdds | null, opts: { sort?: BoardSort; limit?: number } = {}): BoardVM {
  const sort = opts.sort ?? 'wins', limit = opts.limit ?? 60, round = roundOf(st);
  const open = new Set(openSlots(st.rosters[userTeam]));
  const by = new Map<string, Candidate[]>();
  for (const c of candidates(st, userTeam)) (by.get(c.player.id) ?? by.set(c.player.id, []).get(c.player.id)!).push(c);
  const rows: (BoardRowVM & { _w: number; _p: number })[] = [];
  for (const cs of by.values()) {
    const nat = cs.filter((c) => fit(c.player.role, DEST[c.slot]).penalty === 0).sort((a, b) => b.wins - a.wins);
    const main = nat[0] ?? cs.slice().sort((a, b) => b.wins - a.wins)[0];
    const p = main.player, w = main.wins * WINS_PER_UNIT, g = odds ? goneChance(odds, p.id) : 0, pr = w * g;
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
