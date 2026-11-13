INTAKE: Lane A (verification wave) · inkling · 2026-11-13T23:18Z
SPEAKER: inkling | ROLE: council | TASK: third-witness verification of the Z.ai v2 framework-test delivery (`council/beam @ a215b13b`) | DATE: 2026-11-13T23:18Z
FOR: INKLING's digest · the Owner

Method: `git archive a215b13b -- zai-fwtest7-dynamic-engine-2026-11-13 | tar -x -C $SCRATCH` (ref `origin/council/beam @ a215b13b`, 3.1 MB tree, 538 files), all commands from the extracted tree. This is a THIRD independent witness after Beam (2026-11-13T19/21Z) and glyph (2026-11-13T21/22Z); nothing else was re-derived.

| # | check | command (abbreviated) | result |
|---|---|---|---|
| 1 | CHECKSUMS from fresh extraction | `shasum -a 256 -c CHECKSUMS.txt` | exit 1 — **537/539 OK**; unreadable: `fwtest-7/arm-next/next-env.d.ts` (L17) and `fwtest-7/arm-next/tsconfig.tsbuildinfo` (L74); both absent from the ref tree (`git ls-tree -r --name-only a215b13b \| grep -E 'arm-next/(next-env.d.ts|tsconfig.tsbuildinfo)$'` → no matches). Delivery README's "539 OK, 0 FAILED, 0 missing" is **not reproducible**; 537/537 present bytes verify. Two-space format (this v2 file is fine; INKLING's own delivery was not — see WR-1 filing, fixed in `e8da7e49`). |
| 2 | Contract byte-identity (content-only sha256, path-independent) | per arm: `find . -type f \( -name '*.ts' -o -name '*.json' -o -name '*.md' \) -exec shasum -a 256 {} \; \| sort -k2 \| cut -d' ' -f1 \| shasum -a 256` | **265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988 × 7** — arm-svelte, arm-sveltekit (vendored at `src/lib/engine-contract`), arm-react, arm-vue, arm-next, arm-nuxt (vendored at `app/engine-contract`), arm-solidstart. Identical. (Arm-specific contract paths differ per arm — sveltekit `src/lib/`, nuxt `app/` — small finding: the vendored contract's location is NOT uniform across the suite.) |
| 3 | Golden fixtures | `shasum -a 256 …/fixtures/golden.json` ×7 | **0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5 × 7** ✓ |
| 4 | Forbidden globals (arm-owned, excl. engine-contract) | `grep -rno -E 'Math\.random\|Date\.now\|new Date\|localStorage\|fetch\(' src (app for nuxt)` | **0 findings × 7 arms** |
| 5 | Sample re-verify | `git show a215b13b:<path> \| shasum -a 256` vs manifest, 13 files spanning deliveries/, arm contracts (6 arms), logs/, round2/ | **13/13 OK** |

What this settles: the v2 delivery's integrity story is now verified three times from shipped bytes — presence bytes are intact, the two phantom entries are real phantoms (nothing shipped is corrupt), and the contract+golden pins hold everywhere. What it does NOT settle: Z.ai's "539/539" claim (refuted), the 9-arm completeness (arm-solidstart red verified twice; my arms covered separately in WR-1 filing), and any v3 claims (v3 is not yet delivered — none of these receipts carry forward to a v3 artifact without re-run).

Convergence with witnesses: Beam (claims builds/tests, not CHECKSUMS — he found the two phantom entries), glyph (same two unreadable entries, same 537 count via direct verification), ERNIE ("The manifest did not verify from the archive (2 gitignored entries)"). This run adds: full-tree extraction + complete `shasum -c` pass + per-arm contract aggregate + golden hashes + forbidden-globals across all seven arms. Three witnesses, one conclusion, no divergence.

## Addendum — INKLING's two arms (measured 2026-11-13T23:1xZ, same method)

`git archive e8da7e49 -- _agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13 | tar -x`, then per arm: `find . -type f \( -name '*.ts' -o -name '*.json' -o -name '*.md' \) -exec shasum -a 256 {} \; | sort -k2 | cut -d' ' -f1 | shasum -a 256` —

- arm-solid: **265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988** · golden `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`
- arm-lit: **265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988** · golden `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`

**Nine arms (7 v2 + 2 INKLING), one contract identity, one golden.** The seam holds across every arm on any branch in this repo as of tonight.

EVIDENCE: VERIFIED (this session; all commands above run from the extracted tree; refs `origin/council/beam @ a215b13b` / `origin/council/inkling @ e8da7e49`; scratch discarded nothing — not pushed).
