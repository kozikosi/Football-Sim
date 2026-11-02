# AGENT RELAY PIPELINE — Football-Sim Council Task Execution
**Paste this entire prompt to each agent, one at a time.** Each run of this prompt = one agent session that (a) reviews the oldest under-reviewed completed tasks, then (b) picks up the highest-priority open task, then (c) closes out with a ledger update. Reviews complete after **three independent passing reviews**.

---

## 1. Context

You are a councilmember agent working on **Football Sim** (`kozikosi/Football-Sim`), a self-contained single-file browser app (`Football-Sim-*.html`). Verified baseline: `_agents/pickle/builds/Football-Sim-PreColors.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 6,553 lines. The task slate below was produced by the Council Coordinator, verified against source, and ruled on by the Architect (Claude).

**Hard product constraints:** single-file deployment, browser-only, no frameworks, no build pipeline, no server dependencies.

**PROTECTED INVARIANTS — never modify:** `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `slotWinsPerOvr()`, `optimalLineup()`, and the core `effOvr()` flex-penalty math. If a task seems to require touching these: **STOP, mark the ledger entry `[BLOCKING]`, and escalate to the Architect/Owner.** Audit-only discussion of them is fine.

**Governance:** no merges, pushes to protected branches, or production-file edits without the Owner's explicit authorization for that specific task. Audit tasks write reports only. Implementation tasks write patches on the branch/scratch the Architect designated. Respect existing repo conventions (STATUS.md, CHRONICLE.md, KNOWN-ISSUES.md, tests/CONTRACT.md). Do not create competing registries beyond the one ledger defined below.

## 2. The ledger

All state lives in **`TASK-LEDGER.md`** at the repo root. If it does not exist yet, you are the bootstrap agent: create it from the slate in Section 6 (verbatim, one row per task), note its creation in CHRONICLE.md, and inform the Architect. (If the council later prefers porting it into `master_task_list.md`, the Architect will order a single migration — one registry, never two.)

Statuses: `OPEN → IN-PROGRESS → DONE → VERIFIED`
Each row tracks: Task ID · Priority · Type (AUDIT / IMPL / RULING) · Status · Owner (agent name + date) · Review log (up to 3 entries: reviewer, verdict PASS/FAIL, one-line evidence) · Artifact pointers (file paths, hashes, smoke results).

## 3. Session protocol (follow in this exact order)

**Step 0 — Sync.** Pull the latest repo state. Read: `TASK-LEDGER.md`, `STATUS.md`, `KNOWN-ISSUES.md`, latest `CHRONICLE.md` entries, and the Architect's current rulings. Never work from a stale checkout.

**Step 1 — Review pass (max 2 reviews, oldest first).**
- Find the **two oldest tasks with status DONE and fewer than 3 review entries**.
- For each, perform an **independent review** — do NOT first read the implementer's narrative and agree with it. Instead: (1) re-read the task brief; (2) inspect the actual diff/artifact; (3) verify protected invariants are untouched (grep the invariants against the changed build); (4) for IMPL tasks: confirm Biome passes, the smoke test (desktop + 390 px mobile) result is recorded, and the new sha256 is in STATUS.md; for AUDIT tasks: spot-check at least two claims against source with line numbers.
- Append a review entry: reviewer name, date, verdict `PASS` or `FAIL(rework: <reason>)`.
- **Third passing review ⇒ status becomes VERIFIED** (review complete).
- Any FAIL ⇒ status returns to OPEN, review count resets to zero, rework notes appended. Two consecutive FAILs on the same task ⇒ flag to the Architect.
- You may never review a task you owned.

**Step 2 — Claim pass.** Pick the **highest-priority OPEN task** that is (a) not owned by another active agent, (b) not type RULING (those are Architect/Owner-only — skip them), and (c) not flagged `[BLOCKING]`. Set it IN-PROGRESS with your name and date. Claim order = ledger timestamp order; if two agents claim simultaneously, the earliest ledger entry wins and the later agent picks the next task.

**Step 3 — Execute.** Follow the task brief and the standing rules (Section 5). AUDIT tasks produce a report (with evidence template: function, location, current vs intended behaviour, evidence, repro, severity, recommendation, effort, risk, verification test). IMPL tasks produce a narrowly-scoped patch + Biome run + smoke test + new sha256 recorded in STATUS.md. Use isolated scratch copies for experiments; never experiment in production files.

**Step 4 — Close pass.** Update the ledger row (DONE + artifact pointers + review-eligible note), append a CHRONICLE.md entry (task ID, what was done, evidence, open questions). If you found something requiring an Architect decision, add it to the ledger's escalation section.

**Step 5 — Report.** Return one message: (1) tasks you reviewed with verdicts; (2) task you claimed and completed; (3) artifacts produced (paths/hashes); (4) any `[BLOCKING]` flags or escalations. If you could not complete a step, say so plainly — never claim work you did not do.

## 4. Why this shape (do not deviate)

