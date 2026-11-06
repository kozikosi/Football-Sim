# M6 — the stale-reference dispositions applied to the w74 docs (w76, 2026-11-06)

The Muse w76 item, executed: every 80/25/10 → 90/35/25 + P(20-0) ≈ 1–2 %; every statement of
the parity band as a target → "the real-NFL reference (3.07 ± 0.35) — the target is derived in
M5"; timeline.md line 33 carries the retargeted wording; every touched doc that cites a test
count states the basis in its header (288 = the full vitest suite (core + nfl + app); 286 = 288 − 2
storage-env-dependent tests skipped in the sandbox run; 284 = 286 − 2 golden-seasons tests still
warming = 288−2−2).

The tree below drops onto gh-pages at the same paths (w74/…). `w74-m6.patch` is the unified diff
against the current gh-pages bytes. History artifacts are untouched — `results/b-top30-*.json`
keep their filenames and bytes.

Edits applied (27):

- CAL/header — `**Owner target (5 Nov 2026, verbatim ruling):** for a user consi`
- CAL/reading-note — `**Reading note (flagged):** "25 % Super Bowl" is read as *reachi`
- CAL/policy-role — `The policy the 80/25/10 target applies to.`
- CAL/bands-row — `| top30 | **80 % ± 5 pp** | **25 % ± 5 pp** | **10 % ± 3 pp** | `
- CAL/instrument — `**The measuring-instrument constraint (GLM's, adopted):** a rate`
- CAL/ladder-rule — `Decision rule: pick the rung whose top30 playoffs/SB/title land `
- CAL/verdict — `The lever cannot reach 80/25/10; **no parameter value is propose`
- CAL/parity-ref — `its own finding is that the CPU-draft lever does not move parity`
- FIND/headline — `spread cannot reach 80/25/10, and the gap is a draft-quality gap`
- FIND/parity-ref — `win-SD 2.17–2.23 in every arm — below the 3.0–3.5 band; the leag`
- FIND/gap — `is 29.2 pp short of the target.`
- FIND/draft-quality — `The Owner's 80/25/10 for top-30 pickers therefore`
- FIND/parity-cost — `also does not move parity (win-SD ~2.17 at every rung vs the 3.0`
- TL/line33 — `| 2026-11-06 | Owner decides: real names · Svelte confirmed · to`
- TL/count-basis — `(Executor waves w52–w55 ship single-file product builds on the s`
- ROOT/paragraph — `but the proposed CPU-draft lever is FLAT and cannot reach the Ow`
- ROOT/ruling2 — `decides whether 80/25/10 is a policy reading or an engine-tuning`
- ROOT/count-basis — `**Delivery:** files and zips only — nothing lands without Kosi's`
- LAB/headline — `— the CPU-draft spread cannot reach 80/25/10; no parameter value`
- LAB/chart — `the Owner's 80/25/10 rungs over the top-30 group, the +31.5 pp g`
- REV01/answers — `Kosi's three decided answers (real names · Svelte · 80/25/10), a`
- REV01/count-basis — `**Applies to:** branch `architect/engine-and-seats` (verified at`
- N1/count-basis — `**Applies to:** the fresh public repo at cutover — paths `docs/c`
- CT/count-basis — `**Applies to:** branch `architect/engine-and-seats` at `425f72a``
- VM/count-basis — `This is the **pattern-freeze forcing function**: every place the`
- CI/count-basis — `**What this is:** every gate from the brief, built and RUN in th`
- PR/count-basis — `**Applies to:** the repo's docs/contract layer at `425f72a` (+ ``

Out of scope this pass (flagged, not applied):
- The M1 policy relabels (top30 → skilled in the POLICY table; greedy is best-value, not "naive
  best-OVR") — the w75 answers doc carries that ruling; Muse's w76 M6 list did not include it.
  One line of the next Lab pass applies it.
- The generated artifacts (calibration-curve.png/.svg, results/*.json) keep their bytes; the 03
  README now says the chart draws the 5-Nov bands while the retargeted rungs are 90/35/25.
