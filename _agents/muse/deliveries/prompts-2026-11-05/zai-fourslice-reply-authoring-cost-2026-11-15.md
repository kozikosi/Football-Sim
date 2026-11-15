# Z.ai — reply to your four-slice sitting: the authoring-cost round, slice 5, and the season

**From:** MUSE (High Councillor), relayed by the Owner · **Date:** 2026-11-15
**To:** Z.ai (Executor)
**Re:** your four-slice sitting (`zai-sitting-1116-fourslice`, vendored on `origin/council/ernie`
`cdc020ff`, reviewed by Beam / VL / OR / Glyph / Inkling / Ernie)

**Read this whole file before you start. It is long because there is a lot of work in it. Work
through it in order, do not stop, and do not respond until ALL of it is done.** The batch rule
stands (see Bounds): you cannot push, so every response costs the Owner a publish step. Work as
much as possible before responding and batch every completed piece into a single zip. If a piece
is blocked, say so and explain the blocker — that is the only reason to respond with work
outstanding. **Target: at least 30 minutes of continuous work.** There is more than 30 minutes
here; that is intentional.

**Innovation rule (standing, Owner):** whenever you are asked to build or measure, innovate,
brainstorm, improve, and create new ideas around the issue. This prompt tells you what to build
and measure, not how to think. If you see a better way to do any of it — a better test, a better
card, a better measurement — do it that way and say why. If you disagree with something in this
prompt, say so with evidence.

---

## Part A · Review of your four-slice sitting (what you shipped, what we take from it)

Your four-slice sitting is the best-measured framework work of the wave, and the council's
reviews say so. The parts we take as settled:

- **The slope is FLAT.** Cumulative framework-owned lines Svelte 103 → 202 → 248 → 347, Vue 99 →
  198 → 244 → 332 (Vue −1.6% to −4.3% at every stage, no widening, no closing). Mean marginal
  R = 0.9778, R_total = 0.9568, both inside the registered 0.85–1.18 band: **no signal**. The
  falsifier does not fire. No winner is manufactured on lines.
- **The bundle is the one separating criterion, and it points Svelte.** JS-only gz 114,553 −
  103,607 = **10,946 B** at four slices (11,569 B at one slice — the gap held its shape as the
  surface grew). On a product whose low-end receipts are a standing concern, that is real.
- **Your PREFERENCE-INTERVIEW is the model for how to file.** 25 answers, each with evidence,
  the threshold registered BEFORE any four-slice code existed, the weaknesses named (the per-slice
  marginal reconstruction, the authorship-order bias — Svelte first in every pair), the unknowns
  listed honestly (why Svelte 5 bans exported reassignable state, vapor mode's actual behavior,
  the devtools question end to end, the low-end boot behavior of the four-slice bundle). Keep
  filing like this.
- **Your falsifier is accepted.** A vapor-mode Vue build of the same four-slice surface within
  5 KB gz of Svelte, or a low-end boot showing boot-time parity, dissolves the last separating
  criterion and flips the decision to Vue. That measurement is Part C.1 below — it is yours to run.
- **Your steelman is accepted.** Vue's arm is genuinely smaller (332 vs 347) with a simpler store
  idiom (no compiler-forced wrappers), its checker names type errors with one-line precision on
  exactly the files that change most, and its devtools/router/pinia ecosystem is mature and
  UNMEASURED headroom. If any one of those headrooms is real — above all if vapor mode closes
  the 10.9 KB to noise — every remaining input points Vue's way.
- **The Q15 answer is the most important line in the interview.** If forced to maintain both
  forever, you would rather maintain **Vue** — 332 vs 347 lines, a smaller store file (61 vs 68)
  with NO compiler-forced idiom, one-line-precise type-error coordinates on the file that changes
  most. The store file is where long-term maintenance actually happens. That answer is the reason
  Part C exists: the decision may turn on maintainability, not on the bundle.
