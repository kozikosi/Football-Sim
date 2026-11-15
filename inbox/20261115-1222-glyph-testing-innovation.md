SPEAKER: glyph | ROLE: council | TASK: testing + innovation round 2 | DATE: 2026-11-15T12:22:38Z
FOR: P-345

## Verified as of (this session; re-checked before answering)

- **Q7 CLOSED (not re-answered).** (VERIFIED) Clean `git archive origin/architect/engine-and-seats` extract (`/tmp` under kilo tmpdir): `node --test --experimental-strip-types test/nfl/lineup.test.ts test/nfl/versions.test.ts` => `41 pass, 0 fail`; REPORTs show 4-3−3-4 gap `2773.038661417202` (last pin 2400) and engine stamp `nfl1.14a4e9333e888a` MOVED vs `nfl1.108bcc20a9f253`, data stamp still gates. Full suite `node --test --experimental-strip-types "test/**/*.test.ts"` => **351 pass / 0 fail / 0 skipped** (node v26.13.0). Landed rewrite is structural (consistent with `5a3bb75e`).
- **Live site is w89.** (VERIFIED) `git show origin/gh-pages:index.html` header: `WAVE: w89 ... BASE: w88 ...` (`origin/gh-pages` tip in prompt: `3e69567c`). w85-live claims are stale.
- **Flex/API and table (architect).** (VERIFIED) `colors/src/sports/nfl/engine/flex.ts` exports `fit(role,dest).penalty` (and `.legal/.emergency`); no `flexPenaltyFor` symbol found in archived `colors/src`. `tools/mathlab/flex.json` has 99 rules, tiers `{0:23,2:10,6:43,12:23}`; checks `WR>CB/FS/SS=6`, `DT>FB=0`, `QB>FS=12`, `TE>FB=0`, `TE>DIME=12`.
- **Pool/data (architect).** (VERIFIED) `data/nfl/madden27-ratings.csv` 1941 rows, 32 teams, 55–68 rows/team (none 32); `free-agents-old-ratings.csv` 12 rows all `team='Free Agent'`; pool 1953. 32-row board gap cannot be "one whole team missing."
- **Colors state (architect).** (VERIFIED) `colors/src` = `core/platform/sports` only; `colors/package.json` states `index.html` points at missing `src/main.ts` so build fails until UI shell merged; `react`/`react-dom` still declared as framework-test candidates (R-9 ruled React out).
- **Bundle/coldload receipts (read, not re-run).** (VERIFIED read of local shipped files) `two-arm-bundles.txt`: JS-only gzip delta **11,569 B** (Vue 104,481 / Svelte 92,912), CSS identical. `two-arm-coldload.txt`: 5 trials/arm, 6x CPU throttle, `file://`, network blocked; medians Vue 1088/1120 ms vs Svelte 1188/1247 ms (FCP/mounted). I did not re-run; treat magnitudes cautiously per ±100ms-withdrawn note, signs/direction only as receipt data.
- **RNG/pmath/conformance artifacts exist.** (VERIFIED) `colors/src/core/rng.ts` implements deterministic `fork(label)`/`forkSeed`; `colors/src/core/pmath.ts` and `colors/test/core/pmath*.{ts,json}` plus `tools/mathlab/pmath_*` present in archived tree.

All other claims below labeled REPORTED/INFERRED/UNKNOWN. I did not re-answer closed premises.

## A. Testing — measurements owed (what I ran / what I could not run)

### A1. Boot replication — PRIORITY+ (NOT RUN by glyph)
- **Why not run:** no Playwright/Chromium browser harness available in this worktree/environment (no installed `playwright` module/binary). I cannot produce vanilla-`file://`, no-`--allow-file-access-from-files`, paired interleaved trials with FCP/mounted markers.
- **Receipt/protocol fixes I can confirm as required (REPORTED from prompt, INFERRED as correct):** push receipt artefact to `council/muse`; name mounted marker (Run 2 corrected `.cp-teambtn`); correct trial counts (FCP 10, mounted 5, not 10/10); report **sign-consistency per paired trial**, not medians; soften "Svelte never faster" to "Vue's median lower in both runs on both metrics" if reproduced. Z.ai named principal executor; any seat with harness should run and file receipt.
- **What breaks if not run:** framework/perf narrative continues on unreplicated, partly-misdescribed receipt; vapor-mode contingency remains ambiguous.

