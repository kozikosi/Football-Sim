# [GPT] Pre-V21 Technical Review: Current NFL Merge Candidate

**Review date:** 2026-10-20  
**Repository:** kozikosi/Football-Sim  
**Reviewed ref:** merge/v20-donor at ff8c05ae0ef89e9030faa991a942d1c611f891bd  
**Reviewed artifact:** NFL Draft Simulator merged.html  
**Artifact SHA-256:** 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd  
**Artifact size:** 657,486 bytes  
**Review status:** Static review and local checks complete; browser end-to-end verification not completed.

## Important scope note

The accessible repository has no V21 branch, V21-tagged build, or certified V21 hash. The file reviewed here is explicitly a V20-base plus donor-fixes merge candidate. This report therefore evaluates the strongest available candidate as a pre-V21 review; it does not certify or claim to have reviewed a V21 build. Re-run this review against the actual V21 artifact when it is available.

No product code was edited for this review.

## Executive assessment

The candidate has a promising simulation foundation: a complete 1,200-player pool, 32 team depth charts, a full 832-pick draft, flex-aware roster valuation, a season and playoff engine, and a substantial statistical report. Static data checks found no duplicate player names, out-of-range ratings, missing position weights, or team-roster names absent from the player pool. The merge builder also reproduces the candidate byte-for-byte.

The candidate is not ready to be called V21 or certified for release. The main blockers are governance and verification, not a defect proven in the simulation math: the canonical status file still says the merge has no hash; the test contract targets a different build and requires interfaces that are absent; the only checked-in browser test points at a stale machine-specific file and cannot start because Playwright is missing; and there is no candidate-level draft-to-season-to-playoffs run. Product direction also needs resolution: the candidate opens in Draft, although the project instructions describe a Season-first experience.

The older V20 smoke record documents a 100-season report crash and phone-layout problems. The candidate no longer contains the missing rWeights reference and has the updated phone-layout logic, so those particular source-level defects appear addressed in the merge. The donor smoke is green for its limited checks. Neither fact proves that the merged candidate works end to end.

## What I checked

### Local checks

- Rebuilt the merge using tools/build-merged.js. The output was 6,554 lines and 657,486 bytes. It compared byte-for-byte equal to the checked-in candidate.
- SHA-256 of the rebuilt candidate matched: 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd.
- Extracted inline application JavaScript passed node --check.
- tests/madden-sim.spec.js passed node --check.
- Static data audit: 1,200 players; 32 teams; 34 depth-chart keys per team; 26 drafted starter slots; 930 unique named players in team depth charts, all present in PLAYERS; zero duplicate player names; zero rating fields outside 0–100; all drafted starter slots have a weight.
- Static markup audit found one doctype, one html element, one body element, no duplicate static IDs, and valid UTF-8.
- Candidate source has no rWeights reference. The older V20 failure evidence reports rWeights undefined in render100; the donor evidence reports that its limited report check passed.
- The remote heads available during this review were main, council-intake, feature/remove-guide-panel, gpt/multisport-strategy-proposal, and merge/v20-donor. There was no V21 ref.

### Checks that could not be completed

- Running node tests/madden-sim.spec.js stops immediately because @playwright/test is not installed. No dependency was installed.
- The browser E2E run was not completed. The available browser surface rejected opening the local file under its security policy; I did not attempt a workaround.
- Consequently, I did not verify draft → regular season → playoffs → Super Bowl, page errors, visual styling, dark/light appearance, keyboard behavior, or element-level 390px layout on the merged candidate.

The donor smoke record is not a candidate E2E result. It reports 832/832 draft picks and a rendered report, but the report was reached through a direct call and the recorded steps do not include starting a season or completing playoffs. The V20 smoke record fails its 100-season report and phone checks. Treat both files as useful lineage evidence, not as acceptance evidence for this merge.

## Findings and recommendations

### P0 — Establish the real build identity before calling anything V21

STATUS.md still says the merge is in flight and that the merged result has no hash. It names the old V20 reference and donor, while the merged artifact is present with a reproducible hash. tests/CONTRACT.md says it applies to the donor build at 77bb9ed5 and defaults to the donor filename. A verifier following those instructions can test the wrong artifact while believing it tested the candidate.

**Recommendation:** make one canonical build record that states, separately, the current certified build, candidate build, donor/base refs, artifact hash, byte count, and test status. Update STATUS only after evidence exists. Require test commands to take an explicit artifact path and print its hash before running. Never call an artifact V21 until the owner names it as the V21 candidate and its identity is recorded.

### P1 — Resolve the product entry point: season-first or draft-first

In the candidate, viewDraft is the active initial view. Season is offered as a tab inside Draft Complete results. There is no seasonHost element, and goSeason returns when that host is absent. Thus the retained Season-stage helper does not create a separate primary Season tab in this build. This differs from AGENTS.md, which describes Season as the default active tab and the whole site as living there.

**Recommendation:** make an explicit product decision before further UI merging. If Season-first remains the goal, design the actual first-run flow and markup around that goal, then integrate the paired render and event functions together. Do not transplant render functions independently from markup they expect. If Draft-first is intentionally retained, update the project guide and status so the product behavior and instructions agree. The first screen should explain the sequence and give a clear next action without assuming the user already knows the draft/season relationship.

### P0 — Build and run a candidate-level acceptance harness

The only checked-in test spec hardcodes a path on a particular Desktop machine to an older file. It also cannot run here because @playwright/test is unavailable. The contract names pw4.js, validate.js, phone.js, run_all.sh, and funcdiff.js, but those files are absent. It requires SIM-CORE markers and DOM-free entry points that the candidate does not have. The contract is therefore a future interface proposal, not an executable gate for this artifact.

