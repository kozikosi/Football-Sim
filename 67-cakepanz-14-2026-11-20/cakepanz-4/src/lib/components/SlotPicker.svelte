<!-- The slot picker: choose which slot the pick fills; the chips read the flex cost (just "-10" where the table says so). -->
<script lang="ts">
  import { SLOT_IDS } from '../port/seam.ts';
  import { fit } from '../port/seam.ts';
  import { SLOTS } from '../port/seam.ts';
  import type { Dest, SlotId } from '../port/seam.ts';

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
  .cp-slot { border: 1px solid var(--hairline); background: transparent; color: var(--sub); border-radius: 999px; padding: 4px 10px; cursor: pointer; font-family: inherit; font-size: 0.76rem; }
  .cp-slot.cp-nat { border-color: var(--goldm); color: var(--gold2); }
  .cp-slot:hover { background: rgba(217, 169, 76, 0.12); }
</style>
