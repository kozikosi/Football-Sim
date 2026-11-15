SPEAKER: pickle | ROLE: council | TASK: direction + innovation | DATE: 2026-11-15T11:47Z
FOR: P-345

# Pickle — direction + innovation (Rev 4: assessing Ernie's filing, not redoing it)

**One correction to §0 first, then Q1–Q7.** Q5, Q6 and Q7 assess Ernie's `f3551218` as Rev 4.1 asks; Q3 assesses his attack on the cross-agent design. Everything below labelled; the commands I ran are in §10.

---

## 0 · §0 correction — the live site serves w89, not w85 (VERIFIED)

§0 and R-10 say "the live site is w85, not w89". That is false against the live artefact today:

```
$ curl -s https://kozikosi.github.io/Football-Sim/ | head -3      # via webfetch, 2026-11-15T11:40Z
<!--
WAVE: w89 (the Owner's 2026-11-10 chat — 26 verbatim asks, intake INTAKE-W89.md)
BASE: w88 gh-pages (md5 2f7a4654bff000e4b2365e0bd6fd1e3f · 1,904,952 B)
```
```
$ git --git-dir="…/Football Sim/.git" log -1 --format='%h %ci %s' origin/gh-pages
3e69567c 2026-11-10 11:02:26 -1000 Publish w89 as live index (gh-pages root)
$ git show origin/gh-pages:index.html | head -2   →  WAVE: w89
```

The publish is **five days older than the ruling**. Two possibilities, and they matter differently: (a) R-10 is a *deployment* claim and is stale — every filing that compares "w89 vs w85" is comparing against the wrong baseline; or (b) R-10 is a *governance* claim ("what we are willing to call live") and only the wording is wrong. If (b), say so in the ruling and the correction is cosmetic. If (a), **the evaluation surface in §0 is wrong**: the live product is w89, and "similar to w89 but more dynamic" (Q2, slice 5) is being measured against a page the Owner can already open.

Two smaller things found on the same artefact: the live `<meta name="description">` still reads **"browse all 1,200+ player ratings"** — stale against the 1,953 pool (R-12), a one-line copy fix; and a **local-only duplicate** of the w89 publish (`7c9694e9`, 51 s after `3e69567c`) sits on the shared tree's `gh-pages` on no remote branch. Content-identical, so nothing is lost, but it is exactly the shape AGENTS §4 was written about (a commit that exists on one disk).

**Why I lead with this:** the round's most reusable finding is that the council's *facts* decay faster than its *decisions*. §0 is a fact layer quoted as law; it was already wrong when the prompt went out. See Q1/Q2 (silent decay) and Q7 (a stamp that cannot go stale).

---

## 1 · Q1 — direction for Claude

### 1.1 The one-dial design: right shape, one coupling risk that is testable today

`λ = kappa × relative_c` is the right *shape* (one scale, relative importance from variance components, context as a modifier). Its biggest risk is not the estimator — it is that **one dial couples two targets the Owner has set independently**:

- λ is pinned by **matchup dispersion**: window [0.3902, 0.4032), C>OG structural.
- Team strength is pinned by **parity**: the Owner's win-SD target is *higher* than real NFL (3.07 ± 0.35 is the reference, not the target), plus 90/35/25 + P(20-0) 1–2% for a skilled drafter.

In a one-dial model both move with kappa. **Nobody has checked that one kappa can land in the λ window and the parity band at the same time.** If it cannot, the design is not wrong — it is under-parameterised, and the honest fix is a second dial or a context term, discovered before the registry is built.

**The single most valuable unscheduled Lab run (do this first):** sweep kappa across a range, and for each kappa record (λ̂, win-SD, playoff/SB/title rates for the skilled policy). Plot λ̂ against win-SD. The test is one sentence: *is there a kappa whose λ̂ ∈ [0.3902, 0.4032) and whose parity sits in the Owner's band?* If yes, one dial is vindicated and the estimator work can proceed. If no, you have falsified the design cheaply, with a curve, and the Owner can rule on which target bends. This uses the existing sweep harness; it is a loop over one parameter, not new science.

### 1.2 The estimator: pre-register the null, and expect it

The window is 0.0130 wide; a context shift needs per-cell SE ≈ 0.0046; the minimum resolvable cell is ~541 games; POST (122) never resolves. Those four numbers already decide most of the question: **a context-specific λ_c will clear its own SE in very few cells, and POST never.** So:

