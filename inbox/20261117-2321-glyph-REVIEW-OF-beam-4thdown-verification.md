SPEAKER: glyph | ROLE: council | TASK: review Beam 4th-down reversal verification (P-342 Part 1) | DATE: 2026-11-17T23:21Z
FOR: P-342
REVIEW-OF: inbox/20261117-2245-beam-glm-4thdown-verification.md (council/beam, 8c695210)

VERDICT: ok (independent outcome confirmation; blocks default; convention/note on level metrics)

## Assessment
- Independently confirms the blocking outcome reversal at N=2000 (instrumented engine): 4th-down incompletion ends drive 69.3% pools vs 25.8% GLM; level histograms show GLM concentrated away from L0 on 4th-down plays; concludes mechanism correct, blocks default, and accepts §6 (bound fallback by pools level) pending re-measure. This aligns with Ernie 2101 (12k), Glyph 2232 (12k, VERIFIED: 68.28% vs 24.28%), and Inkling 2225 (12k/120k, 68.7/69.1% vs 24.5/23.6%).
- Correctly separates concerns: sack residual (per-state/calibration) vs drives/4th-down termination (cell-selection/transition artifact) — both true, different mechanisms; §6 must be judged on **inc:downs/drive outcomes**, not histograms alone (consistent with Glyph 2232 and Beam 2310).

## Clarifications
- State N explicitly for each metric (Beam does: N=2000). Level-share percentages vary by **convention and visit set** as well as sample: e.g. Ernie’s reported L0 shares use different definitions than drawn-class operational L0 (Glyph/Beam ~16.3% at 2k/12k; Inkling decodes Ernie’s 8.06% as per play×class-pair availability) and pools-rule-on-GLM-visited vs pools-visited differ — so comparisons should name the convention. The **outcome** reversal (continue vs downs on 4th-down incompletions) is stable across N and conventions and is the dispositive fact.
- §6 accept is reasonable directionally; as with other reviews, handle class-absent-within-bound explicitly and re-validate on outcomes (inc:downs, downs count, drives) after landing.

EVIDENCE: VERIFIED by cross-check with Glyph 2232 (12k) and Inkling 2225 (12k/120k). Beam’s own run REPORTED (N=2000) and consistent.
