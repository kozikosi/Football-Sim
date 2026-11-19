# Provenance — zai-cakepanz-10-2026-11-19

Hosted on `council/pickle` at the Owner's request (Kosi, 19 Nov 2026) so any seat can read Z.ai's
Cakepanz-10 / close-out-sitting delivery without depending on Z.ai's sandbox download link.

- **Source:** `/Users/kosi/Desktop/Football Sim/67-cakepanz-10-2026-11-19` (the Owner's shared tree;
  read-only, untouched).
- **Canonical zip:** `/Users/kosi/Downloads/z-post-blue-docs-update-2026-11-19.zip`, 754,277 B,
  sha256 `54b63123a7d4008870326f7c4b6d36335e1edadb7daf27d998bf0036e2a17555` — measured locally,
  byte-exact against the hash Z.ai reported in the relay (VERIFIED). It extracts to the folder root
  (no wrapper directory): `unzip` to a scratch dir, then `diff -rq` against the Desktop source →
  exit 0, no differences, 52 files both sides.
- **Source integrity:** the package's own `CHECKSUMS.txt` is MD5 format; `md5sum -c` → 49 OK / 0 FAILED,
  exit 0 (49 rows cover the payload; the manifest and the folder's own scratch files are outside it).
- **Copied to:** `_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/` (this branch), via `cp -a`.
  `diff -rq` of the Desktop source against the hosted copy → exit 0, no differences.
- **Hosted integrity:** `_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19.SHA256SUMS`
  (52 rows, sha256 `c3dfea71edb9eaece71ab24ab1e2904477301d2029879512e112b24dc411c2ab`);
  from the hosted dir `shasum -a 256 -c ../zai-cakepanz-10-2026-11-19.SHA256SUMS` → **52 OK / 0 FAILED,
  exit 0**.
- **Byte preservation in git:** the repo root sets `* text=auto`; the lane-scoped
  `_agents/pickle/deliveries/.gitattributes` was extended with
  `zai-cakepanz-10-2026-11-19/** -text` so no CRLF normalisation can alter the shipped bytes. Files
  are force-added (`git add -f`) where gitignore rules would otherwise skip them; staged blobs were
  checked byte-for-byte against the source before commit.
- **Author of the content:** Z.ai, not Pickle. Pickle only copied and hosted it byte-for-byte; the
  thorough review is a separate inbox filing. Nothing inside the delivery folder was edited.
- **What this package is:** the w89 close-out sitting — the `z-post-blue-docs-update-2026-11-19`
  docs update. Contents: the w89→Colors tools/framework report (46 KB), item-5 fit receipts, the
  workflow trio (START/END/ZAI.md), the c9 working-package diffs + regenerated manifests/receipts,
  UPDATE-README.md and CHECKSUMS.txt. It is the delta/update package, not the full 5,104-file c9
  tree (that tree is hosted separately at `zai-cakepanz-9-2026-11-19/` on this branch).
- **Ship state (Z.ai's report, REPORTED until re-verified):** wave 89 live, nothing shipped; k1
  composite green, c9 chain CLOSED per-tree; working dist `76de5658…` (527,162 B) UNRELEASED — the
  delivered artifact `670d4c08…` stands. Pickle's review re-checks the load-bearing claims.
