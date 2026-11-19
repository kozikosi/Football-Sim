<script setup lang="ts">
import { ref, computed } from 'vue';
import { rows, spark, type Row } from './data';
const tab = ref<'rs' | 'po'>('rs');
const q = ref('');
const key = ref<keyof Row>('rating');
const dir = ref(-1);
const open = ref<string | null>(null);
const view = computed(() =>
  rows
    .filter((r) => (r.name + ' ' + r.pos).toLowerCase().includes(q.value.toLowerCase()))
    .slice()
    .sort((a, b) => dir.value * (Number(a[key.value]) - Number(b[key.value])))
);
function sortBy(k: keyof Row) { if (key.value === k) dir.value = -dir.value; else { key.value = k; dir.value = -1; } }
</script>

<template>
  <main>
    <div class="tabs">
      <button :class="{ on: tab === 'rs' }" @click="tab = 'rs'">Season stats</button>
      <button :class="{ on: tab === 'po' }" @click="tab = 'po'">Playoff stats</button>
    </div>
    <input v-model="q" placeholder="filter" />
    <table>
      <thead><tr>
        <th><button @click="sortBy('name')">Player</button></th>
        <th><button @click="sortBy('pos')">Pos</button></th>
        <th><button @click="sortBy('ovr')">OVR</button></th>
        <th><button @click="sortBy('gp')">GP</button></th>
        <th><button @click="sortBy('rating')">Rating</button></th>
        <th><button @click="sortBy('yds')">Yards</button></th>
        <th><button @click="sortBy('td')">TD</button></th>
        <th>Form</th>
      </tr></thead>
      <tbody>
        <template v-for="r in view" :key="r.id">
          <tr :class="{ open: open === r.id }" @click="open = open === r.id ? null : r.id">
            <td>{{ r.name }}</td><td>{{ r.pos }}</td><td class="num">{{ r.ovr }}</td><td class="num">{{ r.gp }}</td>
            <td class="num">{{ r.rating }}</td><td class="num">{{ r.yds }}</td><td class="num">{{ r.td }}</td>
            <td><svg class="spark" viewBox="0 0 50 18"><path :d="spark(r.spark)" fill="none" stroke="currentColor" /></svg></td>
          </tr>
          <tr v-if="open === r.id" class="open"><td colspan="8">{{ tab === 'po' ? 'Playoff' : 'Season' }} splits · FP {{ r.fp }} · INT {{ r.int }}</td></tr>
        </template>
      </tbody>
    </table>
    <p>{{ view.length }} players · {{ tab === 'po' ? 'playoffs' : 'regular season' }}</p>
  </main>
</template>
<style>table{border-collapse:collapse;width:100%}th,td{padding:4px 8px;text-align:right;border-bottom:1px solid #333}th:first-child,td:first-child{text-align:left}th{position:sticky;top:0;background:#1b1417}button{background:none;border:0;color:inherit;font:inherit;cursor:pointer}tr.open td{background:#241a1e}.spark{width:60px;height:18px}.num{font-variant-numeric:tabular-nums}</style>