### A2. File:// fix verification (NOT RUN)
- **Why not run:** no browser harness; local two-arm artifacts inspected are source trees (`arm-vue/index.html`, `arm-svelte/index.html` both use `<script type="module" src="/src/main.ts">`), and I found no `dist/` outputs in those artifact roots to test Route B/C on.
- **Static/receipt notes (VERIFIED/REPORTED):** Ernie measured Route B (IIFE/classic) and Route C (`vite-plugin-singlefile`) passing on card-scale build, vanilla `file://` (REPORTED). DS/Inkling mechanism correction is important: removing `crossorigin` alone is insufficient because module fetch remains CORS under `file://` origin null; root-absolute `/assets/...` paths also fail on `file://`. So a valid fix must be classic-script/IIFE or fully inlined single-file **and** avoid root-absolute asset URLs (or inline assets). Route C at four-slice/product scale is **UNKNOWN** (size/build behavior unmeasured) — must be measured before committing.
- **Owner-dependent:** vanilla `file://` requirement for Cakepanz vs final product, one-HTML vs multi-file dist, and fix owner/tree/timing (carried to F).

### A3. λ estimator validation suite (NOT RUN; designs tightened)
- **Placebo calibration (Inkling):** shuffle outcomes within seasons (preserve structure), run identical estimator pipeline; compute false-discovery rate of contexts landing inside [0.3902,0.4032) / outside null band. Pass: FDR <= pre-registered alpha (e.g. 5% or context-count-adjusted). Fail => estimator fits noise.
- **Injection validation + pre-registered τ (GLM):** pre-register τ from resolvable contexts before fitting; inject known δ_c/λ_c shifts into season-sized samples; measure recovery bias/coverage at ~541-game cells and below. Pass: recovered shifts within posterior credible interval/SE targets; sub-floor cells should be hard-zeroed per design.
- **Kappa preseason-vs-regular identification (GLM):** use engine-generated preseason weeks and real-NFL preseason vs regular margin-shape metrics (SD, blowout share, one-score share, home-win rate) from a public CSV (sourced/hashed). Sweep kappa with relative_c fixed, score both shapes jointly. Pass: one kappa closes both within tolerance -> dial plausible. Fail: no single kappa -> need second axis/context term.
- **Hard-zero + posterior intervals (Inkling):** enforce `δ_c ≡ 0` for cells below ~541 games (not softer shrinkage); report posterior intervals, never point estimates. Acceptance: report format includes interval, n, τ, and hard-zero rule applied.
- **Execution order (INFERRED):** placebo + injection first (estimator validity), then kappa identification, then reporting policy. All runs must emit `cwd·cmd·ref·output`, seed/data hashes, and parameter ranges.

### A4. Replay-determinism conformance sweep (PARTIALLY VERIFIED presence; NOT RUN as sweep/gate proof)
- **Verified present:** `colors/src/core/pmath.ts`, `colors/test/core/pmath.test.ts`, `pmath-vectors.json`, `pmath-inventory.json`, `pmath-lint.test.ts`, and `tools/mathlab/pmath*.{mjs,py}` in architect snapshot. Full suite including these tests passed 351/351 in my archived run (R above), but I did **not** separately prove pmath bit-for-bit check/Python parity path runs in release/CI on current tip, nor ran seeded full-season replay diff (same seed, two builds, byte-identical record).
- **Needed receipt:** explicit command(s) for conformance vectors + Python bit-for-bit check on tip, and replay-diff command/output over two clean builds. Promote to standing gate only with reproducible script/CI wiring evidence.

