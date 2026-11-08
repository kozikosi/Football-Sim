SPEAKER: mimo | ROLE: council seat | TASK: fit-bias audit (Q2 parameter diff) + engine-truth methodology advice | DATE: 2026-11-08
FOR: P-013 (weights recalibration) · companion to `20261108-0326-mimo-P-284-32-slot-weights-report.md`

# Fit-bias audit and how to make the engine objectively true

Two tools built this round (read-only; no product file, no protected constant touched):

```
$ node --experimental-strip-types _agents/mimo/tools/fit-delta.mts /tmp/mimo-p284/colors
$ node --experimental-strip-types _agents/mimo/tools/spec-diff.mts /tmp/mimo-p284/colors
```

Both VERIFIED (exit 0, full outputs below). They answer the Owner's 7 Nov question ("how do we determine there is no bias?") and complete the parameter side of Z.ai's Q2 (VERACITY-SYNTHESIS: "the parameter-by-parameter diff is now producible").

## 1 · What was fitted, and how much each fit bent the engine (fit-delta)

Three eras of coefficients, one row per slot, measured with the same current `derivedWeights()` code (the golden oracle `withLegacyCoefficients()` swaps the pre-6-Nov coefficients in and restores them — restoration asserted by the script):

| | Spearman vs OLD personal table | Spearman vs Owner salary table | secondary share* | mean \|dev\| vs Owner table |
|---|---|---|---|---|
| OLD personal `DEFAULT_WEIGHTS` (×3.125 → 1000 scale) | — | — | **18.7%** (2703/14428) | — |
| legacy fit (coefficients frozen before 6 Nov) | **0.817** | 0.876 | **18.7%** (1613/8640) | 66.4 pts |
| current fit (6 Nov salary refit) | 0.737 | **0.992** | **16.8%** (1451/8629) | **7.1 pts** |
| Owner salary table (installed `slots.ts`) | — | — | **16.3%** (1400/8575) | — |

\* CB1+CB2+CB3+DIME+SS+FS as % of table total.

- The 6 Nov refit bent the measured curve by **mean 66.0 weight points**; largest moves: CB3 −175.6, C −173.1, DE1 +151.1, K −150.1, DT1 +109.6, WR1 +108.8.
- **The Owner's suspicion is confirmed for the old era, VERIFIED:** the pre-6-Nov engine's measured values rank-agree 0.817 with his old personal-preference table and carry *exactly* its secondary share (18.7%). The engine did echo the personal table, secondary tilt included.
- **The current era has the opposite shape:** measured vs Owner table Spearman 0.992, mean |dev| 7.1, secondary share 16.8% ≈ his table's 16.3%. The secondary tilt was removed, not amplified.
- **The circularity, stated plainly (INFERRED, from the measurements above):** agreement with the table the engine was *fitted to* proves consistency, not truth. Both eras "validated" against their own target. Neither has been checked against reality.

## 2 · Parameter side of Q2 (spec-diff): 19 parameters moved

```
parameter diff: pre-6-Nov (legacy, frozen) → current (6 Nov salary refit)
changed parameters: 19
by layer: RATING_SPECS=7, DEF_SPECS=5, PERS_REC=4, RB_HEAVY=2, MC=1
layers untouched by the refit: (none)
```

Every `RATING_SPECS` group and every `DEF_SPECS` package changed — the refit touched the entire spec surface, not a few knobs. Direction (VERIFIED values):

- **Receiving/rushing scaled UP:** `rec.WR1` 0.99 → 25.682, `rec.WR2` 0.70 → 19.86, `rb.RB1` 1.95 → 43.113, `RB_HEAVY.RB1` 2 → 44.218.
- **Defense scaled DOWN ~4–8×:** `coverage.CB1` 1.39 → 0.175, `frontRun.DT1` 1.58 → 0.456, `passRush.DE1` 1.9 → 0.583, all four `DEF_SPECS` packages likewise.
- **OL redistributed:** `olPass.OT1` 1.53 → 0.812 but `olPass.C` 1 → 0.221; `olRun.TE1` 0.35 → 1.436 (up).
- **Special teams:** `MC.kick` 0.04859 → 0.01215 (exactly ×0.25).

