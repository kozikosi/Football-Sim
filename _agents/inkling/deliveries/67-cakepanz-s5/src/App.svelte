<!-- 67 Cakepanz · slices 1-4 — Draft Board · Team Select · Hydration (saves) · the drive-level feed.
     Faithful rebuild of the w85+ shell's screens; the w88 feed look (badge format + colors) is the target. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import DATASET_RATINGS from './data/madden27-ratings.csv?raw';
  import DATASET_FA from './data/free-agents-old-ratings.csv?raw';
  import DATASET_IDS from './data/player-ids.csv?raw';
  import { buildPool } from './engine/sports/nfl/engine/players.ts';
  import type { Player } from './engine/sports/nfl/engine/players.ts';
  import { makeRng } from './engine/core/rng.ts';
  import { sha256Hex } from './engine/core/hash.ts';
  import { makeDraftStore, asReadable } from './lib/draftStore.ts';
  import { valuation, MODE_LABEL } from './lib/valuation.ts';
  import { goneOdds } from './engine/sports/nfl/engine/goneodds.ts';
  import { boardVM } from './engine/sports/nfl/view/draftBoard.ts';
  import type { BoardVM, BoardSort } from './engine/sports/nfl/view/draftBoard.ts';
  import { openSlots as openSlotsOf } from './engine/sports/nfl/engine/draft.ts';
  import type { SlotId } from './engine/sports/nfl/engine/slots.ts';
  import DraftBoard from './lib/components/DraftBoard.svelte';
  import ModeSwitch from './lib/components/ModeSwitch.svelte';
  import LineupAdvice from './lib/components/LineupAdvice.svelte';
  import Saves from './lib/components/Saves.svelte';
  import TeamSelect from './lib/screens/TeamSelect.svelte';
  import Feed from './lib/screens/Feed.svelte';
  import Share from './lib/screens/Share.svelte';
  import { feedVM } from './lib/feedVM.ts';
  import type { FeedVM } from './lib/feedVM.ts';
  import { gameShare, saveShare } from './lib/shareVM.ts';
  import type { ShareVM } from './lib/shareVM.ts';
  import { readEnvelope } from './lib/savesApp.ts';
  import { lineupFor } from './engine/sports/nfl/engine/lineup.ts';

  type Boot = { phase: 'loading' } | { phase: 'empty' } | { phase: 'ready'; players: Player[] };
  type Screen = 'team' | 'board' | 'saves' | 'feed' | 'share';   // slice 2: team · 3: saves · 4: feed · 5: share

  const ENGINE_PIN = '67-cakepanz@4ca9a071';           // the informational engineVersion stamp (the pin, named)

  const boot = writable<Boot>({ phase: 'loading' });
  let store = makeDraftStore([] as Player[]);
  let draftState = asReadable(store);
  let sort: BoardSort = 'wins';
  const vmStore = writable<BoardVM | null>(null);
  const advice = writable<{ label: string; name: string; ovr: string }[]>([]);
  const oddsMeta = writable<{ picksBetween: number; sims: number } | null>(null);
  const openNow = writable<SlotId[]>([]);            // the real open slots (recomputed every refresh)
  const needsSel = writable<SlotId[]>([]);           // the user's filter selection (ephemeral UI state)
  let userTeam = 0;
  let seed = 777;
  let screen = $state<Screen>('team');   // the draft flow starts at Team Select; the board follows the choice
  let error = $state('');
  let feed = $state<FeedVM | null>(null);
  let share = $state<ShareVM | null>(null);            // slice 5: the brag card + the seed card (static artifacts)
  let shareReturn = $state<Screen>('board');           // where the share screen's ✕ goes back to
  let dataVersion = $state('sha256:pending');          // the dataset sha, computed once at boot (async, outside reducers)
  let draftSaveId = $state('');                        // minted at START (and at LOAD of an existing draft)
  let draftCreatedAt = $state('');

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
    screen = 'team';   // the dev build opens at Team Select — the draft starts from the user's choice
    void sha256Hex(ratings).then((h) => (dataVersion = 'sha256:' + h));   // informational stamp for the envelope
  }

  function startDraft(teamIndex: number) {
    seed = 1000 + Math.floor(Math.random() * 9000);
    userTeam = teamIndex;
    screen = 'board';
    draftSaveId = (crypto?.randomUUID?.() ?? 'save-' + seed + '-' + Date.now());
    draftCreatedAt = new Date().toISOString();
    store.dispatch({ type: 'START', seed, userTeam });
    valuation.lock(); // the mode switch is disabled mid-draft
    refresh();
  }

  function refresh() {
    const st = store.getState();
    if (st.error) error = st.error;
    if (!st.draft || st.status === 'idle') { vmStore.set(null); oddsMeta.set(null); openNow.set([]); return; }
    openNow.set(openSlotsOf(st.draft.rosters[userTeam]) as SlotId[]);   // the needs row rides the real roster
    // The SNAPSHOT's board view model (src/engine/…/view/draftBoard.ts, pinned 4ca9a071) — no stand-in.
    // goneOdds only answers when it is the user's own pick; while the CPU is on the clock the last
    // board stays up and this refresh recomputes the moment the user is back on the clock.
    try {
      const odds = goneOdds(st.draft, userTeam, makeRng(seed * 7 + 13), 30);
      oddsMeta.set({ picksBetween: odds.picksBetween, sims: odds.sims });   // the tooltip's method meta
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

  function toggleNeed(slot: SlotId) {
    needsSel.update((cur) => (cur.includes(slot) ? cur.filter((x) => x !== slot) : [...cur, slot]));
  }
  function clearNeeds() { needsSel.set([]); }

  // slice 3: the saves panel — the store's record + the envelope meta the app stamps
  const recordNow = (): Record<string, unknown> | null => (store.getState().record as unknown as Record<string, unknown> | null);
  const metaNow = () => ({
    engineVersion: ENGINE_PIN,
    dataVersion,
    saveId: draftSaveId || (draftSaveId = (crypto?.randomUUID?.() ?? 'save-' + seed)),
    saveRevision: 1 + (store.getState().record?.picks.length ?? 0),   // +1 per committed transition
    createdAt: draftCreatedAt || (draftCreatedAt = new Date().toISOString()),
  });

  function loadDraft(record: unknown, lineage?: { saveId?: string; createdAt?: string }) {
    const rec = record as { seed: number; userTeam: number } | null;
    if (!rec) { error = 'load: empty record'; return; }
    seed = rec.seed; userTeam = rec.userTeam;
    // the lineage keeps its identity across loads: reuse the slot's saveId/createdAt when the panel passed them
    draftSaveId = lineage?.saveId || (crypto?.randomUUID?.() ?? 'save-' + rec.seed);
    draftCreatedAt = lineage?.createdAt || new Date().toISOString();
    store.dispatch({ type: 'LOAD', record } as any);
    valuation.lock();                                                  // a loaded draft is mid-draft: locked
    screen = 'board';
    refresh();
  }

  // slice 4: the week-1 feed, played by the engine from the finished draft
  function playWeek() {
    const rec = store.getState().record;
    if (!rec || store.getState().status !== 'done') { error = 'the week-1 feed needs a finished draft'; return; }
    try {
      feed = feedVM(rec, seed, userTeam);
      screen = 'feed';
    } catch (e) { error = (e as Error).message; }
  }

  // slice 5: the brag shareable + the seed card — static artifacts, engine-true
  function shareGame() {
    const rec = store.getState().record;
    if (!rec || !feed) { error = 'the brag card needs a played game'; return; }
    try {
      share = gameShare(rec, seed, userTeam, ENGINE_PIN, dataVersion);
      shareReturn = 'feed';
      screen = 'share';
    } catch (e) { error = (e as Error).message; }
  }

  async function shareSave(slot: 'A' | 'B' | 'C') {
    const r = await readEnvelope(slot);                // the ONE parser (restore) — corrupt-never-repair
    if (!r.ok) { error = 'the brag card needs a real save: ' + r.message; return; }
    try {
      share = saveShare(r.env);
      shareReturn = 'saves';
      screen = 'share';
    } catch (e) { error = (e as Error).message; }
  }

  $effect(() => { void draftState; });

  onMount(() => {
    valuation.subscribe(() => refresh());
    boot_();
  });
</script>

<main class="cp-root">
  <header class="cp-topbar">
    <span class="cp-brand">76 P<strong class="cp-shine">a</strong>ncakes</span>
    <span class="cp-track" title="the builders' track name">67 Cakepanz · slices 1-5</span>
    <span class="cp-topbtns">
      {#if $boot.phase === 'ready'}
        <button class="cp-topbar-btn" onclick={() => (screen = screen === 'saves' ? 'board' : 'saves')} aria-pressed={screen === 'saves'}>Saves</button>
      {/if}
    </span>
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
  {:else if screen === 'saves'}
    <Saves record={recordNow()} meta={metaNow()} userTeamIndex={userTeam} onclose={() => (screen = 'board')} onloaddraft={loadDraft} onsharebrag={shareSave} />
  {:else if screen === 'feed' && feed}
    <Feed {feed} onclose={() => { screen = 'board'; feed = null; }} onshare={shareGame} />
  {:else if screen === 'share' && share}
    <Share vm={share.vm} seed={share.seed} note={share.note} onclose={() => { screen = shareReturn; share = null; }} />
  {:else if $vmStore}
    {#if error}<p class="cp-error">{error}</p>{/if}
    <p class="cp-prov">Every number on this board reads <b>{MODE_LABEL[valuation.get().mode]}</b> — the label travels with the numbers.</p>
    <DraftBoard
      vm={$vmStore}
      onpick={pick}
      onundo={undo}
      onsort={setSort}
      canUndo={($draftState?.record?.picks?.length ?? 0) > 0}
      openSlots={$openNow}
      oddsMeta={$oddsMeta}
      needsSelected={$needsSel}
      onneedtoggle={toggleNeed}
      onneedclear={clearNeeds}
      onplay={playWeek}
      draftDone={$draftState?.status === 'done'}
    />
    <LineupAdvice slots={$advice} />
  {/if}
</main>

<style>
  :root {
    color-scheme: dark;
    /* the feed's tokens (the w88 anatomy rides the same inks the board uses) */
    --cp-gold: #d9a94c;
    --cp-good: #72c18e;
    --cp-bad: #e08573;
    --cp-sub: #c8a48f;
    --cp-text: #f5e9dd;
    --cp-glass: rgba(245, 233, 221, 0.04);
    --cp-glassbd: #3a2c31;
  }
  .cp-root { max-width: 980px; margin: 0 auto; padding: 18px 16px 60px; font-family: Georgia, 'Times New Roman', serif; color: #f5e9dd; background: #181114; min-height: 100vh; }
  .cp-topbar { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
  .cp-brand { font-size: 1.4rem; font-weight: 800; letter-spacing: 0.08em; color: #e8c87e; }
  .cp-shine { color: #d9a94c; }
  .cp-track { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #c8a48f; }
  .cp-topbtns { margin-left: auto; display: flex; gap: 8px; }
  .cp-topbar-btn { border: 1px solid #8a5f18; background: transparent; color: #e8c87e; border-radius: 999px; padding: 5px 14px; cursor: pointer; font-family: inherit; font-size: 0.8rem; font-weight: 700; }
  .cp-topbar-btn:hover { background: rgba(217, 169, 76, 0.12); }
  .cp-note { color: #c8a48f; font-size: 0.9rem; }
  .cp-prov { font-size: 0.78rem; color: #c8a48f; letter-spacing: 0.04em; margin: 0 0 10px; }
  .cp-prov b { color: #e8c87e; }
  .cp-empty { border: 1px solid #3a2c31; border-radius: 12px; padding: 22px; background: #221820; }
  .cp-empty h1 { margin-top: 0; color: #e8c87e; letter-spacing: 0.1em; }
  .cp-devlink { color: #d9a94c; }
  .cp-error { color: #ff8d7e; font-size: 0.85rem; }
</style>
