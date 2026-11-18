// port/cardVM.ts — the player cards (slice 5; the Owner left the format to the builder).
// MY FORMAT, one card per player: a gold monogram medallion, the player's name + position + NFL team,
// and the ONLY numbers the user sees — Wins, Priority, OVR (Owner law) — with the valuation-mode label
// riding the card footer (the label travels with the numbers). The form arrow (GREEN up / RED down)
// is a slice-6 dial placeholder on the card's corner: it renders from the card's own tone today
// (STAND-IN: the engine's form model lands with the season stats slice — the real call is the
// OVR-by-form dial in the Architect's lineup work; no engine number is faked).
// The cards are a RE-RENDER of the engine's own boardVM rows — never a new model, never a
// re-derivation: every field on a card is string-equal to the BoardRowVM the board already shows.
import type { BoardVM, BoardRowVM, SlotId } from './seam.ts';

export interface CardVM {
  id: string; name: string; pos: string; nflTeam: string;
  ovr: string; wins: string; priority: string;
  slotId: SlotId; slotLabel: string; tone: 'good' | 'neutral' | 'bad';
  alsoFits: string[];                          // the board's flex chips, board-established visibility
  monogram: string;
  arrow: 'up' | 'down' | 'flat';               // STAND-IN: tone-derived until the engine's form model lands
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
    arrow: r.tone === 'good' ? 'up' : r.tone === 'bad' ? 'down' : 'flat',
  }));
  return { cards, teamName: b.header.teamName, overall: b.header.overall, totalPicks: b.header.totalPicks, onClock: b.header.onClock, count: b.footer.text };
}