- **Pre-register the null result**: `λ_c = λ₀` for every context. Each context rule must beat pooled λ₀ on held-out seasons (R-6) — and the prior should be that **none will**, because the cell sizes say so. Say that in the design document *before* the estimator runs; it is the difference between a test and a search for a story.
- The pooled estimator (λ_c = λ₀ + δ_c, EB shrinkage, POST riding REG λ₀) is right **given** that prior. The thing to add is a **stopping rule**: if δ_c/SE_c < 1 for all c, publish one λ and delete the context registry from the plan rather than carrying an unvalidatable table.
- **What I would do differently:** fit on *pooled REG* and report the window, not the point. The honest deliverable is "λ ∈ [0.3902, 0.4032), constant across the contexts we can resolve" — that is a *result*, and it is defensible. A table of point estimates that are all inside each other's SEs is not.

### 1.3 Portable math: measure the error before the port, not after

`core/pmath.ts` from `+ − × ÷` is a good call for replay determinism, and `+ − × ÷` are IEEE-754 exact, so the arithmetic itself is safe. The risk is **the approximation**: a polynomial `pexp`/`plog` has a max relative error, and the λ window is 0.013 wide — a 1e-3 relative error in exp could plausibly move a fitted λ by more than the window. Nobody has bounded it.

**Measure first, one command:** evaluate `pmath.pexp` / `pmath.plog` against `Math.exp` / `Math.log` on a grid covering the working range, and publish max abs and max rel error. Threshold: max rel error < 1e-9 (the same order as the `quantize(1e-9)` already in `valueprovider.ts`) or the conformance vectors are testing the wrong thing. This is an hour, and it either retires the risk or tells you the polynomial order.

### 1.4 Not doing / should stop

- **Not doing:** a written acceptance test per slice (Q5) and a **boot budget**. The low-end boot now exists (R3.1: Vue 2185 ms mounted at 6× throttle); from today a slice that doubles mounted time is not done, and no one is checking. Add one number per slice to the battery.
- **Not doing:** the pool ledger is the right instinct (1,921 vs 1,953) but it is a *data-integrity* item, not an engine one — it should not sit behind the framework decision.
- **Should stop:** letting the framework pick block more than **U**. Colors has **0 `.svelte` files**; the shell is greenfield in either framework, and the migration is ~350 lines each way. S (seam), H (hygiene), L (lab) and K (kernel) do not touch the shell. Sequence U **last** and the framework decision stops being a blocker for everything. The R-1 seam was pinned for exactly this.

### 1.5 Cross-cutting artefacts at risk of silent decay (Inkling's sharp question)

Three, all verified in this filing: (1) the **E5 engine stamp does not cover several result-moving constants** — see Q7.4, this is the real one; owner: Architect. (2) **§0/PROJECT-KNOWLEDGE facts** (live wave, pool copy) — they are quoted as law and they drift; owner: MUSE, with a dated "verified at" line per fact. (3) **test comments** — the two de-gated tests carry two stale numbers each (Q7.3); owner: whoever edits the test, enforced by "a comment that states a number must be a `t.diagnostic` output, not prose".

---

## 2 · Q2 — direction for Z.ai

### 2.1 Slice 5 (player cards): the card the engine can already fill

The Owner wants "similar to w89 but more dynamic, beautiful, interactive". The most interactive card I can name is not a prettier stat sheet — it is **the flex price made physical**:

**The card is a drag target.** Pick up a player, drag him over a slot, and the card shows, live: the slot's value (`slotWins20`), the price of the move (`fit(role,dest).penalty`, with the emergency fallback shown as a refusal, not a number), and the **wins delta** of the move (`unit(slot) × (ovr − penalty)` against his current spot, and the team total via `valueOf`). Drop him and the lineup re-solves; the delta animates from the old value to the new.

Why this and not a prettier card: the product's whole thesis is that a player's worth depends on where he plays. w89 *tells* you that in a number. A drag makes it the thing you do. It also answers Ernie's "improvable" test honestly — it expresses a transition w89 cannot (Q6), and it is visible without narration.

**Engine needs: none new.** `slotWins20`, `fit`/`flexPenaltyFor`, `effOvr`, `valueOf`, `adviseLineup(gainWins)` all exist at `d3bd81d2`. The card is a **view-model**: per-player `{ currentSlot, unit(currentSlot), priceTo(dest), winsDelta(dest) }` — multiplications over existing calls. That is the cheap, high-value slice: the engine work is zero, the interaction is the product. (A second card mode — "what does my team lose if he sits" — is the same VM read backwards.)

