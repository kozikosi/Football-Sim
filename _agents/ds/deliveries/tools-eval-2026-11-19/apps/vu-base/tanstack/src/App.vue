<script setup lang="ts">
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
<style>table{border-collapse:collapse;width:100%}th,td{padding:4px 8px;text-align:right;border-bottom:1px solid #333}th:first-child,td:first-child{text-align:left}th{position:sticky;top:0;background:#1b1417}button{background:none;border:0;color:inherit;font:inherit;cursor:pointer}tr.open td{background:#241a1e}.spark{width:60px;height:18px}.num{font-variant-numeric:tabular-nums}</style>
