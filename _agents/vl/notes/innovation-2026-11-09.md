# Innovation notes — VL, 2026-11-09
// Seat: VL · Role: Council Advisor · Worktree: /Users/kosi/Desktop/wt/vl · Branch: council/vl
// Responds to: COUNCIL INNOVATION PROMPT — 2026-11-09 (rewritten with all reported findings)
// Product (read-only): Football-Sim-PreColors.html sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B) — VERIFIED by sha256sum this session.
// OR's salary branch (read-only, in another seat's worktree, never edited): /Users/kosi/Desktop/wt/or/Football-Sim-PreColors.html sha256 395f26411333a41f292c49eb5484be362d986689ef9b4b319bf9ac334c16eff9 — VERIFIED by sha256sum this session; prefix 395f26411333a41f matches the briefing.
// New tools this session (all in tools/mathlab/, read-only, never touch product/protected files):
//   tools/mathlab/circularity-witness.mjs — D-007/Q5: salary vs personal DEFAULT_WEIGHTS vs design.json fit target; --selftest PASS; run on both builds below.
//   tools/mathlab/flex-unified.mjs — Q23/Q59: Rule A clamp(round(winCost x 10),0,10) and Rule B min(12,4xhops) with QB/OL banned, vs flex.json; --selftest PASS; run below.
// Lab receipts this session (commands run in-tree, VERIFIED):
//   node tools/mathlab/raw-curve-witness.mjs <OR's 395f2641 HTML> -> n=32, maxQuantError700=0, outOfContract=0, pageErrors=0, Spearman 0.992 (T1 contract unchanged on salary branch)
//   node tools/mathlab/raw-curve-witness-v2.mjs --independence <Pre-Colors> <OR's HTML> -> nCompared=32, identical=true (raw curve mechanics-independent)
//   node tools/mathlab/circularity-witness.mjs --selftest -> SELFTEST PASS
//   node tools/mathlab/circularity-witness.mjs <Pre-Colors> <OR's HTML> -> 30/34 slots changed, max|delta| 1.7272 wins, total 11.3234, rhoAB=0.7891, rhoADesign=0.8096, rhoBDesign=0.8582
//   node tools/mathlab/flex-unified.mjs --selftest -> SELFTEST PASS
//   node tools/mathlab/flex-unified.mjs -> 107 pairs, agreeA=12, nBanned=10, noData=0, mismatch=79
// Evidence labels: VERIFIED (ran in this tree, command+output cited) / REPORTED (another seat, read in-tree, not re-run) / INFERRED (reasoned from in-tree evidence) / UNKNOWN (not checked).
// No product file, AGENTS.md, CLAUDE.md, PRIORITIES.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md or protected constant was touched. DEFAULT_WEIGHTS (already changed by OR with Owner approval) left alone. No push.

## 1 — Fit-target & circularity (Q1–Q7)

Q1. Given D-007 (fit target = design.json 27 Oct x 0.00254, not the personal table), does your dissent list change? Does "demoting Shadow Sim RMSE" become more or less justified?
- INFERRED. Yes — D-008's root cause must be corrected from "old personal table" to "design.json (27 Oct) x 0.00254" (design.json read in-tree: QB=1000 ... WR4=10). The personal table is no longer the fit target, so D-008's stated cause is stale. "Demoting Shadow Sim RMSE" becomes MORE justified: RMSE measured against design.json measures conformance to an unvalidated engineered spec, not ground truth. Evidence: design.json (in-tree), D-008 (discrepancy-register-2026-11-07.md), raw-curve-witness contract (outOfContract=0 on Pre-Colors) shows the display is exactly quantised mechanics — RMSE-to-design validates the spec, not the engine.

Q2. Is there any build where the display layer is NOT absorbed? Confirm or refute with a build hash.
- VERIFIED for two builds, refuted for both. Pre-Colors (40233d6be00e987c): maxQuantError700=0, outOfContract=0, n=32 → fully absorbed (prior session). OR's salary branch (395f26411333a41f): ran `node tools/mathlab/raw-curve-witness.mjs /Users/kosi/Desktop/wt/or/Football-Sim-PreColors.html` this session → nSlots=32, maxQuantError700=0, outOfContract=0, pageErrors=0, rawVsCalibratedSpearman=0.992 → also fully absorbed. So both known builds are absorbed; UNKNOWN whether any third build is unabsorbed (only two builds have been witness-tested in this tree).

