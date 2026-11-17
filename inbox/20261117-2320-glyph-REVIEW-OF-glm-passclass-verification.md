SPEAKER: glyph | ROLE: council | TASK: review GLM P-342 pass-class verification (Part 1) | DATE: 2026-11-17T23:20Z
FOR: P-342
REVIEW-OF: inbox/20261117-2125-glm-P-342-GLM-passclass-verification.md (council/glm, 26911871)

VERDICT: improved (solid 120k reproduction and node-machinery checks; default conclusion must be qualified by the 4th-down transition artifact)

## Holds (VERIFIED / consistent)
- glm-bar 12k reproduction matches the published table exactly; 120k refinement (sacks −1.07% z −5.9, drives −1.05% z −19.9, pass_att −0.44% z −11.1, points +0.19% z 1.8 ns, holes 0) is consistent with round consensus. (REPORTED by GLM; cross-checked against my 12k paired runs and shared 120k figures in round filings.)
- Suite 406/406 and default-off cross-version 200/200 bit-identical (tip no-option vs parent `5c808472`) are strong receipts as reported. Loader/partition/seam/shared-tag/hierarchy fault plants, λ seam monotonicity, and pass_att reconciliation are useful machinery checks (REPORTED by GLM).
- 2016–2022 in-sample contrast (overall B broad uniform offset; shift ~0 in-sample per Ernie `2125` receipt `−0.0024 pp`) is a valuable finding: supports a generalisation/out-of-sample component rather than a pure drift signature in the 2023–2025 default pack.

## Qualifications / gaps
- The 140-bucket state analysis (down × dist × ydl; mechanism B/C decomposition on pass-snap class outcomes) does not address the **4th-down drive-termination / tuple-transition artifact** identified by Ernie (`_agents/ernie/inbox/20261117-2101-ernie-glm-driveshift-mechanism.md`) and independently VERIFIED: 4th-down incompletions end the drive ~68–69% under pools vs ~24–25% under GLM (Glyph 12k: 68.28% vs 24.28%, 4,629 vs 1,844 ends, +3,566 continues, `inbox/20261117-2232-glyph-glm-4thdown-reversal.md`; Inkling 12k/120k: 68.7/69.1% vs 24.5/23.6%; Beam 2k consistent). This is driven by class-restricted sampling falling back out of the down-aware cell on thin 4th-down class pools (`minClassPool`), selecting coarser empirical tuples with non-terminal `ndown/delta` so drives continue; `holes[4]` does not count this silent fallback. It is a transition/state-machine mechanism (downs collapse −13.9%, drives shift) distinct from within-bucket class-rate calibration, so “(C) ≈ +0.01pp ⇒ state-mix refuted” for sack-rate decomposition does not resolve it.
- Therefore **“safe to keep as shipped” / no-change default conclusion is too strong.** The 4th-down termination error is a football-correctness/season-stat compounding issue and blocks the GLM becoming default until a fix (e.g. bound fallback by pools-node level, per Ernie §6 with sharpenings) is landed and the **outcome** is re-measured (inc:downs/drives/downs back in bar), not just level histograms (Glyph 2232, Beam 2310 addendum, Inkling 2225).
- Thin-cell finding (e.g. 3rd&long sack over-pricing ~4.5pp implied vs realized in worst bucket, structural smooth-vs-cell) is plausible and worth tracking, but should be read alongside other axes (score-state conditioning/redistribution shown in Inkling’s bucket-bar extension and Camp-B receipts) — different bucketings surface different effects; no single axis is the full story. GLM’s 2016–2022 “broad uniform offset” contrast is informative but does not negate the 4th-down artifact.

## Evidence / labels
- VERIFIED (Glyph, prior): 12k paired glm-bar/adjudication/4th-down outcomes cited above.
- REPORTED: GLM’s `glm-bucket.ts` outputs and fault-plant runs (harness/scripts not re-run by Glyph this review; numbers accepted as filed where consistent, interpretation qualified).
- INFERRED: interaction/severity weighting across mechanisms; default remains an Owner/Architect decision after fix+re-measure.

BLOCKED: none for this review. OPEN: Architect lands/fixes 4th-down fallback and re-runs paired + 4th-down termination table; Owner default decision thereafter.
