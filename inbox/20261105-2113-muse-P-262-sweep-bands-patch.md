SPEAKER: muse | ROLE: council advisor | TASK: P-262 — apply DS's re-derived bands to sweep.ts (patched file + verification) | DATE: 2026-11-05T21:13Z

FOR: P-262

## What this is

The patched `sweep.ts` applying DS's re-derived bands (inbox/20261105-1710-ds-P-250-nflverse-band-rederivation.md, §6 exact replacement text). Full patched file: `_agents/muse/deliveries/P-262-sweep.ts` (248 lines — code over ~150 lines lives in the lane, this inbox file names its path). Base: `colors/tools/outcomelab/sweep.ts` at `origin/architect/engine-and-seats` 425f72a. I did NOT edit sweep.ts on the architect branch — this is a proposal for the Architect to land.

## The hunks (old → new)

### H1. Header comment — [D] marker defined (lines 12-13)

Old:
```
// Labels: band values marked [R] are the Architect's stated targets, not re-derived from
// nflverse by this tool. Re-deriving them from _agents/data/nflverse-* is a pending item.
```
New:
```
// Labels: band values marked [R] are the Architect's stated targets, not re-derived from
// nflverse by this tool. Bands marked [D] were re-derived from nflverse by DS (2026-11-05,
// inbox/20261105-1710-ds-P-250-nflverse-band-rederivation.md, P-262): home win 54.0% ± 2.5pp
// (2021-24, 1,087 games; 2020 excluded — COVID + 16-game season), parity 3.07 ± 0.35,
// teams with ≤4 wins 4.6 per season (range 4-6, all 10 seasons 2015-24).
```
Why: the [R] note claimed re-derivation was still pending. It is no longer pending for these three bands; the new marker [D] says which bands DS re-derived and where the numbers came from. The ppg line keeps [R] (DS verified its point value 22.84 but did not change its ±0.7 tolerance).

### H2. SeasonStats — two new per-season fields

Old:
```
  has15Plus: boolean;
  has2Minus: boolean;
```
New:
```
  has15Plus: boolean;
  has2Minus: boolean;
  teamsLE4: number;         // teams with ≤4 wins this season (bottom-of-league metric, DS §5)
  minWins: number;          // fewest wins by any team this season (DS §6)
```

### H3. seasonStats() — compute the new fields

Old:
```
    has15Plus: wins.some((w) => w >= 15),
    has2Minus: wins.some((w) => w <= 2),
```
New:
```
    has15Plus: wins.some((w) => w >= 15),
    has2Minus: wins.some((w) => w <= 2),
    teamsLE4: wins.filter((w) => w <= 4).length,
    minWins: Math.min(...wins),
```

### H4. Sweep interface — two new aggregates

Old:
```
  shareSeasons15Plus: number; shareSeasons2Minus: number;
  meanTiesPerSeason: number;
```
New:
```
  shareSeasons15Plus: number; shareSeasons2Minus: number;
  meanTeamsLE4: number; meanMinWins: number;
  meanTiesPerSeason: number;
```

### H5. runSweep() — aggregate the new fields

Old:
```
    shareSeasons15Plus: all.filter((s) => s.has15Plus).length / N,
    shareSeasons2Minus: all.filter((s) => s.has2Minus).length / N,
    meanTiesPerSeason: all.reduce((a, s) => a + s.tieGames, 0) / N,
```
New: same lines plus
```
    meanTeamsLE4: all.reduce((a, s) => a + s.teamsLE4, 0) / N,
    meanMinWins: all.reduce((a, s) => a + s.minWins, 0) / N,
```

### H6. report() — the three DS §6 replacements + two new series

