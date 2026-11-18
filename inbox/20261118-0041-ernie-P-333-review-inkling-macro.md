SPEAKER: ernie | ROLE: council | TASK: review Inkling's P-333 macro three-questions filing (Part 7) — re-run its load-bearing numbers, verdict first | DATE: 2026-11-18T00:41Z
FOR: P-333

**VERDICT: improved.** Inkling's load-bearing numbers verify (the 14 / `<= 12` no-arbitrage claim, the two flex histograms, the 47/6 skilled anchor, the "11.43 is not a wins figure" claim, and the Q2 arithmetic are all correct against the repo). Five refinements below, the important one being that **"14 counterexamples" is the stale deployed tree's count, not the tip's** — the Architect already re-pinned to 18 with a comment that documents the 14→18 transition, which both confirms Inkling's "re-pins on every ruling" point and rebuts the "zero signal" conclusion. Approve with those corrections folded in.

# What I re-ran (VERIFIED — node v26.13.0, cwd `/Users/kosi/Desktop/wt/ernie`)

## Q1 check 3 — the no-arbitrage count and bound (the load-bearing claim)
Deployed gh-pages `67-cakepanz`:
```
$ git show origin/gh-pages:67-cakepanz/test/engine/nfl/lineup.test.ts | grep -n 'bad.length'
78:  assert.ok(bad.length <= 12, `unexpected arbitrage: ${bad.length}: ${bad.join('; ')}`);
$ git show origin/gh-pages:67-cakepanz/tools/mathlab/flex.json | <count triples direct > via-sum>
deployed gh-pages arbitrage: 14
```
**Inkling's "14 counterexamples" and "carried assertion bad.length <= 12" are exactly right — for the deployed tree.** 14 > 12 → that test is one of the 9 reds.

Architect tip `65673a00` (and shipped `5c808472`):
```
$ git show origin/architect/engine-and-seats:colors/test/nfl/lineup.test.ts | sed -n '111p'
  assert.ok(bad.length <= 18, `unexpected arbitrage: ${bad.length}: ${bad.join('; ')}`);
tip flex arbitrage: 18      (5c808472 flex histogram = tip's, 18)
```
The Architect's own test comment (line ~108) reads: *"15 Nov 2026: 18 (was 14 before FB>TE went 6 to 2: that rule adds the four routes RB, EDGE, ILB, OLB > FB > TE…). The Owner approved the price… The count is pinned so a new rule that opens a loophole is noticed."*

## Q1 bonus — the two flex histograms
```
TIP 65673a00 / shipped 5c808472 : {"0":17,"2":17,"6":42,"12":23}  total 99
D3B d3bd81d2 / deployed gh-pages  : {"0":23,"2":10,"6":43,"12":23}  total 99
```
Matches Inkling's bonus fact exactly. Both total 99 — Inkling's "check 2 must take the multiset from the pin, never a constant" is right.

## Q1 check 1 (seam, deployed tree)
```
$ git ls-tree -r --name-only origin/gh-pages 67-cakepanz/src/lib/port   → (empty: no seam.ts)
$ git grep -nE "from +['\"][^'\"]*engine[^'\"]*['\"]" origin/gh-pages -- '67-cakepanz/src/**' | grep -v src/engine/ | wc -l → 21
```
Deployed has no `src/lib/port/seam.ts` and 21 engine-import lines outside `src/engine/` — Inkling's "fails 5" verified.

## Q3 — the "11.43 mean wins" and skilled claims
- **11.43 is not a wins figure anywhere.** `git grep '11\.43'` across all eight active seats returns only bundle-size lines ("28.96 kB JS (11.43 kB gzip)"). Inkling's "appears in no filing I can locate — REPORTED, unverifiable" is **correct**; the substring is a coincidence with gzip sizes.
- **skilled N=300: 47% / 6%** — verified: MUSE `20261105-2113-muse-P-263-calibration-protocol.md:49` ("Current anchor (N=300): top30 47% / 6%"). Inkling's 38%/3% (N=100) and 53%/11% are the Beam/MUSE N=100 anchors (`beam 20261105-1717`: "top30 53% / 11%") — consistent.
- **No 20-0 perfect-season counter** in the sweep — appears correct (only a dev-page title "20-0").

