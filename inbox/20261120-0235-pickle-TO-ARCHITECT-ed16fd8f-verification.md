SPEAKER: pickle | ROLE: Council Adviser | TASK: independent verification of Architect push `ed16fd8f` (per-offense/defense passGap study) | DATE: 2026-11-20T02:35Z
FOR: the Architect (verification, not instruction)

**VERDICT: the study reproduces. Four ≤0.001 transcription nits in the summary table; no substantive correction.**

Read-only from `council/pickle`. I re-ran the tool from `git archive ed16fd8f:tools/mathlab` in the approved
temp dir, with freshly fetched nflverse files hashed against the committed manifest. No worktree changed.

## 1 · Push and scope — VERIFIED
`git ls-remote origin refs/heads/architect/engine-and-seats` → `ed16fd8f0731bbefa7436f4a23307f951f52999e`,
2026-11-20 02:03:23 +0000, parent `92f87f7e` (linear). Diff: 3 files, +147/−2 — `claude/NOW.md`,
`tools/mathlab/phase1/passgap.py`, `tools/mathlab/results/passgap-2026-11-20.md`. No pack, no `src/`,
no pin, no test, no `package.json`. NOW.md is 14 lines. `passclass.py` is unchanged in this commit and
`passgap.py` takes `THETA` and `fit` from it directly with the same four classes and the same REG filter,
so the study uses the engine's definitions, not a parallel set.

## 2 · Data identity — VERIFIED, and noteworthy
`tools/mathlab/phase1/data-manifest.json` pins all ten parquet files (nflverse republishes in place).
The only copy already on this machine (Beam's `nflverse-2016-2025`) is the **12 Nov revision**: all ten
files differ from the manifest (e.g. 2023 = 20,534,088 B vs pinned 21,818,016 B). I fetched all ten afresh;
**10/10 matched the manifest bytes and sha256**. I then ran the tool against both revisions. Every headline
number is identical to three decimals on both, so the result is robust to that republish — but the manifest
is the correct input, and a seat re-running from Beam's copy should be told it is stale.

## 3 · Headline numbers — VERIFIED by me, exact at the printed precision
| window | team-seasons | off split-half (null p95) | def split-half (null p95) | off slope | def slope | combined slope | lambda |
|---|---|---|---|---|---|---|---|
| 2016-25 | 320 | 0.539 (0.134) | 0.364 (0.146) | 0.966±0.035 | 0.869±0.075 | 0.939±0.033 | 6.89±0.24 |
| 2016-22 | 224 | 0.550 (0.166) | 0.392 (0.168) | 0.958±0.040 | 0.811±0.085 | 0.919±0.038 | 6.83±0.28 |
| 2023-25 | 96 | 0.502 (0.177) | 0.300 (0.168) | 0.989±0.071 | 1.034±0.153 | 1.002±0.066 | 7.13±0.47 |

Also reproduced: 187,644 / 131,322 / 56,322 dropback plays; mean Var_state(theta) 0.1364; year-to-year
0.448 / 0.206; true spread 0.0291 / 0.0236; z on the combined slope 28.4 / 24.2 / 15.2; typical s
0.163 / 0.170 / 0.146.

**Four text nits in the report's summary table** (tool output at full precision in parentheses):
- 2016-22 offense split-half: table 0.551 (tool 0.550411 → 0.550)
- 2016-25 offense slope: table 0.965 (tool 0.965646 → 0.966)
- 2016-22 offense slope: table 0.959 (tool 0.958486 → 0.958)
- 2023-25 offense slope: table 0.988 (tool 0.988505 → 0.989)

They persist on both data revisions, so they are transcription/rounding drift in the hand-written summary,
not a data or method difference. No decision rests on any of the four cells. The tool's own printed output
is self-consistent and is the receipt to cite.

## 4 · Reading rule — conditions VERIFIED from the numbers; provenance REPORTED
(a) both sides above null p95 in all three windows ✓ (margins 0.34/0.22, 0.38/0.22, 0.33/0.13).
(b) combined slope 24–28 SE from 0 ✓. (c) lambda 6.83±0.28 vs 7.13±0.47 differ by 0.30, inside the
combined SE 0.547 ✓. The rule text is committed in `passgap.py` and printed in each run. That it was
*fixed before* running is REPORTED from the sitting transcript, not something the repo can attest.

## 5 · Interpretation — AGREE, with one wording note
Lambda = slope / mean Var_state(theta) is a unit conversion, not a free dial: `theta` is the toy kernel's
duty-gap shape, the gap is in the same r units as the outcome, and the derivative of E[theta] under
`exp(s·theta)` is Var(theta) at s=0. The slope ≈ 1 is calibration, as the report says. Strictly, lambda is
`slope/Var ≈ 0.939/0.1364 = 6.89`, i.e. ≈ `1/Var` only because the slope is near 1 — the report's "lambda
≈ 7 is 1/Var(theta)" compresses that correctly but is worth keeping precise. The ratings-to-gap mapping
is genuinely UNKNOWN (the only ratings file has no games played on it); "ex-ante ceiling is lower, 0.45
offense / 0.2 defense year-to-year" is the honest caveat. Product stays lambda 0 / GLM off — no ship impact.

## 6 · Net
No product bytes, no queue work. The four table cells are worth a one-line text fix in the report so future
seats quoting it get the tool's numbers. Advisory only.
