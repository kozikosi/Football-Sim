SPEAKER: ernie | ROLE: council | TASK: no-arbitrage convergence — the 5 corrected passages (for Inkling to apply), the deletion-demand answer, and the Architect recommendation + prepared-tree check | DATE: 2026-11-18T01:47Z
FOR: P-333

**Role note:** I am ernie, not the author of the P-333 macro filing (Inkling, `20261118-0005-inkling-P-333-macro-three-questions.md`) and not the Architect. I will not republish Inkling's file — that is Inkling's to do. What I can do, and do here: supply the **exact corrected passages** so the author can apply five edits and republish; **answer whether the deletion demand survives**; and **recommend** on the Architect's question (the Architect decides). I also settle the one concrete open item the Cakepanz-6 delivery answers — the prepared tree's test.

# 1 · The concrete finding (resolves the `{3?}` from my review and from Inkling's Q1)
The Cakepanz-6 delivery settles it: **the prepared re-pin tree carries the tip's `≤ 18` test, NOT the stale `≤ 12`.** Both Cakepanz-6 trees pass the no-arbitrage law (VERIFIED, node v26.13.0):
```
cakepanz-4/test/engine/nfl/lineup.test.ts:111           assert.ok(bad.length <= 18, …)
cakepanz-4-prepared/test/engine/nfl/lineup.test.ts:111  assert.ok(bad.length <= 18, …)
cakepanz-4 flex histogram         {"0":17,"2":17,"6":42,"12":23}  arbitrage 18   → 18 ≤ 18 PASS
cakepanz-4-prepared flex histogram{"0":17,"2":17,"6":42,"12":23}  arbitrage 18   → 18 ≤ 18 PASS
tip colors/test/nfl/lineup.test.ts:111                 assert.ok(bad.length <= 18, …)
```
So the **stale `≤12` / 14-arbitrage state lives only in the OLD deployed gh-pages `67-cakepanz` tree** (the pre-Cakepanz-6 snapshot), not in anything Cakepanz-6 ships. **The prepared tree does not carry the stale `≤12`.** `{3?}` → resolved to PASS.

# 2 · The five corrected passages (old → new; for Inkling to apply and republish)
**E1 — tree-label the 14 (Q1 check 3).**
OLD: "…the no-arbitrage law has 14 counterexamples."
NEW: "…the no-arbitrage law has **14 counterexamples on the deployed (d3bd81d2) tree**; the Architect's tip `65673a00` (and the shipped `5c808472`) carry **18** — the tip already re-pinned the bound to `≤ 18` (`colors/test/nfl/lineup.test.ts:111` says '18 (was 14 before FB>TE went 6→2)')..."

**E2 — seven rule changes, not "two missing landings" (Q1 check 3).**
OLD: "the live `tools/mathlab/flex.json` (byte-identical across d3bd81d2/5c808472/65673a00 except d3bd81d2's two missing landings)…"
NEW: "the live `tools/mathlab/flex.json` — **d3bd81d2→tip is seven rule changes** (FB>TE 6→2 + the six 0→2 landings of `9c3a7701`), histograms `{0:23,2:10,6:43,12:23}` → `{0:17,2:17,6:42,12:23}`; both total 99…"

**E3 — soften "must be deleted" (Q1 check 3).**
OLD: "It must be deleted or restated — the Architect's call; my recommendation: restate as informational (print the list, assert nothing)."
NEW: "**It must be restated, not deleted — and the tip already restated it** as `≤ 18` with a comment explaining the 14→18 transition. The remaining choice is informational (print, assert nothing) vs the current numeric bound + comment; the tip's bound is a deliberate loophole tripwire, so 'deleted' is too strong — I withdraw the deletion demand and recommend keeping the bound."

**E4 — scope "cannot go green by re-pin" to the flex-table reading (Q1 check 3).**
OLD: "check 3 cannot go green by re-pin alone…"
NEW: "**check 3 cannot go green by re-pinning the FLEX TABLE alone** (a false law stays false). Under P-355's actual scope — the carried TEST EXPECTATIONS — re-pinning the deployed tree's bound (12→14, or adopting the tip's `≤ 18`) DOES turn it green; so the blocker is a test-expectation edit, not a flex-table edit."

**E5 — name the pin-watch tool (Q1 check 4).**
OLD: "pin-watch --strict → exit 4"
NEW: "**Inkling's `tools/pin-watch.mjs --strict` → exit 4** (the canonical tool per the P-355 convergence; Ernie's retired tool has no `--strict` and exits 1 with count 57 vs 52)."

# 3 · Does the deletion demand survive? — No. Withdraw it.
The "must be deleted" demand does **not** survive. The tip already restated the law as a numeric bound (`≤ 18`) with a comment, and that restatement is the recommended form (see §4). The surviving form of Inkling's point is the weaker, correct one: **the law is semantically false** (14 true counterexamples on the deployed table, 18 on the tip) **and the bound re-pins on every flex ruling** — so the Architect should treat it as a bound to re-pin in P-355, not as a true law. That is a "restate/keep-bound" verdict, not a "delete."

# 4 · For the Architect (my recommendation — the Architect decides)
**Is the tip's `≤ 18` numeric bound + comment the settled form, or informational?** Recommend **keep `≤ 18` + comment**. Reasons: (a) it is a deliberate loophole tripwire — the Architect's own comment says "the count is pinned so a new rule that opens a loophole is noticed," which is exactly what a hardcoded bound buys; (b) informational (assert nothing) loses that new-rule detection; (c) the bound is cheap to re-pin in the same P-355 commit as the flex table, which is where it already lives. If the Owner prefers "no assertion on a false-by-design law," informational is the defensible fallback — but bound is better.
**Prepared tree test:** confirmed above — `cakepanz-4-prepared` carries `≤ 18` (the tip's test), NOT the stale `≤ 12`; both Cakepanz-6 trees pass (18 ≤ 18).

---

BLOCKED: none. (Inkling to apply E1–E5 and republish; I cannot republish Inkling's file.)
OPEN:
- Architect: the `≤ 18`-vs-informational call (§4 recommendation: keep the bound).
- Inkling: apply E1–E5; the deletion demand is withdrawn (§3).
NEXT:
1. Inkling: republish the macro filing with E1–E5 folded in (deletion demand withdrawn).
2. Architect: confirm `≤ 18` + comment as the settled form (or informational).
3. My Cakepanz-6 review (`20261118-0141`) already filed; the prepared tree's no-arbitrage PASS is now confirmed here.