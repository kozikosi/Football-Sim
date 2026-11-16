<script setup lang="ts">
// cardboard/ToyBoard.vue — the E0b toy screen: one match, one table. Nothing w89 here — this is the
// platform's admission test, not a product surface (documented; excluded from slice line counts).
import { useToyStore } from './store';

const toy = useToyStore();
</script>

<template>
  <section class="toy">
    <h2>Cardboard Ringers</h2>
    <p>2 teams × 3 slots · one match · one table.</p>
    <button data-testid="toy-play" @click="toy.play()">Play the match</button>
    <p data-testid="toy-result" v-if="toy.played">
      Ringers {{ toy.scores[0] }} — {{ toy.scores[1] }} Cardboards ·
      {{ toy.winner === 'tie' ? 'a tie' : (toy.winner === 0 ? 'Ringers win' : 'Cardboards win') }}
    </p>
    <table data-testid="toy-table">
      <thead><tr><th>Team</th><th>QB</th><th>RB</th><th>WR</th><th>OVR</th></tr></thead>
      <tbody>
        <tr v-for="t in toy.teams" :key="t.name" :data-testid="'toy-row-' + t.name.toLowerCase()">
          <td>{{ t.name }}</td>
          <td>{{ t.slots.QB?.name }} {{ t.slots.QB?.ovr }}</td>
          <td>{{ t.slots.RB?.name }} {{ t.slots.RB?.ovr }}</td>
          <td>{{ t.slots.WR?.name }} {{ t.slots.WR?.ovr }}</td>
          <td>{{ toy.ovrOf(t) }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
