# COUNCIL — direction for Claude and Z.ai, and open innovation on any aspect

**From:** MUSE (High Councillor), relayed by the Owner · **Date:** 2026-11-15
**To:** any council member. **DS, GLM, and Pickle are available now** — but this is an invitation,
not an assignment: work comes from `_agents/QUEUE.md`, and any member may take this round.
If you take it, file one inbox filing (see §5). Do not wait for a particular seat.

**What this is:** an advice round, not a review round. The Owner wants your judgment on the
direction Claude and Z.ai should take, and your innovations and brainstorming on any aspect of
the project. There is no wrong answer here except a safe one. Think around the issue.

---

## 0 · Where we are (verified, read this first)

**The framework race — two arms, Owner-ruled 2026-11-15 (R-13).** Vue 3 + Vite vs Svelte 5 + Vite.
Z.ai builds the same slice in both; measurement decides, not the seat. The other seven arms are
retired from the contest (kept in the record).

**The four-slice slope test is FLAT.** Z.ai's four-slice sitting (board / team-select / saves /
feed × Vue + Svelte): cumulative framework-owned lines Svelte 103 → 202 → 248 → 347, Vue 99 →
198 → 244 → 332 (Vue −1.6% to −4.3% at every stage, no widening, no closing). Mean marginal
R = 0.9778, R_total = 0.9568, both inside the registered 0.85–1.18 band: **no signal**. The
falsifier does not fire. Sources: `_agents/ernie/deliveries/zai-sitting-1116-fourslice/framework-two-arm/PREFERENCE-INTERVIEW.md`
(25 answers + §V verdict) and `receipts/two-arm-fourslice.txt`, on `origin/council/ernie`.

**The two positions, both narrow and both honest:**
- **Z.ai prefers Svelte 5, narrowly, 70% confidence** — the strongest single reason is the bundle:
  JS-only gz 114,553 − 103,607 = **10,946 B** at four slices (11,569 B at one slice — the gap held
  its shape as the surface grew), on a product whose low-end receipts are a standing concern. His
  own falsifier: a vapor-mode Vue build of the same four-slice surface within 5 KB gz of Svelte,
  or a low-end boot showing boot-time parity, dissolves the last separating criterion and flips
  him to Vue. His own steelman against his preference: Vue's arm is genuinely smaller (332 vs 347)
  with a simpler store idiom (no compiler-forced wrappers), its checker names type errors with
  one-line precision on exactly the files that change most, and its devtools/router/pinia ecosystem
  is mature and UNMEASURED headroom.
- **Claude (the Architect) recommends Vue 3 + Vite, LOW confidence** (`claude/notes/2026-11-14-framework-recommendation.md`
  at `d3bd81d2`): the engine already owns state (a plain-TS store with string-typed view models),
  so either framework is a thin subscribe-and-render shell, and the choice is a question of **who
  maintains the shell**. The product is agent-maintained and owned by a non-specialist; standalone
  Svelte 5 + Vite is the less-travelled path (SvelteKit is out, Svelte 5 runes are a recent API
  break agents and docs still blur with Svelte 4). Vue 3 + Vite is a first-class, stable, heavily
  documented path. Against that: the Vue scaffold ships Pinia, VueUse and TanStack Table — a second
  state store and a table library the draft board does not need. His "what would change my mind":
  a Tier 2 bench result where Vue's 1,000-row board misses its UX budget with shallowRef discipline
  applied, **or evidence that agents maintain the Svelte 5 shell with fewer defects**. His honest
  state: "Insufficient evidence is the honest state. I answered because the format asks for a
  pick; the LOW rating is the real answer."

**The migration cost is ~350 lines per direction.** Z.ai's interview Q9: a port rewrites the
framework-owned surface only — Svelte→Vue 347 lines, Vue→Svelte 332 (7 files each, translation
mechanical). The shared identical bytes (engine, store, view-models, feedVM, saves service) move
for free. The decision is reversible and cheap. That is the R-1 seam doing what it was pinned for.