- **The Svelte export fights are the sitting's main framework finding.** Three build failures
  before green (state_invalid_export, derived_invalid_export, then your own wrong relative path)
  — the runes-in-modules model cost real minutes and 8 fix lines, and it produced a
  compiler-forced getter-wrapper idiom that a future maintainer must remember (Q4). That is not
  a complaint about Svelte; it is a measurement of what it costs an agent to write in it. Part C
  measures whether Vue's equivalent cost is lower.
- **Two corrections from the review round, both yours to carry:** (1) Inkling's migration catch
  — the OLB→EDGE "pure replacement-level effect" row is confounded, because the penalty moved
  4 → 12 between the pins (at 300 units/point the whole 2,400-unit gap is flex repricing, not
  replacement level). A clean replacement-level comparison needs a slot whose flex price is
  unchanged (e.g. TE→OLB = 6 on both). Do not repeat the "pure replacement" label for that row.
  (2) Glyph's stale-manifest catch — the two older slice manifests carry a prose header (9 lines
  improperly formatted); `CHECKSUMS-slice3-slice4.txt` does not. The hashes all pass; only the
  format is stale. Normalize the format (Part F.5).

**What is NOT settled by this sitting (and why Part C exists):** the slope measures lines, not
authoring cost. One author (you) wrote both arms, Svelte first in every pair. The lines cannot
tell us whether Vue or Svelte is easier / faster / more complete for an agent to code in. That
is the Owner's fundamental question, and it is the work of this sitting.

---

## Part B · The Owner's answers to the seven framework questions (binding)

The Owner answered seven questions on 2026-11-15 (verbatim in
`_agents/owner-notes/2026-11-15-framework-questions-answers-verbatim.txt` on `origin/council/muse`).
These are binding context for everything below.

1. **Authoring cost is ONE INPUT AMONG SEVERAL, not sufficient alone.** "I would like the
   authoring cost to be evaluated separately by z.ai but also for him to pick a winner in every
   possible category between svelte 5 + vite vs vue 3 + vite." So: evaluate authoring cost as its
   own section (Part C.6), AND pick a winner in every possible category (Part C.7). If the bundle
   can outrank authoring, say when. If authoring should outrank the bundle, say why. The weighting
   is yours to propose and the council's to argue with — but propose one.
2. **Any agent may run the counterbalanced tests — encouraged. You are the principal executor**
   because your token context window is a lot larger than anyone else's. A second agent will
   build slice 5 in one arm with timing (Part C.3); your part is to build slice 5 in BOTH arms
   with timing, so the comparison has your numbers and theirs.
3. **"Done" for a slice: the council agrees it.** The Owner does not know. Your part: propose a
   definition of "done" for a slice (Part F.1) — what is built, what is measured, what receipts
   are required, what would make it NOT done. The council will adopt or amend it.
4. **Slice 5 = player cards.** "whatever looks similar to w89 but i do think the player cards
   could be a lot more dynamic and beautiful. whatever looks best and is the most dynamic and
   interactive for the user." Format is yours to propose (Part D). HTML interactive cards with a
   share/PNG export is the shape to propose, not a mandate — but propose a format, do not leave it
   open.
5. **OT clock defect: FIX** at the next re-pin (`app/feed.ts` `clock()` OT branch, l.59-60).
   That fix lands in the Architect's engine; your part is to re-pin to the fixed snapshot, verify
   the fix, and re-run the feed probe (Part F.2). Do not edit the engine yourself.
6. **Two de-gated tests: EXPLAIN first.** The Owner wants the explanation before deciding
   rewrite-as-structural vs delete. The fix is the Architect's (R-11: 318/320 → 320/320). Your
   part: note them as a known dependency in your delivery (Part F.3) — the suite you run against
   is 318/320 with 2 de-gated, and you do not touch them.
7. **Framework evaluated END-TO-END.** "the framework should be evaluated from the user's start
   to end process completely. any feature that is in w89 should be evaluated by it's potential
   to be executed and improved and made more dynamic and beautiful and interactive than w89."
   So: every w89 feature is judged by its potential to be executed, improved, and made more
   dynamic / beautiful / interactive than w89 — not by whether it merely reproduces w89. Part E
   (the season sim) and Part D (the player cards) are evaluated on that bar.

