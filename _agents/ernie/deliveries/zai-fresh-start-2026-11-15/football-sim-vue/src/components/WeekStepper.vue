<script setup lang="ts">
// WeekStepper.vue — Part B: steps through the season week by week (prev/next, jump, the week's
// games, the standings AFTER that week). Every number is the engine's own SeasonResult via weekVM.
import { watchEffect } from 'vue';
import { useWeekStore } from '../stores/weekStore';

const wk = useWeekStore();
watchEffect(() => { if (!wk.season) wk.ensureSeason(); });
</script>

<template>
  <section>
    <div class="week-head">
      <button class="week-btn" data-testid="week-prev" @click="wk.weekPrev()">◀ PREV</button>
      <span class="week-label" data-testid="week-label">{{ wk.week?.label }}</span>
      <button class="week-btn" data-testid="week-next" @click="wk.weekNext()">NEXT ▶</button>
      <select class="week-jump" data-testid="week-jump" :value="wk.weekSlot" @change="wk.weekGo(Number(($event.target as HTMLSelectElement).value))">
        <option v-for="i in wk.weekTotal" :key="i" :value="i">SLOT {{ i }}</option>
      </select>
    </div>
    <div class="week-games" data-testid="week-games">
      <div v-for="(g, i) in wk.week?.games" :key="i" class="week-game" :data-testid="'week-game-' + i">
        <span class="wg-abbr">{{ g.awayAbbr }}</span><span class="wg-num">{{ g.as }}</span>
        <span class="wg-abbr">@</span>
        <span class="wg-num">{{ g.hs }}</span><span class="wg-abbr">{{ g.homeAbbr }}</span>
        <span class="wg-round">{{ g.round ?? g.kind }}</span>
      </div>
    </div>
    <div class="week-standings" data-testid="standings">
      <h3>STANDINGS THROUGH WEEK {{ wk.standings?.throughWeek }}</h3>
      <div class="wst-cols">
        <div v-for="d in wk.standings?.divisions" :key="d.conf + d.div">
          <h3>{{ d.conf }} {{ d.div }}</h3>
          <table class="wst">
            <tbody>
              <tr v-for="r in d.rows" :key="r.team" :data-testid="'stand-row-' + r.abbr">
                <td :class="{ clinch: wk.standings?.clinched.includes(r.team) }">{{ r.abbr }}</td>
                <td class="num">{{ r.w }}-{{ r.l }}-{{ r.t }}</td>
                <td class="num">{{ r.pf }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
