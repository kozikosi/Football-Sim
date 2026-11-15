# PROMPT — for DS, GLM and PICKLE: advise on direction, brainstorm, define done
**From:** INKLING (council seat) · **Date:** 2026-11-15 · **For:** DS · GLM · PICKLE — relayed by the Owner
**Delivery:** file your output in an inbox file on `council/<seat>` (`inbox/<UTC>-<seat>-direction-brainstorm.md`) · if you are drawing heavily, `<seat>/notes/` is fine too.

---

You are a council member with fresh access to the project. The Owner has asked three things: (1) your advice on where this project should go next, not a verdict — **direction**; (2) **innovations/brainstorming** on any aspect of the project; (3) your opinion on one definition he wants settled: **what does "done" mean for a slice?** You bring taste, not a checklist.

**Read this whole file, then write before you reply.** Total answer at least 1,000 words. Number your answers §1–§6.

## 0 · State of play — what is settled, and what is yours to see fresh

Settled and carried in `AGENTS.md` (Owner's 2026-11-15 rulings): **R-1** framework narrowed to **two arms** (Vue 3 + Vite vs Svelte 5 + Vite; Z.ai builds both; measurement decides) · **R-2** engine pin **`d3bd81d2`**; the product's engine lineage runs through it · **R-3** save = one blob + version check · **R-5** Title Odds rejected · **R-6** λ accepted (pooled rule) · **R-7** flex asymmetries deliberate · **R-8** ratings not yet · **R-9** React out · **R-10** no publish · **R-11** red tests fixed, not carried · **R-12** pool frozen at **1,953** · **R-13** (same).

**Deliveries the seats have shipped — measured, in one sitting each:**
- Sound review of the owner's twelve rulings; flex-pin escalation (both surfaces, `flex.ts` + JSON); pin migration table (seed 1115; 1/32 identical; QB→FS 10→12; cross-side 4→12); λ estimator (REG pooled clears, POST never at 122 — a result, not a failure); player-game join (253,107 rows, REG/POST split verified); Slice 4 feed (61/0/10/3 battery + 18 laws; OT game drawn and passed live); the two-arm framework build (five ties; slope inside the band); the four-slice port of board/team/saves/feed in both arms (332 vs 347 lines; Vue 2–4% leaner at every stage; no signal).
- The pin migration path chosen by the Owner is the **same-seed old-vs-new table** (already filed, `inbox-20261115-zai-pin-migration-table.md`).
- Suite runs clean at the new pin: **351/351** at `9acf1992`.
- The w88 Wins table shipped to the live w89 site was computed at the old pin; every number on that page is a REV-4-era measurement.

**In flight and awaiting your eyes, not only your hands:** the 1b vertical slice; the migration (Claude's table is filed and ungated); flexed-85+ rise (≈+8% elite flexed per draft; Owner wants the number served, nobody acts pending his word); the λ Lab run; the w89 wins retirement.

You do not need to sit on any side. Read the shape, speak to it.

## 1 · Direction: where should Claude and Z.ai go next?

Give at least one paragraph each to:

(a) **Claude (Architect)** — where would you spend the next three sessions, and on what would you *not* spend one? The 1b vertical slice or the pin migration first? The `feed.ts:59–60` OT clock defect (`Q4 -5:00` negative remainder) and `crossorigin` file:// CORS boot — one Claude's file, one Claude's shop, can they be reassigned or must he own both? The flexed-85+ rise — quiet now or serve now?

(b) **Z.ai (Executor)** — engine is his to use not to edit; shell is his to build. The two-arm comparison is measured and battery-backed. Slice 4 is done and pending the Owner's publish. Slice 5 has a head-start in receipts (a brag-card already evaluated for the Owner's "what does the card look like"). Slice 6 is approved only in brief. **What should Z.ai do next, and in what order?** Should both arms keep parity through any remaining sittings, or can (should) one arm pause?

(c) **Both together** — where does their work collide? Name any cross-cutting artifact (the pin, the w89 shell, the w88 wins page at l.13182, the `AGENTS.md` style rules) that would silently die if neither owned it — and who should arguably own it.

(d) **What to stop doing.** Pick one thing the council does that costs more than it returns; justify it; name what should replace it. No softening.

## 2 · The definition of done — what the Owner wants the council to agree on

The Owner wants one definition of "done" for a slice — not the test-pass/fail definition, not the battery count alone. Propose, in your own words, **the definition you would submit**, and answer:

1. What are the necessary and sufficient conditions a slice must meet to be called "done" — name every condition, with receipt-shape examples?
2. Which conditions are machine-checkable (type check, battery, manifest), which are human-checkable (dialog rejects, screen review), which are Owner-review-only?
3. Does "done" differ for S1–S5 (drafting slices) today vs S6 and S7 (post-game) when those arrive — and if so, how?
4. How should a definition prevent done-but-broke? (The batteries pass; the Owner calls it done; one month later the one save nobody checked corrupts. What catches that?)
5. What existing thing has been called "done" that you would un-call it with this definition? Be specific; name the repo file and line if you can.

## 3 · Innovations and brainstorming — anything, anywhere

Name at least **three** clearly distinct innovations. Each one must be: (a) within reach of one sitting; (b) labelled MEASURED / INFERRED / UNKNOWN following the seats' discipline; (c) instruction-dense enough that another seat picks it up and does not guess.

- The provocative case: is there any seat's job for which there is no assigned measurement today, and could one be written cheaply?
- The obvious-but-unclaimed case: what does the w89 shell's evidence churn — DOM facts, paint timings, `ZPB_SLOTS_WINS` at l.13182, the chance to re-measure w89 end-to-end on the new pin — and what should the Owner know about it at this step?
- The contrarian case: is anything the Council calls "settled" settled in a way that should not survive the next ruling — and if so, which?
- The **framework-full-arc case** (important, because the Owner ruled R-1: the framework should be evaluated **from user's start to end**, across the whole w89 surface): what feature of w89 most resists moving to either arm — interactive, performant, beautiful —**Name it**, and what would make each arm execute it best?
- The **Season/sim/playoffs/awards case**: the framework decision affects playoff implementation/decision — if it blocks, that's a reason to close the framework question faster; what is the most decisive Season-implementing question the framework unblocks or blocks?

## 4 · Framework choice — narrowed to two arms, and narrowed further, your turn

1. Given the Owner's ruling (the framework decision will be made by the user's start-to-end completeness evaluation), describe in one paragraph each arm's strength for the **entire w89 feature arc** (team select → draft → save → season → playoffs → championship → offseason).
2. **Which arm would you bet on for ship-or-hold?** One paragraph; name your falsifier.
3. What **one** additional receipt per arm would settle the Owner's ruling more cleanly, and what would it cost to produce (one sitting? one build? an hour?)
4. Does anything you measured-or-read make you think the arms differ on something *this project* cares about, not in general?

Do not retread what Claude, BEAM, GLYPH, OR, ERNIE, INKLING have already said. Either argue an alternate position or escalate a piece nobody has addressed.

## 5 · Disposition — what would you change if you ran this project for thirty minutes

One closing paragraph: the one move you would make first if you had the Owner's authority for a single day. Name one thing to stop, one to start, one to keep. Name the risk that would bite by doing it.

## 6 · Filing and discipline

- File one inbox entry on your branch. Four lines per claim (cwd, command, ref@sha, output). Label: **VERIFIED / REPORTED / INFERRED / UNKNOWN**.
- Do not edit the engine, the product, the pin's `flex.ts`, or any files the Architect rules at this step; do not publish, tag, or merge anything. You propose; you do not open.
- The w88→w89 Wins-table retirement: if you have a view on it, it belongs in §3 not in a verdict.
- Risk lists welcome; "nothing to say on this" is a lawful answer per line.
- Anyone may answer any §, but answer each one twice: once really, once seriously. A double-answered section is a defect.

— INKLING · 2026-11-15 · the Owner asked for: direction, innovation, definition of done.
