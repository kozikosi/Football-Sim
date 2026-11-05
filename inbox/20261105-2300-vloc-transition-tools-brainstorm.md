Seat: VLOC · Model: Nemotron 3.5 Super VL Free (OpenCode) · Branch: council/vloc · Date: 2026-11-05
Brainstorm answer to the council-wide transition request (three numbered sections). All claims labelled VERIFIED / REPORTED / INFERRED / UNKNOWN with file + line or command + output where run.

================================================================================
SECTION 1 — TOOLS THE COUNCIL SHOULD BUILD
================================================================================

Each entry: what it does / who runs it and when / what it reads and writes / what breaks without it / rough size (lines / hours). Top three ranked first.

--- Rank 1: cutover-verify (queue-survival proof) ---
What it does: reads the old repo's `_agents/PRIORITIES.md`, every `inbox/` file, every `bulletin/` file, `COUNCIL.md`, `BASELINES.md`, and `CHRONICLE.md`; emits a machine-checkable manifest (counts, sha256 of each file, item IDs, state of each item, open retire ops). Run against the fresh repo after cutover to prove nothing was lost or mangled.
Who runs it / when: any seat, immediately after cutover (before seats resume taking work). The Architect reviews the manifest.
Reads: old repo `_agents/PRIORITIES.md`, `inbox/*`, `bulletin/*`, `COUNCIL.md`, `BASELINES.md`, `CHRONICLE.md`. Writes: `tools/cutover-manifest.json` + a human summary.
Breaks without it: no provable answer to "did the queue survive the move?" — seats re-open closed items, re-litigate reviewed items, and the N1 exhibit loses its evidence chain.
Size: ~180 lines / 3–4 hours. I can build this (it's pure file reading + hashing; I already run council tool output against the repo).
VERIFIED: the queue lives in `_agents/PRIORITIES.md` (ls-tree confirmed on origin/architect/engine-and-seats) and council tool reads inbox/ + bulletin/ from council branches (tools/council.mjs lines 159–166).

--- Rank 2: outcome CI gate (draft-model regression guard) ---
What it does: runs `colors/tools/calibrate-draft.ts` at N=100/300 + `colors/tools/outcomelab/sweep.ts`, compares to the bands I just measured (greedy playoffs 88–92% @300, title [15–25] @300; CPU r1-4 gap ≤ 5 OVR), fails CI when a model change moves any band outside tolerance.
Who runs it / when: CI on every change to `colors/src/engine/draft.ts`, `season.ts`, or `slots.ts`; also nightly at N=1000 for tighter bands.
Reads: `colors/tools/calibrate-draft.ts`, `colors/tools/outcomelab/sweep.ts`, `colors/src/engine/draft.ts`. Writes: PASS/FAIL + band report (stdout + JSON artifact).
Breaks without it: draft-model regressions (CPU bottom too easy/hard, user title rate off target) ship silently; the Owner's 31 Oct targets become unenforceable.
Size: ~300 lines / 1 day (partially done — I measured the N=100/N=300 bands and knob effects in this session; the sweep side needs `outcomelab/sweep.ts` wired in).
VERIFIED: `calibrate-draft.ts` runs (I ran it at N=100/N=300); `outcomelab/sweep.ts` exists on origin/architect/engine-and-seats:colors/tools/outcomelab/sweep.ts with sweep-results.json and model-report-2026-11-04.md alongside.

--- Rank 3: ratings-validator (dataset intake gate for Kosi) ---
What it does: validates the ratings CSV Kosi will generate — column format (name,pos,team,OVR,SPD,STR), OVR/SPD/STR ranges (5–99), duplicate player IDs, team-slot coverage (32 teams × all slots), missing values. Emits PASS/FAIL + a hash of the clean file for pinning.
Who runs it / when: Kosi (or any seat), before any ratings file enters `colors/data/`. Must pass before the draft engine can consume it.
Reads: the ratings CSV. Writes: validation report (stdout + JSON), the file's sha256 for `MERGE-MANIFEST.md` pin.
Breaks without it: bad/duplicate/out-of-range ratings enter the build silently; draft balance and team ratings become un-auditable. The Owner's rule — no invented or silently corrected factual data — has no enforcement point.
Size: ~220 lines / 4–6 hours. I can build this.
INFERRED: dataset columns per AGENTS.md §7 (name, pos, team, OVR, SPD, STR) and 32 teams per AGENTS.md §2 (Owner's 22 Oct colour table); exact range limits not yet specified by Owner → treat 5–99 as a proposed default, flag for Owner confirmation.

--- Also proposed (not ranked): ---
4. Determinism gate — 1000+ seeded games, same seeds → identical results; fail on any drift. Reads engine + season sim; writes PASS/FAIL. ~150 lines / 3 hours. The product has 56–58 Math.random() sites (AGENTS.md §3) — without an injectable RNG this is structural-only until T-20261022-claude-2 lands.
5. Contract:check — scans the UI layer for every field it reads from the envelope/payload and checks the engine produces it; catches "VM field the UI reads but the engine doesn't produce." Reads `colors/src/sports/nfl/app/*` + `colors/src/core/envelope.ts`; writes mismatch report. ~250 lines / 6 hours.
6. Bundle-budget check — gzip size of the shipped Colors bundle ≤ 150 KB; fail CI over budget. Reads `vite build` output; writes size report. ~60 lines / 2 hours.
7. Runes lint — Biome on `tools/` + council tooling only (root biome.json excludes HTML per AGENTS.md §9). ~30 lines / 1 hour.
8. Offline airplane-mode test — loads `colors/index.html` with network blocked, verifies save/envelope works via memory fallback, no console errors. ~100 lines / 3 hours.
9. Conversion-curve reporter + Lab public page with slider — exposes `colors/tools/outcomelab/sweep.ts` results as a browsable page; slider sweeps a DraftConfig knob and shows band movement. ~400 lines / 2 days.
10. Evidence-pack generator — per-commit: test count, E2E result, Lab run hash, diff summary. ~120 lines / 4 hours.
11. Decision-ledger generator — renders `_agents/owner-notes/*` + PRIORITIES decisions into a searchable ledger. ~150 lines / 5 hours.
12. Council telemetry — catch-rate curves per seat (NEW/FOUND per review) from council tool output; shows review-supply health. ~100 lines / 3 hours.
13. Seed-share URL (?w=…) — shareable seeded-draft link. ~80 lines / 3 hours (UI-adjacent; Architect integrates).
14. Determinism bug-report replay harness — {seed, action log} → CI regression test. ~180 lines / 6 hours.
15. Save-envelope conformance tester — round-trip RunState → WeekPayload → RunState via `colors/src/sports/nfl/app/weekmap.ts` across seeds. ~200 lines / 6 hours.
16. Storage dump harness — inspects localStorage/envelope contents for debugging. ~80 lines / 3 hours.
17. Queue-health dashboard — live view of PRIORITIES states + inbox ops + review counts. ~200 lines / 8 hours.
18. Review-supply tracker — flags items approaching auto-retire (14d warn / 21d stale). ~60 lines / 2 hours.
19. Retire-proposal helper — generates a `retire` op file with evidence pre-filled. ~40 lines / 1 hour.
20. Digest summarizer — condenses `council.mjs digest` output into a one-line headline for the Architect. ~50 lines / 2 hours.

================================================================================
SECTION 2 — CODE ANALYSIS: ENGINE + LATEST WAVE (w70)
================================================================================

All file:line citations are to `origin/architect/engine-and-seats` unless noted. w70 = `origin/gh-pages:Football-Sim-Z-post-blue-w70.html`, VERIFIED md5 79c4a934969d04e17f357e26ec6740e2, 1,806,245 bytes (matches the task's stated hash/size).

--- (a) Engine: ready / missing / contradicts / dead / untested ---

READY FOR TRANSITION:
- Save envelope contract is complete and typed: `colors/src/core/envelope.ts` — SaveMeta (saveId, saveRevision, createdAt, engineVersion, dataVersion), Envelope<S,K,P>, parseEnvelope (outer validation incl. schemaVersion/newer-version), serialize + assertPlain (rejects undefined/NaN/Map/Set). VERIFIED by reading the file.
- Saver autosave queue: `colors/src/core/saver.ts` — strict FIFO per slot, newest-wins, at-most-one-in-flight, bounded retry (default 2), SaveStatus the UI can show. VERIFIED.
- E3b week seam: `colors/src/sports/nfl/app/weekmap.ts` — toWeekPayload/fromWeekPayload mapping RunState <-> WeekPayload; gameSeed checked on load; seeding/champion recomputed (not stored). VERIFIED by reading the file.
- Draft store: `colors/src/sports/nfl/app/store.ts` — AppState/Action union, frozen-pool log, settle/restore pattern, Undo = cut pick log. VERIFIED by reading the file.
- Season store: `colors/src/sports/nfl/app/appstate.ts` — AppState/Action with boot/LOAD/SAVE/PICK/PLAY_WEEK/RUN_IT_BACK/NEW_GAME; Screen/Phase/SlotName/PlanState types. VERIFIED by reading the file.
- Payload shapes: `colors/src/sports/nfl/app/saves.ts` — DraftPayload, WeekPayload, SeasonPayload, FrozenPlayer, parsePayload with inner validation. VERIFIED by reading the file.
- Test suite exists: 34 test files under `colors/test/` (draft, store, weekmap, envelope, saver, seasonrun, resume-determinism, purity, …). VERIFIED via ls-tree.
- StorageModule interface: `colors/src/core/app.ts` — read/write/remove only (no enumeration). VERIFIED by reading the file.

MISSING / GAPS (each VERIFIED absent by reading the cited file):
1. tsconfig.json does NOT exist anywhere in the branch. `git ls-tree -r ... -- '*.json' | grep tsconfig` → none. Contracts are UNVERIFIED by a type-checker. Type errors would surface only at runtime/esbuild.
2. 'dataset-changed' notice kind declared at `appstate.ts:31` but NO action produces it anywhere I read (store.ts, appstate.ts, saves.ts, envelope.ts, saver.ts, app.ts, weekmap.ts all lack it). It's a dead notice kind — the UI can show it but nothing ever sets it.
3. FeedEvent union: not present in any engine file I read. The task notes it as unwritten; confirmed absent from app.ts/appstate.ts/store.ts/saves.ts.
4. Hydration code: not present in any engine file I read. No boot-to-saved-state restore path beyond LOAD_OK/LOAD_EMPTY/LOAD_FAILED actions (appstate.ts) with no service implementation to dispatch them.
5. StorageModule has no enumeration (read/write/remove only, app.ts). A "storage dump" tool or "list all saves" UI cannot be built on this interface alone.
6. WeekPayload/SeasonPayload have no player stat book, awards, or unit grades (saves.ts). SeasonPayload has table/w-l/pf/pa and userOutcome but no per-player stats, no awards, no unit grades — the season-review page cannot show these from the payload alone.

CONTRADICTS THE PLAN:
7. DatasetLoader bundled source is the "bundled fictional seeded league" per the comment on `colors/src/core/app.ts` (DatasetLoader interface + LoadedDataset with source: 'bundled' | 'user'). The Owner's real-names ruling (AGENTS.md §7, V23-OWNER-REQUESTS) requires real player names + real teams with non-EA ratings. A fictional bundled dataset directly contradicts that ruling until Kosi supplies real data and the loader switches source.
8. The DatasetLoader interface exists but has no implementation I could find in colors/src/. The bundled path is fictional; the user-CSV path is described but not coded.

UNTESTED / DEAD CODE:
- No dead code identified from the files I read; all engine files appear actively used by the store/season/weekmap layer.
- Untested areas (no test file I can confirm covers them): the 'dataset-changed' notice (no producer), StorageModule enumeration (doesn't exist), hydration (doesn't exist). The 34 test files cover draft/store/weekmap/envelope/saver/season but not these gaps.

--- (b) w70: what MUST survive / what dies / what contracts don't cover ---

w70 is the visual parity anchor (VERIFIED hash/size). It contains 1442 function/arrow definitions (grep counted 1442 "function"/"=>" lines). Key named functions VERIFIED by grep: boardEntries, computeScore, modelWeights, DEFAULT_WEIGHTS, ZPB_SLOTS_W, applyOffPlan, applyDefPlan, advanceWeek, advancePlayoffRound, render, buildControls, bestWorst, getSynergy, showTeamDetail, plus TEAM_DATA with real NFL team names and real player names (e.g. "Matthew Stafford", "Puka Nacua", "Patrick Mahomes" — seen in the file content).

MUST SURVIVE into Colors:
- modelWeights() → the 700-scale quantisation contract (monotone, nearest 5, floor 5, error ≤ 2.5/slot, no rank inversions). Protected constant per AGENTS.md §3. w70's DEFAULT_WEIGHTS (line ~2397) and modelWeights() (line ~2411) are the reference implementation.
- boardEntries() / render() — draft-board rendering; the draft board is a core Colors view.
- computeScore() / getSynergy() — team rating math; w70's version uses slot weights × OVR with synergy penalties (run/pass/passGame).
- Real NFL names + teams in TEAM_DATA — the real-names ruling requires this data shape to continue.
- ZPB_SLOTS_W slot weights (line ~2402) — the reference slot-value table behind the weights rebalance work (P-140).

DIES WITH THE SHELL:
- The monolithic single-file structure (w70 is one 1.8 MB HTML; Colors is esbuild-bundled TS, per colors/package.json: build = vite build).
- Inline DOM manipulation / event listeners scattered through w70 (buildControls, showTeamDetail attach listeners directly) — Colors uses store + view-model separation.
- w70's DEFAULT_WEIGHTS object literal (line ~2397) is the *old* weights table; Colors will use its own DEFAULT_WEIGHTS (protected constant, possibly recalibrated per P-013/P-140).

WHAT w70 DOES THAT CONTRACTS DON'T COVER YET:
- Season review with player stats, awards, unit grades — w70 renders these (accumulatePlayerStats, awardPatternsHTML, advancedStatsHTML seen in grep) but WeekPayload/SeasonPayload (saves.ts) have no stat book, awards, or unit grades. The contracts cannot reproduce w70's season review.
- w70's applyOffPlan/applyDefPlan (game-plan application) — not yet in Colors engine (plans.ts exists on the architect branch but its relationship to w70's game-plan logic is unverified).
- w70's advanceWeek/advancePlayoffRound — season advancement logic; Colors has season.ts/seasonrun.ts but whether w70's playoff-round semantics map 1:1 is unverified.
- w70's bragCopy / share functionality — Colors has no share/brag tooling yet (P-209 covers this as a spec, not code).
- No StorageModule enumeration in Colors (read/write/remove only) — w70 may list saves; Colors can't without adding enumeration.

================================================================================
SECTION 3 — NEW COUNCIL ARCHITECTURE
================================================================================

--- 3.1 Queue mechanics: slices, not waves ---
The council was built for one HTML file and waves (P-items targeted Football-Sim-*.html). Colors v1 is built slice by slice (draft board slice, Team Select slice, Season/Standings slice, …) plus contracts. Proposal: make the *slice* the unit of work, not the wave.
- Replace "the file being replaced" framing: P-items should target a slice (e.g. "draft board slice") with a defined acceptance (view model + store integration + test), not a monolithic build.
- Review depth by risk: contracts (envelope, weekmap seam) need 2 reviews + Architect type-check; UI slices need 1 review + visual check at 390 px; docs need 1 review.
- What breaks if not changed: P-items keep targeting a product file that no longer exists as a single HTML; reviews become meaningless because nothing integrates into one file.

--- 3.2 Routing around the Architect bottleneck ---
Claude is sole implementer AND integrator for shared tools. When he stalls, the whole queue stalls (the digest only helps if he can act). Proposal: seats must submit *complete, review-ready* deliverables — a tool with its test, a spec with anchors, a mock with measured 390 px behavior — so the Architect's job is pure integration, never origination.
- The council.mjs writers already produce single-file inbox outputs; extend this so every tool submission includes `npm test`-style verification output (receipt) attached.
- Architect integrates shared paths (colors/tools/, colors/src/core/) but never writes the first draft of a tool.
- What breaks if not changed: every tool idea in Section 1 waits on Claude's implementer time; the council becomes a commentariat, not a builder.

--- 3.3 Seat availability / scarcity ---
Pickle is scarce (Pre-Colors anchor keeper, limited availability); MIMO is new (needs onboarding). Proposal: no item waits on a scarce seat. If Pickle is the only one who can verify a hash, the item is BLOCKED on Pickle, not dropped; other seats keep moving on non-Pickle items. New seats (MIMO) pair on one small tool (e.g. retire-proposal helper, ~40 lines) as onboarding.
- What breaks if not changed: the queue stalls behind one person's calendar; new seats never ship their first item.

--- 3.4 Digest: conditional, not mandatory ---
The every-chat digest (council.mjs digest) is useful at session start but costly when nothing changed. Proposal: make it conditional — run `digest` only when inbox/ changed since last digest or when the seat is taking its first item of the session. Otherwise `next` + `board` suffice.
- What breaks if not changed: seats re-read the same digest every chat; token cost with no new information.

--- 3.5 Cutover council home: Option A (governance moves whole into fresh repo) ---
Recommendation: Option A. Same paths (`_agents/`, `inbox/`, `bulletin/`, `tools/council.mjs`, `COUNCIL.md`, `AGENTS.md`) in the fresh Colors repo; old repo's `_agents/` freezes as read-only archive.
Why: simplest to explain (one set of paths), preserves queue continuity and review history (the N1 exhibit needs the full record, not a subset), and the sha256 pins stay valid across the move (BASELINES.md mapping doc covers broken refs, per the muse bulletin).
- What MOVES: PRIORITIES.md (live queue), inbox/ (open work), bulletin/ (session memory), COUNCIL.md + AGENTS.md + CLAUDE.md (governance), tools/council.mjs + related tools, _agents/owner-notes/ (Owner decisions verbatim), BASELINES.md + CHRONICLE.md (pins + log).
- What FREEZES as archive: old repo root (product HTML, _archive/, _reference/), old seat branches (council/<seat>) — they remain in the old repo as read-only history; seats recreate branches in the fresh repo.
- WHEN: with the first Colors v1 build that passes the look-gate, not before. No gap where seats cannot take work: the old repo stays readable (just not writable) during the cutover commit; seats clone the fresh repo and resume.
- IN-FLIGHT WORK: open P-items move with their inbox files; unreviewed items keep their review count; pending retire ops move as op files; the Architect's digest is rebuilt from the fresh repo's state on first run.
- SEAT BRANCHES: recreated in the fresh repo (council/<seat>), no rebase (unrelated histories, per AGENTS.md §2). Old branches stay in the old repo as archive.
- N1 EXHIBIT: needs decision ledger, review history, failures + controls. Option A preserves all of it in `_agents/` + `inbox/` + `bulletin/` carried over; the exhibit source material moves intact.
- WHO DOES THE MOVE: any seat (it's file copying + git init, no product code). Verification: the cutover-verify tool (Rank 1) produces counts+hashes proving the queue survived intact.

--- 3.6 New roles / lanes needed ---
Propose three lanes that don't exist today:
1. Tooling maintainer — owns colors/tools/ and council tools (cutover-verify, CI gate, ratings-validator, determinism gate). Currently nobody has this as a lane; tools pile up unreviewed.
2. Calibration lead — owns the draft-model bands (calibrate-draft + outcomelab sweeps) and the Owner's 31 Oct targets; runs the outcome CI gate. Currently distributed across seats; no single owner.
3. Exhibit editor — owns the N1 portfolio exhibit source (decision ledger, review history, failure/control records). Currently nobody; the exhibit risks losing its evidence chain at cutover.
These are lanes, not assignments — any seat may take one by filing in inbox/.

--- Rule changes proposed ---
| Rule | Replacement | Breaks if not changed |
|------|-------------|----------------------|
| Queue unit = wave (one HTML file) | Queue unit = slice (view model + store + test) | P-items target a nonexistent monolithic file; reviews can't verify integration |
| Digest every chat | Digest conditional on inbox change / first item of session | Wasted token cost; no new information |
| Council home = old repo forever | Council home = fresh repo (Option A) at cutover | Read-only old repo can't accept new inbox/bulletin writes; seats have nowhere to work |
| No dedicated tooling lane | Add tooling maintainer / calibration lead / exhibit editor lanes | Tools and calibration lack an owner; they never reach REVIEWED |

================================================================================
END
================================================================================
