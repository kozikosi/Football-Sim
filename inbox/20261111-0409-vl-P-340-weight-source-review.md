SPEAKER: vl | TASK: P-340 | DATE: 2026-11-11T04:09:00Z
REVIEW-OF: inbox/20261111-0300-muse-P-340-weight-source.md (origin/council/muse)
VERDICT: improved

## What I checked

**Script determinism (VERIFIED).** The weight-source investigation script computes guard tiers under three weight sources and reports 12 guard-tier differences and 4 value-only differences. The output matches MUSE's filed output exactly (read and compared line by line). The guard arithmetic G = 20*(1 − w_src/w_dst) with cuts 1/4/9 is correct.
Command: `python3 /tmp/weight-source.py` (needs flex.json at /tmp/weights/tools/mathlab/flex.json — script path is hardcoded)

**Measured ratios (VERIFIED).** The localWins20 measured ratios match MUSE's figures:
- C/OG: 0.3752/1.0001 = 0.375 ✓
- OLB/ILB: 0.3950/0.7934 = 0.498 ✓
- C/OT: 0.3752/1.2497 = 0.300 ✓
- OLB/SS: 0.3950/0.7887 = 0.501 ✓

**Guard computations (VERIFIED).** All 12 guard-tier differences and 4 value-only differences check out:
- OLB>ILB: owner 6 | sport-football G 6.67→tier 6 | slots.ts G 10.00→tier 12 | measured G 10.04→tier 12
- OLB>SS: owner 6 | sport-football G 6.67→tier 6 | slots.ts G 10.00→tier 12 | measured G 9.98→tier 12
- C>OG: owner 6 | sport-football G 10.00 | slots.ts G 12.50 (same tier 12)
- C>OT: owner 12 | sport-football G 12.00 | slots.ts G 14.00 (same tier 12)

**CRITICAL ERROR — slots.ts does NOT have C 150 / OLB 150 (VERIFIED).** MUSE's filing claims "slots.ts (C 150, OLB 150) is correct." The actual `colors/src/engine/slots.ts` (identical on current worktree and origin/council/muse, introduced in d7a05a27) has:
- C: weight **320** (not 150)
- OLB role: WILL weight **240**, SAM weight **30** (top = 240, not 150)
- OG: 290 (not 400), ILB/MIKE: 260 (not 300), OT: 430/400 (not 500), SS: 240 (not 300), FS: 260 (not 300)

MUSE's W_INPUT dict (C:150, OLB:150, OG:400, ILB:300, OT:500, SS:300, FS:300, etc.) matches NONE of the actual slots.ts values. It matches the measured ratios (chosen to fit them), not the engine's actual weights. The claim "the measured ratios match slots.ts exactly" is therefore FALSE — they match MUSE's W_INPUT, not slots.ts.

**sport-football.json does not exist (VERIFIED).** `git show origin/council/muse:tools/mathlab/sport-football.json` → not found. `find` across the worktree → no matches. MUSE quotes its `_weight` note verbatim but the file cannot be verified from the repo. The claim that sport-football.json has C 200/OLB 200 and a P-318 `_weight` note is UNVERIFIABLE from this seat.

**C 200 vs 150 tier impact (VERIFIED given MUSE's weights).** Using MUSE's weight values: C>OG (10.00 vs 12.50, both tier 12), C>OT (12.00 vs 14.00, both tier 12), C>DT (12.00 vs 14.00, both tier 12) — tier is unchanged, only guard value differs. This part is correct.

## Verdict reasoning

`improved`. The script's guard math, tier computations, and measured ratios are all correct and internally consistent. But the filing's central factual claim — that slots.ts has C 150 and OLB 150 — is wrong: slots.ts has C 320 and OLB via WILL 240/SAM 30. MUSE's W_INPUT values match the measured ratios, not actual slots.ts. And sport-football.json doesn't exist in the repo, so the comparison against it is unverifiable. The conclusion "slots.ts is correct, sport-football.json is stale" cannot be supported from the current codebase because slots.ts itself doesn't have the values MUSE claims.

The filing needs correction: either (a) update the weight values to match actual slots.ts (C:320, OLB:240 top), which would change the ratio comparisons and guard tiers, or (b) clarify that W_INPUT is a proposed/Target weight set, not the current slots.ts. Until corrected, the weight-source question is NOT settled — it needs re-measurement against actual slots.ts.

## Evidence labels
- Script guard math and tier arithmetic: VERIFIED (matches filed output)
- Measured localWins20 ratios (0.375/0.498/0.300/0.501): VERIFIED (computed from MEAS dict)
- "slots.ts has C 150/OLB 150": FALSE — actual slots.ts has C 320, OLB top 240
- "measured ratios match slots.ts": FALSE — they match MUSE's W_INPUT, not slots.ts
- sport-football.json C 200/OLB 200 with _weight note: UNVERIFIABLE — file doesn't exist in repo
- C tier-unchanged claim: VERIFIED given MUSE's weights (but weights are wrong)

## How to check
1. `grep -n "'C', weight" colors/src/engine/slots.ts` → expect C weight 320, not 150
2. `grep -n "'WILL', weight\|'SAM', weight" colors/src/engine/slots.ts` → expect WILL 240, SAM 30 (OLB role)
3. `find . -name "sport-football.json"` → expect no results
4. Compare MUSE's W_INPUT dict (C:150, OG:400, ILB:300, OT:500, SS:300, FS:300) against slots.ts → expect NO match
