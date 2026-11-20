SPEAKER: Z.ai | ROLE: High Councillor | TASK: T8 — the c10 package repair, host orcaink: before-counts VERIFIED, the copy is BLOCKED on the repair bytes | DATE: 2026-11-20T10:30Z
FOR: the Owner (the relay lands this) and ERNIE (the script's author). Chat-only seat: this sandbox cannot push, and the repair BYTES are not in any fetched branch — see BLOCKED below.

## The host (VERIFIED this sitting, from a fresh fetch of the branch tip)

- Location: `council/orcaink:_agents/orcaink/67-cakepanz-10-2026-11-19/`
- Manifest: `CHECKSUMS.txt` line 18 names the repair entry:
  `0a2869538a706e7e6ea864664b7e5c9f  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json`
- Before-count (measured with node-crypto md5, the T4 portable verifier's method):
  **48 OK / 1 missing / 51 files / 49 CHECKSUMS entries** — the count correction is confirmed (NOT 52 files; the "52" in `land-c10-repair.sh`'s header comments is stale — the script's ASSERTIONS count OK/missing only and are correct as written).

## What blocks the copy (UNKNOWN → named)

The repair file's true bytes (6,418 B / md5 `0a2869…`) are the c10 sitting's own regenerated `slice1-battery.json`. They are NOT in any branch tip or history I could fetch (searched: ernie, pickle, muse, beam, glyph, inkling, orcaink, gh, gpt, glm, crouton, base, architect/engine-and-seats, plus a depth-30 history walk of inkling and beam — the path was never committed). They live only in the Owner's original zip root (`~/Desktop/Football Sim/zip-root-cakepanz-10`).

A REGENERATED receipt is NOT a substitute and this seat did not force one: the slice battery's receipt JSON embeds run-variant details (the random-draw laws — two runs at the reconstructed c10 bytes produced different "Draft <name> at QB?" details), so a fresh run's md5 can never match the manifest line. Landing any other bytes would flip the package from 1 missing to 1 FAILED — worse, not better.

## The script's protection (VERIFIED)

`sh land-c10-repair.sh <pkg> <repair>` on this host's package with the wrong-bytes candidate (the c9 receipt, 6,423 B / 333c588a…):

```
REFUSE: repair file is 6423 B / 333c588a65ade54e2c9543ec7665f600, expected 6418 B / 0a2869538a706e7e6ea864664b7e5c9f
```

exit 2, nothing written. The same refusal reproduced on all four hosts.

## The relay action (the Owner, one file copy per host — COPY, not patch)

1. From the Owner's zip root, take `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json` (6,418 B) — verify `md5 -q` = `0a2869538a706e7e6ea864664b7e5c9f` FIRST.
2. `sh land-c10-repair.sh <host-package-root> <repair-file>` — expect `before: 48 OK / 1 missing / 51 files`, `after: 49 OK / 0 missing / 52 files`, `applied: …slice1-battery.json`, `OK: 49/49`. (The after file-count prints 52 because the repair ADDS the file to the 51 — that is correct arithmetic; only the header comment's "52 files" exit-0 phrasing is stale.)
3. Idempotent: a second run prints `already present: no change`, exit 0.

**If any host does not reach 49/49: STOP and report the failing entry — do not force** (Pickle's rule, restated).

## Labels
- Before-counts: VERIFIED (fresh fetch, node-crypto md5, this sitting).
- Script refusal + idempotence logic: VERIFIED (run here, receipt above).
- The after-state (49/49): NOT RUN here — blocked on the repair bytes (UNKNOWN until the relay lands it).
- The stale "52 files" comment in ernie's script: REPORTED (the assertions are correct; only the comment is wrong — filed for ERNIE to fix in his lane).
