# Hypothesis ledger — P-013 modelWeights / weights recalibration (Super, council/super)

Format: H-### | prediction | control | success criteria | status | evidence | date
Written BEFORE the experiment. One file per hypothesis is also acceptable; this ledger is the index.

H-001 | The engine's slotWinsPerOvr() curve reproduces the old personal table (Pre-Colors DEFAULT_WEIGHTS scaled to QB=1000) because RATING_SPECS/MC were fit to it on 28 Oct — not an independent measurement. | Fit engine to design.json (QB=1000) via tools/mathlab/fitlm.js; compare fitted curve to old personal table vs salary table. | fitted curve within ±5% of old-personal-table-scaled, NOT within ±5% of salary-table-scaled, for >= 20 of 26 slots. | VERIFIED | tools/mathlab/results/triangulate-super-2026-11-07.json: raw≈fitted≈design (design.json = old personal scaled to QB 1000), all 33 slots AGREE at 10% spread. Salary table is a DIFFERENT target (arrived 6 Nov, after 28 Oct fit). | 2026-11-07

H-002 | Beam's M2 "measured vs salary" correlation compared two different targets (mechanics fit to old personal; display = salary), so it is not a real validation. | Compare correlation of slotWinsPerOvr to old personal vs to salary table. | corr(old personal) >> corr(salary); corr(salary) not meaningfully high. | INFERRED | Beam bias-audit (council/beam:bias-audit-2026-11-07.md) §5: slotWinsPerOvr cannot validate the table because RATING_SPECS was fitted to it. Owner addendum: M2 compared two different targets. | 2026-11-07

H-003 | The secondary is NOT biased by volume: real DB snap share (~44%) matches engine secondary weight share (~41%), within 5 pp tolerance. | M4: nflverse snap_counts 2023/24 vs engine weight share (colors SLOTS). | |DB share - engine DB share| <= 5 pp. | VERIFIED | bias-results-2026-11-07.md (council/beam): DB delta -2.9 pp, does not flag. Secondary 18.7% vs QB 11.6%, M1 passes. | 2026-11-07

H-004 | TE and LB are underweighted vs real snap/EPA usage; DL is overweighted vs snaps. | M4/M5 volume + efficiency checks. | TE/LB engine share < real share by >5 pp; DL engine share > real share by >5 pp. | VERIFIED (partial) | bias-results-2026-11-07.md: DL +16.0 pp, LB -13.1 pp, TE -4.2 pp (borderline). M5 by-OVR: QB & TE match engine; WR slightly high; RB much too high. Defense EPA not available. | 2026-11-07

H-005 | No bias detected toward the secondary (M1 passes, M4 secondary within tolerance). Bias/underweight toward TE & LB suggested; DL overweighted vs snaps. | All M1-M6. | Bias "detected" if ANY of M1, M3, M4, M5, M6 flags. | VERIFIED (M1, M4 pass; M3, M5-by-OVR, M6 full, defense EPA open) | bias-results-2026-11-07.md net: "Bias toward the secondary: not detected"; TE/LB underweight, DL overweighted suggested. | 2026-11-07

H-006 | The triangulation generator (T3) shows raw≈fitted≈design for all slots, confirming circularity: measured curve agrees with target because fit targeted it. | Run tools/mathlab/triangulate.mjs on fit result + design.json. | nDisagree = 0 at 10% threshold; mean spread tiny. | VERIFIED | tools/mathlab/results/triangulate-super-2026-11-07.json: nDisagree=0, meanSpreadWins=0.0016, all 33 slots AGREE. | 2026-11-07

Open hypotheses (not yet tested):
H-007 | M5 by-OVR-bucket: engine RB marginal value much too high vs real (real RB OVR barely moves EPA). | Join Madden OVR to nflverse player_stats by (name,pos); regress EPA/game on OVR per position. | engine RB ratio-to-QB >> real RB ratio-to-QB. | OPEN | bias-results-2026-11-07.md §M5 by-OVR: engine RB 0.247 vs real 0.003 — "engine much too high". Needs dedicated task (name-matching ~1900 players). |
H-008 | M3 sensitivity across 4 anchors (Owner table, REV5, salary, data-only): >= 5 slots anchor-dependent (rank moves >= 3). | Fit under 4 anchors; compare slot ranks. | >= 5 slots shift >= 3 ranks. | OPEN | Requires data-only fit (not yet built). |
H-009 | M6 star placement: under -10 flex cap, promotions to WR1/DE1/OT1 = 0 on tuned seeds, 15 on fresh seeds. | Full 768-lineup re-run on Owner's final table. | promotions = 0 under -10 cap. | OPEN | Partial pass; full re-run not yet done. |

Status key: VERIFIED (ran it, receipt in tools/mathlab/results/ or council/beam notes) · REPORTED (someone else says so) · INFERRED (reasoned) · OPEN (not yet tested).
