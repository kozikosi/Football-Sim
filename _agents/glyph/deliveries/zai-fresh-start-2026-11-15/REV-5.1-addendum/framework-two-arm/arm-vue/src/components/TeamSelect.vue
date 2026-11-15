<!-- Slice 3 — team select (Vue 3): the 32 teams in the engine's real alignment; the choice persists
     (localStorage under the sport's own key, loaded at boot); picking one STARTs a fresh real
     draft for that team and re-derives the feed (the pool re-renders for the choice). -->
<script setup lang="ts">
  import { computed, onBeforeUnmount, ref } from 'vue';
  import { chooseTeam, draftSnap, teams } from '../lib/appStore.ts';
  import type { TeamRow } from '../lib/bootData.ts';

  const groups = computed(() => {
    const g: { conf: string; div: string; teams: TeamRow[] }[] = [];
    for (const t of teams) {
      const last = g[g.length - 1];
      if (!last || last.conf !== t.conf || last.div !== t.div) g.push({ conf: t.conf, div: t.div, teams: [t] });
      else last.teams.push(t);
    }
    return g;
  });
  const current = computed(() => draftSnap.value.record?.userTeam ?? null);

  // Slice-5 arc (a) — the animated tour of the 32: an interval-driven highlight stepping through
  // the engine's real alignment with a live caption; STOP (and leaving the screen) ends it.
  const tour = ref(-1);
  let timer: number | undefined;
  const tourCaption = computed(() => (tour.value >= 0 ? 'TOUR ' + (tour.value + 1) + '/32 · ' + teams[tour.value].name + ' · ' + teams[tour.value].conf + ' ' + teams[tour.value].div : ''));
  function tourStep(): void { tour.value = (tour.value + 1) % teams.length; }
  function tourStart(): void { if (timer !== undefined) return; tourStep(); timer = window.setInterval(tourStep, 700); }
  function tourStop(): void { if (timer !== undefined) { window.clearInterval(timer); timer = undefined; } tour.value = -1; }
  onBeforeUnmount(tourStop);
</script>

<template>
  <section class="cp-screen" aria-label="Team select">
    <h3 class="cp-title">PICK YOUR TEAM</h3>
    <p class="cp-screen-note">The league's 32 teams, the engine's real alignment. The choice persists; the draft board and the feed re-render for it.</p>
    <div class="cp-toolrow">
      <button class="cp-feedtool" @click="tourStart">TOUR THE 32</button>
      <button class="cp-feedtool" @click="tourStop">STOP</button>
      <span class="cp-board-count">{{ tourCaption }}</span>
    </div>
    <div class="cp-team-groups">
      <div v-for="g in groups" :key="g.conf + g.div" class="cp-team-div">
        <div class="cp-team-divname">{{ g.conf }} {{ g.div }}</div>
        <div class="cp-team-grid">
          <button v-for="t in g.teams" :key="t.i" class="cp-teambtn" :class="{ 'cp-on': t.i === current, 'cp-tour-on': t.i === tour }" :aria-pressed="t.i === current" @click="chooseTeam(t.i)">{{ t.name }}</button>
        </div>
      </div>
    </div>
  </section>
</template>
