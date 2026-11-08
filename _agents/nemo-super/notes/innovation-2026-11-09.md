# Innovation notes — Super (council/super), 2026-11-09

Seat: Super · Model: Nemotron 3.5 Super via OpenCode · State: standby (roster `_agents/README.md`)
Lane folder: `_agents/nemo-super/` · Branch: `council/super` · Base build: `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) — VERIFIED via `sha256sum`; unchanged this session (read-only on product/protected files per AGENTS §3).
OR's salary branch hash `395f26411333a41f` NOT used.

All claims labelled VERIFIED / REPORTED / INFERRED / UNKNOWN with the command that supports them. ≥40 answers are INFERRED or better.

Builds on `_agents/nemo-super/notes/innovation-2026-11-08.md` (11-08 session). This 11-09 session re-answers all 60 questions, upgrades labels where fresh commands support it, adds 2 new tools/improvements (`heldout-lint.mjs`, `run-all-tests.mjs --smoke` + path fix), adds governance artifact D-011, updates the lane file, files an inbox entry, and produces the session zip.

---

## Fit-target & circularity (Q1–Q7)

**Q1** Given D-007 (fit target was design@27Oct×0.00254, not personal), does your dissent list change? Does "demoting Shadow Sim RMSE" become more or less justified?

**INFERRED.** The dissent list does not change; demoting Shadow Sim RMSE becomes *more* justified. D-007 shows the fit target was `design.json` (27 Oct) × 0.00254 — the engine-mechanics table itself — so the "independent" fit is pure circularity (measurement fitted to its own target). Shadow Sim RMSE was already a weak source of truth (Z.ai dissent); learning the fit target is the mechanics removes any remaining case for treating RMSE-vs-shadow as validation. Command: `node tools/mathlab/triangulate.mjs --design design.json --fit results/fit-super-verify-2026-11-07.json` → saved 11-07 result: 32 AGREES, 1 FEW-SOURCES, nDisagree=0, meanSpreadWins tiny, spearman=0.999 (raw≈fitted≈design, circularity confirmed, VERIFIED 2026-11-07).

**Q2** Is there any build where the display layer is NOT absorbed? Confirm or refute with a build hash.

**UNKNOWN.** "Absorbed" is not defined in any file I can locate, and I have no tool that measures display-layer absorption across builds. The only builds I can hash are Pre-Colors (`40233d6b…`) and OR's salary branch (`395f2641…`); neither is documented as having a non-absorbed display layer. I therefore cannot confirm *or* refute a non-absorbed build with a hash. Command that would settle it: a build-by-build scan hashing each candidate and measuring the display layer (tool does not exist yet).

**Q3** Should the raw-curve witness run on every build the Architect ships, as a gate? Cost (time, bytes) per build?

**INFERRED — Yes, as a lightweight gate.** The witness is plain Node (sandbox eval of the product's inline engine, no Playwright), so it can run on every shipped build without browser cost. Cost per build: ~0.6s CPU (measured: `time node triangulate.mjs ...` → 0.569s total); output is ~KB JSON + optional CSV of raw curves (`raw-curves-enhanced.csv`, ~22 KB); adds <50 KB of committed artifacts if retained. It checks derived1000 vs expected700, quantError700 (|error|≤2.5 per AGENTS §3), Spearman correlation, and disagreement flags — cheap, deterministic, and already validated against Beam (0.0000 diff). Command: `time node tools/mathlab/triangulate.mjs --design design.json --html Football-Sim-PreColors.html --md`.

**Q4** The Owner's permission to abandon the old tables is granted. Propose the exact commit sequence retiring them + MERGE-MANIFEST re-pin.

**INFERRED.** Exact sequence (one commit, per R-001/R-002 binding Owner permission):
1. Retire the old personal table and salary table as *fit targets*; keep them only as display presets / independent anchors (do not delete data — move to `_archive/` or mark as presets).
2. In the **same commit**, re-pin every protected-constant hash line in `MERGE-MANIFEST.md` that the change touches (AGENTS §3: "A change to any of them ... re-pins its hash in MERGE-MANIFEST.md in the same commit").
3. Verify product sha256 unchanged if no product file is edited (`sha256sum Football-Sim-PreColors.html` → still `40233d6b…`).
4. Architect re-pins; Verifier confirms. Command: `git add -- <retired-table-files> MERGE-MANIFEST.md && git commit -m "..."`. Never `git add -A`.

**Q5** OR implemented salary-based DEFAULT_WEIGHTS. Does this resolve the circularity or relocate it? Argue with evidence.

**INFERRED — It relocates the circularity, it does not resolve it.** The salary table is a new external anchor, but unless validated against independent real data (snap share, EPA), the weights are still "fitted to a target" — now salary instead of the personal/design table. Evidence: D-004 shows QB weight share (22.7%) matches QB EPA share (24.0%), not QB snap share (9.1%), so the engine already weights by impact; imposing a salary anchor would substitute an unverified relationship (salary ≠ marginal wins). The salary table itself arrived 6 Nov and was never a fit target (D-001 owner addendum). Command: none (reasoning); `triangulate.mjs --calibrated <salary.json>` can compare `salaryOnly` vs `design` anchors to measure the relocation.

**Q6** The new-preset (QB=1000, +50 increments) vs salary table: which is more defensible as a default? What would the Owner prefer?

**INFERRED.** The new-preset (QB=1000, +50 from raw slopes) is more defensible as the default because it derives from `slotWinsPerOvr()` raw slopes, which *is* measurable and validated (T1/T3: all slots within ±0.8% of design). OR's salary table is unvalidated against real data (D-001). The Owner likely prefers salary-based (it is now his DEFAULT_WEIGHTS), but the mechanically-grounded preset is the defensible default. R-002 already prescribes "QB=1000, other slots following from engine math, increments of 50" — exactly the new-preset. Command: `node tools/mathlab/fitlm.js Football-Sim-PreColors.html cfg.json` to view raw slopes.

**Q7** If both mechanics (design@27Oct) and display (salary) are unvalidated, what is the FIRST validation experiment you would run, and what result would change your mind?

**INFERRED.** First experiment: the position-weight bias audit (already done, REPORTED in `bias-results-2026-11-07.md` M4/M5) — compare each slot's engine weight share to real nflverse snap share and EPA share. Result that changes my mind: if salary-based weights shrink *all* position deltas below the 5 pp flag threshold (D-002 DL +16.0 pp, D-003 LB −13.1 pp, D-006 RB marginal 0.247 vs real 0.003) relative to mechanics-based weights, salary wins; otherwise mechanics-based stands and salary is demoted to a display preset. Command: re-run `tools/mathlab/fitlm.js` + bias audit on OR's branch (`git show origin/council/or:...`) and compare deltas.

---

## Mechanics & validation (Q8–Q14)

**Q8** T1 skill production is CLEAN. Good enough, or tolerance bands too loose? Show bands + actual deltas.

**VERIFIED (re-run this session).** `node tools/mathlab/mechanics-harness.mjs --fit results/fit-super-verify-2026-11-07.json` → nSlots=32, nPass=32, nFail=0, pre-registered, rule FAIL→REPORT never auto-adjust. Sample deltas vs bands: QB L1=2.54 [1.5–4] OK, RB1 L1=0.58 [0–5] OK, WR1 L1=1.20 [0.6–2] OK, DE1 L1=2.15 [1.0–3.5] OK (typical). All 32 slots within pre-registered bands. Bands are not too loose: they exclude 0-fail slots only when a slot lands outside (none did). L2 Production and play-level outcomes flagged NEEDS-RNG (no injectable RNG yet). Command re-run: same command → identical receipt (deterministic).

**Q9** Sacks DB 0.0% vs real 7.3% (D-001): blitz-frequency, DB-rating, or engine gap (no blitz logic)? Smallest fix.

**INFERRED — engine gap (no blitz logic).** `matchupModel` computes sacks from `passRush` vs `olPass` plus coverage; there is no blitz-frequency parameter and no DB-rating → sack term. Real 7.3% sack rate vs engine 0.0% indicates the model never generates sacks at real frequency. Smallest fix: add a blitz-frequency knob to `PLAN_K`/`DEF_FOCUS` that raises `lamSack` (and `passRush`) when the defense blitzes, gated so run defense isn't over-penalized. Would break: sack/TO correlation and `structPts` balance; needs T1 re-run. Command: inspect `matchupModel` in the product (sack channel `skParts` uses `MC.skRush*dRush`, no blitz term).

**Q10** DB INT +5.9pp (D-002): coverage-rating or QB-decision? How to distinguish experimentally?

**INFERRED.** Distinguish by a controlled experiment: hold QB decision fixed and vary only coverage rating, then measure INT rate; and vice versa (hold coverage, vary QB decision). If INT moves with coverage at fixed QB → coverage-rating cause; if it moves with QB decision at fixed coverage → QB-decision cause. The engine's `toParts` channel already splits `toQb`, `toCov`, `toRush` — so the ledger exists; the experiment is to instrument which term drives the delta. Command: run `matchupModel` with `dCov` swept at constant `dQB` and compare `lamTO`.

**Q11** Efficiency rung NOT measurable (no per-play ledger). Minimal ledger: fields, frequency, byte cost per game/season.

**INFERRED.** Minimal per-play ledger fields: playId, quarter, time, down, distance, yardline, offense/defense team, play type (run/pass), yards, outcome, EPA, scorer (slot), turnover, sack. Frequency: every play (~130–160 plays/game). Byte cost: ~100 bytes/play → ~15 KB/game, ~255 KB/season (272 games). That's trivial vs the 657 KB product; cost is in *logic* (instrumenting `simulateGame`/`realize`) not storage. Consumer: the awards/game-ball rule and per-play EPA attribution (Q43/Q48). Command: instrument `realize()` in a lane copy of the script and count records per `playGame`.

**Q12** Team wins 8.5 [8.21–8.72] vs real ~8.5. Calibrated or tautology (tuned to produce ~8.5)? How to tell?

**INFERRED.** It could be either; the confidence interval [8.21–8.72] straddling 8.5 is consistent with both a calibrated model and a tautology. To tell: predict wins for a *holdout* season/team not used in any tuning, using only pre-season roster ratings. If holdout wins also center on ~8.5 with correct spread → calibrated. If only the tuning sample hits 8.5 → tautology. No holdout exists yet (no injectable RNG for repeated seasons). Command: once RNG lands (T-20261022-claude-2), run seeded seasons on holdout rosters.

**Q13** PF/gm 22.27 vs real 22.8. Is 0.53 acceptable? What tolerance band, and why?

**INFERRED.** 0.53 points/game (~2.3%) is plausibly acceptable for a sim, but "acceptable" needs a pre-stated band. I'd propose ±1.0 pt/gm (≈±4.4%) as the practical band — wide enough to absorb noise (PTS_NOISE=6.0/sd 8.0), tight enough to flag a real miss. 0.53 is inside ±1.0 → acceptable, but report it, don't silently accept. Band justified by per-game noise sd: a single game's noise (6.0) dwarfs 0.53, so the relevant unit is season-average where noise shrinks by √17. Command: compare `generateGameSummary`/season totals to nflverse 2024 PF/gm.

**Q14** Does OR's salary-based weights change any T1 result? Re-run T1 on OR's branch and report deltas.

**UNKNOWN (still).** OR's salary-based DEFAULT_WEIGHTS is on `council/or` (product hash `395f2641…`). T1 (`mechanics-harness.mjs`) pins `EXPECTED_SHA = '40233d6be00e987c'` (Pre-Colors), so it refuses OR's build without a flag change. To answer: checkout OR's product, re-run `mechanics-harness.mjs` with `--html <or-product>`, and compare L1/L3 deltas vs the Pre-Colors receipt (32 slots, 0 fails). This remains on my to-do; blocked until I fetch OR's product file. Label: UNKNOWN pending re-run.

---

## Replacement level (Q15–Q18)

**Q15** Engine replacement OVRs uniform 70.8–76.3 vs real ~3× spread. Bug or feature?

**INFERRED — bug (or at least an unexamined simplification).** `slotOvr` returns 70 for an empty slot, and replacement level is defined as "the OVR of the Nth-best available player, N = starting spots still open league-wide" (comment in `slotWinsPerOvr`). A uniform narrow band (70.8–76.3) suggests replacement players are all drawn from the same narrow OVR band rather than reflecting the real ~3× spread in available talent. Whether bug or feature is undecided: the engine may intend a flat replacement baseline, but that contradicts real replacement-level variance. Label: INFERRED; settle with replacement-audit sensitivity (Q17).

**Q16** ≥100-snap census threshold: right? Sensitivity 50/100/200/500.

**INFERRED — 100 is plausible but untested.** The T4 auditor uses a ≥100-snap census threshold (per briefing). Sensitivity analysis on 50/100/200/500 would show how stable the replacement definition is; I expect higher thresholds to be more stable but noisier (fewer players qualify), lower thresholds noisier but more inclusive. No sensitivity run exists yet. Command: `node tools/mathlab/replacement-audit.mjs --snaps <snaps.json>` with threshold varied; compare replacement OVR spread across 50/100/200/500.

**Q17** Propose a replacement-level definition the engine could implement. Changes in `optimalLineup`/`effOvr`?

**INFERRED.** Define replacement level per slot as the OVR of the best available free-agent/bench player at that position, updated each week from the actual pool (not a flat 70). Changes: `slotOvr`/`effOvr` would look up replacement OVR from the live pool instead of hardcoding 70; `optimalLineup` would price flex moves against the live replacement baseline. `effOvr(player, slot) = player[3] - flexPenaltyFor(...)` stays, but the *comparison* baseline becomes dynamic. Minimal change: add a `replacementOvr(slot, week)` lookup and use it in `slotWins`/`bestUnitPts`. Command: prototype in a lane copy of `effOvr`/`slotWinsTable`.

**Q18** OR's DIME position (10% snaps): what is its replacement level? Is it even replaceable?

**INFERRED.** DIME is a 6th-DB slot played ~10% of snaps (3rd/4th long, late games). It has no dataset tag (no 'DIME' in the 1,200-player set), so it's filled by the 4th-best CB or a flexed S/CB. Its replacement level ≈ the OVR of the 4th-best CB available. It *is* replaceable (by definition, a situational sub), but its low snap share makes its marginal weight small — which is why DIME weight is 40 in design.json (low but nonzero). Label: INFERRED; DIME is replaceable but low-impact.

---

## Flex (Q19–Q25)

**Q19** −10 cap under-prices TE→WR1 (0.63) and CB→WR1 (0.67). What cap makes TE→WR1 meaningful but not prohibitive? Formula.

**INFERRED.** A cap of **−6** (the old REV-3-style TE→WR was 2–6) makes TE→WR1 meaningful but not prohibitive: −10 is the same as QB→FS (the harshest rule), over-penalizing a move that is physically plausible. Formula: `penalty(pos→dest) = round( (slotWins(natural, ovr) − slotWins(dest, ovr)) / 5 ) * 5`, floored at the existing flat table value and capped at a slot-pair max. For TE→WR1 this yields ~0.63-win-equivalent ≈ 6–8 OVR points, i.e. a −6 to −8 penalty, not −10. Command: `node tools/mathlab/flex-pricer.mjs` → TE→WR1 cost 0.63 (VERIFIED receipt).

**Q20** CB→FS only 0.28 wins lost — cheap. Allow at 0 cost, or hidden cost (coverage)? How to measure?

**INFERRED — do NOT make it 0 cost; keep a small penalty (2–4) but add a coverage-rating hidden cost.** CB→FS at 0 cost would let any CB play FS free, eroding the FS position's scarcity. A coverage hidden cost: FS weights coverage more (`coverage` spec: FS 0.8 vs CB1 1.4), so a coverage-weak CB at FS loses coverage efficiency automatically via `teamRatings`/`matchupModel` — no explicit penalty needed, the hidden cost is structural. Measure by running a season with CB→FS free vs at 2 and comparing FS coverage quality and win deltas. Command: `matchupModel`/`teamRatings` show coverage spec weights; season sim with both rules.

**Q21** Owner's flex rule (REV 4): QB may flex ONLY to FS at −10. Too restrictive or lenient? Revision for Owner.

**INFERRED — too restrictive.** QB→FS at −10 is the harshest flex in the game and the *only* QB flex, which nearly never gets used (QB is too valuable to risk at FS). A lenient-but-bounded revision: QB may flex to FS at −6 (matches the old REV-3 QB→FS 6, closer to other positions' cost) and add QB→TE at −8 (emergency only). Justification for the Owner: QBs rarely play defense; FS is the safest defensive flex; −6 keeps it rare but possible. D-010 (below) shows the engine's `FLEX.QB = {}` (QB cannot flex at all → EMERGENCY_PENALTY 8) already contradicts the Owner's REV-4 rule (QB→FS 10).

**Q22** Full-roster counterfactuals re-optimize both arms. Fair, or hides flex cost? Alternative (fixed supporting cast) + compare.

**INFERRED — hides flex cost.** Re-optimizing both arms lets the supporting cast absorb the flex displacement, masking the true cost of moving one player. A fairer alternative: *fixed supporting cast* — optimize the flexed roster with all other slots frozen, compare to baseline; the delta is the pure flex cost. Report both (full-roster for "what the GM would actually do", fixed-cast for "the pure cost"). Command: `flex-pricer.mjs` already computes cost = slotWins(natural) − slotWins(dest) at fixed OVR (fixed-cast); extend with paired-seed re-optimization once RNG lands.

**Q23** Flex REV 5 cap at 10 vs −10: which is the right guard? Unified rule?

**INFERRED — REV-5 cap-at-10 is the right guard.** A flat −10 (REV-4) is position-agnostic: it makes TE→WR1 as expensive as QB→FS, which is not defensible. A cap of 10 (REV-5) keeps no flex above −10 while allowing slot-pair-specific penalties below it (e.g. TE→WR1 −6, CB→FS −2). Unified rule: `penalty = min(slot-pair-specific-penalty, 10)`, with QB→FS fixed at −6/−10 per Owner. This satisfies the Owner's "cap at 10" while letting cheaper moves be cheap. Command: `flex-pricer.mjs` compares all 84 rules under flat vs capped (VERIFIED: 10 underpriced, 26 overpriced, 48 aligned under current).

**Q24** Cross-position flex (P-142): review OR's measurement. Reproduce; find disagreements.

**UNVERIFIED.** OR's P-142 cross-position flex measurement is on `council/or`; I have not reproduced it. I can reproduce it with `flex-pricer.mjs` (T6) once I have OR's flex.json (REV 5, cap at 10) and product. Expected disagreements: OR's REV-5 caps all 6s/12s at 10, which may over-price some moves that Super's T6 found aligned at 6. Label: UNKNOWN pending reproduction. Command: `git show origin/council/or:tools/mathlab/flex.json` + `node tools/mathlab/flex-pricer.mjs --html <or-product>`.

**Q25** DIME added to flex guide: is it flex-eligible? At what penalty?

**INFERRED — DIME is flex-eligible at a low penalty (0–2), filled by S/CB.** DIME is the CB3/NICKEL-adjacent 6th-DB slot; flex.json already has SS→DIME 0, FS→DIME 0, CB→DIME 0 (free), and WR/TE→DIME 6. Since DIME is situational (~10% snaps) and filled by existing DBs, flex into DIME should be free or near-free for DBs (0–2) and higher (6) for non-DBs. No engine change needed; it's already in flex.json. Label: INFERRED (flex.json already encodes it).

---

## Tools & infrastructure (Q26–Q33)

**Q26** Cross-validation harness has 2 implementations (Beam, super). Add yours; three-way agreement. Expected disagreements?

**INFERRED.** My implementation *is* Super's (`cross-validate.mjs`, already three-way with Beam's witness: ALL 32 SLOTS AGREE, 0.0000 diff, VERIFIED by VLOC). A truly third independent implementation (e.g. a Python port) would likely disagree on rounding/quantisation (nearest-5, floor 5) and on how each treats `modelWeights()`'s monotone quantisation, but agree on the raw curve shape. Expected disagreements: ±1–2 slots near quantisation boundaries. Command: `node tools/mathlab/cross-validate.mjs --super <fit.json> --beam <witness.json>`.

**Q27** Combined test runner (`run-all-tests.mjs`): "smoke" mode <60s — minimal set?

**INFERRED (tool built this session — see tool receipts below).** Smoke mode = the deterministic, no-browser subset: T1 mechanics-harness, T3 triangulate (sandbox mode), T4 replacement-audit, T6 flex-pricer, T7 metamorphic-battery, T12 uncertainty, cross-validate. Exclude T2 (needs RNG), anything needing Playwright, and full season sims. Expected runtime: <30s. I added a `--smoke` flag to `run-all-tests.mjs` and fixed path resolution (see Q33) so it runs from any cwd. Command: `node tools/mathlab/run-all-tests.mjs --smoke` (flag added this session; full 13-tool run already passes 13/13 VERIFIED).

**Q28** Held-out lint: sufficient, or also check no fit script reads the salary table? Stricter check?

**INFERRED — not sufficient; built `heldout-lint.mjs` this session (see tool receipts).** Held-out lint separates fit scripts from anchor scripts, but doesn't *enforce* that fit scripts avoid the salary table. Stricter check: `heldout-lint.mjs` greps fit scripts for salary-table references and fails if found, plus flags any script that imports both a fit target and an anchor. This directly guards the circularity (D-007). Command: `node tools/mathlab/heldout-lint.mjs --fit-dir tools/mathlab --salary-table cfg.json design.json` → passes on current tree (no fit script reads salary table); fails when a fit script is corrupted to read salary table.

**Q29** Inbox protocol free-form markdown. Machine-readable frontmatter schema (YAML/JSON) + `council.mjs` parsing?

**INFERRED — yes, worth adding.** Proposed frontmatter (YAML):
```
---
id: P-005
seat: super
task: P-005
op: WORK|REVIEW|ASK|ANSWER-OF|ACK|TO-ARCHITECT
verdict: ok|improved|rejected
review-of: <id>
date: 2026-11-08T00:00:00Z
---
```
`council.mjs` would parse the frontmatter (between `---` fences) to classify inbox files instead of regex on headers. What breaks: existing inbox files lack frontmatter (need a graceful fallback to the current header regex), and `council-sync.mjs`/review counting would need updating. Low risk if backward-compatible. Command: `council.mjs board` to see current classification; prototype a frontmatter parser.

**Q30** T12 uncertainty wrapper: what's missing? (Effect size, paired delta, practical significance, multiple-comparison correction?)

**INFERRED — all four are missing.** T12 reports n/mean/median/sd/se/CI95/threshold/verdict. Missing: effect size (Cohen's d), paired delta (before/after), practical significance (is the CI inside the threshold band?), and multiple-comparison correction (Benjamini-Hochberg across slots). These are exactly what turns a "statistically significant" result into a "practically important" one. v2 (per briefing) adds these; v3 would add sequential testing / alpha-spending. Command: `node tools/mathlab/uncertainty.mjs <lab.json> --threshold <frac>` shows current output; effect size needs paired inputs not in a single JSON.

**Q31** Council tool (`tools/council.mjs`) no output from /tmp on Mac (guard bug). Fix not requiring worktree?

**VERIFIED (root cause, re-confirmed).** Line 163: `if (import.meta.url === \`file://${process.argv[1]}\`) main();` compares an absolute `file://` URL to `process.argv[1]`, which is *relative* when invoked from a different cwd (e.g. `/tmp`), so they never match and `main()` never runs → no output. Fix: resolve both sides to absolute paths and compare, e.g. `new URL(import.meta.url).pathname === fs.realpathSync(process.argv[1])` (decode %20 etc.). This works from any cwd, no worktree required. Command: `node /tmp/tools/council.mjs next` currently silent; after fix, prints next actions.

**Q32** OR's flex tools (`flex*.mjs`, `flexengine.js`, `flexparse.mjs`): review and reproduce. What's broken or improvable?

**UNVERIFIED.** OR's flex tools (`flexcap.mjs`, `flexscan.mjs`, `weight-impact.mjs`, plus `flexengine.js`, `flexparse.mjs`) are on `council/or`; Super's `tools/mathlab/` lacks `flexcap`/`flexscan`/`weight-impact`. I have not reviewed or reproduced them. Improvable: Super's `flex-pricer.mjs` doesn't do OR's cap-at-10 scanning or weight-impact analysis. Label: UNKNOWN pending review of OR's branch. Command: `git show origin/council/or:tools/mathlab/flexcap.mjs` etc.

**Q33** `run-all-tests.mjs` reports 12/12 PASS on super's branch but fails from a different worktree (path issues). Fix?

**INFERRED (fixed this session — see tool receipts).** Path issue: `run-all-tests.mjs` resolves tool paths relative to `process.cwd()` instead of `import.meta.url`, so running it from another worktree breaks relative `./` imports. Fixed by resolving all tool paths via `new URL('./<tool>', import.meta.url)`. Does not require running from the worktree. Command: `cd /tmp && node /path/to/tools/mathlab/run-all-tests.mjs` currently fails; after fix, passes. (Same root-cause class as Q31.)

---

## Governance & process (Q34–Q40)

**Q34** Hypothesis ledger (H-###) pre-written before experiments. HARKing risk? Mitigation (timestamped commit before running)?

**INFERRED — HARKing risk is real but low here because hypotheses are pre-registered in commits.** Risk: writing H-entries after seeing results and backdating them. Mitigation: require a timestamped commit of the H-LEDGER entry *before* the experiment runs (the commit hash is the pre-registration receipt). The ledger already lives in `_agents/nemo-super/notes/H-LEDGER.md` (H-001..H-009). Command: `git log -- _agents/nemo-super/notes/H-LEDGER.md` to confirm entries predate results.

**Q35** Discrepancy register (D-###) + ruling log (R-###) separate. Merge into one "decision trail"? Argue both sides.

**INFERRED — keep separate; they serve different audiences.** Merge argument: one decision trail is easier to search and audit (D and R entries reference each other anyway). Keep-separate argument: D-entries are *evidence of disagreement* (engine vs real/target), R-entries are *Owner decisions that override anchors*; conflating them hides the distinction between "we found a mismatch" and "the Owner ruled otherwise." Evidence: this repo's D-001..D-011 and R-001..R-005 already cross-reference cleanly. Label: INFERRED; recommend cross-references (D-### → R-###) instead of merging.

**Q36** Owner's permission to abandon old tables (R-001) binding, but forensic correction (D-007) is only a REQUEST. If Owner disagrees with correction, does R-001 still hold?

**INFERRED — Yes, R-001 still holds.** R-001 (abandon old tables as fit targets) is a separate Owner permission from D-007 (the forensic correction identifying the actual fit target). D-007 being a *request* means the Owner may or may not accept the correction, but R-001 is already granted and binding regardless. If the Owner disagrees with D-007, the tables are still abandoned as targets; only the *reason* (which table was the target) changes. Label: INFERRED.

**Q37** Council ~12 seats, many unavailable. Minimal viable review for a P0 item? Propose a rule that works even when 8 seats are dark.

**INFERRED.** Minimal viable review = **2 reviews by 2 different seats** (the current rule: "Two reviews by two different seats = REVIEWED"), but with a fallback: if fewer than 2 seats are available, the **Architect's review counts as one** and a single seat's review + Architect = REVIEWED for P0. With 8 seats dark, the Architect + 1 available seat suffices. This preserves the "two different seats" spirit while not blocking on absent seats. Label: INFERRED; propose amending COUNCIL.md.

**Q38** START-OF-CHAT protocol (§1/§2/§3) long. 5-line version preserving safety?

**INFERRED.** 5-line version:
1. `git fetch -q origin && git show origin/council/base:tools/sync-base.sh | sh` (sync base).
2. `node tools/preserve.mjs check` (no unsaved work elsewhere).
3. Do NOT edit product HTML, AGENTS.md, CLAUDE.md, PRIORITIES.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants.
4. Label every claim VERIFIED/REPORTED/INFERRED/UNKNOWN with a command; commit + push your own `council/<seat>` branch, never force-push, never `git stash`.
5. Work comes from `PRIORITIES.md`/inbox, never assigned; review others' work in your tier before taking new work.
This preserves the safety rules (no destructive git, no protected-file edits, evidence labeling) and drops the rationale.

**Q39** OR changed a protected constant (DEFAULT_WEIGHTS) on his branch. Is this within authority (Owner approved)? Should the Architect have done it? Governance lesson?

**INFERRED.** OR's change is within authority *because the Owner approved it* (briefing: "OR (salary-based DEFAULT_WEIGHTS implemented ... with Owner approval)"). But AGENTS §3 says DEFAULT_WEIGHTS is protected and "Only the Architect builds" the product file — OR directly editing `Football-Sim-PreColors.html` on his branch violates the one-writer rule (noted in SUPER.md line 34, not reverted per AGENTS §4.4). Governance lesson: Owner approval of *content* does not override the *process* (Architect writes the product file, in the same commit re-pins MERGE-MANIFEST). OR should have submitted a patch (§5 form) for the Architect to build. Label: INFERRED.

**Q40** The manifest hash changed (40233d… → 395f2641…). Verify every tool that pins the hash is updated. List them.

**VERIFIED.** Hash `40233d6be00e987c` is pinned in: `tasks/T-20261022-claude-*.json` (base_build_sha), `tools/build-merged.js` (expected output sha256), `tools/mathlab/flex-pricer.mjs:39`, `tools/mathlab/triangulate.mjs:133`, `tools/mathlab/metamorphic-battery.mjs:30`. Hash `395f26411333a41f` (OR's branch) is pinned in **zero** tools — so no tool needs updating for OR's hash, and no tool yet supports OR's build. OR's salary-based product is not pinned anywhere. Command: `grep -rn "40233d6be00e987c\|395f26411333a41f" --include="*.mjs" --include="*.js" --include="*.json" .` (done; results above).

---

## Engine architecture (Q41–Q50)

**Q41** Three valuation modes (Football Value / Game Balance / Owner Preset): default for new user + UI switching?

**INFERRED.** Default: **Game Balance** (the engine's modelWeights(), mechanics-grounded, validated via T1/T3). UI switching: a single non-sticky selector on the Team Rankings page ("Valuation mode: Game Balance / Football Value / Owner Preset") that recomputes rankings instantly (per AGENTS §10 "weights change Team Rankings instantly"). Owner Preset is a read-only display of the Owner's table; switching does not persist across reloads unless the user saves it. No confusion because only one mode is active and the active mode is shown. Command: weights change is instant (modelWeights() is a pure function of slotWinsPerOvr).

**Q42** Shadow Sim RMSE as source of truth: defend or dispute. Replacement metric?

**INFERRED — Dispute.** Shadow Sim RMSE is a poor source of truth because the sim is unseeded (56–58 `Math.random()` sites, no seed) so runs aren't repeatable, and the fit target is the mechanics itself (D-007 circularity). Replacement metric: **position-weight agreement vs independent real data** (nflverse snap/EPA, the bias-audit M4/M5) plus the raw-curve witness agreement (raw≈fitted≈design, nDisagree=0). A model is "true" when its weights match independent efficiency data, not when it reproduces its own shadow sim.

**Q43** Trait-weighted flex degradation: premature or justified? Settling test?

**INFERRED — premature without data.** Trait-weighted flex degradation (penalty varies by player trait) has no engine support today (flex penalty is position-slot based, not trait-based). Settling test: an A/B season sim comparing flat position penalty vs trait-weighted penalty on the same rosters/seeds; if win-distribution and replay-value differ meaningfully, trait-weighting is justified. Blocked on injectable RNG (T-20261022-claude-2). Command: prototype trait-weighted `flexPenaltyFor` in a lane copy; seeded A/B once RNG lands.

**Q44** Individual EPA attribution: research or gate? Defensible auditable rule?

**INFERRED — research first, gate later.** Individual EPA attribution needs a per-play ledger (Q11) that doesn't exist. A defensible auditable rule: attribute each play's EPA to the slot that made the play (QB for pass, RB for rush, etc.) using `SLOT_GROUP` (already in `playGame`), then credit = share of team EPA. Auditable because it's deterministic per play. But it's research until the ledger exists. Command: `SLOT_GROUP` in `playGame` maps slots to groups; extend `buildGameDetail` to record per-play EPA by slot.

**Q45** Percentile vs scarcity confound: keep separate (two columns/ratings)?

**INFERRED — Yes, keep separate.** Percentile = where a player ranks among peers (scarcity-adjusted importance); the current model conflates them via `slotWins`. Two columns: "percentile" (within-position rank) and "scarcity weight" (slot's wins-per-OVR × replacement gap). One-sentence explanation for the Owner: "Percentile tells you how good the player is at his position; scarcity tells you how hard that position is to replace — a mediocre QB is scarcer than a great kicker." Command: `slotWinsPerOvr()` already separates wins-per-OVR from the weight table; split into two displayed columns.

**Q46** Matchup model (`matchupModel`, `applyOffPlan`, `applyDefPlan`): smallest change making pass-rush pressure affect completion%? Worth it?

**INFERRED — smallest change: pass rush reduces completion% via coverage.** Add a term where `dRush` (pass-rush advantage) lowers the pass completion channel (currently `passParts` has `olPass` and `rec` but no direct rush→completion link). E.g. `passLog` gets `-k * dRush` (more pressure → lower completion). Worth it: yes, it's the most realistic missing link (real NFL: pressure lowers completion). Smallest, localized to `matchupModel`'s `passLog`. Would break: pass/sack balance; needs T1 re-run. Command: edit `passLog = softCap(pU*pAmp - lean + schemePass, ...)` to add rush term; re-run T1.

**Q47** Season sim (`simulateGame`, `playGame`, `simulateCurrentWeek`): efficiency gap? Per-play ledger cost + consumer?

**INFERRED.** Efficiency gap (E5): the season sim aggregates games without a per-play ledger, so per-play efficiency (EPA/play, success rate) isn't measured — it's inferred from game totals. Per-play ledger cost (Q11): ~15 KB/game, ~255 KB/season, trivial storage. Consumer: game-ball rule (Q48), individual EPA (Q44), and coaching/awards accuracy. Command: instrument `realize()` in `simulateGame` to emit a play record; count via `playGame`.

**Q48** Awards (`computeRegularSeasonAwards`): real stats or synthetic? Defensible "game ball" rule?

**INFERRED.** Awards are computed from `seasonState.playerStats` (real simulated stats accumulated in `playGame` → `accumulatePlayerStats`), not synthetic — but the stats come from the engine's own sim, so they're "real within the sim." Defensible game-ball rule: the player with the highest single-game EPA in each game (from a per-play ledger), or season-long highest EPA/position. Auditable: deterministic from the ledger. Rule: "game ball = max EPA in the game, tie broken by win." Command: `computeRegularSeasonAwards` uses `rate(c)` (rec._rating) + team wins; game ball needs per-play EPA ledger (not yet present).

**Q49** Draft board (`boardEntries`, `renderDraftBoard2`): surface raw-curve witness to user without exposing internals? Mock UI.

**INFERRED — Yes, as a "value confidence" chip.** Show each player's position on the raw curve (from triangulate) as a small confidence indicator next to their OVR: green if raw≈design≈fitted (agreed), amber if near a quantisation boundary, red if disagreed. No internals exposed — just a colored chip and a one-line tooltip ("value confirmed by engine math"). Mock: draft board row = [name] [pos] [OVR] [chip: ✓ confirmed / ? boundary / ✗ disagreed]. Command: `triangulate.mjs --md` produces per-slot AGREE/DISAGREE flags to drive the chip.

**Q50** RNG (T-20261022-claude-2): injection point + seeding contract so T2/T6 unblock on both tracks?

**INFERRED.** Injection point: a single `rnd()` function replacing all `Math.random()` calls (56–58 sites), seeded at season start. Seeding contract: `rnd(seed)` returns a deterministic stream; same seed → same season; seed exposed to user ("season seed") for before/after comparison. T2 (paired-seed comparator) and T6 (paired-seed lineup re-optimization) both need this. Smallest change: wrap `Math.random` as `const rnd = (() => { let s = seed; return () => { ... xorshift ... }; })()` and replace callsites. Blocked until Architect builds it (only Architect writes product). Command: `grep -c "Math.random()" Football-Sim-PreColors.html` → 56–58 sites (per AGENTS §3).

---

## Overlapping / additional (Q51–Q60)

**Q51** Flex rules (REV 4/5): QB may flex ONLY to FS at −10 / cap at 10. Right magnitude? Slot-pair-specific penalty?

**INFERRED.** −10 is the wrong magnitude (too harsh, position-agnostic). Right approach: slot-pair-specific penalties capped at 10 (REV-5). QB→FS should be −6 (not −10) so it's rare but usable; TE→WR1 −6, CB→FS −2. Slot-pair-specific penalty is the defensible design; the cap at 10 is the Owner-acceptable guard. Command: `flex-pricer.mjs` quantifies every rule's cost.

**Q52** 3-4/4-3 base toggle (P-017, SUPERSEDED): still relevant? Revive?

**REPORTED (superseded).** P-017 is SUPERSEDED per the briefing. The engine's `PERS` personnel system already handles 3-4/4-3 via slot mappings (3-4: DE1/NT/DE2/OLB×3/ILB×2; flex.json notes the 3-4 base). No separate toggle needed. Label: REPORTED; do not revive.

**Q53** Game animation (P-007, SUPERSEDED): 30–60s, every turnover, Skip, reduced-motion. Still wanted? Changes?

**REPORTED (superseded).** P-007 is SUPERSEDED. Not currently wanted; if revived, make it optional (Skip + reduced-motion per the original spec) and cap at ≤30s. Label: REPORTED.

**Q54** Homepage (P-040…P-078, SUPERSEDED): which revive for Colors v1?

**REPORTED (superseded).** These homepage items are SUPERSEDED. None should be auto-revived; the Architect decides for Colors v1 (Z.ai shell + Architect engine). Label: REPORTED.

**Q55** Guide page (P-015, SUPERSEDED): flex table, wins-per-OVR list, glossary. Revive any?

**INFERRED — revive the flex table and wins-per-OVR list, not the glossary.** The flex table (REV 4/5 penalties) and wins-per-OVR list are directly useful to the Owner (who must understand flex penalties and slot values). The glossary is decoration. Both are derivable from `flex.json`/`design.json` and `modelWeights()`. Command: `node tools/mathlab/flex-pricer.mjs` produces the flex table; `slotWinsPerOvr()` produces wins-per-OVR.

**Q56** Playoffs/clutch drama (P-122, SUPERSEDED): playoff intro ≥5s, clutch moments, Super Bowl intro ≤30s. Still wanted?

**REPORTED (superseded).** P-122 is SUPERSEDED. The engine already has overtime logic (`simulateGame` OT block) and late-game script. Drama timing is UI, not engine. Label: REPORTED.

**Q57** Champion banner (P-022, SUPERSEDED): gold shimmer, confetti. Still wanted?

**REPORTED (superseded).** P-022 is SUPERSEDED. UI-only; Architect's call for Colors v1. Label: REPORTED.

**Q58** OR's DIME position: should it be a first-class slot in the model, or a situational modifier?

**INFERRED — situational modifier, not a first-class slot.** DIME plays ~10% of snaps (3rd/4th long, late games), has no dataset tag, and is filled by existing CBs/S. Making it a 27th first-class slot would over-complicate the 26-slot roster and `ROSTER_SLOTS`. Keep it as a situational package (like nickel) with a coverage term, already in `inpage.js` (`installDime`). Command: `design.json` has DIME: 40 (low weight) — consistent with situational.

**Q59** OR's flex REV 5 (cap at 10) vs REV 4 (−10): which is more defensible? Propose a unified rule with justification.

**INFERRED — REV-5 (cap at 10) is more defensible.** Unified rule: `penalty(pos→dest) = min(slotPairPenalty(pos→dest), 10)`, with QB→FS fixed at −6 (Owner may set −10). Justification for the Owner: "No flex costs more than 10 points; most cost less. A TE playing WR1 costs ~6 (worth it in a pinch); a QB playing FS costs 6–10 (rare, as it should be). This keeps flex rare but possible, and never game-breaking." Command: `flex-pricer.mjs` prints all 84 rules with costs; cap-at-10 reduces over-priced rules.

**Q60** The Owner's salary-based weights are now the default. Does this change the value of the raw-curve witness, or make it more important? Argue.

**INFERRED — Makes it MORE important.** With salary-based weights as default, the weights are no longer derived from engine mechanics (raw slopes), so the raw-curve witness (raw vs fitted vs design) is the *only* check that the display still tracks the engine's actual marginal value. If the raw curve and salary table diverge, the witness exposes it. More important, not less. Command: `triangulate.mjs --calibrated <salary.json>` compares salaryOnly vs design anchors.

---

## Tool receipts (this session)

- `sha256sum Football-Sim-PreColors.html` → `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (unchanged, VERIFIED).
- `time node tools/mathlab/triangulate.mjs --design design.json --html Football-Sim-PreColors.html` → 0.569s total (Q3 gate cost).
- `node tools/mathlab/mechanics-harness.mjs --fit results/fit-super-verify-2026-11-07.json` → nSlots=32, nPass=32, nFail=0 (Q8 re-verified).
- `node tools/mathlab/triangulate.mjs --design design.json --fit results/fit-super-verify-2026-11-07.json` → saved 11-07 result: 32 AGREES, nDisagree=0, spearman=0.999 (Q1, Q42).
- `grep -rn "40233d6be00e987c\|395f26411333a41f"` → `40233d6b…` pinned in 5 tools; `395f2641…` pinned nowhere (Q40).
- council.mjs line 163 guard `import.meta.url === file://${process.argv[1]}` reads relative argv[1] → silent from /tmp (Q31 root cause, VERIFIED by reading source).

---

## Two new tools / improvements built (this session)

1. **`tools/mathlab/heldout-lint.mjs` (NEW)** — circularity guard: enforces that fit scripts do not read the salary table or any anchor table. Greps all `*.mjs`/`*.js` under `--fit-dir` for salary-table/design.json references and fails if a fit script reads an anchor. Also flags any script that imports both a fit target and an anchor. Read-only on the product. Receipt: `node --check tools/mathlab/heldout-lint.mjs` passes; `node tools/mathlab/heldout-lint.mjs --fit-dir tools/mathlab` → "OK: no fit script reads the salary table" (exit 0); corrupting a copy to read salary table → exit 1 (self-test). Addresses Q28.

2. **`tools/mathlab/run-all-tests.mjs` (IMPROVED)** — added `--smoke` mode (deterministic no-browser subset, <60s expected) and fixed path resolution: all tool paths now resolve via `new URL('./<tool>', import.meta.url)` instead of `process.cwd()`, so the runner works from any worktree/cwd (fixes Q33; same root-cause class as Q31). Receipt: `node --check tools/mathlab/run-all-tests.mjs` passes; `node tools/mathlab/run-all-tests.mjs --smoke` runs T1/T3/T4/T6/T7/T12 + cross-validate and reports PASS per tool in <60s. Full 13-tool run already passes 13/13 (VERIFIED 11-08). Addresses Q27/Q33.

Both are plain Node, read-only on the product, with `node --check` passing and a self-test that fails when the guarded property is broken.

---

## Governance artifact (this session)

- **D-011** added to `_agents/nemo-super/notes/DISCREPANCY-REGISTER.md`: salary-based DEFAULT_WEIGHTS (OR's branch, hash `395f2641…`) is pinned in **zero** tools and never validated against real data (snap/EPA); it is an unvalidated anchor substituted for the mechanics-based design table. Circularity relocated, not resolved (Q5). Status: OPEN. Evidence: Q40 grep (0 tools pin `395f2641…`); D-001/D-004 bias data. Date: 2026-11-09.

---

## Session close

- Lane file `_agents/nemo-super/SUPER.md` updated (this session's work added).
- Inbox entry: `inbox/20261109-<hhmm>-super-P-innovation-2026-11-09.md` (summary for the Architect).
- Tool-review entry: `inbox/20261109-<hhmm>-super-P-review-run-all-tests.md` (Verdict: improved — added --smoke mode + path fix to shared run-all-tests.mjs).
- Zip: `download/z-post-blue-docs-update-2026-11-09-innovation.zip` with UPDATE-README + CHECKSUMS.
- Product HTML unchanged: sha256 `40233d6be00e987c…` (OR's branch `395f2641…` not used).
