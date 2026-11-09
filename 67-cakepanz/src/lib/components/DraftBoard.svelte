<!-- The board: the list of available players ranked by the chosen sort (default wins/priority, never raw OVR). -->
<script lang="ts">
  import type { BoardVM } from '../../engine/sports/nfl/view/draftBoard.ts';
  import BoardHeader from './BoardHeader.svelte';
  import BoardRow from './BoardRow.svelte';
  import BoardFooter from './BoardFooter.svelte';
  import SlotPicker from './SlotPicker.svelte';

  let { vm, onpick, onundo, onsort, canUndo }: {
    vm: BoardVM; onpick: (id: string, slot: string) => void; onundo: () => void; onsort: (s: any) => void; canUndo: boolean;
  } = $props();
  let picked = $state<{ id: string; slot: string } | null>(null);
  let row: HTMLDivElement | null = $state(null);
</script>

<section class="cp-board" aria-label="Draft board">
  <BoardHeader header={vm.header} />
  {#if picked}
    <p class="cp-confirm">
      Draft <b>{vm.rows.find((r) => r.id === picked.id)?.name}</b> at <b>{picked.slot}</b>?
      <button class="cp-btn cp-go" onclick={() => { onpick(picked.id, picked.slot); picked = null; }}>Confirm the pick</button>
      <button class="cp-btn" onclick={() => (picked = null)}>Cancel</button>
    </p>
  {/if}
  <div class="cp-rows" bind:this={row}>
    {#each vm.rows as r (r.id)}
      <BoardRow {r} onpick={(id, slot) => (picked = { id, slot })} />
    {/each}
  </div>
  <BoardFooter footer={vm.footer} canUndo={canUndo} onundo={onundo} onsort={onsort} sort={vm.sort} />
</section>

<style>
  .cp-board { border: 1px solid #3a2c31; border-radius: 14px; background: #221820; padding: 14px; }
  .cp-confirm { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; border: 1px solid #d9a94c; border-radius: 10px; padding: 10px 12px; background: #2c2127; }
  .cp-btn { border: 1px solid #8a5f18; background: transparent; color: #e8c87e; border-radius: 999px; padding: 7px 16px; cursor: pointer; font-family: inherit; }
  .cp-btn:hover { background: rgba(217, 169, 76, 0.12); }
  .cp-go { background: linear-gradient(90deg, #c9a24b, #b3766a); color: #2c1e0c; font-weight: 800; }
  .cp-rows { margin: 10px 0; }
</style>