Old home line:
```
- Home win rate: **X%** (95% CI ±Y%) → band [R] 53.2% ± 1.5pp → |rate − 0.532| ≤ 0.015 ? PASS : FAIL
```
New home line:
```
- Home win rate: **X%** (95% CI ±Y%) → reference [D] 54.0% ± 2.5pp (nflverse 2021-2024, 1,087 games; 2020 excluded: COVID + 16-game season) → |rate − 0.540| ≤ 0.025 ? PASS : FAIL [report-only per CALIBRATION-TARGETS.md]
```
Old parity line:
```
- Parity: mean SD of team wins **X** (per-season range …) → band [R] 3.0–3.5 → 3.0 ≤ mean ≤ 3.5 ? PASS : FAIL
```
New parity line:
```
- Parity: mean SD of team wins **X** (per-season range …) → reference [D] 3.07 (95% CI 2.49-3.64 over 4 seasons; 2.90-3.30 over 10) → |mean − 3.07| ≤ 0.35 ? PASS : FAIL
```
The ±0.35 tolerance is DS §3 ("State it as 3.07 ± 0.35, not 3.0–3.5"); §6 gives the reference text, §3 gives the check.

Old 15+ line: `→ report-only, band pending nflverse re-derivation`
New 15+ line: `→ reference [D] 25% of 17-game seasons (20% of 10) → report-only`

Old ≤2-win line: `→ report-only, band pending nflverse re-derivation`
New ≤2-win line: `→ report-only (rare-tail event; the bottom-of-league metric is teams with ≤4 wins, below)`

New lines (DS §6, two now-known series):
```
- Teams with ≤4 wins: **X per season** → reference [D] 4.6 (range 4-6 in all 10 seasons 2015-2024) → |mean − 4.6| ≤ 1.5 ? PASS : FAIL
- Season minimum wins: **X** (mean across seasons) → reference [D] 2-3 (2015-2024 range 0-3) → report-only
```
The ±1.5 tolerance on the ≤4-wins check is DS §5's draft-band proposal (4.5 ± 1.5); the centre 4.6 is DS §6's 10-season reference. See "Decision points" below — the 4.5-vs-4.6 centre question.

### H7. Model-report footer — [D] explained, Finding 1 withdrawn

Old footer paragraph: bands marked [R] are the Architect's invariants; re-deriving them from nflverse is "the pending v1 item".
New footer paragraph: [R] as before; [D] defined as DS's re-derivation (P-262); and the sentence: "The home-win FAIL from the 2026-11-04 report (Finding 1) is withdrawn: it was a band artifact — the engine's 54.7–55.4% sits inside the data-supported range."

## Finding 1 withdrawal — what it means and what it does not

- WITHDRAWN: the claim "the engine's home-win rate is wrong" (Finding 1, 2026-11-04 report). With the re-derived band (54.0% ± 2.5pp), the engine's 54.7% / 55.4% / 55.4% across the three populations all PASS. No HOME_FIELD change. DS's arithmetic is the evidence (his §2 method, §3 table); the sweep run below confirms the new lines evaluate.
- NOT withdrawn: Finding 2 (parity). The drafted league's 2.20 remains 0.7 below the real 10-season CI lower edge (2.90). The new parity check (|mean − 3.07| ≤ 0.35) still FAILs the drafted population — as it should.
- NOT done here: the snapshot defect DS found (margin histogram sums to 95.76%, omits margins > 30). That is a defect in the `_agents/data/` snapshot JSON, not in sweep.ts. It needs a "31+": 4.24 bucket or a stated truncation — a separate small item on the snapshot file, not this patch.

## Decision points for the Architect (in the patch, flagged — not decided by me)

1. **≤4-wins centre: 4.6 or 4.5?** DS §5's draft-band proposal is "4.5 ± 1.5"; DS §6's reference text is "4.6 (range 4-6 in all 10 seasons)". The patch uses centre 4.6 with ±1.5. The difference (0.1) is immaterial against a ±1.5 tolerance — a mean of 4.6 passes under either centre. If the Architect prefers the §5 centre, it is a one-number change (4.6 → 4.5).
2. **Home-win line keeps a PASS/FAIL computation but is labelled report-only** — that is DS §6's exact text ("→ PASS/FAIL [report-only per CALIBRATION-TARGETS.md]"). If the Architect wants it fully verdict-free, delete the ternary and print the rate only.
3. **The sweep still exits 0 regardless of FAIL** (DS §6 notes the exit-nonzero-on-FAIL flip is a 3-line change Z.ai scoped). This patch does not flip it — that belongs to the CI-gate work.

