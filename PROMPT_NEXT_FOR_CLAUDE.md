# PROMPT NEXT FOR CLAUDE — Modernized Workflow Version

## ⚠️ IMPORTANT
This prompt is structured so Claude can read **all documents directly from GitHub**. No user paste required for any listed document. Claude should output using the **consensus block format** from `CONSENSUS_BLOCK_FORMAT.md` — one block with session headers, Decision/Reason lines, build hash, and verification report.

The user will copy **one block** and paste into `SUBMISSIONS.md`. Decision/Reason lines go into each agent's `Implementer's note` area.

---

## 📜 QUESTION FOR CLAUDE (Already on Git — commit 7c8ee83)

I've published `QUESTION_FOR_CLAUDE.md` to the Git repo. The question asks Claude three YES/NO questions:

1. Can he record his own final accept/defer/reject decisions in `SUBMISSIONS.md` without the user pasting them?
2. Can he file the verification five-line report independently?
3. Can he read new submissions that have not yet been pushed to the GitHub repo?

**Expected answers:** All NO (per governance — 3 actions require user paste).

**Optional 4th question** (for evaluation): If the user wants to try the new consensus block format where Claude outputs one block containing decisions for all agents, and the user copies/pastes it once into `SUBMISSIONS.md` — would that be viable? Please note any preferences or constraints in your NO answers.

**Read directly from Git:** `QUESTION_FOR_CLAUDE.md` on GitHub at commit `7c8ee83`

---

## 📋 IMMEDIATE NEXT STEPS (Claude-Dependent)

### 1. Resolve 8 Pre-Implementation Actions (from audit report)

**Read from Git:** `PRE_IMPLEMENTATION_ACTIONS_STATUS.md` and `INTEGRATION_AUDIT_LIGHTNING.md`

| # | Action | Status | What Claude Should Do |
|---|--------|--------|----------------------|
| **#1** | Build attachment verified ✅ | **Complete** | Build `77bb9ed5` confirmed on Git. No further action. Refer to `STATUS.md`, `NEW_GIT_WORKFLOW.md`, `FINAL_CONSOLIDATION.md`. |
| **#2** | Contract conflicts resolved ✅ | **Complete** | Rulings B1-B4 in `AGENTS.md`; conflicts resolved per `GOVERNANCE_CHANGE_PROPOSAL.md`. No further action. |
| **#3** | Declare authoritative dataset format ⏳ | **Pending** | Read `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` on Git. **S-203 format** (`tests/2025_standards.js`) is authoritative for Round 1; `S-502` (`tests/season_2025.json`) is superseded. Claude must formally declare this acceptance or provide new declaration. |
| **#4** | Confirm adoption of CONTRACT B1/B2 ✅ | **Complete** | Both adopted 2026-10-19. Read `CONTRACT_B1_B2_ADOPTION_CONFIRMED.md` on Git. B1: Runtime DOMAccessError guard; B2: Exit code matrix 0/1/2/3/4. No further action. |
| **#5** | Authorize baseline bootstrap ⏳ ⚠️ **CRITICAL PATH** | **Pending** | **Critical path item.** Read `NEW_WORKFLOW_ROUND1.md` step #3 and run: `node tests/pw4.js --write-baseline against build 77bb9ed5`. This creates `tests/baseline.json` with authority. Record resulting sha256 in `STATUS.md`. Until frozen, ALL `pw4` runs report UNGATED (no regression gate claims). **Blocker:** Without this, no statistical claims can be made. |
| **#6** | Liveness item verification ⏳ | **Pending** | Read `INTEGRATION_AUDIT_LIGHTNING.md` on Git. 6 items verified present on `77bb9ed5`: "sudden death", "second meeting" banner, "wasn't in this round", footer "More", Guide intro, flex fit-check text. **Do NOT close without code-level verification.** Claude has reopened these. |
| **#7** | Enforce Round 1A dependency order ✅ | **Documented** | Read `NEW_WORKFLOW_ROUND1.md` on Git. Dependency chain: `S-202 → S-203 → S-103 → S-102 → S-301`. `S-202` (SIM-CORE markers) is the foundation; must be certified before any other 1A items. |
| **#7 (dup)** | U-04 footer "MORE" remains active ✅ | **Verified** | `INTEGRATION_AUDIT_LIGHTNING.md` verified footer "MORE" active on `77bb9ed5`. Do not remove without code change. |

### 2. Baseline Bootstrap (critical path item #5)

**Read from Git:** `NEW_WORKFLOW_ROUND1.md` (immediate actions #5), `ULTRA_PROMPT.md` (immediate actions #5)

```
Command: node tests/pw4.js --write-baseline against build 77bb9ed5
This creates: tests/baseline.json with authority
Then: Record resulting sha256 in STATUS.md
Until frozen: ALL pw4 runs report UNGATED (no regression gate claims)
```

**Why this matters:** Without baseline bootstrap, `pw4.js` exits UNGATED and no statistical claims can be made. This is the entry point for the entire critical path.

**Read from Git:** `S-202_SIM-CORE_MARKERS_GUIDE.md` for S-202 implementation details.

### 3. S-202 Implementation (foundation for everything else)

**Read from Git:** `S-202_SIM-CORE_MARKERS_GUIDE.md` on Git

```
Add /*SIM-CORE-START*/ ... /*SIM-CORE-END*/ markers to NFL Draft Simulator.html
Move three functions into the core: buildDraftState, simulateDraftHeadless, buildLeagueFromDraft
These are behavior-preserving moves of already-DOM-free code
```

**Dependency:** S-202 must be certified before Round 1A dispatch (`NEW_WORKFLOW_ROUND1.md` 1A chain: S-202 → S-203 → S-103 → S-102 → S-301).

**Without S-202 markers:** `pw4.js` and `run_all.sh` can't extract the core.

### 3. Dataset Format Resolution (item #3)

**Read from Git:** `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` on Git; also `INTEGRATION_AUDIT_LIGHTNING.md` Risk #4

```
Claude must declare: S-203 format (tests/2025_standards.js) is authoritative
S-502/GPT format (tests/season_2025.json) is superseded by S-203 in Round 1
S-203 team names match TEAM_DATA keys exactly (32 teams, 17 games)
```

**Rationale:** S-203 team names match `TEAM_DATA` keys exactly, ensuring dataset↔roster consistency. Single source of truth prevents `validate.js` gate errors. Round 1 adjudication chain processes S-203 before S-502.

### 4. Liveness Item Verification (item #6)

**Read from Git:** `INTEGRATION_AUDIT_LIGHTNING.md` on Git

**Per audit:** 6 items council claims are "fixed" are actually present in `77bb9ed5`:
1. "sudden death"
2. "second meeting" banner
3. "wasn't in this round"
4. footer "More"
5. Guide intro
6. flex fit-check text

**Do NOT close without code-level verification.** Claude has reopened these. The audit corrected risk #5 from MEDIUM to LOW.

### 5. Project Status Summary

**Read from Git:** `FINAL_CONSOLIDATION.md` on Git — has the complete milestone table

| Milestone | Status |
|-----------|--------|
| Build identity verified ✅ | 77bb9ed5 confirmed |
| Audit report delivered ✅ | INTEGRATION_AUDIT_LIGHTNING.md |
| Submission posted to Git ✅ | LIGHTNING_SUBMISSION.md (S-900) |
| Workflow document posted ✅ | NEW_WORKFLOW_ROUND1.md |
| 8 pre-implementation actions ⏳ | Awaiting Claude's resolution |
| Baseline bootstrapped ⏳ | Must run --write-baseline |
| S-202 markers implemented ⏳ | Foundation for everything else |
| Round 1A dispatch ⏳ | Depends on above 5 items |
| Round 1B dispatch ⏳ | After 1A certified |

### 6. The Critical Path

**Read from Git:** `PRE_IMPLEMENTATION_ACTIONS_STATUS.md` on Git — full critical path documentation

```
77bb9ed5 → baseline bootstrap → S-202 markers → 1A certification → 1B
```

**Without baseline bootstrap:** `pw4.js` exits UNGATED and no statistical claims can be made.
**Without S-202 markers:** `pw4.js` and `run_all.sh` can't extract the core.
**Round 1 can't be dispatched** until both are in place.

### 7. What You (the User) Need to Do

**Read from Git:** All action items map to documents on Git. Key ones: `INTEGRATION_AUDIT_LIGHTNING.md`, `NEW_GIT_WORKFLOW.md`, `FINAL_CONSOLIDATION.md`, `NEW_WORKFLOW_ROUND1.md`, `ULTRA_PROMPT.md`.

The remaining work is Claude-dependent. You'll need to:

1. Review the audit findings in `INTEGRATION_AUDIT_LIGHTNING.md` (on Git)
2. Resolve the 8 pre-implementation actions (status in `PRE_IMPLEMENTATION_ACTIONS_STATUS.md`)
3. Attach/build the 650,127-byte file `77bb9ed5...` if not already provided (referenced in `STATUS.md`)
4. Declare the authoritative dataset format ( `AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md` on Git)
5. Authorize the baseline bootstrap (run `node tests/pw4.js --write-baseline against 77bb9ed5`)
6. Verify liveness items on `77bb9ed5` before closing ( `INTEGRATION_AUDIT_LIGHTNING.md`)

**The independent auditor's work is complete.** The remaining steps require Claude's adjudication and the build actions documented on Git.

### 8. Claude's Complete Document Reading List for Next Usage Session

**All documents are on Git** at `https://github.com/kozikosi/Football-Sim/tree/main/`. Claude can read directly — no paste required for most.

