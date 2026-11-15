<script setup lang="ts">
// PlayerCards.vue — slice (a): a card per player (name, team, position, OVR, Wins, Priority),
// w89 gold/team-color styling, data-testid="row-*" hooks. Every field on the card is the engine's
// own boardVM row (via toCardGrid) — the component renders, the store computes.
import { useAppStore } from '../stores/appStore';
import { inkOf } from '../shared/ink';
import type { BoardSort } from '../engine/sports/nfl/view/draftBoard.ts';

const app = useAppStore();
</script>

<template>
  <section>
    <div class="cards-head">
      <h2 style="margin: 0">THE BOARD'S CARDS</h2>
      <select class="week-jump" data-testid="cards-sort" :value="app.sort" @change="app.setSort(($event.target as HTMLSelectElement).value as BoardSort)">
        <option value="wins">WINS</option>
        <option value="ovr">OVR</option>
        <option value="priority">PRIORITY</option>
      </select>
      <span class="cards-count" data-testid="cards-count">{{ app.cards.count }}</span>
    </div>
    <div class="cards-grid">
      <article
        v-for="c in app.cards.cards" :key="c.id" class="card"
        :data-testid="'row-' + c.id" :style="{ '--tc': inkOf(c.nflTeam).ink }"
      >
        <div class="medal">{{ c.monogram }}</div>
        <div class="tc-name">{{ c.name }}</div>
        <div><span class="tc-pos">{{ c.pos }}</span> <span class="tc-nfl">{{ c.nflTeam }}</span></div>
        <div class="tc-ovr">{{ c.ovr }}</div>
        <div class="card-nums">
          <div><small>WINS</small><span class="tc-wins">{{ c.wins }}</span></div>
          <div><small>PRIORITY</small><span class="tc-pri">{{ c.priority }}</span></div>
        </div>
      </article>
    </div>
  </section>
</template>
