<script setup lang="ts">
// LiveFeed.vue — slice (d): the live-updating feed — the engine's REAL week-1 game revealed drive
// by drive (a ticker in the store), scoreboard riding the running score, w89 feed styling. Every
// line is the engine's own gameFeed drive event, shaped by feedVM (ink, badges, me-flag, lead Δ).
import { computed } from 'vue';
import { useAppStore } from '../stores/appStore';

const app = useAppStore();
const homeInk = computed(() => app.feed.homeInk.ink);
const awayInk = computed(() => app.feed.awayInk.ink);
</script>

<template>
  <section>
    <div class="feed-score">
      <span class="fs-team" :style="{ color: homeInk }">{{ app.feed.homeAbbr }}</span>
      <span class="fs-num" data-testid="feed-score">{{ app.feedScore }}</span>
      <span class="fs-team" :style="{ color: awayInk }">{{ app.feed.awayAbbr }}</span>
      <span class="fs-week">{{ app.feed.week }} · {{ app.feed.year }} · {{ app.feed.gameSeedLabel }}</span>
    </div>
    <div class="feed-ctl">
      <span class="feed-live-dot" :class="{ on: app.feedLive }" />
      <button class="ctl-btn" :class="{ paused: !app.feedLive }" data-testid="feed-live" @click="app.feedLive ? app.feedStop() : app.feedStart()">
        {{ app.feedLive ? 'PAUSE' : 'LIVE' }}
      </button>
      <button class="ctl-btn paused" data-testid="feed-ff" @click="app.feedFastForward()">FINAL</button>
      <span class="cards-count">{{ app.feedShown.length }} / {{ app.feed.drives.length }} DRIVES</span>
    </div>
    <div class="feed" data-testid="feed">
      <div
        v-for="(d, i) in app.feedShown" :key="i" class="feed-line"
        :class="{ me: d.me }" :data-testid="'feed-line-' + i" :style="{ '--tc': d.teamInk }"
      >
        <span v-if="d.me" class="fl-team">[ME] </span><span class="fl-team">{{ d.teamAbbr }}</span>
        {{ d.summary }}
        <span v-for="(b, bi) in d.badges" :key="bi" class="fl-badge">{{ b.label }}</span>
        <span class="fl-score" :class="{ lead: d.leadChange }">{{ d.scoreAfter.home }}-{{ d.scoreAfter.away }}</span>
      </div>
    </div>
  </section>
</template>
