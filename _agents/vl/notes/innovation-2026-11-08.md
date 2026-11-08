# Innovation notes — VL, 2026-11-08
// Seat: VL · Role: Council Advisor · Worktree: /Users/kosi/Desktop/wt/vl · Branch: council/vl
// Product (read-only): Football-Sim-PreColors.html sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B) — VERIFIED by sha256sum this session.
// Lab receipts this session (commands run in-tree, all VERIFIED):
//   node tools/mathlab/raw-curve-witness.mjs <Pre-Colors>  -> n=32, pageErrors=0, maxQuantError700=0, outOfContract=0, Spearman 0.992
//   node tools/mathlab/triangulation.mjs <witness.json>    -> n=32, nDisagree=0, Spearman 0.995
//   node tools/mathlab/uncertainty.mjs <witness.json> rows.spanWins --threshold 0.5  -> n=32, CI95 [0.552,0.908], verdict PASS
//   node tools/mathlab/replacement-level-audit.mjs         -> nSlots=9, verified=1, unknown=7, partial=1
//   node tools/mathlab/uncertainty.mjs --selftest          -> SELFTEST PASS
// Evidence labels: VERIFIED (ran in this tree, command+output cited) / REPORTED (another seat, read in-tree, not re-run) / INFERRED (reasoned from in-tree evidence) / UNKNOWN (not checked).
// No product file, AGENTS.md, CLAUDE.md, PRIORITIES.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md or protected constant was touched. DEFAULT_WEIGHTS (already changed by OR with Owner approval) left alone.

## 1 — Fit-target & circularity (Q1–Q7)

Q1. Given the forensic correction (fit target = design@27Oct×0.00254, not personal), does your dissent list change? Does "demoting Shadow Sim RMSE" become more or less justified?
- INFERRED. Yes, the dissent list changes: D-008's root cause must be corrected from "old personal table" to "design.json (27 Oct) × 0.00254" (design.json read in-tree: QB=1000 ... TE3=10, WR4=10). The personal table is no longer the fit target, so D-008's stated cause is stale. "Demoting Shadow Sim RMSE" becomes MORE justified: if the fit target is design.json (an engineered spec, not real production data), Shadow Sim RMSE measured against that target is not ground truth, so demoting it is more justified, not less.
- Evidence: design.json (in-tree), discrepancy-register-2026-11-07.md D-008, raw-curve-witness contract (outOfContract=0 on Pre-Colors) shows the display is exactly quantised mechanics, so RMSE-to-design measures conformance to an unvalidated spec, not truth.

