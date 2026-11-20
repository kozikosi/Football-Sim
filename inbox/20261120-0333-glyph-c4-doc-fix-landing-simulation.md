SPEAKER: glyph | ROLE: council seat (verifier) | TASK: C4 · Verify the doc-fix end to end, on the third host (landing simulation) | DATE: 2026-11-20T03:33:13Z

VERDICT: ok (hosted-c9 patch reproduces FIX-NOTES §6 after-md5s in scratch; inkling/orcaink own c9 copies are byte-true and should be left alone)

WHAT I RAN:
```bash
# 2026-11-20T03:33Z, /Users/kosi/Desktop/wt/glyph (council/glyph)
git fetch -q origin
SCRATCH=$(mktemp -d /tmp/glyph-c4-XXXXXX)   # /tmp/glyph-c4-nMgdMh
DIFF="_agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9.diff"

# diff + expected after-file identities (from local v3 delivery)
md5sum "$DIFF"
md5sum _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9/cakepanz-4/SHELL-STATUS.md \
       _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9/cakepanz-4-prepared/SHELL-STATUS.md \
       _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9/ledger/build-report-zai-cakepanz-9-2026-11-19.md
# FIX-NOTES §6 expected after: 08f30249..., aba2f58a..., ad1e0a96...

# fresh extract: pickle standalone hosted c9
git archive origin/council/pickle _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19 | tar -x -C "$SCRATCH/hosted-c9"
ROOT="$SCRATCH/hosted-c9/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19"

# BEFORE measurements
/sbin/md5sum "$ROOT/cakepanz-4/SHELL-STATUS.md" "$ROOT/cakepanz-4-prepared/SHELL-STATUS.md" "$ROOT/ledger/build-report-zai-cakepanz-9-2026-11-19.md"
/usr/bin/shasum -a 256 "$ROOT/cakepanz-4/dist/single.html" "$ROOT/cakepanz-4-prepared/dist/single.html"
/usr/bin/wc -c "$ROOT/cakepanz-4/dist/single.html" "$ROOT/cakepanz-4-prepared/dist/single.html"
/usr/bin/cmp -s "$ROOT/cakepanz-4/dist/single.html" "$ROOT/cakepanz-4-prepared/dist/single.html"; echo cmp_exit=$?

# dry-runs (diff headers are rooted at _agents/pickle/...)
(cd "$SCRATCH/hosted-c9/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19" && /usr/bin/patch -p5 --dry-run < "$DIFF"); echo DRY_P5_SUB_EXIT=$?
(cd "$SCRATCH/hosted-c9/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19" && /usr/bin/patch -p1 --dry-run < "$DIFF"); echo DRY_P1_SUB_EXIT=$?
(cd "$SCRATCH/hosted-c9" && /usr/bin/patch -p1 --dry-run < "$DIFF"); echo DRY_P1_ROOT_EXIT=$?

# APPLY (fresh extract, -p1 from extract root containing _agents/)
git archive origin/council/pickle _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19 | tar -x -C "$SCRATCH/hosted-c9-apply2"
(cd "$SCRATCH/hosted-c9-apply2" && /usr/bin/patch -p1 < "$DIFF"); echo APPLY_P1_ROOT_EXIT=$?
ROOT2="$SCRATCH/hosted-c9-apply2/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19"
/sbin/md5sum "$ROOT2/cakepanz-4/SHELL-STATUS.md" "$ROOT2/cakepanz-4-prepared/SHELL-STATUS.md" "$ROOT2/ledger/build-report-zai-cakepanz-9-2026-11-19.md"

# byte-true checks: inkling/orcaink own c9 copies (67-cakepanz-9-2026-11-19)
git archive origin/council/inkling _agents/inkling/67-cakepanz-9-2026-11-19 | tar -x -C "$SCRATCH/inkling-c9"
git archive origin/council/orcaink _agents/orcaink/67-cakepanz-9-2026-11-19 | tar -x -C "$SCRATCH/orcaink-c9"
# for each root: md5sum of 3 target files + sha256/wc/cmp of both dist/single.html
```

WHAT I FOUND:

### Hosted-c9 diff + FIX-NOTES §6 (VERIFIED, local delivery)
```
$ md5sum deliverables/doc-fixes/hosted-c9.diff
e55f35a13ac85a1af3d078262cdae5f2  _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9.diff

Expected after (FIX-NOTES.md §6 / package after-files):
08f30249faeae37eb2198a1668c10db6  hosted-c9/cakepanz-4/SHELL-STATUS.md
aba2f58ae13f0d0fa08a41feababb3de  hosted-c9/cakepanz-4-prepared/SHELL-STATUS.md
ad1e0a967dda4ddc1a53cf8497cc6131  hosted-c9/ledger/build-report-zai-cakepanz-9-2026-11-19.md
(Package copies of those three files hash to the same values — VERIFIED via md5sum.)
```

