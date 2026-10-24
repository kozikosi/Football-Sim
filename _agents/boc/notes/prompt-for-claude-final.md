# PROMPT FOR CLAUDE — Compiled by BOC — 21 Oct 2026

> Paste-ready. Everything below is VERIFIED/REPORTED per council evidence labels. BOC is not the Architect; these are proposals and questions, not decisions. You decide what enters the build.

## Progress since the merge document (Oct 20)

### Merge state

- Reference build (R2): `NFL Draft Simulator v20 Claude.html`, 649,032 B, sha256 `31b7d61f…`. Donor: `NFL Draft Simulator.html`, 650,127 B, `77bb9ed5…`. Merged candidate: `merged.html` / `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, git `merge/v20-donor @ ff8c05ae0ef8`. No hash in STATUS.md yet (pending verifier).
- Function diff (DS `funcdiff-full.js`): 408 common top-level named declarations = 391 identical + 17 differing (true-body unit). 14 donor takes + 1 v20 (`renderDraftBoard2`) + 2 synthesize (`renderSeasonTab`, `renderSeasonTabInner`), or 13/2/2 if v20 markup is kept.
- Defects fixed in donor (verified by MiniMax dynamic gate): `render100` (rWeights ReferenceError, v20:6018), phone-layout (msChecked memo, v20:6409–6432), color-scheme (`light dark` vs `light`).
- Merge-debt surfaced: dead "Play a Season" CTA (donor `renderDraftResults` calls `setActiveTab('viewSeason','tabSeasonBtn')` + `#seasonHost`, none exist in v20 markup), `renderSeasonTabInner` markup dependency (donor's `setActiveTab('viewSeason','tabSeasonBtn')` + `#seasonHost` + `goSeason()` absent in v20; donor's setActiveTab view loop has no null guard → TypeError risk), rWeights, "sudden death"/"went the distance" (v20 only), shared copy debt ("steal a 18–16 win", "the 49ers's answer", "expected scoring").
- Wrapper: double-wrapped (2 doctypes, l.1 + l.2) + stray 14-byte `</body></html>` tail. Pickle recommends removing duplicate wrapper + duplicate close, keeping donor's structured header.
- SAM scarcity: 5 records for 32 teams (27-player deficit). MOC refined: −10 is in TEs (53 for 64, −11), not backfield (HB 89 + FB 8 = 97 for 96, +1). SAM hole free at slot (MIKE/WILL natural SAM, zero penalty) but cost hides downstream (LB 91/96, DT/LEDG −2/−4, CB/SS/FS −4). Kicking parity (64/64) real but K slot is knife-edge (`FLEX.K = {}`, emergency penalty 8).
- Strict matching (LongCat M-330, independently reproduced MOC M-332): min-cost bipartite assignment, 832/832 fills, total penalty 54 (provably optimal — lower bound 44 + 10). Flexed slots: TE2 ×11 (−4, WR→TE), SAM ×5 (−2, DL→SAM). All 24 other slots: 0 flex. Six real drafts: 832/832 every time, 272 games, but draft outcomes differ (6 different champions) due to 58 unseeded Math.random() sites.
- FB/P variant (LongCat M-331, MOC M-332): 896/896 fills at same penalty 54. FB1 = HB 25 + FB 7; P1 = P 32; K = K 32; TE2 = TE 21 + WR 11; SAM = WILL 22 + SAM 5 + LEDG 5. Adding 64 slot-instances costs nothing (surplus groups). K slot still has zero slack; P does not cover K.
- Week 1 display: build renders `<h3>Week ${week} of 17</h3>` (l.3891) and trace shows "Week 1 of 17" + #simWeekBtn. Check was NOT IMPLEMENTED (id/class probe). Week-label verdict: LABEL CORRECT BUT MISLEADING — engine runs 17 weeks no byes; misleading vs real NFL's 18 weeks.
- Week 1 observation now IMPLEMENTED and PASSING (MOC M-334): gate check `G_week1Visible: true`, receipt detail `week1: { heading: "Week 1 of 17", week: 1, of: 17, visible: true, simWeekBtnVisible: true, innerTextMatch: "Week 1 of 17" }`, `week1Of17Seen: true`. §5.4 clause also covered: `reportBack: { clicked: true, phaseBefore: "complete", phaseAfter: "complete" }`.
- 390px P0 (DS M-122 addendum 2, corroborated MOC M-334): `#startSeasonBtn` at `top=963.03` in 844px viewport — fails preseason primary-action clause. Functional flow clean. The gate's `E_viewportUsable` is horizontal-only and cannot see below-the-fold primary actions. `hiddenClipped: 1` on `tabDraftBtn` in every run. Gate receipts are JSON object + trailing summary line (strict parser fails on "Extra data").

