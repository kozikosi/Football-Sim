// cardboard/store.svelte.ts — the Cardboard Ringers toy bridge (E0b admission test, Svelte arm):
// 2 teams × 3 roster slots, one match, one table. Runes in a .svelte.ts bridge per the house rules.
export interface ToyPlayer { id: string; name: string; ovr: number }
export type SlotKey = 'QB' | 'RB' | 'WR';

class ToyStore {
  teams = $state<{ name: string; slots: Record<SlotKey, ToyPlayer | null> }[]>([
    { name: 'Ringers', slots: { QB: { id: 'q1', name: 'Starr', ovr: 88 }, RB: { id: 'r1', name: 'Simpson', ovr: 84 }, WR: { id: 'w1', name: 'Hutson', ovr: 91 } } },
    { name: 'Cardboards', slots: { QB: { id: 'q2', name: 'Lamonica', ovr: 85 }, RB: { id: 'r2', name: 'Csonka', ovr: 83 }, WR: { id: 'w2', name: 'Warfield', ovr: 89 } } },
  ]);
  played = $state(false);

  ovrOf(t: { slots: Record<SlotKey, ToyPlayer | null> }): number {
    const sum = (['QB', 'RB', 'WR'] as const).reduce((s, k) => s + (t.slots[k]?.ovr ?? 0), 0);
    return Math.round(sum / 3);
  }
  get scores(): number[] {
    return this.teams.map((t) => 7 + (this.ovrOf(t) % 3) * 3 + ((this.ovrOf(t) - 80) % 2));
  }
  get winner(): 'tie' | 0 | 1 {
    const [a = 7, b = 7] = this.scores;
    return a === b ? 'tie' : a > b ? 0 : 1;
  }
  play(): void { this.played = true; }
  swap(id: string, name: string, ovr: number): void {
    for (const t of this.teams) for (const k of ['QB', 'RB', 'WR'] as const) {
      if (t.slots[k]?.id === id) t.slots[k] = { id, name, ovr };
    }
  }
}

export const toy = new ToyStore();