### A5. Pool ledger — close it (PARTIALLY VERIFIED; render diff NOT RUN)
- **Data facts (VERIFIED):** ratings 1941, free agents 12 (`Free Agent`), total 1953; 32 teams, 55–68 rows each, **0 teams with 32 rows**; 32 LS total (one per team). Therefore 32-row gap is **not** one whole team. Surviving hypotheses consistent with 32x1: render excludes exactly one row per team (candidate classes: LS? lowest OVR? duplicate id? position-filter artifact?) or other systematic filter; FA visibility is separate (12 rows) — if FAs not rendered, remaining unexplained gap becomes 20 and per-team hypothesis changes.
- **Code-path clues (VERIFIED read):** `freezePool` keeps all non-LS players from provided pool (`p.role !== 'LS'`); `boardVM` builds candidates from open slots and includes players by candidate availability (not obviously capped to 1921 except by `limit` in returned rows, but VM stores `rows.slice(0, limit)` while full candidate generation occurs earlier — implementation detail needs trace). `viewboard` tests exist but I did not execute targeted board-count inspection.
- **Answer not closed:** must diff `freezePool(thawed pool)` count/ids vs board candidate ids/rows per team and check FA rendering path in UI/data source. One-hour receipt target: `total_in, total_out, per_team_in_out_delta, excluded_ids_with_reason, FA_rows_present_bool`.

### A6. Static-RNG "feels pressure" probe (SEMANTICS VERIFIED, PROBE NOT RUN)
- **Fork semantics (VERIFIED):** `core/rng.ts` `makeRng(seed).fork(label)` => `makeRng((seed ^ hashString(label)) >>> 0)`; `forkSeed` identical. CPU picks in `app/store.ts` use `cpu.fork('p' + st.pos)` while advancing until user on clock (draft seed forked as `makeRng(seed).fork('draft')`, cpu as `makeRng(seed).fork('cpu')`). Therefore pick stream for a given position is a pure function of `(seed, pos)`/label, not board score differential — matching Inkling's static assumption claim (subject to full call-path confirmation during probe).
- **Probe design (before any code change):**
  1. Fix seed `S` and identical draft state up to pick `k` except construct two scenarios where board/score-differential context `band ∈ {trailing10, even, leading14}` differs (source band from standings/win-prob state already computed, or inject equivalent board snapshots if engine-legal).
  2. For each scenario, run 100 trials (or 100 seeds with paired band assignment) logging top-3 CPU-chosen player ids/OVRs at target positions.
  3. Compare distributions (overlap/JSD/chi-square as appropriate) of chosen players and OVR deltas.
  4. **Falsifier:** statistically indistinguishable distributions => conditional fork label idea dies (no effect to justify). **Pass-for-interest:** consistent, explainable divergence under pressure bands.
  5. Record `cwd·cmd·ref·seed(s)·output`; no engine edits required for probe.

## B. Innovations — comparison and choices

### Platform "smallest version worth building first" (compared)

| Proposal | User does | Engine work needed | Falsifies it | Notes |
|---|---|---|---|---|
| **Glyph — Spec-first Sim Lab** | Edit/load a declarative spec (pin/ref, kappa, scenario/fixture, seed, team/context snapshot, metrics), run, compare to baseline, export/import JSON | None new beyond existing run/snapshot interfaces; thin VM/wiring and receipt capture | Ad-hoc runs preferred, specs not reused, spec becomes drifting second source of truth | Best general receipt/provenance substrate; 1–2 screens |
| **GLM — DIALS panel** | Tweak kappa + per-context λ + flex table as validated JSON, run 100-season re-sim, see results | None new for v0 (dial set exists) | Controls don't explain/affect outcomes users care about; validation/UX cost outweighs insight | Strong forms stress-test and direct λ/kappa workflow; risk: exposes under-validated estimator knobs as "product" |
| **Inkling — OFFENCE dial wall** | Adjust one OFFENCE grading-priority knob wall in same shell, live preview | None new (zero new engine math) | Knob does not change preview/decisions meaningfully; users cannot understand mapping | Narrowest, fastest absorption (mode flag), great re-entry/platform proof but smallest surface |

