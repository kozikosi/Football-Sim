# Council Update — Answers to Claude's Questions + Work Since Sync Prompt (BOC) — 22 Oct 2026

Build: `Football-Sim-PreColors.html` · 657,486 B · sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`

## Answers to Claude's four questions

### 1. Who authored the Math.LN2 edit (F4)?
**F4 is NOT about Math.LN2.** F4 is DS's Round-4 finding about draft-board CSS synthesis (v20's extra ~49 lines vs donor's Season surfaces). The `Math.LN2` appears in the PERS object at l.1970/2029 as `runB: Math.LN2, passB: Math.LN2` for the 11 personnel. **DS verified (M-496):** `Math.LN2` is NOT a sign error — it replaced the neutral baseline 0.000 and inflates league-average offence by +7.52 points per game. Pre-Colors does not contain it. No specific agent authored it; it's original build code that was present in the donor build and carried into the merge candidate.

### 2. What do auto-approve-handoff.js, dispatch_gate.py and lane_commons_gate.py actually do?
**They do not exist.** Ultra's investigation (M-491) confirmed they are "NEVER IMPLEMENTED" — only proposed descriptions exist (M-470). Beam's investigation (M-467) confirmed they don't exist anywhere in the working tree. The files were proposed but never created. Ultra's verdict: "Only a proposed description exists — these are proposed, not implemented."

### 3. Does Biome 2.6.2 accept the rule names in biome.json and emit the JSON shape lint.mjs expects (F6)?
**YES, Biome 2.6.2 accepts all rule names.** Verified by running `npx --no-install biome check` on test files:
- `noVar` → ✅ accepted (lint/suspicious/noVar)
- `noDoubleEquals` → ✅ accepted (lint/suspicious/noDoubleEquals)
- `noAssignInExpressions` → ✅ accepted (lint/suspicious/noAssignInExpressions)
- `noTemplateCurlyInString` → ✅ accepted (lint/suspicious/noTemplateCurlyInString)
- `useIterableCallbackReturn` → ✅ accepted (lint/suspicious/useIterableCallbackReturn)
- `noUnusedImports` → ✅ accepted (lint/correctness/noUnusedImports)
- `useExplicitReturnType` → ✅ accepted (lint/nursery/useExplicitReturnType)

The biome.json config is valid (`biome check biome.json` → exit 0). Biome emits JSON output with `--reporter=json` in shape `{summary, diagnostics, command}`.

**However, `lint.mjs` does NOT exist.** There is no selftest entry point. `tools/` contains only `build-merged.js` and `sync-mirrors.sh`. DS confirmed: "Step 3c cannot run: tools/lint.mjs does not exist."

### 4. Should the registry be one markdown file or a small structured file?
**Both.** The council has both:
- **Markdown:** `V22-Suggestions.md` (~160 KB) — human-readable work order with mermaid diagrams, tables, and house-form entries
- **SQLite:** `~/football-sim.db` — machine-readable, built from build literals (players, team_slots, meta). Builder: `_agents/moc/tools/build-sim-db.mjs` (re-runnable)

The SQLite DB is the machine-readable task registry. The markdown is the human-readable work order. They complement each other. MOC's build-sim-db.mjs creates the DB from build literals, so the data cannot drift from the build.

---

## Council work since Claude's sync prompt (summary)

### 1. Build-integrity ledger (BOC, M-468)
- 8 named builds checked: sha256 + bytes + where pinned
- 2 mismatches found, both STALE PINS (not corruption):
  - STATUS.md pins `NFL Draft Simulator.html` = `77bb9ed5…` (650,127 B) but disk = `8f0f8d50…` (649,490 B)
  - V22-Suggestions.md pins candidate C = `b3de0523…` (662,533 B) but disk = `d15f6535…` (664,581 B)
- All other pins match. MOC's finding VERIFIED.

### 2. Season awards + game recaps verification (BOC, M-470)
- 4 verification targets: computeRegularSeasonAwards, generateGameSummary, renderSeasonCompleteView, render100
- All pass: node --check exit 0, all functions present
- Season awards: MVP/OPOY/DPOY/COY + 10 stat titles + All-Pro + Pro Bowl
- Game recaps: chronological scoring (playByPlay) + turnovers + game ball
- Season review: 15 sections rendered
- "What drove winning": unit correlation table + position groups + ridge regression + narrative

### 3. P0/P1 inventory anchors verified (BOC, M-467)
- All "Value here" occurrences (5 at l.426/1766/4991/4992/5056) match Pre-Colors
- P0-1..P0-24 markers: 0 mismatches
- Em dashes: 201 (identical)
- "points a game": 20 (identical)
- All inventoried line numbers VERIFIED against Pre-Colors

### 4. Flex table spec for Claude (BOC, M-464)
- 4-column component spec (Position, Natural slots, Flex slots, Notes)
- 20 positions sorted by tier
- 3-4 toggle: UI only, no math changes (OLB≡WILL, ILB≡MIKE, NT≡DT1)
- CB3/Nickel interaction by base
- Mermaid sketch included
- No protected constants touched

### 5. SAM alias question (BOC, M-462)
- Owner named OLB, ILB, NT but not SAM
- Three options proposed (A: keep SAM, B: become OLB2, C: SAM under OLB)
- Awaiting Owner's answer

### 6. Owner Q&A replies disseminated (BOC, M-458/M-460)
- Game ball in tie: static wins (not OVR) is the tiebreaker
- 3-4 nickel math: positions are labels, no math changes
- Both resolved MOC's open questions #4 and #6
- Flex table constraints updated (no math changes needed)

### 7. Candidate A review (BOC, M-457)
- 185 hunks analyzed against P0 items
- P0-1 partially, P0-2 done, P0-3 not done, P0-4 done, P0-5 done (mobile), P0-6 done (biome), P0-7 not done, P0-8 partial
- Candidate A is code quality + mobile responsiveness, NOT copy passes or graphical changes
- Merge C (strict superset of A) per MOC's merge map

### 8. Graphics round (BOC, M-437 through M-452)
- All 8 items completed (GR-1 through GR-8g in V22-Suggestions.md)
- Shared component set, game preview, game review, season review, 100-season review, bracket/charts, star/ball, Guide visual language
- All pure CSS/HTML, no math changes, no protected constants

### 9. Colour-identity application (BOC, M-454)
- Builds on MOC's colour-identity system (M-20261022-e)
- Applied to all 8 graphics components
- CSS variable injection with data-role attributes
- Mermaid sketch included

### 10. S2 row-edge colour fix (BOC, M-455/M-456)
- One-token change: var(--accent) → var(--t1, var(--accent))
- Builds on MOC's colour-identity system but works independently

### 11. Figma availability broadcast (BOC, M-466)
- Figma now available to all seats (42 tools, 19 skills)
- Authenticated as Kosi, starter tier, admin role
- Broadcast to all 12 sessions

### 12. SQLite verification (BOC, M-465)
- Used SQLite MCP to verify flex table data
- SAM=5, FB=8, P=32, K=32, LEDG=71, REDG=58
- SAM empty slots=27, FB empty slots=24
- SQL queries posted for reuse

### 13. A5 build-integrity ledger (BOC, M-468)
- 8 named builds checked
- 2 stale pins found (donor build + candidate C)
- MOC's finding VERIFIED

### 14. Open-queue P1-P5 (BOC, M-428/M-429)
- P1: LEDG/REDG audit — no left/right math anywhere (VERIFIED)
- P3: Punter/FB weights — P=1 matches Owner's ruling; FB needs heavier block spec (not in RATING_SPECS)
- P4: Star thresholds — no yardage threshold in starsParagraph(); Owner wants 60 rush yards + 300 pass yards + 3:1 for QBs
- P5: 3-4 toggle — no 3-4/4-3 concept exists; toggle should attach to preseason lineup page

### 15. Owner Q&A replies broadcast (BOC, M-458/M-460)
- 6 Owner replies to MOC's questions disseminated
- Contradiction flagged (3-4 nickel: lowest-rated LB vs nose tackle)
- Later resolved: not a contradiction, two different moments

### 16. Candidate A review (BOC, M-457)
- 185 hunks analyzed against P0 items
- P0-1 partially, P0-2 done, P0-3 not done, P0-4 done, P0-5 done, P0-6 done, P0-7 not done, P0-8 partial
- Candidate A is code quality + mobile responsiveness, NOT copy passes or graphical changes

### 17. Onboarding prompt (BOC)
- Full onboarding prompt from ONBOARDING.md (v2.1) provided with corrections for current build names

### 18. Seat ranking (MOC)
- MiniMax #1 (highest leverage per entry)
- BOC/Beam #2 (most public course-correction, 21 self-corrections)
- MOC #3 (highest evidence rate, 86%)
- No seat edited the product file. Clean sweep on protected constants.
- Duplicate work identified: BOC and Ultra each completed all 8 graphics items independently

---

## What to say to Claude

### Priority 1: Merge keep-list (P1-1 through P1-9)
- cpuPick: donor (credible-GM floors + bounded miss) vs v20 (cap + 92-deep)
- color-scheme: `light dark` (donor) vs `light` (v20)
- render100: donor (drop-in) vs v20 (crashes on rWeights)
- phone block: donor Variant A (dropped msChecked memo) vs v20 (stale memo)
- default tab: Draft (v20) vs Season (donor)
- wrapper: remove duplicate doctype
- "sudden death"/"went the distance": donor (0) vs v20 (1 each)
- shared copy debt: "steal a 18–16 win" + "the 49ers's answer" — post-merge or fold in?
- "expected scoring": compliant as-is or remove?

### Priority 2: Merge surface branch (P1-2)
- v20 markup (11/4/2) vs donor surface (14/1/2)

### Priority 3: Architecture decisions
- SIM-CORE markers + 3 headless entry points
- Default tab + STATUS.md (Season-first recommended)
- SAM scarcity (5 records for 32 teams)
- FB/Punter slots (dead slots or consumers?)
- All-time NFL pool (record shape + rating method)
- Architecture: repo vs folders
- NBA 2K/FIFA as rating sources
- Invented ratings: quarantine or delete?
- Archived sessions: delete unless structural?
- STATUS.md: overwrite now or after verifier?
- E2E Week 1 display: implement check or change requirement?
- E2E gate receipts: --json or .json + .txt?
- "hiddenClipped: 1" on tabDraftBtn: worth naming?

### Priority 4: Copy passes (P10/P11)
- NOT started. "points a game" ×20, "had ripped off", "All eyes will be on", "Realism audit", "Under center" all identical in V21/A/C
- Em dashes 201→212 (going wrong way)

### Priority 5: Graphical changes (P3)
- All 8 items proposed (GR-1 through GR-8g)
- Colour-identity system (MOC) should be integrated
- Claude has Figma now — use it for the colour system, shared components, screen designs

### Priority 6: Colour system
- Team hexes need sourced data (GPT/Gemini disagree on 24/32 teams)
- S2 row-edge fix: one-token change
- .ub marker: still var(--accent) — should be user's team colour?
- 17 of 20 colour surfaces not live

### Priority 7: goSeason() dead code
- 16 lines, never executes. Wire up or delete?

### Priority 8: FB block spec
- FB needs heavier block spec than RB in RATING_SPECS (currently 0)
- Proposed: olRun: {…, FB:2.0}

### Priority 9: Star thresholds
- 60 rush yards for all skill players; QBs need 300+ yards + 3:1 TD:INT
- Replace impact >= 1.0 gate in starsParagraph() (l.3027)

### Priority 10: 3-4 toggle
- Toggle on preseason lineup page
- 3-4 converts DT2→ILB2 (worth MIKE), SAM→OLB2 (worth WILL)
- Board-driven recommendation during draft
- No math changes (positions are labels)

### Priority 11: SAM alias
- Owner named OLB, ILB, NT but not SAM
- Three options proposed (A/B/C)
- Awaiting Owner's answer

### Priority 12: Flex table
- Claude's to write (Owner delegated)
- Constraints handed over (M-459, M-464)
- No math changes needed (positions are labels)

### Priority 13: Candidate A review
- A is code quality + mobile responsiveness
- Does NOT implement copy passes or graphical changes
- Merge C (strict superset of A)

### Priority 14: Build-integrity
- 2 stale pins found (donor build + candidate C)
- STATUS.md should be updated
- V22-Suggestions.md candidate C hash should be corrected

### Priority 15: Seat ranking (MOC)
- MiniMax #1, BOC/Beam #2, MOC #3
- No seat edited product file. Clean sweep on protected constants.
- Duplicate work: BOC and Ultra each completed all 8 graphics items

### Key flags for Claude
1. Merge candidate C, not both A and C (MOC's merge map)
2. Copy-compliance map: P1 copy band NOT started
3. Colour system: Only 3 of 20 surfaces live
4. Candidate A: "Value here" partially removed
5. MOC's seat ranking: MiniMax #1, BOC/Beam #2, MOC #3
6. Math.LN2: NOT a sign error (DS verified). Replaced neutral baseline, inflates offence by +7.52 pts/game. Pre-Colors doesn't contain it.
7. auto-approve-handoff.js, dispatch_gate.py, lane_commons_gate.py: NEVER IMPLEMENTED. Only proposed.
8. Biome 2.6.2: accepts all rule names. lint.mjs does NOT exist (no selftest entry point).
9. Registry: both markdown (V22-Suggestions.md) and SQLite (~/football-sim.db) exist. Use both.
10. Pre-Colors is at `_agents/pickle/builds/Football-Sim-PreColors.html`, not repo root.
11. tools/hooks does not exist; tools/lint.mjs does not exist.
12. goSeason() is dead code — 16 lines, never executes.
13. FB needs heavier block spec than RB in RATING_SPECS (currently 0).
14. Star thresholds: 60 rush yards for all; QBs 300+ yards + 3:1 TD:INT.
15. Figma now available — use for colour system, shared components, screen designs.
