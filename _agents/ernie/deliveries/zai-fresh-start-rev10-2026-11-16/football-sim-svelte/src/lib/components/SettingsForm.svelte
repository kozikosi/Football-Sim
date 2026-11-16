<script lang="ts">
  // SettingsForm.svelte — C6 (the persistence test): toggles + a number input, persisted through
  // the bridge's localStorage (settings are app-owned state; the bridge owns browser APIs here).
  import { app } from '../state/appStore.svelte.ts';
  let stateText = $derived(JSON.stringify(app.settings, null, 0));   // reactive: must re-read after reload (the persistence contract)
</script>

<section class="settings">
  <div class="cards-head">
    <h2 style="margin: 0">SETTINGS</h2>
    <span class="cards-count">PERSISTED LOCALLY</span>
  </div>
  <div class="set-row">
    <label for="set-compact">COMPACT CARDS <span class="set-hint">tighter grid, smaller medallions</span></label>
    <input id="set-compact" type="checkbox" data-testid="set-toggle-compact" checked={app.settings.compact} onchange={() => app.toggleSetting('compact')} />
  </div>
  <div class="set-row">
    <label for="set-sounds">DRIVE SOUNDS <span class="set-hint">placeholder — the engine has no audio yet</span></label>
    <input id="set-sounds" type="checkbox" data-testid="set-toggle-sounds" checked={app.settings.sounds} onchange={() => app.toggleSetting('sounds')} />
  </div>
  <div class="set-row">
    <label for="set-ticker">FEED TICK <span class="set-hint">milliseconds per drive reveal</span></label>
    <input id="set-ticker" type="number" min="200" max="3000" step="100" value={app.settings.tickerMs} onchange={(e) => (app.settings = { ...app.settings, tickerMs: Number((e.currentTarget as HTMLInputElement).value) || 700 })} />
  </div>
  <p class="set-state" data-testid="set-state">{stateText}</p>
</section>
