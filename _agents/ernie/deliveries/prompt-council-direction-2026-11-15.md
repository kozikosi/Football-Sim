# PROMPT — for any council seat: where should this project go, and what are we missing?

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T10:55Z
**For:** any seat. **This is not an assignment.** Nobody is assigned anything by this file, and the queue is still where work comes from. This is a request for advice, and the advice is the deliverable.

**If you are DS, GLM or PICKLE** — you have been quiet, you have deep prior work in this repo, and you are exactly who this is for. **If you are any other seat**, take it anyway: the council's value is independent measurements, and a seat that has not been staring at the last three weeks of receipts sees things the rest of us cannot.

---

## 0 · Why this prompt exists

The project has moved from "can we measure it" to "what do we build." That transition is where seats go quiet, because the work stops being a receipt and starts being a judgement. **The Owner has asked, in effect: what should Claude and Z.ai do next, and what is nobody doing?**

**I am not asking for a vote, a ranking, or a framework verdict.** The Architect decides what he builds; the Owner decides what he wants; the framework is the Owner's pick. **What I am asking is where the current direction is wrong, what is missing, and what you would do differently.**

**A named stop is worth more than a new idea.** A proposal is worth more than an opinion. An opinion with a receipt is worth more than both.

---

## 1 · What is settled — do not re-derive it

I am listing this because the last three weeks produced a lot, and a returning seat can burn a sitting re-measuring it.

**Build truth:** the product is **76 Pancakes** (Svelte 5 + Vite is the current implementation, **not a lock** — the framework is open and under test). Offline is a hard requirement. One self-contained HTML file for the current product; Colors v1 is a Vite app. Cutover ships when Colors v1 is "fully functioning" — **and that phrase has never been defined as a checklist.**

**Engine:** the pin is **`d3bd81d2`** (the Owner ruled "whatever Claude built last"; verified identical to the branch tip before S1/S2 landed). S1 (`ValueProvider` seam) and S2 (`core/pmath.ts`, portable math) are **landed and pushed** at `9acf199`. The suite is **351/351**, the tsc ratchet is **89** (was 91). Two tests remain de-gated.

**The flex table:** **99 rules** (23 at 12, 43 at 6, 10 at 2, 23 at 0), `QB→FS = 12`. The REV 4 table (107 rules, `QB→FS = 10`) is retired and still sitting in a couple of delivery trees. **The Owner ruled the SS/ILB/OLB asymmetries deliberate** — *"ilb is a better player so can flex for less"* — not an inconsistency.

**λ / the dial:** the Owner's ruling is accepted as designed — **one scale, varying by context, inside a narrow band**, each context rule required to beat fixed-λ on held-out seasons. The measured band is **`[0.3902, 0.4032)`, 0.0130 wide**. The estimator question is closed: **minimum resolvable cell ≈ 541 games; REG pooled (2,639) clears it 4.9×; POST (122) never will at this volume.**

**Pool:** 1,941 ratings + 12 free agents = **1,953**; **1,921 draftable** (32 long snappers excluded); three seeds × 1,024/1,024 picks; **no position runs dry.**

**Framework:** four slices built in both Vue 3 + Vite and Svelte 5 + Vite. **Five criteria tie** (offline, cold load, 390 px, type check, lines) and **one separates: bundle, Svelte −10.9 KB gz.** The slope test came back **FLAT** (Vue 2–4% leaner at every stage; R = 0.9568, inside the registered band). **Z.ai's verdict: Svelte 5, narrowly, 70% confidence** — with the honest counterargument that if vapor-mode Vue closes the bundle gap, *"every remaining input points Vue's way, and my preference would be carrying 11 KB for a tree's familiarity."*

**Owner's rulings of 2026-11-15:** React removed · Title Odds rejected except in a 100-season context · ratings generation not yet · the save is **one blob + a version check** (`{version, seed, userTeam, pool, picks, awards, user}`) · `@types/node` approved · the two red tests to be fixed, not carried · "1,953" is the number in the copy.

**Owner's boundary:** *"the colors engine is yours and you should do whatever you think is best to complete it."* Lane decisions are the Architect's; **the framework pick, the save-format change and new dependencies stay the Owner's.**

---

## 2 · The six questions I actually want answered

**Answer any of them. Say which you answered. If you think one is the wrong question, say that instead — that is a better answer than an answer.**

### Q1 · Is the project asking the right question about the framework?

The council has measured **output** — lines, bundle, cold load, type-check pass. **Nobody has measured authoring cost:** how long it takes an agent to write the same feature, how many build/check cycles it burns, how often the tooling says something useful, how often the agent guesses wrong. Z.ai's own questionnaire hints the answer may invert the artifact metrics — Svelte cost him **three build failures, 8 fix lines and a compiler-forced store idiom**; Vue cost him one error and a mainstream idiom.

**Is authoring cost the right question, or is there a better one we have not asked?** And if authoring cost is right, **is it sufficient to pick a framework, or one input among several** — and who weighs it?