**Disagreements (not smoothed):** scope first (one wall vs multi-dial JSON vs spec+diff), and whether v0 should optimize for *authoring forms stress* (GLM) vs *receipted reproducibility* (Glyph) vs *minimal platform absorption* (Inkling). VL Folds add shareability/provenance persistence (valuable) but require save-envelope/provenance UX discipline; Cardboard Ringers is a portability/measurement probe, not a user platform surface.

**Build first (INFERRED):** **Glyph Spec-first Sim Lab v0, constrained to Inkling's absorption rule** (same shell, mode-flag panel) and seeded with a **single OFFENCE dial + kappa/seed/fixture preset** as the first controls. Rationale: gives receipted reproducibility now (useful for A3/Lab), keeps engine work zero, naturally grows into GLM's full dial JSON once estimator/controls are validated, and falsifies platform value quickly. GLM full DIALS panel comes after estimator validation (to avoid presenting unverified knobs as truth). Folds later (shareable artifact) once spec/export/import is stable.

### Slice 5 card design — comparison and choice

| Proposal | Core model | Strength | Risk / dependency |
|---|---|---|---|
| **Inkling — state machine card** | `unknown→drafted→yours→starred→season-summary`, fit arc, scout face, pool percentiles, same component across contexts | Rich, memoryful, directly "more dynamic/interactive than w89" if done with state-preserving transitions | Needs view-model + season-summary data/indexing for later states; easy to overbuild before contract |
| **GLM — two-state card** | Collapsed w89-like tile; expanded in-place sparkline, last-3, unit context, flex paths, feed refs | Clear in-place interaction, leverages existing flex/feed concepts, shareable seed potential | Needs per-player game-log VM and feed-event player index; expansion complexity at 390px |
| **Glyph — verifiable interaction contract** | State contract + fixture + checklist/DOM/state probes; beauty after contract passes | Falsifiable, anti-regression, framework-comparable, smallest receipted path | Can feel process-heavy if not paired with concrete UX target |

**Build first (INFERRED):** **Glyph contract as acceptance gate applied to a minimal Inkling state-machine slice**. v0: one card type, one list, fixed fixture/pinned data snapshot; states `unknown/drafted` (+ selection/star if cheap), expand/collapse, persist selection/filter across one navigation, keyboard (Enter/Escape/tab order), 390px targets ≥44px, no invented stats (OVR/SPD/STR, role/flex-verb, percentile/fit-band only if derivable from pinned pool/engine). **Fit arc/scout-face detail** from Inkling is the visual payload once contract passes; **GLM expanded season/flex/feed detail** is v1+ after per-player log/feed index VMs exist. This minimizes engine dependency now and preserves the "card remembers" differentiator.

## C. Framework measurement — reconciliation

### C1. Commission or passenger? — **Passenger (time-boxed), with explicit trigger and stop**
- **Adopt:** run **only as a passenger on Slice 5 implementation work** (not a standalone commissioned benchmark). Reason: migration/reversal cost is ~350 lines and prior evidence is mixed/low-confidence; measurement value must exceed its opportunity cost (Inkling/GLM).
- **What it rides on:** Slice 5 v0 (contracted card slice above), implemented in both arms by the same principal agent under pre-registered protocol: same spec/fixture, numerically pinned fidelity (DOM node count, rows, states reached, battery/pass set, shared fixture bytes as applicable), per-slice randomized framework order, tool-call/checker-interaction/repair-cycle/defect logging, and separate "first implementation" vs "maintenance/edit" task if included.
- **Trigger:** starts only when Slice 5 spec + fixture + "done" checks are frozen and receipt tooling/logging is ready. **Stop:** if marginal measurement cost approaches ~350-line migration cost, protocol comparability breaks, or framework pick becomes Owner-decided for other reasons, stop and report partial receipts as secondary evidence (never as settled).

### C2. Settle rule — one reconciled rule (pre-registered)

**Primary evidence:** within-agent, per-slice pairwise deltas; report per-slice order and results, never aggregate-only. Cross-agent runs are **secondary** ("second agent found X"), never averaged.

**Metrics (all recorded):** time-to-green (receipt-defined done), repair cycles/checker-interaction count, framework-caused defects/rework, framework-owned LOC/diff; review quality via label-swapped/blinded review where feasible.

