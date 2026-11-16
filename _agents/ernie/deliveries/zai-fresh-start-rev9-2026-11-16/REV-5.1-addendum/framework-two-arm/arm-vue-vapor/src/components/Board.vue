<!-- Slice 2 — the draft board (Vue 3): the user team's picks, the best-available list, a pick action
     through the REAL reducer (app/store.ts dispatch PICK). Every number is the engine's own boardVM
     (view/draftBoard.ts): wins, priority, gone%, flex chips; PICK/UNDO go through the store. -->
<script setup lang="ts">
  import { computed } from 'vue';
  import { board, ui, draftSnap, pick, undo, setSort } from '../lib/appStore.ts';
  import type { BoardSort } from '../lib/appStore.ts';
  import { slotLabel } from '../engine/sports/nfl/view/draftBoard.ts';
  import { TEAMS } from '../engine/sports/nfl/engine/league.ts';

  const rows = computed(() => board.value?.rows ?? []);
  const header = computed(() => board.value?.header ?? null);
  const mine = computed(() => (draftSnap.value.draft?.log ?? []).filter((k) => k.team === draftSnap.value.record?.userTeam));
  const teamName = computed(() => (draftSnap.value.record ? TEAMS[draftSnap.value.record.userTeam].name : ''));
  const toneColor = (t: 'good' | 'neutral' | 'bad'): string =>
    t === 'good' ? 'var(--cp-good)' : t === 'bad' ? 'var(--cp-bad)' : 'var(--cp-sub)';
</script>

<template>
  <section class="cp-screen" aria-label="Draft board">
    <template v-if="header">
      <div class="cp-board-head">
        <span class="cp-board-onclock">{{ header.onClock }}</span>
        <span class="cp-board-count">{{ teamName }} · {{ header.roundLabel }} · pick {{ header.pickInRound }} of 32 · {{ header.overall }} of {{ header.totalPicks }} overall</span>
      </div>
      <div class="cp-toolrow">
        <button v-for="s in (['wins', 'ovr', 'priority'] as BoardSort[])" :key="s" class="cp-feedtool" :class="{ 'cp-feedtool-on': ui.sort === s }" :aria-pressed="ui.sort === s" @click="setSort(s)">{{ s.toUpperCase() }}</button>
        <button class="cp-feedtool" @click="undo">UNDO MY LAST</button>
      </div>
      <div class="cp-board-table">
        <div v-for="(r, i) in rows" :key="r.id" class="cp-board-row" :style="{ '--beat': i }">
          <span class="cp-board-name">{{ r.name }}</span>
          <span class="cp-board-pos" :style="{ color: toneColor(r.tone) }">{{ r.pos }}</span>
          <span class="cp-board-num">ovr {{ r.ovr }}</span>
          <span class="cp-board-slot">{{ r.slotLabel }}</span>
          <span class="cp-board-num">wins {{ r.wins }}</span>
          <span class="cp-board-num">prio {{ r.priority }}</span>
          <span class="cp-board-num cp-board-gone">gone {{ r.gone }}</span>
          <span v-for="f in r.alsoFits" :key="f.slotId" class="cp-board-flex">{{ f.slotLabel }} {{ f.flex }}</span>
          <button class="cp-pickbtn" @click="pick(r.id, r.slotId)">PICK</button>
        </div>
      </div>
      <p v-if="draftSnap.error" class="cp-msg cp-msg-refused">{{ draftSnap.error }}</p>
    </template>
    <p v-else-if="draftSnap.status === 'done'" class="cp-screen-note">the draft is complete — {{ teamName }}'s 32 are in; the feed panel has their week 1</p>
    <p v-else class="cp-screen-note">no draft in progress</p>
    <div class="cp-mine">
      <h4 class="cp-title">YOUR PICKS ({{ mine.length }})</h4>
      <div v-for="k in mine" :key="k.overall" class="cp-mine-line">#{{ k.overall }} · {{ k.player.name }} → {{ slotLabel(k.slot) }}</div>
      <div v-if="!mine.length" class="cp-mine-line">no picks yet — the board above is the engine's best-available</div>
    </div>
    <footer class="cp-feed-foot">
      <span>rows are the engine's own boardVM (60 best) · gone% is the engine's CPU replay (30 sims)</span>
      <span class="cp-feed-dim">PICK dispatches into the real reducer</span>
    </footer>
  </section>
</template>
