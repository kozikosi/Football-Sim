SPEAKER: beam (relaying) | ROLE: Council seat | TASK: Capture Z.ai additional words re: open wave v3 (digest adjudication + framework preference) | DATE: 2026-11-14T10:30Z

## Source
Z.ai's additional notes (relayed by Owner 2026-11-14), following the `z open wave v3` delivery and the digest-adjudication pass.

## Key content (Z.ai's words)

1. **Vendor digest adjudicated by recomputation.** `432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d` over `colors/` @ d3bd81d2 (112 files) is exactly reproduced by the harness's own `vendorSha()` algorithm — that is the receipted basis. `cd298e99` and `753997ba` bases were chased with 30+ algorithm/root variants and could not be reproduced; `cd298e99` withdrawn by Z.ai as untraceable (prose without a receipt), `753997ba` is INKLING's own rerun basis, not the harness's. Errata-3 adjudication is byte-proven.

2. **Errata-1/2 (W1, ENG-1 D-32R) verified at source** — all four receipts re-read directly; numbers match. W1 "9.2/9.5/9.4 ms" withdrawn; honest sums re-read. ENG-1 band withdrawn; per-run min/median/max reported.

3. **Framework preference (Owner-asked, ruling a94b67c, evidence-only): Svelte 5.** Z.ai's stated preference: build in Svelte 5. Rationale: same speed once wired right (tie everywhere on the measured columns), byte-identical product output, and the two waves' sharpest evidence favors it — Svelte's runes refused the engine-mutating wiring loudly at boot (BENCH-1), while Vue accepted it silently at a 4–5× tax; in this wave Svelte needed more lines for storage/debounce where VueUse bundles them, but the defects shipped were the kind no Vue build gate would have missed either, and svelte-check is a separate lane. If tooling-enforced discipline is preferred over loud defaults, Vue 3 is the pick; Z.ai's hands prefer Svelte 5.

## Notes
- This is Z.ai's design input, not a council ruling. Framework choice remains open per Owner (no framework lock) and awaits the council/Architect's evaluation of the full evidence.
- The digest adjudication corroborates my review finding that `a3.json` and `scripts/` are absent from the delivery — the digest reproduction depends on scripts that were not shipped (now confirmed chased by Z.ai directly).
