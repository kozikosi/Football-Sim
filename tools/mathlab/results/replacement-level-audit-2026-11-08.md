# Replacement-level audit (T4) — engine replacement baseline per slot

Generated: 2026-11-08T03:12:59.482Z · engine baseline: flat 80 OVR: slotWins(s, ovr) is measured with all other slots at 80, so the engine's implicit replacement level is an 80-OVR player at every slot — NOT a position-specific replacement level.

| slot | status | basis / evidence |
|------|--------|------------------|
| DL5 | VERIFIED | 5th-ranked DL rotation share 0.33 (mean), median 35%, middle half 22%-44%, stable 2023-2025 (dl5-snaps.py, nflverse snap_counts, 1632 team-games, REG). Engine weight 91..184 across the 22%-44% share band. Replacement = 4th DL rotated off ~67% of snaps. Who DL5 replaces while on field (uniform over DE1/DE2/DT1/DT2) is INFERRED. |
| TE3 | PARTIAL | 13 personnel (1RB 3TE 1WR) = 4.40% of plays (personnel-shares.py, nflverse participation 96,624 plays 2023-25); installRecv bakes 4.52% share from WR2 into TE3. Depth-snap split TE2 vs TE3 not yet measured — UNKNOWN component. |
| CB3 | UNKNOWN | needs snap counts by defensive depth (CB1/CB2/CB3/NICKEL/DIME) from hash-pinned nflverse depth_charts + snap_counts. |
| NICKEL | UNKNOWN | same as CB3. |
| DIME | UNKNOWN | installDime assumes w=0.15 (~10% of snaps, passing-down leverage INFERRED); not measured against real depth data. |
| SAM | UNKNOWN | no LB depth snap data in tree. |
| FB | UNKNOWN | no FB snap/depth data; personnel-shares.py 21 personnel (2RB) = 1.94% of plays is the only related signal. |
| WR4 | UNKNOWN | 01/00 personnel <1% of plays; WR4 share not measured against real depth. |
| all others | UNKNOWN | engine uses flat-80 baseline; position-specific replacement levels (replacement QB != replacement K) not built. PFR Approximate Value is the public fallback (position-agnostic). |

Finding: the engine has NO position-specific replacement level — flat 80 OVR everywhere. That makes WAR incomparable across offense/defense/special teams (replacement QB ≠ replacement K). DL5 is the only slot with a measured, baked-in replacement share (0.33). All depth slots (CB3/NICKEL/DIME/SAM/FB/WR4) are UNKNOWN pending hash-pinned snap-depth data. Never auto-apply a replacement level; present as candidate ruling.
