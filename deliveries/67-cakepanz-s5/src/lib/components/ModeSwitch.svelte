<!-- The valuation modes: Measured (the default) · Game balance · Owner preset — one click away,
     echoed in the subtitle everywhere numbers appear, DISABLED mid-draft. Never blended. -->
<script lang="ts">
  import { valuation, MODE_LABEL } from '../valuation.ts';
  import type { ValuationMode } from '../valuation.ts';
  let s = $state(valuation.get());
  valuation.subscribe((v) => (s = v));
  const OPTS: ValuationMode[] = ['measured', 'balance', 'owner'];
</script>

<div class="cp-modes" role="group" aria-label="Valuation mode" class:cp-locked={s.locked}>
  {#each OPTS as m}
    <button class="cp-mode" class:cp-on={s.mode === m} disabled={s.locked} title={s.locked ? 'The mode switch is disabled mid-draft' : MODE_LABEL[m]}
      onclick={() => valuation.set(m)}>{MODE_LABEL[m]}</button>
  {/each}
</div>

<style>
  .cp-modes { display: inline-flex; gap: 6px; margin-left: auto; }
  .cp-mode { border: 1px solid #3a2c31; background: transparent; color: #c8a48f; border-radius: 999px; padding: 5px 12px; cursor: pointer; font-family: inherit; font-size: 0.78rem; }
  .cp-mode.cp-on { border-color: #d9a94c; color: #2c1e0c; background: #d9a94c; font-weight: 800; }
  .cp-mode:disabled { opacity: 0.45; cursor: default; }
  .cp-locked { opacity: 0.85; }
</style>
