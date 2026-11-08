# Discrepancy register — engine vs NFL / target disagreements (Super, council/super)

Format: D-### | engine value | real-data / target value | suspected cause | status | evidence | date

D-001 | slotWinsPerOvr() curve mirrors old personal table (Pre-Colors DEFAULT_WEIGHTS: QB 320, WR1 60, TE1 80, CB1 350, SS 80, FS 60) scaled to QB=1000. | Salary table (arrived 6 Nov) is a different shape; neither validated against real data. | RATING_SPECS & MC fitted on 28 Oct to the old personal table (fitlm.js, design.json). The salary table was never a fit target. | VERIFIED | fitlm.js converges to design.json (QB=1000, old-personal shape). triangulate-super-2026-11-07.json: raw≈fitted≈design. Owner addendum Ruling 4: fit target was old personal table, not salary table. | 2026-11-07

D-002 | Engine DL weight share 45.1% vs real DL snap share 29.1% (delta +16.0 pp). | nflverse snap_counts 2023/24. | DL overweighted in engine weights vs real usage. | VERIFIED | bias-results-2026-11-07.md M4: DL +16.0 pp, flags (>5 pp). | 2026-11-07

D-003 | Engine LB weight share 13.6% vs real LB snap share 26.7% (delta -13.1 pp). | nflverse snap_counts 2023/24. | LB underweighted in engine weights vs real usage. | VERIFIED | bias-results-2026-11-07.md M4: LB -13.1 pp, flags. | 2026-11-07

D-004 | Engine QB weight share 22.7% vs real QB snap share 9.1% (delta +13.6 pp) — but QB EPA share matches (24.0% EPA vs 22.7% weight). | nflverse snap + player_stats 2024. | QB volume low but EPA impact high; engine weights track EPA not snaps for QB. | VERIFIED | bias-results-2026-11-07.md M4 (+13.6 pp snap delta) & M5 (QB EPA match). Not flagged as bias — justified by EPA. | 2026-11-07

D-005 | Engine TE weight share 7.7% vs real TE snap share 11.9% (delta -4.2 pp, borderline) and TE EPA share 20.6% vs engine TE share of skill weight 12.7%. | nflverse 2023/24. | TE underweighted vs volume & EPA. | VERIFIED (borderline) | bias-results-2026-11-07.md M4 TE -4.2 pp (borderline, <5 pp), M5 TE underweighted (12.7% vs 20.6%). | 2026-11-07

D-006 | Engine RB marginal value (EPA/game per OVR) much too high vs real (0.247 ratio-to-QB vs real 0.003). | Madden 27 OVR joined to nflverse player_stats 2023+24 (n=RB 61). | Engine overvalues RB marginal impact; real RB OVR barely moves EPA. | VERIFIED | bias-results-2026-11-07.md §M5 by-OVR: RB engine 0.247 vs real 0.003, "engine much too high". | 2026-11-07

D-007 | modelWeights() ships as default on load and is protected by monotone-quantisation contract, but it is a fit to engine mechanics (RATING_SPECS/MC fit to old personal table), not an independent check. | No independent anchor. | Circularity: measurement was fitted to the target. | VERIFIED | bias-audit-2026-11-07.md §5: slotWinsPerOvr cannot validate the table. | 2026-11-07

Open discrepancies (suspected, not yet quantified):
D-008 | Defense EPA by position (DL/LB/CB) unavailable in nflverse player_stats (offense only). | n/a — data gap. | Cannot validate DL/LB/CB weights by efficiency. | OPEN | bias-results-2026-11-07.md: "Defense EPA not available in this data". |
D-009 | WR engine ratio-to-QB 0.649 vs real 0.515 — engine slightly high. | M5 by-OVR. | Mild overvaluation of WR marginal impact. | VERIFIED (mild) | bias-results-2026-11-07.md: WR engine 0.649 vs real 0.515. |
D-010 | Engine FLEX.QB = {} (QB cannot flex to anything → EMERGENCY_PENALTY 8) | Owner flex.json REV 4/5: QB → FS at 10 | flexRule() / product FLEX table not updated to the Owner's REV-4 QB->FS rule; any QB flex returns EMERGENCY_PENALTY (8) instead of 10 | OPEN | flex-audit.mjs on Football-Sim-PreColors.html (sha256 40233d6be00e987c…): ADDED QB->FS 10, product cur.QB = {}; flexcheck.mjs: ADDED QB->FS 10 | 2026-11-08

D-011 | Salary-based DEFAULT_WEIGHTS (OR's branch, hash 395f2641…) pinned in zero tools and never validated against real data (snap/EPA); unvalidated anchor substituted for the mechanics-based design table | nflverse snap_counts 2023/24 + player_stats 2024 | Circularity relocated, not resolved (Q5): salary table replaced the old personal table as the weight anchor, but salary ≠ marginal wins and no validation exists | OPEN | Q40 grep: `40233d6b…` pinned in 5 tools, `395f2641…` pinned nowhere; D-001/D-004 bias data (QB weight 22.7% vs QB snap 9.1%, vs QB EPA 24.0%) | 2026-11-09


Status key: VERIFIED · REPORTED · INFERRED · OPEN.