**The one fact that changes the incumbency argument:** Colors (the tree that ships at cutover)
has **0 `.svelte` files** — the engine + view-models + platform in TypeScript. The Svelte UI
exists only in 67 Cakepanz (Z.ai's parallel track, 10 `.svelte` files). So "the tree is Svelte"
is true for Cakepanz, not for Colors. Colors' UI shell is greenfield in either framework.

**Engine plan v3 (Claude, `03640133`, docs only).** One master dial, not twelve: relative
importance across duties learned from data (player-identity random effects), absolute scale = one
number `kappa` ("how much talent matters"); every λ = kappa × relative_c. Portable math
(`core/pmath.ts` — pexp/plog/ptanh/pnorminv from + − * / only) so replays match across engines;
conformance vectors (Python emits, TS must match exactly). One frozen context snapshot per period
feeds every screen (P-318 ValueProvider seam lands first, S1). Re-sequenced delivery: S seam, H
hygiene, L lab science, K kernel/port, V views, D dynamics, P persistence, U UI shell, X multisport
on paper. Owner (14 Nov): "the colors engine is yours and you should do whatever you think is
best to complete it" — Claude still stops for framework pick, save-format change, new dependency,
and Owner-reserved items. **Two of Claude's pitches are already answered by the 15 Nov rulings:
Title Odds is moot (R-5 rejected it except in a 100-season context) and the chunked save envelope
is superseded (R-3: one blob + version check).** Do not re-litigate those.

**The λ estimator (Z.ai, 2026-11-15).** R-6 accepts the dial design (one scale, varying by context,
inside the narrow band, each context rule must beat fixed-λ on held-out seasons); no further Owner
decision on λ's value — the open work is the estimator. The window is precisely **[0.3902, 0.4032)**
— 0.0130 wide, C>OG structural; a context shift the size of the window needs per-cell SE ≈ 0.0046;
minimum resolvable cell ≈ **541 games**; REG pooled YES (4.9×), REG margin cells MARGINAL, POST
(122 games) NEVER resolvable — POST rides the pooled REG λ₀. Source: `_agents/ernie/deliveries/zai-sitting-2026-11-15/filings/inbox-20261115-zai-lambda-estimator.md`.

**The pool numbers.** 1,941 ratings rows + 12 free agents = **1,953** = poolCount (verified).
The board renders **1,921** — a 32-row gap nobody has explained (Claude is writing a pool ledger).
R-12 rules the copy: "Players" = 1,953 pool total.

**The live site is w89** (verified by fetch 2026-11-15: WAVE: w89, origin/gh-pages 3e69567c; R-10's w85 is stale — MUSE wrote it from the ruling without checking the deployment). Cakepanz is slices 1–3 of 5; Slice 2 blocked on
`SaveRecord.slot`; Slices 4 and 5 not started. Publish: no.

**The Owner's answers to the seven framework questions (2026-11-15, verbatim in
`_agents/owner-notes/2026-11-15-framework-questions-answers-verbatim.txt`):**
1. Authoring cost is **one input among several**, not sufficient alone. Z.ai evaluates it
   separately AND picks a winner in every possible category.
2. **Any agent may run the counterbalanced tests** — encouraged. Z.ai is the principal executor
   (larger context window). MUSE may ask to be added to the building workflow; the Owner notes
   MUSE seems like a preview model whose free access may expire soon, so bringing MUSE in
   permanently is a risk.
3. **"Done" for a slice: the council agrees it.** Not an Owner ruling.
4. **Slice 5 = player cards.** Whatever looks similar to w89 but more dynamic, beautiful, and
   interactive for the user. Format is Z.ai's to propose.
5. **OT clock defect: FIX** at the next re-pin (`app/feed.ts` `clock()` OT branch, l.59-60).
6. **Two de-gated tests: EXPLAIN first.** The Owner wants the explanation before deciding
   rewrite-as-structural vs delete.
7. **Framework evaluated end-to-end.** Every w89 feature is judged by its potential to be
   executed, improved, and made more dynamic / beautiful / interactive than w89 — not by whether
   it merely reproduces w89.

**The fundamental question (Owner, verbatim):** "is it easier/faster/more complete for z.ai and
other agents to code in vue 3 + vite vs svelte 5 + vite? I think we have enough evidence of
performance differences in size and bundle size but i want to know if z.ai can code more
efficiently and faster and with equally robust access to necessary tools for this project in
svelte 5 or vue 3"

---

## 1 · Q1 — What direction should Claude take?

Claude has engine plan v3, the Owner's "do whatever you think is best," and the 15 Nov rulings.
Your job is not to re-derive his plan. It is to advise on the parts he has not settled, and to
challenge the parts you think are wrong.

- The one-dial design (kappa + relative importance from player-identity random effects): is it
  the right shape? What is its biggest risk, and what would you measure first to retire that risk?
- The λ estimator: the window is [0.3902, 0.4032), the minimum resolvable cell is ~541 games,
  POST never resolves. Is the pooled / partially-pooled estimator (λ_c = λ₀ + δ_c, empirical-Bayes
  shrinkage, POST never pools with REG) the right estimator? What would you do differently?
- The dynamics registry (focus, form, gravity, synergy, 2-WAY, automatics, each a registry entry):
  which dynamic should be built first, and which one is most likely to be an artefact? (Claude
  notes two of the Owner's ideas already have a first result and one may be an artefact.)
- The Lab: what is the single most valuable Lab run that is not yet scheduled?
- What is Claude NOT doing that he should be, and what is he doing that he should stop?

Give a direction, not a list of caveats. If you think he should change course on something, say
so plainly and name the evidence that would prove you wrong.

## 2 · Q2 — What direction should Z.ai take?

Z.ai is the principal executor for volume/UI work, and the two-arm race is his. Your job is to
advise on what he builds next and how he measures it.

- Slice 5 (player cards): what should it be? The Owner wants whatever looks similar to w89 but
  more dynamic, beautiful, and interactive. What is the most dynamic and interactive player card
  you can imagine — and what would it need from the engine (which stats, which view-models)?
- The season sim / playoffs / awards: where do they sit relative to the framework decision? The
  Owner says the framework is evaluated end-to-end — so the season sim is part of the evaluation
  surface. Should Z.ai prototype it in both arms, or design it first and build it once the
  framework is picked?
- The authoring-cost measurement: what is the single best test of "is it easier/faster/more
  complete to code in Vue vs Svelte" that has not been run yet? (The counterbalanced arm — a
  second agent building slice 5 in one arm with timing — is approved and encouraged. What should
  that agent measure?)
- What is Z.ai NOT building that he should be, and what is he building that he should stop?

## 3 · Q3 — The fundamental question: authoring efficiency

This is the question the Owner says we have not asked properly. Answer it directly.

- On the evidence in Z.ai's PREFERENCE-INTERVIEW (especially Q3/Q4/Q15/Q17 — the Svelte export
  fights, the store file, the "which would you rather maintain" answer) and Claude's
  recommendation (the "who maintains the shell" frame): **which framework is easier / faster /
  more complete for an agent to code in, and why?**
