# README-S17-PACKAGE-NOTE.md — the package identity + lineage note (the porca/pickle finding)

**Why this page exists:** the delivery folder is named `zai-s17-closeout-2026-11-23` while its
content lineage is the **S15 close-out continuation** of the 67 Cakepanz shell. The name is the
Owner's local drop label; the content is not a new engine sitting. Reviews (porca §1, pickle §2,
ernie F4) asked for one page that says exactly what is what, so no auditor has to reconcile prose
against bytes again. Read this page FIRST, then README.md.

## The lineage, in five lines

1. **Content lineage:** 67 Cakepanz shell — the S15 close-out (2026-11-21) continued by the
   2026-11-22 v3-order sitting, then completed and packaged on 2026-11-23 (the "run 4" bytes),
   then carried into the 2026-11-24 review-consolidation sitting, then into the 2026-11-25
   S17-continuation sitting (Wave A: the evidence layer made true). Every README block below the
   generated state block is a HISTORICAL sitting record, kept verbatim per the receipt law.
2. **The folder name:** `zai-s17-closeout-2026-11-23` (inside the Owner's outer drop label
   `zai-s17-closeout-continuation-2026-11-24`) is the Owner's drop label (porca: "local drop
   label/date wrapper"). It does NOT name a new engine pin or a new sitting number in the shell's
   own ledger. The shell's ledger names are S15 (close-out) → S15 continuation → review-
   consolidation pass → this S17 continuation.
3. **The artifact of record:** the continuation package mirrored read-only at `council/pickle`
   commit `c0872803130ea6a4a193e43d753c6acf42663b20` ("pickle: publish
   zai-s17-closeout-continuation-2026-11-24 artifact for review (2787 files, md5 -c clean)") and
   on `council/hy4@873a9f742` and `council/porca@097f38bee`. Measured on that mirror: 781 git
   files under the continuation folder; the outer `CHECKSUMS.txt` covers 2,787 zip entries
   (`md5sum -c`: 779 content files OK + 2,008 `node_modules` entries that exist only in the zip,
   not in a git tree); the checksum file's own sha256 is
   `96305d5943665dc1ceb25cec29f026306c0dba5f81e1bba6117a9a625a93f7b8`. The inner seal at the
   continuation bytes is **374 entries** (`node tools/verify-package.mjs .` → 374 OK / 0 FAILED /
   0 missing + converse clean). The seals, gates and receipts inside describe THESE bytes; the
   2026-11-25 sitting's reseal names its delta in the claims list (`seal-count`).
4. **The engine pin:** `408410477` (stamp `nfl1.1ac56c28928eff`, 69 TS files), frozen snapshot,
   five-path fence — unchanged through every sitting named above. SNAPSHOT.md is the contract.
5. **What supersedes what:** the 2026-11-23 bytes (run-4 receipts, 370-entry seal) supersede all
   earlier prose; the 2026-11-24 sitting's corrections (boot docs regenerated, side-by-side
   re-driven with the non-vacuity contract, machine-checkable claims, content-based freshness,
   the zip-claim retraction) supersede the 2026-11-23 prose; the 2026-11-25 S17-continuation
   sitting's Wave A (the acceptance composite finished to its real COMPLETE marker with an
   `--resume` ledger + sealed `receipt-attestation.json`, the node-battery receipt refreshed to
   the live 37/37, `freshness.json` + the generated state blocks, the promoted agreement claim,
   the structured non-vacuity check, the R-13-label rename) supersedes the 2026-11-24 prose. The
   review findings of record are the four seat reviews of 2026-11-25 (ernie / hy4 / porca /
   pickle) synthesized in the S17 work order.

## The data-sensitivity note (travels with the package until the cutover ruling)

This tree carries `data/nfl/madden27-ratings.csv`, `data/nfl/free-agents-old-ratings.csv` and
`data/nfl/player-ids.csv`, plus the pools packs (`data/packs/`). The Owner allowed the
pre-migration push to the public `kozikosi/Football-Sim` branch (2026-11-23, "we havent migrated
yet"). **The clean public 76 Pancakes cutover must NOT copy these files by default** — the hide
ruling, the NOTICE and the data-gate path are the Owner's to rule (porca §3, pickle §5.3, ernie
F5; restated as a hard default by the S17 work order A6). The cutover manifest must be built from
a tree that excludes them, and `data/nfl/README.md`'s provenance line travels with whatever ruling
lands. The S17-continuation sitting carries the SEAM CONTRACT and receipts forward
(`scripts/golden-seam.mjs` + `batteries/seam-golden.json`), not the raw data.

## The delivery form (the hy4 finding, resolved; the 2026-11-25 correction)

The close-out delivered NO zip — the folder + its commit pointer is the delivery form (the
original zip sentence in the hand-over §0 is RETRACTED in place, with the retraction visible).
**RETRACTION (2026-11-25, the work order A5 UNKNOWN):** the 2026-11-24 sentence promising "one
session zip … with a `SHA256SUMS-2026-11-24.txt` beside it" is RETRACTED — no such zip or
SHA256SUMS file was ever delivered with the 2026-11-24 package (verified: no `SHA256SUMS*` path
exists anywhere on the tree or in the mirror), and this note cannot cite a chat download link it
does not hold. The 2026-11-25 S17-continuation sitting delivers its own session zip with a
REAL `SHA256SUMS-2026-11-25.txt` beside it (generated over the delivered bytes before hand-off).
From this sitting the package also rides the seat's own branch as the primary delivery form: the
`council/<seat>` push hash IS the delivery; the zip is the transport fallback.
