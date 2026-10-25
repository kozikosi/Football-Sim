# PROMPT FOR CLAUDE (THE ARCHITECT) — v2

**FROM:** Council Coordinator (acting for the Owner)
**DATE:** 2026-10-25
**SUBJECT:** Ground-truth-verified task slate — baseline independently verified, reviewer conflicts resolved, 61 reconciled tasks + 6 rulings, ready for the relay pipeline
**STATUS:** Dissemination package. Implement nothing until you rule (Section 1) and the Owner authorizes each phase. Execution will run through the relay-review pipeline (companion prompt `AGENT-PIPELINE-PROMPT.md`).

Claude —

Since my v1 slate, three things changed. **First**, the Owner asked me to independently clone the repository and verify every claim against the actual baseline. **Second**, a second wave of reviews arrived (Deepseek's 38-item filter, Qwen's structural breakdown, Grok's verified baseline read, Gemini's ground-truth audit, and a refined verification assignment). **Third**, the union of all reviews has now been reconciled against source of truth. Full evidence: `BASELINE-VERIFICATION.md` (attached to this dispatch).

**Baseline identity — verified, not assumed:** `_agents/pickle/builds/Football-Sim-PreColors.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, blob `1087b6563ae614e45f580cbcc3480147202d98de`, 657,486 bytes, **6,553** lines, repo HEAD `d1a7f62`. Every contested claim below was settled by grep/read against this exact file.

## Section 1 — Rulings (now cheap: most evidence is in)

1. **V22 base artefact.** The coloured candidate exists (664,581 B, sha256 `d15f6535f9e15c98…`, `TEAM_COLORS`/`applyTeamColors` present, +7,095 B over baseline). Grok's "strict superset" claim is *plausible but unproven*. **Rule:** order a real diff + protected-function hash check; promote only if superset + hashes clean; otherwise document fallback. PreColors remains the audit/measurement baseline either way.
2. **Reviewer conflicts — resolved by source, please ratify:** rWeights/`msChecked`/dual-doctype are **fixed** on this build (tracker KI-003/004/005/006/007 are stale); Math.random = **56 occurrences on 38 lines** (Z and Grok were counting different units); Qwen's "three" 760px media blocks are actually **four** (L153 + L255/274/290); the verification doc's "6,554 lines" is an off-by-one.
3. **Sequencing.** Re-affirm: SIM-CORE markers + seeded RNG land **before** the colours pass so every colours candidate is harness-verifiable.
4. **`goSeason()` (L846).** Now verified dead (only a self-reference; guards on `#seasonHost` which nothing creates). Recommend delete per KI-013; your call under R-16.
5. **Audit-only posture** for investigation tasks; implementation tasks only where you mark them APPROVED-IMPL (P0 harness + P1-Reliability are the natural first wave). Accept/amend.
6. **Colour-variable convention.** Coloured prototype's `--team1/2/3/--team-stripe` vs Qwen's `--team-primary/--team-secondary`: pick one before any colour task starts.

## Section 2 — New verified findings nobody reported

- **Corrupted `[hidden]` selector (L3):** the system sheet ends `…}idden]:not(idden=until-found i]){display:none!important}` — the intended `[hidden]:not([hidden=until-found i])` rule lost its brackets; browsers drop it. Latent today (no `.hidden=` assignments), one-line fix in shell cleanup.
- **KI-009 drift:** tracker says 58/39 Math.random; this build measures 56/38 — more tracker-staleness evidence.
- **Data reality:** PLAYERS is exactly **1,200** records (~83 KB) *plus* `TEAM_DATA` ~44 KB (L450) — the "two-line ~127 KB" tracker entry is the accurate frame.

## Section 3 — Reconciled task slate (62 tasks)

Legend: **[A]** audit/investigation only · **[I]** implementation candidate · **[R]** ruling needed first. Sources merged from Grok/GPT/Qwen/Z/Deepseek/Gemini + coordinator verification; duplicates collapsed.

