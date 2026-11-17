# FEEL JOURNAL — the 2026-11-17 fix round · Z.ai · 67 Cakepanz

## What was easy
- The pin verification (one fetch, one diff, zero diff lines) and the gates work (regen + the new
  boot-target assertion) — the machinery the previous sittings left behind is good, and the D4 fix
  was a two-file edit with an immediate receipt.
- The falsifier suite pattern: once the per-mutation fresh copy + clean baseline structure was
  right, writing F4/F5 for the new laws was ten minutes, and watching N19 die under the zeroed
  gone% mutation was the single most satisfying output of the sitting.
- The D5 corrections and the README/gh-pages staging — mechanical, receipted, done.

## What fought me (the honest list)
1. **D2 was two defects wearing one name.** The review's fix (the record prop) was necessary and
   real, but after it landed S5 STILL failed — the real second layer was a binding race: the
   engine's framework-free store never calls a new subscriber back, so the shell's readables
   (asReadable/seasonReadable) that only SUBSCRIBED in their start function silently missed any
   LOAD/START that happened before the template's first read. I found it by probing the live store
   (state.done, record set, err null — and the template branch still not rendering). The fix is
   five lines in bindings/stores.ts and it is why EVERY season screen now renders.
2. **The delivered "S6..S28 PASS" was aspirational, and proving it cost the day.** The battery died
   at S5 on the delivered bytes (reproduced), and my first re-runs kept "passing" against STALE
   artifacts: a zombie vite preview from an earlier falsifier run holding the port (killing the npx
   wrapper orphans the vite child — the falsifier now kills the process GROUP and waits for HTTP
   200), and a throwaway battery run without the transform flag that crashed before any law (the
   falsifier now treats a crashed battery as an ERROR, never a survivor). Both traps are now in the
   tools, which is the only good place for them.
3. **The season screens were never really walked, and the run found four real defects the reviews
   had not named:** the `s.table` reads (three files) against a RunState field that does not exist,
   Share's missing `season` prop (a ReferenceError on every Share render), Book's `champIdx`
   (declared inside a derived, voided outside it), and the hub's missing CTA on no-game weeks —
   the season literally could not advance past the first bye week from the hub. Each fix was small;
   the SHAME is that slices 7–10 shipped with receipts that were never earned.
4. **The N19 envelope was a guess and the engine corrected me.** I asserted the top-of-board gone%
   ≥ 50 at slot 28; the measured answer is 3% (the CPU drafts needs-first, and the best player's
   POSITION was not in demand in that window). The law now carries envelopes set from measurement
   (probe-gone-dist.mjs) plus the independent replay cross-check — which is the part that actually
   kills the zeroed-board tautology.
5. **The swap test needed a repo hunt** (the delivery tree is not the clone) and the Architect tip's
   engine is 67 files, not 57 — the 6 failing carried goldens are the honest FAIL the tool should
   print, and it does.

## What I would change
- The acceptance run should be the FIRST thing a fix round writes, not the last: the acceptance-run
  script exists now, and every future sitting starts with `bash scripts/acceptance-run.sh` so a
  defect surfaces in minute one, not hour three.
- The hub CTA label lies while it works ("WATCH THE FEED" calls playWeek). The action is right; the
  label should say what the click does. One line next sitting — flagged here, not silently shipped.
- The battery should FAIL FAST on a stale artifact: it should print the served asset hash alongside
  the verdict. My confidence in the receipts this round came only after I started diffing served
  bytes against disk by hand. (Not added this sitting — named, not shipped; it changes a battery
  file the council is mid-verification on.)

## The framework question, answered from the work (FOR: R-13)
- **Fastest in plain TypeScript:** the whole fix round lived below the render layer — savesApp's
  isFinished, reviewVM's engine-table call, the season facade's resume path, the shareables' pure
  card builder, every node battery law (N19's independent replay is a raw engine loop). None of it
  touched a component; ALL of it ran under node; NONE of it will change at a framework cutover. The
  seam/port discipline paid for itself exactly once this round and once was enough.
- **Where I missed a framework:** the binding race. The reason the bug existed is that the shell
  bridges a framework-free observable (no call-on-subscribe) into svelte/store's contract — and the
  glue leaked in BOTH directions (the readable missed pushes; the template's lazily-subscribed
  deriveds made the timing nondeterministic). In Vue the `ref()` + a computed would have had the
  same trap; the honest statement is that ANY manual store-to-reactivity bridge has this class of
  bug, and the framework buys you nothing there — a tiny `onSubscribe` push fixes it forever in
  either. The OTHER place I missed a framework was browser-side debugging: the stale-preview
  detours would have been shorter with HMR's instant reload telling me the bytes were fresh. That
  is a tooling gap, not a framework gap.
- **Net feel:** the render layer is thin enough (26 files) that the framework pick really is a
  cutover-time detail. The seat of the work this round was the port layer, and it was
  framework-blind all day — which is the strongest data point I can offer R-13.

## Which of the five defects I would have shipped blind (the feedback loop)
- **D1 (restoreSeason)** — the review named it; I would NOT have shipped it blind, because the
  click-through of the season was the round's whole point... but I DID ship it once already (the
  delivered tree has the dangling identifier), so the honest answer is: I ALREADY shipped it blind.
  The review was right and the fix round exists because of that.
- **D2 (the record prop)** — I would have shipped the prop fix and called it done. The second layer
  (the binding race) was invisible to me until the battery ran for real — I would have shipped it
  blind even AFTER "fixing" D2, which is worse than shipping D2 itself.
- **D3 (dist assets)** — a packaging omission; I would have shipped it blind (the build was green;
  I never opened dist/).
- **D4 (the blind gates)** — I would have shipped it blind; a gate that passes feels like a gate.
- **D5 (titles/README)** — I would have shipped it blind; prose rot is invisible from inside a
  green battery.
- Net: four of five shipped blind, and the fifth (D1) already shipped blind once. The review round
  is not a formality — it caught every one.

## The 3-4 note (PROPOSED — the Owner rules the wording; NOT shipped as settled copy)
One line on Team Select when a 3-4 is chosen, in the Owner's plain-informative style:
  "A 3-4 turns linebacker depth into a starting spot and does not need a premium second tackle."
No number is printed to justify it; nothing is re-priced to make it true.
