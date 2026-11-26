# Relay notes — Z.ai packages copied into this branch at the Owner's request

**Relayed by:** orcads (council advisor seat). **Authorship:** none of this is mine. Each folder is Z.ai's package, copied byte-for-byte so any seat can read it from the branch without asking the Owner for a file transfer. Nothing is edited after copying.

Rule of the relay: copy everything except files whose bytes already exist elsewhere in this repo (named below, with the hash that proves it), and say what was left out.

---

## `zai-s17-continuation-2026-11-25`

**Relayed:** 2026-11-25, at the Owner's request. **Source:** `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-2026-11-25` (outside this repo).
**Size:** 836 files, 19 MB (excluded files counted below).
**What it is:** the S17 continuation sitting — Wave A (evidence layer: acceptance attestation, freshness map, state blocks, structured non-vacuity, w89 fixture) landed and green at its own bytes; Wave B (ten UI/UX themes) landed in code but PARTIAL at the delivered bytes (one battery crash, the offline tent not run — the author says so in `bulletin/20261125-zai-s17-continuation-waveA-closed.md`).

| Excluded | Size | Reason | How to verify |
|---|---|---|---|
| `data/packs/` (4 files) | 7.3 MB | Byte-identical to `408410477:data/packs/`, so nothing becomes unreadable by leaving them out. | `git show 408410477:data/packs/<file> \| shasum -a 256` equals the package copy: `nfl-pools-fit2016-2022.json` = `1ee3f1405c59475b…`, `nfl-pools-fit2023-2025.json` = `6374a2d4a6748181…`, `nfl-passclass-fit2016-2022.json` = `bc0aae9525403dd5…`, `nfl-passclass-fit2023-2025.json` = `51a0f5fd0754f194…`. |

Everything else crossed, including `shots/` (image evidence), `dist/`, `src/`, `test/`, `batteries/`, `scripts/`, `tools/`, `deliveries/receipts/`, and every root document.

**Effect of the exclusion on the package's own checks:** `node tools/verify-package.mjs .` on this relay reports the four `data/packs/*.json` as *missing* (it reported 401 OK / 0 FAILED / 0 missing on the author's tree). Restore them first if you want to run its tests:

```
mkdir -p data/packs
for f in nfl-pools-fit2016-2022.json nfl-pools-fit2023-2025.json nfl-passclass-fit2016-2022.json nfl-passclass-fit2023-2025.json; do
  git show 408410477:data/packs/$f > data/packs/$f
done
npm ci
```

Then `npm run test:engine` (430), `npm run battery:node`, `node tools/verify-package.mjs .`.

**One more file the relay does not change but the package's manifest does not list:** the package ships `SHA256SUMS-2026-11-25.txt` (the session zip's checksum list). `verify-package`'s converse walk names it as EXTRA and exits 1 on the author's tree too — see the review (`inbox/20261125-orcads-S17c-continuation-review.md`, finding R3).

---

## `zai-s17-closeout-2026-11-23` (relayed 2026-11-23)

**Size:** 673 files, 17 MB. `data/packs/` excluded for the same reason (same hashes). Everything else, including `shots/` (9.6 MB), `dist/`, `src/`, `test/`, `deliveries/receipts/`, crossed.

**Effect:** `node tools/verify-package.mjs .` prints `366 OK / 0 FAILED / 4 missing` (the four packs) instead of 370/370; `npm run test:engine` fails with `ENOENT ... data/packs/nfl-pools-fit2016-2022.json` until they are restored.

## Map (both packages)

- `README.md`, `SHELL-STATUS.md`, `SNAPSHOT.md`, `MANIFEST.txt`, `CHECKSUMS*.txt`, `claims.json` — the delivery's own claims.
- `VERIFY.txt`, `VERIFY-§24/25/26-append.txt`, `ACCEPTANCE-RECEIPTS.txt`, `receipt-attestation.json`, `freshness.json` — the receipt trail.
- `src/`, `test/`, `batteries/`, `scripts/`, `tools/`, `dist/` — the code and its built output.
- `shots/` — the image evidence.
- `deliveries/receipts/` — per-part receipts (`partH-s13/`, `partH-s14/`, `partH-s15/`).
- `_agents_zai_inbox/`, `inbox/`, `notes/`, `feel-journal.md` — Z.ai's own working notes.

Use it in place (`git show`, or check this branch out in a scratch worktree), never as a build source.
