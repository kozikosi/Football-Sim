<script lang="ts">
// cardboard/ToyBoard.svelte — the E0b toy screen (runes-only): one match, one table.
import { toy } from './store.svelte.ts';
</script>

<section class="toy">
  <h2>Cardboard Ringers</h2>
  <p>2 teams × 3 slots · one match · one table.</p>
  <button data-testid="toy-play" onclick={() => toy.play()}>Play the match</button>
  {#if toy.played}
    <p data-testid="toy-result">
      Ringers {toy.scores[0]} — {toy.scores[1]} Cardboards ·
      {toy.winner === 'tie' ? 'a tie' : (toy.winner === 0 ? 'Ringers win' : 'Cardboards win')}
    </p>
  {/if}
  <table data-testid="toy-table">
    <thead><tr><th>Team</th><th>QB</th><th>RB</th><th>WR</th><th>OVR</th></tr></thead>
    <tbody>
      {#each toy.teams as t (t.name)}
        <tr data-testid={'toy-row-' + t.name.toLowerCase()}>
          <td>{t.name}</td>
          <td>{t.slots.QB?.name} {t.slots.QB?.ovr}</td>
          <td>{t.slots.RB?.name} {t.slots.RB?.ovr}</td>
          <td>{t.slots.WR?.name} {t.slots.WR?.ovr}</td>
          <td>{toy.ovrOf(t)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
