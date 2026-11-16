<script lang="ts">
  // App.svelte — the fresh-start shell: w89 chrome, six screens, one bridge (runes-only).
  import { app } from './lib/state/appStore.svelte.ts';
  import PlayerCards from './lib/components/PlayerCards.svelte';
  import StatsTable from './lib/components/StatsTable.svelte';
  import BoardRow from './lib/components/BoardRow.svelte';
  import LiveFeed from './lib/components/LiveFeed.svelte';
  import WeekStepper from './lib/components/WeekStepper.svelte';
  import SettingsForm from './lib/components/SettingsForm.svelte';

  const NAV = [
    { id: 'cards', label: 'CARDS', testid: 'nav-cards' },
    { id: 'stats', label: 'STATS', testid: 'nav-stats' },
    { id: 'board', label: 'BOARD', testid: 'nav-board' },
    { id: 'feed', label: 'FEED', testid: 'nav-feed' },
    { id: 'week', label: 'SEASON', testid: 'nav-week' },
    { id: 'settings', label: 'SETTINGS', testid: 'nav-settings' },
  ] as const;

  // DEV-only QA hook (house rule): expose the bridge, not a copy.
  if (import.meta.env.DEV) {
    (window as unknown as Record<string, unknown>).__SIM_STATE__ = app;
  }
</script>

<svelte:head>
  <title>67 Cakepanz — fresh-start sitting</title>
</svelte:head>

<div class="app-shell" data-testid="app-shell">
  <header class="app-head">
    <h1 class="app-title">67 CAKEPANZ</h1>
    <span class="app-sub">FRESH-START FRAMEWORK SITTING · W89 CHROME</span>
  </header>
  <nav class="app-nav">
    {#each NAV as n (n.id)}
      <button class="nav-btn" class:active={app.screen === n.id} data-testid={n.testid} onclick={() => app.go(n.id)}>{n.label}</button>
    {/each}
  </nav>
  <div class="gold-rule"></div>
  <main>
    {#if app.screen === 'cards'}
      <PlayerCards />
    {:else if app.screen === 'stats'}
      <StatsTable />
    {:else if app.screen === 'board'}
      <BoardRow />
    {:else if app.screen === 'feed'}
      <LiveFeed />
    {:else if app.screen === 'week'}
      <WeekStepper />
    {:else}
      <SettingsForm />
    {/if}
  </main>
</div>
