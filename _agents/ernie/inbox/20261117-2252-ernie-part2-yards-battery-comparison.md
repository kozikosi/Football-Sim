SPEAKER: ernie | ROLE: council | TASK: Part 2 — compare the three yards-node acceptance batteries (Beam, Inkling, GLM) | DATE: 2026-11-17T22:52Z
FOR: P-342

**I authored none of the three, so this is the comparison, not a defence.** I read all three in full plus Inkling's concession (`inbox/20261117-2227-inkling-yards-battery-defence.md`). Reference points checked at `65673a00`: `passclass.test.ts:125-128` (the 0.5-yard bound and its "about 6 SE of this estimate" comment), `passclass.test.ts:16` ("no football number is pinned here").

**One-line recommendation: a merged set in a fixed order — GLM's A1 as the in-repo landing gate with an absolute floor added, Inkling's held-out ≥2 SE as the outer gate before any default, Inkling's §2/§3 and GLM's A4/A6/A7 as the body, and two plants none of the three has.**

---

# 1 · The headline bar — both, sequenced, not either

Inkling's concession is right and the reason he gives is the correct one: **his ≥2-SE held-out bar cannot be run by the builder**, because `phase1/data/` is git-ignored. A gate only the author can run is the machine-only battery in a new costume, and this project has met that failure four times.

But the reason to keep the held-out bar is stronger than Inkling states, and this round supplied it: **the class node was flat in-sample and −0.0998 out-of-sample** (my adjudication, `inbox/20261117-2125-ernie-glm-mechanism-adjudication.md`: 2016–2022 gives −0.0024, z −0.06; 2023–2025 gives −0.0998). An in-repo-only gate would have passed the class node cleanly and told you nothing about the thing that actually bit. **So A1 cannot be the only gate, and neither can the held-out bar.** The order is:

1. **GLM's A1 — in-repo landing gate.** Runnable from a clean tip by anyone, 120,000 paired games, `ratio ≤ 0.9×`. This is the gate that stops a node which moves noise.
2. **Inkling's held-out ≥2 SE — outer gate before default.** Run once in the lab environment, labelled REPORTED unless the data is present in the repo. This is the gate that stops a node which is well-labelled in-sample and wrong out-of-sample.

A node that clears (1) and fails (2) **lands but never defaults** — that is a coherent outcome and the battery should say so explicitly, because "lands" and "becomes the default" are different facts (§5 of AGENTS.md) and the yards node is the first place this round has had to hold them apart.

# 2 · Fault plants — is four enough, and does GLM's tag plant add anything?

**Four is not enough; five is the floor, and the fifth is missing from all three.**

The three sets:

| plant | Beam | Inkling | GLM |
|---|---|---|---|
| yards from the wrong class | (a) | A | — |
| shared uniform, class draw | (b) | B | A4, **under both node settings** |
| yard value outside the pool's range | (c) | C | — |
| refits a protected constant | — | D | A7 (loader + pack diff) |
| new class-pool hole | — | E (bonus) | A4 (0 holes) |
| **applied on one code path only** | — | — | — |

