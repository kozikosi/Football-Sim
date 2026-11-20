SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C4 — simulate the doc-fix landing and verify the three replacement md5 lines | DATE: 2026-11-20T03:36Z

FOR: the Owner (the landing), the council
VERDICT: **verified end to end** — the hosted-c9 diff produces exactly the three md5s in `FIX-NOTES.md` §6; the two byte-true copies are confirmed byte-true and should be left alone.

Scratch only (`/tmp/docfix-rehearsal`); no branch touched.

---

## 1 · The correct invocation (and Pickle's D1, reproduced)

The diff is rooted at `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/…`. So:

| where you run it | flag | result |
|---|---|---|
| the archive root (the directory that contains `_agents/`) | `patch -p1` | **works** — 3 files patched |
| the c9 subtree root (`…/zai-cakepanz-9-2026-11-19/`) | `patch -p5` | **works** — 3 files patched |
| the c9 subtree root | `patch -p1` | **FAILS** — `No file found--skip this patch?` ×3, 1/1 hunks ignored (Pickle's D1, reproduced) |

So `FIX-NOTES.md` §5's parenthetical "`patch -p1` from the c9 subtree root" is wrong; the parenthetical should read "`patch -p5` from the c9 subtree root, or `patch -p1` from the archive root". The `cp` route is correct.

## 2 · The receipt

```
git -C $Z archive origin/council/pickle _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19 | tar -x -C /tmp/docfix-rehearsal
cd /tmp/docfix-rehearsal
patch -p1 --dry-run < …/doc-fixes/hosted-c9.diff     # 3 files, clean
patch -p1 < …/doc-fixes/hosted-c9.diff
md5 -q <the three files>
```

| file | before | after | FIX-NOTES §6 |
|---|---|---|---|
| `cakepanz-4/SHELL-STATUS.md` | `222372b8…` | **`08f30249faeae37eb2198a1668c10db6`** | `08f30249…` ✓ |
| `cakepanz-4-prepared/SHELL-STATUS.md` | `29cecad3…` | **`aba2f58ae13f0d0fa08a41feababb3de`** | `aba2f58a…` ✓ |
| `ledger/build-report-zai-cakepanz-9-2026-11-19.md` | `4d723c41…` | **`ad1e0a967dda4ddc1a53cf8497cc6131`** | `ad1e0a96…` ✓ |

All three match the replacement lines in `FIX-NOTES.md` §6. The c10-package diff was verified the same way earlier (after md5s `5d877d57…` / `e8137dc3…` / `75c69dbd…`, matching §4).

## 3 · The two byte-true copies — leave them alone

| host | tree | dist sha256 (first 16) |
|---|---|---|
| inkling's own c9 | `cakepanz-4` | `670d4c08f2ab9293` |
| inkling's own c9 | `cakepanz-4-prepared` | `670d4c08f2ab9293` |
| orcaink's own c9 | `cakepanz-4` | `670d4c08f2ab9293` |
| orcaink's own c9 | `cakepanz-4-prepared` | `670d4c08f2ab9293` |

Both trees carry the delivered dist in both hosts, so the sentence "**670d4c08…**, byte-identical across both trees" is **true at those bytes**. They are reported, not edited. The only copy where the sentence is false is the c10 package (and pickle's hosted c9, whose sentence is true at its own bytes — Z.ai's §10.2 misclassifies that one, Pickle's D2).

## 4 · What the Owner does

1. Apply the **hosted-c9** diff to `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19` from the archive root (`patch -p1`), or `-p5` from the subtree root.
2. Apply the **c10-package** diff to the three c10 packages from the archive root (`patch -p1`).
3. Update the three CHECKSUMS md5 lines to the §6 values **in the same action**.
4. Leave inkling's and orcaink's own c9 copies untouched.

## 5 · What I did not check
- I did not apply anything to a branch. Scratch only.
- I did not re-run the gate-numerals on the patched tree (the diff does not touch numerals); the earlier receipts stand.