SPEAKER: DS | ROLE: advisor | TASK: Innovation window — answers to the 60 questions | DATE: 2026-11-08T00:00Z
FOR: P-284 (salary weights) · P-255 (methodology) · council innovation window
ANSWER-OF: COUNCIL BRIEFING & INNOVATION INVITATION, 2026-11-08

# 60 answers, labelled

**Labels:** 6 answers are UNKNOWN (2, 8, 14, 24, 32, 40); the rest are INFERRED or better. VERIFIED
receipts are at 1, 5, 12, 39 and 60; REPORTED claims are at 1, 2, 39 and 40. The six UNKNOWNs name the
experiment that would settle them; none is a guess dressed as a fact.

**The short version.** The engine's current match to the salary table is a fit, not a validation. The
unfitted old engine overvalues the secondary (+147 mean vs salary) and the kicker (+234), and undervalues
WR1 (−216) and WR2 (−164). That is the bias the Owner suspected, but it is not a literal copy of his
personal table (MAE 297 vs 107 for salary). The way out is a data anchor (snaps × EPA above replacement,
held-out seasons), pre-registration, sensitivity across anchors, and an independent verifier — not another
table fitted into the same mechanics.

---

## Fit-target & circularity

**1. Does the D-007 correction change my dissent list?**
Partly. D-007 says the 28 Oct fit target was `design.json` 27 Oct × 0.00254, not the personal table, so the
"fitted to the personal table" claim is wrong for that historical fit. It does not remove the circularity:
`design@27Oct` is another table, and the *current* Colors fit targets `salary-reference.json` (verified in
`calibrate-weights.mjs` and `value.ts`). Demoting Shadow Sim RMSE becomes *more* justified, because the fit
target is a table, not an outcome. **VERIFIED** for the current fit path; **INFERRED** for the provenance of
`design@27Oct`.

**2. Is the w79 display layer ABSORBED at 0.000000%? Any build where it is not?**
I did not run the raw-curve witness on w79, so I cannot confirm or refute the 0.000000% claim; it is
**REPORTED**. I know of no build hash where it is demonstrably not absorbed, and I will not invent one. The
test is cheap: run the witness on w79 (`61acb21e…`, REPORTED) and on one earlier shell; if the display layer
changes measured outcomes on either, the claim is false. **UNKNOWN**.

**3. Should the raw-curve witness run on every build as a gate?**
Yes, as a **warning gate**, not a hard fail, until the baseline is stable. Cost: one script extraction plus
one measurement run (seconds to minutes), output a small JSON (kilobytes); no product bytes. It is a
structural check, not a full sweep, so the cost is low relative to the value of catching an ABSORBED display
layer. Make it a hard fail only after two builds agree on the baseline. **INFERRED**.

**4. Commit sequence for retiring the old tables + re-pin.**
Propose: (a) tag the current state; (b) move the old tables to `_archive/tables/` with a README naming each
source and date; (c) remove them from the live import path; (d) re-pin `MERGE-MANIFEST.md` in the *same*
commit; (e) run `tools/check-tasks.mjs` and the gate; (f) a Verifier confirms the new hashes and that no live
file imports the retired paths. I have not executed this; the exact commit hashes depend on the Architect's
branch. **INFERRED**.

**5. Does OR's salary-based `DEFAULT_WEIGHTS` resolve or relocate the circularity?**
Relocates it. The engine now matches salary by construction: rho 0.992, MAE 7.1, top-5 5/5, zero inversions.
The target moved from the personal table to the market table; the fit machinery is the same. The unfitted
Pre-Colors curve is still the independent evidence, and it differs from salary by MAE 107.5 and rho 0.682.
**VERIFIED**.

**6. New preset (QB=1000, +50 from raw slopes) vs OR's salary table: which is more defensible as a default?**
Neither is objective. The raw-slope preset is derived from the engine's own mechanics, so it is circular in
a different way (it measures the engine, not football). Salary is an external market signal and is more
transparent; it is the better *prior*. The Owner would prefer the salary table because he chose it and can
explain it. **INFERRED**.

**7. If both mechanics and display are unvalidated, what is the first validation experiment?**
The data anchor on the **unfitted** mechanics, starting with the two biggest suspected biases: CB3/nickel
and K. Result that would change my mind: if the data puts CB3 near 100 (25% of CB1), the salary table is
vindicated and the old engine's CB3 was wrong; if it puts CB3 near 300+ (65–75% of CB1), the old engine was
closer and the fit overcorrected. **INFERRED**.

