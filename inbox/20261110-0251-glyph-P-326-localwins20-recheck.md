SPEAKER: glyph | ROLE: council advisor | TASK: P-326 localWins20 recheck + ±10 trap confirmation | DATE: 2026-11-10T02:51Z
FOR: P-326

## Scope

Independent recheck of localWins20 (per-position local slope at ±5 around CSV pool center, everything else at position-specific averages, Wins = slope × 20) for all 32 slots on the Colors engine, comparison to the w88 table, confirmation of the ±10 trap, spread-sensitivity analysis, and method proposals.

## Method / sources (commands and outputs)

| Item | Value | Evidence |
|---|---|---|
| Engine measured | `67-cakepanz` on-disk copy (`/Users/kosi/Desktop/Football Sim/67-cakepanz/src/engine/sports/nfl/engine/`) run with `node --experimental-strip-types` | VERIFIED (ran) |
| Engine fidelity to architect | `diff` of `value.ts`, `ratings.ts`, `matchup.ts`, `slots.ts`, `specs.ts` between `origin/architect/engine-and-seats:colors/src/sports/nfl/engine/*` and 67-cakepanz: `ratings.ts`, `matchup.ts`, `specs.ts` identical; `value.ts` differs only by absence of `measuredDisplayWeights` in 67-cakepanz (slotWins/slotWins20/bestUnitPts/netPts identical); `slots.ts` differs only by 1 comment line (weights comment). Core `slotWins` math identical. | VERIFIED (`diff` commands) |
| Pool centers | `data/madden27-ratings.csv` in this worktree, n=1941 (wc -l 1942 incl header). Position means computed by Node script. | VERIFIED (command below) |
| Computation script | `/tmp/p326-localwins20.mjs` (written and executed this session). Computes OLD slotWins20 (90-70, others@80, lg@80), NEW local slope at ±3/5/7/10 around CSV center with others/lg at position-specific centers, direct ±10 span W(c+10)-W(c-10) in NEW context, compares to w88 table. | VERIFIED (ran) |

Commands run:
```bash
# centers
cd /Users/kosi/Desktop/wt/glyph && node <<'NODE'  # (inline script computing pos means from data/madden27-ratings.csv)
...
NODE
# result: n=1941; QB 71.847826, HB 75.984000, FB 71.875000, WR 75.526570, TE 70.482014, LT 75.000000, RT 72.984127, LG 72.391304, RG 73.577465, C 71.426471, DT 73.929648, LEDG 74.979381, REDG 74.741573, MIKE 73.354430, WILL 72.294872, SAM 69.000000, CB 74.989950, FS 73.756098, SS 74.626506, K 78.272727, P 77.030303

# fidelity diffs
diff <(git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/value.ts) "/Users/kosi/Desktop/Football Sim/67-cakepanz/src/engine/sports/nfl/engine/value.ts"
diff <(git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/ratings.ts) "/Users/kosi/Desktop/Football Sim/67-cakepanz/src/engine/sports/nfl/engine/ratings.ts"
diff <(git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/matchup.ts) "/Users/kosi/Desktop/Football Sim/67-cakepanz/src/engine/sports/nfl/engine/matchup.ts"
diff <(git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/slots.ts) "/Users/kosi/Desktop/Football Sim/67-cakepanz/src/engine/sports/nfl/engine/slots.ts"
diff <(git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/specs.ts) "/Users/kosi/Desktop/Football Sim/67-cakepanz/src/engine/sports/nfl/engine/specs.ts"

# engine compute
cd "/Users/kosi/Desktop/Football Sim/67-cakepanz" && node --experimental-strip-types /tmp/p326-localwins20.mjs > /tmp/p326-results.json
# exit 0, 544 lines JSON
```

## (1) Full recompute vs w88 table (all 32 slots)

All 32 slots match w88 at 1 decimal (mismatches: 0). `direct±10(new ctx)` = W(center+10)-W(center-10) with others/lg at position centers. `trap?` = whether that equals OLD slotWins20 (90-70, others@80) within 1e-9.

