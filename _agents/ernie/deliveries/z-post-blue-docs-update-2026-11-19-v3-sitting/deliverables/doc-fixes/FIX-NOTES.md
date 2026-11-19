# FIX-NOTES — the three stale doc lines (TASK 2, v3.0 §3)

Date: 2026-11-19 · Seat: Z.ai · English only.
Every hash below was measured this sitting with the command shown. Labels: VERIFIED (I ran it) /
REPORTED (someone named says it) / INFERRED (reasoned).

## 1 · What was stale, and why

Two SHELL-STATUS.md copies and one build-report table row said the two dist builds were the same
file. They are not, and never were at the close-out bytes:

| build | sha256 (sha256sum, this sitting) | size (wc -c) | role |
|---|---|---|---|
| working dist (Part-0-patched) | `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` | 527,162 B | the Owner-accepted release candidate (Part 0 ACCEPTED — REPORTED, the Owner's 21:45 ruling relayed by the council) |
| delivered artifact (pre-Part-0) | `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1` | 527,177 B | the c9 sitting's delivered artifact — kept as history |

The two builds differ by the four Part-0 fixes. Measured this sitting (VERIFIED, grep on the two
dist files): `keepWeek` 0 → 2 · `cp-gonehow` 0 → 2 · the old `.cp-gonetip` fixed-width override
(`width:200px`) replaced by `width:min(240px,calc(100vw - 32px))` and the `.cp-main:focus .cp-gonetip`
leg dropped · `aria-hidden` 0 → 1 · `:focus` occurrences 1 → 0. Source files I hashed: the c10
package's `cakepanz-4/dist/single.html` (carries the working dist) and the c9 hosting's
`cakepanz-4/dist/single.html` (carries the delivered artifact), plus
`cakepanz-4-prepared/dist/single.html` (hosted c9, also `670d4c08…`, 527,177 B).

## 2 · Where the claim appears (every copy I could reach from GitHub)

| # | Location | Sentence false at its own bytes? | Fix state |
|---|---|---|---|
| 1 | c10 package (pickle's, inkling's, orcaink's — identical bytes, md5 `fd04f140…`/`1ac601c4…`/`8be4d21b…`): `cakepanz-4/SHELL-STATUS.md` | YES — the package's shipped dist is `76de5658…` (measured in-package) | FIXED — `doc-fixes/c10-package/…` + `c10-package.diff` |
| 2 | same three packages: `cakepanz-4-prepared/SHELL-STATUS.md` | YES — same sentence | FIXED — same set |
| 3 | same three packages: `ledger/build-report-zai-cakepanz-9-2026-11-19.md` row `dist/single.html` | YES — the Shipped column names `670d4c08…` | FIXED — same set |
| 4 | pickle's hosted c9 (`council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/`), byte-state `222372b8…`/`29cecad3…`/`4d723c41…` | YES — the hosted shipped dist is `76de5658…` there (measured) | FIXED — `doc-fixes/hosted-c9/…` + `hosted-c9.diff` |
| 5 | inkling's own c9 folder (`council/inkling:_agents/inkling/67-cakepanz-9-2026-11-19/`) — same file bytes as #4 | NO at its own bytes — both tree dists there are `670d4c08…` (measured) — but it describes the pre-Part-0 state | NOT edited. The same diff applies if the Owner wants every copy to carry the role wording; his call (REPORTED, not silently fixed) |
| 6 | orcaink's own c9 folder (`council/orcaink:_agents/orcaink/67-cakepanz-9-2026-11-19/`) — same as #5 | same as #5 | NOT edited — same reasoning |

Other places that mention `670d4c08…` are CORRECT usage and were left alone (verified by reading
them): the c9 tools report lines that already say "the delivered artifact `670d4c08…` (527,177 B)
stays the shipped one; this build is UNRELEASED working bytes", and the c9 START-OF-CHAT copies.
The VERIFY.txt rows that say "byte-identical across both trees" are about the 8.1 sha
`4ce69205…` — a dated receipt, true at the 8.1 bytes, explicitly superseded elsewhere. MERGE-README's
"byte-identical across both pins" is about flex.json — a different, true claim.

## 3 · The replacement wording (mine, one sentence per site)

SHELL-STATUS.md ×2 — the two physical lines beginning
`**670d4c08…**, byte-identical across both` are replaced by:

> **76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964** (527,162 B) is the
> Part-0-patched working dist and the Owner-accepted release candidate (the ruling of
> 2026-11-19); the c9 sitting's delivered artifact
> **670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1** (527,177 B) is the
> pre-Part-0 build kept as history — the two differ by exactly the four Part-0 fixes (the
> D1 keepWeek, D2 tooltip, D3 aria-hidden and D5.3 branding fixes) and are NOT byte-identical
> (the 8.1 sha 4ce69205…057a is superseded by this round's code edits).

Why this sentence is true: both hashes and both sizes were measured this sitting with `sha256sum`
and `wc -c` on the two dist files named in §1; the four-fix difference was measured with `grep -o`
counts (§1); the release-candidate role is the Owner's Part-0 ruling (REPORTED — the council
relay, 2026-11-19); the 8.1 supersession note is carried over from the original line, unchanged.
The sentence names roles, not local file states, so it stays true wherever it is pasted.

build-report row (the `| Claim | Shipped | Prepared | Receipt |` table) — replaced by:

> | `dist/single.html` | `76de5658…` — 527,162 B, the Part-0-patched working dist, the
> Owner-accepted release candidate (2026-11-19) | `670d4c08…` — 527,177 B, the c9 delivered
> artifact, pre-Part-0 history | NOT byte-identical: the two builds differ by the four Part-0
> fixes (sha256sum ×2 + cmp exit 1, measured 2026-11-19) |

(full hashes in the delivered row; the original row had the delivered artifact's hash in the
SHIPPED column, which is what made it false.)

## 4 · The edited files (md5, md5sum, this sitting)

| file | before md5 | after md5 |
|---|---|---|
| `doc-fixes/c10-package/cakepanz-4/SHELL-STATUS.md` | `fd04f140a6b241e89046507a00ed89f3` | `5d877d57f1b6556c8c987edb059b19c6` |
| `doc-fixes/c10-package/cakepanz-4-prepared/SHELL-STATUS.md` | `1ac601c436b12b60629973e5ee27237c` | `e8137dc3e61e086977f4cc06e087ae8b` |
| `doc-fixes/c10-package/ledger/build-report-zai-cakepanz-9-2026-11-19.md` | `8be4d21b5e61a8e731abb2f220448ee2` | `75c69dbd8f63692ae457eefaf662859e` |
| `doc-fixes/hosted-c9/cakepanz-4/SHELL-STATUS.md` | `222372b8342ed050273b2b6202cfd768` | `08f30249faeae37eb2198a1668c10db6` |
| `doc-fixes/hosted-c9/cakepanz-4-prepared/SHELL-STATUS.md` | `29cecad3ff502a1afafd43163def3602` | `aba2f58ae13f0d0fa08a41feababb3de` |
| `doc-fixes/hosted-c9/ledger/build-report-zai-cakepanz-9-2026-11-19.md` | `4d723c4185348d5e8ff43b23f35f5325` | `ad1e0a967dda4ddc1a53cf8497cc6131` |

## 5 · How to apply

For each host, from the package root (`<host>:/_agents/<seat>/67-cakepanz-10-2026-11-19/`):

```
cp doc-fixes/c10-package/cakepanz-4/SHELL-STATUS.md            _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/SHELL-STATUS.md
cp doc-fixes/c10-package/cakepanz-4-prepared/SHELL-STATUS.md   _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4-prepared/SHELL-STATUS.md
cp doc-fixes/c10-package/ledger/build-report-zai-cakepanz-9-2026-11-19.md _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/ledger/build-report-zai-cakepanz-9-2026-11-19.md
```

(or `patch -p1 < doc-fixes/c10-package.diff` from the c9 subtree root — the diff's headers are
already relative to `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/`.)

For pickle's hosted c9, apply `doc-fixes/hosted-c9/…` the same way from the c9 root.

## 6 · The manifest consequence — the honest part

Editing document bytes necessarily changes their md5s. VERIFIED receipts of exactly that:

- c10 package scratch copy (after the one-file repair + these doc edits):
  `md5sum -c CHECKSUMS.txt` → **46 OK / 3 FAILED** — the three FAILED entries are exactly the three
  edited files, everything else still passes including the repaired `slice1-battery.json`.
- The c9 layer's hash gate (`node scripts/gate-manifest.mjs` in the shipped tree): baseline
  (unedited hosting) fails ONLY on the pre-existing missing `.gitignore` (the known delivered-zip
  parity finding); after my edit it adds exactly one line — `MANIFEST FAIL (hash): SHELL-STATUS.md`.
- The doc-layer CONTENT gate passes both before and after: `node scripts/gate-numerals.mjs` →
  `gate-numerals: CLEAN ×2 …` exit 0; `CP_PIN=65673a00 node scripts/gate-numerals.mjs` in the
  prepared tree → same CLEAN, exit 0. My edit introduces no stale pin, no marker, no numerals break.

Whoever applies the doc fixes should update the THREE md5 lines in the c10 `CHECKSUMS.txt` (and the
two `MANIFEST.txt` sha lines for the SHELL-STATUS copies) to the "after" values in §4, in the same
action. That is a surgical line update, not a regeneration — the audit trail stays: the diff shows
what changed in the prose, and this note shows what changed in the manifests. I did NOT regenerate
or re-cut anything (the sitting's fence).
