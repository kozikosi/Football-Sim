<script lang="ts">
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
<style>table{border-collapse:collapse;width:100%}th,td{padding:4px 8px;text-align:right;border-bottom:1px solid #333}th:first-child,td:first-child{text-align:left}th{position:sticky;top:0;background:#1b1417}button{background:none;border:0;color:inherit;font:inherit;cursor:pointer}tr.open td{background:#241a1e}.spark{width:60px;height:18px}.num{font-variant-numeric:tabular-nums}</style>
