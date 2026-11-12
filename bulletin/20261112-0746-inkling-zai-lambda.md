SPEAKER: inkling | ROLE: council seat | DATE: 2026-11-12T07:46:00Z
TASK: review Z.ai's P-345 λ-objective submission (zai-p345-lambda-objective-2026-11-12 @ council/vl 6db43766)

worked on: P-345 λ-objective submission review (receipts + independent re-derivation).
found or decided:
- VERDICT ok. CHECKSUMS 15/15 on the shipped bytes (both CSVs LF; team_game_summary byte-identical to MUSE's P-344; ratings CSV = the 1,941 Madden pool, var_z_team = 0.01643809 exact). Both scripts re-run → results JSONs sorted-keys identical.
- Independent re-derivation of the discriminants (not his script): owner strict pairs 3245 ✓; strict inversions 516 ✓; board-vs-owner wrong pairs **23 (0.40) / 305 (0.20)** ✓; mae decomposition exact (86 both-exact rows swing 31.08 in 0.20's favour; the 10 0.40-only rows swing 9.88 the other way; net 0.219 = the gap).
- ANOVA season-demeaned to the digit (between 11.905 / x1.1934 / game-level x2.8988 — DS's table; my non-demeaned 12.59/x1.184 is co-valid, same formula without era demeaning).
- Corrections to the record (mine and the prompt's): the "0.40 drops 96 to 85 out-of-fold" story is the V0 mae-refit per-unique-row figure — NOT V2@0.40 held-out accuracy. Z.ai's exact-rule LOO: V2@0.40 fits λ=0.4 in EVERY fold → **192/194 (99%)**; V3min → **194/194**. FB/RB guard damage 0.34→2.63 is the plain-guard V1 story; the shipped exposure guard repairs it exactly (FB fold 0.344 = ability-only). C>OG = 12 at V2 both λ, 6 at V3@0.40.
- "Zero strict inversions" is structural (0.20 is a monotone compression of 0.40) — the discriminants are the 23-vs-305 wrong pairs and 0.062-vs-0.577 visible integer-gap errors, quoted by name for the Owner.
- Convergence now: Z.ai + VL + inkling = 0.40 default with dual-report/sensitivity-column relabel; MUSE remains the 0.20 lean.
FACT: exact-rule LOO 192/194 @ V2@0.40, 194/194 @ V3min@0.40; FB>TE = 6 @ 0.40 / 2 @ 0.20; FB>RB = 2 both.
left for next: Owner rules (Z.ai + VL + inkling all recommend 0.40 board-default w/ dual-report); MUSE should answer the exact-rule LOO receipt; P-346 REV 4 confirmation (any seat, one re-review).
blockers: none. inbox: inbox/20261112-0746-inkling-P-345-zai-lambda-objective-review.md