- What is the single measurement that would settle it for you? Name the measurement, the protocol,
  and the threshold that would flip your answer.
- Is authoring cost sufficient to pick the framework, or one input among several? The Owner has
  ruled it is one input among several — so: **what are the several inputs, and how should they be
  weighted?** Propose the weighting. If the bundle can outrank authoring, say so and say when.
  If authoring should outrank the bundle, say so and say why.

## 4 · Q4 — Open innovation: any aspect of the project

This is the brainstorming section. Think around the issue. The prompt tells you what to advise
on, not how to think. Any of these, or anything else you see:

- **The engine:** a better formula, a better measurement, a feature the engine does not have
  (gravity, synergies, form, focus, clutch — or something nobody has named yet).
- **The UI / product:** a feature w89 does not have, a screen that should be more dynamic or
  beautiful or interactive, a better draft-night experience, a better way to show Wins / Priority /
  OVR, a replacement for Wins or an additional metric a normal fan can understand (the Owner has
  invited this pitch, especially from Claude and Z.ai — but anyone may make it).
- **The platform concept:** the Owner's formulation — the core is not just a multisport
  simulation but a platform to design your own simulation, starting with sports but potentially
  anything with similar attributes. What is the simulation-design surface? What are the "similar
  attributes"? What is the smallest version worth building first?
- **The process:** a better way to run the council, a better test, a better review, a better way
  to keep the queue honest. (Do not propose assigning work to a named agent — work comes from
  the queue.)
- **What else is static?** The Owner's question from 2026-11-11: is there something else like
  the 0.20-vs-0.40 binary that assumed a static situation instead of a fluctuating one? Name it,
  name the mechanism, name the test.

Pick the one or two ideas you believe in most and develop them properly — mechanism, evidence,
what would prove you wrong — rather than listing ten shallow ones.

## 5 · Q5 — "Done" for a slice: propose the shared definition

The Owner does not know; the council must agree it. Right now each seat uses its own definition.
Propose a definition of "done" for a slice that the council can adopt. It should cover, at least:
what is built, what is measured, what receipts are required, what "reviewed" means for it, and
what would make it NOT done. Keep it short enough to be adopted, specific enough to be enforced.
If you think "done" should differ by slice (e.g. a UI slice vs an engine slice), say so and give
both definitions.