**INFERRED (not yet tested):** these specs also feed `matchupModel()` for on-field play, so the refit changed gameplay behavior, not only valuation weights. The golden suite pins equivalence to the original engine *only in legacy mode*; how current-coefficient gameplay differs from shipped Pre-Colors gameplay on the field is **UNKNOWN** — candidate check for a Verifier (compare `simulateGame` unit outputs, current vs legacy coefficients, same rosters).

## 3 · Advice for the Owner: how to build a more objectively true engine

Your question: is salary the right anchor, and is the engine biased toward your old weights? Measured answers first, then the method.

**On bias:** it was real and is now quantified (§1). The old engine echoed your personal table at 0.817 rank agreement with an identical 18.7% secondary share. The current engine fits your salary table at 0.992 — but that is *by construction*. So today's residual risk is no longer "Claude's old preferences"; it is that **your table itself has never been tested against reality**, because the engine that "confirms" it was fitted to it.

**On salary as an anchor:** salary is a real market signal but a noisy one — contract timing, the rookie scale, franchise tags and dead money all distort it, and "15th-best player" is a defensible *convention* for an average starter, not a measurement. Keep salary as **one triangulation column, not the foundation**.

The method I recommend, concretely (this is Claude's 6-step protocol made executable):

1. **Raw-curve witness (exists — Z.ai/Beam):** every build exports the uncalibrated measured curve beside the calibrated one. The calibrated scale answers to you; the raw curve answers to reality. Never let one stand in for the other.
2. **Fit-to-one, validate-on-others:** pick at most ONE anchor for fitting (if it is salary, say so); validate against ≥2 anchors you did not fit to — production share (targets, snaps, EPA), replacement/snap depth, AV. Per-slot triangulation table with rank correlations, spread, bootstrap CI, disagreement flag (T3; Beam's `triangulation.mjs` scaffold exists, real-anchor columns are UNKNOWN until data lands).
3. **Pre-register before measuring:** hypothesis ledger (H-### written before the run), tolerance bands, and a practical-effect threshold — fail → report, never auto-adjust (Beam's governance artifacts; my H-proposals in §6).
4. **Held-out lint:** no fit script may read the years or anchors it is validated on. One season fits, the next validates.
5. **Sensitivity across anchors:** re-derive the weight vector under each anchor separately; slots whose rank moves ≥4 across anchors are judgment calls surfaced to you — never silently fitted. (Four-table sensitivity already done: personal / legacy / current / Owner — §1 and the P-284 report.)
6. **Independent verifier on the receipts:** any seat that authored nothing in the round runs `fit-delta.mts` + `spec-diff.mts` + the ±50 band check and posts the output — the numbers above are reproducible by any seat in one command.

What this does NOT do: remove you from the loop. The Owner table stays the displayed model (your standing ruling); the fix for bias is that every ruling is *informed and recorded*, with the raw curve beside it so your intuition and the data can be compared side by side. "Objectively true" here means: **predicts held-out real outcomes** — that is the one definition nobody can argue with, and it is currently UNKNOWN for defense, OL and play-level outcomes (Z.ai's Q3 / E5, unchanged by this round).

## 4 · Updated answers to the Architect's three questions (for his return)

**Q1 — what does `slotWinsPerOvr()` measure?** Z.ai's code-level answer stands (VERACITY-SYNTHESIS §2 Q1). One addition from this round: on the **Colors** track the calibration is *not* a per-slot multiplier like w79's (which pins deviation to 0 by construction) — it is a least-squares fit of 19 spec parameters, landing at mean |dev| 7.1 / 32-of-32 inside ±50 (Receipt 2 of the P-284 filing). So the Colors track's "measured ≈ table" is approximate-but-close, not tautological — close *because it was fitted there*.

**Q2 — how did the calibration modify the specs?** **Now producible, both halves:** parameter side = `spec-diff.mts` output (§2, 19 parameters, before/after values, layer counts); effect side = `fit-delta.mts` output (§1, per-slot bend, Spearman, secondary share, mean deviation). Format matches the layer-audit tables (parameter · layer · before · after · delta). The fit JSONs themselves remain on `architect/engine-and-seats` (`calibrate-weights.mjs`, `fitlm.js`, `design.json`) for whoever wants the fit residual side.

**Q3 — can the engine reproduce real distributions without weight calibration?** Unchanged: **UNKNOWN for defense/OL/play-level; partial for receiving volume** (Z.ai's anchor_demo). Nobody has run E5 this round — no seat had hash-pinned nflverse data at hand (UNKNOWN whether it exists in-repo). The raw-curve witness requirement stands and my audit adds why: even the *raw* curve of the current engine is a curve whose specs were fitted to a table, so the witness must be archived with its coefficient hash, not just its curve.

## 5 · Revised Claude-facing prompt (what to do first on return)

> **Claude — read in this order:** (1) `inbox/20261108-0326-mimo-P-284-32-slot-weights-report.md` (32-slot table, recommendation = Owner's table final, 5 receipts); (2) this filing (fit-bias audit = the Q2 parameter+effect diff you owe, done; §3 the Owner's methodology advice, which he asked for directly); (3) Beam's `_agents/beam/notes/PROMPT-FOR-CLAUDE-2026-11-07-beam-revision.md`; (4) Z.ai's `VERACITY-SYNTHESIS-2026-11-08.md` (+ addendum) on `gh-pages`. **Decisions waiting on you:** a) adopt `fit-delta.mts`/`spec-diff.mts` as the standing fit-audit gate (they are lane tools today; promote to `tools/` or keep as Verifier-run lane tools — your call); b) the P-013 re-pin: shipped `DEFAULT_WEIGHTS` flags 16/26 vs the new engine — your build, your manifest; c) whether current-coefficient gameplay (not just valuation) gets a golden check vs shipped Pre-Colors; d) T1/T3 need hash-pinned real data — name the source you want the Owner to approve. **Do not re-run the ±50 or salary×25 checks** — receipts in filing (1), reproducible in one command.

## 6 · T-item status (Beam's priorities: T1, T3, T4, T6, T12)

| item | status this round |
|---|---|
| T1 mechanics harness | **not started** — needs hash-pinned nflverse data (UNKNOWN in-repo) |
| T3 triangulation + raw witness | **advanced**: fit-delta adds the two *fit-era* anchor columns (personal/legacy) per slot; Beam's `raw-curve-witness.mjs` + `triangulation.mjs` exist (REPORTED by Beam); real-anchor columns UNKNOWN |
| T4 replacement auditor | not started by me — Beam scaffolded (DL5 VERIFIED, rest UNKNOWN) |
| T6 flex pricer | blocked on injectable RNG (T-20261022-claude-2) — INFERRED blocked |
| T12 uncertainty | **applied**: Wilson 95% CIs on all calibration numbers (P-284 Receipt 5); fits Beam's reporting law |

**H-proposals (pre-registration candidates, written now, before anyone runs them):**
- H-A: raw (uncalibrated) derived weights rank-correlate ≥ 0.9 with the Owner table on every build (fails → report, never auto-adjust).
- H-B: engine-vs-real secondary share gap ≤ 3 pp once a real snap-weighted anchor exists (tests the 16.3% vs 18.7% question directly).
- H-C: current-coefficient gameplay unit outputs stay within ±5% of shipped Pre-Colors at identical rosters (the UNKNOWN in §2).

## Labels

- All tool outputs and counts above: **VERIFIED** (run this session; commands at top).
- "Fit echoes the target table, agreement ≠ truth": **INFERRED** from VERIFIED numbers (§1).
- Gameplay-coupling concern (H-C): **INFERRED**, untested.
- Real-data anchors (T1/T3 columns, E5): **UNKNOWN** — no data run this round.
- Path note: test extraction lives at `/tmp/mimo-p284/colors` (sandbox, not delivered work); tools are in `_agents/mimo/tools/` on `council/mimo`.
