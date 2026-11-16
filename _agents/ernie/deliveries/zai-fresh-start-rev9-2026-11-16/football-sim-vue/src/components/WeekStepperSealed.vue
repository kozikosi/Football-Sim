<script setup lang="ts">
// WeekStepperSealed.vue — the SEALED-RECIPE component (Rev 9 Part C, arm VUE). Same render contract
// as SEALED-RECIPE.md §3, with `sealed-` testid prefixes so the Rev 8 week surface (the battery's
// own data-testid="week-*" contract) and this sealed surface can coexist in one DOM without
// locator collisions. Reachability: mounted under the DEV-only QA hook (window.__SEALED__), the
// same mechanism the receipted Part A live probes use — the battery's six screens are untouched.
import { useWeekStoreSealed } from '../stores/weekStore-sealed';
import { onMounted } from 'vue';

const week = useWeekStoreSealed();
onMounted(() => week.ensure());

function jumpSb(): void {
  week.go(week.total);
}
</script>

<template>
  <section class="panel" data-testid="sealed-week-root">
    <div class="cards-head">
      <h2>SEALED WEEK STEPPER</h2>
      <span class="cards-count" data-testid="sealed-week-label">{{ week.label }}</span>
    </div>
    <div class="board-nav">
      <button class="ctl-btn" data-testid="sealed-week-prev" :disabled="week.slot <= 1" @click="week.prev()">BACK</button>
      <button class="ctl-btn" data-testid="sealed-week-next" :disabled="week.slot >= week.total" @click="week.next()">NEXT</button>
      <button class="ctl-btn paused" data-testid="sealed-week-jump-sb" @click="jumpSb()">SUPER BOWL</button>
    </div>
    <div class="feed" data-testid="sealed-week-games">
      <div v-for="(g, i) in week.view?.games ?? []" :key="g.replayLabel" class="feed-line" :data-testid="`sealed-week-game-${i}`">
        {{ g.homeAbbr }} {{ g.hs }} @ {{ g.as }} {{ g.awayAbbr }}
      </div>
    </div>
    <table class="stats-table" data-testid="sealed-week-standings">
      <thead>
        <tr><th>TEAM</th><th>W</th><th>L</th></tr>
      </thead>
      <tbody>
        <tr v-for="(r, i) in week.standings?.league ?? []" :key="r.team" :data-testid="`sealed-standings-row-${i}`">
          <td class="tc-team">{{ r.abbr }}</td>
          <td>{{ r.w }}</td>
          <td>{{ r.l }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
