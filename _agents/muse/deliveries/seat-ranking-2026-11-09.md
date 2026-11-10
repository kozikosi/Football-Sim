# Council seat ranking — GPT's method revisited (MUSE, 2026-11-09)

## The method (GPT's, revisited)

This ranking revisits GPT's **Council Contribution Assessment and Assignment Guide (v2.1)**. GPT's method, as reviewed by Beam (`_agents/beam/notes/gpt-assessment-review.md`):

- **Qualitative, not numeric.** No 0–100 scores (false precision). Tiers + an ordered list within them, with **confidence labels** (high / medium / low) for each placement.
- **Ranked by quality of impact, not volume.** The council's highest-value contributions were **receipt-backed facts** (hash pins, function diffs, byte counts) that the Architect could verify without re-deriving. **Reproducibility above volume.** A single verified finding that changes a decision outranks ten reviews that confirm what is already known.
- **Verified vs reported.** "Contributed and verified" (ran it, receipt in the text) is distinguished from "contributed but unverified" (REPORTED — someone else says so). Only verified work moves a seat up.
- **UNASSESSED.** A contributor with too little evidence appears as UNASSESSED until reviewed. A name is kept separate from a model label unless an evidence-backed alias mapping is recorded.
- **Temporal bias noted.** Early contributors had more time to accumulate evidence; later contributors had less. Placement reflects sample size, not capability — especially for seats who joined in the last few days.
- **Self-inclusion caveated.** GPT ranked himself #10 with "low" confidence and a disclosed self-inclusion. This ranking includes the MUSE seat (the author) — that placement is a self-assessment, marked medium confidence, and it must receive independent critique. The same applies to GPT's own placement below.

**What changed since GPT's ranking (through Round 4, October):** the project has moved to model-first (Nov 8), the flex D-picks table was built and corrected (Nov 9), the P-321 measurement was evaluated (Nov 9), four new seats joined (Iceman, Inkling, Crouton, CK), the infrastructure was handed to MUSE (Nov 9), and the w-series reached w87 while 67 Cakepanz reached Slice 2. The seats below are ranked on their impact **through 2026-11-09**, on the evidence in the repo (inbox filings, commits, reviews, and the Owner's decisions).

**The Owner is not ranked.** KG's decisions (model-first, D-picks, the flex answers, the calibration targets, the fun principle, the 17 decisions) ARE the project — they are what the ranking measures impact against. Ranking the decider alongside the advisors would be a category error. Claude and Z.ai ARE ranked (they are builders whose shipped work can be assessed), but they are ranked in a builder lane, not against the advisors.

## The ranking

### Builders (shipped product)

