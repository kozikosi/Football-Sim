# HOSTING-NOTE — 67-cakepanz-13-2026-11-20 (hosted verbatim for the council)

**SPEAKER: pickle | ROLE: Council Adviser | TASK: host + review Z.ai's S13 delivery | DATE: 2026-11-20T19:18Z**

## Provenance (VERIFIED by my own commands)

- Source folder: `/Users/kosi/Desktop/Football Sim/67-cakepanz-13-2026-11-20` (the Owner's desktop, read-only to me).
- Copied with `ditto` to `_agents/pickle/deliverables/67-cakepanz-13-2026-11-20/` — **bytes unchanged**, nothing added inside the tree.
- Source tree: **451 files / 18 MB**; hosted tree: **451 files / 18 MB**.
- `node tools/verify-package.mjs .` run from the hosted `cakepanz-4/`:
  `verify-package: 445 OK / 0 FAILED / 0 missing (445 entries in CHECKSUMS.txt)` then
  `verify-package: converse clean — the tree carries no unlisted file` — **exit 0**. Same result at source before copying.
- `cakepanz-4/CHECKSUMS.txt` sha256 `1a6b1c710aa60e6c8a97d1658cf17b622a0949d7bfa6f06af307149089402c42`.
- Zip-root `CHECKSUMS.txt` sha256 `416cff43ffc7dba89b4b2bd5432c3217bc5e8d4328ba1203e660416649efc7e4`.
- Z.ai reported the **zip** (not this folder) at sha256 `859da3731314fa9d0a8eb2e13ac80c1a55985611ee830bb8d90cd49cd71b98a4` — **REPORTED**, not re-measured (no zip was supplied with the folder).

## What this is

Z.ai's S13 sitting: the complete `cakepanz-4` tree at the S13 bytes (engine re-pinned to `408410477`, 69 TS files) plus the S13 paperwork, receipts and handoff package. Read `README.md` first, then `START-OF-CHAT-ZAI.md` §2. The full review is filed on this branch in `inbox/20261120-*pickle-CAKEPANZ13-review.md`.

## Note on the root-level manifests

The folder contains **two** `CHECKSUMS.txt` (zip root and `cakepanz-4/`). The verifier is designed to run from `cakepanz-4/` (the README says so); the zip-root copy is a separate list. This HOSTING-NOTE is added at the hosting root only — outside `cakepanz-4/` — so the verifier's converse check over the tree stays clean. Anyone re-hosting should keep notes outside `cakepanz-4/`.

**Verified receipt (hosted copy, final state):**

```
$ cd _agents/pickle/deliverables/67-cakepanz-13-2026-11-20/cakepanz-4
$ node tools/verify-package.mjs .
verify-package: 445 OK / 0 FAILED / 0 missing (445 entries in CHECKSUMS.txt)
verify-package: converse clean — the tree carries no unlisted file
$ echo $?
0
```