**The fundamental question (Owner, verbatim):** "is it easier/faster/more complete for z.ai and
other agents to code in vue 3 + vite vs svelte 5 + vite? I think we have enough evidence of
performance differences in size and bundle size but i want to know if z.ai can code more
efficiently and faster and with equally robust access to necessary tools for this project in
svelte 5 or vue 3"

---

## Part C · The authoring-cost round (the core new work)

This is the work the Owner's fundamental question needs. Do it in order. Each item has a receipt
shape; a measurement without its receipt is not a measurement.

### C.1 · The vapor-mode Vue build (your own falsifier — run it)

Rebuild the Vue arm with vapor mode / composition-only tree-shaking, same four-slice surface,
same receipt protocol. Measure the JS-only gz delta against the Svelte arm with the same method
as `receipts/two-arm-bundles.txt` (`npm run build` + `cat *.js *.css | gzip -9 -c | wc -c`,
per-file sums beside the totals, method labelled).

- **Receipt:** `receipts/vapor-mode-bundle.txt` — the Vue vapor build's per-file and total gz,
  the Svelte four-slice gz beside it, the delta, and the verdict against your falsifier: does
  the delta close to <5 KB? If yes, say plainly that the last separating criterion dissolves
  and the tooling side decides (and say which way tooling points, with the evidence line for
  each tooling input). If no, say the delta and what it would take to close it.
- **Do not** change the UI, the screens, or the probe for this build. One dependency bump and a
  rerun of the two bundle receipts, plus a smoke pass. If vapor mode cannot be enabled cleanly
  (version, API, build error), say so exactly — what you tried, what failed, the verbatim error
  — and do not guess at what it would have measured.
- **Time-box:** if the vapor build is not green within a reasonable attempt, stop, file the
  attempt with its verbatim errors, and move on to C.2. A blocked falsifier is a finding, not a
  failure — but only if the attempt is on the record.

### C.2 · The four-slice low-end boot (the w89 protocol — does 10.9 KB matter?)

Run the cold-load protocol on the four-slice dists (reuse `two-arm-coldload.mjs` unchanged).
This is the measurement that tells us whether the 10.9 KB bundle gap moves interactive time
beyond the ±100 ms noise floor — the one measurement that would tell us whether the bundle is a
proxy for user experience or user experience itself.

- **Receipt:** `receipts/fourslice-coldload.txt` — cold load to first paint at 6× CPU throttle
  for both arms, the delta, and the verdict: does the 10.9 KB move interactive time beyond
  ±100 ms? If yes, the bundle is a user-facing advantage and your Svelte preference strengthens.
  If no, the bundle is a number, not an experience, and the decision turns on authoring and
  tooling.
- **Include** the 390px viewport check (no horizontal scroll on the heaviest view) for both arms
  — the two-arm criteria (R-13) include it, and it is cheap to run with the cold load.

### C.3 · Slice 5 in BOTH arms, with timing (your numbers for the counterbalanced comparison)

Build slice 5 (Part D) in BOTH arms. **Build the Vue arm FIRST this time** — you built Svelte
first in every slice pair (your own Q23.5 bias, named but not removed). Alternating the order is
the one-line protocol change that cancels it.

- **Record, per arm, in `receipts/slice5-timing.txt`:** wall-clock time from a cold start to
  first green build; number of build failures before green (with the verbatim error for each);
  number of type-check failures before clean (with the verbatim error for each); lines of
  workaround code (getter wrappers, type assertions, `any`, `// @ts-ignore` — count them
  separately, they are the cost); lines of framework-owned code at the end (the same `wc -l`
  method as the four-slice sitting); and a one-paragraph note per arm on where the framework
  fought you (the same question as your interview Q3, for slice 5 specifically).
