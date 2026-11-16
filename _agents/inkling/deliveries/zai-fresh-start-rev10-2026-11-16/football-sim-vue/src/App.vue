<script setup lang="ts">
// App.vue — the fresh-start shell: w89 chrome, six screens, one store.
import { useAppStore } from './stores/appStore';
import PlayerCards from './components/PlayerCards.vue';
import StatsTable from './components/StatsTable.vue';
import BoardRow from './components/BoardRow.vue';
import LiveFeed from './components/LiveFeed.vue';
import WeekStepper from './components/WeekStepper.vue';
import SettingsForm from './components/SettingsForm.vue';

const app = useAppStore();

const NAV: { id: 'cards' | 'stats' | 'board' | 'feed' | 'week' | 'settings'; label: string; testid: string }[] = [
  { id: 'cards', label: 'CARDS', testid: 'nav-cards' },
  { id: 'stats', label: 'STATS', testid: 'nav-stats' },
  { id: 'board', label: 'BOARD', testid: 'nav-board' },
  { id: 'feed', label: 'FEED', testid: 'nav-feed' },
  { id: 'week', label: 'SEASON', testid: 'nav-week' },
  { id: 'settings', label: 'SETTINGS', testid: 'nav-settings' },
];
</script>

<template>
  <div class="app-shell" data-testid="app-shell">
    <header class="app-head">
      <h1 class="app-title">67 CAKEPANZ</h1>
      <span class="app-sub">FRESH-START FRAMEWORK SITTING · W89 CHROME</span>
    </header>
    <nav class="app-nav">
      <button
        v-for="n in NAV" :key="n.id" class="nav-btn" :class="{ active: app.screen === n.id }"
        :data-testid="n.testid" @click="app.go(n.id)"
      >{{ n.label }}</button>
    </nav>
    <div class="gold-rule" />
    <main>
      <PlayerCards v-if="app.screen === 'cards'" />
      <StatsTable v-else-if="app.screen === 'stats'" />
      <BoardRow v-else-if="app.screen === 'board'" />
      <LiveFeed v-else-if="app.screen === 'feed'" />
      <WeekStepper v-else-if="app.screen === 'week'" />
      <SettingsForm v-else />
    </main>
  </div>
</template>
