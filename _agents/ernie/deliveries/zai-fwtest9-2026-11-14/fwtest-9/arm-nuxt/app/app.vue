<script setup lang="ts">
import { focusById } from './engine-contract/index.ts';
import {
  VERSION_TAG, TEAM_SLOTS, manageOn, phase, sim, halftimeUsed, note,
  effectiveFocus, board, kickoff, halftimeOptions, changeFocusAtHalftime, finish,
} from './state';
import FocusCards from './components/FocusCards.vue';
import BoardTable from './components/BoardTable.vue';
import GamePanel from './components/GamePanel.vue';

const label = (id: string) => focusById(id).label;
</script>

<template>
  <main>
    <h1>Framework Test — Offensive Focus <span class="tag">Vue · focus {{ VERSION_TAG }}</span></h1>

    <section data-testid="setup">
      <h2>1 · Pre-game</h2>
      <label class="manage">
        <input type="checkbox" v-model="manageOn" data-testid="manage-toggle" />
        Manage focus (off = auto — the engine picks, no halftime prompt)
      </label>
      <FocusCards v-if="manageOn" />
      <p v-else data-testid="auto-pick">
        Auto mode — the engine picks: <strong>{{ label(effectiveFocus) }}</strong>
      </p>
      <button class="primary" @click="kickoff" data-testid="kickoff">Kickoff</button>
    </section>

    <section v-if="phase !== 'pregame'" data-testid="halftime">
      <h2>2 · Halftime</h2>
      <template v-if="manageOn && !halftimeUsed && phase === 'halftime' && halftimeOptions().includes(effectiveFocus)">
        <p>One change available. Current: <strong>{{ label(effectiveFocus) }}</strong>.</p>
        <div class="cards">
          <button
            v-for="id in halftimeOptions()" :key="id"
            class="card" :class="{ selected: id === effectiveFocus }"
            :data-testid="`halftime-${id}`" @click="changeFocusAtHalftime(id)"
          >{{ label(id) }}</button>
        </div>
      </template>
      <p v-else data-testid="no-halftime">
        Auto mode — no halftime prompt{{ halftimeUsed ? ' (change used)' : '' }}.
      </p>
      <p v-if="note" class="note">{{ note }}</p>
      <button class="primary" @click="finish" data-testid="continue">Continue</button>
    </section>

    <BoardTable :board="board" :team-slots="TEAM_SLOTS" :focus-label="label(effectiveFocus)" />
    <GamePanel v-if="sim" :sim="sim" :effective="effectiveFocus" :focus-log="sim.focusLog" />
  </main>
</template>
