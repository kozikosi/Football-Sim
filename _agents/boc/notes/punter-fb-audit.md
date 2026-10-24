# P3 — Punter/FB Weights + Specs Audit (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Question
Where P's and FB's weights/specs live; current values vs Owner's "~1×" / "heavier than RB" rulings.

## Punter (P)

### 1. DEFAULT_WEIGHTS (l.452)
```
"P": 1
```
Owner: "probably 1 in the traditional model weights." **VERIFIED** — already 1. No change needed.

### 2. _POSITION_TIER (l.983)
```
P:5
```
Tier 5 (lowest). Consistent with K=5. No change needed.

### 3. RATING_SPECS (l.1935-1943)
P is not in any rating spec. Punter has no matchup model contribution (no punting yardage model). This is correct — punter doesn't affect game simulation directly (field position is handled separately). **VERIFIED** — no change needed.

### 4. GROUP_DEFS (l.455)
P is in "Specialists" group. Correct.

### 5. Does P appear in matchupModel or teamRatings?
No. Punter does not affect game simulation. Field position from punts is handled separately. **VERIFIED** — no change needed.

## Fullback (FB)

### 1. DEFAULT_WEIGHTS (l.452)
```
"FB": 1
```
Owner: "FB get a much heavier block spec than a RB." The weight (draft value) is 1, same as Punter. This is the draft priority weight, not the block spec. The Owner's "heavier block spec" refers to the matchup model (RATING_SPECS), not the draft weight. **VERIFIED** — draft weight of 1 is acceptable (FB is a low-priority draft pick). No change to draft weight needed.

### 2. _POSITION_TIER (l.983)
```
FB:5
```
Tier 5 (lowest). Consistent with P=5, K=5. No change needed.

### 3. RATING_SPECS (l.1935-1943)
FB is **NOT** in any rating spec. The current specs:
```
olRun:    {OT1:1.0, OT2:1.0, OG1:1.2, OG2:1.2, C:1.2, TE1:0.6},
rb:       {RB1:2.0, RB2:0.5},
```
FB is absent from olRun. The Owner wants FB to have "a much heavier block spec than a RB" — meaning FB should contribute to run blocking (olRun) with a weight heavier than RB's contribution.

Currently:
- RB1 contributes 2.0 to `rb` (running back rating)
- RB2 contributes 0.5 to `rb`
- TE1 contributes 0.6 to `olRun` (run blocking)

FB should be added to `olRun` with a weight heavier than RB's. Since RB1=2.0 in the `rb` spec, FB should be > 2.0 in `olRun` (or at least significantly more than TE1's 0.6). The Owner says "much heavier" — suggesting FB ≥ 1.5 or higher in olRun.

### 4. Does FB appear in teamRatings or matchupModel?
No. FB is not included in any unit rating calculation. The Owner wants FB to contribute to run blocking.

### 5. GROUP_DEFS (l.455)
FB is in "Specialists" group. This is a display grouping, not a math grouping. Could be moved to "Offense — Positions" but that's a UI change, not math.

## Proposed change (for Claude)
Add FB to RATING_SPECS.olRun with a weight heavier than RB's contribution:
```
olRun: {OT1:1.0, OT2:1.0, OG1:1.2, OG2:1.2, C:1.2, TE1:0.6, FB:2.0},
```
This gives FB a run-blocking contribution equal to RB1's running contribution, which satisfies "much heavier block spec than a RB" (RB2 is 0.5, and FB as a blocker should be heavier than a backup RB).

Alternatively, if the Owner means FB should be heavier than RB1 (2.0), then FB should be 2.5 or 3.0.

## What was deliberately not checked
- Whether FB should also contribute to pass protection (olPass spec).
- Whether FB should be included in the "Run Game" team unit (GROUP_DEFS RUN includes HB but not FB).
- Whether the optimalLineup() function handles FB flex (FB is not in NATURAL_SLOT_MAP, so it can't flex to other slots).
