SPEAKER: vl | ROLE: council advisor | TASK: transition-tools-brainstorm | DATE: 2026-11-05T18:43Z
FOR: — (open brainstorm, not a queue item; no ID claimed)

# VL council brainstorm: transition tools, engine + wave analysis, new council architecture

Labels: every claim is VERIFIED (ran it, receipt in text), REPORTED (someone else says so), INFERRED (reasoned, not run) or UNKNOWN. Engine citations are colors/src at origin/architect/engine-and-seats 425f72a (checked out in this worktree). w70 citations are /Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue-w70.html (1,806,245 bytes VERIFIED by ls; md5 79c4a934969d04e17f357e26ec6740e2 REPORTED from the task brief, not re-measured).

## 1. Tools the council should build for the transition and beyond

Each entry: what it does / who runs it and when / what it reads and writes / what breaks without it / rough size (lines / hours). Top three ranked at the end. All three are developer/CI tools — not Football-Sim-*.html — so any seat may build them; they land through review and the Architect integrates shared paths (AGENTS.md §5, §23). I (VL) can build all three.

### 1.1 Cutover queue-survival verifier (transition tool)
What it does: proves the queue survived the cutover to the fresh repo intact. Compares the old council/base against the new repo: task registry counts and ids (tasks/), inbox file ids and states, bulletin ids, PRIORITIES.md rows, and each in-flight item's evidence hash against its anchor build. Emits a survival report: counts per category, ids present/missing/changed, in-flight items with base_build_sha still valid.
Who runs it and when: the Owner or Architect, once, at cutover (first Colors v1 build); any seat may re-run it afterwards.
Reads: old tasks/, inbox/, bulletin/, PRIORITIES.md, BASELINES.md; new-repo counterparts.
Writes: one markdown survival report (exit non-zero if any in-flight id or evidence hash is missing).
What breaks without it: in-flight items silently dropped at cutover — the 23 Oct failure mode (339 modified files, 5 stashes, unpushed commits lost across worktrees) repeats with no way to tell what vanished.
Size: ~220 lines / ~6 hours.

### 1.2 Contract:check — modelWeights/slotWinsPerOvr quantisation verifier (CI gate)
What it does: verifies the protected contract that modelWeights() is the monotone quantisation of slotWinsPerOvr() — 700 scale, nearest 5, floor 5, error ≤ 2.5 per slot, no rank inversions beyond rounding ties — and flags any drift of the protected constants (DEFAULT_WEIGHTS/FLEX/NATURAL_SLOT_MAP/MC/PLAN_K/RATING_SPECS/teamRatings). Computes derivedWeights from colors/src/engine/value.ts:34 (slotWins20 / WEIGHT_UNIT_WINS) and compares each slot against slots.ts:21-54 (the Owner-approved table, REV 5) within 2.5 and without inversion. Outputs hash re-pin candidates for MERGE-MANIFEST.md.
Who runs it and when: CI on every colors/ change; a seat before touching any protected constant; the Architect before a build.
Reads: colors/src/engine/slots.ts, value.ts, specs.ts; MERGE-MANIFEST.md.
Writes: PASS/FAIL report plus per-slot measured-vs-table deltas; the same change must re-pin hashes in MERGE-MANIFEST.md if a constant moved (AGENTS.md §3).
What breaks without it: a protected constant changes silently; the hash re-pin is missed; the Owner's approved values drift (the weights table already differs from w70 — §2(b) — so this is the guardrail).
Size: ~250 lines / ~6 hours. I can build it from colors/src (no product HTML touched).

### 1.3 Save-envelope conformance tester + storage dump harness (developer tool)
What it does: loads a browser storage dump (localStorage/IndexedDB/JSON file), restores every envelope via envelope.ts:123 restore(), and reports per-envelope: ok/corrupt/newer-version, kind, slot, savedAt, dataVersion, payload validity (parsePayload), plus a storage enumeration (all keys). The conformance half asserts the envelope round-trip is byte-stable (serialize then restore equals input).
Who runs it and when: a seat debug-g save/load issues; on cutover to prove old envelopes still load; in the determinism bug-report replay harness (§1.6) as a pre-check.
Reads: storage dump + colors/src/app/envelope.ts (the contract; it imports nothing, envelope.ts:2).
Writes: a per-envelope report and a storage key list; never modifies storage.
What breaks without it: silent save corruption across schema/engine versions; cutover loads old envelopes into the new build with no way to tell which are corrupt.
Size: ~180 lines / ~4 hours. I can build it.