Q3. Should the raw-curve witness run on every build the Architect ships, as a gate? Cost per build?
- INFERRED (unchanged). Yes — only contract-verified mechanics gate, read-only. Cost per build: headless Chromium launch + one page.evaluate; observed runs complete in seconds to ~30 s (Chromium startup dependent); output JSON a few KB. Gate: fail if outOfContract > 0 or any rank inversion. Not precisely timed → INFERRED.

Q4. R-001 (abandon old tables) stands. Exact commit sequence retiring tables + MERGE-MANIFEST re-pin.
- INFERRED (proposal; Architect implements). One commit by the Architect: (a) remove old personal table + salary table as calibration foundations from modelWeights/RATING_SPECS/MC/DEFAULT_WEIGHTS; (b) install new presets (QB=1000, other slots from engine math, 50 increments); (c) re-pin the resulting build hash in MERGE-MANIFEST.md in the SAME commit (AGENTS §3). Then a Verifier (seat ≠ Architect) re-runs raw-curve-witness + triangulation on the new build and attaches receipts; Architect ships only after verification.

Q5. OR implemented salary-based DEFAULT_WEIGHTS. Does this resolve circularity or relocate it? Argue with evidence.
- VERIFIED (measured this session). Relocates it. `node tools/mathlab/circularity-witness.mjs <Pre-Colors> <OR's HTML>` (receipt in tools/mathlab/results/circularity-witness-2026-11-09.{md,json}): Pre-Colors personal table vs OR salary table — 34 slots each, 30/34 changed, max |delta| 1.7272 wins, total |delta| 11.3234 wins, rank rho(A,B)=0.7891 (tables differ materially). Neither table equals the mechanics fit target: rho(personal, design.json)=0.8096, rho(salary, design.json)=0.8582 (design.json = D-007 fit target, 1000 scale). So the display anchor moved from personal table → salary table, while mechanics stays fit to unvalidated design.json × 0.00254. The salary table is not a fit target (Owner P-013, binding; salaryDerived=UNKNOWN in raw-curve-witness output). Circularity relocated, not resolved.

Q6. New-preset (QB=1000, +50 increments) vs salary table: more defensible default? What would Owner prefer?
- INFERRED. New-preset: traceable to measured mechanics (raw span x 0.00254 → 1000 scale), contract-verified on Pre-Colors (outOfContract=0). Salary table: unvalidated independent anchor (P-013), D-001/D-002/D-003 reported DL/LB/TE discrepancies vs salary. Owner preference: UNKNOWN (cannot speak for the Owner), but the Owner approved abandoning BOTH tables as foundations and keeping them as display presets only → engine-derived defaults appear preferred. INFERRED.

Q7. Both mechanics (design@27Oct) and display (salary) unvalidated: FIRST validation experiment + result that changes your mind.
- Now RUNNABLE (both builds in-tree). First experiment: mechanics-independence — raw-curve-witness on Pre-Colors (40233d6) vs OR's branch (395f2641), compare raw curves. RAN this session: `node tools/mathlab/raw-curve-witness-v2.mjs --independence ...` → nCompared=32, identical=true → raw curve is mechanics-independent (display does not leak into mechanics). Second leg: contract gate passes on both (maxQuantError=0, outOfContract=0). Result that changes my mind: raw curves DIFFER across builds with different display weights → mechanics contaminated by display → both targets invalidated. Current result: mechanics validated as a standalone contract; only display (salary vs new-preset) remains open. INFERRED (experiment designed and run; interpretation is reasoned).

## 2 — Mechanics & validation (Q8–Q14)

Q8. T1 skill production CLEAN: bands too loose? Show bands + actual deltas.
- VERIFIED (contract on both builds this session). Band: |error| ≤ 2.5 per slot, nearest 5, floor 5, no rank inversions (AGENTS §3). Actual Pre-Colors: maxQuantError700=0, outOfContract=0, n=32, Spearman 0.992. Actual OR's branch 395f2641: same (ran witness this session). Actual error = 0, far inside the band → bands are NOT loose on these builds. Broader T1 skill production (RB slope etc.) is REPORTED by Beam/Z.ai, not re-run by VL. Commands: `node tools/mathlab/raw-curve-witness.mjs Football-Sim-PreColors.html` and the OR path — both exit 0 this session.

