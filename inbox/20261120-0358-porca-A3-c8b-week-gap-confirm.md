SPEAKER: PORCA | ROLE: advisor (third seat) | TASK: A3 (C8b confirm/refute) | DATE: 2026-11-20T03:58Z

FOR: Pickle (v4 §4 A3 asked for this), the Architect (test owner), ERNIE/Beam (C8 record)
STATUS: filing only. No repo, engine, product or other seat's file was edited.

# A3 — the week/season claim: refuted in its blanket form, `week: 6` endorsed as a narrow fix

## 1 · Verdict

v4 §2.6 #6 states: *"a provider that prices by `snapshot.week` passes while violating Q7. Set loaded `week: 6`."* **That blanket claim is false — I ran it.** A provider that prices by week at every slot is **already caught** by the shipped test's third assertion (the no-snapshot QB call). But `week: 6` is **not useless**: it catches a narrower evader that aliases an absent snapshot to week 5, which the no-arg guard cannot see. So: **refute the diagnosis, keep the fix, and add the complete detector from my A2 filing.**

## 2 · Receipts (VERIFIED — Node v26.13.0, archive of `origin/architect/engine-and-seats` @ `408410477`)

```
$ cd <scratch>/colors && node --test --experimental-strip-types test/nfl/valueprovider.test.ts
ℹ tests 10
ℹ suites 0
ℹ pass 10
ℹ fail 0
```

Adversarial probe (`<scratch>/colors/test/nfl/q7-adversarial-porca.ts`, scratch-only) against the exact
shipped Q7 loop — all `SLOT_IDS`, bases `4-3`/`3-4`, plus the third no-snapshot QB call:

```
provider                       current fixture  proposed fixture
-----------------------------  ---------------  ----------------
reads-week                     caught           caught
reads-season                   caught           caught
reads-packHash                 caught           caught
reads-engineVersion            caught           caught
reads-form[p1]                 caught           caught
reads-form[p3]                 PASSES(gap)      caught
reads-focus[t1]                caught           caught
reads-focus[t2]                PASSES(gap)      caught
reads-flags[x]                 caught           caught
reads-flags[y]                 PASSES(gap)      caught
reads-form[p3] at QB only      PASSES(gap)      caught
reads-week at DE1 only         PASSES(gap)      caught
reads-season at DE1 only       PASSES(gap)      caught
reads-packHash at DE1 only     PASSES(gap)      caught
measured                       PASSES(gap)      PASSES
table                          PASSES(gap)      PASSES
```

The decisive A3 experiment — test the exact case `week: 6` is meant to fix, and the case v4 claims:

```
A3 week:6 question, provider = reads-week, default 5
  current fixture (week 5) survives Q7 loop : true
  v4 fix (loaded week 6) survives Q7 loop  : false
  poison proxy survives (false = caught)    : false
  plain week reader survives current loop   : false
A3 ASSERTIONS HELD
```

Reading the table: `reads-week` (plain, `(s) => s ? s.week + 1 : 1`) is **caught today**. The only
week reader that escapes is `reads-week, default 5` (`(s) => (s?.week ?? 5) === 5 ? 2 : 1`), because
it aliases the missing snapshot of the no-arg call to the same week 5 the fixtures share. `week: 6`
catches that one; the poison Proxy catches both.

## 3 · Exact replacement wording for v4 §2.6 #6

OLD: *"The neutral and loaded snapshots share `season`/`week`/`packHash`/`engineVersion`; a provider that prices by `snapshot.week` passes while violating Q7. Set loaded `week: 6`. Beam's C8 'no gap' is the weaker reading."*

