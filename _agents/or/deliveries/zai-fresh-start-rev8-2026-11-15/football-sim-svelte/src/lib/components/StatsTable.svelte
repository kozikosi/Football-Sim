<script lang="ts">
  // StatsTable.svelte — slice (b): the tabular stats screen on @tanstack/svelte-table (the house
  // rule: "stats tables → primitive; the board → hand-rolled"). Rows are the engine's own boardVM
  // rows via the bridge — the table renders, never re-derives. Headers sort; OVR carries the
  // data-testid="stats-sort-ovr" contract hook.
  import { createTable, createSortedRowModel, createColumnHelper, tableFeatures, rowSortingFeature, coreFeatures, columnVisibilityFeature } from '@tanstack/svelte-table';
  import type { ColumnDef } from '@tanstack/table-core';
  import { app } from '../state/appStore.svelte.ts';

  type Row = { id: string; name: string; pos: string; nflTeam: string; ovr: string; wins: string; priority: string };

  // v9: features are OPT-IN and carry the row-model + meta slots (per tableFeatures docs). Sorting
  // is the one feature this slice uses; columnMeta is declared per-table (no module augmentation).
  const features = tableFeatures({
    ...coreFeatures,
    columnVisibilityFeature,
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),
    columnMeta: {} as { testid?: string },
  });
  const helper = createColumnHelper<typeof features, Row>();
  const cols = [
    helper.accessor('name', { header: 'PLAYER' }),
    helper.accessor('pos', { header: 'POS' }),
    helper.accessor('nflTeam', { header: 'TEAM' }),
    helper.accessor('ovr', { header: 'OVR', meta: { testid: 'stats-sort-ovr' } }),
    helper.accessor('wins', { header: 'WINS' }),
    helper.accessor('priority', { header: 'PRIORITY' }),
  ];

  // DISCLOSED CAST (ecosystem finding, E1 slice b): @tanstack/svelte-table 9.3.2's helper-built
  // accessor columns (AccessorKeyColumnDef<F, Row, string>[]) are not assignable to createTable's
  // `readonly ColumnDef<F, Row, unknown>[]` (accessorFn contravariance). The Vue adapter takes the
  // same columns with no cast. Counted as a forced workaround.
  const table = createTable({
    features,
    columns: cols as unknown as readonly ColumnDef<typeof features, Row, unknown>[],
    get data() { return app.board.rows as Row[]; },
    // v9: row models live in the FEATURES object (sortedRowModel: createSortedRowModel() above);
    // options carry no getSortedRowModel. Rendering reads table.getSortedRowModel().rows —
    // getRowModel() is the final feature model, which without pagination is the core (unsorted) one.
    initialState: { sorting: [{ id: 'wins', desc: true }] },
  });
</script>

<section>
  <div class="cards-head">
    <h2 style="margin: 0">LEAGUE STATS</h2>
    <span class="cards-count">TAP OVR TO RE-SORT</span>
  </div>
  <div class="stats-wrap"><table class="stats-table" data-testid="stats-table">
    <thead>
      {#each table.getHeaderGroups() as hg (hg.id)}
        <tr>
          {#each hg.headers as h (h.id)}
            <th
              data-testid={h.column.columnDef.meta?.testid ?? 'stats-sort-' + h.id}
              onclick={() => table.setSorting([{ id: h.column.id, desc: ['ovr', 'wins', 'priority'].includes(h.column.id) }])}
            >{h.column.columnDef.header}{#if h.column.getIsSorted() === 'asc'} ▲{:else if h.column.getIsSorted() === 'desc'} ▼{/if}</th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each table.getSortedRowModel().rows as row, i (row.id)}
        <tr data-testid={'stats-row-' + i}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <td class={cell.column.id === 'ovr' || cell.column.id === 'wins' || cell.column.id === 'priority' ? 'num' : ''}>{String(cell.getValue() ?? '')}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table></div>
</section>