- Review-before-claim keeps every finished task on a path to three independent reviews without a dedicated QA agent.
- Oldest-first review ordering guarantees every task converges to VERIFIED (simulate it: each session reviews the two oldest under-reviewed tasks, so review debt never accumulates).
- Max 2 reviews + 1 new task per session keeps sessions bounded and review quality high.
- Reviewers must re-derive findings from source; agreement-without-verification does not count as a review.
- Split verdicts (e.g., 2 PASS / 1 FAIL): the Architect breaks the tie.

## 5. Standing rules for every task

1. Evidence or it didn't happen. Theoretical findings are labelled theoretical; unrun tests are admitted as unrun.
2. No experiment may be claimed that was not run; no hash may be recorded that was not computed.
3. Classify every finding: confirmed bug / probable bug / calibration problem / architectural weakness / intentional simplification / improvement opportunity.
4. Rank nothing above verified defects; P0 (data-corrupting/critical) > P1 (simulation quality, reliability) > P2 (calibration, hygiene) > P3 (optional).
5. Preserve intelligence: no optimization may reduce CPU decision quality or remove meaningful football interactions; prefer caching, immutable reuse, better data structures.
6. Bounded scope: work only from your task brief's function list and line references; do not read the whole 657 KB file unless your task requires it.
7. Report deviations, blockers, and surprises — including evidence that contradicts the task brief's assumptions.

## 6. Task slate (priority order; skip RULING-type rows)