### P0 — Foundation (do first; I / A)
- **T-01 [I]** Ratify baseline identity in STATUS.md (evidence already attached — this is a recording task, not a re-measurement).
- **T-02 [I]** Reconcile KNOWN-ISSUES.md: close KI-003/004/005/006/007 as verified-resolved; correct KI-009 to 56/38; note KI-010's two-line framing.
- **T-03 [I]** Add SIM-CORE markers + the three headless entry points (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`) per `tests/CONTRACT.md` C2. Wrapping exercise — move helpers inside markers, never refactor.
- **T-04 [I]** Seeded RNG (mulberry32) behind `rnd()`; re-route all 56 occurrences / 38 lines; behaviour-preserving by default.
- **T-05 [I]** Deterministic `baseline.json` per C6/B4 (verifier `--write-baseline` flow) once T-04 lands.
- **T-06 [A→R]** Superset verification of `V22-candidate-teamcolours.html` (diff vs baseline + protected-function hashes) → feeds Ruling 1.
- **T-07 [I]** Experiment harness: paired seeds, scenario control, sample-size/CI reporting standards.
- **T-08 [I]** Bootstrap the relay-review ledger (companion pipeline prompt) and adopt the evidence taxonomy (confirmed bug / probable bug / calibration problem / architectural weakness / intentional simplification / improvement opportunity) + 13-field evidence template.

### P1-INTEL — Simulation & AI investigations (audit-only)
- **T-09 [A]** Architecture map + dual causal-path trace (ratings→units→matchup→stats→score→wins vs ratings→WAR→CPU priority); name the authoritative model.
- **T-10 [A]** **Central validation:** displayed WAR vs simulated marginal wins, paired-seed substitutions per position, CIs reported.
- **T-11 [A]** Positional value curves: 70→80→90→95→99 implied wins per position; linearity, elite premium, scarcity (`slotWinsTable`, `slotWinsPerOvr`, `winsAt`, `playerWar`, `replacementLevels`, `staticReplacement`).
- **T-12 [A]** Philosophy-fairness: line/RB strategies must win via credible mechanisms, QB not artificially suppressed.
- **T-13 [A]** Reconstruct `simulateGame` (L2286) dependency graph: determinism, randomness, caps, clamps, rounding.
- **T-14 [A]** Reconciliation battery: score ↔ `quarterTotals` (L2154) ↔ `makeScoringEvents` (L2729)/`scoreDecompositions` (L2698) ↔ player/team TDs ↔ turnovers ↔ sacks ↔ PBP ↔ narrative; minimal repros for every gap.
- **T-15 [A]** Targeted: defensive TDs ↔ turnovers; OT rules; game-script adjustments not rewriting stats post-score.
- **T-16 [A]** Scoring-architecture decision: repair vs possession-level vs play-level — least complex sufficient model; never default to play-level.
- **T-17 [A]** Controlled matchup experiments: OL / DL / coverage swaps; RB×OL 2×2; rush×coverage 2×2 additivity.
- **T-18 [A]** Double-counting audit across `MC` (L2087) coefficients, scheme bonuses, sack allocation.
- **T-19 [A]** Additive vs multiplicative bonus behaviour test.
- **T-20 [A]** Quantify `cpuPick` (L1400) first-at-position pruning cost (R1–3) incl. the QB-run exception.
- **T-21 [A]** Floors (`Math.max(90, topAvail-5)` / `Math.max(85, topAvail-8)`) vs value-based vs scarcity-aware selection.
- **T-22 [A]** Replacement-level caching (every 6 picks): perf benefit vs decision-quality cost.
- **T-23 [A]** CPU personality/noise: credible diversity vs systematic error.
- **T-24 [A]** Roster-completion adversarial tests (scarcity, late rounds, forced runs) + Experiment-1 metrics (roster values, balance, reaches, pick-position advantage).
- **T-25 [A]** `optimalLineup` (L1206, Hungarian) correctness audit — protected; audit only.
- **T-26 [A]** Slot-sum vs full-team-model divergence; conditional cheap local-search prototype only if material.
- **T-27 [A]** Caps audit: `PER_GAME_CAP` (L3477) & `SEASON_RECORD_CAPS` (L3488-class) vs game-sum consistency, plateau artefacts. If correction is warranted: recalibrate distributions/playing-time — never blind cap removal.
- **T-28 [A]** Distribution battery vs NFL reference (points, yards, TOs, sacks, TDs, records, point differential; percentiles + tails; multi-season; separate fantasy-roster effects from engine defects).
- **T-29 [A]** Schedule invariants (L1059): 17/17, division twice, H/A validity, no dup matchups, termination ≤3000 attempts, opponent-strength spread.
- **T-30 [A]** Byes/18-week calendar: write the intentional-simplification decision doc (Owner's call, not a bug).
- **T-31 [A]** `sortStandings` (L3258) pairwise-H2H cyclic multi-team ties; comparator incoherence; NFL-style tiebreak proposal; playoff-qualification stakes.
- **T-32 [A]** Playoff bracket adversarial verification (7/conference, seeds, byes, reseeding, HFA, no ties, valid champion) via constructed standings.
- **T-33 [A]** Player-universe sweep (duplicates, name collisions, invalid pos/team codes, slot maps, nulls, historical entries; don't overwrite customs).
- **T-34 [A]** Name-based identity audit (`executePick` L1444 pool removal; round preservation); stable IDs only on demonstrated risk.
- **T-35 [A]** Coaching audit (`teamIdentity`, `choosePlans`, `samplePlans`, `autoPlans`, `scoutedPlan`, utilities): meaningful, opponent-sensitive, no dominant strategy.
- **T-36 [A]** Matched-seed plan comparisons: run/pass/package effects measurable, not cosmetic.
- **T-37 [A]** innerHTML injection trace: real inputs → real sinks; targeted escaping only.

### P1-REL — Reliability & UX implementation candidates
- **T-38 [I]** localStorage persistence: debounced, schema-versioned snapshots of `draftSim`/`seasonState`/`league100`; cleared on new draft.
- **T-39 [I]** Replace both document-wide MutationObservers (L6446 highlighter, L6547 stacker) with an explicit `afterRender()` hook; container-scoped; keep a missed-update safety net (the observers' guards were careful — don't lose coverage).
- **T-40 [I]** Debounce player search (~150 ms) and draft-board input (L772/L1119 rebuild paths).
- **T-41 [I]** DocumentFragment table builds; evaluate visible-rows-only rendering for the 1,200-row browser.
- **T-42 [I]** Event delegation for `tr.teamrow` clicks (pattern confirmed at L637/L6220).
- **T-43 [I]** Chunk `simToEnd` (L1538) like the 100-season loop (120 ms + progress bar).
- **T-44 [I]** Guard the `seasonState = L` swap (L6003); make chunk re-entrancy explicit.
- **T-45 [A]** Profiling suite before any optimization; per-bottleneck: time, frequency, % runtime, cause, fix, risk. Preserve-intelligence rule applies.
- **T-46 [I]** 18-workflow reliability matrix (draft start → … → Super Bowl → restart); hunt invalid states, stale data, double-sims, missing handlers.
- **T-47 [I]** Add vertical term to e2e `inVp` predicate (below-fold regressions currently invisible).
- **T-48 [I]** Mobile CTA above the fold at 390×844 (`#startSeasonBtn` ~119 px below fold).
- **T-49 [I]** Keyboard/a11y pass: `tabindex` + Enter/Space on sortable headers, chips, `.poslist`; `aria-sort`; `:focus-visible`; labelled dropdown (0 keydown / 0 tabindex / 2 aria- today).
- **T-50 [I]** Table & toggle semantics: `scope="col"` on `thead` th; switch pattern done correctly (accessible name + `role="switch"` on the input, state via `checked` — **not** `aria-checked` on the label); descriptive close-button label.
- **T-51 [I]** Fix the corrupted `[hidden]` selector (L3) — one line, restore `[hidden]:not([hidden=until-found i])`.

### P2 — Hygiene & V22 colour readiness
- **T-52 [R→I]** Colour hardening per Ruling 1+6: `TEAM_COLORS` as data; luminance helper + middle-stop visibility rule; `applyTeamColors()` at every team-known point; custom properties over inline styles; purge hardcoded `#4f8cff`/`#ff6b4a`.
- **T-53 [A]** 32-team contrast matrix (light/dark, stripe/panel).
- **T-54 [R]** Colour surface order: draft-as banner → board rows → matchup cards → champion banner (Owner R-18) — Architect sets final order.
- **T-55 [I]** Shell cleanup: L3 `<style>` into `<head>`; single coherent sheet; fold system rules into `:root` (includes T-51 fix).
- **T-56 [I]** Consolidate the four 760px media blocks (L153/255/274/290) into one; merge duplicate selectors; mobile visual regression test.
- **T-57 [I]** Dead-code removal post-Ruling 4 (`goSeason` L846 + KI-013 list).
- **T-58 [I]** Split the two data lines (PLAYERS ~83 KB, TEAM_DATA ~44 KB) to one-record-per-line or JSON islands; content unchanged; single-file deployment preserved.
- **T-59 [I]** CONFIG extraction (scoped: default ovr 70, 32 teams, 26 slots, emergency flex 8) with protected-invariant hash check + output-identity verification; abandon on any invariant touch. Note: constants may be empirically calibrated — when in doubt, leave them.
- **T-60 [I]** Scoped Biome pass: real errors > style noise; no mass reformat.
- **T-61 [I]** favicon + `og:image`.

## Section 4 — Standing rules (condensed, unchanged in substance)

1. Protected invariants: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `slotWinsPerOvr()`, `optimalLineup()`, `effOvr()` flex-penalty math. Threatened touch = `[BLOCKING]` halt.
2. Audit tasks never modify production; implementation tasks run on scratch/branch per your authorization; no merges/pushes without Owner.
3. Single-file, browser-only, no frameworks, no build pipeline.
4. Evidence template + taxonomy on every finding; never claim an unrun experiment.
5. P0 > P1 > P2 by product value; never speculative above verified.
6. Implementation tasks end with: Biome, smoke (desktop + 390 px), new sha256 in STATUS.md, deviations reported.

## Section 5 — Reply requested

1. Ratify/amend the six rulings (evidence attached — rulings 2 and 4 need only your sign-off).
2. Per-task verdicts (accept/amend/reject/defer) by T-ID.
3. Mark the first implementation wave (suggest T-01→T-05, T-08 as pre-authorized; T-38–T-51 contingent on your APPROVED-IMPL list).
4. Confirm the relay-review pipeline (companion prompt) as the execution mechanism, with you as escalation point for `[BLOCKING]` and review conflicts.
