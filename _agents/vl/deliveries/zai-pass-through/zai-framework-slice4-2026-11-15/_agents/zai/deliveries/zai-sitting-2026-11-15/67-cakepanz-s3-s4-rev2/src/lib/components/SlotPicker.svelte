<!-- The slot picker: choose which slot the pick fills; the chips read the flex cost (just "-10" where the table says so). -->
<script lang="ts">
  import { SLOT_IDS } from '../../engine/sports/nfl/engine/slots.ts';
  import { fit } from '../../engine/sports/nfl/engine/flex.ts';
  import { SLOTS } from '../../engine/sports/nfl/engine/slots.ts';
  import type { Dest, SlotId } from '../../engine/sports/nfl/engine/slots.ts';

  let { role, onslot }: { role: string; onslot: (s: SlotId) => void } = $props();
  const DEST = Object.fromEntries(SLOTS.map((x) => [x.id, x.dest])) as Record<SlotId, Dest>;
  const opts = SLOT_IDS.map((id) => { const pen = fit(role as any, DEST[id]); return { id, pen: pen.legal ? pen.penalty : null }; });
</script>
<div class="cp-picker" role="group" aria-label="Pick a slot">
  {#each opts as o}
    {#if o.pen !== null}
      <button class="cp-slot" class:cp-nat={o.pen === 0} onclick={() => onslot(o.id)}>{o.id}{o.pen > 0 ? ` (-${o.pen})` : ''}</button>
    {/if}
  {/each}
</div>
<style>
  .cp-picker { display: flex; gap: 6px; flex-wrap: wrap; }
  .cp-slot { border: 1px solid #3a2c31; background: transparent; color: #c8a48f; border-radius: 999px; padding: 4px 10px; cursor: pointer; font-family: inherit; font-size: 0.76rem; }
  .cp-slot.cp-nat { border-color: #d9a94c; color: #e8c87e; }
  .cp-slot:hover { background: rgba(217, 169, 76, 0.12); }
</style>
