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

---

# FEEL JOURNAL — the 2026-11-17 re-pin sitting · Z.ai · 67 Cakepanz

## What was easy
- **The three-path rule, once rehearsed.** The M3 rehearsal (snapshot-only swap) predicted the
  exact red set — formation gap ×4, flex-table equality, Owner D pins — before the real re-pin
  moved anything. Running the predicted failure first and then making it disappear by moving the
  paths together is the most satisfying receipt this tree has produced: the discipline PROVED
  itself, not just held.
- **The carried suite is the tip's own.** Copying `colors/test` verbatim and re-pointing paths
  means zero expectation edits were made by hand — the "update every carried expectation" work
  collapses into "adopt the Architect's suite", which is what the contract always meant.
- **The falsifier reconcile.** Beam said F2/F3 never died; Inkling said everything dies. Both
  were holding a true half: the DELIVERED wording said unfalsified, the re-anchored targets die.
  Re-running fresh settled it in one command — and the new F6 (the slot-check law) died on its
  first plant, which is how a law should be born.

## What fought me
- **`git archive` vs the partial clone.** The sandbox clone is blob:none; `git archive 5c808472
  colors/src` dies with a pathspec error that LOOKS like "the commit doesn't have that path". The
  worktree-checkout equivalent took three attempts to name (worktree --no-checkout + targeted
  checkout of exactly colors/src, colors/test, flex.json, data/packs). SNAPSHOT.md now teaches it.
- **The re-pointing regex.** The tip's suite imports the engine RELATIVELY (`../../src/…`) AND
  reads it through `new URL('../../src/…')` — my first sync pass caught only quoted imports, and
  the suite failed to LOAD in 70ms with no law name. The second pass caught the URLs; the third
  bug was my own entry-file generator stripping `.ts` (strip-types needs explicit extensions).
  Three bugs, all mine, all cheap — but each one cost a 75ms mystery-fail that LOOKED like a red
  suite. Lesson: a loader error and a law death must be distinguishable AT A GLANCE.
- **A four path, not three.** The carried suite reads `data/packs/*.json` — a fixture path the
  old tree never carried. It surfaced as ENOENT, twice (the 2016 pack is referenced literally;
  the 2023 pack comes through a template literal my grep missed). The three-path rule is now a
  four-path rule in SNAPSHOT.md, with the packs named.
- **My own stale receipt.** VERIFY §10 claimed `document` was out of src/lib — the delivered bytes
  carried two hits in port/tokens.ts. The split (bindings/tokensApply.ts) took five minutes; the
  uncomfortable part was that the false receipt had ridden through a review round uncaught. I
  named the correction in SHELL-STATUS rather than quietly fixing it.

## The framework question, this sitting's data point
- The whole re-pin — 67 engine files swapped under a 160-line seam, 45 suites re-pointed, the flex
  table moved — touched ZERO svelte files. The shell's framework surface was irrelevant to the
  sitting's entire job; the port layer did the work node-side. The one place I felt a framework's
  absence was the tooltip fix: revealing on `.cp-main:focus` instead of a nested tabindex is plain
  CSS, but wiring it through a component system's a11y linter is where Svelte EARNED its keep (the
  warning caught the defect; the fix was one attribute + one selector).
- Vue-readiness note (INFERRED, per R-13): what the Vue arm would reuse unchanged — the entire port
  layer (20 modules), the batteries' node laws (24), the engine snapshot and its carried suite, the
  gates, the falsifier tooling, CHECKSUMS/manifest. What it would replace — the 26 .svelte files,
  App.svelte's script glue, and now exactly THREE bindings modules (stores, shareDownload,
  tokensApply; the third is new this sitting). The bindings grew by one module and stayed trivial.

## What I would change next sitting
- **The swap-test tool should speak "LOAD failure vs law death"** — the reverse swap's red is a
  module-not-found, and the tool reports exit 1 with no diagnosis. A one-line classifier would
  make the receipt self-explanatory.
- **`sync_engine_tests.py` deserves a test of its own** — it is now a load-bearing re-pin step and
  its two failure modes (missed URL form, stripped extension) were my own bugs this sitting.

---

## 2026-11-17 · the portability + prepared-re-pin sitting

**What was easy.** The Part-D build itself: the parameter property lived in exactly one file and
the generator's guard rails (exactly-one-scan, byte-diff proof, stamp freshness) fell out of the
tree's own fail-loud habits. The swap tests ran first try in both directions — the M3 habit
paying for itself. The fresh-clone proof was the most satisfying receipt of the sitting: the D-1
defect Inkling reproduced is now impossible to reproduce.

**What fought me.** (1) The falsifier rewrite: my first fixed run reported FA/FC as TAUTOLOGY
while the case's own log contained the S5 FAIL — an anomaly I could not reconstruct
(theorised: the concurrent demo run cross-serving the fixed ports; possibly a Node buffering
artifact). I stopped theorising, added a verdict print, ran sequentially with per-process ports,
and got clean DIED receipts — the anomaly is documented as unresolved, and the port-isolation
hardening exists because of it. (2) A python one-liner truncated a scratch Saves.svelte
(`open(p,'w').write(t.split(a).join(...))` — evaluation order truncates before the AttributeError)
and sent me chasing a phantom N21 failure; the real F7 bug was my anchor matching only the first
of two call sites. (3) `makePack(body).hash` vs `packHash(body)` — hashing the pack WITH its own
stamped hash gives a different number; the carried suite's semantics (assert pack.hash) won.
(4) The probe's two environment lessons: the saves screen exists only once a draft record exists
(the router redirects), and a page reload drops the in-memory draft — navigate away and back.
(5) Editing acceptance-run.sh while it ran killed it with exit 127 — bash reads scripts
incrementally; never edit a running script. The re-run is clean.

**Plain TypeScript, one sitting later (the R-13 question, answered specifically).** Fastest to
build in plain TS: the save-service layer (savesApp.olderBuildNote is a 6-line pure function with
a node law and a falsifier in under an hour, no framework in sight); the falsifier/precompile
tooling (pure node, no DOM); the fixture script. Missed a framework: exactly twice — the Saves
panel tweak needed a `{$effect}`-track warning comment to avoid a refresh loop (a framework
store/effect discipline I had to hand-annotate), and the probe's screen routing (hash-redirect
rules) is implicit component state I had to probe empirically. Neither rises to a framework need.
The readiness note stands: a Vue arm would reuse everything under src/lib/port + bindings/'
replacements; the 26 .svelte files are the only re-bind.

**What I would change next sitting.** The swap-test LOAD-failure classifier (last sitting's
suggestion — implemented this sitting). sync_engine_tests.py still deserves a test of its own
(not built — named). The GLM-default state-bucket test Beam named remains un-run — it is the
Architect's + the Owner's path, not mine to start.
