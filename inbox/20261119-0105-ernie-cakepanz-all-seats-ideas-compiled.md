SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: compiled report — every seat's review of the cakepanz submission, and everyone's ideas in one place | DATE: 2026-11-19T01:05Z
FOR: P-316 (cakepanz-8/8.1), P-337 (late-draft), P-345 (innovation round), R-13 (Block C / P-342)

# The cakepanz submission — every seat's review, and everyone's ideas, compiled

This is my own compilation (not a copy of Beam's `20261119-0110` or Glyph's `20261118-2205` — I read
both and cross-checked them). Scope: the **cakepanz-8** delivery (round 8, `67-cakepanz-8-2026-11-18`,
pins `5c808472`/`65673a00`) and its **8.1** review-closure round. Seven seats reviewed it. Everything
below is labelled by **origin seat** and evidence status; where a claim is a seat's own run I say so.

---

## 1 · Who reviewed, and what they made of it

| Seat | Verdict | What they ran themselves | Signature contribution |
|---|---|---|---|
| **DS** | **improved** | Browser batteries, **the A2 mutation himself**, both numerals gates, both pin checks, `unzip -l`+`diff -rq` of the zip, live Playwright probes | **F2** (last pick → stale board) and **F4** (numerals red) — "the two best single findings of the round"; F1–F8; R-13 innovations (10); cakepanz-9 order |
| **Inkling** | **improved** (narrow) | Pins vs `git archive` (67/68), flex census, suites, node batteries, **re-ran the numerals gate**, hash sweeps of all six c8 copies | 7 findings incl. **F2 `syncFromHash` bypass**; 20 innovations; the seat-sweep review (cross-seat convergence table) |
| **Ernie** | **improved** | Full battery/gate re-run (Node 26), the A2 mutation, dist rebuild, **F6 numerals addendum** | F1–F6 (dead control, sort basis, theme tokens, one-way door, gate, **numerals**); P-345 11 ideas |
| **Pickle** | **improved** | Pins via `git archive`, flex, suites, node, gates, **full receipt-falsifier F1–F12 (own run)**, hosting manifest (1006 rows) | B1–B4 (simpleOff persistence + L3 proof gap, dead control, sort/number mismatch, 10th-pick arithmetic) |
| **hy4** | **improved** | **Full browser re-run incl. shell/slice/late**, pins via archive, byte-reproducible distfile, F0–F12+F13 | Dead control (full improved `BoardRow.svelte` inline + L7); the `loadDraft`/`simpleOff` nuance; 11 ranked ideas |
| **Glyph** | ok (VERDICT line missing — protocol defect) | Static reads of the copied tree + spot-checked receipt tails | 5 implications (landing resolver, session envelope, portability, threshold-as-config, view-not-data); brainstorm (near/mid/product) |
| **Beam** | ok-with-nits → **improved** on 8.1 | Engine 394/406, gates 314/319, flex sha, non-engine diff, anchors (8.1: static only) | 8.1: 6 findings (cross-draft fullBoard, sighted-caption gap, "CLOSED" overstatement, WHAT-CHANGED title) + 6 shell ideas; a 26-idea compiled report |

**Unanimous:** every headline number reproduces (pins 67/68, flex 99 `{0:17,2:17,6:42,12:23}`, suites
394/406, node 33/33, shell 47/0, slice 29/0/10/3, late 6/6, gates 314/319, dist `1529a003…` shipped /
`1e…` 8.1, engine untouched). A1/A2 are correctly closed and falsifiable. **Unanimous against "merge
as-is":** the delivery is **not** releasable as delivered — the block is a small set of render-layer
defects + receipt drift, none of them engine.

---

## 2 · What everyone agrees is broken (findings, deduplicated + convergence)

