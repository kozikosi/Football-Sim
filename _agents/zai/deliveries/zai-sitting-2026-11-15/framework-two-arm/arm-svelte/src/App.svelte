<script lang="ts">
  // Two-arm build, arm 2 (Svelte 5 + Vite). The root: the four-slice shell — the store boots itself
  // for the persisted team (see appStore), the nav switches screens, the active screen renders.
  import FeedPanel from './lib/screens/FeedPanel.svelte';
  import Board from './lib/screens/Board.svelte';
  import TeamSelect from './lib/screens/TeamSelect.svelte';
  import Saves from './lib/screens/Saves.svelte';
  import { ui, go, feed } from './lib/appStore.svelte.ts';

  const nav: { id: typeof ui.screen; label: string }[] = [
    { id: 'team', label: 'TEAM' }, { id: 'board', label: 'BOARD' }, { id: 'saves', label: 'SAVES' }, { id: 'feed', label: 'FEED' },
  ];
</script>

<main class="cp-root">
  <header>
    <div class="cp-brand">76 Pancakes <span class="cp-shine">·</span> <span class="cp-track">two-arm build · Svelte 5 + Vite · four slices</span></div>
    <nav class="cp-nav" aria-label="Screens">
      {#each nav as n (n.id)}
        <button class="cp-feedtool" class:cp-feedtool-on={ui.screen === n.id} aria-pressed={ui.screen === n.id} onclick={() => go(n.id)}>{n.label}</button>
      {/each}
    </nav>
    <p class="cp-note">The four-slice build — team select, draft board, saves, feed — engine-true in both arms. The engine, the view-models, the fixture and the chrome are the same bytes as the Vue arm; the framework is the only variable.</p>
  </header>
  {#if ui.screen === 'team'}<TeamSelect />{:else if ui.screen === 'board'}<Board />{:else if ui.screen === 'saves'}<Saves />{:else}<FeedPanel feed={feed()} />{/if}
</main>
