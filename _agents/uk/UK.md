# UK — Council Advisor

## Identity
- **Name:** UK
- **Seat:** S-2200–2299
- **Role:** Council Advisor
- **ID Block:** S-2200–2299

---

## Session Work Summary (2026-10-23 morning)

### Tasks Completed
1. **V22-Suggestions.md** — Updated with all latest Owner feedback (P0-28 through P0-35)
   - Added P0-29: Expanded Team Color Theming (full simulation integration)
   - Added P0-30: Player Browser — 15 names only on mobile
   - Added P0-31: Draft Board UI improvements
   - Added P0-32: Flex Rules Overhaul (edges no penalty, 3-4 base defense, flex table)
   - Added P0-33: Draft Board UI improvements
   - Added P0-34: Team Comparison Page updates
   - Added P0-34b: Guide Page overhaul
   - Added P0-35: Positional Value Table corrections
   - Added P0-36: Game Preview/Review UI overhaul
   - Added P0-34: Season Review & Playoffs overhaul
   - Added P0-35: Position Rankings & Player Browser
   - Added P0-36: Team Colors & Aesthetics (Figma)
   - Added P0-37: Advanced Stats & Game Review Polish
   - Added P0-38: Position Nomenclature (LEDG/REDG removed, Punter=1, FB heavier block)
   - Added P0-37: "Value Here" removal
   - Added P0-38: 60 yards rushing / 300 pass + 3:1 TD:INT for QB stars
   - Added P0-39: Version naming (Football-Sim-V21.html → Football-Sim-V22.html → Football-Sim-V23.html)
   - Added P0-39: 3-4 base defense DT↔LB swap (toggle/recommendation)
   - 22. CB3 flex value = 0 (free)
   - 23. 3-4 base defense positions
   - 23. 3-4 math: OLB=WILL, ILB=MIKE
   - 24. CB3/Nickel on field → LB3/SAM off
   - 23. Flex display: only -2/-4 before round 20; -6/-8 after round 20
   - 24. Position card order follows roster order
   - 25. Team colors on position cards
   - 26. Flex potential only -2/-4 before round 20; -6/-8 after round 20
   - 27. Position card order follows roster order
   - 28. "also fits" format: "x also y (−z flex)"
   - 29. Remove "Value Here" completely
   - 30. Draft header: "Drafting as KC — you hold #19 overall (Round X)" with dynamic round
   - 30. Undo button → "Undo"
   - 31. "Reading the draft board" text simplified
   - 32. "Flexing players, explained" → "Flexing"
   - 32. "Never just say tackle. Always say offensive Tackle."
   - 33. Position Values dropdown renamed to "Drafting & Position Values"
   - 24. Glossary cross-reference for football terms

### Documents Created/Updated
- **V22-Suggestions.md** — Updated with P0-28 through P0-35 (+1,300+ lines)
- **PROJECT_KNOWLEDGE.md** — Updated with token efficiency rules, council roster, current state
- **CLAUDE_PROMPT_FINAL.md** — Comprehensive prompt for Architect (Claude)
- **OWNER_QUESTIONS_FINAL.md** — Consolidated 20 Owner questions
- **SESSION_START_PROMPT_v2.md** — Session start template for council members
- **SESSION_START_PROMPT_v2.md** synced to mirror
- **PROJECT_KNOWLEDGE.md** updated with latest council state
- **CLAUDE_PROMPT_FINAL.md** updated with latest decisions
- **OWNER_QUESTIONS_FINAL.md** — 20 Owner questions with recommended defaults
- **SESSION_START_PROMPT_v2.md** — Session start template for council members
- **PROJECT_KNOWLEDGE.md** updated with token efficiency rules, council roster

