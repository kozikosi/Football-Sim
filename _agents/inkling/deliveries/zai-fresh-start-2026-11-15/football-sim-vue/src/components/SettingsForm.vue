<script setup lang="ts">
// SettingsForm.vue — C6 (the persistence test the feed doesn't cover): toggles + a number input,
// persisted through the store's VueUse useLocalStorage (the house rule: VueUse for browser APIs).
// The state line (data-testid="set-state") is the probe contract — it renders the JSON the probe
// asserts persists across a reload.
import { computed } from 'vue';
import { useAppStore } from '../stores/appStore';

const app = useAppStore();
const stateText = computed(() => JSON.stringify(app.settings, null, 0));   // reactive: must re-read after reload (the persistence contract)
</script>

<template>
  <section class="settings">
    <div class="cards-head">
      <h2 style="margin: 0">SETTINGS</h2>
      <span class="cards-count">PERSISTED LOCALLY</span>
    </div>
    <div class="set-row">
      <label for="set-compact">COMPACT CARDS <span class="set-hint">tighter grid, smaller medallions</span></label>
      <input id="set-compact" type="checkbox" data-testid="set-toggle-compact" :checked="app.settings.compact" @change="app.toggleSetting('compact')" />
    </div>
    <div class="set-row">
      <label for="set-sounds">DRIVE SOUNDS <span class="set-hint">placeholder — the engine has no audio yet</span></label>
      <input id="set-sounds" type="checkbox" data-testid="set-toggle-sounds" :checked="app.settings.sounds" @change="app.toggleSetting('sounds')" />
    </div>
    <div class="set-row">
      <label for="set-ticker">FEED TICK <span class="set-hint">milliseconds per drive reveal</span></label>
      <input id="set-ticker" type="number" min="200" max="3000" step="100" :value="app.settings.tickerMs" @change="app.settings = { ...app.settings, tickerMs: Number(($event.target as HTMLInputElement).value) || 700 }" />
    </div>
    <p class="set-state" data-testid="set-state">{{ stateText }}</p>
  </section>
</template>
