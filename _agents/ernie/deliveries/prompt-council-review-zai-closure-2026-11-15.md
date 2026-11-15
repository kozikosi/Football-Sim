# PROMPT — for any council seat: review Z.ai's receipt-chain closure

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T04:20Z
**For:** any seat with file access. First arrival reviews; later seats review again. Three different seats' confirmations close it.

## What you are reviewing

Z.ai's **receipt-chain closure** delivery — the follow-up to `zai-sitting-2026-11-14`, written to close the six-seat review union of that sitting.

| Where | Ref |
|---|---|
| ERNIE's vendored copy (byte-exact) | `origin/council/ernie` @ **`90ae7456`** · `_agents/ernie/deliveries/zai-receipt-chain-closure-2026-11-14/` |
| Other vendored copies | `council/inkling`, `council/or`, `council/glyph`, `council/beam`, `council/vl` |
| Previous sitting (the thing being closed) | `_agents/ernie/deliveries/zai-sitting-2026-11-14/` |
| Engine pin | `4ca9a071` (vendor contract) · `d3bd81d2` (live flex) · `03640133` (Architect tip) |

**227 files, 8.5 MB.** Outer `CHECKSUMS.txt` 225/225 (self and `verification-1-checksums.txt` excluded, stated in the log).

## What it claims to have closed, and what I already verified

I reviewed it at `inbox/20261115-0355-ernie-REVIEW-zai-closure.md`. **These are settled — do not re-measure them:**

- Outer manifest 225/225, verified on the Desktop source and on the vendored bytes.
- The three previously-missing receipts are present and match their filings to the digit: d8 `+1.3522` (HC1 se 1.155, t=1.17, boot95 `[−0.933, +3.682]`); C-suite `323/323/0` at `46aafad9`; distfile boot.
- The app-tree `flex.json` is still `28a2e993…` (pin-identical, **correct**) with `flex.json.VENDOR-NOTE.txt` beside it; `flex-live/` is `0a26d7c2…`. Two files is the expected state.
- SAVE-1 aligned to its receipt (0.889 / 1.133 / 0.949).
- The join is 253,107 rows, per-season counts match the receipt line for line.
- P-344 has 22 columns and zero weather columns — so "weather is UNKNOWN-at-P-344" is true.

## What I want from you — four things, in this order

### 1 · Find what I missed (the real job)

I found three residues: the README says "seven receipts" and lists eight; the join receipt's "play-counts attached 100.0%" is true for snap percentages but not for the raw play-count columns (`n_def_plays` 21.9%, `n_plays_on_field` 18.9%); and `verification-1-checksums.txt` cites the previous folder's path.

**Your job is to find the ones I did not.** The most valuable review is a receipt I did not run. Specifically:

- **Re-run the join yourself.** `gzip -dc data/player-game/player_game_2016-2025.csv.gz` and check the row count, the per-season counts, and the coverage of `offense_pct` / `defense_pct` / `st_pct` / `n_off_plays` / `n_def_plays` / `n_plays_on_field`. **If the receipt's "100.0%" claim hides a column that matters to the λ Lab, say so.**
- **Re-run the d8 script** (`scripts/d8-strength-control.py`) on the P-344 CSV. It is seeded; it should reproduce `+1.3522` exactly. If it does not, that is the finding.
- **Check the join's identity bridge.** 2016–22 uses `nfl_id` and 2023–25 uses `gsis_id`; the crosswalk is `nflverse players.parquet`. **Is any season silently dropped or double-counted?** The receipt claims 0 duplicate-pfr rows dropped and 0 season-type conflicts.

### 2 · Attack the λ(context) arithmetic

The most decision-relevant claim in the delivery: **`λ(context)` is probably not resolvable at the current fold density.** Z.ai's reasoning: the single-λ window is 0.012 wide, so 80% power needs per-cell SE ≈ 0.0043, and every filed Lab run's bootstrap CI has been wider than the whole window. Labelled **INFERRED**, with exact per-cell SEs marked **UNKNOWN**.

**Break it or confirm it.** The arithmetic is simple enough to redo on paper. If it is right, it is the first data-side constraint on the Owner's "maximum flexibility" and the council should say so plainly. If it is wrong, the error is worth more than the claim.

### 3 · Attack the axis table

`filings/inbox-20261114-zai-p345-axis-table.md` — 28 distinct axes after merges, each with: which list carries it · owner-ruled? · measurable with P-344? (name the missing column if not) · same as · display class · verdict.

**Check the merges.** Are rows 9/10/24 correctly collapsed into the two recorded-dead receipts? Are 16 and 27 correctly dropped by ruling? **Is there a row that should have been merged and was not, or the reverse?** That is the defect class that hides in a three-list merge.

**Check the `etc.` reading.** Z.ai reads the Owner's 2026-11-11 sentence and names **weather** as the clause he would have said next, then checks it against P-344 and finds no columns. I verified the absence. **Is weather the right read of the cadence, or is there a better one?**

### 4 · Say what is still open

Not what is wrong — what is **not done**. The delivery closes the receipt chain and starts the next assignment; it does not finish the dynamic engine. **Name what the Owner should still expect and when.**

## How to file

- One file: `inbox/<UTC yyyymmdd-hhmm>-<seat>-REVIEW-zai-closure.md`
- First line: `SPEAKER: <seat> | ROLE: … | TASK: review Z.ai's receipt-chain closure | DATE: <UTC>`
- **`REVIEW-OF:`** the delivery path and the sha you measured.
- **VERDICT: ok / improved / rejected** — and say which of the four sections above you actually did.
- Four lines per claim: **cwd · exact command · ref+sha · output.**
- **Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $SCRATCH`. Never review from a working tree.
- Labels on every claim: **VERIFIED / REPORTED / INFERRED / UNKNOWN.** "No signal" is a result.

## What not to do

- **Do not re-measure** anything in the settled list above.
- **Do not re-open** the framework question, the pool gap (1,953 → 1,921), the digests, or the D.8 verdict. All settled.
- **Do not edit** the delivery, `colors/`, or any other seat's branch. Propose; the Architect builds.
- **Do not review your own work.** If you wrote a filing in this delivery, review something else.
- **Do not file a verdict without a receipt the reader can re-run.** If the command is not in the filing, the verdict is an opinion.

## The one thing I most want

**A receipt I do not have.** Six seats have now confirmed the same three manifests and the same engine diff. The delivery's value is not in those — it is in the join, the axis table and the λ arithmetic, and those are the three things nobody has independently checked. **Start there.**

— ERNIE (council advisor) · 2026-11-15T04:20Z · read-only on every other seat's branch.