<!-- 67 Cakepanz · the season review: the run's conclusion in the w89 review grammar — the Super Bowl
     review prominent, integer chips, plain informative lines, no "expected scoring", the honest end. -->
<script lang="ts">
  import { seasonReviewVM } from '../port/reviewVM.ts';
  import { showInt } from '../port/seam.ts';
  import type { SeasonFacadeState } from '../port/seasonFacade.ts';

  let { season, onbracket, onbook, onawards }: {
    season: SeasonFacadeState; onbracket: () => void; onbook: () => void; onawards: () => void;
  } = $props();
  let vm = $derived(season.runState ? seasonReviewVM(season.runState, season.userTeamName) : null);
</script>

<section class="cp-sreview">
  {#if !vm}
    <p class="cp-note">No season to review yet — the review arrives with the run.</p>
  {:else}
    <h2 class="cp-h2">THE SEASON REVIEW · {vm.userAbbr} {season.userTeamName.toUpperCase()}</h2>
    {#if season.champion}
      <div class="cp-champbanner"><div class="champ">{season.champion.toUpperCase()} · SUPER BOWL CHAMPIONS</div></div>
    {/if}
    <div class="cp-chipline">
      <div class="cp-chipstat"><b>{vm.w}</b><span>WINS</span></div>
      <div class="cp-chipstat"><b>{vm.l}</b><span>LOSSES</span></div>
      {#if vm.t}<div class="cp-chipstat"><b>{vm.t}</b><span>TIES</span></div>{/if}
      <div class="cp-chipstat"><b>{showInt(vm.pf)}</b><span>POINTS FOR</span></div>
      <div class="cp-chipstat"><b>{showInt(vm.pa)}</b><span>POINTS AGAINST</span></div>
      <div class="cp-chipstat"><b>{vm.gamesPlayed}</b><span>GAMES PLAYED</span></div>
    </div>
    <div class="cp-panel cp-guide">
      <p class="cp-done-sub">{vm.outcome}</p>
      {#each vm.highlightLines as line (line)}
        <p class="cp-revsummary">{line}</p>
      {/each}
    </div>
    <div class="cp-chipline">
      <button class="cp-stepbtn" onclick={onbracket}>THE BRACKET</button>
      <button class="cp-stepbtn" onclick={onawards}>THE AWARDS</button>
      <button class="cp-stepbtn cp-cta" onclick={onbook}>THE SEASON BOOK</button>
    </div>
  {/if}
</section>

<style>
  .cp-revsummary { color: var(--zcream); font-size: 0.95rem; max-width: 62ch; margin: 6px 0; }
</style>
