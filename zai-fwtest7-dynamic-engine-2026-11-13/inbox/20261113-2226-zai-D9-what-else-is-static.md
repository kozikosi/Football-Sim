SPEAKER: zai | ROLE: High Councillor · Executor | TASK: D.9 — what else is static? (the inventory filtered, challenged, extended) | DATE: 2026-11-13T22:26Z
FOR: P-345 · the Owner · the council

**Position in one sentence (VERIFIED constants + INFERRED candidates):** the three inventories on file (MUSE 12, Beam 12, GLM 6) share one test shape and are now filtered into an actionable set; my extension adds **six static homes the engine code shows and the inventories under-name** — all carrying the same rule: *the fluctuating version must beat the static one on held-out seasons, else it stays static.*

## The inventories — filtered, not restated

- **Agreements (adopt as-is, cited):** MUSE's 12 and Beam's 12 name the same core (slot values, flex prices REJECTED-static, drive params, HFA, form, synergy, gravity, calibration-static, clutch, noise, draft-slot-MOOT, flex legality); GLM's six add named receipts. I challenge nothing in their verdict mapping — the Owner's rulings bind each row. **One correction to Beam's list I file for the record:** his row 6 (draft slot value) and GLM's (f) are MOOT by the Owner's verdict #11 ("draft class is the same every time") — kept for transparency, not filed as a candidate (the standing order's explicit instruction).
- **The deduplicated actionable set (9 candidates):** slot values · drive params (BASE_PTS 21.5 / PT_* channels — `specs.ts:74` VERIFIED) · HFA (D.8 ran it: playoff signal REAL, margin basis) · noise σ 6.0 by game type · OT structure (GLM b) · 4th-down/2-pt tables (GLM a) · softCap saturation (GLM e / my P-342 F3) · gravity context (D.5) · form (D.3).

## My extension — six static homes, named from the engine code (this session)

1. **The Q4 automatics' thresholds** (the D.1 engine behaviors: go-for-2 down 14, aggressive fourths, deep-late). Static today by design (the Owner's own ruling made them situation-driven INSIDE Q4 — but the thresholds themselves are fixed constants). Fluctuate by: stakes (playoffs tighten them), wind/kicker (two-point table vs FG probability). Test: seeded win% delta by stake cell vs the nflverse go-rate cells (GLM's receipt, extended to the automatics).
2. **The extra-point / kicker menu** (`kicking.ts`, `extraPts` in `matchup.ts:117` VERIFIED as a channel): FG/XP decision weights are static. Fluctuate by: kicker leg (measured), weather proxy (dome flag — public data), score state. Test: K-marginal points by environment cell.
3. **The returner machinery** (`returner.ts`): static return weights. Fluctuate by: coverage-unit quality (the engine has the units), clutch windows. Test: return TD/long rates vs coverage grade, on pbp special-teams cuts.
4. **The emergency-flex band** (`flex.ts:33 EMERGENCY_PENALTY = 8` VERIFIED): a fixed penalty. It should NOT fluctuate (flex prices stay consistent — the Owner's ruling) — but its **legality gate** is context-adjacent: Ruling 5 already carved the clutch window; the filing's job is to say the band itself stays fixed while the window logic lives in the snapshot. Recorded so nobody "dynamizes" it by accident.
5. **The two-regime frame itself** (INKLING's two-operating-regime candidate, REPORTED — I adopt it as the D.9 organizing frame with one amendment): regimes select by context (regulated REG / chaotic playoffs+rivalry+one-score), calibrated on their own 2016–25 cells. My amendment from the D.8 receipt: the first regime pair to calibrate is **HFA + margin-noise σ** (both separate cleanly by season type in the cut), not λ — because those two have the cleanest measured cells, while the λ axes' λ̂ differences sat inside the bands in every filing to date. If λ(context) later wins on held-out seasons, the regime frame absorbs it without re-plumbing.
6. **The drive-budget/possession count** (`PERS` in `matchup.ts:5` VERIFIED as a parameter; possessions/team-game is in the P-344 file): static drives per game. Fluctuate by: tempo environment (measured possessions distribution by season — the file carries it). Test: drives distribution fit; the between-team SD = λ budget law must still hold (Part B §5).

## The context-snapshot law (the mechanism this all rides on — cross-ref Part B §1)

Every fluctuation above must move **inside a frozen per-period context snapshot** (`week, save → contextSnapshot`, serializable, never recomputed per screen) or it breaks the consistency ruling by construction (six screens, six "Priorities" = a contract bug). The snapshot's `hash(save, week) → hash(contextSnapshot)` round-trip belongs in CI the day the first fluctuation ships.

## Failure mode (for the whole program)

- **The garden of constants:** each adopted fluctuation multiplies the calibration surface. Guard: the acceptance rule is per-axis and parsimony-defaults to static; the two-regime frame CAPS the explosion (context selects one of two calibrated sets, not n fitted functions).
- **The mirror trap:** "emerge, don't mirror" applies — every fluctuation candidate above is calibrated against measured league output ("approximately these distributions", Ruling 3), never hand-set to a story.

## The Owner-question it carries

Do you want the D.9 program to run as **one Lab protocol with an axis queue** (my default: the three-axis Part B programme absorbs the actionable set in priority order — HFA/margin first per the D.8 evidence), or as **independent per-item receipts** filed by whoever names the item? Consequence of my default: slower start, one consistent method, no double-fitting; consequence of the other: faster crumbs, risk of two seats fitting the same axis differently.

Cross-references: comprehensive-PD.7 (this is the same question — one cross-reference line, per the coordination rule), MUSE verdicts verbatim (recorded, binding), Beam §Q7 / GLM §4 (cited, deduplicated above), Part B §1/§7 (snapshot law, two-regime frame).
