<!-- 67 Cakepanz · the season hub: each week at a glance — standings through week N, the current
     week's card and CTA, the games played so far, a restore-slot entry, and the three states
     (not started / in progress / finished). -->
<script lang="ts">
  import { abbrOf } from '../port/abbr.ts';
  import { showInt } from '../port/seam.ts';
  import { LAST_REGULAR_WEEK } from '../port/weekVM.ts';
  import type { SeasonFacadeState } from '../port/seasonFacade.ts';

  let { season, onplayweek, onweek, onstandings, onbracket, onrestore, canRestore, onbook }: {
    season: SeasonFacadeState;
    onplayweek: () => void; onweek: (n: number) => void; onstandings: () => void; onbracket: () => void;
    onrestore: () => void; canRestore: boolean; onbook: () => void;
  } = $props();

  let phase = $derived(!season.ready ? 'none' : season.finished ? 'finished' : 'running');
  let meGames = $derived(season.view ? season.view.games.filter((g) => g.home === season.userTeamName || g.away === season.userTeamName) : []);
  let nextUserGame = $derived(meGames.length ? meGames[0] : null);
</script>

<section class="cp-hub" data-phase={phase}>
  {#if phase === 'none'}
    <div class="cp-panel">
      <h2 class="cp-h2">THE SEASON</h2>
      <p class="cp-note">No season is running. Finish a draft and the season opens from the draft-complete screen — or restore a saved week.</p>
      {#if canRestore}<button class="cp-stepbtn" onclick={onrestore}>RESTORE A SAVED WEEK</button>{/if}
    </div>
  {:else}
    <h2 class="cp-h2">THE SEASON · {season.userTeamName.toUpperCase()} · {season.view?.label ?? ''}</h2>
    <div class="cp-hubrow">
      <div class="cp-gamecard cp-megame">
        <p class="cp-final">YOUR GAME · {season.view?.label ?? ''}</p>
        {#if nextUserGame}
          <div class="cp-matchup">
            <span class="cp-abbr">{nextUserGame.awayAbbr}</span>
            {#if nextUserGame.hs !== null}<span class="cp-score">{nextUserGame.as} — {nextUserGame.hs}</span>
            {:else}<span class="cp-pending">NOT YET PLAYED</span>{/if}
            <span class="cp-abbr">{nextUserGame.homeAbbr}</span>
          </div>
          <button class="cp-stepbtn cp-cta" onclick={onplayweek}>{nextUserGame.hs !== null ? 'WATCH THE FEED' : 'PLAY THE WEEK'}</button>
        {:else}
          <p class="cp-note">No game for you this week — the league plays on.</p>
          <button class="cp-stepbtn cp-cta" onclick={onplayweek}>PLAY THE WEEK</button>
        {/if}
      </div>
      <div class="cp-hubmeta cp-panel">
        <p class="cp-sub">Week slot {showInt(season.slot)} of {showInt(season.total)} · {season.finished ? 'season finished' : season.atLastPlayed ? 'you are at the latest played week' : 'reviewing an earlier week'}</p>
        <div class="cp-chipline">
          <button class="cp-stepbtn" onclick={() => onweek(season.slot)}>WEEK VIEW</button>
          <button class="cp-stepbtn" onclick={onstandings}>STANDINGS</button>
          <button class="cp-stepbtn" onclick={onbracket}>PLAYOFFS</button>
          <button class="cp-stepbtn" onclick={onbook}>BOOK</button>
          {#if canRestore}<button class="cp-stepbtn" onclick={onrestore}>RESTORE</button>{/if}
        </div>
      </div>
    </div>
    <div class="cp-panel">
      <h3 class="cp-h3">THE WEEKS</h3>
      <div class="cp-weekgrid">
        {#each Array(season.total) as _, i (i)}
          {@const n = i + 1}
          <button class="cp-wk" class:cp-cur={n === season.slot} class:cp-played={(n < (season.slot + 0) && season.atLastPlayed === false) || n <= season.slot - 1}
            onclick={() => onweek(n)}>{n > LAST_REGULAR_WEEK ? ['WC', 'DIV', 'CONF', 'SB'][n - LAST_REGULAR_WEEK - 1] : n}</button>
        {/each}
      </div>
    </div>
    {#if season.finished}
      <div class="cp-champbanner"><div class="champ">{season.champion?.toUpperCase()} · SUPER BOWL CHAMPIONS</div>
        <button class="cp-stepbtn cp-cta" onclick={onbook}>OPEN THE SEASON BOOK</button></div>
    {/if}
  {/if}
</section>

<style>
  .cp-hubrow { display: flex; gap: 12px; flex-wrap: wrap; align-items: stretch; }
  .cp-hubmeta { flex: 1 1 280px; }
  .cp-h3 { color: var(--gold2); font-family: var(--font-display); letter-spacing: 0.08em; margin: 0 0 8px; }
  .cp-weekgrid { display: flex; flex-wrap: wrap; gap: 5px; }
  .cp-wk { width: 40px; height: 30px; border-radius: 8px; border: 1px solid var(--hairline); background: transparent;
    color: var(--zcream); font-family: inherit; font-size: 0.74rem; cursor: pointer; font-variant-numeric: tabular-nums; }
  .cp-wk.cp-cur { background: color-mix(in srgb, var(--goldm) 26%, transparent); border-color: var(--gold2); color: var(--gold2); font-weight: 800; }
  .cp-wk.cp-played { border-style: solid; border-color: var(--gold3); color: var(--sub); }
</style>
