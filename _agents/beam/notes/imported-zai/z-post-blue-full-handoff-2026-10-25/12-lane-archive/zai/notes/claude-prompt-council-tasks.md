# PROMPT FOR CLAUDE (THE ARCHITECT)

**FROM:** Council Coordinator (acting for the Owner)
**DATE:** 2026-10-25
**SUBJECT:** Consolidated, triaged task slate from the guest-analyst reviews of `Football-Sim-PreColors.html` — for your ruling and distribution to the council
**STATUS:** Dissemination package only. Per the Owner's instruction, *do not begin working on these tasks*. Nothing is authorized for implementation until you rule on Section 1 and the Owner approves each phase.

Claude —

The Owner had four independent guest analysts review the pre-colours baseline and asked a neutral coordinator to read all of them in full, understand the proposals in depth, de-duplicate them, and keep only those with **more than 40% confidence of improving the project**. Four reviews were processed: **Grok** (V22 path recommendation), **Qwen / "Council Advisor"** (Proposals A–E with an execution protocol), **GPT** (a 26-part audit assignment), and **"Z"** (a grep-verified analysis with line references).

After merging overlaps and dropping sub-threshold items, the result is **71 tasks** grouped into 18 workstreams. Each task is tagged with source, priority (P0–P3 per your existing taxonomy), and a confidence band for "this improves the project": **High ≥80% · Med-High 60–79% · Moderate 40–59%**. Source tags: **[G]** Grok, **[Q]** Qwen, **[GPT]**, **[Z]**.

Where analysts contradicted each other, the item was converted into a *verification* task rather than a *change* task, so nobody wastes a cycle "fixing" something already fixed.

---

## Section 1 — Rulings requested before any assignment (R-21 candidates)

1. **Base artefact for V22.** [G] recommends promoting `_agents/minimax/prototypes/V22-candidate-teamcolours.html` as the working base; [GPT] mandates the verified PreColors file (sha256 `40233d6b…`, blob `1087b656…`) as the audit baseline; [Q] patches PreColors in place. Proposed resolution: **PreColors remains the audit/measurement baseline; the coloured candidate may become the V22 build base only after you verify [G]'s "strict superset" claim by diff and protected-function hashes.** Rule yes/no.
2. **Conflicting issue claims.** [G] reports the rWeights/`render100` crash, the `msChecked` mobile-stacking flag, and dual-doctype debt as open; [Z] grep-verified all three as fixed in PreColors (residual: a `<style>` element before `<head>` at line 3). Likely cause: [G] inspected a minimax prototype rather than the pickle build. Re-grep the actual baseline and settle each claim before anyone acts on them.
3. **Sequencing rule.** [Z] warns: land the harness-enabling P0s (SIM-CORE markers, seeded RNG) **before** the colours pass, so every colours candidate inherits a verifiable core instead of re-creating the unverifiable-core problem. Accept or reject.
4. **`goSeason()` / `seasonHost`.** Delete as dead code (KI-013) or revive as a Season tab — R-16 left this to you.
5. **Audit-only posture.** [GPT] proposes this wave be read-only: genuine bugs recorded with exact reproduction + proposed fix, but no source modification until you/Owner authorize the fix phase. Accept, amend, or reject.
6. **Colour-variable convention.** [Q] proposes `--team-primary/--team-secondary` aliases; the coloured prototype uses `--team1/--team2/--team3/--team-stripe`. Pick one convention to avoid duplicated, colliding work.

---

## Section 2 — Task slate (71 tasks)

