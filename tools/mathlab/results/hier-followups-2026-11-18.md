# After the hierarchy fix: totals bar, the class path, and why the oracle stopped reproducing the 2016-22 vectors (Architect, 18 Nov 2026)

Follows `hier-fix-2026-11-18.md` (`57fb83c`), in the council's order. A REPORT: nothing here gates a build. VERIFIED = run this session.

## 1. Totals bar on the fixed node (the number I owed)

`colors/tools/totals-bar.ts`, product pack `nfl-pools-fit2023-2025`, 20,000 games, same keys on the pinned tree (before) and the fixed tree (after). Real = held-out nflverse REG seasons from `phase1-reference-2026-11-15.json`; "real 23-25" is the mean of the three seasons.

| metric | before | after | real 23-25 | before vs real | after vs real |
|---|---|---|---|---|---|
| points / team-game | 23.40 | 23.25 | 22.56 | +3.7% | **+3.0%** |
| drives | 11.05 | 11.10 | 10.75 | +2.8% | +3.3% |
| plays | 75.02 | 74.92 | 73.98 | +1.4% | +1.3% |
| offensive plays | 61.03 | 61.06 | 60.58 | +0.7% | +0.8% |
| pass attempts | 34.18 | 34.21 | 34.98 | -2.3% | -2.2% |
| yards | 328.81 | 328.79 | 327.02 | +0.5% | +0.5% |
| sacks | 2.41 | 2.41 | 2.44 | -1.4% | -1.4% |
| giveaways | 1.11 | 1.12 | 1.20 | -7.3% | -6.4% |

Reading: **the −0.28 points/game does still match real, in the right direction** (+3.7% → +3.0% vs the 2023-25 mean; every row is inside the ~10% guideline). Drives moved the other way by 0.5 point (+2.8% → +3.3%): the fix gives back a few drives that used to be extended artificially, and those extra drives are short. Season by season the spread is the real drift, not the sim's: real points run 21.8 / 22.9 / 23.0 and giveaways 1.31 / 1.17 / 1.11 across 2023 / 24 / 25, so a single-season "gap" of −15% on giveaways (2023) is +0.6% against 2025. The sim sits at the recent seasons. No row is out of line that the fix touched. (Sim SD vs real SD: points 8.99 vs 9.92, 9% low, unchanged by the fix and the known variance budget of `phase1-baseline-2026-11-12.md`.)

## 2. The class path (`pickClassTuple`)

The council's concern: with no level holding `minClassPool` (25) plays of the class, `pickClassTuple` returns the coarsest level that exists, `(call)`, which merges downs. **Measured: it does not fire, on either pack, at any down.** `test/nfl/classpath.test.ts` weights every level-0 pass cell by the class plays it holds (exact mass, no sampling) and records which level served the read: the `(call)` level serves 0% of reads for every class at every down, in both eras. The `(call, down)` level always holds ≥ 25 plays of each class (4th-down interceptions, the thinnest cell, 69 weighted plays on the product pack, read from it 100% of the time). So on these packs the class path never merges downs; the risk is **latent** (a smaller era or a larger `minClassPool` would trigger it), and the test now has a tripwire for exactly that: it fails if any read falls through to `(call)`.

Outcome measured at the real class mix (passes only: runs never take this path, they use the plain node covered by `hier.test.ts`):

| | wrong-down reads | 4th-down resume without a first down |
|---|---|---|
| product pack, downs 1-3, any class | 0.00-0.34% | 0 |
| product pack, down 4 (comp / inc / sack / int) | 0.21 / 0.08 / 0.00 / 0.00% | same (= the real cells' own 0.25 / 0.17 / 0 / 0%) |
| 2016-22 pack, down 4 (comp / inc / sack / int) | 0.28 / 0.10 / **1.09** / 0.00% | same |

The one cell above 0.5% (2016-22, 4th-down sacks, 1.09%) is **the data, not the path**: 3 of the 198 real 4th-down sacks in that pack carry a chain that is not "next down or first down" (1.52% in the real cell itself). A fixed 0.5% bar would have failed on it, so the bar is relative: the path may not exceed its own real `(call, down)` class cell by more than 0.5 points. The planted old hierarchy is caught at 4th down on both eras (the falsifier). Whole games through the GLM class path (lambda 0, 3,000 matched-key games): 4th-down passes resumed without a first down **0.19%** (4,678 tries), runs **0.22%** (3,207), against the real 0.2% / 0.0%.

## 3. Why the oracle did not reproduce the committed 2016-22 vectors

**Cause: nflverse republished its release files in place after the packs were baked.** Evidence, in order of strength:
1. Single-play proof: in the 2016-22 clock cell `[oc 6, qtr 2, hs 300, sd -1]` the baked pack's pool holds one play with a clock delta of **7 s**; the same pool built from today's data holds that play at **3 s**. Same 100 plays, one value changed.
2. Re-baking the 2016-22 pack from today's data differs from the committed pack in exactly two places: the four late-clock tables, and one kickoff row (`kickoffs` 13,310 → 13,311; one `kick.n` 2 → 3). Nothing else (`call` and `rec` identical).
3. Re-baking the product pack (2023-25) from today's data is **byte-identical** to the committed pack (with the committed `--date`). The 2023-25 vectors regenerate **bit-for-bit**. So the product pack and its vectors were never affected.
4. The lab code did not move: no change to `pack.py`, `sim.py` clock/kick code, or `poolvectors.py` between the vectors' commit `5c80847` and `57fb83c` except my `rec` change; and the 12 Nov baseline note records the 2023 file as 20,534,088 B matching MUSE's manifest, while the file fetched today is 21,818,016 B.

I could not recover the old data, so (1) is the only cell I pinned (clock mode dt_f). The 22 differing `clockLate` entries are 11 states x 2 clock modes; the other 10 states share the signature (same pool sizes, different digests) and are consistent with a handful of revised timestamps, but I did not identify those plays individually.

**Repair, one clean generation (no splice on a splice):** the 2016-22 pack re-baked from the current data, and its vector file regenerated in full from the oracle; this replaces my earlier splice of `rec` into the old file. The golden pin's pack hash moved (`0b60973944ae13` → `1465418807480a`); that key's log hash, score and event count did **not** move.

**Prevention:** `tools/mathlab/phase1/data-manifest.json` records bytes and sha256 of the ten source files for this revision; `datacheck.py` verifies them; `bake.py` and `poolvectors.py` now stop on a mismatch unless `--allow-data-drift` (a tampered-file negative test exits 3). The rule when nflverse next changes the files: re-fetch, re-bake **every** pack, regenerate **every** vector file, update the manifest, one commit. CI cannot enforce this (it would need the 200 MB of data), so it is a manual gate in the lab, stated in the manifest's note.

## 4. Checks
419/419 tests (5 new in `classpath.test.ts`), tsc ratchet 89/89, `npm run build` passes. CI was green on `1aa7fb3`, `3363eb0` and `57fb83c` (checked, `gh run list`).
