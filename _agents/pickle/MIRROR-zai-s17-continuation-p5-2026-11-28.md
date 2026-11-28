# PICKLE read-only mirror — zai-s17-continuation-p5-2026-11-27 (Owner-directed, 28 Nov 2026)

**Purpose:** make Z.ai's 28 November Wave-1 fix tree readable by every seat on GitHub.
This is a byte mirror, not a PICKLE build, proposal or acceptance. Nobody may edit the
mirrored tree here; corrections go to Z.ai's tree and a new mirror, not to these bytes.

## Source and identity (all VERIFIED, commands run in this worktree)

- Source: `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-p5-2026-11-27`
- Destination: `zai-s17-continuation-p5-2026-11-27/` on `council/pickle`
- Command: `cp -Rp "/Users/kosi/Desktop/Football Sim/zai-s17-continuation-p5-2026-11-27" ./zai-s17-continuation-p5-2026-11-27`
- Counts: source 857 regular files / 64 directories / 0 symlinks; mirror 857 regular files.
- `diff -rq "<source>" ./zai-s17-continuation-p5-2026-11-27` → `DIFF: identical` (no output from diff).
- Whole-tree digest (sorted relative paths, `shasum -a 256` of the path list):
  `f1d24379b4e2c1001a7c6def5a4fa3080e225cbee6755096ac01064e16a8a65f` — identical at source and mirror.
- `cd mirror && shasum -a 256 -c CHECKSUMS.txt` → 416 lines `OK`, exit 0.
- No nested git repository, no `node_modules`, no symlinks were carried over.

## Pinning a few files (sha256, measured here)

| File | sha256 |
|---|---|
| `CHECKSUMS.txt` (= `MANIFEST.txt`) | `2e5e940b04e31ad5a39d8869bb81faa947b819e660cea96345ae421566f3f1b0` |
| `PARTIAL-2026-11-28.md` | `24c63dd5c64b40f9464fe151dd6cd7af8b1741f5d31acf7576d72d7394889f3c` |
| `claims.json` | `ab36ee2e89014008df22a10e5e606d69370e770fb637f5a6e212f21a8c90e3a4` |
| `dist/single.html` | `dc6c861f5efb3f508e13bde6585a8f41894f58cab1e22341ad2fcbe85a94d8cc` |
| `README-S17-PACKAGE-NOTE.md` | `c5666bba337f36e6275e22b949dc92bcae7dcddd1c1b702b0cb75ce28cb1e92e` |
| `deliveries/CLAIMS-INDEX.md` | `624e69a6a285d82999d0b2e463f2fa573c6f7849af7e48cffd822ca6fcc30524` |

## Status carried with the bytes

The tree declares itself **PARTIAL**, not COMPLETE: Wave 1's thirteen code items landed, but the
41-capture side-by-side receipt is stale (6 named FALLBACKs), the fresh acceptance composite was
not run, and the full Gate 1 battery / spaced-path gate / post-composite convergence were not run.
Z.ai's own `PARTIAL-2026-11-28.md` names the exact resume commands. A fresh independent Verifier
is owed at the final sealed bytes; PICKLE is not that Verifier for this round (this seat relayed
the order and reviewed the same tree). See PICKLE's `inbox/` review filing for the measured verdict.

**Delivery gate:** this mirror is delivered by the pushed commit on `council/pickle` (hash in the
commit message / PICKLE lane file). Nothing was pushed by Z.ai, and no product, engine, pin,
governance, queue or council-tool file was touched by this seat.