### WS-A — Coordinator / governance *(assign: yourself)*
- **T-01** [GPT,Z] P0 High — Verify and record baseline identity in STATUS.md: sha256 `40233d6b…`, blob `1087b656…`, ~6,554 lines, ~657 KB; confirm the file parses/launches, existing tests pass, and note any fixtures/benchmarks.
- **T-02** [Z vs G] P0 High — Re-grep the baseline to settle conflicting claims (Ruling 2): rWeights/`render100`, `msChecked` vs data-label signature, doctype/style placement, the claimed three `@media (max-width:760px)` blocks, and the per-render `tr.teamrow` listener pattern.
- **T-03** [Z] P0 High — Reconcile KNOWN-ISSUES.md with reality: mark KI-003/004/005/006/007 resolved if re-verified; keep KI-001/002/008/009/010/011/012/013 open. Stale entries are generating duplicate agent work.
- **T-04** [GPT] P0 High — Adopt the findings taxonomy (confirmed bug / probable bug / calibration problem / architectural weakness / intentional simplification / improvement opportunity) and the 13-field evidence template for every finding.
- **T-05** [GPT] P1 High — Split the council into bounded workstreams with specific function lists and line refs; no agent reads the whole 657 KB file; use the minimum effective number of agents.
- **T-06** [GPT] P1 High — Independent-verification rule: consequential findings (e.g., a coefficient change) get a second agent's review of the evidence before implementation.

