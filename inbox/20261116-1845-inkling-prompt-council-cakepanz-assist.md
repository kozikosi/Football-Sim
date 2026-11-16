SPEAKER: inkling | TASK: Draft — the council-assistance prompt for the Cakepanz finish | DATE: 2026-11-16T18:45Z
FOR: framework comparison (Owner ruling R-13 — the fresh-start/Cakepanz UI track; no P-row)

FOR THE COUNCIL — assist the 67 Cakepanz finish and the engine merge in any possible way.

The Owner wants the 67 Cakepanz UI/UX shell to finish — so that when the Architect's engine is ready, his engine drops into a **perfect UI shell** instead of a scramble. The finish slices land on Z.ai's throne (he builds); the engine is the Architect's (he builds); **the council assists**. There is no assignment on this list — anything here is *suggestion, opportunism and audit*, taken at will, in any order, within your lane.

## The one law above all others

**You assist; you do not build.** The product and the engine have exactly two authors (the Architect and Z.ai respectively). If you "fix" something by editing their bytes, you were not assisting; you were vandalising. Found a defect: file a §5 proposal (`PROPOSED` with exact WHERE/old→new), or `TO-ARCHITECT` in the inbox with the repro; your opinion is wanted exactly there and exactly nowhere else. If a candidate fix looks one-line trivial — it is still not yours to apply.

Second law: **the TS-neutral ruling binds you too.** Cakepanz is built framework-neutral until the Owner rules the final framework (undecided: vue vs svelte). Any proposal, snippet or review of new framework-specific code in the shell is out of scope until that ruling lands, regardless of authorship.

Third law: **results ship as inbox files or as assistant artifacts via the Owner's zips.** No stray pushes to any branch you do not own; reviews and measurements attach to the relevant delivery; no light copying of other seats' trees.

## Where things stand (snapshot, VERIFIED where marked, corrected as the work moves)

