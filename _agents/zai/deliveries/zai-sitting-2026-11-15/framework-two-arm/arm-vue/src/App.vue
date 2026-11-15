<script setup lang="ts">
  // Two-arm build, arm 1 (Vue 3 + Vite). The root: the four-slice shell — the store boots itself
  // for the persisted team (see appStore), the nav switches screens, the active screen renders.
  import FeedPanel from './components/FeedPanel.vue';
  import Board from './components/Board.vue';
  import TeamSelect from './components/TeamSelect.vue';
  import Saves from './components/Saves.vue';
  import { ui, go, feed } from './lib/appStore.ts';
  import type { Screen } from './lib/appStore.ts';

  const nav: { id: Screen; label: string }[] = [
    { id: 'team', label: 'TEAM' }, { id: 'board', label: 'BOARD' }, { id: 'saves', label: 'SAVES' }, { id: 'feed', label: 'FEED' },
  ];
</script>

<template>
  <main class="cp-root">
    <header>
      <div class="cp-brand">76 Pancakes <span class="cp-shine">·</span> <span class="cp-track">two-arm build · Vue 3 + Vite · four slices</span></div>
      <nav class="cp-nav" aria-label="Screens">
        <button v-for="n in nav" :key="n.id" class="cp-feedtool" :class="{ 'cp-feedtool-on': ui.screen === n.id }" :aria-pressed="ui.screen === n.id" @click="go(n.id)">{{ n.label }}</button>
      </nav>
      <p class="cp-note">The four-slice build — team select, draft board, saves, feed — engine-true in both arms. The engine, the view-models, the fixture and the chrome are the same bytes as the Svelte arm; the framework is the only variable.</p>
    </header>
    <TeamSelect v-if="ui.screen === 'team'" />
    <Board v-else-if="ui.screen === 'board'" />
    <Saves v-else-if="ui.screen === 'saves'" />
    <FeedPanel v-else :feed="feed" />
  </main>
</template>
