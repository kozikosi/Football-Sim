SPEAKER: INKLING | ROLE: seat (MUSE delegation) | TASK: A4 — fresh-extract gate run in scratch; does the manifest self-reproduce? | DATE: 2026-11-19T06:38Z

All commands ran this window in the scratch verify copies at
`/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/cakepanz9-verify/` — extracted from
`/Users/kosi/Desktop/Football Sim/67-cakepanz-9-2026-11-19` — git absent (a plain copy). Nothing written to
the Desktop source, nothing written to the hosted repo copy.

## (a) As delivered — the gate FAILS in both trees (exit 1)

```
cakepanz-4$ node scripts/gate-manifest.mjs
MANIFEST FAIL (missing): .gitignore
boot target: 2 referenced asset(s) checked against the manifest
gate-manifest: FAIL
exit=1
cakepanz-4-prepared$ node scripts/gate-manifest.mjs
MANIFEST FAIL (missing): .gitignore
boot target: 2 referenced asset(s) checked against the manifest
gate-manifest: FAIL
exit=1
```
Root cause: MANIFEST/CHECKSUMS `line 20` lists `f27658cc7f63ba9e09c1f3a2aa2ff0948037bf3f79ed22f59c6248ee178d9763  .gitignore` in both trees; the delivered package contains no `.gitignore` anywhere. (VERIFIED at the Desktop source and at the hosted copy — identical.)

## (b) With the byte-correct `.gitignore` restored — PASS (exit 0)
The sha matches the 8.1 `.gitignore` sitting in git @ `5fb4989a` (`_agents/inkling/67-cakepanz-8.1-2026-11-18/cakepanz-4[-prepared]/.gitignore`), whose sha256 is exactly `f27658cc…`:

```
cakepanz-4$ shasum -a 256 .gitignore
f27658cc7f63ba9e09c1f3a2aa2ff0948037bf3f79ed22f59c6248ee178d9763  .gitignore
cakepanz-4$ node scripts/gate-manifest.mjs
boot target: 2 referenced asset(s) checked against the manifest
gate-manifest: PASS (314 entries verified, dist/ covered, converse clean)
exit=0
cakepanz-4-prepared$ node scripts/gate-manifest.mjs
boot target: 2 referenced asset(s) checked against the manifest
gate-manifest: PASS (319 entries verified, dist/ covered, converse clean)
exit=0
```

## (c) Regen self-consistent — yes
```
cakepanz-4$ node scripts/regen-manifest.mjs
regen: 314 entries
cakepanz-4$ grep -n gitignore MANIFEST.txt CHECKSUMS.txt
MANIFEST.txt:20:f27658cc…  .gitignore
CHECKSUMS.txt:20:f27658cc…  .gitignore
cakepanz-4$ node scripts/gate-manifest.mjs
gate-manifest: PASS (314 entries verified, dist/ covered, converse clean)   exit=0
cakepanz-4-prepared$ node scripts/regen-manifest.mjs
regen: 319 entries
cakepanz-4-prepared$ grep -n gitignore MANIFEST.txt CHECKSUMS.txt
MANIFEST.txt:20:f27658cc…  .gitignore
CHECKSUMS.txt:20:f27658cc…  .gitignore
cakepanz-4-prepared$ node scripts/gate-manifest.mjs
gate-manifest: PASS (319 entries verified, dist/ covered, converse clean)   exit=0
```
Regen regenerates exactly the delivered MANIFEST/CHECKSUMS contents (314/319 entries, the same `line 20`) — i.e. the manifest was generated on a machine where `.gitignore` existed; the Desktop delivery LOST the file in transit (zip omission or transfer), it was never wrong.

## The one sentence for the Owner
**Place `.gitignore` (sha `f27658cc7f63ba9e09c1f3a2aa2ff0948037bf3f79ed22f59c6248ee178d9763`, bytes in git @ `5fb4989a`) at each tree root; then both gates pass without re-generating anything.**

— INKLING, 2026-11-19T06:38Z; receipts-at-edge-of-scratch, nothing committed into the delivery.
