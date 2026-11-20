SPEAKER: PORCA | ROLE: advisor | TASK: C4 | DATE: 2026-11-20T03:28Z

# C4 — doc-fix landing simulation (hosted c9, third host) + the byte-true copies

VERDICT: ok — `hosted-c9.diff` applies cleanly to a fresh checkout and reproduces the three delivered
after-files byte-for-byte; all three md5s match FIX-NOTES §6. Inkling's and orcaink's own c9 trees
are byte-true and must be left alone, as the note says.

## WHAT I RAN (fresh archive into scratch; nothing committed to a host)

```
C4=<scratch>/porca-c4 ; rm -rf "$C4" ; mkdir -p "$C4"
git archive origin/council/pickle _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19 | tar -x -C "$C4"
git show origin/council/ernie:_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/hosted-c9.diff > "$C4/hosted-c9.diff"
patch -p1 --dry-run < hosted-c9.diff     # from $C4 (the c9 parent)
patch -p1 < hosted-c9.diff
md5 -q <each of the three patched files>
cmp <v3 doc-fixes/hosted-c9/<rel>> <patched <rel>>      # three times
```

The diff headers are `a/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/…`; from the c9 parent
`patch -p1` strips `a/` and applies all three files (equivalent to `-p5` from the subtree root,
as the order says). Both dry-run and real apply reported `patching file …` ×3 with no fuzz, no rejects.

## WHAT I FOUND (VERIFIED)

**The three md5s — exact match to FIX-NOTES §6:**

| file (relative to the c9 root) | measured after patch | FIX-NOTES §6 after | match |
|---|---|---|---|
| `cakepanz-4/SHELL-STATUS.md` | `08f30249faeae37eb2198a1668c10db6` | `08f30249…` | yes |
| `cakepanz-4-prepared/SHELL-STATUS.md` | `aba2f58ae13f0d0fa08a41feababb3de` | `aba2f58a…` | yes |
| `ledger/build-report-zai-cakepanz-9-2026-11-19.md` | `ad1e0a967dda4ddc1a53cf8497cc6131` | `ad1e0a96…` | yes |

**Delivered after-files are byte-identical to the patched result:** `cmp` exit 0 on all three
`doc-fixes/hosted-c9/<rel>` files. So the diff lands exactly what v3 shipped.

**The two byte-true copies — VERIFIED, leave alone.** Both dists in each host's own c9 tree:

| host | `cakepanz-4/dist/single.html` | `cakepanz-4-prepared/dist/single.html` |
|---|---|---|
| inkling (`67-cakepanz-9-2026-11-19`) | `670d4c08…` / 527,177 B | `670d4c08…` / 527,177 B |
| orcaink (`67-cakepanz-9-2026-11-19`) | `670d4c08…` / 527,177 B | `670d4c08…` / 527,177 B |

The note's sentence is TRUE at these bytes: the "two trees are byte-identical" claim holds in both
own-c9 copies (unlike pickle's nested working tree at `76de5658…`, C9). No edit is owed there;
whether to carry the role wording into them anyway is the Owner's open policy question (C7).

## WHAT I WOULD CHANGE

Nothing in the artifacts. The three md5 lines in FIX-NOTES §6 need no correction.

## WHAT I DID NOT CHECK

- I did not apply `c10-package.diff` here (the c10-package side of the doc fixes; out of C4's scope,
  and it changes the c10 CHECKSUMS.txt md5s by design — see FIX-NOTES §6).
- I did not run the manifest/numerals gates (`gate-manifest.mjs`, `gate-numerals.mjs`); C4 is the
  md5/byte-truth landing check only.
- I did not touch any host branch (scratch only).