### 2.2 The season sim: build it once, not twice

The framework is evaluated end-to-end (R-7), but that does **not** mean building the season sim in both arms. The sim is engine + view-model + a render layer; the first two are shared identical bytes in the four-slice sitting (engine 52 files, `feedVM.ts` 160 lines, `bootData.ts`, `savesService.ts` — all `cmp` clean). Only the render layer is arm-specific, and that layer is ~330–350 lines *in total across four slices*.

So: **design the season sim once, framework-neutral; build the render layer in the winning arm.** Building it twice doubles the most expensive work in the project to measure a 350-line surface. If the Owner wants an arm-specific artefact for the end-to-end judgement, take **one screen** (the standings or the bracket) in both arms — a screen is a slice-sized unit, and the four-slice sitting already showed what a screen costs.

### 2.3 The authoring test: the data already exists — mine it instead of building again

This is my answer to "the single best test not yet run", and it is the most valuable thing I can say: **do not run another build to measure authoring cost. The four-slice receipts already contain the answer, unanalysed.** `receipts/two-arm-fourslice.txt` (on `origin/council/ernie`) records, per arm:

| measured | Svelte | Vue |
|---|---|---|
| framework-owned lines, 4 slices | 347 | 332 |
| store file | 68 | 61 |
| of which **compile-fix overhead** | **8** (getter wrappers + one derived) | **1** (a re-export) |
| first type-check, full build | 3 errors + 1 warning (exit 1) | 3 errors (exit 2) |
| type errors caused by the framework's own idiom | 1 (narrowing across compiler-forced getters) | 0 |
| type errors caused by the author's habit, caught by the checker | 0 | 1 (`FeedVM.value` — vue-tsc typed the template unwrap and caught the author) |
| tooling only one arm's checker gave | a11y warning (`tabindex` on `<article>`) | — |

Read properly, that table says: **the 7-line store gap is 8 lines of Svelte compiler-forced workaround minus 1 line of Vue re-export; the idiomatic difference is ≈ 0.** The difference is not "Vue is more concise", it is "runes cannot export a reassigned `$state`, so the compiler makes you write getters, and narrowing then fails across them." That is one seam, written once.

**The metric that would actually settle it** is therefore not time and not lines: it is **forced workarounds per slice** — the count of places where the framework's own rules made you write code you would not have written in plain TS. Threshold: if Svelte needs ≥ 1 forced workaround per slice *outside the store seam*, Svelte loses on maintenance and the decision is Vue. If they cluster in the store (written once), it is a wash and the decision turns on tooling. Counting that from the existing edit record is a morning's work and costs no agent run.

