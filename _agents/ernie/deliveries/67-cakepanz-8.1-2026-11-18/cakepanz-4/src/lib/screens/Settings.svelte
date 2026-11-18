<!-- 67 Cakepanz · the settings form: persistence across reload (verified by the battery), the theme
     mode (light/dark/system — both modes beautiful per the w89 tokens), reduced motion, the feed's
     reading order, and the entry to the saves panel. A corrupt stored blob falls back to defaults
     (settings are preferences, not provenance). -->
<script lang="ts">
  import { MODE_LABEL } from '../valuation.ts';
  import { valuation } from '../valuation.ts';
  import type { Settings } from '../port/settings.ts';

  let { settings, onmode, onmotion, onorder, onsaves, onresetsave }: {
    settings: Settings;
    onmode: (m: Settings['mode']) => void;
    onmotion: (v: boolean) => void;
    onorder: (v: boolean) => void;
    onsaves: () => void;
    onresetsave: () => void;
  } = $props();
</script>

<section class="cp-settings">
  <h2 class="cp-h2">SETTINGS</h2>
  <div class="cp-panel">
    <div class="cp-setrow">
      <label for="set-mode">Colour mode</label>
      <select id="set-mode" value={settings.mode} onchange={(e) => onmode((e.currentTarget as HTMLSelectElement).value as Settings['mode'])}>
        <option value="system">Follow the system</option>
        <option value="light">Light (pale rose)</option>
        <option value="dark">Dark (plum ink)</option>
      </select>
    </div>
    <div class="cp-setrow">
      <label for="set-motion">Reduce motion</label>
      <input id="set-motion" type="checkbox" checked={settings.reducedMotion} onchange={(e) => onmotion((e.currentTarget as HTMLInputElement).checked)} />
    </div>
    <div class="cp-setrow">
      <label for="set-order">Feed reading: newest first</label>
      <input id="set-order" type="checkbox" checked={settings.newestFirst} onchange={(e) => onorder((e.currentTarget as HTMLInputElement).checked)} />
    </div>
    <div class="cp-setrow">
      <span class="cp-cap">Valuation mode</span>
      <span class="cp-sub">{MODE_LABEL[valuation.get().mode]}{valuation.get().locked ? ' (locked mid-draft)' : ''}</span>
    </div>
  </div>
  <div class="cp-chipline">
    <button class="cp-stepbtn" onclick={onsaves}>SAVES · SLOT A · B · C</button>
    <button class="cp-stepbtn" onclick={onresetsave}>CLEAR SAVED CHOICES</button>
  </div>
  <p class="cp-note">Settings persist across reload. Saves are one blob per slot, version-checked on every read — a corrupt save is refused verbatim, never repaired.</p>
</section>
