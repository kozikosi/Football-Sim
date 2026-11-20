SPEAKER: glyph | ROLE: council seat (verifier) | TASK: C3 · Rehearse the c10 repair on a scratch copy | DATE: 2026-11-20T03:26:45Z

VERDICT: ok (rehearsal succeeded on scratch; hosts not modified)

WHAT I RAN:
```bash
# 2026-11-20T03:22Z, /Users/kosi/Desktop/wt/glyph (council/glyph)
git fetch -q origin
SCRATCH=$(mktemp -d /tmp/glyph-c10-XXXXXX)   # -> /tmp/glyph-c10-5mUcvx
mkdir -p "$SCRATCH/inkling" "$SCRATCH/orcaink" "$SCRATCH/pickle"

# repair artifact identity (local, in glyph worktree)
REPAIR="_agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json"
wc -c "$REPAIR"
md5sum "$REPAIR"
shasum -a 256 "$REPAIR"

# fresh extracts to scratch (never shared tree)
git archive origin/council/inkling _agents/inkling/67-cakepanz-10-2026-11-19 | tar -x -C "$SCRATCH/inkling"
git archive origin/council/orcaink _agents/orcaink/67-cakepanz-10-2026-11-19 | tar -x -C "$SCRATCH/orcaink"
git archive origin/council/pickle _agents/pickle/deliveries/zai-cakepanz-10-2026-11-19 | tar -x -C "$SCRATCH/pickle"

# BEFORE (each host, from package root)
# inkling:   $SCRATCH/inkling/_agents/inkling/67-cakepanz-10-2026-11-19
# orcaink:   $SCRATCH/orcaink/_agents/orcaink/67-cakepanz-10-2026-11-19
# pickle:    $SCRATCH/pickle/_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19
cd <pkg-root>
find . -type f | wc -l
md5sum -c CHECKSUMS.txt; echo EXIT:$?

# APPLY (inkling + orcaink scratch copies only; pickle untouched)
DEST_REL="_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts"
/bin/mkdir -p "$DEST_REL"
/bin/cp "$REPAIR" "$DEST_REL/slice1-battery.json"
echo cp_exit:$?
/usr/bin/wc -c "$DEST_REL/slice1-battery.json"
/sbin/md5 -q "$DEST_REL/slice1-battery.json"

# AFTER (each host)
find . -type f | wc -l
md5sum -c CHECKSUMS.txt; echo EXIT:$?
```

WHAT I FOUND:

### Repair artifact (VERIFIED)
```
$ wc -c _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
    6418 _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
$ md5sum _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
0a2869538a706e7e6ea864664b7e5c9f  _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
$ shasum -a 256 _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
3e6476deb5ba58f91dada6276de1e60db88bc2745bf9f1cf4ce515200142faf3  _agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
```

### Inkling — BEFORE (VERIFIED, clean extract from `origin/council/inkling`, pkg root `/tmp/glyph-c10-5mUcvx/before-inkling/_agents/inkling/67-cakepanz-10-2026-11-19`)
```
$ find . -type f | wc -l
      51
$ /sbin/md5sum -c CHECKSUMS.txt; echo EXIT:$?
md5sum:  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json: No such file or directory
UPDATE-README.md: OK
... (48 lines ": OK" total)
deliveries/receipts/receipt-preflight-2016-2022.txt: OK
deliveries/receipts/receipt-preflight-2023-2025.txt: OK
deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md: OK
EXIT:1

Summary: files=51, CHECKSUMS entries=49, OK=48, FAILED/missing=1 (path above). Missing parent dir confirmed in rehearsal copy: `ls .../cakepanz-4/deliveries` -> "No such file or directory".
```

### Inkling — APPLY (VERIFIED, scratch copy `/tmp/glyph-c10-5mUcvx/inkling/.../67-cakepanz-10-2026-11-19`)
```
$ /bin/mkdir -p _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts
$ /bin/cp "$REPAIR" _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
$ echo cp_exit:$?
cp_exit:0
$ /usr/bin/wc -c _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
    6418 _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
$ /sbin/md5 -q _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
0a2869538a706e7e6ea864664b7e5c9f
```