### WS-B — Harness & reproducibility (P0 — before colours)
- **T-07** [Z,G] P0 High — Add SIM-CORE markers + the three headless entry points (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`) per `tests/CONTRACT.md` C2. Wrapping exercise, not a refactor; unblocks pw4, validate, baseline freezing.
- **T-08** [Z,G,GPT] P0 High — Seeded RNG (e.g., mulberry32) behind a `rnd()` indirection; route the 56 `Math.random()` sites; closes KI-009; prerequisite for all controlled experiments.
- **T-09** [Z] P0 High — Deterministic `baseline.json` flow per contract C6 once T-08 lands.
- **T-10** [GPT] P1 High — Paired-experiment protocol: identical seeds across compared scenarios; separate random streams where code paths consume randomness differently; document the design of each experiment.
- **T-11** [GPT] P1 High — Uncertainty standard: report sample size, variance, and confidence intervals; choose n from observed variance; no arbitrary "100 sims is enough."

### WS-C — Rendering & performance (P1)
- **T-12** [Z] P1 High — Replace both document-wide MutationObservers (user-team highlighter ~L6446; mobile stacker ~L6547) with an explicit `afterRender()` hook called by render functions — one pass over only the changed container; eliminates perpetual full-document scans and forced-layout reads.
- **T-13** [Q,Z] P1 High — Debounce the player search (~150 ms); the 1,200-row table currently rebuilds via innerHTML on every keystroke (~L772, 808–814).
- **T-14** [Z] P1 High — Debounce/rAF the draft board's per-keystroke re-render (~L1119).
- **T-15** [Z,Q] P1 High — Rebuild large tables via DocumentFragment; evaluate visible-rows-only rendering for the 1,200-row browser.
- **T-16** [Q] P2 Med-High — Event delegation for `tr.teamrow` clicks instead of re-attaching listeners per render (gated on T-02 confirming the pattern).
- **T-17** [Z] P1 High — Chunk `simToEnd()` (120 ms slices + progress bar) to remove the ~1.7 s synchronous freeze; mirror the existing 100-season loop pattern.
- **T-18** [GPT] P1 High — Profiling suite before any optimization: draft init, full auto-draft, lineup optimization, schedule generation, one game, one season, playoffs, major table renders. Per bottleneck: time, frequency, % of runtime, cause, proposed fix, expected gain, regression risk. No optimization without a measurement.
- **T-19** [Z] P2 Moderate — Guard the 100-season `seasonState = L` global swap during chunks; make re-entrancy explicit before it becomes a real bug.
- **T-20** [GPT] P1 High — Preserve-intelligence rule: no optimization may reduce CPU decision quality or remove meaningful interactions; prefer caching, immutable reuse, better data structures, fewer DOM updates.

### WS-D — Persistence & reliability (P1)
- **T-21** [Z] P1 High — localStorage persistence: debounced, schema-versioned snapshots of `draftSim` / `seasonState` / `league100`, cleared on new draft. Closes KI-008; a refresh currently loses everything.
- **T-22** [GPT] P1 High — 18-workflow reliability matrix (draft start → position change → user picks → CPU picks → speed switch → undo → instant-complete → lineup optimization → season start → plan edits → single game → week → rest-of-season → standings → playoffs → Super Bowl → restart). Hunt invalid states, stale data, duplicate actions, accidental re-simulation, missing handlers, runtime exceptions, inconsistent UI updates.
- **T-23** [Z] P1 High — Add a vertical term to the e2e `inVp` predicate (currently horizontal-only, so below-fold regressions are invisible to the suite).
- **T-24** [Z] P1 High — Mobile CTA above the fold at 390×844 (`#startSeasonBtn` measured ~119 px below the fold on the season landing).

### WS-E — Accessibility (P1)
- **T-25** [Z] P1 High — Keyboard pass: `tabindex="0"` + Enter/Space handlers on sortable headers, priority/star chips, and the `.poslist` custom dropdown; `aria-sort`; a real `:focus-visible` style. Today: zero `keydown` handlers, two aria attributes in ~6,500 lines — core draft functions are mouse-only.
- **T-26** [Q] P1 High — `scope="col"` on all `thead` `<th>`; matters most for the stacked mobile tables (`table.mstack`).
- **T-27** [Q amended] P2 Med-High — Toggle-switch a11y done correctly: accessible name + `role="switch"` on the checkbox input with state via `checked`. Do **not** put `aria-checked` on the wrapping label (invalid ARIA as proposed). Verify with VoiceOver/NVDA.
- **T-28** [Q] P3 High — Descriptive `aria-label`s (e.g., "Close team detail panel"); run Lighthouse a11y as the acceptance gate.

### WS-F — V22 colour system (post-ruling)
- **T-29** [G] P1 Med-High — If Ruling 1 accepts promotion: harden the colour system — keep `TEAM_COLORS` as brand data; keep/tighten the relative-luminance helper and the "middle stop visible on light" rule; call `applyTeamColors()` at every point the user's team becomes known; set CSS custom properties instead of repeated inline styles; purge remaining hardcoded `#4f8cff` / `#ff6b4a` accents.
- **T-30** [G] P2 Med-High — Contrast-check matrix for the 32-team palette across light/dark and stripe/panel contexts.
- **T-31** [G] P2 Moderate — Proposed first surfaces for the palette, per the Owner's R-18 aesthetic mandate: draft-as banner → board rows → matchup cards → champion banner. You set the final order.
- **T-32** [Z,G] P1 High — Move the line-3 `<style>` inside `<head>` (validator error); collapse to a single coherent style block if the dual-sheet heritage is confirmed by T-02.
- **T-33** [Q] P2 Moderate — Consolidate the scattered `@media (max-width:760px)` blocks into one commented block (verify the "three blocks" count during T-02).

### WS-G — Code hygiene (P2)
- **T-34** [Z] P2 High — Delete dead code (`goSeason`/`seasonHost` + the KI-013 list) after Ruling 4.
- **T-35** [Z] P2 High — Break the 83 KB single-line data array (L449) into one-player-per-line or a `<script type="application/json">` island; restores diffability (KI-010). Single-file deployment preserved.
- **T-36** [Q] P2 Moderate — CONFIG extraction for magic numbers (default ovr 70, 32 teams, 26 slots, emergency flex 8) — **only** with strictly scoped replacement, protected-function hash check, and output-identity verification; abandon on any protected-invariant touch.
- **T-37** [GPT,Q] P2 Med-High — Scoped Biome pass: fix real errors, unreachable logic, unsafe assumptions, state corruption, duplicate identifiers; no mass reformat; don't let low-severity style diagnostics distract from simulation defects.
- **T-38** [Z] P3 High — favicon + `og:image` (kills the 404, cheap polish).

### WS-H — Valuation coherence (the central investigation) (P1)
- **T-39** [GPT] P1 High — **Marginal-value validation:** for each major position, substitute stronger players into representative rosters under paired seeds; measure Δ expected wins; compare against the simulator's displayed WAR. This decides whether the draft board is trustworthy — the single most valuable investigation on this slate.
- **T-40** [GPT] P1 High — Trace and document both causal paths (ratings → placement → units → matchup → stats → scoring → wins) and (ratings → draft valuation → WAR → CPU priority); identify the authoritative mathematical model and which systems should derive from it.
- **T-41** [GPT] P1 High — Positional value-curve analysis: implied value of 70→80, 80→90, 90→95, 95→99 per position; linearity, elite premium, scarcity handling (`slotWinsTable`, `slotWins`, `slotWinsPerOvr`, `winsAt`, `playerWar`, `replacementLevels`, `staticReplacement`).
- **T-42** [GPT] P1 High — Philosophy-fairness test: verify line/RB-oriented rosters win through credible football mechanisms rather than arbitrary weights, and that QB importance is not artificially suppressed. Owner preferences explain intent; they don't calibrate the model.

### WS-I — Game-engine integrity (P1)
- **T-43** [GPT] P1 High — Reconstruct the `simulateGame` dependency graph (`teamRatings` → `leagueBaseline` → `matchupModel` → `realisticScore` → `quarterTotals` → `makeScoringEvents` → detail/narrative builders); inventory deterministic steps, random draws, caps, clamps, rounding, derived values.
- **T-44** [GPT] P1 High — Automated reconciliation battery: final score ↔ quarter totals ↔ scoring events ↔ player TDs ↔ team TDs ↔ passing/receiving TD symmetry ↔ rushing TDs ↔ turnovers ↔ sacks ↔ play-by-play ↔ narrative. Record every discrepancy with a minimal repro.
- **T-45** [GPT] P1 High — Targeted checks: defensive TDs reconcile with offensive turnovers; overtime obeys intended rules; game-script adjustments don't retroactively alter stats after the score is set.
- **T-46** [GPT] P1 Med-High — Scoring-architecture decision: repair-in-place vs possession-level vs play-level. Assess realism, cost, complexity, calibration, debuggability, maintainability, user-visible benefit; recommend the **least complex** sufficient model. Do not default to play-level.

### WS-J — Matchup & synergy calibration (P1)
- **T-47** [GPT] P1 High — Controlled experiments: (A) elite vs average OL; (B) elite vs average DL; (C) elite vs average coverage; (D) RB×OL 2×2 synergy matrix; (E) pass-rush×coverage 2×2 additivity. Measure expected points, yards, sack rate, turnovers, win probability.
- **T-48** [GPT] P1 High — Double-counting audit: trace attributes that influence outcomes through multiple paths (e.g., a DL's rating feeding team strength, pass rush, run defense, scheme bonus, and sack allocation); demonstrate effect sizes with paired sims.
- **T-49** [GPT] P2 Med-High — Additive vs multiplicative bonus behaviour: test whether stacked bonuses over- or under-react; correct only with evidence.

### WS-K — Draft AI (P1)
- **T-50** [GPT] P1 High — Quantify the early-round pruning cost: rounds 1–3 consider only the first-encountered (highest-rated) player per position; measure how often a pruned player would have been the better pick (value, flexibility, role fit).
- **T-51** [GPT] P1 High — Compare overall-rating floors vs pure value-based selection vs scarcity-aware alternatives; measure reach frequency and roster quality, not impressions.
- **T-52** [GPT] P2 Med-High — Replacement-level caching: measure the performance benefit against the decision-quality cost; keep if the cost is negligible.
- **T-53** [GPT] P2 Moderate — CPU personality/randomness: verify variation produces credible strategic diversity rather than systematic bad decisions.
- **T-54** [GPT] P1 High — Roster-completion guarantees under positional scarcity and late-round edge cases; plus Experiment-1 metrics: final roster values, positional balance, reach frequency, draft-position advantage, strategy variation, remaining elite talent.

### WS-L — Roster optimization (P1/P2)
- **T-55** [GPT] P1 High — Hungarian audit: correctness, assignment constraints, incomplete rosters, flexibility handling, flex penalties, duplicate-name collisions, draft-round preservation, performance. Protected core — audit only.
- **T-56** [GPT] P2 Med-High — Measure whether sum-of-independent-slot maximization diverges from full-team value (nonlinear interactions). Only if the divergence is material, prototype cheap local search (Hungarian init + pairwise swaps / limited neighborhood). No expensive global optimizer without substantial evidence.

### WS-M — Statistical generation (P1)
- **T-57** [GPT] P1 High — Hard-caps audit (527 pass yds/g, 296 rush yds/g, 5,400 pass, 2,060 rush, 1,930 recv, 21 sacks per season): season-vs-game-sum consistency, plateau artefacts near records, displayed totals edited without the underlying games changing.
- **T-58** [GPT] P1 High — Distribution battery over many games/seasons vs NFL reference data: points, yards, turnovers, sacks, TDs, win totals, point differential — mean/median/SD/5th/25th/75th/95th plus tails; separate fantasy-roster effects from engine defects; never calibrate to a single season.
- **T-59** [GPT] P1 High — Correction principle: if extremes are broken, fix distributions, playing-time allocation, and role constraints — don't simply delete the caps into absurdity.

### WS-N — NFL rules (P1/P2)
- **T-60** [GPT] P1 High — Schedule validation: every team exactly 17 games, correct weekly game counts, division rivals meet twice, valid home/away, no duplicated matchups, reliable termination, reasonable opponent-strength distribution.
- **T-61** [GPT] P2 Moderate — Evaluate an 18-week calendar with byes; document it as an intentional simplification or schedule the upgrade — don't leave it ambiguous.
- **T-62** [GPT] P1 High — Standings tiebreakers: test pairwise head-to-head for cyclic multi-team ties and comparator incoherence; decide whether a dedicated NFL-style tiebreak procedure is needed. Playoff-qualification impact is what makes this P1.
- **T-63** [GPT] P1 High — Playoff bracket adversarial verification: 7 per conference, 4 division winners + 3 wild cards, seeding, byes, divisional-round reseeding, home-field advantage, championship pairings, no ties, valid champion — using constructed standings, not just natural seasons.

### WS-O — Data & identity (P1/P2)
- **T-64** [GPT] P1 High — Player-universe sweep: duplicate records, identical names, missing attributes, invalid positions/teams, slot-map errors, rating-type inconsistencies, unexpected nulls, historical entries. Don't overwrite custom ratings or historical players without confirming intent.
- **T-65** [GPT] P2 Med-High — Name-based identity audit (`executePick` removes from the pool by name; roster/round preservation): quantify collision risk; adopt stable IDs only if demonstrable — no migration project without evidence.

### WS-P — Coaching (P2)
- **T-66** [GPT] P2 High — Coaching audit (`teamIdentity`, `choosePlans`, `samplePlans`, `autoPlans`, `scoutedPlan`, `offUtil`, `defUtil`): meaningful, rational, diverse, personnel- and opponent-sensitive, free of hidden information; detect always-dominant strategies and their source.
- **T-67** [GPT] P2 High — Matched-seed plan comparisons: run-heavy wins where it should; pass-heavy exploits weak secondaries; defensive packages trade off sensibly. Coaching choices must be measurable, not cosmetic labels.

### WS-Q — Security & interface (P2)
- **T-68** [GPT] P2 Med-High — innerHTML injection trace: follow actual inputs to actual sinks; targeted escaping only where warranted; don't label every innerHTML use a vulnerability.
- **T-69** [GPT] P2 Med-High — Interface-comprehension review: accuracy and usefulness of draft recommendations, WAR, scarcity, pick-loss risk, CPU pick explanations, roster weaknesses, coaching effects, matchup explanations, playoff qualification info. No cosmetic redesign this wave.

### WS-R — Reporting
- **T-70** [GPT] P1 High — Audit report per the agreed deliverables: executive assessment (~1,000–1,500 words), architecture map with a concise diagram, ranked verified-findings table, mathematical-model assessment, three-part realism assessment (causal / statistical / internal consistency), draft-AI assessment, simulation-integrity assessment with proposed invariants and automated tests, smallest-effective test strategy, phased roadmap (objective, changes, dependencies, benefit, effort, risk, tests), and top-10 recommendations with evidence and success measures.
- **T-71** [GPT] P1 High — Answer explicitly: (1) too deterministic or too random? (2) is 99-vs-90 calibrated, per position? (3) are CPU GMs strategically competent? (4) does lineup optimization account for the full team model? (5) are scoring events internally coherent? (6) do hard caps distort results? (7) are draft metrics trustworthy? (8) are game plans genuinely meaningful? (9) which calculations are most expensive? (10) what are the greatest hidden defects?

---

## Section 3 — Standing rules for every task

1. **Protected invariants — do not modify:** `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `slotWinsPerOvr()`, `optimalLineup()`, and the core `effOvr()` flex-penalty math. Any threatened touch = halt, flag `[BLOCKING]`, escalate to Owner/Architect. [Q]
2. **Baseline discipline:** all measurement against the verified PreColors build; every experiment on an isolated scratch copy; compared versions explicitly named. [GPT]
3. **No production modification** this wave (per Ruling 5): no commits, pushes, merges, rebases, branch edits, or crossing into other agents' worktrees. [GPT]
4. **Single-file, browser-only deployment is a product feature.** No frameworks, no build pipeline, no server dependency without compelling justification. [GPT]
5. **Evidence or it didn't happen:** every finding carries the taxonomy label + evidence template (function, location, current vs intended behaviour, evidence, repro, severity, recommended fix, alternatives, expected benefit, effort, regression risk, verification test). Theoretical items labelled theoretical; unrun tests admitted. [GPT]
6. **Rank by product value:** P0 data-corrupting/critical defects > P1 simulation-quality issues > P2 calibration/reliability/performance > P3 optional. Never rank speculative above verified. [GPT]
7. **When an implementation wave IS authorized:** sequential narrowly-scoped patches, Biome check, smoke test (desktop + 390 px mobile), record new sha256 in STATUS.md, report deviations — per [Q]'s protocol.
8. **Preserve intelligence:** no performance or cleanliness change that degrades CPU decision quality, removes meaningful interactions, or alters football outcomes without measurement and intent. [GPT]

---

## Section 4 — Suggested sequencing

- **Phase 0 (now):** Rulings 1–6; T-01 → T-06.
- **Phase 1 (P0, before colours):** WS-B harness (T-07–T-11).
- **Phase 2 (parallel after Phase 0):** low-risk implementation batches WS-C, WS-D, WS-E alongside read-only investigation batches WS-H, WS-I, WS-J, WS-K, WS-L, WS-M, WS-N.
- **Phase 3:** WS-F colour work once Ruling 1 and Phase 1 have landed.
- **Phase 4:** WS-G, WS-P, WS-Q hygiene / coaching / security / interface.
- **Close:** consolidated report (T-70/T-71) → Owner review → authorized fix wave.

---

## Section 5 — What the filter amended or excluded (transparency notes)

- **Play-level simulation** [GPT Option C]: kept only as a comparison branch in T-46, not a build task — complexity risk without evidence.
- **Replacing the Hungarian optimizer:** kept only as a conditional prototype (T-56), gated on measured divergence.
- **`aria-checked` on the switch label** [Q as written]: invalid ARIA — amended to the correct pattern in T-27.
- **Unconditional cap removal:** excluded; T-59 keeps the recalibrate-distributions principle instead.
- **18-week calendar with byes:** kept as an evaluation/decision task (T-61), not an implementation task.
- **Global magic-number replacement** [Q Proposal D as written]: kept only with strict scoping + output-identity verification (T-36) due to protected-invariant risk.
- **Grok's dual-doctype / `msChecked` / crash claims:** not accepted as fact — converted to verification tasks (T-02, T-33) given [Z]'s conflicting grep evidence.
- **Qwen Proposal A as a standalone patch:** subsumed into T-29 and Ruling 6 to avoid double work.

---

## Section 6 — Reply requested

1. Your ruling on each of the six Section-1 items.
2. Per-task verdicts by T-ID: accept / amend / reject / defer — including any task you believe fails the Owner's >40% confidence bar, with reasoning.
3. Proposed assignments: which councilmember or workstream takes which T-IDs, each with a bounded scope (function list + line refs), never the whole file.
4. Anything material the guest reviews missed that should be added under the same confidence bar.
