<!-- The board: the list of available players ranked by the chosen sort (default wins/priority, never raw OVR).
     Slice 3 chrome pass: the needs sticky row (clickable filter) + the gone-odds method tooltip on every row.
     cakepanz-9 (2026-11-19, the Owner's ruling): ONE uniform board for picks 1–32 — the late-mode
     flip is SUPERSEDED and deleted (the order §5/B-bis): no data-form, no simple branch, no FULL
     BOARD door, no late note. C′1: the top three available rows by the ACTIVE order carry the
     suggestion ring; more than three only on an order tie (the comment on suggestIds says so). -->
<script lang="ts">
  import type { BoardVM, BoardRowVM } from '../port/seam.ts';
  import type { SlotId } from '../port/seam.ts';
  import BoardHeader from './BoardHeader.svelte';
  import BoardRow from './BoardRow.svelte';
  import BoardFooter from './BoardFooter.svelte';
  import SlotPicker from './SlotPicker.svelte';
  import NeedsRow from './NeedsRow.svelte';

  let {
    vm, onpick, onundo, onsort, canUndo, openSlots = [], oddsMeta = null, needsSelected = [], onneedtoggle, onneedclear, onplay, draftDone = false,
  }: {
    vm: BoardVM; onpick: (id: string, slot: string) => void; onundo: () => void; onsort: (s: any) => void; canUndo: boolean;
    openSlots?: SlotId[]; oddsMeta?: { picksBetween: number; sims: number } | null;
    needsSelected?: SlotId[]; onneedtoggle: (slot: SlotId) => void; onneedclear: () => void;
    onplay: () => void; draftDone?: boolean;
  } = $props();
  let picked = $state<{ id: string; slot: string } | null>(null);
  let row: HTMLDivElement | null = $state(null);

  // the needs filter: a row qualifies when the selected slot is its primary fill OR one of its flex fills
  const shown = $derived(
    needsSelected.length === 0
      ? vm.rows
      : vm.rows.filter((r) => needsSelected.includes(r.slotId) || r.alsoFits.some((f) => needsSelected.includes(f.slotId))),
  );
  // C′1 (cakepanz-9): the top THREE rows by the board's ACTIVE order get the suggestion ring — the
  // Owner's ruling: "at least three players' draft buttons highlighted i think the user can speedrun
  // the suggestions that way". More than three ONLY on an order tie: the extension walks past the
  // third row while its sort value repeats (the wins values sit on the engine's 1e-9 grid, so real
  // ties compare exactly).
  const suggestIds = $derived.by(() => {
    const rows = shown;
    const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;
    const ids: string[] = [];
    const base = Math.min(3, rows.length);
    for (let i = 0; i < base; i++) ids.push(rows[i].id);
    if (base === 3) {
      const third = val(rows[2]);
      for (let i = 3; i < rows.length && val(rows[i]) === third; i++) ids.push(rows[i].id);
    }
    return new Set(ids);
  });
</script>

<section class="cp-board" aria-label="Draft board">
  <BoardHeader header={vm.header} />
  <NeedsRow open={openSlots} selected={needsSelected} ontoggle={onneedtoggle} onclear={onneedclear} />
  {#if picked}
    <p class="cp-confirm">
      Draft <b>{vm.rows.find((r) => r.id === picked.id)?.name}</b> at <b>{picked.slot}</b>?
      <button class="cp-btn cp-go" onclick={() => { onpick(picked.id, picked.slot); picked = null; }}>Confirm the pick</button>
      <button class="cp-btn" onclick={() => (picked = null)}>Cancel</button>
    </p>
  {/if}
  <div class="cp-rows" bind:this={row} data-count={shown.length}>
    {#each shown as r (r.id)}
      <BoardRow {r} onpick={(id, slot) => (picked = { id, slot })} {oddsMeta} suggest={suggestIds.has(r.id)} />
    {/each}
  </div>
  <BoardFooter footer={vm.footer} canUndo={canUndo} onundo={onundo} onsort={onsort} sort={vm.sort} {onplay} {draftDone} />
</section>

<style>
  .cp-board { border: 1px solid #3a2c31; border-radius: 14px; background: #221820; padding: 14px; }
  .cp-confirm { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; border: 1px solid var(--goldm); border-radius: 10px; padding: 10px 12px; background: #2c2127; }
  .cp-btn { border: 1px solid var(--gold3); background: transparent; color: var(--gold2); border-radius: 999px; padding: 7px 16px; cursor: pointer; font-family: inherit; }
  .cp-btn:hover { background: color-mix(in srgb, var(--goldm) 12%, transparent); }
  .cp-go { background: linear-gradient(90deg, #c9a24b, #b3766a); color: #2c1e0c; font-weight: 800; }
  .cp-rows { margin: 10px 0; }
</style>
