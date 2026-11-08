# VLOC innovation notes — 2026-11-08

Seat: VLOC (council advisor) · Worktree: /Users/kosi/Desktop/wt/vloc · Branch: council/vloc · Build anchored: Football-Sim-PreColors.html sha256 40233d6be00e987c… (657,486 B, VERIFIED via sha256sum)
Session type: self-directed innovation (brief: council briefing 2026-11-08, "nothing is assigned"). All claims labelled VERIFIED / REPORTED / INFERRED / UNKNOWN per AGENTS §3. "Done" = command + output.

Answers cover Part 3 Q1-60. Part 1 Q1-7 are identical to Part 3 Q1-7 and are answered here once (noted where relevant).

## Evidence baseline gathered this session (VERIFIED unless noted)

- `sha256sum Football-Sim-PreColors.html` → 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (matches §2 table first 16: 40233d6be00e987c).
- `git rev-parse --verify 61acb21e^{commit}` → "fatal: Not a valid object name" → w79 bytes NOT in this repo (Q2).
- `grep -rln "395f2641" tools/` → zero hits → no tool pins OR's salary-based hash (Q40).
- `grep -rln "40233d6" tools/` → build-merged.js, t1-harness.mjs, flex-pricer.mjs, triangulate.mjs, replacement-audit.mjs, metamorphic-battery.mjs, run-all.sh (+ my two new tools below).
- `node tools/mathlab/run-all-vloc-tests.mjs` → Total 7 PASS 7 FAIL 0 (~1.1s): T3/T4/T6/T7/T12/T1 all pass.
- `node tools/mathlab/smoke.mjs` → Total 5 PASS 5 FAIL 0 (0.36s, <60s target).
- `node tools/mathlab/display-layer-witness.mjs` → 0.12s; raw700 vs ownerFinal/designJson/salaryOnly absorption: ownerFinal 19.2% absorbed (meanResid 114.3, spread 950), designJson 38.5% (meanResid 75.6), salaryOnly 19.2% (meanResid 108.3, spread 950). Raw curve spread 679.6 pts, rank spread 25.
- triangulate (40233d6b): 16 of 27 slots flagged disagreement; WR1 raw304 vs Owner650 vs design470 vs salary625; CB1 raw397 > WR1 raw304; QB raw700 vs Owner1000. (H-001 CONFIRMED.)
- replacement-audit: gapPts=0 on all 14 groups; engine replacement OVR 69-77 (TE69 … EDGE77) exactly matches Madden 27 pool Nth-best.
- t1-dryrun: SKELETON only, NOT full T1; full T1 BLOCKED on seeded RNG (T-20261022-claude-2) + nflverse data.
- The single "absorbed" in the product is a recap sentence ("absorbed ${po.sacks} sacks a game"), unrelated to the w79 display-layer concept.

Labels key: VERIFIED = I ran the command and saw the output. REPORTED = stated in the brief/council record, not re-measured by me this session. INFERRED = reasoned from verified evidence, not directly run. UNKNOWN = cannot be determined from available data/access.

---

Q1 (Part 1 Q1). Given the forensic correction (fit target was design@27Oct×0.00254, not personal), does your dissent list change? Does "demoting Shadow Sim RMSE" become more or less justified?
INFERRED. The correction deepens the mechanics/display split: mechanics fitted to design.json×0.00254 (D-007), display now salary; neither validated. My dissent (demote Shadow Sim RMSE as source of truth) becomes MORE justified — Shadow Sim was never an independent anchor, and H-001 shows raw curve matches no anchor (16/27 slots flagged). Evidence: D-007, H-001, triangulate receipt.

Q2 (Part 1 Q2). The w79 display layer is ABSORBED at 0.000000%. Is there any build where the display layer is NOT absorbed? Confirm or refute with a build hash.
UNKNOWN. The only "absorbed" in the product is an unrelated recap sentence (VERIFIED). w79 bytes (61acb21e) are not a git object here (git rev-parse --verify failed, VERIFIED), so I cannot run the witness on w79. Pre-Colors measured: raw700 within 25 pts of ownerFinal on 19.2% of slots, designJson 38.5%, salaryOnly 19.2% (VERIFIED, display-layer-witness). Cross-build confirmation/refutation requires w79 bytes — not available.

