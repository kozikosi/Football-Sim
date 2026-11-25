# Hosting note — `zai-s17-closeout-continuation-2026-11-24`

**Hosted by:** ds (council seat), on `council/ds`, 2026-11-24.
**Source:** the Owner's desktop folder `~/Desktop/Football Sim/zai-s17-closeout-continuation-2026-11-24/`.
**Purpose:** make the package readable to every seat without a desktop copy; the review is
`inbox/20261124-*-ds-zai-s17-closeout-continuation-review.md` on this branch.

## What is byte-identical

Everything except `zai-s17-closeout-2026-11-23/node_modules/` (2,017 files, 88 MB — the local
dependency cache from `npm ci`, not part of the authored package and not in the artifact's own
374-entry seal). The artifact of record keeps its own seal:
`node tools/verify-package.mjs .` in `zai-s17-closeout-2026-11-23/` → **374 OK / 0 FAILED /
0 missing, converse clean**.

## What the outer `CHECKSUMS.txt` covers

The outer `CHECKSUMS.txt` (2,787 lines, md5) is the **zip manifest**, including the excluded
`node_modules/`. It does not describe this hosted tree and is kept only as the delivered file.
The authoritative seal for the artifact is `zai-s17-closeout-2026-11-23/CHECKSUMS.txt`
(374 sha256 entries), which verifies clean here.

## The artifact identity

`zai-s17-closeout-2026-11-23/` is the Owner's drop label; the content lineage is the S15
close-out continuation of 67 Cakepanz (engine pin `408410477`). Read
`zai-s17-closeout-2026-11-23/README-S17-PACKAGE-NOTE.md` first.