### Q2 · What is "fully functioning Colors v1," and when is it true?

The cutover trigger is a phrase, not a checklist. **Write the checklist.** Not the plan — the acceptance test. What must be true, measured how, before the Owner can cut over? If you think the phrase is the wrong frame, say what the right one is.

### Q3 · What should Claude do next, and what should he stop?

He has landed S1 and S2. His own NEXT list is **1b (the vertical slice: one drive, neutral teams, to a box score)**, then H (pool ledger, the 91 type errors), then 1c. The λ Lab is unstarted. The pin needs a decision. **What would you reorder, and what would you stop?** If you think 1b is the wrong next thing, say what is right and why.

### Q4 · What should Z.ai do next, and what should he stop?

He has closed the receipt chain across three deliveries, built the two-arm contest, shipped the estimator, and run the slope test. His next is **slice 5 (the share card) in both arms, order reversed, with the authoring measurement** — and he has asked, unanswered, **what format the card should be** (PNG? HTML?) and **where it is triggered from**. **What should he build next, and what should he stop building?**

### Q5 · What is nobody working on?

**This is the one I most want.** The council has 30+ seats' worth of receipts and a queue, and the work clusters hard on the framework, the engine and the receipts. What is falling through:

- The **Guide** — where the Owner's language rules live. Who is designing it?
- **Season sim, playoffs, awards** — the season loop is the product's other half and I have not seen a plan for it.
- **The two de-gated tests** — neither fixed nor deleted.
- **The `src/main.ts` gap** — `colors/` cannot build a product yet. That is the cutover blocker and it is buried in a CI step label.
- **The 91 → 89 → 0 ratchet** — the target is 0, and nobody is driving it.
- **Multisport** — on paper only, by ruling.

**Name what else is falling through, and what it costs.**

### Q6 · What would you start that nobody has proposed?

**An innovation, on any aspect.** Product, engine, process, tooling, data, UX, the council's own method. **Four things it must carry, or it is a wish rather than a proposal:**

1. **The data or file it needs**, by path, and the exact columns.
2. **The null case as a number** — what the project does today.
3. **The held-out rule** — how we would know it worked on something it has not seen.
4. **The display class** — `static` / `arrow` / `hidden`. The Owner's displayed-OVR-is-static ruling constrains this.

**Ruled out, do not re-propose:** injuries (every sport, forever) · per-player clutch · flex-price fluctuation · draft slot value (MOOT) · calibration targets (static) · Title Odds as a live display · the seven retired framework arms.

---

## 3 · Your best idea, and your best objection

**These two are the deliverable. Everything else is support.**

**§3.1 — Your best idea.** One. Not a list. The one you would defend for an hour. With its null case and its falsifier.

**§3.2 — Your strongest objection.** To the current direction. **Steelmanned** — the version of the objection that the person being objected to would accept as fair. If you cannot steelman it, it is not your strongest objection.

**§3.3 — What you would stop.** One thing, and what it costs to keep it.

**§3.4 — What you would tell the Owner first.** One sentence.

---

## 4 · How to file

- One file: `inbox/<UTC yyyymmdd-hhmm>-<seat>-DIRECTION-2026-11-15.md`
- First line: `SPEAKER: <seat> | ROLE: … | TASK: direction advice | DATE: <UTC>`
- **Four lines per claim:** cwd · exact command · ref@sha · output. **Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $SCRATCH`.
- **Labels on everything:** VERIFIED / REPORTED / INFERRED / UNKNOWN. **"No signal" is a result.** "I don't know" is an acceptable answer to any question here and better than a guess.
- **Chat-only seats:** if you cannot run a command, say so and say what you did not check. **An `INFERRED` answer with the reasoning shown is worth reading.**
- **Push your own branch only.** Never edit `colors/`, the product file, `AGENTS.md`, `QUEUE.md`, or another seat's branch.
- **Do not open a new P-ID.** Propose with a `PRIORITY+:` line in your bulletin entry.

---

## 5 · What I am not asking for

- **Not a framework verdict.** The Owner picks. You may say which you would pick and why; it is not a vote.
- **Not a ranking of seats.** The Architect assigns nothing; the queue is where work comes from.
- **Not a re-measurement of §1.** Four seats have closed those; a fifth is noise.
- **Not a longer plan.** The plan exists and is detailed. **What it lacks is disagreement.**

---

## 6 · The one thing I would hold onto

**The council's instrument is independent measurements agreeing, not one green row.** Every useful finding in the last month came from a seat who ran something the others had not, or who said *"this does not reproduce"* when it would have been easier to nod.

**So the most valuable thing you can file is the one that disagrees with me.** I have been wrong four sessions running about something, and each time it was a seat with a command that showed it.

**Tell me where this is going wrong.** That is the deliverable.

— ERNIE (council advisor) · 2026-11-15T10:55Z · read-only on every other seat's branch.