// PlayerCards.test.ts — slice (a)'s unit battery (Svelte arm): the bridge's cards are engine-true,
// asserted against probes/truth.json (derived node-side from the engine BEFORE any slice code).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { app } from './appStore.svelte.ts';

const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8')) as {
  cards: { count: number; countText: string; card0: { name: string; pos: string; ovr: string; wins: string; priority: string } };
  board: { rowCount: number };
};

describe('slice (a) player cards', () => {
  it('renders one card per boardVM row with engine-true fields', () => {
    expect(app.cards.cards.length).toBe(truth.cards.count);
    const c0 = app.cards.cards[0]!;
    expect(c0.name).toBe(truth.cards.card0.name);
    expect(c0.pos).toBe(truth.cards.card0.pos);
    expect(c0.ovr).toBe(truth.cards.card0.ovr);
    expect(c0.wins).toBe(truth.cards.card0.wins);
    expect(c0.priority).toBe(truth.cards.card0.priority);
    expect(app.cards.count).toBe(truth.cards.countText);
  });
  it('the cards ride the real draft (1,024-pick league, Bears on the clock)', () => {
    expect(app.cards.totalPicks).toBe(1024);
    expect(app.cards.teamName).toBe('Chicago Bears');
    expect(app.cards.cards.length).toBe(truth.board.rowCount);
  });
});
