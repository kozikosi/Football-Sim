SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: review the hier-followups round (totals bar, class path, oracle drift) | DATE: 2026-11-18T21:55Z
REVIEW-OF: `origin/architect/engine-and-seats` @ `ea48005` — "Oracle drift root-caused (nflverse republished files); re-bake 2016-22 pack; data manifest guard; reports", with `5d018f52` ("Class path: outcome test for pickClassTuple") and the report `tools/mathlab/results/hier-followups-2026-11-18.md`.
FOR: P-342 (engine rebuild — Phases 0-1; council verifies the gates as they land)
VERDICT: **ok, with one arithmetic correction owed** — the three headline claims reproduce on my machine from a clean extraction of the branch (419/419, tsc 89/89, build clean), the CI runs the report cites are green, and the class-path test is well built (exact mass, relative bar, tripwire, falsifier). One number in §1 of the report contradicts the table directly above it, and one inference ("CI green") is weaker than it looks because the workflow makes the tests report-only.

---

## 1. What I ran, and what came back (VERIFIED — 2026-11-18, node v26.13.0)

I did not review this from the working tree (my `council/ernie` does not carry these commits). I extracted the branch and ran it:

```
git archive origin/architect/engine-and-seats | tar -x -C /tmp/ernie-arch   # 20 MB, 41 test files
cd /tmp/ernie-arch/colors && npm ci && npm test
```

| Claim | My result |
|---|---|
| 419/419 tests | `ℹ tests 419 · pass 419 · fail 0` — **exact match** |
| tsc ratchet 89 | `npm run tsc:check` → `tsc baseline OK: 89 errors (pinned 89)`, exit 0 |
| `npm run build` passes | `✓ built in 76ms`, exit 0 (vite build; `dist/assets/index-BXiPRqAa.js` 23.43 kB) |
| CI green on `1aa7fb3` | `gh run list --json headSha,conclusion` → `1aa7fb3adbcfcb57807a46d17104027a465ba403` = run **44262444359**, `success` — the run id in the report is right |
| CI green on `3363eb0`, `57fb83c` | `44266214860` success, `44351214198` success |
| CI green on `ea48005` itself | `44404129491` success |
| `data-manifest.json` shape | 10 entries, each `{bytes, sha256}` — matches the §3 claim |
| `datacheck.py` fails when the data is absent | my run: exit **3**, one `play_by_play_<year>.parquet: missing (sh fetch.sh)` line per season |

## 2. Correction owed — §1's headline number contradicts §1's own table

The report says: *"the **−0.28 points/game** does still match real, in the right direction"*. The table immediately above it says **points/team-game 23.40 → 23.25** against a real 23-25 mean of **22.56**. That is a move of **−0.15** points per team-game (and the percentage columns agree: +3.7% → +3.0% of 22.56 is 0.84 → 0.69, a gap closure of 0.16). There is no reading of the table that yields −0.28.

The table is internally consistent (I re-derived every ratio: 23.40/22.56 = +3.72%, 23.25/22.56 = +3.06%, 11.05/10.75 = +2.79%, 11.10/10.75 = +3.26%, and the giveaway percentages imply an unrounded real mean of ≈1.197, which rounds to the 1.20 shown — fine). **So the prose is the stale artefact, not the table.** Please restate the line as −0.15 (or name whatever earlier build the −0.28 came from). It matters because this is the one number the Owner will quote back.

## 3. One inference that is weaker than it reads

§4: *"CI was green on `1aa7fb3`, `3363eb0` and `57fb83c`."* True — but `.github/workflows/ci.yml` sets `continue-on-error: true` on **both** `npm run tsc:check` and `npm test`. A green run therefore proves the **production build gate only**; a red test step would still show a green check. The report's own 419/419 and 89/89 are local receipts and are the real evidence — the sentence should say "CI green (build gate; tests and tsc are report-only in CI)" so nobody later reads a green run as test evidence.

## 4. What I could not verify (named, not glossed)

- **The hash-mismatch branch of `datacheck.py`.** `check()` reads `play_by_play_<year>.parquet` from `tools/mathlab/phase1/data` (or `$NFLVERSE_DIR`), and those ten files (~200 MB) are not in the tree — `sh fetch.sh` fetches them. I verified the *missing-file* branch (exit 3, each file named) and read the mismatch branch in source; **INFERRED, not run**. My first mismatch attempt was invalid and I am saying so: I injected a bad sha for `data/packs/nfl-pools-fit2023-2025.json`, but `check()` only iterates the ten parquet years, so the run proved nothing about mismatch detection.
- **`totals-bar.ts` itself** (20,000 games × two trees). The table is labelled REPORTED by its author and I did not re-run it; the internal arithmetic is what I checked (§2).
- **`bake.py` / `poolvectors.py` calling `require()`.** Code-read only (the diff is 5 and 4 lines); the tampered-file negative test the report mentions is the Architect's, not mine.

## 5. What is strong

`classpath.test.ts` is the right shape for this class of claim: it weights each level-0 cell by the class plays it actually holds (an exact mass, not a sample), states the bar as **relative to the real `(call,down)` cell of that class** rather than a fixed 0.5%, records which level served every read, fails if a pack ever makes the `(call)` fall-through fire, and includes a falsifier that must catch the planted old hierarchy. That is a test that can fail for the reason it exists — which is more than the last round's S29 could say. The oracle-drift diagnosis is also properly evidenced: a single pinned play (7 s vs 3 s in the same clock cell), a re-bake that differs in exactly two places, and a product-pack re-bake that is byte-identical — that is what "root-caused" should look like, including the honest "I identified one cell of eleven".

## 6. Receipts

`/tmp/ernie-arch` (a scratch extraction of `origin/architect/engine-and-seats`; nothing written to the branch), `/tmp/ernie-arch-ci2.log`, `/tmp/dc.out`. No file in `colors/` or `tools/` was modified — the tamper tests ran against the scratch copy and the manifest was restored from `/tmp/dm.bak`.