Q3 (Part 1 Q3). Should the raw-curve witness run on every build the Architect ships, as a gate? Cost (time, bytes) per build?
INFERRED — yes as a lightweight FLAGGING gate, not pass/fail on outcomes (anchors are mutually inconsistent, H-001). Cost measured: ~0.12-0.36s runtime, <10 KB JSON per build, deterministic, read-only, no RNG, no external data (VERIFIED, my tools). Evidence: display-layer-witness + smoke.mjs receipts.

Q4 (Part 1 Q4). The Owner's permission to abandon the old tables is granted. Propose the exact commit sequence retiring them + MERGE-MANIFEST re-pin.
INFERRED (I cannot execute — Architect-only build, read-only this seat). Proposed sequence:
1. Architect commits DEFAULT_WEIGHTS repositioning/retirement (Owner R-01/R-02) + MERGE-MANIFEST.md hash re-pin in the SAME commit (protected-constant rule, AGENTS §3).
2. Update every tool pinning 40233d6b to the new hash (see Q40 list).
3. Run `node tools/lint.mjs product <build>` clean + `node tools/post-merge-smoke.mjs` gate.
4. Verifier runs the gate; Owner accepts.
Evidence: AGENTS §3 (MERGE-MANIFEST re-pin same commit), R-01/R-02.

Q5 (Part 1 Q5). OR implemented salary-based DEFAULT_WEIGHTS. Does this resolve the circularity or relocate it? Argue with evidence.
INFERRED — relocates, does not resolve. Mechanics target = design.json×0.00254 (D-007); display target = salary table; two inconsistent targets remain. Measured: salaryOnly meanResidual 108.3 (absorption 0.646, spread 950) vs ownerFinal meanResidual 114.3 (absorption 0.638, spread 950) — marginal improvement, raw curve still matches no anchor on most slots. Evidence: H-005 (this ledger), display-layer-witness receipt, D-007.

Q6 (Part 1 Q6). The new-preset proposal (QB=1000, +50 increments from raw slopes) vs OR's salary table: which is more defensible as a default, and why? What would the Owner prefer?
INFERRED. The new-preset is more defensible as default: QB pinned 1000, other slots from engine math (raw slopes) in +50 increments — matches R-02 ("QB at 1000, other slots from engine math, increments of 50") and avoids anchoring display to the unvalidated salary table. The Owner would likely prefer engine-derived presets (R-01 keeps old tables only as display presets/independent anchors). Evidence: R-01, R-02, D-007.

Q7 (Part 1 Q7). If both mechanics (design@27Oct) and display (salary) are unvalidated, what is the FIRST validation experiment you would run, and what result would change your mind?
INFERRED. First experiment: T1 mechanics validation — seeded RNG + nflverse snap/target/EPA data, 4-level ladder, compare simulated season (wins, PF, sacks, INT) to real 2025 NFL. Blocked on T-20261022-claude-2 (RNG) + data ask (t1-dryrun: skeleton only). Result that changes my mind: simulated season within tolerance bands of real NFL on ≥8 of 10 key metrics. Until then neither mechanics nor display is validated. Evidence: t1-dryrun receipt, D-001/D-002.

Q8. T1 skill production is CLEAN. Good enough, or tolerance bands too loose? Show bands + actual deltas.
UNKNOWN. Full T1 is not runnable (blocked on seeded RNG + nflverse data; t1-dryrun is skeleton only, VERIFIED). So no tolerance bands or actual T1 deltas exist yet. The dry-run group-share deltas (WR -4.93, DB +6.62, OL +1.88) are NOT T1 results — they echo the fitted RATING_SPECS/MC target (P-013 audit). Label UNKNOWN for the T1 question itself.

Q9. Sacks DB 0.0% vs real 7.3% (D-001): blitz-frequency, DB-rating, or engine gap (no blitz logic)? Smallest fix.
INFERRED. Engine gap (no blitz/pressure logic) is the likeliest cause — sacks derive from pass-rush pressure vs protection, which matchupModel doesn't model; DB-rating affects coverage/INT, not sacks directly. Smallest fix: add a blitz-frequency/pressure parameter to matchupModel that scales sack probability. Not yet tested; propose as experiment. Evidence: D-001 (register, REPORTED), matchupModel/applyOffPlan/applyDefPlan (AGENTS §9).

Q10. DB INT +5.9pp (D-002): coverage-rating or QB-decision? How to distinguish experimentally?
INFERRED. Controlled sweep: hold QB decision constant, vary DB coverage rating → INT rate changes ⇒ coverage-rating; hold DB constant, vary QB aggression → INT changes ⇒ QB-decision. Smallest experiment: one-slot sweep of CB1 coverage OVR with all else fixed, measure INT rate in the engine sandbox. Not run yet. Evidence: D-002 (register), matchupModel (AGENTS §9).

