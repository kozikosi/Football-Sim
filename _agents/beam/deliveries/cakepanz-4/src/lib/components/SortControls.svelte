<!-- The sort controls: wins / OVR / priority — the default sort is wins/priority, never raw OVR. -->
<script lang="ts">
  import type { BoardSort } from '../port/seam.ts';
  let { sort, onsort }: { sort: BoardSort; onsort: (s: BoardSort) => void } = $props();
  const OPTS: { k: BoardSort; lbl: string }[] = [
    { k: 'wins', lbl: 'Wins' },
    { k: 'priority', lbl: 'Priority' },
    { k: 'ovr', lbl: 'OVR' },
  ];
</script>

<div class="cp-sorts" role="group" aria-label="Sort the board">
  {#each OPTS as o}
    <button class="cp-sort" class:cp-on={sort === o.k} onclick={() => onsort(o.k)}>{o.lbl}</button>
  {/each}
</div>

<style>
  .cp-sorts { display: inline-flex; gap: 6px; }
  .cp-sort { border: 1px solid var(--hairline); background: transparent; color: var(--sub); border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; font-size: 0.82rem; }
  .cp-sort.cp-on { border-color: var(--goldm); color: var(--on-gold); background: var(--goldm); font-weight: 800; }
</style>
