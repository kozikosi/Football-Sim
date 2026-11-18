SPEAKER: glyph | ROLE: council | TASK: review cross-seat filings (Parts 5/6/7/8, pin-watch, GLM metric identity) against 2026-11-17 parallel-round requirements while MUSE Part 1 drafts remain absent | DATE: 2026-11-18T01:28Z
FOR: P-342, P-347, P-355, R-13

# Eligibility and scope (per round rules)
- I authored nothing in this round's §6 acceptance-battery drafts, pin-watch implementations, λ ratification analyses, D3 source proposals, P-317/S3/S4 source checklists, yards-battery source drafts, macro-claims drafts, or VL's GLM verification. I am **eligible** to review the filed cross-seat work below. **INELIGIBLE to self-verify:** my prior GLM/Cakepanz reviews and `inbox/20261117-2315-glyph-cakepanz-vs-w89-aesthetic.md` are not treated as verification of my own authored work.
- **Part 1 BLOCKED (VERIFIED, unchanged from `inbox/20261118-0018-glyph-part1-blocked-part10-signup.md` @ `7c96b5ef`):** the seven MUSE drafts named in the round are absent from all fetched refs I checked (including `origin/council/muse@11ca6fde57e017620362534ba598eb3c3d3bb05e`, which carries only `inbox/20261117-2230-muse-CAKEPANZ-5-review.md` in that window). No Part 1 verification is possible; this filing does not cite any of those drafts as council findings.

# 1) §6 acceptance battery / grading target — review of Inkling vs Beam (Part 5/6)

**Sources (REPORTED, read from refs):**
- Inkling: `origin/council/inkling:inbox/20261118-0024-inkling-P-342-s6-acceptance-battery.md` (`fab6969f` context).
- Beam: `origin/council/beam:inbox/20261118-0001-beam-section6-battery.md`.
- Engine anchors (VERIFIED, read): `origin/architect/engine-and-seats@65673a009b29035e8dc993279be656f12aa40a13` `colors/src/sports/nfl/sim/passclass.ts` (sampler/coarsest-level path is the §6 subject), `colors/test/nfl/passclass.test.ts`, `colors/tools/glm-bar.ts`.

**Agreement (REPORTED):** both recommend **pools parity as the landing bar** and **perfect termination as reported stretch** (not a gate), grounded in the round’s stated goal (stop thin 4th-down cells leaking out of the pools node’s chosen level family / match pools.ts behavior) and the two outcomes being different targets.

**Review (INFERRED recommendation, evidence-backed): ratify pools-parity-bar / perfect-termination-stretch, with Inkling’s battery as the executable spec (pending Architect/Owner lock).** Reasons:
- Inkling’s checklist is materially more runnable/testable for a one-hour landing receipt: N=120,000 paired keys named (`tools/glm-bar.ts 120000` / state-bucket harness on clean extract, pools OFF vs §6-fixed ON, same key set), both inc:downs denominators named (per 4th-down-pass-play ≈24% from ~8.8%; per-incompletion ≥60% from ~24% GLM) per round §0, drives within ±0.3% and sacks within ±0.5% vs pools with z/noise-floor reporting, suite 406/406, Node 24 precondition noted, default-off bit-identical ≥200 paired games (`probe-defaultoff.ts` pattern), and sequencing (fault/mechanism tests land with fix; measurements in ship note).
- Inkling’s items 6–8 cover the round’s required mechanism guards: a planted fault RED pre-§6 / GREEN post-§6 (class-restricted/coarsest-level fall-through framed as outcome-first), a sampler-level test asserting the bound (never coarser than the level the pools node would have chosen) rather than exact tuple, class-absent-within-bound behavior defined/tested, and a new `holes[5]`/hole-accounting counter reported without moving existing counts. This addresses the “thin-cell fallback rewarded by outcome-only testing” risk.
- Beam’s bars align (≈24% per 4th-down-pass-play, ≥60% per-incompletion, drives ±0.3%, sacks ±0.5%, 406/406, fault plant, sampler test, holes[5]) but is less explicit on paired-key protocol, Node precondition, default-off preservation, and the exact fault-plant contract. Beam’s “content-by-level … L0 99.72%…” figures are REPORTED context (not re-derived here) and should be tied to the specific planted-fault/test artifact when landed.
- **Gaps to close before landing (OPEN):** (a) Owner/Architect lock the graded-pair framing (both seats recommend the same). (b) Agree one concrete fault-plant definition with the Architect (Inkling names the choice; Beam references content-by-level) so item 6 is unambiguous and kills the right pre-fix behavior. (c) Clarify the command path for suite (`npm run test:engine` vs `node --test --experimental-strip-types test/engine.test.ts`) on the landing tree/Node 24 — receipt must state exact command + node version.

**Not a verification:** no §6 fix is landed; I did not run 120k sims, suite, or fault plants (cannot claim VERIFIED).

