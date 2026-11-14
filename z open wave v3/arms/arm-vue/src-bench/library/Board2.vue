<script setup lang="ts">
// BENCH-2 Phase D — the Board2 (library test), VUE ARM: @vueuse/core is the library under test
// (useVirtualList + useStorage + refDebounced). Rows come from the FROZEN POOL (draft.pool, the
// 1,921 thawed players — boardVM is need-filtered to ~240 candidates and is NOT the pool). The
// pool's four sorts are ovr/spd/str/name (round/fit are draft-board concepts, not pool concepts).
import { computed, onMounted, nextTick, ref } from 'vue';
import { useVirtualList, useStorage, refDebounced } from '@vueuse/core';
import { store } from '../shared/boot';
import palette from './team-palette.json';

const USER_TEAM = 'Denver Broncos';           // userTeam 0 — the .ub blue
const SORTS = ['ovr', 'spd', 'str', 'name'] as const;
type Sort = (typeof SORTS)[number];
type PoolPlayer = { id: string; name: string; pos: string; team: string; ovr: number; spd: number; str: number; freeAgent: boolean };

// the engine's own vocabularies, computed once
const pool: PoolPlayer[] = (store.getState().draft?.pool ?? []) as unknown as PoolPlayer[];
const posList = [...new Set(pool.map((r) => r.pos))].sort();
const teamList = [...new Set(pool.map((r) => r.team))].sort();

// persisted board state (useStorage: localStorage sync built in — the VueUse bet)
// v2 key: the old Board2 wrote a different state shape (sort names, filters) — never read foreign shapes
const state = useStorage('sim:bench2:board2v2', { sort: 'ovr' as Sort, pos: 'ALL', team: 'ALL', q: '', topId: '', scrollTop: 0 });
if (!(SORTS as readonly string[]).includes(state.value.sort)) state.value.sort = 'ovr';
const stars = useStorage('sim:bench2:stars', {} as Record<string, 1>);

const qRaw = ref('');
const qD = refDebounced(qRaw, 250);          // the debounced search

function sortPool(rows: PoolPlayer[], sort: Sort): PoolPlayer[] {
  const sorted = [...rows];
  if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
  else sorted.sort((a, b) => b[sort] - a[sort] || (a.id < b.id ? -1 : 1));
  return sorted;
}
const rows = computed<PoolPlayer[]>(() => {
  const s = state.value;
  let r = sortPool(pool, s.sort);
  if (s.pos !== 'ALL') r = r.filter((x) => x.pos === s.pos);
  if (s.team !== 'ALL') r = r.filter((x) => x.team === s.team);
  const needle = qD.value.trim().toLowerCase();
  if (needle) r = r.filter((x) => x.name.toLowerCase().includes(needle));
  return r;
});

// virtualization: only the visible window is in the DOM
const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(rows, { itemHeight: 44, overscan: 8 });

function onScroll() {
  const el = containerProps.ref.value as HTMLElement | undefined;
  const first = list.value[0];
  if (first) state.value.topId = String(rows.value[first.index]?.id ?? '');
  if (el) state.value.scrollTop = Math.round(el.scrollTop);
}
function restoreScroll() {
  const s = state.value;
  if (!s.scrollTop) return;
  nextTick(() => { const el = containerProps.ref.value as HTMLElement | undefined; if (el) el.scrollTop = s.scrollTop; });
}
onMounted(restoreScroll);
function star(id: string) { if (stars.value[id]) delete stars.value[id]; else stars.value[id] = 1; }
const teamColor = (t: string) => (palette as Record<string, string>)[t] ?? '#c9a24b';
</script>

<template>
  <div class="b2-root">
    <div class="b2-head">
      <div class="b2-title">The Board — full pool</div>
      <div class="b2-sub">vue arm · @vueuse/core · <span class="b2-ub">{{ USER_TEAM }}</span></div>
      <div class="b2-count" data-testid="b2-count">{{ rows.length.toLocaleString() }} of {{ pool.length.toLocaleString() }} players</div>
    </div>
    <div class="b2-controls" data-testid="b2-controls">
      <button v-for="s in SORTS" :key="s" :class="{ on: state.sort === s }" :data-testid="`b2-sort-${s}`" @click="state.sort = s">{{ s }}</button>
      <select data-testid="b2-pos" v-model="state.pos"><option value="ALL">All positions</option><option v-for="p in posList" :key="p" :value="p">{{ p }}</option></select>
      <select data-testid="b2-team" v-model="state.team"><option value="ALL">All teams</option><option v-for="t in teamList" :key="t" :value="t">{{ t }}</option></select>
      <input data-testid="b2-search" type="search" placeholder="search name…" v-model="qRaw" />
    </div>
    <div v-bind="containerProps" class="b2-viewport" data-testid="b2-viewport" @scroll="onScroll">
      <div v-bind="wrapperProps">
        <div v-for="{ index, data } in list" :key="data.id" :data-testid="'row-' + data.id" :data-index="index" class="b2-row" :class="{ shimmer: data.ovr >= 90 }" :style="{ '--tc': teamColor(data.team) }">
          <button class="b2-star" :class="{ on: stars[data.id] }" :data-testid="`b2-star-${data.id}`" @click="star(data.id)">★</button>
          <span class="b2-name">{{ data.name }}</span>
          <span class="b2-team" :class="{ 'b2-ub': data.team === USER_TEAM }">{{ data.team }}</span>
          <span class="b2-bub">{{ data.pos }}{{ data.ovr }}</span>
          <span class="b2-ovrcell">{{ data.ovr }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
