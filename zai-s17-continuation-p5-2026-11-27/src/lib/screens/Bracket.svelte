<!-- 67 Cakepanz · the playoff bracket: Wild Card → Divisional → Conference → Super Bowl, in the
     engine's own seeding and its own matchup derivation, plus the champion banner state on completion. -->
<script lang="ts">
  import { seasonFacade } from '../port/seasonFacade.ts';
  import { bracketVM } from '../port/standingsVM.ts';
  import { seedExplainOf } from '../port/seasonNarrative.ts';
  import type { SeasonFacadeState } from '../port/seasonFacade.ts';

  let { season, onreview }: { season: SeasonFacadeState; onreview: () => void } = $props();
  let b = $derived(season.runState ? bracketVM(season.runState, season.userTeamName) : null);
  // Wave B #7 (ernie B2): the bracket EXPLAINS each seed in the engine's own tiebreak order —
  // division winners first (the best win pct per division, from the standings the facade already
  // carries), then the wildcards; a tied pair names the engine's points-allowed tiebreak. The
  // explanation rides the SAME StandingsVMw the standings screen renders — no re-derivation.
  let standings = $derived(season.standings);
  function explain(seedNo: number, abbr: string, conf: string): string {
    const league = standings?.league ?? [];
    const row = league.find((r) => r.abbr === abbr);
    if (!row || row.seed === null) return `seed ${seedNo} — the standings row is not on record yet`;
    const divWinners = league
      .filter((r) => r.conf === conf)
      .reduce<string[]>((acc, r) => {
        const i = acc.findIndex((t) => league.find((x) => x.team === t)?.div === r.div);
        if (i === -1) acc.push(r.team);   // the table is engine-sorted: the FIRST row of each division is its winner
        return acc;
      }, []);
    return seedExplainOf(row, league, divWinners);
  }
</script>

<section class="cp-bracket">
  {#if !b}
    <p class="cp-note">No season is running — the bracket arrives with it.</p>
  {:else}
    <h2 class="cp-h2">THE PLAYOFFS</h2>
    {#if !b.seeded}
      <p class="cp-note">The field is set after week 18. Keep stepping the season — the bracket fills itself from the engine's seeding.</p>
    {:else}
      <div class="cp-panel">
        {#each ['AFC', 'NFC'] as conf (conf)}
          <h3 class="cp-h3">{conf} FIELD</h3>
          <div class="cp-seeds">
            {#each b.seeds[conf] as s (s.seed)}
              <span class="cp-seedrow" class:cp-meseed={s.me} title={explain(s.seed, s.abbr, conf)}>{s.seed}. {s.abbr}</span>
            {/each}
          </div>
          <ul class="cp-seedwhy">
            {#each b.seeds[conf] as s (s.seed)}
              <li>{explain(s.seed, s.abbr, conf)}</li>
            {/each}
          </ul>
        {/each}
      </div>
    {/if}
    <div class="cp-bracket-list">
      {#each b.rounds as r (r.round)}
        <div class="cp-brackround" data-state={r.state}>
          <h3>{r.label}</h3>
          {#if r.pairs.length === 0}
            <p class="cp-sub">Pending — the round's pairs derive from the round before it.</p>
          {:else}
            {#each r.pairs as p (p.home + p.away)}
              <div class="cp-matchup cp-brpair">
                <span class="cp-abbr">{p.awayAbbr}</span>
                {#if p.hs !== null}<span class="cp-score">{p.as} — {p.hs}</span>
                  <span class="cp-final">FINAL · {p.winner ? p.winner.toUpperCase() : ''}</span>
                {:else}<span class="cp-pending">VS · not yet played</span>{/if}
                <span class="cp-abbr">{p.homeAbbr}</span>
              </div>
            {/each}
          {/if}
        </div>
      {/each}
    </div>
    {#if b.champion}
      <div class="cp-champbanner">
        <div class="champ">{b.champion.toUpperCase()} · SUPER BOWL CHAMPIONS</div>
        <button class="cp-stepbtn cp-cta" onclick={onreview}>THE SEASON REVIEW</button>
      </div>
    {/if}
  {/if}
</section>

<style>
  .cp-seeds { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }
  .cp-seedrow { color: var(--text); font-size: 0.9rem; }
  .cp-seedrow.cp-meseed { color: var(--gold2); font-weight: 800; }
  .cp-bracket-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
  .cp-brpair { margin: 4px 0; }
</style>