## Mechanics & validation

**8. T1 skill production is CLEAN — good enough, or are the bands too loose?**
I do not have the T1 band table in front of me, so I cannot certify the tolerance. The test: the bands must
be derived from real season-to-season variation (not hand-set), and the actual deltas must be inside them on
a *held-out* season. If both hold, it is good enough for a first pass; if the bands were chosen to make the
engine pass, they are not. **UNKNOWN** (needs the bands + deltas); **INFERRED** for the criterion.

**9. Sacks DB 0.0% vs real 7.3% (D-001): blitz frequency, DB rating, or engine gap?**
Most likely an engine gap: the engine has no blitz/pressure logic that lets a DB or pass rush create a sack.
The smallest fix is a pressure term in `matchupModel` (pass rush − pass block) that raises sack probability
and lowers completion%; re-baseline the golden test. **INFERRED**.

**10. DB INT +5.9pp (D-002): coverage rating or QB decision? How to distinguish?**
Hold one side constant. Same QB, vary DB coverage rating: if INTs track coverage, it is coverage. Same DB,
vary QB rating/decision: if INTs track the QB, it is the QB. The current engine likely has one turnover roll,
so the experiment may show it is neither; that would be the finding. **INFERRED**.

**11. Efficiency rung not measurable: minimal per-play ledger.**
Fields: `game_id, play_id, drive_id, offense, defense, down, distance, yardline, play_type, yards, epa,
success, turnover, sack, penalty, seconds`. Frequency: per play. Byte cost: ~200–400 B/play × ~150
plays/game × 272 games ≈ 8–16 MB/season uncompressed, ~1–2 MB gzipped. Consumers: EPA attribution, awards,
recaps, the Lab. **INFERRED** (estimate; the byte range is a design target, not a measurement).

**12. Team wins 8.5 [8.21–8.72] vs real ~8.5: calibrated or tautology?**
The point estimate alone cannot tell. Test the *distribution*, not the mean: the drafted league's win SD is
2.20 vs real 3.07 (P-250), so the mean is matched while the spread is too flat. That is evidence of tuning
to the mean, not full calibration. **VERIFIED** for the SD; **INFERRED** for the tautology reading.

**13. PF/gm 22.27 vs real 22.8: acceptable? What band?**
The 0.53 gap is ~2.3%. With 272 games the SE of the mean is ~0.1–0.2, so 0.53 is outside a naive 2σ band;
but the real 22.8 itself varies by season. Use a band of 22.0–23.6 (±0.8 around 22.8) and require the
*season-to-season* distribution to match, not just the pooled mean. 22.27 is inside that band. **INFERRED**.

**14. Does OR's salary weights change T1?**
Yes in principle: T1's skill production depends on the slot values, and the salary fit changes WR1, CB, K
and C substantially. I did not re-run T1 on OR's branch, so the deltas are **UNKNOWN**. Expected direction:
passing/receiving up (WR1 +198, WR2 +153), secondary/ST down (CB3 −267, K −234). **INFERRED** for direction.

## Replacement level (T4)

**15. Engine replacement OVRs uniform 70.8–76.3 vs real ~3× spread: bug or feature?**
A feature of the engine's flat replacement model: it uses one replacement level per position, not a
distribution. Real replacement level varies by position, season and scheme. It is a simplification that
hides scarcity, not a bug in the code. **INFERRED**.

**16. ≥100-snap census threshold: right? Sensitivity 50/100/200/500.**
100 is a reasonable floor for stable per-slot estimates, but it is arbitrary. Run 50/100/200/500 and report
whether the ranking is stable; if it is, the threshold does not matter; if not, report the range and pick the
threshold that minimizes rank churn. **INFERRED**.

**17. Propose a replacement-level definition the engine could implement.**
The best available free agent at the position, or the 33rd–40th percentile of snap-weighted OVR — not the
15th-best salary. Changes: `optimalLineup` uses the replacement OVR as the baseline; `effOvr` becomes value
above replacement; the draft board shows the replacement line. **INFERRED**.

**18. DIME (10% snaps): replacement level? Is it replaceable?**
If DIME is a 10%-snap situational slot, its replacement is the next-best CB/S who can play the slot; it is
replaceable, and its value is low because the volume is low. Do not give it a first-class replacement level
until its snap share is measured. **INFERRED**.

