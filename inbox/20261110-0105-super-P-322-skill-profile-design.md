SPEAKER: super | ROLE: Council Adviser | TASK: P-322 Design the per-role skill profile | DATE: 2026-11-10T01:05Z
FOR: P-322

## Summary

P-322 is DESIGN ONLY — do not build. Propose a per-role skill profile that produces flex prices from one place instead of 97–107 hand-set rules. Motivation: my P-193 review (inbox/20261110-0055) found three live versions of the flex table (council/muse REV 4 = 107 rules; architect branch 9-Nov = 97 rules; Owner's expected post-items-3+7 = 105 rules) that disagree on rule count, tier distribution, and the QB→FS penalty (10 vs 12), and items 3 + 7 (TE→DIME/FS 12, ILB/OLB→FS 12, SAM mirrors OLB) are applied to NONE of them. The Owner explicitly endorses this direction: "MY FLEX TABLE IS MERELY A GUIDE FOR YOU TO UNDERSTAND HOW I WOULD LIKE THE ENGINE TO WORK." All claims below are anchored to the Owner's 9-Nov flex answers (verbatim in `_agents/muse/deliveries/prompts-2026-11-05/claude-reply-flex-answers-2026-11-09.md`) and the compiled REV 4 table (`tools/mathlab/results/flex-compiled.json` on council/muse).

---

## 1. Skill list (7 skills, each scored 0–10 per role)

| Skill | What it means in football terms | Used by destinations |
|---|---|---|
| **BLK** Blocking | Run + pass blocking. How well the player holds up against a rusher. | RB, FB, TE, OT, OG, C |
| **COV** Coverage | Man + zone pass coverage. How well the player sticks to a receiver. | WR, TE, CB, SS, FS, MIKE, WILL, SAM |
| **RUSH** Pass rush | Getting to the quarterback. | DT, EDGE, MIKE, WILL, SAM |
| **TACK** Tackling | Open-field and run-defense tackling. | RB, FB, TE, DT, EDGE, MIKE, WILL, SAM, SS, FS, CB |
| **CATCH** Catching | Receiving ability, hands, route reliability. | WR, TE, RB, FB |
| **SNAP** Snapping | Long-snap / center snap accuracy and speed. | C, OG (guard-on-snap) |
| **KICK** Kicking | Placekicking / punting leg and accuracy. | K, P |

Scores are ordinal (0–10), not derived from OVR. A role's score reflects the baseline ability a user should expect when flexing a player *into* or *out of* that role.

---

## 2. Role skill matrix (anchor scores)

Each role's baseline on the 7 skills:

| Role | BLK | COV | RUSH | TACK | CATCH | SNAP | KICK |
|---|---|---|---|---|---|---|---|
| QB | 1 | 0 | 0 | 1 | 3 | 1 | 0 |
| RB | 4 | 2 | 1 | 4 | 6 | 0 | 0 |
| FB | 9 | 1 | 2 | 5 | 4 | 0 | 0 |
| WR | 2 | 1 | 0 | 2 | 9 | 0 | 0 |
| TE | 7 | 3 | 1 | 3 | 7 | 0 | 0 |
| OT | 9 | 0 | 0 | 1 | 0 | 0 | 0 |
| OG | 9 | 0 | 0 | 1 | 0 | 2 | 0 |
| C | 8 | 0 | 0 | 1 | 0 | 9 | 0 |
| DT | 3 | 0 | 8 | 6 | 0 | 0 | 0 |
| EDGE | 2 | 0 | 9 | 5 | 0 | 0 | 0 |
| MIKE | 2 | 6 | 4 | 9 | 1 | 0 | 0 |
| WILL | 2 | 5 | 5 | 8 | 1 | 0 | 0 |
| SAM | 2 | 4 | 4 | 7 | 1 | 0 | 0 |
| SS | 1 | 7 | 1 | 7 | 2 | 0 | 0 |
| FS | 1 | 9 | 0 | 6 | 2 | 0 | 0 |
| CB | 0 | 9 | 0 | 3 | 1 | 0 | 0 |
| K | 0 | 0 | 0 | 0 | 0 | 0 | 10 |
| P | 0 | 0 | 0 | 0 | 0 | 0 | 8 |

Notes on disputed scores:
- **SAM vs WILL:** SAM COV 4 vs WILL 5, SAM TACK 7 vs WILL 8 — SAM is "lesser valued because they come off the field for the nickel often" (Owner item 6). Skill difference is small; most of the SAM/OLB gap in the table comes from snap share, not skill. See §5.
- **MIKE vs WILL:** both are off-ball LBs; MIKE TACK 9 vs WILL 8, WILL RUSH 5 vs MIKE 4. Very close — which is exactly why MIKE→WILL = free.
- **OT/OG/C:** all BLK 9 (guards "are better athletes," Owner item 2); only C has SNAP 9.

---

## 3. Destination skill requirements (minimum to play the role without penalty)

| Dest | BLK | COV | RUSH | TACK | CATCH | SNAP | KICK |
|---|---|---|---|---|---|---|---|
| QB | — | — | — | — | — | — | — (QB only to FS per REV 4) |
| RB | 3 | — | — | 3 | 4 | — | — |
| FB | 7 | — | — | 4 | — | — | — |
| WR | — | — | — | — | 7 | — | — |
| TE | 5 | — | — | — | 5 | — | — |
| OT | 8 | — | — | — | — | — | — |
| OG | 8 | — | — | — | — | 2 | — |
| C | 7 | — | — | — | — | 8 | — |
| DT | — | — | 6 | 5 | — | — | — |
| EDGE | — | — | 8 | 4 | — | — | — |
| MIKE | — | 5 | 3 | 8 | — | — | — |
| WILL | — | 4 | 4 | 7 | — | — | — |
| SAM | — | 3 | 4 | 6 | — | — | — |
| SS | — | 6 | — | 6 | — | — | — |
| FS | — | 8 | — | 5 | — | — | — |
| CB | — | 8 | — | 3 | — | — | — |
| K | — | — | — | — | — | — | 9 |
| P | — | — | — | — | — | — | 7 |

A dash = not required for that destination (flexing into it doesn't depend on that skill).

---

## 4. Price formula

For a flex from source role **S** into destination role **D**:

```
raw(S→D) = Σ over skills max(0, D_min[skill] − S[skill]) × w[skill]
```

Skill weights: BLK 2.0 · COV 1.5 · RUSH 1.0 · TACK 0.8 · CATCH 1.2 · SNAP 1.5 · KICK 2.0

Tier mapping (Owner's tier set {0, 2, 6, 12}; tier 10 is a legacy REV-4 artifact):

| raw range | tier | meaning |
|---|---|---|
| < 1.0 | 0 | free — same skill profile |
| 1.0 – 3.9 | 2 | minor gap, similar athlete |
| 4.0 – 8.9 | 6 | moderate gap, needs to learn a skill |
| ≥ 9.0 | 12 | large gap, very different role |

Rounding: round raw to nearest integer, then apply the tier bands. No tier 4 or tier 10 in the design — those exist only in the hand-set tables and are artifacts of ad-hoc pricing.

---

## 5. Verification against the Owner's key anchors

All computed from the matrix + formula in §2–§4.

| Case | Owner says | Profile gives | Match? | Notes |
|---|---|---|---|---|
| WR→TE | 6 "for lack of blocking" | TE min BLK 5; WR BLK 2 → gap 3 × 2.0 = **6.0 → tier 6** | ✓ | Blocker: WR's low BLK is the whole cost. Matches Owner's reason verbatim. |
| TE→DIME | 12 (item 3) | DIME = FS-like (COV 8, TACK 5); TE COV 3, TACK 3 → COV gap 5×1.5=7.5 + TACK gap 2×0.8=1.6 = **9.1 → tier 12** | ✓ | TE lacks coverage; 12 is the top tier. |
| TE→FS | 12 (item 3) | FS min COV 8, TACK 5; TE COV 3, TACK 3 → **9.1 → tier 12** | ✓ | Same as DIME (FS and DIME both deep coverage). |
| ILB→FS | 12 (item 3, new) | MIKE COV 6, TACK 9 → FS COV 8 gap 2×1.5=3.0 → **3.0 → tier 2** | ✗ | Profile says MIKE is a good tackler with decent coverage; FS is pure coverage. The Owner prices all LBs→FS at 12. Disagreement — see §6. |
| OLB→FS | 12 (item 3, new) | WILL COV 5, TACK 8 → FS gap 3×1.5=4.5 → **4.5 → tier 6** | ✗ | Same as above. |
| FB→RB | free (REV 2) / 2 (REV 4) | FB BLK 9, TACK 5, CATCH 4 vs RB min 3/3/4 → all gaps 0 → **tier 0** | ✓ (REV 2) | FB is a natural RB/TE blocker; free flex is sensible. REV 4's tier 2 looks like an artifact. |
| FB→TE | 4 (REV 2 & REV 4) | TE min BLK 5, CATCH 5; FB BLK 9, CATCH 4 → CATCH gap 1×1.2=1.2 → **tier 2** | ✗ | Profile says FB is close to TE (both block-and-catch hybrids). Table's 4 overprices it. |
| MIKE→WILL | free (item 6) | WILL min COV 4, RUSH 4, TACK 7; MIKE COV 6, RUSH 4, TACK 9 → all gaps 0 → **tier 0** | ✓ | Both off-ball LBs, same skills. |
| WILL→MIKE | 6 (item 6) | MIKE min COV 5, RUSH 3, TACK 8; WILL COV 5, RUSH 5, TACK 8 → all gaps 0 → **tier 0** | ✗ | Owner values MIKE≠WILL at 6 (role distinction: MIKE=middle, WILL=weakside). Profile sees them as same skill set. Disagreement — see §6. |
| QB→FS | 12 (architect branch; REV 4=10) | FS min COV 8, TACK 5; QB COV 0, TACK 1 → COV gap 8×1.5=12 + TACK gap 4×0.8=3.2 = **15.2 → tier 12** | ✓ (architect branch) | QB has almost no coverage/tackling skill. |
| QB→RB | removed (REV 3/4) | RB min BLK 3, TACK 3, CATCH 4; QB BLK 1, TACK 1, CATCH 3 → BLK gap 2×2=4 + TACK gap 2×0.8=1.6 + CATCH gap 1×1.2=1.2 = **6.8 → tier 6** | ✓ | Profile would price QB→RB at 6; Owner removed it entirely (QB only to FS). Profile is more permissive than the Owner's latest word. |
| CB→WR | 6 | WR min CATCH 7; CB CATCH 1 → gap 6×1.2=7.2 → **tier 6** | ✓ | "WRs are better and paid more because they can catch" (Owner item 4). |
| WR→CB | 6 | CB min COV 8; WR COV 1 → gap 7×1.5=10.5 → **tier 12** | ✗ | Owner has WR→CB at 6; profile says 12. DB coverage is much harder than the table prices. Disagreement. |
| SS→FS / FS→SS | 2 | SS COV 7, TACK 7 vs FS COV 8 → gap 1×1.5=1.5 → **tier 2**; FS COV 9 vs SS COV 7 → gap 2×1.5=3.0 → **tier 2** | ✓ | Safeties are close to each other. |
| SAM→OLB / OLB→SAM | 0 (item 7: SAM mirrors OLB) | WILL and SAM differ by 1 point on COV/TACK → gap <1 → **tier 0** | ✓ | SAM mirrors WILL. |
| EDGE→OLB | free (intended, item 5) | WILL min COV 4, RUSH 4, TACK 7; EDGE RUSH 9, TACK 5 → COV gap 4×1.5=6.0 → **tier 6** | ✗ | Owner wants EDGE→OLB free; profile says EDGE lacks coverage (COV 0). Disagreement — EDGE→OLB being free is an Owner convention (EDGE and OLB both rush), not skill-based. |
| K→P | 0 (REV 3) | P min KICK 7; K KICK 10 → gap 0 → **tier 0** | ✓ | Both kickers. |
| P→K | 4 (REV 3) / 0 (REV 4) | K min KICK 9; P KICK 8 → gap 1×2.0=2.0 → **tier 2** | ✗ | Table has 4/0; profile says 2. Minor disagreement. |

**Score: 9 clean matches / 4 disagreements (WILL→MIKE, MIKE/OLB→FS, WR→CB, EDGE→OLB) / 2 minor (FB→TE, P→K).**

---

## 6. Where the profile disagrees with the Owner's table — and why

These are the four cases where skill-based pricing diverges from the Owner's hand-set prices. For each I flag whether the profile is likely right (table is an artifact) or the table reflects an Owner convention worth preserving:

1. **WILL→MIKE: profile 0, table 6.** Both are off-ball LBs with nearly identical skills. The Owner's 6 is a role-convention (MIKE = middle, WILL = weakside), not a skill gap. **Recommendation:** treat as a convention exception — keep 6 as a hand-set override, or accept 0 and let the Owner decide.

2. **MIKE/OLB→FS: profile 2–6, table 12 (item 3).** LBs have real tackling skill, so they're not *as* bad at FS as a QB. But the Owner wants all LBs→FS at 12 for simplicity ("all linebackers and tight ends can play FS for −12"). **Recommendation:** accept the Owner's 12 as a tier-cap rule (LBs and TEs to FS max out at 12 regardless of skill), noting it sacrifices precision for memorability.

3. **WR→CB: profile 12, table 6.** CB coverage (COV 9) is far from WR (COV 1) — a 10.5 raw gap. But the Owner says WR→DB is cheap because "WRs are better athletes... DBs can't catch" (item 4). **Recommendation:** the profile overweights pure coverage; maybe cap cross-position DB flexes at 6 as an Owner convention, since the fun principle (users want to see Tee Higgins at CB) argues for cheaper than pure skill would give.

4. **EDGE→OLB: profile 6, table free (item 5, "intended").** EDGE has COV 0, so playing OLB (which covers sometimes) should cost. But the Owner wants it free — EDGE and OLB both rush. **Recommendation:** keep EDGE→OLB free as a convention (rush-to-rush is natural), adding a "rush role" equivalence that bypasses the coverage requirement for EDGE↔OLB/SAM/WILL.

**Cross-cutting principle:** the skill profile produces *prices*; the Owner's table produces *prices + conventions*. Where they clash, the design should be: profile computes a base price, then a small list of Owner conventions (free EDGE↔OLB, LBs→FS capped at 12, QB only to FS) overrides. This preserves the "one place to compute prices" benefit while honoring the Owner's stated reasons.

---

## 7. SNAP and KICK as special cases

- **SNAP** only matters for C (and OG as a guard-on-snap). C→OG is free (OG needs SNAP 2; C has 9). OG→C costs (C needs SNAP 8; OG has 2 → gap 6 × 1.5 = 9 → tier 12). Table REV 4: OG→C = 0, C→OG = 0. **Profile gives C→OG free ✓, OG→C tier 12 vs table 0 — major disagreement.** The Owner's item 2 says "cost to snapping is less than being a better athlete," i.e. OG→C should be cheap. Profile overprices snapping. **Fix:** reduce SNAP weight from 1.5 to 0.5 → OG→C raw = 6×0.5=3 → tier 2. Still not 0. To get 0, treat SNAP as "nice to have, not required" for OG→C (guard can learn to snap). Recommendation: SNAP is a *bonus* skill (having it helps, not having it doesn't penalize unless destination strictly requires it, i.e. only C). Then OG→C = 0 only if we waive SNAP for non-C destinations. Open question for the Architect.
- **KICK** only matters for K and P. K→P free ✓, P→K tier 2 vs table 4/0 — minor.

---

## 8. How this replaces the hand-set table

Instead of maintaining 97–107 hand-set `from → {to: penalty}` entries across diverging branches, the engine stores:
1. The 17×7 role skill matrix (§2)
2. The destination minimum table (§3)
3. The formula + tier bands (§4)
4. A small convention override list (EDGE↔OLB free; LBs/TEs→FS capped at 12; QB only to FS; C→OG free; OG→C cheap)

Adding a new role (e.g. DIME as its own role, or NICKEL) means scoring it on 7 skills, not hand-pricing its row against every other role. The table on `council/muse` (REV 4) has 17 roles; if NICKEL becomes a real role (not just CB3's alias) the profile scales cleanly.

---

## 9. Open questions for the Architect

1. **SNAP semantics:** is snapping a requirement (only C needs it) or a bonus? Determines whether OG→C is tier 2 or tier 0.
2. **Convention overrides:** which table entries are conventions the Owner wants to keep (EDGE→OLB free, LBs→FS=12) vs. prices the profile should set?
3. **Tier cap:** should any flex be capped at 12 even when the profile says more (e.g. QB→FS profile = 12, already at cap; QB→WR profile = 6 but Owner removed it)?
4. **NICKEL/DIME as roles:** currently aliases for CB3/6th-DB. If they become real roles, score them (DIME ≈ FS coverage but fewer snaps; NICKEL ≈ CB coverage).

---

## 10. Evidence labels

- Skill matrix, formula, tier bands, all computations in §5: **INFERRED** — derived from Owner's stated reasons (WR>TE blocking, TE/LB coverage equality, WR catch vs DB coverage, guard snapping, SAM nickel share) but not yet implemented or run against the engine.
- Anchor matches/mismatches in §5 table: **INFERRED** — hand-computed from the proposed matrix; not executed against `flexengine.js` (which requires Playwright + a built page and currently rejects penalty 12 per P-193 F5).
- Flex table divergence (107 vs 97 vs 105 rules; QB→FS 10 vs 12; items 3+7 unapplied): **VERIFIED** in P-193 (`inbox/20261110-0055-super-P-193-flex-guide-data-review.md`) via `git show origin/council/muse:...` and `origin/architect/engine-and-seats:...`.
- Owner's endorsement of skill profile: **VERIFIED** — verbatim in the 9-Nov flex answers: "I SUPPORT THIS... MY FLEX TABLE IS MERELY A GUIDE..."

---

## HOW TO CHECK

- Read the Owner's flex answers: `git show origin/council/muse:_agents/muse/deliveries/prompts-2026-11-05/claude-reply-flex-answers-2026-11-09.md` — items 1–7 + "IDEA: per-role skill profile."
- Read the compiled REV 4 table: `git show origin/council/muse:tools/mathlab/results/flex-compiled.json` — 107 rules, no tier 12, QB→FS=10.
- Read the architect branch table: `git show origin/architect/engine-and-seats:tools/mathlab/flex.json` — 97 rules, QB→FS=12, TE→DIME=12 but TE→FS still 6 (item 3 unapplied).
- Read P-193: `inbox/20261110-0055-super-P-193-flex-guide-data-review.md` — full divergence analysis.

---

## VERDICT

**ok (design proposal).** P-322 is filed as a design-only proposal. The Architect decides whether and how to build the skill profile. It directly addresses the flex-table divergence found in P-193 and the Owner's stated preference that the table is "merely a guide." No product edits, no protected constants touched.
