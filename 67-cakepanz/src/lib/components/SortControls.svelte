<!-- The sort controls: wins / OVR / priority — the default sort is wins/priority, never raw OVR. -->
<script lang="ts">
  import type { BoardSort } from '../../engine/sports/nfl/view/draftBoard.ts';
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
  .cp-sort { border: 1px solid #3a2c31; background: transparent; color: #c8a48f; border-radius: 999px; padding: 6px 14px; cursor: pointer; font-family: inherit; font-size: 0.82rem; }
  .cp-sort.cp-on { border-color: #d9a94c; color: #2c1e0c; background: #d9a94c; font-weight: 800; }
</style>
