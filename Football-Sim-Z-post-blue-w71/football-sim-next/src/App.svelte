<script lang="ts">
  // Scaffold proof: a Svelte 5 component consuming the engine-side store contract
  // directly via $-auto-subscription. No adapters, no wrappers — the seam the
  // framework recommendation rests on, made runnable.
  import { createSimStore } from './lib/simStore';

  const store = createSimStore();
  const teams = ['Pittsburgh Steelers', 'Cleveland Browns', 'Baltimore Ravens', 'Cincinnati Bengals'];

  let team = $state(teams[0]);

  function start() {
    store.dispatch({ type: 'START', seed: (Math.floor(Math.random() * 2 ** 31) | 0) >>> 0 });
  }
  function pick() {
    store.dispatch({ type: 'PICK', team, playerId: 'p' + String(store.get().picks.length + 1).padStart(5, '0') });
  }
  function undo() {
    store.dispatch({ type: 'UNDO' });
  }
</script>

<main>
  <h1>Football-Sim — scaffold proof</h1>
  <p class="sub">Svelte 5 + Vite + TypeScript + Vitest · engine-side store contract consumed unmodified</p>

  <section class="panel">
    <label>
      Team
      <select bind:value={team}>
        {#each teams as t}<option value={t}>{t}</option>{/each}
      </select>
    </label>
    <div class="row">
      <button onclick={start}>Start draft</button>
      <button onclick={pick} disabled={!$store.seed}>Pick</button>
      <button onclick={undo} disabled={store.get().picks.length === 0}>Undo</button>
    </div>
    <p class="state">
      seed: {$store.seed ?? '—'} · picks: {$store.picks.length} · revision: {$store.revision}
    </p>
    {#if $store.picks.length}
      <ol>
        {#each $store.picks.slice(-5) as p}
          <li>{p.team} → {p.playerId}</li>
        {/each}
      </ol>
    {/if}
  </section>
</main>

<style>
  main {
    max-width: 640px;
    margin: 0 auto;
    padding: 2rem 1.25rem;
    font-family: Georgia, 'Times New Roman', serif;
    color: #2b1d12;
  }
  h1 {
    font-variant: small-caps;
    letter-spacing: 0.04em;
    border-bottom: 3px double #b98a2e;
    padding-bottom: 0.4rem;
  }
  .sub {
    color: #7a6a55;
    font-size: 0.9rem;
  }
  .panel {
    margin-top: 1.25rem;
    border: 1px solid #d8c9a6;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    background: #faf4e4;
  }
  .row {
    display: flex;
    gap: 0.5rem;
    margin: 0.75rem 0;
  }
  button {
    border: 1px solid #b98a2e;
    background: #f3e3b8;
    color: #4a2b0d;
    border-radius: 6px;
    padding: 0.45rem 0.9rem;
    cursor: pointer;
    font: inherit;
  }
  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  select {
    font: inherit;
    margin-left: 0.5rem;
  }
  .state {
    font-family: ui-monospace, monospace;
    font-size: 0.85rem;
    color: #5a4632;
  }
</style>
