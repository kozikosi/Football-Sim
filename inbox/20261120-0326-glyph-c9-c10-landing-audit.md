SPEAKER: glyph | ROLE: council seat (verifier) | TASK: C9 · Pre-landing integrity audit of the c10 package | DATE: 2026-11-20T03:26:45Z

VERDICT: ok — **safe to land the c10 repair (one file) to inkling and orcaink** per rehearsed receipt (C3). Doc-fix landing is a separate action with byte-state/manifest caveats (see notes).

WHAT I RAN:
```bash
# 2026-11-20T03:22Z, /Users/kosi/Desktop/wt/glyph (council/glyph)
git fetch -q origin
SCRATCH=/tmp/glyph-c10-5mUcvx   # mktemp -d
git archive origin/council/inkling  _agents/inkling/67-cakepanz-10-2026-11-19                  | tar -x -C "$SCRATCH/inkling"
git archive origin/council/orcaink  _agents/orcaink/67-cakepanz-10-2026-11-19                  | tar -x -C "$SCRATCH/orcaink"
git archive origin/council/pickle   _agents/pickle/deliveries/zai-cakepanz-10-2026-11-19       | tar -x -C "$SCRATCH/pickle"
git archive origin/council/pickle   _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19        | tar -x -C "$SCRATCH/pickle-hosted-c9"

# per host (package root)
find . -type f | wc -l
wc -l CHECKSUMS.txt
grep -n 'slice1-battery' CHECKSUMS.txt
md5sum -c CHECKSUMS.txt; echo EXIT:$?   # (/sbin/md5sum on macOS)
# dist measurements
shasum -a 256 <tree>/cakepanz-4/dist/single.html; wc -c <...
shasum -a 256 <tree>/cakepanz-4-prepared/dist/single.html (if present); cmp -s (if both)
# nested/hosted c9 structure
find <nested-c9> -name single.html
find <hosted-c9> -path '*dist/single.html' | sort

# repair rehearsal applied in separate scratch copies for inkling/orcaink (C3) then rechecked.
```

WHAT I FOUND:

## 1) c10 packages — per host audit (fresh `git archive`, VERIFIED)

| Host (branch:path) | Package file count | CHECKSUMS entries | `md5sum -c` before | Missing/failed entry (before) | `slice1-battery.json` in manifest | Receipt file present before | Nested c9 `cakepanz-4/dist/single.html` | Nested c9 `cakepanz-4-prepared/dist/single.html` | Nested c9 dist pair |
|---|---:|---:|---|---|---|---|---|---|---|
| `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19` | 52 | 49 | **OK=49, FAILED=0, EXIT=0** | none | yes, line 18: `0a2869538a706e7e6ea864664b7e5c9f  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json` | **yes** | `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` / **527162 B** | **absent** (no `cakepanz-4-prepared/dist/`) | n/a (only shipped dist present) |
| `origin/council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19` | 51 | 49 | **OK=48, FAILED/missing=1, EXIT=1** | `md5sum:  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json: No such file or directory` | yes, line 18: `0a2869538a706e7e6ea864664b7e5c9f  .../slice1-battery.json` | **no** (`.../cakepanz-4/deliveries` missing) | `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` / **527162 B** | **absent** | n/a |
| `origin/council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19` | 51 | 49 | **OK=48, FAILED/missing=1, EXIT=1** | same path missing | yes, line 18: `0a2869538a706e7e6ea864664b7e5c9f  .../slice1-battery.json` | **no** (`.../cakepanz-4/deliveries` missing) | `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` / **527162 B** | **absent** | n/a |

Raw before receipts (VERIFIED): inkling/orcaink each `find . -type f | wc -l` → `51`, `md5sum -c CHECKSUMS.txt` → first error `No such file or directory` for manifest line 18 path, 48 `: OK` lines, `EXIT=1`. Pickle c10 → `52` files, 49 `: OK`, `EXIT=0`.

## 2) Repair rehearsal outcome (C3, scratch-only; VERIFIED)
Repair source: `_agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json` — **6418 B**, md5 `0a2869538a706e7e6ea864664b7e5c9f`, sha256 `3e6476deb5ba58f91dada6276de1e60db88bc2745bf9f1cf4ce515200142faf3`.

After copying to manifest path in inkling/orcaink scratch copies (`mkdir -p .../cakepanz-4/deliveries/receipts && cp ...`):
- Inkling: **52 files, OK=49, FAILED=0, EXIT=0** (tail OK incl. `deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md`).
- Orcaink: **52 files, OK=49, FAILED=0, EXIT=0**.
- Pickle control recheck (no copy): **52 files, OK=49, FAILED=0, EXIT=0**.

## 3) Nested c9 (inside c10 packages) vs standalone hosted c9 (VERIFIED)

| Tree | Source ref:path | Nested/standalone c9 file count (top-level subtree `zai-cakepanz-9-2026-11-19`) | `cakepanz-4/dist/single.html` | `cakepanz-4-prepared/dist/single.html` | Trees match? |
|---|---|---:|---|---|---|
| pickle c10 nested c9 | `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19` | 35 | `76de5658…` / **527162 B** | **absent** | n/a |
| inkling c10 nested c9 | `origin/council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19` | 35 (post-repair scratch; same dist present) | `76de5658…` / **527162 B** | **absent** | n/a |
| orcaink c10 nested c9 | `origin/council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19` | 35 | `76de5658…` / **527162 B** | **absent** | n/a |
| standalone hosted c9 | `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19` | 5104 (includes `node_modules`, full prepared/dist trees) | `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` / **527177 B** | `670d4c08…` / **527177 B** | **yes** (`cmp -s` equal) |

Notes (VERIFIED): nested c9 inside c10 packages is a slim subset (no prepared `dist/single.html`, 35 files) carrying the Part-0-patched working dist `76de5658…`; standalone hosted c9 is a different/full tree carrying delivered artifact `670d4c08…` in both shipped and prepared dists. This difference is **expected** (matches v3-sitting package’s stated two-build/byte-state reality) and is **not a defect** by itself.

## 4) Go / no-go

**c10 repair landing (inkling, orcaink): SAFE TO LAND** (VERIFIED by rehearsal) — apply exactly the manifest-path copy of `slice1-battery.json` (6418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`, CHECKSUMS line 18). Expected: 51→52 files, 48 OK/1 missing→49 OK/EXIT 0. Pickle c10 already satisfies manifest (52/49 OK). Do not re-cut/regenerate manifests.

**Do not land blindly (separate actions/caveats):**
- Doc-fix landing requires byte-state-correct application and manifest hash-line updates per FIX-NOTES (Pickle D1 patch-cwd/path ambiguity and D2 hosted-c9 byte-truth classification remain relevant; not re-verified end-to-end here beyond package audit facts above).
- Standalone hosted c9 vs nested c9 are different trees/dists — do not assume doc-fix applicability is uniform without matching before-md5s/dist hashes.

WHAT I WOULD CHANGE:
- (INFERRED, low risk) When relaying/landing, cite the explicit `mkdir -p .../receipts` step because `deliveries/` is absent on affected hosts (rehearsal confirmed). No change to package contents proposed.

WHAT I DID NOT CHECK:
- Did not run package-internal batteries/composites, `gate-numerals`/`gate-manifest` inside c9 trees, or `vite`/`npm` builds. Did not apply or re-verify hosted-c9/c10-package doc diffs on fresh checkouts (C4). Did not inspect all 5104 hosted-c9 files beyond dist hashes/presence/counts. Did not push/modify any remote branch. Used `/sbin/md5sum` for `-c` on macOS (receipt-captured); repair identity also verified by md5/sha256.
