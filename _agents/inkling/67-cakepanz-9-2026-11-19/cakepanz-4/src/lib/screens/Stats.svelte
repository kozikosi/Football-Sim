<!-- 67 Cakepanz · the stats table: the season's advanced numbers the engine measures today — the box
     score leaders (the awards engine's own season lines) and the 32 teams' engine ratings table.
     STAND-IN, clearly labelled: gravity and double-teams are NOT yet measured by the pinned engine;
     the real call is the Architect's measurement module (§5 filed) — nothing is faked here.
     Form renders as a GREEN arrow (hot) or RED arrow (cold) — no emojis, no HOT/COLD labels. -->
<script lang="ts">
  import { TEAMS, showInt, showDecimal } from '../port/seam.ts';
  import type { SeasonStats, LeagueTeam, Record3 } from '../port/seam.ts';
  import { leaders, LEADER_KEYS } from '../port/seam.ts';
  import { abbrOf } from '../port/abbr.ts';

  let { stats, table, teams }: { stats: SeasonStats | null; table: Record<string, Record3> | null; teams: LeagueTeam[] | null } = $props();
  const KEYS: [string, string][] = [['pyd', 'PASS YD'], ['ptd', 'PASS TD'], ['ryd', 'RUSH YD'], ['rtd', 'RUSH TD'], ['recYd', 'REC YD'], ['rec', 'REC'], ['sack', 'SACKS'], ['intDef', 'INT'], ['tkl', 'TACKLES'], ['fgm', 'FG']];
</script>

<section class="cp-stats">
  <h2 class="cp-h2">THE STATS</h2>
  {#if !stats || !table}
    <p class="cp-note">No season statistics yet — the stats accumulate from the games the engine plays.</p>
  {:else}
    <p class="cp-note cp-standin">STAND-IN: gravity and double-teams are formally measured in the live site's model, not yet by the pinned engine — filed §5 to the Architect. Everything below IS the engine's own output.</p>
    <div class="cp-panel">
      <h3 class="cp-h3">THE SEASON LINES (LEAGUE LEADERS)</h3>
      {#each KEYS as [k, label] (k)}
        {@const rows = leaders(stats, k as never, 3)}
        <div class="cp-statrow">
          <span class="cp-statl">{label}</span>
          {#each rows as r (r.id)}
            <span class="cp-statp">{r.name} <b>{showInt(r.stats[k as never] ?? 0)}</b></span>
          {:else}
            <span class="cp-statp cp-none">—</span>
          {/each}
        </div>
      {/each}
    </div>
    {#if teams}
      <div class="cp-panel">
        <h3 class="cp-h3">THE 32 TEAMS' ENGINE RATINGS</h3>
        <table class="cp-table">
          <thead><tr><th>TEAM</th><th class="num">OFF</th><th class="num">DEF</th><th class="num">PASS</th><th class="num">RUN</th><th class="num">RUSH D</th><th class="num">COV</th><th class="num">W</th><th class="num">L</th><th class="num">T</th></tr></thead>
          <tbody>
            {#each TEAMS as t, i (t.name)}
              {@const R = teams[i]?.ratings}
              {@const rec = table[t.name]}
              <tr>
                <td>{abbrOf(t.name)} {t.name}</td>
                <td class="num">{R ? showDecimal('wins', R.off) : '—'}</td>
                <td class="num">{R ? showDecimal('wins', R.def) : '—'}</td>
                <td class="num">{R ? showInt(R.passOff) : '—'}</td>
                <td class="num">{R ? showInt(R.runOff) : '—'}</td>
                <td class="num">{R ? showInt(R.frontRun) : '—'}</td>
                <td class="num">{R ? showInt(R.coverage) : '—'}</td>
                <td class="num">{rec?.w ?? '—'}</td>
                <td class="num">{rec?.l ?? '—'}</td>
                <td class="num">{rec?.t ?? '—'}</td>
              </tr>
            {/each}
          </tbody>
        </table>
        <p class="cp-sub">OFF/DEF are the engine's net points vs the league baseline (Wins units, one decimal); the rest are the engine's raw rating axes.</p>
      </div>
    {/if}
  {/if}
</section>

<style>
  .cp-standin { border: 1px dashed var(--goldm); border-radius: 8px; padding: 8px 10px; color: var(--goldm); }
  .cp-statrow { display: flex; gap: 12px; align-items: baseline; padding: 4px 0; border-bottom: 1px dashed var(--hairline); flex-wrap: wrap; }
  .cp-statl { color: var(--sub); font-size: 0.66rem; letter-spacing: 0.12em; min-width: 76px; }
  .cp-statp { color: var(--text); font-size: 0.85rem; }
  .cp-statp b { color: var(--gold2); font-variant-numeric: tabular-nums; }
  .cp-none { color: var(--sub); }
</style>