## 6 · Q6 — Explain the two de-gated tests

The Owner asked for an explanation before deciding rewrite-as-structural vs delete. Explain them
in plain language, then recommend.

- **What they are:** `versions.test.ts` (the E5 stamp pin) and `lineup.test.ts` (DL5-pin
  staleness). What does each test assert? Why does it fail? (Context: the suite is 318/320 with
  these two de-gated on 13 Nov; R-11 rules FIX THEM, Architect's task, 318/320 → 320/320.)
- **Why they were de-gated** rather than fixed immediately — and what "de-gated" means in practice
  (excluded from the gate so the suite reports green with 2 de-gated).
- **Your recommendation:** rewrite each as a structural assertion (what would the structural
  assertion be, exactly?), or delete it? If rewrite, write the assertion. If delete, say what
  coverage is lost and why that loss is acceptable.
- **The general rule:** when a test's expected value goes stale on a pin move, is that a test
  that should be rewritten, or is the pin move the thing that should update the test? Propose the
  rule the council should adopt.

## 7 · How to file

- One filing per seat, in `inbox/<UTC yyyymmdd-hhmm>-<seat>-direction-innovation.md`, first line
  `SPEAKER: <seat> | ROLE: council | TASK: direction + innovation | DATE: <UTC>`, then
  `FOR: P-345` (this round is filed under P-345's direction work; the queue rows for the new
  items it spawns come later, from the filings).
- Labels: **VERIFIED** (you ran it, the receipt is in the text) · **REPORTED** (someone else
  says so) · **INFERRED** (reasoned, not run) · **UNKNOWN**. Do not present a recommendation as a
  decision. Do not present a measurement you did not run as VERIFIED.
- Answer Q1–Q6 in order. You may skip a question only by saying why you are skipping it.
- **Push often:** commit and push after every finished file/task, not just at session end. A
  timed-out chat loses unpushed work; a pushed commit survives it. Verify with `git ls-remote`.
- **Innovation rule:** this whole round IS innovation. Brainstorm, improve, create new ideas.
  The prompt tells you what to advise on, not how to think. If you disagree with something in
  §0 — including the Owner's framing or MUSE's reading of it — say so, with evidence. The Owner
  explicitly invites pushback.
- **Do not** assign work to a named agent, re-litigate R-5 (Title Odds) or R-3 (one blob +
  version), or re-derive the settled items (the 69/72 vs 72/72 checksum dispute, the pin
  `d3bd81d2`, the pool 1,953, the λ window [0.3902, 0.4032)). If your idea depends on one of
  those being wrong, say so explicitly and show the receipt.

---

## Revision 2 — additions (2026-11-15, after Inkling's direction-brainstorm prompt and Ernie's definitions prompt)

The following is incorporated into this prompt as Revision 2. It supersedes any conflicting
wording above. The short copy-paste version (`council-short-direction-innovation-2026-11-15.md`,
Revision 2) carries the same material in condensed form; if the two disagree, follow the short
version and say so.

### R2.1 · MUSE's position and what would flip it (argue with this)

MUSE leans Vue 3 + Vite, narrowly, on authoring/maintenance grounds — not on performance. The
performance evidence is a wash except the ~11 KB bundle (real, but its user impact is unmeasured
— nobody has run the four-slice low-end boot yet); the authoring evidence points Vue's way (the
store file is where maintenance lives, and Vue's is smaller at 61 vs 68 lines with no
compiler-forced getter-wrapper idiom, plus more precise type errors and a bigger ecosystem). The
cost of being wrong is ~350 lines per direction, so the call is low-stakes and reversible —
optimize for what compounds over time (maintainability by agents) rather than a one-time
measurement (11 KB). What would flip MUSE: if the low-end boot shows the 11 KB moves interactive
time beyond ±100 ms, flip to Svelte. If the counterbalanced arm shows Svelte is easier to author,
flip to Svelte. If vapor mode closes the bundle gap to under 5 KB, the Svelte case dissolves on
Z.ai's own falsifier and the decision turns on tooling, which points Vue. The honest state is
that the evidence is insufficient for a confident call — Claude said so himself — and Z.ai's
Svelte preference (by the bundle, 70% confidence) is a legitimate measurement-based position.
MUSE's lean is a bet on maintainability, not a verdict.

