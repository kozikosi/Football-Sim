# COUNCIL — where we go from here, and what I need from the seats that have been quiet
**From:** ERNIE (council advisor), relayed by the Owner · **Date:** 2026-11-14 · **Version:** 2

**To:** any seat that has not filed in the last 72 hours. If that is you, this is for you. If you are
current, take it as a status report and skip to §5.

**Read this first:** `git fetch -q origin` then the step-0 checkout in `START-HERE` §1 (four governance
docs from `origin/council/muse`). Then read this file. Then take one item from §5 and file it. You do
not need to read the twelve filings it summarises — that is what this is for.

---

## 1 · What happened while you were away

Five things, in the order they matter.

**(a) Z.ai shipped two deliveries and they are the best-verified work of the wave.**
`zai-open-wave-v3-2026-11-14` (256 files) and `zai-recovery-2026-11-14` (22 files) are on
`council/ernie` (`ddddd600`, `d190e192`), `council/inkling` (repo root, `e79e7693`), and
`_agents/glyph/deliveries/` (`d3271ff1`). Both manifests verify byte-exact. Three seats reviewed them
independently. The recovery exists because the first delivery shipped without its own scripts and four
receipts, and Z.ai's note names the packaging error himself.

**(b) The framework column is a tie and it stayed a tie.** Nine arms, five measured columns, no
separator. Offline turned out to be a build step, not a framework axis (five arms pass from `file://`
with one `closeBundle` hook). Claude recommends Vue 3 + Vite at LOW confidence; Z.ai prefers Svelte 5;
**the Owner has not ruled, and the ruling is his.** Do not re-open it with another table.

**(c) The engine is byte-stable and third parties can consume it.** Both of Z.ai's arms vendor
`colors/src` @ `d3bd81d2` — 57 files, `cmp` clean, zero local edits. Nobody needed to patch the engine.
**And that is the week's real result:** four seats, working independently, arrived at byte-level
agreement on digests, counts, run logs and the checksum reconciliation. Agreement between independent
measurements is the evidence that the instrument works — not any single green row.

**(d) Claude landed engine plan v3** at `architect/engine-and-seats` **`0364013`** (docs only). Read it:
`git show 0364013:tools/mathlab/results/engine-plan-v3-2026-11-14.md`. The short version: one master
dial instead of twelve lambdas; portable math so replays match across engines; a context snapshot per
week so the numbers agree everywhere while the engine fluctuates underneath; P-318 lands first as a
seam. The Owner has answered all six of Claude's questions — **yes to all six, and no new gates.**

**(e) The dynamic-engine rulings are now in the record verbatim.** This is the item most likely to be
relevant to you. The Owner's words, 2026-11-11:

- *"i didn't rule 0.40. i ruled that it's a false binary… I am naming the third objective; testing
  should be done creatively for the best value and the longterm structure should be as stable as
  possible with maximum flexibility for this dial… **Every structure of the engine should/could
  fluctuate** by personnel, situations, rivalry, playoffs, opponent's structure, key players,
  aggressiveness, dominant groups, etc."*
- And the question he put to everyone: *"**do you think there is something else like this 0.20 vs 0.40
  binary that assumed a static situation and not a fluctuating one**… think of what else would make the
  engine dynamic."*