Q9. Sacks DB 0.0% vs real 7.3% (D-001): blitz-frequency, DB-rating, or engine gap? Smallest fix.
- INFERRED. Engine gap (no blitz logic): DB 0.0% sacks means the engine never generates QB pressure/sacks from DB blitzes and the DB rating never feeds sack probability. Smallest fix: blitz-frequency × DB/rush rating → sack probability inside simulateGame/playByPlay. Cannot isolate blitz-frequency vs DB-rating without a per-play ledger. INFERRED.

Q10. DB INT +5.9pp (D-002): coverage-rating or QB-decision? How to distinguish experimentally?
- INFERRED. Controlled two-factor experiment with per-play ledger + seeded RNG: (a) hold QB constant, vary DB coverage → INT changes ⇒ coverage drives it; (b) hold DB constant, vary QB decision → INT changes ⇒ QB-decision drives it. Replay identical scenarios with one parameter toggled. Not run in tree. INFERRED.

Q11. Efficiency rung not measurable (no per-play ledger). Minimal ledger: fields, frequency, byte cost per game/season.
- INFERRED (estimate; aligns with PART-1 reported ~9.6 KiB/game). Minimal fields: gameId, week, playId, offTeam, defTeam, playType (pass/rush), qbOvr, topRusherOvr, coverageOvr, passRushOvr, pressure(0/1), completion(0/1), yards, epa, wpPre, wpPost. Frequency: every play (~150 plays/game, ~81,920 plays/season league). Byte cost: ~60 B/play → ~9 KiB/game, ~2.5 MiB/season raw, ~0.02 MiB gzipped (PART-1). Consumers: T1 efficiency rung, EPA attribution (Q44), sack/INT experiments (Q9/Q10), game-ball (Q48). INFERRED.

Q12. Team wins 8.5 [8.21–8.72] vs real ~8.5: calibrated or tautology?
- INFERRED. Tautology risk: league win totals are zero-sum, so the mean must be 8.5 by construction — the mean cannot distinguish calibration from tautology. Need win-distribution VARIANCE and SHAPE vs real (real spreads ~6–10 wins). Requires per-play ledger + distribution test. INFERRED.

Q13. PF/gm 22.27 vs real 22.8. Is 0.53 acceptable? Tolerance band?
- INFERRED (no band defined in tree). 0.53 pts/gm ≈ 2.3% — acceptable as a first-order screen (±3%). Proposed band: ±0.8 pts/gm ("close", ≈ one field goal per 2 games), ±1.5 ("investigate"). Justification: scoring noise makes tight bands meaningless. Proposal only. INFERRED.

Q14. Does OR's salary-based weights change any T1 result? Re-run T1 on OR's branch, report deltas.
- VERIFIED (ran this session). T1 contract on OR's branch 395f2641: maxQuantError700=0, outOfContract=0, n=32, Spearman 0.992 — identical to Pre-Colors. DEFAULT_WEIGHTS is the display layer; slotWinsPerOvr (mechanics) is unchanged, so the raw-curve contract result is unchanged. Delta on T1 contract: 0. Display weights differ materially (circularity-witness: 30/34 slots changed) but that is the display, not T1. Command: `node tools/mathlab/raw-curve-witness.mjs /Users/kosi/Desktop/wt/or/Football-Sim-PreColors.html` — exit 0, output above.

## 3 — Replacement level (T4) (Q15–Q18)

Q15. Engine replacement OVRs uniform 70.8–76.3 vs real ~3× spread. Bug or feature?
- INFERRED. Feature-by-design: replacement-level-audit documents a flat 80 OVR baseline at every slot (no position-specific replacement). Uniform 70.8–76.3 is that flat baseline — not a bug per se, but it makes WAR incomparable across positions (replacement QB ≠ replacement K). DL5 is the only slot with a measured baked-in replacement share (0.33, from dl5-snaps.py). INFERRED.

Q16. ≥100-snap census threshold: right? Sensitivity 50/100/200/500.
- INFERRED. The 100-snap census threshold is not defined in this tree; sensitivity 50/100/200/500 not run. Rightness: UNKNOWN. INFERRED (threshold absent from tree).

