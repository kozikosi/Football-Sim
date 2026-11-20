<!-- 67 Cakepanz · the season book: the champion roster as cards (the engine's own optimal lineup of
     the winning draft), the replayable playoff games (each one a real engine re-derivation by its
     stored gameSeed), and the final standings. -->
<script lang="ts">
  import { abbrOf } from '../port/abbr.ts';
  import { showInt, optimalLineup, fieldSlots, TEAMS, thawPool } from '../port/seam.ts';
  import type { Player } from '../port/seam.ts';
  import type { SeasonFacadeState } from '../port/seasonFacade.ts';

  let { season, draftRecord, onreview, onfeed }: {
    season: SeasonFacadeState; draftRecord: unknown;
    onreview: () => void; onfeed: (home: string) => void;
  } = $props();

  let champRoster = $derived.by(() => {
    const rec = draftRecord as { pool: unknown; picks: { overall: number; team: number; pid: string; slot: string }[] } | null;
    if (!rec || !season.champion) return [];
    const pool = thawPool(rec.pool as never);
    const byId = new Map(pool.map((p) => [p.id, p]));
    // the book shows the CHAMPION'S OWN draft class: the picks the champion team made, in its order
    const champTeam = TEAMS.findIndex((t) => t.name === season.champion);
    if (champTeam < 0) return [];
    return rec.picks.filter((k) => k.team === champTeam).map((k) => byId.get(k.pid)!).filter(Boolean);
  });
</script>

<section class="cp-book">
  <h2 class="cp-h2">THE SEASON BOOK{season.champion ? ` · ${season.champion.toUpperCase()}` : ''}</h2>
  {#if !season.ready}
    <p class="cp-note">No season yet — the book opens when one has been played.</p>
  {:else}
    {#if season.champion}
      <div class="cp-champbanner"><div class="champ">{season.champion.toUpperCase()} · SUPER BOWL CHAMPIONS</div>
        <button class="cp-stepbtn cp-cta" onclick={onreview}>THE SEASON REVIEW</button></div>
    {/if}
    <div class="cp-panel">
      <h3 class="cp-h3">REPLAYABLE PLAYOFF GAMES</h3>
      {#each season.runState?.playoffs ?? [] as p (p.week + p.home)}
        <div class="cp-revline">
          <span class="per">{p.round?.toUpperCase()}</span>
          <span class="cp-abbr">{abbrOf(p.away)}</span>
          <span class="cp-score">{p.as} — {p.hs}</span>
          <span class="cp-abbr">{abbrOf(p.home)}</span>
          <button class="cp-stepbtn" onclick={() => onfeed(p.home)}>REPLAY FEED</button>
        </div>
      {:else}
        <p class="cp-sub">The playoffs have not been played yet.</p>
      {/each}
    </div>
    <div class="cp-panel">
      <h3 class="cp-h3">THE CHAMPION'S ROSTER</h3>
      {#if champRoster.length}
        <div class="cp-cardgrid">
          {#each champRoster as p, i (p.id)}
            <div class="cp-pcard">
              <div class="mono">{p.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('')}</div>
              <div class="pname">{p.name}</div>
              <div class="pmeta">{p.pos} · {p.team} · OVR {showInt(p.ovr)} · pick {showInt(i + 1)}</div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="cp-sub">The champion's draft class rides the finished draft.</p>
      {/if}
    </div>
    {#if season.standings}
      <div class="cp-panel">
        <h3 class="cp-h3">FINAL STANDINGS</h3>
        <table class="cp-table">
          <thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead>
          <tbody>
            {#each season.standings.league.slice(0, 10) as r, i (r.team)}
              <tr class:cp-me={r.team === season.userTeamName}>
                <td>{i + 1}</td><td>{abbrOf(r.team)} {r.team}</td>
                <td class="num">{r.w}</td><td class="num">{r.l}</td><td class="num">{r.t}</td>
                <td class="num">{r.pf}</td><td class="num">{r.pa}</td>
              </tr>
            {/each}
          </tbody>
        </table>
        <p class="cp-sub">Top 10 shown; the full table lives on Standings.</p>
      </div>
    {/if}
  {/if}
</section>