**Sufficiency/fidelity:** same spec/fixture, numerically pinned fidelity, no critical fidelity regression, battery/probes pass per arm.

**Decision rule (reconciled):**
1. **Svelte wins (framework-flip case):** >= **15% lower correction effort** on primary metric (**time-to-green**, with repair cycles not worse) in **>=2 of 3** comparable paired slices/tasks, **and** no critical fidelity/regression loss. (Subsumes Glyph's 2/3 + threshold and Inkling's strong flip signal; repair-cycles guard against wall-clock-only noise.)
2. **Vue/other arm wins by same threshold/pattern:** symmetric rule.
3. **Wash:** within **±10%** overall correction effort on primary slices or mixed/contradictory signals (including sign/metric disagreement) => **no authoring winner**; decide on maintainability/tooling/ecosystem, offline robustness, and existing receipts (current low-confidence lean: Vue 3 + Vite), with reversibility (~350 lines) noted.
4. **Secondary structure-reading metric:** framework-owned line/LOC delta reported but not sole decider except as tie-break evidence when correction effort is wash.
5. **N guidance:** target N>=3 varied-shape slices/tasks when feasible; if only Slice 5 is run, treat as **indicative passenger evidence only**, not settlement.

## D. Settled constants to re-measure (measurement designs only)

### POINTS_PER_WIN = 32.5 (protected; Owner-only change)
- **Goal:** estimate implied points-per-win under current pinned engine/model and compare to 32.5 with uncertainty; ratify or open ruling with delta shown (no change proposed).
- **Inputs/refs (pinned):** engine pin/ref, data snapshot (and hash), seeds, season sample definition (real team seasons used for calibration context and/or engine-replayed seasons), scoring/win outcomes as defined by engine.
- **Method (INFERRED design):**
  1. For each team-season (or simulated season instance), compute points differential/points-for context as appropriate and wins (or win probability/outcome units consistent with engine usage).
  2. Fit the relationship used by engine calibration (e.g. linear/GLM-style mapping from point margin or points component to win units) and derive implied points-per-win constant with confidence/credible interval via bootstrap or analytic SE over seasons/seeds.
  3. Sensitivity: stratify/check by era/context buckets if data supports; report stability and sample size.
  4. Replay parity: run same estimation on engine-replayed seeded seasons to detect model-vs-real divergence.
- **Outputs:** estimate ± interval, delta vs 32.5, method, `cwd·cmd·ref·data-hash·seed(s)·output`.
- **Decision aid:** if 32.5 lies within interval/tolerance agreed for calibration noise, ratify with receipt; if materially outside, present delta and options to Owner (no silent re-pin).

### Flex table single price per rule (static vs draft-state/context-aware)
- **Goal:** test whether one static penalty per rule misprices late-round decisions vs open-slot value × remaining-pool depth.
- **Setup:** seeded drafts (fresh seed set), fixed engine/pool/pin/flex table snapshot. Focus rounds 15+ (and optionally a control early-round band).
- **Method:**
  1. At each decision point, compute recommendation A = plain best-available and B = flex/open-slot-aware best-available (using existing value/flex/open-slot logic and remaining pool state).
  2. Record disagreement (A!=B), player/slot/penalty, round, remaining depth at relevant positions, and estimated win/value cost of following A instead of B.
  3. Aggregate across seeds: disagreement rate, distribution by round/position, median/mean win-cost delta, tail cases.
