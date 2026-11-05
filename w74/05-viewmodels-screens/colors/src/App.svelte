<!-- Root screen switch (w74 item 5b, Z.ai DRAFT — G-VM4): -->
<!-- The slice switches on the DRAFT store's status because the whole-app AppState reducer (appstate.ts) is -->
<!-- pending. The mapping is written so the swap is mechanical: noSave -> teamSelect, drafting/draftDone -> draft. -->
<!-- Screens that need WeekPayload (season/standings/playoffs/summary) render placeholders that name their -->
<!-- view-model entry points, so the pattern freeze has something concrete to rule on. -->
<script lang="ts">
  import TeamSelect from './lib/components/TeamSelect.svelte';
  import DraftBoard from './lib/components/DraftBoard.svelte';
  import { appState, isReadOnly } from './lib/app-store.svelte.ts';

  const st = $derived(appState());
  const readOnly = $derived(isReadOnly());
  // G-VM4: screen derivation, appstate.ts Screen names.
  const screen = $derived(st.status === 'drafting' || st.status === 'done' ? 'draft' : 'teamSelect');
</script>

{#if readOnly}
  <div class="banner" role="status">Read-only shared draft — you can look, not play. <a href={typeof location !== 'undefined' ? location.pathname : '/'}>Start your own</a></div>
{/if}

<main>
  {#if screen === 'teamSelect'}
    <TeamSelect />
  {:else if screen === 'draft'}
    <DraftBoard />
  {:else}
    <p>Screen not built yet.</p>
  {/if}
</main>

<style>
  .banner { padding: 0.5rem 1rem; background: #333; color: #fff; font-size: 0.9rem; }
  main { max-width: 60rem; margin: 0 auto; padding: 1rem; }
</style>