Q2. The w79 display layer is ABSORBED at 0.000000%. Is there any build where the display layer is NOT absorbed? Confirm or refute with a build hash.
- VERIFIED for Pre-Colors; UNKNOWN whether any build is not absorbed. On Pre-Colors (40233d6be00e987c): maxQuantError700 = 0, outOfContract = 0 (n=32) → every calibrated slot equals its contract expectation → display fully absorbed. Refuted for Pre-Colors (it IS absorbed). To confirm/refute "any build not absorbed" requires running the witness on another build (e.g. OR's 395f2641 branch or a Z-post-blue wave): node tools/mathlab/raw-curve-witness.mjs <html>. Not yet run on any other local build.

Q3. Should the raw-curve witness run on every build the Architect ships, as a gate? Cost (time, bytes) per build?
- INFERRED. Yes — it is the only contract-verified mechanics gate (outOfContract==0, maxQuantError≤2.5, no rank inversions) and it is read-only (no product write). Cost per build: headless Chromium launch + one page.evaluate; measured run completed in this session (wall-clock a few seconds to ~30s depending on Chromium startup); output JSON ~few KB, markdown sidecar similar. Recommend: gate fails if outOfContract > 0 or any rank inversion appears. Not precisely timed — label INFERRED.

Q4. The Owner's permission to abandon the old tables is granted. Propose the exact commit sequence retiring them + MERGE-MANIFEST re-pin.
- INFERRED (proposal; Architect implements; VL does not touch product/protected constants). One commit by the Architect: (a) remove old personal table + salary table as calibration foundations from modelWeights/RATING_SPECS/MC/DEFAULT_WEIGHTS; (b) install new presets (QB=1000, other slots from engine math, 50 increments); (c) re-pin the resulting build hash in MERGE-MANIFEST.md in the SAME commit (AGENTS §3: protected-constant change + re-pin in one commit). Then a Verifier (seat ≠ Architect) re-runs raw-curve-witness + triangulation on the new build and attaches receipts. The Architect ships only after verification.

Q5. OR implemented salary-based DEFAULT_WEIGHTS. Does this resolve the circularity or relocate it? Argue with evidence.
- INFERRED. Relocates it. Evidence: (a) the mechanics (modelWeights/RATING_SPECS/MC) are still fit to design.json 27 Oct × 0.00254 per forensic correction D-007 — an unvalidated engineered spec; (b) DEFAULT_WEIGHTS now = salary table, which per P-013 is an "independent anchor only," never a fit target and never validated against real production (D-001/D-002/D-003 reported DL/LB/TE discrepancies vs salary). So circularity moves from "personal table → mechanics" to "salary table → display," while mechanics remains anchored to unvalidated design.json. Two inconsistent targets (mechanics vs display) remain.

Q6. The new-preset proposal (QB=1000, +50 increments from raw slopes) vs OR's salary table: which is more defensible as a default, and why? What would the Owner prefer?
- INFERRED. New-preset (QB=1000 + 50 increments from raw slopes) is more defensible as default: it is traceable to measured mechanics (raw span × 0.00254 → 1000 scale), and the raw-curve witness is contract-verified on Pre-Colors (outOfContract=0). The salary table is unvalidated (independent anchor only). Owner preference: UNKNOWN (cannot speak for the Owner), but the Owner approved abandoning BOTH tables as foundations and keeping them as display presets only, which points to engine-derived defaults being preferred. Label INFERRED.

Q7. If both mechanics (design@27Oct) and display (salary) are unvalidated, what is the FIRST validation experiment you would run, and what result would change your mind?
- INFERRED (experiment designed, not yet run). First experiment: mechanics-independence — run raw-curve-witness on Pre-Colors (40233d6) and on OR's salary branch (395f2641) and compare RAW curves. If IDENTICAL, raw curve is pure mechanics (display-independent); if different, display leaks into mechanics. Result that changes my mind: raw curves differ across builds with different display weights → mechanics contaminated by display → both targets invalidated; raw curves identical AND within contract of design.json×0.00254 → mechanics validated, only display remains open. Requires OR's branch file (not in this tree).

## 2 — Mechanics & validation (Q8–Q14)

Q8. T1 skill production is CLEAN. Good enough, or tolerance bands too loose? Show bands + actual deltas.
- VERIFIED (contract on Pre-Colors) / INFERRED (broader T1). Contract band: |error| ≤ 2.5 per slot, nearest 5, floor 5, no rank inversions. Actual on Pre-Colors: maxQuantError700 = 0, outOfContract = 0, n=32, Spearman 0.992 — actual error is 0, far inside the 2.5 band, so bands are NOT loose on this build. Broader T1 skill production (RB slope etc.) is REPORTED by Beam, not re-run by VL. Command: node tools/mathlab/raw-curve-witness.mjs Football-Sim-PreColors.html (this session, exit 0).

Q9. Sacks DB 0.0% vs real 7.3% (D-001): blitz-frequency, DB-rating, or engine gap (no blitz logic)? Smallest fix.
- INFERRED. Engine gap (no blitz logic) is the smallest-fix candidate: DB 0.0% sacks means the engine never generates QB pressure/sacks from DB blitzes, and the DB rating does not feed sack probability. Smallest fix: add a blitz-frequency parameter × DB/rush rating → sack probability inside simulateGame/playByPlay. Cannot isolate blitz-frequency vs DB-rating without a per-play ledger. Label INFERRED.

Q10. DB INT +5.9pp (D-002): coverage-rating or QB-decision? How to distinguish experimentally?
- INFERRED. Controlled two-factor experiment: (a) hold QB constant, vary DB coverage rating → INT rate changes ⇒ coverage-rating drives it; (b) hold DB constant, vary QB decision/aggression → INT rate changes ⇒ QB-decision drives it. Requires per-play ledger + seeded RNG to replay identical scenarios with one parameter toggled. Not run in this tree. Label INFERRED.

Q11. Efficiency rung NOT measurable (no per-play ledger). Minimal ledger: fields, frequency, byte cost per game/season.
- INFERRED (estimated, not measured). Minimal per-play ledger fields: gameId, week, playId, offTeam, defTeam, playType (pass/rush), qbOvr, topRusherOvr, coverageOvr, passRushOvr, pressure(0/1), completion(0/1), yards, epa, winProbPre, winProbPost. Frequency: every play (~150 plays/game, ~2,560 plays/season/team, ~81,920 plays/season league). Byte cost: ~60 bytes/play → ~9 KB/game, ~150 KB/season league-wide. Consumers: T1 efficiency rung, EPA attribution (Q44), sack/INT experiments (Q9/Q10), game-ball (Q48).

Q12. Team wins 8.5 [8.21–8.72] vs real ~8.5. Calibrated or tautology?
- INFERRED. Tautology risk: the mean win total is forced to ~8.5 by construction (win totals are zero-sum across the league, so the average must be 8.5). Calibration cannot be distinguished from tautology from the mean alone; need win-distribution VARIANCE and SHAPE vs real (real spreads ~6–10 wins; engine may be too tight). Requires per-play ledger + distribution test. Label INFERRED.

Q13. PF/gm 22.27 vs real 22.8. Is 0.53 acceptable? What tolerance band, and why?
- INFERRED (no band defined in tree). 0.53 pts/gm ≈ 2.3% error — acceptable as a first-order screen (within ~3%). Proposed band: ±0.8 pts/gm (~3.5%) = "close"; ±1.5 = "investigate." Justification: scoring is noisy (one field goal swings a game), so ±0.8 ≈ one field goal every ~2 games. No tolerance band currently defined in tree; this is a proposal.

Q14. Does OR's salary-based weights change any T1 result? Re-run T1 on OR's branch and report deltas.
- UNKNOWN (not run). OR's branch hash 395f26411333a41f (salary-based DEFAULT_WEIGHTS, same size 657,486 B) is referenced in the briefing but the file is not in this tree, so T1 cannot be re-run here. INFERRED expectation: changing DEFAULT_WEIGHTS (display) does not change slotWinsPerOvr (mechanics), so the raw-curve contract result (outOfContract=0) should be unchanged on OR's branch IF mechanics untouched — but that is untested. Label UNKNOWN.

## 3 — Replacement level (T4) (Q15–Q18)

Q15. Engine replacement OVRs uniform 70.8–76.3 vs real ~3× spread. Bug or feature?
- INFERRED. Feature-by-design: replacement-level-audit documents the engine's implicit baseline as flat 80 OVR at every slot (NO position-specific replacement). Uniform 70.8–76.3 is that flat baseline, not a bug per se — but it makes WAR incomparable across offense/defense/special teams (replacement QB ≠ replacement K). DL5 is the only slot with a measured baked-in replacement share (0.33). Label INFERRED.

Q16. ≥100-snap census threshold: right? Sensitivity 50/100/200/500.
- INFERRED. The 100-snap census threshold is not defined anywhere in this tree (the audit documents DL5 share at nflverse team-game level, not a 100-snap census). Sensitivity analysis 50/100/200/500 not run. Rightness: UNKNOWN. Label INFERRED (threshold absent from tree).

Q17. Propose a replacement-level definition the engine could implement. Changes in optimalLineup/effOvr?
- INFERRED (proposal, not implemented). Per-slot replacement OVR derived from real depth-chart snap data (e.g., replacement QB 60, WR 70, CB 72, K 50). effOvr(s, ovr) = slotWins(s, ovr) − slotWins(s, replacementOvr_s); optimalLineup ranks by replacement-adjusted value (WAR-like) instead of raw OVR, shifting roster construction toward scarce positions. Requires hash-pinned snap-depth data not in tree. Label INFERRED.

Q18. OR's DIME position (10% snaps): what is its replacement level? Is it even replaceable?
- INFERRED. DIME replacement level: UNKNOWN (installDime assumes w=0.15 ≈ 10% snaps, not measured against real depth data). Replaceable: yes, but situational — DIME is a 6th-DB slot used on 3rd/4th-and-long and late games, filled by the 4th-best CB or a flexed S/CB, so its "replacement" is the next CB/S on the depth chart, not flat 80. Label INFERRED.

## 4 — Flex (T6 + REV 5) (Q19–Q25)

Q19. −10 cap under-prices TE->WR1 (0.63) and CB->WR1 (0.67). What cap makes TE->WR1 meaningful but not prohibitive? Formula.
- INFERRED. Cap should track actual win cost, not a flat −10. winCost(from→to) = (weight[to] − weight[from]) × 0.00254 (1000-scale weights). From design.json (in-tree): TE1=270, WR1=470 → diff 200 → 0.508 wins (the briefed 0.63/0.67 come from a different table, not design.json — noted as a discrepancy to reconcile). Proposed cap: cap(from→to) = clamp(round(winCost / 0.1), floor=0, ceiling=10) penalty-units, i.e. ~10 penalty units per win, never above 10. TE->WR1: 0.508/0.1 ≈ 5 → meaningful (not free) but not prohibitive. Label INFERRED (formula proposed; not yet run against the live flex table — see flex-price-v2 tool).

Q20. CB->FS only 0.28 wins lost — cheap. Allow at 0 cost, or hidden cost (coverage)? How to measure?
- INFERRED. Cheap because OVR-only pricing ignores role mismatch: FS needs range/ball skills, CB needs man coverage. Hidden cost = coverage breakdown on deep passes not captured by OVR. Measure via controlled experiment: hold CB rating constant, vary FS rating (or vice versa), measure completion%/INT against deep passes; need per-play ledger. Not run in tree. Label INFERRED.

Q21. Owner's flex rule (REV 4): QB may flex ONLY to FS at −10. Too restrictive or lenient? Revision for Owner.
- INFERRED. Too restrictive: a QB flexing to FS is unrealistic (QB lacks DB skills), and −10 already makes it prohibitively expensive, so the whitelist blocks plausible flexes (e.g. QB->RB in short-yardage, which existed in REV 3 at −6) while permitting an unrealistic one. Revision: replace the whitelist with the unified slot-pair penalty (Q19/Q23) — allow QB->RB at a moderate penalty (e.g. −6, per REV 3 history) and keep QB->FS at −10. Label INFERRED.

Q22. Full-roster counterfactuals re-optimize both arms. Fair, or hides flex cost? Alternative (fixed supporting cast) + compare.
- INFERRED. Re-optimizing both arms HIDES flex cost: the supporting cast can be re-optimized around the flex, displacing the cost onto other players and masking the true flex penalty. Fairer: fixed supporting cast (only the flexed player moves), measure the win delta directly. Compare full-roster re-opt delta vs fixed-cast delta; the gap = hidden absorption. Blocked on RNG for paired-seed re-opt; fixed-cast is runnable now. Label INFERRED.

Q23. Flex REV 5 cap at 10 vs −10: which is the right guard? Unified rule?
- INFERRED. Neither alone is sufficient — both are magnitude caps without slot-pair awareness. Unified rule: penalty(from→to) = clamp(round(winCost × k), floor=0, cap=10), where winCost = (weight[to] − weight[from]) × 0.00254, k ≈ 10 penalty-units per win, cap=10 (keeps REV 5's hard ceiling). Makes penalty proportional to actual cost, capped at 10. Label INFERRED.

Q24. Cross-position flex (P-142): review OR's measurement. Reproduce; find disagreements.
- UNKNOWN (not reproduced). OR's P-142 cross-position flex measurement is referenced but OR's files/work are not in this tree in a verified form. Label UNKNOWN.

Q25. DIME added to flex guide: is it flex-eligible? At what penalty?
- INFERRED (read flex.json in-tree). DIME appears as a destination only (WR->DIME 4, TE->DIME 6, ILB->DIME 6, OLB->DIME 6, SS->DIME 0, FS->DIME 0, CB->DIME 0) but has no "from" row (DIME is not a key in the flex object). So DIME is flex-eligible as a destination (penalty 0 for S/CB sources, 4–6 for others) but not defined as a source — DIME players flex using their source-tag (CB) penalties. Label INFERRED.

## 5 — Tools & infrastructure (Q26–Q33)

Q26. Cross-validation harness has 2 implementations (Beam, super). Add yours; three-way agreement. Expected disagreements?
- INFERRED. VL's third implementation is this tree's raw-curve-witness + triangulation + uncertainty stack (pure engine measurement, no real-data anchors). Expected disagreements: structural agreement on method, but real-data anchors (Beam/super use nflverse volume/EPA/AV/salary) will disagree with pure engine mechanics where the engine mis-matches reality (e.g. D-004 RB slope: real 0.003 vs engine 0.247). Three-way agreement on the measurement FRAMEWORK, not on real-data fit. Label INFERRED.

Q27. Combined test runner (`run-all-tests.mjs`): "smoke" mode <60s — minimal set?
- INFERRED. The runner present in-tree is `tools/mathlab/run-all.sh` (no `run-all-tests.mjs` confirmed). Minimal smoke set (<60s, all in-memory): uncertainty selftest, replacement-level-audit, raw-curve-witness on Pre-Colors with contract gate (outOfContract==0). None require a product build. Label INFERRED (run-all.sh exists; run-all-tests.mjs not confirmed).

Q28. Held-out lint: sufficient, or also check no fit script reads the salary table? Stricter check?
- INFERRED. Held-out lint (grep for year literals 2024/2025) covers temporal held-out only; it does NOT check salary-table reads. Stricter check: add a salary-table guard — grep fit scripts for the salary table identifier/path and flag any read; also distinguish comments from data reads (currently manual). Label INFERRED.

Q29. Inbox protocol free-form markdown. Machine-readable frontmatter schema (YAML/JSON) + `council.mjs` parsing?
- INFERRED (proposal). Frontmatter: YAML between `---` lines: {id, seat, utc, for (P-ID), type: work|review|idea, labels[], status}. council.mjs `next`/`board` parses frontmatter to build the live queue. What breaks today: existing inbox files have no frontmatter → must be treated as legacy/untyped; and council.mjs has a guard bug (no output from /tmp, Q31) that must be fixed before queue parsing can work reliably. Label INFERRED.

Q30. T12 uncertainty wrapper: what's missing? (Effect size, paired delta, practical significance, multiple-comparison correction?)
- INFERRED. Missing: effect size (e.g. Cohen's d), paired delta (before/after), practical significance (minimum important difference / MID), and multiple-comparison correction (BH/FDR) when wrapping many fields. These map to the briefed T12 v2/v3. Not implemented in uncertainty.mjs (current: n/mean/median/sd/se/CI95/threshold/verdict). Label INFERRED.

Q31. Council tool (`tools/council.mjs`) no output from /tmp on Mac (guard bug). Fix not requiring worktree?
- INFERRED (root cause hypothesized, not fixed). Root cause: council.mjs resolves the repo/PRIORITIES.md relative to cwd; from /tmp the repo isn't found so PRIORITIES.md read fails silently → no output. Fix: locate the repo via `git rev-parse --show-toplevel` (or `--repo` flag / script's own `__dirname`), independent of cwd; then it works from any directory. Not yet implemented. Label INFERRED.

Q32. OR's flex tools (`flex*.mjs`, `flexengine.js`, `flexparse.mjs`): review and reproduce. What's broken or improvable?
- UNKNOWN (not reproduced). OR's flex tools live in OR's lane/worktree, not verified in this tree. tools/mathlab holds flexengine.js/flexparse.mjs/flexcheck.mjs/flexdl5.mjs (shared/VL), but OR's specific toolset has not been reviewed or reproduced here. Label UNKNOWN.

Q33. `run-all-tests.mjs` reports 12/12 PASS on super's branch but fails when run from a different worktree (path issues). Fix?
- INFERRED (hypothesis, not fixed). Path issue: hardcoded relative paths (e.g. `results/`, `../super/...`) break across worktrees. Fix: resolve all paths relative to `git rev-parse --show-toplevel` (or `__dirname`), never cwd; add a `--root` flag. Not yet implemented. Label INFERRED.

## 6 — Governance & process (Q34–Q40)

Q34. Hypothesis ledger (H-###) pre-written before experiments. HARKing risk? Mitigation (timestamped commit before running)?
- INFERRED. HARKing risk is real (hypothesis written after seeing the result, then backdated). Mitigation: timestamped commit of the hypothesis file BEFORE running; ledger records `writtenAt` + `commit sha`; a verifier confirms the commit predates the result. Low friction (one commit), no extra meetings. Not yet enforced in-tree. Label INFERRED.

Q35. Discrepancy register (D-###) + ruling log (R-###) separate. Merge into one "decision trail"? Argue both sides.
- INFERRED. Merge: single source of truth, easier end-to-end audit, no split-brain between findings and decisions. Separate: discrepancies are technical findings (engineer-owned, can accrue without the Owner); rulings are Owner decisions (authority-bound; burying them among findings risks conflating findings with decisions). Recommendation: keep separate but cross-reference (each D-entry that is resolved cites the R-entry that resolved it). Label INFERRED.

Q36. Owner's permission to abandon old tables (R-001) binding, but forensic correction (D-007) is only a REQUEST. If Owner disagrees with correction, does R-001 still hold?
- INFERRED. Yes — R-001 holds independently. R-001 is a permission to abandon the tables as foundations; D-007 merely identifies WHAT was fit (design.json × 0.00254). The Owner disagreeing with D-007 changes the root-cause narrative, not the permission. Abandoning the tables remains valid regardless. Label INFERRED.

Q37. Council ~12 seats, many unavailable. Minimal viable review for a P0 item? Propose a rule.
- INFERRED. Rule: P0 = 1 implementer + 2 verifiers from 2 different seats. If fewer than 3 seats are available: 1 implementer + 1 verifier (seat ≠ implementer) + Architect sign-off, with a 72 h availability timeout; after timeout, a single verifier suffices and the item is marked REVIEWED with a "low-seat" note. Works with 8 seats dark. Label INFERRED.

Q38. START-OF-CHAT protocol (§1/§2/§3) long. 5-line version preserving safety?
- INFERRED (proposal). (1) Be on council/<seat> in .../wt/<seat>; `git fetch origin`; sync base. (2) `node tools/preserve.mjs check`; commit WIP for dirty work; never `git stash`. (3) Read only task-named files; never touch product/AGENTS/protected constants. (4) Label every claim; done needs command + output; commit after each file. (5) End: update lane file, post bulletin entry, commit (+push if authorised). Label INFERRED.

Q39. OR changed a protected constant (DEFAULT_WEIGHTS) on his branch. Is this within authority (Owner approved)? Should the Architect have done it? Governance lesson?
- INFERRED. Within authority: the Owner approved OR's salary-based DEFAULT_WEIGHTS (briefing §1). OR's branch is OR's lane — seats may edit their own lane and, with Owner approval, a protected constant. The Architect need not do it; OR did it with approval. Lesson: protected-constant changes require explicit Owner approval AND a MERGE-MANIFEST re-pin in the same commit, and remain lane-scoped until the Architect integrates. Label INFERRED.

Q40. The manifest hash changed (40233d… → 395f2641…). Verify every tool that pins the hash is updated. List them.
- VERIFIED (ran grep this session). Hash-pinning locations: `tools/build-merged.js:3` pins `40233d6be00e987c...` (657,486 B, Pre-Colors/merged candidate); `MERGE-MANIFEST.md:4` pins `40233d6be00e987c...` for Pre-Colors; `tasks/T-*.json` pin `base_build_sha: 40233d6be00e987c` (Architect task registry). OR's hash 395f26411333a41f is NOT pinned anywhere (OR's branch is not a merge candidate in the manifest). No other tool hardcodes the hash — raw-curve-witness/triangulation compute buildSha from the HTML they read (self-updating). Conclusion: if OR's branch becomes a merge candidate, build-merged.js + MERGE-MANIFEST + tasks need the 395f2641 pin; otherwise no update required.

## 7 — Engine architecture (Q41–Q59)

Q41. Three valuation modes (Football Value / Game Balance / Owner Preset): default for new user + UI switching?
- INFERRED (mode concept is proposed architecture, not in-tree). Default: Game Balance (engine-neutral, fairest for a sim). UI switching: a single non-modal "Valuation mode" dropdown on the settings bar with a one-line tooltip per mode, defaulting to Game Balance; switching recalculates Team Rankings instantly (the "weights change Team Rankings instantly" gate is a build-truth requirement). Label INFERRED.

Q42. Shadow Sim RMSE as source of truth: defend or dispute. Replacement metric?
- INFERRED. Dispute (aligns with Z.ai's dissent): Shadow Sim RMSE is fit to design.json × 0.00254 per forensic correction D-007, an unvalidated engineered spec — not ground truth. Replacement: the raw-curve witness contract gate (outOfContract==0, maxQuantError≤2.5) + triangulation disagreement flags + held-out real-data validation (2024/2025). Label INFERRED.

Q43. Trait-weighted flex degradation: premature or justified? Settling test?
- INFERRED. Premature: flex.json uses position-pair penalties only; no trait data exists in tree. Settling test: propose trait-weighted flex, then settle via flex-price-v2 comparing trait-weighted vs flat penalties on held-out outcomes. Label INFERRED.

Q44. Individual EPA attribution: research or gate? Defensible auditable rule?
- INFERRED. Research first (no per-play ledger, no EPA in tree). Defensible auditable rule: attribute EPA to the player on the play (passer for pass EPA, rusher for rush EPA; defensive coverage credit split for defense), summed per season, divided by plays — auditable because every credit ties to one play + one player. Gate only after the ledger exists. Label INFERRED.

Q45. Percentile vs scarcity confound: keep separate (two columns/ratings)?
- INFERRED. Yes — keep separate: percentile = where a player stands within his position (scarcity-independent); scarcity weight = how valuable that position is (importance). Two columns prevents a mediocre high-scarcity player (e.g. QB) from outranking a great low-scarcity player (e.g. WR) on raw OVR alone. One-sentence explanation for the Owner: "Percentile tells you how good you are at your job; scarcity tells us how hard your job is to fill." Label INFERRED.

Q46. Matchup model (`matchupModel`, `applyOffPlan`, `applyDefPlan`): smallest change making pass-rush pressure affect completion%? Worth it?
- INFERRED (not implemented). Smallest change: in pass resolution inside playByPlay, multiply completion probability by (1 − pressure × passRushFactor), where pressure comes from matchupModel's pass-rush vs O-line read and passRushFactor is small (e.g. 0.15). Worth it: yes — pressure is the primary real driver of completion%; without it the pass game is undifferentiated. Risk: over-suppression if passRushFactor too high; tune against held-out. Label INFERRED.

Q47. Season sim (`simulateGame`, `playGame`, `simulateCurrentWeek`): efficiency gap? Per-play ledger cost + consumer?
- INFERRED. Efficiency gap E5: the season sim aggregates to game-level results with no per-play ledger, so EPA/attribution/matchup-pressure cannot be validated (D-006 defense not testable). Per-play ledger cost ~9 KB/game, ~150 KB/season league (Q11). Consumers: T1 efficiency rung, EPA attribution (Q44), sack/INT experiments (Q9/Q10), game-ball (Q48). Label INFERRED.

Q48. Awards (`computeRegularSeasonAwards`): real stats or synthetic? Defensible "game ball" rule?
- UNKNOWN / INFERRED. `computeRegularSeasonAwards` not read in this tree, so real-vs-synthetic is UNKNOWN. Defensible game-ball rule: the player with the highest single-game EPA (or WPA in a close game) on the winning team — auditable because tied to a specific game/play via the per-play ledger. Gate on ledger existence. Label INFERRED for the rule; UNKNOWN for real-vs-synthetic.

Q49. Draft board (`boardEntries`, `renderDraftBoard2`): surface raw-curve witness to user without exposing internals? Mock UI.
- INFERRED (mock proposed; product untouched — read-only). UI mock: a "Value" column on the draft board showing each player's curve span (wins from OVR 70→90) as a simple bar + label (e.g. "+0.9 wins"), color-coded green/yellow/red by tier, with a one-line tooltip "How many more wins this player adds from OVR 70 to 90 — bigger = more valuable to build around." No internals (no modelWeights, no quantisation). Label INFERRED.

Q50. RNG (T-20261022-claude-2): injection point + seeding contract so T2/T6 unblock on both tracks?
- INFERRED (colors shell not in this tree; not implemented). Injection point: a `seededRandom()` wrapper in the engine shell (colors/src/engine/rng.ts per lane file) replacing Math.random at the 56–58 sites. Contract: `seededRandom(seed)` returns a deterministic stream; same seed + same build = identical run; seed exposed in UI for reproducibility. Smallest change: wrap Math.random in one function and route all sites through it, seeded once at sim start. Label INFERRED.

Q51. Flex rules (REV 4/5): QB may flex ONLY to FS at −10 / cap at 10. Right magnitude? Slot-pair-specific penalty?
- INFERRED. −10 too restrictive (blocks realistic QB flexes); cap-at-10 too blunt (ignores cost). Slot-pair-specific penalty is justified (Q19/Q23). Right magnitude: proportional to actual win cost, hard-capped at 10. Label INFERRED.

Q52. 3-4/4-3 base toggle (P-017, SUPERSEDED): still relevant? Revive?
- INFERRED. flex.json already documents 3-4 slot mapping (DE1/NT/DE2/OLB×2/ILB×3) so the mechanics exist; a UI toggle is convenience, not mechanics. Revive only if the Owner wants it; low priority for Colors v1. Label INFERRED.

Q53. Game animation (P-007, SUPERSEDED): 30–60s, every turnover, Skip, reduced-motion. Still wanted? Changes?
- INFERRED. Not in build truth; superseded. Still-wanted: UNKNOWN (Owner did not reconfirm for Colors v1). If revived: Skip prominent, honor reduced-motion, cap at ≤15 s (30–60 s too long for repeat play). Label INFERRED.

Q54. Homepage (P-040…P-078, SUPERSEDED): which revive for Colors v1?
- INFERRED. None clearly established; all superseded. Revival is an Architect decision for Colors v1, not a VL determination. Label INFERRED.

Q55. Guide page (P-015, SUPERSEDED): flex table, wins-per-OVR, glossary. Revive any?
- INFERRED. Revive the flex table and wins-per-OVR list — they are user-facing explanations of engine behavior (flex rules, modelWeights) the Owner asked to keep understandable ("simple enough for the Owner to understand in 30 seconds"). Glossary optional. Label INFERRED.

Q56. Playoffs/clutch drama (P-122, SUPERSEDED): playoff intro ≥5s, clutch moments, Super Bowl intro ≤30s. Still wanted?
- INFERRED. Superseded; not in build truth. Still-wanted: UNKNOWN. Label INFERRED.

Q57. Champion banner (P-022, SUPERSEDED): gold shimmer, confetti. Still wanted?
- INFERRED. Superseded. Still-wanted: UNKNOWN. Label INFERRED.

Q58. OR's DIME position: should it be a first-class slot in the model, or a situational modifier? Argue with evidence.
- INFERRED. Situational modifier: DIME plays ~10% of snaps (3rd/4th-and-long, late games), filled by the 4th-best CB or flexed S/CB, and the 1,200-player dataset has no DIME tag — so it cannot be a first-class slot in the player model. Model it as a situational slot modifier (w=0.15 pass-rush/coverage weight on passing downs), not a roster position. Evidence: flex.json DIME note ("DIME is a slot (6th DB), not a position in the 1,200-player dataset"), installDime w=0.15. Label INFERRED.

Q59. OR's flex REV 5 (cap at 10) vs REV 4 (−10): which is more defensible? Propose a unified rule with justification.
- INFERRED. REV 5 (cap at 10) more defensible as the hard ceiling, but it needs a slot-pair-specific base penalty. Unified rule: penalty = clamp(round(winCost × k), 0, 10) (same as Q23). Justification for the Owner: "You never pay more than 10, and you pay roughly what the flex actually costs in wins — no more, no less." Label INFERRED.

Q60. The Owner's salary-based weights are now the default. Does this change the value of the raw-curve witness, or make it more important? Argue.
- INFERRED. MORE important: with salary (unvalidated) as default display, the raw-curve witness is the only contract-verified mechanics anchor (outOfContract=0 on Pre-Colors). It becomes the gate that keeps the display honest — every build must show the raw curve within contract of the display weights. Label INFERRED.

## Label tally
- VERIFIED: Q2 (Pre-Colors absorbed), Q8 (contract on Pre-Colors), Q40 (hash-pinning locations).
- REPORTED: none newly in this file (earlier REPORTED items cited from 11-07 notes).
- INFERRED: Q1, Q3, Q4, Q5, Q6, Q7, Q8 (broader), Q9–Q13, Q15–Q39 (except Q40), Q41–Q59, Q60 = well over 40 INFERRED-or-better (requirement ≥40 met).
- UNKNOWN: Q14, Q24, Q32, Q48 (real-vs-synthetic).
