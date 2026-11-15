<script setup>
import { computed } from 'vue';
const props = defineProps({
  player: { type: Object, required: true },
  rank: { type: Number, required: true },
  selected: { type: Boolean, default: false }
});
const emit = defineEmits(['select', 'move']);
const GROUP = { QB: 'Quarterback', RB: 'Running back', WR: 'Receiver', TE: 'Tight end', OL: 'Lineman', DL: 'Defensive line', EDGE: 'Edge', LB: 'Linebacker', CB: 'Cornerback', S: 'Safety', K: 'Kicker', P: 'Punter' };
const group = computed(() => GROUP[props.player.pos] ?? props.player.pos);
</script>

<template>
  <button class="pcard" :class="{ sel: selected }" :aria-pressed="selected"
    @click="emit('select', player)"
    @keydown.down.prevent="emit('move', 1)"
    @keydown.up.prevent="emit('move', -1)">
    <span class="rank" aria-hidden="true">#{{ rank }}</span>
    <span class="body">
      <span class="top">
        <span class="name">{{ player.name }}</span>
        <span class="ovr">{{ player.ovr }}</span>
      </span>
      <span class="meta">{{ player.pos }} · {{ player.team }}</span>
      <span class="bar" aria-hidden="true"><span class="fill" :style="{ width: player.ovr + '%' }"></span></span>
      <span class="stats">
        <span><b>SPD</b>{{ player.spd }}</span>
        <span><b>STR</b>{{ player.str }}</span>
        <span class="grp">{{ group }}</span>
      </span>
      <span v-if="selected" class="more">Ranked #{{ rank }} at {{ player.pos }} in this pool · {{ player.ovr }} overall</span>
    </span>
  </button>
</template>

<style>
  .pcard {
    display: grid; grid-template-columns: 2.1rem 1fr; gap: .55rem; align-items: start;
    width: 100%; text-align: left; font: inherit; color: var(--ink);
    background: var(--card); border: 1px solid var(--edge); border-radius: var(--r);
    padding: .6rem .65rem; cursor: pointer;
    transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
  }
  .pcard:hover, .pcard:focus-visible { transform: translateY(-2px); border-color: var(--accent); box-shadow: 0 6px 18px -10px var(--accent); }
  .pcard:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .pcard.sel { border-color: var(--accent); background: var(--sel); }
  .rank { font-variant-numeric: tabular-nums; font-weight: 800; font-size: .82rem; color: var(--accent); padding-top: .1rem; }
  .body { display: grid; gap: .3rem; min-width: 0; }
  .top { display: flex; justify-content: space-between; align-items: baseline; gap: .5rem; }
  .name { font-weight: 700; font-size: .95rem; line-height: 1.15; overflow-wrap: anywhere; }
  .ovr { font-weight: 800; font-variant-numeric: tabular-nums; font-size: 1.02rem; color: var(--accent); }
  .meta { font-size: .76rem; color: var(--muted); }
  .bar { display: block; height: 4px; border-radius: 99px; background: var(--track); overflow: hidden; }
  .fill { display: block; height: 100%; background: var(--accent); border-radius: 99px; animation: grow .5s ease both; }
  @keyframes grow { from { width: 0 !important; } }
  @media (prefers-reduced-motion: reduce) { .fill { animation: none; } .pcard { transition: none; } }
  .stats { display: flex; gap: .6rem; font-size: .72rem; color: var(--muted); font-variant-numeric: tabular-nums; }
  .stats b { color: var(--ink); font-weight: 700; margin-right: .18rem; }
  .grp { margin-left: auto; }
  .more { font-size: .74rem; color: var(--accent); }
</style>