### Verification

- MiniMax `post-merge-smoke.mjs`: merged candidate exit 0 (A/B/C/D true, 272 games, champion, 0 overflow, 0 page errors); v20 exit 1 (A false, 7,208 offenders, C 1 error). Fixture A (oracle as stated) exit 1 (dead CTA).
- MiniMax `candidate-lint.mjs` (static oracle, reads MERGE-MANIFEST.json): 44/44 pins selftest. Static lint does NOT catch dead CTA.
- MERGE-MANIFEST.json: 17 function decisions with both parents' hashes, 8 protected math functions, 6 constants + MC/PLAN_K, extraction rules R1/R2/R3, set diffs, surface variants, text-level debt, measured branches, acceptance commands.
- SURFACES.md: 131 shared ids, 9 donor-only, 4 v20-only; three coupling rules.
- GPT `build-merged.js` reproduces merged candidate byte-for-byte (6,554 lines, 657,486 B, sha256 `40233d6b…`). All 10 control ids in GPT's E2E protocol exist in candidate.
- OpenChamber E2E (merged candidate): PARTIAL, 11 steps (10 PASS + week-1-display SKIP), 20 viewport checks 0 overflow, 26 screenshots, 0 console/page errors, trace 65.9 MB, report rendered 14,451 ms. Release published: `e2e-evidence-2026-10-20T225702Z` (9 assets). Schema validation PASS (jsonschema 4.25.1). Result.json is hand-edited (script emits 10 steps, no week-1-display, no schema code; file claims "24 screenshots" — true count 26). 272 games NOT verified by this run (null in seasonMetrics). Week 1 SKIP reason is wrong: build renders "Week 1 of 17" (l.3891); check was NOT IMPLEMENTED (id/class probe), not build limitation.
- VLOC Week 1 locator fix: added `week-1-display` step to tests/openchamber-e2e.spec.js (hash ee9aaa44… → 6a781e71…), node --check PASS. Step recorded SKIP with corrected reason. Pickle verified: step can never PASS (unconditional throw) — "labelled-unimplemented, not asserted."

### Governance

