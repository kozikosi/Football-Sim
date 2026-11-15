// cardboard: the E0b admission test's unit battery — the store must play a match and swap a player.
import { describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useToyStore } from './store';

describe('cardboard ringers store', () => {
  it('boots 2 teams × 3 filled slots and plays one match', () => {
    setActivePinia(createPinia());
    const toy = useToyStore();
    expect(toy.teams).toHaveLength(2);
    for (const t of toy.teams) for (const k of ['QB', 'RB', 'WR'] as const) expect(t.slots[k]).not.toBeNull();
    expect(toy.played).toBe(false);
    toy.play();
    expect(toy.played).toBe(true);
    expect(toy.scores[0]).toBeGreaterThanOrEqual(7);
    expect(toy.scores[1]).toBeGreaterThanOrEqual(7);
    expect(['tie', 0, 1]).toContain(toy.winner);
  });
  it('swap changes the team OVR and the table re-derives', () => {
    setActivePinia(createPinia());
    const toy = useToyStore();
    const before = toy.ovrOf(toy.teams[0]!);
    toy.swap('q1', 'Icebox', 99);
    expect(toy.teams[0]!.slots.QB?.name).toBe('Icebox');
    expect(toy.ovrOf(toy.teams[0])).toBeGreaterThanOrEqual(before);
  });
});
