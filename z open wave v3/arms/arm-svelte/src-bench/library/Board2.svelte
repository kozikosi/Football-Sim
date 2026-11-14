<script lang="ts">
// BENCH-2 Phase D — the Board2 (library test), SVELTE ARM: @tanstack/svelte-virtual is the library
// under test; persistence + debounce are hand-rolled here (the honest no-handicap assembly Ernie §4
// describes — TanStack has no storage/debounce composables, so they are ~30 lines of plain code).
// Rows come from the FROZEN POOL (draft.pool — boardVM is need-filtered, not the pool). The pool's
// four sorts are ovr/spd/str/name.
import { onMount, tick } from 'svelte';
import { createVirtualizer } from '@tanstack/svelte-virtual';
import type { SvelteVirtualizer } from '@tanstack/svelte-virtual';
import { store } from '../shared/boot';
import paletteRaw from './team-palette.json';

const palette = paletteRaw as Record<string, string>;
const USER_TEAM = 'Denver Broncos';          // userTeam 0 — the .ub blue
const SORTS = ['ovr', 'spd', 'str', 'name'] as const;
type Sort = (typeof SORTS)[number];
type PoolPlayer = { id: string; name: string; pos: string; team: string; ovr: number; spd: number; str: number; freeAgent: boolean };

// the engine's own vocabularies, computed once
const pool: PoolPlayer[] = (store.getState().draft?.pool ?? []) as unknown as PoolPlayer[];
const posList = [...new Set(pool.map((r) => r.pos))].sort();
const teamList = [...new Set(pool.map((r) => r.team))].sort();

// hand-rolled persistence (the Svelte arm's honest counterpart to useStorage)
type B2State = { sort: Sort; pos: string; team: string; q: string; topId: string; scrollTop: number };
const KEY = 'sim:bench2:board2v2';
function loadState(): B2State {
  const fallback: B2State = { sort: 'ovr', pos: 'ALL', team: 'ALL', q: '', topId: '', scrollTop: 0 };
  // v2 key: the old Board2 wrote a different state shape — never read foreign shapes
  try { const raw = localStorage.getItem(KEY); return raw ? { ...fallback, ...JSON.parse(raw) } : fallback; } catch { return fallback; }
}
function saveState(s: B2State) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* quota */ } }
let b2 = $state.raw<B2State>(loadState());
function setState(patch: Partial<B2State>) { b2 = { ...b2, ...patch }; saveState(b2); }

// hand-rolled stars + debounce
type Stars = Record<string, 1>;
function loadStars(): Stars { try { return JSON.parse(localStorage.getItem('sim:bench2:stars') ?? '{}'); } catch { return {}; } }
let stars = $state.raw<Stars>(loadStars());
function star(id: string) { const next = { ...stars }; if (next[id]) delete next[id]; else next[id] = 1; stars = next; try { localStorage.setItem('sim:bench2:stars', JSON.stringify(next)); } catch { /* quota */ } }
let qRaw = $state('');
let qD = $state('');
let qTimer: ReturnType<typeof setTimeout> | undefined;
function onSearch(e: Event) {
  qRaw = (e.target as HTMLInputElement).value;
  clearTimeout(qTimer);
  qTimer = setTimeout(() => { qD = qRaw; }, 250);
}

function sortPool(rows: PoolPlayer[], sort: Sort): PoolPlayer[] {
  const sorted = [...rows];
  if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
  else sorted.sort((a, b) => b[sort] - a[sort] || (a.id < b.id ? -1 : 1));
  return sorted;
}
const rows = $derived.by<PoolPlayer[]>(() => {
  let r = sortPool(pool, b2.sort);
  if (b2.pos !== 'ALL') r = r.filter((x) => x.pos === b2.pos);
  if (b2.team !== 'ALL') r = r.filter((x) => x.team === b2.team);
  const needle = qD.trim().toLowerCase();
  if (needle) r = r.filter((x) => x.name.toLowerCase().includes(needle));
  return r;
});

// virtualization (TanStack): a headless virtualizer over the scroll container
let viewport: HTMLDivElement | undefined = $state();
const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
  count: rows.length,
  getScrollElement: () => viewport ?? null,
  estimateSize: () => 44,
  overscan: 8,
});
// createVirtualizer returns a Readable store: runes auto-unwrap it with the $ prefix for reads.
// The count-sync below must NOT read the store inside $effect (that would loop: setOptions emits →
// effect re-runs → setOptions … → effect_update_depth_exceeded). A plain subscribe handle is used.
let v: SvelteVirtualizer<HTMLDivElement, HTMLDivElement> | undefined;
virtualizer.subscribe((x) => { v = x; });
const items = $derived($virtualizer.getVirtualItems().filter((it) => it.index < rows.length));
const totalSize = $derived($virtualizer.getTotalSize());
$effect(() => { if (v) { v.setOptions({ count: rows.length }); v.measure(); } });

function onScroll() {
  const first = items[0];
  if (first) setState({ topId: rows[first.index]?.id ?? '' });
  if (viewport) setState({ scrollTop: Math.round(viewport.scrollTop) });
}
onMount(async () => {
  await tick();
  if (b2.scrollTop) requestAnimationFrame(() => { if (viewport) viewport.scrollTop = b2.scrollTop; });
});
const teamColor = (t: string) => palette[t] ?? '#c9a24b';
</script>

<div class="b2-root">
  <div class="b2-head">
    <div class="b2-title">The Board — full pool</div>
    <div class="b2-sub">svelte arm · @tanstack/svelte-virtual · <span class="b2-ub">{USER_TEAM}</span></div>
    <div class="b2-count" data-testid="b2-count">{rows.length.toLocaleString()} of {pool.length.toLocaleString()} players</div>
  </div>
  <div class="b2-controls" data-testid="b2-controls">
    {#each SORTS as s (s)}
      <button class:on={b2.sort === s} data-testid={`b2-sort-${s}`} onclick={() => setState({ sort: s })}>{s}</button>
    {/each}
    <select data-testid="b2-pos" value={b2.pos} onchange={(e) => setState({ pos: (e.target as HTMLSelectElement).value })}>
      <option value="ALL">All positions</option>
      {#each posList as p (p)}<option value={p}>{p}</option>{/each}
    </select>
    <select data-testid="b2-team" value={b2.team} onchange={(e) => setState({ team: (e.target as HTMLSelectElement).value })}>
      <option value="ALL">All teams</option>
      {#each teamList as t (t)}<option value={t}>{t}</option>{/each}
    </select>
    <input data-testid="b2-search" type="search" placeholder="search name…" value={qRaw} oninput={onSearch} />
  </div>
  <div class="b2-viewport" data-testid="b2-viewport" bind:this={viewport} onscroll={onScroll}>
    <div style="height:{totalSize}px; position:relative;">
      {#each items as vRow (vRow.key)}
        {@const data = rows[vRow.index]}
        <div style="position:absolute; top:0; left:0; width:100%; height:{vRow.size}px; transform:translateY({vRow.start}px); --tc:{teamColor(data.team)};"
          data-testid="row-{data.id}" data-index={vRow.index}
          class="b2-row" class:shimmer={data.ovr >= 90}>
          <button class="b2-star" class:on={stars[data.id]} data-testid={`b2-star-${data.id}`} onclick={() => star(data.id)}>★</button>
          <span class="b2-name">{data.name}</span>
          <span class="b2-team" class:b2-ub={data.team === USER_TEAM}>{data.team}</span>
          <span class="b2-bub">{data.pos}{data.ovr}</span>
          <span class="b2-ovrcell">{data.ovr}</span>
        </div>
      {/each}
    </div>
  </div>
</div>