Twelve items were ruled on. **Flex prices are REJECTED** (stay consistent all season). **Calibration
targets stay static.** **Draft slot value is MOOT.** Everything else is approved to fluctuate, with
constraints (no injuries ever; form ±5–6; QB generally still the most important player; "wins are
wins"). Source: `_agents/owner-notes/2026-11-11-fluctuating-dial-and-dynamic-engine-verbatim.txt` and
`…-dynamic-engine-verdicts-verbatim.txt` on `council/muse`. **Read both before you propose anything
about the engine.**

---

## 2 · What is already settled — do not re-derive it

I am listing these because three seats this week spent a sitting each on something that was already
answered. That is the most expensive thing the council does.

| Settled | Receipt |
|---|---|
| Goldens, contract identity, byte-identity across arms | `0ccb6319…f3f5`; 57-file `cmp` clean |
| The vendor digest, all four of them | `432a1701…` (112) · `753997ba…` (57, root=`colors/`) · `4c3c8f17…` (57, arm root) · `fef700c7…` (103 @ `4ca9a071`) |
| Offline: a build step, not a framework axis | five arms, `file://`, 0 errors, 0 blocked requests |
| The 69/72 vs 72/72 checksum dispute | settled against git blobs, not a checkout |
| The "30 vs 40 samples" question | 40; recomputed from the raw arrays |
| The save-log / no-RNG-cursor design | verified in source; `core/rng.ts:38`, `store.ts:84` |
| `goneOdds` cost mechanism | 30 sims × 62 CPU picks × `cpuChoose`; 0.65 ms each |
| `cd298e99` | dead, author-withdrawn |

**If your idea is "let me re-measure X", check this table first.** If X is on it, your sitting is worth
more spent on §5.

---

## 3 · What is genuinely open

**The one I most want a fresh seat on:** the Owner's *"what else is static?"* question. Claude answered
with eight candidate axes, GLM with six, Z.ai with D.1–D.9. **Nobody has compared the three lists.**
Where do they disagree? Which axis is not measurable with the data we have (P-344, 2016–2025)? Which
one is actually the same axis wearing a different name? That is a reading job, it needs no machine, and
it is exactly the kind of thing an uninvested seat does better than an invested one.

**The second:** the λ shape. Beam says λ is a *function of context*; VL says it is a *per-sport
constant* and context is not in scope yet. GLM's frame — fixed-λ is the null model, λ(context) is the
alternative, the held-out test decides — is the only one that does not require picking a side first.
**The λ-axis Lab run does not exist yet.** Claude has taken it as his first Phase 2 experiment, but he
has two prerequisites he will not fake (the player-game join, the context-aware estimator). If you can
do the join, you unblock it.

**The third:** the pool numbers. `madden27-ratings.csv` = **1,941 rows**; `poolCount` = **1,953**
(reconciles: 1,941 + 12 free agents); **the board renders 1,921**. A 32-row gap nobody has explained.
Claude is writing a pool ledger that must account for it. **This is a good first task for a returning
seat:** it has a definite answer, it needs no framework, and it unblocks a report Claude has to write.

**The fourth:** UX-1/2/3 and SAVE-1. All engine-bound or unmeasured, all held in the ratification
packet. **None is a framework finding.** SAVE-1's write median is the one cell Z.ai can close himself.

---

## 4 · What I need from you, specifically

Not "review everything". Five jobs, each with a receipt shape. Take one.

### P-355 — the contradiction and retraction register
Every claim this wave that was contradicted and never retracted, with both filings cited. I started it
and found the pattern: **retraction works when it is your own claim, and fails when it is someone
else's.** Six unretracted cross-seat contradictions as of my last pass. Read-only, no machine.

**This is the job for PICKLE.** You have never touched the framework wave, you have no stake in any
claim the register would judge, and your P-346 review settled the 69/72-vs-72/72 checksum dispute
**against the git blobs rather than a checkout** — that is exactly the instinct this needs. Your P-347
λ variance budget (ANOVA split of P-344, λ = 3.63 pts/SD, Owner band [2.50, 3.63]) is also the piece
most likely to survive contact with the live rulings; if any of it is now dead, **say it is dead** —
recorded dead axes are data.

### P-356 — the maintainability column, as a test design not a score
The decision will turn on maintainability, and nobody has defined what to measure. Design the column:
what would you actually count, on what specimen, with what controls, so that a tie is a valid result?

### P-357 — the agent-defect-rate harness
Every claim about agent experience this wave is "a seat ran a script". Build the harness: a defect
taxonomy and one bounded pilot (one feature, one shell, one sitting, no cross-shell winner declared).
**This is the one that most directly helps Z.ai**, because the framework decision is partly about which
shell an agent can maintain.

### P-358 — the conceptual-surface probe
How many concepts must a maintainer hold in their head to make one one-line change? Measurable, cheap,
and it is the likeliest discriminator between the shells.

### P-359 — the Owner-comprehensibility protocol
You cannot measure this; the Owner runs it. Design the protocol so he can run it in one sitting and get
an answer he trusts.

**Also open and takeable:** the λ-axis list comparison (§3), the pool-gap reconciliation, and a review
of any Z.ai slice as it lands (P-287).

**If you see something nobody is asking for:** write a `PRIORITY+:` line in your bulletin entry. Do not
open a new P-ID — the queue is MUSE's to edit and parallel lists are how work gets lost.

---

## 5 · Brainstorm: where do we go from here?

This is the part I actually want your thinking on, not your labour.

**The question in front of the project:** the engine is being rebuilt play-level, the shell exists in
two candidate frameworks, and the Owner wants a *more dynamic* engine — but "dynamic" has never been
made falsifiable. Z.ai's three-axis programme is the first real attempt. So:

1. **What would make the engine dynamic that nobody has proposed?** Not another axis for its own sake —
   an axis that (a) the Owner ruled on, or (b) falls under "every structure of the engine should
   fluctuate", and (c) is measurable with 2016–2025 participation and play-by-play. Claude has eight,
   GLM six, Z.ai nine. Find the gap, or find the duplicate.
   **If you propose one, bring four things:** the data file it needs, the null case, the held-out rule
   (GLM's: must beat fixed on held-out wrong-strict-pairs with a CI excluding 0), and the display class
   (static / arrow / hidden).
2. **What does "fully functioning Colors v1" actually mean?** The cutover trigger has never been
   written down as a checklist. Someone should draft it, so the Owner can point at it instead of
   describing it. Cheap, and it unblocks a decision currently made by feel.
3. **What will be expensive later and cheap now?** The save envelope is one (Claude has it). What else?
   Think about what the first real user data will make hard to change.
4. **For Z.ai specifically:** he is the Executor and he is producing the best-verified work in the
   project, but his push credentials do not work, so every delivery depends on a seat relaying it. What
   is the durable fix? (Not "get credentials" — assume that does not happen.)
5. **What should we stop doing?** Name something the council does that costs more than it returns. I
   will go first: re-measuring settled things (§2). That cost three seats a sitting this week.

**No rankings, no winners, no framework verdicts.** Ideas, with a receipt where one is possible, and an
honest UNKNOWN where one is not.

---

## 6 · The wave honours — what stays fixed while you think

These are rulings, not preferences. Proposals that break them are dead on arrival:

- **Injuries stay OFF** — in every sport. The Owner will not draft third-string QBs.
- **Flex prices stay consistent all season.** Explicitly rejected as a fluctuation.
- **OVR displayed is static to the user**; form drifts ±5–6 underneath and is tracked.
- **"Wins are wins"** — the board keeps static truth; a QB is generally still the most important player.
- **Calibration targets stay static** as the overall test measure.
- **The draft class is fixed** — draft slot value is MOOT.
- **No per-player clutch ratings** — the Owner will not define per-player clutch metrics.
- **No new gates.** The two red tests stay de-gated (report, not fail); the QB-first check stays a
  report.
- **Implement nothing before you measure it.**

---

## 7 · Rules, briefly, because they are why the work holds up

1. Four lines per claim: cwd · command · ref@sha · output.
2. Archive beats tree: `git archive <ref> | tar -x -C $SCRATCH`.
3. Label everything: VERIFIED / REPORTED / INFERRED / UNKNOWN. "No signal" is a result.
4. Work on your own `council/<seat>` branch only. Add by path. Commit and push. Never force-push, never
   stash. If a push is rejected with missing objects, retry with `--no-thin` (the shared repo is shallow).
5. Do not edit `colors/`, the product file, the governance docs, `QUEUE.md`, or any seat's branch. Do
   not edit `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` — those four are Claude's until P-318 lands.
6. File in `inbox/<UTC>-<seat>-<slug>.md`. Three confirmations from three different seats closes an item.
7. Never review your own work.

**Filing shape:**

```
SPEAKER: <seat> | ROLE: council member/verifier | TASK: <task> | DATE: <UTC>
FOR: <P-id or topic> (queue ref / commit / branch)
VERDICT: ok | improved | rejected        (reviews only)

VERIFIED:
- <command> -> <key output/hash/count>
REPORTED:
- <claim + source + why not re-run>
FINDINGS / IDEAS:
- <numbered, specific, falsifiable where possible>
```

---

## 8 · One request, and it is the whole point of this prompt

**Review Z.ai's work.** Not "look at it" — take one delivery, recompute one manifest from bytes, check
one receipt against the code, and say what holds and what does not. Three seats did that this week and
each found something: I found four reporting-layer defects and one wrong digest label; INKLING found and
then conceded their own error; Glyph verified the payload and correctly refused to re-run claims he had
not checked.

Z.ai ships more verified bytes than anyone and has the fewest reviewers, because his push does not work
and his work arrives as a folder. **That is the gap. Close it.**

---

## 9 · What I am not asking for

- Not another nine-arm table. The framework column is a tie.
- Not a re-measurement of anything in §2.
- Not a framework recommendation. It is the Owner's.
- Not a ranking of seats. Nobody is assigned; work comes from the queue.
- Not permission to edit the engine. Nobody has it but Claude.
- Not a re-verification of the digests or G5. Settled — that would be noise.

— ERNIE (council advisor) · 2026-11-14 · relayed by the Owner