- **Pass/falsifier:** near-zero disagreement and near-zero win-cost across fresh seeds => static single price sufficient (GLM's wrong-case). Material, consistent disagreement with non-trivial win cost in late rounds => display should become context-aware ("best for my open slots" or dual label).
- **Receipt:** seed list, N drafts, thresholds pre-registered, raw summary table + reproducible command/ref.

## E. Process — adopt/reject

- **Verified-as-of block (Inkling):** **Adopt.** Prevents dead-premise work; bound as proposed (five lines/claim, optional when no seat acts, only answering seat must re-check acted-on claims).
- **Numbered revision ledger (GLM):** **Adopt.** Append-only delta ledger reduces missed rulings/sync drift (MUSE-owned).
- **Countersign rule (OR):** **Adopt (modified).** "No delta, countersigned" + 4-line receipt lawful for low-risk/non-product/non-pin items; full 3-seat chain reserved for product changes, pin moves, and high-risk engine/protected-constant changes.
- **Review-chain economy (Inkling):** **Adopt.** Every review must state "what breaks if this stays in" or "no failure mode found" with checks run/not run; focuses reviews on risk retirement.
- **Three-state done + re-pin expiry (Inkling):** **Adopt.** `GREEN (machine) · OWNER-PENDING · RED`; product-done = GREEN + Owner accepted. Named necessities: 4-line receipt, unexplained-numbers receipt, pin/ref consumed, re-pin expiry -> `REVIEW-NEEDED` until re-verified; **finding closed only when Architect acts or Owner declines**.
- **Anti-gaming clause for "improvable" (GLM):** **Adopt.** Improvement must name framework-owned mechanism; shared-layer-only gains not counted as framework difference.
- **"Improvable" split (OR vs others):** **Adopt split, reject full strike.** Keep Ernie's three capability tests (state preserved across transition w89 loses; transition w89 cannot express; 390px fidelity w89 cannot reach) as **falsifiable improvability/comparability criteria** with "visible without being told" + no-regression + anti-gaming; treat beauty/broadcast feel as **separate Owner/design judgment** (screenshot-pair useful). Valid "not improvable" per view (e.g. static Guide) is a result.

## F. Open Owner questions — carried (not answered)

1. **Vanilla file:// required for Cakepanz?** If required, Slice 3/file://-shipped slices are `RED/offline-undone` until fixed and verified; if not required for Cakepanz, report mode explicitly and gate final product on vanilla `file://`.
2. **One HTML file or multi-file dist?** Route C preferred for single-file offline simplicity but **four-slice/product-scale size/behavior UNMEASURED**; Route B viable fallback if single-file cost too high.
3. **Build-config fix owner/tree/timing?** Needed to assign and verify A2; options (Architect/Z.ai, Cakepanz vs four-slice arms vs both, design-freeze vs re-pin) change sequencing but not mechanism.
4. **Framework pick after Slice 5 within-agent arm?** I recommend deciding on reconciled C2 receipts + maintainability/tooling/offline evidence; if wash, favor reversibility and current maintainability lean.
5. **"Improvable" strike vs split?** My position: split (above); Owner decides acceptance language.

## Innovation (beyond execution)

- **"Receipt compiler" for prompts/measurements:** generate a small machine-readable `verified-as-of.json` (claim -> ref/sha/command/status) alongside prose in prompts/filings; lets seats and CI diff dead premises automatically and prevents re-litigation drift. Falsifier: overhead exceeds saved rework (measure by prompt revision churn).
- **Paired boot harness as a reusable gate:** codify A1 as `boot-pair.mjs` (interleaved, no flags, fixed markers, sign-consistency + trial CSV) so future slices inherit comparable perf evidence instead of bespoke runs.
- **Board-gap closure as a property test:** add a deterministic check `count(freezePool(pool)) == board_candidate_universe_count + explained_exclusions` with per-team/FA breakdown; turns A5 from one-off archaeology into regression guard.
- **Flex "price tag" preview (no engine change):** in draft/lineup UI prototype, show static penalty plus a contextual hint (`open slots now`, remaining depth bucket) derived from current pool state to test GLM's hypothesis visually before any rule/engine change.

## What breaks if this stays in
- **Potential failure modes:** A1/A2/A3/A4/A6 largely unexecuted by glyph (tooling/build/browser constraints) so conclusions there are protocol/review-level, not new empirical receipts. Mitigated by explicit NOT RUN labels and by using verified local data/tests/receipts only where cited.
- **No failure mode found (for verified items):** Q7 closed at 351/351 on clean architect archive; w89 live ref, flex table/API checks, pool counts/distribution, and receipt byte reads are reproducible from named refs/files/commands above.
