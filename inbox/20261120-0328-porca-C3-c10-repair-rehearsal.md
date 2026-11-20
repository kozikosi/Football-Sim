SPEAKER: PORCA | ROLE: advisor | TASK: C3 | DATE: 2026-11-20T03:28Z

# C3 — rehearse the c10 repair on scratch (49/49 → the Owner's landing)

VERDICT: ok — the repair is a one-file copy that turns both broken hosts green with no other change.

## WHAT I RAN (all in scratch; no host, no shared tree, no commit to a host)

Scratch: `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/porca-c10`
(all paths below are relative to each host's package root; absolute scratch paths are omitted per §4)

```
git archive origin/council/inkling _agents/inkling/67-cakepanz-10-2026-11-19 | tar -x -C <scratch>/inkling
git archive origin/council/orcaink _agents/orcaink/67-cakepanz-10-2026-11-19 | tar -x -C <scratch>/orcaink
git archive origin/council/pickle  _agents/pickle/deliveries/zai-cakepanz-10-2026-11-19 | tar -x -C <scratch>/pickle

# repair artifact, straight from the blob (never checked out into a host):
git show origin/council/ernie:_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json > <scratch>/repair.json
md5 -q <scratch>/repair.json ; shasum -a 256 <scratch>/repair.json ; wc -c < <scratch>/repair.json

# BEFORE, from each package root:
md5sum -c CHECKSUMS.txt

# THE FIX (the Owner's landing):
mkdir -p _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts
cp <scratch>/repair.json _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json

# AFTER, same root:
md5sum -c CHECKSUMS.txt
md5 -q _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
find . -type f ! -name '.before.out' ! -name '.after.out' | wc -l
```

## WHAT I FOUND (raw output, labelled)

**Repair artifact — VERIFIED.** md5 `0a2869538a706e7e6ea864664b7e5c9f`; sha256
`3e6476deb5ba58f91dada6276de1e60db88bc2745bf9f1cf4ce515200142faf3`; 6,418 bytes —
all three match the order's stated identity.

**BEFORE — VERIFIED.**
```
pickle:  49 OK / 0 FAILED / 0 missing   (52 files, 49 CHECKSUMS entries)
inkling: 48 OK / 0 FAILED / 1 missing   (51 files, 49 CHECKSUMS entries)
orcaink: 48 OK / 0 FAILED / 1 missing   (51 files, 49 CHECKSUMS entries)
```
The single bad line, in both broken hosts, is CHECKSUMS.txt line 18:
```
0a2869538a706e7e6ea864664b7e5c9f  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
```

**AFTER the one-file copy — VERIFIED.**
```
inkling: EXIT=0  49 OK / 0 FAILED / 0 warnings   target md5 0a2869538a706e7e6ea864664b7e5c9f  6418 B  52 files
orcaink: EXIT=0  49 OK / 0 FAILED / 0 warnings   target md5 0a2869538a706e7e6ea864664b7e5c9f  6418 B  52 files
pickle (control): native file md5 0a286953… byte-identical to repair (cmp exit 0);
                  after an idempotent re-copy EXIT=0, 49 OK / 0 FAILED, 52 files
```

## ONE CORRECTION TO THE ORDER (calibration, not a defect in the package)

The order says the "before" state is "48 OK / **1 FAILED**". VERIFIED on `/sbin/md5sum`:
it is **48 OK / 0 FAILED / 1 MISSING**. The target file is *absent*, so md5sum writes
`md5sum:  _agents/pickle/…/slice1-battery.json: No such file or directory` to stderr and
emits no `FAILED` line. An Owner who lands this by scanning for `: FAILED` will see none
and could conclude the package is already clean. **Count the stderr "No such file"
line and the file count (51, not 52), not just `FAILED`.** This is the only place where
the order's wording and the measured output differ.

## WHAT I WOULD CHANGE

Nothing in the package. One line in the sitting order's C3 step 2: read "expect
48 OK, 1 missing file (no FAILED line), 51 files" instead of "48 OK / 1 FAILED".

## THE OWNER'S RECIPE (three commands, per host, from the package root)

```
mkdir -p _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts
cp <v3-sitting>/deliverables/repair/slice1-battery.json _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
md5sum -c CHECKSUMS.txt        # expect: 49 OK, 0 FAILED, 0 "No such file"; 52 files
```
Do this on `council/inkling` and `council/orcaink`. Pickle already carries the file and needs no edit.

## WHAT I DID NOT CHECK

- I did not commit or push to any host (scratch only, per the fence).
- I did not re-run the battery whose result this JSON records (UNKNOWN whether the recorded 49/49 matches a live re-run).
- I did not apply the doc fixes here (that is C4); the C9 audit records the dist/doc relationship separately.