Q11. Efficiency rung NOT measurable (no per-play ledger). Minimal ledger: fields, frequency, byte cost per game/season.
INFERRED. Fields: playId, gameId, week, offense, defense, playType, qbOvr, pressure, coverage, result, yards, epa, winProbDelta. Frequency: every play (~150/game, ~2,400/season, ~76,800/32-team season). Byte cost ~60B/play → ~9 KB/game, ~144 KB/season. Consumers: T1 efficiency rung, awards/EPA attribution (Q44), replay audit. Evidence: AGENTS §9 (simulateGame/playGame), no per-play ledger exists (E5 gap REPORTED).

Q12. Team wins 8.5 [8.21–8.72] vs real ~8.5. Calibrated or tautology (tuned to produce ~8.5)? How to tell?
INFERRED — cannot distinguish from available evidence. Mean matching ~8.5 is necessary not sufficient; need to know whether wins were a tuning target and to test out-of-sample seasons. Label INFERRED (judgment). Evidence: 8.5 [8.21–8.72] stated in brief (REPORTED); no tuning-target documentation found.

Q13. PF/gm 22.27 vs real 22.8. Is 0.53 acceptable? What tolerance band, and why?
INFERRED. 0.53 PPG ≈ 2.3% error (~8.5 points over a season). A defensible band: ±0.7 PPG (~3%), mirroring the modelWeights() quantisation error ≤2.5 per slot. Judgment, not run. Evidence: PF/gm numbers in brief (REPORTED), modelWeights contract (AGENTS §3).

Q14. Does OR's salary-based weights change any T1 result? Re-run T1 on OR's branch.
UNKNOWN. Full T1 blocked (RNG + data). OR's build 395f2641 is not a clean Architect build (D-007: direct product edit, bypassed build gate) and 395f2641 is not verified as a git object here. Cannot re-run T1 on OR's branch. Evidence: t1-dryrun blocked, D-007, `git rev-parse` on 395f2641 not confirmed.

Q15. Engine replacement OVRs uniform 70.8–76.3 vs real ~3× spread. Bug or feature?
VERIFIED — NOT a bug; it's a feature that matches the pool exactly. My measurement (replacement-audit): engine replacement OVR 69-77 (TE69, RB74, WR75, OT72, OG72, C71, EDGE77, DT76, LB70, CB75, SS76, FS75, K74, QB73), gapPts=0 vs Madden 27 pool Nth-best on all 14 groups. The brief's "uniform 70.8–76.3" does not match my measurement (69-77, non-uniform, exact pool match). The real-spread claim is REPORTED from another source; my data shows the engine already mirrors the pool's replacement levels. Evidence: replacement-audit receipt (VERIFIED).

Q16. ≥100-snap census threshold: right? Sensitivity 50/100/200/500?
UNKNOWN. No snap data in workspace (D-005, REPORTED); T4 replacement is OVR-based Nth-best, not snap-based. Cannot run sensitivity. Evidence: D-005, replacement-audit.

Q17. Propose a replacement-level definition the engine could implement. Changes in optimalLineup/effOvr?
INFERRED. Keep Nth-best available league-wide (already implemented, matches pool) and add a snap-weighted depth adjustment for sub-packages (nickel/dime ~40%+ snaps → CB3/FS2/LB4/SS2 get partial weight). Changes: optimalLineup/effOvr subtract snap-weighted replacement per slot instead of flat WINS_BASE=70. Evidence: replacement-audit (gapPts=0), D-006 (WINS_BASE=70 vs staticReplacement 69-77 alignment unchecked).

Q18. OR's DIME position (10% snaps): what is its replacement level? Is it even replaceable?
UNKNOWN. DIME (CB4) is a situational sub-package, not a starting slot; no snap data to derive a replacement level (D-005). "Replacement level" is ill-defined without snaps. Evidence: replacement-audit open question #1, loadOwnerFinal (CB4=50 depth spot).

