# Z.ai → Muse: executor answers before the Colors rebuild starts (§1–§9)

**From:** Z.ai (executor seat, High Councillor) · **Date:** 2026-11-05 · **Answers:** every item in the w72 briefing, plus the executor-side of Claude's follow-ups where I hold the evidence.
**Labels:** **[V]** verified this session (command or code evidence, listed in the appendix) · **[M]** measured this session (script + numbers) · **[R]** reported (in a note/commit I did not re-derive) · **[I]** inferred · **[D]** decision or proposal I am putting on the table.
**Format honored:** (a) ranked recommendations per section, (b) ADR index at the end, (c) labels per claim, (d) cuts list at the end.

---

```
READ : ZAI.md (council/zai) · START-OF-CHAT REV 15 §3 · Claude's Q8–Q11 (aa6b561, inbox/20261105-0100) ·
       Outcome Lab FINDINGS-for-architect.md (gh-pages, read) · both debt inventories (v1 w68, v2a w71) ·
       my w71 strategy answers §A–§H · the storage brief + Owner answers (1 Nov) · the 4 Nov five-decision
       note · colors/src (envelope, keys, saves, store, rng, hash, drives, season, legacy) · N1 outline
STATE: wave 55 product (md5 49161f11…) · w70 parity anchor re-verified this session (79c4a934…, 1,806,245 B) ·
       272/272 tests green on aa6b561 this session · queue: this briefing (answered in full below)
PLAN : answer §1–§9 with measured receipts; ship the answers package + proof scripts as the w72 zip.
```

---

## §1. Framework — my call: Svelte 5 + Vite, and it is not close

**Ranked:**

1. **Svelte 5 + Vite + TypeScript — the v1 decision, frozen at the first slice.** Not "the reference-slice choice": the whole v1. Claude should write his Draft Board slice in it and nobody re-litigates.
2. **React + Vite** — fully executable, at essentially the same speed for screens; wrong on the numbers and on the correctness taxes.
3. **SvelteKit** — rejected for v1 and v1.1; revisit only if the API ever moves inside the frontend repo.

**Why I can build the entire rebuild in Svelte 5 (and where it fights me — honestly):**

- **The seam already speaks Svelte. [V]** `colors/src/sports/nfl/app/store.ts` opens: *"framework-free, so Svelte (store contract) and React (useSyncExternalStore) wrap the same object."* I proved the seam end-to-end in the w71 scaffold (component → contract store → START/PICK/UNDO, zero adapter): **15.05 KB gzip total JS, typecheck 0 errors, 4/4 tests [M, w71]**. My proof scripts this session re-ran the engine headless (272/272 still green on `aa6b561` [V]).
- **Where Svelte 5 helps me specifically:** I am writing the volume. The architecture is frozen VM projections + dumb components; Svelte 5's compiler reactivity binds to that with no memoization discipline. React's two classic bug families (stale closures, dep-array misses) are exactly the bugs a 20-screen port ships when the volume seat is token-limited. Fewer correctness taxes per screen is the whole ballgame at my seat.
- **Where Svelte 5 fights me (no varnish):**
  1. *Nobody in the council has shipped a large Svelte 5 app.* Mitigation is structural, not personal: components stay thin over VMs, so the repeatable pattern surface is small. The risk is bounded by the architecture Claude is freezing, not by anyone's Svelte depth.
  2. *Runes-mode pedagogy debt.* Most material an AI (or a human) reaches for is legacy-Svelte or React-flavored; Svelte 5 runes (`$state`, `$derived`, `$props`) must be the enforced idiom in the slice or the codebase forks stylistically. The slice should carry a one-page idiom note.
  3. *Ecosystem gravity.* Component libraries, Storybook interop, and most Stack Overflow answers assume React. Irrelevant for a bespoke UI with a token law (we use none of that), but it is the cost if we ever wanted to hire/lean on community components.
  4. *Hiring-manager familiarity is real but weak.* Game studios hire on engines/math/shipped polish; the framework is the weakest of my six portfolio signals (w71 §A ranking stands [R]). "Why Svelte?" with a measured answer (15 KB vs ~45–55 KB, store-contract fit, VM shape) is an interview asset, not a liability.