### 1.4 Outcome gate — calibrate + sweep (CI gate)
What it does: runs the Outcome Lab (colors/tools/outcomelab/sweep.ts) fixed + synthetic seasons and calibrate-draft.ts bands (greedy/top30/favorites/CPU), then fails if playoff/title rates or home-win% move outside calibrated bands. REPORTED baseline: at N=100 greedy 90%/20%, top30 38%/3%, favorites 20%/0%, CPU 8.4–8.6 (lane TEST 2). The 80%/25%/10% goals (skilled drafters: playoffs/title) are the Owner's goals; this gate keeps calibration honest as the engine changes.
Who runs it and when: CI per Colors change; nightly sweep (~10 min job, INFERRED from calibrate-draft.ts comments).
Reads: colors/tools/outcomelab/, bands.json (when it exists, §1.5).
Writes: pass/fail + drift report vs the last calibrated baseline.
What breaks without it: engine changes silently shift draft quality; the 80/25/10 goals become unverifiable claims.
Size: ~300 lines / ~8 hours (mostly wiring the existing Lab).

### 1.5 Calibration tooling: bands.json + sweep reader + conversion-curve reporter + Lab as a public page
bands.json: value, population, provenance, date per calibration point (who ran it, which commit, which seed bands). Sweep reader turns raw sweep results into a readable table. Conversion-curve reporter shows how a DraftConfig knob (topFloor/midFloor/kpFirstRound) moves playoff/title rates. Lab as a public page with a slider + streaming sweep results so anyone can watch a calibration land.
Who runs it and when: a calibration seat (none named yet — a role the council lacks, §3); bands are written when a knob changes, read by the outcome gate every run.
Reads: sweep outputs, DraftConfig (colors/src/engine/draft.ts:18-33).
Writes: bands.json, sweep tables, curve data; the Lab page is a static HTML mock-up ≤10 KB (inox rule).
What breaks without it: calibration becomes oral history; knob changes are unmeasured; the Lab stays an internal harness, not public evidence.
Size: bands.json schema + reader ~150 lines / ~4 hours; Lab page ~200 lines / ~4 hours.

### 1.6 Determinism bug-report replay harness ({seed, action log} → CI regression test)
What it does: takes a user's bug report (seed + the sequence of store actions) and turns it into a deterministic node --test case that replays the store (store.ts:59 createStore, dispatch) and asserts the post-state. Since the product has no injectable RNG yet (AGENTS.md §3: 56–58 Math.random() sites, no seed; task T-20261022-claude-2 for V23), this harness is the structural substitute: it replays actions, not random draws.
Who runs it and when: a seat triaging a bug report; CI runs the generated regression test.
Reads: the bug-report payload; colors/src/app/store.ts.
Writes: a test file in colors/test/.
What breaks without it: bugs are fixed by memory; regressions replay only by unseeded runs (AGENTS.md §3 forbids publishing before/after outcomes from unseeded runs).
Size: ~120 lines / ~3 hours.

### 1.7 Dataset validator + canonicalization checker (for Kosi's ratings)
What it does: validates a ratings file the Owner generates: format (name,pos,team,ovr,spd,str header, players.ts:21 regex), ranges (OVR 10–99 per data/README.md:4), duplicates by id = name\|pos\|team (players.ts:1 id rule), unknown positions against players.ts:13 ROLE map, and a canonicalization check (sorted, stable, sha256 dataset hash for the envelope dataVersion). It does NOT generate ratings — Kosi does that; this proves his are clean.
Who runs it and when: the Owner (or a seat on his behalf) whenever a new ratings file is produced; before dataVersion is stamped in an envelope.
Reads: data/madden27-ratings.csv (1,941 players, tracked, unmodified — VERIFIED via git ls-files); players.ts.
Writes: validation report + dataset hash.
What breaks without it: bad ratings silently enter saves; envelope dataVersion hashes a dirty dataset; AGENTS.md §7 (no invented/corrected data) has no enforcement.
Size: ~200 lines / ~5 hours.

