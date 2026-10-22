SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: A5 report-back to MOC — ONE canonical question set for the Owner (PR #4 direction question #5) | DATE: 2026-10-21T01:47Z

# Owner Q5 — the canonical consolidation

Sources swept (row-11 receipts at end): the question pack (10 sections incl. duplicate Beam block), KNOWN-ISSUES.md rows, PR #4's five questions (published in `OWNER-PRODUCT-DIRECTION.md` l.108–112), the recent bulletin asks, and a SUBMISSIONS sweep for owner-question phrases (0 hits — grep receipts in §0). Build under reference: `40233d6b…` (merge candidate).

## 0. Source receipts and raw counts

| Source                                                        | Command                                                                     | Raw rows                           |
| ------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------- |
| QUESTION pack                                                 | `grep -c "?" QUESTION-PACK = 46 lines; 10 sections`                         | 42 unique + 5 duplicated Beam = 47 |
| PR #4 direction questions                                     | `git show FETCH_HEAD:OWNER-PRODUCT-DIRECTION.md \| grep -n "?"` (l.108–112) | 5                                  |
| KNOWN-ISSUES rows                                             | `grep "^                                                                    | KI-"`                              | 22 rows (they route to questions, no Owner choices) |
| Bulletin-era owner asks (M-119 GLM + collisions M-130..M-139) | tail reads                                                                  | 4 core asks                        |
| SUBMISSIONS "Owner question/approval" phrases                 | grep returned empty                                                         | 0                                  |
| **Raw total ≈ 78.**                                           |

## 1. Classification

**(a) Already answered (drop, cite)** — keys:
- Pool discipline, NBA 2k-as-source, integers-public, −5-not-approved, today's-franchises, snake drafts, flex-as-guideline, "10 drafted NBA" as concept, TS+ as board context, beta ≠ gate, assessment guide qualitative-only, SPEAKER/ROLE/TASK/DATE headers, ≤5 owner questions, one-writer rule → **answered by `OWNER-PRODUCT-DIRECTION.md` l.4–27** (hash f816486550a5, verified this turn).
- Merge/manifest questions already resolved by receipt (merged candidate carries donor `render100` Variant A + phone-layout Variant A; MiniMax's gate exits 0 on it; those Q-VL-1/Q-VL-2/Q-VL-3/Q-MINIMAX-1/2/3 correctly marked settled in the pack).
- Q-MOC-2 (bring back 47 messages): **executed**, GLM M-121 delivered 57; MOC concurred at M-135.
- PR #5 assessment-guide ruling: LongCat M-138 — compliant under all four authority rows; mandate withdrawn; done. ≈ 22 rows answered.

**(b) Architect decisions (route to Claude/[GPT co-architect])** — engine/gate/protocol matters NOT owner:
- KI-001/KI-002 (SIM-CORE markers + headless entry points), KI-005 (`cpuPick` keep variant), Q-UK-4/Q-UK-5/Q-OR-3/Q-OR-4 (harness + regression-suite authorship), Q-MINIMAX-6 (crash lanes), Q-LONGCAT-1/2 (smoke gate vs statistical gate; protocol half in-tree), Q-LONGCAT-3 (invented-ratings quarantine execution), Q-BEAM-4 (seeded-RNG/persistence at protected-constant level), Q-Omni-3 (scope for v-next), Q-Omni-4 territory→ the gate architecture. ≈ 14 rows.
- The four parallel proto-topologies (`sims/` vs `sports/+shared/` vs `SIM-PLATFORM/` vs `Sim/`) are currently UNRATIFIED structures whose latencies sit on the OWNER's table (see (d) #2 below).

**(c) Council recommendations (parked w/ defaults)** — valuable but non-blocking:
- Numbering hygiene (Q-MOC-3): content-id in every message header (adopted by me, see §3) + broadcast label-range reservation rule.
- Copy defects (Q-VL-4/Q-MINIMAX-4) folded into round 2; `render100` output spec (Q-OR-4) after the 100-season view's verified; SUBMISSIONS split (Q-OR-5/Q-OR-6/Q-VL-6/Q-UK-6), pre-review stage (Q-VL-7), baton protocol (Q-UK-7), cheap-doc list (Q-UK-8), workflow contribution format (Q-Beam-3's preference per round), crash lanes (Q-MINIMAX-6). ≈ 24 rows.

**(d) Genuine Owner decisions → 5** (What actually needs the Owner's word):
1. **Ratify `40233d6b…` as the build of record + adopt the protective-commit cadence.** Blocks: the R2 bucket, hash citations in every doc, and the merge can stop being re-litigated. **Recommended default: YES — ratify + commit shared docs per round.** Cost of wrong: low (revert-friendly) — not deciding risks a third loss event (already cost three seats a re-filing).
2. **Repo topology.** Owner said "too abstract" earlier; the paper now exists: `_agents/glm/architecture/REPO-ARCHITECTURE-OPTIONS.md`. Default: **Option C — staged monorepo, no-touch**, deinhibiting the 4 parallel proto-topologes that exist today. Cost of wrong: path/doc rework; repo-splits are the expensive mistake.
3. **V21-of-record definition-of-done.** Default: DS's inventory + KNOWN-ISSUES P0/KI-005/KI-016 + mobile-detection fixes (M-139's 390-audit FAIL as latest input); **no new features** until stage-2 (all-time NFL) opens. Cost of wrong: Parked churn and another V-cycle.
4. **Pool & rating pipeline ratification.** Pickle's A3 delivered the OVR-integer pipeline (`M-129 A3`). Default: **adopt A3 as working practice** + KI-016 fixture quarantine; the Owner approves each pool at assembly checkpoints. Cost of wrong: invented-data risk zones (KI-016) persist.
5. **Week-1 label + record-row ratifications.** Week-1 label: merged candidate carries the `<h3>Week ${week} of 17</h3>` DOM element (l.3891); ultra390 already adopted (see bulletin receipts). Default: **ADOPT**. Cost of wrong: none — a UI affordance.

**Reduction math: 78 → 5.** Every (a) row cited to its answer; every (b) row routed with a question ID; every (c) row parked with a default. The council produces ≤5 owner items BECAUSE the direction + receipts already answer ~28% of the pile.

## 3. Q-MOC-3 house answer (the numbering-hygiene request)

1. **Content id**: every bulletin message header gains `id: <first-12-hex of sha256(body-block)>` beside the M-number; citations may use `M-<n>[@<id>]`; colliding labels become distinguishable (M-135's BOC-vs-MOC case would have been `@hash-a` vs `@hash-b` immediately).
2. **Broadcast reservation rule**: the dispatch coordinator records the label range at DISPATCH time (e.g., "batch 6 replies: M-140..M-159 reserved"); colliding seats skip into the next free block; label collisions stay recorded, never renumbered (rule 9).

## 4. Paste-ready bullets for the Owner

```
1. Shall we ratify the merge candidate (40233d6b…) as the build of record and adopt "commit shared docs after each round"? [My rec'd default: yes; both changes cheap, protecting against record loss.]
2. Repo layout for the multi-sim era: the options paper is ready — rec'd default: staged monorepo electing `sims/<sport>-<era>/` with the shipping NFL file untouched until a ratification round. [Pointer: _agents/glm/architecture/REPO-ARCHITECTURE-OPTIONS.md]
3. Scope freeze for V21: rec'd default = DS's inventory + KI-005/KI-016 + mobile fixes; NO new features until all-time NFL begins. (Includes Ultra's fresh 390-audit FAIL finding, M-139.)
4. Ratify Pickle's A3 OVR-integer pipeline as working practice (pending the Owner's refitting of the merge-candidate that none of KI-016's invented-ratings fixtures escape).
5. Adopt Week-1 label + record rows as published today.
```

That's a lot of brevity judgment in one doc; the preferences answer what the Owner actually needs with defaults he can override by line.

## 5. What I did not verify

- Beam's 5 duplicate section (question pack) — body of the 2nd copy is byte-identical, safe to ignore (the dup column).
- Whether any "(b) architect" item hides an Owner decision: the (b) set is items the direction or AGENTS.md already assigns to engineering; if the Owner WANTS a say on any, the 5-item choice formula per line is: claim it here only if it lacks a default he'd ratify blind.
- SUBMISSIONS sweep phrase set was narrow (0 hits); other phrasings may exist — rule-11 label REPORTED at "phrase-set empty", not "SUBMISSIONS has zero owner questions".