| Slot | Center | OLD20 | w88 | local20_5 | r1 | ±3 | ±7 | direct±10(new) | trap? |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| QB | 71.85 | 2.5382 | 2.5 | 2.4706 | 2.5 | 2.4694 | 2.4815 | 2.5382 | true |
| DE1 | 74.74 | 1.7101 | 1.7 | 1.7097 | 1.7 | 1.7102 | 1.7097 | 1.7101 | true |
| WR1 | 75.53 | 1.6053 | 1.6 | 1.6071 | 1.6 | 1.6755 | 1.5681 | 1.6053 | true |
| DT1 | 73.93 | 1.3158 | 1.3 | 1.3158 | 1.3 | 1.3166 | 1.3156 | 1.3158 | true |
| OT1 | 75.00 | 1.2505 | 1.2 | 1.2497 | 1.2 | 1.2496 | 1.2500 | 1.2505 | true |
| WR2 | 75.53 | 0.9881 | 1.1 | 1.1487 | 1.1 | 1.3047 | 1.0393 | 0.9881 | true |
| CB1 | 74.99 | 1.0563 | 1.1 | 1.0557 | 1.1 | 1.0550 | 1.0560 | 1.0563 | true |
| OG1 | 72.39 | 1.0008 | 1.0 | 1.0001 | 1.0 | 1.0000 | 1.0003 | 1.0008 | true |
| MIKE | 73.35 | 0.7929 | 0.8 | 0.7934 | 0.8 | 0.7941 | 0.7931 | 0.7929 | true |
| DE2 | 74.98 | 0.7903 | 0.8 | 0.7908 | 0.8 | 0.7914 | 0.7905 | 0.7903 | true |
| DT2 | 73.93 | 0.7890 | 0.8 | 0.7896 | 0.8 | 0.7903 | 0.7892 | 0.7890 | true |
| FS | 73.76 | 0.7891 | 0.8 | 0.7893 | 0.8 | 0.7893 | 0.7892 | 0.7891 | true |
| SS | 74.63 | 0.7883 | 0.8 | 0.7887 | 0.8 | 0.7893 | 0.7885 | 0.7883 | true |
| OT2 | 72.98 | 0.7511 | 0.8 | 0.7510 | 0.8 | 0.7510 | 0.7510 | 0.7511 | true |
| CB2 | 74.99 | 0.6598 | 0.7 | 0.6593 | 0.7 | 0.6593 | 0.6595 | 0.6598 | true |
| OG2 | 73.58 | 0.6259 | 0.6 | 0.6258 | 0.6 | 0.6257 | 0.6258 | 0.6259 | true |
| TE1 | 70.48 | 0.6232 | 0.6 | 0.6181 | 0.6 | 0.6170 | 0.6198 | 0.6232 | true |
| RB1 | 75.98 | 0.6168 | 0.6 | 0.6126 | 0.6 | 0.6117 | 0.6139 | 0.6168 | true |
| WILL | 72.29 | 0.3944 | 0.4 | 0.3950 | 0.4 | 0.3956 | 0.3947 | 0.3944 | true |
| DL5 | 73.93 | 0.3934 | 0.4 | 0.3939 | 0.4 | 0.3946 | 0.3936 | 0.3934 | true |
| C | 71.43 | 0.3752 | 0.4 | 0.3752 | 0.4 | 0.3752 | 0.3752 | 0.3752 | true |
| TE2 | 70.48 | 0.3702 | 0.3 | 0.2661 | 0.3 | 0.1328 | 0.3246 | 0.3702 | true |
| CB3/NICKEL | 74.99 | 0.2615 | 0.3 | 0.2610 | 0.3 | 0.2607 | 0.2613 | 0.2615 | true |
| WR3 | 75.53 | 0.2470 | 0.2 | 0.2470 | 0.2 | 0.2470 | 0.2470 | 0.2470 | true |
| DIME | 74.46 | 0.1315 | 0.1 | 0.1310 | 0.1 | 0.1310 | 0.1313 | 0.1315 | true |
| SAM | 69.00 | 0.2630 | 0.1 | 0.1279 | 0.1 | 0.1286 | 0.1437 | 0.2630 | true |
| K | 78.27 | 0.1271 | 0.1 | 0.1271 | 0.1 | 0.1271 | 0.1271 | 0.1271 | true |
| P | 77.03 | 0.1270 | 0.1 | 0.1182 | 0.1 | 0.1180 | 0.1184 | 0.1189 | **false** |
| WR4 | 75.53 | 0.1019 | 0.1 | 0.1019 | 0.1 | 0.1019 | 0.1019 | 0.1019 | true |
| RB2 | 75.98 | 0.2468 | 0.1 | 0.0971 | 0.1 | 0.0971 | 0.1430 | 0.2468 | true |
| TE3 | 70.48 | 0.1234 | 0.1 | 0.0805 | 0.1 | 0.0805 | 0.0805 | 0.1234 | true |
| FB | 71.88 | 0.0626 | 0.1 | 0.0626 | 0.1 | 0.0626 | 0.0626 | 0.0626 | true |

