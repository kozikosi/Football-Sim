<!-- Slice 6 — the standings screen (Svelte 5 runes, authoring order: svelte FIRST this slice). Every
     number is the engine's own simulateSeason output (seed 2027, the fixture's own 1,024-pick league):
     8 real divisions, W-L-T, PF, PA, playoff seed badges 1-7, the champion line. The arms must render
     byte-equal tables from the same seed. Design-only siblings (schedule, bracket, awards) are named
     in measurements/SEASON-DESIGN.md, not faked here. -->
<script lang="ts">
  import { ensureSeason } from '../appStore.svelte.ts';
  import '../../cards.css';

  const season = $derived(ensureSeason());
</script>

<section class="cp-screen" aria-label="Season standings">
  <h3 class="cp-title">STANDINGS · {season.year}</h3>
  <p class="cp-screen-note">The engine's own season (seed 2027) over the fixture's 1,024-pick league: {season.games} regular games, {season.playoffGames} playoff games. Champion in gold; seeds 1-7 mark the conference bracket.</p>
  <div class="cp-cards-head" style="margin-bottom: 8px">
    <span class="cp-cards-onclock">SUPER BOWL: {season.champion} over {season.finalistOther}</span>
    <span class="cp-cards-count">seeded by the engine's own tiebreakers</span>
  </div>
  <div class="cp-season-grid">
    {#each season.divisions as d (d.conf + d.div)}
      <div class="cp-season-div">
        <div class="cp-team-divname">{d.conf} {d.div}</div>
        {#each d.rows as r (r.team)}
          <div class="cp-season-row" class:cp-season-champ={r.champ}>
            <span class="cp-season-seed">{r.seed ?? ''}</span>
            <span class="cp-season-team">{r.team}</span>
            <span class="cp-season-rec">{r.w}-{r.l}{r.t ? '-' + r.t : ''}</span>
            <span class="cp-season-nums">{r.pf} / {r.pa}</span>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</section>
