// DS tools-eval harness (2026-11-19): measure what the "stats table" feature costs in each framework.
// Scratch only. Nothing here ships; the numbers go in the report with the command that printed them.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.env.EVAL_ROOT || '/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/ds-c81/tools-eval';
fs.mkdirSync(ROOT, { recursive: true });

const write = (app, file, body) => {
  const p = path.join(ROOT, app, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body);
};

const pkg = (deps, devDeps) => JSON.stringify({ name: 'eval', private: true, type: 'module', scripts: { build: 'vite build' }, dependencies: deps, devDependencies: devDeps }, null, 2) + '\n';

const html = (entry, root = 'app') => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>eval</title></head><body><div id="${root}"></div><script type="module" src="/src/${entry}"></script></body></html>
`;

// ---------- the shared feature: 32 stat rows, tab switch, filter, sortable headers, expandable row, sparkline
const DATA = `export type Row = { id: string; name: string; pos: string; ovr: number; gp: number; rating: number; yds: number; td: number; int: number; fp: number; spark: number[] };
const POS = ['QB','RB','WR','TE','OL','DL','LB','DB','K'];
export const rows: Row[] = Array.from({ length: 32 }, (_, i) => ({
  id: 'p' + i, name: 'Player ' + (i + 1), pos: POS[i % 9], ovr: 60 + ((i * 7) % 38), gp: 1 + (i % 17),
  rating: 50 + ((i * 13) % 50), yds: 100 + ((i * 137) % 1400), td: (i * 3) % 14, int: i % 9,
  fp: 10 + ((i * 5) % 30), spark: Array.from({ length: 6 }, (_, j) => (i + j * 3) % 20),
}));
export const spark = (ns: number[]) => { const max = Math.max(...ns, 1); return ns.map((n, i) => \`\${i === 0 ? 'M' : 'L'}\${(i * 10).toFixed(1)},\${(16 - (n / max) * 14).toFixed(1)}\`).join(' '); };
`;

const CSS = `table{border-collapse:collapse;width:100%}th,td{padding:4px 8px;text-align:right;border-bottom:1px solid #333}th:first-child,td:first-child{text-align:left}th{position:sticky;top:0;background:#1b1417}button{background:none;border:0;color:inherit;font:inherit;cursor:pointer}tr.open td{background:#241a1e}.spark{width:60px;height:18px}.num{font-variant-numeric:tabular-nums}`;

// ---------- 1. Svelte 5 base (runes, no UI library)
const svBase = `<script lang="ts">
  import { rows as all, spark } from './data';
  const rows = all;
  let tab = $state<'rs' | 'po'>('rs');
  let q = $state('');
  let key = $state('rating');
  let dir = $state(-1);
  let open = $state<string | null>(null);
  const view = $derived(
    rows
      .filter((r) => (r.name + ' ' + r.pos).toLowerCase().includes(q.toLowerCase()))
      .sort((a: any, b: any) => dir * (Number(a[key]) - Number(b[key])))
  );
  function sortBy(k: string) { if (key === k) dir = -dir; else { key = k; dir = -1; } }
</script>

<main>
  <div class="tabs">
    <button class:on={tab === 'rs'} onclick={() => (tab = 'rs')}>Season stats</button>
    <button class:on={tab === 'po'} onclick={() => (tab = 'po')}>Playoff stats</button>
  </div>
  <input placeholder="filter" bind:value={q} />
  <table>
    <thead><tr>
      <th><button onclick={() => sortBy('name')}>Player</button></th>
      <th><button onclick={() => sortBy('pos')}>Pos</button></th>
      <th><button onclick={() => sortBy('ovr')}>OVR</button></th>
      <th><button onclick={() => sortBy('gp')}>GP</button></th>
      <th><button onclick={() => sortBy('rating')}>Rating</button></th>
      <th><button onclick={() => sortBy('yds')}>Yards</button></th>
      <th><button onclick={() => sortBy('td')}>TD</button></th>
      <th>Form</th>
    </tr></thead>
    <tbody>
      {#each view as r (r.id)}
        <tr class:open={open === r.id} onclick={() => (open = open === r.id ? null : r.id)}>
          <td>{r.name}</td><td>{r.pos}</td><td class="num">{r.ovr}</td><td class="num">{r.gp}</td>
          <td class="num">{r.rating}</td><td class="num">{r.yds}</td><td class="num">{r.td}</td>
          <td><svg class="spark" viewBox="0 0 50 18"><path d={spark(r.spark)} fill="none" stroke="currentColor" /></svg></td>
        </tr>
        {#if open === r.id}
          <tr class="open"><td colspan="8">{tab === 'po' ? 'Playoff' : 'Season'} splits · FP {r.fp} · INT {r.int}</td></tr>
        {/if}
      {/each}
    </tbody>
  </table>
  <p>{view.length} players · {tab === 'po' ? 'playoffs' : 'regular season'}</p>
</main>
<style>${CSS}</style>
`;

// ---------- 2. Vue 3 base
const vuBaseApp = `<script setup lang="ts">
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
<style>${CSS}</style>
`;

const vueMain = `import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');
`;

const svMain = `import { mount } from 'svelte';
import App from './App.svelte';
mount(App, { target: document.getElementById('app')! });
`;

function app(name, deps, dev, files) {
  write(name, 'package.json', pkg(deps, dev));
  for (const [f, body] of Object.entries(files)) write(name, f, body);
}

app('sv-base', { svelte: '^5.57.3' }, { vite: '^8.3.6', '@sveltejs/vite-plugin-svelte': '^7.3.1', typescript: '^5.9.3' }, {
  'index.html': html('main.ts'),
  'vite.config.js': `import { svelte } from '@sveltejs/vite-plugin-svelte';\nexport default { plugins: [svelte()] };\n`,
  'src/main.ts': svMain,
  'src/data.ts': DATA,
  'src/App.svelte': svBase,
});

app('vu-base', { vue: '^3.5.13' }, { vite: '^8.3.6', '@vitejs/plugin-vue': '^6.0.1', typescript: '^5.9.3' }, {
  'index.html': html('main.ts'),
  'vite.config.js': `import vue from '@vitejs/plugin-vue';\nexport default { plugins: [vue()] };\n`,
  'src/main.ts': vueMain,
  'src/data.ts': DATA,
  'src/App.vue': vuBaseApp,
});

console.log('wrote sv-base + vu-base to', ROOT);