## Flex (T6 + REV 5)

**19. −10 cap under-prices TE→WR1 (0.63) and CB→WR1 (0.67). What cap makes TE→WR1 meaningful?**
A flat cap is not a price. The defensible formula is
`penalty(a→b) = min(cap, max(floor, (value(b) − value(a)) × k + friction(a,b)))`, with `k` ≈ 0.25–0.5 and
friction from cross-position measurables. For TE→WR1 the value gap is large, so the penalty should be large;
a flat 10 is too small. **INFERRED**.

**20. CB→FS only 0.28 wins lost — cheap. Allow at 0 or hidden cost?**
Allow at a small positive cost, not zero. Coverage ability is not safety range; the hidden cost is scheme
fit, which the engine does not model. Measure it with a coverage-vs-range proxy (target EPA allowed vs
deep-pass EPA allowed). **INFERRED**.

**21. Owner's flex rule (QB only to FS at −10): too restrictive or lenient?**
It is a product guard, not a football truth. It prevents the main exploit (QB stacking at RB/WR), which is
defensible. A revision: QB→FS at −10, QB→any other at −25 or disallowed; keep the rest. **INFERRED**.

**22. Full-roster counterfactuals re-optimize both arms: fair or hides flex cost?**
It hides the cost because the re-optimized arm can replace the flexed player with a better natural player.
Use **fixed supporting cast** for the cost estimate and **full re-optimization** for the net effect; report
both. **INFERRED**.

**23. Flex REV 5 cap at 10 vs −10: which guard? Unified rule?**
A cap at 10 is a maximum penalty, not a price; it makes all flex moves equally cheap at the top. −10 is a
flat price. Neither is a formula. Unified rule: the formula in Q19, floor 10 for any cross-position move,
cap 25–30, QB→FS at −10 as a special case. **INFERRED**.

**24. Cross-position flex (P-142): review OR's measurement.**
I did not reproduce it, so the review is **UNKNOWN**. The method should use fixed supporting cast, paired
seeds, and report the displacement term separately from the flex penalty. **INFERRED** for the method.

**25. DIME flex-eligible? At what penalty?**
If DIME is a subpackage slot, it should be flex-eligible at a small penalty reflecting the coverage/run
tradeoff, not at zero. The penalty should be measured, not asserted. **INFERRED**.

## Tools & infrastructure

**26. Cross-validation harness has two implementations; add a third. Expected disagreements?**
Add a third implementation of the *metric definitions* (not the engine). Expected disagreements: tie
handling, normalization anchor, raw vs normalized values, and whether a missing slot is dropped or imputed.
The value is in the definitions, not the code. **INFERRED**.

**27. Combined runner "smoke" mode <60s: minimal set.**
Node parse check, the matchup ±50 test, the no-inversion test, the golden parity test, the flex rules test,
and the build-pin check. That catches the most for the least time. **INFERRED**.

**28. Held-out lint: sufficient? Stricter check?**
It is not sufficient. A filename-based fit/anchor distinction is spoofable; add a static import-graph check
that no fit script reads `salary-reference.json` or `design.json` in the same process as the evaluation.
**INFERRED**.

**29. Inbox frontmatter schema + `council.mjs` parsing.**
YAML frontmatter with `speaker, role, task, date, for, state, labels, evidence, reviewers`; parse a small
YAML subset, fall back to the current regex if absent. What breaks: free-form prose that does not start with
`---`, and every existing file. Adopt with a 30-day dual-read. **INFERRED**.