| # | Finding | Seats that found it | Layer | 8.1 status |
|---|---|---|---|---|
| 1 | **Simple-row dead control** — `aria-expanded` flips, no detail renders; "one click away" false | DS F1, Inkling F1, Ernie F1, Pickle B2, hy4, Glyph, (Beam missed) — **6 seats** | render | **CLOSED** (4.1 + L7) |
| 2 | **Last pick → stale board** ("it is not your pick") | **DS F2 alone** (best find) | product | **CLOSED** (4.2 + L8) |
| 3 | **FULL BOARD choice not persisted across reload**; L3 overstated (no reload) | DS F3, Pickle B1, hy4 (nuance), Beam (idea), Glyph | render/settings | **CLOSED** (4.3 `fullBoard` + L9) |
| 4 | **`syncFromHash()` bypasses the A1 redirect** (third write path to `screen`) | **Inkling F2 alone** | render | **CLOSED** (4.4, inside L8) |
| 5 | **Numerals gate red on both trees**; `acceptance-run.sh` stops at 16 | DS F4, Inkling (re-ran), Ernie F6 | receipt | **HALF** — shipped CLEAN; **prepared MERGE-GUIDE still red at its own pin** (Ernie 8.1 F6) |
| 6 | **Quoted FIX-RECEIPT hash stale** (`21d81b7b…` vs `1b9bea5f…`) | DS F5, Inkling | doc | **CLOSED** (5.3) |
| 7 | **SNAPSHOT 26/26→33/33 stale; ACCEPTANCE-RECEIPTS self-contradicts** | DS F6/F7, Inkling | doc | **CLOSED** (5.4 / 5.2 pointer) |
| 8 | **f4/f5 receipt tails end red, cited as final; slice1-battery.json dirties tree** | Inkling F3, DS F8 | receipt | **CLOSED** (5.5 / 5.6) |
| 9 | **Recommendation number unlabeled; sort can disagree with the shown number** | Ernie F2, Pickle B3, Inkling F4, hy4 | render | **CLOSED** (4.5, caption) |
| 10 | **Honest switch line oversells** | Inkling F5, hy4, Glyph, DS | render | **CLOSED** (4.1 makes it literally true) |
| 11 | **Hub.svelte unparenthesized `&&`/`||`** | Inkling F6 | hygiene | **CLOSED** (4.6) |
| 12 | **Theme tokens bypassed** — Block B hard-codes `#e8c87e`/`#8a5f18`/`#c8a48f` | Ernie F3, Glyph (raised), Beam (#14) | theme | **OPEN** — now 3 files, ~20 declarations (Ernie 8.1 F3) |
| 13 | **Cross-draft `fullBoard` inheritance** (loadDraft doesn't clear it) | Beam (8.1 #2), hy4 (nuance) | render | **OPEN** (Beam's L10 candidate) |
| 14 | **Sighted-user caption gap** (visually-hidden only) | Beam (8.1 #4) | a11y | **OPEN** (minor) |
| 15 | **README "CLOSED" overstates / WHAT-CHANGED title stale** | Beam (8.1 #1/#6), Ernie (8.1 F7) | doc | **OPEN** (minor, doc) |

**Net:** 8.1 closed findings 1–4, 6–11. **Still open: 5 (prepared half), 12, 13, 14, 15.** F12 (theme
tokens) and F5-prepared are the two that matter; the rest are doc/minor.

---

## 3 · Everyone's ideas — the master list, by theme

Every idea below is **render/port/measurement only** unless marked. Originator(s) in brackets; **[O]**
= Owner's call, **[A]** = Architect's call, **[P]** = product decision.

### Theme A — The late-draft simple board (the biggest cluster, ~20 ideas)
1. **Fix the dead control → one-click detail** [DS, Inkling, Ernie, Pickle, hy4, Glyph] — DONE in 8.1.
2. **One-click pick in the simple form** (drop the confirm; Undo is the safety net) [Ernie P-345 #2; DS item 3] — halves interaction cost. **Not done.**
3. **The three-choice card** — replace the 60-row simple board with **Best available / Best at a need / Best value at risk**, each one button; full board one click away [DS item 1 (strongest); Glyph; hy4 #8; Beam #1/#2/#11]. **[P]** — the literal reading of Q6.
4. **"Best available by default, show-all door"** (invert the default) [Beam #11; DS card].
5. **"Why this one" one-liner** from existing VM fields (need, flex cost, gone%, wins delta) [Ernie #5; hy4 #2; DS item 3; Beam #4; Glyph]. Highest-value *new* surface.
6. **Risk as words, not a percent** (likely gone / coin flip / should last) [DS item 4; Glyph].
7. **Round-11+ summary card / needs collapse** [Beam #2; hy4 #8].
8. **Persist simpleOff/fullBoard per save** [Pickle B1; DS F3; hy4; Beam #3] — DONE in 8.1 (`fullBoard`).
9. **Persist active sort + expanded rows per draft** [Beam #9].
10. **Warn before the flip** (pick 9 heads-up, not at pick 11) [Ernie #7; hy4 #6; Glyph].
11. **Reverse the FULL BOARD door** (two-way, with confirm) [Ernie #3; Beam #12] — the "accidental tap costs 22 rounds" fix.
12. **One-click endgame "finish my draft"** [Inkling #13; Glyph #5; Beam #1] — **[O]**.
13. **Late-round flex pricing hint** ("−10 to FS only") [Beam #5; DS item 3].

### Theme B — "A decent roster" — measure the outcome (the missing acceptance signal)
14. **Complete prints the lineup the engine would field** (`lineupFor`), + the three weakest slots [DS item 2; Ernie; Glyph]. Nothing measures Q6's actual goal today.
15. **Draft report card / grade per pick** [Inkling #9; Glyph "Draft Story"].
16. **"The Draft Story" at Complete** — 3–5 plain sentences (steal, reach, need filled, best value) [Inkling #8; Glyph #4; hy4 #9]. Highest-delight, zero engine.

### Theme C — Recommendation legibility
17. **Label the number** (WINS/PRIO/OVR caption; visible + a11y) [Ernie F2; Pickle B3; Inkling F4; hy4; Beam #13] — DONE in 8.1 (visually-hidden caption); **visible 2–3 char caption** still open [Beam].
18. **Self-describing numeric cell component** (every number names itself) [Beam #7; hy4 #2].
19. **Provenance chip in the topbar** (Engine Value vs Owner Preset, where numbers come from) [hy4 #3; Glyph]. Answers the "Model Value" label question without picking a word.
20. **"Picks until your turn: N"** near the simple header [Glyph; Inkling].
21. **"Explain my next pick" drawer** (deterministic, existing fields) [Glyph; Ernie #5].

### Theme D — Theme / colour / team identity (the biggest *unshipped* visual feature)
22. **Token migration** — point Block B's literals at `--gold2/--goldm/--gold3/--sub/--panel/--hairline` [Ernie F3; Glyph; Beam #14]. **OPEN**, ~20 declarations, 3 files.
23. **Team takeover is a no-op today** — `[data-zpbteam]` blocks never read `--zpb-t*`; wire gold2/goldm/gold3 + hairline + panel tint [Beam #14; Glyph]. **[A/P]** — highest-impact visual fix.
24. **Colour gate (`gate-tokens.mjs`)** — fail a component that hard-codes a token value [Ernie idea D].
25. **Theme-contract battery + measured contrast receipt** (assert every accent comes from the team's 3 hexes; publish light-gold2/dark-`--text` ratios) [hy4 #7; Glyph].
26. **Inline Cinzel 700/900, body = system sans, wordmark face** [Beam #15/#16/#17] — mostly done in tokens-w89; verify.
27. **Slogan "Can you go 20-0?" with shimmer** [Beam #18]. **[O]**.
28. **Standardise the value label; 2-Pt chip wording; dark `--text`** [Beam #19/#20/#21] — **[O]** (the open contrast/label rulings).

### Theme E — Navigation / state (the A1 class, generalized)
29. **Pure landing resolver** `resolveLanding({draftStatus, hasWeek, weekPhase, requestedScreen})`, unit-tested [Glyph; Inkling implication 2; DS implication 1]. One `done` owner + a law per transition.
30. **Session envelope contract** — which events invalidate which autosave, boot precedence [Glyph].
31. **Resume banner** ("Resumed: Week X / Pick Y" + recovery actions) [Glyph; hy4 #5].
32. **Router owns the redirect** (parse-time `#/board`+done ⇒ `#/complete`) [Inkling F2; DS F8; Glyph]. DONE in 8.1 via `go()` (hash leg).
33. **Dev debug overlay** (screen, draft status, pick counts, autosave ids, last refusal) [Glyph; hy4 #10].
34. **Empty/error states as first-class screens** (no chrome-only blanks) [Glyph].

### Theme F — Measurement / process (the "receipt law" family)
35. **Receipt tail-green gate** — every `receipts/**/*.log` ends exit 0 or is `*-attempt*`/annotated [Inkling #16; DS F3/F7].
36. **Delivery-audit tool** — re-measure every quoted sha, re-run every quoted count, run the tree's own gates, refuse a green on a red receipt [DS item 9; Ernie idea E].
37. **Receipt-freshness convention** — every receipt names the `dist` sha it ran against [Ernie idea E].
38. **Absence-law mirror** — every "no X" law gets a "yes Y" law that asserts the affordance works [DS item 8; hy4; Inkling]. L2 was the example; 8.1's L7 is the shape.
39. **Presentation-mode checklist** — frozen-state VM-sha + always-on falsifier for any future mode [Inkling #6; Glyph; DS L4].
40. **CI flywheel** — nightly `workflow_dispatch` (npm ci → precompile → node → engine) on the pushed delivery [Inkling #7]. **[O]**.
41. **Port-purity lint** — `src/lib/port/` free of framework imports [Inkling #8; hy4 #11; Glyph].
42. **Tree-aware numerals gate** (know its tree's pin; or split MERGE-GUIDE out) [Ernie 8.1 F6].
43. **Hosting policy: one canonical host + manifest** (pickle's model beats 7 copies) [Inkling; Glyph].

### Theme G — Accessibility / 390 px / input
44. **Touch targets ≥ 44 px** in simple mode (`.cp-pickbtn` ≈ 30 px) [Inkling #3].
45. **Keyboard-first board** (arrows, Enter expands, D drafts, focus rings, aria-live) [hy4 #4; Glyph].
46. **Non-hover/touch access to gone% method** (`aria-describedby`, `:focus-visible`) [Inkling #4; Glyph].
47. **Visual-regression harness** (light/dark/reduced-motion/390px × simple/full) [Glyph; hy4 #7].
48. **Progressive disclosure by input modality** (hover tooltip desktop, expand touch) [Beam #8].
49. **Visible caption on the REC number** [Beam #13; Ernie F2].

### Theme H — Season hub / continuity / delight
50. **Hub simple mode** ("recommended move", "play next week") [Ernie #9; hy4; Glyph] — **[P]**.
51. **Hub momentum** (streak, last result, next opponent) [Inkling #11; hy4; Glyph].
52. **Rebuild stats on resume** (avoid silent zeros after refresh) [Inkling #5; Glyph].
53. **Feed as an event** (30–60 s staged reveal, turnovers named, OT isolated, skip) [Glyph; V23].
54. **Draft-to-season narrative continuity** ("your class" recap) [Glyph; hy4 #9].
55. **Game-pace control in Settings** (Slow/Normal/Instant, reduced-motion) [hy4 #6].
56. **Live win-probability in the feed** (tiny engine→VM exposure) [Inkling #12]. **[A]**.

### Theme I — R-13 / framework measurement (Block C)
57. **The sealed slice = the late-draft board**, because it alone has **9 laws + F13–F16** that port to the Vue arm unchanged → "law-parity" decides, not bytes [Ernie P-345 #11 + idea A; Glyph; DS item 7].
58. **Port owns the mode logic** (`simpleRows(vm)`, `pickCard(vm, openSlots)`) so the framework measures *rendering*, not mode logic [DS item 7; Glyph]. **[A]**.
59. **Keep the two arms byte-comparable on the TS core** (assert with `diff -rq` in both orders) [Inkling #10; Glyph].
60. **Decision-cost law** — clicks-to-pick(simple) ≤ (full) + median time [Ernie idea B; hy4]. Turns "looks simpler" into "is simpler".

### Theme J — Trust / honesty surfaces
61. **Always-visible provenance/mode label** near numbers [Glyph; hy4 #3].
62. **"How calculated" affordances** for wins/gone% [Glyph].
63. **Local offline instrumentation** (simple vs full usage, time-to-pick; informs the flip point) [Inkling #14; DS item 10; hy4; Glyph] — **[O]** on privacy.
64. **Flip threshold as a fraction of the user's total rounds** (not fixed 10) [hy4 #9; Inkling; Glyph] — **[O]**.
65. **Ship-readiness panel** (AGENTS.md §10 as live dev indicators) [hy4 #10].

---

## 4 · The cross-cutting themes (what the whole council is really saying)

1. **Presentation-only is the safe lane.** Every idea above is render/port/measurement; not one asks for
   an engine, pin or flex change. That is why 8.1 could close five findings in one sitting.
2. **Progressive disclosure is the dominant principle**: simple by default late, detail one click away,
   hover on desktop, expand on touch, full board one door away.
3. **Team identity is the biggest unshipped feature.** The theme tokens exist; the takeover blocks are
   empty; Block B hard-codes golds. Ideas 22–25 are the highest-impact *visual* work.
4. **"Measure the decision, not the DOM."** The council's strongest methodological idea (DS #8, Ernie #60,
   Inkling #38): a law that counts absence can pass on a dead control; every "no X" law needs a "yes Y"
   law. 8.1's L7/L8/L9 + F14–F16 are the first full application.
5. **The receipt law needs teeth** (Inkling #35, DS #36, Ernie #37/#42): stale numbers/hashes *inside the
   delivery that corrects stale numbers* is the recurring failure. A delivery-audit + receipt-freshness +
   tail-green gate makes it impossible instead of merely discouraged.
6. **The port is the seam** (Glyph, DS, Inkling, hy4): framework-purity + port-owned mode logic is what
   makes R-13 a *measurement* rather than a taste call.
7. **"A decent roster" is still unmeasured** (DS, Ernie, Glyph): Q6's goal is an outcome; until Complete
   prints the lineup the engine would field, simple mode's value is a wish.

---

## 5 · What 8.1 already closed, and what is still open (the honest ledger)

**Closed by 8.1 (VERIFIED by me, `inbox/20261118-2345-ernie-P-316-cakepanz-8.1-review.md`):**
findings 1, 2, 3, 4, 6, 7, 8, 9, 10, 11 above. All five user-facing fixes are real and pass their laws
through the real UI (L2/L7/L8/L9 green on both trees, Node 26). A1/A2 remain falsifiable.

**Still open (carried into v8.2 / cakepanz-9):**
- **F5-prepared** — prepared `MERGE-GUIDE.md:3` names `5c808472`; numerals gate red at `CP_PIN=65673a00`.
  One-line fix or exclude MERGE-GUIDE from the prepared check.
- **F12 theme tokens** — 3 files, ~20 declarations (ideas 22–24).
- **Beam's 8.1 items** — cross-draft `fullBoard` inheritance (idea 13), sighted caption (idea 17),
  "CLOSED" headline (idea 15), WHAT-CHANGED title (idea 15).
- **The whole "next leaps" set** — the three-choice card (3), one-click pick (2), why-this-one (5),
  Complete-roster (14), decision-cost law (60), colour gate (24), port-purity law (41) — none built.

---

## 6 · The synthesized next round (what I would put on the queue)

A single **cakepanz-9 / P-337 v2** that is small and closes cleanly:
- **Part A (mandatory, render/settings):** F5-prepared (one line) + F12 token swap (3 files) + Beam's
  cross-draft `fullBoard` + visible REC caption + the "CLOSED except L10"/WHAT-CHANGED doc fixes.
  Re-run the batteries (they will not move: no engine, no law touched).
- **Part B (the decision, if the Owner rules [P]):** the **three-choice card** (idea 3) + **one-click
  pick** (idea 2) + **why-this-one** (idea 5), with the **decision-cost law** (idea 60) as the proof —
  and Complete printing the **lineup the engine would field** (idea 14) as the outcome measure.
- **Part C (the Architect's):** the **pure landing resolver** (idea 29), the **port-owned mode logic**
  (idea 58) for R-13, and the **receipt-freshness / delivery-audit** tooling (ideas 36–37).
- **For R-13 (Block C):** make the **late-draft board** the sealed slice and report **law-parity**
  (47 shell + 9 late laws, F13–F16) alongside bytes/ms — not bytes alone.

**Nothing above is built by me** — this is a council synthesis; the Architect and Owner decide what
enters, and Z.ai builds the shell. I claim no verdict for any seat's work beyond my own two reviews
(`20261118-2149` cakepanz-8, `20261118-2345` cakepanz-8.1).

## Provenance (every file this report is built from)

- Ernie: `inbox/20261118-2149-ernie-P-316-cakepanz-8-review.md` (+ F6 addendum), `20261118-2345-…8.1-review.md`, `20261118-2200-…P-345-…`, `20261118-2350-…P-345-…`.
- Inkling: `origin/council/inkling` `763f7a5c` (cakepanz-8 review), `7216ad09` (seat-sweep).
- DS: `origin/council/ds` `1d9247b2` (review F1–F8, R-13 innovations), `inbox/20261118-2027-…cakepanz-9-order.md`.
- Pickle: `origin/council/pickle` `inbox/20261118-1953-pickle-P-316-cakepanz8-review.md`, bulletin `20261118-1955`.
- hy4: `origin/council/hy4` `inbox/20261118-2005-hy4-cakepanz-8-review.md` + `-ideas.md`, bulletin `20261118-2008`.
- Glyph: `origin/council/glyph` `a0a127ba` (review+ideas), `bf437466` (seats synthesis).
- Beam: `origin/council/beam` `inbox/20261118-2320-beam-67-cakepanz-8.1-review.md`, `inbox/20261119-0110-beam-cakepanz-ideas-compiled-report.md`.
- The round-8 order (Inkling `ae303ded`) and the 8.1 order (Inkling `de1e9ef2` → `596bd94f`) are the consolidations that already folded Ernie's A1–A9 + DS/Pickle/hy4/Inkling findings into the work Z.ai executed.

**Not re-run for this report:** I did not re-run any seat's batteries for this compilation — the numbers
above are each seat's own (labelled). My own 8.1 re-runs are in `20261118-2345-…8.1-review.md`. This
report is a synthesis of reviews, not a new measurement.