| Rank | Who | Role | Why (evidence) | Confidence |
|---:|---|---|---|---|
| 1 | **Claude** | Architect | The product exists because of him. Built the engine, the flex table (D-picks `35ce4e98`, corrections `728b2c53`), the measured weights, the D answer (`3ed03627`), Colors Svelte, the guard passes, 290/290 tests. Every Owner decision lands through his implementation. Limitation: timed out twice (flex rebuild, items 3+7) and his workspace resets every chat — but neither dents the impact. | High |
| 2 | **Z.ai** | Executor | Shipped the w-series (w55–w87) and 67 Cakepanz Slices 1–2. w87 published (1,900,033 B, md5-verified), Slice 1–2 landed on gh-pages. The UI the user actually sees is his. Limitation: w87 is published, not live (the make-live step is the Owner/Beam's); his work is UI, not engine. | High |

### Council seats (advisors) — Tier A: decision-changing, verified, original

| Rank | Who | Why (evidence) | Confidence |
|---:|---|---|---|
| 1 | **Pickle** | The highest-impact advisor. Built `flexrebuild.mjs` + `flexverify.mjs` (the tool that rebuilds the flex table in one command). Found the **WILL/C-bump-moves-D-by-0** correction — a verified engine fact that changed the Owner's decision (the OLB>ILB/OLB>SS −6s stand as pure Owner overrides, not engine-derived). Caught the unseeded `Math.random` use (62 occurrences) in E-211. Every finding is receipt-backed and decision-changing. GPT ranked him #1; he stays #1. | High |
| 2 | **DS** | Verified the **engine bias KG suspected, in the place he suspected** — the single most Owner-relevant verification in the project (the Owner suspected a bias and DS confirmed it with evidence). Shaped the storage-wave prompt. The P-284 bias audit (fit vs validation, data-anchor tools, 60 answers, hypothesis ledger) is the most thorough audit in the repo. | High |
| 3 | **GLM** | Verified the **salary table is live engine state, 32/32 exact** (the Owner's table, confirmed in the engine). Built `flexrebuild.mjs` that reproduces the Architect's `35ce4e98` D-picks build **byte-for-byte**, and the **final-105 candidate** (105 rules {12:23, 6:40, 2:16, 0:26} — the Owner's expected counts exactly), independently confirming the flex-answers counts. Filed D-011-PROPOSED (the WILL/C bump is a no-op for theta D). Recent work is excellent and it cross-checks the MUSE seat's own numbers. | High |
| 4 | **VL** | P-309 theta rerun (ok), P-310 complete, **P-321 spread study** (one of the four independent evaluations), `flexrebuild.mjs`, the **WR2/WR1 revealed ratio 0.544** (verified), guard pass 2 verified. Very high volume AND verified — the ratio finding alone changed how the project understands WR2. | High |
| 5 | **VLOC** | P-309, P-310, **P-321 spread study**, **P-282 WR2 verification** (revealed ratio 0.544), P-013 weights audit, P-285 review. Very high volume AND verified. The P-282 verification (with VL) is a measured fact the project relies on. | High |
| 6 | **Super** | P-309 theta rerun, P-314 review (improved), **P-321 spread study**, built the **T6 flex-pricer + T7 metamorphic battery**, and the **P-193 flex-guide data review** (just filed): found the three flex versions disagree (REV 4 / 97-rule / 105-rule) AND the **flexcheck-rejects-12 blocker** — a concrete, actionable infrastructure defect that blocks items 3+7 validation. Recent work is high-quality and it finds real blockers. | High |
| 7 | **OR** | **Pushed w87 to gh-pages** (the delivery — without OR, w87 would still be in Z.ai's download area). P-294 review (improved), P-110 review, validated the salary table pre-refit, the P-284 owner-weights validation (7/26 slots within ±50 tolerance — a measured fact). Shipping + verification. | High |
| 8 | **MUSE** | (Self-assessment — **medium confidence, must receive independent critique**.) Infrastructure owner (council.mjs v9, AGENTS.md/START-HERE/PROJECT-KNOWLEDGE rewrites, queue hygiene, the retires-citation correction). **P-321 independent verification** (reproduced the real engine math from PreColors, confirmed all four seats, resolved the CSV/embedded pool discrepancy). Flex rebuild verification (P-311, improved). The **localWins20 computation** for w88 (verified to reproduce slotWins20 exactly at base all-80). The prompts (Claude flex answers, Z.ai Slice 3, w88, the council prompt). Impact is enabling (infrastructure + verification + prompts), not decision-changing in the way Pickle's or DS's findings were — which is why it sits at the lower end of Tier A, not the top. | Medium (self) |

### Tier B: solid, verified contributors

| Rank | Who | Why (evidence) | Confidence |
|---:|---|---|---|
| 9 | **Beam** | P-289 partial verification, P-285 review, the **boot inefficiency finding** (P-283 — exposed why the build was slow to start), verified P-282 live (sweep 0.544, batteries 84/0/0, tsc gate). Solid verification, more confirmatory than original — which is why it sits in Tier B, not A. (Beam himself agreed with this assessment in his review of GPT's guide.) | Medium-high |
| 10 | **Flint** | **Lab baseline reproduction VERIFIED at N=1000** (the decisive reproduction for P-276). Verified the cutover batteries 84/0/0 and the tsc gate. P-115 review (improved). Solid, receipt-backed verification. On probation (Owner) — noted, but the work speaks for itself. | Medium-high |
| 11 | **Iceman** | New seat (joined 2026-11-09), small sample but high quality. **P-309 grid reconcile: 11/11 cells reproduced straight from the frozen engine** (including QB>FS@90 θ1.0 = 24.45) — a strong independent verification that closes the ×20 discrepancy. P-314 review (improved). P-008/P-044 proposals. Onboarding feedback that found the council.mjs /tmp silent failure (with Inkling) — a real infrastructure defect. Temporal bias noted: he has had days, not weeks, to accumulate evidence. | Medium (small sample) |
| 12 | **Inkling** | New seat (joined 2026-11-09), small sample but high quality. **P-314 review (improved): re-ran the engine tests himself (284/284 VERIFIED, upgrading the MUSE seat's REPORTED) and found 3 NEW findings (F4/F5/F6)** for the P-317 revision. Onboarding feedback that found the **retires-citation problem** (~110 retires citing an Owner note that does not exist) — a significant governance finding. w87 live verification. Temporal bias noted: days, not weeks. | Medium (small sample) |
| 13 | **UK** | **P-321 spread evaluation** (one of the four independent evaluations — found the 3 bottom rank inversions). P-197 defensive-posture work (rejected — the model didn't fit the spec; a rejection is still a verified finding, honestly reported). High-volume reviewer. Solid. | Medium |
| 14 | **Grok** | Wrote the **consolidated storage-wave prompt** and reviewed it with targeted technical edits. The prompt is the one the Owner sent to Claude + Z.ai in parallel. Solid, but a single (if significant) deliverable. | Medium |
| 15 | **Gemini** | Reviewed the storage-wave prompt (adding export/import and error handling). **Diagnosed the worktree path mismatch** (OpenChamber/Kilo scan `/Users/kosi/Desktop/wt/`, not `~/wt/`) — the root cause of the four new seats not appearing, with the fix (physical worktrees, no symlinks, prune before re-creating). A real operational finding. | Medium |
| 16 | **GPT** | (Self-inclusion caveat: this ranking uses GPT's method, and GPT is ranked by it — **low-medium confidence, must receive independent critique**.) Wrote the **multisport platform proposal** and reviewed the 20-0 prompt (zero-cost, data preservation). Authored the **ranking method itself** (the assessment guide v2.1 — the qualitative method this ranking revisits). The method is a real contribution to how the council judges itself. Direct project impact is moderate (proposals + the method, not verified engine findings). | Low-medium (self) |
| 17 | **Q** | Reviewed the storage-wave prompt (quota, snapshots, stat scope). A solid review, but a single deliverable and no verified engine finding. | Medium |

### Tier C: volume reviewers / limited evidence

| Rank | Who | Why (evidence) | Confidence |
|---:|---|---|---|
| 18 | **GH** | High-volume reviewer (34 reviews — among the highest). Volume is real, but no single decision-changing finding is cited in the record I have. By GPT's method (reproducibility above volume), volume alone does not lift a seat into Tier A or B. | Low-medium |
| 19 | **FK** | Steady reviewer (19 reviews, part of the active reviewer core). Same reasoning as GH: volume without a cited decisive finding. | Low-medium |
| 20 | **Glyph** | Was **set aside by the Owner (2026-11-04)** when his Tier 1 verdicts file failed to reach the branch — a real reliability failure. Now filing again (E-208 review, improved — aggregation/source precision). Earlier work validated the DISCUSSION/next-explanation proposals. Moderate, and returning — but the set-aside and the gap count against him, and the recent sample is small. | Low-medium |
| 21 | **MIMO** | New seat. Asked where the council lives after the fresh-repo cutover, opening the discussion that closed unanimously at Option A. A useful question, but a single contribution so far. | Low (small sample) |
| 22 | **Boc** | Executed the **P-195 engine acceptance tests and found a real defect** (which the MUSE seat then fixed). That was a significant, verified finding at the time — but it is older work and there is limited volume since. | Low-medium |

### UNASSESSED (no work to rank)

| Who | Why |
|---|---|
| **Crouton** | Ignored indefinitely (Owner, 2026-11-09). Crouton's model isn't working. No filed work. |
| **CK** | Ignored indefinitely (Owner, 2026-11-09). No filed work. |

### Not active (not ranked)

MiniMax, Nemo Ultra, Nemo Super, Cohere, LK, Lightning, Longcat, MOC — seats/models from GPT's original ranking (Rounds 1–4, October). They are not currently involved in the project and there is no recent evidence to rank them on. They are not UNASSESSED; they are inactive.

## What this ranking says, in one paragraph

The builders (Claude, Z.ai) ship the product and sit above the advisors. Among the advisors, the highest impact comes from seats who produce **verified, decision-changing findings** (Pickle, DS, GLM) and from seats who combine high volume with verification (VL, VLOC, Super, OR). The two new seats (Iceman, Inkling) have the highest quality-per-filing of anyone, but they have had days, not weeks — their placement is provisional and will move up fast if they keep filing at this quality. The volume reviewers (GH, FK) are valuable but, by GPT's method, volume without a decisive finding does not lift a seat. The MUSE seat's own placement (Tier A, lower end) is a self-assessment and must be critiqued independently. Crouton and CK are not ranked because they have no work; Glyph's return is noted but does not erase the set-aside.

## Limitations (stated, per GPT's method)

- This ranking is based on the evidence in the repo and in memory as of 2026-11-09. A seat whose work I have not read (or that lives on a branch I have not fetched) may be under-ranked. Correct it with a citation.
- The ordering within Tier B and Tier C is closer than the ordering within Tier A — several of those placements could swap on one more filing.
- The MUSE and GPT self-assessments are the least reliable placements in this ranking, by construction. Critique them first.
- This ranking is provisional. It reflects contributions through 2026-11-09. A seat who files a decision-changing finding tomorrow moves up.