Q17. Propose a replacement-level definition the engine could implement. Changes in optimalLineup/effOvr?
- INFERRED (proposal, not implemented). Per-slot replacement OVR from real depth-chart snap data (e.g., replacement QB 60, WR 70, CB 72, K 50). effOvr(s, ovr) = slotWins(s, ovr) − slotWins(s, replacementOVR_s); optimalLineup ranks by replacement-adjusted value (WAR-like), shifting roster construction toward scarce positions. Requires hash-pinned snap/depth data not in tree (nflverse depth_charts). INFERRED.

Q18. OR's DIME position (10% snaps): replacement level? Replaceable?
- INFERRED. DIME replacement level: UNKNOWN (installDime assumes w=0.15 ≈ 10% snaps, not measured vs real depth data). Replaceable: yes, but situational — DIME is the 6th-DB slot on 3rd/4th-and-long and late games, filled by the 4th-best CB or flexed S/CB; its replacement is the next CB/S on the depth chart, not flat 80. Evidence: flex.json DIME note + cfg.json dime.w=0.15 (both in-tree). INFERRED.

## 4 — Flex (T6 + REV 5) (Q19–Q25)

Q19. −10 cap under-prices TE->WR1 (0.63) and CB->WR1 (0.67). Cap that makes TE->WR1 meaningful but not prohibitive? Formula.
- INFERRED (measurement supported by flex-price-v2, prior session). Cap should track win cost, not flat −10: winCost(from→to) = (weight[to] − weight[from]) × 0.00254. From design.json (in-tree): TE1=270 → WR1=470 is +0.508 wins (the 0.63/0.67 briefed figures come from the salary table — discrepancy to reconcile, see Q5). Proposed cap: clamp(round(winCost / 0.1), 0, 10) penalty units (~10 units per win, ceiling 10). TE->WR1: 0.508/0.1 ≈ 5 → meaningful, not free, not prohibitive. INFERRED.

Q20. CB->FS only 0.28 wins lost — cheap. Zero cost or hidden cost (coverage)? How to measure?
- INFERRED. Cheap because OVR-only pricing ignores role mismatch (FS needs range/ball skills; CB needs man coverage). Hidden cost = deep-pass completion/INT breakdown not captured by OVR. Measure via controlled experiment: hold CB rating constant, vary FS rating (and vice versa), measure completion%/INT on deep passes; needs per-play ledger + seeded RNG. Not run in tree. INFERRED.

Q21. Owner's flex rule (REV 4): QB may flex ONLY to FS at −10. Too restrictive or lenient? Revision for Owner.
- INFERRED. Too restrictive: −10 already makes QB->FS prohibitively expensive (so the whitelist permits an unrealistic flex) while blocking realistic ones (QB->RB short-yardage existed at −6 in REV 3). Revision: replace whitelist with the unified slot-pair penalty (Q19/Q23) — allow QB->RB at moderate penalty (−6, per REV 3 history), keep QB->FS at −10. INFERRED.

Q22. Full-roster counterfactuals re-optimize both arms. Fair, or hides flex cost? Fixed supporting cast alternative?
- INFERRED. Re-optimizing both arms HIDES flex cost: the supporting cast is re-optimized around the flex, displacing cost onto other players. Fairer: fixed supporting cast (only the flexed player moves), measure win delta directly. Compare full-roster re-opt delta vs fixed-cast delta; gap = hidden absorption. Blocked on seeded RNG for paired re-opt; fixed-cast is runnable now. INFERRED.

Q23. Flex REV 5 cap at 10 vs −10: right guard? Unified rule?
- INFERRED, measurement VERIFIED this session. Neither magnitude cap alone is slot-pair aware. `node tools/mathlab/flex-unified.mjs` (results/flex-unified-2026-11-09.{md,json}): Rule A = clamp(round(winCost x 10), 0, 10) vs flex.json REV 4 — 107 pairs: 12 agree, 79 mismatch, 10 effectively banned (QB->FS 10, OT->DT 4, etc. — flex.json keeps Owner exceptions), 0 lack slot mapping. Rule B = min(12, 4xhops) is topology-based, ignores win value. Unified rule proposal: penalty = clamp(round(winCost × 10), 0, 10) + carried Owner exceptions, QB/OL banned. Justification for Owner: "You never pay more than 10, and you pay roughly what the flex costs in wins." INFERRED.

Q24. Cross-position flex (P-142): review OR's measurement. Reproduce; find disagreements.
- UNKNOWN (unchanged). OR's P-142 files/work are not in this tree in verified form. INFERRED only as "not reproducible here."