**Result:** 32/32 match w88 at 1dp. Moved slots match as specified: WR2 1.0→1.1, OT1 1.3→1.2 (rounding boundary: OLD 1.2505, NEW 1.2497), TE2 0.4→0.3, SAM 0.3→0.1, RB2 0.2→0.1.

## (2) ±10 trap — confirmation

The trap states: a direct centered 20-span `wins(center+10) − wins(center−10)` reproduces OLD slotWins20 for the moved slots because curves are near-linear across a 20-point span.

**Confirmed for key slots (centered in NEW baseline context = others/lg at position centers):**

| Slot | OLD20 (90-70, others@80) | direct W(c+10)-W(c-10), NEW ctx | Equal? | local20_5 (slope×20) |
|---|---:|---:|---|---:|
| SAM | 0.2630 | 0.2630 | true | 0.1279 |
| RB2 | 0.2468 | 0.2468 | true | 0.0971 |
| TE2 | 0.3702 | 0.3702 | true | 0.2661 |
| WR2 | 0.9881 | 0.9881 | true | 1.1487 |
| OT1 | 1.2505 | 1.2505 | true | 1.2497 |
| CB1 | 1.0563 | 1.0563 | true | 1.0557 |
| WR3 | 0.2470 | 0.2470 | true | 0.2470 |

**Broader result:** 31/32 slots show `W(c+10)-W(c-10)` (NEW ctx) == OLD20 (70→90, others@80) to floating-point precision. **P is the sole exception** (direct±10 new = 0.1189 vs OLD20 0.1270, diff −0.0081). This means the 20-point secant is nearly invariant to the baseline/others context for almost all slots; the trap (re-importing OLD by using a centered 20-span) holds generally, not only for the moved slots. Using slope×20 at ±5 avoids it because it measures the local rate in a narrower window where curvature/baseline effects differ from the wide secant.

**Position:** keep `slope × 20` at `±5`. Do not replace with `wins(center+10) − wins(center−10)`. The centered 20-span is the trap (confirmed).

## (3) Spread sensitivity (±3 / ±5 / ±7)

Sorted by max(|±3−±5|, |±7−±5|) in Wins (slope×20):

| Slot | local20_3 | local20_5 | local20_7 | Δ3 | Δ7 | Notes |
|---|---:|---:|---:|---:|---:|---|
| WR2 | 1.3047 | 1.1487 | 1.0393 | 0.1559 | 0.1094 | concave/diminishing; ±5 middle (r1=1.1 at all three? ±3→1.3, ±7→1.0) |
| TE2 | 0.1328 | 0.2661 | 0.3246 | 0.1334 | 0.0585 | **strongly convex/threshold**; ±3→0.1, ±5→0.3, ±7→0.3 |
| WR1 | 1.6755 | 1.6071 | 1.5681 | 0.0684 | 0.0390 | mild curvature; all round to 1.6 |
| RB2 | 0.0971 | 0.0971 | 0.1430 | 0.0000 | 0.0459 | stable ±3/±5 (0.1), convex above (±7→0.1 at 1dp, ±10→0.2) |
| SAM | 0.1286 | 0.1279 | 0.1437 | 0.0007 | 0.0158 | stable ±3/±5 (0.1), rises at ±7/±10 |
| QB | 2.4694 | 2.4706 | 2.4815 | 0.0011 | 0.0110 | stable (all 2.5) |
| (others) | — | — | — | ≤0.0017 | ≤0.0017 | effectively stable |

Key fragility flags (agree with prior findings): **TE2 is the most fragile** — convex threshold region (±3 reads 0.1, ±5 reads 0.3, ±7 reads 0.3; exact 0.133/0.266/0.325). **WR2 is spread-sensitive** (±3→1.3, ±5→1.1, ±7→1.0) but ±5 sits in the middle and matches the adopted rank; ±3 would overstate, ±7 would understate at 1dp. **RB2** is flat at ±3/±5 then convex upward (±7/±10); ±5 correctly captures the low local rate. **SAM** is flat ±3/±5, then rises.

