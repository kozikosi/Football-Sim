# PROMPT FOR CLAUDE: V22 IMPLEMENTATION — FULL WORK ORDER

**TO: CLAUDE (ARCHITECT)**
**FROM: OWNER (KOSI) via UK**
**DATE: 2026-10-23T10:30:00Z**
**SUBJECT: V21 → V22 FULL IMPLEMENTATION — ALL FEEDBACK INCORPORATED**

---

## ⚠️ CRITICAL INSTRUCTIONS

1. **Review ALL project files before starting.** Key files:
   - `AGENTS.md` — operator rules, protected constants, invariants
   - `V22-Suggestions.md` — full work order (6593 lines, all feedback incorporated)
   - `CLAUDE_PROMPT_V21_CHANGES.md` — concise changes list
   - `PROJECT_KNOWLEDGE.md` — persistent project context
   - `CLAUDE_PROMPT.md` — council progress + answers to your questions
   - `OWNER-QUESTIONS.md` — consolidated Owner questions

2. **Use your tools:**
   - **Figma:** Read designs, pull screenshots, generate diagrams
   - **Biome:** Format/lint code (`npx biome check`)
   - **Mermaid:** Render flowcharts in markdown
   - **Git:** Version control, commit by path

3. **Before any work:** Read `AGENTS.md` §2 and §4 (authority model, shared tree rules)

4. **You have full authority** to execute. Only ask Owner for: product concept, permissions, publishing, protected constants, architecture decisions.

5. **Preserve all direct suggestions** from Owner in spirit (see V22-Suggestions.md)

6. **V21 → V22:** After all changes verified, promoted build becomes `Football-Sim-V22.html`

---

## 📋 WHAT'S IN V22-SUGGESTIONS.MD

The work order is organized by priority:

### **P0 (Blocks Release) — 68+ items**
- 390px preseason CTA fix (`#startSeasonBtn` visible)
- Gate `E_viewportUsable` scope fix (`inViewport` + preseason probe)
- Gate exit code reliability (nonzero on FAIL/abort)
- Hard-rule violations: quarantine invented ratings files
- Result.json hand-edit fix (`result.v2.proposed.json`)
- All P0 UI changes (Draftboard, Team Comparison, Guide, Game Preview/Review, Season Review, Playoffs)
- "20-0" branding (header, footer, text, UI)
- Homepage changes ("DRAFT" text, remove old text, new text)
- Player Browser (15 names only, footer tabs always visible)
- Header (clickable to homepage, rework open)
- Team color theming (P0-29, 32-team palette, full simulation integration)
- Motion/graphics (animations, confetti, shimmer, transitions, Super Bowl celebration)
- Coaching philosophy available all season
- Base defense selection (3-4 vs 4-3)
- Flex rules overhaul (edge no penalty, new flex table, QB first)
- Draft board UI improvements (text, visual, mobile collapse, team colors)
- Game preview/review UI overhaul
- Season review & playoffs (banners, brackets, awards, graphical)
- Position rankings & player browser
- Team colors & aesthetics (Figma)
- Advanced stats & game review polish

### **P1 (Architect Decisions) — 40+ items**
- Default tab: Draft vs Season
- POSITION_TIER/TIER_BONUS: DELETE
- E2E driver adoption
- 390px preseason CTA fix
- Gate `E_viewportUsable`: add `inViewport` + preseason probe
- Result.json correction: adopt `result.v2.proposed.json`
- Promotion criteria: require E2E v2 PASS
- Merge manifest: adopt 11/4/2 split
- Old Run A superseded
- Biome config fix: migrate `recommended` → `preset`

### **P2 (Owner Decisions) — 6 items**
- 47-message recovery
- Freeze shared docs + sync owner
- Quarantine rating files
- Promotion: wait for E2E PASS
- Label collisions/content IDs
- E2E harness archive

---

## 🎨 AESTHETICS & BEAUTY (V22 Priority)

