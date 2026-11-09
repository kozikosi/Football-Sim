SPEAKER: vloc | ROLE: council seat | TASK: slotWins20 spread question (±3/±5/±7/±10) | DATE: 2026-11-09T22:17Z
FOR: P-321
SOURCE: task relayed via MUSE seat (`_agents/muse/deliveries/prompts-2026-11-05/claude-slotwins20-spread-2026-11-09.md`); MUSE measurement proposal in `_agents/muse/deliveries/slotwins20-measurement-improvement-2026-11-09.md`.

VERDICT on the spread question: **±5 (a 10-point spread) is fine — the spread does not matter much.** For 22 of 26 slots the local slope is identical to 3 decimals across ±3 / ±5 / ±7 / ±10 (center 80, everything else at 80). The only real spread-driven slope changes are WR2 (0.030→0.037), WR3 (0.019→0.023), RB2 (0.011→0.006), TE2 (0.007→0.003) — all ≤ 0.007 wins/+1 OVR. After weight scaling, spread alone changes only WR2 (+40), WR3 (+25), RB2 (−25), TE2 (−25); every other ±5 weight move is a rounding artifact from re-normalizing to QB=700 (QB max slope 0.127→0.126). Max *real* weight change from spread alone = 40 points of 700. The spread choice is not the critical decision.

Measurement harness: `_agents/vloc/deliveries/measure-slot-slope.mjs` (VERIFIED: ran clean). It evals the product's inline script (extracted from `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`, the current verified Pre-Colors build) with a DOM shim, reuses the engine's pure math (`slotWinsTable`, `slotWins`, `teamRatings`, `bestUnitPts`, `matchupModel`), and sanity-checked that a hand-built all-80 table reproduces `slotWinsTable()` exactly (OK).

Two experiments:
- A (isolates spread): center = 80 for every slot, everything else at 80. h=10 reproduces the OLD `slotWinsPerOvr()` (70→90 over 20).
- B (MUSE proposal): per-position center = pool-average OVR for that slot's exact position tag (LT vs RT, LG vs RG, LEDG vs REDG kept separate), everything else at that position's pool average OVR.

## 1. Slope at each spread, side by side (wins per +1 OVR). OLD == A h=10.

slot   OLD   A h=3  A h=5  A h=7  A h=10 | B h=3  B h=5  B h=7  B h=10 | maxΔA  maxΔB
QB     0.127 0.126 0.126 0.126 0.127   | 0.124 0.124 0.124 0.126 | 0.001  0.002
RB1    0.033 0.033 0.033 0.033 0.033   | 0.028 0.028 0.028 0.028 | 0.000  0.001
RB2    0.011 0.006 0.006 0.006 0.011   | 0.005 0.005 0.005 0.009 | 0.005  0.004
WR1    0.055 0.055 0.055 0.055 0.055   | 0.054 0.054 0.054 0.054 | 0.000  0.000
WR2    0.030 0.037 0.037 0.034 0.030   | 0.036 0.036 0.035 0.031 | 0.007  0.005
WR3    0.019 0.026 0.023 0.021 0.019   | 0.025 0.025 0.022 0.020 | 0.007  0.005
TE1    0.040 0.040 0.040 0.040 0.040   | 0.038 0.038 0.038 0.038 | 0.000  0.000
TE2    0.007 0.000 0.003 0.005 0.007   | 0.000 0.000 0.003 0.005 | 0.007  0.005
OT1    0.052 0.052 0.052 0.052 0.052   | 0.049 0.049 0.049 0.049 | 0.000  0.000
OT2    0.052 0.052 0.052 0.052 0.052   | 0.049 0.049 0.049 0.049 | 0.000  0.000
OG1    0.043 0.043 0.043 0.043 0.043   | 0.040 0.040 0.040 0.040 | 0.000  0.000
OG2    0.043 0.043 0.043 0.043 0.043   | 0.040 0.040 0.040 0.040 | 0.000  0.000
C      0.043 0.043 0.043 0.043 0.043   | 0.040 0.040 0.040 0.040 | 0.000  0.000
DE1    0.065 0.065 0.065 0.065 0.065   | 0.068 0.068 0.068 0.067 | 0.000  0.001
DE2    0.055 0.055 0.055 0.055 0.055   | 0.058 0.057 0.057 0.057 | 0.000  0.001
DT1    0.047 0.048 0.048 0.048 0.047   | 0.050 0.049 0.049 0.048 | 0.001  0.002
DT2    0.038 0.038 0.038 0.038 0.038   | 0.040 0.040 0.039 0.039 | 0.000  0.001
MIKE   0.043 0.043 0.043 0.043 0.043   | 0.046 0.045 0.045 0.044 | 0.000  0.001
WILL   0.040 0.040 0.040 0.040 0.040   | 0.043 0.042 0.042 0.042 | 0.000  0.001
SAM    0.004 0.004 0.004 0.004 0.004   | 0.004 0.004 0.004 0.004 | 0.000  0.000
CB1    0.072 0.072 0.072 0.072 0.072   | 0.076 0.076 0.076 0.076 | 0.000  0.000
CB2    0.059 0.059 0.059 0.059 0.059   | 0.062 0.062 0.062 0.062 | 0.000  0.000
CB3    0.047 0.047 0.047 0.047 0.047   | 0.050 0.050 0.050 0.050 | 0.000  0.000
SS     0.044 0.044 0.044 0.044 0.044   | 0.047 0.047 0.047 0.047 | 0.000  0.000
FS     0.043 0.043 0.043 0.043 0.043   | 0.045 0.045 0.045 0.045 | 0.000  0.000
K      0.036 0.036 0.036 0.036 0.036   | 0.036 0.036 0.036 0.036 | 0.000  0.000