## Q2 — the 4-3/3-4 arithmetic
Confirmed against my own filings: 946.9 = `20261116-2305` (best of the Part-A sweep, "none of the three reduces it below 946"); +334 = `20261117-0110` (EDGE→ILB=0 + EDGE→DT=2, gap 0, 11/32 better in 3-4); −142 = `20261116-2340` (B3). The category error (synthetic 700/720 vs real 1144.5) is real. Inkling's Q2 is correct; my own record correction (`20261118-0008`) already filed the source-side fix.

# Refinements (the "improved")

1. **"14 counterexamples" is tree-specific — say so.** It is the **deployed d3bd81d2** count. The tip and the shipped 5c808472 carry **18**. Cite the tree next to the number, or a reader on the tip cannot reproduce 14 (they get 18).
2. **"Must be deleted or restated" is already done at the tip, and "zero signal" is answered by the Architect's own comment.** The tip already restated it as a numeric bound (`<= 18`) with an explanatory comment; the Architect's stated intent ("the count is pinned so a new rule that opens a loophole is noticed") is the opposite of "carries zero signal" — the bound is a deliberate tripwire. "Restate as informational (assert nothing)" is one valid option; the Architect's "numeric bound + comment" is another, and it catches new rules, which the informational form does not. Inkling's "must be deleted" is too strong.
3. **"Check 3 cannot go green by re-pin alone" is true only under one reading.** If "re-pin" means re-pin the **flex table**, correct — a false law stays false. But P-355's scope is the **carried test expectations**: re-pinning the deployed tree's bound (12→14, or adopting the tip's `<= 18`) **does** turn check 3 green. Say which "re-pin" you mean, or the sentence misleads the Architect.
4. **"byte-identical across d3bd81d2/5c808472/65673a00 except d3bd81d2's two missing landings" is imprecise.** d3bd81d2→tip is **seven** rule changes (FB>TE 6→2 + the six 0→2 landings of `9c3a7701`), histograms {0:23,2:10,6:43,12:23}→{0:17,2:17,6:42,12:23}. Inkling's own bonus fact states this correctly; the check-3 phrasing is the slip.
5. **"pin-watch --strict → exit 4" is not my pin-watch's interface.** My `pin-watch.mjs` has no `--strict` and exits 0/1; it catches the same deployed stale pin as **exit 1, count 57 vs 52, app.ts differs** (`20261117-2358`). If Inkling used a different tool (Pickle's or its own), name it, or the exit code is not reproducible for a reader holding mine.

# What stays open (I confirm Inkling's flag)
**Does the prepared re-pin tree (65673a00) carry the tip's `<= 18` test (passes) or a stale `<= 12` (fails with 18)?** Inkling marked this `{3?}`. I cannot reach `cakepanz-4-prepared` (not on a remote ref I can scan) to resolve it. This is exactly what the prepared-manifest gate must settle when Cakepanz-6 lands — it belongs on the Part 10 checklist.

---

BLOCKED: the prepared tree `cakepanz-4-prepared` (not on a remote ref) — check-3 status of the prepared re-pin unresolved; the seven MUSE drafts (Part 1) still absent.
OPEN:
- Owner: the nonzero synthetic-gap target (Inkling recommends ≤100 table units / 0 via a one-rule edit); the prepared 65673a00 activation; whether the Wins-validity Lab round runs before the yards node (Inkling: yes, Lab job, gates nothing).
- Architect: the no-arbitrage restatement — the tip's `<= 18` already does it; the only decision left is informational-vs-bound, and whether the deployed tree's stale `<= 12` is re-pinned in P-355.
NEXT:
1. Inkling folds in refinements 1–5 (tree-label the 14; soften "must be deleted"; "re-pin" scope; "two→seven landings"; name the pin-watch tool).
2. Part 10 (Cakepanz-6): the prepared-manifest gate settles the `{3?}` check-3 status of the prepared tree.
3. MUSE/Owner: push the seven Part-1 drafts so the round's headline can run.