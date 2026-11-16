<script lang="ts">
  // WeekStepperSealed.svelte — the SEALED-RECIPE component (Rev 9 Part C, arm SVELTE). Same render
  // contract as SEALED-RECIPE.md §3 with `sealed-` testid prefixes (the Rev 8 week surface owns the
  // battery's data-testid="week-*" contract; the two surfaces coexist without locator collisions).
  // Reachability: mounted under the DEV-only QA hook (window.__SEALED__) — the battery's six
  // screens are untouched.
  import { weekSealed } from '../state/weekStore-sealed.svelte.ts';
  import { onMount } from 'svelte';

  onMount(() => weekSealed.ensure());
</script>

<section class="panel" data-testid="sealed-week-root">
  <div class="cards-head">
    <h2>SEALED WEEK STEPPER</h2>
    <span class="cards-count" data-testid="sealed-week-label">{weekSealed.label}</span>
  </div>
  <div class="board-nav">
    <button class="ctl-btn" data-testid="sealed-week-prev" disabled={weekSealed.slot <= 1} onclick={() => weekSealed.prev()}>BACK</button>
    <button class="ctl-btn" data-testid="sealed-week-next" disabled={weekSealed.slot >= weekSealed.total} onclick={() => weekSealed.next()}>NEXT</button>
    <button class="ctl-btn paused" data-testid="sealed-week-jump-sb" onclick={() => weekSealed.go(weekSealed.total)}>SUPER BOWL</button>
  </div>
  <div class="feed" data-testid="sealed-week-games">
    {#each weekSealed.view?.games ?? [] as g, i (g.replayLabel)}
      <div class="feed-line" data-testid="sealed-week-game-{i}">{g.homeAbbr} {g.hs} @ {g.as} {g.awayAbbr}</div>
    {/each}
  </div>
  <table class="stats-table" data-testid="sealed-week-standings">
    <thead><tr><th>TEAM</th><th>W</th><th>L</th></tr></thead>
    <tbody>
      {#each weekSealed.standings?.league ?? [] as r, i (r.team)}
        <tr data-testid="sealed-standings-row-{i}">
          <td class="tc-team">{r.abbr}</td>
          <td>{r.w}</td>
          <td>{r.l}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
