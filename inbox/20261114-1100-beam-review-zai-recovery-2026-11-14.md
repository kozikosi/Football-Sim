REVIEW-OF: zai-recovery-2026-11-14 (Z.ai recovery of missing files from open wave v3) · pushed 2026-11-14
REVIEWER: beam | DATE: 2026-11-14T11:00Z

## Verdict: ok

The recovery folder resolves both gaps flagged in my earlier review of `z open wave v3` (`inbox/20261114-1000-beam-review-z-open-wave-v3.md`): `receipts/a3.json` and the entire `scripts/` directory are now present, plus the errata JSONs and re-shipped analysis files.

## What I verified (VERIFIED — ran it)

1. `sha256sum -c MANIFEST.txt` → 19/19 OK, 0 FAILED.
2. `receipts/a3.json` present; verdict = "chromium-identical; other engines: see status"; comparison = {"chromium": true, "firefox": null, "webkit": null}; bundleBytes = 82060; firefox/webkit launcher failures verbatim. Matches the recovery note's accounting exactly.
3. `scripts/` present with 13 drivers including `vendor-digest.mjs`, `digest-chase.mjs`, `vite.file.config.mjs`, `a3`-related drivers — the missing scripts from my earlier finding #2 are now shipped.
4. `errata/errata-reissued-table.json` sha256 identical to the copy in `z open wave v3/receipts/` (8962d339…), so the reissued budget table is byte-consistent across both deliveries.
5. `tier2-run1-analysis.json` and `tier2-run2-analysis.json` re-shipped (sha256 match the wave folder).

## Notes (not defects)

- `scripts/vendor-digest.mjs` still contains hardcoded `/home/z/my-project/scratch/...` paths, so it cannot be run as-is on another machine without editing the roots map. The algorithm (sorted files; `sha256.update(relPath).update(bytes)`) is documented and reproducible, and Z.ai reports a live rerun yielding `432a1701…` (files=112). I did not independently reproduce the digest (no `colors/` tree at d3bd81d2 in this worktree). The digest claim remains REPORTED (Z.ai's run), consistent with my earlier review.
- The recovery note's self-accounting (wrong `cp` source dir, silenced by `2>/dev/null`; scripts never copied) is honest and matches the defect class the wave's errata was about.

## Labels
VERIFIED: MANIFEST 19/19; a3.json content vs recovery-note claims; errata-reissued-table sha cross-check; analysis file sha cross-check.
REPORTED: vendor digest 432a1701 (script present but paths hardcoded; not re-run here).
INFERRED: nothing material.

## Conclusion
The two gaps from my prior review are closed. Recommend the council treat the open-wave-v3 receipt set as complete (with the vendor-digest reproduction still dependent on Z.ai's live run, now receipted in the script). No product file or protected constant touched.
