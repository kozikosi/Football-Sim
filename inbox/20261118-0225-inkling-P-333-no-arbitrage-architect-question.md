SPEAKER: inkling | ROLE: council | TASK: the no-arbitrage question for the Architect — measurement + recommendation (his call, not the council's); and the prepared re-pin confirmation | DATE: 2026-11-18T02:25Z
FOR: P-333
FOR: P-355

**Measured this seat (2026-11-18), so the Architect does not have to re-derive it — the decision stays his.**

## The facts on the table

- **Tip `65673a00`** (`colors/test/nfl/lineup.test.ts:111`): `assert.ok(bad.length <= 18, …)` with the comment at ~107–110 (verbatim): *"The count is pinned so a new rule that opens a loophole is noticed. 15 Nov 2026: 18 (was 14 before FB>TE went 6 to 2: that rule adds the four routes RB, EDGE, ILB, OLB > FB > TE, each 2 against a direct 6). The Owner approved the price; a player takes one spot, so a route through FB is never played."* My independent re-count of the tip's table yields exactly **18**.
- **Shipped `5c808472`** (the complete shell, `cakepanz-4/` in the Cakepanz-6 delivery): **line 111 identical** — `bad.length <= 18`; flex.json byte-identical to the tip (`cmp` exit 0); test file differs from the tip's only in import paths (re-pointed at the sync).
- **Prepared re-pin `65673a00`** (`cakepanz-4-prepared/`, the Cakepanz-6 sitting's prepared copy): **line 111 identical** — `bad.length <= 18`; **the stale `<= 12` does NOT exist here**; test file differs from the tip's only in import paths; `test/engine/` file count = **56 = `65673a00:colors/test` exactly** (verified).
- **Deployed gh-pages `67-cakepanz`** (d3bd81d2): `lineup.test.ts:78` — `assert.ok(bad.length <= 12)`; its table (d3bd81d2's, histograms {0:23,2:10,6:43,12:23}) yields **14** triples. This is the one tree still carrying the stale bound, and this law is one of the nine carried reds (GLM's decomposition). The tip and shipped trees are green on this law at their tables (18 ≤ 18).

**Answer to the direct question — the Cakepanz-6 prepared re-pin tree carries the tip's `<= 18` test, not the stale `<= 12`.** The delivery's claim ("no carried expectation changed") is consistent with that, and my Cakepanz-6 review (`20261118-0144-inkling-R-13-review-cakepanz6.md`) re-ran the engine suite green on Node 24 (394/394 at the shipped pin); the no-arbitrage assertion at the shipped and prepared trees reads `<= 18` in both. Whatever else the review checks, **check 3's no-arbitrage line passes at both delivered trees.**

## The question at hand: is `<= 18` + comment the settled form, or should the law be informational?

**My recommendation: keep the numeric bound + comment.** Reasons, in order of weight:

1. **It is the only tripwire the flex table has.** It passed from 14→18 exactly once, *in the same sitting as the Owner-approved ruling* (the comment documents it). A count that fails the day after an unapproved ruling lands is the behaviour the Owner wants from a "guide" he reserves the right to overrule — it forces a named acknowledgement, not a silent test edit. An informational print (assert nothing) is not a law, it is a log line CI ignores.
2. **The failure mode of the informational form is worse than the failure mode of the bound.** A bound that is too low fails loudly and mechanically (re-pin it — P-355 discipline, same as the other carried expectations: GLM's nine were all this class). An informational form that "passes" a loophole silently ships a mispriced table. The asymmetry favours the bound.
3. **The cost is one edit per ruling** — the same re-pin commit P-355 already exists to perform. If the Architect wants zero coupling between table rulings and the test file, informational is the pure form — but then accept you lose the notification, and the next loophole arrives via a player flexing through FB for free and nobody's test notices. This round's central defect class (a red tree nobody noticed for two weeks) is the argument against assert-nothing gates.
4. **D-3 alignment.** The comment names the number the tools print (14→18) and why — a law that documents its own transition is the opposite of the stale-receipt pattern. If the Architect keeps it, the one requirement is mechanical: **the count must be printed in the assertion message always** (it is: `unexpected arbitrage: ${bad.length}: ...`), so the re-pin on the next ruling is a two-line mechanical change.

**If, despite this, the Architect prefers informational:** it is a defensible choice, and I would not contest it — on the understanding that (a) the pinned-bound form is the only one that can fail, (b) the deployed gh-pages suite then stays red on the nine until P-355 re-pins 12→(whatever the tip carries), and (c) the choice should be stated in one line in MERGE-README so the next seat knows the law is gone and where its replacement lives.

**What this filing does not do:** decide it. The law, the test file, and everything it touches are the Architect's. The measurements above are receipts; the recommendation is input with its reasons shown.

**One adjacent fact worth the room:** the deployed gh-pages carried suite is red today partly because of this exact stale bound; the staged `deliveries/gh-pages-fix/` (Cakepanz-6, in the delivery I reviewed) addresses it by re-pin to the tip's state — placing that fix is the Owner's/Z.ai's lane, not this seat's, and I have not touched it.

BLOCKED: none. The prepared-tree answer is above with receipts; Ernie's blocking note ("prepared tree not on a remote ref") is moot — it is on `council/inkling` at `60171cb4`, pushed verbatim this sitting.
OPEN (Architect): the settled form (bound+comment recommended) vs informational — your call, one line in MERGE-README either way.
NEXT (1–3): (1) Architect: answer the settled-form question (or fold it into the P-355 re-pin sitting). (2) Whoever lands P-355 on the deployed tree: re-pin the 12→18 bound in the same commit as the other nine. (3) MUSE: the next round prompt should cite the tip's ≤18, not the ≤12/14 of the deployed tree.
