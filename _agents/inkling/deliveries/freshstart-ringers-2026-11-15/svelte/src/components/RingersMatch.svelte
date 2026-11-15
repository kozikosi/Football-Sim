<script lang="ts">
  import { RINGERS_FIXTURE, TEAM_META, type TeamId } from '../lib/engine/ringers';
  import { ringers } from '../lib/state/ringers.svelte';
  import './ringers.css';

  const teams: TeamId[] = ['AUR', 'BRB'];
</script>

<main class="ringers">
  <h1>Cardboard Ringers</h1>
  <p class="tag">Two teams · 3 slots each · one seeded match · synthetic fixture</p>

  <section class="teams" aria-label="Teams and roster slots">
    {#each teams as team (team)}
      <div class="team">
        <h2>{TEAM_META[team].name}</h2>
        {#each RINGERS_FIXTURE.filter((p) => p.team === team) as card (card.id)}
          <div class="card">
            <span>
              <span class="nm">{card.name}</span><br />
              <span class="meta">#{card.jersey} · {card.pos} · SPD {card.speed}</span>
            </span>
            <span class="ovr" aria-label="OVR">{card.power}</span>
          </div>
        {/each}
      </div>
    {/each}
  </section>

  <form class="controls" onsubmit={(e) => { e.preventDefault(); ringers.run(); }}>
    <label for="seed">Seed</label>
    <input id="seed" type="number" min="1" step="1" bind:value={ringers.seed} />
    <button type="submit">Run match</button>
    <button type="button" class="ghost" onclick={() => ringers.reset()}>Reset</button>
  </form>

  {#if ringers.result}
    <section class="result" aria-live="polite">
      <p class="scoreline">
        {TEAM_META.AUR.short} {ringers.result.score.AUR}
        — {ringers.result.score.BRB} {TEAM_META.BRB.short}
      </p>
      <p class="winner">{ringers.result.winnerName} take it.</p>
      <p class="meta">AUR {ringers.result.yards.AUR} yards · BRB {ringers.result.yards.BRB} yards · seed {ringers.result.seed}</p>
    </section>

    <section class="log" aria-label="Play-by-play log">
      {#each ringers.result.events as ev (ev.play)}
        <p class={{ to: ev.text.includes('turns it over') }}>
          <span class="play-n">P{ev.play}</span>{ev.text}
        </p>
      {/each}
    </section>

    <table class="stats">
      <caption>Player lines — synthetic fixture (not real players)</caption>
      <thead>
        <tr><th>Player</th><th>Team</th><th>OVR</th><th>Touches</th><th>Yards</th><th>Big plays</th><th>TO</th></tr>
      </thead>
      <tbody>
        {#each ringers.result.lines as line (line.id)}
          <tr>
            <td>{line.name}</td><td>{line.team}</td><td>{line.ovr}</td><td>{line.touches}</td><td>{line.yards}</td><td>{line.bigPlays}</td><td>{line.turnovers}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  <p class="synth">Cardboard Ringers is a synthetic fixture built for the framework comparison (R-13). Every player, rating and result above is invented for testing; it is not real NFL data and must not be shown to users.</p>
</main>