**30. T12 uncertainty wrapper: what is missing?**
Effect size (Cohen's d), paired delta on the same seeds, practical significance (does it change a decision?),
multiple-comparison correction (BH), and a pre-registered threshold. Also state the unit (wins vs OVR).
**INFERRED**.

**31. `tools/council.mjs` no output from `/tmp` on Mac: root cause and fix.**
Most likely the guard resolves the repo root from `process.cwd()` and rejects paths outside the worktree;
`/tmp` is a symlink to `/private/tmp` on macOS, so a realpath comparison fails. Fix: resolve both the cwd
and the repo root with `fs.realpathSync`, compare realpaths, or accept an explicit `--repo` flag. I did not
read the guard, so this is a hypothesis. **INFERRED** (needs the code).

**32. OR's flex tools (`flex*.mjs`, `flexengine.js`, `flexparse.mjs`): review and reproduce.**
I did not review them; **UNKNOWN**. Check units (wins vs OVR), supporting-cast sampling, and seed handling
first; those are where flex measurements usually go wrong. **INFERRED** for the checklist.

**33. `run-all-tests.mjs` 12/12 on super's branch but fails elsewhere: path fix.**
Resolve every path from the script's `import.meta.url` (`fileURLToPath`), not `process.cwd()`; move test
data into the repo as fixtures. That makes the runner worktree-independent. **INFERRED**.

## Governance & process

**34. HARKing risk in the H-### ledger. Mitigation without friction?**
Yes, the risk is real. Mitigation: commit the hypothesis file *before* running the experiment, with a
timestamp and hash; the result commit references the hypothesis commit. One file, one extra commit — low
friction. **INFERRED**.

**35. Merge D-### and R-### into one decision trail?**
Both sides: merging gives one trail; separating keeps facts (discrepancies) distinct from decisions
(rulings). Recommendation: keep separate, add a `decision_id` cross-reference in each D entry and a
`discrepancy_id` in each R entry. **INFERRED**.

**36. If the Owner disagrees with D-007, does R-001 still hold?**
Yes. R-001 is a permission ("abandon the old tables"), not a factual claim; it stands even if the forensic
correction is wrong. The *reason* changes, not the permission. Document the disagreement and keep R-001.
**INFERRED**.

**37. Minimal viable review for a P0 item with 8 seats dark.**
One author + one independent verifier who did not author the item, plus the Architect's acceptance. If no
verifier is available, the item stays `proposed`; do not lower the bar. Two seats is the minimum for P0; one
for P2/P3. **INFERRED**.

**38. START-OF-CHAT in five lines, preserving safety.**
(1) Read AGENTS §2 (build truth) and §4 (worktree rules). (2) Run `node tools/preserve.mjs check`; if it
fails, stop and report. (3) Run `node tools/council.mjs next`; take the top item or review one. (4) Work in
your lane, label claims, commit/push your branch. (5) End with a bulletin entry and `preserve check`.
**INFERRED**.

**39. OR changed a protected constant with Owner approval: within authority? Should the Architect have done it?**
The Owner can authorize anyone; the Architect is the normal writer, but the Owner's approval is the
authority. The governance lesson: record the approval *before* the change, with the exact value, and re-pin
the manifest in the same commit. OR did it with approval (REPORTED); the process is acceptable if the ruling
is in `claude/rulings/` and `MERGE-MANIFEST.md` is re-pinned. **VERIFIED** for the ruling file; **INFERRED**
for the process.

**40. Manifest hash changed `40233d…` → `395f2641…`: every tool that pins the hash.**
Partial. The obvious list: `tools/verify-build-pins.mjs`, `tools/post-merge-smoke.mjs`, `MERGE-MANIFEST.md`,
the test-order files, and any lane tool that quotes the hash. I did not grep every file, so the list is
**UNKNOWN** in full; the check is `grep -rn "40233d6b\|395f2641" --exclude-dir=.git .` and then verify each
hit. **INFERRED** for the list; **UNKNOWN** for completeness.

## Engine architecture

**41. Three valuation modes: default for a new user + UI.**
Default: **Owner Preset** (the salary table) for display, with a "Why?" panel; Football Value for the draft
board; Game Balance for the season sim. UI: one toggle with three labels and a one-line explanation each;
do not mix modes on one screen. **INFERRED**.

**42. Shadow Sim RMSE as source of truth: defend or dispute? Replacement metric?**
Dispute. It is a fit metric, not a validation metric. Replace it with held-out data-anchor error (MAE/rho)
plus distribution checks (SD, extremes); keep RMSE as a diagnostic. **INFERRED**.

**43. Trait-weighted flex degradation: premature or justified? Settling test?**
Premature until the flex price is validated; trait weights add parameters without an independent anchor.
Settling test: compare trait-weighted vs flat penalties on held-out flex outcomes, if the data exists.
**INFERRED**.

**44. Individual EPA attribution: research or gate? Defensible rule?**
Research, not a gate. A defensible rule: attribute EPA to QB/primary target/ball carrier by a fixed share
(e.g., 50/30/20), with OL/DEF as a team-level residual; audit by summing to team EPA. **INFERRED**.

**45. Percentile vs scarcity: keep separate? One-sentence explanation.**
Yes: two columns, `talent_percentile` (how good) and `scarcity` (how hard to replace), and a combined value
with documented weights. One sentence: "Percentile is how good he is; scarcity is how much worse the next
guy is." **INFERRED**.

**46. Matchup model: smallest change for pass-rush pressure → completion%. Worth it?**
Add a pressure term: `p = base − k × (passRush − passBlock)`, calibrate `k` to real pressure→completion
data, keep the rest. What breaks: the golden parity test and the sack rate; re-baseline. Worth it if the
sack gap (D-001) is a priority. **INFERRED**.

**47. Season sim efficiency gap: per-play ledger cost + consumer.**
The gap is the lack of a per-play record. Cost: ~1–2 MB/season gzipped and ~10–20% runtime. Consumers: EPA
attribution, awards, recaps, the Lab. **INFERRED** (estimate).

**48. Awards: real or synthetic? Defensible "game ball" rule?**
They are computed from the engine's simulated stats, not real stats; that is fine for a sim. The game-ball
rule should be a published weighted score (EPA + turnovers + clutch) that a reader can recompute from the
box score. **INFERRED**.

**49. Draft board: surface the raw-curve witness without internals. Mock UI.**
A small "value curve" strip under each position: two dots (engine vs table) and a delta, with a tooltip
"engine values this spot X; the table says Y." No internals, no formulas; a "details" link for the curious.
**INFERRED**.

**50. RNG: injection point + seeding contract.**
Inject at `simulateGame(seed)`; pass a PRNG object down; contract: `seed` is a 32-bit int, `rng()` returns
[0,1), all random calls go through it, same seed + same inputs = same output. Smallest first change: wrap
`Math.random` in an `rng` module and thread it through `simulateGame`/`playGame`. **INFERRED**.

**51. Flex rules (REV 4/5): right magnitude? Slot-pair penalty?**
A flat −10 is a product guard, not a football price. The magnitude should come from the value gap and
friction (Q19); measure with fixed supporting cast. **INFERRED**.

**52. 3-4/4-3 base toggle: still relevant? Revive?**
Relevant for scheme diversity, but it is a UI/scheme feature, not a core value; revive after the value
model is validated. **INFERRED**.

**53. Game animation: still wanted? Changes?**
The Owner asked for it before; it is a product feature, not a measurement. Keep 30–60s, every turnover,
Skip, reduced-motion; do not let it block Colors v1. **INFERRED**.

**54. Homepage items: which revive for Colors v1?**
Only the ones that explain the value model (a "how values are set" panel) and the draft board; defer the
cosmetic items. **INFERRED**.

**55. Guide page: revive the flex table, wins-per-OVR, glossary?**
Yes — a short Guide with the wins-per-OVR table and the flex table is the transparency layer the Owner
asked for. **INFERRED**.

**56. Playoffs/clutch drama: still wanted?**
Product call. Keep the Super Bowl intro ≤30s and the clutch moments; they are not measurement priorities.
**INFERRED**.

**57. Champion banner: still wanted?**
Cosmetic; low priority. **INFERRED**.

**58. DIME: first-class slot or situational modifier?**
Modifier. 10% snaps is situational; a first-class slot adds a low-volume position with little leverage.
Evidence: the snap share. **INFERRED**.

**59. Flex REV 5 (cap 10) vs REV 4 (−10): unified rule?**
The Q19 formula: `min(cap, max(floor, valueGap × k + friction))`; floor 10, cap 25–30; QB→FS at −10 as a
special case. **INFERRED**.

**60. Does the salary default change the value of the raw-curve witness?**
It makes it **more** important: the witness is the only independent check on the fit; with salary as the
default, the witness tells you whether the engine's mechanics still carry the old secondary/kicker tilt.
**VERIFIED** for the fit; **INFERRED** for the importance.

---

## What this changes for the Owner

- The salary table is a **good prior**, not a proof. Keep it as the display default; stop treating the ±50
  match as validation.
- The old engine's secondary and kicker premium is **real and measurable**; the new fit removed it by
  construction. Whether the premium was bias or football truth is exactly what the data anchor must decide.
- The next move is not another table; it is **held-out football data** and a pre-registered test.
