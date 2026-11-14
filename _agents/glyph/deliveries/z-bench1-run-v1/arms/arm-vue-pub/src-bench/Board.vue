<script setup lang="ts">
// The Tier-2 bench board (Vue arm). State/VM wiring is the shared plain-TS store; the framework
// owns only refs, computed and the DOM. DOM contract: board-row, sort-wins|ovr|priority,
// filter-pos, pick, roster-panel.
import { computed, ref, shallowRef } from 'vue';
import { store, selectBoard, selectRoster } from './shared/boot';
import type { BoardVM, BoardRowVM, BoardSort } from './engine/sports/nfl/view/draftBoard.ts';
import type { DraftStoreState } from './engine/sports/nfl/app/store.ts';

const POSITIONS = ['ALL', 'QB', 'HB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'EDGE', 'ILB', 'OLB', 'SS', 'FS', 'CB', 'K', 'P'];

const sort = ref<BoardSort>('wins');
const filter = ref<string>('ALL');
const selectedId = ref<string | null>(null);
// shallowRef, not ref: the engine mutates its own DraftState caches during selector evaluation
// (replacement() memoizes into st.repl) and walks thousands of fields per goneOdds sim. A deep
// reactive proxy slows the engine ~5x and tracks dependencies nobody renders. The store replaces
// the state object wholesale, so shallow identity is correct. (Run1 measured the deep-ref wiring:
// vue p50 5.1-7.4s on the slow cells vs svelte-raw 1.2-2.3s — the wiring was the cost, not Vue.)
const state = shallowRef<DraftStoreState>(store.getState());
store.subscribe((s) => { state.value = s; });

const vm = computed<BoardVM | null>(() => selectBoard(state.value, { sort: sort.value, limit: 60 }));
const roster = computed(() => selectRoster(state.value));
const rows = computed<BoardRowVM[]>(() => {
  const r = vm.value?.rows ?? [];
  return filter.value === 'ALL' ? r : r.filter((x) => x.pos === filter.value);
});
const selected = computed<BoardRowVM | null>(() => rows.value.find((x) => x.id === selectedId.value) ?? null);

function setSort(s: BoardSort): void { sort.value = s; }
function onSelect(id: string): void { selectedId.value = selectedId.value === id ? null : id; }
function pick(): void {
  if (!selected.value) return;
  store.dispatch({ type: 'PICK', playerId: selected.value.id, slot: selected.value.slotId });
  selectedId.value = null;
}
</script>

<template>
  <div class="bench-header">
    <h1>67 Cakepanz — Bench Board (Vue 3 arm)</h1>
    <div v-if="vm" class="bench-onclock" data-testid="on-clock">{{ vm.header.onClock }}</div>
    <div v-else class="bench-onclock" data-testid="on-clock">Draft complete</div>
  </div>
  <div class="bench-toolbar">
    <button v-for="s in (['wins', 'ovr', 'priority'] as const)" :key="s" :data-testid="`sort-${s}`" :class="{ active: sort === s }" @click="setSort(s)">
      Sort {{ s }}
    </button>
    <select data-testid="filter-pos" v-model="filter">
      <option v-for="p in POSITIONS" :key="p" :value="p">{{ p === 'ALL' ? 'All positions' : p }}</option>
    </select>
    <button class="pick" data-testid="pick" :disabled="!selected" @click="pick">PICK selected player</button>
  </div>
  <table class="bench-board">
    <thead>
      <tr><th>Player</th><th>Pos</th><th>Team</th><th>OVR</th><th>Slot</th><th>Wins</th><th>Priority</th><th>Gone%</th></tr>
    </thead>
    <tbody>
      <tr v-for="r in rows" :key="r.id" class="bench-row" :class="{ selected: r.id === selectedId }" :data-testid="`board-row`" :data-player-id="r.id" :data-pos="r.pos" @click="onSelect(r.id)">
        <td>{{ r.name }}</td>
        <td>{{ r.pos }}</td>
        <td>{{ r.nflTeam }}</td>
        <td>{{ r.ovr }}</td>
        <td>{{ r.slotLabel }}</td>
        <td :class="`tone-${r.tone}`">{{ r.wins }}</td>
        <td :class="`tone-${r.tone}`">{{ r.priority }}</td>
        <td>{{ r.gone }}</td>
      </tr>
    </tbody>
  </table>
  <div class="bench-roster" data-testid="roster-panel">
    <div v-if="selected" class="detail">
      {{ selected.name }} · {{ selected.pos }} · {{ selected.slotLabel }} · OVR {{ selected.ovr }} · Wins {{ selected.wins }} · Priority {{ selected.priority }} · Gone {{ selected.gone }}
      <span v-if="selected.alsoFits.length"> · also {{ selected.alsoFits.map((f) => `${f.slotLabel} (${f.flex || 'natural'})`).join(', ') }}</span>
    </div>
    <div v-else class="detail">Click a row to select a player.</div>
    <div v-if="roster" class="bench-footer">{{ roster.filled }} of {{ roster.total }} starters filled</div>
  </div>
</template>
