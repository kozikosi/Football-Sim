// cardVM.ts — slice-5 player-card view-model, framework-free, IDENTICAL BYTES in both arms.
// The cards are a RE-RENDER of the engine's own boardVM rows — never a new model, never a
// re-derivation: every field on a card is string-equal to the BoardRowVM the board already shows.
// The user sees ONLY Wins, Priority, OVR on the face (Owner law); name/pos/nflTeam identify the row.
// monogram: up to two initials for the card's medallion; accent: the row's own semantic tone.
import type { BoardVM, BoardRowVM } from '../engine/sports/nfl/view/draftBoard.ts';
import type { SlotId } from '../engine/sports/nfl/engine/slots.ts';

export interface CardVM {
  id: string; name: string; pos: string; nflTeam: string;
  ovr: string; wins: string; priority: string;
  slotId: SlotId; slotLabel: string; tone: 'good' | 'neutral' | 'bad';
  alsoFits: string[];                          // the board's flex chips, board-established visibility
  monogram: string;
}

export interface CardGridVM {
  cards: CardVM[];
  teamName: string; overall: number; totalPicks: number; onClock: string;
  count: string;                               // the same count text the board shows
}

const monogramOf = (name: string): string =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');

export function toCardGrid(b: BoardVM): CardGridVM {
  const cards: CardVM[] = b.rows.map((r: BoardRowVM) => ({
    id: r.id, name: r.name, pos: r.pos, nflTeam: r.nflTeam,
    ovr: r.ovr, wins: r.wins, priority: r.priority,
    slotId: r.slotId, slotLabel: r.slotLabel, tone: r.tone,
    alsoFits: r.alsoFits.map((a) => a.slotLabel + (a.flex ? ' (' + a.flex + ')' : '')),
    monogram: monogramOf(r.name),
  }));
  return { cards, teamName: b.header.teamName, overall: b.header.overall, totalPicks: b.header.totalPicks, onClock: b.header.onClock, count: b.footer.text };
}