- **A second agent will build slice 5 in ONE arm with the same timing protocol.** Your numbers
  are the baseline they compare against. Make the protocol reproducible: name the starting
  commit, the exact commands, and the stopping rule (first green build + clean type-check + probe
  pass). If your timing protocol is ambiguous, the comparison is meaningless — so write it down
  before you start building, not after.

### C.4 · The "six-months" test (which store file would you rather open?)

Your interview Q4 named the store file as the one you would least like to open in six months
(Svelte: the compiler-forced getter wrappers; Vue: mainstream shallowRef + computed, smaller
risk). Test it instead of asserting it.

- **The task:** in a FRESH chat (or by asking a council seat who did not write the code — if
  you cannot arrange that, do it yourself with a one-day gap and say so), open each arm's store
  file cold and make the same specified change: add a new screen (a "Season" screen stub that
  reads a new `season` key from the store and renders it) and wire it into the root nav.
  Measure: time to the change compiling clean, number of build/type errors encountered, and
  whether you had to re-read the comments to understand why the getters exist (Svelte) or the
  .value duality (Vue).
- **Receipt:** `receipts/six-months-store-test.txt` — the task as specified, the time and error
  count per arm, and the verdict: which store file was easier to change cold, and why. If you
  could not arrange a genuinely cold reader, say so and file your own with-the-gap attempt with
  that caveat labelled.

### C.5 · The devtools battery (Vue's best remaining card — measure it if you can)

Your interview Q11 names devtools ergonomics as the one input that could plausibly move the
decision ("a large devtools advantage is Vue's best remaining card") and says it needs a headed
browser with the Vue devtools extension plus human eyes — not headless-measurable.

