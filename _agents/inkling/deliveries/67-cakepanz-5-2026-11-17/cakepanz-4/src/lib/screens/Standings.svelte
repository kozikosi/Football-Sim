<!-- 67 Cakepanz · standings + playoff picture: the division tables THROUGH the current week slot
     (the engine's own accumulated scores), the league table, and the seeding rows once week 18 is in.
     The bracket states live on the Bracket screen; this one is the tables. -->
<script lang="ts">
  import type { SeasonFacadeState } from '../port/seasonFacade.ts';
  import { seasonFacade } from '../port/seasonFacade.ts';
  import { abbrOf } from '../port/abbr.ts';
  import { showInt } from '../port/seam.ts';

  let { season, onbracket }: { season: SeasonFacadeState; onbracket: () => void } = $props();
  let st = $derived(season.standings);
</script>

<section class="cp-st">
  {#if !st}
    <p class="cp-note">No season is running — the standings arrive with it.</p>
  {:else}
    <h2 class="cp-h2">STANDINGS · THROUGH {st.throughWeek === 18 ? 'WEEK 18' : 'WEEK ' + showInt(st.throughWeek)}</h2>
    <div class="cp-stdivs">
      {#each st.divisions as d (d.conf + d.div)}
        <div class="cp-panel cp-stdiv">
          <h3 class="cp-h3">{d.conf} {d.div}</h3>
          <table class="cp-table">
            <thead><tr><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th><th class="num">PCT</th><th class="num">SEED</th></tr></thead>
            <tbody>
              {#each d.rows as r (r.team)}
                <tr class:cp-me={r.team === season.userTeamName}>
                  <td>{abbrOf(r.team)} {r.team}</td>
                  <td class="num">{r.w}</td><td class="num">{r.l}</td><td class="num">{r.t}</td>
                  <td class="num">{r.pf}</td><td class="num">{r.pa}</td>
                  <td class="num">{r.winPct}</td>
                  <td class="num">{r.seed ?? '—'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/each}
    </div>
    <div class="cp-panel">
      <h3 class="cp-h3">THE LEAGUE</h3>
      <table class="cp-table">
        <thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead>
        <tbody>
          {#each st.league as r, i (r.team)}
            <tr class:cp-me={r.team === season.userTeamName}>
              <td>{i + 1}</td><td>{abbrOf(r.team)} {r.team}</td>
              <td class="num">{r.w}</td><td class="num">{r.l}</td><td class="num">{r.t}</td>
              <td class="num">{r.pf}</td><td class="num">{r.pa}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="cp-chipline">
      <button class="cp-stepbtn cp-cta" onclick={onbracket}>THE PLAYOFF PICTURE</button>
    </div>
  {/if}
</section>

<style>
  .cp-stdivs { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; }
</style>
