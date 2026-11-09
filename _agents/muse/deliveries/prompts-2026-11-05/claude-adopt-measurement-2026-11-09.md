# Claude — adopt the new slotWins20 measurement (P-321 results in)

Read `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. One job: decide and implement the new measurement. No testing from you — the testing is done (council + MUSE seat, below).

## Results (verified, not a request to re-run)

- Four council seats (VL, VLOC, Super, UK) ran the spread study independently. The MUSE seat ran it independently on the real engine math (PreColors `40233d6be00e987c`). All agree.
- **The spread does not matter.** Slope is flat across ±3/±5/±7/±10 for 22 of 26 slots (max move ≤0.0004). Only four depth slots move (WR2, WR3, TE2, RB2, ≤0.0072). **Adopt ±5** (stable, avoids ±3 kink-noise where TE2 reads 0, avoids ±10 washing to the old secant).
- **The material change is the baseline, not the spread.** Per-position pool-grounded centers, everything else at position-specific averages (not a flat 80). Weights move: WR2 +40, WR3 +25, RB2 −25, TE2 −25. D does not move materially (four proposed rules stable, deltas ≤0.14).
- **Pool discrepancy resolved (MUSE):** CSV pool (n=1,941, mean 73.84) and embedded PLAYERS (n=1,200, mean 78.27) give identical NEW@5 slopes (max diff 0.0000). Use the embedded pool — it is what the engine reads.

## Job

Replace `slotWinsPerOvr()`'s 70→90 secant with the per-position local slope at ±5 (center = position's pool average from the embedded PLAYERS; everything else at position-specific averages; one shared function, parameterized by position). Re-pin protected-constant hashes in MERGE-MANIFEST.md. Report the new measured weights and confirm the test suite passes.

P-318 (WILL/C bump in the engine math) is evaluated against this NEW measurement once it lands.

## Innovate

Within this job: if the measurement opens a better way to express value (a curve fit, a VORP variant for the board), note it as an `IDEA:`. Do not build it here.