| ID | Pri | Type | Task |
|---|---|---|---|
| T-01 | P0 | IMPL | Record ratified baseline identity in STATUS.md (sha256 `40233d6b…`, blob `1087b656…`, 657,486 B, 6,553 lines) |
| T-02 | P0 | IMPL | Reconcile KNOWN-ISSUES.md: close KI-003/004/005/006/007 (verified resolved), correct KI-009 to 56 occurrences/38 lines |
| T-03 | P0 | IMPL | Add SIM-CORE markers + headless entry points `buildDraftState` / `simulateDraftHeadless` / `buildLeagueFromDraft` per tests/CONTRACT.md C2 (behaviour-preserving wrapping only) |
| T-04 | P0 | IMPL | Seeded RNG (mulberry32) behind `rnd()`; re-route all 56 Math.random occurrences (38 lines); default behaviour preserved |
| T-05 | P0 | IMPL | Deterministic `baseline.json` flow per C6/B4 once T-04 lands |
| T-06 | P0 | AUDIT | Diff `V22-candidate-teamcolours.html` vs baseline: strict-superset check + protected-function hashes (feeds Architect's base ruling) |
| T-07 | P0 | IMPL | Experiment harness: paired seeds, scenario control, sample-size/CI reporting standard |
| T-08 | P0 | IMPL | Adopt evidence taxonomy + 13-field evidence template into ledger/CHRONICLE conventions |
| T-09 | P1 | AUDIT | Architecture map + dual causal-path trace; identify authoritative model |
| T-10 | P1 | AUDIT | Displayed WAR vs simulated marginal wins (paired-seed substitutions, CIs) — central validation |
| T-11 | P1 | AUDIT | Positional value curves 70→99 per position; linearity, elite premium, scarcity |
| T-12 | P1 | AUDIT | Philosophy-fairness: line/RB strategies win credibly; QB not artificially suppressed |
| T-13 | P1 | AUDIT | Reconstruct `simulateGame` (L2286) dependency graph; inventory randomness/caps/clamps/rounding |
| T-14 | P1 | AUDIT | Reconciliation battery: score ↔ quarters ↔ scoring events ↔ TDs ↔ turnovers ↔ sacks ↔ PBP ↔ narrative; minimal repros |
| T-15 | P1 | AUDIT | Targeted: def-TDs ↔ turnovers; OT rules; game-script timing vs stats |
| T-16 | P1 | AUDIT | Scoring-architecture decision: repair vs possession-level vs play-level (least complex sufficient) |
| T-17 | P1 | AUDIT | Matchup experiments: OL / DL / coverage swaps; RB×OL 2×2; rush×coverage additivity |
| T-18 | P1 | AUDIT | Double-counting audit across `MC` coefficients, scheme bonuses, sack allocation |
| T-19 | P1 | AUDIT | Additive vs multiplicative bonus behaviour test |
| T-20 | P1 | AUDIT | Quantify `cpuPick` (L1400) first-at-position pruning cost (rounds 1–3) |
| T-21 | P1 | AUDIT | Overall-rating floors vs value-based vs scarcity-aware selection |
| T-22 | P1 | AUDIT | Replacement-level caching (every 6 picks): perf vs decision-quality cost |
| T-23 | P1 | AUDIT | CPU personality/noise: credible diversity vs systematic error |
| T-24 | P1 | AUDIT | Roster-completion adversarial tests + draft-quality metrics (values, balance, reaches, pick-position advantage) |
| T-25 | P1 | AUDIT | `optimalLineup` (L1206) Hungarian correctness audit (protected — audit only) |
| T-26 | P1 | AUDIT | Slot-sum vs full-team-model divergence; conditional cheap local-search prototype only if material |
| T-27 | P1 | AUDIT | Caps audit `PER_GAME_CAP` (L3477) / `SEASON_RECORD_CAPS` (L3478): season-vs-game-sum consistency, plateaus |
| T-28 | P1 | AUDIT | Statistical distribution battery vs NFL reference (percentiles, tails, multi-season) |
| T-29 | P1 | AUDIT | Schedule invariants (L1059): 17/17, division twice, H/A validity, termination, strength spread |
| T-30 | P1 | AUDIT | Byes/18-week calendar decision doc (intentional simplification or upgrade plan) |
| T-31 | P1 | AUDIT | `sortStandings` (L3258) cyclic multi-team ties; comparator incoherence; NFL-style tiebreak proposal |
| T-32 | P1 | AUDIT | Playoff bracket adversarial verification via constructed standings |
| T-33 | P1 | AUDIT | Player-universe sweep (1,200 records + TEAM_DATA): duplicates, name collisions, invalid codes, slot maps |
| T-34 | P1 | AUDIT | Name-based identity audit (`executePick` L1444); stable IDs only on demonstrated risk |
| T-35 | P1 | AUDIT | Coaching audit (`teamIdentity`, `choosePlans`, `samplePlans`, `autoPlans`, `scoutedPlan`, utilities) |
| T-36 | P1 | AUDIT | Matched-seed coaching-plan comparisons (run/pass/package measurability) |
| T-37 | P1 | AUDIT | innerHTML injection trace: real inputs → real sinks; targeted escapes only |
| T-38 | P1 | IMPL | localStorage persistence: debounced, schema-versioned `draftSim`/`seasonState`/`league100` snapshots |
| T-39 | P1 | IMPL | Replace MutationObservers (L6446/L6547) with container-scoped `afterRender()` hook + missed-update safety net |
| T-40 | P1 | IMPL | Debounce player search + draft-board input (L772/L1119), ~150 ms |
| T-41 | P1 | IMPL | DocumentFragment table builds; evaluate visible-rows-only rendering |
| T-42 | P1 | IMPL | Event delegation for `tr.teamrow` clicks (L637/L6220 pattern) |
| T-43 | P1 | IMPL | Chunk `simToEnd` (L1538): 120 ms slices + progress bar |
| T-44 | P1 | IMPL | Guard `seasonState = L` swap (L6003); explicit re-entrancy |
| T-45 | P1 | AUDIT | Profiling suite (draft init, auto-draft, lineup opt, schedule, game, season, playoffs, renders) |
| T-46 | P1 | IMPL | 18-workflow reliability matrix (draft start → Super Bowl → restart) |
| T-47 | P1 | IMPL | Vertical term in e2e `inVp` predicate |
| T-48 | P1 | IMPL | Mobile CTA above the fold at 390×844 |
| T-49 | P1 | IMPL | Keyboard/a11y pass: tabindex + Enter/Space, `aria-sort`, `:focus-visible`, labelled `.poslist` |
| T-50 | P1 | IMPL | `scope="col"` on thead; correct switch pattern (role=switch on input, state via checked); descriptive aria-labels |
| T-51 | P1 | IMPL | Fix corrupted `[hidden]` selector at L3 (restore `[hidden]:not([hidden=until-found i])`) |
| T-52 | P2 | RULING→IMPL | Colour hardening — **blocked until Architect rules R-1/R-6** (TEAM_COLORS data, luminance helper, middle-stop rule, applyTeamColors call sites, custom properties, purge hardcoded accents) |
| T-53 | P2 | AUDIT | 32-team contrast matrix (light/dark, stripe/panel) |
| T-54 | P2 | RULING | Colour surface order (banner → rows → cards → champion) — Architect decides |
| T-55 | P2 | IMPL | Shell cleanup: L3 `<style>` into `<head>`, single coherent sheet, fold system rules into `:root` |
| T-56 | P2 | IMPL | Consolidate four 760px media blocks (L153/255/274/290); mobile visual regression test |
| T-57 | P2 | IMPL | Dead-code removal post-R-4 (`goSeason` L846 + KI-013 list) |
| T-58 | P2 | IMPL | Split data lines (PLAYERS ~83 KB, TEAM_DATA ~44 KB) to per-record lines/JSON islands; content unchanged |
| T-59 | P2 | IMPL | Scoped CONFIG extraction (70 / 32 / 26 / 8) with invariant hash check + output-identity verification; abandon on any invariant touch |
| T-60 | P2 | IMPL | Scoped Biome pass: real errors > style noise; no mass reformat |
| T-61 | P2 | IMPL | favicon + og:image |

**Execution waves (unless the Architect reorders):** Wave 1 = T-01→T-08. Wave 2 = T-38→T-51. Waves 3+ = P1 audits in ID order (parallelizable across agents). P2 awaits rulings.
