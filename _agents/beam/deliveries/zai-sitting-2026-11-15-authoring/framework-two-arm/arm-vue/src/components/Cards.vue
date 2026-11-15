<!-- Slice 5 — player cards (Vue 3). The board row's face: each engine boardVM row becomes a card
     (name / pos / NFL team on the face, OVR · Wins · Priority as the numbers). Written from blank
     for the authoring bench. Alive: hover lift, open-the-featured-card animation, SHARE PNG (the
     cardDraw canvas export, zero dependencies). Keyboard: cards are buttons (Enter opens), Esc
     closes. Every number is the engine's own; the card re-renders, it never re-derives. -->
<script setup lang="ts">
  import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
  import { cards, pick } from '../lib/appStore.ts';
  import { drawCard } from '../lib/cardDraw.ts';
  import type { CardVM } from '../lib/cardVM.ts';
  import '../cards.css';

  const grid = computed(() => cards.value);
  const featuredId = ref<string | null>(null);
  const featured = computed<CardVM | null>(() => grid.value?.cards.find((c) => c.id === featuredId.value) ?? null);
  const shareMsg = ref('');

  function open(id: string): void { featuredId.value = id; shareMsg.value = ''; }
  function close(): void { featuredId.value = null; shareMsg.value = ''; }
  function share(): void {
    if (!featured.value || !grid.value) return;
    const url = drawCard(featured.value, { teamName: grid.value.teamName, overall: grid.value.overall, totalPicks: grid.value.totalPicks });
    if (!url) { shareMsg.value = 'canvas unavailable'; return; }
    const a = document.createElement('a');
    a.href = url; a.download = 'player-card-' + featured.value.id + '.png';
    document.body.appendChild(a); a.click(); a.remove();
    shareMsg.value = 'PNG saved';
  }
  function onKey(e: KeyboardEvent): void { if (e.key === 'Escape') close(); }
  onMounted(() => window.addEventListener('keydown', onKey));
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <section class="cp-screen" aria-label="Player cards">
    <template v-if="grid">
      <div class="cp-cards-head">
        <span class="cp-cards-onclock">{{ grid.onClock }}</span>
        <span class="cp-cards-count">{{ grid.teamName }} · {{ grid.overall }} of {{ grid.totalPicks }} overall · {{ grid.count }}</span>
      </div>
      <div class="cp-cards-grid">
        <button v-for="c in grid.cards" :key="c.id" class="cp-card" :class="'cp-tone-' + c.tone" :data-pid="c.id" :data-pos="c.pos" @click="open(c.id)">
          <span class="cp-card-mono">{{ c.monogram }}</span>
          <span class="cp-card-name">{{ c.name }}</span>
          <span class="cp-card-sub">{{ c.pos }} · {{ c.nflTeam }}</span>
          <span class="cp-card-slot">{{ c.slotLabel }}</span>
          <span class="cp-card-nums">
            <span class="cp-card-ovr">{{ c.ovr }}</span>
            <span class="cp-card-num">W {{ c.wins }}</span>
            <span class="cp-card-num">P {{ c.priority }}</span>
          </span>
        </button>
      </div>
      <div v-if="featured" class="cp-cards-feat" @click.self="close">
        <article class="cp-cards-featcard" :class="'cp-tone-' + featured.tone" :data-pid="featured.id" aria-label="Featured card">
          <div class="cp-cards-featclock">OVERALL {{ grid.overall }} OF {{ grid.totalPicks }} · {{ grid.onClock }}</div>
          <div style="display: flex; gap: 14px; align-items: center">
            <span class="cp-card-mono" style="width: 52px; height: 52px; font-size: 1.1rem">{{ featured.monogram }}</span>
            <div>
              <div class="cp-card-name" style="font-size: 1.3rem">{{ featured.name }}</div>
              <div class="cp-card-sub">{{ featured.pos }} · {{ featured.nflTeam }}</div>
            </div>
          </div>
          <div class="cp-cards-featnums">
            <span class="cp-cards-featovr">{{ featured.ovr }}</span>
            <span class="cp-card-num">W {{ featured.wins }}</span>
            <span class="cp-card-num">P {{ featured.priority }}</span>
          </div>
          <div class="cp-card-slot">SLOTS {{ featured.slotLabel }}</div>
          <div v-if="featured.alsoFits.length" class="cp-cards-featflex"><span v-for="f in featured.alsoFits" :key="f">{{ f }}</span></div>
          <div class="cp-cards-featactions">
            <button class="cp-sharebtn" @click="share">SHARE PNG</button>
            <button class="cp-feedtool" @click="close">CLOSE</button>
            <button class="cp-pickbtn" @click="pick(featured.id, featured.slotId); close()">PICK HIM</button>
            <span v-if="shareMsg" class="cp-sharemsg">{{ shareMsg }}</span>
          </div>
        </article>
      </div>
    </template>
  </section>
</template>
