// View-model for "Your Roster" and the depth chart: the user's drafted players in roster order (the same order as the
// draft board and every list in the product). Plain JSON, pre-formatted, no colours.
import type { DraftState } from '../engine/draft.ts';
import { showInt } from '../engine/display.ts';
import { SLOTS } from '../engine/slots.ts';
import type { SlotId, Unit } from '../engine/slots.ts';
import { fit } from '../engine/flex.ts';
import { slotLabel } from './draftBoard.ts';

export interface RosterPlayerVM { id: string; name: string; pos: string; nflTeam: string; ovr: string; flex: string }   // flex: "" or "-4 flex"
export interface RosterRowVM { slotId: SlotId; slotLabel: string; filled: boolean; player: RosterPlayerVM | null }
export interface RosterGroupVM { unit: Unit; title: string; rows: RosterRowVM[]; filled: number; total: number }
export interface RosterVM { groups: RosterGroupVM[]; filled: number; total: number; text: string }

const TITLE: Record<Unit, string> = { offense: 'Offense', defense: 'Defense', special: 'Special Teams' };
const DEST = Object.fromEntries(SLOTS.map((s) => [s.id, s.dest]));

export function rosterVM(st: DraftState, team: number): RosterVM {
  const r = st.rosters[team];
  const groups: RosterGroupVM[] = (['offense', 'defense', 'special'] as const).map((unit) => {
    const rows: RosterRowVM[] = SLOTS.filter((s) => s.unit === unit).map((s) => {
      const p = r[s.id] ?? null;
      const pen = p ? fit(p.role, DEST[s.id]).penalty : 0;
      return { slotId: s.id, slotLabel: slotLabel(s.id), filled: !!p,
        player: p ? { id: p.id, name: p.name, pos: p.pos, nflTeam: p.team, ovr: showInt(p.ovr), flex: pen ? `-${pen} flex` : '' } : null };
    });
    const filled = rows.filter((x) => x.filled).length;
    return { unit, title: TITLE[unit], rows, filled, total: rows.length };
  });
  const filled = groups.reduce((a, g) => a + g.filled, 0), total = groups.reduce((a, g) => a + g.total, 0);
  return { groups, filled, total, text: `${filled} of ${total} starters` };
}