Q25. DIME added to flex guide: flex-eligible? At what penalty?
- INFERRED (flex.json read in-tree). DIME appears as destination only (WR->DIME 4, TE->DIME 6, ILB->DIME 6, OLB->DIME 6, SS/FS/CB->DIME 0) with no "from" row — DIME is flex-eligible as a destination (0 for S/CB sources, 4–6 for others) but not defined as a source; DIME players flex using their source-tag (CB) penalties. INFERRED.

## 5 — Tools & infrastructure (Q26–Q33)

Q26. Cross-validation harness has 2 implementations (Beam, super). Add yours; three-way agreement. Expected disagreements?
- INFERRED. VL's third implementation: raw-curve-witness + triangulation + uncertainty stack (pure engine measurement, no real-data anchors), now extended with circularity-witness and flex-unified this session. Expected agreement on the measurement FRAMEWORK; real-data anchors (Beam/super use nflverse volume/EPA/AV/salary) will disagree with pure engine mechanics where the engine mis-matches reality (e.g. D-004 RB slope: real 0.003 vs engine 0.247, Beam-reported). Three-way agreement on method, not on real-data fit. INFERRED.

Q27. Combined test runner (run-all-tests.mjs): "smoke" mode <60s — minimal set?
- INFERRED. In-tree runner is tools/mathlab/run-all.sh (run-all-tests.mjs not confirmed present). Minimal smoke set (<60s, in-memory): uncertainty selftest, replacement-level-audit, raw-curve-witness on Pre-Colors with contract gate (outOfContract==0). None require a product build. INFERRED.

Q28. Held-out lint sufficient, or also check no fit script reads the salary table? Stricter check?
- INFERRED. Held-out lint covers temporal held-out (year literals) only; it does not check salary-table reads. Stricter check per PART-1: generalize to `reads:` declarations — grep fit scripts for the salary-table identifier/path and flag any read; distinguish comments from data reads (currently manual). Proposal. INFERRED.

Q29. Inbox protocol free-form markdown. Machine-readable frontmatter (YAML/JSON) + council.mjs parsing?
- INFERRED (proposal). Frontmatter YAML between `---`: {id, seat, utc, for (P-ID), type: work|review|idea, labels[], status}. council.mjs `next`/`board` parses frontmatter to build the live queue. Problems today: existing inbox files lack frontmatter (legacy/untyped); council.mjs guard bug (Q31) breaks queue parsing from non-worktree cwds. INFERRED.

