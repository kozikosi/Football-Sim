<!-- Team Select (w74 items 5a+5b, Z.ai DRAFT). The screen is a pure renderer: the VM below hands it everything
     pre-formatted, and the only logic here is the click -> dispatch mapping. -->
<script lang="ts">
  import { teamSelectVM } from '../../sports/nfl/view/teamSelect.ts';
  import { dispatch, appState } from '../app-store.svelte.ts';

  // G-VM5 (flagged): the seed lives in component state until the whole-app reducer exists — it is EPHEMERAL
  // session state, not persisted state. Default: a fixed, shown value the user can edit (no Math.random here:
  // the seed is the reproducibility contract, and a seed card or share URL can fill it).
  let seedInput = $state('2026');
  let selected = $state<number | null>(null);

  const st = $derived(appState());
  const vm = $derived(teamSelectVM(st.error));
  const canStart = $derived(selected !== null && Number.isInteger(Number(seedInput)) && Number(seedInput) >= 0);

  function start(): void {
    if (!canStart || selected === null) return;
    dispatch({ type: 'START', seed: Number(seedInput), userTeam: selected });
  }
</script>

<header>
  <h1>{vm.title}</h1>
  <p class="tagline">{vm.tagline}</p>
</header>

{#if vm.error}
  <p class="error" role="alert">{vm.error}</p>
{/if}

<label class="seed" for="seed">World seed</label>
<input id="seed" name="seed" bind:value={seedInput} inputmode="numeric" pattern="[0-9]*" />
<p class="hint">{vm.seedHint}</p>

<ul class="teams" role="listbox" aria-label="Choose your team">
  {#each vm.teams as t (t.index)}
    <li>
      <button
        type="button"
        role="option"
        aria-selected={selected === t.index}
        class:sel={selected === t.index}
        onclick={() => (selected = t.index)}
      >
        <span class="name">{t.name}</span>
        <span class="meta">{t.conf} · {t.div}</span>
      </button>
    </li>
  {/each}
</ul>

<button type="button" class="go" disabled={!canStart} onclick={start}>{vm.startLabel}</button>

<style>
  .teams { list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: 0.5rem; padding: 0; }
  .teams button { width: 100%; text-align: left; padding: 0.5rem; border: 1px solid #bbb; background: #fff; cursor: pointer; }
  .teams button.sel { outline: 3px solid currentColor; font-weight: 700; }
  .name { display: block; font-weight: 600; }
  .meta { display: block; font-size: 0.75rem; opacity: 0.75; }
  .go { margin-top: 1rem; padding: 0.6rem 1.4rem; font-size: 1rem; }
  .go:disabled { opacity: 0.5; cursor: not-allowed; }
  .error { color: #b00020; }
  .hint { font-size: 0.8rem; opacity: 0.7; }
</style>