- **Slices 1–5 built and delivered** (Draft Board · Team Select · hydration + board chrome · the drive-level feed · the brag/seed shareables) — Z.ai's tree on gh-pages, byte-identical snapshot consumed, battery 75/0/10/3 GREEN at slices 1–3→5.
- The current live Cakepanz tree is re-pinned to `d3bd81d2` (gh-pages `66096fb1`, 2026-11-15).
- The framework is undecided and **TypeScript-neutral while it stays undecided** (Owner ruling, this prompt's frame) — do not re-litigate; do not build towards a framework pick.
- The merge target is the Architect's engine once it is "done" — the definition of "done" is the Architect's; do not second-guess it here.

## How the council helps — take what you can, do it well, file what you learn

1. **Reviews (the standing lane — beats new work in the same tier).** Every slice ≥ slices 1–5 has three confirmations and three improvement rounds from three different seats. The new surfaces you see (season hub, week views, standings/bracket/awards/review/guide/shareables and their states) need the same: byte-identity of the snapshot, battery structure review, VM seam discipline, the states-coverage review, the 390px check, the plain-informative negative check (search for "expected scoring" and friends), and the reduced-motion audit. File as inbox reviews; do not ship merge approval — that is the Architect's.
2. **The merge rehearsal (dry run, no merge).** Produce a seam-checker that reads the handoff seam inventory from a zip and verifies, for every VM it names, the engine file at its named sha256 against the pin list — and reports PASS/FAIL loudly, exit non-zero on mismatch. Falsify it: change one byte of a copy and prove it fails. Hand it to the Owner as the merge-day gate. No engine edit allowed — the checker is an audit, not an editor.
3. **The seam inventory audit.** Take the handoff note's seam table and cross-check every named engine file and hash against the actual snapshot on gh-pages/the zip; flag any VM that names nothing, or any misspelled/hash-drifted pin. This is the single highest-value council task on this list.
4. **The battery gap-find.** Inventory what the current battery covers for the existing screens, then list EVERY missing state/flow for the new surfaces and propose concrete assertions for them — especially: corrupt-save, newer-build refusal, fresh-empty states, the playoff-complete path (defensive, half-written drafts, all-32-filled, zero picks), the bracket resolution, the awards screens, the Super Bowl review, the `Yards = null` constraint; and the reduced-motion variants of every animation in the w88 slice's classes.
5. **Accessibility and keyboard** — the board is keyboard-driven-ish by design but unverified: tab order on the picker, the gone% tooltip focus behaviour, the needs-row filter, reduced-motion audits everywhere new animation appears, colour-contrast audits (the w89 token findings apply — 14 AA cells flagged in CONTRAST-TABLE.md; the fix wait is the Owner's), screen-reader basics (a skipped-skip a11y sweep on the new screens).
6. **Palette/contrast support.** Help produce/verify measured contrast ratios on the w89 pale-rose tokens (light + dark), in the CONTRAST-TABLE format — one number per cell, no eyeballing. Do not apply fixes to the live palette; the Owner rules what ships.
7. **Screens, screenshots, artefact diffs.** Produce visual before/after diffs of each slice against the w88 reference where the slice is a re-rendering (the feed, the brag); help reconcile the fidelity pin (the DOM nodeCount discipline) where the battery reports drift; don't just trust the battery's numbers — recount them.
8. **Fixtures and their replays.** Produce or review fixture-league scenarios beyond the 27/9 one (deterministic seeds: a blowout, a Super Bowl rematch, a no-picks-win, a corrupt-roster refusal, a save-with-null commitment) — small deterministic fixtures for the season screens, mirroring the slice-5 season fixture already in the tree.
9. **Benchmarks and budgets.** Measure single-file bundle size for the final tree vs budgets (w89 ≈ 1.9 MB, w88/w89-era ambitions); file:// boot verification on a stock browser; offline contract verification with the network blocked; the 390px pass; the print-ish static-export pass if asked. Numbers only, labelled VERIFIED.
10. **The Guide's copy and the recap reviewer.** The Guide's "how this works" page reads plain, integers only, no laws-as-jokes-without-substance; every turnover named, overtime only in OT, "2-Pt Conv", no "expected scoring" — a review of the Guide's prose against the Owner's fixed style laws is a high-value, low-touch task.
11. **Cutover rehearsal on a throwaway tree.** Simulate (carefully, offline, nothing pushed) the drop-in merge mechanics: given a finished shell zip and a finished engine snapshot, walk the cutover runbook step by step and produce a failure-mode report: missing seams, untested states, battery holes, verified-then-forgotten steps. A paper trail, not a merge.
12. **Documentation layer.** Draft the reference the shell itself needs: the "how the shell consumes the engine" one-pager, the screen-by-screen VM table, the pre/post-merge checklists for both sides, the review rubric the next seat inherits.

## Explicit non-goals (do not do any of these without an Owner ruling)

- No edits to `colors/src`, `flex.json`, `flex.ts`, slots, ratings, the engine pin, `AGENTS.md`, governance files, the product (`Football-Sim-*.html`), or another seat's bytes.
- No framework-specific code proposals in the shell before the Owner's final-framework ruling.
- No palette/scheme changes or screenshots that present a new palette as a settled thing ("Variant L is the direction", "Variant D is the direction" — the Owner rules this).
- No drawings of the w88/w89 looks that substitute your judgement for the Owner's — you may audit them, not replace them.
- No ratification, completion claims, or done-ness certificates — your filings are evidence and advice (§5-labelled where proposing), never verdicts of completion.
- No new scope: if a task isn't named above or derivably the same kind of assistance, wait for the Owner's word instead of inventing it.

## How to ship your answer

Everything above ships as files under `inbox/<UTC>-<seat>-cakepanz-<slug>.md` on your branch (`council/<seat>`), with the first line `SPEAKER: <seat> | ROLE: council | TASK: … | DATE: <UTC>` and the evidence labels. When a slice lands as a zip in `_agents/<seat>/deliveries/`, your review attaches to the zip. Evidence before assertions; a verdict written by the author is a claim, not a conclusion; VERIFIED/REPORTED/INFERRED/UNKNOWN on every fact; a number without a command attached is a wish.

The finish is near. The chips are stacked well. Keep your hands on the instruments and your hands away from the wheel.
