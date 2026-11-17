SPEAKER: glyph | ROLE: council | TASK: Part 6 (Innovation) — 4th-down termination acceptance battery motivated by reproduced GLM reversal | DATE: 2026-11-17T22:40Z
FOR: P-342

# Innovation: 4th-down termination / possession-end battery (proposal)

## Why (VERIFIED motivation)

Independent 12k paired reproduction on `65673a00` (`inbox/20261117-2232-glyph-glm-4thdown-reversal.md`): 4th-down incompletions end in `drive_end.result='downs'` **68.28%** (pools) vs **24.28%** (GLM), with **+3,566** incomplete 4th-down pass plays continuing to a later snap in the same drive over 12k games (GLM 5,680/7,595 vs pools 2,114/6,779). Event traces show post-incomplete next snaps with implausible down progression (e.g. down 4→4, 4→3/2) and drives later ending td/fg/punt — indicating failed-4th-down offensive outcomes are not reliably terminating possession under empirical transition handling (and GLM tuple selection amplifies this). This is a possession-integrity issue larger in effect than the earlier ~1% drive-rate shift discussion.

## Proposed battery (test-only, Architect-owned build integration)

1. **Failed 4th-down must end possession (offense) unless a legal conversion/score/turnover-by-rule occurs.** For every offensive snap on down 4 with outcome that does not achieve first down/TD (e.g. incomplete pass with no first down; run/pass short of line-to-gain; sack leaving ytg unmet) and no defensive TD, no offensive recovery/retained-possession event as defined by rules: the drive must end with `downs` (or the rules-correct turnover-on-downs result) and the next drive/possession must belong to opponent at correct spot. Flag any case where a later snap occurs in the same drive after such a failed 4th-down play.
2. **Paired regression guard (pools vs node).** On N≥12k paired keys, report: 4th-down pass count, incomplete count, `% inc -> downs`, `% inc -> continued(same-drive snap)`, `% inc -> other`, broken down enough to localize (at least by call outcome class; ideally by whether empirical `ndown/delta` were finite). Any candidate node (pass-class, yards, etc.) must not worsen `% inc -> downs` by more than a pre-agreed epsilon vs pools **or** must include an explicit, validated fix with before/after receipts.
3. **Tuple/transition sanity for 4th-down failures.** Assert/measure: for 4th-down offensive failures in empirical mode, sampled transition does not produce a same-offense continuation inconsistent with turnover-on-downs (i.e. no `down<=4` continuation that implies retained possession without conversion) except explicitly modeled cases. This targets the proximate path seen in traces (ndown/delta-driven continuation) rather than only class-pool depth.
4. **Fault plant.** Mutate to allow/force a 4th-down incomplete to continue (or accept NaN-as-continue path) and require the battery to fail (red) showing the continued-same-drive case.

## Constraints / notes (INFERRED)

- **SAFE ALONE?** Yes as a test/report harness; does not change engine behavior by itself. Any fix it motivates is Architect-owned and must preserve existing semantics where correct.
- **Must not** refit protected constants or pool packs; must state whether pools baseline is treated as reference or also audited (pools showed 31.18% “continued” in my 12k trace — worth classifying, not assumed bug-free).
- **HOW TO CHECK:** implement as `tools/4thdown-termination-bar.ts` or a `test/nfl/*` assertion over paired `runGame` logs on default packs/keys; print counts/rates and fail on violations/threshold breach; include one planted-fault demonstration in the landing note.

**OPEN:** define the exact legal-exception set (muff/recovery rules, penalties - if modeled, fake punts modeled as punt call, etc.) against current sim semantics; set epsilon/threshold with Owner/Architect. **NEXT:** Architect confirms sim’s intended 4th-down-failure semantics for empirical transitions, then land this battery before any GLM default consideration.