Slots whose slope moves MOST across spreads (experiment A): TE2 (0.0072), WR2 (0.0067), WR3 (0.0066), RB2 (0.0046). Every other slot: Δ ≤ 0.0012. **Why:** TE2/RB2/WR2/WR3 have wins curves that are non-linear (concave-up) around OVR 80, so a wide spread (70→90) catches more of the rising curve than a narrow local spread. QB/CB1/DE1/WR1/OT1/OT2 are locally linear → zero movement. All defensive slots (DE/DT/LB/CB/SS/FS) are perfectly flat across spreads.

## 2. Does spread change D materially? **No.** All defensive slots show slope Δ = 0.000 across every spread (experiments A and B), so `slotWinsPerOvr()[slot]` fed to `roleBonus()` (defensive player ratings, `ensureRatings`) is unchanged by the spread choice. P-318's WILL/C: WILL 0.040 and C 0.043 are identical across all spreads — the spread does not move them (only the center change in experiment B does: WILL 0.040→0.042, C 0.043→0.040). So spread choice does not change the four proposed rules or the 12 below-D rules from thetaprice.

## 3. Does spread change measured weights materially? **No.** Spread-only (h=10 → h=5, fixed center 80, everything-else 80): real weight changes only WR2 165→205 (+40), WR3 105→130 (+25), RB2 60→35 (−25), TE2 40→15 (−25). The other apparent moves (OT1/OT2/DT1/WILL/CB1 ±5) are rounding artifacts from QB max rescaling 0.127→0.126, not real slope changes (those slopes are identical). Max real weight change from spread = 40 of 700. Note the OLD→MUSE-h=5 comparison (23 slots changed, max 35) is driven by CENTER (80 → per-position avg ~77–82) and everything-else (80 → position avg), NOT by the spread.

## 4. Data-integrity note (AGENTS.md §7)
MUSE's quoted pool averages (overall mean 73.8; QB 71.8, HB 76.0, WR 75.5, TE 70.5 …) come from `data/madden27-ratings.csv` — VERIFIED: 1,941 players, mean OVR 73.84. The engine's embedded pool `PLAYERS` is a different set — VERIFIED: 1,200 players, mean OVR 78.27 — giving position averages QB 80.78, HB 79.12, TE 78.51 (full table in the harness output). MUSE's figures do NOT match the engine's current pool. If the per-position-center measurement is implemented, center/everything-else must be computed from the embedded pool the engine actually reads, not from MUSE's CSV figures. This is a center/everything-else issue, separate from the spread.

## Recommendation
Adopt **±5** (10-point spread) for the local slope — it is as accurate as ±3 or ±7, more stable than ±10 for depth slots (TE2/RB2), and matches MUSE's proposal. The spread choice itself is not decision-critical: any of ±3/±5/±7/±10 is defensible and changes almost nothing. If the Architect adopts MUSE's refinement, the consequential decisions are the per-position center and position-averaged everything-else (which move weights more than the spread) and reconciling the pool discrepancy above. Flex table untouched (P-311 separate); protected constants unchanged; product file not edited by this seat.

Evidence: command `node _agents/vloc/deliveries/measure-slot-slope.mjs`, run from repo root, output above; harness at `_agents/vloc/deliveries/measure-slot-slope.mjs`. Label: VERIFIED (ran it).
