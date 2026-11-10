# MUSE — More skills for the derivation formula (blocking, receiving, coverage, etc.)

## Bottom line

The skill-profile derivation (P-322) needs more granular skills than Inkling's 9 to capture the distinctions the Owner's table actually makes. I outline **15 skills** below — 6 more than Inkling's 9 — with the three most important splits being **pass-block vs run-block**, **man vs zone coverage**, and **catching vs route running**. Those three splits are what let the formula distinguish the pairs the Owner's table prices differently (a TE is a decent run blocker but a poor pass blocker; a CB is good at man but a FS is good at zone; a TE catches well but runs poor routes). The rest (throwing, tackling, range, specialists) complete the picture. This is an outline, not a scored matrix — scoring all 19 roles on 15 skills (285 scores) is a council/Owner calibration task, not a one-seat job.

## Why more skills (the problem with 9)

Inkling's 9 skills are BLK, CTH, COV, RNG, RSH, RUN, SNP, KCK, PNT. They get 97/105. But three single skills each hide a distinction the Owner's table prices:

- **BLK hides pass-block vs run-block.** A TE is a decent run blocker but a poor pass blocker. The Owner's table prices TE>OT at 6 and TE>OG at 6, but OT>TE and OG>TE differently — and the reason is that pass protection is the scarce skill. A single BLK cannot say "good at run blocking, bad at pass blocking." Splitting it lets the formula charge a TE more to play OT (where pass blocking matters) than to play a run-heavy spot.
- **COV hides man vs zone.** A CB is good at man coverage; a FS is good at zone. The Owner's table prices CB>FS at 0 but FS>CB at 6, and SS>FS at 2 but FS>SS at 2 — the asymmetry is about which coverage skill the destination needs. A single COV cannot say "good at man, weak at zone." Splitting it lets the formula charge a FS more to play CB (man) than a CB to play FS (zone).
- **CTH hides catching vs route running.** A TE catches well (short, contested) but runs poor routes (no separation, no deep speed). A WR does both. The Owner's table prices TE>WR at 12 but WR>TE at 6 — the gap is largely route running, not hands. A single CTH cannot say "good hands, poor routes." Splitting it lets the formula charge a TE more to play WR than a WR to play TE.

Without these splits, the formula has to fudge the difference with a single number, which is why Inkling's model has residuals and why a weight-only formula fails entirely.

## The 15 skills (outline)

### Offense — blocking and the ball

1. **PBLK — Pass blocking.** Holding the pocket against a rush. OT, OG, C need it most; TE and RB need it in pass protection. This is the scarce, expensive blocking skill — a TE who cannot pass-block cannot play OT, and the formula should charge for that gap.
2. **RBLK — Run blocking.** Drive-blocking, sealing, pulling. OT, OG, C, TE, FB all need it, but it is more widely shared than pass blocking — a TE can run-block adequately, so the gap to OT is smaller here than in PBLK.
3. **CTH — Catching (hands).** Securing the ball when it arrives. WR, TE, RB need it; DBs need it for interceptions (same hands, different context). A player with good hands can catch anywhere; the gap is in what happens before and after the catch.
4. **RTE — Route running.** Separation, timing, reading coverage, running the full tree. WR needs it most; TE runs a limited tree; RB runs routes out of the backfield. This is the skill that separates a WR from a TE — the hands are close, the routes are not.
5. **RUN — Ball carrying.** Running with the ball in space, breaking tackles, vision. RB needs it most; WR and QB use it on reverses and scrambles; FB uses it in short yardage.
6. **THR — Throwing.** Arm strength, accuracy, decision-making under pressure. QB only, at a high level. This matters almost entirely for flexes *into* QB (any non-QB flexing to QB should be prohibitively expensive) and for trick-play value (a WR who can throw is a gadget, not a QB). It does not matter for a QB flexing *out* (a QB playing FS is not throwing), so the formula should only count THR when the destination is QB.
7. **SNP — Snapping.** The center exchange — accuracy, speed, and doing it while also blocking. C only. This is the most role-specific skill in the game, and it explains the OL asymmetry: C>OT is 12 (a center leaving loses the snapping value) but OG>C is 2 (a guard learning to snap is a small gap). Any formula without SNP cannot reproduce the OL prices.

### Defense — coverage, rush, and tackling