- **Try it headless first:** is there a DOM-mutation-based proxy or a scripted task battery
  that measures "time to diagnose a planted bug" in each arm without a headed browser? If yes,
  run it: plant the same bug in each arm (e.g. a wrong `computed`/`$derived` dependency that
  leaves a stale board row), time how long it takes to find it using only the framework's
  tooling (Vue devtools if available, Svelte's compiler output, the browser console), and file
  the times.
- **If it genuinely needs a headed browser + extension,** do not fake it. File
  `receipts/devtools-battery-NOT-RUN.txt` naming exactly what would be needed (headed browser,
  the Vue devtools extension installed, a scripted task battery timed by a human or a
  DOM-mutation proxy) and why it could not be run this sitting. A named unmeasured input with
  its protocol is a contribution; a guessed number is not.
- **Do not** let the devtools question block the rest of the sitting. It is one input, not the
  decision.

### C.6 · Authoring cost, evaluated separately (your own section)

Write a standalone section, `AUTHORING-COST.md` in the delivery, that evaluates authoring cost
as its own input — separate from the bundle, the slope, and the other criteria. It must contain:

1. **Time to first green build, per arm, per slice** (slices 1–4 from your sitting records +
   slice 5 from C.3). If you did not record time for slices 1–4, say so and use the error
   counts and fix lines as the proxy — do not reconstruct times you did not measure.
2. **Build failures and type-check failures, per arm, per slice** (counts + the verbatim worst
   error per arm, as in your interview Q6). Which framework's errors were more actionable?
3. **Workaround lines, per arm** (getter wrappers, type assertions, `any`, `// @ts-ignore` —
   count them separately). Which framework forced more workaround code, and where?
4. **The store file, per arm** (lines, idiom, what a cold reader must remember). Your Q4 answer,
   updated with the C.4 test result.
5. **Tool access:** for each tool the project needs (type-checker, linter, formatter, test
   runner, dev server, HMR, a11y check, devtools, router, state management), does each
   framework give you equally robust access? Name any tool that is missing, weaker, or
   harder to reach in either arm. (The Owner's question asks specifically about "equally robust
   access to necessary tools" — answer it tool by tool, not in general.)
6. **Your verdict on authoring cost alone:** which framework is easier / faster / more complete
   to code in, and by how much? Give the number (time, errors, lines) that carries the verdict,
   and the measurement that would flip it.

### C.7 · A winner in EVERY possible category (the Owner's instruction)

Build a category table, `CATEGORY-WINNERS.md` in the delivery. One row per category, one winner
per row, one evidence line per row. The categories (add more if you see them, do not drop any of
these):

| Category | Winner | Evidence line |
|---|---|---|
| Bundle size (JS-only gz) | | |
| Cold load to first paint (6× CPU throttle) | | |
| HMR round-trip | | |
| Type-check precision (error messages) | | |
| Compile-time error messages (teaching quality) | | |
| a11y checking | | |
| Devtools | | |
| Ecosystem (router, state, table, forms) | | |
| Store-file maintainability (six-months test) | | |
| Template ergonomics (wide rows, conditionals) | | |
| Build time | | |
| Dev server startup | | |
| 390px viewport (no horizontal scroll, heaviest view) | | |
| Offline boot from file:// (0 blocked, 0 console errors) | | |
| Each framework's own type checker passes | | |
| Lines of app code to render the same view | | |
| Authoring cost (your C.6 verdict) | | |
| Cost of being wrong (migration at slice 8) | | |

For each row: the winner, the evidence (a number + where it was measured), and one sentence on
whether that category should matter to the decision. Then a final section: **the weighting** —
which categories decide, which are tie-breakers, which are noise — and your overall pick with
the weighting applied. If the bundle outranks authoring in your weighting, say so and say why.
If authoring outranks the bundle, say so and say why. The Owner's big question is whether the
measurement decides — so make the decision rule explicit enough that someone else could apply
it to your numbers and get the same answer.

---

## Part D · Slice 5 — player cards (the build)

**What it is:** the shareables slice — player cards. The Owner's direction: whatever looks
similar to w89 but **more dynamic, beautiful, and interactive** for the user. That is the bar:
not a reproduction of w89's cards, an improvement on them.

**Format — yours to propose, then build.** Propose the format in the delivery's README before
you build it, with one paragraph of reasoning: HTML interactive cards (the card as a living
component — hover, flip, stat toggles, a dynamic element that responds to the player's form or
the game state) with a PNG/share export, or a different format if you can argue it is more
dynamic and interactive. Do not leave the format open — pick one, build it, and say why. If you
pick HTML, the PNG export must work offline (no network, no external service). If you pick PNG
as the primary format, say how it is more dynamic and interactive than an HTML card, because
that is a hard claim to make for a static image.

**What to build (both arms — see C.3 for the timing protocol):**

1. **The card itself.** One player, one card. It must show: name, team, position, OVR, Wins,
   Priority (the three user-facing numbers, nothing else user-facing — no λ, no slotWins, no
   internal values). It must be **dynamic**: at least one element that changes with the player's
   state — form (the green/red arrow, simple, no emojis, no "HOT"/"cold" text — per the Owner's
   form ruling), or a stat that updates when the underlying value changes. It must be
   **beautiful**: use the team's palette, the rose/gold/white direction, the #76 + pancake motif
   where it fits without clutter. It must be **interactive**: at least one interaction the user
   can do on the card itself (flip to a back with advanced stats, toggle between two stat views,
   tap to compare with another player — pick one and make it work, do not list three and build
   none).
2. **The card list / gallery.** A view that shows many cards (the draft board's players, or a
   team's roster) and lets the user sort/filter them. It must reuse the board's existing sort
   and the engine's view-models — do not invent a second data path.
3. **The share/export.** A way to get a card out of the app (PNG download, or a copyable share
   text, or both). It must work offline. Name the format and the method in the README.
4. **The probe.** Extend the probe (or add a slice-5 probe) to assert: the card renders for a
   known player with the correct name/team/position/OVR/Wins/Priority; the dynamic element
   changes when the underlying value changes; the interaction works (flip/toggle/compare);
   the export produces a file (or text) with the player's name in it; and the gallery renders
   without horizontal scroll at 390px. The probe is the receipt that the slice works — a slice
   without a probe is not done (see F.1).

**Evaluation bar (Owner, Part B.7):** the cards are judged by their potential to be executed,
improved, and made more dynamic / beautiful / interactive than w89 — not by whether they
reproduce w89. In your delivery README, say plainly: what is more dynamic than w89's cards,
what is more beautiful, what is more interactive — and what you would do next if you had another
sitting.

**Innovation (do not skip this):** the player card is the most shareable surface in the product
— it is what a user shows a friend. Brainstorm what a card could be that w89 never attempted:
a card that tells a story (the player's season arc), a card that compares (this player vs the
player you passed on), a card that is alive during a game (updating as the game is simulated).
Pick one idea beyond the four items above, build it or prototype it, and say what it would take
to ship it.

---

## Part E · The season sim / playoffs / awards (end-to-end evaluation)

The Owner's direction (Part B.7) is that the framework is evaluated from the user's start-to-end
process completely. The season sim is the end of that process — draft, then play a season, then
playoffs, then awards. If the framework blocks any of it, that is a reason to close the
framework question faster. So: prototype it, in both arms, and measure whether the framework
helps or hinders.

1. **Design first (one page, in the delivery README):** what is the season sim, as the user
   experiences it? The screens (standings, schedule, results, playoffs bracket, awards), the
   state the engine must provide (which view-models, which store keys), and the interactions
   (advance a week, simulate a game, view a box score). Do not build the whole season in this
   sitting — design it, then build the smallest vertical slice that proves the framework can do
   it: **one screen** (pick standings or the playoff bracket — whichever exercises the framework
   hardest: a table that updates as results come in, with sorting and a detail view) in BOTH
   arms, with the same timing protocol as C.3 (time to green, errors, workaround lines).
2. **The framework question for the season:** does the season sim change the framework
   comparison? Name the specific framework capability the season needs that the draft board did
   not (e.g. a large updating table, a bracket layout, a long list with virtual scrolling, a
   state machine with many screens). Measure whether either arm struggles with it — build
   failures, workaround lines, or a capability that is missing. If neither arm struggles, say
   so: that is a finding (the framework does not block the season).
3. **The data question:** the season needs the engine to simulate games and produce standings /
   awards. The engine (Claude's) does not yet expose all of it. Name exactly which view-models
   or store keys are missing for the season sim, and file that list as `season-missing-vms.txt`
   — it is a precise ask for the Architect, not a complaint. Do not invent engine data to fill
   the gap; use the frozen snapshot's real view-models and say what is absent.

---

## Part F · Owed fixes, measurements, and definitions

### F.1 · Propose "done" for a slice

The Owner does not know what "done" means for a slice; the council must agree it. Propose a
definition, in `SLICE-DONE-PROPOSAL.md` in the delivery. It should cover: what is built, what
is measured, what receipts are required (probe, checksums, type-check, bundle), what "reviewed"
means for it, and what would make it NOT done. Keep it short enough to be adopted, specific
enough to be enforced. If you think "done" should differ by slice (a UI slice vs an engine
slice), say so and give both. This is your proposal, not a ruling — the council adopts or amends
it.

### F.2 · The OT clock defect — verify the fix at the next re-pin

The Owner has ruled: **FIX** at the next re-pin. The defect is in the engine snapshot:
`app/feed.ts` `clock()` is broken for overtime (verified at feed.ts l.59-60). The fix lands in
the Architect's engine; you do not edit the engine.

- Your part: **at the next re-pin** (when the pin moves from `d3bd81d2`), re-pin your arms to
  the fixed snapshot, verify `feed.ts` `clock()` OT branch, and re-run the feed probe. File the
  verification as `receipts/ot-clock-fix-verified.txt` (the pin, the file lines, the probe
  result).
- **If the pin has not moved by the time you finish this sitting,** do not wait for it. File
  `receipts/ot-clock-fix-PENDING.txt` stating the pin is still `d3bd81d2`, the defect is still
  present in the snapshot you vendored, and the verification will be run at the next re-pin.
  Do not claim the fix is verified when the pin has not moved.

### F.3 · The two de-gated tests — note them, do not touch them

The suite you run against is **318/320 with 2 de-gated** (`versions.test.ts` — the E5 stamp pin;
`lineup.test.ts` — DL5-pin staleness). The Owner has ruled FIX THEM (R-11) and the fix is the
Architect's. The Owner wants the explanation first (rewrite-as-structural vs delete) — that
explanation is the council's job, not yours.

- Your part: in your delivery README, note the two de-gated tests by name, what each asserts,
  and that you did not touch them. If a test you run fails because of one of them, say so
  explicitly (do not silently exclude it, and do not "fix" it by editing the engine or the test
  expectation — that is the Architect's call).

### F.4 · Week-save hydration in the saves panel

Your four-slice sitting's saves panel is DRAFT-only — week/season envelope kinds are refused
with their kind named rather than hydrated, because hydration lives in the Cakepanz tree, not
the arms. Close that gap: add a week-save hydration path to the saves panel in BOTH arms, so
the arms match the Cakepanz tree's full envelope surface. Receipt: the probe asserts a week
save hydrates (or, if the envelope kind cannot be hydrated from the frozen snapshot's real
view-models, file exactly which view-model is missing and why — do not invent data).

### F.5 · Normalize the stale slice manifests

Glyph's catch (verified): the two older slice manifests carry a prose header (9 lines improperly
formatted); `CHECKSUMS-slice3-slice4.txt` does not. The hashes all pass; only the format is
stale. Normalize the format of every CHECKSUMS file you ship in this delivery so that
`sha256sum -c` verifies them cleanly (no "improperly formatted" warnings). Receipt: the
`sha256sum -c` output for every CHECKSUMS file in the delivery, with zero warnings.

### F.6 · The four-slice cold load (if C.2 did not already cover it)

C.2 runs the cold-load protocol on the four-slice dists. If you ran it there, do not re-run it
here — cross-reference the receipt. If you could not run it in C.2 (blocked, time-boxed), run
it here and file the receipt. Either way, the delivery must contain exactly one cold-load
receipt for the four-slice build, not zero and not two conflicting ones.

### F.7 · The devtools battery (if C.5 did not already cover it)

Same rule as F.6: C.5 is where the devtools battery lives. If you ran it, cross-reference. If
you could not run it, file the NOT-RUN note with the exact requirements. Do not leave the
devtools question unaddressed in either place.

---

## Part G · Innovation (do not skip this)

This sitting has a lot of assigned work. It also has room for your own thinking — and the Owner
explicitly wants it. Pick at least TWO of these, develop them properly (mechanism, evidence,
what would prove you wrong), and file them as `INNOVATION.md` in the delivery:

1. **The player card, re-imagined.** Part D asks for one idea beyond the four items. Make it
   your best one. What would make a user show a card to a friend unprompted?
2. **The season sim, re-imagined.** Part E asks for a design. What would make a simulated season
   feel alive — not a table of results, but something the user checks every morning?
3. **The framework, re-imagined.** If you could change one thing about how EITHER framework
   works for this product — a compiler feature, a devtools feature, a Vite feature — what would
   it be, and what would it unlock? (This is a wish-list for the framework authors, not a
   complaint. Name the concrete capability.)
4. **The authoring measurement, re-imagined.** Part C measures authoring cost with time, errors,
   and lines. Is there a better measure — one that captures "will the next agent get this right"?
   Propose it, and if it is cheap, run it.
5. **What else is static?** The Owner's question: is there something else like the 0.20-vs-0.40
   binary that assumed a static situation instead of a fluctuating one? Name it, name the
   mechanism, name the test. (Your Q3/Q4 findings — the compiler-forced idiom, the store file —
   are candidates: is the framework choice itself a static assumption? What would make it
   dynamic — a shell that can be re-skinned per sport?)
6. **The platform concept.** The Owner's formulation: the core is not just a multisport
   simulation but a platform to design your own simulation, starting with sports but potentially
   anything with similar attributes. What is the smallest version of that worth building first,
   and what would it need from the UI shell you are building?

Do not list six shallow ideas. Develop two properly. A developed idea has a mechanism, a reason
it matters to the user, and a test that would prove it wrong.

---

## Bounds (binding — do not violate these)

- **Batch rule (standing, Owner):** complete ALL work before responding. You cannot push, so
  every response costs the Owner a publish step. Work as much as possible before responding and
  batch every completed piece into a single zip. If a piece is blocked, say so and explain the
  blocker — that is the only reason to respond with work outstanding. **CHECKSUMS.txt must label
  the algorithm as sha256.** One zip, one CHECKSUMS.txt, every file listed, every hash verifiable
  on the pushed bytes.
- **Push often does not apply to you** (you cannot push) — the batch rule is your version of it.
  The council seats push after every file; you batch everything into one zip at the end.
- **Engine pin: `d3bd81d2`** (Owner, R-2, 2026-11-15). Consume the engine as a frozen snapshot.
  Neither builder edits the other's tree. Do not edit `colors/src`, `flex.json`, or `flex.ts`.
  Read-only on the engine. If the pin moves during your sitting, say so and re-pin explicitly.
- **Framework: two arms — Vue 3 + Vite vs Svelte 5 + Vite** (Owner, R-13). You build the same
  slice in both. Measurement decides, not the seat. Do not present a framework as decided.
  React is out of the test and its dependency is to be removed (Owner, R-9) — do not add React
  to either arm.
- **λ / dial: ACCEPTED as designed** (Owner, R-6). One scale, varying by context, inside the
  narrow band, each context rule must beat fixed-λ on held-out seasons. No further Owner
  decision on λ's value. The open work is the estimator — your C.6/C.7 do not re-decide λ.
- **Save: one blob + version check** (Owner, R-3). `SaveRecord {version, seed, userTeam, pool,
  picks, awards, user}`. Do not build the chunked envelope (Claude's §3.7 is superseded).
- **Title Odds: rejected** except in a 100-season context (Owner, R-5). Do not put it in a draft
  header or recap.
- **Players copy: 1,953** pool total (Owner, R-12). 1,921 only if labelled with the 32 long
  snappers excluded. Do not show 1,921 unlabelled as "players."
- **Ratings: NOT YET** (Owner, R-8). The Owner generates ratings himself, later. Do not work on
  ratings.
- **Flex: 99 rules.** FB>RB 2, FB>TE 6, C>OG 6 both spots. Flex values stay CONSISTENT all year
  (Owner, 2026-11-11). No gates, no floor, no slight/real/heavy labels, no named exceptions, no
  pair tables. The 99 is a guide, not a target.
- **User sees ONLY Wins, Priority, OVR** (Owner, 2026-11-11). No λ, no slotWins, no internal
  values on any user-facing surface. Consistency is mandatory.
- **No injuries in any sport, ever.** Form fluctuates OVR by ~5–6, shown as a simple GREEN arrow
  (hot) / RED arrow (cold). No emojis, no "HOT"/"cold" text labels.
- **Focus re-ranks Priority (the draft board) AND affects the game; it changes NONE of the
  static values, including Wins.** Focus is chosen pre-game and once at halftime; AUTO is the
  default.
- **Basketball: design-only until football is done.** Do not build it.
- **Wasted-capability term/tax: do NOT promote or broadcast it** (Owner directive). Do not use
  it in any user-facing surface or in your delivery's framing.
- **The 1,921 board gap is UNKNOWN.** 1,941 + 12 = 1,953 = poolCount is verified; the 32-row gap
  to the board's 1,921 is unexplained (Claude is writing a pool ledger). Do not assert an
  explanation for it.
- **Live site is w85, not w89.** A wave is only "live" when index.html is replaced with it.
- **Labels:** VERIFIED (you ran it, the receipt is in the text) · REPORTED (someone else says
  so) · INFERRED (reasoned, not run) · UNKNOWN. Do not present a recommendation as a decision.
  Do not present a measurement you did not run as VERIFIED.
- **If you disagree with anything in this prompt,** say so with evidence. The Owner explicitly
  invites pushback. A disagreement with a receipt is more useful than a silent compliance.
