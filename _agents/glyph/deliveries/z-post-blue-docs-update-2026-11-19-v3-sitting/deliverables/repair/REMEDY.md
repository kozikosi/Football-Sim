# REMEDY.md — the c10 one-file repair (TASK 1, v3.0 §2)

Date: 2026-11-19 · Seat: Z.ai · English only.

## The defect

`council/inkling:_agents/inkling/67-cakepanz-10-2026-11-19/` and
`council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19/` each verify **48 OK / 1 FAILED**:
the manifest's 49th entry names a file the import dropped (nested one directory too deep).

## The repair — one file, copied, nothing regenerated

Copy `deliverables/repair/slice1-battery.json` (6,418 B) to BOTH hosts at exactly this path
(relative to the package root `<host>:/_agents/<seat>/67-cakepanz-10-2026-11-19/`):

```
_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
```

(The `receipts/` directory may not exist on the host — create it. That is the whole repair.)

## Verify — expect 49/49 on both hosts

```
cd <host>:/_agents/<seat>/67-cakepanz-10-2026-11-19/
md5sum -c CHECKSUMS.txt        # → 49 OK, 0 FAILED
find . -type f | wc -l         # → 52
```

## The file's identity (measured 2026-11-19, this sandbox)

- bytes: **6,418**
- md5: **`0a2869538a706e7e6ea864664b7e5c9f`** (== `CHECKSUMS.txt:18` in all three c10 packages)
- sha256: **`3e6476deb5ba58f91dada6276de1e60db88bc2745bf9f1cf4ce515200142faf3`**

## Where these bytes came from (provenance)

The only manifest-true copy reachable on GitHub is inside pickle's own c10 package:
`council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json`
(6,418 B, md5 `0a286953…` — VERIFIED this sitting). NOTE: the c9 hosting's own copy of the same
path on `council/pickle` is 6,423 B / md5 `333c588a…` — a LATER battery re-run (the detail strings
differ: "76 flex chips", "Joe Burrow"). Do NOT substitute it: the c10 manifest names the 6,418 B
bytes, and this repair file carries exactly those.

## Receipts from this sitting's scratch run (VERIFIED — full output in the report)

- before: pickle's c10 = 49 OK / 52 files; inkling's and orcaink's = 48 OK / 1 FAILED / 51 files.
- after (scratch copies): both repaired hosts = **49 OK**, 52 files; a path-joined before/after
  sha256 comparison shows exactly ONE path added and ZERO pre-existing files changed.
- the k1 log in the repaired copies still ends `18 × EXIT_CODE=0`, `ACCEPTANCE RUN COMPLETE`,
  `K1-OUTER-EXIT=0` (it is one of the 49 verified entries).
- the four item-6 JSON sha256s are NOT re-verifiable here — those receipts rode the previous
  sitting's zip and are not on any reachable branch; the c10 package contains no JSON matching
  them (only 5 JSONs total, none match). The repair provably touched nothing but the one added
  file, which covers the intent of that check.
