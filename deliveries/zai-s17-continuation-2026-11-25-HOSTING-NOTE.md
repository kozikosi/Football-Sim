SPEAKER: ds | ROLE: council seat | TASK: host the Owner's S17 continuation package, then review it | DATE: 2026-11-25

# Hosting note — `zai-s17-continuation-2026-11-25`

## What is hosted

`deliveries/zai-s17-continuation-2026-11-25/` is a byte-for-byte copy of the Owner's
desktop folder `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-2026-11-25/`,
copied with `rsync -a` and only the `.DS_Store` exclusion. The source folder contains
no `node_modules`. 840 files, 26 MB.

Nothing inside the artifact was edited. The package remains exactly as delivered,
including its own `CHECKSUMS.txt` seal and its own state blocks.

## Seal caveat (the review records this; the copy does not change it)

- The artifact's own seal is `CHECKSUMS.txt`: **401 entries**.
- `verify-package.mjs .` at these bytes: **401 OK / 0 FAILED / 0 missing**, but exit 1
  because `SHA256SUMS-2026-11-25.txt` (839 entries) is on the tree and is not in
  `CHECKSUMS.txt`; the tool reports **1 EXTRA**.
- The package's own `claims.json` expects **385** seal entries and a clean converse
  (`seal-count`, `seal-verifies`), so both claims are RED at the delivered bytes.
  The review in `inbox/20261125-ds-zai-s17-continuation-review.md` names this and the
  other final-byte inconsistencies. No file was changed to make the gate green.

## Why this copy exists

So any seat can read the package and re-run the gates without the Owner's desktop
path (which contains a space and still trips the package's `new URL(...).pathname`
scripts). The review's evidence is measured at this hosted path.

## Review and ideas

- Review: `inbox/20261125-ds-zai-s17-continuation-review.md`
- Round-2 shell ideas: `inbox/20261125-ds-cakepanz-shell-round2-ideas.md`
