<!-- Slice 3 — the "my needs" sticky row: which of my 32 slots are still open, clickable to filter the board
     to those slots. Carried from Slice 1 (the Slice 2 README documented the carry); built here.
     Open slots come from the engine's own `openSlots`; labels from the snapshot's `slotLabel`. -->
<script lang="ts">
  import { SLOTS } from '../../engine/sports/nfl/engine/slots.ts';
  import type { SlotId, Unit } from '../../engine/sports/nfl/engine/slots.ts';
  import { slotLabel } from '../../engine/sports/nfl/view/draftBoard.ts';

  let {
    open, selected = [],
    ontoggle, onclear,
  }: {
    open: SlotId[];                       // the engine's open slots for my roster
    selected?: SlotId[];                  // the filter selection (ephemeral UI state, App-owned)
    ontoggle: (slot: SlotId) => void;
    onclear: () => void;
  } = $props();

  const UNIT_LABEL: Record<Unit, string> = { offense: 'OFF', defense: 'DEF', special: 'ST' };
  const unitOf: Record<string, Unit> = Object.fromEntries(SLOTS.map((s) => [s.id, s.unit]));
  const byUnit = (u: Unit): SlotId[] => SLOTS.filter((s) => s.unit === u && open.includes(s.id)).map((s) => s.id);
  const isSel = (id: SlotId): boolean => selected.includes(id);
</script>

<div class="cp-needs" data-testid="cp-needs">
  <span class="cp-needs-lbl">MY NEEDS · {open.length} OPEN</span>
  {#each ['offense', 'defense', 'special'] as u (u)}
    <span class="cp-needs-unit">{UNIT_LABEL[u as Unit]}</span>
    {#each byUnit(u as Unit) as id (id)}
      <button
        class="cp-need"
        class:cp-need-on={isSel(id)}
        onclick={() => ontoggle(id)}
        aria-pressed={isSel(id)}
        title="filter the board to {slotLabel(id)}"
      >{slotLabel(id)}</button>
    {/each}
  {/each}
  {#if selected.length}
    <button class="cp-need cp-need-all" onclick={onclear}>ALL</button>
  {/if}
</div>

<style>
  .cp-needs { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
    background: rgba(34, 24, 32, 0.97); border: 1px solid #3a2c31; border-radius: 10px; padding: 8px 10px; margin: 0 0 10px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35); }
  .cp-needs-lbl { font-size: 0.68rem; letter-spacing: 0.18em; font-weight: 800; color: #e8c87e; white-space: nowrap; }
  .cp-needs-unit { font-size: 0.62rem; letter-spacing: 0.14em; color: #c8a48f; margin-left: 4px; }
  .cp-need { border: 1px solid #8a5f18; background: transparent; color: #e8c87e; border-radius: 999px;
    padding: 3px 10px; cursor: pointer; font-family: inherit; font-size: 0.72rem; font-weight: 700; line-height: 1.4; }
  .cp-need:hover { background: rgba(217, 169, 76, 0.12); }
  .cp-need-on { background: linear-gradient(90deg, #c9a24b, #b3766a); color: #2c1e0c; border-color: transparent; }
  .cp-need-all { border-color: #b3766a; color: #f5e9dd; }
</style>