**±5 assessment:** reasonable working spread. It avoids ±3’s under-read of TE2’s active region and avoids ±10 washing to the old secant. TE2’s convexity means its local value is definition-sensitive; ±5 is defensible as the local rate but should be flagged as the highest-uncertainty slot (a hinge/active-side measure could read differently — see proposals). The w88 table at ±5 is internally consistent and reproducible.

## (4) Centers (CSV pool)

Centers used = per-position means from `data/madden27-ratings.csv` (n=1941): QB 71.85, HB 75.98, FB 71.88, WR 75.53, TE 70.48, LT 75.00, RT 72.98, LG 72.39, RG 73.58, C 71.43, DT 73.93, LEDG 74.98, REDG 74.74, MIKE 73.35, WILL 72.29, SAM 69.00, CB 74.99, FS 73.76, SS 74.63, K 78.27, P 77.03. Slot mapping: OT1→LT, OT2→RT, OG1→LG, OG2→RG, DE1→REDG, DE2→LEDG, DL5→DT, DIME→(CB+FS+SS)/3=74.458 (proxy), others by position. These match the prompt/MUSE table centers (e.g. SAM 69.00, WR 75.527, RB 75.984). For this engine copy and this pool, the w88 table reproduces exactly at 1dp.

Whether CSV means vs the engine’s embedded pool is "more correct" is a **product/Architect question** (not settled here): P-321/MUSE previously reported identical slopes for embedded vs CSV pools on PreColors in that context; I did not re-test embedded-pool centers on this engine. REPORTED: CSV centers reproduce w88 as specified.

## (5) OT1 rounding boundary

OLD20 = 1.250450…, NEW local20_5 = 1.249734… (diff −0.000716). Rounds 1.3 → 1.2 at 1dp despite near-identical exact values. This is a display-boundary artifact, not a material change. VERIFIED.

## Method proposals (advisory)

1. **Keep slope × 20 at ±5.** Correct Wins definition for the local-rate-at-pool-mean intent; centered 20-span is the trap (confirmed). Do not adopt a centered span.
2. **Flag/optionally refine convex slots (TE2, RB2, SAM, WR2).** TE2 is definition-sensitive (0.1/0.3/0.3 across ±3/5/7). For threshold/convex slots, report ±3/±5/±7 and consider a hinge/active-side slope or reporting a range; keep ±5 as the default published value unless Architect/Owner chooses otherwise.
3. **Name:** `localWins20` (per-OVR rate = local slope, expressed as Wins over 20 OVR) is clear and distinguishes from OLD `slotWins20`; fine to keep.
4. **Reproducibility:** commit the computation harness (this logic) alongside any adopted table so reviewers can re-run (self-improvement note #5). I can provide the script on request.
5. **Engine target:** when Architect builds the adoption into Colors engine, verify on architect branch/snapshot `4ca9a071` directly (this recheck used a functionally-equivalent on-disk 67-cakepanz copy; core math identical by diff).

## Evidence label

- **VERIFIED:** CSV pool n=1941 and position means (command output); architect-vs-67-cakepanz diffs showing core slotWins/ratings/matchup/specs parity and slots comment-only diff (command output); full 32-slot recompute on 67-cakepanz Colors engine via `node --experimental-strip-types` (exit 0, JSON saved) — 32/32 match w88 at 1dp; ±10 trap confirmed for SAM/RB2/TE2/WR2/OT1/CB1/WR3 and 31/32 overall; sensitivity numbers (±3/5/7) computed; OT1 boundary values.
- **REPORTED/INFERRED:** equivalence to architect snapshot `4ca9a071` runtime behavior (core files identical by diff, but not executed on that branch tip directly); P anomaly cause (baseline-context interaction) — observed, mechanism not deeply traced.
- **UNKNOWN:** whether embedded-pool centers would change any slot vs CSV centers on this engine (not re-tested here).

## Bottom line

localWins20 at ±5 (slope×20, CSV centers, position-average baseline) reproduces the w88 table for all 32 slots at 1dp on the Colors engine math (functionally equivalent to architect). The ±10 trap is real and confirmed: centered 20-span `W(c±10)` returns OLD slotWins20 for the moved slots (and nearly all others), so it must not replace slope×20. ±5 is a defensible working spread; TE2 (and to a lesser extent WR2/RB2) is curvature-sensitive and should be treated as higher-uncertainty. No change to the w88 numbers is indicated by this recheck.
