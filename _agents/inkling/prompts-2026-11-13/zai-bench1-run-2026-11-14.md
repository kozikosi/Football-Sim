SPEAKER: KG (Owner) + inkling | ROLE: Z.ai (Sonnet/5.3-class engineer) | TASK: execute the BENCH-1 benchmark end to end — build the harness, land the engine, run Tier 1 + Tier 2, report; do NOT decide the framework | DATE: 2026-11-14 | Audience: Z.ai only

# INKLING · The complete BENCH-1 brief for Z.ai

Read this whole file before you touch anything. Then read the two files it cites. If anything here contradicts them, cite the line and ask before proceeding; do not reconcile silently.

## 0. Authority and scope — read first, literally

- **This is a test, not a standing instruction.** The Owner has consented to a **one-off** benchmark run. It does not create permanent CI gates, does not adopt Tier 1 as infrastructure, does not ratify budgets, does not oblige any future benchmark wave. The deliverable is measurements, a ratification packet, and a handoff. Nothing else.
- **You build and run; you do not decide.** The framework verdict — Svelte 5 + Vite vs Vue 3 + Vite — belongs to the Owner alone. Your report informs it; it never rules it. Every filing you write must say so.
- **Report-only for the first three runs.** No number you produce may fail anything. Budgets in the spec are guard rails to be ratified by the Owner after seeing three sets of real numbers.
- **No weight pinning, ever.** Determinism is run-against-run, same input twice, (plus Node 22 vs 24 if you have both — you do not; see §6). A committed baseline file exists only to report MOVED / UNMOVED. Never a gate.
- **FLEX, `DEFAULT_WEIGHTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, and the `modelWeights()` monotone-quantisation contract are untouchable.** So is any product HTML, so is anything on `architect/engine-and-seats`. The engine is consumed, never edited.
- **Free tooling only.** No paid services, APIs, keys, subscriptions or trials. Context7 beyond its anonymous quota is banned. No GUI authorization flows requiring the Owner mid-run.
- **No public-repo changes.** Both scaffolds (kozikosi/football-sim-vue `main` @ `6b4de5c734898d85f00c779de4f078532e5dadf9`, kozikosi/football-sim-svelte `main` @ `86ba63255b34ef87db2cf9cae954511d5631064f`) are published read-only for this purpose. Your e2e and Tier-2 runs clone them fresh; you commit nothing anywhere. Everything ships as a handoff package; the Owner relays publication. **Expect your push to fail with exit 128; that is not a failure of your duties.**
- **No v4 deltas.** The fourth arm (Svelte + Svelte MCP), filter locality, repair-cycle logging, and the watchlist experiment are all explicitly **unruled and unauthorized** until the Owner says otherwise after seeing results. Do not run them, do not build them, do not pre-wire them.
- **Labels on everything:** VERIFIED / REPORTED / INFERRED / UNKNOWN. If you cannot run it, say so and name what you checked instead. Do not invent numbers to fill a gap.

## 1. What you are building

One harness — `tools/bench/`, plain Node, zero dependencies, zero framework knowledge — plus two vendored-arm working copies in your sandbox. The harness runs the engine headlessly (Tier 1) and drives the board through Playwright 1.65.1 (Tier 2). The same scenario matrix, the same seeds, the same acceptance criteria in both arms.

## 2. Prerequisites — read these, cite them

1. The benchmark spec (the actual contract): `claude/notes/2026-11-14-benchmark-spec-BENCH-1.md` at `origin/architect/engine-and-seats` — read with:
   `git show origin/architect/engine-and-seats:claude/notes/2026-11-14-benchmark-spec-BENCH-1.md`
   Note: the inspected-at commit for your run is `46aafad9db46f45232f68f4e71f27f06620283d8` (spec written against it; tip has since advanced to `d3bd81d` by a doc-only commit — VERIFIED `git diff --name-only 46aafad9..d3bd81d` = one new file `claude/notes/2026-11-14-framework-recommendation.md`, nothing under `colors/`; engine bytes are identical). Record both SHAs in your receipts and state which you used.
2. The engine inventory: same `git show` for `claude/notes/2026-11-14-engine-surface-inventory.md` — it names the store, the selectors, the VM contract, and every engine workload you will drive.
3. The engine itself at the inspected-at SHA: clone `architect/engine-and-seats` blob:none and `git checkout 46aafad9` in a worktree **you create under your sandbox's work dir only**. The test suite is dependency-free and proven: `node --test --experimental-strip-types "test/**/*.test.ts"` from `colors/` → **expect 323/323 exit 0** (Z.ai measured 323/323 earlier on Node 24.22; INKLING re-measured 323/323 on Node 26.13.0). If you see any other number, STOP and file.
4. The real pool: `data/nfl/madden27-ratings.csv` at that SHA — 1,942 lines incl. header = **1,941 player rows** (columns `name,pos,team,ovr,spd,str`). Verify it yourself first (`wc -l`); a 1,000-row pool cannot hold a 1,024-pick draft, which is the whole reason the primary pool is the real one.
5. The v4 evaluation this brief is built alongside: `inbox_20261114-0406-zai-framework-eval.md` (published on `council/inkling` at `bbe106bc`; also in `~/Desktop/Football Sim/z framework eval v4/`) — especially §B1 (the export table: `cpuChoose` not `cpuPick`, `effectiveOvr` not `effOvr`, `fit` not `flexPenaltyFor`, `derivedWeights`/`measuredDisplayWeights` not `modelWeights`), §C (draft = **32 teams × 32 rounds = 1,024 picks**, `draft.ts` `TEAMS_N`/`ROUNDS`, snake order), and §B2 (`LoadedDataset` is sport-free; rows are 8-tuples; no `fetch()` of the CSV anywhere — the pool is build-input material).
6. Both scaffolds, fresh clones, SHAs as in §0. Never your working copies — fresh ones, each run.
7. The AGENTS.md files in both scaffold repos bind too (`CLAUDE.md -> AGENTS.md` symlink law, the laws about engine/UI separation, MCP rules). You are bound by them inside the clones.
8. START-OF-CHAT-ZAI (council/muse, maintained copy; your handoff zip updates it too) — unchanged constraints: §1 authority, §2 wave rule (gh-pages tip `3e69567`, wave 89 still live — this is not a wave build), §5 reporting rules.

## 3. Non-negotiable measurements

### Tier 1 (headless, zero framework, plain Node)

Per spec §2–§6, verbatim where applicable. Absolute rules:

- **Primary pool:** `madden27-ratings.csv`, 1,941 rows, real data, pinned by `PIN_DATA` discipline. Synthetic seeded pools 1,000 / 1,941 / 5,000 rows exist ONLY for the W5 board scaling sweep; generator + seed are part of the spec output, recorded not gated.
- **Draft sizes:** D-5R (160 picks) and D-32R (1,024 picks). If "26, 27, 28" ever meant something to the Owner, it is dead here; ignore it.
- **Seeds:** 1–5 for Tier 1; seed 1 for Tier 2. User team index 0 and 31 (snake-asymmetry positions).
- **Workloads:** W1 pool parse+freeze+hash (`PIN_DATA` check, datasetHash identical ×2; 0 duplicate ids; ≤ 250 ms) · W2 32 rosters legality (all 32 teams fill all 32 slots; no player twice; every pick `fit(...).legal`) · W3 snake drafts D-5R/D-32R with per-pick ms curve, full-draft ms, record bytes, save size ≤ 250 KB, record hash identical ×2 and identical through `restoreDraft` replay · W4 one season (`startSeason → fixtures → playWeek × 22 → table`), 272 regular-season games, every playoff game regenerated byte-identically from `gameSeed(seed, week, home)`; season ≤ 10 s; one game p95 ≤ 20 ms · W5 the board workloads at VM level (sort `wins`/`ovr`/`priority`; filter position/slot at VM level as probe only — the engine has no filter param and the filter's home is unruled).
- **Determinism gates A1–A2:** same (seed, team, policy) twice → identical record/table/summary/hashes (hard gate). Node 22 vs Node 24 → identical (hard gate **if** you have both runtimes in your harness; you have v24.22.3 and v26.13.0 here — run both and report; do not claim Node 22 parity).
- **A3 cross-engine float determinism:** Chromium vs Firefox vs WebKit → report-only, one row in your receipt; needs Playwright 1.65.1 with all three browsers (any missing browser = label it UNKNOWN, block nothing). Do not promote it.
- **Every result file carries:** `engineAt` (inspected-at SHA), `specAt`, data hash (PIN_DATA), Node/npm/OS/CPU/commit fingerprint, run index, discard/measure rounds (3 warmups discarded, 20 measured, arms interleaved A-B-A-B … ×5 rounds), median / p95 / MAD / bootstrap 95% CI of the median.

### Tier 2 (per framework arm, Playwright, Chromium headless only)

- **Both arms, identical DOM contract:** `data-testid` = `board-row`, `sort-wins|sort-ovr|sort-priority`, `filter-pos`, `pick`, `roster-panel`. If the arms cannot expose these hooks without editing published scaffolds: STOP and file — do not patch the public repos.
- **Timing fences:** interaction start → the frame after `data-testid` reflects the new VM (double `requestAnimationFrame`). Playwright 1.65.1, headless, one fixed viewport. **Never the Playwright MCP's alpha 1.66.0-alpha.**
- **Budgets (PROVISIONAL — report-only ×3 runs minimum):** PICK→paint p50 ≤ 100 ms, p95 ≤ 250 ms at every round 1–32 · sort/filter→paint 60 rows ≤ 50 ms p95, 1,000+ rows ≤ 100 ms p95 · select-row→roster update p95 ≤ 50 ms · engine-side: D-32R ≤ 10 s; season ≤ 10 s; one `simulateGame` p95 ≤ 20 ms; save record ≤ 250 KB, write median ≤ 10 ms. **None of these may fail anything in this wave.**
- **G5 (contract byte-identity):** rendered board text must be string-identical to `selectBoard` output per interaction; DOM-text hash identical across arms. Framework-side divergence = finding, not tie-breaker.
- **Tie rule:** a metric "beats" only if CIs do not overlap **and** ratio ≥ 1.2; otherwise it is a tie, recorded as a tie. No verdict from bundle size. No verdict from build-time wall clock. No verdict from demo-app weight (the demos measure themselves, per v4 §E3).
- **Interaction set:** sort × {wins, ovr, priority} · position filter · row select · PICK (with UNDO back to previous VM) · per round {1, 5, 16, 32} · all in the same store semantics the product uses.

## 4. The engine vendoring plan (Tier 2 needs it before anything else)

The arms consume the engine as-is, **never** edited:
- Fresh clone of each scaffold; add `src/engine/` as a verbatim copy of `colors/src/sports/nfl/engine/` + its runtime dependencies from `colors/src/core/` (`rng.ts`, `at.ts`, `keyedrng.ts` if at your inspected-at sha, plus whatever the engine imports transitively — enumerate the transitive closure with `git grep -n "^import" colors/src/sports/nfl/engine/ | sed 's/:[0-9]*:/:/'`, cite it in full, and copy **exactly** those files, preserving relative layout).
- The adapter between framework and store (`main.ts`-side only) is out of scope for this wave: both scaffolds currently expose only dev hooks (`window.__pinia` / `window.__SIM_STATE__`). If Tier 2 cannot drive the board without adapter code, STOP and file the adapter proposal with the diff; do not write it silently.
- Record `git status` of each clone before and after vendoring — must show only your added `engine/` paths, unmodified everything else.

## 5. Deliverables, in order

1. **Phase 0 receipt:** `inbox post-exec` environment inventory (OS, Node/npm versions, Chromium binaries usable), spec/inventory/pool verification outputs, your inspected-at SHA decision, and ANY question/ambiguity you find **before building**. If Phase 0 surfaces a contradiction, STOP.
2. **Phase 1 — harness source, review-gated:** `tools/bench/` (zero deps) + result-JSON schema + fingerprint writer + a 20-line README with invocation lines. **Send this to the Owner as a handoff package and wait.** No real run before explicit Owner go.
3. **Phase 2 — Tier 1 run:** full D-5R/D-32R, all seeds, W1–W5, determinism gates, result JSON + receipt log. **Report-only.**
4. **Phase 3 — Tier 2 run:** engine vendored per §4; both arms; the interaction set at rounds 1/5/16/32; G5 per interaction; result JSONs per arm. **Report-only.**
5. **Phase 4 — ratification packet:** one markdown document with three columns (budget · measured ×3 runs · verdict-neutral note), for the Owner to ratify/relax/tighten each budget. You attach a proposed disposition per row — labelled PROPOSAL, not decision.
6. **Phase 5 — handoff package:** `download/zai-bench-1-2026-11-14/` containing the harness, all result JSONs/logs, the ratification packet, this prompt's receipts, a MANIFEST with sha256 of every file, and a START-OF-CHAT-ZAI delta note if your situation changed (it will not; do not edit the file). Send paths and shas to the Owner; publication happens by relay or not at all.

## 6. Environment truths you must honour (this machine differs from the Owner's)

- Your Linux sandbox: Node v24.22.3 (earlier), Playwright 1.65.1 present in the scaffolds, Chromium usable headless, no GUI Chrome, no MCP clients besides direct stdio drivers, no OpenChamber, Context7 quota-gated (DO NOT exceed it), Playwright **MCP** requires `--browser chromium` and even then is out of scope for this brief (the spec uses scaffold-pinned Playwright 1.65.1 directly — do not route Tier 2 through any MCP).
- The Owner's machine: Node 26.13.0 — `.nvmrc = 24` is the published pin; run local checks against BOTH if you can, report both, never silently re-pin.
- Your push attempts will fail (exit 128, no credentials) — plan receipts to be complete before the handoff ZIP is static.
- `timeout` exists in your coreutils (unlike macOS); use it on every long command.

## 7. What gets returned to you in this brief — nothing else

Questions are allowed and expected before Phase 1. But once the Owner rules on the Phase 1 package, you execute to Phase 5. If blocked anywhere: document the block, file what you have, stop. Never paper over a block with invented numbers, never "quickly" fix a scaffold or the engine, never let a number fail a gate — it cannot, because no gates exist in this wave.

## 8. Reminder of the actuating principle

This benchmark exists because, today, **nobody knows** which framework carries this engine better, including you, including the Architect, including the Owner. Your job is to make the ignorance measurable. Whatever the numbers say after three report-only runs, the verdict belongs to Kosi alone. Run it cleanly, report exactly what you found, and hand the Owner the ratification packet.

— inkling for KG
