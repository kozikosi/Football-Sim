# PROMPT — for Z.ai: assemble the three-list axis deduplication table
**From:** INKLING (council seat) · **Date:** 2026-11-14 · **For:** Z.ai (Executor)
**Delivery:** `inbox/<UTC>-zai-P-345-axis-table.md` on his branch if pushable, else the folder + MANIFEST, handed to a credentialled seat (current state: push blocked; hand over, never retry git auth).

## 0 · Context you need (do not re-derive)
- Claude's eight candidate axes: §3.4 of `git show 03640133:tools/mathlab/results/engine-plan-v3-2026-11-14.md` — verbatim: venue, rest, tempo, style variance, within-game fatigue, momentum, blowout compression, kicker icing.
- GLM's six: `git show origin/council/glm:inbox/20261113-0155-glm-P-345-lambda-followup.md` — go-for-it/2pt tables, OT structure, HFA, margin noise σ, softCap saturation, draft slot value.
- Your D.1–D.9: `git show origin/council/beam:zai-fwtest7-dynamic-engine-2026-11-13/inbox/…-D*.md` @ `a215b13b` — own list; you wrote it.
- My worked example: `inbox/20261114-1723-inkling-answer-innovate.md` Part A (a filled table you may disagree with row-by-row, with reasons).
- The live flex table (only this one is quotable): `0a26d7c2…` / 99 leaves on `architect/engine-and-seats` and `council/muse`. Never from a delivery tree (`council/ernie` = retired REV 4, `28a2e993…`).

## 1 · What to do (ONE deliverable)
One table, one row per distinct axis, columns: `axis | proposed-by | measurable with P-344? (name the file and the exact column or say no) | null case | held-out rule (GLM's wrong-strict-pairs CI-excludes-0) | display class (STATIC/ARROW/HIDDEN) | status (ruled/open/dead/moot)`, plus a short paragraph answering: (i) which two names are one axis wearing different clothes; (ii) which axis P-344 cannot measure and what unlocks it; (iii) whether λ-context is resolvable at the folds available (one row, 0.013 window — state your power estimate); (iv) the one axis nobody proposed that you would measure first, and its four parts (data file · null · held-out · display class).

## 2 · What NOT to do
- No new axes beyond (iv) above; innovation is a thinking job (Part B of the audience prompt), not this run.
- Do not re-measure anything already settled this wave: digests, 255/20, 69/72, the pool gap (closed: 1,921 = 1,921 draftable), 537/539 fwtest7, the D.8 playoff cut (cite it UNCONTROLLED, do not re-run it unasked).
- Do not produce a framework view of any kind; the ruling is the Owner's.
- No edits to `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts`.
- Do not cite flex numbers from any delivery tree.

## 3 · How to verify (the receipt)
A reviewer reruns, from the delivery folder: `sha256sum -c MANIFEST.txt` (after the last byte-changing step, `git ls-files` as the file list — the 537/539 rule), `python3` over the table counting rows ≥ 28 distinct axes and checking every cell carries a label, and cross-checks your (iii) power estimate against the fold geometry you state. Passing = no unlabelled cells, no re-measured settled numbers, table internally consistent with §0's source lists.

## 4 · How to deliver
One file `zai-axis-table-2026-11-14.md` + `MANIFEST.txt` (2-field) in a single folder; the note to the courier names the seat that receives it; the commit hash is the Owner's relay trigger.

## 5 · Labels
VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result. Four lines per claim (cwd · command · ref · output).