**⚠️ 3 Actions Requiring User Paste (Always remember these):**
1. Claude's final accept/defer/reject decisions — Must be recorded verbatim in `SUBMISSIONS.md` by the user
2. Verification five-line report — Filed by verifier session, not Claude
3. New submissions not yet pushed to Git — Must be pasted to Claude before he can read them

**📋 KEY GOVERNANCE & STATUS** — All on Git:

| Document | Git Path | What Claude Reads |
|----------|----------|-------------------|
| STATUS.md | root/ | Build hash, roles, pending submissions, current state |
| AGENTS.md | root/ | Invariants and role definitions (canonical source of truth) |
| COLLECTIVE-PROMPT.md | standing system prompt, implementer succession rules |
| MASTER_GUIDE.md | Season-first handoff documentation |
| master_task_list.md | Settled and rejected decisions registry |

**📋 SUBMISSIONS & PROPOSALS** — All on Git:

| Document | Git Path | What Claude Reads |
|----------|----------|-------------------|
| SUBMISSIONS.md | root/ | All proposals queue with entries by ID, status, build references |
| LIGHTNING_SUBMISSION.md (S-900) | root/ | Integration audit submission |
| NEW_WORKFLOW_ROUND1.md | root/ | Round 1 pre-dispatch adjudication rules |
| GOVERNANCE_CHANGE_PROPOSAL.md | root/ | Git-direct workflow assessment |