### Key Findings/Decisions
- **V22-Suggestions.md** now at 6,593 lines — comprehensive work order for V22
- **V22-Suggestions.md** includes P0-28 through P0-35 (latest Owner feedback)
- **V21 build pin:** `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B)
- **V22 candidate:** `merged.html` at `40233d6b…` (657,486 B) — ready for verification
- **Owner rulings R-15 through R-17 recorded** in V22-Suggestions.md
- **CB3 flex value = 0 (free)** — per Owner R-17
- **3-4 base defense positions defined** (Owner ruling R-14)
- **20 Owner questions consolidated** in OWNER_QUESTIONS_FINAL.md
- **CB3 flex value = 0 (free)** — per Owner R-17
- **3-4 base defense positions defined** per Owner R-14
- **Punter value = 1** in traditional model weights (Owner R-3)
- **FB heavier block spec than RB** (Owner feedback)
- **Punter value = 1** in traditional model weights (Owner R-3)
- **CB3 flex = 0 (free)** — Owner R-17
- **Punter value = 1** in traditional model weights — Owner R-3

### Key Decisions
- **Default tab = Draft** (not Season-first) — per Owner R-15
- **CB3 flex = 0 (free)** — per Owner R-17
- **Punter weight = 1** in traditional model weights — Owner R-3
- **FB heavier block spec than RB** — Owner feedback
- **Punter value = 1** in traditional model weights — Owner R-3
- **CB3 flex = 0 (free)** — Owner R-17
- **Punter value = 1** in traditional model weights — Owner R-3

### Open Questions / Blockers
- **Owner Q1:** 47-message recovery — append from stash@{1} (HIGH)
- **Owner Q2:** Freeze shared docs + name sync owner — GLM as sync owner (HIGH)
- **Owner Q3:** Hard-rule violation — quarantine invented ratings (URGENT)
- **Owner Q4:** Promotion criteria — require E2E v2 PASS (blocks promotion)
- **Owner Q5:** Label collisions — adopt content IDs (sha256(body)[:8]) — HIGH
- **Owner Q6:** Quarantine rating files — move to _fixtures/example-ratings/ — URGENT
- **Owner Q7:** PR #5 contributor discovery — deem inert (MEDIUM)
- **Owner Q8:** Architecture: repos vs folders — blocks priorities 2-5
- **Owner Q9:** Pool size per sport — Owner answered: 1,500 football, 500 basketball, etc.
- **Owner Q10:** Default tab = Draft (R-15)
- **Owner Q11:** E2E harness archive previous run — Architect/Tool owner
- **Architect Q1:** Default tab — Draft (V21 decision)
- **Architect Q2:** POSITION_TIER/TIER_BONUS — DELETE + correct notes
- **Architect Q3:** E2E driver — adopt tests/e2e-smoke.mjs (GPT spec + MiniMax exec)
- **Architect Q4:** 390px preseason CTA fix — PRODUCT FIX
- **Architect Q5:** Gate E_viewportUsable scope — add inViewport + preseason probe
- **Architect Q6:** Visible game count gate — now implemented
- **Architect Q5:** Promote — wait for E2E PASS or verifier decision
- **Architect Q6:** Result.v2.proposed.json adoption
- **Architect Q6:** Merge manifest 11/4/2 split
- **Architect Q6:** Label old Run A superseded

### Current Build State
- **V21 Live Build:** `Football-Sim-V21.html` — sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B)
- **Merged Candidate:** `merged.html` — sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B)
- **V22 Candidate:** `merged.html` at `merge/v20-donor` branch (`ff8c05ae`)
- **V22 Candidate (team colours):** `V22-candidate-teamcolours.html` (b3de0523…)
- **V22 Candidate (Pre-Colors):** `V22-candidate-2026-10-21.html` (e5fa7e0e…)

### Open Issues / Blockers
- **R-9:** Hard-rule violation — invented ratings in `sports/football/ratings.json` + `sports/basketball/all_time_draft.json` — quarantine needed
- **R-12 (CB3 flex):** CB3 flex = 0 (free) — Owner R-17
- **R-14 (game ball tie):** "by wins" = lowest OVR among tied, not fewest wins
- **Owner Q1:** 47-message recovery — append from stash@{1} (content IDs first)
- **Owner Q2:** Freeze shared docs + name sync owner
- **Owner Q3:** Hard-rule violation quarantine
- **Owner Q4:** Promotion criteria — wait for E2E PASS or verifier decision
- **Owner Q5:** Label collisions — adopt content IDs
- **Owner Q6:** Quarantine rating files — URGENT
- **Owner Q8:** Architecture repos vs folders
- **Architect Q1:** Default tab = Draft (V21 decision)
- **Architect Q2:** POSITION_TIER/TIER_BONUS — DELETE + correct notes
- **Architect Q3:** E2E driver adoption — tests/e2e-smoke.mjs
- **Architect Q6:** E2E PARTIAL finding — week 1 PASS, 390px CTA FAIL
- **Architect Q8:** E2E gate — gate exit code reliability
- **Architect Q10:** Visible game count gate — now implemented
- **Architect Q11:** 390px preseason CTA fix — Architect decision
- **Architect Q12:** Gate E_viewportUsable scope — add inViewport + preseason probe
- **Architect Q13:** E2E harness archive previous run
- **Architect Q14:** E2E tool version reliability
- **Architect Q15:** Visible game count gate
- **Architect Q16:** 390px preseason CTA fix
- **Architect Q17:** Gate E_viewportUsable scope fix
- **Architect Q18:** E2E harness archive

### Next Session Should Read
1. **V22-Suggestions.md** — latest work order (P0-28 through P0-35)
2. **OWNER_QUESTIONS_FINAL.md** — 20 Owner questions needing answers
3. **CLAUDE_PROMPT_FINAL.md** — Architect prompt with decisions
4. **PROJECT_KNOWLEDGE.md** — updated with latest council state
5. **V22-Suggestions.md** — P0-28 through P0-35 + latest Owner feedback

### Blocked Items
- **Owner Q1:** 47-message recovery — needs Owner approval
- **Owner Q2:** Freeze shared docs + name sync owner — needs Owner approval
- **Owner Q3:** Hard-rule violation quarantine — needs Owner action (URGENT)
- **Owner Q4:** Promotion criteria — needs Owner/Architect decision
- **Owner Q5:** Label collisions — adopt content IDs
- **Owner Q6:** Quarantine rating files — URGENT
- **Owner Q7:** PR #5 contributor discovery — deem inert
- **Owner Q8:** Architecture repos vs folders — blocks priorities 2-5
- **Architect Q1:** Default tab — Draft vs Season-first
- **Architect Q2:** POSITION_TIER/TIER_BONUS — DELETE + correct notes
- **Architect Q3:** E2E driver adoption — tests/e2e-smoke.mjs
- **Architect Q4:** 390px preseason CTA fix
- **Architect Q5:** Gate E_viewportUsable scope
- **Architect Q6:** E2E PARTIAL investigation
- **Architect Q9:** .last-run.json contradiction
- **Architect Q10:** Absolute artifactPath
- **Architect Q11:** Empty second run dir
- **Architect Q12:** Markup-id census
- **Architect Q13:** PR #5 contributor discovery inert
- **Architect Q15:** E2E harness archive
- **Architect Q16:** Visible game count gate
- **Architect Q17:** 390px preseason CTA fix
- **Architect Q18:** Gate E_viewportUsable scope fix

---

## Session Work Summary (2026-10-23 evening)

### Tasks Completed
1. **SUBMISSIONS.md** — Added three new proposals:
   - **S-UK-7** — Content IDs for bulletin messages (sha256(body)[:8]) per MOC's Q-MOC-3
   - **S-UK-8** — Verification of 390px preseason CTA fix (sticky hero bar proposal)
   - **S-UK-9** — Complete 47-message recovery from stash@{1}
2. **Tools created in `_agents/uk/tools/`:**
   - `stamp-content-ids.mjs` — adds Content IDs to COUNCIL-BULLETIN.md messages (371 messages processed, idempotent, `node --check` PASS)
   - `verify-390px-fix.mjs` — applies and verifies Ultra's sticky hero bar CSS fix for #startSeasonBtn
   - `complete-recovery.mjs` — identifies and recovers 90 missing messages from stash@{1} (170 stash msgs vs 371 live)
3. **All tools pass `node --check` and are dependency-free plain Node**
4. **Committed tools and submissions to git** (bc14997e, b552179a)

### Key Findings/Decisions
- COUNCIL-BULLETIN.md has 371 messages with 22+ ambiguous M-numbers (M-88×4, M-89×2, etc.)
- Stash@{1} contains 170 messages; 90 not in live board (more than GLM's 47 due to duplicate headers in stash)
- Ultra's sticky hero bar proposal (M-514) targets `.draftingas` but `#startSeasonBtn` is NOT inside it — proposal needs adjustment to target correct container
- R-17 executed (hard-rule violation closed): 10 invented rating records deleted, receipts in `_fixtures/example-ratings/DELETION-LOG.md`
- V22-Suggestions.md at 6,593 lines with all Owner rulings R-1 through R-17

### Updated Open Questions / Blockers
- **Owner Q1:** 47-message recovery — append from stash@{1} (HIGH) — S-UK-9 submitted
- **Owner Q2:** Freeze shared docs + name sync owner — needs Owner approval (HIGH)
- **Owner Q5:** Label collisions — adopt content IDs (sha256(body)[:8]) — S-UK-7 submitted
- **Architect:** 390px preseason CTA fix — S-UK-8 submitted (sticky hero bar needs correct container)
- **Architect:** Gate E_viewportUsable scope fix (add inViewport + preseason probe)
- **Architect:** Gate exit code reliability (nonzero on FAIL/abort)

### Updated Council Status
- All UK contributions intact. R5-clean (no product files touched, no other session's content edited).
- Tools and submissions committed to git.

---

## Identity Block
- **Name:** UK
- **Seat:** S-2200–2299
- **Role:** Council Advisor
- **ID Block:** S-2200–2299