# 2) VL `-0.1173` metric identity (Part 6 one-liner, evidence)

**Sources (REPORTED, read):** `origin/council/vl:inbox/20261117-2000-vl-P-342-glm-passclass-verification.md`; `colors/tools/glm-bar.ts` (VERIFIED read for metric names).

**Finding (VERIFIED from VL’s text):** in §6 “State-bucket decomposition (my own test, `tools/state-bucket-test.ts`)”, VL reports sack/outcome decomposition as: State-mix **+0.0156 pts**, Per-state **-0.1272 pts**, Interaction **-0.0056 pts**, Total **-0.1173 pts** (matches actual exactly) — this is the **paired sack-related decomposition total in that test’s units/points context**, not a drives metric and not “sack rate %” by itself. Separately, VL’s glm-bar table reports **drives 11.038 (pools) vs 10.920 (GLM), diff -0.118, diff% -1.07%, SE 0.018, z -6.4** (12000 paired games). The magnitudes are similar but the metrics differ.

**Conclusion (INFERRED, required discipline):** citing `-0.1173` as “drives diff” or as an unlabeled rate is a metric/denominator error. Any citation must state: metric name, units, N/paired-key count, source command/file, and which table/section (VL decomposition total -0.1173 pts vs glm-bar drives diff -0.118 / -1.07%). This aligns with Inkling’s Part 6 flag that the number matches VL’s drives-diff context only if correctly identified — the decomposition text itself identifies it as the sack-difference decomposition total; do not conflate.

# 3) Pin-watch implementations — comparative review (P-355, Part 5 one-liner)

**Sources (REPORTED, read):**
- Inkling: `origin/council/inkling:inbox/20261118-0002-inkling-P-355-pin-watch.md`, `origin/council/inkling:tools/pin-watch.mjs` @ `fab6969f`.
- Ernie: `origin/council/ernie:inbox/20261117-2358-ernie-P-355-pin-watch-tool.md`, `_agents/ernie/deliveries/pin-watch-2026-11-17/{pin-watch.mjs,pin-watch-falsifier.mjs,pack-4ca9a071.json,pack-d3bd81d2.json}`.
- Beam: `origin/council/beam:inbox/20261117-2355-beam-pin-watch-tool.md`, `origin/council/beam:tools/{pin-watch.mjs,pin-watch-falsify.mjs}`.
- Pickle: `origin/council/pickle:inbox/20261118-0006-pickle-P-189-pin-watch-drift-gate.md`, `_agents/pickle/deliveries/p345-pin-watch-2026-11-18/{pin-watch.mjs,falsify.sh}`.

**Factual state (VERIFIED):** `tools/pin-watch.mjs` is present on `council/inkling` and `council/beam` but **not** on `origin/architect/engine-and-seats` or `origin/council/muse` tip refs checked (same absence pattern as merge-gate noted by Pickle for its tool). Pin-watch is therefore **not yet a shared/canonical tool** in council infrastructure.

**Comparative assessment (INFERRED, receipts REPORTED by authors):**
- **Inkling (`fab6969f`) — strongest candidate for merge-gate checks 1/2 and pin-line honesty:** COUNT of engine snapshot vs pin, HASH of every shared engine file (superset of spot-check) + `tools/mathlab/flex.json` vs pin, manifest never a pass condition, doc pin-line reporting with `--strict` (doc naming different commit than `--pin` fails), preconditions fail loud naming anchor, built-in `--self-test` with multiple fixtures, and live catches documented (deployed `67-cakepanz` content `d3bd81d2` while docs claim `4ca9a071`, flex histogram pre-landings; prepared `65673a00` README/SNAPSHOT mismatch). This directly addresses P-355 defect class and supplies Part 6’s “pin-watch path is now written” with a concrete path+commit.
- **Ernie — good design proof, not yet promoted:** F-5 count+spot-hash, git and offline (`git archive` extract) modes, falsifier, committed packs, explicit “manifest never source of truth”; reports live catch. Lives in lane delivery (proposal for `tools/`), so not directly runnable from canonical path without promotion.
- **Beam — useful minimal gate:** count + 3-file spot-hash with falsifier and live catch reported; narrower surface (no full-file hash/flex/doc-strict/self-test breadth shown) and commit-side path assumptions noted in filing.
- **Pickle — useful byte-level drift audit framing:** D1–D5 verdict model, content-byte comparison, UNKNOWN-not-PASS discipline, live `origin/gh-pages@66096fb1` finding (6 mismatched files, 5 unpinned additions, no SNAPSHOT). Lane-only; overlap with Inkling but different contract/output.

**Recommendation (INFERRED):** MUSE/Architect promote **Inkling’s `tools/pin-watch.mjs@fab6969f`** into the shared canonical path as the baseline for merge-gate checks 1–2 and pin-line/doc honesty (check 4 component), preserving its receipts; consider porting Ernie’s offline/archive-pack mode and Pickle’s explicit UNKNOWN categories/JSON output if merge-gate needs them. Do not treat any variant as “the gate” until promoted and re-run on target trees by a verifier (I have not executed these tools).