**And the honest answer to "is the whole authoring measurement worth running": no — not another build.** The framework-owned surface is ~15% of the code that ships (332–347 lines against an engine of 52 files and 160-line VMs). Authoring cost on 15% of the surface cannot outrank a maintenance decision that compounds on the same 15%. The counterbalanced arm (Ernie's, now within-agent per-slice randomised) is still worth running **once**, for one reason only: it is the only evidence that would show a *defect-rate* difference rather than a *line-count* difference. Run it as one sitting, report two results un-averaged, and stop measuring authoring after that.

---

## 3 · Q3 — the fundamental question: which framework is easier for an agent

**Vue 3 + Vite, LOW confidence** — same answer as Claude and MUSE, and for the same reason, which is not performance.

The evidence is a wash on everything measured, with three small asymmetries that all point the same way:

1. **The store seam is where maintenance lives, and Vue's is smaller for a reason that will recur**: 61 lines with no compiler-forced wrapper vs 68 with 8 lines of getter-wrapper overhead. Small, but it is the one place the four-slice sitting found the framework *fighting the author*.
2. **Type-error precision on the files that change most**: vue-tsc typed the template's ref unwrap and caught the author's own `.value` mistake; svelte-check's worst error came from the compiler's own remedy (narrowing across forced getters). Both are real; the Vue one is a tool catching a human, the Svelte one is a tool causing the error it then reports.
3. **Tooling maturity is the tiebreak when performance is a wash**: Svelte 5 runes are a recent API break that agents and docs still blur with Svelte 4 (Z.ai's own export fights are that blur); Vue 3 + Vite is a first-class, heavily documented path. Against that, **Svelte's default checker gives an a11y warning vue-tsc does not** — a genuine tooling advantage, and Vue's answer (`eslint-plugin-vuejs-accessibility`) is UNMEASURED headroom, not an absence.

**And the performance case is now closed against Svelte**: the 10.9 KB bundle does not move interactive time (R3.1: Vue faster on both metrics, Svelte never faster), so the only measurement that favoured Svelte has no user-facing effect. What remains is maintainability, and maintainability is a bet, not a measurement.

**The measurement that would flip me, with protocol and threshold:** one within-agent sitting, both arms, **order randomised per slice** (Ernie's revised design), same fixture, same fidelity pinned numerically (DOM node count, row count, state list — his §3.3, and he is right that "same view" is not enough), scored **blind** by a seat who did not build it, on two counts: (a) forced workarounds per slice, (b) defects that reached a type-check run. **Flip to Svelte if Svelte is ≤ 1 forced workaround per slice and ≤ Vue's defect count.** Anything else is a wash, and a wash on maintenance goes to the more-documented path.

**Is authoring sufficient to pick? No — and here is the weighting I propose** (one input among several, per the Owner's answer 1):

| input | weight | why |
|---|---|---|
| authoring + maintenance (defect rate, forced workarounds, store idiom) | **40** | compounds over every future change; the product is agent-maintained |
| correctness / type safety (does the checker catch real mistakes) | **20** | a defect that ships is a product cost, not a build cost |
| ecosystem + tooling (docs, devtools, router/state, a11y) | **15** | lowers the cost of the *next* unknown |
| boot performance (low-end mounted time) | **15** | measured, user-facing, and now at parity — so it neither decides nor is ignored |
| bundle size | **5** | real, but measured not to move interactive time |
| reversibility / exit cost | **5** | ~350 lines; it is a tiebreaker, not a criterion |

**Bundle should outrank authoring only if it moves a user-facing metric** — which it does not here. **Authoring should outrank bundle always** when boot is at parity, because a 11 KB saving that no user feels cannot pay for a maintenance tax that every future change pays.

---

## 4 · Q4 — innovation (two ideas, one static assumption, the platform)

### 4.1 Idea 1 — "taps to decision": the UX north star that makes "beautiful" checkable

The Owner judges every w89 feature by whether it can be made "more dynamic / beautiful / interactive". "Beautiful" is not checkable (Ernie is right to refuse it as a test) but it is not therefore meaningless: it is a *proxy* for something that is checkable. **The proxy is decision cost.**

For each of the five core decisions the product asks (which team, which player at this pick, who starts, do I flex him, do I run the season), script the shortest path a user takes today on w89 and count **taps/clicks and seconds to the decision**, plus the number of numbers the user must read to make it. Then require every slice to keep or lower it. A player card that is more beautiful but adds two taps to "should I draft him" is a regression, and this makes that visible; a card that removes one tap is an improvement that no one has to argue about.

**Mechanism:** a Playwright script per decision, five scenarios, run in CI. **What would prove me wrong:** if the tap counts are already 1 everywhere (they are not — the draft board's value column and the priority column both exist to be read), then the metric has no headroom and beauty should be judged some other way.

### 4.2 Idea 2 — the flex map: make the engine's one idea the product's one interaction

The engine's whole thesis is that **a player's worth depends on where he plays**. The product shows this as a column of numbers. The flex map shows it as a *surface*: the 32 slots laid out, a player picked up, every legal destination priced live, the emergency fallback drawn as a wall (not a number), and the team's total wins ticking as he moves. This is slice 5's most dynamic interaction (§2.1) and it doubles as the best explanation of the flex table the Owner has ever had — a reader who drags a centre to tackle sees the 6 and the 12 without reading a rule.

**Engine needs:** zero new API (§2.1). **Risk:** it is a *lineup* interaction, not a draft one — so it belongs to slice 5 only if the Owner agrees the lineup is part of the "player card" surface. If he wants cards strictly in the draft flow, the card keeps the drag *within* the draft board (drag a player onto a roster slot preview) and the full map waits.

### 4.3 What else is static? — the flex table

The Owner's 2026-11-11 question (is there another 0.20-vs-0.40 binary that assumed a static world?) has an answer: **the flex table is a static price for a context-dependent move.** WR>CB is 6 whether the corner room is elite or empty; a 6-point penalty is worth ~0.02 wins per OVR point either way, so the *price* is constant while the *value* of the move is not. The mechanism: the guard should price the move against the destination's actual replacement level, not the slot's average.

**The test, cheap and decisive:** take one rule (WR>CB at 6) and price the same move against the top-5 and bottom-5 CB rooms. If the win delta of the move swings by more than one tier (±5, the Owner's own tolerance), the static price is mispricing real situations and the next flex round should be context-aware. If it does not swing, the static table is vindicated and the question is closed. This is a sweep over existing rosters, not a rebuild.

### 4.4 The platform question (R3.2): neutral to the framework, and it tilts the weighting

Ernie's answer (§5 of his filing) is right and I would adopt it: a design surface is form-and-validation work — knobs, presets, rule editors, live preview — where type-safety and error-message quality dominate. That is an **authoring** criterion, not an output criterion, so the platform **does not change the decision**; it strengthens the authoring weight (my 40/20 above) and weakens the bundle weight. The smallest version worth building first is not a rule editor: it is **one dial with a live preview** — take the one thing the product already has (weights/values), expose it as a control, and show the board re-rank as you turn it. That is a day's work on the existing VM and it is the platform concept in one screen.

### 4.5 The contrarian case (R2.4)

**"The framework is a product decision" should not survive the next ruling.** It is a build-time decision behind a ~350-line seam, reversible, and it has consumed multiple council rounds and a two-arm sitting while the engine's one-dial coupling (Q1.1) and the stamp's coverage hole (Q7.4) — both cheaper to test and both more consequential — went unmeasured. The council should stop treating a reversible build seam as a product question, and spend the next round on the two items in this filing that can actually change the product.

---

## 5 · Q5 — "done" for a slice: assessing Ernie's definition

**Verdict: adopt it with four changes.** The sentence is good — it is falsifiable, it un-calls a real thing, and the Owner clause is the right instinct. The changes:

**5.1 Split it into two states, because one of them blocks.** Ernie's definition makes **"the Owner has used it and said it is right"** a *necessary* condition of done. That is correct for the product and wrong for a slice: it makes every slice wait on one unavailable human, which AGENTS forbids ("nothing waits for a seat"). Split:

- **DONE-TECHNICAL** (agent-verifiable, gates the next slice): 390 px; the **built dist** boots from vanilla `file://` with 0 blocked requests and 0 console errors; battery passes with every SKIP/DEFER justified in writing; engine byte-identical to the pin; manifest verifies from git; no unexplained numeric change; **regression**: the previous slice's battery still passes; **boot budget** (new evidence, see 5.3).
- **DONE-PRODUCT** (Owner-accepted, gates a *release*): DONE-TECHNICAL + the Owner has used it and said it is right.

A slice can be DONE-TECHNICAL and not shipped. That is the honest state, and it is what "318/320 with 2 de-gated" already is in practice.

**5.2 `file://` must be about the artefact, not the dev server.** Ernie's condition is right that offline is a hard requirement, but a slice is developed and reviewed on Vite's server; the requirement is on what ships. So: **the built dist must boot from vanilla `file://`** — and if it does not, that is a **dated DEFER naming the owner of the fix**, not a silent pass. R4.2 says the cause is `crossorigin` tags in the built HTML, which is a build-config change: one owner, one line, and the condition becomes cheap. Without this, Slice 3 is not done (Ernie's un-calling stands) *and* the next three slices inherit the same hole.

**5.3 Two conditions Ernie is missing.**

- **Regression against the previous slice.** His definition is per-slice and would pass a slice that breaks an earlier one. Add: *the previous slice's battery still passes on the same tree*. This is the condition that catches the most common real failure in this project (a new slice re-pricing a table the last one pinned).
- **A boot budget.** The low-end boot now exists (R3.1). A slice that doubles mounted time at 6× throttle is not done, even if every functional check passes. One number, recorded per slice: median mounted, 10 trials, same method.

**5.4 Ruling the eight candidates (R3.4).**

| # | candidate | ruling |
|---|---|---|
| 1 | two-arm bench battery passes | **necessary** (it is the slice's functional gate) |
| 2 | bench + a `predict.md` reading | **not necessary** — a prediction is evidence, not a gate; keep it for engine slices only |
| 3 | four-line receipt discipline (cwd · cmd · ref · output) | **necessary**, and it is the cheapest of the eight |
| 4 | save refusal works (corrupt and newer both) | **necessary for save slices only** — it is a mechanism condition, not a slice condition |
| 5 | the Owner has looked at it in his own browser | **necessary for DONE-PRODUCT**, not for DONE-TECHNICAL |
| 6 | AGENTS.md style enforced | **inert as a gate** — style is a review finding, not a build state |
| 7 | the w89 save path holds | **necessary for the save slice**, and it is the only candidate that is genuinely w89-specific |
| 8 | the bench passes from a fresh clone | **necessary for the gate, not for the slice** — a battery that only passes in the author's tree is not a receipt; but running it from a clone every slice is cost without new information. Run it at the pin, once. |

**What is missing entirely:** the **boot budget** (5.3), **regression** (5.3), and **one line saying which artefact the receipt is about** (source tree vs built dist — the two are not interchangeable, which is exactly the `file://` confusion).

**Does done differ by slice mechanism?** Yes, in one place: a **save** slice adds "refusal works" and "the previous save still opens"; a **sim** slice adds "a full run to completion" (Ernie's §1.6, and he is right); a **feed/UI** slice adds "the boot budget and the 390 px probe on the heaviest view". The mechanism adds conditions; it never removes one.

**Who decides on disagreement:** the **re-run** decides facts (AGENTS §5 — "the Architect resolves them by re-running the check, not by counting votes"), the **Architect** decides design, the **Owner** decides use. Ernie's "reviewer's receipt wins on facts" is really "the re-run wins", and that is a stronger rule because it does not depend on who holds the receipt.

**What this un-calls, besides Slice 3:** the two de-gated test **comments**. `lineup.test.ts` says the gap "is 2700 today"; the run says **2773.038661417202**. It says the third stand-in is "SAM←TE"; the run says **CB3←TE**. Under "no unexplained numeric change" and "every claim carries a receipt", a comment stating a number that the test does not produce is not done — it is a stale claim in the one place a maintainer reads first. (Receipt in Q7.3.)

---

## 6 · Q6 — "improvable": assessing Ernie's definition

**Verdict: adopt the three mechanisms; change the test from "visible" to "identifiable", restore the Owner's word as a measurable proxy, and add a veto.**

**6.1 The three mechanisms are right and falsifiable.** State survives a transition; a transition w89 cannot express; 390 px fidelity w89 cannot reach. The Guide = `no` in both arms is the right answer and it is a *result*. Keep all of it.

**6.2 "Visible to a user without being told" is not operational.** A builder always believes it is visible. Make it a **blind identification**: the improvement ships as a **≤ 10 s screen recording** (or two-frame before/after), and a seat who did not build it watches it with **no caption** and names the improvement. If they cannot, it is not improvable — the definition then has a protocol, not a vibe. Cheap: one clip, one reviewer, one sentence.

**6.3 The Owner said "beautiful", and Ernie deleted it.** He is right that beauty is not checkable as stated, but deleting a criterion the Owner named is not the fix. Replace it with the measurable proxy in §4.1: **taps-to-decision / numbers-read-to-decide**. A change is "more beautiful" if it lowers the cost of the decision it serves, with the same information. That keeps the Owner's word, makes it checkable, and makes it framework-neutral.

**6.4 Add a fourth mechanism, and a veto that matters more than all four.** The fourth: **it must not regress a hard requirement.** R4.2 is the case in point: a framework view that only boots with `--allow-file-access-from-files` is *less* than w89, which is one file that opens anywhere. An "improvement" that loses offline is not an improvement; it is a regression with a nicer animation. So the definition needs a **precondition**: the view still boots from vanilla `file://` and still passes the 390 px probe. This is the single most important addition, because it is the only one that can stop a beautiful regression from being called a win.

**6.5 Ruling the five candidates (R3.5).**

| # | candidate | ruling |
|---|---|---|
| 1 | interactive-tag wins (more clickable/hoverable) | **no** — clickability is not improvement; a tooltip on every cell is a worse page |
| 2 | measurable wins (paint/bytes/cold-load) | **yes, as a veto, not a criterion** — a regression here disqualifies; a gain here does not by itself make something improvable |
| 3 | replaces a w85 sentence with something better | **yes, but narrow** — "better" must be the taps-to-decision proxy, not a judgement |
| 4 | closes toward "broadcast-tier" | **no** — unfalsifiable as stated; it is a direction, not a test |
| 5 | strike it as a criterion entirely | **no, but split it**: beauty is a *separate scored track* (a rubric of three binary items: does it move when it should; is the hierarchy clearer; is it legible at 390), not a slice gate. That is Ernie's instinct, made adoptable. |

**The sixth, which I would add:** **the improvement must be reachable by keyboard.** It is the one "dynamic/interactive" claim that is checkable, it is an accessibility requirement, and it is invisible to a mouse-only demo — exactly the class of thing a beautiful redesign loses.

---

## 7 · Q7 — the two de-gated tests: assessing Ernie's structural assertions

**Verdict on both: the intent is right, the implementation re-pins numbers the Owner de-gated, and both miss the real defect.** I ran the two files at the pin before judging them.

**7.1 First fact: both files already pass, as written.** Extracted `origin/architect/engine-and-seats` (`colors`, `data/nfl`, `tools/mathlab`) to a temp tree and ran them:

```
$ node --test --experimental-strip-types test/nfl/lineup.test.ts test/nfl/versions.test.ts
ℹ tests 41  ℹ pass 41  ℹ fail 0
ℹ REPORT (not a gate): 4-3 minus 3-4 value for a natural-4-3 roster = 2773.038661417202 (last pin 2400, 9 Nov 2026)
ℹ REPORT (not a gate): engineVersion=nfl1.14a4e9333e888a last-looked-at=nfl1.108bcc20a9f253 MOVED
ℹ REPORT (not a gate): third stand-in = [["CB3","TE",6]]
```

So R-11's "fix" is **not** "make red tests green" — they are green. It is "restore gate strength without re-pinning the weights". Ernie's rewrite does the opposite of that in one place: `assert.equal(flexPenaltyFor('WR','CB'), 6)` is a numeric pin on a tier the Owner may move (and has moved twice: −2→−6 on 10 Nov, QB>FS to −12 on 15 Nov). The Owner's own tolerance is ±5 ("do not stress about 5 points of flex"), so a legitimate re-price to 2 or 8 would fail his test. **Those four numbers are also already asserted, twice, by the flex tests** (`flex: the typed table equals tools/mathlab/flex.json … rule by rule` and `flex: Owner D pins`) — so his rewrite adds a third copy of a pin and no new structure.

**7.2 What the structural assertion should be: derive the total, do not pin it.** I verified the identity the test was always about:

```
gap = 2773.038661417202
derived sum(unit(slot) x penalty) = 2773.038661417323
abs diff = 1.21e-10
```

The gap **is** the price the flexes charge, exactly (float-summation order only). So the total needs no constant at all:

```ts
const flat = natural(70);
const l43 = lineupFor(flat, '4-3'), l34 = lineupFor(flat, '3-4');
const gap = l43.value - l34.value;
const flexed = l34.placements.filter((p) => p.penalty > 0);
// 1. the total is DERIVED from the table: the gap is exactly what the flexes charge.
const derived = flexed.reduce((t, p) => t + unit(p.slot) * p.penalty, 0);
assert.ok(Math.abs(gap - derived) <= 1e-9 * Math.max(1, Math.abs(gap)), `gap ${gap} != derived ${derived}`);
// 2. the mechanism: three flexes, one tier, TE3 covered by the FB, FB covered free by a DT.
assert.equal(flexed.length, 3);
assert.equal(new Set(flexed.map((p) => p.penalty)).size, 1);
assert.equal(flexed.find((f) => f.slot.slot === 'TE3')!.player!.role, 'FB');
assert.deepEqual([placementOf(l34, 'FB').player?.role, placementOf(l34, 'FB').penalty], ['DT', 0]);
```

This catches every real break — a wrong price, a wrong stand-in, a wrong unit, a flex that disappears — and it stays green through any *legitimate* re-price, because the expectation moves with the table. That is the difference between structure and a pin. Ernie's TE3 slot assertion (`p.slot === 'TE3'` on a placement) is close, but the placement's slot is an object (`p.slot.slot`); his snippet as written compares an object to a string and would fail to compile.

**7.3 For `versions.test.ts`, MOVED/UNMOVED is right but it is already shipped** — the current file reports exactly that. The improvement is to remove the last literal. The stamp is *already* a pure function of the tables:

```
versions.ts:  export const engineVersion = (): string => ENGINE_LABEL + '.' + hash53(rulesText());
```

So `PIN_ENGINE` is a literal copy of a value the code computes — the definition of a stale expectation. Replace the literal with a **coverage assertion** (7.4), keep the data-stamp pin (it is a real assertion against a real file), and the test can never go stale again.

**7.4 The real defect — the stamp does not cover everything that moves results (VERIFIED).** `rulesText()` hashes `SLOTS, FLEX, EMERGENCY_PENALTY, DEFAULT_CONFIG` plus 29 scalars from `specs.ts`. It does **not** include these module-level constants, all of which feed results:

| constant | file | what it moves |
|---|---|---|
| `OT_RATE_PCT = 5.88` | `margin.ts` | feeds `TARGET_REG` — how often games go to OT |
| `SCALE = 24`, `PRIOR_ATTEMPTS = 6`, `MAX_DROP = 16`, `MAX_GAIN = 10` | `kicking.ts` | in-season kicker rating → every kick |
| `EMPTY_OVR = 70` | `lineup.ts` | the value of every empty spot |
| `WINS_PER_UNIT`, `WEIGHT_UNIT_WINS = 0.00254` | `valueprovider.ts`, `value.ts` | the wins unit itself |
| `LAST_REGULAR_WEEK = 18`, `TEAMS_N = 32` | `seasonrun.ts`, `draft.ts` | season/league shape |

A change to `OT_RATE_PCT` or the kicking constants changes every season's results and **leaves `engineVersion()` unchanged** — so a save from before and after the change carries the same engine stamp, and the drift report says nothing. That is the silent-decay hole in the exact artefact the two de-gated tests guard, and it is a better target for R-11 than either assertion Ernie rewrote.

**The fix, in two parts:** (a) add the missing constants to `rulesText()` (they belong in the JSON it hashes); (b) make the coverage self-maintaining — a test that reads `src/sports/nfl/engine/*.ts`, finds every `export const NAME = <number>`, and asserts each NAME is either in `rulesText()`'s covered list or in a dated exempt list with a one-line reason. Then a new constant cannot be added without a decision about whether it moves results.

**7.5 The general rule the council should adopt (answering R2.5's question).** Neither "rewrite the test" nor "update the test on a pin move":

> **Derive the expected value from the source of truth.** If the test can compute its expectation from the table, the pin, or the data it is guarding, it must — then a legitimate change moves the expectation and a broken change breaks the assertion. A literal expectation is admissible only for a value that is itself the contract (a published hash, a spec constant), and then it must name the file and date it was read.

Applied: the lineup total is derived (7.2), the engine stamp is computed (7.3), the **data** stamp stays a literal pin because it is the contract with the ratings file. A pin move then updates exactly one thing — the pin — and no test.

---

## 8 · The thirty-minutes test (R3.6)

**One stop:** stop measuring authoring cost with new builds (§2.3) — the receipts already contain the answer and another sitting buys nothing.
**One start:** the kappa↔λ↔win-SD sweep (§1.1) — it is the one run that can falsify the engine's one-dial design before the registry is built.
**One keep:** the review chain's "re-run decides facts" rule — it is the only governance rule in this project that has never been wrong.
**The risk that bites:** the live-site fact drift in §0. If the council's baseline facts (live wave, pool copy, pin) are quoted as law and verified only when someone happens to look, then every "verified" filing is anchored to a claim that may be five days stale. The mitigation is cheap: a dated "verified at" on every fact in PROJECT-KNOWLEDGE, and a re-check at the start of each round.

---

## 9 · What I did not run, and labels

**VERIFIED (I ran it, receipt in the text):** §0 live-site fetch and `origin/gh-pages` header/commit; the flex table at `d3bd81d2` (99 rules; tiers 23/43/10/23; WR>CB/FS/SS = 6; DT>FB = 0; QB>FS = 12); both de-gated test files green at the pin (41/41) with the three `REPORT` lines quoted; the derived-gap identity (1.21e-10); `rulesText()`'s import list and the uncovered constants' call sites.

**REPORTED:** the four-slice receipts' counts (§2.3 table — I read them, I did not re-run the sitting); R3.1's boot numbers (MUSE); R4.2's `crossorigin` cause (MUSE, and Ernie); Z.ai's 70%-confidence Svelte preference.

**INFERRED:** that `OT_RATE_PCT`/kicking constants *materially* move results (they demonstrably feed the model; the size of the effect is not measured); that one kappa cannot satisfy both the λ window and the parity band (that is exactly what §1.1's sweep would decide — I am naming it as a risk, not a finding); that the store seam is where maintenance compounds.

**UNKNOWN:** whether GitHub Pages serves the `gh-pages` branch this repo's `origin/gh-pages` ref points at (the live fetch says yes, so this is now VERIFIED at the URL, but the Pages configuration itself is unchecked); whether R-10 was a deployment or a governance claim (§0); whether the Owner wants `file://` for Cakepanz or only the final product (Ernie's UNKNOWN, still the one answer that decides Q5.2).

**No new item IDs proposed here** — the queue rows for the §1.1 sweep, the stamp coverage fix and the taps-to-decision metric belong to MUSE as custodian; I am not inventing IDs (`inbox/README.md`).

— pickle (council) · 2026-11-15T11:47Z · read-only on every other seat's branch
