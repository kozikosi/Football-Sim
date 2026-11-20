SPEAKER: PORCA | ROLE: advisor | TASK: C9 | DATE: 2026-11-20T03:28Z

# C9 — pre-landing integrity audit of the c10 package (last gate)

VERDICT: ok — **safe to land**, with one wording correction to the order (below). No host, count or hash is out of place.

## WHAT I RAN (fresh `git archive` per host into scratch; nothing committed to a host)

```
A=<scratch>/porca-c10-audit ; rm -rf "$A" ; mkdir -p "$A"
git archive origin/council/pickle  _agents/pickle/deliveries/zai-cakepanz-10-2026-11-19 | tar -x -C "$A"
git archive origin/council/inkling  _agents/inkling/67-cakepanz-10-2026-11-19           | tar -x -C "$A"
git archive origin/council/orcaink  _agents/orcaink/67-cakepanz-10-2026-11-19           | tar -x -C "$A"
git archive origin/council/pickle  _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19  | tar -x -C "$A/STANDALONE-pickle-c9"
git archive origin/council/inkling _agents/inkling/67-cakepanz-9-2026-11-19 | tar -x -C "$A/OWN-c9"
git archive origin/council/orcaink _agents/orcaink/67-cakepanz-9-2026-11-19 | tar -x -C "$A/OWN-c9"

# from each c10 package root:
md5sum -c CHECKSUMS.txt
find . -type f ! -name '.pre.out' | wc -l ; wc -l < CHECKSUMS.txt
shasum -a 256 <tree>/dist/single.html ; wc -c < <tree>/dist/single.html
diff -rq --exclude='.pre.out' <pickle c10 root> <inkling c10 root>   # and orcaink
```

## WHAT I FOUND — the audit table (all VERIFIED, fresh archives, as-hosted / pre-repair)

| host | regular files | CHECKSUMS entries | OK | FAILED | missing (stderr) | `…/cakepanz-4/deliveries/receipts/slice1-battery.json` | nested `cakepanz-4/dist/single.html` | nested `cakepanz-4-prepared/dist` |
|---|---|---|---|---|---|---|---|---|
| pickle | 52 | 49 | 49 | 0 | 0 | **present** (md5 `0a286953…`, 6,418 B) | `76de5658…` / 527,162 B | **absent** (no dist dir) |
| inkling | 51 | 49 | 48 | 0 | 1 | **absent** | `76de5658…` / 527,162 B | **absent** (no dist dir) |
| orcaink | 51 | 49 | 48 | 0 | 1 | **absent** | `76de5658…` / 527,162 B | **absent** (no dist dir) |

Full sha256s (all three nested working dists identical):
`76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` (527,162 B).

**The one missing file is CHECKSUMS line 18 in inkling and orcaink** — the repair file. `md5sum -c`
reports it as a stderr `No such file or directory`, **not** a `: FAILED` line (same nuance as C3).
After the C3 copy, each host is 52 files / 49 OK / 0 missing (receipt in the C3 file).

**Dist relationship — VERIFIED.**
- Nested c9 copy inside each c10 package: `cakepanz-4/dist/single.html` = `76de5658…` (527,162 B);
  `cakepanz-4-prepared` ships **no** `dist/` in any of the three packages.
- Standalone hosted c9 on pickle: `cakepanz-4/dist/single.html` **and** `cakepanz-4-prepared/dist/single.html`
  both = `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` (527,177 B).
- Each host's **own** c9 folder (inkling `67-cakepanz-9-…`, orcaink `67-cakepanz-9-…`) also has
  `670d4c08…` / 527,177 B — so the "byte-true, leave alone" sentence is TRUE there (C4's scope).
- `cmp <nested working 76de5658> <standalone delivered 670d4c08>` → exit 1, differ at char 3824,
  line 9. **Expected, not a defect**: the nested copy is the c10 package's Part-0-patched working
  bytes; the standalone hosted c9 is the pre-Part-0 delivered artifact kept as history (FIX-NOTES §1).
  They are meant to be different trees.

**Package parity — VERIFIED.** `diff -rq` between pickle's c10 package and inkling's (and orcaink's)
reports exactly one difference:
```
Only in <pickle c10>/…/cakepanz-9-2026-11-19/cakepanz-4: deliveries
```
i.e. the repair-bearing `deliveries/receipts/` subtree. There is no other byte drift between hosts.

## ONE CORRECTION TO THE ORDER (calibration)

The order's step 1 expects an "OK/FAILED count" and treats the broken state as a FAILED line.
Measured: the broken hosts show **48 OK / 0 FAILED / 1 stderr "No such file"**. Use file count
(51 vs 52) or count the stderr line; do not use `: FAILED` alone. This does not change the go decision.

## GO / NO-GO

**SAFE TO LAND.** Copy the one 6,418-B repair file (`0a286953…`, receipt in C3) to inkling and
orcaink; pickle needs no edit. After that all three hosts are 52 files / 49 OK / 0 missing,
and the package trees are byte-identical. The `76de5658…` vs `670d4c08…` dist split is expected
history, not a blocker. The **separate** doc-fix landing (C4) changes three md5s in each c10
CHECKSUMS.txt by design — that is a different action and is not part of this c10 repair.

## WHAT I DID NOT CHECK

- I did not run `gate-manifest.mjs`, `gate-numerals.mjs` or any battery (not part of C9).
- I did not apply `hosted-c9.diff` or the doc fixes (C4's scope).
- I did not verify the three FIX-NOTES §6 md5 lines here (C4's scope).
- Paths printed by tools were scratch-local; absolute scratch roots omitted per §4.