**Recommendation:** implement the smallest harness that tests the real candidate, then make it the only published gate. At minimum:
1. Check artifact hash and JavaScript syntax.
2. Run a seeded full draft, verify 832 picks and roster invariants.
3. Start the season, simulate all 17 weeks, run each playoff round and the Super Bowl, and assert the champion and awards render.
4. Run the 100-season report through its user-facing control and verify completion.
5. Capture page errors and console errors.
6. At 390px, inspect key screens and distinguish true viewport overflow from content intentionally contained in a horizontal scroller.
7. Repeat a run with the same seed and verify identical outputs.

The test runner should fail loudly when a required step is skipped. It should not turn missing browser tooling into a pass.

### P1 — Add reproducible randomness and a save/resume path

The repository’s known-issues tracker records 58 unseeded Math.random uses and no local persistence. These limit reproducible bug reports, comparison of roster or weight changes, and the user’s ability to resume a long draft or season.

**Recommendation:** centralize randomness behind a seedable generator. Show the seed in the results and allow a user to copy it or rerun the same seed. Add local save/resume for the current draft and season only after the state schema is versioned and a reset/export path exists. A cloud account or paid service is not required.

### P1 — Finish the testable core boundary without prematurely refactoring the product

The contract’s proposed SIM-CORE markers and headless entry points are absent. The current single-file app mixes data, math, DOM rendering, simulation state, and event handlers. That makes the system hard to test and increases the chance that a function merge silently breaks its expected markup.

**Recommendation:** first introduce an explicit, documented boundary around shared data and pure simulation functions, then expose small DOM-free draft and league entry points. Keep the shipped deliverable as one self-contained HTML file for now. A source-module/build pipeline can be considered later as an owner-approved architecture change; it should generate the same offline-capable artifact and must not become a reason to destabilize V21.

### P2 — Correct the depth-chart documentation and record data provenance

The candidate has 34 depth-chart keys per team: 26 starter slots plus the eight listed reserve/special positions. AGENTS.md describes 36 roster slots per team. The data itself passed the basic consistency checks above, but no clear in-product source, capture date, correction process, or licensing note was visible during this review.

**Recommendation:** correct the 36-slot statement, document the difference between drafted starters and displayed depth-chart entries, and store data provenance/version metadata next to each dataset. For future all-time rosters, record source, era, position mapping, rating method, editor, and review status for every player record. Do not imply that an invented composite rating is an official rating.

### P2 — Improve form-control accessibility

At least five static select controls have no associated label or accessible name in the markup: teamFilter, groupSelect, draftPosFilter2, draftSort2, and draftView2. Their values may be visually understandable, but assistive technology should not have to infer the purpose from nearby layout or option text.

**Recommendation:** associate each select with a visible label or explicit aria-label/aria-labelledby, and include accessible status announcements when draft and simulation phases change. Add keyboard and screen-reader checks to acceptance, especially for the draft board, season controls, playoff bracket, and report accordions.

### P2 — Normalize the document head

The candidate places a style element before the explicit head element. Modern browsers generally recover by creating an implied head, but the source is nonconforming and older parsers discard or reorder the later head. Keep the existing lightweight style if needed, but place it inside head after charset and viewport metadata, then validate the structure with an HTML5-aware parser.

### P2 — Make mobile and theme checks meaningful

The donor smoke reports no page-level overflow while also listing many descendants wider than their immediate boxes. This is not automatically a defect: some tables sit in intentional horizontal scrollers, and the body clips overflow. The acceptance report must say whether the page itself scrolls sideways and separately inspect whether important controls or content are hidden inside the intended scroller.

**Recommendation:** test 390px after each major state transition: setup, live draft, draft results, preseason, weekly standings, playoffs, champion, and the 100-season report. Test both system light and dark preferences. Report the route, viewport, measured element, and its nearest scroll container.

### P2 — Keep the future multi-sport architecture explicit and bounded

The NFL app is currently a single sport-specific product, and its valuation, positions, roster rules, schedule, and scoring should remain NFL-owned. Reusing NFL math for NBA or soccer would create a false abstraction. At the same time, the intended set of current/all-time simulations benefits from a stable shared shell and tooling.

**Recommendation:** share only technology-level services initially: simulation selection and navigation, versioned dataset loading, seeded random source, save format, report layout primitives, accessibility helpers, and test runner. Give each sport its own rules package: positions/roles, roster construction, schedule, scoring model, replacement levels, and evaluation data. Treat current and all-time as explicit dataset/rules profiles, not as scattered conditionals. Deliver in the stated priority order: current NFL, NFL all-time, current NBA, NBA all-time, then other sports. Keep each sport independently testable and avoid a universal simulation engine until two real products demonstrate a stable common seam.

## Proposed V21 sequence

1. Owner confirms the authoritative base and the intended first-run product flow.
2. Architect publishes an assembled candidate with a manifest of each changed function, its required markup, and its source build hash.
3. Implement the seeded test seam and candidate-level acceptance driver.
4. Verify full draft → season → playoffs → Super Bowl, report rendering, browser errors, and 390px layouts.
5. Correct the build status, test contract, slot counts, and data provenance documentation.
6. Run an independent review against the exact candidate hash. Only then label and promote it as V21.
7. Park broad framework extraction until the current NFL experience is stable; make the boundary future-proof enough for NBA without making V21 carry the entire multi-sport roadmap.

## Council handoff

Please review these findings against the actual V21 build when it is available. Respond with a verdict per finding (accept, disagree, or defer), evidence and exact command or reproduction path, the build hash tested, any coupling to markup or state, and the smallest recommended action. Do not treat agreement among reviewers as proof. A claim becomes settled only after the assembled candidate has passed its stated checks. Keep proposed UI or math changes separate from Claude’s product implementation, and do not alter protected simulation constants without the owner’s explicit approval.
