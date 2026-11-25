<!-- 67 Cakepanz · the complete shell — the screens, the flows, the save system, the shareables.
     The engine drops in through src/lib/port/ (the ONE door, M1–M5): this file imports the port's
     bindings and view models only. Framework: Svelte 5 as the render layer (the TS-neutral ruling —
     every VM/controller below the render layer is plain TypeScript in port/, mechanically re-usable). -->
<script lang="ts">
  import { onMount } from 'svelte';
  import DATASET_RATINGS from './data/madden27-ratings.csv?raw';
  import DATASET_FA from './data/free-agents-old-ratings.csv?raw';
  import DATASET_IDS from './data/player-ids.csv?raw';
  import './lib/assets/shell.css';
  import { makeDraftStore, asReadable, makeWritable, seasonReadable, settingsWritable } from './lib/bindings/stores.ts';
  import type { Player, SaveRecord, BoardVM, BoardSort, SeasonStats, Record3, GameResult, SlotId, FrozenPlayer } from './lib/port/seam.ts';
  import { buildPool, makeRng, goneOdds, boardVM, TEAMS, engineVersion, openSlots, sha256Hex, thawPool, table as engineTable } from './lib/port/seam.ts';
  import { valuation, MODE_LABEL } from './lib/valuation.ts';
  import { parseSeedCode, randomSeed, seedToCode, writeSeedToUrl } from './lib/port/seedCode.ts';
  import { lineupFor } from './lib/port/seam.ts';
  import { seasonFacade } from './lib/port/seasonFacade.ts';
  import { ratedLeagueOfRecord, rostersOfRecord, feedForGame, feedForRunStateWeek } from './lib/port/feedVM.ts';
  import type { FeedVM } from './lib/port/feedVM.ts';
  import { saveSettings, loadSettings, systemReducedMotion } from './lib/port/settings.ts';
  import type { Settings } from './lib/port/settings.ts';
  import { applyMode, applyTeam } from './lib/bindings/tokensApply.ts';
  import { navigate, currentRoute } from './lib/port/router.ts';
  import type { ScreenId } from './lib/port/router.ts';
  import { SeasonStatsAccumulator } from './lib/port/seasonStats.ts';
  import { seasonPayloadFromSession, sessionFromWeekPayload } from './lib/port/seasonSession.ts';
  import { saveWeekSlot, saveSeasonSlot, loadWeekSlot } from './lib/port/savesApp.ts';
  import { readAutosave, autosaveDraft, autosaveWeek, clearAutosaveWeek } from './lib/port/hydrateApp.ts';
  import { suggestIdsOf } from './lib/port/suggestWhy.ts';

  import DraftBoard from './lib/components/DraftBoard.svelte';
  import ModeSwitch from './lib/components/ModeSwitch.svelte';
  import LineupAdvice from './lib/components/LineupAdvice.svelte';
  import Saves from './lib/components/Saves.svelte';
  import TeamSelect from './lib/screens/TeamSelect.svelte';
  import Feed from './lib/screens/Feed.svelte';
  import Complete from './lib/screens/Complete.svelte';
  import Hub from './lib/screens/Hub.svelte';
  import WeekView from './lib/screens/WeekView.svelte';
  import Standings from './lib/screens/Standings.svelte';
  import Bracket from './lib/screens/Bracket.svelte';
  import Book from './lib/screens/Book.svelte';
  import Awards from './lib/screens/Awards.svelte';
  import Review from './lib/screens/Review.svelte';
  import Guide from './lib/screens/Guide.svelte';
  import Cards from './lib/screens/Cards.svelte';
  import Stats from './lib/screens/Stats.svelte';
  import SettingsScreen from './lib/screens/Settings.svelte';
  import Share from './lib/screens/Share.svelte';

  type Boot = { phase: 'loading' } | { phase: 'empty' } | { phase: 'ready'; players: Player[] };

  const boot = makeWritable<Boot>({ phase: 'loading' });
  // The store is created ONCE at module init: the datasets are static imports, DEV is known
  // synchronously, and a reassignment would leave the template's $draftState on the OLD readable.
  const DEV = new URLSearchParams(location.search).has('dev');
  const BOOT_PLAYERS: Player[] = DEV ? buildPool(DATASET_RATINGS, DATASET_FA, DATASET_IDS) : [];
  let store = makeDraftStore(BOOT_PLAYERS);
  let draftState = asReadable(store);
  let sort: BoardSort = 'wins';
  const vmStore = makeWritable<BoardVM | null>(null);
  const advice = makeWritable<{ label: string; name: string; ovr: string }[]>([]);
  const oddsMeta = makeWritable<{ picksBetween: number; sims: number } | null>(null);
  const openNow = makeWritable<SlotId[]>([]);
  const needsSel = makeWritable<SlotId[]>([]);
  let userTeam = $state(0);
  let seed = $state(777);
  let seedCode = $derived(seedToCode(seed));   // T3 + T2: the draft code — the PREFIXED b36: code (one truth, never ambiguous)
  let requestedSlot = $state<number | null>(null);
  let screen = $state<ScreenId>('team');
  let error = $state('');
  // S15 (the dispatchAsync contract §3): ONE action in flight — set before each await, cleared in
  // finally; pick/undo/start controls disable while it is set. L-ERR (the self-clearing error) is
  // implemented at the four action sites below: after EVERY resolved action the visible error
  // equals state.error ?? '' — a failure shows its message, the next successful action clears it.
  let busy = $state(false);
  let shareNotice = $state('');   // W14 (S14/P0): the visible notice when a shared link beats a DIFFERENT autosave
  let savedSuggest = $state<string[] | null>(null);   // S14/P2: the ring as PERSISTED in the autosave — a restored draft shows the same three
  let feed = $state<FeedVM | null>(null);
  let dataVersion = $state('sha256:pending');
  let draftSaveId = $state('');
  let draftCreatedAt = $state('');
  const settingsStore = settingsWritable();
  const season = seasonReadable();
  const seasonStats = makeWritable<SeasonStats | null>(null);
  let statsAcc: SeasonStatsAccumulator | null = null;

  // S15 §4.4 (the stale-stamp defect): the envelope's engineVersion is the RUNNING engine's own
  // version from the seam — the hardcoded previous-pin literal that stood here made the saves
  // panel flag every first save as foreign. (N36 forbids any engine-version literal in this file,
  // so the old value is not even quoted in this comment.) The shell build token (the bundled main
  // module's content-hashed name) rides the saves panel display, OUTSIDE the frozen envelope.

  function applySettings(s: Settings) {
    applyMode(s.mode);
    applyTeam(s.teamName, s.mode);
    if (typeof document !== 'undefined') document.body.classList.toggle('cp-reduced', s.reducedMotion || systemReducedMotion());
    saveSettings(s);
  }
  function setMode(m: Settings['mode']) { const s = { ...$settingsStore, mode: m }; applySettings(s); settingsStore.set(s); }
  function setMotion(v: boolean) { const s = { ...$settingsStore, reducedMotion: v }; applySettings(s); settingsStore.set(s); }
  function setOrder(v: boolean) { const s = { ...$settingsStore, newestFirst: v }; applySettings(s); settingsStore.set(s); }
  function setTeam(name: string | null, slot: number | null) { const s = { ...$settingsStore, teamName: name, draftSlot: slot }; applySettings(s); settingsStore.set(s); }

  // deep-linkable navigation: every screen change mirrors into the hash; a hashchange syncs back
  function go(s: ScreenId, param?: number | null) {
    // a finished draft has no board: the Complete screen owns it (A1, cakepanz-8)
    if (s === 'board' && store.getState().status === 'done') s = 'complete';
    screen = s; navigate(s, param);
  }
  function syncFromHash() { const r = currentRoute(); if (r) go(r.screen, r.param); }

  function boot_() {
    if (!DEV) { boot.set({ phase: 'empty' }); return; }
    boot.set({ phase: 'ready', players: BOOT_PLAYERS });
    (window as any).__cp = { store, refresh, valuation, seasonFacade, go, vmStore, engineVersion };   // engineVersion: the S34 stamp law reads the RUNNING version in-page   // go: the app's own navigation (the battery drives the real flow); vmStore: the board VM for the P-337 mode-invariance sha
    sha256Hex(DATASET_RATINGS).then((x: string) => (dataVersion = 'sha256:' + x));
    syncSeedPinned();   // R2: a link with ?seed= opens pinned (the affordance can clear it); a plain open does not
    go('team');   // the dev build opens at Team Select — the draft starts from the user's choice
    void hydrateBoot();   // Slice 3 (P-316): a saved draft/season on the saver overrides the empty landing
  }

  // T3 + T2 (cakepanz-12, the PORCA S1 fix): the seed is replayable via `?seed=<code>`. The code
  // contract lives in src/lib/port/seedCode.ts — the PREFIXED b36: code parses FIRST, so a
  // displayed code can never replay a different seed; a plain integer and a legacy bare base-36
  // code still parse. Garbage or absence falls back to the widened random draw (R2: 100,000–9,999,999).
  function parseSeed(): number {
    return parseSeedCode(new URLSearchParams(location.search).get('seed') || '') ?? randomSeed();
  }

  // R2 tab-variety (S13; Pickle's finding): the URL seed PINS the tab — re-entering TEAM and drafting
  // again replays the SAME seed forever (the variety held only across fresh loads). The affordance is
  // an explicit control on Team Select (visible whenever the URL carries a seed): "New draft · new
  // seed" clears ?seed= so the next START draws fresh — while an explicit replay link keeps working
  // (parseSeed still reads the URL first; nothing is weakened).
  let seedPinned = $state(false);
  function syncSeedPinned() {
    seedPinned = new URLSearchParams(location.search).has('seed');
  }
  function clearSeedParam() {
    try {
      const u = new URL(location.href);
      u.searchParams.delete('seed');
      history.replaceState(null, '', u.toString());
    } catch { /* file:// — the URL just cannot change; the next draw is fresh regardless */ }
    seedPinned = false;
  }

  async function startDraft(teamIndex: number, slot: number | null) {
    if (busy) return;        // the contract: one action in flight
    shareNotice = '';        // a fresh draft dismisses the share notice (W14)
    savedSuggest = null;     // a fresh draft recomputes the ring (S14/P2)
    seed = parseSeed();
    writeSeedToUrl(seed);   // R2: the resolved seed rides the URL — the draft is always shareable
    syncSeedPinned();       // the URL now pins the tab — the Team Select affordance offers the fresh draw (R2)
    userTeam = teamIndex;
    requestedSlot = slot;
    setTeam(TEAMS[teamIndex].name, slot);
    // B1 (cakepanz-9, the C1 defect): START settles BEFORE the board navigation — the done-guard
    // reads the FRESH state (drafting), never the finished draft; the new draft lands on the board.
    // P-317: the chosen slot rides the dispatch and the STORE's draftOrder() builds the order (the
    // shell never computes it). Omitted when null or the team's own slot (store: pickSlot-1 === userTeam).
    // S15: the four shell sites move to dispatchAsync TOGETHER (the contract §3 — sync and async
    // never mix in product code); the busy flag gates the START control on Team Select.
    busy = true;
    try {
      const st = await store.dispatchAsync({ type: 'START', seed, userTeam, ...(slot !== null && slot - 1 !== userTeam ? { pickSlot: slot } : {}) });
      error = st.error ?? '';   // L-ERR: the resolved state owns the visible error (show and clear)
    } finally { busy = false; }
    go('board');
    valuation.lock(); // the mode switch is disabled mid-draft
    statsAcc = null;
    seasonStats.set(null);
    refresh();
    void clearAutosaveWeek();   // a NEW draft invalidates a stale season autosave (the season derives from the draft)
    void autosaveDraftNow();    // Slice 3: the autosave mirrors the state from the first moment
  }

  function refresh() {
    const st = store.getState();
    if (st.error) error = st.error;
    if (!st.draft || st.status === 'idle') { vmStore.set(null); oddsMeta.set(null); openNow.set([]); return; }
    openNow.set(openSlots(st.draft.rosters[userTeam]));
    if (st.status === 'done') { oddsMeta.set(null); } else {
      try {
        const odds = goneOdds(st.draft, userTeam, makeRng(seed * 7 + 13), 30);
        vmStore.set(boardVM(st.draft, userTeam, odds, { sort }));
        oddsMeta.set({ picksBetween: odds.picksBetween, sims: odds.sims });   // the tooltip's method meta
      } catch { /* CPU pick in flight — the board refreshes on the user's turn */ }
    }
    try {
      const mine = Object.values(st.draft.rosters[userTeam]).filter(Boolean) as any[];
      const best = lineupFor(mine, '4-3');
      advice.set((best.placements as any[]).map((pl) => ({ label: pl.slot?.label ?? pl.slot?.slot ?? '?', name: pl.player?.name ?? '(empty)', ovr: pl.player ? String(pl.effOvr ?? pl.player.ovr) : '-' })));
    } catch { advice.set([]); }
  }

  async function pick(playerId: string, slot: string): Promise<boolean> {
    if (busy) return false;      // the contract: one action in flight
    savedSuggest = null;   // an interaction recomputes the ring — the stored ids were the restored view (S14/P2)
    let refused = false;
    busy = true;
    try {
      const st = await store.dispatchAsync({ type: 'PICK', playerId, slot });   // the type is exact — the `as any` is gone (S15)
      error = st.error ?? '';   // L-ERR: a failed PICK shows its message; the next success clears it
      refused = !!(st.error ?? '');
    } finally { busy = false; }
    refresh();
    void autosaveDraftNow();
    // the pick that completes the draft hands the screen to Complete — never a stale board (4.2, cakepanz-8.1)
    if (store.getState().status === 'done') go('complete');
    return !refused;   // the 0305 truth: the one-click toast (L31) rides a LANDED pick, never the attempt
  }
  async function undo() {
    if (busy) return;      // the contract: one action in flight
    savedSuggest = null;
    busy = true;
    try {
      const st = await store.dispatchAsync({ type: 'UNDO' });
      error = st.error ?? '';   // L-ERR
    } finally { busy = false; }
    refresh(); void autosaveDraftNow();
  }
  function setSort(s: BoardSort) {
    // S15 (the sort-after-restore law, the pickle F4 finding): a restored ring is a DERIVED view —
    // the stored suggestIds were computed under the saved sort. Changing the sort recomputes the
    // derivation; a stale stored highlight must not survive the sort change.
    savedSuggest = null;
    sort = s; refresh();
  }
  function toggleNeed(slot: SlotId) {
    needsSel.update((cur) => (cur.includes(slot) ? cur.filter((x) => x !== slot) : [...cur, slot]));
  }
  function clearNeeds() { needsSel.set([]); }

  // the saves panel (drafts) + the meta the app stamps
  const recordNow = (): Record<string, unknown> | null => (store.getState().record as unknown as Record<string, unknown> | null);
  const metaNow = () => ({
    engineVersion: engineVersion(),   // the law (§4.4): the envelope's engineVersion EQUALS the running engineVersion() — S34/N36
    dataVersion,
    saveId: draftSaveId || (draftSaveId = (crypto?.randomUUID?.() ?? 'save-' + seed + '-' + Date.now())),
    saveRevision: 1 + (store.getState().record?.picks.length ?? 0),
    createdAt: draftCreatedAt || (draftCreatedAt = new Date().toISOString()),
  });
  async function loadDraft(record: unknown, lineage?: { saveId?: string; createdAt?: string }, opts: { keepWeek?: boolean } = {}) {
    const rec = record as { seed: number; userTeam: number } | null;
    if (!rec) { error = 'load: empty record'; return; }
    shareNotice = '';           // a restore (or a slot load) dismisses the share notice (W14)
    savedSuggest = null;        // the boot restore re-hands the persisted ring AFTER this (hydrateBoot); a slot load recomputes (S14/P2)
    seed = rec.seed; userTeam = rec.userTeam;
    writeSeedToUrl(rec.seed);   // S13/D2 (Ernie's review + the law W12): a RESTORED draft is shareable too — the URL seed === the store seed after every load path, not just START
    syncSeedPinned();           // the replay affordance on Team Select tracks the URL (R2)
    draftSaveId = lineage?.saveId || (crypto?.randomUUID?.() ?? 'save-' + rec.seed);
    draftCreatedAt = lineage?.createdAt || new Date().toISOString();
    busy = true;
    try {
      const st = await store.dispatchAsync({ type: 'LOAD', record });   // S15: LOAD is async — a synchronous LOAD left behind breaks the contract §3
      error = st.error ?? '';   // L-ERR
    } finally { busy = false; }
    valuation.lock();
    go('board');
    refresh();
    if (!opts.keepWeek) void clearAutosaveWeek();   // a slot load replaces the session; a stale season autosave dies with it — a boot rehydrate keeps the week (S29b)
    void autosaveDraftNow();
  }

  // ---- Slice 3 (P-316): the autosave + the boot rehydration — a refresh mid-draft lands back on
  // the same board with the same user team, picks and mode. The port layer (hydrateApp.ts) holds
  // the whole mechanism; this is only the composition: write on every state change, read on boot.
  async function autosaveDraftNow() {
    const rec = recordNow() as unknown as SaveRecord | null;
    if (!rec) return;
    // S14/P2 (§3.6): the ring rides the save record — the autosave carries suggestIds[] (the
    // shell's own derivation over the engine VM, ONE source in port/suggestWhy.ts). The ENGINE
    // store record stays untouched: parseRecord on LOAD rebuilds the known fields and ignores the
    // extra one, so corrupt-never-repair and the engine contract are unaffected.
    const ids = suggestIdsForAutosave();
    const payload = ids.length ? ({ ...rec, suggestIds: ids } as SaveRecord) : rec;
    const msg = await autosaveDraft(payload, metaNow(), new Date());
    if (msg) error = msg;
  }
  // the CURRENT ring ids for the autosave — the same derivation the board renders (suggestIdsOf
  // over the needs-filtered rows; the board's own filter shape, mirrored here on purpose: the
  // stored ring must match what the user SAW at save time).
  function suggestIdsForAutosave(): string[] {
    let vm: BoardVM | null = null;
    const un = vmStore.subscribe((x) => (vm = x)); un();
    if (!vm) return [];
    let needs: SlotId[] = [];
    const un2 = needsSel.subscribe((x) => (needs = x)); un2();
    const rows = needs.length === 0
      ? vm.rows
      : vm.rows.filter((r) => needs.includes(r.slotId) || r.alsoFits.some((f) => needs.includes(f.slotId)));
    return suggestIdsOf(rows, vm.sort);
  }
  async function autosaveSeasonNow() {
    const snap = seasonFacade.snapshot();
    if (!snap.state) return;
    const msg = await autosaveWeek(seasonFacade.weekPayload(), metaNow(), new Date());
    if (msg) error = msg;
  }
  async function hydrateBoot() {
    // W14 (S14/P0): an explicit ?seed= link wins over a DIFFERENT autosave — the visitor lands on
    // the LINK's draft, the URL is NOT rewritten over the link, and the local save is left
    // untouched (a visible notice says so). A SAME-seed reload still restores (W9 — the exception
    // is load-bearing: the naive `if (has('seed')) return;` guard broke W9, measured 16 pass /
    // 1 fail); a plain reload with no seed still restores (S29). The corrupt path is untouched —
    // corrupt-never-repair verbatim (a corrupt autosave still refuses the boot).
    const explicitRaw = new URLSearchParams(location.search).get('seed');
    const explicitSeed = explicitRaw === null ? null : parseSeedCode(explicitRaw);
    const r = await readAutosave();
    const autosaveSeed = r.ok && r.draft ? ((r.draft.record as { seed?: number })?.seed ?? null) : null;
    if (explicitSeed !== null && autosaveSeed !== null && explicitSeed !== autosaveSeed) {
      shareNotice = 'shared link opened; your local save is untouched';
      return;
    }
    if (!r.ok) { error = 'the autosave was refused: ' + r.message; return; }   // corrupt-never-repair, verbatim
    if (r.draft) await loadDraft(r.draft.record, r.draft.lineage, { keepWeek: !!r.week });              // the board + header + next pick return (the week autosave survives the boot — S29b); S15: the boot WAITS for the async LOAD so the week's go('hub') can never be overridden by the board
    if (r.draft) savedSuggest = Array.isArray((r.draft.record as { suggestIds?: unknown })?.suggestIds) && ((r.draft.record as { suggestIds?: string[] }).suggestIds as string[]).length > 0
      ? ((r.draft.record as { suggestIds?: string[] }).suggestIds as string[])   // S14/P2: the persisted ring rides the restore (the component validates every id against the live board)
      : null;
    if (r.week) {
      const sess = sessionFromWeekPayload(r.week.env.payload);
      if (!sess.ok) { error = 'the season autosave was refused: ' + sess.message; return; }
      seasonFacade.resume(sess.value.state, sess.value.teams, sess.value.userTeamName, sess.value.roster);
      go('hub');                                                               // a resumed season always lands home (A1, cakepanz-8: the season outranks the finished draft's screen)
    }
  }

  // ---- the season flow ----
  function beginSeason() {
    const rec = store.getState().record;
    if (!rec || store.getState().status !== 'done') { error = 'the season needs a finished draft'; return; }
    const myRoster: FrozenPlayer[] = rostersOfRecord(rec)[userTeam].map((p) => ({ id: p.id, name: p.name, pos: p.pos, role: p.role, team: p.team, ovr: p.ovr, spd: p.spd, str: p.str, freeAgent: !!p.freeAgent }));
    seasonFacade.begin(ratedLeagueOfRecord(rec), seed, 2027, TEAMS[userTeam].name, myRoster);
    statsAcc = new SeasonStatsAccumulator();
    seasonStats.set(statsAcc.ss);
    go('hub');
    void autosaveSeasonNow();   // the season autosave rides from the first week
  }
  function playWeek() {
    if (!statsAcc) statsAcc = new SeasonStatsAccumulator();
    const r = seasonFacade.step();
    if (!r) { error = 'no season is running'; return; }
    const rec = store.getState().record;
    if (rec) statsAcc.addWeek(r.games.map((g) => ({ home: g.home, away: g.away, round: g.round, result: g.result })), rostersOfRecord(rec));
    seasonStats.set(statsAcc.ss);
    const mine = r.games.find((g) => g.home === seasonFacade.userTeamName || g.away === seasonFacade.userTeamName);
    if (mine) {
      feed = feedForGame(mine.result, mine.home, mine.away, { week: r.week, year: 2027, gs: mine.gs, userTeamName: seasonFacade.userTeamName });
      go('feed');
    } else {
      go('week', r.week);
    }
    if (seasonFacade.finished) saveSeasonFinal();
    void autosaveSeasonNow();   // the autosave tracks the stepper (a refresh mid-season returns to the hub)
  }
  // D1 fix (this sitting): RESTORE A SAVED WEEK — restore a week-save (slot C) into the season facade
  // through the seam's own hydrate path (savesApp.loadWeekSlot → sessionFromWeekPayload → resume).
  // No stub: every piece here is a real port path; corrupt/newer saves are refused verbatim by the
  // engine's own hydration (corrupt-never-repair). The session-local stats accumulator restarts —
  // the receipted note says so (stats re-accumulate from the next played week).
  async function restoreSeason() {
    const loaded = await loadWeekSlot('C');
    if (!loaded.ok) { error = 'restore refused: ' + loaded.message; return; }
    const sess = sessionFromWeekPayload(loaded.env.payload);
    if (!sess.ok) { error = 'restore refused: ' + sess.message; return; }
    seasonFacade.resume(sess.value.state, sess.value.teams, sess.value.userTeamName, sess.value.roster);
    statsAcc = null;
    seasonStats.set(null);
    go('hub');
    void autosaveSeasonNow();   // the autosave mirrors the restored session
  }
  function watchFeed() {
    const snap = seasonFacade.snapshot();
    if (!snap.state || !snap.teams) return;
    const f = feedForRunStateWeek(snap.state, snap.teams, snap.userTeamName, seasonFacade.slot);
    if (f) { feed = f; go('feed'); }
  }
  async function saveSeasonWeek() {
    const snap = seasonFacade.snapshot();
    if (!snap.state) { error = 'no season to save'; return; }
    const payload = seasonFacade.weekPayload();
    const msg = await saveWeekSlot('C', payload, metaNow(), new Date());
    error = msg ? 'save refused: ' + msg : '';
    void autosaveSeasonNow();   // the manual save mirrors into the autosave (one state, one truth)
  }
  function saveSeasonFinal() {
    const snap = seasonFacade.snapshot();
    if (!snap.state) return;
    const payload = seasonPayloadFromSession(snap.state, snap.userTeamName, seasonFacade.userRoster);
    void saveSeasonSlot('C', payload, metaNow(), new Date());
  }

  $effect(() => { void draftState; void season; });

  onMount(() => {
    valuation.subscribe(() => refresh());
    window.addEventListener('hashchange', syncFromHash);
    const s = loadSettings();
    applySettings(s);
    settingsStore.set(s);
    if (s.teamName) applyTeam(s.teamName, s.mode);
    boot_();
    return () => window.removeEventListener('hashchange', syncFromHash);
  });

  // the nav (the shell chrome; the battery's phone laws ride the same classes)
  const NAV: { id: ScreenId; label: string; show: boolean }[] = [
    { id: 'team', label: 'TEAM', show: true },
    { id: 'board', label: 'DRAFT', show: true },
    { id: 'cards', label: 'CARDS', show: true },
    { id: 'hub', label: 'SEASON', show: true },
    { id: 'week', label: 'WEEK', show: true },
    { id: 'standings', label: 'STANDINGS', show: true },
    { id: 'bracket', label: 'PLAYOFFS', show: true },
    { id: 'awards', label: 'AWARDS', show: true },
    { id: 'review', label: 'REVIEW', show: true },
    { id: 'stats', label: 'STATS', show: true },
    { id: 'book', label: 'BOOK', show: true },
    { id: 'share', label: 'SHARE', show: true },
    { id: 'guide', label: 'GUIDE', show: true },
    { id: 'settings', label: 'SETTINGS', show: true },
  ];
  const recordTyped = $derived((($draftState?.record ?? null) as unknown as SaveRecord | null));   // reactive via the readable (getState() alone is not tracked)
  const tableNow = $derived.by<Record<string, Record3> | null>(() => {
    // the weekly RunState carries NO table field — the table is the ENGINE's own table(s) call
    // (seasonrun.ts), never a property read (the s.table read here was a season-crash defect found
    // by the acceptance run; the engine function is the one source of standings truth)
    const s = seasonFacade.runState;
    return s ? (engineTable(s) as Record<string, Record3>) : null;
  });
  const awardsNow = $derived.by<{ mvp: string; mvpLine: string } | null>(() => {
    const ss = $seasonStats;
    if (!ss) return null;
    const lines = Object.values(ss.players);
    if (!lines.length) return null;
    const mvp = lines.slice().sort((a, b) => ((b.stats.pyd ?? 0) + (b.stats.rtd ?? 0)) - ((a.stats.pyd ?? 0) + (a.stats.rtd ?? 0)))[0];
    return { mvp: mvp.name, mvpLine: mvp.label };
  });
  const seasonReady = $derived($season.ready);
  // B-bis (cakepanz-9, the Owner's ruling): the late-mode flip is SUPERSEDED and REMOVED — the
  // board is ONE uniform board for picks 1–32 (myPicks/lateMode deleted; settings.fullBoard is gone
  // with it; the order §5).
