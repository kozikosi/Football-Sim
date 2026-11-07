SPEAKER: vloc | ROLE: council seat | TASK: P-013 weights pre-registration (step 2 of bias protocol) | DATE: 2026-11-07T21:00:00Z
FOR: P-013

# Pre-registration — bias test for engine position weights

**Status:** pre-registration only. No data examined, no simulation run, no engine touched. This file defines what counts as evidence of bias BEFORE any result is seen. Per AGENTS.md §9 protocol: "I write down the metrics, thresholds and what would count as evidence of bias, then commit that file before looking at results."

## 1. Question being tested

Does the engine's measured `slotWinsPerOvr()` (the revealed impact of each roster slot) systematically overweight the secondary (CB1/CB2/CB3/SS/FS) relative to an objective anchor, suggesting claude's earlier design.json fit baked in a secondary bias?

## 2. Anchors to compare (pre-registered, in order)

| Anchor | Source | Rationale |
|---|---|---|
| A. Owner's final weights (11-06) | _agents/owner-notes/2026-11-06-weights-final-verbatim.txt | The Owner's stated permanent opinion; salary-based, internal reference only |
| B. design.json table | tools/mathlab/design.json | The table the engine was actually fitted to (the suspected-biased table) |
| C. Salary-only table | Same as A, but using only the salary column (xM) with no manual ±25 adjustments | Tests whether the Owner's manual tweaks created the secondary tilt |
| D. Data-only fit | To be derived from real NFL data (see §4) | Independent anchor from actual on-field value, no salary input |

**Decision rule:** If the engine's measured weights are closer to B (design.json) than to A (Owner's final) on the secondary slots (CB1, CB2, CB3, SS, FS), that is evidence the engine inherited design.json's tilt rather than the Owner's intent. If closer to A, no bias evidence.

## 3. Metrics to measure (pre-registered)

| Metric | Definition | How measured |
|---|---|---|
| M1. Engine slotWinsPerOvr by slot | (slotWins(s,90) - slotWins(s,70))/20 | `node tools/mathlab/lab.js` on Football-Sim-PreColors.html (read-only) |
| M2. Engine modelWeights by slot | quantisation of M1 × 700/max, nearest 5, floor 5 | `modelWeights()` in product |
| M3. Secondary share of total weight | Sum(CB1+CB2+CB3+SS+FS) / sum(all slots) | From M2 |
| M4. WR1 vs CB1 ratio | weight(WR1) / weight(CB1) | From M2 |
| M5. TE1 vs WR1 ratio | weight(TE1) / weight(WR1) | From M2 (McBride relevance) |
| M6. QB share of total weight | weight(QB) / sum(all slots) | From M2 |

## 4. Data needed (real NFL, with named sources per AGENTS.md §7)

**This workspace cannot reach most stats sites.** The following real data must be supplied by the Owner or another seat before M1-M6 can be interpreted:

| Data | Why needed | Source to name |
|---|---|---|
| 2024-2025 snap counts by position group (WR vs CB vs S vs TE) | Volume component of positional value | nflverse / PFF / NFL GSIS |
| Target share by position (WR1 vs TE1 vs CB1) | Receiving value per snap | nflverse / PFF |
| EPA per snap by position group | Efficiency component | nflverse / Next Gen Stats |
| Wins above replacement by position (multi-season) | Direct value anchor | PFF WAR / SIS WAR / nflverse |

Each number needs: page, season, date fetched, or label UNKNOWN. No estimates may be substituted (AGENTS.md §7).

## 5. Thresholds for what counts as bias (pre-registered)

| Threshold | Meaning |
|---|---|
| T1. Secondary share | If engine secondary share (M3) exceeds Owner's final (A) by >3 percentage points AND exceeds data-only (D) by >3 points → bias signal |
| T2. WR1:CB1 ratio | If engine ratio (M4) is below Owner's final (A) by >0.15 AND below data-only (D) by >0.15 → secondary overweighted relative to WR |
| T3. TE1:WR1 ratio | If engine ratio (M5) is below Owner's final (A) by >0.05 → TE underweighted (McBride case) |
| T4. Distance to anchors | If engine M2 is closer to B (design.json) than to A (Owner final) on ≥4 of 6 secondary slots → engine inherits design.json's tilt |

**Bias found = any two of T1-T4 triggered.** One threshold alone is a flag, not a finding.

## 6. Sensitivity check (pre-registered)

Fit weights from four anchors: A (Owner final), B (design.json), C (salary-only), D (data-only). Slots whose weight varies by >50 points across anchors are anchor-dependent. If CB1/SS/FS are the most anchor-dependent slots, that confirms the secondary is the bias-prone area.

## 7. Priors (written before seeing results)

My pre-registration prior: the secondary is likely overweighted because design.json (the fitted table) gives CB1 450 vs Owner's final CB1 400, and CB3 280 vs Owner's final 100. This is a prior, not a conclusion. If the data contradicts it, I report the disagreement and do not settle it silently.

## 8. Independent review (pre-registered)

Since I (vloc) inspected the engine and wrote this pre-registration, a Verifier seat (one that authored nothing in this round) must check:
1. This pre-registration file before any data is examined
2. The M1-M6 measurements against the product source
3. The T1-T4 verdicts against the measured values

## 9. What happens next

1. Commit and push this pre-registration + the audit (inbox/20261107-2059-...) to council/vloc
2. Owner or another seat supplies the real NFL data (§4) with named sources
3. Verifier reviews the pre-registration
4. Only then: run M1-M6 measurements, compare against A/B/C/D, apply T1-T4
5. Report findings; do not change any weight until the Owner decides