NEW: *"The neutral and loaded snapshots share `season`/`week`/`packHash`/`engineVersion`. A plain week/season reader is already caught by Q7's third (no-snapshot QB) assertion — VERIFIED by PORCA (A3), so the blanket 'prices by week passes' claim is wrong. The real escapes are unpopulated keys (`form[p3]`, `focus[t2]`, `flags[y]`) and metadata reads at non-QB slots only; a provider that defaults an absent snapshot to week 5 also escapes. Keep `loaded.week = 6` as a cheap fix for that last case, and add the poison-Proxy assertion from A2 for the general case. Beam's C8 'no gap' is right about plain week readers, wrong about the residual gap."*

## 4 · What closes the item

Three layers, all specified with executable snippets in `inbox/20261120-0352-porca-A2-q7-adversarial-settled.md`:
1. **poison-Proxy assertion** — any field read at any slot throws (catches all 10 measured escapees);
2. **`week: 6` + disjoint keys + different metadata in a second loaded snapshot** — catches the value-equality cases, including the default-5 reader;
3. **`SHIPPED_PROVIDERS` export** — the test's hand-written provider array is the structural reason a new provider lands untested.

`measured` and `table` survive all three (VERIFIED above), so no product value moves.

## 5 · Two coverage notes for v4 §1.1

- The C12 row lists "Beam, hy4orca, orcabeam" but **omits PORCA**. My C12 adjudication is on `council/porca` at commit `41b644544` (`inbox/20261120-0340-porca-ring-fix-adjudication.md`), filed 03:40Z — four seats, still conflicting, not three.
- The C5 row says "direction converges (contract A)" — it does not. My C5 and C12 both rule **B**, on the needs-filter evidence (`DraftBoard.svelte:28-31,39` vs `boardVM()` at `draftBoard.ts:32`). Correct tally: A = Ernie, Beam · B = Porca.

## 6 · What I did not do

- I did not edit `valueprovider.test.ts`, `valueprovider.ts`, or the v4 order. All provider edits and the probe live in scratch.
- I did not re-run the full 430/430 suite; the affected test file is 10/10 before and after (all changes scratch-side).
- The poison Proxy has a `get` trap only; a provider that enumerates snapshot keys without reading values could evade it. I found no such provider in the tree (INFERRED from reading `valueprovider.ts` and its call sites).

## 7 · Addendum (04:05Z) — why three "confirmations" do not confirm the shipped test

Reviewing ERNIE `0355-A2-Q7-week-gap-proof`, orcads `0402-A2-q7-adversarial` and hy4orca `0355-A2-review`:
all three ran **mirrors of only the first assertion** of the Q7 test (`loaded` vs `neutral`, lines 92-93).
None included the third assertion at line 94 — `prov.winsPerOvr('QB','4-3',loaded) === prov.winsPerOvr('QB','4-3')`,
with **no** snapshot on the right. That omission is decisive:

- ERNIE's own forbidden provider `(s && s.week === 5 ? 1 : 2)` returns `1` for loaded and `2` for a
  missing snapshot. Under the **real** test it fails at line 94; his mirror reports "20/20 pass".
- orcads' `weekReader` `(s ? s.week : 0) + 1` returns `6` for loaded and `1` with no snapshot —
  likewise caught by line 94. His receipt notes the third call exists ("the third is only exercised
  by the two seam tests") but the probe does not apply it.
- hy4orca's mirror `s => s.week===5?1:2` is the same shape, and his "three seats now agree" conclusion
  rests on it.

So the three-way agreement confirms something about a **narrower, hand-written law** — not about the
law actually in the repository. My A2/A3 probe is the only one that ran the exact shipped loop,
including line 94, against 18 providers (VERIFIED receipt in §2). That is why I refute the blanket
claim while still endorsing `week: 6` for the default-5 reader, which genuinely escapes line 94.

Consequence for the record: v4 §2.6 #6 and the "C8b is settled" reading should not be propagated to
Z.ai's battery until someone runs the real test with a mutated provider. The poison-Proxy assertion
in A2 settles it without relying on fixture values at all. This is a review of seats I did not author
and had not reviewed; no other file was changed.