8. **MCOV — Man coverage.** Sticking to a receiver step for step, mirroring cuts, playing the ball in the air. CB needs it most; SS and NICKEL need it; FS needs it least among DBs; LBs need it in limited doses (covering a TE or RB).
9. **ZCOV — Zone coverage.** Reading the quarterback, dropping to a spot, breaking on the ball, communicating switches. FS needs it most; SS, CB, NICKEL, DIME, and LBs all use it. This is the skill that separates a FS (zone) from a CB (man) — the formula needs both to price CB↔FS correctly.
10. **RSH — Pass rush.** Beating a blocker to the quarterback — speed, power, bend, counters. EDGE and DT need it most; LBs need it when blitzing; DBs rarely rush.
11. **RDEF — Run defense / gap control.** Holding the point, shedding blocks, filling the assigned gap, setting the edge. DT, EDGE, and LB need it; DBs need it in run support but it is not their primary job.
12. **TKL — Tackling.** Bringing a ball carrier down in space, angle-taking, wrapping up. LB and SS need it most; CB needs it in the open field; DL need it in a pile. This is distinct from RDEF (gap control) — a player can fill the right gap but miss the tackle, or make the tackle without ever being in the right gap. The formula needs both because a WR flexing to CB is bad at both, but a LB flexing to CB is good at tackling and weak at coverage.
13. **RNG — Range / speed.** How much ground a player can cover — closing speed, recovery, sideline to sideline. FS and CB need it most; LB needs it; DL need it least. Inkling already has this; keep it. It is what separates a FS (range) from a SS (box) and a CB (recovery) from a LB (limited range).

### Specialists

14. **KCK — Kicking (placekicking).** Field goals and extra points. K only.
15. **PNT — Punting.** Hang time, direction, coverage. P only. K and P are distinct skills — a kicker cannot punt well and a punter cannot kick field goals well, which is why K>P and P>K are both 2 (not 0) in the Owner's table. Keep them separate.

## How the formula would use them

The shape follows Inkling's approach, with more skills. Each role gets a score (0–10) on each of the 15 skills. For a flex src→dst, the formula computes the gap on each skill the destination needs — gap = max(0, dst_skill − src_skill) — then combines the gaps into a raw score (weighted sum, or the largest gap, or a combination), and maps that score to a tier (0/2/6/12) via thresholds. The three splits matter because they change which gaps are large:

- A TE flexing to OT: the PBLK gap is large (TE is weak at pass blocking), the RBLK gap is small. With a single BLK, the formula averages them and under-charges. With the split, the PBLK gap dominates and the price is right.
- A CB flexing to FS: the ZCOV gap is moderate (CB can play zone), the MCOV gap is irrelevant (FS does not need man). With a single COV, the formula cannot tell which coverage the destination needs. With the split, it charges only the ZCOV gap.
- A TE flexing to WR: the RTE gap is large (TE cannot run routes), the CTH gap is small. With a single CTH, the formula under-charges. With the split, the RTE gap dominates.

The THR rule (only count it when the destination is QB) and the SNP asymmetry (C leaving is expensive, others entering C is cheap) are handled by the gap definition — the gap is directional (dst minus src), so a skill the source has but the destination does not need contributes nothing, and a skill the destination needs but the source lacks contributes the full gap.

## What this is not

- **Not a scored matrix.** Scoring 19 roles on 15 skills is 285 scores. That is a calibration task for the council and the Owner (or for the Architect, who knows the engine), not a one-seat outline. I have not assigned scores here — that would be guessing, and a guessed matrix is worse than an explicit outline.
- **Not a replacement for Inkling's design.** Inkling's 9-skill design gets 97/105 and is verified. This outline is a proposal to extend it (split BLK, COV, CTH; add THR and TKL), not to discard it. The next step is for a council seat (or the Architect) to score the 15 skills and re-run the fit, to see whether it beats 97/105 and whether it fixes the 8 residuals.
- **Not a weight formula.** Destination weight is not one of the 15 skills. Weight is the objective (how much the slot matters), not an ability. The skills price ability distance; the objective prices the destination. That separation is the point — Inkling's P-333 discussion makes the same argument, and my derivation addendum confirms weight does not improve the fit.

## Labels

INFERRED: that splitting BLK/COV/CTH improves the fit (reasoning from the Owner's table patterns and the residual structure, not from a fitted model — the scores have not been assigned or run). REPORTED: Inkling's 9 skills and 97/105 fit (P-328 verified); the Owner's table prices used as examples (TE>OT 6, CB>FS 0, FS>CB 6, TE>WR 12, WR>TE 6, C>OT 12, OG>C 2, K>P 2, P>K 2 — all from the 99-rule table).
