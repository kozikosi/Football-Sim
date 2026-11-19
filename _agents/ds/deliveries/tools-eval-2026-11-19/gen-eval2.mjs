// DS tools-eval part 2: the TanStack Table v9 variants (scratch, measured, never shipped).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/ds-c81/tools-eval';
const write = (app, file, body) => {
  const p = path.join(ROOT, app, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body);
};
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>eval</title></head><body><div id="app"></div><script type="module" src="/src/main.ts"></script></body></html>
`;
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

const svTan = `<script lang="ts">
  import {
    createTable, tableFeatures, rowSortingFeature, globalFilteringFeature, rowExpandingFeature,
    FlexRender, type SortingState, type ExpandedState, type Updater,
  } from '@tanstack/svelte-table';
  import { rows as all, spark } from './data';

  const features = tableFeatures({ rowSortingFeature, globalFilteringFeature, rowExpandingFeature });
  const columns = [
    { accessorKey: 'name', header: 'Player' },
    { accessorKey: 'pos', header: 'Pos' },
    { accessorKey: 'ovr', header: 'OVR' },
    { accessorKey: 'gp', header: 'GP' },
    { accessorKey: 'rating', header: 'Rating' },
    { accessorKey: 'yds', header: 'Yards' },
    { accessorKey: 'td', header: 'TD' },
  ];
  let sorting = $state<SortingState>([]);
  let globalFilter = $state('');
  let expanded = $state<ExpandedState>({});
  const table = createTable({
    features,
    columns,
    get data() { return all; },
    state: {
      get sorting() { return sorting; },
      get globalFilter() { return globalFilter; },
      get expanded() { return expanded; },
    },
    onSortingChange: (u: Updater<SortingState>) => { sorting = typeof u === 'function' ? u(sorting) : u; },
    onGlobalFilterChange: (u: Updater<string>) => { globalFilter = typeof u === 'function' ? u(globalFilter) : u; },
    onExpandedChange: (u: Updater<ExpandedState>) => { expanded = typeof u === 'function' ? u(expanded) : u; },
  } as any);
</script>

<main>
  <input value={globalFilter} oninput={(e) => (table as any).setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="filter" />
  <table>
    <thead>
      {#each (table as any).getHeaderGroups() as hg (hg.id)}
        <tr>
          {#each hg.headers as h (h.id)}
            <th onclick={h.column.getToggleSortingHandler()}>
              <FlexRender header={h} />
              {h.column.getIsSorted() === 'asc' ? ' ↑' : h.column.getIsSorted() === 'desc' ? ' ↓' : ''}
            </th>
          {/each}
          <th>Form</th>
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each (table as any).getRowModel().rows as row (row.id)}
        <tr class:open={row.getIsExpanded()} onclick={row.getToggleExpandedHandler()}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <td class="num"><FlexRender cell={cell} /></td>
          {/each}
          <td><svg class="spark" viewBox="0 0 50 18"><path d={spark(row.original.spark)} fill="none" stroke="currentColor" /></svg></td>
        </tr>
        {#if row.getIsExpanded()}
          <tr class="open"><td colspan="8">Season splits · FP {row.original.fp} · INT {row.original.int}</td></tr>
        {/if}
      {/each}
    </tbody>
  </table>
  <p>{(table as any).getRowModel().rows.length} players</p>
</main>
<style>${CSS}</style>
`;

const svTanMain = `import { mount } from 'svelte';
import App from './App.svelte';
mount(App, { target: document.getElementById('app')! });
`;

write('sv-base/tanstack', 'index.html', html);
write('sv-base/tanstack', 'vite.config.js', `import { svelte } from '@sveltejs/vite-plugin-svelte';\nexport default { plugins: [svelte()] };\n`);
write('sv-base/tanstack', 'src/main.ts', svTanMain);
write('sv-base/tanstack', 'src/data.ts', DATA);
write('sv-base/tanstack', 'src/App.svelte', svTan);

const vuTan = `<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  useTable, tableFeatures, rowSortingFeature, globalFilteringFeature, rowExpandingFeature,
  FlexRender, type SortingState, type ExpandedState, type Updater,
} from '@tanstack/vue-table';
import { rows, spark } from './data';

const features = tableFeatures({ rowSortingFeature, globalFilteringFeature, rowExpandingFeature });
const columns = [
  { accessorKey: 'name', header: 'Player' },
  { accessorKey: 'pos', header: 'Pos' },
  { accessorKey: 'ovr', header: 'OVR' },
  { accessorKey: 'gp', header: 'GP' },
  { accessorKey: 'rating', header: 'Rating' },
  { accessorKey: 'yds', header: 'Yards' },
  { accessorKey: 'td', header: 'TD' },
];
const sorting = ref<SortingState>([]);
const globalFilter = ref('');
const expanded = ref<ExpandedState>({});
const state = computed(() => ({ sorting: sorting.value, globalFilter: globalFilter.value, expanded: expanded.value }));
const table = useTable({
  features,
  columns,
  data: rows,
  state,
  onSortingChange: (u: Updater<SortingState>) => { sorting.value = typeof u === 'function' ? u(sorting.value) : u; },
  onGlobalFilterChange: (u: Updater<string>) => { globalFilter.value = typeof u === 'function' ? u(globalFilter.value) : u; },
  onExpandedChange: (u: Updater<ExpandedState>) => { expanded.value = typeof u === 'function' ? u(expanded.value) : u; },
} as any);
</script>

<template>
  <main>
    <input :value="globalFilter" @input="table.setGlobalFilter(($event.target as HTMLInputElement).value)" placeholder="filter" />
    <table>
      <thead>
        <tr v-for="hg in table.getHeaderGroups()" :key="hg.id">
          <th v-for="h in hg.headers" :key="h.id" @click="h.column.getToggleSortingHandler()?.($event)">
            <FlexRender :header="h" />
            {{ h.column.getIsSorted() === 'asc' ? ' ↑' : h.column.getIsSorted() === 'desc' ? ' ↓' : '' }}
          </th>
          <th>Form</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in table.getRowModel().rows" :key="row.id">
          <tr :class="{ open: row.getIsExpanded() }" @click="row.getToggleExpandedHandler()">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="num"><FlexRender :cell="cell" /></td>
            <td><svg class="spark" viewBox="0 0 50 18"><path :d="spark(row.original.spark)" fill="none" stroke="currentColor" /></svg></td>
          </tr>
          <tr v-if="row.getIsExpanded()" class="open"><td colspan="8">Season splits · FP {{ row.original.fp }} · INT {{ row.original.int }}</td></tr>
        </template>
      </tbody>
    </table>
    <p>{{ table.getRowModel().rows.length }} players</p>
  </main>
</template>
<style>${CSS}</style>
`;

write('vu-base/tanstack', 'index.html', html);
write('vu-base/tanstack', 'vite.config.js', `import vue from '@vitejs/plugin-vue';\nexport default { plugins: [vue()] };\n`);
write('vu-base/tanstack', 'src/main.ts', `import { createApp } from 'vue';\nimport App from './App.vue';\ncreateApp(App).mount('#app');\n`);
write('vu-base/tanstack', 'src/data.ts', DATA);
write('vu-base/tanstack', 'src/App.vue', vuTan);

console.log('wrote the TanStack variants');