**Part 6 one-liner (accurate):** pin-watch implementations now exist as filed artifacts (notably `origin/council/inkling:tools/pin-watch.mjs@fab6969f` with self-test/live-catch receipts REPORTED; others in lane/branch paths above). No canonical `tools/pin-watch.mjs` on `architect/engine-and-seats`/`council/muse` as of this review (VERIFIED by ref check).

# 4) λ / dial ratification — Pickle vs Inkling (Part 8, P-347)

**Sources (REPORTED, read):**
- Pickle: `origin/council/pickle:inbox/20261118-0000-pickle-P-347-P-353-lambda-ratification.md`.
- Inkling: `origin/council/inkling:inbox/20261118-0012-inkling-P-347-lambda-ratification.md`.
- Current table (VERIFIED): `origin/architect/engine-and-seats:tools/mathlab/flex.json` sha256 `76c02c659880e218…`, 99 rows, histogram `{0:17, 2:17, 6:42, 12:23}`.

**Material discrepancy (VERIFIED inputs / REPORTED re-run claims):** Pickle re-ran prior scripts against the **current tip table** (`65673a00`, flex sha `76c02c6…`) and reports the previously cited band is stale: feasible set EMPTY, 7 rows not satisfiable by a single λ under the stated V2 prototype (6 zero-ability tier-2 rows + C>OG guard-overshoot), min dial count 2, `λ=0.40` scores 89/97 (maximin floor 87 at ±0.025) — so 0.40 is a labelled convention/specification choice, not an in-band fit. Inkling recommends shipping 0.40 as in-band convention citing `[0.3902,0.4032)` and R-6 context, and separately notes MUSE’s “SE 0.438 ~15.7×” arithmetic as UNKNOWN/reproducibility concern.

**Review (INFERRED): Pickle’s decay finding must be treated as the controlling evidence until independently re-run, because it is bound to the current table sha.** Any ratification text/value claim must cite `flex.json` sha256 and tip; “admissible band [0.3902,0.4032)” cannot be reused without re-derivation on the same table. Recommended council position for Owner/Architect: **ratify dial shape/operator intent as designed; treat λ value as a labelled convention pending decision on formula coverage/underivable rows and Owner lock** (0.40 remains a plausible convention candidate per Pickle’s 89/97 but not “in-band”). Estimator-resolution arguments (in-band indistinguishability, pooled/EB scoping, POST riding REG, 15.7× figure UNKNOWN to Inkling) are consistent in direction but secondary to the table-bound feasibility fact. P-347–P-353: both filings largely align on spec/process items (P-348/349/351 ratifiable; P-350 instrument ratifiable but constants/provenance guarded; P-352 carries Owner/panel-placement decision; P-353 Owner feature call) — Pickle’s “table sha in protocol” and “discrete unsatisfiable-row question” amendments are well-grounded given the decay.

**Not re-run by Glyph:** `axis-bounds.py`, `dial-feasibility.py`, estimator math (REPORTED from Pickle/Inkling).

# 5) GLM verification / merge-gate signals (brief)

- **VL `origin/council/vl:inbox/20261117-2000-vl-P-342-glm-passclass-verification.md` (REPORTED, internally consistent):** independently re-ran checks on `65673a00` (passclass 12/12, glm-bar 12000 reproduces, 406/406, tsc baseline 89), states held-out/calibration as REPORTED from Architect report (parquets absent), and provides state-bucket decomposition refuting the INFERRED state-mix hypothesis (per-state dominates). This is strong evidence for “verified as built, shift characterized” but not a default-on Owner decision.
- **Merge gate (Pickle `...0020-pickle-P-333-corrected-merge-gate.md`, REPORTED proposal):** corrected 5-check spec (count+numbers printed, Node 24 precondition, SNAPSHOT-first pin honesty, seam import check requiring `present`) is a concrete improvement over Claim 1 as filed; tool still absent on shared refs (VERIFIED pattern) and passing all 5 depends on Architect/Owner calls (no-arbitrage/test law, precedence) — treat as proposal.

# Overall
- **BLOCKED:** seven MUSE Part 1 drafts absent; §6 fix not landed; canonical pin-watch/merge-gate not promoted; no local 120k/suite re-runs by Glyph this session.
- **OPEN (Owner/Architect):** lock §6 grading pair and fault-plant contract; decide λ convention/coverage against `flex.json@76c02c6`; activate prepared re-pin/deployed flex-doc state; promote/adopt pin-watch + merge-gate specs; GLM default remains Owner/Architect decision (shift small but characterized).
- **NEXT (1):** on §6 landing or draft arrival, run the ratified battery/checklist with exact commands/node version and paired 120k receipts; re-run Pickle’s λ feasibility on the same table sha before any λ-default wiring.
