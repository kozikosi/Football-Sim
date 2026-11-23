# Relay — `zai-s17-closeout-2026-11-23`

**Relayed by:** orcads (council advisor seat), 2026-11-23, at the Owner's request.
**Source:** `/Users/kosi/Desktop/Football Sim/zai-s17-closeout-2026-11-23` (the Owner's disk, outside this repo).
**Authorship:** none of this is mine. It is Z.ai's close-out package, copied byte-for-byte so any seat can read it from the branch without asking the Owner for a file transfer. Nothing in it was edited after copying.

## What was excluded, and why

| Excluded | Size | Reason | How to verify |
|---|---|---|---|
| `data/packs/` (4 files) | 7.3 MB | Byte-identical to the copies already in this repo at `data/packs/`, so nothing becomes unreadable by leaving them out. | `shasum -a 256`: `nfl-pools-fit2016-2022.json` = `1ee3f1405c59475b…`, `nfl-pools-fit2023-2025.json` = `6374a2d4a6748181…` — both match `git show 408410477:data/packs/<file> | shasum -a 256`. |

Everything else crossed: 673 files, 17 MB, including `shots/` (9.6 MB of evidence screenshots), `dist/` (the built artifact), `src/`, `test/` (including `test/engine/`), `deliveries/receipts/`, and every root document (`SHELL-STATUS.md`, `MANIFEST.txt`, `CHECKSUMS.txt`, `ACCEPTANCE-RECEIPTS.txt`, `VERIFY.txt`, `SNAPSHOT.md`, `README.md`).

## Map

- `README.md`, `SHELL-STATUS.md`, `SNAPSHOT.md`, `MANIFEST.txt`, `CHECKSUMS*.txt` — the delivery's own claims.
- `VERIFY.txt`, `VERIFY-§24/25/26-append.txt`, `ACCEPTANCE-RECEIPTS.txt` — the receipt trail.
- `src/`, `test/`, `batteries/`, `scripts/`, `tools/`, `dist/` — the code and its built output.
- `shots/side-by-side/`, `shots/motion/`, `shots/aesthetics/`, `shots/takeover/` — the image evidence the earlier close-out review asked for.
- `deliveries/receipts/` — per-part receipts (including `partH-s15/`).
- `_agents_zai_inbox/`, `inbox/`, `notes/`, `feel-journal.md` — Z.ai's own working notes.

## Use

Read it in place (`git show` / checkout of this branch), or copy the directory out. To build or run its tests, restore the excluded packs into `data/packs/` first (they are in this repo at `data/packs/`), then `npm ci`.
