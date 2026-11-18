<!-- 67 Cakepanz · the week view: the per-week game cards for the whole league, the user's match
     prominent, the week stepper (prev / step / next), and the final-score reveal consistent with the
     feed (a played game reveals its score; the unplayed week is the engine's own preview fixtures). -->
<script lang="ts">
  import { seasonFacade } from '../port/seasonFacade.ts';
  import type { SeasonFacadeState } from '../port/seasonFacade.ts';
  import { showInt } from '../port/seam.ts';

  let { season, onplay, onfeed, onsave }: {
    season: SeasonFacadeState;
    onplay: () => void; onfeed: (home: string) => void; onsave: () => void;
  } = $props();
  let view = $derived(season.view);
  let userGame = $derived(view?.games.find((g) => g.home === season.userTeamName || g.away === season.userTeamName) ?? null);
</script>

<section class="cp-week">
  <div class="cp-stepper">
    <button class="cp-stepbtn" onclick={() => seasonFacade.prev()} disabled={season.slot <= 1}>‹ PREV</button>
    <span class="cp-weeklabel">{season.label}</span>
    <button class="cp-stepbtn" onclick={() => seasonFacade.next()} disabled={season.slot >= season.total}>NEXT ›</button>
    <span class="cp-sub">week slot {showInt(season.slot)} / {showInt(season.total)}</span>
    {#if userGame && userGame.hs === null}
      <button class="cp-stepbtn cp-cta" onclick={onplay}>PLAY WEEK {season.slot}</button>
    {:else if season.atLastPlayed && !season.finished}
      <button class="cp-stepbtn cp-cta" onclick={onplay}>STEP TO WEEK {season.slot + 1}</button>
    {/if}
    {#if userGame && userGame.hs !== null}
      <button class="cp-stepbtn" onclick={() => onfeed(userGame!.home)}>WATCH THE FEED</button>
    {/if}
    <button class="cp-stepbtn" onclick={onsave}>SAVE</button>
  </div>

  {#if !view}
    <p class="cp-note">No season is running — open the hub to begin one.</p>
  {:else}
    <div class="cp-grid">
      {#each view.games as g (g.replayLabel)}
        <div class="cp-gamecard" class:cp-megame={g.home === season.userTeamName || g.away === season.userTeamName}>
          <div class="cp-matchup">
            <span class="cp-abbr">{g.awayAbbr}</span>
            {#if g.hs !== null}
              <span class="cp-score">{g.as} — {g.hs}</span>
              <span class="cp-final">FINAL</span>
            {:else}
              <span class="cp-pending">@ {g.homeAbbr} · not yet played</span>
            {/if}
          </div>
          <p class="cp-sub cp-gs">gameSeed {showInt(g.gameSeed)}{g.round ? ' · ' + g.round : ''}</p>
        </div>
      {/each}
    </div>
    {#if view.games.length === 0}
      <p class="cp-note">No games this slot.</p>
    {/if}
  {/if}
</section>