### Inkling — AFTER (VERIFIED)
```
$ find . -type f | wc -l
      52
$ /sbin/md5sum -c CHECKSUMS.txt; echo EXIT:$?
...
deliveries/receipts/receipt-preflight-2023-2025.txt: OK
deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md: OK
EXIT:0
Summary: files=52, OK=49, FAILED=0.
```

### Orcaink — BEFORE (VERIFIED, clean extract from `origin/council/orcaink`, pkg root `/tmp/glyph-c10-5mUcvx/before-orcaink/_agents/orcaink/67-cakepanz-10-2026-11-19`)
```
$ find . -type f | wc -l
      51
$ /sbin/md5sum -c CHECKSUMS.txt; echo EXIT:$?
md5sum:  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json: No such file or directory
UPDATE-README.md: OK
... (48 lines ": OK" total)
deliveries/receipts/receipt-preflight-2016-2022.txt: OK
deliveries/receipts/receipt-preflight-2023-2025.txt: OK
deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md: OK
EXIT:1
Summary: files=51, CHECKSUMS entries=49, OK=48, FAILED/missing=1 (same manifest path). Missing parent dir confirmed.
```

### Orcaink — APPLY (VERIFIED, scratch copy `/tmp/glyph-c10-5mUcvx/orcaink/.../67-cakepanz-10-2026-11-19`)
```
$ /bin/mkdir -p _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts
$ /bin/cp "$REPAIR" _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
$ echo cp_exit:$?
cp_exit:0
$ /usr/bin/wc -c _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
    6418 _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
$ /sbin/md5 -q _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
0a2869538a706e7e6ea864664b7e5c9f
```

### Orcaink — AFTER (VERIFIED)
```
$ find . -type f | wc -l
      52
$ /sbin/md5sum -c CHECKSUMS.txt; echo EXIT:$?
...
deliveries/receipts/receipt-preflight-2023-2025.txt: OK
deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md: OK
EXIT:0
Summary: files=52, OK=49, FAILED=0.
```

### Pickle c10 — CONTROL (VERIFIED, no repair applied)
BEFORE (`/tmp/glyph-c10-5mUcvx/pickle/_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19`):
```
$ find . -type f | wc -l
      52
$ md5sum -c CHECKSUMS.txt >/tmp/pickle_c10_md5.txt 2>&1; echo EXIT:$?
EXIT:0
(tail) deliveries/receipts/receipt-preflight-2023-2025.txt: OK
       deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md: OK
Summary: files=52, OK=49, FAILED=0.
```
AFTER (re-check, unchanged):
```
$ find . -type f | wc -l
      52
$ /sbin/md5sum -c CHECKSUMS.txt; echo EXIT:$?
... deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md: OK
EXIT:0
Summary: files=52, OK=49, FAILED=0.
```

### Owner recipe (VERIFIED by rehearsal; run from the target package root)
Package roots:
- inkling: `<repo>/_agents/inkling/67-cakepanz-10-2026-11-19`
- orcaink: `<repo>/_agents/orcaink/67-cakepanz-10-2026-11-19`

```bash
# 1) copy the manifest-true repair file (6,418 B, md5 0a2869538a706e7e6ea864664b7e5c9f)
mkdir -p _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts
cp <path-to>/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json \
   _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json

# 2) verify identity
wc -c _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json   # expect 6418
md5sum _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json # expect 0a2869538a706e7e6ea864664b7e5c9f

# 3) verify package
md5sum -c CHECKSUMS.txt   # expect 49 OK, exit 0
find . -type f | wc -l    # expect 52
```
Expected result (rehearsed): inkling 51 files / 48 OK / 1 missing → 52 files / 49 OK / exit 0; orcaink same. Pickle c10 control remains 52 / 49 OK / exit 0.

WHAT I WOULD CHANGE:
- None to the repair bytes/path. (INFERRED) Owner should avoid substituting any other `slice1-battery.json` copy: hosted c9 path variants may differ (manifest targets 6,418 B / `0a286953…`).

WHAT I DID NOT CHECK:
- Did not commit/push to inkling, orcaink, or pickle branches (scratch-only, as required). Did not re-run c10 composites/batteries beyond manifest checks. Did not apply doc-fixes (separate item C4). Did not modify manifests. `/sbin/md5sum` on macOS was used for `-c` checks (macOS `md5 -c` silence caveat noted in order); file identity also confirmed via `md5 -q`/`md5sum`/`sha256sum` where recorded.
