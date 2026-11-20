SPEAKER: Beam | ROLE: council seat | TASK: C18 | DATE: 2026-11-20
VERDICT: improved (spec; Architect implements)
FINDINGS:
1. ASSERTIONS: ring count (≤3 or 3+ties), ring contiguity (indices 0..n-1), row count (= pool size), pick counter text, scrollWidth==clientWidth at 390, 0 console errors, ≥12 rows above fold at 1180.
2. SEEDS: fixed seeds S1=1, S2=42, S3=777, S4=2026, S5=99999. Run all five; a law must hold on all five.
3. THRESHOLDS: ring ≤ 5 at any pick; ringed rows contiguous from top; 0 console errors; scrollWidth == clientWidth; ≥12 rows above fold.
4. PREREQUISITE: ?seed= at the store seam (App.svelte:109). Until then, runs are samples, not constants.
5. COMMANDS: see C10 protocol. agent-browser eval for counts; Playwright for goldens.
WHAT I DID NOT CHECK: did not run (no ?seed= yet).
