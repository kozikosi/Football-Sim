<!-- 67 Cakepanz · slice 2 — Team Select. The user picks their team (one of the 32 NFL teams) before the draft.
     Engine-derived facts only (league.ts's real alignment): no ratings are generated, no engine state is invented.
     The choice flows into the Draft Board: the chosen team is the team that drafts (START { userTeam }). -->
<script lang="ts">
  import { TEAMS, DIVS, divisionTeams, TEAM_BY_NAME } from '../../engine/sports/nfl/engine/league.ts';
  import type { Conf } from '../../engine/sports/nfl/engine/league.ts';
  import { valuation, MODE_LABEL } from '../valuation.ts';

  let { onstart }: { onstart: (teamIndex: number) => void } = $props();
  let chosen = $state<string | null>(null);
  let chosenIndex = $derived(chosen == null ? -1 : TEAMS.findIndex((t) => t.name === chosen));
  let detail = $derived(chosen == null ? null : TEAM_BY_NAME[chosen]);
  let rivals = $derived(chosen == null || !detail ? [] : divisionTeams(detail.conf, detail.div).filter((n) => n !== detail!.name));

  function start() {
    if (chosenIndex < 0) return;
    onstart(chosenIndex);
  }
</script>

<section class="cp-ts">
  <h1 class="cp-ts-title">Pick your team</h1>
  <p class="cp-prov">Every number you will see on this board reads <b>{MODE_LABEL[valuation.get().mode]}</b> — the label travels with the numbers.</p>

  {#each ['AFC', 'NFC'] as conf (conf)}
    <h2 class="cp-ts-conf">{conf}</h2>
    <div class="cp-ts-divs">
      {#each DIVS as div (div)}
        <div class="cp-ts-div">
          <h3>{conf} {div}</h3>
          {#each divisionTeams(conf as Conf, div) as name (name)}
            {@const idx = TEAMS.findIndex((t) => t.name === name)}
            <button class="cp-ts-team" class:cp-on={chosen === name} onclick={() => (chosen = name)} aria-pressed={chosen === name}>{name}</button>
          {/each}
        </div>
      {/each}
    </div>
  {/each}

  {#if detail}
    <aside class="cp-ts-detail" aria-live="polite">
      <h3>{detail.name}</h3>
      <p class="cp-ts-meta">{detail.conf} {detail.div}</p>
      <p class="cp-ts-rivals"><b>Division rivals:</b> {rivals.join(' · ')}</p>
      <p class="cp-ts-note">You draft as this team: the board's on-clock indicator, your picks and your roster are all {detail.name}'s.</p>
      <button class="cp-ts-go" onclick={start}>DRAFT AS {detail.name.toUpperCase()}</button>
    </aside>
  {:else}
    <aside class="cp-ts-detail cp-ts-idle" aria-live="polite">
      <p class="cp-ts-note">Select one of the 32 teams to see its details and start the draft.</p>
    </aside>
  {/if}
</section>

<style>
  .cp-ts { border: 1px solid #3a2c31; border-radius: 12px; padding: 18px; background: #221820; }
  .cp-ts-title { margin: 0 0 4px; color: #e8c87e; letter-spacing: 0.1em; font-size: 1.3rem; }
  .cp-ts-conf { margin: 14px 0 6px; color: #c8a48f; letter-spacing: 0.16em; font-size: 0.85rem; }
  .cp-ts-divs { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px; }
  .cp-ts-div { border: 1px solid #3a2c31; border-radius: 10px; padding: 8px 10px; background: #1c141a; }
  .cp-ts-div h3 { margin: 0 0 6px; font-size: 0.72rem; letter-spacing: 0.14em; color: #d9a94c; text-transform: uppercase; }
  .cp-ts-team { display: block; width: 100%; text-align: left; margin: 2px 0; padding: 6px 10px; border-radius: 999px;
    border: 1px solid #3a2c31; background: transparent; color: #f5e9dd; font-family: inherit; font-size: 0.88rem; cursor: pointer; }
  .cp-ts-team:hover { background: rgba(217, 169, 76, 0.1); }
  .cp-ts-team.cp-on { background: rgba(217, 169, 76, 0.2); border-color: #d9a94c; font-weight: 800; }
  .cp-ts-detail { margin-top: 16px; border: 1px solid #8a5f18; border-radius: 12px; padding: 14px 16px; background: rgba(217, 169, 76, 0.07); }
  .cp-ts-idle { border-color: #3a2c31; background: transparent; }
  .cp-ts-detail h3 { margin: 0 0 4px; color: #e8c87e; letter-spacing: 0.06em; }
  .cp-ts-meta, .cp-ts-rivals, .cp-ts-note { margin: 3px 0; color: #c8a48f; font-size: 0.86rem; }
  .cp-ts-rivals b { color: #f5e9dd; }
  .cp-ts-note { color: #f5e9dd; }
  .cp-ts-go { margin-top: 10px; padding: 9px 22px; border-radius: 999px; border: 0; cursor: pointer;
    background: rgba(217, 169, 76, 0.24); color: #f5e9dd; font-family: inherit; font-weight: 800; letter-spacing: 0.08em; font-size: 0.95rem; }
  .cp-ts-go:hover { background: rgba(217, 169, 76, 0.34); }
</style>