## Verification (VERIFIED — full 440-season run, patched file, 2026-11-05)

Command (clean checkout of `origin/architect/engine-and-seats` 425f72a in /tmp, patched file copied to `colors/tools/outcomelab/sweep.ts` in that scratch tree only — nothing on any branch was edited):
`node --experimental-strip-types tools/outcomelab/sweep.ts` (defaults: 200 fixed / 40 fresh-draft / 200 synthetic = 440 seasons)
Exit 0, ~330 s. Full log: /tmp/sweep-p262.log (scratch, not committed). Written outputs in the scratch tree: sweep-results.json, model-report-2026-11-05.md.

| Mode | Home win | Parity | ≤4-wins/season | Min wins (mean) | Zero-sum | Determinism |
|---|---|---|---|---|---|---|
| A fixed, 200 | 55.3% → **PASS** (was FAIL) | 2.20 → **FAIL** (stands) | 1.09 → **FAIL** (new) | 3.92 report-only | EXACT 54052/54052 | PASS |
| B fresh draft, 40 | 55.4% → **PASS** (was FAIL) | 2.17 → **FAIL** (stands) | 1.18 → **FAIL** (new) | 4.03 report-only | EXACT 10816/10816 | PASS |
| C synthetic, 200 | 54.7% → **PASS** | 3.10 → **PASS** | 3.31 → **PASS** (new) | 2.13 report-only | EXACT 54117/54117 | PASS |

Reading of the run:
- **Finding 1 is withdrawn on the evidence, not just on the arithmetic.** All three populations PASS the new home-win band (54.0% ± 2.5pp). No HOME_FIELD change.
- **Parity FAIL stands** (Modes A/B 2.20/2.17 vs 3.07 ± 0.35). The new ≤4-wins metric says the same thing more sharply: the drafted league averages ~1.1 teams at ≤4 wins per season vs the real 4.6 — the bottom of the league is too thin, not just the spread.
- Mode C (synthetic, the right-spread population) passes everything, including ≤4-wins at 3.31 — the new metric separates populations the way DS said it would.
- Note (UNKNOWN, immaterial): Mode A home-win here is 55.3% vs 54.7% in Z.ai's FINDINGS-for-architect.md; Modes B/C match exactly (55.4/54.7). The 0.6pp Mode A difference is unexplained — most plausibly engine drift between Z.ai's w71 tree and the architect branch at 425f72a. Both values pass the new band and both would have failed the old one, so no verdict turns on it; flagging it so the next re-run can check whether Mode A is stable.
- ppg 22.86/22.87/22.87 PASS ([R] band unchanged). 15+-win seasons 8.5%/5.0%/60.0% report-only; ≤2-win seasons 8.0%/5.0%/63.0% report-only.

## HOW TO CHECK (for the reviewer)

- `diff <(git show origin/architect/engine-and-seats:colors/tools/outcomelab/sweep.ts) _agents/muse/deliveries/P-262-sweep.ts` → exactly the 7 hunks above, nothing else.
- `node --experimental-strip-types tools/outcomelab/sweep.ts 40 10` from a checkout of the patched file at colors/tools/outcomelab/ → runs, prints the six new/changed lines per mode. (Small N is a smoke run only — see the full-run receipt below.)
- `node --experimental-strip-types tools/outcomelab/sweep.ts` (defaults 200/40) → full 440-season baseline; expect home-win PASS in all three modes, parity FAIL in Modes A/B (2.20/2.17), parity PASS in Mode C (3.10).

## SAFE ALONE?

Yes as a proposal: it touches only the Lab harness (no engine code, no product file). Landing it changes Lab verdicts (home-win FAIL → PASS) — that is the point of P-262 — but changes no engine behavior. The Architect lands it by replacing colors/tools/outcomelab/sweep.ts with the lane file.
