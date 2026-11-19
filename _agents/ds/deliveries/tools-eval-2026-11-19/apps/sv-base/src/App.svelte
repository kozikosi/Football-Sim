<script lang="ts">
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
<style>table{border-collapse:collapse;width:100%}th,td{padding:4px 8px;text-align:right;border-bottom:1px solid #333}th:first-child,td:first-child{text-align:left}th{position:sticky;top:0;background:#1b1417}button{background:none;border:0;color:inherit;font:inherit;cursor:pointer}tr.open td{background:#241a1e}.spark{width:60px;height:18px}.num{font-variant-numeric:tabular-nums}</style>
