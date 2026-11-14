<script lang="ts">
// The Tier-2 bench board (Svelte 5 arm, runes). State/VM wiring is the shared plain-TS store;
// the framework owns only runes and the DOM. DOM contract: board-row, sort-wins|ovr|priority,
// filter-pos, pick, roster-panel.
import { store, selectBoard, selectRoster } from './shared/boot';
import type { BoardVM, BoardRowVM, BoardSort } from './engine/sports/nfl/view/draftBoard.ts';
import type { DraftStoreState } from './engine/sports/nfl/app/store.ts';

const POSITIONS = ['ALL', 'QB', 'HB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'EDGE', 'ILB', 'OLB', 'SS', 'FS', 'CB', 'K', 'P'];
const SORTS = ['wins', 'ovr', 'priority'] as const;

let sort = $state<BoardSort>('wins');
let filter = $state<string>('ALL');
let selectedId = $state<string | null>(null);
// $state.raw, not $state: the engine mutates its own DraftState caches during selector evaluation
// (replacement() memoizes into st.repl). A deep proxy would make that an unsafe-mutation error inside
// $derived. The store always REPLACES the state object wholesale, so raw identity tracking is correct.
let state = $state.raw<DraftStoreState>(store.getState());
store.subscribe((s) => { state = s; });

let vm = $derived<BoardVM | null>(selectBoard(state, { sort, limit: 60 }));
let roster = $derived(selectRoster(state));
let rows = $derived<BoardRowVM[]>(filter === 'ALL' ? (vm?.rows ?? []) : (vm?.rows ?? []).filter((x) => x.pos === filter));
let selected = $derived<BoardRowVM | null>(rows.find((x) => x.id === selectedId) ?? null);

function setSort(s: BoardSort): void { sort = s; }
function onSelect(id: string): void { selectedId = selectedId === id ? null : id; }
function pick(): void {
  if (!selected) return;
  store.dispatch({ type: 'PICK', playerId: selected.id, slot: selected.slotId });
  selectedId = null;
}
</script>

<div class="bench-header">
  <h1>67 Cakepanz — Bench Board (Svelte 5 arm)</h1>
  {#if vm}
    <div class="bench-onclock" data-testid="on-clock">{vm.header.onClock}</div>
  {:else}
    <div class="bench-onclock" data-testid="on-clock">Draft complete</div>
  {/if}
</div>
<div class="bench-toolbar">
  {#each SORTS as s (s)}
    <button data-testid={`sort-${s}`} class:active={sort === s} onclick={() => setSort(s)}>Sort {s}</button>
  {/each}
  <select data-testid="filter-pos" bind:value={filter}>
    {#each POSITIONS as p (p)}
      <option value={p}>{p === 'ALL' ? 'All positions' : p}</option>
    {/each}
  </select>
  <button class="pick" data-testid="pick" disabled={!selected} onclick={pick}>PICK selected player</button>
</div>
<table class="bench-board">
  <thead>
    <tr><th>Player</th><th>Pos</th><th>Team</th><th>OVR</th><th>Slot</th><th>Wins</th><th>Priority</th><th>Gone%</th></tr>
  </thead>
  <tbody>
    {#each rows as r (r.id)}
      <tr class="bench-row" class:selected={r.id === selectedId} data-testid="board-row" data-player-id={r.id} data-pos={r.pos} onclick={() => onSelect(r.id)}>
        <td>{r.name}</td>
        <td>{r.pos}</td>
        <td>{r.nflTeam}</td>
        <td>{r.ovr}</td>
        <td>{r.slotLabel}</td>
        <td class={`tone-${r.tone}`}>{r.wins}</td>
        <td class={`tone-${r.tone}`}>{r.priority}</td>
        <td>{r.gone}</td>
      </tr>
    {/each}
  </tbody>
</table>
<div class="bench-roster" data-testid="roster-panel">
  {#if selected}
    <div class="detail">
      {selected.name} · {selected.pos} · {selected.slotLabel} · OVR {selected.ovr} · Wins {selected.wins} · Priority {selected.priority} · Gone {selected.gone}
      {#if selected.alsoFits.length} · also {selected.alsoFits.map((f) => `${f.slotLabel} (${f.flex || 'natural'})`).join(', ')}{/if}
    </div>
  {:else}
    <div class="detail">Click a row to select a player.</div>
  {/if}
  {#if roster}
    <div class="bench-footer">{roster.filled} of {roster.total} starters filled</div>
  {/if}
</div>
