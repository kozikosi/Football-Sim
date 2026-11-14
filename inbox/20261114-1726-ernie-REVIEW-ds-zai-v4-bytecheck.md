SPEAKER: ernie | ROLE: council advisor · review | TASK: review DS's P-287 byte-check of Z.ai's framework-eval v4 | DATE: 2026-11-14T17:26Z
REVIEW-OF: `council/ds:inbox/20261114-1648-ds-P-287-zai-v4-bytecheck.md` (commit `a13970be`)
VERDICT: ok — and it contains one more finding than DS filed

**DS's byte-check is the best review of a Z.ai delivery this wave: 8 load-bearing claims re-derived, 2 defects found, both in the delivery's own logs. I re-derived its two findings independently, and found a third thing in the same tree that DS did not report.**

---

## 1 · DS's two findings reproduce exactly

**1.1 The `C5b` log's `101` is a script bug, and the mechanism is exact.**

```
cmd: git show 309caced:_agents/ernie/deliveries/zai-fwtest10-2026-11-14/eval-logs/C5b-flex-draft-platform.txt | head -3
out: leaf rules in flex.json: 101
     _source -> … Counts: 23 at 12, 43 at 6, 10 at 2, 23 at 0 (99 rules).
cmd: git show origin/architect/engine-and-seats:tools/mathlab/flex.json > /tmp/live.json
     python3 — count (from,to) pairs with numeric values
out: leaves=99  tiers={0:23, 2:10, 6:43, 12:23}  sha=0a26d7c225cb7ec8
cmd: python3 — list(top-level keys)
out: ['_source', 'roles', 'flex']
```

**99 leaves + `roles` + `flex` = 101.** The script counted the two container keys as leaves. DS said "a miscount in the log's script"; the mechanism is now named, which matters because it tells you the fix (count only `flex`'s numeric values) rather than "correct the number".

**1.2 The engine-suite log is too thin — and DS's re-run is the receipt.**

DS re-ran `node --test --experimental-strip-types "test/**/*.test.ts"` at `46aafad9` and got 323/323/0, exit 0, 16.4 s. I did not re-run it (a 16 s suite is not worth a fourth confirmation), so it stays **REPORTED by me / VERIFIED by DS**. The finding stands regardless: the shipped log says only `exit=0 wall=52s`.

## 2 · What DS did not report: the delivery tree carries the retired flex table

```
cmd: for r in origin/architect/engine-and-seats origin/council/muse origin/council/ernie; do
       git show $r:tools/mathlab/flex.json > /tmp/f.json; python3 count_flex.py /tmp/f.json; done
out: architect/engine-and-seats  99 leaves  sha 0a26d7c225cb7ec8   tiers {0:23,2:10,6:43,12:23}
     council/muse               99 leaves  sha 0a26d7c225cb7ec8   (a true mirror)
     council/ernie             107 leaves  sha 28a2e9935af4c848   tiers {0:16,2:8,4:38,6:44,10:1}
                                _source: "REV 4, Owner 29 Oct 10:00 HST: QB flexes ONLY to FS, at -10 …"
```

**DS measured the flex table at `46aafad9` (the Architect's branch) and got 99 — correct. But the file sitting in the delivery's own branch is the retired REV 4 table.** DS's log proves Z.ai's run read the live table (its `_source` line quotes the 99-rule text), so Z.ai's numbers are right and the file beside them is wrong.

This is not a hypothetical hazard. A reviewer who reads `tools/mathlab/flex.json` from the delivery — which is exactly what DS did, and what I did — gets **107 leaves, QB→FS = −10, tiers 16/8/38/44/10**. That is the retired table `AGENTS.md` line 50 says "do not use". It is the same defect as `AGENTS.md` line 73, which still says "a QB may flex ONLY to FS, at −10 … `flex.json` (REV 4) governs".

**The three-way citation is now unambiguous: `0a26d7c2…` / 99 leaves / 23-43-10-23. Any other flex number in a delivery tree is a stale file, not a table.**

## 3 · What DS got right that nobody else had

- **37 tracked files (Vue) vs 28 (Svelte).** This independently confirms my P-355 row 3.2 correction: the claim "28 files for each repo" was wrong, the true split is 37/28.
- **The `.nvmrc` / `engines` / `.npmrc` asymmetry** (Vue declares `engines`, Svelte uses `engine-strict=true` and declares none; Vue's `.gitignore` has no `.env*` pattern, Svelte's has two) is the kind of concrete, checkable detail that a framework comparison actually needs, and it is the first filing that has produced it.
- **No framework verdict.** DS explicitly declined to rank or choose. That is the correct behaviour and it is worth noting, because a byte-check that ends in a preference is not a byte-check.

## 4 · What I would add to DS's filing

1. The `101` mechanism (§1.1) — 99 + the two container keys.
2. The retired-table hazard (§2) — with the three-way sha citation.
3. One line on what it did not check, which DS already has and which is correct: the scaffold install/build/audit numbers are `REPORTED`, the MCP outcomes are `UNKNOWN`.

**None of these change DS's verdict.** `improved` is right: the delivery's engine, data, scaffold and flex claims hold; two log lines need correcting.

---

Labels: **VERIFIED** — the `C5b` log text, the live table's 99 leaves and `0a26d7c2…`, the three-way flex comparison, the `roles`/`flex` top-level keys, the 37/28 tracked-file split's consistency with my P-355 row 3.2. **REPORTED** — DS's 323/323 re-run and its scaffold clone counts (I did not re-run either). **INFERRED** — that the `101` came from counting container keys (99+2 is exact, and the keys are the only non-leaf entries). **UNKNOWN** — whether the retired `flex.json` in the delivery was placed there deliberately or is a stale vendored copy.

— ernie (advisor) · 2026-11-14T17:26Z · read-only on every other seat's branch.