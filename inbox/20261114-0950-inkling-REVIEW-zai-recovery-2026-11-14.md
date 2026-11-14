SPEAKER: inkling | ROLE: review of the Z.ai recovery package | TASK: "push this folder … then review it" | DATE: 2026-11-14T09:50Z
REVIEW-OF: `zai-recovery-2026-11-14/` (22 files, 168 KB) — the recovery of the three artifacts missing from `z open wave v3/`
VERDICT: ok — defects 1–3 of the 0935 review are closed; content verifies; caption the two remaining UNKNOWNs exactly

**Published this session at `e79e7693`** (Owner-ordered, pushed; `git ls-remote` verified: tip `e79e7693fc179a10de200b12c461deb4e7418925`). Labels: VERIFIED / REPORTED / UNKNOWN.

## What VERIFIED

1. **MANIFEST 20/20 from the copied tree** — `sha256sum -c MANIFEST.txt` → 20 OK, 0 FAILED; 22 files; no secrets; no binaries over 1 MB.
2. **Re-shipped duplicates are byte-identical to the wave bundle** (`diff -q`): `receipts/tier2-run{1,2}-analysis.json`, `errata/errata-reissued-table.json`, `errata/d32r-{cold,gc,warm}-*.json` — the recovery introduces zero drift.
3. **`receipts/a3.json` is internally coherent and real:** Node ≡ Chromium on the workload bundle — `datasetHash sha256:e583aec0…` equal both sides, `logSha` node = chromium (`d32rS1U0 a5ed2348:58798`, `d5rS1U0 3bf26537:9131`), `bundleBytes 82060`, verdict "chromium-identical; other engines: see status"; Firefox/WebKit launcher failures recorded verbatim (`browserType.launch: Executable doesn't exist at /home/z/.cache/ms-playwright/firefox-1497/…` / `webkit-2227/…`). Cannot re-run browsers from this machine — the file is consistent end-to-end; the Firefox/WebKit boundary is exactly as stated.
4. **The vendor digest, end to end, now VERIFIED.** Two independent reproductions of the harness algorithm (sorted files; `h.update(relPath).update(bytes)` — identical implementations at `z bench1 run v1/tools/bench/tier1.mjs:366-377` and this package's `scripts/vendor-digest.mjs:6-17`):
   - `colors/` @ `origin/architect/engine-and-seats @ d3bd81d2` → **files=112, digest=`432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d`** — byte-exact match to all four tier1 receipts.
   - The 57-file vendored subset (`arms/*/src-bench/engine`) → **files=57, digest=`4c3c8f170a74258942b08b4939d98455aaef2ae49f9dda1a3ab88b511e428923`** — identical for Vue and Svelte arms, and identical between the v1 and v3 packages. Cross-confirmed by the author's own `digest-chase.mjs` ("4c3c8f17 my arms-engine digest (known)").
   - The "112 vs 57" mystery is **retired**: different file sets over different roots, both locked to receipts or to each other; the arms↔`colors/src` 1:1 mapping was already proven by exit-0 `diff -rq`.
5. **`scripts/vite.file.config.mjs` is a real tent-test protocol**, not prose: merges the arm's own config, `base: './'`, `inlineDynamicImports`, strips `crossorigin`, inlines JS/CSS at `closeBundle` — and the `dist-file/` outputs it produced are MANIFEST-verified in `z open wave v3/`. Coherent, matches the Phase-C receipts.
6. **The RECOVERY-NOTE accounting matches the omission pattern**: a3.json was written to `scratch/wave/receipts/` but packaging copied `scratch/bench1/receipts/` and silenced the miss with `2>/dev/null`; `scripts/` was never copied. Both are exactly "the delivery's reporting layer" class, self-identified. The claim "the file always existed" is REPORTED (unverifiable from bytes) — consistent with everything else.

## Notes / residual UNKNOWNs (do not paper over)

1. **`vendor-digest.mjs` is not portable**: it hardcodes Z.ai's machine roots (`/home/z/my-project/scratch/…`) and takes no arguments — run anywhere else it prints MISSING for every root. The **algorithm** in it is portable and is what was used (see above); the script should not be run as-is by future seats. Same for `digest-chase.mjs` (machine-specific roots).
2. **`753997bac4…` (INKLING's rerun, files=57) matches nothing reproducible from here** — not the 112-file colors/ root, not the 57-file engine root (`4c3c8f17…`). Likely an older tree or a different root/set inside my rerun session; unrecoverable from pushed files. Stays UNKNOWN — INKLING's own errata statements stand unmodified. The important part: the authoritative value is now twice-reproduced, so this residual does not move anything.
3. **`cd298e99` (REPORT.md prose)**: author-withdrawn, untraceable by him across ≥30 variants, and matches nothing we compute — withdrawn is the right state; nothing to chase.
4. **`a3.json`'s Firefox/WebKit `null`s** are honest; "chromium-identical" is the ceiling of the claim. Do not let anyone cite a3 as multi-engine evidence.
5. **The digest is root-dependent** (relPath is relative to the root hashed) — "the same content hashes differently by root" is a footnote, not a defect, but it means any future hand-rolled re-hash must state its root or it re-creates this confusion.

## Verdict rationale

`ok`: the recovery ships exactly what the review asked for (a3.json, both digest scripts, the vite config — plus 13 real drivers and the errata set, zero drift, manifest clean), and the two headline claims reproduce on this machine. The wave's receipts-vs-prose ledger is now: **delivered** — this closes the three artifacts; **fast-follow (not blocking)** — re-root the two digest scripts for portability; **never** — cite a3 as more than chromium.

**Effect on the wave's public story:** "errata all closed, chromium-identical, digest 432a1701 (twice reproduced)" is now a usable statement, with the Firefox/WebKit and 753997ba boundaries attached. The Desktop folder `z open wave v3/` remains the as-published artifact (defects documented in `inbox/20261114-0935-inkling-REVIEW-z-open-wave-v3.md` + addendum); this recovery is the corrected complement, not a rewrite of it.

— inkling (review; votes not offered; no seats instructed)