</script>

<main class="cp-root" data-screen={screen}>
  <header class="cp-topbar">
    <span class="cp-brand">76 P<strong class="cp-shine">a</strong>ncakes</span>
    <span class="cp-topbtns">
      <ModeSwitch />
      <button class="cp-topbar-btn" onclick={() => go('saves')} aria-pressed={screen === 'saves'}>Saves</button>
    </span>
  </header>

  {#if $boot.phase === 'ready'}
    <nav class="cp-nav" aria-label="Screens">
      {#each NAV.filter((n) => n.show) as n (n.id)}
        <button class="cp-navbtn" aria-current={screen === n.id} onclick={() => go(n.id)}>{n.label}</button>
      {/each}
    </nav>
  {/if}

  {#if error}<p class="cp-error" role="alert">{error}</p>{/if}

  {#if $boot.phase === 'loading'}
    <p class="cp-note">Loading…</p>
  {:else if $boot.phase === 'empty'}
    <section class="cp-empty">
      <h1>76 Pancakes</h1>
      <p>No player dataset yet. The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent).</p>
      <p class="cp-note">Import a dataset CSV to begin — or open a dev build with <code>?dev=1</code> (the engine's own bundled ratings, labelled DEV).</p>
      <p><a class="cp-devlink" href="?dev=1">Open the dev build →</a></p>
    </section>
  {:else if screen === 'team'}
    {#if shareNotice}<p class="cp-sharenotice" role="status">{shareNotice}</p>{/if}
    <p class="cp-prov">Every number on this shell reads <b>{MODE_LABEL[valuation.get().mode]}</b> — the label travels with the numbers.</p>
    <TeamSelect onstart={startDraft} seedPinned={seedPinned} onnewseed={clearSeedParam} busy={busy} />
  {:else if screen === 'board' && $vmStore}
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
      onplay={() => go('complete')}
      draftDone={$draftState?.status === 'done'}
      seedCode={seedCode}
      savedSuggest={savedSuggest}
      busy={busy}
    />
    <LineupAdvice slots={$advice} />
  {:else if screen === 'complete' && recordTyped}
    <Complete record={recordTyped} {requestedSlot} onseason={beginSeason} oncards={() => go('cards')} onbook={() => go('book')} />
  {:else if screen === 'hub'}
    <Hub
      season={$season}
      onplayweek={playWeek}
      onweek={(n) => { seasonFacade.go(n); go('week', n); }}
      onstandings={() => go('standings')}
      onbracket={() => go('bracket')}
      onrestore={restoreSeason}
      canRestore={true}
      onbook={() => go('book')}
    />
  {:else if screen === 'week'}
    <WeekView season={$season} onplay={playWeek} onfeed={watchFeed} onsave={saveSeasonWeek} />
  {:else if screen === 'standings'}
    <Standings season={$season} onbracket={() => go('bracket')} />
  {:else if screen === 'bracket'}
    <Bracket season={$season} onreview={() => go('review')} />
  {:else if screen === 'book'}
    <Book season={$season} draftRecord={recordTyped} onreview={() => go('review')} onfeed={watchFeed} />
  {:else if screen === 'awards'}
    <Awards stats={$seasonStats} table={tableNow} />
  {:else if screen === 'review'}
    <Review season={$season} onbracket={() => go('bracket')} onbook={() => go('book')} onawards={() => go('awards')} />
  {:else if screen === 'guide'}
    <Guide />
  {:else if screen === 'cards'}
    <Cards vm={$vmStore} />
  {:else if screen === 'stats'}
    <Stats stats={$seasonStats} table={tableNow} teams={seasonFacade.snapshot().teams} />
  {:else if screen === 'settings'}
    <SettingsScreen
      settings={$settingsStore}
      onmode={setMode}
      onmotion={setMotion}
      onorder={setOrder}
      onsaves={() => go('saves')}
      onresetsave={() => setTeam($settingsStore.teamName, $settingsStore.draftSlot)}
    />
  {:else if screen === 'saves'}
    <Saves record={recordNow()} meta={metaNow()} userTeamIndex={userTeam} onclose={() => go('board')} onloaddraft={loadDraft} />
  {:else if screen === 'share'}
    <Share record={recordTyped} stats={awardsNow} season={$season} />
  {:else if screen === 'feed' && feed}
    <Feed {feed} onclose={() => { go(seasonReady ? 'week' : 'board'); feed = null; }} />
  {:else if $vmStore}
    <DraftBoard vm={$vmStore} onpick={pick} onundo={undo} onsort={setSort} canUndo={false} busy={busy} />
  {/if}
</main>

<style>
  /* the shell chrome is tokenized in shell.css; the root carries the page ink */
  .cp-root { background: var(--bg); color: var(--text); min-height: 100vh; }
</style>
