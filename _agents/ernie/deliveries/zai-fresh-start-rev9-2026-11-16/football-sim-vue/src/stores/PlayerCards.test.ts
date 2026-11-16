// PlayerCards.test.ts — slice (a)'s unit battery: the store's cards come from the engine's own
// boardVM (60 rows on the fixture), card0 is engine-true, and the grid maps 1:1. jsdom boots the
// REAL store (real pool, real fixture — no mocks). The expected values come from probes/truth.json,
// which probe-truth.mjs derived NODE-SIDE from the engine BEFORE any slice code was written (gate 1)
// — so string-equality here is engine truth, not a fixture echo.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from './appStore';

// process.cwd() resolution: vite rewrites new URL(..., import.meta.url) inside test files, breaking
// the file-scheme read — cwd is the repo root under vitest, so resolve() is the honest path.
const truth = JSON.parse(readFileSync(resolve(process.cwd(), 'probes/truth.json'), 'utf8')) as {
  cards: { count: number; countText: string; card0: { name: string; pos: string; ovr: string; wins: string; priority: string } };
  board: { rowCount: number };
};

describe('slice (a) player cards', () => {
  it('renders one card per boardVM row with engine-true fields', () => {
    setActivePinia(createPinia());
    const app = useAppStore();
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
    setActivePinia(createPinia());
    const app = useAppStore();
    expect(app.cards.totalPicks).toBe(1024);
    expect(app.cards.teamName).toBe('Chicago Bears');
    expect(app.cards.cards.length).toBe(truth.board.rowCount);
  });
});
