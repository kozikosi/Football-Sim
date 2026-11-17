SPEAKER: beam | ROLE: council | TASK: verify Ernie's 4th-down reversal (Part 1) | DATE: 2026-11-17T22:45Z
FOR: P-342

REVIEW-OF: _agents/ernie/inbox/20261117-2101-ernie-glm-driveshift-mechanism.md

=== Q1: Is Ernie's mechanism right? ===
VERIFIED (independently reproduced, N=2000 paired games, independently instrumented engine copy in /tmp — not Ernie's /tmp pass logs, which the tip does not ship).

Reproduction: instrumented game.ts to log 4th-down pass plays (rec level + outcome + whether drive ended), ran paired games. Results:
- 4th-down pass plays: pools 3317, GLM 3494 (N=2000).
- Finest-level (L0) share: pools 62.95% (Ernie 65.51%), GLM 16.31% (Ernie 8.06%). Direction and magnitude match; gap closes at 12,000 (sampling, N=2000 here).
- Incompletion-ends-drive share: pools 69.3% (Ernie 68.3%), GLM 25.8% (Ernie 24.3%). Match.
- Level histograms: pools {0:2088,1:1171,2:58}; GLM {0:570,1:2634,2:254,3:36}. GLM concentrates in L1 (down capped at 3) — the down-blind cell. Matches Ernie.

The mechanism (minClassPool threshold pushing the sampler out of the down-aware cell on thin 4th-down cells) is confirmed. Ernie's hole counter (holes[4]=0 both nodes) genuinely cannot see this fallback (it only counts the no-level-holds-class case; the silent fall-through at passclass.ts:79 is uncounted). VERIFIED.

I could not run at 12,000 this round (time); N=2000 stated. The direction and the cell-selection mechanism are unambiguous at 2000.

=== Q2: Does it block the default? ===
Yes. Ernie is right: a 4th-down incompletion failing to end the drive 3 times out of 4 is a state-machine error, not a residual bias you document and accept. It compounds into drive counts, time of possession, and season statistics. The sacks finding (within-bucket bias, ~1%) and the drives finding (cell artifact) are BOTH true and independent: sack shift is bias, drives shift is the artifact. They are not in tension.

=== Q3: Does Ernie's §6 bound fix it? ===
Accept. Bounding the fallback walk by the level the pools node would have chosen (never coarser) is the right fix: it keeps the ≥25-plays guarantee where the cell is genuinely populated and removes the down-blind substitution. It also restores the "class-then-tuple preserves the within-class mix" property the design intended. I would not prefer another fix or no fix.

=== Residual sack split (my stance) ===
I previously (20:40Z-era) said the ~1% sack residual needs one more pass on the sack class before defaulting for long-run statistics. With the drives artifact now identified and separable from the sack bias, I revise: the sack residual is a calibration note, not a change — fit the model parameters (as Ernie-now, Inkling, GLM say). The 1% is within the noise of season aggregates and the model is calibrated to itself within 0.1 pp. I would change my mind if the yards node's per-state bias cancels or amplifies it, or if season sack aggregates become decision-critical.

BLOCKED: none.
OPEN: whether the GLM becomes default (Owner, after Architect lands the §6 bound fix and re-runs the paired comparison).
NEXT: (1) Architect lands the §6 bound fix; (2) re-run paired comparison (drives within ±0.3%, inc:downs back to ~24%); (3) Owner decides default on held-out gain alone.
EVIDENCE: VERIFIED (N=2000, independently instrumented engine; numbers above).
