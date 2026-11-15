SPEAKER: inkling | ROLE: council | TASK: review Z.ai's authoring sitting delivery | DATE: 2026-11-15T13:42Z
REVIEW-OF: `_agents/inkling/deliveries/zai-sitting-2026-11-15-authoring/` (commit `85a54b66`, vendored byte-exact; 359 files; CHECKSUMS
verified 358/358 OK). Pushed and readable:
https://github.com/kozikosi/Football-Sim/tree/council/inkling/_agents/inkling/deliveries/zai-sitting-2026-11-15-authoring
VERDICT: **improved** — the work is sound, honest, and receipt-rich; it lands as evidence, but six specific corrections are owed before the Owner quotes its numbers or rules on UE-vs-Svelte from it. Not ok (defects below), not rejected (nothing material is wrong).
FOR: P-345 (the framework comparison — same labeling note as my Rev 2 design review: the live queue's P-345 is the play-level innovation round; this delivery belongs to the framework-comparison line of work; flagging, not renumbering).

Labels: VERIFIED = I ran it this sitting · REPORTED = read from the delivery/other seats · INFERRED · UNKNOWN. Reviewing means trying to break the claim; I tried, and it mostly held.

## What I ran / verified (commands + results)

| Check | Result |
|---|---|
| `shasum -a 256 -c CHECKSUMS.txt` inside the copy | **358/358 OK, exit 0** (359 files; checksums cover 358 — one file, the CHECKSUMS itself, excluded by construction — matches) |
| Pin-truth spot check: `slots.ts` `flex.ts` `keyedrng.ts` `dataset.ts` `draft.ts` (both arms live vs `git show d3bd81d2:colors/src/...`) | **6/6 MATCH** (sha256 16-hex, both arms) |
| Engine trees identical between arms | `diff -rq arm-vue/src/engine arm-svelte/src/engine` → **CLEAN**; vapor arm also **CLEAN** |
| Chrome bytes: `cards.css`, `cardVM.ts`, `cardDraw.ts` (cmp between arms) | **CLEAN ×3** |
| Product HTML in tree (`find -iname 'Football-Sim*.html'`) | none — one-writer rule respected; this is two scaffolds, not a build |
| `node --experimental-strip-types tests/pool-ledger/pool-ledger.test.mjs <abs root arm-vue>` | **PASS** — 1,941+12=1,953; board 1,921; gap = 32 LS, one per team, named (`draft.ts` l.53) |
| `… tests/turnovers-named/turnovers-named.test.mjs` | **PASS** — 16/16 turnovers named across 6 games, reconciled to `agg[side].to` |
| `… tests/banned-phrasings/banned-phrasings.test.mjs` | **PASS** — 0 hits |
| OT-clock defect at `feed.ts` l.59-60 (actual code, not the filing's paraphrase) | **DEFECT PRESENT, VERIFIED**: `q = Math.min(4, …)` clamps OT to Q4 and `left = 900*q − secs` goes negative ("Q4 -3:-4"). Both arms, pin d3bd81d2. Z.ai's `filings/OT-clock-fix-PENDING.txt` is accurate. |
| Getter-wrapper idiom in the Svelte store (`appStore.svelte.ts`) | present at l.40-44 and l.86-89 (`state_invalid_export` remedy, 2 comments, the `board`/`cards`/`studied` getter pattern). VERIFIED at source. |
| Store line counts as shipped (`wc -l`) | arm-vue `appStore.ts` = **83**, arm-svelte `appStore.svelte.ts` = **98** (vapor = 61). The DECIDES row quotes 61 vs 68 (see D1) |
| `Cards.svelte` / `Cards.vue` line counts | 85 / 81 (the filing quotes 82 / 81) |
| Data files identical between arms | `cmp` CLEAN (`madden27-ratings.csv`) |
| Engine digest `425d6a7f…` (bundles receipt) | NOT re-derived — the LF-normalisation algorithm is not documented enough to reproduce byte-exactly; REPORTED |

**Not run** (said so, per protocol): dist rebuild (dists are not shipped — Z.ai claims reproducibility; I did not rebuild), HMR/dev-server timings, the vapor enablement history (REPORTED from build logs), 390px probes, screenshots, the arc-work anecdotes, the w89/arc visual claims, `git show` byte-diff of every engine file (spot-checked 6/57).

## Defects — fix or counter-file before quoting the verdict

**D1. The decision rests on a stale count, and it is the ONE DECIDES row that separated.** CATEGORY-WINNERS row 9 and `measurements/AGENTIC-ERGONOMICS-VERDICT.txt` both quote "appStore.ts 61 L vs appStore.svelte.ts 68 L" as the evidence. Those are the *four-slice* numbers (I have the four-slice tree: 61 and 68, matching). The **shipped** bytes are **83 vs 98** — same direction, same idiom, but (i) the arithmetic is no longer the receipt it cites, and (ii) growth per sitting now favours Vue further (+22 vs +30). The fix is one line: re-quote the shipped numbers and attribute them (`wc -l`, path). This matters specifically because every other DECIDES row is a tie and the verdict says so: the pick currently stands on this row.

**D2. Bundle/vapor numbers float without the delivery's own labelling discipline.** The delivery's METHOD note (two-arm-bundles.txt) is exactly right — per-file gzips don't sum, JS-only per-file delta is the criterion — and CATEGORY-WINNERS row 1 still cites "10.7 kB" for vapor, which is neither the vapor receipt's own figure (9,519 B concat gz / canonical 10,969 B) nor slice5's 10,706 B. Across the delivery you will find 10,530 (season concat), 10,706 (slice5 JS/file), 10,969 (four-slice concat), 11,569 (four-slice JS/per-file, the labelled one), 9,519 (vapor concat), 11,633-class re-runs — all real, all different methods, only two of them labelled in the winner table. One canonical number per claim, each cited with method; that is the delivery's own rule, applied inconsistently to the rows the Owner will actually read.

**D3. The 34-vs-9-minute authoring gap is labelled correctly in AUTHORING-COST.md and is NOT carried into the winner table.** Row 18/AUTHORING-COST honestly attribute most of the 9 min to the second arm paying zero probe cost (order-of-authorship, recorded as exactly that), and the in-file verdict says "authoring cost alone is even within measurement noise." The compression into CATEGORY-WINNERS ("authoring cost 18 — tie") and the VERDICT's "Vue … 0 failed builds" framing loses the qualifier. Anywhere the number appears, it must carry: **after the shared instrumentation exists, the second arm of this pair is ~9 min in either direction.** Without it, "Vue is easier to code in" is an artifact of authoring order wearing a framework costume.

**D4. README standing note** — "Live site per the Owner: w85 (gh-pages' newest publish is w89 — verify per START-OF-CHAT §3)". The w89 half is right; strike the w85 frame next revision. START-OF-CHAT already caught this class of error; don't re-ship it.

**D5. The 62% Vue recommendation must not be ruled on as-is — and Z.ai already knows it.** The verdict file itself says: file the verdict, build the week-stepper (store-heavy) as the tie-breaker, let the Owner sign after that number exists; and INNOVATION.md Idea 2 (the Flip Bench) names the hole: row 9's cost "has only been COUNTED, never measured under time." My review confirms from the other side: the only DECIDES row that separated is (i) structurally real (VERIFIED — the getters exist and the compiler forces them) but (ii) its *cost* is unmeasured, (iii) it rests on four-slice numbers (D1), and (iv) the whole result is one agent, whose training-mix confound is named in every file yet not removed. Correct posture for the Owner: **near-even, Vue-leaning, 62% confidence, reversible, NOT a cutover ruling.** If the Owner wants the arm chosen now, it is a ≤62% call carrying a multi-sitting commitment decided by a counter that needs a stopwatch and a second corpus (Flip Bench + PROTOCOL-FOR-A-SECOND-AGENT.md, both filed and cheap). If the Owner waits: one store-heavy sitting (week-stepper/saves hydration) + one second-agent run. The delivery asks for exactly this; my review endorses the ask and adds nothing that shortens it.

**D6. Two items are owed to the Architect, not this council, and both are now VERIFIED defects/facts, not proposals:**
1. **OT clock** (`feed.ts` l.59-60, both arms, pin d3bd81d2): OT renders as "Q4 00:00"/"Q4 -3:-4"; the drive-line workaround exists in FeedPanel but the engine function itself is wrong. Fix PENDING in the delivery; Architect's call.
2. **Vanilla `file://` boot FAILS in both arms** (vite `crossorigin` + null origin ⇒ CORS block) — the offline hard requirement. Fix is vite-config-level (per offline-boot.txt); Architect's call. Until then, "offline: tie" in the winner table row 15 is technically accurate about the *failure* being identical but should not read as "offline works" — it doesn't, for either arm.

## What this delivery does well (say it, don't just defect it)

- The receipts are real: 358/358 checksums; byte-identical chrome across arms; cmp-CLEAN engine trees; the fixture-derivation trail (fixture.json + mint scripts) is replayable.
- The honesty discipline is the strongest I've reviewed from Z.ai: the confound is named in every file; the order-of-authorship asymmetry is recorded against Z.ai's own interest; the vapor falsifier was run and did not fire; the wrong team-index hallucination is filed against the author.
- The questionnaires are the right template for the framework experiments' self-report arm: every answer carries an evidence pointer or `evidence: NONE`. Adopt this shape for E4 wholesale — bare Likert was the one weak instrument left in the round-2 design.
- `PROTOCOL-FOR-A-SECOND-AGENT.md` + the Flip Bench make the missing experiment runnable by anyone; nothing is gated on this chat.
- The delivery respects Walker's bounds and the one-writer rule (no product bytes, ratings untouched, engine consumed read-only and pinned).

## Cross-read against the Rev 2 experiments (my design review, same day)

This sitting *is* E1 (within-agent, randomised order, pinned fidelity, receipts not narration) executed on-pin, minus E2 (maintenance edit) and minus the second agent. It does not replace the fresh-start repos — those measure authoring on a clean tree at v8/this pin-equivalent, which this delivery deliberately is not (it re-reads existing layers and patches screens onto them). What it does: (1) pre-answers the ergonomics question approximately, at 62%, honestly labelled; (2) supplies the fixtures, probes, and protocols the Rev-2 experiments can lift wholesale; (3) demonstrates that "the engine is the truth" survives porting (6/6 spot checks byte-MATCH the pin). If the Owner rules before the fresh-start experiments finish, the risk is adopting a 62% counter as settled — D5 applies. If the fresh-start round runs anyway, its E1 should use this tree's protocols and cite this delivery as the pilot.

## Weakest point of this review

My pin-truth check is a 6-file spot check, not all 57; my test re-runs exercised arm-vue only; I produced no independent rebuild, no HMR number, no screenshot. The checksums bind the tree to what Z.ai pushed, not to what is correct — if the *content* is wrong somewhere outside my reads, I missed it. That is the same epistemic position this delivery asks of its own reviewers, and it is the right one; it just cannot certify the unmeasured.

## Verdict, restated

**IMPROVED.** Accept the delivery as the standing evidence; require before any Owner-facing citation: (1) D1 store re-quote (shipped bytes), (2) D2 §1.1 labelling everywhere the bundle appears, (3) D3 the instrumentation qualifier everywhere 34/9 min appears, (4) D4 strike w85. D5 and D6 are governance, not file edits — the Owner holds them. If Z.ai counter-files on D1/D2 with evidence, fine — that is what review is for; my numbers are `wc -l` and the receipts cited above.

— inkling (advisor seat) · 2026-11-15T13:42Z · read-only on every other branch · nothing pushed but this file
