// cardboard/store.ts — the Cardboard Ringers toy store (E0b admission test): 2 teams × 3 roster
// slots, one match, one table. Pinia setup store; no engine, no fixture — the platform's cheapest path.
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface ToyPlayer { id: string; name: string; ovr: number }
export interface ToyTeam { name: string; slots: Record<'QB' | 'RB' | 'WR', ToyPlayer | null> }

export const useToyStore = defineStore('cardboard', () => {
  const teams = ref<ToyTeam[]>([
    { name: 'Ringers', slots: { QB: { id: 'q1', name: 'Starr', ovr: 88 }, RB: { id: 'r1', name: 'Simpson', ovr: 84 }, WR: { id: 'w1', name: 'Hutson', ovr: 91 } } },
    { name: 'Cardboards', slots: { QB: { id: 'q2', name: 'Lamonica', ovr: 85 }, RB: { id: 'r2', name: 'Csonka', ovr: 83 }, WR: { id: 'w2', name: 'Warfield', ovr: 89 } } },
  ]);
  const played = ref(false);

  const ovrOf = (t: ToyTeam): number =>
    Math.round(((['QB', 'RB', 'WR'] as const).reduce((s, k) => s + (t.slots[k]?.ovr ?? 0), 0)) / 3);
  const scores = computed(() => teams.value.map((t) => 7 + (ovrOf(t) % 3) * 3 + ((ovrOf(t) - 80) % 2)));
  const winner = computed(() => { const [a = 7, b = 7] = scores.value; return a === b ? 'tie' : a > b ? 0 : 1; });

  function play(): void { played.value = true; }
  function swap(id: string, name: string, ovr: number): void {
    for (const t of teams.value) for (const k of ['QB', 'RB', 'WR'] as const) {
      const p = t.slots[k];
      if (p?.id === id) t.slots[k] = { id, name, ovr };
    }
  }
  return { teams, played, play, swap, scores, winner, ovrOf };
});
