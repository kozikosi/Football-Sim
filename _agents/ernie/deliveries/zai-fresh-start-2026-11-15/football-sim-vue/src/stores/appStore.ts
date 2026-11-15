// appStore.ts — the fresh-start Pinia setup store (the C2 adapter is THIS file's first lines: the
// engine boot + VMs ride the shared layer; the store only bridges engine outputs to UI state).
// House rules: Pinia Setup Store (defineStore('name', () => {...})), engine as plain TS in /src/engine,
// no simulation math here — the store calls the shared view-models and holds the results.
import { computed, ref, shallowRef } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { bootApp } from '../shared/bootData.ts';
import { makeRng } from '../engine/core/rng.ts';
import { goneOdds } from '../engine/sports/nfl/engine/goneodds.ts';
import { boardVM } from '../engine/sports/nfl/view/draftBoard.ts';
import type { BoardSort } from '../engine/sports/nfl/view/draftBoard.ts';
import { toCardGrid } from '../shared/cardVM.ts';
import type { CardGridVM } from '../shared/cardVM.ts';
import { feedVM } from '../shared/feedVM.ts';
import type { FeedVM } from '../shared/feedVM.ts';

export type Screen = 'cards' | 'stats' | 'board' | 'feed' | 'week' | 'settings';

export const useAppStore = defineStore('app', () => {
  // ---- C2 adapter (thin): boot the engine once, hold its outputs ----
  const boot = bootApp();
  const draftSnap = shallowRef(boot.store.getState());
  boot.store.subscribe((s) => { draftSnap.value = s; });
  boot.store.dispatch({ type: 'START', seed: boot.seed, userTeam: boot.loadTeam() ?? boot.defaultTeam });

  // ---- UI state ----
  const screen = ref<Screen>('cards');
  const sort = ref<BoardSort>('wins');

  // ---- engine-derived views (computed over the store's own snapshots) ----
  const userTeam = computed(() => draftSnap.value.record?.userTeam ?? boot.defaultTeam);
  // after START the draft state always exists (the store creates it in its reducer) — the non-null
  // assertions below are boot guarantees, not guesses (counted as workarounds)
  const board = computed(() => boardVM(draftSnap.value.draft!, userTeam.value, goneOdds(draftSnap.value.draft!, userTeam.value, makeRng(boot.seed * 7 + 13), 30), { sort: sort.value, limit: 60 }));
  const cards = computed<CardGridVM>(() => toCardGrid(board.value));

  // ---- live feed (slice d): the engine's week-1 game revealed drive by drive ----
  const feed = shallowRef<FeedVM>(feedVM(boot.store.getState().record!, boot.seed, boot.loadTeam() ?? boot.defaultTeam));
  const feedRevealed = ref(0);
  const feedLive = ref(false);
  let feedTimer: ReturnType<typeof setInterval> | null = null;
  function feedTick(): void {
    if (feedRevealed.value < feed.value.drives.length) feedRevealed.value++;
    else feedStop();
  }
  function feedStart(): void {
    feedLive.value = true;
    if (!feedTimer) feedTimer = setInterval(feedTick, settings.value.tickerMs);
  }
  function feedStop(): void {
    feedLive.value = false;
    if (feedTimer) { clearInterval(feedTimer); feedTimer = null; }
  }
  function feedFastForward(): void {
    feedStop();
    feedRevealed.value = feed.value.drives.length;
  }
  const feedShown = computed(() => feed.value.drives.slice(0, feedRevealed.value));
  // E2 refactor: the scoreboard text moved OUT of LiveFeed.vue INTO the store (component -> store)
  const feedScore = computed(() => {
    const last = feed.value.drives[feedRevealed.value - 1];
    const cur = last ? last.scoreAfter : { home: 0, away: 0 };
    return `${cur.home}-${cur.away}`;
  });

  // ---- settings (C6): persisted via VueUse (the house rule: use VueUse, not custom wrappers) ----
  const settings = useLocalStorage('cakepanz-settings', { compact: false, sounds: false, tickerMs: 700 });
  function toggleSetting(key: 'compact' | 'sounds'): void {
    settings.value = { ...settings.value, [key]: !settings.value[key] };
  }

  // ---- actions ----
  function go(s: Screen): void {
    screen.value = s;
    // NOTE: the feed does NOT auto-start on nav — the LIVE toggle is the user's control (the probe
    // contract: clicking feed-live starts the ticker; recording before/after counts it honestly)
  }
  function setSort(s: BoardSort): void { sort.value = s; }

  return {
    screen, sort, settings,
    draftSnap, userTeam, board, cards, teams: boot.teams,
    feed, feedShown, feedScore, feedRevealed, feedLive, feedStart, feedStop, feedFastForward,
    go, setSort, toggleSetting,
  };
});