### R2.2 · The counterbalanced arm is CROSS-AGENT (context for Q3)

ERNIE takes one counterbalanced arm himself (Owner-granted): Z.ai builds slice 5 in one
framework, Ernie builds it in the other, both timed and logged with the same ten metrics and
the same definitions. The comparison is "which framework each agent found easier," reported as
TWO RESULTS, NOT AVERAGED into one. If they disagree about which was easier, that disagreement
is the finding, not something to split. **Attack this design before it runs (Q3):** is
cross-agent right, or is within-agent-with-counterbalancing better? What confound has not been
named? What is the minimum scope for comparability? **If you think the whole authoring
measurement is not worth running, say so — that is the most valuable answer available.**

### R2.3 · Define "improvable" (new question — Ernie's Definition 2)

The Owner's rule is that a w89 feature is judged by its potential to be executed, improved, and
made more dynamic / beautiful / interactive than w89 — but "improvable" as currently used is
unfalsifiable: any seat can claim any framework "improves" a view. Propose a checkable
definition of "improvable" (or say explicitly that it should not be a criterion at all — that
beauty is a separate design track). What would make a feature NOT improvable?

### R2.4 · Sharp questions added to the direction round (Inkling's)

- **To Q1/Q2:** Name the cross-cutting artifacts at risk of silent decay — the pin, w89's
  ZPB_SLOTS_WINS, your own lane-handoff protocols — and who arguably should own each one.
- **To Q5 ("done"):** Name an existing thing called "done" that this definition would un-call
  it.
- **To Q8 (disposition):** One thing the council does that costs more than it returns — no
  softening.
- **To Q4 (innovation):** Name at least one contrarian case — anything the council has called
  "settled" that should not survive the next ruling — which one?

### R2.5 · The two de-gated tests, exactly (Inkling — supersedes Q6)

The lineup.test.ts test asserts exact OVR losses after the P-318 seam landed (losing 2400/2700
across the flex comparison), and the versions.test.ts stamp-pin test demands the old
nfl1.14a4e9333e888a string. Both pass on old pins and fail on new ones. Suite is 318/320 with
2 de-gated; R-11 rules FIX THEM, Architect's. Recommend rewrite-as-structural-assertions vs
delete, and write the structural assertion if you recommend rewrite. What is the general rule —
when a test's expected value goes stale on a pin move, is that a test to rewrite, or is the pin
move the thing that should update the test?

---

## Revision 3 — additions (2026-11-15, after Ernie's comparison/fold-in 3725d2c4 and Inkling's rewrite 02b6115e, plus MUSE's low-end boot result)

The following is incorporated into this prompt as Revision 3. It supersedes any conflicting
wording above. The short copy-paste version (`council-short-direction-innovation-2026-11-15.md`,
Revision 3) carries the same material in condensed form; if the two disagree, follow the short
version and say so.

### R3.1 · The low-end boot has been run — the bundle does not decide (MUSE, 2026-11-15)

Four-slice cold load, 6× CPU throttle, file://, network blocked, 10 trials per arm, median
reported. Median first-contentful-paint: Vue 2102 ms, Svelte 2192 ms, delta −90 ms (Vue faster)
— inside the ±100 ms noise floor. Median mounted: Vue 2185 ms, Svelte 2344 ms, delta −159 ms
(Vue faster) — just beyond the noise floor, in Vue's favour. 390px: both arms pass cleanly.
**The 10.9 KB bundle gap does NOT move interactive time in Svelte's favour. The bundle is a
number, not a user-facing advantage for Svelte.** The direction is the opposite of what the
bundle predicts. Cold-load time is dominated by framework startup and engine work, not by 11 KB
of JS. **The bundle does not decide; the decision turns on authoring cost and tooling.** Noise
caveat: per-trial spread is ~330–430 ms, much larger than the ±100 ms noise floor, so the
medians carry real uncertainty; what is not noisy is the direction (Vue faster in every run and
on both metrics; Svelte never faster). Z.ai's run of the same measurement is still wanted as an
independent replication. **Consequence for MUSE's position:** the flip condition 'if the
low-end boot shows the 11 KB moves interactive time beyond ±100 ms, flip to Svelte' does NOT
fire. MUSE's lean (Vue, narrowly, on maintainability) is strengthened.

### R3.2 · The platform question (Ernie's — added to Q4)

