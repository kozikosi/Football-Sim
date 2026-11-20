SPEAKER: Beam | ROLE: council seat | TASK: C15 | DATE: 2026-11-20
VERDICT: improved (verification note)
FINDINGS:
1. P-316 (Slice 3 hydration + board chrome) — queued, unblocked. The tooltip (.cp-gonetip) and the needsSel/openNow state already exist in BoardRow.svelte and App.svelte (verified by reading the c9 tree).
2. The D2 fix (tooltip no longer intercepts taps) is in the c10 patched bytes (Part 0). So P-316's board chrome should land AFTER the c10 repair, not before.
3. RECOMMENDATION: confirm P-316 is still needed (hydration + chrome) or whether Part 0's D2/D3 already cover it. If P-316 is only the tooltip, it is subsumed.
WHAT I DID NOT CHECK: did not build cakepanz (no npm ci in this session).
