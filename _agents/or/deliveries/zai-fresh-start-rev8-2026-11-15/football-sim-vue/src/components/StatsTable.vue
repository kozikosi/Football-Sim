<script setup lang="ts">
// StatsTable.vue — slice (b): the tabular stats screen on @tanstack/vue-table (the house rule:
// "stats tables → primitive; the board → hand-rolled"). Rows are the engine's own boardVM rows via
// the Pinia store — the table renders, never re-derives. OVR header carries the contract hook.
import { computed, ref } from 'vue';
import {
  createColumnHelper,
  createCoreRowModel,
  createSortedRowModel,
  FlexRender,
  tableFeatures,
  coreFeatures,
  columnVisibilityFeature,
  rowSortingFeature,
} from '@tanstack/vue-table';
import { useTable } from '@tanstack/vue-table';
import type { ColumnDef } from '@tanstack/table-core';
import { useAppStore } from '../stores/appStore';

interface Row { id: string; name: string; pos: string; nflTeam: string; ovr: string; wins: string; priority: string }

const app = useAppStore();
// v9 (the API the Svelte arm already mapped — the features object carries row models + meta):
const features = tableFeatures({
  ...coreFeatures,
  columnVisibilityFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
});
const helper = createColumnHelper<typeof features, Row>();
const cols = [
  helper.accessor('name', { header: 'PLAYER' }),
  helper.accessor('pos', { header: 'POS' }),
  helper.accessor('nflTeam', { header: 'TEAM' }),
  helper.accessor('ovr', { header: 'OVR' }),
  helper.accessor('wins', { header: 'WINS' }),
  helper.accessor('priority', { header: 'PRIORITY' }),
];

const sorting = ref([{ id: 'wins', desc: true }] as const);
const table = useTable({
  features,
  // v9.3.2 typing wrinkle (same cast the svelte adapter needed — a table-core variance issue, not
  // an adapter one; recorded in the slice-b receipt)
  columns: cols as unknown as readonly ColumnDef<typeof features, Row, unknown>[],
  get data() { return app.board.rows as Row[]; },
  initialState: { sorting: [{ id: 'wins', desc: true }] },
});
const rows = computed(() => table.getSortedRowModel().rows);

function tapSort(id: string): void {
  table.setSorting([{ id, desc: ['ovr', 'wins', 'priority'].includes(id) }]);
}
const testidOf = (id: string): string => (id === 'ovr' ? 'stats-sort-ovr' : 'stats-sort-' + id);
const isNum = (id: string): boolean => ['ovr', 'wins', 'priority'].includes(id);
const cellText = (cell: { getValue: () => unknown }): string => String(cell.getValue() ?? '');
</script>

<template>
  <section>
    <div class="cards-head">
      <h2 style="margin: 0">LEAGUE STATS</h2>
      <span class="cards-count">TAP OVR TO RE-SORT</span>
    </div>
    <div class="stats-wrap">
      <table class="stats-table" data-testid="stats-table">
        <thead>
          <tr v-for="hg in table.getHeaderGroups()" :key="hg.id">
            <th
              v-for="h in hg.headers" :key="h.id"
              :data-testid="testidOf(h.column.id)"
              @click="tapSort(h.column.id)"
            >
              <FlexRender v-if="!h.isPlaceholder" :render="h.column.columnDef.header" :props="h.getContext()" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="row.id" :data-testid="'stats-row-' + i">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" :class="{ num: isNum(cell.column.id) }">{{ cellText(cell) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