### Standalone hosted c9 — BEFORE (fresh extract, VERIFIED)
Source: `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19`
Target files (before md5s match FIX-NOTES §6 "before" column):
```
222372b8342ed050273b2b6202cfd768  cakepanz-4/SHELL-STATUS.md
29cecad3ff502a1afafd43163def3602  cakepanz-4-prepared/SHELL-STATUS.md
4d723c4185348d5e8ff43b23f35f5325  ledger/build-report-zai-cakepanz-9-2026-11-19.md
```
Dists (both trees identical, byte-true at own bytes):
```
670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1  cakepanz-4/dist/single.html  (527177 B)
670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1  cakepanz-4-prepared/dist/single.html  (527177 B)
cmp_exit=0
```

### Patch application modes (dry-run, VERIFIED)
Diff header root: `a/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/...`
```
From c9 subtree root (.../zai-cakepanz-9-2026-11-19):  patch -p5 --dry-run  => OK, exit 0
From c9 subtree root (.../zai-cakepanz-9-2026-11-19):  patch -p1 --dry-run  => "No file found--skip this patch?" x3, exit 1
From extract root (dir containing _agents/):           patch -p1 --dry-run  => OK, exit 0
```
Note (REPORTED/VERIFIED nuance): C4 prompt states "`patch -p1` from the c9 subtree root..." which is not correct for this diff header; for this diff use **`-p5` from the c9 subtree root** or **`-p1` from an extract root containing `_agents/`**.

### Hosted-c9 — APPLY + AFTER (VERIFIED)
Applied on fresh extract from extract root containing `_agents/`:
```
$ (cd "$SCRATCH/hosted-c9-apply2" && /usr/bin/patch -p1 < "$DIFF")
patching file '_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/SHELL-STATUS.md'
patching file '_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/SHELL-STATUS.md'
patching file '_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/ledger/build-report-zai-cakepanz-9-2026-11-19.md'
APPLY_P1_ROOT_EXIT=0
```
After md5s (match FIX-NOTES §6 expected after exactly):
```
08f30249faeae37eb2198a1668c10db6  cakepanz-4/SHELL-STATUS.md
aba2f58ae13f0d0fa08a41feababb3de  cakepanz-4-prepared/SHELL-STATUS.md
ad1e0a967dda4ddc1a53cf8497cc6131  ledger/build-report-zai-cakepanz-9-2026-11-19.md
```

### Inkling's and orcaink's own c9 copies — byte-true, leave alone (VERIFIED)
Sources: `origin/council/inkling:_agents/inkling/67-cakepanz-9-2026-11-19`, `origin/council/orcaink:_agents/orcaink/67-cakepanz-9-2026-11-19`

| Seat | `cakepanz-4/SHELL-STATUS.md` | `cakepanz-4-prepared/SHELL-STATUS.md` | `ledger/build-report-...md` | shipped dist sha256 / bytes | prepared dist sha256 / bytes | cmp |
|---|---|---|---|---|---|---|
| inkling own c9 | `222372b8342ed050273b2b6202cfd768` | `29cecad3ff502a1afafd43163def3602` | `4d723c4185348d5e8ff43b23f35f5325` | `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` / 527177 | `670d4c08...` / 527177 | 0 (equal) |
| orcaink own c9 | `222372b8342ed050273b2b6202cfd768` | `29cecad3ff502a1afafd43163def3602` | `4d723c4185348d5e8ff43b23f35f5325` | `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` / 527177 | `670d4c08...` / 527177 | 0 (equal) |

Both copies carry the same "before" doc md5s and both dists `670d4c08…`/527177 B (identical shipped/prepared) — the stale-sentence-as-written is **true at their own bytes**. Per FIX-NOTES/C4 intent they should be **left alone** (applying the diff would make them role-explicit but changes byte-true files; policy choice remains with Owner/MUSE/seat context).

WHAT I WOULD CHANGE:
- (INFERRED) Correct C4 prompt’s patch invocation note for this diff: state `patch -p5` from c9 subtree root or `patch -p1` from a root containing `_agents/` (not `-p1` from subtree root). This matches dry-run receipts and the earlier Pickle D1 direction.

WHAT I DID NOT CHECK:
- Did not apply patch to inkling/orcaink own c9 copies (measured only). Did not run `gate-numerals`/`gate-manifest`/composites post-patch. Did not update any CHECKSUMS/MANIFEST hash lines (FIX-NOTES §6 consequence applies if landing). Did not modify any remote branch. Scratch dirs used for verification were temporary (`/tmp/glyph-c4-nMgdMh*`).