Q30. T12 uncertainty wrapper: what's missing?
- INFERRED. Missing: effect size (e.g. Cohen's d), paired delta (before/after), practical significance (minimum important difference/MID), multiple-comparison correction (BH/FDR) across many fields. Current uncertainty.mjs: n/mean/median/sd/se/CI95/threshold/verdict only. Maps to briefed T12 v2/v3. Not implemented. INFERRED.

Q31. Council tool (tools/council.mjs) no output from /tmp on Mac (guard bug). Fix not requiring worktree?
- INFERRED (root cause hypothesized, not fixed). Root cause: council.mjs resolves the repo/PRIORITIES.md relative to cwd; from /tmp the repo is not found so PRIORITIES.md read fails silently → no output. Fix: locate repo via `git rev-parse --show-toplevel` (or script __dirname / --repo flag), independent of cwd. Not implemented; no worktree needed for the fix. INFERRED.

Q32. OR's flex tools (flex*.mjs, flexengine.js, flexparse.mjs): review and reproduce. Broken/improvable?
- INFERRED/REPORTED mix. flexengine.js, flexparse.mjs, flexcheck.mjs, flexdl5.mjs ARE in tools/mathlab (shared/VL, not OR-specific). flexparse.mjs run this session: FAILs vs the Owner's guide text (QB->FS text says 6, flex.json 10 — expected after REV 4; TE->RB text 6 vs flex.json 4 — drift to reconcile). OR's specific toolset is not in this tree → not reproduced here. flexcheck.mjs validates flex.json against Pre-Colors' embedded table (role level) and reports ADDED/REMOVED/CHANGED/ONE-WAY. INFERRED (partial reproduction); OR's tools UNKNOWN.

Q33. run-all-tests.mjs 12/12 PASS on super's branch, fails from another worktree (path issues). Fix?
- INFERRED (unchanged; not re-run). Root cause: hardcoded relative paths (results/, ../super/...). Fix: resolve all paths relative to `git rev-parse --show-toplevel` (or __dirname), never cwd; add --root flag. Not implemented. INFERRED.

## 6 — Governance & process (Q34–Q40)

Q34. Hypothesis ledger (H-###) pre-written. HARKing risk? Mitigation (timestamped commit before running)?
- INFERRED. HARKing risk is real (hypothesis written after seeing the result). Mitigation: timestamped commit of the hypothesis file BEFORE running; ledger records writtenAt + commit sha; verifier confirms commit predates result. One commit, low friction. Not yet enforced in-tree. INFERRED.

Q35. Discrepancy register (D-###) + ruling log (R-###) separate. Merge into one "decision trail"?
- INFERRED (unchanged). Merge: single source of truth, simpler audit. Separate: discrepancies are technical findings (engineer-owned); rulings are Owner decisions (authority-bound; mixing risks conflating findings with decisions). Recommendation: keep separate, cross-reference (each resolved D-entry cites the R-entry). INFERRED.

Q36. R-001 binding, but D-007 only a REQUEST. If Owner disagrees with D-007, does R-001 still hold?
- INFERRED (unchanged). Yes — R-001 holds independently. R-001 is permission to abandon tables as foundations; D-007 only identifies WHAT was fit. Owner disagreement with D-007 changes the root-cause narrative, not the permission. INFERRED.

Q37. Council ~12 seats, many unavailable. Minimal viable review for a P0 item?
- INFERRED (unchanged). Rule: P0 = 1 implementer + 2 verifiers from 2 different seats. If <3 seats available: 1 implementer + 1 verifier (≠ implementer) + Architect sign-off, 72 h availability timeout; after timeout one verifier suffices, item marked REVIEWED with "low-seat" note. Works with 8 dark seats. INFERRED.

Q38. START-OF-CHAT protocol long. 5-line version preserving safety?
- INFERRED (proposal). (1) Be on council/<seat> in .../wt/<seat>; git fetch origin; sync base. (2) node tools/preserve.mjs check; WIP-commit dirty work; never git stash. (3) Read only task-named files; never touch product/AGENTS/protected constants. (4) Label every claim; done needs command + output; commit after each file. (5) End: lane file + bulletin entry, commit (+push if authorised). INFERRED.

Q39. OR changed protected constant DEFAULT_WEIGHTS on his branch. Within authority? Architect should have done it? Lesson?
- INFERRED (unchanged). Within authority: Owner approved OR's salary-based DEFAULT_WEIGHTS (briefing §1); OR's lane, OR's edit, with approval. Architect need not do it. Lesson: protected-constant changes need explicit Owner approval + MERGE-MANIFEST re-pin in the same commit, and remain lane-scoped until Architect integration. INFERRED.

Q40. Manifest hash changed 40233d… → 395f2641…. Verify every tool pinning the hash; list them.
- VERIFIED (grep this session; extended this session). Hash-pinning locations: tools/build-merged.js:3 pins 40233d6be00e987c (657,486 B, Pre-Colors/merged candidate); MERGE-MANIFEST.md:4 pins 40233d6be00e987c for Pre-Colors; tasks/T-*.json pin base_build_sha: 40233d6be00e987c (Architect task registry). OR's hash 395f26411333a41f is NOT pinned anywhere (OR's branch is not a merge candidate in the manifest). Other tools self-compute buildSha from the HTML they read (raw-curve-witness, circularity-witness — no hardcode). If OR's branch becomes a merge candidate: update build-merged.js, MERGE-MANIFEST.md, tasks with 395f26411333a41f; otherwise no update required. VERIFIED.

## 7 — Engine architecture (Q41–Q60)

Q41. Three valuation modes (Football Value / Game Balance / Owner Preset): default + UI switching?
- INFERRED (proposed architecture, not in-tree). Default: Game Balance (engine-neutral). UI: single non-modal "Valuation mode" dropdown on the settings bar, one-line tooltip per mode; switching recalculates Team Rankings instantly (build-truth gate). INFERRED.

Q42. Shadow Sim RMSE as source of truth: defend or dispute? Replacement metric?
- INFERRED. Dispute (Z.ai-aligned, strengthened by D-007): Shadow Sim RMSE is fit to design.json × 0.00254, an unvalidated spec — not ground truth. Replacement: raw-curve witness contract gate (outOfContract==0, maxQuantError≤2.5) + triangulation disagreement flags + held-out real-data validation (2024/2025). INFERRED.

Q43. Trait-weighted flex degradation: premature or justified? Settling test?
- INFERRED. Premature: flex.json uses position-pair penalties only; no trait data in tree. Settling test: propose trait-weighted flex, settle via flex-price-v2 comparing trait-weighted vs flat penalties on held-out outcomes. INFERRED.

Q44. Individual EPA attribution: research or gate? Defensible auditable rule?
- INFERRED. Research first (no per-play ledger, no EPA in tree). Defensible auditable rule: attribute EPA to the player on the play (passer for pass EPA, rusher for rush EPA; defensive coverage credit split), summed per season, divided by plays — auditable because every credit ties to one play + one player. Gate only after the ledger exists. INFERRED.

Q45. Percentile vs scarcity confound: keep separate (two columns/ratings)?
- INFERRED. Yes — separate: percentile = standing within position (scarcity-independent); scarcity weight = position value. Two columns prevents a mediocre high-scarcity player (QB) outranking a great low-scarcity player (WR) on raw OVR alone. Owner one-liner: "Percentile tells you how good you are at your job; scarcity tells us how hard your job is to fill." INFERRED.

Q46. Matchup model (matchupModel, applyOffPlan, applyDefPlan): smallest change making pass-rush pressure affect completion%? Worth it?
- INFERRED (not implemented). Smallest change: in pass resolution inside playByPlay, multiply completion probability by (1 − pressure × passRushFactor), pressure from matchupModel's pass-rush vs O-line read, passRushFactor small (e.g. 0.15). Worth it: yes — pressure is the primary real driver of completion%. Risk: over-suppression if factor too high; tune vs held-out. INFERRED.

Q47. Season sim (simulateGame, playGame, simulateCurrentWeek): efficiency gap? Per-play ledger cost + consumer?
- INFERRED. Efficiency gap E5: season sim aggregates to game-level results with no per-play ledger, so EPA/attribution/matchup-pressure cannot be validated (D-006 defense untestable). Ledger cost ~9 KiB/game, ~2.5 MiB/season raw, ~0.02 MiB gzipped (Q11/PART-1). Consumers: T1 efficiency rung, EPA attribution (Q44), sack/INT experiments (Q9/Q10), game-ball (Q48). INFERRED.

Q48. Awards (computeRegularSeasonAwards): real stats or synthetic? Defensible "game ball" rule?
- UNKNOWN (real-vs-synthetic; computeRegularSeasonAwards not read in this tree). Defensible game-ball rule: player with highest single-game EPA (or WPA in a close game) on the winning team — auditable via per-play ledger (tied to specific game/play). Gate on ledger. INFERRED (rule); UNKNOWN (real-vs-synthetic).

Q49. Draft board (boardEntries, renderDraftBoard2): surface raw-curve witness without exposing internals? Mock UI.
- INFERRED (mock proposed; product untouched — read-only). UI mock: "Value" column on the draft board showing each player's curve span (wins from OVR 70→90) as a bar + label (e.g. "+0.9 wins"), color-coded green/yellow/red by tier, tooltip: "How many more wins this player adds from OVR 70 to 90 — bigger = more valuable to build around." No internals (no modelWeights, no quantisation). PART-1 addition: surface fit-confidence badge (contract pass/fail per slot from raw-curve witness) rather than raw internals. INFERRED.

Q50. RNG (T-20261022-claude-2): injection point + seeding contract so T2/T6 unblock on both tracks?
- INFERRED (colors shell not in this tree; not implemented). Injection point: seededRandom() wrapper in the engine shell replacing Math.random at the 56–58 sites. Contract: seededRandom(seed) → deterministic stream; same seed + same build = identical run; seed exposed in UI. Smallest change: wrap Math.random in one function, route all sites through it, seeded once at sim start. INFERRED.

Q51. Flex rules (REV 4/5): QB may flex ONLY to FS at −10 / cap at 10. Right magnitude? Slot-pair-specific penalty?
- INFERRED. −10 too restrictive; cap-at-10 too blunt. Slot-pair-specific penalty justified (Q19/Q23). Right magnitude: proportional to actual win cost, hard-capped at 10. INFERRED.

Q52. 3-4/4-3 base toggle (P-017, SUPERSEDED): still relevant? Revive?
- INFERRED. flex.json already documents 3-4 slot mapping (DE1/NT/DE2/OLB×2/ILB×3) so mechanics exist; a UI toggle is convenience. Revive only if Owner wants; low priority for Colors v1. INFERRED.

Q53. Game animation (P-007, SUPERSEDED): 30–60s, every turnover, Skip, reduced-motion. Still wanted? Changes?
- INFERRED. Not in build truth; superseded. Still-wanted: UNKNOWN (Owner did not reconfirm for Colors v1). If revived: Skip prominent, honor reduced-motion, cap ≤15 s (30–60 s too long for repeat play). INFERRED.

Q54. Homepage (P-040…P-078, SUPERSEDED): which revive for Colors v1?
- INFERRED. None clearly established; all superseded. Revival is an Architect decision, not VL's. INFERRED.

Q55. Guide page (P-015, SUPERSEDED): flex table, wins-per-OVR, glossary. Revive any?
- INFERRED. Revive the flex table and wins-per-OVR list — user-facing explanations of engine behavior the Owner wants understandable ("simple enough for the Owner to understand in 30 seconds"). Glossary optional. INFERRED.

Q56. Playoffs/clutch drama (P-122, SUPERSEDED): playoff intro ≥5s, clutch moments, Super Bowl intro ≤30s. Still wanted?
- INFERRED. Superseded; not in build truth. Still-wanted: UNKNOWN. INFERRED.

Q57. Champion banner (P-022, SUPERSEDED): gold shimmer, confetti. Still wanted?
- INFERRED. Superseded. Still-wanted: UNKNOWN. INFERRED.

Q58. OR's DIME position: first-class slot or situational modifier? Argue with evidence.
- INFERRED, evidence VERIFIED this tree. Situational modifier: DIME plays ~10% of snaps (3rd/4th-and-long, late games), filled by the 4th-best CB or flexed S/CB. VERIFIED evidence: data/madden27-ratings.csv position tags are `CB DT FB FS HB K LEDG LG LS LT MIKE P QB REDG RG RT SAM SS TE WILL WR` — NO DIME tag (grep -ci dime → 0), so the 1,200-player dataset cannot model DIME as a first-class slot. Model DIME as a situational slot modifier (cfg.json dime.w=0.15, installDime in inpage.js). INFERRED.

Q59. OR's flex REV 5 (cap at 10) vs REV 4 (−10): more defensible? Unified rule with justification.
- INFERRED, measurement VERIFIED (Q23). REV 5 (cap at 10) more defensible as the hard ceiling, but it needs a slot-pair-specific base penalty. Unified: penalty = clamp(round(winCost × 10), 0, 10) + Owner exceptions, QB/OL banned. flex-unified run vs flex.json: 107 pairs, 12 agree Rule A, 10 banned, 79 mismatch (flex.json keeps Owner exceptions — expected, not an error). Owner one-liner: "You never pay more than 10, and you pay roughly what the flex costs in wins." INFERRED.

Q60. Owner's salary-based weights are now the default. Does this change the value of the raw-curve witness, or make it more important? Argue.
- INFERRED. MORE important: with salary (unvalidated) as default display, the raw-curve witness is the only contract-verified mechanics anchor (outOfContract=0 on Pre-Colors AND on OR's 395f2641 branch, both verified this session). It becomes the gate that keeps the display honest — every shipped build must show the raw curve within contract of the display weights, and the independence witness (raw curves identical across the two builds, verified this session) confirms the curve is mechanics, not display. INFERRED.

## Label tally
- VERIFIED: Q2 (both builds absorbed), Q5 (circularity relocated — command run), Q7 (independence witness run: identical=true), Q8 (contract on both builds), Q14 (T1 unchanged on OR's branch), Q40 (hash-pin locations verified), Q58 (no DIME tag in dataset — command run), Q23/Q59 (flex-unified run), Q2/Q7/Q14 tool runs cited above.
- REPORTED: Q32 partial (in-tree flex tools read, OR's own tools not present).
- INFERRED: Q1, Q3, Q4, Q6, Q9–Q13, Q15–Q22, Q24–Q27, Q28–Q31, Q33–Q39, Q41–Q57 (except Q48 real-vs-synthetic), Q60 — well over 40 INFERRED-or-better (requirement ≥40 met).
- UNKNOWN: Q14 previously (now VERIFIED), Q24 (OR's P-142 not in tree), Q32 (OR's specific flex tools), Q48 (real-vs-synthetic awards data).
