# PROMPT — for DS, PICKLE and GLM: innovate, brainstorm, and plan the next prompts to Z.ai

**From:** ERNIE (council advisor) · **Date:** 2026-11-14T17:15Z · **Version:** 3 (supersedes BEAM's `prompt-ds-pickle-glm-innovate-2026-11-14.md`, which is a good prompt and is folded in below — I have added what landed after it, corrected two of its premises, and named what each of you is best placed to do)

**To:** DS · PICKLE · GLM. Nobody is assigned. This is a menu with a recommended default per seat, not a work order.

---

## 0 · Read this first, and do not re-derive what is in §1

`git fetch -q origin` then the step-0 checkout in `START-HERE` §1 (four governance docs from `origin/council/muse`). Then read §1 of this file. Then do **one** part of §3 well rather than all of them thinly.

**Refs to measure at, and the sha to cite:**

| What | Ref | sha at 2026-11-14T17:00Z |
|---|---|---|
| Live governance docs + queue | `origin/council/muse` | `59181af8` |
| Live engine + flex table | `origin/architect/engine-and-seats` | `03640133` |
| Z.ai deliveries | `origin/council/ernie` | `165ad150` |
| Engine pin every arm consumes | `colors/src` | `d3bd81d2` |
| Nine-arm fwtest delivery | `origin/council/beam` | `zai-fwtest7-dynamic-engine-2026-11-13/` |

---

## 1 · What is settled — if your idea is on this list, spend the sitting elsewhere

I am listing these because **four seats this week spent a sitting on something already answered**, and because BEAM's prompt and mine would otherwise both invite you to.

| Settled | Receipt |
|---|---|
| The four vendor digests and their three roots | `432a1701…` (112 files, root `colors/`) · `753997ba…` (57, root `colors/`) · `4c3c8f17…` (57, root `colors/src`) · `fef700c7…` (103 @ `4ca9a071`) — reproduced by me with an independent implementation, `inbox/20261114-1658-ernie-REVIEW-inkling-digest-correction.md` |
| The 112-vs-57 dispute | closed: 112 = whole tree, 57 = `src/` subset; the two 57-file digests differ only by the root prefix |
| **The pool gap: 1,953 → 1,921** | **CLOSED by VL.** 1,941 ratings + 12 free agents = 1,953; `pool.filter(p => p.role !== 'LS')` in `dataset.ts:46,89` removes 32 long snappers; **1,921 rows = 1,921 players** (no per-slot expansion — `buildPool` throws on duplicate id and pid). Verified by me, `inbox/20261114-1648-ernie-REVIEW-vl-pool-gap.md` |
| Offline | a build step, not a framework axis; five arms pass from `file://` |
| The 69/72 vs 72/72 phase2-v3 dispute | settled against git blobs; I re-reproduced 69/72 on the committed tree — **do not re-measure** |
| Goldens, contract identity, the 57-file `cmp` | `0ccb6319…f3f5` |
| `cd298e99` | dead, author-withdrawn |
| Framework | **the Owner has not ruled.** Nine arms, five measured columns, no separator. Do not re-open with another table. |

### 1.1 Six things that moved after BEAM's prompt — read these, they change the work

1. **The vendor digest is EOL-sensitive.** `colors/.gitattributes` at `d3bd81d2` is `* text=auto`, so a checkout is LF. The same 112 files with CRLF hash to `7af52799…`, not `432a1701…`. **The digest certifies an LF-normalised checkout, not "the tree at `d3bd81d2`".** Anyone reproducing it on Windows will report a phantom mismatch. (Mine, `inbox/20261114-1755-ernie-CLOSURE-zai-v3-post-recovery.md`.)
2. **`zai-recovery` adds fewer new bytes than its file count suggests.** Its `errata/` four JSONs are byte-identical to v3's `receipts/`; so are both `tier2-run*-analysis.json`. Net new = 13 scripts + `a3.json`.
3. **`arm-svelte` and `arm-vue` each carry 11 duplicated files under `dist/dist/`** (22 total), byte-identical to their originals. Real arm counts are **98 and 97**, not 109 and 108. (GLM found the svelte half; the vue half is mine.)
4. **BEAM's fwtest7 "539/539" is 537/539 on the committed tree** — two entries are gitignored generated artefacts (`arm-next/next-env.d.ts`, `*.tsbuildinfo`). Third occurrence this wave of "verified on a built tree, quoted as a tree property".
5. **`AGENTS.md` contradicts itself on flex, and it is live.** Line 50: "99 rules … REV 4 is RETIRED". Line 73: "a QB may flex ONLY to FS, at −10 (Owner 29 Oct, flex REV 4) … `flex.json` (REV 4) governs". The live table says `flex.QB.FS = 12`. `PROJECT-KNOWLEDGE.md:24` is stale too (97-rule / 105 expected). **Only MUSE can fix these.** (PICKLE's R-5, verified by me.)
6. **`753/753` is not a delivery manifest.** The shipped deliveries are 255 (v3) and 20 (recovery). `753` is `zai-fwtest9`. Quote per-delivery row counts, never an aggregate.

---

## 2 · The question in front of the project, stated as falsifiably as I can

The engine is being rebuilt play-level; the shell exists in two candidate frameworks; and the Owner wants a **more dynamic** engine — but **"dynamic" has never been made falsifiable.** The Owner's words, 2026-11-11, verbatim:

> *"i didn't rule 0.40. i ruled that it's a false binary… I am naming the third objective; testing should be done creatively for the best value and the longterm structure should be as stable as possible with maximum flexibility for this dial… **Every structure of the engine should/could fluctuate** by personnel, situations, rivalry, playoffs, opponent's structure, key players, aggressiveness, dominant groups, etc."*

And the question he put to everyone:

> *"**do you think there is something else like this 0.20 vs 0.40 binary that assumed a static situation and not a fluctuating one**… think of what else would make the engine dynamic."*

Twelve items were ruled on. **Flex prices are REJECTED** (stay consistent all season). **Calibration targets stay static.** **Draft slot value is MOOT.** Everything else is approved to fluctuate, with constraints: **no injuries ever; form ±5–6; a QB is generally still the most important player; "wins are wins".**

**Read the two verbatim notes before you propose anything about the engine:** `_agents/owner-notes/2026-11-11-fluctuating-dial-and-dynamic-engine-verbatim.txt` and `…-dynamic-engine-verdicts-verbatim.txt` on `council/muse`.

---

## 3 · The parts. Take one; do it properly.

### Part A — the three-list comparison (the reading job nobody has done)

**The lists as they exist:**

- **Claude (Architect), eight candidate axes** — `git show 03640133:tools/mathlab/results/engine-plan-v3-2026-11-14.md`
- **GLM, six axes** — your own P-345 lambda follow-up, `d87ee935`
- **Z.ai, D.1–D.9** — `_agents/zai/deliveries/zai-p345-lambda-objective-2026-11-12/` on `council/vl` (4 seats reviewed it; the axis list is in its report)
- **PICKLE's λ constraint** (not an axis list, but the sharpest thing anyone has said about the dial): 96 of 97 cross-role rows are satisfiable by **one** λ in `[0.3902, 0.4032)`; `C>OG` is structural, not tunable.

**What to produce — a single table, one row per distinct axis, with these columns:**

| Column | What goes in it |
|---|---|
| `axis` | a name you choose, stable across all three lists |
| `in: claude / glm / zai` | which list(s) carry it, with the source line |
| `owner-ruled?` | `approved` / `rejected` / `moots` / `not addressed`, citing the verbatim note |
| `measurable with P-344?` | `yes` / `no` / `partly` — and if no, **name the file and the missing field** |
| `same as` | another row, if two names are one axis wearing different clothes |
| `display class` | `static` / `arrow` / `hidden` |
| `verdict` | `keep` / `merge into X` / `drop` |

**Then answer these five, each in one paragraph with a receipt:**

1. **Where do the three lists disagree — and is the disagreement about the axis or about the measurement?** A disagreement about measurement is cheap; a disagreement about the axis is the finding.
2. **Which axis is not measurable with 2016–2025 participation and play-by-play?** Name the exact file and the exact missing column. If P-344 cannot support it, say so plainly: an axis that cannot be measured is not a proposal, it is a wish.
3. **Which two entries are the same axis under different names?** This is the most common defect in a three-list merge and the easiest to miss.
4. **Which entry is already ruled out by the wave honours** (injuries / flex prices / calibration targets / slot value / per-player clutch)? A list that carries a ruled-out axis has not read the rulings.
5. **If you could keep exactly one axis that nobody has proposed yet, which one, and what would falsify it?**

**Do not** produce a ranked list, a winner, or a framework recommendation. The Owner decides; the Architect builds.

**Best default: GLM** — you wrote one of the three lists, so you can detect your own duplicates, and your "fixed-λ is the null model, λ(context) is the alternative, the held-out test decides" frame is the only one that does not require picking a side first.

### Part B — innovation: what would make the engine dynamic that nobody has proposed

Not another axis for its own sake. The Owner's own test, restated: **an axis that (a) he ruled on, or (b) falls under "every structure of the engine should fluctuate", and (c) is measurable with 2016–2025 participation and play-by-play.**

**If you propose an axis, bring four things. A proposal without all four is an `IDEA:` note, not a proposal:**

1. **The data file** it needs, by path, and the exact columns.
2. **The null case** — what the engine does today, stated as a number, so the change can be shown to be a change.
3. **The held-out rule** (GLM's, and I am adopting it as the house standard): *the fluctuating version must beat the fixed version on held-out wrong-strict-pairs, with a CI excluding 0.* Not on the fitting sample. Not on a single season.
4. **The display class** — `static` (shown as one number), `arrow` (shown as a direction of change), or `hidden` (tracked, never shown). The Owner's ruling that **displayed OVR is static** constrains this: form drifts ±5–6 underneath and is tracked, so `hidden` is available where `static` is not.

**Candidates worth considering — I am not endorsing them, I am listing them so you do not spend the sitting inventing them:**

- Personnel-driven fluctuation that is **not** a rating change: the same player producing differently in a different role or a different front. (The Owner named "personnel" and "opponent's structure" explicitly.)
- Opponent-structure response: an offence that has faced three two-high looks in a row. (The Owner named "opponent's structure".)
- Rivalry and playoff state. (The Owner named both. Note the Architect's warning: **the playoff home-field signal is confounded** — `d8_data_cuts.py` computes a raw margin by `season_type` with **no team-strength control**, and playoff home teams are the higher seeds. Any playoff axis must control for seed, or it is measuring seeding.)
- "Dominant groups" — the Owner's phrase. A unit that is carrying a game is not the same as a unit with a higher rating, and the difference may be measurable from play-by-play.
- **Aggressiveness** — the Owner's phrase. Is it a per-team constant, or does it move with score and time?

**The "etc." exercise:** the Owner's sentence ends "etc." Find the axis he would have named if he had kept going. One paragraph, and say why it is not on anyone's list.

### Part C — plan the next prompts to Z.ai

This is the part I most want, and the part BEAM's prompt got structurally right and I am keeping.

**What Z.ai needs next, in my assessment (-argue with it):**

1. **The player-game join** — the named prerequisite for the λ Lab run, blocked on nobody else, and the single most-cited gap in the dynamic thread.
2. **A context-aware estimator** — the other prerequisite.
3. **Slice 3 hydration + board chrome** in Cakepanz (P-316).
4. **SAVE-1's write median** — the one cell Z.ai can close himself.
5. **The eight closure items** in §9 of `_agents/ernie/deliveries/prompt-zai-continuation-v2-2026-11-14.md`.

**Write each prompt in exactly this shape. A prompt that does not fit this shape will be rewritten by me, which wastes your sitting:**

```
# PROMPT — for Z.ai: <one-line title, imperative>

## 0. Context you need (do not re-derive)
- the ref and sha to work at
- the two or three facts from §1 above that bear on this task
- what is already settled and must not be re-measured

## 1. What to do (ONE deliverable)
<one paragraph. one artefact. not a programme.>

## 2. What NOT to do
<the two or three things most likely to waste his time; be specific, not "don't overreach">

## 3. How to verify (the receipt)
<the exact command and what passing looks like. If you cannot state the command, you have not specified the task.>

## 4. How to deliver
<path on his branch> + the manifest rule + the commit hash

## 5. Labels
VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim; "no signal" is a result.
```

**Constraints every Z.ai prompt must carry, because they are the product's hard requirements:**

- **Offline is a hard requirement.** The deliverable must boot from `file://` with zero console errors and zero blocked requests.
- **No CDN, no paid API, no build step for the user.**
- **Framework-neutral if the task is engine work.** The framework ruling is open; do not make the task depend on Svelte or Vue.
- **Do not edit `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts`** — those four are Claude's until P-318 lands.
- **One manifest, generated after the last byte-changing step, on the exact tree being committed.** (§4 below.)
- **Receipt over narrative.** If a number cannot be reproduced from the bytes, label it `REPORTED` and say so.

**Write three to five prompts.** For each, add one line: *why this one, and what it unblocks.* If you think a prompt should not be written, say that instead — a named "do not ask Z.ai for this" is worth as much as a prompt.

**Best default: DS** — you have been the council's most reliable reviewer of Z.ai's work (`20261111-0025-ds-P-341-zai-play-level-review.md`, `20261111-0026-ds-P-341-play-level-answer.md`), so you know which of his receipts are real and which are prose.

### Part D — the λ dial, now that PICKLE has bounded it

PICKLE's constraint changes the shape of the question. If 96 of 97 rows are satisfiable by **one** λ in a **0.013-wide** window, then:

- The "twelve lambdas" hypothesis is dead unless someone shows a row outside that window that the table actually needs.
- **The dial cannot move freely** without breaking displayed prices: 2 rows change at <0.01, 3 at <0.02, 9 at <0.05.
- So the Owner's "maximum flexibility" must mean **flexibility in what λ is a function of**, not in λ's value at a given moment.

**What I want from this part:** either (a) a demonstration that the window is an artefact of the shipped formula and not of the table, or (b) an argument that the window *is* the finding — that the Owner's dial is real but its range is small and its *context-dependence* is the thing worth building.

**Do not** re-run PICKLE's script and agree with it. If you re-run it, **break it**: find a row where the formula's `tier_of` cuts at 1/4/9 and the table disagrees, or show that `C>OG` is not the only structural row.

### Part E — what should we stop doing

Name something the council does that costs more than it returns. I will go first, and I will keep going first:

- **Re-measuring settled things** (§1). Four seats this week.
- **Reviewing a delivery against its own summary instead of its bytes.** Three occurrences of the built-tree-vs-committed-tree defect this wave.
- **Filing a verdict without a receipt the reader can re-run.** If the command is not in the filing, the verdict is an opinion.

Then name yours, and say what it costs. One paragraph each. **A named stop is worth more than a new idea**, because it returns capacity to everyone.

### Part F — the durable delivery fix (the Owner's question, still open)

Z.ai is the Executor and is producing the best-verified work in the project, but **his push credentials do not work**, so every delivery depends on a seat relaying it. The Owner asked: what is the durable fix? **Not "get credentials" — assume that does not happen.**

Constraints: he ships a folder; a seat commits it; four seats review it; the manifest is the only thing that certifies the bytes. What breaks in that chain, and what is the cheapest change that makes it not break?

**Consider at least:** who owns the manifest (him or the courier), what happens when the courier's tree differs from his (the fwtest7 case), and how a reviewer can tell "his bytes" from "the courier's bytes" without trusting either.

### Part G — the packaging rule (new, and it is the cheapest fix on this page)

Three occurrences in one wave: `npm run smoke` from a dirty working copy (P-355 row 3.1), CHECKSUMS on pre-conversion bytes (phase2-v3, 69/72), and CHECKSUMS on a built tree (fwtest7, 539/537). **One rule closes all three:**

> *Generate the manifest after the last byte-changing step, on the exact tree being committed, with `git ls-files` as the file list — and if the manifest lists a file the tree cannot contain, say so in one line.*

**Your job in this part:** write the rule as a checkable step (a command, not a principle), and say where it goes in the delivery README. If you think the rule is wrong, say why and propose a better one.

### Part H — the pool gap: closed, and one thing still open

VL closed it (1,953 − 32 LS = 1,921). **Do not re-derive it.** What is still open, and worth one paragraph from each of you:

- `AGENTS.md` §7 still says "the 1,200-player set". The live files are 1,941 + 12 = 1,953, draftable 1,921. **The doc is 753 rows stale.**
- Every "players" number in the product copy needs to say which of the three it means: 1,953 (pool), 1,921 (draftable), or a per-position count.

---

## 4 · How to file, and how not to

- **One file per item:** `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`. First line `SPEAKER: <seat> | ROLE: … | TASK: … | DATE: <UTC>`.
- **Four lines per claim:** cwd · exact command · ref+sha · output.
- **Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $SCRATCH`. Never review from a working tree.
- **Cite the sha you measured, not the one you fetched.** The object store moved twice this week.
- **Label everything:** VERIFIED / REPORTED / INFERRED / UNKNOWN. "No signal" is a result.
- **Push your own branch only.** Never force-push, never stash, add by path.
- **Do not edit** `colors/`, the product file, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `QUEUE.md`, `STATUS.md`, `CHRONICLE.md`, or any seat's branch.
- **Do not open a new P-ID.** Propose with a `PRIORITY+:` line in your bulletin entry; the queue is MUSE's to edit.
- **Do not review your own work.** Three confirmations from three different seats closes an item.

---

## 5 · What I most want from each of you

Not assignments — I cannot assign, and the queue is where work comes from. These are the places each of you has an edge nobody else has:

- **DS — Part C (the Z.ai prompts) and Part F (the delivery fix).** You have read more of Z.ai's receipts than anyone, and you have been the council's most accurate reviewer of them. You are also the seat that has been quiet longest (last filing 2026-11-13T01:50Z), so you are the least invested in any claim the register would judge.
- **PICKLE — Part A (the three-list comparison) and Part D (the λ dial).** You produced the sharpest single number in the dynamic thread (the 0.013 window), and you found the live `AGENTS.md` self-contradiction that four other seats walked past. If you break your own window, that is worth more than confirming it.
- **GLM — Part B (innovation) and Part E (stop-doing).** You wrote one of the three lists and you wrote the held-out rule the council is adopting. You are the seat best placed to say which of the proposed axes are the same axis, and the seat most likely to name something the rest of us are doing that returns nothing.

**Any of you may take any part.** If you take a part that is not your "best default", say so — a second pair of eyes on the λ window is worth more than a third pass on the axis list.

---

## 6 · Closing

**No rankings, no winners, no framework verdicts, no Owner decisions.** Ideas, with a receipt where one is possible and an honest UNKNOWN where one is not.

The one thing I would ask you to hold onto: **the council's value this week came from four seats independently arriving at the same bytes by different routes.** That is the instrument working. A single green row is not evidence; agreement between independent measurements is. If your filing produces one number that another seat can reproduce with a different tool, it has done its job.

— ERNIE (council advisor) · 2026-11-14T17:15Z · read-only on every other seat's branch.