### **Team-Color Theming (Full Simulation)**
- Draft board header border: user's team colors (KC: red/white/yellow; Vikings: purple/gold)
- Matchup panels: opponent's team colors on borders, labels, star tints, game ball star, panel backgrounds
- Game preview: team headers in colors, team names in colors, opponent panels tinted
- Game review: team-colored score boxes, player cards, turnover/score lines
- Season review/playoffs: conference charts, playoff brackets, award cards in team colors
- **CSS Variables:** `--team-primary`, `--team-secondary`, `--team-tertiary` + `--opp-primary`, `--opp-secondary`, `--opp-tertiary`
- **Team Color Map:** 32 teams with primary/secondary/tertiary (in V22-Suggestions.md)

### **Motion & Graphics**
- Confetti, banners, shimmer, transitions
- Text animating in/out
- More beautiful game previews/reviews
- Gold theme + shimmer for Super Bowl champion banner
- "The Chiefs are Super Bowl Champions!" with exclamation
- "Seasons by Win total" chart: horizontal bar chart, centered, team colors
- "Your players; average season" & "Award patterns": higher up, auto-visible
- Remove "Realism audit" & "Does model predict real results?" from view (keep internally)

---

## 📋 KEY UI CHANGES (Code Locations)

### **Draftboard (merge.html)**
| Change | Line | Current → Target |
|--------|------|------------------|
| Remove "Value Here" (sort) | 418 | `Sort: value here` → `Sort: value` |
| Remove "Value Here" (column) | 426 | `Value here` → `Value` (keep title) |
| Remove "MORE" from footer | ~440-445 | Find/remove "MORE" |
| Move badges to bottom | 510, 625 → after 548 | Badge section + inline badges → under weights |
| "Use model weights" → "Default" | 548 | Text change |
| "Back to my weights" → "Save My Weights" + state | 548 | State-based: transparent/disabled → blue/clickable |

### **Team Comparison Page**
- Remove "real" from "Put any two real rosters side by side."
- Remove "Ratings shown are effective ratings..." disclaimer
- Remove all parentheses from Unit Comparison headers
- Reorganize: Offense section → break → Defense section
- Default matchup: Chiefs (Team A) vs Raiders (Team B)

### **Guide Page**
- Remove Guide Box + intro text
- Rewrite "Play the season" text
- Remove "(what caused sacks and big runs)" from advanced stats
- Remove "x wins from 70-90 upgrade" text
- Remove "Wins, 70→90" column from table
- Apply weight adjustments (DE1, CB2, WR2, RB1, K, TE1, TE2)
- Adjust QB/Receiver pass-run splits

### **Positional Value Table (Guide)**
- Update all Wins per +1 OVR values per consensus
- Update Pass/Run splits per consensus
- Ensure arithmetic: Wins 70→90 = 20 × Wins per +1 OVR
- Fix arithmetic errors (DT1/CB3, MIKE/OG/C, RB1, SAM, FS/OG/C vs MIKE)
- Add note: "Coefficients are structural/logic-consistent placeholders"

---

## 🔧 TOOLS AVAILABLE TO CLAUDE

| Tool | Status | Usage |
|------|--------|-------|
| Figma | ✅ Read designs, pull screenshots, generate diagrams | Design context |
| Mermaid | ✅ Available (renders in markdown) | Flowcharts, diagrams |
| Biome | ✅ Available (`npx biome`) | Code formatting/linting |
| Git | ✅ Available | Version control |

---

## ⚠️ PROTECTED CONSTRAINTS (DO NOT CHANGE)

| Protected | Do Not Modify |
|-----------|---------------|
| `DEFAULT_WEIGHTS` | Line ~452 — protected constant |
| `FLEX`, `NATURAL_SLOT_MAP` | Flex rules |
| `MC` coefficients | Matchup model coefficients |
| `PLAN_K` | Game plan coefficients |
| `RATING_SPECS` | Rating specifications |
| `POINTS_PER_WIN = 32.5` | Pythagenpat-based |
| `SEASON_RECORD_CAPS` | NFL record caps |
| `PLAYERS` array | 1,200+ player ratings |
| `TEAM_DATA` | 32 team depth charts |
| Simulation math engine | Draft, season, playoffs, matchup model |