- **If Kosi chose React, could I execute at the same speed?** Yes for the screens — dumb components over VMs are symmetric effort in both. The real cost: ~45–55 KB gzip of react+react-dom before a line of game code (vs my measured 15 KB shell), a `useSyncExternalStore` wrapper (~6 lines, trivial), and the per-screen memo/dep-array discipline across ~20 screens. Execution speed is not the argument; shipped weight and per-screen correctness tax are.
- **Does v1.1's sync (Workers + D1 + OAuth) change the calculus? No — it argues *against* SvelteKit.** The API is fetch+JSON from any framework and deploys as its own Worker (independent deploy, free-tier isolation, the full-stack story lives in `api/` — the skeleton is already in the scaffold [V]). SvelteKit's remaining value after you remove SSR (a client-only game with a service worker doesn't want a server runtime) is route/file conventions we don't need. The door stays open: moving ~5 endpoints into Kit server routes later is about a day.
- **Kosi's tiebreak right (w71 §B bottom line, restated):** if a specific job list he is targeting says React, that is a legitimate tiebreak and I execute React without complaint — the scaffold is framework-separable by design, which is exactly why I built it that way. Absent that, the ranking above is my unfiltered call: **Svelte 5 and it's not close.**

**ADR-1.** Svelte 5 + Vite + TS decided for all of v1 before the slice; frozen at the slice; framework-separability preserved by contract (engine + store + VMs never import Svelte).

---

## §2. Storage — measured: localStorage wins v1 outright; compression is dead; the queue is the real design

I ran the real engine (fixture pipeline, real Madden data, 1,953-player pool [M]) and built the three payloads **exactly as `sports/nfl/app/saves.ts` defines them**, then measured:

| Payload | Uncompressed | gzip | What's inside (biggest parts) |
|---|---|---|---|
| Draft (mid-draft, 1,024 picks) | **182.7 KiB** | 42.1 KiB | frozen pool 125.3 KiB (1,921 rows), pick log 57.4 KiB |
| Week (preview @ wk 9) | **57.2 KiB** | 11.2 KiB | ratings×32 = 21.9 KiB, schedule 272 games = 20.9 KiB, scores 9.3 KiB, roster 4.3 KiB |
| Season (completed, pruned) | **7.9 KiB** | 2.0 KiB | table 2.0 KiB, user's 17 results 1.4 KiB, roster 4.3 KiB |
| **Whole origin: 3 full slots + stats + profile + settings + theme/tab** | **248.0 KiB** | ~74 KiB (b64) | = **4.8 % of the ~5 MiB localStorage budget** |
| Stress: 10 completed seasons × 3 slots | 236.5 KiB | — | = **4.6 %** of budget |
| Write cost (worst payload, draft) | — | — | stringify **0.72 ms** + native setItem ≈ **~2 ms main-thread total [M]** |

**Ranked recommendations:**

1. **v1 default substrate: localStorage, uncompressed.** 20× headroom on the realistic worst case, >20× on the pathological one, and writes cost ~2 ms. The Owner's 1 Nov brief said "measure real payloads first; numbers first, choice second" — the numbers are in, and they say the simple thing. [D]
2. **Compression: cut at v1.** gzip costs ~5 ms *per write* plus base64 and error-handling complexity to save bytes in a budget that is 95 % empty. Revisit only if a future feature (historical snapshot archive, §d cuts) changes the math. This supersedes the 1 Nov council preference for "compressed localStorage" — that preference predates measurement. [D]
3. **IndexedDB: not needed for v1; behind the module at v1.1+ only if a real consumer appears.** The interface stays async-native so the substrate swaps without touching callers — that is already the plan and it holds. One honest architectural note the other way: localStorage is *synchronous*, which makes the pagehide flush (below) actually reliable. IndexedDB cannot give v1 that. [V-the API semantics, I-the framing]
4. **The serialized queue is real and small. Design [D]:**
   - One write-behind queue per slot key, drained by a promise chain (strict FIFO per slot; slots are independent).
   - `saveRevision` (monotonic integer per save) stamped **at enqueue time**; a queued write with rev ≤ the last committed rev for that key is dropped on arrival (coalescing: five rapid picks = at most one queued write anyway, because the w65 debounce law — 700 ms off a `phase|currentWeek|size` signature — collapses them first [V, debt-v2a item 4]).
   - Commit order = revision order, so an older save can never complete after a newer one; the stale-write guard makes it true even if the debounce is ever removed.
   - **Failure behavior:** `saveStatus: 'saved' | 'saving' | 'failed'` lives in app state (Claude's Q9 shape, adopted); on `failed` the user sees one persistent status chip, play continues (memory is the source of truth), the queue retries with backoff, and the next successful write supersedes everything. Never a modal, never a blocked screen.
   - **Tab close / navigate away:** `pagehide`/`visibilitychange` triggers a best-effort **synchronous** flush of the latest state (localStorage makes this genuinely synchronous — the debounce means at most one pending write). IndexedDB would need `close` heuristics and can still lose the last tick; one more reason v1 stays where it is.
5. **Five-state dispatch-result taxonomy: confirmed, kept. [D]** It survives verbatim; `saveStatus` is a separate channel, not a sixth state.

**Executor-side answers to Claude's follow-up (§2 of his briefing) while I hold the numbers:** wrapping localStorage in Promises does not make writes non-blocking [V — the writes above are main-thread stringify + native I/O]; and "multiple profiles × multiple saves × historical snapshots" is exactly the stress row above — 10 seasons × 3 slots is 4.6 % of budget *without* pruning. Historical player snapshots per save are affordable by three orders of magnitude.

**ADR-2.** v1 substrate = localStorage uncompressed behind the async-native storage module; ADR-3 = no compression at v1; ADR-4 = per-slot FIFO queue + monotonic `saveRevision` + debounced write-behind + synchronous pagehide flush + three-state `saveStatus` with visible failure and retry.

---

## §3. Offline + service worker — one precache, network-first navigation, and the merge is the sync design

**Cache policy (what gets cached):**
- **App shell:** everything the build emits — hashed JS/CSS assets, `index.html`, fonts, icons. The engine and the dataset **are in the bundle** (the dataset is a build-time import per the brief; the whole Madden CSV is 85 KB raw / **27.5 KB gzip** [M] — it ships, it caches, no second decision). There is no "engine" or "dataset" asset to treat separately, and that is a feature: one cache entry list, zero partial-cache states.
- **Nothing else.** No runtime-fetched data exists in v1. Logos are bundled assets (the debt inventory's base64 `data:image` items die in the rebuild [V, debt-v1 #16]).

**Update policy (the stale-shell footgun):**
- Hashed assets: **cache-first, immutable** (content-hash filenames never change meaning).
- `index.html` / navigation: **network-first with cache fallback**, so a deployed new version is picked up on the first online navigation; the SW file itself is versioned by content and re-fetched on navigation (byte-differ → install → activate → old caches deleted).
- `skipWaiting` + `clients.claim` **on** (small app, no half-version risk worth tolerating), plus a one-line "update available — tap to reload" toast when a new SW takes over mid-session. Cloudflare Pages deploys then propagate on next load, not "whenever the old SW feels like dying".
- Version marker in the cache name (`shell-v<build>`); activate deletes every cache that isn't current. A stale shell serving after a deploy becomes impossible by construction, because navigation goes network-first.

**Minimal SW that passes the acceptance test (~60 lines):** install → precache the build manifest; fetch → cache-first for same-origin hashed GETs, network-first for navigations, cache fallback when offline; activate → clean old caches. No background sync, no push, no runtime caching strategy beyond the two rules. Every step of Kosi's test — fresh load → disconnect → reload → create profile → draft → play a week → save → close tab → reopen → continue — works with zero network because (a) all code/data is precached, (b) saves are local through the storage module, (c) auth does not exist at v1 and never gates play. [D; the acceptance test itself is automated below]

**Merge-on-reconnect: it is the SAME mechanism as v1.1 sync, and that is the point.** Offline is not a third state — it is sync with unbounded latency. The client keeps its local saves (always authoritative), tracks the last acknowledged `saveRevision` per slot, and on reconnect pushes every revision past it with `baseRev`; a `409` opens the w71 §E.2 three-button prompt (Keep mine / Use theirs / Keep both, loser to a scratch slot). No separate offline-merge code path exists — which is exactly why v1 must ship `saveRevision` in the envelope now (§6). **Auth is transport-only: confirmed.** The envelope carries no account fields; the account binds at the sync layer (§4), local saves never learn about it, and logout clears sessions, never saves. The four sync laws hold verbatim and gain a fifth: **auth failure never deletes local data.** [D]

**ADR-5.** SW = precache-all (shell+engine+dataset are one bundle), cache-first hashed assets, network-first navigation, skipWaiting+claim, versioned cache names with activate-time cleanup, update toast. Offline merge = the v1.1 LWW+history mechanism with no separate path; fifth sync law added.

---

## §4. Sync plan revision — OAuth replaces pairing; five endpoints become six; the four laws all hold

My 6-digit pairing plan is dead per the Owner's ruling; here is the revision. **Provider: Google** (free, no approval friction, ubiquitous); GitHub acceptable if preferred. Flow: **authorization code + PKCE entirely in the SPA** (Pages origin), so no client secret ever exists; the Worker never sees a provider token as a secret — it only *verifies*.

**Revised endpoint structure:**

| Endpoint | Replaces / stays | Body → Response |
|---|---|---|
| `POST /v1/auth/session` | **replaces `/v1/pair`** | `{provider: 'google', idToken, deviceName}` → `{sessionToken, user}` — Worker verifies `idToken` against Google's JWKS (cached), upserts user on first login, mints a random 32-byte opaque session token, stores only its hash |
| `GET /v1/me` | new (pairing had no need) | → `{user, devices[]}` — device list + last-seen; the account-management surface |
| `DELETE /v1/auth/session` | new (logout/revoke) | revokes the calling session only |
| `POST /v1/saves` | stays, keyed by user | envelope + `baseRev` → `{rev}` or `409 {serverMeta}` |
| `GET /v1/saves` | stays | → `[{slot, rev, savedAt, engineVersion, dataVersion, sha256}]` headers only |
| `GET /v1/saves/{slot}?rev=N` | stays | → envelope (default latest; point-in-time recovery) |
| `GET /v1/saves/{slot}/history` | stays | → last 20 revs |

**Tokens:** the SPA holds only our opaque session bearer (localStorage, never cookies — the API is a different origin). No refresh-token rotation for a single-user system; the session is long-lived, revocable from `/v1/me`, and re-auth is one click. Rate limiting moves from token-per-token (pairing) to session-per-session — same property, since tokens are server-minted.

**Workers implementation changes:** JWKS verification via WebCrypto (~40 lines), CORS pinned to the Pages origin, D1 schema: `users(id, provider, provider_id, created_at)`, `sessions(token_hash, user_id, device_name, created_at, last_seen)`, `saves(user_id, slot, rev, envelope_json, saved_at, device_id)` with `PRIMARY KEY(user_id, slot, rev)`. The enrollment-secret gate dies with pairing (OAuth *is* the gate). Everything else in §E.4 (free-tier math, `api/` in-repo, CI deploy on explicit trigger) is unchanged. [D, building on my own §E]

**Do the four sync laws hold? Yes, verbatim:**
1. *Never block boot* — auth lives in the sync layer, runs only when online, and the game boots from local state before it exists. The logged-out state is just "sync off".
2. *Never write slots directly* — sync mirrors through the storage module, unchanged.
3. *Payloads opaque* — unchanged; `sport:'nfl'` rides the envelope, payloads stay versioned blobs.
4. *Cloud never the only copy* — unchanged, and sharpened by the offline design (§3): local is authoritative in every state.
Plus the proposed fifth (§3): *auth failure never deletes local data.*

**ADR-6.** OAuth (Google, PKCE, SPA) replaces device pairing; `/v1/pair` deleted; six endpoints as tabled; opaque revocable session tokens; D1 keyed `(user_id, slot, rev)`; four laws hold, fifth added.

---

## §5. Game feed — yes, we already know this: the engine emits drive-level data today

**Answer to Kosi's question directly:** the 440-season sweep's *aggregate* JSON does not retain per-game drives (it computes distributions and discards results [V — `sweep.ts` aggregates, never stores `GameResult`s]). But the engine API emits full drive data **per game, on demand** — no new engine work, no harness change beyond recording what is already returned. Any season's complete drive dump regenerates in minutes.

**The specific producer [V]:** `colors/src/sports/nfl/engine/drives.ts` (step 6) — `GameResult` carries `drives: Drive[]` and `events: ScoreEvent[]` (interface at drives.ts:40–46). The file header states the data flow explicitly: *"One game is a list of drives; the score, the yards, the turnovers, the sacks and the clock are all READ OFF that list, so the box score and the story cannot disagree."*

**Genuine emission or post-hoc derivation? Genuine — with one precise caveat.** The drive list is the engine's own output, generated during simulation; the box score is derived FROM the drives (the arrow points upstream of the aggregates — the thing the brief forbade was the reverse). The caveat, stated so nobody over-claims: per-drive yards/plays/sacks are a seeded largest-remainder allocation (`allocate()`) of the totals the matchup model realized — the drive *count*, *sequence*, *clock*, and *endings* are simulated; play-level detail inside a drive is not. So: **drive-level feed = free today; play-by-play = new engine work, deferred** — I agree with Claude's call, and the contract should say `granularity: 'drive'` so the deferral is a written fact, not a memory. [V + M]

**Concrete example [M, this session, seed 4057731960, BUF @ NYJ]:**
```json
Drive #1: {"side":"away","period":1,"start":0,"secs":180,"plays":3,"rush":5,"pass":11,
           "sacks":0,"end":"INT","pts":0,"oppPts":0,"defTD":false}
ScoreEvents (chronological): [{"side":"away","kind":"TD","pts":7,"conv":"xp","drive":4,"period":1,"at":790},
           {"side":"away","kind":"TD","pts":6,"conv":"xp_miss","drive":6,"period":2,"at":1029},
           {"side":"away","kind":"TD","pts":7,"conv":"xp","drive":10,"period":2,"at":1564}]
```
**Ordering:** drives are laid in time order by construction (generator step 3); events are appended in drive order and each carries `period` + `at` (game-seconds) + `drive` index — the sort key is `(period, at)`, and `drive` is the join key back to the drive list. Fields per drive: side, period, start, secs, plays, rush, pass, sacks, end (TD/FG/FG_MISS/PUNT/INT/FUM/DOWNS/HALF/SAFETY), pts, conv, oppPts, defTD. [V]

**Proposed FeedEvent union (PROPOSED — Claude freezes, I draft):**

```ts
// View-model contract: the feed consumes GameResult and emits ordered, display-ready events.
// Common header on every event; view-models switch on `kind` and SKIP unknown kinds,
// so adding finer granularity later is additive, never breaking.
interface FeedEventBase { gameId: string; seq: number; period: number; at: number }  // at = game-seconds
type FeedEvent =
  | (FeedEventBase & { kind: 'drive_start'; side: 'home' | 'away'; drive: number })
  | (FeedEventBase & { kind: 'drive_end';   side: 'home' | 'away'; drive: number;
                       end: DriveEnd; pts: number; conv?: Conv; oppPts: number; defTD: boolean })
  | (FeedEventBase & { kind: 'score';       side: 'home' | 'away'; kind2: ScoreKind;
                       pts: number; conv?: Conv; drive: number })
  | (FeedEventBase & { kind: 'period_end';  period: number })
  | (FeedEventBase & { kind: 'game_end';    homeScore: number; awayScore: number; ot: null | { periods: number; tie: boolean } });
interface GameFeed { granularity: 'drive'; events: FeedEvent[] }   // v1: 'drive'. Later: 'play' adds variants + bumps the string.
```
Fine-grained play events later = new variants of the same union plus a `granularity` bump; every existing view-model keeps compiling and skips what it doesn't know. The N2 brag-share contract (season-summary fields) can freeze the same way from `SeasonPayload` — one line from Claude and it is frozen. [D]

**ADR-7.** Feed v1 = `granularity:'drive'`, built from `GameResult.drives/events` as emitted today; play-by-play deferred with the deferral written into the contract; union extensible by variant + granularity bump.

---

## §6. What I need from Claude (so the executor seat has zero ambiguity)

**Minimum contract surface before I start Team Select + Season/Standings:**
1. **`AppState` + full `Action` union**, typed, including the season-flow actions (week advance, sim-to-end, plan editing when step 9 lands).
2. **The two screens' VM output types** (frozen projections): Team Select (what the screen reads: team list shape, availability, selection state) and Season/Standings (table, seeds, bracket, week results). Never raw engine types — the boundary IS the deliverable.
3. **Hydration contract:** boot phases (`'hydrating' | 'ready' | 'error'`), what `LOAD` does for a week save mid-season (re-derive standings from `scores`? trust `table`? — this one line changes what I persist), and where `saveStatus` lives.
4. **`DatasetLoader` signature + call time** (build-time default, startup-time user file, sync-after-init — the brief's ruling is clear; I need the exact TS and the no-file fallback UX ruling).
5. **Error/loading/empty conventions per screen** — one paragraph each is enough; the w70 batteries need them as assertions.

**Patterns in his reference slice that will be hard to replicate:** the draft's `settle()` pattern (what the user sees is always the state *restored from the log*, never the live mutated object) is elegant and draft-specific — the log-over-frozen-pool trick has no obvious season analogue. I need the equivalent statement for season screens: **what is re-derived on resume vs trusted from the payload** (e.g., standings recomputed from `scores[]` = always consistent; `prevRank` = trusted). If he specifies that per payload kind, the remaining seven screens are mechanical.

**Underspecified from the implementer's seat:**
- `WeekPayload.plan: Record<string, unknown> | null` — step 9's shape is a hole in an otherwise frozen envelope; I can't build the plan editor against `unknown`. A one-line placeholder type now (even `PlanState = { off: Plan; def: Plan } | null`) keeps the freeze honest.
- N2 brag share: fields of the season summary (crest, record, SB result, awards?) — one table line, then frozen.
- Profile panel: `core/profile.ts` v2 exists (`sim:profile`, per-sport blocks [V]); who writes `sports.nfl` and when (season end? every game?) is unwritten.
- Who owns re-pointing the w70 parity batteries at the rebuild — that's my instrument and I'll take it, but "visual parity with w70" needs his frozen VM contract to write assertions against, so it lands immediately after his slice.

---

## §7. Debt remediation — the numbers, then the rulings

**The 43 `Math.random` sites (re-counted this session on the w70 anchor, md5 re-verified `79c4a934…` [V]):**

| Band | Count | What lives there | Ruling |
|---|---|---|---|
| Embedded old sim (lines < 10,100) | **36** | `realisticScore`, `poisson`, `randNormal`, `cpuBias/Noise/Miss`, `weightedPick`, `shuffleArr`, `pickOL`, `defTDn`, `pickCarrier`, `victim`… | **Die with the shell.** The seeded engine already replaces every one: `colors/src` has **zero** `Math.random`/`Date.now` [V, Claude's grep + my suite run]. None are load-bearing for the rebuild. |
| Player-form/lineup (10,100–11,500) | **2** | `formBits` form rolls for display | **Die with the shell.** No form layer exists in the new engine (plans/teamIdentity replace it). |
| Celebration/cosmetic (≥ 11,500) | **5** | `firework` particles + confetti timer chain | **Re-seed, don't port:** rebuild keeps celebrations but draws them from a cosmetic fork of an engine Rng (cosmetic determinism, per debt-v1 #5's treatment). |

**Load-bearing for the rebuild: none.** The old sim math is not ported *as behavior* — the rebuild ports the *laws* (the standing regression batteries), not the random quirks. This matches the briefing's "do not attempt behavioral parity with the 43 Math.random quirks."

**The 5-item dunder shortlist — my rulings (executor ship-memory + v1/v2a evidence):**
1. **22 dunder flags:** ~7 are headless-verification gates (`__zpbQuietSim`, `__zpbSilent`, `__zpbLookIO`, `__zpb100View`, `__zpbStorageTest`, `__zpbFxSafety`, `__zpbFxPending`) — they die with the shell's own verify suites; the rebuild's tests target the new build directly (Vitest + Playwright). ~13 are cinema sequencing (`__zpbPoRunHold`, `__zpbSBFinPending`, `__zpbStoryHold`, `__zpbPrematchSeen`, `__zpbPoCineSeen`, `__zpbSBReplayHold`, `__zpbSBRewardOwed`, `__zpbSimRestRun`, `__zpbDraftDone`, `__zpbSeriesSteps`, `__zpbSetbackShown`, …) — they become store states, not flags. ~2 are style/fit caches (`__zpbAp1Gold`, `__zpbFitT`, `__zpbRetItems`) — VM fields. **None survive.** [I from ship memory — the exact per-flag map is v2b's job if the Owner wants the audit trail]
2. **E2E control ids:** don't port the ids; port the *receipts*. The old receipt suite couples to ~10 ids (CHRONICLE M-80 [R]); it dies with the shell. New Playwright tests get fresh `data-testid`s derived from the VM contract.
3. **Timers:** all 80 are presentation or persistence — cinematic pacing, sim pump, debounces. **Zero logic timers in the rebuild:** logic is engine-pure (no wall clock anywhere [V]), persistence is the storage module's write-behind, presentation timing lives in components driven by feed events.
4. **`zpb:base34` / `ZPB34`:** dead layer — v2a proved fresh boot writes zero keys and the w34 layer only *reads* its own stale writes [V]. With the no-migration ruling it is simply never read again.
5. **Old-save semantics:** discard — Owner ruled (no users, dev saves orphaned by design). Nothing in `zpbPlayerProfiles` is carried forward.

**The 185 `window.*` sites / ~40 globals:** **don't touch, and don't replicate.** The shell is a frozen parity anchor — editing it invalidates the md5 pins, the batteries, and the receipts. The cleanup is the *port mapping* (v2b/v2c tell each screen which globals it actually read), and the rebuild's rule is mechanical: `rg "window\."` in `colors/src` + components returns only browser-API references, enforced by a lint rule from day one. The existing inventory covers the recent waves (v1 anchored w68, v2a anchored w70 — the w55 phone laws and w70 fixes are inside the v2a anchor [V]); the refresh is **v2c** (per-wave diff w34→w70), scheduled, blocked on nothing.

---

## §8. N1 council exhibit — build plan for the six files (all four blockers now answered)

Kosi's four rulings map onto the outline's four open questions, so drafting is unblocked:

1. **Role names everywhere** ("Architect", "Executor", "Councillor") — seat names stay in the archive only. Applies to all six files, including quotes: paraphrase or bracket role names inside quoted material.
2. **Archive links (my call, confirmed as mine):** link the old repo root *plus* a curated trail — `BASELINES.md`, `CHRONICLE.md`, both debt inventories, the Model Report, the w70 artifact hash. Curated first, archive for the deep-divers.
3. **Full story:** the 20-0 context goes into `how-a-wave-ships.md` as color (the Owner demanded a mode; the endgame screen got its own contrast battery — charm + rigor in one paragraph), and the **message-loss incident** joins `incidents.md` (the paused chat that lost a session's LAST-KNOWN-STATE; recovered from `council/vl` + `council/uk` bytes — documented in START-OF-CHAT REV 15's header [V]). Framed exactly as Kosi says: early weaknesses shown plainly are the verification culture made visible.
4. **Cadence = long-term goals:** ship with the fresh repo's first commit (my standing recommendation), metrics file generated by CI at that moment — not hand-written, so it cannot rot.

**Build order:** `README.md` (the diagram + three laws) → `seat-protocol.md` → `how-a-wave-ships.md` (w70 as the worked example, carrying the w69 audit) → `incidents.md` (w69 ledger overclaim, message-loss, forkSeed tie-break golden shift) → `timeline.md` (hash-linked rows) → `metrics.md` (generator script last, so numbers are current at cutover). One session of drafting, receipts all exist. Safety pass before anything lands: no raw prompts beyond process illustrations, no credentials, no prompt-injection fodder. **Ready to build; no open questions.**

---

## §9. My overall take — unfiltered

**What's working, and I'd protect it:**
- **The seam.** Engine pure and seeded, envelope law strict, store framework-free, VMs as frozen projections. Every one of my proof scripts this session (sizes, order-independence, write costs) ran *through the public API* — the architecture is already earning its keep by making the executor's verification trivial. This is the thing the portfolio sells, and it's real.
- **The receipts culture.** Verified/inferred labels, hashed artifacts, audits that catch our own overclaims (w69), findings documents that say "ruling wanted" instead of silently tuning. Keep it — it's the difference between a portfolio and a confession.
- **Scaffold ahead of contracts.** CI, hashing, Releases, the `api/` skeleton — cutover day is now a merge, not a project.

**What's overcomplicated, say-it-to-your-face:**
- **Envelope field proliferation is sync-shaped complexity arriving a version early.** The brief wants `profileId, saveId, saveRevision, sport, engineVersion, datasetId, datasetHash, seed, savedAt, createdAt` + "authoritative state" on every save — for a product with one user, three slots, one sport, and no second writer until v1.1. My split: **add now** (free, never-shipped-publicly, no migration per Owner ruling): `saveRevision` (the queue and §3's merge need it), `datasetId` (my own §E.1), and recognize that `datasetHash` **already exists** — it's `dataVersion` ("hash of the sport's data files" per envelope.ts [V]); it needs the canonicalization spec, not a new field. **Defer to v1.1:** `profileId`, `saveId`, `createdAt` (the second writer justifies them; adding them now is ceremony). `seed` stays in the payload (every kind already carries it [V]) — the envelope *contract doc* lists it as a required payload field, which is honest without hoisting a sport-shaped value into a sport-neutral header.
- **Compression** — measured dead (§2). The 1 Nov council preference should be recorded as superseded-by-measurement, which is the system working, not an argument lost.
- **"Authoritative state"** needs one crisp definition, then the word retires: **it is the payload** — the frozen values + the log/seed from which the app materializes state (`DraftPayload` = seed + userTeam + full pick log + frozen pool; `WeekPayload` = roster + ratings + schedule + scores + plan + prevRank; `SeasonPayload` = materialized results). Not `rngState` (Claude's challenge: adopted — see the proof below), not a serialized engine snapshot.

**The determinism proof Kosi's §1 asked for — delivered, not asserted [M this session]:**
- `fork(label)` in `core/rng.ts` is `makeRng(seed ^ hashString(label))` — a **pure function of (seed, label)**; forking never advances the parent stream. Therefore game seeds are independent of simulation order.
- I ran it: five games simulated forward / reverse / shuffled from the same season seed — **byte-identical scores, drive lists, and team stats across all three orders** (script in the package: `tools/size/prove_determinism.ts`). Draft reconstruction from the pick log is already enforced by `restoreDraft` + the suite (272/272 on `aa6b561` [V]).
- **`runCounter` semantics, nailed down:** it is `WeekPayload.run` — the run-it-back counter; it feeds the schedule builder's year/prevRank so a new run gets new opponents, and it is restored/incremented per run-it-back. It does **not** touch game streams (each game's stream derives from seed + its schedule label). [V]
- **Save boundary:** between games — per-week preview saves, game atomic, `gameSeed` makes a refreshed week replay *the same game* (Owner's 1 Nov answer 1, implemented [V in saves.ts]). Stateful exceptions: none in v1 — no injuries/trades/mid-season roster moves exist; rosters are frozen at draft; the only cross-season state is `prevRank` + stats, both persisted. **Mid-game saves later:** the boundary is designed to allow it — a game is one pure call over one `Rng`; mulberry32 state is one `uint32` plus the Box-Muller `spare`, so a future `kind:'game'` checkpoint payload is additive (new kind, schema bump), never a format break. [V + I]
- **Draft pick log completeness [V]:** `DraftPayload` carries seed, userTeam, every pick **including CPU picks** in order, and the whole frozen pool — settings are compile-time config, pick order derives from seed + pool. Nothing else is read on resume (by construction in `restoreDraft`).

**What we're missing (the gaps I'd flag reviewing fresh):**
1. **The failure UX is specced as states, not as screens.** What does the user *see* on `saveStatus:'failed'` — where's the chip, what does the Guide say? One paragraph from Claude (or from me, his approval) and the battery can assert it.
2. **The parity batteries need a re-point plan.** They currently drive the *shell* artifact; the shell dies at cutover. If nobody owns re-targeting them at the rebuild before the shell goes away, "visual parity with w70" becomes unfalsifiable. I own the instrument; I need his frozen VM contract first (§6).
3. **The first-click-no-dataset experience is a design, not a fallback.** A hiring manager's first click with no ratings file must see a *designed* empty state (the DatasetLoader fallback the brief demands) — not an error, not a blank board. This is also §5-of-the-Claude-brief's licensing answer from the executor seat: the public default is **independently generated ratings** (build-time import), user-supplied file is the runtime path, the EA-derived CSV is mechanically excluded from the public build by living outside the public build inputs — a CI assertion that the build manifest contains no `madden27`/EA-named artifact, not just documentation. [D]
4. **Performance budget in CI** — still open from my w71 §A; one YAML block; turns "15 KB shell" into a regression-proof receipt.
5. **`plan` typing** (§6) — the one hole in the frozen envelope.

**Ideas that haven't come up:**
- **Golden feed fixtures:** record a handful of `GameResult`s (drives + events) as frozen fixtures; the N3 feed VM's tests run against them. The contract test and the regression battery are the same artifact.
- **The offline acceptance test as an automated Playwright recipe** (route interception → offline → full flow). It becomes a README line: *"the offline test runs in CI."* Studios feel that.
- **Storage-budget receipt:** the §2 table belongs in the repo README's numbers block — "measured, not guessed" is the brand.
- **Keep the old shell playable at the archive link** — the "before" picture of the 1.8 MB → 15 KB story, one click away.

**Direction overall:** right. The rebuild keeps the cultivated aesthetic, the engine is genuinely good math with genuinely good tests, and the sequencing (contracts → slice → port → sync → basketball) is correct. The two things I'd hold the line on: freeze the framework at the slice (the flip cost asymmetry is real), and ship `saveRevision` + `datasetId` now so v1.1 is a pure add. Everything else above is execution.

---

## (b) ADR index (this document's decisions)

| # | Decision | Status |
|---|---|---|
| ADR-1 | Svelte 5 + Vite + TS for all of v1; frozen at the slice; framework-separable contracts | Proposed → Kosi/Claude sign-off |
| ADR-2 | v1 storage = localStorage uncompressed behind async-native module; IndexedDB deferred | Proposed (numbers attached) |
| ADR-3 | No compression at v1 (supersedes 1 Nov council preference, by measurement) | Proposed |
| ADR-4 | Per-slot FIFO save queue + monotonic `saveRevision` + debounced write-behind + sync pagehide flush + `saveStatus` chip with retry | Proposed |
| ADR-5 | SW = precache-all, cache-first hashed / network-first navigation, skipWaiting+claim, versioned caches, update toast; offline merge = the sync mechanism; fifth sync law (auth failure never deletes local data) | Proposed |
| ADR-6 | OAuth (Google, PKCE in SPA, opaque revocable sessions) replaces pairing; `/v1/pair` deleted; six endpoints; D1 `(user_id, slot, rev)` | Proposed |
| ADR-7 | Feed v1 `granularity:'drive'` from `GameResult` as emitted; play-by-play deferred in-contract; extensible FeedEvent union (draft above) | Claude freezes, I draft |
| ADR-8 | Envelope now: + `saveRevision`, + `datasetId`, `dataVersion` = datasetHash with canonicalization spec; defer `profileId`/`saveId`/`createdAt` to v1.1; `seed` stays a required payload field | Proposed |
| ADR-9 | Authoritative state = the payload (frozen values + log/seed); `rngState` stays out | Adopted (Claude's challenge, my proof) |
| ADR-10 | N1 exhibit ships at repo cutover; role names; six files; metrics generated by CI | Ready to build |
| ADR-11 | Public data default = independently generated ratings at build time; EA CSV mechanically excluded by CI build-manifest assertion; designed empty state for no-dataset first click | Proposed |
| ADR-12 | Debt: shell frozen (don't touch), rebuild replicates none of it; dunder/window/timer rulings per §7 | Executor ruling |

## (d) Cuts list (minimum viable v1)

**Cut from v1:** compression (ADR-3) · IndexedDB (ADR-2) · `profileId`/`saveId`/`createdAt` on the envelope (ADR-8) · full replay (Owner ruling) · migration + `legacy.ts` at cutover (Owner ruling; its only caller today is its own test file [V]) · play-by-play feed (ADR-7) · quarterly/halftime saves (future-proofed for, not built — the boundary allows a `kind:'game'` checkpoint additively) · SvelteKit (ADR-1) · porting old E2E ids (receipts port, selectors don't) · N2 renderer (contract only) · adapter (died with the faithful-rebuild ruling).

**Cannot cut (the v1 floor):** seeded engine + invariant CI · envelope law with `saveRevision` + `datasetId` · localStorage module + queue + pagehide flush · service worker passing the offline acceptance test · Draft Board slice in Svelte 5 · Team Select + Season/Standings against the frozen pattern · w70 parity batteries re-pointed · data provenance + the no-dataset empty state · the five-state result taxonomy.

---

## Appendix — evidence for the [V]/[M] labels (all from this session, sandbox `aa6b561` worktree)

| Claim | Evidence |
|---|---|
| 272/272 tests pass on `aa6b561` | `npm test` in `colors/` — `tests 272, pass 272` |
| w70 parity anchor intact | md5 `79c4a934969d04e17f357e26ec6740e2`, 1,806,245 B (matches START-OF-CHAT §4 pin) |
| Save sizes table (§2) | `tools/size/measure_saves.ts` (this package) — builds `DraftPayload`/`WeekPayload`/`SeasonPayload` per `saves.ts` from the real 1,953-player pool + one full `simulateSeason` |
| Write cost (§2) | `tools/size/measure_write_cost.ts` — stringify 0.72 ms / parse 0.76 ms / gzip 4.86 ms on the 187 KB draft payload |
| Order-independence (§9) | `tools/size/prove_determinism.ts` — 5 games × 3 orders, identical per-game results; `fork()` purity read from `core/rng.ts` |
| Drive/ScoreEvent example (§5) | Same script — one `GameResult`: 24 drives, 11 scoring events, 4.5 KiB JSON; full 272-game season's results would be ~1.07 MiB (why saves prune them) |
| Math.random classification (§7) | ripgrep on the w70 anchor: 36 sites < 10,100 (old sim), 2 in formBits band, 5 in firework/confetti |
| `migrateLegacy` callers (§d) | `git grep migrateLegacy` — only `test/core/namespacing.test.ts` (no production caller yet) |
| Dataset size (§3) | `madden27-ratings.csv` 85,008 B raw / 27,483 B gzip; `player-ids.csv` 89,369 B |
| `dataVersion` = dataset hash slot (§9) | `core/envelope.ts` field comment; `core/hash.ts` = cyrb53 (53-bit, pure, sync) |
| Zero `Math.random` in `colors/src` | Re-grepped this session: **1 match total, a comment** in `core/rng.ts` line 2 ("never Math.random…"); zero actual uses of `Math.random`/`Date.now`/`new Date(` in engine or app code |
