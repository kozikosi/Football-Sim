<!-- Slice-5 arc (c) — the real-time ticker (VUE arm, randomised assignment): an interval-driven
     bottom bar that walks the REAL draft log as if picks were landing live (hypothetical real-time
     replay of the record's own picks). PAUSE/RESUME control; unmount clears the interval. -->
<script setup lang="ts">
  import { computed, onBeforeUnmount, ref } from 'vue';
  import { draftSnap } from '../lib/appStore.ts';
  import { TEAMS } from '../engine/sports/nfl/engine/league.ts';

  // Walks the REAL draft log (player objects straight off the store state): a hypothetical
  // real-time replay of real picks. The log is empty until the user's first pick lands — the
  // waiting line says so; every pick (user or CPU-advanced) feeds the tape.
  const log = computed(() => draftSnap.value.draft?.log ?? []);
  const lines = ref<string[]>([]);
  const running = ref(true);
  let i = 0;
  let timer: number | undefined;
  function push(): void {
    const src = log.value;
    if (src.length) {
      const l = src[i % src.length];
      lines.value = [...lines.value.slice(-4), 'ov ' + l.overall + ' · ' + TEAMS[l.team].name + ' selected ' + l.player.name + ' (' + l.slot + ')'];
    } else if (lines.value.length === 0) {
      lines.value = ['the board is open — the ticker follows your picks'];
    }
    i++;
  }
  function toggle(): void {
    if (running.value) { window.clearInterval(timer); timer = undefined; running.value = false; }
    else { running.value = true; start(); }
  }
  function start(): void { if (timer === undefined) { push(); timer = window.setInterval(push, 1600); } }
  start();
  onBeforeUnmount(() => { if (timer !== undefined) window.clearInterval(timer); });
</script>

<template>
  <aside class="cp-ticker" aria-label="Draft ticker">
    <button class="cp-feedtool" @click="toggle">{{ running ? 'PAUSE' : 'RESUME' }}</button>
    <div class="cp-ticker-lines">
      <div v-for="(l, n) in lines" :key="n" class="cp-ticker-line">{{ l }}</div>
    </div>
  </aside>
</template>