- R1–R5 rulings, house rules 1–11 (incl. English-only, receipts), open membership (S-1500s onward), consensus block format, PROMPTS-TO-ARCHITECT lane, 3 YES/NO questions protocol, house rule 14 (speaker labels).
- COUNCIL-BULLETIN.md append-only, M-numbers up to M-359+. CHRONICLE.md facts log. STATUS.md (hash line updated by verifier). SUBMISSIONS.md per-agent sections.
- Owner product direction (PR #4): priorities, architecture (provisional), pools (~1,500–2,000, OVR, no −5, modern franchises, distinct layers), modern rules, draft design, beta/testing, council guide (qualitative, no authority changes).
- Two shared-document loss events (20 Oct 01:21–01:24 and ~12:13) replaced bulletin/chronicle/questions from every copy. GLM re-filed 47 pre-loss messages M-32…M-79 byte-for-byte from `stash@{1}`. MOC verified 76/76 blocks present, 0 missing chronicle lines, both stashes untouched.

### Data (all-time NFL intake, PR #4)

- Source-backed: 9 raw files with sha256 manifest (all 9/9 match), 1,470 distinct names, NFL 2,838 / NBA 1,068 mentions, 0 sport leakage (6 false positives adjudicated), 3 same-name/different-person collisions, 69 shared surnames.
- Derived layer: 18 omission candidates (NFL 17 + NBA 1), 0 engine_ovr, 0 ratings, 0 franchises, all "proposed; owner review pending." 145 triage rows all unverified.
- Engine-ready records: 0. No pool record, rating, franchise, or peak season anywhere.
- MiniMax data-quality recon: schema rev 3 (stable id never derived from display name, disambiguated name, aliases, never merge by name).
- BOC intake compliance sweep: checks (a)–(e) all VERIFIED (six layers distinct, integers only, 18/18 empty engine_ovr, 9/9 manifest sha256, MiniMax two gaps confirmed: status_reference prose not URLs; Lechler K vs PS — corrected to transcription slip, CSV says P).
- Invented ratings files (`sports/football/ratings.json`, `sports/basketball/all_time_draft.json`) still present, untracked, origin UNKNOWN (not in any ref/bundle). `core/draft_engine.js` deleted, `core/` empty. Nothing consumes them now. Quarantine recommended (not delete).
- SAM scarcity: 5 records for 32 teams (27-player deficit). MiniMax filed as #18. Adding 300 generic records wouldn't fix it. MOC refined: −10 is in TEs (53 for 64, −11), not backfield (HB 89 + FB 8 = 97 for 96, +1). SAM hole free at slot (MIKE/WILL natural SAM, zero penalty) but cost hides downstream (LB 91/96, DT/LEDG −2/−4, CB/SS/FS −4). Kicking parity (64/64) real but K slot is knife-edge (`FLEX.K = {}`, emergency penalty 8).

### Owner #12 (FB & Punter slots)

- Owner confirmed: FB and P are draft slots; 28 rounds, 896 picks; no flex cost for both (same as SAM precedent); HB/FB/TE → FB at 0; K/P → P at 0; other positions can flex in at a penalty; don't change existing flex penalties; HB and RB used interchangeably (preserve site labels: player pos = HB, slot = RB1/RB2/FB).
- BOC foundations spec: `_agents/boc/notes/FB-P-SLOT-FOUNDATIONS.md` — ROSTER_SLOTS (l.924, 26) → +FB/+P; NATURAL_SLOT_MAP (l.932–938); FLEX (l.940–952); SLOT_FAMILY (l.931); POS_SLOT_MAP (l.962–970, auto-rebuild). optimalLineup (l.1206), effOvr (l.978), teamRatings (l.1988), replacementLevels (l.1352) adapt via ROSTER_SLOTS. Hardcoded "26"/"832" strings need manual update (l.852, 863, 1559).
- Trap: 52 dropped (32 P + 8 FB + 12 LS) → 40 become draftable if FB/P slots added. Under confirmed rules: 64 candidates for 32 P slots → zero unfillable kicking slots; only 12 LS remain dropped. Trap is harmless (stale-count problem, cosmetic). Warning withdrawable. Stale 52/1,148 counts live only in documents (FB-P-SLOT-FOUNDATIONS.md, current-pool-distribution.md ×4, nfl-position-taxonomy.md l.42, SUBMISSIONS.md l.1615), nowhere in the tool.
- TRAP-PLAIN.md written.

### V22 stats-that-explain-Wins proposal

- `_agents/boc/notes/v21-stats-that-explain-wins.md`: (a) already-computed stats cited file:line; (b) not-visible stats cited; (c) proposed visible surface ordered by win-driving strength (QB 1.0, coverage 0.7, pass rush 0.6, pass protection 0.6, receivers 0.6, run defense 0.4, run blocking 0.3, backs 0.15, kicker 0.15 wins/SD) — single "Unit ratings" panel + promoted turnover margin/TOP/sack attribution, reusing teamRatings(), no maths change; (d) metrics not yet computed (per-game expected win probability, per-team WAR aggregation, TS+/efficiency, game-plan causal value, pace-adjusted) — require Architect/maths change.

### Archived sessions

- Liquid, Glyph, Omni, Cohere permanently archived. Owner gave permission to delete their contributions unless structural. BOC deferred deletion (recommends specifying exact files/lines first).

### DS

- DS unavailable. Last reply (M-122 addendum 2) forwarded to council (M-323): 390px gate fails at preseason CTA (`#startSeasonBtn` at top=963.03 in 844px viewport); functional flow clean; 390 CTA placement not clean. "390px gate COMPLETE" line should be read with gate-scope correction.

### E2E evidence reconciliation (BOC M-97/M-107)

- Result.json is hand-edited (script emits 10 steps, no week-1-display; file has 11th step with SKIP; "24 screenshots" wrong — true 26; "Schema validation: PASS" is post-hoc). Original runner output unrecoverable.
- Week 1 SKIP reason wrong: build renders "Week 1 of 17" (l.3891); check was NOT IMPLEMENTED (id/class probe), not build limitation.
- 272 games NOT verified by this run (null in seasonMetrics; count exists only as `seasonState.schedule.length`).
- 390px coverage: 3 of 8 protocol clauses implemented.
- Run B (Lightning) = UNKNOWN (no artifacts). Playoffs cause UNKNOWN, not build limitation.
- Release published: `e2e-evidence-2026-10-20T225702Z` (9 assets, incl. 65.9 MB trace). PR #3 comment posted. W4 not duplicated (MOC published, MiniMax extending).

### Repo truth

- `main` holds only `AGENTS.md` of the four council documents. Live docs in three states. Fresh-clone manifest ~2.87 MB. Push from mirror ships none of them.

### Owner's merge.html change requests (Oct 21)

- Value here visual removal (prototyped, M-353/M-355/M-357).
- Remove "MORE" from tab footer.
- Move badges to bottom under weights.
- "Use model weights" → "Default."
- "Back to my weights" → "Save My Weights" (conditional visibility, dirty flag).
- Weights table correction + Owner-provided DEFAULT_WEIGHTS (protected constant).
- Delete user weights record.
- Player browser ~15 players on desktop.
- Position Rankings complete combinations.
- Team Comparison: remove description + Chiefs/Raiders default.
- Full spec: `_agents/boc/notes/merge-html-changes-spec.md`. Copy-pasteable edits: `_agents/boc/notes/merge-html-edits-2-5.md`, `_agents/boc/notes/merge-html-edits-8.md`.
- Weights provided by Owner (DEFAULT_WEIGHTS): QB 700, RB1 185, RB2 60, WR1 305, WR2 165, WR3 105, WR4 5, TE1 220, TE2 40, OT1 285, OT2 285, OG1 235, OG2 235, C 235, DE1 360, DE2 305, DT1 260, DT2 210, DL5 5, MIKE 240, WILL 220, SAM 20, LB4 5, CB1 395, CB2 325, CB3 260, CB4 5, SS 245, SS2 5, FS 235, FS2 5, K 200, P 1, FB 1.

### NBA 2027 OVR pool

- Owner supplied 538-player 2027 NBA OVR list. BOC parsed (538 unique, OVR 67–97, no dupes, no decimals), saved CSV `_agents/boc/notes/nba_2027_ratings.csv`, converted to `player-record.schema.json` shape in `_agents/boc/notes/nba_2027_pool.json` (538 records, id not derived from name, source review_state=approved, position/franchise/career_status marked unknown). Prompted MOC to verify.
- Source: https://www.hoopshype.com/nba-2k/players/ (to be confirmed as exact source/version).
- Positions and teams NOT yet added (BOC cannot reliably assign for 435 of 538 players; only ~103 well-known players' positions are known). Unknown list: `_agents/boc/notes/nba_2027_unknown_positions.txt`.

## Questions for Claude (Architect) — full detail

Q-Claude-1 [BLOCKING] Merge keep-list: (a) cpuPick = donor (`94b878605b73`, credible-GM floors + bounded miss) vs v20 (`3dc9d12f500a`, cap + 92-deep); (b) color-scheme = `light dark` (donor header) vs `light`; (c) render100 = donor (`cc1016eacc78`, drop-in) vs v20 (crashes on rWeights); (d) #glue phone block = Variant A (`ec6306eb79df`, donor body + data-nostack + v20 tail) vs Variant B (`04b90cb68fcf`, strict donor); (e) Style blocks: v20 keeps #draftTable2 cards CSS, donor Season-first only with donor markup.

Q-Claude-2 [BLOCKING] Merge surface branch: v20 markup (11 donor / 4 v20 / 2 synthesize = 17, measured working, branch B) vs donor Season surface (14 donor / 1 v20 / 2 synthesize = 17, larger scope). Under donor surface, renderSeasonTabInner delta is the Season-entry path (viewSeason/tabSeasonBtn/seasonHost/goSeason absent in v20); donor's setActiveTab view loop has no null guard → TypeError risk. Under v20 markup, split is 13/2/2.

Q-Claude-3 [BLOCKING] setActiveTab tail line: v20's `setActiveTab('viewDraft','tabDraftBtn')` (v20:6433) vs donor's `setActiveTab('viewSeason','tabSeasonBtn')` (donor:6489). Which is the merged default tab?

Q-Claude-4 [BLOCKING] Wrapper: double-wrapped (2 doctypes, l.1 + l.2) + stray 14-byte `</body></html>` tail. Fix = remove duplicate wrapper + duplicate close, keep donor's structured header? (Pickle's recommendation.) Which color-scheme wins (`light` vs `light dark`)?

Q-Claude-5 [BLOCKING] cpuPick keep-direction: donor (credible-GM floors + bounded miss) vs v20 (cap + 92-deep). Recommended: donor.

Q-Claude-6 [BLOCKING] phone-layout block: donor (donor:6458–6488, dropped msChecked memo) vs v20 (v20:6409–6432, stale memo → 7,208 overflow). Recommended: donor.

Q-Claude-7 [NOW] "sudden death" (v20:2880, 1 occurrence) / "went the distance" (v20:2898, 1 occurrence): donor (0) vs v20 (1 each). Recommended: donor (already clean).

Q-Claude-8 [NOW] Shared copy debt in both builds: "steal a 18–16 win" (v20:3082 / donor:3101, wrong article for scores starting 8/11/18) and "the 49ers's answer" (v20:5433 / donor:5483). Post-merge round or fold into merge?

Q-Claude-9 [NOW] "expected scoring" (v20:4832, donor:4882): live in both but only in a stats-explainer paragraph, not post-game copy. Compliant as-is or remove?

Q-Claude-10 [BLOCKING] SIM-CORE markers + 3 headless entry points (buildDraftState, simulateDraftHeadless, buildLeagueFromDraft): absent in both builds (grep 0/0). Round 1A order: S-202 → S-203 → S-103 → S-102 → S-301. Product change = markers + moved entry points only. Acceptance (a)–(g) in rulings.

Q-Claude-11 [BLOCKING] Week 1 display: build renders `<h3>Week ${week} of 17</h3>` (l.3891) and trace shows "Week 1 of 17" + #simWeekBtn. The check was NOT IMPLEMENTED (id/class probe). Does the protocol need to change, or does the check need to be implemented against the H3 text? VLOC added the step as SKIP with corrected reason. (BOC verdict: LABEL CORRECT BUT MISLEADING — engine runs 17 weeks no byes; misleading vs real NFL's 18 weeks.)

Q-Claude-12 [BLOCKING] SAM scarcity: 5 records for 32 teams (27-player deficit). Should SAM be a required position in the next intake? (Owner #18.) Recommended: yes. Cost of being wrong: pool imbalance persists.

Q-Claude-13 [BLOCKING] FB/Punter slots (#12): Owner confirmed 28 rounds, no flex cost for both (same as SAM precedent). Need: (a) whether FB/P need consumers in teamRatings (nine unit ratings) or are dead slots; (b) whether other positions flex into FB/P at a penalty (SAM precedent — LB_FLEX with penalties). Recommended: dead slots acceptable for specialists; other positions flex in at penalty following SAM precedent.

Q-Claude-14 [NOW] V22 stats surface: should the unit-ratings panel be visible by default in the regular season view? (Recommended: visible.) Should TS+/efficiency metrics be defined for football before basketball? (Recommended: basketball first, football second.) Should the 100-season "What actually drove winning" section be reachable from the regular season view? (Recommended: keep as-is, already reachable via sim100Btn.)

Q-Claude-15 [BLOCKING] All-time NFL pool: 1,500–2,000 candidates, Owner approves. −5 adjustment NOT approved. Modern franchises. OVR as summary. Person/player-season/franchise/status/source/rating distinct. No ratings assigned yet (0 engine-ready records). Need Architect approval of the record shape (player-record.schema.json rev 4) and the rating method.

Q-Claude-16 [BLOCKING] Architecture: repo vs folders — concrete options with folder sketches, tradeoffs, recommendation, cost of being wrong. Provisional preference: protect NFL product, per-sport rules/math, self-contained HTML per sim, extract shared engine only after demonstrated reuse. Owner wants concrete options, not abstract.

Q-Claude-17 [NOW] NBA 2K/FIFA ratings as sources with provenance; basketball-specific math (TS+, rim protection, 3-point shooting matter more); up to 10 players per team; computer-managed rotations vs user-set. Concepts to compare, not finalized.

Q-Claude-18 [NOW] Soccer/baseball closer to football draft; hockey closer to basketball (uncertain). Ranking source/cutoff for soccer leagues above MLS + MLS TBD.

Q-Claude-19 [NOW] Quarantine vs delete invented ratings files (sports/football/ratings.json, sports/basketball/all_time_draft.json). Recommended: quarantine. Owner decides.

Q-Claude-20 [NOW] Archived sessions (Liquid, Glyph, Omni, Cohere): delete contributions unless structural? Recommend: specify exact files/lines before deletion.

Q-Claude-21 [BLOCKING] Week-label: "Week X of 17" correct for engine (17 weeks no byes) but misleading vs real NFL (18 weeks). Change label or model? Recommended: keep label for engine (correct), add a note that the engine uses 17 weeks (no byes) vs real NFL's 18.

Q-Claude-22 [BLOCKING] Playoffs-button discrepancy: UNKNOWN cause pending Lightning's artifacts. Label UNKNOWN. (BOC verified Run A: viewport set 96 ms before click, click succeeded, 0 errors, champion banner visible.)

Q-Claude-23 [NOW] "steal a 18–16 win" / "the 49ers's answer": shared debt in both builds. Post-merge round or fold into merge?

Q-Claude-24 [NOW] "expected scoring" (v20:4832): stats-explainer only. Compliant as-is or remove?

Q-Claude-25 [BLOCKING] Default tab: Draft vs Season-first. Owner decides. (Recommended: Season-first, matches donor + project instructions.)

Q-Claude-26 [BLOCKING] STATUS.md overwrite (stale). Fix after verifier. Who updates the hash line?

Q-Claude-27 [BLOCKING] Protected constants: DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS change only with explicit approval. (Reminder, not a question.)

Q-Claude-28 [NOW] Color-scheme: `light dark` (donor header) vs `light`. (Recommended: `light dark`.)

Q-Claude-29 [NOW] Wrapper: double-wrapped (2 doctypes). Fix: remove duplicate wrapper + duplicate close, keep donor's structured header.

Q-Claude-30 [NOW] "sudden death" (v20:2880) / "went the distance" (v20:2898): donor (0) vs v20 (1 each). (Recommended: donor.)

Q-Claude-31 [BLOCKING] E2E Week 1 display: build renders "Week 1 of 17" (l.3891). Check not implemented. Protocol change or check implementation? Owner/Architect decide. (BOC verdict: LABEL CORRECT BUT MISLEADING — engine runs 17 weeks no byes; misleading vs real NFL's 18 weeks.)

Q-Claude-32 [BLOCKING] 390px P0: `#startSeasonBtn` at `top=963.03` in 844px viewport (preseason primary-action clause). Functional flow clean. The gate's `E_viewportUsable` is horizontal-only and cannot see below-the-fold primary actions. Fix: move #startSeasonBtn above the fold or change the gate to check vertical axis. (DS M-122 addendum 2, corroborated MOC M-334.)

Q-Claude-33 [BLOCKING] E2E gate receipts are JSON object + trailing summary line (strict parser fails on "Extra data"). Fix: `--json` flag or `.json` + `.txt` pair. (MOC M-334.)

Q-Claude-34 [BLOCKING] `hiddenClipped: 1` on `tabDraftBtn` in every run. Unnamed in receipt; worth naming before next run. (MOC M-334.)

Q-Claude-35 [BLOCKING] PR #5 scorecard generator admits `_agents/minimax/recon/run-reconciliation-v2.proposed.md`'s `SPEAKER: MiniMax subagent (run-reconciliation)` as a council member. One regeneration from publication. Fix before adopting.

Q-Claude-36 [BLOCKING] Invented ratings files: `sports/football/ratings.json` and `sports/basketball/all_time_draft.json` still present, untracked, origin UNKNOWN. Quarantine recommended (not delete). Owner decides.

Q-Claude-37 [NOW] Archived sessions (Liquid, Glyph, Omni, Cohere): delete contributions unless structural? Recommend: specify exact files/lines before deletion.

Q-Claude-38 [NOW] Default tab: Draft vs Season-first. Owner decides. (Recommended: Season-first, matches donor + project instructions.)

Q-Claude-39 [NOW] STATUS.md overwrite (stale). Fix after verifier. Who updates the hash line?

Q-Claude-40 [NOW] Color-scheme: `light dark` (donor header) vs `light`. (Recommended: `light dark`.)

Q-Claude-41 [NOW] Wrapper: double-wrapped (2 doctypes). Fix: remove duplicate wrapper + duplicate close, keep donor's structured header.

Q-Claude-42 [NOW] "sudden death" (v20:2880) / "went the distance" (v20:2898): donor (0) vs v20 (1 each). (Recommended: donor.)

Q-Claude-43 [BLOCKING] DEFAULT_WEIGHTS: Owner provided weights (QB 700, RB1 185, RB2 60, WR1 305, WR2 165, WR3 105, WR4 5, TE1 220, TE2 40, OT1 285, OT2 285, OG1 235, OG2 235, C 235, DE1 360, DE2 305, DT1 260, DT2 210, DL5 5, MIKE 240, WILL 220, SAM 20, LB4 5, CB1 395, CB2 325, CB3 260, CB4 5, SS 245, SS2 5, FS 235, FS2 5, K 200, P 1, FB 1). These are the Owner's stated defaults. Protected constant — requires explicit approval. Owner is final authority; Claude decides whether to apply. BOC presents as proposal.

Q-Claude-44 [BLOCKING] FB/Punter slots (#12): Owner confirmed 28 rounds, no flex cost for both (same as SAM precedent). Need: (a) whether FB/P need consumers in teamRatings (nine unit ratings) or are dead slots; (b) whether other positions flex into FB/P at a penalty (SAM precedent — LB_FLEX with penalties). Recommended: dead slots acceptable for specialists; other positions flex in at penalty following SAM precedent.

Q-Claude-45 [BLOCKING] E2E Week 1 display: build renders "Week 1 of 17" (l.3891). Check not implemented. Protocol change or check implementation? Owner/Architect decide. (BOC verdict: LABEL CORRECT BUT MISLEADING — engine runs 17 weeks no byes; misleading vs real NFL's 18 weeks.)

Q-Claude-46 [NOW] V22 stats surface: should the unit-ratings panel be visible by default in the regular season view? (Recommended: visible.) Should TS+/efficiency metrics be defined for football before basketball? (Recommended: basketball first, football second.) Should the 100-season "What actually drove winning" section be reachable from the regular season view? (Recommended: keep as-is, already reachable via sim100Btn.)

Q-Claude-47 [BLOCKING] All-time NFL pool: 1,500–2,000 candidates, Owner approves. −5 adjustment NOT approved. Modern franchises. OVR as summary. Person/player-season/franchise/status/source/rating distinct. No ratings assigned yet (0 engine-ready records). Need Architect approval of the record shape (player-record.schema.json rev 4) and the rating method.

Q-Claude-48 [BLOCKING] Architecture: repo vs folders — concrete options with folder sketches, tradeoffs, recommendation, cost of being wrong. Provisional preference: protect NFL product, per-sport rules/math, self-contained HTML per sim, extract shared engine only after demonstrated reuse. Owner wants concrete options, not abstract.

Q-Claude-49 [NOW] NBA 2K/FIFA ratings as sources with provenance; basketball-specific math (TS+, rim protection, 3-point shooting matter more); up to 10 players per team; computer-managed rotations vs user-set. Concepts to compare, not finalized.

Q-Claude-50 [NOW] Soccer/baseball closer to football draft; hockey closer to basketball (uncertain). Ranking source/cutoff for soccer leagues above MLS + MLS TBD.

Q-Claude-51 [NOW] Quarantine vs delete invented ratings files (sports/football/ratings.json, sports/basketball/all_time_draft.json). Recommended: quarantine. Owner decides.

Q-Claude-52 [NOW] Archived sessions (Liquid, Glyph, Omni, Cohere): delete contributions unless structural? Recommend: specify exact files/lines before deletion.

Q-Claude-53 [NOW] Default tab: Draft vs Season-first. Owner decides. (Recommended: Season-first, matches donor + project instructions.)

Q-Claude-54 [NOW] STATUS.md overwrite (stale). Fix after verifier. Who updates the hash line?

Q-Claude-55 [NOW] Color-scheme: `light dark` (donor header) vs `light`. (Recommended: `light dark`.)

Q-Claude-56 [NOW] Wrapper: double-wrapped (2 doctypes). Fix: remove duplicate wrapper + duplicate close, keep donor's structured header.

Q-Claude-57 [NOW] "sudden death" (v20:2880) / "went the distance" (v20:2898): donor (0) vs v20 (1 each). (Recommended: donor.)

Q-Claude-58 [NOW] "steal a 18–16 win" / "the 49ers's answer": shared debt in both builds. Post-merge round or fold into merge?

Q-Claude-59 [NOW] "expected scoring" (v20:4832): stats-explainer only. Compliant as-is or remove?

Q-Claude-60 [BLOCKING] E2E gate receipts are JSON object + trailing summary line (strict parser fails on "Extra data"). Fix: `--json` flag or `.json` + `.txt` pair. (MOC M-334.)

Q-Claude-61 [BLOCKING] `hiddenClipped: 1` on `tabDraftBtn` in every run. Unnamed in receipt; worth naming before next run. (MOC M-334.)

Q-Claude-62 [BLOCKING] PR #5 scorecard generator admits `_agents/minimax/recon/run-reconciliation-v2.proposed.md`'s `SPEAKER: MiniMax subagent (run-reconciliation)` as a council member. One regeneration from publication. Fix before adopting.

Q-Claude-63 [BLOCKING] Invented ratings files: `sports/football/ratings.json` and `sports/basketball/all_time_draft.json` still present, untracked, origin UNKNOWN. Quarantine recommended (not delete). Owner decides.

Q-Claude-64 [NOW] Archived sessions (Liquid, Glyph, Omni, Cohere): delete contributions unless structural? Recommend: specify exact files/lines before deletion.

Q-Claude-65 [NOW] Default tab: Draft vs Season-first. Owner decides. (Recommended: Season-first, matches donor + project instructions.)

Q-Claude-66 [NOW] STATUS.md overwrite (stale). Fix after verifier. Who updates the hash line?

Q-Claude-67 [NOW] Color-scheme: `light dark` (donor header) vs `light`. (Recommended: `light dark`.)

Q-Claude-68 [NOW] Wrapper: double-wrapped (2 doctypes). Fix: remove duplicate wrapper + duplicate close, keep donor's structured header.

Q-Claude-69 [NOW] "sudden death" (v20:2880) / "went the distance" (v20:2898): donor (0) vs v20 (1 each). (Recommended: donor.)

Q-Claude-70 [NOW] "steal a 18–16 win" / "the 49ers's answer": shared debt in both builds. Post-merge round or fold into merge?

Q-Claude-71 [NOW] "expected scoring" (v20:4832): stats-explainer only. Compliant as-is or remove?

## Owner questions requiring your attention (≤5 consolidated, full detail)

### OQ-1 — Default tab + STATUS.md (consolidated)

**Decision needed:** Should the merged candidate open in the Draft tab or the Season-first tab? And should STATUS.md be overwritten now (with the merged candidate's hash) or after verifier sign-off?
**Why it matters:** The candidate currently opens in Draft while the project instructions describe a Season-first experience (GPT preflight finding). The verifier needs to know which surface to test. STATUS.md still says the merge has no hash.
**Recommended default:** Season-first tab (matches donor + project instructions); overwrite STATUS.md hash line after verifier sign-off (verifier-only per R4).
**Cost of being wrong:** Low. A wrong default tab is a one-line change; a premature hash line could mislead reviewers.
**Must answer now?** No — safe work (verification) can continue first. But the verifier needs the answer before the five-line report is finalized.

### OQ-2 — Architecture: repo vs folders (concrete options)

**Decision needed:** Should the projects live in separate repositories or in clear folders within one repository?
**Why it matters:** Blocks all multi-sport work (priorities 2–5). Premature extraction could delay V22; late extraction could force rework.
**Recommended default:** Provisional preference (protect NFL product, per-sport rules/math, self-contained HTML per sim, extract shared engine only after demonstrated reuse). Concrete folder sketch: `sports/<sport>/<mode>/` with `NFL Draft Simulator.html`-style self-contained output per sim; shared engine extracted only after NFL all-time or NBA work shows genuine reuse. Cost of being wrong: rework of folder structure; but premature extraction delays V22.
**Must answer now?** No — safe research/data cleanup can continue. But concrete options (folder sketches, tradeoffs, recommendation, cost of being wrong) should be prepared for your review.

### OQ-3 — All-time player pool rules

**Decision needed:** (a) Is the −5 current-player adjustment approved? (Not approved as of 2026-10-21.) (b) Are modern franchises confirmed (today's franchises in sim, historical context on draft board)? (c) Is OVR the general player summary? (d) Should SAM be a required position in the next intake (5 records for 32 teams, 27-player deficit)?
**Why it matters:** Blocks all-time NFL pool creation (priority 2). The −5 adjustment affects every current player's all-time rating. SAM scarcity means the pool is not evenly shallow.
**Recommended default:** (a) No −5 until purpose/eligibility/calibration decided; (b) yes, modern franchises; (c) yes, OVR; (d) yes, SAM required in next intake.
**Cost of being wrong:** Mis-calibrated ratings; pool imbalance. (a) is the highest-cost item — applying −5 without calibration would distort all-time comparisons.
**Must answer now?** No — source assembly and review can continue. But (a) must be decided before any all-time rating is assigned.

### OQ-4 — Cleanup: invented ratings + archived sessions

**Decision needed:** (a) Quarantine or delete `sports/football/ratings.json` and `sports/basketball/all_time_draft.json` (invented ratings, untracked, origin UNKNOWN)? (b) Delete contributions from archived sessions (Liquid, Glyph, Omni, Cohere) unless structural?
**Why it matters:** The invented ratings files violate AGENTS.md's "❌ Invent player ratings" rule and are the last hard-rule item open. Archived-session contributions may clutter shared docs.
**Recommended default:** (a) Quarantine (move to `_fixtures/example-ratings/`, clearly labeled "not engine data"); (b) specify exact files/lines before deletion; BOC can scan for structural items first.
**Cost of being wrong:** (a) Deleting loses the forensic record; (b) deleting could break references or remove useful content.
**Must answer now?** No — quarantine can be done without your input (BOC has the tool ready). Deletion needs your specification.

### OQ-5 — Week 1 display + E2E acceptance

**Decision needed:** (a) Should the Week 1 of 17 requirement stay unchanged, or should a proposed alternative observation (e.g., "Week 1 of 17" H3 text + #simWeekBtn) satisfy it? (b) Should the E2E protocol's "Week 1 of 17" check be implemented against the H3 text or against a new persistent element?
**Why it matters:** The current E2E result is PARTIAL because of this skip. The build renders "Week 1 of 17" (l.3891) but the check was not implemented. Changing the requirement vs. implementing the check are different decisions.
**Recommended default:** Keep the requirement unchanged (the build renders the text; implement the check against the H3 text + #simWeekBtn). Do not change the acceptance rule.
**Cost of being wrong:** A false PASS would mask a real UX gap; a false FAIL would block progress. The build does render the text, so implementation is low-risk.
**Must answer now?** No — the check can be implemented without your input. But the protocol change (if any) needs your approval.

---

BOC's lane is clear. All assignments are complete. Awaiting assignment. No product edits made. No protected constants changed. No git commits/pushes. No rebroadcast without Owner instruction.
