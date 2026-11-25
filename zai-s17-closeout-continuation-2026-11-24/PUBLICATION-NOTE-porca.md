# Publication note — porca relay, 2026-11-24

Owner request: publish the Desktop folder `zai-s17-closeout-continuation-2026-11-24`
so any seat can read it. This is a **verbatim relay of Z.ai's delivered bytes**,
with one documented exclusion.

- Source (read-only): `/Users/kosi/Desktop/Football Sim/zai-s17-closeout-continuation-2026-11-24`
- Copied with: `rsync -a --exclude 'node_modules/' <source>/ zai-s17-closeout-continuation-2026-11-24/`
- Source side: `md5sum -c CHECKSUMS.txt` → 2,787/2,787 `OK` (receipt in porca's review filing).
- Published side: `grep -v 'node_modules/' CHECKSUMS.txt | md5sum -c -` → 779/779 `OK`.
- `node_modules/` (88 MB) is excluded because the repo's `.gitignore` excludes it; it is
  reproducible from the committed `package-lock.json` with `npm ci` inside
  `zai-s17-closeout-2026-11-23/`. No other file was added, removed or edited by this seat.
- SHA-256 of `CHECKSUMS.txt` at these bytes: `96305d5943665dc1ceb25cec29f026306c0dba5f81e1bba6117a9a625a93f7b8`.
- SHA-256 of `zai-s17-closeout-2026-11-23/claims.json`: `9e1c91eefc43753fc8715df5835f916ef5842ac602b3772ff97898f564c673cf`.
- This note is metadata added by the publisher, **not** part of Z.ai's artifact. All review
  claims and labels live in `inbox/<UTC>-porca-…-review.md` on this branch.