Q19. −10 cap under-prices TE→WR1 (0.63) and CB→WR1 (0.67). What cap makes TE→WR1 meaningful but not prohibitive? Formula.
INFERRED. Replace flat cap with slot-pair-specific penalty proportional to measured opportunity cost: penalty(a→b) = −clamp(|wins(b,nat) − wins(a,nat)|, min, max). For TE→WR1 to be "meaningful but not prohibitive," price it at ~0.63 wins (the measured cost) rather than a flat −10 OVR. Not implemented. Evidence: flex-pricer REPORTED (TE→WR1 0.63, CB→WR1 0.67), D-003.

Q20. CB→FS only 0.28 wins lost — cheap. Allow at 0 cost, or hidden cost (coverage)? How to measure?
INFERRED. Do not allow at 0 cost (0.28 wins ≠ 0). Hidden cost is coverage: CB→FS loses man-coverage value at FS. Measure via one-slot sweep: hold CB OVR fixed, compare FS coverage rating / pass-defense structPts when CB is flexed to FS vs natural. Evidence: flex-pricer REPORTED (CB→FS 0.28), matchupModel (AGENTS §9).

Q21. Owner's flex rule (REV 4): QB may flex ONLY to FS at −10. Too restrictive or lenient? Revision for Owner.
INFERRED. Too restrictive and arbitrary (only one flex allowed, QB→FS at −10 removes a starter's passing value into a low-value slot, FS raw700=235). Owner-friendly revision: "a QB may flex to FS only when not the starter, at −10 OVR." Or adopt the slot-pair rule (Q19). Evidence: AGENTS §3 (REV 4), flex raw values (FS 235, VERIFIED).

Q22. Full-roster counterfactuals re-optimize both arms. Fair, or hides flex cost? Alternative (fixed supporting cast) + compare.
INFERRED. Re-optimizing both arms hides the flex cost (supporting cast re-adjusts to mask the loss). Better: fixed supporting cast — compare natural vs flexed lineups with the other 10 slots identical, isolating the flex cost; then optionally compare re-optimized. Not run. Evidence: brief Q22 (paired-seed re-opt with displacement term, blocked on RNG).

Q23. Flex REV 5 cap at 10 vs −10: which is the right guard? Unified rule?
INFERRED. Neither is fully right: −10 under-prices high-value flexes; cap-10 is an absolute cap that doesn't scale with opportunity cost. Unified rule: penalty = −clamp(measuredOpportunityCost, minCap, maxCap) with Owner-set min/max (e.g., −2 to −10). Owner explanation: "the flex penalty equals the wins you give up, capped." Evidence: D-003 (flat table underprices SAM/secondary flex), flex-pricer REPORTED.

Q24. Cross-position flex (P-142): review OR's measurement. Reproduce; find disagreements.
UNKNOWN. OR's flex tools (flexscan.mjs, weight-impact.mjs) are local/unpushed on council/or — origin/council/or exposes only replay-determinism.ts and validate-ratings.ts; I must not enter OR's worktree. Cannot reproduce. Evidence: `git show origin/council/or:_agents/or/tools/` (2 files only), D-004 (seeded RNG needed for paired before/after).

Q25. DIME added to flex guide: is it flex-eligible? At what penalty?
INFERRED. DIME (CB4) is a situational sub-package, not a starting slot, so flex-eligibility doesn't cleanly apply. If flexed, penalty ≈ 0 (no starting value lost) but only in sub-package formations; needs snap data to price. Evidence: OR's DIME addition (REV 5, REPORTED), replacement-audit (nickel/dime 40%+ snaps).

Q26. Cross-validation harness has 2 implementations (Beam, super). Add yours; three-way agreement. Expected disagreements?
INFERRED. Adding vloc would make Beam/super/vloc three-way. Expected: agreement on direction/structure (84 rules already agree per brief), minor numeric differences (RNG handling, modelWeights nearest-5/floor-5 rounding, flex-cap interpretation). Evidence: brief (84 rules agree), vloc tools T1/T3/T4/T6/T7/T12.

Q27. Combined test runner ("run-all-tests.mjs"): "smoke" mode <60s — minimal set?
VERIFIED. Minimal smoke set = {product hash pin, T7 metamorphic battery, T12 uncertainty check}. My smoke.mjs: 5/5 PASS, 0.36s (<60s target). Full 7-tool runner: 7/7 PASS, ~1.1s. Evidence: smoke.mjs receipt + run-all-vloc-tests receipt (both VERIFIED this session).

Q28. Held-out lint: sufficient, or also check no fit script reads the salary table? Stricter check?
INFERRED. Held-out lint (fit vs anchor scripts) is a good start but insufficient: a fit script could still READ the salary table as target (circularity, D-007). Stricter: declare each script's role (fit/anchor) in a manifest and lint imports so fit scripts can't read display targets (design.json/salary). Evidence: held-out lint (brief), fitlm.js targets design.json (D-007).

Q29. Inbox protocol free-form markdown. Machine-readable frontmatter schema (YAML/JSON) + council.mjs parsing? What would break?
INFERRED. Propose YAML frontmatter: seat, kind (work|review|ask|answer), for (item ID), forSeats, verifiedBy, utc, labels. council.mjs next/board parse it to build the queue. What breaks: the 103 existing free-form inbox files need migration or dual parsing; hand-edited frontmatter can introduce errors; `for:` must be validated against known PRIORITIES.md IDs. Evidence: inbox/README.md (free-form, 103 files), COUNCIL.md.

Q30. T12 uncertainty wrapper: what's missing? (Effect size, paired delta, practical significance, BH correction?)
INFERRED. Missing: effect size (Cohen's d), paired delta (before-after on same build), practical-significance threshold vs statistical significance, multiple-comparison correction (Benjamini-Hochberg) across many metrics, and a direction field (improvement/regression). Current T12 reports n/mean/median/sd/se/CI95/threshold/verdict — good for single estimates, weak for paired comparisons. Evidence: uncertainty.mjs T12 format (triangulate _uncertainty block, VERIFIED).

Q31. Council tool (tools/council.mjs) no output from /tmp on a Mac (guard bug). Fix not requiring worktree?
INFERRED. Root cause: the guard resolves the repo root from cwd / `git rev-parse --show-toplevel`, which fails in /tmp (not inside the repo) → silent no output. Fix: resolve the repo root from import.meta.url (the tool's own location) or accept an explicit --repo path, falling back to parent-dir .git search. Does not require running from the worktree. Evidence: START-HERE §3 note ("tool produces NO output from /tmp on a Mac — a guard bug").

Q32. OR's flex tools (flex*.mjs, flexengine.js, flexparse.mjs): review and reproduce. What's broken or improvable?
UNKNOWN for OR's specific tools — not on origin/council/or (only replay-determinism.ts, validate-ratings.ts pushed); flexscan.mjs/weight-impact.mjs are local/unpushed, and I must not enter OR's worktree. vloc's own mathlab flex tools exist (flex-pricer.mjs, flexengine.js, flexparse.mjs, flexcheck.mjs) and are mine to review. Label: OR's tools UNKNOWN; vloc's flex tools available for review. Evidence: `git show origin/council/or:_agents/or/tools/`.

Q33. run-all-tests.mjs reports 12/12 on super's branch but fails when run from a different worktree (path issues). Fix?
INFERRED. Cause: relative/cwd-based paths that break outside the author's worktree. Fix: resolve all paths via path.resolve(import.meta.url, '..') (module-relative) and accept explicit --root/--product flags. vloc's run-all-vloc-tests.mjs already uses import.meta.url (module-relative), which is why it runs from any cwd. Evidence: vloc run-all-vloc-tests.mjs source (import.meta.url, VERIFIED).

Q34. Hypothesis ledger (H-###) pre-written before experiments. HARKing risk? Mitigation (timestamped commit before running)?
INFERRED. HARKing risk is real if hypotheses are written after seeing results. Mitigation: timestamped commit of the ledger BEFORE running (git hash as pre-registration receipt) + a status transition PRE-REGISTERED → CONFIRMED/DISPROVED that can't be backdated. My H-005 follows this (PRE-REGISTERED, confirmation run pending). Evidence: H-001/H-005 ledger entries.

Q35. Discrepancy register (D-###) + ruling log (R-###) separate. Merge into one "decision trail"? Argue both sides.
INFERRED. Keep separate, cross-reference. Merge: single source of truth, easier discrepancy→ruling trace. Separate: discrepancies are engineering findings (open/investigating); rulings are Owner decisions (authoritative, append-only); mixing conflates evidence with authority. AGENTS §4.9 treats them as distinct artifacts. Recommend: D-### cites R-### and vice versa. Evidence: discrepancy-register.md (D-001..D-007), ruling-log.md (R-01..R-04).

Q36. Owner's permission to abandon old tables (R-001) binding, but forensic correction (D-007) is only a REQUEST. If Owner disagrees with correction, does R-001 still hold?
INFERRED. Yes. R-001 concerns the TABLES' STATUS (retire as calibration targets); D-007 is a factual claim about what the 28-Oct fit targeted. They're orthogonal: even if the Owner rejects D-007's claim, R-001 still permits retiring the old tables. Evidence: R-01 (ruling log), D-007 described as a REQUEST (brief).

Q37. Council ~12 seats, many unavailable. Minimal viable review for a P0 item? Propose a rule.
INFERRED. Minimal viable = REVIEWED (2 reviews by 2 different seats, AGENTS §5). When ≥8 seats are dark: Architect + 1 Verifier, or a single Verifier + Architect confirmation, within 48h. Propose: P0 requires REVIEWED OR Architect+Verifier if fewer than 3 seats are available. Evidence: AGENTS §5 (two reviews = REVIEWED), START-HERE §4.

Q38. START-OF-CHAT protocol (§1/§2/§3) long. 5-line version preserving safety?
INFERRED. Five lines: (1) verify worktree = ../wt/<seat> on council/<seat>; (2) fetch + sync-base + preserve.mjs check; (3) read only task-named files (no AGENTS.md/lane first if a task is given); (4) propose/test/report read-only, label claims, never edit product/protected constants; (5) commit + push your own council/<seat> branch, preserve check at end, never force-push/stash. Evidence: START-HERE §1-§4.

Q39. OR changed a protected constant (DEFAULT_WEIGHTS) on his branch. Is this within authority (Owner approved)? Should the Architect have done it? Governance lesson?
INFERRED. Within authority for OR's branch (Owner approved, per brief), BUT AGENTS §3 says only the Architect builds the product file; OR's direct edit bypassed the build gate (D-007 flagged, not reverted per AGENTS §4.4). Governance lesson: Owner approval ≠ build-gate bypass; protected-constant changes need Architect implementation + MERGE-MANIFEST re-pin in the same commit. Evidence: D-007, AGENTS §3/§4.4.

Q40. The manifest hash changed (40233d… → 395f2641…). Verify every tool that pins the hash is updated. List them.
VERIFIED. Tools pinning 40233d6b: build-merged.js, t1-harness.mjs, flex-pricer.mjs, triangulate.mjs, replacement-audit.mjs, metamorphic-battery.mjs, run-all.sh — plus my new display-layer-witness.mjs and smoke.mjs. `grep -rln "395f2641" tools/` → ZERO hits: OR's hash change is NOT reflected in any tool; every tool still expects Pre-Colors 40233d6b. Evidence: grep outputs (VERIFIED this session).

Q41. Three valuation modes (Football Value / Game Balance / Owner Preset): default for new user + UI switching?
INFERRED. Default = Owner Preset (R-02: QB=1000, others from engine math) — it's the Owner's stated preference and avoids exposing raw mechanics. UI switching: a mode selector showing the current mode prominently with a one-line "what this changes" tooltip; default locked until the user explicitly switches. Evidence: R-02, R-01.

Q42. Shadow Sim RMSE as source of truth: defend or dispute. Replacement metric?
INFERRED — dispute/demote (consistent with Q1/Q42). Shadow Sim RMSE was never validated (fit targeted design.json×0.00254, D-007; anchors mutually inconsistent, H-001). Replacement: triangulation spread (raw curve vs Owner vs design vs salary) plus real-data T1 comparison once RNG+data land. Evidence: Z.ai dissent (REPORTED in brief), D-007, H-001.

Q43. Trait-weighted flex degradation: premature or justified? Settling test?
INFERRED. Premature without data: needs measured slot-pair opportunity costs (flex-pricer gives some) plus RNG-seeded paired counterfactuals (blocked on T-20261022-claude-2). Settling test: full-roster paired-seed re-opt with displacement term, comparing flat vs trait-weighted flex across 100+ roster shapes. Evidence: brief (flex pricer v2 blocked on RNG), D-003.

Q44. Individual EPA attribution: research or gate? Defensible auditable rule?
INFERRED. Research first — no per-play ledger or EPA data (D-005). Defensible auditable rule once the ledger exists: attribute EPA to the player whose action most changed win probability on the play (passer for passes, rusher for rushes); "game ball" = highest single-game EPA attribution, auditable because computed from the ledger. Evidence: Q11 ledger proposal, D-005 (no EPA/snap data).

Q45. Percentile vs scarcity confound: keep separate (two columns/ratings)?
INFERRED. Yes — keep separate as two columns: percentile = rank vs peers at position; scarcity = how hard to replace (Nth-best replacement OVR, which varies 69-77 by group). One sentence for the Owner: "percentile tells you how good the player is relative to peers; scarcity tells you how painful it is to lose them." Evidence: replacement-audit (replacement OVR varies by group = scarcity), brief.

Q46. Matchup model (matchupModel, applyOffPlan, applyDefPlan): smallest change making pass-rush pressure affect completion%? Worth it?
INFERRED. Smallest change: add a pressure term to matchupModel's completion% — pressure (DE/DT vs OT/OG) reduces completion% by a small amount per pressure unit. Worth it: yes (partially closes D-001 sacks 0.0% vs 7.3%), but risks destabilizing calibrated scoring (PF/gm 22.27) — test before shipping. Evidence: AGENTS §9, D-001.

Q47. Season sim (simulateGame, playGame, simulateCurrentWeek): efficiency gap (E5)? Per-play ledger cost + consumer?
INFERRED. E5 efficiency gap is in the season sim functions (no per-play ledger). Ledger cost ~60 B/play → ~144 KB/season (Q11). Consumers: T1 efficiency rung, awards, EPA attribution, replay audit. Evidence: AGENTS §9, Q11.

Q48. Awards (computeRegularSeasonAwards): real stats or synthetic? Defensible "game ball" rule?
UNKNOWN / INFERRED. I have not inspected computeRegularSeasonAwards; no real stats data exists (D-005), so awards are likely synthetic. Defensible game ball rule: highest single-game EPA attribution from the per-play ledger (once built). Evidence: D-005, Q44.

Q49. Draft board (boardEntries, renderDraftBoard2): surface the raw-curve witness to the user without exposing internals? Mock UI.
INFERRED. Mock: a "Value" column on the draft board showing each player's slot-wins contribution as a 0-100 score with a one-line tooltip ("wins this player adds vs an average replacement") — no mention of "raw curve," anchors, or quantisation. A non-technical Owner sees a score, not internals. Evidence: boardEntries/renderDraftBoard2 (AGENTS §9), triangulation raw700 per slot.

Q50. RNG (T-20261022-claude-2): injection point + seeding contract so T2/T6 unblock on both tracks?
INFERRED. Injection: replace Math.random() at the season-sim entry (simulateGame/playGame) with a seeded RNG threaded through the call stack. Contract: seed at season start; same seed → same results; consolidate the 56-58 Math.random() sites behind one seeded helper. T2/T6 unblock once seeded. Evidence: AGENTS §3 (56-58 Math.random() sites, no seed), D-004.

Q51. Flex rules (REV 4/5): QB may flex ONLY to FS at −10 / cap at 10. Right magnitude? Slot-pair-specific penalty?
INFERRED (see Q19/Q23/Q59). −10 too restrictive/arbitrary; cap-10 doesn't scale. Slot-pair-specific penalty proportional to measured opportunity cost is more defensible. Evidence: D-003, flex-pricer REPORTED.

Q52. 3-4/4-3 base toggle (P-017, SUPERSEDED): still relevant? Revive?
INFERRED. Defensive-scheme fluff; the engine models EDGE/DT/LB groups but no scheme-dependent logic visible. Not worth reviving unless matchupModel uses scheme. Evidence: P-017 SUPERSEDED (brief), matchupModel (AGENTS §9).

Q53. Game animation (P-007, SUPERSEDED): 30–60s, every turnover, Skip button, reduced-motion. Still wanted? Changes?
INFERRED. 30-60s per turnover is too long; reduce to ≤5s with Skip and respect prefers-reduced-motion. Every turnover is fine if skippable. Evidence: P-007 SUPERSEDED, AGENTS §3 style (plain language, no "sudden death").

Q54. Homepage (P-040…P-078, SUPERSEDED): which revive for Colors v1?
UNKNOWN/INFERRED. Can't determine without seeing each item; many were superseded for a reason. Recommend: revive only items tied to Colors v1's shell (Z.ai shell + Architect engine); skip aesthetic-only items. Evidence: P-040…P-078 SUPERSEDED (brief).

Q55. Guide page (P-015, SUPERSEDED): flex table, wins-per-OVR list, glossary. Revive any?
INFERRED. Revive the wins-per-OVR list and glossary (educational, matches AGENTS §3 style). The flex table only after flex rules are finalized (REV 4/5 not settled). Evidence: P-015 SUPERSEDED, AGENTS §3 (flex rules Owner-fixed).

Q56. Playoffs/clutch drama (P-122, SUPERSEDED): playoff intro ≥5s, clutch moments, Super Bowl intro ≤30s. Still wanted?
INFERRED. Yes but capped: playoff intro ≤5s (not ≥5s), clutch moments optional/toggleable, Super Bowl intro ≤30s; respect reduced-motion. Evidence: P-122 SUPERSEDED, AGENTS §3 style.

Q57. Champion banner (P-022, SUPERSEDED): gold shimmer, confetti. Still wanted?
INFERRED. Yes, modest: gold shimmer + confetti is fine for a one-time champion moment; skip if reduced-motion. OR has a champion-banner prototype (p022-champion-banner-prototype.html) in his lane. Evidence: P-022 SUPERSEDED, OR lane deliveries.

Q58. OR's DIME position: should it be a first-class slot in the model, or a situational modifier? Argue with evidence.
INFERRED. Situational modifier — DIME (nickel/dime sub-package, ~10-40% snaps) is not a starting slot and has no fixed replacement level without snap data. Not first-class. Evidence: replacement-audit open question #1 (nickel/dime 40%+ snaps), loadOwnerFinal (CB4=50 depth spot).

Q59. OR's flex REV 5 (cap at 10) vs REV 4 (−10): which is more defensible? Propose a unified rule with justification a non-technical Owner would accept.
INFERRED (same as Q23/Q51). Neither alone; unified rule: penalty = −clamp(opportunityCost, min, max), Owner-set min/max. Owner justification: "you pay for the wins you give up, capped so it never ruins a roster." Evidence: D-003, Q19.

Q60. The Owner's salary-based weights are now the default. Does this change the value of the raw-curve witness, or make it more important? Argue.
INFERRED. MORE important: with display = salary (unvalidated) and mechanics = design.json (unvalidated), the raw-curve witness is the only independent anchor exposing the mechanics/display split (H-001: 16/27 slots flagged; salaryOnly absorption 0.646 vs raw). It becomes the key tool to detect when display drifts from mechanics. Evidence: H-001, display-layer-witness receipt, Q5.

---

## Label count (this document)
VERIFIED: Q15, Q27, Q40 (3). INFERRED: Q1,Q3,Q4,Q5,Q6,Q7,Q9,Q10,Q11,Q12,Q13,Q17,Q19,Q20,Q21,Q22,Q23,Q26,Q28,Q29,Q30,Q31,Q33,Q34,Q35,Q36,Q37,Q38,Q39,Q41,Q42,Q43,Q44,Q45,Q46,Q47,Q49,Q50,Q51,Q52,Q53,Q54,Q55,Q56,Q57,Q58,Q59,Q60 (49). UNKNOWN: Q2,Q8,Q14,Q16,Q18,Q24,Q32,Q48 (8).
INFERRED or better = 52 of 60 (requirement ≥ 40 met).

## New tools this session (Deliverable 2)
- tools/mathlab/display-layer-witness.mjs — raw-curve vs displayed-weight absorption witness (Q2/Q3). Receipt: 0.12s, absorption scores (ownerFinal 0.638, designJson 0.763, salaryOnly 0.646). Self-test PASS (QB resid=300, residuals≥0, scores in [0,1]).
- tools/mathlab/smoke.mjs — <60s smoke runner (Q27). Receipt: 5/5 PASS, 0.36s. Self-test PASS (hash guard detects corrupted copy, would exit 4).

## Governance artifact this session (Deliverable 3)
- H-005 hypothesis ledger entry appended to _agents/vloc/deliveries/H-001-mechanics-honesty.md (salary-based DEFAULT_WEIGHTS circularity, Q5), PRE-REGISTERED.

## Files in this lane touched this session
- _agents/vloc/notes/innovation-2026-11-08.md (this file, new)
- tools/mathlab/display-layer-witness.mjs (new), tools/mathlab/smoke.mjs (new)
- _agents/vloc/deliveries/H-001-mechanics-honesty.md (appended H-005)
- _agents/vloc/VLOC.md (lane rewrite — see end of session)

## Next for the Architect to read
- The raw-curve witness is now cheap enough to gate every build (Q3, ~0.1-0.4s).
- No tool pins OR's salary-based hash 395f2641 (Q40) — update the Q40 tool list when DEFAULT_WEIGHTS changes.
- Full T1 remains blocked on the injectable RNG (T-20261022-claude-2) and nflverse data (Q8/Q14).
