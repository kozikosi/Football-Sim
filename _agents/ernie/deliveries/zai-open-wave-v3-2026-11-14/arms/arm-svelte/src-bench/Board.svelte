<script lang="ts">
// The Tier-2 bench board (Svelte 5 arm, runes). State/VM wiring is the shared plain-TS store;
// the framework owns only runes and the DOM. DOM contract: board-row, sort-wins|ovr|priority,
// filter-pos, pick, roster-panel.
import { store, selectBoard, selectRoster } from './shared/boot';
import type { BoardVM, BoardRowVM, BoardSort } from './engine/sports/nfl/view/draftBoard.ts';
import type { DraftStoreState } from './engine/sports/nfl/app/store.ts';

// BENCH-2 finding, fixed here (repair log R2): the hard-coded POSITIONS list (OT/OG/EDGE/ILB/SS/FS/HB/FB/K/P)
// does not contain the board's engine pos tokens (LT/RT/LG/RG/LEDG/REDG/MIKE/WILL/SAM/DT/OL/DP) — options
// like EDGE could never match a row (filter compares x.pos === filter.value). The select now carries the
// POOL's own vocabulary (the same source the rows render).
const POSITIONS = ['ALL', ...[...new Set((store.getState().draft?.pool ?? []).map((p: { pos: string }) => p.pos))].sort()] as string[];
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
// BENCH-1.5 — Pick Reveal: the committed pick is a MOMENT in the w89 language (fxpop entrance,
// fxshine sweep on the bubble, fxglow ring; card unmounts itself after the beat). Pure CSS motion,
// one overlay, no library. The store has ALREADY advanced behind the dim.
let reveal = $state<null | { name: string; pos: string; ovr: string; team: string; round: number; pickInRound: number }>(null);
let revealTimer: ReturnType<typeof setTimeout> | undefined;
function pick(): void {
  if (!selected) return;
  const vmNow = vm;
  const picked = { name: selected.name, pos: selected.pos, ovr: selected.ovr, team: selected.nflTeam };
  store.dispatch({ type: 'PICK', playerId: selected.id, slot: selected.slotId });
  reveal = vmNow ? { ...picked, round: vmNow.header.round, pickInRound: vmNow.header.pickInRound } : null;
  clearTimeout(revealTimer);
  revealTimer = setTimeout(() => { reveal = null; }, 1500);
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
    <option value="ALL">All positions</option>
    {#each POSITIONS.filter((p) => p !== "ALL") as p (p)}
      <option value={p}>{p}</option>
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
{#if reveal}
  <div class="reveal-stage" data-testid="pick-reveal">
    <div class="reveal-card">
      <div class="reveal-round">R{reveal.round}.{reveal.pickInRound}</div>
      <div class="reveal-bub">{reveal.pos}{reveal.ovr}</div>
      <div class="reveal-name">{reveal.name}</div>
      <div class="reveal-team">{reveal.team}</div>
      <div class="reveal-word">COMMITTED</div>
    </div>
  </div>
{/if}
