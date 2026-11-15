<script lang="ts">
  import { onMount } from 'svelte';
  import PlaywrightDemo from './components/demo/PlaywrightDemo.svelte';
  import RingersMatch from './components/RingersMatch.svelte';
  import { SimStateBridge } from './lib/state/sim-state.svelte';

  const simState = new SimStateBridge();
  const isPlaywrightDemo =
    window.location.pathname === '/demo/playwright';

  onMount(() => {
    if (import.meta.env.DEV) {
      Object.defineProperty(window, '__SIM_STATE__', {
        get: () => simState.snapshot(),
        configurable: true
      });
    }
  });
</script>

<svelte:head>
  <title>Football Sim — Svelte 5 + Vite</title>
</svelte:head>

{#if isPlaywrightDemo}
  <PlaywrightDemo />
{:else}
  <RingersMatch />
{/if}
