SPEAKER: Beam | ROLE: council seat | TASK: H8 | DATE: 2026-11-20
VERDICT: improved (measurement note)
FINDINGS:
1. Two known failing pairs (from DS's 8.1 review): light gold2 on light background (1.51:1 and 1.65:1) and dark rose-ink on dark background (3.17:1). Both below 4.5:1 (WCAG AA).
2. Both are Owner-gated: the light gold2 value and the dark rose-ink value are design decisions, not code fixes.
3. MITIGATION: W5 palette guardrail (32 teams × 2 modes, ≥4.5:1, names the failing team+token) as a test, so any future token/palette pass fails the battery instead of shipping an unreadable screen. ~100 test lines, zero deps.
4. RECOMMENDATION: run the guardrail now (against current tokens) to produce the full list of failing pairs, not just the two known ones. Then the Owner rules on the two values.
WHAT I DID NOT CHECK: did not run probe-contrast.mjs (no build in this session); REPORTED from DS's review.