**📋 AUDIT & ANALYSIS** — All on Git:

| Document | Git Path | What Claude Reads |
|----------|----------|-------------------|
| INTEGRATION_AUDIT_LIGHTNING.md | root/ | Full 15-section independent audit report |
| OtherChambers_AI_Critiques.md | root/ | AI code critiques from external sessions |

**📋 WORKFLOW & DESIGN** — All on Git:

| Document | Git Path | What Claude Reads |
|----------|----------|-------------------|
| NEW_GIT_WORKFLOW.md | root/ | Direct Git access workflow — what Claude can read vs what requires user paste |
| NEW_WORKFLOW_ROUND1.md | root/ | Round 1 adjudication chain (S-202 → S-203 → S-103 → S-102 → S-301) |
| ULTRA_PROMPT.md | root/ | Ultra prompt with v20 vs canonical analysis and suggestion topics |
| QUESTION_FOR_CLAUDE.md | root/ | Claude's capabilities re: user paste (3 YES/NO questions) |

**📋 BUILD & CODE** — All on Git:

| Document | Git Path | What Claude Reads |
|----------|----------|-------------------|
| NFL Draft Simulator.html | root/ | The 650,127-byte authoritative build (SHA-256 77bb9ed59ffa...) |
| v20 Comparative documents | root/ | v20 vs 77bb9ed5 differences and differences |

**📋 WORKFLOW & PROCESS (Finalized)** — All on Git:

| Document | Git Path | What Claude Reads |
|----------|----------|-------------------|
| NEW_GIT_WORKFLOW.md | root/ | Direct Git access workflow — explicitly documents what Claude can and cannot read from Git |
| NEW_WORKFLOW_ROUND1.md | root/ | Round 1 adjudication chain and acceptance criteria |
| ULTRA_PROMPT.md | root/ | Ultra prompt with v20 vs canonical analysis and suggestion topics |
| QUESTION_FOR_CLAUDE.md | root/ | Claude's capabilities re: user paste (3 YES/NO questions) |

