<script setup lang="ts">
import { focusById, type SimOutput, type AutoDecision } from '../engine-contract/index.ts';

const props = defineProps<{ sim: SimOutput; effective: string; focusLog: AutoDecision[] }>();
const label = (id: string) => focusById(id).label;
const precedence = () =>
  props.focusLog.some((d) => d.key === 'strat-override') &&
  focusById(props.effective).offPlan.strat !== 'pass';
</script>

<template>
  <section data-testid="game">
    <h2>3 · The game</h2>
    <p class="score" data-testid="score">
      Home <strong>{{ sim.result.homeScore }}</strong> — <strong>{{ sim.result.awayScore }}</strong> Away
      <span class="tag">Q4-start diff {{ sim.q4StartDiff }}</span>
    </p>
    <template v-if="focusLog.length">
      <h3>4th-quarter automatics (fired)</h3>
      <ul data-testid="fired">
        <li v-for="d in focusLog" :key="d.key">
          <strong>{{ d.label }}</strong> — {{ d.detail }}
          <span v-if="!d.appliedInSim" class="tag">reported to the engine layer</span>
        </li>
      </ul>
      <p v-if="precedence()" class="note" data-testid="precedence">
        Precedence: the user's focus (<strong>{{ label(effective) }}</strong>) stays selected;
        the automatic's tendency applies on top for the overridden plan. The user is never silently re-picked.
      </p>
    </template>
    <p v-else data-testid="no-automatics">No automatics fired (Q4-start diff {{ sim.q4StartDiff }}).</p>
    <h3>Box score</h3>
    <table class="box">
      <thead><tr><th></th><th>Rush yds</th><th>Pass yds</th><th>Plays</th><th>Give</th><th>Take</th><th>Sacks</th></tr></thead>
      <tbody>
        <tr><th>Home</th><td>{{ sim.result.stats.home.rush }}</td><td>{{ sim.result.stats.home.pass }}</td><td>{{ sim.result.stats.home.plays }}</td><td>{{ sim.result.stats.home.giveaways }}</td><td>{{ sim.result.stats.home.takeaways }}</td><td>{{ sim.result.stats.home.sacksTaken }}</td></tr>
        <tr><th>Away</th><td>{{ sim.result.stats.away.rush }}</td><td>{{ sim.result.stats.away.pass }}</td><td>{{ sim.result.stats.away.plays }}</td><td>{{ sim.result.stats.away.giveaways }}</td><td>{{ sim.result.stats.away.takeaways }}</td><td>{{ sim.result.stats.away.sacksTaken }}</td></tr>
      </tbody>
    </table>
  </section>
</template>