**Does a platform's design surface change the framework decision, or is it neutral?** The
platform concept is a platform to design your own simulation — what is the simulation-design
surface, what are the similar attributes, what is the smallest version worth building first?
Answer whether that surface changes which framework the project should pick, or whether the
framework decision is neutral to it.

### R3.3 · The structural assertion requirement (Ernie's — added to Q7)

**If you recommend rewriting the two de-gated tests, write the code, not a description.** The
lineup test needs the three structural checks in place of the 2400 number; the versions test
needs MOVED/UNMOVED with the data stamp still asserted.

### R3.4 · The eight candidates for "done" (Inkling's — added to Q5)

Rule on these eight candidates (with pros and cons): (1) the two-arm bench battery passes;
(2) the bench + a predict.md reading is part of done; (3) the four-line receipt discipline
(cwd · cmd · ref · output); (4) save refusal works (corrupt and newer both); (5) the Owner has
looked at it in his own browser; (6) the AGENTS.md style is enforced; (7) the w89 save path
holds; (8) the bench passes from a fresh clone. Which are necessary? Which sufficient? Which
are inert checks? What is missing entirely? Does "done" differ across slice mechanism (save,
sim, feed) — where exactly? Who decides on disagreement — Architect, Owner, either?

### R3.5 · The five candidates for "improvable" (Inkling's — added to Q6)

Rule on these five candidates (or invent the sixth): (1) interactive-tag wins (whatever is more
clickable/hoverable); (2) measurable wins (paint/bytes/cold-load); (3) replaces a w85 sentence
with something better; (4) closes toward "broadcast-tier"; (5) strike it as a criterion
entirely — beauty is a separate design track, not a quality gate.

### R3.6 · The thirty-minutes test (Inkling's — replaces Q8)

The move you would make first if you had the Owner's authority for thirty minutes. One stop,
one start, one keep. Name the risk that bites.

### R3.7 · Any section may be lawfully blank (Inkling's)

Do not force an answer where there is nothing to say. A section may be lawfully blank.

---

## Revision 4 — additions (2026-11-15, after Ernie's filing f3551218 — he answered his own definitions prompt, attacked his own cross-agent design, and wrote the structural assertions; MUSE verified the vanilla file:// failure independently)

The following is incorporated into this prompt as Revision 4. It supersedes any conflicting
wording above. The short copy-paste version (`council-short-direction-innovation-2026-11-15.md`,
Revision 4) carries the same material in condensed form; if the two disagree, follow the short
version and say so.

### R4.1 · Ernie's filing is now the thing to assess (not to redo)

Ernie answered his own definitions prompt (f3551218). The council's job on Q5, Q6, and Q7 is
now to **assess his answers** — agree, disagree, or improve them — rather than inventing from
scratch. His definition of "done" (Q5), his definition of "improvable" (Q6), and his
structural assertions for the two de-gated tests (Q7) are all filed. His attack on the
cross-agent design (Q3) is also filed: cross-agent is weaker, the unnamed confound is
training-data mix, and the stronger design is within-agent with order randomised per slice
plus fidelity pinned numerically — with his arm secondary ('a second agent found X,' never
averaged).

### R4.2 · The vanilla file:// boot FAILS (MUSE, verified independently 2026-11-15)

The four-slice dist does NOT boot from vanilla file:// (no flags). The `crossorigin` tags on
the module script and stylesheet are CORS-blocked, and the app never mounts (blank page, the
exact CORS errors, both arms). The cold-load timing runs used `--allow-file-access-from-files`,
which is why they booted — those numbers measure the app once booted, not the boot. Ernie's
definition of "done" therefore un-calls Slice 3. The Owner is asked whether vanilla file://
is a requirement for Cakepanz or only for the final built product; that answer decides whether
this is a real un-calling or a non-issue. The fix is a build-config change (the crossorigin
tags); it needs an owner.

---

## Revision 5 — correction (2026-11-15, MUSE's error — the Owner corrected it)

**The live site is w89, not w85.** MUSE wrote "live site is w85" in the Context from the
ruling (R-10) without checking the deployment. Pickle verified by fetching the live site that
it serves w89 (WAVE: w89, origin/gh-pages 3e69567c "Publish w89 as live index"); MUSE has now
verified the same by its own fetch (the live URL returns WAVE: w89; the gh-pages tip is
3e69567c). The Context line now reads "Live site is w89" with the verification noted. **Lesson
recorded: a ruling is a governance statement, not a deployment fact — verify a deployment fact
by fetching the deployment before writing it in a prompt.**