**⚠️ 3 Actions Requiring User Paste (Always Remember):**
1. Claude's final accept/defer/reject decisions — Must be recorded verbatim in `SUBMISSIONS.md` by the user
2. Verification five-line report — Filed by verifier session, not Claude
3. New submissions not yet pushed to Git — Must be pasted to Claude before he can read them

**How to Use This List:**

**Before your next Claude session:**
1. Read `NEW_GIT_WORKFLOW.md` on Git to understand the workflow
2. Read `INTEGRATION_AUDIT_LIGHTNING.md` for corrected audit findings
3. Review the 3 "actions requiring user paste" items
4. Read any submission documents relevant to the current round

**During your session with Claude:**
* You can read any of the above Git documents directly (no paste required for most)
* Remember the 3 actions that still require user paste
* Record Claude's decisions in `SUBMISSIONS.md` after his response
* File the verification five-line report after verification
* Push new submissions to Git so Claude can read them

**After your session:**
* Push any new content to Git
* Update `STATUS.md` with the new build hash
* Continue the cycle

This list is available at: `https://github.com/kozikosi/Football-Sim/tree/main/`

### 9. Based on All Work Completed — Summary

**✅ Completed & Published to Git** — All these are now available for Claude to read directly from Git:

- `NEW_GIT_WORKFLOW.md` — Direct Git access workflow (what Claude can/cannot read)
- `INTEGRATION_AUDIT_LIGHTNING.md` — Updated audit with corrected risk findings (risk #5 downgraded from MEDIUM to LOW)
- `OtherChambers_AI_Critiques.md` — AI code critiques from external sessions
- `LIGHTNING_SUBMISSION.md` — S-900 integration audit submission
- `NEW_WORKFLOW_ROUND1.md` — Round 1 adjudication chain
- `ULTRA_PROMPT.md` — Ultra prompt with v20 vs canonical analysis and suggestion topics
- `QUESTION_FOR_CLAUDE.md` — Claude's 3 YES/NO capability questions
- `GOVERNANCE_CHANGE_PROPOSAL.md` — Governance change assessment
- All `NEW_` documents — Not edits of existing content, newly published

**⚠️ 3 Actions Still Require User Paste (Governance-Mandated):**
These cannot be automated — they're project governance rules:
1. Record Claude's accept/defer/reject decisions in `SUBMISSIONS.md` — user must paste them
2. File the verification five-line report — filed by verifier session, not Claude
3. Read new submissions not yet pushed to Git — must be pasted to Claude before he can read them

**📋 Claude's Reading List for Next Session** — All on Git for direct reading:

Key documents:
- `STATUS.md` — build hash and current state
- `SUBMISSIONS.md` — proposals queue
- `CONTRACT.md` — governance rules (referenced in `AGENTS.md` rulings B1-B4, `CONTRACT_B1_B2_ADOPTION_CONFIRMED.md`)
- `NEW_GIT_WORKFLOW.md` — workflow design (new! — explicitly documents what Claude can and cannot read)
- `INTEGRATION_AUDIT_LIGHTNING.md` — corrected audit findings

**🎯 Before Claude's Next Session, the User Should:**
1. Push any new content to Git (if not already done)
2. Update `STATUS.md` with the correct build hash after verification
3. Record Claude's decisions in `SUBMISSIONS.md` (this still requires user paste)
4. Consider the 3 governance actions — whether to keep, modify, or restructure the 3 user-paste requirements

**✅ What's Been Accomplished:**
- Git-direct workflow designed and published
- Audit corrected (risk #5 downgraded from MEDIUM to LOW)
- v20 vs canonical analysis complete
- All key documents published to Git
- Claude's capabilities documented (3 actions he cannot do himself)
- Ultra prompt prepared with suggestion topics
- Consensus block format implemented (one-block output; Decision/Reason lines map to SUBMISSIONS.md)
- 4 new pre-implementation action documents published

**🚀 Next Session Focus:**
When you start a new Claude session, the main things to address are:
1. Use the Git-direct access — read documents from Git instead of copy-pasting
2. Handle the 3 governance actions — record decisions in `SUBMISSIONS.md`, file verification report, push new submissions
3. Apply the workflow design — follow the `NEW_GIT_WORKFLOW.md` process
4. Address any outstanding audit findings — particularly the 8 pre-implementation actions from the audit

The infrastructure is now set up. Claude can read most documents from Git directly, which streamlines the process significantly compared to the old copy-paste workflow. The 3 remaining user-paste actions are governance-mandated and can't be automated, but they're now clearly documented.

**Is there a specific area you'd like to focus on before Claude's next session?**

### 10. ROUND1_PRE_DISPATCH_VERIFICATION.md Reference

*(Document reference — read from Git if needed)*

### 11. OUTSTANDING_TASKS_SUMMARY.md Reference

*(Document reference — read from Git if needed)*

### 12. LIGHTNING_SUBMISSION.md (S-900)

**Read from Git:** `LIGHTNING_SUBMISSION.md` on Git (commit `b0324c9`)

- Integration audit submission S-900
- Contains the independent audit findings and corrections
- Reference for Claude's Round 1 adjudication

### 13. NEW_WORKFLOW_ROUND1.md

**Read from Git:** `NEW_WORKFLOW_ROUND1.md` on Git (commit `d7be2af`)

- Round 1 pre-dispatch adjudication workflow (19 October 2026)
- 1A chain: S-202 → S-203 → S-103 → S-102 → S-301
- Baseline bootstrap procedure (immediate actions #5)
- Round 1A dispatch requirements
- Round 1B dispatch requirements (after 1A certified)

### 14. OtherChambers_AI_Critiques.md

**Read from Git:** `OtherChambers_AI_Critiques.md` on Git (commit `8034cef`)

- External AI code critiques from external sessions
- Key findings: rWeights undefined crash bug (line 6018), double HTML document header issue, 75-vs-70 copy bug in pick-critique, dead code in initGroupRankings, performance: draft table rebuild on every keystroke, accessibility issues (no keyboard equivalents), no persistence (refresh loses everything), mobile draft board performance issues, data integrity: 32 teams, 1,200 players, no duplicate names

### 15. V20_CRITIQUE_vs_CANONICAL.md Reference

**Read from Git:** `ULTRA_PROMPT.md` on Git contains the v20 vs canonical analysis

- v20 has beautiful modern visual design (hero section, stepper, mobile draft board, CSS theming) but lacks Season engine, SIM-CORE markers, and headless entry points
- Canonical build has the engine but lacks v20's visual design
- RECOMMENDED: Adopt v20's visual design + port canonical's Season engine + add SIM-CORE markers in S-202
- Neither is a superset of the other

### 16. USER INTERFACE SUGGESTIONS (Kept Verbatim)

*All user UI suggestions are kept verbatim below. Claude should address these per the consensus block format.*

**Position Rankings default:**
> The default when the user clicks on Position Rankings should be Primary Coverage.

**Player Browser scrolling:**
> I don't like that if you click on Play Browser, you have to scroll all the way down to get back to the simulator. The simulator should always be available to click on top. And only about 15 players should be visible at a time within the box (on desktop) compared to the frame of the website. You should scroll down within the Player browser instead of on the website. That way the footer is pretty much always visible. Or move the footer to the left side if you think that's better?

**Team Comparison default:**
> Team Comparison default should be Team A Kansas City Chiefs and Team B should be the Raiders.

**Delete "MORE" from the footer grouping:**
> Delete "MORE" from the footer grouping.

**Draft realism — 8 OVR rule:**
> The draft needs a little bit more realism and to follow my generally with 8 ovr rule. 
> "R1.09 (#9) · Minnesota Vikings — Jonathan Greenard (EDGE, 85 OVR)" This pick shouldn't be possible at R1.09. 
> After you draft under "How your draft ranks" the user's team should automatically be clicked on and visible. 
> There is a glitch on mobile when simulating 100 seasons. The bar fills up but the results are never produced.

**Recap rewrite — model weights:**
> "For next time, the model puts the most value on each rating point at the secondary (+0.52 points a game per point), the pass protection (+0.32 points a game per point), and the receiving corps (+0.31 points a game per point), and the least on the kicker and the running backs. The best shopping list is the intersection of high-value units and your own gaps: run defense (0.4 points a game on the table), pass rush (0.4 points a game on the table), and secondary (0.3 points a game on the table). Also stop flexing: 6 starters played out of position, a 20-point rating tax on the lineup. Start a new draft to run it back."
> 
> This should be rewritten to be more specific to the strengths and weaknesses of the user. It should be like "You could try to draft this way next time to improve your winning percentage." Not exactly like that but more natural language in a way that encourages the user to redraft to improve their outcome. Don't say what the model puts the most weight on objectively but rather what the user could have done differently to improve in general. And add a nice conclusion as well to the season and everything that ends on a final note of Simulate 100 seasons or try again to go 20-0 and win the Super Bowl

**Team rankings text:**
> "Team rankings are regular-season only; player totals shown here are regular season; playoff production is in the Playoff Awards panel."
> 
> You can remove this.

**Playoff format replacement:**
> "Seventeen games, a 14-team playoff, then the Super Bowl."
> 
> Replace 14-team playoff with "the Playoffs"

**Awards value table rewrite:**
> "Replaying the draft, your 26 picks left about 15.3 wins a season on the board compared with always taking the best-available fit for your open spots (those wins are not all recoverable: a team cannot take everyone)."
> 
> This should be rewritten in plainer language.

**Early picks text:**
> "Early picks that are worth little to winning matter most, because those picks are the hardest to replace later."
> 
> Remove this.

**Super Bowl text:**
> "Seventeen games, a 14-team playoff, then the Super Bowl."
> 
> Replace 14-team playoff with "the Playoffs"

**Detailed awards value table:**
> "• Franchise-changing (2.5 wins from a 70→90 upgrade): Quarterback.
* High value (1.4–1.0 wins from a 70→90 upgrade): Cornerback 1, Edge rusher 1, Cornerback 2, Wide receiver 1, Edge rusher 2, Offensive tackle 1, Offensive tackle 2.
* Solid value (0.9–0.7 wins from a 70→90 upgrade): Defensive tackle 1, Cornerback 3 (nickel), Strong safety, Middle linebacker (MIKE), Free safety, Guard 1, Guard 2, Center, Weakside linebacker (WILL), Tight end 1, Defensive tackle 2, Kicker.
* Role players (0.7–0.4 wins from a 70→90 upgrade): Running back 1, Wide receiver 2, Wide receiver 3.
* Depth spots (0.2–0.1 wins from a 70→90 upgrade): Running back 2, Tight end 2, Strongside linebacker (SAM).
* In short: quarterback is in a class by itself. After that, the edge rushers and cornerbacks are the most valuable defenders, and the offensive tackles and top wide receiver are the most valuable non-quarterbacks on offense. Safeties and interior linemen are solid; running backs, tight ends and linebackers matter less than most fans expect.
* When to wait. A position is worth waiting on when a nearly-as-good player will probably still be there at your next pick. It is worth taking now when the next-best option is a big step down, or when you expect the computer teams to take the good ones before you pick again. The Priority column measures exactly that (see "Reading the draft board" below).
* Do not forget you can flex. If a good lineman is available at a position you have already filled, he may still help you at another spot. The board shows each player's value at the spot he would actually fill, flex penalty included.
* 
> 
> Please check now that you still feel like this is true. If not, please adjust the weights and the underlying math. Are you sure the best, most modern analytics, rate a kicker over RB1, and WR2?

**Post-draft analysis rewrite:**
> "Based on the independent integration audit I just completed, here's what needs to happen next in the project:"

### 17. WEIGHTS/VALUES VERIFICATION REQUEST

> "Please check now that you still feel like this is true. If not, please adjust the weights and the underlying math. Are you sure the best, most modern analytics, rate a kicker over RB1, and WR2?"

---

## 📋 HOW CLAUDE SHOULD RESPOND

### Output Using Consensus Block Format

Claude should output **ONE block** using the format from `CONSENSUS_BLOCK_FORMAT.md`. The user will copy this entire block and paste it into `SUBMISSIONS.md`. Each session's `Decision` and `Reason` lines will go into that agent's `Implementer's note` area.

**Example output structure:**

```
=== BUILD HASH: 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f ===

=== SESSION: GLM ===
Decision: accept S-202 / defer S-301 / reject S-102
Reason: one-line reason (maps to Implementer's note in SUBMISSIONS.md)
Details: addressing user's S-202 markers, baseline bootstrap, dataset format declaration

=== SESSION: DS (Master Doctrine) ===
Decision: approve Patch Notes (DS Flash)
Reason: Risk #5 downgraded to LOW, council liveness verified
Details: liveness items verified on 77bb9ed5

=== SESSION: NEMO-SUPER ===
Decision: continue S-502 baseline bootstrap
Reason: rWeights undefined bug — awaiting --write-baseline run
Details: bug tracking per S-502

=== SESSION: NEMO-ULTRA ===
Decision: review v20 visual design adoption
Reason: hero unit, stepper, mobile draft board — all green per user suggestions
Details: UI feedback on Position Rankings, Player Browser, Team Comparison

=== VERIFICATION REPORT
Hash: 77bb9ed5 · E2E: draft→season→playoffs clean · Console: no errors · 390px: no horizontal scroll · [what was deliberately not checked]

=== ADDITIONAL NOTES
[Any other notes, build references, etc.]
```

### Claude's Response Workflow

1. **Read all documents from Git** (no paste required for most)
2. **Output ONE block** using consensus block format
3. **User copies entire block** (one paste only)
4. **User pastes into SUBMISSIONS.md** — each session's Decision/Reason into Implementer's note area
5. **User updates STATUS.md hash** (one line if changed)
6. **User files verification report**

### Key Things Claude Should Address from the User's Prompt

Keeping all user suggestions verbatim, Claude should prioritize:

1. **S-202 markers and baseline bootstrap** (critical path — items #5 and #7 from the 8 pre-implementation actions)
2. **Dataset format declaration** — S-203 authoritative, S-502 superseded (item #3)
3. **Liveness item verification** — do not close without code-level verification (item #6)
4. **UI suggestions** — Position Rankings default, Player Browser scrolling, Team Comparison default, footer "MORE" deletion, 8 OVR rule compliance, draft realism
5. **Awards recap rewrite** — more natural language, user-specific, final note about 100 seasons/20-0/Super Bowl
6. **Team rankings text** — replace "14-team playoff" with "the Playoffs", remove team rankings text you can remove
7. **Awards value table** — rewrite in plainer language, keep or remove elements as discussed
8. **Weight verification** — "Please check now that you still feel like this is true. If not, please adjust the weights and the underlying math. Are you sure the best, most modern analytics, rate a kicker over RB1, and WR2?"

### On Git — All Reference Documents

Claude can read everything from Git. Key references:

| Document | Commit/Reference | For Claude's Use |
|----------|-----------------|------------------|
| QUESTION_FOR_CLAUDE.md | 7c8ee83 | 3 YES/NO capability questions |
| PRE_IMPLEMENTATION_ACTIONS_STATUS.md | 7f2e22a | 8 actions status; critical path |
| INTEGRATION_AUDIT_LIGHTNING.md | c394edf | Audit findings; 6 liveness items; risk #5 corrected |
| AUTHORITATIVE_DATASET_FORMAT_DECLARATION.md | New | S-203 authoritative; S-502 superseded |
| S-202_SIM-CORE_MARKERS_GUIDE.md | New | SIM-CORE markers and 3 function moves |
| CONTRACT_B1_B2_ADOPTION_CONFIRMED.md | New | B1 (DOMAccessError guard) and B2 (exit code matrix) |
| NEW_WORKFLOW_ROUND1.md | d7be2af | 1A chain: S-202 → S-203 → S-103 → S-102 → S-301 |
| FINAL_CONSOLIDATION.md | acf96ff | Complete summary of all deliverables |
| CONSENSUS_BLOCK_FORMAT.md | f579713 | One-block output format; Decision/Reason lines |
| NEW_GIT_WORKFLOW.md | 35c4aee | Git-direct workflow overview |

---

## ✅ READY FOR CLAUDE'S SESSION

**Everything Claude needs is on Git.** He can read:

- All 8 pre-implementation action statuses ✅
- The critical path and baseline bootstrap procedure ✅
- The dataset format declaration ✅
- The S-202 markers guide ✅
- The CONTRACT B1/B2 adoption ✅
- His 3 capability questions ✅
- The consensus block format ✅
- All user UI suggestions (kept verbatim) ✅
- The audit findings and liveness verification ✅
- The workflow design ✅

**The 3 governance-mandated user paste actions are clearly documented** and separate from Claude's read access.

**Claude's output:** One block using consensus block format. User copies once. Pasts into SUBMISSIONS.md. Done.

---

*If Claude needs any documents not listed here, he should read from Git at `https://github.com/kozikosi/Football-Sim/tree/main/` or ask the user to paste the specific content.*

---

*This prompt is structured so Claude can read all information directly from Git. The user will copy Claude's one-block output and distribute sections to each agent's area in SUBMISSIONS.md per the consensus block format.*