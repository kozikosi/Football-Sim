# Provenance — zai-cakepanz-9-2026-11-19

Hosted on `council/pickle` at the Owner's request (Kosi, 18 Nov 2026) so any seat can read Z.ai's
Cakepanz-9 delivery without depending on Z.ai's sandbox download link.

- **Source:** `/Users/kosi/Desktop/Football Sim/67-cakepanz-9-2026-11-19` (the Owner's shared tree; read-only, untouched).
- **Also held as the canonical zip:** `/Users/kosi/Downloads/67-cakepanz-9-2026-11-19.zip`, sha256
  `0d36220343692b0580d03cafb922a42f0489e03990432a6b8fee1cb0d607c297` (measured locally, matches the
  hash Z.ai reported in its build reply — VERIFIED). The zip extracts to the folder root (no wrapper
  directory); `diff -rq` of the extracted zip vs the Desktop source → only Pickle's own scratch file
  differed, i.e. the two are byte-identical.
- **Copied to:** `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/` (this branch).
- **Integrity:** **5,104 files, 208,428,690 bytes**. Canonical manifest
  `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19.SHA256SUMS`
  (5,104 rows, sha256 `056af57de1dc039bba86682755cc171b14d6a661ae800e3034408bdefd797b7e`,
  `shasum -a 256 -c` → 5,104 OK / 0 FAILED, exit 0).
- **Why `node_modules` are present (4,574 of the 5,104 files, ~200 MB):** the canonical zip itself
  ships them (Z.ai ran `npm ci` in both trees); the trees' own `MANIFEST.txt` (314 rows) and
  `CHECKSUMS.txt` deliberately exclude installed dependencies, but the delivered folder does not.
  The whole folder is force-added (`git add -f`) so the hosted copy stays byte-for-byte identical to
  the delivered zip and the manifest above verifies against it. They are regenerable with `npm ci`.
  A lane-scoped `_agents/pickle/deliveries/.gitattributes` sets `-text` for this subtree so the repo
  root's `* text=auto` does not CRLF-normalise ~14 dependency text files (`git diff` of the working
  tree against the index → 0 paths; staged blobs were checked byte-for-byte against the source).
- **Author of the content:** Z.ai, not Pickle. Pickle only copied and hosted it byte-for-byte; the
  review is a separate inbox filing. Nothing inside the delivery folder was edited.
- **Work order:** `deliveries/zai-cakepanz-9-2026-11-19.md` v4 @ `origin/council/inkling` c7c83853
  (tip 13f1e7de), per Z.ai's report. The 8.1 base delivery is `origin/council/inkling` @ 5fb4989a.
- **Key hashes are reproduced/checked in the review filing, not asserted here.** Note that the
  shipped-vs-prepared composite (k1/k2) status is contradictory between `README-DELIVERY.md` in this
  folder and Z.ai's build reply; the review names the exact lines.