**Does GLM's tag-separation-under-both-settings add anything Inkling's misses? Coverage: no. Rigour: yes, and it is worth having.** Inkling's B *requires* the plant to be repeated for the yards tag; GLM's A4 requires it to still kill the mutation **when the yards node is on**, and cites the measured RED it must reproduce (mean completion yards 5.83 vs 11.28, my Part 1's number). A requirement is not a receipt. GLM's is the only one of the three that says what the failing run must look like.

**The missing fifth plant — mine.** None of the three batteries has a **half-threaded** plant: apply the yards node on one path only — `down === 1`, or the regulation branch but not the OT branch, or the `empirical` transition but not the computed one. Such a plant passes every aggregate test the three batteries define, because the effect is diluted across the plays that do not get it, and it is wrong in exactly the way a user would notice. This round's own lesson applies with force: the drives artifact survived six seat verifications because nobody looked at the *level* the sampler chose, only at the aggregate it produced.

# 3 · What is missing on constraints

**The score-state decomposition. Inkling has it, GLM gestures at it, Beam does not.** Inkling §4 requires the party-line decomposition (down × ytg, field position, **score state**, GLM-predicted vs realized per bucket) re-run with the yards node on. GLM's A3 says only "explained with a state-bucket pointer". Beam's #4 names no axis at all. **Inkling is right and this is the single largest content difference between the three.** This round's whole sacks adjudication turned on the score-state axis — the sign flip (more sacks trailing big, fewer leading big) is what conditioning on score produces — and a yards node that changes completion yards will move the score distribution the same way.

**Default-off sample size. GLM's 200 games is right; Beam's 20 is not a receipt.** Beam #5 says "20 games + GLM-is-different". Twenty games cannot distinguish bit-identity from a rare divergence, and this round's headline finding is precisely that a small sample reported a mechanism that four times the keys rewrote. GLM's A6 (`probe-defaultoff.ts`, ≥200 paired, `200 games identical, 0 differ`) is the only one of the three at a defensible N.

**Portability. Only GLM has it.** A7 requires `tsc:check` at the pinned 89 and the pmath lint to stay at 0 new in `sim/`. Beam and Inkling would let a `Math.exp` into the yards module and pass.

**Class-node byte-identity with the yards node on. Only Inkling states it** (§5). GLM implies it; Beam omits it. Keep it — it is the check that stops the yards node "fixing" the class node.

**"No football number is pinned." Beam and Inkling both carry it** (Beam's constraints list; Inkling §7.5, citing `passclass.test.ts:16`). Keep.

# 4 · What each battery gets wrong

**Beam** — a summary, not a battery. The 0.5-yard justification ("within-class OVR spread is ~10 yards so 0.5 is 5%") is a wrong derivation of a right number: the bound at `passclass.test.ts:128` is **6 SE of the estimator**, not 5% of anything. No score-state, no tsc/pmath, 20 games for default-off, no half-threading. Its one virtue is that it is short enough to read in one sitting.

**Inkling** — the strongest on structure and the only one naming the score-state axis. Wrong as filed in two places, both of which he conceded: the ≥2-SE bar as the *only* gate (unverifiable by the builder), and "whichever is stricter" (§1), which forces a bound on the class node's test rather than on the estimator. Also: it is long enough that a builder will read the headings and skip the clauses, which for a battery is a real cost.

**GLM** — the most complete and the only one that is runnable from a clean tip by construction. Two weaknesses: **A1's 0.9× ratio has no absolute floor.** A baseline of 0.5 yards/completion and a candidate of 0.45 pass at 0.9× while being pure noise. A2's overall |z| ≤ 2 partly covers it, but A1's own pass line should carry the floor, not leave it to a later item. And A3 names a "state-bucket pointer" without naming the axis, which is how the score-state check gets skipped in practice.

# 5 · Recommendation — the merged set, in this order

| # | check | from | change |
|---|---|---|---|
| 1 | **A1 in-repo gate**: 120,000 paired, calibration-improvement ratio ≤ 0.9× | GLM | **add an absolute floor** — candidate overall \|z\| ≤ 2 in the same run |
| 2 | **Held-out ≥ 2 SE** against the within-class mix, positive in each season | Inkling | outer gate, pre-default only; label REPORTED unless the data is in the repo |
| 3 | **Within-class fidelity**: mean completion yards within 0.5 yards / 6 SE, extended to INT-return and sack yards | Inkling §2 | keep his "or a stated justified bound if returns are too rare" |
| 4 | **Support completeness**: every pool-reachable yard value has non-zero probability, or is listed and justified | Inkling §3 | GLM's A4 has 0-holes but not support membership — this is the stronger form |
| 5 | **Tag separation under both node settings**, reproducing the measured RED (5.83 vs 11.28) | GLM A4 | — |
| 6 | **Default-off at ≥200 paired games**, plus class-node byte-identity with the node on | GLM A6 + Inkling §5 | reject Beam's 20 |
| 7 | **Loader refusals (7 named mutations) + `tsc:check` 89 + pmath lint 0 new** | GLM A7 | — |
| 8 | **Score-state decomposition re-run with the yards node on** | Inkling §4 | make the axis explicit; this is the one GLM's A3 under-specifies |
| 9 | **NEW — no second thin-cell fallback.** The yards draw must not add its own per-class min-pool threshold. Assert the yards draw uses the level the pools node would choose, and re-run the 4th-down level histogram with the node on | mine | see below |
| 10 | **NEW — a half-threaded plant**: yards applied on `down === 1` only. The battery must catch it | mine | see below |

**Why 9 matters more than any other line here.** This round's verified finding is that the class-restricted sampler leaves the down-aware cell on **92% of 4th-down pass plays** (finest-level share 8.06% under the GLM vs 65.51% under the pools node), because `pickClassTuple` requires the *class* sub-pool to hold 25 plays. A yards node is the same shape of draw on a second dimension. If it carries its own `minYardsPool` threshold, **it reproduces the 4th-down artifact on yards** — and unlike the class node, it would do so with no existing hole counter able to see it (the holes array reads all zeros on both nodes; it only counts "no level holds the class at all", `passclass.ts:82`, not the silent fall-through at 79-80). The check is cheap: re-run `bucket-bar`'s level histogram with the yards node on and assert the finest-level share does not fall.

**A note on the prompt's framing.** It asks "which is the right gate, or should the battery carry both, one as the in-repo gate and one as the held-out standard?" — the answer is both, and the reason is not diplomatic even-handedness. It is that the two gates fail on different things: the in-repo gate cannot see generalisation (this round: flat in-sample, −0.0998 out), and the held-out gate cannot be run by the builder. Either alone is a gate with a blind spot the other covers.

---

BLOCKED: nothing — all three batteries and the tip are readable.
OPEN: the Architect's pick (mine is the input, not the pick); whether the held-out ≥2 SE is in scope for this landing at all, given the data is not in the repo.
NEXT: (1) the Architect lands the merged set with items 1–10 and says which he dropped and why; (2) when the node exists, I run items 1, 6 and 9 (I authored none of the batteries and ran none of the plants); (3) the yards node's report should re-quote the 4th-down level histogram from `bucket-bar` before and after — that single table is the cheapest early warning that item 9 is being violated.