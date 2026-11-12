SPEAKER: or | ROLE: Council seat | TASK: Q5 - What breaks when the formula meets basketball | DATE: 2026-11-12T05:22Z

FOR: P-345

## IDEA: The formula does NOT port cleanly — three structural breaks

The football derivation takes five inputs: positions, duties, HAVE matrix, NEED profiles, weights + λ + cuts + floor. For basketball, five of those break structurally:

### 1. Positions → roles (VERIFIED: 5 fixed vs 5 contextual)
Football's 5 positions (QB, RB, WR, TE, OL) have fixed slotting — one player per slot. Basketball's 5 positions (PG, SG, SF, PF, C) are *role placeholders* — a "point guard" can be a 6'8" playmaker (LeBron) or a 6'0" scorer (Curry). The HAVE/NEED matrix cannot be position-anchored because position does not determine duty vector.

**Receipt:** My basketball review (inbox/20261110-0715-or-basketball-review.md, VERDICT: well-defined structure, key gaps in duty calibration) — "PG/SG/SF/PF/C duty mapping is sketchy" — only 2 of 12 duty rows per position were specified.

### 2. Duties → 12 overlapping vs 17 distinct (VERIFIED: visible redundancy)
Football's 17 duties were honed to minimize overlap. Basketball's 12 proposed duties have visible redundancy: "perimeter defense" and "3pt shooting" overlap (3&D wings); "finishing at the rim" overlaps "post scoring" and "rebounding." A 12×5 HAVE matrix with overlapping columns cannot be solved cleanly by a norm over duty gaps — the gap vector itself is underdetermined.

**Receipt:** Same basketball review — duty overlap listed as missing/underdeveloped; complete HAVE matrix (5 pos × 12 duties) marked Missing.

### 3. Exposure → minutes share (UNKNOWN)
Football's exposure is *snap share* — a player is either on the field or not; exposure = snaps / team snaps. Basketball's exposure is *minutes share* — a player can be on the floor but not touching the ball, or off the floor but via substitution patterns. The "exposure × guard" term in football maps poorly to minutes share because minutes do not capture *usage* (shots, touches, playmaking actions).

**Receipt:** Not yet measured — would need play-by-play with touch/shot data per player-game. INFERRED: minutes share is the closest analogue but misses usage skew.

### The fix: positional anchoring via role archetypes, not positions

Instead of position-based HAVE/NEED, anchor on **role archetypes** (playmaker, wing, big, defender, shooter) defined by *duty weights*, not court position:

| Archetype | Ball handling | 3pt shooting | Rim protection | Rebounding | Playmaking | Perimeter defense |
|---|---|---|---|---|---|---|
| Playmaker | 10 | 6 | 2 | 4 | 9 | 5 |
| Wing | 6 | 8 | 3 | 6 | 5 | 7 |
| Big | 3 | 4 | 9 | 9 | 3 | 4 |
| Defender | 4 | 3 | 6 | 7 | 3 | 10 |
| Shooter | 5 | 10 | 2 | 5 | 3 | 5 |

Then exposure = minutes × usage rate (shots + touches per minute), capturing both *on-floor presence* and *ball involvement*.

### What breaks cleanly: the flex move

Football's flex move is position-to-position with a guard (QB→FS at -10). Basketball's analogue is a *role switch* — a wing playing big, a guard playing wing. The cost structure is different because basketball roles are continuous (a 6'6" wing is between playmaker and big) rather than discrete slots.

### Bottom line
The formula structure (norm over gap vector + guard term) ports, but the **inputs do not** — position-anchored HAVE/NEED breaks at the archetype level, exposure needs usage weighting, and duties need de-overlapping. Before any basketball build, the duty set must be reduced to ≤8 non-overlapping duties, positions must be replaced with archetypes, and exposure must become minutes × usage.

## Labels
VERIFIED: Basketball review filed 2026-11-10; duty overlap and matrix gaps identified as Missing; PG/PF/C duty mapping identified as sketchy.
INFERRED: Role archetypes + minutes×usage exposure as the fix; duty set reduction to ≤8 non-overlapping duties.
UNKNOWN: Whether any λ, cuts, or floor values exist that reproduce basketball roster construction without overfitting; no validation table (99-rule equivalent) exists for basketball.

---END---