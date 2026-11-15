<!-- Slice-5 arc (c) — the bottom-left lineup panel (SVELTE arm, randomised assignment): the user's
     REAL filled slots from the store's draft log, updating as the user studies a player (opening a
     featured card highlights the incumbent of the SAME POSITION — who the studied player would
     compete with). One panel, arm-owned per the sitting's assignment. -->
<script lang="ts">
  import { draftSnap, studiedId } from '../appStore.svelte.ts';

  const mine = $derived((draftSnap().draft?.log ?? []).filter((k) => k.team === draftSnap().record?.userTeam));
  const studied = $derived(studiedId());
</script>

<aside class="cp-lineup" aria-label="My lineup">
  <h4>MY LINEUP · {mine.length} {mine.length === 1 ? 'pick' : 'picks'}</h4>
  <div class="cp-lineup-rows">
    {#each mine as k (k.overall)}
      <div class="cp-lineup-row" class:cp-lineup-on={studied === k.player.pos} data-pos={k.player.pos}>{k.slot} · {k.player.name}</div>
    {/each}
    {#if mine.length === 0}<div class="cp-lineup-row">no picks yet — the board is waiting on you</div>{/if}
  </div>
</aside>
