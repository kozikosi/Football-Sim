<!-- 67 Cakepanz · the awards screen: the engine's own season awards + the statistical leaders, in the
     review grammar (winner, line, one-line team {wins}; integers except Wins/Priority; the 90+ shimmer
     where the w89 law applies — rendered from the recap grade, never computed here). -->
<script lang="ts">
  import { awardsVM } from '../port/awardsVM.ts';
  import type { SeasonStats, Record3 } from '../port/seam.ts';

  let { stats, table }: { stats: SeasonStats | null; table: Record<string, Record3> | null } = $props();
  let vm = $derived(stats && table ? awardsVM(stats, table) : null);
</script>

<section class="cp-awards">
  <h2 class="cp-h2">THE AWARDS</h2>
  {#if !vm}
    <p class="cp-note">No season statistics yet — the awards are computed from the games the engine plays, never promised in advance.</p>
  {:else}
    <div class="cp-awards-grid">
      {#each vm.regular as a (a.key)}
        <div class="cp-award">
          <div class="aname">{a.name}</div>
          <div class="awinner" class:cp-shimmer90={a.shimmer}>{a.winner}</div>
          <div class="cp-sub">{a.line}</div>
          <div class="cp-sub">{a.teamAbbr} · {a.teamWins}</div>
        </div>
      {:else}
        <p class="cp-sub">The winners arrive with the finished season.</p>
      {/each}
    </div>
    <div class="cp-panel">
      <h3 class="cp-h3">THE LEAGUE LEADERS</h3>
      <div class="cp-leadercols">
        {#each vm.leaders as L (L.key)}
          <div class="cp-leadercol">
            <h4 class="cp-lh">{L.label}</h4>
            {#each L.rows as r, i (r.name)}
              <div class="cp-lrow"><span class="cp-lrank">{i + 1}</span> {r.name} <span class="cp-lteam">({r.abbr})</span> <b class="cp-lval">{r.value}</b></div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .cp-awards-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; }
  .cp-leadercols { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
  .cp-lh { color: var(--sub); font-size: 0.64rem; letter-spacing: 0.16em; margin: 0 0 4px; }
  .cp-lrow { font-size: 0.85rem; padding: 2px 0; color: var(--text); }
  .cp-lrank { color: var(--goldm); font-variant-numeric: tabular-nums; }
  .cp-lteam { color: var(--sub); }
  .cp-lval { color: var(--gold2); font-variant-numeric: tabular-nums; float: right; }
</style>