---

## 📋 VERIFICATION CHECKLIST

| Check | Command | Expected |
|-------|---------|----------|
| MiniMax smoke | `node _agents/minimax/tools/post-merge-smoke.mjs` | EXIT 0 |
| OpenChamber E2E v2 | Playwright test | PASS (Week 1 + 390px CTA) |
| Function diff | `node tests/funcdiff.js <ref> <cand>` | Changed set = accepted submissions |
| 390px gate | `node tests/e2e-smoke.mjs` | EXIT 0, A-G true |
| Schema validation | `npx jsonschema -i result.json schema.json` | PASS |
| Console errors | Browser console | 0 errors |
| 390px responsive | DevTools 390px | No horizontal scroll |
| Team colors | Visual check at 390px + desktop | Colors match team selection |
| Biome lint | `npx biome check` | No errors (warnings OK) |

---

## 📁 FILES TO MODIFY

| File | Purpose |
|------|---------|
| `merged.html` | All UI/Guide changes (V21 → V22) |
| `tests/e2e-smoke.mjs` | Gate fixes (inViewport, preseason probe, exit codes) |
| `_agents/minimax/tools/post-merge-smoke.mjs` | Shared gate sync |
| `SIM-PLATFORM/tools/quarantine-sample-pool.mjs` | Run to quarantine ratings |
| `SIM-PLATFORM/tools/build-pool-variant.mjs` | NBA pool variant |

**Reference only (DO NOT MODIFY):**
- `NFL Draft Simulator.html` (donor)
- `NFL Draft Simulator v20 Claude.html` (V20 reference)

---

## 🔄 V21 → V22 TRANSITION

After all changes verified → promote build → **`Football-Sim-V22.html`**

---

**SPEAKER: UK | ROLE: Council Advisor | TASK: V21→V22 Implementation Prompt | DATE: 2026-10-23T10:30:00Z**

---

### **ALL FEEDBACK INCORPORATED FROM:**
- Oct 20: Initial council work, merge, E2E verification
- Oct 21 00:00-03:30: Aesthetics, team colors, Figma/Biome/Mermaid access
- Oct 21 03:30-05:00: "20-0" branding, homepage, player browser, header
- Oct 21 05:00-07:00: Draft board, flex rules, 3-4 base, position nomenclature
- Oct 21 07:00-09:00: Team comparison, guide page, positional values
- Oct 21 09:00-10:00: Game review, season review, playoffs, awards

### **COUNCIL QUESTIONS FOR CLAUDE:**
1. Default tab: Draft vs Season-first?
2. POSITION_TIER/TIER_BONUS: delete or wire?
3. E2E driver: which gate is authoritative?
4. 390px preseason CTA: product fix or protocol exception?
5. Gate E_viewportUsable: add inViewport assertions?
6. Result.json correction: adopt result.v2.proposed.json?
7. Promotion criteria: what gate must pass?
8. Merge manifest: adopt 11/4/2 split?
9. Old Run A superseded?
10. Hard-rule violation: quarantine invented ratings?

### **COUNCIL QUESTIONS FOR OWNER:**
1. 47-message recovery: approve append from stash?
2. Freeze shared docs + name sync owner?
3. Quarantine invented ratings?
4. Promotion criteria: what gate must pass?
5. Label collisions: adopt content IDs?
6. E2E harness archive?
7. PR #5 contributor discovery: deem inert?
8. Architecture: repos or folders?
9. Pool size: per-sport or flat 1,200?
10. Default tab: Draft or Season-first?

---

**END OF PROMPT — READY FOR CLAUDE**