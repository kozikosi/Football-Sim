<!-- 67 Cakepanz · slice 1 — the Draft Board screen. Faithful rebuild of the w85 shell's draft board, not a redesign. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import DATASET_RATINGS from './data/madden27-ratings.csv?raw';
  import DATASET_FA from './data/free-agents-old-ratings.csv?raw';
  import DATASET_IDS from './data/player-ids.csv?raw';
  import { buildPool } from './engine/sports/nfl/engine/players.ts';
  import type { Player } from './engine/sports/nfl/engine/players.ts';
  import { makeRng } from './engine/core/rng.ts';
  import { makeDraftStore, asReadable } from './lib/draftStore.ts';
  import { valuation, MODE_LABEL } from './lib/valuation.ts';
  import { goneOdds } from './engine/sports/nfl/engine/goneodds.ts';
  import { makeRng as mkRng } from './engine/core/rng.ts';
  import { boardVM } from './engine/sports/nfl/view/draftBoard.ts';
  import type { BoardVM, BoardSort } from './engine/sports/nfl/view/draftBoard.ts';
  import DraftBoard from './lib/components/DraftBoard.svelte';
  import ModeSwitch from './lib/components/ModeSwitch.svelte';
  import LineupAdvice from './lib/components/LineupAdvice.svelte';
  import TeamSelect from './lib/screens/TeamSelect.svelte';
  import { lineupFor } from './engine/sports/nfl/engine/lineup.ts';

  type Boot = { phase: 'loading' } | { phase: 'empty' } | { phase: 'ready'; players: Player[] };
  type Screen = 'team' | 'board';   // slice 2: the draft flow starts at Team Select, then the board

  const boot = writable<Boot>({ phase: 'loading' });
  let store = makeDraftStore([] as Player[]);
  let draftState = asReadable(store);
  let sort: BoardSort = 'wins';
  const vmStore = writable<BoardVM | null>(null);
  const advice = writable<{ label: string; name: string; ovr: string }[]>([]);
  let userTeam = 0;
  let seed = 777;
  let screen = $state<Screen>('team');   // slice 2: Team Select leads; the board follows the choice
  let error = $state('');

  // dev dataset: the engine's own bundled ratings, DEV-BUILD ONLY (the F11 ruling: the public
  // default is the empty state + import; a dev build may ship rows as a build input, labelled).
  const DEV = new URLSearchParams(location.search).has('dev');

  function boot_() {
    if (!DEV) { boot.set({ phase: 'empty' }); return; }
    const ratings = DATASET_RATINGS, fa = DATASET_FA, ids = DATASET_IDS;
    const players = buildPool(ratings, fa, ids);
    store = makeDraftStore(players);
    draftState = asReadable(store);
    boot.set({ phase: 'ready', players });
    (window as any).__cp = { store, refresh, valuation };
    screen = 'team';   // slice 2: the dev build opens at Team Select — the draft starts from the user's choice
  }

  function startDraft(teamIndex: number) {
    seed = 1000 + Math.floor(Math.random() * 9000);
    userTeam = teamIndex;
    screen = 'board';
    store.dispatch({ type: 'START', seed, userTeam });
    valuation.lock(); // the mode switch is disabled mid-draft
    refresh();
  }

  function refresh() {
    const st = store.getState();
    if (st.error) error = st.error;
    if (!st.draft || st.status === 'idle') { vmStore.set(null); return; }
    // The SNAPSHOT's board view model (src/engine/…/view/draftBoard.ts, pinned 4ca9a071) — no stand-in.
    // goneOdds only answers when it is the user's own pick; while the CPU is on the clock the last
    // board stays up and this refresh recomputes the moment the user is back on the clock.
    try {
      const odds = goneOdds(st.draft, userTeam, makeRng(seed * 7 + 13), 30);
      vmStore.set(boardVM(st.draft, userTeam, odds, { sort }));
    } catch { /* CPU pick in flight — the board refreshes on the user's turn */ }
    try {
      const mine = Object.values(st.draft.rosters[userTeam]).filter(Boolean) as any[];
      const best = lineupFor(mine, '4-3');
      advice.set((best.placements as any[]).map((pl) => ({ label: pl.slot?.label ?? pl.slot?.slot ?? '?', name: pl.player?.name ?? '(empty)', ovr: pl.player ? String(pl.effOvr ?? pl.player.ovr) : '-' })));
    } catch { advice.set([]); }
  }

  function pick(playerId: string, slot: string) {
    store.dispatch({ type: 'PICK', playerId, slot } as any);
    refresh();
  }

  function undo() { store.dispatch({ type: 'UNDO' }); refresh(); }

  function setSort(s: BoardSort) { sort = s; refresh(); }

  $effect(() => { void draftState; });

  onMount(() => {
    valuation.subscribe(() => refresh());
    boot_();
  });
</script>

<main class="cp-root">
  <header class="cp-topbar">
    <span class="cp-brand">76 P<strong class="cp-shine">a</strong>ncakes</span>
    <span class="cp-track" title="the builders' track name">67 Cakepanz · slice 1</span>
    <ModeSwitch />
  </header>

  {#if $boot.phase === 'loading'}
    <p class="cp-note">Loading…</p>
  {:else if $boot.phase === 'empty'}
    <section class="cp-empty">
      <h1>76 Pancakes</h1>
      <p>No player dataset yet. The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent).</p>
      <p class="cp-note">Import a dataset CSV to begin — or open a dev build with <code>?dev=1</code> (the engine's own bundled ratings, labelled DEV).</p>
      <p><a class="cp-devlink" href="?dev=1">Open the dev build →</a></p>
    </section>
  {:else if $boot.phase === 'ready' && screen === 'team'}
    <TeamSelect onstart={startDraft} />
  {:else if $vmStore}
    {#if error}<p class="cp-error">{error}</p>{/if}
    <p class="cp-prov">Every number on this board reads <b>{MODE_LABEL[valuation.get().mode]}</b> — the label travels with the numbers.</p>
    <DraftBoard vm={$vmStore} onpick={pick} onundo={undo} onsort={setSort} canUndo={($draftState?.record?.picks?.length ?? 0) > 0} />
    <LineupAdvice slots={$advice} />
  {/if}
</main>

<style>
  :root { color-scheme: dark; }
  .cp-root { max-width: 980px; margin: 0 auto; padding: 18px 16px 60px; font-family: Georgia, 'Times New Roman', serif; color: #f5e9dd; background: #181114; min-height: 100vh; }
  .cp-topbar { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
  .cp-brand { font-size: 1.4rem; font-weight: 800; letter-spacing: 0.08em; color: #e8c87e; }
  .cp-shine { color: #d9a94c; }
  .cp-track { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #c8a48f; }
  .cp-note { color: #c8a48f; font-size: 0.9rem; }
  .cp-prov { font-size: 0.78rem; color: #c8a48f; letter-spacing: 0.04em; margin: 0 0 10px; }
  .cp-prov b { color: #e8c87e; }
  .cp-empty { border: 1px solid #3a2c31; border-radius: 12px; padding: 22px; background: #221820; }
  .cp-empty h1 { margin-top: 0; color: #e8c87e; letter-spacing: 0.1em; }
  .cp-devlink { color: #d9a94c; }
  .cp-error { color: #ff8d7e; font-size: 0.85rem; }
</style>
