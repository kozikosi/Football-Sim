// appStore.svelte.ts — the fresh-start UI state bridge (Svelte 5, runes-only, per the house rules:
// "engines never carry reactivity; bridges do"). The engine boots framework-free; THIS class holds
// $state snapshots and derives the views. The engine's own reducer store notifies via subscribe;
// the bridge re-assigns the $state snapshot and everything derives from it.
// NOTE for Part B: the module exports ONE const instance — the class-instance idiom, which the
// compiler accepts without any getter-wrapper ceremony. The week-stepper's dedicated weekStore
// (Part B) additionally builds the FACADE idiom to measure its migration cost.
import { bootApp } from '../shared/bootData.ts';
import type { AppBoot } from '../shared/bootData.ts';
import { makeRng } from '../engine/core/rng.ts';
import { goneOdds } from '../engine/sports/nfl/engine/goneodds.ts';
import { boardVM } from '../engine/sports/nfl/view/draftBoard.ts';
import type { BoardSort } from '../engine/sports/nfl/view/draftBoard.ts';
import { toCardGrid } from '../shared/cardVM.ts';
import type { CardGridVM } from '../shared/cardVM.ts';
import { feedVM } from '../shared/feedVM.ts';
import type { FeedVM } from '../shared/feedVM.ts';

export type Screen = 'cards' | 'stats' | 'board' | 'feed' | 'week' | 'settings';

export class AppStore {
  // ---- UI state (runes) ----
  screen = $state<Screen>('cards');
  sort = $state<BoardSort>('wins');
  settings = $state({ compact: false, sounds: false, tickerMs: 700 });

  // ---- engine snapshots (the bridge's $state payloads) ----
  // $state.RAW, not $state: the snapshot is the ENGINE's own object — Svelte's deep proxy wraps it,
  // and the engine writes memo caches into its own state during reads (goneOdds/boardVM), which the
  // proxy reports as state_unsafe_mutation. Raw keeps reassignment reactive without proxying engine
  // internals. (Vue's shallowRef is the same concept and needed no such decision — journal, slice a.)
  snap = $state.raw<ReturnType<AppBoot['store']['getState']> | null>(null);

  // ---- live feed ----
  feedRevealed = $state(0);
  feedLive = $state(false);
  #feedTimer: ReturnType<typeof setInterval> | null = null;

  readonly boot: AppBoot;

  constructor() {
    this.boot = bootApp();
    this.snap = this.boot.store.getState();
    this.boot.store.subscribe((s) => { this.snap = s; });
    this.boot.store.dispatch({ type: 'START', seed: this.boot.seed, userTeam: this.boot.loadTeam() ?? this.boot.defaultTeam });
    // settings persist via localStorage (the bridge owns browser APIs in this repo)
    try {
      const raw = localStorage.getItem('cakepanz-settings');
      if (raw) this.settings = { ...this.settings, ...(JSON.parse(raw) as typeof this.settings) };
    } catch { /* storage may refuse; defaults hold */ }
  }

  // ---- derived views ----
  get userTeam(): number {
    return this.snap?.record?.userTeam ?? this.boot.defaultTeam;
  }
  get board() {
    // after START the draft state always exists (boot guarantee — non-null, counted as workaround)
    return boardVM(this.snap!.draft!, this.userTeam, goneOdds(this.snap!.draft!, this.userTeam, makeRng(this.boot.seed * 7 + 13), 30), { sort: this.sort, limit: 60 });
  }
  get cards(): CardGridVM {
    return toCardGrid(this.board);
  }
  get feed(): FeedVM {
    return feedVM(this.snap!.record!, this.boot.seed, this.userTeam);
  }
  get feedShown() {
    return this.feed.drives.slice(0, this.feedRevealed);
  }
  // E2 refactor: the scoreboard text moved OUT of LiveFeed.svelte INTO the bridge (component -> store)
  get feedScore(): string {
    const last = this.feed.drives[this.feedRevealed - 1];
    const cur = last ? last.scoreAfter : { home: 0, away: 0 };
    return cur.home + '-' + cur.away;
  }
  // ---- actions ----
  go(s: Screen): void {
    this.screen = s;
    // NOTE: the feed does NOT auto-start on nav — the LIVE toggle is the user's control (probe contract)
  }
  setSort(s: BoardSort): void { this.sort = s; }

  feedTick(): void {
    if (this.feedRevealed < this.feed.drives.length) this.feedRevealed++;
    else this.feedStop();
  }
  feedStart(): void {
    this.feedLive = true;
    if (!this.#feedTimer) this.#feedTimer = setInterval(() => this.feedTick(), this.settings.tickerMs);
  }
  feedStop(): void {
    this.feedLive = false;
    if (this.#feedTimer) { clearInterval(this.#feedTimer); this.#feedTimer = null; }
  }
  feedFastForward(): void {
    this.feedStop();
    this.feedRevealed = this.feed.drives.length;
  }

  toggleSetting(key: 'compact' | 'sounds'): void {
    this.settings = { ...this.settings, [key]: !this.settings[key] };
    try { localStorage.setItem('cakepanz-settings', JSON.stringify(this.settings)); } catch { /* session-only */ }
  }
}

// The single bridge instance (the app's one store; module-level export of a class instance needs
// no getter-wrapper ceremony — the compiler accepts property access through the instance).
export const app = new AppStore();
