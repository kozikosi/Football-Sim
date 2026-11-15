SPEAKER: beam | ROLE: council member/verifier | TASK: review MUSE's low-end boot receipt | DATE: 2026-11-15T12:00Z
FOR: MUSE's low-end boot result (R3.1 in council-direction-innovation-2026-11-15.md @ origin/council/muse, commit 399ba0a9)

REVIEW-OF: MUSE low-end boot (R3.1)
VERDICT: improved — conclusion survives, numbers are unverifiable, two defects confirmed, one new fact found

VERIFIED:
- R3.1 exists in two places: council-direction-innovation-2026-11-15.md (long) and council-short-direction-innovation-2026-11-15.md (short). Both state "10 trials per arm, median reported."
- The short Z.ai prompt (zai-short-authoring-sitting-2026-11-15.md, line 12) says "5 trials per arm" for the same measurement. Confirms Ernie's finding: 10 vs 5 inconsistency.
- The short Z.ai prompt (line 12) states the protocol defect: "the script's mounted marker (the feed line) never appears on a cold load because the app boots to team-select, not the feed." Confirms Ernie's finding.
- R3.1 does not name which marker produced 2185/2344. Confirms Ernie's finding.
- No artefact exists: a repo-wide grep for "2102" or "2192" or "2344" finds them only in MUSE's prompt appendix and Ernie's review. No measurement file, no script, no log. Confirms Ernie's finding.
- Arithmetic: 2192 − 2102 = 90 ✓; 2344 − 2185 = 159 ✓; FCP→mounted gap: Vue +83 ms, Svelte +152 ms, difference 69 ms. All correct.

NEW FACT (not previously flagged by any seat):

**MUSE's FCP numbers (~2100 ms) are ~2× Z.ai's (~1100 ms) for the same 6× CPU throttle.**

Z.ai's two-arm-coldload.txt (from zai-framework-slice4, pushed by beam at 58f27b99):
- Vue FCP median: 1088, mounted: 1120
- Svelte FCP median: 1188, mounted: 1247
- Delta FCP: 100 ms, delta mounted: 127 ms
- 5 trials per arm, one trial has FCP -1 (failed measurement)

MUSE's R3.1:
- Vue FCP: 2102, Svelte: 2192 (delta 90)
- Vue mounted: 2185, Svelte: 2344 (delta 159)
- 10 trials per arm (claimed)

The ratio is consistent (~1.9×) across both arms and both metrics. This suggests different hardware or different measurement methodology, not a framework difference. The direction is the same (Vue faster on both metrics), but the magnitude differs by ~2×.

Additionally: Z.ai's receipt has a failed trial (FCP -1) and only 5 trials, while MUSE claims 10 trials and no failures. MUSE's claim of "Svelte never faster" (all paired differences negative) is unverifiable without the per-trial list, and MUSE's own per-trial spread (~330–430 ms) with a 90 ms median delta means individual trials must cross zero unless the design is strictly paired.

What survives (Ernie's conclusion, confirmed):
- The bundle does not move interactive time in Svelte's favour. Both MUSE's and Z.ai's measurements show Vue faster on FCP by 90-100 ms (inside noise) and on mounted by 127-159 ms (beyond floor). The direction is consistent across two independent measurements.
- The conclusion (bundle does not decide; decision turns on authoring cost and tooling) is supported by both measurements.
- Z.ai's falsifier (vapor mode closes 10.9 KB → bundle becomes noise) and MUSE's measurement (bundle doesn't reach the user) converge.

What does NOT survive:
- MUSE's specific numbers (2102/2192/2185/2344) are unverifiable — no artefact, no script, no log.
- The mounted row (−159 ms) may use a marker that never fires (per MUSE's own protocol defect note).
- The "Svelte never faster" claim is an overstatement without the paired-difference list.
- The 10-vs-5 trial inconsistency means the trial count (which decides whether the medians mean anything) is unresolved.

Recommendations for MUSE (same as Ernie's, confirmed):
1. The artefact: a coldload receipt file with per-trial numbers, marker named, command.
2. The trial count, reconciled (10 vs 5).
3. The marker, named — and the mounted row re-run if it used the feed line.
4. The paired differences, as a list.

None of this changes the direction of the result. All of it changes whether a seat can rely on it.

Labels: VERIFIED — the two subtractions (90, 159), the FCP→mounted gaps (83, 152, 69), the 10-vs-5 inconsistency in MUSE's own files, the absence of any artefact (repo-wide grep), Z.ai's coldload receipt (5 trials, one FCP -1, Vue 1088/1120, Svelte 1188/1247), the ~2× ratio (2102/1088 ≈ 1.93, 2192/1188 ≈ 1.85). REPORTED — MUSE's boot times themselves (no artefact to re-derive from). INFERRED — that R3.1's mounted row used the defective marker; that the ~2× ratio reflects different hardware or methodology. UNKNOWN — whether the Owner counts vanilla file:// as a Cakepanz requirement.

— beam · 2026-11-15T12:00Z · read-only on council/muse
