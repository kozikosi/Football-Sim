<script setup lang="ts">
// BoardRow.vue — slice (c): the draft-board row list with Wins/Priority, flex badges, fixed
// visuals, data-testid="row-*" hooks. The board stays hand-rolled (house rule) — this is the
// bespoke row anatomy the stats primitive is NOT for.
import { useAppStore } from '../stores/appStore';
import { inkOf } from '../shared/ink';

const app = useAppStore();
</script>

<template>
  <section>
    <div class="cards-head">
      <h2 style="margin: 0">DRAFT BOARD</h2>
      <span class="cards-count">{{ app.board.header.onClock }}</span>
    </div>
    <div class="board-list">
      <div
        v-for="r in app.board.rows" :key="r.id" class="board-row"
        :data-testid="'row-' + r.id" :style="{ '--tc': inkOf(r.nflTeam).ink }"
      >
        <span class="tb-pos">{{ r.pos }}</span>
        <span class="tb-name">{{ r.name }}</span>
        <span class="tb-ovr">{{ r.ovr }}</span>
        <span class="tb-wins">{{ r.wins }}</span>
        <span class="tb-pri">{{ r.priority }}</span>
        <span class="tb-badges">
          <span v-for="(b, bi) in r.alsoFits" :key="bi" class="tb-badge" :class="{ gold: bi === 0 }">{{ b }}</span>
        </span>
      </div>
    </div>
  </section>
</template>