### 1.8 Evidence-pack generator + decision-ledger generator + council telemetry (N1 / evidence tooling)
Evidence-pack: per-commit test count, E2E result, Lab run hash, diff summary — one artifact per build for the portfolio exhibit. Decision-ledger: turns council inbox decisions (proposed → accepted → implemented → verified → Owner-accepted, AGENTS.md §5) into a dated ledger. Council telemetry: catch-rate curves per seat (how often a seat's reviews catch defects) — needs the review-supply tracker.
Who runs it and when: evidence pack per build; ledger continuously from inbox/; telemetry quarterly or per round.
Reads: tasks/, inbox/, test outputs, Lab run hashes.
Writes: evidence-pack.md, decision-ledger.md, telemetry curves.
What breaks without it: the "council process as the portfolio story" (N1 goal) has no artifacts; the Architect's digest lacks a traceable record.
Size: ~300 lines total / ~10 hours.

### 1.9 CI gates: determinism gate (1000+ games), bundle-budget check (150 KB gzip), runes lint, offline airplane-mode test
Determinism gate: 1000+ simulated games with a fixed injected seed once the RNG lands (V23); before then it is structural only (function-body hashes, AGENTS.md §3). Bundle budget: gzip size of the single HTML ≤150 KB (Cloudflare Pages, MIT, free — product goal). Runes lint: Svelte 5 runes in colors/ (Vite 8.3.6 VERIFIED in lane TEST 1). Airplane-mode test: the app loads and saves with network disabled (offline-first tent test).
Who runs it and when: CI on product changes; bundle check on every Colors build.
Reads: the built HTML; engine output.
Writes: gate pass/fail.
What breaks without it: the single-file, offline-first, budget goals are unchecked; runes drift into invalid Svelte 5.
Size: ~150 lines total / ~5 hours.

### Ranked top three (all buildable by me)
1. Contract:check quantisation verifier (§1.2) — protects the irreversible protected constants; a missed re-pin is silent corruption.
2. Cutover queue-survival verifier (§1.1) — one shot at cutover; if in-flight items vanish there is no receipt of what was lost.
3. Save-envelope conformance tester + storage dump harness (§1.3) — ongoing save/load safety across the old→new boundary.

Everything else (§1.4–1.9) needs a seat to take it; none is blocked on me.

## 2. Engine + w70 code analysis, as it relates to the transition

### 2(a) Engine — origin/architect/engine-and-seats, colors/src/ (latest 425f72a)

What is READY for the transition:
- **AppState/Action union exists in store.ts** — colors/src/app/store.ts:16-21 defines AppState and Action = {START|PICK|UNDO|LOAD}; SaveRecord {seed, userTeam, picks} at store.ts:14; replay() at store.ts:39-57 rebuilds a draft deterministically from the record (forked rng per pick). Storage is injected via KeyValue (store.ts:89-90, SAVE_KEY '20-0:draft' at store.ts:90); parseRecord validates untrusted records (store.ts:27-36). VERIFIED by reading; store.test.ts:13-58 passes (5 tests).
- **Envelope contract complete** — colors/src/app/envelope.ts:1-135: Envelope {kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload}; SaveKind 'draft'|'week'|'season' (envelope.ts:6); WeekPayload at envelope.ts:34-46 (statsRecorded at :45); SeasonPayload at envelope.ts:48-57 (statsRecorded at :56); parseEnvelope/parsePayload/serialize/restore (envelope.ts:71-128); serialize rejects non-plain JSON (envelope.ts:116-135). VERIFIED by reading; envelope.test.ts:16-57 passes (round-trip byte-for-byte, newer-version verdict, corrupt-shape rejection).
- **Season runs to the Super Bowl** — colors/src/engine/season.ts:35-76 simulateSeason (32 teams, schedule, regular season, playoffs weeks 19-22, champion at :74); colors/src/engine/seasonrun.ts:39-77 startSeason/playWeek/fixtures with per-game stored integer seeds (gameSeed :47, "a refresh replays the SAME game"). VERIFIED by reading; season.test.ts and seasonrun-adjacent seeding tests pass in the suite run below.
- **Protected-constant surface exists** — colors/src/engine/specs.ts:9-84 (RATING_SPECS, DEF_SPECS, PERS_REC, MC at :67-70, PLAN_K at :61-64, RET_NEUTRAL 82 at :78); colors/src/engine/ratings.ts:41-60 teamRatings; colors/src/engine/slots.ts:21-54 the 32-slot Owner-approved weight table (REV 5; QB 1000; DL5 140 REV 4; TE3/WR4 10 REV 5); colors/src/engine/flex.ts:9-29 FLEX REV 4 (QB may flex ONLY to FS at -10 — Owner 29 Oct); colors/src/engine/lineup.ts:18 EMPTY_OVR=70, :32 WINS_PER_UNIT=0.00254/20, optimalLineup :36-64 (Hungarian), adviseLineup :93-105 — "the user's lineup is never changed by the engine; this only SUGGESTS" (matches the Owner's no-re-lineup rule). VERIFIED by reading.
- **Draft engine complete** — colors/src/engine/draft.ts:51-157: snake draft 32 teams × 32 rounds, cpuChoose :103-113 (bias/noise/miss, floor rule, Owner 31 Oct "within around 5 OVR" comment at :4), userChoose policies (greedy/top30/favorites :137-147), runDraft :150-157. DraftConfig at :18-33. VERIFIED by reading; store.test.ts exercises START/PICK/UNDO/LOAD/replay.
- **Recap/standings/awards surface** — colors/src/engine/recap.ts:90-164 buildRecap (chronological scoring, every turnover named, "2-Pt Conv", game ball, stars; no "expected"/"before kickoff"/"sudden death" in text per recap.ts:7); colors/src/engine/standings.ts:150-166 seedPlayoffs + full NFL tiebreaking; colors/src/engine/awards.ts:1-51 seasonAwards (mvp/opoy/dpoy/coach/leaders) EXISTS. VERIFIED by reading.
- **RNG fully seeded** — colors/src/engine/rng.ts:15-42 mulberry32 makeRng + forkSeed; "Every random draw in the engine goes through an Rng passed in, never Math.random" (rng.ts:1-2). VERIFIED by reading; store.test.ts:59-65 purity test asserts no Math.random/Date.now/DOM in src/app and it passes.
- **Theme table** — colors/src/engine/theme.ts + teamColors.ts: 32-team colour table (Owner's 22 Oct); tests pass ("the colour table covers exactly the 32 engine franchises, 3 valid hexes each", "32 teams x 82 tokens") — VERIFIED by the suite run below.
- **Test suite passes** — `npm test` in colors/ at 425f72a: **227 tests, 0 failures, ~7.7 s** (node --test --experimental-strip-types "test/*.test.ts"). VERIFIED by me just now. The Architect's cited "284 tests at 551af1b" (REPORTED in the brief) is stale relative to 425f72a — INFERRED that tests churned between commits.
- **Outcome Lab landed** — colors/tools/outcomelab/sweep.ts + calibrate-draft.ts; lane TEST 2 VERIFIED 440 seasons reproduce the 2026-11-04 baseline exactly (Mode A zero-sum exact, ppg 22.86; home-win and parity are pre-existing FAIL findings in colors/tools/outcomelab/FINDINGS-for-architect.md).

What is MISSING / not yet written:
- **appstate.ts does not exist** — colors/src/app/ contains only envelope.ts, selectors.ts, store.ts (VERIFIED via find). The "dual AppState/Action pairs (store.ts vs appstate.ts)" is half-built: store.ts:16-21 has the pair; appstate.ts is unwritten. Label: MISSING (UNVERIFIED whether a second store contract was ever planned beyond store.ts).
- **StorageModule is not implemented** — envelope.ts:1 calls it "the ONE contract between the engine/app side (writes payloads) and the storage module (moves envelopes)"; nothing in colors/src implements it. store.ts:89-90 injects KeyValue abstractly (localStorage in the browser, a Map in tests). VERIFIED absent.
- **Storage enumeration is missing** — no listKeys/allKeys/keys function exists anywhere in colors/src (VERIFIED absent by grep). Related to §1.3.
- **'dataset-changed' notice does not exist** — grep for dataset-changed/dataset-changed notices in colors/src found nothing; no producing action exists. It is a planned contract piece that was never written. VERIFIED absent (also absent in w70 — §2(b)).
- **FeedEvent union unwritten** — no FeedEvent type anywhere in colors/src (VERIFIED absent).
- **Hydration code unwritten** — no hydrate/rehydrate in colors/src (only svelte node_modules internals match "hydrat", VERIFIED excluded from grep).
- **tsconfig.json missing** — colors/ has build, node_modules, package-lock.json, package.json, src, test, tools (VERIFIED via ls); no tsconfig. Contracts (modelWeights monotone quantisation of slotWinsPerOvr, 700 scale/nearest 5/floor 5, error ≤ 2.5) are NOT type-checked; they are tested instead (matchup.test.ts:46-55 "the modelWeights contract"). Label: MISSING → contracts UNVERIFIED by a type-checker (AGENTS.md §2(a) item).
- **DatasetLoader absent; no "fictional fallback"** — grep for DatasetLoader/fallback in colors/src, colors/build, colors/tools found nothing (only flex.ts:27 "emergency fallback" comment about the flex guide). colors/src/engine/players.ts:16-29 parseCsv exists but is uncalled by any loader; nothing loads data/madden27-ratings.csv into the engine. Label: absent — good (no fictional fallback to remove) but also no real loader yet (UNKNOWN who writes it; not council's product code).
- **Season stat-book gap confirmed** — SeasonPayload (envelope.ts:48-57) has table, userResults, champion, userOutcome, statsRecorded: NO player stat book, NO awards, NO unit grades for the season review. awards.ts exists but is UNWIRED — grep for seasonAwards found no caller in colors/src (VERIFIED dead code pending season step-9 port). SeasonResult (season.ts:23-26) also lacks stat book/awards/grades. This is the WeekPayload/SeasonPayload stat-book gap.
- **Contradictions with the Owner's plan** — colors/src/view/draftBoard.ts:44-46 still emits `alsoFits` and draftBoard.ts:18 offers sort 'wins'|'ovr'|'priority' ("Value here" as a live sort); the Owner ruled "remove 'also fits'", remove "Value here" from every visual (kept only as background calculation), no dynamic colour on player names. VERIFIED in colors (engine view slice; will be re-done for the V23 product — INFERRED impact, not a blocker for the engine slice itself). Also drives.ts:249 contains a "// sudden death:" comment, violating recap.ts:7 / Owner style — VERIFIED.
- **colors/build/build.mjs exists** (esbuild bundle) but `npm run build` fails on a clean checkout — no entry point yet (REPORTED in lane TEST 1; expected; Draft Board slice brings it). Build entry: UNTESTED/UNKNOWN.

Suite receipt: `npm test` → 227 pass / 0 fail (ran in /Users/kosi/Desktop/wt/vl/colors at 425f72a; output tail showed "tests 227, pass 227, fail 0, duration_ms 7738"). VERIFIED.

### 2(b) Latest wave file — w70 visual parity anchor (Football-Sim-Z-post-blue-w70.html, 1,806,245 bytes, VERIFIED by ls)

Extracted main script to /tmp/w70-main.js (1,269,900 bytes, 501 unique function names, all `zpb*` prefixed). 60 Math.random() sites (VERIFIED by grep -c) — consistent with AGENTS.md §3's 56–58 product-wide estimate (REPORTED).

What in w70 MUST survive into Colors (grounded in the file):
- **Game-play animation** — zpbGameReplay at w70:833 and w70:963 (two definitions), invoked at w70:5662 and w70:5698-5700 (the Super Bowl replay: "the user SEES the Super Bowl played — the during-game cinematic leads and the winner storm waits for the final whistle", w52 Owner). Maps directly to V23-OWNER-REQUESTS #1 (30–60 s, Skip disappears at the end, centre graphic stays until CONTINUE). VERIFIED.
- **Season/playoffs sim doors + season review** — zpbSimRestOfPlayoffs at w70:6128 (w66 Owner: "the one SIM PLAYOFFS door runs the whole rest itself"); simSeasonBtn at w70:8947; zpbSeasonStoryHTML at w70:6158, rendered at w70:6290 ("the Regular Season Review panel … sits ABOVE the badges", w32 Owner) and w70:8474 ("the end-of-season badges play one by one the moment the season ends"). VERIFIED.
- **Draft completion** — NEW DRAFT button w70:8947; processUntilUserTurn (CPU automation until the user's turn); zpbDraftRecover at w70:3567 (error boundary); zpbDraftBreakdownHTML at w70:8913 (w26 badges breakdown); __zpbDraftDone at w70:8845-8846 (w36 Owner: one finish, no re-finish under the user's feet); zpbDraftGuideHTML at w70:2217. Draft completes 32 teams × all rounds. VERIFIED.
- **70→90 slot-wins column + Guide tier viz** — zpbSlotWins70to90 at w70:17 (`ZPB_SLOTS_W[s]*0.00254`), used at w70:7342 and w70:7411 (w65 Owner: the 70→90 column wears the new weights). Matches colors WINS_PER_UNIT (lineup.ts:32) and slotWins (value.ts:25). VERIFIED.
- **modelWeights() quantisation contract already exists in w70** — w70:25-28 quantises ZPB_SLOTS_W to a 700 scale, nearest 5, floor 5 (`Math.max(5, Math.round(ZPB_SLOTS_W[k]/mx*700/5)*5)`) — identical contract shape to Colors' protected contract. VERIFIED. (Colors has slotWins/slotWins20/derivedWeights in value.ts:25-36 but no modelWeights() function — §2(a) MISSING.)
- **Flex/effOvr/optimal lineup analogs** — w70:2860 flexPenaltyFor(pos,slot); w70:2865 effOvr = player[3] - flexPenaltyFor(player[1],slot); w70:3113 lineupWins; w70:3134-3143 Hungarian cost matrix. Colors equivalents: flex.ts, lineup.ts (hungarian.ts). VERIFIED analog.
- **Overtime rule** — w70:4370 `if(homeScore===awayScore && (isPlayoff || Math.random()>0.08))` (both teams possess in regular season; sudden death after; tie possible) — matches colors drives.ts:212-262. VERIFIED.

What DIES with the shell (w70-only, replaced by Z.ai's shell + Colors view-layer contracts — boardVM/rosterVM/selectors):
- All zpb* DOM/render machinery: zpbPreviewStripHTML, zpbSeasonStoryHTML (as DOM), zpbDraftGuideHTML (as DOM), zpbTeamLogo/zpbTeamCell/zpbTeamChips, zpbTint/Shade/Mix/Lum/Hsl/Hex/Rgb/Rgba, zpbFxGate/FxDrain/FadeScan, zpbStartDraftWatchdog/zpbStopDraftWatchdog. VERIFIED by grep of /tmp/w70-main.js.
- w70 localStorage keys 'zpb:theme', 'zpb:base34', 'zpb:tab' (w70:2179-2194) — Colors uses its own save key (store.ts:90 '20-0:draft') and envelopes; theme persistence is not yet in Colors. VERIFIED.

What w70 does that the contracts don't cover yet:
- **FeedEvent union, hydration code, StorageModule enumeration, 'dataset-changed' notice** — NOT FOUND in w70 (grep clean) AND absent in colors (§2(a)): none of these exist anywhere yet. They are Colors-side planned work (see §1).
- **Real rosters: names yes, teams NOT established** — w70 embeds TEAM_DATA at w70:4 keyed by 32 real team names with real player names (Joe Burrow, Patrick Mahomes, Ja'Marr Chase …), but samples are not real NFL rosters: Myles Garrett (DE1, ovr 99) sits on the Los Angeles Rams alongside Aaron Donald (DT1, 95); DeMarcus Lawrence on Seattle; Micah Parsons DE1 on Green Bay. Provenance of these assignments is UNKNOWN — not established as real rosters, so they must NOT be ported. Colors' real-names source is the Owner's data/madden27-ratings.csv (1,941 players, name,pos,team,ovr,spd,str; tracked and unmodified — VERIFIED via git ls-files; data/README.md:8 documents the 28 Oct correction to 1,941). The engine's players.ts parseCsv expects exactly that header (players.ts:19). INFERRED: w70's embedded dataset satisfies neither the real-teams requirement nor the Owner-supplied dataset rule (AGENTS.md §7); the transition must use data/madden27-ratings.csv plus a loader that does not yet exist (§2(a), §1.7).

## 3. New council architecture: proposals for delivering the new goals

The council was built for one HTML file and waves. The work is now slices, contracts, a fresh repo, and a portfolio exhibit (N1). Current shape does not fit unchanged. Proposals:

### 3.1 Queue mechanics: slice as the unit of work; review depth by risk
Replace "wave" as the unit of work with **slice** (engine slice / view slice / contract slice / doc slice). Review depth scales with risk, not with a flat "three reviews":
- **Contract/engine slices** (touch protected constants or colors/src): ≥ 2 reviews, at least one by a seat that read the relevant colors/src file with a command receipt; runs `npm test` + contract:check (§1.2) as evidence.
- **UI/view slices**: 2 reviews by visual seats; mock-up ≤ 10 KB static HTML (inox rule).
- **Docs/tooling slices**: 1 review; trivial changes → `git diff` review (AGENTS.md §9 tiers).
Also: auto-retire P0/P1 items that target the Pre-Colors shell (the "83 reviewed P0s aimed at a file being replaced" waste — AGENTS.md §2 build truth says Pre-Colors is the anchor; once Colors v1 builds, shell-targeted reviews are dead work). What breaks if not changed: review supply keeps burning on soon-dead code (the 49 NEEDS-REVIEW backlog) while slices stall for want of the right reviewer.

### 3.2 The Architect bottleneck — protect the rule, route around it for tools
Keep **"only the Architect builds" Football-Sim-*.html** (AGENTS.md §23) untouched — that rule is the integrity boundary. But tools, gates, specs, snippets, and mock-ups are **not product code**; any seat may implement them, and they land through review (two reviews = REVIEWED), with the Architect integrating shared paths — he does not re-implement them. What breaks when Claude stalls: by design (AGENTS.md §27) only the product build waits; everything else continues. The route around the stall is therefore **complete, tested submissions** (node --check receipt, test receipt) so integration is a merge, not a rewrite; and **digest flagging** of stalled items so the Owner knows the build is the blocked path. What breaks if not changed: seats treat the Architect as an implementer for tools, violating §23 and creating the single-point-of-failure the 23 Oct outage showed.

### 3.3 Seat availability — nothing waits; age-out and retire aggressively
Status quo is correct here and must stay: nothing may wait for a particular seat (AGENTS.md §25); scarce seats (Pickle) and new seats (MIMO) take items exactly like everyone else. P2/P3 items age out after 21 days; Owner's P0/P1 need two seats or the Architect (AGENTS.md §5). At cutover, retire all shell-targeted items (§3.1). What breaks if not changed: the queue rots around unavailable seats (the roster already shows retirements — MiniMax, MOC, GLM, Nemo Ultra, Nemotron 3 Ultra retired 23 Oct per COUNCIL-BULLETIN.md M-20261023-a).

### 3.4 Digest: conditional, not mandatory
The mandatory every-chat digest costs tokens for no work. Proposal: the digest is required only when the seat shipped work, changed the queue, or received an ASK in that chat; otherwise a one-line bulletin note ("no work this session") suffices. The Architect still reads `node tools/council.mjs digest` at chat start when it exists. What breaks if not changed: digest churn disguises real signal; seats avoid short chats to dodge the digest (contrary to AGENTS.md §11 chat-length discipline). Label: rule change proposal (AGENTS.md §4/START-OF-CHAT practice) — Owner/Architect decision.

### 3.5 Cutover: council home — freeze council/base, carry the registry into the fresh repo
The task brief cites bulletin 20261105-1804-muse.md for the council-home discussion. That file was **not found** in `bulletin/` (glob *muse* returned nothing; muse's bulletin holds only README.md; muse's lane-commit a4395889 is local-only and preserved via preserve/council-muse-a4395889). The council-home question is therefore still open; my answer:
- **Option chosen:** cutover happens at the first Colors v1 build; `council/base` is tagged read-only archive (never deleted — it holds the two-history note); the council lives in the fresh repo under `council/` with seats on `council/<seat>` branches created by the Owner's `tools/new-seat-worktree.sh` from the new base.
- **What moves:** PRIORITIES.md ranked briefs, tasks/ registry (one JSON per item, AGENTS.md §5), BASELINES.md pins, inbox/ conventions, bulletin/ convention (new entries as files), COUNCIL.md protocol, the tools/ gate set (lint.mjs, preserve.mjs, council-sync.mjs, post-merge-smoke.mjs).
- **What freezes:** council/base and origin/main as they are (two histories, roots 474eb52 vs 268fd56 — AGENTS.md §2; they do not merge cleanly; the Architect reconciles with one unrelated-histories merge when Colors v1 ships). No build copies in the root (AGENTS.md §2 naming rule).
- **N1 exhibit preserved:** the Pre-Colors anchor (Football-Sim-PreColors.html, sha256 40233d6be00e987c, 657,486 B), the two-history fact, the task registry with states/evidence, and this very brainstorm's evidence — the portfolio story needs the receipts, not just the build (AGENTS.md §9: every change ships with a receipt). What breaks if not changed: the council has no home after cutover, in-flight items have no registry to survive in (§1.1), and the N1 exhibit has no preserved evidence chain.

### 3.6 New roles the council lacks (role descriptions, not seat assignments — no naming per AGENTS.md §25)
- **Tooling maintainer:** owns tools/ across seats (lint.mjs, preserve.mjs, gates, Outcome Lab wiring). What breaks if missing: tools rot, gates go unreviewed, the 150 KB bundle budget and determinism gate have no owner. (Candidate owner: whoever built §1.2–1.3.)
- **Calibration lead:** owns bands.json (§1.5), the sweep reader, and the Lab slider page; keeps the 80%/25%/10% goals measurable. What breaks if missing: calibration drifts unmeasured; "skilled drafters hit 80% playoffs" stays a claim.
- **Exhibit editor:** owns the N1 portfolio narrative — evidence packs (§1.8), decision ledger, the cutover survival report. What breaks if missing: the council process is not a portfolio exhibit; the Architect's digest lacks a traceable record.

None of these names a seat; they are lanes any seat can take from the queue.

## Receipts for this brainstorm
- `git fetch origin` → origin/council/GH forced-update + new council/gh (output captured above).
- `pwd; git branch --show-current; git rev-parse --git-common-dir` → /Users/kosi/Desktop/wt/vl, council/vl, /Users/kosi/Desktop/Football Sim/.git.
- `git show origin/council/base:tools/sync-base.sh | sh` → "up to date with council/base (1b91f50e)".
- `node tools/preserve.mjs check` → my worktree vl: 0 dirty, 0 unpushed, OK; local-only commit 38ca4524 (vl-vite-test, Outcome Lab scratch) saved to preserve/council-vl-vite-test-38ca4524 via `node tools/preserve.mjs commits`; re-check shows vl clean (exit=1 only from other seats' dirty trees, which I must not touch per AGENTS.md §4.4).
- `git show origin/architect/engine-and-seats:tools/council.mjs > /private/tmp/council.mjs` → exported v8 protocol; `node /private/tmp/council.mjs next` → REVIEW items P-032..P-038 for vl (P2 reviews, 1 done each).
- `sed -n '2387,12017p' w70 > /tmp/w70-main.js` (1,269,900 bytes); `grep -c 'Math.random()'` → 60 sites.
- `npm test` in colors/ at 425f72a → 227 pass / 0 fail (~7.7 s).
- `git ls-files data/` → all 5 data files tracked; `git status --short data/` → clean.
- All engine file citations read directly: store.ts:1-96, envelope.ts:1-135, draftBoard.ts:18-46, season.ts:35-76, seasonrun.ts:39-77, specs.ts:9-84, ratings.ts:41-60, slots.ts:21-54, flex.ts:9-29, lineup.ts:18-105, draft.ts:18-157, rng.ts:15-42, recap.ts:90-164, standings.ts:150-166, awards.ts:1-51, drives.ts:212-262 (+:249 comment), value.ts:25-36, players.ts:16-29, league.ts:1-18, matchup.test.ts:26-55.
