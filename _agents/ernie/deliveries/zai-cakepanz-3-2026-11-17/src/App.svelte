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
  import { lineupFor } from './lib/port/seam.ts';
  import { seasonFacade } from './lib/port/seasonFacade.ts';
  import { ratedLeagueOfRecord, rostersOfRecord, feedForGame, feedForRunStateWeek } from './lib/port/feedVM.ts';
  import type { FeedVM } from './lib/port/feedVM.ts';
  import { saveSettings, loadSettings, systemReducedMotion } from './lib/port/settings.ts';
  import type { Settings } from './lib/port/settings.ts';
  import { applyMode, applyTeam } from './lib/port/tokens.ts';
  import { navigate, currentRoute } from './lib/port/router.ts';
  import type { ScreenId } from './lib/port/router.ts';
  import { SeasonStatsAccumulator } from './lib/port/seasonStats.ts';
  import { seasonPayloadFromSession, sessionFromWeekPayload } from './lib/port/seasonSession.ts';
  import { saveWeekSlot, saveSeasonSlot, loadWeekSlot } from './lib/port/savesApp.ts';

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
  let seed = 777;
  let requestedSlot = $state<number | null>(null);
  let screen = $state<ScreenId>('team');
  let error = $state('');
  let feed = $state<FeedVM | null>(null);
  let dataVersion = $state('sha256:pending');
  let draftSaveId = $state('');
  let draftCreatedAt = $state('');
  const settingsStore = settingsWritable();
  const season = seasonReadable();
  const seasonStats = makeWritable<SeasonStats | null>(null);
  let statsAcc: SeasonStatsAccumulator | null = null;

  const ENGINE_PIN = '67-cakepanz@d3bd81d2';   // the informational engineVersion stamp (the pin, named)

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
  function go(s: ScreenId, param?: number | null) { screen = s; navigate(s, param); }
  function syncFromHash() { const r = currentRoute(); if (r) screen = r.screen; }

  function boot_() {
    if (!DEV) { boot.set({ phase: 'empty' }); return; }
    boot.set({ phase: 'ready', players: BOOT_PLAYERS });
    (window as any).__cp = { store, refresh, valuation, seasonFacade, go };   // go: the app's own navigation (the battery drives the real flow)
    sha256Hex(DATASET_RATINGS).then((x: string) => (dataVersion = 'sha256:' + x));
    go('team');   // the dev build opens at Team Select — the draft starts from the user's choice
  }

  function startDraft(teamIndex: number, slot: number | null) {
    seed = 1000 + Math.floor(Math.random() * 9000);
    userTeam = teamIndex;
    requestedSlot = slot;
    setTeam(TEAMS[teamIndex].name, slot);
    go('board');
    store.dispatch({ type: 'START', seed, userTeam });
    valuation.lock(); // the mode switch is disabled mid-draft
    statsAcc = null;
    seasonStats.set(null);
    refresh();
  }

  function refresh() {
    const st = store.getState();
    if (st.error) error = st.error;
    if (!st.draft || st.status === 'idle') { vmStore.set(null); oddsMeta.set(null); openNow.set([]); return; }
    openNow.set(openSlots(st.draft.rosters[userTeam]));
    try {
      const odds = goneOdds(st.draft, userTeam, makeRng(seed * 7 + 13), 30);
      vmStore.set(boardVM(st.draft, userTeam, odds, { sort }));
      oddsMeta.set({ picksBetween: odds.picksBetween, sims: odds.sims });   // the tooltip's method meta
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

  // the saves panel (drafts) + the meta the app stamps
  const recordNow = (): Record<string, unknown> | null => (store.getState().record as unknown as Record<string, unknown> | null);
  const metaNow = () => ({
    engineVersion: ENGINE_PIN,
    dataVersion,
    saveId: draftSaveId || (draftSaveId = (crypto?.randomUUID?.() ?? 'save-' + seed + '-' + Date.now())),
    saveRevision: 1 + (store.getState().record?.picks.length ?? 0),
    createdAt: draftCreatedAt || (draftCreatedAt = new Date().toISOString()),
  });
  function loadDraft(record: unknown, lineage?: { saveId?: string; createdAt?: string }) {
    const rec = record as { seed: number; userTeam: number } | null;
    if (!rec) { error = 'load: empty record'; return; }
    seed = rec.seed; userTeam = rec.userTeam;
    draftSaveId = lineage?.saveId || (crypto?.randomUUID?.() ?? 'save-' + rec.seed);
    draftCreatedAt = lineage?.createdAt || new Date().toISOString();
    store.dispatch({ type: 'LOAD', record } as any);
    valuation.lock();
    go('board');
    refresh();
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
</script>

<main class="cp-root" data-screen={screen}>
  <header class="cp-topbar">
    <span class="cp-brand">76 P<strong class="cp-shine">a</strong>ncakes</span>
    <span class="cp-track" title="the builders' track name">67 Cakepanz · the shell</span>
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
    <p class="cp-prov">Every number on this shell reads <b>{MODE_LABEL[valuation.get().mode]}</b> — the label travels with the numbers.</p>
    <TeamSelect onstart={startDraft} />
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
    <DraftBoard vm={$vmStore} onpick={pick} onundo={undo} onsort={setSort} canUndo={false} />
  {/if}
</main>

<style>
  /* the shell chrome is tokenized in shell.css; the root carries the page ink */
  .cp-root { background: var(--bg); color: var(--text); min-height: 100vh; }
</style>
